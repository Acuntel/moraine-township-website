import manifest from "./documents.json";

/**
 * The Township's document archive, re-hosted.
 *
 * All 275 files were served from morainetownship.org/s/* by Squarespace. The
 * moment DNS points at this site those URLs stop resolving, taking the meeting
 * minutes, budgets, audits and levies that Illinois law requires the Township
 * to keep posted with them. They now live in this site's own Blob store, and
 * `lib/documents.json` maps every original URL to its new home.
 *
 * 34 of the originals were already returning 404 on the Township's own site
 * before any of this started. They are recorded in `unavailable` so the gap is
 * visible rather than silently inherited, and are listed for the client in
 * docs/DOCTRINE.md.
 */

export interface TownshipDocument {
  original: string;
  url: string;
  label: string;
  category: string;
  year: number | null;
  bytes: number;
  ext: string;
}

const ALL = manifest.migrated as unknown as TownshipDocument[];

export const UNAVAILABLE = manifest.unavailable as unknown as {
  url: string;
  name: string;
}[];

/** Human-readable size, so nobody opens a 12 MB scan on a phone unaware. */
export function fileSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export function byCategory(...categories: string[]): TownshipDocument[] {
  return ALL.filter((d) => categories.includes(d.category));
}

/** Grouped newest-year-first, which is how an archive is actually read. */
export function groupedByYear(
  ...categories: string[]
): { year: string; docs: TownshipDocument[] }[] {
  const groups = new Map<string, TownshipDocument[]>();
  for (const doc of byCategory(...categories)) {
    const key = doc.year ? String(doc.year) : "Undated";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(doc);
  }
  return [...groups.entries()]
    .sort((a, b) =>
      a[0] === "Undated"
        ? 1
        : b[0] === "Undated"
          ? -1
          : Number(b[0]) - Number(a[0]),
    )
    .map(([year, docs]) => ({
      year,
      docs: docs.sort((a, b) => a.label.localeCompare(b.label)),
    }));
}

/**
 * The Township names its uploads inconsistently: the same document may arrive
 * as Board-Meeting-Schedule one year and Board_Meeting_Schedule the next. Since
 * a lookup that misses returns undefined and the link simply vanishes from the
 * page with nothing thrown, treat the two separators as the same character.
 * That is exactly how the Board meeting schedule went missing once already,
 * while 5 ILCS 120/2.02(a) requires it to stay posted.
 */
function normalize(value: string): string {
  return value.toLowerCase().replace(/[_-]+/g, "-");
}

/** Find one specific document by a fragment of its original filename. */
export function findDoc(fragment: string): TownshipDocument | undefined {
  const needle = normalize(fragment);
  return ALL.find((d) => normalize(d.original).includes(needle));
}

export function findAll(fragment: string): TownshipDocument[] {
  const needle = normalize(fragment);
  return ALL.filter((d) => normalize(d.original).includes(needle));
}

export const DOCUMENT_COUNT = ALL.length;

/**
 * The forms residents actually come looking for. Pinned by filename so a
 * re-migration cannot quietly reorder them.
 */
export const FORMS = {
  pantryEnglish: findDoc("Food-Pantry-Application-ENGLISH"),
  pantrySpanish: findDoc("Food-Pantry-Application-SPANISH"),
  pantryRussian: findDoc("Food-Pantry-Application-RUSSIAN"),
  pantryFlyer: findDoc("FOOD-PANTRY-FLYER"),
  generalAssistance: findDoc("GA-Application"),
  generalAssistanceSpanish: findDoc("Spanish-GA-Application"),
  volunteer: findDoc("Application-Volunteer-Fillable"),
  grant: findDoc("Grant-Application"),
  decennial: findDoc("DECENNIAL"),
  boardSchedule: findDoc("Board-Meeting-Schedule"),
  foiaPosting: findDoc("ANNUAL-FOIA-POSTING"),
} as const;
