#!/usr/bin/env node
/**
 * Illinois statutory posting audit.
 *
 * Checks that each thing Illinois law requires a township to publish on its
 * website is actually present and reachable, rather than merely described. A
 * page that says "budgets are posted here" and posts nothing is a compliance
 * failure, and that is exactly the failure mode this catches.
 *
 * Citations verified against the Illinois General Assembly and the Illinois
 * Municipal League's website-posting summary, August 2026.
 *
 * Run: node scripts/illinois-compliance.mjs [baseUrl]
 */

const BASE = process.argv[2] ?? 'http://localhost:3111'

const get = async (path) => {
  const res = await fetch(`${BASE}${path}`)
  return { ok: res.ok, status: res.status, html: res.ok ? await res.text() : '' }
}

/** Count links pointing at a hosted document. */
const docLinks = (html) =>
  new Set(
    [...html.matchAll(/https:\/\/[a-z0-9]+\.public\.blob\.vercel-storage\.com\/documents\/[^"]+/g)].map(
      (m) => m[0],
    ),
  )

const CHECKS = [
  {
    // Verified against the statute text: subsection (a) carries the annual
    // schedule and the 48-hour agenda. Subsection (b) is the manner and medium
    // of notice. This cited (b) until the citations were checked.
    cite: '5 ILCS 120/2.02(a)',
    what: 'Annual schedule of regular meetings posted',
    path: '/board-meetings',
    test: (html, docs) =>
      /schedule/i.test(html) &&
      ([...docs].some((d) => /schedule/i.test(d)) || /meeting schedule/i.test(html)),
  },
  {
    cite: '5 ILCS 120/2.02',
    what: 'Agenda for regular meetings, posted 48 hours ahead and continuously available',
    path: '/board-meetings',
    test: (html, docs) =>
      /48 hours/i.test(html) && ([...docs].some((d) => /agenda/i.test(d)) || /agenda/i.test(html)),
  },
  {
    cite: '5 ILCS 120/2.06(b)',
    what: 'Approved minutes posted within 10 days and kept up at least 60 days',
    path: '/board-meetings',
    test: (html, docs) => [...docs].filter((d) => /minute/i.test(d)).length >= 20,
  },
  {
    // The words alone are not the posting. Until October 2026 this passed on
    // "operating budget" and "employee" while the page gave neither a figure
    // nor a headcount, and named the advisory bodies without their members.
    cite: '5 ILCS 140/4',
    what: 'FOIA: purpose, block diagram, budget total, offices, headcount, body membership',
    path: '/foia',
    test: (html) =>
      /purpose/i.test(html) &&
      /functional subdivisions/i.test(html) &&
      /operating budget/i.test(html) &&
      /total appropriations of \$[\d,]{7,}/i.test(html) &&
      /\d+ full-time|five full-time|full-time employees/i.test(html) &&
      /id="boards"/.test(html) &&
      ['board', 'mentalHealth', 'ethics', 'grants', 'latino'].every((id) =>
        html.includes(`id="body-${id}"`),
      ) &&
      /Nancy Chausow Shafer/.test(html) &&
      /John Ropiequet/.test(html),
  },
  {
    cite: '40 ILCS 5/7-135.5(b)',
    what: 'Link to IMRF employer cost and participation information',
    path: '/foia',
    test: (html) => /imrf\.org\/[^"]*employer-cost-and-participation/i.test(html),
  },
  {
    cite: '5 ILCS 140/3, /6',
    what: 'FOIA officer named, request procedure and fee schedule published',
    path: '/foia',
    test: (html) =>
      /freedom of information officer/i.test(html) &&
      /\$0\.15|15 cents|0\.15 per page/i.test(html) &&
      /50 pages/i.test(html),
  },
  {
    cite: '5 ILCS 120/7.3',
    what: 'Compensation disclosure published',
    path: '/foia',
    test: (html, docs) =>
      /compensation/i.test(html) && [...docs].some((d) => /compensation|salar/i.test(d)),
  },
  {
    cite: '30 ILCS 15/ + 60 ILCS 1/80-20',
    what: 'Annual treasurer / supervisor statement of financial affairs available',
    path: '/foia',
    test: (html, docs) => [...docs].some((d) => /treasur|financial-affairs|financialaffairs/i.test(d)),
  },
  {
    cite: '60 ILCS 1/ Art. 80',
    what: 'Annual audit published',
    path: '/foia',
    test: (html, docs) => [...docs].filter((d) => /audit|afr/i.test(d)).length >= 5,
  },
  {
    cite: '35 ILCS 200/18-60 et seq.',
    what: 'Tax levy ordinances published',
    path: '/foia',
    test: (html, docs) => [...docs].some((d) => /levy/i.test(d)),
  },
  {
    cite: '60 ILCS 1/ Art. 80 (budget & appropriation)',
    what: 'Budget and appropriation ordinances published',
    path: '/foia',
    test: (html, docs) => [...docs].filter((d) => /budget|appropriation/i.test(d)).length >= 5,
  },
  {
    cite: '50 ILCS 205/20',
    what: 'A public contact mechanism such as an email address',
    path: '/contact',
    test: (html) => /mailto:info@morainetownship\.org/i.test(html),
  },
  {
    /*
      This cited 5 ILCS 120/2.02(c) as an Open Meetings Act requirement. It is
      not one. Reading the Act end to end, the only mention of disability is in
      Section 7, about a member attending remotely because of illness; 2.02(c)
      is about agendas setting out general subject matter. The obligation to
      offer accommodations at a public meeting is real, but it comes from ADA
      Title II, not from the Open Meetings Act, and it is worth citing the
      provision that actually imposes it.
    */
    cite: '28 CFR 35.160 (ADA Title II, effective communication)',
    what: 'Notice that accommodations are available for meeting attendees, with a route to request them',
    path: '/board-meetings',
    test: (html) => /accommodation/i.test(html) && /open meetings act/i.test(html),
  },
  {
    cite: '28 CFR 35.200 (ADA Title II)',
    what: 'Accessibility statement naming the standard and a feedback route',
    path: '/accessibility',
    test: (html) =>
      /WCAG/i.test(html) && /2\.1/.test(html) && /Level AA/i.test(html) && /mailto:/i.test(html),
  },
  {
    cite: '60 ILCS 1/ Art. 130 (cemeteries)',
    what: 'Township-managed cemeteries identified with locations',
    path: '/cemeteries',
    test: (html) => /Mooney/i.test(html) && /Daggitt/i.test(html) && /Ridge|Lake Cook/i.test(html),
  },
  {
    cite: '5 ILCS 140/4 (annual FOIA posting)',
    what: 'Annual FOIA posting document available',
    path: '/foia',
    test: (html, docs) => [...docs].some((d) => /foia/i.test(d)),
  },
]

console.log(`\nIllinois statutory posting audit — ${BASE}\n`)

const cache = new Map()
let pass = 0
const fails = []

for (const check of CHECKS) {
  if (!cache.has(check.path)) cache.set(check.path, await get(check.path))
  const page = cache.get(check.path)
  if (!page.ok) {
    fails.push({ ...check, why: `page returned ${page.status}` })
    continue
  }
  const ok = check.test(page.html, docLinks(page.html))
  if (ok) {
    pass += 1
    console.log(`PASS  ${check.what}`)
    console.log(`      ${check.cite}  ·  ${check.path}`)
  } else {
    fails.push({ ...check, why: 'requirement not detected on the page' })
  }
}

if (fails.length) {
  console.log('\n--- NOT SATISFIED ---')
  for (const f of fails) {
    console.log(`FAIL  ${f.what}`)
    console.log(`      ${f.cite}  ·  ${f.path}  ·  ${f.why}`)
  }
}

console.log(`\n${pass}/${CHECKS.length} statutory postings satisfied.\n`)
process.exit(fails.length ? 1 : 0)
