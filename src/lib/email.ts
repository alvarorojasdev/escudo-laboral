import { Resend } from 'resend'
import { BUSINESS } from '@/lib/constants'
import type { DiagnosticoInput, DiagnosticoResult } from '@/lib/diagnostico'

// Sin dominio propio verificado, Resend solo permite enviar desde onboarding@resend.dev
// hacia el email dueño de la cuenta. Cambiar ambos cuando se verifique un dominio propio.
const FROM = process.env.RESEND_FROM ?? 'Escudo Laboral <onboarding@resend.dev>'
const TO = process.env.LEAD_NOTIFICATION_EMAIL ?? BUSINESS.email

export interface LeadPayload {
  nombre: string
  email: string
  telefono?: string
  empresa?: string
  mensaje?: string
  diagnostico?: {
    answers: DiagnosticoInput
    result: DiagnosticoResult
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function renderDiagnostico(diagnostico: NonNullable<LeadPayload['diagnostico']>) {
  const { answers, result } = diagnostico
  return `
    <h3>Diagnóstico generado con IA</h3>
    <p><strong>Nivel de riesgo:</strong> ${escapeHtml(result.riskLevel)}</p>
    <p><strong>Resumen:</strong> ${escapeHtml(result.summary)}</p>
    <p><strong>Brechas:</strong></p>
    <ul>${result.gaps.map((g) => `<li>${escapeHtml(g)}</li>`).join('')}</ul>
    <p><strong>Recomendación:</strong> ${escapeHtml(result.recommendation)}</p>
    <h3>Respuestas del cuestionario</h3>
    <ul>
      <li><strong>Empleados:</strong> ${escapeHtml(answers.employees)}</li>
      <li><strong>Sector:</strong> ${escapeHtml(answers.sector)}</li>
      <li><strong>Estado del SG-SST:</strong> ${escapeHtml(answers.currentStatus)}</li>
      <li><strong>Accidentes o visitas ARL:</strong> ${escapeHtml(answers.hadIncident)}</li>
      <li><strong>Urgencia:</strong> ${escapeHtml(answers.urgency)}</li>
    </ul>`
}

export async function sendLeadEmail(lead: LeadPayload) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY no configurada')
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const isDiagnostico = Boolean(lead.diagnostico)

  const html = `
    <h2>${isDiagnostico ? 'Nuevo diagnóstico completado' : 'Nuevo mensaje de contacto'}</h2>
    <ul>
      <li><strong>Nombre:</strong> ${escapeHtml(lead.nombre)}</li>
      <li><strong>Email:</strong> ${escapeHtml(lead.email)}</li>
      ${lead.telefono ? `<li><strong>Teléfono:</strong> ${escapeHtml(lead.telefono)}</li>` : ''}
      ${lead.empresa ? `<li><strong>Empresa:</strong> ${escapeHtml(lead.empresa)}</li>` : ''}
    </ul>
    ${lead.mensaje ? `<p><strong>Mensaje:</strong><br>${escapeHtml(lead.mensaje)}</p>` : ''}
    ${lead.diagnostico ? renderDiagnostico(lead.diagnostico) : ''}`

  // Si el correo del lead está mal escrito, el proveedor rechaza todo el envío
  // y se pierde el contacto. Mejor mandarlo sin reply-to: el dato igual llega.
  const replyTo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email) ? lead.email : undefined

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    ...(replyTo ? { replyTo } : {}),
    subject: isDiagnostico
      ? `Diagnóstico SG-SST · ${lead.nombre}${lead.empresa ? ` (${lead.empresa})` : ''}`
      : `Nuevo contacto · ${lead.nombre}${lead.empresa ? ` (${lead.empresa})` : ''}`,
    html,
  })

  if (error) throw new Error(error.message)
}
