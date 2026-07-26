import type { ProductCard } from "@/components/ProductCards";
import type { Dictionary } from "@/i18n/types";
import { ABOUT_SECTION_ID } from "@/components/AboutSection";
import { BEFORE_AFTER_SECTION_ID } from "@/components/BeforeAfterSection";
import { BENEFITS_SECTION_ID } from "@/components/BenefitsSection";
import { LOYALTY_SECTION_ID } from "@/components/LoyaltySection";
import { PRICING_SECTION_ID } from "@/components/PricingSection";
import { PROCESS_SECTION_ID } from "@/components/ProcessSection";
import { SHOWCASE_SECTION_ID } from "@/components/ShowcaseSection";
import { TESTIMONIALS_SECTION_ID } from "@/components/TestimonialsSection";

/** One entry in the page banner «section stack» — maps to `id` on a `<section>`. */
export type PageSectionNavItem = Readonly<{
  sectionId: string;
  title: string;
  gradient: string;
  image?: string;
}>;

/** Visual palette for section nav cards (same glassy fan-out as legacy showcase cards). */
export const SECTION_NAV_GRADIENTS: readonly string[] = [
  "linear-gradient(140deg, #ff9900 0%, #cc7a00 50%, #191f24 100%)",
  "linear-gradient(140deg, #5d7183 0%, #333e48 60%, #191f24 100%)",
  "linear-gradient(140deg, #ffc266 0%, #ff9900 45%, #485865 100%)",
  "linear-gradient(140deg, #485865 0%, #262e36 55%, #ff9900 110%)",
  "linear-gradient(140deg, #333e48 0%, #191f24 45%, #ff9900 100%)",
  "linear-gradient(140deg, #262e36 0%, #485865 70%, #ffc266 110%)",
  "linear-gradient(140deg, #cc7a00 0%, #5d7183 55%, #191f24 100%)",
  "linear-gradient(140deg, #191f24 0%, #485865 40%, #ff9900 95%)",
];

export function sectionNavItemsToProductCards(
  items: ReadonlyArray<PageSectionNavItem>,
): ReadonlyArray<ProductCard> {
  return items.map((item) => ({
    id: item.sectionId,
    title: item.title,
    href: `#${item.sectionId}`,
    gradient: item.gradient,
    image: item.image,
  }));
}

function withGradients(
  entries: ReadonlyArray<Pick<PageSectionNavItem, "sectionId" | "title">>,
): PageSectionNavItem[] {
  return entries.map((entry, index) => ({
    ...entry,
    gradient:
      SECTION_NAV_GRADIENTS[index % SECTION_NAV_GRADIENTS.length] ??
      SECTION_NAV_GRADIENTS[0],
  }));
}

/** Home — same order as `HomePageSections`. */
export function buildHomeSectionNavItems(
  t: Dictionary,
): ReadonlyArray<PageSectionNavItem> {
  const { sectionNav } = t;
  return withGradients([
    { sectionId: PRICING_SECTION_ID, title: sectionNav.pricing },
    { sectionId: BEFORE_AFTER_SECTION_ID, title: sectionNav.beforeAfter },
    { sectionId: SHOWCASE_SECTION_ID, title: sectionNav.showcase },
    { sectionId: LOYALTY_SECTION_ID, title: sectionNav.loyalty },
    { sectionId: ABOUT_SECTION_ID, title: sectionNav.about },
    { sectionId: PROCESS_SECTION_ID, title: sectionNav.process },
    { sectionId: BENEFITS_SECTION_ID, title: sectionNav.benefits },
    { sectionId: TESTIMONIALS_SECTION_ID, title: sectionNav.testimonials },
  ]);
}

export const SERVICE_SHOWCASE_SECTION_ID = "service-showcase";

/** Service landings — sections rendered by `ServiceLandingPage` after the banner. */
export function buildServiceLandingSectionNavItems(
  t: Dictionary,
): ReadonlyArray<PageSectionNavItem> {
  const { sectionNav } = t;
  return withGradients([
    { sectionId: BEFORE_AFTER_SECTION_ID, title: sectionNav.beforeAfter },
    {
      sectionId: SERVICE_SHOWCASE_SECTION_ID,
      title: sectionNav.showcase,
    },
  ]);
}
