#!/usr/bin/env node
/**
 * Every page in three languages, in a real browser, watching for the failures
 * that never show up in HTML: JavaScript exceptions, console errors, and
 * requests that came back 4xx or 5xx or never came back at all.
 *
 * A page can render perfectly and still be broken this way. A missing image, a
 * font that 404s, a script that throws after hydration: the markup audits see
 * none of it, because the HTML is fine and the failure happens in the browser.
 *
 * Run: node scripts/console-check.mjs [baseUrl]
 */
import { execFile } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const BASE = (process.argv[2] ?? 'https://moraine-food-pantry.vercel.app').replace(/\/$/, '')
const PORT = 9371

const PAGES = [
  '/',
  '/about',
  '/services',
  '/food-pantry',
  '/assessor',
  '/transportation',
  '/board-meetings',
  '/cemeteries',
  '/programs',
  '/get-involved',
  '/donate',
  '/foia',
  '/contact',
  '/thank-you',
]
const LANGS = ['', '/es', '/ru']

/** Noise that is not the site's fault and cannot be fixed from here. */
const IGNORE = [
  /favicon\.ico/i, // legacy path, harmless, documented
  /chrome-extension:/i,
  /DevTools/i,
]

const profile = mkdtempSync(join(tmpdir(), 'moraine-console-'))
const chrome = execFile(CHROME, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profile}`,
  '--no-first-run',
  '--disable-gpu',
  '--window-size=1280,900',
  'about:blank',
])
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

let id = 0
function send(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const msgId = (id += 1)
    const onMessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.id !== msgId) return
      ws.removeEventListener('message', onMessage)
      data.error ? reject(new Error(data.error.message)) : resolve(data.result)
    }
    ws.addEventListener('message', onMessage)
    ws.send(JSON.stringify({ id: msgId, method, params }))
  })
}

const problems = []
let checked = 0

try {
  let page
  for (let i = 0; i < 40 && !page; i += 1) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()
      page = list.find((t) => t.type === 'page')
    } catch {
      /* not up yet */
    }
    if (!page) await sleep(250)
  }
  const ws = new WebSocket(page.webSocketDebuggerUrl)
  await new Promise((r) => ws.addEventListener('open', r, { once: true }))
  await send(ws, 'Page.enable')
  await send(ws, 'Runtime.enable')
  await send(ws, 'Log.enable')
  await send(ws, 'Network.enable')

  let current = ''
  const note = (kind, detail) => {
    if (IGNORE.some((re) => re.test(detail))) return
    problems.push({ page: current, kind, detail })
  }

  ws.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data)
    if (msg.method === 'Runtime.exceptionThrown') {
      const d = msg.params.exceptionDetails
      note('exception', d.exception?.description ?? d.text ?? 'unknown exception')
    }
    if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
      note('console.error', msg.params.args.map((a) => a.value ?? a.description ?? '').join(' ').slice(0, 200))
    }
    if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') {
      note('log', `${msg.params.entry.text} ${msg.params.entry.url ?? ''}`.slice(0, 200))
    }
    if (msg.method === 'Network.responseReceived') {
      const { status, url } = msg.params.response
      if (status >= 400) note(`http ${status}`, url)
    }
    if (msg.method === 'Network.loadingFailed') {
      note('request failed', `${msg.params.errorText} ${msg.params.type}`)
    }
  })

  for (const lang of LANGS) {
    for (const path of PAGES) {
      const url = `${BASE}${lang}${path === '/' ? '' : path}` || `${BASE}/`
      current = `${lang || '/en'}${path}`
      await send(ws, 'Page.navigate', { url: url === BASE ? `${BASE}/` : url })
      for (let i = 0; i < 60; i += 1) {
        await sleep(200)
        const ready = await send(ws, 'Runtime.evaluate', {
          expression: `document.readyState === 'complete' && !!document.querySelector('header')`,
          returnByValue: true,
        })
        if (ready.result?.value) break
      }
      await sleep(700)
      checked += 1
    }
  }

  ws.close()
} finally {
  chrome.kill()
  await sleep(500)
  try {
    rmSync(profile, { recursive: true, force: true })
  } catch {
    /* a leftover temp directory is not worth failing an audit over */
  }
}

console.log(`Loaded ${checked} pages in three languages.`)
if (!problems.length) {
  console.log('No JavaScript errors, console errors or failed requests.')
  process.exit(0)
}

const byKind = new Map()
for (const p of problems) {
  const key = `${p.kind} :: ${p.detail}`
  if (!byKind.has(key)) byKind.set(key, [])
  byKind.get(key).push(p.page)
}
console.log(`\n${problems.length} problem(s), ${byKind.size} distinct:\n`)
for (const [key, pages] of byKind) {
  console.log(`  ${key}`)
  console.log(`      on ${pages.length} page(s), e.g. ${pages.slice(0, 3).join(', ')}`)
}
process.exit(1)
