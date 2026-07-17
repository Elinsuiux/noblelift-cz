import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assets =
  "C:/Users/ElinaSkubina-VZV/.cursor/projects/c-Users-ElinaSkubina-VZV-noblelift-cz/assets";
const asset = (name) =>
  path.join(
    assets,
    `c__Users_ElinaSkubina-VZV_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_${name}`,
  );

const SCENE = asset("789-7abbbcfc-9102-432c-b6a5-9bbf65f9d600.png");
const FOREGROUND = asset("K801241-34-99e95014-45b2-4b68-a595-dffaedfab49b.png");
const BACKGROUND = asset("K801248-1-b56a828a-dad2-4f7c-b467-27d8a104d214.png");
const OUT = path.join(__dirname, "../public/images/hero-outdoor-noblelift.png");

const TARGET_WIDTH = 2560;

async function cutoutWhite(input, width, { flip = false } = {}) {
  const trimmed = await sharp(input).rotate().trim({ threshold: 14 }).toBuffer();
  const meta = await sharp(trimmed).metadata();
  const height = Math.round((meta.height / meta.width) * width);

  let pipeline = sharp(trimmed).resize(width, height, { kernel: "lanczos3" });
  if (flip) pipeline = pipeline.flop();

  const { data, info } = await pipeline.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    if (avg >= 235) data[i + 3] = 0;
    else if (avg > 210) data[i + 3] = Math.min(data[i + 3], Math.round(255 * (1 - (avg - 210) / 25)));
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .modulate({ saturation: 1.08, brightness: 0.97 })
    .png()
    .toBuffer();
}

async function ellipseShadow(width, height, opacity) {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="${width / 2}" cy="${height / 2}" rx="${width * 0.46}" ry="${height * 0.42}" fill="rgba(0,0,0,${opacity})"/>
  </svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

function scale(value, factor) {
  return Math.round(value * factor);
}

async function main() {
  const sceneMeta = await sharp(SCENE).rotate().metadata();
  const scaleFactor = TARGET_WIDTH / sceneMeta.width;
  const targetHeight = Math.round(sceneMeta.height * scaleFactor);

  const sceneBuffer = await sharp(SCENE)
    .rotate()
    .resize(TARGET_WIDTH, targetHeight, { kernel: "lanczos3" })
    .png()
    .toBuffer();

  const mainWidth = scale(760, scaleFactor);
  const backWidth = scale(400, scaleFactor);

  const mainForklift = await cutoutWhite(FOREGROUND, mainWidth, { flip: false });
  const backForklift = await cutoutWhite(BACKGROUND, backWidth, { flip: false });

  const mainMeta = await sharp(mainForklift).metadata();
  const backMeta = await sharp(backForklift).metadata();

  const groundY = targetHeight - scale(6, scaleFactor);
  const mainLeft = scale(95, scaleFactor);
  const mainTop = groundY - mainMeta.height;
  const backLeft = scale(640, scaleFactor);
  const backTop = groundY - backMeta.height - scale(18, scaleFactor);

  const mainShadow = await ellipseShadow(scale(760, scaleFactor), scale(90, scaleFactor), 0.36);
  const backShadow = await ellipseShadow(scale(330, scaleFactor), scale(65, scaleFactor), 0.28);

  await sharp(sceneBuffer)
    .composite([
      { input: mainShadow, left: mainLeft + scale(20, scaleFactor), top: groundY - scale(48, scaleFactor) },
      { input: backShadow, left: backLeft + scale(10, scaleFactor), top: groundY - scale(38, scaleFactor) },
      { input: backForklift, left: backLeft, top: backTop },
      { input: mainForklift, left: mainLeft, top: mainTop },
    ])
    .modulate({ saturation: 1.05 })
    .sharpen({ sigma: 0.65 })
    .png({ compressionLevel: 6 })
    .toFile(OUT);

  const outMeta = await sharp(OUT).metadata();
  console.log(`Saved ${OUT} (${outMeta.width}x${outMeta.height})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
