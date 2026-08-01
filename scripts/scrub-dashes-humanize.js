/**
 * Remove em/en dashes site-wide. Light human-voice cleanups on public copy.
 * node scripts/scrub-dashes-humanize.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const SKIP = new Set(['node_modules', '.git']);
const EXTS = new Set(['.html', '.js', '.md', '.txt', '.css', '.xml', '.json']);

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (EXTS.has(path.extname(name).toLowerCase())) out.push(p);
  }
  return out;
}

function scrubDashes(text) {
  // Em dash (U+2014)
  text = text.replace(/\s*—\s*/g, ' - ');
  text = text.replace(/—/g, ' - ');
  // En dash (U+2013): ranges like 4–6 → 4-6; spaced prose → " - "
  text = text.replace(/(\d)\s*–\s*(\d)/g, '$1-$2');
  text = text.replace(/\s*–\s*/g, ' - ');
  text = text.replace(/–/g, '-');
  // Other dash-like
  text = text.replace(/\u2012|\u2015|\u2212/g, '-');
  // Collapse weird multi-spaces from replacements (keep newlines)
  text = text.replace(/[ \t]{2,}/g, ' ');
  // Fix " - - " doubles
  text = text.replace(/ - - /g, ' - ');
  return text;
}

/** Targeted human voice (user-facing strings only, careful) */
function humanize(text, rel) {
  const pairs = [
    // AI / brochure
    [/a perpetual mercy engine on the blockchain/gi, 'a mercy engine that runs on-chain'],
    [/antifragile, self-reinforcing flywheel/gi, 'flywheel that gets stronger when people show up'],
    [/self-reinforcing flywheel/gi, 'flywheel that multiplies when people stay'],
    [/Not random fluff\./g, 'Not random prizes.'],
    [/the 30-program constellation - so the crowd feels what just got chosen\./g, 'real programs. So when the wheel lands, the room knows what got chosen.'],
    [/Living proof layer/g, 'What we will measure'],
    [/Reserved for real numbers when partners, rails, and reporting are live\. No fake impact\. Placeholders only\./g, 'Empty until partners and reporting are real. We will not invent numbers.'],
    [/Preview design · rosters, routes, and trackers go live when partners and ops rails are real\. No fake GPS claims\./g, 'Preview only. Real rosters, routes, and truck trackers when partners are real. No fake GPS.'],
    [/not a claim that cards are already printing\./g, 'we are not pretending grocery cards are printing yet.'],
    [/People helping people helping people\./g, 'People helping people. Helping people.'],
    [/quietly, when the funding comes through/gi, 'when the funding comes through'],
    [/mind-blowing/gi, 'real'],
    [/world-class/gi, 'serious'],
    [/cutting-edge/gi, 'practical'],
    [/leverage /gi, 'use '],
    [/delve /gi, 'look '],
    [/tapestry of/gi, 'mix of'],
    [/in today's world/gi, 'now'],
    [/it is important to note that /gi, ''],
    [/At the end of the day, /gi, ''],
    [/In conclusion, /gi, ''],
  ];
  for (const [re, to] of pairs) {
    text = text.replace(re, to);
  }
  return text;
}

const files = walk(root, []);
let changed = 0;
const report = [];

for (const file of files) {
  // skip this script
  if (file.endsWith('scrub-dashes-humanize.js')) continue;
  let raw = fs.readFileSync(file, 'utf8');
  const before = raw;
  raw = scrubDashes(raw);
  const rel = path.relative(root, file);
  // humanize user-facing more aggressively
  if (/\.(html|js)$/.test(file) && !/node_modules/.test(file)) {
    raw = humanize(raw, rel);
  }
  // Stat placeholders: use TBD not lone dash artifact
  if (file.endsWith('program-page.js')) {
    raw = raw.replace(/statCard\('([^']+)', ' - ',/g, "statCard('$1', 'TBD',");
    raw = raw.replace(/statCard\(([^,]+), ' - ',/g, 'statCard($1, \'TBD\',');
  }
  // Stocking none emoji
  if (file.endsWith('christmas-mercy-ops.js')) {
    raw = raw.replace(/emoji: ' - '/g, "emoji: '-'");
    raw = raw.replace(/emoji: " - "/g, 'emoji: "-"');
  }
  if (raw !== before) {
    fs.writeFileSync(file, raw, 'utf8');
    changed++;
    const emLeft = (raw.match(/\u2014/g) || []).length;
    const enLeft = (raw.match(/\u2013/g) || []).length;
    report.push(rel + (emLeft || enLeft ? ' LEFT em=' + emLeft + ' en=' + enLeft : ''));
  }
}

// Verify clean
let leftover = 0;
for (const file of walk(root, [])) {
  if (file.endsWith('scrub-dashes-humanize.js')) continue;
  const t = fs.readFileSync(file, 'utf8');
  const em = (t.match(/\u2014/g) || []).length;
  const en = (t.match(/\u2013/g) || []).length;
  if (em || en) {
    leftover += em + en;
    console.log('LEFTOVER', path.relative(root, file), 'em', em, 'en', en);
  }
}

console.log('Updated', changed, 'files');
console.log(report.slice(0, 40).join('\n'));
console.log('Leftover dash chars:', leftover);
