import { TOWNSHIP } from "./township";

/**
 * Outbound mail via Resend's REST API. Reached with plain fetch so there is no
 * SDK to keep in step with the runtime.
 *
 * Everything the site sends goes to info@morainetownship.org, which is the
 * address the Supervisor named on the call for both contact messages and
 * missed-call follow-ups:
 *
 *   "it could probably go to our info at okay email address yeah okay cool"
 *
 * Every value below is read when a message is sent, not when this module is
 * first imported. Reading them at import time bakes whatever happened to be in
 * the environment during the build into any page that touches this file, which
 * is how a site ends up rendering "email is not configured" on a server where
 * the key is present.
 */

function key(): string | undefined {
  return process.env.RESEND_API_KEY || undefined;
}

/** Where residents' messages land. */
export function mailTo(): string {
  return process.env.MAIL_TO || TOWNSHIP.email.info;
}

/**
 * The envelope sender. Must be an address on a domain verified in Resend, so
 * it changes when morainetownship.org is verified during the DNS cutover.
 */
export function mailFrom(): string {
  return (
    process.env.MAIL_FROM || "Moraine Township Website <onboarding@resend.dev>"
  );
}

export function mailConfigured(): boolean {
  return Boolean(key());
}

/**
 * Whether mail can actually reach the Township, which is not the same question
 * as whether a key is present.
 *
 * onboarding@resend.dev is Resend's shared test sender, and it will only
 * deliver to the address that owns the Resend account. Addressed to
 * info@morainetownship.org it is refused outright:
 *
 *   403 "You can only send testing emails to your own email address."
 *
 * So a deployment can hold a perfectly valid API key and still drop every
 * message a resident sends. Verifying morainetownship.org in Resend and
 * pointing MAIL_FROM at it is what closes that gap.
 */
export function mailDeliverable(): boolean {
  if (!mailConfigured()) return false;
  const domain = mailFrom().split("@").pop()?.replace(/>$/, "").toLowerCase();
  return Boolean(domain) && domain !== "resend.dev";
}

export async function sendMail({
  subject,
  text,
  replyTo,
}: {
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<void> {
  const apiKey = key();
  if (!apiKey) {
    throw new Error("MAIL_NOT_CONFIGURED");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: mailFrom(),
      to: [mailTo()],
      subject,
      text,
      // So a clerk can reply straight to the resident from the info inbox
      // instead of copying the address out of the message body.
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Mail send failed with ${response.status}: ${detail}`);
  }
}

/** Trim and cap free-text so a form post cannot become an email of any size. */
export function clean(value: unknown, max = 2000): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}
