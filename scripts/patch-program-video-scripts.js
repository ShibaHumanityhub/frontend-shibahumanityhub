/**
 * Inject program-video-amplify.js (+ program-actions) into every programs/*.html shell.
 * Run: node scripts/patch-program-video-scripts.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'programs');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.html'));
let n = 0;
files.forEach((f) => {
  const p = path.join(dir, f);
  let html = fs.readFileSync(p, 'utf8');
  let changed = false;
  if (!html.includes('program-video-amplify.js')) {
    if (html.includes('program-page.js')) {
      html = html.replace(
        /<script src="\.\.\/js\/program-page\.js" defer><\/script>/,
        '<script src="../js/program-video-amplify.js" defer></script>\n <script src="../js/program-page.js" defer></script>'
      );
      changed = true;
    } else if (html.includes('orphan-christmas-arena.js')) {
      html = html.replace(
        /<script src="\.\.\/js\/orphan-christmas-mobile\.js" defer><\/script>/,
        '<script src="../js/program-video-amplify.js" defer></script>\n <script src="../js/orphan-christmas-mobile.js" defer></script>'
      );
      changed = true;
    }
  }
  if (!html.includes('program-actions.js') && html.includes('program-page.js')) {
    html = html.replace(
      /<script src="\.\.\/js\/program-video-amplify\.js" defer><\/script>/,
      '<script src="../js/program-actions.js" defer></script>\n <script src="../js/program-video-amplify.js" defer></script>'
    );
    changed = true;
  }
  if (changed) {
    fs.writeFileSync(p, html);
    n++;
    console.log('patched', f);
  }
});
console.log('done', n, 'of', files.length);
