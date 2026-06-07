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
  pricing: {
    tabsAriaLabel: "Категории цен",
    panels: {
      paint: {
        tabLabel: "Покраска дисков",
        table: {
          title: "Покраска дисков",
          columns: [
            "R12-14",
            "R15",
            "R16",
            "R17",
            "R18",
            "R19",
            "R20",
            "R21",
            "R22",
            "R23",
            "R24",
          ],
          rows: [
            {
              label: "Покраска дисков (комплект)",
              prices: [
                "15000",
                "18000",
                "19000",
                "21000",
                "22000",
                "23000",
                "25000",
                "26000",
                "28000",
                "30000",
                "35000",
              ],
            },
            {
              label: "Покраска + алмазная проточка (комплект)",
              prices: [
                "28000",
                "30000",
                "35000",
                "37000",
                "39000",
                "42000",
                "43000",
                "44000",
                "48000",
                "50000",
                "55000",
              ],
            },
            {
              label: "Покраска с цветным кантом (комплект)",
              prices: [
                "30000",
                "32000",
                "34000",
                "36000",
                "38000",
                "40000",
                "43000",
                "45000",
                "47000",
                "48000",
                "50000",
              ],
            },
          ],
        },
      },
      repair: {
        tabLabel: "Ремонт",
        table: {
          title: "Ремонт дисков",
          columns: ["R15-16", "R17-18", "R19-20", "R21+"],
          rows: [
            {
              label: "Правка геометрии (1 диск)",
              prices: ["2500", "3000", "3500", "4000"],
            },
            {
              label: "Сварка трещины",
              prices: ["3500", "4000", "4500", "5000"],
            },
            {
              label: "Восстановление посадочного места",
              prices: ["2000", "2500", "3000", "3500"],
            },
          ],
        },
      },
      tire: {
        tabLabel: "Шины",
        table: {
          title: "Шиномонтаж",
          columns: ["R14-15", "R16-17", "R18-19", "R20+"],
          rows: [
            {
              label: "Снятие / установка (комплект)",
              prices: ["800", "900", "1000", "1200"],
            },
            {
              label: "Балансировка (комплект)",
              prices: ["600", "700", "800", "900"],
            },
            {
              label: "Ремонт прокола",
              prices: ["400", "450", "500", "550"],
            },
          ],
        },
      },
      finish: {
        tabLabel: "Полировка",
        table: {
          title: "Полировка и финиш",
          columns: ["R15-16", "R17-18", "R19-20", "R21+"],
          rows: [
            {
              label: "Полировка полок (комплект)",
              prices: ["4500", "5000", "5500", "6000"],
            },
            {
              label: "Брашировка (комплект)",
              prices: ["5500", "6000", "6500", "7000"],
            },
            {
              label: "Алмазная проточка без покраски",
              prices: ["12000", "14000", "16000", "18000"],
            },
          ],
        },
      },
    },
  },
  showcase: {
    titleStrong: "Наши услуги.",
    titleMuted: "Выберите то, что подходит вам.",
    sliderAriaLabel: "Карусель услуг",
    prevLabel: "Предыдущая карточка",
    nextLabel: "Следующая карточка",
    cards: [
      {
        id: "paint",
        category: "Покраска",
        title: "Порошковая покраска дисков любой сложности",
        href: "/services/wheel-painting",
        linkLabel: "Подробнее",
      },
      {
        id: "repair",
        category: "Ремонт",
        title: "Ремонт и восстановление повреждённых дисков",
        href: "/services/wheel-repair",
        linkLabel: "Подробнее",
      },
      {
        id: "tire",
        category: "Шины",
        title: "Шиномонтаж и сезонное хранение",
        href: "/services/tire-mounting",
        linkLabel: "Подробнее",
      },
      {
        id: "diamond",
        category: "Шлифовка",
        title: "Алмазная проточка и зеркальный блеск",
        href: "/services/diamond-cutting",
        linkLabel: "Подробнее",
      },
      {
        id: "polish",
        category: "Полировка",
        title: "Полировка полок и финишная обработка",
        href: "/services/lip-polishing",
        linkLabel: "Подробнее",
      },
      {
        id: "caliper",
        category: "Суппорта",
        title: "Покраска суппортов в цвет кузова или акцент",
        href: "/services/caliper-painting",
        linkLabel: "Подробнее",
      },
    ],
  },
  beforeAfter: {
    titleStrong: "До и после.",
    titleMuted: "Результат нашей работы.",
    beforeLabel: "До",
    afterLabel: "После",
    thumbsAriaLabel: "Выбор примера до и после",
    prevLabel: "Предыдущая миниатюра",
    nextLabel: "Следующая миниатюра",
    thumbAltFallback: "Пример работы",
    pairs: [
      {
        id: "amg-r19-a",
        beforeAlt: "Диск Mercedes AMG до реставрации",
        afterAlt: "Диск Mercedes AMG после реставрации",
        thumbAlt: "Пример реставрации диска Mercedes AMG",
      },
      {
        id: "amg-r19-b",
        beforeAlt: "Второй диск Mercedes AMG до реставрации",
        afterAlt: "Второй диск Mercedes AMG после реставрации",
        thumbAlt: "Второй пример реставрации диска Mercedes AMG",
      },
    ],
  },
  benefits: {
    titleStrong: "Наши преимущества.",
    titleMuted: "Почему выбирают rim/studio.",
    cards: {
      warranty: {
        title: "Даём 3 года гарантии на наши работы",
        imageAlt: "Гарантия на работы",
      },
      prepayment: {
        title: "Работаем без предоплаты",
        note: "Оплата любым удобным способом — СБП, карта, наличные и по счёту",
        imageAlt: "Оплата без предоплаты",
      },
      parking: {
        title: "Охраняемая парковка с видеонаблюдением",
        imageAlt: "Охраняемая парковка",
      },
      colors: {
        title: "100+ цветов для покраски ваших дисков",
        note: "Лак входит в стоимость",
        imageAlt: "Каталог цветов для покраски",
      },
      storage: {
        title: "7 дней бесплатного хранения дисков",
        imageAlt: "Хранение дисков",
      },
      equipment: {
        title: "Профессиональное и качественное оборудование",
        note: "Gema, Hofmann, Haweka",
        imageAlt: "Оборудование для покраски и балансировки",
      },
      dimet: {
        title: "Используем технологию «Димет»",
        note: "После восстановления дисков вы не увидите разницу с оригинальным видом",
        imageAlt: "Технология Димет",
      },
    },
    cta: {
      titleStart: "Запишитесь на",
      titleHighlight: "бесплатную диагностику дисков",
      titleEnd: "",
      phoneLabel: "Телефон",
      phonePlaceholder: "+7 (000) 000-00-00",
      submitLabel: "Записаться на диагностику",
      privacyBefore:
        "Нажимая на кнопку, вы соглашаетесь с условиями ",
      privacyLinkLabel: "политики конфиденциальности",
      privacyHref: "/privacy",
    },
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
