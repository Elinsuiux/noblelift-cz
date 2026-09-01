import { cpSync, existsSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.join(root, "..");
const apiPath = path.join(webRoot, "src", "app", "api");
const apiBackup = path.join(webRoot, ".static-export-api-backup");
const middlewarePath = path.join(webRoot, "src", "middleware.ts");
const middlewareBackup = path.join(webRoot, ".static-export-middleware-backup");
const nextIntlRequestLocaleFiles = [
  "node_modules/next-intl/dist/esm/production/server/react-server/RequestLocale.js",
  "node_modules/next-intl/dist/esm/development/server/react-server/RequestLocale.js",
];

const patchedRequestLocaleSource = `import{getCachedRequestLocale as e}from"./RequestLocaleCache.js";async function t(){const t=e();if(t)return t;return"cz"}export{t as getRequestLocale};`;

function patchNextIntlRequestLocale() {
  let patched = false;
  for (const relativePath of nextIntlRequestLocaleFiles) {
    const filePath = path.join(webRoot, relativePath);
    if (!existsSync(filePath)) continue;
    const backupPath = `${filePath}.static-export-backup`;
    if (!existsSync(backupPath)) {
      cpSync(filePath, backupPath);
    }
    writeFileSync(filePath, patchedRequestLocaleSource, "utf8");
    patched = true;
  }
  return patched;
}

function restoreNextIntlRequestLocale() {
  for (const relativePath of nextIntlRequestLocaleFiles) {
    const filePath = path.join(webRoot, relativePath);
    const backupPath = `${filePath}.static-export-backup`;
    if (!existsSync(backupPath)) continue;
    writeFileSync(filePath, readFileSync(backupPath, "utf8"), "utf8");
    rmSync(backupPath, { force: true });
  }
}

function run(command) {
  execSync(command, { cwd: webRoot, stdio: "inherit", env: process.env });
}

function hideApiRoutes() {
  if (!existsSync(apiPath)) return false;
  rmSync(apiBackup, { recursive: true, force: true });
  cpSync(apiPath, apiBackup, { recursive: true });
  rmSync(apiPath, { recursive: true, force: true });
  return true;
}

function restoreApiRoutes() {
  if (!existsSync(apiBackup)) return;
  rmSync(apiPath, { recursive: true, force: true });
  cpSync(apiBackup, apiPath, { recursive: true });
  rmSync(apiBackup, { recursive: true, force: true });
}

function hideMiddleware() {
  if (!existsSync(middlewarePath)) return false;
  rmSync(middlewareBackup, { force: true });
  cpSync(middlewarePath, middlewareBackup);
  rmSync(middlewarePath, { force: true });
  return true;
}

function restoreMiddleware() {
  if (!existsSync(middlewareBackup)) return;
  cpSync(middlewareBackup, middlewarePath);
  rmSync(middlewareBackup, { force: true });
}

function applyLocalizedStaticPaths() {
  const outDir = path.join(webRoot, "out");
  const czProducts = path.join(outDir, "cz", "products");
  const czProdukty = path.join(outDir, "cz", "produkty");

  if (!existsSync(czProducts)) {
    console.warn("⚠ Skipping CZ path remap: out/cz/products not found.");
    return;
  }

  if (existsSync(czProdukty)) {
    rmSync(czProdukty, { recursive: true, force: true });
  }

  renameSync(czProducts, czProdukty);
  console.log("→ Remapped out/cz/products → out/cz/produkty");
}

let apiHidden = false;
let middlewareHidden = false;
let nextIntlPatched = false;

try {
  console.log("→ Generating static PDFs…");
  run("npx tsx scripts/prebuild-static-pdfs.ts");

  if (existsSync(apiPath)) {
    console.log("→ Temporarily removing API routes (not supported in static export)…");
    apiHidden = hideApiRoutes();
  }

  if (existsSync(middlewarePath)) {
    console.log("→ Temporarily removing middleware (not used on static Apache hosting)…");
    middlewareHidden = hideMiddleware();
  }

  console.log("→ Patching next-intl for static export (skip headers())…");
  nextIntlPatched = patchNextIntlRequestLocale();

  console.log("→ Building static site (out/)…");
  process.env.STATIC_EXPORT = "1";
  try {
    rmSync(path.join(webRoot, ".next"), { recursive: true, force: true, maxRetries: 3, retryDelay: 500 });
  } catch {
    console.warn("⚠ Could not remove .next cache (dev server may be running). Continuing build…");
  }
  run("npx next build --webpack");

  console.log("→ Applying localized URL paths for static hosting…");
  applyLocalizedStaticPaths();

  console.log("\n✓ Static export ready in web/out/");
  console.log("  Upload the contents of out/ to your Apache document root.");
} catch (error) {
  console.error("\n✗ Static build failed.");
  throw error;
} finally {
  if (apiHidden) {
    restoreApiRoutes();
  }
  if (middlewareHidden) {
    restoreMiddleware();
  }
  if (nextIntlPatched) {
    restoreNextIntlRequestLocale();
  }
}
