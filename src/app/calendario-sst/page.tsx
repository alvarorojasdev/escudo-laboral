import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { OBLIGACIONES, type Frecuencia, type Obligacion } from '@/lib/calendario'
import { slugDeNorma } from '@/lib/normativa/normas'
import { DescargarCalendario } from '@/components/calendario/DescargarCalendario'
import { sinCortarSiglas } from '@/lib/texto'

export const metadata: Metadata = {
  title: 'Calendario de obligaciones del SG-SST',
  description:
    'Qué tiene que hacer tu empresa cada mes, cada año y cuando pasa un accidente para cumplir el SG-SST en Colombia, con la norma de cada obligación.',
}

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

/** Lo que cae en un mes fijo, para la franja del año. */
const HITOS: Record<number, string> = {
  1: 'Arranca el plan anual',
  7: 'Informe a la ARL',
  12: 'Autoevaluación y plan',
}

const SECCIONES: { frecuencia: Frecuencia; titulo: string; intro: string }[] = [
  { frecuencia: 'mensual', titulo: 'Cada mes', intro: 'Lo que se repite todos los meses.' },
  {
    frecuencia: 'fecha',
    titulo: 'En fechas fijas',
    intro: 'El año del SG-SST va de enero a diciembre y tiene tres hitos.',
  },
  {
    frecuencia: 'anual',
    titulo: 'Una vez al año',
    intro: 'Sin fecha fija: repártelas en tu plan anual y revisa en diciembre que se hicieron.',
  },
  { frecuencia: 'bienal', titulo: 'Cada dos años', intro: '' },
  {
    frecuencia: 'evento',
    titulo: 'Cuando pasa algo',
    intro: 'No tienen fecha: se activan con un hecho y tienen plazo.',
  },
]

function Tarjeta({ o }: { o: Obligacion }) {
  return (
    <li className="rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-semibold text-neutral-900">{o.titulo}</h3>
        {o.mes && (
          <span className="shrink-0 rounded-full bg-accent-light px-3 py-1 text-xs font-semibold text-accent-hover">
            {MESES[o.mes - 1]}
          </span>
        )}
      </div>
      <p className="mt-2 text-[15px] leading-relaxed text-neutral-700">{o.detalle}</p>
      <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500">
        <BookOpen className="h-3.5 w-3.5" />
        {o.fuentes.map((f) => (
          <Link
            key={`${f.norma}-${f.articulo}`}
            href={`/normativa/${slugDeNorma(f.norma)}#articulo-${f.articulo}`}
            className="underline decoration-neutral-300 underline-offset-2 hover:text-accent hover:decoration-accent"
          >
            {f.norma}, art. {f.articulo}
          </Link>
        ))}
      </p>
    </li>
  )
}

export default function CalendarioPage() {
  return (
    <section className="bg-neutral-50 pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
          {sinCortarSiglas('Calendario de obligaciones del SG-SST')}
        </h1>
        <p className="mb-6 max-w-2xl text-lg text-neutral-700">
          Qué le toca a tu empresa cada mes, cada año y cuando pasa algo. Cada obligación trae la
          norma de donde sale.
        </p>
        <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <DescargarCalendario />
          <p className="text-sm text-neutral-500">
            Recordatorios que se repiten solos en Google Calendar, Outlook o el iPhone.
          </p>
        </div>

        {/* El año de un vistazo */}
        <div className="mb-14 rounded-3xl bg-primary p-5 sm:p-7">
          <p className="mb-4 text-sm font-semibold tracking-wide text-white/60 uppercase">
            Tu año en SG-SST
          </p>
          <ol className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {MESES.map((mes, i) => {
              const hito = HITOS[i + 1]
              return (
                <li
                  key={mes}
                  className={`flex min-h-20 flex-col rounded-xl p-3 ${
                    hito ? 'bg-accent text-white' : 'bg-white/8 text-white/80'
                  }`}
                >
                  <span className="flex items-center justify-between text-sm font-bold">
                    {mes}
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70" aria-hidden />
                  </span>
                  {hito && (
                    <span className="mt-auto pt-2 text-xs leading-tight font-semibold">{hito}</span>
                  )}
                </li>
              )
            })}
          </ol>
          <p className="mt-4 flex items-center gap-2 text-xs text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" aria-hidden />
            Todos los meses: reuniones de los comités e indicadores del mes
          </p>
        </div>

        <div className="space-y-12">
          {SECCIONES.map((s) => {
            const lista = OBLIGACIONES.filter((o) => o.frecuencia === s.frecuencia)
            if (lista.length === 0) return null
            return (
              <section key={s.frecuencia}>
                <h2 className="text-2xl font-bold text-neutral-900">{s.titulo}</h2>
                {s.intro && <p className="mt-1 text-neutral-500">{s.intro}</p>}
                <ul className="mt-5 grid gap-3 md:grid-cols-2">
                  {lista.map((o) => (
                    <Tarjeta key={o.id} o={o} />
                  ))}
                </ul>
              </section>
            )
          })}
        </div>

        <p className="mt-14 text-sm text-neutral-500">
          ¿No sabes en qué vas?{' '}
          <Link
            href="/autoevaluacion"
            className="font-semibold text-accent hover:text-accent-hover"
          >
            Haz la autoevaluación de estándares mínimos
          </Link>{' '}
          o lee las{' '}
          <Link href="/blog" className="font-semibold text-accent hover:text-accent-hover">
            guías paso a paso
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
