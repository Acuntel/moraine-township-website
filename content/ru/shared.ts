import type { Dictionary } from "../types";

export const shared: Dictionary["shared"] = {
  hours: "С понедельника по пятницу, с 8:30 до 16:30",
  term: "Срок полномочий",
  squareMiles: "Квадратные мили",
  acres: "Акры",
  untranslatedNote: "Эта запись пока доступна только на английском языке.",
  bioInEnglishNote:
    "Биографии написаны самими должностными лицами и публикуются на английском языке.",
  historyInEnglishNote:
    "Подробная история ниже доступна только на английском языке: в ней цитируются старые документы о собственности и газеты, и цитаты оставлены в оригинале.",
  wordNote: "Документ Word",
  tagline: "Примите помощь. Подайте руку.",
  foiaOfficerTitle: "Ответственное лицо по FOIA и Супервайзер",
  sourcesHeading: "Источники и благодарности",
  mapCredit:
    "Moraine Township, города и посёлки. Подготовлено отделом ГИС и картографии округа Лейк, редакция 2025 года.",
  roles: {
    supervisor: "Супервайзер",
    clerk: "Секретарь",
    assessor: "Оценщик",
    trustee: "Попечитель",
    trusteeWoman: "Попечитель",
    caseworker: "Социальный работник",
    coordinator: "Координатор кладовой и транспорта",
    administrator: "Администратор Township и заместитель секретаря",
    volunteerCoordinator: "Координатор волонтёров",
    officeStaff: "Сотрудник офиса",
  },
  links: {
    lakeCountyExemptions:
      "Подробный обзор доступных льгот на сайте округа Лейк",
    seniorFreezeFile:
      "Подать онлайн заявление на замораживание оценки для пожилых людей",
    chiefCountyAssessment: "Главное оценочное управление округа Лейк",
    vacancyAffidavit: "Заявление о простое для Совета по пересмотру",
    appealOnline: "Подать апелляцию онлайн в Совет по пересмотру округа Лейк",
    propertySearch: "Поиск объектов недвижимости округа Лейк",
    treasurer: "Казначейство округа Лейк, счета и платежи по налогам",
    paymentStatus: "Проверить текущий статус оплаты налога на недвижимость",
    voterOnline:
      "Зарегистрироваться для голосования онлайн через Избирательную комиссию Иллинойса",
    voterStatus:
      "Проверить регистрацию избирателя в системе Lake County Voter Power",
    pollingPlaces: "Найти свой избирательный участок",
    passportForms: "Формы и требования для паспорта на travel.state.gov",
    comEd: "Программы помощи с оплатой счетов ComEd",
    shareWarmth: "Программа Share the Warmth компании North Shore Gas",
  },
};

export const grantees: Dictionary["programs"]["grantees"] = [
  {
    name: "A Safe Place",
    description: "Помощь и просвещение в случаях домашнего насилия.",
  },
  {
    name: "Blessings in a Backpack",
    description:
      "Поддержка детей школьного возраста из малообеспеченных семей.",
  },
  {
    name: "Center for Enriched Living",
    description:
      "Развитие навыков и социальные занятия для жителей с нарушениями развития.",
  },
  {
    name: "College Bound Opportunities",
    description:
      "Поддержка и наставничество для учащихся из малообеспеченных семей от школы до колледжа.",
  },
  {
    name: "Community Partners for Affordable Housing",
    description: "Сохранение и расширение доступного жилья в районе.",
  },
  {
    name: "Family Focus HP/RFTS",
    description: "Поддержка детей и их семей с рождения.",
  },
  {
    name: "Fenix Family Health Center",
    description:
      "Медицинские услуги для испаноязычных жителей с низким доходом.",
  },
  {
    name: "Highland Park Community Early Learning Center",
    description:
      "Стипендии для семей с низким и средним доходом, чьи дети посещают детский сад.",
  },
  {
    name: "Jewish Child and Family Services",
    description:
      "Услуги в области психического здоровья, прежде всего для учащихся центра при школе Highland Park High School.",
  },
  {
    name: "Josselyn Center",
    description: "Индивидуальные и семейные консультации для жителей Township.",
  },
  {
    name: "North Suburban Legal Aid Clinic",
    description:
      "Юридическая помощь по вопросам жилья, иммиграции и домашнего насилия.",
  },
  {
    name: "Omnis Rehabilitation",
    description:
      "Неврологическая терапия для клиентов Moraine Township с низким доходом.",
  },
  { name: "PADS of Lake County", description: "Поддержка бездомных." },
  {
    name: "Lake County Partners in Aging",
    description:
      "Волонтёрский уход за пожилыми людьми и людьми с ограниченной подвижностью.",
  },
  {
    name: "Tri-Con Child Care Center",
    description:
      "Стипендии в дополнение к оплате раннего ухода и образования для клиентов с низким доходом.",
  },
];

export const minutesCards: Dictionary["boardMeetings"]["minutesCards"] = [
  {
    id: "regular-minutes",
    heading: "Протоколы заседаний Совета",
    body: "Утверждённые протоколы регулярных и внеочередных заседаний Совета попечителей, в архиве по годам.",
  },
  {
    id: "closed-session",
    heading: "Протоколы закрытых заседаний",
    body: "Протоколы закрытых заседаний публикуются после того, как Совет проголосует за их рассекречивание.",
  },
  {
    id: "annual-town-meeting",
    heading: "Ежегодное городское собрание",
    body: "Секретарь ежегодно созывает Ежегодное городское собрание. Протоколы и отчёты Супервайзера архивируются по годам.",
  },
  {
    id: "decennial",
    heading: "Десятилетний комитет",
    body: "Отчёт и протоколы Десятилетнего комитета по эффективности местного управления.",
  },
];

export const foiaEmployees = {
  employeesLabel: "Сотрудники",
  employeesValue:
    "По оценке Township на 8 января 2026 года, у него было пять сотрудников на полной ставке: три в офисе Оценщика и два в офисе Супервайзера. Сотрудники офиса Супервайзера, работающие неполный день, в сумме составляют 1,16 ставки, а четыре водителя микроавтобуса, работающие неполный день, в сумме составляют одну ставку. Эти данные учитывают сезонного летнего стажёра.",
};

/**
 * Группы внутри раздела официальных и публичных уведомлений на /foia. Ключи
 * совпадают с NOTICE_GROUPS в lib/documents.ts.
 */
export const noticeGroups: Dictionary["foia"]["noticeGroups"] = {
  treasurer: "Отчёты казначея",
  comptroller: "Отчёты контролёра",
  "financial-affairs": "Отчёты о финансовом положении",
  "officials-compensation": "Оклады выборных должностных лиц",
  "compensation-disclosures": "Раскрытие сведений о вознаграждении",
  resolutions: "Резолюции и постановления",
  "foia-posting": "Свобода информации",
};
