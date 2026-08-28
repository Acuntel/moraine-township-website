import type { Dictionary } from "../types";

export const assessor: Dictionary["assessor"] = {
  title: "Tasador",
  description:
    "La Oficina del Tasador de Moraine Township ayuda a los residentes con la tasación de su propiedad, las apelaciones de tasación y las exenciones del impuesto sobre la propiedad.",
  h1: "Tasador de Moraine Township",
  intro:
    "Nos comprometemos a servir a los residentes de Moraine Township de manera justa y equitativa. Nuestro personal está disponible para responder preguntas y brindar asistencia con la tasación de su propiedad, las apelaciones de tasación y las exenciones del impuesto sobre la propiedad.",

  officeIntro:
    "Bienvenido a la Oficina del Tasador de Moraine Township. Haremos todo lo posible por brindarle información pertinente sobre el proceso de tasación de su propiedad y las exenciones a las que podría tener derecho. La mayoría de nuestros registros se consideran información pública.",

  videoHeading: "Cómo apelar su tasación en línea",
  videoIntro:
    "Este video tutorial de la Oficina de Tasación del condado de Lake muestra paso a paso cómo presentar una apelación de tasación en línea en el sistema electrónico del condado. El video está en inglés.",
  videoTitle:
    "Tutorial de apelación de tasación en el sistema electrónico del condado de Lake (en inglés)",
  videoPosterAlt:
    "Primer cuadro del video tutorial: una calle residencial suburbana en un día soleado, con casas de dos pisos, árboles y botes de basura junto a la acera.",
  videoPlayLabel: "Reproducir el video tutorial de apelación de tasación",
  videoLinkLabel: "Ver el tutorial en YouTube",

  resourcesHeading: "Recursos del condado de Lake",
  resourcesIntro:
    "La Oficina del Tasador recomienda estos recursos del condado de Lake sobre exenciones, apelaciones y pagos del impuesto sobre la propiedad.",

  documentsHeading: "Documentos del Tasador",
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
