/**
 * Registered studio address (maps, footer, contact, JSON-LD `PostalAddress`).
 * Copy and SEO still lead with Warszawa / Варшава as the service market.
 */
export const STUDIO_ADDRESS_LINE1 = "ul. Inwestycyjna 9";
export const STUDIO_ADDRESS_LINE2 = "05-800 Pruszków";
export const STUDIO_ADDRESS_COUNTRY = "Polska";
export const STUDIO_ADDRESS_FULL = `${STUDIO_ADDRESS_LINE1}, ${STUDIO_ADDRESS_LINE2}`;

/** Map pin — ul. Inwestycyjna 9, 05-800 Pruszków (OSM). */
export const STUDIO_COORDINATES = {
  lng: 20.8130378,
  lat: 52.1924159,
} as const;

export const STUDIO_PHONE_E164 = "+48786444468";
export const STUDIO_PHONE_DISPLAY = "+48 786 444 468";
export const STUDIO_PHONE_HREF = `tel:${STUDIO_PHONE_E164}`;
export const STUDIO_EMAIL = "hello@rim-studio.pl";

/** Production site — used when `NEXT_PUBLIC_SITE_URL` is unset. */
export const STUDIO_PUBLIC_SITE_URL = "https://rim-studio.pl";

export function getPublicSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    STUDIO_PUBLIC_SITE_URL
  );
}

export const STUDIO_INSTAGRAM_USERNAME = "rimstudio.pl";

export const STUDIO_SOCIAL = {
  instagram: "https://www.instagram.com/rimstudio.pl/",
  facebook: "https://www.facebook.com/profile.php?id=61594582464185",
} as const;

/** Opens WhatsApp chat with the studio number. */
export const STUDIO_WHATSAPP_HREF = `https://wa.me/${STUDIO_PHONE_E164.replace(/\D/g, "")}`;

/** Opens Instagram direct message thread (mobile app or web). */
export const STUDIO_INSTAGRAM_DM_HREF = `https://ig.me/m/${STUDIO_INSTAGRAM_USERNAME}`;

export function buildGoogleDirectionsUrl(
  lat: number,
  lng: number,
): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

export function getMapboxAccessToken(): string | undefined {
  return process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN?.trim() || undefined;
}
