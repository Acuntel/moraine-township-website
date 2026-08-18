import { fileSize, type TownshipDocument } from "@/lib/documents";

/**
 * Renders a set of documents as links that say what they are before you open
 * them: format and size are announced, so nobody discovers a 12 MB scan after
 * tapping it on a phone, and screen reader users know it is a PDF in advance.
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
            className="group flex items-baseline justify-between gap-4 py-2.5 text-[0.97rem] transition-colors"
          >
            <span className="text-brand-teal underline decoration-brand-teal/30 underline-offset-4 group-hover:text-brand-teal-dark">
              {doc.label}
            </span>
            <span className="shrink-0 whitespace-nowrap text-[0.8rem] text-ink-muted">
              {doc.ext.toUpperCase()} · {fileSize(doc.bytes)}
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

/** The same list, grouped by year, for long archives like meeting minutes. */
export function DocumentArchive({
  groups,
  pdfNote,
  externalNote,
  emptyNote,
}: {
  groups: { year: string; docs: TownshipDocument[] }[];
  pdfNote: string;
  externalNote: string;
  emptyNote?: string;
}) {
  if (groups.length === 0) {
    return emptyNote ? (
      <p className="mt-4 text-ink-muted">{emptyNote}</p>
    ) : null;
  }
  return (
    <div className="mt-6 space-y-3">
      {groups.map((group, i) => (
        <details
          key={group.year}
          // The current year opens by default; older years stay folded so the
          // page does not begin with a wall of a hundred links.
          open={i === 0}
          className="rounded-md border border-line bg-white px-5 py-4"
        >
          <summary className="cursor-pointer font-semibold text-brand-teal-dark">
            {group.year}
            <span className="ml-2 font-normal text-ink-muted">
              ({group.docs.length})
            </span>
          </summary>
          <DocumentList
            docs={group.docs}
            pdfNote={pdfNote}
            externalNote={externalNote}
          />
        </details>
      ))}
    </div>
  );
}
