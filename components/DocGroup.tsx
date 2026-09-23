import type { ReactNode } from "react";

/**
 * One group of Township records behind a button, instead of every file listed
 * on the page. Sanela Abazovic asked for this in the round 2 review: minutes,
 * budgets, audits, levies, notices, newsletters, cemetery records and the
 * Assessor's documents each open on a click.
 *
 * Native details and summary, so it works with the keyboard and a screen reader
 * without any script, and every link is still in the server-rendered HTML.
 * That matters: scripts/illinois-compliance.mjs counts the minutes, budget and
 * audit links in the page source, and Illinois law requires them to be posted.
 *
 * The heading sits inside the summary so the group still shows up when a
 * screen reader user moves through the page by headings.
 */
export function DocGroup({
  id,
  title,
  count,
  level = 3,
  note,
  children,
}: {
  /** The anchor, which old links such as /foia#audit land on. */
  id?: string;
  title: string;
  /** Already translated, such as "9 documents". */
  count?: string;
  level?: 2 | 3 | 4;
  note?: string;
  children: ReactNode;
}) {
  const Heading = `h${level}` as "h2" | "h3" | "h4";
  return (
    <details
      id={id}
      className="group/doc scroll-mt-28 rounded-lg border border-line bg-white shadow-sm transition-shadow open:shadow-md"
    >
      <summary className="flex cursor-pointer list-none items-center gap-4 rounded-lg px-5 py-4 transition-colors hover:bg-cream-alt sm:px-6 [&::-webkit-details-marker]:hidden">
        <span className="min-w-0 flex-1">
          <Heading
            className={
              level === 2
                ? "font-display text-[1.25rem] font-bold leading-snug text-ink sm:text-[1.4rem]"
                : "text-[1.08rem] font-semibold leading-snug text-brand-teal-dark"
            }
          >
            {title}
          </Heading>
          {count ? (
            <span className="mt-0.5 block text-sm text-ink-muted">{count}</span>
          ) : null}
        </span>
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-teal/50 text-brand-teal transition-transform duration-300 group-open/doc:rotate-180"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            aria-hidden="true"
            className="h-4 w-4"
          >
            <path
              d="M6 9l6 6 6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </summary>
      <div className="border-t border-line px-4 pb-5 sm:px-6">
        {note ? (
          <p className="mt-4 max-w-prose text-sm text-ink-muted">{note}</p>
        ) : null}
        {children}
      </div>
    </details>
  );
}

/**
 * "9 documents", "1 documento", "3 документа": the count on a DocGroup, in the
 * reader's language, with the plural form Intl picks for that number.
 */
export function documentCount(
  forms: { one: string; few: string; many: string; other: string },
  count: number,
  locale: string,
): string {
  const rule = new Intl.PluralRules(locale).select(count);
  const form =
    rule === "one" || rule === "few" || rule === "many"
      ? forms[rule]
      : forms.other;
  return form.replace("{n}", new Intl.NumberFormat(locale).format(count));
}
