import { notFound } from "next/navigation";
import { HomeHero } from "@/components/Hero/HomeHero";
import { HomePageSections } from "@/components/HomePageSections";
import { isLocale } from "@/i18n/types";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <>
      <HomeHero />
      <HomePageSections />
    </>
  );
}
