import type { Dictionary, FoiaBodyKey } from "../types";

export const programs: Omit<
  Dictionary["programs"],
  "grantees" | "cmhbOpening"
> = {
  title: "Programs",
  description:
    "The Moraine Township Grant Program funds local nonprofit agencies serving Township residents. The Latino Advisory Committee connects the Township with our Latino community.",
  h1: "Township Programs",
  intro:
    "Beyond direct resident services, the Township funds local nonprofit agencies and convenes advisory committees that keep us connected to the community.",

  grantsHeading: "Grant Program",
  grantsIntro: [
    "Moraine Township administers funds to provide responsive, efficient, and compassionate services and support for residents in need. Annual grants are made to a variety of nonprofit agencies providing non-sectarian programs or services for the benefit of people residing or working in Moraine Township.",
    "Programs funded must complement the mission of Moraine Township without duplicating services the Township already provides. Special priority goes to agencies helping the Township provide a safety net for its most vulnerable and economically disadvantaged residents, including services for the elderly, youth, and residents with disabilities. Agencies chiefly supported by taxpayer dollars, or otherwise affiliated with a taxing body, are not eligible.",
    "In 2026 the Township awarded $275,000 in grants. Funding support cannot be presumed from year to year.",
  ],

  grantsCommitteeHeading: "Citizen Grant Advisory Committee",
  grantsCommitteeBody:
    "A volunteer Citizen Grant Advisory Committee, appointed by the Township Supervisor, reviews applications and makes funding recommendations to the Board of Trustees, which votes on the awards in April or May. Committee members bring a wide variety of experience and community involvement and represent a cross-section of the demographics of the Township. Three elected members of the Board join them as liaisons.",

  granteesHeading: "Recent Grantees",
  granteesNote:
    "Agencies that received Moraine Township grant funding in 2025. The 2026 grantee list will be posted soon.",

  latinoHeading: "Latino Advisory Committee",
  latinoBody: [
    "Members of Moraine Township’s Latino Advisory Committee serve as ombudsmen to our local Latino community. Committee members collaborate to inform residents of services available from Moraine Township, and to inform Township Trustees of gaps in human services that the Township may be able to help address.",
    "The Board of Trustees wishes to foster grassroots participation in government by establishing a welcoming atmosphere for the Latino community.",
  ],
  latinoCalendarHeading: "Meetings",
  latinoCalendarBody:
    "The committee meets periodically, usually on weekday evenings. To receive meeting dates and agendas, email the Township office and ask to be added to the distribution list. If you would like to find out more about joining the committee, complete a volunteer application and someone will follow up with you.",

  mentalHealthHeading: "Community Mental Health Board",
  mentalHealthBody:
    "The Moraine Township Community Mental Health Board funds mental health, developmental disability, and substance use services for Township residents. The Board maintains its own website with its funding priorities, meeting schedule, and application information.",
  mentalHealthCta: "Visit the Community Mental Health Board website",
};

export const getInvolved: Dictionary["getInvolved"] = {
  title: "Get Involved",
  description:
    "Volunteer at the Moraine Township Food Pantry, help with food drives, prepare tax returns, or join a citizen advisory committee.",
  h1: "Want to Help?",
  intro:
    "Moraine Township is grateful for the volunteers who make it possible to provide expanded services to residents.",

  topAskHeading: "The One Thing We Need Most",
  topAskBody:
    "We most need regular weekly volunteers at the Food Pantry. Sorting, shelving, cleaning up, and assisting shoppers is the work that keeps the pantry open three days a week. Minimum volunteer age is 16. If you can commit to one shift a week, that is the single most useful thing you can give us.",
  topAskCta: "Complete a volunteer application",

  waysHeading: "Other Ways to Help",
  ways: [
    {
      title: "Food Pantry Shifts and Food Pickups",
      body: "Sort, shelve, clean up, assist shoppers, and pick up food contributions at area stores. We need substitutes and occasional volunteers for special events as well as regular weekly help.",
    },
    {
      title: "Sunset Foods Fundraiser",
      body: "Volunteer for a two-hour shift on the first weekend in December at Sunset Foods to raise funds for the Food Pantry. Many volunteers are needed to cover all shifts across the three-day event.",
    },
    {
      title: "Letter Carrier Food Drive",
      body: "On the second Saturday in May, many volunteers are needed to help unload and sort donated food.",
    },
    {
      title: "Host a Food Drive",
      body: "Host a food drive any time of year, at your convenience. Contact the volunteer coordinator and we will help you set it up.",
    },
    {
      title: "Holiday Gift Drive",
      body: "Residents sponsor community children and seniors to provide holiday gifts and cheer for Highland Park and Highwood families and seniors.",
    },
    {
      title: "Free Income Tax Return Preparation",
      body: "Train with the Internal Revenue Service online during December and January, then prepare free tax returns for low-income residents from February through April.",
    },
    {
      title: "Health Insurance Enrollment Assistance",
      body: "Train with the Centers for Medicare and Medicaid Services online during September and October, then help residents without health insurance sign up on the state marketplace, Get Covered Illinois, during open enrollment.",
    },
    {
      title: "Citizen Advisory Committees",
      body: "Volunteers participate on the Latino Advisory Committee, the Citizen Grant Advisory Committee, and other committees as needed.",
    },
    {
      title: "The Food Pantry Garden",
      body: "We grow produce for the Food Pantry, and we partner with a local private farm that donates a portion of its crops to the pantry. Gardening volunteers are welcome through the growing season.",
    },
  ],

  photosHeading: "Our Volunteers",
  contactHeading: "Who to Contact",
  contactBody:
    "Sara Hoffman is our Volunteer Coordinator. Call the Township office or email her directly and she will find the right fit for you.",
  applicationCta: "Open the volunteer application",
};

export const donate: Dictionary["donate"] = {
  title: "Donate",
  description:
    "Support the Moraine Township Charitable Fund, an IRS 501(c)(3) organization supporting the Food Pantry and emergency assistance for residents in need.",
  h1: "Donate and Help",
  intro: "Every dollar goes back to residents of this Township.",

  lead: "Moraine Township Charitable Fund, Inc. is an IRS 501(c)(3) charitable organization whose mission is to administer funds to provide responsive, efficient, and compassionate services and support for residents in need. The Fund supports the Moraine Township Food Pantry, and also provides emergency rent, utility, medical, job, and other assistance to struggling residents.",

  bandBody:
    "Every dollar goes back to residents of this Township, through the Food Pantry and through emergency rent, utility, and medical assistance. Give money, or send food straight from our wish list.",
  bandOtherWays:
    "You can also drop off food at the Township office or mail a check.",
  bandOtherWaysCta: "See all the ways to give",
  optionsHeading: "Ways to Give",

  moneyHeading: "Give Money",
  moneyBody:
    "Donate securely through PayPal. You can give once or set up a recurring gift, and you choose how your donation is used.",
  moneyCta: "Donate through PayPal",
  designationsIntro:
    "Use the drop-down menu to select how your donation is used:",
  designations: [
    "Food Pantry",
    "Emergency Assistance",
    "Holiday Gift Drive",
    "As needed",
  ],

  wishListHeading: "Send Food and Household Goods",
  wishListBody:
    "Order directly from our Amazon wish list and items ship straight to the pantry. The list is kept current with exactly what we need right now, so nothing goes to waste.",
  wishListCta: "Open the Amazon wish list",

  inKindHeading: "Drop Off Donations in Person",
  inKindBody:
    "Bring unopened, unexpired nonperishable food and household essentials to the Township office, Monday through Friday from 8:30 a.m. to 4:30 p.m.",

  // Payee as given in the round 2 review; flagged for the Township to confirm.
  checkHeading: "Mail a Check",
  checkBody:
    "Make your check payable to Moraine Township Charitable Fund, Inc., and mail it to 800 Central Avenue, Highland Park, IL 60035.",

  fundNote:
    "Moraine Township Charitable Fund, Inc. is a separate 501(c)(3) organization from Moraine Township. Donations are made to the Fund.",
};

export const thankYou: Dictionary["thankYou"] = {
  title: "Thank You for Donating",
  description: "Thank you for supporting the Moraine Township Charitable Fund.",
  h1: "Thank You",

  headline: "Thank You for Your Donation",
  body: "Your gift goes directly to residents of Moraine Township, through the Food Pantry and through emergency rent, utility, medical, and job assistance. We are grateful.",

  taxHeading: "For Your Tax Records",
  taxBody:
    "Moraine Township Charitable Fund, Inc. is an IRS 501(c)(3) charitable organization. Your donation may be tax deductible to the extent allowed by law. Please keep this information with your records, and consult your tax advisor with any questions.",
  einLabel: "IRS EIN",
  addressLabel: "Mailing Address",
  visitBody:
    "You are welcome to stop by the Township office any weekday between 8:30 a.m. and 4:30 p.m. We would be glad to show you the pantry your gift supports.",

  nextHeading: "One More Way to Help",
  nextVolunteer: "Volunteer at the Food Pantry",
  nextWishList: "Shop the Amazon wish list",
  noThanks: "No thanks, take me back to the website",
};

export const foia: Omit<
  Dictionary["foia"],
  "employeesLabel" | "employeesValue" | "noticeGroups" | FoiaBodyKey
> = {
  title: "FOIA and Transparency",
  description:
    "Moraine Township Freedom of Information Act procedures, FOIA officer, fees, and public records including budgets, audits, levies, and compensation disclosures.",
  h1: "FOIA and Transparency",
  intro:
    "Moraine Township publishes the information required of Illinois public bodies, and responds to requests for public records under the Illinois Freedom of Information Act.",

  statementHeading: "Township FOIA Statement",
  statementBody: [
    "Moraine Township complies with the requirements of the Illinois Freedom of Information Act, 5 ILCS 140. The Township will furnish public records as defined in the Act to those parties requesting them, by opening those documents for inspection or by providing copies.",
    "Requests for information or public records can be made in writing and directed to the FOIA Officer by personal delivery, mail, fax, or email. The Township office also has a standard form that may be filled out. All requests must be signed by the requester. Oral requests may be honored on a case-by-case basis.",
  ],

  officerHeading: "Freedom of Information Officer",
  officerBody:
    "The Township has designated Supervisor Nancy Chausow Shafer as its Freedom of Information Officer. Written requests may be sent to her at the Township office.",

  feesHeading: "Fees",
  feesBody: [
    "Per the requirements of the Act, Moraine Township provides the first 50 pages of documents free of charge.",
    "Additional copies are $0.15 per page for black and white letter or legal size documents. The cost for certifying a record is $1.00.",
    "Any document maintained by the Township in electronic format will, where possible, be furnished to the requester in the same format.",
  ],

  publicBodyHeading: "About This Public Body",
  publicBodyIntro:
    "The following information is published under Section 4 of the Illinois Freedom of Information Act, 5 ILCS 140/4.",
  publicBodyRows: [
    {
      label: "Purpose",
      value:
        "Moraine Township administers funds to provide responsive, efficient, and compassionate services and support for residents in need. Its core priorities are accurate assessments of Township properties, the administration of General and Emergency Assistance for Township residents, and a safety net for vulnerable residents.",
    },
    {
      label: "Governing Body",
      value:
        "The governing body is the Township Board, made up of the Supervisor and four elected Trustees. The Clerk serves as clerk of the Board and does not vote. The members are listed below.",
    },
    {
      label: "Other Boards and Committees",
      value:
        "The Township's other boards and committees are the Community Mental Health Board, the Ethics Commission, the Citizen Grant Advisory Committee, the Latino Advisory Committee, and any ad hoc committees that are appointed. The members are listed below.",
    },
    {
      label: "Offices",
      value:
        "The Township has one office, at 800 Central Avenue, Highland Park, Illinois 60035, which it shares with the Food Pantry. The Township also maintains Daggitt Cemetery at 425 Lake Cook Road and Mooney Cemetery at 1079 Ridge Road, both in Highland Park.",
    },
    {
      label: "Operating Budget",
      value:
        "For the fiscal year from April 1, 2026, to March 31, 2027, the Township Board adopted total appropriations of $3,666,310 on April 22, 2026, in Ordinance No. 04222026. Of that, $3,041,310 is for operating expenses, and $625,000 is budgeted from reserves for contingencies and one-time expenses. By fund, the appropriations are $1,452,325 for the Township Corporate Fund, $679,471 for the General Assistance Fund, $85,000 for the Capital Maintenance Fund, and $1,449,514 for the Community Mental Health Fund. The full ordinance is under Budget and Appropriation below.",
    },
  ],

  financeHeading: "Financial and Legal Records",
  financeIntro:
    "The Township posts its budgets, audits, levies, and public notices. Documents of record are published as signed PDFs. If you need any of this information in another format, contact the Township office and we will provide it.",
  financeGroups: [
    {
      id: "budget",
      heading: "Budget and Appropriation",
      note: "Annual township budget and appropriation ordinances, by fiscal year.",
    },
    {
      id: "audit",
      heading: "Audit",
      note: "Annual certified financial audits prepared by the Township’s auditor, by fiscal year.",
    },
    {
      id: "levy",
      heading: "Tax Levy",
      note: "Annual tax levy ordinances, by tax year.",
    },
    {
      id: "notices",
      heading: "Legal and Public Notices",
      note: "Public notices, resolutions setting elected official salaries, comptroller’s reports, and treasurer’s reports.",
    },
  ],

  newsletterHeading: "Newsletter Archive",
  newsletterNote:
    "The Township newsletter, Talk of the Township, is no longer published. Back issues are kept here for reference.",
  compensationHeading: "Compensation Disclosure",
  compensationBody:
    "Moraine Township publishes the total compensation package for employees as required by 5 ILCS 120/7.3, and posts resolutions setting the salaries of elected officials. These documents are available under legal and public notices.",
};

export const contact: Dictionary["contact"] = {
  title: "Contact",
  description:
    "Contact Moraine Township at 800 Central Avenue, Highland Park, Illinois. Call 847-432-3240 or email info@morainetownship.org.",
  h1: "Contact Moraine Township",
  intro:
    "Call us, email us, or stop by the office. If you are not sure who to ask for, call the general line and we will point you to the right person.",

  officeHeading: "Township Office",
  departmentsHeading: "Departments and Direct Lines",
  departments: [
    { label: "General Office", detail: "Questions about any Township service" },
    { label: "Transportation", detail: "Schedule a door-to-door ride" },
    {
      label: "Assessor",
      detail: "Property assessment, exemptions, and appeals",
    },
    {
      label: "Food Pantry",
      detail: "Pantry eligibility, hours, and applications",
    },
    { label: "Free Tax Preparation", detail: "VITA appointments, seasonal" },
  ],

  formHeading: "Send Us a Message",
  formIntro:
    "Use this form to reach the Township office. We answer messages during business hours. If your situation is urgent, please call instead.",
  formName: "Your name",
  formEmail: "Your email",
  formPhone: "Your phone number",
  formMessage: "How can we help?",
  formSubmit: "Send message",
  formSending: "Sending",
  formSuccess:
    "Thank you. Your message has been sent and a staff member will follow up.",
  formError:
    "We could not send your message. Please call the Township office at 847-432-3240 and we will help you directly.",

  directoryHeading: "Staff Directory",
};

export const accessibility: Dictionary["accessibility"] = {
  title: "Accessibility",
  description:
    "Moraine Township is committed to making this website accessible to everyone, conforming to WCAG 2.1 Level AA under Title II of the Americans with Disabilities Act.",
  h1: "Accessibility",
  intro:
    "Moraine Township serves every resident, and that includes how we build this website.",

  commitmentHeading: "Our Commitment",
  commitmentBody: [
    "Moraine Township is committed to ensuring that this website is accessible to people with disabilities. We want every resident to be able to find services, read our public records, and contact us, regardless of how they use the web.",
    "If you encounter a page, document, or feature on this website that you cannot use, please tell us. We will fix it, and in the meantime we will give you the information you need in a format that works for you.",
  ],

  standardHeading: "The Standard We Build To",
  standardBody: [
    "This website is built to conform to the Web Content Accessibility Guidelines, WCAG version 2.1, Level AA. That is the technical standard adopted by the United States Department of Justice under Title II of the Americans with Disabilities Act for the web content of state and local government entities, at 28 CFR Part 35, Subpart H.",
    "Because Moraine Township has a total population under 50,000, the compliance date that applies to the Township is April 26, 2028, following the Department of Justice rule that extended the original dates in April 2026. This website is built to the standard now rather than waiting for that date.",
  ],

  featuresHeading: "What We Have Built In",
  features: [
    "Every page can be operated with a keyboard alone, and the focused element is always visible.",
    "A skip link lets keyboard and screen reader users jump straight to the main content.",
    "Images that carry meaning have text alternatives that describe the information, not the file name.",
    "Every page can be read aloud in English, Spanish, or Russian.",
    "Text and interface colors meet or exceed the contrast ratios required at Level AA.",
    "Headings, landmarks, and form labels are marked up so screen readers can navigate the page structure.",
    "Motion and animation are reduced automatically if your device is set to prefer reduced motion.",
    "The whole website is available in English, Spanish, and Russian.",
  ],

  feedbackHeading: "Tell Us About a Problem",
  feedbackBody:
    "If any part of this website is a barrier for you, contact the Township office by phone or email and describe what you ran into. Please include the page address if you have it. We will respond and we will fix the problem.",

  documentsHeading: "Documents and PDFs",
  documentsBody:
    "Some records, such as signed minutes, budgets, audits, and levies, are published as PDF files because the signed document is the official record. Wherever a PDF carries information you need, we also provide that information on the page itself. If you need any Township document in another format, including large print or plain text, contact the Township office and we will provide it at no charge.",
};
