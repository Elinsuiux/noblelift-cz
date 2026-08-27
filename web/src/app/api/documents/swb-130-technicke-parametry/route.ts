import { readFile } from "fs/promises";
import path from "path";

const CZECH_SPECS_PDF = path.join(
  process.cwd(),
  "public/documents/swb-130-130d-technicke-parametry-cz.pdf",
);

const ENGLISH_SPECS_PDF = path.join(
  process.cwd(),
  "public/documents/swb-130-130d-en.pdf",
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
        "Content-Disposition": 'attachment; filename="SWB-130-130S-130D.pdf"',
        "Cache-Control": "public, max-age=86400",
      },
    });
  }

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
