import { MENU_SERVICE_LINKS, type PageServiceKey } from "@/content/site-pages";
import { getShowcaseCategoryMedia } from "@/content/showcase-category-media";
import type { Dictionary } from "@/i18n/types";
import { localizedPath } from "@/i18n/paths";
import type { Locale } from "@/i18n/types";

export type ShowcaseServiceCard = Readonly<{
  id: PageServiceKey;
  href: string;
  image: string;
  video: string;
  videoReverse: string;
  category: string;
  title: string;
  linkLabel: string;
}>;

export function resolveShowcaseServiceCards(
  locale: Locale,
  cards: Dictionary["showcase"]["cards"],
  excludePageKey?: PageServiceKey,
): ReadonlyArray<ShowcaseServiceCard> {
  return MENU_SERVICE_LINKS.filter((item) => item.pageKey !== excludePageKey).map(
    (item) => {
      const media = getShowcaseCategoryMedia(item.pageKey);
      return {
        id: item.pageKey,
        href: localizedPath(locale, item.href),
        image: media.image,
        video: media.video,
        videoReverse: media.videoReverse,
        ...cards[item.pageKey],
      };
    },
  );
}
