import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, LOCALES } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { TOWNSHIP } from "@/lib/township";
import { Card, Container, PageHeader, Paragraphs } from "@/components/Page";
import { DocumentArchive, DocumentList } from "@/components/DocumentList";
import { byCategory, groupedByYear } from "@/lib/documents";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  if (!isLocale(params.lang)) return {};
  const d = getDictionary(params.lang).foia;
  return buildMetadata({
    locale: params.lang,
    route: "/foia",
    title: d.title,
    description: d.description,
  });
}

export default function FoiaPage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const locale = params.lang;
  const dict = getDictionary(locale);
  const t = dict.foia;

  return (
    <>
      <PageHeader locale={locale} dict={dict} title={t.h1} intro={t.intro} />

      <Container className="space-y-14">
        <section id="statement" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t.statementHeading}
          </h2>
          <div className="mt-4">
            <Paragraphs items={t.statementBody} />
          </div>
        </section>

        <section id="officer" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">{t.officerHeading}</h2>
          <p className="mt-3 max-w-prose text-ink-muted">{t.officerBody}</p>
          <Card className="mt-5 max-w-prose">
            <p className="font-bold text-brand-teal-dark">
              Nancy Chausow Shafer
            </p>
            <p className="text-sm text-ink-muted">
              {dict.shared.foiaOfficerTitle}
            </p>
            <address className="mt-3 space-y-1 text-sm not-italic">
              <p>{TOWNSHIP.name}</p>
              <p>{TOWNSHIP.address.street}</p>
              <p>
                {TOWNSHIP.address.city}, {TOWNSHIP.address.state}{" "}
                {TOWNSHIP.address.zip}
              </p>
              <p>
                {dict.common.email}:{" "}
                <a className="link" href={`mailto:${TOWNSHIP.email.info}`}>
                  {TOWNSHIP.email.info}
                </a>
              </p>
              <p>
                {dict.common.fax}: {TOWNSHIP.fax.foia}
              </p>
            </address>
          </Card>
        </section>

        <section id="fees" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">{t.feesHeading}</h2>
          <div className="mt-4">
            <Paragraphs items={t.feesBody} />
          </div>
        </section>

        {/* Section 4 of the Illinois FOIA requires this block of information
            about the public body itself, not just a request procedure. */}
        <section id="public-body" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t.publicBodyHeading}
          </h2>
          <p className="mt-2 max-w-prose text-ink-muted">{t.publicBodyIntro}</p>
          <dl className="mt-6 space-y-5">
            {t.publicBodyRows.map((row) => (
              <div key={row.label} className="max-w-prose">
                <dt className="font-bold text-brand-teal-dark">{row.label}</dt>
                <dd className="mt-1 text-ink-muted">{row.value}</dd>
              </div>
            ))}
            <div className="max-w-prose">
              <dt className="font-bold text-brand-teal-dark">
                {t.employeesLabel}
              </dt>
              <dd className="mt-1 text-ink-muted">{t.employeesValue}</dd>
            </div>
          </dl>
        </section>

        <section id="financial" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">{t.financeHeading}</h2>
          <p className="mt-2 max-w-prose text-ink-muted">{t.financeIntro}</p>
          <div className="mt-8 space-y-10">
            {t.financeGroups.map((group) => (
              <div key={group.id} id={group.id} className="scroll-mt-32">
                <h3 className="text-[1.15rem] font-semibold">{group.heading}</h3>
                <p className="mt-1.5 max-w-prose text-sm text-ink-muted">
                  {group.note}
                </p>
                {group.id === "notices" ? (
                  <DocumentList
                    docs={byCategory("notices", "treasurer", "comptroller", "foia")}
                    pdfNote={dict.common.pdfNote}
            externalNote={dict.common.externalLinkNote}
                  />
                ) : (
                  <DocumentArchive
                    groups={groupedByYear(group.id)}
                    pdfNote={dict.common.pdfNote}
            externalNote={dict.common.externalLinkNote}
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        <section id="newsletters" className="scroll-mt-32">
          <details className="rounded-md border border-line bg-white px-5 py-4">
            <summary className="cursor-pointer font-semibold text-brand-teal-dark">
              {t.newsletterHeading}
            </summary>
            <p className="mt-3 max-w-prose text-sm text-ink-muted">
              {t.newsletterNote}
            </p>
            <DocumentList
              docs={byCategory("newsletter")}
              pdfNote={dict.common.pdfNote}
              externalNote={dict.common.externalLinkNote}
            />
          </details>
        </section>

        <section id="compensation" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t.compensationHeading}
          </h2>
          <p className="mt-3 max-w-prose text-ink-muted">
            {t.compensationBody}
          </p>
        </section>
      </Container>
    </>
  );
}
