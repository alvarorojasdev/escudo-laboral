/**
 * Calendario de obligaciones del SG-SST: qué hay que hacer cada mes, cada año,
 * en fechas fijas y cuando pasa algo.
 *
 * Cada obligación cita los artículos del corpus de donde sale, y
 * `npm run evals:calendario` verifica que las cifras del texto estén en ellos.
 */

export type Frecuencia = 'mensual' | 'anual' | 'fecha' | 'evento' | 'bienal'

export interface Obligacion {
  id: string
  titulo: string
  detalle: string
  frecuencia: Frecuencia
  /** Mes fijo (1 a 12) para las de frecuencia 'fecha'. */
  mes?: number
  fuentes: { norma: string; articulo: string }[]
}

const R0312 = 'Resolución 0312 de 2019'
const D1072 = 'Decreto 1072 de 2015'

export const OBLIGACIONES: Obligacion[] = [
  // ── Cada mes
  {
    id: 'copasst',
    titulo: 'Reunión del COPASST',
    detalle:
      'El comité se reúne por lo menos una vez al mes, en la empresa y en horario de trabajo. Deja acta de cada reunión.',
    frecuencia: 'mensual',
    fuentes: [{ norma: 'Resolución 2013 de 1986', articulo: '7' }],
  },
  {
    id: 'comite-convivencia',
    titulo: 'Reunión del comité de convivencia laboral',
    detalle:
      'Desde la Resolución 3461 de 2025 se reúne de forma mensual para informes y seguimiento de compromisos, y además de forma extraordinaria cada vez que llegue una queja de acoso laboral.',
    frecuencia: 'mensual',
    fuentes: [
      { norma: 'Resolución 3461 de 2025', articulo: '9' },
      { norma: 'Resolución 3461 de 2025', articulo: '10' },
    ],
  },
  {
    id: 'indicadores-mensuales',
    titulo: 'Indicadores del mes',
    detalle:
      'Calcula la frecuencia y la severidad de la accidentalidad y el ausentismo por causa médica del mes.',
    frecuencia: 'mensual',
    fuentes: [{ norma: R0312, articulo: '30' }],
  },

  // ── Fechas fijas
  {
    id: 'inicio-plan-anual',
    titulo: 'Arranca el plan anual de trabajo',
    detalle:
      'El SG-SST se ejecuta de enero a diciembre: el plan anual que formulaste en diciembre empieza a ejecutarse desde el primero de enero.',
    frecuencia: 'fecha',
    mes: 1,
    fuentes: [{ norma: R0312, articulo: '26' }],
  },
  {
    id: 'informe-julio',
    titulo: 'Informe de avance del plan de mejoramiento',
    detalle:
      'En el mes de julio de cada año rindes informe del avance del plan de mejoramiento, teniendo en cuenta las recomendaciones de tu ARL.',
    frecuencia: 'fecha',
    mes: 7,
    fuentes: [{ norma: R0312, articulo: '28' }],
  },
  {
    id: 'cierre-diciembre',
    titulo: 'Autoevaluación, plan de mejora y plan del año siguiente',
    detalle:
      'En diciembre aplicas la autoevaluación de estándares mínimos con la tabla de valores, armas el plan de mejora según el resultado y formulas el plan anual que arranca en enero.',
    frecuencia: 'fecha',
    mes: 12,
    fuentes: [
      { norma: R0312, articulo: '26' },
      { norma: R0312, articulo: '28' },
    ],
  },

  // ── Una vez al año (sin fecha fija)
  {
    id: 'identificacion-peligros',
    titulo: 'Actualizar la identificación de peligros',
    detalle: 'La matriz de peligros se actualiza como mínimo una vez al año.',
    frecuencia: 'anual',
    fuentes: [{ norma: D1072, articulo: '2.2.4.6.15' }],
  },
  {
    id: 'revision-capacitacion',
    titulo: 'Revisar el programa de capacitación',
    detalle:
      'Mínimo una (1) vez al año, con el COPASST o el vigía y la alta dirección, para identificar mejoras.',
    frecuencia: 'anual',
    fuentes: [{ norma: D1072, articulo: '2.2.4.6.11' }],
  },
  {
    id: 'objetivos',
    titulo: 'Revisar los objetivos del SG-SST',
    detalle: 'Se revisan y evalúan mínimo una (1) vez al año, y se actualizan si hace falta.',
    frecuencia: 'anual',
    fuentes: [{ norma: D1072, articulo: '2.2.4.6.18' }],
  },
  {
    id: 'simulacro',
    titulo: 'Simulacro de emergencia',
    detalle: 'Como mínimo una (1) vez al año, con la participación de todos los trabajadores.',
    frecuencia: 'anual',
    fuentes: [{ norma: D1072, articulo: '2.2.4.6.25' }],
  },
  {
    id: 'auditoria',
    titulo: 'Auditoría del SG-SST',
    detalle: 'Una auditoría anual, planificada con la participación del COPASST o el vigía.',
    frecuencia: 'anual',
    fuentes: [{ norma: D1072, articulo: '2.2.4.6.29' }],
  },
  {
    id: 'revision-direccion',
    titulo: 'Revisión por la alta dirección',
    detalle:
      'La dirección revisa el SG-SST por lo menos una (1) vez al año, sin importar el tamaño de la empresa, incluido el cumplimiento del plan anual.',
    frecuencia: 'anual',
    fuentes: [{ norma: D1072, articulo: '2.2.4.6.31' }],
  },
  {
    id: 'rendicion-cuentas',
    titulo: 'Rendición de cuentas',
    detalle:
      'Quienes tienen responsabilidades en el SG-SST rinden cuentas como mínimo anualmente, y queda documentado.',
    frecuencia: 'anual',
    fuentes: [{ norma: D1072, articulo: '2.2.4.6.8' }],
  },
  {
    id: 'indicadores-anuales',
    titulo: 'Indicadores del año',
    detalle:
      'Proporción de accidentes mortales, prevalencia e incidencia de la enfermedad laboral.',
    frecuencia: 'anual',
    fuentes: [{ norma: R0312, articulo: '30' }],
  },

  // ── Cada dos años
  {
    id: 'eleccion-copasst',
    titulo: 'Elegir de nuevo el COPASST',
    detalle: 'Los miembros del comité tienen un período de dos (2) años.',
    frecuencia: 'bienal',
    fuentes: [{ norma: 'Resolución 2013 de 1986', articulo: '6' }],
  },

  // ── Cuando pasa algo
  {
    id: 'reporte-accidente',
    titulo: 'Si hay un accidente o una enfermedad laboral',
    detalle:
      'Repórtalo a la ARL y a la EPS dentro de los dos (2) días hábiles siguientes; los graves y mortales, también a la Dirección Territorial del Ministerio del Trabajo.',
    frecuencia: 'evento',
    fuentes: [{ norma: R0312, articulo: '9' }],
  },
  {
    id: 'investigacion-accidente',
    titulo: 'Investigar el incidente o accidente',
    detalle:
      'Dentro de los quince (15) días siguientes, con el equipo investigador. Si fue grave o mortal, envías el informe a la ARL en ese mismo plazo.',
    frecuencia: 'evento',
    fuentes: [
      { norma: 'Resolución 1401 de 2007', articulo: '4' },
      { norma: 'Resolución 1401 de 2007', articulo: '14' },
    ],
  },
  {
    id: 'queja-acoso',
    titulo: 'Si llega una queja de acoso laboral',
    detalle:
      'El comité de convivencia se reúne de forma extraordinaria para el procedimiento preventivo.',
    frecuencia: 'evento',
    fuentes: [{ norma: 'Resolución 3461 de 2025', articulo: '10' }],
  },
  {
    id: 'cambios',
    titulo: 'Si cambias procesos, instalaciones o equipos',
    detalle:
      'Actualiza la identificación de peligros. También después de un accidente mortal o un evento catastrófico.',
    frecuencia: 'evento',
    fuentes: [{ norma: D1072, articulo: '2.2.4.6.15' }],
  },
  {
    id: 'nuevo-trabajador',
    titulo: 'Si entra alguien nuevo',
    detalle:
      'Antes de que empiece, dale la inducción en SST con los peligros de su trabajo y cómo controlarlos, sin importar su tipo de contrato.',
    frecuencia: 'evento',
    fuentes: [{ norma: D1072, articulo: '2.2.4.6.11' }],
  },
]

// ── Archivo .ics para el calendario del teléfono o del correo

function escaparIcs(texto: string) {
  return texto
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
}

/** RFC 5545: ninguna línea pasa de 75 bytes; las largas siguen con un espacio. */
function plegar(linea: string) {
  const codificador = new TextEncoder()
  const partes: string[] = []
  let actual = ''
  for (const caracter of linea) {
    const limite = partes.length === 0 ? 75 : 74
    if (codificador.encode(actual + caracter).length > limite) {
      partes.push(actual)
      actual = ''
    }
    actual += caracter
  }
  partes.push(actual)
  return partes.map((p, i) => (i === 0 ? p : ` ${p}`)).join('\r\n')
}

function fechaIcs(d: Date) {
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
}

/** Próxima vez que cae ese día del mes (o de ese mes, si se da), contando desde hoy. */
function proxima(hoy: Date, dia: number, mes?: number) {
  const base = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())
  if (mes === undefined) {
    const d = new Date(base.getFullYear(), base.getMonth(), dia)
    return d < base ? new Date(base.getFullYear(), base.getMonth() + 1, dia) : d
  }
  const d = new Date(base.getFullYear(), mes - 1, dia)
  return d < base ? new Date(base.getFullYear() + 1, mes - 1, dia) : d
}

function lista(ids: string[]) {
  return ids
    .map((id) => OBLIGACIONES.find((o) => o.id === id)!)
    .map((o) => `- ${o.titulo}: ${o.detalle}`)
    .join('\n')
}

/**
 * Cuatro recordatorios de día completo que se repiten solos: uno mensual
 * (comités e indicadores) y los de enero, julio y diciembre. Las tareas anuales
 * sin fecha van en el de diciembre, como lista de cierre.
 */
export function archivoIcs(hoy = new Date()): string {
  const eventos = [
    {
      uid: 'mensual',
      inicio: proxima(hoy, 5),
      regla: 'FREQ=MONTHLY',
      titulo: 'SG-SST: tareas del mes',
      descripcion: lista(['copasst', 'comite-convivencia', 'indicadores-mensuales']),
    },
    {
      uid: 'julio',
      inicio: proxima(hoy, 1, 7),
      regla: 'FREQ=YEARLY',
      titulo: 'SG-SST: informe de avance del plan de mejoramiento',
      descripcion: lista(['informe-julio']),
    },
    {
      uid: 'diciembre',
      inicio: proxima(hoy, 1, 12),
      regla: 'FREQ=YEARLY',
      titulo: 'SG-SST: autoevaluación y plan del año siguiente',
      descripcion: `${lista(['cierre-diciembre'])}\n\nAntes de cerrar el año, revisa que hiciste:\n${lista(
        OBLIGACIONES.filter((o) => o.frecuencia === 'anual').map((o) => o.id),
      )}`,
    },
    {
      uid: 'enero',
      inicio: proxima(hoy, 2, 1),
      regla: 'FREQ=YEARLY',
      titulo: 'SG-SST: arranca el plan anual de trabajo',
      descripcion: lista(['inicio-plan-anual']),
    },
  ]

  const lineas = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Escudo Laboral//Calendario SG-SST//ES',
    'CALSCALE:GREGORIAN',
    ...eventos.flatMap((e) => [
      'BEGIN:VEVENT',
      `UID:sgsst-${e.uid}@escudo-laboral.vercel.app`,
      `DTSTAMP:${fechaIcs(hoy)}T000000Z`,
      `DTSTART;VALUE=DATE:${fechaIcs(e.inicio)}`,
      `RRULE:${e.regla}`,
      `SUMMARY:${escaparIcs(e.titulo)}`,
      `DESCRIPTION:${escaparIcs(`${e.descripcion}\n\nMás en https://escudo-laboral.vercel.app/calendario-sst`)}`,
      'END:VEVENT',
    ]),
    'END:VCALENDAR',
  ]
  return lineas.map(plegar).join('\r\n') + '\r\n'
}
