import type { ArticuloNormativo } from './tipos'

const NORMA = 'Ley 776 de 2002'

/**
 * Ley 776 de 2002 (17 de diciembre de 2002): dicta normas sobre la organización,
 * administración y prestaciones del Sistema General de Riesgos Profesionales
 * —hoy Sistema General de Riesgos Laborales, por el artículo 1 de la Ley 1562
 * de 2012—. Es la norma que fija LOS MONTOS de las prestaciones económicas:
 * cuánto se paga por incapacidad temporal, cuánto vale la indemnización por
 * incapacidad permanente parcial, cuánto es la pensión de invalidez y la de
 * sobrevivientes, y el auxilio funerario.
 *
 * VIGENCIA (verificada el 11 de septiembre de 2026, antes de transcribir):
 * la ley está VIGENTE. No fue derogada ni sustituida. Se consultaron dos
 * normogramas oficiales y se cotejó el articulado artículo por artículo:
 * - Secretaría del Senado, versión con vigencia expresa y control de
 *   constitucionalidad (última actualización 31 de agosto de 2026):
 *   http://www.secretariasenado.gov.co/senado/basedoc/ley_0776_2002.html
 *   (las notas de vigencia se cargan por JavaScript desde
 *   .../basedoc/js/ley_0776_2002.js; hay que leer ese archivo para verlas).
 * - Gestor Normativo de Función Pública:
 *   https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=16752
 * Los 23 artículos coinciden literalmente entre ambas fuentes salvo tres
 * diferencias, todas resueltas abajo.
 *
 * RELACIÓN CON EL DECRETO 1295 DE 1994 (ya cargado en este corpus): la
 * Sentencia C-452 de 2002 declaró INEXEQUIBLES los artículos del Decreto-ley
 * 1295 que regulaban las prestaciones económicas, y esta ley los reemplazó.
 * La correspondencia es:
 * - Decreto 1295 art. 34 (derecho a las prestaciones) -> art. 1 de esta ley.
 * - Decreto 1295 arts. 36 y 37 (incapacidad temporal y su monto) -> arts. 2 y 3.
 * - Decreto 1295 art. 39 (reincorporación) -> art. 4.
 * - Decreto 1295 arts. 40, 42 y 43 (incapacidad permanente parcial y su monto)
 *   -> arts. 5 y 7.
 * - Decreto 1295 art. 45 (reubicación) -> art. 8.
 * - Decreto 1295 arts. 46 y 48 a 54 (invalidez, pensiones, auxilio funerario)
 *   -> arts. 9 a 17.
 * Por eso el Decreto 1295 de este corpus no trae ningún monto: los montos son
 * los de acá. El ingreso base de liquidación (IBL) sobre el que se calculan
 * estas prestaciones es el del artículo 5 de la Ley 1562 de 2012, también en
 * el corpus (el art. 20 del Decreto 1295 fue declarado inexequible).
 *
 * APARTES INEXEQUIBLES ENCONTRADOS Y CÓMO SE MANEJARON:
 * - Artículo 1, Parágrafo 1: declarado INEXEQUIBLE por la Corte Constitucional
 *   (Sentencia C-425 de 2005, M. P. Jaime Araújo Rentería). Decía: "La
 *   existencia de patologías anteriores no es causa para aumentar el grado de
 *   incapacidad, ni las prestaciones que correspondan al trabajador". NO se
 *   incluye en el texto de abajo. Es el único aparte inexequible de la ley.
 * - No hay ningún otro artículo tachado. La Corte declaró EXEQUIBLES el
 *   artículo 7 inciso 1 (C-1141 de 2008), el artículo 10 (C-252 de 2004) y el
 *   artículo 21 (C-516 de 2004), y se declaró INHIBIDA sobre el artículo 7
 *   parcial (C-184 de 2010).
 *
 * OMITIDOS POR ESTAR SUPERADOS POR NORMA POSTERIOR:
 * - Artículo 6 (declaración de la incapacidad permanente parcial): el texto
 *   literal sigue vigente, pero atribuye la calificación a "una comisión médica
 *   interdisciplinaria" que nunca se reglamentó. Quien califica en primera
 *   oportunidad hoy es la ARL, la EPS o la AFP, y en primera instancia las
 *   Juntas Regionales de Calificación de Invalidez (art. 41 de la Ley 100 de
 *   1993, modificado por el art. 52 de la Ley 962 de 2005 y por el art. 142 del
 *   Decreto 19 de 2012, más el art. 18 de la Ley 1562 de 2012). Citarlo haría
 *   que el chatbot describiera un procedimiento que no existe.
 * - Artículo 18 (prescripción: 3 años las mesadas, 1 año las demás
 *   prestaciones): sustituido por el artículo 22 de la Ley 1562 de 2012, que
 *   unificó TODO en 3 años contados desde que se genera, concreta y determina
 *   el derecho. Ese artículo 22 todavía no está cargado en el corpus, así que
 *   por ahora el chatbot no puede responder sobre prescripción; citar el 18
 *   daría el plazo viejo de 1 año.
 *
 * OMITIDOS POR NO SER RELEVANTES PARA UNA PYME:
 * - Artículo 1, Parágrafo 3 (régimen de reservas técnicas del ISS y la
 *   Superintendencia Bancaria) y Parágrafo 2, incisos 2 y 3 (repetición entre
 *   administradoras por enfermedad profesional): recortados con […].
 * - Artículos 19, 20 y 21 (determinación y variación de la cotización a la ARL
 *   y traslado de administradora): modifican los artículos 15, 32 y 33 del
 *   Decreto 1295, que ya se habían omitido de este corpus por la misma razón.
 * - Artículo 22 (objeto del Fondo de Riesgos Laborales) y artículo 23
 *   (vigencia). Nota: es el único artículo donde las dos fuentes discrepan de
 *   fondo —Función Pública lo publica con la modificación del art. 12 de la Ley
 *   1562 de 2012 y el Senado publica el texto original—; se omite igual, así
 *   que la discrepancia no afecta a este archivo.
 *
 * SOBRE EL TEXTO TRANSCRITO:
 * - Se conserva la terminología de 2002 ("riesgos profesionales", "enfermedad
 *   profesional", "ARP"), que la Ley 1562 de 2012 renombró a "riesgos
 *   laborales", "enfermedad laboral" y "ARL". Los `temas` traen los nombres
 *   actuales para que la búsqueda funcione.
 * - Se corrigieron dos erratas tipográficas de la fuente, sin tocar ninguna
 *   palabra: en el art. 14 el Senado imprime "Gobierno Nocional" y Función
 *   Pública "Gobierno Nacional" (se usó "Nacional"); en el art. 9 ambas fuentes
 *   imprimen "en qu e hubiere" con un espacio suelto (se usó "en que hubiere").
 * - Los recortes por longitud están marcados con […] y no reescriben nada.
 */
export const LEY_776_2002: ArticuloNormativo[] = [
  {
    norma: NORMA,
    articulo: '1',
    titulo: 'Derecho a las prestaciones',
    texto:
      'Todo afiliado al Sistema General de Riesgos Profesionales que, en los términos de la presente ley o del Decreto-ley 1295 de 1994, sufra un accidente de trabajo o una enfermedad profesional, o como consecuencia de ellos se incapacite, se invalide o muera, tendrá derecho a que este Sistema General le preste los servicios asistenciales y le reconozca las prestaciones económicas a los que se refieren el Decreto-ley 1295 de 1994 y la presente ley. Parágrafo 2. Las prestaciones asistenciales y económicas derivadas de un accidente de trabajo o de una enfermedad profesional, serán reconocidas y pagadas por la administradora en la cual se encuentre afiliado el trabajador en el momento de ocurrir el accidente o, en el caso de la enfermedad profesional, al momento de requerir la prestación. […] La Administradora de Riesgos Profesionales en la cual se hubiere presentado un accidente de trabajo, deberá responder íntegramente por las prestaciones derivados de este evento, tanto en el momento inicial como frente a sus secuelas, independientemente de que el trabajador se encuentre o no afiliado a esa administradora. Las acciones de recobro que adelanten las administradoras son independientes a su obligación de reconocimiento del pago de las prestaciones económicas dentro de los dos (2) meses siguientes contados desde la fecha en la cual se alleguen o acrediten los requisitos exigidos para su reconocimiento. Vencido este término, la administradora de riesgos profesionales deberá reconocer y pagar, en adición a la prestación económica, un interés moratorio igual al que rige para el impuesto de renta y complementarios en proporción a la duración de la mora. Lo anterior, sin perjuicio de las sanciones a que haya lugar. […]',
    temas: [
      'quien paga si me accidento en el trabajo',
      'que me cubre la arl',
      'derecho a las prestaciones',
      'cuanto se demora la arl en pagar',
      'la arl no me quiere pagar',
      'intereses de mora de la arl',
      'accidente de trabajo prestaciones',
      'enfermedad laboral quien responde',
    ],
  },
  {
    norma: NORMA,
    articulo: '2',
    titulo: 'Incapacidad temporal',
    texto:
      'Se entiende por incapacidad temporal, aquella que según el cuadro agudo de la enfermedad o lesión que presente el afiliado al Sistema General de Riesgos Profesionales, le impida desempeñar su capacidad laboral por un tiempo determinado.',
    temas: [
      'que es la incapacidad temporal',
      'definicion de incapacidad',
      'me incapacitaron por un accidente',
      'incapacidad laboral',
    ],
  },
  {
    norma: NORMA,
    articulo: '3',
    titulo: 'Monto de las prestaciones económicas por incapacidad temporal',
    texto:
      'Todo afiliado a quien se le defina una incapacidad temporal, recibirá un subsidio equivalente al cien (100%) de su salario base de cotización, calculado desde el día siguiente el que ocurrió el accidente de trabajo y hasta el momento de su rehabilitación, readaptación o curación, o de la declaración de su incapacidad permanente parcial, invalidez o su muerte. El pago se efectuará en los períodos en que el trabajador reciba regularmente su salario. Para la enfermedad profesional será el mismo subsidio calculado desde el día siguiente de iniciada la incapacidad correspondiente a una enfermedad diagnosticada como profesional. El período durante el cual se reconoce la prestación de que trata el presente artículo será hasta por ciento ochenta (180) días, que podrán ser prorrogados hasta por períodos que no superen otros ciento ochenta (180) días continuos adicionales, cuando esta prórroga se determine como necesaria para el tratamiento del afiliado, o para culminar su rehabilitación. Cumplido el período previsto en el inciso anterior y no se hubiese logrado la curación o rehabilitación del afiliado, se debe iniciar el procedimiento para determinar el estado de incapacidad permanente parcial o de invalidez. Hasta tanto no se establezca el grado de incapacidad o invalidez la ARP continuará cancelando el subsidio por incapacidad temporal. Parágrafo 1. Para los efectos de este sistema, las prestaciones se otorgan por días calendario. Parágrafo 2. Las entidades administradoras de riesgos profesionales deberán asumir el pago de la cotización para los Sistemas Generales de Pensiones y de Seguridad Social en Salud, correspondiente a los empleadores, durante los períodos de incapacidad temporal y hasta por un ingreso base de la cotización, equivalente al valor de la incapacidad. La proporción será la misma establecida para estos sistemas en la Ley 100 de 1993. Parágrafo 3. La Administradora de Riesgos Profesionales podrá pagar el monto de la incapacidad directamente o a través del empleador. […]',
    temas: [
      'cuanto me pagan si me incapacitan',
      'cuanto paga la arl por incapacidad',
      'me accidente en el trabajo cuanto cobro',
      'me pagan el 100 por ciento del salario',
      'cuantos dias dura la incapacidad',
      'prorroga de la incapacidad 180 dias',
      'quien paga la incapacidad por accidente de trabajo',
      'tengo que seguir pagando seguridad social durante la incapacidad',
    ],
  },
  {
    norma: NORMA,
    articulo: '4',
    titulo: 'Reincorporación al trabajo',
    texto:
      'Al terminar el período de incapacidad temporal, los empleadores están obligados, si el trabajador recupera su capacidad de trabajo, a ubicarlo en el cargo que desempeñaba, o a reubicarlo en cualquier otro para el cual esté capacitado, de la misma categoría.',
    temas: [
      'tengo que recibir al trabajador despues de la incapacidad',
      'reincorporacion al trabajo',
      'volver al puesto despues de una incapacidad',
      'lo puedo despedir al volver de incapacidad',
      'obligaciones del empleador incapacidad',
    ],
  },
  {
    norma: NORMA,
    articulo: '5',
    titulo: 'Incapacidad permanente parcial',
    texto:
      'Se considera como incapacitado permanente parcial, al afiliado que, como consecuencia de un accidente de trabajo o de una enfermedad profesional, presenta una disminución definitiva, igual o superior al cinco por ciento 5%, pero inferior al cincuenta por ciento 50% de su capacidad laboral, para lo cual ha sido contratado o capacitado. La incapacidad permanente parcial se presenta cuando el afiliado al Sistema General de Riesgos Profesionales, como consecuencia de un accidente de trabajo o de una enfermedad profesional, sufre una disminución parcial, pero definitiva en alguna o algunas de sus facultades para realizar su trabajo habitual, en los porcentajes establecidos en el inciso anterior.',
    temas: [
      'que es incapacidad permanente parcial',
      'perdida de capacidad laboral',
      'me quedo una secuela del accidente',
      'porcentaje de perdida de capacidad laboral',
      'perdi un dedo en el trabajo',
    ],
  },
  {
    norma: NORMA,
    articulo: '7',
    titulo: 'Monto de la incapacidad permanente parcial',
    texto:
      'Todo afiliado al Sistema General de Riesgos Profesionales a quien se le defina una incapacidad permanente parcial, tendrá derecho a que se le reconozca una indemnización en proporción al daño sufrido, a cargo de la entidad administradora de riesgos profesionales, en una suma no inferior a dos (2) salarios base de liquidación, ni superior a veinticuatro (24) veces su salario base de liquidación. En aquellas patologías que sean de carácter progresivo, se podrá volver a calificar y modificar el porcentaje de la pérdida de la capacidad laboral. En estos casos, la Administradora sólo estará obligada a reconocer el mayor valor resultante de restarle al monto de la nueva indemnización el valor previamente reconocido actualizado por IPC, desde el momento del pago hasta la fecha en la que se efectúe el nuevo pago. El Gobierno Nacional determinará, periódicamente, los criterios de ponderación y la tabla de evaluación de incapacidades, para determinar la disminución en la capacidad laboral. Hasta tanto se utilizará el Manual Unico de Calificación de Invalidez vigente a la fecha de la calificación.',
    temas: [
      'cuanto me indemnizan por incapacidad permanente parcial',
      'indemnizacion por perder un dedo',
      'cuanto paga la arl de indemnizacion',
      'indemnizacion por accidente de trabajo',
      'entre 2 y 24 salarios',
      'tabla de calificacion de invalidez',
      'me pueden volver a calificar',
    ],
  },
  {
    norma: NORMA,
    articulo: '8',
    titulo: 'Reubicación del trabajador',
    texto:
      'Los empleadores están obligados a ubicar al trabajador incapacitado parcialmente en el cargo que desempeñaba o a proporcionarle un trabajo compatible con sus capacidades y aptitudes, para lo cual deberán efectuar los movimientos de personal que sean necesarios.',
    temas: [
      'tengo que reubicar al trabajador',
      'reubicacion laboral por restricciones medicas',
      'el trabajador quedo con restricciones',
      'cambiar de puesto por recomendaciones medicas',
      'obligaciones del empleador reubicacion',
    ],
  },
  {
    norma: NORMA,
    articulo: '9',
    titulo: 'Estado de invalidez',
    texto:
      'Para los efectos del Sistema General de Riesgos Profesionales, se considera inválida la persona que por causa de origen profesional, no provocada intencionalmente, hubiese perdido el cincuenta por ciento (50%) o más de su capacidad laboral de acuerdo con el Manual Unico de Calificación de Invalidez vigente a la fecha de la calificación. En primera instancia, la calificación de los porcentajes de pérdida de la capacidad laboral se hará por el equipo interdisciplinario establecido en el artículo 6o. de la presente ley, dentro del mes siguiente a la fecha en que hubiere concluido el proceso de rehabilitación integral, de existir discrepancias se acudirá a las Juntas de Calificación de Invalidez, quedando a cargo de la entidad de Seguridad Social correspondiente el pago de honorarios y demás gastos que se ocasionen. El costo del dictamen será a cargo de la Administradora de Riesgos Profesionales, pero el empleador o el trabajador podrán acudir directamente ante dichas juntas.',
    temas: [
      'cuando se considera invalido',
      'que es el estado de invalidez',
      'perdi mas del 50 por ciento de capacidad laboral',
      'junta de calificacion de invalidez',
      'quien paga la junta de calificacion',
      'no estoy de acuerdo con la calificacion',
    ],
  },
  {
    norma: NORMA,
    articulo: '10',
    titulo: 'Monto de la pensión de invalidez',
    texto:
      'Todo afiliado al que se le defina una invalidez tendrá derecho, desde ese mismo día, a las siguientes prestaciones económicas, según sea el caso: a) Cuando la invalidez es superior al cincuenta por ciento (50%) e inferior al sesenta y seis por ciento (66%), tendrá derecho a una pensión de invalidez equivalente al sesenta por ciento (60%) del ingreso base de liquidación; b) Cuando la invalidez sea superior al sesenta y seis por ciento (66%), tendrá derecho a una pensión de invalidez equivalente al setenta y cinco por ciento (75%) del ingreso base de liquidación; c) Cuando el pensionado por invalidez requiere el auxilio de otra u otras personas para realizar las funciones elementales de su vida, el monto de la pensión de que trata el literal anterior se incrementa en un quince por ciento (15%). Parágrafo 1. Los pensionados por invalidez de origen profesional, deberán continuar cotizando al Sistema General de Seguridad en Salud, con sujeción a las disposiciones legales pertinentes. Parágrafo 2. No hay lugar al cobro simultáneo de las prestaciones por incapacidad temporal y pensión de invalidez. Como tampoco lo habrá para pensiones otorgadas por los regímenes común y profesional originados en el mismo evento. El trabajador o quien infrinja lo aquí previsto será investigado y sancionado de acuerdo con lo dispuesto en las leyes vigentes, sin perjuicio de las restituciones a que haya lugar por lo cobrado y obtenido indebidamente.',
    temas: [
      'cuanto es la pension de invalidez',
      'pension de invalidez por accidente de trabajo',
      'porcentaje de la pension de invalidez',
      'me quede invalido cuanto me pagan',
      'gran invalidez 15 por ciento adicional',
      'necesito ayuda de otra persona pension',
    ],
  },
  {
    norma: NORMA,
    articulo: '11',
    titulo: 'Muerte del afiliado o del pensionado por riesgos profesionales',
    texto:
      'Si como consecuencia del accidente de trabajo o de la enfermedad profesional sobreviene la muerte del afiliado, o muere un pensionado por riesgos profesionales, tendrán derecho a la pensión de sobrevivientes las personas descritas en el artículo 47 de la Ley 100 de 1993, y su reglamentario.',
    temas: [
      'quien recibe la pension si muere el trabajador',
      'se me murio un trabajador en la empresa',
      'beneficiarios de la pension de sobrevivientes',
      'muerte por accidente de trabajo',
      'pension para la esposa e hijos',
    ],
  },
  {
    norma: NORMA,
    articulo: '12',
    titulo: 'Monto de la pensión de sobrevivientes en el Sistema General de Riesgos Profesionales',
    texto:
      'El monto mensual de la pensión de sobrevivientes será, según sea el caso: a) Por muerte del afiliado el setenta y cinco por ciento (75%) del salario base de liquidación; b) Por muerte del pensionado por invalidez el ciento por ciento (100%) de lo que aquel estaba recibiendo como pensión. Cuando el pensionado disfrutaba de la pensión reconocida con fundamento en el literal c) del artículo 10 de la presente ley la pensión se liquidará y pagará descontando el quince por ciento (15%) que se le reconocía al causante.',
    temas: [
      'cuanto es la pension de sobrevivientes',
      'cuanto le pagan a la familia si muere el trabajador',
      'pension por muerte en accidente de trabajo',
      'monto pension de sobrevivientes 75 por ciento',
      'pension de viudez por accidente laboral',
    ],
  },
  {
    norma: NORMA,
    articulo: '13',
    titulo: 'Monto de las pensiones',
    texto:
      'Ninguna pensión de las contempladas en esta ley podrá ser inferior al salario mínimo legal mensual vigente, ni superior a veinte (20) veces este mismo salario.',
    temas: [
      'pension minima y maxima',
      'la pension puede ser menor al salario minimo',
      'tope de la pension de riesgos laborales',
      'monto minimo de la pension de invalidez',
    ],
  },
  {
    norma: NORMA,
    articulo: '14',
    titulo: 'Reajuste de pensiones',
    texto:
      'Las pensiones de invalidez y de sustitución o sobrevivientes del Sistema General de Riesgos Profesionales se reajustarán anualmente, de oficio el primero (1o.) de enero de cada año, en el porcentaje de variación del índice de precios al consumidor total nacional, certificado por el Dane para el año inmediatamente anterior. No obstante, las pensiones cuyo monto mensual sea igual al salario mínimo legal mensual vigente, serán reajustadas de oficio cada vez y con el mismo porcentaje en que se incremente dicho salario por el Gobierno Nacional, cuando dicho reajuste resulte superior al de la variación del IPC, previsto en el inciso anterior.',
    temas: [
      'cada cuanto suben la pension',
      'reajuste anual de la pension',
      'la pension sube con el ipc',
      'incremento de pensiones de riesgos laborales',
    ],
  },
  {
    norma: NORMA,
    articulo: '15',
    titulo: 'Devolución de saldos e indemnización sustitutiva',
    texto:
      'Cuando un afiliado al Sistema General de Riesgos Profesionales se invalide o muera como consecuencia de un accidente de trabajo o de una enfermedad profesional, además de la pensión de invalidez o de sobrevivientes que deberá, reconocerse de conformidad con la presente ley, se entregará al afiliado o a los beneficiarios: a) Si se encuentra afiliado al Régimen de Ahorro Individual con Solidaridad, la totalidad del saldo de su cuenta individual de ahorro pensional; b) Si se encuentra afiliado el Régimen Solidario de Prima Media con Prestación Definida la indemnización sustitutiva prevista en el artículo 37 de la Ley 100 de 1993. Parágrafo. Para efectos del saldo de la cuenta de ahorro individual, los bonos pensionales, en desarrollo del artículo 139, numeral 5, de la Ley 100 de 1993, se redimirán anticipadamente a la fecha de la declaratoria de la invalidez o de la muerte de origen profesional.',
    temas: [
      'que pasa con los ahorros de pension si me invalido',
      'devolucion de saldos del fondo de pensiones',
      'indemnizacion sustitutiva',
      'ademas de la pension que mas me dan',
      'plata del fondo de pensiones por muerte',
    ],
  },
  {
    norma: NORMA,
    articulo: '16',
    titulo: 'Auxilio funerario',
    texto:
      'La persona que compruebe haber sufragado los gastos de entierro de un afiliado o de un pensionado por invalidez del Sistema de Riesgos Profesionales, tendrá derecho a recibir un auxilio funerario igual el determinado en el artículo 86 de la Ley 100 de 1993. El auxilio deberá ser cubierto por la respectiva entidad administradora de riesgos profesionales. En ningún caso puede haber doble pago de este auxilio.',
    temas: [
      'auxilio funerario',
      'quien paga el entierro del trabajador',
      'gastos de funeral por accidente de trabajo',
      'cuanto da la arl para el entierro',
      'auxilio de sepelio',
    ],
  },
  {
    norma: NORMA,
    articulo: '17',
    titulo: 'Suspensión de las prestaciones económicas previstas en el Sistema de esta ley',
    texto:
      'Las entidades Administradoras de Riesgos Profesionales suspenderán el pago de las prestaciones económicas establecidas en el Decreto-ley 1295 de 1994 y en la presente ley, cuando el afiliado o el pensionado no se someta a los exámenes, controles o prescripciones que le sean ordenados; o que rehúse, sin causa justificada, a someterse a los procedimientos necesarios para su rehabilitación física y profesional o de trabajo. El pago de estas prestaciones se reiniciará, si hay lugar a ello, cuando el pensionado o el afiliado se someta a los exámenes, controles y prescripciones que le sean ordenados o a los procedimientos necesarios para su rehabilitación física y profesional o de trabajo.',
    temas: [
      'cuando la arl puede suspender el pago',
      'el trabajador no va a los controles medicos',
      'suspension de la incapacidad',
      'me suspendieron la pension de invalidez',
      'no asistir a la rehabilitacion',
    ],
  },
]
