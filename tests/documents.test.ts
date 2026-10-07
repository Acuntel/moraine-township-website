import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  DOCUMENT_COUNT,
  FORMS,
  UNAVAILABLE,
  NOTICE_CATEGORIES,
  byCategory,
  fileSize,
  findDoc,
  groupedByYear,
  newestFirst,
  noticesBySubcategory,
  sortDate,
  type TownshipDocument,
} from "@/lib/documents";
import manifest from "@/lib/documents.json" with { type: "json" };

const ALL = manifest.migrated as Array<{
  original: string;
  url: string;
  label: string;
  category: string;
  year: number | null;
  bytes: number;
  ext: string;
  date?: string;
  subcategory?: string;
}>;

/**
 * The document archive.
 *
 * Every one of these files was served by Squarespace from morainetownship.org
 * and stops resolving the moment DNS moves. Among them are the minutes,
 * budgets, audits and levies that Illinois law requires the Township to keep
 * posted, so a break in this manifest is a statutory problem and not a broken
 * link. These tests guard the manifest itself; scripts/illinois-compliance.mjs
 * separately checks that the required categories reach a page.
 */

describe("the manifest", () => {
  test("still holds every migrated file", () => {
    assert.equal(ALL.length, 247);
    assert.equal(DOCUMENT_COUNT, 247);
  });

  test("records the 34 originals that were already 404 before migration", () => {
    // Recorded rather than dropped, so the gap stays visible to the client
    // instead of being silently inherited from the old site.
    assert.equal(UNAVAILABLE.length, 34);
    for (const gap of UNAVAILABLE) {
      assert.ok(gap.url.startsWith("http"), gap.url);
      assert.ok(gap.name.length > 0, gap.url);
    }
  });

  test("every entry is complete", () => {
    for (const doc of ALL) {
      assert.ok(doc.label.trim().length > 0, doc.url);
      assert.ok(doc.category.trim().length > 0, doc.label);
      assert.ok(doc.ext.trim().length > 0, doc.label);
      assert.ok(doc.bytes > 0, `${doc.label} has no size`);
      assert.match(doc.url, /^https:\/\//, doc.label);
      assert.match(doc.original, /^https:\/\//, doc.label);
    }
  });

  test("no file is listed twice", () => {
    const urls = new Set(ALL.map((d) => d.url));
    assert.equal(urls.size, ALL.length, "duplicate destination URL");
    const originals = new Set(ALL.map((d) => d.original));
    assert.equal(originals.size, ALL.length, "duplicate source URL");
  });

  test("labels are readable rather than filenames", () => {
    for (const doc of ALL) {
      assert.doesNotMatch(doc.label, /\.(pdf|docx?|xlsx?)$/i, doc.label);
      assert.doesNotMatch(doc.label, /[_]|%20/, doc.label);
    }
  });

  test("every year is plausible", () => {
    // The cemetery records and the 1840 survey plat are genuinely historical
    // (the Mooney deed is from 1904). Everything else the Township posts is
    // from this century, so a year outside it is a parsing mistake, like the
    // term-end year 2029 that a compensation resolution once carried.
    for (const doc of ALL) {
      if (doc.year === null) continue;
      const historical =
        doc.category === "cemetery" || /Survey Plat/.test(doc.label);
      assert.ok(
        doc.year >= (historical ? 1830 : 2000) && doc.year <= 2030,
        `${doc.label}: ${doc.year}`,
      );
    }
  });

  test("labels follow one naming pattern, with no dashes as punctuation", () => {
    // Sanela Abazovic asked in the round 2 review for consistent names. Ranges
    // such as 2025-2029 use a hyphen; an en or em dash never appears.
    for (const doc of ALL) {
      assert.doesNotMatch(doc.label, /[\u2013\u2014]/, doc.label);
    }
    const labels = new Set(ALL.map((d) => d.label));
    assert.equal(labels.size, ALL.length, "two documents share a label");
  });

  test("dates, where given, are real ISO dates", () => {
    for (const doc of ALL) {
      if (!doc.date) continue;
      assert.match(doc.date, /^\d{4}-\d{2}-\d{2}$/, doc.label);
      assert.ok(!Number.isNaN(Date.parse(doc.date)), doc.label);
    }
  });
});

describe("statutory categories", () => {
  // Each of these is posted because Illinois law requires it. An empty
  // category means the Township has stopped meeting an obligation, which is
  // why this is a test and not a comment.
  const REQUIRED: Array<[string, string]> = [
    ["minutes", "5 ILCS 120/2.06(b), open meeting minutes"],
    ["budget", "50 ILCS 205/20 and 30 ILCS 15, budget and appropriation"],
    ["levy", "35 ILCS 200/18-60, tax levy"],
    ["audit", "50 ILCS 310, annual audit"],
    ["foia", "5 ILCS 140/4, FOIA posting"],
    ["annualmeeting", "60 ILCS 1 Art. 30, annual town meeting"],
    ["agenda", "5 ILCS 120/2.02, meeting agendas"],
    ["treasurer", "60 ILCS 1 Art. 80, treasurer's report"],
  ];

  for (const [category, citation] of REQUIRED) {
    test(`${category} is posted (${citation})`, () => {
      const docs = byCategory(category);
      assert.ok(docs.length > 0, `no documents in "${category}"`);
    });
  }

  test("minutes are the bulk of the archive, as they should be", () => {
    assert.ok(byCategory("minutes").length >= 100);
  });
});

describe("pinned forms", () => {
  /**
   * FORMS resolves each entry by filename fragment. If a re-migration renames
   * a file, the lookup returns undefined and the link disappears from the page
   * with nothing thrown. These are the forms residents actually come for, so
   * that silence is the worst possible failure mode.
   */
  test("every pinned form resolves to a real file", () => {
    for (const [name, doc] of Object.entries(FORMS)) {
      assert.ok(doc, `FORMS.${name} no longer matches any document`);
      assert.match(doc.url, /^https:\/\//, name);
    }
  });

  test("the food pantry application exists in all three languages", () => {
    assert.ok(FORMS.pantryEnglish);
    assert.ok(FORMS.pantrySpanish);
    assert.ok(FORMS.pantryRussian);
    const urls = new Set([
      FORMS.pantryEnglish.url,
      FORMS.pantrySpanish.url,
      FORMS.pantryRussian.url,
    ]);
    assert.equal(urls.size, 3, "three languages must be three distinct files");
  });

  test("findDoc matches on a filename fragment", () => {
    assert.ok(findDoc("Food-Pantry-Application-ENGLISH"));
    assert.equal(findDoc("no-such-document-anywhere"), undefined);
  });
});

describe("helpers", () => {
  test("byCategory accepts several categories at once", () => {
    const combined = byCategory("budget", "levy");
    assert.equal(
      combined.length,
      byCategory("budget").length + byCategory("levy").length,
    );
    assert.deepEqual(byCategory("category-that-does-not-exist"), []);
  });

  test("groupedByYear returns newest first, which is how an archive is read", () => {
    // Takes category names, not documents. Passing an array here silently
    // matched nothing and made this assertion vacuous until tsc caught it.
    const groups = groupedByYear("minutes");
    assert.ok(groups.length > 5, "minutes should span many years");

    const numeric = groups
      .map((g) => g.year)
      .filter((y) => y !== "Undated")
      .map(Number);
    assert.deepEqual(
      numeric,
      [...numeric].sort((a, b) => b - a),
      "years are not newest-first",
    );

    // Undated files sort to the bottom rather than above 2026.
    const undated = groups.findIndex((g) => g.year === "Undated");
    if (undated !== -1) assert.equal(undated, groups.length - 1);

    // Nothing may be dropped on the way into the groups.
    const grouped = groups.reduce((n, g) => n + g.docs.length, 0);
    assert.equal(grouped, byCategory("minutes").length);
  });

  test("groupedByYear sorts documents within a year by date, newest first", () => {
    // It used to sort by label, which put April before January once the
    // labels carried month names.
    for (const group of groupedByYear("minutes")) {
      const dates = group.docs.map(sortDate);
      assert.deepEqual(dates, [...dates].sort().reverse(), group.year);
    }
    const [latest] = groupedByYear("minutes");
    assert.equal(latest.docs[0].label, "Board Meeting Minutes, August 5, 2026");
  });

  test("sortDate reads a date, a season or a year, in that order", () => {
    const doc = (label: string, extra: Partial<TownshipDocument> = {}) =>
      ({ label, year: 2020, ...extra }) as TownshipDocument;
    assert.equal(sortDate(doc("Minutes, January 7, 2026")), "2026-01-07");
    assert.equal(sortDate(doc("Township Newsletter, Fall 2006")), "2006-10-01");
    assert.equal(sortDate(doc("Annual Budget, Fiscal Year 2019-2020")), "2020");
    assert.equal(
      sortDate(doc("Statement", { date: "2025-04-08" })),
      "2025-04-08",
    );
    assert.equal(sortDate(doc("Undated map", { year: null })), "");
  });

  test("newestFirst puts undated documents last", () => {
    const sorted = newestFirst(byCategory("cemetery"));
    const dates = sorted.map(sortDate);
    const firstUndated = dates.indexOf("");
    if (firstUndated !== -1) {
      assert.ok(dates.slice(firstUndated).every((d) => d === ""));
    }
    assert.equal(sorted.length, byCategory("cemetery").length);
  });

  test("every legal and public notice lands in exactly one group", () => {
    // The notices list on /foia renders only the groups it knows. A notice
    // without a known subcategory would silently vanish from the page.
    const grouped = noticesBySubcategory().flatMap((g) => g.docs);
    assert.equal(grouped.length, byCategory(...NOTICE_CATEGORIES).length);
    assert.equal(new Set(grouped.map((d) => d.url)).size, grouped.length);
  });

  test("fileSize warns a phone user before they open a large scan", () => {
    assert.equal(fileSize(500), "1 KB");
    assert.equal(fileSize(1024 * 400), "400 KB");
    assert.equal(fileSize(1024 * 1024 * 12), "12.0 MB");
    assert.equal(fileSize(1024 * 1024 * 1.5), "1.5 MB");
  });
});
