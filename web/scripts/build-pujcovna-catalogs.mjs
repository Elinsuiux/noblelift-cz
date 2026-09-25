/**
 * Builds on-site rental catalogs for Pronájem category cards.
 * Source: https://www.vzvrent.cz/stroje-k-zapujceni/<slug>
 * Layout: Nové vozíky (sidebar filters + product cards).
 */
import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const webRoot = join(__dirname, "..");
const sourceDir = "/tmp/vzvrent-cats";
const outDir = join(webRoot, "public", "pages", "vzv.cz", "cz", "pujcovna-vzv");
const dumpDir = join(webRoot, "..", "pages", "vzv.cz", "cz", "pujcovna-vzv");
const ASSET_ORIGIN = "https://temporary-rapid-breeze-8ofpwza.vercel.app";
const SITE_PUJCOVNA = "/pages/vzv.cz/cz/pujcovna-vzv";
const CATALOG_CSS = `${SITE_PUJCOVNA}/pujcovna-katalog.css?v=card-spec-icons-18`;

const SPEC_ORDER = [
  "Pohon",
  "Nosnost",
  "Výška zdvihu",
  "Pracovní výška",
  "Průjezdní výška",
  "Hmotnost",
  "Rozměr",
];

const SPEC_ICONS = {
  Pohon: "pohon.png",
  Nosnost: "nosnost.png",
  "Výška zdvihu": "vyska-zdvihu.png",
  "Pracovní výška": "vyska-zdvihu.png",
  "Průjezdní výška": "prujezdni-vyska.png",
  Hmotnost: "hmotnost.png",
};

const POHON_ICONS = {
  Diesel: "pohon-diesel.png",
  AKU: "pohon-aku.png",
  LPG: "pohon-lpg.png",
  RUČNÍ: "pohon-rucni.png",
};

const CATEGORIES = [
  {
    slug: "teleskopicke-manipulatory",
    title: "Teleskopické manipulátory",
    intro:
      "Silné univerzální stroje s vidlemi, lžící, jeřábovým hákem a montážním košem. Díky pohonu všech čtyř kol disponují manipulátory vysokou průjezdností těžkým terénem. Ideální pro stavby a zemědělství. Pronajímáme teleskopické manipulátory značek Manitou, JCB, Genie a Linde.",
    description:
      "Pronájem teleskopických manipulátorů Manitou, JCB, Genie a Linde po celé ČR. Rotační i standardní stroje s vidlemi, lžící, hákem a montážním košem.",
    tiles: "rotary",
    noun: "teleskopický manipulátor",
    minProducts: 8,
  },
  {
    slug: "terenni-voziky",
    title: "Terénní vozíky",
    intro:
      "Vysokozdvižné vozíky pro nezpevněný povrch s vysokou průjezdností. Vybrané vozíky jsou navíc vybaveny pohonem 4x4. Tyto vozíky jsou ideální pro práci na stavbách.",
    description:
      "Pronájem terénních vysokozdvižných vozíků s vysokou průjezdností a pohonem 4x4. Vhodné na stavby a nezpevněný povrch.",
    tiles: "power",
    noun: "terénní vozík",
    minProducts: 5,
  },
  {
    slug: "celni-voziky",
    title: "Čelní vozíky",
    intro:
      "Kompaktní vysokozdvižné vozíky s širokým uplatněním. Nosnosti strojů se pohybují od 1,2 t až po 22 t. Vozíky pro vnitřní provoz dodáváme s nešpinícími pneumatikami.",
    description:
      "Pronájem čelních vysokozdvižných vozíků diesel, LPG i elektrických. Nosnosti od 1,2 t do 22 t po celé ČR.",
    tiles: "power",
    noun: "čelní vozík",
    minProducts: 20,
  },
  {
    slug: "pracovni-plosiny",
    title: "Pracovní plošiny",
    intro:
      "Pracovní plošiny jsou uzpůsobené pro použití v lehkých i těžších terénech. Umožňují montážní a servisní práce ve výškách. Pracovní koš využijete pro časově náročné práce.",
    description:
      "Pronájem pracovních plošin pro montážní a servisní práce ve výškách. Stroje pro lehký i těžší terén.",
    tiles: "power",
    noun: "pracovní plošina",
    heightLabel: "Pracovní výška",
    minProducts: 5,
  },
  {
    slug: "bocni-voziky",
    title: "Boční vozíky",
    intro:
      "Používají se pro převoz dlouhých břemen v hutnictví a dřevařství. Břemeno leží podél vozíku, proto se hodí na tyče, profily a dřevo.",
    description:
      "Pronájem bočních vozíků pro dlouhá břemena v hutnictví, dřevařství a skladech.",
    tiles: "none",
    noun: "boční vozík",
    minProducts: 2,
  },
  {
    slug: "skladova-technika",
    title: "Skladová technika",
    intro:
      "Skladová technika nabízí speciální vysokozdvižné vozíky pro zakládání palet v úzkých regálových uličkách. Dále ručně vedené vysokozdvižné elektrické vozíky nebo vozíky s nízkým zdvihem, které se často využívají ve skladech nebo při stěhování v malých vnitřních prostorech.",
    description:
      "Pronájem skladové techniky – retraky, vychystávací vozíky a nízkozdvižné vozíky pro úzké uličky.",
    tiles: "power",
    noun: "skladový vozík",
    minProducts: 10,
  },
  {
    slug: "pridavna-zarizeni",
    title: "Přídavná zařízení",
    intro:
      "Boční posuvy, pozicionéry vidlic, nástavce vidlí, jeřábová ramena, montážní koš, hydraulická lžíce a další. Příslušenství k vysokozdvižným vozíkům a manipulátorům.",
    description:
      "Pronájem přídavných zařízení k VZV a manipulátorům – háky, ramena, svěrné vidle a lopaty.",
    tiles: "type",
    noun: "přídavné zařízení",
    brandLabel: "Typ",
    minProducts: 5,
  },
  {
    slug: "nuzkove-plosiny",
    title: "Nůžkové plošiny",
    intro:
      "Nůžkové pracovní plošiny jsou vhodné pro práce ve vnitřních prostorách na rovném a pevném povrchu. Využijete je při stavbě hal, opravách a údržbě. Lze je také využít pro údržbu opláštění budov za dodržení podmínky pevného a rovného povrchu.",
    description:
      "Pronájem nůžkových plošin pro práce ve výšce na rovném povrchu – haly, montáž a údržba.",
    tiles: "power",
    noun: "nůžková plošina",
    heightLabel: "Pracovní výška",
    minProducts: 8,
  },
  {
    slug: "extra",
    title: "Extra",
    intro:
      "Stroje, které využijete při zvedání i transportu strojů, těžkých břemen a to i v interiérech s omezeným přístupem a prostorem.",
    description:
      "Pronájem speciální techniky pro zvedání a transport těžkých břemen, včetně omezených prostor.",
    tiles: "power",
    noun: "speciální stroj",
    minProducts: 5,
  },
];

function parseKgMm(value) {
  const n = parseInt(String(value || "").replace(/\s/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function attachmentType(name) {
  const n = name.toLowerCase();
  if (n.includes("hák") || n.includes("hak")) return "Jeřábový hák";
  if (n.includes("rameno")) return "Jeřábové rameno";
  if (n.includes("svěr") || n.includes("sver")) return "Svěrné vidle";
  if (n.includes("lopat") || n.includes("lžíc") || n.includes("lzic")) return "Lopata";
  if (n.includes("otoč") || n.includes("otoc")) return "Otoč";
  return "Ostatní";
}

function cleanName(name) {
  return name.replace(/\s+-\s*$/, "").replace(/\s+/g, " ").trim();
}

function parseProducts(html, slug, category) {
  const startRe =
    /<div class="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mt-3 mb-3 d-flex align-items-stretch print-height">/g;
  const indices = [];
  let match;
  while ((match = startRe.exec(html))) indices.push(match.index);

  const hrefRe = new RegExp(
    `href="(https://www\\.vzvrent\\.cz/stroje-k-zapujceni/${slug}/[^"#]+)"`,
  );
  const products = [];
  for (let i = 0; i < indices.length; i++) {
    const nextRow = html.indexOf('<div class="row mt-5', indices[i]);
    const chunk = html.slice(
      indices[i],
      indices[i + 1] ?? (nextRow === -1 ? html.length : nextRow),
    );
    const name = cleanName(
      chunk
        .match(/text-title[^>]*>([\s\S]*?)<\/a>/)?.[1]
        ?.replace(/<[^>]+>/g, "")
        .replace(/\s+/g, " ")
        .trim() || "",
    );
    const href = chunk.match(hrefRe)?.[1];
    const img = chunk.match(/src="(https:\/\/admin\.vzv\.cz\/img\.php\?[^"]+)"/)?.[1];
    const specs = {};
    const specRe =
      /<div class="col-sm-6 col-8">([^<]+)<\/div>\s*<div class="col-sm-6 col-4">([^<]+)<\/div>/g;
    let specMatch;
    while ((specMatch = specRe.exec(chunk))) {
      specs[specMatch[1].trim()] = specMatch[2].trim();
    }
    if (!name || !href || !img) continue;
    const rotary = /\bMRT\b/i.test(name);
    const type = category.tiles === "type" ? attachmentType(name) : "";
    const brand =
      category.tiles === "type" ? type : name.split(/\s+/)[0].toUpperCase();
    products.push({
      id: href.split("/").pop() || `item-${i}`,
      name,
      href,
      img,
      specs,
      brand,
      type,
      rotary,
      power: specs.Pohon || "",
      capacity: parseKgMm(specs.Nosnost),
      lift: parseKgMm(specs["Výška zdvihu"] || specs["Pracovní výška"]),
    });
  }
  return products;
}

function listingPath(slug) {
  return `${SITE_PUJCOVNA}/${slug}`;
}

function localPath(slug, product) {
  return `${listingPath(slug)}/${product.id}/index.html`;
}

function poptatPath(product) {
  return `${SITE_PUJCOVNA}/index.html?stroj=${encodeURIComponent(product.name)}#poptavka`;
}

function heightKey(product, category) {
  if (category.heightLabel && product.specs[category.heightLabel]) {
    return category.heightLabel;
  }
  if (product.specs["Pracovní výška"]) return "Pracovní výška";
  if (product.specs["Výška zdvihu"]) return "Výška zdvihu";
  return category.heightLabel || "Výška zdvihu";
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function capacityBuckets(products) {
  const max = Math.max(0, ...products.map((item) => item.capacity));
  if (max <= 2000) {
    return [
      ["0-250", "do 250 kg"],
      ["251-500", "250 – 500 kg"],
      ["501-999999", "nad 500 kg"],
    ];
  }
  if (max <= 20000) {
    return [
      ["0-3000", "do 3 000 kg"],
      ["3001-5000", "3 000 – 5 000 kg"],
      ["5001-999999", "nad 5 000 kg"],
    ];
  }
  return [
    ["0-5000", "do 5 t"],
    ["5001-20000", "5 – 20 t"],
    ["20001-999999999", "nad 20 t"],
  ];
}

function heightBuckets(products) {
  const max = Math.max(0, ...products.map((item) => item.lift));
  if (max <= 9000) {
    return [
      ["0-4000", "do 4 m"],
      ["4001-6000", "4 – 6 m"],
      ["6001-999999", "nad 6 m"],
    ];
  }
  return [
    ["0-10000", "do 10 m"],
    ["10001-15000", "10 – 15 m"],
    ["15001-999999", "nad 15 m"],
  ];
}

function machineDescription(category, product) {
  const name = escapeHtml(product.name);
  const noun = category.noun;
  const map = {
    "teleskopicke-manipulatory": `<p><strong>Teleskopický manipulátor ${name}</strong> umožňuje díky svému výsuvnému ramenu manipulovat s nákladem jak do výšky, tak i směrem dopředu. Stroj má pohon všech kol 4x4. Velká terénní kola pomáhají zdolávat nerovnosti a manipulátor se tak dostane i na hůře dostupná místa. Své uplatnění nejčastěji nachází ve stavebnictví a zemědělství.</p>
<p>Manipulátor lze osadit přídavnými zařízeními jako jsou nosné vidle, jeřábový hák, radlice nebo montážní koš.</p>${
      product.rotary
        ? "<p>Rotační manipulátor se liší od běžného teleskopického manipulátoru možností otáčení kabiny a teleskopického ramene o 360°. Získává tak vlastnosti jeřábu a větší variabilitu dosahu.</p>"
        : ""
    }`,
    "terenni-voziky": `<p><strong>Terénní vozík ${name}</strong> je určený pro práci na nezpevněném povrchu. Velká kola a vysoká světlá výška mu dávají průjezdnost, kterou klasický čelní vozík nemá. Vybrané stroje mají pohon 4x4, proto se hodí na stavby a do venkovních areálů.</p>`,
    "celni-voziky": `<p><strong>Čelní vozík ${name}</strong> je univerzální vysokozdvižný vozík pro nakládku, vykládku a stohování palet. Pronajímáme dieselové, LPG i elektrické vozíky — od kompaktních skladových modelů až po velkotonážní stroje.</p>`,
    "pracovni-plosiny": `<p><strong>Pracovní plošina ${name}</strong> slouží k montážním a servisním pracím ve výškách. Koš nese obsluhu i nářadí, rameno umožňuje práci nad překážkami v lehkém i těžším terénu.</p>`,
    "nuzkove-plosiny": `<p><strong>Nůžková plošina ${name}</strong> je vhodná pro práce ve výšce na rovném a pevném povrchu. Typicky se používá ve halách, při montáži, opravách a údržbě opláštění.</p>`,
    "skladova-technika": `<p><strong>Skladová technika ${name}</strong> je určená pro práci v úzkých uličkách a vnitřních prostorách. Elektrický pohon je šetrný k podlaze i ovzduší skladu.</p>`,
    "bocni-voziky": `<p><strong>Boční vozík ${name}</strong> převáží dlouhá břemena — tyče, profily nebo dřevo — podél vozíku. Uplatní se v hutnictví, dřevařství a při obsluze dlouhých skladových položek.</p>`,
    "pridavna-zarizeni": `<p><strong>${name}</strong> je přídavné zařízení, které rozšiřuje možnosti vysokozdvižného vozíku nebo manipulátoru. Pronájem příslušenství se hodí ke krátkodobým i specializovaným zakázkám.</p>`,
    extra: `<p><strong>${name}</strong> patří do speciální techniky pro zvedání a transport těžkých břemen, včetně interiérů s omezeným přístupem a prostorem.</p>`,
  };
  return map[category.slug] || `<p>Pronájem: ${noun} ${name}.</p>`;
}

function specIconSrc(key, value) {
  if (key === "Pohon") {
    const file = POHON_ICONS[value] || "pohon-diesel.png";
    return `${SITE_PUJCOVNA}/spec-icons/${file}?v=card-8`;
  }
  const file = SPEC_ICONS[key];
  return file ? `${SITE_PUJCOVNA}/spec-icons/${file}?v=card-7` : "";
}

function renderCard(category, product) {
  const specRows = SPEC_ORDER.filter((key) => product.specs[key] && product.specs[key] !== "0")
    .map((key) => {
      const icon = specIconSrc(key, product.specs[key]);
      const iconHtml = icon
        ? `<div class="card-spec-icon" aria-hidden="true"><img src="${icon}" alt=""></div>`
        : "";
      return `<div class="card-spec">${iconHtml}<div class="card-spec-value">${escapeHtml(product.specs[key])}</div></div>`;
    })
    .join("");
  const detail = localPath(category.slug, product);
  const sticker = product.rotary
    ? '<span class="rent-sticker">Rotační</span>'
    : product.type
      ? `<span class="rent-sticker">${escapeHtml(product.type)}</span>`
      : "";
  const group =
    category.tiles === "rotary"
      ? product.rotary
        ? "rotary"
        : "standard"
      : category.tiles === "type"
        ? product.type
        : product.power;

  return `<div class="col-12 col-md-6 col-xl-4 mb-4 rent-machine"
                     data-name="${escapeHtml(product.name.toLowerCase())}"
                     data-brand="${escapeHtml(product.brand)}"
                     data-power="${escapeHtml(product.power)}"
                     data-group="${escapeHtml(group)}"
                     data-rotary="${product.rotary ? "1" : "0"}"
                     data-capacity="${product.capacity}"
                     data-lift="${product.lift}">
                    <article class="card card-vzv">
                        <div class="card-img" style="background-image: url('${escapeHtml(product.img)}');">
                            ${sticker}
                            <a href="${detail}" title="Detail ${escapeHtml(product.name)}"></a>
                        </div>
                        <div class="card-vzv-body">
                            <a class="card-vzv-title" href="${detail}">${escapeHtml(product.name)}</a>
                            <div class="card-body-parametry">${specRows}</div>
                        </div>
                        <div class="card-vzv-actions">
                            <a class="btn btn-dark rounded-1" href="${detail}">Detail</a>
                            <a class="btn btn-primary rounded-1" href="${poptatPath(product)}">Poptat</a>
                        </div>
                    </article>
                </div>`;
}

function renderDetail(category, product) {
  const specBlocks = SPEC_ORDER.filter(
    (key) => product.specs[key] && product.specs[key] !== "0",
  )
    .map((key) => {
      const icon = specIconSrc(key, product.specs[key]);
      const iconHtml = icon
        ? `<div class="rent-spec-icon" aria-hidden="true"><img src="${icon}" alt=""></div>`
        : "";
      return `<div class="col-6 col-md-4 mb-4">
                        <div class="rent-spec">
                            ${iconHtml}
                            <div class="rent-spec-label">${escapeHtml(key)}</div>
                            <div class="rent-spec-value">${escapeHtml(product.specs[key])}</div>
                        </div>
                    </div>`;
    })
    .join("");
  const listing = `${listingPath(category.slug)}/index.html`;
  const thumbs = renderDetailThumbs(product);
  const copy = sanitizeCopy(product.copy) || machineDescription(category, product);
  const heroRowClass = thumbs
    ? "row g-4 align-items-start"
    : "row g-4 align-items-start pb-5";

  return `<div class="content-body rent-catalog rent-detail">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12 col-xxl-10 px-md-5">
                <div class="text-center mt-4">
                    <h1 class="text-uppercase" id="nadpis">${escapeHtml(product.name)}</h1>
                </div>
                ${renderTypePills(category.slug)}
                <div class="mb-3 fs-7" id="breadcrumb">
                    <a href="${SITE_PUJCOVNA}/index.html" class="new-breadcrumb">Pronájem</a>
                    <span class="new-breadcrumb"> / </span>
                    <a href="${listing}" class="new-breadcrumb">${escapeHtml(category.title)}</a>
                    <span class="new-breadcrumb"> / </span>
                    <span class="new-breadcrumb is-current">${escapeHtml(product.name)}</span>
                </div>
                <hr />
                <div class="${heroRowClass}">
                    <div class="col-12 col-lg-6">
                        ${renderDetailPhoto(product)}
                    </div>
                    <div class="col-12 col-lg-6">
                        <div class="row">${specBlocks}</div>
                        <div class="rent-detail-copy">${copy}</div>
                        <div class="rent-detail-actions">
                            <a class="btn btn-dark rounded-1" href="${listing}">Technický list</a>
                            <a class="btn btn-primary rounded-1" href="${poptatPath(product)}">Poptat</a>
                        </div>
                    </div>
                </div>
                ${thumbs}
            </div>
        </div>
    </div>
</div>`;
}

function sanitizeCopy(html) {
  const raw = String(html || "");
  const paras = [];
  const re = /<p\b[^>]*>[\s\S]*?<\/p>/gi;
  let last = 0;
  let match;
  while ((match = re.exec(raw))) {
    if (paras.length && match.index - last > 40) break;
    const chunk = match[0];
    if (/<(meta|link|script|html|head|body)\b/i.test(chunk)) break;
    paras.push(chunk.replace(/\r\n/g, "\n"));
    last = match.index + chunk.length;
  }
  return paras.join("");
}

function parseFotoPath(img) {
  const decoded = String(img || "").replaceAll("&amp;", "&");
  const match = decoded.match(/foto\/(fotorent|fotov|fotoch)\/([^/]+)\/([^/?&]+)/i);
  if (!match) return null;
  return { kind: match[1], folder: match[2], file: match[3] };
}

function fullFotoUrl(kind, folder, file) {
  return `https://admin.vzv.cz/foto/${kind}/${folder}/${file}`;
}

function renderDetailPhoto(product) {
  const parsed = parseFotoPath(product.img);
  const name = escapeHtml(product.name);
  const href = parsed
    ? fullFotoUrl(parsed.kind, parsed.folder, `${parsed.folder}-01.jpg`)
    : product.img;
  const src = parsed
    ? fullFotoUrl(parsed.kind, parsed.folder, `${parsed.folder}-01.jpg`)
    : product.img;
  return `<div class="rent-detail-photo">
                            <a href="${escapeHtml(href)}" data-fancybox="images" data-caption="${name}">
                                <img src="${escapeHtml(src)}" alt="${name}">
                            </a>
                        </div>`;
}

function renderDetailThumbs(product) {
  const photos = product.photos || [];
  if (photos.length < 2) return "";
  const name = escapeHtml(product.name);
  const items = photos
    .map((photo) => {
      const thumb = `https://admin.vzv.cz/img.php?img=foto/${photo.kind}/${photo.folder}/${photo.file}&width=400&height=266`;
      const href = fullFotoUrl(photo.kind, photo.folder, photo.file);
      return `<div class="col-6 col-sm-4 col-xl-3 p-2">
                        <a href="${escapeHtml(href)}" data-fancybox="images" data-caption="${name}">
                            <img src="${escapeHtml(thumb)}" alt="${name}">
                        </a>
                    </div>`;
    })
    .join("");
  return `<div class="row g-2 rent-detail-thumbs pb-5">${items}</div>`;
}

function checkbox(id, value, label, filter) {
  return `<div class="col-12">
                    <div class="form-check mb-1">
                        <input class="form-check-input" type="checkbox" value="${escapeHtml(value)}" id="${escapeHtml(id)}" data-filter="${escapeHtml(filter)}">
                        <label class="form-check-label fs-7 text-dark" for="${escapeHtml(id)}">${escapeHtml(label)}</label>
                    </div>
                </div>`;
}

function renderTiles(category, products) {
  if (category.tiles === "none") return "";
  const listing = listingPath(category.slug);
  const items = [{ key: "all", label: "Všechny stroje", img: products[0]?.img || "" }];
  if (category.tiles === "rotary") {
    items.push({
      key: "rotary",
      label: "Rotační manipulátory",
      img: products.find((item) => item.rotary)?.img || products[0]?.img || "",
    });
  } else if (category.tiles === "power") {
    for (const power of unique(products.map((item) => item.power)).sort()) {
      items.push({
        key: power,
        label: power === "AKU" ? "Elektrické" : power,
        img: products.find((item) => item.power === power)?.img || "",
      });
    }
    if (items.length < 3) return "";
  } else if (category.tiles === "type") {
    for (const type of unique(products.map((item) => item.type)).sort()) {
      items.push({
        key: type,
        label: type,
        img: products.find((item) => item.type === type)?.img || "",
      });
    }
  }
  const cols = items.length === 2 ? "col-12 col-md-6" : "col-12 col-md-6 col-xl-4";
  const boxes = items
    .map(
      (item, index) => `<div class="${cols}">
                                    <a href="javascript:void(0)" class="category-box text-decoration-none${index === 0 ? " is-active" : ""}" data-category="${escapeHtml(item.key)}">
                                        <div class="category-box__image">
                                            <img src="${escapeHtml(item.img)}" alt="${escapeHtml(item.label)}">
                                        </div>
                                        <div class="category-box__title">${escapeHtml(item.label)}</div>
                                    </a>
                                </div>`,
    )
    .join("");
  return `<div id="category-wrap">
                        <div class="container my-5" id="category-box">
                            <div class="row g-4 justify-content-center">
                                ${boxes}
                            </div>
                        </div>
                    </div>`;
}

function renderCatalog(category, products) {
  const brandLabel = category.brandLabel || "Značka";
  const brands = unique(products.map((item) => item.brand)).sort();
  const powers = unique(products.map((item) => item.power)).sort();
  const brandChecks = brands
    .map((brand, i) =>
      checkbox(`brand-${category.slug}-${i}`, brand, brand, "brand").replace(
        "fs-7 text-dark",
        "text-uppercase fs-7 text-dark",
      ),
    )
    .join("");
  const powerChecks = powers
    .map((power, i) =>
      checkbox(
        `power-${category.slug}-${i}`,
        power,
        power === "AKU" ? "Elektrické (AKU)" : power,
        "power",
      ),
    )
    .join("");
  const hLabel = category.heightLabel || heightKey(products[0] || { specs: {} }, category);
  const capBuckets = capacityBuckets(products);
  const liftBuckets = heightBuckets(products);
  const hasCapacity = products.some((item) => item.capacity > 0);
  const hasLift = products.some((item) => item.lift > 0);
  const hasPower = powers.length > 0;
  const cards = products.map((item) => renderCard(category, item)).join("\n                ");
  const listing = `${listingPath(category.slug)}/index.html`;
  const typeFilter =
    category.tiles === "rotary"
      ? `<div class="row mt-md-3 ms-md-2 pb-3 bg-light-dark filtr-type">
        <div class="col-12 text-primary pt-3 mb-2 text-uppercase">Typ vozíku</div>
        ${checkbox("type-standard", "0", "Teleskopický manipulátor", "rotary")}
        ${checkbox("type-rotary", "1", "Rotační manipulátor", "rotary")}
    </div>`
      : "";

  return `<div class="content-body rent-catalog">
    <div class="container-fluid">
    <div class="row">
        <div class="col-12 col-md-3 col-xxl-2 katalog-filtr" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasFiltr" aria-labelledby="offcanvasFiltrLabel">
            <div class="offcanvas-header text-end d-block d-md-none">
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body text-start">
                <div id="filtr">
    <div class="row mt-md-3 filtr-cancel" id="filtr-cancel" style="display:none">
        <div class="col-12 text-center">
            <a href="${listing}" class="text-uppercase text-primary text-decoration-none fw-bold" id="reset-filtr">Zrušit filtr</a>
        </div>
    </div>
        <div class="row mt-md-3 ms-md-2 bg-light-dark">
        <div class="col-12 text-primary pt-3 mb-2 text-uppercase">Hledej text</div>
        <div class="col-11">
            <div class="input-group mb-3">
                <input type="text" class="form-control fs-7" placeholder="Hledej text" id="search-text" name="search_text" value="">
                <button class="btn btn-primary" type="button" id="button-search" aria-label="Hledat">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"/></svg>
                </button>
            </div>
        </div>
    </div>
        ${typeFilter}
        ${
          hasPower
            ? `<div class="row mt-md-3 ms-md-2 pb-3 bg-light-dark filtr-power">
        <div class="col-12 text-primary pt-3 mb-2 text-uppercase">Pohon</div>
        ${powerChecks}
    </div>`
            : ""
        }
        <div class="row mt-md-3 ms-md-2 pb-3 bg-light-dark filtr-brand">
        <div class="col-12 text-primary pt-3 mb-2 text-uppercase">${escapeHtml(brandLabel)}</div>
        ${brandChecks}
    </div>
        ${
          hasCapacity
            ? `<div class="row mt-md-3 ms-md-2 pb-3 bg-light-dark filtr-capacity">
        <div class="col-12 text-primary pt-3 mb-2 text-uppercase">Nosnost</div>
        ${capBuckets.map(([value, label], i) => checkbox(`cap-${category.slug}-${i}`, value, label, "capacity")).join("")}
    </div>`
            : ""
        }
        ${
          hasLift
            ? `<div class="row mt-md-3 ms-md-2 pb-3 bg-light-dark filtr-lift">
        <div class="col-12 text-primary pt-3 mb-2 text-uppercase">${escapeHtml(hLabel)}</div>
        ${liftBuckets.map(([value, label], i) => checkbox(`lift-${category.slug}-${i}`, value, label, "lift")).join("")}
    </div>`
            : ""
        }
                </div>
            </div>
        </div>
        <div class="col-12 col-md-9 col-xxl-10 katalog-polozky pe-md-5">
            <div class="row mt-4">
                <div class="col-xxl-8 col-xl-10 mx-auto">
                    <div class="col-12 text-center">
                        <h1 class="text-uppercase" id="nadpis">${escapeHtml(category.title)}</h1>
                        <p id="popis">${escapeHtml(category.intro)}</p>
                    </div>
                    ${renderTypePills(category.slug)}
                    <div class="d-md-none px-3 mt-2 mb-3 col-12 fs-7" id="breadcrumb-mobile">
                        <a href="${SITE_PUJCOVNA}/index.html" class="new-breadcrumb">Pronájem</a>
                        <span class="new-breadcrumb"> / </span>
                        <span class="new-breadcrumb is-current">${escapeHtml(category.title)}</span>
                    </div>
                    ${renderTiles(category, products)}
                </div>
                <div class="col-12 mt-3 mb-3 text-center rent-result-count" id="result-count"></div>
            </div>
            <div class="row d-flex d-md-none justify-content-center ps-3 pe-3">
                <div class="col-12 d-flex pl-2 pb-3">
                    <a href="${listing}" class="fs-7 text-decoration-underline" id="reset-filtr-mobile">Zrušit filtr</a>
                </div>
                <div class="col-6 d-flex justify-content-center align-items-center">
                    <select class="form-select fs-7 select-btn" name="sort-by-mobile" id="sort-by-mobile">
                        <option value="default">Seřadit - Výchozí</option>
                        <option value="capacity">Seřadit - Podle nosnosti</option>
                        <option value="lift">Seřadit - Podle výšky</option>
                        <option value="name">Seřadit - Podle názvu</option>
                    </select>
                </div>
                <div class="col-6 d-flex justify-content-center align-items-center">
                    <button class="btn btn-dark text-light text-uppercase w-100" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasFiltr">Filtr</button>
                </div>
            </div>
            <div class="row d-none d-md-flex justify-content-end">
                <div class="col-12 col-md-10" id="breadcrumb">
                    <a href="${SITE_PUJCOVNA}/index.html" class="new-breadcrumb">Pronájem</a>
                    <span class="new-breadcrumb"> / </span>
                    <span class="new-breadcrumb is-current">${escapeHtml(category.title)}</span>
                </div>
                <div class="col-12 col-md-2">
                    <select class="form-select fs-7" name="sort-by" id="sort-by">
                        <option value="default">Seřadit - Výchozí</option>
                        <option value="capacity">Seřadit - Podle nosnosti</option>
                        <option value="lift">Seřadit - Podle výšky</option>
                        <option value="name">Seřadit - Podle názvu</option>
                    </select>
                </div>
            </div>
            <hr />
            <div class="row pe-md-5" id="forklifts">
                ${cards}
            </div>
            <div class="row" id="forklifts-empty">
                <div class="col-12">
                    <div class="row justify-content-center mt-5">
                        <div class="col-12 col-md-10">
                            <b>Bohužel jsme v aktuální nabídce manipulační techniky nic nenašli</b>. Jestliže hledáte konkrétní stroj, kontaktujte nás a podíváme se po vhodném stroji.
                        </div>
                    </div>
                    <div class="row justify-content-center mt-5 mb-5">
                        <div class="col-12 col-md-8 col-xxl-3 d-grid gap-2 p-0">
                            <a class="btn btn-primary btn-lg rounded-0" href="${SITE_PUJCOVNA}/index.html#poptavka">Kontaktní formulář</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
<script>
(function () {
  var cards = Array.prototype.slice.call(document.querySelectorAll(".rent-machine"));
  var empty = document.getElementById("forklifts-empty");
  var grid = document.getElementById("forklifts");
  var countEl = document.getElementById("result-count");
  var search = document.getElementById("search-text");
  var sortDesktop = document.getElementById("sort-by");
  var sortMobile = document.getElementById("sort-by-mobile");
  var cancel = document.getElementById("filtr-cancel");
  var category = "all";

  function checkedValues(selector) {
    return Array.prototype.map.call(document.querySelectorAll(selector + ":checked"), function (el) {
      return el.value;
    });
  }
  function inRange(value, ranges) {
    if (!ranges.length) return true;
    return ranges.some(function (range) {
      var parts = range.split("-");
      return value >= Number(parts[0]) && value <= Number(parts[1]);
    });
  }
  function apply() {
    var query = (search.value || "").trim().toLowerCase();
    var brands = checkedValues('[data-filter="brand"]');
    var powers = checkedValues('[data-filter="power"]');
    var rotary = checkedValues('[data-filter="rotary"]');
    var caps = checkedValues('[data-filter="capacity"]');
    var lifts = checkedValues('[data-filter="lift"]');
    var sortBy = (sortDesktop && sortDesktop.value) || "default";
    var visible = [];
    cards.forEach(function (card) {
      var ok = true;
      if (query && card.getAttribute("data-name").indexOf(query) === -1) ok = false;
      if (brands.length && brands.indexOf(card.getAttribute("data-brand")) === -1) ok = false;
      if (powers.length && powers.indexOf(card.getAttribute("data-power")) === -1) ok = false;
      if (category !== "all" && card.getAttribute("data-group") !== category) ok = false;
      if (rotary.length && rotary.indexOf(card.getAttribute("data-rotary")) === -1) ok = false;
      if (!inRange(Number(card.getAttribute("data-capacity")), caps)) ok = false;
      if (!inRange(Number(card.getAttribute("data-lift")), lifts)) ok = false;
      card.style.display = ok ? "" : "none";
      if (ok) visible.push(card);
    });
    visible.sort(function (a, b) {
      if (sortBy === "capacity") return Number(b.getAttribute("data-capacity")) - Number(a.getAttribute("data-capacity"));
      if (sortBy === "lift") return Number(b.getAttribute("data-lift")) - Number(a.getAttribute("data-lift"));
      if (sortBy === "name") return a.getAttribute("data-name").localeCompare(b.getAttribute("data-name"), "cs");
      return 0;
    });
    visible.forEach(function (card) { grid.appendChild(card); });
    var filtered = query || brands.length || powers.length || rotary.length || caps.length || lifts.length || category !== "all" || sortBy !== "default";
    if (cancel) cancel.style.display = filtered ? "" : "none";
    if (countEl) countEl.textContent = "Nalezeno " + visible.length + " strojů";
    if (empty) empty.style.display = visible.length ? "none" : "block";
  }
  function resetFilters(event) {
    if (event) event.preventDefault();
    document.querySelectorAll("#filtr input[type=checkbox]").forEach(function (el) { el.checked = false; });
    if (search) search.value = "";
    if (sortDesktop) sortDesktop.value = "default";
    if (sortMobile) sortMobile.value = "default";
    category = "all";
    document.querySelectorAll("[data-category]").forEach(function (el) {
      el.classList.toggle("is-active", el.getAttribute("data-category") === "all");
    });
    apply();
  }
  document.querySelectorAll("#filtr input, #sort-by, #sort-by-mobile").forEach(function (el) {
    el.addEventListener("change", function () {
      if (el.id === "sort-by-mobile" && sortDesktop) sortDesktop.value = el.value;
      if (el.id === "sort-by" && sortMobile) sortMobile.value = el.value;
      apply();
    });
  });
  if (search) {
    search.addEventListener("keydown", function (event) {
      if (event.key === "Enter") { event.preventDefault(); apply(); }
    });
  }
  var searchBtn = document.getElementById("button-search");
  if (searchBtn) searchBtn.addEventListener("click", apply);
  var reset = document.getElementById("reset-filtr");
  var resetMobile = document.getElementById("reset-filtr-mobile");
  if (reset) reset.addEventListener("click", resetFilters);
  if (resetMobile) resetMobile.addEventListener("click", resetFilters);
  document.querySelectorAll("[data-category]").forEach(function (el) {
    el.addEventListener("click", function (event) {
      event.preventDefault();
      category = el.getAttribute("data-category");
      document.querySelectorAll("[data-category]").forEach(function (box) {
        box.classList.toggle("is-active", box === el);
      });
      apply();
    });
  });
  apply();
})();
</script>
</div>`;
}

function photoPickCard(category) {
  const href = `${listingPath(category.slug)}/index.html`;
  const img = `${SITE_PUJCOVNA}/kategorie-foto/${category.slug}.jpg`;
  return `        <a class="pick-card pick-card--photo" href="${href}">
          <span class="pick-thumb pick-thumb--photo" aria-hidden="true">
            <img src="${img}" alt="">
          </span>
          <span class="pick-name">${escapeHtml(category.title)}</span>
        </a>`;
}

const RENT_SWITCH_SRC = `${SITE_PUJCOVNA}/rent-switch.js`;
const DESKTOP_PRONAJEM_RE =
  /<li class="nav-item dropdown h-dropdown">\s*<a href="[^"]*\/pujcovna-vzv\/index\.html"[\s\S]*?h-dropdown-menu--pronajem[\s\S]*?<\/ul>\s*<\/li>/g;

const DESKTOP_PRONAJEM_PLAIN = `                                        <li class="nav-item dropdown h-dropdown">
                                            <a href="/pages/vzv.cz/cz/pujcovna-vzv/index.html" class="fs-6 nav-link text-uppercase
                                                                                            active-menu-dropdown">
                                                Pronájem
                                            </a>
                                                                                    </li>`;

const MOBILE_MENU_RE =
  /(<ul class="collapse list-unstyled ps-3"\s+id="mobile-menu-3">)[\s\S]*?(<\/ul>)/;

const MOBILE_PRONAJEM_SIMPLE = `
                                    <li>
                                        <a href="${SITE_PUJCOVNA}/index.html"
                                           class="d-flex gap-2 text-white-50 py-2 text-decoration-none text-uppercase">
                                                                                        Pronájem
                                        </a>
                                    </li>
                                `;

function renderTypePills(currentSlug) {
  const allCurrent = !currentSlug;
  const items = [
    `<a class="rent-pill${allCurrent ? " is-current" : ""}" href="${SITE_PUJCOVNA}/index.html">Všechny stroje</a>`,
    ...CATEGORIES.map((category) => {
      const current = category.slug === currentSlug;
      return `<a class="rent-pill${current ? " is-current" : ""}" href="${SITE_PUJCOVNA}/${category.slug}/index.html">${escapeHtml(category.title)}</a>`;
    }),
  ];
  return `<nav class="rent-pills" aria-label="Typ stroje">
        <span class="rent-pills-label">Typ:</span>
        <div class="rent-pills-row">
          ${items.join("\n          ")}
          <a class="rent-pills-nudge" href="${SITE_PUJCOVNA}/index.html#sluzby">Potřebujete servis, dopravu nebo obsluhu? Přepněte na <strong>Služby</strong> <span aria-hidden="true">→</span></a>
        </div>
      </nav>`;
}

function currentCategorySlug(filePath) {
  const rel = filePath.replaceAll("\\", "/");
  for (const category of CATEGORIES) {
    if (rel.includes(`/pujcovna-vzv/${category.slug}/`)) return category.slug;
  }
  return "";
}

function patchPronajemNav(html) {
  let out = html;
  if (out.includes("h-dropdown-menu--pronajem")) {
    const next = out.replace(DESKTOP_PRONAJEM_RE, DESKTOP_PRONAJEM_PLAIN);
    if (next === out) throw new Error("Could not remove Pronájem dropdown");
    out = next;
  }
  const mobileMatch = out.match(/id="mobile-menu-3">([\s\S]*?)<\/ul>/);
  if (mobileMatch && /Všechny stroje|Všechny služby/.test(mobileMatch[1])) {
    const next = out.replace(MOBILE_MENU_RE, `$1${MOBILE_PRONAJEM_SIMPLE}$2`);
    if (next === out) throw new Error("Could not restore mobile Pronájem menu");
    out = next;
  }
  return out;
}

function patchHubPills(html) {
  if (!html.includes('data-panel="pronajem"')) return html;
  const stripped = html.replace(
    /(<div class="rent-tab-panel" data-panel="(?:pronajem|sluzby)"[^>]*>)\s*<nav class="rent-pills"[\s\S]*?<\/nav>\s*(<div class="pick-grid">)/g,
    "$1\n        $2",
  );
  return stripped;
}

function patchListingPills(html, slug) {
  if (!html.includes("katalog-polozky") || html.includes("rent-detail")) return html;
  const pills = renderTypePills(slug);
  if (/<nav class="rent-pills"[\s\S]*?<\/nav>/.test(html)) {
    return html.replace(/<nav class="rent-pills"[\s\S]*?<\/nav>/, pills);
  }
  const afterIntro = `                    </div>
                    ${pills}
                    <div class="d-md-none px-3 mt-2 mb-3 col-12 fs-7" id="breadcrumb-mobile">`;
  const needle = `                    </div>
                    <div class="d-md-none px-3 mt-2 mb-3 col-12 fs-7" id="breadcrumb-mobile">`;
  if (html.includes('<p id="popis"') && html.includes(needle)) {
    return html.replace(needle, afterIntro);
  }
  throw new Error("Could not find catalog listing to insert type pills");
}

function patchDetailPills(html, slug) {
  if (!html.includes("rent-detail")) return html;
  const pills = renderTypePills(slug);
  if (/<nav class="rent-pills"[\s\S]*?<\/nav>/.test(html)) {
    return html.replace(/<nav class="rent-pills"[\s\S]*?<\/nav>/, pills);
  }
  const re =
    /(<div class="text-center mt-4">\s*<h1 class="text-uppercase" id="nadpis">[\s\S]*?<\/h1>\s*<\/div>)/;
  const next = html.replace(re, `$1\n                ${pills}`);
  if (next === html) throw new Error("Could not insert type pills on machine detail");
  return next;
}

function patchPagePills(html, filePath) {
  const slug = currentCategorySlug(filePath);
  if (filePath.replaceAll("\\", "/").endsWith("/pujcovna-vzv/index.html")) {
    return patchHubPills(html);
  }
  html = patchListingPills(html, slug);
  html = patchDetailPills(html, slug);
  return html;
}

function patchRentSwitchSrc(html) {
  return html.replaceAll(
    `${ASSET_ORIGIN}/assets/vzv.cz/assets/js/rent-switch.js`,
    RENT_SWITCH_SRC,
  );
}

function patchHubSwitchUx(html) {
  if (!html.includes('data-panel="sluzby"')) return html;

  if (!html.includes('data-nudge-for="pronajem"')) {
    const sluzbyNudge = `      <p class="rent-switch-nudge" data-nudge-for="sluzby">
        <button type="button" class="rent-switch-nudge-btn" data-tab-jump="sluzby">
          Potřebujete servis, dopravu nebo obsluhu?
          <span class="rent-switch-nudge-cta">Přepněte na <strong>Služby</strong><span class="rent-switch-nudge-arrow" aria-hidden="true"> →</span></span>
        </button>
      </p>`;
    const bothNudges = `${sluzbyNudge}
      <p class="rent-switch-nudge" data-nudge-for="pronajem" hidden>
        <button type="button" class="rent-switch-nudge-btn" data-tab-jump="pronajem">
          Hledáte stroj k zapůjčení?
          <span class="rent-switch-nudge-cta">Zpět na <strong>Pronájem</strong><span class="rent-switch-nudge-arrow" aria-hidden="true"> ←</span></span>
        </button>
      </p>`;
    if (!html.includes(sluzbyNudge)) {
      throw new Error("Could not find Služby tab nudge to patch");
    }
    html = html.replace(sluzbyNudge, bothNudges);
  }

  const marker = '<div class="rent-tab-panel" data-panel="sluzby"';
  const start = html.indexOf(marker);
  if (start < 0) return html;
  const end = html.indexOf("\n    </section>", start);
  if (end < 0) throw new Error("Could not find Služby panel end");
  let panel = html.slice(start, end);
  if (!panel.includes("pick-card--icon")) {
    panel = panel.replaceAll(
      'class="pick-card"',
      'class="pick-card pick-card--photo pick-card--icon"',
    );
    panel = panel.replaceAll(
      'class="pick-thumb pick-thumb--fill"',
      'class="pick-thumb pick-thumb--photo pick-thumb--icon pick-thumb--fill"',
    );
    panel = panel.replaceAll(
      'class="pick-thumb"',
      'class="pick-thumb pick-thumb--photo pick-thumb--icon"',
    );
    panel = panel.replace(
      /<span class="pick-name">([^<]*)<\/span>\s*<span class="pick-chevron" aria-hidden="true"><\/span>/g,
      `<span class="pick-name">$1</span>`,
    );
    if (!panel.includes("pick-card--icon") || panel.includes("pick-chevron")) {
      throw new Error("Could not restyle Služby hub tiles");
    }
  }
  panel = panel.replace(/\s*<span class="pick-meta">Otevře se na vzvrent\.cz<\/span>/g, "");
  panel = panel.replace(/ title="Otevře se na vzvrent\.cz"/g, "");
  panel = panel.replace(
    /<span class="pick-copy">\s*<span class="pick-name">([^<]*)<\/span>\s*<\/span>/g,
    `<span class="pick-name">$1</span>`,
  );
  return html.slice(0, start) + panel + html.slice(end);
}

function walkIndexHtml(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walkIndexHtml(path, acc);
    else if (entry.name === "index.html") acc.push(path);
  }
  return acc;
}

function patchPujcovnaHtmlFile(path) {
  let html = readFileSync(path, "utf8");
  html = patchPronajemNav(html);
  html = patchRentSwitchSrc(html);
  if (path.endsWith(`${join("pujcovna-vzv", "index.html")}`)) {
    html = patchHubSwitchUx(html);
  }
  html = patchPagePills(html, path);
  writeFileSync(path, html, "utf8");
}

function patchExistingPujcovnaUx() {
  const roots = [outDir, dumpDir].filter((dir) => existsSync(dir));
  let count = 0;
  for (const root of roots) {
    for (const path of walkIndexHtml(root)) {
      patchPujcovnaHtmlFile(path);
      count += 1;
    }
  }
  return count;
}

function patchPujcovnaHub(html) {
  let out = html;
  for (const category of CATEGORIES) {
    const hrefs = [
      `https://www\\.vzvrent\\.cz/stroje-k-zapujceni/${category.slug}(?:\\?[^"]*)?`,
      `${SITE_PUJCOVNA.replaceAll("/", "\\/")}/${category.slug}/index\\.html`,
    ];
    const re = new RegExp(
      `<a class="pick-card(?: pick-card--photo)?" href="(?:${hrefs.join("|")})"[^>]*>[\\s\\S]*?</a>`,
      "g",
    );
    if (!re.test(out)) {
      throw new Error(`Could not patch Pronájem card for ${category.slug}`);
    }
    re.lastIndex = 0;
    out = out.replace(re, photoPickCard(category));
  }
  if (!out.includes("Poptávka pronájmu:")) {
    const prefill = `
<script>
(function () {
  try {
    var params = new URLSearchParams(window.location.search);
    var stroj = params.get("stroj");
    if (!stroj) return;
    var note = document.querySelector("#poptavka textarea[name=\\"note\\"]");
    if (note && !note.value) {
      note.value = "Poptávka pronájmu: " + stroj;
    }
    var target = document.getElementById("poptavka");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (e) {}
})();
</script>
`;
    out = out.replace("</body>", `${prefill}\n</body>`);
  }
  out = patchPronajemNav(out);
  out = patchRentSwitchSrc(out);
  out = patchHubSwitchUx(out);
  out = patchHubPills(out);
  return out;
}

function updatePageMeta(html, { title, description, ogTitle }) {
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description" lang="cs" content="[^"]*" \/>/,
      `<meta name="description" lang="cs" content="${description}" />`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*"\/>/,
      `<meta property="og:title" content="${ogTitle}"/>`,
    )
    .replace(
      /<link rel="stylesheet" href="[^"]*pujcovna-proto\.css[^"]*" \/>/,
      `<link rel="stylesheet" href="${CATALOG_CSS}" />`,
    )
    .replace(
      /<link rel="stylesheet" href="[^"]*teleskopicke-katalog\.css[^"]*" \/>/,
      `<link rel="stylesheet" href="${CATALOG_CSS}" />`,
    )
    .replace(
      /<link rel="stylesheet" href="[^"]*pujcovna-katalog\.css[^"]*" \/>/,
      `<link rel="stylesheet" href="${CATALOG_CSS}" />`,
    );
}

async function loadSourceHtml(slug) {
  const localPath = join(sourceDir, `${slug}.html`);
  if (existsSync(localPath)) return readFileSync(localPath, "utf8");
  const legacy = join("/tmp/vzv-pages", slug === "teleskopicke-manipulatory" ? "vzvrent-tele.html" : `${slug}.html`);
  if (existsSync(legacy)) return readFileSync(legacy, "utf8");
  const url = `https://www.vzvrent.cz/stroje-k-zapujceni/${slug}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);
  return await response.text();
}

function splitChrome(hubHtml) {
  const contactMarker = '<div class="card card-contact">';
  const contactIdx = hubHtml.indexOf(contactMarker);
  const containerIdx = hubHtml.lastIndexOf('<div class="container">', contactIdx);
  const contentStart = hubHtml.indexOf('<div class="content-body">');
  if (contentStart < 0 || containerIdx < 0) {
    throw new Error("Could not split pujcovna chrome from content");
  }
  return {
    head: hubHtml.slice(0, contentStart),
    foot: hubHtml.slice(containerIdx),
  };
}

if (process.argv.includes("--hub-ux-only")) {
  const count = patchExistingPujcovnaUx();
  console.log(`Patched Pronájem UX on ${count} pages`);
  process.exit(0);
}

const hubPath = join(outDir, "index.html");
const hubHtml = patchPujcovnaHub(readFileSync(hubPath, "utf8"));
writeFileSync(hubPath, hubHtml, "utf8");
const chrome = splitChrome(hubHtml);

mkdirSync(outDir, { recursive: true });

for (const category of CATEGORIES) {
  const html = await loadSourceHtml(category.slug);
  const products = parseProducts(html, category.slug, category);
  if (products.length < category.minProducts) {
    throw new Error(`${category.slug}: expected >= ${category.minProducts} products, got ${products.length}`);
  }
  const listingDir = join(outDir, category.slug);
  mkdirSync(listingDir, { recursive: true });
  const listing = updatePageMeta(`${chrome.head}${renderCatalog(category, products)}${chrome.foot}`, {
    title: `${category.title} | VZV.cz`,
    description: category.description,
    ogTitle: category.title,
  });
  const outbound = listing.match(/https:\/\/www\.vzvrent\.cz\/stroje-k-zapujceni/g);
  if (outbound) {
    throw new Error(`${category.slug} listing still links out (${outbound.length})`);
  }
  writeFileSync(join(listingDir, "index.html"), listing, "utf8");
  for (const product of products) {
    const dir = join(listingDir, product.id);
    mkdirSync(dir, { recursive: true });
    const detail = updatePageMeta(`${chrome.head}${renderDetail(category, product)}${chrome.foot}`, {
      title: `${product.name} | VZV.cz`,
      description: `Pronájem: ${product.name}. ${category.title} k zapůjčení po celé ČR.`,
      ogTitle: product.name,
    });
    writeFileSync(join(dir, "index.html"), detail, "utf8");
  }
  console.log(`${category.slug}: ${products.length} machines`);
}

if (existsSync(dumpDir)) {
  cpSync(outDir, dumpDir, { recursive: true });
  console.log(`Synced dump ${dumpDir}`);
}

console.log(`Patched hub ${hubPath}`);
