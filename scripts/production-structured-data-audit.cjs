const https = require('https');
const fs = require('fs');
const path = require('path');
function get(u){return new Promise((res,rej)=>{https.get(u,{headers:{'User-Agent':'KoppieProductionAudit/1.0'}},r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>res({status:r.statusCode,body:d}));}).on('error',rej);});}
function parseLd(html){
  return [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(m=>{
    try { return JSON.parse(m[1]); } catch(e){ return {parseError:String(e), raw:m[1].slice(0,200)}; }
  });
}
function findUrls(obj, acc=[]){
  if (obj==null) return acc;
  if (typeof obj === 'string') {
    if (/^https?:\/\//i.test(obj) || /localhost/i.test(obj)) acc.push(obj);
    return acc;
  }
  if (Array.isArray(obj)) { obj.forEach(v=>findUrls(v,acc)); return acc; }
  if (typeof obj === 'object') { Object.values(obj).forEach(v=>findUrls(v,acc)); return acc; }
  return acc;
}
(async()=>{
  const samples = {
    home: 'https://www.koppiesystems.co.za/',
    service: 'https://www.koppiesystems.co.za/services/business-websites/',
    solution: 'https://www.koppiesystems.co.za/solutions/contractors/',
    package: 'https://www.koppiesystems.co.za/packages/',
    project: 'https://www.koppiesystems.co.za/projects/',
    resource: 'https://www.koppiesystems.co.za/resources/',
    location: 'https://www.koppiesystems.co.za/areas-served/pretoria/',
    contact: 'https://www.koppiesystems.co.za/contact/',
  };
  // discover one package/project/resource detail from sitemap paths file
  const urls = fs.readFileSync('docs/technical/production-crawl-artifacts/prod-urls.txt','utf8').trim().split(/\r?\n/);
  const pkg = urls.find(u=>/\/packages\/.+/.test(u));
  const proj = urls.find(u=>/\/projects\/[^/]+\/$/.test(u) && !/categories/.test(u));
  const resu = urls.find(u=>/\/resources\/[^/]+\/$/.test(u));
  if (pkg) samples.packageDetail = pkg;
  if (proj) samples.projectDetail = proj;
  if (resu) samples.resourceDetail = resu;

  const out = {};
  for (const [k,u] of Object.entries(samples)){
    const {status, body} = await get(u);
    const ld = parseLd(body);
    const urlsFound = findUrls(ld);
    const bad = urlsFound.filter(x => /localhost|vercel\.app/i.test(x) || (x.startsWith('http') && !x.startsWith('https://www.koppiesystems.co.za') && !x.includes('schema.org') && !x.includes('w3.org')));
    const hasUndefined = JSON.stringify(ld).includes('undefined');
    const hasFakeRating = JSON.stringify(ld).match(/aggregateRating|ratingValue|reviewCount/i);
    out[k] = {
      url: u,
      status,
      jsonLdBlocks: ld.length,
      validJson: ld.every(x => !x.parseError),
      absoluteUrlIssues: bad,
      hasUndefinedLiteral: hasUndefined,
      ratingClaims: !!hasFakeRating,
      types: ld.map(x => x['@type'] || (Array.isArray(x) ? x.map(i=>i['@type']) : (x['@graph']||[]).map(i=>i['@type']))).flat(),
    };
    fs.writeFileSync(path.join('docs/technical/production-crawl-artifacts', `jsonld-${k}.json`), JSON.stringify(ld,null,2));
  }
  fs.writeFileSync('docs/technical/production-crawl-artifacts/structured-data-summary.json', JSON.stringify(out,null,2));
  console.log(JSON.stringify(out,null,2));
})();
