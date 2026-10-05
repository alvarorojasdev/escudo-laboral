import { ALMACEN } from './peticiones'

/**
 * Cuenta lo que la gente hace dentro del sitio: cuántos descargan la política,
 * cuántos dejan el correo, cuántos usan el chat.
 *
 * Vercel Web Analytics cuenta visitas por página, pero en el plan gratuito no
 * registra eventos propios. Estos pasos ya pasan por el servidor, así que se
 * cuentan acá, en el mismo Upstash del límite de peticiones. Se guarda una
 * clave por evento y por día (`eventos:2026-10-01:politica_word`) que vence a
 * los 90 días; se consultan en el explorador de datos de Upstash.
 *
 * No se guarda nada de la persona: ni IP ni correo. Solo cuántas veces pasó.
 */
export type Evento =
  | 'chat_mensaje'
  | 'chat_contacto'
  | 'diagnostico'
  | 'politica_word'
  | 'politica_correo'
  | 'autoevaluacion_correo'
  | 'contacto'

const NOVENTA_DIAS_S = 90 * 24 * 60 * 60

interface ConfigContador {
  url?: string
  token?: string
  fetch?: typeof fetch
}

export function crearContador({ url, token, fetch: pedir = fetch }: ConfigContador) {
  return async (evento: Evento, cuando = new Date()) => {
    if (!url || !token) return
    // El día en hora de Colombia, que es donde está el negocio y el público.
    const dia = cuando.toLocaleDateString('en-CA', { timeZone: 'America/Bogota' })
    const clave = `eventos:${dia}:${evento}`
    try {
      await pedir(`${url}/pipeline`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify([
          ['INCR', clave],
          ['EXPIRE', clave, NOVENTA_DIAS_S],
        ]),
      })
    } catch (error) {
      // Contar es accesorio: nunca debe romper la petición que lo dispara.
      console.error('No se pudo contar el evento', evento, error)
    }
  }
}

export const contarEvento = crearContador(ALMACEN)
