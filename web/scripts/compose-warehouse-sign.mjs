import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const warehousePath =
  "C:/Users/ElinaSkubina-VZV/.cursor/projects/c-Users-ElinaSkubina-VZV-noblelift-cz/assets/c__Users_ElinaSkubina-VZV_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Hlavn__sklad__erven__Voda-49eedfba-502f-4b20-bbcf-d5ffe48724c2.png";
const logoPath = path.join(__dirname, "..", "public", "logo", "noblelift-wordmark-orange-trim.png");
const outPath = path.join(
  __dirname,
  "..",
  "public",
  "images",
  "contact",
  "warehouse-cervena-voda-v2.jpg",
);

const logoWidth = 170;

async function main() {
  const logoBuf = await sharp(logoPath).resize(logoWidth).png().toBuffer();
  const logoMeta = await sharp(logoBuf).metadata();
  const logoHeight = logoMeta.height ?? 30;

  const overlayWidth = 270;
  const overlayHeight = logoHeight + 30;

  const textSvg = Buffer.from(`<svg width="${overlayWidth}" height="${overlayHeight}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.28"/>
      </filter>
    </defs>
    <g filter="url(#shadow)">
      <text x="2" y="${logoHeight + 22}" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" fill="#1a1a1a">by VZV GROUP</text>
    </g>
  </svg>`);

  const overlay = await sharp({
    create: {
      width: overlayWidth,
      height: overlayHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: logoBuf, left: 0, top: 0 },
      { input: textSvg, left: 0, top: 0 },
    ])
    .png()
    .toBuffer();

  const warehouseMeta = await sharp(warehousePath).metadata();
  const imgWidth = warehouseMeta.width ?? 1400;
  const imgHeight = warehouseMeta.height ?? 1050;

  const left = Math.round(imgWidth * 0.595 - overlayWidth / 2);
  const top = Math.round(imgHeight * 0.435);

  await sharp(warehousePath)
    .resize(1400, 1050, { fit: "cover", position: "centre", kernel: "lanczos3" })
    .composite([{ input: overlay, left, top }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(outPath);

  console.log(`Saved ${outPath} with sign at ${left},${top}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
