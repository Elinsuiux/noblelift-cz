import { PDFDocument, StandardFonts, rgb, type PDFPage, type PDFFont } from "pdf-lib";
import {
  SERIES_DETAIL_PDF_CONTENT,
  type SeriesDetailPdfContent,
  type SeriesDetailPdfId,
} from "@/lib/series-pnqs-specs-data";

const A4_PORTRAIT: [number, number] = [595.28, 841.89];

const ORANGE = rgb(0.91, 0.35, 0.05);
const HEADER_BG = rgb(0.96, 0.96, 0.96);
const BORDER = rgb(0.82, 0.82, 0.82);
const TEXT = rgb(0.15, 0.15, 0.15);
const MUTED = rgb(0.45, 0.45, 0.45);

function wrapText(text: string, maxChars: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxChars) {
      current = next;
    } else {
      if (current) {
        lines.push(current);
      }
      current = word;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

function toPdfText(text: string) {
  return text
    .replace(/×/g, "x")
    .replace(/–/g, "-")
    .replace(/·/g, "-")
    .replace(/š/g, "s")
    .replace(/Š/g, "S")
    .replace(/č/g, "c")
    .replace(/Č/g, "C")
    .replace(/ř/g, "r")
    .replace(/Ř/g, "R")
    .replace(/ž/g, "z")
    .replace(/Ž/g, "Z")
    .replace(/ý/g, "y")
    .replace(/Ý/g, "Y")
    .replace(/á/g, "a")
    .replace(/Á/g, "A")
    .replace(/í/g, "i")
    .replace(/Í/g, "I")
    .replace(/é/g, "e")
    .replace(/É/g, "E")
    .replace(/ú/g, "u")
    .replace(/Ú/g, "U")
    .replace(/ů/g, "u")
    .replace(/Ů/g, "U")
    .replace(/ě/g, "e")
    .replace(/Ě/g, "E")
    .replace(/ď/g, "d")
    .replace(/Ď/g, "D")
    .replace(/ť/g, "t")
    .replace(/Ť/g, "T")
    .replace(/ň/g, "n")
    .replace(/Ň/g, "N")
    .replace(/ó/g, "o")
    .replace(/Ó/g, "O");
}

function drawPdfText(
  page: PDFPage,
  text: string,
  options: {
    x: number;
    y: number;
    size: number;
    font: PDFFont;
    color: ReturnType<typeof rgb>;
    maxWidth?: number;
    lineHeight?: number;
  },
) {
  const lineHeight = options.lineHeight ?? options.size + 3;
  const lines = options.maxWidth
    ? wrapText(text, Math.floor(options.maxWidth / (options.size * 0.5)))
    : [text];

  lines.forEach((line, index) => {
    page.drawText(toPdfText(line), {
      x: options.x,
      y: options.y - index * lineHeight,
      size: options.size,
      font: options.font,
      color: options.color,
    });
  });

  return lines.length;
}

function drawSpecsTable(
  page: PDFPage,
  content: SeriesDetailPdfContent,
  startY: number,
  font: PDFFont,
  fontBold: PDFFont,
) {
  const margin = 48;
  const labelColWidth = 180;
  const rowHeight = 28;
  const tableWidth = page.getWidth() - margin * 2;
  const valueColWidth = tableWidth - labelColWidth;
  const tableTop = startY;
  const tableBottom = tableTop - rowHeight * (content.specs.length + 1);

  drawPdfText(page, content.specsTitle, {
    x: margin,
    y: tableTop + 24,
    size: 14,
    font: fontBold,
    color: TEXT,
  });

  page.drawRectangle({
    x: margin,
    y: tableBottom,
    width: tableWidth,
    height: tableTop - tableBottom,
    borderColor: BORDER,
    borderWidth: 1,
  });

  const headerY = tableTop - rowHeight;

  page.drawRectangle({
    x: margin,
    y: headerY,
    width: tableWidth,
    height: rowHeight,
    color: HEADER_BG,
  });

  page.drawLine({
    start: { x: margin + labelColWidth, y: tableTop },
    end: { x: margin + labelColWidth, y: tableBottom },
    thickness: 1,
    color: BORDER,
  });

  drawPdfText(page, content.specsTitle, {
    x: margin + 8,
    y: headerY + 9,
    size: 8,
    font: fontBold,
    color: TEXT,
  });

  content.specs.forEach((spec, index) => {
    const rowTop = tableTop - rowHeight * (index + 1);
    const rowBottom = rowTop - rowHeight;

    page.drawLine({
      start: { x: margin, y: rowBottom },
      end: { x: margin + tableWidth, y: rowBottom },
      thickness: 1,
      color: BORDER,
    });

    drawPdfText(page, spec.label, {
      x: margin + 8,
      y: rowBottom + 10,
      size: 9,
      font,
      color: TEXT,
    });

    drawPdfText(page, spec.value, {
      x: margin + labelColWidth + 8,
      y: rowBottom + 10,
      size: 9,
      font: fontBold,
      color: TEXT,
      maxWidth: valueColWidth - 16,
    });
  });

  return tableBottom;
}

function drawDetailPage(
  page: PDFPage,
  content: SeriesDetailPdfContent,
  font: PDFFont,
  fontBold: PDFFont,
) {
  const margin = 48;
  let y = page.getHeight() - margin;

  drawPdfText(page, content.title, {
    x: margin,
    y,
    size: 20,
    font: fontBold,
    color: ORANGE,
    maxWidth: page.getWidth() - margin * 2,
    lineHeight: 24,
  });
  y -= 34;

  drawPdfText(page, content.subtitle, {
    x: margin,
    y,
    size: 11,
    font,
    color: MUTED,
    maxWidth: page.getWidth() - margin * 2,
    lineHeight: 14,
  });
  y -= 28;

  const introLines = drawPdfText(page, content.intro, {
    x: margin,
    y,
    size: 10,
    font,
    color: TEXT,
    maxWidth: page.getWidth() - margin * 2,
    lineHeight: 14,
  });
  y -= introLines * 14 + 18;

  drawPdfText(page, content.featuresTitle, {
    x: margin,
    y,
    size: 13,
    font: fontBold,
    color: TEXT,
  });
  y -= 20;

  for (const feature of content.features) {
    drawPdfText(page, `- ${feature.title}`, {
      x: margin,
      y,
      size: 10,
      font: fontBold,
      color: TEXT,
    });
    y -= 14;

    const descLines = drawPdfText(page, feature.desc, {
      x: margin + 10,
      y,
      size: 9,
      font,
      color: MUTED,
      maxWidth: page.getWidth() - margin * 2 - 10,
      lineHeight: 12,
    });
    y -= descLines * 12 + 8;
  }

  y -= 6;
  const tableBottom = drawSpecsTable(page, content, y, font, fontBold);
  y = tableBottom - 28;

  drawPdfText(page, content.modelsTitle, {
    x: margin,
    y,
    size: 12,
    font: fontBold,
    color: TEXT,
  });
  y -= 18;

  drawPdfText(page, content.models.join(", "), {
    x: margin,
    y,
    size: 10,
    font,
    color: TEXT,
    maxWidth: page.getWidth() - margin * 2,
    lineHeight: 14,
  });

  drawPdfText(page, content.distributor, {
    x: margin,
    y: margin - 4,
    size: 8,
    font,
    color: MUTED,
  });
}

export async function generatePdfFromDetailContent(content: SeriesDetailPdfContent) {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const page = pdf.addPage(A4_PORTRAIT);
  drawDetailPage(page, content, font, fontBold);

  return pdf.save();
}

export async function generateSeriesDetailSpecsPdf(
  seriesId: SeriesDetailPdfId,
  locale: "cz" | "en" = "cz",
) {
  return generatePdfFromDetailContent(SERIES_DETAIL_PDF_CONTENT[seriesId][locale]);
}
