/**
 * Shelter-To-Barn Lifelong · flagship experience
 * Pull from the clock → Shiba Barn soft land → family, senior sofa, or stay.
 * Human voice. No em dashes. Circles of Mercy. Truth first. Info icons.
 */
(function () {
 'use strict';

 var INTENT_KEY = 'shh_shelter_to_barn_intents';

 var CIRCLES = [
  {
   id: 'mercy',
   name: 'Mercy Circle',
   hold: '25,000+ $NIBBLES',
   blurb: 'Design: pull fees, transport, intake isolation, and lifelong care rails release when funded. You help stop a clock with real capacity behind it.'
  },
  {
   id: 'guardian',
   name: 'Guardian Circle',
   hold: '50,000+ $NIBBLES',
   blurb: 'Design: early alerts when a soul matching your heart hits a high-risk list. Time to act before the list closes.'
  },
  {
   id: 'eternal',
   name: 'Eternal Guardian',
   hold: '250,000+ $NIBBLES',
   blurb: 'Design: lifelong guardian path with naming rights, private barn access design, and permanent recognition tied to real proofs when live.'
  }
 ];

 var PATHS = [
  {
   id: 'family',
   title: 'Loving family',
   line: 'Barn soft lands. New Beginnings packs the first weeks. Forever sticks because the house was ready.'
  },
  {
   id: 'senior',
   title: 'Senior sofa',
   line: 'Grey faces into Golden Paws homes that understand loyalty. Quiet mornings. Soft floors. Hands that stay.'
  },
  {
   id: 'stay',
   title: 'Stay as long as needed',
   line: 'A cell of 5 to 10 is still a home. Heat. Food. Soft hands. No rush to discard. Open Gate capacity first.'
  }
 ];

 function $(sel, root) {
  return (root || document).querySelector(sel);
 }
 function $$(sel, root) {
  return Array.prototype.slice.call((root || document).querySelectorAll(sel));
 }

 function i(term) {
  return '<span class="info-icon" data-term="' + term + '" role="button" tabindex="0" aria-label="Plain language: ' + term + '">ⓘ</span>';
 }

 function saveIntent(kind, detail) {
  var entry = {
   kind: kind || 'shelter-to-barn',
   detail: detail || {},
   at: new Date().toISOString(),
   path: location.pathname || ''
  };
  try {
   var list = JSON.parse(localStorage.getItem(INTENT_KEY) || '[]');
   if (!Array.isArray(list)) list = [];
   list.push(entry);
   localStorage.setItem(INTENT_KEY, JSON.stringify(list.slice(-40)));
  } catch (e) { /* private */ }
  if (typeof window.sponsorProgram === 'function') {
   window.sponsorProgram('shelter-to-barn-' + ((detail && detail.sku) || kind));
  } else {
   toast('Intent saved on this device. When rails and Open Gate are live, pulls become receipts.');
  }
  return entry;
 }

 function toast(msg) {
  var el = document.createElement('div');
  el.setAttribute('role', 'status');
  el.style.cssText =
   'position:fixed;left:50%;bottom:1.4rem;transform:translateX(-50%);z-index:320;max-width:min(28rem,calc(100vw - 1.5rem));' +
   'padding:1rem 1.2rem;border-radius:1rem;background:rgba(12,10,8,.97);border:1px solid rgba(251,191,36,.5);' +
   'color:#fef3c7;font:600 .9rem/1.45 Inter,system-ui,sans-serif;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.55)';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(function () {
   el.style.opacity = '0';
   el.style.transition = 'opacity .35s';
   setTimeout(function () {
    if (el.parentNode) el.parentNode.removeChild(el);
   }, 400);
  }, 4200);
 }

 function styles() {
  if ($('#stbx-css')) return;
  var s = document.createElement('style');
  s.id = 'stbx-css';
  s.textContent = [
   '.stbx-board{--a:#fbbf24;--e:#34d399;--ink:#0c0a08;max-width:76rem;margin:0 auto;padding:0 1rem 7rem;position:relative}',
   '.stbx-tabs{display:flex;gap:.4rem;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;padding:.65rem 0 1.1rem;position:sticky;top:4.5rem;z-index:35;',
   'background:rgba(12,10,8,.98);border-bottom:1px solid rgba(251,191,36,.2);transform:translateZ(0)}',
   '@media(min-width:768px){.stbx-tabs{background:linear-gradient(180deg,rgba(12,10,8,.98) 0%,rgba(12,10,8,.94) 80%,transparent);border-bottom:0;',
   'backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}}',
   '.stbx-tabs::-webkit-scrollbar{display:none}',
   '.stbx-tab{flex:0 0 auto;padding:.72rem 1.05rem;border-radius:999px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);',
   'color:rgba(253,230,138,.75);font-size:.78rem;font-weight:700;cursor:pointer;font-family:inherit;min-height:46px;white-space:nowrap}',
   '.stbx-tab:hover{border-color:rgba(251,191,36,.5);color:#fff}',
   '.stbx-tab.is-on{background:linear-gradient(135deg,#fef3c7,#fbbf24 50%,#34d399);color:#1c1408;border-color:transparent;',
   'box-shadow:0 0 28px -6px rgba(251,191,36,.7)}',
   '.stbx-panel{display:none}',
   '.stbx-panel.is-on{display:block;animation:stbx-in .28s ease}',
   '@keyframes stbx-in{from{opacity:0}to{opacity:1}}',
   '@media(max-width:767px){.stbx-panel.is-on{animation:none}}',
   '.stbx-kicker{font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(251,191,36,.9);margin:0 0 .55rem;font-weight:700}',
   '.stbx-h2{font-family:Space Grotesk,Inter,sans-serif;font-size:clamp(1.75rem,4.2vw,2.55rem);line-height:1.08;margin:0 0 .9rem;color:#fff;font-weight:700;letter-spacing:-.03em;text-wrap:balance}',
   '.stbx-lede{font-size:clamp(1.02rem,2.1vw,1.15rem);line-height:1.65;color:#e7e5e4;margin:0 0 1.35rem;max-width:42rem;font-weight:500}',
   '.stbx-grab{position:relative;margin:0 0 1.3rem;padding:1.1rem 1.15rem;border-radius:1.3rem;border:1px solid rgba(251,191,36,.4);',
   'background:radial-gradient(ellipse 90% 70% at 0% 0%,rgba(251,191,36,.14),transparent 55%),linear-gradient(155deg,rgba(40,28,8,.95),rgba(8,6,4,.97));',
   'box-shadow:0 0 48px -16px rgba(251,191,36,.4),0 22px 48px -28px rgba(0,0,0,.85);overflow:hidden}',
   '.stbx-grab::before{content:"";position:absolute;left:0;top:12%;bottom:12%;width:3px;border-radius:0 3px 3px 0;background:linear-gradient(180deg,#fbbf24,#34d399)}',
   '.stbx-grab p{margin:0;font-size:clamp(1rem,2.1vw,1.12rem);line-height:1.55;color:#fffbeb;font-weight:500;max-width:42rem}',
   '.stbx-grab strong{color:#fde68a}',
   '.stbx-grid{display:grid;gap:.9rem}',
   '@media(min-width:720px){.stbx-grid.g2{grid-template-columns:1fr 1fr}.stbx-grid.g3{grid-template-columns:1fr 1fr 1fr}}',
   '.stbx-card{border-radius:1.25rem;border:1px solid rgba(251,191,36,.24);background:linear-gradient(155deg,rgba(40,28,8,.92),rgba(8,6,4,.96));',
   'padding:1.2rem 1.2rem;position:relative;overflow:hidden}',
   '.stbx-card h3{margin:0 0 .45rem;font-size:1.08rem;color:#fde68a;font-weight:700;font-family:Space Grotesk,sans-serif}',
   '.stbx-card p,.stbx-card li{font-size:.95rem;line-height:1.6;color:#e7e5e4;margin:0}',
   '.stbx-card ul{margin:.4rem 0 0;padding-left:1.1rem}',
   '.stbx-card li{margin-bottom:.35rem}',
   '.stbx-circle{text-align:center;padding:1.2rem 1rem;border-radius:1.25rem;border:1px solid rgba(251,191,36,.3);',
   'background:linear-gradient(180deg,rgba(40,28,8,.9),rgba(8,6,4,.96))}',
   '.stbx-circle.is-hi{border-color:rgba(251,191,36,.6);box-shadow:0 0 36px -12px rgba(251,191,36,.45)}',
   '.stbx-circle .nm{font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;color:#fbbf24;font-weight:700;margin:0 0 .35rem}',
   '.stbx-circle h3{margin:0 0 .35rem;font-family:Space Grotesk,sans-serif;font-size:1.15rem;color:#fff}',
   '.stbx-circle .hold{font-size:.95rem;color:#fde68a;font-weight:700;margin:0 0 .55rem}',
   '.stbx-circle p{margin:0;font-size:.86rem;line-height:1.5;color:#d6d3d1}',
   '.stbx-flow{display:flex;flex-wrap:wrap;align-items:center;gap:.4rem;margin:1rem 0 1.25rem}',
   '.stbx-flow span{display:inline-flex;align-items:center;padding:.4rem .7rem;border-radius:999px;border:1px solid rgba(251,191,36,.3);background:rgba(0,0,0,.35);font-size:.72rem;font-weight:700;color:#fde68a;letter-spacing:.04em}',
   '.stbx-flow .arr{border:0;background:transparent;color:rgba(251,191,36,.5);padding:0 .1rem}',
   '.stbx-btn{display:inline-flex;align-items:center;justify-content:center;gap:.4rem;padding:.9rem 1.25rem;border-radius:999px;font-weight:700;font-size:.92rem;',
   'border:0;cursor:pointer;font-family:inherit;min-height:50px;text-decoration:none}',
   '.stbx-btn-em{background:linear-gradient(135deg,#fef3c7,#fbbf24 45%,#34d399);color:#1c1408;box-shadow:0 0 28px -8px rgba(251,191,36,.65)}',
   '.stbx-btn-ghost{background:rgba(0,0,0,.4);color:#fde68a;border:1px solid rgba(251,191,36,.4)}',
   '.stbx-row{display:flex;flex-wrap:wrap;gap:.55rem;margin:1.15rem 0}',
   '.stbx-soul{font-size:clamp(1.08rem,2.2vw,1.25rem);line-height:1.55;color:#fef3c7;font-weight:600;max-width:38rem;margin:1.2rem 0 0;font-family:Space Grotesk,sans-serif}',
   '.stbx-truth{font-size:.8rem;line-height:1.5;color:rgba(214,211,209,.5);margin:1.1rem 0 0;max-width:42rem}',
   '.stbx-sticky{position:fixed;bottom:0;left:0;right:0;z-index:45;display:flex;gap:.35rem;',
   'padding:.55rem .65rem calc(.55rem + env(safe-area-inset-bottom));',
   'background:linear-gradient(180deg,transparent,rgba(12,10,8,.98) 32%);border-top:1px solid rgba(251,191,36,.22)}',
   '.stbx-sticky a,.stbx-sticky button{flex:1;text-align:center;font-size:.7rem;font-weight:700;padding:.72rem .25rem;border-radius:999px;min-height:46px;border:0;cursor:pointer;font-family:inherit}',
   '.stbx-sticky .pri{background:linear-gradient(135deg,#fde68a,#fbbf24);color:#1c1408}',
   '.stbx-sticky .sec{background:rgba(0,0,0,.45);color:#fde68a;border:1px solid rgba(251,191,36,.35);text-decoration:none;display:flex;align-items:center;justify-content:center}',
   '@media(min-width:920px){.stbx-sticky{display:none}}',
   '@media(prefers-reduced-motion:reduce){.stbx-panel,.stbx-tab{animation:none!important}}'
  ].join('');
  document.head.appendChild(s);
 }

 function panelWhy() {
  return (
   '<section class="stbx-panel is-on" data-stbx="why">' +
   '<p class="stbx-kicker">01 · First principle</p>' +
   '<h2 class="stbx-h2">A sweet dog should not die on a list while we still have room to build a door.</h2>' +
   '<div class="stbx-grab">' +
   '<p><strong>Shelter-To-Barn' + i('shelter to barn') + ' is the pull path.</strong> Shiba Barn Campus' + i('barn campus') + ' is the soft landing. Beautiful Souls' + i('beautiful souls') + ' is why the clock hurts. Together they stop a story from ending in silence.</p>' +
   '</div>' +
   '<p class="stbx-lede">I keep thinking about the dog who still wags when a stranger walks by the kennel. That wag is not a slogan. It is a request. We design a 72-hour pull when capacity is real' + i('death row') + '. Then heat. Food. Soft hands. Then the right forever.</p>' +
   '<div class="stbx-grid g3">' +
   '<div class="stbx-card"><h3>What this is</h3><ul>' +
   '<li>Time-sensitive pull design into barn soft land</li>' +
   '<li>Isolation first' + i('isolation') + '. Pack never first</li>' +
   '<li>Three exits: family, senior sofa, or stay</li>' +
   '<li>Proofs when funded. Not invented hero counts</li>' +
   '</ul></div>' +
   '<div class="stbx-card"><h3>What this is not</h3><ul>' +
   '<li>Not impulse rescue without Open Gate' + i('open gate') + '</li>' +
   '<li>Not a warehouse of “just one more”</li>' +
   '<li>Not a promise that every dog is pulled tomorrow</li>' +
   '<li>Not a tip jar dressed as a barn</li>' +
   '</ul></div>' +
   '<div class="stbx-card"><h3>Unit of impact</h3><p>One dog off a cold list. One warm bay. One honest next chapter. Stack units. Break the discard loop.</p></div>' +
   '</div>' +
   '<p class="stbx-soul">People helping people. Helping dogs. Helping the next stranger still watching the gate.</p>' +
   '<div class="stbx-row">' +
   '<button type="button" class="stbx-btn stbx-btn-em" data-stbx-go="pull">See the pull →</button>' +
   '<button type="button" class="stbx-btn stbx-btn-ghost" data-stbx-go="paths">Three forever paths</button>' +
   '<a class="stbx-btn stbx-btn-ghost" href="barn-pods.html">Barn Campus</a>' +
   '</div>' +
   '<p class="stbx-truth">Design studio only' + i('design only') + '. No live pull counts claimed by SHH until partners, barns, and public proofs are real.</p>' +
   '</section>'
  );
 }

 function panelPull() {
  return (
   '<section class="stbx-panel" data-stbx="pull">' +
   '<p class="stbx-kicker">02 · The pull</p>' +
   '<h2 class="stbx-h2">When the list is short, speed is mercy. When capacity is fake, speed is cruelty.</h2>' +
   '<p class="stbx-lede">Design target: pull within 72 hours when Open Gate is green. Transport. Vet check. Isolation bay. Then the barn cell. Not a press release. A truck that actually arrives.</p>' +
   '<div class="stbx-flow" aria-hidden="true">' +
   '<span>High-risk list</span><span class="arr">→</span>' +
   '<span>Capacity check</span><span class="arr">→</span>' +
   '<span>Pull + transport</span><span class="arr">→</span>' +
   '<span>Isolation</span><span class="arr">→</span>' +
   '<span>Barn soft land</span>' +
   '</div>' +
   '<div class="stbx-grid g2">' +
   '<div class="stbx-card"><h3>Who we pull for</h3><p>Dogs on Beautiful Souls clocks and partner lists when agreements exist. Seniors. Misunderstood strength. Puppies learning trust. Souls the weekend crowds walked past.</p></div>' +
   '<div class="stbx-card"><h3>What must be true</h3><p>Land math green. Staff real. Isolation ready. Food and heat funded. If the gate is closed, we do not move dogs to look busy. Love that ignores capacity becomes fear.</p></div>' +
   '</div>' +
   '<div class="stbx-row">' +
   '<button type="button" class="stbx-btn stbx-btn-em" data-stbx-go="barn">Barn soft land →</button>' +
   '<a class="stbx-btn stbx-btn-ghost" href="shelters.html">See Beautiful Souls</a>' +
   '</div>' +
   '</section>'
  );
 }

 function panelBarn() {
  return (
   '<section class="stbx-panel" data-stbx="barn">' +
   '<p class="stbx-kicker">03 · Soft land · Shiba Barn</p>' +
   '<h2 class="stbx-h2">The barn is not a warehouse. It is a warm floor with a name on the bay.</h2>' +
   '<div class="stbx-grab">' +
   '<p><strong>Shelter-To-Barn uses the Shiba Barn Campus</strong> as the home base. Cells of 5 to 10' + i('pod cell') + '. Heated bays. Caretakers in the house. Density Engine honesty' + i('density engine') + '. This is how pulled dogs stop living like inventory.</p>' +
   '</div>' +
   '<p class="stbx-lede">Livestream design when funded so the world can watch care without turning dogs into content. Proof over theater. Soft hands over slogans.</p>' +
   '<div class="stbx-grid g3">' +
   '<div class="stbx-card"><h3>Intake</h3><p>Quiet first days. Vet path. Isolation until safe to join a cell. Dignity before pack.</p></div>' +
   '<div class="stbx-card"><h3>Daily life</h3><p>Food, heat, enrichment, rest. Small groups so every dog is known by name, not by slot number.</p></div>' +
   '<div class="stbx-card"><h3>Next chapter</h3><p>Match to family, senior sofa, or stay. No forced timeline that breaks a healing soul.</p></div>' +
   '</div>' +
   '<div class="stbx-row">' +
   '<a class="stbx-btn stbx-btn-em" href="barn-pods.html">Open the campus builder</a>' +
   '<button type="button" class="stbx-btn stbx-btn-ghost" data-stbx-go="paths">Forever paths →</button>' +
   '</div>' +
   '</section>'
  );
 }

 function panelPaths() {
  var cards = PATHS.map(function (p) {
   return (
    '<div class="stbx-card">' +
    '<h3>' + p.title + '</h3>' +
    '<p>' + p.line + '</p>' +
    '</div>'
   );
  }).join('');
  return (
   '<section class="stbx-panel" data-stbx="paths">' +
   '<p class="stbx-kicker">04 · Three forever paths</p>' +
   '<h2 class="stbx-h2">Family. Senior sofa. Or stay. All three are love when they are honest.</h2>' +
   '<p class="stbx-lede">Not every dog is waiting for a suburban living room. Some need quiet. Some need a job. Some need a bay that never kicks them out. We design for the soul in front of us.</p>' +
   '<div class="stbx-grid g3">' + cards + '</div>' +
   '<div class="stbx-grid g2" style="margin-top:1rem">' +
   '<div class="stbx-card"><h3>Family path tools</h3><p><a href="new-beginnings.html" class="underline text-amber-200">New Beginnings</a>' + i('new beginnings') + ' soft-lands the first weeks so forever does not bounce back to the shelter.</p></div>' +
   '<div class="stbx-card"><h3>Senior path tools</h3><p><a href="golden-paws.html" class="underline text-amber-200">Golden Paws</a>' + i('golden paws') + ' screens hard and places soft. Heroes get the sofa they already earned.</p></div>' +
   '</div>' +
   '<div class="stbx-row">' +
   '<button type="button" class="stbx-btn stbx-btn-em" data-stbx-go="circles">Circles of Mercy →</button>' +
   '<a class="stbx-btn stbx-btn-ghost" href="sequoia-legacy.html">Sequoia legacy sky</a>' +
   '</div>' +
   '</section>'
  );
 }

 function panelCircles() {
  var cards = CIRCLES.map(function (c, idx) {
   return (
    '<div class="stbx-circle' + (idx === 1 ? ' is-hi' : '') + '">' +
    '<p class="nm">Circle</p>' +
    '<h3>' + c.name + '</h3>' +
    '<p class="hold">' + c.hold + '</p>' +
    '<p>' + c.blurb + '</p>' +
    '</div>'
   );
  }).join('');
  return (
   '<section class="stbx-panel" data-stbx="circles">' +
   '<p class="stbx-kicker">05 · Circles of Mercy' + i('circles of mercy') + '</p>' +
   '<h2 class="stbx-h2">How $NIBBLES is designed to make the pull possible.</h2>' +
   '<p class="stbx-lede">Hold thresholds are program design, not live invoices. When rails are live, circles fund pulls, transport, barn care, and guardian alerts with public accounting.</p>' +
   '<div class="stbx-grid g3">' + cards + '</div>' +
   '<div class="stbx-grab" style="margin-top:1.2rem">' +
   '<p><strong>Mechanism, not magic.</strong> You hold' + i('hold') + '. Capacity grows. Trucks move when the gate is open. Proofs publish. That is how trust compounds.</p>' +
   '</div>' +
   '<div class="stbx-row">' +
   '<button type="button" class="stbx-btn stbx-btn-em" data-stbx-go="stand">Stand with a pull</button>' +
   '<a class="stbx-btn stbx-btn-ghost" href="index.html#tokens">Meet the tokens</a>' +
   '</div>' +
   '<p class="stbx-truth">USD and hold numbers are design targets. Live charity structure and partner contracts required before “funded pull” claims.</p>' +
   '</section>'
  );
 }

 function panelStand() {
  return (
   '<section class="stbx-panel" data-stbx="stand">' +
   '<p class="stbx-kicker">06 · Stand with the pull</p>' +
   '<h2 class="stbx-h2">Save an intent now. Become a receipt later.</h2>' +
   '<p class="stbx-lede">No fake checkout. Your yes lives on this device until funding and Open Gate are live. Then we turn standing into trucks, warm bays, and public proof.</p>' +
   '<div class="stbx-grid g2">' +
   '<div class="stbx-card"><h3>I want a pull intent</h3><p>Stand with death-row urgency design. Capacity first. Clock second.</p>' +
   '<button type="button" class="stbx-btn stbx-btn-em" style="margin-top:.85rem;width:100%" data-sku="pull">Save pull intent</button></div>' +
   '<div class="stbx-card"><h3>I want a barn soft-land intent</h3><p>Fund the warm floor that makes pulls honest.</p>' +
   '<button type="button" class="stbx-btn stbx-btn-em" style="margin-top:.85rem;width:100%" data-sku="barn-land">Save barn land intent</button></div>' +
   '<div class="stbx-card"><h3>I want a forever-family path</h3><p>Pull plus New Beginnings soft landing design.</p>' +
   '<button type="button" class="stbx-btn stbx-btn-em" style="margin-top:.85rem;width:100%" data-sku="family">Save family path intent</button></div>' +
   '<div class="stbx-card"><h3>I want stay-as-long-as-needed</h3><p>Lifelong barn cell care when forever house is not the fit.</p>' +
   '<button type="button" class="stbx-btn stbx-btn-em" style="margin-top:.85rem;width:100%" data-sku="stay">Save stay intent</button></div>' +
   '</div>' +
   '<div class="stbx-row">' +
   '<a class="stbx-btn stbx-btn-ghost" href="barn-pods.html">Barn Campus</a>' +
   '<a class="stbx-btn stbx-btn-ghost" href="shelters.html">Beautiful Souls</a>' +
   '<a class="stbx-btn stbx-btn-ghost" href="programs/shelter-to-barn-lifelong-program.html">Classic card</a>' +
   '<a class="stbx-btn stbx-btn-ghost" href="all-programs.html">All 30</a>' +
   '</div>' +
   '<p class="stbx-truth">Design intents only. Local storage. No charge. Live path: partners + Open Gate + public receipts.</p>' +
   '</section>'
  );
 }

 function renderBoard(host) {
  styles();
  host.innerHTML =
   '<div class="stbx-board" id="stbx-board">' +
   '<nav class="stbx-tabs" role="tablist" aria-label="Shelter-To-Barn path">' +
   '<button type="button" class="stbx-tab is-on" data-stbx-tab="why" role="tab">Why</button>' +
   '<button type="button" class="stbx-tab" data-stbx-tab="pull" role="tab">Pull</button>' +
   '<button type="button" class="stbx-tab" data-stbx-tab="barn" role="tab">Barn</button>' +
   '<button type="button" class="stbx-tab" data-stbx-tab="paths" role="tab">Paths</button>' +
   '<button type="button" class="stbx-tab" data-stbx-tab="circles" role="tab">Circles</button>' +
   '<button type="button" class="stbx-tab" data-stbx-tab="stand" role="tab">Stand</button>' +
   '</nav>' +
   '<div class="stbx-panels">' +
   panelWhy() +
   panelPull() +
   panelBarn() +
   panelPaths() +
   panelCircles() +
   panelStand() +
   '</div></div>' +
   '<div class="stbx-sticky" aria-label="Quick">' +
   '<button type="button" class="pri" data-stbx-go="stand">Stand</button>' +
   '<button type="button" class="sec" data-stbx-go="circles">Circles</button>' +
   '<a class="sec" href="barn-pods.html">Campus</a>' +
   '<a class="sec" href="shelters.html">Souls</a>' +
   '</div>';
  wire(host);
 }

 function showPanel(id) {
  $$('.stbx-panel').forEach(function (p) {
   p.classList.toggle('is-on', p.getAttribute('data-stbx') === id);
  });
  $$('.stbx-tab').forEach(function (t) {
   var on = t.getAttribute('data-stbx-tab') === id;
   t.classList.toggle('is-on', on);
   t.setAttribute('aria-selected', on ? 'true' : 'false');
  });
  try {
   var active = document.querySelector('.stbx-tab.is-on');
   if (active && active.scrollIntoView) {
    active.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
   }
  } catch (e0) { /* ignore */ }
  try {
   var board = $('#stbx-board');
   var mobile = false;
   try { mobile = window.matchMedia && window.matchMedia('(max-width: 767px)').matches; } catch (e1) {}
   if (board) board.scrollIntoView({ behavior: mobile ? 'auto' : 'smooth', block: 'start' });
  } catch (e) { /* ignore */ }
 }

 function wire(host) {
  $$('[data-stbx-tab]', host).forEach(function (btn) {
   btn.addEventListener('click', function () {
    showPanel(btn.getAttribute('data-stbx-tab'));
   });
  });
  $$('[data-stbx-go]', host).forEach(function (btn) {
   btn.addEventListener('click', function () {
    showPanel(btn.getAttribute('data-stbx-go'));
   });
  });
  document.querySelectorAll('.stbx-sticky [data-stbx-go]').forEach(function (btn) {
   btn.addEventListener('click', function () {
    showPanel(btn.getAttribute('data-stbx-go'));
   });
  });
  $$('[data-sku]', host).forEach(function (btn) {
   btn.addEventListener('click', function () {
    saveIntent('sponsor', { sku: btn.getAttribute('data-sku') });
   });
  });
 }

 function boot() {
  var host = document.getElementById('stbx-experience');
  if (!host) return;
  renderBoard(host);
 }

 window.SHHShelterToBarn = { showPanel: showPanel, boot: boot };

 if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
 else boot();
})();
