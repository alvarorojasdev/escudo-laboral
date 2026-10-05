/**
 * Autoevaluación de los Estándares Mínimos del SG-SST (Resolución 0312 de 2019).
 *
 * Fuente: texto oficial compilado por el SENA
 * (normograma.sena.edu.co/compilacion/docs/resolucion_mtra_0312_2019.htm),
 * consultado el 1-oct-2026. Nombres y criterios se copian tal cual de los
 * cuadros de los artículos 3, 9 y 16. Los valores son los de la Tabla de
 * Valores del artículo 27, que en la norma es una imagen: se leyeron ítem por
 * ítem y cuadran con los subtotales impresos (4, 6, 15, 9, 5, 6, 15, 15, 10,
 * 5, 10 = 100).
 *
 * Correspondencia de los 7 y 21 estándares con los 60 ítems: cada fila de los
 * artículos 3 y 9 es el ítem del artículo 16 con el mismo nombre oficial. En
 * los que difieren en alguna palabra, decide el criterio, que empieza igual
 * (p. ej. la identificación de peligros de la micro es el 4.1.2, "…con
 * participación de todos los niveles", no la metodología del 4.1.1).
 */

export type Ciclo = 'Planear' | 'Hacer' | 'Verificar' | 'Actuar'

export interface ItemEstandar {
  codigo: string
  nombre: string
  criterio: string
  valor: number
  ciclo: Ciclo
  grupo: string
}

export interface EstandarReducido {
  nombre: string
  criterio: string
  /** Ítem de la Tabla de Valores que califica este estándar. */
  item: string
}

export const ITEMS: ItemEstandar[] = [
  {
    codigo: '1.1.1',
    nombre: 'Asignación de una persona que diseñe e implemente el Sistema de Gestión de SST',
    criterio:
      'Asignar una persona que cumpla con el siguiente perfil: El diseño e implementación del Sistema de Gestión de SST podrá ser realizado por profesionales en SST, profesionales con posgrado en SST, que cuenten con licencia en Seguridad y Salud en el Trabajo vigente y el curso de capacitación virtual de cincuenta (50) horas.',
    valor: 0.5,
    ciclo: 'Planear',
    grupo: 'Recursos',
  },
  {
    codigo: '1.1.2',
    nombre: 'Asignación de responsabilidades en SST',
    criterio:
      'Asignar y documentar las responsabilidades específicas en el Sistema de Gestión SST a todos los niveles de la organización, para el desarrollo y mejora continua de dicho Sistema.',
    valor: 0.5,
    ciclo: 'Planear',
    grupo: 'Recursos',
  },
  {
    codigo: '1.1.3',
    nombre: 'Asignación de recursos para el Sistema de Gestión en SST',
    criterio:
      'Definir y asignar el talento humano, los recursos financieros, técnicos y tecnológicos, requeridos para la implementación, mantenimiento y continuidad del Sistema de Gestión de SST.',
    valor: 0.5,
    ciclo: 'Planear',
    grupo: 'Recursos',
  },
  {
    codigo: '1.1.4',
    nombre: 'Afiliación al Sistema de Seguridad Social Integral',
    criterio:
      'Garantizar que todos los trabajadores, independientemente de su forma de vinculación o contratación están afiliados al Sistema de Seguridad Social en Salud, Pensión y Riesgos Laborales.',
    valor: 0.5,
    ciclo: 'Planear',
    grupo: 'Recursos',
  },
  {
    codigo: '1.1.5',
    nombre:
      'Identificación de trabajadores que se dediquen en forma permanente a actividades de alto riesgo y cotización de pensión especial',
    criterio:
      'En el caso de que aplique, identificar a los trabajadores que se dediquen en forma permanente al ejercicio de las actividades de alto riesgo establecidas en el Decreto 2090 de 2003 o de las normas que lo adicionen, modifiquen o complementen y cotizar el monto establecido en la norma, al Sistema de Pensiones.',
    valor: 0.5,
    ciclo: 'Planear',
    grupo: 'Recursos',
  },
  {
    codigo: '1.1.6',
    nombre: 'Conformación y funcionamiento del COPASST',
    criterio:
      'Conformar y garantizar el funcionamiento del Comité Paritario de Seguridad y Salud en el Trabajo (COPASST).',
    valor: 0.5,
    ciclo: 'Planear',
    grupo: 'Recursos',
  },
  {
    codigo: '1.1.7',
    nombre: 'Capacitación de los integrantes del COPASST',
    criterio:
      'Capacitar a los integrantes del COPASST para el cumplimiento efectivo de las responsabilidades que les asigna la ley.',
    valor: 0.5,
    ciclo: 'Planear',
    grupo: 'Recursos',
  },
  {
    codigo: '1.1.8',
    nombre: 'Conformación y funcionamiento del Comité de Convivencia Laboral',
    criterio:
      'Conformar y garantizar el funcionamiento del Comité de Convivencia Laboral, de acuerdo con la normatividad vigente.',
    valor: 0.5,
    ciclo: 'Planear',
    grupo: 'Recursos',
  },
  {
    codigo: '1.2.1',
    nombre: 'Programa de capacitación anual',
    criterio:
      'Elaborar y ejecutar el programa de capacitación anual en promoción y prevención, que incluye lo referente a los peligros/riesgos prioritarios y las medidas de prevención y control, extensivo a todos los niveles de la organización.',
    valor: 2,
    ciclo: 'Planear',
    grupo: 'Recursos',
  },
  {
    codigo: '1.2.2',
    nombre: 'Inducción y reinducción en SST',
    criterio:
      'Realizar actividades de inducción y reinducción, las cuales deben estar incluidas en el programa de capacitación, dirigidas a todos los trabajadores, independientemente de su forma de vinculación y/o contratación, de manera previa al inicio de sus labores, en aspectos generales y específicos de las actividades o funciones a realizar que incluya entre otros, la identificación de peligros y control de los riesgos en su trabajo y la prevención de accidentes de trabajo y enfermedades laborales.',
    valor: 2,
    ciclo: 'Planear',
    grupo: 'Recursos',
  },
  {
    codigo: '1.2.3',
    nombre: 'Curso Virtual de capacitación de cincuenta (50) horas en SST.',
    criterio:
      'El responsable del Sistema de Gestión de SST realiza el curso de capacitación virtual de cincuenta (50) horas en SST definido por el Ministerio del Trabajo.',
    valor: 2,
    ciclo: 'Planear',
    grupo: 'Recursos',
  },
  {
    codigo: '2.1.1',
    nombre: 'Política de Seguridad y Salud en el Trabajo.',
    criterio:
      'Establecer por escrito la Política de Seguridad y Salud en el Trabajo y comunicarla al Comité Paritario de Seguridad y Salud en el Trabajo - COPASST. La Política debe ser fechada y firmada por el representante legal y expresa el compromiso de la alta dirección, el alcance sobre todos los centros de trabajo y todos sus trabajadores independientemente de su forma de vinculación y/o contratación, es revisada, como mínimo una vez al año, hace parte de las políticas de gestión de la empresa, se encuentra difundida y accesible para todos los niveles de la organización. Incluye como mínimo el compromiso con: – La identificación de los peligros, evaluación y valoración de los riesgos y con los respectivos controles. – Proteger la seguridad y salud de todos los trabajadores mediante la mejora continua. – El cumplimiento de la normatividad vigente aplicable en materia de riesgos laborales.',
    valor: 1,
    ciclo: 'Planear',
    grupo: 'Gestión integral del sistema',
  },
  {
    codigo: '2.2.1',
    nombre: 'Objetivos de SST',
    criterio:
      'Definir los objetivos del Sistema de Gestión de SST de conformidad con la política de SST, los cuales deben ser claros, medibles, cuantificables y tener metas, coherentes con el plan de trabajo anual, compatibles con la normatividad vigente, se encuentran documentados, son comunicados a los trabajadores, son revisados y evaluados mínimo una vez al año, actualizados de ser necesario y se encuentran en documento firmado por el empleador.',
    valor: 1,
    ciclo: 'Planear',
    grupo: 'Gestión integral del sistema',
  },
  {
    codigo: '2.3.1',
    nombre: 'Evaluación Inicial del Sistema de Gestión',
    criterio:
      'Realizar la evaluación inicial del Sistema de Gestión de SST, identificando las prioridades para establecer el plan de trabajo anual o para la actualización del existente. Debe ser realizada por el responsable del Sistema de Gestión de SST o contratada por la empresa con personal externo con licencia en Seguridad y Salud en el Trabajo.',
    valor: 1,
    ciclo: 'Planear',
    grupo: 'Gestión integral del sistema',
  },
  {
    codigo: '2.4.1',
    nombre: 'Plan Anual de Trabajo',
    criterio:
      'Diseñar y definir un plan anual de trabajo para el cumplimiento del Sistema de Gestión de SST, el cual identifica los objetivos, metas, responsabilidades, recursos, cronograma de actividades, firmado por el empleador y el responsable del Sistema de Gestión de SST.',
    valor: 2,
    ciclo: 'Planear',
    grupo: 'Gestión integral del sistema',
  },
  {
    codigo: '2.5.1',
    nombre: 'Archivo y retención documental del Sistema de Gestión de SST',
    criterio:
      'Contar con un sistema de archivo y retención documental, para los registros y documentos que soportan el Sistema de Gestión de SST.',
    valor: 2,
    ciclo: 'Planear',
    grupo: 'Gestión integral del sistema',
  },
  {
    codigo: '2.6.1',
    nombre: 'Rendición de cuentas',
    criterio:
      'Realizar anualmente la Rendición de Cuentas del desarrollo del Sistema de Gestión de SST, que incluya a todos los niveles de la empresa.',
    valor: 1,
    ciclo: 'Planear',
    grupo: 'Gestión integral del sistema',
  },
  {
    codigo: '2.7.1',
    nombre: 'Matriz legal',
    criterio:
      'Definir la matriz legal que contemple las normas actualizadas del Sistema General de Riesgos Laborales aplicables a la empresa.',
    valor: 2,
    ciclo: 'Planear',
    grupo: 'Gestión integral del sistema',
  },
  {
    codigo: '2.8.1',
    nombre: 'Mecanismos de comunicación',
    criterio:
      'Disponer de mecanismos eficaces para recibir y responder las comunicaciones internas y externas relativas a la Seguridad y Salud en el Trabajo, como por ejemplo autorreporte de condiciones de trabajo y de salud por parte de los trabajadores o contratistas.',
    valor: 1,
    ciclo: 'Planear',
    grupo: 'Gestión integral del sistema',
  },
  {
    codigo: '2.9.1',
    nombre: 'Identificación y evaluación para la adquisición de bienes y servicios',
    criterio:
      'Establecer un procedimiento para la identificación y evaluación de las especificaciones en SST de las compras y adquisición de productos y servicios.',
    valor: 1,
    ciclo: 'Planear',
    grupo: 'Gestión integral del sistema',
  },
  {
    codigo: '2.10.1',
    nombre: 'Evaluación y selección de proveedores y contratistas',
    criterio:
      'Establecer los aspectos de SST que podrá tener en cuenta la empresa en la evaluación y selección de proveedores y contratistas.',
    valor: 2,
    ciclo: 'Planear',
    grupo: 'Gestión integral del sistema',
  },
  {
    codigo: '2.11.1',
    nombre: 'Gestión del cambio',
    criterio:
      'Disponer de un procedimiento para evaluar el impacto sobre la Seguridad y Salud en el Trabajo que se pueda generar por cambios internos o externos.',
    valor: 1,
    ciclo: 'Planear',
    grupo: 'Gestión integral del sistema',
  },
  {
    codigo: '3.1.1',
    nombre:
      'Descripción sociodemográfica y Diagnóstico de las condiciones de salud de los trabajadores',
    criterio:
      'Recolectar la siguiente información actualizada de todos los trabajadores del último año: la descripción sociodemográfica de los trabajadores (edad, sexo, escolaridad, estado civil) y el diagnóstico de condiciones de salud que incluya la caracterización de sus condiciones de salud, la evaluación y análisis de las estadísticas sobre la salud de los trabajadores tanto de origen laboral como común y los resultados de las evaluaciones médicas ocupacionales.',
    valor: 1,
    ciclo: 'Hacer',
    grupo: 'Gestión de la salud',
  },
  {
    codigo: '3.1.2',
    nombre: 'Actividades de medicina del trabajo y de prevención y promoción de la Salud.',
    criterio:
      'Desarrollar las actividades de medicina del trabajo, prevención y promoción de la salud y programas de vigilancia epidemiológica requeridos, de conformidad con las prioridades identificadas en el diagnóstico de condiciones de salud y con los peligros/riesgos prioritarios.',
    valor: 1,
    ciclo: 'Hacer',
    grupo: 'Gestión de la salud',
  },
  {
    codigo: '3.1.3',
    nombre: 'Perfiles de cargos',
    criterio:
      'Informar al médico que realiza las evaluaciones ocupacionales los perfiles de cargos con una descripción de las tareas y el medio en el cual se desarrollará la labor respectiva.',
    valor: 1,
    ciclo: 'Hacer',
    grupo: 'Gestión de la salud',
  },
  {
    codigo: '3.1.4',
    nombre: 'Evaluaciones médicas ocupacionales',
    criterio:
      'Realizar las evaluaciones médicas de acuerdo con la normatividad y los peligros/riesgos a los cuales se encuentre expuesto el trabajador. Definir la frecuencia de las evaluaciones médicas ocupacionales periódicas según tipo, magnitud, frecuencia de exposición a cada peligro, el estado de salud del trabajador, las recomendaciones de los sistemas de vigilancia epidemiológica y la legislación vigente. Comunicar por escrito al trabajador los resultados de las evaluaciones médicas ocupacionales los cuales reposarán en su historia médica.',
    valor: 1,
    ciclo: 'Hacer',
    grupo: 'Gestión de la salud',
  },
  {
    codigo: '3.1.5',
    nombre: 'Custodia de las historias clínicas',
    criterio:
      'Tener la custodia de las historias clínicas a cargo de una institución prestadora de servicios en SST o del médico que practica las evaluaciones médicas ocupacionales.',
    valor: 1,
    ciclo: 'Hacer',
    grupo: 'Gestión de la salud',
  },
  {
    codigo: '3.1.6',
    nombre: 'Restricciones y recomendaciones médico laborales',
    criterio:
      'Cumplir las restricciones y recomendaciones médico laborales realizadas por parte de la Empresa Promotora de Salud (EPS) o Administradora de Riesgos Laborales (ARL) prescritas a los trabajadores para la realización de sus funciones. Adecuar el puesto de trabajo, reubicar al trabajador o realizar la readaptación laboral cuando se requiera. Entregar a quienes califican en primera oportunidad y/o a las Juntas de Calificación de Invalidez los documentos que son responsabilidad del empleador conforme a las normas, para la calificación de origen y pérdida de la capacidad laboral.',
    valor: 1,
    ciclo: 'Hacer',
    grupo: 'Gestión de la salud',
  },
  {
    codigo: '3.1.7',
    nombre: 'Estilos de vida y entorno saludable',
    criterio:
      'Elaborar y ejecutar un programa para promover entre los trabajadores, estilos de vida y entornos de trabajo saludable, incluyendo campañas específicas tendientes a la prevención y el control de la farmacodependencia, el alcoholismo y el tabaquismo, entre otros.',
    valor: 1,
    ciclo: 'Hacer',
    grupo: 'Gestión de la salud',
  },
  {
    codigo: '3.1.8',
    nombre: 'Servicios de higiene',
    criterio:
      'Contar con un suministro permanente de agua potable, servicios sanitarios y mecanismos para disponer excretas y basuras.',
    valor: 1,
    ciclo: 'Hacer',
    grupo: 'Gestión de la salud',
  },
  {
    codigo: '3.1.9',
    nombre: 'Manejo de Residuos',
    criterio:
      'Eliminar los residuos sólidos, líquidos o gaseosos que se producen, así como los residuos peligrosos, de forma que no se ponga en riesgo a los trabajadores.',
    valor: 1,
    ciclo: 'Hacer',
    grupo: 'Gestión de la salud',
  },
  {
    codigo: '3.2.1',
    nombre: 'Reporte de accidentes de trabajo y enfermedades laborales',
    criterio:
      'Reportar a la Administradora de Riesgos Laborales (ARL) y a la Entidad Promotora de Salud (EPS) todos los accidentes de trabajo y las enfermedades laborales diagnosticadas. Reportar a la Dirección Territorial del Ministerio del Trabajo que corresponda los accidentes graves y mortales, así como como las enfermedades diagnosticadas como laborales. Estos reportes se realizan dentro de los dos (2) días hábiles siguientes al evento o recibo del diagnóstico de la enfermedad.',
    valor: 2,
    ciclo: 'Hacer',
    grupo: 'Gestión de la salud',
  },
  {
    codigo: '3.2.2',
    nombre:
      'Investigación de incidentes, accidentes de trabajo y las enfermedades cuando sean diagnosticadas como laborales',
    criterio:
      'Investigar los incidentes y todos los accidentes de trabajo y las enfermedades cuando sean diagnosticadas como laborales con la participación del COPASST, determinando las causas básicas e inmediatas y la posibilidade de que se presenten nuevos casos.',
    valor: 2,
    ciclo: 'Hacer',
    grupo: 'Gestión de la salud',
  },
  {
    codigo: '3.2.3',
    nombre: 'Registro y análisis estadístico de accidentes de trabajo y enfermedades laborales',
    criterio:
      'Llevar registro estadístico de los accidentes de trabajo que ocurren así como de las enfermedades laborales que se presentan; se analiza este registro y las conclusiones derivadas del estudio son usadas para el mejoramiento del Sistema de Gestión de SST.',
    valor: 1,
    ciclo: 'Hacer',
    grupo: 'Gestión de la salud',
  },
  {
    codigo: '3.3.1',
    nombre: 'Frecuencia de accidentalidad',
    criterio:
      'Medir la frecuencia de los accidentes como mínimo una (1) vez al mes y realizar la clasificación del origen del peligro/riesgo que los generó (físicos, de químicos, biológicos, seguridad, públicos, psicosociales, entre otros.).',
    valor: 1,
    ciclo: 'Hacer',
    grupo: 'Gestión de la salud',
  },
  {
    codigo: '3.3.2',
    nombre: 'Severidad de accidentalidad',
    criterio:
      'Medir la severidad de los accidentes de trabajo como mínimo una (1) vez al mes y realizar la clasificación del origen del peligro/riesgo que los generó (físicos, químicos, biológicos, de seguridad, públicos, psicosociales, entre otros).',
    valor: 1,
    ciclo: 'Hacer',
    grupo: 'Gestión de la salud',
  },
  {
    codigo: '3.3.3',
    nombre: 'Proporción de accidentes de trabajo mortales',
    criterio:
      'Medir la mortalidad por accidentes como mínimo una (1) vez al año y realizar la clasificación del origen del peligro/riesgo que los generó (físicos, químicos, biológicos, de seguridad, públicos, psicosociales, entre otros).',
    valor: 1,
    ciclo: 'Hacer',
    grupo: 'Gestión de la salud',
  },
  {
    codigo: '3.3.4',
    nombre: 'Prevalencia de la enfermedad laboral.',
    criterio:
      'Medir la prevalencia de la enfermedad laboral como mínimo una (1) vez al año y realizar la clasificación del origen del peligro/riesgo que la generó (físico, químico, biológico, ergonómico o biomecánico, psicosocial, entre otros).',
    valor: 1,
    ciclo: 'Hacer',
    grupo: 'Gestión de la salud',
  },
  {
    codigo: '3.3.5',
    nombre: 'Incidencia de la enfermedad laboral',
    criterio:
      'Medir la incidencia de la enfermedad laboral como mínimo una (1) vez al año y realizar la clasificación del origen del peligro/ riesgo que la generó (físicos, químicos, biológicos, ergonómicos o biomecánicos, psicosociales, entre otros).',
    valor: 1,
    ciclo: 'Hacer',
    grupo: 'Gestión de la salud',
  },
  {
    codigo: '3.3.6',
    nombre: 'Ausentismo por causa médica',
    criterio:
      'Medir el ausentismo por incapacidad de origen laboral y común, como mínimo una (1) vez al mes y realizar la clasificación del origen del peligro/riesgo que lo generó (físicos, ergonómicos, o biomecánicos, químicos, de seguridad, públicos, psicosociales, entre otros).',
    valor: 1,
    ciclo: 'Hacer',
    grupo: 'Gestión de la salud',
  },
  {
    codigo: '4.1.1',
    nombre: 'Metodología para identificación de peligros, evaluación y valoración de riesgos',
    criterio:
      'Definir y aplicar una metodología para la identificación de peligros y evaluación y valoración de los riesgos de origen físico, ergonómico o biomecánico, biológico, químico, de seguridad, público, psicosocial, entre otros, con alcance sobre todos los procesos, actividades rutinarias y no rutinarias, maquinaria y equipos en todos los centros de trabajo y respecto de todos los trabajadores independientemente de su forma de vinculación y/o contratación. Identificar con base en la valoración de los riesgos, aquellos que son prioritarios.',
    valor: 4,
    ciclo: 'Hacer',
    grupo: 'Gestión de peligros y riesgos',
  },
  {
    codigo: '4.1.2',
    nombre:
      'Identificación de peligros y evaluación y valoración de riesgos con participación de todos los niveles de la empresa',
    criterio:
      'Realizar la identificación de peligros y evaluación y valoración de los riesgos con participación de los trabajadores de todos los niveles de la empresa y actualizarla como mínimo una (1) vez al año y cada vez que ocurra un accidente de trabajo mortal o un evento catastrófico en la empresa o cuando se presenten cambios en los procesos, en las instalaciones, o maquinaria o equipos.',
    valor: 4,
    ciclo: 'Hacer',
    grupo: 'Gestión de peligros y riesgos',
  },
  {
    codigo: '4.1.3',
    nombre: 'Identificación de sustancias catalogadas como carcinógenas o con toxicidad aguda.',
    criterio:
      'En las empresas donde se procese, manipule o trabaje con sustancias o agentes catalogadas como carcinógenas o con toxicidad aguda, causantes de enfermedades, incluidas en la tabla de enfermedades laborales, priorizar los riesgos asociados a las mismas y realizar acciones de prevención e intervención al respecto.',
    valor: 3,
    ciclo: 'Hacer',
    grupo: 'Gestión de peligros y riesgos',
  },
  {
    codigo: '4.1.4',
    nombre: 'Mediciones ambientales',
    criterio:
      'Realizar mediciones ambientales de los riesgos prioritarios, provenientes de peligros químicos, físicos y/o biológicos.',
    valor: 4,
    ciclo: 'Hacer',
    grupo: 'Gestión de peligros y riesgos',
  },
  {
    codigo: '4.2.1',
    nombre: 'Medidas de prevención y control frente a peligros/riesgos identificados',
    criterio:
      'Ejecutar las medidas de prevención y control con base en el resultado de la identificación de peligros, la evaluación y valoración de los riesgos (físicos, ergonómicos, biológicos, químicos, de seguridad, públicos, psicosociales, entre otros), incluidos los prioritarios y estas se ejecutan acorde con el esquema de jerarquización, de ser factible priorizar la intervención en la fuente y en el medio.',
    valor: 2.5,
    ciclo: 'Hacer',
    grupo: 'Gestión de peligros y riesgos',
  },
  {
    codigo: '4.2.2',
    nombre: 'Aplicación de medidas de prevención y control por parte de los trabajadores',
    criterio:
      'Verificar la aplicación por parte de los trabajadores de las medidas de prevención y control de los peligros/riesgos (físicos, ergonómicos, biológicos, químicos, de seguridad, públicos, psicosociales, entre otros).',
    valor: 2.5,
    ciclo: 'Hacer',
    grupo: 'Gestión de peligros y riesgos',
  },
  {
    codigo: '4.2.3',
    nombre: 'Procedimientos e instructivos internos de seguridad y salud en el trabajo',
    criterio:
      'Elaborar procedimientos, instructivos y fichas técnicas de seguridad y salud en el trabajo cuando se requiera y entregarlos a los trabajadores.',
    valor: 2.5,
    ciclo: 'Hacer',
    grupo: 'Gestión de peligros y riesgos',
  },
  {
    codigo: '4.2.4',
    nombre: 'Inspecciones a instalaciones, maquinaria o equipos',
    criterio:
      'Elaborar formatos de registro para la realización de las visitas de inspección. Realizar las visitas de inspección sistemática a las instalaciones, maquinaria o equipos, incluidos los relacionados con la prevención y atención de emergencias; con la participación del COPASST.',
    valor: 2.5,
    ciclo: 'Hacer',
    grupo: 'Gestión de peligros y riesgos',
  },
  {
    codigo: '4.2.5',
    nombre: 'Mantenimiento periódico de las instalaciones, equipos, máquinas y herramientas',
    criterio:
      'Realizar el mantenimiento periódico de las instalaciones, equipos, máquinas y herramientas, de acuerdo con los informes de las visitas de inspección o reportes de condiciones inseguras y los manuales y/o las fichas técnicas de los mismos.',
    valor: 2.5,
    ciclo: 'Hacer',
    grupo: 'Gestión de peligros y riesgos',
  },
  {
    codigo: '4.2.6',
    nombre: 'Entrega de los Elementos de Protección Personal (EPP) y capacitación en uso adecuado',
    criterio:
      'Suministrar a los trabajadores los elementos de protección personal que se requieran y reponerlos oportunamente, conforme al desgaste y condiciones de uso de los mismos. Verificar que los contratistas y subcontratistas entregan los elementos de protección personal que se requiera a sus trabajadores y realizan la reposición de los mismos oportunamente, conforme al desgaste y condiciones de uso. Realizar la capacitación para el uso de los elementos de protección personal.',
    valor: 2.5,
    ciclo: 'Hacer',
    grupo: 'Gestión de peligros y riesgos',
  },
  {
    codigo: '5.1.1',
    nombre: 'Plan de prevención, preparación y respuesta ante emergencias',
    criterio:
      'Elaborar un plan de prevención, preparación y respuesta ante emergencias que identifique las amenazas, evalúe y analice la vulnerabilidad. Como mínimo el plan debe incluir: planos de las instalaciones que identifican áreas y salidas de emergencia, así como la señalización, realización de simulacros como mínimo una (1) vez al año. El plan debe tener en cuenta todas las jornadas de trabajo en todos los centros de trabajo y debe ser divulgado.',
    valor: 5,
    ciclo: 'Hacer',
    grupo: 'Gestión de amenazas',
  },
  {
    codigo: '5.1.2',
    nombre: 'Brigada de prevención, preparación y respuesta ante emergencias',
    criterio:
      'Conformar, capacitar y dotar la brigada de prevención, preparación y respuesta ante emergencias (primeros auxilios, contra incendios, evacuación, etc.), según las necesidades y el tamaño de la empresa.',
    valor: 5,
    ciclo: 'Hacer',
    grupo: 'Gestión de amenazas',
  },
  {
    codigo: '6.1.1',
    nombre: 'Definición de indicadores del Sistema de Gestión de Seguridad y Salud en el Trabajo',
    criterio:
      'Definir indicadores que permitan evaluar el Sistema de Gestión de SST de acuerdo con las condiciones de la empresa, teniendo en cuenta los indicadores mínimos señalados en el Capítulo IV de la presente resolución. Tener disponibles los resultados de la evaluación del Sistema de Gestión de SST, de acuerdo con los indicadores mínimos de SST definidos en la presente resolución.',
    valor: 1.25,
    ciclo: 'Verificar',
    grupo: 'Verificación del SG-SST',
  },
  {
    codigo: '6.1.2',
    nombre: 'Auditoría anual',
    criterio:
      'Realizar una auditoría anual, la cual será planificada con la participación del Comité Paritario de Seguridad y Salud en el Trabajo.',
    valor: 1.25,
    ciclo: 'Verificar',
    grupo: 'Verificación del SG-SST',
  },
  {
    codigo: '6.1.3',
    nombre: 'Revisión por la alta dirección. Alcance de la auditoría del Sistema de Gestión',
    criterio:
      'Revisar como mínimo una (1) vez al año, por parte de la alta dirección, el Sistema de Gestión de SST , resultados y el alcance de la auditoría de cumplimiento del Sistema de Gestión de Seguridad y Salud en el Trabajo, de acuerdo con los aspectos señalados en el artículo 2.2.4.6.30 del Decreto 1072 de 2015.',
    valor: 1.25,
    ciclo: 'Verificar',
    grupo: 'Verificación del SG-SST',
  },
  {
    codigo: '6.1.4',
    nombre: 'Planificación de la auditoría con el COPASST',
    criterio:
      'Revisar como mínimo una (1) vez al año, por parte de la alta dirección, el Sistema de Gestión de SST y comunicar los resultados al COPASST y al responsable del Sistema de Gestión de SST.',
    valor: 1.25,
    ciclo: 'Verificar',
    grupo: 'Verificación del SG-SST',
  },
  {
    codigo: '7.1.1',
    nombre: 'Acciones preventivas y/o correctivas',
    criterio:
      'Definir e implementar las acciones preventivas y/o correctivas necesarias con base en los resultados de la supervisión, inspecciones, medición de los indicadores del Sistema de Gestión de SST entre otros, y las recomendaciones del COPASST.',
    valor: 2.5,
    ciclo: 'Actuar',
    grupo: 'Mejoramiento',
  },
  {
    codigo: '7.1.2',
    nombre: 'Acciones de mejora conforme a revisión de la Alta Dirección',
    criterio:
      'Cuando después de la revisión por la Alta Dirección del Sistema de Gestión de SST se evidencie que las medidas de prevención y control relativas a los peligros y riesgos son inadecuadas o pueden dejar de ser eficaces, la empresa toma las medidas correctivas, preventivas y/o de mejora para subsanar lo detectado.',
    valor: 2.5,
    ciclo: 'Actuar',
    grupo: 'Mejoramiento',
  },
  {
    codigo: '7.1.3',
    nombre:
      'Acciones de mejora con base en investigaciones de accidentes de trabajo y enfermedades laborales',
    criterio:
      'Definir e implementar las acciones preventivas y/o correctivas necesarias con base en los resultados de las investigaciones de los accidentes de trabajo y la determinación de sus causas básicas e inmediatas, así como de las enfermedades laborales.',
    valor: 2.5,
    ciclo: 'Actuar',
    grupo: 'Mejoramiento',
  },
  {
    codigo: '7.1.4',
    nombre: 'Plan de mejoramiento',
    criterio:
      'Implementar las medidas y acciones correctivas producto de requerimientos o recomendaciones de autoridades administrativas y de las administradoras de riesgos laborales.',
    valor: 2.5,
    ciclo: 'Actuar',
    grupo: 'Mejoramiento',
  },
]

export const ESTANDARES: Record<'7' | '21', EstandarReducido[]> = {
  '7': [
    {
      nombre: 'Asignación de persona que diseña el Sistema de Gestión de SST',
      criterio:
        'Asignar una persona que cumpla con el siguiente perfil: El diseño del Sistema de Gestión de Seguridad y Salud en el Trabajo, para empresas de menos de diez (10) trabajadores en clase de riesgo I, II y III puede ser realizado por un técnico en Seguridad y Salud en el Trabajo (SST) o en alguna de sus áreas, con licencia vigente en Seguridad y Salud en el Trabajo, que acredite mínimo un (1) año de experiencia certificada por las empresas o entidades en las que laboró en el desarrollo de actividades de Seguridad y Salud en el Trabajo y que acredite la aprobación del curso de capacitación virtual de cincuenta (50) horas. Esta actividad también podrá ser desarrollada por tecnólogos, profesionales y profesionales con posgrado en SST, que cuenten con licencia vigente en Seguridad y Salud en el Trabajo y el referido curso de capacitación virtual de cincuenta (50) horas.',
      item: '1.1.1',
    },
    {
      nombre: 'Afiliación al Sistema de Seguridad Social Integral',
      criterio:
        'Afiliación a los Sistemas de Seguridad Social en Salud, Pensión y Riesgos Laborales de acuerdo con la normatividad vigente.',
      item: '1.1.4',
    },
    {
      nombre: 'Capacitación en SST',
      criterio:
        'Elaborar y ejecutar programas o actividades de capacitación en promoción y prevención, que incluya como mínimo lo referente a los peligros/riesgos prioritarios y las medidas de prevención y control.',
      item: '1.2.1',
    },
    {
      nombre: 'Plan Anual de Trabajo',
      criterio:
        'Elaborar el Plan Anual de Trabajo del Sistema de Gestión de SST, firmado por el empleador o contratante, en el que se identifiquen como mínimo: objetivos, metas, responsabilidades, recursos y cronograma anual.',
      item: '2.4.1',
    },
    {
      nombre: 'Evaluaciones médicas ocupacionales',
      criterio:
        'Realizar las evaluaciones médicas ocupacionales de acuerdo con la normatividad y los peligros / riesgos a los cuales se encuentre expuesto el trabajador.',
      item: '3.1.4',
    },
    {
      nombre: 'Identificación de peligros; evaluación y valoración de riesgos',
      criterio:
        'Realizar la identificación de peligros y la evaluación y valoración de los riesgos con el acompañamiento de la ARL.',
      item: '4.1.2',
    },
    {
      nombre: 'Medidas de prevención y control frente a peligros/riesgos identificados',
      criterio:
        'Ejecutar las actividades de prevención y control de peligros y/o riesgos, con base en el resultado de la identificación de peligros, la evaluación y valoración de los riesgos.',
      item: '4.2.1',
    },
  ],
  '21': [
    {
      nombre: 'Asignación de una persona que diseñe el Sistema de Gestión de SST',
      criterio:
        'Asignar una persona que cumpla con el siguiente perfil: El diseño del Sistema de Gestión de SST puede ser realizado por un tecnólogo en Seguridad y Salud en el Trabajo o en alguna de sus áreas, con licencia vigente en SST, que acredite mínimo dos (2) años de experiencia certificada por las empresas o entidades en las que laboró en el desarrollo de actividades de seguridad y salud en el trabajo y que certifique la aprobación del curso de capacitación virtual de cincuenta (50) horas. Esta actividad también podrá ser desarrollada por profesionales en SST y profesionales con posgrado en SST, que cuenten con licencia vigente en SST y el referido curso de capacitación virtual de cincuenta (50) horas.',
      item: '1.1.1',
    },
    {
      nombre: 'Asignación de recursos para el Sistema de Gestión de SST',
      criterio:
        'Asignar recursos económicos para desarrollar acciones de promoción de la salud y prevención de riesgos laborales.',
      item: '1.1.3',
    },
    {
      nombre: 'Afiliación al Sistema de Seguridad Social Integral',
      criterio:
        'Afiliación a los Sistemas de Seguridad Social en Salud, Pensión y Riesgos Laborales de acuerdo con la normatividad vigente. Pago de pensión de trabajadores de alto riesgo.',
      item: '1.1.4',
    },
    {
      nombre: 'Conformación y funcionamiento del COPASST',
      criterio:
        'Conformar, capacitar y verificar el cumplimiento de las responsabilidades del COPASST.',
      item: '1.1.6',
    },
    {
      nombre: 'Conformación y funcionamiento del Comité de Convivencia Laboral',
      criterio:
        'Conformar, capacitar y verificar el cumplimiento de las responsabilidades del Comité de Convivencia Laboral.',
      item: '1.1.8',
    },
    {
      nombre: 'Programa de capacitación',
      criterio:
        'Elaborar y ejecutar el programa de capacitación en promoción y prevención, que incluye lo referente a los peligros/riesgos prioritarios y las medidas de prevención y control, extensivo a todos los niveles de la organización.',
      item: '1.2.1',
    },
    {
      nombre: 'Política de Seguridad y Salud en el Trabajo',
      criterio:
        'Elaborar política de SST escrita, firmada, fechada y comunicada al COPASST y a todos los trabajadores.',
      item: '2.1.1',
    },
    {
      nombre: 'Plan Anual de Trabajo',
      criterio:
        'Elaborar el Plan Anual de Trabajo firmado por el empleador o contratante, en el que se identifiquen como mínimo: objetivos, metas, responsabilidades, recursos y cronograma anual.',
      item: '2.4.1',
    },
    {
      nombre: 'Archivo y retención documental del Sistema de Gestión de SST',
      criterio:
        'Mantener el archivo de los siguientes documentos, por el término establecido en la normatividad vigente: Política en Seguridad y Salud en el Trabajo. Identificación de peligros en todos los cargos/oficios y áreas. Conceptos exámenes médicos ocupacionales. Plan de emergencias. Evidencias de actividades del COPASST. Afiliación a Seguridad Social. Comunicaciones de trabajadores, ARL o autoridades en materia de Riesgos Laborales.',
      item: '2.5.1',
    },
    {
      nombre: 'Descripción sociodemográfica y diagnóstico de condiciones de salud',
      criterio:
        'Identificar las características de la población trabajadora (edad, sexo, cargos, antigüedad, nivel escolaridad, etc.) y el diagnóstico de condiciones de salud que incluya la caracterización de sus condiciones de salud, recopilar, analizar e interpretar los datos del estado de salud de los trabajadores.',
      item: '3.1.1',
    },
    {
      nombre: 'Actividades de medicina del trabajo y de prevención y promoción de la salud',
      criterio:
        'Desarrollar las actividades de medicina del trabajo, prevención y promoción de la salud de conformidad con las prioridades identificadas en el diagnóstico de condiciones de salud y con los peligros/riesgos prioritarios.',
      item: '3.1.2',
    },
    {
      nombre: 'Evaluaciones médicas ocupacionales',
      criterio:
        'Realizar las evaluaciones médicas ocupacionales de acuerdo con la normatividad y los peligros / riesgos a los cuales se encuentre expuesto el trabajador.',
      item: '3.1.4',
    },
    {
      nombre: 'Restricciones y recomendaciones médicas laborales',
      criterio:
        'Cumplir las recomendaciones y restricciones que realizan las Entidades Promotoras de Salud y/o Administradoras de Riesgos Laborales, emitidas por los médicos tratantes, de acuerdo con la normatividad vigente. Entregar a quienes califican en primera oportunidad y/o a las Juntas de Calificación de Invalidez los documentos que son responsabilidad del empleador conforme a las normas, para la calificación de origen y pérdida de la capacidad laboral.',
      item: '3.1.6',
    },
    {
      nombre: 'Reporte de accidentes de trabajo y enfermedades laborales',
      criterio:
        'Reportar a la Administradora de Riesgos Laborales (ARL) y a la Entidad Promotora de Salud (EPS) todos los accidentes y las enfermedades laborales diagnosticadas. Reportar a la Dirección Territorial del Ministerio del Trabajo que corresponda los accidentes graves y mortales, así como como las enfermedades diagnosticadas como laborales. Estos reportes se realizan dentro de los dos (2) días hábiles siguientes al evento o recibo del diagnóstico de la enfermedad.',
      item: '3.2.1',
    },
    {
      nombre:
        'Investigación de incidentes, accidentes de trabajo y enfermedades cuando sean diagnosticadas como laborales',
      criterio:
        'Investigar los incidentes y todos los accidentes de trabajo y las enfermedades cuando sean diagnosticadas como laborales, con la participación del COPASST, previniendo la posibilidad de que se presenten nuevos casos.',
      item: '3.2.2',
    },
    {
      nombre: 'Identificación de peligros y evaluación y valoración de riesgos',
      criterio:
        'Identificar peligros, evaluar y valorar los riesgos y establecer controles que prevengan efectos adversos en la salud de los trabajadores.',
      item: '4.1.2',
    },
    {
      nombre: 'Mantenimiento periódico de instalaciones, equipos, máquinas y herramientas',
      criterio:
        'Realizar los mantenimientos periódicos de instalaciones, equipo, máquinas y herramientas, de acuerdo con los manuales y/o las fichas técnicas de los mismos.',
      item: '4.2.5',
    },
    {
      nombre:
        'Entrega de los elementos de protección personal (EPP) y capacitación en uso adecuado',
      criterio:
        'Realizar la entrega de los elementos de protección personal, acorde con el oficio u ocupación que desempeñan los trabajadores y capacitar sobre el uso adecuado de los mismos.',
      item: '4.2.6',
    },
    {
      nombre: 'Plan de prevención, preparación y respuesta ante emergencias',
      criterio: 'Elaborar el plan de prevención, preparación y respuesta ante emergencias.',
      item: '5.1.1',
    },
    {
      nombre: 'Brigada de prevención, preparación y respuesta ante emergencias',
      criterio:
        'Conformar, capacitar y dotar la brigada de prevención, preparación y respuesta ante emergencias.',
      item: '5.1.2',
    },
    {
      nombre: 'Revisión por la alta dirección',
      criterio:
        'Revisar como mínimo una (1) vez al año, por parte de la alta dirección los resultados del Sistema de Gestión de SST.',
      item: '6.1.3',
    },
  ],
}
