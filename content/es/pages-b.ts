import type { Dictionary } from "../types";

export const assessor: Dictionary["assessor"] = {
  title: "Tasador",
  description:
    "El Tasador de Moraine Township valúa todas las propiedades gravables del township y ayuda a los residentes con exenciones, preguntas sobre la tasación y apelaciones.",
  h1: "Tasador de Moraine Township",
  intro:
    "Nos comprometemos a servir a la gente de Moraine Township de manera justa y equitativa. Nuestro personal está disponible para responder preguntas y brindar asistencia.",

  officeIntro:
    "Bienvenido a la Oficina del Tasador de Moraine Township. Haremos todo lo posible por brindarle la información disponible en nuestra oficina. La mayoría de nuestros registros se consideran información pública.",

  servicesHeading: "Servicios del Tasador",
  servicesBody: [
    "Los tasadores estiman el valor de mercado de todas las propiedades del township para determinar las tasaciones que definen su parte del impuesto sobre bienes raíces. Los tasadores hacen ajustes a las tasaciones cuando hay errores de hecho.",
    "La ley de Illinois otorga a los propietarios ciertas exenciones si usted es el propietario registrado y vive en la casa como residencia principal. Usar estas exenciones reducirá el impuesto sobre la propiedad que debe pagar.",
  ],

  deputyHeading: "Cómo pueden ayudarle nuestros tasadores adjuntos",
  deputyIntro:
    "Los tasadores adjuntos de Moraine Township pueden ayudar a los residentes elegibles a:",
  deputyItems: [
    "Solicitar la Exención de Vivienda para Personas Mayores",
    "Solicitar la Exención de Congelamiento de Tasación para Personas Mayores",
    "Solicitar el Programa de Aplazamiento del Impuesto sobre Bienes Raíces para Personas Mayores",
    "Solicitar la Exención General de Vivienda y la Exención por Mejoras a la Vivienda",
    "Solicitar exenciones para veteranos",
    "Entender las opciones como nuevo propietario",
    "Solicitar una revisión de desocupación comercial",
    "Encontrar la información necesaria para apelar una tasación",
    "Entender cómo el valor tasado afecta su factura de impuestos",
  ],

  mapHeading: "Mapa de Moraine Township",
  mapIntro:
    "Los límites de Moraine Township no siguen los límites de las ciudades. Use este mapa para verificar si su dirección está dentro del Township. Si aún no está seguro, llame a nuestra oficina y lo consultaremos por usted.",
  mapImageAlt:
    "Mapa de los límites de Moraine Township en el sureste del condado de Lake, Illinois, que muestra el contorno del Township frente al vecino West Deerfield Township y los municipios de Highland Park, Highwood, Lake Forest y Deerfield.",
  mapLongDescription:
    "Moraine Township se encuentra en el sureste del condado de Lake, Illinois, a lo largo de la costa del lago Michigan. Abarca 11.92 millas cuadradas, es decir, 7,627.7 acres. El Township incluye la mayor parte de Highland Park, todo Highwood, parte del sureste de Lake Forest y parte del este de Deerfield. El límite no sigue las líneas municipales. Highwood queda dentro del Township y Lake Forest queda al norte. West Deerfield Township limita con Moraine Township al oeste y, en algunos vecindarios, la línea pasa por el medio de una calle residencial, de modo que un lado de la calle está en Moraine Township y el otro lado está en West Deerfield Township. Las partes de Highland Park que quedan al oeste de esa línea pertenecen a West Deerfield Township y no a Moraine Township. Una pequeña porción del pueblo de Deerfield está dentro de Moraine Township, mientras que la mayor parte de Deerfield está en West Deerfield Township. Como la elegibilidad para los servicios del Township depende de vivir dentro de estos límites, los residentes que no estén seguros deben llamar a la oficina del Tasador al 847-432-2100 para confirmar su dirección.",
  mapWhyHeading: "Por qué importa el límite",
  mapWhyBody:
    "La elegibilidad para los servicios del Township, incluida la despensa de alimentos y la Asistencia General, depende de vivir dentro de Moraine Township. Como el límite puede pasar por el medio de una calle, pedimos a cada solicitante que confirme su dirección con nosotros primero.",

  seniorHeading: "Exenciones y aplazamiento de impuestos para personas mayores",
  seniorSections: [
    {
      id: "senior-homestead",
      heading: "Exención de Vivienda para Personas Mayores",
      body: [
        "Si cumplió 65 años en cualquier momento del año fiscal, tiene derecho a una reducción adicional de $8,000 de su valuación tasada, lo que equivale a una reducción de $24,000 del valor de mercado. Si tiene más de 65 años y no recibe esta exención, comuníquese con la Oficina del Tasador de Moraine Township.",
        "Una vez registrado, no tiene que renovarla mientras permanezca en esa dirección y sea su residencia principal.",
      ],
    },
    {
      id: "senior-freeze",
      heading: "Exención de Congelamiento de Tasación para Personas Mayores",
      body: [
        "Si tiene 65 años, califica para la Exención de Vivienda para Personas Mayores y su ingreso familiar total es de $65,000 o menos, el valor tasado de su propiedad queda congelado. Tenga en cuenta que esto no afecta la tasa del impuesto.",
        "Comuníquese con la Oficina del Tasador para iniciar esta exención, o preséntela en línea a través del sistema de presentación electrónica del condado de Lake, buscando el formulario de congelamiento para personas mayores. Esta exención debe renovarse cada año.",
      ],
    },
    {
      id: "senior-deferral",
      heading:
        "Programa de Aplazamiento del Impuesto sobre Bienes Raíces para Personas Mayores",
      body: [
        "La Ley de Aplazamiento de Bienes Raíces para Personas Mayores, 320 ILCS 30/1 y siguientes, permite a las personas mayores que califican aplazar la totalidad o parte de los impuestos y contribuciones especiales de su residencia principal. La residencia principal es la porción de vivienda de la propiedad y es la única porción por la que puede solicitar el aplazamiento.",
        "Los impuestos y contribuciones especiales no vencen hasta después del fallecimiento del propietario, o cuando la propiedad se vende o deja de calificar. Se coloca un gravamen sobre la propiedad y se cobra un interés simple del 6% anual.",
        "La fecha límite para presentar la solicitud es el 1 de marzo del año fiscal. Las solicitudes están disponibles en la Tesorería del condado de Lake, al 847-377-2323.",
      ],
      bullets: [
        "Tener 65 años o más para el 1 de junio del año fiscal",
        "Tener un ingreso familiar total no mayor de $65,000",
        "Haber vivido en la propiedad, u otra propiedad que califique, durante al menos los últimos tres años",
        "Ser propietario de la propiedad, compartir la propiedad conjunta con su cónyuge, o que usted y su cónyuge sean los únicos beneficiarios de un fideicomiso de tierras de Illinois",
        "Contar con seguro adecuado contra incendio o pérdida por siniestro",
        "No tener impuestos ni contribuciones especiales sin pagar sobre la propiedad",
      ],
    },
  ],

  otherExemptionsHeading: "Otras exenciones del impuesto sobre la propiedad",
  otherExemptionsSections: [
    {
      id: "general-homestead",
      heading: "Exención General de Vivienda",
      body: [
        "Si su propiedad es su residencia principal y vivía en ella el 1 de enero del año fiscal o antes, tiene derecho a una reducción de $8,000 de su valuación tasada, lo que equivale a una reducción de $24,000 del valor de mercado. Si es elegible y no aparece en su factura de impuestos, comuníquese con la Oficina del Tasador.",
      ],
    },
    {
      id: "homestead-improvement",
      heading: "Exención por Mejoras a la Vivienda",
      body: [
        "Si se hace una mejora o ampliación a la vivienda, el aumento de la tasación por esa modificación se mantiene fuera de los registros fiscales durante cuatro años. Se pueden mantener fuera hasta $25,000 de valor tasado, equivalentes a $75,000 de valor de mercado, durante ese período.",
      ],
    },
    {
      id: "veterans",
      heading:
        "Exenciones para veteranos que regresan, veteranos y personas con discapacidad",
      body: ["Para más detalles, consulte la Oficina de Tasación del Condado."],
    },
    {
      id: "new-owner",
      heading: "Nuevo propietario",
      body: [
        "Si compró su casa durante el último año, llámenos para conversar sobre las exenciones a las que podría tener derecho, o si el valor del Township es mayor que su precio de compra.",
      ],
    },
    {
      id: "commercial-vacancy",
      heading: "Desocupación de propiedades comerciales",
      body: [
        "Si tiene una propiedad comercial desocupada, la reducción por desocupación no se otorga de forma automática. Se requieren datos que la respalden para que se considere. Llámenos o descargue las pautas y la declaración jurada de desocupación del Township.",
      ],
    },
  ],

  documentsHeading: "Documentos del Tasador",
  appealsHeading: "Apelar su tasación",
  appealsIntro:
    "Nuestro personal está disponible para ayudar a los residentes a entender su tasación, responder preguntas sobre exenciones y brindar los recursos necesarios para evaluar una tasación y decidir si presentar una apelación. Puede haber casos en que el registro de la propiedad no sea exacto. La mayoría de las preguntas se pueden resolver por teléfono.",
  appealsSections: [
    {
      id: "what-is-assessment",
      heading: "Qué es una tasación",
      body: [
        "Una tasación consiste en identificar los bienes inmuebles dentro de una jurisdicción, registrarlos, valuarlos y asignarles un valor en los registros fiscales. Ese valor es la base para determinar qué porción de la carga fiscal total corresponde a cada propietario.",
        "En Illinois, el nivel legal de tasación es un tercio, o 33.33%, del valor de mercado de una propiedad, salvo que la ley disponga otra cosa. Véase el Código de Impuestos sobre la Propiedad, Sección 9-145. La ley exige una nueva tasación cada cuatro años, conocida como el año de tasación general. El Código también permite a los tasadores volver a tasar cualquier propiedad cada año cuando sea necesario.",
      ],
    },
    {
      id: "appeals-process",
      heading: "El proceso de apelación",
      body: [
        "Al pasar por el proceso de apelación, el propietario apela el valor tasado de la propiedad, no la factura de impuestos. Una apelación de tasación no es una queja por impuestos más altos. Es un intento de demostrar que el valor de la propiedad es incorrecto o injusto en comparación con propiedades similares.",
        "Las leyes de Illinois establecen un proceso de revisión administrativa. La revisión comienza con el Tasador del Township y, si es necesario, se pueden presentar apelaciones sucesivas ante la Junta de Revisión del condado de Lake, la Junta de Apelaciones de Impuestos sobre la Propiedad de Illinois y, finalmente, el Tribunal de Circuito.",
        "El tiempo es crítico. Existen plazos específicos para presentar apelaciones, y no presentarla a tiempo deja al contribuyente con pocas posibilidades de alivio hasta el año siguiente. Le recomendamos comunicarse con nuestra oficina durante la primera semana después de recibir su aviso de tasación.",
      ],
    },
    {
      id: "grounds",
      heading: "Fundamentos para una apelación",
      bullets: [
        "Errores de hecho, como metros cuadrados, número de chimeneas o baños. Nuestra oficina los corrige con facilidad y en muchos casos no se necesita apelación.",
        "Ventas recientes en su vecindario de tasación que indiquen que su propiedad está tasada por encima de propiedades comparables que se han vendido.",
        "Que su propiedad esté sobretasada en comparación con otras propiedades similares en su vecindario de tasación.",
        "Una tasación formal hecha por un tasador calificado.",
        "Un precio de compra reciente menor que el valor asignado por el Tasador.",
      ],
    },
    {
      id: "board-of-review",
      heading: "Junta de Revisión del condado de Lake",
      body: [
        "Una apelación formal de la valuación tasada puede presentarse ante la Junta de Revisión del condado de Lake dentro de los 30 días posteriores a la publicación del registro de tasación del township en un periódico local de circulación general. La Junta programará su apelación para una audiencia en Waukegan, en persona, por video o por teléfono.",
        "Nuestra oficina revisará su evidencia y presentará información adicional cuando sea necesario, y podríamos hacer una recomendación a la Junta en su nombre antes de la audiencia. Todas las quejas deben presentarse en los formularios establecidos y cumplir las reglas de la Junta. No se aceptan presentaciones tardías.",
      ],
    },
    {
      id: "complaint-types",
      heading: "Tipos de quejas",
      body: [
        "Las quejas de uniformidad o equidad se presentan cuando propiedades comparables están tasadas por debajo de la propiedad en apelación. Las casas comparables presentan estilo, metros cuadrados, materiales exteriores, comodidades, ubicación y condición similares. Los terrenos comparables deben ser similares en ubicación, tamaño, zonificación e influencias externas.",
        "Las quejas de valor de mercado se presentan cuando el valor tasado equalizado, convertido a valor de mercado, supera lo que la propiedad podría venderse razonablemente en el mercado abierto. La mejor evidencia es una venta reciente en condiciones normales de mercado, o una tasación profesional, con el tasador presente en la audiencia para explicar su metodología y conclusiones.",
        "Las quejas por cuestiones de derecho se centran en la violación de un requisito específico del Código de Impuestos sobre la Propiedad. Debe citarse el artículo del Código junto con una explicación de cómo no se cumplieron las normas.",
      ],
    },
    {
      id: "ptab",
      heading: "Junta de Apelaciones de Impuestos sobre la Propiedad",
      body: [
        "Un propietario que no esté conforme con el resultado ante la Junta de Revisión tiene 30 días desde la fecha de la decisión para apelar ante la Junta de Apelaciones de Impuestos sobre la Propiedad de Illinois. El contribuyente no apela el impuesto, sino la valuación tasada equalizada asignada por la Junta de Revisión.",
        "La Junta de Apelaciones es un organismo estatal cuasi judicial de cinco miembros nombrados por el Gobernador con el consejo y consentimiento del Senado. Las audiencias son de novo, es decir, se consideran como si la Junta de Revisión nunca hubiera visto ni decidido el caso. Sus decisiones pueden llevarse a los tribunales bajo la Ley de Revisión Administrativa.",
        "El impuesto sobre la propiedad se rige por el Código de Impuestos sobre la Propiedad, 35 ILCS 200/1-2 a 32-20.",
      ],
    },
  ],
};

export const transportation: Dictionary["transportation"] = {
  title: "Transporte puerta a puerta",
  description:
    "Moraine Township ofrece transporte puerta a puerta accesible para personas mayores y residentes con discapacidades, entre semana y con cita previa.",
  h1: "Transporte puerta a puerta",
  intro: "Para personas mayores y residentes con discapacidades.",

  body: [
    "El servicio de transporte accesible y confiable de Moraine Township garantiza que los residentes con discapacidades y las personas mayores que ya no conducen tengan acceso a atención médica y a otros viajes necesarios para su calidad de vida.",
    "Aunque los viajes médicos tienen prioridad, los residentes también pueden programar viajes para diligencias, voluntariado y otras necesidades de la vida diaria.",
  ],

  detailsHeading: "Cómo funciona el servicio",
  details: [
    {
      label: "Cuándo se programan los viajes",
      value: "Entre semana, de 8:30 a.m. a 4:00 p.m.",
    },
    {
      label: "Hasta dónde llegamos",
      value:
        "Hasta 15 millas más allá de los límites del Township, incluidos Evanston, el VA y Libertyville",
    },
    { label: "Tarifa estándar", value: "$4 por trayecto" },
    {
      label: "Tarifa para quienes califican por ingresos",
      value: "$2 por trayecto",
    },
    {
      label: "Pasajeros en silla de ruedas",
      value:
        "Un cuidador debe acompañar a los pasajeros en silla de ruedas, y los cuidadores viajan gratis",
    },
  ],

  scheduleHeading: "Programe un viaje",
  scheduleBody:
    "Llame a la línea de transporte para programar su viaje. Por favor llame con anticipación para que podamos incluir su trayecto en la ruta del día.",
  imageAlt:
    "Un hombre sostiene a una mujer mayor con andador mientras ella sube a la camioneta plateada de transporte puerta a puerta de Moraine Township, rotulada Moraine Door-to-Door con el teléfono 847-432-3000.",
};

export const boardMeetings: Omit<
  Dictionary["boardMeetings"],
  "minutesCards"
> = {
  title: "Junta y reuniones",
  description:
    "Agendas, calendario anual de reuniones ordinarias y actas aprobadas de la Junta de Síndicos de Moraine Township, publicadas conforme a la Ley de Reuniones Abiertas de Illinois.",
  h1: "Junta de Síndicos: reuniones y actas",
  intro:
    "Moraine Township publica aquí su calendario de reuniones, las agendas y las actas aprobadas, según lo exige la Ley de Reuniones Abiertas de Illinois. Las reuniones de la Junta son abiertas al público y los residentes pueden asistir.",

  scheduleHeading: "Calendario de reuniones ordinarias",
  scheduleIntro:
    "Calendario anual de reuniones ordinarias de la Junta de Síndicos. Las reuniones se celebran en la oficina del Township, 800 Central Avenue, Highland Park, salvo que un aviso indique lo contrario.",
  adoptedScheduleHeading: "Calendario adoptado de reuniones ordinarias",

  agendaHeading: "Agenda de la próxima reunión",
  agendaIntro:
    "La agenda de cada reunión ordinaria se publica al menos 48 horas antes de la reunión y permanece disponible durante todo ese período, según lo exige 5 ILCS 120/2.02.",
  agendaEmpty:
    "No hay ninguna agenda publicada en este momento. La agenda de la próxima reunión ordinaria se publicará al menos 48 horas antes de la reunión.",

  postedAgendasHeading: "Agendas publicadas",
  decennialHeading: "Informe del Comité Decenal",
  minutesHeading: "Actas",
  minutesIntro:
    "Las actas aprobadas de las reuniones ordinarias se publican dentro de los 10 días posteriores a su aprobación y permanecen publicadas por al menos 60 días, según lo exige 5 ILCS 120/2.06. Las actas se archivan por año, y las actas de sesiones cerradas se publican una vez liberadas.",

  legalNoteHeading: "Ley de Reuniones Abiertas",
  legalNoteBody:
    "Moraine Township cumple con la Ley de Reuniones Abiertas de Illinois, 5 ILCS 120. Si necesita una adaptación para asistir o participar en una reunión pública, comuníquese con la oficina del Township con anticipación y haremos los arreglos necesarios.",

  annualTownMeetingHeading: "Reunión Anual del Pueblo",
  annualTownMeetingBody:
    "El Secretario convoca cada año la Reunión Anual del Pueblo. Las actas de estas reuniones y los informes del Supervisor se archivan por año.",
};

export const cemeteries: Dictionary["cemeteries"] = {
  title: "Cementerios",
  description:
    "Moraine Township administra dos cementerios históricos en Highland Park: el cementerio Mooney en Ridge Road y el cementerio Daggitt en Lake Cook Road con St. Johns Avenue.",
  h1: "Cementerios de Moraine Township",
  intro:
    "Moraine Township administra dos cementerios en Highland Park. Invitamos a los visitantes a recorrer y disfrutar ambos.",

  introBody: [
    "Ambos cementerios pasaron a ser propiedades públicas administradas por el Township solo bien entrada la segunda mitad del siglo XX. Cada uno fue originalmente un cementerio privado de propiedad familiar. Para la década de 1980, se esperaba que los townships de Illinois se hicieran cargo de los cementerios abandonados.",
    "La ley de Illinois exige que los townships administren los cementerios abandonados dentro de sus límites, y por eso estos dos están a nuestro cuidado.",
  ],

  mooneyHeading: "Cementerio Mooney",
  mooneyLocation: "Ridge Road, al norte de Deerfield Road, Highland Park",
  mooneyBody: [
    "El cementerio Mooney comenzó con los colonos pioneros católicos irlandeses, entre ellos James Mooney, quienes ayudaron a construir una iglesia de troncos junto a la actual Green Bay Road alrededor de 1846. Después de que la congregación se mudara dos veces, el antiguo cementerio abandonado se vendió para desarrollo en 1899, y los entierros se trasladaron a una parte de las tierras de John Mooney en Ridge Road. En 1960, una anciana Cecilia Mooney cedió el cementerio al cuidado de Deerfield Township, hoy Moraine Township.",
    "Mooney cuenta con dos jardines de lluvia plantados con especies nativas, parte de un proyecto de 2013 para mitigar las inundaciones, junto con adoquines permeables en la calzada. Más de 70 voluntarios instalaron 750 plantas en los dos jardines de lluvia. El proyecto recibió el premio al Proyecto del Año de la Comisión de Manejo de Aguas Pluviales en 2014. En 2016 el Township implementó el Sistema de Gestión de Información de Cementerios para reunir mapas y registros en un solo lugar.",
    "Mooney permanece abierto y allí se realizan entierros de tiempo en tiempo.",
  ],
  mooneyImageAlt:
    "Un letrero de madera que dice Mooney Cemetery, Moraine Township, colocado detrás de un cantero de plantas nativas en flor y pastos altos, con árboles al fondo.",
  mooneyCta: "Leer la historia completa del cementerio Mooney",

  daggittHeading: "Cementerio Daggitt",
  daggittLocation:
    "Esquina de Lake Cook Road y St. Johns Avenue, cerca de la estación Braeside de Metra",
  daggittBody: [
    "Daggitt es el cementerio pionero, con lápidas que datan de 1845 y que cuentan la historia de los primeros colonos de la zona de Highland Park y Glencoe. Si la historia de Mooney es sobre católicos irlandeses, la de Daggitt es sobre colonos protestantes, metodistas ingleses y luteranos alemanes. Robert Daggitt, que llegó de Inglaterra a finales de la década de 1830, enterró aquí a tres de sus nueve hijos y más tarde permitió que los vecinos también usaran ese medio acre.",
    "Para la década de 1970 el cementerio estaba abandonado y en mal estado. La Ciudad y el Distrito de Parques de Highland Park, historiadores locales y las sociedades históricas de Glencoe y Highland Park trabajaron con el Township para volver a dedicarlo en 1996. Tras décadas de abandono y vandalismo, en 2022 se completó un proyecto de tres años para limpiar y estabilizar las lápidas y agregar nueva información sobre los entierros, seguido de un proyecto de plantas para polinizadores. La Ciudad de Highland Park otorgó al Township su Premio de Preservación Histórica en 2024.",
    "Daggitt está cerrado a nuevos entierros y se conserva como sitio histórico.",
  ],
  daggittImageAlt:
    "Un letrero negro y dorado que dice Daggitt Cemetery, Moraine Township, montado sobre una reja de hierro forjado, con lápidas desgastadas y árboles maduros en el césped detrás.",
  daggittCta: "Leer la historia completa del cementerio Daggitt",

  restorationHeading: "Restauración de las lápidas",
  restorationNote:
    "Entre 2020 y 2022 el Township limpió y reparó las lápidas históricas de Daggitt. Piedras que estaban inclinadas, rotas y sucias están ahora limpias, erguidas y alineadas, y las inscripciones que llevaban décadas ilegibles pueden leerse de nuevo. La lápida de Margaretha Rudolph, hallada rota en cuatro pedazos, es un ejemplo de ese trabajo.",
  recordsHeading: "Registros y archivos de los cementerios",
  recordsNote:
    "Escrituras, planos, levantamientos e investigación histórica de ambos cementerios. Si usted tiene una escritura familiar de Mooney, al Township le gustaría saber de usted.",
  contactHeading: "Comparta lo que sabe",
  contactBody:
    "Los registros de ambos cementerios están incompletos, y nos encantaría escuchar a cualquier persona que tenga historias o escrituras familiares que aportar. Si tiene información personal relacionada con alguno de los cementerios, comuníquese con la oficina del Supervisor.",

  historyBackLink: "Volver a Cementerios",
};
