import type { Dictionary } from "../types";

export const ru: Dictionary = {
  meta: {
    title: "rim/studio — Креативная студия",
    description:
      "rim/studio — креативная студия, создающая сайты, бренды и интерактивные продукты.",
    siteName: "rim/studio",
  },
  header: {
    menu: "Меню",
    close: "Закрыть",
    contact: "Поговорим",
  },
  menu: {
    home: "Главная",
    work: "Работы",
    lab: "Лаб",
  },
  hero: {
    titleStart: "Реставрация и покраска",
    titleEnd: "дисков",
    titleHighlight: "в Варшаве",
    lede: "Восстановим диски до состояния новых без покупки новых. Чисто, ровно и в срок.",
    features: [
      {
        id: "warranty",
        icon: "shield",
        label: "Гарантия",
        value: "до 12 мес.",
      },
      {
        id: "time",
        icon: "clock",
        label: "Сроки",
        value: "1–3 дня",
      },
      {
        id: "payment",
        icon: "wallet",
        label: "Оплата",
        value: "Без предоплаты",
      },
    ],
    ctaPrimary: { label: "Отправить фото дисков", href: "/contact" },
    photoModal: {
      title: "Фото ваших дисков",
      body: "Сделайте несколько снимков колёс при дневном свете и отправьте их нам — по фото оценим состояние и предложим варианты реставрации и покраски.",
      submitLabel: "Отправить",
    },
    ctaSecondary: { label: "Позвонить", href: "tel:+48000000000" },
    recentWorksLabel: "Недавние работы",
    scrollHint: "Листайте",
  },
  footer: {
    addressLines: ["Варшава, Польша", "hello@rim.studio"],
    columnStudio: "Студия",
    columnServices: "Услуги",
    columnLegal: "Правовое",
    studioLinks: {
      about: "О нас",
      process: "Процесс",
      contact: "Контакты",
    },
    serviceItems: [
      { href: "/services/wheel-painting", label: "Покраска дисков" },
      { href: "/services/wheel-repair", label: "Ремонт дисков" },
      {
        href: "/services/diamond-cutting",
        label: "Алмазная шлифовка дисков",
      },
      {
        href: "/services/tire-mounting",
        label: "Шиномонтаж",
      },
      { href: "/services/caliper-painting", label: "Покраска суппортов" },
      { href: "/services/lip-polishing", label: "Полировка полок" },
      { href: "/services/center-caps", label: "Изготовление колпачков" },
      {
        href: "/services/split-wheel-painting",
        label: "Покраска разборных дисков",
      },
      {
        href: "/services/motorcycle-wheel-painting",
        label: "Покраска мото дисков",
      },
      {
        href: "/services/dimet-restoration",
        label: "Восстановление дисков",
      },
      { href: "/services/tig-welding", label: "Аргонно-дуговая сварка" },
      { href: "/services/wheel-straightening", label: "Правка дисков" },
      { href: "/services/brushed-finish", label: "Брашировка дисков" },
    ],
    legalLinks: {
      privacy: "Политика конфиденциальности",
      terms: "Условия использования",
    },
    claimRuns: [
      {
        group: "muted",
        text: "Студия профессионального ремонта",
        breakAfter: true,
      },
      { group: "muted", text: "и порошковой" },
      { group: "strong", text: "покраски дисков" },
    ],
    shopNow: "Недавние работы",
    copyright: "© rim/studio",
  },
};
