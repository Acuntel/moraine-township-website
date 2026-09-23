import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, localePath, LOCALES } from "@/lib/i18n";
import { TOWNSHIP } from "@/lib/township";
import { localizedNews, publishedNews, readContent } from "@/lib/store";
import { DonateBand } from "@/components/DonateBand";
import { HomeHero } from "@/components/HomeHero";
import {
  BentoGrid,
  SectionHeader,
  StatPanel,
  StepCards,
  TrustMarquee,
} from "@/components/Sections";
import { TileIcon } from "@/components/TileIcon";
import { buildMetadata } from "@/lib/metadata";

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
  const dict = getDictionary(params.lang);
  return buildMetadata({
    locale: params.lang,
    route: "/",
    title: dict.home.title,
    description: dict.home.description,
  });
}

export default async function HomePage({
  params,
}: {
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const locale = params.lang;
  const dict = getDictionary(locale);
  const t = dict.home;
  const content = await readContent();
  const news = publishedNews(content).slice(0, 3);

  return (
    <>
      <HomeHero locale={locale} dict={dict} />

      <TrustMarquee items={t.marquee} label={t.marqueeLabel} />

      {/* News as headlines directly on the home page, per the meeting. */}
      <section className="container-page section">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <SectionHeader
            eyebrow={t.newsEyebrow}
            title={t.newsHeading}
            align="left"
          />
          {news.length > 0 ? (
            <Link
              className="link text-[0.95rem] font-medium"
              href={localePath(locale, "/news")}
            >
              {t.newsViewAll}
            </Link>
          ) : null}
        </div>

        {news.length === 0 ? (
          <p className="mt-8 text-ink-muted">{t.newsEmpty}</p>
        ) : (
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {news.map((item) => {
              const n = localizedNews(item, locale);
              return (
                <li key={item.id}>
                  <article className="card card-lift h-full">
                    <time dateTime={item.date} className="eyebrow">
                      {formatDate(item.date, locale)}
                    </time>
                    <h3 className="mt-3 text-[1.12rem] font-semibold leading-snug">
                      <Link
                        className="underline-offset-4 transition-colors duration-300 hover:text-brand-teal hover:underline"
                        href={localePath(locale, `/news/${item.slug}`)}
                      >
                        {n.title}
                      </Link>
                    </h3>
                    <p className="mt-2.5 text-[0.93rem] leading-[1.65] text-ink-muted">
                      {n.summary}
                    </p>
                    {!n.translated && dict.shared.untranslatedNote ? (
                      <p className="mt-3 text-xs italic text-ink-muted">
                        {dict.shared.untranslatedNote}
                      </p>
                    ) : null}
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <StatPanel
        eyebrow={t.impactEyebrow}
        title={t.impactHeading}
        sub={t.impactSub}
        stats={t.stats}
      />

      {/* How to get help, as four numbered steps. */}
      <section className="container-page section">
        <SectionHeader
          eyebrow={t.stepsEyebrow}
          title={t.stepsHeading}
          sub={t.stepsSub}
        />
        <StepCards steps={t.steps} />
      </section>

      {/* What the Township provides, as a bento grid of icon cards. */}
      <section className="bg-cream-alt">
        <div className="container-page section">
          <SectionHeader
            eyebrow={t.tilesEyebrow}
            title={t.tilesHeading}
            sub={t.tilesSub}
          />
          <BentoGrid
            items={t.tiles.map((tile) => ({
              id: tile.id,
              title: tile.title,
              body: tile.blurb,
              href: localePath(locale, tile.href),
              icon: <TileIcon id={tile.id} className="h-5 w-5" />,
            }))}
          />
        </div>
      </section>

      {/* The two asks the Supervisor named, with their photographs. */}
      <section className="container-page section">
        <SectionHeader
          eyebrow={t.helpEyebrow}
          title={t.helpYouHeading}
          align="center"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <TwoUp
            heading={t.helpYouHeading}
            body={t.helpYouBody}
            cta={t.helpYouCta}
            href={localePath(locale, "/services")}
            imageAlt={t.helpYouImageAlt}
            image="/images/round2/help-you.webp"
          />
          <TwoUp
            heading={t.helpUsHeading}
            body={t.helpUsBody}
            cta={t.helpUsCta}
            href={localePath(locale, "/get-involved")}
            imageAlt={t.helpUsImageAlt}
            image="/images/help-us.webp"
          />
        </div>
      </section>

      <section className="container-page pb-section">
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
      </section>

      {/* Board schedule and agenda: present, but off the critical path. */}
      <section className="border-y border-line bg-cream-alt">
        <div className="container-page flex flex-wrap items-center justify-between gap-6 py-14">
          <div className="max-w-prose">
            <h2 className="font-display text-[1.4rem] sm:text-[1.7rem]">
              {t.boardStripHeading}
            </h2>
            <p className="mt-3 leading-[1.7] text-ink-muted">
              {t.boardStripBody}
            </p>
          </div>
          <Link
            href={localePath(locale, "/board-meetings")}
            className="btn btn-outline"
          >
            {t.boardStripCta}
          </Link>
        </div>
      </section>

      <section className="container-page section">
        <div className="card grid gap-8 sm:grid-cols-3">
          <div>
            <p className="eyebrow">{dict.common.address}</p>
            <address className="mt-2 not-italic leading-[1.7] text-ink-muted">
              {TOWNSHIP.address.street}
              <br />
              {TOWNSHIP.address.city}, {TOWNSHIP.address.state}{" "}
              {TOWNSHIP.address.zip}
            </address>
          </div>
          <div>
            <p className="eyebrow">{dict.common.phone}</p>
            <p className="mt-2 leading-[1.7]">
              <a className="link" href={`tel:${TOWNSHIP.phone.mainHref}`}>
                {TOWNSHIP.phone.main}
              </a>
              <br />
              <a className="link" href={`mailto:${TOWNSHIP.email.info}`}>
                {TOWNSHIP.email.info}
              </a>
            </p>
          </div>
          <div>
            <p className="eyebrow">{dict.common.officeHours}</p>
            <p className="mt-2 leading-[1.7] text-ink-muted">
              {dict.shared.hours}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function TwoUp({
  heading,
  body,
  cta,
  href,
  image,
  imageAlt,
}: {
  heading: string;
  body: string;
  cta: string;
  href: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <article className="card-lift group overflow-hidden rounded-lg border border-line bg-white shadow-sm">
      <div className="overflow-hidden">
        <div
          className="h-56 bg-panel bg-cover bg-center transition-transform duration-[900ms] ease-flow group-hover:scale-105"
          style={{ backgroundImage: `url('${image}')` }}
          role="img"
          aria-label={imageAlt}
        />
      </div>
      <div className="p-8">
        <h3 className="font-display text-[1.4rem] !text-ink sm:text-[1.6rem]">
          {heading}
        </h3>
        <p className="mt-4 leading-[1.72] text-ink-muted">{body}</p>
        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-2 text-[0.96rem] font-medium text-brand-teal transition-colors duration-300 hover:text-brand-teal-dark"
        >
          {cta}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform duration-500 ease-flow group-hover:translate-x-1"
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}

function formatDate(value: string, locale: string) {
  try {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${value}T00:00:00Z`));
  } catch {
    return value;
  }
}
