"use client";

import { useMemo } from "react";
import type { PageServiceKey } from "@/content/site-pages";
import { getHeroBackgroundVideo } from "@/content/hero-background-videos";
import { buildHomeSectionNavItems } from "@/content/section-nav";
import { useLocale } from "@/i18n/LocaleProvider";
import { Hero } from "./index";

type ServiceHeroProps = Readonly<{
  pageKey: PageServiceKey;
}>;

export function ServiceHero({ pageKey }: ServiceHeroProps) {
  const { t } = useLocale();
  const copy = t.pages.services[pageKey];
  const sectionNavItems = useMemo(
    () => buildHomeSectionNavItems(t),
    [t],
  );
  const backgroundVideoSrc = useMemo(
    () => getHeroBackgroundVideo(pageKey),
    [pageKey],
  );

  return (
    <Hero
      sectionNavItems={sectionNavItems}
      serviceBanner={copy.banner}
      backgroundVideoSrc={backgroundVideoSrc}
      headline={
        copy.banner
          ? undefined
          : { title: copy.title, lede: copy.lead }
      }
    />
  );
}
