'use client'

import { useSyncExternalStore } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Cookie } from 'lucide-react'

const STORAGE_KEY = 'escudo-laboral-cookie-consent'

let listeners: (() => void)[] = []

function subscribe(onChange: () => void) {
  listeners.push(onChange)
  return () => {
    listeners = listeners.filter((l) => l !== onChange)
  }
}

export function CookieConsent() {
  // El snapshot del servidor finge consentimiento para que el banner no aparezca
  // en el HTML inicial y no parpadee a quien ya respondió.
  const consent = useSyncExternalStore(
    subscribe,
    () => window.localStorage.getItem(STORAGE_KEY),
    () => 'accepted',
  )
  const visible = consent === null

  function respond(choice: 'accepted' | 'rejected') {
    window.localStorage.setItem(STORAGE_KEY, choice)
    listeners.forEach((l) => l())
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 bg-white/95 px-4 py-3 shadow-[0_-4px_16px_rgba(15,43,60,0.08)] backdrop-blur-sm"
          role="dialog"
          aria-label="Aviso de cookies"
        >
          {/* pr-24 en desktop deja libre la columna de los botones flotantes */}
          <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:pr-24">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-light text-accent">
                <Cookie className="h-4.5 w-4.5" />
              </div>
              <p className="text-sm leading-relaxed text-neutral-700">
                Usamos cookies para que la web funcione bien y entender qué te
                interesa. Tú decides.
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => respond('rejected')}
                className="flex-1 rounded-lg border border-neutral-200 px-5 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 sm:flex-none"
              >
                Rechazar
              </button>
              <button
                onClick={() => respond('accepted')}
                className="flex-1 rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover sm:flex-none"
              >
                Aceptar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
