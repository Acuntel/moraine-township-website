import { NextResponse } from "next/server";
import { clean, looksLikeEmail, mailConfigured, sendMail } from "@/lib/mail";
import { TOWNSHIP } from "@/lib/township";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot. A real person never fills this in.
  if (clean(payload.company, 100)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(payload.name, 200);
  const email = clean(payload.email, 200);
  const phone = clean(payload.phone, 60);
  const message = clean(payload.message, 5000);

  if (!name || !message || !looksLikeEmail(email)) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  if (!mailConfigured()) {
    // Say so plainly rather than showing the resident a success screen for a
    // message that went nowhere.
    return NextResponse.json({ error: "mail_not_configured" }, { status: 503 });
  }

  try {
    await sendMail({
      subject: `Website message from ${name}`,
      replyTo: email,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        "",
        message,
        "",
        `Sent from the ${TOWNSHIP.name} website contact form.`,
      ]
        .filter(Boolean)
        .join("\n"),
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
