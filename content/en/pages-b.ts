import type { Dictionary } from "../types";

export const assessor: Dictionary["assessor"] = {
  title: "Assessor",
  description:
    "The Moraine Township Assessor appraises all taxable property in the township and helps residents with homestead and senior exemptions, assessment questions and appeals.",
  h1: "Moraine Township Assessor",
  intro:
    "We are committed to serving the people of Moraine Township fairly and equitably. Our staff is available to answer questions and provide assistance.",

  officeIntro:
    "Welcome to the Moraine Township Assessor’s Office. We will do our best to provide you with the information available at our office. Most of our records are considered public information.",

  servicesHeading: "Assessor services",
  servicesBody: [
    "Assessors estimate the market value of all property in the township to determine assessments for your share of real estate tax. Assessors will make adjustments to assessments due to factual errors.",
    "Illinois law provides homeowners with certain homestead exemptions if you are the owner of record and live in the home as your primary residence. Using these exemptions will lower the amount of property tax you owe.",
  ],

  deputyHeading: "How our deputy assessors can help",
  deputyIntro:
    "Moraine Township deputy assessors can assist eligible residents to:",
  deputyItems: [
    "File for the Senior Homestead Exemption",
    "File for the Senior Citizen Assessment Freeze Homestead Exemption",
    "Apply for the Senior Citizens Real Estate Tax Deferral Program",
    "Apply for the General Homestead Exemption and Homestead Improvement Exemption",
    "Apply for veterans exemptions",
    "Understand options as a new property owner",
    "Request a commercial vacancy review",
    "Find the information needed for an assessment appeal",
    "Understand how assessed value affects your tax bill",
  ],

  mapHeading: "Map of Moraine Township",
  mapIntro:
    "Moraine Township boundaries do not follow city limits. Use this map to check whether your address is inside the Township. If you are still not sure, call our office and we will look it up for you.",
  mapImageAlt:
    "Boundary map of Moraine Township in southeast Lake County, Illinois, showing the Township outline against neighboring West Deerfield Township and the municipalities of Highland Park, Highwood, Lake Forest and Deerfield.",
  mapLongDescription:
    "Moraine Township sits in southeast Lake County, Illinois, along the Lake Michigan shore. It covers 11.92 square miles, or 7,627.7 acres. The Township includes most of Highland Park, all of Highwood, part of southeast Lake Forest, and part of east Deerfield. The boundary does not follow municipal lines. Highwood sits inside the Township, and Lake Forest lies to the north. West Deerfield Township borders Moraine Township to the west, and in some neighborhoods the line runs down the middle of a residential street, so one side of the street is in Moraine Township and the other side is in West Deerfield Township. Parts of Highland Park that lie west of that line are in West Deerfield Township rather than Moraine Township. A small portion of the village of Deerfield is inside Moraine Township, while the larger part of Deerfield is in West Deerfield Township. Because eligibility for Township services depends on living inside these boundaries, residents who are unsure should call the Assessor’s office at 847-432-2100 to confirm their address.",
  mapWhyHeading: "Why the boundary matters",
  mapWhyBody:
    "Eligibility for Township services, including the Food Pantry and General Assistance, depends on living inside Moraine Township. Because the boundary can run down the middle of a street, we ask every applicant to confirm their address with us first.",

  seniorHeading: "Senior property tax exemptions and deferral",
  seniorSections: [
    {
      id: "senior-homestead",
      heading: "Senior Homestead Exemption",
      body: [
        "If you turned 65 at any time during the tax year, you are eligible for an additional $8,000 reduction of your assessed valuation, which is a $24,000 fair market value reduction. If you are over 65 and not receiving this exemption, please contact the Moraine Township Assessor’s Office.",
        "Once you have registered, you do not have to renew as long as you remain at that address and it is your primary residence.",
      ],
    },
    {
      id: "senior-freeze",
      heading: "Senior Citizen Assessment Freeze Homestead Exemption",
      body: [
        "If you are 65, qualified for the Senior Homestead Exemption, and have a total household income of $65,000 or less, the assessed value on your property is frozen. Please note that this does not affect the tax rate.",
        "Contact the Assessor’s Office to initiate this exemption, or file online through the Lake County e-file system and search for the senior freeze exemption form. This exemption must be renewed annually.",
      ],
    },
    {
      id: "senior-deferral",
      heading: "Senior Citizens Real Estate Tax Deferral Program",
      body: [
        "The Senior Citizens Real Estate Deferral Act, 320 ILCS 30/1 and following, allows qualified senior citizens to defer all or part of the property taxes and special assessments on their principal residence. The principal residence is the homestead portion of the property and is the only portion for which you can apply.",
        "The property taxes and special assessments do not become due until after the death of the property owner, or when the real estate is sold or no longer qualifies. A lien is placed on the property and interest is assessed at a 6% simple interest rate per year.",
        "The filing deadline for the program is March 1 of the tax year. Applications are available from the Lake County Treasurer at 847-377-2323.",
      ],
      bullets: [
        "Be 65 years of age or older by June 1 of the tax year",
        "Have a total household income of no more than $65,000",
        "Have lived in the property or other qualifying property for at least the last three years",
        "Own the property, share joint ownership with your spouse, or you and your spouse must be the sole beneficiaries of an Illinois land trust",
        "Have adequate insurance against fire or casualty loss",
        "Have no unpaid property taxes or special assessments on the property",
      ],
    },
  ],

  otherExemptionsHeading: "Other property tax exemptions",
  otherExemptionsSections: [
    {
      id: "general-homestead",
      heading: "General Homestead Exemption",
      body: [
        "If your property is your primary residence and you lived on the property on or before January 1 of the tax year, you are entitled to an $8,000 reduction of your assessed valuation, which is a $24,000 fair market value reduction. If you are eligible and it is not reflected on your tax bill, please contact the Assessor’s Office.",
      ],
    },
    {
      id: "homestead-improvement",
      heading: "Homestead Improvement Exemption",
      body: [
        "If an improvement or addition is made to the home, the assessment increase due to the alteration is kept off the tax rolls for four years. A maximum of $25,000 of assessed value, which is $75,000 of market value, can be kept off the tax rolls for that period.",
      ],
    },
    {
      id: "veterans",
      heading: "Returning veterans, disabled and veterans exemptions",
      body: ["For details, consult the Chief County Assessment Office."],
    },
    {
      id: "new-owner",
      heading: "New property owner",
      body: [
        "If you purchased your home within the past year, call us to discuss exemptions you may be eligible for, or if the Township’s value is higher than your purchase price.",
      ],
    },
    {
      id: "commercial-vacancy",
      heading: "Commercial property vacancies",
      body: [
        "If you have a vacant commercial property, a vacancy reduction is not automatically granted. Supporting data is required for a vacancy reduction to be considered. Call us, or download the Township’s vacancy guidelines and vacancy affidavit.",
      ],
    },
  ],

  documentsHeading: "Assessor documents",
  appealsHeading: "Appealing your assessment",
  appealsIntro:
    "Our staff is available to help residents understand their assessment, answer questions on exemptions, and provide the resources needed to evaluate an assessment and decide whether to file an appeal. There may be circumstances where the property record is not accurate. Most questions can be addressed over the telephone.",
  appealsSections: [
    {
      id: "what-is-assessment",
      heading: "What is an assessment",
      body: [
        "An assessment involves identifying the real property within a jurisdiction, listing it, appraising it and placing a value for it on the tax rolls. This value is the basis for determining what portion of the total tax burden each property owner will bear.",
        "In Illinois, the statutory assessment level is one-third, or 33.33%, of the market value of a property, unless set otherwise by law. See Property Tax Code, Section 9-145. Reassessments are mandated by statute every four years, known as the general assessment year. The Property Tax Code also allows assessors to reassess any and all properties each year where necessary.",
      ],
    },
    {
      id: "appeals-process",
      heading: "The appeals process",
      body: [
        "When going through the appeal process, the property owner is appealing the assessed value of the property, not the tax bill. An assessment appeal is not a complaint about higher taxes. It is an attempt to prove the property value is either incorrect or unfair relative to similar property.",
        "Illinois statutes provide an administrative review process. The review begins with the Township Assessor and, if necessary, further appeals may be filed in sequence with the Lake County Board of Review, the Illinois Property Tax Appeal Board, and finally the Circuit Court.",
        "Timing is critical. There are specific periods within which appeals must be filed, and failure to file a timely appeal will leave a taxpayer with little chance of relief until the following year. Within the first week of receiving your assessment notice, we encourage you to contact our office.",
      ],
    },
    {
      id: "grounds",
      heading: "Grounds for an appeal",
      bullets: [
        "Factual errors such as square footage, number of fireplaces or bathrooms. These are easily corrected by our office and in many cases no further appeal is necessary.",
        "Recent sales in your assessment neighborhood that indicate your parcel is assessed higher than comparable properties that have sold.",
        "Your property being over-assessed compared to other similar properties in your assessment neighborhood.",
        "A formal appraisal from a qualified appraiser.",
        "A recent purchase price lower than the Assessor’s value.",
      ],
    },
    {
      id: "board-of-review",
      heading: "Lake County Board of Review",
      body: [
        "A formal appeal of the assessed valuation may be filed with the Lake County Board of Review on or before 30 days after publication of the township assessment roll in a local newspaper of general circulation. The Board will schedule your appeal for a hearing in Waukegan, in person or by video or phone.",
        "Our office will review your evidence and submit additional information when necessary, and we may be able to make a recommendation to the Board on your behalf before your hearing. All complaints must be on the prescribed forms and conform to the established rules of the Board. Late filings are not accepted.",
      ],
    },
    {
      id: "complaint-types",
      heading: "Types of complaints",
      body: [
        "Uniformity or equity complaints are filed when comparable properties are assessed less than the property under appeal. Comparable houses display similar style, square footage, exterior materials, amenities, neighborhood location and condition. Land comparables should be similar in location, size, zoning and external influences.",
        "Market value complaints are filed when the equalized assessed value, converted to market value, exceeds what the property might reasonably sell for on the open market. The best evidence is a recent arm’s length sale, or a professional appraisal, with the appraiser present at the hearing to explain methodology and conclusions.",
        "Contention of law complaints focus on a violation of a specific requirement of the Property Tax Code. The area of the Code should be cited along with an explanation of how the statutes were not followed.",
      ],
    },
    {
      id: "ptab",
      heading: "Property Tax Appeal Board",
      body: [
        "A property owner dissatisfied with the results of a Board of Review challenge has 30 days from the date of the decision to file an appeal with the Illinois Property Tax Appeal Board. The taxpayer is not appealing the property tax, but the equalized assessed valuation placed on the property by the Board of Review.",
        "The Property Tax Appeal Board is a quasi-judicial state agency of five members appointed by the Governor with the advice and consent of the Senate. Hearings are considered de novo, meaning they are viewed as if the Board of Review had never heard or decided the case. Decisions can be moved into the courts under the Administrative Review Law.",
        "Property tax is governed by the Property Tax Code, 35 ILCS 200/1-2 through 32-20.",
      ],
    },
  ],
};

export const transportation: Dictionary["transportation"] = {
  title: "Door-to-Door Transportation",
  description:
    "Moraine Township offers affordable door-to-door paratransit transportation for seniors and residents with disabilities, weekdays by appointment.",
  h1: "Door-to-door transportation",
  intro: "For seniors and residents with disabilities.",

  body: [
    "Moraine Township’s affordable and reliable paratransit service ensures that Township residents with disabilities, and seniors who no longer drive, have access to medical care and other quality-of-life transportation.",
    "While medical trips take priority, residents are also welcome to schedule rides for errands, volunteering and other quality-of-life trips.",
  ],

  detailsHeading: "How the service works",
  details: [
    {
      label: "When rides are scheduled",
      value: "Weekdays, 8:30 a.m. to 4:00 p.m.",
    },
    {
      label: "How far we travel",
      value:
        "Up to 15 miles from Township borders, including Evanston, the VA and Libertyville",
    },
    { label: "Standard fare", value: "$4 each way" },
    { label: "Income-qualified fare", value: "$2 each way" },
    {
      label: "Wheelchair riders",
      value:
        "A caregiver is required to accompany wheelchair riders, and caregivers ride free",
    },
  ],

  scheduleHeading: "Schedule a ride",
  scheduleBody:
    "Call the transportation line to schedule a ride. Please call ahead so we can fit your trip into the day’s route.",
  imageAlt:
    "A man steadying an older woman with a walker as she boards the silver Moraine Township door-to-door van, which is lettered Moraine Door-to-Door with the phone number 847-432-3000.",
};

export const boardMeetings: Omit<
  Dictionary["boardMeetings"],
  "minutesCards"
> = {
  title: "Board & Meetings",
  description:
    "Agendas, the annual schedule of regular meetings, and approved minutes of the Moraine Township Board of Trustees, posted as required by the Illinois Open Meetings Act.",
  h1: "Board of Trustees: meetings and minutes",
  intro:
    "Moraine Township posts its meeting schedule, agendas and approved minutes here, as required by the Illinois Open Meetings Act. Board meetings are open to the public and residents are welcome to attend.",

  scheduleHeading: "Schedule of regular meetings",
  scheduleIntro:
    "The annual schedule of regular meetings of the Board of Trustees. Meetings are held at the Township office at 800 Central Avenue, Highland Park, unless a notice states otherwise.",
  adoptedScheduleHeading: "Adopted schedule of regular meetings",

  agendaHeading: "Agenda for the next meeting",
  agendaIntro:
    "The agenda for each regular meeting is posted at least 48 hours before the meeting and remains available for the entire 48-hour period, as required by 5 ILCS 120/2.02.",
  agendaEmpty:
    "No agenda is posted at this time. The agenda for the next regular meeting will be posted at least 48 hours before the meeting.",

  postedAgendasHeading: "Posted agendas",
  decennialHeading: "Decennial Committee report",
  minutesHeading: "Minutes",
  minutesIntro:
    "Approved minutes of regular meetings are posted within 10 days of approval and remain posted for at least 60 days, as required by 5 ILCS 120/2.06. Minutes are archived by year, and closed session minutes are posted once released.",

  legalNoteHeading: "Open Meetings Act",
  legalNoteBody:
    "Moraine Township complies with the Illinois Open Meetings Act, 5 ILCS 120. If you need an accommodation to attend or participate in a public meeting, please contact the Township office in advance and we will make arrangements.",

  annualTownMeetingHeading: "Annual Town Meeting",
  annualTownMeetingBody:
    "The Clerk convenes the Annual Town Meeting each year. Minutes of Annual Town Meetings and Supervisor’s reports are archived by year.",
};

export const cemeteries: Dictionary["cemeteries"] = {
  title: "Cemeteries",
  description:
    "Moraine Township manages two historic cemeteries in Highland Park: Mooney Cemetery on Ridge Road and Daggitt Cemetery at Lake Cook Road and St. Johns Avenue.",
  h1: "Moraine Township cemeteries",
  intro:
    "Moraine Township manages two cemeteries in Highland Park. We invite visitors to explore and enjoy both.",

  introBody: [
    "Both cemeteries became public, Township-managed properties only well into the second half of the twentieth century. Each was originally a private, family-owned burial ground. By the 1980s, townships in Illinois were expected to take over abandoned cemeteries.",
    "Illinois law requires townships to operate abandoned cemeteries within their borders, which is why these two are in our care.",
  ],

  mooneyHeading: "Mooney Cemetery",
  mooneyLocation: "Ridge Road, north of Deerfield Road, Highland Park",
  mooneyBody: [
    "Mooney Cemetery began with Irish Catholic pioneer settlers, including James Mooney, who helped build a log church along what is now Green Bay Road in about 1846. After the congregation moved twice, the abandoned churchyard was sold for development in 1899, and burials were relocated to a section of John Mooney’s land on Ridge Road. In 1960 an elderly Cecilia Mooney deeded the cemetery to the care of Deerfield Township, now Moraine Township.",
    "Mooney has two rain gardens planted with native species, part of a 2013 project to mitigate chronic flooding, along with permeable pavers on the driveway. More than 70 volunteers installed 750 plants across the two rain gardens. The project won the Stormwater Management Commission BMP Project of the Year Award in 2014. In 2016 the Township implemented the Cemetery Information Management System to hold cemetery maps and records in one place.",
    "Mooney remains open, and burials take place here from time to time.",
  ],
  mooneyImageAlt:
    "A wooden sign reading Mooney Cemetery, Moraine Township, standing behind a bed of flowering native plants and tall grasses, with trees beyond.",
  mooneyCta: "Read the full history of Mooney Cemetery",

  daggittHeading: "Daggitt Cemetery",
  daggittLocation:
    "Corner of Lake Cook Road and St. Johns Avenue, near the Braeside Metra station",
  daggittBody: [
    "Daggitt is the pioneer cemetery, with gravestones dating from 1845 that tell the story of the first settlers in the Highland Park and Glencoe area. Where Mooney’s story is about Irish Catholics, Daggitt’s is about pioneering Protestants, Methodist English and Lutheran German settlers. Robert Daggitt, who arrived from England in the late 1830s, buried three of his own nine children here and later allowed neighbors to use the half-acre as well.",
    "By the 1970s the cemetery was abandoned and in disrepair. The City and Park District of Highland Park, local historians, and the Glencoe and Highland Park Historical Societies worked with the Township to rededicate it in 1996. Following decades of neglect and vandalism, a three-year project to clean and stabilize the markers and add new burial information was completed in 2022, followed by a pollinator planting project. The City of Highland Park granted the Township its Historic Preservation Award in 2024.",
    "Daggitt is closed to new burials and is maintained as a historic site.",
  ],
  daggittImageAlt:
    "A black and gold sign reading Daggitt Cemetery, Moraine Township, mounted on a wrought iron fence, with weathered upright gravestones and mature trees on the lawn behind it.",
  daggittCta: "Read the full history of Daggitt Cemetery",

  restorationHeading: "Restoring the stones",
  restorationNote:
    "Between 2020 and 2022 the Township cleaned and repaired the historic markers at Daggitt. Gravestones that were tilted, broken and filthy are now clean, upright and standing in rows, and inscriptions that had been illegible for decades can be read again. The marker for Margaretha Rudolph, found broken into four pieces, is one example of the work.",
  recordsHeading: "Cemetery records and archives",
  recordsNote:
    "Deeds, plats, surveys and historical research for both cemeteries. If you hold a family deed for Mooney, the Township would like to hear from you.",
  contactHeading: "Share what you know",
  contactBody:
    "Record-keeping for both cemeteries is incomplete, and we would love to hear from anyone with stories or family deeds to add. If you have personal information related to either cemetery, please contact the Supervisor’s office.",

  historyBackLink: "Back to Cemeteries",
};
