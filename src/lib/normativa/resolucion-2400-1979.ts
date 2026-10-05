import type { ArticuloNormativo } from './tipos'

const NORMA = 'Resolución 2400 de 1979'

/**
 * Resolución 2400 de 1979 del Ministerio de Trabajo y Seguridad Social
 * (22 de mayo de 1979), conocida como el "Estatuto de Seguridad Industrial":
 * disposiciones sobre vivienda, higiene y seguridad en los establecimientos
 * de trabajo.
 *
 * Texto tomado del PDF publicado por ARL Sura. La norma tiene más de 700
 * artículos, en su mayoría de aplicación industrial específica (calderas,
 * hornos, soldadura, minería, sustancias explosivas). Aquí se incluyen los
 * 25 artículos que una micro o pequeña empresa consulta con más frecuencia:
 * obligaciones de patrono y trabajador, condiciones del local, servicios
 * sanitarios, orden y limpieza, ropa de trabajo, elementos de protección
 * personal y código de colores de seguridad.
 */
export const RESOLUCION_2400_1979: ArticuloNormativo[] = [
  {
    norma: NORMA,
    articulo: '1',
    titulo: 'Campo de aplicación',
    texto:
      'Las disposiciones sobre vivienda, higiene y seguridad reglamentadas en la presente Resolución se aplican a todos los establecimientos de trabajo, sin perjuicio de las reglamentaciones especiales que se dicten para cada centro de trabajo en particular, con el fin de preservar y mantener la salud física y mental, prevenir accidentes y enfermedades profesionales, para lograr las mejores condiciones de higiene y bienestar de los trabajadores en sus diferentes actividades.',
    temas: ['a quien aplica', 'campo de aplicacion', 'estatuto de seguridad industrial'],
  },
  {
    norma: NORMA,
    articulo: '2',
    titulo: 'Obligaciones del patrono',
    texto:
      'Son obligaciones del patrono: a) Dar cumplimiento a lo establecido en la presente Resolución y demás normas legales en Medicina, Higiene y Seguridad Industrial, elaborar su propia reglamentación y hacer cumplir a los trabajadores las obligaciones de Salud Ocupacional que les correspondan. b) Proveer y mantener el medio ambiente ocupacional en adecuadas condiciones de higiene y seguridad, de acuerdo a las normas establecidas en la presente Resolución. c) Establecer un servicio médico permanente de medicina industrial, en aquellos establecimientos que presenten mayores riesgos de accidentes y enfermedades profesionales, debidamente organizado para practicar a todo su personal los exámenes psicofísicos, exámenes periódicos y asesoría médico-laboral y los que se requieran de acuerdo a las circunstancias; además llevar una completa estadística médico-social. d) Organizar y desarrollar programas permanentes de Medicina Preventiva, de Higiene y Seguridad Industrial y crear los comités paritarios (patronos y trabajadores) de Higiene y Seguridad que se reunirán periódicamente levantando las actas respectivas. e) El Comité de Higiene y Seguridad deberá intervenir en la elaboración del Reglamento de Higiene y Seguridad, o en su defecto un representante de la Empresa y otro de los trabajadores en donde no exista sindicato. f) Aplicar y mantener en forma eficiente los sistemas de control necesarios para protección de los trabajadores y de la colectividad contra los riesgos profesionales y condiciones o contaminantes ambientales originados en las operaciones y procesos de trabajo. g) Suministrar instrucción adecuada a los trabajadores antes de que se inicie cualquier ocupación, sobre los riesgos y peligros que puedan afectarles, y sobre la forma, métodos y sistemas que deban observarse para prevenirlos o evitarlos.',
    temas: [
      'obligaciones del patrono',
      'obligaciones del empleador',
      'que debo hacer como empresa',
      'reglamento de higiene',
      'induccion',
    ],
  },
  {
    norma: NORMA,
    articulo: '3',
    titulo: 'Obligaciones de los trabajadores',
    texto:
      'Son obligaciones de los trabajadores: a) Dar cumplimiento a las obligaciones que les correspondan en materia de Medicina, Higiene y Seguridad Industrial, de acuerdo con las normas legales y la reglamentación que establezca el patrono. b) Utilizar y mantener adecuadamente las instalaciones de la Empresa, los elementos de trabajo, los dispositivos para control de riesgos y los equipos de protección personal que el patrono suministre, y conservar el orden y aseo en los lugares de trabajo. c) Abstenerse de operar sin la debida autorización vehículos, maquinarias o equipos distintos a los que les han sido asignados. d) Dar aviso inmediato a sus superiores sobre la existencia de condiciones defectuosas, o fallas en las instalaciones, maquinarias, procesos y operaciones de trabajo, y sistemas de control de riesgos. e) Acatar las indicaciones de los servicios de Medicina Preventiva y Seguridad Industrial de la Empresa, y en caso necesario utilizar prontamente los servicios de primeros auxilios. f) No introducir bebidas u otras sustancias no autorizadas en los lugares o centros de trabajo, ni presentarse en los mismos bajo los efectos de sustancias embriagantes, estupefacientes o alucinógenas; y comportarse en forma responsable y seria en la ejecución de sus labores.',
    temas: [
      'obligaciones del trabajador',
      'deberes del empleado',
      'que debe hacer el trabajador',
      'uso del epp',
    ],
  },
  {
    norma: NORMA,
    articulo: '5',
    titulo: 'Condiciones de las edificaciones',
    texto:
      'Las edificaciones de los lugares de trabajo permanentes o transitorios, sus instalaciones, vías de tránsito, servicios higiénico-sanitarios y demás dependencias deberán estar construidas y conservadas en forma tal que garanticen la seguridad y la salud de los trabajadores y del público en general. Parágrafo: las instalaciones, máquinas, aparatos, equipos, canalizaciones y dispositivos complementarios de los servicios de agua potable, desagüe, gas industrial, tuberías de flujo, electricidad, ventilación, calefacción, refrigeración, deberán reunir los requisitos exigidos por las reglamentaciones vigentes.',
    temas: ['edificaciones', 'instalaciones seguras', 'condiciones del local'],
  },
  {
    norma: NORMA,
    articulo: '7',
    titulo: 'Iluminación, temperatura y ventilación',
    texto:
      'Todo local o lugar de trabajo debe contar con buena iluminación en cantidad y calidad, acorde con las tareas que se realicen; deben mantenerse en condiciones apropiadas de temperatura que no impliquen deterioro en la salud, ni limitaciones en la eficiencia de los trabajadores. Se debe proporcionar la ventilación necesaria para mantener aire limpio y fresco en forma permanente.',
    temas: [
      'iluminacion',
      'temperatura',
      'ventilacion',
      'aire fresco',
      'condiciones del puesto',
    ],
  },
  {
    norma: NORMA,
    articulo: '9',
    titulo: 'Superficie y volumen de aire por trabajador',
    texto:
      'La superficie de pavimento por trabajador no será menor de dos (2) metros cuadrados, con un volumen de aire suficiente para 11,5 metros cúbicos, sin tener en cuenta la superficie y el volumen ocupados por los aparatos, equipos, máquinas, materiales, instalaciones, etc. No se permitirá el trabajo en los locales cuya altura del techo sea menor de tres (3) metros, cualquiera que sea el sistema de cubierta. Parágrafo: el piso pavimento constituirá un conjunto homogéneo y liso sin soluciones de continuidad; será de material resistente, antirresbaladizo y en lo posible fácil de ser lavado.',
    temas: [
      'cuanto espacio por trabajador',
      'metros cuadrados por persona',
      'altura del techo',
      'espacio minimo',
      'volumen de aire',
    ],
  },
  {
    norma: NORMA,
    articulo: '11',
    titulo: 'Paredes',
    texto:
      'Las paredes serán lisas, protegidas y pintadas en tonos claros, susceptibles de ser lavadas o blanqueadas y serán mantenidas al igual que el pavimento, en buen estado de conservación, reparándose tan pronto como se produzcan grietas, agujeros o cualquier clase de desperfectos.',
    temas: ['paredes', 'pintura', 'mantenimiento del local'],
  },
  {
    norma: NORMA,
    articulo: '12',
    titulo: 'Anchura de corredores y pasillos',
    texto:
      'Los corredores que sirven de unión entre los locales, escaleras, etc., y los pasillos interiores de los locales de trabajo que conduzcan a las puertas de salida, deberán tener la anchura precisa teniendo en cuenta el número de trabajadores que deben circular por ellos, y de acuerdo a las necesidades propias de la industria y establecimiento de trabajo. La anchura mínima de los pasillos interiores de trabajo será de 1,20 metros. Parágrafo 1: la distancia entre máquinas, aparatos, equipos, etc., será la necesaria para que el trabajador pueda realizar su labor sin dificultad e incomodidad, evitando los posibles accidentes por falta de espacio, no será menor en ningún caso de 0,80 metros. Parágrafo 2: cuando las máquinas, aparatos, equipos, posean órganos móviles, las distancias se contarán a partir del punto más saliente del recorrido de dichos órganos. Alrededor de los hogares, hornos, calderas o cualquier otro equipo que sea un poco radiante de energía térmica (calor), se dejará un espacio libre de 1,50 metros.',
    temas: [
      'ancho de pasillos',
      'corredores',
      'distancia entre maquinas',
      'espacio de circulacion',
    ],
  },
  {
    norma: NORMA,
    articulo: '14',
    titulo: 'Puertas y escaleras',
    texto:
      'Todos los locales de trabajo deberán tener una cantidad suficiente de puertas y escaleras, de acuerdo a las necesidades de la industria. Las escaleras que sirvan de comunicación entre las distintas plantas del edificio ofrecerán las debidas condiciones de solidez, estabilidad y seguridad. Parágrafo: se procurará que sean de materiales incombustibles, espaciosas y seguras, y deberán estar provistas de pasamanos a una altura de 0,90 metros y de barandilla, que evite posibles caídas.',
    temas: ['escaleras', 'pasamanos', 'barandilla', 'puertas'],
  },
  {
    norma: NORMA,
    articulo: '16',
    titulo: 'Puertas de salida y de emergencia',
    texto:
      'Los locales de trabajo contarán con un número suficiente de puertas de salida, libres de todo obstáculo, amplias, bien ubicadas y en buenas condiciones de funcionamiento para facilitar el tránsito de emergencia. Tanto las puertas de salida, como las de emergencia deberán estar construidas para que se abran hacia el exterior y estarán provistas de cerraduras interiores de fácil operación. No se deberán instalar puertas giratorias; las puertas de emergencia no deberán ser de corredera ni de enrollamiento vertical.',
    temas: [
      'puertas de emergencia',
      'salida de emergencia',
      'evacuacion',
      'salidas',
    ],
  },
  {
    norma: NORMA,
    articulo: '17',
    titulo: 'Servicios sanitarios',
    texto:
      'Todos los establecimientos de trabajo (a excepción de las empresas mineras, canteras y demás actividades extractivas) en donde exista alcantarillado público, que funcionen o se establezcan en el territorio nacional, deben tener o instalar un inodoro, un lavamanos, un orinal y una ducha, en proporción de uno (1) por cada quince (15) trabajadores, separados por sexos, y dotados de todos los elementos indispensables para su servicio, consistentes en papel higiénico, recipientes de recolección, toallas de papel, jabón, desinfectantes y desodorantes. Parágrafo 1: los artefactos sanitarios (inodoros, orinales, lavamanos) deben ser construidos de un material impermeable, inoxidable, y con un acabado liso que facilite la limpieza. Parágrafo 2: cuando los lavamanos sean comunes o colectivos, se puede considerar que cada sesenta (60) centímetros longitudinales con su grifo correspondiente equivale a un lavamanos individual.',
    temas: [
      'cuantos banos',
      'servicios sanitarios',
      'inodoro por trabajador',
      'lavamanos',
      'ducha',
      'banos separados por sexo',
    ],
  },
  {
    norma: NORMA,
    articulo: '23',
    titulo: 'Agua potable',
    texto:
      'El agua para consumo humano debe ser potable, es decir, libre de contaminaciones físicas y bacteriológicas. Para la provisión de agua para beber se deben instalar fuentes de agua con vasos individuales, o instalarse surtidores mecánicos. Cuando se empleen vasos individuales, estos deben estar en un estuche, además, debe haber recipiente para los vasos usados. Queda prohibido el uso de vasos comunes.',
    temas: ['agua potable', 'agua para beber', 'vasos', 'hidratacion'],
  },
  {
    norma: NORMA,
    articulo: '24',
    titulo: 'Suministro de agua para beber',
    texto:
      'Se debe instalar, por lo menos, un sistema de suministro de agua para beber, por cada cincuenta (50) trabajadores. Se evitará el contacto directo del hielo con el agua. Se prefieren cámaras de enfriamiento con tuberías a través de las cuales circule el agua; si no se dispone de estas, se puede usar un recipiente cerrado con su compartimiento separado para el hielo, y su llave para la salida del agua fresca. En ningún caso se permitirá el uso de recipientes abiertos, de los que haya que verter o extraer el agua mediante tazas.',
    temas: ['suministro de agua', 'cuantos dispensadores', 'agua por trabajador'],
  },
  {
    norma: NORMA,
    articulo: '29',
    titulo: 'Orden y limpieza en los sitios de trabajo',
    texto:
      'Todos los sitios de trabajo, pasadizos, bodegas y servicios sanitarios deberán mantenerse en buenas condiciones de higiene y limpieza. Por ningún motivo se permitirá la acumulación de polvo, basuras y desperdicios.',
    temas: [
      'orden y limpieza',
      'aseo',
      'acumulacion de basura',
      'bodegas limpias',
      'higiene del local',
    ],
  },
  {
    norma: NORMA,
    articulo: '30',
    titulo: 'Prohibición del barrido en seco',
    texto:
      'No se permitirá el barrido, ni las operaciones de limpieza de suelo, paredes y techo susceptibles de producir polvo, en cuyo caso se sustituirán por la limpieza húmeda practicada en cualquiera de sus diferentes formas, o mediante la limpieza por aspiración.',
    temas: ['barrido en seco', 'limpieza humeda', 'polvo', 'aspiradora'],
  },
  {
    norma: NORMA,
    articulo: '31',
    titulo: 'Pisos limpios y secos',
    texto:
      'El piso de las salas de trabajo se mantendrá limpio y seco. En las industrias en que es imposible mantener los pisos secos, se les dará una inclinación adecuada y se instalará un sistema de drenaje, y otros artefactos similares para que el trabajador no esté expuesto permanentemente a la humedad. Todo trabajador que labore constantemente en sitios húmedos estará provisto de botas especiales, para su protección.',
    temas: ['pisos secos', 'humedad', 'drenaje', 'botas'],
  },
  {
    norma: NORMA,
    articulo: '32',
    titulo: 'Pisos libres de desperdicios y sustancias resbaladizas',
    texto:
      'Los pisos de las salas de trabajo y los corredores se mantendrán libres de desperdicios y sustancias que causen daño al trabajador. Se cuidará especialmente de que el pavimento no esté encharcado y se conserve limpio de aceite, grasas u otros cuerpos que lo hagan resbaladizo. Los aparatos, máquinas, instalaciones, etc., deberán mantenerse siempre en buen estado de limpieza.',
    temas: ['pisos resbaladizos', 'caidas', 'aceite en el piso', 'desperdicios'],
  },
  {
    norma: NORMA,
    articulo: '33',
    titulo: 'Momento de la limpieza',
    texto:
      'La limpieza de las salas de trabajo se efectuará siempre que sea posible, fuera de las horas de trabajo y se evitará diseminar polvo al ejecutarla. Las basuras y demás desperdicios se sacarán frecuentemente para mantener siempre en buenas condiciones los locales.',
    temas: ['cuando limpiar', 'horario de limpieza', 'sacar basura'],
  },
  {
    norma: NORMA,
    articulo: '34',
    titulo: 'Acumulación de materias en descomposición',
    texto:
      'Se evitará la acumulación de materias susceptibles de descomposición, de producir infección, o en general, nocivas o peligrosas, y se evacuarán o eliminarán por procedimientos adecuados los residuos de primeras materias o de fabricación, aguas residuales, etc., y los polvos, gases, vapores, etc., nocivos y peligrosos.',
    temas: ['residuos', 'materias en descomposicion', 'infeccion', 'evacuacion de residuos'],
  },
  {
    norma: NORMA,
    articulo: '37',
    titulo: 'Sillas para los trabajadores',
    texto:
      'En los establecimientos industriales, comerciales u otros semejantes, el patrono mantendrá un número suficiente de sillas a disposición de los trabajadores. Siempre que la naturaleza del trabajo lo permita, los puestos de trabajo deberán ser instalados de manera que el personal efectúe sus tareas sentado. Los asientos deberán ser cómodos y adecuados, de tal manera que se evite la fatiga en el trabajo que se realice.',
    temas: [
      'sillas',
      'trabajo sentado',
      'ergonomia',
      'puesto de trabajo',
      'fatiga',
    ],
  },
  {
    norma: NORMA,
    articulo: '38',
    titulo: 'Recolección de desperdicios y basuras',
    texto:
      'Todos los desperdicios y basuras se deberán recolectar en recipientes que permanezcan tapados; se evitará la recolección o acumulación de desperdicios susceptibles de descomposición, que puedan ser nocivos para la salud de los trabajadores.',
    temas: ['basuras', 'recipientes tapados', 'canecas', 'recoleccion'],
  },
  {
    norma: NORMA,
    articulo: '170',
    titulo: 'Ropa de trabajo',
    texto:
      'En todos los establecimientos de trabajo se suministrará a los trabajadores ropa de trabajo adecuada según los riesgos a que estén expuestos, y de acuerdo a la naturaleza del trabajo que se realice. Las ropas de trabajo deberán ajustar bien; no deberán tener partes flexibles que cuelguen, cordones sueltos, ni bolsillos demasiado grandes.',
    temas: [
      'ropa de trabajo',
      'uniforme',
      'dotacion',
      'que ropa dar',
    ],
  },
  {
    norma: NORMA,
    articulo: '176',
    titulo: 'Obligación de suministrar equipos de protección personal',
    texto:
      'En todos los establecimientos de trabajo en donde los trabajadores estén expuestos a riesgos físicos, mecánicos, químicos, biológicos, etc., los patronos suministrarán los equipos de protección adecuados, según la naturaleza del riesgo, que reúna condiciones de seguridad y eficiencia para el usuario.',
    temas: [
      'elementos de proteccion personal',
      'epp',
      'quien paga el epp',
      'obligacion de dar epp',
      'proteccion personal',
    ],
  },
  {
    norma: NORMA,
    articulo: '177',
    titulo: 'Clasificación de los equipos de protección personal',
    texto:
      'En orden a la protección personal de los trabajadores, los patronos estarán obligados a suministrar a estos los equipos de protección personal, de acuerdo con la siguiente clasificación. 1. Para la protección de la cabeza: cascos para los trabajadores de las minas, canteras, estructuras metálicas, construcciones y en general para los trabajadores que estén expuestos a recibir golpes en la cabeza por proyecciones o posibles caídas de materiales pesados, que serán resistentes y livianos, de material incombustible o de combustión lenta y no deberán ser conductores de electricidad (dieléctricos), ni permeables a la humedad; cofias para las personas con cabello largo y que trabajen alrededor de maquinaria y en establecimientos donde se preparan comestibles, drogas, etc.; protectores auriculares para los trabajadores que laboren en lugares en donde se produce mucho ruido y están expuestos a sufrir lesiones auditivas. 2. Para la protección de rostros y de los ojos: anteojos y protectores de pantalla adecuados contra toda clase de proyecciones de partículas, o de sustancias sólidas, líquidas o gaseosas, frías o calientes; anteojos y protectores especiales contra las radiaciones luminosas o caloríficas peligrosas; gafas resistentes para los trabajadores que desbastan al cincel, remachan, esmerilan o ejecutan operaciones similares; capuchas de tela-asbesto con visera de vidrio absorbente para operaciones que se realicen en horno, equipos térmicos y hogares. 3. Para la protección del sistema respiratorio: máscara respiratoria cuando no sea posible conseguir una eliminación satisfactoria de los gases, vapores u otras emanaciones nocivas para la salud; mascarillas respiratorias en comunicación con una fuente exterior de aire puro o con recipientes de oxígeno para trabajos en atmósferas altamente peligrosas, alcantarillas o lugares confinados; respiradores contra polvo, contra polvos tóxicos, contra humos, de filtro o cartucho químico, y máscaras de manguera con suministro de aire. 4. Para la protección de manos y brazos: guantes de caucho dieléctrico para electricistas que trabajen en circuitos vivos; guantes de cuero grueso, con protectores metálicos cuando se trabaje con materiales con filo; guantes de hule, caucho o plástico para la protección contra ácidos y sustancias alcalinas; guantes de tela asbesto para quienes operan en hornos y fundiciones; guantes de cuero para soldadura eléctrica y autógena; guantes confeccionados en mallas de acero inoxidable para el corte y deshuesado de carne y pescado; guanteletes para proteger contra sustancias tóxicas, irritantes o infecciosas; y guantes de maniobra para quienes operen taladros, prensas, punzonadoras, tornos y fresadoras, para evitar que las manos sean atrapadas por partes en movimiento de las máquinas.',
    temas: [
      'que epp dar',
      'tipos de epp',
      'casco',
      'guantes',
      'gafas de seguridad',
      'proteccion respiratoria',
      'proteccion auditiva',
      'tapaoidos',
    ],
  },
  {
    norma: NORMA,
    articulo: '202',
    titulo: 'Código de colores de seguridad',
    texto:
      'En todos los establecimientos de trabajo en donde se lleven a cabo operaciones y/o procesos que integren aparatos, máquinas, equipos, ductos, tuberías, etc. y demás instalaciones locativas necesarias para su funcionamiento, se utilizarán los colores básicos recomendados por la American Standard Association (A.S.A.) y otros colores específicos, para identificar los elementos, materiales, etc. y demás elementos específicos que determinen y/o prevengan riesgos que puedan causar accidentes o enfermedades profesionales.',
    temas: [
      'codigo de colores',
      'colores de seguridad',
      'senalizacion',
      'demarcacion',
    ],
  },
  {
    norma: NORMA,
    articulo: '203',
    titulo: 'Significado de los colores básicos de seguridad',
    texto:
      'Los colores básicos que se emplearán para señalar o indicar los diferentes materiales, elementos, máquinas, equipos, etc., son los siguientes. 1. El color rojo se empleará para señalar elementos y equipos de protección contra el fuego, tales como extintores, hidrantes y tuberías de alimentación de los mismos, cajas para mangueras, baldes y recipientes que contengan arena y agua, alarma y cajas accionadoras de las mismas puertas y escaleras de escape; recipientes comunes y de seguridad para almacenar toda clase de líquidos inflamables, con indicación de su contenido; barras o dispositivos que accionan mecanismos de parada en máquinas peligrosas y botones de parada en controles eléctricos; recipientes para lavado y desengrase de piezas; y tránsito en zonas escolares y sus alrededores. 2. El color naranja se empleará para señalar partes peligrosas de maquinaria y/o equipos cuyas operaciones mecánicas puedan triturar, cortar, golpear, prensar, etc., o cuya acción mecánica pueda causar lesión; contorno de las cajas individuales de control de maquinaria; interior de cajas y controles eléctricos; interior de guardas y protecciones; borde de partes expuestas de piñones, engranajes, poleas, rodillos y mecanismos de corte. 3. El color amarillo se empleará para señalar zonas peligrosas con color de fondo en avisos que indiquen precaución; equipos de construcción como buldózer y tractores; esquinas de lugares de almacenamiento; bordes expuestos y sin guardas de plataformas, aberturas en el piso y muros; pasamanos, barandas y partes superior e inferior de escaleras fijas peligrosas; grúas de taller y equipo utilizado para transporte y movilización de materiales; pilares, postes o columnas que puedan ser golpeados; y demarcación de áreas de trabajo y de almacenamiento (franjas de cinco centímetros de ancho); demarcación de áreas libres frente a equipos contra incendio (semicírculo de cincuenta centímetros de radio y franja de cinco centímetros de ancho). 4. El color verde esmeralda se empleará para señalar seguridad, equipos de primeros auxilios, botiquines, camillas, máscaras contra gases, fondo de cartelera de seguridad e instrucciones de seguridad; y el contorno del botón de arranque en los controles eléctricos de las máquinas. 7. El color azul se empleará para indicar PREVENCIÓN; color de fondo en avisos utilizados para señalar maquinaria y equipo sometido a reparación, mantenimiento, o que se encuentre fuera de servicio. 11. El color púrpura se empleará para señalar los riesgos de la radiación. 12. El color blanco se empleará para señalar demarcación de zonas de circulación, dirección o sentido de una circulación o vía, e indicación en el piso de recipientes de basura.',
    temas: [
      'que significa cada color',
      'color rojo',
      'color amarillo',
      'color verde',
      'color azul',
      'demarcacion de areas',
      'senalizacion de seguridad',
      'extintores',
    ],
  },
]
