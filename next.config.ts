import type { NextConfig } from "next";

/**
 * Cabeceras de seguridad para todo el sitio. Vercel ya agrega HSTS; estas son
 * las que faltaban.
 *
 * No se incluye una Content-Security-Policy estricta a propósito: el chat, las
 * animaciones y los estilos en línea la volverían frágil, y una CSP mal hecha
 * rompe la página en silencio. `frame-ancestors` sí va, porque es lo que impide
 * que otro sitio meta este dentro de un iframe y haga pasar el formulario como
 * propio.
 */
const CABECERAS_DE_SEGURIDAD = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: '/:path*', headers: CABECERAS_DE_SEGURIDAD }];
  },
};

export default nextConfig;
