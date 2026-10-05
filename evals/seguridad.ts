/**
 * Chequeos de seguridad que no necesitan servidor ni API.
 *
 * Uso: npm run evals:seguridad
 */
import { getClientIp } from '../src/lib/peticiones'

function pedido(cabeceras: Record<string, string>): Request {
  return new Request('https://escudo-laboral.vercel.app/api/chat', { headers: cabeceras })
}

const CASOS: { nombre: string; cabeceras: Record<string, string>; esperado: string }[] = [
  {
    // Según la documentación de Vercel, x-forwarded-for "could be overwritten if
    // you're using a proxy on top of Vercel"; x-vercel-forwarded-for no. Si algún
    // día se pone Cloudflare adelante, esta es la que sigue diciendo la verdad.
    nombre: 'prefiere la cabecera de Vercel aunque x-forwarded-for diga otra cosa',
    cabeceras: { 'x-forwarded-for': '9.9.9.9', 'x-vercel-forwarded-for': '200.1.1.1' },
    esperado: '200.1.1.1',
  },
  {
    nombre: 'usa x-real-ip si falta la de Vercel',
    cabeceras: { 'x-forwarded-for': '9.9.9.9', 'x-real-ip': '200.1.1.1' },
    esperado: '200.1.1.1',
  },
  {
    nombre: 'cae a x-forwarded-for si no hay otra',
    cabeceras: { 'x-forwarded-for': '200.1.1.1, 10.0.0.1' },
    esperado: '200.1.1.1',
  },
  {
    nombre: 'sin ninguna cabecera no revienta',
    cabeceras: {},
    esperado: 'unknown',
  },
]

let fallos = 0
for (const caso of CASOS) {
  const obtenido = getClientIp(pedido(caso.cabeceras))
  const bien = obtenido === caso.esperado
  if (!bien) fallos++
  console.log(`${bien ? '✓' : '✗'} ${caso.nombre}`)
  if (!bien) console.log(`    esperaba ${caso.esperado}, obtuvo ${obtenido}`)
}

console.log(`\n${CASOS.length - fallos}/${CASOS.length} chequeos de identificación del visitante`)
if (fallos) process.exit(1)
