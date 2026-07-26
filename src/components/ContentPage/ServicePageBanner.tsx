"use client";

import { useMemo } from "react";
import { PageBanner } from "@/components/PageBanner";
import { buildServiceLandingSectionNavItems } from "@/content/section-nav";
import { useLocale } from "@/i18n/LocaleProvider";

type ServicePageBannerProps = Readonly<{
  title: string;
  lead: string;
  eyebrow?: string;
}>;

export function ServicePageBanner({
  title,
  lead,
  eyebrow,
}: ServicePageBannerProps) {
  const { t } = useLocale();
  const sectionNavItems = useMemo(
    () => buildServiceLandingSectionNavItems(t),
    [t],
  );

  return (
    <PageBanner
      title={title}
      lead={lead}
      eyebrow={eyebrow}
      sectionNavItems={sectionNavItems}
    />
  );
}
