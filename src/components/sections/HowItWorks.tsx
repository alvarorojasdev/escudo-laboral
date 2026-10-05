'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { STEPS } from '@/lib/constants'

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.75', 'end 0.6'],
  })
  const fillWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <SectionWrapper id="como-funciona" alternate>
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
          ¿Cómo funciona?
        </h2>
        <p className="mx-auto max-w-2xl text-neutral-700">
          Un proceso simple y organizado para que tu empresa cumpla con la
          normativa SST sin complicaciones.
        </p>
      </div>
      <div ref={containerRef} className="relative grid gap-8 md:grid-cols-4">
        {/* Connector line (desktop) */}
        <div className="absolute top-8 left-[calc(12.5%+2rem)] hidden h-0.5 w-[calc(75%-4rem)] overflow-hidden rounded-full bg-neutral-200 md:block">
          <motion.div
            style={{ width: fillWidth }}
            className="h-full bg-gradient-to-r from-accent to-accent-hover"
          />
        </div>
        {STEPS.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="relative text-center"
          >
            <div className="relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-2xl font-bold text-white shadow-lg">
              {step.number}
            </div>
            <h3 className="mb-2 text-lg font-bold text-neutral-900">
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-neutral-700">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
