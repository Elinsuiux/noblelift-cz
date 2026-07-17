import fs from "fs";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = path.resolve(
  __dirname,
  "../public/images/products/stackers/s-plosinou-s-prizdvihem.png",
);
const output = input;
const tempOutput = `${input}.tmp.png`;

function saturation(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return max === 0 ? 0 : (max - min) / max;
}

function isProductPixel(r, g, b) {
  const sat = saturation(r, g, b);
  const lum = (r + g + b) / 3;

  if (r > 115 && r > g * 1.12 && r > b * 1.02 && sat > 0.1) {
    return true;
  }

  if (lum < 55 && sat < 0.35) {
    return true;
  }

  return false;
}

function isFakeTransparencyPixel(r, g, b) {
  if (isProductPixel(r, g, b)) {
    return false;
  }

  const sat = saturation(r, g, b);
  const lum = (r + g + b) / 3;
  const spread = Math.max(r, g, b) - Math.min(r, g, b);

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

  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const i = (y * width + x) * channels;
      if (out[i + 3] === 0) {
        continue;
      }

      let transparentNeighbors = 0;
      for (let dy = -1; dy <= 1; dy += 1) {
        for (let dx = -1; dx <= 1; dx += 1) {
          if (dx === 0 && dy === 0) {
            continue;
          }
          const ni = ((y + dy) * width + (x + dx)) * channels;
          if (out[ni + 3] === 0) {
            transparentNeighbors += 1;
          }
        }
      }

      if (transparentNeighbors === 0) {
        continue;
      }

      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      if (transparentNeighbors >= 5 && isFakeTransparencyPixel(r, g, b)) {
        out[i + 3] = 0;
      }
    }
  }

  return out;
}

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const processed = removeFakeTransparency(data, info.width, info.height, info.channels);

let transparent = 0;
for (let i = 3; i < processed.length; i += info.channels) {
  if (processed[i] === 0) transparent += 1;
}

await sharp(processed, {
  raw: { width: info.width, height: info.height, channels: info.channels },
})
  .png()
  .toFile(tempOutput);

await fs.promises.rename(tempOutput, output);

console.log(
  `Fixed ${output}: ${info.width}x${info.height}, transparent pixels=${transparent}/${info.width * info.height}`,
);
