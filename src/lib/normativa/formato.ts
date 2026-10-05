/**
 * Convierte el texto corrido de un artículo en párrafos y listas, solo para
 * mostrarlo. No cambia una palabra: `aplanar(estructurar(t))` devuelve `t`
 * (salvo espacios), y `npm run evals:formato` lo verifica en todo el corpus.
 *
 * El corpus guarda cada artículo en un solo párrafo ("1. … 2. … PARÁGRAFO 1.
 * …"), que en pantalla es una pared de texto. Aquí se reconocen los numerales
 * "1.", "(1)" y "a)" cuando forman una secuencia que empieza en 1 (o en a) y
 * avanza de a uno: así un "artículo 2." suelto o un "2.2.4.6.8" no arman una
 * lista por error.
 */

export interface ItemLista {
  marca: string
  texto: string
  /** El mismo texto, separado si a su vez trae una lista (un nivel). */
  sub?: BloqueTexto[]
}

export type BloqueTexto = { tipo: 'parrafo'; texto: string } | { tipo: 'lista'; items: ItemLista[] }

interface Marca {
  inicio: number
  fin: number
  marca: string
}

type Clase = 'numero' | 'parentesis' | 'letra'

// El separador previo excluye el punto: en "1.1." el segundo "1." no es un ítem.
const PATRONES: Record<Clase, RegExp> = {
  numero: /(^|[\s:;])(\d{1,2})\.(?=\s)/g,
  parentesis: /(^|[\s:;])\((\d{1,2})\)(?=\s)/g,
  letra: /(^|[\s:;])([a-z])\)(?=\s)/g,
}

function valor(clase: Clase, simbolo: string) {
  return clase === 'letra' ? simbolo.charCodeAt(0) - 96 : Number(simbolo)
}

/** La secuencia 1, 2, 3… (o a, b, c…) más temprana del texto, o nada si no llega a dos. */
function secuencia(texto: string, clase: Clase): Marca[] {
  const candidatas = [...texto.matchAll(PATRONES[clase])].map((m) => {
    const inicio = (m.index ?? 0) + m[1].length
    return {
      inicio,
      fin: inicio + m[0].length - m[1].length,
      marca: m[0].slice(m[1].length),
      n: valor(clase, m[2]),
    }
  })
  const elegidas: Marca[] = []
  let desde = -1
  for (let esperado = 1; ; esperado++) {
    const siguiente = candidatas.find((c) => c.n === esperado && c.inicio > desde)
    if (!siguiente) break
    elegidas.push(siguiente)
    desde = siguiente.fin
  }
  return elegidas.length >= 2 ? elegidas : []
}

function enParrafos(texto: string, nivel: number): BloqueTexto[] {
  const limpio = texto.trim()
  if (!limpio) return []

  const opciones = (['letra', 'numero', 'parentesis'] as const)
    .map((clase) => secuencia(limpio, clase))
    .filter((s) => s.length > 0)
    .sort((a, b) => a[0].inicio - b[0].inicio)
  const marcas = opciones[0]
  if (!marcas) return [{ tipo: 'parrafo', texto: limpio }]

  const bloques: BloqueTexto[] = []
  const intro = limpio.slice(0, marcas[0].inicio).trim()
  if (intro) bloques.push({ tipo: 'parrafo', texto: intro })

  const items = marcas.map((m, i) => {
    const texto = limpio.slice(m.fin, marcas[i + 1]?.inicio ?? limpio.length).trim()
    const item: ItemLista = { marca: m.marca, texto }
    if (nivel === 0) {
      const sub = enParrafos(texto, 1)
      if (sub.some((b) => b.tipo === 'lista')) item.sub = sub
    }
    return item
  })
  bloques.push({ tipo: 'lista', items })
  return bloques
}

export function estructurar(texto: string): BloqueTexto[] {
  // Cada parágrafo es un bloque aparte, con su propia lista si la trae.
  return texto.split(/(?=PAR[ÁA]GRAFO\b)/).flatMap((parte) => enParrafos(parte, 0))
}

export function aplanar(bloques: BloqueTexto[]): string {
  return bloques
    .map((b) =>
      b.tipo === 'parrafo' ? b.texto : b.items.map((i) => `${i.marca} ${i.texto}`).join(' '),
    )
    .join(' ')
}
