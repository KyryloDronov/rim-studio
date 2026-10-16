import type { ConsultationSourceId } from "@/content/consultation-sources";
import {
  MENU_SERVICE_LINKS,
  type PageServiceKey,
} from "@/content/site-pages";

/** Site area the user was on when submitting (not the CTA block). */
export type ConsultationPageId = "home" | PageServiceKey;

const PAGE_SERVICE_KEYS: ReadonlySet<string> = new Set(
  MENU_SERVICE_LINKS.map((item) => item.pageKey),
);

export function isConsultationPageId(
  value: string,
): value is ConsultationPageId {
  return value === "home" || PAGE_SERVICE_KEYS.has(value);
}

export function resolveConsultationPageFromPath(
  pathname: string,
): ConsultationPageId {
  const path = pathname.replace(/^\/(ru|pl)(?=\/|$)/, "") || "/";
  const normalized = path.endsWith("/") && path.length > 1
    ? path.slice(0, -1)
    : path;

  if (normalized === "/" || normalized === "") {
    return "home";
  }

  for (const link of MENU_SERVICE_LINKS) {
    if (
      normalized === link.href ||
      normalized.startsWith(`${link.href}/`)
    ) {
      return link.pageKey;
    }
  }

  return "home";
}

const TELEGRAM_PAGE_LABELS_RU: Record<ConsultationPageId, string> = {
  home: "Главная страница",
  wheelPainting: "Покраска дисков",
  wheelRepair: "Ремонт дисков",
  diamondCutting: "Алмазная проточка",
  tireMounting: "Шиномонтаж",
  caliperPainting: "Покраска суппортов",
  motorcycleWheelPainting: "Покраска мото-дисков",
  tigWelding: "Аргонная сварка (TIG)",
};

const TELEGRAM_SECTION_LABELS_RU: Record<
  Exclude<ConsultationSourceId, PageServiceKey | "home">,
  string
> = {
  benefits: "Наши преимущества",
  process: "Как проходит работа",
  about: "О студии",
  beforeAfter: "До / после",
  firstVisitPromo: "Скидка на первый визит",
  visitMap: "Запись и контакты (карта)",
  contactSheet: "Контакты (шторка)",
  contactPage: "Страница контактов",
};

const BANNER_SOURCE_IDS: ReadonlySet<ConsultationSourceId> = new Set([
  "home",
  ...(MENU_SERVICE_LINKS.map((item) => item.pageKey) as ConsultationSourceId[]),
]);

export function resolveTelegramLeadLabels(
  source: ConsultationSourceId,
  page: ConsultationPageId,
): Readonly<{ pageLabel: string; sectionLabel: string }> {
  if (BANNER_SOURCE_IDS.has(source)) {
    const bannerPage =
      source === "home" ? "home" : (source as ConsultationPageId);
    return {
      pageLabel: TELEGRAM_PAGE_LABELS_RU[bannerPage],
      sectionLabel: "Баннер",
    };
  }

  return {
    pageLabel: TELEGRAM_PAGE_LABELS_RU[page],
    sectionLabel:
      TELEGRAM_SECTION_LABELS_RU[
        source as keyof typeof TELEGRAM_SECTION_LABELS_RU
      ] ?? source,
  };
}
