import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, localePath, LOCALES } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { TOWNSHIP } from "@/lib/township";
import { Container, PageHeader, Paragraphs } from "@/components/Page";
import { DocumentList } from "@/components/DocumentList";
import { DocGroup, documentCount } from "@/components/DocGroup";
import { OpenOnHash } from "@/components/OpenOnHash";
import { byCategory, newestFirst } from "@/lib/documents";
import { photosFor } from "@/content/cemetery-images";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  if (!isLocale(params.lang)) return {};
  const d = getDictionary(params.lang).cemeteries;
  return buildMetadata({
    locale: params.lang,
    route: "/cemeteries",
    title: d.title,
    description: d.description,
  });
}

export default function CemeteriesPage({
  params,
}: {
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const locale = params.lang;
  const dict = getDictionary(locale);
  const t = dict.cemeteries;

  const cemeteries = [
    {
      key: "mooney",
      heading: t.mooneyHeading,
      location: t.mooneyLocation,
      body: t.mooneyBody,
      cta: t.mooneyCta,
      image: "/images/cemetery-mooney.webp",
      focal: "center 32%",
      imageAlt: t.mooneyImageAlt,
      href: "/cemeteries/mooney",
    },
    {
      key: "daggitt",
      heading: t.daggittHeading,
      location: t.daggittLocation,
      body: t.daggittBody,
      cta: t.daggittCta,
      image: "/images/cemetery-daggitt.webp",
      focal: "center 60%",
      imageAlt: t.daggittImageAlt,
      href: "/cemeteries/daggitt",
    },
  ];

  return (
    <>
      <PageHeader locale={locale} dict={dict} title={t.h1} intro={t.intro} />

      <Container className="space-y-14">
        <Paragraphs items={t.introBody} />

        {/* The Supervisor asked for paragraphs and images here rather than the
            wall of unbroken text the old pages carried. */}
        {cemeteries.map((c) => (
          <section key={c.key} id={c.key} className="scroll-mt-32">
            <article className="overflow-hidden rounded-lg border border-line bg-white shadow-sm">
              <div
                className="h-64 bg-cream-alt bg-cover sm:h-72"
                style={{
                  backgroundImage: `url('${c.image}')`,
                  backgroundPosition: c.focal,
                }}
                role="img"
                aria-label={c.imageAlt}
              />
              <div className="p-7 sm:p-9">
                <h2 className="font-display text-[1.6rem] !text-ink sm:text-[1.9rem]">
                  {c.heading}
                </h2>
                <p className="mt-1.5 font-medium text-brand-teal">
                  {c.location}
                </p>
                <div className="mt-5">
                  <Paragraphs items={c.body} />
                </div>
                <ul className="mt-7 grid gap-4 sm:grid-cols-3">
                  {photosFor(c.key as "mooney" | "daggitt")
                    .slice(1)
                    .map((photo) => (
                      <li key={photo.id}>
                        <figure>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={photo.src}
                            alt={photo.alt[locale]}
                            loading="lazy"
                            className="h-40 w-full rounded-md border border-line object-cover"
                          />
                          <figcaption className="mt-2 text-[0.82rem] leading-snug text-ink-muted">
                            {photo.caption[locale]}
                          </figcaption>
                        </figure>
                      </li>
                    ))}
                </ul>

                <Link
                  className="link mt-7 inline-block font-medium"
                  href={localePath(locale, c.href)}
                >
                  {c.cta}
                </Link>
              </div>
            </article>
          </section>
        ))}

        {/* One button to open, not a wall of deeds and plats (round 2). */}
        <section>
          <DocGroup
            id="records"
            level={2}
            title={t.recordsHeading}
            count={documentCount(
              dict.common.documentCount,
              byCategory("cemetery").length,
              locale,
            )}
            note={t.recordsNote}
          >
            <DocumentList
              docs={newestFirst(byCategory("cemetery"))}
              pdfNote={dict.common.pdfNote}
              wordNote={dict.shared.wordNote}
              externalNote={dict.common.externalLinkNote}
            />
          </DocGroup>
        </section>

        <section className="rounded-lg bg-cream-alt p-7 sm:p-9">
          <h2 className="text-[1.3rem] font-semibold">{t.contactHeading}</h2>
          <p className="mt-3 max-w-prose text-ink-muted">{t.contactBody}</p>
          <p className="mt-4">
            <a
              className="link font-medium"
              href={`tel:${TOWNSHIP.phone.mainHref}`}
            >
              {TOWNSHIP.phone.main}
            </a>
            {" · "}
            <a
              className="link font-medium"
              href={`mailto:${TOWNSHIP.email.info}`}
            >
              {TOWNSHIP.email.info}
            </a>
          </p>
        </section>
      </Container>
      <OpenOnHash />
    </>
  );
}
