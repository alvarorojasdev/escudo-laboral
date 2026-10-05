/**
 * Guías prácticas del blog: cada una explica cómo cumplir un estándar que la
 * autoevaluación marca como faltante.
 *
 * Se escriben a mano a partir del corpus normativo, no con un modelo: toda
 * cifra del texto tiene que estar en los artículos de `fuentes`, y
 * `npm run evals:blog` lo verifica. Los ejemplos de cómo llenar un documento
 * son ilustrativos y se presentan como tales.
 */

export type Bloque =
  | { tipo: 'parrafo'; texto: string }
  | { tipo: 'subtitulo'; texto: string }
  | { tipo: 'lista'; items: string[]; numerada?: boolean }
  | { tipo: 'nota'; texto: string }

export interface Guia {
  slug: string
  titulo: string
  /** Una o dos frases: tarjeta del índice y metadescripción. */
  resumen: string
  /** Fecha de publicación, AAAA-MM-DD. */
  publicada: string
  /** Ítems de la autoevaluación (Resolución 0312, art. 27) que esta guía ayuda a cumplir. */
  items: string[]
  bloques: Bloque[]
  /** Artículos del corpus que respaldan el texto. */
  fuentes: { norma: string; articulo: string }[]
}

const R0312 = 'Resolución 0312 de 2019'
const D1072 = 'Decreto 1072 de 2015'
const GTC45 = 'GTC-45 (2012)'

export const GUIAS: Guia[] = [
  {
    slug: 'quien-puede-disenar-el-sg-sst',
    titulo: '¿Quién puede diseñar el SG-SST de tu empresa?',
    resumen:
      'Qué título, licencia y experiencia pide la Resolución 0312 a quien diseña el SG-SST, por qué el curso de 50 horas no alcanza y dónde conseguir ayuda gratis.',
    publicada: '2026-10-01',
    items: ['1.1.1', '1.2.3'],
    bloques: [
      {
        tipo: 'parrafo',
        texto:
          'El primer estándar mínimo de cualquier empresa es tener asignada a una persona que diseñe el Sistema de Gestión de Seguridad y Salud en el Trabajo. No puede ser cualquiera: la norma pide una formación, una licencia vigente en SST y, según el tamaño de la empresa, experiencia certificada.',
      },
      { tipo: 'subtitulo', texto: 'Si tienes 10 trabajadores o menos (riesgo I, II o III)' },
      {
        tipo: 'lista',
        items: [
          'Un técnico en SST (o en alguna de sus áreas) con licencia vigente, mínimo un (1) año de experiencia certificada y el curso virtual de cincuenta (50) horas aprobado.',
          'O un tecnólogo, profesional o profesional con posgrado en SST, con licencia vigente y el mismo curso.',
        ],
      },
      { tipo: 'subtitulo', texto: 'Si tienes de 11 a 50 trabajadores (riesgo I, II o III)' },
      {
        tipo: 'lista',
        items: [
          'Un tecnólogo en SST (o en alguna de sus áreas) con licencia vigente, mínimo dos (2) años de experiencia certificada y el curso virtual de cincuenta (50) horas.',
          'O un profesional o profesional con posgrado en SST, con licencia vigente y el curso.',
        ],
      },
      { tipo: 'subtitulo', texto: 'El curso de 50 horas no alcanza para diseñarlo' },
      {
        tipo: 'parrafo',
        texto:
          'Es el error más común. Quien solo tiene el curso virtual de cincuenta (50) horas puede administrar y ejecutar el SG-SST en una empresa de 10 trabajadores o menos de riesgo I, II o III, pero la norma dice expresamente que no puede diseñarlo. El curso, eso sí, es obligatorio para todos los responsables de ejecutar el sistema.',
      },
      {
        tipo: 'nota',
        texto:
          'En la práctica: el diseño lo hace una persona con licencia, y alguien de tu equipo con el curso de 50 horas puede llevar el sistema día a día.',
      },
      { tipo: 'subtitulo', texto: 'Ayuda gratuita que existe' },
      {
        tipo: 'lista',
        items: [
          'Tu ARL está obligada a asesorar, capacitar y acompañar presencialmente a las empresas de 10 trabajadores o menos, entre otras cosas para mantener actualizada la identificación de peligros.',
          'Consultorios en riesgos laborales de instituciones educativas, gremios, cámaras de comercio, universidades y fundaciones pueden asesorar gratis, con personal licenciado en SST.',
          'Si tienes de 11 a 50 trabajadores, un estudiante de último semestre en SST con vínculo laboral con tu empresa puede hacer el diseño, supervisado por un docente con licencia, sin costo y por una sola vez.',
        ],
      },
    ],
    fuentes: [
      { norma: R0312, articulo: '4' },
      { norma: R0312, articulo: '10' },
      { norma: R0312, articulo: '5' },
      { norma: R0312, articulo: '6' },
      { norma: R0312, articulo: '11' },
      { norma: D1072, articulo: '2.2.4.6.35' },
    ],
  },
  {
    slug: 'plan-anual-de-trabajo-sg-sst',
    titulo: 'Plan anual de trabajo del SG-SST: qué debe tener y cómo armarlo',
    resumen:
      'Los seis elementos que exige el Decreto 1072 al plan anual de trabajo en SST, quién lo firma y un paso a paso para armarlo en tu empresa.',
    publicada: '2026-10-01',
    items: ['2.4.1'],
    bloques: [
      {
        tipo: 'parrafo',
        texto:
          'El plan anual de trabajo es la hoja de ruta del SG-SST: dice qué va a hacer la empresa durante el año para cumplir sus objetivos de seguridad y salud, quién lo hace, cuándo y con qué recursos. Es uno de los siete estándares mínimos de las empresas más pequeñas, así que aplica a todas.',
      },
      { tipo: 'subtitulo', texto: 'Lo que tiene que contener' },
      {
        tipo: 'lista',
        items: [
          'Objetivos del SG-SST.',
          'Metas.',
          'Actividades claras para lograrlos.',
          'Responsables de cada actividad.',
          'Cronograma.',
          'Recursos necesarios.',
        ],
      },
      {
        tipo: 'parrafo',
        texto:
          'Además debe estar firmado por el empleador y por el responsable del Sistema de Gestión, y guardarse como parte de la documentación del SG-SST.',
      },
      { tipo: 'subtitulo', texto: 'Cómo armarlo, paso a paso' },
      {
        tipo: 'lista',
        numerada: true,
        items: [
          'Parte de la evaluación inicial (o de tu última autoevaluación): ahí ves qué te falta y qué es prioritario.',
          'Define objetivos medibles y cuantificables, alineados con tu política de SST.',
          'Para cada objetivo, escribe las actividades concretas, quién las hace, en qué mes y qué recursos necesita (dinero, tiempo, personas, equipos).',
          'Define indicadores para revisar si el sistema está funcionando.',
          'Hazlo firmar por el empleador y el responsable del SG-SST.',
        ],
      },
      {
        tipo: 'nota',
        texto:
          'Ejemplo ilustrativo de una fila: objetivo "que todo el equipo conozca los riesgos de su puesto"; actividad "capacitación en los peligros prioritarios y sus medidas de control"; responsable "el responsable del SG-SST con apoyo de la ARL"; mes "marzo"; recursos "dos horas de la jornada y material de la ARL".',
      },
      { tipo: 'subtitulo', texto: 'Cómo se conecta con la autoevaluación' },
      {
        tipo: 'parrafo',
        texto:
          'Cuando la autoevaluación de estándares mínimos sale aceptable, la norma pide incluir en el plan anual de trabajo las mejoras detectadas. Si sale crítica o moderadamente aceptable, además hay que hacer un plan de mejoramiento y reportar avances a la ARL.',
      },
    ],
    fuentes: [
      { norma: D1072, articulo: '2.2.4.6.17' },
      { norma: D1072, articulo: '2.2.4.6.8' },
      { norma: D1072, articulo: '2.2.4.6.12' },
      { norma: R0312, articulo: '3' },
      { norma: R0312, articulo: '28' },
    ],
  },
  {
    slug: 'matriz-de-peligros-identificacion-de-riesgos',
    titulo: 'Matriz de peligros: cómo identificar y valorar los riesgos de tu empresa',
    resumen:
      'Qué exige el Decreto 1072 para identificar peligros y valorar riesgos, cada cuánto actualizarlo y cómo hacerlo con la metodología de la GTC-45.',
    publicada: '2026-10-01',
    items: ['4.1.1', '4.1.2', '4.2.1'],
    bloques: [
      {
        tipo: 'parrafo',
        texto:
          'La identificación de peligros y valoración de riesgos (lo que muchos llaman "la matriz de peligros") es la base de todo el SG-SST: de ahí salen las capacitaciones, los controles y los elementos de protección. Por eso pesa tanto en la autoevaluación.',
      },
      { tipo: 'subtitulo', texto: 'Lo que exige la norma' },
      {
        tipo: 'lista',
        items: [
          'Usar una metodología sistemática que cubra todos los procesos, las actividades rutinarias y no rutinarias, las máquinas y equipos, todos los centros de trabajo y todos los trabajadores, sin importar cómo estén contratados.',
          'Hacerla con la participación de todos los niveles de la empresa.',
          'Documentarla y actualizarla como mínimo una vez al año, y también después de un accidente mortal, de un evento catastrófico o de cambios en procesos, instalaciones, maquinaria o equipos.',
          'Informar al COPASST o al vigía de SST los resultados de las evaluaciones de los ambientes de trabajo, para que hagan sus recomendaciones.',
        ],
      },
      {
        tipo: 'nota',
        texto:
          'Si tienes 10 trabajadores o menos, la identificación se hace con el acompañamiento de tu ARL, que está obligada a apoyarte de manera presencial.',
      },
      { tipo: 'subtitulo', texto: 'Cómo hacerla con la GTC-45' },
      {
        tipo: 'lista',
        numerada: true,
        items: [
          'Lista las sedes o zonas de trabajo y, en cada una, los procesos y las tareas. Marca cuáles son rutinarias y cuáles no.',
          'En cada tarea, identifica los peligros. La GTC-45 los agrupa en siete: biológico, físico, químico, psicosocial, biomecánico, condiciones de seguridad y fenómenos naturales.',
          'Describe qué podría pasar en el peor escenario y anota los controles que ya existen.',
          'Valora el riesgo: nivel de probabilidad (deficiencia por exposición) multiplicado por el nivel de consecuencia.',
          'Decide los controles empezando por los más efectivos.',
        ],
      },
      { tipo: 'subtitulo', texto: 'El orden de los controles' },
      {
        tipo: 'lista',
        numerada: true,
        items: [
          'Eliminar el peligro.',
          'Sustituirlo por algo menos peligroso.',
          'Controles de ingeniería, como encerrar, aislar o ventilar.',
          'Controles administrativos: rotación, señalización, procedimientos, permisos de trabajo, formación.',
          'Elementos de protección personal.',
        ],
      },
      {
        tipo: 'parrafo',
        texto:
          'Los elementos de protección personal van de últimos y nunca solos: complementan a los otros controles. El empleador los entrega sin costo para el trabajador y enseña a usarlos.',
      },
    ],
    fuentes: [
      { norma: D1072, articulo: '2.2.4.6.15' },
      { norma: D1072, articulo: '2.2.4.6.24' },
      { norma: R0312, articulo: '3' },
      { norma: R0312, articulo: '6' },
      { norma: GTC45, articulo: '3.1' },
      { norma: GTC45, articulo: '3.2' },
      { norma: GTC45, articulo: '3.9' },
    ],
  },
  {
    slug: 'afiliacion-a-riesgos-laborales',
    titulo: 'Afiliación a riesgos laborales: a quién afiliar, quién paga y qué pasa si te atrasas',
    resumen:
      'Quiénes deben estar afiliados a la ARL según la Ley 1562, quién paga la cotización, qué pasa si te atrasas y por qué no afiliar por agremiaciones.',
    publicada: '2026-10-01',
    items: ['1.1.4'],
    bloques: [
      {
        tipo: 'parrafo',
        texto:
          'La afiliación al Sistema de Seguridad Social Integral (salud, pensión y riesgos laborales) es un estándar mínimo para todas las empresas, sin importar su tamaño.',
      },
      { tipo: 'subtitulo', texto: 'A quién tienes que afiliar a riesgos laborales' },
      {
        tipo: 'lista',
        items: [
          'A tus trabajadores con contrato de trabajo, escrito o verbal.',
          'A quienes te prestan servicios con un contrato formal (civil, comercial o administrativo) de más de un mes. En ese caso la afiliación está a tu cargo, pero el pago lo hace el contratista.',
          'A los trabajadores independientes que hagan actividades de alto riesgo: ahí el pago también es tuyo como contratante.',
          'A los estudiantes que trabajen generando ingresos o cuya práctica sea requisito de grado y tenga riesgo.',
          'A los pensionados que vuelvan a trabajar como dependientes.',
        ],
      },
      { tipo: 'subtitulo', texto: 'Cuánto se paga y quién lo paga' },
      {
        tipo: 'parrafo',
        texto:
          'Para los trabajadores con contrato de trabajo, la cotización a riesgos laborales la paga el empleador y va del 0.348% al 8.7% del ingreso base de cotización, según la clase de riesgo de la actividad.',
      },
      { tipo: 'subtitulo', texto: 'Si te atrasas en los pagos' },
      {
        tipo: 'parrafo',
        texto:
          'La mora no desafilia automáticamente a tus trabajadores, pero te hace responsable de lo que la ARL gaste en atenderlos, de los aportes atrasados con intereses y de las prestaciones económicas a que haya lugar. Es decir: si hay un accidente mientras estás en mora, la cuenta te puede llegar a ti.',
      },
      { tipo: 'subtitulo', texto: 'No afilies por medio de agremiaciones' },
      {
        tipo: 'parrafo',
        texto:
          'La afiliación es responsabilidad del empleador o contratante. Usar o permitir agremiaciones o asociaciones para afiliar a tus trabajadores está prohibido: la agremiación puede recibir multas de hasta cinco mil (5000) salarios mínimos y la empresa contratante, de hasta quinientos (500).',
      },
      {
        tipo: 'nota',
        texto:
          'Si trabajas con contratistas, verifica su afiliación antes de que empiecen y luego periódicamente, sobre todo si su personal rota.',
      },
    ],
    fuentes: [
      { norma: 'Ley 1562 de 2012', articulo: '2' },
      { norma: 'Ley 1562 de 2012', articulo: '6' },
      { norma: 'Ley 1562 de 2012', articulo: '7' },
      { norma: R0312, articulo: '24' },
      { norma: R0312, articulo: '3' },
      { norma: D1072, articulo: '2.2.4.6.28' },
    ],
  },
  {
    slug: 'programa-de-capacitacion-sst',
    titulo: 'Programa de capacitación en SST: qué debe incluir y a quién',
    resumen:
      'Qué exige el Decreto 1072 al programa de capacitación en SST, la inducción antes de empezar a trabajar, cada cuánto revisarlo y la ayuda gratis de la ARL.',
    publicada: '2026-10-01',
    items: ['1.2.1', '1.2.2'],
    bloques: [
      {
        tipo: 'parrafo',
        texto:
          'Capacitar a tu equipo no es dar una charla al año: la norma pide un programa documentado que enseñe a cada persona a reconocer los peligros de su trabajo y a controlarlos. Es uno de los estándares mínimos de todas las empresas.',
      },
      { tipo: 'subtitulo', texto: 'Lo que debe tener el programa' },
      {
        tipo: 'lista',
        items: [
          'Contenido para identificar los peligros y controlar los riesgos del trabajo; como mínimo, los peligros prioritarios y sus medidas de prevención y control.',
          'Alcance a todos los niveles de la organización: trabajadores dependientes, contratistas, cooperados y trabajadores en misión.',
          'Estar documentado.',
          'Ser dictado por personal idóneo.',
        ],
      },
      { tipo: 'subtitulo', texto: 'La inducción, antes del primer día' },
      {
        tipo: 'parrafo',
        texto:
          'Todo trabajador que entra por primera vez, sin importar cómo esté contratado, debe recibir antes de empezar una inducción sobre su trabajo que incluya los peligros y riesgos de su puesto, cómo se controlan y cómo prevenir accidentes y enfermedades laborales.',
      },
      { tipo: 'subtitulo', texto: 'Revisarlo cada año' },
      {
        tipo: 'parrafo',
        texto:
          'El programa se revisa como mínimo una (1) vez al año, junto con el COPASST o el vigía y la alta dirección, para identificar mejoras. Y el empleador debe dar los espacios y el tiempo para que los trabajadores se capaciten.',
      },
      {
        tipo: 'nota',
        texto:
          'El programa tiene que estar documentado: guarda el plan, los temas y las planillas de asistencia firmadas.',
      },
      { tipo: 'subtitulo', texto: 'Ayuda gratuita' },
      {
        tipo: 'parrafo',
        texto:
          'Si tienes 10 trabajadores o menos, tu ARL está obligada a capacitarte para implementar los estándares mínimos y en atención de emergencias básicas (primeros auxilios, contra incendios y evacuación), entre otros temas.',
      },
    ],
    fuentes: [
      { norma: D1072, articulo: '2.2.4.6.11' },
      { norma: R0312, articulo: '3' },
      { norma: 'Ley 1562 de 2012', articulo: '26' },
      { norma: R0312, articulo: '6' },
    ],
  },
  {
    slug: 'evaluaciones-medicas-ocupacionales',
    titulo: 'Evaluaciones médicas ocupacionales: cuáles hacer y qué hacer con el resultado',
    resumen:
      'Las evaluaciones médicas de ingreso, periódicas y de retiro que pide el Decreto 1072, según los peligros de cada puesto, y qué hacer con el resultado.',
    publicada: '2026-10-01',
    items: ['3.1.4', '3.1.6'],
    bloques: [
      {
        tipo: 'parrafo',
        texto:
          'Las evaluaciones médicas ocupacionales sirven para detectar a tiempo si el trabajo está afectando la salud de tu equipo, y para saber si cada persona puede hacer su labor sin riesgo. Son un estándar mínimo para todas las empresas.',
      },
      { tipo: 'subtitulo', texto: 'Cuáles hay que hacer' },
      {
        tipo: 'lista',
        items: ['De ingreso.', 'Periódicas.', 'De retiro.'],
      },
      {
        tipo: 'parrafo',
        texto:
          'Qué se evalúa en cada una depende de la normatividad y de los peligros a los que está expuesto cada trabajador: no es lo mismo una persona en oficina que una que trabaja en alturas o con químicos. Por eso la identificación de peligros va primero.',
      },
      { tipo: 'subtitulo', texto: 'El resultado no se archiva y ya' },
      {
        tipo: 'parrafo',
        texto:
          'El médico emite recomendaciones y restricciones laborales, y cumplirlas también es un estándar mínimo. Por ejemplo, si el concepto dice que alguien no debe levantar peso, hay que ajustarle la tarea.',
      },
      {
        tipo: 'nota',
        texto:
          'Si tienes trabajadores en alturas, enviarlos a sus evaluaciones médicas ocupacionales es una de las obligaciones mínimas del empleador en esa actividad.',
      },
      { tipo: 'subtitulo', texto: 'Para qué más sirven' },
      {
        tipo: 'parrafo',
        texto:
          'Junto con los programas de vigilancia epidemiológica, las evaluaciones médicas permiten ver si las medidas de prevención y control están funcionando. Si muchos trabajadores muestran el mismo efecto, algo en el ambiente de trabajo hay que corregir.',
      },
    ],
    fuentes: [
      { norma: D1072, articulo: '2.2.4.6.24' },
      { norma: R0312, articulo: '3' },
      { norma: R0312, articulo: '9' },
      { norma: 'Resolución 4272 de 2021', articulo: '61' },
    ],
  },
]

export function guiaPorSlug(slug: string): Guia | undefined {
  return GUIAS.find((g) => g.slug === slug)
}

/** La guía que explica cómo cumplir un ítem de la autoevaluación, si existe. */
export function guiaDeItem(codigo: string): Guia | undefined {
  return GUIAS.find((g) => g.items.includes(codigo))
}

/** Todo el texto visible de una guía, para verificar sus cifras. */
export function textoDeGuia(g: Guia): string {
  const partes = [g.titulo, g.resumen]
  for (const b of g.bloques) partes.push(b.tipo === 'lista' ? b.items.join(' ') : b.texto)
  return partes.join(' ')
}
