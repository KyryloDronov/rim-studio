import { notFound } from "next/navigation";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { Hero } from "@/components/Hero";
import { PricingSection } from "@/components/PricingSection";
import { ShowcaseSection } from "@/components/ShowcaseSection";
import { isLocale } from "@/i18n/types";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <>
      <Hero />
      <PricingSection />
      <ShowcaseSection />
      <BeforeAfterSection />
      <BenefitsSection />
    </>
  );
}
