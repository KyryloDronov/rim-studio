import type { Locale } from "@/i18n/types";
import type { PageServiceKey } from "@/content/site-pages";

import faqPl from "@/content/service-faq.pl.json";
import faqRu from "@/content/service-faq.ru.json";

export type ServiceFaqItem = Readonly<{
  id: string;
  question: string;
  answer: string;
}>;

type ServiceFaqPack = Record<PageServiceKey, ReadonlyArray<ServiceFaqItem>>;

const FAQ_BY_LOCALE: Record<Locale, ServiceFaqPack> = {
  ru: faqRu as ServiceFaqPack,
  pl: faqPl as ServiceFaqPack,
};

export function getServiceFaqItems(
  locale: Locale,
  pageKey: PageServiceKey,
): ReadonlyArray<ServiceFaqItem> {
  return FAQ_BY_LOCALE[locale][pageKey] ?? [];
}
