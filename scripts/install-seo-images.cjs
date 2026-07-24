/**
 * One-shot installer for social / Google / homepage image assets.
 * Usage: node scripts/install-seo-images.cjs <social.png> <thumb.png> <logo.png>
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const [socialSrc, thumbSrc, logoSrc] = process.argv.slice(2);

if (!socialSrc || !thumbSrc || !logoSrc) {
  console.error('Usage: node scripts/install-seo-images.cjs <social.png> <thumb.png> <logo.png>');
  process.exit(1);
}

async function main() {
  const socialJpg = await sharp(socialSrc)
    .resize(1200, 630, { fit: 'fill' })
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer();

  fs.writeFileSync(path.join(root, 'app/opengraph-image.jpg'), socialJpg);
  fs.writeFileSync(path.join(root, 'app/twitter-image.jpg'), socialJpg);
  fs.writeFileSync(
    path.join(root, 'app/opengraph-image.alt.txt'),
    'Koppie Systems websites, customer portals and custom business systems for South African businesses\n',
  );
  fs.writeFileSync(
    path.join(root, 'app/twitter-image.alt.txt'),
    'Koppie Systems websites and custom business systems\n',
  );

  fs.mkdirSync(path.join(root, 'public/images/og'), { recursive: true });
  fs.writeFileSync(path.join(root, 'public/images/og/koppie-systems.jpg'), socialJpg);

  fs.mkdirSync(path.join(root, 'public/images/brand'), { recursive: true });
  await sharp(logoSrc)
    .resize(1024, 1024, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .flatten({ background: '#ffffff' })
    .png({ compressionLevel: 9 })
    .toFile(path.join(root, 'public/images/brand/koppie-systems-logo-google.png'));

  await sharp(logoSrc)
    .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .flatten({ background: '#ffffff' })
    .png({ compressionLevel: 9 })
    .toFile(path.join(root, 'public/icon.png'));

  const base = await sharp(thumbSrc)
    .resize(1200, 675, { fit: 'cover', position: 'centre' })
    .toBuffer();

  // Footer label only — do not cover the laptop UI with a white callout card.
  // Section eyebrow/intro/figcaption already mark the concept as illustrative.
  const labelOverlay = Buffer.from(
    [
      '<svg width="1200" height="675" xmlns="http://www.w3.org/2000/svg">',
      '<rect x="40" y="620" width="1120" height="36" rx="4" fill="rgba(7,24,32,0.88)"/>',
      '<text x="600" y="643" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="15" fill="#f5efe6">Illustrative interface concept — not live metrics</text>',
      '</svg>',
    ].join(''),
  );

  fs.mkdirSync(path.join(root, 'public/images/seo'), { recursive: true });
  const thumbInfo = await sharp(base)
    .composite([{ input: labelOverlay, top: 0, left: 0 }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(root, 'public/images/seo/koppie-systems-homepage-thumbnail.jpg'));

  console.log('Installed SEO image assets');
  console.log({
    opengraph: fs.statSync(path.join(root, 'app/opengraph-image.jpg')).size,
    twitter: fs.statSync(path.join(root, 'app/twitter-image.jpg')).size,
    logo: fs.statSync(path.join(root, 'public/images/brand/koppie-systems-logo-google.png')).size,
    icon: fs.statSync(path.join(root, 'public/icon.png')).size,
    thumb: thumbInfo,
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
