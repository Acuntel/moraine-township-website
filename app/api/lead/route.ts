import { NextResponse } from "next/server";
import { clean, looksLikeEmail, mailConfigured, sendMail } from "@/lib/mail";
import { TOWNSHIP } from "@/lib/township";

export const runtime = "nodejs";

/**
 * Missed-call follow-up. Someone tapped Call, came back to the site, and asked
 * us to reach out. The Supervisor wanted these to land in the info inbox so an
 * after-hours voicemail is not the only trace of the call.
 */
export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const name = clean(payload.name, 200);
  const email = clean(payload.email, 200);
  const source = clean(payload.source, 60) || "website";

  if (!name || !looksLikeEmail(email)) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  if (!mailConfigured()) {
    return NextResponse.json({ error: "mail_not_configured" }, { status: 503 });
  }

  const when = new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago",
  });

  try {
    await sendMail({
      subject: `Call follow-up requested: ${name}`,
      replyTo: email,
      text: [
        `${name} called the Township and asked for a follow-up.`,
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Requested: ${when} (Central)`,
        `Source: ${source}`,
        "",
        `Sent from the ${TOWNSHIP.name} website.`,
      ].join("\n"),
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
