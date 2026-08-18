import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, LOCALES } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { LINKS, TOWNSHIP } from "@/lib/township";
import { Card, Container, PageHeader } from "@/components/Page";
import { readContent } from "@/lib/store";
import { DocumentList } from "@/components/DocumentList";
import { byCategory } from "@/lib/documents";
import { DonateBand } from "@/components/DonateButton";

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
  const d = getDictionary(params.lang).getInvolved;
  return buildMetadata({
    locale: params.lang,
    route: "/get-involved",
    title: d.title,
    description: d.description,
  });
}

export default async function GetInvolvedPage({
  params,
}: {
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const locale = params.lang;
  const dict = getDictionary(locale);
  const t = dict.getInvolved;
  // Only photographs that carry a description are published.
  const photos = (await readContent()).photos.filter((p) => p.alt.trim());

  return (
    <>
      <PageHeader locale={locale} dict={dict} title={t.h1} intro={t.intro} />

      <Container className="space-y-14">
        {/* The number one ask sits alone at the top, per the meeting: the
            single most useful thing first, not buried in a list of nine. */}
        <section id="apply" className="scroll-mt-28">
          <div className="rounded-2xl border-2 border-brand-green bg-surface-alt p-6 sm:p-10">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-teal">
              {t.topAskHeading}
            </p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              {t.ways[0].title}
            </h2>
            <p className="mt-3 max-w-prose text-ink-muted">{t.topAskBody}</p>
            <a
              href={LINKS.volunteerApplication}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-brand-teal-dark px-7 py-4 text-lg font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-teal"
            >
              {t.topAskCta}
              <span className="sr-only"> ({dict.common.externalLinkNote})</span>
            </a>
          </div>
        </section>

        <section id="forms" className="scroll-mt-32">
          <DocumentList
            docs={byCategory("volunteer")}
            pdfNote={dict.common.pdfNote}
            externalNote={dict.common.externalLinkNote}
          />
        </section>

        <section id="ways" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">{t.waysHeading}</h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.ways.slice(1).map((way) => (
              <li key={way.title}>
                <Card className="h-full">
                  <h3 className="text-lg font-bold">{way.title}</h3>
                  <p className="mt-2 text-ink-muted">{way.body}</p>
                </Card>
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
        />

        {photos.length > 0 ? (
          <section id="photos" className="scroll-mt-32">
            <h2 className="text-section font-semibold">{t.photosHeading}</h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((photo) => (
                <li key={photo.id}>
                  <figure className="overflow-hidden rounded-lg border border-line bg-white shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.url}
                      alt={photo.alt}
                      className="h-52 w-full object-cover"
                      loading="lazy"
                    />
                    {photo.caption ? (
                      <figcaption className="px-5 py-4 text-sm text-ink-muted">
                        {photo.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

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
              href={`mailto:${TOWNSHIP.email.volunteer}`}
            >
              {TOWNSHIP.email.volunteer}
            </a>
          </p>
        </section>
      </Container>
    </>
  );
}
