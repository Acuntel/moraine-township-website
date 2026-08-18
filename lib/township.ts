// Facts about the Township, taken from the live site crawl of 2026-08-13 and
// the planning meeting. Every value here appeared on morainetownship.org or was
// stated on the call. Nothing is invented.
//
// Anything the client still owes us is marked TODO(client) rather than guessed.

export const SITE_URL = "https://www.morainetownship.org";

export const TOWNSHIP = {
  name: "Moraine Township",
  established: 1850,
  tagline: "Get a hand... give a hand",
  address: {
    street: "800 Central Avenue",
    city: "Highland Park",
    state: "IL",
    zip: "60035",
    full: "800 Central Avenue, Highland Park, IL 60035",
  },
  hours: "Monday to Friday, 8:30 a.m. to 4:30 p.m.",
  phone: {
    main: "847-432-3240",
    mainHref: "+18474323240",
    transportation: "847-432-3000",
    transportationHref: "+18474323000",
    assessor: "847-432-2100",
    assessorHref: "+18474322100",
    taxPrep: "847-780-6644",
  },
  fax: {
    main: "224-707-0059",
    assessor: "847-432-2178",
    foia: "224-203-2521",
  },
  email: {
    info: "info@morainetownship.org",
    supervisor: "super@morainetownship.org",
    clerk: "clerk@morainetownship.org",
    assessor: "assessor@morainetownship.org",
    caseworker: "caseworker@morainetownship.org",
    coordinator: "coordinator@morainetownship.org",
    administrator: "administrator@morainetownship.org",
    volunteer: "volunteer@morainetownship.org",
    ethics: "ethics@morainetownship.org",
  },
  geography: {
    squareMiles: 11.92,
    acres: 7627.7,
    municipalities:
      "most of Highland Park, all of Highwood, and parts of southeast Lake Forest and east Deerfield",
  },
  demographics: {
    population: 33946,
    medianHouseholdIncome: 148066,
    bachelorsOrHigher: "71.1%",
    employmentRate: "63.8%",
    housingUnits: 13812,
    withoutHealthcare: "4.5%",
    incomeUnder15k: "6%",
  },
  charitableFund: {
    legalName: "Moraine Township Charitable Fund, Inc.",
    ein: "26-4269258",
    status: "IRS 501(c)(3) charitable organization",
  },
} as const;

export const LINKS = {
  paypalDonate: "https://www.paypal.com/donate/?hosted_button_id=4ZF9SKTFU2RWN",
  amazonWishList:
    "https://www.amazon.com/registries/gl/guest-view/S4X71MVWVUDS",
  mentalHealthBoard: "https://www.morainetownshipmentalhealthboard.org",
  townshipsOfIllinois: "https://www.toi.org",
  volunteerApplication:
    "https://docs.google.com/forms/d/e/1FAIpQLSfM0eTApOq8e22Z9EiG13B6BOAASieTXfFQwUvsSR-fSKDBPQ/viewform?usp=sharing",

  // Lake County — the Assessor flagged these as the most important links on the
  // site and confirmed on 2026-08-13 that all of them are live.
  lakeCountyAssessment:
    "https://www.lakecountyil.gov/154/Chief-County-Assessment-Office",
  lakeCountyExemptions:
    "https://www.lakecountyil.gov/575/Property-Tax-Exemptions",
  lakeCountyAppeal: "https://www.lakecountyil.gov/551/Online-Appeal-Filing",
  lakeCountyTreasurer: "https://www.lakecountyil.gov/198/Treasurers-Office",
  lakeCountyPaymentStatus:
    "https://www.lakecountyil.gov/508/Current-Payment-Status",
  lakeCountyElections: "https://www.lakecountyil.gov/163/Elections",
  lakeCountyVoterPower:
    "https://www.lakecountyil.gov/351/Voter-Power-for-Registered-Voters",
  lakeCountyPollingPlaces:
    "https://maps.lakecountyil.gov/electiondaypollingplaces/",
  lakeCountyEarlyVoting:
    "https://www.lakecountyil.gov/DocumentCenter/View/13400/Early-Voting-Locations-Dates-and-Times",
  lakeCountyVacancyAffidavit:
    "https://www.lakecountyil.gov/DocumentCenter/View/40241/2021-Board-of-Review-Vacancy-Affadavit",
  lakeCountyAssessorSearch:
    "http://assessor.lakecountyil.gov/Pages/Default.aspx",
  seniorFreezeEfile: "https://lakecountyilpaefile.tylertech.com/lake_il_sf",

  illinoisVoterRegistration:
    "https://www.elections.il.gov/votingandregistrationsystems/register.aspx",
  comEdAssistance:
    "https://www.comed.com/MyAccount/CustomerSupport/Pages/PaymentAssistance.aspx",
  shareTheWarmth:
    "https://www.northshoregasdelivery.com/payment-bill/share-warmth",
  travelState: "https://travel.state.gov",
  censusProfile: "https://data.census.gov/cedsci/profile",
} as const;

/**
 * Elected officials, from /elected-officials as crawled 2026-08-13.
 *
 * TODO(client): the live site contradicts itself on the Assessor. Both
 * /assessments and /elected-officials name Thomas J. Healy (term 2022-2026),
 * while /mark-lindsay-bio still says Mark Lindsay has been Assessor since 2018.
 * Healy is used here because the two current pages agree. Confirm before launch.
 */
export const ELECTED_OFFICIALS = [
  {
    id: "supervisor",
    name: "Nancy Chausow Shafer",
    role: "Supervisor",
    roleKey: "supervisor" as const,
    term: "2025-2029",
    email: TOWNSHIP.email.supervisor,
    phone: TOWNSHIP.phone.main,
    hasPhoto: false,
  },
  {
    id: "clerk",
    name: "Colleen Jenn",
    role: "Clerk",
    roleKey: "clerk" as const,
    term: "2025-2029",
    email: TOWNSHIP.email.clerk,
    phone: TOWNSHIP.phone.main,
    hasPhoto: false,
  },
  {
    id: "assessor",
    name: "Thomas J. Healy, CIAO",
    role: "Assessor",
    roleKey: "assessor" as const,
    term: "2022-2026",
    email: TOWNSHIP.email.assessor,
    phone: TOWNSHIP.phone.assessor,
    hasPhoto: false,
  },
  {
    id: "trustee-guerrero",
    name: "Diana Guerrero",
    role: "Trustee",
    roleKey: "trustee" as const,
    term: "2025-2029",
    email: "trusteeguerrero@morainetownship.org",
    hasPhoto: false,
  },
  {
    id: "trustee-haggarty",
    name: "Mark Haggarty",
    role: "Trustee",
    roleKey: "trustee" as const,
    term: "2025-2029",
    email: "trusteehaggarty@morainetownship.org",
    hasPhoto: false,
  },
  {
    id: "trustee-jacoby",
    name: "Rachel Jacoby",
    role: "Trustee",
    roleKey: "trustee" as const,
    term: "2025-2029",
    email: "trusteejacoby@morainetownship.org",
    hasPhoto: false,
  },
  {
    id: "trustee-levin",
    name: "Allison Levin",
    role: "Trustee",
    roleKey: "trustee" as const,
    term: "2025-2029",
    email: "trusteelevin@morainetownship.org",
    hasPhoto: false,
  },
] as const;

/** Supervisor's office staff, from /moraine-township-staff. */
export const STAFF = [
  {
    name: "Linda Contreras",
    role: "Caseworker",
    roleKey: "caseworker" as const,
    email: TOWNSHIP.email.caseworker,
  },
  {
    name: "Gissele Valle",
    role: "Pantry and Transportation Coordinator",
    roleKey: "coordinator" as const,
    email: TOWNSHIP.email.coordinator,
  },
  {
    name: "Sanela Abazovic",
    role: "Township Administrator and Deputy Clerk",
    roleKey: "administrator" as const,
    email: TOWNSHIP.email.administrator,
  },
  {
    name: "Sara Hoffman",
    role: "Volunteer Coordinator",
    roleKey: "volunteerCoordinator" as const,
    email: TOWNSHIP.email.volunteer,
  },
  {
    name: "Rosa Machabanski",
    role: "Office Staff",
    roleKey: "officeStaff" as const,
    email: "staffdesk@morainetownship.org",
  },
] as const;

/**
 * Biographies as published on each official's own page of the current site,
 * lightly condensed. These are the bios "that they wrote", which the Supervisor
 * asked to carry over. They are the officials' own words about themselves, so
 * nothing here is invented or embellished.
 *
 * TODO(client): the Township has photographs of at least some officials. Once
 * supplied, add them beside these and drop the initials mark for those people.
 */
export const OFFICIAL_BIOS: Record<string, string> = {
  "supervisor":
    "Nancy Chausow Shafer grew up in Highland Park and has lived here as an adult since 1990. She raised her two children here, and lives with her husband Arnie Shafer, a retired photographer. Nancy is an attorney and principal in the Highland Park firm Sage Counsel, LLC, concentrating in matrimonial law including litigation, mediation and collaboration, and accepting child representation and guardian ad litem appointments. She is a fellow of the American Academy of Matrimonial Lawyers and a frequent presenter and organizer at continuing legal education programs. Active in the Democratic party in Lake County, she has served as secretary of both the Tenth Congressional Democrats and the Moraine Township Democrats, and chaired the Election Protection committee of the Tenth Congressional Democrats.",
  "clerk":
    "Colleen Jenn hails from a large military family and has resided in Highland Park for 21 years. She graduated from Northwestern University and worked as Radiology Administrator of Northwestern Medicine. After retirement she wanted to help military veterans, and volunteered at the James Lovell Federal Healthcare Center for years, conducting art therapy and teaching piano. She is proud of her service to hospitalized veterans, and is glad to be part of the Moraine Township team of dedicated staff and volunteers.",
  "trustee-guerrero":
    "Diana J. Guerrero grew up in Chicago's Pilsen neighborhood and has been a resident of Highland Park since 2016. She is Communications and Development Manager at the Highwood Library and Community Center, where she leads marketing, communications and grant development. With over 15 years of experience in marketing and a Bachelor's degree in Liberal Arts from Lake Forest College, Diana is deeply committed to community engagement and public service. She previously served on the Board of Trustees for the Highwood Library, and is involved in the Northwood Middle School Parent Teacher Organization and the Stewardship, Events and Development Committee and Finance Council of Christ Our Hope Parish. She was installed as Public Relations Chair on the board of Coalición Latinos Unidos de Lake County, and was honored as a Wintrust Latinx Community Leader in September 2024.",
  "trustee-haggarty":
    "Mark Haggarty has lived in Highland Park since 2013 with his wife Amy, a native Highland Parker, and their two children. He holds a B.A. in English from Kenyon College and an MBA from Loyola University Chicago. He has worked in the non-profit arena since 2002, and in 2018 founded the consultancy firm Spacebar Projects. His community service has focused on programs benefiting children and families, including extensive volunteering in the schools and with the Moraine Township food pantry before joining the Board as a trustee.",
  "trustee-jacoby":
    "Rachel Jacoby is a proud Highland Park resident. She graduated with Bachelor's degrees in Accountancy and Supply Chain Management from the University of Illinois, and from the Harvard Kennedy School with a Master's in Public Policy, concentrating in social and urban policy. Rachel works in the gun violence prevention movement and previously served as an English teacher on a Fulbright grant in Malaysia. She has served on the Moraine Township Grant Committee since 2024.",
  "trustee-levin":
    "Allison Levin and her husband Brad have lived in Highland Park for over 30 years, raising their son and two daughters. Allison is a Managing Director at Fidelity Investments, with a BA in English Literature from Northwestern University and an MBA from the University of Chicago. Her passion has been elevating at-risk children and youth, including work with Citizen Schools of Illinois as a board member and classroom volunteer, and as board member and human resource chair for The Women's Treatment Center. At Fidelity she serves on several diversity, equity and inclusion task forces. Allison volunteers with the Township VITA program, helping prepare free income tax returns for low-income taxpayers.",
};

/** Ethics Commission, from /ethics. */
export const ETHICS_COMMISSION = [
  { name: "Daniel Adelman", termExpires: 2028 },
  { name: "Lisa Greene", termExpires: 2027 },
  { name: "Julie Gordon", termExpires: 2028 },
] as const;
