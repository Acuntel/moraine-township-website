import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, LOCALES } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { TOWNSHIP } from "@/lib/township";
import { Container, PageHeader } from "@/components/Page";
import { DonateButton, WishListButton } from "@/components/DonateButton";
import { CannotAccept } from "@/components/CannotAccept";

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
 * arrives here from the footer or a search result still gets both online
 * paths, each one click from this page, and below them the two ways to give
 * in person: mailing a check and dropping food off at the office. Those were
 * added in the round 2 review, which renamed the options "Ways to Give".
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

            <div className="mt-auto pt-8">
              <WishListButton
                label={t.wishListCta}
                externalNote={dict.common.externalLinkNote}
              />
            </div>
          </div>
        </section>

        {/* The two ways to give in person. */}
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="card flex flex-col p-9">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/10 text-brand-teal-dark">
              <EnvelopeIcon className="h-5 w-5" />
            </span>
            <h2 className="mt-6 text-[1.55rem] font-semibold leading-snug">
              {t.checkHeading}
            </h2>
            <p className="mt-4 leading-[1.72] text-ink-muted">{t.checkBody}</p>
            {/* Laid out as it goes on the envelope. The payee is the Fund's
                legal name, which is not a tax detail. */}
            <address className="mt-4 not-italic font-medium text-brand-teal-dark">
              {TOWNSHIP.charitableFund.legalName}
              <br />
              {TOWNSHIP.address.street}
              <br />
              {TOWNSHIP.address.city}, {TOWNSHIP.address.state}{" "}
              {TOWNSHIP.address.zip}
            </address>
          </div>

          <div className="card flex flex-col p-9">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal-dark">
              <DoorIcon className="h-5 w-5" />
            </span>
            <h2 className="mt-6 text-[1.55rem] font-semibold leading-snug">
              {t.inKindHeading}
            </h2>
            <p className="mt-4 leading-[1.72] text-ink-muted">{t.inKindBody}</p>
            <address className="mt-4 not-italic font-medium text-brand-teal-dark">
              {TOWNSHIP.address.street}
              <br />
              {TOWNSHIP.address.city}, {TOWNSHIP.address.state}{" "}
              {TOWNSHIP.address.zip}
            </address>
            <CannotAccept
              className="mt-7"
              heading={dict.foodPantry.cannotAcceptHeading}
              items={dict.foodPantry.cannotAccept}
            />
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

function EnvelopeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path
        d="M3.5 7l8.5 6 8.5-6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DoorIcon({ className = "" }: { className?: string }) {
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
        d="M4 21h16M6 21V4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21M14.5 12.5h.01"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
