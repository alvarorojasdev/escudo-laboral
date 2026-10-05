import type { Metadata } from 'next'
import { Autoevaluacion } from '@/components/autoevaluacion/Autoevaluacion'

export const metadata: Metadata = {
  title: 'Autoevaluación de estándares mínimos SG-SST (Resolución 0312)',
  description:
    'Revisa cuáles de los estándares mínimos de la Resolución 0312 de 2019 cumple tu empresa y qué te falta. Gratis, con la tabla de valores oficial.',
}

export default function AutoevaluacionPage() {
  return (
    <section className="bg-neutral-50 pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
            Autoevaluación de estándares mínimos
          </h1>
          <p className="mx-auto max-w-xl text-neutral-700">
            Marca lo que tu empresa ya tiene y te mostramos qué te falta para cumplir la Resolución
            0312 de 2019. Nada se envía, salvo que al final dejes tu correo.
          </p>
        </div>
        <Autoevaluacion />
      </div>
    </section>
  )
}
