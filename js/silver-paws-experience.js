/**
 * Silver Paws · high-tech experience layer
 * Command board, chapter rail, visit HUD, mobile app-shell.
 * Keeps existing search / package / quiz / reels logic. Elevates the frame.
 * Truth: facilities, reels, treasury credits are demos until partners + rails are live.
 */
(function () {
  'use strict';

  var VISITS = [
    { id: 'SV-01', home: 'Maple Grove Villa', city: 'Toronto, ON', dog: 'Luna', status: 'Ready (preview)', progress: 18, note: 'Bingo + calm lap time', team: 'Silver Unit A' },
    { id: 'SV-02', home: 'Sunset Villas', city: 'Phoenix, AZ', dog: 'Charlie', status: 'Route set', progress: 42, note: 'Weekly lunch visit design', team: 'Desert Paws' },
    { id: 'SV-03', home: 'Golden Heart Manor', city: 'Vancouver, BC', dog: 'Mochi', status: 'Packing joy kit', progress: 61, note: 'Memory care soft visit', team: 'Coast Care' },
    { id: 'SV-04', home: 'Riverbend Residences', city: 'Chicago, IL', dog: 'Scout', status: 'Partner pending', progress: 12, note: 'Raffle night design', team: 'Midwest Mercy' },
    { id: 'SV-05', home: 'Harbour Light Senior', city: 'Halifax, NS', dog: 'Biscuit', status: 'Scheduled (design)', progress: 33, note: 'Story circle + gentle walk', team: 'Atlantic Soft' },
    { id: 'SV-06', home: 'Palm Court Living', city: 'Tampa, FL', dog: 'Daisy', status: 'Ready (preview)', progress: 55, note: 'Music hour + paw prints', team: 'Sun Belt' }
  ];

  function isMobile() {
    try {
      var q = location.search || '';
      if (/[?&]desktop=1/i.test(q)) return false;
      if (/[?&]mobile=1/i.test(q)) return true;
      return window.matchMedia && window.matchMedia('(max-width: 767px)').matches;
    } catch (e) {
      return false;
    }
  }

  function styles() {
    if (document.getElementById('spx-css')) return;
    var s = document.createElement('style');
    s.id = 'spx-css';
    s.textContent = [
      ':root{--sp-silver:#c8cdd6;--sp-platinum:#e8ecf4;--sp-ink:#070b14;--sp-panel:#0c1220;--sp-line:rgba(200,205,214,.28);--sp-mint:#34d399}',
      /* Chapter rail */
      '.spx-rail{position:sticky;top:4.5rem;z-index:45;display:none;gap:.3rem;padding:.4rem .75rem;overflow-x:auto;scrollbar-width:none;background:rgba(7,11,20,.92);backdrop-filter:blur(14px);border-bottom:1px solid var(--sp-line)}',
      '.spx-rail::-webkit-scrollbar{display:none}',
      '@media(min-width:900px){.spx-rail{display:flex;justify-content:center;flex-wrap:wrap}}',
      '.spx-rail a{flex:0 0 auto;font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;color:rgba(232,236,244,.5);padding:.35rem .65rem;border-radius:999px;border:1px solid transparent;white-space:nowrap}',
      '.spx-rail a:hover,.spx-rail a.is-on{color:#e8ecf4;border-color:rgba(200,205,214,.4);background:rgba(200,205,214,.08)}',
      /* Command board */
      '.spx-board{position:relative;max-width:72rem;margin:0 auto;padding:1.25rem 1rem 0}',
      '@media(min-width:768px){.spx-board{padding:1.75rem 1.5rem 0}}',
      '.spx-hud{position:relative;overflow:hidden;border-radius:1.35rem;border:1px solid var(--sp-line);background:linear-gradient(145deg,rgba(200,205,214,.08),rgba(12,18,32,.95) 40%,rgba(7,11,20,.98));box-shadow:0 30px 80px -30px rgba(0,0,0,.75),inset 0 1px 0 rgba(255,255,255,.06);padding:1.15rem 1rem 1.25rem}',
      '@media(min-width:768px){.spx-hud{padding:1.5rem 1.5rem 1.6rem}}',
      '.spx-hud::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 10% 0%,rgba(200,205,214,.12),transparent 55%),radial-gradient(ellipse 50% 40% at 100% 100%,rgba(52,211,153,.08),transparent 50%);pointer-events:none}',
      '.spx-hud > *{position:relative;z-index:1}',
      '.spx-kicker{font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(200,205,214,.75);margin:0 0 .4rem}',
      '.spx-title{font-family:"Space Grotesk",Inter,system-ui,sans-serif;font-weight:700;letter-spacing:-.03em;font-size:clamp(1.35rem,3.5vw,1.85rem);color:#f4f6fa;margin:0 0 .35rem;line-height:1.15}',
      '.spx-lede{font-size:.9rem;line-height:1.5;color:rgba(226,232,240,.82);margin:0 0 1rem;max-width:40rem}',
      '.spx-meters{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:1rem}',
      '@media(min-width:640px){.spx-meters{grid-template-columns:repeat(4,1fr)}}',
      '.spx-meter{padding:.7rem .65rem;border-radius:.9rem;border:1px solid rgba(200,205,214,.18);background:rgba(0,0,0,.35)}',
      '.spx-meter b{display:block;font-family:"Space Grotesk",sans-serif;font-size:1.2rem;color:#e8ecf4;letter-spacing:-.02em}',
      '.spx-meter span{font-size:.55rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(200,205,214,.55)}',
      '.spx-grid{display:grid;gap:.55rem}',
      '@media(min-width:900px){.spx-grid{grid-template-columns:1.15fr .85fr}}',
      '.spx-visits{display:grid;gap:.45rem;max-height:280px;overflow:auto;-webkit-overflow-scrolling:touch;padding-right:.15rem}',
      '.spx-visit{border-radius:.9rem;border:1px solid rgba(200,205,214,.16);background:rgba(0,0,0,.4);padding:.75rem .8rem}',
      '.spx-visit-top{display:flex;justify-content:space-between;align-items:center;gap:.4rem;margin-bottom:.25rem}',
      '.spx-id{font-family:ui-monospace,monospace;font-size:.7rem;color:#c8cdd6;letter-spacing:.04em}',
      '.spx-status{font-size:.52rem;letter-spacing:.1em;text-transform:uppercase;color:#6ee7b7;border:1px solid rgba(52,211,153,.3);background:rgba(6,78,59,.25);padding:.2rem .45rem;border-radius:999px}',
      '.spx-route{font-size:.88rem;font-weight:600;color:#f1f5f9;margin:0 0 .2rem}',
      '.spx-note{font-size:.72rem;color:rgba(203,213,225,.7);margin:0}',
      '.spx-bar{height:4px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden;margin:.45rem 0 .2rem}',
      '.spx-bar > i{display:block;height:100%;width:0;border-radius:999px;background:linear-gradient(90deg,#94a3b8,#e2e8f0,#34d399);transition:width 1s ease}',
      '.spx-side{border-radius:1rem;border:1px solid rgba(200,205,214,.18);background:rgba(0,0,0,.35);padding:.9rem}',
      '.spx-side h3{font-family:"Space Grotesk",sans-serif;font-size:1rem;color:#e8ecf4;margin:0 0 .5rem}',
      '.spx-chat{min-height:120px;max-height:160px;overflow:auto;font-size:.72rem;line-height:1.35;color:rgba(226,232,240,.75)}',
      '.spx-chat .line{margin-bottom:.35rem}',
      '.spx-chat b{color:#c8cdd6}',
      '.spx-honest{font-size:.62rem;line-height:1.4;color:rgba(200,205,214,.45);margin:.65rem 0 0}',
      '.spx-cta-row{display:flex;flex-wrap:wrap;gap:.45rem;margin-top:.85rem}',
      '.spx-cta{display:inline-flex;align-items:center;justify-content:center;padding:.7rem 1.05rem;border-radius:999px;font-weight:700;font-size:.82rem;text-decoration:none;min-height:44px;border:0;cursor:pointer;font-family:inherit}',
      '.spx-cta-main{color:#0a0f1c;background:linear-gradient(135deg,#e8ecf4,#c8cdd6 50%,#a1a1aa)}',
      '.spx-cta-ghost{color:#e8ecf4;border:1px solid rgba(200,205,214,.35);background:rgba(0,0,0,.3)}',
      /* Scan line on board */
      '.spx-scan{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(200,205,214,.35),transparent);animation:spx-scan 5.5s linear infinite;pointer-events:none;opacity:.5}',
      '@keyframes spx-scan{0%{top:8%}100%{top:92%}}',
      /* Hero polish inject */
      'body.spx-ready header.hero-bg{position:relative;overflow:hidden}',
      'body.spx-ready header.hero-bg::after{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 70% 50% at 50% 0%,rgba(200,205,214,.1),transparent 60%),linear-gradient(180deg,transparent 40%,rgba(7,11,20,.85))}',
      'body.spx-ready .spx-progress{position:fixed;top:0;left:0;height:2px;width:0;z-index:80;background:linear-gradient(90deg,#94a3b8,#e2e8f0,#34d399);box-shadow:0 0 12px rgba(52,211,153,.45)}',
      /* Soft section cards */
      'body.spx-ready #search > div:first-child h2,.spx-lift{letter-spacing:-.03em}',
      'body.spx-ready #search .bg-zinc-900\\/70{border-color:rgba(200,205,214,.2)!important;background:linear-gradient(160deg,rgba(15,22,36,.9),rgba(10,15,28,.95))!important}',
      'body.spx-ready .search-input:focus{border-color:rgba(200,205,214,.55)!important;box-shadow:0 0 0 3px rgba(200,205,214,.08)!important}',
      /* Mobile shell */
      'body.spx-mobile{padding-bottom:calc(4.4rem + env(safe-area-inset-bottom))}',
      'body.spx-mobile .spx-rail{display:none!important}',
      'body.spx-mobile > nav{display:none!important}',
      'body.spx-mobile > footer{padding-bottom:5rem}',
      'body.spx-mobile #mobile-menu{display:none!important}',
      'body.spx-mobile .fixed.bottom-3{bottom:5.2rem!important}',
      '.spx-mtop{display:none;position:sticky;top:0;z-index:70;align-items:center;justify-content:space-between;gap:.5rem;padding:.55rem .75rem;padding-top:max(.55rem,env(safe-area-inset-top));background:rgba(7,11,20,.95);backdrop-filter:blur(14px);border-bottom:1px solid var(--sp-line)}',
      'body.spx-mobile .spx-mtop{display:flex}',
      '.spx-mtop a{display:flex;align-items:center;gap:.45rem;text-decoration:none;color:inherit;min-width:0}',
      '.spx-mtop img{width:32px;height:32px;border-radius:50%;object-fit:cover;border:1px solid rgba(200,205,214,.4)}',
      '.spx-mtop span{font-size:.68rem;font-weight:700;letter-spacing:.06em;color:#e8ecf4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.spx-mtabs{display:none;position:fixed;left:0;right:0;bottom:0;z-index:75;grid-template-columns:repeat(5,1fr);padding:.3rem .2rem calc(.3rem + env(safe-area-inset-bottom));background:rgba(7,11,20,.97);border-top:1px solid var(--sp-line);backdrop-filter:blur(16px)}',
      'body.spx-mobile .spx-mtabs{display:grid}',
      '.spx-mtab{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.1rem;border:0;background:transparent;color:rgba(200,205,214,.4);font-size:.5rem;letter-spacing:.04em;text-transform:uppercase;font-weight:600;font-family:inherit;padding:.35rem .1rem;min-height:48px;cursor:pointer}',
      '.spx-mtab .ic{font-size:1rem;line-height:1}',
      '.spx-mtab.is-on{color:#e8ecf4}',
      'body.spx-mobile .spx-panel{display:none;padding-bottom:1rem}',
      'body.spx-mobile .spx-panel.is-on{display:block}',
      'body.spx-mobile header.hero-bg{padding-top:4.5rem!important;padding-bottom:1.25rem!important}',
      'body.spx-mobile header.hero-bg h1{font-size:2.4rem!important;letter-spacing:-.04em!important}',
      'body.spx-mobile header.hero-bg .text-3xl{font-size:1.25rem!important}',
      'body.spx-mobile header.hero-bg .text-xl{font-size:.92rem!important;line-height:1.5!important}',
      'body.spx-mobile .spx-board{padding-top:.75rem}',
      'body.spx-mobile .spx-visits{max-height:220px}',
      '@media(prefers-reduced-motion:reduce){.spx-scan,.spx-bar > i{animation:none!important;transition:none!important}}'
    ].join('\n');
    document.head.appendChild(s);
  }

  function boardHtml() {
    return (
      '<div class="spx-board" id="spx-board">' +
        '<div class="spx-hud">' +
          '<div class="spx-scan" aria-hidden="true"></div>' +
          '<p class="spx-kicker">Silver Paws command · $NIBBLES</p>' +
          '<h2 class="spx-title">Visit control. Quiet tech. Real warmth.</h2>' +
          '<p class="spx-lede">A living board for senior-home therapy routes. Design preview now. Real schedules, partner homes, and treasury credits when rails and agreements are live.</p>' +
          '<div class="spx-meters">' +
            '<div class="spx-meter"><b id="spx-m-routes">6</b><span>Visit routes</span></div>' +
            '<div class="spx-meter"><b id="spx-m-homes">0</b><span>Homes in directory</span></div>' +
            '<div class="spx-meter"><b id="spx-m-acts">0</b><span>Activities ready</span></div>' +
            '<div class="spx-meter"><b id="spx-m-heart">2</b><span>Hearts per visit</span></div>' +
          '</div>' +
          '<div class="spx-grid">' +
            '<div>' +
              '<p class="spx-kicker" style="margin-bottom:.45rem">Active visit lanes</p>' +
              '<div class="spx-visits" id="spx-visits">' +
                VISITS.map(function (v) {
                  return (
                    '<article class="spx-visit" data-vid="' + v.id + '">' +
                      '<div class="spx-visit-top">' +
                        '<span class="spx-id">' + v.id + '</span>' +
                        '<span class="spx-status">' + v.status + '</span>' +
                      '</div>' +
                      '<p class="spx-route">' + v.home + ' · ' + v.city + '</p>' +
                      '<p class="spx-note">' + v.dog + ' · ' + v.note + ' · ' + v.team + '</p>' +
                      '<div class="spx-bar" aria-hidden="true"><i style="width:' + v.progress + '%"></i></div>' +
                    '</article>'
                  );
                }).join('') +
              '</div>' +
            '</div>' +
            '<div class="spx-side">' +
              '<h3>Floor chatter (preview)</h3>' +
              '<div class="spx-chat" id="spx-chat" aria-live="polite"></div>' +
              '<div class="spx-cta-row">' +
                '<a class="spx-cta spx-cta-main" href="#search">Find a home</a>' +
                '<a class="spx-cta spx-cta-ghost" href="#soul-search">Match a dog</a>' +
              '</div>' +
              '<p class="spx-honest">Illustrative lanes. No live treasury credit. No fake GPS. Partner homes replace demos when agreements are real.</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function railHtml() {
    return (
      '<nav class="spx-rail" id="spx-rail" aria-label="Silver Paws chapters">' +
        '<a href="#spx-board">Command</a>' +
        '<a href="#search">Find</a>' +
        '<a href="#package">Build visit</a>' +
        '<a href="#soul-search">Match</a>' +
        '<a href="#silver-grid">Homes</a>' +
        '<a href="#reels">Reels</a>' +
        '<a href="#spx-angels">Angels</a>' +
      '</nav>'
    );
  }

  function mobileChromeHtml() {
    return (
      '<div class="spx-mtop">' +
        '<a href="index.html"><img src="assets/logos/shibahumanityhublogo3d-new.jpg" alt=""><span>SILVER PAWS</span></a>' +
        '<span style="font-size:.52rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(200,205,214,.7);border:1px solid rgba(200,205,214,.3);padding:.28rem .5rem;border-radius:999px">$NIBBLES</span>' +
      '</div>' +
      '<nav class="spx-mtabs" aria-label="Silver Paws mobile">' +
        '<button type="button" class="spx-mtab is-on" data-tab="heart"><span class="ic">♥</span>Heart</button>' +
        '<button type="button" class="spx-mtab" data-tab="find"><span class="ic">◎</span>Find</button>' +
        '<button type="button" class="spx-mtab" data-tab="build"><span class="ic">✦</span>Build</button>' +
        '<button type="button" class="spx-mtab" data-tab="match"><span class="ic">🐾</span>Match</button>' +
        '<button type="button" class="spx-mtab" data-tab="more"><span class="ic">◆</span>More</button>' +
      '</nav>'
    );
  }

  function wrapPanels() {
    var hero = document.querySelector('header.hero-bg');
    var board = document.getElementById('spx-board');
    var search = document.getElementById('search');
    /* package section has no id - find by heading */
    var packageSec = null;
    document.querySelectorAll('section').forEach(function (sec) {
      if (sec.querySelector('#activity-grid') || sec.querySelector('#package-preview')) packageSec = sec;
    });
    if (packageSec) packageSec.id = packageSec.id || 'package';

    var soul = document.getElementById('soul-search');
    var homes = null;
    document.querySelectorAll('section').forEach(function (sec) {
      if (sec.querySelector('#silver-grid')) homes = sec;
    });
    if (homes && !homes.id) homes.id = 'silver-homes';

    var reels = document.getElementById('reels');
    var magic = null;
    var circles = null;
    var angels = null;
    document.querySelectorAll('section').forEach(function (sec) {
      var t = (sec.textContent || '').slice(0, 80);
      if (sec.querySelector('.senior-quote')) magic = sec;
      if (/Mercy Circle|Guardian Circle/.test(sec.textContent || '') && sec.querySelector('a[href*="onchain"]')) circles = sec;
      if (/Angels Who Choose|YOUR COMPANY HERE|Acme Legacy/i.test(sec.textContent || '')) {
        angels = sec;
        sec.id = 'spx-angels';
      }
    });

    var referral = null;
    document.querySelectorAll('section').forEach(function (sec) {
      if (sec.querySelector('#referral-input')) referral = sec;
    });

    function panel(id, nodes) {
      var p = document.createElement('div');
      p.className = 'spx-panel' + (id === 'heart' ? ' is-on' : '');
      p.setAttribute('data-spx-panel', id);
      nodes.forEach(function (n) {
        if (n) p.appendChild(n);
      });
      return p;
    }

    var bodyKids = [];
    var insertBefore = document.querySelector('footer') || null;
    var host = document.createElement('div');
    host.id = 'spx-mobile-host';

    var heartNodes = [hero, board, referral, magic].filter(Boolean);
    var findNodes = [search, homes].filter(Boolean);
    var buildNodes = [packageSec].filter(Boolean);
    var matchNodes = [soul].filter(Boolean);
    var moreNodes = [reels, circles, angels].filter(Boolean);

    /* Detach from current place */
    [hero, board, referral, search, packageSec, soul, homes, reels, magic, circles, angels].forEach(function (n) {
      if (n && n.parentNode) n.parentNode.removeChild(n);
    });

    host.appendChild(panel('heart', heartNodes));
    host.appendChild(panel('find', findNodes));
    host.appendChild(panel('build', buildNodes));
    host.appendChild(panel('match', matchNodes));
    host.appendChild(panel('more', moreNodes));

    var footer = document.querySelector('footer');
    if (footer) document.body.insertBefore(host, footer);
    else document.body.appendChild(host);

    /* Tabs */
    document.querySelectorAll('.spx-mtab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var id = tab.getAttribute('data-tab');
        document.querySelectorAll('.spx-panel').forEach(function (p) {
          p.classList.toggle('is-on', p.getAttribute('data-spx-panel') === id);
        });
        document.querySelectorAll('.spx-mtab').forEach(function (t) {
          t.classList.toggle('is-on', t === tab);
        });
        window.scrollTo(0, 0);
      });
    });
  }

  function wireBoard() {
    var chat = document.getElementById('spx-chat');
    var lines = [
      ['@desk', 'Maple Grove request queued. Bingo kit flagged.'],
      ['@luna', 'Calm mode. Memory care soft entry.'],
      ['@route', 'SV-02 Phoenix lane ready for partner confirm.'],
      ['@heart', 'Two hearts. One visit. No rush.'],
      ['@truth', 'Preview board. Real homes when agreements land.'],
      ['@scout', 'Chicago raffle night design locked.']
    ];
    var i = 0;
    function push() {
      if (!chat) return;
      var L = lines[i % lines.length];
      i++;
      var d = document.createElement('div');
      d.className = 'line';
      d.innerHTML = '<b>' + L[0] + '</b> ' + L[1];
      chat.appendChild(d);
      while (chat.children.length > 7) chat.removeChild(chat.firstChild);
      chat.scrollTop = chat.scrollHeight;
    }
    push();
    setInterval(push, 3200);

    /* meters from page data when available */
    function tickMeters() {
      var homes = (window.facilitiesData && window.facilitiesData.length) ||
        (typeof facilitiesData !== 'undefined' && facilitiesData.length) || 0;
      var acts = document.querySelectorAll('#activity-grid .activity-chip, #activity-grid button').length;
      var elH = document.getElementById('spx-m-homes');
      var elA = document.getElementById('spx-m-acts');
      if (elH && homes) elH.textContent = String(homes);
      if (elA && acts) elA.textContent = String(acts);
    }
    setTimeout(tickMeters, 400);
    setTimeout(tickMeters, 1200);

    if (typeof IntersectionObserver !== 'undefined') {
      var bars = document.querySelectorAll('.spx-bar > i');
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var w = en.target.style.width;
          en.target.style.width = '0';
          requestAnimationFrame(function () { en.target.style.width = w; });
          io.unobserve(en.target);
        });
      }, { threshold: 0.2 });
      bars.forEach(function (b) { io.observe(b); });
    }

    setInterval(function () {
      document.querySelectorAll('.spx-visit').forEach(function (v, idx) {
        if (idx % 2 !== (Math.floor(Date.now() / 4000) % 2)) return;
        var bar = v.querySelector('.spx-bar > i');
        if (!bar) return;
        var cur = parseInt(bar.style.width, 10) || 20;
        var n = Math.min(88, Math.max(10, cur + Math.floor(Math.random() * 3) - 1));
        bar.style.width = n + '%';
      });
    }, 4500);
  }

  function wireRail() {
    var links = document.querySelectorAll('.spx-rail a');
    if (!links.length || typeof IntersectionObserver === 'undefined') return;
    var ids = ['spx-board', 'search', 'package', 'soul-search', 'silver-homes', 'silver-grid', 'reels', 'spx-angels'];
    var secs = ids.map(function (id) { return document.getElementById(id); }).filter(Boolean);
    /* silver-grid might be inside section without id */
    if (!document.getElementById('silver-homes')) {
      var g = document.getElementById('silver-grid');
      if (g && g.closest('section')) {
        g.closest('section').id = 'silver-homes';
        secs.push(g.closest('section'));
      }
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id;
        links.forEach(function (a) {
          var href = a.getAttribute('href') || '';
          a.classList.toggle('is-on', href === '#' + id || (id === 'silver-homes' && href === '#silver-grid'));
        });
      });
    }, { rootMargin: '-35% 0px -50% 0px', threshold: 0 });
    secs.forEach(function (s) { io.observe(s); });
  }

  function wireProgress() {
    var bar = document.createElement('div');
    bar.className = 'spx-progress';
    bar.id = 'spx-progress';
    document.body.appendChild(bar);
    function onScroll() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var p = max > 0 ? (h.scrollTop / max) * 100 : 0;
      bar.style.width = p + '%';
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function softLabelStories() {
    document.querySelectorAll('.senior-quote').forEach(function (q) {
      var card = q.closest('.silver-card');
      if (!card || card.querySelector('.spx-demo-tag')) return;
      var tag = document.createElement('div');
      tag.className = 'spx-demo-tag';
      tag.style.cssText = 'font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:rgba(200,205,214,.55);margin-bottom:8px';
      tag.textContent = 'Illustrative story · design';
      card.insertBefore(tag, card.firstChild);
    });
  }

  function init() {
    if (!document.body || document.getElementById('spx-board')) return;
    styles();
    document.body.classList.add('spx-ready');

    /* Inject rail + board after nav */
    var nav = document.querySelector('nav');
    var rail = document.createElement('div');
    rail.innerHTML = railHtml();
    var railEl = rail.firstChild;
    if (nav && nav.nextSibling) document.body.insertBefore(railEl, nav.nextSibling);
    else document.body.insertBefore(railEl, document.body.firstChild);

    var boardWrap = document.createElement('div');
    boardWrap.innerHTML = boardHtml();
    var boardEl = boardWrap.firstChild;
    var hero = document.querySelector('header.hero-bg');
    if (hero && hero.nextSibling) document.body.insertBefore(boardEl, hero.nextSibling);
    else if (hero) hero.parentNode.insertBefore(boardEl, hero.nextSibling);

    /* Mobile chrome */
    if (isMobile()) {
      document.body.classList.add('spx-mobile');
      var chrome = document.createElement('div');
      chrome.innerHTML = mobileChromeHtml();
      while (chrome.firstChild) document.body.insertBefore(chrome.firstChild, document.body.firstChild);
      setTimeout(wrapPanels, 50);
    }

    wireBoard();
    wireRail();
    wireProgress();
    softLabelStories();

    /* Ensure package section id for anchors */
    document.querySelectorAll('section').forEach(function (sec) {
      if (sec.querySelector('#activity-grid') && !sec.id) sec.id = 'package';
      if (sec.querySelector('#silver-grid') && !sec.id) sec.id = 'silver-homes';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.SHHSilverPawsExperience = { init: init, isMobile: isMobile };
})();
