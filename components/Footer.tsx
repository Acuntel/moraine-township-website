import Link from "next/link";
import { Logo } from "./Logo";
import { LINKS, TOWNSHIP } from "@/lib/township";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/types";

/**
 * The Supervisor asked for the footer to shrink: "make that a lot smaller and
 * white on the bottom, it doesn't have to take up half a page." Three compact
 * columns, plus the very small gray admin link she asked for at the very
 * bottom.
 */
export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-brand-mint/60 bg-white">
      <div className="container-page py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <Logo className="h-12 w-12" title={dict.home.h1} />
              <span className="font-bold leading-tight text-brand-teal-dark">
                Moraine
                <br />
                Township
              </span>
            </div>
            <p className="mt-3 text-sm text-ink-muted">{dict.shared.tagline}</p>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-brand-teal-dark">
              {dict.footer.contactHeading}
            </h2>
            <address className="mt-2 space-y-1 text-sm not-italic text-ink-muted">
              <p>{TOWNSHIP.address.street}</p>
              <p>
                {TOWNSHIP.address.city}, {TOWNSHIP.address.state}{" "}
                {TOWNSHIP.address.zip}
              </p>
              <p>
                <a className="link" href={`tel:${TOWNSHIP.phone.mainHref}`}>
                  {TOWNSHIP.phone.main}
                </a>
              </p>
              <p>
                <a className="link" href={`mailto:${TOWNSHIP.email.info}`}>
                  {TOWNSHIP.email.info}
                </a>
              </p>
              <p className="pt-1">{dict.shared.hours}</p>
            </address>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-brand-teal-dark">
              {dict.footer.quickLinks}
            </h2>
            <ul className="mt-2 space-y-1.5 text-sm">
              {dict.nav.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link className="link" href={localePath(locale, item.href)}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link className="link" href={localePath(locale, "/donate")}>
                  {dict.common.donate}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-brand-teal-dark">
              {dict.footer.legalHeading}
            </h2>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li>
                <Link className="link" href={localePath(locale, "/foia")}>
                  {dict.footer.foia}
                </Link>
              </li>
              <li>
                <Link
                  className="link"
                  href={localePath(locale, dict.footer.accessibilityHref)}
                >
                  {dict.footer.accessibility}
                </Link>
              </li>
              <li>
                <Link
                  className="link"
                  href={localePath(locale, "/board-meetings")}
                >
                  {dict.boardMeetings.title}
                </Link>
              </li>
              <li>
                <a
                  className="link"
                  href={LINKS.mentalHealthBoard}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {dict.footer.mentalHealthBoard}
                  <span className="sr-only">
                    {" "}
                    ({dict.common.externalLinkNote})
                  </span>
                </a>
              </li>
              <li>
                <a
                  className="link"
                  href={LINKS.townshipsOfIllinois}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {dict.footer.stateResource}
                  <span className="sr-only">
                    {" "}
                    ({dict.common.externalLinkNote})
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-brand-mint/50 pt-5 text-xs text-ink-muted">
          <p>
            &copy; {year} {dict.footer.rights}
          </p>
          {/* Small gray admin entry point, as requested on the call. */}
          <Link
            href="/admin"
            className="text-xs text-ink-muted/70 underline underline-offset-2 transition hover:text-ink-muted"
          >
            {dict.footer.admin}
          </Link>
        </div>
      </div>
    </footer>
  );
}
