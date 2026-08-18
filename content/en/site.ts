import type { Dictionary } from "../types";

export const common: Dictionary["common"] = {
  skipToContent: "Skip to main content",
  mainNavLabel: "Main navigation",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  languageLabel: "Language",
  switchLanguage: "Choose a language for this website",
  callUs: "Call",
  callOffice: "Call the Township office",
  donate: "Donate",
  donateShort: "Donate",
  donateNow: "Donate now",
  donateAria: "Donate to the Moraine Township Charitable Fund",
  readAloud: "Read this page aloud",
  stopReading: "Stop reading",
  readAloudUnsupported: "Your browser does not support reading pages aloud.",
  learnMore: "Learn more",
  backToTop: "Back to top",
  externalLinkNote: "Opens in a new tab",
  pdfNote: "PDF document",
  officeHours: "Office hours",
  hours: "Hours",
  phone: "Phone",
  fax: "Fax",
  email: "Email",
  address: "Address",
  required: "required",
  close: "Close",
  dismiss: "No thanks",
  loading: "Loading",
};

export const nav: Dictionary["nav"] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Food Pantry", href: "/food-pantry" },
  { label: "Assessor", href: "/assessor" },
  { label: "Transportation", href: "/transportation" },
  { label: "Cemeteries", href: "/cemeteries" },
  { label: "Volunteer", href: "/get-involved" },
  { label: "Contact", href: "/contact" },
];

export const footer: Dictionary["footer"] = {
  quickLinks: "Quick links",
  contactHeading: "Contact",
  legalHeading: "Transparency",
  accessibility: "Accessibility",
  accessibilityHref: "/accessibility",
  foia: "FOIA and transparency",
  admin: "admin",
  rights: "Moraine Township, Highland Park, Illinois. Established 1850.",
  mentalHealthBoard: "Community Mental Health Board",
  stateResource: "Townships of Illinois",
};

export const leadCapture: Dictionary["leadCapture"] = {
  heading: "Did we miss your call?",
  body: "If you called outside of office hours, leave your name and email and a staff member will follow up with you. This is optional, and you can keep using the website either way.",
  name: "Your name",
  email: "Your email",
  submit: "Ask us to follow up",
  success: "Thank you. A staff member will be in touch.",
  error:
    "We could not send that request. Please call the Township office at 847-432-3240 and we will help you directly.",
  dismiss: "No thanks",
};

export const notFound: Dictionary["notFound"] = {
  title: "Page not found",
  heading: "We could not find that page",
  body: "The page you are looking for may have moved when we reorganized this website. You can start again from the home page, or call the Township office and we will help you find what you need.",
  cta: "Go to the home page",
};
