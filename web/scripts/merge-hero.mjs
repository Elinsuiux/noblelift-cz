import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const bgPath =
  "C:/Users/ElinaSkubina-VZV/.cursor/projects/c-Users-ElinaSkubina-VZV-noblelift-cz/assets/c__Users_ElinaSkubina-VZV_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_A-c3d7269b-ad03-402f-9601-94206b57e02c.png";
const forkPath =
  "C:/Users/ElinaSkubina-VZV/.cursor/projects/c-Users-ElinaSkubina-VZV-noblelift-cz/assets/c__Users_ElinaSkubina-VZV_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_B-5a833f67-c569-4242-bce4-eb7da9aded65.png";

const outJpg = path.join(__dirname, "../public/images/hero-forklift-merged-v2.jpg");
const outPng = path.join(__dirname, "../public/images/hero-forklift-merged-v2.png");

const CANVAS_W = 2560;
const CANVAS_H = 1707;

function isBackground(r, g, b) {
  return r > 236 && g > 236 && b > 236;
}

async function cutoutForklift() {
  const meta = await sharp(forkPath).metadata();
  const w = meta.width;
  const h = meta.height;

  const { data } = await sharp(forkPath).ensureAlpha().raw().toBuffer({
    resolveWithObject: true,
  });

  const channels = 4;
  const out = Buffer.from(data);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * channels;
      const r = out[i];
      const g = out[i + 1];
      const b = out[i + 2];

      out[i + 3] = isBackground(r, g, b) ? 0 : 255;
    }
  }

  return sharp(out, { raw: { width: w, height: h, channels } })
    .png()
    .trim({ threshold: 1 })
    .toBuffer();
}

async function makeContactShadow(sw, sh) {
  const mask = Buffer.alloc(sw * sh);
  const cx = Math.round(sw * 0.62);
  const cy = Math.round(sh * 0.93);
  const rx = Math.round(sw * 0.22);
  const ry = Math.round(sh * 0.035);

  for (let y = 0; y < sh; y++) {
    for (let x = 0; x < sw; x++) {
      const dx = (x - cx) / rx;
      const dy = (y - cy) / ry;
      const d = dx * dx + dy * dy;
      if (d <= 1) {
        mask[y * sw + x] = Math.round(75 * (1 - d));
      }
    }
  }

  return sharp(mask, { raw: { width: sw, height: sh, channels: 1 } })
    .blur(16)
    .png()
    .toBuffer();
}

async function main() {
  const forkTrimmed = await cutoutForklift();
  const forkMeta = await sharp(forkTrimmed).metadata();

  const targetH = Math.round(CANVAS_H * 0.847);
  const scale = targetH / forkMeta.height;
  const scaledW = Math.round(forkMeta.width * scale);
  const scaledH = Math.round(forkMeta.height * scale);

  const rightMargin = Math.round(CANVAS_W * 0.008);
  const bottomMargin = Math.round(CANVAS_H * 0.006);

  const left = CANVAS_W - scaledW - rightMargin;
  const top = CANVAS_H - scaledH - bottomMargin;

  const forkScaled = await sharp(forkTrimmed)
    .resize(scaledW, scaledH, { kernel: "lanczos3" })
    .png()
    .toBuffer();

  const bg = await sharp(bgPath)
    .resize(CANVAS_W, CANVAS_H, { kernel: "lanczos3", fit: "cover", position: "centre" })
    .toBuffer();

  const shadow = await makeContactShadow(scaledW, scaledH);

  const composed = await sharp(bg)
    .composite([
      { input: shadow, left, top, blend: "multiply" },
      { input: forkScaled, left, top, blend: "over" },
    ])
    .jpeg({ quality: 96, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toBuffer();

  await sharp(composed).jpeg({ quality: 96, mozjpeg: true }).toFile(outJpg);
  await sharp(composed).png({ compressionLevel: 6 }).toFile(outPng);

  console.log("Saved:", outJpg);
  console.log("Placement:", { left, top, scaledW, scaledH });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
