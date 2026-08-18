#!/usr/bin/env node
/**
 * Independent accessibility audit using axe-core.
 *
 * `scripts/a11y-audit.mjs` is ours, it reads raw HTML with regular expressions,
 * and it checks the fourteen or so failure modes we chose to check. That is
 * worth having, and it is also the site marking its own homework: it cannot see
 * the rendered DOM, cannot build the accessibility tree, cannot evaluate ARIA
 * validity, and never sees anything JavaScript draws, which includes the
 * missed-call dialog and the thank-you hearts.
 *
 * axe-core is Deque's engine, it is what most auditors and the major browser
 * extensions run, and it applies around a hundred rules against the live DOM.
 * Running it is how we find out whether our own audit was measuring the right
 * things.
 *
 * axe is fetched at run time rather than added as a dependency, so the site
 * keeps its four runtime packages and this stays a tool rather than part of the
 * build.
 *
 *   node scripts/axe-scan.mjs [baseUrl]
 *
 * Exits non-zero if any WCAG 2.1 A or AA violation is found.
 */
import { execFile } from 'node:child_process'
import { mkdtempSync, rmSync, existsSync, writeFileSync, readFileSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const BASE = (process.argv[2] ?? 'https://moraine-food-pantry.vercel.app').replace(/\/$/, '')
const PORT = 9377
const AXE_URL = 'https://cdn.jsdelivr.net/npm/axe-core@4.10.2/axe.min.js'
const CACHE = join(tmpdir(), 'moraine-axe', 'axe.min.js')

const ROUTES = [
  '/', '/about', '/services', '/food-pantry', '/assessor', '/transportation',
  '/board-meetings', '/cemeteries', '/cemeteries/mooney', '/cemeteries/daggitt',
  '/programs', '/get-involved', '/donate', '/thank-you', '/foia', '/contact',
  '/accessibility', '/news',
]
const LOCALES = ['', '/es', '/ru']

/** WCAG 2.1 Level A and AA, which is what ADA Title II now points at. */
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']

async function axeSource() {
  if (existsSync(CACHE)) return readFileSync(CACHE, 'utf8')
  const res = await fetch(AXE_URL)
  if (!res.ok) throw new Error(`Could not download axe-core: ${res.status}`)
  const src = await res.text()
  mkdirSync(join(tmpdir(), 'moraine-axe'), { recursive: true })
  writeFileSync(CACHE, src)
  return src
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const profile = mkdtempSync(join(tmpdir(), 'moraine-axe-'))
const chrome = execFile(CHROME, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profile}`,
  '--no-first-run',
  '--disable-gpu',
  '--force-light-mode',
  '--window-size=1280,900',
  'about:blank',
])

async function target() {
  for (let i = 0; i < 60; i += 1) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()
      const page = list.find((t) => t.type === 'page')
      if (page) return page
    } catch {
      /* still starting */
    }
    await sleep(250)
  }
  throw new Error('Chrome did not start')
}

let id = 0
function send(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const msgId = (id += 1)
    const timer = setTimeout(() => reject(new Error(`${method} timed out`)), 120_000)
    const onMessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.id !== msgId) return
      clearTimeout(timer)
      ws.removeEventListener('message', onMessage)
      data.error ? reject(new Error(data.error.message)) : resolve(data.result)
    }
    ws.addEventListener('message', onMessage)
    ws.send(JSON.stringify({ id: msgId, method, params }))
  })
}

async function evaluate(ws, expression) {
  const res = await send(ws, 'Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  })
  if (res.exceptionDetails) {
    throw new Error(res.exceptionDetails.exception?.description ?? 'evaluate failed')
  }
  return res.result?.value
}

const axe = await axeSource()
const findings = new Map() // rule id -> { rule, help, impact, wcag, pages:Set, sample }
const unverified = new Map() // axe could not decide; a human has to look
let scanned = 0
let failedPages = []

try {
  const page = await target()
  const ws = new WebSocket(page.webSocketDebuggerUrl)
  await new Promise((r) => ws.addEventListener('open', r, { once: true }))
  await send(ws, 'Page.enable')
  await send(ws, 'Runtime.enable')

  const pages = LOCALES.flatMap((p) => ROUTES.map((r) => `${p}${r === '/' ? '' : r}` || '/'))
  console.log(`axe-core against ${pages.length} pages on ${BASE}\n`)

  for (const path of pages) {
    const url = BASE + path
    await send(ws, 'Page.navigate', { url })
    for (let i = 0; i < 60; i += 1) {
      await sleep(200)
      const ready = await evaluate(ws, `document.readyState === 'complete'`)
      if (ready) break
    }
    await sleep(700) // let React hydrate before reading the DOM

    await evaluate(ws, axe)
    const result = await evaluate(
      ws,
      // Deliberately NOT resultTypes:['violations']. axe reports text drawn
      // over an image as *incomplete* rather than failing, because it cannot
      // sample the pixels behind it. Discarding incompletes therefore hides
      // exactly the contrast questions a human has to answer, and the hero on
      // this site is white text over a photograph.
      `(() => {
         const shape = v => ({
           id: v.id, help: v.help, impact: v.impact, tags: v.tags,
           nodes: v.nodes.slice(0, 2).map(n => ({
             target: n.target.join(' '), html: n.html.slice(0, 160) }))
         });
         return axe.run(document, { runOnly: { type: 'tag', values: ${JSON.stringify(TAGS)} } })
           .then(r => ({
             violations: r.violations.map(shape),
             incomplete: r.incomplete.map(shape),
           }))
           .catch(e => ({ error: String(e) }));
       })()`,
    )

    if (result?.error) {
      failedPages.push(`${path}: ${result.error}`)
      continue
    }
    scanned += 1
    for (const v of result.incomplete ?? []) {
      const entry = unverified.get(v.id) ?? {
        rule: v.id,
        help: v.help,
        wcag: v.tags.filter((t) => t.startsWith('wcag')).join(', '),
        pages: new Set(),
        sample: v.nodes[0],
      }
      entry.pages.add(path)
      unverified.set(v.id, entry)
    }
    for (const v of result.violations) {
      const entry = findings.get(v.id) ?? {
        rule: v.id,
        help: v.help,
        impact: v.impact,
        wcag: v.tags.filter((t) => t.startsWith('wcag')).join(', '),
        pages: new Set(),
        sample: v.nodes[0],
      }
      entry.pages.add(path)
      findings.set(v.id, entry)
    }
    process.stdout.write(
      `  ${result.violations.length === 0 ? '.' : 'X'}${scanned % 54 === 0 ? '\n' : ''}`,
    )
  }

  // ---- Interactive states -------------------------------------------------
  // The 54 page loads above never rendered the missed-call dialog, because it
  // only exists after someone has placed a call. A modal is exactly where
  // accessibility bugs live: unlabelled dialogs, controls with no name, focus
  // left behind. Scanning only the resting state of a page misses all of it.
  console.log('\n\nInteractive states')
  for (const [label, path, setup] of [
    [
      'missed-call dialog open',
      '/contact',
      `localStorage.setItem('moraine.calledAt', String(Date.now()));
       document.dispatchEvent(new Event('visibilitychange'));
       window.dispatchEvent(new Event('focus'));`,
    ],
  ]) {
    await send(ws, 'Page.navigate', { url: BASE + path })
    for (let i = 0; i < 60; i += 1) {
      await sleep(200)
      if (await evaluate(ws, `document.readyState === 'complete'`)) break
    }
    await sleep(900)
    await evaluate(ws, setup)
    await sleep(900)

    const present = await evaluate(
      ws,
      `!!document.querySelector('[aria-labelledby="lead-capture-heading"]')`,
    )
    if (!present) {
      failedPages.push(`${label}: the state never appeared, so it was not scanned`)
      continue
    }

    await evaluate(ws, axe)
    const res = await evaluate(
      ws,
      `axe.run(document, { runOnly: { type: 'tag', values: ${JSON.stringify(TAGS)} } })
         .then(r => ({ violations: r.violations.map(v => ({
            id: v.id, help: v.help, impact: v.impact, tags: v.tags,
            nodes: v.nodes.slice(0,2).map(n => ({ target: n.target.join(' '), html: n.html.slice(0,160) }))
         })) })).catch(e => ({ error: String(e) }))`,
    )
    if (res?.error) {
      failedPages.push(`${label}: ${res.error}`)
      continue
    }
    scanned += 1
    console.log(`  ${res.violations.length === 0 ? 'clean' : res.violations.length + ' violation(s)'}  ${label}`)
    for (const v of res.violations) {
      const entry = findings.get(v.id) ?? {
        rule: v.id, help: v.help, impact: v.impact,
        wcag: v.tags.filter((t) => t.startsWith('wcag')).join(', '),
        pages: new Set(), sample: v.nodes[0],
      }
      entry.pages.add(label)
      findings.set(v.id, entry)
    }
  }

  ws.close()
} finally {
  chrome.kill()
  await sleep(300)
  try {
    rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
  } catch {
    /* a leftover temp profile must not mask the result */
  }
}

console.log(`\n\nScanned ${scanned} pages with axe-core ${AXE_URL.match(/@([\d.]+)/)[1]}`)
if (failedPages.length) {
  console.log(`\n${failedPages.length} page(s) could not be scanned:`)
  for (const f of failedPages.slice(0, 10)) console.log(`  ${f}`)
}

const order = { critical: 0, serious: 1, moderate: 2, minor: 3 }
const list = [...findings.values()].sort(
  (a, b) => (order[a.impact] ?? 9) - (order[b.impact] ?? 9),
)

if (list.length === 0) {
  console.log('\nNo WCAG 2.1 A or AA violations found by axe-core.')
} else {
  console.log(`\n${list.length} distinct violation(s):\n`)
  for (const f of list) {
    console.log(`  [${(f.impact ?? 'n/a').toUpperCase()}] ${f.rule}`)
    console.log(`    ${f.help}`)
    console.log(`    ${f.wcag}`)
    console.log(`    on ${f.pages.size} page(s), e.g. ${[...f.pages].slice(0, 3).join(', ')}`)
    if (f.sample) console.log(`    ${f.sample.target}  ${f.sample.html.replace(/\s+/g, ' ')}`)
    console.log('')
  }
}

const needsEyes = [...unverified.values()]
if (needsEyes.length) {
  console.log(`${needsEyes.length} item(s) axe could not decide, needing a human look:\n`)
  for (const f of needsEyes) {
    console.log(`  ${f.rule}  (${f.wcag})`)
    console.log(`    ${f.help}`)
    console.log(`    on ${f.pages.size} page(s), e.g. ${[...f.pages].slice(0, 3).join(', ')}`)
    if (f.sample) console.log(`    ${f.sample.target}  ${f.sample.html.replace(/\s+/g, ' ')}`)
    console.log('')
  }
  console.log('These are not failures. They are the questions axe cannot answer,')
  console.log('usually text over a photograph. Each is checked by hand in')
  console.log('docs/ACCESSIBILITY.md rather than assumed to be fine.\n')
}

process.exit(list.length || failedPages.length ? 1 : 0)
