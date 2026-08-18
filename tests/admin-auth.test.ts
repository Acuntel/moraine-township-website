import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  ADMIN_WINDOW_MS,
  adminConfigured,
  checkPassword,
  issueToken,
  verifyToken,
} from "@/lib/admin-auth";
import { withEnv } from "./helpers.ts";

/**
 * The gate on the admin panel. It protects an editing surface for public
 * information, so the threat is a stranger defacing the Township's site rather
 * than anyone reading something confidential. General Assistance case data
 * never touches this codebase.
 *
 * What these tests hold: a cookie cannot be forged without the secret, cannot
 * outlive its window, and every entry point stays shut when ADMIN_PASSWORD is
 * unset rather than falling open.
 */

/**
 * A fixture, deliberately not the Township's real password.
 *
 * These tests set ADMIN_PASSWORD themselves, so the real one was never needed
 * here. It was hardcoded anyway, and this file is committed, which would have
 * published the live admin password for a government website to the repository.
 * The real one lives only as an encrypted Vercel environment variable.
 *
 * Keep the shape awkward: mixed case, a symbol, trailing punctuation. The
 * near-miss cases below only prove anything if the fixture is the kind of
 * string people typo.
 */
const PASSWORD = "Fixture!Pass?9";
const SET = { ADMIN_PASSWORD: PASSWORD };

describe("with no password configured", () => {
  const UNSET = { ADMIN_PASSWORD: undefined };

  test("the panel reports itself closed", async () => {
    await withEnv(UNSET, () => assert.equal(adminConfigured(), false));
  });

  // The dangerous failure is an empty secret comparing equal to an empty
  // guess and letting anyone in.
  test("no password is accepted, including the empty one", async () => {
    await withEnv(UNSET, () => {
      for (const guess of ["", PASSWORD, "anything"]) {
        assert.equal(checkPassword(guess), false, JSON.stringify(guess));
      }
    });
  });

  test("no token verifies", async () => {
    await withEnv(UNSET, () => {
      assert.equal(verifyToken(`${Date.now() + 10_000}.deadbeef`), false);
    });
  });

  test("issuing a token fails loudly", async () => {
    await withEnv(UNSET, () => {
      assert.throws(() => issueToken(), /ADMIN_PASSWORD_NOT_SET/);
    });
  });
});

describe("password check", () => {
  test("accepts the configured password", async () => {
    await withEnv(SET, () => assert.equal(checkPassword(PASSWORD), true));
  });

  test("rejects near misses", async () => {
    await withEnv(SET, () => {
      for (const guess of [
        "",
        PASSWORD.toLowerCase(),
        PASSWORD.toUpperCase(),
        PASSWORD.slice(0, -1),
        `${PASSWORD} `,
        ` ${PASSWORD}`,
        `${PASSWORD}!`,
        "wrong",
        "x".repeat(500),
      ]) {
        assert.equal(checkPassword(guess), false, JSON.stringify(guess));
      }
    });
  });
});

describe("session token", () => {
  test("a freshly issued token verifies", async () => {
    await withEnv(SET, () => {
      assert.equal(verifyToken(issueToken()), true);
    });
  });

  test("the window is the twelve hours the panel advertises", async () => {
    assert.equal(ADMIN_WINDOW_MS, 12 * 60 * 60 * 1000);
    await withEnv(SET, () => {
      const expiry = Number(issueToken().split(".")[0]);
      const hours = (expiry - Date.now()) / 3_600_000;
      assert.ok(hours > 11.9 && hours <= 12, `window was ${hours}h`);
    });
  });

  test("an expired token is refused", async () => {
    await withEnv(SET, () => {
      const past = Date.now() - 1000;
      const valid = issueToken();
      // Same shape, expiry moved into the past.
      const expired = `${past}.${valid.split(".")[1]}`;
      assert.equal(verifyToken(expired), false);
    });
  });

  // Extending the expiry is the obvious forgery attempt: keep the signature,
  // change the timestamp. It fails because the signature covers the timestamp.
  test("the expiry cannot be extended without the secret", async () => {
    await withEnv(SET, () => {
      const [expiry, signature] = issueToken().split(".");
      const extended = `${Number(expiry) + 86_400_000}.${signature}`;
      assert.equal(verifyToken(extended), false);
    });
  });

  test("a tampered signature is refused", async () => {
    await withEnv(SET, () => {
      const [expiry, signature] = issueToken().split(".");
      const flipped = (signature[0] === "a" ? "b" : "a") + signature.slice(1);
      assert.equal(verifyToken(`${expiry}.${flipped}`), false);
    });
  });

  test("a token signed with a different password is refused", async () => {
    let foreign = "";
    await withEnv({ ADMIN_PASSWORD: "some-other-secret" }, () => {
      foreign = issueToken();
    });
    await withEnv(SET, () => {
      assert.equal(verifyToken(foreign), false);
    });
  });

  test("malformed tokens are refused rather than throwing", async () => {
    await withEnv(SET, () => {
      for (const token of [
        undefined,
        "",
        ".",
        "abc",
        "abc.def",
        "9999999999999",
        `${Date.now() + 10_000}.`,
        `${Date.now() + 10_000}`,
        "NaN.deadbeef",
        "Infinity.deadbeef",
      ]) {
        assert.equal(verifyToken(token), false, JSON.stringify(token));
      }
    });
  });
});
