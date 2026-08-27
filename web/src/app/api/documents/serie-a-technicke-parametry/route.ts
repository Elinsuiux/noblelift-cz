import { readFile } from "fs/promises";
import path from "path";

const CZECH_SPECS_PDF = path.join(
  process.cwd(),
  "public/documents/cpd-18-38-a2-technicke-parametry-cz.pdf",
);

const ENGLISH_SPECS_PDF = path.join(
  process.cwd(),
  "public/documents/a2-series-1-5-3-8t-lithium-ion-forklift-trucks-en.pdf",
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
        "Content-Disposition":
          'attachment; filename="A2-Series-1.5-3.8t-Lithium-Ion-Forklift-Trucks.pdf"',
        "Cache-Control": "public, max-age=86400",
      },
    });
  }

  const pdfBytes = await readFile(CZECH_SPECS_PDF);
  return new Response(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="CPD-18-38-A2-technicke-parametry.pdf"',
      "Cache-Control": "public, max-age=86400",
    },
  });
}
