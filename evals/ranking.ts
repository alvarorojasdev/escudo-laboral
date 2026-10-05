/**
 * Prueba de la búsqueda de normativa, sin llamar al modelo.
 *
 * Es instantánea y gratis, así que sirve para verificar cada cambio en la
 * puntuación. Exige que el artículo correcto aparezca entre los 3 primeros,
 * que es lo que termina llegando al prompt; si además queda primero, mejor.
 *
 * Por qué importa tanto: la búsqueda es el techo de la calidad. Si le entrega
 * al asistente el artículo equivocado, la respuesta sale mal por más bueno que
 * sea el modelo, y encima no hay forma de que se dé cuenta. Este examen se
 * puede correr mil veces al día sin gastar cupo, al revés que el banco de 106.
 *
 * Las consultas están escritas como las haría un dueño de pyme —sin tildes, en
 * minúscula, con el vocabulario de la calle— no en lenguaje legal.
 *
 * Uso: npm run evals:ranking
 */
import { buscarArticulos, formatearParaPrompt } from '../src/lib/normativa/buscar'

interface CasoRanking {
  consulta: string
  /**
   * Artículo que debe aparecer. Admite varios cuando más de uno responde
   * legítimamente la pregunta; en ese caso alcanza con que aparezca alguno.
   * Para mezclar normas se escribe `'Norma|articulo'`, p. ej. `'Ley 1562|3'`.
   */
  esperado: string | string[]
  /** Norma esperada, para distinguir artículos con el mismo número. */
  norma?: string
}

function normalizarTexto(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

const CASOS: CasoRanking[] = [
  // ── Resolución 0312 de 2019 — estándares mínimos según tamaño y riesgo
  { consulta: '¿qué dice el artículo 2.2.4.6.8?', esperado: '2.2.4.6.8' },
  { consulta: 'artículo 3 de la resolución 0312', esperado: '3', norma: 'Resolución 0312' },
  {
    consulta: 'cuántos estándares mínimos para 8 trabajadores de riesgo I',
    esperado: '3',
    norma: 'Resolución 0312',
  },
  {
    consulta: 'tengo 30 empleados cuantos estandares minimos me aplican',
    esperado: ['9', '10'],
    norma: 'Resolución 0312',
  },
  {
    consulta: 'somos 80 trabajadores que estandares nos aplican',
    esperado: ['16', '17'],
    norma: 'Resolución 0312',
  },
  {
    consulta: 'quien puede disenar el sg sst en mi empresa de 5 empleados',
    esperado: '4',
    norma: 'Resolución 0312',
  },
  {
    consulta: 'mi empresa es riesgo 5 y tenemos 8 empleados',
    esperado: '8',
    norma: 'Resolución 0312',
  },
  {
    consulta: 'que multa me ponen si no cumplo los estandares minimos',
    esperado: '36',
    norma: 'Resolución 0312',
  },
  {
    consulta: 'como se califica la autoevaluacion tabla de valores',
    esperado: '27',
    norma: 'Resolución 0312',
  },
  {
    consulta: 'que indicadores minimos tengo que reportar',
    esperado: '30',
    norma: 'Resolución 0312',
  },
  {
    consulta: 'tengo que hacer plan de mejoramiento si saco bajo puntaje',
    esperado: ['28', '29'],
    norma: 'Resolución 0312',
  },
  {
    consulta: 'soy una finca con 8 trabajadores que me aplica',
    esperado: '7',
    norma: 'Resolución 0312',
  },

  // ── Decreto 1072 de 2015 — el reglamento del SG-SST
  { consulta: 'cuales son mis obligaciones como empleador en el sg sst', esperado: '2.2.4.6.8' },
  { consulta: 'cuanto tiempo debo guardar los documentos del sg sst', esperado: '2.2.4.6.13' },
  {
    // Desde el Decreto 2642 de 2022 las multas se gradúan en UVT por tamaño de
    // empresa en este artículo; la Ley 1562 solo fija los topes en salarios.
    consulta: 'cuanto es la multa por no tener el sg sst en una microempresa',
    esperado: '2.2.4.11.5',
  },
  { consulta: 'cuanto me multan si no reporto un accidente', esperado: ['2.2.4.11.5', 'Ley 1562|30'] },
  // Búsquedas reales de Andrea (1-oct-2026): el tamaño dicho en número de
  // trabajadores, sin la palabra "micro" ni "pequeña".
  { consulta: 'multa SG-SST empresa menos de 10 trabajadores', esperado: '2.2.4.11.5' },
  { consulta: 'multa muerte trabajador empresa 300 empleados', esperado: '2.2.4.11.5' },
  { consulta: 'que documentos debo tener del sg sst', esperado: '2.2.4.6.12' },
  { consulta: 'cada cuánto debo investigar un accidente', esperado: '2.2.4.6.32' },
  { consulta: 'que es la matriz de peligros', esperado: '2.2.4.6.15' },
  { consulta: 'necesito plan de emergencias en mi empresa', esperado: '2.2.4.6.25' },
  { consulta: 'cada cuanto capacito a mis empleados en seguridad', esperado: '2.2.4.6.11' },
  {
    // El 2.2.4.6.5 también responde: exige que la política sea escrita,
    // firmada, fechada y comunicada. Pedir solo el 2.2.4.6.6 era un capricho.
    consulta: 'que debe tener la politica de seguridad y salud',
    esperado: ['2.2.4.6.5', '2.2.4.6.6'],
  },
  { consulta: 'tengo que hacer auditoria interna del sg sst', esperado: ['2.2.4.6.29', '2.2.4.6.30'] },
  { consulta: 'revision por la alta direccion cada cuanto', esperado: '2.2.4.6.31' },
  { consulta: 'que obligaciones tienen mis empleados en el sg sst', esperado: '2.2.4.6.10' },
  { consulta: 'en que me tiene que ayudar la arl', esperado: '2.2.4.6.9' },
  { consulta: 'el curso virtual de 50 horas es obligatorio', esperado: '2.2.4.6.35' },
  { consulta: 'que medidas de prevencion y control debo aplicar', esperado: '2.2.4.6.24' },
  {
    // Los artículos 14 y 19 de la 0312 ('Selección y evaluación de proveedores
    // y contratistas') responden la pregunta igual de bien que el 2.2.4.6.28
    // del Decreto: los tres dicen que sí entran. Exigir solo uno era un
    // capricho del examen, no un requisito de calidad.
    consulta: 'los contratistas entran en mi sg sst',
    esperado: ['Decreto 1072|2.2.4.6.28', 'Resolución 0312|14', 'Resolución 0312|19'],
  },
  { consulta: 'que pasa si compro maquinaria nueva gestion del cambio', esperado: '2.2.4.6.26' },

  // ── Resolución 1401 de 2007 — investigación de accidentes
  { consulta: 'quien debe investigar un accidente de trabajo', esperado: '7', norma: 'Resolución 1401' },
  {
    consulta: 'en cuanto tiempo debo investigar un accidente grave',
    esperado: '4',
    norma: 'Resolución 1401',
  },
  {
    consulta: 'que debe llevar el informe de investigacion de accidente',
    esperado: '9',
    norma: 'Resolución 1401',
  },

  // ── Ley 1562 de 2012 — definiciones y cotización
  { consulta: 'qué es un accidente de trabajo', esperado: '3', norma: 'Ley 1562' },
  { consulta: 'que es una enfermedad laboral', esperado: '4', norma: 'Ley 1562' },
  {
    // El artículo 62 del Decreto 1295 fija el mismo plazo de dos días hábiles:
    // citar cualquiera de los dos responde bien la pregunta.
    consulta: 'plazo para reportar un accidente a la ARL',
    esperado: ['Ley 1562|30', 'Decreto 1295|62'],
  },
  { consulta: 'cuanto se paga de arl porcentaje de cotizacion', esperado: '6', norma: 'Ley 1562' },
  {
    consulta: 'que pasa si no pago los aportes a riesgos laborales',
    esperado: '7',
    norma: 'Ley 1562',
  },
  {
    consulta: 'un accidente yendo para el trabajo cuenta como laboral',
    esperado: '3',
    norma: 'Ley 1562',
  },

  // ── GTC-45 — matriz de riesgos
  { consulta: 'cómo calculo el nivel de riesgo', esperado: '3.7', norma: 'GTC-45' },
  { consulta: 'que es el nivel de deficiencia', esperado: '3.3', norma: 'GTC-45' },
  { consulta: 'cuando un riesgo es aceptable', esperado: '3.8', norma: 'GTC-45' },
  {
    // La GTC-45 es una guía técnica; el artículo 2.2.4.6.24 del Decreto 1072
    // es norma de obligatorio cumplimiento y también fija el orden de los
    // controles con el EPP al final. Citar ese es igual de correcto, o mejor.
    consulta: 'puedo resolver un riesgo solo con elementos de proteccion',
    esperado: ['GTC-45|3.9', 'Decreto 1072|2.2.4.6.24'],
  },
  { consulta: 'que tipos de peligros existen', esperado: '3.1', norma: 'GTC-45' },

  // ── Resolución 2400 de 1979 — condiciones del lugar de trabajo
  { consulta: 'cuántos baños debo tener', esperado: '17', norma: 'Resolución 2400' },
  {
    consulta: 'quien paga los elementos de proteccion personal',
    esperado: '176',
    norma: 'Resolución 2400',
  },
  { consulta: 'tengo que dar agua potable a los trabajadores', esperado: ['23', '24'], norma: 'Resolución 2400' },
  { consulta: 'cuanto espacio debe tener cada trabajador', esperado: '9', norma: 'Resolución 2400' },
  { consulta: 'que ancho deben tener los pasillos de la bodega', esperado: '12', norma: 'Resolución 2400' },
  { consulta: 'requisitos de las puertas de emergencia', esperado: '16', norma: 'Resolución 2400' },
  { consulta: 'tengo que dar sillas a los trabajadores', esperado: '37', norma: 'Resolución 2400' },

  // ── Resolución 4272 de 2021 — trabajo en alturas (deroga la 1409 de 2012)
  {
    consulta: 'desde que altura se considera trabajo en alturas',
    esperado: '3',
    norma: 'Resolución 4272',
  },
  {
    consulta: 'cada cuanto se renueva el curso de alturas',
    esperado: '27',
    norma: 'Resolución 4272',
  },
  {
    consulta: 'necesito permiso de trabajo en alturas',
    esperado: '15',
    norma: 'Resolución 4272',
  },
  {
    consulta: 'cuantas horas dura el curso de alturas',
    esperado: ['9', '10'],
    norma: 'Resolución 4272',
  },
  {
    consulta: 'que obligaciones tengo si mis empleados trabajan en alturas',
    esperado: '61',
    norma: 'Resolución 4272',
  },
  {
    consulta: 'sigue vigente la resolucion 1409 de 2012',
    esperado: '68',
    norma: 'Resolución 4272',
  },
  {
    consulta: 'examen medico para trabajo en alturas',
    esperado: '32',
    norma: 'Resolución 4272',
  },

  // ── Ley 1010 de 2006 — acoso laboral
  { consulta: 'mi jefe me grita delante de todos es acoso', esperado: ['7', '2'], norma: 'Ley 1010' },
  { consulta: 'que conductas cuentan como acoso laboral', esperado: ['7', '2'], norma: 'Ley 1010' },
  {
    consulta: 'exigirle a un empleado que cumpla metas es acoso laboral',
    esperado: '8',
    norma: 'Ley 1010',
  },
  {
    consulta: 'si denuncio acoso laboral me pueden despedir',
    esperado: '11',
    norma: 'Ley 1010',
  },
  {
    consulta: 'cuanto tiempo tengo para denunciar acoso laboral',
    esperado: '18',
    norma: 'Ley 1010',
  },
  {
    consulta: 'que medidas preventivas de acoso debe tener la empresa',
    esperado: '9',
    norma: 'Ley 1010',
  },
  {
    consulta: 'la ley de acoso laboral aplica a un contratista',
    esperado: ['1', '6'],
    norma: 'Ley 1010',
  },

  // ── Decreto 1295 de 1994 — Sistema General de Riesgos Laborales
  {
    consulta: 'estoy obligado a afiliar a mis empleados a la arl',
    esperado: ['16', '4'],
    norma: 'Decreto 1295',
  },
  {
    consulta: 'que clase de riesgo le corresponde a mi empresa',
    esperado: ['25', '26'],
    norma: 'Decreto 1295',
  },
  {
    consulta: 'quien paga la arl el trabajador o el empleador',
    esperado: ['4', '16'],
    norma: 'Decreto 1295',
  },
  {
    consulta: 'que sanciones hay por no afiliar a riesgos laborales',
    esperado: '91',
    norma: 'Decreto 1295',
  },
  {
    consulta: 'cuales son las obligaciones del empleador en riesgos laborales',
    esperado: '21',
    norma: 'Decreto 1295',
  },

  // ── Ley 776 de 2002 — prestaciones económicas (los montos)
  {
    consulta: 'cuanto me pagan si me incapacito por un accidente de trabajo',
    esperado: '3',
    norma: 'Ley 776',
  },
  {
    consulta: 'hasta cuantos dias me cubren la incapacidad',
    esperado: '3',
    norma: 'Ley 776',
  },
  {
    consulta: 'cuanto es la indemnizacion por incapacidad permanente parcial',
    esperado: '7',
    norma: 'Ley 776',
  },
  {
    consulta: 'de cuanto es la pension de invalidez por accidente laboral',
    esperado: '10',
    norma: 'Ley 776',
  },
  {
    consulta: 'si un trabajador muere cuanto le queda a la familia',
    esperado: ['11', '12'],
    norma: 'Ley 776',
  },
  {
    consulta: 'quien paga el auxilio funerario del trabajador',
    esperado: '16',
    norma: 'Ley 776',
  },
  {
    consulta: 'tengo que reubicar al trabajador que quedo incapacitado',
    esperado: ['4', '8'],
    norma: 'Ley 776',
  },

  // ── Resolución 3461 de 2025 — Comité de Convivencia (deroga la 652 de 2012)
  {
    consulta: 'tengo que tener comite de convivencia laboral',
    esperado: ['1', '2', '3'],
    norma: 'Resolución 3461',
  },
  {
    consulta: 'cuantos miembros lleva el comite de convivencia',
    esperado: '3',
    norma: 'Resolución 3461',
  },
  {
    consulta: 'cada cuanto se reune el comite de convivencia',
    esperado: ['9', '10'],
    norma: 'Resolución 3461',
  },
  {
    consulta: 'cuanto dura el periodo del comite de convivencia',
    esperado: '5',
    norma: 'Resolución 3461',
  },
  {
    consulta: 'que funciones tiene el comite de convivencia',
    esperado: '6',
    norma: 'Resolución 3461',
  },
  {
    consulta: 'sigue vigente la resolucion 652 de 2012',
    esperado: '16',
    norma: 'Resolución 3461',
  },

  // ── Resolución 2013 de 1986 — COPASST y vigía
  { consulta: 'mi empresa necesita copasst o vigia', esperado: ['1', '3'], norma: 'Resolución 2013' },
  {
    consulta: 'cuantos representantes lleva el copasst con 200 empleados',
    esperado: '2',
    norma: 'Resolución 2013',
  },
  { consulta: 'cada cuanto se reune el copasst', esperado: '7', norma: 'Resolución 2013' },
  {
    consulta: 'por cuanto tiempo se eligen los miembros del copasst',
    esperado: '6',
    norma: 'Resolución 2013',
  },
  { consulta: 'cuales son las funciones del copasst', esperado: '11', norma: 'Resolución 2013' },
]

/**
 * Segunda prueba: que el DATO llegue al prompt, no solo el artículo.
 *
 * Traer el artículo correcto no alcanza. Los artículos largos se recortan para
 * no agotar el cupo de tokens, y con el recorte ciego el dato buscado se perdía
 * aunque estuviera cargado: el tope de 65 días del Comité de Convivencia vive en
 * el carácter 2.800 de un artículo de 3.825, y el modelo solo veía los primeros
 * 1.200. Acá se verifica el texto que efectivamente se le entrega.
 */
const CASOS_RECORTE: { consulta: string; debeLlegar: string }[] = [
  { consulta: 'el comite de convivencia ve casos de acoso sexual', debeLlegar: 'acoso sexual' },
  {
    consulta: 'cuanto se demora el tramite de una queja de acoso laboral',
    debeLlegar: 'sesenta y cinco',
  },
  {
    consulta: 'cuanto tiempo debo guardar los documentos del sg sst',
    debeLlegar: 'veinte (20) años',
  },
  { consulta: 'cada cuanto se reune el comite de convivencia', debeLlegar: 'mensual' },
  { consulta: 'que pasa si no afilio a mis trabajadores', debeLlegar: 'afiliación' },
  { consulta: 'cuantas horas dura el curso de alturas', debeLlegar: 'horas' },
  {
    // El artículo de multas mide 2.400 caracteres: el tramo de la microempresa
    // tiene que sobrevivir al recorte cuando la pregunta es por una micro.
    consulta: 'cuanto es la multa por no tener el sg sst en una microempresa',
    debeLlegar: '131,57',
  },
  // 157,88 solo aparece en el tramo de la pequeña empresa; 526,26 también
  // estaba en el de la micro y no probaba nada.
  { consulta: 'multa para una empresa de 30 trabajadores que no cumple', debeLlegar: '157,88' },
  // Búsqueda real de Andrea (1-oct-2026): "6 empleados" no nombra el tamaño,
  // el recorte se quedó sin la fila de la micro y respondió con la de la
  // pequeña empresa. Una tabla no se puede recortar por filas.
  { consulta: 'multas SG-SST empresa 6 empleados', debeLlegar: '131,57' },
  // El modelo ubicaba a 300 trabajadores como mediana aun con la tabla entera
  // a la vista (1-oct-2026, 2 de 2 veces). El tamaño se calcula y se entrega.
  { consulta: 'multa muerte trabajador 300 empleados', debeLlegar: 'con 300 trabajadores es gran empresa' },
  { consulta: 'multa SG-SST 80 trabajadores', debeLlegar: 'con 80 trabajadores es mediana empresa' },
  { consulta: 'multa no tener SG-SST 6 empleados', debeLlegar: 'con 6 trabajadores es microempresa' },
  { consulta: 'multa empresa de 50 personas', debeLlegar: 'con 50 trabajadores es pequena empresa' },
  {
    consulta: 'multa incumplimiento SG-SST número de trabajadores 80',
    debeLlegar: 'con 80 trabajadores es mediana empresa',
  },
]

let fallos = 0
let primeros = 0

for (const caso of CASOS) {
  const esperados = (Array.isArray(caso.esperado) ? caso.esperado : [caso.esperado]).map((e) => {
    const [norma, articulo] = e.includes('|') ? e.split('|') : [caso.norma, e]
    return { norma, articulo }
  })
  const resultados = buscarArticulos(caso.consulta, 3)
  const posicion = resultados.findIndex((a) =>
    esperados.some((e) => e.articulo === a.articulo && (!e.norma || a.norma.includes(e.norma))),
  )

  if (posicion === -1) {
    fallos++
    console.log(`✗ "${caso.consulta}"`)
    console.log(
      `      esperaba: ${esperados.map((e) => `${e.norma ?? ''} art. ${e.articulo}`).join('  o  ')}`,
    )
    resultados.forEach((a, i) => console.log(`      ${i + 1}. ${a.norma} art. ${a.articulo} — ${a.titulo}`))
  } else {
    if (posicion === 0) primeros++
    console.log(`✓ "${caso.consulta}" → posición ${posicion + 1}`)
  }
}

const enTop3 = CASOS.length - fallos
const pct = (n: number) => Math.round((n / CASOS.length) * 100)
console.log(
  `\n${enTop3}/${CASOS.length} en el top 3 (${pct(enTop3)}%) · ${primeros}/${CASOS.length} en primer lugar (${pct(primeros)}%)`,
)

console.log('\n── el dato recortado llega al prompt ──')
let perdidos = 0
for (const caso of CASOS_RECORTE) {
  const entregado = normalizarTexto(
    formatearParaPrompt(buscarArticulos(caso.consulta, 3), caso.consulta),
  )
  const llega = entregado.includes(normalizarTexto(caso.debeLlegar))
  if (!llega) perdidos++
  console.log(`${llega ? '✓' : '✗'} "${caso.consulta}" → "${caso.debeLlegar}"`)
}
console.log(`${CASOS_RECORTE.length - perdidos}/${CASOS_RECORTE.length} datos sobreviven al recorte`)

if (fallos || perdidos) process.exit(1)
