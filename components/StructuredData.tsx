import { LINKS, SITE_URL, TOWNSHIP } from "@/lib/township";
import { LOCALE_TAGS, localePath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

/**
 * GovernmentOrganization JSON-LD. This is what lets a search engine or an
 * assistant answer "what are the Moraine Township food pantry hours" with the
 * real answer instead of a guess, which is exactly the outcome the Supervisor
 * approved on the call.
 */
export function StructuredData({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: TOWNSHIP.name,
    alternateName: "Moraine Township, Lake County, Illinois",
    url: `${SITE_URL}${localePath(locale, "/")}`,
    foundingDate: String(TOWNSHIP.established),
    slogan: TOWNSHIP.tagline,
    inLanguage: Object.values(LOCALE_TAGS),
    address: {
      "@type": "PostalAddress",
      streetAddress: TOWNSHIP.address.street,
      addressLocality: TOWNSHIP.address.city,
      addressRegion: TOWNSHIP.address.state,
      postalCode: TOWNSHIP.address.zip,
      addressCountry: "US",
    },
    telephone: TOWNSHIP.phone.main,
    email: TOWNSHIP.email.info,
    faxNumber: TOWNSHIP.fax.main,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Moraine Township",
      description: `Includes ${TOWNSHIP.geography.municipalities}.`,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "16:30",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "General office",
        telephone: TOWNSHIP.phone.main,
        email: TOWNSHIP.email.info,
        availableLanguage: ["English", "Spanish", "Russian"],
      },
      {
        "@type": "ContactPoint",
        contactType: "Door-to-door transportation",
        telephone: TOWNSHIP.phone.transportation,
      },
      {
        "@type": "ContactPoint",
        contactType: "Assessor",
        telephone: TOWNSHIP.phone.assessor,
        email: TOWNSHIP.email.assessor,
      },
    ],
    subOrganization: {
      "@type": "NGO",
      name: TOWNSHIP.charitableFund.legalName,
      taxID: TOWNSHIP.charitableFund.ein,
      description:
        "IRS 501(c)(3) charitable organization supporting the Moraine Township Food Pantry and emergency assistance for residents in need.",
    },
    sameAs: [LINKS.mentalHealthBoard],
  };

  return (
    <script
      type="application/ld+json"
      // The payload is built from constants in this repo, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
