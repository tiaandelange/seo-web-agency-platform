import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const files = [
  'public/images/hero-mobile.webp',
  'public/images/koppie-systems-website-development-hero.webp',
];

/** Apply CSS filter: brightness(0.3) contrast(1.18) saturate(0.62) in that order. */
function applyCssFilters(data) {
  const out = Buffer.alloc(data.length);
  const b = 0.3;
  const c = 1.18;
  const sat = 0.62;
  const sr = 0.2126;
  const sg = 0.7152;
  const sb = 0.0722;

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i] / 255;
    let g = data[i + 1] / 255;
    let bl = data[i + 2] / 255;

    // brightness
    r *= b;
    g *= b;
    bl *= b;

    // contrast
    r = (r - 0.5) * c + 0.5;
    g = (g - 0.5) * c + 0.5;
    bl = (bl - 0.5) * c + 0.5;

    // saturate
    const gray = sr * r + sg * g + sb * bl;
    r = gray + (r - gray) * sat;
    g = gray + (g - gray) * sat;
    bl = gray + (bl - gray) * sat;

    out[i] = Math.max(0, Math.min(255, Math.round(r * 255)));
    out[i + 1] = Math.max(0, Math.min(255, Math.round(g * 255)));
    out[i + 2] = Math.max(0, Math.min(255, Math.round(bl * 255)));
    out[i + 3] = data[i + 3];
  }
  return out;
}

for (const file of files) {
  const abs = path.resolve(file);
  const { data, info } = await sharp(abs).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const filtered = applyCssFilters(data);
  const outPath = abs.replace(/\.webp$/i, '.lcp-baked.webp');
  const before = fs.statSync(abs).size;
  await sharp(filtered, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .webp({ quality: 78 })
    .toFile(outPath);
  const after = fs.statSync(outPath).size;
  console.log(`${path.basename(file)} ${before}B -> ${path.basename(outPath)} ${after}B (${info.width}x${info.height})`);
}
