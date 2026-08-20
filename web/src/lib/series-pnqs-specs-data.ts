export type SeriesDetailPdfContent = {
  title: string;
  subtitle: string;
  intro: string;
  featuresTitle: string;
  features: readonly { title: string; desc: string }[];
  specsTitle: string;
  specs: readonly { label: string; value: string }[];
  modelsTitle: string;
  models: readonly string[];
  distributor: string;
};

export const SERIE_P_PDF_CONTENT: Record<"cz" | "en", SeriesDetailPdfContent> = {
  cz: {
    title: "Noblelift Série P — technické parametry",
    subtitle: "Premium | Elektrické čelní vozíky s lithiovou baterií",
    intro:
      "Série P přináší nejvyšší výbavovou úroveň elektrických čelních vozíků Noblelift. LCD displej, odpružené sedadlo, 4cestná hydraulika a nativní podpora lithiových baterií pro rychlé mezisměnné nabíjení bez výměny baterie.",
    featuresTitle: "Klíčové vlastnosti",
    features: [
      { title: "LCD displej", desc: "Velký rámový LCD displej v zorném poli operátora pro lepší bezpečnost" },
      { title: "Lithium nativně", desc: "Konstruováno pro lithiové baterie — rychlé nabíjení za provozu" },
      { title: "Ergonomická kabina", desc: "Prostorná kabina s deluxe odpruženým sedadlem, nastavitelná pro všechny velikosti operátorů" },
      { title: "4cestná hydraulika", desc: "Integrovaný postranní posuv pro přesnou manipulaci bez přejezdů" },
    ],
    specsTitle: "Technické parametry",
    specs: [
      { label: "Nosnost", value: "3,0 - 3,8 t" },
      { label: "Pohon", value: "Elektrický AC" },
      { label: "Baterie", value: "48–80 V Li" },
      { label: "Max. zdvih", value: "do 7 500 mm" },
      { label: "Displej", value: "LCD rámový" },
      { label: "Provoz", value: "Vnitřní / smíšený" },
    ],
    modelsTitle: "Modely v nabídce",
    models: ["FEP 30 - 38 P"],
    distributor: "VZV GROUP s.r.o. | noblelift.cz",
  },
  en: {
    title: "Noblelift Series P — technical parameters",
    subtitle: "Premium | Lithium electric counterbalance forklifts",
    intro:
      "Series P delivers the highest equipment level among Noblelift electric counterbalance forklifts. LCD display, cushioned seat, four-way hydraulics and native lithium battery support enable fast opportunity charging without battery swapping.",
    featuresTitle: "Key features",
    features: [
      { title: "LCD display", desc: "Large frame LCD display in the operator's field of view for improved safety" },
      { title: "Native lithium", desc: "Designed for lithium batteries — fast charging during operation" },
      { title: "Ergonomic cabin", desc: "Spacious cabin with deluxe cushioned seat, adjustable for all operator sizes" },
      { title: "Four-way hydraulics", desc: "Integrated side shift for precise handling without repositioning" },
    ],
    specsTitle: "Technical parameters",
    specs: [
      { label: "Capacity", value: "3.0 - 3.8 t" },
      { label: "Drive", value: "Electric AC" },
      { label: "Battery", value: "48–80 V Li" },
      { label: "Max. lift", value: "up to 7,500 mm" },
      { label: "Display", value: "Frame LCD" },
      { label: "Application", value: "Indoor / mixed" },
    ],
    modelsTitle: "Available models",
    models: ["FEP 30 - 38 P"],
    distributor: "VZV GROUP s.r.o. | noblelift.cz",
  },
};

export const SERIE_N_PDF_CONTENT: Record<"cz" | "en", SeriesDetailPdfContent> = {
  cz: {
    title: "Noblelift Série N — technické parametry",
    subtitle: "Tříkolové N1 | Elektrické čelní vozíky pro úzké uličky",
    intro:
      "Řada N1 představuje kompaktní tříkolové elektrické vysokozdvižné vozíky určené především pro práci v interiéru. Díky tříkolové konstrukci vyniká mimořádnou obratností a snadnou manipulací i ve velmi omezených prostorech. Malý poloměr otáčení umožňuje práci v úzkých uličkách a efektivní otáčení mezi regály.",
    featuresTitle: "Klíčové vlastnosti",
    features: [
      {
        title: "Maximální obratnost",
        desc: "Kompaktní rozměry a malý poloměr otáčení pro manévrování v úzkých uličkách",
      },
      {
        title: "Dvojice poháněných předních kol",
        desc: "Vysoký výkon, tichý provoz a vynikající manévrovatelnost",
      },
      {
        title: "80V Li-Ion baterie",
        desc: "Bezúdržbová baterie s dlouhou životností, nulové lokální emise a nízké provozní náklady",
      },
      {
        title: "Komfort obsluhy",
        desc: "Ergonomické pracoviště vhodné do hal a každodenního vnitřního provozu",
      },
    ],
    specsTitle: "Technické parametry",
    specs: [
      { label: "Nosnost", value: "1,6–1,8–2,0 t" },
      { label: "Konstrukce", value: "Tříkolová" },
      { label: "Baterie", value: "80 V Li-Ion" },
      { label: "Modely", value: "FE3D16N1 / FE3D18N1 / FE3D20N1" },
      { label: "Výška zdvihu", value: "2 500–6 500 mm" },
      { label: "Provoz", value: "Vnitřní" },
    ],
    modelsTitle: "Modely v nabídce",
    models: [
      "FE3D16N1 — Li-Ion, volný zdvih, duplex / triplex, LED displej",
      "FE3D18N1",
      "FE3D20N1 — Li-Ion, volný zdvih, triplex, fingertip",
    ],
    distributor: "VZV GROUP s.r.o. | noblelift.cz",
  },
  en: {
    title: "Noblelift Series N — technical parameters",
    subtitle: "Three-wheel N1 | Electric forklifts for narrow aisles",
    intro:
      "The N1 range offers compact three-wheel electric counterbalance forklifts designed primarily for indoor use. The three-wheel design delivers exceptional manoeuvrability even in very confined spaces. A small turning radius enables work in narrow aisles and efficient turning between racks.",
    featuresTitle: "Key features",
    features: [
      {
        title: "Maximum manoeuvrability",
        desc: "Compact dimensions and a small turning radius for narrow-aisle manoeuvring",
      },
      {
        title: "Dual powered front wheels",
        desc: "High performance, quiet operation and excellent handling",
      },
      {
        title: "80V Li-Ion battery",
        desc: "Maintenance-free battery with long life, zero local emissions and low operating costs",
      },
      {
        title: "Operator comfort",
        desc: "Ergonomic workplace suited to halls and everyday indoor operation",
      },
    ],
    specsTitle: "Technical parameters",
    specs: [
      { label: "Capacity", value: "1.6–1.8–2.0 t" },
      { label: "Design", value: "Three-wheel" },
      { label: "Battery", value: "80 V Li-Ion" },
      { label: "Models", value: "FE3D16N1 / FE3D18N1 / FE3D20N1" },
      { label: "Lift height", value: "2,500–6,500 mm" },
      { label: "Application", value: "Indoor" },
    ],
    modelsTitle: "Available models",
    models: [
      "FE3D16N1 — Li-Ion, free lift, duplex / triplex, LED display",
      "FE3D18N1",
      "FE3D20N1 — Li-Ion, free lift, triplex, fingertip",
    ],
    distributor: "VZV GROUP s.r.o. | noblelift.cz",
  },
};

export const SERIE_Q_PDF_CONTENT: Record<"cz" | "en", SeriesDetailPdfContent> = {
  cz: {
    title: "Noblelift Série Q — technické parametry",
    subtitle: "Těžká třída | Průmyslové elektrické čelní vozíky",
    intro:
      "Série Q pokrývá potřeby těžkého průmyslu s nosností od 2 do 10 tun. Masivní ocelová konstrukce, rozšířená přední náprava pro stabilitu a výkonné AC motory zajišťují spolehlivý provoz i v nejnáročnějších podmínkách.",
    featuresTitle: "Klíčové vlastnosti",
    features: [
      { title: "Těžká ocelová konstrukce", desc: "Zesílené šasi, nápravy a stožár pro extrémní zatížení a výšky zdvihu" },
      { title: "Vysoký výkon motorů", desc: "Výkonné třífázové AC motory pro rychlost zdvihu i při maximálním zatížení" },
      { title: "Rozšířená stabilizace", desc: "Široká rozchod náprav a nízké těžiště pro práci s těžkými náklady ve výšce" },
      { title: "Servisní přístupnost", desc: "Vzduchově odpružené kapoty pro rychlý přístup ke komponentám" },
    ],
    specsTitle: "Technické parametry",
    specs: [
      { label: "Nosnost", value: "2–10 t" },
      { label: "Pohon", value: "Elektrický AC" },
      { label: "Napětí", value: "80 V / 96 V" },
      { label: "Max. zdvih", value: "do 9 000 mm" },
      { label: "Pneumatiky", value: "Plné / pneumatické" },
      { label: "Provoz", value: "Vnitřní / smíšený" },
    ],
    modelsTitle: "Modely v nabídce",
    models: ["FE4P 20 Q", "FE4P 50 Q", "FE4P 50 QL"],
    distributor: "VZV GROUP s.r.o. | noblelift.cz",
  },
  en: {
    title: "Noblelift Series Q — technical parameters",
    subtitle: "Heavy duty | Industrial electric counterbalance forklifts",
    intro:
      "Series Q covers heavy industry needs with capacities from 2 to 10 tonnes. Massive steel construction, extended front axle for stability and powerful AC motors ensure reliable operation even in the most demanding conditions.",
    featuresTitle: "Key features",
    features: [
      { title: "Heavy steel construction", desc: "Reinforced chassis, axles and mast for extreme loads and lift heights" },
      { title: "High motor output", desc: "Powerful three-phase AC motors for lift speed even at maximum load" },
      { title: "Extended stability", desc: "Wide wheelbase and low centre of gravity for heavy loads at height" },
      { title: "Service accessibility", desc: "Air-suspended hoods for quick access to components" },
    ],
    specsTitle: "Technical parameters",
    specs: [
      { label: "Capacity", value: "2–10 t" },
      { label: "Drive", value: "Electric AC" },
      { label: "Voltage", value: "80 V / 96 V" },
      { label: "Max. lift", value: "up to 9,000 mm" },
      { label: "Tyres", value: "Pneumatic" },
      { label: "Application", value: "Indoor / mixed" },
    ],
    modelsTitle: "Available models",
    models: ["FE4P 20 Q", "FE4P 50 Q", "FE4P 50 QL"],
    distributor: "VZV GROUP s.r.o. | noblelift.cz",
  },
};

export const SERIES_DETAIL_PDF_CONTENT = {
  "serie-p": SERIE_P_PDF_CONTENT,
  "serie-n": SERIE_N_PDF_CONTENT,
  "serie-q": SERIE_Q_PDF_CONTENT,
} as const;

export type SeriesDetailPdfId = keyof typeof SERIES_DETAIL_PDF_CONTENT;
