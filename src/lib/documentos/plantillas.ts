import {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  Header,
  PageNumber,
  PageOrientation,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableLayoutType,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} from 'docx'
import { BUSINESS } from '@/lib/constants'
import { OBLIGACIONES } from '@/lib/calendario'

/**
 * Plantillas descargables en Word, con la misma presentación que la política
 * del generador (`app/api/politica/route.ts`): encabezado con código, pie con
 * páginas y títulos con la barra naranja en vez del azul por defecto de Word.
 *
 * Se generan al compilar el sitio (`app/descargas/[archivo]/route.ts`), no en
 * cada descarga.
 */

export type IdPlantilla = 'plan-anual' | 'acta-copasst' | 'matriz-peligros'

export interface Plantilla {
  id: IdPlantilla
  titulo: string
  descripcion: string
  /** Nombre del archivo descargado; también es la URL en /descargas. */
  archivo: string
  codigo: string
  /** Frases que la plantilla tiene que traer (las verifica evals:plantillas). */
  debeDecir: string[]
  fuentes: { norma: string; articulo: string }[]
  /** Guía del blog que explica cómo llenarla. */
  guia?: string
}

const D1072 = 'Decreto 1072 de 2015'
const GTC45 = 'GTC-45 (2012)'

export const PLANTILLAS: Plantilla[] = [
  {
    id: 'plan-anual',
    titulo: 'Plan anual de trabajo del SG-SST',
    descripcion:
      'Viene prellenado con las obligaciones de cada mes y de cada año, con su cronograma. Agrega las actividades que salgan de tu autoevaluación y tu matriz de peligros.',
    archivo: 'plan-anual-de-trabajo-sg-sst.docx',
    codigo: 'SST-PL-01',
    debeDecir: [
      'Objetivo',
      'Meta',
      'Responsable',
      'Recursos',
      'Firma del empleador',
      'Firma del responsable del SG-SST',
    ],
    fuentes: [
      { norma: D1072, articulo: '2.2.4.6.17' },
      { norma: D1072, articulo: '2.2.4.6.12' },
    ],
    guia: 'plan-anual-de-trabajo-sg-sst',
  },
  {
    id: 'acta-copasst',
    titulo: 'Acta de reunión del COPASST',
    descripcion:
      'Para la reunión mensual del comité: asistentes, orden del día, seguimiento de compromisos y firmas del presidente y el secretario.',
    archivo: 'acta-reunion-copasst.docx',
    codigo: 'SST-FO-01',
    debeDecir: [
      'Fecha',
      'Asistentes',
      'Orden del día',
      'Compromisos',
      'Firma del presidente',
      'Firma del secretario',
    ],
    fuentes: [
      { norma: 'Resolución 2013 de 1986', articulo: '7' },
      { norma: 'Resolución 2013 de 1986', articulo: '9' },
      { norma: 'Resolución 2013 de 1986', articulo: '12' },
    ],
  },
  {
    id: 'matriz-peligros',
    titulo: 'Matriz de peligros (GTC-45)',
    descripcion:
      'Hoja horizontal con las columnas de la GTC-45, un ejemplo resuelto y, como anexo, las tablas para valorar cada riesgo.',
    archivo: 'matriz-de-peligros-gtc-45.docx',
    codigo: 'SST-MA-01',
    debeDecir: [
      'Proceso',
      'Peligro',
      'Controles existentes',
      'Nivel de riesgo',
      'Aceptabilidad',
      'Medidas de intervención',
      'Anexo',
    ],
    fuentes: [
      { norma: GTC45, articulo: '3.1' },
      { norma: GTC45, articulo: '3.2' },
      { norma: GTC45, articulo: '3.3' },
      { norma: GTC45, articulo: '3.4' },
      { norma: GTC45, articulo: '3.5' },
      { norma: GTC45, articulo: '3.6' },
      { norma: GTC45, articulo: '3.7' },
      { norma: GTC45, articulo: '3.8' },
      { norma: GTC45, articulo: '3.9' },
      { norma: D1072, articulo: '2.2.4.6.15' },
    ],
    guia: 'matriz-de-peligros-identificacion-de-riesgos',
  },
]

// ── Estilo (paleta de globals.css; en docx los colores van sin almohadilla)

const NAVY = '0F2B3C'
const NARANJA = 'E8722A'
const GRIS = '6B7280'
const GRIS_FONDO = 'F3F4F6'
const TINTA = '1F2937'

/** Carta en twips: 12.240 × 15.840. Ancho útil = ancho − márgenes. */
const VERTICAL = { ancho: 10040, margen: 1100 }
const HORIZONTAL = { ancho: 14240, margen: 800 }

const BORDE = { style: BorderStyle.SINGLE, size: 4, color: 'D1D5DB' }
const BORDES = { top: BORDE, bottom: BORDE, left: BORDE, right: BORDE }
const VACIO = '[NOMBRE DE LA EMPRESA]'

function parrafo(
  contenido: string,
  opciones: { despues?: number; cursiva?: boolean; tam?: number } = {},
) {
  return new Paragraph({
    children: [
      new TextRun({
        text: contenido,
        size: opciones.tam ?? 20,
        color: opciones.cursiva ? GRIS : TINTA,
        italics: opciones.cursiva,
      }),
    ],
    spacing: { after: opciones.despues ?? 140, line: 290 },
  })
}

function titulo(contenido: string) {
  return new Paragraph({
    children: [new TextRun({ text: contenido, bold: true, size: 22, color: NAVY })],
    spacing: { before: 300, after: 140 },
    border: { top: { style: BorderStyle.SINGLE, size: 8, color: NARANJA, space: 6 } },
  })
}

interface OpcionesCelda {
  negrita?: boolean
  fondo?: string
  color?: string
  tam?: number
  centrado?: boolean
}

function celda(contenido: string, ancho: number, o: OpcionesCelda = {}) {
  return new TableCell({
    width: { size: ancho, type: WidthType.DXA },
    shading: o.fondo ? { type: ShadingType.CLEAR, fill: o.fondo, color: 'auto' } : undefined,
    margins: { top: 70, bottom: 70, left: 90, right: 90 },
    verticalAlign: VerticalAlign.CENTER,
    children: contenido.split('\n').map(
      (linea) =>
        new Paragraph({
          alignment: o.centrado ? AlignmentType.CENTER : undefined,
          children: [
            new TextRun({
              text: linea,
              bold: o.negrita,
              size: o.tam ?? 17,
              color: o.color ?? TINTA,
            }),
          ],
        }),
    ),
  })
}

/** Tabla con encabezado navy y filas alternadas. Anchos en twips, explícitos (Word ignora porcentajes). */
function tabla(
  anchos: number[],
  encabezados: string[],
  filas: string[][],
  o: { tam?: number; altoFila?: number; centrar?: number[] } = {},
) {
  return new Table({
    width: { size: anchos.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    columnWidths: anchos,
    layout: TableLayoutType.FIXED,
    borders: BORDES,
    rows: [
      new TableRow({
        tableHeader: true,
        children: encabezados.map((e, i) =>
          celda(e, anchos[i], {
            negrita: true,
            fondo: NAVY,
            color: 'FFFFFF',
            tam: o.tam,
            centrado: o.centrar?.includes(i),
          }),
        ),
      }),
      ...filas.map(
        (fila, f) =>
          new TableRow({
            height: o.altoFila ? { value: o.altoFila, rule: 'atLeast' } : undefined,
            children: fila.map((valor, i) =>
              celda(valor, anchos[i], {
                fondo: f % 2 ? GRIS_FONDO : undefined,
                tam: o.tam,
                centrado: o.centrar?.includes(i),
              }),
            ),
          }),
      ),
    ],
  })
}

function vacias(cantidad: number, columnas: number) {
  return Array.from({ length: cantidad }, () => Array<string>(columnas).fill(''))
}

function encabezado(nombreDocumento: string, codigo: string, ancho: number, extra: string) {
  const lateral = 2440
  const empresa = 3000
  return new Header({
    children: [
      new Table({
        width: { size: ancho, type: WidthType.DXA },
        columnWidths: [empresa, ancho - empresa - lateral, lateral],
        layout: TableLayoutType.FIXED,
        borders: BORDES,
        rows: [
          new TableRow({
            children: [
              celda(VACIO, empresa, { negrita: true, fondo: GRIS_FONDO, color: NAVY }),
              celda(nombreDocumento.toUpperCase(), ancho - empresa - lateral, {
                negrita: true,
                color: NAVY,
              }),
              celda(`Código: ${codigo}\nVersión: 1\n${extra}`, lateral, { tam: 15, color: GRIS }),
            ],
          }),
        ],
      }),
      new Paragraph({ text: '', spacing: { after: 160 } }),
    ],
  })
}

function pie(codigo: string) {
  return new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: 'D1D5DB', space: 6 } },
        children: [
          new TextRun({ text: `${codigo} · Página `, size: 15, color: GRIS }),
          new TextRun({ children: [PageNumber.CURRENT], size: 15, color: GRIS }),
          new TextRun({ text: ' de ', size: 15, color: GRIS }),
          new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 15, color: GRIS }),
          new TextRun({ text: ` · Plantilla de ${BUSINESS.name}`, size: 15, color: GRIS }),
        ],
      }),
    ],
  })
}

function firmas(ancho: number, cargos: string[]) {
  const columna = Math.floor(ancho / cargos.length)
  const sinBorde = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }
  return new Table({
    width: { size: columna * cargos.length, type: WidthType.DXA },
    columnWidths: cargos.map(() => columna),
    layout: TableLayoutType.FIXED,
    borders: {
      top: sinBorde,
      bottom: sinBorde,
      left: sinBorde,
      right: sinBorde,
      insideHorizontal: sinBorde,
      insideVertical: sinBorde,
    },
    rows: [
      new TableRow({
        children: cargos.map(
          (cargo) =>
            new TableCell({
              width: { size: columna, type: WidthType.DXA },
              margins: { top: 900, left: 200, right: 200 },
              borders: { top: sinBorde, bottom: sinBorde, left: sinBorde, right: sinBorde },
              children: [
                new Paragraph({
                  border: { top: { style: BorderStyle.SINGLE, size: 6, color: NAVY, space: 6 } },
                  children: [new TextRun({ text: cargo, bold: true, size: 18, color: NAVY })],
                }),
                new Paragraph({
                  children: [new TextRun({ text: 'Nombre:', size: 16, color: GRIS })],
                }),
              ],
            }),
        ),
      }),
    ],
  })
}

/** Renglones para escribir a mano. Es una tabla porque Pages ignora el borde inferior de un párrafo. */
function renglones(ancho: number, cantidad: number) {
  const linea = { style: BorderStyle.SINGLE, size: 4, color: 'D1D5DB' }
  const nada = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }
  return new Table({
    width: { size: ancho, type: WidthType.DXA },
    columnWidths: [ancho],
    layout: TableLayoutType.FIXED,
    borders: {
      top: nada,
      left: nada,
      right: nada,
      bottom: linea,
      insideHorizontal: linea,
      insideVertical: nada,
    },
    rows: Array.from(
      { length: cantidad },
      () => new TableRow({ height: { value: 440, rule: 'atLeast' }, children: [celda('', ancho)] }),
    ),
  })
}

/**
 * Marca dónde empieza una sección nueva (y por lo tanto una hoja nueva). Pages
 * ignora el salto de página de un párrafo; un cambio de sección lo respetan todos.
 */
const NUEVA_SECCION = new Paragraph({})

// ── Contenido de cada plantilla

const MESES = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
const MARCA = '●'

function planAnual() {
  const { ancho } = HORIZONTAL
  const anchosCronograma = MESES.map(() => 330)
  const anchos = [3200, 1600, 1700, ...anchosCronograma, ancho - 3200 - 1600 - 1700 - 330 * 12]

  const prellenadas = OBLIGACIONES.filter((o) => o.frecuencia !== 'evento').map((o) => {
    const meses = MESES.map((_, i) => (o.frecuencia === 'mensual' || o.mes === i + 1 ? MARCA : ''))
    return [o.titulo, '', '', ...meses, '']
  })

  return {
    vertical: false,
    contenido: [
      parrafo(
        'Contiene los objetivos, metas, actividades, responsables, cronograma y recursos del SG-SST para el año. ' +
          'Viene prellenado con las obligaciones periódicas: asigna responsables y recursos, programa en el cronograma ' +
          'las que no tienen mes fijo y agrega las actividades que salgan de tu autoevaluación y tu matriz de peligros.',
        { despues: 200 },
      ),
      titulo('1. Objetivos y metas'),
      tabla([5000, 5240, ancho - 10240], ['Objetivo', 'Meta', 'Indicador'], vacias(3, 3), {
        altoFila: 500,
      }),
      titulo('2. Actividades y cronograma'),
      tabla(
        anchos,
        ['Actividad', 'Responsable', 'Recursos', ...MESES, 'Seguimiento'],
        [...prellenadas, ...vacias(6, anchos.length)],
        { tam: 15, centrar: MESES.map((_, i) => i + 3) },
      ),
      parrafo(
        `${MARCA} = mes en que se hace la actividad. Las que no tienen marca se programan según tu año.`,
        {
          cursiva: true,
          tam: 16,
        },
      ),
      titulo('3. Aprobación'),
      parrafo(
        'El plan anual debe estar firmado por el empleador y por el responsable del SG-SST.',
        { tam: 18 },
      ),
      firmas(ancho, ['Firma del empleador', 'Firma del responsable del SG-SST']),
      parrafo(
        'Basado en el Decreto 1072 de 2015 (artículos 2.2.4.6.17 y 2.2.4.6.12) y en el calendario de obligaciones del SG-SST.',
        { cursiva: true, tam: 15, despues: 0 },
      ),
    ],
    extra: 'Año: ______',
  }
}

function actaCopasst() {
  const { ancho } = VERTICAL
  return {
    vertical: true,
    contenido: [
      tabla(
        [2510, 2510, 2510, ancho - 7530],
        ['Fecha', 'Hora de inicio', 'Hora de cierre', 'Lugar'],
        vacias(1, 4),
        { altoFila: 420 },
      ),
      parrafo('Tipo de reunión:   ☐ Ordinaria (mensual)    ☐ Extraordinaria', { despues: 60 }),
      titulo('Asistentes'),
      tabla(
        [2800, 1900, 1700, 1500, ancho - 7900],
        ['Nombre', 'Cargo', 'Representa', 'Rol en el comité', 'Firma'],
        [['', '', 'Empleador', 'Presidente', ''], ['', '', '', 'Secretario', ''], ...vacias(4, 5)],
        { altoFila: 420 },
      ),
      titulo('Orden del día'),
      parrafo('Sugerido; ajústalo a cada reunión.', { cursiva: true, tam: 16, despues: 80 }),
      ...[
        'Verificación de asistencia.',
        'Lectura y aprobación del acta anterior.',
        'Seguimiento de compromisos pendientes.',
        'Accidentes, incidentes y condiciones de trabajo reportados en el mes.',
        'Recomendaciones para presentar a la empresa.',
        'Nuevos compromisos y varios.',
      ].map((tema, i) => parrafo(`${i + 1}. ${tema}`, { despues: 40 })),
      titulo('Desarrollo de la reunión'),
      renglones(ancho, 7),
      titulo('Seguimiento de compromisos anteriores'),
      tabla([5200, 2500, ancho - 7700], ['Compromiso', 'Responsable', 'Estado'], vacias(3, 3), {
        altoFila: 400,
      }),
      titulo('Compromisos de esta reunión'),
      tabla(
        [5200, 2500, ancho - 7700],
        ['Compromiso', 'Responsable', 'Fecha límite'],
        vacias(4, 3),
        { altoFila: 400 },
      ),
      firmas(ancho, ['Firma del presidente', 'Firma del secretario']),
      parrafo(
        'El comité se reúne por lo menos una vez al mes, en la empresa y en horario de trabajo (Resolución 2013 de 1986, ' +
          'artículo 7). El presidente lo designa el empleador cada año y el secretario lo elige el comité (artículo 9).',
        { cursiva: true, tam: 15, despues: 0 },
      ),
    ],
    extra: 'Acta No. ____',
  }
}

function matrizPeligros() {
  const { ancho } = HORIZONTAL
  const anchos = [
    1050, 850, 1100, 680, 1250, 1150, 1100, 1400, 420, 420, 420, 420, 480, 650, 1150, 0,
  ]
  anchos[anchos.length - 1] = ancho - anchos.reduce((a, b) => a + b, 0)
  const encabezados = [
    'Proceso',
    'Zona / lugar',
    'Actividad o tarea',
    'Rutinaria (S/N)',
    'Peligro: descripción',
    'Clasificación',
    'Efectos posibles',
    'Controles existentes (fuente, medio, individuo)',
    'ND',
    'NE',
    'NP',
    'NC',
    'NR',
    'Nivel de riesgo',
    'Aceptabilidad',
    'Medidas de intervención',
  ]
  const ejemplo = [
    'Administrativo',
    'Oficina',
    'Trabajo en computador',
    'S',
    'Postura prolongada sentado',
    'Biomecánico',
    'Molestias musculares en espalda y cuello',
    'Silla con espaldar (individuo)',
    '2',
    '4',
    '8',
    '10',
    '80',
    'III',
    'Mejorable',
    'Pausas activas; ajustar altura de pantalla y silla',
  ]
  const anexo = (encabezadosAnexo: string[], filas: string[][], anchosAnexo: number[]) =>
    tabla(anchosAnexo, encabezadosAnexo, filas, { tam: 16 })

  return {
    vertical: false,
    contenido: [
      parrafo(
        'Una fila por cada peligro de cada tarea. Valora con las tablas del anexo: NP = ND × NE y NR = NP × NC. ' +
          'Actualízala como mínimo una vez al año y cuando cambien procesos, instalaciones o equipos, o después de un ' +
          'accidente mortal o un evento catastrófico. La fila de ejemplo es ilustrativa: bórrala al usarla.',
        { despues: 200, tam: 18 },
      ),
      tabla(anchos, encabezados, [ejemplo, ...vacias(10, anchos.length)], {
        tam: 14,
        altoFila: 520,
        centrar: [3, 8, 9, 10, 11, 12, 13],
      }),
      parrafo(
        'Clasificación de peligros (GTC-45): biológico, físico, químico, psicosocial, biomecánico, condiciones de ' +
          'seguridad y fenómenos naturales. Controles, en este orden: eliminar, sustituir, controles de ingeniería, ' +
          'controles administrativos y, de último, elementos de protección personal.',
        { despues: 0, tam: 16, cursiva: true },
      ),
      NUEVA_SECCION,
      titulo('Anexo. Tablas para valorar el riesgo'),
      parrafo('Nivel de deficiencia (ND)', { despues: 60 }),
      anexo(
        ['Nivel', 'Valor', 'Significado'],
        [
          [
            'Muy alto (MA)',
            '10',
            'Peligros que hacen posibles consecuencias muy significativas, o medidas preventivas nulas o inexistentes.',
          ],
          [
            'Alto (A)',
            '6',
            'Peligros que pueden dar consecuencias significativas, o medidas preventivas de eficacia baja.',
          ],
          [
            'Medio (M)',
            '2',
            'Peligros que pueden dar consecuencias poco significativas, o medidas preventivas de eficacia moderada.',
          ],
          [
            'Bajo (B)',
            'Sin valor',
            'No se detectó consecuencia alguna o las medidas preventivas son de eficacia alta. El riesgo está controlado.',
          ],
        ],
        [1800, 1100, ancho - 2900],
      ),
      parrafo('Nivel de exposición (NE)', { despues: 60 }),
      anexo(
        ['Nivel', 'Valor', 'Significado'],
        [
          [
            'Continua (EC)',
            '4',
            'Sin interrupción, o varias veces con tiempo prolongado durante la jornada.',
          ],
          ['Frecuente (EF)', '3', 'Varias veces durante la jornada, por tiempos cortos.'],
          ['Ocasional (EO)', '2', 'Alguna vez durante la jornada, por un periodo corto.'],
          ['Esporádica (EE)', '1', 'De manera eventual.'],
        ],
        [1800, 1100, ancho - 2900],
      ),
      parrafo('Nivel de probabilidad (NP = ND × NE)', { despues: 60 }),
      anexo(
        ['Nivel', 'Valores', 'Significado'],
        [
          [
            'Muy alto (MA)',
            'Entre 40 y 24',
            'La materialización del riesgo ocurre con frecuencia.',
          ],
          ['Alto (A)', 'Entre 20 y 10', 'La materialización del riesgo es posible.'],
          ['Medio (M)', 'Entre 8 y 6', 'Es posible que suceda el daño alguna vez.'],
          [
            'Bajo (B)',
            'Entre 4 y 2',
            'No es esperable que se materialice, aunque puede ser concebible.',
          ],
        ],
        [1800, 1600, ancho - 3400],
      ),
      parrafo('Nivel de consecuencia (NC)', { despues: 60 }),
      anexo(
        ['Nivel', 'Valor', 'Daños personales'],
        [
          ['Mortal o catastrófico (M)', '100', 'Muerte.'],
          [
            'Muy grave (MG)',
            '60',
            'Lesiones o enfermedades irreparables, con incapacidad permanente parcial o invalidez.',
          ],
          ['Grave (G)', '25', 'Lesiones o enfermedades con incapacidad laboral temporal.'],
          ['Leve (L)', '10', 'Lesiones o enfermedades que no requieren incapacidad.'],
        ],
        [2600, 1100, ancho - 3700],
      ),
      parrafo('Nivel de riesgo (NR = NP × NC) y aceptabilidad', { despues: 60 }),
      anexo(
        ['Nivel', 'Valores', 'Qué hacer', 'Aceptabilidad'],
        [
          [
            'I',
            'De 4000 a 600',
            'Situación crítica: suspender actividades hasta que el riesgo esté bajo control. Intervención urgente.',
            'No aceptable',
          ],
          [
            'II',
            'De 500 a 150',
            'Corregir y adoptar medidas de control de inmediato. Suspender actividades si el nivel es igual o mayor a 360.',
            'Aceptable con control específico',
          ],
          ['III', 'De 120 a 40', 'Establecer un plan de mejora.', 'Mejorable'],
          [
            'IV',
            '20',
            'Mantener los controles existentes y hacer comprobaciones periódicas.',
            'Aceptable',
          ],
        ],
        [900, 1700, ancho - 5400, 2800],
      ),
      parrafo(
        'Si el nivel de riesgo es igual o mayor a 600, o el riesgo es inminente, el trabajador suspende sus labores ' +
          'hasta que la situación se verifique.',
        { cursiva: true, tam: 16, despues: 0 },
      ),
    ],
    extra: 'Actualizada: ____',
  }
}

const CONTENIDOS: Record<
  IdPlantilla,
  () => { vertical: boolean; contenido: (Paragraph | Table)[]; extra: string }
> = {
  'plan-anual': planAnual,
  'acta-copasst': actaCopasst,
  'matriz-peligros': matrizPeligros,
}

export async function generarPlantilla(id: IdPlantilla): Promise<Buffer> {
  const plantilla = PLANTILLAS.find((p) => p.id === id)
  if (!plantilla) throw new Error(`Plantilla desconocida: ${id}`)
  const { vertical, contenido, extra } = CONTENIDOS[id]()
  const pagina = vertical ? VERTICAL : HORIZONTAL
  const partes: (Paragraph | Table)[][] = [[]]
  for (const bloque of contenido) {
    if (bloque === NUEVA_SECCION) partes.push([])
    else partes.at(-1)!.push(bloque)
  }

  const documento = new Document({
    creator: BUSINESS.name,
    title: plantilla.titulo,
    description: plantilla.descripcion,
    styles: { default: { document: { run: { font: 'Calibri', size: 20 } } } },
    sections: partes.map((children) => ({
      properties: {
        page: {
          size: vertical
            ? { width: 12240, height: 15840 }
            : { width: 12240, height: 15840, orientation: PageOrientation.LANDSCAPE },
          margin: { top: 900, bottom: 900, left: pagina.margen, right: pagina.margen },
        },
      },
      headers: { default: encabezado(plantilla.titulo, plantilla.codigo, pagina.ancho, extra) },
      footers: { default: pie(plantilla.codigo) },
      children,
    })),
  })
  return Packer.toBuffer(documento)
}
