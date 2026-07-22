import { readFileSync, writeFileSync } from 'node:fs';

const damtech = readFileSync('.tmp-damtech.html', 'utf8');
const headerStart = damtech.indexOf('<header class="site-header');
const headerEnd = damtech.indexOf('</header>', headerStart) + 9;
const heroIdx = damtech.indexOf('home-hero', headerEnd);
const heroSectionStart = damtech.lastIndexOf('<section', heroIdx);
const heroEnd = damtech.indexOf('</section>', heroSectionStart) + 10;

writeFileSync('.tmp-damtech-header.html', damtech.slice(headerStart, headerEnd));
writeFileSync('.tmp-damtech-hero.html', damtech.slice(heroSectionStart, heroEnd));

const proplytic = readFileSync('.tmp-proplytic-home.js', 'utf8');
const heroConfig = proplytic.match(/heroConfig=\{[\s\S]*?\},[a-zA-Z]/);
console.log('damtech header bytes', headerEnd - headerStart);
console.log('damtech hero bytes', heroEnd - heroSectionStart);
console.log('proplytic heroConfig found', Boolean(heroConfig));
if (heroConfig) console.log(heroConfig[0].slice(0, 1200));
