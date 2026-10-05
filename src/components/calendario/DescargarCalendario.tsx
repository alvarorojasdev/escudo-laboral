'use client'

import { CalendarPlus } from 'lucide-react'
import { archivoIcs } from '@/lib/calendario'

/** Descarga los recordatorios para Google Calendar, Outlook o el iPhone. */
export function DescargarCalendario() {
  function descargar() {
    const url = URL.createObjectURL(
      new Blob([archivoIcs()], { type: 'text/calendar;charset=utf-8' }),
    )
    const enlace = document.createElement('a')
    enlace.href = url
    enlace.download = 'calendario-sg-sst.ics'
    enlace.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={descargar}
      className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-hover"
    >
      <CalendarPlus className="h-5 w-5" />
      Agregar a mi calendario
    </button>
  )
}
