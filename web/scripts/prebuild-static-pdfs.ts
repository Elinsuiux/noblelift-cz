import { mkdir, writeFile } from "fs/promises";
import path from "path";
import {
  catalogSpecsPdfFilename,
  generateCatalogSpecsPdf,
} from "../src/lib/catalog-specs-pdf";
import { generateSeriesDetailSpecsPdf } from "../src/lib/generate-series-detail-specs-pdf";

const CATALOG_SPEC_IDS = [
  "walkie-bez-prizdvihem",
  "walkie-s-prizdvihem",
  "rider-bez-prizdvihem",
  "rider-s-prizdvihem",
  "manual",
  "terrain-forklifts",
  "telehandlers",
  "reach-trucks",
  "order-pickers",
  "scissor",
] as const;

const EXTRA_STATIC_PDFS: Array<{
  id: string;
  czFilename: string;
  enFilename: string;
}> = [
  {
    id: "straddle-pse12nsl",
    czFilename: "straddle-technicke-parametry-cz.pdf",
    enFilename: "straddle-en.pdf",
  },
];

const documentsDir = path.join(process.cwd(), "public", "documents");

async function writePdf(filePath: string, bytes: Uint8Array) {
  await writeFile(filePath, bytes);
  console.log("wrote", path.relative(process.cwd(), filePath));
}

async function main() {
  await mkdir(documentsDir, { recursive: true });

  for (const id of CATALOG_SPEC_IDS) {
    for (const locale of ["cz", "en"] as const) {
      const pdfBytes = await generateCatalogSpecsPdf(id, locale);
      if (!pdfBytes) {
        throw new Error(`Missing catalog PDF source for ${id} (${locale})`);
      }

      const filename =
        locale === "cz"
          ? `${id}-technicke-parametry-cz.pdf`
          : `${id}-en.pdf`;

      await writePdf(path.join(documentsDir, filename), pdfBytes);
    }
  }

  for (const entry of EXTRA_STATIC_PDFS) {
    for (const locale of ["cz", "en"] as const) {
      const pdfBytes = await generateCatalogSpecsPdf(entry.id, locale);
      if (!pdfBytes) {
        throw new Error(`Missing catalog PDF source for ${entry.id} (${locale})`);
      }

      const filename = locale === "cz" ? entry.czFilename : entry.enFilename;
      await writePdf(path.join(documentsDir, filename), pdfBytes);
    }
  }

  const serieQCz = await generateSeriesDetailSpecsPdf("serie-q", "cz");
  await writePdf(
    path.join(documentsDir, "serie-q-technicke-parametry-cz.pdf"),
    serieQCz,
  );

  console.log("Static PDF prebuild complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
