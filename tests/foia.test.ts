import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { getDictionary } from "@/content";
import { LOCALES } from "@/lib/i18n";
import { BODIES } from "@/lib/bodies";
import { ELECTED_OFFICIALS, LINKS } from "@/lib/township";

/**
 * The FOIA page's public body description is a statutory posting (5 ILCS
 * 140/4(a)), written three times. A figure that is right in English and stale
 * in Russian is still a wrong posting, so the numbers are compared as digits.
 */

/** Dollar amounts only, as digits: "$3,666,310" and "$3 666 310" both give 3666310. */
const dollars = (text: string) =>
  (text.match(/\$\s?\d[\d,  ]*\d/g) ?? []).map((n) => n.replace(/\D/g, ""));

describe("FOIA public body description", () => {
  test("every language states the same budget figures", () => {
    const budget = (locale: (typeof LOCALES)[number]) => {
      const row = getDictionary(locale).foia.publicBodyRows.at(-1);
      assert.ok(row, `${locale} has no budget row`);
      return dollars(row.value);
    };
    const english = budget("en");
    assert.ok(english.includes("3666310"), "the adopted total is $3,666,310");
    for (const locale of LOCALES) {
      assert.deepEqual(
        budget(locale),
        english,
        `${locale} budget figures drift`,
      );
    }
  });

  test("the Township Board roster is the elected Board, not a copy of it", () => {
    const board = BODIES.find((b) => b.id === "board");
    assert.ok(board);
    const names = board.members.map((m) => m.name);
    for (const person of ELECTED_OFFICIALS) {
      // The Assessor is elected but does not sit on the Board (60 ILCS 1/80-5).
      if (person.roleKey === "assessor") {
        assert.ok(!names.includes(person.name));
        continue;
      }
      assert.ok(
        names.includes(person.name),
        `${person.name} missing from the Board`,
      );
    }
  });

  test("every body has a name and a note in every language", () => {
    for (const locale of LOCALES) {
      const t = getDictionary(locale).foia;
      for (const body of BODIES) {
        assert.ok(t.bodyNames[body.id].trim(), `${locale} ${body.id} name`);
        assert.ok(t.bodyNotes[body.id].trim(), `${locale} ${body.id} note`);
      }
    }
  });

  test("the IMRF link 40 ILCS 5/7-135.5(b) requires is configured", () => {
    assert.match(
      LINKS.imrfEmployerInfo,
      /^https:\/\/www\.imrf\.org\/.+employer-cost-and-participation/,
    );
  });
});
