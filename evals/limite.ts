/**
 * Pruebas del límite de peticiones, sin servidor ni red: el almacén compartido
 * se reemplaza por uno falso que registra lo que se le pide.
 *
 * Uso: npm run evals:limite
 */
import { crearLimitador } from '../src/lib/peticiones'
import { crearContador } from '../src/lib/metricas'

let fallos = 0
function verificar(nombre: string, condicion: boolean, detalle = '') {
  if (!condicion) fallos++
  console.log(`${condicion ? '✓' : '✗'} ${nombre}${!condicion && detalle ? `\n    ${detalle}` : ''}`)
}

/** Imita el endpoint /pipeline de Upstash: guarda contadores en memoria. */
function almacenFalso() {
  const contadores = new Map<string, number>()
  const pedidos: { url: string; auth: string | null; comandos: unknown[][] }[] = []
  const fetchFalso = async (url: string | URL | Request, init?: RequestInit) => {
    const comandos = JSON.parse(String(init?.body)) as unknown[][]
    pedidos.push({ url: String(url), auth: new Headers(init?.headers).get('authorization'), comandos })
    const respuesta = comandos.map(([cmd, clave]) => {
      if (cmd === 'SET') {
        if (!contadores.has(String(clave))) contadores.set(String(clave), 0)
        return { result: 'OK' }
      }
      if (cmd === 'INCR') {
        const n = (contadores.get(String(clave)) ?? 0) + 1
        contadores.set(String(clave), n)
        return { result: n }
      }
      return { result: 1 }
    })
    return new Response(JSON.stringify(respuesta))
  }
  return { fetchFalso: fetchFalso as typeof fetch, pedidos }
}

async function main() {
  // Sin almacén configurado: se comporta como el límite en memoria de siempre.
  const local = crearLimitador({})
  const r1 = [await local('a', 2, 60_000), await local('a', 2, 60_000), await local('a', 2, 60_000)]
  verificar('sin almacén: deja pasar hasta el límite y frena después', r1.map((r) => r.ok).join() === 'true,true,false')

  // Con almacén: el conteo lo lleva el almacén, compartido entre instancias.
  const { fetchFalso, pedidos } = almacenFalso()
  const compartido = crearLimitador({ url: 'https://ejemplo.upstash.io', token: 'secreto', fetch: fetchFalso })
  const r2 = [await compartido('b', 2, 60_000), await compartido('b', 2, 60_000), await compartido('b', 2, 60_000)]
  verificar('con almacén: deja pasar hasta el límite y frena después', r2.map((r) => r.ok).join() === 'true,true,false')
  verificar('pega al endpoint /pipeline', pedidos[0]?.url === 'https://ejemplo.upstash.io/pipeline', pedidos[0]?.url)
  verificar('manda el token como Bearer', pedidos[0]?.auth === 'Bearer secreto', String(pedidos[0]?.auth))
  verificar(
    'crea la clave con vencimiento y suma en el mismo viaje',
    JSON.stringify(pedidos[0]?.comandos.map((c) => c[0])) === '["SET","INCR"]',
    JSON.stringify(pedidos[0]?.comandos),
  )

  // Si el almacén rechaza un comando, no se toma la respuesta como un conteo
  // válido: se usa la memoria. Antes se leía solo el primer resultado.
  const rechaza = crearLimitador({
    url: 'https://ejemplo.upstash.io',
    token: 'secreto',
    fetch: (async () =>
      new Response(JSON.stringify([{ result: 'OK' }, { error: 'ERR unknown command' }]))) as typeof fetch,
  })
  const r4 = [await rechaza('d', 1, 60_000), await rechaza('d', 1, 60_000)]
  verificar('comando rechazado: no se cuenta como válido, usa la memoria', r4.map((r) => r.ok).join() === 'true,false')

  // Si el almacén se cae, no se le cierra la puerta a todo el mundo: se usa
  // el límite en memoria hasta que vuelva.
  const caido = crearLimitador({
    url: 'https://ejemplo.upstash.io',
    token: 'secreto',
    fetch: (async () => {
      throw new Error('sin red')
    }) as typeof fetch,
  })
  const r3 = [await caido('c', 1, 60_000), await caido('c', 1, 60_000)]
  verificar('almacén caído: sigue limitando con la memoria', r3.map((r) => r.ok).join() === 'true,false')

  // Contador de eventos: una clave por evento y por día, con vencimiento.
  const { fetchFalso: fetchEventos, pedidos: pedidosEventos } = almacenFalso()
  const contar = crearContador({ url: 'https://ejemplo.upstash.io', token: 'secreto', fetch: fetchEventos })
  await contar('politica_word', new Date('2026-10-01T15:00:00Z'))
  const cmds = pedidosEventos[0]?.comandos ?? []
  verificar('cuenta el evento en una clave por día', JSON.stringify(cmds[0]) === '["INCR","eventos:2026-10-01:politica_word"]', JSON.stringify(cmds))
  verificar('la clave del día vence sola', cmds[1]?.[0] === 'EXPIRE', JSON.stringify(cmds[1]))

  // Contar nunca puede romper la petición que lo dispara.
  const contarCaido = crearContador({
    url: 'https://ejemplo.upstash.io',
    token: 'secreto',
    fetch: (async () => {
      throw new Error('sin red')
    }) as typeof fetch,
  })
  let reviento = false
  try {
    await contarCaido('chat_mensaje')
  } catch {
    reviento = true
  }
  verificar('si el almacén falla, contar no lanza error', !reviento)

  console.log(`\n${fallos ? '✗' : '✓'} ${fallos} fallos`)
  if (fallos) process.exit(1)
}

main()
