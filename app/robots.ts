import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/township";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The admin panel and the thank-you page have nothing to offer search.
        disallow: [
          "/admin",
          "/api/",
          "/thank-you",
          "/es/thank-you",
          "/ru/thank-you",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
