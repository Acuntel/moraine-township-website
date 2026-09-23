// One shape, three languages. Every locale file implements Dictionary, so a
// missing or half-finished translation is a TypeScript error rather than an
// English string leaking onto the Spanish page.
//
// Facts that are identical in every language (phone numbers, addresses, EIN,
// external URLs) live in lib/township.ts and are interpolated at render time.
// Only prose belongs here.

export interface LinkItem {
  label: string;
  href: string;
  /** Set for links that leave the site or open a document. */
  external?: boolean;
  /** Shown to screen readers and printed next to PDF links. */
  note?: string;
}

export interface Section {
  id: string;
  heading: string;
  body?: string[];
  /** Sub-headed parts under the section heading, each with its own anchor. */
  subsections?: { id: string; heading: string; body: string[] }[];
  /** Paragraphs that close the section, after any subsections. */
  outro?: string[];
  /** A bullet given as a LinkItem renders as a link to more detail. */
  bullets?: (string | LinkItem)[];
  links?: LinkItem[];
}

export interface ServiceTile {
  id: string;
  title: string;
  blurb: string;
  href: string;
}

export interface PersonBio {
  id: string;
  bio: string;
}

/** The elected officials in lib/township.ts, by id. */
export type OfficialId =
  | "supervisor"
  | "clerk"
  | "assessor"
  | "trustee-guerrero"
  | "trustee-haggarty"
  | "trustee-jacoby"
  | "trustee-levin";

/** Mirrors NOTICE_GROUPS in lib/documents.ts. */
export type NoticeGroup =
  | "treasurer"
  | "comptroller"
  | "financial-affairs"
  | "officials-compensation"
  | "compensation-disclosures"
  | "resolutions"
  | "foia-posting";

export interface PageMeta {
  title: string;
  description: string;
  h1: string;
  intro?: string;
}

export interface Dictionary {
  locale: string;

  /**
   * Strings that used to sit inline in JSX or in lib/township.ts and therefore
   * rendered in English on the Spanish and Russian pages. Job titles, office
   * hours and outbound link labels all belong to the reader's language.
   */
  shared: {
    hours: string;
    term: string;
    squareMiles: string;
    acres: string;
    /** Empty for English; shown when an item has no translation. */
    untranslatedNote: string;
    tagline: string;
    foiaOfficerTitle: string;
    sourcesHeading: string;
    mapCredit: string;
    roles: {
      supervisor: string;
      clerk: string;
      assessor: string;
      trustee: string;
      caseworker: string;
      coordinator: string;
      administrator: string;
      volunteerCoordinator: string;
      officeStaff: string;
    };
    links: {
      lakeCountyExemptions: string;
      seniorFreezeFile: string;
      chiefCountyAssessment: string;
      vacancyAffidavit: string;
      appealOnline: string;
      propertySearch: string;
      treasurer: string;
      paymentStatus: string;
      voterOnline: string;
      voterStatus: string;
      pollingPlaces: string;
      passportForms: string;
      comEd: string;
      shareWarmth: string;
    };
  };

  common: {
    skipToContent: string;
    mainNavLabel: string;
    openMenu: string;
    closeMenu: string;
    languageLabel: string;
    switchLanguage: string;
    callUs: string;
    callOffice: string;
    donate: string;
    /** Fits the floating circle; the aria-label carries the full meaning. */
    donateShort: string;
    donateNow: string;
    donateAria: string;
    readAloud: string;
    stopReading: string;
    readAloudUnsupported: string;
    learnMore: string;
    backToTop: string;
    externalLinkNote: string;
    pdfNote: string;
    /**
     * The count on a closed group of documents, such as "9 documents". {n} is
     * the number; the form is chosen with Intl.PluralRules. Russian needs few
     * and many; the other two languages repeat "other" there.
     */
    documentCount: { one: string; few: string; many: string; other: string };
    officeHours: string;
    hours: string;
    phone: string;
    fax: string;
    email: string;
    address: string;
    required: string;
    close: string;
    dismiss: string;
    loading: string;
  };

  nav: { label: string; href: string }[];

  footer: {
    quickLinks: string;
    contactHeading: string;
    legalHeading: string;
    accessibility: string;
    accessibilityHref: string;
    foia: string;
    admin: string;
    rights: string;
    mentalHealthBoard: string;
    stateResource: string;
  };

  home: PageMeta & {
    heroKicker: string;
    heroHeadline: string;
    heroSub: string;
    heroImageAlt: string;
    heroPrimaryCta: string;
    heroSecondaryCta: string;
    newsHeading: string;
    newsEmpty: string;
    newsViewAll: string;
    helpYouHeading: string;
    helpYouBody: string;
    helpYouCta: string;
    helpYouImageAlt: string;
    helpUsHeading: string;
    helpUsBody: string;
    helpUsCta: string;
    helpUsImageAlt: string;
    heroBadge: string;
    heroCardHeading: string;
    heroCardFootnote: string;

    marqueeLabel: string;
    marquee: string[];

    impactEyebrow: string;
    impactHeading: string;
    impactSub: string;
    /** Every figure is published by the Township. Nothing is estimated. */
    stats: { value: string; unit?: string; label: string }[];

    stepsEyebrow: string;
    stepsHeading: string;
    stepsSub: string;
    steps: { title: string; body: string }[];

    tilesEyebrow: string;
    tilesHeading: string;
    tilesSub: string;
    tiles: ServiceTile[];

    newsEyebrow: string;
    helpEyebrow: string;
    boardStripHeading: string;
    boardStripBody: string;
    boardStripCta: string;
  };

  about: PageMeta & {
    missionHeading: string;
    missionStatement: string;
    specialPurposeHeading: string;
    specialPurposeIntro: string;
    specialPurposeItems: string[];
    boundariesHeading: string;
    boundariesBody: string[];
    demographicsHeading: string;
    demographicsNote: string;
    demographicsLabels: {
      population: string;
      medianIncome: string;
      bachelors: string;
      employment: string;
      housingUnits: string;
      withoutHealthcare: string;
      belowPoverty: string;
    };
    historyHeading: string;
    historyBody: string[];
    teamHeading: string;
    teamIntro: string;
    electedHeading: string;
    boardBody: string;
    staffHeading: string;
    staffIntro: string;
    readBio: string;
    noPhotoNote: string;
    /** Each headshot described as it actually looks. See CLAUDE.md rule 3. */
    officialPhotoAlts: Record<OfficialId, string>;
    roleDescriptions: Record<
      "supervisor" | "clerk" | "assessor" | "trustees",
      string
    >;
    financialHeading: string;
    financialBody: string;
    financialCta: string;
    ethicsHeading: string;
    ethicsBody: string;
    ethicsCommissionHeading: string;
    termExpires: string;
  };

  services: PageMeta & {
    allResidentsHeading: string;
    allResidentsIntro: string;
    incomeQualifiedHeading: string;
    incomeQualifiedIntro: string;
    formsHeading: string;
    formsNote: string;
    sections: Section[];
  };

  foodPantry: PageMeta & {
    /** What the pantry is for, above the wish list. */
    lead: string[];
    wishListHeading: string;
    wishListBody: string;
    wishListCta: string;
    eligibilityHeading: string;
    eligibilityBody: string;
    applicationsHeading: string;
    applicationsBody: string;
    hoursHeading: string;
    hoursRows: { day: string; time: string }[];
    receiveHeading: string;
    receiveBody: string;
    shoppingListHeading: string;
    shoppingListIntro: string;
    shoppingListUpdated: string;
    dropOffHeading: string;
    dropOffBody: string;
    /** Shown beside every drop-off instruction, here and on the Donate page. */
    cannotAcceptHeading: string;
    cannotAccept: string[];
    contactHeading: string;
    contactBody: string;
    volunteerCta: string;
    imageAlt: string;
  };

  assessor: PageMeta & {
    officeIntro: string;
    videoHeading: string;
    videoIntro: string;
    videoTitle: string;
    videoPosterAlt: string;
    videoPlayLabel: string;
    videoLinkLabel: string;
    resourcesHeading: string;
    resourcesIntro: string;
    documentsHeading: string;
  };

  transportation: PageMeta & {
    /** Leads into the ride line, near the top of the page. */
    callLead: string;
    body: string[];
    detailsHeading: string;
    details: { label: string; value: string }[];
    scheduleHeading: string;
    scheduleBody: string;
    imageAlt: string;
  };

  boardMeetings: PageMeta & {
    scheduleHeading: string;
    scheduleIntro: string;
    adoptedScheduleHeading: string;
    agendaHeading: string;
    agendaIntro: string;
    agendaEmpty: string;
    minutesHeading: string;
    minutesIntro: string;
    minutesCards: { id: string; heading: string; body: string }[];
    legalNoteHeading: string;
    legalNoteBody: string;
  };

  cemeteries: PageMeta & {
    introBody: string[];
    mooneyHeading: string;
    mooneyLocation: string;
    mooneyBody: string[];
    mooneyImageAlt: string;
    mooneyCta: string;
    daggittHeading: string;
    daggittLocation: string;
    daggittBody: string[];
    daggittImageAlt: string;
    daggittCta: string;
    restorationHeading: string;
    restorationNote: string;
    recordsHeading: string;
    recordsNote: string;
    contactHeading: string;
    contactBody: string;
    historyBackLink: string;
  };

  programs: PageMeta & {
    grantsHeading: string;
    grantsIntro: string[];
    grantsCommitteeHeading: string;
    grantsCommitteeBody: string;
    granteesHeading: string;
    granteesNote: string;
    grantees: { name: string; description: string }[];
    latinoHeading: string;
    latinoBody: string[];
    latinoCalendarHeading: string;
    latinoCalendarBody: string;
    mentalHealthHeading: string;
    mentalHealthBody: string;
    mentalHealthCta: string;
  };

  getInvolved: PageMeta & {
    topAskHeading: string;
    topAskBody: string;
    topAskCta: string;
    waysHeading: string;
    ways: { title: string; body: string }[];
    photosHeading: string;
    contactHeading: string;
    contactBody: string;
    applicationCta: string;
  };

  donate: PageMeta & {
    lead: string;
    /** Short line for the donate band that repeats across long pages. */
    bandBody: string;
    /** One sentence in the band about the ways to give that are not online. */
    bandOtherWays: string;
    bandOtherWaysCta: string;
    optionsHeading: string;
    moneyHeading: string;
    moneyBody: string;
    moneyCta: string;
    designationsIntro: string;
    designations: string[];
    wishListHeading: string;
    wishListBody: string;
    wishListCta: string;
    inKindHeading: string;
    inKindBody: string;
    checkHeading: string;
    checkBody: string;
    fundNote: string;
  };

  thankYou: PageMeta & {
    headline: string;
    body: string;
    taxHeading: string;
    taxBody: string;
    einLabel: string;
    addressLabel: string;
    visitBody: string;
    nextHeading: string;
    nextVolunteer: string;
    nextWishList: string;
    noThanks: string;
  };

  foia: PageMeta & {
    statementHeading: string;
    statementBody: string[];
    officerHeading: string;
    officerBody: string;
    feesHeading: string;
    feesBody: string[];
    publicBodyHeading: string;
    publicBodyIntro: string;
    publicBodyRows: { label: string; value: string }[];
    financeHeading: string;
    financeIntro: string;
    financeGroups: { id: string; heading: string; note: string }[];
    /** Headings for the groups inside Legal and Public Notices. */
    noticeGroups: Record<NoticeGroup, string>;
    employeesLabel: string;
    employeesValue: string;
    newsletterHeading: string;
    newsletterNote: string;
    compensationHeading: string;
    compensationBody: string;
  };

  contact: PageMeta & {
    officeHeading: string;
    departmentsHeading: string;
    departments: { label: string; detail: string }[];
    formHeading: string;
    formIntro: string;
    formName: string;
    formEmail: string;
    formPhone: string;
    formMessage: string;
    formSubmit: string;
    formSending: string;
    formSuccess: string;
    formError: string;
    directoryHeading: string;
  };

  leadCapture: {
    heading: string;
    body: string;
    name: string;
    email: string;
    submit: string;
    success: string;
    error: string;
    dismiss: string;
  };

  accessibility: PageMeta & {
    commitmentHeading: string;
    commitmentBody: string[];
    standardHeading: string;
    standardBody: string[];
    featuresHeading: string;
    features: string[];
    feedbackHeading: string;
    feedbackBody: string;
    documentsHeading: string;
    documentsBody: string;
  };

  notFound: {
    title: string;
    heading: string;
    body: string;
    cta: string;
  };
}
