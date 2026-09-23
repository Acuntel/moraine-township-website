/**
 * What the pantry cannot take, set beside every drop-off instruction so a
 * donor sees it before they bring something in. Lizzy Innes asked in the round
 * 2 review for this to be prominent and easy to see, so it is a bordered
 * callout with its own heading rather than a clause inside a paragraph.
 *
 * The border is amber-deep, which clears 3:1 against white and cream as a
 * non-text boundary (WCAG 1.4.11). The text itself stays in ink.
 */
export function CannotAccept({
  heading,
  items,
  headingLevel = 3,
  className = "",
}: {
  heading: string;
  items: readonly string[];
  headingLevel?: 2 | 3;
  className?: string;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <div
      className={`rounded-lg border-2 border-amber-deep bg-white p-6 shadow-sm ${className}`}
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber/15 text-amber-deep"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            className="h-5 w-5"
          >
            <circle cx="12" cy="12" r="8.5" />
            <path d="M6 6l12 12" strokeLinecap="round" />
          </svg>
        </span>
        <Heading className="font-sans text-[1.15rem] font-bold !text-ink">
          {heading}
        </Heading>
      </div>
      <ul className="mt-4 space-y-2 text-[1.02rem] leading-[1.6] text-ink">
        {items.map((item) => (
          <li key={item} className="relative pl-6">
            <span
              aria-hidden="true"
              className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rounded-full bg-amber-deep"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
