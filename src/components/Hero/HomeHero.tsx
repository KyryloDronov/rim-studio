"use client";

import { useMemo } from "react";
import { buildHomeSectionNavItems } from "@/content/section-nav";
import { SERVICE_CATEGORIES_SECTION_ID } from "@/components/ServiceCategoriesMasonry";
import { useLocale } from "@/i18n/LocaleProvider";
import { Hero } from "./index";

export function HomeHero() {
  const { t } = useLocale();
  const sectionNavItems = useMemo(
    () => buildHomeSectionNavItems(t),
    [t],
  );
  return (
    <Hero
      sectionNavItems={sectionNavItems}
      serviceBanner={t.hero.banner}
      scrollTargetSectionId={SERVICE_CATEGORIES_SECTION_ID}
    />
  );
}
