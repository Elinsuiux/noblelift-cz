import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const file = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "lib", "products-catalog.ts");
let source = readFileSync(file, "utf8");

const directReplacements = [
  [
    'specsPdfUrl: "/api/documents/serie-a-technicke-parametry"',
    `specsPdfUrl: "/documents/cpd-18-38-a2-technicke-parametry-cz.pdf",
      specsPdfUrlEn: "/documents/a2-series-1-5-3-8t-lithium-ion-forklift-trucks-en.pdf"`,
  ],
  [
    'specsPdfUrl: "/api/documents/serie-p-technicke-parametry"',
    `specsPdfUrl: "/documents/fep-30-38p-technicke-parametry-cz.pdf",
      specsPdfUrlEn: "/documents/fep25-38p-en.pdf"`,
  ],
  [
    'specsPdfUrl: "/api/documents/serie-n-technicke-parametry"',
    'specsPdfUrl: "/documents/fe3d16-20n1-technicke-parametry-cz.pdf"',
  ],
  [
    'specsPdfUrl: "/api/documents/swb-130-technicke-parametry"',
    'specsPdfUrl: "/documents/swb-130-130d-technicke-parametry-cz.pdf"',
  ],
  [
    'specsPdfUrl: "/api/documents/diesel-lpg-technicke-parametry"',
    `specsPdfUrl: "/documents/cpc-d-20-38-technicke-parametry-cz.pdf",
          specsPdfUrlEn: "/documents/a2-series-diesel-en.pdf"`,
  ],
];

for (const [from, to] of directReplacements) {
  const count = source.split(from).length - 1;
  if (count === 0) {
    console.warn("missing:", from);
  }
  source = source.split(from).join(to);
}

source = source.replace(
  /specsPdfUrl: "\/api\/documents\/catalog-specs\/([^"]+)"/g,
  (_match, id) =>
    `specsPdfUrl: "/documents/${id}-technicke-parametry-cz.pdf",\n      specsPdfUrlEn: "/documents/${id}-en.pdf"`,
);

if (source.includes("/api/documents/")) {
  console.error("Still contains /api/documents/ references");
  process.exit(1);
}

writeFileSync(file, source, "utf8");
console.log("Patched products-catalog.ts for static PDF paths.");
