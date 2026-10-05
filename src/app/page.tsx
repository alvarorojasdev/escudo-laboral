import { Hero } from '@/components/sections/Hero'
import { Herramientas } from '@/components/sections/Herramientas'
import { Benefits } from '@/components/sections/Benefits'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTABanner } from '@/components/sections/CTABanner'
import { Pricing } from '@/components/sections/Pricing'
import { FAQ } from '@/components/sections/FAQ'
import { ContactForm } from '@/components/sections/ContactForm'
import { JsonLd } from '@/lib/schema'
import { WHATSAPP_MESSAGES } from '@/lib/constants'

export default function Home() {
  return (
    <>
      <JsonLd />
      <Hero />
      <Herramientas />
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <CTABanner />
      <Pricing />
      <FAQ />
      <CTABanner
        title="¿Tienes más preguntas?"
        subtitle="Nuestro equipo está listo para ayudarte a cumplir con la normativa SST"
        buttonText="Escríbenos por WhatsApp"
        whatsappMessage={WHATSAPP_MESSAGES.faq}
      />
      <ContactForm />
    </>
  )
}
