import type { Dictionary } from "../types";

export const common: Dictionary["common"] = {
  skipToContent: "Ir al contenido principal",
  mainNavLabel: "Navegación principal",
  openMenu: "Abrir menú",
  closeMenu: "Cerrar menú",
  languageLabel: "Idioma",
  switchLanguage: "Elija un idioma para este sitio web",
  callUs: "Llamar",
  callOffice: "Llame a la oficina del Township",
  donate: "Donar",
  donateShort: "Donar",
  donateNow: "Done ahora",
  donateAria: "Done al Moraine Township Charitable Fund",
  readAloud: "Leer esta página en voz alta",
  stopReading: "Detener la lectura",
  readAloudUnsupported: "Su navegador no permite leer páginas en voz alta.",
  learnMore: "Más información",
  backToTop: "Volver arriba",
  externalLinkNote: "Se abre en una pestaña nueva",
  pdfNote: "Documento PDF",
  documentCount: {
    one: "1 documento",
    few: "{n} documentos",
    many: "{n} documentos",
    other: "{n} documentos",
  },
  officeHours: "Horario de oficina",
  hours: "Horario",
  phone: "Teléfono",
  fax: "Fax",
  email: "Correo electrónico",
  address: "Dirección",
  required: "obligatorio",
  close: "Cerrar",
  dismiss: "No, gracias",
  loading: "Cargando",
};

export const nav: Dictionary["nav"] = [
  { label: "Nosotros", href: "/about" },
  { label: "Servicios", href: "/services" },
  { label: "Despensa", href: "/food-pantry" },
  { label: "Tasador", href: "/assessor" },
  { label: "Transporte", href: "/transportation" },
  { label: "Cementerios", href: "/cemeteries" },
  { label: "Voluntariado", href: "/get-involved" },
  { label: "Contacto", href: "/contact" },
];

export const footer: Dictionary["footer"] = {
  quickLinks: "Enlaces rápidos",
  contactHeading: "Contacto",
  legalHeading: "Transparencia",
  accessibility: "Accesibilidad",
  accessibilityHref: "/accessibility",
  foia: "FOIA y transparencia",
  admin: "admin",
  rights: "Moraine Township, Highland Park, Illinois. Fundado en 1850.",
  mentalHealthBoard: "Junta Comunitaria de Salud Mental",
  stateResource: "Townships of Illinois",
};

export const leadCapture: Dictionary["leadCapture"] = {
  heading: "¿No pudimos atender su llamada?",
  body: "Si llamó fuera del horario de oficina, deje su nombre y su correo electrónico y un miembro del personal se comunicará con usted. Esto es opcional y puede seguir usando el sitio web de cualquier manera.",
  name: "Su nombre",
  email: "Su correo electrónico",
  submit: "Pídanos que nos comuniquemos con usted",
  success: "Gracias. Un miembro del personal se comunicará con usted.",
  error:
    "No pudimos enviar esa solicitud. Por favor llame a la oficina del Township al 847-432-3240 y le ayudaremos directamente.",
  dismiss: "No, gracias",
};

export const notFound: Dictionary["notFound"] = {
  title: "Página no encontrada",
  heading: "No pudimos encontrar esa página",
  body: "Es posible que la página que busca se haya movido cuando reorganizamos este sitio web. Puede comenzar de nuevo desde la página principal, o llamar a la oficina del Township y le ayudaremos a encontrar lo que necesita.",
  cta: "Ir a la página principal",
};
