import type { ArticuloNormativo } from './tipos'

const NORMA = 'Decreto 1295 de 1994'

/**
 * Decreto Ley 1295 de 1994 (22 de junio de 1994): determina la organización y
 * administración del Sistema General de Riesgos Profesionales —hoy Sistema
 * General de Riesgos Laborales, por el artículo 1 de la Ley 1562 de 2012—.
 * Es la norma que crea la afiliación obligatoria a la ARL, la clasificación de
 * empresas por clase de riesgo (I a V) y el régimen de cotizaciones y sanciones.
 *
 * El texto se tomó del Gestor Normativo de Función Pública
 * (https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=2629) y se
 * cotejó artículo por artículo contra la versión con vigencia expresa y control
 * de constitucionalidad de la Secretaría del Senado
 * (http://www.secretariasenado.gov.co/senado/basedoc/decreto_1295_1994.html y
 * sus continuaciones _pr001 y _pr002). Donde las dos fuentes difieren por
 * erratas de transcripción se siguió la lectura coincidente con el resto del
 * corpus (p. ej. "Resolución 2013 de 1986" y "clase III riesgo medio").
 *
 * OJO CON LA TERMINOLOGÍA: el articulado dice "riesgos profesionales",
 * "enfermedad profesional" y "salud ocupacional" porque es de 1994. La Ley 1562
 * de 2012 los renombró "riesgos laborales", "enfermedad laboral" y "seguridad y
 * salud en el trabajo". El texto se conserva literal; los `temas` traen los
 * nombres actuales para que la búsqueda funcione.
 *
 * OMITIDOS POR DEROGATORIA O SUSTITUCIÓN (no deben citarse desde esta norma):
 * - Artículos 9 y 10 (accidente de trabajo y sus excepciones): INEXEQUIBLES
 *   (Corte Constitucional, Sentencia C-858 de 2006). La definición vigente es la
 *   del artículo 3 de la Ley 1562 de 2012, ya cargada en este corpus.
 * - Artículo 11 (enfermedad profesional): INEXEQUIBLE (Sentencia C-1155 de
 *   2008). La definición vigente es la del artículo 4 de la Ley 1562 de 2012.
 * - Artículo 8 (definición de "riesgos profesionales"): vigente en el papel,
 *   pero se omite porque se apoya en las definiciones derogadas de los artículos
 *   9 y 11 y haría que el chatbot devolviera el concepto viejo.
 * - Artículo 13 (afiliados): modificado por el artículo 2 de la Ley 1562 de
 *   2012, que ya está en el corpus con el texto vigente. El Gestor Normativo lo
 *   publica con una nota editorial embebida, así que se cita la Ley 1562.
 * - Artículo 20 (ingreso base de liquidación): INEXEQUIBLE (Sentencia C-1152 de
 *   2005). Lo vigente es el artículo 5 de la Ley 1562 de 2012.
 * - Artículo 12, incisos 2 a 5 (calificación del origen): INEXEQUIBLES; solo
 *   sobrevive el inciso 1, que por sí solo no aporta a una pyme. Se omite entero.
 * - Artículos 36, 37, 39, 40, 42, 43, 45, 46, 48 a 54 (incapacidad temporal y su
 *   monto, reincorporación, incapacidad permanente parcial y su monto, invalidez,
 *   pensiones, auxilio funerario): INEXEQUIBLES (Sentencia C-452 de 2002; el 43
 *   por la C-164 de 2000). Fueron reemplazados por la Ley 776 de 2002, que NO
 *   está en este corpus: el chatbot no puede dar montos de prestaciones
 *   económicas hasta que se cargue. Aquí solo quedan los artículos 5 y 7, que
 *   enumeran las prestaciones sin fijar montos.
 * - Artículo 34 (derecho a las prestaciones): tiene apartes tachados por
 *   inexequibilidad y sus cuatro parágrafos son inexequibles; lo que sobrevive es
 *   un fragmento. Se omite para no citar un texto mutilado.
 * - Artículo 21 literal f) (registro del COPASO ante el Ministerio): derogado por
 *   el parágrafo 2 del artículo 65 de la Ley 1429 de 2010. No aparece en el
 *   artículo 21 de abajo.
 * - Artículo 16, inciso 2 (desafiliación automática por no pago): INEXEQUIBLE
 *   (Sentencia C-250 de 2004). Lo vigente sobre mora es el artículo 7 de la
 *   Ley 1562 de 2012.
 * - Artículo 28 (tabla de clasificación de actividades económicas): remite al
 *   Acuerdo 048 de 1994 del ISS, ya sustituido por el Decreto 1607 de 2002. Se
 *   omite por desactualizado.
 * - Artículo 91 numeral 2 del literal a): modificado por el artículo 13 de la
 *   Ley 1562 de 2012, que ya está en el corpus; no se repite aquí.
 *
 * OMITIDOS POR NO SER RELEVANTES PARA UNA PYME: artículos 6 y 14 (convenios con
 * EPS y seguro estudiantil), 15, 17, 19, 23, 24, 27, 29 a 33 (determinación y
 * distribución de la cotización, cobro, reclasificación y traslado de ARL),
 * 38, 41, 44, 47, 55 (trámite de calificación y suspensión de prestaciones),
 * 57 a 61 y 65 a 67 (funciones del Ministerio y de las ARL, empresas de alto
 * riesgo), 68 a 90 (dirección del sistema, Consejo Nacional, ARL, Fondo de
 * Riesgos) y 92 a 98 (mora, inembargabilidad, tributario, vigencias).
 */
export const DECRETO_1295_1994: ArticuloNormativo[] = [
  {
    norma: NORMA,
    articulo: '1',
    titulo: 'Definición',
    texto:
      'El Sistema General de Riesgos Profesionales es el conjunto de entidades públicas y privadas, normas y procedimientos, destinados a prevenir, proteger y atender a los trabajadores de los efectos de las enfermedades y los accidentes que puedan ocurrirles con ocasión o como consecuencia del trabajo que desarrollan. El Sistema General de Riesgos Profesionales establecido en este Decreto forma parte del Sistema de Seguridad Social Integral, establecido por la Ley 100 de 1993. Las disposiciones vigentes de salud ocupacional relacionadas con la prevención de los accidentes de trabajo y enfermedades profesionales y el mejoramiento de las condiciones de trabajo, con las modificaciones previstas en este Decreto, hacen parte integrante del sistema general de riesgos profesionales.',
    temas: [
      'que es el sistema de riesgos laborales',
      'arl',
      'riesgos profesionales',
      'para que sirve la arl',
      'seguridad social',
      'definicion del sistema',
    ],
  },
  {
    norma: NORMA,
    articulo: '2',
    titulo: 'Objetivos del Sistema General de Riesgos Profesionales',
    texto:
      'El Sistema General de Riesgos Profesionales tiene los siguientes objetivos: a) Establecer las actividades de promoción y prevención tendientes a mejorar las condiciones de trabajo y salud de la población trabajadora, protegiéndola contra los riesgos derivados de la organización del trabajo que puedan afectar la salud individual o colectiva en los lugares de trabajo tales como los físicos, químicos, biológicos, ergonómicos, psicosociales, de saneamiento y de seguridad. b) Fijar las prestaciones de atención de la salud de los trabajadores y las prestaciones económicas por incapacidad temporal a que haya lugar frente a las contingencias de accidente de trabajo y enfermedad profesional. c) Reconocer y pagar a los afiliados las prestaciones económicas por incapacidad permanente parcial o invalidez, que se deriven de las contingencias de accidente de trabajo o enfermedad profesional y muerte de origen profesional. d) Fortalecer las actividades tendientes a establecer el origen de los accidentes de trabajo y las enfermedades profesionales y el control de los agentes de riesgos ocupacionales.',
    temas: [
      'para que sirve la arl',
      'objetivos del sistema',
      'que cubre la arl',
      'que hace la arl por mi empresa',
      'promocion y prevencion',
    ],
  },
  {
    norma: NORMA,
    articulo: '3',
    titulo: 'Campo de aplicación',
    texto:
      'El Sistema General de Riesgos Profesionales, con las excepciones previstas en el artículo 279 de la ley 100 de 1993, se aplica a todas las empresas que funcionen en el territorio nacional, y a los trabajadores, contratistas, subcontratistas, de los sectores público, oficial, semioficial, en todos sus órdenes, y del sector privado en general.',
    temas: [
      'a quien aplica',
      'me aplica a mi empresa',
      'empresas obligadas',
      'contratistas',
      'sector privado',
      'campo de aplicacion',
    ],
  },
  {
    norma: NORMA,
    articulo: '4',
    titulo: 'Características del Sistema',
    texto:
      'El Sistema General de Riesgos Profesionales tiene las siguientes características: a) Es dirigido, orientado, controlado y vigilado por el Estado. b) Las entidades administradoras del Sistema General de Riesgos Profesionales tendrán a su cargo la afiliación al sistema y la administración del mismo. c) Todos los empleadores deben afiliarse al Sistema General de Riesgos Profesionales. d) La afiliación de los trabajadores dependientes es obligatoria para todos los empleadores. e) El empleador que no afilie a sus trabajadores al Sistema General de Riesgos Profesionales, además de las sanciones legales, será responsable de las prestaciones que se otorgan en este decreto. f) La selección de las entidades que administran el sistema es libre y voluntaria por parte del empleador. g) Los trabajadores afiliados tendrán derecho al reconocimiento y pago de las prestaciones previstas en el presente Decreto. h) Las cotizaciones al Sistema General de Riesgos Profesionales están a cargo de los empleadores. i) La relación laboral implica la obligación de pagar las cotizaciones que se establecen en este decreto. […] k) La cobertura del sistema se inicia desde el día calendario siguiente al de la afiliación. l) Los empleadores solo podrán contratar el cubrimiento de los riesgos profesionales de todos sus trabajadores con una sola entidad administradora de riesgos profesionales, sin perjuicio de las facultades que tendrán estas entidades administradoras para subcontratar con otras entidades cuando ello sea necesario. …',
    temas: [
      'debo afiliar a mis empleados',
      'quien paga la arl',
      'es obligatorio afiliar',
      'desde cuando cubre la arl',
      'puedo elegir la arl',
      'que pasa si no afilio',
      'una sola arl',
    ],
  },
  {
    norma: NORMA,
    articulo: '5',
    titulo: 'Prestaciones asistenciales',
    texto:
      'Todo trabajador que sufra un accidente de trabajo o una enfermedad profesional tendrá derecho, según sea el caso, a: a) Asistencia médica, quirúrgica, terapéutica y farmacéutica; b) Servicios de hospitalización; c) Servicio odontológico; d) Suministro de medicamentos; e) Servicios auxiliares de diagnóstico y tratamiento; f) Prótesis y órtesis, su reparación, y su reposición solo en casos de deterioro o desadaptación, cuando a criterio de rehabilitación se recomiende; g) Rehabilitaciones física y profesional; h) Gastos de traslado, en condiciones normales, que sean necesarios para la prestación de estos servicios. Los servicios de salud que demande el afiliado, derivados del accidente de trabajo o la enfermedad profesional, serán prestados a través de la Entidad Promotora de Salud a la cual se encuentre afiliado en el Sistema General de Seguridad Social en Salud, salvo los tratamientos de rehabilitación profesional y los servicios de medicina ocupacional que podrán ser prestados por las entidades administradoras de riesgos profesionales. Los gastos derivados de los servicios de salud prestados y que tengan relación directa con la atención del riesgo profesional, están a cargo de la entidad administradora de riesgos profesionales correspondiente. La atención inicial de urgencia de los afiliados al sistema, derivados de accidentes de trabajo o enfermedad profesional, podrá ser prestada por cualquier institución prestadora de servicios de salud, con cargo al sistema general de riesgos profesionales.',
    temas: [
      'que cubre la arl si hay accidente',
      'quien paga la atencion medica',
      'medicamentos',
      'hospitalizacion',
      'urgencias',
      'rehabilitacion',
      'prestaciones asistenciales',
    ],
  },
  {
    norma: NORMA,
    articulo: '7',
    titulo: 'Prestaciones económicas',
    texto:
      'Todo trabajador que sufra un accidente de trabajo o una enfermedad profesional tendrá derecho al reconocimiento y pago de las siguientes prestaciones económicas: a) Subsidio por incapacidad temporal; b) Indemnización por incapacidad permanente parcial; c) Pensión de Invalidez; d) Pensión de sobrevivientes; y, e) Auxilio funerario.',
    temas: [
      'que plata paga la arl',
      'incapacidad temporal',
      'incapacidad permanente parcial',
      'pension de invalidez',
      'auxilio funerario',
      'si se muere un trabajador',
      'prestaciones economicas',
    ],
  },
  {
    norma: NORMA,
    articulo: '16',
    titulo:
      'Obligatoriedad de las cotizaciones (el inciso 2, sobre desafiliación automática por no pago, fue declarado INEXEQUIBLE por la Sentencia C-250 de 2004)',
    texto:
      'Durante la vigencia de la relación laboral, los empleadores deberán efectuar las cotizaciones obligatorias al Sistema General de Riesgos Profesionales. […] Parágrafo. En aquellos casos en los cuales el afiliado perciba salario de dos o más empleadores, las cotizaciones correspondientes serán efectuadas en forma proporcional al salario base de cotización a cargo de cada uno de ellos.',
    temas: [
      'tengo que pagar la arl todos los meses',
      'cotizacion obligatoria',
      'quien paga la arl',
      'dos empleadores',
      'pago mensual arl',
    ],
  },
  {
    norma: NORMA,
    articulo: '18',
    titulo: 'Monto de las cotizaciones',
    texto:
      'El monto de las cotizaciones no podrá ser inferior al 0.348%, ni superior al 8.7%, de la base de cotización de los trabajadores a cargo del respectivo empleador.',
    temas: [
      'cuanto se paga de arl',
      'porcentaje de la arl',
      'tarifa minima y maxima',
      'cuanto me cuesta la arl',
      'cotizacion',
    ],
  },
  {
    norma: NORMA,
    articulo: '21',
    titulo:
      'Obligaciones del Empleador (el literal f) fue derogado por la Ley 1429 de 2010; el literal g) y el parágrafo 2 corresponden al texto del artículo 26 de la Ley 1562 de 2012)',
    texto:
      'El empleador será responsable: a) Del pago de la totalidad de la cotización de los trabajadores a su servicio; b) Trasladar el monto de las cotizaciones a la entidad administradora de riesgos profesionales correspondiente, dentro de los plazos que para el efecto señale el reglamento; c) Procurar el cuidado integral de la salud de los trabajadores y de los ambientes de trabajo; d) Programar, ejecutar y controlar el cumplimiento del programa de salud ocupacional de la empresa, y procurar su financiación; e) Notificar a la entidad administradora a la que se encuentre afiliado, los accidentes de trabajo y las enfermedades profesionales; […] g) Facilitar los espacios y tiempos para la capacitación de los trabajadores a su cargo en materia de salud ocupacional y para adelantar los programas de promoción y prevención a cargo de las Administradoras de Riesgos Laborales; h) Informar a la entidad administradora de riesgos profesionales a la que está afiliado, las novedades laborales de sus trabajadores, incluido el nivel de ingreso y sus cambios, las vinculaciones y retiros. Parágrafo. Son además obligaciones del empleador las contenidas en las normas de salud ocupacional y que no sean contrarias a este Decreto. Parágrafo 2. Referente al teletrabajo, las obligaciones del empleador en Riesgos Laborales y en el Sistema de Gestión de la Seguridad y Salud en el Trabajo SG-SST son las definidas por la normatividad vigente.',
    temas: [
      'obligaciones del empleador',
      'que debo hacer como jefe',
      'que me toca a mi',
      'responsabilidades del patron',
      'reportar accidentes a la arl',
      'novedades de nomina',
      'capacitar a los trabajadores',
    ],
  },
  {
    norma: NORMA,
    articulo: '22',
    titulo:
      'Obligaciones de los trabajadores (el literal d) corresponde al texto modificado por el artículo 27 de la Ley 1562 de 2012)',
    texto:
      'Son deberes de los trabajadores: a) Procurar el cuidado integral de su salud; b) Suministrar información clara, veraz y completa sobre su estado de salud; c) Colaborar y velar por el cumplimiento de las obligaciones contraídas por los empleadores en este Decreto; d) Cumplir las normas, reglamentos e instrucciones del Sistema de Gestión de la Seguridad y Salud en el Trabajo SG-SST de la empresa y asistir periódicamente a los programas de promoción y prevención adelantados por las Administradoras de Riesgos Laborales; e) Participar en la prevención de los riesgos profesionales a través de los comités paritarios de salud ocupacional, o como vigías ocupacionales; f) Los pensionados por invalidez por riesgos profesionales, deberán mantener actualizada la información sobre su domicilio, teléfono y demás datos que sirvan para efectuar las visitas de reconocimiento; g) Los pensionados por invalidez por riesgos profesionales, deberán informar a la entidad administradora de riesgos profesionales correspondiente, del momento en el cual desaparezca o se modifique la causa por la cual se otorgó la pensión. Parágrafo. Referente al teletrabajo, las obligaciones del teletrabajador en Riesgos Laborales y en el Sistema de Gestión de la Seguridad y Salud en el Trabajo SG-SST son las definidas por la normatividad vigente.',
    temas: [
      'obligaciones del trabajador',
      'que debe hacer el empleado',
      'deberes del empleado',
      'el trabajador tiene que cumplir',
      'teletrabajo',
      'copasst',
    ],
  },
  {
    norma: NORMA,
    articulo: '25',
    titulo: 'Clasificación de empresa',
    texto:
      'Se entiende por clasificación de empresa el acto por medio del cual el empleador clasifica a la empresa de acuerdo con la actividad principal dentro de la clase de riesgo que corresponda y aceptada por la entidad administradora en el término que determine el reglamento. Cuando una misma empresa tuviese más de un centro de trabajo, podrá tener diferentes clases de riesgo, para cada uno de ellos por separado, bajo un misma identificación, que será el número de identificación tributaria, siempre que exista diferenciación clara en la actividad que desarrollan, en las instalaciones locativas y en la exposición a factores de riesgo ocupacional.',
    temas: [
      'como se clasifica mi empresa',
      'clase de riesgo',
      'actividad principal',
      'varios centros de trabajo',
      'sucursales con distinto riesgo',
      'quien decide mi clase de riesgo',
    ],
  },
  {
    norma: NORMA,
    articulo: '26',
    titulo: 'Tabla de Clases de Riesgo',
    texto:
      'Para la Clasificación de Empresa se establecen cinco clases de riesgo: TABLA DE CLASES DE RIESGO. CLASE I: Riesgo mínimo. CLASE II: Riesgo bajo. CLASE III: Riesgo medio. CLASE IV: Riesgo alto. CLASE V: Riesgo máximo.',
    temas: [
      'clase de riesgo',
      'riesgo 1 2 3 4 5',
      'riesgo i ii iii iv v',
      'que significa riesgo 5',
      'tabla de clases de riesgo',
      'nivel de riesgo de mi empresa',
      'riesgo minimo bajo medio alto maximo',
    ],
  },
  {
    norma: NORMA,
    articulo: '35',
    titulo: 'Servicios de Prevención',
    texto:
      'La afiliación al Sistema General de Riesgos Profesionales da derecho a la empresa afiliada a recibir por parte de la entidad administradora de riesgos profesionales: a) Asesoría técnica básica para el diseño del programa de salud ocupacional en la respectiva empresa. b) Capacitación básica para el montaje de la brigada de primeros auxilios. c) Capacitación a los miembros del comité paritario de salud ocupacional en aquellas empresas con un número mayor de 10 trabajadores, o a los vigías ocupacionales en las empresas con un número menor de 10 trabajadores. d) Fomento de estilos de trabajo y de vida saludables, de acuerdo con los perfiles epidemiológicos de las empresas. Las entidades administradoras de riesgos profesionales establecerán las prioridades y plazos para el cumplimiento de las obligaciones contenidas en este artículo. Parágrafo. Los vigías ocupacionales cumplen las mismas funciones de los comités de salud ocupacional.',
    temas: [
      'que me da la arl',
      'servicios gratis de la arl',
      'asesoria de la arl',
      'capacitacion brigada',
      'primeros auxilios',
      'vigia ocupacional',
      'menos de 10 trabajadores',
    ],
  },
  {
    norma: NORMA,
    articulo: '56',
    titulo: 'Responsables de la prevención de riesgos profesionales',
    texto:
      'La Prevención de Riesgos Profesionales es responsabilidad de los empleadores. Corresponde al Gobierno Nacional expedir las normas reglamentarias técnicas tendientes a garantizar la seguridad de los trabajadores y de la población en general, en la prevención de accidentes de trabajo y enfermedades profesionales. Igualmente le corresponde ejercer la vigilancia y control de todas las actividades, para la prevención de los riesgos profesionales. Los empleadores, además de la obligación de establecer y ejecutar en forma permanente el programa de salud ocupacional según lo establecido en las normas vigentes, son responsables de los riesgos originados en su ambiente de trabajo. Las entidades administradoras de riesgos profesionales, por delegación del estado, ejercen la vigilancia y control en la prevención de los riesgos profesionales de las empresas que tengan afiliadas, a las cuales deberán asesorar en el diseño del programa permanente de salud ocupacional.',
    temas: [
      'quien es responsable de la prevencion',
      'de quien es la culpa si pasa un accidente',
      'responsabilidad del empleador',
      'la arl me asesora',
      'quien vigila mi empresa',
    ],
  },
  {
    norma: NORMA,
    articulo: '62',
    titulo: 'Información de riesgos profesionales',
    texto:
      'Los empleadores están obligados a informar a sus trabajadores los riesgos a que pueden verse expuestos en la ejecución de la labor encomendada o contratada. Todo accidente de trabajo o enfermedad profesional que ocurra en una empresa o actividad económica, deberá ser informado por el respectivo empleador a la entidad administradora de riesgos profesionales y a la entidad promotora de salud, en forma simultánea, dentro de los dos días hábiles siguientes de ocurrido el accidente o diagnosticada la enfermedad.',
    temas: [
      'en cuanto tiempo reporto un accidente',
      'plazo legal del reporte',
      'dos dias habiles',
      'reportar accidente a la arl',
      'como aviso de un accidente',
      'avisar a la eps',
      'informar riesgos al trabajador',
    ],
  },
  {
    norma: NORMA,
    articulo: '63',
    titulo: 'Comité paritario de salud ocupacional de las empresas',
    texto:
      'A partir de la vigencia del presente Decreto, el comité paritario de medicina higiene y seguridad industrial de las empresas se denominará comité paritario de salud ocupacional, y seguirá rigiéndose por la Resolución 2013 de 1986 del Ministerio de Trabajo y Seguridad Social, y demás normas que la modifiquen o adicionen, con las siguientes reformas: a) Se aumenta a dos años el período de los miembros del comité. b) El empleador se obligará a proporcionar, cuando menos, cuatro horas semanales dentro de la jornada normal de trabajo de cada uno de sus miembros para el funcionamiento del comité.',
    temas: [
      'copasst',
      'comite paritario',
      'cuanto dura el copasst',
      'cuatro horas semanales',
      'tiempo para el comite',
      'periodo de dos anos',
    ],
  },
  {
    norma: NORMA,
    articulo: '64',
    titulo:
      'Empresas de alto riesgo (texto modificado por el artículo 108 del Decreto Ley 2106 de 2019)',
    texto:
      'Las empresas pertenecientes a las clases IV y V de la tabla de clasificación de actividades económicas, de que trata el artículo 28 del Decreto ley 1295 de 1994, serán consideradas como empresas de alto riesgo.',
    temas: [
      'empresa de alto riesgo',
      'soy alto riesgo',
      'clase iv y v',
      'riesgo 4 y 5',
      'que es alto riesgo',
    ],
  },
  {
    norma: NORMA,
    articulo: '91',
    titulo:
      'Sanciones (el numeral 2 del literal a) fue modificado por el artículo 13 de la Ley 1562 de 2012 y se cita desde esa norma)',
    texto:
      'a) Para el empleador. 1. El incumplimiento de la afiliación al Sistema General de Riesgos Profesionales, le acarreará a los empleadores y responsables de la cotización, además de las sanciones previstas por el Código Sustantivo del Trabajo, la legislación laboral vigente y la ley 100 de 1993, o normas que la modifiquen, incorporen o reglamenten, la obligación de reconocer y pagar al trabajador las prestaciones consagradas en el presente Decreto. La no afiliación y el no pago de dos o más períodos mensuales de cotizaciones, le acarreará al empleador multas sucesivas mensuales de hasta quinientos (500) salarios mínimos legales mensuales vigentes. […] 5. La no presentación o extemporaneidad del informe del accidente de trabajo o de enfermedad profesional o el incumplimiento por parte del empleador de las demás obligaciones establecidas en este Decreto, la Dirección Técnica de Riesgos Profesionales del Ministerio de Trabajo y Seguridad Social, podrá imponer multas de hasta doscientos (200) salarios mínimos legales mensuales. b) Para el afiliado o trabajador. El grave incumplimiento por parte del trabajador de las instrucciones, reglamentos y determinaciones de prevención de riesgos, adoptados en forma general o específica, y que se encuentren dentro de los programas de salud ocupacional de la respectiva empresa, que le hayan comunicado por escrito, facultan al empleador para la terminación del vínculo o relación laboral por justa causa, tanto para los trabajadores privados como para los servidores públicos, previa autorización del Ministerio de Trabajo y Seguridad Social, respetando el derecho de defensa. …',
    temas: [
      'que pasa si no afilio',
      'multa por no afiliar',
      'sanciones al empleador',
      'cuanto me multan',
      '500 salarios minimos',
      'multa por no reportar accidente',
      '200 salarios minimos',
      'despido por justa causa',
    ],
  },
]
