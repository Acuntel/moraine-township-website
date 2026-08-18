#!/usr/bin/env node
/**
 * Adds a real text layer to the scanned PDFs in the Township's archive.
 *
 * 88 of the 235 migrated PDFs are photographs of paper: 42 sets of Board
 * minutes, 10 budgets, 9 treasurer's reports and 4 tax levies among them. A
 * screen reader gets nothing from any of them, and under the DOJ Title II rule
 * a PDF a public entity publishes is covered web content. Accessible HTML
 * around an unreadable file does not fix the file.
 *
 * ocrmypdf runs Tesseract over each page and writes the recognised text back as
 * an invisible layer, leaving the scanned image exactly as it looks. The result
 * replaces the original in Blob at the same path, so every link already on the
 * site keeps working.
 *
 * Run: node scripts/ocr-documents.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, unlinkSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { put } from '@vercel/blob'

const ROOT = process.cwd()
const WORK = join(tmpdir(), 'moraine-ocr')
mkdirSync(WORK, { recursive: true })

const scan = JSON.parse(readFileSync(`${ROOT}/docs/pdf-accessibility.json`, 'utf8'))
const targets = scan.files.filter((f) => f.imageOnly)

console.log(`OCR over ${targets.length} scanned PDFs\n`)

const done = []
const failed = []
let i = 0

for (const doc of targets) {
  i += 1
  const src = join(WORK, 'in.pdf')
  const out = join(WORK, 'out.pdf')
  const pathname = `documents/${doc.url.split('/documents/')[1]}`

  try {
    const res = await fetch(doc.url)
    writeFileSync(src, Buffer.from(await res.arrayBuffer()))

    execFileSync(
      'ocrmypdf',
      [
        '--force-ocr', // the page is an image; there is nothing to preserve
        '--rotate-pages', // many were scanned sideways
        '--deskew',
        '--optimize',
        '1',
        '--language',
        'eng',
        '--quiet',
        src,
        out,
      ],
      { stdio: ['ignore', 'ignore', 'pipe'], timeout: 8 * 60 * 1000 },
    )

    // Confirm the OCR actually produced text before publishing over the original.
    const text = execFileSync('pdftotext', ['-l', '3', out, '-'], {
      encoding: 'utf8',
      maxBuffer: 20 * 1024 * 1024,
    })
    const chars = text.replace(/\s+/g, '').length
    if (chars < 100) {
      failed.push({ label: doc.label, reason: `OCR produced only ${chars} characters` })
      continue
    }

    const buf = readFileSync(out)
    await put(pathname, buf, {
      access: 'public',
      contentType: 'application/pdf',
      addRandomSuffix: false,
      allowOverwrite: true,
    })

    done.push({ label: doc.label, chars, bytes: buf.length })
    console.log(`  [${i}/${targets.length}] ${chars.toString().padStart(6)} chars  ${doc.label.slice(0, 52)}`)
  } catch (e) {
    const msg = (e.stderr?.toString() || String(e)).split('\n')[0].slice(0, 110)
    failed.push({ label: doc.label, reason: msg })
    console.log(`  [${i}/${targets.length}] FAILED  ${doc.label.slice(0, 46)}  ${msg}`)
  } finally {
    for (const f of [src, out]) if (existsSync(f)) unlinkSync(f)
  }
}

writeFileSync(
  `${ROOT}/docs/ocr-result.json`,
  JSON.stringify({ ocred: done.length, failed, files: done }, null, 2),
)

console.log(`\nOCR complete: ${done.length} succeeded, ${failed.length} failed`)
if (failed.length) for (const f of failed.slice(0, 12)) console.log(`  ${f.label}: ${f.reason}`)
