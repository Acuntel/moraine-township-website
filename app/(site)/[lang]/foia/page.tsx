import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, LOCALES } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { LINKS, TOWNSHIP } from "@/lib/township";
import { Card, Container, PageHeader, Paragraphs } from "@/components/Page";
import { DocumentList } from "@/components/DocumentList";
import { DocGroup, documentCount } from "@/components/DocGroup";
import { OpenOnHash } from "@/components/OpenOnHash";
import { BodyRosters, OrgChart } from "@/components/PublicBody";
import {
  byCategory,
  newestFirst,
  noticesBySubcategory,
} from "@/lib/documents";

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
  const count = (n: number) =>
    documentCount(dict.common.documentCount, n, locale);
  const docNotes = {
    pdfNote: dict.common.pdfNote,
    wordNote: dict.shared.wordNote,
    externalNote: dict.common.externalLinkNote,
  };

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
          <div className="mt-10 max-w-prose">
            <h3 className="text-xl font-bold">{t.orgHeading}</h3>
            <p className="mt-2 text-ink-muted">{t.orgIntro}</p>
            <OrgChart nodes={t.orgChart} />
          </div>
        </section>

        <section id="boards" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t.membershipHeading}
          </h2>
          <p className="mt-2 max-w-prose text-ink-muted">
            {t.membershipIntro}
          </p>
          <BodyRosters t={t} />
        </section>

        <section id="financial" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">{t.financeHeading}</h2>
          <p className="mt-2 max-w-prose text-ink-muted">{t.financeIntro}</p>
          {/* Each record type opens on a click (round 2 review). The links are
              all in the page source either way, which is what the Illinois
              compliance audit counts. */}
          <div className="mt-8 space-y-4">
            {t.financeGroups.map((group) => {
              if (group.id !== "notices") {
                const docs = newestFirst(byCategory(group.id));
                return (
                  <DocGroup
                    key={group.id}
                    id={group.id}
                    title={group.heading}
                    count={count(docs.length)}
                    note={group.note}
                  >
                    <DocumentList docs={docs} {...docNotes} />
                  </DocGroup>
                );
              }
              const notices = noticesBySubcategory();
              return (
                <div
                  key={group.id}
                  id={group.id}
                  className="scroll-mt-28 rounded-lg border border-line bg-cream-alt p-5 sm:p-6"
                >
                  <h3 className="text-[1.15rem] font-semibold">
                    {group.heading}
                  </h3>
                  <p className="mt-1.5 max-w-prose text-sm text-ink-muted">
                    {group.note}
                  </p>
                  <div className="mt-4 space-y-3">
                    {notices.map((notice) => (
                      <DocGroup
                        key={notice.id}
                        id={notice.id}
                        level={4}
                        title={t.noticeGroups[notice.id]}
                        count={count(notice.docs.length)}
                      >
                        <DocumentList docs={notice.docs} {...docNotes} />
                      </DocGroup>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <DocGroup
            id="newsletters"
            level={2}
            title={t.newsletterHeading}
            count={count(byCategory("newsletter").length)}
            note={t.newsletterNote}
          >
            <DocumentList
              docs={newestFirst(byCategory("newsletter"))}
              {...docNotes}
            />
          </DocGroup>
        </section>

        <section id="compensation" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t.compensationHeading}
          </h2>
          <p className="mt-3 max-w-prose text-ink-muted">
            {t.compensationBody}
          </p>
        </section>

        <section id="imrf" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">{t.imrfHeading}</h2>
          <p className="mt-3 max-w-prose text-ink-muted">{t.imrfBody}</p>
          <p className="mt-4">
            <a
              className="link font-semibold"
              href={LINKS.imrfEmployerInfo}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.imrfLink}
              <span className="sr-only"> ({dict.common.externalLinkNote})</span>
            </a>
          </p>
        </section>
      </Container>
      <OpenOnHash />
    </>
  );
}
