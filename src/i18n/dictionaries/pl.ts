import type { Dictionary } from "../types";

export const pl: Dictionary = {
  meta: {
    title: "rim/studio — Kreatywne studio cyfrowe",
    description:
      "rim/studio to kreatywne studio cyfrowe tworzące strony, marki i interaktywne produkty.",
    siteName: "rim/studio",
  },
  header: {
    menu: "Menu",
    close: "Zamknij",
    contact: "Skontaktuj się",
  },
  menu: {
    servicesHeading: "Usługi",
    studioHeading: "Studio",
    services: {
      wheelPainting: "Lakierowanie felg",
      wheelRepair: "Naprawa felg",
      diamondCutting: "Szlifowanie diamentowe felg",
      tireMounting: "Montaż opon",
      caliperPainting: "Lakierowanie zacisków",
      motorcycleWheelPainting: "Lakierowanie felg moto + części",
      tigWelding: "Spawanie argonowe TIG",
    },
    studio: {
      about: "O nas",
      contact: "Kontakt",
    },
  },
  pages: {
    services: {
      wheelPainting: {
        title: "Lakierowanie felg",
        lead:
          "Proszkowe lakierowanie i renowacja felg w Warszawie — dobierzemy kolor, przygotujemy powierzchnię i przywrócimy fabryczny wygląd.",
      },
      wheelRepair: {
        title: "Naprawa felg",
        lead:
          "Usuwamy wgniecenia, pęknięcia i korozję. Diagnostyka, prostowanie geometrii i przygotowanie pod lakier — w jednym miejscu.",
      },
      diamondCutting: {
        title: "Szlifowanie diamentowe felg",
        lead:
          "Diamentowe toczenie obrzeży i powierzchni — głęboki połysk, wyraźna faktura i czyste przejścia bez przegrzania metalu.",
      },
      tireMounting: {
        title: "Montaż opon",
        lead:
          "Sezonowa wymiana, wyważanie i montaż opon z dbałością o felgi — bez zarysowań i zbędnego obciążenia powłoki.",
      },
      caliperPainting: {
        title: "Lakierowanie zacisków",
        lead:
          "Lakierowanie zacisków hamulcowych w trwałe odcienie proszkowe — od demontażu po montaż, z ochroną powierzchni roboczych.",
      },
      motorcycleWheelPainting: {
        title: "Lakierowanie felg moto + części",
        lead:
          "Lakierowanie motocyklowych felg, obręczy i dodatków — małe rozmiary, złożone kształty i precyzyjne przygotowanie.",
      },
      tigWelding: {
        title: "Spawanie argonowe TIG",
        lead:
          "Spawanie TIG elementów aluminiowych i stalowych felg — lokalna naprawa pęknięć i odtworzenie stref montażowych.",
      },
    },
    about: {
      title: "O nas",
      lead:
        "rim/studio — pracownia renowacji i lakierowania felg w Warszawie. Pracujemy starannie, z gwarancją i bez zbędnego pośpiechu.",
    },
    contact: {
      title: "Kontakt",
      lead:
        "Napisz lub zadzwoń — doradzimy w sprawie terminów, kolorów i wyceny. Możesz też przesłać zdjęcia felg do wstępnej oceny.",
    },
  },
  hero: {
    titleStart: "Renowacja i lakierowanie",
    titleEnd: "felg",
    titleHighlight: "w Warszawie",
    lede: "Przywrócimy felgi do stanu nowych — bez kupowania nowych. Czysto, równo i na czas.",
    features: [
      {
        id: "warranty",
        icon: "shield",
        label: "Gwarancja",
        value: "do 12 mies.",
      },
      {
        id: "time",
        icon: "clock",
        label: "Termin",
        value: "1–3 dni",
      },
      {
        id: "payment",
        icon: "wallet",
        label: "Płatność",
        value: "Bez przedpłaty",
      },
    ],
    ctaPrimary: { label: "Wyślij zdjęcie felg", href: "/contact" },
    photoModal: {
      title: "Zdjęcia Twoich felg",
      body: "Zrób kilka zdjęć kół w świetle dziennym — na ich podstawie ocenimy stan i zaproponujemy opcje renowacji i lakierowania.",
      submitLabel: "Wyślij",
      successTitle: "Zgłoszenie gotowe",
      successBody:
        "Wysyłka działa na razie w trybie demo. Zapisz dane — podłączymy backend w kolejnym kroku.",
      photosCount: "Dodano {current} z {max} zdjęć",
      privacyBefore: "Klikając „Wyślij”, akceptujesz ",
      privacyLinkLabel: "politykę prywatności",
      privacyHref: "/contact",
      fields: {
        nameLabel: "Imię",
        namePlaceholder: "Jak się do Ciebie zwracać",
        phoneLabel: "Telefon",
        phonePlaceholder: "+48 ___ ___ ___",
        emailLabel: "Email",
        emailPlaceholder: "name@example.com",
        optionalLabel: "(opcjonalnie)",
        photosLabel: "Zdjęcia felg",
        photosDropTitle: "Dodaj zdjęcia",
        photosDropHint: "Przeciągnij tutaj lub kliknij — do 10 zdjęć, JPG lub PNG",
        removePhotoLabel: "Usuń zdjęcie",
        commentLabel: "Komentarz",
        commentPlaceholder: "Rozmiar felg, uszkodzenia, preferowany kolor…",
        commentHint: "Każdy szczegół pomoże szybciej wycenić pracę.",
      },
      errors: {
        nameRequired: "Podaj imię",
        phoneRequired: "Podaj numer telefonu",
        emailInvalid: "Sprawdź format email",
        photosRequired: "Dodaj co najmniej jedno zdjęcie felg",
      },
    },
    ctaSecondary: { label: "Zadzwoń", href: "tel:+48000000000" },
    recentWorksLabel: "Ostatnie realizacje",
    scrollHint: "Przewiń",
  },
  pricing: {
    tabsAriaLabel: "Kategorie cen",
    panels: {
      paint: {
        tabLabelLine1: "Lakierowanie",
        tabLabelLine2: "felg",
        table: {
          title: "Lakierowanie felg",
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
              label: "Lakierowanie felg (komplet)",
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
              label: "Lakier + toczenie diamentowe (komplet)",
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
              label: "Lakier z kolorowym rantem (komplet)",
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
        tabLabelLine1: "Naprawa",
        tabLabelLine2: "felg",
        table: {
          title: "Naprawa felg",
          columns: ["R15-16", "R17-18", "R19-20", "R21+"],
          rows: [
            {
              label: "Prostowanie (1 felga)",
              prices: ["2500", "3000", "3500", "4000"],
            },
            {
              label: "Spawanie pęknięcia",
              prices: ["3500", "4000", "4500", "5000"],
            },
            {
              label: "Regeneracja gniazda",
              prices: ["2000", "2500", "3000", "3500"],
            },
          ],
        },
      },
      diamond: {
        tabLabelLine1: "Szlifowanie",
        tabLabelLine2: "diamentowe",
        table: {
          title: "Diamentowe szlifowanie felg",
          columns: ["R15-16", "R17-18", "R19-20", "R21+"],
          rows: [
            {
              label: "Toczenie diamentowe bez lakieru (komplet)",
              prices: ["12000", "14000", "16000", "18000"],
            },
            {
              label: "Toczenie + polerowanie rantów (komplet)",
              prices: ["15000", "17000", "19000", "21000"],
            },
            {
              label: "Połysk lustrzany (komplet)",
              prices: ["18000", "20000", "22000", "25000"],
            },
          ],
        },
      },
      tire: {
        tabLabelLine1: "Montaż",
        tabLabelLine2: "opon",
        table: {
          title: "Montaż opon",
          columns: ["R14-15", "R16-17", "R18-19", "R20+"],
          rows: [
            {
              label: "Demontaż / montaż (komplet)",
              prices: ["800", "900", "1000", "1200"],
            },
            {
              label: "Wyważanie (komplet)",
              prices: ["600", "700", "800", "900"],
            },
            {
              label: "Naprawa przebicia",
              prices: ["400", "450", "500", "550"],
            },
          ],
        },
      },
      caliper: {
        tabLabelLine1: "Lakierowanie",
        tabLabelLine2: "zacisków",
        table: {
          title: "Lakierowanie zacisków",
          columns: ["1 oś", "2 osie", "Komplet", "Z logo"],
          rows: [
            {
              label: "Lakier proszkowy",
              prices: ["4500", "8000", "12000", "15000"],
            },
            {
              label: "Lakier + odtłuszczanie",
              prices: ["5500", "9500", "14000", "17500"],
            },
            {
              label: "Demontaż / montaż zacisku",
              prices: ["1500", "2800", "4000", "5000"],
            },
          ],
        },
      },
      motorcycle: {
        tabLabelLine1: "Felgi moto",
        tabLabelLine2: "+ detale",
        table: {
          title: "Lakierowanie felg moto i detali",
          columns: ["10–12\"", "13–17\"", "18–21\"", "Detale"],
          rows: [
            {
              label: "Lakier felgi (1 szt.)",
              prices: ["3500", "4500", "5500", "od 1500"],
            },
            {
              label: "Lakier kompletu (2 felgi)",
              prices: ["6500", "8500", "10000", "—"],
            },
            {
              label: "Naprawa / prostowanie felgi moto",
              prices: ["2500", "3000", "3500", "—"],
            },
          ],
        },
      },
      tig: {
        tabLabelLine1: "Spawanie",
        tabLabelLine2: "TIG",
        table: {
          title: "Spawanie argonowo-łukowe (TIG)",
          columns: ["Do 3 cm", "3–8 cm", "8–15 cm", "Trudny szew"],
          rows: [
            {
              label: "Spawanie pęknięcia na felge",
              prices: ["3500", "5000", "7000", "od 9000"],
            },
            {
              label: "Naprawa gniazda",
              prices: ["2500", "4000", "5500", "od 7500"],
            },
            {
              label: "Regeneracja strefy piaskowania",
              prices: ["2000", "3500", "5000", "od 6500"],
            },
          ],
        },
      },
    },
  },
  showcase: {
    titleStrong: "Nasze usługi.",
    titleMuted: "Wybierz to, co pasuje do Ciebie.",
    sliderAriaLabel: "Karuzela usług",
    prevLabel: "Poprzednia karta",
    nextLabel: "Następna karta",
    cards: {
      wheelPainting: {
        category: "Lakierowanie",
        title: "Proszkowe lakierowanie felg dowolnej złożoności",
        linkLabel: "Więcej",
      },
      wheelRepair: {
        category: "Naprawa",
        title: "Naprawa i renowacja uszkodzonych felg",
        linkLabel: "Więcej",
      },
      diamondCutting: {
        category: "Szlifowanie",
        title: "Diamentowe toczenie i lustrzany połysk",
        linkLabel: "Więcej",
      },
      tireMounting: {
        category: "Opony",
        title: "Montaż opon i sezonowe przechowywanie",
        linkLabel: "Więcej",
      },
      caliperPainting: {
        category: "Zaciski",
        title: "Lakierowanie zacisków w kolorze nadwozia",
        linkLabel: "Więcej",
      },
      motorcycleWheelPainting: {
        category: "Moto",
        title: "Lakierowanie felg motocyklowych i dodatków",
        linkLabel: "Więcej",
      },
      tigWelding: {
        category: "Spawanie",
        title: "Spawanie TIG pęknięć i stref montażowych",
        linkLabel: "Więcej",
      },
    },
  },
  beforeAfter: {
    titleStrong: "Przykłady",
    titleMuted: "naszej pracy.",
    beforeLabel: "Przed",
    afterLabel: "Po",
    prevLabel: "Poprzednia miniatura",
    nextLabel: "Następna miniatura",
    thumbAltFallback: "Przykład pracy",
    galleryCounter: "{current} / {total}",
    galleryOpenLabel: "Otwórz galerię na pełnym ekranie",
    galleryCloseLabel: "Zamknij galerię",
    categories: {
      paint: {
        thumbsAriaLabel: "Przykłady lakierowania felg",
        compareFallback: {
          beforeAlt: "Felga przed lakierowaniem",
          afterAlt: "Felga po lakierowaniu",
          thumbAlt: "Przykład lakierowania felgi",
        },
      },
      tire: {
        thumbsAriaLabel: "Galeria wulkanizacji",
        galleryFallback: {
          alt: "Prace wulkanizacyjne w rim/studio",
          thumbAlt: "Miniatura wulkanizacji",
        },
      },
      repair: {
        thumbsAriaLabel: "Przykłady naprawy felg",
        compareFallback: {
          beforeAlt: "Felga przed naprawą",
          afterAlt: "Felga po naprawie",
          thumbAlt: "Przykład naprawy felgi",
        },
      },
      caliper: {
        thumbsAriaLabel: "Przykłady lakierowania zacisków",
        compareFallback: {
          beforeAlt: "Zacisk przed lakierowaniem",
          afterAlt: "Zacisk po lakierowaniu",
          thumbAlt: "Przykład lakierowania zacisku",
        },
      },
      diamond: {
        thumbsAriaLabel: "Przykłady szlifowania diamentowego",
        compareFallback: {
          beforeAlt: "Felga przed szlifowaniem",
          afterAlt: "Felga po szlifowaniu",
          thumbAlt: "Przykład szlifowania diamentowego",
        },
      },
      motorcycle: {
        thumbsAriaLabel: "Galeria motocyklowych felg i części",
        galleryFallback: {
          alt: "Lakierowanie motocyklowej felgi lub części",
          thumbAlt: "Miniatura pracy motocyklowej",
        },
      },
      tig: {
        thumbsAriaLabel: "Przykłady spawania TIG",
        compareFallback: {
          beforeAlt: "Felga przed spawaniem",
          afterAlt: "Felga po spawaniu",
          thumbAlt: "Przykład spawania argonowego",
        },
      },
    },
    booking: {
      eyebrow: "Konsultacja",
      title: "Umów się na",
      titleAccent: "bezpłatną konsultację",
      body:
        "Ocenimy stan felg, dobierzemy kolor i podamy termin — zanim zapiszesz się na lakierowanie.",
      cta: {
        label: "Umów konsultację",
        href: "/contact",
      },
    },
  },
  benefits: {
    titleStrong: "Nasze atuty.",
    titleMuted: "Dlaczego rim/studio.",
    cards: {
      warranty: {
        title: "3 lata gwarancji na nasze usługi",
        imageAlt: "Gwarancja na usługi",
      },
      prepayment: {
        title: "Pracujemy bez przedpłaty",
        note: "Płatność wygodną metodą — BLIK, karta, gotówka lub faktura",
        imageAlt: "Płatność bez przedpłaty",
      },
      parking: {
        title: "Strzeżony parking z monitoringiem",
        imageAlt: "Strzeżony parking",
      },
      colors: {
        title: "100+ kolorów lakierowania felg",
        note: "Lakier w cenie",
        imageAlt: "Katalog kolorów",
      },
      storage: {
        title: "7 dni bezpłatnego przechowywania felg",
        imageAlt: "Przechowywanie felg",
      },
      equipment: {
        title: "Profesjonalny, wysokiej jakości sprzęt",
        note: "Gema, Hofmann, Haweka",
        imageAlt: "Sprzęt do lakierowania i wyważania",
      },
      dimet: {
        title: "Technologia «Dimet»",
        note: "Po renowacji felg nie zobaczysz różnicy względem oryginału",
        imageAlt: "Technologia Dimet",
      },
    },
    cta: {
      titleStart: "Umów się na",
      titleHighlight: "bezpłatną diagnostykę felg",
      titleEnd: "",
      phoneLabel: "Telefon",
      phonePlaceholder: "+48 000 000 000",
      submitLabel: "Umów diagnostykę",
      privacyBefore: "Klikając przycisk, akceptujesz warunki ",
      privacyLinkLabel: "polityki prywatności",
      privacyHref: "/privacy",
    },
  },
  aboutSection: {
    heading: "rim/studio — renowacja i lakierowanie felg",
    lead:
      "Studio w Warszawie: przywracamy geometrię, przygotowujemy powierzchnię i lakierujemy komplety tak, by nie odróżnić ich od fabrycznych. Bez przedpłaty, z gwarancją do trzech lat i jasnym terminem przed startem prac.",
    cta: {
      label: "Umów diagnostykę felg",
      href: "/contact",
    },
    cards: {
      studio: { label: "Studio" },
      timeline: [
        {
          period: "2022 — obecnie",
          role: "rim/studio",
          detail: "Lakierowanie, naprawa i montaż opon",
        },
        {
          period: "2019 — 2022",
          role: "Kabina lakiernicza",
          detail: "Technologie proszkowe i suszenie",
        },
        {
          period: "2016 — 2019",
          role: "Renowacja felg",
          detail: "Dealerzy i klienci indywidualni",
        },
        {
          period: "2014 — 2016",
          role: "Początek kierunku",
          detail: "Przygotowanie i lokalna naprawa",
        },
      ],
      warranty: {
        label: "Gwarancja",
        title: "Na nasze usługi dajemy 3 lata gwarancji",
        body:
          "Jeśli w tym czasie odpryśnie lakier lub pojawi się wada, której nie powinno być — naprawimy na nasz koszt",
      },
      stat: {
        value: "8+",
        caption: "lat na rynku renowacji",
      },
      equipment: {
        label: "Sprzęt",
      },
      advantage: {
        label: "Warunki",
        title: "Pracujemy bez przedpłaty",
        body:
          "Płatność dopiero po odbiorze efektu. Przed rozpoczęciem prac podajemy dokładną cenę i termin — bez niespodzianek w trakcie.",
      },
    },
  },
  process: {
    titleMuted: "Jak",
    titleStrong: "pracujemy",
    videoAlt: "Proces pracy w studiu rim/studio",
    diagramAriaLabel: "Etapy pracy rim/studio",
    cta: {
      label: "Umów konsultację",
      href: "/contact",
    },
    steps: [
      {
        id: "consultation",
        label: "Konsultacja",
        description:
          "Pomożemy wybrać kolor i doradzimy we wszystkich potrzebnych pracach.",
      },
      {
        id: "work",
        label: "Praca",
        description:
          "Realizujemy zlecenie w 1–4 dni. Jeśli nie masz drugiego kompletu, zostaw auto na naszym parkingu.",
      },
      {
        id: "payment",
        label: "Płatność",
        description:
          "Pełną kwotę wpłacasz po odbiorze efektu, gdy wszystko Ci odpowiada.",
      },
      {
        id: "done",
        label: "Gotowe",
        description:
          "Wraz z dokumentacją wykonanych prac wydamy kartę gwarancyjną.",
      },
    ],
  },
  loyalty: {
    eyebrow: "Program lojalnościowy",
    claimRuns: [
      {
        group: "muted",
        text: "System rabatów",
        breakAfter: true,
      },
      { group: "muted", text: "dla stałych klientów —" },
      { group: "strong", text: "do 15% zniżki" },
    ],
    body:
      "Każde zlecenie przybliża Cię do kolejnego poziomu. Rabat naliczamy automatycznie — im więcej prac wykonasz w rim/studio, tym korzystniejsze warunki na lakierowanie, naprawę i montaż opon.",
    carouselAriaLabel: "Poziomy programu lojalnościowego rim/studio",
    cta: {
      label: "Sprawdź swój poziom",
      href: "/contact",
    },
    secondaryCta: {
      label: "Jak naliczamy punkty",
      href: "/about",
    },
    tiers: {
      silver: {
        level: "Srebro",
        discount: "7%",
        discountLabel: "zniżki na usługi",
        thresholdLabel: "suma zamówień",
        threshold: "od 35 000 zł",
        perks: ["Rabat na montaż opon", "7 dni przechowania"],
      },
      gold: {
        level: "Złoto",
        discount: "10%",
        discountLabel: "zniżki na usługi",
        thresholdLabel: "suma zamówień",
        threshold: "od 70 000 zł",
        perks: ["Rabat na zaciski", "Osobisty opiekun"],
      },
      platinum: {
        level: "Platyna",
        discount: "15%",
        discountLabel: "zniżki na usługi",
        thresholdLabel: "suma zamówień",
        threshold: "od 120 000 zł",
        perks: ["Maksymalny rabat", "VIP bez kolejki"],
      },
    },
  },
  testimonials: {
    eyebrow: "Opinie klientów",
    sliderAriaLabel: "Opinie klientów rim/studio",
    prevLabel: "Poprzednia opinia",
    nextLabel: "Następna opinia",
    counterAriaLabel: "Opinia {current} z {total}",
    items: [
      {
        id: "anna-k",
        quote:
          "Zleciliśmy lakierowanie kompletu R19 — kolor trafiony za pierwszym razem, termin jak obiecany. Felgi wyglądają jak nowe, bez smug i różnic w odcieniu.",
        author: "Anna Kowalska",
        role: "BMW X5, Warszawa",
        initials: "AK",
      },
      {
        id: "mikhail-n",
        quote:
          "Po uderzeniu w krawężnik odzyskali geometrię i polakierowali komplet — widać, że profesjonaliści. Auto na czas, bez niespodzianek w cenie.",
        author: "Michał Nowak",
        role: "Mercedes C-Class",
        initials: "MN",
      },
      {
        id: "olga-w",
        quote:
          "Robiliśmy toczenie diamentowe i lakier zacisków — połysk równy, przejścia czyste. Miło, że można wysłać zdjęcia i od razu dostać jasną wycenę.",
        author: "Olga Wiśniewska",
        role: "Audi A6",
        initials: "OW",
      },
      {
        id: "tomasz-l",
        quote:
          "Sezonowa wymiana opon poszła szybko, felg nie porysowano. Przechowywanie kół wygodne — nie trzeba ciągnąć kompletu po mieszkaniu między sezonami.",
        author: "Tomasz Lewandowski",
        role: "VW Tiguan",
        initials: "TL",
      },
    ],
  },
  footer: {
    addressLines: ["Warszawa, Polska", "hello@rim.studio"],
    columnStudio: "Studio",
    columnServices: "Usługi",
    columnLegal: "Prawne",
    studioLinks: {
      about: "O nas",
      process: "Proces",
      contact: "Kontakt",
    },
    serviceItems: [
      { href: "/services/wheel-painting", label: "Lakierowanie felg" },
      {
        href: "/services/tire-mounting",
        label: "Montaż opon (zapis online)",
      },
      { href: "/services/wheel-repair", label: "Naprawa felg" },
      { href: "/services/caliper-painting", label: "Lakierowanie zacisków" },
      {
        href: "/services/diamond-cutting",
        label: "Szlifowanie diamentowe felg",
      },
      {
        href: "/services/lip-polishing",
        label: "Polerowanie rantów felg",
      },
      {
        href: "/services/center-caps",
        label: "Wykonanie zaślepek / dekielków",
      },
      {
        href: "/services/split-wheel-painting",
        label: "Lakierowanie felg wieloczęściowych",
      },
      {
        href: "/services/motorcycle-wheel-painting",
        label: "Lakierowanie felg motocyklowych",
      },
      {
        href: "/services/dimet-restoration",
        label: "Renowacja felg technologią Dimet",
      },
      {
        href: "/services/tig-welding",
        label: "Spawanie łukiem argonowym (TIG)",
      },
      { href: "/services/wheel-straightening", label: "Prostowanie felg" },
      {
        href: "/services/brushed-finish",
        label: "Wykończenie szczotkowane (brush)",
      },
      { href: "/services/forged-wheels", label: "Wykonanie felg kowanych" },
    ],
    legalLinks: {
      privacy: "Polityka prywatności",
      terms: "Warunki świadczenia usług",
    },
    claimRuns: [
      {
        group: "muted",
        text: "Studio profesjonalnej naprawy",
        breakAfter: true,
      },
      { group: "muted", text: "i proszkowego" },
      { group: "strong", text: "lakierowania felg" },
    ],
    shopNow: "Wybrane projekty",
    copyright: "© rim/studio",
  },
};
