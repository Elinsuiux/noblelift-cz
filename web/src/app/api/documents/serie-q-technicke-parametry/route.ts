import { readFile } from "fs/promises";
import path from "path";
import { generateSeriesDetailSpecsPdf } from "@/lib/generate-series-detail-specs-pdf";

const ENGLISH_SPECS_PDF = path.join(
  process.cwd(),
  "public/documents/fe4p16-20q-q2-en.pdf",
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const localeParam = searchParams.get("locale");
  const locale = localeParam === "en" ? "en" : "cz";

  if (locale === "en") {
    const pdfBytes = await readFile(ENGLISH_SPECS_PDF);
    return new Response(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="FE4P16-20Q-Q2.pdf"',
        "Cache-Control": "public, max-age=86400",
      },
    });
  }

  const pdfBytes = await generateSeriesDetailSpecsPdf("serie-q", locale);

  return new Response(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="serie-q-technicke-parametry.pdf"',
      "Cache-Control": "public, max-age=86400",
    },
  });
}
