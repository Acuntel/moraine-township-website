import Link from "next/link";
import { adminConfigured, isAdminRequest } from "@/lib/admin-auth";
import { readContent, STORE_CONFIGURED, storeReachable } from "@/lib/store";
import { mailConfigured, mailDeliverable, mailFrom, mailTo } from "@/lib/mail";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminEditor } from "@/components/admin/AdminEditor";
import { SignOutButton } from "@/components/admin/SignOutButton";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const configured = adminConfigured();
  const authed = configured && isAdminRequest();

  if (!authed) {
    return <AdminLogin configured={configured} />;
  }

  const [content, reachable] = await Promise.all([
    readContent(),
    storeReachable(),
  ]);
  const canSave = STORE_CONFIGURED && reachable;

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-[2rem] !text-ink">Website admin</h1>
          <p className="mt-2 max-w-prose text-ink-muted">
            Everything you change here appears on the public site as soon as you
            save. Nothing is published until you press Save.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link className="link text-sm font-semibold" href="/" target="_blank">
            View the website
          </Link>
          <SignOutButton />
        </div>
      </header>

      <StatusPanel
        storeReady={canSave}
        mailReady={mailConfigured()}
        mailDeliverable={mailDeliverable()}
      />

      <AdminEditor initial={content} canSave={canSave} />

      <footer className="mt-12 border-t border-line pt-6 text-sm text-ink-muted">
        <p className="max-w-prose">
          You are signed in for twelve hours, or until you sign out. If you are
          on a shared computer, please sign out when you finish.
        </p>
      </footer>
    </div>
  );
}

/**
 * Says plainly which integrations are live. Without this, an unconfigured
 * deployment looks identical to a working one right up until a save silently
 * fails.
 */
function StatusPanel({
  storeReady,
  mailReady,
  mailDeliverable,
}: {
  storeReady: boolean;
  mailReady: boolean;
  mailDeliverable: boolean;
}) {
  if (storeReady && mailReady && mailDeliverable) {
    return (
      <p className="mt-6 rounded-md border-l-4 border-brand-green bg-white px-5 py-4 text-sm font-semibold text-brand-teal-dark">
        Storage and email are both connected. Changes you save here go live
        immediately.
      </p>
    );
  }

  return (
    <div className="mt-6 rounded-md border-l-4 border-amber-deep bg-[#FFFBEB] p-5">
      <h2 className="font-bold text-[#78350F]">Setup still needed</h2>
      <ul className="mt-2 space-y-1.5 text-sm text-[#78350F]">
        {!storeReady ? (
          <li>
            <strong>Content storage is not connected.</strong> The site is
            showing its built-in starting content, and changes made here cannot
            be saved yet.
          </li>
        ) : null}
        {!mailReady ? (
          <li>
            <strong>Email sending is not connected.</strong> The contact form
            and the call follow-up will report an error rather than pretending
            to send. Add a{" "}
            <code className="rounded bg-[#FDE9C8] px-1">RESEND_API_KEY</code> to
            enable it.
          </li>
        ) : null}
        {mailReady && !mailDeliverable ? (
          <li>
            <strong>
              Email is connected but cannot reach {mailTo()} yet.
            </strong>{" "}
            Messages are being sent from{" "}
            <code className="rounded bg-[#FDE9C8] px-1">{mailFrom()}</code>,
            which is a shared testing address that only delivers to the account
            owner. Verify the morainetownship.org domain with the email
            provider, then set{" "}
            <code className="rounded bg-[#FDE9C8] px-1">MAIL_FROM</code> to an
            address on that domain. Until then the contact form shows the
            resident the Township phone number instead of failing silently.
          </li>
        ) : null}
      </ul>
    </div>
  );
}
