import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Download, FileText } from 'lucide-react'
import { PLANTILLAS } from '@/lib/documentos/plantillas'
import { guiaPorSlug } from '@/lib/blog/guias'
import { sinCortarSiglas } from '@/lib/texto'

export const metadata: Metadata = {
  title: 'Plantillas gratis de SG-SST en Word',
  description:
    'Descarga gratis el plan anual de trabajo prellenado, el acta del COPASST y la matriz de peligros GTC-45 en Word, sin registrarte.',
}

export default function PlantillasPage() {
  return (
    <section className="bg-neutral-50 pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
          {sinCortarSiglas('Plantillas gratis de SG-SST')}
        </h1>
        <p className="mb-10 text-lg text-neutral-700">
          En Word, listas para llenar con los datos de tu empresa. Sin registro: se descargan
          directo.
        </p>

        <div className="space-y-4">
          {PLANTILLAS.map((p) => {
            const guia = p.guia ? guiaPorSlug(p.guia) : undefined
            return (
              <article
                key={p.id}
                className="flex flex-col gap-5 rounded-2xl border border-neutral-200 bg-white p-6 sm:flex-row sm:items-start"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-lighter">
                  <FileText className="h-6 w-6 text-primary" />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-bold text-neutral-900">
                    {sinCortarSiglas(p.titulo)}
                  </h2>
                  <p className="mt-2 text-neutral-700">{p.descripcion}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
                    <a
                      href={`/descargas/${p.archivo}`}
                      download
                      className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                    >
                      <Download className="h-4 w-4" />
                      Descargar Word
                    </a>
                    {guia && (
                      <Link
                        href={`/blog/${guia.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover"
                      >
                        Cómo llenarla
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <p className="mt-10 text-sm text-neutral-500">
          ¿Necesitas la política de SG-SST?{' '}
          <Link href="/politica-sst" className="font-semibold text-accent hover:text-accent-hover">
            Genérala con los datos de tu empresa
          </Link>
          . Y para saber cuándo usar cada documento, mira el{' '}
          <Link
            href="/calendario-sst"
            className="font-semibold text-accent hover:text-accent-hover"
          >
            calendario de obligaciones
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
