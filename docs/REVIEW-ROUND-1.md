# Draft 1 review, and what was done

**Review document:** "Changes to Draft 1 of Moraine Township Website" (Google Doc)
**Reviewers who commented:** Nancy Chausow Shafer, Mark, Sara Hoffman
**Applied:** August 25, 2026
**Live at:** https://moraine-food-pantry.vercel.app

Every requested change is live, in English, Spanish and Russian. The Township
does not need to re-check the Spanish and Russian pages separately, because each
change was made in all three dictionaries at once and the build fails if a
translation is missing.

---

## The six requested changes

### 1. Voter registration in the scrolling strip (Nancy)

The scrolling strip on the home page now reads **"Passports, notary and voter
registration"** where it previously read "Passports and notary", which is the
wording Nancy suggested.

One note for clarity: the review document listed the current text as "Services
we offer". That phrase does not appear on the site. The strip is labelled "What
the Township provides", and that is the section that was changed. If the
Township would prefer the label itself to read "Services we offer", that is a
one line change, so please say so.

### 2. Community grants figure (Nancy)

Changed from **$175,000 awarded in 2025** to **$275,000 awarded in 2026**, on
the home page and on the Programs page.

### 3. Number of agencies funded (Nancy)

Changed from **15+ local agencies funded** to **23 local agencies funded**. The
plus sign was removed, because 23 is an exact count rather than a floor.

Both grant figures are noted in the project documentation as annual updates, so
they are refreshed each year after the Board votes in April or May. They are
also on the list for the admin panel training session, so a staff member can
change them without going through me.

### 4. Active voice in the "How it works" section (Nancy)

Changed from "We have kept the process straightforward and respectful" to
**"We keep the process straightforward and respectful."** The Spanish and
Russian sentences were changed to the present tense to match.

### 5. Service area wording (Mark)

Mark was right that this read as misleading. The home page banner now reads
**"Serving Highland Park, Highwood, and parts of Lake Forest and Deerfield."**

The same correction was applied to the social sharing card, which is the preview
image that appears when somebody shares the site on Facebook or in a text
message. It claimed the same full coverage, and would have been seen by people
who never reach the site itself.

The Assessor page already carried a full explanation of the boundary, including
the streets where one side is in Moraine Township and the other is in West
Deerfield Township. That description was left as it is, because it is accurate
and it is the place where a resident checking their eligibility will look.

### 6. The Food Pantry garden (Sara Hoffman)

The entry now reads: **"We grow produce for the Food Pantry, and we partner with
a local private farm that donates a portion of its crops to the pantry.
Gardening volunteers are welcome through the growing season."**

If the Township would like the farm named and credited, please send the name and
I will add it.

---

## Sara's second question, answered

Sara asked whether the volunteer opportunities listed on the site are all on the
volunteer application, and whether they should be added.

They are not all on it. The application has five checkboxes: **Office, Food
Pantry, Garden, ACA, VITA (Income Tax Prep)**. The website lists nine ways to
help. They line up like this:

| On the website                         | On the application |
| -------------------------------------- | ------------------ |
| Food Pantry shifts and food pickups    | Yes, "Food Pantry" |
| The Food Pantry garden                 | Yes, "Garden"      |
| Free income tax return preparation     | Yes, "VITA"        |
| Health insurance enrollment assistance | Yes, "ACA"         |
| Sunset Foods fundraiser                | No                 |
| Postal Workers' Food Drive             | No                 |
| Host a food drive                      | No                 |
| Holiday Gift Drive                     | No                 |
| Citizen advisory committees            | No                 |

There is also a gap in the other direction. The application offers **Office** as
a choice, but office help is not listed anywhere on the website as a way to
volunteer. A resident who wants to help in the office would not learn from the
site that the Township wants that.

Two things the Township may want to decide:

1. Whether to add checkboxes for the Holiday Gift Drive and the citizen advisory
   committees. Those are recurring commitments rather than single events, so they
   behave like the existing checkboxes. The three food drive events are one day
   or one weekend each, which may be why they were left off deliberately.
2. Whether office volunteering should be added to the website, and if so, a
   sentence describing what it involves. I did not want to invent that
   description.

Editing the application PDF is not part of the website build, but it is a small
change and I am happy to do it if the Township sends the wording it wants.

---

## Three things fixed that were not on the list

### The Township name was cut off inside the logo

The name curves around the top of the green circle. The lettering was slightly
too long for the curve, and a browser simply does not draw the characters that
run off the end, so the mark read **"ORAINE TOWNSHI"**. The first M and the last
P were missing, in the header and the footer, on every page, in all three
languages.

It is fixed and now reads MORAINE TOWNSHIP in full. The lettering is also pinned
to the curve so it cannot happen again if a font fails to load.

### The sharing preview repeated the service area wording

Covered under Mark's item above. The preview card was regenerated.

---

### The Donate button covered text on a phone

On a phone the round Donate button floated above the page and sat over the
right hand end of the text column. Measured on a 390 pixel screen it was
covering up to 74 pixels of the ends of lines on the Resident Services page, at
several points in the page, which is about a fifth of the width of the text.

No change to its size or its corner would have fixed that. Anything fixed to
the screen covers whatever scrolls underneath it, and on a phone the text runs
nearly the full width, so there is nowhere for it to sit that is not on top of
the words.

It now steps aside while the reader is moving down the page, and comes straight
back when they stop, scroll up, or reach the top or the bottom. Donate is still
on every page and still large, which is what was asked for, and it is no longer
sitting on the words while somebody is reading them. On a computer nothing
changed, because there the page has margins wide enough for the button to sit
beside the text rather than on it.

This is checked automatically now, at phone and desktop width, so it cannot
quietly come back.

---

## Verification run after these changes

| Check                                      | Result                              |
| ------------------------------------------ | ----------------------------------- |
| Unit and integration tests                 | 105 of 105 passed                   |
| Live tests against the deployment          | 125 of 125 passed                   |
| TypeScript                                 | Clean                               |
| Colour contrast                            | All measured pairs meet WCAG 2.1 AA |
| Structural accessibility audit, 54 pages   | No issues                           |
| axe-core, about 100 rules, 55 states       | No WCAG 2.1 A or AA violations      |
| Keyboard and focus                         | 10 of 10 passed                     |
| Image descriptions                         | Every image has one                 |
| English text on Spanish or Russian pages   | None                                |
| Illinois statutory postings                | 15 of 15 satisfied                  |
| Reflow at 320px and 390px, three languages | 22 of 22 passed                     |
| Floating Donate button, phone and desktop  | 22 of 22 passed                     |
| Browser errors across 42 pages             | None                                |
| Outbound links                             | All resolve, none retired           |
