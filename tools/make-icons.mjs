/* ==========================================================================
   make-icons.mjs — Makes every favicon/app icon from site/favicon.svg
   (npm run icons)

   site/favicon.svg is the one source: a "JJ" monogram (Boska glyphs saved
   as paths, paper on ink, rounded square). This script uses sharp to write:

     site/favicon.ico           32×32  (old browsers, Google results)
     site/apple-touch-icon.png  180×180 (iPhone/iPad home screen)
     site/icon-192.png          192×192 (Android, site.webmanifest)
     site/icon-512.png          512×512 (Android splash, site.webmanifest)

   The PNG icons are drawn on a full ink square (no rounded corners):
   iOS and Android round the corners themselves, and transparent corners
   would show up as white or black wedges.
   ========================================================================== */

import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const SVG = "site/favicon.svg";
const INK = "#0E0E0E";

// The square version: same artwork, but the rounded corner radius set to 0
const svgRounded = readFileSync(SVG, "utf8");
const svgSquare = svgRounded.replace(/rx="[\d.]+"/, 'rx="0"');


// --- 1. PNG icons -------------------------------------------------------------

async function png(svg, size) {
  return sharp(Buffer.from(svg), { density: 72 * (size / 64) * 2 })
    .resize(size, size)
    .flatten({ background: INK })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

const pngs = [
  ["site/apple-touch-icon.png", 180],
  ["site/icon-192.png", 192],
  ["site/icon-512.png", 512],
];

for (const [file, size] of pngs) {
  writeFileSync(file, await png(svgSquare, size));
  console.log(`✔  ${file}  (${size}×${size})`);
}


// --- 2. favicon.ico -------------------------------------------------------------
// An .ico file is a tiny header + a directory entry + the image. Modern ICO
// files may simply contain a PNG, so we wrap one 32×32 PNG (rounded version,
// transparent corners).

const ico32 = await sharp(Buffer.from(svgRounded), { density: 72 })
  .resize(32, 32)
  .png({ compressionLevel: 9 })
  .toBuffer();

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);   // reserved
header.writeUInt16LE(1, 2);   // type 1 = icon
header.writeUInt16LE(1, 4);   // number of images

const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0);               // width
entry.writeUInt8(32, 1);               // height
entry.writeUInt8(0, 2);                // colours in palette (0 = none)
entry.writeUInt8(0, 3);                // reserved
entry.writeUInt16LE(1, 4);             // colour planes
entry.writeUInt16LE(32, 6);            // bits per pixel
entry.writeUInt32LE(ico32.length, 8);  // size of the image data
entry.writeUInt32LE(6 + 16, 12);       // where the image data starts

writeFileSync("site/favicon.ico", Buffer.concat([header, entry, ico32]));
console.log("✔  site/favicon.ico  (32×32)");
