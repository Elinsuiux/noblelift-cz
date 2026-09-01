import fs from "node:fs";
import sharp from "sharp";
import pngToIco from "png-to-ico";

function svg(size) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#F15A22"/>
  <text x="16" y="26.6" text-anchor="middle" font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="28" font-weight="900" fill="#FFFFFF">N</text>
</svg>`);
}

const buffers = await Promise.all(
  [16, 32, 48].map((size) => sharp(svg(size)).png().toBuffer()),
);

await sharp(svg(512)).png().toFile("public/logo/noblelift-n-mark.png");
await sharp(svg(64)).png().toFile("src/app/icon.png");
await sharp(svg(180)).png().toFile("src/app/apple-icon.png");
fs.writeFileSync("src/app/favicon.ico", await pngToIco(buffers));

console.log("favicon assets updated");
