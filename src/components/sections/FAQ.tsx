'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FAQ_ITEMS } from '@/lib/constants'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <SectionWrapper id="faq">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
          Preguntas Frecuentes
        </h2>
        <p className="mx-auto max-w-2xl text-neutral-700">
          Resolvemos las dudas más comunes sobre el SG-SST y nuestros servicios.
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-3">
        {FAQ_ITEMS.map((item, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-neutral-200 bg-white transition-shadow hover:shadow-sm"
          >
            <button
              onClick={() => toggle(i)}
              className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-neutral-100/50"
              aria-expanded={openIndex === i}
            >
              <span className="pr-4 font-semibold text-neutral-900">
                {item.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-neutral-700 transition-transform duration-300 ${
                  openIndex === i ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="border-t border-neutral-200 px-6 py-5">
                    <p className="leading-relaxed text-neutral-700">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
