'use client'

import { useState, type FormEvent } from 'react'
import { Send, Phone, Mail, MapPin } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { BUSINESS, WHATSAPP_MESSAGES, whatsappLink } from '@/lib/constants'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [whatsappFallback, setWhatsappFallback] = useState<string>(whatsappLink(WHATSAPP_MESSAGES.general))

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const nombre = form.get('nombre') as string
    const empresa = form.get('empresa') as string
    const mensaje = form.get('mensaje') as string

    const text = `Hola, soy ${nombre}${empresa ? ` de ${empresa}` : ''}. ${mensaje}`
    setWhatsappFallback(`${BUSINESS.whatsappUrl}?text=${encodeURIComponent(text)}`)
    setStatus('sending')

    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          email: form.get('email') as string,
          telefono: (form.get('telefono') as string) || undefined,
          empresa: empresa || undefined,
          mensaje,
        }),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <SectionWrapper id="contacto" alternate>
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
            Solicita tu asesoría gratuita
          </h2>
          <p className="mx-auto max-w-2xl text-neutral-700">
            Déjanos tus datos y te contactamos para explicarte cómo proteger tu
            empresa.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            {status === 'sent' || status === 'error' ? (
              <div className="rounded-2xl border border-accent/20 bg-accent-light p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white">
                  <Send className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-neutral-900">
                  {status === 'sent' ? '¡Mensaje enviado!' : 'No pudimos enviar tu mensaje'}
                </h3>
                <p className="text-neutral-700">
                  {status === 'sent' ? (
                    'Recibimos tus datos y te contactamos a la brevedad.'
                  ) : (
                    <>
                      Intenta de nuevo o escríbenos directo{' '}
                      <a
                        href={whatsappFallback}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-accent hover:underline"
                      >
                        por WhatsApp
                      </a>
                      .
                    </>
                  )}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 text-sm font-medium text-accent hover:underline"
                >
                  {status === 'sent' ? 'Enviar otro mensaje' : 'Reintentar'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="nombre"
                      className="mb-1.5 block text-sm font-medium text-neutral-900"
                    >
                      Nombre *
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      required
                      placeholder="Tu nombre completo"
                      className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-neutral-900 transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-neutral-900"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="tu@email.com"
                      className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-neutral-900 transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="telefono"
                      className="mb-1.5 block text-sm font-medium text-neutral-900"
                    >
                      Teléfono
                    </label>
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      placeholder="+57 300 000 0000"
                      className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-neutral-900 transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="empresa"
                      className="mb-1.5 block text-sm font-medium text-neutral-900"
                    >
                      Empresa
                    </label>
                    <input
                      id="empresa"
                      name="empresa"
                      type="text"
                      placeholder="Nombre de tu empresa"
                      className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-neutral-900 transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="mensaje"
                    className="mb-1.5 block text-sm font-medium text-neutral-900"
                  >
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    required
                    rows={4}
                    placeholder="Cuéntanos qué necesitas..."
                    className="w-full resize-none rounded-lg border border-neutral-200 px-4 py-3 text-neutral-900 transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-8 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-xl disabled:opacity-60 sm:w-auto"
                >
                  <Send className="h-4 w-4" />
                  {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-primary p-8 text-white">
              <h3 className="mb-6 text-lg font-bold">
                Información de contacto
              </h3>
              <ul className="space-y-5">
                <li>
                  <a
                    href={`tel:${BUSINESS.phoneRaw}`}
                    className="flex items-center gap-3 text-white/80 transition-colors hover:text-white"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50">Teléfono</p>
                      <p className="font-medium">{BUSINESS.phone}</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${BUSINESS.email}`}
                    className="flex items-center gap-3 text-white/80 transition-colors hover:text-white"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50">Email</p>
                      <p className="font-medium">{BUSINESS.email}</p>
                    </div>
                  </a>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Ubicación</p>
                    <p className="font-medium">{BUSINESS.location}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
