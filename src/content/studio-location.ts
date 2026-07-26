/** Studio pin on the contact sheet map (Warsaw — matches site copy). */
export const STUDIO_COORDINATES = {
  lng: 21.012229,
  lat: 52.229676,
} as const;

export const STUDIO_PHONE_E164 = "+48000000000";
export const STUDIO_PHONE_DISPLAY = "+48 000 000 000";
export const STUDIO_EMAIL = "hello@rim.studio";

export const STUDIO_SOCIAL = {
  instagram: "https://instagram.com/rim.studio",
  x: "https://x.com/rimstudio",
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
