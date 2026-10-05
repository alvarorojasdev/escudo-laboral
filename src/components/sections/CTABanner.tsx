import { MessageCircle } from 'lucide-react'
import { WHATSAPP_MESSAGES, whatsappLink } from '@/lib/constants'

interface CTABannerProps {
  title?: string
  subtitle?: string
  buttonText?: string
  whatsappMessage?: string
}

export function CTABanner({
  title = '¿Listo para proteger tu empresa?',
  subtitle = 'Recibe una asesoría gratuita y conoce cómo cumplir con la normativa SST',
  buttonText = 'Habla con un asesor',
  whatsappMessage = WHATSAPP_MESSAGES.asesoria,
}: CTABannerProps) {
  return (
    <section className="bg-gradient-to-r from-primary to-primary-light py-10 md:py-14">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
          {title}
        </h2>
        <p className="mb-6 text-white/70">{subtitle}</p>
        <a
          href={whatsappLink(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-xl"
        >
          <MessageCircle className="h-5 w-5" />
          {buttonText}
        </a>
      </div>
    </section>
  )
}
