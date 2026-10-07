import type { Dictionary, FoiaBodyKey } from "../types";

/**
 * The parts of /foia that 5 ILCS 140/4(a) requires beyond the request
 * procedure: a block diagram of the Township's functional subdivisions, and the
 * membership of every body that governs or advises it. Rosters live in
 * lib/bodies.ts. The IMRF link is required by 40 ILCS 5/7-135.5(b).
 */
export const foiaBody: Pick<Dictionary["foia"], FoiaBodyKey> = {
  orgHeading: "How the Township Is Organized",
  orgIntro:
    "This outline is the block diagram of the Township's functional subdivisions. Each indented item is part of the item above it.",
  orgChart: [
    {
      label: "Moraine Township",
      children: [
        {
          label: "Township Board",
          detail:
            "The Board is made up of the Supervisor and four Trustees, all elected by Township voters. It adopts the annual budget and the tax levy.",
        },
        {
          label: "Office of the Supervisor",
          children: [
            { label: "General Assistance and Emergency Assistance" },
            { label: "Food Pantry" },
            {
              label: "Resident Services",
              detail:
                "This includes passports, notary service, and health insurance enrollment.",
            },
            { label: "Door-to-Door Transportation" },
          ],
        },
        {
          label: "Office of the Clerk",
          detail:
            "The Clerk's office keeps the Township's records, handles meetings and public notices, and registers voters.",
        },
        {
          label: "Office of the Assessor",
          detail:
            "The Assessor's office assesses property and handles exemptions.",
        },
        {
          label: "Cemetery Operations",
          children: [
            { label: "Mooney Cemetery" },
            { label: "Daggitt Cemetery" },
          ],
        },
        {
          label: "Boards, Commissions, and Committees",
          children: [
            { label: "Community Mental Health Board" },
            { label: "Ethics Commission" },
            { label: "Citizen Grant Advisory Committee" },
            { label: "Latino Advisory Committee" },
          ],
        },
      ],
    },
  ],

  membershipHeading: "Boards, Commissions, and Committees",
  membershipIntro:
    "Illinois law asks the Township to list the members of each body that governs or advises it. If a list here is out of date, please call the Township office.",
  bodyNames: {
    board: "Township Board",
    mentalHealth: "Community Mental Health Board",
    ethics: "Ethics Commission",
    grants: "Citizen Grant Advisory Committee",
    latino: "Latino Advisory Committee",
  },
  bodyNotes: {
    board:
      "Township voters elected these members to terms that run from 2025 to 2029.",
    mentalHealth:
      "This list is from the Township's Annual FOIA Posting of January 8, 2026.",
    ethics:
      "Members are appointed, and each entry shows the year that member's term ends.",
    grants:
      "This list is from the Township's Annual FOIA Posting of January 8, 2026. The committee reviews grant applications and recommends awards to the Township Board.",
    latino:
      "This list is from the Township's Annual FOIA Posting of January 8, 2026, which gives June 30, 2026, as the end of each member's term. Call the Township office for the current list.",
  },
  memberRoles: {
    supervisor: "Supervisor",
    trustee: "Trustee",
    trusteeWoman: "Trustee",
    clerkNonVoting: "Clerk, who does not vote",
    chair: "Chair",
    secretary: "Secretary",
    trusteeLiaison: "liaison from the Township Board",
    administrator: "Administrator",
    termEnds: "term ends in {year}",
    cityCouncilLiaison: "liaison from the Highland Park City Council",
    staffLiaison: "liaison from the Township staff",
    district113Liaison: "liaison from the District 113 Board",
  },

  imrfHeading: "Illinois Municipal Retirement Fund",
  imrfBody:
    "Moraine Township participates in the Illinois Municipal Retirement Fund (IMRF). As Illinois law requires (40 ILCS 5/7-135.5), this link goes to the information IMRF publishes about each participating employer: the date it began participating, its past and projected contributions, and its participation resolutions.",
  imrfLink: "IMRF employer cost and participation information",
};
