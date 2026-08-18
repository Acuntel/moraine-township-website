#!/usr/bin/env node
/**
 * Keyboard checks that no static analysis and no axe rule can make.
 *
 * axe reads the DOM. It cannot press Tab, so it cannot tell you whether the
 * focus ring is actually visible, whether the order the focus travels in
 * matches the order things are read in, or whether a dialog quietly swallows
 * focus. WCAG 2.1.1 and 2.4.7 are about what happens when someone drives the
 * site from the keyboard, and the only way to know is to drive it.
 *
 *   node scripts/keyboard-check.mjs [baseUrl]
 */
import { execFile } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const BASE = (process.argv[2] ?? 'https://moraine-food-pantry.vercel.app').replace(/\/$/, '')
const PORT = 9388

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const profile = mkdtempSync(join(tmpdir(), 'moraine-kbd-'))
const chrome = execFile(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  '--no-first-run', '--disable-gpu', '--force-light-mode', '--window-size=1280,900', 'about:blank',
])

async function target() {
  for (let i = 0; i < 60; i += 1) {
    try {
      const l = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()
      const p = l.find((t) => t.type === 'page')
      if (p) return p
    } catch { /* starting */ }
    await sleep(250)
  }
  throw new Error('Chrome did not start')
}

let id = 0
const results = []
function record(name, pass, detail = '') {
  results.push({ name, pass })
  console.log(`  ${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`)
}

function send(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const msgId = (id += 1)
    const timer = setTimeout(() => reject(new Error(`${method} timed out`)), 60_000)
    const onMessage = (e) => {
      const d = JSON.parse(e.data)
      if (d.id !== msgId) return
      clearTimeout(timer)
      ws.removeEventListener('message', onMessage)
      d.error ? reject(new Error(d.error.message)) : resolve(d.result)
    }
    ws.addEventListener('message', onMessage)
    ws.send(JSON.stringify({ id: msgId, method, params }))
  })
}
const evaluate = async (ws, expr) =>
  (await send(ws, 'Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }))
    .result?.value

async function tab(ws) {
  // rawKeyDown then keyUp is what actually moves focus in headless Chrome.
  await send(ws, 'Input.dispatchKeyEvent', {
    type: 'rawKeyDown', windowsVirtualKeyCode: 9, key: 'Tab', code: 'Tab',
  })
  await send(ws, 'Input.dispatchKeyEvent', {
    type: 'keyUp', windowsVirtualKeyCode: 9, key: 'Tab', code: 'Tab',
  })
  await sleep(60)
}

async function load(ws, path) {
  await send(ws, 'Page.navigate', { url: BASE + path })
  for (let i = 0; i < 60; i += 1) {
    await sleep(200)
    if (await evaluate(ws, `document.readyState === 'complete'`)) break
  }
  await sleep(800)
}

/** Describe whatever currently has focus, and whether it looks focused. */
const FOCUS_PROBE = `(() => {
  const el = document.activeElement;
  if (!el || el === document.body) return null;
  const s = getComputedStyle(el);
  const visible =
    (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) ||
    (s.boxShadow && s.boxShadow !== 'none');
  const r = el.getBoundingClientRect();
  return {
    tag: el.tagName.toLowerCase(),
    text: (el.innerText || el.value || el.getAttribute('aria-label') || '').trim().slice(0, 40),
    visible,
    outline: s.outlineStyle + ' ' + s.outlineWidth + ' ' + s.outlineColor,
    onScreen: r.width > 0 && r.height > 0,
    inMain: !!el.closest('main'),
  };
})()`

try {
  const page = await target()
  const ws = new WebSocket(page.webSocketDebuggerUrl)
  await new Promise((r) => ws.addEventListener('open', r, { once: true }))
  await send(ws, 'Page.enable')
  await send(ws, 'Runtime.enable')
  console.log(`Keyboard checks on ${BASE}\n`)

  // ---- Focus visibility, WCAG 2.4.7 ---------------------------------------
  await load(ws, '/')
  const seen = []
  let noRing = []
  for (let i = 0; i < 40; i += 1) {
    await tab(ws)
    const f = await evaluate(ws, FOCUS_PROBE)
    if (!f) continue
    seen.push(f)
    if (!f.visible && f.onScreen) noRing.push(`${f.tag} "${f.text}"`)
  }
  record(
    'every focused control shows a focus indicator (2.4.7)',
    noRing.length === 0,
    noRing.length ? noRing.slice(0, 3).join('; ') : `${seen.length} controls tabbed`,
  )
  record('tabbing actually reaches controls (2.1.1)', seen.length >= 10, `${seen.length} reached`)

  // ---- The skip link, WCAG 2.4.1 ------------------------------------------
  await load(ws, '/')
  await tab(ws)
  const first = await evaluate(ws, FOCUS_PROBE)
  record(
    'the first stop is the skip link (2.4.1)',
    !!first && /skip|saltar|перейти/i.test(first.text),
    first ? `${first.tag} "${first.text}"` : 'nothing focused',
  )
  record('the skip link is visible when focused', !!first && first.visible)

  // ---- The missed-call dialog ---------------------------------------------
  await load(ws, '/contact')
  await evaluate(
    ws,
    `localStorage.setItem('moraine.calledAt', String(Date.now()));
     document.dispatchEvent(new Event('visibilitychange'));
     window.dispatchEvent(new Event('focus'));`,
  )
  await sleep(1000)
  const open = await evaluate(ws, `!!document.querySelector('[aria-labelledby="lead-capture-heading"]')`)
  record('the dialog renders for these checks', open === true)

  if (open) {
    const named = await evaluate(
      ws,
      `(() => {
         const d = document.querySelector('[role="dialog"]');
         if (!d) return null;
         const id = d.getAttribute('aria-labelledby');
         const label = id && document.getElementById(id);
         return { hasRole: true, labelled: !!label, name: label ? label.textContent.trim() : '' };
       })()`,
    )
    record(
      'the dialog has a role and an accessible name (4.1.2)',
      !!named && named.labelled,
      named?.name ?? '',
    )

    // Every control inside it must be reachable and dismissible by keyboard.
    const reach = await evaluate(
      ws,
      `(() => {
         const d = document.querySelector('[role="dialog"]');
         const f = d.querySelectorAll('input, button, a[href], select, textarea');
         return { count: f.length,
                  allFocusable: [...f].every(el => el.tabIndex >= 0 && !el.disabled) };
       })()`,
    )
    record(
      'every control in the dialog is keyboard reachable (2.1.1)',
      !!reach && reach.allFocusable && reach.count >= 3,
      `${reach?.count ?? 0} controls`,
    )

    // 2.1.2: the reader must be able to get out again without a mouse.
    const dismissable = await evaluate(
      ws,
      `(() => {
         const d = document.querySelector('[role="dialog"]');
         return [...d.querySelectorAll('button')].some(
           b => b.type === 'button' && b.tabIndex >= 0);
       })()`,
    )
    record('the dialog can be dismissed from the keyboard (2.1.2)', dismissable === true)
  }

  // ---- Reduced motion, WCAG 2.3.3 -----------------------------------------
  await send(ws, 'Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
  })
  await load(ws, '/thank-you')
  await sleep(1200)
  const hearts = await evaluate(ws, `document.querySelectorAll('.animate-float-up').length`)
  record('the hearts are suppressed under reduced motion (2.3.3)', hearts === 0, `${hearts} hearts`)

  const marquee = await load(ws, '/').then(() =>
    evaluate(
      ws,
      `(() => {
         const m = document.querySelector('.animate-marquee');
         if (!m) return 'absent';
         return getComputedStyle(m).animationName;
       })()`,
    ),
  )
  record(
    'the marquee stops under reduced motion (2.3.3)',
    marquee === 'none' || marquee === 'absent',
    String(marquee),
  )

  ws.close()
} finally {
  chrome.kill()
  await sleep(300)
  try {
    rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
  } catch { /* leftover profile is harmless */ }
}

const failed = results.filter((r) => !r.pass)
console.log(`\n${results.length - failed.length}/${results.length} passed`)
process.exit(failed.length ? 1 : 0)
