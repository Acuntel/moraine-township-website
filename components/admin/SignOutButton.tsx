"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignOutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        try {
          await fetch("/api/admin/logout", { method: "POST" });
        } catch {
          // Even if the request fails the cookie expires on its own.
        }
        router.refresh();
      }}
      className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-brand-teal-dark transition hover:bg-cream-alt disabled:opacity-60"
    >
      {busy ? "Signing out" : "Sign out"}
    </button>
  );
}
