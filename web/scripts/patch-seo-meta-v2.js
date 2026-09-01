const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "..", "messages");

function set(obj, keyPath, value) {
  const parts = keyPath.split(".");
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = value;
}

function patch(file, updates) {
  const p = path.join(dir, file);
  const data = JSON.parse(fs.readFileSync(p, "utf8"));
  for (const [k, v] of Object.entries(updates)) set(data, k, v);
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
}

const cz = {
  "meta.description":
    "VZV GROUP – výhradní dovozce Noblelift pro ČR a SR. Prodej manipulační techniky, záruční i pozáruční servis a originální náhradní díly skladem. Poptávka online.",
  "servicePage.meta.description":
    "Autorizovaný servis Noblelift a originální díly skladem. Záruční i pozáruční opravy v ČR a SR, rychlá expedice a podpora výrobce přes VZV GROUP. Objednejte zásah.",
  "legalTerms.meta.description":
    "Obchodní podmínky VZV GROUP s.r.o. pro nabídku, prodej, dodání, servis a náhradní díly techniky Noblelift na webu noblelift.cz. Přečtěte si podmínky.",
  "productsCatalog.meta.hub.description":
    "Katalog Noblelift: čelní vozíky, zakladače, paletové vozíky, retraky, terénní stroje a plošiny. VZV GROUP – nabídka, dodání a servis pro ČR a SR.",
  "categories.items.1.desc":
    "Elektrické i dieselové/LPG čelní vozíky Noblelift. Lithiové verze (Li-Ion), nosnost typicky 1,2–10 t – sklady, výroba i venkovní areály. Poptávka online.",
  "categories.items.2.desc":
    "Elektrické zakladače Noblelift s pěší obsluhou i s plošinou. Kompaktní konstrukce, vysoká zbytková nosnost a zdvih až 13 m. Prodej a servis VZV GROUP.",
  "categories.items.3.desc":
    "Ruční a elektrické paletové vozíky Noblelift – pěší i řidičské. Vážení, nízký vstup a lithiový pohon pro každodenní skladovou manipulaci. Poptávka online.",
  "categories.items.4.desc":
    "Dieselové terénní vozíky a teleskopické manipulátory Noblelift pro stavebnictví a zemědělství. Jízda na nerovném terénu. Nabídka a servis VZV GROUP.",
  // subcategory SEO-oriented descs used as meta
  "productsCatalog.categories.1.subcategories.electric.desc":
    "Elektrické čelní vozíky Noblelift – tříkolové i čtyřkolové, včetně Li-Ion. Pro sklady a výrobu. Prodej, dodání a servis VZV GROUP v ČR a SR. Poptávka online.",
  "productsCatalog.categories.1.subcategories.dieselLpg.desc":
    "Dieselové a LPG čelní vozíky Noblelift pro venkovní i smíšený provoz. Robustní konstrukce, vysoká nosnost. Nabídka a servis od VZV GROUP – poptávka online.",
  "productsCatalog.categories.2.subcategories.walkie.desc":
    "Elektrické zakladače Noblelift s pěší obsluhou pro úzké uličky a krátké přesuny. Ideální do menších skladů. Prodej a servis VZV GROUP – poptávka online.",
  "productsCatalog.categories.2.subcategories.rider.desc":
    "Zakladače Noblelift s plošinou operátora pro delší trasy ve skladu. Vyšší produktivita a komfort. VZV GROUP – prodej, dodání a servis v ČR a SR.",
  "productsCatalog.categories.2.subcategories.straddle.desc":
    "Obkročné zakladače Noblelift pro nestandardní palety a širší náklady. Flexibilní nastavení ramen. Prodej a servis VZV GROUP – poptávka online.",
  "productsCatalog.categories.3.subcategories.manual.desc":
    "Ruční paletové vozíky Noblelift pro každodenní přepravu palet. Spolehlivá konstrukce a rychlá dostupnost u VZV GROUP v ČR a SR. Poptávka online.",
  "productsCatalog.categories.3.subcategories.powered.desc":
    "Elektrické paletové vozíky Noblelift – pěší i řidičské. Li-Ion, vážení a nízký vstup. Pro intenzivní skladový provoz. Prodej a servis VZV GROUP.",
  "productsCatalog.categories.4.subcategories.terrainForklifts.desc":
    "Terénní dieselové vozíky Noblelift pro stavebnictví a venkovní areály. Jízda na nerovném povrchu. Nabídka a servis VZV GROUP – poptávka online.",
  "productsCatalog.categories.4.subcategories.telehandlers.desc":
    "Teleskopické manipulátory Noblelift pro stavebnictví a zemědělství. Dosah a nosnost pro náročný terén. Prodej a servis VZV GROUP v ČR a SR.",
  "productsCatalog.categories.5.subcategories.reachTrucks.desc":
    "Retraky Noblelift pro úzké uličky a regály až 13 m. Vysoká zbytková nosnost a efektivní stohování. Prodej a servis VZV GROUP – poptávka online.",
  "productsCatalog.categories.5.subcategories.orderPickers.desc":
    "Vychystávací vozíky Noblelift pro efektivní picking v regálových skladech. Bezpečná práce ve výšce. Prodej a servis VZV GROUP v ČR a SR.",
  "productsCatalog.categories.6.subcategories.scissor.desc":
    "Elektrické nůžkové plošiny Noblelift pro údržbu, montáže a sklad. Stabilní platforma a tichý provoz. Nabídka a servis VZV GROUP – poptávka online.",
};

const en = {
  "meta.description":
    "VZV GROUP – exclusive Noblelift importer for CZ and SK. Forklifts and warehouse equipment with warranty service and genuine spare parts in stock. Request a quote.",
  "servicePage.meta.description":
    "Authorized Noblelift service and genuine parts in stock. Warranty and post-warranty repairs in CZ and SK, fast dispatch via VZV GROUP. Book a service visit.",
  "contactPage.meta.description":
    "Contact VZV GROUP for Noblelift sales, service and spare parts. Form, sales reps and warehouses in Červená Voda and Prague for CZ and SK customers.",
  "aboutPage.meta.description":
    "About VZV GROUP and Noblelift: exclusive representation for CZ and SK, manufacturer heritage since 1996, full range, service and expert advice. Learn more.",
  "legalCookies.meta.description":
    "Cookie policy for noblelift.cz: necessary and optional cookies, purposes, consent controls and how VZV GROUP s.r.o. protects your privacy on the site.",
  "productsCatalog.meta.hub.description":
    "Noblelift catalogue: counterbalance forklifts, stackers, pallet trucks, reach trucks, rough-terrain machines and platforms. VZV GROUP for CZ and SK.",
  "categories.items.1.desc":
    "Electric and diesel/LPG Noblelift counterbalance forklifts. Li-Ion options, typical capacities 1.2–10 t for warehouses, production and yards. Request a quote.",
  "categories.items.2.desc":
    "Electric Noblelift stackers – pedestrian and platform models. Compact design, high residual capacity and lift up to 13 m. Sales and service by VZV GROUP.",
  "categories.items.3.desc":
    "Manual and electric Noblelift pallet trucks – walkie and rider. Scale, low-entry and Li-Ion options for everyday warehouse handling. Request a quote.",
  "categories.items.4.desc":
    "Diesel rough-terrain forklifts and Noblelift telehandlers for construction and agriculture. Uneven ground capability. Sales and service from VZV GROUP.",
  "categories.items.5.desc":
    "Noblelift reach trucks and order pickers for racks up to 13 m. Narrow-aisle and double-deep stacking. Sales and service by VZV GROUP for CZ and SK.",
  "categories.items.6.desc":
    "Electric Noblelift scissor lifts for safe work at height – maintenance, assembly and warehouse jobs. Quiet indoor operation. Request a quote online.",
  "productsCatalog.categories.1.subcategories.electric.desc":
    "Electric Noblelift counterbalance forklifts – three- and four-wheel, including Li-Ion. For warehouses and production. Sales and service by VZV GROUP.",
  "productsCatalog.categories.1.subcategories.dieselLpg.desc":
    "Diesel and LPG Noblelift counterbalance forklifts for outdoor and mixed use. Robust build and high capacity. Sales and service by VZV GROUP – request a quote.",
  "productsCatalog.categories.2.subcategories.walkie.desc":
    "Electric pedestrian Noblelift stackers for narrow aisles and short moves. Ideal for smaller warehouses. Sales and service by VZV GROUP – request a quote.",
  "productsCatalog.categories.2.subcategories.rider.desc":
    "Noblelift platform stackers for longer warehouse routes. Higher productivity and operator comfort. VZV GROUP sales, delivery and service in CZ and SK.",
  "productsCatalog.categories.2.subcategories.straddle.desc":
    "Noblelift straddle stackers for non-standard pallets and wider loads. Adjustable support arms. Sales and service by VZV GROUP – request a quote.",
  "productsCatalog.categories.3.subcategories.manual.desc":
    "Manual Noblelift pallet trucks for everyday pallet moves. Reliable build and fast availability from VZV GROUP in CZ and SK. Request a quote online.",
  "productsCatalog.categories.3.subcategories.powered.desc":
    "Electric Noblelift pallet trucks – walkie and rider. Li-Ion, scales and low entry for intensive warehouse work. Sales and service by VZV GROUP.",
  "productsCatalog.categories.4.subcategories.terrainForklifts.desc":
    "Rough-terrain diesel Noblelift forklifts for construction and outdoor yards. Uneven-surface travel. Sales and service by VZV GROUP – request a quote.",
  "productsCatalog.categories.4.subcategories.telehandlers.desc":
    "Noblelift telehandlers for construction and agriculture. Reach and capacity for demanding terrain. Sales and service by VZV GROUP in CZ and SK.",
  "productsCatalog.categories.5.subcategories.reachTrucks.desc":
    "Noblelift reach trucks for narrow aisles and racks up to 13 m. High residual capacity and efficient stacking. Sales and service by VZV GROUP.",
  "productsCatalog.categories.5.subcategories.orderPickers.desc":
    "Noblelift order pickers for efficient picking in racked warehouses. Safe work at height. Sales and service by VZV GROUP in CZ and SK.",
  "productsCatalog.categories.6.subcategories.scissor.desc":
    "Electric Noblelift scissor lifts for maintenance, assembly and warehousing. Stable platform and quiet operation. Sales and service by VZV GROUP.",
};

patch("cz.json", cz);
patch("en.json", en);

function len(s) {
  return [...s].length;
}
console.log("CZ over 160?");
for (const [k, v] of Object.entries(cz)) {
  const n = len(v);
  if (n > 160 || n < 120) console.log(n, k);
}
console.log("EN over 160?");
for (const [k, v] of Object.entries(en)) {
  const n = len(v);
  if (n > 160 || n < 120) console.log(n, k);
}
console.log("done");
