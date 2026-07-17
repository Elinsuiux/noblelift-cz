import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INPUT = path.join(__dirname, "../public/images/hero-warehouse.png");
const OUT_DIR = path.join(__dirname, "../source-images/hero/drafts");
const OUTPUT = path.join(OUT_DIR, "hero-warehouse-no-blue-stripes-draft.png");

function isBlueStripe(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const saturation = max === 0 ? 0 : (max - min) / max;

  return (
    b >= 95 &&
    b > r + 18 &&
    b > g + 8 &&
    r < 145 &&
    g < 190 &&
    saturation > 0.18 &&
    b / Math.max(r, 1) > 1.15
  );
}

function replacementOrange(r, g, b, x, y, width, height) {
  const warmth = 1 - Math.min(1, y / height);
  const baseR = 228 + warmth * 18;
  const baseG = 78 + warmth * 22;
  const baseB = 20 + warmth * 8;
  const mix = 0.82;

  return {
    r: Math.round(r * (1 - mix) + baseR * mix),
    g: Math.round(g * (1 - mix) + baseG * mix),
    b: Math.round(b * (1 - mix) + baseB * mix),
  };
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const { data, info } = await sharp(INPUT).raw().toBuffer({ resolveWithObject: true });
  const pixels = Buffer.from(data);
  let replaced = 0;

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * info.channels;
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];

      if (!isBlueStripe(r, g, b)) continue;

      const next = replacementOrange(r, g, b, x, y, info.width, info.height);
      pixels[i] = next.r;
      pixels[i + 1] = next.g;
      pixels[i + 2] = next.b;
      replaced++;
    }
  }

  await sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  })
    .png({ compressionLevel: 6 })
    .toFile(OUTPUT);

  console.log(`Replaced ${replaced} pixels`);
  console.log(`Saved ${OUTPUT}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
