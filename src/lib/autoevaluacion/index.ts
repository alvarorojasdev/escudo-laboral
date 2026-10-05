import { ESTANDARES, ITEMS, type ItemEstandar } from './estandares'

export { ESTANDARES, ITEMS }
export type { Ciclo, EstandarReducido, ItemEstandar } from './estandares'

export type Trabajadores = '1-10' | '11-50' | '51+'
export type Valoracion = 'critico' | 'moderado' | 'aceptable'

const TRABAJADORES: Trabajadores[] = ['1-10', '11-50', '51+']

/** Tamaño que trae el enlace del diagnóstico (?trabajadores=), o nada si no es válido. */
export function trabajadoresDesdeEnlace(valor: string | null): Trabajadores | null {
  return TRABAJADORES.find((t) => t === valor) ?? null
}

/** Un estándar tal como se le pregunta a la empresa. */
export interface Pregunta {
  item: string
  nombre: string
  criterio: string
  grupo: string
}

const ITEM_POR_CODIGO = new Map(ITEMS.map((i) => [i.codigo, i]))

/**
 * Estándares que le aplican a la empresa: 7 (artículo 3), 21 (artículo 9) o 60
 * (artículo 16). El riesgo IV o V lleva a los 60 sin importar el tamaño.
 */
export function estandaresQueAplican(trabajadores: Trabajadores, riesgoAlto: boolean): Pregunta[] {
  const desdeItem = (i: ItemEstandar): Pregunta => ({
    item: i.codigo,
    nombre: i.nombre,
    criterio: i.criterio,
    grupo: i.grupo,
  })
  if (riesgoAlto || trabajadores === '51+') return ITEMS.map(desdeItem)
  return ESTANDARES[trabajadores === '1-10' ? '7' : '21'].map((e) => ({
    ...e,
    grupo: ITEM_POR_CODIGO.get(e.item)!.grupo,
  }))
}

/** Artículo 28: menos de 60 es crítico; de 60 a 85, moderado; más de 85, aceptable. */
export function valoracion(puntaje: number): Valoracion {
  if (puntaje < 60) return 'critico'
  if (puntaje <= 85) return 'moderado'
  return 'aceptable'
}

export interface Resultado {
  /** Puntaje oficial sobre 100, como lo calcula el artículo 27. */
  puntaje: number
  valoracion: Valoracion
  cumplidos: number
  total: number
  faltantes: Pregunta[]
}

/**
 * Calificación oficial. Lo que no le aplica a la empresa suma su valor máximo
 * (artículo 27, columna "No aplica"); por eso una micro que no cumple nada saca
 * 87,5. El resultado trae también el conteo de estándares, que es lo que
 * muestra de verdad cuánto le falta.
 */
export function calificar(
  trabajadores: Trabajadores,
  riesgoAlto: boolean,
  cumplidos: Set<string>,
): Resultado {
  const preguntas = estandaresQueAplican(trabajadores, riesgoAlto)
  const aplican = new Set(preguntas.map((p) => p.item))
  const puntos = ITEMS.reduce(
    (suma, i) => suma + (!aplican.has(i.codigo) || cumplidos.has(i.codigo) ? i.valor : 0),
    0,
  )
  const puntaje = Math.round(puntos * 100) / 100
  const faltantes = preguntas.filter((p) => !cumplidos.has(p.item))
  return {
    puntaje,
    valoracion: valoracion(puntaje),
    cumplidos: preguntas.length - faltantes.length,
    total: preguntas.length,
    faltantes,
  }
}
