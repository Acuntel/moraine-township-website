import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, LOCALES } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { TOWNSHIP } from "@/lib/township";
import { readContent } from "@/lib/store";
import { Card, Container, PageHeader } from "@/components/Page";
import { DocumentArchive, DocumentList } from "@/components/DocumentList";
import { byCategory, groupedByYear, FORMS } from "@/lib/documents";

// This page renders admin-editable content, so it revalidates on save and
// at worst every five minutes.
export const revalidate = 300;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  if (!isLocale(params.lang)) return {};
  const d = getDictionary(params.lang).boardMeetings;
  return buildMetadata({
    locale: params.lang,
    route: "/board-meetings",
    title: d.title,
    description: d.description,
  });
}

export default async function BoardMeetingsPage({
  params,
}: {
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const locale = params.lang;
  const dict = getDictionary(locale);
  const t = dict.boardMeetings;
  const content = await readContent();

  const upcoming = [...content.agendas].sort((a, b) =>
    a.meetingDate.localeCompare(b.meetingDate),
  );
  const events = [...content.events].sort((a, b) =>
    a.date.localeCompare(b.date),
  );

  return (
    <>
      <PageHeader locale={locale} dict={dict} title={t.h1} intro={t.intro} />

      <Container className="space-y-14">
        {/* Agendas are the statutory 48-hour posting under 5 ILCS 120/2.02,
            so they lead the page. */}
        <section id="agenda" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">{t.agendaHeading}</h2>
          <p className="mt-2 max-w-prose text-ink-muted">{t.agendaIntro}</p>

          {upcoming.length === 0 ? (
            <p className="mt-5 rounded-xl border border-brand-mint/60 bg-surface-alt p-5 text-ink-muted">
              {t.agendaEmpty}
            </p>
          ) : (
            <ul className="mt-5 space-y-3">
              {upcoming.map((agenda) => (
                <li key={agenda.id}>
                  <Card>
                    <time
                      dateTime={agenda.meetingDate}
                      className="text-sm font-semibold uppercase tracking-wide text-brand-teal"
                    >
                      {agenda.meetingDate}
                    </time>
                    <h3 className="mt-1 text-lg font-bold">{agenda.title}</h3>
                    {agenda.body ? (
                      <p className="mt-2 whitespace-pre-line text-ink-muted">
                        {agenda.body}
                      </p>
                    ) : null}
                    {agenda.url ? (
                      <p className="mt-3">
                        <a className="link font-semibold" href={agenda.url}>
                          {agenda.title}
                          <span className="sr-only">
                            {" "}
                            ({dict.common.pdfNote})
                          </span>
                        </a>
                      </p>
                    ) : null}
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section id="posted-agendas" className="scroll-mt-32">
          <h2 className="text-section font-semibold">
            {t.postedAgendasHeading}
          </h2>
          <DocumentList
            docs={byCategory("agenda")}
            pdfNote={dict.common.pdfNote}
            externalNote={dict.common.externalLinkNote}
            emptyNote={t.agendaEmpty}
          />
          {FORMS.decennial ? (
            <div className="mt-8">
              <h3 className="text-[1.15rem] font-semibold">
                {t.decennialHeading}
              </h3>
              <DocumentList
                docs={byCategory("decennial")}
                pdfNote={dict.common.pdfNote}
                externalNote={dict.common.externalLinkNote}
              />
            </div>
          ) : null}
        </section>

        <section id="schedule" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t.scheduleHeading}
          </h2>
          <p className="mt-2 max-w-prose text-ink-muted">{t.scheduleIntro}</p>
          {events.length === 0 ? (
            <p className="mt-5 rounded-xl border border-brand-mint/60 bg-surface-alt p-5 text-ink-muted">
              {t.agendaEmpty}
            </p>
          ) : (
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <li key={event.id}>
                  <Card className="h-full">
                    <time
                      dateTime={event.date}
                      className="text-sm font-semibold uppercase tracking-wide text-brand-teal"
                    >
                      {event.date}
                      {event.time ? ` · ${event.time}` : ""}
                    </time>
                    <h3 className="mt-1 font-bold">{event.title}</h3>
                    {event.location ? (
                      <p className="mt-1 text-sm text-ink-muted">
                        {event.location}
                      </p>
                    ) : null}
                    {event.description ? (
                      <p className="mt-2 text-sm text-ink-muted">
                        {event.description}
                      </p>
                    ) : null}
                  </Card>
                </li>
              ))}
            </ul>
          )}

          {/*
            The Board's adopted schedule, as a document.
            5 ILCS 120/2.02(a) requires public notice of the schedule of
            regular meetings at the start of each year, and this file is the
            record of that notice. It renders from the archive rather than from
            the admin-entered dates above, so the statutory posting stands even
            in a year when nobody has filled the calendar in yet.
          */}
          <div className="mt-8">
            <h3 className="text-[1.15rem] font-semibold">
              {t.adoptedScheduleHeading}
            </h3>
            <DocumentList
              docs={byCategory("schedule")}
              pdfNote={dict.common.pdfNote}
              externalNote={dict.common.externalLinkNote}
            />
          </div>
        </section>

        <section id="minutes" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">{t.minutesHeading}</h2>
          <p className="mt-2 max-w-prose text-ink-muted">{t.minutesIntro}</p>
          <DocumentArchive
            groups={groupedByYear("minutes")}
            pdfNote={dict.common.pdfNote}
            externalNote={dict.common.externalLinkNote}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {t.minutesCards.map((card) => (
              <Card key={card.id} id={card.id} className="scroll-mt-28">
                <h3 className="text-lg font-bold">{card.heading}</h3>
                <p className="mt-2 text-sm text-ink-muted">{card.body}</p>
              </Card>
            ))}
          </div>
        </section>

        <section id="annual-town-meeting-records" className="scroll-mt-32">
          <h2 className="text-section font-semibold">
            {t.annualTownMeetingHeading}
          </h2>
          <p className="mt-3 max-w-prose text-ink-muted">
            {t.annualTownMeetingBody}
          </p>
          <DocumentList
            docs={byCategory("annualmeeting")}
            pdfNote={dict.common.pdfNote}
            externalNote={dict.common.externalLinkNote}
          />
        </section>

        <section className="rounded-2xl border-l-4 border-brand-green bg-surface-alt p-6">
          <h2 className="text-xl font-bold">{t.legalNoteHeading}</h2>
          <p className="mt-2 max-w-prose text-ink-muted">{t.legalNoteBody}</p>
          <p className="mt-3">
            <a
              className="link font-semibold"
              href={`tel:${TOWNSHIP.phone.mainHref}`}
            >
              {TOWNSHIP.phone.main}
            </a>
          </p>
        </section>
      </Container>
    </>
  );
}
