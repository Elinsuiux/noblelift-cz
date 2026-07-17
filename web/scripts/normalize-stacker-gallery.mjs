import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const stackersDir = path.resolve(__dirname, "../public/images/products/stackers");

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 675;
const FILL = 0.9;

const images = [
  "bez-prizdvihem.png",
  "s-prizdvihem.png",
  "s-plosinou-product.png",
  "s-plosinou-s-prizdvihem.png",
  "obkrocne.png",
];

function saturation(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return max === 0 ? 0 : (max - min) / max;
}

function isFakeTransparencyPixel(r, g, b) {
  const sat = saturation(r, g, b);
  const lum = (r + g + b) / 3;
  const spread = Math.max(r, g, b) - Math.min(r, g, b);

  if (lum < 55 && sat < 0.35) {
    return false;
  }

  if (r > 115 && r > g * 1.12 && r > b * 1.02 && sat > 0.1) {
    return false;
  }

  return sat < 0.12 && spread < 28 && lum >= 165 && lum <= 255;
}

function removeFakeTransparency(data, width, height, channels) {
  const out = Buffer.from(data);
  const visited = new Uint8Array(width * height);
  const queue = [];

  for (let x = 0; x < width; x += 1) {
    queue.push([x, 0], [x, height - 1]);
  }
  for (let y = 1; y < height - 1; y += 1) {
    queue.push([0, y], [width - 1, y]);
  }

  while (queue.length) {
    const [x, y] = queue.pop();
    const index = y * width + x;
    if (visited[index]) {
      continue;
    }
    visited[index] = 1;

    const i = index * channels;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (!isFakeTransparencyPixel(r, g, b)) {
      continue;
    }

    out[i + 3] = 0;

    if (x > 0) queue.push([x - 1, y]);
    if (x < width - 1) queue.push([x + 1, y]);
    if (y > 0) queue.push([x, y - 1]);
    if (y < height - 1) queue.push([x, y + 1]);
  }

  return out;
}

function getContentBounds(data, width, height, channels) {
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = (y * width + x) * channels;
      const alpha = channels === 4 ? data[i + 3] : 255;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const lum = (r + g + b) / 3;
      const isVisible = alpha > 20 && lum < 248;

      if (!isVisible) {
        continue;
      }

      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  if (maxX < minX || maxY < minY) {
    return { left: 0, top: 0, width, height };
  }

  return {
    left: minX,
    top: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  };
}

async function prepareImage(inputPath) {
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const cleaned = removeFakeTransparency(data, info.width, info.height, info.channels);
  const bounds = getContentBounds(cleaned, info.width, info.height, info.channels);

  return sharp(cleaned, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  })
    .extract(bounds)
    .png()
    .toBuffer();
}

async function normalizeImage(filename) {
  const inputPath = path.join(stackersDir, filename);
  const tempPath = `${inputPath}.tmp.png`;
  const product = await prepareImage(inputPath);
  const meta = await sharp(product).metadata();
  const productWidth = meta.width ?? 1;
  const productHeight = meta.height ?? 1;

  const maxWidth = CANVAS_WIDTH * FILL;
  const maxHeight = CANVAS_HEIGHT * FILL;
  const scale = Math.min(maxWidth / productWidth, maxHeight / productHeight);
  const targetWidth = Math.max(1, Math.round(productWidth * scale));
  const targetHeight = Math.max(1, Math.round(productHeight * scale));

  const resized = await sharp(product)
    .resize(targetWidth, targetHeight, { fit: "inside", withoutEnlargement: false })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: resized, gravity: "center" }])
    .png()
    .toFile(tempPath);

  await fs.promises.rename(tempPath, inputPath);
  console.log(`Normalized ${filename} -> ${targetWidth}x${targetHeight} on ${CANVAS_WIDTH}x${CANVAS_HEIGHT}`);
}

for (const filename of images) {
  await normalizeImage(filename);
}
