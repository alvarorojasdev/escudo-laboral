'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shield, FileText, Handshake, CheckCircle, Sparkles } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { BENEFITS, PRICING } from '@/lib/constants'
import type { ReactNode } from 'react'

const iconMap: Record<string, ReactNode> = {
  shield: <Shield className="h-8 w-8" />,
  'file-text': <FileText className="h-8 w-8" />,
  handshake: <Handshake className="h-8 w-8" />,
  'check-circle': <CheckCircle className="h-8 w-8" />,
}

const spanClasses = [
  'lg:col-span-2 lg:row-span-2',
  'lg:col-span-2 lg:row-span-1',
  'lg:col-span-1 lg:row-span-1',
  'lg:col-span-1 lg:row-span-1',
]

export function Benefits() {
  return (
    <SectionWrapper id="beneficios">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
          ¿Por qué elegir Escudo Laboral?
        </h2>
        <p className="mx-auto max-w-2xl text-neutral-700">
          Nos especializamos en micro y pequeñas empresas. Conocemos tus
          necesidades y te damos soluciones prácticas y efectivas.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
        {BENEFITS.map((benefit, i) => {
          const featured = i === 0
          return (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg ${
                featured ? 'bg-primary' : 'justify-between bg-white'
              } ${spanClasses[i]}`}
            >
              <div>
                <div
                  className={`mb-4 inline-flex rounded-xl p-3 transition-colors ${
                    featured
                      ? 'bg-accent text-white'
                      : 'bg-accent-light text-accent group-hover:bg-accent group-hover:text-white'
                  }`}
                >
                  {iconMap[benefit.icon]}
                </div>
                <h3
                  className={`mb-2 font-bold ${
                    featured ? 'text-2xl text-white md:text-3xl' : 'text-lg text-neutral-900'
                  }`}
                >
                  {benefit.title}
                </h3>
                <p
                  className={`leading-relaxed ${
                    featured ? 'text-base text-white/70' : 'text-sm text-neutral-700'
                  }`}
                >
                  {benefit.description}
                </p>
              </div>

              {featured ? (
                <div className="mt-auto pt-8">
                  <ul className="mb-8 space-y-2.5">
                    {PRICING.implementation.features.slice(0, 4).map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-sm text-white/80">
                        <CheckCircle className="h-4 w-4 shrink-0 text-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <p className="border-t border-white/10 pt-6 text-sm leading-relaxed text-white/60">
                    {benefit.detail}
                  </p>
                  <Link
                    href="/diagnostico"
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                  >
                    <Sparkles className="h-4 w-4" />
                    Ver en qué está tu empresa
                  </Link>
                </div>
              ) : (
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr]">
                  <p className="overflow-hidden text-sm leading-relaxed text-accent-hover">
                    <span className="mt-3 block border-t border-neutral-100 pt-3">
                      {benefit.detail}
                    </span>
                  </p>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
