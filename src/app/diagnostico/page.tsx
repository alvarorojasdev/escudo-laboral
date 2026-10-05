import type { Metadata } from 'next'
import { DiagnosticoQuiz } from '@/components/diagnostico/DiagnosticoQuiz'

export const metadata: Metadata = {
  title: 'Diagnóstico gratis de SG-SST con IA',
  description:
    'Responde 5 preguntas y recibe en segundos un mini-reporte de brechas de cumplimiento SG-SST para tu empresa, generado con IA.',
}

export default function DiagnosticoPage() {
  return (
    <section className="bg-neutral-50 pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
            Diagnóstico gratis de SG-SST
          </h1>
          <p className="mx-auto max-w-xl text-neutral-700">
            Responde 5 preguntas rápidas y recibe un mini-reporte con tu nivel
            de riesgo y las principales brechas de cumplimiento de tu empresa.
          </p>
        </div>
        <DiagnosticoQuiz />
      </div>
    </section>
  )
}
