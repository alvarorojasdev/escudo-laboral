import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-4 pt-24">
      <p className="mb-2 text-7xl font-bold text-accent">404</p>
      <h1 className="mb-4 text-2xl font-bold text-neutral-900">
        Página no encontrada
      </h1>
      <p className="mb-8 text-neutral-700">
        La página que buscas no existe o fue movida.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-white transition-all hover:bg-accent-hover"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al inicio
      </Link>
    </section>
  )
}
