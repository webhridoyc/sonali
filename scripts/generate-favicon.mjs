import { writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import pngToIco from 'png-to-ico';
import sharp from 'sharp';

const repoRoot = process.cwd();

const preferredFaviconPng = path.join(repoRoot, 'public', 'favicon.png');
const fallbackLogoPng = path.join(repoRoot, 'public', 'logo.png');

const sourcePng = existsSync(preferredFaviconPng) ? preferredFaviconPng : fallbackLogoPng;

const squarePngOut = path.join(repoRoot, 'public', 'favicon-square.png');

// Create a square PNG for icon generation (pad with transparency)
await sharp(sourcePng)
  .resize(512, 512, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toFile(squarePngOut);
const outputs = [
  path.join(repoRoot, 'src', 'app', 'favicon.ico'),
  path.join(repoRoot, 'public', 'favicon.ico'),
];

const icoBuffer = await pngToIco(squarePngOut);

await Promise.all(outputs.map((out) => writeFile(out, icoBuffer)));

console.log(`Source PNG: ${sourcePng}`);
console.log(`Square PNG: ${squarePngOut}`);
console.log('Generated favicon.ico at:');
for (const out of outputs) console.log('-', out);
