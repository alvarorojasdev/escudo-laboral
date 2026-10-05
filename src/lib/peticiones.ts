/**
 * Utilidades de las peticiones HTTP entrantes.
 *
 * Viven aparte de `ai.ts` porque no dependen del proveedor de IA: ese módulo
 * construye el cliente al importarse y revienta sin clave, lo que hacía
 * imposible probar estas funciones sin credenciales.
 */

interface ConfigLimitador {
  /** URL REST del almacén compartido (Upstash). Sin ella se cuenta en memoria. */
  url?: string
  token?: string
  /** Inyectable para poder probarlo sin red. */
  fetch?: typeof fetch
}

export type Limitador = (
  clave: string,
  limite: number,
  ventanaMs: number,
) => Promise<{ ok: boolean; retryAfterMs?: number }>

/**
 * Límite de peticiones por clave en una ventana de tiempo.
 *
 * Con almacén configurado, el conteo vive en Upstash y es el mismo para todas
 * las copias del servidor. En memoria no lo era: Vercel levanta varias
 * instancias según el tráfico y cada una contaba por su lado, así que el límite
 * real era el configurado multiplicado por la cantidad de instancias.
 *
 * Si el almacén falla, se sigue limitando con la memoria en vez de rechazar a
 * todos: un corte de Upstash no debe tumbar el chat.
 */
export function crearLimitador({ url, token, fetch: pedir = fetch }: ConfigLimitador): Limitador {
  const buckets = new Map<string, { count: number; resetAt: number }>()

  function enMemoria(clave: string, limite: number, ventanaMs: number) {
    const ahora = Date.now()
    const bucket = buckets.get(clave)
    if (!bucket || ahora > bucket.resetAt) {
      buckets.set(clave, { count: 1, resetAt: ahora + ventanaMs })
      return { ok: true }
    }
    if (bucket.count >= limite) return { ok: false, retryAfterMs: bucket.resetAt - ahora }
    bucket.count += 1
    return { ok: true }
  }

  return async (clave, limite, ventanaMs) => {
    if (!url || !token) return enMemoria(clave, limite, ventanaMs)
    try {
      // Un solo viaje. SET con NX y PX crea la clave con su vencimiento solo si
      // no existe, e INCR suma sin tocar ese vencimiento. Se evita PEXPIRE…NX
      // porque exige Redis 7: si el almacén no lo aceptara, la clave no
      // vencería nunca y el visitante quedaría bloqueado para siempre.
      const res = await pedir(`${url}/pipeline`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify([
          ['SET', `limite:${clave}`, 0, 'NX', 'PX', ventanaMs],
          ['INCR', `limite:${clave}`],
        ]),
      })
      if (!res.ok) throw new Error(`almacén respondió ${res.status}`)
      const respuesta = (await res.json()) as { result?: unknown; error?: string }[]
      const fallido = respuesta.find((r) => r.error)
      if (fallido) throw new Error(`almacén rechazó un comando: ${fallido.error}`)
      const cuenta = Number(respuesta[1]?.result)
      if (!Number.isFinite(cuenta)) throw new Error('respuesta del almacén sin conteo')
      return cuenta <= limite ? { ok: true } : { ok: false, retryAfterMs: ventanaMs }
    } catch (error) {
      console.error('Límite compartido no disponible, se usa la memoria:', error)
      return enMemoria(clave, limite, ventanaMs)
    }
  }
}

/** Upstash conectado desde Vercel crea estas variables (KV_*). */
export const ALMACEN = {
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
}

export const rateLimit = crearLimitador(ALMACEN)

/**
 * IP del visitante, para el límite de peticiones.
 *
 * En Vercel, `x-forwarded-for` es confiable: la plataforma la pisa con la IP
 * real y no deja pasar la que mande el cliente (documentado como protección
 * contra la falsificación de IP). Pero la propia documentación advierte que esa
 * cabecera "could be overwritten if you're using a proxy on top of Vercel":
 * con Cloudflare adelante, por ejemplo, el valor lo pondría ese proxy. Por eso
 * se prefiere `x-vercel-forwarded-for`, que Vercel mantiene aunque haya otro
 * proxy encima.
 */
export function getClientIp(req: Request) {
  const primera = (cabecera: string) => req.headers.get(cabecera)?.split(',')[0].trim()
  return (
    primera('x-vercel-forwarded-for') ||
    primera('x-real-ip') ||
    primera('x-forwarded-for') ||
    'unknown'
  )
}
