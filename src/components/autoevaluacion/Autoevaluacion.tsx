'use client'

import { useEffect, useMemo, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ClipboardCheck,
  Info,
  MessageCircle,
  RotateCcw,
  X,
} from 'lucide-react'
import {
  calificar,
  estandaresQueAplican,
  trabajadoresDesdeEnlace,
  type Trabajadores,
  type Valoracion,
} from '@/lib/autoevaluacion'
import { BUSINESS } from '@/lib/constants'
import { guiaDeItem } from '@/lib/blog/guias'

const TRABAJADORES: { value: Trabajadores; label: string }[] = [
  { value: '1-10', label: '1 a 10 trabajadores' },
  { value: '11-50', label: '11 a 50 trabajadores' },
  { value: '51+', label: 'Más de 50 trabajadores' },
]

const RIESGO: { value: 'no' | 'si' | 'no-sabe'; label: string; ayuda?: string }[] = [
  { value: 'no', label: 'No, es riesgo I, II o III' },
  { value: 'si', label: 'Sí, es riesgo IV o V' },
  {
    value: 'no-sabe',
    label: 'No sé',
    ayuda:
      'Oficinas, comercio y la mayoría de servicios son riesgo I a III. Lo confirmas en tu certificado de afiliación a la ARL.',
  },
]

const VALORACION: Record<Valoracion, { label: string; className: string; accion: string }> = {
  critico: {
    label: 'Crítico',
    className: 'bg-red-100 text-red-700',
    accion:
      'La norma exige un plan de mejoramiento inmediato, enviar avances a tu ARL en máximo 3 meses y prevé visita del Ministerio del Trabajo.',
  },
  moderado: {
    label: 'Moderadamente aceptable',
    className: 'bg-accent-light text-accent-hover',
    accion:
      'La norma exige un plan de mejoramiento, enviar avances a tu ARL en máximo 6 meses y prevé visita del Ministerio del Trabajo.',
  },
  aceptable: {
    label: 'Aceptable',
    className: 'bg-green-100 text-green-700',
    accion:
      'La norma pide mantener la calificación y las evidencias, e incluir las mejoras en el Plan Anual de Trabajo.',
  },
}

type Paso = 'trabajadores' | 'riesgo' | 'estandares' | 'resultado'

export function Autoevaluacion() {
  const [paso, setPaso] = useState<Paso>('trabajadores')
  const [trabajadores, setTrabajadores] = useState<Trabajadores | null>(null)
  const [riesgo, setRiesgo] = useState<'no' | 'si' | 'no-sabe' | null>(null)
  const [respuestas, setRespuestas] = useState<Record<string, boolean>>({})
  const [abierto, setAbierto] = useState<string | null>(null)
  const [lead, setLead] = useState({ nombre: '', email: '' })
  const [leadStatus, setLeadStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  // Desde el diagnóstico se llega con el tamaño ya respondido: no se pregunta de nuevo.
  useEffect(() => {
    const desdeEnlace = trabajadoresDesdeEnlace(
      new URLSearchParams(window.location.search).get('trabajadores'),
    )
    if (desdeEnlace) {
      setTrabajadores(desdeEnlace)
      setPaso('riesgo')
    }
  }, [])

  const riesgoAlto = riesgo === 'si'
  const preguntas = useMemo(
    () => (trabajadores ? estandaresQueAplican(trabajadores, riesgoAlto) : []),
    [trabajadores, riesgoAlto],
  )
  const grupos = useMemo(() => {
    const porGrupo = new Map<string, typeof preguntas>()
    for (const p of preguntas) porGrupo.set(p.grupo, [...(porGrupo.get(p.grupo) ?? []), p])
    return [...porGrupo]
  }, [preguntas])

  const respondidas = preguntas.filter((p) => p.item in respuestas).length
  const resultado =
    trabajadores && paso === 'resultado'
      ? calificar(
          trabajadores,
          riesgoAlto,
          new Set(
            Object.entries(respuestas)
              .filter(([, si]) => si)
              .map(([item]) => item),
          ),
        )
      : null

  function reiniciar() {
    setPaso('trabajadores')
    setTrabajadores(null)
    setRiesgo(null)
    setRespuestas({})
    setLead({ nombre: '', email: '' })
    setLeadStatus('idle')
  }

  async function enviarLead(e: FormEvent) {
    e.preventDefault()
    if (!resultado) return
    setLeadStatus('sending')
    const faltan = resultado.faltantes.map((f) => f.nombre).join('; ')
    const mensaje = `[Autoevaluación 0312] ${trabajadores} trabajadores, riesgo ${riesgoAlto ? 'IV-V' : riesgo === 'no-sabe' ? 'no sabe (se asumió I-III)' : 'I-III'}. Cumple ${resultado.cumplidos} de ${resultado.total}. Puntaje oficial ${resultado.puntaje}% (${VALORACION[resultado.valoracion].label}). Le falta: ${faltan}`
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, mensaje: mensaje.slice(0, 2000) }),
      })
      if (!res.ok) throw new Error('request failed')
      setLeadStatus('sent')
    } catch {
      setLeadStatus('error')
    }
  }

  if (resultado) {
    const v = VALORACION[resultado.valoracion]
    const reducido = resultado.total < 60
    const porcentaje = Math.round((resultado.cumplidos / resultado.total) * 100)
    const waMessage = encodeURIComponent(
      `Hola, hice la autoevaluación de estándares mínimos en la web: cumplo ${resultado.cumplidos} de ${resultado.total}. Quiero ayuda con lo que me falta.`,
    )
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl rounded-3xl border border-neutral-200 bg-white p-6 shadow-lg sm:p-8"
      >
        <p className="text-sm font-semibold tracking-wide text-accent uppercase">Tu resultado</p>
        <h2 className="mt-2 text-3xl font-bold text-neutral-900 sm:text-4xl">
          Cumples {resultado.cumplidos} de {resultado.total} estándares
        </h2>
        <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-neutral-200">
          <motion.div
            className="h-full rounded-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${porcentaje}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>

        {resultado.faltantes.length > 0 && (
          <div className="mt-8">
            <p className="mb-3 text-sm font-semibold text-neutral-900">
              Te falta ({resultado.faltantes.length})
            </p>
            <ul className="space-y-2">
              {resultado.faltantes.map((f) => {
                const guia = guiaDeItem(f.item)
                return (
                  <li key={f.item} className="flex items-start gap-2.5 text-sm text-neutral-700">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                    <span>
                      {f.nombre}
                      {guia && (
                        <Link
                          href={`/blog/${guia.slug}`}
                          className="ml-2 font-semibold whitespace-nowrap text-accent hover:text-accent-hover"
                        >
                          Cómo hacerlo →
                        </Link>
                      )}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
        {resultado.cumplidos > 0 && (
          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold text-neutral-900">
              Ya tienes ({resultado.cumplidos})
            </p>
            <ul className="space-y-2">
              {preguntas
                .filter((p) => respuestas[p.item])
                .map((p) => (
                  <li key={p.item} className="flex items-start gap-2.5 text-sm text-neutral-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    {p.nombre}
                  </li>
                ))}
            </ul>
          </div>
        )}

        <div className="mt-8 rounded-2xl bg-neutral-100 p-5">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-semibold text-neutral-900">
              Puntaje oficial: {resultado.puntaje.toLocaleString('es-CO')}%
            </p>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                reducido && resultado.faltantes.length > 0
                  ? 'bg-neutral-200 text-neutral-700'
                  : v.className
              }`}
            >
              {v.label}
            </span>
          </div>
          {reducido && resultado.faltantes.length > 0 && (
            <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-neutral-700">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" />
              Sale alto porque la Resolución 0312 (artículo 27) suma completos los puntos de los
              estándares que no le aplican a una empresa de tu tamaño. Lo que de verdad te falta es
              la lista de arriba.
            </p>
          )}
          <p className="mt-3 text-sm leading-relaxed text-neutral-700">{v.accion}</p>
        </div>

        {leadStatus === 'sent' ? (
          <div className="mt-8 rounded-xl border border-accent/20 bg-accent-light p-4 text-center text-sm text-neutral-700">
            <span className="font-semibold text-neutral-900">¡Listo! </span>
            Recibimos tu resultado y te contactamos con un plan para lo que te falta.
          </div>
        ) : (
          resultado.faltantes.length > 0 && (
            <form onSubmit={enviarLead} className="mt-8 rounded-xl border border-neutral-200 p-4">
              <p className="mb-3 text-sm font-semibold text-neutral-900">
                ¿Quieres que un asesor te ayude con lo que te falta? (opcional)
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  value={lead.nombre}
                  onChange={(e) => setLead({ ...lead, nombre: e.target.value })}
                  placeholder="Tu nombre"
                  required
                  maxLength={100}
                  className="min-w-0 flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-base focus:border-accent focus:outline-none sm:text-sm"
                />
                <input
                  value={lead.email}
                  onChange={(e) => setLead({ ...lead, email: e.target.value })}
                  type="email"
                  placeholder="tu@email.com"
                  required
                  maxLength={200}
                  className="min-w-0 flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-base focus:border-accent focus:outline-none sm:text-sm"
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
          )
        )}

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <a
            href={`${BUSINESS.whatsappUrl}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-whatsapp px-6 py-3 font-semibold text-white transition-colors hover:bg-whatsapp-hover sm:col-span-2"
          >
            <MessageCircle className="h-5 w-5" />
            Hablar con un asesor
          </a>
          <button
            onClick={() => setPaso('estandares')}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-200 px-6 py-3 font-semibold text-neutral-700 transition-colors hover:bg-neutral-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Cambiar respuestas
          </button>
          <button
            onClick={reiniciar}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-200 px-6 py-3 font-semibold text-neutral-700 transition-colors hover:bg-neutral-100"
          >
            <RotateCcw className="h-4 w-4" />
            Empezar de nuevo
          </button>
        </div>
        <p className="mt-6 text-xs leading-relaxed text-neutral-500">
          Cálculo con la Tabla de Valores del artículo 27 de la Resolución 0312 de 2019. Es una
          orientación: la autoevaluación oficial la registra tu empresa ante su ARL.
        </p>
      </motion.div>
    )
  }

  if (paso === 'estandares') {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="sticky top-20 z-10 mb-4 rounded-2xl border border-neutral-200 bg-white/95 px-5 py-3 shadow-sm backdrop-blur">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="font-medium text-neutral-700">
              {respondidas} de {preguntas.length} respondidos
            </span>
            <button
              onClick={() => setPaso('resultado')}
              disabled={respondidas < preguntas.length}
              className="rounded-lg bg-accent px-4 py-2 font-semibold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
              Ver resultado
            </button>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${(respondidas / preguntas.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-6">
          {grupos.map(([grupo, lista]) => (
            <section
              key={grupo}
              className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <h2 className="mb-4 text-sm font-semibold tracking-wide text-neutral-500 uppercase">
                {grupo}
              </h2>
              <ul className="divide-y divide-neutral-100">
                {lista.map((p) => {
                  const r = respuestas[p.item]
                  return (
                    <li key={p.item} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <p className="font-medium text-neutral-900">{p.nombre}</p>
                          <button
                            onClick={() => setAbierto(abierto === p.item ? null : p.item)}
                            className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-neutral-500 hover:text-neutral-700"
                            aria-expanded={abierto === p.item}
                          >
                            Qué pide la norma
                            <ChevronDown
                              className={`h-3.5 w-3.5 transition-transform ${abierto === p.item ? 'rotate-180' : ''}`}
                            />
                          </button>
                          <AnimatePresence initial={false}>
                            {abierto === p.item && (
                              <motion.p
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden pt-2 text-sm leading-relaxed text-neutral-600"
                              >
                                {p.criterio}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                        <div className="flex shrink-0 gap-2" role="group" aria-label={p.nombre}>
                          {[
                            { si: true, label: 'Lo tengo' },
                            { si: false, label: 'No' },
                          ].map((op) => (
                            <button
                              key={op.label}
                              onClick={() => setRespuestas({ ...respuestas, [p.item]: op.si })}
                              aria-pressed={r === op.si}
                              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                                r === op.si
                                  ? op.si
                                    ? 'border-green-600 bg-green-50 text-green-700'
                                    : 'border-red-400 bg-red-50 text-red-700'
                                  : 'border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                              }`}
                            >
                              {op.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>

        <button
          onClick={() => setPaso('riesgo')}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </button>
      </div>
    )
  }

  const enRiesgo = paso === 'riesgo'
  return (
    <div className="mx-auto max-w-xl">
      <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={paso}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {enRiesgo ? (
              <p className="mb-2 text-xs font-medium text-neutral-500">Paso 2 de 3</p>
            ) : (
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent-light px-3 py-1 text-xs font-semibold text-accent">
                <ClipboardCheck className="h-3.5 w-3.5" />
                Resolución 0312 de 2019 · 5 minutos
              </span>
            )}
            <h2 className="mb-6 text-2xl font-bold text-neutral-900">
              {enRiesgo
                ? '¿Tu ARL clasificó tu actividad como riesgo IV o V?'
                : '¿Cuántos trabajadores tiene tu empresa?'}
            </h2>
            <div className="grid gap-3">
              {enRiesgo
                ? RIESGO.map((op) => (
                    <button
                      key={op.value}
                      onClick={() => {
                        setRiesgo(op.value)
                        setRespuestas({})
                        setPaso('estandares')
                      }}
                      className="rounded-xl border border-neutral-200 px-5 py-3.5 text-left text-sm font-medium text-neutral-700 transition-all hover:border-accent hover:bg-accent-light hover:text-accent-hover"
                    >
                      {op.label}
                      {op.ayuda && (
                        <span className="mt-1 block text-xs font-normal text-neutral-500">
                          {op.ayuda}
                        </span>
                      )}
                    </button>
                  ))
                : TRABAJADORES.map((op) => (
                    <button
                      key={op.value}
                      onClick={() => {
                        setTrabajadores(op.value)
                        setPaso('riesgo')
                      }}
                      className="rounded-xl border border-neutral-200 px-5 py-3.5 text-left text-sm font-medium text-neutral-700 transition-all hover:border-accent hover:bg-accent-light hover:text-accent-hover"
                    >
                      {op.label}
                    </button>
                  ))}
            </div>
          </motion.div>
        </AnimatePresence>
        {enRiesgo && (
          <button
            onClick={() => setPaso('trabajadores')}
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
