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

import styles from "./HomePageSections.module.css";

type HomePageSectionsProps = Readonly<{
  /** Service landings — relevant price / work-examples tab first. */
  featuredTab?: PricingTabId;
  excludeShowcasePageKey?: PageServiceKey;
}>;

/**
 * Main page section stack — same order on home and service landings:
 * 1 pricing → 2 work examples → 3 services → 4 loyalty → 5 about →
 * 6 process → 7 benefits → 8 testimonials.
 */
export function HomePageSections({
  featuredTab,
  excludeShowcasePageKey,
}: HomePageSectionsProps = {}) {
  return (
    <div className={styles.stack}>
      <PricingSection featuredTab={featuredTab} />
      <BeforeAfterSection featuredTab={featuredTab} />
      <ShowcaseSection excludePageKey={excludeShowcasePageKey} />
      <LoyaltySection />
      <AboutSection />
      <ProcessSection />
      <BenefitsSection />
      <TestimonialsSection />
    </div>
  );
}

