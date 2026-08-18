# Email

Everything the site sends goes to **info@morainetownship.org**.

That address was chosen by the Supervisor on the planning call, when the
missed-call follow-up was being described:

> "it actually sends that email to your inbox … it could probably go to our
> info at okay email address yeah okay cool"

It is also the address the Township publishes on its own contact page, so it is
where residents already expect to be heard.

Two things send mail:

| Path           | Trigger                                                               |
| -------------- | --------------------------------------------------------------------- |
| `/api/contact` | The contact form on `/contact`.                                       |
| `/api/lead`    | Someone tapped Call, came back to the site and asked for a follow-up. |

Both set `Reply-To` to the resident's address, so a clerk can answer straight
from the info inbox instead of retyping an address out of the message body.

## Current state

| Variable         | Value                                              | Status                          |
| ---------------- | -------------------------------------------------- | ------------------------------- |
| `RESEND_API_KEY` | Send-only restricted key                           | **Set**, encrypted, all targets |
| `MAIL_TO`        | `info@morainetownship.org`                         | **Set**                         |
| `MAIL_FROM`      | `Moraine Township Website <onboarding@resend.dev>` | **Set**, temporary              |

The pipeline is wired, deployed and covered by tests. One step remains before a
resident's message actually arrives.

## Proven working, end to end

On 2026-08-17 both endpoints were driven against production with `MAIL_TO`
temporarily pointed at an address the Resend account owns, and both messages
arrived:

- **Website message from Pipeline Test**, carrying the name, email, phone and
  the resident's full message, with `Reply-To` set to the sender.
- **Call follow-up requested: Pipeline Test**, carrying the name, email, source
  and the request time in Central.

`MAIL_TO` was restored to `info@morainetownship.org` immediately afterwards. So
the code, the key, the request shape and the delivery all work. Exactly one
thing is left.

## The remaining step: verify the domain

`onboarding@resend.dev` is Resend's shared testing sender. It only delivers to
the address that owns the Resend account. Addressed to the Township it is
refused by the API before anything is sent:

```
403 validation_error
You can only send testing emails to your own email address.
To send emails to other recipients, please verify a domain at
resend.com/domains, and change the `from` address to an email using this domain.
```

So the contact form cannot reach info@morainetownship.org until
`morainetownship.org` is verified with the email provider.

### What the DNS looks like today

Worth knowing before anyone opens the registrar, because there is one way to
cause real damage here:

| Record | Current value | Meaning |
| --- | --- | --- |
| NS | `ns.liquidweb.com`, `ns1.liquidweb.com` | DNS is at **Liquid Web**, not Squarespace |
| MX | `morainetownship-org.mail.protection.outlook.com` | Their mail runs on **Microsoft 365** |
| TXT | `v=spf1 include:spf.protection.outlook.com -all` | SPF, and note the hard fail |

**Do not modify or replace the MX record.** It carries all of the Township's
existing email. The website cutover changes A/CNAME records only. Resend's
records all sit on the `send.` subdomain, so they neither collide with the
Microsoft 365 mail flow nor conflict with that `-all` SPF policy.

### Procedure

Step 1 is the only part that needs a person; the rest is scripted.

1. **Create a full-access API key.** At `resend.com/api-keys`, add a key with
   Permission set to *Full access*. The site keeps using its existing send-only
   key. This one is for setup, and can be deleted afterwards.

   Ideally the Resend account that owns this domain belongs to the Township
   rather than to an individual, so their sending survives any change of
   contractor.

2. **Register the domain and get the records.**

   ```bash
   RESEND_ADMIN_KEY=re_xxx node scripts/setup-mail-domain.mjs
   ```

   It prints the exact records to add, refuses to run on a send-only key, and is
   safe to run twice.

3. **Add the records at Liquid Web**, leaving the MX record alone.

4. **Watch it verify.**

   ```bash
   RESEND_ADMIN_KEY=re_xxx node scripts/setup-mail-domain.mjs --watch
   ```

   Usually minutes. DNS can take up to 72 hours.

5. **Point the site at the verified domain**, which the script prints when it
   finishes:

   ```bash
   npx vercel env rm MAIL_FROM production --yes
   echo 'Moraine Township <noreply@morainetownship.org>' | npx vercel env add MAIL_FROM production
   npx vercel --prod --yes
   npm run test:live
   ```

6. Send one real message through `/contact` and check the info inbox.

Until step 5, the admin panel at `/admin` says so in plain language rather than
reporting email as healthy, and a resident who submits the form is shown the
Township phone number in their own language rather than a success screen for a
message that went nowhere. The same is now true of the missed-call follow-up,
which previously thanked the resident whether or not the request was delivered.

## Why not send from another domain

The available key can also send from `reallawgroup.com`, which is verified for a
different client. That would work today and is still the wrong choice:

- A Township message arriving "from" a law firm is confusing at best.
- Two unrelated clients would share one sending reputation, so one client's mail
  problems become the other's.
- Revoking or rotating that key for its real owner would silently break the
  Township's contact form.

## Testing

No test in this repository sends mail to the Township. The unit tests replace
`fetch` entirely, and the live suite posts a deliberately invalid body that is
rejected at validation before the send path is reached.

```bash
npm test          # includes the mail, contact form and follow-up suites
npm run test:live # checks the deployed endpoint, still without sending
```

The live suite fails loudly if `RESEND_API_KEY` is missing from the deployment,
because a contact form that returns 503 is a contact form nobody is reading.
