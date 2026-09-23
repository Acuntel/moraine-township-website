/**
 * Small pieces of the About page, kept here so the page itself stays under the
 * 300-line limit as the committee adds to it.
 */

/**
 * An address that may wrap after the @ on a phone rather than push its card
 * wider than the column. The longest, administrator@, did exactly that at
 * 390px.
 */
export function Email({ address }: { address: string }) {
  const at = address.indexOf("@");
  if (at < 0) return <>{address}</>;
  return (
    <>
      {address.slice(0, at + 1)}
      <wbr />
      {address.slice(at + 1)}
    </>
  );
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-brand-mint/60 bg-surface-alt p-4">
      <dt className="text-sm font-semibold text-ink-muted">{label}</dt>
      <dd className="mt-1 text-2xl font-bold text-brand-teal-dark">{value}</dd>
    </div>
  );
}

/**
 * Staff said at the 2026-08-13 planning meeting that they do not want their
 * images published, so staff cards use the initials mark. It keeps the
 * directory visually even instead of singling people out with an empty frame.
 * Officials show their photograph instead (ELECTED_OFFICIALS in lib/township.ts).
 */
export function Avatar({ name }: { name: string }) {
  const initials = name
    .replace(/,.*$/, "")
    .split(/\s+/)
    // A quoted nickname, as in Elizabeth “Lizzy” Innes, is not an initial.
    .filter((part) => part && !/^[“"‘']/.test(part))
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

/**
 * An official's photograph, round like the initials mark it replaces. Served
 * from a 240px copy at normal and 2x density and from the 480px original at 3x,
 * so a phone never downloads more than the circle can show.
 */
export function Headshot({ src, alt }: { src: string; alt: string }) {
  const small = src.replace(/\.webp$/, "-240.webp");
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={small}
      srcSet={`${small} 240w, ${src} 480w`}
      sizes="80px"
      width={80}
      height={80}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="h-20 w-20 shrink-0 rounded-full bg-cream-alt object-cover ring-1 ring-line"
    />
  );
}
