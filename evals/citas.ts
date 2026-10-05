/**
 * Pruebas del validador de citas por el MISMO camino que usa el chat: la
 * búsqueda registra lo que entrega con `crearRegistroDeServidos` y el validador
 * lee de ese mismo registro.
 *
 * Existe porque el validador se probó una vez armando las claves a mano y pasó,
 * mientras el chat las guardaba de otra forma: en producción se descartaban
 * TODAS las respuestas que nombraban una norma.
 *
 * Uso: npm run evals:citas
 */
import { CORPUS, clavesDeRespaldo } from '../src/lib/normativa/buscar'
import { cifrasSinRespaldo, citasInvalidas, crearRegistroDeServidos } from '../src/lib/normativa/citas'

let fallos = 0
function caso(nombre: string, servidos: [string, string][], respuesta: string, deberiaPasar: boolean) {
  const registro = crearRegistroDeServidos()
  const articulos = servidos.map(([norma, art]) => {
    const a = CORPUS.find((x) => x.norma === norma && x.articulo === art)
    if (!a) throw new Error(`No está en el corpus: ${norma} ${art}`)
    return a
  })
  registro.registrar(clavesDeRespaldo(articulos))
  const invalidas = citasInvalidas(respuesta, registro.servidos)
  const paso = invalidas.length === 0
  const bien = paso === deberiaPasar
  if (!bien) fallos++
  console.log(`${bien ? '✓' : '✗'} ${nombre}${bien ? '' : `\n    inválidas: ${JSON.stringify(invalidas)}`}`)
}

caso(
  'acepta un artículo que la búsqueda sí entregó',
  [['Decreto 1072 de 2015', '2.2.4.11.5']],
  'Según el artículo 2.2.4.11.5 del Decreto 1072 de 2015, la multa va de 26,31 a 131,57 UVT.',
  true,
)
caso(
  'el numeral 2.2.4.x.y siempre es del Decreto 1072, aunque la frase nombre otra norma antes',
  [['Decreto 1072 de 2015', '2.2.4.11.5'], ['Resolución 0312 de 2019', '3']],
  'Con 6 trabajadores te aplica la Resolución 0312 y la multa sale del artículo 2.2.4.11.5 del Decreto 1072.',
  true,
)
caso(
  'con dos normas en la frase, el artículo es de la que tiene más cerca',
  [['Ley 1562 de 2012', '30'], ['Resolución 0312 de 2019', '3']],
  'La Resolución 0312 aplica a tu empresa, y el artículo 30 de la Ley 1562 fija la multa por no reportar.',
  true,
)
caso(
  // El artículo de multas remite al 13 y al 30 de la Ley 1562, que definen
  // las faltas. Repetir esa remisión no es inventar (respuestas reales del
  // 1-oct-2026 descartadas por esto).
  'acepta la remisión que el artículo servido hace a otra norma',
  [['Decreto 1072 de 2015', '2.2.4.11.5']],
  'Para 80 trabajadores (mediana empresa), la multa por incumplir el artículo 13, inciso 2, de la Ley 1562 de 2012 va de 552,57 a 2.631,30 UVT, según el artículo 2.2.4.11.5 del Decreto 1072.',
  true,
)
caso(
  'sigue rechazando la cita a una norma que no se consultó',
  [['Ley 1562 de 2012', '13']],
  'Según el artículo 13 del Decreto 1295 de 1994, la multa es de 200 salarios.',
  false,
)

// ── Cifras en UVT: tienen que salir del texto que la búsqueda entregó.
function cifras(nombre: string, servidos: [string, string][], respuesta: string, esperadas: string[]) {
  const registro = crearRegistroDeServidos()
  registro.registrar(
    clavesDeRespaldo(servidos.map(([n, a]) => CORPUS.find((x) => x.norma === n && x.articulo === a)!)),
  )
  const sin = cifrasSinRespaldo(respuesta, registro.servidos)
  const bien = JSON.stringify(sin) === JSON.stringify(esperadas)
  if (!bien) fallos++
  console.log(`${bien ? '✓' : '✗'} ${nombre}${bien ? '' : `\n    sin respaldo: ${JSON.stringify(sin)}`}`)
}

const MULTAS: [string, string][] = [['Decreto 1072 de 2015', '2.2.4.11.5']]
cifras(
  'acepta las cifras de la tabla, escritas con espacios finos como las escribe el modelo',
  MULTAS,
  'Para una gran empresa la multa va de 10\u202f551,52 hasta 26 313,02 UVT; para una micro, de 26,31 a 131,57 UVT.',
  [],
)
cifras(
  // Respuesta real del 1-oct-2026, cuando la búsqueda no trajo el artículo.
  'rechaza un rango inventado sin haber consultado la tabla',
  [['Resolución 0312 de 2019', '3']],
  'Para menos de 10 trabajadores, la multa puede ir desde 1 UVT hasta 10 UVT por cada infracción.',
  ['1', '10'],
)
cifras(
  'rechaza un rango inventado aunque la tabla sí se haya consultado',
  MULTAS,
  'Para una pequeña empresa la multa va de 150 a 600 UVT.',
  ['150', '600'],
)
cifras(
  'no confunde con cifras en UVT los números que no lo son',
  MULTAS,
  'Con 6 trabajadores, según el artículo 13 de la Ley 1562 de 2012, la multa va de 26,31 a 131,57 UVT.',
  [],
)

console.log(`\n${fallos ? '✗' : '✓'} ${fallos} fallos`)
if (fallos) process.exit(1)
