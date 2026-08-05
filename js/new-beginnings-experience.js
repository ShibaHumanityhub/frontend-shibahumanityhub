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
      blurb: 'The must-haves so adoption week does not break the bank.',
      color: '#34d399',
      slots: {
        bed: 1, leash: 1, collar: 1, food: 1, toys: 2, crate: 1, extras: 1
      },
      includes: ['Microchip registration support (when live)', 'Welcome care card for the family']
    },
    {
      id: 'settle',
      name: 'Settle-In Pack',
      circle: 'Guardian',
      days: 'First 60 days',
      blurb: 'Everything in Starter, plus training and insurance breathing room.',
      color: '#38bdf8',
      slots: {
        bed: 1, leash: 1, collar: 1, food: 1, toys: 3, crate: 1, training: 1, insurance: 1, extras: 2
      },
      includes: ['6 weeks training voucher (design)', '60 days pet insurance buffer (design)', 'Microchip support']
    },
    {
      id: 'launch',
      name: 'Full Launch Pack',
      circle: 'Eternal',
      days: 'First 90 days',
      blurb: 'The big send-off. Soft landing + safety net for the whole first season.',
      color: '#fbbf24',
      slots: {
        bed: 1, leash: 1, collar: 1, food: 1, toys: 4, crate: 1, training: 1, insurance: 1, camera: 1, vet: 1, extras: 3
      },
      includes: ['90-day check-in webcam option (design)', 'Emergency vet buffer (design)', 'Full settle support']
    }
  ];

  /* Catalog: partner shops preferred (give-back). Future SHH shop only if 100% of margin to program + public receipts. */
  var CATALOG = {
    bed: {
      label: 'Bed',
      emoji: '🛏️',
      options: [
        { id: 'bed-soft', name: 'Cloud nest bed', note: 'Machine-washable, soft for first nights', partner: 'Give-back partner (design)' },
        { id: 'bed-ortho', name: 'Ortho bolster bed', note: 'Joints and deep sleepers', partner: 'Give-back partner (design)' },
        { id: 'bed-travel', name: 'Travel crate mat', note: 'Rides + crate calm', partner: 'Give-back partner (design)' }
      ]
    },
    leash: {
      label: 'Leash',
      emoji: '🦮',
      options: [
        { id: 'leash-standard', name: '6 ft everyday leash', note: 'Solid first walks', partner: 'Give-back partner (design)' },
        { id: 'leash-handsfree', name: 'Hands-free walk belt', note: 'Hands free for treats and keys', partner: 'Give-back partner (design)' },
        { id: 'leash-traffic', name: 'Short traffic lead', note: 'City doors and cars', partner: 'Give-back partner (design)' }
      ]
    },
    collar: {
      label: 'Collar',
      emoji: '✨',
      options: [
        { id: 'col-id', name: 'ID collar + tags blank', note: 'Ready for name and number', partner: 'Give-back partner (design)' },
        { id: 'col-break', name: 'Breakaway safety collar', note: 'Safer for some home setups', partner: 'Give-back partner (design)' },
        { id: 'col-harness', name: 'Step-in harness', note: 'No neck pressure for nervous dogs', partner: 'Give-back partner (design)' }
      ]
    },
    food: {
      label: 'Food start',
      emoji: '🥣',
      options: [
        { id: 'food-gentle', name: 'Gentle transition kibble', note: 'First two weeks stomach soft', partner: 'Give-back partner (design)' },
        { id: 'food-pup', name: 'Puppy growth bag', note: 'For young forever kids', partner: 'Give-back partner (design)' },
        { id: 'food-senior', name: 'Senior joint formula', note: 'Older greys starting over', partner: 'Give-back partner (design)' }
      ]
    },
    toys: {
      label: 'Toys',
      emoji: '🧸',
      options: [
        { id: 'toy-kong', name: 'Stuffable rubber toy', note: 'Busy brain, less stress', partner: 'Give-back partner (design)' },
        { id: 'toy-rope', name: 'Rope tug', note: 'Bond games with people', partner: 'Give-back partner (design)' },
        { id: 'toy-puzzle', name: 'Slow puzzle feeder', note: 'Calm meals', partner: 'Give-back partner (design)' },
        { id: 'toy-plush', name: 'Soft comfort plush', note: 'Quiet cuddle option', partner: 'Give-back partner (design)' },
        { id: 'toy-ball', name: 'Chase ball set', note: 'Yard and hallway energy', partner: 'Give-back partner (design)' }
      ]
    },
    crate: {
      label: 'Crate / den',
      emoji: '🏠',
      options: [
        { id: 'crate-wire', name: 'Fold wire crate', note: 'Classic den with cover', partner: 'Give-back partner (design)' },
        { id: 'crate-soft', name: 'Soft-sided travel den', note: 'Light homes and trips', partner: 'Give-back partner (design)' },
        { id: 'crate-furniture', name: 'Furniture-style den', note: 'Looks like home, feels safe', partner: 'Give-back partner (design)' }
      ]
    },
    training: {
      label: 'Training',
      emoji: '🎓',
      options: [
        { id: 'train-basic', name: '6-week group basics voucher', note: 'Sit, come, calm leash', partner: 'Local trainer partner (design)' },
        { id: 'train-private', name: '3 private settle sessions', note: 'Fearful or big energy dogs', partner: 'Local trainer partner (design)' },
        { id: 'train-online', name: 'Online settle course pack', note: 'Family learns at home pace', partner: 'Give-back education partner (design)' }
      ]
    },
    insurance: {
      label: 'Insurance buffer',
      emoji: '🛡️',
      options: [
        { id: 'ins-60', name: '60-day accident buffer', note: 'Settle-in peace of mind', partner: 'Insurance partner (design)' },
        { id: 'ins-well', name: 'Wellness starter month', note: 'First exam window help', partner: 'Insurance partner (design)' }
      ]
    },
    camera: {
      label: 'Check-in camera',
      emoji: '📷',
      options: [
        { id: 'cam-plug', name: 'Plug-in room cam', note: 'Optional family check-ins', partner: 'Give-back tech partner (design)' },
        { id: 'cam-none', name: 'Skip camera, boost vet buffer', note: 'Privacy first families', partner: 'Program buffer (design)' }
      ]
    },
    vet: {
      label: 'Emergency vet buffer',
      emoji: '🏥',
      options: [
        { id: 'vet-standard', name: 'Standard emergency buffer', note: 'Unexpected first-month care', partner: 'Program held (design)' },
        { id: 'vet-boost', name: 'Boosted emergency buffer', note: 'Higher needs adoptees', partner: 'Program held (design)' }
      ]
    },
    extras: {
      label: 'Extras',
      emoji: '🎁',
      options: [
        { id: 'ex-bowls', name: 'Steel bowl set', note: 'Water + food', partner: 'Give-back partner (design)' },
        { id: 'ex-waste', name: 'Waste bag starter', note: 'Walks from day one', partner: 'Give-back partner (design)' },
        { id: 'ex-treats', name: 'Training treat pouch', note: 'Reward good choices', partner: 'Give-back partner (design)' },
        { id: 'ex-blanket', name: 'Soft home blanket', note: 'Shelter scent swap helper', partner: 'Give-back partner (design)' },
        { id: 'ex-book', name: 'First-week family guide', note: 'What to expect nights 1-7', partner: 'Program print (design)' }
      ]
    }
  };

  var CATEGORY_ORDER = ['bed', 'leash', 'collar', 'food', 'toys', 'crate', 'training', 'insurance', 'camera', 'vet', 'extras'];

  var state = {
    packId: 'settle',
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
      'body.nbx-panels .nbx-panel.is-on{display:block;animation:nbx-in .2s ease}',
      '@keyframes nbx-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}',
      '.nbx-rail{position:sticky;top:0;z-index:55;display:flex;gap:.3rem;padding:.5rem max(.7rem,env(safe-area-inset-left));overflow-x:auto;scrollbar-width:none;background:rgba(6,16,24,.97);border-bottom:1px solid var(--nb-line);justify-content:flex-start}',
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
      '.nbx-head p{margin:0;font-size:.9rem;line-height:1.5;color:rgba(186,230,253,.78);max-width:42rem}',
      /* Pack pick */
      '.nbx-packs{display:grid;gap:.65rem;grid-template-columns:1fr;margin:1.1rem 0 1.25rem}',
      '@media(min-width:700px){.nbx-packs{grid-template-columns:repeat(3,1fr)}}',
      '.nbx-pack{text-align:left;border-radius:1.25rem;border:1px solid rgba(125,211,252,.28);background:linear-gradient(160deg,rgba(125,211,252,.1),rgba(6,16,24,.95));padding:1.1rem 1rem;cursor:pointer;font:inherit;color:inherit;transition:transform .18s,border-color .18s,box-shadow .18s;position:relative;overflow:hidden}',
      '.nbx-pack::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:var(--pack-c,#7dd3fc);opacity:.85}',
      '.nbx-pack.is-on{border-color:rgba(253,230,138,.55);box-shadow:0 0 40px -12px rgba(125,211,252,.45);transform:translateY(-2px)}',
      '.nbx-pack .circle{font-size:.55rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(253,230,138,.8);margin:0 0 .25rem}',
      '.nbx-pack h3{font-family:"Space Grotesk",sans-serif;margin:0 0 .2rem;font-size:1.2rem;color:#f0f9ff}',
      '.nbx-pack .days{font-size:.72rem;color:#6ee7b7;margin:0 0 .4rem}',
      '.nbx-pack p{margin:0;font-size:.8rem;line-height:1.4;color:rgba(186,230,253,.75)}',
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
      /* Preview box */
      '.nbx-preview{position:sticky;top:3.5rem;border-radius:1.4rem;border:1px solid rgba(253,230,138,.35);background:linear-gradient(165deg,rgba(253,230,138,.12),rgba(6,16,24,.98));padding:1.15rem 1.05rem;box-shadow:0 24px 60px -24px rgba(0,0,0,.75),inset 0 1px 0 rgba(255,255,255,.08)}',
      '.nbx-preview h3{font-family:"Space Grotesk",sans-serif;margin:0 0 .35rem;color:#fde68a;font-size:1.15rem}',
      '.nbx-preview .sub{font-size:.78rem;color:rgba(186,230,253,.7);margin:0 0 .85rem;line-height:1.4}',
      '.nbx-box{border-radius:1.1rem;border:2px dashed rgba(125,211,252,.35);background:rgba(0,0,0,.25);padding:.85rem;min-height:180px;margin-bottom:.85rem}',
      '.nbx-box.empty{display:flex;align-items:center;justify-content:center;color:rgba(186,230,253,.45);font-size:.82rem;text-align:center;padding:1.5rem}',
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
      'body.nbx-mobile header.nb-hero{padding:3.3rem .7rem .75rem!important}',
      'body.nbx-mobile .nbx-hide-m{display:none!important}',
      'body.nbx-mobile .nbx-preview{position:relative;top:0}',
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
      return (
        '<button type="button" class="nbx-pack' + (p.id === state.packId ? ' is-on' : '') + '" data-pack="' + p.id + '" style="--pack-c:' + p.color + '">' +
          '<p class="circle">' + p.circle + ' circle</p>' +
          '<h3>' + p.name + '</h3>' +
          '<p class="days">' + p.days + '</p>' +
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

  function renderBuilder() {
    var p = pack();
    var catsHost = document.getElementById('nbx-cats');
    var box = document.getElementById('nbx-box');
    var meter = document.getElementById('nbx-meter-fill');
    var meterLabel = document.getElementById('nbx-meter-label');
    var includes = document.getElementById('nbx-includes');
    var previewSub = document.getElementById('nbx-preview-sub');
    if (!catsHost) return;

    var html = '';
    CATEGORY_ORDER.forEach(function (cat) {
      if (!p.slots[cat] || !CATALOG[cat]) return;
      var meta = CATALOG[cat];
      var max = p.slots[cat];
      var selected = state.picks[cat] || [];
      html +=
        '<div class="nbx-cat" data-cat="' + cat + '">' +
          '<div class="nbx-cat-head">' +
            '<h3>' + meta.emoji + ' ' + meta.label + '</h3>' +
            '<span class="slot">' + selected.length + ' / ' + max + ' pick' + (max > 1 ? 's' : '') + '</span>' +
          '</div>' +
          '<div class="nbx-opts">' +
            meta.options.map(function (o) {
              var on = selected.indexOf(o.id) >= 0;
              return (
                '<button type="button" class="nbx-opt' + (on ? ' is-on' : '') + '" data-cat="' + cat + '" data-opt="' + o.id + '">' +
                  '<span class="em" aria-hidden="true">' + meta.emoji + '</span>' +
                  '<span><strong>' + o.name + '</strong><span>' + o.note + '</span><span class="partner">' + o.partner + '</span></span>' +
                '</button>'
              );
            }).join('') +
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
      box.innerHTML = chips.length ? chips.join('') : '<div class="empty">Your open pack is empty. Tap items to fill the slots. Make it fun. Make it theirs.</div>';
      if (chips.length) box.classList.remove('empty');
    }
    var f = fillCount();
    if (meter) meter.style.width = f.pct + '%';
    if (meterLabel) meterLabel.textContent = f.filled + ' of ' + f.total + ' slots filled · ' + p.name + ' (' + p.days + ')';
    if (includes) {
      includes.innerHTML = p.includes.map(function (x) { return '<li>' + x + '</li>'; }).join('');
    }
    if (previewSub) {
      previewSub.textContent = p.circle + ' circle design · pick every slot, then save your pack intent';
    }
  }

  function studioHtml() {
    return (
      '<div class="nbx-section">' +
        '<div class="nbx-head">' +
          '<h2>Build their first home kit</h2>' +
          '<p>Pick a pack size, then choose every toy, bed, leash, and care add-on. You are not dumping cash into a black box. You are packing a real first month for one dog.</p>' +
        '</div>' +
        '<div class="nbx-packs" id="nbx-packs"></div>' +
        '<div class="nbx-build">' +
          '<div class="nbx-cats" id="nbx-cats"></div>' +
          '<div class="nbx-preview" id="nbx-preview">' +
            '<h3>🎁 Open pack preview</h3>' +
            '<p class="sub" id="nbx-preview-sub"></p>' +
            '<div class="nbx-box" id="nbx-box"></div>' +
            '<div class="nbx-meter"><i id="nbx-meter-fill"></i></div>' +
            '<p class="nbx-meter-label" id="nbx-meter-label"></p>' +
            '<ul class="nbx-includes" id="nbx-includes"></ul>' +
            '<form class="nbx-form" id="nbx-form">' +
              '<label for="nbx-dog">Dog name or shelter ID (optional)</label>' +
              '<input id="nbx-dog" placeholder="e.g. Mochi, or kennel #12">' +
              '<label for="nbx-donor">Your name or handle</label>' +
              '<input id="nbx-donor" required placeholder="So we can thank you when rails are live">' +
              '<label for="nbx-note">Note for the family (optional)</label>' +
              '<textarea id="nbx-note" placeholder="Welcome home. You are safe now."></textarea>' +
              '<button type="submit" class="nbx-cta" id="nbx-submit">Save pack intent</button>' +
              '<div class="nbx-status" id="nbx-status" role="status"></div>' +
              '<p class="nbx-truth">Design studio only. Saved on this device. No live checkout yet. When funded, purchases go through give-back partners with receipts, not mystery markups.</p>' +
            '</form>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function shopHtml() {
    return (
      '<div class="nbx-section">' +
        '<div class="nbx-head">' +
          '<h2>Where the stuff comes from</h2>' +
          '<p>You asked for options. Here is the clean way to do it without looking like the program is skimming the gift.</p>' +
        '</div>' +
        '<div class="nbx-shop">' +
          '<h3>Preferred: give-back partner shops</h3>' +
          '<p>Buy from businesses that already donate a cut of every purchase to animal welfare (or that will contract to do so for New Beginnings). We pick decent prices, publish the partner list, and show receipts when live.</p>' +
          '<ul>' +
            '<li>Transparent partner brands and product links</li>' +
            '<li>Published % or $ that returns to rescue / this program</li>' +
            '<li>No fake "100% of your dollars" claims unless the books prove it</li>' +
          '</ul>' +
        '</div>' +
        '<div class="nbx-shop" style="margin-top:.75rem;border-color:rgba(253,230,138,.3)">' +
          '<h3>Optional later: ShibaHumanityHub shop</h3>' +
          '<p>A first-party shop only makes sense if <strong>every dollar of product margin after cost goes back into New Beginnings</strong> (or the wider flywheel), with public books. If that ever looks like a side hustle, we skip it and stay with give-back partners.</p>' +
          '<ul>' +
            '<li>Yes: white-label pack fulfillment + open ledgers</li>' +
            '<li>No: quiet markup that stays in a private pocket</li>' +
            '<li>Until then: this builder is the design. Intent only.</li>' +
          '</ul>' +
        '</div>' +
        '<p class="nbx-truth">This page does not sell products yet. It designs the pack so donors feel the fun of choosing, and so ops knows what to buy when rails open.</p>' +
      '</div>'
    );
  }

  function moreHtml() {
    return (
      '<div class="nbx-section">' +
        '<div class="nbx-head">' +
          '<h2>Why this pack exists</h2>' +
          '<p>The first weeks after adoption are when love is high and budgets get real. Too many good dogs bounce back because the house was not ready. This pack is the soft landing.</p>' +
        '</div>' +
        '<div class="nbx-more">' +
          '<a class="nbx-link" href="pay-it-forward.html"><h3>Pay It Forward</h3><p>Adoption chains that keep mercy moving after the first home.</p></a>' +
          '<a class="nbx-link" href="golden-paws.html"><h3>Golden Paws</h3><p>When seniors need forever homes, not just starter kits.</p></a>' +
          '<a class="nbx-link" href="healing-hearts.html"><h3>Healing Hearts</h3><p>Therapy network for dogs who grow into service of another kind.</p></a>' +
          '<a class="nbx-link" href="programs/new-beginnings-home-start-packs.html"><h3>Classic program card</h3><p>Circles copy and video on the standard program page.</p></a>' +
          '<a class="nbx-link" href="all-programs.html"><h3>All 30 programs</h3><p>Support the full constellation when you are ready.</p></a>' +
          '<a class="nbx-link" href="shelters.html"><h3>Beautiful Souls</h3><p>Meet more dogs waiting for their first real home.</p></a>' +
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
        if (status) status.textContent = 'Fill every slot first (' + f.filled + ' of ' + f.total + '). A half-packed first week is how returns happen.';
        return;
      }
      var payload = {
        program: 'new-beginnings',
        packId: state.packId,
        packName: pack().name,
        picks: JSON.parse(JSON.stringify(state.picks)),
        dogName: (document.getElementById('nbx-dog') || {}).value || '',
        donorName: (document.getElementById('nbx-donor') || {}).value || '',
        note: (document.getElementById('nbx-note') || {}).value || '',
        at: new Date().toISOString(),
        truth: 'design-intent-only'
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
        status.textContent = 'Pack intent saved on this device for ' + pack().name +
          '. Design only. No charge yet. When live, we buy from give-back partners and publish receipts.';
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
      '<button type="button" class="pri" data-nbx-go="build">Build pack</button>' +
      '<button type="button" data-nbx-go="shop">Where we buy</button>' +
      '<button type="button" data-nbx-go="more">Why it matters</button>';

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
        '<div class="nbx-mtop"><a href="index.html"><img src="assets/logos/shibahumanityhublogo3d-new.jpg" width="30" height="30" alt=""><span>NEW BEGINNINGS</span></a><span style="font-size:.5rem;letter-spacing:.1em;text-transform:uppercase;color:#fde68a;border:1px solid rgba(253,230,138,.4);padding:.25rem .5rem;border-radius:999px">Preview</span></div>' +
        '<nav class="nbx-mtabs" aria-label="New Beginnings mobile">' +
          '<button type="button" class="nbx-mtab is-on" data-tab="heart"><span class="ic">♥</span>Heart</button>' +
          '<button type="button" class="nbx-mtab" data-tab="build"><span class="ic">🎁</span>Build</button>' +
          '<button type="button" class="nbx-mtab" data-tab="shop"><span class="ic">🏪</span>Shop</button>' +
          '<button type="button" class="nbx-mtab" data-tab="more"><span class="ic">◆</span>More</button>' +
        '</nav>';
      while (m.firstChild) document.body.insertBefore(m.firstChild, document.body.firstChild);
    }

    if (!document.getElementById('nbx-rail')) {
      var rail = document.createElement('nav');
      rail.className = 'nbx-rail';
      rail.id = 'nbx-rail';
      rail.innerHTML =
        '<button type="button" class="is-on" data-nbx-go="heart">Heart</button>' +
        '<button type="button" data-nbx-go="build">Build pack</button>' +
        '<button type="button" data-nbx-go="shop">Where we buy</button>' +
        '<button type="button" data-nbx-go="more">Why it matters</button>';
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
