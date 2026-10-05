'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X, Shield, MessageCircle, ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { HERRAMIENTAS, NAV_LINKS, WHATSAPP_MESSAGES, whatsappLink } from '@/lib/constants'
import { IconoHerramienta } from '@/components/ui/IconoHerramienta'
import Link from 'next/link'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [herramientasAbierto, setHerramientasAbierto] = useState(false)
  const herramientasRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  // Solo el home arranca con un hero oscuro detrás; en el resto de las páginas
  // el navbar transparente dejaría texto blanco sobre fondo claro.
  const overDarkHero = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Al recargar a mitad de página el navegador restaura el scroll sin
    // disparar el evento: sin esto la barra quedaba transparente sobre el texto.
    const cuadro = requestAnimationFrame(handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(cuadro)
    }
  }, [])

  // El desplegable se cierra con un clic afuera o con Escape.
  useEffect(() => {
    if (!herramientasAbierto) return
    const alClicAfuera = (e: MouseEvent) => {
      if (!herramientasRef.current?.contains(e.target as Node)) setHerramientasAbierto(false)
    }
    const alEscape = (e: KeyboardEvent) => e.key === 'Escape' && setHerramientasAbierto(false)
    document.addEventListener('mousedown', alClicAfuera)
    document.addEventListener('keydown', alEscape)
    return () => {
      document.removeEventListener('mousedown', alClicAfuera)
      document.removeEventListener('keydown', alEscape)
    }
  }, [herramientasAbierto])

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled || !overDarkHero || isOpen
          ? 'bg-primary/95 shadow-lg backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-white">
          <Shield className="h-8 w-8 text-accent" />
          <span className="text-xl font-bold">Escudo Laboral</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          <div ref={herramientasRef} className="relative">
            <button
              onClick={() => setHerramientasAbierto(!herramientasAbierto)}
              aria-expanded={herramientasAbierto}
              aria-haspopup="true"
              className="inline-flex items-center gap-1 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              Herramientas
              <ChevronDown
                className={`h-4 w-4 transition-transform ${herramientasAbierto ? 'rotate-180' : ''}`}
              />
            </button>
            {herramientasAbierto && (
              <div className="absolute top-full left-1/2 mt-4 w-[26rem] -translate-x-1/2 rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl">
                {HERRAMIENTAS.map((h) => (
                  <Link
                    key={h.href}
                    href={h.href}
                    onClick={() => setHerramientasAbierto(false)}
                    className="flex gap-3 rounded-xl p-3 transition-colors hover:bg-neutral-100"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-light text-accent">
                      <IconoHerramienta icono={h.icono} className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-neutral-900">
                        {h.label}
                      </span>
                      <span className="block text-xs leading-relaxed text-neutral-700">
                        {h.descripcion}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {NAV_LINKS.map((link) =>
            link.href.startsWith('/') ? (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ),
          )}
          <a
            href={whatsappLink(WHATSAPP_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-hover"
          >
            <MessageCircle className="h-4 w-4" />
            Contáctanos
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white lg:hidden"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-white/10 bg-primary/95 backdrop-blur-md lg:hidden">
          <div className="space-y-1 px-4 py-4">
            <p className="px-4 pt-1 pb-2 text-xs font-semibold tracking-wide text-white/50 uppercase">
              Herramientas
            </p>
            {HERRAMIENTAS.map((h) => (
              <Link
                key={h.href}
                href={h.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <IconoHerramienta icono={h.icono} className="h-5 w-5 text-accent" />
                {h.corto}
              </Link>
            ))}
            <div className="my-2 border-t border-white/10" />
            {NAV_LINKS.map((link) =>
              link.href.startsWith('/') ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-4 py-3 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-4 py-3 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </a>
              ),
            )}
            <a
              href={whatsappLink(WHATSAPP_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-center font-semibold text-white transition-all hover:bg-accent-hover"
            >
              <MessageCircle className="h-4 w-4" />
              Contáctanos
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
