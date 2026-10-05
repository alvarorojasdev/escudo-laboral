/**
 * Pruebas de las guías del blog, sin red ni modelo.
 *
 * Una guía sobre leyes que se equivoca en una cifra es peor que no tener guía:
 * por eso toda cifra del texto tiene que aparecer en alguno de los artículos
 * que la guía cita, y cada cita tiene que existir en el corpus verificado.
 *
 * Uso: npm run evals:blog
 */
import { CORPUS } from '../src/lib/normativa/buscar'
import { ITEMS } from '../src/lib/autoevaluacion'
import { GUIAS, guiaDeItem, textoDeGuia } from '../src/lib/blog/guias'

let fallos = 0
function verificar(nombre: string, condicion: boolean, detalle = '') {
  if (!condicion) fallos++
  console.log(
    `${condicion ? '✓' : '✗'} ${nombre}${!condicion && detalle ? `\n    ${detalle}` : ''}`,
  )
}

verificar('hay al menos 3 guías', GUIAS.length >= 3, `hay ${GUIAS.length}`)
verificar(
  'los slugs son únicos y sirven de URL',
  new Set(GUIAS.map((g) => g.slug)).size === GUIAS.length &&
    GUIAS.every((g) => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(g.slug)),
)

for (const g of GUIAS) {
  const fuentes = g.fuentes.map((f) =>
    CORPUS.find((a) => a.norma === f.norma && a.articulo === f.articulo),
  )
  const faltan = g.fuentes.filter((_, i) => !fuentes[i])
  verificar(
    `"${g.slug}": sus fuentes existen en el corpus`,
    faltan.length === 0,
    JSON.stringify(faltan),
  )

  const itemsMalos = g.items.filter((c) => !ITEMS.some((i) => i.codigo === c))
  verificar(
    `"${g.slug}": responde a ítems reales de la autoevaluación`,
    g.items.length > 0 && itemsMalos.length === 0,
    JSON.stringify(itemsMalos),
  )

  // Toda cifra de dos o más dígitos tiene que estar en lo que cita la guía.
  const respaldo = fuentes.map((a) => (a ? `${a.norma} ${a.articulo} ${a.texto}` : '')).join(' ')
  const cifras = [...new Set(textoDeGuia(g).match(/\d[\d.,]*\d|\d{2,}/g) ?? [])]
  const sinRespaldo = cifras.filter((c) => !respaldo.includes(c))
  verificar(
    `"${g.slug}": toda cifra sale de sus fuentes`,
    sinRespaldo.length === 0,
    JSON.stringify(sinRespaldo),
  )

  verificar(
    `"${g.slug}": resumen apto para buscadores (70 a 160 caracteres)`,
    g.resumen.length >= 70 && g.resumen.length <= 160,
    `mide ${g.resumen.length}`,
  )
}

// La autoevaluación enlaza cada faltante con su guía.
verificar(
  'el plan anual (2.4.1) tiene guía',
  guiaDeItem('2.4.1')?.slug === 'plan-anual-de-trabajo-sg-sst',
)
verificar('un ítem sin guía devuelve nada', guiaDeItem('7.1.4') === undefined)

console.log(`\n${fallos ? '✗' : '✓'} ${fallos} fallos`)
if (fallos) process.exit(1)
