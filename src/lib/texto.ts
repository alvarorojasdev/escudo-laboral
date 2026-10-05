/**
 * Cambia el guion de "SG-SST" por uno que no permite cortar la línea: en
 * títulos de celular quedaba "SG-" en un renglón y "SST" en el siguiente.
 */
export function sinCortarSiglas(texto: string) {
  return texto.replace(/SG-SST/g, 'SG‑SST')
}
