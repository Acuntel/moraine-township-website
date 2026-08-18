// Every path that existed on the Squarespace site maps to its new home.
// The Assessor's point on the call was that the links are the most important
// thing on the site. That cuts both ways: inbound links and bookmarks that
// residents already have must not 404.
//
// Source of truth: docs/site-crawl/site.json (62 pages crawled 2026-08-13).

const MAP = {
  // Home
  '/home-impact': '/',

  // About Us absorbs about, mission, history, team, officials, bios, ethics, financial
  '/about-us-1': '/about',
  '/mission': '/about',
  '/history-of-moraine-township': '/about#history',
  '/moraine-township-team': '/about#team',
  '/elected-officials': '/about#elected-officials',
  '/government': '/about#elected-officials',
  '/supervisor': '/about#supervisor',
  '/clerk': '/about#clerk',
  '/moraine-township-staff': '/about#staff',
  '/ethics': '/about#ethics',
  '/financial-legal': '/foia#financial',
  '/nancy-chausow-shafer-bio': '/about#supervisor',
  '/colleen-jenn': '/about#clerk',
  '/mark-lindsay-bio': '/about#assessor',
  '/diana-guerrero-bio': '/about#trustees',
  '/mark-haggarty-bio': '/about#trustees',
  '/rachel-jacoby-bio': '/about#trustees',
  '/allison-levin-bio-copy': '/about#trustees',
  '/anne-flanigan-bassi-bio': '/about#trustees',
  '/newsletter-archive': '/about',

  // Resident services
  '/services': '/services',
  '/other-resident-services': '/services',
  '/general-emergency-assistance': '/services#assistance',
  '/utility-assistance': '/services#utilities',
  '/vita-tax-preparation': '/services#tax-prep',
  '/taxpreparationforms': '/services#tax-prep',
  '/affordable-care-act': '/services#health-insurance',
  '/passport': '/services#passport',
  '/voter-registration': '/services#voter-registration',
  '/new-page-4': '/services',
  '/new-page-56': '/services',
  '/new-page-68': '/services',
  '/new-page-70': '/services',

  // Food pantry
  '/food-pantry': '/food-pantry',
  '/food-pantry-shopping-list': '/food-pantry#shopping-list',

  // Assessor
  '/assessments': '/assessor',
  '/assessor': '/assessor',
  '/new-page-47-1': '/assessor#map',
  '/new-page-27': '/assessor#senior-exemptions',
  '/new-page-50': '/assessor#other-exemptions',
  '/new-page-85': '/assessor#appeals',

  // Transportation
  '/doortodoor-transportation': '/transportation',

  // Board and meetings
  '/board-of-trustee-regular-meeting-minutes': '/board-meetings#minutes',
  '/bot-closed-session-minutes': '/board-meetings#closed-session',
  '/decennial-meeting-minutes': '/board-meetings#decennial',
  '/annual-town-meeting-minutes': '/board-meetings#annual-town-meeting',

  // Cemeteries
  '/cemeteries': '/cemeteries',
  '/mooney-cemetery-history': '/cemeteries/mooney',
  '/daggitt-cemetery-history': '/cemeteries/daggitt',

  // Programs
  '/new-page': '/programs#grants',
  '/latino-advisory-committee': '/programs#latino-advisory-committee',

  // Get involved
  '/volunteer-1': '/get-involved',
  '/support': '/get-involved',
  '/volunteer-photos': '/get-involved#photos',
  '/volunteer-application-form': '/get-involved#apply',

  // Donate
  '/donate-1': '/donate',
  '/donate': '/donate',

  // Transparency
  '/foia': '/foia',
  '/audit': '/foia#audit',
  '/budget': '/foia#budget',
  '/levy': '/foia#levy',
  '/legal-public-notices': '/foia#notices',
  '/comptrollers-report': '/foia#comptroller',
  '/treasurers-report': '/foia#treasurer',
}

/** @type {Array<{source: string, destination: string, permanent: boolean}>} */
export const REDIRECTS = Object.entries(MAP)
  // A path that already maps to itself needs no redirect rule.
  .filter(([from, to]) => from !== to)
  .flatMap(([from, to]) => [
    { source: from, destination: to, permanent: true },
    { source: `/es${from}`, destination: `/es${to}`, permanent: true },
    { source: `/ru${from}`, destination: `/ru${to}`, permanent: true },
  ])

export const LEGACY_PATHS = Object.keys(MAP)
