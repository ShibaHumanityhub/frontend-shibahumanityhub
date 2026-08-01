const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const idx = JSON.parse(fs.readFileSync(path.join(root, 'programs', 'index.json'), 'utf8'));
let sm = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
// strip prior program block if re-run
sm = sm.replace(/\n\s*<!-- Dedicated program pages[\s\S]*?<\/urlset>\s*$/i, '\n</urlset>\n');
sm = sm.replace(/\s*<\/urlset>\s*$/i, '');
const today = new Date().toISOString().slice(0, 10);
let block = '\n  <!-- Dedicated program pages (' + idx.length + ') -->\n';
for (const p of idx) {
  block +=
    '  <url>\n' +
    '    <loc>https://shibahumanityhub.com/' + p.url + '</loc>\n' +
    '    <lastmod>' + today + '</lastmod>\n' +
    '    <changefreq>monthly</changefreq>\n' +
    '    <priority>0.75</priority>\n' +
    '  </url>\n';
}
sm += block + '\n</urlset>\n';
fs.writeFileSync(path.join(root, 'sitemap.xml'), sm);
console.log('Added', idx.length, 'program URLs to sitemap');
