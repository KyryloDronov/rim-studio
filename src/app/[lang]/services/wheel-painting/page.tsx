import { notFound } from "next/navigation";
import { ContentPage } from "@/components/ContentPage";
import { ServiceLandingPage } from "@/components/ServiceLandingPage";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/types";
import { buildServiceLandingMetadata } from "@/lib/service-landing-meta";

const PATH = "/services/wheel-painting";
const PAGE_KEY = "wheelPainting" as const;

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/services/wheel-painting">) {
  const { lang } = await params;
  return buildServiceLandingMetadata(lang, PAGE_KEY, PATH);
}

export default async function WheelPaintingPage({
  params,
}: PageProps<"/[lang]/services/wheel-painting">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const { pages } = getDictionary(lang);
  const copy = pages.services[PAGE_KEY];

  return (
    <ServiceLandingPage pageKey={PAGE_KEY}>
      <ContentPage title={copy.title} lead={copy.lead} />
    </ServiceLandingPage>
  );
}
