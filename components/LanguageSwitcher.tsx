"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, LOCALE_LABELS, localePath, splitLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

/**
 * Moves the reader sideways without losing their place: whatever page they are
 * on, the switch lands them on the same page in the new language.
 *
 * Rendered as real links rather than a select, so it works without JavaScript
 * and so each language is individually focusable and announced.
 */
export function LanguageSwitcher({
  current,
  label,
  description,
  onDark = false,
}: {
  current: Locale;
  label: string;
  description: string;
  /** The home hero is dark, so the switcher inverts while it sits on it. */
  onDark?: boolean;
}) {
  const pathname = usePathname() || "/";
  const { route } = splitLocale(pathname);

  return (
    <nav aria-label={description} className="flex items-center gap-0.5">
      <span className="sr-only">{label}</span>
      {LOCALES.map((locale) => {
        const isCurrent = locale === current;
        return (
          <Link
            key={locale}
            href={localePath(locale, route)}
            hrefLang={locale}
            lang={locale}
            aria-current={isCurrent ? "true" : undefined}
            className={
              isCurrent
                ? onDark
                  ? "rounded-full bg-white px-2.5 py-1.5 text-[0.78rem] font-semibold text-brand-teal-dark"
                  : "rounded-full bg-brand-teal-dark px-2.5 py-1.5 text-[0.78rem] font-semibold text-white"
                : onDark
                  ? "rounded-full px-2.5 py-1.5 text-[0.78rem] font-semibold text-white/80 transition-colors duration-300 hover:text-white"
                  : "rounded-full px-2.5 py-1.5 text-[0.78rem] font-semibold text-ink-muted transition-colors duration-300 hover:bg-cream-alt hover:text-ink"
            }
          >
            {LOCALE_LABELS[locale]}
          </Link>
        );
      })}
    </nav>
  );
}
