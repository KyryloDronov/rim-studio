import type { ReactNode } from "react";
import { ShowcaseSection } from "@/components/ShowcaseSection";
import type { PageServiceKey } from "@/content/site-pages";

type ServiceLandingPageProps = Readonly<{
  pageKey: PageServiceKey;
  children: ReactNode;
}>;

/** Shared tail for service landings — related services carousel. */
export function ServiceLandingPage({
  pageKey,
  children,
}: ServiceLandingPageProps) {
  return (
    <>
      {children}
      <ShowcaseSection
        excludePageKey={pageKey}
        sectionId="service-showcase"
      />
    </>
  );
}
