/**
 * Sequoia Living Legacy · Rainbow Bridge + universal forest registry
 * Every SHH animal can live in the registry. Trees fire on funded life events.
 * Partner: Shiba Sequoia Forest (@LADS_STFT) + friends when rails are live.
 * Truth first. No em dashes. Design until funding and plant proofs are real.
 */
(function () {
 'use strict';

 var INTENT_KEY = 'shh_sequoia_intents';

 var PARTNER = {
  name: 'Shiba Sequoia Forest',
  handle: '@LADS_STFT',
  x: 'https://x.com/LADS_STFT',
  web: 'https://shibasequoiaforest.com/',
  linktree: 'https://linktr.ee/shibasequoiaforest',
  email: 'LadsReforestationProject@gmail.com',
  mission: 'Community, tree preservation, and independent art and music. They already plant Giant Sequoias and grow the forest with friends.',
  publicClaim: 'Their public materials speak of 1,400+ sequoias planted and community work. When we fund plantings live, we publish partner proofs, not slogans.'
 };

 var EVENTS = [
  {
   id: 'registry',
   name: 'Living registry seat',
   tree: false,
   blurb: 'Every animal in SHH programs can enter the Sequoia registry. Identity forever. No tree required on day one.',
   usd: 0
  },
  {
   id: 'welcome',
   name: 'Welcome Tree',
   tree: true,
   blurb: 'Optional. A sequoia reserved or planted when a soul enters campus, forever home, or hospice with a funded seed.',
   usd: 85
  },
  {
   id: 'milestone',
   name: 'Milestone Tree',
   tree: true,
   blurb: 'Optional. Therapy placement, recovery, forever sofa, cell graduation. Joy that grows in the ground.',
   usd: 85
  },
  {
   id: 'bridge',
   name: 'Rainbow Bridge Tree',
   tree: true,
   blurb: 'Core promise. When they leave us, a Giant Sequoia is planted in their name with our planting partners. Dignity past the last breath.',
   usd: 120
  },
  {
   id: 'grove',
   name: 'Cell / Campus Grove',
   tree: true,
   blurb: 'For barn sponsors and founders. A grove line tied to a cell or bay. Warm floor now. Living sky later.',
   usd: 450
  }
 ];

 var PROGRAM_LINKS = [
  { name: 'Shiba Barn Campus', href: 'barn-pods.html', line: 'Cells of 5-10. Every resident can sit on the registry.' },
  { name: 'Golden Paws', href: 'golden-paws.html', line: 'Forever sofas. Welcome and Bridge trees for heroes.' },
  { name: 'Healing Hearts', href: 'healing-hearts.html', line: 'Therapy network. Living stories in the forest ledger.' },
  { name: 'Silver Paws', href: 'silver-paws.html', line: 'Senior visits. Soft moments. Lasting names.' },
  { name: 'Golden Years', href: 'golden-years.html', line: 'Two hearts at home. Legacy that outlives the quiet.' },
  { name: 'Global Disaster K9', href: 'k9-lifeline.html', line: 'Bonded pairs. Light that finds souls. Trees that remember.' },
  { name: 'Pay It Forward', href: 'pay-it-forward.html', line: 'Chains of mercy. Forests that multiply with love.' },
  { name: 'New Beginnings', href: 'new-beginnings.html', line: 'First weeks home. Optional welcome seed for the bond.' }
 ];

 function $(sel, root) {
  return (root || document).querySelector(sel);
 }
 function $$(sel, root) {
  return Array.prototype.slice.call((root || document).querySelectorAll(sel));
 }

 function money(n) {
  if (!isFinite(n)) return 'n/a';
  return '$' + Math.round(n).toLocaleString();
 }

 function saveIntent(kind, detail) {
  var entry = {
   kind: kind || 'sequoia',
   detail: detail || {},
   at: new Date().toISOString(),
   path: location.pathname || ''
  };
  try {
   var list = JSON.parse(localStorage.getItem(INTENT_KEY) || '[]');
   if (!Array.isArray(list)) list = [];
   list.push(entry);
   localStorage.setItem(INTENT_KEY, JSON.stringify(list.slice(-50)));
  } catch (e) { /* private */ }
  if (typeof window.sponsorProgram === 'function') {
   window.sponsorProgram('sequoia-' + ((detail && detail.sku) || kind));
  } else {
   toast('Saved on this device. When rails are live, intent becomes real plantings with partner proofs.');
  }
  return entry;
 }

 function toast(msg) {
  var el = document.createElement('div');
  el.setAttribute('role', 'status');
  el.style.cssText =
   'position:fixed;left:50%;bottom:1.4rem;transform:translateX(-50%);z-index:320;max-width:min(28rem,calc(100vw - 1.5rem));' +
   'padding:1rem 1.2rem;border-radius:1rem;background:rgba(4,12,10,.97);border:1px solid rgba(52,211,153,.55);' +
   'color:#d1fae5;font:600 .9rem/1.45 Inter,system-ui,sans-serif;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.6)';
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
  if ($('#sqx-css')) return;
  var s = document.createElement('style');
  s.id = 'sqx-css';
  s.textContent = [
   '.sqx-board{--g:#34d399;--gold:#fcd34d;--mist:#a7f3d0;--ink:#03140f;max-width:76rem;margin:0 auto;padding:0 1rem 7rem;position:relative}',
   /* Solid sticky tabs on mobile (no backdrop-filter = no scroll flicker). Blur only on desktop. */
   '.sqx-tabs{display:flex;gap:.4rem;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;padding:.65rem 0 1.1rem;position:sticky;top:4.5rem;z-index:35;',
   'background:rgba(3,20,15,.98);border-bottom:1px solid rgba(52,211,153,.18);transform:translateZ(0)}',
   '@media(min-width:900px){.sqx-tabs{background:linear-gradient(180deg,rgba(3,20,15,.98) 0%,rgba(3,20,15,.94) 80%,transparent);border-bottom:0;',
   'backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}}',
   '.sqx-tabs::-webkit-scrollbar{display:none}',
   '.sqx-tab{flex:0 0 auto;padding:.72rem 1.05rem;border-radius:999px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);',
   'color:rgba(209,250,229,.75);font-size:.78rem;font-weight:700;cursor:pointer;font-family:inherit;min-height:46px;white-space:nowrap;',
   'transition:border-color .2s,background .2s,color .2s,box-shadow .2s}',
   '.sqx-tab:hover{border-color:rgba(52,211,153,.5);color:#fff}',
   '.sqx-tab.is-on{background:linear-gradient(135deg,#a7f3d0 0%,#34d399 45%,#059669 100%);color:#03140f;border-color:transparent;',
   'box-shadow:0 0 28px -6px rgba(52,211,153,.7)}',
   /* Soft fade only — no scale (scale + sticky caused mobile flicker) */
   '.sqx-panel{display:none}',
   '.sqx-panel.is-on{display:block;animation:sqx-rise .28s ease}',
   '@keyframes sqx-rise{from{opacity:0}to{opacity:1}}',
   '@media(max-width:899px){.sqx-panel.is-on{animation:none}}',
   '.sqx-kicker{font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(52,211,153,.9);margin:0 0 .55rem;font-weight:700}',
   '.sqx-h2{font-family:Space Grotesk,Inter,sans-serif;font-size:clamp(1.8rem,4.4vw,2.7rem);line-height:1.06;margin:0 0 .9rem;color:#fff;font-weight:700;letter-spacing:-.035em;text-wrap:balance;text-shadow:0 0 40px rgba(52,211,153,.15)}',
   '.sqx-lede{font-size:clamp(1.05rem,2.2vw,1.18rem);line-height:1.65;color:#d1fae5;margin:0 0 1.4rem;max-width:42rem;font-weight:500}',
   '.sqx-grab{position:relative;margin:0 0 1.35rem;padding:1.15rem 1.2rem 1.2rem;border-radius:1.3rem;border:1px solid rgba(52,211,153,.4);',
   'background:radial-gradient(ellipse 90% 70% at 0% 0%,rgba(52,211,153,.16),transparent 55%),linear-gradient(155deg,rgba(6,40,32,.95),rgba(3,12,10,.97));',
   'box-shadow:0 0 50px -16px rgba(52,211,153,.45),0 24px 50px -28px rgba(0,0,0,.85);overflow:hidden}',
   '.sqx-grab::before{content:"";position:absolute;left:0;top:12%;bottom:12%;width:3px;border-radius:0 3px 3px 0;background:linear-gradient(180deg,#34d399,#fcd34d);box-shadow:0 0 14px rgba(52,211,153,.5)}',
   '.sqx-grab p{margin:0;font-size:clamp(1.02rem,2.2vw,1.15rem);line-height:1.55;color:#ecfdf5;font-weight:500;max-width:42rem}',
   '.sqx-grab strong{color:#fde68a}',
   '.sqx-grid{display:grid;gap:.95rem}',
   '@media(min-width:720px){.sqx-grid.g2{grid-template-columns:1fr 1fr}.sqx-grid.g3{grid-template-columns:1fr 1fr 1fr}.sqx-grid.g4{grid-template-columns:repeat(4,1fr)}}',
   '.sqx-card{border-radius:1.3rem;border:1px solid rgba(52,211,153,.24);background:linear-gradient(155deg,rgba(8,36,28,.94),rgba(4,12,10,.96));',
   'padding:1.25rem 1.3rem;position:relative;overflow:hidden;transition:border-color .22s,transform .22s,box-shadow .28s}',
   '.sqx-card::before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 80% 50% at 0% 0%,rgba(52,211,153,.1),transparent 55%)}',
   '@media(hover:hover){.sqx-card:hover{border-color:rgba(52,211,153,.55);transform:translateY(-3px);box-shadow:0 22px 48px -22px rgba(0,0,0,.88),0 0 48px -18px rgba(52,211,153,.35)}}',
   '.sqx-vigil{margin:0 0 1.35rem;padding:1.2rem 1.15rem;border-radius:1.35rem;border:1px solid rgba(252,211,77,.32);',
   'background:radial-gradient(ellipse 90% 70% at 50% 0%,rgba(252,211,77,.12),transparent 55%),linear-gradient(155deg,rgba(12,32,24,.96),rgba(3,12,10,.98));',
   'box-shadow:0 0 40px -16px rgba(252,211,77,.3),0 20px 48px -28px rgba(0,0,0,.85);text-align:center}',
   '.sqx-vigil .sqx-kicker{color:rgba(252,211,77,.9)}',
   '.sqx-vigil p{margin:0;font-size:clamp(1.02rem,2.2vw,1.18rem);line-height:1.55;color:#fef3c7;font-weight:600;font-family:Space Grotesk,sans-serif}',
   '.sqx-vigil span{display:block;margin-top:.65rem;font-size:.78rem;line-height:1.45;color:rgba(209,250,229,.55);font-weight:500;font-family:Inter,system-ui,sans-serif}',
   '.sqx-card > *{position:relative;z-index:1}',
   '.sqx-card h3{margin:0 0 .5rem;font-size:1.1rem;color:#a7f3d0;font-weight:700;letter-spacing:-.015em;font-family:Space Grotesk,sans-serif}',
   '.sqx-card p,.sqx-card li{font-size:.98rem;line-height:1.62;color:#c6e7d8;margin:0}',
   '.sqx-card ul{margin:.45rem 0 0;padding-left:1.1rem}',
   '.sqx-card li{margin-bottom:.4rem}',
   '.sqx-metric{text-align:center;padding:1.15rem .85rem;border-radius:1.15rem;border:1px solid rgba(52,211,153,.3);',
   'background:linear-gradient(180deg,rgba(8,40,30,.92),rgba(4,12,10,.96));box-shadow:inset 0 1px 0 rgba(255,255,255,.05)}',
   '.sqx-metric b{display:block;font-size:clamp(1.45rem,3.2vw,1.85rem);color:#fde68a;font-family:Space Grotesk,sans-serif;letter-spacing:-.02em;line-height:1.1}',
   '.sqx-metric span{font-size:.65rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(209,250,229,.55);font-weight:600;margin-top:.4rem;display:block}',
   '.sqx-btn{display:inline-flex;align-items:center;justify-content:center;gap:.4rem;padding:.9rem 1.3rem;border-radius:999px;font-weight:700;font-size:.92rem;',
   'border:0;cursor:pointer;font-family:inherit;min-height:50px;text-decoration:none;transition:transform .15s,box-shadow .2s}',
   '.sqx-btn:active{transform:scale(.98)}',
   '.sqx-btn-em{background:linear-gradient(135deg,#ecfdf5,#6ee7b7 40%,#34d399);color:#03140f;box-shadow:0 0 32px -8px rgba(52,211,153,.7)}',
   '.sqx-btn-em:hover{box-shadow:0 0 40px -6px rgba(52,211,153,.9);transform:translateY(-1px)}',
   '.sqx-btn-ghost{background:rgba(0,0,0,.4);color:#a7f3d0;border:1px solid rgba(52,211,153,.42)}',
   '.sqx-row{display:flex;flex-wrap:wrap;gap:.55rem;margin:1.15rem 0}',
   '.sqx-truth{font-size:.8rem;line-height:1.5;color:rgba(209,250,229,.48);margin:1.1rem 0 0;max-width:42rem}',
   '.sqx-soul{font-size:clamp(1.1rem,2.2vw,1.28rem);line-height:1.55;color:#fef3c7;font-weight:600;max-width:38rem;margin:1.25rem 0 0;font-family:Space Grotesk,sans-serif}',
   '.sqx-partner{position:relative;padding:1.35rem 1.3rem;border-radius:1.4rem;border:1px solid rgba(252,211,77,.4);',
   'background:radial-gradient(ellipse 80% 60% at 100% 0%,rgba(252,211,77,.12),transparent 50%),linear-gradient(155deg,rgba(12,40,28,.95),rgba(4,12,10,.97));',
   'box-shadow:0 0 50px -16px rgba(52,211,153,.35),0 0 40px -18px rgba(245,158,11,.25);margin:0 0 1.2rem}',
   '.sqx-partner .badge{display:inline-flex;align-items:center;gap:.35rem;font-size:.58rem;letter-spacing:.14em;text-transform:uppercase;color:#fde68a;',
   'border:1px solid rgba(252,211,77,.4);padding:.3rem .65rem;border-radius:999px;margin:0 0 .65rem;font-weight:700}',
   '.sqx-partner h3{margin:0 0 .45rem;font-family:Space Grotesk,sans-serif;font-size:1.35rem;color:#fff}',
   '.sqx-partner p{margin:0 0 .75rem;font-size:.95rem;line-height:1.55;color:#d1fae5}',
   '.sqx-partner .links{display:flex;flex-wrap:wrap;gap:.45rem}',
   '.sqx-event{cursor:pointer}',
   '.sqx-event.is-on{border-color:rgba(52,211,153,.7)!important;box-shadow:0 0 36px -12px rgba(52,211,153,.5)}',
   '.sqx-event .price{font-size:1.25rem;color:#fcd34d;font-weight:700;margin:.4rem 0;font-family:Space Grotesk,sans-serif}',
   '.sqx-builder{position:relative;padding:1.25rem;border-radius:1.4rem;border:1px solid rgba(52,211,153,.4);',
   'background:linear-gradient(155deg,rgba(6,40,32,.92),rgba(4,12,10,.96));overflow:hidden;margin:0 0 1.2rem;',
   'box-shadow:0 24px 60px -28px rgba(0,0,0,.9),0 0 50px -18px rgba(52,211,153,.3)}',
   '.sqx-builder h3{margin:0 0 .35rem;font-size:1.15rem;color:#ecfdf5;font-family:Space Grotesk,sans-serif}',
   '.sqx-builder .sub{margin:0 0 1rem;font-size:.85rem;color:rgba(209,250,229,.5)}',
   '.sqx-builder-grid{display:grid;gap:.85rem}',
   '@media(min-width:720px){.sqx-builder-grid{grid-template-columns:1fr 1fr 1fr}}',
   '.sqx-field label{display:block;font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:#6ee7b7;font-weight:700;margin-bottom:.4rem}',
   '.sqx-field input,.sqx-field select{width:100%;padding:.85rem 1rem;border-radius:.9rem;border:1px solid rgba(255,255,255,.14);',
   'background:rgba(0,0,0,.5);color:#fff;font-size:1rem;font-weight:600;font-family:inherit;outline:none}',
   '.sqx-field input:focus,.sqx-field select:focus{border-color:rgba(52,211,153,.65);box-shadow:0 0 0 3px rgba(52,211,153,.15)}',
   '.sqx-field .hint{font-size:.68rem;color:rgba(209,250,229,.4);margin-top:.3rem}',
   '.sqx-build-out{display:grid;grid-template-columns:1fr 1fr;gap:.55rem;margin-top:1rem}',
   '@media(min-width:700px){.sqx-build-out{grid-template-columns:repeat(4,1fr)}}',
   '.sqx-out{padding:.9rem .7rem;border-radius:1rem;background:rgba(0,0,0,.5);border:1px solid rgba(52,211,153,.22);text-align:center}',
   '.sqx-out b{display:block;font-size:clamp(1.3rem,3vw,1.65rem);color:#fde68a;font-family:Space Grotesk,sans-serif;font-weight:700;line-height:1.1}',
   '.sqx-out span{font-size:.6rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(209,250,229,.48);font-weight:600;margin-top:.3rem;display:block}',
   '.sqx-out.is-hero{border-color:rgba(52,211,153,.5);background:linear-gradient(160deg,rgba(6,48,36,.7),rgba(0,0,0,.55))}',
   '.sqx-out.is-hero b{color:#6ee7b7}',
   '.sqx-build-total{margin-top:.85rem;padding:1rem 1.1rem;border-radius:1.1rem;border:1px solid rgba(252,211,77,.35);',
   'background:linear-gradient(135deg,rgba(40,28,8,.45),rgba(0,0,0,.4));display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.75rem}',
   '.sqx-build-total b{font-size:clamp(1.4rem,3vw,1.85rem);color:#fde68a;font-family:Space Grotesk,sans-serif}',
   '.sqx-build-total span{font-size:.8rem;color:rgba(209,250,229,.55);max-width:22rem;line-height:1.4}',
   '.sqx-flow{display:flex;flex-wrap:wrap;align-items:center;gap:.4rem;margin:1rem 0 1.25rem}',
   '.sqx-flow span{display:inline-flex;align-items:center;padding:.4rem .7rem;border-radius:999px;border:1px solid rgba(52,211,153,.3);background:rgba(0,0,0,.35);font-size:.72rem;font-weight:700;color:#a7f3d0;letter-spacing:.04em}',
   '.sqx-flow .arr{border:0;background:transparent;color:rgba(52,211,153,.5);padding:0 .1rem}',
   '.sqx-prog a{display:block;text-decoration:none;color:inherit}',
   '.sqx-sticky{position:fixed;bottom:0;left:0;right:0;z-index:45;display:flex;gap:.35rem;',
   'padding:.55rem .65rem calc(.55rem + env(safe-area-inset-bottom));',
   'background:linear-gradient(180deg,transparent,rgba(3,20,15,.98) 32%);border-top:1px solid rgba(52,211,153,.22)}',
   '.sqx-sticky a,.sqx-sticky button{flex:1;text-align:center;font-size:.7rem;font-weight:700;padding:.72rem .25rem;border-radius:999px;min-height:46px;border:0;cursor:pointer;font-family:inherit}',
   '.sqx-sticky .pri{background:linear-gradient(135deg,#a7f3d0,#34d399);color:#03140f}',
   '.sqx-sticky .sec{background:rgba(0,0,0,.45);color:#a7f3d0;border:1px solid rgba(52,211,153,.35);text-decoration:none;display:flex;align-items:center;justify-content:center}',
   '@media(min-width:920px){.sqx-sticky{display:none}}',
   '@media(prefers-reduced-motion:reduce){.sqx-panel,.sqx-tab,.sqx-card{animation:none!important;transition:none!important}}'
  ].join('');
  document.head.appendChild(s);
 }

 function panelWhy() {
  return (
   '<section class="sqx-panel is-on" data-sqx="why">' +
   '<p class="sqx-kicker">01 · First principle</p>' +
   '<h2 class="sqx-h2">Warm care while they are here. Living trees when they are gone. A registry while they breathe.</h2>' +
   '<div class="sqx-vigil">' +
   '<p class="sqx-kicker" style="margin-bottom:.45rem">Vigil · everlasting memory</p>' +
   '<p>Beautiful souls deserve more than a fading post. They deserve a warm last chapter and a living name in the sky.</p>' +
   '<span>Sequoia is how memory stays kind: hospice dignity, a living registry, and Giant Sequoias planted with partners when love funds the ground.</span>' +
   '</div>' +
   '<div class="sqx-grab">' +
   '<p><strong>No soul in our programs is meant to vanish into silence.</strong> Sequoia Living Legacy is the sky layer across Shibahumanityhub: every animal can sit on a living registry. Trees are planted on funded life events with real planting friends. Hospice stays hospice. Forests stay forests. Together they become forever.</p>' +
   '</div>' +
   '<p class="sqx-lede">Barn campus is the warm floor. Golden Paws is the sofa. Healing Hearts is the visit. Sequoia is the living sky that remembers. Not greenwash. Not a second kennel. A legacy of care with partners who already put trees in the ground.</p>' +
   '<div class="sqx-grid g4" style="margin-bottom:1.2rem">' +
   '<div class="sqx-metric"><b>All</b><span>Programs can join registry</span></div>' +
   '<div class="sqx-metric"><b>4</b><span>Tree life-event types</span></div>' +
   '<div class="sqx-metric"><b>1</b><span>Primary planting partner design</span></div>' +
   '<div class="sqx-metric"><b>∞</b><span>Years a sequoia can stand</span></div>' +
   '</div>' +
   '<div class="sqx-grid g2">' +
   '<div class="sqx-card"><h3>What this is</h3><ul>' +
   '<li>Universal registry for SHH animals</li>' +
   '<li>Rainbow Bridge hospice + dignity care (program root)</li>' +
   '<li>Funded plantings with Shiba Sequoia Forest and friends</li>' +
   '<li>Public proofs when rails are live</li>' +
   '</ul></div>' +
   '<div class="sqx-card"><h3>What this is not</h3><ul>' +
   '<li>Not a free tree for every dog on day one without funding</li>' +
   '<li>Not a replacement for food, heat, or hospice meds</li>' +
   '<li>Not fake GPS or invented plant counts</li>' +
   '<li>Not a closed club. All walks of life welcome.</li>' +
   '</ul></div>' +
   '</div>' +
   '<p class="sqx-soul">Help them help us help the world. Animals get dignity. Partners get funding for the mission they already live. Earth gets giants that outlast us.</p>' +
   '<div class="sqx-row">' +
   '<button type="button" class="sqx-btn sqx-btn-em" data-sqx-go="events">Life events →</button>' +
   '<button type="button" class="sqx-btn sqx-btn-ghost" data-sqx-go="partner">Meet the planters</button>' +
   '<button type="button" class="sqx-btn sqx-btn-ghost" data-sqx-go="registry">Registry</button>' +
   '</div>' +
   '<p class="sqx-truth">Design studio only<span class="info-icon" data-term="design only" role="button" tabindex="0" aria-label="Plain language: design only">ⓘ</span>. No live plant counts claimed by SHH until partner proofs and funding rails are real.</p>' +
   '</section>'
  );
 }

 function panelRegistry() {
  return (
   '<section class="sqx-panel" data-sqx="registry">' +
   '<p class="sqx-kicker">02 · Universal registry</p>' +
   '<h2 class="sqx-h2">Every animal in our programs can belong to the forest story.</h2>' +
   '<p class="sqx-lede">Registry is free as design identity. A seat on the ledger. A name that does not get erased when a kennel page dies. Trees cost money and land. Registry costs honesty and care.</p>' +
   '<div class="sqx-flow" aria-hidden="true">' +
   '<span>Enter program</span><span class="arr">→</span>' +
   '<span>Registry seat</span><span class="arr">→</span>' +
   '<span>Life care</span><span class="arr">→</span>' +
   '<span>Funded tree events</span><span class="arr">→</span>' +
   '<span>Public forest proof</span>' +
   '</div>' +
   '<div class="sqx-grid g3">' +
   '<div class="sqx-card"><h3>Who is included</h3><p>Campus residents. Forever-home dogs. Therapy dogs. K9 pairs. Golden Years companions. Any animal under an SHH program path when the registry is live.</p></div>' +
   '<div class="sqx-card"><h3>What is stored</h3><p>Name or code, program home, life-event tree status, partner plant proof when funded. Privacy for people first. Dignity for dogs always.</p></div>' +
   '<div class="sqx-card"><h3>Soulbound path</h3><p>When rails allow, a permanent digital passport can hold the forest line. Not a toy NFT flip. A living record that cannot be sold off the soul.</p></div>' +
   '</div>' +
   '<div class="sqx-row">' +
   '<button type="button" class="sqx-btn sqx-btn-em" data-sqx-go="programs">Programs on the ledger →</button>' +
   '<button type="button" class="sqx-btn sqx-btn-ghost" data-sqx-go="hospice">Rainbow hospice</button>' +
   '</div>' +
   '</section>'
  );
 }

 function panelEvents() {
  var cards = EVENTS.map(function (e, i) {
   return (
    '<div class="sqx-card sqx-event' + (i === 3 ? ' is-on' : '') + '" data-event="' + e.id + '">' +
    '<div class="sqx-kicker" style="margin:0">' + (e.tree ? 'Tree event' : 'Identity') + '</div>' +
    '<h3 style="margin-top:.4rem">' + e.name + '</h3>' +
    (e.tree
     ? '<div class="price">' + money(e.usd) + '<span style="font-size:.75rem;color:#86efac"> design seed</span></div>'
     : '<div class="price" style="font-size:1rem;color:#6ee7b7">No tree fee</div>') +
    '<p>' + e.blurb + '</p>' +
    '<button type="button" class="sqx-btn sqx-btn-em" style="margin-top:.85rem;width:100%" data-sku="' + e.id + '">I stand with this</button>' +
    '</div>'
   );
  }).join('');
  return (
   '<section class="sqx-panel" data-sqx="events">' +
   '<p class="sqx-kicker">03 · Life events · when trees fire</p>' +
   '<h2 class="sqx-h2">Not a free tree for everyone on day one. Funded moments that mean something.</h2>' +
   '<p class="sqx-lede">This is how “all animals are part of Sequoia” stays true without becoming a lie. Everyone can be on the registry. Trees plant when seeds are funded and partners confirm the ground.</p>' +
   '<div class="sqx-grid g2">' + cards + '</div>' +
   '<div class="sqx-row">' +
   '<button type="button" class="sqx-btn sqx-btn-em" data-sqx-go="builder">Build a grove gift →</button>' +
   '<button type="button" class="sqx-btn sqx-btn-ghost" data-sqx-go="partner">Partner path</button>' +
   '</div>' +
   '<p class="sqx-truth">USD seeds are design targets for planning, not live invoices. Planting partners set real costs when rails open.</p>' +
   '</section>'
  );
 }

 function panelPartner() {
  return (
   '<section class="sqx-panel" data-sqx="partner">' +
   '<p class="sqx-kicker">04 · Planting partners</p>' +
   '<h2 class="sqx-h2">Help them help us help the world.</h2>' +
   '<p class="sqx-lede">We do not invent a forest from a press release. We fund friends who already plant. Primary design partner: Shiba Sequoia Forest. Capacity grows with more friends when live.</p>' +
   '<div class="sqx-partner">' +
   '<div class="badge">Primary partner design · plant proofs when live</div>' +
   '<h3>' + PARTNER.name + ' · ' + PARTNER.handle + '</h3>' +
   '<p>' + PARTNER.mission + '</p>' +
   '<p style="color:#fde68a;font-size:.9rem">' + PARTNER.publicClaim + '</p>' +
   '<div class="links">' +
   '<a class="sqx-btn sqx-btn-em" href="' + PARTNER.x + '" target="_blank" rel="noopener">Follow ' + PARTNER.handle + '</a>' +
   '<a class="sqx-btn sqx-btn-ghost" href="' + PARTNER.web + '" target="_blank" rel="noopener">shibasequoiaforest.com</a>' +
   '<a class="sqx-btn sqx-btn-ghost" href="' + PARTNER.linktree + '" target="_blank" rel="noopener">Linktree</a>' +
   '<a class="sqx-btn sqx-btn-ghost" href="mailto:' + PARTNER.email + '">Email partners</a>' +
   '</div>' +
   '</div>' +
   '<div class="sqx-grid g3">' +
   '<div class="sqx-card"><h3>What they bring</h3><p>Real planting culture. Sequoia care knowledge. Community, art, and music that gather people around the trees. Ground truth we can fund.</p></div>' +
   '<div class="sqx-card"><h3>What we bring</h3><p>Animal programs, sponsors, hospice path, barn cells, public story of each soul. Capital design that routes plant seeds to partners with receipts.</p></div>' +
   '<div class="sqx-card"><h3>Shared rule</h3><p>“Planted” only after partner confirms date and place when live. Until then: reserved design. Proof over promises.</p></div>' +
   '</div>' +
   '<div class="sqx-row">' +
   '<button type="button" class="sqx-btn sqx-btn-em" data-sku="partner-fund">Fund plantings to partners</button>' +
   '<button type="button" class="sqx-btn sqx-btn-ghost" data-sqx-go="builder">Grove builder</button>' +
   '</div>' +
   '</section>'
  );
 }

 function panelHospice() {
  return (
   '<section class="sqx-panel" data-sqx="hospice">' +
   '<p class="sqx-kicker">05 · Rainbow Bridge hospice</p>' +
   '<h2 class="sqx-h2">No senior dog crosses cold or forgotten.</h2>' +
   '<div class="sqx-vigil">' +
   '<p>This is sacred ground. Soft beds. Soft hands. Time that is not rushed.</p>' +
   '<span>When they leave, love does not end. A Bridge Tree stands so their name keeps breathing in the forest.</span>' +
   '</div>' +
   '<p class="sqx-lede">The original heart of this program stays. Warmth. Pain relief. Bucket-list joy. Soft hands. Then, when the time comes, a Giant Sequoia in their name through our planting friends.</p>' +
   '<div class="sqx-grid g2">' +
   '<div class="sqx-card"><h3>While they are still here</h3><ul>' +
   '<li>Comfort-first medical path (when funded)</li>' +
   '<li>Soft beds, heat, calm rooms</li>' +
   '<li>Human presence that does not rush the end</li>' +
   '<li>Bucket list moments they can still feel</li>' +
   '</ul></div>' +
   '<div class="sqx-card"><h3>When they leave</h3><ul>' +
   '<li>Bridge Tree seed funded</li>' +
   '<li>Partner plants with proof</li>' +
   '<li>Name on living forest ledger</li>' +
   '<li>Optional soulbound legacy record</li>' +
   '</ul></div>' +
   '</div>' +
   '<div class="sqx-grab" style="margin-top:1.1rem">' +
   '<p><strong>Hospice is not optional theater.</strong> A tree without comfort is empty symbolism. Comfort without memory is a story that dies twice. We do both.</p>' +
   '</div>' +
   '<div class="sqx-row">' +
   '<button type="button" class="sqx-btn sqx-btn-em" data-sku="bridge">Fund a Bridge Tree intent</button>' +
   '<button type="button" class="sqx-btn sqx-btn-ghost" data-sqx-go="builder">Build multi-tree gift</button>' +
   '<a class="sqx-btn sqx-btn-ghost" href="programs/rainbow-bridge-hospice-and-sequoia-legacy-program.html">Classic card</a>' +
   '</div>' +
   '</section>'
  );
 }

 function panelPrograms() {
  var cards = PROGRAM_LINKS.map(function (p) {
   return (
    '<a class="sqx-card sqx-prog" href="' + p.href + '">' +
    '<h3>' + p.name + ' →</h3>' +
    '<p>' + p.line + '</p>' +
    '</a>'
   );
  }).join('');
  return (
   '<section class="sqx-panel" data-sqx="programs">' +
   '<p class="sqx-kicker">06 · Whole flywheel on the forest</p>' +
   '<h2 class="sqx-h2">Barn cells. Therapy dogs. Forever sofas. One living sky.</h2>' +
   '<p class="sqx-lede">Sequoia does not compete with other programs. It crowns them. Every door below can feed the registry. Funded events feed the forest.</p>' +
   '<div class="sqx-grid g2">' + cards + '</div>' +
   '<div class="sqx-row" style="margin-top:1rem">' +
   '<a class="sqx-btn sqx-btn-em" href="barn-pods.html">Open Barn Campus</a>' +
   '<a class="sqx-btn sqx-btn-ghost" href="all-programs.html">All 30 programs</a>' +
   '</div>' +
   '</section>'
  );
 }

 function panelBuilder() {
  var opts = EVENTS.filter(function (e) {
   return e.tree;
  })
   .map(function (e) {
    return '<option value="' + e.id + '">' + e.name + ' · ' + money(e.usd) + ' design</option>';
   })
   .join('');
  return (
   '<section class="sqx-panel" data-sqx="builder">' +
   '<p class="sqx-kicker">07 · Grove builder</p>' +
   '<h2 class="sqx-h2">Count the trees. Feel the sky. Save the intent.</h2>' +
   '<p class="sqx-lede">Design math only. Pick an event type and how many souls. We estimate plant seeds for partners. Live costs and locations publish with proofs later.</p>' +
   '<div class="sqx-builder" id="sqx-builder">' +
   '<h3>Living forest planner</h3>' +
   '<p class="sub">When funded: money to planting partners first. Photos and places public. Names with consent.</p>' +
   '<div class="sqx-builder-grid">' +
   '<div class="sqx-field"><label for="sqx-type">Tree event</label>' +
   '<select id="sqx-type">' + opts + '</select></div>' +
   '<div class="sqx-field"><label for="sqx-count">Souls / trees</label>' +
   '<input id="sqx-count" type="number" inputmode="numeric" min="1" max="80" step="1" value="8" autocomplete="off">' +
   '<div class="hint">Example: one barn cell of 8</div></div>' +
   '<div class="sqx-field"><label for="sqx-label">Dedication (optional)</label>' +
   '<input id="sqx-label" type="text" maxlength="80" placeholder="e.g. Bay A · Cell 1 · forever soft" autocomplete="off">' +
   '<div class="hint">Public only with consent when live</div></div>' +
   '</div>' +
   '<div class="sqx-build-out">' +
   '<div class="sqx-out"><b id="sqx-o-trees">8</b><span>Trees design</span></div>' +
   '<div class="sqx-out"><b id="sqx-o-each">$85</b><span>Seed each</span></div>' +
   '<div class="sqx-out is-hero"><b id="sqx-o-total">$680</b><span>Partner plant seed total</span></div>' +
   '<div class="sqx-out"><b id="sqx-o-yrs">∞</b><span>Legacy horizon</span></div>' +
   '</div>' +
   '<div class="sqx-build-total">' +
   '<div><b id="sqx-o-label">8 × Welcome Tree</b><div style="font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(209,250,229,.45);margin-top:.25rem">Planning gift</div></div>' +
   '<span>Design only. Intent routes to partners when rails open.</span>' +
   '<button type="button" class="sqx-btn sqx-btn-em" id="sqx-save">Save grove intent</button>' +
   '</div>' +
   '</div>' +
   '<div class="sqx-row">' +
   '<button type="button" class="sqx-btn sqx-btn-ghost" data-sqx-go="stand">Stand with the forest</button>' +
   '<button type="button" class="sqx-btn sqx-btn-ghost" data-sqx-go="partner">Partners</button>' +
   '</div>' +
   '</section>'
  );
 }

 function panelStand() {
  return (
   '<section class="sqx-panel" data-sqx="stand">' +
   '<p class="sqx-kicker">08 · Stand with the forest</p>' +
   '<h2 class="sqx-h2">Hold a place in the sky while we build the rails.</h2>' +
   '<p class="sqx-lede">No fake checkout. Your intent lives on this device until funding and partner plantings are live. Then we turn yes into trees, care, and public proof.</p>' +
   '<div class="sqx-grid g2">' +
   '<div class="sqx-card"><h3>I want a Bridge Tree</h3><p>For a senior soul at the end of the road. Hospice dignity plus a sequoia that stands.</p>' +
   '<button type="button" class="sqx-btn sqx-btn-em" style="margin-top:.85rem;width:100%" data-sku="bridge">Save Bridge intent</button></div>' +
   '<div class="sqx-card"><h3>I want a Cell Grove</h3><p>Barn sponsorship meets forest. Fund a grove line for a cell of warm beds.</p>' +
   '<button type="button" class="sqx-btn sqx-btn-em" style="margin-top:.85rem;width:100%" data-sku="grove">Save Grove intent</button></div>' +
   '<div class="sqx-card"><h3>Fund partners directly path</h3><p>When live, plant seeds go to Shiba Sequoia Forest and planting friends first.</p>' +
   '<button type="button" class="sqx-btn sqx-btn-em" style="margin-top:.85rem;width:100%" data-sku="partner-fund">Save partner fund intent</button></div>' +
   '<div class="sqx-card"><h3>I just want the mission</h3><p>General Sequoia Living Legacy interest. We will remember who stood early.</p>' +
   '<button type="button" class="sqx-btn sqx-btn-em" style="margin-top:.85rem;width:100%" data-sku="general">Save general interest</button></div>' +
   '</div>' +
   '<div class="sqx-row">' +
   '<a class="sqx-btn sqx-btn-ghost" href="barn-pods.html">Barn Campus</a>' +
   '<a class="sqx-btn sqx-btn-ghost" href="golden-paws.html">Golden Paws</a>' +
   '<a class="sqx-btn sqx-btn-ghost" href="programs/rainbow-bridge-hospice-and-sequoia-legacy-program.html">Classic card</a>' +
   '<a class="sqx-btn sqx-btn-ghost" href="all-programs.html">All 30</a>' +
   '<a class="sqx-btn sqx-btn-ghost" href="' + PARTNER.x + '" target="_blank" rel="noopener">' + PARTNER.handle + '</a>' +
   '</div>' +
   '<p class="sqx-truth">USD figures are design targets. Partner plant counts are their public story until shared proof boards exist. We refuse empty glory.</p>' +
   '</section>'
  );
 }

 function renderBoard(host) {
  styles();
  host.innerHTML =
   '<div class="sqx-board" id="sqx-board">' +
   '<nav class="sqx-tabs" role="tablist" aria-label="Sequoia path">' +
   '<button type="button" class="sqx-tab is-on" data-sqx-tab="why" role="tab">Why</button>' +
   '<button type="button" class="sqx-tab" data-sqx-tab="registry" role="tab">Registry</button>' +
   '<button type="button" class="sqx-tab" data-sqx-tab="events" role="tab">Events</button>' +
   '<button type="button" class="sqx-tab" data-sqx-tab="partner" role="tab">Partners</button>' +
   '<button type="button" class="sqx-tab" data-sqx-tab="hospice" role="tab">Hospice</button>' +
   '<button type="button" class="sqx-tab" data-sqx-tab="programs" role="tab">Programs</button>' +
   '<button type="button" class="sqx-tab" data-sqx-tab="builder" role="tab">Builder</button>' +
   '<button type="button" class="sqx-tab" data-sqx-tab="stand" role="tab">Stand</button>' +
   '</nav>' +
   '<div class="sqx-panels">' +
   panelWhy() +
   panelRegistry() +
   panelEvents() +
   panelPartner() +
   panelHospice() +
   panelPrograms() +
   panelBuilder() +
   panelStand() +
   '</div></div>' +
   '<div class="sqx-sticky" aria-label="Quick">' +
   '<button type="button" class="pri" data-sqx-go="stand">Stand</button>' +
   '<button type="button" class="sec" data-sqx-go="partner">Partners</button>' +
   '<button type="button" class="sec" data-sqx-go="builder">Builder</button>' +
   '<a class="sec" href="barn-pods.html">Campus</a>' +
   '</div>';
  wire(host);
  wireBuilder();
 }

 function showPanel(id) {
  $$('.sqx-panel').forEach(function (p) {
   p.classList.toggle('is-on', p.getAttribute('data-sqx') === id);
  });
  $$('.sqx-tab').forEach(function (t) {
   var on = t.getAttribute('data-sqx-tab') === id;
   t.classList.toggle('is-on', on);
   t.setAttribute('aria-selected', on ? 'true' : 'false');
  });
  try {
   var activeTab = document.querySelector('.sqx-tab.is-on');
   if (activeTab && activeTab.scrollIntoView) {
    activeTab.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
   }
  } catch (e0) { /* ignore */ }
  try {
   var board = $('#sqx-board');
   /* Instant scroll on mobile avoids sticky+smooth flicker */
   var reduce = false;
   try {
    reduce = window.matchMedia && (
     window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
     window.matchMedia('(max-width: 899px)').matches
    );
   } catch (e1) { /* ignore */ }
   if (board) board.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  } catch (e) { /* ignore */ }
  if (id === 'builder') setTimeout(wireBuilder, 30);
 }

 function eventPrice(id) {
  for (var i = 0; i < EVENTS.length; i++) {
   if (EVENTS[i].id === id) return EVENTS[i];
  }
  return EVENTS[1];
 }

 function runBuilder() {
  var typeEl = document.getElementById('sqx-type');
  var countEl = document.getElementById('sqx-count');
  var labelEl = document.getElementById('sqx-label');
  if (!typeEl || !countEl) return;
  var ev = eventPrice(typeEl.value);
  var n = Math.max(1, Math.min(80, parseInt(countEl.value, 10) || 1));
  var total = ev.usd * n;
  var oTrees = document.getElementById('sqx-o-trees');
  var oEach = document.getElementById('sqx-o-each');
  var oTotal = document.getElementById('sqx-o-total');
  var oLabel = document.getElementById('sqx-o-label');
  if (oTrees) oTrees.textContent = String(n);
  if (oEach) oEach.textContent = money(ev.usd);
  if (oTotal) oTotal.textContent = money(total);
  if (oLabel) {
   var ded = (labelEl && labelEl.value.trim()) || '';
   oLabel.textContent = n + ' × ' + ev.name + (ded ? ' · ' + ded : '');
  }
 }

 function wireBuilder() {
  var typeEl = document.getElementById('sqx-type');
  var countEl = document.getElementById('sqx-count');
  var labelEl = document.getElementById('sqx-label');
  var save = document.getElementById('sqx-save');
  if (!typeEl) return;
  [typeEl, countEl, labelEl].forEach(function (el) {
   if (!el || el.getAttribute('data-sqx-bound') === '1') return;
   el.setAttribute('data-sqx-bound', '1');
   ['input', 'change', 'keyup'].forEach(function (ev) {
    el.addEventListener(ev, runBuilder);
   });
  });
  if (save && save.getAttribute('data-sqx-bound') !== '1') {
   save.setAttribute('data-sqx-bound', '1');
   save.addEventListener('click', function () {
    var ev = eventPrice(typeEl.value);
    var n = Math.max(1, Math.min(80, parseInt(countEl.value, 10) || 1));
    saveIntent('grove-builder', {
     sku: ev.id,
     trees: n,
     each: ev.usd,
     total: ev.usd * n,
     dedication: (labelEl && labelEl.value.trim()) || ''
    });
   });
  }
  runBuilder();
 }

 function wire(host) {
  $$('[data-sqx-tab]', host).forEach(function (btn) {
   btn.addEventListener('click', function () {
    showPanel(btn.getAttribute('data-sqx-tab'));
   });
  });
  $$('[data-sqx-go]', host).forEach(function (btn) {
   btn.addEventListener('click', function () {
    showPanel(btn.getAttribute('data-sqx-go'));
   });
  });
  document.querySelectorAll('.sqx-sticky [data-sqx-go]').forEach(function (btn) {
   btn.addEventListener('click', function () {
    showPanel(btn.getAttribute('data-sqx-go'));
   });
  });
  $$('[data-sku]', host).forEach(function (btn) {
   btn.addEventListener('click', function () {
    var sku = btn.getAttribute('data-sku');
    saveIntent('sponsor', { sku: sku });
   });
  });
  $$('.sqx-event', host).forEach(function (card) {
   card.addEventListener('click', function (e) {
    if (e.target && e.target.getAttribute && e.target.getAttribute('data-sku')) return;
    $$('.sqx-event', host).forEach(function (c) {
     c.classList.remove('is-on');
    });
    card.classList.add('is-on');
    var id = card.getAttribute('data-event');
    var sel = document.getElementById('sqx-type');
    if (sel && id && id !== 'registry') {
     sel.value = id;
     runBuilder();
    }
   });
  });
 }

 function boot() {
  var host = document.getElementById('sqx-experience');
  if (!host) return;
  renderBoard(host);
 }

 window.SHHSequoiaLegacy = {
  showPanel: showPanel,
  boot: boot
 };

 if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
 } else {
  boot();
 }
})();
