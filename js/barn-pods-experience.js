/**
 * Corporate Barn Pod Sponsorship · flagship experience
 * Standardized Pod Houses on every Shiba Barn land.
 * First principles · identical kit · law floors · SOP · corporate rails.
 * Design only until funding, land partners, permits, and receipts are real.
 */
(function () {
 'use strict';

 var INTENT_KEY = 'shh_barn_pod_intents';

 /* ── Research-informed design floors (sanctuary > lab minimums) ──
  * Baselines studied (not claimed as legal advice):
  * - USDA AWA / 9 CFR Part 3: space formula, 45–85°F windows, ventilation, drainage
  * - ASV Guidelines for Standards of Care in Animal Shelters (2nd ed.): stand/lie/turn/walk, cohousing 2–4, double-compartment ideal
  * - UW Shelter Medicine housing guidance: ~4' min width medium/large, dual compartment preferred
  * - Alberta Animal Protection Act: food, water, care when ill, heat/cold protection, shelter, ventilation, space
  * - Canadian shelter standards (SPCA-forward ASV): sanitation, noise, surfaces
  * - Senior sanctuary models (home-like lounges + outdoor runs + treatment + laundry)
  * Our Pod House is designed ABOVE these floors so every jurisdiction has headroom.
  */

 var POD_TIERS = [
  {
   id: 'starter',
   name: 'Starter Pod',
   dogs: 5,
   monthlyUsd: 1250,
   capitalUsd: 42000,
   circle: 'Mercy',
   tag: 'First corporate yes',
   blurb: 'Five seniors. One identical Pod House kit. Your company name on the house plate and soft stories when consent allows.'
  },
  {
   id: 'standard',
   name: 'Standard Pod',
   dogs: 8,
   monthlyUsd: 2800,
   capitalUsd: 58000,
   circle: 'Guardian',
   tag: 'Most companies land here',
   blurb: 'Eight seniors. Full house + dual outdoor runs. Quarterly team livestream. Vest embroidery optional.'
  },
  {
   id: 'guardian',
   name: 'Guardian Pod',
   dogs: 10,
   monthlyUsd: 5000,
   capitalUsd: 72000,
   circle: 'Guardian+',
   tag: 'Named barn wing',
   blurb: 'Ten seniors. Naming rights on the pod cluster. Volunteer day slots when funded. Priority enrichment budget.'
  },
  {
   id: 'eternal',
   name: 'Eternal Pod',
   dogs: 10,
   monthlyUsd: 10000,
   capitalUsd: 95000,
   circle: 'Eternal Guardian',
   tag: 'Legacy infrastructure',
   blurb: 'Gold tier. Multi-year care reserve design. Soulbound corporate attestation when rails live. Legacy wall + public proof stack.'
  }
 ];

 var HOUSE_SPEC = {
  code: 'SHH-POD-HOUSE-v1',
  footprintM: '9.0 m × 6.0 m',
  footprintFt: '29.5 ft × 19.7 ft',
  indoorSqM: 54,
  indoorSqFt: 581,
  runSqM: 72,
  runSqFt: 775,
  heightM: 3.0,
  maxDogs: 10,
  minDogs: 5,
  bedsPerDog: 1,
  humanDoor: 2,
  dogDoors: 4,
  isolationBays: 1,
  cameras: 6,
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
   title: 'Dignity before decoration',
   body: 'A senior dog is not inventory. The product is a warm, clean, spacious life with daily human contact and a real outdoor path. If a metric does not protect that, it is vanity.'
  },
  {
   layer: '02 · National / federal floors',
   title: 'AWA-grade climate & space (design floor)',
   body: 'USDA AWA / 9 CFR Part 3 is a floor for regulated facilities in the U.S.: indoor ambient must not sit below ~45°F / 7°C or above ~85°F / 29.5°C for more than four consecutive hours; cold-sensitive, aged, or infirm dogs get a warmer floor (~50°F / 10°C) unless the vet says otherwise; ventilation must cut odor, drafts, ammonia, and moisture. Space formulas exist. We design larger than formula minimums because sanctuary is not a shipping crate.'
  },
  {
   layer: '03 · Professional care standards',
   title: 'ASV + shelter medicine',
   body: 'Association of Shelter Veterinarians guidelines: primary enclosure must let a dog stand, lie comfortably, turn, walk several steps, and hold the tail erect. Double-compartment (indoor/outdoor) is ideal. Cohousing carefully limited (typically 2–4 compatible dogs). Surfaces drain. Noise and sanitation are first-class design constraints, not afterthoughts.'
  },
  {
   layer: '04 · Canadian / Alberta duty of care',
   title: 'Animal Protection Act (and peers)',
   body: 'In Alberta and similar Canadian frameworks, a person in charge of an animal must provide adequate food and water, care when wounded or ill, reasonable protection from injurious heat or cold, and adequate shelter, ventilation, and space. Municipal pet-establishment and kennel licences, inspections, and bylaws still apply. We design to pass them. We do not claim a permit until the jurisdiction issues one.'
  },
  {
   layer: '05 · Local land law',
   title: 'Zoning · building · fire · waste',
   body: 'Every Pod House sits only where zoning allows animal housing or agricultural/accessory use that the municipality accepts. Building permit, electrical, plumbing, fire egress, setbacks, and waste (septic or sewer) must clear before dogs move in. Identical kit. Local stamp. No freelancing the rules because a sponsor is eager.'
  },
  {
   layer: '06 · Insurance & liability',
   title: 'Coverage before open house',
   body: 'Property, liability, care-and-custody, volunteer accident, and vehicle coverage design. Corporate sponsors get naming and story rights, not ownership of dogs or land unless a separate legal instrument says so.'
  },
  {
   layer: '07 · Proof stack',
   title: 'Receipts or it did not happen',
   body: 'When rails are live: invoices, vet records (privacy-safe), occupancy logs, sanitation checklists, climate logs, and public monthly reports. $NIBBLES belonging is separate from USD stable care rails so a chart crash does not empty a food bin.'
  }
 ];

 var SOP_RULES = [
  {
   id: 'clean',
   title: 'Cleanliness (daily non-negotiable)',
   points: [
    'Morning full clean of indoor floors, runs, and food zones before enrichment block',
    'Spot-clean waste within 30 minutes during staffed hours; overnight check schedule posted',
    'Disinfect high-touch surfaces on a written chemical rotation (contact time honored)',
    'Laundry: bedding washed on schedule; soiled soft goods never left overnight unbagged',
    'Ammonia / odor: if staff smell it at dog nose height, ventilation and clean protocol re-run same day',
    'Food prep zone separate from waste path; bowls washed after every meal'
   ]
  },
  {
   id: 'safety',
   title: 'Safety (dogs + humans)',
   points: [
    'Double-gate entry on outdoor runs; self-closing latches; no climbable perimeter gaps',
    'Fencing height and bury/kick-board by region and dig risk',
    'No toxic plants in landscaped buffer; no exposed wires, sharp edges, or chewable foam',
    'Isolation bay ready for contagious or recovering dogs; PPE kit stocked',
    'Fire extinguisher, smoke/CO detection, posted evacuation map, drill log',
    'Staff never alone for high-risk moves; two-person rule for aggression flags',
    'Meds locked; controlled substances log if applicable; only trained handlers dose'
   ]
  },
  {
   id: 'space',
   title: 'Spacious living (sanctuary geometry)',
   points: [
    'Indoor rest zone sized so every dog has a dedicated bed + body clearance (no stacked crate culture)',
    'Outdoor run access daily weather-permitting; shade + wind break mandatory',
    'Cohousing only after temperament match; max group size by behavior, never by spreadsheet greed',
    'Quiet corner for anxious seniors; soft lighting option at night',
    'Wheelchair / cart access path for mobility dogs',
    'Human path width so staff can clean without forcing dogs into stress corners'
   ]
  },
  {
   id: 'atmosphere',
   title: 'Atmosphere (the part that heals)',
   points: [
    'Home-like furniture grade: low couches, rugs that wash, not sterile prison vibes',
    'Sound: acoustic panels or baffles where bark echo would spike stress',
    'Smell: fresh air exchange; no heavy perfume; enzyme cleaners over cover-up scents',
    'Light: natural light by day; warm dimmable LEDs by night; no all-night blast white',
    'Touch: daily human contact minimum (pets, brushes, calm talk) logged per dog',
    'Enrichment: scent work, gentle walks, puzzle feeders, sun naps — scheduled, not optional'
   ]
  },
  {
   id: 'location',
   title: 'Land & location rules (every Shiba Barn)',
   points: [
    'Pod House sits on drained, non-flooding pad above seasonal water table',
    'Quiet buffer from highway and industrial noise when site allows',
    'Emergency vehicle access within design response time of local services',
    'Secure perimeter of the greater barn property; pod is a home, not a free-roam farm',
    'Identical orientation logic: sun for winter warmth, shade for summer runs (region-tuned without changing kit)',
    'Neighbor and municipal relationship plan before occupancy'
   ]
  }
 ];

 var STANDARD_PACK = [
  { part: 'Structure kit', note: 'Same SIP / modular shell, openings, and load tables. Region only changes foundation and snow/wind stamps.' },
  { part: 'Interior package', note: 'Same bed count rails, wall protection, drains, isolation bay, meds cabinet, laundry hookups.' },
  { part: 'Outdoor runs', note: 'Same dual-run geometry and gates. Fence material may swap for local code (wood, mesh, composite) without changing layout.' },
  { part: 'Climate plant', note: 'Same target setpoints. Equipment brand may change; performance envelope does not.' },
  { part: 'Camera & network', note: 'Same six-camera plan + privacy policy. Stream public only when consent and security allow.' },
  { part: 'Signage & naming', note: 'Same plate size and placement. Corporate name goes here — not sprayed on dogs.' },
  { part: 'SOP binder', note: 'Same cleanliness, safety, enrichment, intake, and euthanasia ethics binder. Local phone numbers fill blanks.' },
  { part: 'Open checklist', note: 'No dog moves in until permit, insurance, staffing, and 14-day systems test pass.' }
 ];

 function $(sel, root) {
  return (root || document).querySelector(sel);
 }
 function $$(sel, root) {
  return Array.prototype.slice.call((root || document).querySelectorAll(sel));
 }

 function saveIntent(kind, detail) {
  var entry = {
   kind: kind || 'barn-pod',
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
   window.sponsorProgram('corporate-barn-pod-' + (detail && detail.tier ? detail.tier : kind));
  } else {
   toast('Intent saved on this device. When rails are live, this becomes real sponsorship with receipts.');
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
   setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 400);
  }, 4200);
 }

 function styles() {
  if ($('#bp-css')) return;
  var s = document.createElement('style');
  s.id = 'bp-css';
  s.textContent = [
   '.bp-board{--bp-gold:#fcd34d;--bp-amber:#f59e0b;--bp-em:#34d399;--bp-ink:#0c0a06;--bp-cream:#fff8e7;--bp-muted:#c9b896;max-width:72rem;margin:0 auto;padding:0 1rem 6rem}',
   '.bp-tabs{display:flex;gap:.4rem;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;padding:.35rem 0 1rem;position:sticky;top:4.75rem;z-index:30;background:linear-gradient(180deg,rgba(12,10,6,.97),rgba(12,10,6,.92));backdrop-filter:blur(12px);border-bottom:1px solid rgba(252,211,77,.2)}',
   '.bp-tabs::-webkit-scrollbar{display:none}',
   '.bp-tab{flex:0 0 auto;padding:.65rem .95rem;border-radius:999px;border:1px solid rgba(255,255,255,.12);background:rgba(0,0,0,.35);color:rgba(255,248,231,.75);font-size:.78rem;font-weight:700;cursor:pointer;font-family:inherit;min-height:44px;white-space:nowrap}',
   '.bp-tab.is-on{background:linear-gradient(135deg,#fde68a,#f59e0b);color:#1a1200;border-color:transparent}',
   '.bp-panel{display:none;animation:bp-in .25s ease}',
   '.bp-panel.is-on{display:block}',
   '@keyframes bp-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}',
   '.bp-kicker{font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(252,211,77,.85);margin:0 0 .4rem;font-weight:700}',
   '.bp-h2{font-family:Space Grotesk,Inter,sans-serif;font-size:clamp(1.55rem,4vw,2.35rem);line-height:1.12;margin:0 0 .75rem;color:#fff;font-weight:700;letter-spacing:-.02em}',
   '.bp-lede{font-size:1.05rem;line-height:1.65;color:#e8e0d0;margin:0 0 1.25rem;max-width:42rem;font-weight:500}',
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
   '.bp-truth{font-size:.78rem;line-height:1.5;color:rgba(255,248,231,.5);margin:1rem 0 0;max-width:40rem}',
   '.bp-law{border-left:3px solid var(--bp-gold);padding:.75rem 1rem;margin:0 0 .75rem;background:linear-gradient(90deg,rgba(245,158,11,.12),transparent)}',
   '.bp-law b{display:block;color:#fde68a;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;margin-bottom:.25rem}',
   '.bp-law strong{color:#fff;font-size:1rem}',
   '.bp-law p{margin:.35rem 0 0;color:#d6cbb8;font-size:.92rem;line-height:1.55}',
   '.bp-tier{cursor:pointer;transition:border-color .15s,transform .15s}',
   '.bp-tier:hover,.bp-tier.is-on{border-color:rgba(252,211,77,.7);transform:translateY(-2px)}',
   '.bp-tier .price{font-size:1.25rem;color:#fcd34d;font-weight:700;margin:.35rem 0}',
   '.bp-blueprint{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.78rem;line-height:1.55;color:#c9f0dd;background:rgba(0,20,16,.55);border:1px solid rgba(52,211,153,.25);border-radius:.9rem;padding:1rem;overflow-x:auto;white-space:pre}',
   '.bp-sticky{position:fixed;bottom:0;left:0;right:0;z-index:40;display:flex;gap:.4rem;padding:.55rem .75rem calc(.55rem + env(safe-area-inset-bottom));background:linear-gradient(180deg,transparent,rgba(12,10,6,.97) 28%);border-top:1px solid rgba(252,211,77,.2)}',
   '.bp-sticky a,.bp-sticky button{flex:1;text-align:center;font-size:.72rem;font-weight:700;padding:.7rem .3rem;border-radius:999px;min-height:44px;border:0;cursor:pointer;font-family:inherit}',
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
   '<p class="bp-kicker">01 · First principles</p>' +
   '<h2 class="bp-h2">Senior dogs do not need a press release. They need a house.</h2>' +
   '<p class="bp-lede">Most corporate “animal impact” is theater: a one-day paint day, a photo, a number that cannot be audited. We reject that. Corporate Barn Pod Sponsorship is infrastructure. A company funds a standardized Pod House and the monthly care of a small pack of senior shelter dogs who will live out their years with heat, space, cleanliness, and human hands.</p>' +
   '<div class="bp-grid g3" style="margin-bottom:1rem">' +
   '<div class="bp-metric"><b>5–10</b><span>Seniors per pod</span></div>' +
   '<div class="bp-metric"><b>1 kit</b><span>Identical on every land</span></div>' +
   '<div class="bp-metric"><b>Law first</b><span>Permits before paws</span></div>' +
   '</div>' +
   '<div class="bp-grid g2">' +
   '<div class="bp-card"><h3>The problem (Bilyeu-clear)</h3><p>Seniors fill shelters because “nobody wants the old ones.” Cold runs. Stress. Medical costs that scare adopters. Companies want purpose. Dogs want a couch and a warm floor. We connect those truths with a product you can inspect.</p></div>' +
   '<div class="bp-card"><h3>The mechanism (Vitalik-honest)</h3><p>Standardized house. Public SOP. Local compliance. Corporate capital for build + monthly care. $NIBBLES for belonging and story rights. Stable rails for food and vet when live. No fake on-chain dog GPS. Receipts or silence.</p></div>' +
   '<div class="bp-card"><h3>The scale (Elon-systems)</h3><p>One design. Many lands. Same Pod House on Barn A in Alberta and Barn B wherever zoning clears. Ops manuals copy-paste. Quality does not depend on who the sponsor is. Only the name plate changes.</p></div>' +
   '<div class="bp-card"><h3>The heart</h3><p>A dog who gave ten years to a family and got left at a gate still gets a last chapter that feels like home. That is not soft. That is the entire point of building anything here.</p></div>' +
   '</div>' +
   '<div class="bp-row">' +
   '<button type="button" class="bp-btn bp-btn-gold" data-bp-go="house">See the Pod House blueprint →</button>' +
   '<button type="button" class="bp-btn bp-btn-ghost" data-bp-go="sponsor">Corporate tiers</button>' +
   '</div>' +
   '<p class="bp-truth">Design studio language only until land, permits, staffing, charity rails, and funding are real. No live pods claimed today.</p>' +
   '</section>'
  );
 }

 function panelHouse() {
  var h = HOUSE_SPEC;
  var blueprint =
   'SHH-POD-HOUSE-v1  ·  identical kit every Shiba Barn land\n' +
   '┌──────────────────────────────────────────┐\n' +
   '│  ENTRY + BOOT ZONE     │  MEDS / LAUNDRY │\n' +
   '│  (double door airlock) │  (locked cabinet)│\n' +
   '├────────────┬───────────┴─────────────────┤\n' +
   '│ LOUNGE     │  REST BAYS (beds 1–10)       │\n' +
   '│ home-like  │  low sofas · washable rugs   │\n' +
   '│ acoustic   │  soft night lighting         │\n' +
   '├────────────┼─────────────────────────────┤\n' +
   '│ ISOLATION  │  DOG DOORS → RUN A / RUN B   │\n' +
   '│ 1 bay      │  dual compartment outdoor    │\n' +
   '└────────────┴─────────────────────────────┘\n' +
   'Outdoor: dual runs, shade + wind, double gates, drain slope\n' +
   'Cameras: 6 fixed (privacy policy · no exploitation of distress)';

  return (
   '<section class="bp-panel" data-bp="house">' +
   '<p class="bp-kicker">02 · Pod House · ' + h.code + '</p>' +
   '<h2 class="bp-h2">The house is the product. Same house. Every land.</h2>' +
   '<p class="bp-lede">Whether the acre already has a barn or we place a new pad, the living unit for sponsored seniors is the <strong style="color:#fde68a">identical Pod House kit</strong>. Local foundations and permits adapt. Geometry, capacity, drains, climate targets, and SOP do not freestyle.</p>' +
   '<div class="bp-blueprint" aria-label="Pod House schematic">' + blueprint + '</div>' +
   '<div class="bp-grid g2" style="margin-top:1rem">' +
   '<div class="bp-card"><h3>Hard dimensions</h3>' +
   '<table class="bp-table"><tbody>' +
   '<tr><th>Code</th><td>' + h.code + '</td></tr>' +
   '<tr><th>Footprint</th><td>' + h.footprintM + ' (' + h.footprintFt + ')</td></tr>' +
   '<tr><th>Indoor living</th><td>~' + h.indoorSqM + ' m² / ~' + h.indoorSqFt + ' ft²</td></tr>' +
   '<tr><th>Outdoor runs</th><td>~' + h.runSqM + ' m² / ~' + h.runSqFt + ' ft² combined design</td></tr>' +
   '<tr><th>Ceiling</th><td>~' + h.heightM + ' m clear staff height</td></tr>' +
   '<tr><th>Capacity</th><td>' + h.minDogs + '–' + h.maxDogs + ' senior dogs (behavior-capped)</td></tr>' +
   '<tr><th>Isolation</th><td>' + h.isolationBays + ' dedicated bay</td></tr>' +
   '<tr><th>Cameras</th><td>' + h.cameras + ' fixed positions</td></tr>' +
   '</tbody></table></div>' +
   '<div class="bp-card"><h3>Why these numbers</h3><p>AWA-style formulas are a legal floor for some regulated settings. ASV and shelter-medicine guidance push double-compartment housing, room to walk, and careful cohousing. Senior sanctuaries that work feel like homes: lounges, outdoor paths, treatment, laundry. We encode that as a kit so quality is not personality-dependent.</p>' +
   '<p style="margin-top:.75rem">Per-dog indoor rest is designed for real beds and body clearance — not stacked crates. Outdoor runs beat “minimum crate math” so seniors can stretch, sun, and choose distance from housemates.</p></div>' +
   '</div>' +
   '<div class="bp-card" style="margin-top:.85rem"><h3>Materials & systems (non-negotiable package)</h3>' +
   '<ul>' +
   '<li><strong style="color:#fde68a">Floor:</strong> ' + h.floor + '</li>' +
   '<li><strong style="color:#fde68a">Walls:</strong> ' + h.walls + '</li>' +
   '<li><strong style="color:#fde68a">Climate:</strong> ' + h.climate + ' — design targets stay inside AWA-grade windows with extra margin for aged dogs</li>' +
   '<li><strong style="color:#fde68a">Roof / structure:</strong> ' + h.roof + '</li>' +
   '<li><strong style="color:#fde68a">Power / water / waste:</strong> ' + h.power + ' · ' + h.water + ' · ' + h.waste + '</li>' +
   '<li><strong style="color:#fde68a">Windows:</strong> ' + h.windows + '</li>' +
   '</ul></div>' +
   '<div class="bp-row">' +
   '<button type="button" class="bp-btn bp-btn-gold" data-bp-go="standard">Identical kit checklist →</button>' +
   '<button type="button" class="bp-btn bp-btn-ghost" data-bp-go="rules">Rules &amp; SOPs</button>' +
   '</div>' +
   '<p class="bp-truth">Dimensions are design targets for SHH-POD-HOUSE-v1. Final engineered drawings get PE / local stamp per site. We do not occupy without permits.</p>' +
   '</section>'
  );
 }

 function panelStandard() {
  var rows = STANDARD_PACK.map(function (r) {
   return '<tr><th style="width:28%">' + r.part + '</th><td>' + r.note + '</td></tr>';
  }).join('');
  return (
   '<section class="bp-panel" data-bp="standard">' +
   '<p class="bp-kicker">03 · Standardization</p>' +
   '<h2 class="bp-h2">Copy-paste excellence. Zero freestyle barns.</h2>' +
   '<p class="bp-lede">If Barn North and Barn South look like different planets, dogs pay the price. Standardization is mercy at scale: training, inspections, sponsor reports, and spare parts all speak one language.</p>' +
   '<div class="bp-card"><table class="bp-table"><thead><tr><th>Package</th><th>What stays identical</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
   '<div class="bp-grid g2" style="margin-top:1rem">' +
   '<div class="bp-card"><h3>What may change by region</h3><ul>' +
   '<li>Foundation depth and frost line</li>' +
   '<li>Snow / wind / seismic load tables</li>' +
   '<li>HVAC brand and fuel type</li>' +
   '<li>Fence material if code demands it</li>' +
   '<li>Utility hookups and septic vs sewer</li>' +
   '</ul></div>' +
   '<div class="bp-card"><h3>What never changes</h3><ul>' +
   '<li>Indoor / outdoor dual-compartment logic</li>' +
   '<li>Max capacity and isolation bay</li>' +
   '<li>Drain slope and washable surfaces</li>' +
   '<li>Cleanliness + safety SOP binder</li>' +
   '<li>Open checklist before first dog</li>' +
   '<li>Truth: no public claim without proof</li>' +
   '</ul></div>' +
   '</div>' +
   '<div class="bp-row">' +
   '<button type="button" class="bp-btn bp-btn-gold" data-bp-go="rules">Living rules →</button>' +
   '<button type="button" class="bp-btn bp-btn-ghost" data-bp-go="law">Law stack</button>' +
   '</div>' +
   '</section>'
  );
 }

 function panelRules() {
  var blocks = SOP_RULES.map(function (r) {
   var lis = r.points.map(function (p) { return '<li>' + p + '</li>'; }).join('');
   return '<div class="bp-card" id="bp-rule-' + r.id + '"><h3>' + r.title + '</h3><ul>' + lis + '</ul></div>';
  }).join('');
  return (
   '<section class="bp-panel" data-bp="rules">' +
   '<p class="bp-kicker">04 · Rules &amp; regulations (ops constitution)</p>' +
   '<h2 class="bp-h2">Clean. Safe. Spacious. Calm. Located for real life.</h2>' +
   '<p class="bp-lede">These rules bind every Pod House on every Shiba Barn land. Staff sign them. Sponsors can request the checklist summary. Dogs live them.</p>' +
   '<div class="bp-grid g2">' + blocks + '</div>' +
   '<div class="bp-card" style="margin-top:1rem"><h3>Staffing model (design)</h3><p>Pods are not “drop food and leave.” Design assumes trained daily coverage, overnight check protocol, on-call vet relationship, and enrichment blocks on the board. Exact FTEs scale with site density and local labor law.</p></div>' +
   '<div class="bp-row">' +
   '<button type="button" class="bp-btn bp-btn-gold" data-bp-go="law">Pass the law stack →</button>' +
   '</div>' +
   '<p class="bp-truth">Internal constitution + professional guidelines. Not a substitute for licensed counsel, municipal inspectors, or attending veterinarians.</p>' +
   '</section>'
  );
 }

 function panelLaw() {
  var blocks = LAW_STACK.map(function (L) {
   return (
    '<div class="bp-law"><b>' + L.layer + '</b><strong>' + L.title + '</strong><p>' + L.body + '</p></div>'
   );
  }).join('');
  return (
   '<section class="bp-panel" data-bp="law">' +
   '<p class="bp-kicker">05 · Law &amp; compliance path</p>' +
   '<h2 class="bp-h2">If it cannot pass inspection, it does not open.</h2>' +
   '<p class="bp-lede">We design the Pod House and ops to clear animal-protection duties, shelter-care standards, and local building rules. This is a compliance path, not a claim that every jurisdiction has already approved us.</p>' +
   blocks +
   '<div class="bp-card"><h3>Open-gate checklist (before any senior moves in)</h3><ul>' +
   '<li>Zoning confirmation in writing</li>' +
   '<li>Building / electrical / plumbing permits closed or signed off</li>' +
   '<li>Animal establishment / kennel / shelter licence if required locally</li>' +
   '<li>Insurance binders active</li>' +
   '<li>Attending vet agreement</li>' +
   '<li>Staff trained on SOP binder + emergency drill logged</li>' +
   '<li>14-day empty-house systems test (climate, drains, cameras, water)</li>' +
   '<li>Public-facing truth page updated: this pod is real, here is proof</li>' +
   '</ul></div>' +
   '<div class="bp-row">' +
   '<button type="button" class="bp-btn bp-btn-gold" data-bp-go="sponsor">Corporate sponsorship →</button>' +
   '<a class="bp-btn bp-btn-ghost" href="whitepaper.html#treasury-path">Treasury path</a>' +
   '</div>' +
   '<p class="bp-truth">Not legal advice. Laws change. Each site hires local counsel and follows the inspector in the room.</p>' +
   '</section>'
  );
 }

 function panelSponsor() {
  var cards = POD_TIERS.map(function (t, i) {
   return (
    '<div class="bp-card bp-tier' + (i === 1 ? ' is-on' : '') + '" data-tier="' + t.id + '">' +
    '<div class="bp-kicker" style="margin:0">' + t.circle + ' · ' + t.tag + '</div>' +
    '<h3 style="margin-top:.35rem">' + t.name + '</h3>' +
    '<div class="price">$' + t.monthlyUsd.toLocaleString() + '<span style="font-size:.85rem;color:#a89b7e"> / mo care design</span></div>' +
    '<p style="margin:0 0 .35rem;color:#fde68a;font-weight:600">' + t.dogs + ' seniors · build kit ~$' + t.capitalUsd.toLocaleString() + ' design</p>' +
    '<p>' + t.blurb + '</p>' +
    '<button type="button" class="bp-btn bp-btn-gold" style="margin-top:.85rem;width:100%" data-sponsor="' + t.id + '">Stand as ' + t.name + '</button>' +
    '</div>'
   );
  }).join('');
  return (
   '<section class="bp-panel" data-bp="sponsor">' +
   '<p class="bp-kicker">06 · Corporate sponsorship</p>' +
   '<h2 class="bp-h2">Your company becomes a permanent warm chapter.</h2>' +
   '<p class="bp-lede">Capital builds the identical Pod House. Monthly support funds food, meds, staffing share, enrichment, and repairs. Naming rights are earned by care, not by a one-time check that evaporates.</p>' +
   '<div class="bp-grid g2">' + cards + '</div>' +
   '<div class="bp-card" style="margin-top:1rem"><h3>What sponsors receive (when funded &amp; live)</h3><ul>' +
   '<li>Name plate on the standardized house (agreed branding guidelines)</li>' +
   '<li>Quarterly impact packet: occupancy, health summary (privacy-safe), sanitation audit pass/fail</li>' +
   '<li>Optional livestream windows and scheduled team volunteer days</li>' +
   '<li>Story rights with consent — never exploit a dog’s worst day for clout</li>' +
   '<li>$NIBBLES circle recognition path for holders who amplify the pod mission</li>' +
   '</ul></div>' +
   '<div class="bp-card" style="margin-top:.85rem"><h3>What sponsors do not buy</h3><p>They do not buy the right to skip law, shrink space, cut cleaning, or treat seniors as mascots. The SOP outranks the logo. That is the product companies should want to be associated with.</p></div>' +
   '<div class="bp-row">' +
   '<button type="button" class="bp-btn bp-btn-gold" data-sponsor="general">Save corporate interest</button>' +
   '<a class="bp-btn bp-btn-ghost" href="programs/corporate-barn-pod-sponsorship.html">Classic program card</a>' +
   '<a class="bp-btn bp-btn-ghost" href="programs/shiba-barn-sanctuary-network.html">Shiba Barn Network</a>' +
   '</div>' +
   '<p class="bp-truth">USD figures are design targets for planning, not live invoices. Final contracts, charity receipts, and multi-year reserves publish when rails and counsel clear them.</p>' +
   '</section>'
  );
 }

 function panelLand() {
  return (
   '<section class="bp-panel" data-bp="land">' +
   '<p class="bp-kicker">07 · Land · barns · houses</p>' +
   '<h2 class="bp-h2">House on the land. Same house. Real living conditions.</h2>' +
   '<p class="bp-lede">Shiba Barn lands may already hold structures or start as raw pad. Either way, sponsored seniors live in the Pod House — climate-controlled, dual-run, SOP-bound — not in an improvised shed that “sort of works.”</p>' +
   '<div class="bp-grid g2">' +
   '<div class="bp-card"><h3>Existing structure path</h3><ul>' +
   '<li>Survey: can the identical kit integrate or sit adjacent?</li>' +
   '<li>If retrofit cannot meet drains, climate, isolation, and space — we place a new kit, not a compromise</li>' +
   '<li>Old building may become storage or staff support if safe</li>' +
   '</ul></div>' +
   '<div class="bp-card"><h3>Greenfield path</h3><ul>' +
   '<li>Site pick using location rules (drainage, noise, access, setbacks)</li>' +
   '<li>Pad + utilities + identical Pod House assembly</li>' +
   '<li>Perimeter, cameras, signage, open checklist</li>' +
   '</ul></div>' +
   '<div class="bp-card"><h3>Atmosphere test</h3><p>Before occupancy: staff sleep-in or overnight observation, sound check, odor check, dog-door function, emergency light test. If it feels like a warehouse, it fails. If it feels like a home that can be cleaned hard, it passes.</p></div>' +
   '<div class="bp-card"><h3>Linked programs</h3><p>Barn Pods sit inside the wider <a href="programs/shiba-barn-sanctuary-network.html" style="color:#6ee7b7">Shiba Barn Sanctuary Network</a>. Seniors may also touch <a href="golden-paws.html" style="color:#fcd34d">Golden Paws</a> (forever homes) or hospice paths when that is the kinder truth. Pods are living retirement infrastructure, not a marketing warehouse.</p></div>' +
   '</div>' +
   '<div class="bp-row">' +
   '<button type="button" class="bp-btn bp-btn-gold" data-bp-go="sponsor">Fund a pod</button>' +
   '<button type="button" class="bp-btn bp-btn-ghost" data-bp-go="why">Back to why</button>' +
   '</div>' +
   '</section>'
  );
 }

 function renderBoard(host) {
  styles();
  host.innerHTML =
   '<div class="bp-board" id="bp-board">' +
   '<nav class="bp-tabs" role="tablist" aria-label="Barn Pod sections">' +
   '<button type="button" class="bp-tab is-on" data-bp-tab="why" role="tab">Why</button>' +
   '<button type="button" class="bp-tab" data-bp-tab="house" role="tab">Pod House</button>' +
   '<button type="button" class="bp-tab" data-bp-tab="standard" role="tab">Identical kit</button>' +
   '<button type="button" class="bp-tab" data-bp-tab="rules" role="tab">Rules</button>' +
   '<button type="button" class="bp-tab" data-bp-tab="law" role="tab">Law</button>' +
   '<button type="button" class="bp-tab" data-bp-tab="sponsor" role="tab">Sponsor</button>' +
   '<button type="button" class="bp-tab" data-bp-tab="land" role="tab">Land</button>' +
   '</nav>' +
   '<div class="bp-panels">' +
   panelWhy() +
   panelHouse() +
   panelStandard() +
   panelRules() +
   panelLaw() +
   panelSponsor() +
   panelLand() +
   '</div>' +
   '</div>' +
   '<div class="bp-sticky" aria-label="Quick actions">' +
   '<button type="button" class="pri" data-bp-go="sponsor">Sponsor</button>' +
   '<button type="button" class="sec" data-bp-go="house">House</button>' +
   '<button type="button" class="sec" data-bp-go="law">Law</button>' +
   '<a class="sec" href="all-programs.html">All 30</a>' +
   '</div>';

  wire(host);
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
    var tier = btn.getAttribute('data-sponsor');
    saveIntent('sponsor', { tier: tier });
   });
  });
  $$('.bp-tier', host).forEach(function (card) {
   card.addEventListener('click', function (e) {
    if (e.target && e.target.getAttribute && e.target.getAttribute('data-sponsor')) return;
    $$('.bp-tier', host).forEach(function (c) { c.classList.remove('is-on'); });
    card.classList.add('is-on');
   });
  });
 }

 function boot() {
  var host = document.getElementById('bp-experience');
  if (!host) return;
  renderBoard(host);
 }

 window.SHHBarnPods = {
  boot: boot,
  showPanel: showPanel,
  HOUSE_SPEC: HOUSE_SPEC,
  POD_TIERS: POD_TIERS
 };

 if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
 } else {
  boot();
 }
})();
