import type { Dictionary } from "../types";

export const programs: Omit<Dictionary["programs"], "grantees"> = {
  title: "Programas",
  description:
    "El Programa de Subvenciones de Moraine Township financia agencias locales sin fines de lucro que sirven a los residentes. El Comité Asesor Latino conecta al Township con nuestra comunidad latina.",
  h1: "Programas del Township",
  intro:
    "Más allá de los servicios directos a los residentes, el Township financia agencias locales sin fines de lucro y convoca comités asesores que nos mantienen conectados con la comunidad.",

  grantsHeading: "Programa de Subvenciones",
  grantsIntro: [
    "Moraine Township administra fondos para brindar servicios y apoyo receptivos, eficientes y compasivos a los residentes que lo necesitan. Cada año se otorgan subvenciones a diversas agencias sin fines de lucro que ofrecen programas o servicios no sectarios en beneficio de personas que viven o trabajan en Moraine Township.",
    "Los programas financiados deben complementar la misión de Moraine Township sin duplicar los servicios que el Township ya presta. Se da prioridad especial a las agencias que ayudan al Township a ofrecer una red de protección a sus residentes más vulnerables y económicamente desfavorecidos, incluidos los servicios para personas mayores, jóvenes y residentes con discapacidades. Las agencias sostenidas principalmente con fondos de los contribuyentes, o afiliadas de otro modo a un organismo recaudador, no son elegibles.",
    "En 2025 el Township otorgó $175,000 en subvenciones. El apoyo financiero no puede darse por supuesto de un año a otro.",
  ],

  grantsCommitteeHeading: "Comité Asesor Ciudadano de Subvenciones",
  grantsCommitteeBody:
    "Un Comité Asesor Ciudadano de Subvenciones, integrado por voluntarios nombrados por el Supervisor del Township, revisa las solicitudes y hace recomendaciones de financiamiento a la Junta de Síndicos, que vota las adjudicaciones en abril o mayo. Los miembros del comité aportan una amplia variedad de experiencia y participación comunitaria y representan un corte transversal de la demografía del Township. Tres miembros electos de la Junta se suman como enlaces.",

  granteesHeading: "Beneficiarios recientes",
  granteesNote:
    "Agencias que recibieron financiamiento del Programa de Subvenciones de Moraine Township en 2025. La lista de beneficiarios de 2026 se publicará después de la votación de la Junta.",

  latinoHeading: "Comité Asesor Latino",
  latinoBody: [
    "Los miembros del Comité Asesor Latino de Moraine Township actúan como enlaces con nuestra comunidad latina local. Colaboran para informar a los residentes sobre los servicios disponibles en Moraine Township, y para informar a los Síndicos del Township sobre las brechas en servicios humanos que el Township podría ayudar a atender.",
    "La Junta de Síndicos desea fomentar la participación ciudadana en el gobierno creando un ambiente acogedor para la comunidad latina.",
  ],
  latinoCalendarHeading: "Reuniones",
  latinoCalendarBody:
    "El comité se reúne periódicamente, por lo general en las tardes entre semana. Para recibir las fechas y agendas de las reuniones, escriba a la oficina del Township y pida que lo agreguen a la lista de distribución. Si desea saber más sobre cómo unirse al comité, complete una solicitud de voluntariado y alguien se comunicará con usted.",

  mentalHealthHeading: "Junta Comunitaria de Salud Mental",
  mentalHealthBody:
    "La Junta Comunitaria de Salud Mental de Moraine Township financia servicios de salud mental, discapacidad del desarrollo y uso de sustancias para los residentes del Township. La Junta mantiene su propio sitio web con sus prioridades de financiamiento, su calendario de reuniones y la información para solicitar fondos.",
  mentalHealthCta: "Visite el sitio de la Junta Comunitaria de Salud Mental",
};

export const getInvolved: Dictionary["getInvolved"] = {
  title: "Participe",
  description:
    "Sea voluntario en la despensa de alimentos de Moraine Township, ayude en colectas de alimentos, prepare declaraciones de impuestos o únase a un comité asesor de ciudadanos.",
  h1: "¿Quiere ayudar?",
  intro:
    "Moraine Township agradece a los voluntarios que hacen posible ofrecer servicios ampliados a los residentes.",

  topAskHeading: "Lo que más necesitamos",
  topAskBody:
    "Voluntarios semanales regulares en la despensa de alimentos. Clasificar, acomodar en estantes, limpiar y ayudar a quienes vienen a comprar es el trabajo que mantiene la despensa abierta tres días por semana. La edad mínima para ser voluntario es 16 años. Si puede comprometerse a un turno por semana, eso es lo más útil que puede darnos.",
  topAskCta: "Complete una solicitud de voluntariado",

  waysHeading: "Otras formas de ayudar",
  ways: [
    {
      title: "Turnos en la despensa y recogida de alimentos",
      body: "Clasificar, acomodar, limpiar, ayudar a quienes vienen a comprar y recoger donaciones de alimentos en tiendas de la zona. Necesitamos suplentes y voluntarios ocasionales para eventos especiales, además de ayuda semanal regular.",
    },
    {
      title: "Recaudación en Sunset Foods",
      body: "Sea voluntario en un turno de dos horas el primer fin de semana de diciembre en Sunset Foods para recaudar fondos para la despensa. Se necesitan muchos voluntarios para cubrir todos los turnos del evento de tres días.",
    },
    {
      title: "Colecta de alimentos de los trabajadores postales",
      body: "El segundo sábado de mayo se necesitan muchos voluntarios para descargar y clasificar los alimentos donados.",
    },
    {
      title: "Organice una colecta de alimentos",
      body: "Organice una colecta en cualquier momento del año, cuando le resulte conveniente. Comuníquese con la coordinadora de voluntarios y le ayudaremos a prepararla.",
    },
    {
      title: "Colecta de regalos navideños",
      body: "Los residentes apadrinan a niños y personas mayores de la comunidad para llevar regalos y alegría a familias y adultos mayores de Highland Park y Highwood.",
    },
    {
      title: "Preparación gratuita de declaraciones de impuestos",
      body: "Capacítese en línea con el Servicio de Impuestos Internos durante diciembre y enero, y luego prepare declaraciones gratuitas para residentes de bajos ingresos de febrero a abril.",
    },
    {
      title: "Ayuda con la inscripción en seguros de salud",
      body: "Capacítese en línea con los Centros de Servicios de Medicare y Medicaid durante septiembre y octubre, y luego ayude a residentes sin seguro médico a inscribirse en el mercado federal durante el período de inscripción abierta.",
    },
    {
      title: "Comités asesores de ciudadanos",
      body: "Los voluntarios participan en el Comité Asesor Latino, el Comité Asesor Ciudadano de Subvenciones y otros comités según sea necesario.",
    },
    {
      title: "El huerto de la despensa",
      body: "Cultivamos productos frescos para la despensa. Los voluntarios de jardinería son bienvenidos durante toda la temporada de cultivo.",
    },
  ],

  photosHeading: "Nuestros voluntarios",
  contactHeading: "A quién contactar",
  contactBody:
    "Sara Hoffman es nuestra Coordinadora de Voluntarios. Llame a la oficina del Township o escríbale directamente y ella encontrará la actividad adecuada para usted.",
  applicationCta: "Abrir la solicitud de voluntariado",
};

export const donate: Dictionary["donate"] = {
  title: "Donar",
  description:
    "Apoye al Moraine Township Charitable Fund, una organización 501(c)(3) del IRS que sostiene la despensa de alimentos y la asistencia de emergencia para residentes que lo necesitan.",
  h1: "Done y ayude",
  intro: "Cada dólar vuelve a los residentes de este Township.",

  lead: "Moraine Township Charitable Fund, Inc. es una organización benéfica 501(c)(3) del IRS cuya misión es administrar fondos para brindar servicios y apoyo receptivos, eficientes y compasivos a los residentes que lo necesitan. El Fondo sostiene la despensa de alimentos de Moraine Township y también ofrece asistencia de emergencia con renta, servicios públicos, gastos médicos, empleo y otras necesidades para residentes en dificultades.",

  bandBody:
    "Cada dólar vuelve a los residentes de este Township, a través de la despensa de alimentos y de la ayuda de emergencia con renta, servicios públicos y gastos médicos. Done dinero, o envíe alimentos directamente desde nuestra lista de deseos.",
  optionsHeading: "Dos formas de dar",

  moneyHeading: "Done dinero",
  moneyBody:
    "Done de forma segura a través de PayPal. Puede dar una sola vez o establecer una donación periódica, y usted elige cómo se utiliza su donación.",
  moneyCta: "Donar por PayPal",
  designationsIntro:
    "Use el menú desplegable para elegir cómo se utiliza su donación:",
  designations: [
    "Despensa de alimentos",
    "Asistencia de emergencia",
    "Colecta de regalos navideños",
    "Según se necesite",
  ],

  wishListHeading: "Envíe alimentos y artículos del hogar",
  wishListBody:
    "Pida directamente de nuestra lista de deseos de Amazon y los artículos llegan directo a la despensa. La lista se mantiene actualizada con exactamente lo que necesitamos ahora, de modo que nada se desperdicia.",
  wishListCta: "Abrir la lista de deseos de Amazon",

  inKindHeading: "Entregue donaciones en persona",
  inKindBody:
    "Lleve alimentos no perecederos sin abrir y sin vencer, y artículos esenciales para el hogar, a la oficina del Township de lunes a viernes de 8:30 a.m. a 4:30 p.m.",

  fundNote:
    "Moraine Township Charitable Fund, Inc. es una organización 501(c)(3) distinta de Moraine Township. Las donaciones se hacen al Fondo.",
};

export const thankYou: Dictionary["thankYou"] = {
  title: "Gracias por su donación",
  description: "Gracias por apoyar al Moraine Township Charitable Fund.",
  h1: "Gracias",

  headline: "Gracias por su donación",
  body: "Su donativo llega directamente a los residentes de Moraine Township, a través de la despensa de alimentos y de la asistencia de emergencia con renta, servicios públicos, gastos médicos y empleo. Se lo agradecemos.",

  taxHeading: "Para sus registros fiscales",
  taxBody:
    "Moraine Township Charitable Fund, Inc. es una organización benéfica 501(c)(3) del IRS. Su donación puede ser deducible de impuestos en la medida que permita la ley. Guarde esta información con sus registros y consulte a su asesor fiscal si tiene preguntas.",
  einLabel: "EIN del IRS",
  addressLabel: "Dirección postal",
  visitBody:
    "Puede visitarnos en la oficina del Township cualquier día entre semana de 8:30 a.m. a 4:30 p.m. Nos dará mucho gusto mostrarle la despensa que su donación sostiene.",

  nextHeading: "Una forma más de ayudar",
  nextVolunteer: "Sea voluntario en la despensa",
  nextWishList: "Compre de la lista de deseos de Amazon",
  noThanks: "No, gracias, volver al sitio web",
};

export const foia: Omit<
  Dictionary["foia"],
  "employeesLabel" | "employeesValue"
> = {
  title: "FOIA y transparencia",
  description:
    "Procedimientos de la Ley de Libertad de Información de Moraine Township, oficial de FOIA, tarifas y registros públicos, incluidos presupuestos, auditorías, gravámenes y divulgación de compensaciones.",
  h1: "FOIA y transparencia",
  intro:
    "Moraine Township publica la información exigida a los organismos públicos de Illinois y responde a las solicitudes de registros públicos conforme a la Ley de Libertad de Información de Illinois.",

  statementHeading: "Declaración de FOIA del Township",
  statementBody: [
    "Moraine Township cumple con los requisitos de la Ley de Libertad de Información de Illinois, 5 ILCS 140. El Township proporcionará los registros públicos definidos en la Ley a quienes los soliciten, poniéndolos a disposición para su inspección o entregando copias.",
    "Las solicitudes de información o de registros públicos pueden hacerse por escrito y dirigirse al Oficial de FOIA en persona, por correo, por fax o por correo electrónico. La oficina del Township también cuenta con un formulario estándar. Todas las solicitudes deben estar firmadas por el solicitante. Las solicitudes verbales pueden atenderse caso por caso.",
  ],

  officerHeading: "Oficial de Libertad de Información",
  officerBody:
    "El Township ha designado a la Supervisora Nancy Chausow Shafer como su Oficial de Libertad de Información. Las solicitudes por escrito pueden enviarse a su atención en la oficina del Township.",

  feesHeading: "Tarifas",
  feesBody: [
    "Según los requisitos de la Ley, Moraine Township proporciona las primeras 50 páginas de documentos sin costo.",
    "Las copias adicionales cuestan $0.15 por página para documentos en blanco y negro tamaño carta u oficio. La certificación de un registro cuesta $1.00.",
    "Cualquier documento que el Township mantenga en formato electrónico se entregará, cuando sea posible, en ese mismo formato.",
  ],

  publicBodyHeading: "Acerca de este organismo público",
  publicBodyIntro:
    "La siguiente información se publica conforme a la Sección 4 de la Ley de Libertad de Información de Illinois, 5 ILCS 140/4.",
  publicBodyRows: [
    {
      label: "Propósito",
      value:
        "Moraine Township es una unidad de gobierno local de propósito especial que administra fondos para brindar servicios y apoyo receptivos, eficientes y compasivos a los residentes que lo necesitan, y que cumple las funciones de asistencia general, tasación de propiedades, elecciones, registro documental y administración de cementerios que exige la ley de Illinois.",
    },
    {
      label: "Subdivisiones funcionales",
      value:
        "Oficina del Supervisor, que incluye Asistencia General y de Emergencia, la despensa de alimentos, los servicios a residentes y el transporte. Oficina del Secretario, que incluye registros, reuniones, avisos públicos y registro de votantes. Oficina del Tasador, que incluye la tasación de propiedades y las exenciones. Operación de los cementerios Mooney y Daggitt.",
    },
    {
      label: "Órgano de gobierno",
      value:
        "Junta de Síndicos, compuesta por el Supervisor, cuatro Síndicos electos y el Secretario como miembro sin voto.",
    },
    {
      label: "Órganos asesores",
      value:
        "Comisión de Ética, Comité Asesor Ciudadano de Subvenciones, Comité Asesor Latino y comités especiales según se designen.",
    },
    {
      label: "Oficinas",
      value:
        "Una oficina, ubicada en 800 Central Avenue, Highland Park, Illinois 60035.",
    },
    {
      label: "Presupuesto operativo",
      value:
        "El presupuesto operativo total se fija cada año en el presupuesto y la ordenanza de asignaciones del Township, publicados en los documentos presupuestarios siguientes.",
    },
  ],

  financeHeading: "Registros financieros y legales",
  financeIntro:
    "El Township publica sus presupuestos, auditorías, gravámenes y avisos públicos. Los documentos oficiales se publican como PDF firmados. Si necesita cualquiera de esta información en otro formato, comuníquese con la oficina del Township y se la proporcionaremos.",
  financeGroups: [
    {
      id: "budget",
      heading: "Presupuesto y asignaciones",
      note: "Presupuesto anual del township y ordenanzas de asignaciones, por año fiscal.",
    },
    {
      id: "audit",
      heading: "Auditoría",
      note: "Auditorías financieras certificadas anuales elaboradas por el auditor del Township, por año fiscal.",
    },
    {
      id: "levy",
      heading: "Gravamen fiscal",
      note: "Ordenanzas anuales del gravamen fiscal, por año fiscal.",
    },
    {
      id: "notices",
      heading: "Avisos legales y públicos",
      note: "Avisos públicos, resoluciones que fijan los salarios de los funcionarios electos, informes del contralor e informes del tesorero.",
    },
  ],

  newsletterHeading: "Archivo del boletín",
  newsletterNote:
    "El boletín del Township, Talk of the Township, ya no se publica. Los números anteriores se conservan aquí como referencia.",
  compensationHeading: "Divulgación de compensaciones",
  compensationBody:
    "Moraine Township publica el paquete total de compensación de los empleados según lo exige 5 ILCS 120/7.3, y publica las resoluciones que fijan los salarios de los funcionarios electos. Estos documentos están disponibles en la sección de avisos legales y públicos.",
};

export const contact: Dictionary["contact"] = {
  title: "Contacto",
  description:
    "Comuníquese con Moraine Township en 800 Central Avenue, Highland Park, Illinois. Llame al 847-432-3240 o escriba a info@morainetownship.org.",
  h1: "Comuníquese con Moraine Township",
  intro:
    "Llámenos, escríbanos o visite la oficina. Si no sabe por quién preguntar, llame a la línea general y le dirigiremos a la persona adecuada.",

  officeHeading: "Oficina del Township",
  departmentsHeading: "Departamentos y líneas directas",
  departments: [
    {
      label: "Oficina general",
      detail: "Preguntas sobre cualquier servicio del Township",
    },
    { label: "Transporte", detail: "Programar un viaje puerta a puerta" },
    {
      label: "Tasador",
      detail: "Tasación de propiedades, exenciones y apelaciones",
    },
    {
      label: "Despensa de alimentos",
      detail: "Requisitos, horarios y solicitudes",
    },
    {
      label: "Preparación gratuita de impuestos",
      detail: "Citas de VITA, por temporada",
    },
  ],

  formHeading: "Envíenos un mensaje",
  formIntro:
    "Use este formulario para comunicarse con la oficina del Township. Respondemos los mensajes durante el horario de oficina. Si su situación es urgente, por favor llame.",
  formName: "Su nombre",
  formEmail: "Su correo electrónico",
  formPhone: "Su número de teléfono",
  formMessage: "¿Cómo podemos ayudarle?",
  formSubmit: "Enviar mensaje",
  formSending: "Enviando",
  formSuccess:
    "Gracias. Su mensaje se envió y un miembro del personal se comunicará con usted.",
  formError:
    "No pudimos enviar su mensaje. Por favor llame a la oficina del Township al 847-432-3240 y le ayudaremos directamente.",

  directoryHeading: "Directorio de personal",
};

export const accessibility: Dictionary["accessibility"] = {
  title: "Accesibilidad",
  description:
    "Moraine Township se compromete a que este sitio web sea accesible para todos, conforme a WCAG 2.1 Nivel AA bajo el Título II de la Ley de Estadounidenses con Discapacidades.",
  h1: "Accesibilidad",
  intro:
    "Moraine Township sirve a todos los residentes, y eso incluye cómo construimos este sitio web.",

  commitmentHeading: "Nuestro compromiso",
  commitmentBody: [
    "Moraine Township se compromete a que este sitio web sea accesible para las personas con discapacidad. Queremos que todos los residentes puedan encontrar servicios, leer nuestros registros públicos y comunicarse con nosotros, sin importar cómo utilicen la web.",
    "Si encuentra una página, un documento o una función de este sitio que no pueda usar, díganoslo. Lo corregiremos y, mientras tanto, le daremos la información que necesita en un formato que le funcione.",
  ],

  standardHeading: "La norma que seguimos",
  standardBody: [
    "Este sitio web está construido para cumplir con las Pautas de Accesibilidad para el Contenido Web, WCAG versión 2.1, Nivel AA. Esa es la norma técnica adoptada por el Departamento de Justicia de los Estados Unidos bajo el Título II de la Ley de Estadounidenses con Discapacidades para el contenido web de las entidades gubernamentales estatales y locales, en 28 CFR Parte 35, Subparte H.",
    "Como Moraine Township tiene una población total menor de 50,000 habitantes, la fecha de cumplimiento que le corresponde es el 26 de abril de 2028, conforme a la norma del Departamento de Justicia que amplió los plazos originales en abril de 2026. Este sitio web se construyó conforme a la norma ahora, sin esperar a esa fecha.",
  ],

  featuresHeading: "Lo que hemos incorporado",
  features: [
    "Todas las páginas pueden manejarse solo con el teclado, y el elemento enfocado siempre es visible.",
    "Un enlace para saltar permite a quienes usan teclado o lector de pantalla ir directo al contenido principal.",
    "Las imágenes que transmiten información tienen textos alternativos que describen esa información, no el nombre del archivo.",
    "El mapa de límites del Township tiene una descripción completa en texto, y todas las páginas pueden leerse en voz alta en inglés, español o ruso.",
    "Los colores del texto y de la interfaz cumplen o superan las relaciones de contraste exigidas en el Nivel AA.",
    "Los encabezados, las regiones y las etiquetas de formulario están marcados para que los lectores de pantalla puedan recorrer la estructura de la página.",
    "El movimiento y las animaciones se reducen automáticamente si su dispositivo está configurado para preferir menos movimiento.",
    "Todo el sitio web está disponible en inglés, español y ruso.",
  ],

  feedbackHeading: "Cuéntenos si algo no funciona",
  feedbackBody:
    "Si alguna parte de este sitio web representa una barrera para usted, comuníquese con la oficina del Township por teléfono o correo electrónico y describa lo que ocurrió. Incluya la dirección de la página si la tiene. Le responderemos y corregiremos el problema.",

  documentsHeading: "Documentos y PDF",
  documentsBody:
    "Algunos registros, como las actas firmadas, los presupuestos, las auditorías y los gravámenes, se publican como archivos PDF porque el documento firmado es el registro oficial. Siempre que un PDF contenga información que usted necesite, también publicamos esa información en la propia página. Si necesita cualquier documento del Township en otro formato, incluidos letra grande o texto sencillo, comuníquese con la oficina del Township y se lo proporcionaremos sin costo.",
};
