import type { ArticuloNormativo } from './tipos'

const NORMA = 'Decreto 1072 de 2015'

// Tramos por trabajadores de la misma tabla (artículo 2 de la Ley 590 de 2000).
const TAMANOS: [maximo: number, tamano: string][] = [
  [10, 'microempresa'],
  [50, 'pequeña empresa'],
  [200, 'mediana empresa'],
  [Infinity, 'gran empresa'],
]

/**
 * Ubica la empresa en la tabla según los trabajadores que nombra la pregunta.
 * El modelo leía "300 trabajadores" y respondía con la fila de la mediana
 * teniendo la tabla entera a la vista; una comparación de números no se le
 * deja a él.
 */
function tamanoSegunConsulta(consulta: string): string | null {
  // "300 empleados" o, como también busca el modelo, "trabajadores 80".
  const m =
    consulta.match(/(\d+)\s*(?:trabajador|empleado|persona|colaborador)/i) ??
    consulta.match(/(?:trabajador|empleado|persona|colaborador)e?s?\s+(\d+)/i)
  if (!m) return null
  const trabajadores = Number(m[1])
  const tamano = TAMANOS.find(([maximo]) => trabajadores <= maximo)![1]
  return `[Dato calculado a partir de la pregunta: con ${trabajadores} trabajadores es ${tamano} en esta tabla. Da solo esa fila. Si los activos de la empresa la ubican en otro tamaño, prevalecen los activos.]`
}

/**
 * Decreto 1072 de 2015, Libro 2, Parte 2, Título 4, Capítulo 11: graduación de
 * las multas por incumplimiento de las normas de riesgos laborales.
 *
 * Se carga solo el artículo 2.2.4.11.5 en la versión que fijó el artículo 21
 * del Decreto 2642 de 2022 (30 de diciembre de 2022). Ese decreto pasó las
 * multas de salarios mínimos a UVT, en cumplimiento del artículo 49 de la Ley
 * 1955 de 2019, que ordenó recalcular en UVT los cobros y sanciones fijados en
 * salarios mínimos. La Ley 1562 de 2012 sigue diciendo "hasta quinientos (500)"
 * y "hasta mil (1.000)" salarios mínimos: son los topes de la ley; lo que se
 * aplica según el tamaño de la empresa es esta tabla.
 *
 * Fuente: Gestor Normativo de Función Pública, Decreto 2642 de 2022
 * (norma.php?i=200584), sin anotaciones de derogación ni suspensión al
 * 1-oct-2026. Los rangos coinciden con los publicados por SafetYA.
 *
 * El texto oficial trae errores de tipeo en las cifras de la tabla ("131, 57",
 * "2,657.61", mezclando puntos y comas). Se normalizaron al formato colombiano
 * (punto de miles, coma decimal) sin cambiar ningún valor. La tabla se
 * transcribe fila por fila.
 */
export const DECRETO_1072_2015_CAP11: ArticuloNormativo[] = [
  {
    norma: NORMA,
    articulo: '2.2.4.11.5',
    titulo:
      'Criterio de proporcionalidad y razonabilidad para la cuantía de la sanción a los empleadores (modificado por el artículo 21 del Decreto 2642 de 2022: multas en UVT)',
    texto:
      'Se establecen los criterios de proporcionalidad y razonabilidad, conforme al tamaño de la empresa de acuerdo a lo prescrito en el artículo 2 de la Ley 590 de 2000, modificado por el artículo 2 de la Ley 905 de 2004 y el artículo 51 de la Ley 1111 de 2006 y conforme a lo establecido en los artículos 13 y 30 de la Ley 1562 de 2012 y con base en los siguientes parámetros. ' +
      'Microempresa (hasta 10 trabajadores; activos totales menores a 13.156,51 UVT): por incumplimiento de las normas de seguridad y salud en el trabajo (artículo 13, inciso 2, Ley 1562) de 26,31 hasta 131,57 UVT; por omisiones en los reportes de accidentes y enfermedades (artículo 30, Ley 1562) de 26,31 hasta 526,26 UVT; por accidente que ocasione la muerte del trabajador (artículo 13, inciso 4, Ley 1562) de 526,26 hasta 631,51 UVT. ' +
      'Pequeña empresa (de 11 a 50 trabajadores; activos de 13.182,82 a menos de 131.565,10 UVT): artículo 13, inciso 2, de 157,88 hasta 526,26 UVT; artículo 30, de 552,57 hasta 1.315,65 UVT; artículo 13, inciso 4, de 657,82 hasta 3.946,95 UVT. ' +
      'Mediana empresa (de 51 a 200 trabajadores; activos de 100.000 a 610.000 UVT): artículo 13, inciso 2, de 552,57 hasta 2.631,30 UVT; artículo 30, de 1.341,96 hasta 2.631,30 UVT; artículo 13, inciso 4, de 3.973,26 hasta 10.525,21 UVT. ' +
      'Gran empresa (de 201 trabajadores en adelante; activos de más de 610.000 UVT): artículo 13, inciso 2, de 2.657,61 hasta 13.156,51 UVT; artículo 30, de 2.657,61 hasta 26.313,01 UVT; artículo 13, inciso 4, de 10.551,52 hasta 26.313,02 UVT. ' +
      'En el evento en que no coincida el número de trabajadores con el valor total de los activos conforme a la tabla anterior, prevalecerá para la aplicación de la sanción el monto total de los activos conforme a los resultados de la vigencia inmediatamente anterior.',
    temas: [
      'cuanto es la multa por no tener el sg sst',
      'cuanto me pueden multar si no cumplo',
      'multa para una microempresa',
      'multa segun el numero de trabajadores',
      'multa para una empresa de menos de 10 trabajadores',
      'multas en uvt',
      'tabla de multas por tamano de empresa',
      'multa por no reportar un accidente',
      'multa por la muerte de un trabajador',
      'cuanto cobra el ministerio de multa',
      'sanciones por no implementar el sg sst',
      'sancion por incumplir las normas de seguridad y salud',
      'que sancion me ponen',
    ],
    sinRecorte: true,
    remiteA: ['Ley 1562 de 2012|13', 'Ley 1562 de 2012|30'],
    notaSegunConsulta: tamanoSegunConsulta,
  },
]
