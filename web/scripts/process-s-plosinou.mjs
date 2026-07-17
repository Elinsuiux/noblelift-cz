import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const source =
  "C:/Users/ElinaSkubina-VZV/.cursor/projects/c-Users-ElinaSkubina-VZV-noblelift-cz/assets/c__Users_ElinaSkubina-VZV_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_K301221-1-e714b9a1-054d-4606-9c4c-fcd6b351d234.png";
const stackersDir = path.resolve(__dirname, "../public/images/products/stackers");

function shiftRedToOrange(data, channels) {
  const out = Buffer.from(data);
  for (let i = 0; i < out.length; i += channels) {
    let r = out[i];
    let g = out[i + 1];
    let b = out[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const sat = max === 0 ? 0 : (max - min) / max;
    const isRedBody = r > 90 && r > g * 1.15 && r > b * 1.15 && sat > 0.25 && max > 60;

    if (isRedBody) {
      // Shift cool red toward Noblelift orange (#ee4411)
      r = Math.min(255, r * 0.92 + 35);
      g = Math.min(255, g * 0.72 + 48);
      b = Math.min(255, b * 0.55 + 8);
    } else if (max > 200 && sat < 0.12) {
      r = Math.min(255, r + 4);
      g = Math.min(255, g + 2);
      b = Math.max(0, b - 3);
    }

    out[i] = r;
    out[i + 1] = g;
    out[i + 2] = b;
  }
  return out;
}

async function processImage(outputPath, resize) {
  const { data, info } = await sharp(source).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const graded = shiftRedToOrange(data, channels);

  let pipeline = sharp(graded, { raw: { width, height, channels } }).modulate({
    brightness: 1.02,
    saturation: 1.04,
  });

  if (resize) {
    pipeline = pipeline.resize(resize.width, resize.height, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 1 },
      position: "centre",
    });
  }

  await pipeline.png().toFile(outputPath);
  console.log(`Saved ${outputPath}`);
}

await processImage(path.join(stackersDir, "s-plosinou-product.png"));
await processImage(path.join(stackersDir, "s-plosinou-v2.png"), { width: 1024, height: 682 });
