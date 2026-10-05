/**
 * Generador del borrador de Política de Seguridad y Salud en el Trabajo.
 *
 * Se arma con plantilla y NO con el modelo de IA, a propósito. La política
 * tiene requisitos legales taxativos (Decreto 1072 de 2015, artículos 2.2.4.6.5
 * a 2.2.4.6.7) y un texto generado puede omitir uno sin que nadie lo note; la
 * plantilla garantiza que estén los cinco requisitos y los tres objetivos
 * mínimos, siempre. Además sale instantáneo y sin gastar cupo del proveedor.
 *
 * Cada sección declara qué artículo la exige (`fundamento`), para que el
 * documento se pueda auditar contra la norma y no sea "un texto bonito".
 */

/** Código del documento dentro del SG-SST: PO por política, 01 por ser la primera. */
export const CODIGO_POLITICA = 'SST-PO-01'

export const TAMANO_OPTIONS = [
  { value: '1-9', label: '1 a 9 trabajadores' },
  { value: '10-49', label: '10 a 49 trabajadores' },
  { value: '50+', label: '50 o más trabajadores' },
] as const

export const RIESGO_OPTIONS = [
  { value: 'I', label: 'Clase I — riesgo mínimo (oficinas, comercio)' },
  { value: 'II', label: 'Clase II — riesgo bajo' },
  { value: 'III', label: 'Clase III — riesgo medio' },
  { value: 'IV', label: 'Clase IV — riesgo alto' },
  { value: 'V', label: 'Clase V — riesgo máximo (construcción, altura)' },
] as const

export interface DatosEmpresa {
  razonSocial: string
  nit: string
  actividad: string
  ciudad: string
  representanteLegal: string
  tamano: (typeof TAMANO_OPTIONS)[number]['value']
  claseRiesgo: (typeof RIESGO_OPTIONS)[number]['value']
}

export interface SeccionDocumento {
  titulo: string
  parrafos: string[]
  /** Artículo que obliga a incluir esta sección. */
  fundamento: string
}

export interface DocumentoGenerado {
  titulo: string
  encabezado: { etiqueta: string; valor: string }[]
  secciones: SeccionDocumento[]
  firma: string[]
  /** Qué exige la norma y dónde lo cumple este documento. */
  cumplimiento: { requisito: string; articulo: string; donde: string }[]
}

/**
 * Con menos de 10 trabajadores la norma pide Vigía de SST; desde 10 en
 * adelante, Comité Paritario (Resolución 2013 de 1986, artículos 1 y 3). La
 * política tiene que decir a cuál se le comunica, así que se resuelve solo.
 */
function organoParitario(tamano: DatosEmpresa['tamano']) {
  return tamano === '1-9'
    ? 'Vigía de Seguridad y Salud en el Trabajo'
    : 'Comité Paritario de Seguridad y Salud en el Trabajo (COPASST)'
}

/**
 * El requisito 2 del artículo 2.2.4.6.6 exige que la política sea "apropiada
 * para la naturaleza de sus peligros". Una política genérica lo incumple, así
 * que el compromiso se ajusta a la clase de riesgo declarada.
 */
function compromisoSegunRiesgo(clase: DatosEmpresa['claseRiesgo']): string {
  if (clase === 'IV' || clase === 'V') {
    return (
      'Dado que la empresa está clasificada en clase de riesgo ' +
      clase +
      ', la organización asume un compromiso reforzado con el control de las tareas de alto riesgo ' +
      'que ejecuta, incluyendo la verificación previa de los permisos de trabajo, la certificación y el ' +
      'reentrenamiento del personal que las realiza, y la inspección periódica de los equipos de protección.'
    )
  }
  if (clase === 'III') {
    return (
      'Dado que la empresa está clasificada en clase de riesgo III, la organización se compromete a ' +
      'mantener controles verificables sobre los peligros propios de su operación y a revisar su ' +
      'eficacia cada vez que cambien los procesos, los equipos o las instalaciones.'
    )
  }
  return (
    'Aun cuando la empresa está clasificada en clase de riesgo ' +
    clase +
    ', la organización reconoce que la ausencia de peligros mayores no exime del deber de identificar, ' +
    'evaluar y controlar los riesgos presentes en sus actividades, incluidos los asociados a las ' +
    'condiciones locativas, ergonómicas y psicosociales.'
  )
}

function hoyEnTextoLargo(): string {
  const fecha = new Date()
  const meses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
  ]
  return `${fecha.getDate()} de ${meses[fecha.getMonth()]} de ${fecha.getFullYear()}`
}

export function generarPoliticaSST(datos: DatosEmpresa): DocumentoGenerado {
  const empresa = datos.razonSocial.trim() || '[RAZÓN SOCIAL]'
  const representante = datos.representanteLegal.trim() || '[NOMBRE DEL REPRESENTANTE LEGAL]'
  const actividad = datos.actividad.trim() || '[ACTIVIDAD ECONÓMICA]'
  const organo = organoParitario(datos.tamano)
  const fecha = hoyEnTextoLargo()

  return {
    titulo: `Política de Seguridad y Salud en el Trabajo — ${empresa}`,
    encabezado: [
      { etiqueta: 'Código', valor: CODIGO_POLITICA },
      { etiqueta: 'Razón social', valor: empresa },
      { etiqueta: 'NIT', valor: datos.nit.trim() || '[NIT]' },
      { etiqueta: 'Actividad económica', valor: actividad },
      { etiqueta: 'Clase de riesgo', valor: `Clase ${datos.claseRiesgo}` },
      { etiqueta: 'Ciudad', valor: datos.ciudad.trim() || '[CIUDAD]' },
      { etiqueta: 'Fecha de emisión', valor: fecha },
      { etiqueta: 'Versión', valor: '1' },
    ],
    secciones: [
      {
        titulo: '1. Declaración de la política',
        fundamento: 'Decreto 1072 de 2015, artículo 2.2.4.6.5',
        parrafos: [
          `${empresa}, identificada con NIT ${datos.nit.trim() || '[NIT]'}, dedicada a ${actividad}, ` +
            'establece por escrito la presente Política de Seguridad y Salud en el Trabajo como parte ' +
            'integral de sus políticas de gestión.',
          'La dirección de la empresa se compromete a implementar y mantener el Sistema de Gestión de ' +
            'la Seguridad y Salud en el Trabajo (SG-SST) para la gestión de los riesgos laborales, y a ' +
            'destinar los recursos humanos, físicos y financieros necesarios para su funcionamiento.',
        ],
      },
      {
        titulo: '2. Alcance',
        fundamento: 'Decreto 1072 de 2015, artículo 2.2.4.6.5',
        parrafos: [
          'Esta política aplica a todos los centros de trabajo de la empresa y a todos sus ' +
            'trabajadores, independientemente de su forma de contratación o vinculación, incluyendo ' +
            'contratistas y subcontratistas.',
        ],
      },
      {
        titulo: '3. Objetivos',
        fundamento: 'Decreto 1072 de 2015, artículo 2.2.4.6.7',
        parrafos: [
          'La empresa expresa su compromiso con los siguientes objetivos:',
          '3.1. Identificar los peligros, evaluar y valorar los riesgos y establecer los respectivos controles.',
          '3.2. Proteger la seguridad y la salud de todos los trabajadores mediante la mejora continua ' +
            'del Sistema de Gestión de la Seguridad y Salud en el Trabajo.',
          '3.3. Cumplir la normatividad nacional vigente aplicable en materia de riesgos laborales.',
        ],
      },
      {
        titulo: '4. Compromisos específicos de la empresa',
        fundamento: 'Decreto 1072 de 2015, artículo 2.2.4.6.6, numeral 2',
        parrafos: [compromisoSegunRiesgo(datos.claseRiesgo)],
      },
      {
        titulo: '5. Divulgación',
        fundamento: 'Decreto 1072 de 2015, artículos 2.2.4.6.5 y 2.2.4.6.6, numeral 4',
        parrafos: [
          `Esta política será comunicada al ${organo} y difundida a todos los niveles de la ` +
            'organización, y permanecerá accesible a todos los trabajadores y demás partes interesadas ' +
            'en el lugar de trabajo.',
        ],
      },
      {
        titulo: '6. Vigencia y revisión',
        fundamento: 'Decreto 1072 de 2015, artículo 2.2.4.6.6, numeral 5',
        parrafos: [
          `La presente política rige a partir del ${fecha} y será revisada como mínimo una vez al año. ` +
            'Se actualizará cuando se presenten cambios en materia de Seguridad y Salud en el Trabajo ' +
            'o en la empresa que así lo requieran.',
        ],
      },
    ],
    firma: [
      'En constancia se firma en ' + (datos.ciudad.trim() || '[CIUDAD]') + ', el ' + fecha + '.',
      '',
      '_____________________________________',
      representante,
      'Representante Legal',
      empresa,
    ],
    cumplimiento: [
      {
        requisito: 'Establecer el compromiso de la empresa con la implementación del SG-SST',
        articulo: 'Art. 2.2.4.6.6, num. 1',
        donde: 'Sección 1',
      },
      {
        requisito: 'Ser específica para la empresa y apropiada a sus peligros y tamaño',
        articulo: 'Art. 2.2.4.6.6, num. 2',
        donde: 'Secciones 1 y 4',
      },
      {
        requisito: 'Ser concisa, clara, fechada y firmada por el representante legal',
        articulo: 'Art. 2.2.4.6.6, num. 3',
        donde: 'Encabezado y firma',
      },
      {
        requisito: 'Ser difundida y accesible a todos los trabajadores',
        articulo: 'Art. 2.2.4.6.6, num. 4',
        donde: 'Sección 5',
      },
      {
        requisito: 'Ser revisada como mínimo una vez al año',
        articulo: 'Art. 2.2.4.6.6, num. 5',
        donde: 'Sección 6',
      },
      {
        requisito: 'Alcance sobre todos los centros de trabajo, contratistas y subcontratistas',
        articulo: 'Art. 2.2.4.6.5',
        donde: 'Sección 2',
      },
      {
        requisito: 'Comunicarla al Comité Paritario o Vigía de SST',
        articulo: 'Art. 2.2.4.6.5',
        donde: 'Sección 5',
      },
      {
        requisito: 'Incluir los tres objetivos mínimos',
        articulo: 'Art. 2.2.4.6.7',
        donde: 'Sección 3',
      },
    ],
  }
}

/** Versión en texto plano, para descargar o copiar. */
export function politicaComoTexto(doc: DocumentoGenerado): string {
  const lineas: string[] = [doc.titulo.toUpperCase(), '']
  for (const { etiqueta, valor } of doc.encabezado) lineas.push(`${etiqueta}: ${valor}`)
  lineas.push('')

  for (const seccion of doc.secciones) {
    lineas.push(seccion.titulo.toUpperCase(), '')
    for (const parrafo of seccion.parrafos) lineas.push(parrafo, '')
  }

  lineas.push(...doc.firma, '')
  lineas.push('---', 'CUMPLIMIENTO NORMATIVO DE ESTE DOCUMENTO', '')
  for (const fila of doc.cumplimiento) {
    lineas.push(`- ${fila.requisito} (${fila.articulo}) → ${fila.donde}`)
  }
  lineas.push(
    '',
    'Este es un borrador generado automáticamente a partir del Decreto 1072 de 2015.',
    'Debe ser revisado y firmado por el representante legal antes de su adopción.',
  )
  return lineas.join('\n')
}
