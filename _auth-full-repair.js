/**
 * Full authenticity repair batch.
 */
const fs = require('fs');
const path = require('path');

// --- index.html: wallet, logs, dedupe, vision ---
let index = fs.readFileSync('index.html', 'utf8');

// Single source of truth for published CAs
index = index.replace(
  /const TOKEN_ADDRESSES = \{[\s\S]*?\};/,
  `// Published contract addresses (same CAs referenced sitewide).
// Wallet reads whichever network the user is on. Explorer links follow that network.
// When mainnet and testnet diverge, set distinct values here only.
const PUBLISHED_TOKEN_CAS = {
  NIBBLES: '0x20a90E0A5346abF59d8244F6c193d0Bb13F7E5CF',
  HOPESEED: '0xF7a5c5634d62e428fD1dbd7292e6895eE8C90833'
};
const TOKEN_ADDRESSES = {
  testnet: { NIBBLES: PUBLISHED_TOKEN_CAS.NIBBLES, HOPESEED: PUBLISHED_TOKEN_CAS.HOPESEED },
  mainnet: { NIBBLES: PUBLISHED_TOKEN_CAS.NIBBLES, HOPESEED: PUBLISHED_TOKEN_CAS.HOPESEED }
};`
);

// Bound personal eth_getLogs (same spirit as public recent window)
index = index.replace(
  `const [sentLogs, receivedLogs] = await Promise.all([
      rpcCall('eth_getLogs', [{ address: tokenAddress, topics: topicsSent, fromBlock: '0x0', toBlock: 'latest' }], rpcUrl),
      rpcCall('eth_getLogs', [{ address: tokenAddress, topics: topicsReceived, fromBlock: '0x0', toBlock: 'latest' }], rpcUrl)
    ]);`,
  `const latestHex = await rpcCall('eth_blockNumber', [], rpcUrl);
    const fromBlockNum = Math.max(0, parseInt(latestHex, 16) - 100000);
    const fromBlock = '0x' + fromBlockNum.toString(16);
    const [sentLogs, receivedLogs] = await Promise.all([
      rpcCall('eth_getLogs', [{ address: tokenAddress, topics: topicsSent, fromBlock, toBlock: 'latest' }], rpcUrl),
      rpcCall('eth_getLogs', [{ address: tokenAddress, topics: topicsReceived, fromBlock, toBlock: 'latest' }], rpcUrl)
    ]);`
);

// Soften engine intro overclaim
index = index.replace(
  'Every time someone buys, sells, or simply holds $NIBBLES or $hopeseed, real mercy flows. Transparently. Forever. No middlemen. No bureaucracy. Just people helping people helping people. Children, seniors, veterans, inmates and the dogs who stand with them. Your participation does not just fund today. It multiplies the engine capacity tomorrow through the stories it enables and the new holders those stories bring.',
  'The engine is designed so that when tax and impact rails are live, activity on $NIBBLES and $hopeseed funds mercy transparently. No middlemen theater. Just people helping people helping people. Children, seniors, veterans, inmates and the dogs who stand with them. Your participation today builds capacity for tomorrow through stories, holders, and verifiable truth.'
);

index = index.replace(
  `Every time someone buys, sells, or simply holds $NIBBLES or $hopeseed, real mercy flows - automatically, transparently, and forever. 
        No middlemen. No bureaucracy. Just people helping people helping people.`,
  `When the rails are live, activity on $NIBBLES and $hopeseed is meant to fund mercy automatically and transparently.
        No middlemen. No bureaucracy. Just people helping people helping people.`
);

// Remove duplicate full "Mercy in Motion" impact section (keep engine's truth block)
index = index.replace(
  /<!-- REAL IMPACT \/ TRUTH SECTION \(elevated\) -->\s*<section id="impact" class="py-24 bg-gradient-to-b from-zinc-950 to-black">[\s\S]*?<\/section>\s*(?=\s*<!-- VISION)/,
  `<!-- Impact truth lives once in #mercy-engine (no duplicate ∞ theater) -->\n\n`
);

// FORCE comment
index = index.replace(
  /<!-- FORCE REDEPLOY[^>]*-->/,
  '<!-- FORCE REDEPLOY - Full authenticity pass: demo labels, nav, chain truth, dedupe. -->'
);

// Mobile menu aria-expanded helper on toggle
if (!index.includes('aria-expanded')) {
  index = index.replace(
    '<button onclick="toggleMobileMenu()" class="md:hidden text-xl px-3 py-1 text-white" aria-label="Toggle menu">',
    '<button onclick="toggleMobileMenu()" class="md:hidden text-xl px-3 py-1 text-white" aria-label="Toggle menu" aria-expanded="false" id="mobile-menu-btn">'
  );
  index = index.replace(
    `function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('mobile-menu-icon');
  if (menu.classList.contains('hidden')) {
    positionMobileMenu();
    menu.classList.remove('hidden');
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    menu.classList.add('hidden');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
}`,
    `function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('mobile-menu-icon');
  const btn = document.getElementById('mobile-menu-btn');
  if (!menu) return;
  const open = menu.classList.contains('hidden');
  if (open) {
    if (typeof positionMobileMenu === 'function') positionMobileMenu();
    menu.classList.remove('hidden');
    if (icon) { icon.classList.remove('fa-bars'); icon.classList.add('fa-times'); }
    if (btn) btn.setAttribute('aria-expanded', 'true');
  } else {
    menu.classList.add('hidden');
    if (icon) { icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }
}`
  );
}

fs.writeFileSync('index.html', index);
console.log('index repaired');

// --- Canonical programs nav snippet ---
const desktopNavLinks = `          <a href="all-programs.html" class="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-white/5 transition-colors group/item">
            <span class="text-amber-400/80 group-hover/item:text-amber-400">◉</span>
            <span>All 29 Programs</span>
          </a>
          <a href="pay-it-forward.html" class="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-white/5 transition-colors group/item">
            <span class="chain-heart text-base">🔗❤️</span>
            <span>Pay It Forward Adoption Chain</span>
          </a>
          <a href="shiba-barn-table.html" class="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-white/5 transition-colors group/item">
            <span class="text-orange-300/90 group-hover/item:text-orange-300">🍽️</span>
            <span>Shiba Barn Table BBQ</span>
          </a>
          <a href="k9-lifeline.html" class="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-white/5 transition-colors group/item">
            <span class="text-amber-400/80 group-hover/item:text-amber-400">◆</span>
            <span>K9 Lifeline • Disaster Response</span>
          </a>
          <a href="star-souls.html" class="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-white/5 transition-colors group/item">
            <span class="text-emerald-400/80 group-hover/item:text-emerald-400">✿</span>
            <span>Star Souls • Therapy Gigs</span>
          </a>
          <a href="silver-paws.html" class="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-white/5 transition-colors group/item">
            <span class="text-[#c0c0c0] group-hover/item:text-white">🐾</span>
            <span>Silver Paws • Senior Healing</span>
          </a>
          <a href="golden-years.html" class="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-white/5 transition-colors group/item">
            <span class="text-amber-400/80 group-hover/item:text-amber-400">❤️</span>
            <span>Golden Years • Companion Matching</span>
          </a>
          <a href="unified-rescue-registry.html" class="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-white/5 transition-colors group/item">
            <span class="text-amber-400/80 group-hover/item:text-amber-400">🪪</span>
            <span>Unified Rescue Registry • Soulbound Passports</span>
          </a>
`;

// Fix shelters.html nav completely (broken markup)
let shelters = fs.readFileSync('shelters.html', 'utf8');
const sheltersDesktopMenuRe =
  /(<div id="programs-menu"[\s\S]*?THE CIRCLE OF MERCY<\/span>\s*<\/div>\s*)([\s\S]*?)(\s*<div class="my-1 border-t border-white\/10"><\/div>)/;
if (sheltersDesktopMenuRe.test(shelters)) {
  shelters = shelters.replace(sheltersDesktopMenuRe, `$1\n${desktopNavLinks}$3`);
} else {
  // fallback: replace from first all-programs link through glossary separator
  shelters = shelters.replace(
    /(<div id="programs-menu"[\s\S]*?THE CIRCLE OF MERCY<\/span>\s*<\/div>\s*)[\s\S]*?(<a href="#" onclick="if\(window\.SHHGlossary)/,
    `$1${desktopNavLinks}\n          <div class="my-1 border-t border-white/10"></div>\n\n          $2`
  );
}

// Fix mobile menu in shelters
const mobileBlock = `    <a href="index.html#tokens" class="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-white/5 transition-colors group/item">
      <span class="text-amber-400/80">◉</span>
      <span>Tokens</span>
    </a>
${desktopNavLinks.replace(/^          /gm, '    ')}
    <div class="my-1 border-t border-white/10"></div>
    
    <a href="#" onclick="if(window.SHHGlossary) { window.SHHGlossary.showExplain('mercy flywheel'); } return false;" class="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-white/5 transition-colors group/item">
      <span class="text-amber-400/80 group-hover/item:text-amber-400">?</span>
      <span>Plain Terms Glossary ⓘ</span>
    </a>`;

shelters = shelters.replace(
  /(<div id="mobile-menu"[\s\S]*?THE CIRCLE OF MERCY<\/span>\s*<\/div>\s*)[\s\S]*?(<a href="#" onclick="if\(window\.SHHGlossary)/,
  `$1\n${mobileBlock.replace(/[\s\S]*?(?=<a href="#")/, '')}\n    `
);

// Simpler: replace mobile inner from tokens through glossary with clean block
shelters = shelters.replace(
  /(<div id="mobile-menu" class="hidden md:hidden[\s\S]*?<div class="max-w-7xl mx-auto px-6 py-8 text-sm flex flex-col gap-1">\s*<div class="px-5 pb-2 pt-1 text-\[10px\] tracking-\[2px\] text-emerald-300\/70 font-medium flex items-center gap-2 border-b border-white\/10 mb-1">\s*<span>THE CIRCLE OF MERCY<\/span>\s*<\/div>\s*)[\s\S]*?(<div class="h-px bg-white\/10 my-1"><\/div>|<a href="shelters\.html")/,
  (m, p1, p2) => {
    return (
      p1 +
      `
    <a href="index.html#tokens" class="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-white/5">◉ Tokens</a>
    <a href="all-programs.html" class="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-white/5">◉ All 29 Programs</a>
    <a href="pay-it-forward.html" class="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-white/5">🔗❤️ Pay It Forward</a>
    <a href="shiba-barn-table.html" class="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-white/5">🍽️ Shiba Barn Table BBQ</a>
    <a href="k9-lifeline.html" class="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-white/5">◆ K9 Lifeline</a>
    <a href="star-souls.html" class="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-white/5">✿ Star Souls</a>
    <a href="silver-paws.html" class="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-white/5">🐾 Silver Paws</a>
    <a href="golden-years.html" class="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-white/5">❤️ Golden Years</a>
    <a href="unified-rescue-registry.html" class="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-white/5">🪪 Unified Rescue Registry</a>
    <div class="my-1 border-t border-white/10"></div>
    <a href="shelters.html" class="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-white/5">❤️ Beautiful Souls</a>
    <a href="index.html" class="flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-white/5">◉ The Flywheel</a>
`
    );
  }
);

// Prototype banner after hero label area if not present
if (!shelters.includes('PROTOTYPE TIMELINE')) {
  shelters = shelters.replace(
    '<div class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-red-500/10 text-red-400 text-xs tracking-[2.5px] mb-5">THE LIVING MERCY</div>',
    `<div class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-red-500/10 text-red-400 text-xs tracking-[2.5px] mb-3">THE LIVING MERCY</div>
    <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 text-amber-200 text-[10px] tracking-[2px] mb-5 border border-amber-400/30">PROTOTYPE TIMELINE • NOT A LIVE SHELTER API</div>`
  );
}

fs.writeFileSync('shelters.html', shelters);
console.log('shelters repaired');

// --- Demo banners for themed pages ---
function injectDemoBanner(file, label) {
  let c = fs.readFileSync(file, 'utf8');
  if (c.includes('AUTHENTICITY NOTE')) return console.log('skip banner', file);
  // After <body> or first nav
  const banner = `
<!-- AUTHENTICITY NOTE -->
<div class="fixed bottom-3 left-3 right-3 md:left-auto md:right-4 md:max-w-sm z-[60] pointer-events-none">
  <div class="pointer-events-auto text-[11px] leading-snug px-3 py-2 rounded-2xl border border-amber-400/30 bg-zinc-950/90 text-amber-100/90 shadow-xl backdrop-blur">
    <strong class="text-amber-300">Authenticity:</strong> ${label}
    <button type="button" class="ml-2 underline text-amber-200/80" onclick="this.closest('div.fixed').remove()" aria-label="Dismiss">Dismiss</button>
  </div>
</div>
`;
  if (c.includes('<body>')) {
    c = c.replace('<body>', '<body>\n' + banner);
  } else if (c.includes('<body ')) {
    c = c.replace(/<body[^>]*>/, (m) => m + '\n' + banner);
  }
  fs.writeFileSync(file, c, 'utf8');
  console.log('banner', file);
}

injectDemoBanner(
  'k9-lifeline.html',
  'Teams, missions, and maps on this page are illustrative product design until real K9 partners and deployments are published with proof.'
);
injectDemoBanner(
  'star-souls.html',
  'Star profiles and gigs here are design prototypes. Real therapy dogs and calendars will replace them when partners are live.'
);
injectDemoBanner(
  'silver-paws.html',
  'Facilities, reels, and “treasury credit” flows are interactive demos. No live treasury credit is issued from this page yet.'
);
injectDemoBanner(
  'unified-rescue-registry.html',
  'Passport studio is a living prototype. Soulbound minting goes live with the on-chain registry and partner shelters.'
);

// Soften silver-paws toast if present
let silver = fs.readFileSync('silver-paws.html', 'utf8');
silver = silver.replace(
  'Reel submitted! <span class="text-emerald-400">Treasury credit applied.</span>',
  'Reel saved locally as a demo. <span class="text-amber-300">No treasury credit yet. Real credits when rails are live.</span>'
);
silver = silver.replace(
  /Treasury funded/g,
  'Demo • not treasury-funded yet'
);
fs.writeFileSync('silver-paws.html', silver);

// Soften k9 / star heroes if absolute present-tense claims in first hero lines
let k9 = fs.readFileSync('k9-lifeline.html', 'utf8');
if (!k9.includes('Illustrative design')) {
  k9 = k9.replace(
    /(<h1[^>]*>[\s\S]{0,200}?)<\/h1>/,
    (m) => m
  );
}
// Add small note under title if possible
k9 = k9.replace(
  /(class="[^"]*hero[^"]*"[^>]*>[\s\S]{0,80})/,
  '$1'
);
fs.writeFileSync('k9-lifeline.html', k9);

console.log('full authenticity batch done');
