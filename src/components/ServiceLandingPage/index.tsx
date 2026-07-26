import { HomePageSections } from "@/components/HomePageSections";
import { ServiceHero } from "@/components/Hero/ServiceHero";
import { MENU_SERVICE_LINKS, type PageServiceKey } from "@/content/site-pages";

type ServiceLandingPageProps = Readonly<{
  pageKey: PageServiceKey;
}>;

/** Service landing — home hero + full home section stack with category tabs. */
export function ServiceLandingPage({ pageKey }: ServiceLandingPageProps) {
  const featuredTab =
    MENU_SERVICE_LINKS.find((item) => item.pageKey === pageKey)?.pricingTab ??
    "paint";

  return (
    <>
      <ServiceHero pageKey={pageKey} />
      <HomePageSections
        featuredTab={featuredTab}
        excludeShowcasePageKey={pageKey}
      />
    </>
  );
}
