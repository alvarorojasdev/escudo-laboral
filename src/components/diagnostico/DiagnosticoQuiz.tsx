'use client'

import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Sparkles,
  ArrowLeft,
  Loader2,
  AlertTriangle,
  AlertOctagon,
  ShieldCheck,
  MessageCircle,
  RotateCcw,
  ClipboardCheck,
} from 'lucide-react'
import {
  EMPLOYEES_OPTIONS,
  SECTOR_OPTIONS,
  STATUS_OPTIONS,
  INCIDENT_OPTIONS,
  URGENCY_OPTIONS,
  type DiagnosticoInput,
  type DiagnosticoResult,
} from '@/lib/diagnostico'
import { BUSINESS } from '@/lib/constants'

type ChoiceField = 'employees' | 'sector' | 'currentStatus' | 'hadIncident' | 'urgency'

const STEPS: { field: ChoiceField; question: string; options: readonly { value: string; label: string }[] }[] = [
  { field: 'employees', question: '¿Cuántos empleados tiene tu empresa?', options: EMPLOYEES_OPTIONS },
  { field: 'sector', question: '¿A qué se dedica tu empresa?', options: SECTOR_OPTIONS },
  { field: 'currentStatus', question: '¿Hoy tienes algo del SG-SST implementado?', options: STATUS_OPTIONS },
  { field: 'hadIncident', question: '¿Tuviste algún accidente laboral o visita de la ARL?', options: INCIDENT_OPTIONS },
  { field: 'urgency', question: '¿Qué tan urgente es esto para ti?', options: URGENCY_OPTIONS },
]

const RISK_STYLES = {
  bajo: { label: 'Riesgo bajo', className: 'bg-green-100 text-green-700', icon: ShieldCheck },
  medio: { label: 'Riesgo medio', className: 'bg-accent-light text-accent-hover', icon: AlertTriangle },
  alto: { label: 'Riesgo alto', className: 'bg-red-100 text-red-700', icon: AlertOctagon },
} as const

export function DiagnosticoQuiz() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<Partial<DiagnosticoInput>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [result, setResult] = useState<DiagnosticoResult | null>(null)
  const [lead, setLead] = useState({ nombre: '', email: '' })
  const [leadStatus, setLeadStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function sendLead(e: FormEvent) {
    e.preventDefault()
    if (!result) return
    setLeadStatus('sending')
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: lead.nombre,
          email: lead.email,
          diagnostico: { answers: data, result },
        }),
      })
      if (!res.ok) throw new Error('request failed')
      setLeadStatus('sent')
    } catch {
      setLeadStatus('error')
    }
  }

  const totalSteps = STEPS.length + 1
  const progress = Math.min(((step + 1) / totalSteps) * 100, 100)

  function selectOption(field: ChoiceField, value: string) {
    const next = { ...data, [field]: value }
    setData(next)
    if (step < STEPS.length - 1) {
      setStep(step + 1)
    } else {
      submit(next)
    }
  }

  async function submit(finalData: Partial<DiagnosticoInput>) {
    setStatus('loading')
    try {
      const res = await fetch('/api/diagnostico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      })
      if (!res.ok) throw new Error('request failed')
      const json = (await res.json()) as DiagnosticoResult
      setResult(json)
      setStatus('idle')
    } catch {
      setStatus('error')
    }
  }

  function reset() {
    setStep(0)
    setData({})
    setResult(null)
    setStatus('idle')
    setLead({ nombre: '', email: '' })
    setLeadStatus('idle')
  }

  if (result) {
    const risk = RISK_STYLES[result.riskLevel]
    const RiskIcon = risk.icon
    const waMessage = encodeURIComponent(
      `Hola, hice el diagnóstico de SG-SST en la web y me dio "${risk.label}". ${result.summary} Quiero que me ayuden.`,
    )
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-xl rounded-3xl border border-neutral-200 bg-white p-8 shadow-lg"
      >
        <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ${risk.className}`}>
          <RiskIcon className="h-4 w-4" />
          {risk.label}
        </span>
        <p className="mt-4 text-lg leading-relaxed text-neutral-900">{result.summary}</p>

        <div className="mt-6">
          <p className="mb-3 text-sm font-semibold text-neutral-900">Brechas detectadas</p>
          <ul className="space-y-2">
            {result.gaps.map((gap) => (
              <li key={gap} className="flex items-start gap-2 text-sm text-neutral-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {gap}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 rounded-xl bg-neutral-100 p-4">
          <p className="text-sm leading-relaxed text-neutral-700">
            <span className="font-semibold text-neutral-900">Próximo paso: </span>
            {result.recommendation}
          </p>
        </div>

        <a
          href={`/autoevaluacion?trabajadores=${encodeURIComponent(data.employees ?? '')}`}
          className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-accent/30 bg-accent-light p-4 transition-colors hover:border-accent"
        >
          <span>
            <span className="block font-semibold text-neutral-900">
              ¿Quieres ver exactamente qué te falta?
            </span>
            <span className="text-sm text-neutral-700">
              Revisa uno por uno los estándares mínimos de tu empresa. 5 minutos, gratis.
            </span>
          </span>
          <ClipboardCheck className="h-6 w-6 shrink-0 text-accent" />
        </a>

        {leadStatus === 'sent' ? (
          <div className="mt-8 rounded-xl border border-accent/20 bg-accent-light p-4 text-center text-sm text-neutral-700">
            <span className="font-semibold text-neutral-900">¡Listo! </span>
            Recibimos tu diagnóstico y te contactamos con el plan de acción.
          </div>
        ) : (
          <form onSubmit={sendLead} className="mt-8 rounded-xl bg-neutral-100 p-4">
            <p className="mb-3 text-sm font-semibold text-neutral-900">
              ¿Quieres que te contactemos con el plan de acción?
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                value={lead.nombre}
                onChange={(e) => setLead({ ...lead, nombre: e.target.value })}
                placeholder="Tu nombre"
                required
                maxLength={100}
                className="min-w-0 flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-base sm:text-sm focus:border-accent focus:outline-none"
              />
              <input
                value={lead.email}
                onChange={(e) => setLead({ ...lead, email: e.target.value })}
                type="email"
                placeholder="tu@email.com"
                required
                maxLength={200}
                className="min-w-0 flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-base sm:text-sm focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                disabled={leadStatus === 'sending'}
                className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
              >
                {leadStatus === 'sending' ? 'Enviando…' : 'Enviar'}
              </button>
            </div>
            {leadStatus === 'error' && (
              <p className="mt-2 text-xs text-red-600">
                No pudimos enviarlo. Escríbenos por WhatsApp aquí abajo.
              </p>
            )}
          </form>
        )}

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <a
            href={`${BUSINESS.whatsappUrl}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-whatsapp px-6 py-3 font-semibold text-white transition-colors hover:bg-whatsapp-hover"
          >
            <MessageCircle className="h-5 w-5" />
            Hablar con un asesor
          </a>
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-200 px-6 py-3 font-semibold text-neutral-700 transition-colors hover:bg-neutral-100"
          >
            <RotateCcw className="h-4 w-4" />
            Repetir
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="mx-auto max-w-xl">
      {/* Progress bar */}
      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
        <motion.div
          className="h-full rounded-full bg-accent"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-lg">
        <AnimatePresence mode="wait">
          {status === 'loading' ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center gap-4 py-12 text-center"
            >
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
              <p className="text-sm font-medium text-neutral-700">
                Analizando tus respuestas con IA…
              </p>
            </motion.div>
          ) : status === 'error' ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 py-8 text-center"
            >
              <AlertTriangle className="h-8 w-8 text-accent" />
              <p className="text-sm text-neutral-700">
                No pudimos generar el diagnóstico. Intenta de nuevo en un momento.
              </p>
              <button
                onClick={() => submit(data)}
                className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover"
              >
                Reintentar
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {step === 0 ? (
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent-light px-3 py-1 text-xs font-semibold text-accent">
                  <Sparkles className="h-3.5 w-3.5" />
                  Diagnóstico con IA · 2 minutos
                </span>
              ) : (
                <p className="mb-2 text-xs font-medium text-neutral-500">
                  Paso {step + 1} de {STEPS.length}
                </p>
              )}
              <h2 className="mb-6 text-2xl font-bold text-neutral-900">
                {STEPS[step].question}
              </h2>
              <div className="grid gap-3">
                {STEPS[step].options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => selectOption(STEPS[step].field, opt.value)}
                    className="rounded-xl border border-neutral-200 px-5 py-3.5 text-left text-sm font-medium text-neutral-700 transition-all hover:border-accent hover:bg-accent-light hover:text-accent-hover"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {step > 0 && status === 'idle' && (
          <button
            onClick={() => setStep(step - 1)}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </button>
        )}
      </div>
    </div>
  )
}
