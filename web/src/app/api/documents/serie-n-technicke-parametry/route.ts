import { readFile } from "fs/promises";
import path from "path";
import { generateSeriesDetailSpecsPdf } from "@/lib/generate-series-detail-specs-pdf";

const CZECH_SPECS_PDF = path.join(
  process.cwd(),
  "public/documents/fe3d16-20n1-technicke-parametry-cz.pdf",
);

const ENGLISH_SPECS_PDF = path.join(
  process.cwd(),
  "public/documents/fe3d16-20n1-en.pdf",
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
        "Content-Disposition": 'attachment; filename="FE3D16-20N1.pdf"',
        "Cache-Control": "public, max-age=86400",
      },
    });
  }

  try {
    const pdfBytes = await readFile(CZECH_SPECS_PDF);
    return new Response(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="FE3D16-20N1-technicke-parametry.pdf"',
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    const pdfBytes = await generateSeriesDetailSpecsPdf("serie-n", locale);
    return new Response(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="serie-n-technicke-parametry.pdf"',
        "Cache-Control": "public, max-age=86400",
      },
    });
  }
}
