import type { MetadataRoute } from "next";
import { DEFAULT_LOCALE, LOCALES, LOCALE_TAGS, localePath } from "@/lib/i18n";
import { SITE_URL } from "@/lib/township";
import { HISTORY_SLUGS } from "@/content/histories";

const ROUTES = [
  "/",
  "/about",
  "/services",
  "/food-pantry",
  "/assessor",
  "/transportation",
  "/board-meetings",
  "/cemeteries",
  ...HISTORY_SLUGS.map((slug) => `/cemeteries/${slug}`),
  "/programs",
  "/get-involved",
  "/donate",
  "/foia",
  "/contact",
  "/accessibility",
  "/news",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return LOCALES.flatMap((locale) =>
    ROUTES.map((route) => {
      const languages: Record<string, string> = {};
      for (const l of LOCALES) {
        languages[LOCALE_TAGS[l]] = `${SITE_URL}${localePath(l, route)}`;
      }
      languages["x-default"] =
        `${SITE_URL}${localePath(DEFAULT_LOCALE, route)}`;

      return {
        url: `${SITE_URL}${localePath(locale, route)}`,
        lastModified,
        changeFrequency:
          route === "/" ? ("daily" as const) : ("monthly" as const),
        priority: route === "/" ? 1 : 0.7,
        alternates: { languages },
      };
    }),
  );
}
