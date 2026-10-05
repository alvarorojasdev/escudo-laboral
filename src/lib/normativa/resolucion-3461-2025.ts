import type { ArticuloNormativo } from './tipos'

const NORMA = 'Resolución 3461 de 2025'

/**
 * Resolución 3461 de 2025 del Ministerio del Trabajo (expedida el 1 de
 * septiembre de 2025, publicada en el Diario Oficial 53.240 del 11 de
 * septiembre de 2025): define la conformación y el funcionamiento del Comité
 * de Convivencia Laboral en entidades públicas y empresas privadas.
 *
 * QUÉ DEROGÓ. Su artículo 16 deroga íntegramente la Resolución 652 de 2012 y
 * la Resolución 1356 de 2012. Por eso la 652 y la 1356 NO están en este corpus:
 * citarlas hoy sería citar normas derogadas. El artículo 16 se carga
 * justamente para que el asistente pueda responder que ya no rigen.
 *
 * QUÉ CAMBIÓ frente a la 652 + 1356 (verificado contra el texto de ambas):
 * - Conformación por tamaño. La 652, en la versión que le dio el artículo 1 de
 *   la 1356, tenía dos tramos: en general cuatro (4) integrantes —dos (2) del
 *   empleador y dos (2) de los trabajadores, con suplentes— y, en empresas de
 *   menos de veinte (20) trabajadores, uno (1) por cada parte con suplentes.
 *   La 3461 (art. 3) abre tres tramos: menos de cinco (5) trabajadores, un
 *   representante por parte (el texto no les exige suplentes); más de cinco (5)
 *   y menos de veinte (20), uno (1) por parte CON suplentes; más de veinte
 *   (20), cuatro (4) integrantes, dos (2) por parte, con suplentes.
 * - Reuniones ordinarias: vuelven a ser MENSUALES. La 652 original ya las
 *   fijaba "por lo menos una (1) vez al mes", el artículo 3 de la 1356 las pasó
 *   a "cada tres (3) meses", y la 3461 (art. 9) las devuelve a mensuales. El
 *   quórum sigue siendo la mitad más uno de los integrantes.
 * - Un comité por centro de trabajo. Bajo la 652/1356 (art. 4) bastaba un (1)
 *   comité por empresa y los adicionales por regiones, departamentos o
 *   municipios eran VOLUNTARIOS. La 3461 (art. 3) los vuelve obligatorios:
 *   quien tenga dos (2) o más centros de trabajo debe conformar uno de nivel
 *   central y otro adicional por cada centro de trabajo.
 * - Impedimento para ser miembro: pasa de "los seis (6) meses anteriores a su
 *   conformación" (652/1356, art. 3) a "el año anterior a su conformación"
 *   (3461, art. 3).
 * - Plazo máximo del trámite de una queja: es nuevo. El procedimiento
 *   preventivo no puede superar sesenta y cinco (65) días calendario contados
 *   desde la queja formal (art. 6, parágrafo 2); la 652 no fijaba tope global.
 * - Acoso sexual: es nuevo. El Comité NO es competente, porque esas conductas
 *   no son conciliables (art. 6, parágrafo 1, por la Ley 2365 de 2024).
 * - No cambió el período del Comité: sigue siendo de dos (2) años (art. 5).
 *
 * VIGENCIA VERIFICADA (17-sep-2026). El Gestor Normativo de Función Pública no
 * registra sobre esta norma ninguna anotación de derogatoria ni de suspensión
 * (su bloque "Vigencias" viene vacío), y el Ministerio del Trabajo la siguió
 * aplicando como norma vigente en sus conceptos 028141 (23-ene-2026), 053651
 * (5-feb-2026) y 055711 (6-feb-2026). Existe una demanda de nulidad admitida
 * por el Consejo de Estado (admisión reportada el 14-oct-2025), pero la sola
 * admisión no suspende una norma: haría falta una medida cautelar expresa, que
 * no consta en fuente oficial. Si esa medida llegara a decretarse, este archivo
 * debe revisarse.
 *
 * FUENTES. Texto tomado del Gestor Normativo de Función Pública
 * (norma.php?i=262916) y de su PDF oficial (norma_pdf.php?i=262916), y
 * verificado fragmento por fragmento contra la transcripción independiente de
 * SafetYA (safetya.co/normatividad/resolucion-3461-de-2025/); los datos
 * numéricos se cruzaron además contra la infografía del SIDN de la Rama
 * Judicial. Se conservan las erratas del original ("no pobra(sic)"), porque el
 * propio Gestor Normativo las marca así.
 *
 * QUÉ SE OMITIÓ. El artículo 11 (procedimiento preventivo), porque repite sin
 * plazos los mismos pasos que ya trae la tabla de funciones del artículo 6, y
 * el artículo 14 (obligaciones de las ARL), que no es una carga del empleador.
 * Dentro de los artículos cargados se recortó, marcando el corte con […] o …
 * y sin reescribir nada: los parágrafos 1 y 2 del artículo 3 (quejas de
 * trabajadores en misión de empresas de servicios temporales), las funciones 5
 * y 7 a 10 y los parágrafos 3 y 4 del artículo 6, y parte del listado de
 * medidas preventivas y correctivas del artículo 12.
 */
export const RESOLUCION_3461_2025: ArticuloNormativo[] = [
  {
    norma: NORMA,
    articulo: '1',
    titulo: 'Objeto',
    texto:
      'El objeto de la presente. Resolución es definir la conformación, y funcionamiento del Comité de Convivencia ' +
      'Laboral en entidades públicas y empresas privadas, así como establecer la responsabilidad que les asiste a ' +
      'los empleadores públicos y privados y a las Administradoras de Riesgos Laborales frente al desarrollo de las ' +
      'medidas preventivas y correctivas del acoso laboral.',
    temas: [
      'que es el comite de convivencia laboral',
      'para que sirve el comite de convivencia',
      'comite de convivencia laboral',
      'objeto de la resolucion 3461 de 2025',
      'medidas preventivas y correctivas del acoso laboral',
    ],
  },
  {
    norma: NORMA,
    articulo: '2',
    titulo: 'Ámbito de aplicación',
    texto:
      'La presente Resolución se aplica a todos los empleadores, empresas públicas o privadas, contratantes, ' +
      'contratistas, trabajadores dependientes e independientes, estudiantes y a las entidades administradoras de ' +
      'riesgos laborales, en lo de su competencia.',
    temas: [
      'a quienes aplica el comite de convivencia',
      'mi empresa tiene que cumplir esto',
      'ambito de aplicacion',
      'aplica a empresas privadas y publicas',
      'aplica a contratistas e independientes',
    ],
  },
  {
    norma: NORMA,
    articulo: '3',
    titulo: 'Conformación',
    texto:
      'El Comité de Convivencia Laboral estará compuesto por representantes del empleador y de las y los ' +
      'trabajadores, con sus respectivos suplentes. Las y los integrantes del Comité podrán contar con competencias ' +
      'actitudinales y comportamentales, tales como respeto, imparcialidad, tolerancia, serenidad, ' +
      'confidencialidad, reserva en el manejo de información y ética; así mismo habilidades de comunicación ' +
      'asertiva, liderazgo y resolución de conflictos. En las entidades públicas y las empresas privadas con menos ' +
      'de cinco (5) trabajadores, dicho comité estará conformado por un representante de las y los trabajadores y ' +
      'uno (1) del empleador. En el caso de las entidades públicas y las empresas privadas con más de cinco (5) y ' +
      'menos de veinte (20) trabajadores, dicho comité estará conformado por un (1) representante de las y los ' +
      'trabajadores y uno (1) del empleador, con sus respectivos suplentes. En el caso de entidades públicas y las ' +
      'empresas privadas con más de veinte (20) trabajadores, el Comité estará conformado por cuatro (4) ' +
      'integrantes, dos (2) representantes de las y los trabajadores y dos (2) del empleador, con sus respectivos ' +
      'suplentes. Las entidades públicas y empresas privadas podrán de acuerdo con su organización interna designar ' +
      'un mayor número de representantes, los cuales en todo caso deben ser iguales en ambas partes. Las entidades ' +
      'públicas y las empresas privadas que posean dos (2) o más centros de trabajo deberán conformar los comités ' +
      'de convivencia laboral, teniendo en cuenta su organización interna, para el cumplimiento de lo dispuesto en ' +
      'la presente resolución, uno de nivel central y otro adicional por cada centro de trabajo. El empleador ' +
      'designará directamente a sus representantes, y las y los trabajadores elegirán los suyos a través de ' +
      'votación secreta qué represente la expresión libre, espontánea y auténtica de todas las y los trabajadores, ' +
      'mediante escrutinio público, cuyo procedimiento deberá ser adoptado por cada empresa o entidad pública, e ' +
      'incluirse en la respectiva convocatoria de la elección. Los representantes del empleador no necesariamente ' +
      'deben ser de nivel directivo, y los de las y los trabajadores no necesariamente de nivel operativo. El ' +
      'Comité de Convivencia Laboral de entidades públicas y empresas privadas no podrá conformarse con ' +
      'trabajadoras o trabajadores a los que se les haya formulado una queja de acoso laboral, o que hayan sido ' +
      'víctimas de acoso laboral, en el año anterior a su conformación. …',
    temas: [
      'cuantos miembros lleva el comite de convivencia',
      'como se conforma el comite de convivencia',
      'tengo que tener comite de convivencia',
      'somos 8 empleados necesitamos comite',
      'empresas con menos de 5 trabajadores',
      'empresas con mas de 20 trabajadores',
      'quien elige el comite de convivencia',
      'comite por cada centro de trabajo',
    ],
  },
  {
    norma: NORMA,
    articulo: '4',
    titulo: 'Reglamento de funcionamiento',
    texto:
      'El Comité de Convivencia Laboral, una vez conformado, debe elaborar su propio reglamento el cual establecerá ' +
      'las condiciones de su funcionamiento. El reglamento debe incluir los acuerdos de confidencialidad que se ' +
      'establezcan al interior del Comité y debe ser cumplido por todas las y los integrantes, así como definir los ' +
      'mecanismos y protocolos específicos para asegurar el manejo reservado de la información sensible, tanto ' +
      'durante el tratamiento de los casos como después del cierre de estos.',
    temas: [
      'reglamento del comite de convivencia',
      'confidencialidad del comite de convivencia',
      'acuerdos de confidencialidad',
      'manejo reservado de la informacion',
      'que documentos debe tener el comite',
    ],
  },
  {
    norma: NORMA,
    articulo: '5',
    titulo: 'Período del Comité de Convivencia Laboral',
    texto:
      'El período de vigencia del Comité de Convivencia será de dos (2) años, a partir de la conformación de este, ' +
      'que se contarán desde la fecha de la comunicación de la elección y/o designación de los integrantes. En caso ' +
      'de retiro del representante principal, podrá asumir las funciones el suplente, sin necesidad de convocar a ' +
      'nuevas elecciones. PARÁGRAFO 1. En caso de que el número de trabajadores de la empresa varíe durante el ' +
      'periodo de vigencia del comité, no será necesario ajustar la conformación del mismo hasta la finalización ' +
      'del período. PARÁGRAFO 2. Al finalizar el periodo de vigencia del comité de convivencia laboral, este debe ' +
      'entregar toda la documentación al nuevo comité con el fin de que esta información continué siendo custodiada ' +
      'y se cumpla con las normas de reserva y confidencialidad de la información ya que son datos sensibles.',
    temas: [
      'cuanto dura el comite de convivencia',
      'periodo de los miembros del comite',
      'cada cuanto se cambia el comite de convivencia',
      'que pasa si se retira un miembro del comite',
      'si cambia el numero de trabajadores',
      'entrega de documentos al nuevo comite',
    ],
  },
  {
    norma: NORMA,
    articulo: '6',
    titulo: 'Funciones del Comité de Convivencia Laboral',
    texto:
      'El Comité de Convivencia Laboral es una instancia preventiva de acoso laboral independiente en su ' +
      'funcionamiento que contribuye a proteger a los trabajadores contra los riesgos psicosociales que afectan la ' +
      'salud en los lugares de trabajo, su rol es preventivo, orientador, conciliador y canalizador, por lo ' +
      'anterior, el comité no determina si hay acoso laboral. Los Comité de Convivencia laboral deben cumplir con ' +
      'las funciones señaladas en la normatividad, las cuales deben ser realizadas dentro de los siguientes ' +
      'términos, garantizando el derecho al debido proceso y los principios de Celeridad, Eficacia, Imparcialidad y ' +
      'Confidencialidad, así: Funciones Tiempos 1. Recibir y dar trámite a las quejas presentadas en las que se ' +
      'describan situaciones que puedan constituir acoso laboral. Cinco (5) días calendario 2. Examinar de manera ' +
      'confidencial los casos específicos o puntuales en los que se formule queja o reclamo, que pudieran tipificar ' +
      'conductas o circunstancias de acoso laboral, al interior de la entidad pública o empresa privada. Cinco (5) ' +
      'días calendario. El Comité para ampliar el termino por diez (10) días calendario más, previa justificación ' +
      'escrita. En todo caso el termino máximo no podrá superar los quince (15) días calendario. 3. Escuchar a las ' +
      'partes involucradas de manera individual sobre los hechos que dieran lugar a la queja. Cinco (5) días ' +
      'calendario 4. Adelantar reuniones con el fin de crear un espacio de diálogo entre las partes involucradas, ' +
      'promoviendo compromisos mutuos para llegar a una solución efectiva de las controversias; y formular un plan ' +
      'de mejora concertando entre las partes, para construir, renovar y promover la convivencia laboral, ' +
      'garantizando en todos los casos el principio de la confidencialidad. Entre cinco (5) días calendario, ' +
      'después de escuchar a las partes de manera individual. El Comité podrá ampliar el termino por diez (10) días ' +
      'calendario, previa justificación escrita. En todo caso el termino máximo no pobra(sic) superar los 15 días ' +
      'calendario. […] 6. En aquellos casos en que no se llegue a un acuerdo entre las partes, no se cumplan las ' +
      'recomendaciones formuladas o la conducta persista, el Comité de Convivencia Laboral, deberá remitir la queja ' +
      'a la Procuraduría General de la Nación o a las Personerías Distritales y Municipales, de acuerdo con la ' +
      'circunscripción territorial, tratándose del sector público. En el sector privado el Comité de Convivencia ' +
      'Laboral informará a la alta dirección de la empresa, cerrará el caso y la trabajadora o el trabajador puede ' +
      'presentar la queja ante el inspector de trabajo o demanda ante el juez competente. La remisión deberá ' +
      'realizarse máximo a los quince (15) días calendario, una vez se verifique el incumplimiento. […] PARÁGRAFO ' +
      '1. En los casos de acoso sexual y en lo pertinente a la Ley 2365 de 2024 "Por medio de la cual se adoptan ' +
      'medidas de prevención, protección y atención del acoso sexual en el ámbito laboral y en las instituciones de ' +
      'educación superior en Colombia y se dieran otras disposiciones" el Comité de Convivencia no es el ' +
      'competente. ya que estas conductas no son conciliables. Para estos casos, la alta dirección de la empresa o ' +
      'el jefe de talento humano debe establecer el procedimiento para recibir las quejas de presunto acoso sexual ' +
      'o violencia por razones de género y las medidas dé atención, prevención y protección. PARÁGRAFO 2. El ' +
      'procedimiento preventivo para la resolución de las quejas de acoso laboral no podrá extenderse por un ' +
      'periodo superior a sesenta y cinco (65) días calendario, contados a partir de la fecha en que se reciba la ' +
      'queja formal; por lo tanto, los tiempos aquí detallados no son acumulativos. Estos términos deberán ser ' +
      'definidos en cada caso, de acuerdo con las capacidades de los Comités de Convivencia Laboral de cada entidad ' +
      'pública o empresa privada. …',
    temas: [
      'funciones del comite de convivencia',
      'que hace el comite de convivencia',
      'cuanto se demora una queja de acoso',
      'plazos para tramitar una queja de acoso laboral',
      'el comite no decide si hay acoso laboral',
      'el comite no es competente para acoso sexual',
      'acoso sexual ley 2365 de 2024',
      'a donde se remite la queja si no hay acuerdo',
    ],
  },
  {
    norma: NORMA,
    articulo: '7',
    titulo: 'Presidente del Comité de Convivencia Laboral',
    texto:
      'El Comité de Convivencia Laboral deberá elegir por mutuo acuerdo entre sus integrantes, el presidente o la ' +
      'presidenta, quien tendrá las siguientes funciones: 1 . Convocar a las y los integrantes del Comité a las ' +
      'sesiones ordinarias y extraordinarias. 2 . Presidir y orientar las reuniones ordinarias y extraordinarias en ' +
      'forma dinámica y eficaz. 3 . Tramitar ante la administración de la entidad pública o empresa privada, las ' +
      'recomendaciones aprobadas en el Comité y hacer seguimiento de su cumplimiento de manera mensual. 4 . ' +
      'Gestionar ante la alta dirección de la entidad pública o empresa privada, los recursos requeridos para el ' +
      'funcionamiento del Comité y garantizar la confidencialidad de la información. 5 . Hacer seguimiento al ' +
      'cumplimiento de las funciones del Comité de Convivencia Laboral.',
    temas: [
      'presidente del comite de convivencia',
      'quien preside el comite de convivencia',
      'funciones del presidente del comite',
      'quien convoca las reuniones del comite',
    ],
  },
  {
    norma: NORMA,
    articulo: '8',
    titulo: 'Secretario del Comité de Convivencia Laboral',
    texto:
      'El Comité de Convivencia Laboral deberá elegir entre sus integrantes el secretario o la secretaria, por ' +
      'mutuo acuerdo, quien tendrá las siguientes funciones: 1 . Recibir y dar trámite a las quejas presentadas por ' +
      'escrito en las que se describan las situaciones que puedan constituir acoso laboral, así como las pruebas ' +
      'que las soportan. 2 . Enviar por medio físico o electrónico a las y los integrantes del Comité la ' +
      'convocatoria realizada por el presidente a las sesiones ordinarias y extraordinarias, indicando el día, la ' +
      'hora y el lugar de la reunión. 3 . Citar individualmente a cada una de las partes involucradas en las ' +
      'quejas, con-el fin de escuchar los hechos que dieran lugar a la misma. 4 . Citar conjuntamente a las y los ' +
      'trabajadores involucradas en las quejas con el fin de establecer compromisos de convivencia. 5 . Llevar el ' +
      'archivo de las actas, quejas presentadas, la documentación soporte y velar por la reserva, custodia y ' +
      'confidencialidad de la información. 6 . Elaborar el orden del día y las actas de cada una de las sesiones ' +
      'del Comité. 7 . Enviar las comunicaciones con las recomendaciones dadas por el Comité a las diferentes ' +
      'dependencias de la entidad pública o empresa privada. 8 . Citar a reuniones y solicitar los soportes ' +
      'requeridos para hacer seguimiento al cumplimiento de los compromisos adquiridos por cada una de las partes ' +
      'involucradas. 9 . Remitir a la alta dirección de la entidad pública o empresa privada, los informes ' +
      'trimestrales sobre la gestión del Comité que incluya estadísticas de las quejas, seguimiento de los casos y ' +
      'recomendaciones. El rol de secretaria o secretario del comité puede ser ejercido de manera alterna por cada ' +
      'uno de los integrantes, previo acuerdo y designación formal en reunión del Comité. El integrante designado ' +
      'deberá asumir las funciones durante el periodo acordado.',
    temas: [
      'secretario del comite de convivencia',
      'funciones del secretario del comite',
      'quien lleva las actas del comite',
      'quien recibe las quejas de acoso laboral',
      'archivo y custodia de las quejas',
    ],
  },
  {
    norma: NORMA,
    articulo: '9',
    titulo: 'Reuniones ordinarias',
    texto:
      'El Comité de Convivencia Laboral se reunirá ordinariamente de forma mensual para el desarrollo de ' +
      'actividades administrativas como la elaboración de informes, seguimiento a los compromisos establecidos por ' +
      'las partes involucradas en los casos y formulación de recomendaciones al área de talento humano y seguridad ' +
      'y salud en el trabajo. Las reuniones sesionarán con la mitad más uno de sus integrantes.',
    temas: [
      'cada cuanto se reune el comite',
      'reuniones ordinarias del comite de convivencia',
      'el comite se reune de forma mensual',
      'con cuantos miembros sesiona el comite',
      'quorum del comite de convivencia',
    ],
  },
  {
    norma: NORMA,
    articulo: '10',
    titulo: 'Reuniones extraordinarias',
    texto:
      'El-Comité de Convivencia Laboral se reunirá extraordinariamente cada vez que se reciba una queja de acoso ' +
      'laboral para adelantar el procedimiento preventivo para la resolución de estas. Las reuniones ' +
      'extraordinarias serán convocadas por la secretaria técnica.',
    temas: [
      'reuniones extraordinarias del comite',
      'cuando se reune el comite por una queja',
      'quien convoca las reuniones extraordinarias',
      'reunion urgente por una queja de acoso',
    ],
  },
  {
    norma: NORMA,
    articulo: '12',
    titulo: 'Responsabilidad de los Empleadores Públicos y Privados',
    texto:
      'Las entidades públicas y las empresas privadas, a través de la dependencia responsable de gestión del ' +
      'talento humano y el Sistema de Gestión de Seguridad y Salud en el Trabajo, deben desarrollar las siguientes ' +
      'medidas preventivas y correctivas de acoso laboral, con el fin de promover un excelente ambiente de ' +
      'convivencia laboral, fomentando relaciones sociales positivas, el bienestar y la salud mental de todas y ' +
      'todos los trabajadores: Medidas preventivas: - Formular una política clara dirigida a prevenir el acoso ' +
      'laboral que incluya el compromiso, por parte del empleador, de promover un ambiente de convivencia laboral. ' +
      '- Elaborar manuales de convivencia, en los que se identifiquen las conductas no aceptables en la entidad o ' +
      'empresa. […] - Realizar seguimiento y vigilancia periódica del acoso laboral, garantizando la ' +
      'confidencialidad de la información. - Desarrollar actividades dirigidas a fomentar el apoyo social, trabajo ' +
      'en equipo, comunicación armónica y promoción de relaciones sociales positivas, entre las y los trabajadores ' +
      'de todos los niveles jerárquicos de la empresa. - Conformar el Comité de Convivencia Laboral y establecer un ' +
      'procedimiento interno confidencial, conciliatorio y efectivo para prevenir las conductas de acoso laboral. - ' +
      'Establecer el procedimiento para formular la queja, señalando las formas a través de las cuales se pueden ' +
      'denunciar los hechos constitutivos de presunto acoso laboral, garantizando la confidencialidad y el respeto ' +
      'por las y los trabajadores. […] Medidas correctivas: - Implementar acciones de intervención y control ' +
      'específicas de factores de riesgo psicosociales relacionados con violencia en el trabajo, fomentando una ' +
      'cultura de convivencia laboral. […] - Facilitar el traslado de las y los trabajadores a otra dependencia de ' +
      'la entidad, cuando el médico laboral de la EPS, el médico tratante o el Comité de Convivencia. lo ' +
      'recomienden; garantizando adecuadas condiciones de trabajo y procurando un clima laboral positivo. […] - ' +
      'Atender las recomendaciones para el desarrollo efectivo de las medidas preventivas y correctivas del acoso ' +
      'laboral que formule el Comité de Convivencia Laboral.',
    temas: [
      'que debe hacer el empleador contra el acoso laboral',
      'obligaciones del empleador frente al acoso laboral',
      'politica de prevencion del acoso laboral',
      'manual de convivencia laboral',
      'medidas preventivas y correctivas',
      'capacitaciones sobre acoso laboral',
    ],
  },
  {
    norma: NORMA,
    articulo: '13',
    titulo: 'Recursos para el funcionamiento del Comité',
    texto:
      'Para garantizar el cumplimiento de las funciones del Comité de Convivencia Laboral, las entidades públicas y ' +
      'empresas privadas, deben realizar las siguientes acciones: - Asignar un espacio físico para las reuniones y ' +
      'demás actividades del Comité de Convivencia Laboral, así como los elementos para el manejo reservado de la ' +
      'documentación. - Disponer de los recursos financieros y técnicos necesarios para su funcionamiento. - ' +
      'Otorgar a los integrantes del Comité de Convivencia Laboral, los tiempos requeridos para el desarrollo de ' +
      'sus funciones, durante la jornada laboral.',
    temas: [
      'recursos para el comite de convivencia',
      'que debe darle la empresa al comite',
      'tiempo para las reuniones del comite',
      'espacio fisico para el comite',
      'presupuesto del comite de convivencia',
    ],
  },
  {
    norma: NORMA,
    articulo: '15',
    titulo: 'Sanciones',
    texto:
      'El incumplimiento a lo establecido en la normatividad legal vigente será sancionado de conformidad con lo ' +
      'dispuesto en el artículo 91 , del Decreto 1295 de 1994, modificado parcialmente por el artículo 115 del ' +
      'Decreto 2150 de 1995 y el artículo 13 , de la Ley 1562 de 2012, en armonía con el Capítulo 11, del Título 4, ' +
      'de la Parte 2, del Libro 2, del Decreto 1072 de 2015. La investigación administrativa y la sanción serán de ' +
      'competencia de las Direcciones Territoriales del Ministerio del Trabajo en los términos del mencionado ' +
      'artículo 91 , del Decreto 1295 de 1994, sin perjuicio del poder preferente de que trata el artículo 32 , de ' +
      'la Ley 1562 de 2012.',
    temas: [
      'multas por no tener comite de convivencia',
      'sanciones del comite de convivencia',
      'que pasa si no cumplo con el comite',
      'quien sanciona el ministerio del trabajo',
    ],
  },
  {
    norma: NORMA,
    articulo: '16',
    titulo: 'Vigencia',
    texto:
      'La presente Resolución rige a partir de su publicación y deroga las Resoluciones 652 y 1356 de 2012.',
    temas: [
      'desde cuando rige la resolucion 3461',
      'la resolucion 652 de 2012 sigue vigente',
      'derogacion de la resolucion 652 y 1356',
      'que norma rige el comite de convivencia',
      'resolucion 652 derogada',
    ],
  },
]
