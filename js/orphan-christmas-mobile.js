/**
 * Orphan Christmas · dedicated mobile experience
 * App-shell with bottom tabs. Focused panels. Compact live.
 * Desktop keeps the full long-scroll arena. This only mounts when mobile UX wins.
 * Force: ?mobile=1 | Force desktop: ?desktop=1
 */
(function () {
 'use strict';

 /* Root-absolute paths so video works under /programs/ and trailing-slash URLs */
 var CAMS = [
 {
 id: 'wrap',
 label: 'CAM 01',
 sub: 'Wrap line',
 src: '/assets/videos/orphanchristmas-animated.mp4',
 poster: '/assets/images/orphanxmasphoto.jpg'
 },
 {
 id: 'load',
 label: 'CAM 02',
 sub: 'Load dock',
 src: '/assets/videos/santasworkshoplive-animated.mp4',
 poster: '/assets/images/santasworkshoplivephoto.jpg'
 },
 {
 id: 'floor',
 label: 'CAM 03',
 sub: 'Main floor',
 src: '/assets/videos/orphanchristmas-animated.mp4',
 poster: '/assets/images/orphanxmasphoto.jpg'
 },
 {
 id: 'desk',
 label: 'CAM 04',
 sub: 'Wish desk',
 src: '/assets/videos/santasworkshoplive-animated.mp4',
 poster: '/assets/images/santasworkshoplivephoto.jpg'
 }
 ];

 function wantsDesktopLayout() {
 try {
 return /[?&]desktop=1/i.test(location.search || '');
 } catch (e) {
 return false;
 }
 }

 function wantsMobileLayout() {
 try {
 return /[?&]mobile=1/i.test(location.search || '');
 } catch (e2) {
 return false;
 }
 }

 function shouldUseMobile() {
 try {
 if (wantsDesktopLayout()) return false;
 if (wantsMobileLayout()) return true;
 if (window.matchMedia && window.matchMedia('(max-width: 767px)').matches) return true;
 /* touch + narrow */
 if (window.matchMedia && window.matchMedia('(max-width: 900px) and (pointer: coarse)').matches) return true;
 } catch (e) { /* ignore */ }
 return false;
 }

 function desktopLayoutUrl() {
 var path = location.pathname || 'orphan-christmas.html';
 return path + (path.indexOf('?') >= 0 ? '&' : '?') + 'desktop=1';
 }

 function mobileLayoutUrl() {
 var path = location.pathname || 'orphan-christmas.html';
 /* strip force flags so phone gets the app shell again */
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

 function isClimax() {
 try {
 if (window.SHHThirtyDaysChristmas && window.SHHThirtyDaysChristmas.isClimaxEve) {
 return !!window.SHHThirtyDaysChristmas.isClimaxEve();
 }
 var q = location.search || '';
 if (/[?&](climax|eve|holynight)=1/i.test(q)) return true;
 var n = new Date();
 return n.getMonth() === 11 && (n.getDate() === 23 || n.getDate() === 24);
 } catch (e2) {
 return false;
 }
 }

 function styles() {
 if (document.getElementById('ocm-css')) return;
 var s = document.createElement('style');
 s.id = 'ocm-css';
 s.textContent = [
 'body.ocm-on{background:#0a0608!important;overflow-x:hidden;padding-bottom:calc(4.25rem + env(safe-area-inset-bottom))}',
 'body.ocm-on > nav{display:none!important}',
 'body.ocm-on > footer{display:none!important}',
 'body.ocm-on .oca-mobile-bar{display:none!important}',
 'body.ocm-on .tdx-rail{display:none!important}',
 '.ocm{--gold:#e8c547;--cream:#fff4e0;--crimson:#c41e3a;color:var(--cream);font-family:Inter,system-ui,sans-serif;min-height:100dvh}',
 '.ocm *{box-sizing:border-box}',
 '.ocm-top{position:sticky;top:0;z-index:60;display:flex;align-items:center;justify-content:space-between;gap:.5rem;padding:.55rem .75rem;padding-top:max(.55rem,env(safe-area-inset-top));background:rgba(10,6,8,.94);backdrop-filter:blur(14px);border-bottom:1px solid rgba(232,197,71,.28)}',
 '.ocm-brand{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:inherit;min-width:0}',
 '.ocm-brand img{width:34px;height:34px;border-radius:50%;object-fit:cover;border:1px solid rgba(232,197,71,.4)}',
 '.ocm-brand span{font-size:.68rem;font-weight:700;letter-spacing:.04em;background:linear-gradient(90deg,#fde68a,#fff,#fca5a5);-webkit-background-clip:text;background-clip:text;color:transparent;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
 '.ocm-pill{display:inline-flex;align-items:center;gap:.3rem;font-size:.52rem;letter-spacing:.1em;text-transform:uppercase;color:#fecaca;border:1px solid rgba(239,68,68,.45);background:rgba(127,29,29,.45);padding:.28rem .5rem;border-radius:999px;flex-shrink:0}',
 '.ocm-pill i{width:6px;height:6px;border-radius:50%;background:#ef4444;animation:ocm-blink 1.1s ease infinite}',
 '@keyframes ocm-blink{0%,100%{opacity:1}50%{opacity:.3}}',
 '.ocm-panels{position:relative}',
 '.ocm-panel{display:none;padding:.85rem .75rem 1.25rem;animation:ocm-in .22s ease}',
 '.ocm-panel.is-on{display:block}',
 '@keyframes ocm-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}',
 '.ocm-kicker{font-size:.58rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(232,197,71,.85);margin:0 0 .35rem}',
 '.ocm-h1{font-family:Georgia,"Times New Roman",serif;font-size:1.55rem;line-height:1.12;margin:0 0 .55rem;color:#fff;font-weight:700}',
 '.ocm-h1 em{font-style:normal;background:linear-gradient(90deg,#fde68a,#e8c547,#fca5a5);-webkit-background-clip:text;background-clip:text;color:transparent}',
 '.ocm-lede{font-size:.92rem;line-height:1.5;color:rgba(255,244,224,.88);margin:0 0 .85rem}',
 '.ocm-lede strong{color:#fde68a}',
 '.ocm-row{display:flex;flex-wrap:wrap;gap:.45rem;margin-bottom:.85rem}',
 '.ocm-btn{display:inline-flex;align-items:center;justify-content:center;padding:.7rem 1rem;border-radius:999px;font-weight:700;font-size:.82rem;text-decoration:none;border:0;cursor:pointer;font-family:inherit;min-height:44px;flex:1 1 auto}',
 '.ocm-btn-gold{color:#1a080c;background:linear-gradient(135deg,#f5e6a8,#e8c547 40%,#c41e3a)}',
 '.ocm-btn-ghost{color:#fde68a;background:rgba(0,0,0,.3);border:1px solid rgba(232,197,71,.4)}',
 '.ocm-stats{display:grid;grid-template-columns:1fr 1fr;gap:.4rem;margin-bottom:.5rem}',
 '.ocm-stat{padding:.55rem .6rem;border-radius:.75rem;border:1px solid rgba(232,197,71,.25);background:rgba(0,0,0,.35)}',
 '.ocm-stat b{display:block;font-family:Georgia,serif;font-size:.95rem;color:#fde68a}',
 '.ocm-stat span{font-size:.55rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,244,224,.5)}',
 '.ocm-verse{border-left:3px solid var(--gold);padding:.65rem .75rem;margin:.85rem 0;background:linear-gradient(90deg,rgba(196,30,58,.18),transparent);font-family:Georgia,serif;font-style:italic;color:#fde68a;font-size:.9rem;line-height:1.4}',
 '.ocm-verse cite{display:block;margin-top:.3rem;font-family:Inter,sans-serif;font-style:normal;font-size:.55rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(232,197,71,.65)}',
 '.ocm-honest{font-size:.6rem;line-height:1.4;color:rgba(255,244,224,.45);margin:.5rem 0 0}',
 /* Live panel */
 '.ocm-feed{position:relative;border-radius:.85rem;overflow:hidden;border:1px solid rgba(232,197,71,.4);background:#000;aspect-ratio:16/9;max-height:min(32vh,200px);width:100%;box-shadow:0 12px 28px -14px rgba(0,0,0,.85)}',
 '.ocm-feed video{width:100%;height:100%;object-fit:cover;display:block}',
 '.ocm-feed-top{position:absolute;top:0;left:0;right:0;padding:.4rem .5rem;display:flex;justify-content:space-between;gap:.35rem;z-index:2;pointer-events:none;background:linear-gradient(rgba(0,0,0,.55),transparent)}',
 '.ocm-feed-tag{font-size:.5rem;letter-spacing:.08em;text-transform:uppercase;color:#fde68a}',
 '.ocm-rec{font-size:.48rem;letter-spacing:.08em;color:#fecaca;background:rgba(127,29,29,.85);padding:.2rem .35rem;border-radius:3px}',
 '.ocm-thumbs{display:flex;gap:.35rem;margin-top:.45rem;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch}',
 '.ocm-thumbs::-webkit-scrollbar{display:none}',
 '.ocm-thumb{flex:0 0 auto;width:72px;height:44px;border-radius:.45rem;overflow:hidden;border:1px solid rgba(255,255,255,.12);padding:0;background:#111;cursor:pointer;position:relative}',
 '.ocm-thumb.is-live{border-color:rgba(232,197,71,.7);box-shadow:0 0 12px rgba(232,197,71,.35)}',
 '.ocm-thumb img{width:100%;height:100%;object-fit:cover;display:block;opacity:.9}',
 '.ocm-thumb span{position:absolute;left:0;right:0;bottom:0;font-size:.4rem;letter-spacing:.06em;text-transform:uppercase;color:#fde68a;padding:.15rem .2rem;background:linear-gradient(transparent,rgba(0,0,0,.9))}',
 '.ocm-chat{margin-top:.5rem;border-radius:.7rem;border:1px solid rgba(232,197,71,.25);background:rgba(20,10,12,.92);padding:.5rem .55rem;max-height:88px;min-height:64px;overflow:auto;-webkit-overflow-scrolling:touch}',
 '.ocm-chat-line{font-size:.68rem;line-height:1.3;color:rgba(255,244,224,.75);margin-bottom:.3rem}',
 '.ocm-chat-line b{color:#fde68a}',
 '.ocm-ticker{margin-top:.4rem;overflow:hidden;border-radius:.5rem;border:1px solid rgba(232,197,71,.22);background:rgba(10,6,8,.9);white-space:nowrap}',
 '.ocm-ticker-track{display:inline-block;padding:.35rem 0;animation:ocm-tick 28s linear infinite;font-size:.52rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(253,230,138,.9)}',
 '.ocm-ticker-track span{margin:0 1.1rem}',
 '@keyframes ocm-tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}',
 /* Days / track host - contain desktop modules */
 '.ocm-host{margin:0 -.15rem}',
 '.ocm-host .tdx-sec{padding:1rem .65rem!important;scroll-margin-top:3.5rem}',
 '.ocm-host .tdx-h2{font-size:1.35rem!important}',
 '.ocm-host .tdx-lede{font-size:.88rem!important}',
 '.ocm-host .tdx-path.is-compact .tdx-day:not(.is-focus){display:none}',
 '.ocm-host .tdx-countdown{max-width:100%!important}',
 '.ocm-host .tdx-impact{grid-template-columns:1fr 1fr!important}',
 '.ocm-host .tdx-featured{padding:1rem .9rem!important;margin-bottom:.75rem}',
 '.ocm-host .tdx-featured h3{font-size:1.2rem!important}',
 '.ocm-host .tdx-stage{grid-template-columns:1fr!important}',
 '.ocm-host .tdx-chat-live{min-height:100px!important;max-height:140px!important}',
 '.ocm-host .tdx-chat-live.is-climax{min-height:120px!important;max-height:160px!important}',
 '.ocm-host .tdx-cta{padding:.7rem 1rem!important;font-size:.82rem!important;min-height:44px}',
 '.ocm-host #tdx-heart .tdx-hero-band{padding:1rem .9rem!important}',
 '.ocm-host .xops{padding-top:0!important}',
 '.ocm-host .xops-wrap{padding-left:.15rem!important;padding-right:.15rem!important}',
 '.ocm-host .xops-title{font-size:1.25rem!important}',
 '.ocm-host .xops-tabs{flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}',
 '.ocm-host .xops-tabs::-webkit-scrollbar{display:none}',
 '.ocm-host .xops-tab{flex:0 0 auto;font-size:.72rem!important;padding:.5rem .7rem!important}',
 '.ocm-hide-on-mobile-panel{display:none!important}',
 /* Bottom tabs */
 '.ocm-tabs{position:fixed;left:0;right:0;bottom:0;z-index:70;display:grid;grid-template-columns:repeat(5,1fr);gap:0;padding:.35rem .25rem calc(.35rem + env(safe-area-inset-bottom));background:rgba(8,4,6,.96);backdrop-filter:blur(16px);border-top:1px solid rgba(232,197,71,.3);box-shadow:0 -12px 40px rgba(0,0,0,.55)}',
 '.ocm-tab{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.12rem;padding:.35rem .15rem;border:0;background:transparent;color:rgba(255,244,224,.45);font-family:inherit;font-size:.52rem;letter-spacing:.04em;text-transform:uppercase;font-weight:600;cursor:pointer;min-height:48px;-webkit-tap-highlight-color:transparent}',
 '.ocm-tab .ic{font-size:1.05rem;line-height:1;opacity:.75}',
 '.ocm-tab.is-on{color:#fde68a}',
 '.ocm-tab.is-on .ic{opacity:1;text-shadow:0 0 12px rgba(232,197,71,.55)}',
 'body.ocm-on.oc-climax-eve .ocm-top{border-bottom-color:rgba(253,230,138,.4)}',
 'body.ocm-on.oc-climax-eve .ocm-tabs{border-top-color:rgba(253,230,138,.4)}',
 '@media(prefers-reduced-motion:reduce){.ocm-panel,.ocm-pill i,.ocm-ticker-track{animation:none!important}}'
 ].join('\n');
 document.head.appendChild(s);
 }

 function crawlHtml() {
 var lines = [
 'LIVE · MERCY WAREHOUSE',
 '30 DAYS · HARD DISTRIBUTION',
 'VERIFIED NEED ONLY',
 'VESSYMINK · AMA · SANTA',
 'WHEN FUNDED THIS GOES REAL'
 ];
 var twice = lines.concat(lines).map(function (t) {
 return '<span>' + t + '</span>';
 }).join('');
 return '<div class="ocm-ticker" aria-hidden="true"><div class="ocm-ticker-track">' + twice + '</div></div>';
 }

 function buildShell(climax, viewers) {
 var title = climax
 ? 'The last quiet miles before a child wakes to <em>something warm.</em>'
 : 'Some kids wake up on Christmas with <em>nothing but quiet.</em>';
 var lede = climax
 ? 'Holy Night mode. Final freights. Final carols. Named hearts. No spam. <strong>Jesus is the reason. These kids are the why.</strong>'
 : 'Orphans. Foster kids. Youth shelters. Verified only. Warehouse. Trucks. Turkey dinners. <strong>Jesus is the reason. These kids are the why.</strong>';

 return (
 '<div class="ocm" id="ocm-root">' +
 '<header class="ocm-top">' +
 '<a class="ocm-brand" href="../index.html">' +
 '<img src="../assets/logos/shibahumanityhublogo3d-new.jpg" alt="" width="34" height="34">' +
 '<span>ORPHAN CHRISTMAS</span>' +
 '</a>' +
 '<div class="ocm-pill"><i></i>' + (climax ? 'Holy Night' : 'Live floor') + '</div>' +
 '</header>' +

 '<div class="ocm-panels">' +
 /* HEART */
 '<section class="ocm-panel is-on" id="ocm-panel-heart" data-panel="heart" role="tabpanel">' +
 '<p class="ocm-kicker">$hopeseed · mobile</p>' +
 '<h1 class="ocm-h1">' + title + '</h1>' +
 '<p class="ocm-lede">' + lede + '</p>' +
 '<div class="ocm-stats">' +
 '<div class="ocm-stat"><b id="ocm-viewers">' + viewers.toLocaleString() + '</b><span>Watching (sim)</span></div>' +
 '<div class="ocm-stat"><b>Verified</b><span>Need only</span></div>' +
 '<div class="ocm-stat"><b>30 Days</b><span>Hard distribution</span></div>' +
 '<div class="ocm-stat"><b>When funded</b><span>Real trucks</span></div>' +
 '</div>' +
 '<div class="ocm-verse">"Whatever you did for one of the least of these… you did for me."<cite>Matthew 25:40</cite></div>' +
 '<div class="ocm-row">' +
 '<button type="button" class="ocm-btn ocm-btn-gold" data-go="live">Open live floor</button>' +
 '<button type="button" class="ocm-btn ocm-btn-ghost" data-go="days">30 Days</button>' +
 '</div>' +
 '<div class="ocm-row">' +
 '<button type="button" class="ocm-btn ocm-btn-ghost" data-go="track">Freights · nights</button>' +
 '<button type="button" class="ocm-btn ocm-btn-ghost" data-go="give">Build a gift</button>' +
 '</div>' +
 '<p class="ocm-honest">Mobile layout built for thumbs. Desktop full scroll still lives at wider screens. Preview until rails are live.</p>' +
 '<p class="ocm-honest"><a href="' + desktopLayoutUrl() + '" id="ocm-desktop-link" style="color:rgba(253,230,138,.85);text-decoration:underline">Prefer full desktop layout →</a></p>' +
 '</section>' +

 /* LIVE */
 '<section class="ocm-panel" id="ocm-panel-live" data-panel="live" role="tabpanel">' +
 '<p class="ocm-kicker">Warehouse broadcast</p>' +
 '<h1 class="ocm-h1" style="font-size:1.25rem;margin-bottom:.5rem">Inside the floor</h1>' +
 '<div class="ocm-feed" id="ocm-main">' +
 '<video id="ocm-main-video" src="' + CAMS[0].src + '" poster="' + CAMS[0].poster + '" autoplay muted loop playsinline webkit-playsinline></video>' +
 '<div class="ocm-feed-top">' +
 '<div class="ocm-feed-tag" id="ocm-cam-label">' + CAMS[0].label + ' · ' + CAMS[0].sub + '</div>' +
 '<div class="ocm-rec">REC</div>' +
 '</div>' +
 '</div>' +
 '<div class="ocm-thumbs" id="ocm-thumbs">' +
 CAMS.map(function (c, i) {
 return (
 '<button type="button" class="ocm-thumb' + (i === 0 ? ' is-live' : '') + '" data-cam="' + i + '" aria-label="' + c.label + '">' +
 '<img src="' + c.poster + '" alt="" loading="lazy">' +
 '<span>' + c.label + '</span>' +
 '</button>'
 );
 }).join('') +
 '</div>' +
 crawlHtml() +
 '<div class="ocm-chat" id="ocm-chat" aria-live="polite"></div>' +
 '<p class="ocm-honest">Preview feeds. No fake GPS. No kid faces without consent. Real cams when funded.</p>' +
 '<div class="ocm-row" style="margin-top:.75rem">' +
 '<button type="button" class="ocm-btn ocm-btn-ghost" data-go="track">Live nights</button>' +
 '<button type="button" class="ocm-btn ocm-btn-gold" data-go="give">Sponsor route</button>' +
 '</div>' +
 '</section>' +

 /* DAYS - thirty days mount, hide freight/stage/givers via CSS filter in host */
 '<section class="ocm-panel" id="ocm-panel-days" data-panel="days" role="tabpanel">' +
 '<div class="ocm-host" id="ocm-days-host"></div>' +
 '</section>' +

 /* TRACK - freights + stage */
 '<section class="ocm-panel" id="ocm-panel-track" data-panel="track" role="tabpanel">' +
 '<div class="ocm-host" id="ocm-track-host"></div>' +
 '</section>' +

 /* GIVE - ops + sponsor */
 '<section class="ocm-panel" id="ocm-panel-give" data-panel="give" role="tabpanel">' +
 '<p class="ocm-kicker">Act with love</p>' +
 '<h1 class="ocm-h1" style="font-size:1.3rem">Build a gift. Name a freighter. Feed a table.</h1>' +
 '<p class="ocm-lede">Ops floor: pack size, wrap, dinners, trucks, local drops. Intent form for named hearts when rails open.</p>' +
 '<div class="ocm-host" id="ocm-give-host">' +
 '<div id="tdx-mount-mobile-sponsor"></div>' +
 '<div id="oca-ops-slot"></div>' +
 '<div id="program-stats" style="display:none"></div>' +
 '</div>' +
 '</section>' +
 '</div>' +

 '<nav class="ocm-tabs" role="tablist" aria-label="Orphan Christmas mobile">' +
 '<button type="button" class="ocm-tab is-on" data-tab="heart" role="tab" aria-selected="true"><span class="ic" aria-hidden="true">♥</span>Heart</button>' +
 '<button type="button" class="ocm-tab" data-tab="live" role="tab" aria-selected="false"><span class="ic" aria-hidden="true">▶</span>Live</button>' +
 '<button type="button" class="ocm-tab" data-tab="days" role="tab" aria-selected="false"><span class="ic" aria-hidden="true">30</span>Days</button>' +
 '<button type="button" class="ocm-tab" data-tab="track" role="tab" aria-selected="false"><span class="ic" aria-hidden="true">🚚</span>Track</button>' +
 '<button type="button" class="ocm-tab" data-tab="give" role="tab" aria-selected="false"><span class="ic" aria-hidden="true">🎁</span>Give</button>' +
 '</nav>' +
 '</div>'
 );
 }

 function splitThirtyDays() {
 var full = document.getElementById('tdx-root');
 if (!full) return;
 var daysHost = document.getElementById('ocm-days-host');
 var trackHost = document.getElementById('ocm-track-host');
 var giveHost = document.getElementById('tdx-mount-mobile-sponsor');
 if (!daysHost || !trackHost) return;

 /* Clone structure by moving sections into panels */
 var heart = full.querySelector('#tdx-heart');
 var climax = full.querySelector('#tdx-climax');
 var days = full.querySelector('#tdx-days');
 var freight = full.querySelector('#tdx-freight');
 var stage = full.querySelector('#tdx-stage');
 var givers = full.querySelector('#tdx-givers');
 var sponsor = full.querySelector('#tdx-sponsor');
 var rail = full.querySelector('.tdx-rail');
 var toast = full.querySelector('#tdx-toast');

 if (rail) rail.style.display = 'none';

 daysHost.innerHTML = '';
 trackHost.innerHTML = '';

 var daysWrap = document.createElement('div');
 daysWrap.className = 'tdx' + (full.classList.contains('is-climax') ? ' is-climax' : '');
 if (climax) daysWrap.appendChild(climax);
 if (heart) {
 /* Compact heart on days tab: keep countdown/impact only */
 daysWrap.appendChild(heart);
 }
 if (days) daysWrap.appendChild(days);
 daysHost.appendChild(daysWrap);

 var trackWrap = document.createElement('div');
 trackWrap.className = 'tdx' + (full.classList.contains('is-climax') ? ' is-climax' : '');
 if (freight) trackWrap.appendChild(freight);
 if (stage) trackWrap.appendChild(stage);
 if (givers) trackWrap.appendChild(givers);
 trackHost.appendChild(trackWrap);

 if (giveHost && sponsor) {
 var giveWrap = document.createElement('div');
 giveWrap.className = 'tdx' + (full.classList.contains('is-climax') ? ' is-climax' : '');
 giveWrap.appendChild(sponsor);
 if (toast) giveWrap.appendChild(toast);
 giveHost.appendChild(giveWrap);
 }

 /* Hide original mount shell if empty */
 full.style.display = 'none';
 }

 function wire(root, viewers, climax) {
 var camIdx = 0;
 var mainVid = document.getElementById('ocm-main-video');
 var camLabel = document.getElementById('ocm-cam-label');
 var thumbs = root.querySelectorAll('#ocm-thumbs .ocm-thumb');

 function switchCam(i) {
 var c = CAMS[i];
 if (!c || !mainVid) return;
 camIdx = i;
 if (mainVid.getAttribute('src') !== c.src) {
 mainVid.setAttribute('src', c.src);
 mainVid.setAttribute('poster', c.poster);
 mainVid.load();
 }
 kickVideo(mainVid);
 if (camLabel) camLabel.textContent = c.label + ' · ' + c.sub;
 thumbs.forEach(function (t, idx) {
 t.classList.toggle('is-live', idx === i);
 });
 }
 /* first paint + retry play (iOS often needs a second kick) */
 kickVideo(mainVid);
 setTimeout(function () { kickVideo(mainVid); }, 400);

 thumbs.forEach(function (t) {
 t.addEventListener('click', function () {
 switchCam(parseInt(t.getAttribute('data-cam'), 10) || 0);
 });
 });

 setInterval(function () {
 camIdx = (camIdx + 1) % CAMS.length;
 switchCam(camIdx);
 }, 12000);

 /* Chat */
 var chat = document.getElementById('ocm-chat');
 var lines = climax ? [
 ['@host', 'Holy Night floor. Stay soft. Stay focused.'],
 ['@vessymink', 'Carol in the room.'],
 ['@elf', 'Last crate sealed. Names private.'],
 ['@driver', 'Final mile.'],
 ['@hopeseed', 'You are 1. We are all 1.']
 ] : [
 ['@host', 'Cam live. Hands only.'],
 ['@elf', 'Wrap line stacked.'],
 ['@truth', 'Preview until funded.'],
 ['@hopeseed', 'Pack another bag.'],
 ['@vessymink', 'Carol night soon.']
 ];
 var li = 0;
 function pushChat() {
 if (!chat) return;
 var L = lines[li % lines.length];
 li++;
 var div = document.createElement('div');
 div.className = 'ocm-chat-line';
 div.innerHTML = '<b>' + L[0] + '</b> ' + L[1];
 chat.appendChild(div);
 while (chat.children.length > 5) chat.removeChild(chat.firstChild);
 chat.scrollTop = chat.scrollHeight;
 }
 pushChat();
 setInterval(pushChat, climax ? 2400 : 3400);

 /* Viewers */
 setInterval(function () {
 viewers += Math.floor(Math.random() * 5) - 1;
 if (viewers < 800) viewers = 800;
 var el = document.getElementById('ocm-viewers');
 if (el) el.textContent = viewers.toLocaleString();
 }, 3000);

 /* Tabs */
 function go(tab) {
 root.querySelectorAll('.ocm-panel').forEach(function (p) {
 p.classList.toggle('is-on', p.getAttribute('data-panel') === tab);
 });
 root.querySelectorAll('.ocm-tab').forEach(function (t) {
 var on = t.getAttribute('data-tab') === tab;
 t.classList.toggle('is-on', on);
 t.setAttribute('aria-selected', on ? 'true' : 'false');
 });
 try {
 if (history.replaceState) history.replaceState(null, '', '#ocm-' + tab);
 } catch (e) { /* ignore */ }
 window.scrollTo(0, 0);
 }

 root.querySelectorAll('.ocm-tab').forEach(function (t) {
 t.addEventListener('click', function () {
 go(t.getAttribute('data-tab'));
 });
 });
 root.querySelectorAll('[data-go]').forEach(function (b) {
 b.addEventListener('click', function () {
 go(b.getAttribute('data-go'));
 });
 });

 var hash = (location.hash || '').replace(/^#/, '');
 if (hash.indexOf('ocm-') === 0) {
 go(hash.replace('ocm-', ''));
 } else if (hash === 'oca-broadcast' || hash === 'christmas-ops') {
 go(hash === 'christmas-ops' ? 'give' : 'live');
 } else if (hash.indexOf('tdx-') === 0) {
 if (hash === 'tdx-freight' || hash === 'tdx-stage' || hash === 'tdx-givers') go('track');
 else if (hash === 'tdx-sponsor') go('give');
 else go('days');
 }
 }

 function mountModules() {
 /* Mount full thirty-days into a hidden staging node, then split into panels */
 var stage = document.createElement('div');
 stage.id = 'tdx-mount';
 stage.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;';
 document.body.appendChild(stage);

 if (window.SHHThirtyDaysChristmas && window.SHHThirtyDaysChristmas.mount) {
 try {
 window.SHHThirtyDaysChristmas.mount(stage);
 splitThirtyDays();
 /* staging node no longer needed */
 if (stage.parentNode) stage.parentNode.removeChild(stage);
 } catch (e) {
 if (stage.parentNode) stage.parentNode.removeChild(stage);
 }
 } else if (stage.parentNode) {
 stage.parentNode.removeChild(stage);
 }

 if (window.SHHChristmasMercyOps && window.SHHChristmasMercyOps.mount) {
 try {
 window.SHHChristmasMercyOps.mount({ id: 17, title: 'Orphan Christmas', category: '$hopeseed' });
 var ops = document.getElementById('christmas-ops');
 var slot = document.getElementById('oca-ops-slot');
 if (ops && slot) slot.appendChild(ops);
 } catch (e2) { /* ignore */ }
 }
 }

 function render() {
 styles();
 document.body.classList.add('ocm-on', 'oc-arena-on');
 var climax = isClimax();
 if (climax) document.body.classList.add('oc-climax-eve');

 var root = document.getElementById('program-page-root');
 if (!root) return false;

 var viewers = climax ? 2800 + Math.floor(Math.random() * 900) : 1100 + Math.floor(Math.random() * 700);
 root.innerHTML = buildShell(climax, viewers);
 wire(root, viewers, climax);
 mountModules();
 return true;
 }

 window.SHHOrphanChristmasMobile = {
 shouldUse: shouldUseMobile,
 desktopLayoutUrl: desktopLayoutUrl,
 mobileLayoutUrl: mobileLayoutUrl,
 wantsDesktop: wantsDesktopLayout,
 render: render
 };
})();
