import type { ArticuloNormativo } from './tipos'

const NORMA = 'GTC-45 (2012)'

/**
 * Guía Técnica Colombiana GTC-45, segunda actualización (2012) de ICONTEC:
 * guía para la identificación de los peligros y la valoración de los riesgos
 * en seguridad y salud ocupacional. Es una guía técnica, no una norma de
 * obligatorio cumplimiento, pero es la metodología de referencia que exige el
 * SG-SST para construir la matriz IPVR.
 *
 * Al no tener articulado, el campo `articulo` usa el numeral de la sección.
 * Las tablas se transcriben con sus valores exactos, tomados de la guía
 * GTHG01 del Ministerio de Salud (que cita "Fuente: GTC-45 2012"); los valores
 * de nivel de deficiencia se verificaron además contra SafetYA.
 */
export const GTC_45: ArticuloNormativo[] = [
  {
    norma: NORMA,
    articulo: '3.1',
    titulo: 'Clasificación de peligros',
    texto:
      'La GTC-45 clasifica los peligros en siete grupos. Biológico: virus, bacterias, hongos, rickettsias, parásitos, picaduras, mordeduras, fluidos o excrementos. Físico: ruido (impacto, intermitente y continuo), iluminación (luz visible por exceso o deficiencia), vibración (cuerpo entero, segmentaria), temperaturas extremas (calor y frío), presión atmosférica (normal y ajustada), radiaciones ionizantes (rayos x, gama, beta y alfa) y radiaciones no ionizantes (láser, ultravioleta, infrarroja). Químico: polvos orgánicos e inorgánicos, fibras, líquidos (nieblas y rocíos), gases y vapores, humos metálicos y no metálicos, material particulado. Psicosocial: gestión organizacional (estilo de mando, pago, contratación, participación, inducción y capacitación, bienestar social, evaluación del desempeño, manejo de cambios), características de la organización del trabajo (comunicación, tecnología, organización del trabajo, demandas cualitativas y cuantitativas de la labor), características del grupo social del trabajo (relaciones, cohesión, calidad de interacciones, trabajo en equipo), condiciones de la tarea (carga mental, contenido de la tarea, demandas emocionales, sistemas de control, definición de roles, monotonía), interfase persona-tarea (conocimientos, habilidades en relación con la demanda de la tarea, iniciativa, autonomía y reconocimiento, identificación de la persona con la tarea y la organización) y jornada de trabajo (pausas, trabajo nocturno, rotación, horas extras, descansos). Biomecánicos: postura (prolongada, mantenida, forzada, antigravitacionales), esfuerzo, movimiento repetitivo y manipulación manual de cargas. Condiciones de seguridad: mecánico (elementos de máquinas, herramientas, piezas a trabajar, materiales proyectados sólidos o fluidos), eléctrico (alta y baja tensión, estática), locativo (almacenamiento, superficies de trabajo irregulares o deslizantes con diferencia de nivel, condiciones de orden y aseo, caídas de objeto), tecnológico (explosión, fuga, derrame, incendio), accidentes de tránsito, públicos (robos, atracos, asaltos, atentados, desorden público), trabajo en alturas y espacios confinados. Fenómenos naturales: sismo, terremoto, vendaval, inundación, derrumbe, precipitaciones (lluvias, granizadas, heladas).',
    temas: [
      'tipos de peligros',
      'clasificacion de peligros',
      'peligro biologico',
      'peligro fisico',
      'peligro quimico',
      'psicosocial',
      'biomecanico',
      'condiciones de seguridad',
      'que peligros existen',
    ],
  },
  {
    norma: NORMA,
    articulo: '3.2',
    titulo: 'Fórmula de valoración del riesgo',
    texto:
      'Para evaluar el nivel de riesgo (NR) se aplica NR = NP x NC, donde NP es el nivel de probabilidad y NC el nivel de consecuencia. A su vez, el nivel de probabilidad se obtiene como NP = ND x NE, donde ND es el nivel de deficiencia y NE el nivel de exposición. El procedimiento completo consiste en: seleccionar la sede, sitio o zona de trabajo; identificar el proceso y las tareas ejecutadas; definir si las tareas son rutinarias o no rutinarias; identificar los peligros de cada tarea; describir el peligro; determinar los posibles efectos o consecuencias de cada peligro en su peor escenario; y registrar las medidas de control actuales en la fuente, el medio y el individuo.',
    temas: [
      'como se calcula el riesgo',
      'formula del riesgo',
      'nivel de riesgo',
      'matriz de riesgos',
      'ipvr',
      'como hacer la matriz',
    ],
  },
  {
    norma: NORMA,
    articulo: '3.3',
    titulo: 'Nivel de deficiencia (ND)',
    texto:
      'Muy Alto (MA), valor 10: se han detectado peligros que determinan como posible la generación de incidentes o consecuencias muy significativas, o la eficacia del conjunto de medidas preventivas para control del riesgo no existe, o es nula, o ambas. Alto (A), valor 6: se han detectado algunos peligros que pueden dar lugar a consecuencias significativas o la eficacia del conjunto de las medidas preventivas es baja, o ambas. Medio (M), valor 2: se han detectado peligros que pueden dar lugar a consecuencias poco significativas o de menor importancia, o la eficacia del conjunto de las medidas preventivas es moderada, o ambas. Bajo (B), no se asigna valor: no se ha detectado consecuencia alguna o la eficacia del conjunto de medidas preventivas existentes es alta, o ambos. El riesgo está controlado.',
    temas: [
      'nivel de deficiencia',
      'valor nd',
      'muy alto alto medio bajo',
      'como calificar el peligro',
    ],
  },
  {
    norma: NORMA,
    articulo: '3.4',
    titulo: 'Nivel de exposición (NE)',
    texto:
      'Continua (EC), valor 4: la situación de exposición se presenta sin interrupción o varias veces con tiempo prolongado durante la jornada laboral. Frecuente (EF), valor 3: la situación de exposición se presenta varias veces durante la jornada laboral por tiempos cortos. Ocasional (EO), valor 2: la situación de exposición se presenta alguna vez durante la jornada laboral y por un periodo de tiempo corto. Esporádica (EE), valor 1: la situación de exposición se presenta de manera eventual.',
    temas: [
      'nivel de exposicion',
      'valor ne',
      'cuanto tiempo expuesto',
      'continua frecuente ocasional esporadica',
    ],
  },
  {
    norma: NORMA,
    articulo: '3.5',
    titulo: 'Nivel de probabilidad (NP)',
    texto:
      'El nivel de probabilidad resulta de multiplicar ND por NE. Los valores posibles son: con ND 10 y NE 4 da 40 (MA); ND 10 y NE 3 da 30 (MA); ND 10 y NE 2 da 20 (A); ND 10 y NE 1 da 10 (A); ND 6 y NE 4 da 24 (MA); ND 6 y NE 3 da 18 (A); ND 6 y NE 2 da 12 (A); ND 6 y NE 1 da 6 (M); ND 2 y NE 4 da 8 (M); ND 2 y NE 3 da 6 (M); ND 2 y NE 2 da 4 (B); ND 2 y NE 1 da 2 (B). La interpretación es: Muy Alto (MA), entre 40 y 24, situación deficiente con exposición continua o muy deficiente con exposición frecuente, normalmente la materialización del riesgo ocurre con frecuencia. Alto (A), entre 20 y 10, situación deficiente con exposición frecuente u ocasional, o bien situación muy deficiente con exposición ocasional o esporádica, la materialización del riesgo es posible. Medio (M), entre 8 y 6, situación deficiente con exposición esporádica, o bien situación mejorable con exposición continuada o frecuente, es posible que suceda el daño alguna vez. Bajo (B), entre 4 y 2, situación mejorable con exposición ocasional o esporádica, o situación sin anomalía destacable con cualquier nivel de exposición, no es esperable que se materialice el riesgo aunque puede ser concebible.',
    temas: [
      'nivel de probabilidad',
      'valor np',
      'que tan probable',
      'calculo de probabilidad',
    ],
  },
  {
    norma: NORMA,
    articulo: '3.6',
    titulo: 'Nivel de consecuencia (NC)',
    texto:
      'Mortal o catastrófico (M), valor 100: muerte. Muy grave (MG), valor 60: lesiones o enfermedades irreparables, con incapacidad permanente parcial o invalidez. Grave (G), valor 25: lesiones o enfermedades con incapacidad laboral temporal. Leve (L), valor 10: lesiones o enfermedades que no requieren incapacidad.',
    temas: [
      'nivel de consecuencia',
      'valor nc',
      'que tan grave',
      'gravedad del dano',
      'mortal muy grave leve',
    ],
  },
  {
    norma: NORMA,
    articulo: '3.7',
    titulo: 'Nivel de riesgo (NR) y su significado',
    texto:
      'El nivel de riesgo resulta de multiplicar NP por NC, y se interpreta en cuatro niveles. Nivel I, valores de 4000 a 600: situación crítica, suspender actividades hasta que el riesgo esté bajo control, intervención urgente. Nivel II, valores de 500 a 150: corregir y adoptar medidas de control de inmediato; sin embargo, suspenda actividades si el nivel de riesgo está por encima o igual a 360. Nivel III, valores de 120 a 40: establecer un plan de mejora; sería conveniente justificar la intervención y su rentabilidad. Nivel IV, valor 20: mantener las medidas de control existentes, pero se deberían considerar soluciones o mejoras y se deben hacer comprobaciones periódicas para asegurar que el riesgo aún es aceptable.',
    temas: [
      'nivel de riesgo',
      'valor nr',
      'riesgo critico',
      'nivel i ii iii iv',
      'cuando suspender actividades',
      'que significa mi resultado',
    ],
  },
  {
    norma: NORMA,
    articulo: '3.8',
    titulo: 'Aceptabilidad del riesgo',
    texto:
      'Cuando el nivel de riesgo (NR) sea superior o igual a 600, o el riesgo sea inminente, el trabajador deberá suspender inmediatamente sus labores hasta tanto la situación sea verificada. La clasificación de la aceptabilidad es: Nivel I, valores 4000 a 600: no aceptable. Nivel II, valores 500 a 150: aceptable con control específico. Nivel III, valores 120 a 40: mejorable. Nivel IV, valor 20: aceptable. Es decir, el riesgo aceptable comprende las casillas de nivel II, III y IV; el nivel I es inaceptable.',
    temas: [
      'riesgo aceptable',
      'aceptabilidad',
      'cuando parar el trabajo',
      'riesgo no aceptable',
      'riesgo inminente',
    ],
  },
  {
    norma: NORMA,
    articulo: '3.9',
    titulo: 'Jerarquía de los controles',
    texto:
      'Al determinar los controles o considerar cambios a los controles existentes, se debe contemplar la reducción de riesgos de acuerdo con las siguientes jerarquías, en orden: eliminar el peligro; sustituir con procesos, operaciones, materiales o equipos menos peligrosos; utilizar controles de ingeniería y reorganización del trabajo; utilizar controles administrativos, incluyendo la formación; y utilizar equipos de protección personal adecuados. Los controles serán establecidos teniendo en cuenta el número de trabajadores expuestos cada vez que se realice la tarea, la peor consecuencia en caso de que ocurra un accidente o enfermedad laboral, y la exigencia de algún requisito legal.',
    temas: [
      'jerarquia de controles',
      'como controlar el riesgo',
      'eliminar sustituir',
      'epp ultimo recurso',
      'controles de ingenieria',
      'medidas de control',
    ],
  },
  {
    norma: NORMA,
    articulo: '3.10',
    titulo: 'Evaluación de la eficacia de la gestión del riesgo y gestión de cambios',
    texto:
      'Anualmente, como parte de la actualización de la identificación de peligros y evaluación de riesgos, se debe realizar una consolidación de los niveles de riesgos del año anterior y compararlos versus la gestión de riesgo resultante del periodo actual, con la finalidad de concluir cómo se ha comportado la tendencia de la gestión del riesgo y así validar si efectivamente las medidas de controles implementadas están siendo efectivas. Adicionalmente se debe resumir los elementos que han sido objeto de cambio en el proceso de actualización.',
    temas: [
      'cada cuanto actualizar la matriz',
      'actualizacion anual',
      'gestion de cambios',
      'eficacia de los controles',
    ],
  },
]
