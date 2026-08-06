/**
 * Global Disaster K9 · Lifeline experience
 * Bond-first SAR: handler + dog as one unit that finds souls in the dark.
 * Truth: design preview until real partners, deployments, and proofs are live.
 * Palette: searchlight gold + rescue cyan on night navy (distinct from other programs).
 */
(function () {
  'use strict';

  var TEAMS = [
    {
      id: 'K9-01',
      dog: 'Atlas',
      handler: 'Maya Chen',
      base: 'Pacific Northwest',
      specialty: 'Rubble / urban collapse',
      years: 6,
      line: 'She reads his ears. He reads her breath. Under concrete, that is language.',
      bond: 'They live on the same schedule. Same truck. Same long silence after hard finds.',
      status: 'Standby design',
      emoji: '🏔️'
    },
    {
      id: 'K9-02',
      dog: 'Nova',
      handler: 'James Okonkwo',
      base: 'Gulf Coast',
      specialty: 'Flood / water edge',
      years: 4,
      line: 'Best friends who train in rain so strangers get pulled from water.',
      bond: 'He talks to her like a partner, not a tool. She works like she agrees.',
      status: 'Standby design',
      emoji: '🌊'
    },
    {
      id: 'K9-03',
      dog: 'Ridge',
      handler: 'Elena Varga',
      base: 'Mountain West',
      specialty: 'Wilderness / wide area',
      years: 8,
      line: 'Two heartbeats on a ridgeline. One mission: find the living.',
      bond: 'Retirement is planned together. The bond does not end when the badge does.',
      status: 'Standby design',
      emoji: '⛰️'
    },
    {
      id: 'K9-04',
      dog: 'Cipher',
      handler: 'Omar Hassan',
      base: 'Northeast corridor',
      specialty: 'Night search / dense urban',
      years: 5,
      line: 'When the lights die, the bond becomes the map.',
      bond: 'They recover as a pair: sleep, food, quiet, then readiness again.',
      status: 'Standby design',
      emoji: '🌃'
    },
    {
      id: 'K9-05',
      dog: 'Solace',
      handler: 'Priya Nair',
      base: 'Southwest',
      specialty: 'Heat / desert debris',
      years: 3,
      line: 'A shelter dog who became someone\'s whole world, then became a light for others.',
      bond: 'Second chance dog. First-rate partner. That is the flywheel at work.',
      status: 'Train-up design',
      emoji: '☀️'
    },
    {
      id: 'K9-06',
      dog: 'Beacon',
      handler: 'Chris Alvarez',
      base: 'Great Lakes',
      specialty: 'Cold weather / ice edge',
      years: 7,
      line: 'They share one life so other lives get returned to the people who love them.',
      bond: 'Handler funds readiness of the soul. Dog funds courage of the body. Together: unit.',
      status: 'Standby design',
      emoji: '❄️'
    }
  ];

  var PROTOCOL = [
    { n: '01', t: 'Bond the unit', d: 'Handler and K9 live as partners first. Trust is not a weekend seminar. It is a shared life under stress.' },
    { n: '02', t: 'Train the stack', d: 'Rubble, scent, obedience, rest discipline, handler fitness. Skills compound only if the bond holds.' },
    { n: '03', t: 'Fund readiness', d: 'Standby capital covers living support, dog care, gear, and training so the unit is not a charity scramble at T+0.' },
    { n: '04', t: 'Deploy with proof', d: 'Activation releases transport and field costs. Mission reports, partner attestations, media when ethical. No ghost ops.' },
    { n: '05', t: 'Recover the pair', d: 'Post-mission rest, vet, mental reset for both. Burned-out teams save fewer souls next time.' },
    { n: '06', t: 'Retire with honor', d: 'Lifetime care for the dog. Path for the handler. The bond is not disposable infrastructure.' }
  ];

  var RAILS = [
    {
      circle: 'Mercy',
      hold: '50,000+ $NIBBLES',
      mode: 'Standby · always on',
      cover: 'Permanent professional readiness: handler living support design, full dog care, food, vet, housing, daily training, base equipment so a trained unit can hit a 48-hour wheels-up design target.'
    },
    {
      circle: 'Guardian',
      hold: '250,000+ $NIBBLES',
      mode: 'Active deployment',
      cover: 'Capital released on activation: rapid transport, field ops, handler deployment bonus design, extra support in zone, plus a direct path into post-mission recovery for dog and human.'
    },
    {
      circle: 'Eternal',
      hold: '500,000+ $NIBBLES',
      mode: 'Lifecycle · legacy',
      cover: 'Sustains the full arc: advanced training, retirement care for the dog, next-generation unit development, private updates when live, optional naming rights tied to real proofs only.'
    }
  ];

  var MISSION_STEPS = [
    { t: 'Signal', d: 'Disaster call + partner request. Design: verify need before wheels move.' },
    { t: 'Activate', d: 'Guardian rail releases deploy capital. Unit goes from standby to field mode.' },
    { t: 'Search', d: 'Bonded team works the grid. Dog finds. Handler decides. Souls get a chance.' },
    { t: 'Report', d: 'Attestations, logs, ethical media. Public proof or it did not count as flywheel truth.' },
    { t: 'Recover', d: 'Dog and handler restored. Then readiness again. The light stays on.' }
  ];

  var state = { teamId: TEAMS[0].id, filter: 'all' };

  function isMobile() {
    try {
      if (/[?&]desktop=1/i.test(location.search || '')) return false;
      if (/[?&]mobile=1/i.test(location.search || '')) return true;
      return window.matchMedia && window.matchMedia('(max-width: 767px)').matches;
    } catch (e) { return false; }
  }

  function team() {
    for (var i = 0; i < TEAMS.length; i++) if (TEAMS[i].id === state.teamId) return TEAMS[i];
    return TEAMS[0];
  }

  function styles() {
    if (document.getElementById('k9x-css')) return;
    var s = document.createElement('style');
    s.id = 'k9x-css';
    s.textContent = [
      ':root{--k9-gold:#fbbf24;--k9-beam:#fef3c7;--k9-cyan:#67e8f9;--k9-ink:#050814;--k9-line:rgba(103,232,249,.28)}',
      'body.k9x-panels{scroll-behavior:auto}',
      'body.k9x-panels .k9x-panel{display:none;padding-bottom:2rem}',
      'body.k9x-panels .k9x-panel.is-on{display:block;animation:k9x-in .2s ease}',
      '@keyframes k9x-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}',
      '.k9x-rail{position:sticky;top:0;z-index:55;display:flex;gap:.3rem;padding:.5rem max(.7rem,env(safe-area-inset-left));overflow-x:auto;scrollbar-width:none;background:rgba(5,8,20,.97);border-bottom:1px solid var(--k9-line);justify-content:flex-start}',
      '.k9x-rail::-webkit-scrollbar{display:none}',
      '@media(min-width:900px){.k9x-rail{justify-content:center;flex-wrap:wrap}}',
      '.k9x-rail button{flex:0 0 auto;font-size:.55rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(103,232,249,.5);padding:.42rem .7rem;border-radius:999px;border:1px solid transparent;background:transparent;cursor:pointer;font-family:inherit;font-weight:700;min-height:40px}',
      '.k9x-rail button.is-on,.k9x-rail button:hover{color:#fef3c7;border-color:rgba(251,191,36,.5);background:linear-gradient(145deg,rgba(251,191,36,.14),rgba(103,232,249,.08))}',
      'body.k9x-panels:not(.k9x-mobile) header.k9-hero{padding-top:5.4rem!important;padding-bottom:1.4rem!important}',
      'body.k9x-panels:not(.k9x-mobile) .k9x-quick{display:none}',
      '.k9x-section{max-width:min(72rem,100%);margin:0 auto;padding:1.15rem max(.75rem,env(safe-area-inset-left)) 2rem}',
      '@media(min-width:768px){.k9x-section{padding:1.6rem 1.5rem 2.5rem}}',
      '@media(min-width:1600px){.k9x-section{max-width:82rem}}',
      '.k9x-head h2{font-family:"Space Grotesk",sans-serif;font-size:clamp(1.35rem,3.2vw,1.95rem);letter-spacing:-.03em;margin:0 0 .4rem;background:linear-gradient(135deg,#fff,#fef3c7 35%,#fbbf24 60%,#67e8f9);-webkit-background-clip:text;background-clip:text;color:transparent}',
      '.k9x-head p{margin:0;font-size:.9rem;line-height:1.55;color:rgba(186,230,253,.82);max-width:46rem}',
      /* Thesis */
      '.k9x-thesis{position:relative;margin:0 0 1.15rem;padding:1.05rem 1.1rem;border-radius:1.25rem;border:1px solid rgba(251,191,36,.4);background:linear-gradient(145deg,rgba(251,191,36,.12),rgba(103,232,249,.07) 50%,rgba(5,8,20,.96));box-shadow:0 0 50px -18px rgba(251,191,36,.5),inset 0 1px 0 rgba(255,255,255,.08);overflow:hidden}',
      '.k9x-thesis .tag{font-size:.55rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(251,191,36,.9);margin:0 0 .4rem}',
      '.k9x-thesis h3{font-family:"Space Grotesk",sans-serif;margin:0 0 .4rem;font-size:clamp(1.05rem,2.4vw,1.35rem);color:#fef3c7;letter-spacing:-.02em;line-height:1.25}',
      '.k9x-thesis p{margin:0;font-size:.86rem;line-height:1.55;color:rgba(224,242,254,.9)}',
      '.k9x-thesis strong{color:#67e8f9}',
      '.k9x-grid3{display:grid;gap:.55rem;margin:0 0 1.15rem}',
      '@media(min-width:700px){.k9x-grid3{grid-template-columns:repeat(3,1fr)}}',
      '.k9x-card{border-radius:1.05rem;border:1px solid rgba(103,232,249,.25);background:linear-gradient(160deg,rgba(103,232,249,.08),rgba(0,0,0,.35));padding:.9rem .85rem}',
      '.k9x-card .k{font-size:.55rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(251,191,36,.85);margin:0 0 .3rem}',
      '.k9x-card p{margin:0;font-size:.8rem;line-height:1.45;color:rgba(224,242,254,.88)}',
      /* Teams */
      '.k9x-teams{display:grid;gap:.65rem;grid-template-columns:1fr;margin:1rem 0}',
      '@media(min-width:640px){.k9x-teams{grid-template-columns:1fr 1fr}}',
      '@media(min-width:1000px){.k9x-teams{grid-template-columns:repeat(3,1fr)}}',
      '.k9x-team{text-align:left;border-radius:1.2rem;border:1px solid rgba(103,232,249,.28);background:linear-gradient(160deg,rgba(103,232,249,.08),rgba(5,8,20,.96));padding:1rem .95rem;cursor:pointer;font:inherit;color:inherit;transition:border-color .15s,transform .15s,box-shadow .15s;width:100%}',
      '.k9x-team.is-on{border-color:rgba(251,191,36,.55);box-shadow:0 0 40px -14px rgba(251,191,36,.4);transform:translateY(-2px)}',
      '.k9x-team .top{display:flex;justify-content:space-between;align-items:flex-start;gap:.5rem;margin-bottom:.45rem}',
      '.k9x-team .em{font-size:1.5rem;line-height:1}',
      '.k9x-team .st{font-size:.55rem;letter-spacing:.1em;text-transform:uppercase;color:#67e8f9;border:1px solid rgba(103,232,249,.35);padding:.2rem .45rem;border-radius:999px}',
      '.k9x-team h3{font-family:"Space Grotesk",sans-serif;margin:0 0 .15rem;font-size:1.15rem;color:#fef3c7}',
      '.k9x-team .pair{font-size:.78rem;color:#67e8f9;margin:0 0 .35rem}',
      '.k9x-team .meta{font-size:.7rem;color:rgba(186,230,253,.6);margin:0 0 .45rem}',
      '.k9x-team .line{font-size:.8rem;line-height:1.4;color:rgba(224,242,254,.88);font-style:italic;margin:0}',
      /* Focus */
      '.k9x-focus{margin-top:1rem;border-radius:1.3rem;border:1px solid rgba(251,191,36,.4);background:linear-gradient(165deg,rgba(251,191,36,.12),rgba(5,8,20,.98));padding:1.15rem 1.05rem;box-shadow:0 24px 60px -24px rgba(0,0,0,.75)}',
      '.k9x-focus h3{font-family:"Space Grotesk",sans-serif;margin:0 0 .35rem;color:#fde68a;font-size:1.2rem}',
      '.k9x-focus .sub{font-size:.8rem;color:rgba(186,230,253,.7);margin:0 0 .75rem;line-height:1.4}',
      '.k9x-focus .bond{font-size:.88rem;line-height:1.5;color:rgba(224,242,254,.92);margin:0 0 .75rem}',
      '.k9x-focus .truth{font-size:.65rem;color:rgba(148,180,200,.55);margin:0}',
      /* Protocol */
      '.k9x-steps{display:grid;gap:.5rem;margin:1rem 0}',
      '@media(min-width:700px){.k9x-steps{grid-template-columns:1fr 1fr}}',
      '@media(min-width:1100px){.k9x-steps{grid-template-columns:repeat(3,1fr)}}',
      '.k9x-step{border-radius:1.05rem;border:1px solid rgba(103,232,249,.25);background:rgba(0,0,0,.3);padding:.85rem .8rem}',
      '.k9x-step .n{font-size:.5rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(251,191,36,.85);margin:0 0 .25rem}',
      '.k9x-step h4{font-family:"Space Grotesk",sans-serif;margin:0 0 .3rem;font-size:.98rem;color:#e0f2fe}',
      '.k9x-step p{margin:0;font-size:.78rem;line-height:1.45;color:rgba(186,230,253,.75)}',
      /* Mission flow */
      '.k9x-flow{display:grid;gap:.4rem;margin:1rem 0}',
      '@media(min-width:800px){.k9x-flow{grid-template-columns:repeat(5,1fr)}}',
      '.k9x-flow-step{border-radius:.95rem;border:1px solid rgba(251,191,36,.28);background:linear-gradient(160deg,rgba(251,191,36,.08),rgba(0,0,0,.35));padding:.75rem .65rem;text-align:center}',
      '.k9x-flow-step h4{font-family:"Space Grotesk",sans-serif;margin:0 0 .25rem;font-size:.88rem;color:#fde68a}',
      '.k9x-flow-step p{margin:0;font-size:.7rem;line-height:1.4;color:rgba(186,230,253,.7)}',
      /* Rails */
      '.k9x-rails{display:grid;gap:.65rem;margin:1rem 0}',
      '@media(min-width:800px){.k9x-rails{grid-template-columns:repeat(3,1fr)}}',
      '.k9x-rail-card{border-radius:1.2rem;border:1px solid rgba(103,232,249,.3);background:linear-gradient(160deg,rgba(103,232,249,.1),rgba(5,8,20,.96));padding:1.05rem .95rem}',
      '.k9x-rail-card.hi{border-color:rgba(251,191,36,.5);box-shadow:0 0 36px -14px rgba(251,191,36,.35)}',
      '.k9x-rail-card .mode{font-size:.55rem;letter-spacing:.12em;text-transform:uppercase;color:#67e8f9;margin:0 0 .3rem}',
      '.k9x-rail-card h3{font-family:"Space Grotesk",sans-serif;margin:0 0 .2rem;font-size:1.15rem;color:#fef3c7}',
      '.k9x-rail-card .hold{font-size:.78rem;color:#fbbf24;margin:0 0 .5rem}',
      '.k9x-rail-card p{margin:0;font-size:.8rem;line-height:1.45;color:rgba(186,230,253,.78)}',
      /* Form */
      '.k9x-form label{display:block;font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(103,232,249,.7);margin:0 0 .25rem}',
      '.k9x-form input,.k9x-form textarea,.k9x-form select{width:100%;margin:0 0 .65rem;padding:.7rem .8rem;border-radius:.85rem;border:1px solid rgba(103,232,249,.28);background:rgba(0,0,0,.4);color:#fff;font:inherit;font-size:16px}',
      '.k9x-form textarea{min-height:72px;resize:vertical}',
      '.k9x-cta{display:inline-flex;align-items:center;justify-content:center;width:100%;min-height:48px;border:0;border-radius:999px;font-weight:700;font-size:.9rem;cursor:pointer;font-family:inherit;color:#0a1024;background:linear-gradient(135deg,#fef3c7,#fbbf24 50%,#67e8f9);box-shadow:0 12px 32px -12px rgba(251,191,36,.55)}',
      '.k9x-status{font-size:.78rem;color:#67e8f9;margin-top:.55rem;min-height:1.2em}',
      '.k9x-truth{font-size:.65rem;line-height:1.4;color:rgba(148,180,200,.55);margin-top:.65rem}',
      '.k9x-anti{margin:0 0 1.15rem;padding:.9rem 1rem;border-radius:1.1rem;border:1px solid rgba(251,113,133,.35);background:linear-gradient(160deg,rgba(251,113,133,.08),rgba(0,0,0,.35))}',
      '.k9x-anti h4{font-family:"Space Grotesk",sans-serif;margin:0 0 .4rem;font-size:.95rem;color:#fda4af}',
      '.k9x-anti ul{margin:0;padding-left:1.05rem;font-size:.8rem;line-height:1.5;color:rgba(254,205,211,.85)}',
      '.k9x-more{display:grid;gap:.6rem}',
      '@media(min-width:640px){.k9x-more{grid-template-columns:1fr 1fr}}',
      '.k9x-link{display:block;border-radius:1.1rem;border:1px solid rgba(103,232,249,.28);padding:1rem;text-decoration:none;color:inherit;background:linear-gradient(155deg,rgba(103,232,249,.08),rgba(5,8,20,.96));transition:border-color .15s,transform .15s}',
      '.k9x-link:hover{border-color:rgba(251,191,36,.45);transform:translateY(-2px)}',
      '.k9x-link h3{font-family:"Space Grotesk",sans-serif;margin:0 0 .3rem;color:#fde68a;font-size:1.05rem}',
      '.k9x-link p{margin:0;font-size:.8rem;color:rgba(186,230,253,.72);line-height:1.4}',
      /* Mobile */
      'body.k9x-mobile{padding-bottom:calc(4.8rem + env(safe-area-inset-bottom))}',
      'body.k9x-mobile .k9x-rail,body.k9x-mobile > nav,body.k9x-mobile #mobile-menu,body.k9x-mobile .fixed.bottom-3{display:none!important}',
      'body.k9x-mobile > footer{padding-bottom:calc(5.5rem + env(safe-area-inset-bottom))!important;font-size:11px!important}',
      '.k9x-mtop{display:none;position:sticky;top:0;z-index:70;align-items:center;justify-content:space-between;padding:.5rem .7rem;padding-top:max(.45rem,env(safe-area-inset-top));background:rgba(5,8,20,.98);border-bottom:1px solid var(--k9-line)}',
      'body.k9x-mobile .k9x-mtop{display:flex}',
      '.k9x-mtop a{display:flex;align-items:center;gap:.4rem;text-decoration:none;color:inherit}',
      '.k9x-mtop img{width:30px;height:30px;border-radius:50%;object-fit:cover;border:1px solid rgba(251,191,36,.45)}',
      '.k9x-mtop span{font-size:.62rem;font-weight:700;letter-spacing:.04em;color:#e0f2fe}',
      '.k9x-mtabs{display:none;position:fixed;left:0;right:0;bottom:0;z-index:75;grid-template-columns:repeat(5,1fr);padding:.28rem .1rem calc(.28rem + env(safe-area-inset-bottom));background:rgba(4,8,18,.98);border-top:1px solid var(--k9-line)}',
      'body.k9x-mobile .k9x-mtabs{display:grid}',
      '.k9x-mtab{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.1rem;border:0;background:transparent;color:rgba(103,232,249,.4);font-size:.42rem;letter-spacing:.02em;text-transform:uppercase;font-weight:700;font-family:inherit;min-height:52px;cursor:pointer}',
      '.k9x-mtab .ic{font-size:1rem}',
      '.k9x-mtab.is-on{color:#fef3c7;background:linear-gradient(180deg,rgba(251,191,36,.14),transparent)}',
      'body.k9x-mobile header.k9-hero{padding:3.3rem .7rem .75rem!important}',
      'body.k9x-mobile .k9x-hide-m{display:none!important}',
      '.k9x-quick{display:flex;flex-wrap:wrap;gap:.35rem;padding:.65rem max(.65rem,env(safe-area-inset-left)) 0;max-width:min(72rem,100%);margin:0 auto}',
      '.k9x-quick button{flex:1 1 42%;min-height:46px;border-radius:999px;border:1px solid rgba(103,232,249,.35);background:rgba(0,0,0,.35);color:#e0f2fe;font-size:.72rem;font-weight:700;font-family:inherit;cursor:pointer}',
      '.k9x-quick button.pri{background:linear-gradient(135deg,#fef3c7,#fbbf24);color:#0a1024;border:0}',
      '.k9x-progress{position:fixed;top:0;left:0;height:2px;width:0;z-index:80;background:linear-gradient(90deg,#fbbf24,#67e8f9,#fef3c7,#fb7185)}'
    ].join('');
    document.head.appendChild(s);
  }

  function goTab(id) {
    if (!id) return;
    document.querySelectorAll('.k9x-panel').forEach(function (p) {
      p.classList.toggle('is-on', p.getAttribute('data-k9x-panel') === id);
    });
    document.querySelectorAll('.k9x-mtab, #k9x-rail [data-k9x-go]').forEach(function (t) {
      var key = t.getAttribute('data-tab') || t.getAttribute('data-k9x-go');
      t.classList.toggle('is-on', key === id);
    });
    try {
      if (history.replaceState) history.replaceState(null, '', '#k9x-' + id);
    } catch (e) { /* ignore */ }
    window.scrollTo(0, 0);
  }

  function bindGo(root) {
    (root || document).querySelectorAll('[data-k9x-go]').forEach(function (btn) {
      if (btn.getAttribute('data-k9x-bound') === '1') return;
      btn.setAttribute('data-k9x-bound', '1');
      btn.addEventListener('click', function (ev) {
        ev.preventDefault();
        goTab(btn.getAttribute('data-k9x-go'));
      });
    });
  }

  function renderTeams() {
    var host = document.getElementById('k9x-teams');
    var focus = document.getElementById('k9x-focus');
    if (!host) return;
    host.innerHTML = TEAMS.map(function (t) {
      return (
        '<button type="button" class="k9x-team' + (t.id === state.teamId ? ' is-on' : '') + '" data-team="' + t.id + '">' +
          '<div class="top"><span class="em" aria-hidden="true">' + t.emoji + '</span><span class="st">' + t.status + '</span></div>' +
          '<h3>' + t.dog + ' + ' + t.handler.split(' ')[0] + '</h3>' +
          '<p class="pair">' + t.handler + ' · ' + t.years + ' yrs bonded</p>' +
          '<p class="meta">' + t.base + ' · ' + t.specialty + '</p>' +
          '<p class="line">"' + t.line + '"</p>' +
        '</button>'
      );
    }).join('');
    host.querySelectorAll('[data-team]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.teamId = btn.getAttribute('data-team');
        renderTeams();
      });
    });
    var t = team();
    if (focus) {
      focus.innerHTML =
        '<h3>' + t.emoji + ' Unit ' + t.id + ' · ' + t.dog + ' & ' + t.handler + '</h3>' +
        '<p class="sub">' + t.base + ' · ' + t.specialty + ' · ' + t.years + ' years as a life partnership (design roster)</p>' +
        '<p class="bond"><strong>The bond:</strong> ' + t.bond + '</p>' +
        '<p class="bond" style="font-style:italic;color:#fde68a">"' + t.line + '"</p>' +
        '<p class="truth">Design profile only. Real faces and partners publish with consent and proof when funded.</p>';
    }
  }

  function bondHtml() {
    return (
      '<div class="k9x-section">' +
        '<div class="k9x-head">' +
          '<h2>The product is the bond</h2>' +
          '<p>Gear matters. Training matters. Capital matters. None of it works if the human and the dog are not one unit. This program starts where real SAR starts: two lives woven so tight that rubble cannot split them.</p>' +
        '</div>' +
        '<div class="k9x-thesis">' +
          '<p class="tag">Thesis · non-negotiable</p>' +
          '<h3>Best friends who run toward collapse so other souls get another morning.</h3>' +
          '<p>A K9 is not equipment. A handler is not a remote pilot. <strong>They fuse schedules, trust, risk, and recovery into a single searchlight.</strong> When the world breaks, that light crawls into places no meeting, no machine, and no unfunded hope can reach.</p>' +
        '</div>' +
        '<div class="k9x-grid3" aria-label="Bond principles">' +
          '<div class="k9x-card"><p class="k">Life partnership</p><p>Same truck. Same grit. Same quiet after a hard find. The bond is the operating system.</p></div>' +
          '<div class="k9x-card"><p class="k">Soul-finding tech</p><p>Nose + instinct + handler judgment. Biological search infrastructure with a heartbeat.</p></div>' +
          '<div class="k9x-card"><p class="k">Mercy at speed</p><p>Readiness funded before the siren. Deploy capital when the call hits. Proof after the field.</p></div>' +
        '</div>' +
        '<div class="k9x-anti">' +
          '<h4>Anti-goals · we will not ship these</h4>' +
          '<ul>' +
            '<li>Mascot dogs with no real readiness stack</li>' +
            '<li>Handlers treated as unpaid heroes forever</li>' +
            '<li>"Live ops" claims without partner attestations</li>' +
            '<li>Deploy without a recovery plan for the pair</li>' +
          '</ul>' +
        '</div>' +
        '<div class="k9x-thesis" style="border-color:rgba(103,232,249,.35)">' +
          '<p class="tag">Unit of impact</p>' +
          '<h3>One bonded pair · many lives touched</h3>' +
          '<p>Stack pairs. Fund standby. Publish missions. That is how Global Disaster K9 becomes permanent infrastructure instead of a one-time fundraiser. People helping people. Helping dogs. Helping the next stranger still breathing under the dark.</p>' +
        '</div>' +
      '</div>'
    );
  }

  function teamsHtml() {
    return (
      '<div class="k9x-section">' +
        '<div class="k9x-head">' +
          '<h2>Bonded units (design roster)</h2>' +
          '<p>Illustrative pairs so you can feel the model. Not live deployment cards. When partners sign, real names and proofs replace this roster with consent.</p>' +
        '</div>' +
        '<div class="k9x-teams" id="k9x-teams"></div>' +
        '<div class="k9x-focus" id="k9x-focus"></div>' +
        '<form class="k9x-form" id="k9x-form" style="margin-top:1.25rem;max-width:32rem">' +
          '<div class="k9x-head" style="margin-bottom:.75rem"><h2 style="font-size:1.25rem">Stand with a unit</h2><p>Save a design intent on this device. Signal for when rails and partners are real.</p></div>' +
          '<label for="k9x-name">Your name or handle</label>' +
          '<input id="k9x-name" required placeholder="The human standing with the light">' +
          '<label for="k9x-unit">Preferred unit (optional)</label>' +
          '<select id="k9x-unit">' +
            '<option value="">Any bonded pair</option>' +
            TEAMS.map(function (t) {
              return '<option value="' + t.id + '">' + t.dog + ' & ' + t.handler + '</option>';
            }).join('') +
          '</select>' +
          '<label for="k9x-note">Why this mission hits you (optional)</label>' +
          '<textarea id="k9x-note" placeholder="Because someone out there still needs a second morning."></textarea>' +
          '<button type="submit" class="k9x-cta">Commit readiness intent</button>' +
          '<div class="k9x-status" id="k9x-status" role="status"></div>' +
          '<p class="k9x-truth">Design only. Local storage. No charge. Live path: partner contracts + public mission proofs.</p>' +
        '</form>' +
      '</div>'
    );
  }

  function readyHtml() {
    return (
      '<div class="k9x-section">' +
        '<div class="k9x-head">' +
          '<h2>Readiness protocol</h2>' +
          '<p>Disasters do not wait for a fundraiser to trend. The product is a bonded unit already paid, trained, and restable. 48-hour wheels-up is the design target. Proof is the launch condition.</p>' +
        '</div>' +
        '<div class="k9x-steps">' +
          PROTOCOL.map(function (s) {
            return (
              '<div class="k9x-step">' +
                '<p class="n">' + s.n + '</p>' +
                '<h4>' + s.t + '</h4>' +
                '<p>' + s.d + '</p>' +
              '</div>'
            );
          }).join('') +
        '</div>' +
        '<div class="k9x-thesis" style="margin-top:1rem">' +
          '<p class="tag">First principles</p>' +
          '<h3>If readiness is not funded, the bond is just a beautiful story.</h3>' +
          '<p>Stories do not dig. <strong>Standby capital digs.</strong> That is why Mercy funds always-on readiness and Guardian funds the moment of activation. Eternal funds the decade, not the headline.</p>' +
        '</div>' +
      '</div>'
    );
  }

  function deployHtml() {
    return (
      '<div class="k9x-section">' +
        '<div class="k9x-head">' +
          '<h2>When the call hits</h2>' +
          '<p>Design flow from signal to recovery. Live ops publish real partners, real zones, and real attestations. Until then, this is the mechanism, not a live map.</p>' +
        '</div>' +
        '<div class="k9x-flow">' +
          MISSION_STEPS.map(function (s) {
            return '<div class="k9x-flow-step"><h4>' + s.t + '</h4><p>' + s.d + '</p></div>';
          }).join('') +
        '</div>' +
        '<div class="k9x-grid3" style="margin-top:1.15rem">' +
          '<div class="k9x-card"><p class="k">What the dog does</p><p>Find the living. Mark. Work past fear. Trust the handler completely.</p></div>' +
          '<div class="k9x-card"><p class="k">What the human does</p><p>Read the dog. Call the grid. Protect the pair. Carry the weight of every empty hole.</p></div>' +
          '<div class="k9x-card"><p class="k">What we fund</p><p>The chance they both get there whole, work at peak, and come home to recover.</p></div>' +
        '</div>' +
        '<p class="k9x-truth">No fake GPS tracks. No invented body counts. When live: reports, partner letters, and ethical media become permanent records.</p>' +
      '</div>'
    );
  }

  function railsHtml() {
    return (
      '<div class="k9x-section">' +
        '<div class="k9x-head">' +
          '<h2>Funding rails · $NIBBLES circles</h2>' +
          '<p>Two states. Always-on readiness. Activation capital. Legacy lifecycle. No "hope someone donates when the building falls."</p>' +
        '</div>' +
        '<div class="k9x-rails">' +
          RAILS.map(function (r, i) {
            return (
              '<div class="k9x-rail-card' + (i === 1 ? ' hi' : '') + '">' +
                '<p class="mode">' + r.mode + '</p>' +
                '<h3>' + r.circle + ' circle</h3>' +
                '<p class="hold">' + r.hold + '</p>' +
                '<p>' + r.cover + '</p>' +
              '</div>'
            );
          }).join('') +
        '</div>' +
        '<div class="k9x-thesis" style="margin-top:1rem">' +
          '<p class="tag">Mechanism design</p>' +
          '<h3>Price the readiness. Prove the deploy. Protect the bond.</h3>' +
          '<p>If we cannot show the books and the mission proof when live, we do not get to tell the heroic story. <strong>Trust is an engineering constraint.</strong></p>' +
        '</div>' +
        '<p class="k9x-truth">Hold thresholds and circle names are program design. Live rails require charity structure, partner contracts, and public accounting.</p>' +
      '</div>'
    );
  }

  function moreHtml() {
    return (
      '<div class="k9x-section">' +
        '<div class="k9x-head">' +
          '<h2>Why this light is different</h2>' +
          '<p>Healing Hearts places therapy presence. New Beginnings soft-lands adoptions. Golden Paws retires heroes. Global Disaster K9 is the pair that runs into the break so strangers get pulled back into life.</p>' +
        '</div>' +
        '<div class="k9x-thesis" style="margin-bottom:1.15rem">' +
          '<p class="tag">Mission</p>' +
          '<h3>Combine two lives so many more can continue.</h3>' +
          '<p>Handler and dog as best friends is not marketing. It is the only way high-stakes search works. <strong>You fund the partnership. They fund the miracle of another morning for someone still buried in the dark.</strong></p>' +
        '</div>' +
        '<div class="k9x-more">' +
          '<a class="k9x-link" href="healing-hearts.html"><h3>Healing Hearts</h3><p>Therapy network. Soft presence after hard news. Not SAR.</p></a>' +
          '<a class="k9x-link" href="new-beginnings.html"><h3>New Beginnings</h3><p>Home start packs so first forever homes stick.</p></a>' +
          '<a class="k9x-link" href="golden-paws.html"><h3>Golden Paws</h3><p>Senior heroes into certified forever homes.</p></a>' +
          '<a class="k9x-link" href="programs/second-chance-k9-prison-program.html"><h3>Second Chance K9</h3><p>Another K9 path: dogs and people redeeming each other.</p></a>' +
          '<a class="k9x-link" href="programs/global-disaster-k9-response-units.html"><h3>Classic program card</h3><p>Circles copy on the standard program page.</p></a>' +
          '<a class="k9x-link" href="all-programs.html"><h3>All 30 programs</h3><p>Full flywheel map.</p></a>' +
        '</div>' +
      '</div>'
    );
  }

  function wireForm() {
    var form = document.getElementById('k9x-form');
    if (!form) return;
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var name = (document.getElementById('k9x-name') || {}).value || '';
      var unit = (document.getElementById('k9x-unit') || {}).value || '';
      var note = (document.getElementById('k9x-note') || {}).value || '';
      var payload = {
        program: 'global-disaster-k9',
        unitId: unit || state.teamId,
        name: name,
        note: note,
        at: new Date().toISOString(),
        truth: 'design-intent-only'
      };
      try {
        var key = 'shh_k9_lifeline_intents';
        var prev = [];
        try { prev = JSON.parse(localStorage.getItem(key) || '[]'); } catch (e1) { prev = []; }
        if (!Array.isArray(prev)) prev = [];
        prev.push(payload);
        localStorage.setItem(key, JSON.stringify(prev.slice(-40)));
      } catch (e2) { /* private mode */ }
      var status = document.getElementById('k9x-status');
      if (status) {
        status.textContent = 'COMMITTED: readiness intent held on this device for ' +
          (unit || 'any bonded unit') +
          '. Design only. No charge. When live: partner rails + public proofs. You stood with the light.';
      }
    });
  }

  function buildPanels() {
    var host = document.getElementById('k9x-panel-host');
    if (!host) return;
    var hero = document.querySelector('header.k9-hero');

    function panel(id, html, nodes) {
      var p = document.createElement('div');
      p.className = 'k9x-panel' + (id === 'bond' ? ' is-on' : '');
      p.setAttribute('data-k9x-panel', id);
      if (html) {
        var w = document.createElement('div');
        w.innerHTML = html;
        while (w.firstChild) p.appendChild(w.firstChild);
      }
      (nodes || []).forEach(function (n) { if (n) p.appendChild(n); });
      return p;
    }

    var quick = document.createElement('div');
    quick.className = 'k9x-quick';
    quick.innerHTML =
      '<button type="button" class="pri" data-k9x-go="teams">Meet the pairs</button>' +
      '<button type="button" data-k9x-go="ready">Readiness</button>' +
      '<button type="button" data-k9x-go="deploy">Deploy flow</button>' +
      '<button type="button" data-k9x-go="rails">Rails</button>';

    var bondNodes = [hero, quick].filter(Boolean);
    if (hero && hero.parentNode) hero.parentNode.removeChild(hero);

    host.appendChild(panel('bond', null, bondNodes));
    host.appendChild(panel('teams', teamsHtml()));
    host.appendChild(panel('ready', readyHtml()));
    host.appendChild(panel('deploy', deployHtml()));
    host.appendChild(panel('rails', railsHtml()));
    host.appendChild(panel('more', moreHtml()));
  }

  function inject() {
    styles();
    document.body.classList.add('k9x-panels');
    if (isMobile()) document.body.classList.add('k9x-mobile');

    if (!document.querySelector('.k9x-progress')) {
      var bar = document.createElement('div');
      bar.className = 'k9x-progress';
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

    if (isMobile() && !document.querySelector('.k9x-mtop')) {
      var m = document.createElement('div');
      m.innerHTML =
        '<div class="k9x-mtop"><a href="index.html"><img src="assets/logos/shibahumanityhublogo3d-new.jpg" width="30" height="30" alt=""><span>GLOBAL K9</span></a><span style="font-size:.5rem;letter-spacing:.1em;text-transform:uppercase;color:#fbbf24;border:1px solid rgba(251,191,36,.4);padding:.25rem .5rem;border-radius:999px">Bond</span></div>' +
        '<nav class="k9x-mtabs" aria-label="K9 mobile">' +
          '<button type="button" class="k9x-mtab is-on" data-tab="bond"><span class="ic">💛</span>Bond</button>' +
          '<button type="button" class="k9x-mtab" data-tab="teams"><span class="ic">🐕</span>Pairs</button>' +
          '<button type="button" class="k9x-mtab" data-tab="ready"><span class="ic">⚙</span>Ready</button>' +
          '<button type="button" class="k9x-mtab" data-tab="deploy"><span class="ic">🔦</span>Deploy</button>' +
          '<button type="button" class="k9x-mtab" data-tab="rails"><span class="ic">$</span>Rails</button>' +
        '</nav>';
      while (m.firstChild) document.body.insertBefore(m.firstChild, document.body.firstChild);
    }

    if (!document.getElementById('k9x-rail')) {
      var rail = document.createElement('nav');
      rail.className = 'k9x-rail';
      rail.id = 'k9x-rail';
      rail.innerHTML =
        '<button type="button" class="is-on" data-k9x-go="bond">The bond</button>' +
        '<button type="button" data-k9x-go="teams">Bonded pairs</button>' +
        '<button type="button" data-k9x-go="ready">Readiness</button>' +
        '<button type="button" data-k9x-go="deploy">Deploy</button>' +
        '<button type="button" data-k9x-go="rails">Rails</button>' +
        '<button type="button" data-k9x-go="more">Why</button>';
      var nav = document.querySelector('body > nav');
      if (nav && nav.nextSibling) document.body.insertBefore(rail, nav.nextSibling);
      else document.body.insertBefore(rail, document.body.firstChild);
    }

    if (!document.getElementById('k9x-panel-host')) {
      var host = document.createElement('div');
      host.id = 'k9x-panel-host';
      var footer = document.querySelector('footer');
      if (footer) document.body.insertBefore(host, footer);
      else document.body.appendChild(host);
      buildPanels();
    }

    document.querySelectorAll('.k9x-mtab').forEach(function (t) {
      t.addEventListener('click', function () { goTab(t.getAttribute('data-tab')); });
    });
    bindGo(document);
    renderTeams();
    wireForm();
    document.body.classList.add('k9x-ready');

    document.querySelectorAll('a[href="#k9x-bond"], a[href="#k9x-rails"], a[href="#k9x-teams"]').forEach(function (a) {
      a.addEventListener('click', function (ev) {
        ev.preventDefault();
        var h = (a.getAttribute('href') || '').replace('#k9x-', '');
        goTab(h || 'bond');
      });
    });

    var hash = (location.hash || '').replace(/^#/, '');
    if (hash.indexOf('k9x-') === 0) goTab(hash.replace('k9x-', ''));
    else if (hash === 'teams' || hash === 'pairs') goTab('teams');
    else if (hash === 'rails' || hash === 'fund') goTab('rails');
    else if (hash === 'ready' || hash === 'deploy') goTab(hash);
    else goTab('bond');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
  else inject();
})();
