import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  clean,
  looksLikeEmail,
  mailConfigured,
  mailDeliverable,
  mailFrom,
  mailTo,
  sendMail,
} from "@/lib/mail";
import { TOWNSHIP } from "@/lib/township";
import { stubFetch, withEnv } from "./helpers.ts";

describe("where mail goes", () => {
  // The Supervisor was explicit on the call: "it could probably go to our info
  // at okay email address". If this default ever drifts, residents' messages
  // stop reaching the Township and nothing else fails loudly.
  test("defaults to the info address the Supervisor asked for", async () => {
    await withEnv({ MAIL_TO: undefined }, () => {
      assert.equal(mailTo(), "info@morainetownship.org");
      assert.equal(mailTo(), TOWNSHIP.email.info);
    });
  });

  test("MAIL_TO can redirect it without a code change", async () => {
    await withEnv({ MAIL_TO: "clerk@morainetownship.org" }, () => {
      assert.equal(mailTo(), "clerk@morainetownship.org");
    });
  });

  test("an empty MAIL_TO falls back rather than sending to nobody", async () => {
    await withEnv({ MAIL_TO: "" }, () => {
      assert.equal(mailTo(), "info@morainetownship.org");
    });
  });
});

describe("mail configuration", () => {
  test("reports unconfigured with no API key", async () => {
    await withEnv({ RESEND_API_KEY: undefined }, () => {
      assert.equal(mailConfigured(), false);
    });
  });

  test("reports configured once the key is present", async () => {
    await withEnv({ RESEND_API_KEY: "re_test_key" }, () => {
      assert.equal(mailConfigured(), true);
    });
  });

  // Read lazily on purpose. A value captured at import time would be frozen
  // into any page Next prerenders during the build.
  test("picks up an environment change without a reimport", async () => {
    await withEnv({ RESEND_API_KEY: undefined }, () => {
      assert.equal(mailConfigured(), false);
      process.env.RESEND_API_KEY = "re_test_key";
      assert.equal(mailConfigured(), true);
    });
  });

  /**
   * A valid API key is not the same as working email. Resend's shared test
   * sender only delivers to the account owner, so a deployment can hold a good
   * key and still drop every message a resident sends. Confirmed against the
   * live API, which refuses it outright:
   *   403 "You can only send testing emails to your own email address."
   */
  test("is not deliverable from the shared test domain", async () => {
    await withEnv(
      {
        RESEND_API_KEY: "re_test_key",
        MAIL_FROM: "Moraine Township Website <onboarding@resend.dev>",
      },
      () => {
        assert.equal(mailConfigured(), true, "the key is present");
        assert.equal(mailDeliverable(), false, "but it cannot reach the info inbox");
      },
    );
  });

  test("becomes deliverable once the Township domain is verified", async () => {
    await withEnv(
      {
        RESEND_API_KEY: "re_test_key",
        MAIL_FROM: "Moraine Township <noreply@morainetownship.org>",
      },
      () => assert.equal(mailDeliverable(), true),
    );
  });

  test("is never deliverable without a key, whatever the sender says", async () => {
    await withEnv(
      {
        RESEND_API_KEY: undefined,
        MAIL_FROM: "Moraine Township <noreply@morainetownship.org>",
      },
      () => assert.equal(mailDeliverable(), false),
    );
  });

  test("the sender is overridable for the domain cutover", async () => {
    await withEnv({ MAIL_FROM: undefined }, () => {
      assert.match(mailFrom(), /@resend\.dev>$/);
    });
    await withEnv(
      { MAIL_FROM: "Moraine Township <noreply@morainetownship.org>" },
      () => {
        assert.equal(
          mailFrom(),
          "Moraine Township <noreply@morainetownship.org>",
        );
      },
    );
  });
});

describe("sendMail", () => {
  test("refuses to pretend it sent anything with no key", async () => {
    const stub = stubFetch();
    try {
      await withEnv({ RESEND_API_KEY: undefined }, async () => {
        await assert.rejects(
          () => sendMail({ subject: "s", text: "t" }),
          /MAIL_NOT_CONFIGURED/,
        );
        assert.equal(stub.calls.length, 0, "must not call the network");
      });
    } finally {
      stub.restore();
    }
  });

  test("posts the message to Resend in the shape the API expects", async () => {
    const stub = stubFetch({ status: 200, body: '{"id":"abc"}' });
    try {
      await withEnv(
        {
          RESEND_API_KEY: "re_test_key",
          MAIL_TO: undefined,
          MAIL_FROM: "Moraine Township Website <onboarding@resend.dev>",
        },
        async () => {
          await sendMail({
            subject: "Website message from Ana",
            text: "Hello",
            replyTo: "ana@example.com",
          });
        },
      );

      assert.equal(stub.calls.length, 1);
      const call = stub.calls[0];
      assert.equal(call.url, "https://api.resend.com/emails");
      assert.equal(call.method, "POST");
      assert.equal(call.headers.Authorization, "Bearer re_test_key");
      assert.deepEqual(call.body.to, ["info@morainetownship.org"]);
      assert.equal(
        call.body.from,
        "Moraine Township Website <onboarding@resend.dev>",
      );
      assert.equal(call.body.subject, "Website message from Ana");
      assert.equal(call.body.text, "Hello");
      // Reply-To is what lets a clerk answer the resident straight from the
      // info inbox instead of retyping an address out of the message body.
      assert.equal(call.body.reply_to, "ana@example.com");
    } finally {
      stub.restore();
    }
  });

  test("omits reply_to when there is nobody to reply to", async () => {
    const stub = stubFetch();
    try {
      await withEnv({ RESEND_API_KEY: "re_test_key" }, async () => {
        await sendMail({ subject: "s", text: "t" });
      });
      assert.ok(!("reply_to" in stub.calls[0].body));
    } finally {
      stub.restore();
    }
  });

  test("surfaces an upstream rejection instead of swallowing it", async () => {
    const stub = stubFetch({
      status: 403,
      body: "The morainetownship.org domain is not verified",
    });
    try {
      await withEnv({ RESEND_API_KEY: "re_test_key" }, async () => {
        await assert.rejects(
          () => sendMail({ subject: "s", text: "t" }),
          /403[\s\S]*not verified/,
        );
      });
    } finally {
      stub.restore();
    }
  });
});

describe("clean", () => {
  test("trims surrounding whitespace", () => {
    assert.equal(clean("  hello  "), "hello");
  });

  test("caps length so a form post cannot become an email of any size", () => {
    assert.equal(clean("x".repeat(9000), 100).length, 100);
    assert.equal(clean("x".repeat(9000)).length, 2000);
  });

  test("returns empty for anything that is not a string", () => {
    for (const value of [undefined, null, 42, {}, [], true]) {
      assert.equal(clean(value), "");
    }
  });

  test("keeps non-Latin text intact", () => {
    assert.equal(clean("  Здравствуйте  "), "Здравствуйте");
    assert.equal(
      clean("  ¿Dónde está la despensa?  "),
      "¿Dónde está la despensa?",
    );
  });
});

describe("looksLikeEmail", () => {
  test("accepts ordinary addresses", () => {
    for (const value of [
      "info@morainetownship.org",
      "a.b+tag@example.co.uk",
      "resident_1@mail.example.com",
    ]) {
      assert.equal(looksLikeEmail(value), true, value);
    }
  });

  test("rejects what is not an address", () => {
    for (const value of [
      "",
      "no-at-sign",
      "two@@example.com",
      "spaces in@example.com",
      "trailing@dot.",
      "@example.com",
      "user@example",
      "user@example.c",
    ]) {
      assert.equal(looksLikeEmail(value), false, value);
    }
  });
});
