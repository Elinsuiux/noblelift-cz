import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath =
  "C:/Users/ElinaSkubina-VZV/.cursor/projects/c-Users-ElinaSkubina-VZV-noblelift-cz/assets/c__Users_ElinaSkubina-VZV_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_DSC_0023_kopie1-56c599fd-cbce-4760-97c9-61413e80976a.png";
const outputPath = path.join(__dirname, "..", "public", "images", "about", "intro-warehouse-v2.jpg");

const TARGET_WIDTH = 1400;

async function main() {
  await sharp(inputPath)
    .rotate()
    .resize(TARGET_WIDTH, null, { kernel: "lanczos3" })
    .jpeg({ quality: 91, mozjpeg: true })
    .toFile(outputPath);

  const meta = await sharp(outputPath).metadata();
  console.log(`Saved ${outputPath} (${meta.width}x${meta.height})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
