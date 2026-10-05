'use client'

import { motion } from 'framer-motion'
import { Check, MessageCircle } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { PRICING, BUSINESS, WHATSAPP_MESSAGES, whatsappLink } from '@/lib/constants'

const plans = [PRICING.implementation, PRICING.maintenance]

export function Pricing() {
  return (
    <SectionWrapper id="planes" alternate>
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
          Planes y Precios
        </h2>
        <p className="mx-auto max-w-2xl text-neutral-700">
          Soluciones claras para cada necesidad. Sin letra pequeña, sin costos
          ocultos.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className={`relative overflow-hidden rounded-2xl border bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg ${
              plan.popular
                ? 'border-accent shadow-md md:scale-105'
                : 'border-neutral-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 rounded-bl-xl bg-accent px-4 py-1.5 text-xs font-bold text-white uppercase">
                Más popular
              </div>
            )}

            <h3 className="mb-2 text-xl font-bold text-neutral-900">
              {plan.name}
            </h3>
            <p className="mb-6 text-sm text-neutral-700">{plan.description}</p>

            <div className="mb-6">
              <span className="text-sm text-neutral-700">Desde</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-neutral-900">
                  ${plan.price}
                </span>
                <span className="text-sm text-neutral-700">
                  {plan.currency} / {plan.period}
                </span>
              </div>
            </div>

            <ul className="mb-8 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-neutral-700">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href={`${BUSINESS.whatsappUrl}?text=${encodeURIComponent(`Hola, me interesa el plan de ${plan.name}. ¿Pueden darme más información?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all duration-300 ${
                plan.popular
                  ? 'bg-accent text-white hover:bg-accent-hover shadow-lg hover:shadow-xl'
                  : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
              }`}
            >
              <MessageCircle className="h-4 w-4" />
              {plan.cta}
            </a>
          </motion.div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-neutral-700">
        ¿No estás seguro?{' '}
        <a
          href={whatsappLink(WHATSAPP_MESSAGES.dudaPlanes)}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-accent underline-offset-2 hover:underline"
        >
          Escríbenos y te asesoramos gratis
        </a>
      </p>
    </SectionWrapper>
  )
}
