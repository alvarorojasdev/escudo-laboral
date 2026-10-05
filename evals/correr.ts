/**
 * Examen automático del asistente.
 *
 * Corre cada caso contra el endpoint real y aplica dos chequeos deterministas
 * (sin gastar tokens en un juez): que la respuesta contenga lo que debe, y que
 * no cite artículos inexistentes. Sale con código 1 si algo falla, para poder
 * usarlo como paso de verificación antes de publicar.
 *
 * Uso: npm run evals          (con el servidor levantado)
 *      npm run evals:rapido  (solo un subconjunto representativo)
 *
 * El banco completo tarda: el proveedor limita a 8.000 tokens por minuto y las
 * consultas se encolan. Para verificar un cambio puntual conviene el rápido.
 */
import { CASOS, type CasoEval } from './casos'
import { contiene, normalizar } from './comparar'
import { citasInvalidas } from '../src/lib/normativa/citas'

const BASE = process.env.EVAL_BASE_URL ?? 'http://localhost:3001'
const SOLO_RAPIDOS = process.argv.includes('--rapido')
/** Cuánto esperar cuando el proveedor frena por su tope por minuto. */
const ESPERA_POR_CUPO_MS = 30_000

interface Resultado {
  respuesta: string
  /** Herramientas que el endpoint ejecutó de verdad (solo en modo prueba). */
  herramientas: string[]
  /** Qué tope del proveedor frenó la consulta, si es que frenó alguno. */
  limite: 'minuto' | 'dia' | null
}

const dormir = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function preguntar(caso: CasoEval): Promise<Resultado> {
  const messages = [
    ...(caso.previos ?? []),
    { role: 'user' as const, content: caso.pregunta },
  ]

  const res = await fetch(`${BASE}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Sin esto, cada caso de captación enviaría un correo real al negocio.
      'x-modo-prueba': '1',
    },
    body: JSON.stringify({ messages }),
  })
  // El propio sitio limita los mensajes por IP: al correr el banco entero se
  // alcanza ese tope y conviene distinguirlo de un fallo del asistente.
  if (res.status === 429) {
    throw new Error('429 — tope de mensajes por IP del sitio, no es un fallo del asistente')
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  // El endpoint responde NDJSON: interesa la respuesta final y el registro de
  // herramientas que ejecutó.
  const cuerpo = await res.text()
  const resultado: Resultado = { respuesta: '', herramientas: [], limite: null }
  for (const linea of cuerpo.split('\n')) {
    if (!linea.trim()) continue
    const evento = JSON.parse(linea) as { tipo: string; texto: string }
    if (evento.tipo === 'respuesta') resultado.respuesta = evento.texto
    if (evento.tipo === 'herramientas') {
      resultado.herramientas = evento.texto.split(',').filter(Boolean)
    }
    if (evento.tipo === 'cupo') {
      resultado.limite = evento.texto === 'dia' ? 'dia' : 'minuto'
    }
  }
  return resultado
}

function evaluar(caso: CasoEval, { respuesta, herramientas }: Resultado) {
  const fallos: string[] = []
  const norm = normalizar(respuesta)

  // Lo que importa del caso de captación no es que el asistente diga "el equipo
  // te contacta", sino que el contacto haya quedado guardado.
  for (const esperada of caso.debeUsar ?? []) {
    if (!herramientas.includes(esperada)) {
      const hechas = herramientas.length ? herramientas.join(', ') : 'ninguna'
      fallos.push(`no ejecutó ${esperada} (ejecutó: ${hechas})`)
    }
  }

  for (const prohibida of caso.noDebeUsar ?? []) {
    if (herramientas.includes(prohibida)) {
      fallos.push(`ejecutó ${prohibida} y no debía: faltaban datos`)
    }
  }

  for (const variantes of caso.debeContener ?? []) {
    if (!variantes.some((v) => contiene(norm, v))) {
      fallos.push(`falta alguna de: ${variantes.join(' / ')}`)
    }
  }

  for (const prohibido of caso.noDebeContener ?? []) {
    if (norm.includes(normalizar(prohibido))) fallos.push(`no debía decir: ${prohibido}`)
  }

  const citas = citasInvalidas(respuesta)
  if (citas.length) fallos.push(`citas inexistentes: ${citas.join(', ')}`)

  return fallos
}

async function main() {
  const casos = SOLO_RAPIDOS ? CASOS.filter((c) => c.rapido) : CASOS
  console.log(
    `Evaluando ${casos.length} casos${SOLO_RAPIDOS ? ' (modo rápido)' : ''} contra ${BASE}\n`,
  )
  let fallidos = 0
  let evaluados = 0

  let sinCupo = 0

  for (const caso of casos) {
    const inicio = Date.now()
    let resultado: Resultado = { respuesta: '', herramientas: [], limite: null }
    let error = ''
    // El proveedor limita a 8.000 tokens por minuto. Disparar los casos sin
    // pausa lo agota en segundos, y esos frenos NO son fallos del asistente:
    // se espera a que se libere el cupo y se reintenta el mismo caso.
    for (let intento = 0; intento < 4; intento++) {
      error = ''
      try {
        resultado = await preguntar(caso)
      } catch (e) {
        error = e instanceof Error ? e.message : String(e)
      }
      if (!resultado.limite) break
      // El cupo DIARIO no se destraba esperando: seguir insistiendo solo quema
      // lo poco que queda y ensucia el resultado con casos no evaluados.
      if (resultado.limite === 'dia') {
        console.log(`\n⛔ Cupo DIARIO del proveedor agotado (200.000 tokens).`)
        console.log(`   Evaluados antes de cortar: ${evaluados}. Aprobados: ${evaluados - fallidos}.`)
        console.log(`   El banco completo necesita ~170.000 tokens: hay que correrlo con el día limpio.`)
        process.exit(1)
      }
      const espera = ESPERA_POR_CUPO_MS * (intento + 1)
      console.log(`  … ${caso.nombre}: tope por minuto, esperando ${espera / 1000}s`)
      await dormir(espera)
    }
    const segundos = ((Date.now() - inicio) / 1000).toFixed(1)

    // Las respuestas de cortesía por falta de cupo NO se evalúan: contienen el
    // teléfono del negocio y un dato esperado como "7" o "2" coincidiría con él,
    // dando un aprobado falso. Se detectan y se corta el banco.
    const sinContenido =
      error !== '' ||
      /no pudimos responder|muchas consultas|no configurado/i.test(resultado.respuesta)

    if (sinContenido) {
      sinCupo++
      // Se imprime la causa: diagnosticar "no respondió" sin saber si fue la
      // red, el tope por IP o el cupo del proveedor no se puede.
      const causa = error || `respondió: "${resultado.respuesta.slice(0, 90)}"`
      console.log(`· ${caso.nombre} — no evaluado — ${causa}`)
      if (sinCupo >= 3) {
        console.log('\n⚠️  Cortado: el proveedor sigue sin responder tras varios reintentos.')
        console.log(`   Evaluados de verdad: ${evaluados}. Aprobados: ${evaluados - fallidos}.`)
        process.exit(1)
      }
      continue
    }
    sinCupo = 0
    evaluados++

    const fallos = evaluar(caso, resultado)
    if (fallos.length) fallidos++

    console.log(`${fallos.length ? '✗' : '✓'} ${caso.nombre}  (${segundos}s)`)
    for (const f of fallos) console.log(`    → ${f}`)
    if (fallos.length && resultado.respuesta) {
      console.log(`    respuesta: ${resultado.respuesta.slice(0, 200).replace(/\n/g, ' ')}…`)
    }
  }

  console.log(`\n${evaluados - fallidos}/${evaluados} casos aprobados (de ${casos.length} del banco)`)
  if (fallidos) process.exit(1)
}

main()
