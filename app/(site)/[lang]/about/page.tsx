import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, localePath, LOCALES } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import {
  ELECTED_OFFICIALS,
  ETHICS_COMMISSION,
  OFFICIAL_BIOS,
  STAFF,
  TOWNSHIP,
} from "@/lib/township";
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
  const d = getDictionary(params.lang).about;
  return buildMetadata({
    locale: params.lang,
    route: "/about",
    title: d.title,
    description: d.description,
  });
}

export default function AboutPage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const locale = params.lang;
  const dict = getDictionary(locale);
  const t = dict.about;
  const demo = TOWNSHIP.demographics;
  const number = new Intl.NumberFormat(locale);

  const roleLabel = (key: keyof typeof dict.shared.roles) =>
    dict.shared.roles[key];

  const roleFor = (id: string) => {
    if (id === "supervisor") return t.roleDescriptions.supervisor;
    if (id === "clerk") return t.roleDescriptions.clerk;
    if (id === "assessor") return t.roleDescriptions.assessor;
    return t.roleDescriptions.trustees;
  };

  return (
    <>
      <PageHeader locale={locale} dict={dict} title={t.h1} intro={t.intro} />

      <Container className="space-y-14">
        <section id="mission" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">{t.missionHeading}</h2>
          <blockquote className="mt-4 max-w-prose border-l-4 border-brand-green pl-5 text-xl leading-relaxed text-brand-teal-dark">
            {t.missionStatement}
          </blockquote>

          <h3 className="mt-8 text-xl font-bold">{t.specialPurposeHeading}</h3>
          <p className="mt-2 max-w-prose text-ink-muted">
            {t.specialPurposeIntro}
          </p>
          <ul className="mt-3 max-w-prose list-disc space-y-2 pl-5 marker:text-brand-green">
            {t.specialPurposeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section id="boundaries" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t.boundariesHeading}
          </h2>
          <div className="mt-4">
            <Paragraphs items={t.boundariesBody} />
          </div>
          <dl className="mt-6 grid max-w-lg grid-cols-2 gap-4">
            <Stat
              label={dict.shared.squareMiles}
              value={String(TOWNSHIP.geography.squareMiles)}
            />
            <Stat
              label={dict.shared.acres}
              value={number.format(TOWNSHIP.geography.acres)}
            />
          </dl>
        </section>

        <section id="demographics" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t.demographicsHeading}
          </h2>
          <p className="mt-2 max-w-prose text-ink-muted">
            {t.demographicsNote}
          </p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat
              label={t.demographicsLabels.population}
              value={number.format(demo.population)}
            />
            <Stat
              label={t.demographicsLabels.medianIncome}
              value={`$${number.format(demo.medianHouseholdIncome)}`}
            />
            <Stat
              label={t.demographicsLabels.bachelors}
              value={demo.bachelorsOrHigher}
            />
            <Stat
              label={t.demographicsLabels.employment}
              value={demo.employmentRate}
            />
            <Stat
              label={t.demographicsLabels.housingUnits}
              value={number.format(demo.housingUnits)}
            />
            <Stat
              label={t.demographicsLabels.withoutHealthcare}
              value={demo.withoutHealthcare}
            />
            <Stat
              label={t.demographicsLabels.lowIncome}
              value={demo.incomeUnder15k}
            />
          </dl>
        </section>

        <section id="history" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">{t.historyHeading}</h2>
          <div className="mt-4">
            <Paragraphs items={t.historyBody} />
          </div>
        </section>

        <section id="team" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">{t.teamHeading}</h2>
          <p className="mt-2 max-w-prose text-ink-muted">{t.teamIntro}</p>

          <h3
            id="elected-officials"
            className="mt-8 scroll-mt-28 text-xl font-bold"
          >
            {t.electedHeading}
          </h3>
          <p className="mt-2 max-w-prose text-ink-muted">{t.boardBody}</p>

          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ELECTED_OFFICIALS.map((person) => (
              <li key={person.id} id={person.id} className="scroll-mt-28">
                <Card className="h-full">
                  <div className="flex items-start gap-4">
                    <Avatar name={person.name} />
                    <div>
                      <h4 className="text-lg font-bold leading-tight">
                        {person.name}
                      </h4>
                      <p className="text-sm font-semibold text-brand-teal">
                        {roleLabel(person.roleKey)}
                      </p>
                      <p className="text-sm text-ink-muted">
                        {dict.shared.term} {person.term}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-[1.65] text-ink-muted">
                    {roleFor(person.id)}
                  </p>
                  {OFFICIAL_BIOS[person.id] ? (
                    <details className="mt-3">
                      <summary className="cursor-pointer text-sm font-semibold text-brand-teal">
                        {t.readBio}
                      </summary>
                      <p className="mt-2 text-sm leading-[1.7] text-ink-muted">
                        {OFFICIAL_BIOS[person.id]}
                      </p>
                    </details>
                  ) : null}
                  <p className="mt-4 text-sm">
                    <a className="link" href={`mailto:${person.email}`}>
                      {person.email}
                    </a>
                  </p>
                  {"phone" in person && person.phone ? (
                    <p className="text-sm">
                      <a
                        className="link"
                        href={`tel:+1${person.phone.replace(/\D/g, "")}`}
                      >
                        {person.phone}
                      </a>
                    </p>
                  ) : null}
                </Card>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-muted">{t.noPhotoNote}</p>

          <h3 id="staff" className="mt-12 scroll-mt-28 text-xl font-bold">
            {t.staffHeading}
          </h3>
          <p className="mt-2 max-w-prose text-ink-muted">{t.staffIntro}</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STAFF.map((person) => (
              <li key={person.email}>
                <Card className="flex h-full items-start gap-4">
                  <Avatar name={person.name} />
                  <div>
                    <h4 className="font-bold leading-tight">{person.name}</h4>
                    <p className="text-sm text-ink-muted">
                      {roleLabel(person.roleKey)}
                    </p>
                    <p className="mt-1 text-sm">
                      <a className="link" href={`mailto:${person.email}`}>
                        {person.email}
                      </a>
                    </p>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </section>

        <section id="financial" className="scroll-mt-32">
          <h2 className="text-section font-semibold">{t.financialHeading}</h2>
          <p className="mt-3 max-w-prose text-ink-muted">{t.financialBody}</p>
          <Link
            href={localePath(locale, "/foia#financial")}
            className="btn btn-outline mt-6"
          >
            {t.financialCta}
          </Link>
        </section>

        <section id="ethics" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">{t.ethicsHeading}</h2>
          <p className="mt-3 max-w-prose text-ink-muted">{t.ethicsBody}</p>
          <h3 className="mt-6 text-lg font-bold">
            {t.ethicsCommissionHeading}
          </h3>
          <ul className="mt-3 space-y-2">
            {ETHICS_COMMISSION.map((member) => (
              <li key={member.name}>
                <span className="font-semibold">{member.name}</span>{" "}
                <span className="text-ink-muted">
                  ({t.termExpires} {member.termExpires})
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4">
            <a className="link" href={`mailto:${TOWNSHIP.email.ethics}`}>
              {TOWNSHIP.email.ethics}
            </a>
          </p>
        </section>
      </Container>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-brand-mint/60 bg-surface-alt p-4">
      <dt className="text-sm font-semibold text-ink-muted">{label}</dt>
      <dd className="mt-1 text-2xl font-bold text-brand-teal-dark">{value}</dd>
    </div>
  );
}

/**
 * Several officials and staff have asked not to have their photograph
 * published, so everyone gets the same initials mark. It keeps the directory
 * visually even instead of singling people out with an empty frame.
 */
function Avatar({ name }: { name: string }) {
  const initials = name
    .replace(/,.*$/, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <span
      aria-hidden="true"
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-green/15 text-base font-bold text-brand-teal-dark"
    >
      {initials}
    </span>
  );
}
