# Accessibility conformance record

**Site:** Moraine Township
**Standard:** WCAG 2.1 Level AA
**Legal basis:** ADA Title II, 28 CFR Part 35 Subpart H
**Compliance date for this client:** April 26, 2028 (population under 50,000)
**Last verified:** August 13, 2026 against the live production deployment

Contract §4.3 commits to WCAG 2.1 Level AA. This file records how that was verified,
so the claim is auditable rather than asserted.

---

## How to re-verify

Both checks are repeatable and must stay green before any deploy.

```bash
# Exact contrast ratios for every colour pair in use. Exits non-zero on failure.
node scripts/contrast.mjs

# Structural audit across all 18 routes in all 3 languages (54 pages).
npx next build && npx next start -p 3111 &
node scripts/a11y-audit.mjs

# Every image has a description that actually describes it.
node scripts/image-audit.mjs

# The 15 Illinois statutory postings are present and reachable.
node scripts/illinois-compliance.mjs

# Catches English leaking onto the Spanish and Russian pages.
node scripts/i18n-leak-check.mjs

# Or against production:
node scripts/a11y-audit.mjs https://moraine-food-pantry.vercel.app
node scripts/i18n-leak-check.mjs https://moraine-food-pantry.vercel.app
```

---

## Contrast (1.4.3, 1.4.11)

All 22 foreground/background pairs pass. Measured, not estimated.

| Pair                                   | Ratio   | Required |
| -------------------------------------- | ------- | -------- |
| Body text `#1C2B2E` on white           | 14.64:1 | 4.5:1    |
| Muted text `#40575B` on white          | 7.69:1  | 4.5:1    |
| Headings `#005A60` on white            | 7.98:1  | 4.5:1    |
| Links `#00757D` on white               | 5.47:1  | 4.5:1    |
| Links `#00757D` on tint `#E8F5EF`      | 4.88:1  | 4.5:1    |
| White on donate green `#018552`        | 4.69:1  | 4.5:1    |
| White on teal-dark `#005A60`           | 7.98:1  | 4.5:1    |
| Teal-dark on mint `#99D4AD`            | 4.70:1  | 4.5:1    |
| Focus ring `#00757D` on white          | 5.47:1  | 3:1      |
| Brand green `#01A667` graphic on white | 3.16:1  | 3:1      |

### The one brand compromise, stated plainly

The Brand Kit primary green `#01A667` measures **3.16:1** on white. That clears the
3:1 bar for graphics and UI boundaries (1.4.11) but not the 4.5:1 bar for normal
text (1.4.3).

So the palette splits the green in two:

- `brand-green` `#01A667` stays the brand green for the logo, borders, icon
  tints and decorative fills.
- `brand-green-deep` `#018552`, the same hue darkened to 80%, carries white text
  on the donate buttons.

Side by side the difference is barely perceptible, and the donate control still
reads as bright brand green. Nothing else needed to change.

**Decorative-only tokens.** These are from the Brand Kit but are too light to
carry text or serve as a meaningful graphic on white. They are backgrounds and
fills only:

| Token               | Hex       | On white |
| ------------------- | --------- | -------- |
| `brand-aqua`        | `#45B4A4` | 2.52:1   |
| `brand-green-light` | `#66BB6A` | 2.36:1   |
| `brand-mint`        | `#99D4AD` | 1.70:1   |

---

## Structural audit (54 pages, 3 languages)

`scripts/a11y-audit.mjs` checks every route in English, Spanish and Russian for:

| Criterion                    | What is checked                                                                                                      |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| 1.1.1 Non-text Content       | Every `img` has alt; no alt that is a file name or "image"; every `role="img"` has an accessible name                |
| 1.3.1 Info and Relationships | One h1 per page, no skipped heading levels, no empty headings, `main`/`header`/`footer` landmarks, every `nav` named |
| 1.4.4 Resize Text            | Viewport does not block zoom and does not cap `maximum-scale` below 2                                                |
| 2.4.1 Bypass Blocks          | Skip-to-content link present                                                                                         |
| 2.4.2 Page Titled            | Non-empty `title`                                                                                                    |
| 2.4.3 Focus Order            | No positive `tabindex`                                                                                               |
| 2.4.4 Link Purpose           | No empty links, no "click here" style link text                                                                      |
| 3.1.1 Language of Page       | `html lang` set, per locale                                                                                          |
| 3.2.5 Change on Request      | Every `target="_blank"` announces the new tab, in the page's own language                                            |
| 3.3.2 Labels or Instructions | Every form control has a label, `aria-label` or `aria-labelledby`                                                    |
| 4.1.1 Parsing                | No duplicate `id` values                                                                                             |
| 4.1.2 Name, Role, Value      | Every button has an accessible name                                                                                  |

**Result: 0 issues.**

### Issues found and fixed during the audit

1. **Duplicate `id` on the logo (4.1.1).** The Township mark renders twice per
   page, header and footer, and its SVG `textPath` referenced a hardcoded arc id.
   Both instances emitted the same id, so the second `textPath` pointed at the
   first one's path. Fixed with React `useId()` per instance.

2. **Amazon wish list link in the donate band (3.2.5).** It opened a new tab with
   no announcement. Fixed by threading the localized note through to that link.

3. **Alt text that described the wrong image (1.1.1).** Three of four photographs
   had been given plausible-sounding descriptions before the files were actually
   looked at. Every description was rewritten against the real image. This one
   matters most: wrong alt text is worse than none, because a screen reader user
   has no way to detect it.

4. **Dead alt text on the home page tiles.** The six tiles carry no photograph,
   but the content model still held an `imageAlt` for each. Removed, so nobody
   later adds an image and trusts a description that was never checked.

---

## Images (1.1.1), audited separately

`scripts/image-audit.mjs` exists because "has an alt attribute" is not the test
that matters. It checks every `<img>`, every `role="img"` element, every CSS
background image and every inline SVG across all 54 pages, and rejects:

- a missing `alt`, or an `alt` that is a file name, "image", "photo" or a number
- alt text that merely repeats the filename
- alt that opens with filler such as "image of" or "picture of"
- an alt shorter than 12 characters, which cannot describe a photograph
- an alt longer than 500 characters, which belongs in visible text instead
- a `role="img"` element or SVG with no accessible name
- a background image with neither `role="img"` nor `aria-hidden`
- a decorative SVG that is not hidden from assistive technology

**Result: 21 images, 18 `role="img"` elements and 12 background images, all with
descriptions. 0 issues.**

Two rules that are not automatable and are enforced by hand:

1. **Every description was written after opening the file and looking at it.**
   On an earlier pass three of four photographs had plausible-sounding
   descriptions that described entirely different pictures. That is the worst
   accessibility defect a site can carry, because the reader who depends on it
   has no way to know.
2. **A crop must not hide what the description names.** The Mooney Cemetery sign
   was being cropped so only "Moraine Township" was visible while the alt text
   said the sign read "Mooney Cemetery, Moraine Township". Each photograph now
   carries a focal point so the framing and the description agree.

---

## Illinois statutory postings

`scripts/illinois-compliance.mjs` checks that each posting Illinois law requires
is present **and reachable**, not merely described. A page that says "budgets are
posted here" and links nothing is a compliance failure, and that is the failure
mode this catches.

**Result: 15/15 satisfied.** Covering 5 ILCS 120/2.02, 2.02(c), 2.06(b) and 7.3;
5 ILCS 140/3, /4 and /6; 30 ILCS 15; 35 ILCS 200/18-60; 50 ILCS 205/20;
60 ILCS 1 Articles 80 and 130; and 28 CFR 35.200.

---

## Beyond the automated checks

- **Read aloud.** Every page has a control that reads the main content using the
  browser's speech synthesis, in the page's own language (`en-US`, `es-US`,
  `ru-RU`). No API key and no per-request cost.
- **The Assessor boundary map.** It was a PDF, which the Supervisor ruled out. It
  is now an image with a full text description that is both visible on the page
  and readable aloud, covering what the map actually conveys: that the boundary
  does not follow municipal lines and can run down the middle of a street.
- **Reduced motion.** The donation hearts, the tile lift and every transition
  respect `prefers-reduced-motion`. The hearts are suppressed entirely.
- **Keyboard.** Skip link first in tab order, visible focus ring on everything,
  Escape closes the mobile menu, no focus traps, no positive tabindex.
- **Zoom.** `maximum-scale` is 5, so pinch zoom is never blocked.
- **PDF policy.** No resident-facing information lives only in a PDF. Documents of
  record keep their signed PDF alongside an accessible HTML representation, and
  every PDF link is labelled as a PDF.

---

## Still to do, and honest about it

- **Manual screen reader pass.** Automated checks cannot confirm that the reading
  order makes sense or that the map description is genuinely useful. Recommend one
  pass with VoiceOver and one with NVDA before the client signs off.
- **Client-supplied content.** Section 12 of the Agreement puts accuracy,
  legality and accessibility of client-supplied content on the Township. The
  admin panel enforces an alt-text field on every photo upload and explains why,
  but the Township writes those descriptions.
- **PDF structure tags.** 157 of the 235 archived PDFs carry real text but no
  structure tags, so a screen reader reads them as a flat stream without
  headings, lists or table relationships. Fixing that means opening each file in
  Acrobat and tagging it by hand. It is outside the $1,500 build scope and
  should be quoted separately if the Township wants it.

## The scanned document archive, remediated

Under the DOJ's ADA Title II rule a PDF a public entity publishes is covered web
content. A scan with no text layer is an image of a document: a screen reader
gets nothing from it, and no amount of accessible HTML around the link changes
that.

`scripts/pdf-accessibility-scan.mjs` measured the archive rather than estimating
it. **88 of the 235 archived PDFs, 29.5 MB, had no text layer at all** — 42 sets
of Board minutes, 10 budgets, 9 treasurer's reports, 8 cemetery records, 7
notices, 4 tax levies and the Spanish General Assistance application among them.
Several are documents Illinois law requires the Township to keep posted, which
made this the largest single accessibility gap on the site.

`scripts/ocr-documents.mjs` ran Tesseract over every one and wrote the
recognised text back as an invisible layer, leaving each scan looking exactly as
it did. Each result was verified to contain real text before it was allowed to
replace the original, and each was written back to the same Blob path so every
link already on the site kept working.

|                         |  Before |  After |
| ----------------------- | ------: | -----: |
| PDFs with no text layer |      88 |      3 |
| Affected bytes          | 29.5 MB | 3.2 MB |

The three remaining are not scanned text and cannot be OCR'd, because there is
no text in them to recognise: `daggitt aerial view` and `mooneypictures` are
photographs, and `Mooney modernmap` is a map. The OCR script refused to write an
empty text layer over any of them rather than reporting a false success. They
need the same treatment as the Assessor boundary map, which is a written
description on the page beside the link. That is the next piece of PDF work,
and it is small.

Re-check the archive at any time with:

```bash
node scripts/pdf-accessibility-scan.mjs
```

It bypasses the CDN cache, because immediately after an OCR pass the Blob CDN
will serve the pre-OCR copy for a while and make remediated files look untouched.
