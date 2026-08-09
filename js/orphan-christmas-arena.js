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
 'CHRISTMAS WAS ALWAYS ABOUT THE GIFT OF LOVE',
 'HELPING OTHER SOULS · NOT THE LOUDNESS OF THE ROOM',
 'EVERY BOX CARRIES A NAME BEHIND A PARTNER CODE',
 'ORPHANS · FOSTER KIDS · YOUTH SHELTERS · VERIFIED NEED ONLY',
 'NO SCAMMERS · NO CHILD USED AS A PROP',
 'TURKEY DINNERS · WARM CLOTHES · A MORNING THAT FEELS LIKE LOVE',
 'FREIGHTS · CAROLS · NAMED HEARTS · HARD DISTRIBUTION',
 'JESUS IS THE REASON · THESE KIDS ARE THE WHY',
 'SPONSORED FROM THE HEARTS OF THOSE WHO SAY YES',
 'WHEN FUNDED THIS FLOOR GOES REAL · UNTIL THEN THE VOW IS REAL',
 'YOU ARE 1 · WE ARE ALL 1 · ONE MORE QUIET MORNING FIXED'
 ];

 function styles() {
 if (document.getElementById('oc-arena-css')) return;
 var s = document.createElement('style');
 s.id = 'oc-arena-css';
 s.textContent = [
 /* Shell: never 100vw (scrollbar overflow). Sit centered. */
 'html,body{overflow-x:hidden;max-width:100%}',
 'body.oc-arena-on{background:#0a0608!important;overflow-x:hidden;color:#fff4e0}',
 'body.oc-arena-on > nav{border-bottom-color:rgba(232,197,71,.35)!important;background:rgba(10,6,8,.94)!important;z-index:50;backdrop-filter:blur(14px)}',
 'body.oc-arena-on > footer{border-top-color:rgba(232,197,71,.2);background:#0a0608;position:relative;z-index:2}',
 '#program-page-root{width:100%;max-width:100%;overflow-x:hidden}',
 '.oca{--wine:#6b0f1a;--crimson:#c41e3a;--gold:#e8c547;--cream:#fff4e0;--pine:#0d3d2c;--ink:#0a0608;--serif:"Playfair Display",Georgia,"Times New Roman",serif;font-family:Inter,system-ui,sans-serif;color:var(--cream);position:relative;width:100%;max-width:100%;overflow-x:hidden}',
 '.oca *{box-sizing:border-box}',
 '.oca-snow{position:fixed;inset:0;pointer-events:none;z-index:1;overflow:hidden}',
 '.oca-snow i{position:absolute;top:-10px;width:3px;height:3px;background:#fff;border-radius:50%;opacity:.3;animation:oca-fall linear infinite}',
 '@keyframes oca-fall{to{transform:translateY(110vh)}}',
 /* HERO */
 '.oca-hero{position:relative;min-height:auto;padding:5.25rem .95rem 1.75rem;display:flex;flex-direction:column;justify-content:flex-start;overflow:hidden;z-index:2}',
 '@media(min-width:768px){.oca-hero{padding:6.75rem 1.75rem 2.5rem;min-height:auto}}',
 '@media(min-width:1100px){.oca-hero{padding:7.25rem 2rem 3rem;min-height:min(92vh,860px);justify-content:center}}',
 '.oca-hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 95% 58% at 50% -8%,rgba(196,30,58,.58),transparent 56%),radial-gradient(ellipse 55% 42% at 100% 88%,rgba(13,61,44,.52),transparent 52%),radial-gradient(ellipse 42% 36% at 0% 68%,rgba(232,197,71,.16),transparent 48%),linear-gradient(180deg,#1a080c 0%,#0a0608 52%,#0a0f0c 100%)}',
 '.oca-hero-bg::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 50% 40% at 70% 40%,rgba(253,230,138,.08),transparent 60%);pointer-events:none}',
 '.oca-hero-bg::after{content:"";position:absolute;inset:0;background:url(/assets/images/orphanxmasphoto.jpg) center/cover;opacity:.14;mix-blend-mode:luminosity}',
 /* Forced desktop (?desktop=1) on a phone */
 'body.oc-force-desktop{overflow-x:hidden}',
 'body.oc-force-desktop .oca{max-width:100%}',
 'body.oc-force-desktop .oca-hero{padding-top:4.5rem;min-height:auto}',
 'body.oc-force-desktop .oca-main-feed{max-height:min(42vh,280px)}',
 'body.oc-force-desktop .oca-hero-cinema{display:none}',
 'body.oc-force-desktop .oca-mobile-bar{display:flex}',
 'body.oc-force-desktop #christmas-ops,.oca #christmas-ops{max-width:100%;overflow-x:auto}',
 'body.oc-force-desktop .xops-grid,body.oc-force-desktop .xops-row{min-width:0}',
 '.oca-force-banner{position:sticky;top:0;z-index:55;display:flex;align-items:center;justify-content:space-between;gap:.5rem;padding:.55rem .75rem;background:rgba(10,6,8,.96);border-bottom:1px solid rgba(232,197,71,.35);font-size:.72rem;color:rgba(255,244,224,.85)}',
 '.oca-force-banner a{color:#fde68a;font-weight:700;text-decoration:underline;white-space:nowrap;min-height:44px;display:inline-flex;align-items:center}',
 /* Desktop split hero: copy + cinema sit together */
 '.oca-hero-inner{position:relative;z-index:2;max-width:76rem;margin:0 auto;width:100%;display:grid;grid-template-columns:1fr;gap:1.5rem;align-items:center}',
 '@media(min-width:1024px){.oca-hero-inner{grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:2.75rem;align-items:center}}',
 '.oca-hero-copy{min-width:0;max-width:40rem}',
 '@media(min-width:1024px){.oca-hero-copy{max-width:none}}',
 '.oca-hero-cinema{display:none;min-width:0}',
 '@media(min-width:1024px){.oca-hero-cinema{display:block}}',
 '.oca-hero-stage{position:relative;border-radius:1.35rem;overflow:hidden;border:1px solid rgba(232,197,71,.42);background:#000;aspect-ratio:16/10;box-shadow:0 0 0 1px rgba(196,30,58,.22),0 28px 70px -22px rgba(0,0,0,.9),0 0 60px -16px rgba(196,30,58,.45)}',
 '.oca-hero-stage video{width:100%;height:100%;object-fit:cover;display:block}',
 '.oca-hero-stage .oca-overlay{opacity:.95}',
 '.oca-hero-glow{position:absolute;inset:-12%;border-radius:2rem;background:radial-gradient(ellipse at 50% 50%,rgba(196,30,58,.28),transparent 62%);pointer-events:none;z-index:0}',
 '.oca-hero-cinema-inner{position:relative;z-index:1}',
 '.oca-heart-seal{display:inline-flex;align-items:center;gap:.45rem;padding:.4rem .85rem;border-radius:999px;border:1px solid rgba(232,197,71,.4);background:linear-gradient(135deg,rgba(196,30,58,.25),rgba(13,61,44,.2));font-size:.58rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(253,230,138,.95);margin:0 0 .75rem}',
 '.oca-heart-seal b{font-weight:700;color:#fff}',
 '.oca-live-pill{display:inline-flex;align-items:center;gap:.45rem;padding:.45rem .8rem;border-radius:999px;border:1px solid rgba(239,68,68,.55);background:rgba(127,29,29,.55);font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;color:#fecaca;margin-bottom:.85rem;box-shadow:0 0 28px rgba(239,68,68,.35);max-width:100%}',
 '.oca-live-pill .dot{width:8px;height:8px;border-radius:50%;background:#ef4444;box-shadow:0 0 14px #ef4444;animation:oca-blink 1.1s ease infinite;flex-shrink:0}',
 '@keyframes oca-blink{0%,100%{opacity:1}50%{opacity:.25}}',
 '.oca-kicker{font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(232,197,71,.85);margin:0 0 .55rem}',
 '.oca-h1{font-family:var(--serif);font-size:clamp(1.9rem,5.2vw,3.85rem);line-height:1.06;font-weight:700;margin:0 0 .85rem;color:#fff;text-shadow:0 0 50px rgba(196,30,58,.5),0 2px 0 rgba(0,0,0,.45);word-wrap:break-word;letter-spacing:-.02em}',
 '@media(min-width:1024px){.oca-h1{font-size:clamp(2.4rem,3.6vw,3.65rem);line-height:1.05}}',
 '.oca-h1 em{font-style:normal;background:linear-gradient(100deg,#fde68a 0%,#e8c547 40%,#fca5a5 100%);-webkit-background-clip:text;background-clip:text;color:transparent}',
 '.oca-lede{font-size:clamp(.98rem,2.1vw,1.2rem);line-height:1.62;color:rgba(255,244,224,.92);max-width:36rem;margin:0 0 1.15rem;font-weight:400}',
 '.oca-lede strong{color:#fde68a;font-weight:600}',
 '.oca-soul-line{font-family:var(--serif);font-size:clamp(1.05rem,2.2vw,1.28rem);line-height:1.4;color:#fde68a;margin:0 0 1.15rem;max-width:34rem;text-shadow:0 0 36px rgba(253,230,138,.22)}',
 '.oca-cta-row{display:flex;flex-direction:column;gap:.55rem;margin-bottom:1.15rem;width:100%}',
 '@media(min-width:560px){.oca-cta-row{flex-direction:row;flex-wrap:wrap}}',
 '.oca-cta{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;padding:.95rem 1.2rem;border-radius:999px;font-weight:700;font-size:.92rem;text-decoration:none;border:0;cursor:pointer;font-family:inherit;transition:transform .15s,box-shadow .15s;width:100%;min-height:48px;touch-action:manipulation;-webkit-tap-highlight-color:transparent}',
 '@media(min-width:560px){.oca-cta{width:auto;padding:.95rem 1.45rem}}',
 '.oca-cta:hover{transform:translateY(-1px)}',
 '.oca-cta:active{transform:scale(.98)}',
 '.oca-cta-primary{color:#1a080c;background:linear-gradient(135deg,#f5e6a8 0%,#e8c547 35%,#c41e3a 100%);box-shadow:0 12px 40px -8px rgba(196,30,58,.6),0 0 0 1px rgba(253,230,138,.25)}',
 '.oca-cta-ghost{color:#fde68a;background:rgba(0,0,0,.28);border:1px solid rgba(232,197,71,.45)}',
 '.oca-stats{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;width:100%}',
 '@media(min-width:720px){.oca-stats{grid-template-columns:repeat(4,1fr);gap:.65rem}}',
 '.oca-stat{padding:.75rem .8rem;border-radius:1rem;border:1px solid rgba(232,197,71,.28);background:rgba(0,0,0,.42);backdrop-filter:blur(10px);min-width:0}',
 '.oca-stat b{display:block;font-size:1.05rem;color:#fde68a;font-family:var(--serif);letter-spacing:-.01em}',
 '.oca-stat span{font-size:.58rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,244,224,.55);line-height:1.3}',
 /* Soul band - heart of Christmas */
 '.oca-soul{position:relative;z-index:2;padding:1.75rem .95rem 1.25rem;max-width:76rem;margin:0 auto;width:100%}',
 '@media(min-width:768px){.oca-soul{padding:2.25rem 1.75rem 1.5rem}}',
 '.oca-soul-grid{display:grid;grid-template-columns:1fr;gap:.75rem}',
 '@media(min-width:900px){.oca-soul-grid{grid-template-columns:repeat(3,1fr);gap:1rem}}',
 '.oca-soul-card{position:relative;padding:1.15rem 1.15rem 1.2rem;border-radius:1.15rem;border:1px solid rgba(232,197,71,.28);background:linear-gradient(165deg,rgba(196,30,58,.18),rgba(10,6,8,.75) 45%,rgba(13,61,44,.18));overflow:hidden;min-height:100%}',
 '.oca-soul-card::before{content:"";position:absolute;left:0;top:12%;bottom:12%;width:3px;border-radius:0 3px 3px 0;background:linear-gradient(180deg,#e8c547,#c41e3a 55%,#6ee7b7)}',
 '.oca-soul-card .ic{font-size:1.35rem;margin-bottom:.45rem;display:block}',
 '.oca-soul-card h3{font-family:var(--serif);font-size:1.15rem;color:#fff;margin:0 0 .4rem;line-height:1.2}',
 '.oca-soul-card p{font-size:.88rem;line-height:1.55;color:rgba(255,244,224,.78);margin:0}',
 /* Broadcast */
 '.oca-broadcast{position:relative;z-index:2;padding:1.25rem .95rem 2rem;max-width:76rem;margin:0 auto;width:100%}',
 '@media(min-width:768px){.oca-broadcast{padding:1.75rem 1.75rem 2.75rem}}',
 '.oca-bcast-head{display:flex;flex-direction:column;align-items:flex-start;gap:.35rem;margin-bottom:.75rem}',
 '@media(min-width:640px){.oca-bcast-head{flex-direction:row;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:1rem;margin-bottom:1rem}}',
 '.oca-bcast-title{font-family:var(--serif);font-size:clamp(1.35rem,3.5vw,2.15rem);margin:0;color:#fff;line-height:1.15}',
 '.oca-viewers{font-size:.68rem;color:#fca5a5;letter-spacing:.04em}',
 '.oca-stage{display:grid;grid-template-columns:1fr;gap:.65rem}',
 '@media(min-width:1024px){.oca-stage{grid-template-columns:minmax(0,1.7fr) minmax(0,.85fr);gap:1.15rem;align-items:start}}',
 /* Cinema feed: phone compact, desktop full cinema */
 '.oca-main-feed{position:relative;border-radius:.95rem;overflow:hidden;border:1px solid rgba(232,197,71,.42);background:#000;box-shadow:0 0 0 1px rgba(196,30,58,.2),0 16px 40px -14px rgba(0,0,0,.88),0 0 40px -14px rgba(196,30,58,.42);width:100%;aspect-ratio:16/9;max-height:min(36vh,240px)}',
 '@media(min-width:480px){.oca-main-feed{max-height:min(40vh,280px);border-radius:1.1rem}}',
 '@media(min-width:768px){.oca-main-feed{max-height:none;border-radius:1.35rem;box-shadow:0 0 0 1px rgba(196,30,58,.22),0 28px 64px -18px rgba(0,0,0,.9),0 0 56px -16px rgba(196,30,58,.48)}}',
 '.oca-main-feed video{width:100%;height:100%;object-fit:cover;display:block}',
 '.oca-overlay{position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(0,0,0,.52) 0%,transparent 28%,transparent 66%,rgba(0,0,0,.72) 100%)}',
 '.oca-scan{position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,transparent 0 2px,rgba(255,255,255,.025) 2px 3px);mix-blend-mode:overlay;opacity:.4}',
 '.oca-feed-top{position:absolute;top:0;left:0;right:0;padding:.45rem .55rem;display:flex;justify-content:space-between;align-items:flex-start;gap:.4rem;z-index:3;pointer-events:none}',
 '@media(min-width:768px){.oca-feed-top{padding:1rem 1.1rem}}',
 '.oca-feed-bot{position:absolute;bottom:0;left:0;right:0;padding:.4rem .55rem;z-index:3;pointer-events:none}',
 '@media(min-width:768px){.oca-feed-bot{padding:1rem 1.1rem}}',
 '.oca-cam-tag{font-size:.52rem;letter-spacing:.1em;text-transform:uppercase;color:#fde68a;text-shadow:0 1px 4px #000}',
 '@media(min-width:768px){.oca-cam-tag{font-size:.68rem;letter-spacing:.16em}}',
 '.oca-cam-sub{font-size:.6rem;color:rgba(255,244,224,.78);margin-top:.12rem;line-height:1.3;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}',
 '@media(min-width:768px){.oca-cam-sub{font-size:.78rem;-webkit-line-clamp:2}}',
 '.oca-rec{display:inline-flex;align-items:center;gap:.25rem;font-size:.5rem;letter-spacing:.08em;color:#fecaca;background:rgba(127,29,29,.82);padding:.24rem .4rem;border-radius:4px;flex-shrink:0}',
 '@media(min-width:768px){.oca-rec{font-size:.58rem;letter-spacing:.1em;padding:.3rem .5rem}}',
 '.oca-rec i{width:5px;height:5px;border-radius:50%;background:#ef4444;animation:oca-blink 1s ease infinite}',
 '.oca-ticker{margin-top:.45rem;overflow:hidden;border-radius:.65rem;border:1px solid rgba(232,197,71,.28);background:rgba(10,6,8,.92);white-space:nowrap;max-width:100%}',
 '@media(min-width:768px){.oca-ticker{margin-top:.65rem;border-radius:.75rem}}',
 '.oca-ticker-track{display:inline-block;padding:.42rem 0;animation:oca-tick 38s linear infinite;font-size:.55rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(253,230,138,.92)}',
 '@media(min-width:768px){.oca-ticker-track{padding:.55rem 0;font-size:.64rem;letter-spacing:.1em}}',
 '.oca-ticker-track span{margin:0 1.6rem}',
 '@keyframes oca-tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}',
 '.oca-side{display:flex;flex-direction:column;gap:.5rem;min-width:0}',
 '.oca-thumbs{display:flex;gap:.4rem;overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:.1rem;scrollbar-width:none;margin:0}',
 '.oca-thumbs::-webkit-scrollbar{display:none}',
 '@media(min-width:1024px){.oca-thumbs{display:grid;grid-template-columns:1fr 1fr;gap:.55rem;overflow:visible}}',
 '.oca-thumb{position:relative;border-radius:.65rem;overflow:hidden;border:1px solid rgba(255,255,255,.12);cursor:pointer;aspect-ratio:16/9;background:#111;transition:border-color .2s,box-shadow .2s;padding:0;font:inherit;color:inherit;text-align:left;flex:0 0 28%;min-width:90px;max-width:124px;height:auto;max-height:68px;touch-action:manipulation}',
 '@media(min-width:480px){.oca-thumb{flex:0 0 30%;min-width:104px;max-width:148px;max-height:76px}}',
 '@media(min-width:1024px){.oca-thumb{flex:none;min-width:0;max-width:none;max-height:none;width:100%;border-radius:1rem;aspect-ratio:16/10}}',
 '.oca-thumb:hover,.oca-thumb.is-live{border-color:rgba(232,197,71,.65);box-shadow:0 0 28px -6px rgba(232,197,71,.5)}',
 '.oca-thumb video,.oca-thumb img{width:100%;height:100%;object-fit:cover;display:block;opacity:.9}',
 '.oca-thumb-label{position:absolute;left:0;right:0;bottom:0;padding:.28rem .35rem;background:linear-gradient(transparent,rgba(0,0,0,.92));font-size:.44rem;letter-spacing:.06em;text-transform:uppercase;color:#fde68a;line-height:1.15}',
 '@media(min-width:1024px){.oca-thumb-label{padding:.45rem .5rem;font-size:.55rem;letter-spacing:.08em}}',
 '.oca-chat{border-radius:.85rem;border:1px solid rgba(232,197,71,.28);background:rgba(20,10,12,.94);padding:.6rem .65rem;min-height:76px;max-height:110px;overflow:auto;-webkit-overflow-scrolling:touch}',
 '@media(min-width:768px){.oca-chat{min-height:120px;max-height:160px;padding:.8rem;border-radius:1rem}}',
 '@media(min-width:1024px){.oca-chat{min-height:160px;max-height:220px}}',
 '.oca-chat-line{font-size:.72rem;color:rgba(255,244,224,.78);margin-bottom:.4rem;line-height:1.35}',
 '.oca-chat-line b{color:#fde68a;font-weight:600}',
 '.oca-honest{font-size:.62rem;color:rgba(255,244,224,.48);margin-top:.5rem;text-align:center;line-height:1.4;padding:0 .2rem}',
 '@media(min-width:768px){.oca-honest{font-size:.68rem;margin-top:.75rem}}',
 /* Story / manifesto */
 '.oca-story{position:relative;z-index:2;padding:2rem .95rem 2rem;max-width:46rem;margin:0 auto;width:100%}',
 '@media(min-width:768px){.oca-story{padding:3rem 1.75rem 2.5rem;max-width:48rem}}',
 '@media(min-width:1100px){.oca-story{max-width:52rem}}',
 '.oca-story h2{font-family:var(--serif);font-size:clamp(1.55rem,4vw,2.55rem);color:#fff;margin:0 0 .9rem;line-height:1.12;letter-spacing:-.02em}',
 '.oca-story p{font-size:clamp(.98rem,2vw,1.12rem);line-height:1.7;color:rgba(255,244,224,.88);margin:0 0 1rem}',
 '.oca-story p strong{color:#fde68a}',
 '.oca-verse{border-left:3px solid var(--gold);padding:1rem 1.15rem;margin:1.4rem 0;background:linear-gradient(90deg,rgba(196,30,58,.2),transparent);font-family:var(--serif);font-style:italic;color:#fde68a;font-size:clamp(1rem,2.2vw,1.22rem);line-height:1.5;border-radius:0 .75rem .75rem 0}',
 '.oca-verse cite{display:block;margin-top:.45rem;font-family:Inter,sans-serif;font-style:normal;font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(232,197,71,.65)}',
 '.oca-who{display:grid;grid-template-columns:1fr;gap:.6rem;margin:1.4rem 0}',
 '@media(min-width:560px){.oca-who{grid-template-columns:1fr 1fr}}',
 '.oca-who div{padding:1rem;border-radius:1rem;border:1px solid rgba(196,30,58,.35);background:linear-gradient(160deg,rgba(107,15,26,.38),rgba(10,6,8,.5))}',
 '.oca-who b{display:block;color:#fecaca;font-size:.88rem;margin-bottom:.3rem;font-family:var(--serif)}',
 '.oca-who span{font-size:.8rem;color:rgba(255,244,224,.65);line-height:1.45}',
 '.oca-ops-anchor{scroll-margin-top:5rem}',
 '#christmas-ops{overflow-x:hidden;max-width:100%}',
 '.oca #christmas-ops .xops-wrap{max-width:76rem;padding-left:1rem;padding-right:1rem}',
 '@media(min-width:768px){.oca #christmas-ops .xops-wrap{padding-left:1.75rem;padding-right:1.75rem}}',
 /* sticky mobile jump */
 '.oca-mobile-bar{display:flex;gap:.4rem;position:sticky;bottom:0;z-index:40;padding:.55rem .75rem calc(.55rem + env(safe-area-inset-bottom));background:linear-gradient(180deg,transparent,rgba(10,6,8,.96) 28%);backdrop-filter:blur(12px);border-top:1px solid rgba(232,197,71,.2)}',
 '@media(min-width:768px){.oca-mobile-bar{display:none}}',
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

 var heroCopy = climax
  ? '<div class="oca-heart-seal">♥ <b>Holy Night</b> · the gift of love in the last mile</div>' +
    '<div class="oca-live-pill"><span class="dot"></span> Holy Night · Final mile · Preview feed</div>' +
    '<p class="oca-kicker">$hopeseed · Orphan Christmas · Dec 23-24</p>' +
    '<h1 class="oca-h1">The last quiet miles<br>before a child wakes up<br>to <em>something warm.</em></h1>' +
    '<p class="oca-soul-line">Christmas was never about the noise. It was always about love landing in a room that needed it.</p>' +
    '<p class="oca-lede">' +
    'Eve Eve and Christmas Eve. Final freights. Final carols. Named hearts on the wall. ' +
    '<strong>No spam. No clout harvest.</strong> Just hands, trucks, and the holy work of helping other souls. ' +
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
  : '<div class="oca-heart-seal">♥ <b>The gift of love</b> · helping other souls</div>' +
    '<div class="oca-live-pill"><span class="dot"></span> Live warehouse broadcast · Preview feed</div>' +
    '<p class="oca-kicker">$hopeseed · Orphan Christmas</p>' +
    '<h1 class="oca-h1">Some kids wake up on Christmas<br>with <em>nothing but quiet.</em><br>We refuse to look away.</h1>' +
    '<p class="oca-soul-line">Christmas is meant for this: the gift of love reaching a soul who thought nobody was coming.</p>' +
    '<p class="oca-lede">' +
    'Orphans. Foster kids. Youth shelters. Families who can prove the money ran out. ' +
    '<strong>Not a scam wish list.</strong> A warehouse floor. Warm packs. Turkey dinners. ' +
    'Gifts that land with a name behind a partner code. ' +
    '<strong>Jesus is the reason. These kids are the why.</strong>' +
    '</p>' +
    '<div class="oca-cta-row">' +
    '<a class="oca-cta oca-cta-primary" href="#oca-broadcast">Watch the floor live</a>' +
    '<a class="oca-cta oca-cta-ghost" href="#christmas-ops">Build a gift of love</a>' +
    '<a class="oca-cta oca-cta-ghost" href="#oca-soul">Why Christmas</a>' +
    '<button type="button" class="oca-cta oca-cta-ghost" id="oca-sponsor">Stand with them</button>' +
    '</div>' +
    '<div class="oca-stats">' +
    '<div class="oca-stat"><b>LOVE</b><span>The real gift</span></div>' +
    '<div class="oca-stat"><b id="oca-viewers">' + viewers.toLocaleString() + '</b><span>Watching (sim)</span></div>' +
    '<div class="oca-stat"><b>Verified</b><span>Need only</span></div>' +
    '<div class="oca-stat"><b>When funded</b><span>Real trucks</span></div>' +
    '</div>';

 root.innerHTML =
 '<div class="oca' + (climax ? ' oca-climax' : '') + '" id="oca-root">' +
 forceBanner +
 // hero - desktop split sits properly
 '<section class="oca-hero">' +
 '<div class="oca-hero-bg" aria-hidden="true"></div>' +
 '<div class="oca-hero-inner">' +
 '<div class="oca-hero-copy">' + heroCopy + '</div>' +
 '<div class="oca-hero-cinema" aria-hidden="false">' +
  '<div class="oca-hero-glow"></div>' +
  '<div class="oca-hero-cinema-inner">' +
   '<div class="oca-hero-stage">' +
    '<video id="oca-hero-video" src="' + CAMS[0].src + '" poster="' + CAMS[0].poster + '" muted loop playsinline webkit-playsinline data-keep-playing="1"></video>' +
    '<div class="oca-overlay"></div>' +
    '<div class="oca-feed-top">' +
     '<div><div class="oca-cam-tag">Orphan Christmas</div><div class="oca-cam-sub">Love in motion · mercy warehouse</div></div>' +
     '<div class="oca-rec"><i></i> LIVE PREVIEW</div>' +
    '</div>' +
    '<div class="oca-feed-bot"><div class="oca-cam-sub">The gift of love · helping other souls</div></div>' +
   '</div>' +
  '</div>' +
 '</div>' +
 '</div>' +
 '</section>' +

 // soul band
 '<section class="oca-soul" id="oca-soul">' +
 '<div class="oca-soul-grid">' +
  '<article class="oca-soul-card"><span class="ic" aria-hidden="true">🎁</span><h3>The gift of love</h3><p>Not the price tag. Not the pile under a tree. Love is a morning that does not feel empty. A table with food. A child who knows somebody chose them on purpose.</p></article>' +
  '<article class="oca-soul-card"><span class="ic" aria-hidden="true">🤝</span><h3>Helping other souls</h3><p>Christmas was always about pouring out for the ones who cannot pay you back. Orphans. Foster kids. Shelter teens. Families at the edge. We show up for them.</p></article>' +
  '<article class="oca-soul-card"><span class="ic" aria-hidden="true">🕯️</span><h3>Why the Child came</h3><p>Jesus is the reason. These kids are the why. The holy night was never a shopping season. It was light entering a dark room so nobody had to sit alone in it.</p></article>' +
 '</div>' +
 '</section>' +

 // broadcast
 '<section class="oca-broadcast oca-ops-anchor" id="oca-broadcast">' +
 '<div class="oca-bcast-head">' +
 '<div>' +
 '<p class="oca-kicker" style="margin-bottom:.35rem">Multi-cam mercy · where love becomes logistics</p>' +
 '<h2 class="oca-bcast-title">Inside the Christmas warehouse</h2>' +
 '</div>' +
 '<div class="oca-viewers">● <span id="oca-viewers-2">' + viewers.toLocaleString() + '</span> in the room · elegant holiday shift</div>' +
 '</div>' +
 '<div class="oca-stage">' +
 '<div>' +
 '<div class="oca-main-feed" id="oca-main">' +
 '<video id="oca-main-video" src="' + CAMS[0].src + '" poster="' + CAMS[0].poster + '" autoplay muted loop playsinline webkit-playsinline data-keep-playing="1"></video>' +
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
 '<p class="oca-honest">Preview feeds until real cameras go live. Same truth rule: no fake GPS, no fake kids on stream. Design first. Real trucks when funded.</p>' +
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
 '<p>Somewhere a kid already knows Christmas will feel empty. Foster home. Shelter bed. House where the lights went out so rent could stay on. You felt that in your chest. Good. Stay with it. That ache is the point of Christmas, not the noise around it.</p>' +
 '<p>We built Orphan Christmas so that ache becomes action. Pack size. Location. Wrap they choose. Turkey dinner for a low-income table. Warehouse hands. Trucks. Local drops. <strong>Verified partners only.</strong> Love with a receipt path. No theater.</p>' +
 '<div class="oca-verse">' +
 '"Whatever you did for one of the least of these brothers and sisters of mine, you did for me."' +
 '<cite>Matthew 25:40 · the heart of the season</cite>' +
 '</div>' +
 '<div class="oca-who">' +
 '<div><b>Orphans &amp; foster youth</b><span>Through licensed agencies. Real case files. Real mornings changed.</span></div>' +
 '<div><b>Youth shelters</b><span>Teens who still deserve a holy night and a reason to hope.</span></div>' +
 '<div><b>Proven hardship</b><span>Documented. Caseworker sign-off. No DMs. No scammers.</span></div>' +
 '<div><b>Privacy first</b><span>No child used as a prop for clout. Dignity over spectacle.</span></div>' +
 '</div>' +
 '<p>Then walk the <strong>30 Days of Christmas</strong>. Freights. Carols. Named hearts. Build a gift. When funding is real, this stops being a preview and becomes what Christmas was always meant to be: helping other souls with the gift of love.</p>' +
 '<div class="oca-cta-row" style="margin-top:1.5rem">' +
 '<a class="oca-cta oca-cta-primary" href="#christmas-ops">Build a gift of love</a>' +
 '<a class="oca-cta oca-cta-ghost" href="#tdx-heart">30 Days of Christmas</a>' +
 '</div>' +
 '</section>' +

 '<div id="tdx-mount" class="oca-ops-anchor"></div>' +
 '<div id="oca-ops-slot" class="oca-ops-anchor"></div>' +
 '<div id="program-stats" style="display:none"></div>' +
 '<div class="oca-mobile-bar" aria-label="Quick jumps">' +
 '<a class="pri" href="#oca-broadcast">Live floor</a>' +
 '<a class="sec" href="#oca-soul">Heart</a>' +
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
 var heroVid = document.getElementById('oca-hero-video');
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
 if (heroVid && heroVid.getAttribute('src') !== c.src) {
  /* Keep hero cinema in sync with floor cam when present */
  heroVid.setAttribute('src', c.src);
  heroVid.setAttribute('poster', c.poster);
  heroVid.load();
  kickVideo(heroVid);
 }
 if (camLabel) camLabel.textContent = c.label;
 if (camSub) camSub.textContent = c.sub;
 thumbs.forEach(function (t, idx) {
 t.classList.toggle('is-live', idx === i);
 });
 }
 kickVideo(mainVid);
 kickVideo(heroVid);
 setTimeout(function () { kickVideo(mainVid); kickVideo(heroVid); }, 400);
 setTimeout(function () { kickVideo(mainVid); kickVideo(heroVid); }, 1200);

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
 ['@heart', 'This is what Christmas is supposed to feel like. Love that shows up.'],
 ['@mercy', 'Wrap line stacked. Every box is a morning someone will not sit empty.'],
 ['@anon', 'Dinner voucher for a family of 6. A table that feels like home.'],
 ['@host', 'Cam 01 live. Hands only. No kid faces without consent.'],
 ['@hopeseed', 'Verified list just hit the wish desk. Real need. Real names behind codes.'],
 ['@yeg', 'Truck FX-104 rolling local. Edmonton drops. Love in motion.'],
 ['@truth', 'Preview feed. Real cams when funded. The vow is already real.'],
 ['@vessymink', 'Carol night soon. Soft room. Open hearts.'],
 ['@northlight', 'Sponsored from the hearts of Northlight Energy Co.'],
 ['@shib', 'Helping other souls. Gift of love. Pack another crate.']
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
