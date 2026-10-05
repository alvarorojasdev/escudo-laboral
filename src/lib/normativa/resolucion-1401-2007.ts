import type { ArticuloNormativo } from './tipos'

const NORMA = 'Resolución 1401 de 2007'

/**
 * Resolución 1401 de 2007 del Ministerio de la Protección Social (14 de mayo
 * de 2007): reglamenta la investigación de incidentes y accidentes de trabajo.
 *
 * Texto tomado del PDF oficial publicado por el Ministerio de Salud
 * (Diario Oficial 46.638). Los plazos se verificaron además contra SafetYA:
 * 15 días calendario para investigar y para remitir a la ARL; 15 días hábiles
 * para el concepto de la ARL; 10 días hábiles para que la ARL remita al
 * Ministerio en caso de accidente mortal.
 */
export const RESOLUCION_1401_2007: ArticuloNormativo[] = [
  {
    norma: NORMA,
    articulo: '1',
    titulo: 'Campo de aplicación',
    texto:
      'La presente resolución se aplica a los empleadores públicos y privados, a los trabajadores dependientes e independientes, a los contratantes de personal bajo modalidad de contrato civil, comercial o administrativo, a las organizaciones de economía solidaria y del sector cooperativo, a las agremiaciones u asociaciones que afilian trabajadores independientes al Sistema de Seguridad Social Integral; a las administradoras de riesgos profesionales; a la Policía Nacional en lo que corresponde a su personal no uniformado y al personal civil de las fuerzas militares.',
    temas: ['a quien aplica', 'campo de aplicacion', 'quienes deben investigar', 'obligatorio'],
  },
  {
    norma: NORMA,
    articulo: '2',
    titulo: 'Objeto',
    texto:
      'Establecer obligaciones y requisitos mínimos para realizar la investigación de incidentes y accidentes de trabajo, con el fin de identificar las causas, hechos y situaciones que los han generado, e implementar las medidas correctivas encaminadas a eliminar o minimizar condiciones de riesgo y evitar su recurrencia.',
    temas: ['objeto', 'para que sirve', 'investigacion de accidentes', 'por que investigar'],
  },
  {
    norma: NORMA,
    articulo: '3',
    titulo: 'Definiciones',
    texto:
      'Incidente de trabajo: suceso acaecido en el curso del trabajo o en relación con este, que tuvo el potencial de ser un accidente, en el que hubo personas involucradas sin que sufrieran lesiones o se presentaran daños a la propiedad y/o pérdida en los procesos. Investigación de accidente o incidente: proceso sistemático de determinación y ordenación de causas, hechos o situaciones que generaron o favorecieron la ocurrencia del accidente o incidente, que se realiza con el objeto de prevenir su repetición, mediante el control de los riesgos que lo produjeron. Causas básicas: causas reales que se manifiestan detrás de los síntomas; razones por las cuales ocurren los actos y condiciones subestándares o inseguros; factores que una vez identificados permiten un control administrativo significativo. Causas inmediatas: circunstancias que se presentan justamente antes del contacto; por lo general son observables o se hacen sentir. Se clasifican en actos subestándares o actos inseguros (comportamientos que podrían dar paso a la ocurrencia de un accidente o incidente) y condiciones subestándares o condiciones inseguras (circunstancias que podrían dar paso a la ocurrencia de un accidente o incidente). Aportantes: empleadores públicos y privados, contratantes de personal bajo modalidad de contrato civil, comercial o administrativo; organizaciones de economía solidaria y del sector cooperativo; agremiaciones u asociaciones autorizadas para realizar la afiliación colectiva de trabajadores independientes al Sistema de Seguridad Social Integral. Accidente grave: aquel que trae como consecuencia amputación de cualquier segmento corporal; fractura de huesos largos (fémur, tibia, peroné, húmero, radio y cúbito); trauma craneoencefálico; quemaduras de segundo y tercer grado; lesiones severas de mano, tales como aplastamiento o quemaduras; lesiones severas de columna vertebral con compromiso de médula espinal; lesiones oculares que comprometan la agudeza o el campo visual o lesiones que comprometan la capacidad auditiva.',
    temas: [
      'que es un incidente',
      'que es accidente grave',
      'definiciones',
      'causas basicas',
      'causas inmediatas',
      'acto inseguro',
      'condicion insegura',
    ],
  },
  {
    norma: NORMA,
    articulo: '4',
    titulo: 'Obligaciones de los aportantes',
    texto:
      'Los aportantes tienen las siguientes obligaciones: 1. Conformar el equipo investigador de los incidentes y accidentes de trabajo, de conformidad con lo establecido en el artículo 7° de la presente resolución. 2. Investigar todos los incidentes y accidentes de trabajo dentro de los quince (15) días siguientes a su ocurrencia, a través del equipo investigador. 3. Adoptar una metodología y un formato para investigar los incidentes y los accidentes de trabajo, que contenga como mínimo los lineamientos establecidos en la presente resolución, siendo procedente adoptar los diseñados por la administradora de riesgos profesionales. Cuando como consecuencia del accidente de trabajo se produzca el fallecimiento del trabajador, se debe utilizar obligatoriamente el formato suministrado por la Administradora de Riesgos Profesionales a la que se encuentre afiliado. 4. Registrar en el formato de investigación, en forma veraz y objetiva, toda la información que conduzca a la identificación de las causas reales del accidente o incidente de trabajo. 5. Implementar las medidas y acciones correctivas que, como producto de la investigación, recomienden el Comité Paritario de Salud Ocupacional o Vigía Ocupacional; las autoridades administrativas laborales y ambientales; así como la Administradora de Riesgos Profesionales. 6. Proveer los recursos, elementos, bienes y servicios necesarios para implementar las medidas correctivas que resulten de la investigación, las cuales deberán ser parte del cronograma de actividades del Programa de Salud Ocupacional de la empresa, incluyendo responsables y tiempo de ejecución. 7. Implementar el registro del seguimiento realizado a las acciones ejecutadas a partir de cada investigación. 8. Establecer y calcular indicadores de control y seguimiento del impacto de las acciones tomadas. 9. Remitir a la respectiva administradora de riesgos profesionales los informes de investigación de los accidentes de trabajo a que se refiere el inciso primero del artículo 14, firmados por el representante legal del aportante o su delegado. 10. Llevar los archivos de las investigaciones adelantadas y pruebas de los correctivos implementados, los cuales deberán estar a disposición del Ministerio cuando este los requiera.',
    temas: [
      'obligaciones del empleador',
      'cuanto tiempo tengo para investigar',
      'quince dias',
      '15 dias',
      'plazo para investigar',
      'que debo hacer tras un accidente',
    ],
  },
  {
    norma: NORMA,
    articulo: '5',
    titulo: 'Obligaciones de las administradoras de riesgos profesionales',
    texto:
      'En relación con la investigación de incidentes y accidentes de trabajo, las administradoras de riesgos profesionales tienen las siguientes obligaciones: 1. Proporcionar asesoría a sus afiliados en materia de investigación de incidentes y accidentes de trabajo. 2. Desarrollar e implementar una metodología para la investigación y suministrarla a los aportantes. 3. Remitir para aprobación de la Dirección General de Riesgos Profesionales los formatos de investigación. 4. Suministrar a los aportantes el formato de investigación con su respectivo instructivo. 5. Analizar las investigaciones remitidas por los aportantes y profundizar o complementar aquellas que no cumplan con los requerimientos. 6. Capacitar continuamente al aportante, al equipo investigador y al Comité Paritario de Salud Ocupacional o Vigía Ocupacional. 7. Participar, cuando lo estime necesario, en la investigación de accidentes de trabajo que por su complejidad o consecuencias lo ameriten. 8. Emitir conceptos técnicos sobre cada investigación remitida. 9. Realizar seguimiento a las medidas de control sugeridas. 10. Remitir informe semestral a las Direcciones Territoriales del Ministerio sobre los aportantes que han incumplido las medidas de control recomendadas. 11. Informar a los aportantes sobre los resultados de las investigaciones.',
    temas: ['obligaciones de la arl', 'que hace la arl', 'asesoria arl', 'concepto tecnico'],
  },
  {
    norma: NORMA,
    articulo: '6',
    titulo: 'Metodología de la investigación de incidente y accidente de trabajo',
    texto:
      'El aportante podrá utilizar la metodología de investigación de incidentes y accidentes de trabajo que más se ajuste a sus necesidades y requerimientos de acuerdo con su actividad económica, desarrollo técnico o tecnológico, de tal manera que le permita y facilite cumplir con sus obligaciones legales y le sirva como herramienta técnica de prevención.',
    temas: ['metodologia', 'como investigar', 'que metodo usar', 'espina de pescado'],
  },
  {
    norma: NORMA,
    articulo: '7',
    titulo: 'Equipo investigador',
    texto:
      'El aportante debe conformar un equipo para la investigación de todos los incidentes y accidentes de trabajo, integrado como mínimo por el jefe inmediato o supervisor del trabajador accidentado o del área donde ocurrió el incidente, un representante del Comité Paritario de Salud Ocupacional o el Vigía Ocupacional y el encargado del desarrollo del programa de salud ocupacional. Cuando el aportante no tenga la estructura anterior, deberá conformar un equipo investigador integrado por trabajadores capacitados para tal fin. Cuando el accidente se considere grave o produzca la muerte, en la investigación deberá participar un profesional con licencia en Salud Ocupacional, propio o contratado, así como el personal de la empresa encargado del diseño de normas, procesos y/o mantenimiento. Parágrafo: los aportantes podrán apoyarse en personal experto interno o externo para determinar las causas y establecer las medidas correctivas del caso.',
    temas: [
      'quien investiga', 'quien investiga un accidente de trabajo',
      'equipo investigador',
      'quienes participan',
      'copasst investigacion',
      'licencia salud ocupacional',
    ],
  },
  {
    norma: NORMA,
    articulo: '8',
    titulo:
      'Investigación de accidentes e incidentes ocurridos a trabajadores no vinculados mediante contrato de trabajo',
    texto:
      'Cuando el accidentado sea un trabajador en misión, un trabajador asociado a un organismo de trabajo asociado o cooperativo o un trabajador independiente, la responsabilidad de la investigación será tanto de la empresa de servicios temporales como de la empresa usuaria; de la empresa beneficiaria del servicio del trabajador asociado y del contratante, según sea el caso. En el concepto técnico se deberá indicar el correctivo que le corresponde implementar a cada una. Para efecto de la investigación, se seguirá el mismo procedimiento señalado en los artículos anteriores.',
    temas: [
      'contratistas',
      'trabajador en mision',
      'temporales',
      'independientes',
      'quien responde',
    ],
  },
  {
    norma: NORMA,
    articulo: '9',
    titulo: 'Contenido del informe de investigación',
    texto:
      'El documento que contenga el resultado de la investigación de un incidente o accidente deberá contener todas las variables y códigos del informe de accidente de trabajo establecidos en la Resolución 156 de 2005 o la norma que la sustituya, en cuanto a información del aportante, del trabajador accidentado y datos sobre el accidente. Para determinar las causas, hechos y situaciones es necesario, además, que en el informe de investigación se detallen características específicas sobre tipo de lesión, parte detallada del cuerpo que fue lesionada, lesión precisa que sufrió el trabajador; agente y mecanismo del accidente, sitio exacto donde ocurrió el evento. Respecto del agente de la lesión, se debe incluir información como tipo, marca, modelo, velocidades, tamaños, formas, dimensiones y las demás que se consideren necesarias. El informe debe contener una descripción clara y completa del accidente, el análisis causal detallado, las conclusiones, las medidas de control y demás datos propios de la investigación.',
    temas: [
      'que lleva el informe',
      'contenido del informe',
      'formato de investigacion',
      'que debe incluir',
    ],
  },
  {
    norma: NORMA,
    articulo: '10',
    titulo: 'Descripción del accidente o incidente',
    texto:
      'El informe deberá contener un relato completo y detallado de los hechos relacionados con el accidente o incidente, de acuerdo con la inspección realizada al sitio de trabajo y las versiones de los testigos, involucrando todo aquello que se considere importante o que aporte información para determinar las causas específicas, tales como cuándo ocurrió, dónde se encontraba el trabajador, qué actividad estaba realizando y qué pasó, por qué realizaba la actividad, para qué, con quién se encontraba, cómo sucedió. Para obtener la información, el aportante puede acudir al reconocimiento del área involucrada, entrevista a testigos, fotografías, videos, diagramas, revisión de documentos y demás técnicas que se consideren necesarias.',
    temas: ['como describir el accidente', 'relato', 'testigos', 'evidencia', 'fotos'],
  },
  {
    norma: NORMA,
    articulo: '11',
    titulo: 'Causas del accidente o incidente',
    texto:
      'Son las razones por las cuales ocurre el accidente o incidente. En el informe se deben relacionar todas las causas encontradas dentro de la investigación, identificando las básicas o mediatas y las inmediatas y especificando en cada grupo el listado de los actos subestándar o inseguros y las condiciones subestándar o inseguras.',
    temas: ['causas del accidente', 'analisis causal', 'causa raiz', 'por que paso'],
  },
  {
    norma: NORMA,
    articulo: '12',
    titulo: 'Compromiso de adopción de medidas de intervención',
    texto:
      'Enumerar y describir las medidas de intervención que la empresa se compromete a adoptar, para prevenir o evitar la ocurrencia de eventos similares, indicando en cada caso quiénes son los responsables y cuándo se realizará la intervención. Además, se deben especificar las medidas que se realizarán en la fuente del riesgo, en el medio ambiente de trabajo y en los trabajadores. Las recomendaciones deben ser prácticas y tener una relación lógica con la causa básica identificada. La empresa implementará las acciones recomendadas, llevará los registros de cumplimiento, verificará la efectividad de las acciones adelantadas y realizará los ajustes que considere necesarios.',
    temas: [
      'medidas correctivas',
      'plan de accion',
      'que hago despues',
      'intervencion',
      'fuente medio individuo',
    ],
  },
  {
    norma: NORMA,
    articulo: '13',
    titulo: 'Datos relativos a la investigación',
    texto:
      'En el informe se debe relacionar lugar, dirección, fecha(s) y hora(s) en que se realiza la investigación; nombres, cargos, identificación y firmas de los investigadores y del representante legal.',
    temas: ['firmas', 'datos del informe', 'quien firma'],
  },
  {
    norma: NORMA,
    articulo: '14',
    titulo: 'Remisión de investigaciones',
    texto:
      'El aportante debe remitir a la Administradora de Riesgos Profesionales a la que se encuentre afiliado, dentro de los quince (15) días siguientes a la ocurrencia del evento, el informe de investigación del accidente de trabajo mortal y de los accidentes graves definidos en el artículo 3º de la presente resolución. Recibida la investigación por la Administradora de Riesgos Profesionales, esta la evaluará, complementará y emitirá concepto sobre el evento correspondiente, determinando las acciones de prevención que debe implementar el aportante, en un plazo no superior a quince (15) días hábiles. Cuando el accidente de trabajo sea mortal, la Administradora de Riesgos Profesionales remitirá el informe dentro de los diez (10) días hábiles siguientes a la emisión del concepto, junto con la investigación y copia del informe del accidente de trabajo, a la Dirección Territorial de Trabajo o a la Oficina Especial de Trabajo, a efecto de que se adelante la correspondiente investigación administrativa laboral y se impongan las sanciones a que hubiere lugar. La Dirección General de Riesgos Profesionales podrá solicitar en cualquier tiempo los informes de que trata el presente artículo.',
    temas: [
      'cuando enviar a la arl',
      'plazo remitir arl',
      'accidente mortal',
      'accidente grave',
      'quince dias',
      '15 dias habiles',
    ],
  },
  {
    norma: NORMA,
    articulo: '15',
    titulo: 'Sanciones',
    texto:
      'El incumplimiento de lo establecido en la presente resolución será sancionado de conformidad con lo establecido en los literales a) y c) del artículo 91 del Decreto-ley 1295 de 1994. Las investigaciones administrativas y las sanciones por incumplimiento de la presente resolución serán de competencia de las Direcciones Territoriales del Ministerio, de conformidad con lo previsto por el artículo 115 del Decreto-ley 2150 de 1995.',
    temas: ['sanciones', 'multa', 'que pasa si no investigo', 'incumplimiento'],
  },
  {
    norma: NORMA,
    articulo: '16',
    titulo: 'Vigencia y derogatorias',
    texto:
      'La presente resolución rige a partir de su publicación y deroga las normas que le sean contrarias. Dada en Bogotá, D. C., a 14 de mayo de 2007.',
    temas: ['vigencia', 'desde cuando aplica'],
  },
]
