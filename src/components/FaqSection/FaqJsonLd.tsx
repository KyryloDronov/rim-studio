import type { ServiceFaqItem } from "@/content/service-faq";

type FaqJsonLdProps = Readonly<{
  items: ReadonlyArray<ServiceFaqItem>;
}>;

export function FaqJsonLd({ items }: FaqJsonLdProps) {
  if (!items.length) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
