/**
 * Pruebas del separador que convierte el texto corrido de un artículo en
 * párrafos y listas para mostrarlo en /normativa.
 *
 * La regla que no se negocia: es solo presentación. Juntando todos los pedazos
 * tiene que salir el texto original, palabra por palabra, en los 246 artículos.
 *
 * Uso: npm run evals:formato
 */
import { CORPUS } from '../src/lib/normativa/buscar'
import { estructurar, aplanar, type BloqueTexto } from '../src/lib/normativa/formato'

let fallos = 0
function verificar(nombre: string, condicion: boolean, detalle = '') {
  if (!condicion) fallos++
  console.log(
    `${condicion ? '✓' : '✗'} ${nombre}${!condicion && detalle ? `\n    ${detalle}` : ''}`,
  )
}
const compacto = (s: string) => s.replace(/\s+/g, ' ').trim()
const articulo = (norma: string, art: string) =>
  CORPUS.find((a) => a.norma.startsWith(norma) && a.articulo === art)!.texto
const listas = (b: BloqueTexto[]) => b.filter((x) => x.tipo === 'lista')

// ── El texto no cambia
const alterados = CORPUS.filter(
  (a) => compacto(aplanar(estructurar(a.texto))) !== compacto(a.texto),
)
verificar(
  `los ${CORPUS.length} artículos se reconstruyen idénticos`,
  alterados.length === 0,
  alterados
    .slice(0, 3)
    .map((a) => `${a.norma} ${a.articulo}`)
    .join(' | '),
)

// ── Listas que tienen que aparecer
const controles = estructurar(articulo('Decreto 1072', '2.2.4.6.24'))
const l1 = listas(controles)[0]
verificar(
  'Decreto 1072 art. 2.2.4.6.24: los 5 controles salen como lista',
  l1?.tipo === 'lista' && l1.items.length === 5 && l1.items[0].texto.startsWith('Eliminación'),
  JSON.stringify(l1?.tipo === 'lista' ? l1.items.map((i) => i.marca) : null),
)
verificar(
  'Decreto 1072 art. 2.2.4.6.24: cada parágrafo es un bloque aparte',
  controles.filter((b) => b.tipo === 'parrafo' && b.texto.startsWith('PARÁGRAFO')).length === 4,
)

const micro = listas(estructurar(articulo('Resolución 0312', '3')))[0]
verificar(
  'Resolución 0312 art. 3: los 7 estándares "(1)…(7)" salen como lista',
  micro?.tipo === 'lista' && micro.items.length === 7 && micro.items[0].marca === '(1)',
)

const afiliados = listas(estructurar(articulo('Ley 1562', '2')))[0]
verificar(
  'Ley 1562 art. 2: "a)" y "b)" son la lista principal',
  afiliados?.tipo === 'lista' && afiliados.items.map((i) => i.marca).join(' ') === 'a) b)',
)
const sub = afiliados?.tipo === 'lista' ? listas(afiliados.items[0].sub ?? [])[0] : undefined
verificar(
  'Ley 1562 art. 2: dentro de "a)" van los numerales 1 a 7',
  sub?.tipo === 'lista' && sub.items.length === 7,
  JSON.stringify(sub?.tipo === 'lista' ? sub.items.map((i) => i.marca) : null),
)

// ── Lo que NO es una lista
verificar(
  'un "2." suelto no arma una lista',
  listas(estructurar('Ver el artículo 2. Aplica a todos los empleadores.')).length === 0,
)
verificar(
  'los numerales de artículo (2.2.4.6.8) no se confunden con una lista',
  listas(estructurar('Según el artículo 2.2.4.6.8 del Decreto 1072, el empleador debe actuar.'))
    .length === 0,
)
verificar(
  'un decimal (0.348%) no se confunde con una lista',
  listas(estructurar('La cotización va del 0.348% al 8.7% del ingreso.')).length === 0,
)

console.log(`\n${fallos ? '✗' : '✓'} ${fallos} fallos`)
if (fallos) process.exit(1)
