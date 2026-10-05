/**
 * Pruebas del calendario de obligaciones del SG-SST, sin red ni modelo.
 *
 * Igual que en las guías: cada obligación cita artículos que existen en el
 * corpus, y toda cifra del texto tiene que estar en esos artículos. Además se
 * verifica el archivo .ics que se descarga para el calendario del teléfono.
 *
 * Uso: npm run evals:calendario
 */
import { CORPUS } from '../src/lib/normativa/buscar'
import { OBLIGACIONES, archivoIcs } from '../src/lib/calendario'

let fallos = 0
function verificar(nombre: string, condicion: boolean, detalle = '') {
  if (!condicion) fallos++
  console.log(
    `${condicion ? '✓' : '✗'} ${nombre}${!condicion && detalle ? `\n    ${detalle}` : ''}`,
  )
}

verificar(
  'hay obligaciones de cada tipo',
  ['mensual', 'anual', 'fecha', 'evento'].every((f) =>
    OBLIGACIONES.some((o) => o.frecuencia === f),
  ),
)
verificar('los id son únicos', new Set(OBLIGACIONES.map((o) => o.id)).size === OBLIGACIONES.length)

for (const o of OBLIGACIONES) {
  const fuentes = o.fuentes.map((f) =>
    CORPUS.find((a) => a.norma === f.norma && a.articulo === f.articulo),
  )
  verificar(
    `"${o.id}": sus fuentes existen`,
    o.fuentes.length > 0 && fuentes.every(Boolean),
    JSON.stringify(o.fuentes),
  )
  const respaldo = fuentes.map((a) => (a ? `${a.norma} ${a.articulo} ${a.texto}` : '')).join(' ')
  const cifras = [...new Set(`${o.titulo} ${o.detalle}`.match(/\d[\d.,]*\d|\d{2,}/g) ?? [])]
  const sin = cifras.filter((c) => !respaldo.includes(c))
  verificar(`"${o.id}": toda cifra sale de sus fuentes`, sin.length === 0, JSON.stringify(sin))
  if (o.frecuencia === 'fecha')
    verificar(`"${o.id}": tiene mes`, !!o.mes && o.mes >= 1 && o.mes <= 12)
}

// El comité de convivencia se rige por la Resolución 3461 de 2025, no por la
// frecuencia vieja que todavía repite la 0312.
const convivencia = OBLIGACIONES.find((o) => o.id === 'comite-convivencia')
verificar(
  'comité de convivencia: mensual y citando la Resolución 3461 de 2025',
  convivencia?.frecuencia === 'mensual' &&
    !!convivencia?.fuentes.some((f) => f.norma === 'Resolución 3461 de 2025'),
)

// ── Archivo .ics
const ics = archivoIcs(new Date(2026, 9, 1))
const lineas = ics.split('\r\n')
verificar('el .ics usa saltos de línea CRLF', !/[^\r]\n/.test(ics))
verificar(
  'el .ics abre y cierra el calendario',
  lineas[0] === 'BEGIN:VCALENDAR' && lineas.at(-2) === 'END:VCALENDAR',
)
const eventos = ics.split('BEGIN:VEVENT').length - 1
verificar(
  'el .ics trae 4 recordatorios (mensual, julio, diciembre, enero)',
  eventos === 4,
  `trae ${eventos}`,
)
verificar('el recordatorio mensual se repite cada mes', ics.includes('RRULE:FREQ=MONTHLY'))
verificar(
  'los de fecha fija se repiten cada año',
  (ics.match(/RRULE:FREQ=YEARLY/g) ?? []).length === 3,
)
verificar('julio arranca en julio', /DTSTART;VALUE=DATE:\d{4}0701/.test(ics))
verificar('diciembre arranca en diciembre', /DTSTART;VALUE=DATE:\d{4}1201/.test(ics))
verificar(
  'el recordatorio de julio de 2026 ya pasó: arranca en 2027',
  ics.includes('DTSTART;VALUE=DATE:20270701'),
)
verificar(
  'ninguna línea supera 75 caracteres',
  lineas.every((l) => new TextEncoder().encode(l).length <= 75),
)

console.log(`\n${fallos ? '✗' : '✓'} ${fallos} fallos`)
if (fallos) process.exit(1)
