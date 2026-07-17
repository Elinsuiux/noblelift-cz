import { generateSerieASpecsPdf } from "@/lib/generate-serie-a-specs-pdf";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const localeParam = searchParams.get("locale");
  const locale = localeParam === "en" ? "en" : "cz";

  const pdfBytes = await generateSerieASpecsPdf(locale);

  return new Response(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="serie-a-technicke-parametry.pdf"',
      "Cache-Control": "public, max-age=86400",
    },
  });
}
