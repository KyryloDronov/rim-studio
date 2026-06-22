import { notFound } from "next/navigation";
import { AboutSection } from "@/components/AboutSection";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { Hero } from "@/components/Hero";
import { LoyaltySection } from "@/components/LoyaltySection";
import { ProcessSection } from "@/components/ProcessSection";
import { PricingSection } from "@/components/PricingSection";
import { ShowcaseSection } from "@/components/ShowcaseSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
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
      <AboutSection />
      <ProcessSection />
      <BenefitsSection />
      <LoyaltySection />
      <TestimonialsSection />
    </>
  );
}
