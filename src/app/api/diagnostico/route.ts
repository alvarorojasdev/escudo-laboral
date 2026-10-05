import { contarEvento } from '@/lib/metricas'
import { NextResponse, after } from 'next/server'
import { ai, AI_CONFIGURED, AI_MODEL, esLimiteDeCupo } from '@/lib/ai'
import { getClientIp, rateLimit } from '@/lib/peticiones'
import { buscarArticulos, formatearParaPrompt } from '@/lib/normativa/buscar'
import type { DiagnosticoInput, DiagnosticoResult } from '@/lib/diagnostico'

const VALID_EMPLOYEES = ['1-10', '11-50', '51+']
const VALID_SECTOR = ['comercio', 'servicios', 'industria', 'construccion', 'otro']
const VALID_STATUS = ['nada', 'desactualizado', 'avanzado']
const VALID_INCIDENT = ['si', 'no', 'no-sabe']
const VALID_URGENCY = ['auditoria', 'prevenir', 'averiguando']

function isValid(input: Partial<DiagnosticoInput>): input is DiagnosticoInput {
  return (
    VALID_EMPLOYEES.includes(input.employees ?? '') &&
    VALID_SECTOR.includes(input.sector ?? '') &&
    VALID_STATUS.includes(input.currentStatus ?? '') &&
    VALID_INCIDENT.includes(input.hadIncident ?? '') &&
    VALID_URGENCY.includes(input.urgency ?? '')
  )
}

const TRAMOS: Record<DiagnosticoInput['employees'], string> = {
  '1-10': 'diez o menos trabajadores',
  '11-50': 'once a cincuenta trabajadores',
  '51+': 'mas de cincuenta trabajadores',
}

/**
 * Arma la consulta al corpus a partir de las respuestas del quiz: el tramo de
 * tamaño decide qué estándares mínimos aplican, y el resto orienta las brechas.
 */
function consultaNormativa(input: DiagnosticoInput) {
  const partes = [`estandares minimos ${TRAMOS[input.employees]}`]
  if (input.sector === 'construccion') partes.push('riesgo alto construccion')
  if (input.hadIncident === 'si') partes.push('investigacion de accidentes reporte')
  if (input.currentStatus === 'nada') partes.push('politica objetivos plan de trabajo anual')
  return partes.join(' ')
}

function buildPrompt(input: DiagnosticoInput, normativa: string) {
  return `Datos de la empresa:
- Empleados: ${input.employees}
- Sector: ${input.sector}
- Estado actual del SG-SST: ${input.currentStatus}
- Antecedentes de accidentes o visitas de ARL/Ministerio: ${input.hadIncident}
- Urgencia declarada: ${input.urgency}

${
  normativa
    ? `NORMATIVA APLICABLE (es la única fuente para las brechas y las cifras):\n\n${normativa}\n`
    : ''
}
Genera el diagnóstico según las instrucciones del system prompt.`
}

const SYSTEM_PROMPT = `Eres un asesor experto en SG-SST (Sistema de Gestión de Seguridad y Salud en el Trabajo) para pymes en Colombia, conocedor del Decreto 1072/2015 y la Resolución 0312/2019.

Usa EXCLUSIVAMENTE terminología y normativa colombiana: matriz de identificación de peligros y valoración de riesgos (IPVR), COPASST o vigía SST, ARL, exámenes médicos ocupacionales, plan de trabajo anual, política y objetivos SST. Nunca menciones normativa o siglas de otros países (ej. DUER de España/México, NOM, LGSST).

Con los datos de una empresa, genera un mini-diagnóstico de brechas de cumplimiento realista y específico (no genérico). Si se te entrega normativa aplicable, apóyate en ella para las brechas y las cifras; no cites artículos que no aparezcan ahí.

Responde ÚNICAMENTE con un objeto JSON válido, sin texto adicional ni bloques de código, con este esquema exacto:
{
  "riskLevel": "bajo" | "medio" | "alto",
  "summary": string (máximo 2 frases, tono directo),
  "gaps": string[] (3 a 4 brechas concretas según los datos dados),
  "recommendation": string (1 a 2 frases con el próximo paso concreto)
}`

export async function POST(req: Request) {
  if (!AI_CONFIGURED) {
    return NextResponse.json(
      { error: 'El diagnóstico con IA no está configurado todavía.' },
      { status: 503 },
    )
  }

  const ip = getClientIp(req)
  const limit = await rateLimit(`diagnostico:${ip}`, 8, 10 * 60 * 1000)
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Intenta de nuevo en unos minutos.' },
      { status: 429 },
    )
  }

  let body: Partial<DiagnosticoInput>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 })
  }

  if (!isValid(body)) {
    return NextResponse.json({ error: 'Respuestas incompletas o inválidas.' }, { status: 400 })
  }

  const normativa = formatearParaPrompt(buscarArticulos(consultaNormativa(body), 3))

  const attempts = 2
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const completion = await ai.chat.completions.create({
        model: AI_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildPrompt(body, normativa) },
        ],
        temperature: 0.4,
        max_tokens: 1024,
        response_format: { type: 'json_object' },
      })

      const raw = completion.choices[0]?.message?.content ?? ''
      const jsonStart = raw.indexOf('{')
      const jsonEnd = raw.lastIndexOf('}')
      if (jsonStart === -1 || jsonEnd === -1) throw new Error(`No JSON found in AI response: ${raw}`)
      const result = JSON.parse(raw.slice(jsonStart, jsonEnd + 1)) as DiagnosticoResult

      after(() => contarEvento('diagnostico'))
      return NextResponse.json(result)
    } catch (error) {
      console.error(`Error generando diagnóstico (intento ${attempt}/${attempts}):`, error)
      // Reintentar contra un cupo agotado solo consume tiempo del visitante.
      if (esLimiteDeCupo(error)) {
        return NextResponse.json(
          {
            error:
              'Estamos recibiendo muchas consultas en este momento. Escríbenos por WhatsApp y te hacemos el diagnóstico con un asesor.',
          },
          { status: 503 },
        )
      }
      if (attempt === attempts) break
    }
  }

  return NextResponse.json(
    { error: 'No pudimos generar el diagnóstico. Intenta de nuevo en un momento.' },
    { status: 502 },
  )
}
