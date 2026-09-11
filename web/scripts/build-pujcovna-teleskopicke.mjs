/**
 * Builds the green-site rental listing for Teleskopické manipulátory.
 *
 * Source catalog: https://www.vzvrent.cz/stroje-k-zapujceni/teleskopicke-manipulatory
 * Layout: Nové vozíky (sidebar filters + product cards).
 * Chrome: Pronájem header/footer from the VZV green static dump.
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const webRoot = join(__dirname, "..");
const tmpDir = "/tmp/vzv-pages";
const outDir = join(webRoot, "public", "pages", "vzv.cz", "cz", "pujcovna-vzv");
const listingDir = join(outDir, "teleskopicke-manipulatory");
const SOURCE_URL = "https://www.vzvrent.cz/stroje-k-zapujceni/teleskopicke-manipulatory";

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

function parseProducts(html) {
  const startRe =
    /<div class="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mt-3 mb-3 d-flex align-items-stretch print-height">/g;
  const indices = [];
  let match;
  while ((match = startRe.exec(html))) {
    indices.push(match.index);
  }

  const products = [];
  for (let i = 0; i < indices.length; i++) {
    const nextRow = html.indexOf('<div class="row mt-5', indices[i]);
    const chunk = html.slice(indices[i], indices[i + 1] ?? (nextRow === -1 ? html.length : nextRow));
    const name = chunk
      .match(/text-title[^>]*>([\s\S]*?)<\/a>/)?.[1]
      ?.replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    const href = chunk.match(
      /href="(https:\/\/www\.vzvrent\.cz\/stroje-k-zapujceni\/teleskopicke-manipulatory\/[^"#]+)"/,
    )?.[1];
    const img = chunk.match(/src="(https:\/\/admin\.vzv\.cz\/img\.php\?[^"]+)"/)?.[1];
    const specs = {};
    const specRe =
      /<div class="col-sm-6 col-8">([^<]+)<\/div>\s*<div class="col-sm-6 col-4">([^<]+)<\/div>/g;
    let specMatch;
    while ((specMatch = specRe.exec(chunk))) {
      specs[specMatch[1].trim()] = specMatch[2].trim();
    }
    if (!name || !href || !img) continue;
    products.push({
      id: href.split("/").pop() || `item-${i}`,
      name,
      href,
      img,
      specs,
      brand: name.split(/\s+/)[0].toUpperCase(),
      rotary: /\bMRT\b/i.test(name),
      power: specs.Pohon || "Diesel",
      capacity: parseKgMm(specs.Nosnost),
      lift: parseKgMm(specs["Výška zdvihu"]),
    });
  }
  return products;
}

function nestRelativeUrls(html) {
  return html.replace(
    /\b(href|src|data-url)=(['"])(?!https?:|\/\/|mailto:|tel:|javascript:|#|data:)([^'"]+)\2/g,
    (_full, attr, quote, url) => `${attr}=${quote}../${url}${quote}`,
  );
}

function patchPujcovnaHub(html) {
  const linked = html.replace(
    /<a class="pick-card" href="https:\/\/www\.vzvrent\.cz\/stroje-k-zapujceni\/teleskopicke-manipulatory" target="_blank" rel="noopener noreferrer">/,
    '<a class="pick-card" href="teleskopicke-manipulatory/index.html">',
  );

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
  return linked.replace("</body>", `${prefill}\n</body>`);
}

function renderCard(product) {
  const specRows = ["Pohon", "Nosnost", "Výška zdvihu", "Průjezdní výška", "Hmotnost"]
    .filter((key) => product.specs[key])
    .map(
      (key) => `<div class="row">
                                <div class="col-8">${escapeHtml(key)}</div>
                                <div class="col-4 text-end">${escapeHtml(product.specs[key])}</div>
                            </div>`,
    )
    .join("");
  const poptat = `../index.html?stroj=${encodeURIComponent(product.name)}#poptavka`;
  const sticker = product.rotary
    ? '<span class="rent-sticker">Rotační</span>'
    : "";

  return `<div class="col-12 col-md-6 col-xl-4 mb-4 rent-machine"
                     data-name="${escapeHtml(product.name.toLowerCase())}"
                     data-brand="${escapeHtml(product.brand)}"
                     data-power="${escapeHtml(product.power)}"
                     data-rotary="${product.rotary ? "1" : "0"}"
                     data-capacity="${product.capacity}"
                     data-lift="${product.lift}">
                    <article class="card card-vzv">
                        <div class="card-img" style="background-image: url('${escapeHtml(product.img)}');">
                            ${sticker}
                            <a href="${escapeHtml(product.href)}" target="_blank" rel="noopener noreferrer" title="Detail ${escapeHtml(product.name)}"></a>
                        </div>
                        <div class="card-vzv-body">
                            <a class="card-vzv-title" href="${escapeHtml(product.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(product.name)}</a>
                            <div class="card-body-parametry">${specRows}</div>
                        </div>
                        <div class="card-vzv-actions">
                            <a class="btn btn-dark" href="${escapeHtml(product.href)}" target="_blank" rel="noopener noreferrer">Detail</a>
                            <a class="btn btn-primary" href="${poptat}">Poptat</a>
                        </div>
                    </article>
                </div>`;
}

function renderCatalog(products) {
  const brands = [...new Set(products.map((item) => item.brand))].sort();
  const brandChecks = brands
    .map(
      (brand) => `<div class="col-12">
                    <div class="form-check mb-1">
                        <input class="form-check-input" type="checkbox" value="${escapeHtml(brand)}" id="brand-${escapeHtml(brand.toLowerCase())}" data-filter="brand">
                        <label class="form-check-label text-uppercase fs-7 text-dark" for="brand-${escapeHtml(brand.toLowerCase())}">${escapeHtml(brand)}</label>
                    </div>
                </div>`,
    )
    .join("");
  const cards = products.map(renderCard).join("\n                ");
  const rotaryImg =
    products.find((item) => item.rotary)?.img || products[0]?.img || "";

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
            <a href="index.html" class="text-uppercase text-primary text-decoration-none fw-bold" id="reset-filtr">Zrušit filtr</a>
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

        <div class="row mt-md-3 ms-md-2 pb-3 bg-light-dark filtr-type">
        <div class="col-12 text-primary pt-3 mb-2 text-uppercase">Typ vozíku</div>
        <div class="col-12">
            <div class="form-check mb-1">
                <input class="form-check-input" type="checkbox" value="0" id="type-standard" data-filter="rotary">
                <label class="form-check-label fs-7 text-dark" for="type-standard">Teleskopický manipulátor</label>
            </div>
        </div>
        <div class="col-12">
            <div class="form-check mb-1">
                <input class="form-check-input" type="checkbox" value="1" id="type-rotary" data-filter="rotary">
                <label class="form-check-label fs-7 text-dark" for="type-rotary">Rotační manipulátor</label>
            </div>
        </div>
    </div>

        <div class="row mt-md-3 ms-md-2 pb-3 bg-light-dark filtr-power">
        <div class="col-12 text-primary pt-3 mb-2 text-uppercase">Pohon</div>
        <div class="col-12">
            <div class="form-check mb-1">
                <input class="form-check-input" type="checkbox" value="Diesel" id="power-diesel" data-filter="power">
                <label class="form-check-label fs-7 text-dark" for="power-diesel">Diesel</label>
            </div>
        </div>
    </div>

        <div class="row mt-md-3 ms-md-2 pb-3 bg-light-dark filtr-brand">
        <div class="col-12 text-primary pt-3 mb-2 text-uppercase">Značka</div>
        ${brandChecks}
    </div>

        <div class="row mt-md-3 ms-md-2 pb-3 bg-light-dark filtr-capacity">
        <div class="col-12 text-primary pt-3 mb-2 text-uppercase">Nosnost</div>
        <div class="col-12">
            <div class="form-check mb-1">
                <input class="form-check-input" type="checkbox" value="0-3000" id="cap-1" data-filter="capacity">
                <label class="form-check-label fs-7 text-dark" for="cap-1">do 3 000 kg</label>
            </div>
        </div>
        <div class="col-12">
            <div class="form-check mb-1">
                <input class="form-check-input" type="checkbox" value="3001-5000" id="cap-2" data-filter="capacity">
                <label class="form-check-label fs-7 text-dark" for="cap-2">3 000 – 5 000 kg</label>
            </div>
        </div>
        <div class="col-12">
            <div class="form-check mb-1">
                <input class="form-check-input" type="checkbox" value="5001-999999" id="cap-3" data-filter="capacity">
                <label class="form-check-label fs-7 text-dark" for="cap-3">nad 5 000 kg</label>
            </div>
        </div>
    </div>

        <div class="row mt-md-3 ms-md-2 pb-3 bg-light-dark filtr-lift">
        <div class="col-12 text-primary pt-3 mb-2 text-uppercase">Výška zdvihu</div>
        <div class="col-12">
            <div class="form-check mb-1">
                <input class="form-check-input" type="checkbox" value="0-10000" id="lift-1" data-filter="lift">
                <label class="form-check-label fs-7 text-dark" for="lift-1">do 10 m</label>
            </div>
        </div>
        <div class="col-12">
            <div class="form-check mb-1">
                <input class="form-check-input" type="checkbox" value="10001-15000" id="lift-2" data-filter="lift">
                <label class="form-check-label fs-7 text-dark" for="lift-2">10 – 15 m</label>
            </div>
        </div>
        <div class="col-12">
            <div class="form-check mb-1">
                <input class="form-check-input" type="checkbox" value="15001-999999" id="lift-3" data-filter="lift">
                <label class="form-check-label fs-7 text-dark" for="lift-3">nad 15 m</label>
            </div>
        </div>
    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-9 col-xxl-10 katalog-polozky pe-md-5">
            <div class="row mt-4">
                <div class="col-xxl-8 col-xl-10 mx-auto">
                    <div class="col-12 text-center">
                        <h1 class="text-uppercase" id="nadpis">Teleskopické manipulátory</h1>
                        <p id="popis" class="collapsed">
                            Silné univerzální stroje s vidlemi, lžící, jeřábovým hákem a montážním košem. Díky pohonu všech čtyř kol disponují manipulátory vysokou průjezdností těžkým terénem. Ideální pro stavby a zemědělství. Pronajímáme teleskopické manipulátory značek Manitou, JCB, Genie a Linde.
                        </p>
                        <a id="popis-vice-btn" href="javascript:void(0)">Číst dále</a>
                    </div>
                    <div class="d-md-none px-3 mt-2 mb-3 col-12 fs-7" id="breadcrumb-mobile">
                        <a href="../index.html" class="new-breadcrumb">Pronájem</a>
                        <span class="new-breadcrumb"> / </span>
                        <span class="new-breadcrumb is-current">Teleskopické manipulátory</span>
                    </div>
                    <div id="category-wrap">
                        <div class="container my-5" id="category-box">
                            <div class="row g-4 justify-content-center">
                                <div class="col-12 col-md-6">
                                    <a href="javascript:void(0)" class="category-box text-decoration-none is-active" data-category="all">
                                        <div class="category-box__image">
                                            <img src="${escapeHtml(products[0]?.img || "")}" alt="Teleskopické manipulátory">
                                        </div>
                                        <div class="category-box__title">Všechny stroje</div>
                                    </a>
                                </div>
                                <div class="col-12 col-md-6">
                                    <a href="javascript:void(0)" class="category-box text-decoration-none" data-category="rotary">
                                        <div class="category-box__image">
                                            <img src="${escapeHtml(rotaryImg)}" alt="Rotační manipulátory">
                                        </div>
                                        <div class="category-box__title">Rotační manipulátory</div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 mt-3 mb-3 text-center rent-result-count" id="result-count"></div>
            </div>

            <div class="row d-flex d-md-none justify-content-center ps-3 pe-3">
                <div class="col-12 d-flex pl-2 pb-3">
                    <a href="index.html" class="fs-7 text-decoration-underline" id="reset-filtr-mobile">Zrušit filtr</a>
                </div>
                <div class="col-6 d-flex justify-content-center align-items-center">
                    <select class="form-select fs-7 select-btn" name="sort-by-mobile" id="sort-by-mobile">
                        <option value="default">Seřadit - Výchozí</option>
                        <option value="capacity">Seřadit - Podle nosnosti</option>
                        <option value="lift">Seřadit - Podle výšky zdvihu</option>
                        <option value="name">Seřadit - Podle názvu</option>
                    </select>
                </div>
                <div class="col-6 d-flex justify-content-center align-items-center">
                    <button class="btn btn-dark text-light text-uppercase w-100" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasFiltr">Filtr</button>
                </div>
            </div>

            <div class="row d-none d-md-flex justify-content-end">
                <div class="col-12 col-md-10" id="breadcrumb">
                    <a href="../index.html" class="new-breadcrumb">Pronájem</a>
                    <span class="new-breadcrumb"> / </span>
                    <span class="new-breadcrumb is-current">Teleskopické manipulátory</span>
                </div>
                <div class="col-12 col-md-2">
                    <select class="form-select fs-7" name="sort-by" id="sort-by">
                        <option value="default">Seřadit - Výchozí</option>
                        <option value="capacity">Seřadit - Podle nosnosti</option>
                        <option value="lift">Seřadit - Podle výšky zdvihu</option>
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
                            <a class="btn btn-primary btn-lg rounded-0" href="../index.html#poptavka">Kontaktní formulář</a>
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
      var min = Number(parts[0]);
      var max = Number(parts[1]);
      return value >= min && value <= max;
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
      if (category === "rotary" && card.getAttribute("data-rotary") !== "1") ok = false;
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
      var rotaryBox = document.getElementById("type-rotary");
      var standardBox = document.getElementById("type-standard");
      if (rotaryBox) rotaryBox.checked = category === "rotary";
      if (standardBox) standardBox.checked = false;
      apply();
    });
  });
  var more = document.getElementById("popis-vice-btn");
  var popis = document.getElementById("popis");
  if (more && popis) {
    more.addEventListener("click", function (event) {
      event.preventDefault();
      popis.classList.remove("collapsed");
      more.remove();
    });
  }
  apply();
})();
</script>
</div>`;
}

async function loadSourceHtml(fileName, url) {
  const localPath = join(tmpDir, fileName);
  try {
    return readFileSync(localPath, "utf8");
  } catch {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status}`);
    }
    return await response.text();
  }
}

function updateListingMeta(html) {
  return html
    .replace(
      /<title>[^<]*<\/title>/,
      "<title>Teleskopické manipulátory | VZV.cz</title>",
    )
    .replace(
      /<meta name="description" lang="cs" content="[^"]*" \/>/,
      '<meta name="description" lang="cs" content="Pronájem teleskopických manipulátorů Manitou, JCB, Genie a Linde po celé ČR. Rotační i standardní stroje s vidlemi, lžící, hákem a montážním košem." />',
    )
    .replace(
      /<meta property="og:title" content="[^"]*"\/>/,
      '<meta property="og:title" content="Teleskopické manipulátory"/>',
    )
    .replace(
      /<link rel="stylesheet" href="\.\.\/pujcovna-proto\.css[^"]*" \/>/,
      '<link rel="stylesheet" href="teleskopicke-katalog.css" />',
    );
}

const pujcovna = patchPujcovnaHub(readFileSync(join(tmpDir, "pujcovna.html"), "utf8"));
const vzvrentHtml = await loadSourceHtml("vzvrent-tele.html", SOURCE_URL);
const products = parseProducts(vzvrentHtml);
if (products.length < 8) {
  throw new Error(`Expected telehandler products, got ${products.length}`);
}

mkdirSync(listingDir, { recursive: true });
copyFileSync(join(tmpDir, "colors-green.css"), join(outDir, "colors-green.css"));
copyFileSync(join(tmpDir, "pujcovna-proto.css"), join(outDir, "pujcovna-proto.css"));
writeFileSync(join(outDir, "index.html"), pujcovna, "utf8");

const contactMarker = '<div class="card card-contact">';
const contactIdx = pujcovna.indexOf(contactMarker);
const containerIdx = pujcovna.lastIndexOf('<div class="container">', contactIdx);
const contentStart = pujcovna.indexOf('<div class="content-body">');
if (contentStart < 0 || containerIdx < 0) {
  throw new Error("Could not split pujcovna chrome from content");
}

const chromeHead = nestRelativeUrls(pujcovna.slice(0, contentStart));
const chromeFoot = nestRelativeUrls(pujcovna.slice(containerIdx));
const listing = updateListingMeta(`${chromeHead}${renderCatalog(products)}${chromeFoot}`);
writeFileSync(join(listingDir, "index.html"), listing, "utf8");

console.log(`Wrote ${products.length} machines to ${join(listingDir, "index.html")}`);
console.log(`Patched hub ${join(outDir, "index.html")}`);
