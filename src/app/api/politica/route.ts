import { after } from 'next/server'
import { contarEvento } from '@/lib/metricas'
import {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  Header,
  PageNumber,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  TableLayoutType,
  VerticalAlign,
  WidthType,
} from 'docx'
import {
  CODIGO_POLITICA as CODIGO,
  generarPoliticaSST,
  type DatosEmpresa,
} from '@/lib/documentos/politica-sst'
import { BUSINESS } from '@/lib/constants'
import { getClientIp, rateLimit } from '@/lib/peticiones'

/**
 * Devuelve la política como .docx real.
 *
 * El primer intento fue mandar un HTML con extensión .doc, que es un truco
 * conocido y funciona en Word de Windows. En macOS no: el sistema mira el
 * contenido y no la extensión, ve "HTML document text" y Pages y Word se niegan
 * a abrirlo. Un .docx es un ZIP con XML adentro, así que hay que armarlo de
 * verdad; se hace en el servidor para no cargar la librería en el navegador.
 *
 * El formato imita el de un documento real de SG-SST y no el de un texto
 * corrido: encabezado con código y versión repetido en cada página, pie con
 * numeración y tabla de aprobación al final. El estilo de título de Word se
 * evita a propósito, porque su azul por defecto delata la plantilla genérica.
 */

// Paleta de la marca (globals.css). En docx los colores van sin almohadilla.
const NAVY = '0F2B3C'
const NARANJA = 'E8722A'
const GRIS = '6B7280'
const GRIS_FONDO = 'F3F4F6'

/**
 * Ancho útil de la página en twips (1/20 de punto): carta son 12.240 menos los
 * márgenes de 1.100 por lado. Las tablas necesitan anchos EXPLÍCITOS en esta
 * unidad: con porcentajes, Word no reparte las columnas y cada celda se angosta
 * hasta partir el texto en una letra por renglón.
 */
const ANCHO_UTIL = 10040

const MAX_LARGO = 200

function texto(valor: unknown): string {
  return typeof valor === 'string' ? valor.slice(0, MAX_LARGO) : ''
}

function esOpcion<T extends string>(valor: unknown, opciones: readonly T[], porDefecto: T): T {
  return opciones.includes(valor as T) ? (valor as T) : porDefecto
}

const BORDE = { style: BorderStyle.SINGLE, size: 4, color: 'D1D5DB' }
const BORDES = { top: BORDE, bottom: BORDE, left: BORDE, right: BORDE }

function parrafo(contenido: string, espacioDespues = 140) {
  return new Paragraph({
    children: [new TextRun({ text: contenido, size: 21, color: '1F2937' })],
    spacing: { after: espacioDespues, line: 300 },
    alignment: AlignmentType.JUSTIFIED,
  })
}

/** Título de sección propio: barra naranja arriba y texto navy, nunca el azul de Word. */
function titulo(contenido: string) {
  return new Paragraph({
    children: [new TextRun({ text: contenido, bold: true, size: 23, color: NAVY })],
    spacing: { before: 320, after: 140 },
    border: { top: { style: BorderStyle.SINGLE, size: 8, color: NARANJA, space: 6 } },
  })
}

function celda(
  contenido: string,
  opciones: { negrita?: boolean; ancho?: number; fondo?: string; color?: string } = {},
) {
  return new TableCell({
    width: { size: opciones.ancho ?? ANCHO_UTIL / 3, type: WidthType.DXA },
    shading: opciones.fondo
      ? { type: ShadingType.CLEAR, fill: opciones.fondo, color: 'auto' }
      : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    verticalAlign: VerticalAlign.CENTER,
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: contenido,
            bold: opciones.negrita,
            size: 17,
            color: opciones.color ?? '1F2937',
          }),
        ],
      }),
    ],
  })
}

export async function POST(req: Request) {
  // Era el único endpoint sin límite. Armar el .docx consume CPU y memoria, y
  // sin tope cualquiera podía pedirlo en bucle sin costo para él.
  const limite = await rateLimit(`politica:${getClientIp(req)}`, 10, 10 * 60 * 1000)
  if (!limite.ok) {
    return new Response('Demasiadas descargas. Intenta de nuevo en unos minutos.', { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return new Response('Solicitud inválida.', { status: 400 })
  }

  const datos: DatosEmpresa = {
    razonSocial: texto(body.razonSocial),
    nit: texto(body.nit),
    actividad: texto(body.actividad),
    ciudad: texto(body.ciudad),
    representanteLegal: texto(body.representanteLegal),
    tamano: esOpcion(body.tamano, ['1-9', '10-49', '50+'] as const, '1-9'),
    claseRiesgo: esOpcion(body.claseRiesgo, ['I', 'II', 'III', 'IV', 'V'] as const, 'I'),
  }

  const doc = generarPoliticaSST(datos)
  const empresa = datos.razonSocial.trim() || '[RAZÓN SOCIAL]'
  const fechaCorta = new Date().toLocaleDateString('es-CO')

  // Encabezado que se repite en cada página: es la marca de un documento
  // controlado del SG-SST, lo primero que mira un auditor.
  const encabezado = new Header({
    children: [
      new Table({
        width: { size: ANCHO_UTIL, type: WidthType.DXA },
        columnWidths: [3000, 4600, 2440],
        layout: TableLayoutType.FIXED,
        borders: BORDES,
        rows: [
          new TableRow({
            children: [
              celda(empresa, { negrita: true, ancho: 3000, fondo: GRIS_FONDO, color: NAVY }),
              celda('POLÍTICA DE SEGURIDAD Y SALUD EN EL TRABAJO', {
                negrita: true,
                ancho: 4600,
                color: NAVY,
              }),
              new TableCell({
                width: { size: 2440, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [
                  new Paragraph({
                    children: [new TextRun({ text: `Código: ${CODIGO}`, size: 15, color: GRIS })],
                  }),
                  new Paragraph({
                    children: [new TextRun({ text: 'Versión: 1', size: 15, color: GRIS })],
                  }),
                  new Paragraph({
                    children: [new TextRun({ text: `Fecha: ${fechaCorta}`, size: 15, color: GRIS })],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      new Paragraph({ text: '', spacing: { after: 200 } }),
    ],
  })

  const pie = new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: 'D1D5DB', space: 6 } },
        children: [
          new TextRun({ text: `${CODIGO} · ${empresa} · Página `, size: 15, color: GRIS }),
          new TextRun({ children: [PageNumber.CURRENT], size: 15, color: GRIS }),
          new TextRun({ text: ' de ', size: 15, color: GRIS }),
          new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 15, color: GRIS }),
        ],
      }),
    ],
  })

  const contenido: (Paragraph | Table)[] = [
    new Paragraph({
      children: [
        new TextRun({
          text: 'POLÍTICA DE SEGURIDAD Y SALUD EN EL TRABAJO',
          bold: true,
          size: 30,
          color: NAVY,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
    }),
    new Paragraph({
      children: [new TextRun({ text: empresa, size: 22, color: NARANJA, bold: true })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 320 },
    }),
    // Ficha de identificación: los datos que el auditor busca de un vistazo.
    new Table({
      width: { size: ANCHO_UTIL, type: WidthType.DXA },
      columnWidths: [3000, 7040],
      layout: TableLayoutType.FIXED,
      borders: BORDES,
      rows: doc.encabezado
        .filter((e) => e.etiqueta !== 'Versión' && e.etiqueta !== 'Código')
        .map(
          (e) =>
            new TableRow({
              children: [
                celda(e.etiqueta, { negrita: true, ancho: 3000, fondo: GRIS_FONDO, color: NAVY }),
                celda(e.valor, { ancho: 7040 }),
              ],
            }),
        ),
    }),
  ]

  for (const seccion of doc.secciones) {
    contenido.push(titulo(seccion.titulo))
    for (const p of seccion.parrafos) contenido.push(parrafo(p))
  }

  // Firma con borde superior en un párrafo, no con una tabla: la tabla dibujaba
  // un recuadro alrededor del nombre y parecía un campo de formulario.
  contenido.push(
    new Paragraph({
      children: [new TextRun({ text: doc.firma[0], size: 21, color: '1F2937' })],
      spacing: { before: 400, after: 900 },
    }),
    new Paragraph({
      border: { top: { style: BorderStyle.SINGLE, size: 6, color: NAVY, space: 8 } },
      spacing: { after: 40 },
      children: [
        new TextRun({
          text: datos.representanteLegal.trim() || '[NOMBRE DEL REPRESENTANTE LEGAL]',
          bold: true,
          size: 21,
          color: NAVY,
        }),
      ],
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Representante Legal', size: 18, color: GRIS })],
      spacing: { after: 20 },
    }),
    new Paragraph({
      children: [new TextRun({ text: empresa, size: 18, color: GRIS })],
    }),
  )

  contenido.push(
    titulo('Anexo. Cumplimiento normativo de este documento'),
    parrafo(
      'Esta tabla indica qué exige la norma para una política de SG-SST y en qué parte del ' +
        'documento se cumple cada requisito, para poder verificarlo punto por punto.',
      200,
    ),
    new Table({
      width: { size: ANCHO_UTIL, type: WidthType.DXA },
      columnWidths: [5200, 2600, 2240],
      layout: TableLayoutType.FIXED,
      borders: BORDES,
      rows: [
        new TableRow({
          tableHeader: true,
          children: [
            celda('Requisito', { negrita: true, ancho: 5200, fondo: NAVY, color: 'FFFFFF' }),
            celda('Norma', { negrita: true, ancho: 2600, fondo: NAVY, color: 'FFFFFF' }),
            celda('Dónde se cumple', { negrita: true, ancho: 2240, fondo: NAVY, color: 'FFFFFF' }),
          ],
        }),
        ...doc.cumplimiento.map(
          (fila, i) =>
            new TableRow({
              children: [
                celda(fila.requisito, { ancho: 5200, fondo: i % 2 ? GRIS_FONDO : undefined }),
                celda(fila.articulo, { ancho: 2600, fondo: i % 2 ? GRIS_FONDO : undefined }),
                celda(fila.donde, { ancho: 2240, fondo: i % 2 ? GRIS_FONDO : undefined }),
              ],
            }),
        ),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text:
            'Borrador generado a partir del Decreto 1072 de 2015. Debe revisarse y firmarse por ' +
            `el representante legal antes de su adopción. Generado con ${BUSINESS.name}.`,
          italics: true,
          size: 16,
          color: GRIS,
        }),
      ],
      spacing: { before: 320 },
    }),
  )

  const documento = new Document({
    creator: BUSINESS.name,
    title: doc.titulo,
    description: 'Borrador de Política de SG-SST conforme al Decreto 1072 de 2015',
    styles: {
      default: {
        document: { run: { font: 'Calibri', size: 21 } },
      },
    },
    sections: [
      {
        properties: { page: { margin: { top: 1000, bottom: 1000, left: 1100, right: 1100 } } },
        headers: { default: encabezado },
        footers: { default: pie },
        children: contenido,
      },
    ],
  })

  const buffer = await Packer.toBuffer(documento)
  after(() => contarEvento('politica_word'))
  const nombre = `Politica-SST-${(datos.razonSocial || 'empresa')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}.docx`

  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="${nombre}"`,
    },
  })
}
