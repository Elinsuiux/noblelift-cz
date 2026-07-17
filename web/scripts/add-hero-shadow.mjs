import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const src =
  "C:/Users/ElinaSkubina-VZV/.cursor/projects/c-Users-ElinaSkubina-VZV-noblelift-cz/assets/c__Users_ElinaSkubina-VZV_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_7856785-2b502075-8c14-4042-9c00-2211fef7632f.png";

const outPng = path.join(__dirname, "../public/images/hero-forklift-shadow.png");

const TARGET_W = 2560;
const TARGET_H = 1707;

function isFloor(r, g, b) {
  const avg = (r + g + b) / 3;
  return avg > 8 && avg < 68 && Math.abs(r - g) < 14 && Math.abs(g - b) < 14;
}

function isForklift(r, g, b, y, h) {
  if (r > 145 && g < 130 && b < 80 && r > g + 15) return true;
  if (r < 95 && g < 95 && b < 95 && (r + g + b) / 3 > 18) return true;
  if (y > h * 0.58 && r > 70 && r < 230 && g > 60 && b > 50) {
    const avg = (r + g + b) / 3;
    if (avg > 35 && avg < 200 && Math.abs(r - g) < 45) return true;
  }
  return false;
}

function isLightStreak(r, g, b, y, h) {
  return y < h * 0.52 && r > 170 && g > 50 && g < 160 && b < 55;
}

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

function buildShadowMask(data, w, h) {
  const contactY = new Int32Array(w).fill(-1);

  for (let y = Math.floor(h * 0.12); y < h; y++) {
    for (let x = Math.floor(w * 0.05); x < w; x++) {
      const i = (y * w + x) * 3;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      if (isLightStreak(r, g, b, y, h)) continue;
      if (isForklift(r, g, b, y, h)) {
        contactY[x] = y;
      }
    }
  }

  const shadow = Buffer.alloc(w * h);

  for (let x = 0; x < w; x++) {
    const baseY = contactY[x];
    if (baseY < 0) continue;

    for (let dx = -22; dx <= 22; dx++) {
      const sx = x + dx;
      if (sx < 0 || sx >= w) continue;
      const sy = contactY[sx];
      if (sy < 0) continue;

      const spread = 1 - Math.abs(dx) / 24;
      const contact = Math.max(baseY, sy);

      for (let dy = 3; dy <= 48; dy++) {
        const y = contact + dy;
        if (y >= h) break;

        const i = y * w + x;
        const pi = i * 3;
        const r = data[pi];
        const g = data[pi + 1];
        const b = data[pi + 2];

        if (!isFloor(r, g, b)) continue;

        const falloff = (1 - dy / 50) * spread;
        const value = Math.round(130 * falloff);
        if (value > shadow[i]) shadow[i] = value;
      }
    }
  }

  return shadow;
}

async function main() {
  const srcMeta = await sharp(src).metadata();
  const proportionalH = Math.round(srcMeta.height * (TARGET_W / srcMeta.width));

  const upscaled = await upscaleInSteps(await sharp(src).toBuffer(), TARGET_W, proportionalH);

  const basePng = await sharp(upscaled)
    .resize(TARGET_W, TARGET_H, { fit: "cover", position: "right bottom", kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.9, m1: 1.2, m2: 0.45, x1: 2, y2: 10, y3: 20 })
    .png()
    .toBuffer();

  const { data, info } = await sharp(basePng).ensureAlpha().raw().toBuffer({
    resolveWithObject: true,
  });

  const w = info.width;
  const h = info.height;
  const channels = info.channels;

  const rgb = Buffer.alloc(w * h * 3);
  for (let i = 0, j = 0; i < data.length; i += channels, j += 3) {
    rgb[j] = data[i];
    rgb[j + 1] = data[i + 1];
    rgb[j + 2] = data[i + 2];
  }

  const shadowMask = buildShadowMask(rgb, w, h);
  const inverted = Buffer.alloc(w * h);
  for (let i = 0; i < w * h; i++) {
    inverted[i] = 255 - shadowMask[i];
  }

  const shadowLayer = await sharp(inverted, {
    raw: { width: w, height: h, channels: 1 },
  })
    .blur(14)
    .toColourspace("b-w")
    .png()
    .toBuffer();

  await sharp(basePng)
    .composite([{ input: shadowLayer, blend: "multiply" }])
    .png({ compressionLevel: 6, adaptiveFiltering: true })
    .toFile(outPng);

  const kb = Math.round(fs.statSync(outPng).size / 1024);
  console.log("Saved:", outPng, `${w}x${h}`, `${kb}KB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
