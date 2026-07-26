import {
  Bike,
  CalendarClock,
  CircleDot,
  Crosshair,
  Flame,
  Gauge,
  Gem,
  Info,
  Palette,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  SunSnow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/** Stable ids for service hero highlights — resolved in the Hero component. */
export type ServiceHeroBannerIconId =
  | "circleDot"
  | "shieldCheck"
  | "crosshair"
  | "sunSnow"
  | "calendarClock"
  | "info"
  | "gauge"
  | "flame"
  | "sparkles"
  | "shieldBadge"
  | "gem"
  | "wrench"
  | "search"
  | "settings"
  | "bike"
  | "sun"
  | "palette";

export const SERVICE_HERO_BANNER_ICONS: Record<
  ServiceHeroBannerIconId,
  LucideIcon
> = {
  circleDot: CircleDot,
  shieldCheck: ShieldCheck,
  crosshair: Crosshair,
  sunSnow: SunSnow,
  calendarClock: CalendarClock,
  info: Info,
  gauge: Gauge,
  flame: Flame,
  sparkles: Sparkles,
  shieldBadge: ShieldCheck,
  gem: Gem,
  wrench: Wrench,
  search: Search,
  settings: Settings,
  bike: Bike,
  sun: Sun,
  palette: Palette,
};
