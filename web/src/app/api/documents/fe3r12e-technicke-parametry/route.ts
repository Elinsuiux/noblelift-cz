import { readFile } from "fs/promises";
import path from "path";

const SPECS_PDF = path.join(process.cwd(), "public/documents/fe3r12e-en.pdf");

export async function GET() {
  const pdfBytes = await readFile(SPECS_PDF);

  return new Response(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="FE3R12E.pdf"',
      "Cache-Control": "public, max-age=86400",
    },
  });
}
