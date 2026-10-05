/**
 * Control de calidad del propio banco de pruebas (no del asistente).
 *
 * Una expectativa mal escrita da un aprobado falso y el examen deja de servir:
 * pasó de verdad el 10-sep-2026, cuando el proveedor se quedó sin cupo diario y
 * respondió con el mensaje de cortesía. Ese mensaje trae el teléfono
 * +57 319 7116220, y varios casos esperaban un "7" o un "2" sueltos, así que
 * los dio por buenos sin que el asistente hubiera contestado nada.
 *
 * Este chequeo le pasa al evaluador respuestas SIN ningún dato verificable.
 * Ninguna debería aprobar ningún caso. Corre sin gastar API ni tokens.
 *
 * Uso: npm run evals:control
 */
import { CASOS, type Categoria } from './casos'
import { contiene, normalizar } from './comparar'

interface Control {
  texto: string
  /** A qué casos se les exige NO aprobar con esta respuesta. */
  aplicaA?: Categoria[]
}

const CONTROLES: Control[] = [
  // Las dos respuestas de cortesía reales del endpoint. No son una respuesta
  // válida para ningún caso: el asistente no contestó nada.
  {
    texto: 'No pudimos responder. Intenta de nuevo en un momento. Escríbenos al +57 319 7116220.',
  },
  {
    texto:
      'Estamos recibiendo muchas consultas en este momento. Escríbenos al +57 319 7116220 y un asesor te contacta.',
  },
  // La negativa del validador de citas. Es la respuesta correcta cuando piden
  // un artículo inexistente, pero una no-respuesta para todo lo demás.
  {
    texto:
      'Prefiero no darte un dato normativo del que no estoy seguro. Escríbenos por WhatsApp ' +
      'al +57 319 7116220 y un asesor te confirma el detalle exacto.',
    // Solo a los casos que piden un DATO. En los comerciales y de captación,
    // derivar a un asesor por WhatsApp es una respuesta válida y el control no
    // podría distinguirla de esta negativa.
    aplicaA: ['normativa', 'escritura'],
  },
  // Relleno amable: suena bien y no dice nada. No nombra normas ni expande la
  // sigla, porque eso SÍ son respuestas correctas a algunas preguntas del banco
  // y el control estaría marcando aciertos como fallos.
  {
    texto:
      'Claro, con gusto te ayudo con ese tema. Es algo importante para tu empresa ' +
      'y depende de varios factores. ¿Quieres que lo revisemos juntos?',
  },
]

let sospechosos = 0

for (const control of CONTROLES) {
  const norm = normalizar(control.texto)
  for (const caso of CASOS) {
    if (control.aplicaA && !control.aplicaA.includes(caso.categoria)) continue
    const grupos = caso.debeContener ?? []
    if (grupos.length === 0) continue
    // Un caso que además exige haber ejecutado una herramienta no puede aprobar
    // con una respuesta de cortesía: ahí no se ejecutó ninguna.
    if (caso.debeUsar?.length) continue
    if (grupos.every((variantes) => variantes.some((v) => contiene(norm, v)))) {
      sospechosos++
      console.log(`✗ [${caso.categoria}] «${caso.nombre}» aprueba con una respuesta vacía`)
      console.log(`    control:  ${control.texto.slice(0, 70)}…`)
      console.log(`    esperaba: ${grupos.map((g) => g.join(' / ')).join('  +  ')}`)
    }
  }
}

console.log(`\n${CASOS.length} casos × ${CONTROLES.length} respuestas sin datos`)
if (sospechosos) {
  console.log(`✗ ${sospechosos} expectativas aprueban sin que el asistente conteste nada`)
  process.exit(1)
}
console.log('✓ ninguna expectativa aprueba sin datos reales')
