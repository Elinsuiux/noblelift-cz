import { readFile } from "fs/promises";
import path from "path";
import { PDFDocument, StandardFonts, rgb, type PDFImage } from "pdf-lib";
import {
  SERIE_A_PDF_CONTENT,
  SERIE_A_SPECS_MODELS,
  SERIE_A_SPECS_ROWS,
  SERIE_A_SPECS_SOURCE_URL,
} from "@/lib/serie-a-specs-data";

const A4_PORTRAIT: [number, number] = [595.28, 841.89];
const A4_LANDSCAPE: [number, number] = [841.89, 595.28];

const SERIE_A_BROCHURE_IMAGES = {
  description: "brochure-description.jpg",
  parameters: "brochure-parameters.jpg",
} as const;

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

type PdfPage = ReturnType<PDFDocument["addPage"]>;
type PdfFont = Awaited<ReturnType<PDFDocument["embedFont"]>>;

async function loadBrochureImage(pdf: PDFDocument, filename: string) {
  const imagePath = path.join(
    process.cwd(),
    "public",
    "documents",
    "serie-a",
    filename,
  );
  const imageBytes = await readFile(imagePath);
  return pdf.embedJpg(imageBytes);
}

function drawFullPageImage(page: PdfPage, image: PDFImage, margin = 0) {
  const pageWidth = page.getWidth();
  const pageHeight = page.getHeight();
  const availableWidth = pageWidth - margin * 2;
  const availableHeight = pageHeight - margin * 2;
  const scale = Math.min(availableWidth / image.width, availableHeight / image.height);
  const width = image.width * scale;
  const height = image.height * scale;
  const x = margin + (availableWidth - width) / 2;
  const y = margin + (availableHeight - height) / 2;

  page.drawImage(image, { x, y, width, height });
}

function drawPdfText(
  page: PdfPage,
  text: string,
  options: {
    x: number;
    y: number;
    size: number;
    font: PdfFont;
    color: ReturnType<typeof rgb>;
    maxWidth?: number;
    lineHeight?: number;
  },
) {
  const lineHeight = options.lineHeight ?? options.size + 3;
  const lines = options.maxWidth ? wrapText(text, Math.floor(options.maxWidth / (options.size * 0.5))) : [text];

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

function drawParametersPage(
  page: PdfPage,
  content: (typeof SERIE_A_PDF_CONTENT)["cz"],
  locale: "cz" | "en",
  font: PdfFont,
  fontBold: PdfFont,
) {
  const margin = 36;
  const labelColWidth = 132;
  const modelColWidth =
    (page.getWidth() - margin * 2 - labelColWidth) / SERIE_A_SPECS_MODELS.length;
  const rowHeight = 26;
  const headerHeight = 32;
  const tableTop = page.getHeight() - margin - 52;
  const tableLeft = margin;
  const tableWidth = page.getWidth() - margin * 2;
  const tableBottom = tableTop - headerHeight - (SERIE_A_SPECS_ROWS.length + 1) * rowHeight;

  drawPdfText(page, content.paramsTitle, {
    x: margin,
    y: page.getHeight() - margin - 18,
    size: 18,
    font: fontBold,
    color: TEXT,
  });

  drawPdfText(page, "CPD15~38 A Series Lithium Forklift", {
    x: margin,
    y: page.getHeight() - margin - 36,
    size: 10,
    font,
    color: MUTED,
  });

  page.drawRectangle({
    x: tableLeft,
    y: tableBottom,
    width: tableWidth,
    height: tableTop - tableBottom,
    borderColor: BORDER,
    borderWidth: 1,
  });

  const headerY = tableTop - headerHeight;

  page.drawRectangle({
    x: tableLeft,
    y: headerY,
    width: tableWidth,
    height: headerHeight,
    color: HEADER_BG,
  });

  page.drawLine({
    start: { x: tableLeft, y: headerY },
    end: { x: tableLeft + tableWidth, y: headerY },
    thickness: 1,
    color: BORDER,
  });

  page.drawLine({
    start: { x: tableLeft + labelColWidth, y: tableTop },
    end: { x: tableLeft + labelColWidth, y: tableBottom },
    thickness: 1,
    color: BORDER,
  });

  drawPdfText(page, content.paramHeader, {
    x: tableLeft + 6,
    y: headerY + 10,
    size: 8,
    font: fontBold,
    color: TEXT,
  });

  SERIE_A_SPECS_MODELS.forEach((model, index) => {
    const x = tableLeft + labelColWidth + index * modelColWidth;

    if (index > 0) {
      page.drawLine({
        start: { x, y: tableTop },
        end: { x, y: tableBottom },
        thickness: 1,
        color: BORDER,
      });
    }

    drawPdfText(page, model, {
      x: x + 3,
      y: headerY + 10,
      size: 7,
      font: fontBold,
      color: ORANGE,
    });
  });

  const drawRow = (
    rowIndex: number,
    label: string,
    values: readonly string[],
    boldValues = true,
  ) => {
    const rowTop = tableTop - headerHeight - rowIndex * rowHeight;
    const rowBottom = rowTop - rowHeight;

    page.drawLine({
      start: { x: tableLeft, y: rowBottom },
      end: { x: tableLeft + tableWidth, y: rowBottom },
      thickness: 1,
      color: BORDER,
    });

    drawPdfText(page, label, {
      x: tableLeft + 6,
      y: rowBottom + 9,
      size: 7,
      font,
      color: TEXT,
      maxWidth: labelColWidth - 12,
      lineHeight: 9,
    });

    values.forEach((value, colIndex) => {
      const x = tableLeft + labelColWidth + colIndex * modelColWidth;
      drawPdfText(page, value, {
        x: x + 3,
        y: rowBottom + 9,
        size: 7,
        font: boldValues ? fontBold : font,
        color: TEXT,
      });
    });
  };

  drawRow(0, content.manufacturerRow, SERIE_A_SPECS_MODELS, false);

  SERIE_A_SPECS_ROWS.forEach((row, rowIndex) => {
    const label = locale === "cz" ? row.labelCs : row.labelEn;
    drawRow(rowIndex + 1, `${label} (${row.unit})`, row.values);
  });

  const footerY = tableBottom - 20;
  drawPdfText(page, `${content.sourceNote} - ${SERIE_A_SPECS_SOURCE_URL}`, {
    x: margin,
    y: footerY,
    size: 7,
    font,
    color: MUTED,
  });
}

export async function generateSerieASpecsPdf(locale: "cz" | "en" = "cz") {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const content = SERIE_A_PDF_CONTENT[locale];

  const [descriptionImage, parametersImage] = await Promise.all([
    loadBrochureImage(pdf, SERIE_A_BROCHURE_IMAGES.description),
    loadBrochureImage(pdf, SERIE_A_BROCHURE_IMAGES.parameters),
  ]);

  const descriptionPage = pdf.addPage(A4_PORTRAIT);
  drawFullPageImage(descriptionPage, descriptionImage);

  const brochureParamsPage = pdf.addPage(A4_PORTRAIT);
  drawFullPageImage(brochureParamsPage, parametersImage);

  const paramsPage = pdf.addPage(A4_LANDSCAPE);
  drawParametersPage(paramsPage, content, locale, font, fontBold);

  return pdf.save();
}
