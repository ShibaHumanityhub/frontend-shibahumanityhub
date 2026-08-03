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
      /* Mobile shell — app-native, dense, thumb-first */
      'body.spx-mobile{padding-bottom:calc(4.6rem + env(safe-area-inset-bottom));overflow-x:hidden;background:#070b14!important}',
      'body.spx-mobile .spx-rail{display:none!important}',
      'body.spx-mobile > nav{display:none!important}',
      'body.spx-mobile > footer{padding:1.5rem 1rem 6rem!important;font-size:11px!important}',
      'body.spx-mobile #mobile-menu{display:none!important}',
      'body.spx-mobile .fixed.bottom-3{display:none!important}',
      'body.spx-mobile .spx-progress{top:0;z-index:85}',
      'body.spx-mobile .silver-bg-layer,body.spx-mobile .scroll-warmth{opacity:.04!important}',
      '.spx-mtop{display:none;position:sticky;top:0;z-index:70;align-items:center;justify-content:space-between;gap:.5rem;padding:.5rem .7rem;padding-top:max(.45rem,env(safe-area-inset-top));background:rgba(7,11,20,.97);backdrop-filter:blur(16px);border-bottom:1px solid var(--sp-line)}',
      'body.spx-mobile .spx-mtop{display:flex}',
      '.spx-mtop a{display:flex;align-items:center;gap:.4rem;text-decoration:none;color:inherit;min-width:0}',
      '.spx-mtop img{width:30px;height:30px;border-radius:50%;object-fit:cover;border:1px solid rgba(200,205,214,.4)}',
      '.spx-mtop span{font-size:.65rem;font-weight:700;letter-spacing:.05em;color:#e8ecf4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.spx-mtop .spx-live{display:inline-flex;align-items:center;gap:.28rem;font-size:.5rem;letter-spacing:.1em;text-transform:uppercase;color:#6ee7b7;border:1px solid rgba(52,211,153,.35);background:rgba(6,78,59,.3);padding:.28rem .5rem;border-radius:999px;flex-shrink:0}',
      '.spx-mtop .spx-live i{width:5px;height:5px;border-radius:50%;background:#34d399;box-shadow:0 0 8px #34d399}',
      '.spx-mtabs{display:none;position:fixed;left:0;right:0;bottom:0;z-index:75;grid-template-columns:repeat(5,1fr);padding:.28rem .15rem calc(.28rem + env(safe-area-inset-bottom));background:rgba(5,8,14,.98);border-top:1px solid var(--sp-line);backdrop-filter:blur(18px);box-shadow:0 -16px 40px rgba(0,0,0,.55)}',
      'body.spx-mobile .spx-mtabs{display:grid}',
      '.spx-mtab{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.12rem;border:0;background:transparent;color:rgba(200,205,214,.38);font-size:.48rem;letter-spacing:.03em;text-transform:uppercase;font-weight:700;font-family:inherit;padding:.3rem .05rem;min-height:50px;cursor:pointer;border-radius:.65rem;position:relative;-webkit-tap-highlight-color:transparent}',
      '.spx-mtab .ic{font-size:1.05rem;line-height:1;opacity:.7}',
      '.spx-mtab.is-on{color:#f1f5f9;background:rgba(200,205,214,.08)}',
      '.spx-mtab.is-on .ic{opacity:1;filter:drop-shadow(0 0 8px rgba(52,211,153,.45))}',
      '.spx-mtab.is-on::after{content:"";position:absolute;top:4px;width:16px;height:2px;border-radius:2px;background:linear-gradient(90deg,#94a3b8,#34d399)}',
      'body.spx-mobile .spx-panel{display:none;padding:0 0 1.25rem;animation:spx-fade .2s ease}',
      'body.spx-mobile .spx-panel.is-on{display:block}',
      '@keyframes spx-fade{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}',
      /* Hero mobile: short & sharp */
      'body.spx-mobile header.hero-bg{padding:3.6rem .75rem .85rem!important;border-bottom:1px solid rgba(200,205,214,.12)!important}',
      'body.spx-mobile header.hero-bg .max-w-5xl{padding-top:.35rem!important;padding-left:0!important;padding-right:0!important}',
      'body.spx-mobile header.hero-bg .inline-flex.items-center.gap-2{margin-bottom:.55rem!important;padding:.3rem .65rem!important;font-size:9px!important;letter-spacing:.14em!important}',
      'body.spx-mobile header.hero-bg .silver-rect{padding:.35rem .7rem!important;margin-bottom:.35rem!important;border-radius:12px!important}',
      'body.spx-mobile header.hero-bg h1{font-size:1.85rem!important;letter-spacing:-.03em!important;line-height:1!important;gap:.35rem!important}',
      'body.spx-mobile header.hero-bg h1 .silver-paw{font-size:1.5rem!important;margin-left:0!important}',
      'body.spx-mobile header.hero-bg .text-3xl,.body.spx-mobile header.hero-bg p.text-3xl{font-size:1.05rem!important;line-height:1.25!important;margin-top:.35rem!important}',
      'body.spx-mobile header.hero-bg .text-xl{display:none!important}',
      'body.spx-mobile header.hero-bg .mt-8.flex{display:none!important}',
      'body.spx-mobile header.hero-bg .mt-9{margin-top:.65rem!important;gap:.4rem!important}',
      'body.spx-mobile header.hero-bg .mt-9 a{padding:.65rem .9rem!important;font-size:.82rem!important;border-radius:999px!important;flex:1 1 auto;justify-content:center}',
      'body.spx-mobile header.hero-bg .mt-4{display:none!important}',
      'body.spx-mobile .spx-mlede{font-size:.86rem;line-height:1.45;color:rgba(226,232,240,.85);margin:.45rem 0 .55rem;padding:0 .1rem}',
      /* Board mobile compact */
      'body.spx-mobile .spx-board{padding:.55rem .7rem 0}',
      'body.spx-mobile .spx-hud{padding:.85rem .75rem .9rem;border-radius:1rem}',
      'body.spx-mobile .spx-title{font-size:1.15rem!important;margin-bottom:.25rem}',
      'body.spx-mobile .spx-lede{font-size:.8rem;margin-bottom:.65rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}',
      'body.spx-mobile .spx-meters{gap:.35rem;margin-bottom:.65rem}',
      'body.spx-mobile .spx-meter{padding:.5rem .45rem;border-radius:.7rem}',
      'body.spx-mobile .spx-meter b{font-size:1rem}',
      'body.spx-mobile .spx-meter span{font-size:.48rem}',
      'body.spx-mobile .spx-visits{max-height:none;gap:.35rem}',
      'body.spx-mobile .spx-visit{padding:.6rem .65rem;border-radius:.75rem}',
      'body.spx-mobile .spx-route{font-size:.82rem}',
      'body.spx-mobile .spx-note{font-size:.68rem}',
      'body.spx-mobile .spx-side{padding:.7rem;margin-top:.15rem}',
      'body.spx-mobile .spx-side h3{font-size:.9rem;margin-bottom:.35rem}',
      'body.spx-mobile .spx-chat{min-height:56px;max-height:72px;font-size:.68rem}',
      'body.spx-mobile .spx-cta{padding:.6rem .85rem;font-size:.78rem;min-height:42px;flex:1}',
      'body.spx-mobile .spx-scan{display:none}',
      'body.spx-mobile .spx-visit.is-extra{display:none}',
      'body.spx-mobile .spx-show-more{display:block;width:100%;margin-top:.35rem;padding:.55rem;border-radius:.7rem;border:1px dashed rgba(200,205,214,.3);background:transparent;color:rgba(200,205,214,.7);font-size:.72rem;font-family:inherit;cursor:pointer}',
      'body.spx-mobile.spx-show-all-lanes .spx-visit.is-extra{display:block}',
      'body.spx-mobile.spx-show-all-lanes .spx-show-more{display:none}',
      /* Sections inside panels */
      'body.spx-mobile section{padding-left:.7rem!important;padding-right:.7rem!important;padding-top:1rem!important;padding-bottom:1rem!important}',
      'body.spx-mobile section .section-title,body.spx-mobile section h2{font-size:1.35rem!important;letter-spacing:-.02em!important;line-height:1.15!important}',
      'body.spx-mobile section .text-5xl{font-size:1.35rem!important}',
      'body.spx-mobile section .text-4xl{font-size:1.25rem!important}',
      'body.spx-mobile section .text-3xl{font-size:1.1rem!important}',
      'body.spx-mobile section .text-lg{font-size:.88rem!important;line-height:1.45!important}',
      'body.spx-mobile section .text-xl{font-size:.92rem!important}',
      'body.spx-mobile #search .grid.md\\:grid-cols-2{gap:.55rem!important}',
      'body.spx-mobile #search .rounded-3xl{padding:1rem!important;border-radius:1rem!important}',
      'body.spx-mobile #search input{font-size:16px!important;padding:.75rem 1rem!important;border-radius:14px!important}',
      'body.spx-mobile #location-results,body.spx-mobile #facility-results{max-height:140px!important}',
      'body.spx-mobile #package .flex-col.lg\\:flex-row{gap:1rem!important}',
      'body.spx-mobile #activity-grid{grid-template-columns:1fr 1fr!important;gap:.4rem!important}',
      'body.spx-mobile #activity-grid .activity-chip,body.spx-mobile #activity-grid button{font-size:.72rem!important;padding:.55rem .45rem!important;min-height:44px}',
      'body.spx-mobile #package-preview{min-height:44px!important;font-size:.8rem!important;position:sticky;bottom:calc(4.8rem + env(safe-area-inset-bottom));z-index:20;border:1px solid rgba(200,205,214,.25);backdrop-filter:blur(10px)}',
      'body.spx-mobile #silver-grid,body.spx-mobile #reels-grid{grid-template-columns:1fr!important;gap:.65rem!important}',
      'body.spx-mobile .silver-card{padding:1rem!important;border-radius:1rem!important}',
      'body.spx-mobile #soul-search .silver-card{padding:1rem!important}',
      'body.spx-mobile #sp-quiz-container{padding:1rem!important}',
      'body.spx-mobile #referral-input{font-size:16px!important}',
      'body.spx-mobile .spx-panel > section:first-child{padding-top:.75rem!important}',
      'body.spx-mobile .spx-quick{display:grid;grid-template-columns:1fr 1fr;gap:.4rem;padding:.65rem .7rem 0}',
      'body.spx-mobile .spx-quick button{min-height:44px;border-radius:999px;border:1px solid rgba(200,205,214,.28);background:rgba(0,0,0,.35);color:#e8ecf4;font-size:.78rem;font-weight:700;font-family:inherit;cursor:pointer;padding:.55rem .5rem}',
      'body.spx-mobile .spx-quick button.pri{background:linear-gradient(135deg,#e8ecf4,#c8cdd6);color:#0a0f1c;border-color:transparent}',
      'body.spx-mobile .spx-mtruth{font-size:.6rem;line-height:1.35;color:rgba(200,205,214,.45);padding:.35rem .7rem .15rem}',
      '@media(prefers-reduced-motion:reduce){.spx-scan,.spx-bar > i,.spx-panel{animation:none!important;transition:none!important}}'
    ].join('\n');
    document.head.appendChild(s);
  }

  function boardHtml(compact) {
    var list = compact ? VISITS.slice(0, 3) : VISITS;
    var extra = compact ? VISITS.slice(3) : [];
    function visitCard(v, extraClass) {
      return (
        '<article class="spx-visit' + (extraClass || '') + '" data-vid="' + v.id + '">' +
          '<div class="spx-visit-top">' +
            '<span class="spx-id">' + v.id + '</span>' +
            '<span class="spx-status">' + v.status + '</span>' +
          '</div>' +
          '<p class="spx-route">' + v.home + ' · ' + v.city + '</p>' +
          '<p class="spx-note">' + v.dog + ' · ' + v.note + '</p>' +
          '<div class="spx-bar" aria-hidden="true"><i style="width:' + v.progress + '%"></i></div>' +
        '</article>'
      );
    }
    return (
      '<div class="spx-board" id="spx-board">' +
        '<div class="spx-hud">' +
          '<div class="spx-scan" aria-hidden="true"></div>' +
          '<p class="spx-kicker">Silver Paws command · $NIBBLES</p>' +
          '<h2 class="spx-title">' + (compact ? 'Visit control' : 'Visit control. Quiet tech. Real warmth.') + '</h2>' +
          '<p class="spx-lede">' + (compact
            ? 'Therapy routes for senior homes. Preview until partners and rails are live.'
            : 'A living board for senior-home therapy routes. Design preview now. Real schedules, partner homes, and treasury credits when rails and agreements are live.') + '</p>' +
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
                list.map(function (v) { return visitCard(v, ''); }).join('') +
                extra.map(function (v) { return visitCard(v, ' is-extra'); }).join('') +
              '</div>' +
              (compact ? '<button type="button" class="spx-show-more" id="spx-show-lanes">Show all 6 lanes</button>' : '') +
            '</div>' +
            '<div class="spx-side">' +
              '<h3>Floor chatter</h3>' +
              '<div class="spx-chat" id="spx-chat" aria-live="polite"></div>' +
              '<div class="spx-cta-row">' +
                '<button type="button" class="spx-cta spx-cta-main" data-spx-go="find">Find a home</button>' +
                '<button type="button" class="spx-cta spx-cta-ghost" data-spx-go="match">Match a dog</button>' +
              '</div>' +
              '<p class="spx-honest">Illustrative lanes. No live treasury credit. No fake GPS.</p>' +
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
        '<a href="index.html"><img src="assets/logos/shibahumanityhublogo3d-new.jpg" width="30" height="30" alt=""><span>SILVER PAWS</span></a>' +
        '<span class="spx-live"><i></i> Preview</span>' +
      '</div>' +
      '<nav class="spx-mtabs" aria-label="Silver Paws mobile">' +
        '<button type="button" class="spx-mtab is-on" data-tab="heart" role="tab" aria-selected="true"><span class="ic" aria-hidden="true">♥</span>Heart</button>' +
        '<button type="button" class="spx-mtab" data-tab="find" role="tab" aria-selected="false"><span class="ic" aria-hidden="true">◎</span>Find</button>' +
        '<button type="button" class="spx-mtab" data-tab="build" role="tab" aria-selected="false"><span class="ic" aria-hidden="true">✦</span>Build</button>' +
        '<button type="button" class="spx-mtab" data-tab="match" role="tab" aria-selected="false"><span class="ic" aria-hidden="true">🐾</span>Match</button>' +
        '<button type="button" class="spx-mtab" data-tab="more" role="tab" aria-selected="false"><span class="ic" aria-hidden="true">◆</span>More</button>' +
      '</nav>'
    );
  }

  function goTab(id) {
    if (!id) return;
    document.querySelectorAll('.spx-panel').forEach(function (p) {
      p.classList.toggle('is-on', p.getAttribute('data-spx-panel') === id);
    });
    document.querySelectorAll('.spx-mtab').forEach(function (t) {
      var on = t.getAttribute('data-tab') === id;
      t.classList.toggle('is-on', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    try {
      if (history.replaceState) history.replaceState(null, '', '#spx-' + id);
    } catch (e) { /* ignore */ }
    window.scrollTo(0, 0);
  }

  function compactHero(hero) {
    if (!hero) return;
    /* Replace long desktop lede with mobile-short copy once */
    if (hero.querySelector('.spx-mlede')) return;
    var longP = hero.querySelector('p.mt-7, p.text-xl');
    if (longP) {
      var short = document.createElement('p');
      short.className = 'spx-mlede';
      short.textContent = 'Gentle therapy dogs for quiet rooms. Search a home. Build a visit. Two hearts heal at once.';
      longP.parentNode.insertBefore(short, longP);
    }
    /* Hero CTAs become tab jumpers */
    hero.querySelectorAll('a[href="#spx-board"], a[href="#search"]').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      a.setAttribute('href', '#');
      a.addEventListener('click', function (ev) {
        ev.preventDefault();
        if (href.indexOf('search') !== -1) goTab('find');
        else {
          goTab('heart');
          var b = document.getElementById('spx-board');
          if (b) setTimeout(function () { b.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 40);
        }
      });
    });
  }

  function wrapPanels() {
    var hero = document.querySelector('header.hero-bg');
    var board = document.getElementById('spx-board');
    var search = document.getElementById('search');
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

    compactHero(hero);

    function panel(id, nodes) {
      var p = document.createElement('div');
      p.className = 'spx-panel' + (id === 'heart' ? ' is-on' : '');
      p.setAttribute('data-spx-panel', id);
      nodes.forEach(function (n) {
        if (n) p.appendChild(n);
      });
      return p;
    }

    var host = document.createElement('div');
    host.id = 'spx-mobile-host';

    /* Quick actions for heart */
    var quick = document.createElement('div');
    quick.className = 'spx-quick';
    quick.innerHTML =
      '<button type="button" class="pri" data-spx-go="find">Find a home</button>' +
      '<button type="button" data-spx-go="build">Build a visit</button>' +
      '<button type="button" data-spx-go="match">Match a dog</button>' +
      '<button type="button" data-spx-go="more">Reels &amp; angels</button>';

    var truth = document.createElement('p');
    truth.className = 'spx-mtruth';
    truth.textContent = 'Demo homes and visit lanes. Real partners replace this when agreements are live.';

    var heartNodes = [hero, quick, board, truth, magic].filter(Boolean);
    /* referral tucked under more so heart stays clean */
    var findNodes = [search, homes].filter(Boolean);
    var buildNodes = [packageSec].filter(Boolean);
    var matchNodes = [soul].filter(Boolean);
    var moreNodes = [referral, reels, circles, angels].filter(Boolean);

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

    document.querySelectorAll('.spx-mtab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        goTab(tab.getAttribute('data-tab'));
      });
    });
    document.querySelectorAll('[data-spx-go]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        goTab(btn.getAttribute('data-spx-go'));
      });
    });

    var showLanes = document.getElementById('spx-show-lanes');
    if (showLanes) {
      showLanes.addEventListener('click', function () {
        document.body.classList.add('spx-show-all-lanes');
      });
    }

    /* Deep link */
    var hash = (location.hash || '').replace(/^#/, '');
    if (hash.indexOf('spx-') === 0) goTab(hash.replace('spx-', ''));
    else if (hash === 'search' || hash === 'silver-homes' || hash === 'silver-grid') goTab('find');
    else if (hash === 'package') goTab('build');
    else if (hash === 'soul-search') goTab('match');
    else if (hash === 'reels' || hash === 'spx-angels') goTab('more');
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
    var mobile = isMobile();

    /* Inject rail + board after nav */
    var nav = document.querySelector('nav');
    var rail = document.createElement('div');
    rail.innerHTML = railHtml();
    var railEl = rail.firstChild;
    if (nav && nav.nextSibling) document.body.insertBefore(railEl, nav.nextSibling);
    else document.body.insertBefore(railEl, document.body.firstChild);

    var boardWrap = document.createElement('div');
    boardWrap.innerHTML = boardHtml(mobile);
    var boardEl = boardWrap.firstChild;
    var hero = document.querySelector('header.hero-bg');
    if (hero && hero.nextSibling) document.body.insertBefore(boardEl, hero.nextSibling);
    else if (hero) hero.parentNode.insertBefore(boardEl, hero.nextSibling);

    /* Mobile chrome + panel shell */
    if (mobile) {
      document.body.classList.add('spx-mobile');
      var chrome = document.createElement('div');
      chrome.innerHTML = mobileChromeHtml();
      while (chrome.firstChild) document.body.insertBefore(chrome.firstChild, document.body.firstChild);
      /* Wait a tick so layout paints, then rehome sections into tabs */
      setTimeout(wrapPanels, 30);
    }

    wireBoard();
    if (!mobile) wireRail();
    wireProgress();
    softLabelStories();

    document.querySelectorAll('section').forEach(function (sec) {
      if (sec.querySelector('#activity-grid') && !sec.id) sec.id = 'package';
      if (sec.querySelector('#silver-grid') && !sec.id) sec.id = 'silver-homes';
    });

    /* Desktop board CTAs still work via hash; mobile uses data-spx-go after wrap */
    document.querySelectorAll('[data-spx-go]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (document.body.classList.contains('spx-mobile')) goTab(btn.getAttribute('data-spx-go'));
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.SHHSilverPawsExperience = { init: init, isMobile: isMobile, goTab: goTab };
})();
