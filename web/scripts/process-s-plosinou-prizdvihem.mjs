import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const source =
  "C:/Users/ElinaSkubina-VZV/.cursor/projects/c-Users-ElinaSkubina-VZV-noblelift-cz/assets/c__Users_ElinaSkubina-VZV_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image_3264-4f448f27-f632-4b50-859b-6e9c7e5c883d.png";
const output = path.resolve(
  __dirname,
  "../public/images/products/stackers/s-plosinou-s-prizdvihem.png",
);

function saturation(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return max === 0 ? 0 : (max - min) / max;
}

function sampleAverage(data, width, channels, points) {
  let r = 0;
  let g = 0;
  let b = 0;
  for (const [x, y] of points) {
    const i = (y * width + x) * channels;
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }
  const count = points.length;
  return [r / count, g / count, b / count];
}

function colorDistance(r1, g1, b1, r2, g2, b2) {
  return Math.hypot(r1 - r2, g1 - g2, b1 - b2);
}

function isProtectedProductPixel(r, g, b) {
  const sat = saturation(r, g, b);
  const lum = (r + g + b) / 3;

  if (r > 115 && r > g * 1.12 && r > b * 1.02 && sat > 0.1) {
    return true;
  }

  if (lum < 38 && sat < 0.3) {
    return true;
  }

  if (lum > 220 && sat < 0.1) {
    return true;
  }

  return false;
}

function isBackgroundPixel(r, g, b, wallRef, floorRef) {
  if (isProtectedProductPixel(r, g, b)) {
    return false;
  }

  const sat = saturation(r, g, b);
  const lum = (r + g + b) / 3;
  const nearest = Math.min(colorDistance(r, g, b, ...wallRef), colorDistance(r, g, b, ...floorRef));

  if (sat < 0.11 && lum >= 35 && nearest < 55) {
    return true;
  }

  return sat < 0.08 && lum >= 35 && lum <= 220;
}

function removeBackground(data, width, height, channels) {
  const out = Buffer.from(data);
  const wallRef = sampleAverage(data, width, channels, [
    [20, 20],
    [width - 21, 20],
    [width >> 1, 12],
    [80, 60],
    [width - 81, 60],
  ]);
  const floorRef = sampleAverage(data, width, channels, [
    [20, height - 21],
    [width - 21, height - 21],
    [width >> 1, height - 12],
  ]);

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

    if (!isBackgroundPixel(r, g, b, wallRef, floorRef)) {
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
      const nearest = Math.min(colorDistance(r, g, b, ...wallRef), colorDistance(r, g, b, ...floorRef));

      if (transparentNeighbors >= 4 && isBackgroundPixel(r, g, b, wallRef, floorRef)) {
        out[i + 3] = 0;
      } else if (nearest < 36 && !isProtectedProductPixel(r, g, b)) {
        out[i + 3] = Math.max(0, Math.min(255, Math.round(((nearest - 10) / 26) * 255)));
      }
    }
  }

  return out;
}

const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const processed = removeBackground(data, info.width, info.height, info.channels);

await sharp(processed, {
  raw: { width: info.width, height: info.height, channels: info.channels },
})
  .trim({ threshold: 8 })
  .resize(1024, 682, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
    position: "centre",
  })
  .png()
  .toFile(output);

console.log(`Saved ${output}`);
