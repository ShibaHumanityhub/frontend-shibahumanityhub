/**
 * Healing Hearts · Therapy Dog Network experience layer
 * Pipeline: recruit → train → certify → place (multi-setting).
 * Clear split: HH = network & placement engine. Silver Paws = senior visit product.
 * Truth: lanes, partners, and placement counts are design demos until funded + agreements live.
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
    { id: 'hospital', icon: '🏥', title: 'Hospitals & clinics', blurb: 'Bedsides, waiting rooms, pediatric wings. Soft presence, infection-control aware protocols when partners are live.' },
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

  function styles() {
    if (document.getElementById('hhx-css')) return;
    var s = document.createElement('style');
    s.id = 'hhx-css';
    s.textContent = [
      ':root{--hh-rose:#f0a8b8;--hh-coral:#e88b9a;--hh-blush:#ffd6de;--hh-ink:#0a0c12;--hh-panel:#120e14;--hh-line:rgba(240,168,184,.32);--hh-glow:rgba(232,139,154,.28);--hh-emerald:#6ee7b7}',
      'body.hhx-panels{scroll-behavior:auto}',
      'body.hhx-panels .hhx-panel{display:none;padding-bottom:2rem}',
      'body.hhx-panels .hhx-panel.is-on{display:block;animation:hhx-fade .22s ease}',
      '.hhx-rail{position:sticky;top:0;z-index:55;display:flex;gap:.3rem;padding:.45rem .75rem;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;background:rgba(10,12,18,.96);backdrop-filter:blur(16px);border-bottom:1px solid var(--hh-line);box-shadow:0 1px 0 rgba(255,255,255,.04),0 12px 40px -20px rgba(0,0,0,.65);justify-content:flex-start}',
      '.hhx-rail::-webkit-scrollbar{display:none}',
      '@media(min-width:900px){.hhx-rail{justify-content:center;flex-wrap:wrap}}',
      '.hhx-rail button,.hhx-rail a{flex:0 0 auto;font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;color:rgba(240,168,184,.55);padding:.4rem .75rem;border-radius:999px;border:1px solid transparent;white-space:nowrap;background:transparent;cursor:pointer;font-family:inherit;font-weight:600}',
      '.hhx-rail button:hover,.hhx-rail a:hover,.hhx-rail button.is-on,.hhx-rail a.is-on{color:#ffe8ed;border-color:rgba(240,168,184,.5);background:linear-gradient(145deg,rgba(240,168,184,.14),rgba(110,231,183,.06));box-shadow:inset 0 1px 0 rgba(255,255,255,.1)}',
      '.hhx-more-grid{display:grid;grid-template-columns:1fr;gap:.55rem;max-width:72rem;margin:0 auto;padding:1rem .85rem 1.5rem}',
      '@media(min-width:640px){.hhx-more-grid{grid-template-columns:1fr 1fr;padding:1.25rem 1.5rem 2rem}}',
      '@media(min-width:1000px){.hhx-more-grid{grid-template-columns:repeat(3,1fr)}}',
      '.hhx-more-card{text-align:left;border-radius:1.1rem;border:1px solid rgba(240,168,184,.28);background:linear-gradient(155deg,rgba(240,168,184,.08),rgba(18,14,20,.94));padding:1rem 1.05rem;cursor:pointer;font:inherit;color:inherit;transition:transform .2s,border-color .2s,box-shadow .2s;box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 16px 40px -24px rgba(0,0,0,.7)}',
      '.hhx-more-card:hover{transform:translateY(-3px);border-color:rgba(255,214,222,.55);box-shadow:0 0 36px -12px rgba(232,139,154,.4),inset 0 1px 0 rgba(255,255,255,.1)}',
      '.hhx-more-card .k{font-size:.55rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(240,168,184,.7);margin:0 0 .3rem}',
      '.hhx-more-card h3{font-family:"Space Grotesk",sans-serif;font-size:1.1rem;margin:0 0 .35rem;color:#ffe8ed;letter-spacing:-.02em}',
      '.hhx-more-card p{margin:0;font-size:.82rem;line-height:1.4;color:rgba(240,200,210,.72)}',
      '.hhx-more-card .go{display:inline-flex;margin-top:.65rem;font-size:.72rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#1a0a10;background:linear-gradient(135deg,#ffe8ed,#f0a8b8 55%,#e88b9a);padding:.4rem .75rem;border-radius:999px}',
      'body.hhx-panels:not(.hhx-mobile) .hhx-quick{display:none}',
      'body.hhx-panels:not(.hhx-mobile) .hhx-mtruth{max-width:72rem;margin:0 auto;padding:.25rem 1.5rem 0;font-size:.68rem;color:rgba(200,170,180,.5)}',
      'body.hhx-panels:not(.hhx-mobile) header.hero-bg{padding-top:5.5rem!important;padding-bottom:1.75rem!important}',
      'body.hhx-panels footer{margin-top:0}',
      '.hhx-board{position:relative;max-width:72rem;margin:0 auto;padding:1.25rem 1rem 0}',
      '@media(min-width:768px){.hhx-board{padding:1.75rem 1.5rem 0}}',
      '.hhx-hud{position:relative;overflow:hidden;border-radius:1.35rem;border:1px solid rgba(240,168,184,.35);background:linear-gradient(145deg,rgba(240,168,184,.1) 0%,rgba(24,14,20,.97) 40%,rgba(8,10,14,.99) 100%);box-shadow:0 30px 80px -30px rgba(0,0,0,.8),0 0 50px -18px rgba(232,139,154,.25),inset 0 1px 0 rgba(255,255,255,.1);padding:1.15rem 1rem 1.25rem}',
      '@media(min-width:768px){.hhx-hud{padding:1.5rem 1.5rem 1.6rem}}',
      '.hhx-hud::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 80% 55% at 15% 0%,rgba(240,168,184,.18),transparent 55%),radial-gradient(ellipse 50% 40% at 100% 100%,rgba(110,231,183,.08),transparent 50%);pointer-events:none}',
      '.hhx-hud::after{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,214,222,.45),transparent);pointer-events:none}',
      '.hhx-hud > *{position:relative;z-index:1}',
      '.hhx-kicker{font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(240,168,184,.85);margin:0 0 .4rem}',
      '.hhx-title{font-family:"Space Grotesk",Inter,system-ui,sans-serif;font-weight:700;letter-spacing:-.03em;font-size:clamp(1.35rem,3.5vw,1.85rem);background:linear-gradient(135deg,#fff 0%,#f0a8b8 40%,#ffe8ed 70%,#6ee7b7 100%);-webkit-background-clip:text;background-clip:text;color:transparent;margin:0 0 .35rem;line-height:1.15}',
      '.hhx-lede{font-size:.9rem;line-height:1.5;color:rgba(255,230,236,.86);margin:0 0 1rem;max-width:42rem}',
      '.hhx-meters{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:1rem}',
      '@media(min-width:640px){.hhx-meters{grid-template-columns:repeat(4,1fr)}}',
      '.hhx-meter{padding:.7rem .65rem;border-radius:.9rem;border:1px solid rgba(240,168,184,.22);background:linear-gradient(160deg,rgba(240,168,184,.08),rgba(0,0,0,.35));box-shadow:inset 0 1px 0 rgba(255,255,255,.05)}',
      '.hhx-meter b{display:block;font-family:"Space Grotesk",sans-serif;font-size:1.15rem;color:#ffe8ed;letter-spacing:-.02em}',
      '.hhx-meter span{font-size:.55rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(240,168,184,.55)}',
      '.hhx-grid{display:grid;gap:.55rem}',
      '@media(min-width:900px){.hhx-grid{grid-template-columns:1.15fr .85fr}}',
      '.hhx-visits{display:grid;gap:.45rem;max-height:300px;overflow:auto;-webkit-overflow-scrolling:touch}',
      '.hhx-visit{border-radius:.9rem;border:1px solid rgba(240,168,184,.2);background:linear-gradient(155deg,rgba(240,168,184,.06),rgba(0,0,0,.42));padding:.75rem .8rem}',
      '.hhx-visit-top{display:flex;justify-content:space-between;align-items:center;gap:.4rem;margin-bottom:.25rem}',
      '.hhx-id{font-family:ui-monospace,monospace;font-size:.7rem;color:#f0a8b8;letter-spacing:.04em}',
      '.hhx-status{font-size:.52rem;letter-spacing:.1em;text-transform:uppercase;color:#ffe8ed;border:1px solid rgba(240,168,184,.4);background:linear-gradient(145deg,rgba(240,168,184,.15),rgba(110,231,183,.08));padding:.2rem .45rem;border-radius:999px}',
      '.hhx-route{font-size:.88rem;font-weight:600;color:#fff5f7;margin:0 0 .2rem}',
      '.hhx-note{font-size:.72rem;color:rgba(240,200,210,.72);margin:0}',
      '.hhx-bar{height:4px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden;margin:.45rem 0 .2rem}',
      '.hhx-bar > i{display:block;height:100%;width:0;border-radius:999px;background:linear-gradient(90deg,#6ee7b7,#f0a8b8,#ffe8ed,#e88b9a);background-size:200% 100%;box-shadow:0 0 10px rgba(240,168,184,.45);transition:width 1s ease;animation:hhx-shine 3.5s linear infinite}',
      '@keyframes hhx-shine{to{background-position:200% 50%}}',
      '.hhx-side{border-radius:1rem;border:1px solid rgba(240,168,184,.22);background:linear-gradient(165deg,rgba(240,168,184,.06),rgba(0,0,0,.4));padding:.9rem}',
      '.hhx-side h3{font-family:"Space Grotesk",sans-serif;font-size:1rem;color:#ffe8ed;margin:0 0 .5rem}',
      '.hhx-chat{min-height:120px;max-height:160px;overflow:auto;font-size:.72rem;line-height:1.35;color:rgba(255,230,236,.78)}',
      '.hhx-chat .line{margin-bottom:.35rem}',
      '.hhx-chat b{color:#f0a8b8}',
      '.hhx-honest{font-size:.62rem;line-height:1.4;color:rgba(200,170,180,.48);margin:.65rem 0 0}',
      '.hhx-cta-row{display:flex;flex-wrap:wrap;gap:.45rem;margin-top:.85rem}',
      '.hhx-cta{display:inline-flex;align-items:center;justify-content:center;padding:.7rem 1.05rem;border-radius:999px;font-weight:700;font-size:.82rem;text-decoration:none;min-height:44px;border:0;cursor:pointer;font-family:inherit}',
      '.hhx-cta-main{color:#1a0a10;background:linear-gradient(135deg,#ffe8ed,#f0a8b8 50%,#e88b9a);box-shadow:0 10px 28px -12px rgba(232,139,154,.55),inset 0 1px 0 rgba(255,255,255,.5)}',
      '.hhx-cta-ghost{color:#ffe8ed;border:1px solid rgba(240,168,184,.4);background:rgba(0,0,0,.28)}',
      '.hhx-scan{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,214,222,.5),transparent);animation:hhx-scan 5.5s linear infinite;pointer-events:none;opacity:.55}',
      '@keyframes hhx-scan{0%{top:8%}100%{top:92%}}',
      'body.hhx-ready header.hero-bg{position:relative;overflow:hidden}',
      'body.hhx-ready .hhx-progress{position:fixed;top:0;left:0;height:2px;width:0;z-index:80;background:linear-gradient(90deg,#6ee7b7,#f0a8b8,#ffe8ed,#e88b9a);box-shadow:0 0 14px rgba(240,168,184,.55)}',
      /* Mobile */
      'body.hhx-mobile{padding-bottom:calc(4.6rem + env(safe-area-inset-bottom));overflow-x:hidden;background:#0a0c12!important}',
      'body.hhx-mobile .hhx-rail{display:none!important}',
      'body.hhx-mobile > nav{display:none!important}',
      'body.hhx-mobile > footer{padding:1.5rem 1rem 6rem!important;font-size:11px!important}',
      'body.hhx-mobile #mobile-menu{display:none!important}',
      'body.hhx-mobile .fixed.bottom-3{display:none!important}',
      'body.hhx-panels:not(.hhx-mobile) > nav{display:block}',
      '.hhx-mtop{display:none;position:sticky;top:0;z-index:70;align-items:center;justify-content:space-between;gap:.5rem;padding:.5rem .7rem;padding-top:max(.45rem,env(safe-area-inset-top));background:rgba(10,12,18,.97);backdrop-filter:blur(16px);border-bottom:1px solid var(--hh-line)}',
      'body.hhx-mobile .hhx-mtop{display:flex}',
      '.hhx-mtop a{display:flex;align-items:center;gap:.4rem;text-decoration:none;color:inherit;min-width:0}',
      '.hhx-mtop img{width:30px;height:30px;border-radius:50%;object-fit:cover;border:1px solid rgba(240,168,184,.45)}',
      '.hhx-mtop span{font-size:.65rem;font-weight:700;letter-spacing:.05em;color:#ffe8ed;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.hhx-mtop .hhx-live{display:inline-flex;align-items:center;gap:.28rem;font-size:.5rem;letter-spacing:.1em;text-transform:uppercase;color:#ffe8ed;border:1px solid rgba(240,168,184,.45);background:linear-gradient(145deg,rgba(240,168,184,.12),rgba(110,231,183,.08));padding:.28rem .5rem;border-radius:999px;flex-shrink:0}',
      '.hhx-mtop .hhx-live i{width:5px;height:5px;border-radius:50%;background:#f0a8b8;box-shadow:0 0 8px rgba(240,168,184,.7)}',
      '.hhx-mtabs{display:none;position:fixed;left:0;right:0;bottom:0;z-index:75;grid-template-columns:repeat(5,1fr);padding:.28rem .15rem calc(.28rem + env(safe-area-inset-bottom));background:rgba(8,6,10,.98);border-top:1px solid var(--hh-line);backdrop-filter:blur(18px)}',
      'body.hhx-mobile .hhx-mtabs{display:grid}',
      '.hhx-mtab{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.12rem;border:0;background:transparent;color:rgba(240,168,184,.4);font-size:.48rem;letter-spacing:.03em;text-transform:uppercase;font-weight:700;font-family:inherit;padding:.3rem .05rem;min-height:50px;cursor:pointer;border-radius:.65rem;-webkit-tap-highlight-color:transparent}',
      '.hhx-mtab .ic{font-size:1.05rem;line-height:1;opacity:.7}',
      '.hhx-mtab.is-on{color:#ffe8ed;background:linear-gradient(180deg,rgba(240,168,184,.12),rgba(110,231,183,.05))}',
      '.hhx-mtab.is-on .ic{opacity:1;filter:drop-shadow(0 0 8px rgba(240,168,184,.5))}',
      '.hhx-mtab.is-on::after{content:"";position:absolute;top:4px;width:16px;height:2px;border-radius:2px;background:linear-gradient(90deg,#6ee7b7,#f0a8b8,#ffe8ed)}',
      'body.hhx-mobile .hhx-panel{padding:0 0 1.25rem}',
      '@keyframes hhx-fade{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}',
      'body.hhx-mobile header.hero-bg{padding:3.6rem .75rem .85rem!important}',
      'body.hhx-mobile header.hero-bg h1{font-size:1.75rem!important;line-height:1.05!important}',
      'body.hhx-mobile header.hero-bg .text-xl,body.hhx-mobile header.hero-bg .mt-4{display:none!important}',
      'body.hhx-mobile .hhx-mlede{font-size:.86rem;line-height:1.45;color:rgba(255,230,236,.88);margin:.45rem 0 .55rem}',
      '.hhx-pipe-grid{display:grid;gap:.65rem;max-width:72rem;margin:0 auto;padding:1rem .85rem 2rem}',
      '@media(min-width:700px){.hhx-pipe-grid{grid-template-columns:repeat(5,1fr);padding:1.25rem 1.5rem 2.5rem}}',
      '.hhx-pipe-card{border-radius:1.1rem;border:1px solid rgba(240,168,184,.25);background:linear-gradient(160deg,rgba(240,168,184,.07),rgba(12,10,14,.95));padding:1rem .9rem;box-shadow:inset 0 1px 0 rgba(255,255,255,.05)}',
      '.hhx-pipe-card .n{font-family:"Space Grotesk",sans-serif;font-size:.7rem;letter-spacing:.14em;color:#6ee7b7;margin:0 0 .35rem}',
      '.hhx-pipe-card h3{font-family:"Space Grotesk",sans-serif;font-size:1.05rem;color:#ffe8ed;margin:0 0 .4rem}',
      '.hhx-pipe-card p{margin:0;font-size:.78rem;line-height:1.45;color:rgba(240,200,210,.75)}',
      '.hhx-set-grid{display:grid;gap:.65rem;max-width:72rem;margin:0 auto;padding:1rem .85rem 2rem}',
      '@media(min-width:640px){.hhx-set-grid{grid-template-columns:1fr 1fr;padding:1.25rem 1.5rem 2.5rem}}',
      '@media(min-width:1000px){.hhx-set-grid{grid-template-columns:repeat(3,1fr)}}',
      '.hhx-set-card{border-radius:1.15rem;border:1px solid rgba(240,168,184,.25);background:linear-gradient(155deg,rgba(240,168,184,.08),rgba(14,12,16,.96));padding:1.1rem 1rem;transition:transform .2s,border-color .2s}',
      '.hhx-set-card:hover{transform:translateY(-3px);border-color:rgba(255,214,222,.5)}',
      '.hhx-set-card .ic{font-size:1.4rem;margin-bottom:.4rem}',
      '.hhx-set-card h3{font-family:"Space Grotesk",sans-serif;font-size:1.05rem;color:#ffe8ed;margin:0 0 .35rem}',
      '.hhx-set-card p{margin:0;font-size:.8rem;line-height:1.45;color:rgba(240,200,210,.75)}',
      '.hhx-set-card a{display:inline-block;margin-top:.55rem;font-size:.75rem;font-weight:700;color:#f0a8b8;text-decoration:underline}',
      '.hhx-split{max-width:72rem;margin:0 auto;padding:1rem .85rem 2rem;display:grid;gap:.75rem}',
      '@media(min-width:800px){.hhx-split{grid-template-columns:1fr 1fr;padding:1.25rem 1.5rem 2.5rem}}',
      '.hhx-split-card{border-radius:1.2rem;border:1px solid rgba(240,168,184,.28);padding:1.25rem 1.1rem;background:linear-gradient(160deg,rgba(240,168,184,.07),rgba(10,12,16,.96))}',
      '.hhx-split-card.sp{border-color:rgba(200,210,225,.3);background:linear-gradient(160deg,rgba(200,210,225,.08),rgba(10,12,16,.96))}',
      '.hhx-split-card h3{font-family:"Space Grotesk",sans-serif;font-size:1.15rem;margin:0 0 .5rem;color:#ffe8ed}',
      '.hhx-split-card.sp h3{color:#eef1f6}',
      '.hhx-split-card ul{margin:.5rem 0 0;padding-left:1.1rem;font-size:.82rem;line-height:1.5;color:rgba(240,200,210,.8)}',
      '.hhx-split-card.sp ul{color:rgba(200,210,225,.8)}',
      '.hhx-section-head{max-width:72rem;margin:0 auto;padding:1.5rem .85rem .25rem}',
      '@media(min-width:768px){.hhx-section-head{padding:2rem 1.5rem .5rem}}',
      '.hhx-section-head h2{font-family:"Space Grotesk",sans-serif;font-size:clamp(1.35rem,3vw,1.75rem);letter-spacing:-.03em;margin:0 0 .4rem;background:linear-gradient(135deg,#fff,#f0a8b8 50%,#6ee7b7);-webkit-background-clip:text;background-clip:text;color:transparent}',
      '.hhx-section-head p{margin:0;font-size:.88rem;color:rgba(240,200,210,.72);max-width:36rem;line-height:1.45}',
      '.hhx-dog-grid{display:grid;gap:.55rem;max-width:72rem;margin:0 auto;padding:1rem .85rem 2rem}',
      '@media(min-width:640px){.hhx-dog-grid{grid-template-columns:1fr 1fr;padding:1.25rem 1.5rem 2.5rem}}',
      '@media(min-width:1000px){.hhx-dog-grid{grid-template-columns:repeat(3,1fr)}}',
      '.hhx-dog{border-radius:1.1rem;border:1px solid rgba(240,168,184,.22);background:linear-gradient(155deg,rgba(255,255,255,.04),rgba(12,10,14,.95));padding:1rem;cursor:pointer;text-align:left;font:inherit;color:inherit;transition:border-color .2s,transform .2s}',
      '.hhx-dog:hover,.hhx-dog.is-on{border-color:rgba(255,214,222,.55);transform:translateY(-2px)}',
      '.hhx-dog h4{font-family:"Space Grotesk",sans-serif;margin:0 0 .25rem;color:#ffe8ed;font-size:1rem}',
      '.hhx-dog .tag{font-size:.55rem;letter-spacing:.1em;text-transform:uppercase;color:#6ee7b7;margin:0 0 .35rem}',
      '.hhx-dog p{margin:0;font-size:.78rem;color:rgba(240,200,210,.72);line-height:1.4}',
      '.hhx-net-list{max-width:72rem;margin:0 auto;padding:1rem .85rem 2rem;display:grid;gap:.5rem}',
      '@media(min-width:768px){.hhx-net-list{padding:1.25rem 1.5rem 2.5rem}}',
      '.hhx-net-row{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.5rem;padding:.85rem 1rem;border-radius:1rem;border:1px solid rgba(240,168,184,.2);background:linear-gradient(155deg,rgba(240,168,184,.05),rgba(0,0,0,.35))}',
      '.hhx-net-row strong{color:#ffe8ed;font-size:.92rem}',
      '.hhx-net-row span{font-size:.75rem;color:rgba(240,200,210,.65)}',
      '.hhx-net-row .badge{font-size:.55rem;letter-spacing:.1em;text-transform:uppercase;border:1px solid rgba(110,231,183,.4);color:#6ee7b7;padding:.2rem .5rem;border-radius:999px}',
      '.hhx-quick{display:flex;flex-wrap:wrap;gap:.4rem;padding:.75rem .85rem 0;max-width:72rem;margin:0 auto}',
      '.hhx-quick button{flex:1 1 auto;min-height:44px;border-radius:999px;border:1px solid rgba(240,168,184,.35);background:rgba(0,0,0,.35);color:#ffe8ed;font-size:.75rem;font-weight:700;font-family:inherit;cursor:pointer;padding:.55rem .8rem}',
      '.hhx-quick button.pri{background:linear-gradient(135deg,#ffe8ed,#f0a8b8);color:#1a0a10;border:0}'
    ].join('');
    document.head.appendChild(s);
  }

  function boardHtml() {
    var meters =
      '<div class="hhx-meters">' +
      '<div class="hhx-meter"><b>6</b><span>Demo lanes</span></div>' +
      '<div class="hhx-meter"><b>5</b><span>Pipeline stages</span></div>' +
      '<div class="hhx-meter"><b>6</b><span>Setting types</span></div>' +
      '<div class="hhx-meter"><b>0</b><span>Live placements yet</span></div>' +
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
          '<div class="hhx-scan" aria-hidden="true"></div>' +
          '<p class="hhx-kicker">Network command · design preview</p>' +
          '<h2 class="hhx-title">Train. Certify. Place. Heal.</h2>' +
          '<p class="hhx-lede">Healing Hearts is the therapy-dog <strong>network</strong>: shelter dogs become certified partners for hospitals, schools, hospice, community programs — and feed <a href="silver-paws.html" style="color:#f0a8b8;text-decoration:underline">Silver Paws</a> for senior visits. This board is illustrative until funding and partners are live.</p>' +
          meters +
          '<div class="hhx-grid">' +
            '<div class="hhx-visits" id="hhx-lanes">' + visits + '</div>' +
            '<div class="hhx-side">' +
              '<h3>Desk chatter</h3>' +
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
        '<a href="index.html"><img src="assets/logos/shibahumanityhublogo3d-new.jpg" width="30" height="30" alt=""><span>HEALING HEARTS</span></a>' +
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
      '<div class="hhx-pipe-grid">' +
        PIPELINE.map(function (s) {
          return (
            '<div class="hhx-pipe-card">' +
              '<p class="n">' + s.n + '</p>' +
              '<h3>' + s.title + '</h3>' +
              '<p>' + s.body + '</p>' +
            '</div>'
          );
        }).join('') +
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
      { name: 'Willow', tag: 'Low stim · hospital', body: 'Soft eyes, slow approach. Best for quiet wards and long sits beside a bed.' },
      { name: 'Bear', tag: 'Steady · veterans', body: 'Solid presence without pushiness. Good for groups and hallway routes.' },
      { name: 'Nori', tag: 'Playful calm · schools', body: 'Curious but polite. Reading-buddy energy without chaos.' },
      { name: 'Atlas', tag: 'Hospice soft', body: 'Ultra-quiet. Thrives when the room needs stillness more than tricks.' },
      { name: 'Mabel', tag: 'Silver Paws track', body: 'Senior-home ready temperament. Routes into SP visit packages + photographer.' },
      { name: 'Theo', tag: 'Intake · design', body: 'New shelter pull on the board. Screening first, training second.' }
    ];
    return (
      '<div class="hhx-section-head"><h2>Dog tracks (preview)</h2><p>Illustrative profiles. Real dogs appear only with shelter partners and consent.</p></div>' +
      '<div class="hhx-dog-grid">' +
        dogs.map(function (d) {
          return (
            '<button type="button" class="hhx-dog" data-dog="' + d.name + '">' +
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
      '<div class="hhx-cta-row" style="max-width:72rem;margin:0 auto;padding:0 .85rem 2.5rem">' +
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
    var longP = hero.querySelector('p.mt-6, p.text-lg, p.text-xl');
    if (longP) {
      var short = document.createElement('p');
      short.className = 'hhx-mlede';
      short.textContent = 'Therapy dog network: train, certify, place. Click below. No endless scroll.';
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

  function wireBoard() {
    var chat = document.getElementById('hhx-chat');
    if (!chat) return;
    var lines = [
      ['@desk', 'Willow on hospital track. Vest kit design only.'],
      ['@train', 'Nori reading-buddy protocol draft ready.'],
      ['@place', 'Atlas hospice soft · consent checklist.'],
      ['@sp', 'Mabel feeds Silver Paws senior product.'],
      ['@truth', 'Preview board. Real partners when agreements land.'],
      ['@net', 'Chapters are seats — not live contracts.']
    ];
    var i = 0;
    function tick() {
      if (!chat) return;
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
    setInterval(tick, 4200);

    /* animate bars once visible */
    requestAnimationFrame(function () {
      document.querySelectorAll('.hhx-bar > i').forEach(function (bar) {
        var w = bar.style.width;
        bar.style.width = '0';
        requestAnimationFrame(function () { bar.style.width = w; });
      });
    });
  }

  function wireDogs() {
    document.querySelectorAll('.hhx-dog').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.hhx-dog').forEach(function (b) { b.classList.remove('is-on'); });
        btn.classList.add('is-on');
      });
    });
  }

  function injectChrome() {
    styles();
    if (!document.querySelector('.hhx-progress')) {
      var bar = document.createElement('div');
      bar.className = 'hhx-progress';
      document.body.appendChild(bar);
      window.addEventListener('scroll', function () {
        var h = document.documentElement;
        var max = h.scrollHeight - h.clientHeight;
        bar.style.width = max > 0 ? ((h.scrollTop / max) * 100) + '%' : '0';
      }, { passive: true });
    }

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

    var hash = (location.hash || '').replace(/^#/, '');
    if (hash.indexOf('hhx-') === 0) goTab(hash.replace('hhx-', ''));
    else if (hash === 'pipeline') goTab('pipeline');
    else if (hash === 'settings') goTab('settings');
    else if (hash === 'dogs') goTab('dogs');
    else if (hash === 'network') goTab(isMobile() ? 'more' : 'network');
    else goTab('heart');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectChrome);
  } else {
    injectChrome();
  }
})();
