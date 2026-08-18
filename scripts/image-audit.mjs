#!/usr/bin/env node
/**
 * Dedicated image accessibility audit.
 *
 * The general a11y audit checks that alt text exists. This one checks that it
 * is worth having, which is the part that actually decides whether a blind
 * resident can use the site. Under ADA Title II (28 CFR 35.200, WCAG 2.1 AA,
 * SC 1.1.1) a text alternative must serve the same purpose as the image.
 *
 * Run: node scripts/image-audit.mjs [baseUrl]
 */

const BASE = process.argv[2] ?? 'http://localhost:3111'

const ROUTES = [
  '/',
  '/about',
  '/services',
  '/food-pantry',
  '/assessor',
  '/transportation',
  '/board-meetings',
  '/cemeteries',
  '/cemeteries/mooney',
  '/cemeteries/daggitt',
  '/programs',
  '/get-involved',
  '/donate',
  '/thank-you',
  '/foia',
  '/contact',
  '/accessibility',
  '/news',
]
const LOCALES = ['', '/es', '/ru']

/** Alt text that exists but tells the reader nothing. */
const USELESS =
  /^(image|photo|picture|img|graphic|logo|icon|banner|photograph|untitled|screenshot|\d+|slide ?\d*|.*\.(jpe?g|png|gif|webp|svg|avif))$/i

/** Phrasing that wastes a screen reader user's time. */
const REDUNDANT = /^(image of|picture of|photo of|graphic of|a picture showing)/i

const problems = []
const stats = { imgs: 0, decorative: 0, described: 0, roleImg: 0, backgrounds: 0 }

function flag(page, rule, detail) {
  problems.push({ page, rule, detail })
}

function attr(tag, name) {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`, 'i'))
  return m ? m[1] : null
}

function decode(s) {
  return s
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x2F;/g, '/')
    .trim()
}

function audit(page, html) {
  // 1. Real <img> elements.
  for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
    stats.imgs += 1
    const src = attr(tag, 'src') ?? '(no src)'
    const raw = attr(tag, 'alt')
    const hidden = attr(tag, 'aria-hidden') === 'true'

    if (raw === null) {
      flag(page, '1.1.1 missing alt', `<img> has no alt attribute: ${src}`)
      continue
    }
    const alt = decode(raw)

    if (alt === '' || hidden) {
      stats.decorative += 1
      continue
    }

    stats.described += 1

    if (USELESS.test(alt)) {
      flag(page, '1.1.1 meaningless alt', `"${alt}" on ${src}`)
    }
    if (REDUNDANT.test(alt)) {
      flag(page, '1.1.1 redundant phrasing', `alt starts with a filler phrase: "${alt}"`)
    }
    if (alt.length > 0 && alt.length < 12 && !/^\d/.test(alt)) {
      flag(page, '1.1.1 alt too short', `"${alt}" on ${src} is unlikely to convey the image`)
    }
    if (alt.length > 500) {
      flag(
        page,
        '1.1.1 alt too long',
        `${alt.length} chars on ${src}; long descriptions belong in visible text`,
      )
    }
    // An alt that repeats the filename is a filename, not a description.
    const file = decodeURIComponent(src.split('/').pop() ?? '').replace(/\.[a-z0-9]+$/i, '')
    if (file && alt.toLowerCase().replace(/[^a-z0-9]/g, '') === file.toLowerCase().replace(/[^a-z0-9]/g, '')) {
      flag(page, '1.1.1 alt is the filename', `"${alt}" on ${src}`)
    }
  }

  // 2. Elements standing in for an image via role="img".
  for (const tag of html.match(/<div\b[^>]*role="img"[^>]*>/gi) ?? []) {
    stats.roleImg += 1
    const name = attr(tag, 'aria-label') ?? attr(tag, 'aria-labelledby')
    if (!name) {
      flag(page, '1.1.1 unnamed role="img"', 'element with role="img" has no accessible name')
      continue
    }
    const label = decode(name)
    if (USELESS.test(label) || label.length < 12) {
      flag(page, '1.1.1 weak role="img" name', `"${label}"`)
    }
  }

  // 3. Background images carrying meaning without a role. A decorative
  //    background is fine; one nobody can perceive but that carries content
  //    is a 1.1.1 failure, so surface them for a human decision.
  for (const tag of html.match(/<div\b[^>]*style="[^"]*background-image[^"]*"[^>]*>/gi) ?? []) {
    stats.backgrounds += 1
    if (!/role="img"/i.test(tag) && !/aria-hidden="true"/i.test(tag)) {
      const url = (tag.match(/url\(['"]?([^'")]+)/) ?? [])[1] ?? '(unknown)'
      flag(page, 'background image unlabelled', `${url} has neither role="img" nor aria-hidden`)
    }
  }

  // 4. SVGs used as images need a name; decorative ones must be hidden.
  for (const tag of html.match(/<svg\b[^>]*>/gi) ?? []) {
    const role = attr(tag, 'role')
    const hidden = attr(tag, 'aria-hidden') === 'true'
    const name = attr(tag, 'aria-label') ?? attr(tag, 'aria-labelledby')
    if (role === 'img' && !name) {
      flag(page, '1.1.1 unnamed svg', 'svg with role="img" has no accessible name')
    }
    if (!hidden && role !== 'img' && !name) {
      flag(page, 'svg not hidden', 'decorative svg is neither aria-hidden nor named')
    }
  }
}

let checked = 0
for (const prefix of LOCALES) {
  for (const route of ROUTES) {
    const path = `${prefix}${route === '/' ? '' : route}` || '/'
    try {
      const res = await fetch(`${BASE}${path}`)
      if (!res.ok) {
        flag(path, 'http', `returned ${res.status}`)
        continue
      }
      audit(path, await res.text())
      checked += 1
    } catch (e) {
      flag(path, 'fetch', String(e))
    }
  }
}

console.log(`\nImage audit: ${checked} pages across 3 languages`)
console.log(
  `  <img> elements: ${stats.imgs}  (${stats.described} described, ${stats.decorative} marked decorative)`,
)
console.log(`  role="img" elements: ${stats.roleImg}`)
console.log(`  background images: ${stats.backgrounds}\n`)

if (problems.length === 0) {
  console.log('Every image carries a text alternative that describes it.\n')
  process.exit(0)
}

const byRule = new Map()
for (const p of problems) {
  if (!byRule.has(p.rule)) byRule.set(p.rule, [])
  byRule.get(p.rule).push(p)
}
for (const [rule, items] of [...byRule].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`${rule}  (${items.length})`)
  const seen = new Set()
  for (const item of items) {
    if (seen.has(item.detail)) continue
    seen.add(item.detail)
    console.log(`   ${item.detail}`)
  }
  console.log()
}
console.log(`${problems.length} issue(s).`)
process.exit(1)
