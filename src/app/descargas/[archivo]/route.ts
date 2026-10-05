import { PLANTILLAS, generarPlantilla } from '@/lib/documentos/plantillas'

// Las plantillas se arman al compilar: cada descarga es un archivo estático y
// cualquier otro nombre da 404 sin ejecutar nada.
export const dynamicParams = false

export function generateStaticParams() {
  return PLANTILLAS.map((p) => ({ archivo: p.archivo }))
}

export async function GET(_req: Request, { params }: { params: Promise<{ archivo: string }> }) {
  const { archivo } = await params
  const plantilla = PLANTILLAS.find((p) => p.archivo === archivo)
  if (!plantilla) return new Response('No encontrada', { status: 404 })

  const buffer = await generarPlantilla(plantilla.id)
  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="${plantilla.archivo}"`,
    },
  })
}
