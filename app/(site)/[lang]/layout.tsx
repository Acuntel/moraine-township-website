import type { Metadata, Viewport } from "next";
import { Inter, Libre_Franklin, Merriweather, PT_Serif } from "next/font/google";
import { notFound } from "next/navigation";
import "../../globals.css";

/**
 * Neither Libre Franklin nor Merriweather ships Cyrillic, so the Russian pages
 * would silently drop to a system font. Each is paired with a Cyrillic-capable
 * face of the same character, and the browser picks per glyph.
 *
 * Libre Franklin is the metrically compatible stand-in for the Brand Kit's ITC
 * Franklin Gothic. Merriweather is the mock's display face.
 */
const franklin = Libre_Franklin({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-franklin",
});

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  display: "swap",
  variable: "--font-franklin-cyrillic",
});

const merriweather = Merriweather({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-merriweather",
});

const ptSerif = PT_Serif({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-merriweather-cyrillic",
});
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DonateButton } from "@/components/DonateButton";
import { LeadCapture } from "@/components/CallButton";
import { DonationReturnWatcher } from "@/components/DonationWelcomeBack";
import { StructuredData } from "@/components/StructuredData";
import { getDictionary } from "@/content";
import { LOCALES, LOCALE_TAGS, isLocale } from "@/lib/i18n";
import { SITE_URL, TOWNSHIP } from "@/lib/township";

export const viewport: Viewport = {
  themeColor: "#01A667",
  width: "device-width",
  initialScale: 1,
  // Pinch-zoom is how many low-vision readers use a site. Capping it below 5x
  // fails WCAG 1.4.4, so it is deliberately left open.
  maximumScale: 5,
};

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  if (!isLocale(params.lang)) return {};
  const dict = getDictionary(params.lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.home.title,
      template: `%s | ${TOWNSHIP.name}`,
    },
    description: dict.home.description,
    // iOS ignores SVG favicons entirely, so the home-screen bookmark needs a
    // real bitmap or it falls back to a screenshot of the page.
    icons: { icon: "/favicon.svg", apple: "/apple-icon.png" },
    openGraph: {
      siteName: TOWNSHIP.name,
      locale: LOCALE_TAGS[params.lang].replace("-", "_"),
      type: "website",
    },
  };
}

export default function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const locale = params.lang;
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      dir="ltr"
      className={`${franklin.variable} ${inter.variable} ${merriweather.variable} ${ptSerif.variable}`}
    >
      <head>
        <StructuredData locale={locale} />
      </head>
      <body className="flex min-h-screen flex-col">
        {/* First thing in the tab order, so a keyboard user can jump the nav. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-teal-dark focus:px-5 focus:py-3 focus:font-bold focus:text-white"
        >
          {dict.common.skipToContent}
        </a>

        <Header locale={locale} dict={dict} />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer locale={locale} dict={dict} />

        <DonateButton
          label={dict.common.donateShort}
          ariaLabel={dict.common.donateAria}
          externalNote={dict.common.externalLinkNote}
          variant="floating"
        />
        <LeadCapture copy={dict.leadCapture} />
        <DonationReturnWatcher locale={locale} />
      </body>
    </html>
  );
}
