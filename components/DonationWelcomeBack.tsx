"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useReturnToPage } from "@/lib/use-return-to-page";
import { usePathname, useRouter } from "next/navigation";
import { DONATION_FLAG } from "./DonateButton";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

/**
 * Watches for a donor coming back from PayPal and sends them to the thank-you
 * page, where the hearts are. Mounted once in the site layout so it works no
 * matter which page they were on when they gave.
 *
 * PayPal opens in a new tab, so this page is never reloaded and never remounts.
 * Noticing the return therefore has to be event driven, which is what
 * useReturnToPage does.
 *
 * This is a heuristic, and it is one only because the site is not told when a
 * gift completes. The deterministic fix costs nothing and lives in the PayPal
 * account rather than in this file: set the button's Return URL to
 * https://www.morainetownship.org/thank-you under PayPal, Account Settings,
 * Website payments, Website preferences, with Auto Return on. PayPal then sends
 * every completed donor to the thank-you page itself, exactly once, and only
 * when money actually moved. The timing below stops mattering the day that is
 * switched on.
 */

/**
 * No minimum wait. Clicking Donate and coming back to the site is the trigger,
 * full stop.
 *
 * There was a dwell threshold here, first 20 seconds and then 8, meant to tell
 * a completed gift apart from someone who opened PayPal and changed their mind.
 * It never worked well in either direction: a donor with a saved PayPal account
 * finished inside the window and came back to nothing, which is the failure
 * that actually got reported. Guessing from timing was the wrong instrument.
 *
 * The staleness guard below stays, because a flag left in storage overnight is
 * not somebody returning from PayPal, it is a tab someone forgot about.
 *
 * When PayPal Auto Return is switched on in the Township's PayPal account with
 * a return URL of /thank-you, PayPal sends completed donors here itself and
 * this watcher stops being the thing that matters.
 */
const MAX_AGE_MS = 60 * 60 * 1000;

export function DonationReturnWatcher({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const sent = useRef(false);

  const thankYou = localePath(locale, "/thank-you");
  const onThankYou = pathname === thankYou;

  useReturnToPage(() => {
    if (onThankYou || sent.current) return;
    try {
      const raw = window.localStorage.getItem(DONATION_FLAG);
      if (!raw) return;
      const startedAt = Number(raw);
      if (!Number.isFinite(startedAt)) {
        window.localStorage.removeItem(DONATION_FLAG);
        return;
      }
      const elapsed = Date.now() - startedAt;

      // Too old is a stale flag from a tab left open overnight.
      if (elapsed > MAX_AGE_MS) {
        window.localStorage.removeItem(DONATION_FLAG);
        return;
      }

      // Latch before navigating. Without this, the focus event that follows the
      // route change re-enters this check and replaces the route a second time.
      sent.current = true;
      router.replace(thankYou);
    } catch {
      // No storage, no redirect.
    }
  });

  return null;
}

/**
 * Hearts, not confetti. Asked for by name on the call.
 *
 * Rendered only after mount so the server and client markup agree, and
 * suppressed entirely when the reader has asked for reduced motion, in which
 * case the thank-you message alone carries the moment.
 */
export function Hearts() {
  const [hearts, setHearts] = useState<
    { id: number; left: number; delay: number; size: number }[]
  >([]);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    setHearts(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: 4 + Math.random() * 92,
        delay: Math.random() * 1.6,
        size: 18 + Math.random() * 26,
      })),
    );

    try {
      window.localStorage.removeItem(DONATION_FLAG);
    } catch {
      // Nothing to clean up.
    }
  }, []);

  if (hearts.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
    >
      {hearts.map((heart) => (
        <svg
          key={heart.id}
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 24 24"
          fill="#01A667"
          className="absolute bottom-0 animate-float-up"
          style={{
            left: `${heart.left}%`,
            width: heart.size,
            height: heart.size,
            animationDelay: `${heart.delay}s`,
          }}
        >
          <path d="M12 21s-7.5-4.7-9.6-9A5.6 5.6 0 0 1 12 6.3 5.6 5.6 0 0 1 21.6 12c-2.1 4.3-9.6 9-9.6 9z" />
        </svg>
      ))}
    </div>
  );
}

export function BackToSite({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  return (
    <Link
      href={localePath(locale, "/")}
      className="text-sm font-semibold text-ink-muted underline underline-offset-4 hover:text-ink"
    >
      {label}
    </Link>
  );
}
