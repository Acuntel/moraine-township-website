import type { ReactNode } from "react";
import { ReadAloud } from "./ReadAloud";
import { localePath, type Locale } from "@/lib/i18n";
import type { Dictionary, LinkItem, Section } from "@/content/types";

/**
 * Shared page furniture. Keeping the title block and section primitives in one
 * place is what lets every page in three languages stay structurally identical,
 * which is most of what makes the accessibility work hold.
 */

export function PageHeader({
  locale,
  dict,
  title,
  intro,
  kicker,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  title: string;
  intro?: string;
  kicker?: string;
  /** Anything a page needs directly under the intro, such as a phone line. */
  children?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden border-b border-line bg-cream-alt">
      {/* A soft brand wash instead of a hard band, so the header reads as part
          of the page rather than a stacked block. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-40 h-[26rem] w-[26rem] rounded-full bg-brand-green/[0.07] blur-3xl"
      />
      <div className="container-page relative pb-14 pt-32 sm:pb-16 sm:pt-36">
        {kicker ? <p className="eyebrow">{kicker}</p> : null}
        <div className="mt-2 flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
          <h1 className="max-w-3xl text-title font-semibold animate-rise-in">
            {title}
          </h1>
          <ReadAloud
            locale={locale}
            labelStart={dict.common.readAloud}
            labelStop={dict.common.stopReading}
            labelUnsupported={dict.common.readAloudUnsupported}
            className="shrink-0"
          />
        </div>
        {intro ? (
          <p className="mt-5 max-w-prose text-[1.1rem] leading-[1.7] text-ink-muted">
            {intro}
          </p>
        ) : null}
        {children}
      </div>
    </div>
  );
}

export function Paragraphs({ items }: { items: readonly string[] }) {
  return (
    <div className="prose-page max-w-prose">
      {items.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
    </div>
  );
}

export function Bullets({ items }: { items: readonly (string | LinkItem)[] }) {
  return (
    <ul className="mt-5 max-w-prose space-y-3 text-[1.0625rem] leading-[1.7] text-ink-muted">
      {items.map((item, i) => (
        <li key={i} className="relative pl-6">
          <span
            aria-hidden="true"
            className="absolute left-0 top-[0.66em] h-1.5 w-1.5 rounded-full bg-brand-green"
          />
          {typeof item === "string" ? (
            item
          ) : (
            <a className="link" href={item.href}>
              {item.label}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

export function SectionBlock({
  section,
  locale,
  externalNote,
  headingLevel = 3,
}: {
  section: Section;
  locale: Locale;
  externalNote: string;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <section id={section.id} className="scroll-mt-32">
      <Heading
        className={
          headingLevel === 2
            ? "text-section font-semibold"
            : "text-[1.3rem] font-semibold tracking-tight sm:text-[1.45rem]"
        }
      >
        {section.heading}
      </Heading>
      {section.body ? (
        <div className="mt-4">
          <Paragraphs items={section.body} />
        </div>
      ) : null}
      {section.subsections?.map((sub) => (
        <div key={sub.id} id={sub.id} className="mt-8 scroll-mt-32">
          <SubHeading level={headingLevel + 1}>{sub.heading}</SubHeading>
          <div className="mt-3">
            <Paragraphs items={sub.body} />
          </div>
        </div>
      ))}
      {section.outro ? (
        <div className="mt-8">
          <Paragraphs items={section.outro} />
        </div>
      ) : null}
      {section.bullets ? <Bullets items={section.bullets} /> : null}
      {section.links ? (
        <LinkList
          links={section.links}
          locale={locale}
          externalNote={externalNote}
        />
      ) : null}
    </section>
  );
}

/** One level below the section heading, so the outline stays unbroken. */
function SubHeading({ level, children }: { level: number; children: string }) {
  const Tag = level >= 4 ? "h4" : "h3";
  return (
    <Tag className="text-[1.12rem] font-semibold tracking-tight sm:text-[1.2rem]">
      {children}
    </Tag>
  );
}

export function LinkList({
  links,
  locale,
  externalNote,
}: {
  links: readonly LinkItem[];
  locale: Locale;
  externalNote: string;
}) {
  return (
    <ul className="mt-5 space-y-2.5">
      {links.map((link) => (
        <li key={link.href}>
          <ExternalOrInternal
            link={link}
            locale={locale}
            externalNote={externalNote}
          />
        </li>
      ))}
    </ul>
  );
}

/**
 * External links get an explicit, screen-reader-visible note that they open a
 * new tab, and PDFs say so. Nobody should discover a format change only after
 * the download starts. Internal links are stored unprefixed in every
 * dictionary, so they get the reader's language here; without it a Spanish
 * reader was sent to the English transportation page.
 */
export function ExternalOrInternal({
  link,
  locale,
  externalNote,
}: {
  link: LinkItem;
  locale: Locale;
  externalNote: string;
}) {
  if (link.external) {
    return (
      <a
        className="link"
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {link.label}
        {link.note ? (
          <span className="text-ink-muted"> ({link.note})</span>
        ) : null}
        <span className="sr-only"> ({externalNote})</span>
      </a>
    );
  }
  return (
    <a
      className="link"
      href={
        link.href.startsWith("/") ? localePath(locale, link.href) : link.href
      }
    >
      {link.label}
      {link.note ? (
        <span className="text-ink-muted"> ({link.note})</span>
      ) : null}
    </a>
  );
}

export function Card({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={`card ${className}`}>
      {children}
    </div>
  );
}

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`container-page section ${className}`}>{children}</div>
  );
}
