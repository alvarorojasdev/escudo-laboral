'use client'

import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionWrapperProps {
  children: ReactNode
  id?: string
  className?: string
  alternate?: boolean
}

export function SectionWrapper({
  children,
  id,
  className = '',
  alternate = false,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`scroll-mt-20 py-12 md:py-16 ${alternate ? 'bg-neutral-100' : 'bg-neutral-50'} ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </motion.section>
  )
}
