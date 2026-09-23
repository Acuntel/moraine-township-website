import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { getDictionary } from "@/content";
import { LOCALES, type Locale } from "@/lib/i18n";
import {
  CEMETERY_PHOTOS,
  DAGGITT_RESTORATION,
} from "@/content/cemetery-images";
import { flatten } from "./helpers.ts";

/**
 * The three dictionaries, checked against each other.
 *
 * TypeScript already guarantees that a missing key is a compile error. What it
 * cannot see is an array that lost an item in translation, a string left empty,
 * or an English sentence sitting in the Russian file. All three ship silently:
 * the page renders, and only a reader of that language finds out.
 */

const FLAT: Record<Locale, Record<string, string>> = {
  en: flatten(getDictionary("en")),
  es: flatten(getDictionary("es")),
  ru: flatten(getDictionary("ru")),
};

describe("dictionary parity", () => {
  for (const locale of LOCALES.filter((l) => l !== "en")) {
    test(`${locale} has exactly the same keys as English`, () => {
      const english = Object.keys(FLAT.en).sort();
      const other = Object.keys(FLAT[locale]).sort();

      const missing = english.filter(
        (k) => !FLAT[locale][k] && FLAT[locale][k] !== "",
      );
      const extra = other.filter((k) => !(k in FLAT.en));

      assert.deepEqual(missing, [], `${locale} is missing keys`);
      assert.deepEqual(extra, [], `${locale} has keys English does not`);
      // Catches a list that lost or gained an item, which key-level typing
      // cannot see because arrays satisfy the type at any length.
      assert.equal(
        other.length,
        english.length,
        `${locale} array length drift`,
      );
    });
  }

  /**
   * One string is deliberately empty. `untranslatedNote` is the line shown
   * above a news item that has not been translated yet ("this entry is only
   * available in English for now"). On the English pages there is nothing to
   * say, and an empty value is how that renders as nothing at all.
   */
  const INTENTIONALLY_EMPTY = new Set(["en.shared.untranslatedNote"]);

  test("no dictionary contains an accidentally empty string", () => {
    for (const locale of LOCALES) {
      for (const [key, value] of Object.entries(FLAT[locale])) {
        if (INTENTIONALLY_EMPTY.has(`${locale}.${key}`)) continue;
        assert.ok(value.trim().length > 0, `${locale}.${key} is empty`);
      }
    }
  });

  test("the note about untranslated entries exists in both other languages", () => {
    // The English blank only makes sense if es and ru actually carry the text.
    assert.ok(FLAT.es["shared.untranslatedNote"].trim().length > 0);
    assert.ok(FLAT.ru["shared.untranslatedNote"].trim().length > 0);
  });

  test("no dictionary contains an untouched placeholder", () => {
    for (const locale of LOCALES) {
      for (const [key, value] of Object.entries(FLAT[locale])) {
        // Case-sensitive on purpose. "todo" is an ordinary Spanish word
        // meaning "all", as in "todo lo posible" on the Assessor page.
        assert.doesNotMatch(
          value,
          /\b(TODO|FIXME|TBD)\b|\bLorem ipsum\b/,
          `${locale}.${key}`,
        );
        assert.doesNotMatch(value, /\{\{.*\}\}/, `${locale}.${key}`);
      }
    }
  });
});

describe("translation actually happened", () => {
  /**
   * Prose left in English is the failure that looks fine in review. Proper
   * nouns, addresses and acronyms legitimately match across languages, so this
   * only judges real sentences: long, multi-word, and not a name or a URL.
   */
  function isProse(value: string): boolean {
    if (value.length < 45) return false;
    if (value.split(/\s+/).length < 7) return false;
    if (/^https?:|@|^\+?[\d\s().-]+$/.test(value)) return false;
    return true;
  }

  for (const locale of LOCALES.filter((l) => l !== "en")) {
    test(`${locale} prose differs from the English`, () => {
      const untranslated: string[] = [];
      for (const [key, english] of Object.entries(FLAT.en)) {
        if (!isProse(english)) continue;
        if (FLAT[locale][key] === english) untranslated.push(key);
      }
      assert.deepEqual(
        untranslated,
        [],
        `${untranslated.length} English strings left in ${locale}`,
      );
    });
  }

  test("Russian is written in Cyrillic", () => {
    const prose = Object.values(FLAT.ru).filter((v) => v.length > 60);
    const cyrillic = prose.filter((v) => /[Ѐ-ӿ]/.test(v));
    assert.ok(
      cyrillic.length / prose.length > 0.95,
      `only ${cyrillic.length}/${prose.length} long Russian strings use Cyrillic`,
    );
  });

  test("Spanish uses the accents it should", () => {
    const joined = Object.values(FLAT.es).join(" ");
    for (const accent of ["á", "é", "í", "ó", "ú", "ñ", "¿"]) {
      assert.ok(joined.includes(accent), `Spanish never uses "${accent}"`);
    }
  });
});

describe("image descriptions", () => {
  /**
   * Every description in cemetery-images.ts was written after opening the file
   * and looking at it. On an earlier pass three of four described entirely
   * different photographs, which a screen reader user has no way to detect.
   * These tests cannot see a picture, so they hold the properties that a
   * careless rewrite would break.
   */
  const photos = [...CEMETERY_PHOTOS, ...DAGGITT_RESTORATION];

  test("every photograph is described in all three languages", () => {
    for (const photo of photos) {
      for (const locale of LOCALES) {
        const alt = photo.alt[locale];
        assert.ok(
          alt && alt.trim().length > 0,
          `${photo.id} has no ${locale} alt`,
        );
        assert.ok(
          alt.length >= 40,
          `${photo.id} ${locale} alt is too short to describe a photograph`,
        );
        assert.ok(
          photo.caption[locale]?.trim().length > 0,
          `${photo.id} ${locale} caption`,
        );
      }
    }
  });

  test("no description is a filename or a non-description", () => {
    for (const photo of photos) {
      for (const locale of LOCALES) {
        const alt = photo.alt[locale];
        assert.doesNotMatch(
          alt,
          /\.(webp|jpe?g|png)/i,
          `${photo.id} ${locale}`,
        );
        assert.doesNotMatch(
          alt,
          /^(image|photo|picture|imagen|foto|фото|изображение)\b/i,
          `${photo.id} ${locale} alt says nothing`,
        );
      }
    }
  });

  test("ids and sources are unique", () => {
    assert.equal(new Set(photos.map((p) => p.id)).size, photos.length);
    assert.equal(new Set(photos.map((p) => p.src)).size, photos.length);
  });

  test("each photograph belongs to a real cemetery", () => {
    for (const photo of photos) {
      assert.ok(["mooney", "daggitt"].includes(photo.cemetery), photo.id);
    }
  });

  test("a crop keeps the subject the description names in frame", () => {
    // The Mooney sign was once cropped so half its wording was hidden while
    // the alt text named all of it. `focal` exists because of that.
    for (const photo of photos) {
      if (photo.focal === undefined) continue;
      assert.match(
        photo.focal,
        /^(left|center|right|\d+%) (top|center|bottom|\d+%)$/,
        photo.id,
      );
    }
  });
});
