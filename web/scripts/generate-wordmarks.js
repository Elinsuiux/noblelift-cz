const sharp = require("sharp");
const path = require("path");

const INPUT = path.join(__dirname, "../public/logo/noblelift-wordmark.png");
const LOGO_DIR = path.join(__dirname, "../public/logo");

const ORANGE = { r: 238, g: 68, b: 17 };

async function buildWordmark(color, width, height) {
  const alpha = await sharp(INPUT)
    .resize(width, height, { kernel: sharp.kernel.lanczos3 })
    .greyscale()
    .linear(2.2, -60)
    .toColourspace("b-w")
    .toBuffer();

  const colorLayer = await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: color,
    },
  })
    .png()
    .toBuffer();

  return sharp(colorLayer).joinChannel(alpha).png().toBuffer();
}

async function generate() {
  const metadata = await sharp(INPUT).metadata();
  const heroWidth = metadata.width * 4;
  const heroHeight = metadata.height * 4;

  const whiteHero = await buildWordmark({ r: 255, g: 255, b: 255 }, heroWidth, heroHeight);
  const orangeHero = await buildWordmark(ORANGE, heroWidth, heroHeight);

  const whiteTrim = await sharp(whiteHero).trim().sharpen({ sigma: 0.35 }).png().toBuffer();
  const orangeTrim = await sharp(orangeHero).trim().sharpen({ sigma: 0.35 }).png().toBuffer();

  const whiteMeta = await sharp(whiteTrim).metadata();
  const orangeMeta = await sharp(orangeTrim).metadata();

  await sharp(whiteTrim)
    .resize(Math.round(whiteMeta.width / 2), Math.round(whiteMeta.height / 2), {
      kernel: sharp.kernel.lanczos3,
    })
    .png()
    .toFile(path.join(LOGO_DIR, "noblelift-wordmark-white-trim.png"));

  await sharp(orangeTrim)
    .resize(Math.round(orangeMeta.width / 2), Math.round(orangeMeta.height / 2), {
      kernel: sharp.kernel.lanczos3,
    })
    .png()
    .toFile(path.join(LOGO_DIR, "noblelift-wordmark-orange-trim.png"));

  await sharp(orangeTrim).png().toFile(path.join(LOGO_DIR, "noblelift-wordmark-orange-hero.png"));

  // Exact 2x assets for hero display widths (retina-sharp, no CSS upscale)
  for (const displayWidth of [270, 310, 360]) {
    const targetWidth = displayWidth * 2;
    const targetHeight = Math.round((orangeMeta.height / orangeMeta.width) * targetWidth);
    await sharp(orangeTrim)
      .resize(targetWidth, targetHeight, { kernel: sharp.kernel.lanczos3 })
      .png()
      .toFile(path.join(LOGO_DIR, `noblelift-wordmark-orange-hero-${displayWidth}.png`));
  }

  console.log("Header/footer:", Math.round(orangeMeta.width / 2), "x", Math.round(orangeMeta.height / 2));
  console.log("Hero:", orangeMeta.width, "x", orangeMeta.height);
}

generate().catch((error) => {
  console.error(error);
  process.exit(1);
});
