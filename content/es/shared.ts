import type { Dictionary } from "../types";

export const shared: Dictionary["shared"] = {
  hours: "De lunes a viernes, de 8:30 a.m. a 4:30 p.m.",
  term: "Mandato",
  squareMiles: "Millas cuadradas",
  acres: "Acres",
  untranslatedNote: "Este artículo está disponible por ahora solo en inglés.",
  tagline: "Reciba una mano. Dé una mano.",
  foiaOfficerTitle: "Oficial de FOIA y Supervisora",
  sourcesHeading: "Fuentes y agradecimientos",
  mapCredit:
    "Moraine Township, ciudades y pueblos. Preparado por la División de SIG y Cartografía del condado de Lake, revisado en 2025.",
  roles: {
    supervisor: "Supervisora",
    clerk: "Secretaria",
    assessor: "Tasador",
    trustee: "Síndico",
    caseworker: "Trabajadora social",
    coordinator: "Coordinadora de Despensa y Transporte",
    administrator: "Administradora del Township y Secretaria Adjunta",
    volunteerCoordinator: "Coordinadora de Voluntarios",
    officeStaff: "Personal de oficina",
  },
  links: {
    lakeCountyExemptions:
      "Revisión detallada de las exenciones disponibles en el condado de Lake",
    seniorFreezeFile:
      "Presentar en línea la exención de congelamiento para personas mayores",
    chiefCountyAssessment: "Oficina de Tasación del condado de Lake",
    vacancyAffidavit:
      "Declaración jurada de desocupación de la Junta de Revisión",
    appealOnline:
      "Presentar una apelación en línea ante la Junta de Revisión del condado de Lake",
    propertySearch: "Búsqueda de propiedades del condado de Lake",
    treasurer:
      "Tesorería del condado de Lake, para facturas y pagos de impuestos",
    paymentStatus:
      "Consulte el estado actual del pago de su impuesto sobre la propiedad",
    voterOnline:
      "Regístrese para votar en línea a través de la Junta Electoral de Illinois",
    voterStatus: "Verifique su registro de votante con Lake County Voter Power",
    pollingPlaces: "Encuentre su lugar de votación",
    passportForms: "Formularios y requisitos de pasaporte en travel.state.gov",
    comEd: "Programas de asistencia de pago de ComEd",
    shareWarmth: "Share the Warmth de North Shore Gas",
  },
};

export const grantees: Dictionary["programs"]["grantees"] = [
  {
    name: "A Safe Place",
    description: "Apoyo y educación en casos de violencia doméstica.",
  },
  {
    name: "Blessings in a Backpack",
    description: "Apoyo a niños en edad escolar de bajos ingresos.",
  },
  {
    name: "Center for Enriched Living",
    description:
      "Desarrollo de habilidades y actividades sociales para residentes con discapacidades del desarrollo.",
  },
  {
    name: "College Bound Opportunities",
    description:
      "Apoyo y mentoría a estudiantes de bajos ingresos desde la preparatoria hasta la universidad.",
  },
  {
    name: "Community Partners for Affordable Housing",
    description:
      "Preservación y ampliación de opciones locales de vivienda asequible.",
  },
  {
    name: "Family Focus HP/RFTS",
    description: "Apoyo a niños y sus familias desde el nacimiento.",
  },
  {
    name: "Fenix Family Health Center",
    description:
      "Servicios de salud para residentes hispanohablantes de bajos ingresos.",
  },
  {
    name: "Highland Park Community Early Learning Center",
    description:
      "Becas para familias de ingresos bajos y moderados con niños en guardería.",
  },
  {
    name: "Jewish Child and Family Services",
    description:
      "Servicios de salud mental, especialmente para estudiantes del centro de atención de Highland Park High School.",
  },
  {
    name: "Josselyn Center",
    description:
      "Consejería individual y familiar para residentes del Township.",
  },
  {
    name: "North Suburban Legal Aid Clinic",
    description:
      "Asistencia legal en vivienda, inmigración y violencia doméstica.",
  },
  {
    name: "Omnis Rehabilitation",
    description:
      "Terapia neurológica para clientes de bajos ingresos de Moraine Township.",
  },
  {
    name: "PADS of Lake County",
    description: "Apoyo a personas sin vivienda.",
  },
  {
    name: "Lake County Partners in Aging",
    description:
      "Cuidado voluntario para personas mayores y con movilidad limitada.",
  },
  {
    name: "Tri-Con Child Care Center",
    description:
      "Becas complementarias para cuidado infantil y educación temprana de clientes de bajos ingresos.",
  },
];

export const minutesCards: Dictionary["boardMeetings"]["minutesCards"] = [
  {
    id: "regular-minutes",
    heading: "Actas de las reuniones de la Junta",
    body: "Actas aprobadas de las reuniones ordinarias y extraordinarias de la Junta de Síndicos, archivadas por año.",
  },
  {
    id: "closed-session",
    heading: "Actas de sesiones cerradas",
    body: "Las actas de sesiones cerradas se publican una vez que la Junta vota su liberación.",
  },
  {
    id: "annual-town-meeting",
    heading: "Reunión Anual del Pueblo",
    body: "El Secretario convoca cada año la Reunión Anual del Pueblo. Las actas y los informes del Supervisor se archivan por año.",
  },
  {
    id: "decennial",
    heading: "Comité Decenal",
    body: "Informe y actas del Comité Decenal sobre Eficiencia del Gobierno Local.",
  },
];

export const foiaEmployees = {
  employeesLabel: "Empleados",
  employeesValue:
    "Personal de tiempo completo y medio tiempo de las oficinas del Supervisor y del Tasador. El número actual de empleados está disponible a solicitud en la oficina del Township.",
};

/**
 * Los grupos dentro de Avisos legales y públicos en /foia. Las claves
 * coinciden con NOTICE_GROUPS en lib/documents.ts.
 */
export const noticeGroups: Dictionary["foia"]["noticeGroups"] = {
  treasurer: "Informes del tesorero",
  comptroller: "Informes del contralor",
  "financial-affairs": "Declaraciones de situación financiera",
  "officials-compensation": "Salarios de los funcionarios electos",
  "compensation-disclosures": "Divulgación de compensaciones",
  resolutions: "Resoluciones y ordenanzas",
  "foia-posting": "Libertad de información",
};
