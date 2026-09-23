import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, localePath, LOCALES } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { LINKS, TOWNSHIP } from "@/lib/township";
import { Container, PageHeader, SectionBlock } from "@/components/Page";
import { DocumentList } from "@/components/DocumentList";
import { byCategory } from "@/lib/documents";
import type { LinkItem } from "@/content/types";
import { DonateBand } from "@/components/DonateBand";

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
// rather than inventing a new taxonomy residents would have to learn. The
// sections render in dictionary order, which the committee set in round 2.
const ALL_RESIDENT_IDS = [
  "health-insurance",
  "transportation-summary",
  "passport",
  "voter-registration",
  "other-all",
  "notary",
];

export default function ServicesPage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const locale = params.lang;
  const dict = getDictionary(locale);
  const t = dict.services;

  // Outbound links sit with the service they belong to. Before round 2 they
  // were one list after the last section, which read as fine only while that
  // section happened to be voter registration.
  const outbound: Record<string, LinkItem[]> = {
    passport: [
      { label: dict.shared.links.passportForms, href: LINKS.travelState },
    ],
    "voter-registration": [
      {
        label: dict.shared.links.voterOnline,
        href: LINKS.illinoisVoterRegistration,
      },
      {
        label: dict.shared.links.voterStatus,
        href: LINKS.lakeCountyVoterPower,
      },
      {
        label: dict.shared.links.pollingPlaces,
        href: LINKS.lakeCountyPollingPlaces,
      },
    ],
    utilities: [
      { label: dict.shared.links.comEd, href: LINKS.comEdAssistance },
      { label: dict.shared.links.shareWarmth, href: LINKS.shareTheWarmth },
    ],
  };
  const sections = t.sections.map((section) => {
    const extra = outbound[section.id];
    if (!extra) return section;
    const links = extra.map((link) => ({ ...link, external: true }));
    return { ...section, links: [...(section.links ?? []), ...links] };
  });

  const allResidents = sections.filter((s) => ALL_RESIDENT_IDS.includes(s.id));
  const incomeQualified = sections.filter(
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
              docs={byCategory(
                "assistance",
                "taxprep",
                "passport",
                "benefits",
              ).sort((a, b) => a.label.localeCompare(b.label))}
              pdfNote={dict.common.pdfNote}
              externalNote={dict.common.externalLinkNote}
            />
          </div>
        </div>

        <DonateBand
          label={dict.common.donateNow}
          ariaLabel={dict.common.donateAria}
          heading={dict.donate.h1}
          body={dict.donate.bandBody}
          wishListLabel={dict.donate.wishListCta}
          externalNote={dict.common.externalLinkNote}
          otherWays={dict.donate.bandOtherWays}
          otherWaysCta={dict.donate.bandOtherWaysCta}
          otherWaysHref={localePath(locale, "/donate")}
        />
      </Container>
    </>
  );
}
