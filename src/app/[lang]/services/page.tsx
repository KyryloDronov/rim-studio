import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceCategoriesMasonry } from "@/components/ServiceCategoriesMasonry";
import { getSeoCopy } from "@/i18n/seo";
import { isLocale } from "@/i18n/types";
import { buildPageMetadata } from "@/lib/seo-metadata";

const PATH = "/services";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/services">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return buildPageMetadata(lang, PATH, {
    seo: getSeoCopy(lang).servicesIndex,
  });
}

export default async function ServicesIndexPage({
  params,
}: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <ServiceCategoriesMasonry variant="page" />;
}
