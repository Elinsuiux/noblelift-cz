const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ASSETS_DIR =
  "C:/Users/ElinaSkubina-VZV/.cursor/projects/c-Users-ElinaSkubina-VZV-noblelift-cz/assets";
const TEMP = path.join(__dirname, "../public/images/hero-source-temp.jpg");
const OUT = path.join(__dirname, "../public/images/hero-forklift-user.jpg");

async function main() {
  const asset = fs
    .readdirSync(ASSETS_DIR)
    .find((name) => name.includes("1781525820-9938a7c3"));

  if (!asset) {
    throw new Error("User hero image not found in assets folder.");
  }

  fs.copyFileSync(path.join(ASSETS_DIR, asset), TEMP);

  const image = sharp(TEMP);
  const { width, height } = await image.metadata();

  const patchWidth = Math.round(width * 0.55);
  const patchHeight = Math.round(height * 0.32);

  const patchSvg = `
    <svg width="${patchWidth}" height="${patchHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g" cx="12%" cy="18%" r="95%">
          <stop offset="0%" stop-color="#030303" />
          <stop offset="55%" stop-color="#060606" stop-opacity="0.98" />
          <stop offset="100%" stop-color="#0a0a0a" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)" />
    </svg>
  `;

  await sharp(TEMP)
    .composite([{ input: Buffer.from(patchSvg), top: 0, left: 0 }])
    .resize(1920, null, { withoutEnlargement: false, kernel: "lanczos3" })
    .sharpen({ sigma: 0.6 })
    .jpeg({ quality: 94, mozjpeg: true })
    .toFile(OUT);

  fs.unlinkSync(TEMP);

  const outMeta = await sharp(OUT).metadata();
  console.log(`Saved ${OUT} (${outMeta.width}x${outMeta.height})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
