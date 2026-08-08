/**
 * Shiba Barn Campus · electrifying flagship experience
 * Dark luxury · live density engine · modular mercy at scale
 * Human voice. No em dashes. Truth first until rails are live.
 */
(function () {
 'use strict';

 var INTENT_KEY = 'shh_barn_pod_intents';
 var calcBound = false;

 var DENSITY = {
  minAcresPerDog: 0.12,
  comfortAcresPerDog: 0.2,
  premiumAcresPerDog: 0.35,
  absoluteMinAcres: 2,
  staffFtePerPod: 0.75,
  podMin: 5,
  podMax: 10,
  podDesign: 8
 };

 var POD_TIERS = [
  { id: 'starter', name: 'Starter cell', dogs: 5, monthlyUsd: 1250, capitalUsd: 42000, circle: 'Mercy', tag: 'First yes', blurb: 'Five seniors. One named cell. Your plate on the door. Their last years stop feeling like a waiting room.' },
  { id: 'standard', name: 'Standard cell', dogs: 8, monthlyUsd: 2800, capitalUsd: 58000, circle: 'Guardian', tag: 'Most companies', blurb: 'Eight dogs. Dual runs. Quarterly window into real care. This is the backbone of a living campus.' },
  { id: 'guardian', name: 'Guardian cell', dogs: 10, monthlyUsd: 5000, capitalUsd: 72000, circle: 'Guardian+', tag: 'Full cell', blurb: 'Ten at the hard cap. Priority enrichment. Volunteer path when staff is real. Still never overcrowded.' },
  { id: 'eternal', name: 'Eternal cell', dogs: 10, monthlyUsd: 10000, capitalUsd: 95000, circle: 'Eternal', tag: 'Legacy care', blurb: 'Multi-year reserve design. Public proof when rails live. You fund permanence, not a press release.' },
  { id: 'campus', name: 'Campus founder', dogs: 0, monthlyUsd: 0, capitalUsd: 250000, circle: 'Treasury partner', tag: 'Land + shell', blurb: 'Not a dog count. Land path, barn bay, or caretaker house. The mountain under every warm bed.' }
 ];

 function $(sel, root) {
  return (root || document).querySelector(sel);
 }
 function $$(sel, root) {
  return Array.prototype.slice.call((root || document).querySelectorAll(sel));
 }

 function saveIntent(kind, detail) {
  var entry = { kind: kind || 'barn-campus', detail: detail || {}, at: new Date().toISOString(), path: location.pathname || '' };
  try {
   var list = JSON.parse(localStorage.getItem(INTENT_KEY) || '[]');
   if (!Array.isArray(list)) list = [];
   list.push(entry);
   localStorage.setItem(INTENT_KEY, JSON.stringify(list.slice(-50)));
  } catch (e) { /* private */ }
  if (typeof window.sponsorProgram === 'function') {
   window.sponsorProgram('barn-campus-' + ((detail && detail.tier) || kind));
  } else {
   toast('Saved on this device. When rails are live, intent becomes real capital with receipts.');
  }
  return entry;
 }

 function toast(msg) {
  var el = document.createElement('div');
  el.setAttribute('role', 'status');
  el.style.cssText =
   'position:fixed;left:50%;bottom:1.4rem;transform:translateX(-50%);z-index:320;max-width:min(28rem,calc(100vw - 1.5rem));' +
   'padding:1rem 1.2rem;border-radius:1rem;background:rgba(8,6,4,.97);border:1px solid rgba(251,191,36,.55);' +
   'color:#fef3c7;font:600 .9rem/1.45 Inter,system-ui,sans-serif;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.6)';
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

 function calcDensity(acres, pods, dogsPerPod) {
  acres = Math.max(0, parseFloat(acres) || 0);
  pods = Math.max(0, Math.min(12, parseInt(pods, 10) || 0));
  dogsPerPod = Math.max(DENSITY.podMin, Math.min(DENSITY.podMax, parseInt(dogsPerPod, 10) || DENSITY.podDesign));
  var seatDogs = pods * dogsPerPod;
  var comfortCap = acres <= 0 ? 0 : Math.floor(acres / DENSITY.comfortAcresPerDog);
  var hardCap = acres <= 0 ? 0 : Math.floor(acres / DENSITY.minAcresPerDog);
  var openDogs = Math.min(seatDogs, comfortCap);
  var staffFte = Math.round(pods * DENSITY.staffFtePerPod * 10) / 10;
  var band;
  if (acres < DENSITY.absoluteMinAcres) band = 'Below 2 acres design floor. Secure more land before living dogs.';
  else if (seatDogs === 0) band = 'No pods open yet. Shell can stand. Beds wait for funding and staff.';
  else if (openDogs < seatDogs) band = 'Land is the bottleneck. Open fewer pods or grow the parcel.';
  else band = 'Comfort band holds. Seats, yards, and staff can align.';
  var phase = 'Phase 0';
  if (pods >= 8) phase = 'Phase 4';
  else if (pods >= 6) phase = 'Phase 3';
  else if (pods >= 4) phase = 'Phase 2';
  else if (pods >= 1) phase = 'Phase 1';
  return {
   acres: acres,
   pods: pods,
   dogsPerPod: dogsPerPod,
   seatDogs: seatDogs,
   comfortCap: comfortCap,
   hardCap: hardCap,
   openDogs: openDogs,
   staffFte: staffFte,
   band: band,
   phase: phase,
   acresPerOpen: openDogs > 0 ? Math.round((acres / openDogs) * 100) / 100 : 0
  };
 }

 function animateNum(el, to) {
  if (!el) return;
  var target = Number(to);
  if (!isFinite(target)) {
   el.textContent = String(to);
   return;
  }
  var from = parseFloat(String(el.textContent).replace(/[^0-9.\-]/g, ''));
  if (!isFinite(from)) from = 0;
  if (from === target) {
   el.textContent = String(target);
   el.classList.remove('bp-num-flash');
   void el.offsetWidth;
   el.classList.add('bp-num-flash');
   return;
  }
  var start = performance.now();
  var dur = 320;
  function tick(now) {
   var t = Math.min(1, (now - start) / dur);
   var eased = 1 - Math.pow(1 - t, 3);
   var val = from + (target - from) * eased;
   el.textContent = target % 1 !== 0 ? (Math.round(val * 10) / 10).toString() : String(Math.round(val));
   if (t < 1) requestAnimationFrame(tick);
   else {
    el.textContent = String(target);
    el.classList.remove('bp-num-flash');
    void el.offsetWidth;
    el.classList.add('bp-num-flash');
   }
  }
  requestAnimationFrame(tick);
 }

 function styles() {
  if ($('#bp-css')) return;
  var s = document.createElement('style');
  s.id = 'bp-css';
  s.textContent = [
   '.bp-board{--g:#fcd34d;--a:#f59e0b;--e:#34d399;--c:#fff8e7;--m:#c4b5a0;max-width:74rem;margin:0 auto;padding:0 1rem 7rem;position:relative}',
   '.bp-tabs{display:flex;gap:.35rem;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;padding:.5rem 0 1rem;position:sticky;top:4.6rem;z-index:35;',
   'background:linear-gradient(180deg,rgba(6,4,2,.98) 0%,rgba(6,4,2,.92) 85%,transparent);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}',
   '.bp-tabs::-webkit-scrollbar{display:none}',
   '.bp-tab{flex:0 0 auto;padding:.7rem 1rem;border-radius:999px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);',
   'color:rgba(255,248,231,.72);font-size:.78rem;font-weight:700;cursor:pointer;font-family:inherit;min-height:46px;white-space:nowrap;',
   'transition:border-color .2s,background .2s,color .2s,box-shadow .2s,transform .15s}',
   '.bp-tab:hover{border-color:rgba(252,211,77,.45);color:#fff;transform:translateY(-1px)}',
   '.bp-tab.is-on{background:linear-gradient(135deg,#fde68a 0%,#f59e0b 55%,#d97706 100%);color:#140e00;border-color:transparent;',
   'box-shadow:0 0 28px -6px rgba(245,158,11,.75),0 8px 24px -10px rgba(0,0,0,.6)}',
   '.bp-panel{display:none;animation:bp-rise .38s cubic-bezier(.22,1,.36,1)}',
   '.bp-panel.is-on{display:block}',
   '@keyframes bp-rise{from{opacity:0;transform:translateY(14px) scale(.99)}to{opacity:1;transform:none}}',
   '@keyframes bp-pulse{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(52,211,153,.35)}50%{opacity:.85;box-shadow:0 0 24px 2px rgba(52,211,153,.2)}}',
   '@keyframes bp-shimmer{0%{background-position:0% 50%}100%{background-position:100% 50%}}',
   '@keyframes bp-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}',
   '@keyframes bp-numpop{0%{transform:scale(1)}40%{transform:scale(1.08);color:#fff}100%{transform:scale(1)}}',
   '.bp-num-flash{animation:bp-numpop .45s ease}',
   '.bp-kicker{font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(252,211,77,.88);margin:0 0 .5rem;font-weight:700}',
   '.bp-h2{font-family:Space Grotesk,Inter,sans-serif;font-size:clamp(1.7rem,4.2vw,2.55rem);line-height:1.08;margin:0 0 .85rem;color:#fff;font-weight:700;letter-spacing:-.03em;text-wrap:balance}',
   '.bp-lede{font-size:clamp(1.02rem,2.1vw,1.15rem);line-height:1.65;color:#e8dfd0;margin:0 0 1.35rem;max-width:40rem;font-weight:500}',
   '.bp-grid{display:grid;gap:.9rem}',
   '@media(min-width:720px){.bp-grid.g2{grid-template-columns:1fr 1fr}.bp-grid.g3{grid-template-columns:1fr 1fr 1fr}.bp-grid.g4{grid-template-columns:repeat(4,1fr)}}',
   '.bp-card{border-radius:1.25rem;border:1px solid rgba(252,211,77,.22);background:linear-gradient(155deg,rgba(28,22,12,.92),rgba(10,8,5,.94));',
   'padding:1.2rem 1.25rem;position:relative;overflow:hidden;transition:border-color .2s,transform .2s,box-shadow .25s}',
   '.bp-card::before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 80% 50% at 0% 0%,rgba(252,211,77,.08),transparent 55%);opacity:.9}',
   '.bp-card:hover{border-color:rgba(252,211,77,.48);transform:translateY(-2px);box-shadow:0 18px 40px -22px rgba(0,0,0,.85),0 0 40px -20px rgba(245,158,11,.35)}',
   '.bp-card > *{position:relative;z-index:1}',
   '.bp-card h3{margin:0 0 .45rem;font-size:1.08rem;color:#fde68a;font-weight:700;letter-spacing:-.01em}',
   '.bp-card p,.bp-card li{font-size:.97rem;line-height:1.62;color:#d9cebc;margin:0}',
   '.bp-card ul{margin:.45rem 0 0;padding-left:1.1rem}',
   '.bp-card li{margin-bottom:.4rem}',
   '.bp-bento{display:grid;gap:.75rem}',
   '@media(min-width:800px){.bp-bento{grid-template-columns:1.2fr 1fr 1fr;grid-template-rows:auto auto}.bp-bento .wide{grid-column:1/-1}.bp-bento .tall{grid-row:span 2}}',
   '.bp-metric{text-align:center;padding:1.05rem .85rem;border-radius:1.1rem;border:1px solid rgba(252,211,77,.28);',
   'background:linear-gradient(180deg,rgba(30,22,8,.9),rgba(8,6,4,.95));box-shadow:inset 0 1px 0 rgba(255,255,255,.04)}',
   '.bp-metric b{display:block;font-size:clamp(1.4rem,3vw,1.75rem);color:#fde68a;font-family:Space Grotesk,sans-serif;letter-spacing:-.02em;line-height:1.1}',
   '.bp-metric span{font-size:.65rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,248,231,.52);font-weight:600;margin-top:.35rem;display:block}',
   '.bp-table{width:100%;border-collapse:collapse;font-size:.88rem}',
   '.bp-table th,.bp-table td{text-align:left;padding:.6rem .5rem;border-bottom:1px solid rgba(255,255,255,.07);vertical-align:top}',
   '.bp-table th{color:#fde68a;font-weight:700;font-size:.7rem;letter-spacing:.07em;text-transform:uppercase}',
   '.bp-table td{color:#e4d9c6}',
   '.bp-btn{display:inline-flex;align-items:center;justify-content:center;gap:.4rem;padding:.9rem 1.3rem;border-radius:999px;font-weight:700;font-size:.92rem;',
   'border:0;cursor:pointer;font-family:inherit;min-height:50px;text-decoration:none;transition:transform .15s,box-shadow .2s}',
   '.bp-btn:active{transform:scale(.98)}',
   '.bp-btn-gold{background:linear-gradient(135deg,#fef3c7,#fcd34d 40%,#f59e0b);color:#140e00;box-shadow:0 0 32px -8px rgba(245,158,11,.7)}',
   '.bp-btn-gold:hover{box-shadow:0 0 40px -6px rgba(245,158,11,.9)}',
   '.bp-btn-ghost{background:rgba(0,0,0,.4);color:#fde68a;border:1px solid rgba(252,211,77,.42)}',
   '.bp-row{display:flex;flex-wrap:wrap;gap:.55rem;margin:1.15rem 0}',
   '.bp-truth{font-size:.8rem;line-height:1.5;color:rgba(255,248,231,.48);margin:1.1rem 0 0;max-width:40rem}',
   '.bp-law{border-left:3px solid var(--g);padding:.85rem 1.05rem;margin:0 0 .8rem;border-radius:0 1rem 1rem 0;',
   'background:linear-gradient(90deg,rgba(245,158,11,.14),rgba(245,158,11,.02))}',
   '.bp-law b{display:block;color:#fde68a;font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;margin-bottom:.3rem}',
   '.bp-law strong{color:#fff;font-size:1.02rem}',
   '.bp-law p{margin:.4rem 0 0;color:#d6cbb8;font-size:.94rem;line-height:1.55}',
   '.bp-tier{cursor:pointer}',
   '.bp-tier.is-on{border-color:rgba(252,211,77,.75)!important;box-shadow:0 0 36px -12px rgba(245,158,11,.55)}',
   '.bp-tier .price{font-size:1.35rem;color:#fcd34d;font-weight:700;margin:.4rem 0;font-family:Space Grotesk,sans-serif}',
   '.bp-blueprint{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.7rem;line-height:1.55;color:#b8f0d8;',
   'background:linear-gradient(160deg,rgba(0,24,18,.75),rgba(0,10,8,.9));border:1px solid rgba(52,211,153,.3);border-radius:1.1rem;',
   'padding:1.15rem;overflow-x:auto;white-space:pre;box-shadow:inset 0 0 40px rgba(16,185,129,.06)}',
   /* LIVE ENGINE */
   '.bp-engine{position:relative;padding:1.25rem;border-radius:1.4rem;border:1px solid rgba(52,211,153,.4);',
   'background:linear-gradient(155deg,rgba(4,28,22,.88),rgba(8,6,4,.95));overflow:hidden;',
   'box-shadow:0 0 0 1px rgba(52,211,153,.08),0 24px 60px -28px rgba(0,0,0,.9),0 0 50px -20px rgba(16,185,129,.25)}',
   '.bp-engine::after{content:"";position:absolute;top:-40%;right:-20%;width:55%;height:90%;pointer-events:none;',
   'background:radial-gradient(circle,rgba(52,211,153,.12),transparent 65%);animation:bp-float 8s ease-in-out infinite}',
   '.bp-engine-head{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:.75rem;margin-bottom:1rem;position:relative;z-index:1}',
   '.bp-engine-head h3{margin:0;font-size:1.2rem;color:#ecfdf5;font-weight:700}',
   '.bp-engine-live{display:inline-flex;align-items:center;gap:.4rem;font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;',
   'color:#6ee7b7;font-weight:700;padding:.35rem .7rem;border-radius:999px;border:1px solid rgba(52,211,153,.4);background:rgba(0,0,0,.35);animation:bp-pulse 2.4s ease infinite}',
   '.bp-engine-live i{width:7px;height:7px;border-radius:50%;background:#34d399;box-shadow:0 0 10px #34d399}',
   '.bp-calc-controls{display:grid;gap:.85rem;position:relative;z-index:1}',
   '@media(min-width:700px){.bp-calc-controls{grid-template-columns:1fr 1fr 1fr}}',
   '.bp-field label{display:block;font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:#6ee7b7;font-weight:700;margin-bottom:.4rem}',
   '.bp-field input{width:100%;padding:.85rem 1rem;border-radius:.9rem;border:1px solid rgba(255,255,255,.14);',
   'background:rgba(0,0,0,.5);color:#fff;font-size:1.15rem;font-weight:700;font-family:Space Grotesk,Inter,sans-serif;',
   'outline:none;transition:border-color .15s,box-shadow .15s;-moz-appearance:textfield}',
   '.bp-field input::-webkit-outer-spin-button,.bp-field input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}',
   '.bp-field input:focus{border-color:rgba(52,211,153,.65);box-shadow:0 0 0 3px rgba(52,211,153,.15)}',
   '.bp-field .hint{font-size:.68rem;color:rgba(255,248,231,.4);margin-top:.3rem}',
   '.bp-calc-out{display:grid;grid-template-columns:1fr 1fr;gap:.6rem;margin-top:1.1rem;position:relative;z-index:1}',
   '@media(min-width:700px){.bp-calc-out{grid-template-columns:repeat(4,1fr)}}',
   '.bp-out{padding:.9rem .7rem;border-radius:1rem;background:rgba(0,0,0,.5);border:1px solid rgba(252,211,77,.22);text-align:center}',
   '.bp-out b{display:block;font-size:clamp(1.35rem,3vw,1.7rem);color:#fde68a;font-family:Space Grotesk,sans-serif;font-weight:700;line-height:1.1}',
   '.bp-out span{font-size:.6rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,248,231,.48);font-weight:600;margin-top:.3rem;display:block}',
   '.bp-out.is-hero{border-color:rgba(52,211,153,.45);background:linear-gradient(160deg,rgba(6,40,32,.7),rgba(0,0,0,.55))}',
   '.bp-out.is-hero b{color:#6ee7b7}',
   '.bp-band{margin-top:.9rem;font-size:.95rem;line-height:1.5;color:#a7f3d0;font-weight:600;position:relative;z-index:1}',
   '.bp-phase-line{margin-top:.35rem;font-size:.8rem;color:rgba(255,248,231,.45);position:relative;z-index:1}',
   '.bp-phase{padding:1rem 1.15rem;border-radius:1.15rem;border:1px solid rgba(252,211,77,.22);',
   'background:linear-gradient(135deg,rgba(24,18,8,.9),rgba(8,6,4,.95));margin:0 0 .75rem;border-left:3px solid #f59e0b}',
   '.bp-phase h3{margin:0 0 .35rem;color:#fde68a;font-size:1.05rem}',
   '.bp-soul{font-size:clamp(1.1rem,2.2vw,1.25rem);line-height:1.55;color:#fef3c7;font-weight:500;max-width:36rem;margin:1.25rem 0 0;font-style:normal}',
   '.bp-sticky{position:fixed;bottom:0;left:0;right:0;z-index:45;display:flex;gap:.35rem;',
   'padding:.55rem .65rem calc(.55rem + env(safe-area-inset-bottom));',
   'background:linear-gradient(180deg,transparent,rgba(6,4,2,.98) 32%);border-top:1px solid rgba(252,211,77,.22)}',
   '.bp-sticky a,.bp-sticky button{flex:1;text-align:center;font-size:.7rem;font-weight:700;padding:.72rem .25rem;border-radius:999px;min-height:46px;border:0;cursor:pointer;font-family:inherit}',
   '.bp-sticky .pri{background:linear-gradient(135deg,#fde68a,#f59e0b);color:#140e00}',
   '.bp-sticky .sec{background:rgba(0,0,0,.45);color:#fde68a;border:1px solid rgba(252,211,77,.35);text-decoration:none;display:flex;align-items:center;justify-content:center}',
   '@media(min-width:920px){.bp-sticky{display:none}}',
   '@media(prefers-reduced-motion:reduce){.bp-panel,.bp-tab,.bp-card,.bp-engine::after,.bp-engine-live,.bp-num-flash{animation:none!important;transition:none!important}}'
  ].join('');
  document.head.appendChild(s);
 }

 /* ─── PANELS ─── */

 function panelWhy() {
  return (
   '<section class="bp-panel is-on" data-bp="why">' +
   '<p class="bp-kicker">01 · First principle</p>' +
   '<h2 class="bp-h2">Build the biggest warm place that never turns into a warehouse.</h2>' +
   '<p class="bp-lede">A dog on death row does not need your brand. They need heat, space, a clean floor, and a human who shows up tomorrow. We engineered a campus for that: treasury land, a real house for caretakers, a barn that grows bay by bay, and small cells of 5 to 10 so every soul still has a name.</p>' +
   '<div class="bp-grid g4" style="margin-bottom:1.1rem">' +
   '<div class="bp-metric"><b>5–10</b><span>Dogs per cell</span></div>' +
   '<div class="bp-metric"><b>2→8</b><span>Cells by phase</span></div>' +
   '<div class="bp-metric"><b>20–80</b><span>Campus design load</span></div>' +
   '<div class="bp-metric"><b>0 pack</b><span>Hard anti-crush rule</span></div>' +
   '</div>' +
   '<div class="bp-bento">' +
   '<div class="bp-card tall"><h3>The wound</h3><p>Seniors watch adopters walk past. Service dogs retire into nowhere. Death row is a clock. Corporate “impact days” paint a wall and leave. That is not infrastructure. That is theater.</p></div>' +
   '<div class="bp-card"><h3>The unit</h3><p>One cell. Five to ten dogs. Identical kit. Cleanable. Heated. Named. A company can fund it without guessing.</p></div>' +
   '<div class="bp-card"><h3>The scale</h3><p>Stack cells in a huge shell. Add Bay B when Phase 1 stays green. Massive campus. Small homes. Same physics every time.</p></div>' +
   '<div class="bp-card wide"><h3>The money split (so charts never empty bowls)</h3><p>Treasury places land, house, barn shell, medical reserve. Corporations fund cells month after month. $NIBBLES is belonging. Care rails aim for steady dollars when live. Hold the heart. Pay the life.</p></div>' +
   '</div>' +
   '<p class="bp-soul">If we cannot staff it, we do not open it. If the land is too tight, we open fewer beds. Love that cannot pass an audit is not love. It is noise.</p>' +
   '<div class="bp-row">' +
   '<button type="button" class="bp-btn bp-btn-gold" data-bp-go="acres">Run the density engine →</button>' +
   '<button type="button" class="bp-btn bp-btn-ghost" data-bp-go="campus">See the campus</button>' +
   '</div>' +
   '<p class="bp-truth">Design studio only. No live campus or dog counts claimed until land, permits, staff, and funding are real.</p>' +
   '</section>'
  );
 }

 function panelCampus() {
  var map =
   'SHIBA BARN CAMPUS\n' +
   '┌──────── house ────────┬──── ops / meds / isolation ────┐\n' +
   '│ caretakers who stay    │ intake first. pack never.      │\n' +
   '├──── BAY A (open) ─────┼──── BAY B (grow into) ─────────┤\n' +
   '│ cell 1   cell 2        │ cell 3   cell 4                │\n' +
   '│ dual runs dual runs    │ same kit. same SOP.            │\n' +
   '├──── BAY C / D later ──┴────────────────────────────────┤\n' +
   '│ cells 5–8 only after audits stay green                  │\n' +
   '└────────────────────────────────────────────────────────┘\n' +
   'YARDS ROTATE.  openDogs = min(seats, acres, staff, reserve)';

  return (
   '<section class="bp-panel" data-bp="campus">' +
   '<p class="bp-kicker">02 · Campus</p>' +
   '<h2 class="bp-h2">One roof that can grow. Rooms that never crush.</h2>' +
   '<p class="bp-lede">Think SpaceX factory logic on mercy: a shell you can extend, a cell you never freestyle, a checklist that beats excitement.</p>' +
   '<div class="bp-blueprint">' + map + '</div>' +
   '<div class="bp-grid g2" style="margin-top:1rem">' +
   '<div class="bp-phase"><h3>Phase 0 · Dirt and law</h3><p>Secure land. Zoning path. Septic. Access. Neighbours. Zero dogs.</p></div>' +
   '<div class="bp-phase"><h3>Phase 1 · Flagship open</h3><p>House + Bay A + 2 cells. About 10–20 living dogs. Proof before ego.</p></div>' +
   '<div class="bp-phase"><h3>Phase 2 · Grow the barn</h3><p>Bay B. 4 cells. 20–40 dogs. Staff line rises with the walls.</p></div>' +
   '<div class="bp-phase"><h3>Phase 3–4 · Regional mass</h3><p>6–8 cells. 40–80 dogs design. Second site beats crushing one parcel past honesty.</p></div>' +
   '</div>' +
   '<div class="bp-grid g2" style="margin-top:.5rem">' +
   '<div class="bp-card"><h3>Who lives here</h3><ul>' +
   '<li>Shelter seniors</li><li>Retired service partners</li><li>Death-row pulls (isolation first, time boxed)</li><li>Medical soft cases with real capacity</li>' +
   '</ul></div>' +
   '<div class="bp-card"><h3>Who leaves when they can</h3><p>Adoptable dogs still move through Golden Paws and forever homes. The campus is the permanent floor for the ones the world forgot. Not a life sentence for every nose.</p></div>' +
   '</div>' +
   '<div class="bp-row">' +
   '<button type="button" class="bp-btn bp-btn-gold" data-bp-go="acres">Density engine →</button>' +
   '<button type="button" class="bp-btn bp-btn-ghost" data-bp-go="money">Treasury split</button>' +
   '</div>' +
   '</section>'
  );
 }

 function panelAcres() {
  return (
   '<section class="bp-panel" data-bp="acres">' +
   '<p class="bp-kicker">03 · Live density engine</p>' +
   '<h2 class="bp-h2">Type a number. Watch capacity tell the truth.</h2>' +
   '<p class="bp-lede">Acres, cells, dogs per cell. The engine recalculates on every keystroke. Comfort band is about 0.2 acres per living dog. Hard stress floor is about 0.12. Hard is not a target.</p>' +
   '<div class="bp-engine" id="bp-calc">' +
   '<div class="bp-engine-head">' +
   '<div><h3>Campus capacity</h3><p style="margin:.25rem 0 0;font-size:.85rem;color:rgba(255,248,231,.45)">Not legal advice. Zoning can be stricter.</p></div>' +
   '<div class="bp-engine-live"><i></i> Live</div>' +
   '</div>' +
   '<div class="bp-calc-controls">' +
   '<div class="bp-field"><label for="bp-acres">Acres</label>' +
   '<input id="bp-acres" name="acres" type="number" inputmode="decimal" min="0" max="80" step="0.5" value="5" autocomplete="off">' +
   '<div class="hint">Flagship start often ~5</div></div>' +
   '<div class="bp-field"><label for="bp-pods">Open cells (pods)</label>' +
   '<input id="bp-pods" name="pods" type="number" inputmode="numeric" min="0" max="8" step="1" value="2" autocomplete="off">' +
   '<div class="hint">Phase 1 opens 2</div></div>' +
   '<div class="bp-field"><label for="bp-dp">Dogs per cell</label>' +
   '<input id="bp-dp" name="dogs" type="number" inputmode="numeric" min="5" max="10" step="1" value="8" autocomplete="off">' +
   '<div class="hint">Hard cap 10</div></div>' +
   '</div>' +
   '<div class="bp-calc-out">' +
   '<div class="bp-out"><b id="bp-o-seats">16</b><span>Cell seats</span></div>' +
   '<div class="bp-out is-hero"><b id="bp-o-open">16</b><span>Comfort open dogs</span></div>' +
   '<div class="bp-out"><b id="bp-o-hard">41</b><span>Hard acre ceiling</span></div>' +
   '<div class="bp-out"><b id="bp-o-staff">1.5</b><span>Design staff FTE</span></div>' +
   '</div>' +
   '<p class="bp-band" id="bp-o-band">Comfort band holds. Seats, yards, and staff can align.</p>' +
   '<p class="bp-phase-line" id="bp-o-phase">Phase 1 · ~0.31 ac per comfort-open dog</p>' +
   '</div>' +
   '<div class="bp-card" style="margin-top:1.1rem">' +
   '<h3>Land table (design)</h3>' +
   '<table class="bp-table"><thead><tr><th>Acres</th><th>Comfort</th><th>Hard max</th><th>Cells</th><th>Read</th></tr></thead><tbody>' +
   '<tr><td>2</td><td>10</td><td>16</td><td>1–2</td><td>Micro only</td></tr>' +
   '<tr><td>5</td><td>25</td><td>40</td><td>2–4</td><td>Flagship start</td></tr>' +
   '<tr><td>10</td><td>50</td><td>65</td><td>5–6</td><td>Regional</td></tr>' +
   '<tr><td>20</td><td>80</td><td>100</td><td>8</td><td>Mega; then second site</td></tr>' +
   '</tbody></table></div>' +
   '<div class="bp-row">' +
   '<button type="button" class="bp-btn bp-btn-gold" data-bp-go="money">Who pays what →</button>' +
   '<button type="button" class="bp-btn bp-btn-ghost" data-bp-go="sponsor">Sponsor a cell</button>' +
   '</div>' +
   '<p class="bp-truth">openDogs = min(cell seats, acre comfort, staff, medical reserve). Grow the small term. Never ignore it.</p>' +
   '</section>'
  );
 }

 function panelMoney() {
  return (
   '<section class="bp-panel" data-bp="money">' +
   '<p class="bp-kicker">04 · Capital</p>' +
   '<h2 class="bp-h2">Treasury builds the mountain. Cells fund the homes on it.</h2>' +
   '<p class="bp-lede">Your treasury idea is right when it buys permanence: dirt, roof, heat plant, medical reserve. Cells make the monthly mercy productized so one sponsor leaving does not empty the barn.</p>' +
   '<div class="bp-grid g2">' +
   '<div class="bp-card"><h3>Treasury / mission capital</h3><ul>' +
   '<li>Land own or long lease</li><li>Caretaker house</li><li>Barn shell and bay extensions</li><li>Isolation and utilities backbone</li><li>Multi-year medical reserve</li>' +
   '</ul></div>' +
   '<div class="bp-card"><h3>Corporate cell sponsors</h3><ul>' +
   '<li>Pod kit fit-out</li><li>Monthly care for 5–10 dogs</li><li>Name plate on that cell only</li><li>Story rights with consent</li><li>No right to overfill or skip law</li>' +
   '</ul></div>' +
   '<div class="bp-card"><h3>$NIBBLES</h3><p>Belonging. Circles. A seat at the mission. Not the dog’s dinner when markets dump.</p></div>' +
   '<div class="bp-card"><h3>Stable care rails</h3><p>When live: food, vet, heat, wages in steady currency. Proof over promises.</p></div>' +
   '</div>' +
   '<div class="bp-row">' +
   '<button type="button" class="bp-btn bp-btn-gold" data-bp-go="sponsor">Fund a cell or campus →</button>' +
   '<a class="bp-btn bp-btn-ghost" href="whitepaper.html#treasury-path">Treasury path</a>' +
   '</div>' +
   '</section>'
  );
 }

 function panelHouse() {
  return (
   '<section class="bp-panel" data-bp="house">' +
   '<p class="bp-kicker">05 · Cell kit · SHH-POD-HOUSE-v1</p>' +
   '<h2 class="bp-h2">Same cell on Bay A and Bay D. Zero freestyle.</h2>' +
   '<p class="bp-lede">~9×6 m living wing. Dual outdoor runs. Isolation bay. Washable floors with real drains. Heat and cool with margin for seniors. Six cameras. Privacy rules. Home lounge, not a rack of cages.</p>' +
   '<div class="bp-blueprint">' +
   'ENTRY AIRLOCK · MEDS / LAUNDRY\n' +
   'LOUNGE (home) · REST BAYS beds 1–10\n' +
   'ISOLATION · DOG DOORS → RUN A / RUN B\n' +
   'Cap 5–10. Behavior can force lower. Never higher.' +
   '</div>' +
   '<div class="bp-grid g3" style="margin-top:1rem">' +
   '<div class="bp-metric"><b>581</b><span>ft² indoor design</span></div>' +
   '<div class="bp-metric"><b>775</b><span>ft² runs design</span></div>' +
   '<div class="bp-metric"><b>10</b><span>Hard cell max</span></div>' +
   '</div>' +
   '<div class="bp-row">' +
   '<button type="button" class="bp-btn bp-btn-gold" data-bp-go="rules">Rules that bind →</button>' +
   '<button type="button" class="bp-btn bp-btn-ghost" data-bp-go="law">Law stack</button>' +
   '</div>' +
   '</section>'
  );
 }

 function panelRules() {
  return (
   '<section class="bp-panel" data-bp="rules">' +
   '<p class="bp-kicker">06 · Ops constitution</p>' +
   '<h2 class="bp-h2">The binder outranks the logo.</h2>' +
   '<div class="bp-grid g2">' +
   '<div class="bp-card"><h3>Clean</h3><ul><li>Full morning clean before enrichment</li><li>Waste handled fast while staffed</li><li>Ammonia at nose height means re-run same day</li></ul></div>' +
   '<div class="bp-card"><h3>Safe</h3><ul><li>Double-gate runs</li><li>Isolation before death-row or medical intake</li><li>Two-person high-risk moves</li><li>Meds locked</li></ul></div>' +
   '<div class="bp-card"><h3>Spacious</h3><ul><li>Cell cap 10. No “just one more.”</li><li>New cell only after prior audits green</li><li>Yard rotation, not one mud war</li></ul></div>' +
   '<div class="bp-card"><h3>Atmosphere</h3><ul><li>Home light and soft nights</li><li>Daily human touch logged</li><li>Enrichment is scheduled work, not optional vibes</li></ul></div>' +
   '</div>' +
   '<div class="bp-row"><button type="button" class="bp-btn bp-btn-gold" data-bp-go="law">Pass inspection path →</button></div>' +
   '<p class="bp-truth">Internal rules plus professional care standards. Not a substitute for counsel, inspectors, or vets.</p>' +
   '</section>'
  );
 }

 function panelLaw() {
  return (
   '<section class="bp-panel" data-bp="law">' +
   '<p class="bp-kicker">07 · Compliance path</p>' +
   '<h2 class="bp-h2">If inspectors cannot pass it, dogs do not move in.</h2>' +
   '<div class="bp-law"><b>01</b><strong>Dignity before headcount</strong><p>Scale is bays and land. Not stacking fear into shared air.</p></div>' +
   '<div class="bp-law"><b>02</b><strong>Climate and space floors</strong><p>AWA-grade temperature and ventilation inform the kit. We design above lab minimums for seniors.</p></div>' +
   '<div class="bp-law"><b>03</b><strong>Shelter medicine</strong><p>Double compartment. Drainable floors. Small cohousing. Noise is a design problem.</p></div>' +
   '<div class="bp-law"><b>04</b><strong>Duty of care</strong><p>Food, water, care when ill, heat and cold protection, shelter, ventilation, space. Local licences still apply.</p></div>' +
   '<div class="bp-law"><b>05</b><strong>Land law</strong><p>Every bay extension is a permit event. Septic and setbacks can cap dogs harder than dreams.</p></div>' +
   '<div class="bp-law"><b>06</b><strong>Density constitution</strong><p>openDogs = min(seats, acres, staff, reserve). Vanity max is not a plan.</p></div>' +
   '<div class="bp-card"><h3>Open gate</h3><ul>' +
   '<li>Zoning and building sign-off</li><li>Licence if required</li><li>Insurance</li><li>Vet agreement</li>' +
   '<li>Staff for open cells only</li><li>Acreage engine green</li><li>14-day empty systems test</li>' +
   '</ul></div>' +
   '<div class="bp-row"><button type="button" class="bp-btn bp-btn-gold" data-bp-go="sponsor">Stand with it →</button></div>' +
   '<p class="bp-truth">Not legal advice. Hire local counsel. Follow the inspector in the room.</p>' +
   '</section>'
  );
 }

 function panelSponsor() {
  var cards = POD_TIERS.map(function (t, i) {
   var price =
    t.monthlyUsd > 0
     ? '$' + t.monthlyUsd.toLocaleString() + '<span style="font-size:.8rem;color:#a89b7e"> / mo design</span>'
     : '<span style="font-size:.95rem;color:#6ee7b7">Campus capital design</span>';
   var line =
    t.dogs > 0
     ? t.dogs + ' dogs · kit ~$' + t.capitalUsd.toLocaleString()
     : 'From ~$' + t.capitalUsd.toLocaleString() + ' design';
   return (
    '<div class="bp-card bp-tier' +
    (i === 1 ? ' is-on' : '') +
    '" data-tier="' +
    t.id +
    '">' +
    '<div class="bp-kicker" style="margin:0">' +
    t.circle +
    ' · ' +
    t.tag +
    '</div>' +
    '<h3 style="margin-top:.4rem">' +
    t.name +
    '</h3>' +
    '<div class="price">' +
    price +
    '</div>' +
    '<p style="margin:0 0 .4rem;color:#fde68a;font-weight:600">' +
    line +
    '</p>' +
    '<p>' +
    t.blurb +
    '</p>' +
    '<button type="button" class="bp-btn bp-btn-gold" style="margin-top:.9rem;width:100%" data-sponsor="' +
    t.id +
    '">I want this</button>' +
    '</div>'
   );
  }).join('');
  return (
   '<section class="bp-panel" data-bp="sponsor">' +
   '<p class="bp-kicker">08 · Stand with them</p>' +
   '<h2 class="bp-h2">Fund a cell. Or fund the ground under every cell.</h2>' +
   '<p class="bp-lede">This is the first of its kind when it is real: modular campus mercy with public density honesty. Intent saves on this device until rails open.</p>' +
   '<div class="bp-grid g2">' +
   cards +
   '</div>' +
   '<div class="bp-row">' +
   '<button type="button" class="bp-btn bp-btn-gold" data-sponsor="general">Save my interest</button>' +
   '<a class="bp-btn bp-btn-ghost" href="programs/corporate-barn-pod-sponsorship.html">Classic card</a>' +
   '<a class="bp-btn bp-btn-ghost" href="golden-paws.html">Golden Paws</a>' +
   '<a class="bp-btn bp-btn-ghost" href="all-programs.html">All 30</a>' +
   '</div>' +
   '<p class="bp-truth">USD figures are design targets for planning, not live invoices.</p>' +
   '</section>'
  );
 }

 function renderBoard(host) {
  styles();
  host.innerHTML =
   '<div class="bp-board" id="bp-board">' +
   '<nav class="bp-tabs" role="tablist" aria-label="Campus path">' +
   '<button type="button" class="bp-tab is-on" data-bp-tab="why" role="tab">Why</button>' +
   '<button type="button" class="bp-tab" data-bp-tab="campus" role="tab">Campus</button>' +
   '<button type="button" class="bp-tab" data-bp-tab="acres" role="tab">Density</button>' +
   '<button type="button" class="bp-tab" data-bp-tab="money" role="tab">Money</button>' +
   '<button type="button" class="bp-tab" data-bp-tab="house" role="tab">Cell</button>' +
   '<button type="button" class="bp-tab" data-bp-tab="rules" role="tab">Rules</button>' +
   '<button type="button" class="bp-tab" data-bp-tab="law" role="tab">Law</button>' +
   '<button type="button" class="bp-tab" data-bp-tab="sponsor" role="tab">Stand</button>' +
   '</nav>' +
   '<div class="bp-panels">' +
   panelWhy() +
   panelCampus() +
   panelAcres() +
   panelMoney() +
   panelHouse() +
   panelRules() +
   panelLaw() +
   panelSponsor() +
   '</div></div>' +
   '<div class="bp-sticky" aria-label="Quick">' +
   '<button type="button" class="pri" data-bp-go="sponsor">Stand</button>' +
   '<button type="button" class="sec" data-bp-go="acres">Density</button>' +
   '<button type="button" class="sec" data-bp-go="campus">Campus</button>' +
   '<a class="sec" href="all-programs.html">All 30</a>' +
   '</div>';
  wire(host);
  wireCalc(true);
 }

 function showPanel(id) {
  $$('.bp-panel').forEach(function (p) {
   p.classList.toggle('is-on', p.getAttribute('data-bp') === id);
  });
  $$('.bp-tab').forEach(function (t) {
   t.classList.toggle('is-on', t.getAttribute('data-bp-tab') === id);
  });
  try {
   var board = $('#bp-board');
   if (board) board.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (e) { /* ignore */ }
  if (id === 'acres') {
   setTimeout(function () {
    wireCalc(true);
   }, 30);
  }
 }

 function wire(host) {
  $$('[data-bp-tab]', host).forEach(function (btn) {
   btn.addEventListener('click', function () {
    showPanel(btn.getAttribute('data-bp-tab'));
   });
  });
  $$('[data-bp-go]', host).forEach(function (btn) {
   btn.addEventListener('click', function () {
    showPanel(btn.getAttribute('data-bp-go'));
   });
  });
  document.querySelectorAll('.bp-sticky [data-bp-go]').forEach(function (btn) {
   btn.addEventListener('click', function () {
    showPanel(btn.getAttribute('data-bp-go'));
   });
  });
  $$('[data-sponsor]', host).forEach(function (btn) {
   btn.addEventListener('click', function () {
    saveIntent('sponsor', { tier: btn.getAttribute('data-sponsor') });
   });
  });
  $$('.bp-tier', host).forEach(function (card) {
   card.addEventListener('click', function (e) {
    if (e.target && e.target.getAttribute && e.target.getAttribute('data-sponsor')) return;
    $$('.bp-tier', host).forEach(function (c) {
     c.classList.remove('is-on');
    });
    card.classList.add('is-on');
   });
  });
 }

 function readNum(el, fallback) {
  if (!el) return fallback;
  var raw = String(el.value || '').trim().replace(/,/g, '');
  if (raw === '' || raw === '-' || raw === '.') return fallback;
  var n = parseFloat(raw);
  return isFinite(n) ? n : fallback;
 }

 function wireCalc(force) {
  var a = document.getElementById('bp-acres');
  var p = document.getElementById('bp-pods');
  var d = document.getElementById('bp-dp');
  if (!a || !p || !d) return;

  function run() {
   var r = calcDensity(readNum(a, 0), readNum(p, 0), readNum(d, DENSITY.podDesign));
   animateNum(document.getElementById('bp-o-seats'), r.seatDogs);
   animateNum(document.getElementById('bp-o-open'), r.openDogs);
   animateNum(document.getElementById('bp-o-hard'), r.hardCap);
   animateNum(document.getElementById('bp-o-staff'), r.staffFte);
   var band = document.getElementById('bp-o-band');
   var phase = document.getElementById('bp-o-phase');
   if (band) band.textContent = r.band;
   if (phase) {
    phase.textContent =
     r.phase +
     (r.openDogs > 0 ? ' · ~' + r.acresPerOpen + ' ac per comfort-open dog' : ' · seats waiting on land and staff') +
     ' · hard ceiling is not a target';
   }
  }

  var events = ['input', 'change', 'keyup', 'paste', 'blur'];
  [a, p, d].forEach(function (inp) {
   if (!inp) return;
   if (inp.getAttribute('data-bp-bound') === '1' && !force) return;
   inp.setAttribute('data-bp-bound', '1');
   events.forEach(function (ev) {
    inp.addEventListener(ev, function () {
     /* paste needs a tick for value to land */
     if (ev === 'paste') setTimeout(run, 0);
     else run();
    });
   });
  });
  run();
  calcBound = true;
 }

 function boot() {
  var host = document.getElementById('bp-experience');
  if (!host) return;
  renderBoard(host);
 }

 window.SHHBarnPods = {
  boot: boot,
  showPanel: showPanel,
  calcDensity: calcDensity,
  POD_TIERS: POD_TIERS,
  DENSITY: DENSITY
 };

 if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
 } else {
  boot();
 }
})();
