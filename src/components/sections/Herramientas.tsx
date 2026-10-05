import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { IconoHerramienta } from '@/components/ui/IconoHerramienta'
import { HERRAMIENTAS } from '@/lib/constants'

/**
 * Las herramientas gratis, en la portada. La autoevaluación va destacada: es
 * la única que dice, estándar por estándar, qué le falta a la empresa.
 */
export function Herramientas() {
  const [destacada, ...resto] = HERRAMIENTAS
  return (
    <SectionWrapper id="herramientas">
      <div className="mb-10 text-center">
        <h2 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
          Empieza gratis, hoy mismo
        </h2>
        <p className="mx-auto max-w-2xl text-neutral-700">
          Herramientas para saber en qué está tu empresa y avanzar por tu cuenta. Sin registro.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link
          href={destacada.href}
          className="group flex flex-col justify-between rounded-2xl bg-primary p-8 transition-all hover:-translate-y-1 hover:shadow-lg md:col-span-2 lg:col-span-1 lg:row-span-2"
        >
          <div>
            <span className="mb-5 inline-flex rounded-xl bg-accent p-3 text-white">
              <IconoHerramienta icono={destacada.icono} className="h-7 w-7" />
            </span>
            <h3 className="mb-3 text-2xl font-bold text-white">{destacada.label}</h3>
            <p className="leading-relaxed text-white/75">{destacada.descripcion}</p>
          </div>
          <span className="mt-8 inline-flex items-center gap-2 font-semibold text-accent">
            Ver qué me falta
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>

        {resto.map((h) => (
          <Link
            key={h.href}
            href={h.href}
            className="group flex gap-4 rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-light text-accent transition-colors group-hover:bg-accent group-hover:text-white">
              <IconoHerramienta icono={h.icono} className="h-5 w-5" />
            </span>
            <span>
              <span className="mb-1 block font-bold text-neutral-900">{h.label}</span>
              <span className="block text-sm leading-relaxed text-neutral-700">
                {h.descripcion}
              </span>
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-neutral-700">
        ¿Prefieres leer primero?{' '}
        <Link href="/blog" className="font-semibold text-accent hover:text-accent-hover">
          Guías paso a paso
        </Link>{' '}
        y{' '}
        <Link href="/normativa" className="font-semibold text-accent hover:text-accent-hover">
          normativa explicada
        </Link>
        .
      </p>
    </SectionWrapper>
  )
}
