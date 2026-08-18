#!/usr/bin/env node
/**
 * Structural accessibility audit against the served HTML.
 *
 * Checks the WCAG 2.1 AA failure modes that are visible in markup: missing or
 * useless alt text, unlabelled controls, skipped heading levels, duplicate ids,
 * missing landmarks and page titles, link text that says nothing, and a locked
 * viewport.
 *
 * Contrast is checked separately and exactly by scripts/contrast.mjs.
 * Run: node scripts/a11y-audit.mjs [baseUrl]
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

const USELESS_ALT = /^(image|photo|picture|img|graphic|logo|icon|banner|\d+|.*\.(jpe?g|png|gif|webp|svg))$/i
const USELESS_LINK = /^(click here|here|read more|more|link|this|learn more)$/i

const problems = []
function flag(page, rule, detail) {
  problems.push({ page, rule, detail })
}

function attr(tag, name) {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`, 'i'))
  return m ? m[1] : null
}

function hasAttr(tag, name) {
  return new RegExp(`\\b${name}\\b`, 'i').test(tag)
}

function audit(page, html) {
  // 3.1.1 Language of Page
  const htmlTag = html.match(/<html[^>]*>/i)?.[0] ?? ''
  const lang = attr(htmlTag, 'lang')
  if (!lang) flag(page, '3.1.1 lang', 'The <html> element has no lang attribute')

  // 2.4.2 Page Titled
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim()
  if (!title) flag(page, '2.4.2 title', 'The page has no <title>')

  // 1.4.4 Resize Text: a locked viewport blocks zoom.
  const viewport = html.match(/<meta[^>]*name="viewport"[^>]*>/i)?.[0] ?? ''
  if (/user-scalable\s*=\s*no/i.test(viewport)) {
    flag(page, '1.4.4 zoom', 'The viewport blocks pinch zoom')
  }
  const maxScale = viewport.match(/maximum-scale\s*=\s*([\d.]+)/i)
  if (maxScale && Number(maxScale[1]) < 2) {
    flag(page, '1.4.4 zoom', `maximum-scale is ${maxScale[1]}, below 2`)
  }

  // 1.1.1 Non-text Content
  for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
    const alt = attr(tag, 'alt')
    const decorative = alt === '' || attr(tag, 'aria-hidden') === 'true'
    if (alt === null) {
      flag(page, '1.1.1 alt', `<img> with no alt: ${attr(tag, 'src')}`)
    } else if (!decorative && USELESS_ALT.test(alt.trim())) {
      flag(page, '1.1.1 alt', `alt text says nothing useful: "${alt}"`)
    }
  }

  // Images built as background divs still need an accessible name.
  for (const tag of html.match(/<div\b[^>]*role="img"[^>]*>/gi) ?? []) {
    const name = attr(tag, 'aria-label') ?? attr(tag, 'aria-labelledby')
    if (!name) flag(page, '1.1.1 alt', 'role="img" element with no accessible name')
  }

  // 4.1.2 Name, Role, Value: every control needs a name.
  for (const tag of html.match(/<button\b[^>]*>[\s\S]*?<\/button>/gi) ?? []) {
    const open = tag.match(/<button\b[^>]*>/i)?.[0] ?? ''
    const text = tag.replace(/<[^>]*>/g, '').trim()
    const named = text || attr(open, 'aria-label') || attr(open, 'aria-labelledby')
    if (!named) flag(page, '4.1.2 button name', 'Button with no accessible name')
  }

  for (const tag of html.match(/<a\b[^>]*>[\s\S]*?<\/a>/gi) ?? []) {
    const open = tag.match(/<a\b[^>]*>/i)?.[0] ?? ''
    if (!hasAttr(open, 'href')) continue
    const text = tag.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
    const named = text || attr(open, 'aria-label') || attr(open, 'aria-labelledby')
    if (!named) {
      flag(page, '2.4.4 link name', `Link with no text: ${attr(open, 'href')}`)
    } else if (text && USELESS_LINK.test(text)) {
      flag(page, '2.4.4 link text', `Link text is not descriptive: "${text}"`)
    }
    // 3.2.5: a new tab should be announced, not sprung on the reader.
    // These are the exact strings in content/{en,es,ru}/site.ts.
    const NEW_TAB_PHRASES =
      /opens in a new tab|se abre en una pestaña nueva|откроется в новой вкладке/i
    if (attr(open, 'target') === '_blank' && !NEW_TAB_PHRASES.test(tag)) {
      flag(page, '3.2.5 new tab', `Opens a new tab with no warning: ${attr(open, 'href')}`)
    }
  }

  // 3.3.2 Labels or Instructions
  const labelFor = new Set(
    (html.match(/<label\b[^>]*for="([^"]+)"/gi) ?? []).map((l) => attr(l, 'for')),
  )
  for (const tag of html.match(/<(input|textarea|select)\b[^>]*>/gi) ?? []) {
    const type = (attr(tag, 'type') ?? 'text').toLowerCase()
    if (['hidden', 'submit', 'button', 'reset'].includes(type)) continue
    const id = attr(tag, 'id')
    const named =
      (id && labelFor.has(id)) || attr(tag, 'aria-label') || attr(tag, 'aria-labelledby')
    if (!named) flag(page, '3.3.2 label', `Form control with no label: ${id ?? attr(tag, 'name')}`)
  }

  // 4.1.1 duplicate ids break every aria reference that points at them.
  const ids = (html.match(/\sid="([^"]+)"/g) ?? []).map((m) => m.slice(5, -1))
  const seen = new Set()
  for (const id of ids) {
    if (seen.has(id)) flag(page, '4.1.1 duplicate id', `id="${id}" appears more than once`)
    seen.add(id)
  }

  // 1.3.1 Info and Relationships: heading structure.
  const headings = [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({
    level: Number(m[1]),
    text: m[2].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim(),
  }))
  const h1s = headings.filter((h) => h.level === 1)
  if (h1s.length === 0) flag(page, '1.3.1 headings', 'Page has no h1')
  if (h1s.length > 1) flag(page, '1.3.1 headings', `Page has ${h1s.length} h1 elements`)
  let previous = 0
  for (const h of headings) {
    if (previous && h.level > previous + 1) {
      flag(page, '1.3.1 headings', `Heading jumps from h${previous} to h${h.level} at "${h.text}"`)
    }
    previous = h.level
  }
  for (const h of headings) {
    if (!h.text) flag(page, '1.3.1 headings', `Empty h${h.level}`)
  }

  // 1.3.1 / 2.4.1 landmarks and skip link.
  if (!/<main\b/i.test(html)) flag(page, '1.3.1 landmarks', 'No <main> landmark')
  if (!/<header\b/i.test(html)) flag(page, '1.3.1 landmarks', 'No <header> landmark')
  if (!/<footer\b/i.test(html)) flag(page, '1.3.1 landmarks', 'No <footer> landmark')
  if (!/href="#main-content"/i.test(html)) {
    flag(page, '2.4.1 skip link', 'No skip-to-content link')
  }

  // 2.4.6: more than one nav needs distinguishing names.
  const navs = html.match(/<nav\b[^>]*>/gi) ?? []
  if (navs.length > 1) {
    const unnamed = navs.filter((n) => !attr(n, 'aria-label') && !attr(n, 'aria-labelledby'))
    if (unnamed.length) {
      flag(page, '1.3.1 landmarks', `${unnamed.length} <nav> element(s) with no accessible name`)
    }
  }

  // A positive tabindex reorders the tab sequence unpredictably.
  for (const tag of html.match(/tabindex="(\d+)"/gi) ?? []) {
    const value = Number(tag.match(/\d+/)[0])
    if (value > 0) flag(page, '2.4.3 focus order', `Positive tabindex="${value}"`)
  }
}

const pages = LOCALES.flatMap((prefix) => ROUTES.map((r) => `${prefix}${r === '/' ? '' : r}` || '/'))

let checked = 0
for (const path of pages) {
  const url = `${BASE}${path}`
  let response
  try {
    response = await fetch(url, { redirect: 'follow' })
  } catch (error) {
    flag(path, 'fetch', String(error))
    continue
  }
  if (!response.ok) {
    flag(path, 'http', `Returned ${response.status}`)
    continue
  }
  audit(path, await response.text())
  checked += 1
}

console.log(`\nAccessibility audit: ${checked} pages checked across 3 languages\n`)

if (problems.length === 0) {
  console.log('No structural WCAG 2.1 AA issues found.\n')
  process.exit(0)
}

// Group so one systemic problem does not print 54 times.
const byRule = new Map()
for (const p of problems) {
  if (!byRule.has(p.rule)) byRule.set(p.rule, [])
  byRule.get(p.rule).push(p)
}

for (const [rule, items] of [...byRule].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`${rule}  (${items.length})`)
  const unique = new Map()
  for (const item of items) {
    if (!unique.has(item.detail)) unique.set(item.detail, [])
    unique.get(item.detail).push(item.page)
  }
  for (const [detail, pagesHit] of unique) {
    const where = pagesHit.length > 3 ? `${pagesHit.length} pages` : pagesHit.join(', ')
    console.log(`   ${detail}\n      on ${where}`)
  }
  console.log()
}

console.log(`${problems.length} issue(s) total.`)
process.exit(1)
