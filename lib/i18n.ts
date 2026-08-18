// English lives at the root (/about), Spanish and Russian are prefixed
// (/es/about, /ru/about). This keeps every URL a resident already has working
// and matches how the Township already publishes its Food Pantry application:
// English, Spanish and Russian, no other languages.

export const LOCALES = ["en", "es", "ru"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  es: "Español",
  ru: "Русский",
};

/** BCP 47 tags for <html lang> and for the speech synthesis voice. */
export const LOCALE_TAGS: Record<Locale, string> = {
  en: "en-US",
  es: "es-US",
  ru: "ru-RU",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Prefix a route for a locale. English is unprefixed. */
export function localePath(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return locale === DEFAULT_LOCALE ? clean || "/" : `/${locale}${clean}`;
}

/**
 * Strip the locale prefix off an incoming pathname.
 * Returns the locale it found and the route beneath it, so the language
 * switcher can move the reader sideways without losing their place.
 */
export function splitLocale(pathname: string): {
  locale: Locale;
  route: string;
} {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  // Strip the prefix for ANY locale, including the default. The browser shows
  // "/about" for English, but the middleware rewrite means the server renders
  // "/en/about". If "/en" is not stripped here, server and client disagree
  // about the current route, which silently breaks both aria-current="page"
  // and the header's over-hero styling on every English page.
  if (first && isLocale(first)) {
    const route = "/" + segments.slice(1).join("/");
    return {
      locale: first,
      route: route === "/" ? "/" : route.replace(/\/$/, ""),
    };
  }
  return {
    locale: DEFAULT_LOCALE,
    route: pathname === "/" ? "/" : pathname.replace(/\/$/, ""),
  };
}
