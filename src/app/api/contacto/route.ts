import { contarEvento } from '@/lib/metricas'
import { NextResponse, after } from 'next/server'
import { getClientIp, rateLimit } from '@/lib/peticiones'
import { sendLeadEmail, type LeadPayload } from '@/lib/email'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isValid(body: Partial<LeadPayload>): body is LeadPayload {
  return (
    typeof body.nombre === 'string' &&
    body.nombre.trim().length > 0 &&
    body.nombre.length <= 100 &&
    typeof body.email === 'string' &&
    EMAIL_PATTERN.test(body.email) &&
    body.email.length <= 200 &&
    (body.telefono === undefined || body.telefono.length <= 40) &&
    (body.empresa === undefined || body.empresa.length <= 120) &&
    (body.mensaje === undefined || body.mensaje.length <= 2000)
  )
}

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: 'El envío de correos no está configurado todavía.' },
      { status: 503 },
    )
  }

  const ip = getClientIp(req)
  const limit = await rateLimit(`contacto:${ip}`, 5, 10 * 60 * 1000)
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Demasiados envíos. Intenta de nuevo en unos minutos.' },
      { status: 429 },
    )
  }

  let body: Partial<LeadPayload>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 })
  }

  if (!isValid(body)) {
    return NextResponse.json({ error: 'Datos incompletos o inválidos.' }, { status: 400 })
  }

  // Modo prueba, igual que en el chat: las pruebas locales mandaban correos
  // reales a la casilla del negocio. Solo existe fuera de producción.
  const simular =
    process.env.NODE_ENV !== 'production' && req.headers.get('x-modo-prueba') === '1'
  if (simular) {
    console.log('[modo prueba] lead NO enviado:', body.nombre, body.email)
    return NextResponse.json({ ok: true, simulado: true })
  }

  try {
    await sendLeadEmail(body)
    after(() => contarEvento('contacto'))
    if (body.mensaje?.startsWith('[Generó la Política')) {
      after(() => contarEvento('politica_correo'))
    }
    if (body.mensaje?.startsWith('[Autoevaluación 0312]')) {
      after(() => contarEvento('autoevaluacion_correo'))
    }
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error enviando lead por email:', error)
    return NextResponse.json(
      { error: 'No pudimos enviar el mensaje. Escríbenos por WhatsApp.' },
      { status: 502 },
    )
  }
}
