'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Button } from '@/components/ui/Button'
import { TESTIMONIALS, WHATSAPP_MESSAGES, whatsappLink } from '@/lib/constants'

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [isPaused, next])

  return (
    <SectionWrapper id="testimonios">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
          Lo que dicen nuestros clientes
        </h2>
        <p className="mx-auto max-w-2xl text-neutral-700">
          Empresas que ya cumplen con la normativa SST gracias a Escudo Laboral.
        </p>
      </div>

      <div
        className="relative mx-auto max-w-3xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm md:p-12"
          >
            {/* Avatar */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
              {TESTIMONIALS[current].initials}
            </div>

            {/* Stars */}
            <div className="mb-4 flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="mb-6 text-lg leading-relaxed text-neutral-700 italic">
              &ldquo;{TESTIMONIALS[current].quote}&rdquo;
            </blockquote>

            {/* Author */}
            <p className="font-bold text-neutral-900">
              {TESTIMONIALS[current].name}
            </p>
            <p className="text-sm text-neutral-700">
              {TESTIMONIALS[current].role}, {TESTIMONIALS[current].company}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={prev}
          className="absolute top-1/2 -left-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-all hover:bg-neutral-100 md:-left-12"
          aria-label="Testimonio anterior"
        >
          <ChevronLeft className="h-5 w-5 text-neutral-700" />
        </button>
        <button
          onClick={next}
          className="absolute top-1/2 -right-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-all hover:bg-neutral-100 md:-right-12"
          aria-label="Testimonio siguiente"
        >
          <ChevronRight className="h-5 w-5 text-neutral-700" />
        </button>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === current ? 'w-8 bg-accent' : 'w-2.5 bg-neutral-200'
              }`}
              aria-label={`Ver testimonio ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <p className="mb-4 text-lg font-medium text-neutral-900">
          Tu empresa puede ser la siguiente
        </p>
        <Button
          variant="whatsapp"
          href={whatsappLink(WHATSAPP_MESSAGES.testimonios)}
          external
          icon={<MessageCircle className="h-5 w-5" />}
        >
          Escríbenos por WhatsApp
        </Button>
      </div>
    </SectionWrapper>
  )
}
