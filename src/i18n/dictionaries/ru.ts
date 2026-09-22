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
    contact: "Связаться с нами",
  },
  menu: {
    servicesHeading: "Услуги",
    studioHeading: "Студия",
    services: {
      wheelPainting: "Покраска дисков",
      wheelRepair: "Ремонт дисков",
      diamondCutting: "Алмазная шлифовка дисков",
      tireMounting: "Шиномонтаж",
      caliperPainting: "Покраска суппортов",
      motorcycleWheelPainting: "Покраска мото дисков + деталей",
      tigWelding: "Аргонно-дуговая сварка",
    },
    studio: {
      about: "О нас",
      contact: "Контакты",
    },
  },
  pages: {
    services: {
      wheelPainting: {
        title: "Покраска дисков",
        lead:
          "Порошковая покраска и реставрация дисков в Варшаве — подберём цвет, подготовим поверхность и вернём колёсам заводской вид.",
        banner: {
          layout: "tiles",
          titleLines: [
            { text: "Покраска дисков" },
            { text: "в Варшаве", accent: true },
          ],
          ledeParts: [
            {
              text: "Хотите обновить внешний вид колёс? Подберём оттенок и вернём дискам ",
            },
            { text: "заводской вид.", accent: true },
          ],
          highlights: [
            {
              id: "powder",
              icon: "sparkles",
              title: "Порошковая покраска",
              subtitle: "Ровное покрытие и стойкий цвет",
            },
            {
              id: "prep",
              icon: "wrench",
              title: "Подготовка поверхности",
              subtitle: "Очистка, шлифовка, грунт",
            },
            {
              id: "palette",
              icon: "palette",
              title: "Каталог цветов и фактур",
              subtitle: "RAL, металлик, мат",
            },
            {
              id: "protection",
              icon: "shieldCheck",
              title: "Защита от сколов",
              subtitle: "Прочный слой на весь диск",
            },
          ],
          ctaPrimary: { label: "Узнать стоимость покраски" },
        },
      },
      wheelRepair: {
        title: "Ремонт дисков",
        lead:
          "Устраняем вмятины, трещины и следы коррозии. Диагностика, правка геометрии и подготовка под покраску — в одной студии.",
        banner: {
          layout: "tiles",
          titleLines: [
            { text: "Ремонт дисков" },
            { text: "в Варшаве", accent: true },
          ],
          ledeParts: [
            { text: "Повредили диск? Мы знаем, что делать." },
          ],
          highlights: [
            {
              id: "geometry",
              icon: "gauge",
              title: "Выравнивание (правка) геометрии",
              subtitle: "Прокат и контроль биения",
            },
            {
              id: "tig",
              icon: "flame",
              title: "Сварка аргоном",
              subtitle: "Локальный ремонт трещин",
            },
            {
              id: "cracks",
              icon: "sparkles",
              title: "Ремонт трещин",
              subtitle: "После диагностики",
            },
            {
              id: "curb",
              icon: "crosshair",
              title: "Устранение сколов от бордюров",
              subtitle: "Кромка и лицевая поверхность",
            },
          ],
          ctaPrimary: { label: "Записаться на диагностику" },
        },
      },
      diamondCutting: {
        title: "Алмазная шлифовка дисков",
        lead:
          "Алмазная проточка полок и лицевых поверхностей — глубокий блеск, чёткая фактура и аккуратные переходы без перегрева металла.",
        banner: {
          layout: "pair",
          titleLines: [
            { text: "Алмазная проточка" },
            { text: "и шлифовка дисков" },
            { text: "в Варшаве", accent: true },
          ],
          ledeParts: [
            {
              text: "Возвращаем заводской блеск дисков методом ",
            },
            { text: "Diamond Cut", accent: true },
            { text: "." },
          ],
          highlights: [
            {
              id: "shine",
              icon: "sparkles",
              title: "Заводской блеск",
              subtitle: "Зеркальная полка и чёткая фактура",
            },
            {
              id: "precision",
              icon: "gem",
              title: "Точная проточка",
              subtitle: "Без перегрева и лишнего снятия металла",
            },
          ],
          ctaPrimary: { label: "Записаться на консультацию" },
        },
      },
      tireMounting: {
        title: "Шиномонтаж",
        lead:
          "Сезонная смена, балансировка и монтаж шин с аккуратной работой на дисках — без царапин и лишней нагрузки на покрытие.",
        banner: {
          layout: "grid",
          titleLines: [
            { text: "Современный шиномонтаж" },
            { text: "в Варшаве", accent: true },
          ],
          ledeParts: [
            {
              text: "Бережная замена шин и точная балансировка. Работаем так, чтобы ваши диски оставались ",
            },
            { text: "в идеальном состоянии", accent: true },
            { text: "." },
          ],
          highlights: [
            {
              id: "equipment",
              icon: "circleDot",
              title: "Современное оборудование",
              subtitle: "Hunter / Corghi",
            },
            {
              id: "care",
              icon: "shieldCheck",
              title: "Бережная работа",
              subtitle: "Без повреждения дисков",
            },
            {
              id: "balance",
              icon: "crosshair",
              title: "Точная балансировка",
              subtitle: "Комфорт и безопасность",
            },
            {
              id: "season",
              icon: "sunSnow",
              title: "Сезонная замена шин",
              subtitle: "Лето / зима",
            },
          ],
          ctaPrimary: { label: "Записаться на шиномонтаж" },
        },
      },
      caliperPainting: {
        title: "Покраска суппортов",
        lead:
          "Покраска тормозных суппортов в стойкие порошковые оттенки — от демонтажа до сборки, с защитой рабочих поверхностей.",
        banner: {
          layout: "grid",
          titleLines: [
            { text: "Покраска суппортов" },
            { text: "в Варшаве", accent: true },
          ],
          ledeParts: [
            {
              text: "Стойкие порошковые оттенки для тормозных суппортов — от демонтажа до сборки, с защитой ",
            },
            { text: "рабочих поверхностей", accent: true },
            { text: "." },
          ],
          highlights: [
            {
              id: "powder",
              icon: "circleDot",
              title: "Порошковое покрытие",
              subtitle: "Стойкость к нагреву и химии",
            },
            {
              id: "colors",
              icon: "palette",
              title: "Любой оттенок",
              subtitle: "Классика и яркие акценты",
            },
            {
              id: "care",
              icon: "shieldCheck",
              title: "Защита посадочных зон",
              subtitle: "Поршни и направляющие не красим",
            },
            {
              id: "full",
              icon: "settings",
              title: "Полный цикл работ",
              subtitle: "Демонтаж, подготовка, сборка",
            },
          ],
          ctaPrimary: { label: "Записаться на покраску суппортов" },
        },
      },
      motorcycleWheelPainting: {
        title: "Покраска мото дисков + деталей",
        lead:
          "Лакировка мотоциклетных дисков, ободов и сопутствующих деталей — компактные размеры, сложные формы и точная подготовка.",
        banner: {
          layout: "tiles",
          titleLines: [
            { text: "Покраска мото дисков" },
            { text: "и деталей в Варшаве", accent: true },
          ],
          ledeParts: [
            {
              text: "Каждая деталь имеет значение — порошковое покрытие для дисков, ободов и сопутствующих элементов.",
            },
          ],
          highlights: [
            {
              id: "chips",
              icon: "shieldCheck",
              title: "Устойчивость к сколам и царапинам",
              subtitle: "Прочное порошковое покрытие",
            },
            {
              id: "rust",
              icon: "shieldBadge",
              title: "Защита от коррозии",
              subtitle: "Герметичный слой по всей детали",
            },
            {
              id: "uv",
              icon: "sun",
              title: "Не выцветает на солнце",
              subtitle: "Стойкие пигменты и лак",
            },
            {
              id: "colors",
              icon: "palette",
              title: "Большой выбор цветов и текстур",
              subtitle: "Подберём оттенок под мото",
            },
          ],
          ctaPrimary: { label: "Узнать стоимость покраски" },
        },
      },
      tigWelding: {
        title: "Аргонно-дуговая сварка",
        lead:
          "Аргонно-дуговая сварка алюминиевых и стальных элементов дисков — локальный ремонт трещин и восстановление посадочных зон.",
        banner: {
          layout: "tiles",
          titleLines: [
            { text: "Аргонно-дуговая сварка" },
            { text: "алюминия в Варшаве", accent: true },
          ],
          ledeParts: [
            {
              text: "Свариваем алюминиевые детали для авто, мото и других изделий. Каждый ремонт начинается с оценки состояния и возможности восстановления.",
            },
          ],
          highlights: [
            {
              id: "aluminum",
              icon: "flame",
              title: "Сварка алюминия",
              subtitle: "TIG / аргонная защита шва",
            },
            {
              id: "accuracy",
              icon: "crosshair",
              title: "Высокая точность",
              subtitle: "Аккуратный шов без лишнего прогрева",
            },
            {
              id: "diagnostics",
              icon: "search",
              title: "Предварительная диагностика",
              subtitle: "Оценка до начала работ",
            },
            {
              id: "scope",
              icon: "settings",
              title: "Авто • мото • другие изделия",
              subtitle: "Локальный ремонт и восстановление",
            },
          ],
          ctaPrimary: {
            label: "Отправить фото детали",
            action: "photo",
          },
        },
      },
    },
    about: {
      title: "О нас",
      lead:
        "rim/studio — студия реставрации и покраски дисков в Варшаве. Работаем аккуратно, с гарантией и без лишней суеты.",
    },
    contact: {
      title: "Контакты",
      lead:
        "Напишите или позвоните — подскажем по срокам, цветам и стоимости. Можно прислать фото дисков для первичной оценки.",
    },
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
      body: "Сделайте несколько снимков колёс при дневном свете — по фото оценим состояние и предложим варианты реставрации и покраски.",
      submitLabel: "Отправить",
      successTitle: "Заявка готова",
      successBody:
        "Пока отправка настроена в демо-режиме. Сохраните данные — подключим отправку на сервер на следующем шаге.",
      photosCount: "Добавлено {current} из {max} фото",
      privacyBefore: "Нажимая «Отправить», вы соглашаетесь с ",
      privacyLinkLabel: "политикой конфиденциальности",
      privacyHref: "/contact",
      fields: {
        nameLabel: "Имя",
        namePlaceholder: "Как к вам обращаться",
        phoneLabel: "Телефон",
        phonePlaceholder: "+48 ___ ___ ___",
        emailLabel: "Email",
        emailPlaceholder: "name@example.com",
        optionalLabel: "(необязательно)",
        photosLabel: "Фото дисков",
        photosDropTitle: "Добавить фото",
        photosDropHint: "Перетащите сюда или нажмите — до 10 снимков, JPG или PNG",
        removePhotoLabel: "Удалить фото",
        commentLabel: "Комментарий",
        commentPlaceholder: "Размер дисков, повреждения, желаемый цвет…",
        commentHint: "Любые детали помогут быстрее оценить работу.",
      },
      errors: {
        nameRequired: "Укажите имя",
        phoneRequired: "Укажите номер телефона",
        emailInvalid: "Проверьте формат email",
        photosRequired: "Добавьте хотя бы одно фото дисков",
      },
    },
    ctaSecondary: { label: "Позвонить", href: "tel:+48000000000" },
    sectionNavLabel: "Навигация по разделам",
    scrollHint: "Листайте",
  },
  sectionNav: {
    pricing: "Цены",
    beforeAfter: "Примеры",
    showcase: "Услуги",
    loyalty: "Лояльность",
    about: "О студии",
    process: "Процесс",
    benefits: "Преимущества",
    testimonials: "Отзывы",
  },
  contactSheet: {
    eyebrow: "rim/studio",
    title: "Связаться с нами",
    closeLabel: "Закрыть панель контактов",
    mapAriaLabel: "Карта — расположение студии rim/studio в Варшаве",
    routeLabel: "Проложить маршрут",
    addressTitle: "Адрес",
    addressLine1: "ul. Przykładowa 12",
    addressLine2: "Варшава, Польша",
    phoneTitle: "Телефон",
    callbackTitle: "Обратный звонок",
    callbackBody:
      "Оставьте номер — перезвоним в рабочее время и ответим на вопросы по покраске и ремонту дисков.",
    callbackPhoneLabel: "Телефон",
    callbackPhonePlaceholder: "+48 000 000 000",
    callbackPhoneRequired: "Укажите номер телефона",
    callbackCta: "Заказать звонок",
    callbackSuccessTitle: "Заявка принята",
    callbackSuccessBody: "Мы перезвоним вам в ближайшее рабочее время.",
    socialTitle: "Соцсети",
    emailLabel: "Email",
  },
  pricing: {
    tabsAriaLabel: "Категории цен",
    panels: {
      paint: {
        tabLabelLine1: "Покраска",
        tabLabelLine2: "дисков",
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
        tabLabelLine1: "Ремонт",
        tabLabelLine2: "дисков",
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
      diamond: {
        tabLabelLine1: "Алмазная",
        tabLabelLine2: "шлифовка",
        table: {
          title: "Алмазная шлифовка дисков",
          columns: ["R15-16", "R17-18", "R19-20", "R21+"],
          rows: [
            {
              label: "Алмазная проточка без покраски (комплект)",
              prices: ["12000", "14000", "16000", "18000"],
            },
            {
              label: "Проточка + полировка полок (комплект)",
              prices: ["15000", "17000", "19000", "21000"],
            },
            {
              label: "Зеркальный блеск (комплект)",
              prices: ["18000", "20000", "22000", "25000"],
            },
          ],
        },
      },
      tire: {
        tabLabelLine1: "Шино",
        tabLabelLine2: "монтаж",
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
      caliper: {
        tabLabelLine1: "Покраска",
        tabLabelLine2: "суппортов",
        table: {
          title: "Покраска суппортов",
          columns: ["1 ось", "2 оси", "Комплект", "С логотипом"],
          rows: [
            {
              label: "Порошковая покраска",
              prices: ["4500", "8000", "12000", "15000"],
            },
            {
              label: "Покраска + обезжиривание",
              prices: ["5500", "9500", "14000", "17500"],
            },
            {
              label: "Демонтаж / монтаж суппорта",
              prices: ["1500", "2800", "4000", "5000"],
            },
          ],
        },
      },
      motorcycle: {
        tabLabelLine1: "Мото диски",
        tabLabelLine2: "+ детали",
        table: {
          title: "Покраска мото дисков и деталей",
          columns: ["10–12\"", "13–17\"", "18–21\"", "Детали"],
          rows: [
            {
              label: "Покраска диска (1 шт.)",
              prices: ["3500", "4500", "5500", "от 1500"],
            },
            {
              label: "Покраска комплекта (2 диска)",
              prices: ["6500", "8500", "10000", "—"],
            },
            {
              label: "Ремонт / правка мото диска",
              prices: ["2500", "3000", "3500", "—"],
            },
          ],
        },
      },
      tig: {
        tabLabelLine1: "Аргонно-дуговая",
        tabLabelLine2: "сварка",
        table: {
          title: "Аргонно-дуговая сварка",
          columns: ["До 3 см", "3–8 см", "8–15 см", "Сложный шов"],
          rows: [
            {
              label: "Сварка трещины на диске",
              prices: ["3500", "5000", "7000", "от 9000"],
            },
            {
              label: "Наплавка посадочного места",
              prices: ["2500", "4000", "5500", "от 7500"],
            },
            {
              label: "Восстановление пескоструйной зоны",
              prices: ["2000", "3500", "5000", "от 6500"],
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
    openCardLabel: "Открыть услугу",
    modalCloseLabel: "Закрыть",
    modalPlaceholder:
      "Подробное описание, цены и условия появятся здесь на следующем этапе.",
    cards: {
      wheelPainting: {
        category: "Покраска",
        title: "Порошковая покраска дисков любой сложности",
        linkLabel: "Подробнее",
      },
      wheelRepair: {
        category: "Ремонт",
        title: "Ремонт и восстановление повреждённых дисков",
        linkLabel: "Подробнее",
      },
      diamondCutting: {
        category: "Шлифовка",
        title: "Алмазная проточка и зеркальный блеск",
        linkLabel: "Подробнее",
      },
      tireMounting: {
        category: "Шины",
        title: "Шиномонтаж и сезонное хранение",
        linkLabel: "Подробнее",
      },
      caliperPainting: {
        category: "Суппорта",
        title: "Покраска суппортов в цвет кузова или акцент",
        linkLabel: "Подробнее",
      },
      motorcycleWheelPainting: {
        category: "Мото",
        title: "Покраска мото дисков и сопутствующих деталей",
        linkLabel: "Подробнее",
      },
      tigWelding: {
        category: "Сварка",
        title: "Аргонно-дуговая сварка трещин и посадочных зон",
        linkLabel: "Подробнее",
      },
    },
  },
  beforeAfter: {
    titleStrong: "Примеры",
    titleMuted: "наших работ.",
    beforeLabel: "До",
    afterLabel: "После",
    prevLabel: "Предыдущая миниатюра",
    nextLabel: "Следующая миниатюра",
    thumbAltFallback: "Пример работы",
    galleryCounter: "{current} / {total}",
    galleryOpenLabel: "Открыть галерею на весь экран",
    galleryCloseLabel: "Закрыть галерею",
    categories: {
      paint: {
        thumbsAriaLabel: "Примеры покраски дисков",
        compareFallback: {
          beforeAlt: "Диск до покраски",
          afterAlt: "Диск после покраски",
          thumbAlt: "Пример покраски диска",
        },
      },
      tire: {
        thumbsAriaLabel: "Галерея шиномонтажа",
        galleryFallback: {
          alt: "Работа шиномонтажа в rim/studio",
          thumbAlt: "Миниатюра шиномонтажа",
        },
      },
      repair: {
        thumbsAriaLabel: "Примеры ремонта дисков",
        compareFallback: {
          beforeAlt: "Диск до ремонта",
          afterAlt: "Диск после ремонта",
          thumbAlt: "Пример ремонта диска",
        },
      },
      caliper: {
        thumbsAriaLabel: "Примеры покраски суппортов",
        compareFallback: {
          beforeAlt: "Суппорт до покраски",
          afterAlt: "Суппорт после покраски",
          thumbAlt: "Пример покраски суппорта",
        },
      },
      diamond: {
        thumbsAriaLabel: "Примеры алмазной шлифовки",
        compareFallback: {
          beforeAlt: "Диск до алмазной шлифовки",
          afterAlt: "Диск после алмазной шлифовки",
          thumbAlt: "Пример алмазной шлифовки",
        },
      },
      motorcycle: {
        thumbsAriaLabel: "Галерея мото дисков и деталей",
        galleryFallback: {
          alt: "Покраска мото диска или детали",
          thumbAlt: "Миниатюра мото работы",
        },
      },
      tig: {
        thumbsAriaLabel: "Примеры аргонно-дуговой сварки",
        compareFallback: {
          beforeAlt: "Диск до сварки",
          afterAlt: "Диск после сварки",
          thumbAlt: "Пример аргонно-дуговой сварки",
        },
      },
    },
    booking: {
      eyebrow: "Консультация",
      title: "Запишитесь на",
      titleAccent: "бесплатную консультацию",
      body:
        "Оценим состояние дисков, подберём цвет и назовём срок — до записи на покраску.",
      cta: {
        label: "Записаться на консультацию",
        href: "/contact",
      },
    },
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
      phonePlaceholder: "+48 000 000 000",
      submitLabel: "Записаться на диагностику",
      privacyBefore:
        "Нажимая на кнопку, вы соглашаетесь с условиями ",
      privacyLinkLabel: "политики конфиденциальности",
      privacyHref: "/privacy",
    },
  },
  aboutSection: {
    heading: "rim/studio — реставрация и покраска дисков",
    lead:
      "Студия в Варшаве: восстанавливаем геометрию, готовим поверхность и красим комплекты так, чтобы от завода их было не отличить. Работаем без предоплаты, даём гарантию до трёх лет и называем срок до начала работ.",
    cta: {
      label: "Записаться на диагностику",
      href: "/contact",
    },
    cards: {
      studio: { label: "Студия" },
      timeline: [
        {
          period: "2022 — н.в.",
          role: "rim/studio",
          detail: "Покраска, ремонт и шиномонтаж",
        },
        {
          period: "2019 — 2022",
          role: "Малярная камера",
          detail: "Порошковые технологии и сушка",
        },
        {
          period: "2016 — 2019",
          role: "Реставрация дисков",
          detail: "Дилеры и частные клиенты",
        },
        {
          period: "2014 — 2016",
          role: "Старт направления",
          detail: "Подготовка и локальный ремонт",
        },
      ],
      warranty: {
        label: "Гарантия",
        title: "На нашу работу мы даем гарантию 3 года",
        body:
          "Если в течении этого срока у вас сползет краска или обнаружится дефект, которого не должно быть — восстановим за наш счет",
      },
      stat: {
        value: "8+",
        caption: "лет на рынке реставрации",
      },
      equipment: {
        label: "Оборудование",
      },
      advantage: {
        label: "Условия",
        title: "Работаем без предоплаты",
        body:
          "Оплата — только после приёмки результата. До начала работ называем точную цену и срок, без сюрпризов по ходу.",
      },
    },
  },
  process: {
    titleMuted: "Как мы",
    titleStrong: "работаем",
    carouselAriaLabel: "Этапы работы rim/studio",
    prevLabel: "Предыдущий этап",
    nextLabel: "Следующий этап",
    steps: [
      {
        id: "consultation",
        label: "Консультация",
        description:
          "Поможем с выбором цвета, проконсультируем по всем необходимым работам.",
      },
      {
        id: "work",
        label: "Работа",
        description:
          "Выполним заказ за 1–4 дня. Если нет сменного комплекта, оставляйте авто на нашей парковке.",
      },
      {
        id: "payment",
        label: "Оплата",
        description:
          "Вы вносите полную стоимость после осмотра результата, когда всё устраивает.",
      },
      {
        id: "done",
        label: "Готово",
        description:
          "Вместе с документами о проведенных работах выдадим гарантийный талон.",
      },
    ],
  },
  loyalty: {
    eyebrow: "Программа лояльности",
    claimRuns: [
      {
        group: "muted",
        text: "Накопительная система",
        breakAfter: true,
      },
      { group: "muted", text: "для постоянных клиентов —" },
      { group: "strong", text: "скидки до 15%" },
    ],
    body:
      "Каждый заказ приближает вас к следующему уровню. Скидка применяется автоматически — чем больше работ выполнено в rim/studio, тем выгоднее условия на покраску, ремонт и шиномонтаж.",
    carouselAriaLabel: "Уровни программы лояльности rim/studio",
    cta: {
      label: "Узнать свой уровень",
      href: "/contact",
    },
    secondaryCta: {
      label: "Как начисляются баллы",
      href: "/about",
    },
    tiers: {
      silver: {
        level: "Серебро",
        discount: "7%",
        discountLabel: "скидка на услуги",
        thresholdLabel: "сумма заказов",
        threshold: "от 35 000 zł",
        perks: ["Скидка на шиномонтаж", "7 дней хранения"],
      },
      gold: {
        level: "Золото",
        discount: "10%",
        discountLabel: "скидка на услуги",
        thresholdLabel: "сумма заказов",
        threshold: "от 70 000 zł",
        perks: ["Скидка на суппорта", "Персональный менеджер"],
      },
      platinum: {
        level: "Платина",
        discount: "15%",
        discountLabel: "скидка на услуги",
        thresholdLabel: "сумма заказов",
        threshold: "от 120 000 zł",
        perks: ["Максимальная скидка", "VIP-запись без очереди"],
      },
    },
  },
  testimonials: {
    eyebrow: "Отзывы клиентов",
    sliderAriaLabel: "Отзывы клиентов rim/studio",
    prevLabel: "Предыдущий отзыв",
    nextLabel: "Следующий отзыв",
    counterAriaLabel: "Отзыв {current} из {total}",
    items: [
      {
        id: "anna-k",
        quote:
          "Обратились за покраской комплекта R19 — цвет попали с первого раза, сроки как обещали. Диски выглядят как новые, без подтёков и разницы по оттенку.",
        author: "Анна Коваль",
        role: "BMW X5, Варшава",
        initials: "АК",
      },
      {
        id: "mikhail-n",
        quote:
          "После удара о бордюр восстановили геометрию и покрасили комплект — видно, что профессионалы. Машину забрали в срок, без сюрпризов по цене.",
        author: "Михаил Новак",
        role: "Mercedes C-Class",
        initials: "МН",
      },
      {
        id: "olga-w",
        quote:
          "Делали алмазную проточку и покраску суппортов — блеск ровный, переходы аккуратные. Приятно, что можно прислать фото и сразу получить понятную оценку.",
        author: "Ольга Вишневская",
        role: "Audi A6",
        initials: "ОВ",
      },
      {
        id: "tomasz-l",
        quote:
          "Сезонный шиномонтаж прошёл быстро, диски не поцарапали. Хранение колёс удобное — не нужно таскать комплект по квартире между сезонами.",
        author: "Tomasz Lewandowski",
        role: "VW Tiguan",
        initials: "TL",
      },
    ],
  },
  visitMap: {
    title: "Запись и контакты",
    contactsEyebrow: "Студия",
    contactsTitle: "Как нас найти",
    bookingEyebrow: "Сервис",
    hoursLabel: "Часы работы",
    hoursValue: "Пн–Сб · 9:00–19:00",
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
      {
        href: "/services/tire-mounting",
        label: "Шиномонтаж",
      },
      { href: "/services/wheel-repair", label: "Ремонт дисков" },
      { href: "/services/caliper-painting", label: "Покраска суппортов" },
      {
        href: "/services/diamond-cutting",
        label: "Алмазная шлифовка дисков",
      },
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
