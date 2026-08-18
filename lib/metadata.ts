import type { Metadata } from "next";
import { DEFAULT_LOCALE, LOCALES, LOCALE_TAGS, localePath } from "./i18n";
import type { Locale } from "./i18n";
import { SITE_URL } from "./township";

/**
 * Canonical plus hreflang for a page. Every page on this site exists in all
 * three languages, so every page claims all three alternates plus x-default.
 * If that ever stops being true, this is the one place to gate it, because an
 * hreflang pointing at a page that does not exist is worse than none at all.
 */
export function buildMetadata({
  locale,
  route,
  title,
  description,
}: {
  locale: Locale;
  route: string;
  title: string;
  description: string;
}): Metadata {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[LOCALE_TAGS[l]] = `${SITE_URL}${localePath(l, route)}`;
  }
  languages["x-default"] = `${SITE_URL}${localePath(DEFAULT_LOCALE, route)}`;

  const canonical = `${SITE_URL}${localePath(locale, route)}`;

  /**
   * The share card. Declaring twitter:card="summary_large_image" without an
   * image promises a picture and delivers a blank rectangle, which is what a
   * resident saw when a neighbour shared the pantry page on Facebook or in a
   * text message. Regenerate it with `node scripts/og-image.mjs`.
   *
   * Absolute, because Facebook, iMessage and Slack fetch this URL from their
   * own servers with no page context to resolve a relative path against.
   */
  const image = {
    url: `${assetOrigin()}/images/og.png`,
    width: 1200,
    height: 630,
    alt: OG_ALT[locale],
  };

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "Moraine Township",
      locale: LOCALE_TAGS[locale].replace("-", "_"),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/**
 * Where the share card is actually served from right now.
 *
 * Canonical and hreflang point at morainetownship.org because that is where the
 * site will live, and pointing them anywhere else would hand search engines the
 * wrong address at launch. The share card cannot follow that rule: until DNS
 * moves, morainetownship.org is still Squarespace, so an absolute URL there
 * returns 404 and the card renders blank. Facebook caches a scrape for weeks,
 * so a 404 fetched today would outlive the cutover.
 *
 * VERCEL_PROJECT_PRODUCTION_URL is the project's production domain. It is the
 * vercel.app address today and becomes morainetownship.org by itself the moment
 * that domain is attached to the project, so this needs no cutover step and
 * cannot be forgotten.
 */
function assetOrigin(): string {
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return production ? `https://${production}` : SITE_URL;
}

/**
 * Written after opening public/images/og.png and looking at it, the same rule
 * every other image on this site follows. Some platforms expose this to screen
 * reader users in place of the picture.
 */
const OG_ALT: Record<Locale, string> = {
  en: "Moraine Township, established 1850. Staff and volunteers stand together outside the Township office, behind the words: a food pantry, emergency assistance, door to door transportation and property assessment for residents of Highland Park, Highwood, Lake Forest and Deerfield.",
  es: "Moraine Township, fundado en 1850. El personal y los voluntarios están juntos afuera de la oficina del Township, detrás del texto: una despensa de alimentos, asistencia de emergencia, transporte puerta a puerta y evaluación de propiedades para los residentes de Highland Park, Highwood, Lake Forest y Deerfield.",
  ru: "Moraine Township, основан в 1850 году. Сотрудники и волонтёры стоят вместе у здания администрации, за текстом: продовольственная кладовая, экстренная помощь, транспорт от двери до двери и оценка недвижимости для жителей Хайленд-Парка, Хайвуда, Лейк-Фореста и Дирфилда.",
};
