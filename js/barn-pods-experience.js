/**
 * Shiba Barn Campus · Corporate Pod Sponsorship (flagship)
 * Massive vision. Modular cells. No overpack.
 * Land → house → barn shell → pods → phases → expand the building.
 * First principles · density law · treasury rails · corporate pods.
 * Design only until funding, land, permits, staffing, and receipts are real.
 */
(function () {
 'use strict';

 var INTENT_KEY = 'shh_barn_pod_intents';

 /* ── Density & campus design floors (sanctuary, not warehouse) ──
  * Research baselines inform floors; we design ABOVE them.
  * USDA AWA / 9 CFR Part 3 · ASV shelter guidelines · shelter medicine
  * Alberta APA duty of care · senior sanctuary home-like models
  * Hard rule: open only what staff + reserve can love every day.
  */

 var POD = {
  code: 'SHH-POD-HOUSE-v1',
  minDogs: 5,
  maxDogs: 10,
  designDogs: 8,
  footprintM: '9.0 m × 6.0 m',
  indoorSqM: 54,
  runSqM: 72,
  isolationBays: 1,
  cameras: 6
 };

 /** Living dogs per acre — outdoor/yard pressure + septic/noise buffer (design).
  *  Not legal advice. Municipal zoning can be stricter.
  *  Indoor pod capacity is separate; acres protect outdoor life + setbacks.
  */
 var DENSITY = {
  /* acresPerLivingDog outdoor+buffer design range */
  minAcresPerDog: 0.12,
  comfortAcresPerDog: 0.2,
  premiumAcresPerDog: 0.35,
  /* absolute site floors */
  absoluteMinAcres: 2,
  flagshipStartAcres: 5,
  regionalCampusAcres: 10,
  megaCampusAcres: 20,
  /* built density inside barn: pods only, never free-for-all floor */
  maxPodsPhase1: 2,
  maxPodsPhase2: 4,
  maxPodsPhase3: 6,
  maxPodsPhase4: 8,
  dogsPerPodCap: 10,
  /* staff design: rough FTE share per open pod (day coverage + enrichment) */
  staffFtePerPod: 0.75,
  overnightShare: 'shared night protocol + on-call'
 };

 var CAMPUS_PHASES = [
  {
   id: 'p0',
   name: 'Phase 0 · Land + law',
   dogs: 0,
   pods: 0,
   acresHint: '2–5+ ac secure under LOI/lease/own',
   build: 'Survey, zoning path, soil/septic, access road, neighbour plan',
   who: 'Treasury + counsel',
   open: 'No dogs. Paper and dirt first.'
  },
  {
   id: 'p1',
   name: 'Phase 1 · Flagship open',
   dogs: '10–20',
   pods: 2,
   acresHint: '≥ 5 ac design target (comfort band)',
   build: 'Caretaker house · barn shell bay A · 2 identical pods · isolation · yard rotation',
   who: 'Treasury shell + 2 corporate pods',
   open: 'Only after open-gate checklist. Massive heart. Small doors.'
  },
  {
   id: 'p2',
   name: 'Phase 2 · Grow the barn',
   dogs: '20–40',
   pods: 4,
   acresHint: '≥ 5–8 ac (or add land)',
   build: 'Extend barn shell bay B · 2 more pods · med soft room · laundry scale-up',
   who: 'Treasury expansion + new sponsors',
   open: 'Staff FTE must rise with pods. No empty wings of chaos.'
  },
  {
   id: 'p3',
   name: 'Phase 3 · Regional campus',
   dogs: '40–60',
   pods: 6,
   acresHint: '≥ 8–12 ac comfort',
   build: 'Bay C · quiet service-retiree wing option · training/enrichment hall',
   who: 'Multi-sponsor + medical reserve',
   open: 'Specialized tracks. Still modular. Still SOP-bound.'
  },
  {
   id: 'p4',
   name: 'Phase 4 · Full modular mass',
   dogs: '60–80',
   pods: 8,
   acresHint: '≥ 12–20 ac premium band',
   build: 'Full barn length · optional second shell · backup power · public proof hub',
   who: 'Treasury backbone + full corporate constellation',
   open: 'Only if audits stay green for 12+ months at prior phase.'
  }
 ];

 var ACREAGE_TABLE = [
  { acres: 2, comfortDogs: 10, maxHard: 16, pods: '1–2', note: 'Micro site. Phase 1 only unless land expands.' },
  { acres: 5, comfortDogs: 25, maxHard: 40, pods: '2–4', note: 'Flagship start. Room for yards + setbacks + septic.' },
  { acres: 8, comfortDogs: 40, maxHard: 55, pods: '4–5', note: 'Phase 2–3 growth without stacking stress.' },
  { acres: 10, comfortDogs: 50, maxHard: 65, pods: '5–6', note: 'Regional campus design target.' },
  { acres: 15, comfortDogs: 65, maxHard: 85, pods: '6–8', note: 'Premium outdoor life + multi-yard rotation.' },
  { acres: 20, comfortDogs: 80, maxHard: 100, pods: '8', note: 'Mega campus ceiling before second site preferred.' }
 ];

 var TRACKS = [
  { id: 'senior', title: 'Senior retirement', body: 'Shelter seniors and soft medical. Quiet pods. High bedding + heat dignity.' },
  { id: 'service', title: 'Service retirees', body: 'Worked a life. Earn calm wing. Lower stimulation. Handler-aware handoffs.' },
  { id: 'deathrow', title: 'Death-row pull (time-boxed)', body: 'Emergency intake with isolation first. Not forever warehouse. Triage to pod, foster, or forever home path.' },
  { id: 'medical', title: 'Medical soft', body: 'Post-op and chronic seniors with staff capacity. Never exceed isolation + med room design.' }
 ];

 var MONEY_SPLIT = [
  { who: 'Treasury / mission capital', pays: 'Land (own or long lease), caretaker house, barn shell, utilities backbone, isolation, medical reserve, phase expansions' },
  { who: 'Corporate pod sponsors', pays: 'Pod fit-out kit, monthly care for 5–10 named dogs, enrichment share, name plate, story rights with consent' },
  { who: '$NIBBLES holders', pays: 'Belonging, circles, mission seat — not the dog’s dinner when markets dump' },
  { who: 'Stable care rails (when live)', pays: 'Food, vet, heat, staff wages in steady currency so charts never empty bowls' }
 ];

 var POD_TIERS = [
  {
   id: 'starter',
   name: 'Starter Pod',
   dogs: 5,
   monthlyUsd: 1250,
   capitalUsd: 42000,
   circle: 'Mercy',
   tag: 'First corporate yes',
   blurb: 'Five seniors. One identical pod cell inside the campus barn. Name plate. Soft stories with consent.'
  },
  {
   id: 'standard',
   name: 'Standard Pod',
   dogs: 8,
   monthlyUsd: 2800,
   capitalUsd: 58000,
   circle: 'Guardian',
   tag: 'Most companies land here',
   blurb: 'Eight dogs. Full pod kit + dual runs. Quarterly livestream. The backbone of campus revenue.'
  },
  {
   id: 'guardian',
   name: 'Guardian Pod',
   dogs: 10,
   monthlyUsd: 5000,
   capitalUsd: 72000,
   circle: 'Guardian+',
   tag: 'Named wing energy',
   blurb: 'Ten dogs at pod cap. Priority enrichment. Volunteer day path when funded and staffed.'
  },
  {
   id: 'eternal',
   name: 'Eternal Pod',
   dogs: 10,
   monthlyUsd: 10000,
   capitalUsd: 95000,
   circle: 'Eternal Guardian',
   tag: 'Legacy cell',
   blurb: 'Multi-year care reserve design. Public proof stack. Soulbound corporate attestation when rails live.'
  },
  {
   id: 'campus',
   name: 'Campus Founder',
   dogs: 0,
   monthlyUsd: 0,
   capitalUsd: 250000,
   circle: 'Treasury partner',
   tag: 'Land · shell · house',
   blurb: 'Not a dog count. Funds land path, barn shell bay, or caretaker house. The massive layer. Naming on campus, not overcrowding rights.'
  }
 ];

 var HOUSE_SPEC = {
  code: POD.code,
  footprintM: POD.footprintM,
  footprintFt: '29.5 ft × 19.7 ft',
  indoorSqM: POD.indoorSqM,
  indoorSqFt: 581,
  runSqM: POD.runSqM,
  runSqFt: 775,
  heightM: 3.0,
  maxDogs: POD.maxDogs,
  minDogs: POD.minDogs,
  bedsPerDog: 1,
  isolationBays: POD.isolationBays,
  cameras: POD.cameras,
  climate: 'Heat + cool + humidity control',
  floor: 'Sealed non-porous, 1–2% slope to trench drains',
  walls: 'Washable, impact-resistant, no exposed insulation',
  windows: 'Shatter-resistant, UV shade, cross-vent option',
  roof: 'Insulated metal or SIP, snow-load rated by region',
  power: 'Hardwired + battery backup for cameras/heat fail-safe',
  water: 'Potable + heated outdoor line in freeze zones',
  waste: 'Sealed waste path · municipal / septic as zoned'
 };

 var LAW_STACK = [
  {
   layer: '01 · First principles',
   title: 'Massive campus. Small cells. Dignity first.',
   body: 'Scale is acres, bays, and phases — not stuffing more dogs into the same air. A senior is not inventory. If growth outruns staff or reserve, growth stops.'
  },
  {
   layer: '02 · Federal / AWA-grade floors',
   title: 'Climate & space floors (design above)',
   body: 'USDA AWA / 9 CFR style windows for temperature and ventilation inform the kit. Aged and infirm dogs get warmer floors. We design larger than crate math because sanctuary is not a lab shipping box.'
  },
  {
   layer: '03 · ASV + shelter medicine',
   title: 'Double-compartment · drain · careful cohousing',
   body: 'Stand, lie, turn, walk. Dual indoor/outdoor. Cohousing by temperament, typically small groups. Noise and sanitation are design constraints.'
  },
  {
   layer: '04 · Canadian / Alberta duty of care',
   title: 'Animal Protection Act (and peers)',
   body: 'Adequate food, water, care when ill, heat/cold protection, shelter, ventilation, space. Municipal kennel/shelter licences and inspections still apply. Design to pass. Do not claim a permit until issued.'
  },
  {
   layer: '05 · Land law',
   title: 'Zoning · building · fire · waste · expand permits',
   body: 'Each barn bay extension is a new permit event. Identical pod kit. Local stamp. Setbacks and septic capacity gate living dog counts as hard as pod count.'
  },
  {
   layer: '06 · Density constitution',
   title: 'Acreage + pods + staff = legal open number',
   body: 'Living dogs opened ≤ min(pod seats, acreage comfort band, staff capacity, medical reserve). That formula is the product. Vanity max is not.'
  },
  {
   layer: '07 · Proof',
   title: 'Receipts or it did not happen',
   body: 'Occupancy, sanitation audits, climate logs, spend, phase gates. Public when rails live. Privacy for dogs and people always.'
  }
 ];

 var SOP_RULES = [
  {
   id: 'clean',
   title: 'Cleanliness (daily non-negotiable)',
   points: [
    'Morning full clean of each open pod before enrichment',
    'Spot-clean waste within 30 minutes staffed hours',
    'Chemical rotation with real contact time',
    'If staff smell ammonia at dog nose height, re-run clean + vent same day',
    'Food prep separated from waste path'
   ]
  },
  {
   id: 'safety',
   title: 'Safety (dogs + humans)',
   points: [
    'Double-gate runs; self-closing latches',
    'Isolation ready before any death-row or medical intake',
    'Fire/evac map per barn bay; drill log',
    'Two-person rule for high-risk moves',
    'Meds locked; trained handlers only'
   ]
  },
  {
   id: 'space',
   title: 'Spacious living (anti-overpack)',
   points: [
    'Pod cap 10 living dogs — never “just one more”',
    'New pod only when prior pods pass audit green',
    'Outdoor yard rotation; not one mud pit for the whole campus',
    'Quiet corners for anxious seniors',
    'Mobility path for carts and stiff hips'
   ]
  },
  {
   id: 'atmosphere',
   title: 'Atmosphere (the part that heals)',
   points: [
    'Home-like lounge, not prison rack',
    'Acoustic control so bark echo does not own the bay',
    'Natural light by day; warm dim nights',
    'Daily human contact logged per dog',
    'Enrichment scheduled — not optional'
   ]
  },
  {
   id: 'location',
   title: 'Land rules (every Shiba Barn campus)',
   points: [
    'Drained pad above seasonal water table',
    'Emergency vehicle access',
    'Noise buffer from highway when possible',
    'Secure perimeter of the whole campus',
    'Acreage band respected before phase-up'
   ]
  }
 ];

 var STANDARD_PACK = [
  { part: 'Barn shell bays', note: 'Expandable structure. Bay A first. Bay B/C bolt-on same engineering language.' },
  { part: 'Pod cell kit', note: 'Identical SHH-POD-HOUSE-v1 every time. Region only changes foundation and load stamps.' },
  { part: 'Outdoor runs', note: 'Same dual-run geometry. Fence material may swap for code.' },
  { part: 'Climate plant', note: 'Same setpoints. Equipment brand flexible.' },
  { part: 'Camera + network', note: 'Per-pod camera plan + campus privacy policy.' },
  { part: 'SOP binder', note: 'One constitution. Local phones fill blanks.' },
  { part: 'Phase gate', note: 'No next bay until staff, reserve, and audit pass.' },
  { part: 'Open checklist', note: 'Permits, insurance, vet, 14-day systems test — no dogs early.' }
 ];

 function $(sel, root) {
  return (root || document).querySelector(sel);
 }
 function $$(sel, root) {
  return Array.prototype.slice.call((root || document).querySelectorAll(sel));
 }

 function saveIntent(kind, detail) {
  var entry = {
   kind: kind || 'barn-campus',
   detail: detail || {},
   at: new Date().toISOString(),
   path: location.pathname || ''
  };
  try {
   var list = JSON.parse(localStorage.getItem(INTENT_KEY) || '[]');
   if (!Array.isArray(list)) list = [];
   list.push(entry);
   localStorage.setItem(INTENT_KEY, JSON.stringify(list.slice(-50)));
  } catch (e) { /* private mode */ }
  if (typeof window.sponsorProgram === 'function') {
   window.sponsorProgram('barn-campus-' + (detail && detail.tier ? detail.tier : kind));
  } else {
   toast('Intent saved on this device. When rails are live, this becomes real capital with receipts.');
  }
  return entry;
 }

 function toast(msg) {
  var el = document.createElement('div');
  el.setAttribute('role', 'status');
  el.style.cssText =
   'position:fixed;left:50%;bottom:1.4rem;transform:translateX(-50%);z-index:300;max-width:min(28rem,calc(100vw - 1.5rem));' +
   'padding:1rem 1.2rem;border-radius:1rem;background:rgba(12,10,6,.96);border:1px solid rgba(251,191,36,.5);' +
   'color:#fef3c7;font:600 .9rem/1.45 Inter,system-ui,sans-serif;text-align:center;box-shadow:0 16px 48px rgba(0,0,0,.55)';
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

 /** Density calculator */
 function calcDensity(acres, pods, dogsPerPod) {
  acres = Math.max(0, Number(acres) || 0);
  pods = Math.max(0, Math.min(12, Number(pods) || 0));
  dogsPerPod = Math.max(POD.minDogs, Math.min(POD.maxDogs, Number(dogsPerPod) || POD.designDogs));
  var seatDogs = pods * dogsPerPod;
  var comfortCap = acres <= 0 ? 0 : Math.floor(acres / DENSITY.comfortAcresPerDog);
  var hardCap = acres <= 0 ? 0 : Math.floor(acres / DENSITY.minAcresPerDog);
  var openDogs = Math.min(seatDogs, comfortCap);
  var hardDogs = Math.min(seatDogs, hardCap);
  var staffFte = Math.round(pods * DENSITY.staffFtePerPod * 10) / 10;
  var band =
   acres < DENSITY.absoluteMinAcres
    ? 'below absolute min — do not open living dogs'
    : openDogs < seatDogs
      ? 'acreage limits open dogs below pod seats — buy land or open fewer pods'
      : 'comfort band OK for seated pods';
  var phaseHint = 'Phase 0';
  if (pods >= 8) phaseHint = 'Phase 4 energy';
  else if (pods >= 6) phaseHint = 'Phase 3';
  else if (pods >= 4) phaseHint = 'Phase 2';
  else if (pods >= 2) phaseHint = 'Phase 1';
  else if (pods >= 1) phaseHint = 'Phase 1 light';
  return {
   acres: acres,
   pods: pods,
   dogsPerPod: dogsPerPod,
   seatDogs: seatDogs,
   comfortCap: comfortCap,
   hardCap: hardCap,
   openDogs: openDogs,
   hardDogs: hardDogs,
   staffFte: staffFte,
   band: band,
   phaseHint: phaseHint,
   acresPerOpen: openDogs > 0 ? Math.round((acres / openDogs) * 100) / 100 : 0
  };
 }

 function styles() {
  if ($('#bp-css')) return;
  var s = document.createElement('style');
  s.id = 'bp-css';
  s.textContent = [
   '.bp-board{--bp-gold:#fcd34d;--bp-amber:#f59e0b;--bp-em:#34d399;--bp-ink:#0c0a06;--bp-cream:#fff8e7;max-width:72rem;margin:0 auto;padding:0 1rem 6rem}',
   '.bp-tabs{display:flex;gap:.4rem;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;padding:.35rem 0 1rem;position:sticky;top:4.75rem;z-index:30;background:linear-gradient(180deg,rgba(12,10,6,.97),rgba(12,10,6,.92));backdrop-filter:blur(12px);border-bottom:1px solid rgba(252,211,77,.2)}',
   '.bp-tabs::-webkit-scrollbar{display:none}',
   '.bp-tab{flex:0 0 auto;padding:.65rem .9rem;border-radius:999px;border:1px solid rgba(255,255,255,.12);background:rgba(0,0,0,.35);color:rgba(255,248,231,.75);font-size:.74rem;font-weight:700;cursor:pointer;font-family:inherit;min-height:44px;white-space:nowrap}',
   '.bp-tab.is-on{background:linear-gradient(135deg,#fde68a,#f59e0b);color:#1a1200;border-color:transparent}',
   '.bp-panel{display:none;animation:bp-in .25s ease}',
   '.bp-panel.is-on{display:block}',
   '@keyframes bp-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}',
   '.bp-kicker{font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(252,211,77,.85);margin:0 0 .4rem;font-weight:700}',
   '.bp-h2{font-family:Space Grotesk,Inter,sans-serif;font-size:clamp(1.55rem,4vw,2.35rem);line-height:1.12;margin:0 0 .75rem;color:#fff;font-weight:700;letter-spacing:-.02em}',
   '.bp-lede{font-size:1.05rem;line-height:1.65;color:#e8e0d0;margin:0 0 1.25rem;max-width:44rem;font-weight:500}',
   '.bp-grid{display:grid;gap:.85rem}',
   '@media(min-width:720px){.bp-grid.g2{grid-template-columns:1fr 1fr}.bp-grid.g3{grid-template-columns:1fr 1fr 1fr}}',
   '.bp-card{border-radius:1.15rem;border:1px solid rgba(252,211,77,.28);background:rgba(20,16,8,.88);padding:1.15rem 1.2rem}',
   '.bp-card h3{margin:0 0 .45rem;font-size:1.05rem;color:#fde68a;font-weight:700}',
   '.bp-card p,.bp-card li{font-size:.95rem;line-height:1.6;color:#d6cbb8;margin:0}',
   '.bp-card ul{margin:.4rem 0 0;padding-left:1.1rem}',
   '.bp-card li{margin-bottom:.35rem}',
   '.bp-metric{text-align:center;padding:.9rem;border-radius:1rem;border:1px solid rgba(252,211,77,.25);background:rgba(0,0,0,.35)}',
   '.bp-metric b{display:block;font-size:1.35rem;color:#fde68a;font-family:Space Grotesk,sans-serif}',
   '.bp-metric span{font-size:.68rem;letter-spacing:.06em;text-transform:uppercase;color:rgba(255,248,231,.55)}',
   '.bp-table{width:100%;border-collapse:collapse;font-size:.88rem}',
   '.bp-table th,.bp-table td{text-align:left;padding:.55rem .45rem;border-bottom:1px solid rgba(255,255,255,.08);vertical-align:top}',
   '.bp-table th{color:#fde68a;font-weight:700;font-size:.72rem;letter-spacing:.06em;text-transform:uppercase}',
   '.bp-table td{color:#e4d9c6}',
   '.bp-btn{display:inline-flex;align-items:center;justify-content:center;gap:.4rem;padding:.85rem 1.25rem;border-radius:999px;font-weight:700;font-size:.9rem;border:0;cursor:pointer;font-family:inherit;min-height:48px;text-decoration:none}',
   '.bp-btn-gold{background:linear-gradient(135deg,#fde68a,#f59e0b);color:#1a1200}',
   '.bp-btn-ghost{background:rgba(0,0,0,.35);color:#fde68a;border:1px solid rgba(252,211,77,.4)}',
   '.bp-row{display:flex;flex-wrap:wrap;gap:.55rem;margin:1rem 0}',
   '.bp-truth{font-size:.78rem;line-height:1.5;color:rgba(255,248,231,.5);margin:1rem 0 0;max-width:42rem}',
   '.bp-law{border-left:3px solid var(--bp-gold);padding:.75rem 1rem;margin:0 0 .75rem;background:linear-gradient(90deg,rgba(245,158,11,.12),transparent)}',
   '.bp-law b{display:block;color:#fde68a;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;margin-bottom:.25rem}',
   '.bp-law strong{color:#fff;font-size:1rem}',
   '.bp-law p{margin:.35rem 0 0;color:#d6cbb8;font-size:.92rem;line-height:1.55}',
   '.bp-tier{cursor:pointer;transition:border-color .15s,transform .15s}',
   '.bp-tier:hover,.bp-tier.is-on{border-color:rgba(252,211,77,.7);transform:translateY(-2px)}',
   '.bp-tier .price{font-size:1.25rem;color:#fcd34d;font-weight:700;margin:.35rem 0}',
   '.bp-blueprint{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.72rem;line-height:1.5;color:#c9f0dd;background:rgba(0,20,16,.55);border:1px solid rgba(52,211,153,.25);border-radius:.9rem;padding:1rem;overflow-x:auto;white-space:pre}',
   '.bp-calc{display:grid;gap:.75rem;padding:1rem;border-radius:1.15rem;border:1px solid rgba(52,211,153,.35);background:rgba(4,20,16,.55)}',
   '@media(min-width:640px){.bp-calc-controls{display:grid;grid-template-columns:1fr 1fr 1fr;gap:.75rem}}',
   '.bp-calc label{display:block;font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:#6ee7b7;font-weight:700;margin-bottom:.35rem}',
   '.bp-calc input{width:100%;padding:.7rem .8rem;border-radius:.75rem;border:1px solid rgba(255,255,255,.12);background:rgba(0,0,0,.45);color:#fff;font-size:1rem;font-weight:600}',
   '.bp-calc-out{display:grid;grid-template-columns:1fr 1fr;gap:.55rem}',
   '@media(min-width:640px){.bp-calc-out{grid-template-columns:repeat(4,1fr)}}',
   '.bp-calc-out div{padding:.7rem;border-radius:.75rem;background:rgba(0,0,0,.4);border:1px solid rgba(252,211,77,.2);text-align:center}',
   '.bp-calc-out b{display:block;font-size:1.2rem;color:#fde68a}',
   '.bp-calc-out span{font-size:.62rem;letter-spacing:.06em;text-transform:uppercase;color:rgba(255,248,231,.5)}',
   '.bp-band{margin-top:.65rem;font-size:.9rem;line-height:1.5;color:#a7f3d0;font-weight:600}',
   '.bp-phase{position:relative;padding-left:1rem;border-left:2px solid rgba(252,211,77,.4);margin:0 0 1rem}',
   '.bp-sticky{position:fixed;bottom:0;left:0;right:0;z-index:40;display:flex;gap:.35rem;padding:.55rem .65rem calc(.55rem + env(safe-area-inset-bottom));background:linear-gradient(180deg,transparent,rgba(12,10,6,.97) 28%);border-top:1px solid rgba(252,211,77,.2)}',
   '.bp-sticky a,.bp-sticky button{flex:1;text-align:center;font-size:.68rem;font-weight:700;padding:.65rem .25rem;border-radius:999px;min-height:44px;border:0;cursor:pointer;font-family:inherit}',
   '.bp-sticky .pri{background:linear-gradient(135deg,#fde68a,#f59e0b);color:#1a1200}',
   '.bp-sticky .sec{background:rgba(0,0,0,.4);color:#fde68a;border:1px solid rgba(252,211,77,.35);text-decoration:none;display:flex;align-items:center;justify-content:center}',
   '@media(min-width:900px){.bp-sticky{display:none}}',
   '@media(prefers-reduced-motion:reduce){.bp-panel{animation:none}}'
  ].join('\n');
  document.head.appendChild(s);
 }

 function panelWhy() {
  return (
   '<section class="bp-panel is-on" data-bp="why">' +
   '<p class="bp-kicker">01 · Campus first principles</p>' +
   '<h2 class="bp-h2">Massive mercy. Modular cells. Never a warehouse of souls.</h2>' +
   '<p class="bp-lede">We are building a <strong style="color:#fde68a">Shiba Barn Campus</strong>: treasury land, a real house for humans who care, a huge heated barn shell that can grow bay by bay, and inside it — identical <strong style="color:#fde68a">pods of 5–10 dogs</strong>. That number is the healthy cell, not the mission ceiling. Fill the campus with pods. Do not overpack a pod.</p>' +
   '<div class="bp-grid g3" style="margin-bottom:1rem">' +
   '<div class="bp-metric"><b>5–10</b><span>Dogs per pod cell</span></div>' +
   '<div class="bp-metric"><b>2→8</b><span>Pods by phase</span></div>' +
   '<div class="bp-metric"><b>20–80</b><span>Design living dogs at full modular mass</span></div>' +
   '</div>' +
   '<div class="bp-grid g2">' +
   '<div class="bp-card"><h3>Bilyeu-clear problem</h3><p>Seniors, death-row dogs, and retired service dogs lose because capacity and money are not engineered. A paint day does not fix that. A campus with funded cells does.</p></div>' +
   '<div class="bp-card"><h3>Elon-systems scale</h3><p>Identical pods. Expandable barn. Phase gates. Copy-paste excellence. Growth is adding a bay and a staff line — not inventing a new chaos barn every year.</p></div>' +
   '<div class="bp-card"><h3>Vitalik-honest money</h3><p>Treasury builds land and shell. Corporates fund pods. Stable rails feed mouths. Tokens are belonging. Charts never decide who eats.</p></div>' +
   '<div class="bp-card"><h3>Stewardship heart</h3><p>Overpacking is not love. Presence is love. We go massive by repeating dignity, not by stacking fear.</p></div>' +
   '</div>' +
   '<div class="bp-row">' +
   '<button type="button" class="bp-btn bp-btn-gold" data-bp-go="campus">See the campus model →</button>' +
   '<button type="button" class="bp-btn bp-btn-ghost" data-bp-go="acres">Acreage calculator</button>' +
   '</div>' +
   '<p class="bp-truth">Design studio. No live campus or dog counts claimed until land, permits, staff, and funding are real.</p>' +
   '</section>'
  );
 }

 function panelCampus() {
  var blueprint =
   'SHIBA BARN CAMPUS  ·  expandable shell  ·  modular pods\n' +
   '┌─────────────────────────────────────────────────────┐\n' +
   '│  CARETAKER HOUSE          │  OPS · laundry · meds   │\n' +
   '│  (humans who stay)        │  isolation + intake     │\n' +
   '├────────── BAY A ──────────┼──────── BAY B (grow) ───┤\n' +
   '│  POD 1 (5–10)  POD 2      │  POD 3        POD 4     │\n' +
   '│  dual runs     dual runs  │  dual runs    dual runs  │\n' +
   '├────────── BAY C (later) ──┴─────────────────────────┤\n' +
   '│  POD 5–6 · quiet / service-retiree option           │\n' +
   '├────────── BAY D (full mass) ─────────────────────────┤\n' +
   '│  POD 7–8 · only after audits green 12+ months       │\n' +
   '└─────────────────────────────────────────────────────┘\n' +
   'YARDS: rotated grass/runs · not one mud pit for 80 dogs\n' +
   'RULE: openDogs = min(pod seats, acreage comfort, staff, reserve)';

  var phases = CAMPUS_PHASES.map(function (p) {
   return (
    '<div class="bp-phase bp-card" style="margin:0 0 .75rem">' +
    '<h3>' +
    p.name +
    '</h3>' +
    '<p><strong style="color:#fde68a">Dogs:</strong> ' +
    p.dogs +
    ' · <strong style="color:#fde68a">Pods:</strong> ' +
    p.pods +
    ' · <strong style="color:#fde68a">Land:</strong> ' +
    p.acresHint +
    '</p>' +
    '<p style="margin-top:.4rem">' +
    p.build +
    '</p>' +
    '<p style="margin-top:.4rem;color:#a7f3d0">' +
    p.who +
    ' — ' +
    p.open +
    '</p>' +
    '</div>'
   );
  }).join('');

  var tracks = TRACKS.map(function (t) {
   return '<div class="bp-card"><h3>' + t.title + '</h3><p>' + t.body + '</p></div>';
  }).join('');

  return (
   '<section class="bp-panel" data-bp="campus">' +
   '<p class="bp-kicker">02 · Campus architecture</p>' +
   '<h2 class="bp-h2">Huge barn. Small homes inside it. Build on as we grow.</h2>' +
   '<p class="bp-lede">The barn shell is allowed to be massive. The <em>living unit</em> stays a pod. When Phase 1 works, we bolt on Bay B — same engineering, same SOP — not a freestyle second universe.</p>' +
   '<div class="bp-blueprint" aria-label="Campus schematic">' +
   blueprint +
   '</div>' +
   '<div class="bp-grid g2" style="margin-top:1rem">' +
   '<div class="bp-card"><h3>What treasury builds</h3><ul>' +
   '<li>Land (own or long lease)</li>' +
   '<li>Caretaker / ops house</li>' +
   '<li>Heated barn shell + utilities</li>' +
   '<li>Isolation + medical backbone</li>' +
   '<li>Phase expansions of the building</li>' +
   '<li>Multi-year medical reserve</li>' +
   '</ul></div>' +
   '<div class="bp-card"><h3>What corporations fund</h3><ul>' +
   '<li>Each pod fit-out (identical kit)</li>' +
   '<li>Monthly care for 5–10 dogs</li>' +
   '<li>Name plate on that cell only</li>' +
   '<li>Enrichment + story rights with consent</li>' +
   '<li>Not the right to overfill or skip law</li>' +
   '</ul></div>' +
   '</div>' +
   '<h3 class="bp-h2" style="font-size:1.35rem;margin:1.5rem 0 .75rem">Growth phases</h3>' +
   phases +
   '<h3 class="bp-h2" style="font-size:1.35rem;margin:1.25rem 0 .75rem">Life tracks on campus</h3>' +
   '<div class="bp-grid g2">' +
   tracks +
   '</div>' +
   '<div class="bp-row">' +
   '<button type="button" class="bp-btn bp-btn-gold" data-bp-go="acres">Acreage vs animals →</button>' +
   '<button type="button" class="bp-btn bp-btn-ghost" data-bp-go="house">Pod cell blueprint</button>' +
   '</div>' +
   '</section>'
  );
 }

 function panelAcres() {
  var rows = ACREAGE_TABLE.map(function (r) {
   return (
    '<tr><td><strong>' +
    r.acres +
    ' ac</strong></td><td>' +
    r.comfortDogs +
    '</td><td>' +
    r.maxHard +
    '</td><td>' +
    r.pods +
    '</td><td>' +
    r.note +
    '</td></tr>'
   );
  }).join('');

  return (
   '<section class="bp-panel" data-bp="acres">' +
   '<p class="bp-kicker">03 · Acreage · density · no overpack</p>' +
   '<h2 class="bp-h2">How much land for how many souls?</h2>' +
   '<p class="bp-lede">Indoor pods set <strong style="color:#fde68a">seats</strong>. Acres set <strong style="color:#fde68a">outdoor life, septic, noise, and setbacks</strong>. Staff and medical reserve set whether those seats may open. We publish comfort bands so ambition never becomes cruelty.</p>' +
   '<div class="bp-calc" id="bp-calc">' +
   '<div class="bp-calc-controls">' +
   '<div><label for="bp-acres">Acres</label><input id="bp-acres" type="number" min="0" max="80" step="0.5" value="5"></div>' +
   '<div><label for="bp-pods">Open pods</label><input id="bp-pods" type="number" min="0" max="8" step="1" value="2"></div>' +
   '<div><label for="bp-dp">Dogs per pod</label><input id="bp-dp" type="number" min="5" max="10" step="1" value="8"></div>' +
   '</div>' +
   '<div class="bp-calc-out">' +
   '<div><b id="bp-o-seats">16</b><span>Pod seats</span></div>' +
   '<div><b id="bp-o-open">16</b><span>Comfort open dogs</span></div>' +
   '<div><b id="bp-o-hard">41</b><span>Hard acre ceiling*</span></div>' +
   '<div><b id="bp-o-staff">1.5</b><span>Design staff FTE</span></div>' +
   '</div>' +
   '<p class="bp-band" id="bp-o-band">comfort band OK for seated pods</p>' +
   '<p class="bp-truth" id="bp-o-phase">Phase hint: Phase 1 · ~0.2 ac/dog comfort · *hard ceiling is not a target</p>' +
   '</div>' +
   '<div class="bp-card" style="margin-top:1rem">' +
   '<h3>Design bands (not legal advice)</h3>' +
   '<table class="bp-table"><thead><tr><th>Acres</th><th>Comfort dogs</th><th>Hard max*</th><th>Pods</th><th>Note</th></tr></thead><tbody>' +
   rows +
   '</tbody></table>' +
   '<p style="margin-top:.75rem;font-size:.85rem;color:#a89b7e">*Hard max uses ~0.12 ac/living dog as a stress floor for outdoor/buffer math. Comfort uses ~0.2 ac/dog. Premium campuses aim ~0.35. Zoning, septic, and species mix can force lower. Second site preferred over crushing one parcel past 20 acres of pressure.</p>' +
   '</div>' +
   '<div class="bp-grid g2" style="margin-top:1rem">' +
   '<div class="bp-card"><h3>Formula we live by</h3><p><strong style="color:#fde68a">openDogs = min(pod seats, acreage comfort cap, staff capacity, medical reserve)</strong></p><p style="margin-top:.5rem">If any term is small, open dogs stay small. Growth means improving the small term — more land, more staff, more pods, more reserve — not ignoring it.</p></div>' +
   '<div class="bp-card"><h3>Why not one open floor of 80?</h3><p>Disease, fights, noise, and burnout. Massive scale is many calm homes under one roof, with yards that rotate and isolation that works. That is how you stay massive for decades.</p></div>' +
   '</div>' +
   '<div class="bp-row">' +
   '<button type="button" class="bp-btn bp-btn-gold" data-bp-go="money">Treasury vs corporate →</button>' +
   '<button type="button" class="bp-btn bp-btn-ghost" data-bp-go="campus">Back to campus</button>' +
   '</div>' +
   '</section>'
  );
 }

 function panelMoney() {
  var rows = MONEY_SPLIT.map(function (m) {
   return '<tr><th style="width:32%">' + m.who + '</th><td>' + m.pays + '</td></tr>';
  }).join('');
  return (
   '<section class="bp-panel" data-bp="money">' +
   '<p class="bp-kicker">04 · Capital architecture</p>' +
   '<h2 class="bp-h2">Treasury builds the mountain. Pods fund the homes on it.</h2>' +
   '<p class="bp-lede">Your instinct to have the treasury fund land, house, and a huge barn is strong — as the <strong style="color:#fde68a">backbone</strong>. Corporate pods then productize recurring care. That split keeps the campus alive when any single sponsor pauses.</p>' +
   '<div class="bp-card"><table class="bp-table"><tbody>' +
   rows +
   '</tbody></table></div>' +
   '<div class="bp-grid g2" style="margin-top:1rem">' +
   '<div class="bp-card"><h3>Why this beats “only a mega barn gift”</h3><ul>' +
   '<li>Shell without ops dies in year two</li>' +
   '<li>Pods create named accountability</li>' +
   '<li>Phase gates stop romantic overfill</li>' +
   '<li>Medical reserve is non-optional for seniors</li>' +
   '</ul></div>' +
   '<div class="bp-card"><h3>Why this beats “only foster forever”</h3><ul>' +
   '<li>Some dogs will never pass a home check</li>' +
   '<li>Death-row needs a real heated bed tonight</li>' +
   '<li>Campus is the permanent floor under the flywheel</li>' +
   '<li>Still send adoptable dogs out via Golden Paws paths</li>' +
   '</ul></div>' +
   '</div>' +
   '<div class="bp-row">' +
   '<button type="button" class="bp-btn bp-btn-gold" data-bp-go="sponsor">Sponsor a cell →</button>' +
   '<a class="bp-btn bp-btn-ghost" href="whitepaper.html#treasury-path">Treasury path</a>' +
   '</div>' +
   '</section>'
  );
 }

 function panelHouse() {
  var h = HOUSE_SPEC;
  var blueprint =
   'POD CELL  ' +
   h.code +
   '  ·  identical on every campus\n' +
   '┌──────────────────────────────────────┐\n' +
   '│ ENTRY AIRLOCK     │ MEDS / LAUNDRY   │\n' +
   '├─────────┬─────────┴──────────────────┤\n' +
   '│ LOUNGE  │ REST BAYS (beds 1–10)      │\n' +
   '│ home    │ soft light · real beds     │\n' +
   '├─────────┼────────────────────────────┤\n' +
   '│ ISOLATE │ DOG DOORS → RUN A / RUN B  │\n' +
   '└─────────┴────────────────────────────┘';

  return (
   '<section class="bp-panel" data-bp="house">' +
   '<p class="bp-kicker">05 · Pod cell · ' +
   h.code +
   '</p>' +
   '<h2 class="bp-h2">The cell stays 5–10. The campus gets huge.</h2>' +
   '<p class="bp-lede">Every corporate sponsor buys a cell, not a right to densify the barn. Same kit whether we are on Bay A of a 5-acre flagship or Bay D of a 20-acre regional campus.</p>' +
   '<div class="bp-blueprint">' +
   blueprint +
   '</div>' +
   '<div class="bp-grid g2" style="margin-top:1rem">' +
   '<div class="bp-card"><h3>Hard dimensions</h3>' +
   '<table class="bp-table"><tbody>' +
   '<tr><th>Footprint</th><td>' +
   h.footprintM +
   ' (' +
   h.footprintFt +
   ')</td></tr>' +
   '<tr><th>Indoor</th><td>~' +
   h.indoorSqM +
   ' m²</td></tr>' +
   '<tr><th>Runs</th><td>~' +
   h.runSqM +
   ' m² design</td></tr>' +
   '<tr><th>Capacity</th><td>' +
   h.minDogs +
   '–' +
   h.maxDogs +
   ' (behavior-capped)</td></tr>' +
   '<tr><th>Isolation</th><td>' +
   h.isolationBays +
   ' bay</td></tr>' +
   '<tr><th>Cameras</th><td>' +
   h.cameras +
   '</td></tr>' +
   '</tbody></table></div>' +
   '<div class="bp-card"><h3>Materials package</h3><ul>' +
   '<li>' +
   h.floor +
   '</li>' +
   '<li>' +
   h.walls +
   '</li>' +
   '<li>' +
   h.climate +
   '</li>' +
   '<li>' +
   h.roof +
   '</li>' +
   '<li>' +
   h.power +
   '</li>' +
   '<li>' +
   h.water +
   ' · ' +
   h.waste +
   '</li>' +
   '</ul></div>' +
   '</div>' +
   '<div class="bp-row">' +
   '<button type="button" class="bp-btn bp-btn-gold" data-bp-go="standard">Identical kit →</button>' +
   '<button type="button" class="bp-btn bp-btn-ghost" data-bp-go="rules">Rules</button>' +
   '</div>' +
   '</section>'
  );
 }

 function panelStandard() {
  var rows = STANDARD_PACK.map(function (r) {
   return '<tr><th style="width:28%">' + r.part + '</th><td>' + r.note + '</td></tr>';
  }).join('');
  return (
   '<section class="bp-panel" data-bp="standard">' +
   '<p class="bp-kicker">06 · Standardization + expand</p>' +
   '<h2 class="bp-h2">Bolt-on bays. Same language. Zero freestyle.</h2>' +
   '<p class="bp-lede">When we get bigger, we extend the building. We do not invent a new animal physics. Spare parts, training, and audits stay one system.</p>' +
   '<div class="bp-card"><table class="bp-table"><thead><tr><th>Package</th><th>Rule</th></tr></thead><tbody>' +
   rows +
   '</tbody></table></div>' +
   '<div class="bp-row">' +
   '<button type="button" class="bp-btn bp-btn-gold" data-bp-go="rules">Ops constitution →</button>' +
   '</div>' +
   '</section>'
  );
 }

 function panelRules() {
  var blocks = SOP_RULES.map(function (r) {
   var lis = r.points
    .map(function (p) {
     return '<li>' + p + '</li>';
    })
    .join('');
   return '<div class="bp-card"><h3>' + r.title + '</h3><ul>' + lis + '</ul></div>';
  }).join('');
  return (
   '<section class="bp-panel" data-bp="rules">' +
   '<p class="bp-kicker">07 · Rules (ops constitution)</p>' +
   '<h2 class="bp-h2">Clean. Safe. Spacious. Calm. Land-honest.</h2>' +
   '<p class="bp-lede">These bind every pod on every bay. The logo never outranks the binder.</p>' +
   '<div class="bp-grid g2">' +
   blocks +
   '</div>' +
   '<div class="bp-row">' +
   '<button type="button" class="bp-btn bp-btn-gold" data-bp-go="law">Law stack →</button>' +
   '</div>' +
   '<p class="bp-truth">Internal constitution + professional guidelines. Not a substitute for counsel, inspectors, or vets.</p>' +
   '</section>'
  );
 }

 function panelLaw() {
  var blocks = LAW_STACK.map(function (L) {
   return (
    '<div class="bp-law"><b>' +
    L.layer +
    '</b><strong>' +
    L.title +
    '</strong><p>' +
    L.body +
    '</p></div>'
   );
  }).join('');
  return (
   '<section class="bp-panel" data-bp="law">' +
   '<p class="bp-kicker">08 · Law &amp; density constitution</p>' +
   '<h2 class="bp-h2">If it cannot pass inspection, it does not open.</h2>' +
   '<p class="bp-lede">Campus ambition still kneels to zoning, building code, animal protection duty, and the open-gate checklist.</p>' +
   blocks +
   '<div class="bp-card"><h3>Open-gate checklist</h3><ul>' +
   '<li>Zoning + building/electrical/plumbing sign-off for this bay</li>' +
   '<li>Animal establishment licence if required</li>' +
   '<li>Insurance binders</li>' +
   '<li>Attending vet agreement</li>' +
   '<li>Staff for open pods only</li>' +
   '<li>Acreage comfort formula green</li>' +
   '<li>14-day empty systems test</li>' +
   '<li>Public truth page updated when live</li>' +
   '</ul></div>' +
   '<div class="bp-row">' +
   '<button type="button" class="bp-btn bp-btn-gold" data-bp-go="sponsor">Sponsor →</button>' +
   '</div>' +
   '<p class="bp-truth">Not legal advice. Each site hires local counsel.</p>' +
   '</section>'
  );
 }

 function panelSponsor() {
  var cards = POD_TIERS.map(function (t, i) {
   var price =
    t.monthlyUsd > 0
     ? '$' +
       t.monthlyUsd.toLocaleString() +
       '<span style="font-size:.85rem;color:#a89b7e"> / mo care design</span>'
     : '<span style="font-size:.95rem;color:#a7f3d0">Capital / multi-year design</span>';
   var dogsLine =
    t.dogs > 0
     ? t.dogs + ' seniors · kit ~$' + t.capitalUsd.toLocaleString()
     : 'Campus layer · from ~$' + t.capitalUsd.toLocaleString() + ' design';
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
    '<h3 style="margin-top:.35rem">' +
    t.name +
    '</h3>' +
    '<div class="price">' +
    price +
    '</div>' +
    '<p style="margin:0 0 .35rem;color:#fde68a;font-weight:600">' +
    dogsLine +
    '</p>' +
    '<p>' +
    t.blurb +
    '</p>' +
    '<button type="button" class="bp-btn bp-btn-gold" style="margin-top:.85rem;width:100%" data-sponsor="' +
    t.id +
    '">Stand as ' +
    t.name +
    '</button>' +
    '</div>'
   );
  }).join('');
  return (
   '<section class="bp-panel" data-bp="sponsor">' +
   '<p class="bp-kicker">09 · Corporate + campus founders</p>' +
   '<h2 class="bp-h2">Fund a cell. Or fund the mountain under every cell.</h2>' +
   '<p class="bp-lede">Pod sponsors make the homes real month after month. Campus founders help treasury place land, house, and barn shell so the mission can go massive without begging for a roof every winter.</p>' +
   '<div class="bp-grid g2">' +
   cards +
   '</div>' +
   '<div class="bp-row">' +
   '<button type="button" class="bp-btn bp-btn-gold" data-sponsor="general">Save interest</button>' +
   '<a class="bp-btn bp-btn-ghost" href="programs/corporate-barn-pod-sponsorship.html">Classic card</a>' +
   '<a class="bp-btn bp-btn-ghost" href="programs/shiba-barn-sanctuary-network.html">Barn Network</a>' +
   '<a class="bp-btn bp-btn-ghost" href="golden-paws.html">Golden Paws</a>' +
   '</div>' +
   '<p class="bp-truth">USD figures are design targets for planning, not live invoices.</p>' +
   '</section>'
  );
 }

 function renderBoard(host) {
  styles();
  host.innerHTML =
   '<div class="bp-board" id="bp-board">' +
   '<nav class="bp-tabs" role="tablist" aria-label="Barn Campus sections">' +
   '<button type="button" class="bp-tab is-on" data-bp-tab="why" role="tab">Why</button>' +
   '<button type="button" class="bp-tab" data-bp-tab="campus" role="tab">Campus</button>' +
   '<button type="button" class="bp-tab" data-bp-tab="acres" role="tab">Acreage</button>' +
   '<button type="button" class="bp-tab" data-bp-tab="money" role="tab">Treasury</button>' +
   '<button type="button" class="bp-tab" data-bp-tab="house" role="tab">Pod cell</button>' +
   '<button type="button" class="bp-tab" data-bp-tab="standard" role="tab">Expand</button>' +
   '<button type="button" class="bp-tab" data-bp-tab="rules" role="tab">Rules</button>' +
   '<button type="button" class="bp-tab" data-bp-tab="law" role="tab">Law</button>' +
   '<button type="button" class="bp-tab" data-bp-tab="sponsor" role="tab">Sponsor</button>' +
   '</nav>' +
   '<div class="bp-panels">' +
   panelWhy() +
   panelCampus() +
   panelAcres() +
   panelMoney() +
   panelHouse() +
   panelStandard() +
   panelRules() +
   panelLaw() +
   panelSponsor() +
   '</div></div>' +
   '<div class="bp-sticky" aria-label="Quick actions">' +
   '<button type="button" class="pri" data-bp-go="sponsor">Sponsor</button>' +
   '<button type="button" class="sec" data-bp-go="campus">Campus</button>' +
   '<button type="button" class="sec" data-bp-go="acres">Acres</button>' +
   '<a class="sec" href="all-programs.html">All 30</a>' +
   '</div>';
  wire(host);
  wireCalc();
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
  if (id === 'acres') wireCalc();
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

 function wireCalc() {
  var a = document.getElementById('bp-acres');
  var p = document.getElementById('bp-pods');
  var d = document.getElementById('bp-dp');
  if (!a || !p || !d) return;
  function run() {
   var r = calcDensity(a.value, p.value, d.value);
   var el = function (id) {
    return document.getElementById(id);
   };
   if (el('bp-o-seats')) el('bp-o-seats').textContent = String(r.seatDogs);
   if (el('bp-o-open')) el('bp-o-open').textContent = String(r.openDogs);
   if (el('bp-o-hard')) el('bp-o-hard').textContent = String(r.hardCap);
   if (el('bp-o-staff')) el('bp-o-staff').textContent = String(r.staffFte);
   if (el('bp-o-band')) el('bp-o-band').textContent = r.band;
   if (el('bp-o-phase')) {
    el('bp-o-phase').textContent =
     r.phaseHint +
     ' · ~' +
     r.acresPerOpen +
     ' ac per comfort-open dog · hard ceiling is not a target';
   }
  }
  a.oninput = p.oninput = d.oninput = run;
  run();
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
  HOUSE_SPEC: HOUSE_SPEC,
  POD_TIERS: POD_TIERS,
  CAMPUS_PHASES: CAMPUS_PHASES,
  ACREAGE_TABLE: ACREAGE_TABLE,
  DENSITY: DENSITY
 };

 if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
 } else {
  boot();
 }
})();
