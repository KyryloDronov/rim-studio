import type { PricingTabId } from "@/content/pricing-tabs";
import type { PageServiceKey } from "@/content/site-pages";
import { AboutSection } from "@/components/AboutSection";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { LoyaltySection } from "@/components/LoyaltySection";
import { ProcessSection } from "@/components/ProcessSection";
import { PricingSection } from "@/components/PricingSection";
import { ShowcaseSection } from "@/components/ShowcaseSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { VisitMapSection } from "@/components/VisitMapSection";

import styles from "./HomePageSections.module.css";

type HomePageSectionsProps = Readonly<{
  /** Service landings — relevant price / work-examples tab first. */
  featuredTab?: PricingTabId;
  excludeShowcasePageKey?: PageServiceKey;
  /** Home — categories masonry replaces the carousel block. */
  hideShowcaseSection?: boolean;
}>;

/**
 * Main page section stack — same order on home and service landings:
 * Home: categories masonry sits under the hero (see `page.tsx`).
 * 1 pricing → 2 work examples → 3 services carousel (landings only) → …
 */
export function HomePageSections({
  featuredTab,
  excludeShowcasePageKey,
  hideShowcaseSection = false,
}: HomePageSectionsProps = {}) {
  return (
    <div className={styles.stack}>
      <PricingSection featuredTab={featuredTab} />
      <BeforeAfterSection featuredTab={featuredTab} />
      {hideShowcaseSection ? null : (
        <ShowcaseSection excludePageKey={excludeShowcasePageKey} />
      )}
      <LoyaltySection />
      <AboutSection />
      <ProcessSection />
      <BenefitsSection />
      <TestimonialsSection />
      <VisitMapSection />
    </div>
  );
}

