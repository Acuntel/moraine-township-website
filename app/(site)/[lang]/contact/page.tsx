import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, LOCALES } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { ELECTED_OFFICIALS, STAFF, TOWNSHIP } from "@/lib/township";
import { Card, Container, PageHeader } from "@/components/Page";
import { ContactForm } from "@/components/ContactForm";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  if (!isLocale(params.lang)) return {};
  const d = getDictionary(params.lang).contact;
  return buildMetadata({
    locale: params.lang,
    route: "/contact",
    title: d.title,
    description: d.description,
  });
}

export default function ContactPage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const locale = params.lang;
  const dict = getDictionary(locale);
  const t = dict.contact;

  const lines = [
    {
      label: t.departments[0].label,
      detail: t.departments[0].detail,
      phone: TOWNSHIP.phone.main,
      href: TOWNSHIP.phone.mainHref,
    },
    {
      label: t.departments[1].label,
      detail: t.departments[1].detail,
      phone: TOWNSHIP.phone.transportation,
      href: TOWNSHIP.phone.transportationHref,
    },
    {
      label: t.departments[2].label,
      detail: t.departments[2].detail,
      phone: TOWNSHIP.phone.assessor,
      href: TOWNSHIP.phone.assessorHref,
    },
    {
      label: t.departments[3].label,
      detail: t.departments[3].detail,
      phone: TOWNSHIP.phone.main,
      href: TOWNSHIP.phone.mainHref,
    },
    {
      label: t.departments[4].label,
      detail: t.departments[4].detail,
      phone: TOWNSHIP.phone.taxPrep,
      href: `+1${TOWNSHIP.phone.taxPrep.replace(/\D/g, "")}`,
    },
  ];

  return (
    <>
      <PageHeader locale={locale} dict={dict} title={t.h1} intro={t.intro} />

      <Container className="space-y-14">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <h2 className="text-xl font-bold">{t.officeHeading}</h2>
            <address className="mt-3 space-y-1 not-italic text-ink-muted">
              <p>{TOWNSHIP.address.street}</p>
              <p>
                {TOWNSHIP.address.city}, {TOWNSHIP.address.state}{" "}
                {TOWNSHIP.address.zip}
              </p>
              <p className="pt-2">
                <a
                  className="link font-semibold"
                  href={`tel:${TOWNSHIP.phone.mainHref}`}
                >
                  {TOWNSHIP.phone.main}
                </a>
              </p>
              <p>
                <a
                  className="link font-semibold"
                  href={`mailto:${TOWNSHIP.email.info}`}
                >
                  {TOWNSHIP.email.info}
                </a>
              </p>
              <p className="pt-2">
                {dict.common.fax}: {TOWNSHIP.fax.main}
              </p>
            </address>
          </Card>

          <Card className="lg:col-span-2">
            <h2 className="text-xl font-bold">{dict.common.officeHours}</h2>
            <p className="mt-3 text-ink-muted">{dict.shared.hours}</p>
            <h3 className="mt-6 text-lg font-bold">{t.departmentsHeading}</h3>
            <ul className="mt-3 space-y-3">
              {lines.map((line) => (
                <li
                  key={line.label}
                  className="flex flex-wrap items-baseline justify-between gap-2"
                >
                  <span>
                    <span className="font-semibold">{line.label}</span>
                    <span className="text-ink-muted"> · {line.detail}</span>
                  </span>
                  <a className="link font-semibold" href={`tel:${line.href}`}>
                    {line.phone}
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <section id="form" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">{t.formHeading}</h2>
          <p className="mt-2 max-w-prose text-ink-muted">{t.formIntro}</p>
          <div className="mt-6 max-w-prose">
            <ContactForm copy={t} requiredLabel={dict.common.required} />
          </div>
        </section>

        <section id="directory" className="scroll-mt-28">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {t.directoryHeading}
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...ELECTED_OFFICIALS, ...STAFF].map((person) => (
              <li key={person.email}>
                <Card className="h-full">
                  <h3 className="font-bold leading-tight">{person.name}</h3>
                  <p className="text-sm text-ink-muted">
                    {dict.shared.roles[person.roleKey]}
                  </p>
                  <p className="mt-2 text-sm">
                    <a className="link" href={`mailto:${person.email}`}>
                      {person.email}
                    </a>
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
