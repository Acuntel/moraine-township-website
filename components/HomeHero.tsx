import Link from "next/link";
import type { Dictionary } from "@/content/types";
import { localePath, type Locale } from "@/lib/i18n";
import { LINKS } from "@/lib/township";
import { ReadAloud } from "@/components/ReadAloud";

/**
 * Hero: one photograph with text over it, as asked for, plus the badge and the
 * floating schedule card from the approved mock. The card shows the real
 * pantry hours rather than decoration.
 *
 * The Community Mental Health Board link sits directly under the service area
 * badge so it is on screen without scrolling on a phone as well as a desktop.
 * Sanela Abazovic and Nancy Chausow Shafer asked for it at the top of the home
 * page in the round 2 review. It keeps the site's usual external-link
 * treatment: a new tab, announced to screen readers.
 */
export function HomeHero({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.home;
  return (
    <section className="relative isolate overflow-hidden bg-panel">
      <div
        className="absolute inset-0 -z-10 scale-105 bg-[url('/images/hero-pantry.webp')] bg-cover bg-center"
        role="img"
        aria-label={t.heroImageAlt}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-br from-panel-deep/95 via-panel/85 to-brand-green-deep/75"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-black/45 to-transparent"
      />

      <div className="container-page grid items-center gap-14 pb-28 pt-40 lg:grid-cols-[1.15fr_.85fr] lg:pb-32">
        <div>
          <p className="inline-flex animate-rise-in items-center gap-2.5 rounded-lg border border-white/25 bg-white/10 px-4 py-2 text-[0.78rem] font-medium text-white/90 backdrop-blur-sm sm:rounded-full">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-light"
            />
            {t.heroBadge}
          </p>
          <p
            className="mt-4 animate-rise-in"
            style={{ animationDelay: "40ms" }}
          >
            <a
              href={LINKS.mentalHealthBoard}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.95rem] font-semibold text-white underline decoration-white/60 underline-offset-[5px] transition-colors duration-300 hover:decoration-white"
            >
              {dict.programs.mentalHealthCta}
              <span className="sr-only"> ({dict.common.externalLinkNote})</span>
            </a>
          </p>
          <h1
            className="mt-7 max-w-[15ch] animate-rise-in font-display text-hero !text-white"
            style={{ animationDelay: "80ms" }}
          >
            {t.heroHeadline}
          </h1>
          <p
            className="mt-6 max-w-[34rem] animate-rise-in text-[1.08rem] leading-[1.7] text-white/85"
            style={{ animationDelay: "160ms" }}
          >
            {t.heroSub}
          </p>

          <div
            className="mt-9 flex flex-wrap items-center gap-3.5 animate-rise-in"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href={localePath(locale, "/services")}
              className="btn btn-accent px-8 py-4"
            >
              {t.heroPrimaryCta}
            </Link>
            <Link
              href={localePath(locale, "/get-involved")}
              className="btn btn-ghost-light px-8 py-4"
            >
              {t.heroSecondaryCta}
            </Link>
            <ReadAloud
              locale={locale}
              labelStart={dict.common.readAloud}
              labelStop={dict.common.stopReading}
              labelUnsupported={dict.common.readAloudUnsupported}
              onDark
            />
          </div>
        </div>

        <div
          className="animate-rise-in rounded-lg border border-white/20 bg-white/[0.09] p-7 backdrop-blur-md sm:p-8"
          style={{ animationDelay: "320ms" }}
        >
          <p className="text-center text-[0.72rem] font-bold uppercase tracking-[0.16em] text-amber-light">
            {t.heroCardHeading}
          </p>
          <dl className="mt-6 divide-y divide-white/15">
            {dict.foodPantry.hoursRows.map((row) => (
              <div
                key={row.day}
                className="flex items-baseline justify-between gap-4 py-3.5"
              >
                <dt className="text-[0.95rem] font-semibold text-white">
                  {row.day}
                </dt>
                <dd className="text-[0.92rem] text-white/80">{row.time}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-[0.85rem] leading-[1.6] text-white/70">
            {t.heroCardFootnote}
          </p>
          <Link
            href={localePath(locale, "/food-pantry")}
            className="btn mt-6 w-full bg-white py-3.5 text-[0.9rem] text-panel hover:bg-cream-alt"
          >
            {dict.foodPantry.title}
          </Link>
        </div>
      </div>
    </section>
  );
}
