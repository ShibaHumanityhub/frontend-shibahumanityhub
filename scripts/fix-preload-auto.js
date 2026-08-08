'use strict';
const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '..', 'js', 'programs-data.js');
let d = fs.readFileSync(p, 'utf8');
const n = (d.match(/preload="none"/g) || []).length;
d = d.split('preload="none"').join('preload="auto"');
fs.writeFileSync(p, d);
console.log('replaced', n, 'preload=none -> auto');
