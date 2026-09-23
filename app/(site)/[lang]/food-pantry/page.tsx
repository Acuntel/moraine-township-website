import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, localePath, LOCALES } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { TOWNSHIP } from "@/lib/township";
import { localizedPantryItems, readContent } from "@/lib/store";
import { fileSize, FORMS } from "@/lib/documents";
import { Card, Container, PageHeader } from "@/components/Page";
import { CannotAccept } from "@/components/CannotAccept";
import { WishListButton } from "@/components/DonateButton";
import { DonateBand } from "@/components/DonateBand";

// This page renders admin-editable content, so it revalidates on save and
// at worst every five minutes.
export const revalidate = 300;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  if (!isLocale(params.lang)) return {};
  const d = getDictionary(params.lang).foodPantry;
  return buildMetadata({
    locale: params.lang,
    route: "/food-pantry",
    title: d.title,
    description: d.description,
  });
}

export default async function FoodPantryPage({
  params,
}: {
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const locale = params.lang;
  const dict = getDictionary(locale);
  const t = dict.foodPantry;
  const content = await readContent();
  const pantry = localizedPantryItems(content.pantry, locale);

  return (
    <>
      <PageHeader locale={locale} dict={dict} title={t.h1} intro={t.intro} />

      <Container className="space-y-14">
        {/* What the pantry is for, in Rachel Jacoby's words from the round 2
            review, beside the photograph she asked for. The photo is from the
            Township's own volunteer photo page; Rachel offered one of her own,
            which can replace it at the same path. */}
        <div
          id="about"
          className="grid scroll-mt-28 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)]"
        >
          <div className="max-w-prose space-y-4">
            {t.lead.map((text) => (
              <p
                key={text}
                className="font-display text-[1.25rem] leading-[1.6] text-brand-teal-dark sm:text-[1.4rem]"
              >
                {text}
              </p>
            ))}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/round2/pantry-800.webp"
            srcSet="/images/round2/pantry-800.webp 800w, /images/round2/pantry.webp 1400w"
            sizes="(min-width: 1024px) 480px, calc(100vw - 40px)"
            width={1400}
            height={1050}
            alt={t.imageAlt}
            decoding="async"
            className="aspect-[4/3] w-full rounded-lg border border-line bg-cream-alt object-cover shadow-sm"
          />
        </div>

        {/* Wish list first, one paragraph, exactly as asked on the call: people
            buy at the top and read where to drop off at the bottom. */}
        <section id="wish-list" className="scroll-mt-28">
          <div className="rounded-lg border border-brand-green/40 bg-cream-alt p-8 sm:p-10">
            <h2 className="text-section font-semibold">{t.wishListHeading}</h2>
            <p className="mt-3 max-w-prose text-ink-muted">{t.wishListBody}</p>
            <div className="mt-6">
              <WishListButton
                label={t.wishListCta}
                externalNote={dict.common.externalLinkNote}
              />
            </div>
          </div>
        </section>

        <section id="shopping-list" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t.shoppingListHeading}
          </h2>
          <p className="mt-2 max-w-prose text-ink-muted">
            {t.shoppingListIntro}
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            {t.shoppingListUpdated}{" "}
            <time dateTime={content.pantry.updated}>
              {content.pantry.updated}
            </time>
          </p>
          <ul className="mt-5 grid max-w-2xl gap-3 sm:grid-cols-2">
            {pantry.items.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-brand-mint/60 bg-white px-4 py-3 font-semibold shadow-card"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <h2 className="text-xl font-bold">{t.eligibilityHeading}</h2>
            <p className="mt-3 text-ink-muted">{t.eligibilityBody}</p>
          </Card>

          <Card>
            <h2 className="text-xl font-bold">{t.hoursHeading}</h2>
            <dl className="mt-3 space-y-2">
              {t.hoursRows.map((row) => (
                <div key={row.day} className="flex justify-between gap-4">
                  <dt className="font-semibold">{row.day}</dt>
                  <dd className="text-ink-muted">{row.time}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card>
            <h2 className="text-xl font-bold">{t.receiveHeading}</h2>
            <p className="mt-3 text-ink-muted">{t.receiveBody}</p>
          </Card>
        </div>

        <section id="applications" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t.applicationsHeading}
          </h2>
          <p className="mt-3 max-w-prose text-ink-muted">
            {t.applicationsBody}
          </p>
          <ul className="mt-5 flex flex-wrap gap-3">
            {[
              {
                doc: FORMS.pantryEnglish,
                label: "English application",
                lang: "en",
              },
              {
                doc: FORMS.pantrySpanish,
                label: "Solicitud en español",
                lang: "es",
              },
              {
                doc: FORMS.pantryRussian,
                label: "Заявление на русском языке",
                lang: "ru",
              },
            ]
              .filter((f) => f.doc)
              .map((f) => (
                <li key={f.lang}>
                  <a
                    className="btn btn-outline px-6 py-3 text-[0.92rem]"
                    href={f.doc!.url}
                    lang={f.lang}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {f.label}
                    <span className="whitespace-nowrap text-ink-muted">
                      ({f.doc!.ext.toUpperCase()}, {fileSize(f.doc!.bytes)})
                    </span>
                    <span className="sr-only">
                      ({dict.common.pdfNote}, {dict.common.externalLinkNote})
                    </span>
                  </a>
                </li>
              ))}
          </ul>
        </section>

        <DonateBand
          label={dict.common.donateNow}
          ariaLabel={dict.common.donateAria}
          heading={dict.donate.h1}
          body={dict.donate.bandBody}
          wishListLabel={dict.donate.wishListCta}
          externalNote={dict.common.externalLinkNote}
          otherWays={dict.donate.bandOtherWays}
          otherWaysCta={dict.donate.bandOtherWaysCta}
          otherWaysHref={localePath(locale, "/donate")}
        />

        {/* Drop-off last, on purpose. */}
        <section
          id="drop-off"
          className="grid scroll-mt-28 items-start gap-8 lg:grid-cols-[1fr_22rem]"
        >
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              {t.dropOffHeading}
            </h2>
            <p className="mt-3 max-w-prose text-ink-muted">{t.dropOffBody}</p>
            <address className="mt-4 not-italic font-semibold text-brand-teal-dark">
              {TOWNSHIP.address.street}
              <br />
              {TOWNSHIP.address.city}, {TOWNSHIP.address.state}{" "}
              {TOWNSHIP.address.zip}
              <br />
              {dict.shared.hours}
            </address>
          </div>
          <CannotAccept
            heading={t.cannotAcceptHeading}
            items={t.cannotAccept}
          />
        </section>

        <section id="contact" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">{t.contactHeading}</h2>
          <p className="mt-3 max-w-prose text-ink-muted">{t.contactBody}</p>
          <p className="mt-3">
            <a
              className="link font-semibold"
              href={`tel:${TOWNSHIP.phone.mainHref}`}
            >
              {TOWNSHIP.phone.main}
            </a>
            {" · "}
            <a
              className="link font-semibold"
              href={`mailto:${TOWNSHIP.email.coordinator}`}
            >
              {TOWNSHIP.email.coordinator}
            </a>
          </p>
          <Link
            href={localePath(locale, "/get-involved")}
            className="mt-6 inline-block rounded-full border-2 border-brand-teal-dark px-6 py-3 font-bold text-brand-teal-dark transition hover:bg-brand-teal-dark hover:text-white"
          >
            {t.volunteerCta}
          </Link>
        </section>
      </Container>
    </>
  );
}
