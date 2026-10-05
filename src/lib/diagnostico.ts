export interface DiagnosticoInput {
  employees: '1-10' | '11-50' | '51+'
  sector: 'comercio' | 'servicios' | 'industria' | 'construccion' | 'otro'
  currentStatus: 'nada' | 'desactualizado' | 'avanzado'
  hadIncident: 'si' | 'no' | 'no-sabe'
  urgency: 'auditoria' | 'prevenir' | 'averiguando'
}

export interface DiagnosticoResult {
  riskLevel: 'bajo' | 'medio' | 'alto'
  summary: string
  gaps: string[]
  recommendation: string
}

export const EMPLOYEES_OPTIONS = [
  { value: '1-10', label: '1 a 10 empleados' },
  { value: '11-50', label: '11 a 50 empleados' },
  { value: '51+', label: 'Más de 50 empleados' },
] as const

export const SECTOR_OPTIONS = [
  { value: 'comercio', label: 'Comercio' },
  { value: 'servicios', label: 'Servicios' },
  { value: 'industria', label: 'Industria o manufactura' },
  { value: 'construccion', label: 'Construcción' },
  { value: 'otro', label: 'Otro' },
] as const

export const STATUS_OPTIONS = [
  { value: 'nada', label: 'No tengo nada implementado' },
  { value: 'desactualizado', label: 'Tengo algo, pero desactualizado' },
  { value: 'avanzado', label: 'Tengo bastante armado' },
] as const

export const INCIDENT_OPTIONS = [
  { value: 'si', label: 'Sí, tuvimos un accidente o visita' },
  { value: 'no', label: 'No, nunca' },
  { value: 'no-sabe', label: 'No estoy seguro' },
] as const

export const URGENCY_OPTIONS = [
  { value: 'auditoria', label: 'Es urgente, tengo una auditoría pronto' },
  { value: 'prevenir', label: 'Quiero prevenir antes de que sea un problema' },
  { value: 'averiguando', label: 'Por ahora solo estoy averiguando' },
] as const
