import { readFile } from "fs/promises";
import path from "path";
import { generateDieselLpgSpecsPdf } from "@/lib/generate-diesel-lpg-specs-pdf";

const CZECH_SPECS_PDF = path.join(
  process.cwd(),
  "public/documents/cpc-d-20-38-technicke-parametry-cz.pdf",
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
          'attachment; filename="CPC-D-20-38-technicke-parametry.pdf"',
        "Cache-Control": "public, max-age=86400",
      },
    });
  }

  const pdfBytes = await generateDieselLpgSpecsPdf(locale);

  return new Response(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="diesel-lpg-technicke-parametry.pdf"',
      "Cache-Control": "public, max-age=86400",
    },
  });
}
