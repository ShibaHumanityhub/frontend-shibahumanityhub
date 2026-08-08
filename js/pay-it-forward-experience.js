/**
 * Pay It Forward Adoption Chain · flagship experience
 * One dog. One guardian. A chain that multiplies.
 * Live chain engine. Human voice. No em dashes. Truth first.
 */
(function () {
 'use strict';

 var INTENT_KEY = 'shh_pif_intents';

 /* Design targets only (not live invoices) */
 var DESIGN = {
  monthlyCareUsd: 350,
  linkStarterUsd: 350,
  guardianUsd: 1000,
  eternalUsd: 3000,
  storyMultiplier: 2.4
 };

 var TIERS = [
  {
   id: 'link',
   name: 'First Link',
   monthly: 350,
   tag: 'Start the chain',
   blurb: 'One month of designed care for one dog and breathing room for their guardian. You become link one.'
  },
  {
   id: 'steady',
   name: 'Steady Link',
   monthly: 1000,
   tag: 'Three months design',
   blurb: 'Quarter of support design. Stories can land. The next heart has time to find the chain.'
  },
  {
   id: 'anchor',
   name: 'Anchor Link',
   monthly: 3000,
   tag: 'Year path design',
   blurb: 'Deep reserve design for one bond. Vet buffers. Winter heat. The chain does not snap on a hard month.'
  }
 ];

 function $(sel, root) {
  return (root || document).querySelector(sel);
 }
 function $$(sel, root) {
  return Array.prototype.slice.call((root || document).querySelectorAll(sel));
 }

 function saveIntent(kind, detail) {
  var entry = { kind: kind || 'pif', detail: detail || {}, at: new Date().toISOString(), path: location.pathname || '' };
  try {
   var list = JSON.parse(localStorage.getItem(INTENT_KEY) || '[]');
   if (!Array.isArray(list)) list = [];
   list.push(entry);
   localStorage.setItem(INTENT_KEY, JSON.stringify(list.slice(-40)));
  } catch (e) { /* private */ }
  if (typeof window.sponsorProgram === 'function') {
   window.sponsorProgram('pay-it-forward-' + ((detail && detail.tier) || kind));
  } else {
   toast('Intent saved on this device. When rails are live, support becomes receipts.');
  }
  return entry;
 }

 function toast(msg) {
  var el = document.createElement('div');
  el.setAttribute('role', 'status');
  el.style.cssText =
   'position:fixed;left:50%;bottom:1.4rem;transform:translateX(-50%);z-index:320;max-width:min(28rem,calc(100vw - 1.5rem));' +
   'padding:1rem 1.2rem;border-radius:1rem;background:rgba(12,6,12,.97);border:1px solid rgba(251,113,133,.5);' +
   'color:#ffe4e6;font:600 .9rem/1.45 Inter,system-ui,sans-serif;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.55)';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(function () {
   el.style.opacity = '0';
   el.style.transition = 'opacity .35s';
   setTimeout(function () {
    if (el.parentNode) el.parentNode.removeChild(el);
   }, 400);
  }, 4000);
 }

 function calcChain(months, monthlyUsd, startLinks) {
  months = Math.max(1, Math.min(60, parseInt(months, 10) || 1));
  monthlyUsd = Math.max(50, Math.min(20000, parseFloat(monthlyUsd) || DESIGN.monthlyCareUsd));
  startLinks = Math.max(1, Math.min(50, parseInt(startLinks, 10) || 1));
  var totalCare = months * monthlyUsd * startLinks;
  var bondsSupported = startLinks;
  /* Each full month of care = 1 bond-month; stories design-multiply new interest */
  var bondMonths = months * startLinks;
  var projectedNewHearts = Math.max(0, Math.floor(startLinks * months * 0.15 * DESIGN.storyMultiplier));
  var chainDepth = startLinks + projectedNewHearts;
  return {
   months: months,
   monthlyUsd: monthlyUsd,
   startLinks: startLinks,
   totalCare: Math.round(totalCare),
   bondMonths: bondMonths,
   bondsSupported: bondsSupported,
   projectedNewHearts: projectedNewHearts,
   chainDepth: chainDepth
  };
 }

 function animateNum(el, to, prefix, suffix) {
  if (!el) return;
  prefix = prefix || '';
  suffix = suffix || '';
  var target = Number(to);
  if (!isFinite(target)) {
   el.textContent = prefix + String(to) + suffix;
   return;
  }
  var from = parseFloat(String(el.textContent).replace(/[^0-9.\-]/g, ''));
  if (!isFinite(from)) from = 0;
  var start = performance.now();
  var dur = 280;
  function tick(now) {
   var t = Math.min(1, (now - start) / dur);
   var eased = 1 - Math.pow(1 - t, 3);
   var val = Math.round(from + (target - from) * eased);
   el.textContent = prefix + val.toLocaleString() + suffix;
   if (t < 1) requestAnimationFrame(tick);
   else el.textContent = prefix + target.toLocaleString() + suffix;
  }
  requestAnimationFrame(tick);
 }

 function styles() {
  if ($('#pifx-css')) return;
  var s = document.createElement('style');
  s.id = 'pifx-css';
  s.textContent = [
   '.pifx{--rose:#fb7185;--pink:#f9a8d4;--gold:#fcd34d;--ink:#0a0610;max-width:74rem;margin:0 auto;padding:0 1rem 7rem}',
   '.pifx-tabs{display:flex;gap:.35rem;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;padding:.5rem 0 1rem;position:sticky;top:4.6rem;z-index:35;',
   'background:linear-gradient(180deg,rgba(10,6,16,.98),rgba(10,6,16,.9) 90%,transparent);backdrop-filter:blur(14px)}',
   '.pifx-tabs::-webkit-scrollbar{display:none}',
   '.pifx-tab{flex:0 0 auto;padding:.7rem 1rem;border-radius:999px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);',
   'color:rgba(255,228,230,.75);font-size:.78rem;font-weight:700;cursor:pointer;font-family:inherit;min-height:46px;white-space:nowrap;transition:all .2s}',
   '.pifx-tab:hover{border-color:rgba(251,113,133,.5);color:#fff}',
   '.pifx-tab.is-on{background:linear-gradient(135deg,#fda4af,#fb7185 50%,#e11d48);color:#1a0510;border-color:transparent;',
   'box-shadow:0 0 28px -6px rgba(251,113,133,.7)}',
   '.pifx-panel{display:none;animation:pifx-in .35s cubic-bezier(.22,1,.36,1)}',
   '.pifx-panel.is-on{display:block}',
   '@keyframes pifx-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}',
   '@keyframes pifx-link{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}',
   '@keyframes pifx-pulse{0%,100%{opacity:1}50%{opacity:.45}}',
   '.pifx-kicker{font-size:.7rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(251,168,212,.9);margin:0 0 .45rem;font-weight:700}',
   '.pifx-h2{font-family:Space Grotesk,Inter,sans-serif;font-size:clamp(1.65rem,4vw,2.45rem);line-height:1.08;margin:0 0 .8rem;color:#fff;font-weight:700;letter-spacing:-.03em;text-wrap:balance}',
   '.pifx-lede{font-size:clamp(1.02rem,2vw,1.12rem);line-height:1.65;color:#e7d5db;margin:0 0 1.25rem;max-width:40rem;font-weight:500}',
   '.pifx-grid{display:grid;gap:.85rem}',
   '@media(min-width:720px){.pifx-grid.g2{grid-template-columns:1fr 1fr}.pifx-grid.g3{grid-template-columns:1fr 1fr 1fr}}',
   '.pifx-card{border-radius:1.25rem;border:1px solid rgba(251,113,133,.28);background:linear-gradient(155deg,rgba(40,12,24,.9),rgba(10,6,14,.95));',
   'padding:1.2rem 1.25rem;position:relative;overflow:hidden;transition:border-color .2s,transform .2s,box-shadow .25s}',
   '.pifx-card::before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 70% 50% at 0% 0%,rgba(251,113,133,.12),transparent 55%)}',
   '.pifx-card:hover{border-color:rgba(251,168,212,.55);transform:translateY(-2px);box-shadow:0 18px 40px -20px rgba(0,0,0,.8),0 0 36px -16px rgba(251,113,133,.4)}',
   '.pifx-card>*{position:relative;z-index:1}',
   '.pifx-card h3{margin:0 0 .4rem;font-size:1.05rem;color:#fda4af;font-weight:700}',
   '.pifx-card p,.pifx-card li{font-size:.96rem;line-height:1.6;color:#e4d0d6;margin:0}',
   '.pifx-card ul{margin:.4rem 0 0;padding-left:1.1rem}',
   '.pifx-card li{margin-bottom:.35rem}',
   '.pifx-metric{text-align:center;padding:1rem .75rem;border-radius:1.1rem;border:1px solid rgba(251,113,133,.3);background:rgba(0,0,0,.4)}',
   '.pifx-metric b{display:block;font-size:clamp(1.3rem,3vw,1.65rem);color:#fda4af;font-family:Space Grotesk,sans-serif}',
   '.pifx-metric span{font-size:.62rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,228,230,.5);font-weight:600}',
   '.pifx-btn{display:inline-flex;align-items:center;justify-content:center;gap:.4rem;padding:.9rem 1.3rem;border-radius:999px;font-weight:700;font-size:.92rem;',
   'border:0;cursor:pointer;font-family:inherit;min-height:50px;text-decoration:none;transition:transform .15s,box-shadow .2s}',
   '.pifx-btn:active{transform:scale(.98)}',
   '.pifx-btn-rose{background:linear-gradient(135deg,#fecdd3,#fb7185 45%,#e11d48);color:#1a0510;box-shadow:0 0 32px -8px rgba(251,113,133,.7)}',
   '.pifx-btn-ghost{background:rgba(0,0,0,.35);color:#fda4af;border:1px solid rgba(251,113,133,.4)}',
   '.pifx-row{display:flex;flex-wrap:wrap;gap:.55rem;margin:1.1rem 0}',
   '.pifx-truth{font-size:.78rem;line-height:1.5;color:rgba(255,228,230,.45);margin:1rem 0 0;max-width:40rem}',
   '.pifx-engine{position:relative;padding:1.25rem;border-radius:1.4rem;border:1px solid rgba(251,113,133,.4);',
   'background:linear-gradient(155deg,rgba(40,10,22,.9),rgba(8,4,10,.96));overflow:hidden;',
   'box-shadow:0 0 50px -20px rgba(251,113,133,.35),0 24px 50px -28px rgba(0,0,0,.9)}',
   '.pifx-engine-head{display:flex;flex-wrap:wrap;justify-content:space-between;gap:.75rem;align-items:flex-end;margin-bottom:1rem}',
   '.pifx-engine-head h3{margin:0;color:#fff;font-size:1.15rem}',
   '.pifx-live{display:inline-flex;align-items:center;gap:.4rem;font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;',
   'color:#fda4af;font-weight:700;padding:.35rem .7rem;border-radius:999px;border:1px solid rgba(251,113,133,.4);background:rgba(0,0,0,.35)}',
   '.pifx-live i{width:7px;height:7px;border-radius:50%;background:#fb7185;box-shadow:0 0 10px #fb7185;animation:pifx-pulse 1.6s ease infinite}',
   '.pifx-fields{display:grid;gap:.85rem}',
   '@media(min-width:700px){.pifx-fields{grid-template-columns:1fr 1fr 1fr}}',
   '.pifx-field label{display:block;font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:#fda4af;font-weight:700;margin-bottom:.35rem}',
   '.pifx-field input{width:100%;padding:.85rem 1rem;border-radius:.9rem;border:1px solid rgba(255,255,255,.12);background:rgba(0,0,0,.5);',
   'color:#fff;font-size:1.1rem;font-weight:700;font-family:Space Grotesk,Inter,sans-serif;outline:none}',
   '.pifx-field input:focus{border-color:rgba(251,113,133,.65);box-shadow:0 0 0 3px rgba(251,113,133,.15)}',
   '.pifx-field .hint{font-size:.68rem;color:rgba(255,228,230,.4);margin-top:.3rem}',
   '.pifx-out{display:grid;grid-template-columns:1fr 1fr;gap:.55rem;margin-top:1.05rem}',
   '@media(min-width:700px){.pifx-out{grid-template-columns:repeat(4,1fr)}}',
   '.pifx-out div{padding:.85rem .65rem;border-radius:1rem;background:rgba(0,0,0,.45);border:1px solid rgba(251,113,133,.25);text-align:center}',
   '.pifx-out b{display:block;font-size:clamp(1.2rem,2.8vw,1.55rem);color:#fda4af;font-family:Space Grotesk,sans-serif}',
   '.pifx-out span{font-size:.58rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,228,230,.48);font-weight:600}',
   '.pifx-out .hero{border-color:rgba(252,211,77,.4)}.pifx-out .hero b{color:#fde68a}',
   '.pifx-band{margin-top:.85rem;font-size:.95rem;color:#fecdd3;font-weight:600;line-height:1.5}',
   '.pifx-chain-vis{display:flex;flex-wrap:wrap;gap:.35rem;justify-content:center;margin:1rem 0;min-height:2.5rem}',
   '.pifx-chain-vis span{font-size:1.35rem;animation:pifx-link 2.2s ease-in-out infinite;display:inline-block}',
   '.pifx-chain-vis span:nth-child(odd){animation-delay:.2s}.pifx-chain-vis span:nth-child(3n){animation-delay:.4s}',
   '.pifx-tier.is-on{border-color:rgba(251,168,212,.7)!important;box-shadow:0 0 36px -12px rgba(251,113,133,.5)}',
   '.pifx-tier .price{font-size:1.3rem;color:#fda4af;font-weight:700;margin:.35rem 0;font-family:Space Grotesk,sans-serif}',
   '.pifx-step{display:flex;gap:.85rem;padding:1rem;border-radius:1.15rem;border:1px solid rgba(251,113,133,.25);background:rgba(0,0,0,.3);margin:0 0 .65rem}',
   '.pifx-step b{flex:0 0 2rem;height:2rem;border-radius:999px;display:flex;align-items:center;justify-content:center;',
   'background:linear-gradient(135deg,#fda4af,#e11d48);color:#1a0510;font-size:.85rem}',
   '.pifx-step div{flex:1}.pifx-step strong{display:block;color:#fff;margin-bottom:.2rem}',
   '.pifx-step p{margin:0;color:#e4d0d6;font-size:.92rem;line-height:1.5}',
   '.pifx-sticky{position:fixed;bottom:0;left:0;right:0;z-index:45;display:flex;gap:.35rem;',
   'padding:.55rem .65rem calc(.55rem + env(safe-area-inset-bottom));background:linear-gradient(180deg,transparent,rgba(10,6,16,.98) 30%);border-top:1px solid rgba(251,113,133,.25)}',
   '.pifx-sticky a,.pifx-sticky button{flex:1;text-align:center;font-size:.7rem;font-weight:700;padding:.7rem .25rem;border-radius:999px;min-height:46px;border:0;cursor:pointer;font-family:inherit}',
   '.pifx-sticky .pri{background:linear-gradient(135deg,#fecdd3,#fb7185);color:#1a0510}',
   '.pifx-sticky .sec{background:rgba(0,0,0,.4);color:#fda4af;border:1px solid rgba(251,113,133,.35);text-decoration:none;display:flex;align-items:center;justify-content:center}',
   '@media(min-width:900px){.pifx-sticky{display:none}}',
   '@media(prefers-reduced-motion:reduce){.pifx-panel,.pifx-chain-vis span,.pifx-live i{animation:none!important}}'
  ].join('');
  document.head.appendChild(s);
 }

 function panelWhy() {
  return (
   '<section class="pifx-panel is-on" data-pif="why">' +
   '<p class="pifx-kicker">01 · First principle</p>' +
   '<h2 class="pifx-h2">One bond kept standing is worth more than a thousand empty likes.</h2>' +
   '<p class="pifx-lede">Pay It Forward is not a tip jar. You sponsor one dog and the guardian who already loves them. Food. Vet. Rent pressure off the home. Stories go out with consent. The next heart joins. That is a chain. Not a one-time post.</p>' +
   '<div class="pifx-grid g3" style="margin-bottom:1rem">' +
   '<div class="pifx-metric"><b>1:1</b><span>Dog + guardian</span></div>' +
   '<div class="pifx-metric"><b>Steady</b><span>Care design target</span></div>' +
   '<div class="pifx-metric"><b>∞</b><span>Links when stories land</span></div>' +
   '</div>' +
   '<div class="pifx-grid g2">' +
   '<div class="pifx-card"><h3>The wound</h3><p>A good home fails because money ran out in week three. A guardian chooses between rent and medicine. The dog goes back. Everyone loses.</p></div>' +
   '<div class="pifx-card"><h3>The mechanism</h3><p>You fund the bond. The guardian keeps the dog. Stories (with consent) pull the next sponsor. Hold $NIBBLES for belonging. Pay living costs in steady dollars when rails are live.</p></div>' +
   '<div class="pifx-card"><h3>Bilyeu-clear</h3><p>What is the product? One standing home. What is the outcome? Fewer returns. More mornings that start with a wag, not a surrender form.</p></div>' +
   '<div class="pifx-card"><h3>Vitalik-honest</h3><p>No fake on-chain dog GPS. Intent, then receipts. Circles of Mercy are seats at the table. Care is not a chart cosplay.</p></div>' +
   '</div>' +
   '<div class="pifx-row">' +
   '<button type="button" class="pifx-btn pifx-btn-rose" data-pif-go="engine">Run the chain engine →</button>' +
   '<button type="button" class="pifx-btn pifx-btn-ghost" data-pif-go="how">How it works</button>' +
   '</div>' +
   '<p class="pifx-truth">Design studio. No live sponsorships claimed until charity rails and partners are real.</p>' +
   '</section>'
  );
 }

 function panelHow() {
  var steps = [
   ['01', 'Pick a bond', 'One dog. One guardian already in the story. Not a random kennel photo harvest.'],
   ['02', 'Fund the standing', 'Monthly care design covers food, basic vet path, and pressure off the home so love can stay.'],
   ['03', 'Guardian tells truth', 'Consent first. Real updates. No exploiting a bad day for clout.'],
   ['04', 'Next heart joins', 'Stories reach people who can carry the next link. The chain lengthens without breaking the first home.']
  ];
  var html = steps
   .map(function (s) {
    return (
     '<div class="pifx-step"><b>' +
     s[0] +
     '</b><div><strong>' +
     s[1] +
     '</strong><p>' +
     s[2] +
     '</p></div></div>'
    );
   })
   .join('');
  return (
   '<section class="pifx-panel" data-pif="how">' +
   '<p class="pifx-kicker">02 · Mechanics</p>' +
   '<h2 class="pifx-h2">Simple enough to explain. Strong enough to last winter.</h2>' +
   '<p class="pifx-lede">Elon-style: strip the fluff. The unit is a bond that does not collapse. Scale is more bonds funded well, not more noise.</p>' +
   html +
   '<div class="pifx-card" style="margin-top:.5rem"><h3>Two doors, one mission</h3><p><strong style="color:#fda4af">This page</strong> is the Adoption Chain product. <strong style="color:#fde68a">The Mercy Chain program card</strong> is the $NIBBLES circles and holding model. Same heart. Different door.</p>' +
   '<p style="margin-top:.5rem"><a href="programs/pay-it-forward-mercy-chain.html" style="color:#fda4af;font-weight:600">Open Mercy Chain card →</a> · <a href="whitepaper.html#treasury-path" style="color:#fde68a;font-weight:600">Hold heart, pay life →</a></p></div>' +
   '<div class="pifx-row">' +
   '<button type="button" class="pifx-btn pifx-btn-rose" data-pif-go="engine">Live chain math →</button>' +
   '</div>' +
   '</section>'
  );
 }

 function panelEngine() {
  return (
   '<section class="pifx-panel" data-pif="engine">' +
   '<p class="pifx-kicker">03 · Live chain engine</p>' +
   '<h2 class="pifx-h2">Type months and dollars. Watch the chain deepen.</h2>' +
   '<p class="pifx-lede">Design math only. Every keystroke recalculates bond-months, care total, and a soft projection of new hearts from honest stories. Not a promise of headcount.</p>' +
   '<div class="pifx-engine" id="pif-engine">' +
   '<div class="pifx-engine-head">' +
   '<div><h3>Chain capacity</h3><p style="margin:.25rem 0 0;font-size:.82rem;color:rgba(255,228,230,.45)">Recalculates as you type</p></div>' +
   '<div class="pifx-live"><i></i> Live</div>' +
   '</div>' +
   '<div class="pifx-fields">' +
   '<div class="pifx-field"><label for="pif-months">Months of support</label>' +
   '<input id="pif-months" type="number" inputmode="numeric" min="1" max="60" step="1" value="3" autocomplete="off">' +
   '<div class="hint">1 to 60</div></div>' +
   '<div class="pifx-field"><label for="pif-usd">USD per bond / month (design)</label>' +
   '<input id="pif-usd" type="number" inputmode="decimal" min="50" max="20000" step="25" value="350" autocomplete="off">' +
   '<div class="hint">Default design target $350</div></div>' +
   '<div class="pifx-field"><label for="pif-links">Starting links (bonds)</label>' +
   '<input id="pif-links" type="number" inputmode="numeric" min="1" max="50" step="1" value="1" autocomplete="off">' +
   '<div class="hint">How many homes you seed</div></div>' +
   '</div>' +
   '<div class="pifx-chain-vis" id="pif-vis" aria-hidden="true"></div>' +
   '<div class="pifx-out">' +
   '<div><b id="pif-o-care">$1,050</b><span>Total care design</span></div>' +
   '<div class="hero"><b id="pif-o-months">3</b><span>Bond-months</span></div>' +
   '<div><b id="pif-o-bonds">1</b><span>Homes seeded</span></div>' +
   '<div><b id="pif-o-depth">1</b><span>Chain depth design</span></div>' +
   '</div>' +
   '<p class="pifx-band" id="pif-o-band">3 months on 1 bond. Enough time for a story to land with consent.</p>' +
   '</div>' +
   '<div class="pifx-row">' +
   '<button type="button" class="pifx-btn pifx-btn-rose" data-pif-go="stand">Stand in the chain →</button>' +
   '<button type="button" class="pifx-btn pifx-btn-ghost" data-pif-go="rails">Rails + truth</button>' +
   '</div>' +
   '<p class="pifx-truth">Projections use a soft story multiplier for planning only. Real growth needs real rails, real partners, real consent.</p>' +
   '</section>'
  );
 }

 function panelRails() {
  return (
   '<section class="pifx-panel" data-pif="rails">' +
   '<p class="pifx-kicker">04 · Rails + honesty</p>' +
   '<h2 class="pifx-h2">Belonging in the token. Living costs in certainty.</h2>' +
   '<div class="pifx-grid g2">' +
   '<div class="pifx-card"><h3>What you hold</h3><p>$NIBBLES is your seat. Circles of Mercy. Story rights when live. You stand with the mission. You are not buying a wage on a chart gamble.</p></div>' +
   '<div class="pifx-card"><h3>What a life spends</h3><p>Food. Vet. Medicine. Transport. Guardian breathing room. Design path: USD stable rails when live so a hard market day does not empty a bowl.</p></div>' +
   '<div class="pifx-card"><h3>Proof stack</h3><p>When rails are live: receipts, privacy-safe updates, public program reports. Until then: intent and design only. No fake GPS. No invented saves.</p></div>' +
   '<div class="pifx-card"><h3>Who this is not for</h3><p>People who want a mascot photo and zero follow-through. The chain only works if the first home stays standing.</p></div>' +
   '</div>' +
   '<div class="pifx-row">' +
   '<a class="pifx-btn pifx-btn-ghost" href="whitepaper.html#treasury-path">Treasury path</a>' +
   '<button type="button" class="pifx-btn pifx-btn-rose" data-pif-go="stand">Join design intent →</button>' +
   '</div>' +
   '</section>'
  );
 }

 function panelStand() {
  var cards = TIERS.map(function (t, i) {
   return (
    '<div class="pifx-card pifx-tier' +
    (i === 1 ? ' is-on' : '') +
    '" data-tier="' +
    t.id +
    '">' +
    '<div class="pifx-kicker" style="margin:0">' +
    t.tag +
    '</div>' +
    '<h3 style="margin-top:.35rem">' +
    t.name +
    '</h3>' +
    '<div class="price">$' +
    t.monthly.toLocaleString() +
    '<span style="font-size:.8rem;color:#c4a4ad"> design</span></div>' +
    '<p>' +
    t.blurb +
    '</p>' +
    '<button type="button" class="pifx-btn pifx-btn-rose" style="margin-top:.85rem;width:100%" data-sponsor="' +
    t.id +
    '">I am this link</button>' +
    '</div>'
   );
  }).join('');
  return (
   '<section class="pifx-panel" data-pif="stand">' +
   '<p class="pifx-kicker">05 · Stand</p>' +
   '<h2 class="pifx-h2">Be the link. Melt a hard day into a standing home.</h2>' +
   '<p class="pifx-lede">Intent saves on this device until charity rails open. Then support becomes verifiable care with receipts.</p>' +
   '<div class="pifx-grid g3">' +
   cards +
   '</div>' +
   '<div class="pifx-row">' +
   '<button type="button" class="pifx-btn pifx-btn-rose" data-sponsor="general">Save my place in the chain</button>' +
   '<a class="pifx-btn pifx-btn-ghost" href="programs/pay-it-forward-mercy-chain.html">Mercy Chain card</a>' +
   '<a class="pifx-btn pifx-btn-ghost" href="all-programs.html">All 30</a>' +
   '<a class="pifx-btn pifx-btn-ghost" href="shelters.html">Beautiful Souls</a>' +
   '</div>' +
   '<p class="pifx-truth">USD figures are design targets for planning, not live checkout.</p>' +
   '</section>'
  );
 }

 function renderVis(n) {
  var box = document.getElementById('pif-vis');
  if (!box) return;
  n = Math.max(1, Math.min(24, n || 1));
  var html = '';
  for (var i = 0; i < n; i++) {
   html += '<span>' + (i % 2 === 0 ? '🔗' : '❤️') + '</span>';
  }
  box.innerHTML = html;
 }

 function renderBoard(host) {
  styles();
  host.innerHTML =
   '<div class="pifx" id="pifx-root">' +
   '<nav class="pifx-tabs" role="tablist" aria-label="Pay It Forward path">' +
   '<button type="button" class="pifx-tab is-on" data-pif-tab="why" role="tab">Why</button>' +
   '<button type="button" class="pifx-tab" data-pif-tab="how" role="tab">How</button>' +
   '<button type="button" class="pifx-tab" data-pif-tab="engine" role="tab">Engine</button>' +
   '<button type="button" class="pifx-tab" data-pif-tab="rails" role="tab">Rails</button>' +
   '<button type="button" class="pifx-tab" data-pif-tab="stand" role="tab">Stand</button>' +
   '</nav>' +
   '<div class="pifx-panels">' +
   panelWhy() +
   panelHow() +
   panelEngine() +
   panelRails() +
   panelStand() +
   '</div></div>' +
   '<div class="pifx-sticky" aria-label="Quick">' +
   '<button type="button" class="pri" data-pif-go="stand">Stand</button>' +
   '<button type="button" class="sec" data-pif-go="engine">Engine</button>' +
   '<button type="button" class="sec" data-pif-go="how">How</button>' +
   '<a class="sec" href="all-programs.html">All 30</a>' +
   '</div>';
  wire(host);
  wireEngine(true);
 }

 function showPanel(id) {
  $$('.pifx-panel').forEach(function (p) {
   p.classList.toggle('is-on', p.getAttribute('data-pif') === id);
  });
  $$('.pifx-tab').forEach(function (t) {
   t.classList.toggle('is-on', t.getAttribute('data-pif-tab') === id);
  });
  try {
   var root = $('#pifx-root');
   if (root) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (e) { /* ignore */ }
  if (id === 'engine') setTimeout(function () { wireEngine(true); }, 30);
 }

 function wire(host) {
  $$('[data-pif-tab]', host).forEach(function (btn) {
   btn.addEventListener('click', function () {
    showPanel(btn.getAttribute('data-pif-tab'));
   });
  });
  $$('[data-pif-go]', host).forEach(function (btn) {
   btn.addEventListener('click', function () {
    showPanel(btn.getAttribute('data-pif-go'));
   });
  });
  document.querySelectorAll('.pifx-sticky [data-pif-go]').forEach(function (btn) {
   btn.addEventListener('click', function () {
    showPanel(btn.getAttribute('data-pif-go'));
   });
  });
  $$('[data-sponsor]', host).forEach(function (btn) {
   btn.addEventListener('click', function () {
    saveIntent('sponsor', { tier: btn.getAttribute('data-sponsor') });
   });
  });
  $$('.pifx-tier', host).forEach(function (card) {
   card.addEventListener('click', function (e) {
    if (e.target && e.target.getAttribute && e.target.getAttribute('data-sponsor')) return;
    $$('.pifx-tier', host).forEach(function (c) {
     c.classList.remove('is-on');
    });
    card.classList.add('is-on');
   });
  });
 }

 function readNum(el, fb) {
  if (!el) return fb;
  var raw = String(el.value || '').trim().replace(/,/g, '');
  if (raw === '' || raw === '-' || raw === '.') return fb;
  var n = parseFloat(raw);
  return isFinite(n) ? n : fb;
 }

 function wireEngine(force) {
  var m = document.getElementById('pif-months');
  var u = document.getElementById('pif-usd');
  var l = document.getElementById('pif-links');
  if (!m || !u || !l) return;

  function run() {
   var r = calcChain(readNum(m, 3), readNum(u, 350), readNum(l, 1));
   animateNum(document.getElementById('pif-o-care'), r.totalCare, '$');
   animateNum(document.getElementById('pif-o-months'), r.bondMonths);
   animateNum(document.getElementById('pif-o-bonds'), r.bondsSupported);
   animateNum(document.getElementById('pif-o-depth'), r.chainDepth);
   var band = document.getElementById('pif-o-band');
   if (band) {
    band.textContent =
     r.months +
     ' month' +
     (r.months === 1 ? '' : 's') +
     ' on ' +
     r.startLinks +
     ' bond' +
     (r.startLinks === 1 ? '' : 's') +
     '. Design care $' +
     r.totalCare.toLocaleString() +
     '. Soft story growth +' +
     r.projectedNewHearts +
     ' hearts (planning only).';
   }
   renderVis(Math.min(16, r.chainDepth));
  }

  var events = ['input', 'change', 'keyup', 'paste', 'blur'];
  [m, u, l].forEach(function (inp) {
   if (!inp) return;
   if (inp.getAttribute('data-pif-bound') === '1' && !force) return;
   inp.setAttribute('data-pif-bound', '1');
   events.forEach(function (ev) {
    inp.addEventListener(ev, function () {
     if (ev === 'paste') setTimeout(run, 0);
     else run();
    });
   });
  });
  run();
 }

 function boot() {
  var host = document.getElementById('pif-experience');
  if (!host) return;
  renderBoard(host);
 }

 window.SHHPayItForward = {
  boot: boot,
  showPanel: showPanel,
  calcChain: calcChain
 };

 if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
 } else {
  boot();
 }
})();
