'use strict';
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const d = fs.readFileSync(path.join(root, 'js/programs-data.js'), 'utf8');
const vids = [...d.matchAll(/src="(assets\/videos\/[^"]+)"/g)].map((m) => m[1]);
const u = [...new Set(vids)];
console.log('unique videos', u.length);
let miss = 0;
u.forEach((v) => {
  const ok = fs.existsSync(path.join(root, v));
  if (!ok) {
    miss++;
    console.log('MISS', v);
  }
});
console.log('preload=none', (d.match(/preload="none"/g) || []).length);
console.log('autoplay', (d.match(/autoplay/g) || []).length);
console.log('missing files', miss);
process.exit(miss ? 1 : 0);
