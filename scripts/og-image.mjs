#!/usr/bin/env node
/**
 * Renders the social share card to public/images/og.png.
 *
 * Without one, every share of a Township page shows a blank card: on Facebook,
 * in a text message, on Nextdoor, in Slack. The site already declares
 * twitter:card="summary_large_image", which promises an image and then does not
 * supply one. For a Township that shares pantry hours and meeting notices, the
 * card is often the only thing a resident sees before deciding whether to tap.
 *
 * Rendered in headless Chrome rather than drawn by hand so the card uses the
 * real brand colours and the real typeface pairing, and so regenerating it
 * after a brand change is one command.
 *
 * Run: node scripts/og-image.mjs
 */
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const ROOT = process.cwd()
const OUT = join(ROOT, 'public', 'images', 'og.png')
const HERO = `file://${resolve(ROOT, 'public/images/hero-pantry.webp')}`

// Brand Kit colours. #005A60 carries white text at 7.6:1, so the wording on the
// card stays legible to someone reading it at thumbnail size.
const HTML = `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@700;900&family=Libre+Franklin:wght@500;600;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; overflow: hidden; position: relative;
         font-family: "Libre Franklin", Arial, sans-serif; background: #005A60; }
  .photo { position: absolute; inset: 0;
           background: url('${HERO}') center/cover no-repeat; }
  .scrim { position: absolute; inset: 0;
           background: linear-gradient(100deg,
             #004A50 0%, rgba(0,74,80,.97) 42%, rgba(0,90,96,.80) 62%,
             rgba(0,90,96,.35) 82%, rgba(0,90,96,.15) 100%); }
  .content { position: absolute; inset: 0; padding: 68px 72px;
             display: flex; flex-direction: column; justify-content: space-between; }
  .top { display: flex; align-items: center; gap: 22px; }
  .name { font-family: "Merriweather", Georgia, serif; font-weight: 900;
          font-size: 76px; line-height: 1.04; color: #FFFFFF;
          letter-spacing: -.5px; max-width: 760px; }
  .rule { width: 92px; height: 7px; background: #01A667;
          border-radius: 4px; margin: 26px 0 22px; }
  .tagline { font-size: 27px; line-height: 1.42; color: #DCEFE9;
             font-weight: 500; max-width: 700px; }
  .foot { display: flex; align-items: center; gap: 16px;
          font-size: 21px; font-weight: 600; color: #99D4AD; letter-spacing: .3px; }
  .dot { width: 6px; height: 6px; border-radius: 50%; background: #01A667; }
</style></head>
<body>
  <div class="photo"></div><div class="scrim"></div>
  <div class="content">
    <div class="top">
      <svg viewBox="0 0 120 120" width="96" height="96" aria-hidden="true">
        <circle cx="60" cy="60" r="60" fill="#01A667"/>
        <path d="M60 84c-14-9-24-17-24-28a13 13 0 0 1 24-7 13 13 0 0 1 24 7c0 11-10 19-24 28z"
              fill="#FFFFFF"/>
      </svg>
      <div class="foot" style="color:#FFFFFF;opacity:.92">EST. 1850</div>
    </div>
    <div>
      <div class="name">Moraine Township</div>
      <div class="rule"></div>
      <div class="tagline">A food pantry, emergency assistance, door-to-door
        transportation, and property assessment for residents of Highwood,
        Fort Sheridan, most of Highland Park, and parts of Lake Forest and
        Deerfield.</div>
    </div>
    <div class="foot">
      <span>morainetownship.org</span><span class="dot"></span>
      <span>English</span><span class="dot"></span>
      <span>Espa&#241;ol</span><span class="dot"></span>
      <span>&#1056;&#1091;&#1089;&#1089;&#1082;&#1080;&#1081;</span>
    </div>
  </div>
</body></html>`

const work = mkdtempSync(join(tmpdir(), 'moraine-og-'))
const page = join(work, 'card.html')
writeFileSync(page, HTML)

try {
  execFileSync(
    CHROME,
    [
      '--headless',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-color-profile=srgb',
      // Chrome honours the OS dark preference and would repaint the card.
      '--force-light-mode',
      '--window-size=1200,630',
      '--screenshot=' + OUT,
      '--virtual-time-budget=6000', // let the webfonts arrive
      '--allow-file-access-from-files',
      `file://${page}`,
    ],
    { stdio: ['ignore', 'ignore', 'pipe'], timeout: 60_000 },
  )
  console.log(`Wrote ${OUT}`)
} finally {
  rmSync(work, { recursive: true, force: true })
}
