import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.join(__dirname, "..", "public", "images", "contact");
const hubertPath = path.join(root, "hubert-rajtr.webp");
const hubertSquarePath = path.join(root, "hubert-rajtr-square.webp");
const warehouseBgPath = path.join(root, "warehouse-bg.webp");
const adamSourcePath = path.join(root, "vanousek-adam-source.jpg");
const outPath = path.join(root, "vanousek-adam.webp");

const size = 900;

async function main() {
  const hubertMeta = await sharp(hubertPath).metadata();
  const hubertWidth = hubertMeta.width ?? size;
  const hubertHeight = hubertMeta.height ?? size;

  await sharp(hubertPath)
    .resize(size, size, { fit: "cover", position: "centre" })
    .webp({ quality: 90 })
    .toFile(hubertSquarePath);

  await sharp(hubertPath)
    .extract({
      left: 0,
      top: 0,
      width: Math.round(hubertWidth * 0.34),
      height: hubertHeight,
    })
    .resize(size, size, { fit: "cover", position: "centre" })
    .blur(3)
    .webp({ quality: 88 })
    .toFile(warehouseBgPath);

  const adamMeta = await sharp(adamSourcePath).metadata();
  const adamWidth = adamMeta.width ?? size;
  const adamHeight = adamMeta.height ?? size;
  const top = Math.round(adamHeight * 0.05);
  const cropWidth = Math.round(adamWidth * 0.82);
  const cropHeight = Math.round(adamHeight * 0.36);
  const left = Math.round((adamWidth - cropWidth) / 2);
  const personWidth = Math.round(size * 0.9);
  const personHeight = Math.round(size * 0.88);

  const person = await sharp(adamSourcePath)
    .extract({ left, top, width: cropWidth, height: cropHeight })
    .resize(personWidth, personHeight, { fit: "cover", position: "north" })
    .png()
    .toBuffer();

  const x = Math.round((size - personWidth) / 2);
  const y = Math.round(size * 0.04);

  await sharp(warehouseBgPath)
    .composite([{ input: person, left: x, top: y }])
    .webp({ quality: 90 })
    .toFile(outPath);

  console.log(`Saved ${hubertSquarePath}`);
  console.log(`Saved ${warehouseBgPath}`);
  console.log(`Saved ${outPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
