import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { CookieConsent } from '@/components/layout/CookieConsent'
import { Analytics } from '@vercel/analytics/next'
import { ChatWidget } from '@/components/layout/ChatWidget'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://escudo-laboral.vercel.app'),
  title: {
    default: 'Escudo Laboral — SG-SST para Micro y Pequeñas Empresas en Colombia',
    template: '%s | Escudo Laboral',
  },
  description:
    'Implementamos y mantenemos el Sistema de Gestión de Seguridad y Salud en el Trabajo (SG-SST) para micro y pequeñas empresas en Colombia. Cumple con el Decreto 1072/2015 y la Resolución 0312/2019.',
  keywords: [
    'SG-SST',
    'seguridad y salud en el trabajo',
    'Decreto 1072',
    'Resolución 0312',
    'seguridad laboral Colombia',
    'PYMES Colombia',
    'Bogotá',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: 'Escudo Laboral',
    title: 'Escudo Laboral — SG-SST para Empresas en Colombia',
    description:
      'Implementamos el SG-SST para micro y pequeñas empresas. Cumple con la normativa sin complicaciones.',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <ChatWidget />
        <CookieConsent />
        {/* Cuenta visitas por página sin usar cookies, así que no depende del
            aviso de cookies. Los pasos dentro de cada herramienta (descargar,
            dejar el correo) no se pueden medir acá en el plan gratuito de
            Vercel: se cuentan del lado del servidor. */}
        <Analytics />
      </body>
    </html>
  )
}
