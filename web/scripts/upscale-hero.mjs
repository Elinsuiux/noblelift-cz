import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const src =
  "C:/Users/ElinaSkubina-VZV/.cursor/projects/c-Users-ElinaSkubina-VZV-noblelift-cz/assets/c__Users_ElinaSkubina-VZV_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_editee-verze-27-obr-01-5c0338c2-9281-4ecd-9728-d729f2b67eff.png";

const outPng = path.join(__dirname, "../public/images/hero-forklift-editee-27-hq.png");

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

  if (w !== targetW || h !== targetH) {
    current = await sharp(current)
      .resize(targetW, targetH, { kernel: sharp.kernel.lanczos3 })
      .toBuffer();
  }

  return current;
}

async function main() {
  const meta = await sharp(src).metadata();
  const proportionalH = Math.round(meta.height * (TARGET_W / meta.width));

  const source = await sharp(src).toBuffer();
  const upscaled = await upscaleInSteps(source, TARGET_W, proportionalH);

  await sharp(upscaled)
    .sharpen({ sigma: 1.0, m1: 1.3, m2: 0.5, x1: 2, y2: 10, y3: 20 })
    .resize(TARGET_W, TARGET_H, {
      fit: "cover",
      position: "right bottom",
      kernel: sharp.kernel.lanczos3,
    })
    .png({ compressionLevel: 6, adaptiveFiltering: true, effort: 10 })
    .toFile(outPng);

  const outMeta = await sharp(outPng).metadata();
  const kb = Math.round(fs.statSync(outPng).size / 1024);
  console.log("Saved:", outPng, `${outMeta.width}x${outMeta.height}`, `${kb}KB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
