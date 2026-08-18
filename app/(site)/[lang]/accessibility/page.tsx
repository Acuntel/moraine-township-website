import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, LOCALES } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { TOWNSHIP } from "@/lib/township";
import { Container, PageHeader, Paragraphs } from "@/components/Page";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  if (!isLocale(params.lang)) return {};
  const d = getDictionary(params.lang).accessibility;
  return buildMetadata({
    locale: params.lang,
    route: "/accessibility",
    title: d.title,
    description: d.description,
  });
}

export default function AccessibilityPage({
  params,
}: {
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const locale = params.lang;
  const dict = getDictionary(locale);
  const t = dict.accessibility;

  return (
    <>
      <PageHeader locale={locale} dict={dict} title={t.h1} intro={t.intro} />

      <Container className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t.commitmentHeading}
          </h2>
          <div className="mt-4">
            <Paragraphs items={t.commitmentBody} />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t.standardHeading}
          </h2>
          <div className="mt-4">
            <Paragraphs items={t.standardBody} />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t.featuresHeading}
          </h2>
          <ul className="mt-4 max-w-prose list-disc space-y-2 pl-5 marker:text-brand-green">
            {t.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t.documentsHeading}
          </h2>
          <p className="mt-3 max-w-prose text-ink-muted">{t.documentsBody}</p>
        </section>

        <section className="rounded-2xl border-2 border-brand-green bg-surface-alt p-6 sm:p-8">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t.feedbackHeading}
          </h2>
          <p className="mt-3 max-w-prose text-ink-muted">{t.feedbackBody}</p>
          <p className="mt-4">
            <a
              className="link font-semibold"
              href={`tel:${TOWNSHIP.phone.mainHref}`}
            >
              {TOWNSHIP.phone.main}
            </a>
            {" · "}
            <a
              className="link font-semibold"
              href={`mailto:${TOWNSHIP.email.info}`}
            >
              {TOWNSHIP.email.info}
            </a>
          </p>
        </section>
      </Container>
    </>
  );
}
