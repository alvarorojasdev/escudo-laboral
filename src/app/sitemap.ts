import type { MetadataRoute } from 'next'
import { NORMAS } from '@/lib/normativa/normas'
import { GUIAS } from '@/lib/blog/guias'

/**
 * Sin sitemap, Google descubre las páginas solo siguiendo enlaces y tarda. Con
 * doce páginas de normativa recién publicadas, conviene declararlas.
 */
const SITIO = 'https://escudo-laboral.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const fijas = [
    '',
    '/diagnostico',
    '/autoevaluacion',
    '/calendario-sst',
    '/plantillas',
    '/politica-sst',
    '/normativa',
    '/blog',
  ].map((ruta) => ({
    url: `${SITIO}${ruta}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: ruta === '' ? 1 : 0.8,
  }))

  const normas = NORMAS.map((n) => ({
    url: `${SITIO}/normativa/${n.slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }))

  const guias = GUIAS.map((g) => ({
    url: `${SITIO}/blog/${g.slug}`,
    lastModified: new Date(g.publicada),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }))

  return [...fijas, ...normas, ...guias]
}
