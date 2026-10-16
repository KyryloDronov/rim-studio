import {
  STUDIO_ADDRESS_LINE1,
  STUDIO_ADDRESS_LINE2,
  STUDIO_COORDINATES,
  STUDIO_EMAIL,
  STUDIO_PHONE_E164,
  STUDIO_PUBLIC_SITE_URL,
} from "@/content/studio-location";
import { LOCALE_BCP47, type Locale } from "@/i18n/types";

type SiteJsonLdProps = Readonly<{
  locale: Locale;
}>;

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function SiteJsonLd({ locale }: SiteJsonLdProps) {
  const siteUrl = STUDIO_PUBLIC_SITE_URL;
  const postalCode = STUDIO_ADDRESS_LINE2.split(" ")[0] ?? "05-800";
  const locality = STUDIO_ADDRESS_LINE2.replace(/^\d{2}-\d{3}\s*/, "");

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${siteUrl}/#localbusiness`,
    name: "Rim Studio",
    url: siteUrl,
    telephone: STUDIO_PHONE_E164,
    email: STUDIO_EMAIL,
    image: [],
    address: {
      "@type": "PostalAddress",
      streetAddress: STUDIO_ADDRESS_LINE1,
      addressLocality: locality,
      postalCode,
      addressCountry: "PL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: STUDIO_COORDINATES.lat,
      longitude: STUDIO_COORDINATES.lng,
    },
    areaServed: {
      "@type": "City",
      name: "Warszawa",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    priceRange: "$$",
    inLanguage: LOCALE_BCP47[locale],
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Rim Studio",
    url: siteUrl,
    inLanguage: ["pl-PL", "ru-RU"],
    publisher: { "@id": `${siteUrl}/#localbusiness` },
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Rim Studio",
    url: siteUrl,
    email: STUDIO_EMAIL,
    telephone: STUDIO_PHONE_E164,
    address: localBusiness.address,
    sameAs: [
      "https://www.instagram.com/rimstudio.pl/",
      "https://www.facebook.com/profile.php?id=61594582464185",
    ],
  };

  return (
    <>
      <JsonLdScript data={localBusiness} />
      <JsonLdScript data={organization} />
      <JsonLdScript data={webSite} />
    </>
  );
}
