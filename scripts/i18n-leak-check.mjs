#!/usr/bin/env node
/**
 * Catches English leaking onto the Spanish and Russian pages.
 *
 * The Dictionary type guarantees every key is translated, but it cannot see a
 * string written straight into JSX or pulled from lib/township.ts. Those are
 * exactly the leaks this finds, by diffing the visible text of each localized
 * page against its English counterpart: any sentence that is byte-identical in
 * both, and is not a proper noun or a number, never got translated.
 *
 * Run: node scripts/i18n-leak-check.mjs [baseUrl]
 */

import { readFileSync } from 'node:fs'

const BASE = process.argv[2] ?? 'http://localhost:3111'

/**
 * The Township's document titles are the real names of records of the Township:
 * "Comptroller Report FYE24" is what that file is called, and renaming it per
 * language would misrepresent the record. They are allowed to be identical
 * across languages, and are matched against the actual manifest rather than a
 * guessed pattern so a genuine untranslated sentence cannot slip through here.
 */
const DOCUMENT_LABELS = new Set(
  JSON.parse(readFileSync(new URL('../lib/documents.json', import.meta.url), 'utf8'))
    .migrated.map((d) => d.label.trim()),
)

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
]

/**
 * Text that is legitimately identical across languages: the Township's own
 * name, proper nouns, addresses, statute citations, emails, phone numbers,
 * organization names, and anything mostly punctuation or digits.
 */
const ALLOWED = [
  /^[\d\s.,:%$()+-]*$/,
  // An address, or the half of one before the break the About page allows
  // after the @ so a long address can wrap on a phone.
  /^[\w.+-]+@([\w.-]+)?$/,
  /morainetownship|moraine township|highland park|highwood|lake forest|deerfield/i,
  /^\d{3}-\d{3}-\d{4}$/,
  /ilcs|cfr|wcag|foia|snap|tanf|liheap|vita|rta|paypal|amazon|comed|medicare|medicaid|irs|ada|aca|ship|cims|metra|pads|hp\/rfts/i,
  /^(english|español|русский|admin|moraine|township|est|aca|ship)$/i,
  /a safe place|blessings in a backpack|center for enriched living|college bound|community partners|family focus|fenix|josselyn|north suburban|omnis|tri-con|partners in aging|sunset foods|braeside|mooney|daggitt|st\. johns|ridge road|lake cook|green bay/i,
  // The three application links appear in all three languages on every page
  // by design, so a Russian speaker sees the Russian option without switching.
  /^(english application|solicitud en español|заявление на русском языке)$/i,
  /^\d+ [A-Z][a-z]+ (Avenue|Street|Road|Drive)$/,
  /jewish child|safe place|backpack|enriched living/i,
  /charitable fund|26-4269258|travel\.state\.gov|voter power|north shore gas|tyler|healy|shafer|jenn|guerrero|haggarty|jacoby|levin|contreras|valle|abazovic|hoffman|machabanski|innes|adelman|greene|gordon/i,
]

/**
 * The patterns above name people and places, so on their own they would wave
 * through any paragraph that mentions one: a whole English bio passed because
 * it contained "Jenn". A name excuses a short label, never a sentence.
 */
const SHORT_LABEL = 80

/**
 * Members of the Township's boards and committees, listed on /foia. A person's
 * name is the same in every language, so it is read from the roster itself
 * rather than added here by hand, where a new member would show up as a leak.
 */
const ROSTER_NAMES = new Set(
  [...readFileSync(new URL('../lib/bodies.ts', import.meta.url), 'utf8').matchAll(/name: "([^"]+)"/g)].map(
    (m) => m[1],
  ),
)

function allowed(text) {
  if (DOCUMENT_LABELS.has(text.trim())) return true
  if (ROSTER_NAMES.has(text.trim())) return true
  if (text.length > SHORT_LABEL) return false
  return ALLOWED.some((re) => re.test(text))
}

/**
 * English that is meant to be English: the officials' own bios and the
 * archival cemetery histories. The page marks those blocks lang="en", which a
 * screen reader needs anyway (WCAG 3.1.2), so the check trusts the markup and
 * drops the block. Anything English that is not marked still counts as a leak.
 */
const VOID_TAGS = new Set(['area', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'])

function withoutMarkedEnglish(html) {
  let out = html
  for (;;) {
    const open = /<([a-z][a-z0-9]*)\b[^>]*\slang="en"[^>]*>/i.exec(out)
    if (!open) return out
    const tag = open[1].toLowerCase()
    // A void element has no content to drop; removing "to its close tag"
    // would silently delete the rest of the page and pass everything.
    if (VOID_TAGS.has(tag) || open[0].endsWith('/>')) {
      out = out.slice(0, open.index) + out.slice(open.index + open[0].length)
      continue
    }
    const tagRe = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'gi')
    tagRe.lastIndex = open.index + open[0].length
    let depth = 1
    let end = out.length
    for (let m; (m = tagRe.exec(out)); ) {
      depth += m[1] ? -1 : 1
      if (depth === 0) {
        end = m.index + m[0].length
        break
      }
    }
    if (depth !== 0) throw new Error(`unclosed <${tag} lang="en"> in the page`)
    out = out.slice(0, open.index) + out.slice(end)
  }
}

/** Pull visible text nodes, skipping script/style and screen-reader-only spans. */
function visibleText(html) {
  const body = withoutMarkedEnglish(html.slice(html.indexOf('<body')))
  const stripped = body
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
  const out = []
  for (const m of stripped.matchAll(/>([^<>]{12,})</g)) {
    const text = m[1]
      .replace(/&#x27;|&#39;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    if (text) out.push(text)
  }
  return out
}

const leaks = []
let checked = 0

for (const route of ROUTES) {
  const en = await fetch(`${BASE}${route}`).then((r) => r.text())
  const enText = new Set(visibleText(en))

  for (const locale of ['es', 'ru']) {
    const loc = await fetch(`${BASE}/${locale}${route === '/' ? '' : route}`).then((r) =>
      r.text(),
    )
    checked += 1
    for (const text of new Set(visibleText(loc))) {
      if (!enText.has(text)) continue
      if (allowed(text)) continue
      // Russian and Spanish share almost no vocabulary with English, so an
      // identical sentence of real words is a leak, not a coincidence.
      leaks.push({ route: `/${locale}${route}`, text })
    }
  }
}

console.log(`\ni18n leak check: ${checked} localized pages compared against English\n`)

if (leaks.length === 0) {
  console.log('No untranslated strings found.\n')
  process.exit(0)
}

const byText = new Map()
for (const leak of leaks) {
  if (!byText.has(leak.text)) byText.set(leak.text, [])
  byText.get(leak.text).push(leak.route)
}

for (const [text, routes] of [...byText].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`  "${text.slice(0, 110)}${text.length > 110 ? '…' : ''}"`)
  console.log(`     on ${routes.length > 4 ? `${routes.length} pages` : routes.join(', ')}`)
}

console.log(`\n${byText.size} untranslated string(s) across ${leaks.length} page hits.`)
process.exit(1)
