import { fileSize, type TownshipDocument } from "@/lib/documents";

/**
 * Renders a set of documents as links. Format and size are announced to screen
 * readers, so nobody discovers a 12 MB scan after tapping it and everyone knows
 * in advance that a link opens a PDF in a new tab. The visible "PDF, size"
 * column came off in the round 2 review, at Sanela Abazovic's request.
 */
export function DocumentList({
  docs,
  pdfNote,
  externalNote,
  emptyNote,
}: {
  docs: TownshipDocument[];
  pdfNote: string;
  externalNote: string;
  emptyNote?: string;
}) {
  if (docs.length === 0) {
    return emptyNote ? (
      <p className="mt-4 text-ink-muted">{emptyNote}</p>
    ) : null;
  }
  return (
    <ul className="mt-4 divide-y divide-line">
      {docs.map((doc) => (
        <li key={doc.url}>
          <a
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 py-2.5 text-[0.97rem] transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
              className="mt-[0.2em] h-4 w-4 shrink-0 text-brand-teal"
            >
              <path
                d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"
                strokeLinejoin="round"
              />
              <path d="M14 3v5h5M9 13h6M9 17h4" strokeLinecap="round" />
            </svg>
            <span className="text-brand-teal underline decoration-brand-teal/30 underline-offset-4 group-hover:text-brand-teal-dark">
              {doc.label}
            </span>
            <span className="sr-only">
              ({pdfNote}, {fileSize(doc.bytes)}, {externalNote})
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * The same list, grouped by year, for long archives like meeting minutes. It
 * sits inside a closed DocGroup, so the newest year is open by default and is
 * what a resident sees the moment they open the outer group.
 */
export function DocumentArchive({
  groups,
  pdfNote,
  externalNote,
  countLabel,
  emptyNote,
}: {
  groups: { year: string; docs: TownshipDocument[] }[];
  pdfNote: string;
  externalNote: string;
  countLabel: (count: number) => string;
  emptyNote?: string;
}) {
  if (groups.length === 0) {
    return emptyNote ? (
      <p className="mt-4 text-ink-muted">{emptyNote}</p>
    ) : null;
  }
  return (
    <div className="mt-4 space-y-3">
      {groups.map((group, i) => (
        <details
          key={group.year}
          open={i === 0}
          className="group/year rounded-md border border-line bg-cream"
        >
          <summary className="flex cursor-pointer list-none items-center gap-3 rounded-md px-4 py-3 font-semibold text-brand-teal-dark transition-colors hover:bg-cream-alt [&::-webkit-details-marker]:hidden">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              aria-hidden="true"
              className="h-3.5 w-3.5 shrink-0 -rotate-90 text-brand-teal transition-transform duration-300 group-open/year:rotate-0"
            >
              <path
                d="M6 9l6 6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {group.year}
            <span className="font-normal text-ink-muted">
              {countLabel(group.docs.length)}
            </span>
          </summary>
          <div className="border-t border-line bg-white px-3 pb-3 sm:px-4">
            <DocumentList
              docs={group.docs}
              pdfNote={pdfNote}
              externalNote={externalNote}
            />
          </div>
        </details>
      ))}
    </div>
  );
}
