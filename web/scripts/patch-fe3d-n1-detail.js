const fs = require("fs");
const path = require("path");

const detailCz = {
  title: "Noblelift Řada N1 — detailní popis",
  intro:
    "Řada N1 (FE3D16N1, FE3D18N1, FE3D20N1) jsou kompaktní tříkolové elektrické vysokozdvižné vozíky určené především pro vnitřní provozy. Díky malému poloměru otáčení nabízejí maximální manévrovatelnost i ve velmi stísněných prostorách a úzkých skladových uličkách.",
  features: {
    "1": {
      title: "Maximální manévrovatelnost",
      desc: "Velmi malý poloměr otáčení a kompaktní rozměry pro práci v úzkých uličkách",
    },
    "2": {
      title: "Dvojitý pohon předních kol",
      desc: "Vysoký výkon, tichý provoz a výborná ovladatelnost",
    },
    "3": {
      title: "80V Li-Ion baterie",
      desc: "Bezúdržbová baterie s dlouhou životností, nulové lokální emise a nízké provozní náklady",
    },
    "4": {
      title: "Komfort obsluhy",
      desc: "Ergonomické pracoviště vhodné pro každodenní provoz v hale",
    },
  },
  specs: {
    capacity: { label: "Nosnosti", value: "1,6 / 1,8 / 2,0 t" },
    models: { label: "Modely", value: "FE3D16N1 / FE3D18N1 / FE3D20N1" },
    lift: { label: "Výšky zdvihu", value: "2 500–6 500 mm" },
    battery: { label: "Baterie", value: "80 V Li-Ion" },
    drive: { label: "Pohon", value: "Dvojitý pohon předních kol" },
    operation: { label: "Provoz", value: "Vnitřní / tříkolový elektrický" },
  },
  audience: {
    title: "Pro koho je řada N1 určena?",
    items: {
      "1": "Sklady s úzkými uličkami",
      "2": "Výrobní provozy s omezeným prostorem",
      "3": "Logistická centra",
      "4": "Nakládka a vykládka kamionů",
      "5": "Provozy, kde je prioritou maximální obratnost",
      "6": "Zákazníci s potřebou nosnosti do 2 t",
    },
  },
  advantages: {
    title: "Hlavní přednosti a další výhody",
    items: {
      "1": "Maximální manévrovatelnost díky velmi malému poloměru otáčení",
      "2": "Kompaktní konstrukce pro úzké uličky a malé prostory",
      "3": "Vysoký výkon díky dvojitému pohonu předních kol",
      "4": "Tichý provoz a nulové lokální emise",
      "5": "Bezúdržbová 80V Li-Ion baterie s dlouhou životností",
      "6": "Nízké provozní náklady",
      "7": "Vysoký komfort pro obsluhu",
    },
  },
  benefits: {
    title: "Přínos pro zákazníka",
    items: {
      "1": "Efektivní práce ve stísněných prostorách",
      "2": "Snadné otáčení mezi regály",
      "3": "Komfort a výkon klasického čelního vozíku v kompaktním provedení",
    },
  },
  recommend: {
    whenTitle: "Kdy řadu N1 doporučit?",
    when: {
      "1": "Práce probíhá uvnitř",
      "2": "Je potřeba vysoká manévrovatelnost",
      "3": "Manipulace v úzkých uličkách",
      "4": "Nosnosti do 2 t",
      "5": "Výrobní provozy, logistická centra, nakládka a vykládka kamionů",
    },
    otherTitle: "Kdy doporučit jinou řadu?",
    other: {
      "1": "Častý venkovní provoz",
      "2": "Potřeba vyšší nosnosti než 2 t",
      "3": "Nerovný povrch",
    },
  },
  equipment: {
    title: "Výbava",
    standard:
      "Integrovaná nabíječka, předehřev baterie, Blue Spot, komfortní sedačka, USB port, LED osvětlení, barevný display, zadní madlo s klaksonem, hydraulické páky, 4sekční rozvaděč, nešpinící SE pneumatiky, panoramatické zrcátko.",
    optional:
      "Fingertip joystick, plná kabina, ZF převodovka s elektronickou parkovací brzdou, HSV (Hydraulic Selector Valve), externí nabíječka.",
  },
  argument:
    "Řada N1 je kompaktní tříkolový elektrický vozík pro vnitřní provozy, kde je klíčová maximální manévrovatelnost. S nosnostmi 1,6–2,0 t, zdvihem 2 500–6 500 mm a bezúdržbovou 80V Li-Ion baterií nabízí výkon, tichý provoz a nízké provozní náklady i ve velmi stísněných skladových uličkách.",
};

const detailEn = {
  title: "Noblelift Series N1 — detailed description",
  intro:
    "Series N1 (FE3D16N1, FE3D18N1, FE3D20N1) are compact three-wheel electric counterbalance forklifts designed primarily for indoor use. With a small turning radius they deliver maximum manoeuvrability even in very confined spaces and narrow warehouse aisles.",
  features: {
    "1": {
      title: "Maximum manoeuvrability",
      desc: "Very small turning radius and compact dimensions for work in narrow aisles",
    },
    "2": {
      title: "Dual powered front wheels",
      desc: "High performance, quiet operation and excellent handling",
    },
    "3": {
      title: "80V Li-Ion battery",
      desc: "Maintenance-free battery with long life, zero local emissions and low operating costs",
    },
    "4": {
      title: "Operator comfort",
      desc: "Ergonomic workplace suited to everyday indoor operation",
    },
  },
  specs: {
    capacity: { label: "Capacities", value: "1.6 / 1.8 / 2.0 t" },
    models: { label: "Models", value: "FE3D16N1 / FE3D18N1 / FE3D20N1" },
    lift: { label: "Lift heights", value: "2,500–6,500 mm" },
    battery: { label: "Battery", value: "80 V Li-Ion" },
    drive: { label: "Drive", value: "Dual powered front wheels" },
    operation: { label: "Application", value: "Indoor / three-wheel electric" },
  },
  audience: {
    title: "Who is Series N1 for?",
    items: {
      "1": "Warehouses with narrow aisles",
      "2": "Production sites with limited space",
      "3": "Logistics centres",
      "4": "Truck loading and unloading",
      "5": "Sites where maximum manoeuvrability is the priority",
      "6": "Customers needing capacities up to 2 t",
    },
  },
  advantages: {
    title: "Key advantages and further benefits",
    items: {
      "1": "Maximum manoeuvrability thanks to a very small turning radius",
      "2": "Compact design for narrow aisles and small spaces",
      "3": "High performance from dual powered front wheels",
      "4": "Quiet operation and zero local emissions",
      "5": "Maintenance-free 80V Li-Ion battery with long service life",
      "6": "Low operating costs",
      "7": "High operator comfort",
    },
  },
  benefits: {
    title: "Customer benefits",
    items: {
      "1": "Efficient work in confined spaces",
      "2": "Easy turning between racks",
      "3": "The comfort and performance of a counterbalance truck in a compact format",
    },
  },
  recommend: {
    whenTitle: "When to recommend Series N1?",
    when: {
      "1": "Indoor work",
      "2": "High manoeuvrability is required",
      "3": "Handling in narrow aisles",
      "4": "Capacities up to 2 t",
      "5": "Manufacturing plants, logistics centres, truck loading and unloading",
    },
    otherTitle: "When to recommend another range?",
    other: {
      "1": "Frequent outdoor use",
      "2": "Need for capacities above 2 t",
      "3": "Uneven surfaces",
    },
  },
  equipment: {
    title: "Equipment",
    standard:
      "Integrated charger, battery preheating, Blue Spot, comfort seat, USB port, LED lighting, colour display, rear handle with horn, hydraulic levers, 4-section valve, non-marking SE tires, panoramic mirror.",
    optional:
      "Fingertip joystick, full cabin, ZF transmission with electronic parking brake, HSV (Hydraulic Selector Valve), external charger.",
  },
  argument:
    "Series N1 is a compact three-wheel electric truck for indoor sites where maximum manoeuvrability is essential. With capacities of 1.6–2.0 t, lift heights from 2,500–6,500 mm and a maintenance-free 80V Li-Ion battery, it delivers performance, quiet operation and low running costs even in very tight warehouse aisles.",
};

function patch(file, detail) {
  const p = path.join(__dirname, "..", "messages", file);
  const data = JSON.parse(fs.readFileSync(p, "utf8"));
  if (!data.productsCatalog.series.fe3d) {
    data.productsCatalog.series.fe3d = {};
  }
  data.productsCatalog.series.fe3d.detail = detail;
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
  console.log("patched", file);
}

patch("cz.json", detailCz);
patch("en.json", detailEn);
