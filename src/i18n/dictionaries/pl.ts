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
        banner: {
          layout: "tiles",
          titleLines: [
            { text: "Lakierowanie felg" },
            { text: "w Warszawie", accent: true },
          ],
          ledeParts: [
            {
              text: "Chcesz odświeżyć wygląd kół? Dobierzemy odcień i przywrócimy felgom ",
            },
            { text: "fabryczny wygląd.", accent: true },
          ],
          highlights: [
            {
              id: "powder",
              icon: "sparkles",
              title: "Lakier proszkowy",
              subtitle: "Równa powłoka i trwały kolor",
            },
            {
              id: "prep",
              icon: "wrench",
              title: "Przygotowanie powierzchni",
              subtitle: "Czyszczenie, szlifowanie, grunt",
            },
            {
              id: "palette",
              icon: "palette",
              title: "Katalog kolorów i faktur",
              subtitle: "RAL, metalik, mat",
            },
            {
              id: "protection",
              icon: "shieldCheck",
              title: "Ochrona przed odpryskami",
              subtitle: "Trwała warstwa na całej felgi",
            },
          ],
          ctaPrimary: { label: "Sprawdź koszt lakierowania" },
        },
      },
      wheelRepair: {
        title: "Naprawa felg",
        lead:
          "Usuwamy wgniecenia, pęknięcia i korozję. Diagnostyka, prostowanie geometrii i przygotowanie pod lakier — w jednym miejscu.",
        banner: {
          layout: "tiles",
          titleLines: [
            { text: "Naprawa felg" },
            { text: "w Warszawie", accent: true },
          ],
          ledeParts: [{ text: "Uszkodziłeś felgę? Wiemy, co zrobić." }],
          highlights: [
            {
              id: "geometry",
              icon: "gauge",
              title: "Prostowanie geometrii",
              subtitle: "Walce i kontrola bicia",
            },
            {
              id: "tig",
              icon: "flame",
              title: "Spawanie argonowe",
              subtitle: "Lokalna naprawa pęknięć",
            },
            {
              id: "cracks",
              icon: "sparkles",
              title: "Naprawa pęknięć",
              subtitle: "Po diagnostyce",
            },
            {
              id: "curb",
              icon: "crosshair",
              title: "Usuwanie ubytków od krawężnika",
              subtitle: "Krawędź i front",
            },
          ],
          ctaPrimary: { label: "Umów diagnostykę" },
        },
      },
      diamondCutting: {
        title: "Szlifowanie diamentowe felg",
        lead:
          "Diamentowe toczenie obrzeży i powierzchni — głęboki połysk, wyraźna faktura i czyste przejścia bez przegrzania metalu.",
        banner: {
          layout: "pair",
          titleLines: [
            { text: "Diamentowe toczenie" },
            { text: "i szlif felg" },
            { text: "w Warszawie", accent: true },
          ],
          ledeParts: [
            {
              text: "Przywracamy fabryczny połysk felg metodą ",
            },
            { text: "Diamond Cut", accent: true },
            { text: "." },
          ],
          highlights: [
            {
              id: "shine",
              icon: "sparkles",
              title: "Fabryczny połysk",
              subtitle: "Lustrzana obrzeż i wyraźna faktura",
            },
            {
              id: "precision",
              icon: "gem",
              title: "Precyzyjne toczenie",
              subtitle: "Bez przegrzania i zbędnego ścierania",
            },
          ],
          ctaPrimary: { label: "Umów konsultację" },
        },
      },
      tireMounting: {
        title: "Montaż opon",
        lead:
          "Sezonowa wymiana, wyważanie i montaż opon z dbałością o felgi — bez zarysowań i zbędnego obciążenia powłoki.",
        banner: {
          layout: "grid",
          titleLines: [
            { text: "Nowoczesny montaż opon" },
            { text: "w Warszawie", accent: true },
          ],
          ledeParts: [
            {
              text: "Delikatna wymiana opon i precyzyjne wyważanie. Dbamy o to, by felgi pozostały ",
            },
            { text: "w idealnym stanie", accent: true },
            { text: "." },
          ],
          highlights: [
            {
              id: "equipment",
              icon: "circleDot",
              title: "Nowoczesny sprzęt",
              subtitle: "Hunter / Corghi",
            },
            {
              id: "care",
              icon: "shieldCheck",
              title: "Delikatna praca",
              subtitle: "Bez uszkodzeń felg",
            },
            {
              id: "balance",
              icon: "crosshair",
              title: "Precyzyjne wyważanie",
              subtitle: "Komfort i bezpieczeństwo",
            },
            {
              id: "season",
              icon: "sunSnow",
              title: "Wymiana sezonowa",
              subtitle: "Lato / zima",
            },
          ],
          ctaPrimary: { label: "Umów montaż opon" },
        },
      },
      caliperPainting: {
        title: "Lakierowanie zacisków",
        lead:
          "Lakierowanie zacisków hamulcowych w trwałe odcienie proszkowe — od demontażu po montaż, z ochroną powierzchni roboczych.",
        banner: {
          layout: "grid",
          titleLines: [
            { text: "Lakierowanie zacisków" },
            { text: "w Warszawie", accent: true },
          ],
          ledeParts: [
            {
              text: "Trwałe odcienie proszkowe na zaciski hamulcowe — od demontażu po montaż, z ochroną ",
            },
            { text: "powierzchni roboczych", accent: true },
            { text: "." },
          ],
          highlights: [
            {
              id: "powder",
              icon: "circleDot",
              title: "Powłoka proszkowa",
              subtitle: "Odporność na ciepło i chemię",
            },
            {
              id: "colors",
              icon: "palette",
              title: "Dowolny odcień",
              subtitle: "Klasyka i mocne akcenty",
            },
            {
              id: "care",
              icon: "shieldCheck",
              title: "Ochrona stref montażowych",
              subtitle: "Tłoczki i prowadnice bez lakieru",
            },
            {
              id: "full",
              icon: "settings",
              title: "Pełen cykl prac",
              subtitle: "Demontaż, przygotowanie, montaż",
            },
          ],
          ctaPrimary: { label: "Umów lakierowanie zacisków" },
        },
      },
      motorcycleWheelPainting: {
        title: "Lakierowanie felg moto + części",
        lead:
          "Lakierowanie motocyklowych felg, obręczy i dodatków — małe rozmiary, złożone kształty i precyzyjne przygotowanie.",
        banner: {
          layout: "tiles",
          titleLines: [
            { text: "Lakierowanie felg moto" },
            { text: "i detali w Warszawie", accent: true },
          ],
          ledeParts: [
            {
              text: "Każdy detal ma znaczenie — powłoka proszkowa na felgi, obręcze i elementy dodatkowe.",
            },
          ],
          highlights: [
            {
              id: "chips",
              icon: "shieldCheck",
              title: "Odporność na odpryski i rysy",
              subtitle: "Trwała powłoka proszkowa",
            },
            {
              id: "rust",
              icon: "shieldBadge",
              title: "Ochrona przed korozją",
              subtitle: "Szczelna warstwa na całej detali",
            },
            {
              id: "uv",
              icon: "sun",
              title: "Nie blaknie na słońcu",
              subtitle: "Trwałe pigmenty i lakier",
            },
            {
              id: "colors",
              icon: "palette",
              title: "Szeroki wybór kolorów i faktur",
              subtitle: "Dopasujemy odcień do moto",
            },
          ],
          ctaPrimary: { label: "Sprawdź koszt lakierowania" },
        },
      },
      tigWelding: {
        title: "Spawanie argonowe TIG",
        lead:
          "Spawanie TIG elementów aluminiowych i stalowych felg — lokalna naprawa pęknięć i odtworzenie stref montażowych.",
        banner: {
          layout: "tiles",
          titleLines: [
            { text: "Spawanie TIG aluminium" },
            { text: "w Warszawie", accent: true },
          ],
          ledeParts: [
            {
              text: "Spawiamy detale aluminiowe do aut, motocykli i innych produktów. Każda naprawa zaczyna się od oceny stanu i możliwości bezpiecznej regeneracji.",
            },
          ],
          highlights: [
            {
              id: "aluminum",
              icon: "flame",
              title: "Spawanie aluminium",
              subtitle: "TIG / ochrona argonowa",
            },
            {
              id: "accuracy",
              icon: "crosshair",
              title: "Wysoka precyzja",
              subtitle: "Staranny szew bez nadmiernego grzania",
            },
            {
              id: "diagnostics",
              icon: "search",
              title: "Wstępna diagnostyka",
              subtitle: "Ocena przed rozpoczęciem prac",
            },
            {
              id: "scope",
              icon: "settings",
              title: "Auto • moto • inne",
              subtitle: "Lokalna naprawa i odtwarzanie",
            },
          ],
          ctaPrimary: {
            label: "Wyślij zdjęcie detalu",
            action: "photo",
          },
        },
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
    sectionNavLabel: "Nawigacja po sekcjach",
    scrollHint: "Przewiń",
  },
  sectionNav: {
    pricing: "Cennik",
    beforeAfter: "Realizacje",
    showcase: "Usługi",
    loyalty: "Lojalność",
    about: "O studiu",
    process: "Proces",
    benefits: "Atuty",
    testimonials: "Opinie",
  },
  contactSheet: {
    eyebrow: "rim/studio",
    title: "Skontaktuj się z nami",
    closeLabel: "Zamknij panel kontaktowy",
    mapAriaLabel: "Mapa — lokalizacja studia rim/studio w Warszawie",
    routeLabel: "Wyznacz trasę",
    addressTitle: "Adres",
    addressLine1: "ul. Przykładowa 12",
    addressLine2: "Warszawa, Polska",
    phoneTitle: "Telefon",
    callbackTitle: "Oddzwonienie",
    callbackBody:
      "Zostaw numer — oddzwonimy w godzinach pracy i pomożemy dobrać usługę.",
    callbackPhoneLabel: "Telefon",
    callbackPhonePlaceholder: "+48 000 000 000",
    callbackPhoneRequired: "Podaj numer telefonu",
    callbackCta: "Zamów telefon",
    callbackSuccessTitle: "Zgłoszenie przyjęte",
    callbackSuccessBody: "Oddzwonimy w najbliższym czasie roboczym.",
    socialTitle: "Social media",
    emailLabel: "Email",
  },
  pricing: {
    tabsAriaLabel: "Kategorie cen",
    panels: {
      paint: {
        tabLabelLine1: "Lakier",
        tabLabelLine2: "proszkowy",
        table: {
          title: "Lakierowanie proszkowe felg",
          columns: [
            "R13-15",
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
              label: "Lakier proszkowy (komplet 4 felgi)",
              prices: [
                "900",
                "900",
                "1050",
                "1200",
                "1400",
                "1700",
                "2000",
                "2300",
                "2500",
                "2800",
              ],
            },
          ],
        },
      },
      repair: {
        tabLabelLine1: "Prostowanie",
        tabLabelLine2: "felg",
        table: {
          title: "Prostowanie felgi aluminiowej",
          columns: [
            "R13-15",
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
              label: "Prostowanie felgi aluminiowej (1 szt.)",
              prices: [
                "100",
                "100",
                "150",
                "180",
                "200",
                "250",
                "300",
                "350",
                "400",
                "450",
              ],
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
        tabLabelLine1: "Wymiana",
        tabLabelLine2: "opon",
        table: {
          title: "Wymiana opon / montaż",
          columns: [
            "R13-15",
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
              label: "Wymiana opon (1 koło)",
              prices: [
                "50",
                "50",
                "55",
                "60",
                "70",
                "75",
                "85",
                "100",
                "110",
                "125",
              ],
            },
            {
              label: "Komplet 4 kół",
              prices: [
                "200",
                "200",
                "220",
                "240",
                "280",
                "300",
                "340",
                "400",
                "440",
                "500",
              ],
            },
            {
              label: "SUV (1 koło)",
              prices: [
                "55",
                "55",
                "60",
                "65",
                "75",
                "80",
                "90",
                "105",
                "115",
                "135",
              ],
            },
            {
              label: "Komplet 4 kół (SUV / crossover)",
              prices: [
                "220",
                "220",
                "240",
                "260",
                "300",
                "320",
                "360",
                "420",
                "460",
                "540",
              ],
            },
            {
              label: "Run-flat / niski profil (dopłata za 1 koło)",
              prices: [
                "10",
                "10",
                "10",
                "10",
                "10",
                "10",
                "10",
                "10",
                "10",
                "10",
              ],
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
    openCardLabel: "Otwórz usługę",
    modalCloseLabel: "Zamknij",
    modalPlaceholder:
      "Szczegółowy opis, ceny i warunki pojawią się tutaj w kolejnym kroku.",
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
        thumbsAriaLabel: "Galeria lakierowania zacisków",
        galleryFallback: {
          alt: "Lakierowanie zacisków hamulcowych w rim/studio",
          thumbAlt: "Przykład lakierowania zacisku",
        },
      },
      diamond: {
        thumbsAriaLabel: "Galeria szlifowania diamentowego",
        galleryFallback: {
          alt: "Szlifowanie diamentowe felgi w rim/studio",
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
    titleStrong: "Nasze",
    titleAccent: "atuty",
    lead: "Dlaczego powierzają nam swoje felgi",
    cards: {
      prepayment: {
        title: "Płatność po wykonaniu prac",
        body:
          "Najpierw odbierasz gotowy efekt — dopiero potem płacisz.",
        imageAlt: "Płatność po zakończeniu usługi",
      },
      colors: {
        title: "Uzgodnienie przed startem",
        body:
          "Z góry ustalamy kolor, powłokę, koszt i termin.",
        imageAlt: "Uzgodnienie koloru i wykończenia",
      },
      warranty: {
        title: "Gwarancja na wykonane prace",
        body:
          "Udzielamy gwarancji na usługi, dla których jest przewidziana.",
        imageAlt: "Gwarancja na usługi",
      },
      storage: {
        title: "7 dni przechowania gratis",
        body:
          "Nie możesz odebrać felg od razu? Przechowujemy je bezpłatnie do 7 dni.",
        imageAlt: "Magazyn felg",
      },
      parking: {
        title: "Bezpieczeństwo",
        body:
          "Ogrodzony teren z monitoringiem. Twoje felgi są pod kontrolą.",
        imageAlt: "Monitoring na terenie studia",
      },
      experience: {
        title: "Ponad 10 lat doświadczenia",
        body:
          "Od 2014 roku renowujemy i lakierujemy felgi. Wiemy, jak radzić sobie ze skomplikowanymi uszkodzeniami i doprowadzać efekt do fabrycznego poziomu.",
        imageAlt: "Mistrz przy pracy nad felgą",
      },
    },
    hub: {
      brand: "rim/studio",
      tagline: "Renowacja bez niespodzianek",
      heroImageAlt: "Odrestaurowane i polakierowane felgi",
      steps: {
        diagnostics: { label: "Diagnostyka" },
        agreement: { label: "Uzgodnienie" },
        work: { label: "Praca" },
        result: { label: "Efekt" },
      },
    },
    cta: {
      label: "Umów diagnostykę felg",
      href: "/contact",
    },
    cardsSlider: {
      ariaLabel: "Atuty studia",
      prevLabel: "Poprzedni atut",
      nextLabel: "Następny atut",
    },
  },
  aboutSection: {
    eyebrow: "O studiu",
    heading: "Renowacja felg",
    lead:
      "Ponad 10 lat w renowacji felg: od lokalnych napraw po pełny cykl lakierowania w Warszawie. Znamy proces w detalach i doprowadzamy każdy komplet do fabrycznego wyglądu.",
    cta: {
      label: "Umów diagnostykę felg",
      href: "/contact",
    },
    founder: {
      role: "Założyciel",
      name: "Giorgi",
    },
    approach: {
      label: "Nasze podejście",
      titleStart: "Bez kompromisów",
      titleAccent: "w jakości.",
      body:
        "Precyzyjne przygotowanie, kontrola geometrii i lakierowanie technologiczne — bez pośpiechu i „kosmetyki”. Efekt, który można pokazać.",
    },
    pillars: [
      {
        id: "cycle",
        title: "Pełen cykl prac",
        body:
          "Demontaż, renowacja, lakierowanie, suszenie i montaż — w jednym studio, bez podwykonawców.",
      },
      {
        id: "premium",
        title: "Premium efekt",
        body:
          "Dobór koloru i faktury do fabryki lub Twojej referencji — równa powłoka bez smug.",
      },
      {
        id: "timing",
        title: "1–4 dni na komplet",
        body:
          "Podajemy termin przed startem i go dotrzymujemy — bez niespodzianek w trakcie.",
      },
      {
        id: "parking",
        title: "Parking na terenie",
        body:
          "Brak zapasowego kompletu — zostaw auto u nas, gdy lakierujemy felgi.",
      },
    ],
    pillarsSlider: {
      ariaLabel: "Kluczowe atuty studia",
      prevLabel: "Poprzednia karta",
      nextLabel: "Następna karta",
    },
    journey: {
      label: "Moja droga",
      milestones: [
        {
          year: "2014",
          title: "Początek kierunku",
          body: "Przygotowanie i lokalna naprawa",
        },
        {
          year: "2016",
          title: "Renowacja felg",
          body: "Dealerzy i klienci indywidualni",
        },
        {
          year: "2019",
          title: "Kabina lakiernicza",
          body: "Technologie proszkowe i suszenie",
        },
        {
          year: "2022",
          title: "rim/studio",
          body: "Lakierowanie, naprawa i montaż opon w jednym studio",
        },
      ],
    },
  },
  process: {
    eyebrow: "Jak wygląda",
    titleStrong: "praca",
    lead: "Przejrzysto i jasno na każdym etapie",
    intro:
      "Wiesz, co robimy, ile to kosztuje i kiedy będzie gotowe — jeszcze przed rozpoczęciem prac",
    carouselAriaLabel: "Etapy pracy rim/studio",
    prevLabel: "Poprzedni etap",
    nextLabel: "Następny etap",
    cta: {
      label: "Umów diagnostykę felg",
      href: "/contact",
    },
    steps: [
      {
        id: "diagnostics",
        label: "Diagnostyka",
        tagline: "Oceniamy stan felg i wykrywamy uszkodzenia",
        description:
          "Przesyłasz zdjęcia lub przywozisz felgi do rim/studio. Sprawdzamy stan i ustalamy zakres prac.",
        imageAlt: "Diagnostyka felg na stanowisku",
      },
      {
        id: "agreement",
        label: "Uzgodnienie",
        tagline: "Z góry znasz koszt i termin",
        description:
          "Omawiamy wariant renowacji, kolor i wykończenie. Przed startem ustalamy dokładną cenę i termin realizacji.",
        imageAlt: "Uzgodnienie koloru z klientem",
      },
      {
        id: "restoration",
        label: "Renowacja",
        tagline: "Profesjonalna praca na każdym etapie",
        description:
          "Felgi przechodzą pełny cykl: naprawa, przygotowanie powierzchni, lakierowanie i wykończenie. Każdy etap według sprawdzonych technologii i z kontrolą jakości.",
        imageAlt: "Renowacja i lakierowanie felgi",
      },
      {
        id: "delivery",
        label: "Kontrola i odbiór",
        tagline: "Odbierasz gotowy komplet i wiesz, za co płacisz",
        description:
          "Sprawdzamy efekt, montujemy opony (jeśli trzeba) i przekazujemy komplet. Płatność po zakończeniu prac.",
        imageAlt: "Odbiór kompletu i płatność",
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
  visitMap: {
    title: "Zapis i kontakt",
    contactsEyebrow: "Studio",
    contactsTitle: "Jak nas znaleźć",
    bookingEyebrow: "Serwis",
    hoursLabel: "Godziny otwarcia",
    hoursValue: "Pn–Sb · 9:00–19:00",
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
