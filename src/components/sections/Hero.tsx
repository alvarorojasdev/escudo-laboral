'use client'

import { motion } from 'framer-motion'
import { MessageCircle, ChevronDown, CheckCircle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { BUSINESS, MULTA_MAXIMA_PYME_MILLONES, WHATSAPP_MESSAGES, whatsappLink } from '@/lib/constants'

const CHECKLIST_DEMO = [
  'Matriz de riesgos identificada',
  'Política SST redactada',
  'Plan de trabajo anual listo',
  'Empresa 100% en cumplimiento',
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-light pt-24 pb-12 md:pt-32 md:pb-16">
      {/* Mesh gradient background */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-primary-lighter/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text — sin animación de entrada: es contenido above the fold y
              no debe depender de que hidrate el JS para ser visible. */}
          <div>
            <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              {BUSINESS.decree} · {BUSINESS.resolution}
            </span>
            <h1 className="mb-6 text-4xl leading-[1.05] font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Tu empresa protegida,{' '}
              <span className="text-accent">tu equipo seguro</span>
            </h1>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-white/70">
              Implementamos el SG-SST para micro y pequeñas empresas en
              Colombia. Cumple con la normativa sin complicaciones y evita multas
              de hasta ${MULTA_MAXIMA_PYME_MILLONES} millones.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                variant="primary"
                size="lg"
                href="/diagnostico"
                icon={<Sparkles className="h-5 w-5" />}
              >
                Haz tu diagnóstico gratis
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href={whatsappLink(WHATSAPP_MESSAGES.hero)}
                external
                className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                icon={<MessageCircle className="h-5 w-5" />}
              >
                Hablar por WhatsApp
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-accent" />
                Sin multas ni sanciones
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-accent" />
                Implementación en 4-6 semanas
              </span>
            </div>
          </div>

          {/* Animated diagnostic demo */}
          <div className="hidden lg:block">
            <div className="relative mx-auto w-full max-w-md">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-sm font-semibold text-white/80">
                    Diagnóstico SG-SST
                  </p>
                  <span className="flex items-center gap-1 rounded-full bg-accent/20 px-2.5 py-1 text-xs font-medium text-accent">
                    <Sparkles className="h-3 w-3" />
                    IA
                  </span>
                </div>
                <ul className="space-y-3">
                  {CHECKLIST_DEMO.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.6 + i * 0.5,
                        duration: 0.4,
                        repeat: Infinity,
                        repeatDelay: CHECKLIST_DEMO.length * 0.5 + 2,
                      }}
                      className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3"
                    >
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.8 + i * 0.5,
                          duration: 0.3,
                          repeat: Infinity,
                          repeatDelay: CHECKLIST_DEMO.length * 0.5 + 2,
                        }}
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent"
                      >
                        <CheckCircle className="h-3.5 w-3.5 text-white" />
                      </motion.span>
                      <span className="text-sm text-white/80">{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="absolute -bottom-2 -right-2 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                  <p className="text-xs font-medium text-white/80">Empresas protegidas</p>
                  <p className="text-2xl font-bold text-white">100+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#beneficios"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 transition-colors hover:text-white/70"
        aria-label="Desplázate para ver más"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </a>
    </section>
  )
}
