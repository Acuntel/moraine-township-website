import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { getHistory, HISTORY_SLUGS } from "@/content/histories";
import { isLocale, localePath, LOCALES } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { Container, PageHeader, Paragraphs } from "@/components/Page";
import { DAGGITT_RESTORATION } from "@/content/cemetery-images";

export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    HISTORY_SLUGS.map((slug) => ({ lang, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  if (!isLocale(params.lang)) return {};
  const history = getHistory(params.lang, params.slug);
  if (!history) return {};
  return buildMetadata({
    locale: params.lang,
    route: `/cemeteries/${params.slug}`,
    title: history.title,
    description: history.intro,
  });
}

export default function CemeteryHistoryPage({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const locale = params.lang;
  const dict = getDictionary(locale);
  const history = getHistory(locale, params.slug);
  if (!history) notFound();

  return (
    <>
      <PageHeader
        locale={locale}
        dict={dict}
        title={history.title}
        intro={history.intro}
        kicker={history.location}
      />

      <Container className="space-y-10">
        {history.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-2xl font-bold sm:text-3xl">
              {section.heading}
            </h2>
            <div className="mt-4">
              <Paragraphs items={section.body} />
            </div>
          </section>
        ))}

        {params.slug === "daggitt" ? (
          <section aria-labelledby="restoration-heading">
            <h2 id="restoration-heading" className="text-section font-semibold">
              {dict.cemeteries.restorationHeading}
            </h2>
            <p className="mt-3 max-w-prose text-ink-muted">
              {dict.cemeteries.restorationNote}
            </p>
            <ul className="mt-7 grid gap-6 sm:grid-cols-2">
              {DAGGITT_RESTORATION.map((photo) => (
                <li key={photo.id}>
                  <figure>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.src}
                      alt={photo.alt[locale]}
                      loading="lazy"
                      className="w-full rounded-lg border border-line object-cover"
                    />
                    <figcaption className="mt-2.5 text-[0.9rem] text-ink-muted">
                      {photo.caption[locale]}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="rounded-2xl bg-surface-alt p-6">
          <h2 className="text-lg font-bold">{dict.shared.sourcesHeading}</h2>
          <p className="mt-2 max-w-prose text-sm text-ink-muted">
            {history.sources}
          </p>
        </section>

        <Link
          className="link font-semibold"
          href={localePath(locale, "/cemeteries")}
        >
          {dict.cemeteries.historyBackLink}
        </Link>
      </Container>
    </>
  );
}
