/**
 * Orphan Christmas arena - skull-grab page experience.
 * Live warehouse broadcast UI, elegant holiday palette, multi-cam floor.
 * Preview until real streams are live. Truth labeled.
 */
(function () {
 'use strict';

 /* Root-absolute paths so video works under /programs/ and trailing-slash URLs */
 var CAMS = [
 {
 id: 'wrap',
 label: 'CAM 01 · WRAP LINE',
 sub: 'Elves folding paper · gold light',
 src: '/assets/videos/orphanchristmas-animated.mp4',
 poster: '/assets/images/orphanxmasphoto.jpg'
 },
 {
 id: 'load',
 label: 'CAM 02 · LOAD DOCK',
 sub: 'Pallets sealing · trucks waiting',
 src: '/assets/videos/santasworkshoplive-animated.mp4',
 poster: '/assets/images/santasworkshoplivephoto.jpg'
 },
 {
 id: 'floor',
 label: 'CAM 03 · MAIN FLOOR',
 sub: 'Full warehouse · Christmas shift',
 src: '/assets/videos/orphanchristmas-animated.mp4',
 poster: '/assets/images/orphanxmasphoto.jpg'
 },
 {
 id: 'desk',
 label: 'CAM 04 · WISH DESK',
 sub: 'Verified lists · quiet hands',
 src: '/assets/videos/santasworkshoplive-animated.mp4',
 poster: '/assets/images/santasworkshoplivephoto.jpg'
 }
 ];

 var CRAWL = [
 'LIVE FROM THE MERCY WAREHOUSE',
 '30 DAYS OF CHRISTMAS · HARD DISTRIBUTION',
 'LIVE NIGHTS · VESSYMINK CAROLS · AMA · SANTA',
 'EVERY BOX HAS A NAME BEHIND A PARTNER CODE',
 'NO SCAMMERS · VERIFIED NEED ONLY',
 'FREIGHT TRACKERS · DAILY CHEER · NAMED HEARTS',
 'DEC 23-24 HOLY NIGHT · FINAL MILE',
 'SPONSORED FROM THE HEARTS OF THOSE WHO SAY YES',
 'TURKEY DINNERS · GROCERY VOUCHERS · GIFT PACKS',
 'JESUS IS THE REASON · THESE KIDS ARE THE WHY',
 'WHEN FUNDED THIS FEED GOES REAL'
 ];

 function styles() {
 if (document.getElementById('oc-arena-css')) return;
 var s = document.createElement('style');
 s.id = 'oc-arena-css';
 s.textContent = [
 'html,body{overflow-x:hidden;max-width:100%}',
 'body.oc-arena-on{background:#0a0608!important;overflow-x:hidden}',
 'body.oc-arena-on > nav{border-bottom-color:rgba(232,197,71,.35)!important;background:rgba(10,6,8,.94)!important;z-index:50}',
 'body.oc-arena-on > footer{border-top-color:rgba(232,197,71,.2);background:#0a0608;position:relative;z-index:2}',
 '.oca{--wine:#6b0f1a;--crimson:#c41e3a;--gold:#e8c547;--cream:#fff4e0;--pine:#0d3d2c;--ink:#0a0608;font-family:Inter,system-ui,sans-serif;color:var(--cream);position:relative;width:100%;max-width:100vw;overflow-x:hidden}',
 '.oca *{box-sizing:border-box}',
 '.oca-snow{position:fixed;inset:0;pointer-events:none;z-index:1;overflow:hidden}',
 '.oca-snow i{position:absolute;top:-10px;width:3px;height:3px;background:#fff;border-radius:50%;opacity:.3;animation:oca-fall linear infinite}',
 '@keyframes oca-fall{to{transform:translateY(110vh)}}',
 /* HERO - mobile first */
 '.oca-hero{position:relative;min-height:auto;padding:5.5rem .9rem 2rem;display:flex;flex-direction:column;justify-content:flex-start;overflow:hidden;z-index:2}',
 '@media(min-width:768px){.oca-hero{min-height:100vh;padding:7rem 1.5rem 3rem;justify-content:center}}',
 '.oca-hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 90% 55% at 50% -5%,rgba(196,30,58,.55),transparent 55%),radial-gradient(ellipse 60% 40% at 100% 90%,rgba(13,61,44,.55),transparent 50%),radial-gradient(ellipse 45% 35% at 0% 70%,rgba(232,197,71,.14),transparent 45%),linear-gradient(180deg,#1a080c 0%,#0a0608 55%,#0a0f0c 100%)}',
 '.oca-hero-bg::after{content:"";position:absolute;inset:0;background:url(/assets/images/orphanxmasphoto.jpg) center/cover;opacity:.16;mix-blend-mode:luminosity}',
 /* Forced desktop (?desktop=1) on a phone: keep layout usable */
 'body.oc-force-desktop{overflow-x:hidden}',
 'body.oc-force-desktop .oca{max-width:100vw}',
 'body.oc-force-desktop .oca-hero{padding-top:4.5rem;min-height:auto}',
 'body.oc-force-desktop .oca-main-feed{max-height:min(42vh,280px)}',
 'body.oc-force-desktop .oca-mobile-bar{display:flex}',
 'body.oc-force-desktop #christmas-ops,.oca #christmas-ops{max-width:100%;overflow-x:auto}',
 'body.oc-force-desktop .xops-grid,body.oc-force-desktop .xops-row{min-width:0}',
 '.oca-force-banner{position:sticky;top:0;z-index:55;display:flex;align-items:center;justify-content:space-between;gap:.5rem;padding:.55rem .75rem;background:rgba(10,6,8,.96);border-bottom:1px solid rgba(232,197,71,.35);font-size:.72rem;color:rgba(255,244,224,.85)}',
 '.oca-force-banner a{color:#fde68a;font-weight:700;text-decoration:underline;white-space:nowrap;min-height:44px;display:inline-flex;align-items:center}',
 '.oca-hero-inner{position:relative;z-index:2;max-width:72rem;margin:0 auto;width:100%}',
 '.oca-live-pill{display:inline-flex;align-items:center;gap:.45rem;padding:.45rem .8rem;border-radius:999px;border:1px solid rgba(239,68,68,.55);background:rgba(127,29,29,.55);font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;color:#fecaca;margin-bottom:1rem;box-shadow:0 0 28px rgba(239,68,68,.35);max-width:100%}',
 '.oca-live-pill .dot{width:8px;height:8px;border-radius:50%;background:#ef4444;box-shadow:0 0 14px #ef4444;animation:oca-blink 1.1s ease infinite;flex-shrink:0}',
 '@keyframes oca-blink{0%,100%{opacity:1}50%{opacity:.25}}',
 '.oca-kicker{font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(232,197,71,.8);margin:0 0 .65rem}',
 '.oca-h1{font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.85rem,8.2vw,4.75rem);line-height:1.05;font-weight:700;margin:0 0 .9rem;color:#fff;text-shadow:0 0 50px rgba(196,30,58,.55),0 2px 0 rgba(0,0,0,.5);word-wrap:break-word}',
 '.oca-h1 em{font-style:normal;background:linear-gradient(90deg,#fde68a,#e8c547,#fca5a5);-webkit-background-clip:text;background-clip:text;color:transparent}',
 '.oca-lede{font-size:clamp(.95rem,3.6vw,1.35rem);line-height:1.55;color:rgba(255,244,224,.9);max-width:38rem;margin:0 0 1.35rem;font-weight:400}',
 '.oca-lede strong{color:#fde68a;font-weight:600}',
 '.oca-cta-row{display:flex;flex-direction:column;gap:.65rem;margin-bottom:1.35rem;width:100%}',
 '@media(min-width:560px){.oca-cta-row{flex-direction:row;flex-wrap:wrap}}',
 '.oca-cta{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;padding:1rem 1.25rem;border-radius:999px;font-weight:700;font-size:.95rem;text-decoration:none;border:0;cursor:pointer;font-family:inherit;transition:transform .15s,box-shadow .15s;width:100%;min-height:48px;touch-action:manipulation;-webkit-tap-highlight-color:transparent}',
 '@media(min-width:560px){.oca-cta{width:auto;padding:1rem 1.6rem}}',
 '.oca-cta:active{transform:scale(.98)}',
 '.oca-cta-primary{color:#1a080c;background:linear-gradient(135deg,#f5e6a8 0%,#e8c547 35%,#c41e3a 100%);box-shadow:0 12px 40px -8px rgba(196,30,58,.6),0 0 0 1px rgba(253,230,138,.25)}',
 '.oca-cta-ghost{color:#fde68a;background:rgba(0,0,0,.25);border:1px solid rgba(232,197,71,.45)}',
 '.oca-stats{display:grid;grid-template-columns:1fr 1fr;gap:.55rem;width:100%}',
 '@media(min-width:640px){.oca-stats{display:flex;flex-wrap:wrap;gap:.75rem}}',
 '.oca-stat{padding:.7rem .85rem;border-radius:1rem;border:1px solid rgba(232,197,71,.25);background:rgba(0,0,0,.4);backdrop-filter:blur(10px);min-width:0}',
 '.oca-stat b{display:block;font-size:1.05rem;color:#fde68a;font-family:Georgia,serif}',
 '.oca-stat span{font-size:.58rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,244,224,.55)}',
 /* Broadcast */
 '.oca-broadcast{position:relative;z-index:2;padding:0 .75rem 1.5rem;max-width:72rem;margin:0 auto;width:100%}',
 '@media(min-width:640px){.oca-broadcast{padding:0 1rem 2.25rem}}',
 '.oca-bcast-head{display:flex;flex-direction:column;align-items:flex-start;gap:.35rem;margin-bottom:.55rem}',
 '@media(min-width:640px){.oca-bcast-head{flex-direction:row;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:1rem;margin-bottom:.85rem}}',
 '.oca-bcast-title{font-family:Georgia,serif;font-size:clamp(1.2rem,4.5vw,2rem);margin:0;color:#fff;line-height:1.15}',
 '.oca-viewers{font-size:.65rem;color:#fca5a5;letter-spacing:.04em}',
 '.oca-stage{display:grid;grid-template-columns:1fr;gap:.55rem}',
 '@media(min-width:900px){.oca-stage{grid-template-columns:1.65fr .9fr;gap:1rem}}',
 /* Mobile: compact live screen so it does not eat the viewport */
 '.oca-main-feed{position:relative;border-radius:.85rem;overflow:hidden;border:1px solid rgba(232,197,71,.4);background:#000;box-shadow:0 0 0 1px rgba(196,30,58,.2),0 12px 32px -12px rgba(0,0,0,.85),0 0 36px -14px rgba(196,30,58,.4);width:100%;aspect-ratio:16/9;max-height:min(34vh,220px)}',
 '@media(min-width:480px){.oca-main-feed{max-height:min(38vh,260px);border-radius:1rem}}',
 '@media(min-width:640px){.oca-main-feed{aspect-ratio:16/9;max-height:none;border-radius:1.25rem;box-shadow:0 0 0 1px rgba(196,30,58,.2),0 20px 50px -16px rgba(0,0,0,.85),0 0 50px -18px rgba(196,30,58,.45)}}',
 '.oca-main-feed video{width:100%;height:100%;object-fit:cover;display:block}',
 '.oca-overlay{position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(0,0,0,.5) 0%,transparent 28%,transparent 68%,rgba(0,0,0,.7) 100%)}',
 '.oca-scan{position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,transparent 0 2px,rgba(255,255,255,.03) 2px 3px);mix-blend-mode:overlay;opacity:.45}',
 '.oca-feed-top{position:absolute;top:0;left:0;right:0;padding:.4rem .5rem;display:flex;justify-content:space-between;align-items:flex-start;gap:.4rem;z-index:3;pointer-events:none}',
 '@media(min-width:640px){.oca-feed-top{padding:.85rem 1rem}}',
 '.oca-feed-bot{position:absolute;bottom:0;left:0;right:0;padding:.35rem .5rem;z-index:3;pointer-events:none}',
 '@media(min-width:640px){.oca-feed-bot{padding:.85rem 1rem}}',
 '.oca-cam-tag{font-size:.5rem;letter-spacing:.08em;text-transform:uppercase;color:#fde68a;text-shadow:0 1px 4px #000}',
 '@media(min-width:640px){.oca-cam-tag{font-size:.65rem;letter-spacing:.16em}}',
 '.oca-cam-sub{font-size:.58rem;color:rgba(255,244,224,.75);margin-top:.1rem;line-height:1.25;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}',
 '@media(min-width:640px){.oca-cam-sub{font-size:.75rem;-webkit-line-clamp:2}}',
 '.oca-rec{display:inline-flex;align-items:center;gap:.25rem;font-size:.48rem;letter-spacing:.08em;color:#fecaca;background:rgba(127,29,29,.8);padding:.22rem .38rem;border-radius:4px;flex-shrink:0}',
 '@media(min-width:640px){.oca-rec{font-size:.55rem;letter-spacing:.1em;padding:.28rem .45rem}}',
 '.oca-rec i{width:5px;height:5px;border-radius:50%;background:#ef4444;animation:oca-blink 1s ease infinite}',
 '.oca-ticker{margin-top:.4rem;overflow:hidden;border-radius:.55rem;border:1px solid rgba(232,197,71,.25);background:rgba(10,6,8,.9);white-space:nowrap;max-width:100%}',
 '@media(min-width:640px){.oca-ticker{margin-top:.55rem;border-radius:.65rem}}',
 '.oca-ticker-track{display:inline-block;padding:.4rem 0;animation:oca-tick 32s linear infinite;font-size:.55rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(253,230,138,.9)}',
 '@media(min-width:640px){.oca-ticker-track{padding:.5rem 0;font-size:.62rem;letter-spacing:.1em}}',
 '.oca-ticker-track span{margin:0 1.5rem}',
 '@keyframes oca-tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}',
 /* Mobile cam rail - compact horizontal scroll */
 '.oca-side{display:flex;flex-direction:column;gap:.4rem}',
 '.oca-thumbs{display:flex;gap:.35rem;overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:.15rem;scrollbar-width:none;margin:0;padding-left:0;padding-right:0}',
 '.oca-thumbs::-webkit-scrollbar{display:none}',
 '@media(min-width:900px){.oca-thumbs{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;overflow:visible}}',
 '.oca-thumb{position:relative;border-radius:.55rem;overflow:hidden;border:1px solid rgba(255,255,255,.12);cursor:pointer;aspect-ratio:16/9;background:#111;transition:border-color .2s,box-shadow .2s;padding:0;font:inherit;color:inherit;text-align:left;flex:0 0 28%;min-width:88px;max-width:120px;height:auto;max-height:64px;touch-action:manipulation}',
 '@media(min-width:480px){.oca-thumb{flex:0 0 30%;min-width:100px;max-width:140px;max-height:72px}}',
 '@media(min-width:900px){.oca-thumb{flex:none;min-width:0;max-width:none;max-height:none;width:100%;border-radius:.9rem;aspect-ratio:16/10}}',
 '.oca-thumb:hover,.oca-thumb.is-live{border-color:rgba(232,197,71,.6);box-shadow:0 0 28px -6px rgba(232,197,71,.5)}',
 '.oca-thumb video,.oca-thumb img{width:100%;height:100%;object-fit:cover;display:block;opacity:.88}',
 '.oca-thumb-label{position:absolute;left:0;right:0;bottom:0;padding:.25rem .3rem;background:linear-gradient(transparent,rgba(0,0,0,.92));font-size:.42rem;letter-spacing:.06em;text-transform:uppercase;color:#fde68a;line-height:1.15}',
 '@media(min-width:900px){.oca-thumb-label{padding:.4rem .45rem;font-size:.52rem;letter-spacing:.08em}}',
 '.oca-chat{border-radius:.75rem;border:1px solid rgba(232,197,71,.25);background:rgba(20,10,12,.92);padding:.55rem .6rem;min-height:72px;max-height:100px;overflow:auto;-webkit-overflow-scrolling:touch}',
 '@media(min-width:640px){.oca-chat{min-height:110px;max-height:150px;padding:.7rem;border-radius:.9rem}}',
 '@media(min-width:900px){.oca-chat{min-height:140px;max-height:200px}}',
 '.oca-chat-line{font-size:.7rem;color:rgba(255,244,224,.75);margin-bottom:.4rem;line-height:1.35}',
 '.oca-chat-line b{color:#fde68a;font-weight:600}',
 '.oca-honest{font-size:.6rem;color:rgba(255,244,224,.45);margin-top:.4rem;text-align:center;line-height:1.35;padding:0 .15rem}',
 '@media(min-width:640px){.oca-honest{font-size:.65rem;margin-top:.65rem;line-height:1.4;padding:0 .25rem}}',
 /* Story */
 '.oca-story{position:relative;z-index:2;padding:2rem .9rem 1.75rem;max-width:48rem;margin:0 auto;width:100%}',
 '@media(min-width:640px){.oca-story{padding:3rem 1.25rem 2rem}}',
 '.oca-story h2{font-family:Georgia,serif;font-size:clamp(1.45rem,5.5vw,2.4rem);color:#fff;margin:0 0 .85rem;line-height:1.15}',
 '.oca-story p{font-size:clamp(.95rem,3.5vw,1.05rem);line-height:1.65;color:rgba(255,244,224,.85);margin:0 0 .9rem}',
 '.oca-story p strong{color:#fde68a}',
 '.oca-verse{border-left:3px solid var(--gold);padding:.85rem 1rem;margin:1.25rem 0;background:linear-gradient(90deg,rgba(196,30,58,.18),transparent);font-family:Georgia,serif;font-style:italic;color:#fde68a;font-size:clamp(.95rem,3.5vw,1.1rem);line-height:1.45}',
 '.oca-verse cite{display:block;margin-top:.4rem;font-family:Inter,sans-serif;font-style:normal;font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(232,197,71,.65)}',
 '.oca-who{display:grid;grid-template-columns:1fr;gap:.55rem;margin:1.25rem 0}',
 '@media(min-width:480px){.oca-who{grid-template-columns:1fr 1fr}}',
 '.oca-who div{padding:.85rem;border-radius:.9rem;border:1px solid rgba(196,30,58,.35);background:rgba(107,15,26,.3)}',
 '.oca-who b{display:block;color:#fecaca;font-size:.82rem;margin-bottom:.25rem}',
 '.oca-who span{font-size:.76rem;color:rgba(255,244,224,.62);line-height:1.4}',
 '.oca-ops-anchor{scroll-margin-top:4.5rem}',
 '#christmas-ops{overflow-x:hidden}',
 /* sticky mobile jump */
 '.oca-mobile-bar{display:flex;gap:.4rem;position:sticky;bottom:0;z-index:40;padding:.55rem .75rem calc(.55rem + env(safe-area-inset-bottom));background:linear-gradient(180deg,transparent,rgba(10,6,8,.96) 28%);backdrop-filter:blur(12px);border-top:1px solid rgba(232,197,71,.2)}',
 '@media(min-width:900px){.oca-mobile-bar{display:none}}',
 '.oca-mobile-bar a{flex:1;text-align:center;font-size:.68rem;font-weight:700;padding:.7rem .35rem;border-radius:999px;text-decoration:none;min-height:44px;display:flex;align-items:center;justify-content:center}',
 '.oca-mobile-bar a.pri{color:#1a080c;background:linear-gradient(135deg,#f5e6a8,#e8c547 40%,#c41e3a)}',
 '.oca-mobile-bar a.sec{color:#fde68a;border:1px solid rgba(232,197,71,.4);background:rgba(0,0,0,.35)}',
 '@media(prefers-reduced-motion:reduce){.oca-snow i,.oca-ticker-track,.oca-live-pill .dot,.oca-rec i{animation:none!important}}'
 ].join('\n');
 document.head.appendChild(s);
 }

function snow(n) {
 var box = document.createElement('div');
 box.className = 'oca-snow';
 box.setAttribute('aria-hidden', 'true');
 for (var i = 0; i < n; i++) {
 var f = document.createElement('i');
 f.style.left = Math.random() * 100 + '%';
 f.style.animationDuration = 6 + Math.random() * 10 + 's';
 f.style.animationDelay = Math.random() * 8 + 's';
 f.style.opacity = String(0.15 + Math.random() * 0.4);
 f.style.width = f.style.height = 2 + Math.random() * 4 + 'px';
 box.appendChild(f);
 }
 return box;
 }

 function crawlHtml() {
 var twice = CRAWL.concat(CRAWL).map(function (t) {
 return '<span>' + t + '</span>';
 }).join('');
 return '<div class="oca-ticker" aria-hidden="true"><div class="oca-ticker-track">' + twice + '</div></div>';
 }

 function isClimax() {
 try {
 if (window.SHHThirtyDaysChristmas && window.SHHThirtyDaysChristmas.isClimaxEve) {
 return !!window.SHHThirtyDaysChristmas.isClimaxEve();
 }
 var q = location.search || '';
 if (/[?&](climax|eve|holynight)=1/i.test(q)) return true;
 var n = new Date();
 return n.getMonth() === 11 && (n.getDate() === 23 || n.getDate() === 24);
 } catch (e) {
 return false;
 }
 }

 function isForcedDesktop() {
 try {
 return /[?&]desktop=1/i.test(location.search || '');
 } catch (eFd) {
 return false;
 }
 }

 function mobileShellUrl() {
 try {
 if (window.SHHOrphanChristmasMobile && window.SHHOrphanChristmasMobile.mobileLayoutUrl) {
 return window.SHHOrphanChristmasMobile.mobileLayoutUrl();
 }
 } catch (eUrl) { /* fall through */ }
 var path = location.pathname || 'orphan-christmas.html';
 path = path.replace(/[?&](desktop|mobile)=1/gi, '').replace(/\?&/, '?').replace(/[?&]$/, '');
 return path + (path.indexOf('?') >= 0 ? '&' : '?') + 'mobile=1';
 }

 function kickVideo(vid) {
 if (!vid) return;
 try {
 vid.muted = true;
 vid.setAttribute('playsinline', '');
 vid.setAttribute('webkit-playsinline', '');
 var p = vid.play();
 if (p && typeof p.catch === 'function') p.catch(function () {});
 } catch (ePlay) { /* ignore */ }
 }

 function build() {
 /* Dedicated mobile app-shell when it wins UX (phone / coarse pointer). Desktop keeps full scroll. */
 try {
 if (
 window.SHHOrphanChristmasMobile &&
 typeof window.SHHOrphanChristmasMobile.shouldUse === 'function' &&
 window.SHHOrphanChristmasMobile.shouldUse() &&
 typeof window.SHHOrphanChristmasMobile.render === 'function'
 ) {
 if (window.SHHOrphanChristmasMobile.render()) return;
 }
 } catch (eMob) { /* fall through to desktop arena */ }

 styles();
 document.body.classList.add('oc-arena-on');
 var forceDesktop = isForcedDesktop();
 if (forceDesktop) document.body.classList.add('oc-force-desktop');
 var climax = isClimax();
 if (climax) document.body.classList.add('oc-climax-eve');

 var root = document.getElementById('program-page-root');
 if (!root) return;

 var viewers = climax ? 2800 + Math.floor(Math.random() * 1200) : 1200 + Math.floor(Math.random() * 800);

 var forceBanner = forceDesktop
  ? '<div class="oca-force-banner" role="status">' +
    '<span>Full desktop layout on a small screen. Scroll slowly. Ops tables may need a sideways swipe.</span>' +
    '<a href="' + mobileShellUrl() + '">← Mobile layout</a>' +
    '</div>'
  : '';

 root.innerHTML =
 '<div class="oca' + (climax ? ' oca-climax' : '') + '" id="oca-root">' +
 forceBanner +
 // hero
 '<section class="oca-hero">' +
 '<div class="oca-hero-bg" aria-hidden="true"></div>' +
 '<div class="oca-hero-inner">' +
 (climax
 ? '<div class="oca-live-pill"><span class="dot"></span> Holy Night · Final mile · Preview feed</div>' +
 '<p class="oca-kicker">$hopeseed · Orphan Christmas · Dec 23-24</p>' +
 '<h1 class="oca-h1">The last quiet miles<br>before a child wakes up<br>to <em>something warm.</em></h1>' +
 '<p class="oca-lede">' +
 'Eve Eve and Christmas Eve. Final freights. Final carols. Named hearts on the wall. ' +
 '<strong>No spam. No clout harvest.</strong> Just the warehouse, the trucks, and the holy work. ' +
 '<strong>Jesus is the reason. These kids are the why.</strong>' +
 '</p>' +
 '<div class="oca-cta-row">' +
 '<a class="oca-cta oca-cta-primary" href="#tdx-stage">Live nights · stage</a>' +
 '<a class="oca-cta oca-cta-ghost" href="#tdx-freight">Final freights</a>' +
 '<a class="oca-cta oca-cta-ghost" href="#oca-broadcast">Warehouse floor</a>' +
 '</div>' +
 '<div class="oca-stats">' +
 '<div class="oca-stat"><b>HOLY</b><span>Night mode</span></div>' +
 '<div class="oca-stat"><b id="oca-viewers">' + viewers.toLocaleString() + '</b><span>In the room (sim)</span></div>' +
 '<div class="oca-stat"><b>Final</b><span>Mile freights</span></div>' +
 '<div class="oca-stat"><b>Truth</b><span>When funded</span></div>' +
 '</div>'
 : '<div class="oca-live-pill"><span class="dot"></span> Live warehouse broadcast · Preview feed</div>' +
 '<p class="oca-kicker">$hopeseed · Orphan Christmas</p>' +
 '<h1 class="oca-h1">Some kids wake up on Christmas<br>with <em>nothing but quiet.</em><br>We refuse to look away.</h1>' +
 '<p class="oca-lede">' +
 'Orphans. Foster kids. Youth shelters. Families who can prove the money ran out. ' +
 '<strong>Not a scam wish list.</strong> A warehouse floor. Live elves. Trucks. Turkey dinners. ' +
 'Gifts that land with a name behind a partner code. ' +
 '<strong>Jesus is the reason. These kids are the why.</strong>' +
 '</p>' +
 '<div class="oca-cta-row">' +
 '<a class="oca-cta oca-cta-primary" href="#oca-broadcast">Watch the floor live</a>' +
 '<a class="oca-cta oca-cta-ghost" href="#tdx-stage">Live nights · carols</a>' +
 '<a class="oca-cta oca-cta-ghost" href="#christmas-ops">Build a gift · dinner · wrap</a>' +
 '<button type="button" class="oca-cta oca-cta-ghost" id="oca-sponsor">Stand with them</button>' +
 '</div>' +
 '<div class="oca-stats">' +
 '<div class="oca-stat"><b>LIVE</b><span>Floor cams</span></div>' +
 '<div class="oca-stat"><b id="oca-viewers">' + viewers.toLocaleString() + '</b><span>Watching (sim)</span></div>' +
 '<div class="oca-stat"><b>Verified</b><span>Need only</span></div>' +
 '<div class="oca-stat"><b>When funded</b><span>Real trucks</span></div>' +
 '</div>') +
 '</div>' +
 '</section>' +

 // broadcast
 '<section class="oca-broadcast oca-ops-anchor" id="oca-broadcast">' +
 '<div class="oca-bcast-head">' +
 '<div>' +
 '<p class="oca-kicker" style="margin-bottom:.35rem">Multi-cam mercy</p>' +
 '<h2 class="oca-bcast-title">Inside the Christmas warehouse</h2>' +
 '</div>' +
 '<div class="oca-viewers">● <span id="oca-viewers-2">' + viewers.toLocaleString() + '</span> in the room · elegant holiday shift</div>' +
 '</div>' +
 '<div class="oca-stage">' +
 '<div>' +
 '<div class="oca-main-feed" id="oca-main">' +
 '<video id="oca-main-video" src="' + CAMS[0].src + '" poster="' + CAMS[0].poster + '" autoplay muted loop playsinline webkit-playsinline></video>' +
 '<div class="oca-overlay"></div>' +
 '<div class="oca-scan"></div>' +
 '<div class="oca-feed-top">' +
 '<div>' +
 '<div class="oca-cam-tag" id="oca-cam-label">' + CAMS[0].label + '</div>' +
 '<div class="oca-cam-sub" id="oca-cam-sub">' + CAMS[0].sub + '</div>' +
 '</div>' +
 '<div class="oca-rec"><i></i> REC · BROADCAST</div>' +
 '</div>' +
 '<div class="oca-feed-bot">' +
 '<div class="oca-cam-sub">Edmonton North Pole Hub · Christmas ops · $hopeseed</div>' +
 '</div>' +
 '</div>' +
 crawlHtml() +
 '<p class="oca-honest">Preview feeds until real cameras go live. Same truth rule: no fake GPS, no fake kids on stream.</p>' +
 '</div>' +
 '<div class="oca-side">' +
 '<div class="oca-thumbs" id="oca-thumbs">' +
 CAMS.map(function (c, i) {
 return (
 '<button type="button" class="oca-thumb' + (i === 0 ? ' is-live' : '') + '" data-cam="' + i + '">' +
 '<img src="' + c.poster + '" alt="" loading="lazy">' +
 '<span class="oca-thumb-label">' + c.label + '</span>' +
 '</button>'
 );
 }).join('') +
 '</div>' +
 '<div class="oca-chat" id="oca-chat" aria-live="polite"></div>' +
 '</div>' +
 '</div>' +
 '</section>' +

 // story
 '<section class="oca-story">' +
 '<h2>This is not content. This is a child\'s morning.</h2>' +
 '<p>Somewhere a kid already knows Christmas will feel empty. Foster home. Shelter bed. House where the lights went out so rent could stay on. You felt that in your chest. Good. Stay with it.</p>' +
 '<p>We built Orphan Christmas so that ache becomes action. Pack size. Location. Wrap they choose. Turkey dinner for a low-income table. Warehouse elves. Trucks. Local drops. <strong>Verified partners only.</strong></p>' +
 '<div class="oca-verse">' +
 '"Whatever you did for one of the least of these brothers and sisters of mine, you did for me."' +
 '<cite>Matthew 25:40</cite>' +
 '</div>' +
 '<div class="oca-who">' +
 '<div><b>Orphans &amp; foster youth</b><span>Through licensed agencies. Real case files.</span></div>' +
 '<div><b>Youth shelters</b><span>Teens who still deserve a holy night.</span></div>' +
 '<div><b>Proven hardship</b><span>Documented. Caseworker sign-off. No DMs.</span></div>' +
 '<div><b>Privacy first</b><span>No child used as a prop for clout.</span></div>' +
 '</div>' +
 '<p>Then walk the <strong>30 Days of Christmas</strong>. Freights. Carols. Named hearts. Build a gift. When funding is real, this stops being a preview.</p>' +
 '<div class="oca-cta-row" style="margin-top:1.5rem">' +
 '<a class="oca-cta oca-cta-primary" href="#tdx-heart">30 Days of Christmas</a>' +
 '<a class="oca-cta oca-cta-ghost" href="#christmas-ops">Enter the ops floor</a>' +
 '</div>' +
 '</section>' +

 '<div id="tdx-mount" class="oca-ops-anchor"></div>' +
 '<div id="oca-ops-slot" class="oca-ops-anchor"></div>' +
 '<div id="program-stats" style="display:none"></div>' +
 '<div class="oca-mobile-bar" aria-label="Quick jumps">' +
 '<a class="pri" href="#oca-broadcast">Live floor</a>' +
 '<a class="sec" href="#tdx-heart">30 Days</a>' +
 '<a class="sec" href="#christmas-ops">Build gift</a>' +
 '</div>' +
 '</div>';

 // snow after paint
 var isNarrow = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width:767px)').matches;
 var reduceMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if (!reduceMotion) document.body.appendChild(snow(isNarrow ? 14 : 32));

 wire(root, viewers);

 // 30 Days of Christmas campaign layer (scroll journey · freights · stage · donor hearts)
 var tdxHost = document.getElementById('tdx-mount');
 if (tdxHost && window.SHHThirtyDaysChristmas && window.SHHThirtyDaysChristmas.mount) {
 try {
 window.SHHThirtyDaysChristmas.mount(tdxHost);
 } catch (eTdx) { /* ignore */ }
 }

 // Mount logistics into slot: temporarily put #program-stats after slot so christmas ops inserts before it
 var slot = document.getElementById('oca-ops-slot');
 if (window.SHHChristmasMercyOps && window.SHHChristmasMercyOps.mount) {
 // Create a host that ops will insert before #program-stats
 try {
 window.SHHChristmasMercyOps.mount({ id: 17, title: 'Orphan Christmas', category: '$hopeseed' });
 // Move christmas-ops under arena if it landed elsewhere
 var ops = document.getElementById('christmas-ops');
 if (ops && slot) {
 slot.appendChild(ops);
 ops.classList.add('oca-ops-anchor');
 }
 } catch (e) { /* ignore */ }
 }
 }

 function wire(root, viewers) {
 var mainVid = document.getElementById('oca-main-video');
 var camLabel = document.getElementById('oca-cam-label');
 var camSub = document.getElementById('oca-cam-sub');
 var thumbs = root.querySelectorAll('#oca-thumbs .oca-thumb, .oca-thumb');

 function switchCam(i) {
 var c = CAMS[i];
 if (!c || !mainVid) return;
 if (mainVid.getAttribute('src') !== c.src) {
 mainVid.setAttribute('src', c.src);
 mainVid.setAttribute('poster', c.poster);
 mainVid.load();
 }
 kickVideo(mainVid);
 if (camLabel) camLabel.textContent = c.label;
 if (camSub) camSub.textContent = c.sub;
 thumbs.forEach(function (t, idx) {
 t.classList.toggle('is-live', idx === i);
 });
 }
 kickVideo(mainVid);
 setTimeout(function () { kickVideo(mainVid); }, 400);

 thumbs.forEach(function (t) {
 t.addEventListener('click', function () {
 switchCam(parseInt(t.getAttribute('data-cam'), 10) || 0);
 });
 });

 var sponsor = document.getElementById('oca-sponsor');
 if (sponsor) {
 sponsor.addEventListener('click', function () {
 if (typeof window.sponsorProgram === 'function') {
 window.sponsorProgram('orphan-christmas');
 } else {
 var ops = document.getElementById('christmas-ops');
 if (ops) ops.scrollIntoView({ behavior: 'smooth' });
 }
 });
 }

 // Chat crawl
 var chat = document.getElementById('oca-chat');
 var climaxChat = document.body.classList.contains('oc-climax-eve');
 var lines = climaxChat ? [
 ['@host', 'Holy Night floor. Final packs. Stay soft. Stay focused.'],
 ['@vessymink', 'Carol in the room. Every note for someone who felt forgotten.'],
 ['@elf', 'Last sibling crate sealed. Gold paper. Names private.'],
 ['@driver', 'Final mile. Quiet roads. Loud purpose.'],
 ['@northlight', 'Sponsored from the hearts of Northlight Energy Co.'],
 ['@santa_ops', 'Consent first. Cameras second. Kids always first.'],
 ['@truth', 'Preview until real. The vow is already real.'],
 ['@hopeseed', 'You are 1. We are all 1. One more morning fixed.'],
 ['@maple', 'Sponsored from the hearts of Maple Family Trust.'],
 ['@shib', 'Eve Eve. Holy Night. Pack another crate.']
 ] : [
 ['@mercy', 'Wrap line is stacked. That gold paper hits different.'],
 ['@anon', 'Dinner voucher for a family of 6. Do it.'],
 ['@host', 'Cam 01 live. Hands only. No kid faces without consent.'],
 ['@hopeseed', 'Verified list just hit the wish desk.'],
 ['@yeg', 'Truck FX-104 rolling local. Edmonton drops.'],
 ['@heart', 'This is what Christmas is supposed to feel like.'],
 ['@truth', 'Preview feed. Real cams when funded. Still watching.'],
 ['@vessymink', 'Carol night soon. Soft room. Open hearts.'],
 ['@northlight', 'Sponsored from the hearts of Northlight Energy Co.'],
 ['@shib', '30 days. Hard distribution. Pack another crate.']
 ];
 var li = 0;
 function pushChat() {
 if (!chat) return;
 var L = lines[li % lines.length];
 li++;
 var div = document.createElement('div');
 div.className = 'oca-chat-line';
 div.innerHTML = '<b>' + L[0] + '</b> ' + L[1];
 chat.appendChild(div);
 while (chat.children.length > 8) chat.removeChild(chat.firstChild);
 chat.scrollTop = chat.scrollHeight;
 }
 pushChat();
 setInterval(pushChat, 3200);

 // Viewer tick
 setInterval(function () {
 viewers += Math.floor(Math.random() * 7) - 2;
 if (viewers < 900) viewers = 900 + Math.floor(Math.random() * 50);
 var a = document.getElementById('oca-viewers');
 var b = document.getElementById('oca-viewers-2');
 if (a) a.textContent = viewers.toLocaleString();
 if (b) b.textContent = viewers.toLocaleString();
 }, 2800);

 // Auto rotate cams every 14s
 var camIdx = 0;
 setInterval(function () {
 camIdx = (camIdx + 1) % CAMS.length;
 switchCam(camIdx);
 }, 14000);
 }

 window.SHHOrphanChristmasArena = {
 render: build,
 isOrphanChristmas: function (p) {
 return p && (p.id === 17 || /orphan.?christmas/i.test(p.title || ''));
 }
 };
})();
