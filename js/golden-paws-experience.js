/**
 * Golden Paws Retirement · dedicated match surface
 * Senior service dogs + senior shelter dogs → certified forever homes.
 * Certified = thorough screening + program funds listed (when funded).
 * Truth: roster, matches, and applications are design demos until partners + rails live.
 */
(function () {
  'use strict';

  /* Design roster — replace with real partners + consent when live */
  var HEROES = [
    { id: 'GP-S01', name: 'Captain', kind: 'service', age: 10, breed: 'Lab mix', city: 'Toronto, ON', note: 'Retired mobility work. Soft couch energy. Needs quiet evenings.', needs: 'standard', photo: '🎖️' },
    { id: 'GP-S02', name: 'Scout', kind: 'service', age: 9, breed: 'German Shepherd', city: 'Austin, TX', note: 'Former detection partner. Loves routine walks. Steady with calm adults.', needs: 'standard', photo: '🛡️' },
    { id: 'GP-S03', name: 'Mercy', kind: 'service', age: 11, breed: 'Golden Retriever', city: 'Vancouver, BC', note: 'Therapy-service retiree. Gentle with kids if quiet. Soft joints.', needs: 'higher', photo: '💛' },
    { id: 'GP-S04', name: 'Valor', kind: 'service', age: 8, breed: 'Belgian Malinois mix', city: 'Phoenix, AZ', note: 'Downshifted from high drive. Needs experienced, patient home.', needs: 'higher', photo: '⚔️' },
    { id: 'GP-H01', name: 'Maple', kind: 'shelter', age: 12, breed: 'Beagle mix', city: 'Halifax, NS', note: 'Kennel senior. Still wags for breakfast. Sofa-ready.', needs: 'standard', photo: '🍁' },
    { id: 'GP-H02', name: 'Pearl', kind: 'shelter', age: 11, breed: 'Poodle mix', city: 'Chicago, IL', note: 'Lost her person. Soft eyes. Needs one steady guardian.', needs: 'standard', photo: '🤍' },
    { id: 'GP-H03', name: 'Bruno', kind: 'shelter', age: 13, breed: 'Boxer mix', city: 'Denver, CO', note: 'Grey muzzle, big heart. Meds for joints — covered by program when funded.', needs: 'higher', photo: '🤎' },
    { id: 'GP-H04', name: 'Daisy', kind: 'shelter', age: 10, breed: 'Shepherd mix', city: 'Seattle, WA', note: 'Quiet girl. Loves sun patches. Best as only dog.', needs: 'standard', photo: '🌼' },
    { id: 'GP-H05', name: 'Duke', kind: 'shelter', age: 14, breed: 'Hound mix', city: 'Nashville, TN', note: 'Almost passed over. Still has years of love if someone chooses him.', needs: 'higher', photo: '👑' },
    { id: 'GP-S05', name: 'Halo', kind: 'service', age: 10, breed: 'Collie mix', city: 'Calgary, AB', note: 'Medical-alert retiree. Thrives with calm household and soft structure.', needs: 'standard', photo: '😇' }
  ];

  var SCREEN = [
    { t: 'Background & ID', d: 'Identity check and basic background screen for every adult in the home.' },
    { t: 'Home environment', d: 'Video or in-person look at space, fencing, stairs, other pets, and safety.' },
    { t: 'Lifestyle fit', d: 'Schedule, travel, energy match, and honest talk about senior-dog care.' },
    { t: 'Vet & care plan', d: 'Named vet relationship plan and who handles daily meds or mobility help.' },
    { t: 'Forever commitment', d: 'Written intent: no rehome without program path. Lifetime of this dog.' },
    { t: 'Wellness check-ins', d: 'Agreed photo/video or visit check-ins so the dog stays safe and funded.' }
  ];

  var FUNDS = [
    { circle: 'Mercy', hold: 'Design level', cover: 'Starter retirement home', amount: '$250 / month', items: 'Premium food, basic supplies, routine care buffer for one senior hero' },
    { circle: 'Guardian', hold: 'Design level', cover: 'Full golden care home', amount: '$350–$450 / month', items: 'Higher-needs senior: meds support, mobility aids, extra vet buffer' },
    { circle: 'Eternal', hold: 'Design level', cover: 'Legacy family pod', amount: '$700+ / month', items: 'Two heroes in one home · recognition tied to their stories when live' }
  ];

  var COVERED = [
    'Food & daily supplies for life of the dog (when funded)',
    'Routine + emergency vet buffer per circle level',
    'Adoption fees waived — zero cost forever home model',
    'Soft goods starter kit (bed, bowls, leash) on match',
    'Program check-ins so the dog is never abandoned mid-story'
  ];

  function isMobile() {
    try {
      if (/[?&]desktop=1/i.test(location.search || '')) return false;
      if (/[?&]mobile=1/i.test(location.search || '')) return true;
      return window.matchMedia && window.matchMedia('(max-width: 767px)').matches;
    } catch (e) { return false; }
  }

  function styles() {
    if (document.getElementById('gpx-css')) return;
    var s = document.createElement('style');
    s.id = 'gpx-css';
    s.textContent = [
      ':root{--gp-gold:#fcd34d;--gp-amber:#f59e0b;--gp-warm:#fde68a;--gp-ink:#0a0c10;--gp-line:rgba(252,211,77,.32)}',
      'body.gpx-panels{scroll-behavior:auto}',
      'body.gpx-panels .gpx-panel{display:none;padding-bottom:2rem}',
      'body.gpx-panels .gpx-panel.is-on{display:block;animation:gpx-fade .18s ease}',
      '@keyframes gpx-fade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}',
      '.gpx-rail{position:sticky;top:0;z-index:55;display:flex;gap:.35rem;padding:.5rem .85rem;overflow-x:auto;scrollbar-width:none;background:rgba(8,8,10,.98);border-bottom:1px solid var(--gp-line);justify-content:flex-start}',
      '.gpx-rail::-webkit-scrollbar{display:none}',
      '@media(min-width:900px){.gpx-rail{justify-content:center;flex-wrap:wrap}}',
      '.gpx-rail button{flex:0 0 auto;font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(252,211,77,.5);padding:.42rem .8rem;border-radius:999px;border:1px solid transparent;background:transparent;cursor:pointer;font-family:inherit;font-weight:700}',
      '.gpx-rail button:hover,.gpx-rail button.is-on{color:#fff8e7;border-color:rgba(252,211,77,.5);background:linear-gradient(145deg,rgba(252,211,77,.14),rgba(245,158,11,.08))}',
      'body.gpx-panels:not(.gpx-mobile) header.hero-bg{padding-top:5.5rem!important;padding-bottom:1.5rem!important}',
      '.gpx-section{max-width:72rem;margin:0 auto;padding:1.25rem .85rem 2rem}',
      '@media(min-width:768px){.gpx-section{padding:1.5rem 1.5rem 2.5rem}}',
      '.gpx-head h2{font-family:"Space Grotesk",sans-serif;font-size:clamp(1.4rem,3vw,1.9rem);letter-spacing:-.03em;margin:0 0 .4rem;background:linear-gradient(135deg,#fff,#fcd34d 50%,#f59e0b);-webkit-background-clip:text;background-clip:text;color:transparent}',
      '.gpx-head p{margin:0;font-size:.9rem;color:rgba(253,230,138,.72);max-width:40rem;line-height:1.5}',
      '.gpx-filters{display:flex;flex-wrap:wrap;gap:.4rem;margin:1rem 0 1.1rem}',
      '.gpx-filters button{min-height:42px;padding:.45rem .9rem;border-radius:999px;border:1px solid rgba(252,211,77,.28);background:rgba(0,0,0,.35);color:#fde68a;font-size:.78rem;font-weight:700;font-family:inherit;cursor:pointer}',
      '.gpx-filters button.is-on{background:linear-gradient(135deg,#fde68a,#fcd34d 55%,#f59e0b);color:#1a1200;border-color:transparent}',
      '.gpx-search{width:100%;max-width:28rem;margin:0 0 1rem;padding:.75rem 1rem;border-radius:1rem;border:1px solid rgba(252,211,77,.25);background:rgba(0,0,0,.4);color:#fff;font:inherit}',
      '.gpx-search:focus{outline:none;border-color:rgba(252,211,77,.55)}',
      '.gpx-grid{display:grid;gap:.7rem;grid-template-columns:1fr}',
      '@media(min-width:640px){.gpx-grid{grid-template-columns:1fr 1fr}}',
      '@media(min-width:1000px){.gpx-grid{grid-template-columns:repeat(3,1fr)}}',
      '.gpx-card{text-align:left;border-radius:1.2rem;border:1px solid rgba(252,211,77,.28);background:linear-gradient(155deg,rgba(252,211,77,.1),rgba(12,10,8,.97));padding:1.1rem 1rem;cursor:pointer;font:inherit;color:inherit;transition:transform .2s,border-color .2s,box-shadow .2s;box-shadow:inset 0 1px 0 rgba(255,255,255,.05)}',
      '.gpx-card:hover{transform:translateY(-3px);border-color:rgba(253,230,138,.55);box-shadow:0 0 36px -12px rgba(245,158,11,.4)}',
      '.gpx-card .top{display:flex;justify-content:space-between;align-items:center;gap:.4rem;margin-bottom:.35rem}',
      '.gpx-card .id{font-family:ui-monospace,monospace;font-size:.68rem;color:#fcd34d}',
      '.gpx-card .badge{font-size:.52rem;letter-spacing:.1em;text-transform:uppercase;border:1px solid rgba(252,211,77,.4);padding:.2rem .45rem;border-radius:999px;color:#fde68a}',
      '.gpx-card .badge.service{border-color:rgba(110,231,183,.45);color:#6ee7b7}',
      '.gpx-card .emoji{font-size:1.6rem;margin-bottom:.35rem}',
      '.gpx-card h3{font-family:"Space Grotesk",sans-serif;margin:0 0 .2rem;font-size:1.15rem;color:#fff8e7}',
      '.gpx-card .meta{font-size:.72rem;color:rgba(253,230,138,.6);margin:0 0 .4rem}',
      '.gpx-card p{margin:0;font-size:.8rem;line-height:1.45;color:rgba(253,230,138,.78)}',
      '.gpx-card .go{display:inline-flex;margin-top:.7rem;font-size:.7rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#1a1200;background:linear-gradient(135deg,#fde68a,#fcd34d);padding:.4rem .75rem;border-radius:999px}',
      '.gpx-empty{padding:2rem;text-align:center;color:rgba(253,230,138,.5);font-size:.9rem}',
      /* Connect panel */
      '.gpx-connect{display:grid;gap:1rem}',
      '@media(min-width:900px){.gpx-connect{grid-template-columns:1fr 1.1fr}}',
      '.gpx-box{border-radius:1.2rem;border:1px solid rgba(252,211,77,.28);background:linear-gradient(160deg,rgba(252,211,77,.08),rgba(10,8,6,.96));padding:1.15rem 1.1rem}',
      '.gpx-box h3{font-family:"Space Grotesk",sans-serif;margin:0 0 .5rem;color:#fde68a;font-size:1.1rem}',
      '.gpx-box ul{margin:.4rem 0 0;padding-left:1.1rem;font-size:.84rem;line-height:1.5;color:rgba(253,230,138,.8)}',
      '.gpx-screen{display:grid;gap:.5rem}',
      '.gpx-screen .row{padding:.7rem .8rem;border-radius:.9rem;border:1px solid rgba(252,211,77,.18);background:rgba(0,0,0,.28)}',
      '.gpx-screen .row strong{display:block;color:#fff8e7;font-size:.88rem;margin-bottom:.15rem}',
      '.gpx-screen .row span{font-size:.78rem;color:rgba(253,230,138,.7);line-height:1.4}',
      '.gpx-form label{display:block;font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(252,211,77,.65);margin:0 0 .3rem}',
      '.gpx-form input,.gpx-form select,.gpx-form textarea{width:100%;margin:0 0 .75rem;padding:.7rem .85rem;border-radius:.85rem;border:1px solid rgba(252,211,77,.25);background:rgba(0,0,0,.4);color:#fff;font:inherit}',
      '.gpx-form textarea{min-height:90px;resize:vertical}',
      '.gpx-form input:focus,.gpx-form select:focus,.gpx-form textarea:focus{outline:none;border-color:rgba(252,211,77,.55)}',
      '.gpx-cta{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:.75rem 1.2rem;border-radius:999px;border:0;font-weight:700;font-size:.88rem;cursor:pointer;font-family:inherit;color:#1a1200;background:linear-gradient(135deg,#fde68a,#fcd34d 50%,#f59e0b);box-shadow:0 10px 28px -12px rgba(245,158,11,.55)}',
      '.gpx-cta:disabled{opacity:.45;cursor:not-allowed}',
      '.gpx-ghost{display:inline-flex;align-items:center;min-height:44px;padding:.6rem 1rem;border-radius:999px;border:1px solid rgba(252,211,77,.35);background:transparent;color:#fde68a;font-weight:600;font-size:.82rem;cursor:pointer;font-family:inherit;text-decoration:none}',
      '.gpx-status{font-size:.78rem;color:#6ee7b7;margin-top:.65rem;min-height:1.2em}',
      '.gpx-pick{font-size:.85rem;color:rgba(253,230,138,.75);padding:.85rem;border-radius:.9rem;border:1px dashed rgba(252,211,77,.3);margin-bottom:.75rem}',
      '.gpx-pick strong{color:#fcd34d}',
      '.gpx-funds{display:grid;gap:.65rem}',
      '@media(min-width:700px){.gpx-funds{grid-template-columns:repeat(3,1fr)}}',
      '.gpx-fund{border-radius:1.1rem;border:1px solid rgba(252,211,77,.25);padding:1rem;background:linear-gradient(160deg,rgba(252,211,77,.08),rgba(0,0,0,.35))}',
      '.gpx-fund h4{font-family:"Space Grotesk",sans-serif;margin:0 0 .25rem;color:#fde68a}',
      '.gpx-fund .amt{font-size:1.05rem;font-weight:700;color:#fff;margin:.25rem 0}',
      '.gpx-fund p{margin:0;font-size:.78rem;line-height:1.45;color:rgba(253,230,138,.72)}',
      '.gpx-truth{font-size:.68rem;color:rgba(200,170,100,.5);margin-top:.75rem;line-height:1.4}',
      '.gpx-more-grid{display:grid;gap:.55rem}',
      '@media(min-width:640px){.gpx-more-grid{grid-template-columns:1fr 1fr}}',
      '.gpx-more-card{border-radius:1.1rem;border:1px solid rgba(252,211,77,.25);padding:1rem;background:linear-gradient(155deg,rgba(252,211,77,.07),rgba(10,8,6,.96));text-decoration:none;color:inherit;display:block;transition:border-color .2s,transform .2s}',
      '.gpx-more-card:hover{border-color:rgba(253,230,138,.5);transform:translateY(-2px)}',
      '.gpx-more-card h3{font-family:"Space Grotesk",sans-serif;margin:0 0 .35rem;color:#fde68a;font-size:1.05rem}',
      '.gpx-more-card p{margin:0;font-size:.8rem;color:rgba(253,230,138,.7);line-height:1.4}',
      /* Mobile */
      'body.gpx-mobile{padding-bottom:calc(4.6rem + env(safe-area-inset-bottom))}',
      'body.gpx-mobile .gpx-rail,body.gpx-mobile > nav,body.gpx-mobile #mobile-menu,body.gpx-mobile .fixed.bottom-3{display:none!important}',
      'body.gpx-mobile > footer{padding-bottom:6rem!important;font-size:11px!important}',
      '.gpx-mtop{display:none;position:sticky;top:0;z-index:70;align-items:center;justify-content:space-between;padding:.5rem .7rem;padding-top:max(.45rem,env(safe-area-inset-top));background:rgba(8,8,10,.98);border-bottom:1px solid var(--gp-line)}',
      'body.gpx-mobile .gpx-mtop{display:flex}',
      '.gpx-mtop a{display:flex;align-items:center;gap:.4rem;text-decoration:none;color:inherit}',
      '.gpx-mtop img{width:30px;height:30px;border-radius:50%;object-fit:cover;border:1px solid rgba(252,211,77,.45)}',
      '.gpx-mtop span{font-size:.65rem;font-weight:700;letter-spacing:.05em;color:#fde68a}',
      '.gpx-mtabs{display:none;position:fixed;left:0;right:0;bottom:0;z-index:75;grid-template-columns:repeat(4,1fr);padding:.28rem .1rem calc(.28rem + env(safe-area-inset-bottom));background:rgba(6,6,8,.98);border-top:1px solid var(--gp-line)}',
      'body.gpx-mobile .gpx-mtabs{display:grid}',
      '.gpx-mtab{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.1rem;border:0;background:transparent;color:rgba(252,211,77,.4);font-size:.48rem;letter-spacing:.03em;text-transform:uppercase;font-weight:700;font-family:inherit;min-height:50px;cursor:pointer}',
      '.gpx-mtab .ic{font-size:1.05rem}',
      '.gpx-mtab.is-on{color:#fde68a;background:linear-gradient(180deg,rgba(252,211,77,.12),transparent)}',
      'body.gpx-mobile header.hero-bg{padding:3.4rem .75rem .8rem!important}',
      'body.gpx-mobile header.hero-bg .gpx-hide-m{display:none!important}',
      '.gpx-quick{display:flex;flex-wrap:wrap;gap:.4rem;padding:.75rem .85rem 0;max-width:72rem;margin:0 auto}',
      'body.gpx-panels:not(.gpx-mobile) .gpx-quick{display:none}',
      '.gpx-quick button{flex:1 1 auto;min-height:44px;border-radius:999px;border:1px solid rgba(252,211,77,.35);background:rgba(0,0,0,.35);color:#fde68a;font-size:.75rem;font-weight:700;font-family:inherit;cursor:pointer}',
      '.gpx-quick button.pri{background:linear-gradient(135deg,#fde68a,#fcd34d);color:#1a1200;border:0}',
      '.gpx-progress{position:fixed;top:0;left:0;height:2px;width:0;z-index:80;background:linear-gradient(90deg,#f59e0b,#fcd34d,#fde68a);transform:translateZ(0)}',
      'body.is-scrolling .gpx-progress{opacity:.85}'
    ].join('');
    document.head.appendChild(s);
  }

  var state = { filter: 'all', query: '', selected: null };

  function goTab(id) {
    if (!id) return;
    document.querySelectorAll('.gpx-panel').forEach(function (p) {
      p.classList.toggle('is-on', p.getAttribute('data-gpx-panel') === id);
    });
    document.querySelectorAll('.gpx-mtab, #gpx-rail [data-gpx-go]').forEach(function (t) {
      var key = t.getAttribute('data-tab') || t.getAttribute('data-gpx-go');
      var on = key === id;
      t.classList.toggle('is-on', on);
      if (t.getAttribute('role') === 'tab') t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    try {
      if (history.replaceState) history.replaceState(null, '', '#gpx-' + id);
    } catch (e) { /* ignore */ }
    window.scrollTo(0, 0);
  }

  function bindGo(root) {
    (root || document).querySelectorAll('[data-gpx-go]').forEach(function (btn) {
      if (btn.getAttribute('data-gpx-bound') === '1') return;
      btn.setAttribute('data-gpx-bound', '1');
      btn.addEventListener('click', function (ev) {
        ev.preventDefault();
        goTab(btn.getAttribute('data-gpx-go'));
      });
    });
  }

  function filtered() {
    var q = (state.query || '').toLowerCase().trim();
    return HEROES.filter(function (h) {
      if (state.filter === 'service' && h.kind !== 'service') return false;
      if (state.filter === 'shelter' && h.kind !== 'shelter') return false;
      if (!q) return true;
      return (h.name + ' ' + h.breed + ' ' + h.city + ' ' + h.note + ' ' + h.id).toLowerCase().indexOf(q) !== -1;
    });
  }

  function renderGrid() {
    var host = document.getElementById('gpx-grid');
    if (!host) return;
    var list = filtered();
    if (!list.length) {
      host.innerHTML = '<div class="gpx-empty">No heroes match that filter yet. Clear search or switch filter.</div>';
      return;
    }
    host.innerHTML = list.map(function (h) {
      var badge = h.kind === 'service' ? 'Service retiree' : 'Senior shelter';
      var needs = h.needs === 'higher' ? ' · higher care' : '';
      return (
        '<button type="button" class="gpx-card" data-hero="' + h.id + '">' +
          '<div class="top"><span class="id">' + h.id + '</span><span class="badge ' + h.kind + '">' + badge + '</span></div>' +
          '<div class="emoji" aria-hidden="true">' + h.photo + '</div>' +
          '<h3>' + h.name + '</h3>' +
          '<p class="meta">' + h.age + ' yrs · ' + h.breed + ' · ' + h.city + needs + '</p>' +
          '<p>' + h.note + '</p>' +
          '<span class="go">Connect forever home →</span>' +
        '</button>'
      );
    }).join('');
    host.querySelectorAll('[data-hero]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectHero(btn.getAttribute('data-hero'));
      });
    });
  }

  function findHero(id) {
    for (var i = 0; i < HEROES.length; i++) if (HEROES[i].id === id) return HEROES[i];
    return null;
  }

  function selectHero(id) {
    state.selected = findHero(id);
    renderConnectPick();
    goTab('connect');
  }

  function renderConnectPick() {
    var el = document.getElementById('gpx-pick');
    var sel = document.getElementById('gpx-form-dog');
    if (sel) {
      sel.innerHTML = '<option value="">Select a hero…</option>' +
        HEROES.map(function (h) {
          return '<option value="' + h.id + '"' + (state.selected && state.selected.id === h.id ? ' selected' : '') + '>' +
            h.name + ' · ' + (h.kind === 'service' ? 'Service' : 'Shelter') + ' · ' + h.city +
            '</option>';
        }).join('');
    }
    if (!el) return;
    if (!state.selected) {
      el.innerHTML = 'Choose a hero from the <button type="button" class="gpx-ghost" data-gpx-go="heroes" style="margin-left:.35rem">Heroes list</button> or pick below.';
      bindGo(el);
      return;
    }
    var h = state.selected;
    var fund = h.needs === 'higher' ? FUNDS[1] : FUNDS[0];
    el.innerHTML =
      'Selected: <strong>' + h.name + '</strong> (' + h.id + ') · ' +
      (h.kind === 'service' ? 'retired service' : 'senior shelter') +
      ' · Design funding lane: <strong>' + fund.amount + '</strong> when rails are live.';
  }

  function heroesPanelHtml() {
    return (
      '<div class="gpx-section">' +
        '<div class="gpx-head">' +
          '<h2>Senior heroes waiting</h2>' +
          '<p>Retired service dogs and senior shelter dogs. Design roster only. Real names and photos appear with partner consent when the program is funded.</p>' +
        '</div>' +
        '<div class="gpx-filters" id="gpx-filters" role="tablist">' +
          '<button type="button" class="is-on" data-filter="all">All heroes</button>' +
          '<button type="button" data-filter="service">Service retirees</button>' +
          '<button type="button" data-filter="shelter">Senior shelter</button>' +
        '</div>' +
        '<input class="gpx-search" id="gpx-search" type="search" placeholder="Search name, city, breed…" autocomplete="off">' +
        '<div class="gpx-grid" id="gpx-grid"></div>' +
        '<p class="gpx-truth">Illustrative profiles. No live adoption ledger on this page yet. Click any card to open certified forever-home connect.</p>' +
      '</div>'
    );
  }

  function connectPanelHtml() {
    var screen = SCREEN.map(function (r) {
      return '<div class="row"><strong>' + r.t + '</strong><span>' + r.d + '</span></div>';
    }).join('');
    var covered = COVERED.map(function (c) { return '<li>' + c + '</li>'; }).join('');
    return (
      '<div class="gpx-section">' +
        '<div class="gpx-head">' +
          '<h2>Connect a certified forever home</h2>' +
          '<p>One click from hero → screening path → funded retirement home. <strong>Certified</strong> means thorough screening plus the program covers the costs listed below when funded.</p>' +
        '</div>' +
        '<div class="gpx-connect">' +
          '<div class="gpx-box">' +
            '<h3>Screening (certified home)</h3>' +
            '<div class="gpx-screen">' + screen + '</div>' +
            '<p class="gpx-truth">Checklist is the model. Live verification partners replace demos when agreements exist.</p>' +
          '</div>' +
          '<div class="gpx-box">' +
            '<h3>Program funds the home</h3>' +
            '<ul>' + covered + '</ul>' +
            '<p class="gpx-truth" style="margin-top:.75rem">Amounts track Mercy / Guardian / Eternal circles on the program card. Nothing is billed to the family for covered items when rails are live.</p>' +
            '<h3 style="margin-top:1.1rem">Forever-home intent</h3>' +
            '<div class="gpx-pick" id="gpx-pick"></div>' +
            '<form class="gpx-form" id="gpx-form">' +
              '<label for="gpx-form-dog">Hero</label>' +
              '<select id="gpx-form-dog" required></select>' +
              '<label for="gpx-name">Your name</label>' +
              '<input id="gpx-name" name="name" required autocomplete="name" placeholder="Full name">' +
              '<label for="gpx-email">Email</label>' +
              '<input id="gpx-email" name="email" type="email" required autocomplete="email" placeholder="you@email.com">' +
              '<label for="gpx-city">City / region</label>' +
              '<input id="gpx-city" name="city" required placeholder="City, province or state">' +
              '<label for="gpx-home">Home type</label>' +
              '<select id="gpx-home" required>' +
                '<option value="">Select…</option>' +
                '<option>House with yard</option>' +
                '<option>Quiet apartment / condo</option>' +
                '<option>Rural property</option>' +
                '<option>Other (tell us below)</option>' +
              '</select>' +
              '<label for="gpx-why">Why this hero · your forever commitment</label>' +
              '<textarea id="gpx-why" required placeholder="Experience with seniors, schedule, other pets, why you can keep them for life…"></textarea>' +
              '<label style="display:flex;align-items:flex-start;gap:.5rem;text-transform:none;letter-spacing:0;font-size:.8rem;color:rgba(253,230,138,.8);margin-bottom:.85rem">' +
                '<input type="checkbox" id="gpx-cert" required style="width:auto;margin:.15rem 0 0">' +
                '<span>I understand screening is required and that program funds (when live) cover the listed care — not a free pet without accountability.</span>' +
              '</label>' +
              '<button type="submit" class="gpx-cta" id="gpx-submit">Submit forever-home intent</button>' +
              '<div class="gpx-status" id="gpx-status" role="status"></div>' +
              '<p class="gpx-truth">Design intent only. Stored locally in your browser for now. No match is confirmed from this form until partners and funding are live.</p>' +
            '</form>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function fundingPanelHtml() {
    return (
      '<div class="gpx-section">' +
        '<div class="gpx-head">' +
          '<h2>What the program pays</h2>' +
          '<p>Same circles as the Golden Paws program card. Families bring love and a screened home. $NIBBLES holders fund the rest when rails are live.</p>' +
        '</div>' +
        '<div class="gpx-funds">' +
          FUNDS.map(function (f) {
            return (
              '<div class="gpx-fund">' +
                '<h4>' + f.circle + ' Circle</h4>' +
                '<div class="amt">' + f.amount + '</div>' +
                '<p><strong>' + f.cover + '</strong><br>' + f.items + '</p>' +
              '</div>'
            );
          }).join('') +
        '</div>' +
        '<p class="gpx-truth">Design levels. Not issued credits. No live treasury debit from this page.</p>' +
      '</div>'
    );
  }

  function morePanelHtml() {
    return (
      '<div class="gpx-section">' +
        '<div class="gpx-head"><h2>Related · Truth</h2><p>Golden Paws is retirement forever homes for senior heroes. Different from companion matching.</p></div>' +
        '<div class="gpx-more-grid">' +
          '<a class="gpx-more-card" href="golden-years.html"><h3>Golden Years</h3><p>Companion matching: lonely seniors + calm adult dogs living together. Different product.</p></a>' +
          '<a class="gpx-more-card" href="healing-hearts.html"><h3>Healing Hearts</h3><p>Therapy network. Working dogs may retire into Golden Paws when their service chapter ends.</p></a>' +
          '<a class="gpx-more-card" href="silver-paws.html"><h3>Silver Paws</h3><p>Senior human visit product. Not the same as placing a senior dog in a forever home.</p></a>' +
          '<a class="gpx-more-card" href="programs/golden-paws-retirement-program.html"><h3>Classic program card</h3><p>Circles of Mercy copy and video on the standard program page.</p></a>' +
          '<a class="gpx-more-card" href="all-programs.html"><h3>All 30 programs</h3><p>Support the constellation when you are ready.</p></a>' +
          '<a class="gpx-more-card" href="shelters.html"><h3>Beautiful Souls</h3><p>Broader shelter directory when you want to explore more dogs.</p></a>' +
        '</div>' +
        '<p class="gpx-truth" style="margin-top:1.25rem">Authenticity: every hero card and application here is a design demo until real partners, screening vendors, and funding rails are live.</p>' +
      '</div>'
    );
  }

  function wireHeroes() {
    document.querySelectorAll('#gpx-filters [data-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.filter = btn.getAttribute('data-filter');
        document.querySelectorAll('#gpx-filters [data-filter]').forEach(function (b) {
          b.classList.toggle('is-on', b === btn);
        });
        renderGrid();
      });
    });
    var search = document.getElementById('gpx-search');
    if (search) {
      search.addEventListener('input', function () {
        state.query = search.value;
        renderGrid();
      });
    }
    renderGrid();
  }

  function wireForm() {
    var form = document.getElementById('gpx-form');
    var status = document.getElementById('gpx-status');
    var dogSel = document.getElementById('gpx-form-dog');
    if (dogSel) {
      dogSel.addEventListener('change', function () {
        if (dogSel.value) {
          state.selected = findHero(dogSel.value);
          renderConnectPick();
        }
      });
    }
    if (!form) return;
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var dogId = (document.getElementById('gpx-form-dog') || {}).value;
      var hero = findHero(dogId);
      var payload = {
        program: 'golden-paws-retirement',
        dogId: dogId,
        dogName: hero ? hero.name : '',
        kind: hero ? hero.kind : '',
        name: (document.getElementById('gpx-name') || {}).value || '',
        email: (document.getElementById('gpx-email') || {}).value || '',
        city: (document.getElementById('gpx-city') || {}).value || '',
        home: (document.getElementById('gpx-home') || {}).value || '',
        why: (document.getElementById('gpx-why') || {}).value || '',
        at: new Date().toISOString(),
        truth: 'design-intent-only'
      };
      try {
        var key = 'shh_golden_paws_intents';
        var prev = [];
        try { prev = JSON.parse(localStorage.getItem(key) || '[]'); } catch (e1) { prev = []; }
        if (!Array.isArray(prev)) prev = [];
        prev.push(payload);
        localStorage.setItem(key, JSON.stringify(prev.slice(-40)));
      } catch (e2) { /* private mode */ }
      if (status) {
        status.textContent = 'Intent saved on this device for ' + (hero ? hero.name : 'your selected hero') +
          '. Design only — no match confirmed until screening partners and funding are live.';
      }
      form.reset();
      if (hero) {
        state.selected = hero;
        renderConnectPick();
      }
    });
  }

  function buildPanels() {
    var host = document.getElementById('gpx-panel-host');
    if (!host) return;
    var hero = document.querySelector('header.hero-bg');

    function panel(id, html, nodes) {
      var p = document.createElement('div');
      p.className = 'gpx-panel' + (id === 'heart' ? ' is-on' : '');
      p.setAttribute('data-gpx-panel', id);
      p.setAttribute('role', 'tabpanel');
      if (html) {
        var w = document.createElement('div');
        w.innerHTML = html;
        while (w.firstChild) p.appendChild(w.firstChild);
      }
      (nodes || []).forEach(function (n) { if (n) p.appendChild(n); });
      return p;
    }

    var quick = document.createElement('div');
    quick.className = 'gpx-quick';
    quick.innerHTML =
      '<button type="button" class="pri" data-gpx-go="heroes">Browse heroes</button>' +
      '<button type="button" data-gpx-go="connect">Connect home</button>' +
      '<button type="button" data-gpx-go="funding">Funding</button>' +
      '<button type="button" data-gpx-go="more">More</button>';

    var heartNodes = [hero, quick].filter(Boolean);
    if (hero && hero.parentNode) hero.parentNode.removeChild(hero);

    host.appendChild(panel('heart', null, heartNodes));
    host.appendChild(panel('heroes', heroesPanelHtml()));
    host.appendChild(panel('connect', connectPanelHtml()));
    host.appendChild(panel('funding', fundingPanelHtml()));
    host.appendChild(panel('more', morePanelHtml()));
  }

  function inject() {
    styles();
    document.body.classList.add('gpx-panels');
    if (isMobile()) document.body.classList.add('gpx-mobile');

    if (!document.querySelector('.gpx-progress')) {
      var bar = document.createElement('div');
      bar.className = 'gpx-progress';
      document.body.appendChild(bar);
      var tick = false;
      window.addEventListener('scroll', function () {
        document.body.classList.add('is-scrolling');
        clearTimeout(window.__gpxScrollT);
        window.__gpxScrollT = setTimeout(function () {
          document.body.classList.remove('is-scrolling');
        }, 140);
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

    if (isMobile() && !document.querySelector('.gpx-mtop')) {
      var m = document.createElement('div');
      m.innerHTML =
        '<div class="gpx-mtop"><a href="index.html"><img src="assets/logos/shibahumanityhublogo3d-new.jpg" width="30" height="30" alt=""><span>GOLDEN PAWS</span></a><span style="font-size:.5rem;letter-spacing:.1em;text-transform:uppercase;color:#fcd34d;border:1px solid rgba(252,211,77,.4);padding:.25rem .5rem;border-radius:999px">Preview</span></div>' +
        '<nav class="gpx-mtabs" aria-label="Golden Paws mobile">' +
          '<button type="button" class="gpx-mtab is-on" data-tab="heart"><span class="ic">♥</span>Heart</button>' +
          '<button type="button" class="gpx-mtab" data-tab="heroes"><span class="ic">🐕</span>Heroes</button>' +
          '<button type="button" class="gpx-mtab" data-tab="connect"><span class="ic">⌂</span>Connect</button>' +
          '<button type="button" class="gpx-mtab" data-tab="more"><span class="ic">◆</span>More</button>' +
        '</nav>';
      while (m.firstChild) document.body.insertBefore(m.firstChild, document.body.firstChild);
    }

    if (!document.getElementById('gpx-rail')) {
      var rail = document.createElement('nav');
      rail.className = 'gpx-rail';
      rail.id = 'gpx-rail';
      rail.setAttribute('aria-label', 'Golden Paws sections');
      rail.innerHTML =
        '<button type="button" class="is-on" data-gpx-go="heart" role="tab">Heart</button>' +
        '<button type="button" data-gpx-go="heroes" role="tab">Heroes</button>' +
        '<button type="button" data-gpx-go="connect" role="tab">Connect home</button>' +
        '<button type="button" data-gpx-go="funding" role="tab">Funding</button>' +
        '<button type="button" data-gpx-go="more" role="tab">More</button>';
      var nav = document.querySelector('body > nav');
      if (nav && nav.nextSibling) document.body.insertBefore(rail, nav.nextSibling);
      else document.body.insertBefore(rail, document.body.firstChild);
    }

    if (!document.getElementById('gpx-panel-host')) {
      var host = document.createElement('div');
      host.id = 'gpx-panel-host';
      var footer = document.querySelector('footer');
      if (footer) document.body.insertBefore(host, footer);
      else document.body.appendChild(host);
      buildPanels();
    }

    document.querySelectorAll('.gpx-mtab').forEach(function (t) {
      t.addEventListener('click', function () { goTab(t.getAttribute('data-tab')); });
    });
    bindGo(document);
    wireHeroes();
    renderConnectPick();
    wireForm();
    document.body.classList.add('gpx-ready');

    document.querySelectorAll('a[href="#gpx-heroes"], a[href="#heroes"]').forEach(function (a) {
      a.addEventListener('click', function (ev) {
        ev.preventDefault();
        goTab('heroes');
      });
    });
    document.querySelectorAll('a[href="#gpx-connect"], a[href="#connect"]').forEach(function (a) {
      a.addEventListener('click', function (ev) {
        ev.preventDefault();
        goTab('connect');
      });
    });

    var hash = (location.hash || '').replace(/^#/, '');
    if (hash.indexOf('gpx-') === 0) goTab(hash.replace('gpx-', ''));
    else if (hash === 'heroes' || hash === 'dogs') goTab('heroes');
    else if (hash === 'connect' || hash === 'apply') goTab('connect');
    else if (hash === 'funding') goTab('funding');
    else goTab('heart');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
  else inject();
})();
