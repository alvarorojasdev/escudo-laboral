import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { AlertTriangle, ArrowLeft, MessageCircle } from 'lucide-react'
import { NORMAS, articulosDeNorma, normaPorSlug } from '@/lib/normativa/normas'
import { BUSINESS, whatsappLink } from '@/lib/constants'
import { estructurar } from '@/lib/normativa/formato'
import { LectorNorma } from '@/components/normativa/LectorNorma'

export function generateStaticParams() {
  return NORMAS.map((n) => ({ norma: n.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ norma: string }>
}): Promise<Metadata> {
  const norma = normaPorSlug((await params).norma)
  if (!norma) return {}
  return {
    title: `${norma.nombre} — texto y artículos`,
    description: norma.resumen,
  }
}

export default async function NormaPage({ params }: { params: Promise<{ norma: string }> }) {
  const norma = normaPorSlug((await params).norma)
  if (!norma) notFound()

  const articulos = articulosDeNorma(norma.nombre)

  return (
    <section className="bg-neutral-50 pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <LectorNorma
          norma={norma.nombre}
          articulos={articulos.map((a) => ({
            articulo: a.articulo,
            titulo: a.titulo,
            bloques: estructurar(a.texto),
            buscable: `${a.articulo} ${a.titulo} ${a.texto} ${a.temas.join(' ')}`
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, ''),
          }))}
          encabezado={
            <div key="encabezado" className="max-w-3xl">
              <Link
                href="/normativa"
                className="mb-6 inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-accent"
              >
                <ArrowLeft size={15} />
                Toda la normativa
              </Link>

              <h1 className="mb-3 text-3xl font-bold text-neutral-900 md:text-4xl">
                {norma.nombre}
              </h1>
              <p className="mb-6 text-lg text-neutral-700">{norma.resumen}</p>

              {norma.deroga?.map((d) => (
                <div
                  key={d.norma}
                  className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"
                >
                  <p className="mb-1 flex items-center gap-2 font-semibold">
                    <AlertTriangle size={16} />
                    Deroga la {d.norma}
                  </p>
                  <p>{d.cambio}</p>
                </div>
              ))}

              {norma.advertencia && (
                <div className="mb-4 rounded-xl border border-neutral-200 bg-white p-4 text-sm text-neutral-700">
                  <p className="mb-1 font-semibold text-neutral-900">Nota sobre su vigencia</p>
                  <p>{norma.advertencia}</p>
                </div>
              )}

              <p className="mb-8 text-xs text-neutral-500">
                Texto tomado de fuentes oficiales; se incluyen los artículos de impacto directo en
                micro y pequeñas empresas.
              </p>
            </div>
          }
          cierre={
            <div key="cierre" className="mt-12 rounded-2xl bg-primary-lighter p-6">
              <p className="mb-4 text-sm text-neutral-700">
                ¿Tienes una duda sobre cómo aplica esto a tu empresa? Pregúntale a{' '}
                {BUSINESS.assistant} en el chat: responde citando el artículo, o escríbenos.
              </p>
              <a
                href={whatsappLink(
                  `Hola, estaba leyendo la ${norma.nombre} en la página y tengo una duda.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-whatsapp px-5 py-2.5 text-sm font-semibold text-white hover:bg-whatsapp-hover"
              >
                <MessageCircle size={16} />
                Consultar por WhatsApp
              </a>
            </div>
          }
        />
      </div>
    </section>
  )
}
