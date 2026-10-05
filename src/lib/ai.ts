import OpenAI from 'openai'

// Groq expone una API compatible con OpenAI, así que cambiar de proveedor
// es cambiar baseURL + key + modelo. Se eligió por latencia: el mismo prompt
// tarda ~1 s acá contra ~40 s en el tier gratuito de Z.ai (medido sep-2026).
export const ai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
})

export const AI_MODEL = process.env.AI_MODEL ?? 'openai/gpt-oss-120b'

export const AI_CONFIGURED = Boolean(process.env.GROQ_API_KEY)

/**
 * El plan gratuito del proveedor tiene dos topes distintos y hay que
 * distinguirlos, porque piden lo contrario: el de por minuto se pasa esperando
 * un rato; el diario no se pasa esperando, hay que volver mañana.
 *
 * Ojo: las cabeceras `x-ratelimit-*` de Groq informan SOLO el tope por minuto.
 * El diario aparece únicamente en el mensaje del error 429, así que se lee de
 * ahí. Por eso una consulta chica puede pasar mientras una normal falla: la que
 * entra en lo que queda del día pasa, la que no entra, no.
 */
export type TipoDeLimite = 'minuto' | 'dia'

export function tipoDeLimite(error: unknown): TipoDeLimite | null {
  const e = error as { status?: number; message?: string }
  const mensaje = e?.message ?? ''
  if (e?.status !== 429 && !/rate limit|too many requests/i.test(mensaje)) return null
  return /per day|\bTPD\b|\bRPD\b/i.test(mensaje) ? 'dia' : 'minuto'
}

export function esLimiteDeCupo(error: unknown): boolean {
  return tipoDeLimite(error) !== null
}
