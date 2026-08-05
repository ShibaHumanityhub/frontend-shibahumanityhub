const fs = require('fs');
const path = require('path');

function rep(file, pairs) {
 const fp = path.join(__dirname, '..', file);
 if (!fs.existsSync(fp)) {
 console.log('skip missing', file);
 return;
 }
 let t = fs.readFileSync(fp, 'utf8');
 let n = 0;
 for (const [a, b] of pairs) {
 if (!t.includes(a)) {
 console.log(' miss:', file, a.slice(0, 50));
 continue;
 }
 t = t.split(a).join(b);
 n++;
 }
 fs.writeFileSync(fp, t);
 console.log(file, n, 'replacements');
}

rep('index.html', [
 [
 'A self-reinforcing engine of mercy on Shibarium. Hold $NIBBLES or $hopeseed. Every transaction quietly becomes mercy for dogs in shelters, children, seniors, veterans and inmates. Verifiable. Compounding forever.',
 'Hold $NIBBLES or $hopeseed on Shibarium. Built so real holdings can fund shelter dogs, kids, seniors, veterans. On-chain. Honest about what is live and what is not.'
 ],
 [
 'Every transaction saves lives. $NIBBLES &amp; $hopeseed quietly fund shelter dogs (Beautiful Souls, Shelter-To-Barn), children programs &amp; soulbound passports. You are 1.',
 '$NIBBLES and $hopeseed on Shibarium. Built for shelter dogs, kids, and the people who need them. Truth first. when funding and delivery are live, holdings fund the work.'
 ],
 [
 'Every single holding turns the mercy flywheel',
 'Hold. Stay. The flywheel turns'
 ],
 [
 'It compounds the capacity for mercy over time.',
 'More people means more room for mercy.'
 ],
 ['A perpetual mercy engine', 'Mercy that can last'],
 [
 'On-chain. Voluntary. Built so success multiplies capacity for kids, dogs, veterans, and families.\n when funding and delivery are live: transparent funding. No middlemen theater.',
 'On-chain. Your call. Built so more people holding means more room for kids, dogs, veterans, and families.\n when funding and delivery are live, funding is meant to be transparent. No middleman theater.'
 ],
 [
 'A perpetual mercy engine on Shibarium. People helping people. Helping people. Every single transaction saves lives.',
 'People helping people on Shibarium. Hold $NIBBLES or $hopeseed. Built for real dogs and real kids. Truth first.'
 ],
 [
 'Hold $NIBBLES and $hopeseed to quietly turn the mercy flywheel. Real dogs. Real programs. Soulbound truth on Shibarium.',
 'Hold $NIBBLES and $hopeseed. Real dogs. Real programs. On-chain truth on Shibarium when it is live.'
 ]
]);

rep('spin-the-wheel.html', [
 [
 'You might watch a life get chosen</strong> - dog on the clock, sibling set, birthday kid, backpack run.',
 'You might watch a life get chosen.</strong> A dog on the clock. Siblings. A birthday kid. A backpack run.'
 ],
 [
 'The chat becomes the stadium</strong> - every spin amps the room for the next save.',
 'The chat is the stadium.</strong> Each spin heats the room for the next save.'
 ],
 [
 'Trip raffle seasons</strong> - select donors enter for a week for two when rules are live.',
 'Trip raffle seasons.</strong> Select donors enter for a week for two when rules are live.'
 ],
 [
 'You will not get this from a recording</strong> - timing, reaction, and who the wheel lands on are live.',
 'A recording will not feel like this.</strong> Timing. Reaction. Who the wheel lands on. Live.'
 ],
 ["title: 'BEAUTIFUL SOUL - CLOCK STOPPED'", "title: 'BEAUTIFUL SOUL: CLOCK STOPPED'"],
 ["title: 'SIBLING KEEPERS - SAME ROOF'", "title: 'SIBLING KEEPERS: SAME ROOF'"],
 ["title: 'HEALING HEARTS - DOG ON DUTY'", "title: 'HEALING HEARTS: DOG ON DUTY'"],
 ['SPINNING NOW - eyes on the pointer', 'SPINNING NOW. Eyes on the pointer.']
]);

rep('js/programs-data.js', [
 [
 'How the gift actually moves:</strong> people donate by <strong>pack size</strong> and <strong>location</strong>. Elves on a live warehouse floor sort, wrap, and seal. Boxes ship hub to hub, then roll out on Christmas-season trucks with trackers to local partner drops - shelters, foster homes, verified families. Not a wish list on the internet. A real supply chain of mercy.',
 'How the gift actually moves.</strong> You pick pack size and location. Elves on a live warehouse floor sort, wrap, and seal. Boxes go hub to hub, then out on Christmas trucks with trackers to partner drops: shelters, foster homes, verified families. Not a wish list in a DM. A real path from hands to kids.'
 ]
]);

rep('all-programs.html', [
 ['The Journey of One Quiet Holding', 'One holding. What it can do.'],
 [
 'These filters show programs your quiet holding already helps unlock. We are building this together.',
 'Filters show which programs your holding can support when funding and delivery are live. We build this with you.'
 ]
]);

rep('js/program-page.js', [
 ['What we will measure', 'The scoreboard'],
 [
 'Empty until partners and reporting are real. We will not invent numbers.',
 'Blank until partners and reporting are real. We do not invent numbers.'
 ],
 ['Coming to this page', 'What belongs here later']
]);

rep('js/christmas-mercy-ops.js', [
 [
 'Preview only. Real rosters, routes, and truck trackers when partners are real. No fake GPS.',
 'Preview only. Real rosters and truck trackers when partners are real. We will not fake GPS.'
 ],
 [
 'not random inboxes. Add a turkey dinner on the dinners tab.',
 'not random DMs. Add a turkey dinner on the dinners tab if you want.'
 ],
 [
 'Families keep their dignity. They walk into a grocery store with a voucher, not a handout bag of mystery cans when possible.',
 'Dignity matters. A voucher at a real store beats a mystery bag of cans when we can do it that way.'
 ]
]);

rep('shiba-barn-table.html', [
 [
 'The furry souls are the main characters - at barns, senior homes, and school field trips.',
 'The dogs are the main characters. At barns, senior homes, and school trips.'
 ],
 [
 'Not a carnival with dogs in the corner. Hospitality with purpose - long table energy, enrichment, livestream when we run it,',
 'Not a carnival with dogs in the corner. A real table. Enrichment. Livestream when we run it.'
 ]
]);

// final dash check
let left = 0;
function walk(d) {
 for (const n of fs.readdirSync(d)) {
 if (n === 'node_modules' || n === '.git') continue;
 const p = path.join(d, n);
 if (fs.statSync(p).isDirectory()) walk(p);
 else if (/\.(html|js|md|txt)$/.test(n)) {
 const t = fs.readFileSync(p, 'utf8');
 const em = (t.match(/\u2014/g) || []).length;
 const en = (t.match(/\u2013/g) || []).length;
 if (em || en) {
 left += em + en;
 console.log('DASH LEFT', p, em, en);
 }
 }
 }
}
walk(path.join(__dirname, '..'));
console.log('dash leftover total', left);
