"use client";

import { LINKS } from "@/lib/township";

/**
 * Every donate control goes straight to PayPal in one click. There is no
 * interstitial page between the reader deciding to give and the payment form.
 *
 * Shopping the pantry wish list is a separate path with its own button, not a
 * choice hidden behind Donate, so neither ask gets in the other's way.
 *
 * The click records the moment locally so that when the donor comes back to the
 * site, DonationReturnWatcher can send them to the thank-you page with the
 * hearts and the tax details. PayPal cannot hand us a token, so this is a local
 * signal about intent. It never claims a payment succeeded.
 */
export const DONATION_FLAG = "moraine.donationStarted";

export function markDonationStarted() {
  try {
    window.localStorage.setItem(DONATION_FLAG, String(Date.now()));
  } catch {
    // Private browsing blocks storage. The donation still goes through, which
    // is the part that matters.
  }
}

type Variant = "floating" | "inline" | "header" | "hero";

export function DonateButton({
  label,
  ariaLabel,
  externalNote,
  variant = "inline",
}: {
  label: string;
  ariaLabel: string;
  /** Announces that PayPal opens in a new tab (WCAG 3.2.5). */
  externalNote: string;
  variant?: Variant;
}) {
  const common = {
    href: LINKS.paypalDonate,
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label": ariaLabel,
    onClick: markDonationStarted,
  } as const;

  if (variant === "floating") {
    return (
      <a
        {...common}
        className="group fixed bottom-6 right-6 z-30 flex h-[4.6rem] w-[4.6rem] flex-col items-center justify-center rounded-full bg-brand-green-deep text-white shadow-glow ring-[6px] ring-cream/70 transition-transform duration-500 ease-flow hover:-translate-y-1 hover:bg-brand-teal-dark sm:h-[5.2rem] sm:w-[5.2rem]"
      >
        <HeartIcon className="h-5 w-5 transition-transform duration-500 ease-bounce group-hover:scale-110 sm:h-6 sm:w-6" />
        <span className="mt-0.5 px-1 text-center text-[0.62rem] font-semibold leading-tight tracking-tight sm:text-[0.7rem]">
          {label}
        </span>
        <span className="sr-only">({externalNote})</span>
      </a>
    );
  }

  if (variant === "header") {
    return (
      <a
        {...common}
        className="btn hidden bg-brand-green-deep px-5 py-2.5 text-[0.85rem] text-white shadow-glow hover:-translate-y-0.5 hover:bg-brand-teal-dark sm:inline-flex"
      >
        <HeartIcon className="h-3.5 w-3.5" />
        {label}
        <span className="sr-only">({externalNote})</span>
      </a>
    );
  }

  if (variant === "hero") {
    return (
      <a
        {...common}
        className="btn bg-white px-8 py-4 text-brand-teal-dark hover:-translate-y-0.5 hover:bg-cream-alt"
      >
        <HeartIcon className="h-4 w-4" />
        {label}
        <span className="sr-only">({externalNote})</span>
      </a>
    );
  }

  return (
    <a {...common} className="btn btn-primary px-8 py-4">
      <HeartIcon className="h-4 w-4" />
      {label}
      <span className="sr-only">({externalNote})</span>
    </a>
  );
}

/**
 * The wish list, given its own button rather than being nested under Donate.
 * Two ways to give, side by side, each one click from wherever the reader is.
 */
export function WishListButton({
  label,
  externalNote,
  tone = "outline",
}: {
  label: string;
  externalNote: string;
  tone?: "outline" | "light";
}) {
  return (
    <a
      href={LINKS.amazonWishList}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn px-7 py-4 ${tone === "light" ? "btn-ghost-light" : "btn-outline"}`}
    >
      <BasketIcon className="h-4 w-4" />
      {label}
      <span className="sr-only"> ({externalNote})</span>
    </a>
  );
}

/**
 * The band that repeats the ask at section breaks on long pages. Donate goes
 * straight to PayPal; the wish list sits beside it as an equal, separate path.
 */
export function DonateBand({
  label,
  ariaLabel,
  heading,
  body,
  wishListLabel,
  externalNote,
}: {
  label: string;
  ariaLabel: string;
  heading: string;
  body: string;
  wishListLabel: string;
  externalNote: string;
}) {
  return (
    <aside className="overflow-hidden rounded-xl bg-brand-teal-dark px-6 py-14 text-white sm:px-12">
      <div className="mx-auto max-w-prose text-center">
        <h2 className="text-section font-semibold !text-white">{heading}</h2>
        <p className="mx-auto mt-4 max-w-[38rem] text-[1.02rem] leading-[1.7] text-white/80">
          {body}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
          <DonateButton
            label={label}
            ariaLabel={ariaLabel}
            externalNote={externalNote}
            variant="hero"
          />
          <WishListButton
            label={wishListLabel}
            externalNote={externalNote}
            tone="light"
          />
        </div>
      </div>
    </aside>
  );
}

export function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 21s-7.5-4.7-9.6-9A5.6 5.6 0 0 1 12 6.3 5.6 5.6 0 0 1 21.6 12c-2.1 4.3-9.6 9-9.6 9z" />
    </svg>
  );
}

function BasketIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 8h18l-1.6 10.2a2 2 0 0 1-2 1.8H6.6a2 2 0 0 1-2-1.8L3 8zM8 8l2.2-4.4M16 8l-2.2-4.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
