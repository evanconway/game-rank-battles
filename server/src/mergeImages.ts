import { createCanvas, loadImage } from "canvas";
import { writeFileSync, mkdirSync } from "fs";
import path from "path";

export const generateMergedImage = async () => {
  const imageA = await loadImage(
    "https://images.igdb.com/igdb/image/upload/t_cover_big/co65za.jpg",
  );
  const imageB = await loadImage(
    "https://images.igdb.com/igdb/image/upload/t_cover_big/co2gki.jpg",
  );
  const imageCanvas = createCanvas(
    imageA.naturalWidth + imageB.naturalWidth,
    Math.max(imageA.naturalHeight, imageB.naturalHeight),
  );
  const context = imageCanvas.getContext("2d");

  context.drawImage(imageA, 0, 0);
  context.drawImage(imageB, imageA.naturalWidth, 0);

  const tempDir = "../temp";
  mkdirSync(path.join(__dirname, tempDir));
  const filePath = path.join(__dirname, tempDir, "temp.png");
  writeFileSync(filePath, imageCanvas.toBuffer("image/png"), { flag: "a+" });
  return filePath;
};
