import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_LABELS,
  LOCALE_TAGS,
  isLocale,
  localePath,
  splitLocale,
} from "@/lib/i18n";

/**
 * Routing between the three languages.
 *
 * English sits at the root and Spanish and Russian are prefixed, which keeps
 * every URL a resident already has working. The cost of that choice is an
 * asymmetry the rest of the site has to get right, and one half of it has
 * already caused a real bug: see the regression test below.
 */

describe("locales", () => {
  test("are the three the Township publishes in, and no others", () => {
    assert.deepEqual([...LOCALES], ["en", "es", "ru"]);
    assert.equal(DEFAULT_LOCALE, "en");
  });

  test("each has a label in its own language and a BCP 47 tag", () => {
    for (const locale of LOCALES) {
      assert.ok(LOCALE_LABELS[locale], locale);
      assert.match(LOCALE_TAGS[locale], /^[a-z]{2}-[A-Z]{2}$/, locale);
    }
    // Written the way a speaker of that language would recognise it, which is
    // the whole point of a language switcher.
    assert.equal(LOCALE_LABELS.es, "Español");
    assert.equal(LOCALE_LABELS.ru, "Русский");
  });

  test("isLocale rejects anything else", () => {
    for (const value of ["", "pl", "EN", "en-US", "de", "/en"]) {
      assert.equal(isLocale(value), false, value);
    }
  });
});

describe("localePath", () => {
  test("leaves English unprefixed", () => {
    assert.equal(localePath("en", "/about"), "/about");
    assert.equal(localePath("en", "/"), "/");
  });

  test("prefixes Spanish and Russian", () => {
    assert.equal(localePath("es", "/about"), "/es/about");
    assert.equal(localePath("ru", "/about"), "/ru/about");
    assert.equal(localePath("es", "/"), "/es");
  });

  test("does not leave a trailing slash behind", () => {
    assert.equal(localePath("es", "/about/"), "/es/about");
    assert.equal(localePath("en", "/about/"), "/about");
  });
});

describe("splitLocale", () => {
  /**
   * The regression this file exists for.
   *
   * The browser shows "/about" for English, but the middleware rewrite means
   * the server renders "/en/about". When splitLocale did not strip "/en", the
   * server and the client disagreed about the current route, which silently
   * broke aria-current="page" and the header's over-hero styling on every
   * English page. Silently, because nothing throws: the nav just stops telling
   * a screen reader user which page they are on.
   */
  test("strips the /en prefix the middleware adds", () => {
    assert.deepEqual(splitLocale("/en/about"), {
      locale: "en",
      route: "/about",
    });
    assert.deepEqual(splitLocale("/en"), { locale: "en", route: "/" });
    assert.deepEqual(splitLocale("/en/"), { locale: "en", route: "/" });
  });

  test("reads the prefixed locales", () => {
    assert.deepEqual(splitLocale("/es/about"), {
      locale: "es",
      route: "/about",
    });
    assert.deepEqual(splitLocale("/ru/food-pantry"), {
      locale: "ru",
      route: "/food-pantry",
    });
    assert.deepEqual(splitLocale("/es"), { locale: "es", route: "/" });
  });

  test("treats an unprefixed path as English", () => {
    assert.deepEqual(splitLocale("/about"), { locale: "en", route: "/about" });
    assert.deepEqual(splitLocale("/"), { locale: "en", route: "/" });
  });

  test("keeps nested routes intact", () => {
    assert.deepEqual(splitLocale("/es/cemeteries/mooney"), {
      locale: "es",
      route: "/cemeteries/mooney",
    });
  });

  // "enrollment" starts with "en" but is not a locale. Prefix matching on the
  // raw string rather than the path segment would eat the first two letters.
  test("does not mistake a path that merely starts with a locale", () => {
    assert.deepEqual(splitLocale("/english-classes"), {
      locale: "en",
      route: "/english-classes",
    });
    assert.deepEqual(splitLocale("/estate-planning"), {
      locale: "en",
      route: "/estate-planning",
    });
  });

  test("round-trips with localePath for every locale and route", () => {
    const routes = ["/", "/about", "/food-pantry", "/cemeteries/mooney"];
    for (const locale of LOCALES) {
      for (const route of routes) {
        assert.deepEqual(
          splitLocale(localePath(locale, route)),
          { locale, route },
          `${locale} ${route}`,
        );
      }
    }
  });
});
