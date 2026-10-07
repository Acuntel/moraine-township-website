# Tests

```bash
npm test                       # 120 tests, no network, ~350ms
npm run test:live              # + 18 smoke tests against the deployment
node scripts/popup-check.mjs   # 12 checks, driven in a real browser
npx tsc --noEmit               # the tests are typechecked with the site
```

The live suite throttles itself to six concurrent requests, because firing all
65 legacy URLs at once was a burst Vercel answered by throttling, and the suite
then reported the site as broken when the site was fine. Still leave a pause
between the live suite, the popup check and the four URL-based audits: together
they are several hundred requests, and a throttled run shows up as several
audits failing at once while each passes alone.

A test that fails for its own reasons is worse than no test, because the next
real failure gets waved through as "probably rate limiting again".

No test framework is installed. The suite runs on Node's built-in test runner
and Node 26's own TypeScript support, so it adds **zero dependencies** to a site
that has four. `tests/resolver.mjs` supplies the three things Node's resolver
wants that the site's imports do not write: the `@/…` alias from tsconfig, file
extensions on relative imports, and the `type: "json"` attribute. That means the
tests import the exact files that ship, not a compiled copy that could drift.

## What each file covers

| File                     | Holds                                                                                         |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| `mail.test.ts`           | Where mail goes, whether it can actually get there, and the Resend request shape.             |
| `forms.test.ts`          | The contact form and the missed-call follow-up end to end, including every way they can fail. |
| `admin-auth.test.ts`     | The password gate: forged cookies, extended expiries, and the unset-password case.            |
| `i18n.test.ts`           | Routing between the three languages, including the `/en` regression described below.          |
| `documents.test.ts`      | The 247-document archive, the statutory categories inside it, and newest-first date order.   |
| `agendas.test.ts`        | Which agenda the Board Meetings page shows: the next meeting's, by the Chicago calendar.      |
| `content.test.ts`        | English, Spanish and Russian checked against each other, plus every image description.        |
| `foia.test.ts`           | The FOIA public body description: the same budget figures in every language, the Board roster drawn from the elected officials, and the IMRF link. |
| `return-to-page.test.ts` | When the missed-call prompt and the donation thank-you are allowed to fire.                   |
| `live.test.ts`           | The deployment itself. Skipped unless `RUN_LIVE_TESTS=1`.                                     |

## What these tests are actually for

Every failure mode below is silent. Nothing throws, no page 500s, and the site
looks correct to whoever is checking it. That is the whole reason the suite
exists, and it is the standard for adding to it: prefer the test that catches
something no one would notice.

- **A form that shows a success screen for a message that went nowhere.** The
  worst outcome on the site, because the resident believes they have been heard.
  Several tests in `mail.test.ts` and `forms.test.ts` exist only for this.
- **Mail that is configured but undeliverable.** A valid API key is not the same
  as working email. See `docs/EMAIL.md`.
- **A pinned form that quietly stops resolving.** `FORMS` matches documents by
  filename fragment; a miss returns `undefined` and the link vanishes from the
  page with nothing thrown. This is not hypothetical: it is how the Board
  meeting schedule went missing, while 5 ILCS 120/2.02(a) requires it to stay
  posted. `documents.test.ts` caught it and `findDoc` now treats `-` and `_` as
  the same character.
- **A statutory category emptying out.** Illinois requires the minutes, budgets,
  levies and audits to stay posted. An empty category is a legal problem, not a
  broken link.
- **Prose left in English on a Spanish or Russian page.** The page renders fine
  and only a reader of that language finds out.
- **An array that lost an item in translation.** TypeScript enforces the
  dictionary's keys but is satisfied by an array of any length, so
  `content.test.ts` compares the flattened key sets instead.
- **A test that passes for the wrong reason.** The check that the admin panel
  refuses an unauthenticated write used to send `POST`, but the route exports
  `PUT`. It got 405 Method Not Allowed before any auth code ran, asserted only
  that the status was an error, and passed. It would have gone on passing with
  the panel wide open. It now sends `PUT` and asserts exactly 401, which is the
  gate answering rather than the router.
- **`splitLocale` not stripping `/en`.** The browser shows `/about` while the
  server renders `/en/about`. When these disagreed, `aria-current="page"` and
  the header's over-hero styling broke on every English page, silently, and a
  screen reader user simply stopped being told which page they were on.

## Why there is also a browser check

`scripts/popup-check.mjs` loads the deployed site in headless Chrome, sets the
same localStorage flags the Call and Donate buttons set, dispatches the events a
returning resident actually produces, and looks at the DOM.

It exists because the bug it was written for was never in the logic. The logic
was fine and unit-tested. What was wrong was that the logic never ran: a
mount-only effect fired once, before the resident had gone anywhere, and never
again, because handing off to the dialer or opening PayPal in a new tab does not
remount the page. No pure function test can see that.

It has already earned its place twice. It caught the donation redirect silently
failing when a `pageshow` event was in the mix, which is Next's own bfcache
restore racing the redirect and putting the old URL back, and it is the only
thing that checks a Spanish donor lands on `/es/thank-you` rather than being
dropped into English.

## Conventions

- Tests never reach the network. `stubFetch` replaces `fetch` and records what
  would have been sent; `withEnv` sets environment variables and restores them.
- Nothing in the suite can put a message in the Township's inbox, including the
  live tests, which post a deliberately invalid body that is rejected at
  validation before the send path is reached.
- Assertions carry a message naming the thing that broke, because a bare
  `expected true to equal false` across 247 documents helps nobody.
- Where a test encodes a legal requirement, cite the statute next to it.
