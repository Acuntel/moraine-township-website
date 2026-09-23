#!/usr/bin/env node
/**
 * The floating Donate button, on a phone and on a desktop.
 *
 * The rule it has to keep: wherever it is visible, it is not sitting on top of
 * words. On a phone the text column runs nearly the full width of the screen,
 * so a control fixed to the viewport has nowhere to sit that is not on the
 * text. Measured before the fix, it covered up to 74px of the ends of lines on
 * /services, which is about a fifth of the measure.
 *
 * So it steps aside while the reader moves down the page, and when things
 * settle it comes back only where it is not covering anything. Desktop is
 * unchanged: there the margins are wide enough for it to sit beside the text.
 *
 * Run: node scripts/donate-button-check.mjs [baseUrl]
 */
import { execFile } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const BASE = (process.argv[2] ?? 'https://moraine-food-pantry.vercel.app').replace(/\/$/, '')
const PORT = 9367

const PAGES = ['/services', '/food-pantry', '/about', '/ru/services']
/**
 * Every STEP px from the top to the bottom of each page. This used to be six
 * fixed stops down to 2200px, which quietly pinned the page layout: when the
 * committee's review moved the three long health insurance paragraphs to the
 * top of /services, every one of those stops landed on text, and the check
 * could neither see the button come back further down nor see it land on a
 * voter registration link at 2600px. Sweeping the whole page tests the rule
 * as written, wherever the reader stops.
 */
const STEP = 300

const profile = mkdtempSync(join(tmpdir(), 'moraine-donate-'))
const chrome = execFile(CHROME, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profile}`,
  '--no-first-run',
  '--disable-gpu',
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
async function evaluate(ws, expression) {
  const res = await send(ws, 'Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  })
  return res.result?.value
}

/**
 * Is it visible, and if so how many runs of text is it covering?
 *
 * Only painted text counts. A screen reader note is clipped to one pixel and
 * the body of a closed <details> is not drawn at all, but both still report
 * line boxes, so a raw rectangle test calls the button "on top of" words no
 * sighted reader can see. The overlap is cut down to what every clipping
 * ancestor lets through, and hidden elements are skipped, before it counts.
 */
const STATE = `
  (() => {
    const fab = document.querySelector('a[href*="paypal"].fixed');
    if (!fab) return { error: 'no floating donate button' };
    const cs = getComputedStyle(fab);
    const f = fab.getBoundingClientRect();
    const visible = parseFloat(cs.opacity) > 0.5 && f.left < window.innerWidth - 8;
    let covered = 0;
    const samples = [];
    if (visible) {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        if (!node.textContent.trim()) continue;
        const el = node.parentElement;
        if (!el || fab.contains(el)) continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        for (const r of range.getClientRects()) {
          if (r.width === 0 || r.height === 0) continue;
          let x0 = Math.max(r.left, f.left), x1 = Math.min(r.right, f.right);
          let y0 = Math.max(r.top, f.top), y1 = Math.min(r.bottom, f.bottom);
          if (x1 - x0 <= 1 || y1 - y0 <= 1) continue;
          if (!el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) break;
          for (let a = el; a && a !== document.documentElement; a = a.parentElement) {
            const s = getComputedStyle(a);
            if (s.overflowX === 'visible' && s.overflowY === 'visible' && s.clip === 'auto') continue;
            const c = a.getBoundingClientRect();
            x0 = Math.max(x0, c.left); x1 = Math.min(x1, c.right);
            y0 = Math.max(y0, c.top); y1 = Math.min(y1, c.bottom);
          }
          if (x1 - x0 > 1 && y1 - y0 > 1) {
            covered += 1;
            if (samples.length < 2) samples.push(node.textContent.trim().slice(0, 40));
            break;
          }
        }
      }
    }
    return { visible, covered, samples };
  })()
`

const results = []
function record(name, pass, detail = '') {
  results.push({ name, pass })
  console.log(`  ${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`)
}

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

  for (const [width, label] of [
    [390, 'phone'],
    [1280, 'desktop'],
  ]) {
    await send(ws, 'Emulation.setDeviceMetricsOverride', {
      width,
      height: width === 390 ? 844 : 900,
      deviceScaleFactor: 2,
      mobile: width === 390,
    })

    for (const path of PAGES) {
      await send(ws, 'Page.navigate', { url: `${BASE}${path}` })
      for (let i = 0; i < 60; i += 1) {
        await sleep(200)
        if (await evaluate(ws, `document.readyState === 'complete' && !!document.querySelector('header')`)) break
      }
      await sleep(900)
      console.log(`\n=== ${label} ${width}px  ${path}`)

      let everVisible = false
      let worst = null

      const height = await evaluate(ws, 'document.documentElement.scrollHeight')
      const stops = []
      for (let y = 0; y < height; y += STEP) stops.push(y)
      stops.push(height)

      for (const y of stops) {
        // Step rather than jump: html sets scroll-behavior: smooth, and a jump
        // is still animating when a naive check reads the state.
        await evaluate(ws, `window.scrollTo({ top: ${y}, behavior: 'auto' }); 'ok'`)
        await sleep(600)
        const s = await evaluate(ws, STATE)
        if (s?.error) {
          record(`state at ${y}px`, false, s.error)
          continue
        }
        if (s.visible) everVisible = true
        if (s.visible && s.covered > 0 && !worst) worst = { y, ...s }
      }

      if (width === 390) {
        record(
          'never visible on top of text',
          !worst,
          worst ? `at ${worst.y}px it covered "${worst.samples[0]}"` : 'all stops clean',
        )
        record('still shows up somewhere on the page', everVisible, `${stops.length} stops to ${height}px`)
      } else {
        record('stays visible on desktop', everVisible)
      }
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

const failed = results.filter((r) => !r.pass)
console.log(`\n${results.length - failed.length}/${results.length} checks passed.`)
if (failed.length) process.exit(1)
