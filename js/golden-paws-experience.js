/**
 * Golden Paws · retirement forever-home experience
 * Senior service + shelter heroes → certified forever homes.
 * Certified = thorough screening + program funds listed (when funded).
 * Truth: design demos until partners and funding are real.
 * Perf: pause FX while scrolling; no heavy particle storms.
 */
(function () {
 'use strict';

 var HEROES = [
 { id: 'GP-S01', name: 'Captain', kind: 'service', age: 10, breed: 'Lab mix', city: 'Toronto, ON', note: 'Years of mobility work. Now he only wants a quiet couch and a hand that stays.', needs: 'standard', photo: '🎖️', line: 'He held people up. Someone will hold him.' },
 { id: 'GP-S02', name: 'Scout', kind: 'service', age: 9, breed: 'German Shepherd', city: 'Austin, TX', note: 'Detection partner retired. Routine walks. Calm adults. No chaos.', needs: 'standard', photo: '🛡️', line: 'His shift is over. His story is not.' },
 { id: 'GP-S03', name: 'Mercy', kind: 'service', age: 11, breed: 'Golden Retriever', city: 'Vancouver, BC', note: 'Therapy-service retiree. Soft joints. Softer heart. Quiet homes only.', needs: 'higher', photo: '💛', line: 'She spent years giving comfort. Time she received it.' },
 { id: 'GP-S04', name: 'Valor', kind: 'service', age: 8, breed: 'Belgian Malinois mix', city: 'Phoenix, AZ', note: 'High drive downshifted. Needs experienced, patient forever people.', needs: 'higher', photo: '⚔️', line: 'Power without purpose is lonely. Give him peace.' },
 { id: 'GP-H01', name: 'Maple', kind: 'shelter', age: 12, breed: 'Beagle mix', city: 'Halifax, NS', note: 'Kennel senior. Still wags for breakfast. Sofa-ready tonight.', needs: 'standard', photo: '🍁', line: 'Grey face. Bright eyes. Still waiting by the gate.' },
 { id: 'GP-H02', name: 'Pearl', kind: 'shelter', age: 11, breed: 'Poodle mix', city: 'Chicago, IL', note: 'Lost her person. Soft eyes. Needs one steady guardian forever.', needs: 'standard', photo: '🤍', line: 'Grief made her quiet. Love will make her home.' },
 { id: 'GP-H03', name: 'Bruno', kind: 'shelter', age: 13, breed: 'Boxer mix', city: 'Denver, CO', note: 'Grey muzzle, big heart. Joint meds covered by program when funded.', needs: 'higher', photo: '🤎', line: 'Almost written off. Still has years of loyalty left.' },
 { id: 'GP-H04', name: 'Daisy', kind: 'shelter', age: 10, breed: 'Shepherd mix', city: 'Seattle, WA', note: 'Quiet girl. Sun patches. Best as only dog in the house.', needs: 'standard', photo: '🌼', line: 'She does not need a crowd. She needs a someone.' },
 { id: 'GP-H05', name: 'Duke', kind: 'shelter', age: 14, breed: 'Hound mix', city: 'Nashville, TN', note: 'Passed over for puppies. Dignity intact. Love still available.', needs: 'higher', photo: '👑', line: 'The oldest ones love the deepest. Choose him.' },
 { id: 'GP-S05', name: 'Halo', kind: 'service', age: 10, breed: 'Collie mix', city: 'Calgary, AB', note: 'Medical-alert retiree. Soft structure. Calm household thrives with him.', needs: 'standard', photo: '😇', line: 'He watched over humans. Now humans watch over him.' }
 ];

 var LANES = [
 { id: 'ML-01', hero: 'Captain', stage: 'Home screen pending', note: 'Toronto · standard lane', progress: 28 },
 { id: 'ML-02', hero: 'Pearl', stage: 'Intent received (demo)', note: 'Chicago · quiet home fit', progress: 52 },
 { id: 'ML-03', hero: 'Bruno', stage: 'Higher-care review', note: 'Denver · Guardian circle design', progress: 41 },
 { id: 'ML-04', hero: 'Halo', stage: 'Vet plan draft', note: 'Calgary · service retiree', progress: 63 },
 { id: 'ML-05', hero: 'Duke', stage: 'Awaiting guardian', note: 'Nashville · priority senior', progress: 18 }
 ];

 var SCREEN = [
 { t: '01 · Identity & background', d: 'Every adult in the home. No shortcuts. Trust is the first medicine.' },
 { t: '02 · Home environment', d: 'Space, stairs, fencing, other pets, noise, safety. Truth on camera or in person.' },
 { t: '03 · Lifestyle fit', d: 'Schedule, travel, energy match, honest senior-care capacity. Not vibes. Fit.' },
 { t: '04 · Vet & care plan', d: 'Named vet path. Who handles meds and mobility. Who shows up at 2 a.m.' },
 { t: '05 · Forever commitment', d: 'Written intent. No silent rehome. Lifetime of this one soul.' },
 { t: '06 · Wellness check-ins', d: 'Photos, short video, or visits. Funding continues when the dog is truly safe.' }
 ];

 var FUNDS = [
 { circle: 'Mercy', amount: '$250 / mo', cover: 'Starter retirement home', items: 'One senior hero. Premium food, supplies, routine care buffer. Design level until rails live.' },
 { circle: 'Guardian', amount: '$350 - $450 / mo', cover: 'Full golden care', items: 'Higher needs: meds support, mobility, extra vet buffer. The hard cases that still deserve a sofa.' },
 { circle: 'Eternal', amount: '$700+ / mo', cover: 'Legacy family pod', items: 'Two heroes under one roof. Recognition tied to their stories when the system is live.' }
 ];

 var COVERED = [
 'Food and daily supplies for the life of the dog (when funded)',
 'Routine and emergency vet buffer by circle level',
 'Adoption fees waived. Zero cost forever-home model',
 'Soft goods starter kit: bed, bowls, leash on match day',
 'Program check-ins so no hero is abandoned mid-story'
 ];

 function isMobile() {
 try {
 if (/[?&]desktop=1/i.test(location.search || '')) return false;
 if (/[?&]mobile=1/i.test(location.search || '')) return true;
 return window.matchMedia && window.matchMedia('(max-width: 767px)').matches;
 } catch (e) { return false; }
 }

 function reducedMotion() {
 try {
 return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 } catch (e) { return false; }
 }

 function styles() {
 if (document.getElementById('gpx-css')) return;
 var s = document.createElement('style');
 s.id = 'gpx-css';
 s.textContent = [
 ':root{--gp-gold:#fcd34d;--gp-amber:#f59e0b;--gp-warm:#fde68a;--gp-ink:#07060a;--gp-line:rgba(252,211,77,.34);--gpx-max:min(72rem,100%)}',
 '@media(min-width:1600px){:root{--gpx-max:min(82rem,100%)}}',
 '@media(min-width:1920px){:root{--gpx-max:min(90rem,100%)}}',
 'body.gpx-panels{scroll-behavior:auto}',
 'body.gpx-panels .gpx-panel{display:none;padding-bottom:2.5rem}',
 'body.gpx-panels .gpx-panel.is-on{display:block;animation:gpx-fade .38s cubic-bezier(.22,1,.36,1)}',
 '@keyframes gpx-fade{from{opacity:0;transform:translateY(14px) scale(.99)}to{opacity:1;transform:none}}',
 '@keyframes gpx-scan{0%{top:8%;opacity:0}10%{opacity:.55}90%{opacity:.55}100%{top:78%;opacity:0}}',
 '@keyframes gpx-bar-glow{0%,100%{filter:brightness(1)}50%{filter:brightness(1.25)}}',
 '.gpx-rail{position:sticky;top:0;z-index:55;display:flex;gap:.35rem;padding:.55rem max(.65rem,env(safe-area-inset-left));overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;background:linear-gradient(180deg,rgba(7,6,10,.99),rgba(7,6,10,.94));border-bottom:1px solid var(--gp-line);justify-content:flex-start;box-shadow:0 8px 28px -12px rgba(0,0,0,.7);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}',
 '.gpx-rail::-webkit-scrollbar{display:none}',
 '@media(min-width:900px){.gpx-rail{justify-content:center;flex-wrap:wrap;padding:.5rem 1rem}}',
 '.gpx-rail button{flex:0 0 auto;font-size:.55rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(252,211,77,.5);padding:.42rem .7rem;border-radius:999px;border:1px solid transparent;background:transparent;cursor:pointer;font-family:inherit;font-weight:700;transition:all .18s;min-height:40px}',
 '@media(min-width:640px){.gpx-rail button{font-size:.58rem;padding:.45rem .85rem}}',
 '.gpx-rail button:hover{color:#fff8e7;border-color:rgba(252,211,77,.45);transform:translateY(-1px)}',
 '.gpx-rail button.is-on{color:#1a1200;border-color:transparent;background:linear-gradient(135deg,#fde68a,#fcd34d 50%,#f59e0b);box-shadow:0 0 28px -6px rgba(245,158,11,.75),0 8px 20px -10px rgba(0,0,0,.5)}',
 'body.gpx-panels:not(.gpx-mobile) header.hero-bg{padding-top:5.5rem!important;padding-bottom:1.6rem!important}',
 'body.gpx-panels:not(.gpx-mobile) .gpx-quick{display:none}',
 'body.gpx-panels:not(.gpx-mobile) .gpx-mtruth{max-width:var(--gpx-max);margin:0 auto;padding:.35rem max(1rem,env(safe-area-inset-left)) 0;font-size:.68rem;color:rgba(200,170,100,.5)}',
 /* Board */
 '.gpx-board{position:relative;max-width:var(--gpx-max);margin:0 auto;padding:1.1rem max(.75rem,env(safe-area-inset-left)) 0}',
 '@media(min-width:768px){.gpx-board{padding:1.75rem 1.5rem 0}}',
 '@media(min-width:1600px){.gpx-board{padding:2rem 1.75rem 0}}',
 '.gpx-hud{position:relative;overflow:hidden;border-radius:1.35rem;border:1px solid rgba(252,211,77,.48);background:linear-gradient(145deg,rgba(252,211,77,.16) 0%,rgba(22,16,8,.98) 38%,rgba(7,6,10,.99) 100%);box-shadow:0 40px 100px -30px rgba(0,0,0,.9),0 0 70px -14px rgba(245,158,11,.4),inset 0 1px 0 rgba(255,255,255,.14);padding:1.15rem 1rem 1.3rem}',
 '@media(min-width:768px){.gpx-hud{padding:1.75rem 1.75rem 1.8rem;border-radius:1.5rem}}',
 '.gpx-hud::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 80% 55% at 12% 0%,rgba(252,211,77,.26),transparent 55%),radial-gradient(ellipse 45% 40% at 100% 100%,rgba(245,158,11,.12),transparent 50%);pointer-events:none}',
 '.gpx-hud::after{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,244,214,.65),transparent);pointer-events:none}',
 '.gpx-hud > *{position:relative;z-index:1}',
 '.gpx-br{position:absolute;width:16px;height:16px;border-color:rgba(252,211,77,.5);border-style:solid;pointer-events:none;z-index:2}',
 '.gpx-br.tl{top:10px;left:10px;border-width:2px 0 0 2px;border-radius:3px 0 0 0}',
 '.gpx-br.tr{top:10px;right:10px;border-width:2px 2px 0 0;border-radius:0 3px 0 0}',
 '.gpx-br.bl{bottom:10px;left:10px;border-width:0 0 2px 2px;border-radius:0 0 0 3px}',
 '.gpx-br.br{bottom:10px;right:10px;border-width:0 2px 2px 0;border-radius:0 0 3px 0}',
 '.gpx-kicker{font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(252,211,77,.9);margin:0 0 .4rem;display:flex;align-items:center;gap:.45rem}',
 '.gpx-kicker .pulse{width:7px;height:7px;border-radius:50%;background:#fcd34d;box-shadow:0 0 12px #fcd34d;animation:gpx-pulse 1.4s ease infinite}',
 '@keyframes gpx-pulse{0%,100%{opacity:1}50%{opacity:.3}}',
 '.gpx-title{font-family:"Space Grotesk",sans-serif;font-weight:700;letter-spacing:-.035em;font-size:clamp(1.4rem,3.6vw,2rem);background:linear-gradient(135deg,#fff 0%,#fde68a 40%,#fcd34d 65%,#f59e0b 100%);-webkit-background-clip:text;background-clip:text;color:transparent;margin:0 0 .4rem;line-height:1.12}',
 '.gpx-lede{font-size:.92rem;line-height:1.55;color:rgba(255,244,214,.88);margin:0 0 1.05rem;max-width:44rem}',
 '.gpx-meters{display:grid;grid-template-columns:1fr 1fr;gap:.45rem;margin-bottom:1rem}',
 '@media(min-width:480px){.gpx-meters{grid-template-columns:repeat(4,1fr);gap:.5rem}}',
 '@media(min-width:1600px){.gpx-meters{grid-template-columns:repeat(6,1fr)}}',
 '.gpx-meter{padding:.85rem .6rem;border-radius:1.05rem;border:1px solid rgba(252,211,77,.28);background:linear-gradient(160deg,rgba(252,211,77,.14),rgba(0,0,0,.45));box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 10px 24px -16px rgba(0,0,0,.7);position:relative;overflow:hidden;transition:border-color .2s,transform .2s}',
 '.gpx-meter::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#f59e0b,#fcd34d,#fde68a)}',
 '.gpx-meter:hover{border-color:rgba(253,230,138,.5);transform:translateY(-2px)}',
 '.gpx-meter b{display:block;font-family:"Space Grotesk",sans-serif;font-size:clamp(1.15rem,2.6vw,1.5rem);color:#fff8e7;letter-spacing:-.02em;text-shadow:0 0 20px rgba(252,211,77,.25)}',
 '.gpx-meter span{font-size:.52rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(252,211,77,.62);font-weight:600}',
 '@media(min-width:640px){.gpx-meter span{font-size:.55rem;letter-spacing:.1em}}',
 '.gpx-hide-sm{display:none}',
 '@media(min-width:1600px){.gpx-hide-sm{display:block}}',
 '.gpx-grid2{display:grid;gap:.55rem}',
 '@media(min-width:900px){.gpx-grid2{grid-template-columns:1.15fr .85fr}}',
 '@media(min-width:1600px){.gpx-grid2{grid-template-columns:1.2fr .9fr;gap:.75rem}}',
 /* Snowball chain on board */
 '.gpx-chain{display:flex;flex-wrap:wrap;align-items:center;gap:.35rem;margin:0 0 1rem;font-size:.68rem;color:rgba(253,230,138,.75)}',
 '.gpx-chain i{color:#fcd34d;font-style:normal;opacity:.7}',
 '.gpx-chain b{color:#fff8e7;font-weight:700}',
 '@media(max-width:479px){.gpx-chain{font-size:.62rem;gap:.25rem}}',
 '.gpx-lanes{display:grid;gap:.45rem;max-height:280px;overflow:auto;-webkit-overflow-scrolling:touch}',
 '.gpx-lane{border-radius:1.05rem;border:1px solid rgba(252,211,77,.24);background:linear-gradient(155deg,rgba(252,211,77,.1),rgba(0,0,0,.45));padding:.85rem .9rem;transition:border-color .25s,box-shadow .25s,transform .2s}',
 '.gpx-lane:hover{transform:translateX(2px);border-color:rgba(252,211,77,.4)}',
 '.gpx-lane.is-hot{border-color:rgba(253,230,138,.65);box-shadow:0 0 36px -8px rgba(245,158,11,.55),inset 0 0 20px rgba(252,211,77,.06)}',
 '.gpx-lane-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:.2rem}',
 '.gpx-id{font-family:ui-monospace,monospace;font-size:.68rem;color:#fcd34d}',
 '.gpx-status{font-size:.5rem;letter-spacing:.1em;text-transform:uppercase;border:1px solid rgba(252,211,77,.4);color:#fde68a;padding:.18rem .45rem;border-radius:999px}',
 '.gpx-route{font-size:.88rem;font-weight:600;color:#fff8e7;margin:0 0 .15rem}',
 '.gpx-note{font-size:.72rem;color:rgba(253,230,138,.7);margin:0}',
 '.gpx-bar{height:5px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden;margin:.5rem 0 .1rem}',
 '.gpx-bar > i{display:block;height:100%;width:0;border-radius:999px;background:linear-gradient(90deg,#f59e0b,#fcd34d,#fde68a);transition:width .7s ease;box-shadow:0 0 12px rgba(252,211,77,.5);animation:gpx-bar-glow 2.4s ease infinite}',
 '.gpx-side{border-radius:1.2rem;border:1px solid rgba(252,211,77,.28);background:linear-gradient(165deg,rgba(252,211,77,.1),rgba(0,0,0,.45));padding:1.05rem;box-shadow:inset 0 1px 0 rgba(255,255,255,.06)}',
 '.gpx-side h3{font-family:"Space Grotesk",sans-serif;font-size:1.02rem;color:#fde68a;margin:0 0 .5rem}',
 '.gpx-chat{min-height:120px;max-height:160px;overflow:auto;font-size:.72rem;line-height:1.35;color:rgba(255,244,214,.8)}',
 '.gpx-chat .line{margin-bottom:.35rem;padding:.3rem .4rem;border-radius:.45rem;background:rgba(0,0,0,.25);border-left:2px solid rgba(252,211,77,.4)}',
 '.gpx-chat b{color:#fcd34d}',
 '.gpx-honest{font-size:.62rem;line-height:1.4;color:rgba(200,170,100,.48);margin:.65rem 0 0}',
 '.gpx-cta-row{display:flex;flex-wrap:wrap;gap:.45rem;margin-top:.85rem}',
 '.gpx-cta{display:inline-flex;align-items:center;justify-content:center;padding:.78rem 1.2rem;border-radius:999px;font-weight:700;font-size:.88rem;text-decoration:none;min-height:48px;border:0;cursor:pointer;font-family:inherit;color:#1a1200;background:linear-gradient(135deg,#fff4d6,#fde68a 40%,#fcd34d 75%,#f59e0b);box-shadow:0 0 32px -8px rgba(245,158,11,.7),0 12px 28px -12px rgba(0,0,0,.55);transition:transform .15s,box-shadow .2s}',
 '.gpx-cta:hover{transform:translateY(-1px);box-shadow:0 0 40px -6px rgba(245,158,11,.9)}',
 '.gpx-cta-ghost{color:#fde68a;border:1px solid rgba(252,211,77,.45);background:rgba(0,0,0,.35);box-shadow:none}',
 '.gpx-scan{position:absolute;left:6%;right:6%;top:10%;height:1px;background:linear-gradient(90deg,transparent,rgba(255,244,214,.55),transparent);pointer-events:none;opacity:.5;animation:gpx-scan 5.5s ease-in-out infinite}',
 '@media(prefers-reduced-motion:reduce){.gpx-scan,.gpx-bar > i,.gpx-panel.is-on{animation:none!important}}',
 /* See more */
 '.gpx-more-grid{display:grid;grid-template-columns:1fr;gap:.55rem;max-width:var(--gpx-max);margin:0 auto;padding:1rem max(.75rem,env(safe-area-inset-left)) 1.5rem}',
 '@media(min-width:480px){.gpx-more-grid{grid-template-columns:1fr 1fr}}',
 '@media(min-width:640px){.gpx-more-grid{gap:.6rem;padding:1.25rem 1.5rem}}',
 '@media(min-width:1000px){.gpx-more-grid{grid-template-columns:repeat(4,1fr)}}',
 '@media(min-width:1600px){.gpx-more-grid{grid-template-columns:repeat(4,1fr);gap:.75rem}}',
 '.gpx-more-card{text-align:left;border-radius:1.2rem;border:1px solid rgba(252,211,77,.28);background:linear-gradient(155deg,rgba(252,211,77,.1),rgba(12,10,6,.96));padding:1.1rem 1.05rem;cursor:pointer;font:inherit;color:inherit;transition:transform .2s,border-color .2s,box-shadow .2s;box-shadow:inset 0 1px 0 rgba(255,255,255,.06)}',
 '.gpx-more-card:hover{transform:translateY(-4px);border-color:rgba(253,230,138,.55);box-shadow:0 0 40px -12px rgba(245,158,11,.4)}',
 '.gpx-more-card .k{font-size:.55rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(252,211,77,.7);margin:0 0 .3rem}',
 '.gpx-more-card h3{font-family:"Space Grotesk",sans-serif;font-size:1.15rem;margin:0 0 .35rem;color:#fff8e7}',
 '.gpx-more-card p{margin:0;font-size:.82rem;line-height:1.4;color:rgba(253,230,138,.72)}',
 '.gpx-more-card .go{display:inline-flex;margin-top:.65rem;font-size:.7rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#1a1200;background:linear-gradient(135deg,#fde68a,#fcd34d);padding:.4rem .75rem;border-radius:999px}',
 /* Heroes */
 '.gpx-section{max-width:var(--gpx-max);margin:0 auto;padding:1.15rem max(.75rem,env(safe-area-inset-left)) 2rem}',
 '@media(min-width:768px){.gpx-section{padding:1.75rem 1.5rem 2.6rem}}',
 '@media(min-width:1600px){.gpx-section{padding:2rem 1.75rem 3rem}}',
 '.gpx-head h2{font-family:"Space Grotesk",sans-serif;font-size:clamp(1.3rem,3.5vw,2rem);letter-spacing:-.035em;margin:0 0 .4rem;background:linear-gradient(135deg,#fff,#fde68a 45%,#f59e0b);-webkit-background-clip:text;background-clip:text;color:transparent}',
 '.gpx-head p{margin:0;font-size:clamp(.82rem,2vw,.95rem);color:rgba(253,230,138,.75);max-width:46rem;line-height:1.5}',
 '.gpx-filters{display:flex;flex-wrap:wrap;gap:.35rem;margin:1rem 0 .9rem}',
 '.gpx-filters button{min-height:44px;padding:.45rem .8rem;border-radius:999px;border:1px solid rgba(252,211,77,.28);background:rgba(0,0,0,.35);color:#fde68a;font-size:.72rem;font-weight:700;font-family:inherit;cursor:pointer;flex:1 1 auto}',
 '@media(min-width:480px){.gpx-filters button{flex:0 0 auto;font-size:.78rem;padding:.5rem .95rem}}',
 '.gpx-filters button.is-on{background:linear-gradient(135deg,#fde68a,#fcd34d 55%,#f59e0b);color:#1a1200;border-color:transparent}',
 '.gpx-search{width:100%;max-width:28rem;margin:0 0 1rem;padding:.75rem .9rem;border-radius:1rem;border:1px solid rgba(252,211,77,.28);background:rgba(0,0,0,.42);color:#fff;font:inherit;font-size:16px}',
 '.gpx-search:focus{outline:none;border-color:rgba(252,211,77,.55)}',
 '.gpx-grid{display:grid;gap:.65rem;grid-template-columns:1fr}',
 '@media(min-width:520px){.gpx-grid{grid-template-columns:1fr 1fr;gap:.7rem}}',
 '@media(min-width:1000px){.gpx-grid{grid-template-columns:repeat(3,1fr);gap:.75rem}}',
 '@media(min-width:1600px){.gpx-grid{grid-template-columns:repeat(4,1fr);gap:.8rem}}',
 '@media(min-width:2000px){.gpx-grid{grid-template-columns:repeat(5,1fr)}}',
 '.gpx-card{text-align:left;border-radius:1.15rem;border:1px solid rgba(252,211,77,.3);background:linear-gradient(155deg,rgba(252,211,77,.12),rgba(12,10,6,.97));padding:1rem .95rem;cursor:pointer;font:inherit;color:inherit;transition:transform .2s,border-color .2s,box-shadow .2s;box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 16px 40px -24px rgba(0,0,0,.7);position:relative;overflow:hidden;-webkit-tap-highlight-color:transparent}',
 '@media(min-width:768px){.gpx-card{padding:1.15rem 1.05rem;border-radius:1.25rem}}',
 '.gpx-card::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#f59e0b,#fcd34d,#fde68a);opacity:.75}',
 '.gpx-card:hover{transform:translateY(-5px);border-color:rgba(253,230,138,.7);box-shadow:0 0 50px -8px rgba(245,158,11,.55),0 20px 40px -20px rgba(0,0,0,.7)}',
 '.gpx-card .top{display:flex;justify-content:space-between;align-items:center;gap:.4rem;margin-bottom:.35rem}',
 '.gpx-card .id{font-family:ui-monospace,monospace;font-size:.68rem;color:#fcd34d}',
 '.gpx-card .badge{font-size:.52rem;letter-spacing:.1em;text-transform:uppercase;border:1px solid rgba(252,211,77,.4);padding:.22rem .5rem;border-radius:999px;color:#fde68a}',
 '.gpx-card .badge.service{border-color:rgba(110,231,183,.45);color:#6ee7b7}',
 '.gpx-card .emoji{font-size:1.75rem;margin-bottom:.35rem;filter:drop-shadow(0 0 8px rgba(252,211,77,.25))}',
 '.gpx-card h3{font-family:"Space Grotesk",sans-serif;margin:0 0 .15rem;font-size:1.2rem;color:#fff8e7}',
 '.gpx-card .soul{font-size:.78rem;font-style:italic;color:rgba(253,230,138,.85);margin:0 0 .4rem;line-height:1.35}',
 '.gpx-card .meta{font-size:.7rem;color:rgba(253,230,138,.55);margin:0 0 .4rem}',
 '.gpx-card p{margin:0;font-size:.8rem;line-height:1.45;color:rgba(253,230,138,.78)}',
 '.gpx-card .go{display:inline-flex;margin-top:.75rem;font-size:.7rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#1a1200;background:linear-gradient(135deg,#fde68a,#fcd34d);padding:.42rem .8rem;border-radius:999px}',
 '.gpx-empty{padding:2rem;text-align:center;color:rgba(253,230,138,.5)}',
 /* Connect */
 '.gpx-connect{display:grid;gap:1rem}',
 '@media(min-width:900px){.gpx-connect{grid-template-columns:1fr 1.05fr}}',
 '.gpx-box{border-radius:1.25rem;border:1px solid rgba(252,211,77,.3);background:linear-gradient(160deg,rgba(252,211,77,.09),rgba(10,8,6,.97));padding:1.2rem 1.1rem;box-shadow:inset 0 1px 0 rgba(255,255,255,.05)}',
 '.gpx-box h3{font-family:"Space Grotesk",sans-serif;margin:0 0 .55rem;color:#fde68a;font-size:1.12rem}',
 '.gpx-box ul{margin:.4rem 0 0;padding-left:1.1rem;font-size:.84rem;line-height:1.55;color:rgba(253,230,138,.82)}',
 '.gpx-screen{display:grid;gap:.5rem}',
 '.gpx-screen .row{padding:.75rem .85rem;border-radius:.95rem;border:1px solid rgba(252,211,77,.2);background:rgba(0,0,0,.3)}',
 '.gpx-screen .row strong{display:block;color:#fff8e7;font-size:.88rem;margin-bottom:.2rem}',
 '.gpx-screen .row span{font-size:.78rem;color:rgba(253,230,138,.72);line-height:1.4}',
 '.gpx-form label{display:block;font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(252,211,77,.65);margin:0 0 .3rem}',
 '.gpx-form input,.gpx-form select,.gpx-form textarea{width:100%;margin:0 0 .75rem;padding:.72rem .9rem;border-radius:.9rem;border:1px solid rgba(252,211,77,.28);background:rgba(0,0,0,.42);color:#fff;font:inherit}',
 '.gpx-form textarea{min-height:96px;resize:vertical}',
 '.gpx-form input:focus,.gpx-form select:focus,.gpx-form textarea:focus{outline:none;border-color:rgba(252,211,77,.55)}',
 '.gpx-status{font-size:.8rem;color:#6ee7b7;margin-top:.65rem;min-height:1.2em}',
 '.gpx-pick{font-size:.86rem;color:rgba(253,230,138,.8);padding:.9rem;border-radius:1rem;border:1px solid rgba(252,211,77,.28);margin-bottom:.8rem;background:linear-gradient(160deg,rgba(252,211,77,.08),rgba(0,0,0,.25));line-height:1.45}',
 '.gpx-pick strong{color:#fcd34d}',
 '.gpx-funds{display:grid;gap:.7rem}',
 '@media(min-width:700px){.gpx-funds{grid-template-columns:repeat(3,1fr)}}',
 '.gpx-fund{border-radius:1.2rem;border:1px solid rgba(252,211,77,.28);padding:1.15rem 1rem;background:linear-gradient(160deg,rgba(252,211,77,.1),rgba(0,0,0,.38));position:relative;overflow:hidden}',
 '.gpx-fund::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#f59e0b,#fcd34d,#fde68a)}',
 '.gpx-fund h4{font-family:"Space Grotesk",sans-serif;margin:0 0 .25rem;color:#fde68a;font-size:1.05rem}',
 '.gpx-fund .amt{font-family:"Space Grotesk",sans-serif;font-size:1.25rem;font-weight:700;color:#fff;margin:.3rem 0}',
 '.gpx-fund p{margin:0;font-size:.8rem;line-height:1.45;color:rgba(253,230,138,.75)}',
 '.gpx-truth{font-size:.68rem;color:rgba(200,170,100,.5);margin-top:.8rem;line-height:1.45}',
 '.gpx-engine{position:relative;padding:1.2rem;border-radius:1.35rem;border:1px solid rgba(252,211,77,.42);background:linear-gradient(155deg,rgba(40,28,8,.92),rgba(8,6,4,.96));overflow:hidden;box-shadow:0 0 48px -18px rgba(245,158,11,.4),0 24px 50px -28px rgba(0,0,0,.9);margin-bottom:.25rem}',
 '.gpx-engine-head{display:flex;flex-wrap:wrap;justify-content:space-between;gap:.75rem;align-items:flex-end;margin-bottom:1rem}',
 '.gpx-engine-head h3{margin:0;color:#fff;font-size:1.12rem;font-family:Space Grotesk,sans-serif}',
 '.gpx-engine-head p{margin:.25rem 0 0;font-size:.8rem;color:rgba(253,230,138,.5)}',
 '.gpx-live{display:inline-flex;align-items:center;gap:.4rem;font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;color:#fde68a;font-weight:700;padding:.35rem .7rem;border-radius:999px;border:1px solid rgba(252,211,77,.4);background:rgba(0,0,0,.35)}',
 '.gpx-live i{width:7px;height:7px;border-radius:50%;background:#fcd34d;box-shadow:0 0 10px #fcd34d;animation:gpx-pulse 1.5s ease infinite}',
 '.gpx-fields{display:grid;gap:.8rem}',
 '@media(min-width:700px){.gpx-fields{grid-template-columns:1fr 1fr 1fr}}',
 '.gpx-field label{display:block;font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:#fcd34d;font-weight:700;margin-bottom:.3rem}',
 '.gpx-field input{width:100%;padding:.8rem .95rem;border-radius:.9rem;border:1px solid rgba(255,255,255,.12);background:rgba(0,0,0,.5);color:#fff;font-size:1.1rem;font-weight:700;font-family:Space Grotesk,Inter,sans-serif;outline:none}',
 '.gpx-field input:focus{border-color:rgba(252,211,77,.65);box-shadow:0 0 0 3px rgba(252,211,77,.12)}',
 '.gpx-field .hint{font-size:.65rem;color:rgba(253,230,138,.4);margin-top:.28rem}',
 '.gpx-out{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-top:1rem}',
 '@media(min-width:700px){.gpx-out{grid-template-columns:repeat(4,1fr)}}',
 '.gpx-out div{padding:.8rem .6rem;border-radius:1rem;background:rgba(0,0,0,.45);border:1px solid rgba(252,211,77,.22);text-align:center}',
 '.gpx-out b{display:block;font-size:clamp(1.15rem,2.6vw,1.5rem);color:#fde68a;font-family:Space Grotesk,sans-serif}',
 '.gpx-out span{font-size:.56rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(253,230,138,.48);font-weight:600}',
 '.gpx-out .hero{border-color:rgba(252,211,77,.55);background:linear-gradient(160deg,rgba(40,28,8,.7),rgba(0,0,0,.5));box-shadow:0 0 28px -10px rgba(245,158,11,.45)}.gpx-out .hero b{color:#fff;text-shadow:0 0 18px rgba(252,211,77,.35)}',
 '.gpx-band{margin-top:.85rem;font-size:.92rem;color:#fde68a;font-weight:600;line-height:1.55}',
 '.gpx-out b.gpx-pop{animation:gpx-pop .4s ease}',
 '@keyframes gpx-pop{0%{transform:scale(1)}40%{transform:scale(1.08);color:#fff}100%{transform:scale(1)}}',
 '.gpx-link-grid{display:grid;gap:.6rem}',
 '@media(min-width:640px){.gpx-link-grid{grid-template-columns:1fr 1fr}}',
 '.gpx-link-card{border-radius:1.15rem;border:1px solid rgba(252,211,77,.28);padding:1.1rem;background:linear-gradient(155deg,rgba(252,211,77,.08),rgba(10,8,6,.96));text-decoration:none;color:inherit;display:block;transition:border-color .2s,transform .2s}',
 '.gpx-link-card:hover{border-color:rgba(253,230,138,.55);transform:translateY(-2px)}',
 '.gpx-link-card h3{font-family:"Space Grotesk",sans-serif;margin:0 0 .35rem;color:#fde68a;font-size:1.05rem}',
 '.gpx-link-card p{margin:0;font-size:.8rem;color:rgba(253,230,138,.72);line-height:1.4}',
 /* Mobile shell */
 'body.gpx-mobile{padding-bottom:calc(4.8rem + env(safe-area-inset-bottom));overflow-x:hidden}',
 'body.gpx-mobile .gpx-rail,body.gpx-mobile > nav,body.gpx-mobile #mobile-menu,body.gpx-mobile .fixed.bottom-3{display:none!important}',
 'body.gpx-mobile > footer{padding:1.25rem 1rem calc(5.5rem + env(safe-area-inset-bottom))!important;font-size:11px!important}',
 '.gpx-mtop{display:none;position:sticky;top:0;z-index:70;align-items:center;justify-content:space-between;padding:.5rem .7rem;padding-top:max(.45rem,env(safe-area-inset-top));background:rgba(7,6,10,.98);border-bottom:1px solid var(--gp-line)}',
 'body.gpx-mobile .gpx-mtop{display:flex}',
 '.gpx-mtop a{display:flex;align-items:center;gap:.4rem;text-decoration:none;color:inherit;min-width:0}',
 '.gpx-mtop img{width:30px;height:30px;border-radius:50%;object-fit:cover;border:1px solid rgba(252,211,77,.45);flex-shrink:0}',
 '.gpx-mtop span{font-size:.62rem;font-weight:700;letter-spacing:.05em;color:#fde68a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
 '.gpx-mtabs{display:none;position:fixed;left:0;right:0;bottom:0;z-index:75;grid-template-columns:repeat(4,1fr);padding:.28rem .1rem calc(.28rem + env(safe-area-inset-bottom));background:rgba(6,5,4,.98);border-top:1px solid var(--gp-line);box-shadow:0 -12px 32px rgba(0,0,0,.45)}',
 'body.gpx-mobile .gpx-mtabs{display:grid}',
 '.gpx-mtab{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.1rem;border:0;background:transparent;color:rgba(252,211,77,.4);font-size:.46rem;letter-spacing:.03em;text-transform:uppercase;font-weight:700;font-family:inherit;min-height:52px;cursor:pointer;-webkit-tap-highlight-color:transparent}',
 '.gpx-mtab .ic{font-size:1.08rem}',
 '.gpx-mtab.is-on{color:#fde68a;background:linear-gradient(180deg,rgba(252,211,77,.14),transparent)}',
 'body.gpx-mobile header.hero-bg{padding:3.35rem .65rem .75rem!important}',
 'body.gpx-mobile header.hero-bg .gpx-hide-m{display:none!important}',
 'body.gpx-mobile .gp-mega{font-size:clamp(2.1rem,11vw,2.5rem)!important}',
 'body.gpx-mobile .gp-sub{font-size:1.05rem!important}',
 'body.gpx-mobile .gp-media{margin-top:.65rem!important}',
 'body.gpx-mobile .gpx-mlede{font-size:.86rem;line-height:1.45;color:rgba(255,244,214,.9);margin:.4rem 0 .55rem;padding:0 .15rem;text-align:center}',
 'body.gpx-mobile .gpx-mlede strong{color:#fcd34d}',
 /* Mobile flywheel compact strip */
 'body.gpx-mobile .gpx-mchain{display:flex;flex-wrap:wrap;justify-content:center;gap:.3rem;padding:.35rem .5rem .75rem;font-size:.58rem;letter-spacing:.04em;color:rgba(253,230,138,.7)}',
 'body.gpx-mobile .gpx-mchain b{color:#fde68a}',
 'body.gpx-mobile .gpx-mchain i{opacity:.5;font-style:normal}',
 '.gpx-quick{display:flex;flex-wrap:wrap;gap:.35rem;padding:.65rem max(.65rem,env(safe-area-inset-left)) 0;max-width:var(--gpx-max);margin:0 auto}',
 '.gpx-quick button{flex:1 1 42%;min-height:46px;border-radius:999px;border:1px solid rgba(252,211,77,.35);background:rgba(0,0,0,.35);color:#fde68a;font-size:.72rem;font-weight:700;font-family:inherit;cursor:pointer}',
 '.gpx-quick button.pri{background:linear-gradient(135deg,#fde68a,#fcd34d);color:#1a1200;border:0}',
 '.gpx-progress{position:fixed;top:0;left:0;height:3px;width:0;z-index:80;background:linear-gradient(90deg,#f59e0b,#fcd34d,#fde68a,#fff);transform:translateZ(0);box-shadow:0 0 12px rgba(252,211,77,.65)}',
 /* Slim connect form */
 '@media(max-width:479px){.gpx-connect{gap:.75rem}.gpx-box{padding:1rem .85rem}.gpx-cta{width:100%}}',
 /* Landscape mobile */
 '@media(max-height:420px) and (orientation:landscape){body.gpx-mobile header.hero-bg .gp-media{display:none!important}}',
 '@media(prefers-reduced-motion:reduce){.gpx-kicker .pulse,.gpx-chat .line{animation:none!important}}'
 ].join('');
 document.head.appendChild(s);
 }

 var state = { filter: 'all', query: '', selected: null };

 function goTab(id) {
 if (!id) return;
 if (id === 'funding' && isMobile()) id = 'more';
 document.querySelectorAll('.gpx-panel').forEach(function (p) {
 p.classList.toggle('is-on', p.getAttribute('data-gpx-panel') === id);
 });
 document.querySelectorAll('.gpx-mtab, #gpx-rail [data-gpx-go]').forEach(function (t) {
 var key = t.getAttribute('data-tab') || t.getAttribute('data-gpx-go');
 var on = key === id || (id === 'funding' && key === 'more' && isMobile());
 t.classList.toggle('is-on', on);
 if (t.getAttribute('role') === 'tab') t.setAttribute('aria-selected', on ? 'true' : 'false');
 });
 try {
 if (history.replaceState) history.replaceState(null, '', '#gpx-' + id);
 } catch (e) { /* ignore */ }
 window.scrollTo(0, 0);
 setTimeout(function () { wireCareEngine(); }, 40);
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

 function boardHtml() {
 var meters =
 '<div class="gpx-meters">' +
 '<div class="gpx-meter"><b>' + HEROES.length + '</b><span>Heroes ready</span></div>' +
 '<div class="gpx-meter"><b>2</b><span>Service + shelter</span></div>' +
 '<div class="gpx-meter"><b>6</b><span>Hard screen gates</span></div>' +
 '<div class="gpx-meter"><b>5</b><span>Flywheel stages</span></div>' +
 '<div class="gpx-meter gpx-hide-sm"><b>Live</b><span>Care engine</span></div>' +
 '<div class="gpx-meter"><b>0</b><span>Live matches yet</span></div>' +
 '</div>';
 var lanes = LANES.map(function (v) {
 return (
 '<div class="gpx-lane" data-lane="' + v.id + '">' +
 '<div class="gpx-lane-top"><span class="gpx-id">' + v.id + '</span><span class="gpx-status">' + v.stage + '</span></div>' +
 '<p class="gpx-route">' + v.hero + '</p>' +
 '<p class="gpx-note">' + v.note + '</p>' +
 '<div class="gpx-bar"><i style="width:' + v.progress + '%"></i></div>' +
 '</div>'
 );
 }).join('');
 return (
 '<div class="gpx-board" id="gpx-board">' +
 '<div class="gpx-hud">' +
 '<span class="gpx-br tl"></span><span class="gpx-br tr"></span><span class="gpx-br bl"></span><span class="gpx-br br"></span>' +
 '<div class="gpx-scan" aria-hidden="true"></div>' +
 '<p class="gpx-kicker"><span class="pulse"></span> Live board · design mode</p>' +
 '<h2 class="gpx-title">They earned the sofa. We build the path.</h2>' +
 '<p class="gpx-lede">This is the ops surface: find heroes, run hard screening, place forever homes, fund care, check in, next dog. When partners and funding go live, this is the process people run. Until then: honest design. No fake wins.</p>' +
 '<p class="gpx-chain" aria-hidden="true"><b>Find</b><i>→</i><b>Screen</b><i>→</i><b>Place</b><i>→</i><b>Fund</b><i>→</i><b>Check-in</b><i>→</i><b>Next dog</b></p>' +
 meters +
 '<div class="gpx-grid2">' +
 '<div class="gpx-lanes" id="gpx-lanes">' + lanes + '</div>' +
 '<div class="gpx-side">' +
 '<h3>★ Desk</h3>' +
 '<div class="gpx-chat" id="gpx-chat" aria-live="polite"></div>' +
 '<div class="gpx-cta-row">' +
 '<button type="button" class="gpx-cta" data-gpx-go="heroes">Meet the heroes</button>' +
 '<button type="button" class="gpx-cta gpx-cta-ghost" data-gpx-go="connect">Open the gate</button>' +
 '</div>' +
 '<p class="gpx-honest">Demo lanes. No live match list yet. Click a section. One dog at a time.</p>' +
 '</div>' +
 '</div>' +
 '</div>' +
 '</div>'
 );
 }

 function seeMoreHtml() {
 var cards = [
 { go: 'heroes', k: '01 Who', title: 'The heroes', p: 'Service retirees and shelter seniors. Grey muzzles. Full hearts. Still waiting.', cta: 'Meet them' },
 { go: 'connect', k: '02 Gate', title: 'Certified forever home', p: 'Six hard screens. Written forever. Care funded when the flywheel turns.', cta: 'Open gate' },
 { go: 'funding', k: '03 Fuel', title: 'What care costs', p: '$250 · $350-450 · $700+. Holders fuel. Families love. Dogs rest.', cta: 'See fuel' },
 { go: 'more', k: '04 Map', title: 'How it multiplies', p: 'One home proves the next. Distinct from Golden Years. Proof over promises.', cta: 'See map' }
 ];
 return (
 '<div class="gpx-more-grid">' +
 cards.map(function (c) {
 return (
 '<button type="button" class="gpx-more-card" data-gpx-go="' + c.go + '">' +
 '<p class="k">' + c.k + '</p><h3>' + c.title + '</h3><p>' + c.p + '</p><span class="go">' + c.cta + ' →</span>' +
 '</button>'
 );
 }).join('') +
 '</div>'
 );
 }

 function filtered() {
 var q = (state.query || '').toLowerCase().trim();
 return HEROES.filter(function (h) {
 if (state.filter === 'service' && h.kind !== 'service') return false;
 if (state.filter === 'shelter' && h.kind !== 'shelter') return false;
 if (!q) return true;
 return (h.name + ' ' + h.breed + ' ' + h.city + ' ' + h.note + ' ' + h.line + ' ' + h.id).toLowerCase().indexOf(q) !== -1;
 });
 }

 function renderGrid() {
 var host = document.getElementById('gpx-grid');
 if (!host) return;
 var list = filtered();
 if (!list.length) {
 host.innerHTML = '<div class="gpx-empty">No heroes match that filter. Clear search or switch track.</div>';
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
 '<p class="soul">"' + h.line + '"</p>' +
 '<p class="meta">' + h.age + ' yrs · ' + h.breed + ' · ' + h.city + needs + '</p>' +
 '<p>' + h.note + '</p>' +
 '<span class="go">Open forever-home gate →</span>' +
 '</button>'
 );
 }).join('');
 host.querySelectorAll('[data-hero]').forEach(function (btn) {
 btn.addEventListener('click', function () { selectHero(btn.getAttribute('data-hero')); });
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
 sel.innerHTML = '<option value="">Select a hero...</option>' +
 HEROES.map(function (h) {
 return '<option value="' + h.id + '"' + (state.selected && state.selected.id === h.id ? ' selected' : '') + '>' +
 h.name + ' · ' + (h.kind === 'service' ? 'Service' : 'Shelter') + ' · ' + h.city +
 '</option>';
 }).join('');
 }
 if (!el) return;
 if (!state.selected) {
 el.innerHTML = 'No hero selected yet. Open the <button type="button" class="gpx-cta gpx-cta-ghost" data-gpx-go="heroes" style="margin-left:.35rem;min-height:36px;padding:.35rem .7rem">heroes roster</button> or choose below. This is the gate. Take it seriously.';
 bindGo(el);
 return;
 }
 var h = state.selected;
 var fund = h.needs === 'higher' ? FUNDS[1] : FUNDS[0];
 el.innerHTML =
 '<strong>' + h.name + '</strong> (' + h.id + ') · ' +
 (h.kind === 'service' ? 'retired service' : 'senior shelter') +
 '<br><em>"' + h.line + '"</em><br>' +
 'Design funding lane when live: <strong>' + fund.amount + '</strong> · ' + fund.cover;
 }

 function heroesPanelHtml() {
 return (
 '<div class="gpx-section">' +
 '<div class="gpx-head">' +
 '<h2>Heroes still waiting</h2>' +
 '<p>Retired service dogs. Senior shelter dogs. Click a card. Open the forever-home gate. Design roster now. Real faces with partner consent when funded.</p>' +
 '</div>' +
 '<div class="gpx-filters" id="gpx-filters">' +
 '<button type="button" class="is-on" data-filter="all">All heroes</button>' +
 '<button type="button" data-filter="service">Service retirees</button>' +
 '<button type="button" data-filter="shelter">Senior shelter</button>' +
 '</div>' +
 '<input class="gpx-search" id="gpx-search" type="search" placeholder="Search name, city, story..." autocomplete="off">' +
 '<div class="gpx-grid" id="gpx-grid"></div>' +
 '<p class="gpx-truth">Demo profiles. Click any card to open the certified forever-home gate. No live adoption ledger yet.</p>' +
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
 '<h2>The gate · certified forever home</h2>' +
 '<p><strong>Certified</strong> is not marketing. Six hard screens. Written forever. Program-funded care when the flywheel is live. You bring the love. The program covers listed costs. Same gate when partners land. That is the deal.</p>' +
 '</div>' +
 '<div class="gpx-connect">' +
 '<div class="gpx-box">' +
 '<h3>Screening · hard on purpose</h3>' +
 '<div class="gpx-screen">' + screen + '</div>' +
 '<p class="gpx-truth">Model checklist. Live verification partners replace demos when agreements exist.</p>' +
 '</div>' +
 '<div class="gpx-box">' +
 '<h3>What the program funds</h3>' +
 '<ul>' + covered + '</ul>' +
 '<p class="gpx-truth" style="margin-top:.7rem">Mercy / Guardian / Eternal circles on the program card. Nothing listed is billed to the family when funding and delivery are live.</p>' +
 '<h3 style="margin-top:1.15rem">Forever-home intent</h3>' +
 '<div class="gpx-pick" id="gpx-pick"></div>' +
 '<form class="gpx-form" id="gpx-form">' +
 '<label for="gpx-form-dog">Hero</label>' +
 '<select id="gpx-form-dog" required></select>' +
 '<label for="gpx-name">Your name</label>' +
 '<input id="gpx-name" required autocomplete="name" placeholder="Full name">' +
 '<label for="gpx-email">Email</label>' +
 '<input id="gpx-email" type="email" required autocomplete="email" placeholder="you@email.com">' +
 '<label for="gpx-city">City / region</label>' +
 '<input id="gpx-city" required placeholder="City, province or state">' +
 '<label for="gpx-home">Home type</label>' +
 '<select id="gpx-home" required>' +
 '<option value="">Select...</option>' +
 '<option>House with yard</option>' +
 '<option>Quiet apartment / condo</option>' +
 '<option>Rural property</option>' +
 '<option>Other (tell us below)</option>' +
 '</select>' +
 '<label for="gpx-why">Why this hero · your forever vow</label>' +
 '<textarea id="gpx-why" required placeholder="Experience with seniors, schedule, other pets, why you will keep them for life..."></textarea>' +
 '<label style="display:flex;align-items:flex-start;gap:.5rem;text-transform:none;letter-spacing:0;font-size:.8rem;color:rgba(253,230,138,.82);margin-bottom:.9rem">' +
 '<input type="checkbox" id="gpx-cert" required style="width:auto;margin:.15rem 0 0">' +
 '<span>I understand screening is non-negotiable, and program funds (when live) cover listed care - not a free pet without accountability.</span>' +
 '</label>' +
 '<button type="submit" class="gpx-cta" id="gpx-submit">Submit forever-home intent</button>' +
 '<div class="gpx-status" id="gpx-status" role="status"></div>' +
 '<p class="gpx-truth">Design intent only. Stored on this device. No match is confirmed until screening partners and funding are live.</p>' +
 '</form>' +
 '</div>' +
 '</div>' +
 '</div>'
 );
 }

 function calcCare(heroes, monthly, months) {
  heroes = Math.max(1, Math.min(50, parseInt(heroes, 10) || 1));
  monthly = Math.max(100, Math.min(5000, parseFloat(monthly) || 350));
  months = Math.max(1, Math.min(60, parseInt(months, 10) || 12));
  return {
   heroes: heroes,
   monthly: monthly,
   months: months,
   total: Math.round(heroes * monthly * months),
   perHero: Math.round(monthly * months)
  };
 }

 function fundingPanelHtml() {
 return (
 '<div class="gpx-section">' +
 '<div class="gpx-head">' +
 '<h2>What care costs (and how it multiplies)</h2>' +
 '<p>Holders fund care. Families pass the gate. One funded home becomes proof. Proof draws the next home. That is the flywheel.</p>' +
 '</div>' +
 '<div class="gpx-engine" id="gpx-engine">' +
 '<div class="gpx-engine-head"><div><h3>Care engine</h3><p>Type heroes, monthly design, months. Totals update live.</p></div><div class="gpx-live"><i></i> Live</div></div>' +
 '<div class="gpx-fields">' +
 '<div class="gpx-field"><label for="gpx-h">Heroes placed</label><input id="gpx-h" type="number" inputmode="numeric" min="1" max="50" step="1" value="1" autocomplete="off"><div class="hint">How many sofas</div></div>' +
 '<div class="gpx-field"><label for="gpx-m">USD / hero / month</label><input id="gpx-m" type="number" inputmode="decimal" min="100" max="5000" step="25" value="350" autocomplete="off"><div class="hint">Mercy ~250 · Guardian ~350-450</div></div>' +
 '<div class="gpx-field"><label for="gpx-mo">Months of care</label><input id="gpx-mo" type="number" inputmode="numeric" min="1" max="60" step="1" value="12" autocomplete="off"><div class="hint">1 to 60</div></div>' +
 '</div>' +
 '<div class="gpx-out">' +
 '<div class="hero"><b id="gpx-o-total">$4,200</b><span>Total care design</span></div>' +
 '<div><b id="gpx-o-per">$4,200</b><span>Per hero path</span></div>' +
 '<div><b id="gpx-o-h">1</b><span>Heroes</span></div>' +
 '<div><b id="gpx-o-mo">12</b><span>Months</span></div>' +
 '</div>' +
 '<p class="gpx-band" id="gpx-o-band">1 hero · $350/mo · 12 months. Design only until rails live.</p>' +
 '</div>' +
 '<div class="gpx-funds" style="margin-top:1.15rem">' +
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

 function readNum(el, fb) {
  if (!el) return fb;
  var raw = String(el.value || '').trim().replace(/,/g, '');
  if (raw === '' || raw === '-' || raw === '.') return fb;
  var n = parseFloat(raw);
  return isFinite(n) ? n : fb;
 }

 function wireCareEngine() {
  var h = document.getElementById('gpx-h');
  var m = document.getElementById('gpx-m');
  var mo = document.getElementById('gpx-mo');
  if (!h || !m || !mo) return;
  function run() {
   var r = calcCare(readNum(h, 1), readNum(m, 350), readNum(mo, 12));
   var t = document.getElementById('gpx-o-total');
   var p = document.getElementById('gpx-o-per');
   var hh = document.getElementById('gpx-o-h');
   var mm = document.getElementById('gpx-o-mo');
   var band = document.getElementById('gpx-o-band');
   function setPop(el, text) {
    if (!el) return;
    el.textContent = text;
    el.classList.remove('gpx-pop');
    void el.offsetWidth;
    el.classList.add('gpx-pop');
   }
   setPop(t, '$' + r.total.toLocaleString());
   setPop(p, '$' + r.perHero.toLocaleString());
   setPop(hh, String(r.heroes));
   setPop(mm, String(r.months));
   if (band) {
    band.textContent =
     r.heroes +
     ' hero' +
     (r.heroes === 1 ? '' : 'es') +
     ' · $' +
     r.monthly.toLocaleString() +
     '/mo · ' +
     r.months +
     ' months = $' +
     r.total.toLocaleString() +
     ' design care. Family brings love. Program covers listed costs when funded.';
   }
  }
  if (h.getAttribute('data-gpx-eng') !== '1') {
   [h, m, mo].forEach(function (inp) {
    inp.setAttribute('data-gpx-eng', '1');
    ['input', 'change', 'keyup', 'paste', 'blur'].forEach(function (ev) {
     inp.addEventListener(ev, function () {
      if (ev === 'paste') setTimeout(run, 0);
      else run();
     });
    });
   });
  }
  run();
 }

 function morePanelHtml() {
 return (
 '<div class="gpx-section">' +
 '<div class="gpx-head"><h2>How it multiplies, and the truth</h2><p>One dog home. Proof. More homes. More fuel. The next grey face at the gate. That is the flywheel. Two gold brands. Different jobs. Both mercy.</p></div>' +
 '<div class="gpx-box" style="margin-bottom:1rem">' +
 '<h3>How mercy multiplies</h3>' +
 '<ul>' +
 '<li><strong>Dog 1:</strong> screened home and funded care become living proof</li>' +
 '<li><strong>Proof</strong> draws the next guardian and the next holder</li>' +
 '<li><strong>Dog 2 and beyond:</strong> same gate, same dignity, no shortcuts</li>' +
 '<li><strong>Process:</strong> find, screen, place, fund, check-in, next</li>' +
 '</ul>' +
 '<p class="gpx-truth">Built for real placement work. Live list when partners and funding are real. Until then: honest design. No fake saves.</p>' +
 '</div>' +
 '<div class="gpx-link-grid">' +
 '<div class="gpx-box"><h3>★ Golden Paws</h3><ul><li>Retiring <strong>dogs</strong> into forever homes</li><li>Service retirees + senior shelter heroes</li><li>Certified screening + funded care</li><li>This page</li></ul></div>' +
 '<div class="gpx-box"><h3>❤️ Golden Years</h3><ul><li>Matching <strong>senior people</strong> with companion dogs</li><li>Different product, same heart</li><li><a href="golden-years.html" style="color:#fcd34d">Open Golden Years →</a></li></ul></div>' +
 '</div>' +
 (isMobile() ? fundingPanelHtml() : '') +
 '<div class="gpx-link-grid" style="margin-top:1rem">' +
 '<a class="gpx-link-card" href="healing-hearts.html"><h3>Healing Hearts</h3><p>Therapy network. Working dogs may retire into Golden Paws when their chapter ends.</p></a>' +
 '<a class="gpx-link-card" href="silver-paws.html"><h3>Silver Paws</h3><p>Senior human visits. Not placing a senior dog in a forever home.</p></a>' +
 '<a class="gpx-link-card" href="all-programs.html"><h3>All 30 programs</h3><p>Support the full set when you are ready.</p></a>' +
 '<a class="gpx-link-card" href="programs/golden-paws-retirement-program.html"><h3>Classic program card</h3><p>Circles copy and video on the standard program page.</p></a>' +
 '</div>' +
 '<p class="gpx-truth" style="margin-top:1.25rem">Authenticity: every hero card, match lane, and application is a design demo until real partners, screening, and funding are live. Built so going live is a switch, not a rebuild.</p>' +
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
 status.textContent = 'Intent held on this device for ' + (hero ? hero.name : 'your hero') +
 '. Design only. No match confirmed until screening partners and funding are live. That is how we protect them.';
 }
 form.reset();
 if (hero) {
 state.selected = hero;
 renderConnectPick();
 }
 });
 }

 function wireBoard() {
 var chat = document.getElementById('gpx-chat');
 if (!chat) return;
 var lines = [
 ['@desk', 'Captain lane open. Quiet home preferred.'],
 ['@field', 'Find → screen → place → fund → next soul.'],
 ['@screen', 'Six gates. No soft pass on seniors.'],
 ['@fund', 'Guardian circle design · higher-care buffer.'],
 ['@snow', 'One home proves the next. Flywheel turns.'],
 ['@truth', 'No fake matches. Plan ready. Funding pending.'],
 ['@heart', 'They earned the sofa. We build the path.']
 ];
 var i = 0;
 function tick() {
 if (!chat || document.hidden || document.body.classList.contains('is-scrolling')) return;
 var heart = document.querySelector('.gpx-panel[data-gpx-panel="heart"]');
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
 setInterval(tick, 4800);

 requestAnimationFrame(function () {
 document.querySelectorAll('.gpx-bar > i').forEach(function (bar) {
 var w = bar.style.width;
 bar.style.width = '0';
 requestAnimationFrame(function () { bar.style.width = w; });
 });
 });

 if (!reducedMotion() && !isMobile()) {
 var hot = 0;
 setInterval(function () {
 if (document.hidden || document.body.classList.contains('is-scrolling')) return;
 var heart = document.querySelector('.gpx-panel[data-gpx-panel="heart"]');
 if (heart && !heart.classList.contains('is-on')) return;
 var lanes = document.querySelectorAll('.gpx-lane');
 if (!lanes.length) return;
 lanes.forEach(function (v) { v.classList.remove('is-hot'); });
 lanes[hot % lanes.length].classList.add('is-hot');
 hot++;
 }, 4200);
 }
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

 if (!document.getElementById('gpx-board')) {
 var holder = document.createElement('div');
 holder.innerHTML = boardHtml();
 if (hero && hero.parentNode) hero.parentNode.insertBefore(holder.firstChild, hero.nextSibling);
 }

 var board = document.getElementById('gpx-board');
 var quick = document.createElement('div');
 quick.className = 'gpx-quick';
 quick.innerHTML =
 '<button type="button" class="pri" data-gpx-go="heroes">Heroes</button>' +
 '<button type="button" data-gpx-go="connect">The gate</button>' +
 '<button type="button" data-gpx-go="funding">Fuel</button>' +
 '<button type="button" data-gpx-go="more">Map</button>';

 var mlede = null;
 var mchain = null;
 if (isMobile() && hero && !hero.querySelector('.gpx-mlede')) {
 mlede = document.createElement('p');
 mlede.className = 'gpx-mlede';
 mlede.innerHTML = 'Senior heroes. <strong>Find, screen, place, fund, next dog.</strong> Demo until partners and funding are real.';
 mchain = document.createElement('div');
 mchain.className = 'gpx-mchain';
 mchain.innerHTML = '<b>Find</b><i>→</i><b>Screen</b><i>→</i><b>Place</b><i>→</i><b>Fund</b><i>→</i><b>Grow</b>';
 }

 var more = document.createElement('div');
 more.innerHTML = seeMoreHtml();
 more = more.firstChild;

 var truth = document.createElement('p');
 truth.className = 'gpx-mtruth';
 truth.textContent = 'Demo lanes and heroes. Real partners replace demos when agreements are live. One dog at a time.';

 var heartNodes = [hero, mlede, mchain, quick, board, more, truth].filter(Boolean);
 [hero, board].forEach(function (n) {
 if (n && n.parentNode) n.parentNode.removeChild(n);
 });

 host.appendChild(panel('heart', null, heartNodes));
 host.appendChild(panel('heroes', heroesPanelHtml()));
 host.appendChild(panel('connect', connectPanelHtml()));
 if (!isMobile()) host.appendChild(panel('funding', fundingPanelHtml()));
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
 '<button type="button" class="gpx-mtab is-on" data-tab="heart"><span class="ic">★</span>Heart</button>' +
 '<button type="button" class="gpx-mtab" data-tab="heroes"><span class="ic">🐕</span>Heroes</button>' +
 '<button type="button" class="gpx-mtab" data-tab="connect"><span class="ic">⌂</span>Gate</button>' +
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
 '<button type="button" data-gpx-go="connect" role="tab">The gate</button>' +
 '<button type="button" data-gpx-go="funding" role="tab">Care engine</button>' +
 '<button type="button" data-gpx-go="more" role="tab">Map</button>';
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
 wireBoard();
 wireCareEngine();
 document.body.classList.add('gpx-ready');

 document.querySelectorAll('a[href="#gpx-board"], a[href="#gpx-heroes"], a[href="#heroes"], a[href="#gpx-connect"], a[href="#connect"]').forEach(function (a) {
 a.addEventListener('click', function (ev) {
 ev.preventDefault();
 var href = a.getAttribute('href') || '';
 if (href.indexOf('connect') !== -1) goTab('connect');
 else if (href.indexOf('heroes') !== -1) goTab('heroes');
 else goTab('heart');
 });
 });

 var hash = (location.hash || '').replace(/^#/, '');
 if (hash.indexOf('gpx-') === 0) goTab(hash.replace('gpx-', ''));
 else if (hash === 'heroes' || hash === 'dogs') goTab('heroes');
 else if (hash === 'connect' || hash === 'apply' || hash === 'gate') goTab('connect');
 else if (hash === 'funding') goTab(isMobile() ? 'more' : 'funding');
 else goTab('heart');
 }

 window.SHHGoldenPaws = {
  goTab: goTab,
  HEROES: HEROES,
  calcCare: calcCare
 };

 if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
 else inject();
})();
