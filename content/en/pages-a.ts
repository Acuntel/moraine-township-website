import type { Dictionary } from "../types";

// English only: titles, headings, eyebrows and labels use Title Case, and every
// list of three or more takes the serial comma. Both were asked for by the
// committee in the Draft 1 review, round 2. Spanish and Russian keep their own
// conventions (sentence case, no serial comma).

export const home: Dictionary["home"] = {
  title: "Moraine Township, Highland Park, Illinois",
  description:
    "Moraine Township serves residents of Highwood, Fort Sheridan, most of Highland Park, and parts of Lake Forest and Deerfield with a food pantry, emergency assistance, door-to-door transportation, property assessment, and voter registration.",
  h1: "Moraine Township",
  heroKicker: "Serving our neighbors since 1850",
  heroHeadline: "Get a Hand. Give a Hand.",
  heroSub:
    "Moraine Township provides responsive, efficient, and compassionate services for residents of Highwood, Fort Sheridan, most of Highland Park, and parts of Lake Forest and Deerfield.",
  heroImageAlt:
    "About fourteen Moraine Township staff members and food pantry volunteers standing together outside the pantry entrance, in front of a window bearing the Moraine Township food pantry logo.",
  heroPrimaryCta: "How can we help you?",
  heroSecondaryCta: "How can you help us?",

  newsHeading: "Township News",
  newsEmpty:
    "There are no news items posted right now. Please check back soon.",
  newsViewAll: "Read all news",

  helpYouHeading: "How Can We Help You?",
  helpYouBody:
    "Many of us encounter difficult times during our lives. Moraine Township offers a food pantry, emergency and general assistance, utility help, free tax preparation, health insurance enrollment, passport processing, voter registration, and door-to-door transportation. Some services are open to every resident, and others are for residents who qualify by income.",
  helpYouCta: "See all resident services",
  helpYouImageAlt:
    "Moraine Township Food Pantry volunteers wearing face masks and name badges on lanyards, standing together in the pantry in front of shelves stocked with cereal.",

  helpUsHeading: "How Can You Help Us?",
  helpUsBody:
    "Our volunteers make it possible to offer far more than our staff could alone. You can volunteer at the food pantry, shop our Amazon wish list, host a food drive, help prepare tax returns, or donate to the Moraine Township Charitable Fund. Every hour and every dollar goes directly back to residents in this Township.",
  helpUsCta: "See ways to get involved",
  helpUsImageAlt:
    "Seven Moraine Township volunteers standing in the pantry storeroom holding decorated holiday gift bags, with shelves of packed bags behind them, during the Holiday Gift Drive.",

  // Service area wording supplied by Sanela Abazovic in the round 2 review.
  heroBadge:
    "Serving Highwood, Fort Sheridan, most of Highland Park, and parts of Lake Forest and Deerfield",
  heroCardHeading: "Food Pantry Hours",
  heroCardFootnote: "Open to all income-qualified Moraine Township residents.",

  marqueeLabel: "What the Township provides",
  marquee: [
    "Fresh produce weekly",
    "Dairy, meat, and bread",
    "Household essentials",
    "English, Spanish, and Russian",
    "Door-to-door transportation",
    "Free tax preparation",
    "Emergency rent and utility help",
    "Passports, notary, and voter registration",
  ],

  impactEyebrow: "Our Community",
  impactHeading: "A Safety Net, Held Up by Neighbors",
  impactSub:
    "Moraine Township has served this corner of Lake County since 1850. These figures come from the Township's own published records.",
  stats: [
    { value: "1850", label: "Serving This Community Since" },
    { value: "33,946", label: "Residents in the Township" },
    // Grant figures change every year after the Board votes in April/May.
    // 2026 values supplied by the Supervisor in the Draft 1 review doc.
    { value: "$275,000", label: "Awarded in Community Grants in 2026" },
    { value: "23", label: "Local Agencies Funded" },
  ],

  stepsEyebrow: "How It Works",
  stepsHeading: "Getting Help Takes Four Steps",
  stepsSub:
    "We keep the process straightforward and respectful. If anything here is unclear, call the office and someone will walk you through it.",
  steps: [
    {
      title: "Check That You Qualify",
      body: "Most assistance is open to income-qualified residents of Moraine Township. Not sure if you live inside the boundary? Call and we will check.",
    },
    {
      title: "Complete an Application",
      body: "Forms are available in English, Spanish, and Russian, at the office or online. Staff can help you fill one in.",
    },
    {
      title: "Come During Open Hours",
      body: "The Food Pantry is open three days a week. Other services run weekdays from 8:30 a.m. to 4:30 p.m.",
    },
    {
      title: "Take Home What You Need",
      body: "Shoppers receive produce, dairy, meat, bread, and shelf-stable food, and once a month they also receive household goods and personal care products.",
    },
  ],

  tilesEyebrow: "What We Provide",
  tilesHeading: "More Than a Food Pantry",
  tilesSub: "A full range of assistance for residents across the Township.",
  tiles: [
    {
      id: "food-pantry",
      title: "Food Pantry",
      blurb:
        "Free groceries for income-qualified residents, open three days a week. Applications are available in English, Spanish, and Russian.",
      href: "/food-pantry",
    },
    {
      id: "assistance",
      title: "General & Emergency Assistance",
      blurb:
        "State-regulated help with rent, utilities, and food for residents facing a hardship or a life-threatening circumstance.",
      href: "/services#assistance",
    },
    {
      id: "transportation",
      title: "Door-to-Door Transportation",
      blurb:
        "We offer affordable paratransit rides for residents 65 and older and residents with disabilities, weekdays by appointment.",
      href: "/transportation",
    },
    {
      id: "assessor",
      title: "Assessor",
      blurb:
        "Property assessment, homestead and senior exemptions, and help understanding or appealing your assessment.",
      href: "/assessor",
    },
    {
      id: "services",
      title: "Resident Services",
      blurb:
        "Passports, voter registration, health insurance enrollment, free tax preparation, notary service, and RTA discount cards.",
      href: "/services",
    },
    {
      id: "get-involved",
      title: "Volunteer",
      blurb:
        "Sort food, staff a food drive, prepare tax returns, or join a citizen advisory committee.",
      href: "/get-involved",
    },
  ],

  newsEyebrow: "Latest",
  helpEyebrow: "Two Directions",
  boardStripHeading: "Board of Trustees",
  boardStripBody:
    "Meeting agendas, the schedule of regular meetings, and approved minutes are posted here as required by the Illinois Open Meetings Act.",
  boardStripCta: "View meetings and minutes",
};

export const about: Omit<Dictionary["about"], "officialPhotoAlts"> = {
  title: "About Moraine Township",
  description:
    "Moraine Township is a special purpose unit of government established in 1850, serving 33,946 residents across Highwood, Fort Sheridan, most of Highland Park, and parts of Lake Forest and Deerfield.",
  h1: "About Moraine Township",
  intro:
    "Moraine Township is a special purpose unit of government serving residents of southeast Lake County. This page brings together our mission, our history, our boundaries, and the people who serve you.",

  missionHeading: "Mission Statement",
  missionStatement:
    "Moraine Township administers funds to provide responsive, efficient, and compassionate services and support for residents in need.",

  specialPurposeHeading: "What the Township Does",
  specialPurposeIntro:
    "Moraine Township is a special purpose governmental unit providing:",
  specialPurposeItems: [
    "General Assistance to individuals",
    "Property assessment services in the Assessor’s Office",
    "Election and record-keeping functions in the Clerk’s Office",
    "Management of two cemeteries, Mooney and Daggitt",
    "Resident services including the Food Pantry, transportation, utility help, and benefit enrollment",
  ],

  boundariesHeading: "Geographic Boundaries",
  boundariesBody: [
    "Located in southeast Lake County along the Lake Michigan shore, Moraine Township and the municipalities within its borders are not co-terminus. Through the years new municipalities incorporated, and existing municipalities annexed and expanded into other townships.",
    "Moraine Township includes Highwood, Fort Sheridan, most of Highland Park, and parts of Lake Forest and Deerfield. Because the boundary does not follow municipal lines, two neighbors on opposite sides of the same street can be in different townships. If you are not sure whether you live in Moraine Township, call the Township office and we will check your address.",
  ],

  demographicsHeading: "Population and Demographics",
  demographicsNote:
    "Total population is from the 2020 Census. The other figures are U.S. Census Bureau American Community Survey 2019-2023 five-year estimates for Moraine Township.",
  demographicsLabels: {
    population: "Total Population",
    medianIncome: "Median Household Income",
    bachelors: "Bachelor’s Degree or Higher",
    employment: "Employment Rate",
    housingUnits: "Total Housing Units",
    withoutHealthcare: "Without Health Insurance",
    belowPoverty: "Residents Below the Poverty Line",
  },

  historyHeading: "History of Moraine Township",
  historyBody: [
    'Moraine Township, originally named Deerfield Township, was established in 1850, shortly after the Illinois Constitution gave citizens the opportunity to adopt township government. In 1889 it was split into East and West Deerfield Townships. Eventually "East" was dropped from our section, and in 1998, to eliminate confusion and reference our topography, the name was changed to Moraine Township.',
    "The first Deerfield Township meeting was held April 2, 1850. Officers elected included a Supervisor, Town Clerk, Assessor, Collector, Overseer of the Poor, three Highway Commissioners, two Justices of the Peace, and two Constables. Minutes of that meeting show that the Highway Commissioners established five districts within the township and later appointed five Overseers of Highways.",
    "Those first minutes illustrate a need to establish many rules of local governance, including the need to lay out and build roads. In order to finance township projects such as roadbuilding, education, burying the dead, and providing for the needy, property assessment systems were implemented.",
    "Over time, municipalities assumed many of the duties originally tasked to townships. Duties remaining today in Moraine Township include the Supervisor’s, Assessor’s, and Clerk’s respective functions in resident services, property appraisal, and voting. State law mandates that townships provide a safety net for residents through general assistance, and that they operate abandoned cemeteries.",
  ],

  teamHeading: "The Moraine Township Team",
  teamIntro:
    "The Moraine Township Board is composed of the Supervisor, Clerk, Assessor, and four Trustees. Below you will find our elected officials and the staff of the Supervisor’s office.",

  electedHeading: "Elected Officials",
  boardBody:
    "Four trustees, along with the Township Supervisor, and the Township Clerk as a non-voting member, comprise the Township Board. The Board is responsible for approving all township expenses and auditing all bills submitted for payment. Its duties include adopting the annual tax levy, the town budget and appropriation ordinance, and approving township expenses.",

  staffHeading: "Supervisor’s Office Staff",
  staffIntro:
    "Our staff answer questions, take applications, and connect residents with the right program. The general office line is answered during business hours.",
  readBio: "Read Biography",
  noPhotoNote: "Photograph not published.",

  roleDescriptions: {
    supervisor:
      "The Township Supervisor serves as chief executive officer of the Township. Duties include serving as chairman of the Board of Trustees, administering the General Assistance and Emergency Assistance programs, and serving as treasurer of all funds. The Supervisor develops the township levy and budget for board review, works with the auditor on the annual certified financial audit, and supervises program development and hiring.",
    clerk:
      "The Clerk organizes township board meetings, including developing agendas and recording minutes, publishes public notices, maintains township records other than confidential General and Emergency Assistance case records, administers oaths of office, takes affidavits as required by law, and convenes the Annual Town Meeting. The Clerk is a non-voting member of the Township Board of Trustees.",
    assessor:
      "The Assessor is responsible for the appraisal of all taxable property within the township. That includes discovering, listing, and valuing all new construction within our jurisdiction, ensuring existing property is valued at the appropriate statutory level of market value, and assuring that similar property is valued in a uniform manner.",
    trustees:
      "Trustees vote on community issues, approve township expenses, adopt the annual levy and budget, and respond to questions and comments from residents.",
  },

  financialHeading: "Financial and Legal",
  financialBody:
    "The Township's budget and appropriation ordinances, annual certified audits, tax levies, public notices, and the resolutions setting elected official salaries are all published in the transparency archive.",
  financialCta: "Open the financial archive",
  ethicsHeading: "Ethics",
  ethicsBody:
    "The conduct of Moraine Township elected officials and staff is governed by the Township’s Ethics Ordinance, overseen by an independent Ethics Commission. If you have questions or concerns, please direct your comments to the Ethics Commission.",
  ethicsCommissionHeading: "Ethics Commission Members",
  termExpires: "Term expires",
};

export const services: Dictionary["services"] = {
  title: "Resident Services",
  description:
    "Moraine Township offers a food pantry, emergency and general assistance, utility help, free tax preparation, health insurance enrollment, passports, voter registration, notary service, and transportation.",
  h1: "Resident Services",
  intro:
    "Some Township services are open to every resident. Others are for residents who qualify by income. If you are not sure which applies to you, call the Township office and we will walk you through it.",

  allResidentsHeading: "Services Available to All Residents",
  allResidentsIntro:
    "These services are available to any Moraine Township resident, with no income requirement.",

  incomeQualifiedHeading: "Services for Income-Qualified Residents",
  incomeQualifiedIntro:
    "Many of us encounter difficult times during our lives. Moraine Township is here to help residents who need extra support. Call the Township office to learn about eligibility, get help applying, or be connected with other resources.",

  formsHeading: "Application Forms",
  formsNote:
    "Download, print, and bring a completed form to the Township office, or ask staff to help you fill one in.",

  // Order of the all-residents sections set by the committee in round 2:
  // health insurance, transportation, passports, voter registration, then the
  // other services and the notary detail they link to.
  sections: [
    {
      id: "health-insurance",
      heading: "Health Insurance Enrollment: ACA and Medicare",
      body: [
        "Moraine Township has trained and certified counselors who confidentially help residents explore health insurance options on the state marketplace, Get Covered Illinois, and who assist with Medicare enrollment through the State Health Insurance Program.",
        "Counselors work one-on-one with residents to compare coverage and costs, and to make sure enrollees receive the premium subsidies and cost-sharing reductions they may qualify for. You may be eligible for subsidies, reduced out-of-pocket expenses, or expanded Medicaid.",
        "This service is free, and you do not need to be a Moraine Township resident to use our counselors. Call the Township office to schedule an appointment.",
      ],
    },
    {
      id: "transportation-summary",
      heading: "Door-to-Door Transportation",
      body: [
        "Moraine Township offers affordable, reliable paratransit service for residents 65 and older and residents with disabilities. Medical trips take priority, and residents are also welcome to schedule rides for errands, volunteering, and other quality-of-life trips.",
      ],
      links: [
        {
          label: "See transportation details and fares",
          href: "/transportation",
        },
      ],
    },
    {
      id: "passport",
      heading: "Passport Applications",
      body: [
        "Moraine Township accepts passport book and card applications by appointment, Monday through Friday from 10:00 a.m. to 3:00 p.m. Call the Township office to schedule.",
        "If the passport is for a child under age 16, both parents must be present.",
      ],
      bullets: [
        "Completed DS-11 new passport application, unsigned",
        "Completed DS-82 renewal application, unsigned",
        "One passport photo. We can take your photo for a $15.00 charge",
        "Certified copy of birth certificate, Certificate of Naturalization, or expired passport",
        "Photo ID such as a driver’s license, State ID, or Military ID",
        "Payment by check or money order only",
      ],
    },
    {
      id: "voter-registration",
      heading: "Voter Registration",
      body: [
        "Register to vote, or change your voting address, at the Township office during regular business hours. Bring two forms of identification.",
        "You must be a United States citizen, 18 years old by the next election, and a resident of the voting precinct for 30 days prior to the next election. A 17-year-old may register if their birthday falls on or before the date of the next election. By law, voter registration closes for 28 days before each election and resumes shortly after.",
      ],
      bullets: [
        "Illinois driver’s license or Illinois State ID",
        "Employee or student ID",
        "Credit card or Social Security card",
        "Birth certificate or valid United States passport",
        "Utility bill in the applicant’s name, or mail postmarked to the applicant",
        "Public Aid ID card, or a lease or rental contract",
      ],
    },
    {
      id: "other-all",
      heading: "Other Services for All Residents",
      bullets: [
        "Township Assessor: help with exemptions, understanding your assessment, and filing an appeal",
        "RTA discount cards",
        { label: "Free notary service", href: "#notary" },
      ],
    },
    {
      id: "notary",
      heading: "Notary Service",
      body: [
        "Moraine Township offers free notary service to residents at the Township office. We do not notarize real estate deeds. Call the Township office with any questions about a document you need notarized.",
      ],
    },
    {
      id: "assistance",
      heading: "General and Emergency Assistance",
      body: [
        "General Assistance and Emergency Assistance are state-regulated functions of the Office of the Supervisor. Qualifications for assistance are regulated by federal and Illinois statute. Information about General Assistance applicants is strictly confidential.",
      ],
      subsections: [
        {
          id: "general-assistance",
          heading: "General Assistance",
          body: [
            "The state-mandated General Assistance program provides Moraine Township residents assistance toward monthly basic living expenses such as rent, utilities, and food. You may be eligible if you are unemployed and actively seeking employment, or are awaiting a decision on a Social Security disability claim. Applicants must meet state-mandated qualifications.",
          ],
        },
        {
          id: "emergency-assistance",
          heading: "Emergency Assistance",
          body: [
            "Emergency Assistance provides Moraine Township residents with help alleviating a life-threatening circumstance or a job-related expense. Residents experiencing hardship due to a current emergency, such as loss of income, a reduction in hours, or medical illness, are encouraged to apply.",
            "Emergency Assistance is flexible. If your situation is not one of the examples above, please call us anyway, and we will talk through what help may be available.",
          ],
        },
      ],
      outro: [
        "To learn more about the programs and eligibility, call the Township office and ask for the caseworker.",
      ],
    },
    {
      id: "utilities",
      heading: "Utility Assistance",
      body: [
        "For income-qualified Moraine Township residents, several programs are available to help with utility payments. Call the Township office for information about the programs we may be able to connect you with.",
      ],
      bullets: [
        "LIHEAP, the Low-Income Home Energy Assistance Program, helps many eligible low-income households pay for winter energy service. Applications are typically accepted September through May unless funding is exhausted sooner.",
        "Share the Warmth is a North Shore Gas program administered by Community Action Partnership of Lake County for qualified low-income residents.",
        "ComEd Hardship is available to residents who are past due on their utility bill and meet program qualifications.",
        "Moraine Township Summer Utility Assistance serves income-qualified senior and disabled residents living in a stand-alone structure. It is not available to residents in buildings with access to a cooling room.",
      ],
    },
    {
      id: "tax-prep",
      heading: "Free Income Tax Preparation",
      body: [
        "Moraine Township partners with the IRS to offer free income tax return preparation for low and moderate income taxpayers through the Volunteer Income Tax Assistance program. Volunteers are trained and certified by the IRS to prepare basic returns for taxpayers earning less than $67,000.",
        "Volunteers are available on Saturdays between 8:30 a.m. and 12:30 p.m. at the Township office. Taxpayers drop off their documents and pick up the finished return on a later Saturday. Returns are prepared remotely, and volunteers will call with questions if needed.",
        "Bring a photo ID for both the taxpayer and spouse, and original Social Security cards or ITIN letters for each taxpayer and dependent listed on the return. Taxpayers do not need to be Township residents to use this service.",
      ],
    },
    {
      id: "other-income",
      heading: "Other Services for Income-Qualified Residents",
      bullets: [
        "Medical alert monitoring for income-qualified seniors and residents with disabilities",
        "Application assistance for Illinois Department of Human Services programs including Medicaid, SNAP, and TANF",
        "Illinois Department on Aging Benefit Access Program",
        "Resource referrals for specific needs",
      ],
    },
  ],
};
