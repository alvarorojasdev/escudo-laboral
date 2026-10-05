import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ClipboardCheck } from 'lucide-react'
import { GUIAS } from '@/lib/blog/guias'
import { sinCortarSiglas } from '@/lib/texto'

export const metadata: Metadata = {
  title: 'Guías prácticas de SG-SST',
  description:
    'Guías paso a paso para cumplir los estándares mínimos del SG-SST en Colombia, escritas a partir del texto de la Resolución 0312 y el Decreto 1072.',
}

export default function BlogPage() {
  return (
    <section className="bg-neutral-50 pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
          {sinCortarSiglas('Guías prácticas de SG-SST')}
        </h1>
        <p className="mb-10 text-lg text-neutral-700">
          Cómo cumplir, paso a paso, lo que exige la norma. Cada guía cita los artículos de donde
          sale.
        </p>

        <div className="space-y-4">
          {GUIAS.map((g) => (
            <Link
              key={g.slug}
              href={`/blog/${g.slug}`}
              className="group block rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:border-accent hover:shadow-md"
            >
              <h2 className="mb-2 text-xl font-bold text-neutral-900 group-hover:text-accent-hover">
                {sinCortarSiglas(g.titulo)}
              </h2>
              <p className="mb-4 text-neutral-700">{g.resumen}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                Leer la guía
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-primary p-6 text-white sm:p-8">
          <p className="mb-2 flex items-center gap-2 text-lg font-bold">
            <ClipboardCheck className="h-5 w-5 text-accent" />
            ¿No sabes por dónde empezar?
          </p>
          <p className="mb-5 text-white/75">
            Haz la autoevaluación: en 5 minutos ves qué estándares te faltan y cada uno te lleva a
            su guía.
          </p>
          <Link
            href="/autoevaluacion"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Hacer la autoevaluación
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
