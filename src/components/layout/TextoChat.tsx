import { Fragment } from 'react'

/**
 * El modelo responde en markdown. Se interpreta lo mínimo que usa —negrita,
 * viñetas y saltos de línea— construyendo elementos de React, sin inyectar HTML:
 * así el texto del modelo nunca se interpreta como marcado peligroso.
 */

function conNegritas(texto: string) {
  return texto.split(/\*\*(.+?)\*\*/g).map((parte, i) =>
    i % 2 === 1 ? <strong key={i}>{parte}</strong> : <Fragment key={i}>{parte}</Fragment>,
  )
}

const ES_VIÑETA = /^\s*[-*•]\s+/

export function TextoChat({ texto }: { texto: string }) {
  const lineas = texto.split('\n')
  const bloques: React.ReactNode[] = []
  let viñetas: string[] = []

  const cerrarLista = () => {
    if (viñetas.length === 0) return
    bloques.push(
      <ul key={`lista-${bloques.length}`} className="list-disc space-y-1 pl-4">
        {viñetas.map((v, i) => (
          <li key={i}>{conNegritas(v)}</li>
        ))}
      </ul>,
    )
    viñetas = []
  }

  for (const linea of lineas) {
    if (ES_VIÑETA.test(linea)) {
      viñetas.push(linea.replace(ES_VIÑETA, ''))
      continue
    }
    cerrarLista()
    if (linea.trim()) {
      bloques.push(<p key={`p-${bloques.length}`}>{conNegritas(linea)}</p>)
    }
  }
  cerrarLista()

  return <div className="space-y-2">{bloques}</div>
}
