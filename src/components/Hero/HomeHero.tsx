"use client";

import { useMemo } from "react";
import { buildHomeSectionNavItems } from "@/content/section-nav";
import { useLocale } from "@/i18n/LocaleProvider";
import { Hero } from "./index";

export function HomeHero() {
  const { t } = useLocale();
  const sectionNavItems = useMemo(
    () => buildHomeSectionNavItems(t),
    [t],
  );
  return <Hero sectionNavItems={sectionNavItems} />;
}
