// Generates PWA / apple-touch icons from the hero photo (square crop).
// Outputs to public/icons/: icon-192.png, icon-512.png, apple-touch-icon.png
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import sharp from 'sharp';

const outDir = join(resolve('.'), 'public', 'icons');
await mkdir(outDir, { recursive: true });

const src = await readFile(join(resolve('.'), 'public', 'gallery', 'esslingen-castle (1).jpg'));

const sizes = [
  { file: 'icon-192.png', size: 192 },
  { file: 'icon-512.png', size: 512 },
  { file: 'apple-touch-icon.png', size: 180 },
];

for (const { file, size } of sizes) {
  const buf = await sharp(src)
    .resize({ width: size, height: size, fit: 'cover', position: 'centre' })
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(join(outDir, file), buf);
  console.log(`wrote public/icons/${file} (${Math.round(buf.length / 1024)} KB)`);
}
