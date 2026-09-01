import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const webRoot = join(__dirname, "..");

const sourceHtml = join(
  "C:",
  "Users",
  "ElinaSkubina-VZV",
  "Documents",
  "VZV",
  "vzv-static",
  "pages",
  "vzv.cz",
  "cz",
  "aktualne-skladem",
  "voziky-skladem",
  "index.html",
);

const outputs = [
  {
    dir: join(webRoot, "public", "voziky-skladem-green"),
    useCdnAssets: true,
  },
  {
    dir: join(
      "C:",
      "Users",
      "ElinaSkubina-VZV",
      "Documents",
      "VZV",
      "vzv-static",
      "pages",
      "vzv.cz",
      "cz",
      "aktualne-skladem",
      "voziky-skladem-green",
    ),
    useCdnAssets: false,
  },
];

const ASSET_BASE = "https://www.vzv.cz/assets/vzv.cz/assets";
const RELATIVE_ASSET = "../../../../../assets/vzv.cz/assets/";

/** Map red brand colors → green palette */
const colorReplacements = [
  ["#e50505", "#73FB61"],
  ["#E50505", "#73FB61"],
  ["#e23b30", "#4FFA38"],
  ["#E23B30", "#4FFA38"],
  ["#b80303", "#0E6303"],
  ["#B80303", "#0E6303"],
  ["#fe0000", "#73FB61"],
  ["#FE0000", "#73FB61"],
  ["#f70303", "#73FB61"],
  ["#F70303", "#73FB61"],
  ["#dc1e1e", "#1CC705"],
  ["#DC1E1E", "#1CC705"],
  ["#A30303FF", "#0E6303"],
  ["#a30303", "#0E6303"],
  ["#dc4d4d", "#4FFA38"],
  ["#DC4D4D", "#4FFA38"],
  ["#ff5400", "#159504"],
  ["#FF5400", "#159504"],
  ["#ef2c34", "#1CC705"],
  ["#EF2C34", "#1CC705"],
  ["#ef4b14", "#159504"],
  ["#EF4B14", "#159504"],
];

function replaceColors(text) {
  let result = text;
  for (const [from, to] of colorReplacements) {
    result = result.split(from).join(to);
  }
  return result;
}

function rewriteAssetPaths(html, useCdn) {
  if (useCdn) {
    return html.replace(
      /\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/assets\/vzv\.cz\/assets\//g,
      `${ASSET_BASE}/`,
    );
  }
  return html;
}

function injectGreenTheme(html) {
  const greenCss = '<link rel="stylesheet" href="colors-green.css" />';
  if (html.includes("colors-green.css")) return html;
  return html.replace(
    /<link rel="stylesheet" href="[^"]*colors\.css" \/>/,
    (match) => `${match}\n    ${greenCss}`,
  );
}

function updateMeta(html) {
  return html
    .replace(
      /<title>[^<]*<\/title>/,
      "<title>použité vozíky | VZV.cz (green theme)</title>",
    )
    .replace(
      /<meta property="og:site_name" content="[^"]*"\/>/,
      '<meta property="og:site_name" content="použité vozíky — green theme"/>',
    );
}

function applyNewLogo(html, useCdnAssets) {
  const logoPath = useCdnAssets
    ? "logo-green.png"
    : "../../../../../assets/vzv.cz/assets/img/logo/logo-green.png";

  return html
    .replace(
      /<meta property="og:image" content="[^"]*"\/>/,
      `<meta property="og:image" content="${logoPath}" />`,
    )
    .replace(
      /<img src="[^"]*\/logo\/logo\.webp" alt="VZV\.cz">/,
      `<img src="${logoPath}" alt="VZV.cz">`,
    );
}

const source = readFileSync(sourceHtml, "utf8");
const greenCssSource = join(webRoot, "public", "voziky-skladem-green", "colors-green.css");
const logoSource = join(webRoot, "public", "voziky-skladem-green", "logo-green.png");
const logoAssetDest = join(
  "C:",
  "Users",
  "ElinaSkubina-VZV",
  "Documents",
  "VZV",
  "vzv-static",
  "assets",
  "vzv.cz",
  "assets",
  "img",
  "logo",
  "logo-green.png",
);

mkdirSync(dirname(logoAssetDest), { recursive: true });
copyFileSync(logoSource, logoAssetDest);

for (const { dir, useCdnAssets } of outputs) {
  let html = source;
  html = rewriteAssetPaths(html, useCdnAssets);
  html = replaceColors(html);
  html = injectGreenTheme(html);
  html = updateMeta(html);
  html = applyNewLogo(html, useCdnAssets);

  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html, "utf8");
  copyFileSync(greenCssSource, join(dir, "colors-green.css"));
  copyFileSync(logoSource, join(dir, "logo-green.png"));

  console.log(`Created: ${join(dir, "index.html")} (${(html.length / 1024).toFixed(0)} KB)`);
}
