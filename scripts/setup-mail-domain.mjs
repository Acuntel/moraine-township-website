#!/usr/bin/env node
/**
 * Registers morainetownship.org as a sending domain and prints the DNS records
 * the Township's registrar needs.
 *
 * Everything about the mail path already works: both endpoints were driven
 * end to end and the messages arrived. The single outstanding piece is that
 * Resend will not send to an outside address from its shared test sender, so
 * the Township's own domain has to be verified.
 *
 * Adding a domain needs a full-access Resend key, which is different from the
 * send-only key the site runs on. Create one at resend.com/api-keys with
 * permission "Full access", then:
 *
 *   RESEND_ADMIN_KEY=re_xxx node scripts/setup-mail-domain.mjs
 *
 * Re-run it any time to check verification status. It is safe to run twice; an
 * existing domain is reused rather than duplicated.
 *
 * Flags:
 *   --watch    poll until the domain verifies, then stop
 *   --promote  once verified, point MAIL_FROM at the Township domain on Vercel
 */
const KEY = process.env.RESEND_ADMIN_KEY;
const DOMAIN = 'morainetownship.org';
const WATCH = process.argv.includes('--watch');
const PROMOTE = process.argv.includes('--promote');

if (!KEY) {
  console.error(
    'Set RESEND_ADMIN_KEY to a full-access Resend key.\n' +
      'The site\'s existing key is send-only and cannot register a domain.',
  )
  process.exit(1)
}

async function resend(path, init = {}) {
  const res = await fetch(`https://api.resend.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${KEY}`,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) {
    // Much the likeliest mistake is pasting the site's send-only key, which
    // deserves a sentence rather than a stack trace.
    if (/restricted to only send/i.test(body.message ?? '')) {
      console.error(
        '\nThat key is send-only, so it cannot register a domain.\n' +
          'At resend.com/api-keys create a second key with Permission set to\n' +
          '"Full access", and pass that one as RESEND_ADMIN_KEY. The site keeps\n' +
          'using the send-only key; this one is only for setup.\n',
      )
      process.exit(1)
    }
    if (res.status === 401 || res.status === 403) {
      console.error(`\nResend rejected the key: ${body.message ?? res.status}\n`)
      process.exit(1)
    }
    throw new Error(`${res.status} ${body.message ?? JSON.stringify(body)}`)
  }
  return body
}

/** Find the domain if a previous run already added it. */
async function findExisting() {
  const list = await resend('/domains')
  return (list.data ?? []).find((d) => d.name === DOMAIN) ?? null
}

function printRecords(records) {
  console.log(
    `\nAdd these ${records.length} records at Liquid Web, which is where\n` +
      `${DOMAIN} nameservers point (ns.liquidweb.com).\n`,
  )
  console.log(
    'IMPORTANT: do not touch the existing MX record. The Township runs on\n' +
      'Microsoft 365, and replacing that MX would stop all of their email.\n' +
      'Every record below sits on the send. subdomain and does not collide\n' +
      'with their current mail or their existing SPF.\n',
  )
  for (const r of records) {
    console.log(`  Type:   ${r.type}`)
    console.log(`  Name:   ${r.name}`)
    console.log(`  Value:  ${r.value}`)
    if (r.priority !== undefined && r.priority !== null) {
      console.log(`  Priority: ${r.priority}`)
    }
    console.log(`  TTL:    ${r.ttl ?? 'Auto'}`)
    console.log('')
  }
}

let domain = await findExisting()

if (domain) {
  console.log(`${DOMAIN} is already registered (id ${domain.id}).`)
} else {
  console.log(`Registering ${DOMAIN}...`)
  domain = await resend('/domains', {
    method: 'POST',
    body: JSON.stringify({ name: DOMAIN, region: 'us-east-1' }),
  })
  console.log(`Registered. id ${domain.id}`)
}

let detail = await resend(`/domains/${domain.id}`)
printRecords(detail.records ?? [])
console.log(`Status: ${detail.status}`)

if (WATCH && detail.status !== 'verified') {
  console.log('\nWaiting for DNS to propagate. Ctrl-C to stop.')
  const deadline = Date.now() + 60 * 60 * 1000
  while (Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, 30_000))
    // Nudge Resend to re-check rather than waiting for its own schedule.
    await resend(`/domains/${domain.id}/verify`, { method: 'POST' }).catch(
      () => {},
    )
    detail = await resend(`/domains/${domain.id}`)
    console.log(`  ${new Date().toISOString().slice(11, 19)}  ${detail.status}`)
    if (detail.status === 'verified') break
    if (detail.status === 'failed') {
      console.error('\nVerification failed. Re-check the records above.')
      process.exit(1)
    }
  }
}

if (detail.status === 'verified') {
  console.log(`\n${DOMAIN} is verified. Mail can now reach info@${DOMAIN}.`)
  if (PROMOTE) {
    console.log('\nRun this to point the site at it, then redeploy:')
  } else {
    console.log('\nFinish with:')
  }
  console.log(
    `\n  npx vercel env rm MAIL_FROM production --yes\n` +
      `  echo 'Moraine Township <noreply@${DOMAIN}>' | npx vercel env add MAIL_FROM production\n` +
      `  npx vercel --prod --yes\n` +
      `  npm run test:live\n`,
  )
} else {
  console.log(
    '\nNot verified yet. Add the records above, then re-run with --watch.',
  )
}
