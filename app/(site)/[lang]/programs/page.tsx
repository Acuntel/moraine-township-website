import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, LOCALES } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { LINKS, TOWNSHIP } from "@/lib/township";
import { Card, Container, PageHeader, Paragraphs } from "@/components/Page";
import { DocumentList } from "@/components/DocumentList";
import { byCategory } from "@/lib/documents";
import { todayInChicago } from "@/lib/agendas";

/**
 * The Community Mental Health Board vacancy closes on October 26, 2026. The
 * page regenerates hourly so the notice and its PDF come down on their own
 * the day after, instead of waiting for someone to remember a deploy.
 */
export const revalidate = 3600;
const CMHB_OPENING_CLOSES = "2026-10-26";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  if (!isLocale(params.lang)) return {};
  const d = getDictionary(params.lang).programs;
  return buildMetadata({
    locale: params.lang,
    route: "/programs",
    title: d.title,
    description: d.description,
  });
}

export default function ProgramsPage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const locale = params.lang;
  const dict = getDictionary(locale);
  const t = dict.programs;

  return (
    <>
      <PageHeader locale={locale} dict={dict} title={t.h1} intro={t.intro} />

      <Container className="space-y-16">
        <section id="grants" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">{t.grantsHeading}</h2>
          <div className="mt-4">
            <Paragraphs items={t.grantsIntro} />
          </div>

          <DocumentList
            docs={byCategory("grants")}
            pdfNote={dict.common.pdfNote}
            wordNote={dict.shared.wordNote}
            externalNote={dict.common.externalLinkNote}
          />

          <h3 className="mt-8 text-xl font-bold">{t.grantsCommitteeHeading}</h3>
          <p className="mt-2 max-w-prose text-ink-muted">
            {t.grantsCommitteeBody}
          </p>

          <h3 className="mt-8 text-xl font-bold">{t.granteesHeading}</h3>
          <p className="mt-2 max-w-prose text-ink-muted">{t.granteesNote}</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {t.grantees.map(({ name, description }) => (
              <li key={name}>
                <Card className="h-full">
                  <h4 className="font-bold">{name}</h4>
                  <p className="mt-1 text-sm text-ink-muted">{description}</p>
                </Card>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <a
              className="link font-semibold"
              href={`tel:${TOWNSHIP.phone.mainHref}`}
            >
              {TOWNSHIP.phone.main}
            </a>
          </p>
        </section>

        <section id="latino-advisory-committee" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">{t.latinoHeading}</h2>
          <div className="mt-4">
            <Paragraphs items={t.latinoBody} />
          </div>
          <h3 className="mt-8 text-xl font-bold">{t.latinoCalendarHeading}</h3>
          <p className="mt-2 max-w-prose text-ink-muted">
            {t.latinoCalendarBody}
          </p>
          <p className="mt-4 flex flex-wrap gap-4">
            <a
              className="link font-semibold"
              href={`mailto:${TOWNSHIP.email.info}`}
            >
              {TOWNSHIP.email.info}
            </a>
            <a
              className="link font-semibold"
              href={LINKS.volunteerApplication}
              target="_blank"
              rel="noopener noreferrer"
            >
              {dict.getInvolved.applicationCta}
              <span className="sr-only"> ({dict.common.externalLinkNote})</span>
            </a>
          </p>
        </section>

        <section id="mental-health-board" className="scroll-mt-28">
          <div className="rounded-2xl bg-surface-alt p-6 sm:p-8">
            <h2 className="text-2xl font-bold sm:text-3xl">
              {t.mentalHealthHeading}
            </h2>
            <p className="mt-3 max-w-prose text-ink-muted">
              {t.mentalHealthBody}
            </p>
            <a
              href={LINKS.mentalHealthBoard}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block rounded-full bg-brand-teal-dark px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-teal"
            >
              {t.mentalHealthCta}
              <span className="sr-only"> ({dict.common.externalLinkNote})</span>
            </a>
            {todayInChicago() <= CMHB_OPENING_CLOSES ? (
              <div className="mt-8 max-w-prose border-t border-line pt-6">
                <h3 className="text-xl font-bold">{t.cmhbOpening.heading}</h3>
                <p className="mt-3 text-ink-muted">{t.cmhbOpening.intro}</p>
                <p className="mt-3 text-ink-muted">{t.cmhbOpening.terms}</p>
                <p className="mt-3 font-semibold">{t.cmhbOpening.listLead}</p>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink-muted">
                  {t.cmhbOpening.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-4 text-ink-muted">{t.cmhbOpening.contact}</p>
                <p className="mt-2">
                  <a
                    className="link font-semibold"
                    href={`mailto:${TOWNSHIP.email.supervisor}`}
                  >
                    {TOWNSHIP.email.supervisor}
                  </a>
                  <br />
                  <a
                    className="link font-semibold"
                    href={`tel:${TOWNSHIP.phone.mainHref}`}
                  >
                    {TOWNSHIP.phone.main}
                  </a>
                </p>
                <DocumentList
                  docs={byCategory("mentalhealth")}
                  pdfNote={dict.common.pdfNote}
                  wordNote={dict.shared.wordNote}
                  externalNote={dict.common.externalLinkNote}
                />
              </div>
            ) : null}
          </div>
        </section>
      </Container>
    </>
  );
}
