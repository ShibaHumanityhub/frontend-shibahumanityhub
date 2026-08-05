const fs = require('fs');
const path = require('path');

const pp = path.join(__dirname, '..', 'js', 'program-page.js');
let t = fs.readFileSync(pp, 'utf8');

if (!t.includes('SHHOrphanChristmasArena')) {
 const marker = "function render(program) {";
 const idx = t.indexOf(marker);
 if (idx < 0) {
 console.error('render not found');
 process.exit(1);
 }
 // Find "var theme = accentFor" after render
 const themeIdx = t.indexOf('var theme = accentFor(program.category);', idx);
 if (themeIdx < 0) {
 console.error('theme line not found');
 process.exit(1);
 }
 const inject = `
 // Orphan Christmas full arena (live warehouse broadcast)
 if (
 window.SHHOrphanChristmasArena &&
 typeof window.SHHOrphanChristmasArena.isOrphanChristmas === 'function' &&
 window.SHHOrphanChristmasArena.isOrphanChristmas(program) &&
 typeof window.SHHOrphanChristmasArena.render === 'function'
 ) {
 document.title = 'Orphan Christmas · Live Warehouse · Shibahumanityhub';
 var metaDesc = document.querySelector('meta[name="description"]');
 if (metaDesc) {
 metaDesc.setAttribute(
 'content',
 'Orphan Christmas. Live warehouse broadcast. Verified kids. Gift packs, wrap, turkey dinners. Jesus is the reason. These kids are the why.'
 );
 }
 window.SHHOrphanChristmasArena.render();
 root.setAttribute('data-rendered-slug', program.slug || slugify(program.title));
 return;
 }

 `;
 // Insert after the early returns (after "if (!root || !program) return;")
 const afterReturn = t.indexOf('return;', idx);
 // first return in function is the guard
 const insertAt = t.indexOf('\n', afterReturn) + 1;
 t = t.slice(0, insertAt) + inject + t.slice(insertAt);
 fs.writeFileSync(pp, t);
 console.log('program-page.js hooked');
} else {
 console.log('already hooked');
}

// shortDesc
const pd = path.join(__dirname, '..', 'js', 'programs-data.js');
let d = fs.readFileSync(pd, 'utf8');
const old =
 'Verified orphans, foster kids, and youth-shelter hearts get a real Christmas. Gift packs, wrap styles, turkey dinners and grocery vouchers for low-income families. Live elf warehouse. Hub shipping. Truck trackers. Proven need only.';
const neu =
 'Some kids wake up on Christmas with nothing but quiet. Live warehouse. Gift packs. Wrap. Turkey dinners. Verified need only. Jesus is the reason. These kids are the why.';
if (d.includes(old)) {
 d = d.split(old).join(neu);
 fs.writeFileSync(pd, d);
 console.log('shortDesc updated');
} else if (d.includes(neu)) {
 console.log('shortDesc already new');
} else {
 console.log('shortDesc pattern miss');
}

// generator
const gen = path.join(__dirname, '..', 'scripts', 'generate-program-pages.js');
let g = fs.readFileSync(gen, 'utf8');
if (!g.includes('orphan-christmas-arena.js')) {
 g = g.replace(
 '<script src="../js/christmas-mercy-ops.js" defer></script>\n <script src="../js/program-page.js" defer></script>',
 '<script src="../js/christmas-mercy-ops.js" defer></script>\n <script src="../js/orphan-christmas-arena.js" defer></script>\n <script src="../js/program-page.js" defer></script>'
 );
 fs.writeFileSync(gen, g);
 console.log('generator updated');
} else {
 console.log('generator already has arena');
}
