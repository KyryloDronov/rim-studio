import type { PageServiceKey } from "@/content/site-pages";

export type SeoPageCopy = Readonly<{
  /** Document `<title>` (home uses full string; inner pages use with layout template). */
  title: string;
  description: string;
  keywords: ReadonlyArray<string>;
}>;

export type SeoCopy = Readonly<{
  home: SeoPageCopy;
  about: SeoPageCopy;
  contact: SeoPageCopy;
  privacy: SeoPageCopy;
  terms: SeoPageCopy;
  /** Hub `/services` — all service category cards. */
  servicesIndex: SeoPageCopy;
  services: Readonly<Record<PageServiceKey, SeoPageCopy>>;
}>;
