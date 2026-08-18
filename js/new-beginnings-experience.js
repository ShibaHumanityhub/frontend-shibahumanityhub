/**
 * New Beginnings Home Start Packs · pack builder studio
 * Donors pick pack size, then choose items (toys, bed, leash, food, etc.).
 * Truth: design studio until funding + partner shops + receipts are live.
 * Prefer give-back partner stores; optional future SHH shop only if 100% routes to program with public books.
 */
(function () {
  'use strict';

  var PACKS = [
    {
      id: 'starter',
      name: 'Starter Pack',
      circle: 'Mercy',
      days: 'First 30 days',
      tier: 'MVP',
      blurb: 'Minimum viable home. Kill week-one budget shock before it kills the adoption.',
      color: '#34d399',
      slots: {
        bed: 1, leash: 1, collar: 1, food: 1, toys: 2, crate: 1, extras: 1
      },
      includes: ['Microchip registration support (when live)', 'Family care card', 'Core gear: night one → day 30']
    },
    {
      id: 'settle',
      name: 'Settle-In Pack',
      circle: 'Guardian',
      days: 'First 60 days',
      tier: 'DEFAULT',
      blurb: 'MVP + training + insurance buffer. Convert chaos into a stable bond under stress.',
      color: '#38bdf8',
      slots: {
        bed: 1, leash: 1, collar: 1, food: 1, toys: 3, crate: 1, training: 1, insurance: 1, extras: 2
      },
      includes: ['6 weeks training voucher (design)', '60 days pet insurance buffer (design)', 'Microchip support', 'Higher stick-rate target']
    },
    {
      id: 'launch',
      name: 'Full Launch Pack',
      circle: 'Eternal',
      days: 'First 90 days',
      tier: 'MAX',
      blurb: 'Full stack + season safety net. Maximize P(permanent home). This is how you win the decade.',
      color: '#fbbf24',
      slots: {
        bed: 1, leash: 1, collar: 1, food: 1, toys: 4, crate: 1, training: 1, insurance: 1, camera: 1, vet: 1, extras: 3
      },
      includes: ['90-day check-in option (design)', 'Emergency vet buffer (design)', 'Full settle support', 'Maximum permanence design']
    }
  ];

  /* Candidate give-back shortlist (design only, not signed contracts yet) */
  var PARTNERS = [
    { id: 'chewy', name: 'Chewy', focus: 'Food, beds, bowls, toys', give: 'Corporate giving and partner campaigns', url: 'https://www.chewy.com', note: 'Shortlist candidate' },
    { id: 'petco', name: 'Petco / Petco Love', focus: 'Everyday gear, food, waste bags', give: 'Petco Love foundation model', url: 'https://www.petco.com', note: 'Shortlist candidate' },
    { id: 'petsmart', name: 'PetSmart / PetSmart Charities', focus: 'Adoption support and store gear', give: 'Charity arm + store programs', url: 'https://www.petsmart.com', note: 'Shortlist candidate' },
    { id: 'ruffwear', name: 'Ruffwear', focus: 'Harnesses, leashes, outdoor kits', give: 'Cause campaigns when contracted', url: 'https://ruffwear.com', note: 'Shortlist candidate' },
    { id: 'local', name: 'Local indie shops', focus: 'Training, specialty, city kits', give: 'City-by-city donate-back deals', url: '', note: 'Live list when partners sign' }
  ];

  /* Catalog: sizes S/M/L filter what shows. est = design estimate USD for receipt mock only. */
  var CATALOG = {
    bed: {
      label: 'Bed',
      emoji: '🛏️',
      options: [
        { id: 'bed-soft', name: 'Cloud nest bed', note: 'Machine-washable, soft for first nights', partner: 'chewy', partnerLabel: 'Chewy (candidate)', sizes: ['S', 'M', 'L'], est: 38 },
        { id: 'bed-ortho', name: 'Ortho bolster bed', note: 'Joints and deep sleepers', partner: 'petco', partnerLabel: 'Petco (candidate)', sizes: ['M', 'L'], est: 62 },
        { id: 'bed-travel', name: 'Travel crate mat', note: 'Rides + crate calm', partner: 'chewy', partnerLabel: 'Chewy (candidate)', sizes: ['S', 'M', 'L'], est: 24 }
      ]
    },
    leash: {
      label: 'Leash',
      emoji: '🦮',
      options: [
        { id: 'leash-standard', name: '6 ft everyday leash', note: 'Solid first walks', partner: 'ruffwear', partnerLabel: 'Ruffwear (candidate)', sizes: ['S', 'M', 'L'], est: 22 },
        { id: 'leash-handsfree', name: 'Hands-free walk belt', note: 'Hands free for treats and keys', partner: 'ruffwear', partnerLabel: 'Ruffwear (candidate)', sizes: ['M', 'L'], est: 48 },
        { id: 'leash-traffic', name: 'Short traffic lead', note: 'City doors and cars', partner: 'petsmart', partnerLabel: 'PetSmart (candidate)', sizes: ['S', 'M', 'L'], est: 16 }
      ]
    },
    collar: {
      label: 'Collar / harness',
      emoji: '✨',
      options: [
        { id: 'col-id', name: 'ID collar + tags blank', note: 'Ready for name and number', partner: 'petco', partnerLabel: 'Petco (candidate)', sizes: ['S', 'M', 'L'], est: 18 },
        { id: 'col-break', name: 'Breakaway safety collar', note: 'Safer for some home setups', partner: 'chewy', partnerLabel: 'Chewy (candidate)', sizes: ['S', 'M'], est: 14 },
        { id: 'col-harness', name: 'Step-in harness', note: 'No neck pressure for nervous dogs', partner: 'ruffwear', partnerLabel: 'Ruffwear (candidate)', sizes: ['S', 'M', 'L'], est: 42 }
      ]
    },
    food: {
      label: 'Food start',
      emoji: '🥣',
      options: [
        { id: 'food-gentle', name: 'Gentle transition kibble', note: 'First two weeks stomach soft', partner: 'chewy', partnerLabel: 'Chewy (candidate)', sizes: ['S', 'M', 'L'], est: 36 },
        { id: 'food-pup', name: 'Puppy growth bag', note: 'For young forever kids', partner: 'chewy', partnerLabel: 'Chewy (candidate)', sizes: ['S', 'M'], est: 40 },
        { id: 'food-senior', name: 'Senior joint formula', note: 'Older greys starting over', partner: 'petco', partnerLabel: 'Petco (candidate)', sizes: ['M', 'L'], est: 44 }
      ]
    },
    toys: {
      label: 'Toys',
      emoji: '🧸',
      options: [
        { id: 'toy-kong', name: 'Stuffable rubber toy', note: 'Busy brain, less stress', partner: 'chewy', partnerLabel: 'Chewy (candidate)', sizes: ['S', 'M', 'L'], est: 14 },
        { id: 'toy-rope', name: 'Rope tug', note: 'Bond games with people', partner: 'petsmart', partnerLabel: 'PetSmart (candidate)', sizes: ['S', 'M', 'L'], est: 10 },
        { id: 'toy-puzzle', name: 'Slow puzzle feeder', note: 'Calm meals', partner: 'chewy', partnerLabel: 'Chewy (candidate)', sizes: ['S', 'M', 'L'], est: 18 },
        { id: 'toy-plush', name: 'Soft comfort plush', note: 'Quiet cuddle option', partner: 'petco', partnerLabel: 'Petco (candidate)', sizes: ['S', 'M'], est: 12 },
        { id: 'toy-ball', name: 'Chase ball set', note: 'Yard and hallway energy', partner: 'petsmart', partnerLabel: 'PetSmart (candidate)', sizes: ['M', 'L'], est: 11 }
      ]
    },
    crate: {
      label: 'Crate / den',
      emoji: '🏠',
      options: [
        { id: 'crate-wire', name: 'Fold wire crate', note: 'Classic den with cover', partner: 'chewy', partnerLabel: 'Chewy (candidate)', sizes: ['S', 'M', 'L'], est: 68 },
        { id: 'crate-soft', name: 'Soft-sided travel den', note: 'Light homes and trips', partner: 'petco', partnerLabel: 'Petco (candidate)', sizes: ['S', 'M'], est: 55 },
        { id: 'crate-furniture', name: 'Furniture-style den', note: 'Looks like home, feels safe', partner: 'chewy', partnerLabel: 'Chewy (candidate)', sizes: ['M', 'L'], est: 120 }
      ]
    },
    training: {
      label: 'Training',
      emoji: '🎓',
      options: [
        { id: 'train-basic', name: '6-week group basics voucher', note: 'Sit, come, calm leash', partner: 'local', partnerLabel: 'Local trainer (candidate)', sizes: ['S', 'M', 'L'], est: 150 },
        { id: 'train-private', name: '3 private settle sessions', note: 'Fearful or big energy dogs', partner: 'local', partnerLabel: 'Local trainer (candidate)', sizes: ['S', 'M', 'L'], est: 210 },
        { id: 'train-online', name: 'Online settle course pack', note: 'Family learns at home pace', partner: 'local', partnerLabel: 'Education partner (candidate)', sizes: ['S', 'M', 'L'], est: 79 }
      ]
    },
    insurance: {
      label: 'Insurance buffer',
      emoji: '🛡️',
      options: [
        { id: 'ins-60', name: '60-day accident buffer', note: 'Settle-in peace of mind', partner: 'program', partnerLabel: 'Program buffer (design)', sizes: ['S', 'M', 'L'], est: 95 },
        { id: 'ins-well', name: 'Wellness starter month', note: 'First exam window help', partner: 'program', partnerLabel: 'Program buffer (design)', sizes: ['S', 'M', 'L'], est: 70 }
      ]
    },
    camera: {
      label: 'Check-in camera',
      emoji: '📷',
      options: [
        { id: 'cam-plug', name: 'Plug-in room cam', note: 'Optional family check-ins', partner: 'chewy', partnerLabel: 'Tech partner (candidate)', sizes: ['S', 'M', 'L'], est: 45 },
        { id: 'cam-none', name: 'Skip camera, boost vet buffer', note: 'Privacy first families', partner: 'program', partnerLabel: 'Program buffer (design)', sizes: ['S', 'M', 'L'], est: 45 }
      ]
    },
    vet: {
      label: 'Emergency vet buffer',
      emoji: '🏥',
      options: [
        { id: 'vet-standard', name: 'Standard emergency buffer', note: 'Unexpected first-month care', partner: 'program', partnerLabel: 'Program held (design)', sizes: ['S', 'M', 'L'], est: 200 },
        { id: 'vet-boost', name: 'Boosted emergency buffer', note: 'Higher needs adoptees', partner: 'program', partnerLabel: 'Program held (design)', sizes: ['S', 'M', 'L'], est: 350 }
      ]
    },
    extras: {
      label: 'Extras',
      emoji: '🎁',
      options: [
        { id: 'ex-bowls', name: 'Steel bowl set', note: 'Water + food', partner: 'petsmart', partnerLabel: 'PetSmart (candidate)', sizes: ['S', 'M', 'L'], est: 16 },
        { id: 'ex-waste', name: 'Waste bag starter', note: 'Walks from day one', partner: 'petco', partnerLabel: 'Petco (candidate)', sizes: ['S', 'M', 'L'], est: 8 },
        { id: 'ex-treats', name: 'Training treat pouch', note: 'Reward good choices', partner: 'chewy', partnerLabel: 'Chewy (candidate)', sizes: ['S', 'M', 'L'], est: 15 },
        { id: 'ex-blanket', name: 'Soft home blanket', note: 'Shelter scent swap helper', partner: 'petsmart', partnerLabel: 'PetSmart (candidate)', sizes: ['S', 'M', 'L'], est: 19 },
        { id: 'ex-book', name: 'First-week family guide', note: 'What to expect nights 1-7', partner: 'program', partnerLabel: 'Program print (design)', sizes: ['S', 'M', 'L'], est: 6 }
      ]
    }
  };

  var CATEGORY_ORDER = ['bed', 'leash', 'collar', 'food', 'toys', 'crate', 'training', 'insurance', 'camera', 'vet', 'extras'];
  var SIZES = ['S', 'M', 'L'];
  var SIZE_LABEL = { S: 'Small', M: 'Medium', L: 'Large' };

  var state = {
    packId: 'settle',
    dogSize: 'M',
    picks: {}, /* cat -> array of option ids */
    dogName: '',
    donorName: '',
    note: ''
  };

  function isMobile() {
    try {
      if (/[?&]desktop=1/i.test(location.search || '')) return false;
      if (/[?&]mobile=1/i.test(location.search || '')) return true;
      return window.matchMedia && window.matchMedia('(max-width: 767px)').matches;
    } catch (e) { return false; }
  }

  function pack() {
    for (var i = 0; i < PACKS.length; i++) if (PACKS[i].id === state.packId) return PACKS[i];
    return PACKS[0];
  }

  function ensurePicks() {
    var p = pack();
    var next = {};
    Object.keys(p.slots).forEach(function (cat) {
      next[cat] = (state.picks[cat] || []).slice(0, p.slots[cat]);
    });
    state.picks = next;
  }

  function styles() {
    if (document.getElementById('nbx-css')) return;
    var s = document.createElement('style');
    s.id = 'nbx-css';
    s.textContent = [
      ':root{--nb-sky:#7dd3fc;--nb-mint:#6ee7b7;--nb-sun:#fde68a;--nb-coral:#fb7185;--nb-ink:#061018;--nb-line:rgba(125,211,252,.35)}',
      'body.nbx-panels{scroll-behavior:auto}',
      'body.nbx-panels .nbx-panel{display:none;padding-bottom:2rem}',
      'body.nbx-panels .nbx-panel.is-on{display:block;animation:nbx-in .22s ease}',
      '@keyframes nbx-in{from{opacity:0}to{opacity:1}}',
      '@media(max-width:767px){body.nbx-panels .nbx-panel.is-on{animation:none}}',
      /* Solid sticky rail — blur only on desktop (blur+scroll = mobile flicker) */
      '.nbx-rail{position:sticky;top:0;z-index:55;display:flex;gap:.3rem;padding:.5rem max(.7rem,env(safe-area-inset-left));overflow-x:auto;scrollbar-width:none;background:rgba(6,16,24,.98);border-bottom:1px solid var(--nb-line);justify-content:flex-start;transform:translateZ(0)}',
      '@media(min-width:768px){.nbx-rail{background:rgba(6,16,24,.9);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}}',
      '.nbx-rail::-webkit-scrollbar{display:none}',
      '@media(min-width:900px){.nbx-rail{justify-content:center;flex-wrap:wrap}}',
      '.nbx-rail button{flex:0 0 auto;font-size:.56rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(125,211,252,.55);padding:.42rem .75rem;border-radius:999px;border:1px solid transparent;background:transparent;cursor:pointer;font-family:inherit;font-weight:700;min-height:40px}',
      '.nbx-rail button.is-on,.nbx-rail button:hover{color:#ecfeff;border-color:rgba(125,211,252,.5);background:linear-gradient(145deg,rgba(125,211,252,.16),rgba(110,231,183,.08))}',
      'body.nbx-panels:not(.nbx-mobile) header.nb-hero{padding-top:5.4rem!important;padding-bottom:1.4rem!important}',
      'body.nbx-panels:not(.nbx-mobile) .nbx-quick{display:none}',
      '.nbx-section{max-width:min(72rem,100%);margin:0 auto;padding:1.15rem max(.75rem,env(safe-area-inset-left)) 2rem}',
      '@media(min-width:768px){.nbx-section{padding:1.6rem 1.5rem 2.5rem}}',
      '@media(min-width:1600px){.nbx-section{max-width:82rem}}',
      '.nbx-head h2{font-family:"Space Grotesk",sans-serif;font-size:clamp(1.35rem,3.2vw,1.95rem);letter-spacing:-.03em;margin:0 0 .4rem;background:linear-gradient(135deg,#fff,#7dd3fc 40%,#6ee7b7 75%,#fde68a);-webkit-background-clip:text;background-clip:text;color:transparent}',
      '.nbx-head p{margin:0;font-size:.9rem;line-height:1.55;color:rgba(186,230,253,.82);max-width:44rem}',
      /* Thesis / mechanism strip */
      '.nbx-soul{position:relative;margin:0 0 1.15rem;padding:1rem 1.05rem 1.05rem;border-radius:1.25rem;border:1px solid rgba(125,211,252,.4);background:linear-gradient(145deg,rgba(125,211,252,.12),rgba(110,231,183,.08) 50%,rgba(6,16,24,.95));box-shadow:0 0 48px -20px rgba(125,211,252,.45),inset 0 1px 0 rgba(255,255,255,.08);overflow:hidden}',
      '.nbx-soul::before{content:"";position:absolute;inset:-40% -20% auto;height:80%;background:radial-gradient(ellipse,rgba(125,211,252,.14),transparent 65%);pointer-events:none}',
      '.nbx-soul .tag{position:relative;display:inline-block;font-size:.55rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(125,211,252,.9);margin:0 0 .4rem}',
      '.nbx-soul h3{position:relative;font-family:"Space Grotesk",sans-serif;margin:0 0 .4rem;font-size:clamp(1.05rem,2.4vw,1.35rem);color:#e0f2fe;letter-spacing:-.02em;line-height:1.25}',
      '.nbx-soul p{position:relative;margin:0;font-size:.86rem;line-height:1.55;color:rgba(186,230,253,.88)}',
      '.nbx-soul strong{color:#6ee7b7}',
      '.nbx-cherish{display:grid;gap:.5rem;margin:0 0 1.1rem}',
      '@media(min-width:700px){.nbx-cherish{grid-template-columns:repeat(3,1fr)}}',
      '.nbx-cherish-card{border-radius:1rem;border:1px solid rgba(125,211,252,.28);background:linear-gradient(160deg,rgba(125,211,252,.1),rgba(0,0,0,.35));padding:.85rem .8rem}',
      '.nbx-cherish-card .k{font-size:.55rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(125,211,252,.85);margin:0 0 .3rem}',
      '.nbx-cherish-card p{margin:0;font-size:.8rem;line-height:1.45;color:rgba(224,242,254,.88)}',
      /* Pack pick */
      '.nbx-packs{display:grid;gap:.65rem;grid-template-columns:1fr;margin:1.1rem 0 1.25rem}',
      '@media(min-width:700px){.nbx-packs{grid-template-columns:repeat(3,1fr)}}',
      '.nbx-pack{text-align:left;border-radius:1.25rem;border:1px solid rgba(125,211,252,.28);background:linear-gradient(160deg,rgba(125,211,252,.1),rgba(6,16,24,.95));padding:1.1rem 1rem;cursor:pointer;font:inherit;color:inherit;transition:transform .18s,border-color .18s,box-shadow .18s;position:relative;overflow:hidden}',
      '.nbx-pack::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:var(--pack-c,#7dd3fc);opacity:.85}',
      '.nbx-pack.is-on{border-color:rgba(253,230,138,.55);box-shadow:0 0 40px -12px rgba(125,211,252,.45);transform:translateY(-2px)}',
      '.nbx-pack .circle{font-size:.55rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(253,230,138,.8);margin:0 0 .25rem;display:flex;justify-content:space-between;align-items:center;gap:.4rem}',
      '.nbx-pack .tier{font-size:.5rem;letter-spacing:.12em;padding:.18rem .4rem;border-radius:999px;border:1px solid rgba(110,231,183,.4);color:#6ee7b7}',
      '.nbx-pack h3{font-family:"Space Grotesk",sans-serif;margin:0 0 .2rem;font-size:1.2rem;color:#f0f9ff}',
      '.nbx-pack .days{font-size:.72rem;color:#6ee7b7;margin:0 0 .4rem}',
      '.nbx-pack p{margin:0;font-size:.8rem;line-height:1.4;color:rgba(186,230,253,.75)}',
      '.nbx-flight{display:grid;gap:.4rem;grid-template-columns:1fr;margin:0 0 1.15rem}',
      '@media(min-width:720px){.nbx-flight{grid-template-columns:repeat(4,1fr)}}',
      '.nbx-flight-step{border-radius:.95rem;border:1px solid rgba(125,211,252,.25);background:rgba(0,0,0,.3);padding:.75rem .7rem;text-align:left}',
      '.nbx-flight-step .n{font-size:.5rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(125,211,252,.7);margin:0 0 .25rem}',
      '.nbx-flight-step h4{font-family:"Space Grotesk",sans-serif;margin:0 0 .25rem;font-size:.92rem;color:#e0f2fe;letter-spacing:-.02em}',
      '.nbx-flight-step p{margin:0;font-size:.72rem;line-height:1.4;color:rgba(186,230,253,.7)}',
      '.nbx-anti{margin:0 0 1.15rem;padding:.9rem 1rem;border-radius:1.1rem;border:1px solid rgba(251,113,133,.35);background:linear-gradient(160deg,rgba(251,113,133,.08),rgba(0,0,0,.35))}',
      '.nbx-anti h4{font-family:"Space Grotesk",sans-serif;margin:0 0 .4rem;font-size:.95rem;color:#fda4af}',
      '.nbx-anti ul{margin:0;padding-left:1.05rem;font-size:.8rem;line-height:1.5;color:rgba(254,205,211,.85)}',
      /* Builder layout */
      '.nbx-build{display:grid;gap:1rem}',
      '@media(min-width:960px){.nbx-build{grid-template-columns:1.15fr .85fr;align-items:start}}',
      '.nbx-cats{display:grid;gap:.85rem}',
      '.nbx-cat{border-radius:1.2rem;border:1px solid rgba(125,211,252,.25);background:linear-gradient(155deg,rgba(125,211,252,.08),rgba(4,12,18,.96));padding:1rem .95rem}',
      '.nbx-cat-head{display:flex;justify-content:space-between;align-items:center;gap:.5rem;margin-bottom:.65rem}',
      '.nbx-cat-head h3{font-family:"Space Grotesk",sans-serif;margin:0;font-size:1.05rem;color:#e0f2fe}',
      '.nbx-cat-head .slot{font-size:.65rem;letter-spacing:.08em;text-transform:uppercase;color:#fde68a;border:1px solid rgba(253,230,138,.35);padding:.25rem .5rem;border-radius:999px}',
      '.nbx-opts{display:grid;gap:.45rem}',
      '@media(min-width:520px){.nbx-opts{grid-template-columns:1fr 1fr}}',
      '.nbx-opt{display:flex;align-items:flex-start;gap:.55rem;text-align:left;border-radius:.95rem;border:1px solid rgba(125,211,252,.22);background:rgba(0,0,0,.28);padding:.7rem .7rem;cursor:pointer;font:inherit;color:inherit;transition:border-color .15s,background .15s}',
      '.nbx-opt.is-on{border-color:rgba(110,231,183,.55);background:linear-gradient(145deg,rgba(110,231,183,.12),rgba(0,0,0,.35))}',
      '.nbx-opt .em{font-size:1.2rem;line-height:1}',
      '.nbx-opt strong{display:block;font-size:.88rem;color:#f0f9ff;margin-bottom:.15rem}',
      '.nbx-opt span{display:block;font-size:.72rem;line-height:1.35;color:rgba(186,230,253,.7)}',
      '.nbx-opt .partner{font-size:.62rem;color:rgba(253,230,138,.65);margin-top:.25rem}',
      '.nbx-opt .est{font-size:.62rem;color:rgba(110,231,183,.75);margin-top:.15rem}',
      /* Size filter */
      '.nbx-size-row{display:flex;flex-wrap:wrap;align-items:center;gap:.45rem;margin:0 0 1rem;padding:.75rem .85rem;border-radius:1rem;border:1px solid rgba(125,211,252,.28);background:rgba(0,0,0,.28)}',
      '.nbx-size-row .lbl{font-size:.6rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(125,211,252,.7);margin-right:.25rem}',
      '.nbx-size{min-width:3.2rem;min-height:40px;padding:.4rem .75rem;border-radius:999px;border:1px solid rgba(125,211,252,.3);background:rgba(0,0,0,.35);color:rgba(186,230,253,.75);font:inherit;font-size:.78rem;font-weight:700;cursor:pointer;transition:border-color .15s,background .15s,color .15s}',
      '.nbx-size.is-on{border-color:rgba(110,231,183,.55);background:linear-gradient(145deg,rgba(110,231,183,.18),rgba(125,211,252,.1));color:#ecfeff}',
      '.nbx-size-hint{flex:1 1 100%;font-size:.72rem;color:rgba(186,230,253,.55);margin:0;line-height:1.35}',
      /* Partner cards */
      '.nbx-partners{display:grid;gap:.55rem;margin:1rem 0 0}',
      '@media(min-width:640px){.nbx-partners{grid-template-columns:1fr 1fr}}',
      '@media(min-width:1000px){.nbx-partners{grid-template-columns:repeat(3,1fr)}}',
      '.nbx-partner{border-radius:1.05rem;border:1px solid rgba(125,211,252,.28);background:linear-gradient(155deg,rgba(125,211,252,.08),rgba(4,12,18,.96));padding:.9rem .85rem}',
      '.nbx-partner h4{font-family:"Space Grotesk",sans-serif;margin:0 0 .25rem;color:#e0f2fe;font-size:.98rem}',
      '.nbx-partner .focus{font-size:.78rem;color:rgba(186,230,253,.78);margin:0 0 .3rem;line-height:1.4}',
      '.nbx-partner .give{font-size:.72rem;color:rgba(110,231,183,.8);margin:0 0 .35rem;line-height:1.35}',
      '.nbx-partner .badge{display:inline-block;font-size:.55rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(253,230,138,.75);border:1px solid rgba(253,230,138,.35);padding:.2rem .45rem;border-radius:999px;margin-bottom:.4rem}',
      '.nbx-partner a{font-size:.72rem;color:#7dd3fc;text-decoration:none}',
      '.nbx-partner a:hover{text-decoration:underline}',
      /* Receipt mock */
      '.nbx-receipt{margin-top:.85rem;border-radius:1.05rem;border:1px solid rgba(110,231,183,.3);background:rgba(0,0,0,.35);padding:.85rem .8rem}',
      '.nbx-receipt h4{font-family:"Space Grotesk",sans-serif;margin:0 0 .2rem;font-size:.95rem;color:#a7f3d0}',
      '.nbx-receipt .rc-sub{font-size:.68rem;color:rgba(186,230,253,.55);margin:0 0 .55rem;line-height:1.35}',
      '.nbx-receipt table{width:100%;border-collapse:collapse;font-size:.72rem}',
      '.nbx-receipt th{text-align:left;font-size:.55rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(125,211,252,.55);padding:.25rem 0;border-bottom:1px solid rgba(125,211,252,.15)}',
      '.nbx-receipt td{padding:.35rem 0;border-bottom:1px solid rgba(255,255,255,.05);color:rgba(224,242,254,.88);vertical-align:top}',
      '.nbx-receipt td.amt{text-align:right;white-space:nowrap;color:#6ee7b7;font-variant-numeric:tabular-nums}',
      '.nbx-receipt .meta{font-size:.62rem;color:rgba(186,230,253,.5);display:block;margin-top:.1rem}',
      '.nbx-receipt .total-row td{border-bottom:0;padding-top:.55rem;font-weight:700;color:#fde68a}',
      '.nbx-receipt .total-row td.amt{color:#fde68a;font-size:.85rem}',
      '.nbx-receipt .rc-empty{font-size:.75rem;color:rgba(186,230,253,.45);text-align:center;padding:.6rem 0}',
      '.nbx-receipt .rc-truth{font-size:.6rem;line-height:1.35;color:rgba(148,180,200,.5);margin:.55rem 0 0}',
      /* Preview box */
      '.nbx-preview{position:sticky;top:3.5rem;border-radius:1.4rem;border:1px solid rgba(253,230,138,.35);background:linear-gradient(165deg,rgba(253,230,138,.12),rgba(6,16,24,.98));padding:1.15rem 1.05rem;box-shadow:0 24px 60px -24px rgba(0,0,0,.75),inset 0 1px 0 rgba(255,255,255,.08)}',
      '.nbx-preview h3{font-family:"Space Grotesk",sans-serif;margin:0 0 .35rem;color:#fde68a;font-size:1.15rem}',
      '.nbx-preview .sub{font-size:.78rem;color:rgba(186,230,253,.7);margin:0 0 .85rem;line-height:1.4}',
      '.nbx-box{border-radius:1.1rem;border:2px dashed rgba(125,211,252,.35);background:rgba(0,0,0,.25);padding:.85rem;min-height:180px;margin-bottom:.85rem;transition:border-color .25s,box-shadow .25s}',
      '.nbx-box.is-filling{border-style:solid;border-color:rgba(110,231,183,.45);box-shadow:0 0 36px -14px rgba(110,231,183,.5)}',
      '.nbx-box.empty{display:flex;align-items:center;justify-content:center;color:rgba(186,230,253,.55);font-size:.84rem;line-height:1.45;text-align:center;padding:1.5rem}',
      '.nbx-chip{display:inline-flex;align-items:center;gap:.3rem;margin:.2rem;padding:.35rem .55rem;border-radius:999px;background:linear-gradient(135deg,rgba(110,231,183,.2),rgba(125,211,252,.15));border:1px solid rgba(110,231,183,.35);font-size:.72rem;color:#ecfeff}',
      '.nbx-meter{height:8px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden;margin:.5rem 0 .35rem}',
      '.nbx-meter > i{display:block;height:100%;width:0;border-radius:999px;background:linear-gradient(90deg,#6ee7b7,#7dd3fc,#fde68a);transition:width .35s ease}',
      '.nbx-meter-label{font-size:.68rem;color:rgba(253,230,138,.75);margin:0 0 .75rem}',
      '.nbx-includes{margin:0 0 .85rem;padding-left:1.05rem;font-size:.78rem;line-height:1.45;color:rgba(186,230,253,.75)}',
      '.nbx-form label{display:block;font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(125,211,252,.7);margin:0 0 .25rem}',
      '.nbx-form input,.nbx-form textarea{width:100%;margin:0 0 .65rem;padding:.7rem .8rem;border-radius:.85rem;border:1px solid rgba(125,211,252,.28);background:rgba(0,0,0,.4);color:#fff;font:inherit;font-size:16px}',
      '.nbx-form textarea{min-height:72px;resize:vertical}',
      '.nbx-cta{display:inline-flex;align-items:center;justify-content:center;width:100%;min-height:48px;border:0;border-radius:999px;font-weight:700;font-size:.9rem;cursor:pointer;font-family:inherit;color:#042f2e;background:linear-gradient(135deg,#fde68a,#6ee7b7 50%,#7dd3fc);box-shadow:0 12px 32px -12px rgba(110,231,183,.55)}',
      '.nbx-cta:disabled{opacity:.45;cursor:not-allowed}',
      '.nbx-status{font-size:.78rem;color:#6ee7b7;margin-top:.55rem;min-height:1.2em}',
      '.nbx-truth{font-size:.65rem;line-height:1.4;color:rgba(148,180,200,.55);margin-top:.65rem}',
      '.nbx-shop{border-radius:1.15rem;border:1px solid rgba(110,231,183,.3);background:linear-gradient(160deg,rgba(110,231,183,.1),rgba(0,0,0,.35));padding:1rem;margin-top:1rem}',
      '.nbx-shop h3{font-family:"Space Grotesk",sans-serif;margin:0 0 .4rem;color:#a7f3d0;font-size:1.05rem}',
      '.nbx-shop p,.nbx-shop li{font-size:.82rem;line-height:1.5;color:rgba(186,230,253,.78)}',
      '.nbx-shop ul{margin:.4rem 0 0;padding-left:1.1rem}',
      '.nbx-more{display:grid;gap:.6rem}',
      '@media(min-width:640px){.nbx-more{grid-template-columns:1fr 1fr}}',
      '.nbx-link{display:block;border-radius:1.1rem;border:1px solid rgba(125,211,252,.28);padding:1rem;text-decoration:none;color:inherit;background:linear-gradient(155deg,rgba(125,211,252,.08),rgba(4,12,18,.96));transition:border-color .15s,transform .15s}',
      '.nbx-link:hover{border-color:rgba(253,230,138,.45);transform:translateY(-2px)}',
      '.nbx-link h3{font-family:"Space Grotesk",sans-serif;margin:0 0 .3rem;color:#fde68a;font-size:1.05rem}',
      '.nbx-link p{margin:0;font-size:.8rem;color:rgba(186,230,253,.72);line-height:1.4}',
      /* Mobile */
      'body.nbx-mobile{padding-bottom:calc(4.8rem + env(safe-area-inset-bottom))}',
      'body.nbx-mobile .nbx-rail,body.nbx-mobile > nav,body.nbx-mobile #mobile-menu,body.nbx-mobile .fixed.bottom-3{display:none!important}',
      'body.nbx-mobile > footer{padding-bottom:calc(5.5rem + env(safe-area-inset-bottom))!important;font-size:11px!important}',
      '.nbx-mtop{display:none;position:sticky;top:0;z-index:70;align-items:center;justify-content:space-between;padding:.5rem .7rem;padding-top:max(.45rem,env(safe-area-inset-top));background:rgba(6,16,24,.98);border-bottom:1px solid var(--nb-line)}',
      'body.nbx-mobile .nbx-mtop{display:flex}',
      '.nbx-mtop a{display:flex;align-items:center;gap:.4rem;text-decoration:none;color:inherit}',
      '.nbx-mtop img{width:30px;height:30px;border-radius:50%;object-fit:cover;border:1px solid rgba(125,211,252,.45)}',
      '.nbx-mtop span{font-size:.62rem;font-weight:700;letter-spacing:.04em;color:#e0f2fe}',
      '.nbx-mtabs{display:none;position:fixed;left:0;right:0;bottom:0;z-index:75;grid-template-columns:repeat(4,1fr);padding:.28rem .1rem calc(.28rem + env(safe-area-inset-bottom));background:rgba(4,12,18,.98);border-top:1px solid var(--nb-line)}',
      'body.nbx-mobile .nbx-mtabs{display:grid}',
      '.nbx-mtab{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.1rem;border:0;background:transparent;color:rgba(125,211,252,.4);font-size:.46rem;letter-spacing:.03em;text-transform:uppercase;font-weight:700;font-family:inherit;min-height:52px;cursor:pointer}',
      '.nbx-mtab .ic{font-size:1.05rem}',
      '.nbx-mtab.is-on{color:#e0f2fe;background:linear-gradient(180deg,rgba(125,211,252,.14),transparent)}',
      'body.nbx-mobile header.nb-hero{padding:3.3rem .7rem .85rem!important}',
      'body.nbx-mobile .nbx-hide-m{display:none!important}',
      'body.nbx-mobile .nbx-preview{position:relative;top:0}',
      'body.nbx-mobile .nbx-section{padding-top:1rem}',
      'body.nbx-mobile .nbx-soul{padding:.95rem .9rem;margin-bottom:1rem}',
      'body.nbx-mobile .nbx-soul h3{font-size:1.08rem}',
      'body.nbx-mobile .nbx-soul p{font-size:.9rem;color:rgba(224,242,254,.92)}',
      'body.nbx-mobile .nbx-mtop{background:rgba(6,16,24,.99)}',
      '.nbx-quick{display:flex;flex-wrap:wrap;gap:.35rem;padding:.65rem max(.65rem,env(safe-area-inset-left)) 0;max-width:min(72rem,100%);margin:0 auto}',
      '.nbx-quick button{flex:1 1 42%;min-height:46px;border-radius:999px;border:1px solid rgba(125,211,252,.35);background:rgba(0,0,0,.35);color:#e0f2fe;font-size:.72rem;font-weight:700;font-family:inherit;cursor:pointer}',
      '.nbx-quick button.pri{background:linear-gradient(135deg,#fde68a,#6ee7b7);color:#042f2e;border:0}',
      '.nbx-progress{position:fixed;top:0;left:0;height:2px;width:0;z-index:80;background:linear-gradient(90deg,#6ee7b7,#7dd3fc,#fde68a,#fb7185)}',
      '@media(max-width:390px){.nbx-pack h3{font-size:1.05rem}.nbx-opts{grid-template-columns:1fr}}'
    ].join('');
    document.head.appendChild(s);
  }

  function goTab(id) {
    if (!id) return;
    document.querySelectorAll('.nbx-panel').forEach(function (p) {
      p.classList.toggle('is-on', p.getAttribute('data-nbx-panel') === id);
    });
    document.querySelectorAll('.nbx-mtab, #nbx-rail [data-nbx-go]').forEach(function (t) {
      var key = t.getAttribute('data-tab') || t.getAttribute('data-nbx-go');
      var on = key === id;
      t.classList.toggle('is-on', on);
    });
    try {
      if (history.replaceState) history.replaceState(null, '', '#nbx-' + id);
    } catch (e) { /* ignore */ }
    window.scrollTo(0, 0);
  }

  function bindGo(root) {
    (root || document).querySelectorAll('[data-nbx-go]').forEach(function (btn) {
      if (btn.getAttribute('data-nbx-bound') === '1') return;
      btn.setAttribute('data-nbx-bound', '1');
      btn.addEventListener('click', function (ev) {
        ev.preventDefault();
        goTab(btn.getAttribute('data-nbx-go'));
      });
    });
  }

  function findOpt(cat, id) {
    var list = (CATALOG[cat] && CATALOG[cat].options) || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  function optionFitsSize(o) {
    if (!o || !o.sizes || !o.sizes.length) return true;
    return o.sizes.indexOf(state.dogSize) >= 0;
  }

  function optionsForSize(cat) {
    var list = (CATALOG[cat] && CATALOG[cat].options) || [];
    return list.filter(optionFitsSize);
  }

  /* Drop picks that no longer fit the selected dog size */
  function prunePicksForSize() {
    Object.keys(state.picks).forEach(function (cat) {
      state.picks[cat] = (state.picks[cat] || []).filter(function (id) {
        var o = findOpt(cat, id);
        return o && optionFitsSize(o);
      });
    });
  }

  function lineItems() {
    var rows = [];
    Object.keys(state.picks).forEach(function (cat) {
      (state.picks[cat] || []).forEach(function (id) {
        var o = findOpt(cat, id);
        if (!o) return;
        rows.push({
          cat: cat,
          catLabel: (CATALOG[cat] && CATALOG[cat].label) || cat,
          emoji: (CATALOG[cat] && CATALOG[cat].emoji) || '',
          name: o.name,
          partnerLabel: o.partnerLabel || o.partner || '',
          est: typeof o.est === 'number' ? o.est : 0
        });
      });
    });
    return rows;
  }

  function estTotal() {
    return lineItems().reduce(function (sum, r) { return sum + (r.est || 0); }, 0);
  }

  function fillCount() {
    var p = pack();
    var filled = 0;
    var total = 0;
    Object.keys(p.slots).forEach(function (cat) {
      total += p.slots[cat];
      filled += (state.picks[cat] || []).length;
    });
    return { filled: filled, total: total, pct: total ? Math.round((filled / total) * 100) : 0 };
  }

  function togglePick(cat, optId) {
    var p = pack();
    var max = p.slots[cat] || 0;
    if (!max) return;
    var arr = state.picks[cat] ? state.picks[cat].slice() : [];
    var ix = arr.indexOf(optId);
    if (ix >= 0) arr.splice(ix, 1);
    else {
      if (max === 1) arr = [optId];
      else if (arr.length < max) arr.push(optId);
      else {
        arr.shift();
        arr.push(optId);
      }
    }
    state.picks[cat] = arr;
    renderBuilder();
  }

  function renderPacks() {
    var host = document.getElementById('nbx-packs');
    if (!host) return;
    host.innerHTML = PACKS.map(function (p) {
      var slotN = 0;
      Object.keys(p.slots).forEach(function (k) { slotN += p.slots[k]; });
      return (
        '<button type="button" class="nbx-pack' + (p.id === state.packId ? ' is-on' : '') + '" data-pack="' + p.id + '" style="--pack-c:' + p.color + '">' +
          '<p class="circle"><span>' + p.circle + ' circle</span><span class="tier">' + (p.tier || '') + '</span></p>' +
          '<h3>' + p.name + '</h3>' +
          '<p class="days">' + p.days + ' · ' + slotN + ' slots</p>' +
          '<p>' + p.blurb + '</p>' +
        '</button>'
      );
    }).join('');
    host.querySelectorAll('[data-pack]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.packId = btn.getAttribute('data-pack');
        ensurePicks();
        renderPacks();
        renderBuilder();
      });
    });
  }

  function renderSizeRow() {
    var host = document.getElementById('nbx-size-row');
    if (!host) return;
    host.innerHTML =
      '<span class="lbl">Dog size</span>' +
      SIZES.map(function (sz) {
        return (
          '<button type="button" class="nbx-size' + (sz === state.dogSize ? ' is-on' : '') + '" data-size="' + sz + '" aria-pressed="' + (sz === state.dogSize ? 'true' : 'false') + '">' +
            sz + ' · ' + SIZE_LABEL[sz] +
          '</button>'
        );
      }).join('') +
      '<p class="nbx-size-hint">Catalog filters to ' + SIZE_LABEL[state.dogSize].toLowerCase() + ' dogs. Switch size anytime; unfit picks drop off.</p>';
    host.querySelectorAll('[data-size]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = btn.getAttribute('data-size');
        if (!next || next === state.dogSize) return;
        state.dogSize = next;
        prunePicksForSize();
        renderSizeRow();
        renderBuilder();
      });
    });
  }

  function renderReceipt() {
    var host = document.getElementById('nbx-receipt');
    if (!host) return;
    var rows = lineItems();
    var total = estTotal();
    var sizeLabel = SIZE_LABEL[state.dogSize] || state.dogSize;
    var body;
    if (!rows.length) {
      body = '<p class="rc-empty">Fill slots to see a sample receipt. Design estimates only.</p>';
    } else {
      body =
        '<table>' +
          '<thead><tr><th>Item</th><th style="text-align:right">Est.</th></tr></thead>' +
          '<tbody>' +
            rows.map(function (r) {
              return (
                '<tr>' +
                  '<td>' + r.emoji + ' ' + r.name +
                    '<span class="meta">' + r.catLabel + (r.partnerLabel ? ' · ' + r.partnerLabel : '') + '</span>' +
                  '</td>' +
                  '<td class="amt">$' + r.est + '</td>' +
                '</tr>'
              );
            }).join('') +
            '<tr class="total-row"><td>Sample pack total (' + sizeLabel + ')</td><td class="amt">$' + total + '</td></tr>' +
          '</tbody>' +
        '</table>';
    }
    host.innerHTML =
      '<h4>Receipt mock · design ledger</h4>' +
      '<p class="rc-sub">' + pack().name + ' · size ' + sizeLabel + ' · mock USD · not a charge</p>' +
      body +
      '<p class="rc-truth">Design estimates only. Live prices from partner shops when rails open. Receipts public or the rail is not live.</p>';
  }

  function renderBuilder() {
    var p = pack();
    var catsHost = document.getElementById('nbx-cats');
    var box = document.getElementById('nbx-box');
    var meter = document.getElementById('nbx-meter-fill');
    var meterLabel = document.getElementById('nbx-meter-label');
    var includes = document.getElementById('nbx-includes');
    var previewSub = document.getElementById('nbx-preview-sub');
    if (!catsHost) return;

    renderSizeRow();

    var html = '';
    CATEGORY_ORDER.forEach(function (cat) {
      if (!p.slots[cat] || !CATALOG[cat]) return;
      var meta = CATALOG[cat];
      var max = p.slots[cat];
      var selected = state.picks[cat] || [];
      var opts = optionsForSize(cat);
      html +=
        '<div class="nbx-cat" data-cat="' + cat + '">' +
          '<div class="nbx-cat-head">' +
            '<h3>' + meta.emoji + ' ' + meta.label + '</h3>' +
            '<span class="slot">' + selected.length + ' / ' + max + ' pick' + (max > 1 ? 's' : '') + '</span>' +
          '</div>' +
          '<div class="nbx-opts">' +
            (opts.length ? opts.map(function (o) {
              var on = selected.indexOf(o.id) >= 0;
              return (
                '<button type="button" class="nbx-opt' + (on ? ' is-on' : '') + '" data-cat="' + cat + '" data-opt="' + o.id + '">' +
                  '<span class="em" aria-hidden="true">' + meta.emoji + '</span>' +
                  '<span><strong>' + o.name + '</strong><span>' + o.note + '</span>' +
                  '<span class="partner">' + (o.partnerLabel || o.partner) + '</span>' +
                  '<span class="est">Design est. $' + o.est + '</span></span>' +
                '</button>'
              );
            }).join('') : '<p class="nbx-truth" style="margin:0">No options for size ' + state.dogSize + ' in this slot yet.</p>') +
          '</div>' +
        '</div>';
    });
    catsHost.innerHTML = html;
    catsHost.querySelectorAll('[data-opt]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        togglePick(btn.getAttribute('data-cat'), btn.getAttribute('data-opt'));
      });
    });

    var chips = [];
    Object.keys(state.picks).forEach(function (cat) {
      (state.picks[cat] || []).forEach(function (id) {
        var o = findOpt(cat, id);
        if (o) chips.push('<span class="nbx-chip">' + (CATALOG[cat].emoji || '') + ' ' + o.name + '</span>');
      });
    });
    if (box) {
      if (chips.length) {
        box.classList.remove('empty');
        box.classList.add('is-filling');
        box.innerHTML = chips.join('');
      } else {
        box.classList.add('empty');
        box.classList.remove('is-filling');
        box.innerHTML = 'Empty stack. Specify every slot. Incomplete stacks are how permanent homes die.';
      }
    }
    var f = fillCount();
    if (meter) meter.style.width = f.pct + '%';
    if (meterLabel) {
      var loveLine = f.pct >= 100
        ? 'Stack complete. Spec ready for one permanent home.'
        : f.pct >= 50
          ? 'Past halfway. Finish the protocol. No half-measures.'
          : 'Spec progress: ' + f.filled + ' / ' + f.total + ' slots.';
      meterLabel.textContent = loveLine + ' · ' + p.name + ' · ' +
        (SIZE_LABEL[state.dogSize] || state.dogSize) + ' · design est. $' + estTotal();
    }
    if (includes) {
      includes.innerHTML = p.includes.map(function (x) { return '<li>' + x + '</li>'; }).join('');
    }
    if (previewSub) {
      previewSub.textContent = (p.tier || p.circle) + ' · size ' +
        (SIZE_LABEL[state.dogSize] || state.dogSize) +
        ' · design intent · not checkout';
    }
    renderReceipt();
  }

  function studioHtml() {
    return (
      '<div class="nbx-section">' +
        '<div class="nbx-head">' +
          '<h2>Specify the full stack</h2>' +
          '<p>You are not writing a donation tweet. You are authoring the bill of materials for a permanent home under real constraints. When capital and partners land, this spec becomes procurement. Incomplete stacks are how forever dies in week one.</p>' +
        '</div>' +
        '<div class="nbx-soul">' +
          '<p class="tag">Thesis · non-negotiable</p>' +
          '<h3>Failed adoptions are a systems problem. Solve the stack or accept the churn.</h3>' +
          '<p>Day one: love peaks. Day three: friction peaks. Bed, food, crate, training, insurance, vet buffer. <strong>Ready house × real love = permanent home.</strong> That is the product. Scale it and you permanently reduce returns to shelter. That is civilization-grade leverage, not charity cosplay.</p>' +
        '</div>' +
        '<div class="nbx-flight" aria-label="Protocol flight plan">' +
          '<div class="nbx-flight-step"><p class="n">01 · Diagnose</p><h4>Break the loop</h4><p>Shelter → home → fail → shelter. Attack day three, not the eulogy.</p></div>' +
          '<div class="nbx-flight-step"><p class="n">02 · Spec</p><h4>Full stack pack</h4><p>30 / 60 / 90 day depth. Every slot filled. No half-measures.</p></div>' +
          '<div class="nbx-flight-step"><p class="n">03 · Rails</p><h4>Transparent buy</h4><p>Give-back partners. Published cut. Public receipt. Or it does not ship.</p></div>' +
          '<div class="nbx-flight-step"><p class="n">04 · Compound</p><h4>Permanent home</h4><p>Bond holds. Flywheel turns. Next unit funds the next forever.</p></div>' +
        '</div>' +
        '<div class="nbx-cherish" aria-label="Design principles">' +
          '<div class="nbx-cherish-card"><p class="k">First principles</p><p>Strip narrative. What does a dog need to stay home 30, 60, 90 days? Build only that. Kill the rest.</p></div>' +
          '<div class="nbx-cherish-card"><p class="k">Mechanism</p><p>Trust is an engineering constraint. Partners. Receipts. Zero opaque skim. If you cannot show the books, you do not own the story.</p></div>' +
          '<div class="nbx-cherish-card"><p class="k">Unit of impact</p><p>One dog + one human + gear that makes forever affordable. Atom of the system. Stack atoms. Change the curve.</p></div>' +
        '</div>' +
        '<div class="nbx-anti">' +
          '<h4>Anti-goals · we will not ship these</h4>' +
          '<ul>' +
            '<li>Feel-good pages that never fund a bed</li>' +
            '<li>Mystery markups with no public ledger</li>' +
            '<li>"100% of dollars" claims without books</li>' +
            '<li>Half packs that pretend week one is optional</li>' +
          '</ul>' +
        '</div>' +
        '<div class="nbx-packs" id="nbx-packs"></div>' +
        '<div class="nbx-size-row" id="nbx-size-row" role="group" aria-label="Dog size"></div>' +
        '<div class="nbx-build">' +
          '<div class="nbx-cats" id="nbx-cats"></div>' +
          '<div class="nbx-preview" id="nbx-preview">' +
            '<h3>Live pack spec</h3>' +
            '<p class="sub" id="nbx-preview-sub"></p>' +
            '<div class="nbx-box" id="nbx-box"></div>' +
            '<div class="nbx-meter"><i id="nbx-meter-fill"></i></div>' +
            '<p class="nbx-meter-label" id="nbx-meter-label"></p>' +
            '<ul class="nbx-includes" id="nbx-includes"></ul>' +
            '<div class="nbx-receipt" id="nbx-receipt" aria-live="polite"></div>' +
            '<form class="nbx-form" id="nbx-form" style="margin-top:.85rem">' +
              '<label for="nbx-dog">Dog name or shelter ID (optional)</label>' +
              '<input id="nbx-dog" placeholder="e.g. Mochi, or kennel #12">' +
              '<label for="nbx-donor">Your name or handle</label>' +
              '<input id="nbx-donor" required placeholder="Control signal when rails go live">' +
              '<label for="nbx-note">Note for the family (optional)</label>' +
              '<textarea id="nbx-note" placeholder="House ready. Mission: permanent bond."></textarea>' +
              '<button type="submit" class="nbx-cta" id="nbx-submit">Commit pack intent</button>' +
              '<div class="nbx-status" id="nbx-status" role="status"></div>' +
              '<p class="nbx-truth">Design studio only<span class="info-icon" data-term="design only" role="button" tabindex="0" aria-label="Plain language: design only">ⓘ</span>. Local device. No charge. Live path: give-back partners + public receipts<span class="info-icon" data-term="public receipts" role="button" tabindex="0" aria-label="Plain language: public receipts">ⓘ</span>. Ambition with proof<span class="info-icon" data-term="proof over promises" role="button" tabindex="0" aria-label="Plain language: proof over promises">ⓘ</span>.</p>' +
            '</form>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function shopHtml() {
    var partnerCards = PARTNERS.map(function (p) {
      var link = p.url
        ? '<a href="' + p.url + '" target="_blank" rel="noopener noreferrer">Visit site ↗</a>'
        : '<span style="font-size:.72rem;color:rgba(186,230,253,.5)">List when signed</span>';
      return (
        '<article class="nbx-partner">' +
          '<span class="badge">' + p.note + '</span>' +
          '<h4>' + p.name + '</h4>' +
          '<p class="focus">' + p.focus + '</p>' +
          '<p class="give">Give-back path: ' + p.give + '</p>' +
          link +
        '</article>'
      );
    }).join('');
    return (
      '<div class="nbx-section">' +
        '<div class="nbx-head">' +
          '<h2>Procurement rails</h2>' +
          '<p>Capital allocation under hard constraints. Prefer markets that already return value to animal welfare. Publish the partner. Publish the cut. Publish the receipt. If any of those three is missing, the rail is not live.</p>' +
        '</div>' +
        '<div class="nbx-soul" style="margin-bottom:1rem">' +
          '<p class="tag">Mechanism design</p>' +
          '<h3>Price discovery on the market. Trust discovery on the ledger.</h3>' +
          '<p>We do not invent a private storefront to capture margin by default. We route through give-back partners when possible, keep books public when live, and treat donor trust as non-fungible capital. <strong>Lose the books, lose the right to the mission.</strong></p>' +
        '</div>' +
        '<div class="nbx-shop">' +
          '<h3>Default rail: give-back partner shops</h3>' +
          '<p>Buy from businesses that already donate a cut to animal welfare, or that will contract to do so for New Beginnings. Market prices. Program transparency.</p>' +
          '<ul>' +
            '<li>Named partners and product links</li>' +
            '<li>Published % or $ returned to rescue / this program</li>' +
            '<li>No "100% of dollars" claims without books that prove it</li>' +
          '</ul>' +
          '<div class="nbx-partners">' + partnerCards + '</div>' +
          '<p class="nbx-truth" style="margin-top:.75rem">Shortlist only. Not signed contracts. Candidates until MOU + receipt pipeline exists.</p>' +
        '</div>' +
        '<div class="nbx-shop" style="margin-top:.75rem;border-color:rgba(253,230,138,.3)">' +
          '<h3>Optional later: first-party SHH shop</h3>' +
          '<p>Only if <strong>every dollar of product margin after cost routes back into New Beginnings</strong> (or the wider flywheel) with public ledgers. Looks like a side hustle? Kill it. Stay with partners.</p>' +
          '<ul>' +
            '<li>Yes: fulfillment + open books</li>' +
            '<li>No: private markup</li>' +
            '<li>Now: design studio. Intent only.</li>' +
          '</ul>' +
        '</div>' +
        '<p class="nbx-truth">No products sold on this page. Spec first. Buy when rails open. That discipline is the product.</p>' +
      '</div>'
    );
  }

  function moreHtml() {
    return (
      '<div class="nbx-section">' +
        '<div class="nbx-head">' +
          '<h2>Why this must exist</h2>' +
          '<p>Week one is where love peaks and friction peaks. Returns track missing gear, missing cash buffer, and missing training path far more often than missing affection. This protocol makes permanence rational for a real household with a real budget.</p>' +
        '</div>' +
        '<div class="nbx-soul" style="margin-bottom:1.15rem">' +
          '<p class="tag">Mission · high leverage good</p>' +
          '<h3>Infrastructure for a shared life between one dog and one human.</h3>' +
          '<p>Not a weekend vibe. A permanent companion bond. <strong>You fund start conditions. They live the compounding for years.</strong> That is high-leverage good. It is also one node in a 30-program flywheel. People helping people. Helping dogs. At system scale. That is the biggest thing we know how to build without lying about the rails.</p>' +
        '</div>' +
        '<div class="nbx-cherish" style="margin-bottom:1.25rem">' +
          '<div class="nbx-cherish-card"><p class="k">Problem</p><p>Shelter in → home out → home fails → shelter again. Break the loop at day three. Everything else is coping.</p></div>' +
          '<div class="nbx-cherish-card"><p class="k">Scale</p><p>Thirty programs. One flywheel. Each permanent home is a unit that compounds mercy instead of churning inventory.</p></div>' +
          '<div class="nbx-cherish-card"><p class="k">Truth</p><p>Design until funded<span class="info-icon" data-term="when funded" role="button" tabindex="0" aria-label="Plain language: when funded">ⓘ</span>. Receipts when live. Ambition without proof is noise. We refuse the noise. Full stop<span class="info-icon" data-term="new beginnings" role="button" tabindex="0" aria-label="Plain language: new beginnings">ⓘ</span>.</p></div>' +
        '</div>' +
        '<div class="nbx-anti" style="margin-bottom:1.25rem">' +
          '<h4>North star (honest)</h4>' +
          '<ul>' +
            '<li>Every adopted dog leaves with a funded soft-landing protocol when rails are live</li>' +
            '<li>Zero preventable returns from a missing week-one stack</li>' +
            '<li>Every dollar path inspectable by a stranger on the internet</li>' +
            '<li>Stack units until the return loop is an edge case, not the culture</li>' +
          '</ul>' +
        '</div>' +
        '<div class="nbx-more">' +
          '<a class="nbx-link" href="pay-it-forward.html"><h3>Pay It Forward</h3><p>Adoption chains that keep the flywheel turning after home one sticks.</p></a>' +
          '<a class="nbx-link" href="golden-paws.html"><h3>Golden Paws</h3><p>Senior placement protocol. Forever homes under harder constraints.</p></a>' +
          '<a class="nbx-link" href="healing-hearts.html"><h3>Healing Hearts</h3><p>Therapy network when the bond becomes service of another kind.</p></a>' +
          '<a class="nbx-link" href="shelters.html"><h3>Beautiful Souls</h3><p>Roster of dogs still waiting for a permanent human.</p></a>' +
          '<a class="nbx-link" href="all-programs.html"><h3>All 30 programs</h3><p>Full system map. The rest of the flywheel architecture.</p></a>' +
          '<a class="nbx-link" href="programs/new-beginnings-home-start-packs.html"><h3>Classic program card</h3><p>Circles copy and video on the standard program page.</p></a>' +
        '</div>' +
      '</div>'
    );
  }

  function wireForm() {
    var form = document.getElementById('nbx-form');
    if (!form) return;
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var f = fillCount();
      var status = document.getElementById('nbx-status');
      if (f.filled < f.total) {
        if (status) {
          status.textContent = 'REJECT: incomplete stack ' + f.filled + '/' + f.total +
            '. Half packs are how permanent homes die. Finish every slot.';
        }
        return;
      }
      var items = lineItems();
      var payload = {
        program: 'new-beginnings',
        packId: state.packId,
        packName: pack().name,
        dogSize: state.dogSize,
        dogSizeLabel: SIZE_LABEL[state.dogSize] || state.dogSize,
        picks: JSON.parse(JSON.stringify(state.picks)),
        lineItems: items,
        estTotalUsd: estTotal(),
        dogName: (document.getElementById('nbx-dog') || {}).value || '',
        donorName: (document.getElementById('nbx-donor') || {}).value || '',
        note: (document.getElementById('nbx-note') || {}).value || '',
        at: new Date().toISOString(),
        truth: 'design-intent-only-est-not-a-charge'
      };
      try {
        var key = 'shh_new_beginnings_packs';
        var prev = [];
        try { prev = JSON.parse(localStorage.getItem(key) || '[]'); } catch (e1) { prev = []; }
        if (!Array.isArray(prev)) prev = [];
        prev.push(payload);
        localStorage.setItem(key, JSON.stringify(prev.slice(-40)));
      } catch (e2) { /* private mode */ }
      if (status) {
        var who = (payload.dogName || '').trim();
        status.textContent = 'COMMITTED: ' + pack().name + ' · ' +
          (who || 'unnamed dog') +
          ' · ' + (SIZE_LABEL[state.dogSize] || state.dogSize) +
          ' · design est. $' + estTotal() +
          '. Local only. No charge. Live path: partner buy + public receipts. You just authored the first step of a permanent home.';
      }
    });
  }

  function buildPanels() {
    var host = document.getElementById('nbx-panel-host');
    if (!host) return;
    var hero = document.querySelector('header.nb-hero');

    function panel(id, html, nodes) {
      var p = document.createElement('div');
      p.className = 'nbx-panel' + (id === 'heart' ? ' is-on' : '');
      p.setAttribute('data-nbx-panel', id);
      if (html) {
        var w = document.createElement('div');
        w.innerHTML = html;
        while (w.firstChild) p.appendChild(w.firstChild);
      }
      (nodes || []).forEach(function (n) { if (n) p.appendChild(n); });
      return p;
    }

    var quick = document.createElement('div');
    quick.className = 'nbx-quick';
    quick.innerHTML =
      '<button type="button" class="pri" data-nbx-go="build">Open protocol</button>' +
      '<button type="button" data-nbx-go="shop">Rails</button>' +
      '<button type="button" data-nbx-go="more">Mission</button>';

    var heartNodes = [hero, quick].filter(Boolean);
    if (hero && hero.parentNode) hero.parentNode.removeChild(hero);

    host.appendChild(panel('heart', null, heartNodes));
    host.appendChild(panel('build', studioHtml()));
    host.appendChild(panel('shop', shopHtml()));
    host.appendChild(panel('more', moreHtml()));
  }

  function inject() {
    styles();
    document.body.classList.add('nbx-panels');
    if (isMobile()) document.body.classList.add('nbx-mobile');
    ensurePicks();

    if (!document.querySelector('.nbx-progress')) {
      var bar = document.createElement('div');
      bar.className = 'nbx-progress';
      document.body.appendChild(bar);
      var tick = false;
      window.addEventListener('scroll', function () {
        if (!tick) {
          tick = true;
          requestAnimationFrame(function () {
            tick = false;
            var h = document.documentElement;
            var max = h.scrollHeight - h.clientHeight;
            bar.style.width = max > 0 ? ((h.scrollTop / max) * 100).toFixed(1) + '%' : '0%';
          });
        }
      }, { passive: true });
    }

    if (isMobile() && !document.querySelector('.nbx-mtop')) {
      var m = document.createElement('div');
      m.innerHTML =
        '<div class="nbx-mtop"><a href="index.html"><img src="assets/logos/shibahumanityhublogo3d-new.jpg" width="30" height="30" alt=""><span>NEW BEGINNINGS</span></a><span style="font-size:.5rem;letter-spacing:.1em;text-transform:uppercase;color:#fde68a;border:1px solid rgba(253,230,138,.4);padding:.25rem .5rem;border-radius:999px">Infra</span></div>' +
        '<nav class="nbx-mtabs" aria-label="New Beginnings mobile">' +
          '<button type="button" class="nbx-mtab is-on" data-tab="heart"><span class="ic">◆</span>Thesis</button>' +
          '<button type="button" class="nbx-mtab" data-tab="build"><span class="ic">⚙</span>Spec</button>' +
          '<button type="button" class="nbx-mtab" data-tab="shop"><span class="ic">$</span>Rails</button>' +
          '<button type="button" class="nbx-mtab" data-tab="more"><span class="ic">→</span>Mission</button>' +
        '</nav>';
      while (m.firstChild) document.body.insertBefore(m.firstChild, document.body.firstChild);
    }

    if (!document.getElementById('nbx-rail')) {
      var rail = document.createElement('nav');
      rail.className = 'nbx-rail';
      rail.id = 'nbx-rail';
      rail.innerHTML =
        '<button type="button" class="is-on" data-nbx-go="heart">Thesis</button>' +
        '<button type="button" data-nbx-go="build">Spec the pack</button>' +
        '<button type="button" data-nbx-go="shop">Procurement rails</button>' +
        '<button type="button" data-nbx-go="more">Mission</button>';
      var nav = document.querySelector('body > nav');
      if (nav && nav.nextSibling) document.body.insertBefore(rail, nav.nextSibling);
      else document.body.insertBefore(rail, document.body.firstChild);
    }

    if (!document.getElementById('nbx-panel-host')) {
      var host = document.createElement('div');
      host.id = 'nbx-panel-host';
      var footer = document.querySelector('footer');
      if (footer) document.body.insertBefore(host, footer);
      else document.body.appendChild(host);
      buildPanels();
    }

    document.querySelectorAll('.nbx-mtab').forEach(function (t) {
      t.addEventListener('click', function () { goTab(t.getAttribute('data-tab')); });
    });
    bindGo(document);
    renderPacks();
    renderBuilder();
    wireForm();
    document.body.classList.add('nbx-ready');

    document.querySelectorAll('a[href="#nbx-build"], a[href="#build"]').forEach(function (a) {
      a.addEventListener('click', function (ev) {
        ev.preventDefault();
        goTab('build');
      });
    });

    var hash = (location.hash || '').replace(/^#/, '');
    if (hash.indexOf('nbx-') === 0) goTab(hash.replace('nbx-', ''));
    else if (hash === 'build' || hash === 'pack') goTab('build');
    else if (hash === 'shop') goTab('shop');
    else goTab('heart');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
  else inject();
})();
