/**
 * Silver Paws · high-tech experience layer
 * Command board, chapter rail, visit HUD, mobile app-shell.
 * Keeps existing search / package / quiz / reels logic. Elevates the frame.
 * Truth: facilities, reels, treasury credits are demos until partners + rails are live.
 */
(function () {
  'use strict';

  var VISITS = [
    { id: 'SV-01', home: 'Maple Grove Villa', city: 'Toronto, ON', dog: 'Luna', photographer: 'Ava Chen', status: 'Ready (preview)', progress: 18, note: 'Bingo + memory portraits', team: 'Silver Unit A' },
    { id: 'SV-02', home: 'Sunset Villas', city: 'Phoenix, AZ', dog: 'Charlie', photographer: 'Marcus Reed', status: 'Route set', progress: 42, note: 'Lunch + keepsake photos', team: 'Desert Paws' },
    { id: 'SV-03', home: 'Golden Heart Manor', city: 'Vancouver, BC', dog: 'Mochi', photographer: 'Sofia Hale', status: 'Packing joy kit', progress: 61, note: 'Soft visit + portrait print', team: 'Coast Care' },
    { id: 'SV-04', home: 'Riverbend Residences', city: 'Chicago, IL', dog: 'Scout', photographer: 'Jordan Miles', status: 'Partner pending', progress: 12, note: 'Raffle night + photo cards', team: 'Midwest Mercy' },
    { id: 'SV-05', home: 'Harbour Light Senior', city: 'Halifax, NS', dog: 'Biscuit', photographer: 'Elena Brooks', status: 'Scheduled (design)', progress: 33, note: 'Story circle + album page', team: 'Atlantic Soft' },
    { id: 'SV-06', home: 'Palm Court Living', city: 'Tampa, FL', dog: 'Daisy', photographer: 'Noah Ellis', status: 'Ready (preview)', progress: 55, note: 'Music hour + soul-friend print', team: 'Sun Belt' }
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
      ':root{--sp-silver:#c5ccd6;--sp-platinum:#eef1f6;--sp-ink:#080a0f;--sp-panel:#0e121a;--sp-line:rgba(214,220,230,.3);--sp-glow:rgba(200,210,225,.28)}',
      /* Chapter rail = click panels (not scroll-the-page) */
      'body.spx-panels{scroll-behavior:auto}',
      'body.spx-panels .spx-panel{display:none;padding-bottom:2rem}',
      'body.spx-panels .spx-panel.is-on{display:block;animation:spx-fade .22s ease}',
      '.spx-rail{position:sticky;top:0;z-index:55;display:flex;gap:.3rem;padding:.45rem .75rem;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;background:rgba(8,10,15,.96);backdrop-filter:blur(16px);border-bottom:1px solid var(--sp-line);box-shadow:0 1px 0 rgba(255,255,255,.04),0 12px 40px -20px rgba(0,0,0,.65);justify-content:flex-start}',
      '.spx-rail::-webkit-scrollbar{display:none}',
      '@media(min-width:900px){.spx-rail{justify-content:center;flex-wrap:wrap;top:0}}',
      'body.spx-panels:not(.spx-mobile) > nav{position:relative}',
      'body.spx-panels:not(.spx-mobile) .spx-rail{top:0}',
      '.spx-rail button,.spx-rail a{flex:0 0 auto;font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;color:rgba(200,210,225,.5);padding:.4rem .75rem;border-radius:999px;border:1px solid transparent;white-space:nowrap;background:transparent;cursor:pointer;font-family:inherit;font-weight:600}',
      '.spx-rail button:hover,.spx-rail a:hover,.spx-rail button.is-on,.spx-rail a.is-on{color:#eef1f6;border-color:rgba(230,236,245,.45);background:linear-gradient(145deg,rgba(255,255,255,.1),rgba(200,210,225,.06));box-shadow:inset 0 1px 0 rgba(255,255,255,.12)}',
      /* See more cards on Heart */
      '.spx-more-grid{display:grid;grid-template-columns:1fr;gap:.55rem;max-width:72rem;margin:0 auto;padding:1rem .85rem 1.5rem}',
      '@media(min-width:640px){.spx-more-grid{grid-template-columns:1fr 1fr;padding:1.25rem 1.5rem 2rem}}',
      '@media(min-width:1000px){.spx-more-grid{grid-template-columns:repeat(3,1fr)}}',
      '.spx-more-card{text-align:left;border-radius:1.1rem;border:1px solid rgba(214,220,230,.28);background:linear-gradient(155deg,rgba(255,255,255,.07),rgba(12,16,24,.92));padding:1rem 1.05rem;cursor:pointer;font:inherit;color:inherit;transition:transform .2s,border-color .2s,box-shadow .2s;box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 16px 40px -24px rgba(0,0,0,.7)}',
      '.spx-more-card:hover{transform:translateY(-3px);border-color:rgba(238,241,246,.5);box-shadow:0 0 36px -12px rgba(220,228,238,.35),inset 0 1px 0 rgba(255,255,255,.12)}',
      '.spx-more-card .k{font-size:.55rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(200,210,225,.65);margin:0 0 .3rem}',
      '.spx-more-card h3{font-family:"Space Grotesk",sans-serif;font-size:1.1rem;margin:0 0 .35rem;color:#eef1f6;letter-spacing:-.02em}',
      '.spx-more-card p{margin:0;font-size:.82rem;line-height:1.4;color:rgba(200,210,225,.72)}',
      '.spx-more-card .go{display:inline-flex;margin-top:.65rem;font-size:.72rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#0a0d12;background:linear-gradient(135deg,#f7f8fb,#c5ccd6);padding:.4rem .75rem;border-radius:999px}',
      'body.spx-panels:not(.spx-mobile) .spx-quick{display:none}',
      'body.spx-panels:not(.spx-mobile) .spx-mtruth{max-width:72rem;margin:0 auto;padding:.25rem 1.5rem 0;font-size:.68rem;color:rgba(180,190,205,.5)}',
      'body.spx-panels:not(.spx-mobile) header.hero-bg{padding-top:5.5rem!important;padding-bottom:1.75rem!important}',
      'body.spx-panels footer{margin-top:0}',
      /* Command board · chrome HUD */
      '.spx-board{position:relative;max-width:72rem;margin:0 auto;padding:1.25rem 1rem 0}',
      '@media(min-width:768px){.spx-board{padding:1.75rem 1.5rem 0}}',
      '.spx-hud{position:relative;overflow:hidden;border-radius:1.35rem;border:1px solid rgba(230,236,245,.32);background:linear-gradient(145deg,rgba(255,255,255,.09) 0%,rgba(18,24,34,.96) 38%,rgba(8,10,15,.99) 100%);box-shadow:0 30px 80px -30px rgba(0,0,0,.8),0 0 50px -20px rgba(200,210,225,.2),inset 0 1px 0 rgba(255,255,255,.12);padding:1.15rem 1rem 1.25rem}',
      '@media(min-width:768px){.spx-hud{padding:1.5rem 1.5rem 1.6rem}}',
      '.spx-hud::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 80% 55% at 15% 0%,rgba(230,236,245,.16),transparent 55%),radial-gradient(ellipse 50% 40% at 100% 100%,rgba(160,170,185,.08),transparent 50%),linear-gradient(105deg,transparent 30%,rgba(255,255,255,.04) 48%,transparent 62%);pointer-events:none}',
      '.spx-hud::after{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);pointer-events:none}',
      '.spx-hud > *{position:relative;z-index:1}',
      '.spx-kicker{font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(200,210,225,.78);margin:0 0 .4rem}',
      '.spx-title{font-family:"Space Grotesk",Inter,system-ui,sans-serif;font-weight:700;letter-spacing:-.03em;font-size:clamp(1.35rem,3.5vw,1.85rem);background:linear-gradient(135deg,#fff 0%,#c5ccd6 45%,#f4f6fa 70%,#9aa3b0 100%);-webkit-background-clip:text;background-clip:text;color:transparent;margin:0 0 .35rem;line-height:1.15}',
      '.spx-lede{font-size:.9rem;line-height:1.5;color:rgba(220,226,236,.84);margin:0 0 1rem;max-width:40rem}',
      '.spx-meters{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:1rem}',
      '@media(min-width:640px){.spx-meters{grid-template-columns:repeat(4,1fr)}}',
      '.spx-meter{padding:.7rem .65rem;border-radius:.9rem;border:1px solid rgba(214,220,230,.22);background:linear-gradient(160deg,rgba(255,255,255,.06),rgba(0,0,0,.35));box-shadow:inset 0 1px 0 rgba(255,255,255,.06)}',
      '.spx-meter b{display:block;font-family:"Space Grotesk",sans-serif;font-size:1.2rem;color:#eef1f6;letter-spacing:-.02em;text-shadow:0 0 20px rgba(200,210,225,.25)}',
      '.spx-meter span{font-size:.55rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(200,210,225,.55)}',
      '.spx-grid{display:grid;gap:.55rem}',
      '@media(min-width:900px){.spx-grid{grid-template-columns:1.15fr .85fr}}',
      '.spx-visits{display:grid;gap:.45rem;max-height:280px;overflow:auto;-webkit-overflow-scrolling:touch;padding-right:.15rem}',
      '.spx-visit{border-radius:.9rem;border:1px solid rgba(214,220,230,.2);background:linear-gradient(155deg,rgba(255,255,255,.05),rgba(0,0,0,.42));padding:.75rem .8rem;box-shadow:inset 0 1px 0 rgba(255,255,255,.05)}',
      '.spx-visit-top{display:flex;justify-content:space-between;align-items:center;gap:.4rem;margin-bottom:.25rem}',
      '.spx-id{font-family:ui-monospace,monospace;font-size:.7rem;color:#c5ccd6;letter-spacing:.04em}',
      '.spx-status{font-size:.52rem;letter-spacing:.1em;text-transform:uppercase;color:#e8ecf2;border:1px solid rgba(230,236,245,.35);background:linear-gradient(145deg,rgba(255,255,255,.1),rgba(160,170,185,.12));padding:.2rem .45rem;border-radius:999px}',
      '.spx-route{font-size:.88rem;font-weight:600;color:#f3f5f8;margin:0 0 .2rem}',
      '.spx-note{font-size:.72rem;color:rgba(200,210,225,.72);margin:0}',
      '.spx-bar{height:4px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden;margin:.45rem 0 .2rem}',
      '.spx-bar > i{display:block;height:100%;width:0;border-radius:999px;background:linear-gradient(90deg,#6b7280,#c5ccd6,#f4f6fa,#9aa3b0);background-size:200% 100%;box-shadow:0 0 10px rgba(220,228,238,.4);transition:width 1s ease;animation:spx-chrome 3.5s linear infinite}',
      '@keyframes spx-chrome{to{background-position:200% 50%}}',
      '.spx-side{border-radius:1rem;border:1px solid rgba(214,220,230,.22);background:linear-gradient(165deg,rgba(255,255,255,.05),rgba(0,0,0,.4));padding:.9rem;box-shadow:inset 0 1px 0 rgba(255,255,255,.06)}',
      '.spx-side h3{font-family:"Space Grotesk",sans-serif;font-size:1rem;color:#eef1f6;margin:0 0 .5rem}',
      '.spx-chat{min-height:120px;max-height:160px;overflow:auto;font-size:.72rem;line-height:1.35;color:rgba(220,226,236,.78)}',
      '.spx-chat .line{margin-bottom:.35rem}',
      '.spx-chat b{color:#d7dde6}',
      '.spx-honest{font-size:.62rem;line-height:1.4;color:rgba(180,190,205,.48);margin:.65rem 0 0}',
      '.spx-cta-row{display:flex;flex-wrap:wrap;gap:.45rem;margin-top:.85rem}',
      '.spx-cta{display:inline-flex;align-items:center;justify-content:center;padding:.7rem 1.05rem;border-radius:999px;font-weight:700;font-size:.82rem;text-decoration:none;min-height:44px;border:0;cursor:pointer;font-family:inherit}',
      '.spx-cta-main{color:#0a0d12;background:linear-gradient(135deg,#f7f8fb,#d7dde6 45%,#aeb6c2 85%,#eef1f6);box-shadow:0 10px 28px -12px rgba(200,210,225,.55),inset 0 1px 0 rgba(255,255,255,.7)}',
      '.spx-cta-ghost{color:#eef1f6;border:1px solid rgba(230,236,245,.35);background:rgba(0,0,0,.28);box-shadow:inset 0 1px 0 rgba(255,255,255,.06)}',
      /* Scan line on board */
      '.spx-scan{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent);animation:spx-scan 5.5s linear infinite;pointer-events:none;opacity:.55;box-shadow:0 0 12px rgba(220,228,238,.35)}',
      '@keyframes spx-scan{0%{top:8%}100%{top:92%}}',
      /* Hero polish inject */
      'body.spx-ready header.hero-bg{position:relative;overflow:hidden}',
      'body.spx-ready header.hero-bg::after{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 80% 55% at 50% 0%,rgba(230,236,245,.14),transparent 58%),linear-gradient(180deg,transparent 35%,rgba(8,10,15,.88))}',
      'body.spx-ready .spx-progress{position:fixed;top:0;left:0;height:2px;width:0;z-index:80;background:linear-gradient(90deg,#6b7280,#c5ccd6,#f4f6fa,#9aa3b0);box-shadow:0 0 14px rgba(220,228,238,.55)}',
      /* Soft section cards */
      'body.spx-ready #search > div:first-child h2,.spx-lift{letter-spacing:-.03em}',
      'body.spx-ready #search .bg-zinc-900\\/70{border-color:rgba(214,220,230,.28)!important;background:linear-gradient(160deg,rgba(255,255,255,.06),rgba(12,16,24,.95))!important}',
      'body.spx-ready .search-input:focus{border-color:rgba(230,236,245,.5)!important;box-shadow:0 0 0 3px rgba(200,210,225,.1)!important}',
      /* Mobile shell — app-native, dense, thumb-first */
      'body.spx-mobile{padding-bottom:calc(4.6rem + env(safe-area-inset-bottom));overflow-x:hidden;background:#070b14!important}',
      'body.spx-mobile .spx-rail{display:none!important}',
      'body.spx-mobile > nav{display:none!important}',
      'body.spx-mobile > footer{padding:1.5rem 1rem 6rem!important;font-size:11px!important}',
      'body.spx-mobile #mobile-menu{display:none!important}',
      'body.spx-mobile .fixed.bottom-3{display:none!important}',
      'body.spx-mobile .spx-progress{top:0;z-index:85}',
      'body.spx-mobile .silver-bg-layer,body.spx-mobile .scroll-warmth{opacity:.04!important}',
      'body.spx-panels:not(.spx-mobile) > nav{display:block}',
      'body.spx-panels:not(.spx-mobile){padding-bottom:0}',
      '.spx-mtop{display:none;position:sticky;top:0;z-index:70;align-items:center;justify-content:space-between;gap:.5rem;padding:.5rem .7rem;padding-top:max(.45rem,env(safe-area-inset-top));background:rgba(7,11,20,.97);backdrop-filter:blur(16px);border-bottom:1px solid var(--sp-line)}',
      'body.spx-mobile .spx-mtop{display:flex}',
      '.spx-mtop a{display:flex;align-items:center;gap:.4rem;text-decoration:none;color:inherit;min-width:0}',
      '.spx-mtop img{width:30px;height:30px;border-radius:50%;object-fit:cover;border:1px solid rgba(200,205,214,.4)}',
      '.spx-mtop span{font-size:.65rem;font-weight:700;letter-spacing:.05em;color:#e8ecf4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.spx-mtop .spx-live{display:inline-flex;align-items:center;gap:.28rem;font-size:.5rem;letter-spacing:.1em;text-transform:uppercase;color:#e8ecf2;border:1px solid rgba(230,236,245,.4);background:linear-gradient(145deg,rgba(255,255,255,.1),rgba(160,170,185,.12));padding:.28rem .5rem;border-radius:999px;flex-shrink:0}',
      '.spx-mtop .spx-live i{width:5px;height:5px;border-radius:50%;background:#eef1f6;box-shadow:0 0 8px rgba(230,236,245,.7)}',
      '.spx-mtabs{display:none;position:fixed;left:0;right:0;bottom:0;z-index:75;grid-template-columns:repeat(5,1fr);padding:.28rem .15rem calc(.28rem + env(safe-area-inset-bottom));background:rgba(6,8,12,.98);border-top:1px solid var(--sp-line);backdrop-filter:blur(18px);box-shadow:0 -16px 40px rgba(0,0,0,.55),0 -1px 0 rgba(255,255,255,.04)}',
      'body.spx-mobile .spx-mtabs{display:grid}',
      '.spx-mtab{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.12rem;border:0;background:transparent;color:rgba(200,210,225,.38);font-size:.48rem;letter-spacing:.03em;text-transform:uppercase;font-weight:700;font-family:inherit;padding:.3rem .05rem;min-height:50px;cursor:pointer;border-radius:.65rem;position:relative;-webkit-tap-highlight-color:transparent}',
      '.spx-mtab .ic{font-size:1.05rem;line-height:1;opacity:.7}',
      '.spx-mtab.is-on{color:#f4f6fa;background:linear-gradient(180deg,rgba(255,255,255,.1),rgba(200,210,225,.05))}',
      '.spx-mtab.is-on .ic{opacity:1;filter:drop-shadow(0 0 8px rgba(220,228,238,.5))}',
      '.spx-mtab.is-on::after{content:"";position:absolute;top:4px;width:16px;height:2px;border-radius:2px;background:linear-gradient(90deg,#9aa3b0,#eef1f6,#c5ccd6)}',
      'body.spx-mobile .spx-panel{padding:0 0 1.25rem}',
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
      'body.spx-mobile .spx-quick button.pri{background:linear-gradient(135deg,#f7f8fb,#d7dde6 50%,#aeb6c2);color:#0a0d12;border-color:transparent;box-shadow:0 8px 22px -10px rgba(200,210,225,.5),inset 0 1px 0 rgba(255,255,255,.65)}',
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
        '<article class="spx-visit' + (extraClass || '') + '" data-vid="' + v.id + '" tabindex="0">' +
          '<div class="spx-visit-top">' +
            '<span class="spx-id">' + v.id + '</span>' +
            '<span class="spx-status">' + v.status + '</span>' +
          '</div>' +
          '<p class="spx-route">' + v.home + ' · ' + v.city + '</p>' +
          '<p class="spx-note">🐾 ' + v.dog + ' · 📷 ' + (v.photographer || 'Visit photographer') + ' · ' + v.note + '</p>' +
          '<div class="spx-bar" aria-hidden="true"><i style="width:' + v.progress + '%"></i></div>' +
        '</article>'
      );
    }
    return (
      '<div class="spx-board" id="spx-board">' +
        '<div class="spx-hud" id="spx-hud">' +
          '<div class="spx-scan" aria-hidden="true"></div>' +
          '<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.5rem;margin-bottom:.35rem">' +
            '<p class="spx-kicker" style="margin:0">Silver forge · visit command · $NIBBLES</p>' +
            '<span class="spx-kicker" style="margin:0;opacity:.7" id="spx-clock"></span>' +
          '</div>' +
          '<h2 class="spx-title">' + (compact ? 'Quiet tech. Real warmth.' : 'Visit control. Quiet tech. Real warmth.') + '</h2>' +
          '<p class="spx-lede">' + (compact
            ? 'Therapy routes for senior homes. Preview until partners and rails are live.'
            : 'A living board for senior-home therapy routes. Design preview now. Real schedules, partner homes, and treasury credits when rails and agreements are live. No theater. Only the system that will carry the love.') + '</p>' +
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
              '<button type="button" class="spx-show-more" id="spx-show-lanes" style="' + (compact ? '' : 'display:none') + '">Show all 6 lanes</button>' +
            '</div>' +
            '<div class="spx-side">' +
              '<h3>Floor chatter</h3>' +
              '<div class="spx-chat" id="spx-chat" aria-live="polite"></div>' +
              '<div class="spx-cta-row">' +
                '<button type="button" class="spx-cta spx-cta-main" data-spx-go="find">Find a home</button>' +
                '<button type="button" class="spx-cta spx-cta-ghost" data-spx-go="match">Match a dog</button>' +
              '</div>' +
              '<p class="spx-honest">Illustrative lanes. No live treasury credit. No fake GPS. Click a chapter below to open it. No need to scroll the whole page.</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function railHtml() {
    return (
      '<nav class="spx-rail" id="spx-rail" aria-label="Silver Paws sections" role="tablist">' +
        '<button type="button" class="is-on" data-spx-go="heart" role="tab" aria-selected="true">Heart</button>' +
        '<button type="button" data-spx-go="find" role="tab">Find</button>' +
        '<button type="button" data-spx-go="build" role="tab">Build visit</button>' +
        '<button type="button" data-spx-go="match" role="tab">Match</button>' +
        '<button type="button" data-spx-go="homes" role="tab">Homes</button>' +
        '<button type="button" data-spx-go="more" role="tab">Reels &amp; more</button>' +
      '</nav>'
    );
  }

  function seeMoreGridHtml() {
    var cards = [
      { go: 'find', k: '01 · Locate', title: 'Find a home', p: 'Search cities and senior homes across Canada and the USA.', cta: 'See more' },
      { go: 'build', k: '02 · Design', title: 'Build a visit', p: 'Bingo, lunch, stories, and a photographer for keepsake photos with their soul friend.', cta: 'See more' },
      { go: 'match', k: '03 · Pair', title: 'Match a dog', p: 'Quiet questionnaire. Right presence for the right soul.', cta: 'See more' },
      { go: 'homes', k: '04 · Browse', title: 'Homes & visits', p: 'Directory cards and schedule intent when you are ready.', cta: 'See more' },
      { go: 'more', k: '05 · Share', title: 'Reels, angels, circles', p: 'Memories, sponsor wall, and how holdings fund visits.', cta: 'See more' }
    ];
    return (
      '<div class="spx-more-grid" id="spx-more-grid" aria-label="Open a section">' +
        cards.map(function (c) {
          return (
            '<button type="button" class="spx-more-card" data-spx-go="' + c.go + '">' +
              '<p class="k">' + c.k + '</p>' +
              '<h3>' + c.title + '</h3>' +
              '<p>' + c.p + '</p>' +
              '<span class="go">' + c.cta + ' →</span>' +
            '</button>'
          );
        }).join('') +
      '</div>'
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
    /* homes is separate panel on desktop; mobile maps homes into find */
    if (id === 'homes' && isMobile()) id = 'find';
    document.querySelectorAll('.spx-panel').forEach(function (p) {
      p.classList.toggle('is-on', p.getAttribute('data-spx-panel') === id);
    });
    document.querySelectorAll('.spx-mtab').forEach(function (t) {
      var tab = t.getAttribute('data-tab');
      var on = tab === id || (id === 'homes' && tab === 'find');
      t.classList.toggle('is-on', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    document.querySelectorAll('#spx-rail [data-spx-go]').forEach(function (t) {
      var on = t.getAttribute('data-spx-go') === id;
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
    if (!hero.querySelector('.spx-mlede')) {
      var longP = hero.querySelector('p.mt-7, p.text-xl');
      if (longP && isMobile()) {
        var short = document.createElement('p');
        short.className = 'spx-mlede';
        short.textContent = 'Gentle therapy dogs for quiet rooms. Click below to open a section. No endless scroll.';
        longP.parentNode.insertBefore(short, longP);
      }
    }
    hero.querySelectorAll('a[href="#spx-board"], a[href="#search"]').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      a.setAttribute('href', '#');
      a.addEventListener('click', function (ev) {
        ev.preventDefault();
        if (href.indexOf('search') !== -1) goTab('find');
        else goTab('heart');
      });
    });
  }

  function bindGoClicks(root) {
    (root || document).querySelectorAll('[data-spx-go]').forEach(function (btn) {
      if (btn.getAttribute('data-spx-bound') === '1') return;
      btn.setAttribute('data-spx-bound', '1');
      btn.addEventListener('click', function (ev) {
        ev.preventDefault();
        goTab(btn.getAttribute('data-spx-go'));
      });
    });
  }

  function wrapPanels() {
    if (document.getElementById('spx-panel-host')) return;
    document.body.classList.add('spx-panels');

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
      p.setAttribute('role', 'tabpanel');
      nodes.forEach(function (n) {
        if (n) p.appendChild(n);
      });
      return p;
    }

    var host = document.createElement('div');
    host.id = 'spx-panel-host';

    var quick = document.createElement('div');
    quick.className = 'spx-quick';
    quick.innerHTML =
      '<button type="button" class="pri" data-spx-go="find">Find a home</button>' +
      '<button type="button" data-spx-go="build">Build a visit</button>' +
      '<button type="button" data-spx-go="match">Match a dog</button>' +
      '<button type="button" data-spx-go="more">Reels &amp; more</button>';

    var moreGrid = document.createElement('div');
    moreGrid.innerHTML = seeMoreGridHtml();
    moreGrid = moreGrid.firstChild;

    var truth = document.createElement('p');
    truth.className = 'spx-mtruth';
    truth.textContent = 'Demo homes and visit lanes. Open a section with See more. Real partners replace demos when agreements are live.';

    /* Heart stays light: hero + board + see-more cards. Stories live under more. */
    var heartNodes = [hero, quick, board, moreGrid, truth].filter(Boolean);
    var findNodes = isMobile() ? [search, homes].filter(Boolean) : [search].filter(Boolean);
    var buildNodes = [packageSec].filter(Boolean);
    var matchNodes = [soul].filter(Boolean);
    var homesNodes = [homes].filter(Boolean);
    var moreNodes = [magic, referral, reels, circles, angels].filter(Boolean);

    [hero, board, referral, search, packageSec, soul, homes, reels, magic, circles, angels].forEach(function (n) {
      if (n && n.parentNode) n.parentNode.removeChild(n);
    });

    host.appendChild(panel('heart', heartNodes));
    host.appendChild(panel('find', findNodes));
    host.appendChild(panel('build', buildNodes));
    host.appendChild(panel('match', matchNodes));
    if (!isMobile()) host.appendChild(panel('homes', homesNodes));
    host.appendChild(panel('more', moreNodes));

    var footer = document.querySelector('footer');
    if (footer) document.body.insertBefore(host, footer);
    else document.body.appendChild(host);

    document.querySelectorAll('.spx-mtab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        goTab(tab.getAttribute('data-tab'));
      });
    });
    bindGoClicks(document);

    var showLanes = document.getElementById('spx-show-lanes');
    if (showLanes) {
      showLanes.addEventListener('click', function () {
        document.body.classList.add('spx-show-all-lanes');
        showLanes.style.display = 'none';
      });
    }

    var hash = (location.hash || '').replace(/^#/, '');
    if (hash.indexOf('spx-') === 0) goTab(hash.replace('spx-', ''));
    else if (hash === 'search') goTab('find');
    else if (hash === 'silver-homes' || hash === 'silver-grid') goTab(isMobile() ? 'find' : 'homes');
    else if (hash === 'package') goTab('build');
    else if (hash === 'soul-search') goTab('match');
    else if (hash === 'reels' || hash === 'spx-angels') goTab('more');
    else goTab('heart');
  }

  function wireBoard() {
    var chat = document.getElementById('spx-chat');
    var lines = [
      ['@desk', 'Maple Grove queued. Photographer Ava confirmed.'],
      ['@luna', 'Calm mode. Soft light. Portrait chair ready.'],
      ['@route', 'SV-02 Phoenix · Marcus packing print kits.'],
      ['@heart', 'Two hearts. One photo they can keep forever.'],
      ['@truth', 'Preview board. Real homes when agreements land.'],
      ['@scout', 'Chicago · prints for every senior on the list.']
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

  function wireProgress() {
    /* Thin progress only inside the active panel scroll depth */
    var bar = document.createElement('div');
    bar.className = 'spx-progress';
    bar.id = 'spx-progress';
    document.body.appendChild(bar);
    function onScroll() {
      var panel = document.querySelector('.spx-panel.is-on') || document.documentElement;
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var p = max > 0 ? (h.scrollTop / max) * 100 : 0;
      bar.style.width = Math.min(100, p) + '%';
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
      tag.style.cssText = 'font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:rgba(200,210,225,.55);margin-bottom:8px';
      tag.textContent = 'Illustrative story · design';
      card.insertBefore(tag, card.firstChild);
    });
  }

  function forgeDust() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (document.getElementById('sp-forge-dust')) return;
    var box = document.createElement('div');
    box.className = 'sp-forge-dust';
    box.id = 'sp-forge-dust';
    box.setAttribute('aria-hidden', 'true');
    var n = isMobile() ? 14 : 28;
    for (var i = 0; i < n; i++) {
      var d = document.createElement('i');
      d.style.left = Math.random() * 100 + '%';
      d.style.bottom = Math.random() * 20 + '%';
      d.style.animationDuration = 8 + Math.random() * 14 + 's';
      d.style.animationDelay = Math.random() * 10 + 's';
      d.style.width = d.style.height = (1 + Math.random() * 2.5) + 'px';
      box.appendChild(d);
    }
    document.body.appendChild(box);
  }

  function revealOnScroll() {
    /* Panels already fade in; mark active content visible immediately */
    document.querySelectorAll('.spx-panel.is-on .sp-reveal, .spx-panel.is-on').forEach(function (el) {
      el.classList.add('is-in');
    });
    document.querySelectorAll('.sp-reveal').forEach(function (el) {
      el.classList.add('is-in');
    });
  }

  function hudClock() {
    var el = document.getElementById('spx-clock');
    if (!el) return;
    function tick() {
      var d = new Date();
      el.textContent = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' · forge clock';
    }
    tick();
    setInterval(tick, 1000);
  }

  function wireVisitFocus() {
    var visits = document.querySelectorAll('.spx-visit');
    visits.forEach(function (v) {
      function hot() {
        visits.forEach(function (x) { x.classList.remove('is-hot'); });
        v.classList.add('is-hot');
      }
      v.addEventListener('mouseenter', hot);
      v.addEventListener('focus', hot);
      v.addEventListener('click', hot);
    });
    if (visits[0]) visits[0].classList.add('is-hot');
  }

  function meterCountUp() {
    function run(id, target, dur) {
      var el = document.getElementById(id);
      if (!el) return;
      var start = 0;
      var t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur);
        var ease = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(start + (target - start) * ease));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    setTimeout(function () {
      var homes = (window.facilitiesData && window.facilitiesData.length) || 48;
      var acts = document.querySelectorAll('#activity-grid .activity-chip, #activity-grid button').length || 12;
      run('spx-m-routes', 6, 900);
      run('spx-m-homes', homes, 1100);
      run('spx-m-acts', acts, 1000);
      run('spx-m-heart', 2, 700);
    }, 200);
  }

  function init() {
    if (!document.body || document.getElementById('spx-board')) return;
    styles();
    document.body.classList.add('spx-ready');
    var mobile = isMobile();
    forgeDust();

    /* Inject rail after nav (desktop click-nav). Mobile uses bottom tabs. */
    var nav = document.querySelector('nav');
    var rail = document.createElement('div');
    rail.innerHTML = railHtml();
    var railEl = rail.firstChild;
    if (nav && nav.nextSibling) document.body.insertBefore(railEl, nav.nextSibling);
    else document.body.insertBefore(railEl, document.body.firstChild);

    /* Board always compact-first: 3 lanes + see more */
    var boardWrap = document.createElement('div');
    boardWrap.innerHTML = boardHtml(true);
    var boardEl = boardWrap.firstChild;
    var hero = document.querySelector('header.hero-bg');
    if (hero && hero.nextSibling) document.body.insertBefore(boardEl, hero.nextSibling);
    else if (hero) hero.parentNode.insertBefore(boardEl, hero.nextSibling);

    if (mobile) {
      document.body.classList.add('spx-mobile');
      var chrome = document.createElement('div');
      chrome.innerHTML = mobileChromeHtml();
      while (chrome.firstChild) document.body.insertBefore(chrome.firstChild, document.body.firstChild);
    }

    /* Always panel mode: click to open, not scroll the whole page */
    setTimeout(function () {
      wrapPanels();
      wireBoard();
      wireProgress();
      softLabelStories();
      hudClock();
      wireVisitFocus();
      meterCountUp();
      revealOnScroll();
      bindGoClicks(document);
    }, 30);

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

  window.SHHSilverPawsExperience = { init: init, isMobile: isMobile, goTab: goTab };
})();
