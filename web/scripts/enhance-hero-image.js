const path = require("path");
const sharp = require("sharp");

const SRC = path.join(__dirname, "../public/images/hero-forklift-hq.png");
const OUT = path.join(__dirname, "../public/images/hero-forklift-final.jpg");

async function main() {
  const { width, height } = await sharp(SRC).metadata();
  const targetWidth = 2560;
  const targetHeight = Math.round((height / width) * targetWidth);

  await sharp(SRC)
    .resize(targetWidth, targetHeight, {
      kernel: sharp.kernel.lanczos3,
      fit: "fill",
    })
    .sharpen({ sigma: 0.8, m1: 0.5, m2: 0.35 })
    .jpeg({ quality: 96, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(OUT);

  console.log(`Saved ${OUT} (${targetWidth}x${targetHeight})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
