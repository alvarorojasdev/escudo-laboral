import {
  CORPUS,
  NORMA_DE_LOS_NUMERALES,
  REFERENCIAS_VALIDAS,
  claveArticulo,
  normasMencionadas,
  normalizar,
} from './buscar'

// Dos formas de citar que usa el modelo: el numeral del Decreto 1072
// ("2.2.4.6.8") y el artículo suelto de una resolución ("artículo 16").
const NUMERAL_DECRETO = /\b2\.2\.4\.\d+\.\d+\b/g
// El lookahead evita partir un numeral: en "artículo 2.2.4.6.8" no debe
// extraerse un "artículo 2" que después se marcaría como inexistente.
const ARTICULO_SUELTO = /\bart[íi]culos?\s+(\d{1,3})\b(?!\.\d)/gi

/**
 * Devuelve las referencias normativas citadas que el asistente no puede
 * respaldar. Es un chequeo determinista: no gasta tokens y no puede alucinar.
 *
 * Si se pasa `respaldadas` —los artículos que la búsqueda devolvió en esta
 * conversación, como claves `norma::articulo`—, se exige que la cita esté ahí.
 *
 * Verifica el PAR norma+artículo, no el número suelto. Guardando solo el número
 * quedaba abierto el fallo más difícil de ver: citar un artículo real, de una
 * norma real, que efectivamente se leyó… pero atribuyéndole el contenido de otra
 * norma que también se leyó. Pasó de verdad: el asistente respondió que la multa
 * por no reportar un accidente era de 200 salarios mínimos citando la Ley 1562 y
 * el Decreto 1295 juntos. Los 200 son del Decreto 1295 y sancionan otra cosa; la
 * Ley 1562 fija mil. Los dos artículos existían y los dos habían sido
 * consultados, así que ningún chequeo lo veía.
 */
/**
 * Registro de los artículos que la búsqueda entregó en una conversación.
 *
 * Lo usan igual el chat y las pruebas, para que no puedan divergir: cuando el
 * chat tenía su propio Set y le volvía a aplicar `normalizar()` a cada clave,
 * esa limpieza borraba el separador "::" y ninguna cita nombrando una norma
 * coincidía nunca. En producción se descartaban todas esas respuestas, y las
 * pruebas no lo veían porque armaban las claves a mano.
 */
export function crearRegistroDeServidos() {
  const servidos = new Set<string>()
  return {
    servidos,
    registrar(claves: string[]) {
      for (const clave of claves) servidos.add(clave)
    },
  }
}

export function citasInvalidas(respuesta: string, respaldadas?: Set<string>): string[] {
  const invalidas = new Set<string>()

  // Sin respaldo concreto solo se puede verificar que el artículo exista.
  if (!respaldadas) {
    for (const cita of respuesta.match(NUMERAL_DECRETO) ?? []) {
      if (!REFERENCIAS_VALIDAS.has(normalizar(cita))) invalidas.add(cita)
    }
    for (const m of respuesta.matchAll(ARTICULO_SUELTO)) {
      if (!REFERENCIAS_VALIDAS.has(normalizar(m[1]))) invalidas.add(`artículo ${m[1]}`)
    }
    return [...invalidas]
  }

  // Una respuesta se lee como un texto legal: la norma se nombra una vez y los
  // artículos que siguen se entienden de ella hasta que se nombre otra. Todo
  // se busca sobre la oración normalizada, para que las posiciones de las
  // normas y de los artículos sean comparables.
  let normaActual: string | null = null

  for (const oracionCruda of respuesta.split(/(?<=[.;:])\s+|\n+/)) {
    const oracion = normalizar(oracionCruda)
    const menciones = normasMencionadas(oracion)

    const citas: { articulo: string; indice: number; norma: string | null }[] = []
    for (const m of oracion.matchAll(NUMERAL_DECRETO)) {
      // Un numeral 2.2.4.x.y solo puede ser del Decreto 1072: no importa qué
      // otra norma se haya nombrado antes en la frase.
      citas.push({ articulo: m[0], indice: m.index ?? 0, norma: NORMA_DE_LOS_NUMERALES })
    }
    for (const m of oracion.matchAll(ARTICULO_SUELTO)) {
      const indice = m.index ?? 0
      // Con varias normas en la frase, el artículo es de la más cercana:
      // "la Resolución 0312 aplica, y el artículo 30 de la Ley 1562 fija…".
      // Tomar la primera atribuía el artículo 30 a la 0312.
      const cercana = menciones.reduce<{ norma: string; indice: number } | null>(
        (mejor, n) =>
          !mejor || Math.abs(n.indice - indice) < Math.abs(mejor.indice - indice) ? n : mejor,
        null,
      )
      citas.push({ articulo: m[1], indice, norma: cercana?.norma ?? normaActual })
    }

    for (const { articulo, norma } of citas) {
      const respaldado = norma
        ? respaldadas.has(claveArticulo(norma, articulo))
        : // Sin norma nombrada, alcanza con que ese artículo se haya servido en
          // alguna: exigir más marcaría como inválida una respuesta correcta que
          // simplemente no repite el nombre de la norma en cada frase.
          [...respaldadas].some((k) => k.endsWith(`::${normalizar(articulo)}`))
      if (!respaldado) {
        invalidas.add(norma ? `artículo ${articulo} de ${norma}` : `artículo ${articulo}`)
      }
    }

    normaActual = menciones.at(-1)?.norma ?? normaActual
  }

  return [...invalidas]
}

// Una cifra: miles con punto o espacio (el modelo usa espacios finos) y
// decimales con coma. Los lookarounds evitan tomar un pedazo de otro número.
const CIFRA = String.raw`(?<![\d.,])\d{1,3}(?:[. ]\d{3})*(?:,\d+)?(?![\d])`
// "26,31 UVT" o el rango "de 26,31 a 131,57 UVT", donde la primera no repite la unidad.
const RANGO_UVT = new RegExp(
  `(${CIFRA})\\s*(?:UVT\\s*)?(?:a|al|y|hasta|–|-)\\s*(${CIFRA})\\s*UVT`,
  'gi',
)
const CIFRA_UVT = new RegExp(`(${CIFRA})\\s*UVT`, 'gi')

function cifrasEnUvt(texto: string): string[] {
  const limpio = texto.replace(/[\u202f\u00a0]/g, ' ')
  const halladas: string[] = []
  for (const m of limpio.matchAll(RANGO_UVT)) halladas.push(m[1], m[2])
  for (const m of limpio.matchAll(CIFRA_UVT)) halladas.push(m[1])
  return [...new Set(halladas.map((c) => c.trim()))]
}

const sinSeparadores = (cifra: string) => cifra.replace(/[. ]/g, '')

const TEXTO_POR_CLAVE = new Map(CORPUS.map((a) => [claveArticulo(a.norma, a.articulo), a.texto]))

/**
 * Cifras en UVT de la respuesta que no aparecen como cifra en UVT en ningún
 * artículo entregado por la búsqueda.
 *
 * El validador de citas revisa artículos, no números: cuando la búsqueda no
 * trajo la tabla de multas, el modelo respondió "desde 1 UVT hasta 10 UVT"
 * sin citar nada, y pasó. Se compara solo contra cifras que en la norma van
 * en UVT, para que un "10" de "diez trabajadores" no respalde una multa.
 */
export function cifrasSinRespaldo(respuesta: string, respaldadas: Set<string>): string[] {
  const enLaNorma = new Set(
    [...respaldadas].flatMap((clave) =>
      cifrasEnUvt(TEXTO_POR_CLAVE.get(clave) ?? '').map(sinSeparadores),
    ),
  )
  return cifrasEnUvt(respuesta).filter((c) => !enLaNorma.has(sinSeparadores(c)))
}
