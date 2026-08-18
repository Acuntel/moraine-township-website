import type { ReactNode } from "react";

/**
 * The component vocabulary from the approved mock. Between them these are what
 * make a page read as furnished rather than as text in boxes, which is the
 * difference the client was pointing at.
 */

/**
 * Centred section header: a small green eyebrow flanked by rules, a serif
 * display heading, and an optional line of support copy.
 */
export function SectionHeader({
  eyebrow,
  title,
  sub,
  align = "center",
  onDark = false,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
  onDark?: boolean;
}) {
  const centred = align === "center";
  return (
    <div
      className={
        centred ? "mx-auto max-w-[40rem] text-center" : "max-w-[44rem]"
      }
    >
      <p
        className={`inline-flex items-center gap-2.5 text-[0.73rem] font-bold uppercase tracking-[0.14em] ${
          onDark ? "text-brand-mint" : "text-brand-teal"
        }`}
      >
        <Rule onDark={onDark} hidden={!centred} />
        {eyebrow}
        <Rule onDark={onDark} />
      </p>
      <h2
        className={`mt-3.5 font-display text-section ${onDark ? "!text-white" : "!text-ink"}`}
      >
        {title}
      </h2>
      {sub ? (
        <p
          className={`mt-4 text-[1.02rem] leading-[1.7] ${
            centred ? "mx-auto" : ""
          } max-w-[36rem] ${onDark ? "text-white/75" : "text-ink-muted"}`}
        >
          {sub}
        </p>
      ) : null}
    </div>
  );
}

function Rule({
  onDark,
  hidden = false,
}: {
  onDark: boolean;
  hidden?: boolean;
}) {
  if (hidden) return null;
  return (
    <span
      aria-hidden="true"
      className={`h-px w-[18px] ${onDark ? "bg-brand-mint/50" : "bg-brand-teal/40"}`}
    />
  );
}

/**
 * The scrolling feature strip under the hero. Duplicated once so the loop is
 * seamless, paused on hover, and frozen entirely under reduced-motion.
 */
export function TrustMarquee({
  items,
  label,
}: {
  items: string[];
  label: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className="overflow-hidden border-y border-line bg-white py-5"
      role="group"
      aria-label={label}
    >
      <ul className="flex w-max animate-marquee items-center gap-11 hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:px-5">
        {doubled.map((item, i) => (
          <li
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-2.5 whitespace-nowrap text-[0.85rem] font-medium text-ink-muted"
            // The second copy exists only to make the loop seamless.
            aria-hidden={i >= items.length ? "true" : undefined}
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-brand-green"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Full-bleed dark band carrying the figures. Every number here is sourced from
 * the Township's own published material; nothing is estimated.
 */
export function StatPanel({
  eyebrow,
  title,
  sub,
  stats,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  stats: { value: string; unit?: string; label: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-panel">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(1,166,103,.28),transparent_55%),radial-gradient(circle_at_85%_80%,rgba(0,90,96,.6),transparent_60%)]"
      />
      <Curve position="top" />
      <Curve position="bottom" />
      <div className="container-page section relative pb-24 pt-28 sm:pb-28 sm:pt-32">
        <SectionHeader eyebrow={eyebrow} title={title} sub={sub} onDark />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="rounded-lg border border-white/15 bg-white/[0.07] px-6 py-8 text-center backdrop-blur-sm"
            >
              <p className="font-display text-stat font-bold text-white">
                {stat.value}
                {stat.unit ? (
                  <span className="text-amber-light">{stat.unit}</span>
                ) : null}
              </p>
              <p className="mt-2.5 text-[0.85rem] leading-snug text-white/75">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Numbered step cards, four across. */
export function StepCards({
  steps,
}: {
  steps: { title: string; body: string }[];
}) {
  return (
    <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <li key={step.title} className="card card-lift text-center">
          <span
            aria-hidden="true"
            className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-brand-green-deep font-display text-[1.05rem] font-bold text-white"
          >
            {i + 1}
          </span>
          <h3 className="mt-5 text-[1.08rem] font-semibold">{step.title}</h3>
          <p className="mt-2.5 text-[0.93rem] leading-[1.65] text-ink-muted">
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}

/**
 * Asymmetric bento grid. The mock varies card widths so the block reads as
 * composed rather than as a uniform table of boxes.
 */
export function BentoGrid({
  items,
}: {
  items: {
    id: string;
    title: string;
    body: string;
    icon: ReactNode;
    href?: string;
    wide?: boolean;
  }[];
}) {
  return (
    <ul className="mt-14 grid gap-5 md:grid-cols-3">
      {items.map((item) => {
        const inner = (
          <>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-brand-green/10 text-brand-teal-dark transition-colors duration-500 ease-flow group-hover:bg-brand-green group-hover:text-white">
              {item.icon}
            </span>
            <h3 className="mt-5 text-[1.08rem] font-semibold">{item.title}</h3>
            <p className="mt-2.5 text-[0.93rem] leading-[1.65] text-ink-muted">
              {item.body}
            </p>
          </>
        );
        return (
          <li key={item.id} className={item.wide ? "md:col-span-2" : ""}>
            {item.href ? (
              <a
                href={item.href}
                className="card card-lift group flex h-full flex-col"
              >
                {inner}
              </a>
            ) : (
              <div className="card group flex h-full flex-col">{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/**
 * The organic edge that dissolves the dark band into the page. Drawn inside the
 * band, in the colour of the section it meets, so the wave reads as the cream
 * page eating into the green rather than as a stripe between two blocks.
 */
function Curve({ position }: { position: "top" | "bottom" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 leading-[0] ${
        position === "top" ? "top-0" : "bottom-0 rotate-180"
      }`}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="block h-[55px] w-full text-cream sm:h-[85px]"
        fill="currentColor"
      >
        <path d="M0 0h1440v26c-240 34-480 40-720 16S240 4 0 40V0z" />
      </svg>
    </div>
  );
}
