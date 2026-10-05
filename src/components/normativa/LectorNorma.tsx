'use client'

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Bot, ChevronDown, List, Search, X } from 'lucide-react'
import type { BloqueTexto } from '@/lib/normativa/formato'
import { BUSINESS } from '@/lib/constants'

export interface ArticuloLector {
  articulo: string
  titulo: string
  bloques: BloqueTexto[]
  /** Texto, título y preguntas frecuentes en minúscula y sin tildes, para el buscador. */
  buscable: string
}

const normalizar = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

/** Parte inicial (hasta un punto) que comparten todos los números de artículo, si la hay. */
function prefijoComun(numeros: string[]) {
  if (numeros.length < 2) return ''
  let prefijo = numeros[0]
  for (const n of numeros) while (!n.startsWith(prefijo)) prefijo = prefijo.slice(0, -1)
  const corte = prefijo.lastIndexOf('.')
  return corte > 0 ? prefijo.slice(0, corte + 1) : ''
}

/** "del Decreto 1072 pero "de la Resolución 0312", "de la Ley 1562". */
const deLa = (norma: string) => (/^Decreto/.test(norma) ? `del ${norma}` : `de la ${norma}`)
const enLa = (norma: string) => (/^Decreto/.test(norma) ? `en el ${norma}` : `en la ${norma}`)

/** Abre el chat de Andrea con la pregunta escrita, sin enviarla (ver ChatWidget). */
function preguntarAAndrea(texto: string) {
  window.dispatchEvent(new CustomEvent('andrea:preguntar', { detail: texto }))
}

function Bloques({ bloques }: { bloques: BloqueTexto[] }) {
  return (
    <>
      {bloques.map((b, i) =>
        b.tipo === 'parrafo' ? (
          <p key={i} className="mb-3 last:mb-0">
            {/^PAR[ÁA]GRAFO/.test(b.texto) ? (
              <>
                <span className="font-semibold text-neutral-900">
                  {b.texto.match(/^PAR[ÁA]GRAFO( \d+| TRANSITORIO)?\.?/)?.[0]}
                </span>
                {b.texto.replace(/^PAR[ÁA]GRAFO( \d+| TRANSITORIO)?\.?/, '')}
              </>
            ) : (
              b.texto
            )}
          </p>
        ) : (
          <ol key={i} className="mb-3 space-y-2 last:mb-0">
            {b.items.map((item) => (
              <li key={item.marca} className="flex gap-2 sm:gap-3">
                <span className="min-w-5 shrink-0 font-semibold text-accent sm:min-w-6">
                  {item.marca}
                </span>
                <div className="min-w-0 flex-1">
                  {item.sub ? <Bloques bloques={item.sub} /> : item.texto}
                </div>
              </li>
            ))}
          </ol>
        ),
      )}
    </>
  )
}

export function LectorNorma({
  norma,
  articulos,
  encabezado,
  cierre,
}: {
  norma: string
  articulos: ArticuloLector[]
  /** Título y avisos de la norma: van arriba de la columna de lectura, a la par del índice. */
  encabezado: ReactNode
  cierre: ReactNode
}) {
  const [abiertos, setAbiertos] = useState<Set<string>>(new Set())
  const [consulta, setConsulta] = useState('')
  const [indiceAbierto, setIndiceAbierto] = useState(false)

  const termino = normalizar(consulta.trim())
  const visibles = useMemo(
    () =>
      termino
        ? articulos.filter((a) => termino.split(/\s+/).every((p) => a.buscable.includes(p)))
        : articulos,
    [articulos, termino],
  )

  // Un enlace con #articulo-X (desde las guías o el índice) abre ese artículo.
  useEffect(() => {
    function abrirDesdeHash() {
      const id = decodeURIComponent(window.location.hash.replace(/^#articulo-/, ''))
      if (!id || !articulos.some((a) => a.articulo === id)) return
      setAbiertos((prev) => new Set(prev).add(id))
      requestAnimationFrame(() => document.getElementById(`articulo-${id}`)?.scrollIntoView())
    }
    abrirDesdeHash()
    window.addEventListener('hashchange', abrirDesdeHash)
    return () => window.removeEventListener('hashchange', abrirDesdeHash)
  }, [articulos])

  function alternar(id: string) {
    setAbiertos((prev) => {
      const nuevo = new Set(prev)
      if (nuevo.has(id)) nuevo.delete(id)
      else nuevo.add(id)
      return nuevo
    })
  }

  const todosAbiertos = visibles.every((a) => abiertos.has(a.articulo))
  // En el Decreto 1072 todos empiezan con "2.2.4.": se muestra una vez arriba y
  // en el índice solo lo que cambia, para dejarle espacio al título.
  const prefijo = prefijoComun(articulos.map((a) => a.articulo))
  const corto = (articulo: string) => articulo.slice(prefijo.length)
  const anchoNumero = Math.max(...articulos.map((a) => corto(a.articulo).length)) + 1

  const indice = (
    <nav aria-label="Índice de artículos">
      <ul className="space-y-0.5 text-sm">
        {visibles.map((a) => (
          <li key={a.articulo}>
            <a
              href={`#articulo-${a.articulo}`}
              onClick={() => setIndiceAbierto(false)}
              className="flex gap-2 rounded-lg px-2.5 py-1.5 text-neutral-700 transition-colors hover:bg-white hover:text-accent-hover"
            >
              <span
                className="shrink-0 font-semibold text-neutral-900 tabular-nums"
                style={{ width: `${anchoNumero}ch` }}
              >
                {corto(a.articulo)}
              </span>
              <span className="line-clamp-2 min-w-0 break-words">{a.titulo}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )

  return (
    <div className="lg:grid lg:grid-cols-[17rem_1fr] lg:gap-10">
      <aside className="hidden lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2 pb-6">
          <p className="mb-3 px-2.5 text-xs font-semibold tracking-wide text-neutral-500 uppercase">
            Artículos{prefijo && ` · ${prefijo}`}
          </p>
          {indice}
        </div>
      </aside>

      <div className="min-w-0">
        {encabezado}
        <div className="sticky top-[4.5rem] z-10 -mx-4 mb-6 bg-neutral-50/95 px-4 py-3 backdrop-blur sm:mx-0 sm:px-0">
          <div className="flex gap-2">
            <label className="relative flex-1">
              <span className="sr-only">Buscar en esta norma</span>
              <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-500" />
              <input
                name="buscar"
                type="search"
                value={consulta}
                onChange={(e) => setConsulta(e.target.value)}
                placeholder="Buscar en esta norma…"
                className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pr-9 pl-10 text-base focus:border-accent focus:outline-none sm:text-sm"
              />
              {consulta && (
                <button
                  onClick={() => setConsulta('')}
                  aria-label="Borrar búsqueda"
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded p-1 text-neutral-500 hover:text-neutral-900"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </label>
            <button
              onClick={() => setIndiceAbierto(!indiceAbierto)}
              aria-expanded={indiceAbierto}
              className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3.5 text-sm font-medium text-neutral-700 lg:hidden"
            >
              <List className="h-4 w-4" />
              Índice
            </button>
          </div>
          {indiceAbierto && (
            <div className="mt-2 max-h-[60vh] overflow-y-auto rounded-xl border border-neutral-200 bg-neutral-50 p-2 lg:hidden">
              {indice}
            </div>
          )}
          <div className="mt-2 flex items-center justify-between text-xs text-neutral-500">
            <span>
              {termino
                ? `${visibles.length} de ${articulos.length} artículos mencionan "${consulta.trim()}"`
                : `${articulos.length} artículos`}
            </span>
            {visibles.length > 0 && (
              <button
                onClick={() =>
                  setAbiertos(todosAbiertos ? new Set() : new Set(visibles.map((a) => a.articulo)))
                }
                className="font-medium text-accent hover:text-accent-hover"
              >
                {todosAbiertos ? 'Cerrar todos' : 'Abrir todos'}
              </button>
            )}
          </div>
        </div>

        {visibles.length === 0 && (
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center text-sm text-neutral-700">
            Ningún artículo menciona eso. Prueba con otra palabra o{' '}
            <button
              onClick={() => preguntarAAndrea(`${consulta.trim()} (${enLa(norma)})`)}
              className="font-semibold text-accent hover:text-accent-hover"
            >
              pregúntale a {BUSINESS.assistant}
            </button>
            .
          </div>
        )}

        <div className="space-y-3">
          {articulos.map((a) => {
            const visible = visibles.includes(a)
            const abierto = abiertos.has(a.articulo) || (termino !== '' && visible)
            return (
              <article
                key={a.articulo}
                id={`articulo-${a.articulo}`}
                hidden={!visible}
                className="scroll-mt-40 rounded-2xl border border-neutral-200 bg-white"
              >
                <h2>
                  <button
                    onClick={() => alternar(a.articulo)}
                    aria-expanded={abierto}
                    aria-controls={`texto-${a.articulo}`}
                    className="flex w-full items-start gap-3 px-5 py-4 text-left"
                  >
                    <span className="flex-1">
                      <span className="mr-2 font-bold text-accent">Artículo {a.articulo}.</span>
                      <span className="font-semibold text-neutral-900">{a.titulo}</span>
                    </span>
                    <ChevronDown
                      className={`mt-0.5 h-5 w-5 shrink-0 text-neutral-500 transition-transform ${abierto ? 'rotate-180' : ''}`}
                    />
                  </button>
                </h2>
                <div
                  id={`texto-${a.articulo}`}
                  hidden={!abierto}
                  className="border-t border-neutral-100 px-5 pt-4 pb-5 text-[15px] leading-relaxed text-neutral-700"
                >
                  <Bloques bloques={a.bloques} />
                  <button
                    onClick={() =>
                      preguntarAAndrea(
                        `Explícame en simple el artículo ${a.articulo} ${deLa(norma)}: ¿qué tiene que hacer mi empresa?`,
                      )
                    }
                    className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:border-accent hover:text-accent-hover"
                  >
                    <Bot className="h-4 w-4" />
                    Preguntarle a {BUSINESS.assistant}
                  </button>
                </div>
              </article>
            )
          })}
        </div>

        {cierre}
      </div>
    </div>
  )
}
