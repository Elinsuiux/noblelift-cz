const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "messages");

function patch(file, updates) {
  const p = path.join(dir, file);
  const data = JSON.parse(fs.readFileSync(p, "utf8"));

  function set(obj, keyPath, value) {
    const parts = keyPath.split(".");
    let cur = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!(parts[i] in cur)) cur[parts[i]] = {};
      cur = cur[parts[i]];
    }
    cur[parts[parts.length - 1]] = value;
  }

  for (const [key, value] of Object.entries(updates)) {
    set(data, key, value);
  }

  fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
  console.log("patched", file);
}

const cz = {
  "meta.title": "Noblelift | Manipulační technika | VZV GROUP s.r.o.",
  "meta.description":
    "VZV GROUP s.r.o. – výhradní dovozce Noblelift pro ČR a SR. Prodej manipulační techniky, záruční i pozáruční servis a originální náhradní díly skladem. Poptávka online.",
  "hero.carousel.altWarehouse":
    "Sklad s manipulační technikou Noblelift – vysokozdvižné vozíky a regály",
  "hero.carousel.altForklift":
    "Čelní vysokozdvižný vozík Noblelift při práci ve skladu",
  "servicePage.meta.description":
    "Autorizovaný servis Noblelift a originální díly skladem. Záruční i pozáruční opravy v ČR a SR, rychlá expedice a přímá podpora výrobce přes VZV GROUP. Objednejte zásah.",
  "contactPage.meta.description":
    "Kontaktujte VZV GROUP – obchod, servis a náhradní díly Noblelift. Formulář, obchodní zástupci a sklady v Červené Vodě a Praze pro zákazníky z ČR a SR.",
  "aboutPage.meta.description":
    "O VZV GROUP a značce Noblelift: výhradní zastoupení pro ČR a SR, historie výrobce od roku 1996, sortiment manipulační techniky, servis a odborné poradenství.",
  "legalPrivacy.meta.description":
    "Zásady zpracování osobních údajů na noblelift.cz. Jak VZV GROUP s.r.o. zpracovává data z formulářů, cookies a komunikace a jaká máte práva jako subjekt údajů.",
  "legalCookies.meta.description":
    "Informace o cookies na noblelift.cz: nezbytné a volitelné cookies, účel použití, správa souhlasu a jak VZV GROUP s.r.o. chrání vaše soukromí při návštěvě webu.",
  "legalTerms.meta.description":
    "Obchodní podmínky VZV GROUP s.r.o. pro nabídku, prodej, dodání, servis a náhradní díly techniky Noblelift prostřednictvím webu noblelift.cz. Přečtěte si podmínky.",
  "legalCompany.meta.description":
    "Identifikační údaje VZV GROUP s.r.o. – provozovatel noblelift.cz a výhradní dovozce Noblelift pro ČR a SR. IČO, sídlo, kontakty a obchodní informace.",
  "productsCatalog.meta.hub.description":
    "Katalog Noblelift: čelní vozíky, zakladače, paletové vozíky, retraky, terénní stroje a plošiny. Výhradní dovozce VZV GROUP – nabídka, dodání a servis pro ČR a SR.",
  "categories.items.1.desc":
    "Tří- a čtyřkolové elektrické i dieselové/LPG čelní vozíky Noblelift. Lithiové verze (Li-Ion), nosnost typicky 1,2–10 t – pro sklady, výrobu i venkovní areály. Poptávka online.",
  "categories.items.2.desc":
    "Elektrické zakladače Noblelift s pěší obsluhou i s plošinou. Kompaktní konstrukce, vysoká zbytková nosnost a zdvih až 13 m. VZV GROUP – prodej a servis v ČR a SR.",
  "categories.items.3.desc":
    "Ruční a elektrické paletové vozíky Noblelift – pěší i řidičské. Varianty s vážením, nízkým vstupem a lithiovým pohonem pro každodenní manipulaci ve skladu. Poptávka online.",
  "categories.items.4.desc":
    "Dieselové terénní vozíky a teleskopické manipulátory Noblelift pro stavebnictví a zemědělství. Samostatná jízda na nerovném terénu. Nabídka a servis od VZV GROUP.",
  "categories.items.5.desc":
    "Retraky a vychystávací vozíky Noblelift pro vysoké regály až 13 m. Úzké uličky, double-deep a efektivní stohování. Prodej a servis VZV GROUP pro ČR a SR.",
  "categories.items.6.desc":
    "Elektrické nůžkové pracovní plošiny Noblelift pro bezpečnou práci ve výšce – údržba, montáže a sklad. Stabilní platforma a tichý provoz. Poptávka u VZV GROUP.",
};

const en = {
  "meta.title": "Noblelift | Material handling | VZV GROUP s.r.o.",
  "meta.description":
    "VZV GROUP s.r.o. – exclusive Noblelift importer for CZ and SK. Buy forklifts and warehouse equipment with warranty service and genuine spare parts in stock. Request a quote.",
  "hero.carousel.altWarehouse":
    "Warehouse with Noblelift material handling equipment – forklifts and racking",
  "hero.carousel.altForklift":
    "Noblelift counterbalance forklift operating in a warehouse",
  "servicePage.meta.description":
    "Authorized Noblelift service and genuine parts in stock. Warranty and post-warranty repairs in CZ and SK, fast dispatch and factory support via VZV GROUP. Book service.",
  "contactPage.meta.description":
    "Contact VZV GROUP for Noblelift sales, service and spare parts. Use the form, reach sales reps, or visit warehouses in Červená Voda and Prague serving CZ and SK.",
  "aboutPage.meta.description":
    "About VZV GROUP and Noblelift: exclusive representation for CZ and SK, manufacturer heritage since 1996, full material-handling range, service and expert advice.",
  "legalPrivacy.meta.description":
    "Personal data processing policy for noblelift.cz. How VZV GROUP s.r.o. handles form, cookie and communication data and what rights you have as a data subject.",
  "legalCookies.meta.description":
    "Cookie information for noblelift.cz: necessary and optional cookies, their purposes, consent management and how VZV GROUP s.r.o. protects your privacy on the site.",
  "legalTerms.meta.description":
    "Terms and conditions of VZV GROUP s.r.o. for offers, sales, delivery, service and spare parts for Noblelift equipment via noblelift.cz. Read the full terms.",
  "legalCompany.meta.description":
    "Company details for VZV GROUP s.r.o. – operator of noblelift.cz and exclusive Noblelift importer for CZ and SK. Company ID, address and contact information.",
  "productsCatalog.meta.hub.description":
    "Noblelift catalogue: counterbalance forklifts, stackers, pallet trucks, reach trucks, rough-terrain machines and platforms. Exclusive importer VZV GROUP for CZ and SK.",
  "categories.items.1.desc":
    "Three- and four-wheel electric and diesel/LPG Noblelift counterbalance forklifts. Li-Ion options, typical capacities 1.2–10 t for warehouses, production and yards. Request a quote.",
  "categories.items.2.desc":
    "Electric Noblelift stackers – pedestrian and platform models. Compact design, high residual capacity and lift height up to 13 m. Sales and service by VZV GROUP in CZ and SK.",
  "categories.items.3.desc":
    "Manual and electric Noblelift pallet trucks – walkie and rider. Scale, low-entry and Li-Ion variants for everyday warehouse pallet handling. Request a quote online.",
  "categories.items.4.desc":
    "Diesel rough-terrain forklifts and Noblelift telehandlers for construction and agriculture. Independent travel on uneven ground. Sales and service from VZV GROUP.",
  "categories.items.5.desc":
    "Noblelift reach trucks and order pickers for high racks up to 13 m. Narrow-aisle, double-deep and efficient stacking. Sales and service by VZV GROUP for CZ and SK.",
  "categories.items.6.desc":
    "Electric Noblelift scissor lifts for safe work at height – maintenance, assembly and warehouse jobs. Stable platform and quiet indoor operation. Request a quote.",
};

patch("cz.json", cz);
patch("en.json", en);

// lengths report
function len(s) {
  return [...s].length;
}
console.log("\nLengths CZ:");
for (const [k, v] of Object.entries(cz)) {
  if (k.endsWith("description") || k.endsWith(".desc")) console.log(len(v), k);
}
console.log("\nLengths EN:");
for (const [k, v] of Object.entries(en)) {
  if (k.endsWith("description") || k.endsWith(".desc")) console.log(len(v), k);
}
