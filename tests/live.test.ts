import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { LOCALES, localePath } from "@/lib/i18n";
import { FORMS, byCategory } from "@/lib/documents";
import { LEGACY_PATHS } from "@/lib/redirects.mjs";
import { mapLimit } from "./helpers.ts";

/**
 * Smoke tests against a running deployment.
 *
 * Skipped by default, because the rest of the suite must stay runnable with no
 * network. Run them against production with:
 *
 *   npm run test:live
 *   BASE_URL=https://moraine-food-pantry.vercel.app npm run test:live
 *
 * Nothing here sends mail. The contact-form check posts a deliberately invalid
 * body, which is rejected before the send path is reached, so running this
 * suite never puts a test message in the Township's inbox.
 */

const BASE = (
  process.env.BASE_URL ?? "https://moraine-food-pantry.vercel.app"
).replace(/\/$/, "");
const skip =
  process.env.RUN_LIVE_TESTS !== "1" && "set RUN_LIVE_TESTS=1 to run";

const ROUTES = [
  "/",
  "/about",
  "/food-pantry",
  "/services",
  "/assessor",
  "/board-meetings",
  "/cemeteries",
  "/foia",
  "/programs",
  "/get-involved",
  "/contact",
  "/donate",
];

async function head(url: string) {
  return fetch(url, { method: "HEAD", redirect: "follow" });
}

describe("pages", { skip }, () => {
  for (const locale of LOCALES) {
    test(`every ${locale} page responds`, async () => {
      const failures: string[] = [];
      for (const route of ROUTES) {
        const url = BASE + localePath(locale, route);
        const res = await fetch(url, { redirect: "follow" });
        if (!res.ok) failures.push(`${res.status} ${url}`);
      }
      assert.deepEqual(failures, []);
    });
  }

  test("declares the right lang attribute per locale", async () => {
    for (const locale of LOCALES) {
      const res = await fetch(BASE + localePath(locale, "/about"));
      const html = await res.text();
      // Wrong or missing lang makes a screen reader read the page in the
      // wrong accent, which WCAG 3.1.1 exists to prevent.
      assert.match(html, new RegExp(`<html[^>]+lang="${locale}`), locale);
    }
  });

  test("an unknown page returns 404 rather than a soft error", async () => {
    const res = await fetch(`${BASE}/no-such-page-here`);
    assert.equal(res.status, 404);
  });
});

describe("legacy URLs", { skip }, () => {
  /**
   * Every one of the 65 paths crawled off the Squarespace site. Residents have
   * these bookmarked and search engines have them indexed, and the Assessor
   * called the links the most important thing on the site. Checked against the
   * redirect map itself rather than a hand-written list, so a path added to
   * the map is covered here the moment it is added.
   */
  test("every crawled Squarespace path still lands somewhere real", async () => {
    const failures: string[] = [];
    await mapLimit(LEGACY_PATHS, 6, async (path) => {
      const res = await fetch(BASE + path, { redirect: "follow" });
      if (!res.ok) failures.push(`${res.status} ${path}`);
    });
    assert.deepEqual(failures, []);
  });

  test("a legacy path redirects rather than rendering in place", async () => {
    const res = await fetch(BASE + LEGACY_PATHS[0], { redirect: "manual" });
    assert.ok(
      [301, 308].includes(res.status),
      `expected a permanent redirect, got ${res.status}`,
    );
  });
});

describe("the document archive", { skip }, () => {
  test("the forms residents come for are downloadable", async () => {
    for (const [name, doc] of Object.entries(FORMS)) {
      assert.ok(doc, `FORMS.${name} is missing`);
      const res = await head(doc.url);
      assert.equal(res.status, 200, `${name}: ${doc.url}`);
    }
  });

  test("the statutory postings are downloadable", async () => {
    // A sample from each category Illinois requires the Township to keep
    // posted. Checking all 247 on every run would be slow and no more useful.
    const sample = [
      "minutes",
      "budget",
      "levy",
      "audit",
      "foia",
      "annualmeeting",
      "treasurer",
      "agenda",
      "schedule",
    ].flatMap((category) => byCategory(category).slice(0, 2));

    const failures: string[] = [];
    await mapLimit(sample, 6, async (doc) => {
      const res = await head(doc.url);
      if (res.status !== 200) failures.push(`${res.status} ${doc.label}`);
    });
    assert.deepEqual(failures, []);
  });
});

describe("the contact form endpoint", { skip }, () => {
  test("is deployed and validates before sending", async () => {
    // Deliberately invalid: rejected at validation, so no mail is sent.
    const res = await fetch(`${BASE}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "", email: "not-an-address", message: "" }),
    });
    assert.equal(res.status, 400);
    assert.deepEqual(await res.json(), { error: "missing_fields" });
  });

  test("mail is actually configured in this environment", async () => {
    // A 503 here means a resident's message would go nowhere. The request is
    // still invalid, so nothing is delivered either way.
    const res = await fetch(`${BASE}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "", email: "", message: "" }),
    });
    assert.notEqual(
      res.status,
      503,
      "RESEND_API_KEY is missing on the deployment; the contact form is dead",
    );
  });
});

describe("the admin panel", { skip }, () => {
  test("is closed to anyone without the password", async () => {
    const res = await fetch(`${BASE}/admin`, { redirect: "manual" });
    const html = res.status === 200 ? await res.text() : "";
    assert.ok(
      res.status !== 200 || /type="password"/.test(html),
      "the admin panel rendered without asking for a password",
    );
  });

  test("rejects a wrong password", async () => {
    const res = await fetch(`${BASE}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: "definitely-not-the-password" }),
    });
    assert.ok(res.status >= 400, `login returned ${res.status}`);
    assert.doesNotMatch(
      res.headers.get("set-cookie") ?? "",
      /moraine_admin/,
      "a failed login must not set a session cookie",
    );
  });

  /**
   * The write route is PUT, not POST.
   *
   * This test used to POST, which returns 405 Method Not Allowed before any
   * auth check runs. It passed on "that verb does not exist" while never once
   * exercising the gate it claimed to be testing, so it would have gone on
   * passing if the panel had been left wide open. Assert the exact status for
   * the same reason: 401 is the gate answering, anything else is not.
   */
  test("refuses an unauthenticated content write", async () => {
    const res = await fetch(`${BASE}/api/admin/content`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ news: [] }),
    });
    assert.equal(res.status, 401, "PUT must be rejected as unauthorized");
    assert.deepEqual(await res.json(), { error: "unauthorized" });
  });

  test("refuses to hand out the content to a stranger", async () => {
    const res = await fetch(`${BASE}/api/admin/content`);
    assert.equal(res.status, 401, "GET must be rejected as unauthorized");
  });

  test("refuses an unauthenticated photo upload", async () => {
    const res = await fetch(`${BASE}/api/admin/upload`, {
      method: "POST",
      body: new FormData(),
    });
    assert.ok(
      res.status === 401 || res.status === 403,
      `upload returned ${res.status}, expected an auth rejection`,
    );
  });
});

describe("share cards", { skip }, () => {
  /**
   * A blank share card is invisible on the site itself and only shows up when
   * a resident posts a link to Facebook or texts it to a neighbour, which is
   * exactly when the Township most wants to look real.
   */
  test("every locale advertises an image that exists", async () => {
    for (const locale of LOCALES) {
      const html = await (await fetch(BASE + localePath(locale, "/"))).text();

      const og = html.match(/<meta property="og:image" content="([^"]+)"/);
      assert.ok(og, `${locale} home page declares no og:image`);
      assert.match(og[1], /^https:\/\//, "must be absolute for Facebook");

      // twitter:card promises a large image; the image has to be there.
      assert.match(html, /name="twitter:card" content="summary_large_image"/);
      assert.match(html, /name="twitter:image"/, `${locale} twitter:image`);

      // Some platforms read this to a screen reader in place of the picture.
      const alt = html.match(/<meta property="og:image:alt" content="([^"]+)"/);
      assert.ok(alt && alt[1].length > 60, `${locale} og:image:alt too thin`);
    }
  });

  test("the card is actually fetchable and is a real image", async () => {
    const html = await (await fetch(BASE)).text();
    const url = html.match(/<meta property="og:image" content="([^"]+)"/)![1];
    const res = await fetch(url);
    assert.equal(res.status, 200, url);
    assert.match(res.headers.get("content-type") ?? "", /^image\//);
  });
});

describe("browser tab icon", { skip }, () => {
  test("an icon is declared and resolves", async () => {
    const html = await (await fetch(BASE)).text();
    const link = html.match(/<link rel="icon"[^>]*href="([^"]+)"/);
    assert.ok(link, "no icon declared; the tab shows a blank page mark");

    const res = await fetch(
      link[1].startsWith("http") ? link[1] : BASE + link[1],
    );
    assert.equal(res.status, 200);
    assert.match(res.headers.get("content-type") ?? "", /image|svg/);
  });

  test("iOS gets a bitmap, since it ignores SVG favicons", async () => {
    const res = await fetch(`${BASE}/apple-icon.png`);
    assert.equal(res.status, 200);
    assert.match(res.headers.get("content-type") ?? "", /image\/png/);
  });
});
