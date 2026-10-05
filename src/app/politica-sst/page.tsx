import type { Metadata } from 'next'
import { GeneradorPolitica } from '@/components/documentos/GeneradorPolitica'

export const metadata: Metadata = {
  title: 'Generador gratis de Política de SG-SST',
  description:
    'Genera el borrador de la Política de Seguridad y Salud en el Trabajo de tu empresa y descárgalo en Word. Cumple los requisitos del Decreto 1072 de 2015.',
}

export default function PoliticaSstPage() {
  return (
    <section className="bg-neutral-50 pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center print:hidden">
          <h1 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
            Genera tu Política de SG-SST
          </h1>
          <p className="mx-auto max-w-2xl text-neutral-700">
            Completa los datos de tu empresa y descarga el borrador en Word, listo para
            revisar y firmar. Cada sección va anclada al artículo del Decreto 1072 de 2015
            que la exige, para que puedas verificarlo.
          </p>
        </div>
        <GeneradorPolitica />
      </div>
    </section>
  )
}
