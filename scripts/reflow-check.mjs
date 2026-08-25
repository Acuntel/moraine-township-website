#!/usr/bin/env node
/**
 * WCAG 2.1 AA 1.4.10 (Reflow): no horizontal scrolling at 320 CSS px.
 *
 * Measures documentElement.scrollWidth against the viewport at narrow widths
 * in all three languages, and names the widest offending elements so a failure
 * points at a selector rather than a screenshot.
 */
import { execFile } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const BASE = (process.argv[2] ?? 'https://moraine-food-pantry.vercel.app').replace(/\/$/, '')
const PORT = 9347

const PATHS = [
  '/',
  '/es',
  '/ru',
  '/food-pantry',
  '/assessor',
  '/board-meetings',
  '/get-involved',
  '/es/get-involved',
  '/ru/get-involved',
  '/es/assessor',
  '/ru/assessor',
]
const WIDTHS = [320, 390]

const profile = mkdtempSync(join(tmpdir(), 'moraine-reflow-'))
const chrome = execFile(CHROME, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profile}`,
  '--no-first-run',
  '--disable-gpu',
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

async function evaluate(ws, expression) {
  const res = await send(ws, 'Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  })
  return res.result?.value
}

/**
 * Elements whose painted box crosses the right edge of the viewport. A marquee
 * that scrolls its own track is expected to be wider than the screen, so this
 * reports the element chain and lets a human judge, but it only counts as a
 * failure when the document itself scrolls.
 */
const OFFENDERS = `
  (() => {
    const w = document.documentElement.clientWidth;
    const out = [];
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;
      if (r.right > w + 1) {
        const style = getComputedStyle(el);
        out.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className || '').toString().slice(0, 90),
          right: Math.round(r.right),
          overflowX: style.overflowX,
          text: (el.textContent || '').trim().slice(0, 45),
        });
      }
    }
    return out.slice(0, 8);
  })()
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

  for (const width of WIDTHS) {
    await send(ws, 'Emulation.setDeviceMetricsOverride', {
      width,
      height: 900,
      deviceScaleFactor: 2,
      mobile: true,
    })

    for (const path of PATHS) {
      await send(ws, 'Page.navigate', { url: `${BASE}${path}` })
      for (let i = 0; i < 60; i += 1) {
        await sleep(250)
        const ready = await evaluate(
          ws,
          `document.readyState === 'complete' && !!document.querySelector('header')`,
        )
        if (ready) break
      }
      await sleep(900)

      const m = await evaluate(
        ws,
        `({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth, bodyScroll: document.body.scrollWidth })`,
      )
      const overflow = m.scroll - m.client
      const pass = overflow <= 1
      record(
        `${width}px  ${path}`,
        pass,
        pass ? `${m.scroll}px in ${m.client}px` : `overflows by ${overflow}px`,
      )
      if (!pass) {
        const offenders = await evaluate(ws, OFFENDERS)
        for (const o of offenders ?? []) {
          console.log(
            `          <${o.tag} class="${o.cls}"> right=${o.right} overflow-x:${o.overflowX} "${o.text}"`,
          )
        }
      }
    }
  }

  ws.close()
} finally {
  chrome.kill()
  // Chrome writes to its profile as it exits, so removing it immediately loses
  // the race and throws ENOTEMPTY over a check that actually passed.
  await sleep(500)
  try {
    rmSync(profile, { recursive: true, force: true })
  } catch {
    /* a temp directory left behind is not worth failing an audit over */
  }
}

const failed = results.filter((r) => !r.pass)
console.log(`\n${results.length - failed.length}/${results.length} checks passed.`)
if (failed.length) {
  console.log('Horizontal scrolling at narrow widths fails WCAG 2.1 AA 1.4.10 (Reflow).')
  process.exit(1)
}
console.log('No horizontal scrolling at 320px or 390px in any language.')
