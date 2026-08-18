"use client";

import { useRef, useState } from "react";
import { useReturnToPage } from "@/lib/use-return-to-page";
import { TOWNSHIP } from "@/lib/township";
import type { Dictionary } from "@/content/types";

const FLAG = "moraine.calledAt";

/**
 * How long a call stays worth following up on. There is deliberately no minimum
 * wait: tapping Call and then coming back to the site is the whole trigger, so
 * the prompt is there the moment the resident returns rather than after a delay
 * that mostly read as the feature being broken.
 */
const CALL_WINDOW_MS = 24 * 60 * 60 * 1000;

/**
 * Call button, top right, per the meeting. No SMS: the Township office does
 * not have texting.
 *
 * Clicking it records the moment locally. If the resident comes back to the
 * site afterwards, LeadCapture offers to have someone follow up, which is what
 * makes an after-hours voicemail recoverable.
 */
export function CallButton({
  label,
  srLabel,
  onDark = false,
}: {
  label: string;
  srLabel: string;
  onDark?: boolean;
}) {
  return (
    <a
      href={`tel:${TOWNSHIP.phone.mainHref}`}
      onClick={() => {
        try {
          window.localStorage.setItem(FLAG, String(Date.now()));
        } catch {
          // Private browsing blocks storage. The call still goes through,
          // which is the part that matters.
        }
      }}
      className={`btn px-3.5 py-2.5 text-[0.85rem] 2xl:px-4 ${
        onDark
          ? "btn-ghost-light"
          : "border border-line bg-white text-brand-teal-dark hover:-translate-y-0.5 hover:border-brand-green hover:shadow-md"
      }`}
    >
      <PhoneIcon className="h-4 w-4 shrink-0" />
      {/* The label costs room the nav needs on a laptop. The icon carries it
          below 2xl, and the accessible name is always present. */}
      <span className="hidden 2xl:inline" aria-hidden="true">
        {label} {TOWNSHIP.phone.main}
      </span>
      <span className="sr-only">
        {srLabel} {TOWNSHIP.phone.main}
      </span>
    </a>
  );
}

/**
 * Shown only after someone has actually placed a call and returned. Optional
 * and dismissible on purpose: this is a government service site, and access to
 * help must never sit behind a form.
 */
export function LeadCapture({ copy }: { copy: Dictionary["leadCapture"] }) {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const dismissed = useRef(false);

  /**
   * Check every time the resident comes back to the page, not only on mount.
   *
   * Tapping the Call button hands off to the phone app; it does not reload or
   * remount this page. A mount-only check therefore ran before the call was
   * ever placed and never ran again, so the prompt did not appear when the
   * resident returned. That is the whole reason this component looked broken.
   */
  useReturnToPage(() => {
    if (dismissed.current || visible) return;
    try {
      const raw = window.localStorage.getItem(FLAG);
      if (!raw) return;
      const calledAt = Number(raw);
      if (!Number.isFinite(calledAt)) {
        window.localStorage.removeItem(FLAG);
        return;
      }
      // A day-old flag is not somebody coming back from a call.
      if (Date.now() - calledAt >= CALL_WINDOW_MS) {
        window.localStorage.removeItem(FLAG);
        return;
      }

      setVisible(true);
    } catch {
      // No storage, no prompt.
    }
  });

  function dismiss() {
    // Latched as well as cleared: the checks below now run on every return to
    // the page, so without this a resident who said No thanks would be asked
    // again the next time they switched tabs.
    dismissed.current = true;
    try {
      window.localStorage.removeItem(FLAG);
    } catch {
      // Nothing to clean up.
    }
    setVisible(false);
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, source: "missed-call" }),
      });
      if (!res.ok) {
        // Saying "a staff member will be in touch" when nothing was delivered
        // leaves a resident waiting for a call that is not coming. The phone
        // number in copy.error is the thing that actually helps them.
        setState("error");
        return;
      }
    } catch {
      setState("error");
      return;
    }
    setState("done");
    try {
      window.localStorage.removeItem(FLAG);
    } catch {
      // Ignore.
    }
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="lead-capture-heading"
      className="fixed bottom-5 left-5 z-40 max-h-[calc(100dvh-2.5rem)] w-[min(24rem,calc(100vw-2.5rem))] overflow-y-auto overscroll-contain rounded-2xl border border-brand-mint bg-white p-5 shadow-lift"
    >
      {state === "error" ? (
        <>
          <p className="font-semibold text-red-900">{copy.error}</p>
          <button
            type="button"
            onClick={dismiss}
            className="mt-3 text-sm font-semibold text-brand-teal underline underline-offset-4"
          >
            {copy.dismiss}
          </button>
        </>
      ) : state === "done" ? (
        <>
          <p className="font-semibold text-brand-teal-dark">{copy.success}</p>
          <button
            type="button"
            onClick={dismiss}
            className="mt-3 text-sm font-semibold text-brand-teal underline underline-offset-4"
          >
            {copy.dismiss}
          </button>
        </>
      ) : (
        <form onSubmit={submit}>
          <h2
            id="lead-capture-heading"
            className="text-lg font-bold text-brand-teal-dark"
          >
            {copy.heading}
          </h2>
          <p className="mt-1.5 text-sm text-ink-muted">{copy.body}</p>

          <label
            className="mt-3 block text-sm font-semibold text-ink"
            htmlFor="lead-name"
          >
            {copy.name}
          </label>
          <input
            id="lead-name"
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-ink-muted/40 px-3 py-2"
          />

          <label
            className="mt-3 block text-sm font-semibold text-ink"
            htmlFor="lead-email"
          >
            {copy.email}
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-ink-muted/40 px-3 py-2"
          />

          <div className="mt-4 flex items-center gap-3">
            <button
              type="submit"
              disabled={state === "sending"}
              className="rounded-full bg-brand-teal-dark px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-teal disabled:opacity-60"
            >
              {copy.submit}
            </button>
            <button
              type="button"
              onClick={dismiss}
              className="text-sm font-semibold text-ink-muted underline underline-offset-4"
            >
              {copy.dismiss}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .7-.2 1l-2.3 2.2z" />
    </svg>
  );
}
