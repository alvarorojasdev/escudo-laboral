/**
 * UVT vigente. Se actualiza cada año: la DIAN la fija en diciembre.
 * 2026: Resolución DIAN 000238 del 15 de diciembre de 2025.
 */
export const UVT = { anio: 2026, valor: 52_374 }

/**
 * Multa máxima por incumplir las normas de SST para una pequeña empresa, el
 * tope del público del sitio (Decreto 1072, art. 2.2.4.11.5, modificado por
 * el Decreto 2642 de 2022: artículo 13, inciso 2, de la Ley 1562).
 */
export const MULTA_MAXIMA_PYME_UVT = 526.26

/** La misma multa en millones de pesos de este año, redondeada hacia abajo. */
export const MULTA_MAXIMA_PYME_MILLONES = Math.floor((MULTA_MAXIMA_PYME_UVT * UVT.valor) / 1e6)

export const BUSINESS = {
  name: 'Escudo Laboral',
  /** Nombre de la asistente del chat. */
  assistant: 'Andrea',
  phone: '+57 319 7116220',
  phoneRaw: '573197116220',
  email: 'escudolaboral@gmail.com',
  whatsappUrl: 'https://wa.me/573197116220',
  location: 'Bogotá, Colombia',
  decree: 'Decreto 1072/2015',
  resolution: 'Resolución 0312/2019',
} as const

export function whatsappLink(message: string) {
  return `${BUSINESS.whatsappUrl}?text=${encodeURIComponent(message)}`
}

// Un mensaje por punto de entrada: además de sonar natural, permite saber
// desde qué parte de la web escribió cada persona.
export const WHATSAPP_MESSAGES = {
  general:
    'Hola, los contacto desde la página web. Quiero información sobre el SG-SST para mi empresa.',
  hero: 'Hola, vi la página y quiero saber cómo implementar el SG-SST en mi empresa. ¿Cómo empezamos?',
  asesoria:
    'Hola, quiero la asesoría gratuita sobre el SG-SST. Mi empresa es del sector ___ y tiene ___ empleados.',
  testimonios:
    'Hola, quiero que mi empresa también cumpla con el SG-SST. ¿Me dan más información?',
  dudaPlanes:
    'Hola, no tengo claro cuál plan me conviene para el SG-SST de mi empresa. ¿Me ayudan a elegir?',
  faq: 'Hola, me quedó una duda sobre el SG-SST que no vi resuelta en la página. ¿Me pueden ayudar?',
} as const

// Las anclas van con "/" adelante: las secciones solo existen en el home, así
// que desde /diagnostico o /blog hay que navegar primero y después scrollear.
/**
 * Herramientas gratis del sitio: el menú "Herramientas" y la sección de
 * la portada salen de esta lista, para que no se desincronicen.
 */
export const HERRAMIENTAS = [
  {
    label: 'Autoevaluación de estándares mínimos',
    corto: 'Autoevaluación',
    href: '/autoevaluacion',
    descripcion: 'Marca lo que tienes y mira exactamente qué te falta según la Resolución 0312.',
    icono: 'clipboard',
  },
  {
    label: 'Diagnóstico con IA',
    corto: 'Diagnóstico IA',
    href: '/diagnostico',
    descripcion: '5 preguntas y un resumen de tu nivel de riesgo en segundos.',
    icono: 'sparkles',
  },
  {
    label: 'Política de SG-SST',
    corto: 'Política SG-SST',
    href: '/politica-sst',
    descripcion: 'Genérala en Word con los datos de tu empresa, lista para firmar.',
    icono: 'file-signature',
  },
  {
    label: 'Plantillas en Word',
    corto: 'Plantillas',
    href: '/plantillas',
    descripcion: 'Plan anual prellenado, acta del COPASST y matriz de peligros GTC-45.',
    icono: 'files',
  },
  {
    label: 'Calendario de obligaciones',
    corto: 'Calendario',
    href: '/calendario-sst',
    descripcion: 'Qué toca cada mes y cada año, con recordatorios para tu celular.',
    icono: 'calendar',
  },
] as const

export const NAV_LINKS = [
  { label: 'Normativa', href: '/normativa' },
  { label: 'Beneficios', href: '/#beneficios' },
  { label: 'Cómo funciona', href: '/#como-funciona' },
  { label: 'Planes', href: '/#planes' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Blog', href: '/blog' },
] as const

export const BENEFITS = [
  {
    title: 'Protección Integral',
    description:
      'Medidas efectivas para la seguridad y salud de tus trabajadores, reduciendo riesgos y accidentes laborales.',
    detail:
      'Matriz de peligros, controles operativos y seguimiento continuo adaptados al riesgo real de tu actividad.',
    icon: 'shield' as const,
  },
  {
    title: 'Documentación Legal',
    description:
      'Gestión y actualización de todos los documentos del SG-SST conforme a la normativa vigente.',
    detail: 'Políticas, procedimientos y registros listos para auditoría en cualquier momento.',
    icon: 'file-text' as const,
  },
  {
    title: 'Asesoría Personalizada',
    description:
      'Te acompañamos en todo el proceso de implementación y seguimiento adaptado a tu empresa.',
    detail: 'Un mismo asesor de punta a punta, sin pasar de mano en mano.',
    icon: 'handshake' as const,
  },
  {
    title: 'Cumplimiento Garantizado',
    description:
      'Cumple con el Decreto 1072/2015 y la Resolución 0312/2019 sin multas ni sanciones.',
    detail: 'Revisamos cambios normativos por ti y actualizamos lo que haga falta.',
    icon: 'check-circle' as const,
  },
] as const

export const STEPS = [
  {
    number: 1,
    title: 'Diagnóstico Inicial',
    description:
      'Evaluamos el estado actual de tu empresa frente a la normativa SST e identificamos brechas de cumplimiento.',
  },
  {
    number: 2,
    title: 'Plan de Trabajo',
    description:
      'Diseñamos un plan personalizado de implementación con cronograma, responsables y entregables claros.',
  },
  {
    number: 3,
    title: 'Implementación',
    description:
      'Ejecutamos toda la documentación, matrices de riesgo, políticas y procesos requeridos por la ley.',
  },
  {
    number: 4,
    title: 'Seguimiento',
    description:
      'Acompañamiento continuo, actualizaciones normativas y preparación para auditorías e inspecciones.',
  },
] as const

export const TESTIMONIALS = [
  {
    name: 'Carlos Ramírez',
    role: 'Gerente',
    company: 'Distribuciones R&R',
    quote:
      'Implementaron nuestro SG-SST en menos de 6 semanas. El proceso fue claro, organizado y sin complicaciones. Ahora estamos tranquilos con la normativa.',
    initials: 'CR',
  },
  {
    name: 'Ana María López',
    role: 'Directora RRHH',
    company: 'Clínica Dental Sonreír',
    quote:
      'Excelente servicio. Nos evitaron una multa por incumplimiento con la ARL. Son muy profesionales y siempre están disponibles. 100% recomendados.',
    initials: 'AL',
  },
  {
    name: 'Roberto Díaz',
    role: 'Propietario',
    company: 'Taller Mecánico Díaz',
    quote:
      'Como pequeña empresa no sabíamos por dónde empezar con el SG-SST. Ellos nos guiaron paso a paso y ahora cumplimos con toda la normativa.',
    initials: 'RD',
  },
  {
    name: 'Patricia Herrera',
    role: 'Administradora',
    company: 'Restaurante La Casona',
    quote:
      'El plan de mantenimiento mensual nos da mucha tranquilidad. Siempre estamos al día con los cambios en la normativa y las capacitaciones.',
    initials: 'PH',
  },
] as const

export const PRICING = {
  implementation: {
    name: 'Implementación SG-SST',
    price: '690.000',
    currency: 'COP',
    period: 'pago único',
    description: 'Todo lo que necesitas para cumplir con la normativa desde cero.',
    features: [
      'Diagnóstico inicial completo',
      'Documentación legal requerida',
      'Matrices de riesgo y peligros',
      'Política y objetivos SST',
      'Plan de trabajo anual',
      'Capacitación inicial del equipo',
    ],
    cta: 'Comenzar implementación',
    popular: false,
  },
  maintenance: {
    name: 'Mantenimiento Mensual',
    price: '249.000',
    currency: 'COP',
    period: 'por mes',
    description: 'Mantén tu SG-SST actualizado y en cumplimiento permanente.',
    features: [
      'Actualización normativa continua',
      'Indicadores de gestión SST',
      'Capacitaciones periódicas',
      'Soporte prioritario',
      'Preparación para auditorías',
      'Informes mensuales de gestión',
    ],
    cta: 'Suscribirme al plan',
    popular: true,
  },
} as const

export const FAQ_ITEMS = [
  {
    question: '¿Es obligatorio implementar el SG-SST?',
    answer:
      'Sí. Según el Decreto 1072 de 2015, toda empresa en Colombia, sin importar su tamaño o nivel de riesgo, debe contar con un Sistema de Gestión de Seguridad y Salud en el Trabajo. El incumplimiento se multa en UVT según el tamaño de la empresa: para una microempresa, de 26,31 a 131,57 UVT, y para una pequeña, de 157,88 a 526,26 UVT (Decreto 1072, artículo 2.2.4.11.5, modificado por el Decreto 2642 de 2022).',
  },
  {
    question: '¿Cuánto tiempo toma implementar un SG-SST?',
    answer:
      'Para micro y pequeñas empresas, la implementación completa suele tomar entre 4 y 6 semanas. Esto incluye el diagnóstico, la documentación, las matrices de riesgo y la capacitación inicial del equipo.',
  },
  {
    question: '¿Qué ventajas trae implementar el SG-SST?',
    answer:
      'Además de cumplir con la ley y evitar sanciones, un SG-SST bien implementado mejora la seguridad de tus trabajadores, reduce accidentes laborales, mejora el clima organizacional y puede reducir las tarifas de la ARL.',
  },
  {
    question: '¿Ofrecen capacitación para el personal?',
    answer:
      'Sí. Tanto en el plan de implementación como en el de mantenimiento incluimos programas de formación y capacitación adaptados a los diferentes roles y niveles de riesgo de tu empresa.',
  },
  {
    question: '¿Cuál es el costo del servicio?',
    answer:
      'Nuestro plan de implementación tiene un costo desde $690.000 COP (pago único) y el plan de mantenimiento mensual desde $249.000 COP/mes. Contáctanos por WhatsApp para una cotización personalizada según el tamaño de tu empresa.',
  },
] as const
