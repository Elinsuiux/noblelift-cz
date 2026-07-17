import { generateCatalogSpecsPdf, catalogSpecsPdfFilename } from "@/lib/catalog-specs-pdf";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const { searchParams } = new URL(request.url);
  const localeParam = searchParams.get("locale");
  const locale = localeParam === "en" ? "en" : "cz";

  const pdfBytes = await generateCatalogSpecsPdf(id, locale);
  if (!pdfBytes) {
    return new Response("Not found", { status: 404 });
  }

  const filename = catalogSpecsPdfFilename(id);

  return new Response(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
