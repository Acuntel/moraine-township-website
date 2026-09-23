import Link from "next/link";
import { DonateButton, WishListButton } from "@/components/DonateButton";

/**
 * The band that repeats the ask at section breaks on long pages. Donate goes
 * straight to PayPal; the wish list sits beside it as an equal, separate path.
 *
 * Under the two buttons, one sentence names the ways to give that are not
 * online (dropping food off at the office, mailing a check) and links to the
 * Donate page, which explains both. Sanela Abazovic asked for that line next
 * to the buttons in the round 2 review.
 */
export function DonateBand({
  label,
  ariaLabel,
  heading,
  body,
  wishListLabel,
  externalNote,
  otherWays,
  otherWaysCta,
  otherWaysHref,
}: {
  label: string;
  ariaLabel: string;
  heading: string;
  body: string;
  wishListLabel: string;
  externalNote: string;
  otherWays: string;
  otherWaysCta: string;
  otherWaysHref: string;
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
        <p className="mt-7 text-[0.98rem] leading-[1.7] text-white">
          {otherWays}{" "}
          <Link
            href={otherWaysHref}
            className="font-semibold text-white underline decoration-white/60 underline-offset-[5px] transition-colors duration-300 hover:decoration-white"
          >
            {otherWaysCta}
          </Link>
        </p>
      </div>
    </aside>
  );
}
