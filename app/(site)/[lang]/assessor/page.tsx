import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, LOCALES } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { ELECTED_OFFICIALS, LINKS, TOWNSHIP } from "@/lib/township";
import { Card, Container, PageHeader } from "@/components/Page";
import { VideoEmbed } from "@/components/VideoEmbed";
import { DocumentList } from "@/components/DocumentList";
import { DocGroup, documentCount } from "@/components/DocGroup";
import { OpenOnHash } from "@/components/OpenOnHash";
import { byCategory } from "@/lib/documents";

/*
  The Lake County Chief County Assessment Office's "appeal your assessment
  online" tutorial, the video linked from lakecountyil.gov under Assessment
  Notices. Requested by the Assessor in the first review round, 2026-08-28.
*/
const APPEAL_TUTORIAL_VIDEO_ID = "sm45jCEb2mI";

/*
  The senior freeze press release, which the Assessor struck from this page in
  the same review round. It stays in the archive at lib/documents.json and in
  blob storage; it is just no longer listed here. Matched by original filename,
  because the round 2 review renamed every document's label.

  The other two he struck were never Assessor documents and have moved to
  where the old site listed them: the compensation disclosure to Legal and
  Public Notices on /foia, and the Alert One income limits to the forms on
  /services.
*/
const UNLISTED_ORIGINALS = [
  "Revised-Press-Release-Senior-Assessment-Freeze-1-5-26-PDF.pdf",
];

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
  // Kept in the order the Assessor reviewed them. Only the 1840 plat carries
  // a date, so sorting by date would put it above his appeal instructions.
  const documents = byCategory("assessorinfo").filter(
    (doc) => !UNLISTED_ORIGINALS.some((name) => doc.original.endsWith(name)),
  );
  const assessor = ELECTED_OFFICIALS.find((p) => p.id === "assessor");

  const resources = [
    {
      href: LINKS.lakeCountyExemptions,
      label: dict.shared.links.lakeCountyExemptions,
    },
    {
      href: LINKS.lakeCountyAssessment,
      label: dict.shared.links.chiefCountyAssessment,
    },
    { href: LINKS.lakeCountyAppeal, label: dict.shared.links.appealOnline },
    {
      href: LINKS.lakeCountyAssessorSearch,
      label: dict.shared.links.propertySearch,
    },
    { href: LINKS.lakeCountyTreasurer, label: dict.shared.links.treasurer },
    {
      href: LINKS.lakeCountyPaymentStatus,
      label: dict.shared.links.paymentStatus,
    },
  ];

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

        <section id="appeals" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">{t.videoHeading}</h2>
          <p className="mt-3 max-w-prose text-ink-muted">{t.videoIntro}</p>
          <div className="mt-6 max-w-3xl">
            <VideoEmbed
              videoId={APPEAL_TUTORIAL_VIDEO_ID}
              title={t.videoTitle}
              posterSrc="/images/appeal-tutorial-video.jpg"
              posterAlt={t.videoPosterAlt}
              playLabel={t.videoPlayLabel}
            />
          </div>
          <p className="mt-4">
            <a
              className="link"
              href={`https://www.youtube.com/watch?v=${APPEAL_TUTORIAL_VIDEO_ID}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.videoLinkLabel}
              <span className="sr-only"> ({dict.common.externalLinkNote})</span>
            </a>
          </p>
        </section>

        <section id="resources" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t.resourcesHeading}
          </h2>
          <p className="mt-3 max-w-prose text-ink-muted">{t.resourcesIntro}</p>
          <ul className="mt-6 space-y-2">
            {resources.map((r) => (
              <li key={r.href}>
                <a
                  className="link"
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {r.label}
                  <span className="sr-only">
                    {" "}
                    ({dict.common.externalLinkNote})
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <DocGroup
            id="assessor-documents"
            level={2}
            title={t.documentsHeading}
            count={documentCount(
              dict.common.documentCount,
              documents.length,
              locale,
            )}
          >
            <DocumentList
              docs={documents}
              pdfNote={dict.common.pdfNote}
              externalNote={dict.common.externalLinkNote}
            />
          </DocGroup>
        </section>
      </Container>
      <OpenOnHash />
    </>
  );
}
