/**
 * Pruebas de las plantillas descargables: se generan de verdad, se abren como
 * Word y se lee su texto. Sin red ni modelo.
 *
 * Las tablas de la matriz de peligros son cifras de la GTC-45: cada número de
 * la plantilla tiene que estar en los artículos que cita.
 *
 * Uso: npm run evals:plantillas
 */
import JSZip from 'jszip'
import { CORPUS } from '../src/lib/normativa/buscar'
import { OBLIGACIONES } from '../src/lib/calendario'
import { PLANTILLAS, generarPlantilla } from '../src/lib/documentos/plantillas'

let fallos = 0
function verificar(nombre: string, condicion: boolean, detalle = '') {
  if (!condicion) fallos++
  console.log(
    `${condicion ? '✓' : '✗'} ${nombre}${!condicion && detalle ? `\n    ${detalle}` : ''}`,
  )
}

async function textoDelWord(buffer: Buffer) {
  const zip = await JSZip.loadAsync(buffer)
  const xml = (await zip.file('word/document.xml')?.async('string')) ?? ''
  return { xml, texto: xml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ') }
}

async function main() {
  verificar(
    'hay plantilla de plan anual, acta del COPASST y matriz de peligros',
    ['plan-anual', 'acta-copasst', 'matriz-peligros'].every((id) =>
      PLANTILLAS.some((p) => p.id === id),
    ),
  )

  for (const p of PLANTILLAS) {
    const buffer = await generarPlantilla(p.id)
    verificar(`"${p.id}": es un .docx (zip)`, buffer.subarray(0, 2).toString() === 'PK')
    const { xml, texto } = await textoDelWord(buffer)
    verificar(`"${p.id}": tiene contenido`, texto.length > 500, `mide ${texto.length}`)
    const faltan = p.debeDecir.filter((frase) => !texto.includes(frase))
    verificar(
      `"${p.id}": trae sus campos obligatorios`,
      faltan.length === 0,
      JSON.stringify(faltan),
    )

    const fuentes = p.fuentes.map((f) =>
      CORPUS.find((a) => a.norma === f.norma && a.articulo === f.articulo),
    )
    verificar(`"${p.id}": sus fuentes existen`, fuentes.every(Boolean), JSON.stringify(p.fuentes))

    if (p.id === 'matriz-peligros') {
      verificar('matriz: va en hoja horizontal', xml.includes('w:orient="landscape"'))
      const respaldo = fuentes.map((a) => a?.texto ?? '').join(' ')
      const anexo = texto.slice(texto.indexOf('Anexo'))
      const cifras = [...new Set(anexo.match(/\d+/g) ?? [])].filter(
        (c) => !['45', '2012'].includes(c),
      )
      const sin = cifras.filter((c) => !new RegExp(`\\b${c}\\b`).test(respaldo))
      verificar(
        'matriz: toda cifra del anexo sale de la GTC-45',
        anexo.length > 0 && sin.length === 0,
        JSON.stringify(sin),
      )
    }
    if (p.id === 'plan-anual') {
      const sinFila = OBLIGACIONES.filter(
        (o) => o.frecuencia !== 'evento' && !texto.includes(o.titulo),
      )
      verificar(
        'plan anual: viene prellenado con las obligaciones del calendario',
        sinFila.length === 0,
        JSON.stringify(sinFila.map((o) => o.id)),
      )
    }
  }

  console.log(`\n${fallos ? '✗' : '✓'} ${fallos} fallos`)
  if (fallos) process.exit(1)
}

main()
