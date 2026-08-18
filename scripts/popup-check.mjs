#!/usr/bin/env node
/**
 * Drives the two return-to-the-site prompts in a real browser.
 *
 * The unit tests check the decision logic, but the bug they were written for
 * was never in the logic. It was that the logic never ran: tapping Call hands
 * off to the phone app and clicking Donate opens PayPal in a new tab, so the
 * page never remounts and a mount-only effect fires once, too early, and never
 * again. Only a real browser can show that the listeners are attached and that
 * coming back actually triggers them.
 *
 * So this loads the deployed site, sets the same localStorage flag the buttons
 * set, dispatches the events a returning resident really produces, and looks at
 * the DOM for the result.
 *
 * Run: node scripts/popup-check.mjs [baseUrl]
 */
import { execFile } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const BASE = (process.argv[2] ?? 'https://moraine-food-pantry.vercel.app').replace(/\/$/, '')
const PORT = 9333

const profile = mkdtempSync(join(tmpdir(), 'moraine-popup-'))
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

async function target() {
  for (let i = 0; i < 40; i += 1) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()
      const page = list.find((t) => t.type === 'page')
      if (page) return page
    } catch {
      /* not up yet */
    }
    await sleep(250)
  }
  throw new Error('Chrome did not start')
}

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

/** Evaluate an expression in the page and return its value. */
async function evaluate(ws, expression) {
  const res = await send(ws, 'Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  })
  return res.result?.value
}

async function goto(ws, url) {
  await send(ws, 'Page.navigate', { url })
  // Wait for React to hydrate; the listeners are attached in an effect.
  for (let i = 0; i < 60; i += 1) {
    await sleep(250)
    const ready = await evaluate(
      ws,
      `document.readyState === 'complete' && !!document.querySelector('header')`,
    )
    if (ready) break
  }
  await sleep(1200)
}

/**
 * Reproduce what a browser does when the resident comes back to this tab. The
 * component listens for all three, so firing them together matches a real
 * return more closely than any single one.
 */
const RETURN_EVENTS = `
  document.dispatchEvent(new Event('visibilitychange'));
  window.dispatchEvent(new Event('focus'));
  window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }));
`

const results = []
function record(name, pass, detail = '') {
  results.push({ name, pass, detail })
  console.log(`  ${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`)
}

try {
  const page = await target()
  const ws = new WebSocket(page.webSocketDebuggerUrl)
  await new Promise((r) => ws.addEventListener('open', r, { once: true }))
  await send(ws, 'Page.enable')
  await send(ws, 'Runtime.enable')

  console.log(`Checking ${BASE}\n`)

  // ---- The missed-call follow-up -------------------------------------------
  console.log('Missed-call follow-up')
  await goto(ws, `${BASE}/contact`)

  const promptBefore = await evaluate(
    ws,
    `!!document.querySelector('[aria-labelledby="lead-capture-heading"]')`,
  )
  record('stays hidden when no call was placed', promptBefore === false)

  // Exactly what CallButton's onClick writes.
  await evaluate(ws, `localStorage.setItem('moraine.calledAt', String(Date.now()))`)
  await evaluate(ws, RETURN_EVENTS)
  await sleep(600)

  const promptAfter = await evaluate(
    ws,
    `!!document.querySelector('[aria-labelledby="lead-capture-heading"]')`,
  )
  record('appears immediately on returning to the site', promptAfter === true)

  const heading = await evaluate(
    ws,
    `document.querySelector('#lead-capture-heading')?.textContent ?? ''`,
  )
  record('shows the right prompt', /miss your call/i.test(heading ?? ''), heading)

  // The dialog must remain usable on a short viewport, which is WCAG 1.4.10.
  await send(ws, 'Emulation.setDeviceMetricsOverride', {
    width: 380,
    height: 420,
    deviceScaleFactor: 1,
    mobile: true,
  })
  await sleep(500)
  const fits = await evaluate(
    ws,
    `(() => {
       const el = document.querySelector('[aria-labelledby="lead-capture-heading"]');
       if (!el) return null;
       const r = el.getBoundingClientRect();
       return r.height <= window.innerHeight && r.top >= 0;
     })()`,
  )
  record('fits a short viewport instead of overflowing it', fits === true)
  await send(ws, 'Emulation.clearDeviceMetricsOverride')

  // ---- The donation thank-you ---------------------------------------------
  console.log('\nDonation thank-you')
  await evaluate(ws, `localStorage.clear()`)
  await goto(ws, `${BASE}/`)

  const urlBefore = await evaluate(ws, `location.pathname`)
  record('stays put when no donation was started', urlBefore === '/', urlBefore)

  // Exactly what markDonationStarted writes.
  await evaluate(
    ws,
    `localStorage.setItem('moraine.donationStarted', String(Date.now()))`,
  )
  await evaluate(ws, RETURN_EVENTS)

  // router.replace triggers an RSC fetch, so poll rather than guessing a delay.
  let urlAfter = '/'
  for (let i = 0; i < 40; i += 1) {
    await sleep(250)
    urlAfter = await evaluate(ws, `location.pathname`)
    if (urlAfter.includes('thank-you')) break
  }
  record(
    'sends the donor to the thank-you page right away',
    urlAfter.includes('thank-you'),
    urlAfter,
  )

  const hearts = await evaluate(
    ws,
    `document.querySelectorAll('.animate-float-up').length`,
  )
  record('the hearts are on the page', hearts > 0, `${hearts} hearts`)

  const flagCleared = await evaluate(
    ws,
    `localStorage.getItem('moraine.donationStarted') === null`,
  )
  record('clears the flag so it does not fire again', flagCleared === true)

  // ---- Both prompts, in Spanish and Russian --------------------------------
  // The thank-you route is locale aware, so a donor giving from /es must land
  // on /es/thank-you rather than being dropped into English.
  console.log('\nSpanish and Russian')
  for (const [locale, callHeading] of [
    ['es', /llamada/i],
    ['ru', /\u0437\u0432\u043e\u043d\u043e\u043a/i],
  ]) {
    await evaluate(ws, `localStorage.clear()`)
    await goto(ws, `${BASE}/${locale}/contact`)
    await evaluate(ws, `localStorage.setItem('moraine.calledAt', String(Date.now()))`)
    await evaluate(ws, RETURN_EVENTS)
    await sleep(900)
    const text = await evaluate(
      ws,
      `document.querySelector('#lead-capture-heading')?.textContent ?? ''`,
    )
    record(`${locale}: call prompt appears, in ${locale}`, callHeading.test(text ?? ''), text)

    await evaluate(ws, `localStorage.clear()`)
    await goto(ws, `${BASE}/${locale}`)
    await evaluate(
      ws,
      `localStorage.setItem('moraine.donationStarted', String(Date.now()))`,
    )
    await evaluate(ws, RETURN_EVENTS)
    let path = ''
    for (let i = 0; i < 40; i += 1) {
      await sleep(250)
      path = await evaluate(ws, `location.pathname`)
      if (path.includes('thank-you')) break
    }
    record(
      `${locale}: donor lands on the ${locale} thank-you page`,
      path === `/${locale}/thank-you`,
      path,
    )
  }

  ws.close()
} finally {
  chrome.kill()
  await sleep(300)
  try {
    rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
  } catch {
    // A leftover temp profile is harmless and must not mask the results.
  }
}

const failed = results.filter((r) => !r.pass)
console.log(`\n${results.length - failed.length}/${results.length} passed`)
process.exit(failed.length ? 1 : 0)
