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
      <PageHeader locale={locale} dict={dict} title={t.h1} intro={t.intro}>
        {/* The ride line near the top as well as at the bottom, as Sanela
            Abazovic asked in the round 2 review. */}
        <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 text-[1.05rem] font-medium text-ink">
          <span>{t.callLead}</span>
          <a
            href={`tel:${TOWNSHIP.phone.transportationHref}`}
            className="inline-flex items-center gap-2 rounded-full bg-brand-teal-dark px-6 py-3 text-lg font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-teal"
          >
            <PhoneIcon className="h-4 w-4" />
            {TOWNSHIP.phone.transportation}
          </a>
        </p>
      </PageHeader>

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

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .7-.2 1l-2.3 2.2z" />
    </svg>
  );
}
