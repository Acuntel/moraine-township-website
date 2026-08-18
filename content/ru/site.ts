import type { Dictionary } from "../types";

export const common: Dictionary["common"] = {
  skipToContent: "Перейти к основному содержанию",
  mainNavLabel: "Основная навигация",
  openMenu: "Открыть меню",
  closeMenu: "Закрыть меню",
  languageLabel: "Язык",
  switchLanguage: "Выберите язык этого сайта",
  callUs: "Позвонить",
  callOffice: "Позвонить в офис Township",
  donate: "Пожертвовать",
  donateShort: "Помочь",
  donateNow: "Пожертвовать сейчас",
  donateAria: "Пожертвовать в Moraine Township Charitable Fund",
  readAloud: "Прочитать страницу вслух",
  stopReading: "Остановить чтение",
  readAloudUnsupported: "Ваш браузер не поддерживает чтение страниц вслух.",
  learnMore: "Подробнее",
  backToTop: "Наверх",
  externalLinkNote: "Откроется в новой вкладке",
  pdfNote: "Документ PDF",
  officeHours: "Часы работы офиса",
  hours: "Часы работы",
  phone: "Телефон",
  fax: "Факс",
  email: "Электронная почта",
  address: "Адрес",
  required: "обязательно",
  close: "Закрыть",
  dismiss: "Нет, спасибо",
  loading: "Загрузка",
};

export const nav: Dictionary["nav"] = [
  { label: "О нас", href: "/about" },
  { label: "Услуги", href: "/services" },
  { label: "Кладовая", href: "/food-pantry" },
  { label: "Оценщик", href: "/assessor" },
  { label: "Транспорт", href: "/transportation" },
  { label: "Кладбища", href: "/cemeteries" },
  { label: "Помочь", href: "/get-involved" },
  { label: "Контакты", href: "/contact" },
];

export const footer: Dictionary["footer"] = {
  quickLinks: "Быстрые ссылки",
  contactHeading: "Контакты",
  legalHeading: "Прозрачность",
  accessibility: "Доступность",
  accessibilityHref: "/accessibility",
  foia: "FOIA и прозрачность",
  admin: "admin",
  rights: "Moraine Township, Хайленд-Парк, Иллинойс. Основан в 1850 году.",
  mentalHealthBoard: "Совет по охране психического здоровья",
  stateResource: "Townships of Illinois",
};

export const leadCapture: Dictionary["leadCapture"] = {
  heading: "Мы пропустили ваш звонок?",
  body: "Если вы звонили в нерабочее время, оставьте своё имя и адрес электронной почты, и сотрудник свяжется с вами. Это необязательно, и вы в любом случае можете продолжать пользоваться сайтом.",
  name: "Ваше имя",
  email: "Ваша электронная почта",
  submit: "Попросить связаться со мной",
  success: "Спасибо. Сотрудник свяжется с вами.",
  error:
    "Нам не удалось отправить этот запрос. Пожалуйста, позвоните в офис Township по телефону 847-432-3240, и мы поможем вам напрямую.",
  dismiss: "Нет, спасибо",
};

export const notFound: Dictionary["notFound"] = {
  title: "Страница не найдена",
  heading: "Мы не смогли найти эту страницу",
  body: "Возможно, страница, которую вы ищете, была перемещена при реорганизации этого сайта. Вы можете начать с главной страницы или позвонить в офис Township, и мы поможем вам найти нужное.",
  cta: "Перейти на главную страницу",
};
