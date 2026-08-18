import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, LOCALES } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { ELECTED_OFFICIALS, LINKS, TOWNSHIP } from "@/lib/township";
import {
  Card,
  Container,
  PageHeader,
  Paragraphs,
  SectionBlock,
} from "@/components/Page";
import { ReadAloud } from "@/components/ReadAloud";
import { DocumentList } from "@/components/DocumentList";
import { byCategory } from "@/lib/documents";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  if (!isLocale(params.lang)) return {};
  const d = getDictionary(params.lang).assessor;
  return buildMetadata({
    locale: params.lang,
    route: "/assessor",
    title: d.title,
    description: d.description,
  });
}

export default function AssessorPage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const locale = params.lang;
  const dict = getDictionary(locale);
  const t = dict.assessor;
  const assessor = ELECTED_OFFICIALS.find((p) => p.id === "assessor");

  return (
    <>
      <PageHeader locale={locale} dict={dict} title={t.h1} intro={t.intro} />

      <Container className="space-y-16">
        <section className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <p className="text-ink-muted">{t.officeIntro}</p>
          </Card>
          <Card>
            <h2 className="text-lg font-bold">{assessor?.role}</h2>
            <p className="mt-1 font-semibold text-brand-teal-dark">
              {assessor?.name}
            </p>
            <p className="mt-3 text-sm">
              <a className="link" href={`mailto:${TOWNSHIP.email.assessor}`}>
                {TOWNSHIP.email.assessor}
              </a>
            </p>
            <p className="text-sm">
              <a className="link" href={`tel:${TOWNSHIP.phone.assessorHref}`}>
                {TOWNSHIP.phone.assessor}
              </a>
            </p>
            <p className="mt-2 text-sm text-ink-muted">{dict.shared.hours}</p>
          </Card>
        </section>

        <section id="services" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t.servicesHeading}
          </h2>
          <div className="mt-4">
            <Paragraphs items={t.servicesBody} />
          </div>
          <p className="mt-4">
            <a
              className="link"
              href={LINKS.lakeCountyExemptions}
              target="_blank"
              rel="noopener noreferrer"
            >
              {dict.shared.links.lakeCountyExemptions}
              <span className="sr-only"> ({dict.common.externalLinkNote})</span>
            </a>
          </p>

          <h3 className="mt-8 text-xl font-bold">{t.deputyHeading}</h3>
          <p className="mt-2 text-ink-muted">{t.deputyIntro}</p>
          <ul className="mt-3 max-w-prose list-disc space-y-2 pl-5 marker:text-brand-green">
            {t.deputyItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {/*
          The boundary map. It was a PDF on the old site, which the Supervisor
          ruled out. It is now an image with a full text description that is
          both visible on the page and available through read-aloud, so someone
          who cannot see the map still gets the information the map carries.
        */}
        <section id="map" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">{t.mapHeading}</h2>
          <p className="mt-3 max-w-prose text-ink-muted">{t.mapIntro}</p>

          <figure className="mt-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/moraine-township-map.jpg"
              alt={t.mapImageAlt}
              width={1800}
              height={2127}
              className="w-full rounded-2xl border border-brand-mint/60 shadow-card"
              aria-describedby="map-long-description"
            />
            <figcaption className="mt-3 flex flex-wrap items-center gap-4">
              <ReadAloud
                locale={locale}
                labelStart={dict.common.readAloud}
                labelStop={dict.common.stopReading}
                labelUnsupported={dict.common.readAloudUnsupported}
                text={t.mapLongDescription}
              />
              <span className="text-sm text-ink-muted">
                {dict.shared.mapCredit}
              </span>
            </figcaption>
          </figure>

          <details className="mt-5 max-w-prose rounded-xl border border-brand-mint/60 bg-surface-alt p-5">
            <summary className="cursor-pointer font-semibold text-brand-teal-dark">
              {t.mapHeading}
            </summary>
            <p
              id="map-long-description"
              className="mt-3 leading-relaxed text-ink"
            >
              {t.mapLongDescription}
            </p>
          </details>

          <div className="mt-6 rounded-xl border-l-4 border-brand-green bg-surface-alt p-5">
            <h3 className="text-lg font-bold">{t.mapWhyHeading}</h3>
            <p className="mt-2 text-ink-muted">{t.mapWhyBody}</p>
          </div>
        </section>

        <section id="senior-exemptions" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">{t.seniorHeading}</h2>
          <div className="mt-6 space-y-10">
            {t.seniorSections.map((section) => (
              <SectionBlock
                key={section.id}
                section={section}
                externalNote={dict.common.externalLinkNote}
              />
            ))}
          </div>
          <p className="mt-6">
            <a
              className="link"
              href={LINKS.seniorFreezeEfile}
              target="_blank"
              rel="noopener noreferrer"
            >
              {dict.shared.links.seniorFreezeFile}
              <span className="sr-only"> ({dict.common.externalLinkNote})</span>
            </a>
          </p>
        </section>

        <section id="other-exemptions" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t.otherExemptionsHeading}
          </h2>
          <div className="mt-6 space-y-10">
            {t.otherExemptionsSections.map((section) => (
              <SectionBlock
                key={section.id}
                section={section}
                externalNote={dict.common.externalLinkNote}
              />
            ))}
          </div>
          <ul className="mt-6 space-y-2">
            <li>
              <a
                className="link"
                href={LINKS.lakeCountyAssessment}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dict.shared.links.chiefCountyAssessment}
                <span className="sr-only">
                  {" "}
                  ({dict.common.externalLinkNote})
                </span>
              </a>
            </li>
            <li>
              <a
                className="link"
                href={LINKS.lakeCountyVacancyAffidavit}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dict.shared.links.vacancyAffidavit}
                <span className="sr-only">
                  {" "}
                  ({dict.common.pdfNote}, {dict.common.externalLinkNote})
                </span>
              </a>
            </li>
          </ul>
        </section>

        <section id="assessor-documents" className="scroll-mt-32">
          <h2 className="text-section font-semibold">{t.documentsHeading}</h2>
          <DocumentList
            docs={byCategory("assessorinfo")}
            pdfNote={dict.common.pdfNote}
            externalNote={dict.common.externalLinkNote}
          />
        </section>

        <section id="appeals" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">{t.appealsHeading}</h2>
          <p className="mt-3 max-w-prose text-ink-muted">{t.appealsIntro}</p>
          <p className="mt-3">
            <a
              className="link font-semibold"
              href={`tel:${TOWNSHIP.phone.assessorHref}`}
            >
              {TOWNSHIP.phone.assessor}
            </a>
          </p>
          <div className="mt-8 space-y-10">
            {t.appealsSections.map((section) => (
              <SectionBlock
                key={section.id}
                section={section}
                externalNote={dict.common.externalLinkNote}
              />
            ))}
          </div>
          <ul className="mt-8 space-y-2">
            <li>
              <a
                className="link"
                href={LINKS.lakeCountyAppeal}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dict.shared.links.appealOnline}
                <span className="sr-only">
                  {" "}
                  ({dict.common.externalLinkNote})
                </span>
              </a>
            </li>
            <li>
              <a
                className="link"
                href={LINKS.lakeCountyAssessorSearch}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dict.shared.links.propertySearch}
                <span className="sr-only">
                  {" "}
                  ({dict.common.externalLinkNote})
                </span>
              </a>
            </li>
            <li>
              <a
                className="link"
                href={LINKS.lakeCountyTreasurer}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dict.shared.links.treasurer}
                <span className="sr-only">
                  {" "}
                  ({dict.common.externalLinkNote})
                </span>
              </a>
            </li>
            <li>
              <a
                className="link"
                href={LINKS.lakeCountyPaymentStatus}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dict.shared.links.paymentStatus}
                <span className="sr-only">
                  {" "}
                  ({dict.common.externalLinkNote})
                </span>
              </a>
            </li>
          </ul>
        </section>
      </Container>
    </>
  );
}
