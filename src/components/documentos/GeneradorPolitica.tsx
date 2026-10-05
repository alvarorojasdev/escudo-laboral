'use client'

import { useMemo, useState } from 'react'
import { Download, FileText, Printer, Check, MessageCircle, Mail } from 'lucide-react'
import {
  RIESGO_OPTIONS,
  TAMANO_OPTIONS,
  generarPoliticaSST,
  politicaComoTexto,
  type DatosEmpresa,
} from '@/lib/documentos/politica-sst'
import { BUSINESS, whatsappLink } from '@/lib/constants'
import { Button } from '@/components/ui/Button'

const INICIAL: DatosEmpresa = {
  razonSocial: '',
  nit: '',
  actividad: '',
  ciudad: '',
  representanteLegal: '',
  tamano: '1-9',
  claseRiesgo: 'I',
}

// 16px en móvil: por debajo de eso iOS hace zoom automático al enfocar el campo.
const CAMPO =
  'w-full rounded-lg border border-neutral-300 px-3 py-2 text-base sm:text-sm text-neutral-900 ' +
  'focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent'

function descargarBlob(nombre: string, blob: Blob) {
  const url = URL.createObjectURL(blob)
  const enlace = document.createElement('a')
  enlace.href = url
  enlace.download = nombre
  document.body.appendChild(enlace)
  enlace.click()
  document.body.removeChild(enlace)
  URL.revokeObjectURL(url)
}

/** Campos sin los cuales el documento sale con un hueco entre corchetes. */
const OBLIGATORIOS: { campo: keyof DatosEmpresa; nombre: string }[] = [
  { campo: 'razonSocial', nombre: 'razón social' },
  { campo: 'nit', nombre: 'NIT' },
  { campo: 'actividad', nombre: 'actividad económica' },
  { campo: 'ciudad', nombre: 'ciudad' },
  { campo: 'representanteLegal', nombre: 'representante legal' },
]

export function GeneradorPolitica() {
  const [datos, setDatos] = useState<DatosEmpresa>(INICIAL)
  const [descargando, setDescargando] = useState(false)
  const [error, setError] = useState('')
  // Opcional a propósito: pedirlo obligatorio espanta a quien solo quiere el
  // documento. Quien lo deja es el que sí quiere hablar con alguien.
  const [correo, setCorreo] = useState('')
  const [avisado, setAvisado] = useState(false)
  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo.trim())

  const doc = useMemo(() => generarPoliticaSST(datos), [datos])
  const nombreArchivo = `Politica-SST-${(datos.razonSocial || 'empresa')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`

  // No se bloquea la descarga: bajar la plantilla en blanco para llenarla a
  // mano es un uso legítimo. Pero hay que avisarlo, porque si no la persona se
  // lleva un documento lleno de [RAZÓN SOCIAL] sin haberlo notado.
  const faltantes = OBLIGATORIOS.filter((o) => !datos[o.campo].trim()).map((o) => o.nombre)

  function set<K extends keyof DatosEmpresa>(campo: K, valor: DatosEmpresa[K]) {
    setDatos((previo) => ({ ...previo, [campo]: valor }))
  }

  /**
   * El .docx se arma en el servidor. El primer intento fue un HTML con
   * extensión .doc —truco que anda en Word de Windows— pero macOS mira el
   * contenido y no la extensión: lo ve como HTML y Pages y Word no lo abren.
   */
  async function descargarWord() {
    setDescargando(true)
    try {
      const res = await fetch('/api/politica', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      descargarBlob(`${nombreArchivo}.docx`, await res.blob())
      if (correoValido && !avisado) avisarAlEquipo()
    } catch {
      setError('No pudimos generar el Word. Puedes descargarlo en texto o imprimirlo.')
    } finally {
      setDescargando(false)
    }
  }

  /**
   * Avisa al equipo en segundo plano. Nunca bloquea ni demora la descarga: si
   * el aviso falla, la persona igual se lleva su documento.
   */
  function avisarAlEquipo() {
    setAvisado(true)
    void fetch('/api/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: datos.representanteLegal.trim() || datos.razonSocial.trim() || 'Sin nombre',
        email: correo.trim(),
        empresa: datos.razonSocial.trim() || undefined,
        mensaje:
          `[Generó la Política de SG-SST] ${datos.razonSocial || 'Empresa sin nombre'} · ` +
          `${TAMANO_OPTIONS.find((o) => o.value === datos.tamano)?.label} · ` +
          `clase de riesgo ${datos.claseRiesgo} · ${datos.ciudad || 'ciudad sin indicar'}`,
      }),
    }).catch(() => {})
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
      {/* ── Formulario ── */}
      <div className="print:hidden">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-1 text-lg font-bold text-neutral-900">Datos de tu empresa</h2>
          <p className="mb-5 text-sm text-neutral-600">
            El documento se arma mientras escribes. Nada se envía, salvo que dejes tu correo abajo.
          </p>

          <div className="space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-neutral-800">Razón social</span>
              <input
                className={CAMPO}
                value={datos.razonSocial}
                onChange={(e) => set('razonSocial', e.target.value)}
                placeholder="Ferretería Los Andes S.A.S."
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-neutral-800">NIT</span>
                <input
                  className={CAMPO}
                  value={datos.nit}
                  onChange={(e) => set('nit', e.target.value)}
                  placeholder="900.123.456-7"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-neutral-800">Ciudad</span>
                <input
                  className={CAMPO}
                  value={datos.ciudad}
                  onChange={(e) => set('ciudad', e.target.value)}
                  placeholder="Bogotá"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-neutral-800">
                Actividad económica
              </span>
              <input
                className={CAMPO}
                value={datos.actividad}
                onChange={(e) => set('actividad', e.target.value)}
                placeholder="comercio al por menor de materiales de construcción"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-neutral-800">
                Representante legal
              </span>
              <input
                className={CAMPO}
                value={datos.representanteLegal}
                onChange={(e) => set('representanteLegal', e.target.value)}
                placeholder="Carolina Pérez"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-neutral-800">
                Número de trabajadores
              </span>
              <select
                className={CAMPO}
                value={datos.tamano}
                onChange={(e) => set('tamano', e.target.value as DatosEmpresa['tamano'])}
              >
                {TAMANO_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <span className="mt-1 block text-xs text-neutral-500">
                Define si la política se comunica al Vigía o al COPASST.
              </span>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-neutral-800">
                Clase de riesgo ante la ARL
              </span>
              <select
                className={CAMPO}
                value={datos.claseRiesgo}
                onChange={(e) => set('claseRiesgo', e.target.value as DatosEmpresa['claseRiesgo'])}
              >
                {RIESGO_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-6 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
            <label className="block">
              <span className="mb-1 flex items-start gap-1.5 text-sm font-medium text-neutral-800">
                <Mail size={15} className="mt-0.5 shrink-0 text-accent" />
                <span>
                  ¿Quieres que un asesor la revise contigo?{' '}
                  <span className="font-normal text-neutral-400">(opcional)</span>
                </span>
              </span>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                className={CAMPO}
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="tucorreo@empresa.com"
              />
            </label>
            <p className="mt-1.5 text-xs text-neutral-500">
              {avisado
                ? '✓ Listo, el equipo ya tiene tus datos para escribirte.'
                : correo && !correoValido
                  ? 'Revisa el correo: parece incompleto.'
                  : 'Solo lo usamos para escribirte sobre tu documento.'}
            </p>
          </div>

          <div className="mt-4 space-y-2">
            <Button onClick={descargarWord} className="w-full" icon={<Download size={18} />}>
              {descargando ? 'Generando…' : 'Descargar en Word'}
            </Button>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {faltantes.length > 0 && (
              <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
                Falta {faltantes.join(', ')}. Si descargas así, el documento sale con esos
                espacios entre corchetes para que los completes a mano.
              </p>
            )}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  descargarBlob(
                    `${nombreArchivo}.txt`,
                    new Blob([politicaComoTexto(doc)], { type: 'text/plain;charset=utf-8' }),
                  )
                }
                icon={<FileText size={16} />}
              >
                Texto
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.print()}
                icon={<Printer size={16} />}
              >
                Imprimir
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-primary-lighter p-4 text-sm text-neutral-700">
          <p className="mb-3">
            La política es uno de los documentos del SG-SST. Si necesitas el sistema completo,
            te acompañamos.
          </p>
          <Button
            variant="whatsapp"
            size="sm"
            href={whatsappLink(
              'Hola, generé el borrador de la política de SG-SST en la página y quiero ayuda con el sistema completo.',
            )}
            external
            icon={<MessageCircle size={16} />}
          >
            Hablar por WhatsApp
          </Button>
        </div>
      </div>

      {/* ── Vista previa ── */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-10 print:border-0 print:shadow-none">
        <h2 className="mb-6 border-b border-neutral-200 pb-4 text-xl font-bold text-neutral-900">
          {doc.titulo}
        </h2>

        <dl className="mb-8 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
          {doc.encabezado.map((e) => (
            <div key={e.etiqueta} className="flex gap-2">
              <dt className="font-semibold text-neutral-800">{e.etiqueta}:</dt>
              <dd className="text-neutral-700">{e.valor}</dd>
            </div>
          ))}
        </dl>

        {doc.secciones.map((seccion) => (
          <section key={seccion.titulo} className="mb-7">
            <h3 className="mb-1 font-bold text-neutral-900">{seccion.titulo}</h3>
            <p className="mb-3 text-xs text-neutral-500 print:hidden">{seccion.fundamento}</p>
            {seccion.parrafos.map((parrafo, i) => (
              <p key={i} className="mb-2 text-sm leading-relaxed text-neutral-700">
                {parrafo}
              </p>
            ))}
          </section>
        ))}

        <div className="mb-8 whitespace-pre-line text-sm leading-relaxed text-neutral-700">
          {doc.firma.join('\n')}
        </div>

        <div className="rounded-xl bg-neutral-50 p-4 print:bg-white">
          <h3 className="mb-3 text-sm font-bold text-neutral-900">
            Qué exige la norma y dónde lo cumple este documento
          </h3>
          <ul className="space-y-2">
            {doc.cumplimiento.map((fila) => (
              <li key={fila.requisito} className="flex gap-2 text-xs text-neutral-700">
                <Check size={15} className="mt-0.5 shrink-0 text-green-600" />
                <span>
                  {fila.requisito}{' '}
                  <span className="text-neutral-500">
                    ({fila.articulo} → {fila.donde})
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-xs text-neutral-500">
          Borrador generado a partir del Decreto 1072 de 2015. Revísalo y fírmalo antes de
          adoptarlo. Ante dudas, escríbenos al {BUSINESS.phone}.
        </p>
      </div>
    </div>
  )
}
