import type OpenAI from 'openai'
import { BUSINESS, WHATSAPP_MESSAGES, whatsappLink } from '@/lib/constants'
import { buscarArticulos, clavesDeRespaldo, formatearParaPrompt } from '@/lib/normativa/buscar'
import { sendLeadEmail } from '@/lib/email'

export const HERRAMIENTAS: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'buscar_normativa',
      description:
        'Busca artículos de la normativa colombiana de SG-SST. Úsala SIEMPRE antes de afirmar plazos, cifras, obligaciones o números de artículo.',
      parameters: {
        type: 'object',
        properties: {
          consulta: {
            type: 'string',
            description:
              'Términos del tema a buscar, en español y sin signos de pregunta. Ej: "plazo reportar accidente ARL" o "estandares minimos 10 trabajadores".',
          },
        },
        required: ['consulta'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'guardar_contacto',
      description:
        'Guarda los datos de una persona interesada y avisa al equipo. Úsala solo cuando la persona haya dado su nombre y su email y quiera que la contacten.',
      parameters: {
        type: 'object',
        properties: {
          nombre: { type: 'string', description: 'Nombre de la persona' },
          email: { type: 'string', description: 'Correo electrónico' },
          telefono: { type: 'string', description: 'Teléfono, si lo dio' },
          empresa: { type: 'string', description: 'Nombre de la empresa, si lo dio' },
          resumen: {
            type: 'string',
            description: 'Resumen en una o dos frases de qué necesita, según la conversación.',
          },
        },
        required: ['nombre', 'email', 'resumen'],
      },
    },
  },
]

type Args = Record<string, unknown>

const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const texto = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : undefined)

/** Primer correo válido que aparezca en lo que escribió la persona. */
/**
 * Palabras que sí pueden ir pegadas delante de un correo sin que eso signifique
 * que la dirección quedó partida ("mi correo es juan@x.com", "escríbeme a…").
 */
const ANTES_DEL_CORREO = new Set([
  'es', 'correo', 'mail', 'email', 'e-mail', 'a', 'al', 'the', 'usar',
  'seria', 'sería', 'era', 'mi', 'el', 'este', 'esta', 'ahi', 'ahí', 'y',
])

export function emailEnConversacion(mensajes: { role: string; content: string }[]) {
  for (const m of mensajes) {
    if (m.role !== 'user') continue
    const palabras = m.content.split(/\s+/)
    for (let i = 0; i < palabras.length; i++) {
      const limpio = palabras[i].replace(/[.,;:()<>"']+$/, '')
      if (!EMAIL_VALIDO.test(limpio)) continue

      // Si justo antes hay una palabra que no es conector, lo más probable es
      // que la persona haya partido su dirección con un espacio: de
      // "mi correo es marta gomez@gmail.com" salía "gomez@gmail.com", y el
      // equipo terminaba escribiéndole a una dirección que no existe. En ese
      // caso no se adivina: se devuelve nada y el asistente lo vuelve a pedir.
      //
      // Lo que separa ese caso de "alvaro alvarorojasprueba@gmail.com" —donde la
      // dirección SÍ está completa y la palabra previa es el nombre repetido— es
      // que ahí la parte local empieza con esa palabra. En "marta gomez@..." no.
      const previaCruda = palabras[i - 1] ?? ''
      // Una coma o un punto y coma antes del correo son separadores de una
      // lista de datos ("Andrés Silva, andres@taller.co, 310…"), no una
      // dirección partida al medio.
      const haySeparador = /[,;:|]$/.test(previaCruda)
      const previa = previaCruda.replace(/[.,;:()<>"']+$/, '').toLowerCase()
      const local = limpio.slice(0, limpio.indexOf('@')).toLowerCase()
      const esNombreRepetido = previa ? local.startsWith(previa) : false
      if (
        previa &&
        !haySeparador &&
        /^[a-záéíóúñ]+$/i.test(previa) &&
        !ANTES_DEL_CORREO.has(previa) &&
        !esNombreRepetido
      ) {
        return undefined
      }
      return limpio
    }
  }
  return undefined
}

/**
 * Prefijo de las respuestas de `guardar_contacto` que SÍ guardaron. Es una
 * constante para que el examen pueda distinguir un guardado real de un "no
 * pude" sin depender de que el texto no cambie.
 */
export const CONTACTO_GUARDADO = 'Contacto guardado'

export async function ejecutarHerramienta(
  nombre: string,
  args: Args,
  /** Se registran acá los artículos servidos, para validar después las citas. */
  registrarArticulos: (referencias: string[]) => void = () => {},
  /** Correo detectado en la conversación, por si el modelo pasa uno erróneo. */
  emailDeRespaldo?: string,
  /** En modo prueba se simula el guardado: los exámenes no deben mandar correos. */
  simular = false,
): Promise<string> {
  if (nombre === 'buscar_normativa') {
    const consulta = texto(args.consulta) ?? ''
    const encontrados = buscarArticulos(consulta, 3)
    if (encontrados.length === 0) {
      return 'Sin resultados en el corpus. No inventes una referencia: explica el concepto en general y ofrece la asesoría.'
    }
    registrarArticulos(clavesDeRespaldo(encontrados))
    if (simular) {
      console.log(
        '[modo prueba] buscar_normativa:',
        JSON.stringify(consulta),
        '→',
        encontrados.map((a) => `${a.norma} ${a.articulo}`).join(' | '),
      )
    }
    return formatearParaPrompt(encontrados, consulta)
  }

  if (nombre === 'guardar_contacto') {
    const nombreLead = texto(args.nombre)
    const propuesto = texto(args.email)

    // Si el modelo pasa algo que no es un correo —caso real: confundió el
    // nombre con el correo porque se parecían—, se usa el que la persona
    // efectivamente escribió en la conversación.
    const email =
      propuesto && EMAIL_VALIDO.test(propuesto) ? propuesto : emailDeRespaldo

    if (!nombreLead || !email) {
      return 'Falta el nombre o un correo válido. Pídeselo a la persona (el correo es el dato que lleva @) y vuelve a intentar.'
    }

    if (simular) {
      console.log('[modo prueba] contacto NO enviado:', nombreLead, email)
      return `${CONTACTO_GUARDADO} (modo prueba). Confirma a la persona que el equipo la va a contactar.`
    }

    try {
      await sendLeadEmail({
        nombre: nombreLead,
        email,
        telefono: texto(args.telefono),
        empresa: texto(args.empresa),
        mensaje: `[Lead capturado desde el chat] ${texto(args.resumen) ?? ''}`,
      })
      return `${CONTACTO_GUARDADO}. Confirma a la persona que el equipo la va a contactar y ofrece también el WhatsApp ${BUSINESS.phone}.`
    } catch (error) {
      console.error('No se pudo guardar el contacto desde el chat:', error)
      return `No se pudo guardar. Pide disculpas y deriva a WhatsApp: ${whatsappLink(WHATSAPP_MESSAGES.general)}`
    }
  }

  return `Herramienta desconocida: ${nombre}`
}
