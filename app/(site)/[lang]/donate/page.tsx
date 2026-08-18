import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, LOCALES } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { TOWNSHIP } from "@/lib/township";
import { Container, PageHeader } from "@/components/Page";
import { DonateButton, WishListButton } from "@/components/DonateButton";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  if (!isLocale(params.lang)) return {};
  const d = getDictionary(params.lang).donate;
  return buildMetadata({
    locale: params.lang,
    route: "/donate",
    title: d.title,
    description: d.description,
  });
}

/**
 * This page explains the giving options. It is not in the path of the donate
 * buttons: every one of those goes straight to PayPal in one click. Anyone who
 * arrives here from the footer or a search result still gets both paths, each
 * one click from this page.
 */
export default function DonatePage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const dict = getDictionary(params.lang);
  const t = dict.donate;

  return (
    <>
      <PageHeader
        locale={params.lang}
        dict={dict}
        title={t.h1}
        intro={t.intro}
        kicker={t.optionsHeading}
      />

      <Container className="space-y-16">
        <p className="max-w-prose text-[1.08rem] leading-[1.75] text-ink-muted">
          {t.lead}
        </p>

        <section className="grid gap-6 lg:grid-cols-2">
          {/* Money. One click to PayPal, where the Township's own dropdown
              handles the designation. */}
          <div className="card flex flex-col border-brand-green/40 bg-white p-9">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/10 text-brand-teal-dark">
              <HeartIcon className="h-5 w-5" />
            </span>
            <h2 className="mt-6 text-[1.55rem] font-semibold leading-snug">
              {t.moneyHeading}
            </h2>
            <p className="mt-4 leading-[1.72] text-ink-muted">{t.moneyBody}</p>
            <p className="mt-6 text-[0.95rem] font-medium text-ink">
              {t.designationsIntro}
            </p>
            <ul className="mt-3 space-y-2 text-[0.98rem] text-ink-muted">
              {t.designations.map((item) => (
                <li key={item} className="relative pl-6">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[0.66em] h-1.5 w-1.5 rounded-full bg-brand-green"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <DonateButton
                label={t.moneyCta}
                ariaLabel={dict.common.donateAria}
                externalNote={dict.common.externalLinkNote}
              />
            </div>
          </div>

          {/* Food. Its own path with its own button, not a choice tucked
              underneath Donate. */}
          <div className="card flex flex-col bg-cream-alt p-9">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal-dark">
              <BasketIcon className="h-5 w-5" />
            </span>
            <h2 className="mt-6 text-[1.55rem] font-semibold leading-snug">
              {t.wishListHeading}
            </h2>
            <p className="mt-4 leading-[1.72] text-ink-muted">
              {t.wishListBody}
            </p>

            <h3 className="mt-8 text-[1.05rem] font-semibold">
              {t.inKindHeading}
            </h3>
            <p className="mt-3 leading-[1.72] text-ink-muted">{t.inKindBody}</p>
            <address className="mt-4 not-italic font-medium text-brand-teal-dark">
              {TOWNSHIP.address.street}
              <br />
              {TOWNSHIP.address.city}, {TOWNSHIP.address.state}{" "}
              {TOWNSHIP.address.zip}
            </address>

            <div className="mt-auto pt-8">
              <WishListButton
                label={t.wishListCta}
                externalNote={dict.common.externalLinkNote}
              />
            </div>
          </div>
        </section>

        {/*
          Tax details are deliberately not on this page. The Supervisor was
          clear that showing them before the gift risks suppressing it, and that
          what a donor actually needs is the receipt information after. They
          live on /thank-you.
        */}
        <p className="max-w-prose rounded-md border-l-2 border-brand-green bg-cream-alt px-6 py-5 text-[0.95rem] leading-[1.7] text-ink-muted">
          {t.fundNote}
        </p>
      </Container>
    </>
  );
}

function HeartIcon({ className = "" }: { className?: string }) {
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
