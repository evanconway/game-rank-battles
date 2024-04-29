import { createCanvas, loadImage } from "canvas";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";

export const generateMergedImage = async (
  coverAUrl: string,
  coverBUrl: string,
) => {
  const imageA = await loadImage(coverAUrl);
  const imageB = await loadImage(coverBUrl);
  const imageCanvas = createCanvas(
    imageA.naturalWidth + imageB.naturalWidth,
    Math.max(imageA.naturalHeight, imageB.naturalHeight),
  );
  const context = imageCanvas.getContext("2d");

  context.drawImage(imageA, 0, 0);
  context.drawImage(imageB, imageA.naturalWidth, 0);

  const tempDir = path.join(__dirname, "../temp");
  if (!existsSync(tempDir)) mkdirSync(tempDir);
  const filePath = path.join(tempDir, "temp.png");
  writeFileSync(filePath, imageCanvas.toBuffer("image/png"));
  return filePath;
};
