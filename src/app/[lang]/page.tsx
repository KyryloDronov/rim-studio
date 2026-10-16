import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeHero } from "@/components/Hero/HomeHero";
import { HomePageSections } from "@/components/HomePageSections";
import { getSeoCopy } from "@/i18n/seo";
import { isLocale } from "@/i18n/types";
import { buildPageMetadata } from "@/lib/seo-metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return buildPageMetadata(lang, "/", { seo: getSeoCopy(lang).home });
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <>
      <HomeHero />
      <HomePageSections hideShowcaseSection />
    </>
  );
}
