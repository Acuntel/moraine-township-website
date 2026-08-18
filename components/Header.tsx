"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { DonateButton } from "./DonateButton";
import { CallButton } from "./CallButton";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { localePath, splitLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/types";

/**
 * Fixed header that starts transparent over the hero and turns to frosted glass
 * once the reader scrolls, shrinking its padding as it goes. That transition is
 * the single biggest reason the approved mock read as flowing rather than
 * blocky, so it is reproduced here rather than approximated.
 *
 * One row: mark, eight nav links, actions. Eight is the most that fits at this
 * type size in all three languages, which is why the labels are short.
 */
export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || "/";
  const { route } = splitLocale(pathname);

  // The home hero is dark, so the header sits on it in white until it lifts off.
  const overHero = route === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A menu that survives navigation traps the reader on mobile.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-flow ${
        scrolled || open
          ? "bg-cream/85 shadow-sm backdrop-blur-xl backdrop-saturate-150"
          : "bg-transparent"
      }`}
    >
      <div className="container-page">
        <div
          className={`flex items-center justify-between gap-4 transition-all duration-500 ease-flow ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          <Link
            href={localePath(locale, "/")}
            className="flex shrink-0 items-center gap-3"
            aria-label={dict.home.h1}
          >
            <Logo
              className={`shrink-0 transition-all duration-500 ease-flow ${
                scrolled ? "h-10 w-10" : "h-12 w-12"
              }`}
              title={dict.home.h1}
            />
            <span
              className={`hidden text-[0.95rem] font-semibold leading-[1.15] tracking-tight sm:block ${
                overHero ? "text-white" : "text-brand-teal-dark"
              }`}
            >
              Moraine
              <br />
              Township
            </span>
          </Link>

          <nav
            aria-label={dict.common.mainNavLabel}
            className="hidden flex-1 justify-center xl:flex"
          >
            <ul className="flex items-center gap-[clamp(0.6rem,1.2vw,1.15rem)]">
              {dict.nav.map((item) => {
                const active =
                  route === item.href || route.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={localePath(locale, item.href)}
                      aria-current={active ? "page" : undefined}
                      className={`nav-link whitespace-nowrap ${
                        overHero ? "nav-link-on-dark" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden lg:block">
              <LanguageSwitcher
                current={locale}
                label={dict.common.languageLabel}
                description={dict.common.switchLanguage}
                onDark={overHero}
              />
            </div>
            <CallButton
              label={dict.common.callUs}
              srLabel={dict.common.callOffice}
              onDark={overHero}
            />
            <DonateButton
              label={dict.common.donateShort}
              ariaLabel={dict.common.donateAria}
              externalNote={dict.common.externalLinkNote}
              variant="header"
            />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="primary-navigation"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 xl:hidden ${
                overHero
                  ? "border-white/45 text-white hover:bg-white hover:text-brand-teal-dark"
                  : "border-line text-brand-teal-dark hover:bg-cream-alt"
              }`}
            >
              {open ? (
                <CloseIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
              <span className="sr-only">
                {open ? dict.common.closeMenu : dict.common.openMenu}
              </span>
            </button>
          </div>
        </div>

        {/* Collapsed navigation. Rendered only when open so its links stay out
            of the tab order while hidden. */}
        {open ? (
          <nav
            id="primary-navigation"
            aria-label={dict.common.mainNavLabel}
            className="border-t border-line pb-5 pt-4 xl:hidden"
          >
            <ul className="grid gap-1 sm:grid-cols-2">
              {dict.nav.map((item) => {
                const active =
                  route === item.href || route.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={localePath(locale, item.href)}
                      aria-current={active ? "page" : undefined}
                      className={`block rounded-sm px-3 py-2.5 text-[0.95rem] font-medium transition-colors duration-300 ${
                        active
                          ? "bg-cream-alt text-brand-teal-dark"
                          : "text-ink-muted hover:bg-cream-alt hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  href={localePath(locale, "/board-meetings")}
                  className="block rounded-sm px-3 py-2.5 text-[0.95rem] font-medium text-ink-muted transition-colors duration-300 hover:bg-cream-alt hover:text-ink"
                >
                  {dict.boardMeetings.title}
                </Link>
              </li>
              <li>
                <Link
                  href={localePath(locale, "/programs")}
                  className="block rounded-sm px-3 py-2.5 text-[0.95rem] font-medium text-ink-muted transition-colors duration-300 hover:bg-cream-alt hover:text-ink"
                >
                  {dict.programs.title}
                </Link>
              </li>
            </ul>
            <div className="mt-4 lg:hidden">
              <LanguageSwitcher
                current={locale}
                label={dict.common.languageLabel}
                description={dict.common.switchLanguage}
              />
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}

function MenuIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      className={className}
    >
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
