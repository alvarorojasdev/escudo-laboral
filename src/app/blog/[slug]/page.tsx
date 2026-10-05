import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  Download,
  Lightbulb,
  MessageCircle,
} from 'lucide-react'
import { GUIAS, guiaPorSlug, type Bloque } from '@/lib/blog/guias'
import { slugDeNorma } from '@/lib/normativa/normas'
import { BUSINESS, whatsappLink } from '@/lib/constants'
import { sinCortarSiglas } from '@/lib/texto'
import { PLANTILLAS } from '@/lib/documentos/plantillas'

const SITIO = 'https://escudo-laboral.vercel.app'

export function generateStaticParams() {
  return GUIAS.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const guia = guiaPorSlug((await params).slug)
  if (!guia) return {}
  return {
    title: guia.titulo,
    description: guia.resumen,
    alternates: { canonical: `${SITIO}/blog/${guia.slug}` },
    openGraph: { type: 'article', title: guia.titulo, description: guia.resumen },
  }
}

function BloqueGuia({ bloque }: { bloque: Bloque }) {
  switch (bloque.tipo) {
    case 'subtitulo':
      return <h2 className="mt-10 mb-3 text-xl font-bold text-neutral-900">{bloque.texto}</h2>
    case 'parrafo':
      return <p className="mb-4 leading-relaxed text-neutral-700">{bloque.texto}</p>
    case 'nota':
      return (
        <div className="my-6 flex gap-3 rounded-xl border border-accent/20 bg-accent-light p-4 text-[15px] leading-relaxed text-neutral-700">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <p>{bloque.texto}</p>
        </div>
      )
    case 'lista': {
      const Lista = bloque.numerada ? 'ol' : 'ul'
      return (
        <Lista className="mb-4 space-y-3">
          {bloque.items.map((item, i) => (
            <li key={item} className="flex gap-3 leading-relaxed text-neutral-700">
              {bloque.numerada ? (
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {i + 1}
                </span>
              ) : (
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              )}
              <span>{item}</span>
            </li>
          ))}
        </Lista>
      )
    }
  }
}

export default async function GuiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const guia = guiaPorSlug((await params).slug)
  if (!guia) notFound()

  const articulo = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guia.titulo,
    description: guia.resumen,
    datePublished: guia.publicada,
    inLanguage: 'es-CO',
    author: { '@type': 'Organization', name: BUSINESS.name, url: SITIO },
    publisher: { '@type': 'Organization', name: BUSINESS.name, url: SITIO },
    mainEntityOfPage: `${SITIO}/blog/${guia.slug}`,
  }
  const otras = GUIAS.filter((g) => g.slug !== guia.slug)
  const plantilla = PLANTILLAS.find((p) => p.guia === guia.slug)

  return (
    <section className="bg-neutral-50 pt-28 pb-16 md:pt-32 md:pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articulo).replace(/</g, '\\u003c') }}
      />
      <article className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-accent"
        >
          <ArrowLeft size={15} />
          Todas las guías
        </Link>

        <h1 className="mb-4 text-3xl leading-tight font-bold text-neutral-900 md:text-4xl">
          {sinCortarSiglas(guia.titulo)}
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-neutral-700">{guia.resumen}</p>

        <Link
          href="/autoevaluacion"
          className="mb-10 flex items-center justify-between gap-4 rounded-xl border border-neutral-200 bg-white p-4 text-sm transition-colors hover:border-accent"
        >
          <span className="flex items-center gap-3 text-neutral-700">
            <ClipboardCheck className="h-5 w-5 shrink-0 text-accent" />
            ¿Tu empresa ya cumple esto? Revísalo en la autoevaluación gratis.
          </span>
          <ArrowRight className="h-4 w-4 shrink-0 text-accent" />
        </Link>

        <div className="text-[17px]">
          {guia.bloques.map((b, i) => (
            <BloqueGuia key={i} bloque={b} />
          ))}
        </div>

        {plantilla && (
          <a
            href={`/descargas/${plantilla.archivo}`}
            download
            className="mt-10 flex items-center justify-between gap-4 rounded-xl border border-accent/30 bg-accent-light p-5 transition-colors hover:border-accent"
          >
            <span>
              <span className="block font-semibold text-neutral-900">
                Descarga la plantilla: {plantilla.titulo}
              </span>
              <span className="text-sm text-neutral-700">En Word, gratis y sin registro.</span>
            </span>
            <Download className="h-5 w-5 shrink-0 text-accent" />
          </a>
        )}

        <div className="mt-12 rounded-2xl border border-neutral-200 bg-white p-6">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-neutral-900">
            <BookOpen className="h-4 w-4 text-accent" />
            De dónde sale esta guía
          </p>
          <ul className="space-y-1.5 text-sm">
            {guia.fuentes.map((f) => (
              <li key={`${f.norma}-${f.articulo}`}>
                <Link
                  href={`/normativa/${slugDeNorma(f.norma)}#articulo-${f.articulo}`}
                  className="text-neutral-700 underline decoration-neutral-300 underline-offset-2 hover:text-accent hover:decoration-accent"
                >
                  {f.norma}, artículo {f.articulo}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 rounded-2xl bg-primary p-6 text-white sm:p-8">
          <p className="mb-2 text-lg font-bold">¿Prefieres que lo hagamos contigo?</p>
          <p className="mb-5 text-white/75">
            Implementamos el SG-SST de micro y pequeñas empresas en Colombia.
          </p>
          <a
            href={whatsappLink(`Hola, leí la guía "${guia.titulo}" y quiero ayuda con eso.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-whatsapp px-5 py-2.5 font-semibold text-white transition-colors hover:bg-whatsapp-hover"
          >
            <MessageCircle className="h-5 w-5" />
            Hablar con un asesor
          </a>
        </div>

        {otras.length > 0 && (
          <div className="mt-12">
            <p className="mb-4 text-sm font-semibold tracking-wide text-neutral-500 uppercase">
              Otras guías
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {otras.map((g) => (
                <Link
                  key={g.slug}
                  href={`/blog/${g.slug}`}
                  className="rounded-xl border border-neutral-200 bg-white p-4 font-semibold text-neutral-900 transition-colors hover:border-accent hover:text-accent-hover"
                >
                  {g.titulo}
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </section>
  )
}
