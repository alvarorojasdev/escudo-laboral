import { CalendarDays, ClipboardCheck, Files, FileSignature, Sparkles } from 'lucide-react'
import type { HERRAMIENTAS } from '@/lib/constants'

const ICONOS = {
  clipboard: ClipboardCheck,
  sparkles: Sparkles,
  'file-signature': FileSignature,
  files: Files,
  calendar: CalendarDays,
} as const

export function IconoHerramienta({
  icono,
  className,
}: {
  icono: (typeof HERRAMIENTAS)[number]['icono']
  className?: string
}) {
  const Icono = ICONOS[icono]
  return <Icono className={className} aria-hidden />
}
