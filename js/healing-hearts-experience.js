/**
 * Healing Hearts · forge-level experience layer
 * Pipeline: recruit → train → certify → place (multi-setting).
 * HH = network engine. Silver Paws = senior visit product.
 * Truth: design demos until funded + agreements live.
 */
(function () {
  'use strict';

  var LANES = [
    { id: 'HH-01', dog: 'Willow', stage: 'Temperament screen', setting: 'Hospital pediatrics', progress: 22, team: 'Coast Care', note: 'Shelter calm · vest pending' },
    { id: 'HH-02', dog: 'Bear', stage: 'Handler pairing', setting: 'VA community hall', progress: 48, team: 'Midwest Mercy', note: 'Veteran soft-approach training' },
    { id: 'HH-03', dog: 'Nori', stage: 'Cert path', setting: 'Elementary school', progress: 61, team: 'Prairie Soft', note: 'Reading-buddy protocol' },
    { id: 'HH-04', dog: 'Atlas', stage: 'Placement ready', setting: 'Hospice wing', progress: 78, team: 'Quiet Light', note: 'Low-stim · consent first' },
    { id: 'HH-05', dog: 'Mabel', stage: 'Silver Paws feed', setting: 'Senior homes (SP)', progress: 35, team: 'Silver Unit A', note: 'Routes into Silver Paws product' },
    { id: 'HH-06', dog: 'Theo', stage: 'Recruit intake', setting: 'Community clinic', progress: 12, team: 'Atlantic Soft', note: 'Shelter pull · design lane' }
  ];

  var SETTINGS = [
    { id: 'hospital', icon: '🏥', title: 'Hospitals & clinics', blurb: 'Bedsides, waiting rooms, pediatric wings. Soft presence. Infection-control aware protocols when partners are live.' },
    { id: 'school', icon: '📚', title: 'Schools & libraries', blurb: 'Reading buddies, calm corners, special-needs support. Handlers stay with every dog.' },
    { id: 'hospice', icon: '🕯️', title: 'Hospice & palliative', blurb: 'Quiet companionship when words run out. Consent and family comfort first.' },
    { id: 'veteran', icon: '🎖️', title: 'Veteran & community', blurb: 'VA halls, support groups, and community programs that need a steady friend in the room.' },
    { id: 'senior-sp', icon: '🐾', title: 'Seniors via Silver Paws', blurb: 'HH trains and certifies. Silver Paws runs the senior visit product: packages, homes directory, photographer.' },
    { id: 'disaster-soft', icon: '💚', title: 'Soft community recovery', blurb: 'When a town needs comfort after hard news. Not SAR (that is K9 Lifeline). Therapy presence only.' }
  ];

  var PIPELINE = [
    { n: '01', title: 'Recruit', body: 'Gentle shelter dogs with steady temperament. No force. Health and behavior screens before any training dollar is spent.' },
    { n: '02', title: 'Train', body: 'Handler pairing, public-access manners, multi-setting drills, and emotional regulation around medical gear and crowds.' },
    { n: '03', title: 'Certify', body: 'Independent evaluation path (design). Vest, passport entry, and clear pass/hold/retire decisions. Truth over volume.' },
    { n: '04', title: 'Place', body: 'Match dog + handler to a setting that fits. Hospitals, schools, hospice, community — or feed into Silver Paws for seniors.' },
    { n: '05', title: 'Support', body: 'Ongoing wellness for dog and handler. Rest days. Retire with dignity into Golden Paws or companion homes when the work is done.' }
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

  function reducedMotion() {
    try {
      return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {
      return false;
    }
  }

  function styles() {
    if (document.getElementById('hhx-css')) return;
    var s = document.createElement('style');
    s.id = 'hhx-css';
    s.textContent = [
      ':root{--hh-rose:#f4a8ba;--hh-coral:#ef8a9c;--hh-blush:#ffe8ef;--hh-gold:#f5d0a9;--hh-ink:#07060a;--hh-panel:#120e14;--hh-line:rgba(244,168,186,.34);--hh-glow:rgba(239,138,156,.4);--hh-emerald:#6ee7b7}',
      'body.hhx-panels{scroll-behavior:auto}',
      'body.hhx-panels .hhx-panel{display:none;padding-bottom:2rem}',
      'body.hhx-panels .hhx-panel.is-on{display:block;animation:hhx-fade .18s ease}',
      /* Pause experience FX while scrolling */
      'body.is-scrolling .hhx-scan,body.is-scrolling .hhx-bar > i,body.is-scrolling .hhx-kicker .pulse,body.is-scrolling .hhx-pipe-beam,body.is-scrolling .hhx-pipe-card .node,body.is-scrolling .hhx-mtop .hhx-live i{animation-play-state:paused!important}',
      'body.is-scrolling .hhx-dust{visibility:hidden!important}',
      'body.is-scrolling .hhx-title,body.is-scrolling .hhx-section-head h2{filter:none!important}',
      /* Rail — solid bg, no blur (blur is expensive over scrolling content) */
      '.hhx-rail{position:sticky;top:0;z-index:55;display:flex;gap:.35rem;padding:.5rem .85rem;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;background:rgba(7,6,10,.98);border-bottom:1px solid var(--hh-line);box-shadow:0 1px 0 rgba(255,255,255,.04);justify-content:flex-start}',
      '.hhx-rail::-webkit-scrollbar{display:none}',
      '@media(min-width:900px){.hhx-rail{justify-content:center;flex-wrap:wrap}}',
      '.hhx-rail button,.hhx-rail a{flex:0 0 auto;font-size:.58rem;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;color:rgba(244,168,186,.5);padding:.45rem .85rem;border-radius:999px;border:1px solid transparent;white-space:nowrap;background:transparent;cursor:pointer;font-family:inherit;font-weight:700;transition:all .2s}',
      '.hhx-rail button:hover,.hhx-rail a:hover,.hhx-rail button.is-on,.hhx-rail a.is-on{color:#ffe8ef;border-color:rgba(244,168,186,.55);background:linear-gradient(145deg,rgba(244,168,186,.18),rgba(110,231,183,.08));box-shadow:inset 0 1px 0 rgba(255,255,255,.12),0 0 24px -6px rgba(244,168,186,.45)}',
      /* See more */
      '.hhx-more-grid{display:grid;grid-template-columns:1fr;gap:.65rem;max-width:72rem;margin:0 auto;padding:1.1rem .85rem 1.75rem}',
      '@media(min-width:640px){.hhx-more-grid{grid-template-columns:1fr 1fr;padding:1.4rem 1.5rem 2rem}}',
      '@media(min-width:1000px){.hhx-more-grid{grid-template-columns:repeat(3,1fr)}}',
      '.hhx-more-card{position:relative;text-align:left;border-radius:1.25rem;border:1px solid rgba(244,168,186,.3);background:linear-gradient(155deg,rgba(244,168,186,.1),rgba(14,10,16,.96));padding:1.15rem 1.15rem 1.2rem;cursor:pointer;font:inherit;color:inherit;overflow:hidden;transition:transform .25s,border-color .25s,box-shadow .25s;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 20px 48px -28px rgba(0,0,0,.75)}',
      '.hhx-more-card::before{content:"";position:absolute;top:0;left:-40%;width:40%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent);transform:skewX(-18deg);transition:left .7s ease;pointer-events:none}',
      '.hhx-more-card:hover{transform:translateY(-5px);border-color:rgba(255,232,239,.6);box-shadow:0 0 48px -10px rgba(239,138,156,.5),inset 0 1px 0 rgba(255,255,255,.14)}',
      '.hhx-more-card:hover::before{left:120%}',
      '.hhx-more-card .k{font-size:.55rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(244,168,186,.75);margin:0 0 .35rem}',
      '.hhx-more-card h3{font-family:"Space Grotesk",sans-serif;font-size:1.2rem;margin:0 0 .4rem;color:#ffe8ef;letter-spacing:-.025em}',
      '.hhx-more-card p{margin:0;font-size:.84rem;line-height:1.45;color:rgba(244,200,210,.78)}',
      '.hhx-more-card .go{display:inline-flex;margin-top:.75rem;font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#1a0a10;background:linear-gradient(135deg,#ffe8ef,#f4a8ba 50%,#ef8a9c);padding:.45rem .85rem;border-radius:999px;box-shadow:0 8px 20px -8px rgba(239,138,156,.55)}',
      'body.hhx-panels:not(.hhx-mobile) .hhx-quick{display:none}',
      'body.hhx-panels:not(.hhx-mobile) .hhx-mtruth{max-width:72rem;margin:0 auto;padding:.35rem 1.5rem 0;font-size:.68rem;color:rgba(200,160,175,.5);letter-spacing:.04em}',
      'body.hhx-panels:not(.hhx-mobile) header.hero-bg{padding-top:5.75rem!important;padding-bottom:2rem!important}',
      'body.hhx-panels footer{margin-top:0}',
      /* Command board */
      '.hhx-board{position:relative;max-width:72rem;margin:0 auto;padding:1.35rem 1rem 0}',
      '@media(min-width:768px){.hhx-board{padding:1.85rem 1.5rem 0}}',
      '.hhx-hud{position:relative;overflow:hidden;border-radius:1.5rem;border:1px solid rgba(244,168,186,.4);background:linear-gradient(145deg,rgba(244,168,186,.12) 0%,rgba(22,12,18,.98) 38%,rgba(7,6,10,.99) 100%);box-shadow:0 36px 90px -30px rgba(0,0,0,.88),0 0 70px -16px rgba(239,138,156,.3),inset 0 1px 0 rgba(255,255,255,.14);padding:1.25rem 1.05rem 1.35rem}',
      '@media(min-width:768px){.hhx-hud{padding:1.65rem 1.65rem 1.7rem}}',
      '.hhx-hud::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 80% 55% at 12% 0%,rgba(244,168,186,.22),transparent 55%),radial-gradient(ellipse 50% 40% at 100% 100%,rgba(110,231,183,.1),transparent 50%),linear-gradient(105deg,transparent 30%,rgba(255,255,255,.035) 48%,transparent 62%);pointer-events:none}',
      '.hhx-hud::after{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,232,239,.55),rgba(110,231,183,.35),transparent);pointer-events:none}',
      '.hhx-hud > *{position:relative;z-index:1}',
      /* Corner brackets */
      '.hhx-br{position:absolute;width:18px;height:18px;border-color:rgba(244,168,186,.55);border-style:solid;pointer-events:none;z-index:2}',
      '.hhx-br.tl{top:10px;left:10px;border-width:2px 0 0 2px;border-radius:4px 0 0 0}',
      '.hhx-br.tr{top:10px;right:10px;border-width:2px 2px 0 0;border-radius:0 4px 0 0}',
      '.hhx-br.bl{bottom:10px;left:10px;border-width:0 0 2px 2px;border-radius:0 0 0 4px}',
      '.hhx-br.br{bottom:10px;right:10px;border-width:0 2px 2px 0;border-radius:0 0 4px 0}',
      '.hhx-kicker{font-size:.58rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(244,168,186,.9);margin:0 0 .45rem;display:flex;align-items:center;gap:.5rem}',
      '.hhx-kicker .pulse{width:7px;height:7px;border-radius:50%;background:#f4a8ba;box-shadow:0 0 12px #f4a8ba;animation:hhx-pulse 1.4s ease infinite}',
      '@keyframes hhx-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.8)}}',
      '.hhx-title{font-family:"Space Grotesk",Inter,system-ui,sans-serif;font-weight:700;letter-spacing:-.035em;font-size:clamp(1.45rem,3.8vw,2.05rem);background:linear-gradient(135deg,#fff 0%,#f4a8ba 35%,#ffe8ef 55%,#6ee7b7 80%,#f5d0a9 100%);-webkit-background-clip:text;background-clip:text;color:transparent;margin:0 0 .4rem;line-height:1.12}',
      '.hhx-lede{font-size:.92rem;line-height:1.55;color:rgba(255,232,239,.88);margin:0 0 1.1rem;max-width:44rem}',
      '.hhx-meters{display:grid;grid-template-columns:1fr 1fr;gap:.55rem;margin-bottom:1.1rem}',
      '@media(min-width:640px){.hhx-meters{grid-template-columns:repeat(4,1fr)}}',
      '.hhx-meter{padding:.8rem .7rem;border-radius:1rem;border:1px solid rgba(244,168,186,.25);background:linear-gradient(160deg,rgba(244,168,186,.1),rgba(0,0,0,.4));box-shadow:inset 0 1px 0 rgba(255,255,255,.07);position:relative;overflow:hidden}',
      '.hhx-meter::after{content:"";position:absolute;inset:0;background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,.04) 50%,transparent 60%);pointer-events:none}',
      '.hhx-meter b{display:block;font-family:"Space Grotesk",sans-serif;font-size:1.35rem;color:#ffe8ef;letter-spacing:-.02em}',
      '.hhx-meter span{font-size:.55rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(244,168,186,.58)}',
      '.hhx-grid{display:grid;gap:.6rem}',
      '@media(min-width:900px){.hhx-grid{grid-template-columns:1.15fr .85fr}}',
      '.hhx-visits{display:grid;gap:.5rem;max-height:320px;overflow:auto;-webkit-overflow-scrolling:touch;padding-right:.1rem}',
      '.hhx-visit{border-radius:1rem;border:1px solid rgba(244,168,186,.22);background:linear-gradient(155deg,rgba(244,168,186,.07),rgba(0,0,0,.45));padding:.8rem .85rem;transition:border-color .3s,box-shadow .3s,transform .25s}',
      '.hhx-visit.is-hot{border-color:rgba(255,232,239,.6)!important;box-shadow:0 0 0 1px rgba(255,255,255,.06),0 0 36px -8px rgba(239,138,156,.55);transform:scale(1.01)}',
      '.hhx-visit-top{display:flex;justify-content:space-between;align-items:center;gap:.4rem;margin-bottom:.28rem}',
      '.hhx-id{font-family:ui-monospace,monospace;font-size:.7rem;color:#f4a8ba;letter-spacing:.05em}',
      '.hhx-status{font-size:.52rem;letter-spacing:.1em;text-transform:uppercase;color:#ffe8ef;border:1px solid rgba(244,168,186,.45);background:linear-gradient(145deg,rgba(244,168,186,.18),rgba(110,231,183,.1));padding:.22rem .5rem;border-radius:999px}',
      '.hhx-route{font-size:.9rem;font-weight:600;color:#fff6f8;margin:0 0 .22rem}',
      '.hhx-note{font-size:.74rem;color:rgba(244,200,210,.74);margin:0}',
      '.hhx-bar{height:5px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden;margin:.5rem 0 .15rem}',
      '.hhx-bar > i{display:block;height:100%;width:0;border-radius:999px;background:linear-gradient(90deg,#6ee7b7,#f4a8ba,#ffe8ef,#ef8a9c);transition:width .6s ease}',
      '.hhx-side{border-radius:1.15rem;border:1px solid rgba(244,168,186,.25);background:linear-gradient(165deg,rgba(244,168,186,.08),rgba(0,0,0,.42));padding:1rem;box-shadow:inset 0 1px 0 rgba(255,255,255,.06)}',
      '.hhx-side h3{font-family:"Space Grotesk",sans-serif;font-size:1.05rem;color:#ffe8ef;margin:0 0 .55rem;display:flex;align-items:center;gap:.4rem}',
      '.hhx-chat{min-height:130px;max-height:170px;overflow:auto;font-size:.74rem;line-height:1.4;color:rgba(255,232,239,.8)}',
      '.hhx-chat .line{margin-bottom:.4rem;padding:.35rem .45rem;border-radius:.5rem;background:rgba(0,0,0,.25);border-left:2px solid rgba(244,168,186,.4);animation:hhx-chat-in .35s ease}',
      '@keyframes hhx-chat-in{from{opacity:0;transform:translateX(-6px)}to{opacity:1;transform:none}}',
      '.hhx-chat b{color:#f4a8ba}',
      '.hhx-honest{font-size:.62rem;line-height:1.45;color:rgba(200,160,175,.5);margin:.7rem 0 0}',
      '.hhx-cta-row{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.95rem}',
      '.hhx-cta{display:inline-flex;align-items:center;justify-content:center;padding:.75rem 1.15rem;border-radius:999px;font-weight:700;font-size:.84rem;text-decoration:none;min-height:46px;border:0;cursor:pointer;font-family:inherit;transition:transform .2s,box-shadow .2s}',
      '.hhx-cta-main{color:#1a0a10;background:linear-gradient(135deg,#ffe8ef,#f4a8ba 45%,#ef8a9c 85%,#f5d0a9);box-shadow:0 12px 32px -12px rgba(239,138,156,.6),inset 0 1px 0 rgba(255,255,255,.65)}',
      '.hhx-cta-main:hover{transform:translateY(-2px);box-shadow:0 16px 40px -10px rgba(239,138,156,.7)}',
      '.hhx-cta-ghost{color:#ffe8ef;border:1px solid rgba(244,168,186,.42);background:rgba(0,0,0,.3);box-shadow:inset 0 1px 0 rgba(255,255,255,.06)}',
      '.hhx-cta-ghost:hover{border-color:rgba(255,232,239,.55);transform:translateY(-1px)}',
      '.hhx-scan{position:absolute;left:8%;right:8%;top:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,232,239,.4),transparent);pointer-events:none;opacity:.4}',
      'body.hhx-ready .hhx-progress{position:fixed;top:0;left:0;height:2px;width:0;z-index:80;background:linear-gradient(90deg,#6ee7b7,#f4a8ba,#ffe8ef);will-change:width;transform:translateZ(0)}',
      /* Forge dust — few particles, GPU-friendly transform only */
      '.hhx-dust{position:fixed;inset:0;pointer-events:none;z-index:1;overflow:hidden;contain:strict}',
      '.hhx-dust i{position:absolute;width:2px;height:2px;border-radius:50%;background:#ffe8ef;opacity:0;animation:hhx-dust-float linear infinite;will-change:transform,opacity}',
      '.hhx-dust i.em{background:#6ee7b7}',
      '.hhx-dust i.go{background:#f5d0a9}',
      '@keyframes hhx-dust-float{0%{transform:translate3d(0,12vh,0);opacity:0}15%{opacity:.5}100%{transform:translate3d(0,-18vh,0);opacity:0}}',
      /* Mobile */
      'body.hhx-mobile{padding-bottom:calc(4.7rem + env(safe-area-inset-bottom));overflow-x:hidden;background:#07060a!important}',
      'body.hhx-mobile .hhx-rail{display:none!important}',
      'body.hhx-mobile > nav{display:none!important}',
      'body.hhx-mobile > footer{padding:1.5rem 1rem 6rem!important;font-size:11px!important}',
      'body.hhx-mobile #mobile-menu{display:none!important}',
      'body.hhx-mobile .fixed.bottom-3{display:none!important}',
      'body.hhx-mobile .hh-ingot-ring{opacity:.45;width:min(100vw,340px);height:min(100vw,340px)}',
      'body.hhx-mobile .hh-media{max-width:100%;margin-top:1rem!important}',
      'body.hhx-panels:not(.hhx-mobile) > nav{display:block}',
      '.hhx-mtop{display:none;position:sticky;top:0;z-index:70;align-items:center;justify-content:space-between;gap:.5rem;padding:.55rem .75rem;padding-top:max(.5rem,env(safe-area-inset-top));background:rgba(7,6,10,.98);border-bottom:1px solid var(--hh-line)}',
      'body.hhx-mobile .hhx-mtop{display:flex}',
      '.hhx-mtop a{display:flex;align-items:center;gap:.45rem;text-decoration:none;color:inherit;min-width:0}',
      '.hhx-mtop img{width:32px;height:32px;border-radius:50%;object-fit:cover;border:1px solid rgba(244,168,186,.5);box-shadow:0 0 12px rgba(244,168,186,.3)}',
      '.hhx-mtop span{font-size:.68rem;font-weight:700;letter-spacing:.06em;color:#ffe8ef;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.hhx-mtop .hhx-live{display:inline-flex;align-items:center;gap:.3rem;font-size:.5rem;letter-spacing:.12em;text-transform:uppercase;color:#ffe8ef;border:1px solid rgba(244,168,186,.5);background:linear-gradient(145deg,rgba(244,168,186,.16),rgba(110,231,183,.1));padding:.3rem .55rem;border-radius:999px;flex-shrink:0}',
      '.hhx-mtop .hhx-live i{width:6px;height:6px;border-radius:50%;background:#f4a8ba;box-shadow:0 0 10px #f4a8ba;animation:hhx-pulse 1.4s ease infinite}',
      '.hhx-mtabs{display:none;position:fixed;left:0;right:0;bottom:0;z-index:75;grid-template-columns:repeat(5,1fr);padding:.3rem .15rem calc(.3rem + env(safe-area-inset-bottom));background:rgba(6,5,8,.98);border-top:1px solid var(--hh-line);box-shadow:0 -8px 24px rgba(0,0,0,.45)}',
      'body.hhx-mobile .hhx-mtabs{display:grid}',
      '.hhx-mtab{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.12rem;border:0;background:transparent;color:rgba(244,168,186,.38);font-size:.48rem;letter-spacing:.04em;text-transform:uppercase;font-weight:700;font-family:inherit;padding:.32rem .05rem;min-height:52px;cursor:pointer;border-radius:.7rem;position:relative;-webkit-tap-highlight-color:transparent}',
      '.hhx-mtab .ic{font-size:1.1rem;line-height:1;opacity:.7}',
      '.hhx-mtab.is-on{color:#ffe8ef;background:linear-gradient(180deg,rgba(244,168,186,.14),rgba(110,231,183,.06))}',
      '.hhx-mtab.is-on .ic{opacity:1}',
      '.hhx-mtab.is-on::after{content:"";position:absolute;top:5px;width:18px;height:2px;border-radius:2px;background:linear-gradient(90deg,#6ee7b7,#f4a8ba,#ffe8ef)}',
      'body.hhx-mobile .hhx-panel{padding:0 0 1.35rem}',
      '@keyframes hhx-fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}',
      'body.hhx-mobile header.hero-bg{padding:3.5rem .75rem .9rem!important}',
      'body.hhx-mobile header.hero-bg .hh-mega{font-size:2.15rem!important}',
      'body.hhx-mobile header.hero-bg .hh-subline{font-size:1.05rem!important}',
      'body.hhx-mobile header.hero-bg .mt-7{display:none!important}',
      'body.hhx-mobile header.hero-bg .mt-8.flex{display:none!important}',
      'body.hhx-mobile header.hero-bg .mt-10 a{padding:.7rem 1rem!important;font-size:.88rem!important}',
      'body.hhx-mobile .hhx-mlede{font-size:.88rem;line-height:1.45;color:rgba(255,232,239,.9);margin:.5rem 0 .6rem;padding:0 .15rem}',
      /* Pipeline flow */
      '.hhx-pipe-wrap{position:relative;max-width:72rem;margin:0 auto;padding:1rem .85rem 2.25rem}',
      '@media(min-width:768px){.hhx-pipe-wrap{padding:1.25rem 1.5rem 2.75rem}}',
      '.hhx-pipe-beam{display:none;height:3px;border-radius:999px;margin:0 1.5rem 1.25rem;background:linear-gradient(90deg,transparent,#6ee7b7,#f4a8ba,#ffe8ef,#ef8a9c,transparent);opacity:.85}',
      '@media(min-width:700px){.hhx-pipe-beam{display:block}}',
      '.hhx-pipe-grid{display:grid;gap:.7rem}',
      '@media(min-width:700px){.hhx-pipe-grid{grid-template-columns:repeat(5,1fr)}}',
      '.hhx-pipe-card{position:relative;border-radius:1.2rem;border:1px solid rgba(244,168,186,.28);background:linear-gradient(160deg,rgba(244,168,186,.1),rgba(10,8,12,.97));padding:1.15rem 1rem;box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 16px 40px -24px rgba(0,0,0,.7);transition:transform .25s,border-color .25s,box-shadow .25s;overflow:hidden}',
      '.hhx-pipe-card::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#6ee7b7,#f4a8ba,#ffe8ef);opacity:.7}',
      '.hhx-pipe-card:hover{transform:translateY(-4px);border-color:rgba(255,232,239,.55);box-shadow:0 0 40px -10px rgba(239,138,156,.45)}',
      '.hhx-pipe-card .n{font-family:"Space Grotesk",sans-serif;font-size:.72rem;letter-spacing:.16em;color:#6ee7b7;margin:0 0 .4rem;text-shadow:0 0 12px rgba(110,231,183,.4)}',
      '.hhx-pipe-card h3{font-family:"Space Grotesk",sans-serif;font-size:1.12rem;color:#ffe8ef;margin:0 0 .45rem}',
      '.hhx-pipe-card p{margin:0;font-size:.8rem;line-height:1.5;color:rgba(244,200,210,.78)}',
      '.hhx-pipe-card .node{position:absolute;top:-6px;right:12px;width:10px;height:10px;border-radius:50%;background:#f4a8ba;box-shadow:0 0 10px rgba(244,168,186,.7)}',
      /* Settings */
      '.hhx-set-grid{display:grid;gap:.7rem;max-width:72rem;margin:0 auto;padding:1rem .85rem 2.25rem}',
      '@media(min-width:640px){.hhx-set-grid{grid-template-columns:1fr 1fr;padding:1.25rem 1.5rem 2.75rem}}',
      '@media(min-width:1000px){.hhx-set-grid{grid-template-columns:repeat(3,1fr)}}',
      '.hhx-set-card{position:relative;border-radius:1.25rem;border:1px solid rgba(244,168,186,.28);background:linear-gradient(155deg,rgba(244,168,186,.1),rgba(12,10,14,.97));padding:1.25rem 1.1rem;transition:transform .25s,border-color .25s,box-shadow .25s;overflow:hidden;box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 16px 40px -24px rgba(0,0,0,.7)}',
      '.hhx-set-card::after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 90% 10%,rgba(244,168,186,.12),transparent 45%);pointer-events:none}',
      '.hhx-set-card:hover{transform:translateY(-5px);border-color:rgba(255,232,239,.55);box-shadow:0 0 44px -10px rgba(239,138,156,.45)}',
      '.hhx-set-card .ic{font-size:1.65rem;margin-bottom:.5rem}',
      '.hhx-set-card h3{font-family:"Space Grotesk",sans-serif;font-size:1.1rem;color:#ffe8ef;margin:0 0 .4rem;position:relative}',
      '.hhx-set-card p{margin:0;font-size:.82rem;line-height:1.5;color:rgba(244,200,210,.78);position:relative}',
      '.hhx-set-card a{display:inline-block;margin-top:.65rem;font-size:.78rem;font-weight:700;color:#f4a8ba;text-decoration:none;border-bottom:1px solid rgba(244,168,186,.4);position:relative}',
      '.hhx-set-card a:hover{color:#ffe8ef;border-color:#ffe8ef}',
      /* Split */
      '.hhx-split{max-width:72rem;margin:0 auto;padding:1rem .85rem 2rem;display:grid;gap:.85rem}',
      '@media(min-width:800px){.hhx-split{grid-template-columns:1fr 1fr;padding:1.25rem 1.5rem 2.5rem}}',
      '.hhx-split-card{border-radius:1.35rem;border:1px solid rgba(244,168,186,.32);padding:1.4rem 1.25rem;background:linear-gradient(160deg,rgba(244,168,186,.1),rgba(8,6,10,.97));box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 20px 50px -28px rgba(0,0,0,.75);position:relative;overflow:hidden}',
      '.hhx-split-card::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#f4a8ba,#ffe8ef,#6ee7b7)}',
      '.hhx-split-card.sp{border-color:rgba(200,210,225,.32);background:linear-gradient(160deg,rgba(200,210,225,.1),rgba(8,6,10,.97))}',
      '.hhx-split-card.sp::before{background:linear-gradient(90deg,#9aa3b0,#eef1f6,#c5ccd6)}',
      '.hhx-split-card h3{font-family:"Space Grotesk",sans-serif;font-size:1.25rem;margin:0 0 .55rem;color:#ffe8ef}',
      '.hhx-split-card.sp h3{color:#eef1f6}',
      '.hhx-split-card ul{margin:.55rem 0 0;padding-left:1.15rem;font-size:.86rem;line-height:1.55;color:rgba(244,200,210,.82)}',
      '.hhx-split-card.sp ul{color:rgba(200,210,225,.82)}',
      '.hhx-section-head{max-width:72rem;margin:0 auto;padding:1.65rem .85rem .35rem}',
      '@media(min-width:768px){.hhx-section-head{padding:2.15rem 1.5rem .55rem}}',
      '.hhx-section-head h2{font-family:"Space Grotesk",sans-serif;font-size:clamp(1.45rem,3.2vw,1.95rem);letter-spacing:-.035em;margin:0 0 .45rem;background:linear-gradient(135deg,#fff,#f4a8ba 45%,#6ee7b7 85%,#f5d0a9);-webkit-background-clip:text;background-clip:text;color:transparent}',
      '.hhx-section-head p{margin:0;font-size:.9rem;color:rgba(244,200,210,.75);max-width:38rem;line-height:1.5}',
      /* Dogs */
      '.hhx-dog-grid{display:grid;gap:.65rem;max-width:72rem;margin:0 auto;padding:1rem .85rem 2.25rem}',
      '@media(min-width:640px){.hhx-dog-grid{grid-template-columns:1fr 1fr;padding:1.25rem 1.5rem 2.75rem}}',
      '@media(min-width:1000px){.hhx-dog-grid{grid-template-columns:repeat(3,1fr)}}',
      '.hhx-dog{position:relative;border-radius:1.2rem;border:1px solid rgba(244,168,186,.25);background:linear-gradient(155deg,rgba(255,255,255,.05),rgba(10,8,12,.97));padding:1.15rem 1.05rem 1.15rem 1.15rem;cursor:pointer;text-align:left;font:inherit;color:inherit;transition:border-color .25s,transform .25s,box-shadow .25s;overflow:hidden;box-shadow:inset 0 1px 0 rgba(255,255,255,.05)}',
      '.hhx-dog:hover,.hhx-dog.is-on{border-color:rgba(255,232,239,.6);transform:translateY(-4px);box-shadow:0 0 40px -10px rgba(239,138,156,.5)}',
      '.hhx-dog .avatar{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.15rem;margin-bottom:.55rem;background:linear-gradient(145deg,rgba(244,168,186,.25),rgba(110,231,183,.12));border:1px solid rgba(244,168,186,.4);box-shadow:0 0 18px rgba(244,168,186,.25)}',
      '.hhx-dog h4{font-family:"Space Grotesk",sans-serif;margin:0 0 .28rem;color:#ffe8ef;font-size:1.08rem}',
      '.hhx-dog .tag{font-size:.55rem;letter-spacing:.12em;text-transform:uppercase;color:#6ee7b7;margin:0 0 .4rem}',
      '.hhx-dog p{margin:0;font-size:.8rem;color:rgba(244,200,210,.75);line-height:1.45}',
      /* Network */
      '.hhx-net-list{max-width:72rem;margin:0 auto;padding:1rem .85rem 2.25rem;display:grid;gap:.55rem}',
      '@media(min-width:768px){.hhx-net-list{padding:1.25rem 1.5rem 2.75rem}}',
      '.hhx-net-row{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.55rem;padding:.95rem 1.1rem;border-radius:1.1rem;border:1px solid rgba(244,168,186,.22);background:linear-gradient(155deg,rgba(244,168,186,.07),rgba(0,0,0,.38));transition:border-color .2s,transform .2s}',
      '.hhx-net-row:hover{border-color:rgba(255,232,239,.45);transform:translateX(3px)}',
      '.hhx-net-row strong{color:#ffe8ef;font-size:.95rem}',
      '.hhx-net-row span{font-size:.76rem;color:rgba(244,200,210,.68)}',
      '.hhx-net-row .badge{font-size:.55rem;letter-spacing:.12em;text-transform:uppercase;border:1px solid rgba(110,231,183,.45);color:#6ee7b7;padding:.25rem .55rem;border-radius:999px;box-shadow:0 0 12px rgba(110,231,183,.15)}',
      '.hhx-quick{display:flex;flex-wrap:wrap;gap:.45rem;padding:.85rem .85rem 0;max-width:72rem;margin:0 auto}',
      '.hhx-quick button{flex:1 1 auto;min-height:46px;border-radius:999px;border:1px solid rgba(244,168,186,.38);background:rgba(0,0,0,.38);color:#ffe8ef;font-size:.76rem;font-weight:700;font-family:inherit;cursor:pointer;padding:.55rem .85rem;transition:all .2s}',
      '.hhx-quick button.pri{background:linear-gradient(135deg,#ffe8ef,#f4a8ba);color:#1a0a10;border:0;box-shadow:0 10px 28px -12px rgba(239,138,156,.55)}',
      '.hhx-quick button:hover{border-color:rgba(255,232,239,.55)}',
      '@media(max-width:767px){.hhx-dust{display:none!important}}',
      '@media(prefers-reduced-motion:reduce){.hhx-dust,.hhx-kicker .pulse,.hhx-mtop .hhx-live i,.hhx-chat .line{animation:none!important}.hhx-dust{display:none!important}}'
    ].join('');
    document.head.appendChild(s);
  }

  function boardHtml() {
    var meters =
      '<div class="hhx-meters">' +
      '<div class="hhx-meter"><b data-count="6">0</b><span>Demo lanes</span></div>' +
      '<div class="hhx-meter"><b data-count="5">0</b><span>Pipeline stages</span></div>' +
      '<div class="hhx-meter"><b data-count="6">0</b><span>Setting types</span></div>' +
      '<div class="hhx-meter"><b data-count="0">0</b><span>Live placements yet</span></div>' +
      '</div>';

    var visits = LANES.map(function (v) {
      return (
        '<div class="hhx-visit" data-hh-lane="' + v.id + '">' +
          '<div class="hhx-visit-top"><span class="hhx-id">' + v.id + '</span><span class="hhx-status">' + v.stage + '</span></div>' +
          '<p class="hhx-route">' + v.dog + ' · ' + v.setting + '</p>' +
          '<p class="hhx-note">' + v.note + ' · ' + v.team + '</p>' +
          '<div class="hhx-bar"><i style="width:' + v.progress + '%"></i></div>' +
        '</div>'
      );
    }).join('');

    return (
      '<div class="hhx-board" id="hhx-board">' +
        '<div class="hhx-hud">' +
          '<span class="hhx-br tl" aria-hidden="true"></span>' +
          '<span class="hhx-br tr" aria-hidden="true"></span>' +
          '<span class="hhx-br bl" aria-hidden="true"></span>' +
          '<span class="hhx-br br" aria-hidden="true"></span>' +
          '<div class="hhx-scan" aria-hidden="true"></div>' +
          '<p class="hhx-kicker"><span class="pulse"></span> Network command · design preview</p>' +
          '<h2 class="hhx-title">Train. Certify. Place. Heal.</h2>' +
          '<p class="hhx-lede">Healing Hearts is the therapy-dog <strong>network</strong>: shelter dogs become certified partners for hospitals, schools, hospice, community programs — and feed <a href="silver-paws.html" style="color:#f4a8ba;text-decoration:underline;text-underline-offset:3px">Silver Paws</a> for senior visits. This board is illustrative until funding and partners are live.</p>' +
          meters +
          '<div class="hhx-grid">' +
            '<div class="hhx-visits" id="hhx-lanes">' + visits + '</div>' +
            '<div class="hhx-side">' +
              '<h3>♥ Desk chatter</h3>' +
              '<div class="hhx-chat" id="hhx-chat" aria-live="polite"></div>' +
              '<div class="hhx-cta-row">' +
                '<button type="button" class="hhx-cta hhx-cta-main" data-hhx-go="pipeline">Open pipeline</button>' +
                '<button type="button" class="hhx-cta hhx-cta-ghost" data-hhx-go="settings">See settings</button>' +
              '</div>' +
              '<p class="hhx-honest">Illustrative lanes. No live GPS. No fake partner contracts. Click a chapter to open it.</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function railHtml() {
    return (
      '<nav class="hhx-rail" id="hhx-rail" aria-label="Healing Hearts sections" role="tablist">' +
        '<button type="button" class="is-on" data-hhx-go="heart" role="tab" aria-selected="true">Heart</button>' +
        '<button type="button" data-hhx-go="pipeline" role="tab">Pipeline</button>' +
        '<button type="button" data-hhx-go="settings" role="tab">Settings</button>' +
        '<button type="button" data-hhx-go="dogs" role="tab">Dogs</button>' +
        '<button type="button" data-hhx-go="network" role="tab">Network</button>' +
        '<button type="button" data-hhx-go="more" role="tab">Split &amp; more</button>' +
      '</nav>'
    );
  }

  function seeMoreGridHtml() {
    var cards = [
      { go: 'pipeline', k: '01 · Engine', title: 'Pipeline', p: 'Recruit → train → certify → place → support. The network assembly line.', cta: 'See more' },
      { go: 'settings', k: '02 · Where', title: 'Settings', p: 'Hospitals, schools, hospice, veterans, community — seniors via Silver Paws.', cta: 'See more' },
      { go: 'dogs', k: '03 · Who', title: 'Dog profiles', p: 'Temperaments and tracks. Right presence for the right room.', cta: 'See more' },
      { go: 'network', k: '04 · Who runs it', title: 'Network', p: 'Handlers, chapters, and partner seats (design).', cta: 'See more' },
      { go: 'more', k: '05 · Clarity', title: 'HH vs Silver Paws', p: 'Sharp split, circles of mercy, and truth labels.', cta: 'See more' }
    ];
    return (
      '<div class="hhx-more-grid" id="hhx-more-grid" aria-label="Open a section">' +
        cards.map(function (c) {
          return (
            '<button type="button" class="hhx-more-card" data-hhx-go="' + c.go + '">' +
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
      '<div class="hhx-mtop">' +
        '<a href="index.html"><img src="assets/logos/shibahumanityhublogo3d-new.jpg" width="32" height="32" alt=""><span>HEALING HEARTS</span></a>' +
        '<span class="hhx-live"><i></i> Preview</span>' +
      '</div>' +
      '<nav class="hhx-mtabs" aria-label="Healing Hearts mobile">' +
        '<button type="button" class="hhx-mtab is-on" data-tab="heart" role="tab" aria-selected="true"><span class="ic" aria-hidden="true">♥</span>Heart</button>' +
        '<button type="button" class="hhx-mtab" data-tab="pipeline" role="tab"><span class="ic" aria-hidden="true">◎</span>Pipe</button>' +
        '<button type="button" class="hhx-mtab" data-tab="settings" role="tab"><span class="ic" aria-hidden="true">◇</span>Place</button>' +
        '<button type="button" class="hhx-mtab" data-tab="dogs" role="tab"><span class="ic" aria-hidden="true">🐾</span>Dogs</button>' +
        '<button type="button" class="hhx-mtab" data-tab="more" role="tab"><span class="ic" aria-hidden="true">◆</span>More</button>' +
      '</nav>'
    );
  }

  function pipelinePanelHtml() {
    return (
      '<div class="hhx-section-head"><h2>The pipeline</h2><p>How a shelter dog becomes a certified healing partner. Stages are the model — live ops only when funded.</p></div>' +
      '<div class="hhx-pipe-wrap">' +
        '<div class="hhx-pipe-beam" aria-hidden="true"></div>' +
        '<div class="hhx-pipe-grid">' +
          PIPELINE.map(function (s) {
            return (
              '<div class="hhx-pipe-card">' +
                '<span class="node" aria-hidden="true"></span>' +
                '<p class="n">' + s.n + '</p>' +
                '<h3>' + s.title + '</h3>' +
                '<p>' + s.body + '</p>' +
              '</div>'
            );
          }).join('') +
        '</div>' +
      '</div>'
    );
  }

  function settingsPanelHtml() {
    return (
      '<div class="hhx-section-head"><h2>Placement settings</h2><p>Multi-setting network. Seniors are not orphaned here — they graduate into the Silver Paws product.</p></div>' +
      '<div class="hhx-set-grid">' +
        SETTINGS.map(function (s) {
          var link = s.id === 'senior-sp'
            ? '<a href="silver-paws.html">Open Silver Paws →</a>'
            : s.id === 'disaster-soft'
              ? '<a href="k9-lifeline.html">K9 Lifeline is SAR →</a>'
              : '';
          return (
            '<div class="hhx-set-card" data-setting="' + s.id + '">' +
              '<div class="ic" aria-hidden="true">' + s.icon + '</div>' +
              '<h3>' + s.title + '</h3>' +
              '<p>' + s.blurb + '</p>' +
              link +
            '</div>'
          );
        }).join('') +
      '</div>'
    );
  }

  function dogsPanelHtml() {
    var dogs = [
      { name: 'Willow', tag: 'Low stim · hospital', body: 'Soft eyes, slow approach. Best for quiet wards and long sits beside a bed.', icon: '🐕' },
      { name: 'Bear', tag: 'Steady · veterans', body: 'Solid presence without pushiness. Good for groups and hallway routes.', icon: '🐻' },
      { name: 'Nori', tag: 'Playful calm · schools', body: 'Curious but polite. Reading-buddy energy without chaos.', icon: '🐾' },
      { name: 'Atlas', tag: 'Hospice soft', body: 'Ultra-quiet. Thrives when the room needs stillness more than tricks.', icon: '✨' },
      { name: 'Mabel', tag: 'Silver Paws track', body: 'Senior-home ready temperament. Routes into SP visit packages + photographer.', icon: '🤍' },
      { name: 'Theo', tag: 'Intake · design', body: 'New shelter pull on the board. Screening first, training second.', icon: '🌱' }
    ];
    return (
      '<div class="hhx-section-head"><h2>Dog tracks (preview)</h2><p>Illustrative profiles. Real dogs appear only with shelter partners and consent.</p></div>' +
      '<div class="hhx-dog-grid">' +
        dogs.map(function (d) {
          return (
            '<button type="button" class="hhx-dog" data-dog="' + d.name + '">' +
              '<div class="avatar" aria-hidden="true">' + d.icon + '</div>' +
              '<p class="tag">' + d.tag + '</p>' +
              '<h4>' + d.name + '</h4>' +
              '<p>' + d.body + '</p>' +
            '</button>'
          );
        }).join('') +
      '</div>'
    );
  }

  function networkPanelHtml() {
    var rows = [
      { who: 'Chapter · Coast Care', what: 'Pacific corridor · hospital + school seats', badge: 'Design' },
      { who: 'Chapter · Midwest Mercy', what: 'VA halls + community clinics', badge: 'Design' },
      { who: 'Chapter · Quiet Light', what: 'Hospice and palliative partners', badge: 'Design' },
      { who: 'Handler pool', what: 'Screened volunteers + pro handlers (when funded)', badge: 'Model' },
      { who: 'Silver Paws product', what: 'Senior visit ops, packages, photographer', badge: 'Live page' },
      { who: 'K9 Lifeline', what: 'Disaster SAR — different mission, shared brand mercy', badge: 'Sibling' }
    ];
    return (
      '<div class="hhx-section-head"><h2>Network map</h2><p>Chapters and partners are seats on the model until agreements exist. No invented contracts.</p></div>' +
      '<div class="hhx-net-list">' +
        rows.map(function (r) {
          return (
            '<div class="hhx-net-row">' +
              '<div><strong>' + r.who + '</strong><br><span>' + r.what + '</span></div>' +
              '<span class="badge">' + r.badge + '</span>' +
            '</div>'
          );
        }).join('') +
      '</div>'
    );
  }

  function morePanelHtml() {
    return (
      '<div class="hhx-section-head"><h2>Clear split · Circles · Truth</h2><p>Two programs. One mercy. Zero confusion about who does what.</p></div>' +
      '<div class="hhx-split">' +
        '<div class="hhx-split-card">' +
          '<h3>♥ Healing Hearts</h3>' +
          '<ul>' +
            '<li>Network &amp; pipeline engine</li>' +
            '<li>Train · certify · place</li>' +
            '<li>Multi-setting: hospital, school, hospice, community, veterans</li>' +
            '<li>Feeds certified dogs into Silver Paws for seniors</li>' +
            '<li>Handler chapters &amp; partner seats</li>' +
          '</ul>' +
        '</div>' +
        '<div class="hhx-split-card sp">' +
          '<h3>🐾 Silver Paws</h3>' +
          '<ul>' +
            '<li>Senior visit product</li>' +
            '<li>Homes directory · visit packages</li>' +
            '<li>Bingo, lunch, stories + photographer every visit</li>' +
            '<li>Soul-friend portraits seniors can keep</li>' +
            '<li><a href="silver-paws.html" style="color:#c5ccd6">Open Silver Paws →</a></li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="hhx-section-head" style="padding-top:0"><h2>Circles of Mercy</h2><p>How $NIBBLES holdings fund the network when rails are live. Design levels — not issued credits yet.</p></div>' +
      '<div class="hhx-set-grid">' +
        '<div class="hhx-set-card"><h3>Mercy · 25k+</h3><p>Fund training hours, vests, and first placements for one dog on the pipeline.</p></div>' +
        '<div class="hhx-set-card"><h3>Guardian · 100k+</h3><p>Sponsor multiple dogs and receive honest stage updates as placements open.</p></div>' +
        '<div class="hhx-set-card"><h3>Eternal · 250k+</h3><p>Legacy support across settings with soulbound recognition when the system is live.</p></div>' +
      '</div>' +
      '<div class="hhx-section-head"><h2>Truth</h2><p>No live placements, no fake partner logos, no treasury credit from this page yet. Preview model so donors and partners can see the machine before we scale it.</p></div>' +
      '<div class="hhx-cta-row" style="max-width:72rem;margin:0 auto;padding:0 .85rem 2.75rem">' +
        '<a class="hhx-cta hhx-cta-main" href="all-programs.html">Support via programs</a>' +
        '<a class="hhx-cta hhx-cta-ghost" href="silver-paws.html">Silver Paws product</a>' +
        '<a class="hhx-cta hhx-cta-ghost" href="programs/healing-hearts-therapy-dog-network.html">Classic program card</a>' +
      '</div>'
    );
  }

  function goTab(id) {
    if (!id) return;
    if (id === 'network' && isMobile()) id = 'more';
    document.querySelectorAll('.hhx-panel').forEach(function (p) {
      p.classList.toggle('is-on', p.getAttribute('data-hhx-panel') === id);
    });
    document.querySelectorAll('.hhx-mtab').forEach(function (t) {
      var tab = t.getAttribute('data-tab');
      var on = tab === id || (id === 'network' && tab === 'more');
      t.classList.toggle('is-on', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    document.querySelectorAll('#hhx-rail [data-hhx-go]').forEach(function (t) {
      var on = t.getAttribute('data-hhx-go') === id;
      t.classList.toggle('is-on', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    try {
      if (history.replaceState) history.replaceState(null, '', '#hhx-' + id);
    } catch (e) { /* ignore */ }
    window.scrollTo(0, 0);
  }

  function bindGoClicks(root) {
    (root || document).querySelectorAll('[data-hhx-go]').forEach(function (btn) {
      if (btn.getAttribute('data-hhx-bound') === '1') return;
      btn.setAttribute('data-hhx-bound', '1');
      btn.addEventListener('click', function (ev) {
        ev.preventDefault();
        goTab(btn.getAttribute('data-hhx-go'));
      });
    });
  }

  function compactHero(hero) {
    if (!hero || hero.querySelector('.hhx-mlede')) return;
    if (!isMobile()) return;
    var longP = hero.querySelector('p.mt-7, p.text-lg, p.text-xl');
    if (longP) {
      var short = document.createElement('p');
      short.className = 'hhx-mlede';
      short.textContent = 'Therapy dog network: train, certify, place. Open a section below. No endless scroll.';
      longP.parentNode.insertBefore(short, longP);
    }
  }

  function buildStaticPanels() {
    var host = document.getElementById('hhx-panel-host');
    if (!host) return;

    function panel(id, html, extraNodes) {
      var p = document.createElement('div');
      p.className = 'hhx-panel' + (id === 'heart' ? ' is-on' : '');
      p.setAttribute('data-hhx-panel', id);
      p.setAttribute('role', 'tabpanel');
      if (html) {
        var wrap = document.createElement('div');
        wrap.innerHTML = html;
        while (wrap.firstChild) p.appendChild(wrap.firstChild);
      }
      (extraNodes || []).forEach(function (n) {
        if (n) p.appendChild(n);
      });
      return p;
    }

    var hero = document.querySelector('header.hero-bg');
    var board = document.getElementById('hhx-board');
    compactHero(hero);

    var quick = document.createElement('div');
    quick.className = 'hhx-quick';
    quick.innerHTML =
      '<button type="button" class="pri" data-hhx-go="pipeline">Pipeline</button>' +
      '<button type="button" data-hhx-go="settings">Settings</button>' +
      '<button type="button" data-hhx-go="dogs">Dogs</button>' +
      '<button type="button" data-hhx-go="more">Split &amp; more</button>';

    var moreGrid = document.createElement('div');
    moreGrid.innerHTML = seeMoreGridHtml();
    moreGrid = moreGrid.firstChild;

    var truth = document.createElement('p');
    truth.className = 'hhx-mtruth';
    truth.textContent = 'Demo lanes and chapters. Open a section with See more. Real partners replace demos when agreements are live.';

    var heartNodes = [hero, quick, board, moreGrid, truth].filter(Boolean);
    [hero, board].forEach(function (n) {
      if (n && n.parentNode) n.parentNode.removeChild(n);
    });

    host.appendChild(panel('heart', null, heartNodes));
    host.appendChild(panel('pipeline', pipelinePanelHtml()));
    host.appendChild(panel('settings', settingsPanelHtml()));
    host.appendChild(panel('dogs', dogsPanelHtml()));
    if (!isMobile()) host.appendChild(panel('network', networkPanelHtml()));
    host.appendChild(panel('more', morePanelHtml() + (isMobile() ? networkPanelHtml() : '')));
  }

  function countUpMeters() {
    document.querySelectorAll('.hhx-meter b[data-count]').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10) || 0;
      if (reducedMotion() || target === 0) {
        el.textContent = String(target);
        return;
      }
      var start = 0;
      var steps = 18;
      var i = 0;
      var t = setInterval(function () {
        i++;
        el.textContent = String(Math.round((target * i) / steps));
        if (i >= steps) clearInterval(t);
      }, 40);
    });
  }

  function wireBoard() {
    var chat = document.getElementById('hhx-chat');
    if (!chat) return;
    var lines = [
      ['@desk', 'Willow on hospital track. Vest kit design only.'],
      ['@train', 'Nori reading-buddy protocol draft ready.'],
      ['@place', 'Atlas hospice soft · consent checklist.'],
      ['@sp', 'Mabel feeds Silver Paws senior product.'],
      ['@truth', 'Preview board. Real partners when agreements land.'],
      ['@net', 'Chapters are seats — not live contracts.'],
      ['@heart', 'Two hearts. One pipeline. Zero theater.']
    ];
    var i = 0;
    function tick() {
      if (!chat || document.hidden || document.body.classList.contains('is-scrolling')) return;
      /* Only animate chat when heart panel is visible */
      var heart = document.querySelector('.hhx-panel[data-hhx-panel="heart"]');
      if (heart && !heart.classList.contains('is-on')) return;
      var L = lines[i % lines.length];
      var row = document.createElement('div');
      row.className = 'line';
      row.innerHTML = '<b>' + L[0] + '</b> ' + L[1];
      chat.appendChild(row);
      while (chat.children.length > 5) chat.removeChild(chat.firstChild);
      chat.scrollTop = chat.scrollHeight;
      i++;
    }
    tick();
    setInterval(tick, 5200);

    requestAnimationFrame(function () {
      document.querySelectorAll('.hhx-bar > i').forEach(function (bar) {
        var w = bar.style.width;
        bar.style.width = '0';
        requestAnimationFrame(function () { bar.style.width = w; });
      });
    });

    countUpMeters();

    /* Soft highlight rotation — no width thrash while scrolling */
    if (!reducedMotion() && !isMobile()) {
      var hot = 0;
      setInterval(function () {
        if (document.hidden || document.body.classList.contains('is-scrolling')) return;
        var heart = document.querySelector('.hhx-panel[data-hhx-panel="heart"]');
        if (heart && !heart.classList.contains('is-on')) return;
        var visits = document.querySelectorAll('.hhx-visit');
        if (!visits.length) return;
        visits.forEach(function (v) { v.classList.remove('is-hot'); });
        visits[hot % visits.length].classList.add('is-hot');
        hot++;
      }, 4500);
    }
  }

  function wireDogs() {
    document.querySelectorAll('.hhx-dog').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.hhx-dog').forEach(function (b) { b.classList.remove('is-on'); });
        btn.classList.add('is-on');
      });
    });
  }

  function forgeDust() {
    if (reducedMotion() || isMobile()) return;
    if (document.getElementById('hhx-dust')) return;
    /* Cap particles hard — each is a continuous compositor layer cost */
    var n = 10;
    var box = document.createElement('div');
    box.className = 'hhx-dust';
    box.id = 'hhx-dust';
    box.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < n; i++) {
      var d = document.createElement('i');
      d.style.left = Math.random() * 100 + '%';
      d.style.bottom = Math.random() * 20 + '%';
      d.style.animationDuration = 10 + Math.random() * 12 + 's';
      d.style.animationDelay = Math.random() * 8 + 's';
      if (i % 3 === 1) d.className = 'em';
      if (i % 4 === 0) d.className = 'go';
      box.appendChild(d);
    }
    document.body.appendChild(box);
  }

  function wireProgress() {
    if (document.querySelector('.hhx-progress')) return;
    var bar = document.createElement('div');
    bar.className = 'hhx-progress';
    document.body.appendChild(bar);
    var ticking = false;
    function update() {
      ticking = false;
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = max > 0 ? ((h.scrollTop / max) * 100).toFixed(1) + '%' : '0%';
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
  }

  /**
   * Hero preview video: only decode when heart panel is on, element is in view,
   * tab is visible, and user is not mid-scroll. Cuts the main lag source.
   */
  function wireHeroVideo() {
    var vid = document.getElementById('hh-hero-video');
    if (!vid) return;

    vid.muted = true;
    vid.playsInline = true;
    vid.setAttribute('playsinline', '');
    vid.setAttribute('muted', '');
    /* Prefer low decode cost when browser supports it */
    try {
      if ('disableRemotePlayback' in vid) vid.disableRemotePlayback = true;
    } catch (e) { /* ignore */ }

    var inView = false;
    var wantPlay = false;

    function heartOn() {
      var heart = document.querySelector('.hhx-panel[data-hhx-panel="heart"]');
      /* Before panels mount, treat as on */
      if (!heart) return true;
      return heart.classList.contains('is-on');
    }

    function sync() {
      wantPlay =
        inView &&
        heartOn() &&
        !document.hidden &&
        !document.body.classList.contains('is-scrolling') &&
        !reducedMotion();

      if (wantPlay) {
        if (vid.paused) {
          var p = vid.play();
          if (p && typeof p.catch === 'function') p.catch(function () { /* autoplay blocked */ });
        }
      } else if (!vid.paused) {
        try { vid.pause(); } catch (e2) { /* ignore */ }
      }
    }

    if (typeof IntersectionObserver !== 'undefined') {
      var io = new IntersectionObserver(function (entries) {
        inView = !!(entries[0] && entries[0].isIntersecting && entries[0].intersectionRatio > 0.15);
        sync();
      }, { threshold: [0, 0.15, 0.4], rootMargin: '40px 0px' });
      io.observe(vid);
    } else {
      inView = true;
    }

    document.addEventListener('visibilitychange', sync);
    /* React to panel switches + scroll freeze class */
    var mo = new MutationObserver(sync);
    mo.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    var host = document.getElementById('hhx-panel-host');
    if (host) {
      mo.observe(host, { attributes: true, subtree: true, attributeFilter: ['class'] });
    }

    /* After scroll freeze ends, resume if still eligible */
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      lastScroll = Date.now();
      if (!vid.paused) {
        try { vid.pause(); } catch (e3) { /* ignore */ }
      }
      setTimeout(function () {
        if (Date.now() - lastScroll >= 120) sync();
      }, 160);
    }, { passive: true });

    /* Delay first play a tick so layout settles */
    setTimeout(sync, 200);
    setTimeout(sync, 800);
  }

  function injectChrome() {
    styles();
    forgeDust();
    wireProgress();

    if (isMobile()) {
      document.body.classList.add('hhx-mobile');
      if (!document.querySelector('.hhx-mtop')) {
        var m = document.createElement('div');
        m.innerHTML = mobileChromeHtml();
        while (m.firstChild) document.body.insertBefore(m.firstChild, document.body.firstChild);
      }
    }

    if (!document.getElementById('hhx-rail')) {
      var rail = document.createElement('div');
      rail.innerHTML = railHtml();
      var nav = document.querySelector('body > nav');
      if (nav && nav.nextSibling) document.body.insertBefore(rail.firstChild, nav.nextSibling);
      else document.body.insertBefore(rail.firstChild, document.body.firstChild);
    }

    if (!document.getElementById('hhx-board')) {
      var holder = document.createElement('div');
      holder.innerHTML = boardHtml();
      var hero = document.querySelector('header.hero-bg');
      if (hero && hero.parentNode) hero.parentNode.insertBefore(holder.firstChild, hero.nextSibling);
      else document.body.appendChild(holder.firstChild);
    }

    if (!document.getElementById('hhx-panel-host')) {
      var host = document.createElement('div');
      host.id = 'hhx-panel-host';
      var footer = document.querySelector('footer');
      if (footer) document.body.insertBefore(host, footer);
      else document.body.appendChild(host);
      document.body.classList.add('hhx-panels');
      buildStaticPanels();
    }

    document.querySelectorAll('.hhx-mtab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        goTab(tab.getAttribute('data-tab'));
      });
    });
    bindGoClicks(document);
    wireBoard();
    wireDogs();
    document.body.classList.add('hhx-ready');

    /* hero CTA → board/tab */
    document.querySelectorAll('a[href="#hhx-board"]').forEach(function (a) {
      a.addEventListener('click', function (ev) {
        ev.preventDefault();
        goTab('heart');
        var board = document.getElementById('hhx-board');
        if (board) board.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
      });
    });

    var hash = (location.hash || '').replace(/^#/, '');
    if (hash.indexOf('hhx-') === 0) goTab(hash.replace('hhx-', ''));
    else if (hash === 'pipeline') goTab('pipeline');
    else if (hash === 'settings') goTab('settings');
    else if (hash === 'dogs') goTab('dogs');
    else if (hash === 'network') goTab(isMobile() ? 'more' : 'network');
    else goTab('heart');

    /* After panels exist so visibility + heart tab drive play/pause */
    wireHeroVideo();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectChrome);
  } else {
    injectChrome();
  }
})();
