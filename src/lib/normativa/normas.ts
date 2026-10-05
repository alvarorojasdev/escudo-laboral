import { CORPUS } from './buscar'
import type { ArticuloNormativo } from './tipos'

/**
 * Metadatos de cada norma para publicarla como contenido del sitio.
 *
 * El corpus ya tiene 258.000 caracteres de texto legal verificado contra fuente
 * oficial. Publicarlo es contenido real y citable, sin pedirle a un modelo que
 * escriba sobre leyes: en este tema, un texto generado que se equivoca en una
 * cifra es peor que no tener contenido.
 *
 * `deroga` y `advertencia` son lo que hace distinto a este sitio: buena parte de
 * internet sigue explicando normas derogadas, y acá se dice cuál murió y qué
 * dato cambió.
 */
export interface FichaNorma {
  /** Nombre tal como debe citarse; coincide con `norma` en el corpus. */
  nombre: string
  slug: string
  /** Una línea para el índice y la metadescripción. */
  resumen: string
  /** Normas que esta derogó, con el dato que cambió. */
  deroga?: { norma: string; cambio: string }[]
  /** Reserva verificada sobre su vigencia, si la hay. */
  advertencia?: string
}

export function slugDeNorma(nombre: string): string {
  return nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\(|\)/g, '')
    .replace(/\s+de\s+/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const FICHAS: Omit<FichaNorma, 'slug'>[] = [
  {
    nombre: 'Decreto 1072 de 2015',
    resumen:
      'El reglamento del SG-SST: qué tiene que hacer un empleador, qué documentos conservar y por cuánto tiempo.',
  },
  {
    nombre: 'Resolución 0312 de 2019',
    resumen:
      'Los Estándares Mínimos que le aplican a tu empresa según cuántos trabajadores tenga y su clase de riesgo.',
  },
  {
    nombre: 'Resolución 4272 de 2021',
    resumen:
      'Trabajo en alturas: desde qué altura aplica, qué capacitación exige y cada cuánto se renueva.',
    deroga: [
      {
        norma: 'Resolución 1409 de 2012',
        cambio:
          'El trabajo en alturas dejó de contarse desde 1,50 m y hoy se define a partir de una caída mayor a 2,0 metros. El reentrenamiento pasó de anual a cada 18 meses.',
      },
    ],
  },
  {
    nombre: 'Resolución 3461 de 2025',
    resumen:
      'Comité de Convivencia Laboral: cuántos miembros lleva, cada cuánto se reúne y cómo se tramita una queja.',
    deroga: [
      {
        norma: 'Resolución 652 de 2012 y Resolución 1356 de 2012',
        cambio:
          'Las reuniones ordinarias volvieron a ser mensuales (la Resolución 1356 las había pasado a trimestrales), el comité por cada centro de trabajo dejó de ser voluntario y pasó a obligatorio, y el impedimento por haber presentado una queja pasó de seis meses al año anterior.',
      },
    ],
    advertencia:
      'Existe una demanda de nulidad admitida ante el Consejo de Estado contra esta resolución. No se encontró medida cautelar que la suspenda, y el Ministerio del Trabajo la seguía aplicando en sus conceptos de 2026, así que rige; conviene reverificarla antes de tomar decisiones.',
  },
  {
    nombre: 'Ley 1562 de 2012',
    resumen:
      'Qué es un accidente de trabajo y una enfermedad laboral, cuánto se cotiza a la ARL y qué multas hay.',
  },
  {
    nombre: 'Ley 776 de 2002',
    resumen:
      'Cuánto se paga por una incapacidad, una indemnización, una pensión de invalidez o el auxilio funerario.',
  },
  {
    nombre: 'Decreto 1295 de 1994',
    resumen:
      'La base del Sistema General de Riesgos Laborales: afiliación obligatoria, clases de riesgo y sanciones.',
  },
  {
    nombre: 'Ley 1010 de 2006',
    resumen:
      'Acoso laboral: qué conductas lo constituyen, cuáles no, y qué puede hacer una empresa al respecto.',
  },
  {
    nombre: 'Resolución 2013 de 1986',
    resumen:
      'COPASST y vigía: cuándo corresponde cada uno, cuántos representantes lleva y cada cuánto se reúne.',
  },
  {
    nombre: 'Resolución 1401 de 2007',
    resumen:
      'Investigación de accidentes e incidentes: quién investiga, en cuánto tiempo y qué debe llevar el informe.',
  },
  {
    nombre: 'Resolución 2400 de 1979',
    resumen:
      'Condiciones del lugar de trabajo: baños, agua potable, pasillos, salidas de emergencia y elementos de protección.',
  },
  {
    nombre: 'GTC-45 (2012)',
    resumen:
      'La guía para armar la matriz de peligros: cómo se calcula el nivel de riesgo y cuándo es aceptable.',
  },
]

export const NORMAS: FichaNorma[] = FICHAS.map((f) => ({ ...f, slug: slugDeNorma(f.nombre) }))

export function normaPorSlug(slug: string): FichaNorma | undefined {
  return NORMAS.find((n) => n.slug === slug)
}

export function articulosDeNorma(nombre: string): ArticuloNormativo[] {
  return CORPUS.filter((a) => a.norma === nombre)
}
