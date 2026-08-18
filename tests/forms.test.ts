import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { POST as contact } from "@/app/api/contact/route";
import { POST as lead } from "@/app/api/lead/route";
import { postJson, stubFetch, withEnv } from "./helpers.ts";

/**
 * The two ways a resident reaches the Township from this site: the contact form
 * and the missed-call follow-up. Both were specified on the planning call, and
 * both must land in info@morainetownship.org.
 *
 * The failure that matters most here is not an exception. It is a form that
 * shows a resident a success screen for a message that went nowhere, which is
 * exactly what happens if the API key is missing and nobody checks. Several of
 * the tests below exist only to hold that line.
 */

const CONFIGURED = {
  RESEND_API_KEY: "re_test_key",
  MAIL_TO: undefined,
  MAIL_FROM: "Moraine Township Website <onboarding@resend.dev>",
};

const VALID_CONTACT = {
  name: "Ana Ruiz",
  email: "ana@example.com",
  phone: "847-555-0142",
  message: "What documents do I need to bring to the food pantry?",
};

describe("contact form", () => {
  test("delivers a valid message to the info inbox", async () => {
    const stub = stubFetch({ status: 200, body: '{"id":"x"}' });
    try {
      await withEnv(CONFIGURED, async () => {
        const res = await contact(
          postJson("http://localhost/api/contact", VALID_CONTACT),
        );
        assert.equal(res.status, 200);
        assert.deepEqual(await res.json(), { ok: true });

        assert.equal(stub.calls.length, 1);
        const mail = stub.calls[0].body as Record<string, unknown>;
        assert.deepEqual(mail.to, ["info@morainetownship.org"]);
        assert.equal(mail.reply_to, "ana@example.com");
        assert.match(String(mail.subject), /Ana Ruiz/);

        // Everything the resident typed has to survive into the email. A form
        // that silently drops the phone number is worse than one that fails.
        const body = String(mail.text);
        assert.match(body, /Ana Ruiz/);
        assert.match(body, /ana@example\.com/);
        assert.match(body, /847-555-0142/);
        assert.match(body, /food pantry\?/);
      });
    } finally {
      stub.restore();
    }
  });

  test("sends without a phone number, which is optional", async () => {
    const stub = stubFetch();
    try {
      await withEnv(CONFIGURED, async () => {
        const res = await contact(
          postJson("http://localhost/api/contact", {
            ...VALID_CONTACT,
            phone: "",
          }),
        );
        assert.equal(res.status, 200);
        assert.doesNotMatch(String(stub.calls[0].body.text), /Phone:/);
      });
    } finally {
      stub.restore();
    }
  });

  test("carries Spanish and Russian text through unmangled", async () => {
    const stub = stubFetch();
    try {
      await withEnv(CONFIGURED, async () => {
        await contact(
          postJson("http://localhost/api/contact", {
            name: "Иван Петров",
            email: "ivan@example.com",
            message: "¿A qué hora abre la despensa? Спасибо.",
          }),
        );
        const body = String(stub.calls[0].body.text);
        assert.match(body, /Иван Петров/);
        assert.match(body, /¿A qué hora abre la despensa\? Спасибо\./);
      });
    } finally {
      stub.restore();
    }
  });

  test("refuses rather than showing a false success when mail is off", async () => {
    const stub = stubFetch();
    try {
      await withEnv({ ...CONFIGURED, RESEND_API_KEY: undefined }, async () => {
        const res = await contact(
          postJson("http://localhost/api/contact", VALID_CONTACT),
        );
        assert.equal(res.status, 503);
        assert.deepEqual(await res.json(), { error: "mail_not_configured" });
        assert.equal(stub.calls.length, 0);
      });
    } finally {
      stub.restore();
    }
  });

  test("reports a send failure rather than claiming success", async () => {
    const stub = stubFetch({ status: 422, body: "domain not verified" });
    try {
      await withEnv(CONFIGURED, async () => {
        const res = await contact(
          postJson("http://localhost/api/contact", VALID_CONTACT),
        );
        assert.equal(res.status, 502);
        assert.deepEqual(await res.json(), { error: "send_failed" });
      });
    } finally {
      stub.restore();
    }
  });

  test("swallows the honeypot without mailing anyone", async () => {
    const stub = stubFetch();
    try {
      await withEnv(CONFIGURED, async () => {
        const res = await contact(
          postJson("http://localhost/api/contact", {
            ...VALID_CONTACT,
            company: "Acme SEO Services",
          }),
        );
        // A bot gets an ordinary success so it has nothing to tune against.
        assert.equal(res.status, 200);
        assert.deepEqual(await res.json(), { ok: true });
        assert.equal(stub.calls.length, 0, "honeypot must not send mail");
      });
    } finally {
      stub.restore();
    }
  });

  test("rejects incomplete submissions", async () => {
    const stub = stubFetch();
    const cases: Array<[string, Record<string, unknown>]> = [
      ["no name", { ...VALID_CONTACT, name: "" }],
      ["whitespace name", { ...VALID_CONTACT, name: "   " }],
      ["no message", { ...VALID_CONTACT, message: "" }],
      ["no email", { ...VALID_CONTACT, email: "" }],
      ["malformed email", { ...VALID_CONTACT, email: "not-an-address" }],
      ["name is not a string", { ...VALID_CONTACT, name: 42 }],
    ];
    try {
      await withEnv(CONFIGURED, async () => {
        for (const [label, payload] of cases) {
          const res = await contact(
            postJson("http://localhost/api/contact", payload),
          );
          assert.equal(res.status, 400, label);
          assert.deepEqual(
            await res.json(),
            { error: "missing_fields" },
            label,
          );
        }
        assert.equal(stub.calls.length, 0);
      });
    } finally {
      stub.restore();
    }
  });

  test("rejects a body that is not JSON", async () => {
    await withEnv(CONFIGURED, async () => {
      const res = await contact(
        postJson("http://localhost/api/contact", "{ not json"),
      );
      assert.equal(res.status, 400);
      assert.deepEqual(await res.json(), { error: "invalid_json" });
    });
  });

  test("caps an enormous message instead of relaying it whole", async () => {
    const stub = stubFetch();
    try {
      await withEnv(CONFIGURED, async () => {
        await contact(
          postJson("http://localhost/api/contact", {
            ...VALID_CONTACT,
            message: "x".repeat(100_000),
          }),
        );
        assert.ok(String(stub.calls[0].body.text).length < 6000);
      });
    } finally {
      stub.restore();
    }
  });
});

describe("missed-call follow-up", () => {
  const VALID_LEAD = { name: "Ana Ruiz", email: "ana@example.com" };

  test("reaches the info inbox with the caller's details", async () => {
    const stub = stubFetch();
    try {
      await withEnv(CONFIGURED, async () => {
        const res = await lead(
          postJson("http://localhost/api/lead", {
            ...VALID_LEAD,
            source: "pantry-page",
          }),
        );
        assert.equal(res.status, 200);

        const mail = stub.calls[0].body as Record<string, unknown>;
        assert.deepEqual(mail.to, ["info@morainetownship.org"]);
        assert.equal(mail.reply_to, "ana@example.com");
        assert.match(String(mail.subject), /Ana Ruiz/);

        const body = String(mail.text);
        assert.match(body, /ana@example\.com/);
        assert.match(body, /pantry-page/);
        // Central time, so a clerk reads the hour the resident actually called.
        assert.match(body, /Central/);
      });
    } finally {
      stub.restore();
    }
  });

  test("labels the source as the website when none is given", async () => {
    const stub = stubFetch();
    try {
      await withEnv(CONFIGURED, async () => {
        await lead(postJson("http://localhost/api/lead", VALID_LEAD));
        assert.match(String(stub.calls[0].body.text), /Source: website/);
      });
    } finally {
      stub.restore();
    }
  });

  test("refuses when mail is off", async () => {
    const stub = stubFetch();
    try {
      await withEnv({ ...CONFIGURED, RESEND_API_KEY: undefined }, async () => {
        const res = await lead(
          postJson("http://localhost/api/lead", VALID_LEAD),
        );
        assert.equal(res.status, 503);
        assert.equal(stub.calls.length, 0);
      });
    } finally {
      stub.restore();
    }
  });

  test("rejects a follow-up with no way to follow up", async () => {
    await withEnv(CONFIGURED, async () => {
      for (const payload of [
        { name: "", email: "ana@example.com" },
        { name: "Ana", email: "" },
        { name: "Ana", email: "nope" },
      ]) {
        const res = await lead(postJson("http://localhost/api/lead", payload));
        assert.equal(res.status, 400);
      }
    });
  });
});
