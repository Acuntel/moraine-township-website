#!/usr/bin/env node
/**
 * Computes WCAG 2.1 contrast ratios for every foreground/background pair the
 * site actually uses, and fails if any pair falls below its threshold.
 *
 * Run: node scripts/contrast.mjs
 *
 * Thresholds (WCAG 2.1):
 *   1.4.3 Contrast (Minimum), AA  : 4.5:1 normal text, 3:1 large text
 *   1.4.11 Non-text Contrast, AA  : 3:1 UI components and graphical objects
 */

const C = {
  // Warm neutrals from the approved mock.
  cream: '#FDFBF7',
  creamAlt: '#F5F0E8',
  ink: '#2A2520',
  inkMuted: '#6B6156',
  inkFaint: '#9C9285',
  line: '#E8E0D4',
  green: '#01A667',
  panel: '#005A60',
  amberDeep: '#A9661A',
  amberLight: '#F0C060',
  amberRaw: '#D4882A',
  greenDeep: '#018552',
  greenLight: '#66BB6A',
  teal: '#00757D',
  tealDark: '#005A60',
  mint: '#99D4AD',
  aqua: '#45B4A4',
  white: '#FFFFFF',
  amber900: '#78350F',
  amber50: '#FFFBEB',
  red900: '#7F1D1D',
  red50: '#FEF2F2',
}

function srgbToLinear(v) {
  const c = v / 255
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

function luminance(hex) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b)
}

function ratio(a, b) {
  const la = luminance(a)
  const lb = luminance(b)
  const [hi, lo] = la > lb ? [la, lb] : [lb, la]
  return (hi + 0.05) / (lo + 0.05)
}

// Every pair below appears somewhere in the built site.
const CHECKS = [
  ['Body text on cream', C.ink, C.cream, 4.5],
  ['Body text on cream-alt', C.ink, C.creamAlt, 4.5],
  ['Body text on white card', C.ink, C.white, 4.5],
  ['Muted body text on cream', C.inkMuted, C.cream, 4.5],
  ['Muted body text on cream-alt', C.inkMuted, C.creamAlt, 4.5],
  ['Muted body text on white card', C.inkMuted, C.white, 4.5],
  ['Headings (teal-dark) on cream', C.tealDark, C.cream, 4.5],
  ['Headings (teal-dark) on cream-alt', C.tealDark, C.creamAlt, 4.5],
  ['Headings (teal-dark) on white card', C.tealDark, C.white, 4.5],
  ['Links (teal) on cream', C.teal, C.cream, 4.5],
  ['Links (teal) on cream-alt', C.teal, C.creamAlt, 4.5],
  ['Links (teal) on white card', C.teal, C.white, 4.5],
  ['Eyebrow (teal) on cream', C.teal, C.cream, 4.5],
  ['White on green-deep (donate button)', C.white, C.greenDeep, 4.5],
  ['White on teal-dark (donate band)', C.white, C.tealDark, 4.5],
  ['Teal-dark on white (outline button)', C.tealDark, C.white, 4.5],
  ['Teal-dark on cream-alt (hero button hover)', C.tealDark, C.creamAlt, 4.5],
  ['Amber warning text on amber background', C.amber900, C.amber50, 4.5],
  ['Error text on error background', C.red900, C.red50, 4.5],
  // Non-text: focus ring, marks and graphical objects.
  ['Focus ring (teal) on cream', C.teal, C.cream, 3],
  ['Focus ring (teal) on cream-alt', C.teal, C.creamAlt, 3],
  ['Focus ring (teal) on white', C.teal, C.white, 3],
  ['Brand green mark on cream', C.green, C.cream, 3],
  ['Brand green mark on white', C.green, C.white, 3],
  // The dark stat band and the amber action colour.
  ['White heading on dark panel', C.white, C.panel, 4.5],
  ['Amber stat accent on dark panel', C.amberLight, C.panel, 4.5],
  ['Mint eyebrow on dark panel', C.mint, C.panel, 4.5],
  ['White on amber CTA', C.white, C.amberDeep, 4.5],
]

/**
 * Brand-kit colours that are light enough to fail as text or as a meaningful
 * graphic. They are listed here so nobody reaches for one without knowing, and
 * the check below fails if any of them appears in the built markup as a text
 * or border colour.
 */
const DECORATIVE_ONLY = [
  ['amber (fills only)', C.amberRaw],
  ['brand-aqua', C.aqua],
  ['brand-green-light', C.greenLight],
  ['brand-mint', C.mint],
  ['ink-faint (borders only)', C.inkFaint],
  ['line (rules only)', C.line],
]

let failures = 0
const rows = CHECKS.map(([label, fg, bg, min]) => {
  const r = ratio(fg, bg)
  const pass = r >= min
  if (!pass) failures += 1
  return { label, fg, bg, ratio: r.toFixed(2), min: `${min}:1`, pass }
})

const width = Math.max(...rows.map((r) => r.label.length))
console.log('\nWCAG 2.1 contrast check\n')
for (const row of rows) {
  const mark = row.pass ? 'PASS' : 'FAIL'
  console.log(
    `${mark}  ${row.label.padEnd(width)}  ${String(row.ratio).padStart(6)}:1  (min ${row.min})  ${row.fg} on ${row.bg}`,
  )
}

console.log(`\n${rows.length - failures}/${rows.length} pairs pass.`)

console.log('\nDecorative-only tokens (fills, borders and rules, never text):')
for (const [name, hex] of DECORATIVE_ONLY) {
  console.log(`  ${name.padEnd(26)} ${hex}  ${ratio(hex, C.cream).toFixed(2)}:1 on cream`)
}
if (failures > 0) {
  console.error(`\n${failures} contrast failure(s). Fix before shipping.`)
  process.exit(1)
}
console.log('All colour pairs meet WCAG 2.1 AA.\n')
