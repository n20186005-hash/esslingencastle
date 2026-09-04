// One-off / repeatable gallery optimizer.
// - Rewrites each public/gallery/*.jpg in place as a 1600px progressive JPEG (q82)
// - Creates a <name>-thumb.jpg (900px, q72) used by the gallery grid
// Keeps the original filenames so no markup (except Gallery.tsx thumbs) changes.
import { readdir, readFile, writeFile, rename, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import sharp from 'sharp';

const dir = join(resolve('.'), 'public', 'gallery');

// Windows may briefly lock files (AV / thumbnail service). Read the source into
// a memory buffer so we never hold a file handle, then retry the replacement.
async function replaceFile(target, data) {
  const tmp = `${target}.new`;
  await writeFile(tmp, data);
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      await rename(tmp, target);
      return;
    } catch (err) {
      if (attempt === 9) {
        await rm(tmp, { force: true });
        throw err;
      }
      await rm(target, { force: true }).catch(() => {});
      await new Promise((r) => setTimeout(r, 500));
    }
  }
}

const files = (await readdir(dir)).filter(
  (f) => f.endsWith('.jpg') && !f.endsWith('-thumb.jpg')
);

let inBytes = 0;
let outBytes = 0;
const rows = [];

for (const f of files) {
  const input = join(dir, f);
  const source = await readFile(input);
  const meta = await sharp(source).metadata();
  const width = meta.width || 0;

  const full = await sharp(source)
    .rotate()
    .resize({ width: Math.min(width, 1600), withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toBuffer();

  const thumb = await sharp(source)
    .rotate()
    .resize({ width: 900, withoutEnlargement: true })
    .jpeg({ quality: 72, mozjpeg: true, progressive: true })
    .toBuffer();

  const original = source.length;
  const thumbFile = join(dir, f.replace(/\.jpg$/i, '-thumb.jpg'));
  try {
    await replaceFile(input, full);
    await replaceFile(thumbFile, thumb);
    inBytes += original;
    outBytes += full.length + thumb.length;
    rows.push(
      `${f.padEnd(28)} ${(original / 1024).toFixed(0).padStart(5)}KB -> ${(
        full.length / 1024
      ).toFixed(0).padStart(4)}KB + ${(thumb.length / 1024).toFixed(0)}KB thumb`
    );
  } catch (err) {
    rows.push(`${f.padEnd(28)} SKIPPED (${err.code || err.message})`);
  }
}

console.log(rows.join('\n'));
console.log(
  `\nTotal: ${(inBytes / 1048576).toFixed(1)}MB -> ${(outBytes / 1048576).toFixed(1)}MB (${files.length} images + thumbs)`
);
