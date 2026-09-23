import type { Dictionary } from "../types";

export const foodPantry: Omit<Dictionary["foodPantry"], "imageAlt"> = {
  title: "Food Pantry",
  description:
    "The Moraine Township Food Pantry provides free groceries to income-qualified residents three days a week. Applications are available in English, Spanish, and Russian.",
  h1: "Moraine Township Food Pantry",
  // Supervisor's wording from the round 2 review, placed at the top as asked.
  intro:
    "The Moraine Township Food Pantry runs almost entirely on donations and volunteers.",
  // Rachel Jacoby's paragraph. Her draft also gave a monthly count of the
  // residents served, left out until the Township supplies the number.
  lead: [
    "The goal of the Moraine Township Food Pantry is to ensure none of our neighbors go hungry. Thank you for helping us fight food insecurity in our community!",
  ],

  wishListHeading: "Shop Our Amazon Wish List",
  wishListBody:
    "The fastest way to help is to order directly from our Amazon wish list. Items ship straight to the pantry, the list is kept current with what we actually need, and nothing goes to waste.",
  wishListCta: "Open the Amazon wish list",

  eligibilityHeading: "Who Is Eligible",
  eligibilityBody:
    "All income-qualified Moraine Township residents are eligible to visit and shop at the Food Pantry.",

  applicationsHeading: "Applications",
  applicationsBody:
    "Download and complete a Food Pantry application before your first visit. Applications are available in English, Spanish, and Russian. If you need help completing the form, call the Township office and we will assist you.",

  hoursHeading: "Food Pantry Hours",
  hoursRows: [
    { day: "Monday", time: "2:00 p.m. to 4:00 p.m." },
    { day: "Tuesday", time: "10:00 a.m. to 12:00 p.m." },
    { day: "Wednesday", time: "1:30 p.m. to 3:30 p.m." },
  ],

  receiveHeading: "What You Receive",
  receiveBody:
    "Pantry visitors receive produce, dairy, meat, bread, and shelf-stable food. All shoppers also receive household goods and personal care products once a month.",

  shoppingListHeading: "Most Needed Items",
  shoppingListIntro:
    "Want to shop for the Food Pantry while you shop for your family? These are the items we need most right now.",
  shoppingListUpdated: "Updated",

  dropOffHeading: "Where to Drop Off Donations",
  dropOffBody:
    "Bring donations of unopened, unexpired nonperishable food and household essentials to the Township office at 800 Central Avenue, Highland Park, Monday through Friday from 8:30 a.m. to 4:30 p.m.",
  cannotAcceptHeading: "We Cannot Accept",
  cannotAccept: ["Expired food", "Opened food", "Opened household items"],

  contactHeading: "Questions",
  contactBody:
    "Questions about the Moraine Township Food Pantry should be directed to Gissele Valle, Pantry and Transportation Coordinator.",

  volunteerCta: "Volunteer at the pantry",
};

export const assessor: Dictionary["assessor"] = {
  title: "Assessor",
  description:
    "The Moraine Township Assessor's Office helps residents with property assessments, assessment appeals, and property tax exemptions.",
  h1: "Moraine Township Assessor",
  intro:
    "We are committed to serving the residents of Moraine Township fairly and equitably. Our staff is available to answer questions and provide assistance with your property assessment, assessment appeals, and property tax exemptions.",

  officeIntro:
    "Welcome to the Moraine Township Assessor’s Office. We will do our best to provide you with pertinent information about your property assessment process and exemptions you may qualify for. Most of our records are considered public information.",

  videoHeading: "How to Appeal Your Assessment Online",
  videoIntro:
    "This tutorial from the Lake County Chief County Assessment Office walks through filing an assessment appeal online, step by step, in the county's e-filing system.",
  videoTitle: "Assessment appeal tutorial for the Lake County e-filing system",
  videoPosterAlt:
    "Opening frame of the tutorial video: a suburban residential street on a sunny day, lined with two-story houses, trees, and trash carts at the curb.",
  videoPlayLabel: "Play the assessment appeal tutorial video",
  videoLinkLabel: "Watch the tutorial on YouTube",

  resourcesHeading: "Lake County Resources",
  resourcesIntro:
    "The Assessor's Office recommends these Lake County resources for exemptions, appeals, and property tax payments.",

  documentsHeading: "Assessor Documents",
};

export const transportation: Dictionary["transportation"] = {
  title: "Door-to-Door Transportation",
  description:
    "Moraine Township offers affordable door-to-door paratransit transportation for residents 65 and older and residents with disabilities, weekdays by appointment.",
  h1: "Door-to-Door Transportation",
  // Eligibility and range as corrected by Lizzy Innes, Nancy Chausow Shafer
  // and Sanela Abazovic in round 2: 65 and older or a disability, and up to
  // 15 miles from the rider's home rather than from the Township border.
  intro: "For residents 65 and older and residents with disabilities.",
  callLead: "To schedule a ride, call",

  body: [
    "Moraine Township’s affordable and reliable paratransit service ensures that Township residents with disabilities, and residents 65 and older who no longer drive, have access to medical care and other quality-of-life transportation.",
    "While medical trips take priority, residents are also welcome to schedule rides for errands, volunteering, and other quality-of-life trips.",
  ],

  detailsHeading: "How the Service Works",
  details: [
    {
      label: "Who Can Ride",
      value:
        "Moraine Township residents 65 and older, and residents with disabilities.",
    },
    {
      label: "When Rides Are Scheduled",
      value: "Weekdays, 8:30 a.m. to 4:00 p.m.",
    },
    {
      label: "How Far We Travel",
      value:
        "Up to 15 miles from your home, including the VA and the medical centers in Evanston and Libertyville.",
    },
    {
      label: "Fares",
      value: "$4 each way. Income-qualified riders pay $2 each way.",
    },
    {
      label: "Wheelchair Riders",
      value:
        "A caregiver is required to accompany wheelchair riders, and caregivers ride free.",
    },
  ],

  scheduleHeading: "Schedule a Ride",
  scheduleBody:
    "Call the transportation line to schedule a ride. Please call ahead so we can fit your trip into the day’s route.",
  imageAlt:
    "A man steadying an older woman with a walker as she boards the silver Moraine Township door-to-door van, which is lettered Moraine Door-to-Door with the phone number 847-432-3000.",
};

export const boardMeetings: Omit<Dictionary["boardMeetings"], "minutesCards"> =
  {
    title: "Board & Meetings",
    description:
      "Agendas, the annual schedule of regular meetings, and approved minutes of the Moraine Township Board of Trustees, posted as required by the Illinois Open Meetings Act.",
    h1: "Board of Trustees: Meetings and Minutes",
    intro:
      "Moraine Township posts its meeting schedule, agendas, and approved minutes here, as required by the Illinois Open Meetings Act. Board meetings are open to the public and residents are welcome to attend.",

    scheduleHeading: "Schedule of Regular Meetings",
    scheduleIntro:
      "The annual schedule of regular meetings of the Board of Trustees. Meetings are held at the Township office at 800 Central Avenue, Highland Park, unless a notice states otherwise.",
    adoptedScheduleHeading: "Adopted Schedule of Regular Meetings",

    agendaHeading: "Meeting Agendas",
    agendaIntro:
      "The agenda for each regular meeting is posted at least 48 hours before the meeting and remains available for the entire 48-hour period, as required by 5 ILCS 120/2.02.",
    agendaEmpty:
      "No agenda is posted at this time. The agenda for the next regular meeting will be posted at least 48 hours before the meeting.",

    minutesHeading: "Minutes",
    minutesIntro:
      "Approved minutes of regular meetings are posted within 10 days of approval and remain posted for at least 60 days, as required by 5 ILCS 120/2.06. Minutes are archived by year, and closed session minutes are posted once released.",

    legalNoteHeading: "Open Meetings Act",
    legalNoteBody:
      "Moraine Township complies with the Illinois Open Meetings Act, 5 ILCS 120. If you need an accommodation to attend or participate in a public meeting, please contact the Township office in advance and we will make arrangements.",
  };

export const cemeteries: Dictionary["cemeteries"] = {
  title: "Cemeteries",
  description:
    "Moraine Township manages two historic cemeteries in Highland Park: Mooney Cemetery on Ridge Road and Daggitt Cemetery at Lake Cook Road and St. Johns Avenue.",
  h1: "Moraine Township Cemeteries",
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
    "Daggitt is the pioneer cemetery, with gravestones dating from 1845 that tell the story of the first settlers in the Highland Park and Glencoe area. Where Mooney’s story is about Irish Catholics, Daggitt’s is about pioneering Protestants: Methodist English and Lutheran German settlers. Robert Daggitt, who arrived from England in the late 1830s, buried three of his own nine children here and later allowed neighbors to use the half-acre as well.",
    "By the 1970s the cemetery was abandoned and in disrepair. The City and Park District of Highland Park, local historians, and the Glencoe and Highland Park Historical Societies worked with the Township to rededicate it in 1996. Following decades of neglect and vandalism, a three-year project to clean and stabilize the markers and add new burial information was completed in 2022, followed by a pollinator planting project. The City of Highland Park granted the Township its Historic Preservation Award in 2024.",
    "Daggitt is closed to new burials and is maintained as a historic site.",
  ],
  daggittImageAlt:
    "A black and gold sign reading Daggitt Cemetery, Moraine Township, mounted on a wrought iron fence, with weathered upright gravestones and mature trees on the lawn behind it.",
  daggittCta: "Read the full history of Daggitt Cemetery",

  restorationHeading: "Restoring the Stones",
  restorationNote:
    "Between 2020 and 2022 the Township cleaned and repaired the historic markers at Daggitt. Gravestones that were tilted, broken, and filthy are now clean, upright, and standing in rows, and inscriptions that had been illegible for decades can be read again. The marker for Margaretha Rudolph, found broken into four pieces, is one example of the work.",
  recordsHeading: "Cemetery Records and Archives",
  recordsNote:
    "Deeds, plats, surveys, and historical research for both cemeteries. If you hold a family deed for Mooney, the Township would like to hear from you.",
  contactHeading: "Share What You Know",
  contactBody:
    "Record-keeping for both cemeteries is incomplete, and we would love to hear from anyone with stories or family deeds to add. If you have personal information related to either cemetery, please contact the Supervisor’s office.",

  historyBackLink: "Back to Cemeteries",
};
