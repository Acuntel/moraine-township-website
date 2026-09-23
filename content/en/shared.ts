import type { Dictionary } from "../types";

export const shared: Dictionary["shared"] = {
  hours: "Monday to Friday, 8:30 a.m. to 4:30 p.m.",
  term: "Term",
  squareMiles: "Square Miles",
  acres: "Acres",
  untranslatedNote: "",
  tagline: "Get a Hand. Give a Hand.",
  foiaOfficerTitle: "FOIA Officer and Supervisor",
  sourcesHeading: "Sources and Acknowledgements",
  mapCredit:
    "Moraine Township, City and Village. Prepared by the Lake County GIS and Mapping Division, revised 2025.",
  roles: {
    supervisor: "Supervisor",
    clerk: "Clerk",
    assessor: "Assessor",
    trustee: "Trustee",
    caseworker: "Caseworker",
    coordinator: "Pantry and Transportation Coordinator",
    administrator: "Township Administrator and Deputy Clerk",
    volunteerCoordinator: "Volunteer Coordinator",
    officeStaff: "Office Staff",
  },
  links: {
    lakeCountyExemptions:
      "Detailed review of available exemptions at Lake County",
    seniorFreezeFile: "File the senior freeze exemption online",
    chiefCountyAssessment: "Lake County Chief County Assessment Office",
    vacancyAffidavit: "Board of Review vacancy affidavit",
    appealOnline: "File an appeal online with the Lake County Board of Review",
    propertySearch: "Lake County property search",
    treasurer: "Lake County Treasurer, for tax bills and payments",
    paymentStatus: "Check your current property tax payment status",
    voterOnline:
      "Register to vote online through the Illinois State Board of Elections",
    voterStatus:
      "Check your voter registration status with Lake County Voter Power",
    pollingPlaces: "Find your polling place",
    passportForms: "Passport forms and requirements at travel.state.gov",
    comEd: "ComEd payment assistance programs",
    shareWarmth: "North Shore Gas Share the Warmth",
  },
};

/** 2025 awards, from /new-page as crawled 2026-08-13. The Supervisor flagged
 *  on the call that this page needs 2026 content. */
export const grantees: Dictionary["programs"]["grantees"] = [
  {
    name: "A Safe Place",
    description: "Support for domestic violence assistance and education.",
  },
  {
    name: "Blessings in a Backpack",
    description: "Support for low-income school aged children.",
  },
  {
    name: "Center for Enriched Living",
    description:
      "Skill development and social activities for residents with developmental disabilities.",
  },
  {
    name: "College Bound Opportunities",
    description:
      "Support and mentoring for low-income scholars from high school through college.",
  },
  {
    name: "Community Partners for Affordable Housing",
    description:
      "Preservation and expansion of affordable local housing options.",
  },
  {
    name: "Family Focus HP/RFTS",
    description: "Support for children and their families from birth.",
  },
  {
    name: "Fenix Family Health Center",
    description:
      "Health care services for low-income Spanish speaking residents.",
  },
  {
    name: "Highland Park Community Early Learning Center",
    description:
      "Scholarship funds for low to moderate income families with children in day care.",
  },
  {
    name: "Jewish Child and Family Services",
    description:
      "Mental health services, especially for students at the Highland Park High School drop-in center.",
  },
  {
    name: "Josselyn Center",
    description: "Individual and family counseling for Township residents.",
  },
  {
    name: "North Suburban Legal Aid Clinic",
    description:
      "Legal assistance on housing, immigration, and domestic violence.",
  },
  {
    name: "Omnis Rehabilitation",
    description:
      "Neurological therapy for low income Moraine Township clients.",
  },
  {
    name: "PADS of Lake County",
    description: "Support for unhoused individuals.",
  },
  {
    name: "Lake County Partners in Aging",
    description:
      "Volunteer caregiving for elderly and mobility challenged residents.",
  },
  {
    name: "Tri-Con Child Care Center",
    description:
      "Scholarship funds supplementing early childcare and education for low income clients.",
  },
];

export const minutesCards: Dictionary["boardMeetings"]["minutesCards"] = [
  {
    id: "regular-minutes",
    heading: "Board Meeting Minutes",
    body: "Approved minutes of regular and special meetings of the Board of Trustees, archived by year.",
  },
  {
    id: "closed-session",
    heading: "Closed Session Minutes",
    body: "Closed session minutes are posted once the Board votes to release them.",
  },
  {
    id: "annual-town-meeting",
    heading: "Annual Town Meeting",
    body: "The Clerk convenes the Annual Town Meeting each year. Minutes and Supervisor’s reports are archived by year.",
  },
  {
    id: "decennial",
    heading: "Decennial Committee",
    body: "Report and minutes of the Decennial Committee on Local Government Efficiency.",
  },
];

export const foiaEmployees = {
  employeesLabel: "Employees",
  employeesValue:
    "Full and part-time staff of the Supervisor’s and Assessor’s offices. The current headcount is available on request from the Township office.",
};

/**
 * The groups inside Legal and Public Notices on /foia, named in the round 2
 * review. Keys match NOTICE_GROUPS in lib/documents.ts.
 */
export const noticeGroups: Dictionary["foia"]["noticeGroups"] = {
  treasurer: "Treasurer’s Reports",
  comptroller: "Comptroller’s Reports",
  "financial-affairs": "Statements of Financial Affairs",
  "officials-compensation": "Elected Officials’ Compensation",
  "compensation-disclosures": "Compensation Disclosures",
  resolutions: "Resolutions and Ordinances",
  "foia-posting": "Freedom of Information",
};
