#!/usr/bin/env node
/**
 * Scans every migrated PDF for a text layer.
 *
 * Under ADA Title II the DOJ rule covers "web content", and a PDF a public
 * entity publishes is web content. A scanned page with no text layer is an
 * image of a document: a screen reader gets nothing from it, and no amount of
 * accessible HTML around the link changes that.
 *
 * Writes docs/pdf-accessibility.json so the remediation list is concrete rather
 * than an estimate.
 *
 * Needs poppler (`pdftotext`, `pdffonts`), already present via Homebrew.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const ROOT = process.cwd()
const WORK = join(tmpdir(), 'moraine-pdf-scan')
mkdirSync(WORK, { recursive: true })

const docs = JSON.parse(readFileSync(`${ROOT}/lib/documents.json`, 'utf8')).migrated.filter(
  (d) => d.ext === 'pdf',
)

const results = []
const queue = [...docs]
let done = 0

async function worker(id) {
  const file = join(WORK, `w${id}.pdf`)
  while (queue.length) {
    const doc = queue.shift()
    if (!doc) break
    try {
      // Cache-bust. Straight after an OCR pass the Blob CDN will happily
      // serve the pre-OCR copy for a while, which reads here as a file that
      // still has no text layer and sends you chasing a fix that already
      // landed.
      const res = await fetch(`${doc.url}?scan=${done}`, { cache: 'no-store' })
      const buf = Buffer.from(await res.arrayBuffer())
      writeFileSync(file, buf)

      // First three pages are enough to tell a scan from real text.
      let text = ''
      try {
        text = execFileSync('pdftotext', ['-l', '3', file, '-'], {
          encoding: 'utf8',
          maxBuffer: 20 * 1024 * 1024,
        })
      } catch {
        text = ''
      }
      const chars = text.replace(/\s+/g, '').length
      const tagged = /\/StructTreeRoot/.test(buf.toString('latin1').slice(0, 4_000_000))

      results.push({
        label: doc.label,
        url: doc.url,
        category: doc.category,
        year: doc.year,
        bytes: doc.bytes,
        chars,
        tagged,
        // No extractable text across three pages means it is an image of a page.
        imageOnly: chars < 200,
      })
    } catch {
      results.push({ label: doc.label, url: doc.url, category: doc.category, error: true })
    }
    done += 1
    if (done % 40 === 0) console.log(`  ${done}/${docs.length}`)
  }
}

console.log(`Scanning ${docs.length} PDFs for a text layer...\n`)
await Promise.all([0, 1, 2, 3, 4, 5, 6, 7].map(worker))

const imageOnly = results.filter((r) => r.imageOnly)
const untagged = results.filter((r) => !r.error && !r.tagged)
const mb = imageOnly.reduce((n, r) => n + (r.bytes ?? 0), 0) / 1024 / 1024

writeFileSync(
  `${ROOT}/docs/pdf-accessibility.json`,
  JSON.stringify(
    {
      scanned: results.length,
      imageOnly: imageOnly.length,
      untagged: untagged.length,
      imageOnlyMB: Number(mb.toFixed(1)),
      files: results.sort((a, b) => Number(b.imageOnly) - Number(a.imageOnly)),
    },
    null,
    2,
  ),
)

console.log(`\nscanned:      ${results.length}`)
console.log(`image only:   ${imageOnly.length}  (${mb.toFixed(1)} MB, needs OCR)`)
console.log(`untagged:     ${untagged.length}  (has text, but no structure)`)

const byCat = {}
for (const r of imageOnly) byCat[r.category] = (byCat[r.category] ?? 0) + 1
console.log('\nimage-only by category:')
for (const [k, v] of Object.entries(byCat).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k}: ${v}`)
}
