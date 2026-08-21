import { readFile } from "fs/promises";
import path from "path";
import { generateCatalogSpecsPdf } from "@/lib/catalog-specs-pdf";

const CZECH_SPECS_PDF = path.join(
  process.cwd(),
  "public/documents/swb-130-130d-technicke-parametry-cz.pdf",
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const localeParam = searchParams.get("locale");
  const locale = localeParam === "en" ? "en" : "cz";

  if (locale !== "en") {
    const pdfBytes = await readFile(CZECH_SPECS_PDF);
    return new Response(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="SWB-130-130D-technicke-parametry.pdf"',
        "Cache-Control": "public, max-age=86400",
      },
    });
  }

  const pdfBytes = await generateCatalogSpecsPdf("walkie-bez-prizdvihem", locale);
  if (!pdfBytes) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="SWB-130-technicke-parametry.pdf"',
      "Cache-Control": "public, max-age=86400",
    },
  });
}
