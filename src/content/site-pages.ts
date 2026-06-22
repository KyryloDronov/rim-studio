import type { PricingTabId } from "@/content/pricing-tabs";
import type { Dictionary } from "@/i18n/types";

export type MenuServiceKey = keyof Dictionary["menu"]["services"];
export type MenuStudioKey = keyof Dictionary["menu"]["studio"];
export type PageServiceKey = keyof Dictionary["pages"]["services"];

/** Menu + sitemap registry. Each `href` maps to its own route folder under `app/[lang]/services/`. */
export const MENU_SERVICE_LINKS: ReadonlyArray<
  Readonly<{
    href: string;
    menuKey: MenuServiceKey;
    pageKey: PageServiceKey;
    pricingTab: PricingTabId;
  }>
> = [
  {
    href: "/services/wheel-painting",
    menuKey: "wheelPainting",
    pageKey: "wheelPainting",
    pricingTab: "paint",
  },
  {
    href: "/services/tire-mounting",
    menuKey: "tireMounting",
    pageKey: "tireMounting",
    pricingTab: "tire",
  },
  {
    href: "/services/wheel-repair",
    menuKey: "wheelRepair",
    pageKey: "wheelRepair",
    pricingTab: "repair",
  },
  {
    href: "/services/caliper-painting",
    menuKey: "caliperPainting",
    pageKey: "caliperPainting",
    pricingTab: "caliper",
  },
  {
    href: "/services/diamond-cutting",
    menuKey: "diamondCutting",
    pageKey: "diamondCutting",
    pricingTab: "diamond",
  },
  {
    href: "/services/motorcycle-wheel-painting",
    menuKey: "motorcycleWheelPainting",
    pageKey: "motorcycleWheelPainting",
    pricingTab: "motorcycle",
  },
  {
    href: "/services/tig-welding",
    menuKey: "tigWelding",
    pageKey: "tigWelding",
    pricingTab: "tig",
  },
];

export const MENU_STUDIO_LINKS: ReadonlyArray<
  Readonly<{ href: string; menuKey: MenuStudioKey }>
> = [
  { href: "/about", menuKey: "about" },
  { href: "/contact", menuKey: "contact" },
];

export const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/contact",
  ...MENU_SERVICE_LINKS.map((item) => item.href),
] as const;
