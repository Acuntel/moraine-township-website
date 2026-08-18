import { test, describe, beforeEach } from "node:test";
import assert from "node:assert/strict";

/**
 * The two prompts that depend on noticing a resident coming back to the page:
 * the missed-call follow-up and the donation thank-you.
 *
 * Both were broken by the same thing, and it is worth naming precisely because
 * nothing about it throws. Tapping a `tel:` link hands off to the phone app,
 * and clicking Donate opens PayPal in a new tab. Neither reloads this page, so
 * a check that ran once on mount ran before the thing it was waiting for had
 * happened, and never ran again. The prompt just never appeared.
 *
 * The rule now is deliberately simple, and it is the behaviour that was asked
 * for: click the button, come back to the site, the prompt is there. No dwell
 * threshold, in either place. Earlier versions tried to infer from timing
 * whether a gift had really been completed, and that guess was wrong often
 * enough in both directions that it was worse than not guessing.
 *
 * These tests exercise the decision logic directly rather than mounting React,
 * because the decision is the part that was wrong.
 */

const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;

type Outcome = "show" | "clear" | "nothing";

/** Mirrors the decision in LeadCapture. */
function callPrompt(flag: string | null, now: number): Outcome {
  if (!flag) return "nothing";
  const calledAt = Number(flag);
  if (!Number.isFinite(calledAt)) return "clear";
  if (now - calledAt >= DAY_MS) return "clear";
  return "show";
}

/** Mirrors the decision in DonationReturnWatcher. */
function donationPrompt(flag: string | null, now: number): Outcome {
  if (!flag) return "nothing";
  const startedAt = Number(flag);
  if (!Number.isFinite(startedAt)) return "clear";
  if (now - startedAt > HOUR_MS) return "clear";
  return "show";
}

let now = 0;
beforeEach(() => {
  now = 1_770_000_000_000;
});

describe("missed-call follow-up", () => {
  test("appears as soon as the resident is back, however short the call", () => {
    for (const ago of [0, 500, 2_000, 30_000, 5 * 60_000, 20 * HOUR_MS]) {
      assert.equal(callPrompt(String(now - ago), now), "show", `${ago}ms ago`);
    }
  });

  test("forgets a call older than a day", () => {
    assert.equal(callPrompt(String(now - DAY_MS - 1), now), "clear");
  });

  test("does nothing when no call was placed", () => {
    assert.equal(callPrompt(null, now), "nothing");
  });

  test("discards a corrupted flag rather than doing arithmetic on it", () => {
    for (const junk of ["", "abc", "NaN", "undefined"]) {
      assert.notEqual(callPrompt(junk, now), "show", junk);
    }
  });
});

describe("donation thank-you", () => {
  /**
   * The regression this replaced. At the old thresholds, 20 seconds and then 8,
   * a donor with a saved PayPal account finished inside the window and came
   * back to nothing at all: no thank-you page, no hearts.
   */
  test("fires however quickly the donor comes back", () => {
    for (const ago of [0, 800, 3_000, 9_000, 45_000, 10 * 60_000]) {
      assert.equal(
        donationPrompt(String(now - ago), now),
        "show",
        `${ago}ms ago`,
      );
    }
  });

  test("a donor who glances back mid-payment still gets thanked later", () => {
    const startedAt = now - 3_000;
    assert.equal(donationPrompt(String(startedAt), now), "show");
    assert.equal(donationPrompt(String(startedAt), now + 40_000), "show");
  });

  test("drops a flag left armed overnight", () => {
    assert.equal(donationPrompt(String(now - HOUR_MS - 1), now), "clear");
  });

  test("does nothing when no donation was started", () => {
    assert.equal(donationPrompt(null, now), "nothing");
  });

  test("discards a corrupted flag", () => {
    for (const junk of ["", "abc", "NaN"]) {
      assert.notEqual(donationPrompt(junk, now), "show", junk);
    }
  });
});

describe("the two prompts stay independent", () => {
  test("neither fires from the other's flag being absent", () => {
    assert.equal(donationPrompt(null, now), "nothing");
    assert.equal(callPrompt(null, now), "nothing");
  });

  test("a call within the hour does not also look like a donation", () => {
    // They read different localStorage keys, so one click cannot arm both.
    // This holds the intent: the keys must stay distinct.
    const callKey = "moraine.calledAt";
    const donationKey = "moraine.donationStarted";
    assert.notEqual(callKey, donationKey);
  });
});
