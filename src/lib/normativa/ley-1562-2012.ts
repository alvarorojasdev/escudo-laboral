import type { ArticuloNormativo } from './tipos'

const NORMA = 'Ley 1562 de 2012'

/**
 * Ley 1562 de 2012 (11 de julio de 2012): modifica el Sistema de Riesgos
 * Laborales y dicta otras disposiciones en materia de Salud Ocupacional.
 * Es la norma que rebautiza "Salud Ocupacional" como "Seguridad y Salud en el
 * Trabajo" y el "Programa de Salud Ocupacional" como SG-SST.
 *
 * Texto tomado del PDF oficial del Gestor Normativo de Función Pública.
 * Se incluyen los artículos con impacto directo en micro y pequeñas empresas;
 * se omiten los relativos a Juntas de Calificación de Invalidez (16 a 20),
 * magisterio (21), prescripción (22), licencias (23), flujo de recursos entre
 * sistemas (24, 25), investigación del INS (28, 29) y disposiciones finales.
 */
export const LEY_1562_2012: ArticuloNormativo[] = [
  {
    norma: NORMA,
    articulo: '1',
    titulo: 'Definiciones',
    texto:
      'Sistema General de Riesgos Laborales: es el conjunto de entidades públicas y privadas, normas y procedimientos, destinados a prevenir, proteger y atender a los trabajadores de los efectos de las enfermedades y los accidentes que puedan ocurrirles con ocasión o como consecuencia del trabajo que desarrollan. Las disposiciones vigentes de salud ocupacional relacionadas con la prevención de los accidentes de trabajo y enfermedades laborales y el mejoramiento de las condiciones de trabajo, hacen parte integrante del Sistema General de Riesgos Laborales. Salud Ocupacional: se entenderá en adelante como Seguridad y Salud en el Trabajo, definida como aquella disciplina que trata de la prevención de las lesiones y enfermedades causadas por las condiciones de trabajo, y de la protección y promoción de la salud de los trabajadores. Tiene por objeto mejorar las condiciones y el medio ambiente de trabajo, así como la salud en el trabajo, que conlleva la promoción y el mantenimiento del bienestar físico, mental y social de los trabajadores en todas las ocupaciones. Programa de Salud Ocupacional: en lo sucesivo se entenderá como el Sistema de Gestión de la Seguridad y Salud en el Trabajo SG-SST. Este Sistema consiste en el desarrollo de un proceso lógico y por etapas, basado en la mejora continua y que incluye la política, la organización, la planificación, la aplicación, la evaluación, la auditoría y las acciones de mejora con el objetivo de anticipar, reconocer, evaluar y controlar los riesgos que puedan afectar la seguridad y salud en el trabajo.',
    temas: [
      'que es el sg sst',
      'definiciones',
      'salud ocupacional',
      'seguridad y salud en el trabajo',
      'sistema general de riesgos laborales',
      'como se llama ahora',
    ],
  },
  {
    norma: NORMA,
    articulo: '2',
    titulo: 'Afiliados al Sistema General de Riesgos Laborales (modifica el artículo 13 del Decreto-ley 1295 de 1994)',
    texto:
      'Son afiliados al Sistema General de Riesgos Laborales. a) En forma obligatoria: 1. Los trabajadores dependientes nacionales o extranjeros, vinculados mediante contrato de trabajo escrito o verbal y los servidores públicos; las personas vinculadas a través de un contrato formal de prestación de servicios con entidades o instituciones públicas o privadas, tales como contratos civiles, comerciales o administrativos, con una duración superior a un mes y con precisión de las situaciones de tiempo, modo y lugar en que se realiza dicha prestación. 2. Las Cooperativas y Precooperativas de Trabajo Asociado son responsables conforme a la ley del proceso de afiliación y pago de los aportes de los trabajadores asociados. 3. Los jubilados o pensionados que se reincorporen a la fuerza laboral como trabajadores dependientes. 4. Los estudiantes de todos los niveles académicos de instituciones educativas públicas o privadas que deban ejecutar trabajos que signifiquen fuente de ingreso para la respectiva institución o cuyo entrenamiento o actividad formativa es requisito para la culminación de sus estudios, e involucra un riesgo ocupacional. 5. Los trabajadores independientes que laboren en actividades catalogadas por el Ministerio de Trabajo como de alto riesgo. El pago de esta afiliación será por cuenta del contratante. 6. Los miembros de las agremiaciones o asociaciones cuyos trabajos signifiquen fuente de ingreso para la institución. 7. Los miembros activos del Subsistema Nacional de primera respuesta. b) En forma voluntaria: los trabajadores independientes y los informales, diferentes de los establecidos en el literal a), podrán cotizar al Sistema de Riesgos Laborales siempre y cuando coticen también al régimen contributivo en salud.',
    temas: [
      'quien debe estar afiliado',
      'afiliacion obligatoria',
      'contratistas',
      'independientes',
      'prestacion de servicios',
      'aprendices',
      'estudiantes',
    ],
  },
  {
    norma: NORMA,
    articulo: '3',
    titulo: 'Accidente de trabajo',
    texto:
      'Es accidente de trabajo todo suceso repentino que sobrevenga por causa o con ocasión del trabajo, y que produzca en el trabajador una lesión orgánica, una perturbación funcional o psiquiátrica, una invalidez o la muerte. Es también accidente de trabajo aquel que se produce durante la ejecución de órdenes del empleador, o contratante durante la ejecución de una labor bajo su autoridad, aún fuera del lugar y horas de trabajo. Igualmente se considera accidente de trabajo el que se produzca durante el traslado de los trabajadores o contratistas desde su residencia a los lugares de trabajo o viceversa, cuando el transporte lo suministre el empleador. También se considerará como accidente de trabajo el ocurrido durante el ejercicio de la función sindical aunque el trabajador se encuentre en permiso sindical siempre que el accidente se produzca en cumplimiento de dicha función. De igual forma se considera accidente de trabajo el que se produzca por la ejecución de actividades recreativas, deportivas o culturales, cuando se actúe por cuenta o en representación del empleador o de la empresa usuaria cuando se trate de trabajadores de empresas de servicios temporales que se encuentren en misión.',
    temas: [
      'que es un accidente de trabajo',
      'definicion accidente',
      'accidente en el transporte',
      'camino al trabajo',
      'cuando es accidente laboral',
    ],
  },
  {
    norma: NORMA,
    articulo: '4',
    titulo: 'Enfermedad laboral',
    texto:
      'Es enfermedad laboral la contraída como resultado de la exposición a factores de riesgo inherentes a la actividad laboral o del medio en el que el trabajador se ha visto obligado a trabajar. El Gobierno Nacional determinará, en forma periódica, las enfermedades que se consideran como laborales y en los casos en que una enfermedad no figure en la tabla de enfermedades laborales, pero se demuestre la relación de causalidad con los factores de riesgo ocupacional será reconocida como enfermedad laboral, conforme lo establecido en las normas legales vigentes. Parágrafo 1: el Gobierno Nacional, previo concepto del Consejo Nacional de Riesgos Laborales, determinará en forma periódica las enfermedades que se consideran como laborales. Parágrafo 2: el Ministerio de Salud y Protección Social y el Ministerio de Trabajo realizarán una actualización de la tabla de enfermedades laborales por lo menos cada tres (3) años.',
    temas: [
      'que es enfermedad laboral',
      'enfermedad profesional',
      'tabla de enfermedades',
      'definicion enfermedad',
    ],
  },
  {
    norma: NORMA,
    articulo: '5',
    titulo: 'Ingreso base de liquidación',
    texto:
      'Se entiende por ingreso base para liquidar las prestaciones económicas lo siguiente: a) Para accidentes de trabajo: el promedio del Ingreso Base de Cotización (IBC) de los seis (6) meses anteriores a la ocurrencia del accidente de trabajo, o fracción de meses, si el tiempo laborado en esa empresa fuese inferior a la base de cotización declarada e inscrita en la Entidad Administradora de Riesgos Laborales a la que se encuentre afiliado. b) Para enfermedad laboral: el promedio del último año, o fracción de año, del Ingreso Base de Cotización (IBC) anterior a la fecha en que se calificó en primera oportunidad el origen de la enfermedad laboral.',
    temas: [
      'ingreso base de liquidacion',
      'ibc',
      'cuanto pagan por incapacidad',
      'prestaciones economicas',
    ],
  },
  {
    norma: NORMA,
    articulo: '6',
    titulo: 'Monto de las cotizaciones',
    texto:
      'El monto de las cotizaciones para el caso de los trabajadores vinculados mediante contratos de trabajo o como servidores públicos no podrá ser inferior al 0.348%, ni superior al 8.7%, del Ingreso Base de Cotización (IBC) de los trabajadores y su pago estará a cargo del respectivo empleador. El mismo porcentaje del monto de las cotizaciones se aplicará para las personas vinculadas a través de un contrato formal de prestación de servicios personales, sin embargo, su afiliación estará a cargo del contratante y el pago a cargo del contratista. El Ministerio de Trabajo en coordinación con el Ministerio de Salud y Protección Social adoptarán la tabla de cotizaciones mínimas y máximas para cada clase de riesgo, así como las formas en que una empresa pueda lograr disminuir o aumentar los porcentajes de cotización de acuerdo a su siniestralidad, severidad y cumplimiento del Sistema de Gestión de la Seguridad y Salud en el Trabajo SG-SST.',
    temas: [
      'cuanto se paga de arl',
      'cotizacion arl',
      'porcentaje arl',
      'tarifa riesgos laborales',
      'quien paga la arl',
    ],
  },
  {
    norma: NORMA,
    articulo: '7',
    titulo: 'Efectos por el no pago de aportes al Sistema General de Riesgos Laborales',
    texto:
      'La mora en el pago de aportes al Sistema General de Riesgos Laborales durante la vigencia de la relación laboral y del contrato de prestación de servicios, no genera la desafiliación automática de los afiliados trabajadores. En el evento en que el empleador y/o contratista se encuentre en mora de efectuar sus aportes al Sistema General de Riesgos Laborales, será responsable de los gastos en que incurra la Entidad Administradora de Riesgos Laborales por causa de las prestaciones asistenciales otorgadas, así como del pago de los aportes en mora con sus respectivos intereses y el pago de las prestaciones económicas a que hubiere lugar. Se entiende que la empresa afiliada está en mora cuando no ha cumplido con su obligación de pagar los aportes correspondientes dentro del término estipulado en las normas legales vigentes.',
    temas: [
      'no pagar la arl',
      'mora en aportes',
      'que pasa si no pago',
      'atraso en el pago',
    ],
  },
  {
    norma: NORMA,
    articulo: '8',
    titulo: 'Reporte de información de actividades y resultados de promoción y prevención',
    texto:
      'La Entidad Administradora de Riesgos Laborales deberá presentar al Ministerio de Trabajo un reporte de actividades que se desarrollen en sus empresas afiliadas durante el año y de los resultados logrados en términos del control de los riesgos más prevalentes en promoción y de las reducciones logradas en las tasas de accidentes y enfermedades laborales como resultado de sus medidas de prevención. Este reporte deberá ser presentado semestralmente a las Direcciones Territoriales del Ministerio de Trabajo para seguimiento y verificación del cumplimiento. El incumplimiento de los programas de promoción de la salud y prevención de accidentes y enfermedades, definidas en la tabla establecida por el Ministerio de Salud y Protección Social y el Ministerio de Trabajo, acarreará multa de hasta quinientos (500) salarios mínimos mensuales legales vigentes a la fecha en que se imponga la misma. Las multas serán graduales de acuerdo a la gravedad de la infracción y siguiendo siempre el debido proceso, las cuales irán al Fondo de Riesgos Laborales.',
    temas: [
      'multa 500 smmlv',
      'quinientos salarios minimos',
      'sancion incumplimiento',
      'promocion y prevencion',
    ],
  },
  {
    norma: NORMA,
    articulo: '10',
    titulo: 'Fortalecimiento de la prevención de los riesgos laborales en las micro y pequeñas empresas en el país',
    texto:
      'Las Entidades Administradoras de Riesgos Laborales fortalecerán las actividades de promoción y prevención en las micro y pequeñas empresas que presentan alta siniestralidad o están clasificadas como de alto riesgo. El Ministerio de Trabajo definirá los criterios técnicos con base en los cuales las Entidades Administradoras de Riesgos Laborales focalizarán sus acciones de promoción y prevención de manera que se fortalezcan estas actividades en las micro y pequeñas empresas, para lo cual se tendrá en cuenta la frecuencia, severidad y causa de los accidentes y enfermedades laborales en estas empresas, así como los criterios técnicos que defina el Ministerio de Salud y Protección Social en lo relacionado con la afiliación de trabajadores afiliados a micro y pequeñas empresas.',
    temas: [
      'micro y pequenas empresas',
      'pyme',
      'apoyo de la arl',
      'empresa pequena',
      'alto riesgo',
    ],
  },
  {
    norma: NORMA,
    articulo: '11',
    titulo: 'Servicios de Promoción y Prevención',
    texto:
      'Del total de la cotización las actividades mínimas de promoción y prevención en el Sistema General de Riesgos Laborales por parte de las Entidades Administradoras de Riesgos Laborales serán las siguientes: 1. Actividades básicas programadas y evaluadas conforme a los indicadores de Riesgos Laborales para las empresas correspondiente al cinco por ciento (5%) del total de la cotización, como mínimo: programas, campañas y acciones de educación y prevención; asesoría técnica básica para el diseño del Programa de Salud Ocupacional y el plan de trabajo anual de todas las empresas; capacitación básica para el montaje de la brigada de emergencias, primeros auxilios y sistema de calidad en salud ocupacional; capacitación a los miembros del comité paritario de salud ocupacional en aquellas empresas con un número mayor de 10 trabajadores, o a los vigías ocupacionales en las empresas con un número menor de 10 trabajadores; fomento de estilos de trabajo y de vida saludables; e investigación de los accidentes de trabajo y enfermedades laborales que presenten los trabajadores de sus empresas afiliadas. 2. Del noventa y dos por ciento (92%) del total de la cotización, la Entidad Administradora de Riesgos Laborales destinará como mínimo el diez por ciento (10%) para desarrollo de programas regulares de prevención y control de riesgos laborales y de rehabilitación integral, apoyo y asesoría a las empresas afiliadas, entre otros. 3. Hasta el tres por ciento (3%) del total de la cotización se destinará para el Fondo de Riesgos Laborales.',
    temas: [
      'que me da la arl',
      'servicios de la arl',
      'capacitacion gratis',
      'asesoria tecnica',
      'promocion y prevencion',
    ],
  },
  {
    norma: NORMA,
    articulo: '13',
    titulo: 'Sanciones (modifica el numeral 2 literal a) del artículo 91 del Decreto-ley 1295 de 1994)',
    texto:
      'El incumplimiento de los programas de salud ocupacional, las normas en salud ocupacional y aquellas obligaciones propias del empleador, previstas en el Sistema General de Riesgos Laborales, acarreará multa de hasta quinientos (500) salarios mínimos mensuales legales vigentes, graduales de acuerdo a la gravedad de la infracción y previo cumplimiento del debido proceso destinados al Fondo de Riesgos Laborales. En caso de reincidencia en tales conductas o por incumplimiento de los correctivos que deban adoptarse, formulados por la Entidad Administradora de Riesgos Laborales o el Ministerio de Trabajo debidamente demostrados, se podrá ordenar la suspensión de actividades hasta por un término de ciento veinte (120) días o cierre definitivo de la empresa por parte de las Direcciones Territoriales del Ministerio de Trabajo, garantizando el debido proceso. En caso de accidente que ocasione la muerte del trabajador donde se demuestre el incumplimiento de las normas de salud ocupacional, el Ministerio de Trabajo impondrá multa no inferior a veinte (20) salarios mínimos legales mensuales vigentes, ni superior a mil (1.000) salarios mínimos legales mensuales vigentes destinados al Fondo de Riesgos Laborales; en caso de reincidencia por incumplimiento de los correctivos de promoción y prevención formulados por la Entidad Administradora de Riesgos Laborales o el Ministerio de Trabajo una vez verificadas las circunstancias, se podrá ordenar la suspensión de actividades o cierre definitivo de la empresa por parte de las Direcciones Territoriales del Ministerio de Trabajo.',
    temas: [
      'multas',
      'sanciones',
      'cuanto me pueden multar',
      '500 smmlv',
      'cierre de la empresa',
      'muerte del trabajador',
      'mil salarios minimos',
      'que pasa si no cumplo',
    ],
  },
  {
    norma: NORMA,
    articulo: '14',
    titulo: 'Garantía de la Calidad en Salud Ocupacional y Riesgos Laborales',
    texto:
      'Para efectos de operar el Sistema Obligatorio de Garantía de Calidad del Sistema General de Riesgos Laborales, que deberán cumplir los integrantes del Sistema General de Riesgos Laborales, se realizarán visitas de verificación del cumplimiento de los estándares mínimos establecidos en el mencionado sistema de garantía de calidad, que se realizarán en forma directa o a través de terceros idóneos seleccionados por el Ministerio del Trabajo de acuerdo a la reglamentación que expida al respecto, priorizando las empresas con mayores tasas de accidentalidad y muertes. El costo de las visitas de verificación serán asumidas en partes iguales por la respectiva Entidad Aseguradora de Riesgos Laborales a la cual se encuentre afiliado el empleador y con recursos del Fondo de Riesgos Laborales.',
    temas: [
      'visitas de verificacion',
      'inspeccion',
      'estandares minimos',
      'quien me visita',
      'auditoria',
    ],
  },
  {
    norma: NORMA,
    articulo: '26',
    titulo: 'Obligación del empleador de facilitar capacitación (modifica el literal g) del artículo 21 del Decreto-ley 1295 de 1994)',
    texto:
      'g) Facilitar los espacios y tiempos para la capacitación de los trabajadores a su cargo en materia de salud ocupacional y para adelantar los programas de promoción y prevención a cargo de las Administradoras de Riesgos Laborales. Parágrafo 2: referente al teletrabajo, las obligaciones del empleador en Riesgos Laborales y en el Sistema de Gestión de la Seguridad y Salud en el Trabajo SG-SST son las definidas por la normatividad vigente.',
    temas: [
      'obligacion de capacitar',
      'tiempo para capacitacion',
      'obligaciones del empleador',
      'teletrabajo',
    ],
  },
  {
    norma: NORMA,
    articulo: '27',
    titulo: 'Obligación del trabajador de cumplir las normas del SG-SST (modifica el literal d) del artículo 22 del Decreto-ley 1295 de 1994)',
    texto:
      'd) Cumplir las normas, reglamentos e instrucciones del Sistema de Gestión de la Seguridad y Salud en el Trabajo SG-SST de la empresa y asistir periódicamente a los programas de promoción y prevención adelantados por las Administradoras de Riesgos Laborales. Parágrafo: referente al teletrabajo, las obligaciones del teletrabajador en Riesgos Laborales y en el Sistema de Gestión de la Seguridad y Salud en el Trabajo SG-SST son las definidas por la normatividad vigente.',
    temas: [
      'obligaciones del trabajador',
      'que debe hacer el empleado',
      'deberes del trabajador',
    ],
  },
  {
    norma: NORMA,
    articulo: '30',
    titulo: 'Reporte de Accidente de Trabajo y Enfermedad Laboral',
    texto:
      'Cuando el Ministerio de Trabajo detecte omisiones en los reportes de accidentes de trabajo y enfermedades laborales que por ende afecte el cómputo del Índice de Lesiones Incapacitantes (ILI) o la evaluación del programa de salud ocupacional por parte de los empleadores o contratantes y empresas usuarias, podrá imponer multa de hasta mil (1.000) salarios mínimos mensuales legales vigentes, sin perjuicio de las demás multas que por otros incumplimientos pueda llegar a imponer la autoridad competente.',
    temas: [
      'no reportar accidente',
      'cuantos dias tengo para reportar',
      'plazo legal del reporte',
      'dos dias habiles',
      'omitir el reporte',
      'multa por no reportar',
      'mil smmlv',
      'ili',
    ],
  },
]
