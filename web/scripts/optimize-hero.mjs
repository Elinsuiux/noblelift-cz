import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const src = path.join(__dirname, "../public/images/hero-source-temp.jpg");
const outJpg = path.join(__dirname, "../public/images/hero-forklift-hero.jpg");

const TARGET_W = 2560;
const TARGET_H = 1707;

async function upscaleInSteps(buffer, targetW, targetH) {
  const meta = await sharp(buffer).metadata();
  let current = buffer;
  let w = meta.width;
  let h = meta.height;

  while (w < targetW || h < targetH) {
    const nextW = Math.min(Math.round(w * 1.25), targetW);
    const nextH = Math.min(Math.round(h * 1.25), targetH);
    current = await sharp(current)
      .resize(nextW, nextH, { kernel: sharp.kernel.lanczos3 })
      .toBuffer();
    w = nextW;
    h = nextH;
  }

  return sharp(current).resize(targetW, targetH, { kernel: sharp.kernel.lanczos3 });
}

async function main() {
  const meta = await sharp(src).metadata();
  const propH = Math.round(meta.height * (TARGET_W / meta.width));

  const upscaled = await upscaleInSteps(await sharp(src).toBuffer(), TARGET_W, propH);

  const optimized = await upscaled
    .resize(TARGET_W, TARGET_H, {
      fit: "cover",
      position: "right bottom",
      kernel: sharp.kernel.lanczos3,
    })
    .sharpen({ sigma: 0.85, m1: 1.2, m2: 0.45, x1: 2, y2: 10, y3: 20 })
    .jpeg({ quality: 95, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toBuffer();

  await sharp(optimized).jpeg({ quality: 95, mozjpeg: true }).toFile(outJpg);

  const kb = Math.round(fs.statSync(outJpg).size / 1024);
  console.log("Saved:", outJpg, `${TARGET_W}x${TARGET_H}`, `${kb}KB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
