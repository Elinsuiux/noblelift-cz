/**
 * Smoke-audit noblelift local site: pages, PDF refs, shop URLs.
 * Usage: node scripts/site-audit.mjs [baseUrl]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(__dirname, "..");
const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const publicDocs = path.join(webRoot, "public", "documents");

const CORE_PATHS = [
  "/",
  "/products",
  "/service",
  "/about",
  "/contact",
  "/company",
  "/privacy",
  "/cookies",
  "/terms",
];

const PRODUCT_PATHS_CZ = [
  "/produkty",
  "/produkty/celni-voziky",
  "/produkty/celni-voziky/elektricke",
  "/produkty/celni-voziky/elektricke/serie-a",
  "/produkty/celni-voziky/elektricke/serie-p",
  "/produkty/celni-voziky/elektricke/serie-n",
  "/produkty/celni-voziky/elektricke/serie-q",
  "/produkty/celni-voziky/elektricke/serie-n/fe3d16n1-fe3d20n1",
  "/produkty/celni-voziky/elektricke/serie-n/fe3r-12-e",
  "/produkty/celni-voziky/diesel-lpg",
  "/produkty/rucni-vysokozdvizne",
  "/produkty/rucni-vysokozdvizne/bez-plosiny",
  "/produkty/rucni-vysokozdvizne/bez-plosiny/bez-prizdvihem",
  "/produkty/rucni-vysokozdvizne/bez-plosiny/bez-prizdvihem/swb130",
  "/produkty/rucni-vysokozdvizne/bez-plosiny/bez-prizdvihem/pse15lc",
  "/produkty/rucni-vysokozdvizne/bez-plosiny/bez-prizdvihem/ps16l",
  "/produkty/rucni-vysokozdvizne/bez-plosiny/s-prizdvihem",
  "/produkty/rucni-vysokozdvizne/s-plosinou",
  "/produkty/rucni-vysokozdvizne/s-plosinou/bez-prizdvihem",
  "/produkty/rucni-vysokozdvizne/s-plosinou/s-prizdvihem",
  "/produkty/rucni-vysokozdvizne/obkrocne",
  "/produkty/rucni-vysokozdvizne/obkrocne/pse-12-nsl",
  "/produkty/rucni-vysokozdvizne/obkrocne/ps-16-tsl-ps-18-tsl",
  "/produkty/paletove-voziky",
  "/produkty/paletove-voziky/rucni-paletove-voziky",
  "/produkty/paletove-voziky/elektricke-paletove-voziky",
  "/produkty/terenni-voziky",
  "/produkty/terenni-voziky/terenni-voziky",
  "/produkty/terenni-voziky/manipulatory",
  "/produkty/retraky-vychystavaci",
  "/produkty/retraky-vychystavaci/retraky",
  "/produkty/retraky-vychystavaci/vychystavaci-voziky",
  "/produkty/nuzkove-plosiny",
];

const PRODUCT_PATHS_EN = [
  "/products",
  "/products/counterbalance-forklifts",
  "/products/counterbalance-forklifts/electric",
  "/products/counterbalance-forklifts/electric/series-a",
  "/products/counterbalance-forklifts/electric/series-p",
  "/products/counterbalance-forklifts/electric/series-n",
  "/products/counterbalance-forklifts/electric/series-q",
  "/products/counterbalance-forklifts/electric/series-n/fe3d16n1-fe3d20n1",
  "/products/counterbalance-forklifts/electric/series-n/fe3r-12-e",
  "/products/stackers",
  "/products/pallet-trucks",
  "/products/rough-terrain",
  "/products/reach-order-pickers",
  "/products/scissor-lifts",
];

const results = {
  pagesOk: [],
  pagesFail: [],
  pdfMissing: [],
  pdfOk: [],
  shopUrls: [],
  shopFail: [],
  htmlIssues: [],
};

async function checkUrl(url, { method = "GET", follow = true } = {}) {
  try {
    const res = await fetch(url, {
      method,
      redirect: follow ? "follow" : "manual",
      headers: { "user-agent": "noblelift-site-audit/1.0" },
    });
    return { ok: res.ok || (res.status >= 300 && res.status < 400), status: res.status, url: res.url };
  } catch (e) {
    return { ok: false, status: 0, error: String(e.message || e), url };
  }
}

function extractFromCatalog() {
  const catalogPath = path.join(webRoot, "src", "lib", "products-catalog.ts");
  const src = fs.readFileSync(catalogPath, "utf8");
  const pdfs = new Set();
  const shops = new Set();

  for (const m of src.matchAll(/["`](\/documents\/[^"'`]+)["`]/g)) {
    pdfs.add(m[1]);
  }
  for (const m of src.matchAll(/["`](https:\/\/www\.vzv\.cz[^"'`]+)["`]/g)) {
    shops.add(m[1]);
  }
  // Also API document routes that generate PDFs
  for (const m of src.matchAll(/["`](\/api\/documents\/[^"'`]+)["`]/g)) {
    pdfs.add(m[1]);
  }
  return { pdfs: [...pdfs], shops: [...shops] };
}

async function checkPage(locale, p) {
  const url = `${base}/${locale}${p === "/" ? "" : p}`;
  const r = await checkUrl(url);
  if (!r.ok || r.status >= 400) {
    results.pagesFail.push({ locale, path: p, status: r.status, error: r.error, final: r.url });
    return null;
  }
  results.pagesOk.push({ locale, path: p, status: r.status });

  // Fetch HTML for link/doc spot-checks on key pages
  try {
    const htmlRes = await fetch(url);
    const html = await htmlRes.text();
    if (/Došlo k chybě|Something went wrong|Application error/i.test(html)) {
      results.htmlIssues.push({ locale, path: p, issue: "error UI in HTML" });
    }
    if (/Insufficient params|MISSING_MESSAGE|INVALID_MESSAGE/i.test(html)) {
      results.htmlIssues.push({ locale, path: p, issue: "i18n/params error in HTML" });
    }
    // Broken image refs to missing /images
    const imgRefs = [...html.matchAll(/src="(\/images\/[^"]+)"/g)].map((x) => x[1]);
    for (const img of new Set(imgRefs).values()) {
      const imgPath = path.join(webRoot, "public", img.replace(/^\//, "").replace(/\//g, path.sep));
      if (!fs.existsSync(imgPath) && !img.includes("?")) {
        // next/image may use different paths; only flag if clearly under public
        if (img.startsWith("/images/")) {
          results.htmlIssues.push({ locale, path: p, issue: `missing image file: ${img}` });
        }
      }
    }
    return html;
  } catch (e) {
    results.htmlIssues.push({ locale, path: p, issue: `html fetch failed: ${e.message}` });
    return null;
  }
}

async function main() {
  console.log(`Auditing ${base} …\n`);

  // Core pages both locales
  for (const locale of ["cz", "en"]) {
    for (const p of CORE_PATHS) {
      const mapped =
        locale === "cz"
          ? p
              .replace("/products", "/produkty")
              .replace("/service", "/servis")
              .replace("/about", "/o-nas")
              .replace("/contact", "/kontakt")
              .replace("/company", "/identifikacni-udaje")
              .replace("/privacy", "/ochrana-osobnich-udaju")
              .replace("/cookies", "/cookies")
              .replace("/terms", "/obchodni-podminky")
          : p;
      // Keep EN paths as English if that's how routing works — probe both styles if needed
      await checkPage(locale, mapped === p && locale === "cz" && p === "/products" ? "/produkty" : mapped);
    }
  }

  for (const p of PRODUCT_PATHS_CZ) await checkPage("cz", p);
  for (const p of PRODUCT_PATHS_EN) await checkPage("en", p);

  // Also try EN Czech-slug fallbacks that might 404 (informational)
  // PDF file existence
  const { pdfs, shops } = extractFromCatalog();
  for (const pdf of pdfs) {
    if (pdf.startsWith("/api/")) {
      // Check API responds for both locales
      for (const locale of ["cz", "en"]) {
        const url = `${base}${pdf}${pdf.includes("?") ? "&" : "?"}locale=${locale}`;
        const r = await checkUrl(url);
        if (!r.ok) results.pdfMissing.push({ pdf: url, status: r.status, error: r.error });
        else results.pdfOk.push(url);
      }
      continue;
    }
    const file = path.join(publicDocs, path.basename(pdf));
    const alt = path.join(webRoot, "public", pdf.replace(/^\//, "").replace(/\//g, path.sep));
    if (fs.existsSync(alt) || fs.existsSync(file)) {
      results.pdfOk.push(pdf);
      // HTTP check
      const r = await checkUrl(`${base}${pdf}`);
      if (!r.ok) results.pdfMissing.push({ pdf, status: r.status, note: "file exists but HTTP fail", error: r.error });
    } else {
      results.pdfMissing.push({ pdf, status: "FILE_MISSING" });
    }
  }

  // Shop URL HEAD/GET (external — may be slow)
  console.log(`Checking ${shops.length} shop URLs…`);
  for (const shop of shops) {
    const r = await checkUrl(shop);
    if (!r.ok && r.status !== 403 && r.status !== 429) {
      // 403/429 still means reachable
      results.shopFail.push({ shop, status: r.status, error: r.error });
    } else {
      results.shopUrls.push({ shop, status: r.status || "ok" });
    }
  }

  // Summary
  const summary = {
    base,
    pagesOk: results.pagesOk.length,
    pagesFail: results.pagesFail,
    htmlIssues: results.htmlIssues,
    pdfOk: results.pdfOk.length,
    pdfMissing: results.pdfMissing,
    shopOk: results.shopUrls.length,
    shopFail: results.shopFail,
  };

  const outPath = path.join(webRoot, "scripts", "site-audit-out.json");
  fs.writeFileSync(outPath, JSON.stringify(summary, null, 2));
  console.log("\n=== SUMMARY ===");
  console.log(`Pages OK: ${summary.pagesOk}`);
  console.log(`Pages FAIL: ${summary.pagesFail.length}`);
  for (const f of summary.pagesFail) console.log("  FAIL", f);
  console.log(`HTML issues: ${summary.htmlIssues.length}`);
  for (const f of summary.htmlIssues.slice(0, 40)) console.log("  HTML", f);
  console.log(`PDFs OK: ${summary.pdfOk}`);
  console.log(`PDFs missing/fail: ${summary.pdfMissing.length}`);
  for (const f of summary.pdfMissing) console.log("  PDF", f);
  console.log(`Shop OK: ${summary.shopOk}`);
  console.log(`Shop FAIL: ${summary.shopFail.length}`);
  for (const f of summary.shopFail) console.log("  SHOP", f);
  console.log(`\nWrote ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
