import type { ArticuloNormativo } from './tipos'

const NORMA = 'Resolución 0312 de 2019'

/**
 * Resolución 0312 de 2019 del Ministerio del Trabajo (13 de febrero de 2019):
 * Estándares Mínimos del Sistema de Gestión de Seguridad y Salud en el Trabajo.
 * Deroga la Resolución 1111 de 2017.
 *
 * Las tablas de estándares (artículos 3, 9 y 16), la tabla de valores (27) y la
 * tabla de indicadores (30) están condensadas en prosa, conservando cifras,
 * plazos y porcentajes tal como aparecen en la norma.
 */
export const RESOLUCION_0312_2019: ArticuloNormativo[] = [
  {
    norma: NORMA,
    articulo: '1',
    titulo: 'Objeto',
    texto:
      'La presente Resolución tiene por objeto establecer los Estándares Mínimos del Sistema de Gestión de Seguridad y Salud en el Trabajo SG-SST para las personas naturales y jurídicas señaladas en el artículo 2° de este Acto Administrativo. Los presentes Estándares Mínimos corresponden al conjunto de normas, requisitos y procedimientos de obligatorio cumplimiento de los empleadores y contratantes, mediante los cuales se establecen, verifican y controlan las condiciones básicas de capacidad técnico-administrativa y de suficiencia patrimonial y financiera indispensables para el funcionamiento, ejercicio y desarrollo de actividades en el Sistema de Gestión de SST.',
    temas: ['objeto', 'que es la resolucion 0312', 'estandares minimos', 'para que sirve'],
  },
  {
    norma: NORMA,
    articulo: '2',
    titulo: 'Campo de aplicación',
    texto:
      'La presente Resolución se aplica a los empleadores públicos y privados, a los contratantes de personal bajo modalidad de contrato civil, comercial o administrativo, a los trabajadores dependientes e independientes, a las organizaciones de economía solidaria y del sector cooperativo, a las agremiaciones o asociaciones que afilian trabajadores independientes al Sistema de Seguridad Social Integral, a las empresas de servicios temporales, a los estudiantes afiliados al Sistema General de Riesgos Laborales y los trabajadores en misión; a las administradoras de riesgos laborales; a la Policía Nacional en lo que corresponde a su personal no uniformado y al personal civil de las Fuerzas Militares. Parágrafo 2: no están obligados a implementar estos Estándares Mínimos los trabajadores independientes con afiliación voluntaria al Sistema General de Riesgos Laborales.',
    temas: ['a quien aplica', 'campo de aplicacion', 'quienes deben cumplir', 'obligatorio', 'independientes'],
  },
  {
    norma: NORMA,
    articulo: '3',
    titulo: 'Estándares Mínimos para empresas, empleadores y contratantes con diez (10) o menos trabajadores',
    texto:
      'Las empresas, empleadores y contratantes con diez (10) o menos trabajadores clasificadas con riesgo I, II ó III deben cumplir con siete (7) Estándares Mínimos: (1) Asignación de una persona que diseña el Sistema de Gestión de SST, que puede ser un técnico en SST con licencia vigente, mínimo un (1) año de experiencia certificada y curso virtual de cincuenta (50) horas, o bien tecnólogo, profesional o profesional con posgrado en SST con licencia vigente y el mismo curso. (2) Afiliación al Sistema de Seguridad Social Integral en Salud, Pensión y Riesgos Laborales. (3) Capacitación en SST: elaborar y ejecutar programa o actividades de capacitación en promoción y prevención que incluya como mínimo los peligros/riesgos prioritarios y las medidas de prevención y control. (4) Plan Anual de Trabajo firmado por el empleador o contratante, que identifique como mínimo objetivos, metas, responsabilidades, recursos y cronograma anual. (5) Evaluaciones médicas ocupacionales de acuerdo con la normatividad y los peligros/riesgos a los que esté expuesto el trabajador. (6) Identificación de peligros, evaluación y valoración de los riesgos con el acompañamiento de la ARL. (7) Medidas de prevención y control frente a los peligros/riesgos identificados, ejecutadas con base en esa identificación y valoración.',
    temas: ['cuantos estandares', 'empresa pequena', '10 o menos trabajadores', 'diez trabajadores', 'riesgo i ii iii', 'siete estandares', 'microempresa', 'que me exigen'],
  },
  {
    norma: NORMA,
    articulo: '4',
    titulo: 'Responsables del diseño e implementación del Sistema de Gestión de SST para empresas con diez (10) o menos trabajadores',
    texto:
      'El diseño del Sistema de Gestión de SST para empresas de diez (10) o menos trabajadores clasificadas con riesgo I, II ó III podrá ser realizado por técnicos en SST o en alguna de sus áreas, con licencia vigente en SST, que acrediten mínimo un (1) año de experiencia certificada y la aprobación del curso de capacitación virtual de cincuenta (50) horas en SST. También podrá ser desarrollado por tecnólogos en SST, profesionales en SST y profesionales con posgrado en SST, con licencia vigente y el mencionado curso. Las personas que solo cuentan con el curso virtual de cincuenta (50) horas están facultadas para administrar y ejecutar el Sistema de Gestión en empresas de diez (10) o menos trabajadores de riesgo I, II ó III, pero no pueden diseñar dicho sistema.',
    temas: ['quien puede disenar el sg-sst', 'tecnico sst', 'licencia sst', 'curso 50 horas', 'requisitos del responsable'],
  },
  {
    norma: NORMA,
    articulo: '5',
    titulo: 'Apoyo, asesoría y capacitación para empresas con diez (10) o menos trabajadores y unidades de producción agropecuaria',
    texto:
      'Las empresas de diez (10) o menos trabajadores y las unidades de producción agropecuaria con diez (10) o menos trabajadores permanentes pueden contar con apoyo y asesoría para el diseño y ejecución del Sistema de Gestión de SST de: los consultorios en riesgos laborales de instituciones educativas con programas en SST, que pueden asesorar y capacitar de manera gratuita bajo supervisión de un docente con licencia en SST; los gremios, cámaras de comercio, asociaciones de agricultores y de distintos sectores, sociedades científicas, universidades, fundaciones, organismos internacionales e instituciones de educación formal y para el trabajo, de manera gratuita y con personal licenciado en SST; y las empresas contratantes que tengan contratistas de diez (10) o menos trabajadores en sus sedes, siempre que cuenten con personal profesional con posgrado en SST, licencia vigente y el curso virtual de cincuenta (50) horas.',
    temas: ['ayuda gratis', 'asesoria gratuita', 'quien me puede asesorar', 'camaras de comercio', 'consultorios universitarios'],
  },
  {
    norma: NORMA,
    articulo: '6',
    titulo: 'Responsabilidades de las Administradoras de Riesgos Laborales para empresas con diez (10) o menos trabajadores',
    texto:
      'Las Administradoras de Riesgos Laborales deberán brindar a las empresas con diez (10) o menos trabajadores y unidades de producción agropecuaria con diez (10) o menos trabajadores permanentes asesoría, asistencia y acompañamiento técnico como mínimo en: apoyar, capacitar, asesorar y acompañar técnicamente de manera presencial para mantener actualizada la identificación de peligros y la ejecución de las medidas de prevención y control; capacitación para implementar los Estándares Mínimos; fomento de estilos de trabajo y de vida saludables; capacitación para la atención de emergencias básicas (primeros auxilios, contra incendios y evacuación); capacitación, asesoría y acompañamiento en investigación de accidentes de trabajo y enfermedades laborales con personal con licencia vigente en SST; diseño y asesoría en la implementación de áreas, puestos de trabajo, maquinarias, equipos y herramientas; asesoría técnica para estudios evaluativos de higiene ocupacional o industrial; campañas de identificación y control de peligros y vigilancia epidemiológica; y promoción y divulgación de programas de medicina laboral, higiene y seguridad industrial.',
    temas: ['que hace la arl', 'obligaciones de la arl', 'asesoria arl', 'acompanamiento arl', 'que me debe dar la arl'],
  },
  {
    norma: NORMA,
    articulo: '7',
    titulo: 'Estándares mínimos para Unidades de Producción Agropecuaria con diez (10) o menos trabajadores de forma permanente clasificadas con riesgo I, II ó III',
    texto:
      'Los estándares mínimos en las unidades de producción agropecuaria con diez (10) o menos trabajadores de forma permanente, clasificadas con riesgo I, II ó III y sin consideración del régimen de tenencia ni condición jurídica son: identificar los peligros en el marco de los procesos productivos de la unidad, evaluar y valorar los riesgos y establecer los respectivos controles; desarrollar actividades enfocadas a prevenir la presencia de accidentes de trabajo o enfermedades laborales; y proteger la seguridad y salud de todas las personas que desarrollan actividades productivas en la unidad. Se entiende por unidad de producción agropecuaria el predio o predios utilizados total o parcialmente para actividades agrícolas, forestales, pecuarias, pesqueras o acuícolas.',
    temas: ['finca', 'agropecuario', 'agricola', 'unidad de produccion', 'campo', 'ganaderia'],
  },
  {
    norma: NORMA,
    articulo: '8',
    titulo: 'Estándares Mínimos para empresas con diez (10) o menos trabajadores clasificadas con riesgo IV ó V',
    texto:
      'Las empresas de diez (10) o menos trabajadores y unidades de producción agropecuaria con diez (10) o menos trabajadores de forma permanente clasificadas con riesgo IV ó V deben cumplir con los Estándares Mínimos aplicables a empresas con más de cincuenta (50) trabajadores, señalados en el Capítulo III de la presente Resolución.',
    temas: ['riesgo iv', 'riesgo v', 'riesgo alto', 'construccion', 'empresa pequena riesgo alto', 'cuantos estandares riesgo alto'],
  },
  {
    norma: NORMA,
    articulo: '9',
    titulo: 'Estándares Mínimos para empresas de once (11) a cincuenta (50) trabajadores',
    texto:
      'Las empresas de once (11) a cincuenta (50) trabajadores y las unidades de producción agropecuaria de once (11) a cincuenta (50) trabajadores permanentes clasificadas con riesgo I, II ó III deben cumplir con veintiún (21) Estándares Mínimos: asignación de una persona que diseñe el Sistema de Gestión de SST (tecnólogo en SST con licencia vigente, mínimo dos (2) años de experiencia certificada y curso virtual de cincuenta (50) horas, o profesional o profesional con posgrado en SST con licencia y el mismo curso); asignación de recursos económicos para promoción de la salud y prevención de riesgos laborales; afiliación al Sistema de Seguridad Social Integral y pago de pensión de trabajadores de alto riesgo; conformación y funcionamiento del COPASST; conformación y funcionamiento del Comité de Convivencia Laboral; programa de capacitación en promoción y prevención extensivo a todos los niveles; política de SST escrita, firmada, fechada y comunicada al COPASST y a todos los trabajadores; Plan Anual de Trabajo firmado con objetivos, metas, responsabilidades, recursos y cronograma; archivo y retención documental; descripción sociodemográfica y diagnóstico de condiciones de salud; actividades de medicina del trabajo y de prevención y promoción de la salud; evaluaciones médicas ocupacionales; cumplimiento de restricciones y recomendaciones médico-laborales; reporte de accidentes de trabajo y enfermedades laborales, que consiste en reportar a la Administradora de Riesgos Laborales (ARL) y a la Entidad Promotora de Salud (EPS) todos los accidentes y las enfermedades laborales diagnosticadas, y reportar a la Dirección Territorial del Ministerio del Trabajo los accidentes graves y mortales y las enfermedades diagnosticadas como laborales, reportes que se realizan dentro de los dos (2) días hábiles siguientes al evento o al recibo del diagnóstico de la enfermedad, empleando el registro de accidente de trabajo (FURAT) y el registro de enfermedades laborales (FUREL); investigación de incidentes, accidentes de trabajo y enfermedades laborales con participación del COPASST; identificación de peligros y evaluación y valoración de riesgos; mantenimiento periódico de instalaciones, equipos, máquinas y herramientas; entrega de elementos de protección personal (EPP) y capacitación en su uso adecuado; plan de prevención, preparación y respuesta ante emergencias; conformación, capacitación y dotación de la brigada de emergencias; y revisión por la alta dirección como mínimo una (1) vez al año.',
    temas: ['cuantos estandares', '11 a 50 trabajadores', 'once a cincuenta', 'veintiun estandares', '21 estandares', 'empresa mediana', 'que me exigen', 'reportar accidente', 'plazo de reporte', 'dos dias habiles', 'furat', 'furel', 'copasst', 'comite de convivencia'],
  },
  {
    norma: NORMA,
    articulo: '10',
    titulo: 'Diseño e implementación del Sistema de Gestión de SST para las empresas de once (11) a cincuenta (50) trabajadores',
    texto:
      'El diseño e implementación del Sistema de Gestión de SST para empresas de once (11) a cincuenta (50) trabajadores clasificadas en riesgo I, II ó III podrá ser realizado por tecnólogos en SST o en alguna de sus áreas, con licencia vigente en SST, que acrediten mínimo dos (2) años de experiencia certificada y el curso de capacitación virtual de cincuenta (50) horas en SST. También podrá ser desarrollado por profesionales en SST y profesionales con posgrado en SST que cuenten con licencia vigente y el curso virtual de cincuenta (50) horas.',
    temas: ['quien disena el sistema', 'tecnologo sst', 'dos anos de experiencia', 'licencia', 'perfil del responsable'],
  },
  {
    norma: NORMA,
    articulo: '11',
    titulo: 'Apoyo, asesoría y capacitación para empresas de once (11) a cincuenta (50) trabajadores',
    texto:
      'Las empresas de once (11) a cincuenta (50) trabajadores pueden contar con apoyo y asesoría de: personas certificadas con el curso virtual de cincuenta (50) horas que estén cursando último semestre de programas de formación en SST de nivel profesional, especialización o maestría y tengan vínculo laboral con la empresa, quienes podrán realizar el diseño bajo supervisión de un docente con licencia en SST, sin costo para el empleador y por una sola vez por estudiante; gremios, cámaras de comercio, asociaciones, sociedades científicas, universidades, fundaciones, organismos internacionales e instituciones de educación, de manera gratuita y con personal licenciado en SST; y empresas contratantes con contratistas de once (11) a cincuenta (50) trabajadores, siempre que cuenten con personal profesional con posgrado en SST, licencia vigente y el curso virtual de cincuenta (50) horas.',
    temas: ['asesoria gratuita', 'apoyo', 'estudiante', 'practicante', 'quien me ayuda'],
  },
  {
    norma: NORMA,
    articulo: '12',
    titulo: 'Responsabilidades de las Administradoras de Riesgos Laborales para las empresas de once (11) a cincuenta (50) trabajadores',
    texto:
      'Las Administradoras de Riesgos Laborales deberán brindar a las empresas de once (11) a cincuenta (50) trabajadores y unidades de producción agropecuaria de ese tamaño asesoría, asistencia y acompañamiento técnico para el diseño y ejecución del Sistema de Gestión de SST, que incluya como mínimo: capacitación sobre SST; fomento de estilos de trabajo y de vida saludables; formulación de la política y elaboración del plan anual de trabajo; identificación de peligros, evaluación y valoración de los riesgos según la actividad económica; definición de prioridades de intervención y medidas de control; desarrollo de actividades de promoción y prevención; conformación de la brigada de emergencias, COPASST y Comité de Convivencia Laboral; formulación del plan de prevención, preparación y respuesta ante emergencias; reporte e investigación de accidentes, incidentes y enfermedades laborales; medición y evaluación de la gestión; y recomendaciones al plan de mejora conforme a la evaluación de los Estándares Mínimos.',
    temas: ['que hace la arl', 'asesoria arl', 'obligaciones arl', 'acompanamiento'],
  },
  {
    norma: NORMA,
    articulo: '13',
    titulo: 'Apoyo, asesoría y capacitación para Unidades de Producción Agropecuaria de once (11) a cincuenta (50) trabajadores',
    texto:
      'Las Unidades de Producción Agropecuaria de once (11) a cincuenta (50) trabajadores, sin importar su capital o medios de producción, pueden contar con apoyo, asesoría y asistencia técnica de: personas certificadas con el curso virtual de cincuenta (50) horas que cursen último semestre de formación profesional o posgrado en SST con experiencia en el sector agropecuario y vínculo laboral con la unidad, bajo supervisión de un docente con licencia en SST y sin costo; gremios, cámaras de comercio, asociaciones y federaciones de agricultores, ganaderos y paneleros, sociedades científicas, fundaciones, organismos internacionales, universidades e instituciones de educación, de manera gratuita y con personal licenciado; unidades contratantes con contratistas en sus instalaciones; y los actores de la cadena de suministro agrícola que se abastecen de la producción de esas unidades.',
    temas: ['agropecuario', 'finca', 'cadena de suministro', 'asesoria rural'],
  },
  {
    norma: NORMA,
    articulo: '14',
    titulo: 'Selección y evaluación de proveedores y contratistas',
    texto:
      'Dentro de los parámetros de selección y evaluación de proveedores y contratistas, el contratante podrá incluir criterios que le permitan identificar que el proveedor o contratista cumple con los Estándares Mínimos establecidos en la presente Resolución para empresas de once (11) a cincuenta (50) trabajadores.',
    temas: ['proveedores', 'contratistas', 'seleccion de contratistas', 'requisitos a proveedores'],
  },
  {
    norma: NORMA,
    articulo: '15',
    titulo: 'Estándares Mínimos para empresas de once (11) a cincuenta (50) trabajadores clasificadas en riesgo IV ó V',
    texto:
      'Las empresas de once (11) a cincuenta (50) trabajadores y unidades de producción agropecuaria de ese tamaño clasificadas en riesgo IV ó V deben cumplir con los Estándares Mínimos aplicables a empresas con más de cincuenta (50) trabajadores, señalados en el Capítulo III de la presente Resolución.',
    temas: ['riesgo iv', 'riesgo v', 'riesgo alto', 'construccion', 'mineria', 'cuantos estandares riesgo alto'],
  },
  {
    norma: NORMA,
    articulo: '16',
    titulo: 'Estándares Mínimos para empresas de más de cincuenta (50) trabajadores',
    texto:
      'Las empresas de más de cincuenta (50) trabajadores clasificadas con riesgo I, II, III, IV ó V y las de cincuenta (50) o menos trabajadores con riesgo IV ó V deben cumplir con sesenta (60) Estándares Mínimos, organizados según el ciclo PHVA. En recursos y gestión: asignación de una persona que diseñe e implemente el Sistema de Gestión de SST (profesional en SST o con posgrado en SST, licencia vigente y curso virtual de cincuenta (50) horas); asignación y documentación de responsabilidades en todos los niveles; asignación de talento humano y recursos financieros, técnicos y tecnológicos; afiliación de todos los trabajadores al Sistema de Seguridad Social Integral; identificación de trabajadores de alto riesgo y cotización especial de pensión; conformación y funcionamiento del COPASST y capacitación de sus integrantes; conformación y funcionamiento del Comité de Convivencia Laboral, con reuniones como mínimo cada tres (3) meses; programa de capacitación anual; inducción y reinducción en SST; y curso virtual de cincuenta (50) horas del responsable del sistema. En gestión integral: política de SST escrita, firmada, fechada y comunicada; objetivos del sistema; evaluación inicial; Plan Anual de Trabajo; archivo y retención documental; rendición de cuentas; matriz legal; mecanismos de comunicación; identificación y evaluación de bienes y servicios adquiridos; evaluación de proveedores y contratistas; y procedimiento de gestión del cambio. En gestión de la salud: descripción sociodemográfica y diagnóstico de condiciones de salud; actividades de medicina del trabajo, promoción y prevención; perfiles de cargo; evaluaciones médicas ocupacionales; custodia de historias clínicas; restricciones y recomendaciones médico-laborales; estilos de vida y entornos saludables; servicios de higiene y manejo de residuos; reporte de accidentes de trabajo y enfermedades laborales; investigación de incidentes, accidentes y enfermedades laborales; registro y análisis estadístico; y medición de frecuencia y severidad de la accidentalidad, mortalidad, prevalencia e incidencia de la enfermedad laboral y ausentismo por causa médica. En gestión de peligros y riesgos: metodología de identificación de peligros con participación de los trabajadores; identificación de sustancias carcinógenas y de toxicidad aguda; mediciones ambientales; medidas de prevención y control; verificación de su aplicación por los trabajadores; procedimientos e instructivos internos; inspecciones a instalaciones, maquinaria y equipos; mantenimiento periódico; y entrega de elementos de protección personal con capacitación en su uso. En gestión de amenazas: plan de prevención, preparación y respuesta ante emergencias, y brigada conformada, capacitada y dotada. En verificación y mejoramiento: indicadores del Sistema de Gestión; auditoría anual con alcance definido y planificación con el COPASST; revisión por la alta dirección; acciones preventivas y correctivas; acciones de mejora conforme a la revisión por la alta dirección y a las investigaciones de accidentes y enfermedades; y plan de mejoramiento.',
    temas: ['cuantos estandares', 'mas de 50 trabajadores', 'sesenta estandares', '60 estandares', 'empresa grande', 'riesgo iv', 'riesgo v', 'que me exigen'],
  },
  {
    norma: NORMA,
    articulo: '17',
    titulo: 'Diseño e implementación del Sistema de Gestión de SST para las empresas de más de cincuenta (50) trabajadores',
    texto:
      'El diseño e implementación del Sistema de Gestión de SST para empresas de más de cincuenta (50) trabajadores clasificadas con riesgo I, II, III, IV ó V y las de cincuenta (50) o menos trabajadores con riesgo IV ó V podrá ser realizado por profesionales en SST o profesionales con posgrado en SST que cuenten con licencia en SST vigente y el curso de capacitación virtual de cincuenta (50) horas en SST, quienes igualmente están facultados para asesorar, capacitar, ejecutar o diseñar el Sistema de Gestión de SST en cualquier empresa o entidad, sin importar la clase de riesgo, número de trabajadores o actividad económica.',
    temas: ['quien puede disenar', 'profesional sst', 'posgrado', 'licencia vigente', 'perfil'],
  },
  {
    norma: NORMA,
    articulo: '18',
    titulo: 'Responsabilidades de las Administradoras de Riesgos Laborales para las empresas de más de cincuenta (50) trabajadores',
    texto:
      'Las administradoras de riesgos laborales deben realizar las actividades de promoción, prevención, asesoría y asistencia técnica para las empresas y Unidades de Producción Agropecuaria de más de cincuenta (50) trabajadores clasificadas con riesgo I, II, III, IV ó V y las de cincuenta (50) o menos trabajadores con riesgo IV ó V de acuerdo con lo establecido en el Decreto 1295 de 1994, la Ley 1562 de 2012 y demás normatividad vigente.',
    temas: ['arl empresas grandes', 'obligaciones arl', 'asesoria'],
  },
  {
    norma: NORMA,
    articulo: '19',
    titulo: 'Selección y evaluación de proveedores y contratistas',
    texto:
      'Dentro de los parámetros de selección y evaluación de proveedores y contratistas, el contratante podrá incluir criterios que le permitan conocer que el proveedor o contratista cuenta con los estándares mínimos establecidos en la presente norma para empresas con más de cincuenta (50) trabajadores clasificadas con riesgo I, II, III, IV ó V y las de cincuenta (50) o menos trabajadores con riesgo IV ó V.',
    temas: ['proveedores', 'contratistas', 'requisitos', 'seleccion'],
  },
  {
    norma: NORMA,
    articulo: '20',
    titulo: 'Estándares Mínimos en el lugar de trabajo',
    texto:
      'Los Estándares Mínimos del Sistema de Gestión de SST son de obligatorio cumplimiento para todas las personas naturales y jurídicas señaladas en el artículo 2° de la presente Resolución, y su implementación se ajusta, adecua y armoniza a cada empresa o entidad conforme al número de trabajadores, actividad económica, labor u oficios desarrollados. El Sistema de Gestión es responsabilidad de cada empleador o contratante, quien podrá asociarse para compartir talento humano, recursos tecnológicos, procedimientos y actividades de capacitación, brigadas de emergencias, primeros auxilios y evacuación, señalización, zonas de deporte y seguridad vial; sin embargo, cada empresa debe garantizar la ejecución e implementación del sistema de acuerdo con sus características particulares. En los lugares de trabajo con más de un turno, el sistema debe asegurar la cobertura en todas las jornadas, y si la empresa tiene varios centros de trabajo debe garantizar cobertura efectiva de todos sus trabajadores. En caso de consorcio o unión temporal, cada una de las empresas que lo integre debe tener establecido su propio Sistema de Gestión.',
    temas: ['obligatorio', 'varios turnos', 'varias sedes', 'centros de trabajo', 'consorcio', 'union temporal', 'compartir recursos'],
  },
  {
    norma: NORMA,
    articulo: '21',
    titulo: 'Cumplimiento de los Estándares Mínimos del Sistema de Gestión de Seguridad y Salud en el Trabajo',
    texto:
      'El empleador liderará y se comprometerá con la aplicación de los Estándares Mínimos y la elaboración, ejecución y seguimiento del plan de trabajo anual, así como con el cumplimiento en la ejecución de las auditorías internas para identificar fallas y oportunidades de mejora al interior del Sistema de Gestión de SST. De igual manera deberá integrarlo a los demás Sistemas de Gestión que se manejen en la organización. Se debe promover, garantizar y contar con la participación de todos los trabajadores, contratistas, estudiantes y demás personas que presten o ejecuten actividades en las sedes o instalaciones de las diferentes empresas.',
    temas: ['responsabilidad del empleador', 'liderazgo', 'auditoria interna', 'participacion de trabajadores'],
  },
  {
    norma: NORMA,
    articulo: '22',
    titulo: 'Acreditación en SST',
    texto:
      'El certificado de acreditación en seguridad y salud en el trabajo es el reconocimiento oficial que realiza el Ministerio del Trabajo a las empresas con excelente calificación en el cumplimiento de los Estándares Mínimos. Para acreditarse deben: tener dos (2) o más planes anuales del Sistema de Gestión de SST con cumplimiento del cien por ciento (100%) en los Estándares Mínimos; contar con programa de auditoría con más de dos (2) años de funcionamiento; presentar bajos indicadores de frecuencia, severidad y mortalidad de accidentes, prevalencia e incidencia de enfermedades laborales y ausentismo, comparados con los dos (2) años anteriores; allegar los programas, planes y proyectos de valor agregado ejecutados de manera permanente por más de dos (2) años; y aprobar la visita de verificación. La certificación se mantiene vigente mientras la empresa conserve el cumplimiento del cien por ciento (100%) y apruebe la visita de verificación que se realizará cada cuatro (4) años. La acreditación es gratuita y se tendrá como referente para efectos de la disminución de la cotización al Sistema General de Riesgos Laborales.',
    temas: ['acreditacion', 'certificado', 'reconocimiento', 'bajar la cotizacion', 'descuento arl', 'excelencia'],
  },
  {
    norma: NORMA,
    articulo: '23',
    titulo: 'Obligaciones del empleador o contratante',
    texto:
      'Los empleadores y contratantes deben cumplir con todos los Estándares Mínimos del Sistema de Gestión de SST en el marco del Sistema de Garantía de Calidad del Sistema General de Riesgos Laborales, para lo cual se tendrán en cuenta y contabilizarán en el cálculo de los indicadores a todos los trabajadores dependientes e independientes, cooperados, estudiantes, trabajadores en misión y en general todas las personas que presten servicios o ejecuten labores bajo cualquier clase o modalidad de contratación en las instalaciones, sedes o centros de trabajo del empleador o contratante. La implementación de los Estándares Mínimos no exime a los empleadores del cumplimiento de las obligaciones y requisitos contenidos en otras normas del Sistema General de Riesgos Laborales vigentes.',
    temas: ['obligaciones del empleador', 'a quien cuento', 'contar trabajadores', 'contratistas', 'no exime'],
  },
  {
    norma: NORMA,
    articulo: '24',
    titulo: 'De la afiliación irregular en riesgos laborales mediante asociaciones o agremiaciones',
    texto:
      'Los empleadores y contratantes no pueden patrocinar, permitir o utilizar agremiaciones o asociaciones para afiliar a sus trabajadores dependientes o independientes al Sistema de Riesgos Laborales; dicha afiliación es responsabilidad del empleador o contratante. La agremiación, asociación, empresa o entidad que afilie de manera irregular a la seguridad social en riesgos laborales será sancionada con multa de hasta cinco mil (5000) salarios mínimos mensuales legales vigentes conforme al artículo 2.2.4.2.5.3 del Decreto 1072 de 2015, y las empresas o entidades contratantes con multa de hasta quinientos (500) salarios mínimos mensuales legales vigentes conforme al artículo 13 de la Ley 1562 de 2012.',
    temas: ['afiliacion irregular', 'agremiaciones', 'multa 5000 smmlv', 'multa 500 smmlv', 'sancion', 'afiliar trabajadores'],
  },
  {
    norma: NORMA,
    articulo: '25',
    titulo: 'Fases de adecuación, transición y aplicación para la implementación del Sistema de Gestión de SST con Estándares Mínimos',
    texto:
      'Las fases de adecuación, transición y aplicación son cinco: Fase 1, Evaluación inicial, autoevaluación realizada por la empresa para identificar prioridades y necesidades y establecer el plan de trabajo anual de 2018, de junio a agosto de 2017. Fase 2, Plan de mejoramiento conforme a la evaluación inicial, de septiembre a diciembre de 2017. Fase 3, Ejecución, puesta en marcha del Sistema de Gestión durante 2018, de enero a diciembre de 2018. Fase 4, Seguimiento y plan de mejora, vigilancia preventiva de la ejecución, de enero a octubre de 2019. Fase 5, Inspección, vigilancia y control, verificación del cumplimiento por parte del Ministerio del Trabajo, de noviembre de 2019 en adelante. En diciembre de 2019 los empleadores debían aplicar la autoevaluación conforme a la Tabla de Valores del artículo 27, elaborar el Plan de Mejora y formular el Plan Anual del Sistema de Gestión de SST del año 2020.',
    temas: ['fases', 'transicion', 'plazos', 'cronograma de implementacion', 'evaluacion inicial'],
  },
  {
    norma: NORMA,
    articulo: '26',
    titulo: 'Implementación definitiva del Sistema de Gestión de SST de enero del año 2020 en adelante',
    texto:
      'Desde enero del año 2020 en adelante, todos los Sistemas de Gestión de SST se ejecutarán anualmente de enero a diciembre o en cualquier fracción del año si la empresa o entidad es creada durante el respectivo año. De 2020 en adelante, en el mes de diciembre las empresas deberán: aplicar la autoevaluación conforme a la Tabla de Valores y Calificación de los Estándares Mínimos mediante el formulario de evaluación del artículo 27; elaborar el Plan de Mejora conforme al resultado de la autoevaluación, el cual debe quedar aprobado en el Plan Anual del Sistema de Gestión de SST; y formular el Plan Anual del Sistema de Gestión de SST, que debe empezar a ejecutarse a partir del primero (1°) de enero del año siguiente. El formulario de evaluación diligenciado y los planes de mejora se registran en la aplicación habilitada en la página web del Ministerio del Trabajo, de diciembre del año 2020 en adelante.',
    temas: ['autoevaluacion anual', 'cada cuando', 'diciembre', 'plan anual', 'ciclo anual', 'registro ministerio'],
  },
  {
    norma: NORMA,
    articulo: '27',
    titulo: 'Tabla de Valores de los Estándares Mínimos',
    texto:
      'Para la calificación de cada uno de los ítems que componen los numerales de los Estándares Mínimos del Sistema de Gestión de SST se toma la Tabla de Valores, en la cual se relacionan los porcentajes a asignar a cada uno. Para la calificación de cada ítem se tomarán los porcentajes máximos o mínimos de acuerdo con la Tabla de Valores, teniendo en cuenta si se cumple o no con el ítem del estándar. En los ítems que no aplican para las empresas de menos de cincuenta (50) trabajadores clasificadas con riesgo I, II ó III se deberá otorgar el porcentaje máximo de calificación en la columna «No Aplica» frente al ítem correspondiente. La tabla se organiza según el ciclo PHVA (Planear, Hacer, Verificar, Actuar) y asigna un peso porcentual a cada estándar, hasta totalizar cien por ciento (100%).',
    temas: ['tabla de valores', 'calificacion', 'puntaje', 'como se califica', 'autoevaluacion', 'porcentaje', 'phva'],
  },
  {
    norma: NORMA,
    articulo: '28',
    titulo: 'Planes de mejoramiento conforme al resultado de la autoevaluación de los Estándares Mínimos',
    texto:
      'Los empleadores o contratantes deben realizar la autoevaluación de los Estándares Mínimos, cuyo resultado obliga o no a realizar un plan de mejora: si el puntaje obtenido es menor al 60% la valoración es CRÍTICO y se debe realizar y tener a disposición del Ministerio del Trabajo un Plan de Mejoramiento de inmediato, enviar a la ARL un reporte de avances en el término máximo de tres (3) meses después de realizada la autoevaluación, y habrá seguimiento anual y plan de visita por parte del Ministerio del Trabajo; si el puntaje está entre el 60 y 85% la valoración es MODERADAMENTE ACEPTABLE y se debe realizar y tener a disposición un Plan de Mejoramiento, enviar a la ARL un reporte de avances en el término máximo de seis (6) meses, y habrá plan de visita del Ministerio del Trabajo; si el puntaje es mayor al 85% la valoración es ACEPTABLE y se debe mantener la calificación y evidencias a disposición del Ministerio del Trabajo e incluir en el Plan Anual de Trabajo las mejoras detectadas. El empleador debe rendir informe sobre el avance del plan de mejoramiento en el mes de julio de cada año. El plan de mejoramiento debe contener como mínimo: las actividades concretas a desarrollar, las personas responsables de cada una, el plazo determinado para su cumplimiento, los recursos administrativos y financieros destinados, y los fundamentos y soportes de la efectividad de las acciones.',
    temas: ['puntaje', 'critico', 'moderadamente aceptable', 'aceptable', '60 por ciento', '85 por ciento', 'plan de mejoramiento', 'que pasa si saco bajo', 'resultado autoevaluacion'],
  },
  {
    norma: NORMA,
    articulo: '29',
    titulo: 'Planes de mejoramiento a solicitud del Ministerio del Trabajo',
    texto:
      'Cuando los funcionarios de las Direcciones Territoriales del Ministerio del Trabajo detecten en cualquier momento un incumplimiento de las obligaciones, normas y requisitos legales establecidos en los Estándares Mínimos del Sistema de Gestión de SST, se podrá ordenar planes de mejoramiento con el fin de que se efectúen las acciones correctivas tendientes a la superación de las situaciones irregulares detectadas. El plan debe contener como mínimo las actividades concretas a desarrollar, la persona responsable de cada una, el plazo determinado para su cumplimiento y la ejecución del plan, y los recursos administrativos y financieros destinados.',
    temas: ['visita del ministerio', 'inspeccion', 'plan de mejoramiento obligatorio', 'incumplimiento'],
  },
  {
    norma: NORMA,
    articulo: '30',
    titulo: 'Indicadores Mínimos de Seguridad y Salud en el Trabajo',
    texto:
      'A partir del año 2019 las empresas anualmente llevarán un registro de los indicadores de SST: frecuencia de accidentalidad, severidad de accidentalidad, proporción de accidentes de trabajo mortales, prevalencia de la enfermedad laboral, incidencia de la enfermedad laboral y ausentismo por causa médica. Frecuencia de accidentalidad: (número de accidentes de trabajo del mes / número de trabajadores en el mes) × 100, periodicidad mensual. Severidad de accidentalidad: (número de días de incapacidad por accidente de trabajo en el mes + días cargados / número de trabajadores en el mes) × 100, mensual. Proporción de accidentes de trabajo mortales: (número de accidentes mortales en el año / total de accidentes del año) × 100, anual. Prevalencia de la enfermedad laboral: (casos nuevos y antiguos en el periodo / promedio de trabajadores del periodo) × 100.000, anual. Incidencia de la enfermedad laboral: (casos nuevos en el periodo / promedio de trabajadores del periodo) × 100.000, anual. Ausentismo por causa médica: (días de ausencia por incapacidad laboral o común en el mes / días de trabajo programados en el mes) × 100, mensual. Los empleadores no deben crear mecanismos que fomenten el no reporte de accidentes o enfermedades, ni reconocer bonos, premios o estímulos por no reportar bajo políticas como cero accidentes, ni levantar o suspender el goce de las incapacidades temporales. Todo accidente o enfermedad con incapacidad temporal igual o superior a un (1) día debe ser reportado y tenido en cuenta para el cálculo de los indicadores.',
    temas: ['indicadores', 'formulas', 'como calcular', 'frecuencia', 'severidad', 'ausentismo', 'accidentalidad', 'cero accidentes'],
  },
  {
    norma: NORMA,
    articulo: '31',
    titulo: 'Estándares Mínimos para trabajadores en actividades de alto riesgo',
    texto:
      'Para los trabajadores que desempeñen actividades de alto riesgo a las que hace referencia el artículo 2° del Decreto 2090 de 2003, el empleador deberá realizar en la identificación de peligros, evaluación y valoración de los riesgos una definición del cargo en donde se indiquen las funciones, tareas, jornada de trabajo y lugar donde desempeña su labor; así mismo, deberá identificar y relacionar los trabajadores que se dedican de manera permanente a dichas actividades. Las Administradoras de Riesgos Laborales darán asesoría, capacitación y asistencia técnica a las empresas que desarrollen actividades de alto riesgo.',
    temas: ['alto riesgo', 'decreto 2090', 'pension especial', 'actividades peligrosas'],
  },
  {
    norma: NORMA,
    articulo: '32',
    titulo: 'Plan Estratégico de Seguridad Vial',
    texto:
      'Todo empleador y contratante que se encuentre obligado a implementar un Plan Estratégico de Seguridad Vial deberá articularlo con el Sistema de Gestión de SST.',
    temas: ['seguridad vial', 'pesv', 'vehiculos', 'conductores'],
  },
  {
    norma: NORMA,
    articulo: '33',
    titulo: 'Prevención de accidentes en industrias mayores',
    texto:
      'Las empresas fabricantes, importadoras, distribuidoras, comercializadoras y usuarios de productos químicos peligrosos deberán tener un programa de trabajo con actividades, recursos, responsables, metas e indicadores para la prevención de accidentes en industrias mayores, con la respectiva clasificación y etiquetado de acuerdo con el Sistema Globalmente Armonizado de Clasificación y Etiquetado de Productos Químicos, dando cumplimiento a la Ley 320 de 1996, el Decreto 1496 de 2018 y demás normativa vigente.',
    temas: ['quimicos', 'sustancias peligrosas', 'sga', 'etiquetado', 'industrias mayores'],
  },
  {
    norma: NORMA,
    articulo: '34',
    titulo: 'Aplicación de los Estándares Mínimos de SST',
    texto:
      'La aplicación e implementación del Sistema de Gestión de SST con Estándares Mínimos se realizará de acuerdo con las fases y en los periodos establecidos en los artículos 25 y 26 de la presente Resolución.',
    temas: ['aplicacion', 'fases', 'plazos'],
  },
  {
    norma: NORMA,
    articulo: '35',
    titulo: 'Vigilancia delegada',
    texto:
      'Las Administradoras de Riesgos Laborales, de conformidad con lo establecido en el artículo 56 del Decreto 1295 de 1994 y por delegación del Estado, ejercen la vigilancia y control del cumplimiento en la prevención de los riesgos laborales de las empresas afiliadas y las asesoran en el diseño del Sistema de Gestión de SST. En especial, deberán estudiar, analizar y dar recomendaciones a los planes de mejoramiento que realizan las empresas luego de la autoevaluación de Estándares Mínimos, e informar a las Direcciones Territoriales del Ministerio del Trabajo sobre aquellas que no realicen los ajustes y actividades de mejoramiento.',
    temas: ['vigilancia', 'control', 'arl vigila', 'reporte al ministerio'],
  },
  {
    norma: NORMA,
    articulo: '36',
    titulo: 'Sanciones',
    texto:
      'El incumplimiento a lo establecido en la presente resolución y demás normas que la adicionen, modifiquen o sustituyan será sancionado en los términos previstos en el artículo 91 del Decreto 1295 de 1994, modificado por el artículo 13 de la Ley 1562 de 2012, en concordancia con el Capítulo 11 del Título 4 de la Parte 2 del Libro 2 del Decreto 1072 de 2015. Parágrafo 1: conforme a los artículos 8° y 11 de la Ley 1610 de 2013, se podrá disponer el cierre temporal o definitivo del lugar de trabajo cuando existan condiciones que pongan en peligro la vida, la integridad y la seguridad personal de los trabajadores, así como la paralización o prohibición inmediata de trabajos o tareas por inobservancia de la normativa sobre prevención de riesgos laborales, de concurrir riesgo grave e inminente. Parágrafo 2: en el acto administrativo de sanción se debe señalar con precisión cada uno de los Estándares Mínimos objeto de investigación y sanción administrativa laboral.',
    temas: ['sanciones', 'multas', 'cuanto me pueden multar', 'cierre del lugar de trabajo', 'articulo 91', 'ley 1562', 'que pasa si no cumplo', 'no cumplir los estandares minimos'],
  },
  {
    norma: NORMA,
    articulo: '37',
    titulo: 'Vigencia y derogatorias',
    texto:
      'La presente Resolución rige a partir de la fecha de su publicación y deroga la Resolución 1111 de 2017 proferida por el Ministerio del Trabajo. Dada en Bogotá, D.C., a los 13 de febrero de 2019.',
    temas: ['vigencia', 'desde cuando', 'deroga resolucion 1111', 'fecha'],
  },
]
