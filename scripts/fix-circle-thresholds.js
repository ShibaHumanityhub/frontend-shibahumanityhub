/**
 * Align Circles of Mercy hold amounts to MERCY_THRESHOLDS: 25k / 100k / 250k.
 */
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'js', 'programs-data.js');
let t = fs.readFileSync(file, 'utf8');
let n = 0;

function rep(re, to) {
  const before = t;
  t = t.replace(re, (...args) => {
    n++;
    return typeof to === 'function' ? to(...args) : to;
  });
  return before !== t;
}

/* Guardian Circle cards that wrongly say 50k */
rep(
  /(<div class="text-amber-300 font-semibold mb-2">Guardian Circle<\/div>\s*<strong>Hold )50,000(\+ \$NIBBLES<\/strong>)/g,
  '$1100,000$2'
);

/* K9 special standby / deploy / legacy amounts (avoid matching Eternal Guardian) */
rep(/Mercy Circle: Hold 50,000\+ \$NIBBLES/g, 'Mercy Circle: Hold 25,000+ $NIBBLES');
rep(/(?<!Eternal )Guardian Circle: Hold 250,000\+ \$NIBBLES/g, 'Guardian Circle: Hold 100,000+ $NIBBLES');
rep(/Eternal Guardian Circle: Hold 500,000\+ \$NIBBLES/g, 'Eternal Guardian Circle: Hold 250,000+ $NIBBLES');
rep(/Eternal Guardian Circle: Hold 100,000\+ \$NIBBLES/g, 'Eternal Guardian Circle: Hold 250,000+ $NIBBLES');

fs.writeFileSync(file, t);
console.log('replacements:', n);
console.log('remaining 50,000:', (t.match(/50,000/g) || []).length);
console.log('remaining 500,000:', (t.match(/500,000/g) || []).length);
