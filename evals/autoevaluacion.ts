/**
 * Pruebas de la autoevaluación de Estándares Mínimos (Resolución 0312 de 2019),
 * sin red ni modelo: la calificación es una cuenta y se verifica como tal.
 *
 * Las cifras esperadas salen de la Tabla de Valores del artículo 27 (imagen
 * oficial del normograma del SENA, leída ítem por ítem el 1-oct-2026).
 *
 * Uso: npm run evals:autoevaluacion
 */
import {
  ESTANDARES,
  ITEMS,
  calificar,
  estandaresQueAplican,
  trabajadoresDesdeEnlace,
  valoracion,
} from '../src/lib/autoevaluacion'

let fallos = 0
function verificar(nombre: string, condicion: boolean, detalle = '') {
  if (!condicion) fallos++
  console.log(
    `${condicion ? '✓' : '✗'} ${nombre}${!condicion && detalle ? `\n    ${detalle}` : ''}`,
  )
}
const redondear = (n: number) => Math.round(n * 100) / 100

// ── La tabla
verificar('la tabla tiene 60 ítems', ITEMS.length === 60, `tiene ${ITEMS.length}`)
const total = redondear(ITEMS.reduce((s, i) => s + i.valor, 0))
verificar('los valores suman 100', total === 100, `suman ${total}`)
const porCiclo = (ciclo: string) =>
  redondear(ITEMS.filter((i) => i.ciclo === ciclo).reduce((s, i) => s + i.valor, 0))
verificar(
  'PHVA: Planear 25, Hacer 60, Verificar 5, Actuar 10',
  porCiclo('Planear') === 25 &&
    porCiclo('Hacer') === 60 &&
    porCiclo('Verificar') === 5 &&
    porCiclo('Actuar') === 10,
)

// ── Qué estándares aplican (artículos 3, 9 y 16)
verificar(
  '1 a 10 trabajadores, riesgo I-III → 7 estándares',
  estandaresQueAplican('1-10', false).length === 7,
)
verificar(
  '11 a 50 trabajadores, riesgo I-III → 21 estándares',
  estandaresQueAplican('11-50', false).length === 21,
)
verificar('más de 50 → 60 estándares', estandaresQueAplican('51+', false).length === 60)
verificar(
  'riesgo IV o V, aunque sean 6 trabajadores → 60',
  estandaresQueAplican('1-10', true).length === 60,
)

// Cada estándar de los artículos 3 y 9 corresponde al ítem del artículo 16
// que lleva su mismo nombre oficial: no se interpreta nada.
for (const tramo of ['7', '21'] as const) {
  const sinItem = ESTANDARES[tramo].filter((e) => !ITEMS.some((i) => i.codigo === e.item))
  verificar(
    `los ${tramo} estándares apuntan a ítems existentes`,
    sinItem.length === 0,
    JSON.stringify(sinItem),
  )
  const repetidos = ESTANDARES[tramo].length - new Set(ESTANDARES[tramo].map((e) => e.item)).size
  verificar(`los ${tramo} estándares no repiten ítem`, repetidos === 0)
}
verificar(
  'la identificación de peligros de la micro es el ítem 4.1.2 (mismo nombre en el artículo 16)',
  ESTANDARES['7'].find((e) => e.nombre.startsWith('Identificación de peligros'))?.item === '4.1.2',
)

// ── Calificación (artículo 27: lo que no aplica suma su valor máximo)
const nada = new Set<string>()
const r7 = calificar('1-10', false, nada)
verificar(
  'micro sin nada cumplido: 87,5% (lo que no aplica se regala)',
  r7.puntaje === 87.5,
  `dio ${r7.puntaje}`,
)
verificar('micro sin nada: "Aceptable" según el artículo 28', r7.valoracion === 'aceptable')
verificar(
  'micro sin nada: cumple 0 de 7 y le faltan 7',
  r7.cumplidos === 0 && r7.total === 7 && r7.faltantes.length === 7,
)

const r21 = calificar('11-50', false, nada)
verificar('11 a 50 sin nada cumplido: 62,25%', r21.puntaje === 62.25, `dio ${r21.puntaje}`)

const r60 = calificar('51+', false, nada)
verificar(
  'más de 50 sin nada cumplido: 0% y "Crítico"',
  r60.puntaje === 0 && r60.valoracion === 'critico',
)

const todo7 = new Set(ESTANDARES['7'].map((e) => e.item))
const c7 = calificar('1-10', false, todo7)
verificar('micro con los 7 cumplidos: 100%', c7.puntaje === 100 && c7.faltantes.length === 0)

const parcial = calificar('1-10', false, new Set(['1.1.4', '3.1.4']))
verificar(
  'micro con afiliación y exámenes: cumple 2 de 7',
  parcial.cumplidos === 2 && parcial.total === 7,
)
verificar('micro con afiliación y exámenes: 89%', parcial.puntaje === 89, `dio ${parcial.puntaje}`)

// Un código que no le aplica no suma dos veces ni cuenta como cumplido.
const ajeno = calificar('1-10', false, new Set(['5.1.1']))
verificar(
  'marcar un ítem que no aplica no cambia nada',
  ajeno.puntaje === 87.5 && ajeno.cumplidos === 0,
)

// ── Valoración (artículo 28): <60 crítico, 60 a 85 moderado, >85 aceptable
verificar('59,75 → crítico', valoracion(59.75) === 'critico')
verificar('60 → moderadamente aceptable', valoracion(60) === 'moderado')
verificar('85 → moderadamente aceptable', valoracion(85) === 'moderado')
verificar('85,25 → aceptable', valoracion(85.25) === 'aceptable')

// ── Llegada desde el diagnóstico con el tamaño ya respondido (?trabajadores=)
verificar('acepta "1-10" del diagnóstico', trabajadoresDesdeEnlace('1-10') === '1-10')
verificar(
  'acepta "51+" (en la URL llega con el + codificado)',
  trabajadoresDesdeEnlace(decodeURIComponent('51%2B')) === '51+',
)
verificar('ignora un valor inventado', trabajadoresDesdeEnlace('99') === null)
verificar('ignora el parámetro ausente', trabajadoresDesdeEnlace(null) === null)

console.log(`\n${fallos ? '✗' : '✓'} ${fallos} fallos`)
if (fallos) process.exit(1)
