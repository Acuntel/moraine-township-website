import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, LOCALES } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { LINKS, TOWNSHIP } from "@/lib/township";
import { Container, PageHeader, SectionBlock } from "@/components/Page";
import { DocumentList } from "@/components/DocumentList";
import { byCategory } from "@/lib/documents";
import { DonateBand } from "@/components/DonateButton";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  if (!isLocale(params.lang)) return {};
  const d = getDictionary(params.lang).services;
  return buildMetadata({
    locale: params.lang,
    route: "/services",
    title: d.title,
    description: d.description,
  });
}

// The Township splits its own services this way, so the page keeps that split
// rather than inventing a new taxonomy residents would have to learn.
const ALL_RESIDENT_IDS = [
  "transportation-summary",
  "voter-registration",
  "health-insurance",
  "passport",
  "other-all",
];

export default function ServicesPage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const locale = params.lang;
  const dict = getDictionary(locale);
  const t = dict.services;

  const allResidents = t.sections.filter((s) =>
    ALL_RESIDENT_IDS.includes(s.id),
  );
  const incomeQualified = t.sections.filter(
    (s) => !ALL_RESIDENT_IDS.includes(s.id),
  );

  return (
    <>
      <PageHeader locale={locale} dict={dict} title={t.h1} intro={t.intro} />

      <Container className="space-y-16">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t.allResidentsHeading}
          </h2>
          <p className="mt-2 max-w-prose text-ink-muted">
            {t.allResidentsIntro}
          </p>
          <div className="mt-8 space-y-12">
            {allResidents.map((section) => (
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
                href={LINKS.illinoisVoterRegistration}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dict.shared.links.voterOnline}
                <span className="sr-only">
                  {" "}
                  ({dict.common.externalLinkNote})
                </span>
              </a>
            </li>
            <li>
              <a
                className="link"
                href={LINKS.lakeCountyVoterPower}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dict.shared.links.voterStatus}
                <span className="sr-only">
                  {" "}
                  ({dict.common.externalLinkNote})
                </span>
              </a>
            </li>
            <li>
              <a
                className="link"
                href={LINKS.lakeCountyPollingPlaces}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dict.shared.links.pollingPlaces}
                <span className="sr-only">
                  {" "}
                  ({dict.common.externalLinkNote})
                </span>
              </a>
            </li>
            <li>
              <a
                className="link"
                href={LINKS.travelState}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dict.shared.links.passportForms}
                <span className="sr-only">
                  {" "}
                  ({dict.common.externalLinkNote})
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl bg-surface-alt p-6 sm:p-10">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t.incomeQualifiedHeading}
          </h2>
          <p className="mt-2 max-w-prose text-ink-muted">
            {t.incomeQualifiedIntro}
          </p>
          <p className="mt-4">
            <a
              className="link font-semibold"
              href={`tel:${TOWNSHIP.phone.mainHref}`}
            >
              {TOWNSHIP.phone.main}
            </a>
          </p>
          <div className="mt-8 space-y-12">
            {incomeQualified.map((section) => (
              <SectionBlock
                key={section.id}
                section={section}
                externalNote={dict.common.externalLinkNote}
              />
            ))}
          </div>

          <div className="mt-10">
            <h3 className="text-[1.15rem] font-semibold">{t.formsHeading}</h3>
            <p className="mt-1.5 max-w-prose text-sm text-ink-muted">
              {t.formsNote}
            </p>
            <DocumentList
              docs={byCategory("assistance", "taxprep", "passport", "benefits")}
              pdfNote={dict.common.pdfNote}
            externalNote={dict.common.externalLinkNote}
            />
          </div>

          <ul className="mt-8 space-y-2">
            <li>
              <a
                className="link"
                href={LINKS.comEdAssistance}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dict.shared.links.comEd}
                <span className="sr-only">
                  {" "}
                  ({dict.common.externalLinkNote})
                </span>
              </a>
            </li>
            <li>
              <a
                className="link"
                href={LINKS.shareTheWarmth}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dict.shared.links.shareWarmth}
                <span className="sr-only">
                  {" "}
                  ({dict.common.externalLinkNote})
                </span>
              </a>
            </li>
          </ul>
        </div>

        <DonateBand
          label={dict.common.donateNow}
          ariaLabel={dict.common.donateAria}
          heading={dict.donate.h1}
          body={dict.donate.bandBody}
          wishListLabel={dict.donate.wishListCta}
          externalNote={dict.common.externalLinkNote}
        />
      </Container>
    </>
  );
}
