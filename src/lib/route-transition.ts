/** Shared route-transition timing (aligned with preloader phases 1–3). */

/** Phase 0 — dark circle from click point to full viewport. */
export const ROUTE_COVER_DURATION_S = 0.58;

/** Phase 1 — shortened preloader bar + char roll on the covered plate. */
export const ROUTE_BAR_FILL_DURATION_S =
  0.22 + 0.32 + 0.32 + 0.28 + 0.26;
export const ROUTE_BAR_HOLD_S = 0.35;

export const routeCharStaggerAmount = (): number =>
  ROUTE_BAR_FILL_DURATION_S * 0.26;

export const routeCharRollDuration = (): number =>
  ROUTE_BAR_FILL_DURATION_S - routeCharStaggerAmount();

/** Phase 2 — pill → centred circle (matches preloader cutout morph). */
export const ROUTE_TEXT_FADE_S = 0.3;
export const ROUTE_MORPH_DURATION_S = 0.6;
export const ROUTE_MORPH_TARGET_SIZE = "8vmin";

/** Phase 3 — circle window expands past the viewport. */
export const ROUTE_REVEAL_DURATION_S = 0.9;
export const ROUTE_REVEAL_CONTENT_RATIO = 0.8;
export const ROUTE_REVEAL_TARGET_SIZE = "300vmax";
export const ROUTE_REVEAL_PLATE_FADE_S = 0.25;

export function computeCoverRadiusPx(
  originX: number,
  originY: number,
  viewportWidth: number,
  viewportHeight: number,
): number {
  const corners = [
    [0, 0],
    [viewportWidth, 0],
    [0, viewportHeight],
    [viewportWidth, viewportHeight],
  ] as const;
  let max = 0;
  for (const [cx, cy] of corners) {
    const d = Math.hypot(cx - originX, cy - originY);
    if (d > max) max = d;
  }
  return max + 48;
}

export function normalizePathname(path: string): string {
  if (!path) return "/";
  const withoutQuery = path.split("?")[0]?.split("#")[0] ?? path;
  if (withoutQuery.length > 1 && withoutQuery.endsWith("/")) {
    return withoutQuery.slice(0, -1);
  }
  return withoutQuery || "/";
}

export function isModifiedClick(event: MouseEvent): boolean {
  return (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );
}

export function shouldSkipRouteTransition(anchor: HTMLAnchorElement): boolean {
  if (anchor.dataset.noRouteTransition !== undefined) return true;
  if (anchor.target === "_blank") return true;
  if (anchor.hasAttribute("download")) return true;

  const href = anchor.getAttribute("href");
  if (!href) return true;
  if (href.startsWith("#")) return true;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return true;

  return false;
}
