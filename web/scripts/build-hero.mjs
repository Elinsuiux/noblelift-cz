import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const src = path.join(__dirname, "../public/images/hero-source-temp.jpg");
const outJpg = path.join(__dirname, "../public/images/hero-forklift-editee-28.jpg");

const TARGET_W = 2560;
const TARGET_H = 1707;

function isFloor(r, g, b) {
  const avg = (r + g + b) / 3;
  return avg > 8 && avg < 72 && Math.abs(r - g) < 16 && Math.abs(g - b) < 16;
}

function isForklift(r, g, b, y, h) {
  if (r > 145 && g < 130 && b < 85 && r > g + 15) return true;
  if (r < 95 && g < 95 && b < 95 && (r + g + b) / 3 > 16) return true;
  if (y > h * 0.55 && r > 85 && r < 235 && g > 70 && b > 55) {
    const avg = (r + g + b) / 3;
    if (avg > 32 && avg < 210 && Math.abs(r - g) < 50) return true;
  }
  return false;
}

function isLightStreak(r, g, b, y, h) {
  return y < h * 0.5 && r > 165 && g > 45 && g < 165 && b < 60;
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

function addEllipseShadow(shadow, w, h, cx, cy, rx, ry, strength) {
  for (let y = Math.max(0, cy - ry); y <= Math.min(h - 1, cy + ry); y++) {
    for (let x = Math.max(0, cx - rx); x <= Math.min(w - 1, cx + rx); x++) {
      const dx = (x - cx) / rx;
      const dy = (y - cy) / ry;
      const d = dx * dx + dy * dy;
      if (d > 1) continue;
      const falloff = 1 - d;
      const value = Math.round(strength * falloff);
      const i = y * w + x;
      if (value > shadow[i]) shadow[i] = value;
    }
  }
}

function buildShadowMask(data, w, h) {
  const contactY = new Int32Array(w).fill(-1);
  let minX = w;
  let maxX = 0;
  let maxContact = 0;

  for (let y = Math.floor(h * 0.1); y < h; y++) {
    for (let x = Math.floor(w * 0.08); x < w; x++) {
      const i = (y * w + x) * 3;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      if (isLightStreak(r, g, b, y, h)) continue;
      if (isForklift(r, g, b, y, h)) {
        contactY[x] = y;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y > maxContact) maxContact = y;
      }
    }
  }

  const shadow = Buffer.alloc(w * h);
  const scaleX = w / 1024;
  const scaleY = h / 682;

  // Contact shadow along forklift footprint
  for (let x = minX; x <= maxX; x++) {
    const contact = contactY[x];
    if (contact < 0) continue;

    for (let dy = 1; dy <= 55; dy++) {
      const y = contact + dy;
      if (y >= h) break;

      const i = y * w + x;
      const pi = i * 3;
      if (!isFloor(data[pi], data[pi + 1], data[pi + 2])) continue;

      const contactStrength = dy <= 6 ? 1 - (dy - 1) / 8 : (1 - dy / 58) * 0.55;
      const value = Math.round(165 * contactStrength);
      if (value > shadow[i]) shadow[i] = value;
    }
  }

  // Wheel contact ellipses (positions tuned for this composition)
  const wheelY = maxContact + Math.round(4 * scaleY);
  const wheels = [
    { cx: Math.round(230 * scaleX), rx: Math.round(38 * scaleX), ry: Math.round(10 * scaleY), s: 175 },
    { cx: Math.round(580 * scaleX), rx: Math.round(52 * scaleX), ry: Math.round(12 * scaleY), s: 185 },
    { cx: Math.round(870 * scaleX), rx: Math.round(58 * scaleX), ry: Math.round(14 * scaleY), s: 190 },
    { cx: Math.round(960 * scaleX), rx: Math.round(42 * scaleX), ry: Math.round(11 * scaleY), s: 170 },
  ];

  for (const wheel of wheels) {
    addEllipseShadow(shadow, w, h, wheel.cx, wheelY, wheel.rx, wheel.ry, wheel.s);
  }

  // Soft ambient shadow under chassis
  const chassisCx = Math.round(((minX + maxX) / 2) * 0.92);
  addEllipseShadow(
    shadow,
    w,
    h,
    chassisCx,
    wheelY + Math.round(8 * scaleY),
    Math.round((maxX - minX) * 0.34),
    Math.round(22 * scaleY),
    95,
  );

  return shadow;
}

async function main() {
  const srcMeta = await sharp(src).metadata();
  const proportionalH = Math.round(srcMeta.height * (TARGET_W / srcMeta.width));

  const upscaled = await upscaleInSteps(await sharp(src).toBuffer(), TARGET_W, proportionalH);

  const baseBuffer = await sharp(upscaled)
    .resize(TARGET_W, TARGET_H, { fit: "cover", position: "right bottom", kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.85, m1: 1.2, m2: 0.45, x1: 2, y2: 10, y3: 20 })
    .png()
    .toBuffer();

  const { data, info } = await sharp(baseBuffer).ensureAlpha().raw().toBuffer({
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
    .blur(10)
    .png()
    .toBuffer();

  await sharp(baseBuffer)
    .composite([{ input: shadowLayer, blend: "multiply" }])
    .jpeg({ quality: 95, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(outJpg);

  const kb = Math.round(fs.statSync(outJpg).size / 1024);
  console.log("Saved:", outJpg, `${TARGET_W}x${TARGET_H}`, `${kb}KB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
