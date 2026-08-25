# Moraine Township website

Next.js 14 + TypeScript + Tailwind. Trilingual government site for Moraine Township,
Highland Park, Illinois. Replaces their Squarespace site at morainetownship.org.

**Live:** https://moraine-food-pantry.vercel.app
**Repo:** https://github.com/Acuntel/moraine-township-website (private)
**Vercel project:** `moraine-food-pantry` (`prj_MLSzcr1R2lWjfiOR1GDNSwqNeEUz`)

> The repo has no deploy hook. Deploys are manual: `npx vercel --prod --yes`
> from this folder, with the sandbox disabled. Pushing to GitHub does not
> deploy anything.

> **Never commit a real credential, including into a test.** The admin password
> was hardcoded in `tests/admin-auth.test.ts` and would have been published with
> the first push. The tests set `ADMIN_PASSWORD` themselves, so they use a
> fixture. Real values live only as encrypted Vercel environment variables.

> The Vercel project is still named `moraine-food-pantry` from the original mock.
> Renaming it in the dashboard changes the `.vercel.app` URL, so it was left alone
> until the custom domain is cut over.

## Read these first

| File                                     | What it is                                                                              |
| ---------------------------------------- | --------------------------------------------------------------------------------------- |
| `docs/DOCTRINE.md`                       | The binding scope document. Contract + meeting + brand + crawl, reconciled. Start here. |
| `docs/MEETING_TRANSCRIPT_2026-08-13.txt` | Full transcript of the planning meeting. Every design decision traces to it.            |
| `docs/ACCESSIBILITY.md`                  | WCAG 2.1 AA conformance record and how to re-verify.                                    |
| `docs/EMAIL.md`                          | Where site mail goes, and the one DNS step left before it arrives.                      |
| `docs/TESTS.md`                          | What the test suite holds and why each test is there.                                   |
| `docs/site-crawl/`                       | Complete crawl of the old site: 62 pages, 279 documents, all external links.            |

## Architecture

- English at the root (`/about`), Spanish and Russian prefixed (`/es/about`, `/ru/about`).
  `middleware.ts` rewrites root paths onto `app/(site)/[lang]` so old URLs keep working.
- Two root layouts via route groups: `app/(site)` for the public site, `app/(admin)` for admin.
- All prose lives in `content/{en,es,ru}/`, typed against `content/types.ts`. A missing
  translation is a TypeScript error, not an English string leaking onto a Spanish page.
- Facts that do not translate (phones, addresses, EIN, external URLs) live in `lib/township.ts`.
- `lib/redirects.mjs` maps every crawled legacy URL to its new home, in all three languages.

## Non-negotiables

1. **Run the tests and all five audits before any deploy.** Every one must exit
   clean. This is a contractual obligation under §4.3 and a statutory one under
   Illinois law, not a nicety.

   ```bash
   npm test                              # 94 tests, no network needed
   npx tsc --noEmit                      # the tests are typechecked too
   node scripts/contrast.mjs             # 28 measured colour pairs
   node scripts/a11y-audit.mjs           # 12 WCAG criteria x 54 pages
   node scripts/image-audit.mjs          # every image has a real description
   node scripts/i18n-leak-check.mjs      # no English on the es/ru pages
   node scripts/illinois-compliance.mjs  # 15 statutory postings
   ```

   Two generators, run only when their source changes, not on every deploy:

   ```bash
   node scripts/og-image.mjs             # the social share card
   node scripts/pdf-accessibility-scan.mjs   # which PDFs still lack a text layer
   ```

   After deploying, `npm run test:live` checks the deployment itself: every
   page in three languages, all 65 legacy Squarespace URLs, the pinned forms,
   the admin gate, the share card, the tab icon and whether email is actually
   configured. It never sends mail.

   Then the three checks that need a real browser:

   ```bash
   node scripts/popup-check.mjs        # 12 checks, all three languages
   node scripts/axe-scan.mjs           # axe-core, 55 states, ~100 rules
   node scripts/keyboard-check.mjs     # focus visibility, dialog, reduced motion
   node scripts/reflow-check.mjs       # 1.4.10, 320px and 390px, three languages
   node scripts/donate-button-check.mjs # the floating button, phone and desktop
   node scripts/console-check.mjs      # 42 pages, exceptions and failed requests
   ```

   `reflow-check` measures the document against the viewport under real mobile
   emulation. Nothing else here covers 1.4.10, and a screenshot cannot answer
   it: a headless screenshot without device emulation ignores the viewport meta
   tag and crops the page, which looks exactly like an overflow that is not
   there.

   **The four URL audits default to `http://localhost:3111`, not production.**
   Run them with no argument and no local server and every page reports
   `TypeError: fetch failed` with `0 pages checked`, which reads exactly like a
   site-wide regression or rate limiting and is neither. Pass the deployment
   explicitly to audit it: `node scripts/a11y-audit.mjs https://moraine-food-pantry.vercel.app`.

   `console-check` is the only thing here that would catch a page that renders
   correct HTML and then throws in the browser. The HTML-based audits cannot
   see a script that fails after hydration or an asset that 404s.

   Outbound links to `lakecountyil.gov` and `travel.state.gov` answer **403 to
   any automated request**, including headless Chrome, because they sit behind
   Cloudflare bot protection. That is not a dead link, and a link checker that
   reports it as one is wrong. Confirm by loading it in a normal browser. The
   Assessor verified every outbound link by hand and called them the most
   important thing on the site, so never retire one on a bot's say-so.

   `axe-scan` is the independent one. `a11y-audit.mjs` is ours and checks the
   fourteen failure modes we chose, from raw HTML, which is the site marking its
   own homework. axe computes contrast from what the browser painted, and that
   is the only reason the `text-ink-muted/70` failure on all 54 pages was ever
   found.

   Space these out. Running the live suite, the popup check and the four
   URL-based audits back to back sends several hundred requests in a minute and
   Vercel starts rate limiting, which surfaces as three audits failing at once
   and passing individually. That is throttling, not a regression.

2. **Never put white text on `brand-green` (`#01A667`).** It measures 3.16:1.
   Use `brand-green-deep` (`#018552`). See `docs/ACCESSIBILITY.md`.
3. **Never write alt text for an image you have not opened and looked at.**
   `content/cemetery-images.ts` and every `imageAlt` in the dictionaries were
   written that way. On an earlier pass three of four descriptions described
   entirely different photographs. Wrong alt text is worse than none, because a
   screen reader user cannot detect it.
4. **No resident-facing information in a PDF only.** The Supervisor ruled this out
   explicitly. Documents of record may keep a PDF alongside an HTML version.
5. **Tax details stay off the donate page.** They belong on `/thank-you`, after the
   gift. This was a deliberate decision by the Supervisor.
6. **Preserve every external link.** The Assessor verified them all and called them
   the most important thing on the site.
7. **Any page that reads `lib/store.ts` must carry `export const revalidate`.** The
   public pages are statically generated, so without revalidation an admin save
   does not appear until the next deploy. `/api/admin/content` calls
   `revalidatePath("/[lang]", "layout")` on every successful write.
8. **A photo with no description is never published.** The picker hides it and the
   gallery filters it out, because empty alt text on a government site is a
   compliance failure, not a cosmetic one.
9. **If you crop an image, check the crop still shows what the alt text claims.**
   The Mooney sign was cropped so only half the wording was visible while the
   description named all of it. `focal` on each photo exists for this.
10. **Anything that reacts to a resident coming back to the page must use
    `useReturnToPage`, never a mount-only effect.** Tapping `tel:` hands off to
    the dialer and Donate opens PayPal in a new tab; neither remounts the page,
    so a `useEffect(..., [])` runs once, before the thing it is waiting for, and
    never again. Both the missed-call prompt and the donation hearts shipped
    broken this way, and nothing threw. The hook also defers its callback by a
    tick, because navigating straight out of a `pageshow` handler races Next's
    own bfcache restore and the router puts the old URL back.
11. **The document archive is load-bearing.** `lib/documents.json` maps 241 files
    that Illinois law requires to stay posted. Do not remove a category from a
    page without checking `scripts/illinois-compliance.mjs` still passes.

## Environment variables

None are required to build or render. Each unlocks one feature, and the admin panel
says plainly which are missing rather than failing silently.

| Variable                | Enables                                                                                                                                                                                                                                                                                             | Status                          |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `ADMIN_PASSWORD`        | The admin panel at `/admin`, reached from the small footer link. Without it the panel stays closed.                                                                                                                                                                                                 | **Set**, encrypted, all targets |
| `BLOB_READ_WRITE_TOKEN` | Saving admin edits and uploading photographs. Provisioned by the `moraine-content` Vercel Blob store (`store_RGKqoKPqCyG7vYr1`), which holds both `content/site.json` and `photos/*`. Without it the site serves the seed content in `lib/store.ts` and the admin refuses to pretend a save worked. | **Set**                         |
| `RESEND_API_KEY`        | The contact form and the missed-call follow-up email.                                                                                                                                                                                                                                               | **Set**                         |
| `MAIL_TO`               | The destination. Defaults to `info@morainetownship.org`, the address the Supervisor asked for.                                                                                                                                                                                                      | **Set**                         |
| `MAIL_FROM`             | The sender. Must be on a domain verified with Resend. Currently the shared `onboarding@resend.dev`, which **cannot reach the Township**. See `docs/EMAIL.md`.                                                                                                                                       | **Set**, temporary              |

Pull them locally with:

```bash
npx vercel env pull .env.local --environment=production
```

Do **not** read env values out of the Vercel REST API. It returns ciphertext rather
than the value, and writing that back produces a token that fails at runtime with a
misleading "Access denied".

## Commands

```bash
npm run dev
npm run build
npm run typecheck
npm test                   # unit + integration, no network
npm run test:live          # smoke tests against the deployment
node scripts/contrast.mjs
node scripts/a11y-audit.mjs [baseUrl]
node scripts/image-audit.mjs [baseUrl]
node scripts/i18n-leak-check.mjs [baseUrl]
node scripts/illinois-compliance.mjs [baseUrl]
npx vercel --prod --yes    # sandbox must be disabled
```
