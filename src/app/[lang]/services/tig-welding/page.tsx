import { notFound } from "next/navigation";
import { ServiceLandingPage } from "@/components/ServiceLandingPage";
import { isLocale } from "@/i18n/types";
import { buildServiceLandingMetadata } from "@/lib/service-landing-meta";

const PATH = "/services/tig-welding";
const PAGE_KEY = "tigWelding" as const;

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/services/tig-welding">) {
  const { lang } = await params;
  return buildServiceLandingMetadata(lang, PAGE_KEY, PATH);
}

export default async function TigWeldingPage({
  params,
}: PageProps<"/[lang]/services/tig-welding">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <ServiceLandingPage pageKey={PAGE_KEY} />;
}
