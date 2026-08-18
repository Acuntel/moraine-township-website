import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, LOCALES } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { TOWNSHIP } from "@/lib/township";
import { Card, Container, PageHeader, Paragraphs } from "@/components/Page";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  if (!isLocale(params.lang)) return {};
  const d = getDictionary(params.lang).transportation;
  return buildMetadata({
    locale: params.lang,
    route: "/transportation",
    title: d.title,
    description: d.description,
  });
}

export default function TransportationPage({
  params,
}: {
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const locale = params.lang;
  const dict = getDictionary(locale);
  const t = dict.transportation;

  return (
    <>
      <PageHeader locale={locale} dict={dict} title={t.h1} intro={t.intro} />

      <Container className="space-y-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <Paragraphs items={t.body} />
          </div>
          <div
            className="h-64 rounded-2xl bg-brand-teal-dark bg-[url('/images/transportation-van.webp')] bg-cover bg-center shadow-card lg:h-auto"
            role="img"
            aria-label={t.imageAlt}
          />
        </div>

        <section>
          <h2 className="text-2xl font-bold sm:text-3xl">{t.detailsHeading}</h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.details.map((row) => (
              <div
                key={row.label}
                className="rounded-xl border border-brand-mint/60 bg-surface-alt p-5"
              >
                <dt className="text-sm font-semibold text-ink-muted">
                  {row.label}
                </dt>
                <dd className="mt-1 font-bold text-brand-teal-dark">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <Card className="border-2 border-brand-green">
          <h2 className="text-2xl font-bold">{t.scheduleHeading}</h2>
          <p className="mt-2 text-ink-muted">{t.scheduleBody}</p>
          <a
            href={`tel:${TOWNSHIP.phone.transportationHref}`}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-teal-dark px-7 py-4 text-lg font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-teal"
          >
            {TOWNSHIP.phone.transportation}
          </a>
        </Card>
      </Container>
    </>
  );
}
