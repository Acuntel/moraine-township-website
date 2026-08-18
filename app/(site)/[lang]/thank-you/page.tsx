import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, localePath, LOCALES } from "@/lib/i18n";
import { TOWNSHIP } from "@/lib/township";
import { Container } from "@/components/Page";
import { BackToSite, Hearts } from "@/components/DonationWelcomeBack";
import { WishListButton } from "@/components/DonateButton";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  if (!isLocale(params.lang)) return {};
  const d = getDictionary(params.lang).thankYou;
  return {
    title: d.title,
    description: d.description,
    // A thank-you page has nothing to offer search. Keep it out of the index.
    robots: { index: false, follow: true },
  };
}

export default function ThankYouPage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const locale = params.lang;
  const dict = getDictionary(locale);
  const t = dict.thankYou;

  return (
    <>
      <Hearts />

      <Container>
        <div className="mx-auto max-w-prose text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">{t.headline}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            {t.body}
          </p>
        </div>

        {/* The tax details the Supervisor wanted held back until after the
            gift. This is the only place on the site they appear. */}
        <div className="mx-auto mt-10 max-w-prose rounded-2xl border-2 border-brand-green bg-surface-alt p-6 sm:p-8">
          <h2 className="text-xl font-bold">{t.taxHeading}</h2>
          <p className="mt-3 text-ink-muted">{t.taxBody}</p>

          <dl className="mt-5 space-y-3">
            <div>
              <dt className="text-sm font-semibold text-ink-muted">
                {TOWNSHIP.charitableFund.legalName}
              </dt>
              <dd className="text-sm text-ink-muted">
                {TOWNSHIP.charitableFund.status}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-ink-muted">
                {t.einLabel}
              </dt>
              <dd className="text-2xl font-bold tracking-wide text-brand-teal-dark">
                {TOWNSHIP.charitableFund.ein}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-ink-muted">
                {t.addressLabel}
              </dt>
              <dd className="font-semibold text-brand-teal-dark">
                {TOWNSHIP.address.street}
                <br />
                {TOWNSHIP.address.city}, {TOWNSHIP.address.state}{" "}
                {TOWNSHIP.address.zip}
              </dd>
            </div>
          </dl>

          <p className="mt-5 text-sm text-ink-muted">{t.visitBody}</p>
        </div>

        <div className="mx-auto mt-10 max-w-prose text-center">
          <h2 className="text-2xl font-bold">{t.nextHeading}</h2>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={localePath(locale, "/get-involved")}
              className="rounded-full bg-brand-teal-dark px-7 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-teal"
            >
              {t.nextVolunteer}
            </Link>
            <WishListButton
              label={t.nextWishList}
              externalNote={dict.common.externalLinkNote}
            />
          </div>
          <div className="mt-6">
            <BackToSite locale={locale} label={t.noThanks} />
          </div>
        </div>
      </Container>
    </>
  );
}
