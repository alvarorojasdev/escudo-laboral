import { Shield, Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { BUSINESS, WHATSAPP_MESSAGES, whatsappLink } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Shield className="h-8 w-8 text-accent" />
              <span className="text-xl font-bold">Escudo Laboral</span>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Expertos en implementación y mantenimiento del SG-SST para micro y
              pequeñas empresas en Colombia.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
              Enlaces
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Política de SG-SST gratis', href: '/politica-sst' },
                { label: 'Autoevaluación de estándares mínimos', href: '/autoevaluacion' },
                { label: 'Calendario de obligaciones', href: '/calendario-sst' },
                { label: 'Plantillas gratis', href: '/plantillas' },
                { label: 'Normativa colombiana', href: '/normativa' },
                { label: 'Beneficios', href: '/#beneficios' },
                { label: 'Cómo funciona', href: '/#como-funciona' },
                { label: 'Planes', href: '/#planes' },
                { label: 'Preguntas frecuentes', href: '/#faq' },
                { label: 'Blog', href: '/blog' },
              ].map((link) => (
                <li key={link.href}>
                  {link.href.startsWith('/') ? (
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${BUSINESS.phoneRaw}`}
                  className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-accent"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  {BUSINESS.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-accent"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <MapPin className="h-4 w-4 shrink-0" />
                {BUSINESS.location}
              </li>
              <li>
                <a
                  href={whatsappLink(WHATSAPP_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-whatsapp"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
              Normativa
            </h3>
            <p className="text-sm leading-relaxed text-white/70">
              Cumplimos con el {BUSINESS.decree} y la {BUSINESS.resolution} del
              Ministerio del Trabajo de Colombia.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} Escudo Laboral. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
