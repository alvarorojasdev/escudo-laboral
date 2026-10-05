import type { ArticuloNormativo } from './tipos'
import { RESOLUCION_0312_2019 } from './resolucion-0312-2019'
import { DECRETO_1072_2015_CAP6 } from './decreto-1072-2015-cap6'
import { DECRETO_1072_2015_CAP11 } from './decreto-1072-2015-cap11'
import { RESOLUCION_1401_2007 } from './resolucion-1401-2007'
import { LEY_1562_2012 } from './ley-1562-2012'
import { GTC_45 } from './gtc-45'
import { RESOLUCION_2400_1979 } from './resolucion-2400-1979'
import { RESOLUCION_2013_1986 } from './resolucion-2013-1986'
import { RESOLUCION_4272_2021 } from './resolucion-4272-2021'
import { DECRETO_1295_1994 } from './decreto-1295-1994'
import { LEY_1010_2006 } from './ley-1010-2006'
import { LEY_776_2002 } from './ley-776-2002'
import { RESOLUCION_3461_2025 } from './resolucion-3461-2025'

export const CORPUS: ArticuloNormativo[] = [
  ...RESOLUCION_0312_2019,
  ...DECRETO_1072_2015_CAP6,
  ...DECRETO_1072_2015_CAP11,
  ...RESOLUCION_1401_2007,
  ...LEY_1562_2012,
  ...GTC_45,
  ...RESOLUCION_2400_1979,
  ...RESOLUCION_2013_1986,
  ...RESOLUCION_4272_2021,
  ...DECRETO_1295_1994,
  ...LEY_1010_2006,
  ...LEY_776_2002,
  ...RESOLUCION_3461_2025,
]

const VACIAS = new Set([
  'para', 'como', 'cual', 'cuales', 'cuanto', 'cuantos', 'cuanta', 'cuantas',
  'que', 'los', 'las', 'del', 'con', 'por', 'una', 'uno', 'unos', 'unas',
  'mi', 'tu', 'su', 'sus', 'este', 'esta', 'esto', 'hay', 'tiene', 'tengo',
  'debe', 'deben', 'ser', 'son', 'sobre', 'entre', 'desde', 'hasta', 'donde',
  'cuando', 'porque', 'segun', 'tambien', 'pero', 'mas', 'muy', 'todo', 'todos',
  // Verbos y muletillas de relleno: aparecen en cualquier pregunta y en muchos
  // artículos, así que solo ensucian. "multa por no tener el sg-sst" traía el
  // artículo de Documentación porque sus temas dicen "que documentos debo tener".
  'tener', 'tengo', 'hacer', 'hago', 'debo', 'puedo', 'necesito', 'quiero',
  'saber', 'poner', 'dar', 'estar', 'esta', 'hay', 'sirve', 'pasa', 'aplica',
])

export function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s.]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function terminos(consulta: string) {
  return normalizar(consulta)
    .split(' ')
    .filter((t) => t.length > 2 && !VACIAS.has(t))
}

function tokenizar(texto: string): string[] {
  return normalizar(texto).split(/[\s.]+/).filter(Boolean)
}

/**
 * En cuántos artículos aparece cada palabra. Sirve para restarle peso a las
 * que están en todos lados: "sg-sst" o "trabajo" no distinguen nada, mientras
 * que "multa" o "copasst" sí. Sin esto, preguntar "multa por no tener SG-SST"
 * traía artículos sobre quién diseña el sistema, porque la sigla ganaba.
 */
const FRECUENCIA = new Map<string, number>()
for (const articulo of CORPUS) {
  const vistas = new Set([
    ...tokenizar(articulo.temas.join(' ')),
    ...tokenizar(articulo.titulo),
  ])
  for (const palabra of vistas) {
    FRECUENCIA.set(palabra, (FRECUENCIA.get(palabra) ?? 0) + 1)
  }
}

/**
 * Peso de una palabra según lo rara que sea en el corpus (IDF clásico).
 *
 * Antes esto eran umbrales fijos sobre la proporción de artículos (>0,3 → 0,15;
 * >0,15 → 0,4; si no 1) y tenía un defecto grave: el peso dependía del TAMAÑO
 * del corpus. Al sumar la Resolución 4272 y el Decreto 1295, el corpus pasó de
 * 183 a 201 artículos, "sst" cruzó el umbral de 0,15 y saltó de peso 0,4 a 1;
 * como aparece en casi toda consulta, tapó a las palabras que de verdad
 * distinguen y el examen de búsqueda cayó de 61/61 a 56/61 sin que nadie
 * tocara la búsqueda. La fórmula logarítmica no tiene saltos: agregar normas
 * mueve los pesos de forma suave y proporcional.
 *
 * El exponente afila el contraste entre lo raro y lo común. Se probaron 1, 1,5,
 * 2, 2,5 y 3 contra el examen de búsqueda: 1 fue el mejor (45 primeros puestos
 * de 61) y de ahí en adelante empeora parejo (3 da 41). Afilar de más hace que
 * una sola palabra rara decida la consulta e ignore el resto.
 */
const EXPONENTE_RAREZA = 1

function rareza(palabra: string): number {
  const enCuantos = FRECUENCIA.get(palabra) ?? 0
  const idf = Math.log((CORPUS.length + 1) / (enCuantos + 1))
  const maximo = Math.log(CORPUS.length + 1)
  return Math.pow(idf / maximo, EXPONENTE_RAREZA)
}

/**
 * Terminaciones que se recortan para comparar por raíz, de la más larga a la
 * más corta (se recorta una sola, la primera que aplique).
 */
const TERMINACIONES = [
  'aciones', 'iciones', 'amientos', 'imientos',
  'adores', 'adoras', 'amiento', 'imiento',
  'acion', 'icion', 'ciones', 'antes', 'entes',
  'ador', 'adora', 'ante', 'ente', 'ados', 'idos', 'adas', 'idas',
  'ado', 'ido', 'ada', 'ida', 'ar', 'er', 'ir', 'es', 's', 'o', 'a',
]

/** Longitud mínima que debe quedar tras recortar. Ver `raiz`. */
const MIN_RAIZ = 6

/**
 * Recorta la terminación para comparar palabras de la misma familia: así
 * "capacito" y "capacitación" caen las dos en "capacit". Sin esto, preguntar
 * "cada cuánto capacito a mis empleados" no encontraba el artículo de
 * Capacitación —porque "capacitacion" no empieza con "capacito"— y ganaba el
 * de colores de seguridad, por la palabra "seguridad".
 *
 * El mínimo de 6 caracteres es lo que evita pasarse de recorte: sin él,
 * "empleados" y "empleadores" quedarían los dos en "emple" y la pregunta por
 * las obligaciones DEL TRABAJADOR traería las del EMPLEADOR, que dicen lo
 * contrario. Con el mínimo quedan en "empleado" y "empleador", distintos.
 */
function raiz(palabra: string): string {
  for (const fin of TERMINACIONES) {
    if (palabra.endsWith(fin) && palabra.length - fin.length >= MIN_RAIZ) {
      return palabra.slice(0, -fin.length)
    }
  }
  return palabra
}

/**
 * Coincide por palabra completa, por prefijo o por raíz común, nunca por
 * substring: así "accidente" encuentra "accidentes", pero "tener" no coincide
 * dentro de "mantener", que hacía ganar artículos irrelevantes.
 */
function coincide(palabrasCampo: string[], palabra: string): boolean {
  const raizPalabra = raiz(palabra)
  return palabrasCampo.some(
    (p) =>
      p === palabra ||
      (palabra.length >= 5 && p.startsWith(palabra)) ||
      (raizPalabra.length >= MIN_RAIZ && raiz(p) === raizPalabra),
  )
}

/**
 * Número con que se identifica cada norma ('1072' para el Decreto 1072 de 2015,
 * '0312' para la Resolución 0312 de 2019…). Se deriva del propio corpus para
 * que sumar una norma no obligue a tocar esta tabla.
 */
const NUMERO_DE_NORMA = new Map<string, string>()
for (const articulo of CORPUS) {
  const m = /(?:resolucion|decreto|ley|gtc)[\s-]*(\d+)/.exec(normalizar(articulo.norma))
  if (!m) continue
  NUMERO_DE_NORMA.set(m[1], articulo.norma)
  // "0312" se dice y se escribe también como "312".
  NUMERO_DE_NORMA.set(String(Number(m[1])), articulo.norma)
}

/**
 * Detecta si la consulta nombra una norma concreta. Sin esto, preguntar
 * "artículo 3 de la resolución 0312" le daba el bonus de referencia explícita
 * al artículo 3 de TODAS las normas —y ganaban el de la Resolución 2013 y el de
 * la 4272— ignorando la única parte de la pregunta que decía cuál se quería.
 */
/** Todas las normas nombradas en un texto ya normalizado, con su posición. */
export function normasMencionadas(textoNorm: string): { norma: string; indice: number }[] {
  const menciones: { norma: string; indice: number }[] = []
  for (const m of textoNorm.matchAll(/\b\d{3,4}\b/g)) {
    const norma = NUMERO_DE_NORMA.get(m[0])
    if (norma) menciones.push({ norma, indice: m.index ?? 0 })
  }
  return menciones
}

/** El Decreto 1072 es la única norma del corpus que numera sus artículos 2.2.4.x.y. */
export const NORMA_DE_LOS_NUMERALES = NUMERO_DE_NORMA.get('1072') ?? 'Decreto 1072 de 2015'

export function normaMencionada(consultaNorm: string): string | null {
  for (const m of consultaNorm.matchAll(/\b\d{3,4}\b/g)) {
    const norma = NUMERO_DE_NORMA.get(m[0])
    if (norma) return norma
  }
  return null
}

/**
 * Extrae las referencias a artículos que la consulta menciona de forma
 * explícita. Es deliberadamente estricto: un número suelto como el "8" de
 * "tengo 8 trabajadores" NO es una referencia, y tratarlo como tal hacía que
 * ganaran todos los artículos número 8 de todas las normas.
 */
function referenciasExplicitas(consultaNorm: string): Set<string> {
  const refs = new Set<string>()

  // Numerales con puntos: 2.2.4.6.8 o 3.7 (GTC-45), que solo pueden ser artículos.
  for (const m of consultaNorm.matchAll(/\b\d+(?:\.\d+){1,}\b/g)) refs.add(m[0])

  // Números precedidos de "articulo" / "art". El lookahead evita partir un
  // numeral: en "articulo 2.2.4.6.8" no debe capturarse el "2" suelto.
  for (const m of consultaNorm.matchAll(/\bart(?:iculo)?s?\.?\s+(\d{1,3})\b(?!\.\d)/g)) {
    refs.add(m[1])
  }

  return refs
}

/**
 * Puntúa cada artículo contra la consulta. Los `temas` pesan más que el texto
 * porque son las palabras con que un empresario describiría el problema; una
 * referencia explícita al artículo lo lleva directo arriba.
 */
function puntuar(
  articulo: ArticuloNormativo,
  palabras: string[],
  referencias: Set<string>,
  norma: string | null,
  consultaNorm: string,
) {
  let puntos = 0

  // Si la consulta nombró una norma, el bonus por citar un artículo solo vale
  // dentro de ella: "artículo 3 de la 0312" no puede traer el artículo 3 de
  // otra norma cualquiera. Nombrarla ya suma por sí solo.
  const esLaNormaPedida = norma !== null && articulo.norma === norma
  if (norma === null || esLaNormaPedida) {
    if (referencias.has(normalizar(articulo.articulo))) puntos += 50
  }
  if (esLaNormaPedida) puntos += 15

  // Los `temas` están escritos como preguntaría un empresario ("quien paga la
  // arl", "cuanto tiempo tengo para denunciar"). Cuando la consulta contiene uno
  // entero, es la señal más fuerte que hay y antes valía lo mismo que cualquier
  // palabra suelta: el artículo de Caducidad perdía contra otros de la misma ley
  // que solo repetían "acoso" y "laboral", palabras que están en todos ellos.
  for (const tema of articulo.temas) {
    const t = normalizar(tema)
    if (t.split(' ').length >= 3 && consultaNorm.includes(t)) puntos += 10
  }

  const temasPalabras = tokenizar(articulo.temas.join(' '))
  const tituloPalabras = tokenizar(articulo.titulo)
  const textoPalabras = tokenizar(articulo.texto)

  let puntosTexto = 0
  for (const palabra of palabras) {
    const peso = rareza(palabra)
    // Se probó contar cada palabra una sola vez (temas O título, no los dos) y
    // el examen de búsqueda bajó de 50/54 a 49/54 y de 36 a 34 primeros puestos:
    // que una palabra esté en el título Y en los temas sí es señal, no ruido.
    if (coincide(temasPalabras, palabra)) puntos += 6 * peso
    if (coincide(tituloPalabras, palabra)) puntos += 4 * peso
    if (coincide(textoPalabras, palabra)) puntosTexto += 1 * peso
  }

  // El texto suma poco y con tope: hay artículos de 9.000 caracteres que, solo
  // por largos, coincidían con media consulta y le ganaban al artículo correcto.
  return puntos + Math.min(puntosTexto, 3)
}

export function buscarArticulos(consulta: string, limite = 4): ArticuloNormativo[] {
  const palabras = terminos(consulta)
  if (palabras.length === 0) return []

  const consultaNorm = normalizar(consulta)
  const referencias = referenciasExplicitas(consultaNorm)
  const norma = normaMencionada(consultaNorm)

  return CORPUS.map((articulo) => ({
    articulo,
    puntos: puntuar(articulo, palabras, referencias, norma, consultaNorm),
  }))
    .filter((r) => r.puntos > 0)
    .sort((a, b) => b.puntos - a.puntos)
    .slice(0, limite)
    .map((r) => r.articulo)
}

/**
 * Hay artículos de más de 9.000 caracteres. Mandar varios completos agota el
 * cupo de tokens por minuto del proveedor y las respuestas empiezan a encolarse,
 * así que se recorta cada uno a lo necesario para responder y citar.
 */
const MAX_CARACTERES_POR_ARTICULO = 1200

/** Caracteres del arranque que se conservan siempre: encuadran el artículo. */
const CARACTERES_DE_ENTRADA = 450

/**
 * Recorta un artículo largo quedándose con lo que responde la consulta.
 *
 * El recorte anterior cortaba por el principio sin mirar la pregunta, y eso
 * dejaba afuera datos que sí estaban cargados: 71 de los 245 artículos superan
 * el tope, y entre ellos el más citado de todos —Obligaciones de los
 * empleadores, de 5.912 caracteres— llegaba al modelo con menos de la quinta
 * parte. El tope de tokens no cambia; lo que cambia es cuál quinta parte.
 *
 * Se conserva siempre el arranque, porque encuadra de qué trata el artículo, y
 * después se agregan los fragmentos con más palabras de la consulta, en el
 * orden original del texto para no alterar el sentido.
 */
function recortarSegunConsulta(texto: string, palabras: string[]): string {
  if (texto.length <= MAX_CARACTERES_POR_ARTICULO) return texto

  const entrada = texto.slice(0, CARACTERES_DE_ENTRADA)
  const resto = texto.slice(CARACTERES_DE_ENTRADA)

  // Se parte por frases: cortar por caracteres deja oraciones a la mitad y el
  // modelo las completa por su cuenta, que es justo lo que hay que evitar.
  const frases = resto.split(/(?<=\.)\s+/).filter(Boolean)
  const puntuadas = frases.map((frase, orden) => {
    const palabrasFrase = tokenizar(frase)
    const puntos = palabras.reduce((s, p) => s + (coincide(palabrasFrase, p) ? rareza(p) : 0), 0)
    return { frase, orden, puntos }
  })

  const disponible = MAX_CARACTERES_POR_ARTICULO - entrada.length
  const elegidas = new Set<number>()
  let usado = 0
  for (const f of [...puntuadas].sort((a, b) => b.puntos - a.puntos)) {
    if (f.puntos === 0 || usado + f.frase.length > disponible) continue
    elegidas.add(f.orden)
    usado += f.frase.length
  }

  // Si sobra presupuesto, se sigue el texto en orden. Importa para preguntas
  // amplias ("¿cuáles son mis obligaciones?"), donde ninguna frase destaca
  // sobre las otras y lo más útil es simplemente continuar leyendo.
  for (const f of puntuadas) {
    if (elegidas.has(f.orden) || usado + f.frase.length > disponible) continue
    elegidas.add(f.orden)
    usado += f.frase.length
  }

  const seleccion = puntuadas.filter((f) => elegidas.has(f.orden))
  if (seleccion.length === 0) return `${texto.slice(0, MAX_CARACTERES_POR_ARTICULO)}… [texto recortado]`

  // Los '…' marcan dónde se saltó texto, para que quede claro que no es el
  // artículo completo y el modelo no lo cite como si lo fuera.
  let salida = `${entrada}…`
  let previo = -1
  for (const f of seleccion) {
    salida += f.orden === previo + 1 ? ` ${f.frase}` : ` … ${f.frase}`
    previo = f.orden
  }
  return `${salida}… [texto recortado]`
}

export function formatearParaPrompt(articulos: ArticuloNormativo[], consulta = '') {
  if (articulos.length === 0) return ''
  const palabras = terminos(consulta)
  return articulos
    .map((a) => {
      const texto = a.sinRecorte
        ? a.texto
        : palabras.length > 0
          ? recortarSegunConsulta(a.texto, palabras)
          : a.texto.length > MAX_CARACTERES_POR_ARTICULO
            ? `${a.texto.slice(0, MAX_CARACTERES_POR_ARTICULO)}… [texto recortado]`
            : a.texto
      const nota = a.notaSegunConsulta?.(consulta)
      return `[${a.norma}, artículo ${a.articulo} — ${a.titulo}]\n${texto}${nota ? `\n${nota}` : ''}`
    })
    .join('\n\n')
}

/**
 * Clave de un artículo que CONSERVA la norma.
 *
 * Antes se guardaba solo el número, y ahí se perdía la relación: si la búsqueda
 * servía el artículo 13 de la Ley 1562, el modelo podía escribir "artículo 13
 * del Decreto 1295" y el validador lo daba por bueno, porque "13" estaba en el
 * conjunto. Las dos normas tienen un artículo 13 y dicen cosas distintas.
 */
export function claveArticulo(norma: string, articulo: string): string {
  return `${normalizar(norma)}::${normalizar(articulo)}`
}

/** Claves que quedan respaldadas cuando la búsqueda entrega estos artículos. */
export function clavesDeRespaldo(articulos: ArticuloNormativo[]): string[] {
  return articulos.flatMap((a) => [
    claveArticulo(a.norma, a.articulo),
    ...(a.remiteA ?? []).map((ref) => {
      const [norma, articulo] = ref.split('|')
      return claveArticulo(norma, articulo)
    }),
  ])
}

/** Referencias válidas del corpus, para detectar citas inventadas. */
export const REFERENCIAS_VALIDAS = new Set(CORPUS.map((a) => normalizar(a.articulo)))
