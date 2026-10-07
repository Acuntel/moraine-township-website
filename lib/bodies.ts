import { ELECTED_OFFICIALS, ETHICS_COMMISSION } from "./township";
import type { BodyId, MemberRole } from "@/content/types";

/**
 * Who sits on the Township's boards, commissions and committees.
 *
 * 5 ILCS 140/4(a) requires the website to show the identification AND the
 * membership of every board, commission, committee or council that advises the
 * Township or controls its policies. Naming the bodies alone, which is what the
 * FOIA page did until October 2026, does not satisfy it.
 *
 * Source for every roster except the Board and the Ethics Commission: the
 * Township's own "Annual FOIA Posting 2026, as of January 8, 2026"
 * (lib/documents.json, annual-foia-posting-2025.pdf). The Board comes from
 * ELECTED_OFFICIALS and the Ethics Commission from ETHICS_COMMISSION, so a
 * change there reaches this page too. Names are proper nouns and are the same
 * in every language; only the role labels are translated.
 *
 * Every Latino Advisory Committee term in the posting ends June 30, 2026, and
 * /programs says three Board members are grant committee liaisons where the
 * posting names one. Both are open questions to the Township; the page states
 * the date of its source instead of guessing.
 */
export interface BodyMember {
  name: string;
  role?: MemberRole;
  /** For roles whose label carries a year, such as a term end. */
  year?: number;
}

const official = (id: string) => {
  const person = ELECTED_OFFICIALS.find((p) => p.id === id);
  if (!person) throw new Error(`No elected official with id ${id}`);
  return person.name;
};

export const BODIES: { id: BodyId; members: BodyMember[] }[] = [
  {
    id: "board",
    members: [
      { name: official("supervisor"), role: "supervisor" },
      { name: official("trustee-guerrero"), role: "trusteeWoman" },
      { name: official("trustee-haggarty"), role: "trustee" },
      { name: official("trustee-jacoby"), role: "trusteeWoman" },
      { name: official("trustee-levin"), role: "trusteeWoman" },
      { name: official("clerk"), role: "clerkNonVoting" },
    ],
  },
  {
    id: "mentalHealth",
    members: [
      { name: "David Paushter", role: "chair" },
      { name: "Kari Guhl", role: "secretary" },
      { name: "Nora Barquin" },
      { name: "Zach Duenow" },
      { name: "Desmond Raftery" },
      { name: "Heather Schwartz" },
      { name: "Daniel Yohanna" },
      { name: "Dan Jenks" },
      { name: official("trustee-levin"), role: "trusteeLiaison" },
      { name: "Sanela Abazovic", role: "administrator" },
    ],
  },
  {
    id: "ethics",
    members: ETHICS_COMMISSION.map((m) => ({
      name: m.name,
      role: "termEnds" as const,
      year: m.termExpires,
    })),
  },
  {
    id: "grants",
    members: [
      { name: "John Ropiequet", role: "chair" },
      { name: "Luis Gonzalez" },
      { name: "Lydia Gonzalez" },
      { name: official("trustee-jacoby") },
      { name: "William Laegeler" },
      { name: "Amy Zisook" },
      { name: official("trustee-haggarty"), role: "trusteeLiaison" },
    ],
  },
  {
    id: "latino",
    members: [
      { name: "Esteban Carbajal" },
      { name: "Bertha Chavez" },
      { name: "Luisa Espinosa-Lara" },
      { name: "Viri Gonzalez" },
      { name: "Paulette Margulies" },
      { name: "Cary Rositas Sheffel" },
      { name: "Gabby Stroben" },
      { name: "Andres Tapia", role: "cityCouncilLiaison" },
      { name: "Rosa Machabanski", role: "staffLiaison" },
      { name: "Jaime Barraza", role: "district113Liaison" },
    ],
  },
];
