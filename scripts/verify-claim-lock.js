const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const lock = fs.readFileSync(path.join(root, 'docs/shh-claim-lock-copy.md'), 'utf8');
const idx = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const priv = fs.readFileSync(path.join(root, 'privacy.html'), 'utf8');
const chrome = fs.readFileSync(path.join(root, 'js/site-chrome.js'), 'utf8');

const checks = [
  ['A1 Live tooltip', 'Real and usable today: on-chain contract, public page, or verified process you can complete now.'],
  ['A1 In progress tooltip', 'Work started; not finished. Charity rails, receipts, partner agreements, legal framing.'],
  ['A1 Prototype tooltip', 'Demo / vision UI for learning. Simulated data; not a live placement, sponsor feed, or delivery.'],
  ['A1 Planned tooltip', 'Intended after rails, funding, and partners. Do not present as available.'],
  ['A2 footer trust line', 'Incorporated · Charity rails in progress · Contracts live on Shibarium · Delivery waits for rails'],
  ['A3 privacy paragraph', 'That capture is live. Submitting your email means you are asking us to share vision and program materials with you.'],
  ['A3 form microcopy', 'Email for Blueprint materials only. Not a live donation or sponsorship.'],
];

function yn(b) { return b ? 'Y' : 'N'; }

console.log('Claim-lock verification vs Rails & Trust paste\n');
for (const [name, s] of checks) {
  console.log(
    name.padEnd(28),
    'lock=' + yn(lock.includes(s)),
    'index=' + yn(idx.includes(s)),
    'privacy=' + yn(priv.includes(s)),
    'chrome=' + yn(chrome.includes(s))
  );
}

const heroStart = idx.indexOf('id="hero"');
const doorsEnd = idx.indexOf('shh-doors-note');
const heroSlice = idx.slice(heroStart, doorsEnd > 0 ? doorsEnd : heroStart + 8000);
console.log('\nHero slice checks:');
console.log('  Meet the tokens in hero:', yn(heroSlice.includes('Meet the tokens')));
console.log('  All 30 programs CTA in hero:', yn(/All 30 programs/.test(heroSlice) && /super-cta|premium-sponsor/.test(heroSlice)));
console.log('  shh-doors present:', yn(idx.includes('shh-doors')));
console.log('  Status · pre-rails:', yn(idx.includes('Status · pre-rails')));
console.log('  designed to turn:', yn(idx.includes('designed to turn')));
console.log('  seed-dogs / seed-kids:', yn(idx.includes('/programs#seed-dogs') && idx.includes('/programs#seed-kids')));
console.log('  sponsor -> /programs:', yn(/function sponsorProgram\(\)[\s\S]{0,200}\/programs/.test(idx)));
