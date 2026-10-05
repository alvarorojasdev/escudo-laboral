import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, ArrowRight, FileText } from 'lucide-react'
import { NORMAS } from '@/lib/normativa/normas'
import { articulosDeNorma } from '@/lib/normativa/normas'

export const metadata: Metadata = {
  title: 'Normativa de SG-SST en Colombia, artículo por artículo',
  description:
    'Las 12 normas que rigen la seguridad y salud en el trabajo en Colombia, con su texto oficial. Incluye qué normas fueron derogadas y qué datos cambiaron.',
}

export default function NormativaPage() {
  const derogaciones = NORMAS.filter((n) => n.deroga?.length)

  return (
    <section className="bg-neutral-50 pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
            Normativa de SG-SST en Colombia
          </h1>
          <p className="mx-auto max-w-2xl text-neutral-700">
            El texto de las normas que rigen la seguridad y salud en el trabajo, tomado de
            fuentes oficiales. Sin resúmenes de terceros y sin normas derogadas.
          </p>
        </div>

        {derogaciones.length > 0 && (
          <div className="mb-10 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
            <h2 className="mb-3 flex items-center gap-2 font-bold text-amber-900">
              <AlertTriangle size={18} />
              Ojo con lo que encuentras en internet
            </h2>
            <p className="mb-4 text-sm text-amber-900">
              Estas normas siguen explicándose por todas partes como si rigieran, pero fueron
              derogadas y sus datos cambiaron:
            </p>
            <ul className="space-y-3">
              {derogaciones.flatMap((n) =>
                (n.deroga ?? []).map((d) => (
                  <li key={d.norma} className="text-sm text-amber-900">
                    <Link href={`/normativa/${n.slug}`} className="font-semibold underline">
                      {d.norma}
                    </Link>{' '}
                    — derogada por la {n.nombre}. {d.cambio}
                  </li>
                )),
              )}
            </ul>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          {NORMAS.map((norma) => (
            <Link
              key={norma.slug}
              href={`/normativa/${norma.slug}`}
              className="group rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
            >
              <div className="mb-2 flex items-start justify-between gap-3">
                <h2 className="font-bold text-neutral-900 group-hover:text-accent">
                  {norma.nombre}
                </h2>
                <ArrowRight
                  size={18}
                  className="mt-0.5 shrink-0 text-neutral-300 group-hover:text-accent"
                />
              </div>
              <p className="mb-3 text-sm leading-relaxed text-neutral-600">{norma.resumen}</p>
              <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500">
                <FileText size={13} />
                {articulosDeNorma(norma.nombre).length} artículos
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
