import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.join(__dirname, "../public/images/hero-forklift-final.jpg");
const outPath = path.join(__dirname, "../public/images/hero-background-only.png");

function lum(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function isForklift(r, g, b, x, y, w, h) {
  const inBox = x > w * 0.28 && x < w * 0.995 && y > h * 0.03 && y < h * 0.995;
  if (!inBox) return false;
  if (r > 110 && g > 30 && b < 220 && r - g > 5) return true;
  const l = lum(r, g, b);
  if (l > 5 && l < 100) return true;
  if (l >= 100 && l < 170 && r < 205 && g < 195) return true;
  return false;
}

const { data, info } = await sharp(inputPath)
  .raw()
  .toBuffer({ resolveWithObject: true });

const w = info.width;
const h = info.height;
const c = info.channels;
const out = Buffer.from(data);
const mask = new Uint8Array(w * h);

for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const idx = y * w + x;
    const pi = idx * c;
    if (isForklift(data[pi], data[pi + 1], data[pi + 2], x, y, w, h)) {
      mask[idx] = 1;
    }
  }
}

for (let pass = 0; pass < 3; pass++) {
  const next = new Uint8Array(mask);
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      if (!mask[y * w + x]) continue;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          next[(y + dy) * w + (x + dx)] = 1;
        }
      }
    }
  }
  mask.set(next);
}

function getPixel(x, y) {
  const pi = (y * w + x) * c;
  return [data[pi], data[pi + 1], data[pi + 2]];
}

function sampleOutside(x, y, dx, dy) {
  let cx = x;
  let cy = y;
  for (let i = 0; i < 200; i++) {
    cx += dx;
    cy += dy;
    if (cx < 0 || cy < 0 || cx >= w || cy >= h) return null;
    if (!mask[cy * w + cx]) return getPixel(cx, cy);
  }
  return null;
}

function lerp(a, b, t) {
  return Math.round(a * (1 - t) + b * t);
}

function lerpColor(a, b, t) {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

// Fill each masked pixel using bilinear blend of samples from 4 directions
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const idx = y * w + x;
    if (!mask[idx]) continue;

    const left = sampleOutside(x, y, -1, 0);
    const right = sampleOutside(x, y, 1, 0);
    const up = sampleOutside(x, y, 0, -1);
    const down = sampleOutside(x, y, 0, 1);

    let rgb = [0, 0, 0];
    let count = 0;

    if (left && right) {
      const t = 0.5;
      rgb = lerpColor(left, right, t);
      count = 1;
    } else if (left) {
      rgb = left;
      count = 1;
    } else if (right) {
      rgb = right;
      count = 1;
    }

    if (up && down) {
      const vert = lerpColor(up, down, 0.5);
      if (count) {
        rgb = lerpColor(rgb, vert, 0.5);
      } else {
        rgb = vert;
      }
      count = 1;
    } else if (up && !count) {
      rgb = up;
      count = 1;
    } else if (down && !count) {
      rgb = down;
      count = 1;
    }

    if (!count) rgb = [8, 6, 5];

    const pi = idx * c;
    out[pi] = rgb[0];
    out[pi + 1] = rgb[1];
    out[pi + 2] = rgb[2];
  }
}

// Multi-pass neighbor smoothing inside mask
for (let pass = 0; pass < 6; pass++) {
  const temp = Buffer.from(out);
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = y * w + x;
      if (!mask[idx]) continue;

      let sr = 0;
      let sg = 0;
      let sb = 0;
      let n = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const pi = ((y + dy) * w + (x + dx)) * c;
          sr += temp[pi];
          sg += temp[pi + 1];
          sb += temp[pi + 2];
          n++;
        }
      }
      const pi = idx * c;
      out[pi] = Math.round(sr / n);
      out[pi + 1] = Math.round(sg / n);
      out[pi + 2] = Math.round(sb / n);
    }
  }
}

// Restore original pixels outside mask exactly
for (let i = 0; i < w * h; i++) {
  if (mask[i]) continue;
  const pi = i * c;
  out[pi] = data[pi];
  out[pi + 1] = data[pi + 1];
  out[pi + 2] = data[pi + 2];
}

await sharp(out, { raw: { width: w, height: h, channels: c } })
  .sharpen({ sigma: 0.4, m1: 0.4, m2: 0.2 })
  .png({ compressionLevel: 6 })
  .toFile(outPath);

console.log("Saved:", outPath, `${w}x${h}`);
