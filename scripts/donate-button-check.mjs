#!/usr/bin/env node
/**
 * The floating Donate button on a phone: does it step aside while the reader
 * moves down the page, and does it come back when they stop, scroll up, or
 * reach either end?
 */
import { execFile } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const BASE = (process.argv[2] ?? 'https://moraine-food-pantry.vercel.app').replace(/\/$/, '')
const PORT = 9367

const profile = mkdtempSync(join(tmpdir(), 'moraine-fabb-'))
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

/** Visible state of the button plus how much text it currently covers. */
const STATE = `
  (() => {
    const fab = document.querySelector('a[href*="paypal"].fixed');
    if (!fab) return { error: 'no floating donate button' };
    const cs = getComputedStyle(fab);
    const f = fab.getBoundingClientRect();
    const onScreen = parseFloat(cs.opacity) > 0.5 && f.left < window.innerWidth - 8;
    let covered = 0;
    if (onScreen) {
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
          const ox = Math.min(r.right, f.right) - Math.max(r.left, f.left);
          const oy = Math.min(r.bottom, f.bottom) - Math.max(r.top, f.top);
          if (ox > 1 && oy > 1) { covered += 1; break; }
        }
      }
    }
    return { opacity: Number(cs.opacity), onScreen, coveredRuns: covered };
  })()
`

/** Scroll in steps so the listener sees real direction changes. */
async function scrollBy(ws, delta, steps = 6) {
  for (let i = 0; i < steps; i += 1) {
    await evaluate(ws, `window.scrollBy(0, ${Math.round(delta / steps)}); 'ok'`)
    await sleep(90)
  }
  await sleep(450)
}

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
      /* not up */
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

    for (const path of ['/services', '/food-pantry']) {
      await send(ws, 'Page.navigate', { url: `${BASE}${path}` })
      for (let i = 0; i < 60; i += 1) {
        await sleep(250)
        if (await evaluate(ws, `document.readyState === 'complete' && !!document.querySelector('header')`)) break
      }
      await sleep(1000)
      console.log(`\n=== ${label} ${width}px  ${path}`)

      const top = await evaluate(ws, STATE)
      record('visible at the top of the page', top.onScreen === true, `opacity ${top.opacity}`)

      await scrollBy(ws, 900)
      const down = await evaluate(ws, STATE)
      if (width === 390) {
        record('steps aside while reading down', down.onScreen === false, `opacity ${down.opacity}`)
        record('covers no text while reading down', down.coveredRuns === 0, `${down.coveredRuns} run(s)`)
      } else {
        record('stays put on desktop', down.onScreen === true, `opacity ${down.opacity}`)
      }

      await scrollBy(ws, -400)
      const up = await evaluate(ws, STATE)
      record('comes back when scrolling up', up.onScreen === true, `opacity ${up.opacity}`)

      // html has scroll-behavior: smooth, so a jump animates. Wait for the
      // scroll position to settle before reading the state, or the check lands
      // mid-animation while the page is still moving down.
      await evaluate(ws, `window.scrollTo(0, document.documentElement.scrollHeight); 'ok'`)
      let stable = 0
      let prev = -1
      for (let i = 0; i < 40 && stable < 3; i += 1) {
        await sleep(120)
        const y = await evaluate(ws, `Math.round(window.scrollY)`)
        stable = y === prev ? stable + 1 : 0
        prev = y
      }
      await sleep(300)
      const bottom = await evaluate(ws, STATE)
      record('visible at the end of the page', bottom.onScreen === true, `opacity ${bottom.opacity}`)

      // The realistic path: scroll down in steps until the footer is reached.
      await evaluate(ws, `window.scrollTo(0, 0); 'ok'`)
      await sleep(800)
      for (let i = 0; i < 40; i += 1) {
        const done = await evaluate(
          ws,
          `(() => { window.scrollBy(0, 500); const d = document.documentElement;
            return window.scrollY + window.innerHeight >= d.scrollHeight - 4; })()`,
        )
        await sleep(110)
        if (done) break
      }
      await sleep(700)
      const walked = await evaluate(ws, STATE)
      record('visible after scrolling down to the footer', walked.onScreen === true, `opacity ${walked.opacity}`)
    }
  }
  ws.close()
} finally {
  chrome.kill()
  await sleep(500)
  try {
    rmSync(profile, { recursive: true, force: true })
  } catch {
    /* fine */
  }
}

const failed = results.filter((r) => !r.pass)
console.log(`\n${results.length - failed.length}/${results.length} checks passed.`)
if (failed.length) process.exit(1)
