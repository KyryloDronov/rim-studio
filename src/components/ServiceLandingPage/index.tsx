import type { ReactNode } from "react";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { ShowcaseSection } from "@/components/ShowcaseSection";
import { MENU_SERVICE_LINKS, type PageServiceKey } from "@/content/site-pages";

type ServiceLandingPageProps = Readonly<{
  pageKey: PageServiceKey;
  children: ReactNode;
}>;

/** Shared tail for service landings — related services carousel. */
export function ServiceLandingPage({
  pageKey,
  children,
}: ServiceLandingPageProps) {
  const featuredTab =
    MENU_SERVICE_LINKS.find((item) => item.pageKey === pageKey)?.pricingTab ??
    "paint";

  return (
    <>
      {children}
      <BeforeAfterSection featuredTab={featuredTab} />
      <ShowcaseSection
        excludePageKey={pageKey}
        sectionId="service-showcase"
      />
    </>
  );
}
