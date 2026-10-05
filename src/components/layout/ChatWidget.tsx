'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Send, Sparkles, X } from 'lucide-react'
import { TextoChat } from './TextoChat'
import { BUSINESS } from '@/lib/constants'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const GREETING: Message = {
  role: 'assistant',
  content:
    `¡Hola! Soy ${BUSINESS.assistant}, de ${BUSINESS.name}. Pregúntame lo que quieras sobre SG-SST, ARL, matriz de riesgos o normativa colombiana.`,
}

const SUGERENCIAS = [
  '¿Cuántos estándares mínimos me aplican?',
  '¿Cuánto cuesta implementarlo?',
  '¿Desde qué altura es trabajo en alturas?',
  '¿Cuánto tengo para reportar un accidente?',
]

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [estado, setEstado] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // block: 'nearest' evita que el navegador scrollee el documento entero
    // para traer a la vista un elemento que ya está dentro del panel fijo.
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [messages, estado])

  // Los botones "Preguntarle a Andrea" de /normativa abren el chat con la
  // pregunta escrita. No se envía sola: la persona la revisa y decide.
  useEffect(() => {
    function preguntar(e: Event) {
      const texto = (e as CustomEvent<string>).detail
      if (typeof texto !== 'string') return
      setOpen(true)
      setInput(texto.slice(0, 500))
    }
    window.addEventListener('andrea:preguntar', preguntar)
    return () => window.removeEventListener('andrea:preguntar', preguntar)
  }, [])

  async function sendMessage(textoDirecto?: string) {
    const text = (textoDirecto ?? input).trim()
    if (!text || sending) return

    const history = [...messages, { role: 'user' as const, content: text }]
    setMessages([...history, { role: 'assistant', content: '' }])
    setInput('')
    setSending(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })

      if (!res.ok || !res.body) throw new Error('request failed')

      // El servidor manda NDJSON: líneas de estado mientras trabaja y, al final,
      // la respuesta ya verificada.
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })

        const lineas = buffer.split('\n')
        buffer = lineas.pop() ?? ''

        for (const linea of lineas) {
          if (!linea.trim()) continue
          const evento = JSON.parse(linea) as { tipo: string; texto: string }
          if (evento.tipo === 'estado') {
            setEstado(evento.texto)
          } else if (evento.tipo === 'respuesta') {
            setEstado('')
            setMessages([...history, { role: 'assistant', content: evento.texto }])
          }
        }
      }
    } catch {
      setMessages([
        ...history,
        { role: 'assistant', content: 'No pude responder justo ahora. Intenta de nuevo en un momento.' },
      ])
    } finally {
      setEstado('')
      setSending(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Cerrar chat' : `Abrir chat con ${BUSINESS.assistant}`}
        className="fixed right-6 bottom-24 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white ring-2 ring-white/90 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-primary-light hover:shadow-xl"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-7 w-7" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed right-6 bottom-40 z-50 flex h-[min(28rem,calc(100vh-13rem))] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl"
          >
            <div className="flex items-center gap-2 bg-primary px-4 py-3 text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                <Sparkles className="h-4 w-4 text-accent" />
              </span>
              <div>
                <p className="text-sm font-semibold">{BUSINESS.assistant}</p>
                <p className="text-xs text-white/60">
                  Asistente de SG-SST · orientación general, no asesoría legal
                </p>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-accent text-white'
                        : 'bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    {m.content ? (
                      <TextoChat texto={m.content} />
                    ) : (
                      <span className="flex items-center gap-2 py-1">
                        <span className="flex gap-1">
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.3s]" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.15s]" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent" />
                        </span>
                        <AnimatePresence mode="wait">
                          {estado && (
                            <motion.span
                              key={estado}
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.18 }}
                              className="text-xs text-neutral-500"
                            >
                              {estado}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {messages.length === 1 && !sending && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {SUGERENCIAS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-left text-xs text-neutral-600 transition-colors hover:border-accent hover:text-accent"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                sendMessage()
              }}
              className="flex gap-2 border-t border-neutral-200 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta…"
                maxLength={1000}
                /* text-base en mobile: con menos de 16px iOS hace zoom al enfocar */
                className="min-w-0 flex-1 rounded-full border border-neutral-200 px-4 py-2 text-base sm:text-sm focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                aria-label="Enviar"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-colors hover:bg-accent-hover disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
