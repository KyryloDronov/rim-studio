/** Studio pin on the contact sheet map (Warsaw — matches site copy). */
export const STUDIO_COORDINATES = {
  lng: 21.012229,
  lat: 52.229676,
} as const;

export const STUDIO_PHONE_E164 = "+48786444468";
export const STUDIO_PHONE_DISPLAY = "+48 786 444 468";
export const STUDIO_PHONE_HREF = `tel:${STUDIO_PHONE_E164}`;
export const STUDIO_EMAIL = "hello@rim.studio";

export const STUDIO_SOCIAL = {
  instagram: "https://www.instagram.com/rimstudio.pl/",
  facebook: "https://www.facebook.com/profile.php?id=61594582464185",
} as const;

export function buildGoogleDirectionsUrl(
  lat: number,
  lng: number,
): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

export function getMapboxAccessToken(): string | undefined {
  return process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN?.trim() || undefined;
}
