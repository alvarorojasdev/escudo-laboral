/**
 * Cómo se decide si una respuesta contiene lo que el caso espera.
 *
 * Vive aparte del runner porque el control del banco (`control.ts`) tiene que
 * usar exactamente el mismo criterio: si el chequeo de calidad comparara de
 * otra forma que el examen, no probaría nada.
 */

export function normalizar(texto: string) {
  return (
    texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      // El modelo separa número y unidad con espacios tipográficos: escribe
      // "30 minutos" con U+202F (espacio fino inseparable), no con el espacio
      // normal. Sin unificarlos, el examen daba por fallado un caso donde la
      // respuesta era correcta palabra por palabra.
      .replace(/[\s\u00a0\u2000-\u200a\u202f\u205f\u3000]+/g, ' ')
      .trim()
  )
}

/**
 * Un dato numérico se busca como número suelto, no como substring. Sin esto,
 * esperar "7" aprobaba cualquier respuesta que citara el Decreto 1072 o dejara
 * el teléfono +57 319 7116220; esperar "2", casi cualquier texto con un año.
 *
 * Lo que no es número se sigue buscando como substring a propósito: muchas
 * expectativas son raíces de palabra ("obligator" para obligatorio/obligatoria,
 * "encontr" para encontré/encontró).
 */
export function contiene(respuestaNormalizada: string, variante: string): boolean {
  const v = normalizar(variante)
  if (!/^[\d.,]+$/.test(v)) return respuestaNormalizada.includes(v)
  return new RegExp(`\\b${v.replace(/\./g, '\\.')}\\b`).test(respuestaNormalizada)
}
