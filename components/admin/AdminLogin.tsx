"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLogin({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (response.ok) {
        router.refresh();
        return;
      }
      setError("That password did not match. Please try again.");
    } catch {
      setError("Something went wrong signing in. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md px-5 py-20">
      <h1 className="text-2xl font-bold">Website admin</h1>

      {!configured ? (
        <div className="mt-5 rounded-xl border-l-4 border-amber-600 bg-amber-50 p-5 text-sm text-amber-900">
          <p className="font-bold">No admin password has been set yet.</p>
          <p className="mt-2">
            Set the{" "}
            <code className="rounded bg-amber-100 px-1">ADMIN_PASSWORD</code>{" "}
            environment variable in the hosting dashboard, then reload this
            page. Until then the admin panel stays closed.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-6">
          <label className="block font-semibold" htmlFor="admin-password">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-ink-muted/40 px-3 py-2.5"
          />
          <div
            role="alert"
            aria-live="assertive"
            className="mt-3 text-sm font-semibold text-red-800"
          >
            {error}
          </div>
          <button
            type="submit"
            disabled={busy}
            className="mt-4 w-full rounded-full bg-brand-teal-dark px-6 py-3 font-bold text-white transition hover:bg-brand-teal disabled:opacity-60"
          >
            {busy ? "Signing in" : "Sign in"}
          </button>
        </form>
      )}
    </div>
  );
}
