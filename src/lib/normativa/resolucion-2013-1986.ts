import type { ArticuloNormativo } from './tipos'

const NORMA = 'Resolución 2013 de 1986'

/**
 * Resolución 2013 de 1986 de los Ministerios de Trabajo y Seguridad Social y de
 * Salud (6 de junio de 1986): reglamenta la organización y funcionamiento de
 * los Comités de Medicina, Higiene y Seguridad Industrial, hoy denominados
 * Comité Paritario de Seguridad y Salud en el Trabajo (COPASST).
 *
 * Texto tomado del PDF oficial publicado por ARL Sura (res2013_86.pdf) y
 * verificado contra SafetYA. Datos cruzados entre ambas fuentes:
 * - Umbral de conformación: diez (10) o más trabajadores (art. 1).
 * - Escala de representantes (art. 2): 10-49 uno por parte; 50-499 dos;
 *   500-999 tres; 1000 o más cuatro.
 * - Período de los miembros: el texto original del art. 6 dice un (1) año, pero
 *   el artículo 63 del Decreto-Ley 1295 de 1994 lo amplió a dos (2) años, que es
 *   lo vigente. Se deja constancia de ambas cosas en el artículo.
 *
 * Se omiten los artículos 18 (régimen transitorio de los comités existentes en
 * 1986) y 19 (vigencia y derogatoria de la Resolución 1405 de 1980), sin valor
 * práctico para una pyme hoy.
 */
export const RESOLUCION_2013_1986: ArticuloNormativo[] = [
  {
    norma: NORMA,
    articulo: '1',
    titulo: 'Obligación de conformar el Comité Paritario',
    texto:
      'Todas las empresas e instituciones, públicas o privadas, que tengan a su servicio diez (10) o más trabajadores, están obligadas a conformar un Comité de Medicina, Higiene y Seguridad Industrial —hoy Comité Paritario de Seguridad y Salud en el Trabajo (COPASST)—, cuya organización y funcionamiento estará de acuerdo con las normas del Decreto que se reglamenta y con la presente resolución.',
    temas: [
      'copasst',
      'comite paritario',
      'mi empresa necesita copasst o vigia',
      'cuantos trabajadores para copasst',
      'diez trabajadores',
      'es obligatorio el copasst',
      'conformar comite',
    ],
  },
  {
    norma: NORMA,
    articulo: '2',
    titulo: 'Composición del Comité y número de representantes',
    texto:
      'Cada Comité de Medicina, Higiene y Seguridad Industrial estará compuesto por un número igual de representantes del empleador y de los trabajadores, con sus respectivos suplentes, así: de 10 a 49 trabajadores, un representante por cada una de las partes; de 50 a 499 trabajadores, dos representantes por cada una de las partes; de 500 a 999 trabajadores, tres representantes por cada una de las partes; de 1000 o más trabajadores, cuatro representantes por cada una de las partes. A las reuniones del Comité sólo asistirán los miembros principales. Los suplentes asistirán por ausencia de los principales y serán citados a las reuniones por el presidente del Comité.',
    temas: [
      'cuantos miembros tiene el copasst',
      'numero de representantes',
      'composicion del comite',
      'suplentes',
      'paritario',
      'representantes del empleador y trabajadores',
    ],
  },
  {
    norma: NORMA,
    articulo: '3',
    titulo: 'Empresas con menos de diez trabajadores: vigía',
    texto:
      'Las empresas o establecimientos de trabajo que tengan a su servicio menos de diez trabajadores, deberán actuar en coordinación con los trabajadores para desarrollar bajo la responsabilidad del empleador el programa de salud ocupacional de la empresa. Las empresas con menos de diez trabajadores deben nombrar un vigía ocupacional, el cual cumple y desarrolla las funciones del Comité Paritario de Seguridad y Salud en el Trabajo y se registra en el Ministerio de Trabajo y Seguridad Social conforme al artículo 35 del Decreto 1295 de 1994 y a la presente resolución.',
    temas: [
      'vigia sst',
      'vigia ocupacional',
      'menos de diez trabajadores',
      'empresa pequena',
      'no necesito copasst',
      'quien reemplaza al copasst',
    ],
  },
  {
    norma: NORMA,
    articulo: '4',
    titulo: 'Empresas con varios establecimientos de trabajo',
    texto:
      'La empresa que posea dos o más establecimientos de trabajo podrá conformar varios Comités de Medicina, Higiene y Seguridad Industrial para el cumplimiento de lo dispuesto en esta Resolución, uno por cada establecimiento, teniendo en cuenta su organización interna. PARÁGRAFO. Cada Comité estará compuesto por representantes del empleador y los trabajadores según el artículo 20 de esta Resolución, considerando como número total de trabajadores la suma de los trabajadores de la empresa en el respectivo municipio y municipios vecinos.',
    temas: [
      'varias sedes',
      'varios establecimientos',
      'sucursales',
      'comite por sede',
      'municipios vecinos',
    ],
  },
  {
    norma: NORMA,
    articulo: '5',
    titulo: 'Designación y elección de los representantes',
    texto:
      'El empleador nombrará directamente sus representantes al Comité y los trabajadores elegirán los suyos mediante votación libre.',
    temas: [
      'como se eligen los miembros',
      'votacion',
      'eleccion de representantes',
      'quien nombra',
    ],
  },
  {
    norma: NORMA,
    articulo: '6',
    titulo: 'Período de los miembros del Comité',
    texto:
      'El texto original de este artículo dispone que los miembros del Comité serán elegidos por un año, al cabo del cual podrán ser reelegidos. No obstante, el artículo 63 del Decreto-Ley 1295 de 1994 amplió el período de los miembros del Comité a dos (2) años, que es el término vigente.',
    temas: [
      'cuanto dura el copasst',
      'cada cuanto se eligen',
      'cuanto tiempo duran los miembros',
      'periodo de vigencia',
      'dos anos',
      'reeleccion',
      'cada cuanto se renueva',
    ],
  },
  {
    norma: NORMA,
    articulo: '7',
    titulo: 'Periodicidad de las reuniones',
    texto:
      'El Comité de Medicina, Higiene y Seguridad Industrial se reunirá por lo menos una vez al mes en local de la empresa y durante el horario de trabajo. PARÁGRAFO. En caso de accidente grave o riesgo inminente, el Comité se reunirá con carácter extraordinario y con la presencia del responsable del área donde ocurrió el accidente o se determinó el riesgo, dentro de los cinco días siguientes a la ocurrencia del hecho.',
    temas: [
      'cada cuanto se reune el copasst',
      'reuniones mensuales',
      'una vez al mes',
      'reunion extraordinaria',
      'accidente grave',
    ],
  },
  {
    norma: NORMA,
    articulo: '8',
    titulo: 'Quórum para sesionar',
    texto:
      'El quórum para sesionar el Comité estará constituido por la mitad más uno de sus miembros. Pasados los primeros treinta (30) minutos de la hora señalada para empezar la reunión, el Comité sesionará con los miembros presentes y sus decisiones tendrán plena validez.',
    temas: ['quorum', 'cuantos deben asistir', 'validez de las decisiones', 'treinta minutos'],
  },
  {
    norma: NORMA,
    articulo: '9',
    titulo: 'Designación del presidente y del secretario',
    texto:
      'El empleador designará anualmente al presidente del Comité de los representantes que él designa, y el Comité en pleno elegirá al secretario de entre la totalidad de sus miembros.',
    temas: ['presidente del copasst', 'secretario del copasst', 'quien preside', 'designacion'],
  },
  {
    norma: NORMA,
    articulo: '10',
    titulo: 'Naturaleza y alcance del Comité',
    texto:
      'El Comité de Medicina, Higiene y Seguridad Industrial es un organismo de promoción y vigilancia de las normas y reglamentos de salud ocupacional dentro de la empresa y no se ocupará por lo tanto de tramitar asuntos referentes a la relación contractual-laboral propiamente dicha, los problemas de personal, disciplinarios o sindicales; ellos se ventilan en otros organismos y están sujetos a reglamentación distinta.',
    temas: [
      'para que sirve el copasst',
      'que no hace el copasst',
      'no es sindicato',
      'alcance del comite',
    ],
  },
  {
    norma: NORMA,
    articulo: '11',
    titulo: 'Funciones del Comité',
    texto:
      'Son funciones del Comité, además de las señaladas por el artículo 26 del Decreto 614 de 1984: a. Proponer a la administración la adopción de medidas y el desarrollo de actividades que procuren y mantengan la salud en los lugares y ambientes de trabajo. b. Proponer y participar en actividades de capacitación en salud ocupacional dirigidas a trabajadores, superiores y directivos. c. Colaborar con los funcionarios de entidades gubernamentales de salud ocupacional en las actividades que estos adelanten en la empresa y recibir por derecho propio los informes correspondientes. d. Vigilar el desarrollo de las actividades que en materia de medicina, higiene y seguridad industrial debe realizar la empresa de acuerdo con el Reglamento de Higiene y Seguridad Industrial y las normas vigentes; promover su divulgación y observancia. e. Colaborar en el análisis de las causas de los accidentes de trabajo y enfermedades profesionales y proponer al empleador las medidas correctivas a que haya lugar para evitar su ocurrencia. Evaluar los programas que se hayan realizado. f. Visitar periódicamente los lugares de trabajo e inspeccionar los ambientes, máquinas, equipos, aparatos y las operaciones realizadas por el personal de trabajadores en cada área o sección de la empresa e informar al empleador sobre la existencia de factores de riesgo y sugerir las medidas correctivas y de control. g. Estudiar y considerar las sugerencias que presenten los trabajadores en materia de medicina, higiene y seguridad industrial. h. Servir como organismo de coordinación entre empleador y trabajadores en la solución de los problemas relativos a la salud ocupacional. Tramitar los reclamos de los trabajadores relacionados con la salud ocupacional. i. Solicitar periódicamente a la empresa informes sobre accidentalidad y enfermedades profesionales con el objeto de dar cumplimiento a lo estipulado en la presente resolución. j. Elegir al secretario del Comité. k. Mantener un archivo de las actas de cada reunión y demás actividades que se desarrollen, el cual estará en cualquier momento a disposición del empleador, los trabajadores y las autoridades competentes. l. Las demás funciones que le señalen las normas sobre salud ocupacional.',
    temas: [
      'funciones del copasst',
      'que hace el comite',
      'inspecciones',
      'actas',
      'investigacion de accidentes',
      'responsabilidades del comite',
    ],
  },
  {
    norma: NORMA,
    articulo: '12',
    titulo: 'Funciones del Presidente del Comité',
    texto:
      'Son funciones del Presidente del Comité: a. Presidir y orientar las reuniones en forma dinámica y eficaz. b. Llevar a cabo los arreglos necesarios para determinar el lugar o sitio de las reuniones. c. Notificar por escrito a los miembros del Comité sobre convocatoria a las reuniones por lo menos una vez al mes. d. Preparar los temas que van a tratarse en cada reunión. e. Tramitar ante la administración de la empresa las recomendaciones aprobadas en el seno del Comité y darle a conocer todas sus actividades. f. Coordinar todo lo necesario para la buena marcha del Comité e informar a los trabajadores de la empresa acerca de las actividades del mismo.',
    temas: ['funciones del presidente', 'convocatoria', 'quien dirige las reuniones'],
  },
  {
    norma: NORMA,
    articulo: '13',
    titulo: 'Funciones del Secretario del Comité',
    texto:
      'Son funciones del Secretario: a. Verificar la asistencia de los miembros del Comité a las reuniones programadas. b. Tomar nota de los temas tratados, elaborar el acta de cada reunión y someterla a la discusión y aprobación del Comité. c. Llevar el archivo referente a las actividades desarrolladas por el Comité y suministrar toda la información que requieran el empleador y los trabajadores.',
    temas: ['funciones del secretario', 'actas de reunion', 'archivo del comite'],
  },
  {
    norma: NORMA,
    articulo: '14',
    titulo: 'Obligaciones del empleador frente al Comité',
    texto:
      'Son obligaciones del empleador: a. Propiciar la elección de los representantes de los trabajadores al Comité de acuerdo con lo ordenado en el artículo 20 de esta Resolución, garantizando la libertad y oportunidad de las votaciones. b. Designar sus representantes al Comité de Medicina, Higiene y Seguridad Industrial. c. Designar al Presidente del Comité. d. Proporcionar los medios necesarios para el normal desempeño de las funciones del Comité. e. Estudiar las recomendaciones emanadas del Comité y determinar la adopción de las medidas más convenientes e informar las decisiones tomadas al respecto.',
    temas: [
      'obligaciones del empleador con el copasst',
      'que debe hacer el empleador',
      'recursos para el comite',
    ],
  },
  {
    norma: NORMA,
    articulo: '15',
    titulo: 'Obligaciones de los trabajadores frente al Comité',
    texto:
      'Son obligaciones de los trabajadores: a. Elegir libremente sus representantes al Comité de Medicina, Higiene y Seguridad Industrial. b. Informar al Comité las situaciones de riesgo que se presenten y manifestar sus sugerencias para el mejoramiento de las condiciones de salud ocupacional en la empresa. c. Cumplir con las normas de medicina, higiene y seguridad industrial en el trabajo y con los reglamentos e instrucciones de servicio ordenados por el empleador.',
    temas: [
      'obligaciones de los trabajadores',
      'deberes del trabajador',
      'reportar riesgos',
    ],
  },
  {
    norma: NORMA,
    articulo: '16',
    titulo: 'Sesiones conjuntas entre varios empleadores',
    texto:
      'Cuando dos o más empleadores adelanten labores en el mismo lugar, podrán convocar a sesiones conjuntas a los respectivos Comités de Medicina, Higiene y Seguridad Industrial y adoptar de común acuerdo las medidas más convenientes para la salud y la seguridad de los trabajadores. PARÁGRAFO. Se procederá en la forma indicada en este artículo cuando concurra contratantes, contratistas y subcontratistas en un mismo lugar de trabajo.',
    temas: ['contratistas', 'subcontratistas', 'varios empleadores', 'sesiones conjuntas'],
  },
  {
    norma: NORMA,
    articulo: '17',
    titulo: 'Vigilancia del cumplimiento',
    texto:
      'La entidad gubernamental que ejerza en el lugar funciones de vigilancia de acuerdo con el Decreto 614 de 1984 controlará el cumplimiento de la presente Resolución y comunicará su violación a la División de Salud Ocupacional del Ministerio de Trabajo y Seguridad Social.',
    temas: ['quien vigila', 'incumplimiento', 'sancion', 'ministerio de trabajo'],
  },
]
