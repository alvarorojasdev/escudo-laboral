import type { ArticuloNormativo } from './tipos'

const NORMA = 'Resolución 4272 de 2021'

/**
 * Resolución 4272 de 2021 (27 de diciembre de 2021, Ministerio del Trabajo):
 * establece los requisitos mínimos de seguridad para el desarrollo de trabajo
 * en alturas. Publicada en el Diario Oficial 51.942 del 8 de febrero de 2022;
 * según su artículo 67 rige a los seis (6) meses de su publicación.
 *
 * IMPORTANTE — POR QUÉ NO ESTÁ LA RESOLUCIÓN 1409 DE 2012:
 * su artículo 68 derogó expresamente la Resolución 1409 de 2012 (junto con las
 * Resoluciones 1903 de 2013, 3368 de 2014, 1178 de 2017 y 1248 de 2020). La
 * 1409 de 2012 ya NO está vigente y no debe citarse como norma aplicable. El
 * cambio más consultado: el umbral dejó de ser 1,50 m (1409 de 2012) y hoy el
 * trabajo en alturas se define a partir de una caída "mayor a 2.0 metros"
 * (artículo 3 de esta resolución). El artículo 68 se incluye en el corpus
 * justamente para que el chatbot pueda responder que la 1409 fue derogada.
 *
 * Texto tomado del Normograma del SENA (compilación oficial del articulado) y
 * cotejado contra el PDF del Régimen Legal de Bogotá (Secretaría Jurídica
 * Distrital). Ambas fuentes coinciden literalmente en los artículos cargados.
 *
 * Se incluyen los artículos con impacto directo en micro y pequeñas empresas.
 * Se omiten los dedicados al detalle técnico de equipos y sistemas de acceso
 * (16 a 21, 23, 25), y todo el régimen de los centros de capacitación y su
 * registro ante el Ministerio (28 a 31, 33 a 60), que aplica a los proveedores
 * del servicio, no al empresario; se conserva de ese bloque solo el artículo 32
 * porque es donde aparece el requisito de aptitud médica que la empresa debe
 * entregar.
 *
 * Convenciones de transcripción:
 * - Los recortes se marcan con '…' y nunca se reescribe el texto suprimido.
 * - Del artículo 3 se transcriben solo las definiciones más consultadas por una
 *   pyme, cada una con su texto literal, reordenadas por relevancia.
 * - Las tablas de los artículos 6 y 10 se serializan celda a celda con el
 *   formato "columna: contenido", conservando el texto literal de cada celda.
 */
export const RESOLUCION_4272_2021: ArticuloNormativo[] = [
  {
    norma: NORMA,
    articulo: '1',
    titulo: 'Objeto',
    texto:
      'Establecer los requisitos mínimos de seguridad para el desarrollo de Trabajos en Alturas (TA), y lo concerniente con la capacitación y formación de los trabajadores y aprendices en los centros de entrenamiento de Trabajo en Alturas (AT).',
    temas: [
      'trabajo en alturas',
      'norma de alturas',
      'reglamento de alturas',
      'requisitos de seguridad en alturas',
      'que norma aplica para alturas',
    ],
  },
  {
    norma: NORMA,
    articulo: '2',
    titulo: 'Ámbito de aplicación',
    texto:
      'La presente resolución aplica a todos los empleadores contratantes, contratistas, aprendices y trabajadores de todas las actividades económicas que desarrollen trabajo en alturas, así mismo a las Administradoras de Riesgos Laborales y centros de capacitación y entrenamiento de Trabajo en Alturas (TA). Parágrafo 1: se exceptúan de la aplicación de la presente resolución, las siguientes actividades: 1. Actividades de atención de emergencias y rescate. 2. Operaciones militares y policiales en acciones propias del servicio. 3. Actividades deportivas, de alta montaña o andinismo. 4. Desarrollo de actos lúdicos o artísticas. 5. Actividades realizadas sobre animales. Para realizar las actividades mencionadas, se debe llevar a cabo un proceso de identificación de peligros, valoración de riesgos e implementación de controles, siguiendo estándares nacionales o internacionales, garantizando siempre la seguridad de las personas que realizan la actividad. Parágrafo 2: si en el análisis de riesgo que realice el coordinador de trabajo en alturas o el responsable del Sistema de Gestión de la Seguridad y Salud en el Trabajo (SG-SST) de la empresa, se identifican condiciones peligrosas que puedan afectar al trabajador en el momento de una caída, tales como áreas con obstáculos, bordes peligrosos, elementos salientes, puntiagudos, sistemas energizados, máquinas en movimiento, entre otros, incluso en alturas inferiores a las establecidas en la presente resolución, se deberán garantizar las medidas de prevención y protección contra caídas necesaria para proteger al trabajador.',
    temas: [
      'a quien aplica alturas',
      'mi empresa debe cumplir alturas',
      'excepciones trabajo en alturas',
      'contratistas en alturas',
      'alturas menores a 2 metros',
      'obligatoriedad alturas',
    ],
  },
  {
    norma: NORMA,
    articulo: '3',
    titulo: 'Definiciones (trabajo en alturas, arnés, anclaje, eslinga, trabajador autorizado y coordinador)',
    texto:
      'Para los efectos de la presente resolución, se aplican las siguientes definiciones: … Trabajo en alturas: Toda actividad que realiza un trabajador que ocasione la suspensión y/o desplazamiento, en el que se vea expuesto a un riesgo de caída, mayor a 2.0 metros, con relación del plano de los pies del trabajador al plano horizontal inferior más cercano a él. Arnés de cuerpo completo: Equipo de protección personal diseñado para contener el torso y distribuir las fuerzas de la detención de caídas en al menos la parte superior de los muslos, la pelvis, el pecho y los hombros. Es fabricado en correas debidamente cosidas y aseguradas entre sí, e incluye elementos para conectar equipos y asegurarse a un punto de anclaje. Debe ser certificado bajo un estándar nacional o internacionalmente aceptado. Anclaje: Punto seguro fijo o móvil al que pueden conectarse adaptadores de anclaje o equipos personales de restricción, posicionamiento, acceso y/o de detención de caídas, capaz de soportar con seguridad las cargas aplicadas por el sistema o subsistema de protección contra caídas. Deben ser diseñado y aprobados por una persona calificada e instalados por una persona competente. Eslinga de detención de caídas: Equipo certificado, que se compone de un sistema de cuerda, reata, cable u otros materiales que cuenta con un absorbedor de energía, que permiten la unión al arnés del trabajador al punto de anclaje. Su función es detener la caída de una persona, absorbiendo la energía de la caída de modo que al trabajador se le limite la carga máxima que recibe. … Trabajador autorizado: Trabajador que ha sido designado por la organización para realizar trabajos en alturas, cuya salud fue evaluada y se le consideró apto para trabajo en alturas y que posee la constancia de capacitación y entrenamiento de trabajo en alturas o el certificado de competencia laboral para trabajo en alturas. Coordinador de trabajo en alturas: Trabajador designado por el empleador, capaz de identificar peligros en el sitio en donde se realiza trabajo en alturas, que tiene autorización para aplicar medidas correctivas inmediatas para controlar los riesgos asociados a dichos peligros. La designación del coordinador de TA no significa la creación de un nuevo cargo, ni aumento en la nómina de la empresa, esta función debe ser llevada a cabo por la persona designada por el empleador y puede ser ejecutada por supervisores o coordinadores de procesos, por el coordinador o ejecutor del Sistema de Gestión de Seguridad y Salud en el Trabajo o cualquier otro trabajador que el empleador considere adecuado para cumplir sus funciones. …',
    temas: [
      'desde que altura',
      'que es trabajo en alturas',
      'dos metros',
      'arnes',
      'punto de anclaje',
      'eslinga',
      'quien puede trabajar en alturas',
      'coordinador de alturas',
    ],
  },
  {
    norma: NORMA,
    articulo: '4',
    titulo: 'Programa de prevención y protección contra caídas de alturas',
    texto:
      'El empleador debe contar con un programa donde debe identificar las tareas de trabajo en alturas y su ubicación. En el programa de la empresa se debe identificar cada riesgo de caída en el lugar de trabajo, establecer y documentar uno o varios métodos para eliminar el trabajo en alturas a través de sistemas de ingeniería, adaptaciones de procesos, entre otros, o controlar cada riesgo de caída identificado, aplicando especialmente la jerarquización de controles contenida en el artículo 2.2.4.6.24 del Decreto 1072 de 2015 o las normas que lo modifiquen o sustituyan.',
    temas: [
      'programa de alturas',
      'programa de prevencion de caidas',
      'que debo tener para trabajar en alturas',
      'documentos de alturas',
      'obligacion del empleador alturas',
    ],
  },
  {
    norma: NORMA,
    articulo: '5',
    titulo: 'Contenido del programa de prevención y protección contra caídas',
    texto:
      'El programa de la empresa debe contener como mínimo: a) Objetivo general que establezca los lineamientos básicos para trabajo en alturas. b) Alcance del programa. c) Marco conceptual, marco legal. d) Roles y responsabilidades (se deben considerar como mínimo las responsabilidades y funciones del administrador del programa, la persona calificada, coordinador de trabajo en alturas, trabajador autorizado, ayudantes de seguridad y brigadas de emergencia para rescate en alturas). e) Requisitos de capacitación y entrenamiento para los roles definidos por la organización. f) Cronograma de cumplimiento de las actividades. g) Identificación de peligros. h) Evaluación y valoración de riesgos. i) Inventario de actividades de trabajos en alturas, con su definición de tareas rutinarias y no rutinarias. j) Procedimientos de trabajo documentados y los anexos definidos por el empleador. k) Medidas de prevención. l) Sistemas de acceso para trabajos en alturas. m) Medidas de protección. n) Procedimientos en caso de emergencias. o) Indicadores de gestión específicos alineados al Decreto 1072 de 2015.',
    temas: [
      'que lleva el programa de alturas',
      'contenido del programa de alturas',
      'como armo el programa de caidas',
      'documentos que me piden de alturas',
      'requisitos programa alturas',
    ],
  },
  {
    norma: NORMA,
    articulo: '6',
    titulo: 'Roles y responsabilidades en el programa de prevención y protección de caídas',
    texto:
      'El empleador y/o contratante debe garantizar que, dentro del programa de prevención y protección contra caídas de alturas, se establezcan los siguientes roles y responsabilidades, que no necesariamente implican nuevos cargos al interior de la organización: Tabla número 1, roles y responsabilidades en el programa de prevención y protección contra caídas. Rol: Administrador del programa de prevención y protección contra caídas de altura, de acuerdo al rol que cumple dentro de la empresa. Responsabilidad: Diseñar, administrar y asegurar el programa de prevención y protección contra caídas, conforme con la definición establecida para ello. Perfil requerido: Profesional, especialista o magíster en SST; licencia vigente en seguridad y salud en el trabajo; curso de nivel coordinador de trabajo en alturas; curso de 50 horas en SST y/o 20 horas. Rol: Persona calificada. Responsabilidad: Calcular resistencia de materiales, diseñar, analizar, evaluar, autorizar puntos de anclaje y/o estructuras para protección contra caídas; las demás definidas en la presente resolución. Perfil requerido: El perfil requerido se encuentra establecido conforme en la Ley 400 de 1997. Rol: Coordinador de trabajo en altura. Responsabilidad: Identificar peligros en el sitio en donde se realiza trabajo en alturas; aplicar medidas correctivas inmediatas para controlar los riesgos asociados a dichos peligros; las demás definidas en la presente resolución. Perfil requerido: Curso de nivel coordinador de trabajo en alturas; curso de 50 horas en SST y/o 20 horas. Rol: Trabajador autorizado. Responsabilidad: Realizar las actividades de trabajo en alturas encomendadas por el empleador y/o contratante, cumpliendo las medidas definidas en la presente resolución; las demás definidas en la presente resolución. Perfil requerido: Capacitación en el nivel trabajador autorizado, y con reentrenamiento vigente cuando aplique, de acuerdo con lo establecido en la presente resolución. Rol: Ayudante de seguridad, de acuerdo con el rol que cumple dentro de la empresa. Responsabilidad: Son los encargados de hacer cumplir que se mantengan las condiciones de seguridad en el sitio de trabajo para controlar las áreas de riesgo de caída de objetos o personas; las demás definidas en la presente resolución. Perfil requerido: Capacitación en el nivel trabajador autorizado con reentrenamiento vigente.',
    temas: [
      'coordinador de trabajo en alturas',
      'quien es el coordinador de alturas',
      'necesito contratar a alguien',
      'roles en alturas',
      'ayudante de seguridad',
      'persona calificada',
      'quien responde por alturas',
    ],
  },
  {
    norma: NORMA,
    articulo: '9',
    titulo: 'Capacitación y entrenamiento o certificación de la competencia laboral de trabajadores que realicen trabajo en alturas',
    texto:
      'Todos los trabajadores que laboren en las condiciones de riesgo de trabajo en alturas deben tener su respectivo certificado de capacitación y entrenamiento para trabajo en alturas o certificación de la competencia laboral. El trabajador que al considerar que, por su experiencia, conocimientos y desempeño en trabajo en alturas, no requiere realizar la capacitación y entrenamiento en trabajo en alturas podrá optar por la evaluación de estos conocimientos y desempeño a través de un organismo certificador de competencias laborales. La vigencia del certificado de competencia laboral en ningún momento exime al trabajador de realizar los reentrenamientos para conservar su calidad de trabajador autorizado. Los procesos de capacitación y entrenamiento y gestión de los centros de entrenamiento se regirán con lo establecido en el Título III de la presente resolución. Parágrafo: las necesidades y contenidos específicos del Programa de Prevención y Protección contra caídas en alturas deben estar incluidos en los programas de capacitación de la empresa; así mismo, deben ser informados al centro de capacitación y entrenamiento para que se realicen los refuerzos específicos en las temáticas acorde al contenido mínimo que se define en la presente resolución.',
    temas: [
      'certificado de alturas',
      'curso de alturas obligatorio',
      'quien puede trabajar en alturas',
      'certificacion de competencia laboral',
      'necesita curso para subir',
      'reentrenamiento',
    ],
  },
  {
    norma: NORMA,
    articulo: '10',
    titulo: 'Personas objeto de la capacitación y entrenamiento (niveles y horas)',
    texto:
      'Se deben capacitar y entrenar en trabajo en alturas los siguientes roles: Tabla número 2, capacitación y entrenamiento de acuerdo con los roles. Rol: Jefes de área para trabajos en alturas. Personal objeto: Personas que tomen decisiones administrativas en relación con la aplicación de esta resolución en empresas en las que se haya identificado como prioritario el riesgo de caída por trabajo en altura. Duración: Mínimo 8 horas. Rol: Trabajador autorizado. Personal objeto: Trabajadores que realizan trabajo en alturas y aprendices de las instituciones de capacitación y educación para el trabajo y el SENA, quienes deben ser formados y entrenados por la misma institución, cuando cursen programas cuya práctica implique riesgo de caída en alturas. Duración: Mínimo 32 horas. Rol: Coordinador de trabajo en alturas. Personal objeto: Personal encargado de controlar los riesgos en los lugares de trabajo donde se realiza trabajo en alturas. Duración: Mínimo 80 horas. Rol: Entrenador en trabajo en alturas. Personal objeto: Encargado de entrenar jefes de área para trabajos en alturas, trabajadores autorizados, coordinadores de trabajo en alturas y entrenadores de trabajo en alturas. Duración: Mínimo 130 horas. Parágrafo 2: la capacitación y entrenamiento de nivel coordinador permite cubrir los requisitos iniciales de capacitación y entrenamiento para realizar tareas del nivel de trabajador autorizado, por lo tanto, para continuar desempeñándose como persona autorizada deberá cumplir los reentrenamientos en las periodicidades y situaciones contempladas en la presente resolución. …',
    temas: [
      'cuantas horas dura el curso de alturas',
      'quien debe hacer el curso',
      'niveles de alturas',
      '32 horas',
      '80 horas coordinador',
      'curso jefe de area',
      'cuanto cuesta el curso de alturas',
    ],
  },
  {
    norma: NORMA,
    articulo: '11',
    titulo: 'Oferta de capacitación y entrenamiento en trabajo en alturas (quién puede dictar el curso)',
    texto:
      'Los programas de capacitación y entrenamiento para trabajo en alturas, en los niveles jefes de área para trabajos en alturas, trabajador autorizado y coordinador de TA, se podrán ofertar por las siguientes instituciones, observando los requisitos aquí establecidos: a) El Servicio Nacional de Aprendizaje (Sena). b) Empleadores o empresas, utilizando el mecanismo de capacitación de las Unidades Vocacionales de Aprendizaje (UVAE). c) Instituciones de Educación Superior debidamente aprobadas por el Ministerio de Educación Nacional. d) Personas Naturales y Jurídicas con Licencia en Seguridad y Salud en el Trabajo. e) Instituciones de Formación para el Trabajo y Desarrollo Humano con certificación en sistemas de gestión de la calidad para instituciones de formación para el trabajo y, f) Cajas de Compensación Familiar. Los proveedores del servicio de capacitación y entrenamiento de trabajo en alturas deben contar con entrenadores de trabajo en alturas debidamente capacitados y entrenados conforme a la normatividad vigente. Parágrafo: todas las empresas o los gremios en convenio con estas podrán implementar, a través de Unidades Vocacionales de Aprendizaje (UVAE), procesos de capacitación y entrenamiento para trabajo en alturas, en el nivel que corresponda a las labores a desempeñar. Las empresas o los gremios en convenio con estas deben informar al Ministerio de Trabajo, a la Dirección de Movilidad y Capacitación para el Trabajo o quien haga sus veces, la creación de las unidades.',
    temas: [
      'donde hago el curso de alturas',
      'quien puede dictar el curso',
      'certificado falso de alturas',
      'sena alturas',
      'caja de compensacion curso',
      'centro de entrenamiento autorizado',
    ],
  },
  {
    norma: NORMA,
    articulo: '13',
    titulo: 'Medidas colectivas de prevención',
    texto:
      'Su selección e implementación depende del tipo de actividad económica y de la viabilidad técnica de su utilización en el medio y según la tarea específica a realizar. Cuando por razones del desarrollo de la labor, el trabajador deba ingresar al área o zona de peligro demarcada con riesgo de caída en alturas, es obligatorio el uso de equipos de protección personal y aplicar los controles necesarios para su protección. Siempre se debe informar, entrenar y capacitar a los trabajadores sobre cualquier medida que se aplique. Dentro de las principales medidas colectivas de prevención están: a) Delimitación del área: La delimitación de la zona de peligro de caída del trabajador se hará mediante cuerdas, cables, vallas, cadenas, cintas, reatas, bandas, conos, balizas, mallas escombreras, redes o banderas, de cualquier tipo de material, de color amarillo y negro combinados. Se debe garantizar su visibilidad de día y de noche. … b) Línea de advertencia: Debe cumplir con los siguientes requisitos: i) Debe ser colocada a lo largo de todos los lados desprotegidos. ii) Debe estar colocada a 1,80 metros de distancia del borde desprotegido o más. iii) Debe resistir fuerzas horizontales de mínimo 8 kg, y iv) Debe contar con banderines de colores visibles separados a intervalos inferiores a 1,80 metros. … c) Señalización del área: Medida de prevención que incluye entre otros, avisos informativos que indican con letras o símbolos gráficos el peligro de caída de personas y objetos; también debe incluir un sistema de demarcación que rodee completamente el perímetro, excepto en las entradas y salidas según sea necesario para el ingreso y salida de personas o materiales. La señalización debe estar visible para cualquier persona, en idioma español y en el idioma de los trabajadores extranjeros que ejecuten labores en la empresa. d) Barandas: Medida de prevención que pueden ser portátiles o fijas y también, ser permanentes o temporales según la tarea que se desarrolle. Las barandas fijas siempre deben quedar ancladas a la estructura propia del área de trabajo en alturas. …',
    temas: [
      'medidas de prevencion de caidas',
      'como prevenir caidas',
      'delimitar el area',
      'barandas',
      'senalizacion de alturas',
      'linea de advertencia',
    ],
  },
  {
    norma: NORMA,
    articulo: '15',
    titulo: 'Permiso de trabajo en alturas',
    texto:
      'Todos los trabajos en alturas deben obedecer a una acción planificada, organizada y ejecutada por trabajadores autorizados que debe verse reflejada en los controles administrativos como el Permiso de trabajo o sus anexos. Siempre que un trabajador ingrese a una zona de peligro, debe contar con la debida autorización y si requiere exponerse al riesgo de caídas, debe contar con un aval a través de un permiso de trabajo en alturas acompañado de una lista de chequeo, más aún en caso de que no haya barandas, sistemas de control de acceso, demarcación o sistemas de barreras físicas que cumplan con las especificaciones descritas en la presente Resolución. El empleador o contratante debe implementar un procedimiento para los permisos de trabajo, previo al inicio del trabajo en alturas. El formato de permiso de trabajo debe contener como mínimo lo siguiente: Nombre(s) del(los) trabajador(es). 1. Tipo de trabajo. 2. Altura aproximada a la cual se va a desarrollar la actividad. 3. Fecha y hora de inicio y de terminación de la tarea. 4. Verificación de la afiliación vigente a la seguridad social. 5. Requisitos del trabajador (requerimientos de aptitud). 6. Descripción y procedimiento de la tarea. 7. Medidas de prevención contra caídas. 8. Equipos, sistema de acceso para trabajo en alturas. 9. Verificación de los puntos de anclaje por cada trabajador. 10. Sistemas de restricción, posicionamiento o detención de caídas a utilizar. 11. Elementos de protección personal seleccionados por el empleador teniendo en cuenta los riesgos y requerimientos propios de la tarea, conforme a lo dispuesto en la presente Resolución. 12. Herramientas a utilizar. 13. Constancia de capacitación o certificado de competencia laboral para prevención para caídas en trabajo en alturas. 14. Observaciones. 15. Nombres y apellidos, firmas, clase de documento y número de los documentos de identificación de los trabajadores. 16. Nombre, apellido y firma de la persona que autoriza el trabajo. 17. Nombre y firma de la persona responsable de activar el plan de emergencias y, 18. Nombre, apellido y firma del coordinador de trabajos en alturas (cuando es diferente de la persona que autoriza el trabajo). … Parágrafo 3: este permiso de trabajo en alturas debe ser diligenciado, por el(los) trabajador(es) o por el empleador y debe ser revisado y suscrito por el coordinador de trabajo en alturas en cada evento.',
    temas: [
      'permiso de trabajo',
      'permiso de trabajo en alturas',
      'formato de permiso',
      'quien firma el permiso',
      'que lleva el permiso de alturas',
      'lista de chequeo alturas',
    ],
  },
  {
    norma: NORMA,
    articulo: '22',
    titulo: 'Medidas de protección contra caídas en alturas',
    texto:
      'El empleador o contratante debe definir las medidas de protección a ser utilizadas en cada sitio de trabajo donde exista por lo menos una persona trabajando en alturas ya sea de manera rutinaria o no rutinaria, estas medidas deben estar acordes con la actividad económica y tareas que la componen. El uso de medidas de protección no exime al empleador de su obligación de implementar medidas de prevención previas. Deben estar identificadas y deben ser incorporadas al programa de prevención y protección contra caídas y estar acorde con los requisitos establecidos en la presente Resolución. El conjunto de acciones individuales o colectivas que se implementan para detener la caída de personas y objetos deberán cumplir como mínimo con las siguientes características: 1. Los elementos o equipos de los sistemas de protección contra caídas deben ser certificados y compatibles entre sí en tamaño, figura, materiales, forma, diámetro. 2. Los equipos de protección contra caídas se deben seleccionar y usar según las necesidades determinadas para un trabajador, las condiciones, tipo de la tarea y los sistemas de acceso a utilizar. Todo sistema seleccionado debe: garantizar la seguridad del trabajador al momento de una caída, permitir la distribución de fuerza, amortiguar la fuerza de impacto, garantizar la resistencia de los componentes y estar protegido ante la corrosión o ser aislantes eléctricos, antiestáticos o ignífugos cuando se requieran brindando las demás protecciones a los riesgos asociados que sean requeridas. … Parágrafo 1: todo sistema y/o equipo sometido a una caída debe ser retirado de la operación y no podrá volver a ser utilizado hasta que sea avalado por el fabricante o por una persona calificada; en el caso de los dispositivos retráctiles u otros equipos cuya restauración está prevista en las normas técnicas nacionales o en su defecto, en las normas internacionales y/o de acuerdo con las recomendaciones del fabricante podrán ser enviados a reparación por el fabricante o uno de sus representantes autorizados para tal fin.',
    temas: [
      'medidas de proteccion contra caidas',
      'equipos certificados',
      'que pasa si el arnes se cayo',
      'proteccion contra caidas',
      'equipo despues de una caida',
    ],
  },
  {
    norma: NORMA,
    articulo: '24',
    titulo: 'Elementos de protección personal para trabajo en alturas',
    texto:
      'Los elementos de protección personal son el último control y deben ser usados en conjunto con otras medidas de prevención y control de acuerdo con la jerarquización de controles aplicables a la prevención y la protección contra caídas establecida por el Decreto 1072 de 2015 y la presente Resolución. Los elementos de protección personal deben estar certificados (cuando existan normas que apliquen al EPP específico) y suministrados por el empleador. Serán seleccionados de acuerdo con lo establecido en el Sistema de Seguridad y Salud en el Trabajo, incluidos los protocolos de bioseguridad definidos en los programas de vigilancia epidemiológica. Los equipos y EPP que correspondan deberían poseer como mínimo: registro inspección pre uso; ficha técnica; hoja de vida; certificado de conformidad.',
    temas: [
      'epp para alturas',
      'quien paga el arnes',
      'elementos de proteccion personal',
      'hoja de vida del equipo',
      'certificado de conformidad',
      'arnes certificado',
    ],
  },
  {
    norma: NORMA,
    articulo: '26',
    titulo: 'Plan de emergencias',
    texto:
      'Todo empleador y/o contratante que dentro de sus riesgos cotidianos tenga incluido el de caída por trabajo en alturas, debe incluir dentro del plan de prevención, preparación y respuesta ante emergencias establecido en el numeral 12 del artículo 2.2.4.6.12 y el articulo 2.2.4.6.25 del Decreto 1072 de 2015, un capítulo escrito de trabajo en alturas que debe ser practicado y verificado, acorde con las actividades que se ejecuten y que garantice una respuesta organizada y segura ante cualquier incidente o accidente que se pueda presentar en el sitio de trabajo, incluido un plan de rescate; para su ejecución puede hacerlo con recursos propios o contratados. Se debe garantizar que el personal destinado para la atención de emergencias en cada actividad haya participado en la práctica de simulacros y la verificación del mismo. En el plan de rescate, diseñado acorde con los riesgos de la actividad en alturas desarrollada, se deben asignar equipos de rescate certificados para toda la operación y contar con brigadistas o personal capacitados para tal fin. Se dispondrá para la atención de emergencias y para la prestación de primeros auxilios de: botiquín, elementos para inmovilización y atención de heridas, hemorragias y demás elementos que el empleador considere necesarios de acuerdo con el nivel de riesgo. El empleador debe asegurar que el trabajador que desarrolla trabajo en alturas cuente con una persona de apoyo disponible para que, de ser necesario, reporte de inmediato y active el plan de emergencias. Parágrafo: las empresas podrán compartir recursos para implementar el plan de emergencias dentro de los planes de ayuda mutua.',
    temas: [
      'plan de emergencias alturas',
      'plan de rescate',
      'brigada de emergencia',
      'botiquin',
      'que hago si alguien se cae',
      'simulacro',
    ],
  },
  {
    norma: NORMA,
    articulo: '27',
    titulo: 'Contenidos de los programas de capacitación (numeral 4: reentrenamiento de trabajadores en alturas)',
    texto:
      '… 4. Reentrenamiento de trabajadores en alturas: Proceso de formación complementaria con el propósito de reforzar el conocimiento, las habilidades y las destrezas en el desarrollo de trabajo en alturas, todos los trabajadores autorizados deben ser reentrenados por el empleador o contratante. El reentrenamiento se realizará una vez el trabajador se vincule nuevo a la empresa o proyecto, la responsabilidad de su capacitación y entrenamiento estará a cargo del empleador o contratante como parte de la inducción laboral. No podrá exigirse al trabajador el reentrenamiento por su cuenta. El costo estará a cargo del empleador o contratante. El empleador o contratante, deberá reportar a su respectiva ARL, el nombre, documento de identidad de los trabajadores reentrenados, fecha del reentrenamiento y el oferente de capacitación y entrenamiento que realizó la formación. El reentrenamiento no será otro nivel de formación, pero sí un requisito del empleador para mantener activo a los trabajadores que se desempeñan en trabajo en altura. El reentrenamiento se realizará cuando se presente alguna de las siguientes condiciones: a) Cuando cambien las condiciones técnicas, tecnológicas o laborales del trabajador o cuando dentro de la empresa donde labora cambie: su actividad de trabajo en altura; los procedimientos; las técnicas de trabajo o la tecnología de los equipos o los procesos; las actividades laborales del trabajador que se desempeña en altura. También aplica cuando ingrese como nuevo trabajador a la empresa. En estos casos el empleador, como parte de la reinducción, previo al inicio de la nueva actividad, deberá capacitar al trabajador con un oferente autorizado por el Ministerio del Trabajo, de forma presencial con una duración mínima de 8 horas, de ellas el 20% será teórica y el 80% práctica. … b) Reentrenamiento como medida de actualización de trabajadores: Se impartirá a un trabajador certificado como trabajador autorizado, habiendo laborado dentro de la misma empresa, ni cambiado de actividad, en los últimos dieciocho (18) meses. Este reentrenamiento tendrá una duración de mínimo 8 horas, de las cuales el 20% serán de teoría y el 80% de práctica. …',
    temas: [
      'cada cuanto se renueva',
      'reentrenamiento alturas',
      'vencimiento del certificado de alturas',
      'cada cuanto el curso de alturas',
      'dieciocho meses',
      'quien paga el reentrenamiento',
      'trabajador nuevo alturas',
    ],
  },
  {
    norma: NORMA,
    articulo: '32',
    titulo: 'Requisitos previos a la prestación del servicio de capacitación y entrenamiento en trabajo en alturas (aptitud médica)',
    texto:
      'El proveedor del servicio de capacitación y entrenamiento, previo a prestar el servicio debe asegurar y verificar que el aspirante o solicitante entregue la siguiente información: a) Datos personales (nombre, identificación, empresa, labor que desarrolla), nivel de lectoescritura, nivel de formación, hemoclasificación (grupo sanguíneo y factor RH), alergias, consumo reciente de medicamentos, lesiones recientes, enfermedades actuales, persona de contacto en caso de emergencia. b) Afiliación vigente al Sistema de Seguridad Social en Salud en cualquiera de sus regímenes, o a un régimen exceptuado o especial en salud. En todo caso, los trabajadores dependientes e independientes deben certificar su afiliación y pago a los sistemas de seguridad social que correspondan según la normatividad vigente. c) Copia del certificado de aptitud médica que certifique que el trabajador o aprendiz cumple con las condiciones de salud para desarrollar trabajo en alturas y conforme a lo establecido en las Resoluciones 2346 de 2007 y 1918 de 2009 expedidas por el Ministerio de la Protección Social o las normas que las modifiquen, sustituyan o adicionen. d) Cuando se trate de procesos de reentrenamiento, el oferente deberá solicitar al empleador, último pago de seguridad social vigente, copia del certificado de aptitud médica realizado al trabajador y copia del certificado del proceso de capacitación y entrenamiento de trabajador autorizado (o anterior nivel avanzado). Asegurando que estos hacen parte del cumplimiento normativo por parte del empleador. e) Demás establecidos por el centro de capacitación y entrenamiento.',
    temas: [
      'examen medico para alturas',
      'certificado de aptitud medica',
      'apto para trabajo en alturas',
      'que piden para el curso de alturas',
      'requisitos para el curso',
      'examenes ocupacionales alturas',
    ],
  },
  {
    norma: NORMA,
    articulo: '61',
    titulo: 'Obligaciones del empleador',
    texto:
      'Todo empleador que tenga trabajadores que realicen tareas de trabajo en altura como mínimo debe: a) Enviar al trabajador a las evaluaciones médicas ocupacionales conforme a lo establecido en la normatividad vigente. b) Incluir en el Sistema de Gestión de la Seguridad y Salud en el Trabajo (SG-SST), el programa de prevención y protección contra caídas en altura de conformidad con lo establecido en la presente resolución. c) Disponer y mantener un administrador del programa de prevención y protección contra caídas de altura y un coordinador de trabajo en alturas. d) Suministrar al trabajador que realice actividades de trabajo en altura, los elementos necesarios y la capacitación requerida para el cumplimiento de sus funciones, roles y responsabilidades conforme a lo establecido en esta resolución, en ningún caso se podrá generar costo al trabajador. e) Verificar que los procesos de capacitación y entrenamiento sean realizados por proveedores autorizados por el Ministerio del Trabajo y que estos cumplan con la intensidad horaria establecida en los programas de formación, conforme con lo establecido en la presente resolución. f) Garantizar la divulgación de las actividades y/o los procedimientos de trabajo en alturas, a todo trabajador que las vaya a realizar. La divulgación deberá ser antes de iniciar labores. g) Constatar que los equipos y sistemas usados en prevención y protección contra caídas sean inspeccionados por lo menos una vez al año o con la periodicidad indicada por el fabricante, conforme a lo establecido en esta resolución. h) Conservar los registros de las revisiones y del mantenimiento que se practiquen a los sistemas o equipos utilizados para la realización de trabajos en altura. i) Desarrollar los planes de prevención, preparación y respuesta ante emergencias y procedimientos de rescate en alturas documentados y disponer de recursos humanos, técnicos y equipos, necesarios para asegurar la respuesta en eventos de emergencia acorde a lo establecido en la presente resolución. j) Garantizar que los menores de edad y las mujeres embarazadas en cualquier tiempo de gestación no realicen trabajo en altura. k) Verificar que sus contratistas cumplan con lo establecido en la presente resolución, incluyendo su Sistema de Gestión de la Seguridad y Salud en el Trabajo SG-SST. Supervisar la aplicación de los procedimientos, las medidas de seguridad y salud de los trabajadores y contratistas. El empleador será solidario en los accidentes que se llegaran a ocasionar por la no implementación de las medidas descritas por parte de sus contratistas. …',
    temas: [
      'obligaciones del empleador alturas',
      'obligaciones de la empresa con los empleados en alturas',
      'que debo hacer como empresa',
      'quien paga el curso de alturas',
      'embarazadas y menores en alturas',
      'inspeccion de equipos cada ano',
      'responsabilidad por contratistas',
      'examenes medicos alturas',
    ],
  },
  {
    norma: NORMA,
    articulo: '62',
    titulo: 'Obligaciones de los trabajadores',
    texto:
      'Cualquier trabajador que desempeñe labores en altura debe: a) Asistir y aprobar a las capacitaciones y reentrenamientos programadas por el empleador o contratante. b) Cumplir todos los procedimientos de Seguridad y Salud en el Trabajo establecidos por el empleador o contratante. c) Informar al empleador o contratante a través de quien haya sido designado, sobre cualquier condición de salud que le pueda generar restricciones, antes de realizar cualquier tipo de trabajo en altura. d) Utilizar las medidas de prevención y protección contra caídas que sean implementadas por el empleador o contratante y que cumplan con lo establecido en la presente resolución. e) Reportar al coordinador de trabajo en altura el deterioro, mal estado, o daño de los sistemas individuales o colectivos de prevención y protección contra caídas. f) Participar en la elaboración y el diligenciamiento del permiso de trabajo en altura, así como acatar las disposiciones del mismo. g) Conocer los peligros y controles que se han definido para realizar el trabajo en altura, así como las acciones requeridas en caso de emergencia. h) Garantizar su seguridad y salud y la de otras personas que puedan verse afectadas por sus actos u omisiones en el trabajo.',
    temas: [
      'obligaciones del trabajador alturas',
      'que debe hacer el empleado',
      'deberes del trabajador en alturas',
      'si el trabajador no usa el arnes',
      'reportar equipo danado',
    ],
  },
  {
    norma: NORMA,
    articulo: '63',
    titulo: 'Obligaciones de las Administradoras de Riesgos Laborales (ARL)',
    texto:
      'Las Administradoras de Riesgos Laborales, que tengan afiliadas empresas en las que exista el riesgo de caída por trabajo en altura, dentro de las obligaciones que le confiere los artículos 56, 59 y 80 del Decreto 1295 de 1994 o normas aplicables, deberán: a) Realizar actividades de prevención, asesoría y evaluación de riesgos de trabajo en altura de acuerdo a la presente resolución. b) Llevar registros de todos los trabajadores afiliados a la ARL, que son expuestos al riesgo de caída por trabajo en alturas, por sus aportantes. c) Llevar registros de la accidentalidad que se genere por trabajos en alturas, de todos los afiliados a esta, por los aportantes de distintos sectores y reportarlo al Ministerio del Trabajo. d) Ejercer la vigilancia y control en la prevención de los riesgos de trabajo en alturas conforme a lo establecido en la presente resolución. e) Participar, en la investigación de accidentes de trabajo de sus afiliados, relacionados con trabajos en alturas que, por su complejidad y consecuencia grave en el trabajador, requiera la revisión de la competencia obtenida por este, a través del proceso de capacitación y entrenamiento en trabajo en alturas impartido por el oferente y que debió ser verificado por su aportante. f) Asesorar a los empleadores, en la compra y adquisición de los elementos requeridos para la protección personal para trabajo en altura. g) Elaborar, publicar y divulgar guías técnicas por actividades económicas para la aplicación de la presente resolución, las cuales deben ser revisadas y autorizadas por el Ministerio del Trabajo.',
    temas: [
      'que me da la arl para alturas',
      'obligaciones de la arl',
      'asesoria de la arl',
      'guias tecnicas por sector',
      'quien me asesora en alturas',
    ],
  },
  {
    norma: NORMA,
    articulo: '68',
    titulo: 'Derogatoria (deroga la Resolución 1409 de 2012)',
    texto:
      'La presente resolución deroga las disposiciones que le sean contrarias, en especial, las siguientes Resoluciones: Resolución 1409 de 2012, Resolución 1903 de 2013, Resolución 3368 de 2014, Resolución 1178 de 2017 y Resolución 1248 de 2020.',
    temas: [
      'resolucion 1409 sigue vigente',
      'norma derogada alturas',
      'que norma reemplazo la 1409',
      'norma vigente de alturas',
      'cambio de 1.50 a 2 metros',
    ],
  },
]
