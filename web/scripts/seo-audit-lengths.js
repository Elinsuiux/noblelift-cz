const fs = require("fs");
const path = require("path");

function get(obj, keyPath) {
  return keyPath.split(".").reduce((a, k) => (a == null ? a : a[k]), obj);
}

function len(s) {
  return [...String(s)].length;
}

const keys = [
  "meta.description",
  "servicePage.meta.description",
  "contactPage.meta.description",
  "aboutPage.meta.description",
  "legalPrivacy.meta.description",
  "legalCookies.meta.description",
  "legalTerms.meta.description",
  "legalCompany.meta.description",
  "productsCatalog.meta.hub.description",
  "categories.items.1.desc",
  "categories.items.2.desc",
  "categories.items.3.desc",
  "categories.items.4.desc",
  "categories.items.5.desc",
  "categories.items.6.desc",
  "productsCatalog.categories.1.subcategories.electric.desc",
  "productsCatalog.categories.1.subcategories.dieselLpg.desc",
  "productsCatalog.categories.2.subcategories.walkie.desc",
  "productsCatalog.categories.2.subcategories.rider.desc",
  "productsCatalog.categories.2.subcategories.straddle.desc",
  "productsCatalog.categories.3.subcategories.manual.desc",
  "productsCatalog.categories.3.subcategories.powered.desc",
  "productsCatalog.categories.4.subcategories.terrainForklifts.desc",
  "productsCatalog.categories.4.subcategories.telehandlers.desc",
  "productsCatalog.categories.5.subcategories.reachTrucks.desc",
  "productsCatalog.categories.5.subcategories.orderPickers.desc",
  "productsCatalog.categories.6.subcategories.scissor.desc",
  "productsCatalog.categories.6.subcategories.mastBoom.desc",
  "hero.carousel.altWarehouse",
  "hero.carousel.altForklift",
];

const out = [];
for (const file of ["cz.json", "en.json"]) {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "messages", file), "utf8"));
  out.push(`\n=== ${file} ===`);
  for (const k of keys) {
    const v = get(data, k);
    if (v == null) {
      out.push(`MISSING ${k}`);
      continue;
    }
    const n = len(v);
    const flag = k.includes("alt") ? "" : n < 120 ? " SHORT" : n > 160 ? " LONG" : " OK";
    out.push(`${n}${flag}\t${k}`);
  }
}

fs.writeFileSync(path.join(__dirname, "seo-audit-out.txt"), out.join("\n") + "\n");
console.log("wrote seo-audit-out.txt");
