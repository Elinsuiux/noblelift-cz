import { readFile } from "fs/promises";
import path from "path";
import { generateSeriesDetailSpecsPdf } from "@/lib/generate-series-detail-specs-pdf";

const CZECH_SPECS_PDF = path.join(
  process.cwd(),
  "public/documents/fep-30-38p-technicke-parametry-cz.pdf",
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
          'attachment; filename="FEP-30-38P-technicke-parametry.pdf"',
        "Cache-Control": "public, max-age=86400",
      },
    });
  }

  const pdfBytes = await generateSeriesDetailSpecsPdf("serie-p", locale);

  return new Response(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="serie-p-technicke-parametry.pdf"',
      "Cache-Control": "public, max-age=86400",
    },
  });
}
