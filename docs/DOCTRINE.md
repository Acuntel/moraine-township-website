# Moraine Township Website — Master Doctrine & Scope Document

**Version:** 1.0
**Date:** August 13, 2026
**Contractor:** Brady Schwartz, sole proprietor
**Client:** Moraine Township, an Illinois Township (800 Central Avenue, Highland Park, IL 60035)
**Primary Contact:** Nancy Chausow Shafer, Supervisor, super@morainetownship.org, 847-432-3240

This document is the single source of truth for the build. It merges four inputs:

1. The Digital Development and Maintenance Agreement (Effective Date June 26, 2026)
2. The August 13, 2026 planning meeting with the Supervisor and the Assessor (full transcript in `MEETING_TRANSCRIPT_2026-08-13.txt`)
3. The Moraine Township Brand Kit
4. A complete crawl of the live site at morainetownship.org (62 pages, 279 linked documents, captured August 13, 2026 in `site-crawl/`)

It is intended to satisfy Section 5 of the Agreement, which requires a written Scope Document defining the full list of pages, the content and functionality of each page, and the Completion Criteria, agreed in writing before development begins.

---

## 1. Contractual frame

| Item                         | Term                                                                              |
| ---------------------------- | --------------------------------------------------------------------------------- |
| Build fee                    | $1,500 flat, two installments of $750                                             |
| Deposit                      | $750 due at Effective Date                                                        |
| Final payment                | $750 within 14 days of acceptance or deemed acceptance                            |
| Acceptance window            | 14 calendar days from notice of completion; silence equals acceptance             |
| Maintenance                  | $150 per calendar month for one year, roughly 10 changes per month                |
| Revisions in build           | Up to 2 rounds per page inside agreed scope                                       |
| Accessibility standard       | WCAG 2.1 Level AA (Agreement §4.3)                                                |
| Training                     | One free 1 to 2 hour Zoom session, recordable, on AI literacy and site management |
| Governing law                | Illinois; venue Lake County                                                       |
| Binding on Client only after | Board of Trustees approval **and** signature by an authorized officer             |

The Supervisor said in the meeting she expects no more than three review sessions. The Agreement allows two revision rounds per page inside scope; anything past that is quotable separately. Worth tracking, not worth arguing about up front.

### 1.1 A correction the Agreement needs

Agreement §4.3 states the Township will be positioned to satisfy the DOJ Title II web accessibility requirements "on or before the April 26, 2027 compliance date."

That date is no longer the one that applies to this client. On April 20, 2026 the DOJ issued an interim final rule extending the compliance dates in 28 CFR 35.200(b):

- Public entities with total population **50,000 or more**: April 24, 2026 → **April 26, 2027**
- Public entities with total population **under 50,000**, and special district governments: April 26, 2027 → **April 26, 2028**

Moraine Township's own About Us page states a total population of **33,946**, which is under 50,000. The operative deadline for this client is therefore **April 26, 2028**, not April 26, 2027.

This does not change the build. The technical standard is unchanged at WCAG 2.1 Level AA, and delivering to that standard now satisfies the obligation under either date, well ahead of both. It is recorded here so the contract recital is not repeated as fact to the Board, and so the Township is not told a deadline that is a year early.

---

## 2. What the client actually asked for

Direct from the meeting. The Supervisor's framing: _"the way I feel about our website, it's kind of a mess, like it's not organized nicely, and so I'm hoping you will just reorganize it. So don't take this as this is how we want it."_

### 2.1 Governing principles

1. **Move everything first, prune second.** The Assessor was explicit: _"move all my stuff over and then once it's set there maybe we tweak it from there... I probably wouldn't eliminate it until maybe it's moved over."_ No content gets deleted in this build unless the Supervisor named it for deletion.
2. **The links are the product.** _"most of my site, the most important stuff is the links, because people are going to want to go to the county to look at their tax bill. I've checked all the links, all the links are good and active."_ Every outbound link from the current site is preserved verbatim. There are 23 external destinations and 279 linked documents captured in the crawl.
3. **Everything ends at donate.** _"there should be no more than three clicks on a page until it leads to donate... it's really everything ends and donate."_
4. **Keep the mock's feel.** _"we very much liked your initial... we're going to just keep some of the animations and some of the coloring."_
5. **No PDFs as the primary way to read something.** _"we can't do it this way anymore where we just post a PDF because that's not — she just posts up the PDF... no more PDFs, right? Images with text, right, with text to speech."_
6. **Three languages: English, Spanish, Russian.** Confirmed on the call. The Township already publishes its Food Pantry application in exactly these three languages, so this matches how they already serve residents.

### 2.2 Home page

| Change                                                                              | Source                                                                                                                                                                        |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kill the food-pantry-shopping-list image block and the old photo carousel           | _"some of these are really old shots"_                                                                                                                                        |
| One background image with text over it                                              | _"normally it's like just one image is like a background with some text over it"_                                                                                             |
| News populates directly on the home page as headlines, click through to the article | _"I think it'd be better if the news just populated on the [home page]"_ / _"just maybe headlines... having people with a separate link to click on is not normally advised"_ |
| Board meeting schedule and next agenda move OFF the home page to their own tab      | _"I don't feel like that's the most important information for the home page"_                                                                                                 |
| "How can we help you?" section: brief paragraph, image, click here to learn more    | _"how can we help you... brief paragraph, image, and click here to learn more"_                                                                                               |
| "How can you help us?" section: same pattern                                        | _"and then how you can help us, brief paragraph, image, click here for more"_                                                                                                 |
| The six service tiles move up and must read as links, with hover lift               | _"you don't really look like links, they always look like images"_ / _"when you hover over something... it makes it clear"_                                                   |
| Footer shrinks                                                                      | _"I can just make that a lot smaller and white on the bottom... it doesn't have to take up half a page"_                                                                      |
| Logo top left                                                                       | _"we'll have to put the logo on the top left"_                                                                                                                                |
| Call button top right                                                               | _"put a call button in the top right"_                                                                                                                                        |

**Open item:** the Supervisor picked a hero image during the call ("the Moraine food township pantry" image) and said she would send it. Not yet received. The build ships with a chosen image from the existing site library and a one-line swap point.

### 2.3 Donate

This is a charity-shaped requirement on a government site, and the details matter.

- Donate button on **every page**, repeated as the user scrolls. _"on every single page you want to donate button"_ / _"I'll make every page have that PayPal link multiple times, right, you're scrolling, you're seeing it."_
- Roughly **double** the current size, a big bright circle. _"you want it like double the size of the one that currently is, a big circle, very colorful and bright."_
- Destination stays PayPal with its existing dropdown. Live copy from the Township's donate page: the dropdown offers "Food Pantry", "Emergency Assistance", "Holiday Gift Drive", or "as needed".
- Offer the **Amazon wish list** as a parallel option at the donate moment. _"would you want to do money or would you rather click on our Amazon wish list."_
- **Tax information is withheld until after the donation.** The Supervisor was clear the EIN and tax details are what a donor needs _after_ giving, and putting them first risks suppressing the gift. _"instead of potentially preventing them from donating... when they come back to the website after they're finished, it will give them that."_
- On return from PayPal: **hearts** animation, thank-you, tax information, address. Explicitly hearts, not confetti. _"can we do hearts? Yeah, hearts."_
- The 501(c)(3) is **Moraine Township Charitable Fund, Inc.**, EIN **26-4269258**. This is a separate legal entity from the Township. Donation copy must attribute correctly.

### 2.4 Food Pantry

One of the highest-traffic pages. _"this is a page we refer people to a lot."_

- Amazon wish list moves to the **top**, one paragraph. _"the Amazon wish list at the bottom, we should move that to the top... and make it just one paragraph."_
- Drop-off information moves to the **bottom**. _"because if they're buying at the top they're going to look and go to drop it off."_
- The shopping list is **admin-editable**. It is updated mid-month, every month. _"for the food pantry page I'll make it so it's editable in the admin portion."_

Current live facts to carry over: eligibility is all income-qualified Township residents; applications exist in English, Spanish and Russian; hours are Monday 2:00–4:00pm, Tuesday 10:00am–noon, Wednesday 1:30–3:30pm; contact is Gissele Valle, 847-432-3240, coordinator@morainetownship.org.

### 2.5 About Us

Merge into **one page**: About Us + History of Moraine Township + Moraine Township Team, plus Ethics and Financial & Legal pulled in from Government.

- _"we'll take the About Us, history of Moraine Township and the Township team, take all that information, revamp it, make it better looking."_
- **Newsletter archive is cut.** _"we haven't done a newsletter since I took over... does anyone read these? No... put the newsletter archive kaputs."_ Optionally a buried archive link, but it does not get navigation.
- Team members get one card each: name, job, bio, photo. No multi-level click-through. _"this is too many levels for this page, way too many."_
- Some staff decline photos. Use initial-circle avatars for them. _"the staff said they don't want to have their images."_
- Audit, Budget, Legal & Public Notices, Levy do **not** get their own pages, just links. _"those don't need a whole page, they just need links to them."_

### 2.6 Government section

Dissolved. _"anything in government that repeats itself, we'll get rid of. Anything that doesn't repeat itself we'll put in either About Us or in a separate section called Programs."_

- Elected Officials → already in About Us, remove the duplicate
- Ethics → About Us
- Financial & Legal → About Us
- Grant Program → Programs. **Needs a 2026 update.** _"I never updated that... we need to update this for the 2026 grants."_ Currently shows a February 15, 2026 deadline and 2025 grantees.
- Latino Advisory Committee → Programs, does not need a full page
- FOIA → stays as its own page; this is statutorily required content

The Supervisor also flagged a contrast problem in the current navigation: _"I hate this, it's so light, it's very hard to read."_ That is an accessibility defect and is fixed by the palette work in §4.

### 2.7 Assessor

The Assessor wants **one page**. _"I'm like a one page guy."_

Combine Assessor Services + Map of Moraine Township + Assessor Staff Directory, and fold in the three deep pages already on the site (Senior exemptions, Other exemptions, Appealing your assessment) as sections.

**The map.** Currently a PDF. It becomes a screenshot image, resized, embedded in the Assessor page, with a full text description available via the read-aloud control. _"we'll do the screenshot and then we'll have the text to speech on the image to say what it is."_

The map matters because the Township boundary is genuinely confusing and it governs service eligibility. From the meeting: Moraine includes most of Highland Park, all of Highwood, part of southeast Lake Forest and part of east Deerfield. In the Highlands, one side of a street is Moraine and the other is West Deerfield. The pink area of Deerfield is West Deerfield; a small piece of Deerfield is Moraine. The text alternative must convey this, not just say "map of Moraine Township."

**Content verification needed.** The live site is internally inconsistent about who the Assessor is:

- `/assessments` and `/elected-officials` both name **Thomas J. Healy, CIAO**, term 2022-2026, assessor@morainetownship.org, 847-432-2100
- `/mark-lindsay-bio` says Mark Lindsay "has served as Moraine Township Assessor since 2018"

The build uses Thomas J. Healy, since that is what both current authoritative pages say, and flags the Lindsay bio as stale for client confirmation. **Do not guess this on the client's behalf — confirm before launch.**

### 2.8 Cemeteries

Own tab. _"I think that's an important thing that is not really that present... I think it'd be better to have it on its own."_

Two cemeteries, condensed hard. The current history pages run 10,612 and 8,656 characters of unbroken text. _"we'll have to condense that because that's a lot of information... basically pick and choose one or two paragraphs, the best information."_

- **Mooney** — Ridge Road just north of Deerfield Road. Active burials. Rain gardens and permeable pavers from a 2013 flood-mitigation project. CIMS records system since 2016.
- **Daggitt** — corner of Lake Cook Road and St. Johns Avenue, near the Braeside Metra station. Pioneer cemetery, gravestones from 1845, closed to new burials, historic. Three-year restoration completed 2022, Historic Preservation Award from the City of Highland Park in 2024.

Full histories stay available as secondary pages rather than being destroyed.

### 2.9 Services

_"this needs to be sort of combined and cleaned up."_ One scrollable page, split exactly the way the Township already splits it:

- Services available to **all residents**: transportation, voter registration, ACA/SHIP enrollment help, passport processing, assessor help, RTA discount cards, free notary
- Services for **income-qualified residents**: General/Emergency Assistance, Food Pantry, utility assistance, free tax prep, medical alert monitoring, DHS application assistance (Medicaid/SNAP/TANF), Benefit Access Program, resource referrals

### 2.10 Community Mental Health Board

External link only. _"community mental health board really has their own website but we need a link to it."_ → https://www.morainetownshipmentalhealthboard.org

### 2.11 Get Involved / Volunteer

_"get involved is everywhere."_ The volunteer page needs easy bullets with the highest-priority ask first. _"what to help needs to be like very easy bullet points, and the number one thing you want them to do should be the first thing on the list."_ Current page is flagged as _"very long."_

### 2.12 Admin panel

Brady has built this pattern before. _"I'm going to create basically an admin tab, I've done it a few times with different websites before."_

- Entry: a very small gray "admin" link in the footer. _"there's a very very small gray link that says admin"_
- Password gate, password chosen with the Township
- Manages: news and events, articles/blog posts, photo uploads, the food pantry shopping list, board agendas and the meeting schedule
- A **staff member** becomes site manager, not the long-time volunteer. _"I think I'll probably make somebody on staff the manager of the website just because this volunteer has been doing it for a number of years and I always feel bad."_

### 2.13 Call tracking and lead capture

_"when someone clicks call, after they call, when they go back to the site it collects some information on them like their name, their email address... and it actually sends that email to your inbox."_

- Call button, no SMS. _"we don't have texting... maybe just call."_
- Destination for lead emails: **info@morainetownship.org**. _"it could probably go to our info at email address."_
- After-hours calls go to voicemail, which is why the capture matters.

### 2.14 SEO and AI discoverability

Brady raised this unprompted and the Supervisor approved. _"SEO and like this AI crawler links that I know how to create... basically makes the website much more likely to be seen, or if some of the AI know like, hey, what do I get help for this thing."_ Local-area targeting specifically.

### 2.15 Hosting and DNS

Current host is uncertain. The Supervisor first said Squarespace, then Network Solutions, and committed to confirming with the Township Administrator (Sanela Abazovic). The crawl shows the current site is served by **Squarespace**, so Network Solutions is most likely the domain registrar rather than the host. Brady sends DNS instructions at launch. _"I'll send you some simple directions on what you need to do."_

**Domain stays registered in the Township's name** (Agreement §8).

---

## 3. Information architecture

Consolidating 62 live pages into 13 primary pages, in three languages.

| #   | Page                | Route             | Absorbs                                                                                                                                                                       |
| --- | ------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Home                | `/`               | home-impact                                                                                                                                                                   |
| 2   | About Us            | `/about`          | about-us-1, mission, history-of-moraine-township, moraine-township-team, elected-officials, supervisor, clerk, moraine-township-staff, ethics, financial-legal, all bio pages |
| 3   | Resident Services   | `/services`       | services, other-resident-services, general-emergency-assistance, utility-assistance, vita-tax-preparation, affordable-care-act, passport, voter-registration                  |
| 4   | Food Pantry         | `/food-pantry`    | food-pantry, food-pantry-shopping-list                                                                                                                                        |
| 5   | Assessor            | `/assessor`       | assessments, new-page-27, new-page-50, new-page-85, assessor staff, map                                                                                                       |
| 6   | Transportation      | `/transportation` | doortodoor-transportation                                                                                                                                                     |
| 7   | Board & Meetings    | `/board-meetings` | clerk meetings, minutes indexes, agendas, schedule                                                                                                                            |
| 8   | Cemeteries          | `/cemeteries`     | cemeteries, mooney-cemetery-history, daggitt-cemetery-history                                                                                                                 |
| 9   | Programs            | `/programs`       | new-page (grants), latino-advisory-committee                                                                                                                                  |
| 10  | Get Involved        | `/get-involved`   | volunteer-1, support, volunteer-photos                                                                                                                                        |
| 11  | Donate              | `/donate`         | donate-1                                                                                                                                                                      |
| 12  | FOIA & Transparency | `/foia`           | foia, audit, budget, levy, legal-public-notices, comptrollers-report, treasurers-report                                                                                       |
| 13  | Contact             | `/contact`        | footer contact, staff directories                                                                                                                                             |

Plus `/news/[slug]` for articles, `/thank-you` for the post-donation return, and `/admin`.

Spanish at `/es/*`, Russian at `/ru/*`, English at the root.

**Preserved redirects.** Old URLs must not 404. Every crawled path maps to its new home via permanent redirects, because the Assessor's point about links being the most important thing cuts both ways: inbound links and bookmarks matter too.

---

## 4. Brand and design

From the Brand Kit:

| Token         | Hex       | Use                                    |
| ------------- | --------- | -------------------------------------- |
| Primary green | `#01A667` | Logo, large surfaces, decorative fills |
| Green light   | `#66BB6A` | Accents                                |
| Teal          | `#00757D` | **Body-safe text and links**           |
| Teal dark     | `#005A60` | **Headings, high-contrast text**       |
| Mint          | `#99D4AD` | Backgrounds, tints                     |
| Aqua          | `#45B4A4` | Accents                                |
| White         | `#FFFFFF` | Surfaces                               |

Type: ITC Franklin Gothic LT, letter spacing 0, line spacing 1. Libre Franklin is the metrically compatible web substitute already loaded by the Township's current Squarespace site, so the visual identity carries over without licensing a desktop font for web use.

Logo: green circle, handshake forming a heart, "MORAINE TOWNSHIP", "EST • 1850". Tagline in use: "Get a hand... give a hand".

### 4.1 Contrast constraint, stated once

`#01A667` on white measures roughly **2.6:1**. WCAG 2.1 AA requires **4.5:1** for normal text and **3:1** for large text and UI component boundaries. So the primary brand green cannot carry body text on white. It is a surface and graphic color.

`#00757D` (about 5.1:1 on white) and `#005A60` (about 7.5:1) do the text work. This keeps the site on-brand and compliant at the same time, and it directly fixes the "so light it's very hard to read" complaint. Exact ratios are computed and recorded in Phase 7.

---

## 5. Legal and compliance requirements

Verified against primary sources, not memory.

### 5.1 Accessibility — ADA Title II

- **28 CFR Part 35 Subpart H** adopts **WCAG 2.1 Level AA** as the technical standard for web content of state and local government entities.
- Compliance date for this client: **April 26, 2028** (population under 50,000), per the DOJ interim final rule effective April 20, 2026. See §1.1.
- The **Illinois Information Technology Accessibility Act (30 ILCS 587)** does **not** apply here. It binds State agencies and public universities and expressly excludes units of local government. Cite ADA Title II, not IITAA, in any client-facing compliance claim.

### 5.2 Illinois statutory posting requirements the site must satisfy

| Requirement                                                                                                                                                                                             | Citation             | Where it lives                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | --------------------------------- |
| Annual schedule of regular meetings posted                                                                                                                                                              | 5 ILCS 120/2.02(a)   | `/board-meetings`                 |
| Notice of all governing body meetings                                                                                                                                                                   | 5 ILCS 120/2.02(b)   | `/board-meetings`                 |
| Agenda posted at least 48 hours before, continuously available for the full 48-hour period                                                                                                              | 5 ILCS 120/2.02      | `/board-meetings`, admin-editable |
| Minutes posted within 10 days of approval, remain posted at least 60 days                                                                                                                               | 5 ILCS 120/2.06(b)   | `/board-meetings`                 |
| FOIA: purpose summary, functional subdivisions (block diagram), operating budget total, office count and locations, employee headcount, advisory bodies, request procedure, FOIA officer, address, fees | 5 ILCS 140/4         | `/foia`                           |
| Employee compensation disclosure ($75k / $150k thresholds, IMRF participants)                                                                                                                           | 5 ILCS 120/7.3       | `/foia`                           |
| IMRF employer data link                                                                                                                                                                                 | 40 ILCS 5/7-135.5(b) | `/foia`                           |
| Public mechanism for contact, e.g. an email address                                                                                                                                                     | 50 ILCS 205/20       | Global footer + `/contact`        |
| Tax levy notice where increase exceeds 5%                                                                                                                                                               | 35 ILCS 200/18-75    | `/foia`                           |

The Township already posts most of this. The build's job is to keep it posted, make it findable, and make it accessible. Where the current site satisfies a requirement only via PDF, an HTML landing summary is added alongside the PDF so the information is available in an accessible format.

**Note on the ADA coordinator posting rule.** 65 ILCS 5/1-1-12 requires municipalities to post ADA coordinator contact details and grievance procedures. Moraine is a township, not a municipality, so that section does not bind it. An ADA/accessibility statement page is still included as good practice and because DOJ Title II expects a grievance path for entities of sufficient size. Recommend the Township confirm whether it has designated an ADA coordinator.

### 5.3 PDF policy

The Supervisor's instruction ("no more PDFs") is correct in direction but cannot be absolute: 279 documents are linked from the current site, including statutorily-posted minutes, budgets, levies and audits that exist as signed PDFs of record.

Policy applied:

- **Primary content never lives only in a PDF.** Anything a resident needs to read, act on, or that the law requires to be posted gets an accessible HTML representation.
- **Documents of record keep their PDF** alongside the HTML summary, since the signed artifact has legal value.
- Every PDF link is labeled with its format and, where determinable, its size and date, so a screen reader user knows what they are about to open.
- The map specifically becomes an image with a full text alternative, per §2.7.

---

## 6. Feature specification

| Feature                      | Behavior                                                                                                                                                                                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Persistent donate**        | Fixed, large, circular, high-contrast donate control on every page. Repeats inline at section breaks on long pages. Links to the Township's PayPal donate URL.                                                                                    |
| **Donate return experience** | `/thank-you` renders a hearts animation, thank-you message, Charitable Fund EIN 26-4269258, mailing address, and an onward ask. Respects `prefers-reduced-motion`.                                                                                |
| **Amazon wish list**         | Presented at the donate decision point as an equal alternative, and at the top of the Food Pantry page.                                                                                                                                           |
| **Read aloud (TTS)**         | Per-page control using the Web Speech API, voiced in the active language (en-US / es-US / ru-RU). Used to voice the Assessor map description and any image-of-text. Free, no API key, no per-request cost.                                        |
| **Language switcher**        | en / es / ru, preserves the current path, sets `lang` on `<html>`, emits `hreflang` alternates.                                                                                                                                                   |
| **Call button**              | Header, top right. `tel:` link. No SMS.                                                                                                                                                                                                           |
| **Post-call lead capture**   | On return to the site after a call intent, an optional, dismissible form collects name and email and emails info@morainetownship.org. Optional and dismissible by design: a government service site must never gate access to help behind a form. |
| **News**                     | Admin-authored posts render as headlines on the home page and as full articles at `/news/[slug]`.                                                                                                                                                 |
| **Admin**                    | Small gray footer link, password gate, edit news/events/pantry list/photos/agendas.                                                                                                                                                               |
| **Hover affordance**         | Service tiles lift on hover and have visible focus states, so they read as links rather than images.                                                                                                                                              |

---

## 7. Completion Criteria (Agreement §5)

The build is complete when all of the following are true:

1. All 13 primary pages exist and render in English, Spanish and Russian.
2. Every external link and document link captured in the August 13, 2026 crawl is present and resolves, or is explicitly listed as intentionally retired with client sign-off.
3. Old URLs redirect to their new equivalents; no crawled path returns 404.
4. WCAG 2.1 Level AA is met: automated audit clean, keyboard-only traversal complete, all non-decorative images have meaningful alternatives, contrast ratios documented, focus visible throughout, motion respects `prefers-reduced-motion`.
5. Donate is reachable from every page and the post-donation return experience works end to end.
6. The admin panel authenticates and can edit news, events, the pantry shopping list, photos and agendas.
7. The statutory posting requirements in §5.2 each have a home on the site.
8. `tsc --noEmit` clean, production build clean.
9. Deployed and reachable at a live URL for client review.
10. No English text leaks onto the Spanish or Russian pages. Verified by
    `scripts/i18n-leak-check.mjs`, which diffs every localized page against its
    English counterpart.

**Explicitly deferred to client input, not blockers for review:** final hero image, staff photographs, 2026 grant program content, current-Assessor confirmation, admin password, host/registrar confirmation, and the Township's analytics on most-visited pages.

---

## 8. Open items owed by the Client

1. Hero background image (Supervisor selected one on the call, not yet sent)
2. Photographs of elected officials and staff, and confirmation of who declines a photo
3. 2026 Grant Program content: deadline, criteria, current grantees
4. Confirmation of the current Assessor (Healy vs. the stale Lindsay bio)
5. Admin password choice and the staff member who will be site manager
6. Host and registrar confirmation from the Township Administrator
7. Historical click/analytics data from the website volunteer
8. Whether an ADA coordinator has been designated
9. Board approval and authorized-officer signature on the Agreement

---

## 8.1 Design language, and where it comes from

The Supervisor asked to keep the feel of the approved mock: _"we very much liked
your initial... we're going to just keep some of the animations and some of the
coloring."_ The first build read as too blocky against that mock, so the shell
was rebuilt around what actually made the mock feel different:

| Trait                                                                                                         | Taken from                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Warm cream ground `#FDFBF7`, alt `#F5F0E8`, warm brown-black text `#2A2520`                                   | The mock. This is most of the softness, and it carries no brand conflict.                                                                                          |
| Radii of 10 / 16 / 24 / 32px                                                                                  | The mock. The first build used tighter corners throughout.                                                                                                         |
| Layered warm shadows, `rgba(42,37,32,…)`                                                                      | The mock.                                                                                                                                                          |
| `cubic-bezier(.22, 1, .36, 1)` easing on every transition                                                     | The mock. The long tail-out is what reads as flowing.                                                                                                              |
| Fixed header that starts transparent over the hero and turns to frosted glass on scroll, shrinking as it goes | The mock.                                                                                                                                                          |
| Nav underline that sweeps in from the left and out to the right                                               | The mock.                                                                                                                                                          |
| Merriweather serif for display headings                                                                       | The mock. This is a deliberate departure from the Brand Kit's single-typeface rule, made because the client approved the mock. **Flag it for sign-off.**           |
| Centred eyebrow flanked by rules, above every section heading                                                 | The mock.                                                                                                                                                          |
| Dark full-bleed band carrying figures, with an organic curved edge                                            | The mock.                                                                                                                                                          |
| Scrolling feature strip, numbered step cards, asymmetric bento grid with icon chips                           | The mock.                                                                                                                                                          |
| Amber as the action colour                                                                                    | The mock, with accessible substitutions: `#D4882A` is 2.76:1 on cream so it is a fill only, `#A9661A` carries white text, `#F0C060` appears only on the dark band. |
| Greens and teals                                                                                              | The Brand Kit, not the mock. The mock's `#1B6B3A` is not a Township colour; the dark band uses `#005A60`.                                                          |

The header is one row of eight links. Ten did not fit in Spanish or Russian,
which is why the nav labels are short and why Board & Meetings and Programs are
reached from the home page strip, the footer, and the collapsed menu instead.

---

### Figures on the home page

Every number in the dark band is published by the Township itself. Nothing is
estimated, and nothing is carried over from the mock, whose figures were
placeholders:

| Figure   | Source                                                                                                    |
| -------- | --------------------------------------------------------------------------------------------------------- |
| 1850     | Founding year, from the Township's history page                                                           |
| 33,946   | Total population, from the Township's About Us page                                                       |
| $275,000 | 2026 grant awards, supplied by the Supervisor in the Draft 1 review doc (Aug 2026; was $175,000 for 2025) |
| 23       | Count of 2026 funded agencies, same source (was 15+ for 2025)                                             |

The grant figures change every year after the Board votes in April or May. The
Supervisor asked that they be updated annually.

---

## 8.2 The document archive, and why it had to move

All 275 documents linked from the Township's site were served by Squarespace at
`morainetownship.org/s/*`. The day DNS points at this site, every one of those
URLs stops resolving, taking with it the meeting minutes, budgets, audits and
levies that Illinois law requires the Township to keep posted.

241 of them have been migrated into this site's own storage and are linked from
the pages where residents would look for them:

| Where               | What                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------ |
| Board & Meetings    | 108 sets of Board minutes, grouped by year; posted agendas; the Decennial Committee report |
| FOIA & Transparency | 14 budgets, 14 audits, 5 levies, plus treasurer, comptroller and compensation notices      |
| Food Pantry         | The 2026-27 application in English, Spanish and Russian, plus the pantry flyer             |
| Resident Services   | General Assistance applications in English and Spanish, and the VITA tax forms             |
| Programs            | The 2026 grant application                                                                 |
| Get Involved        | The volunteer application                                                                  |
| Cemeteries          | 9 deeds, plats, surveys and research documents                                             |

`lib/documents.json` maps every original URL to its new home. Each link states
its format and file size before the reader opens it.

**34 documents were already returning 404 on the Township's own site** before
this project began, including nine tax levy ordinances and twenty-two sets of
Board minutes. They are listed in `docs/BROKEN-SOURCE-DOCUMENTS.md` for the
Township to supply or retire. Nothing was lost in the rebuild; these were
already gone.

---

## 9. Source artifacts

| Artifact                  | Location                                 |
| ------------------------- | ---------------------------------------- |
| Meeting transcript, full  | `docs/MEETING_TRANSCRIPT_2026-08-13.txt` |
| Site crawl, structured    | `docs/site-crawl/site.json`              |
| Site crawl, per-page text | `docs/site-crawl/pages/*.txt`            |
| Cleaned page content      | `docs/site-crawl/clean_content.txt`      |
| Crawler used              | `docs/site-crawl/crawl.py`               |
