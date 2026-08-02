/**
 * 30 Days of Christmas · Orphan Christmas campaign layer
 * Scroll journey · freight trackers · donor hearts · AMA stage · holiday cheer
 * Design / preview until rails, partners, and real streams are live. Truth labeled.
 * Tone: human. Quiet. High-end. No theater about delivery that has not happened yet.
 */
(function () {
  'use strict';

  /* Season window: Nov 25 → Dec 24 = 30 days of hard distribution + Holy Night */
  var SEASON_START = { m: 10, d: 25 }; /* month 0-index: Nov 25 */
  var SEASON_END = { m: 11, d: 24 };

  var DAY_THEMES = [
    { day: 1, title: 'The Quiet List', focus: 'Verified kids only. Partner codes. No DMs.', vibe: 'Open the books. Name no child in public.' },
    { day: 2, title: 'Warm First', focus: 'Coats · socks · gloves before toys', vibe: 'Cold hands cannot open gifts with joy.' },
    { day: 3, title: 'Sibling Keepers Night', focus: 'Crates for brothers and sisters together', vibe: 'Nobody should lose their sibling at Christmas too.' },
    { day: 4, title: 'Stocking Run', focus: 'Small packs · big heart', vibe: 'One child. One stocking. One morning that feels seen.' },
    { day: 5, title: 'Shelter Floor Sweep', focus: 'Whole wing pallets', vibe: 'Every bed on the floor gets a morning.' },
    { day: 6, title: 'Carol Night Live', focus: 'Vessymink + friends · carols for the room', vibe: 'Music that softens the warehouse and the chat.' },
    { day: 7, title: 'Turkey Tables Open', focus: 'Dinner vouchers · full turkey packs', vibe: 'A table with food is still a kind of home.' },
    { day: 8, title: 'Wish Desk Deep Dive', focus: 'Age · size · real lists', vibe: 'Elves match paper to a real human age.' },
    { day: 9, title: 'Freight Friday', focus: 'Trucks leave hubs · trackers light up', vibe: 'Watch the route. Cheer the dock.' },
    { day: 10, title: 'AMA Prize One', focus: 'Daily prize for the live room', vibe: 'Show up. Stay kind. Somebody goes home warmer.' },
    { day: 11, title: 'Corporate Hearts', focus: 'Named sponsors on the wall', vibe: 'From the hearts of companies who still feel.' },
    { day: 12, title: 'Foster Family Drop', focus: 'Kinship and foster homes', vibe: 'Quiet doors. Soft knocks. Real packs.' },
    { day: 13, title: 'Midway Mercy Check', focus: 'Half the season · double the pace', vibe: 'We do not coast. We go harder.' },
    { day: 14, title: 'Santa at the Shelter', focus: 'Live video · consent first', vibe: 'Santa for kids who thought he forgot.' },
    { day: 15, title: 'Grocery Dignity Day', focus: 'Store vouchers so families choose', vibe: 'Dignity is letting them pick the turkey.' },
    { day: 16, title: 'Wrap Masterclass', focus: 'Gold · holy · kid chaos paper', vibe: 'The paper is part of the joy.' },
    { day: 17, title: 'Night Shift Elves', focus: 'Live floor till late', vibe: 'Hands moving while the world sleeps.' },
    { day: 18, title: 'Carol Convoy', focus: 'Music on the road · drivers + chat', vibe: 'Sing while the freight rolls.' },
    { day: 19, title: 'AMA Prize Two', focus: 'Donor shoutouts + room prizes', vibe: 'Named love. Anonymous love. Both count.' },
    { day: 20, title: 'Teen Holy Night', focus: 'Youth shelters · ages that still need wonder', vibe: 'Sixteen still deserves Christmas.' },
    { day: 21, title: 'Mountain + Coast Push', focus: 'Hard routes get priority', vibe: 'Distance is not a reason to skip a child.' },
    { day: 22, title: 'Last Mile Saturday', focus: 'Local pickups · rooms filled', vibe: 'Call the shelter. Confirm the count.' },
    { day: 23, title: 'Eve Eve Buildup', focus: 'Chat peaks · freights final', vibe: 'The room gets loud with hope.' },
    { day: 24, title: 'Christmas Eve', focus: 'Final drops · carols · Santa soft close', vibe: 'Holy night. Quiet trucks. Full stockings.' },
    { day: 25, title: 'Christmas Morning', focus: 'Stories only · no harvest of tears', vibe: 'We do not film pain for clout. We protect the morning.' },
    { day: 26, title: 'Thank the Hands', focus: 'Elves · drivers · partners', vibe: 'The people who carried the boxes.' },
    { day: 27, title: 'Receipt Sunday', focus: 'Proof board · when rails live', vibe: 'Show the ledger. Keep the privacy.' },
    { day: 28, title: 'Leftover Love', focus: 'Missed doors · second pass', vibe: 'Nobody on the verified list gets skipped if we can help it.' },
    { day: 29, title: 'New Year Seed', focus: 'What next · hopeseed year-round', vibe: 'Christmas ends. Mercy does not.' },
    { day: 30, title: 'We Remember', focus: 'Names we never publish · hearts we keep', vibe: 'You are 1. We are all 1.' }
  ];

  var FREIGHTS = [
    { id: 'FX-104', route: 'Edmonton Hub → Hope House Youth', status: 'Loading', progress: 12, eta: 'Design window', packs: 48, sponsor: null, note: 'Wrap line complete · dock pending' },
    { id: 'FX-211', route: 'Calgary Annex → Riverbend Children\'s Home', status: 'En route (preview)', progress: 54, eta: 'Design window', packs: 72, sponsor: 'Northlight Energy Co.', note: 'Sibling crates + stockings' },
    { id: 'FX-308', route: 'Pacific Gift Gate → Pacific Youth Haven', status: 'Hub transfer', progress: 33, eta: 'Design window', packs: 36, sponsor: null, note: 'Dinner vouchers riding with gifts' },
    { id: 'FX-419', route: 'Toronto Hope Dock → GTA Second Chance', status: 'Scheduled', progress: 8, eta: 'Design window', packs: 90, sponsor: 'Maple Family Trust', note: 'Largest eastbound this week' },
    { id: 'FX-505', route: 'Edmonton Hub → Fort McMurray Youth Haven', status: 'Cold route prep', progress: 22, eta: 'Design window', packs: 28, sponsor: 'Anonymous heart', note: 'Hard miles. Priority packing.' },
    { id: 'FX-612', route: 'Seattle Sister Shed → Cascadia Care', status: 'Border staging', progress: 41, eta: 'Design window', packs: 40, sponsor: 'Vessymink Fan Circle', note: 'Carol night merch funds this leg (design)' }
  ];

  var DONOR_WALL = [
    { name: 'Northlight Energy Co.', type: 'Company', line: 'Full turkey dinners · Calgary shelter floor', public: true },
    { name: 'Maple Family Trust', type: 'Foundation', line: '90 child mercy bags · GTA overnight', public: true },
    { name: 'A quiet holder of $hopeseed', type: 'Anonymous', line: 'Chose no name. Still funded warmth.', public: false },
    { name: 'Vessymink Fan Circle', type: 'Community', line: 'Carol night tips → packs for teens', public: true },
    { name: 'Two sisters from Edmonton', type: 'Family', line: 'Sibling crates in memory of their mom', public: true },
    { name: 'Shop floor team · undisclosed', type: 'Anonymous', line: 'Payroll round-up · every Friday', public: false },
    { name: 'Aurora Dental Group', type: 'Company', line: 'Stocking packs for ages 3-8', public: true },
    { name: 'Someone who still believes', type: 'Anonymous', line: 'One shelter feast · whole wing', public: false }
  ];

  var STAGE_NIGHTS = [
    { when: 'Nightly · peak season', title: 'Mercy AMA Live', who: 'Host + community', what: 'Freight updates · day theme · daily prize · shoutouts', tag: 'AMA' },
    { when: 'Select Fridays', title: 'Carols with Vessymink', who: 'Vessymink + friends', what: 'Live Christmas carols. Soft room. Hard mission.', tag: 'MUSIC' },
    { when: 'Mid + late season', title: 'Santa on the Floor', who: 'Santa + consent team', what: 'Live video at events where partners invite us. Kids first. Cameras second.', tag: 'SANTA' },
    { when: 'Dec 23-24', title: 'Holy Night Buildup', who: 'Everyone in the chat', what: 'Final freights. Final carols. No spam. Pure cheer.', tag: 'CLIMAX' }
  ];

  var PRIZES = [
    { day: 'Daily', name: 'Warmth Token', how: 'Be in the live AMA · kind chat only · random draw (rules when live)' },
    { day: 'Weekly', name: 'Mercy Merch Drop', how: 'Holders + donors enter when season rules publish' },
    { day: 'Carol nights', name: 'Signed setlist card', how: 'Show up for Vessymink night · community prize (design)' },
    { day: 'Finale', name: 'Trip-adjacent cheer', how: 'Only if charity rails + legal rules are live. Mercy always first.' }
  ];

  function seasonDayIndex(now) {
    now = now || new Date();
    var y = now.getFullYear();
    var start = new Date(y, SEASON_START.m, SEASON_START.d);
    var end = new Date(y, SEASON_END.m, SEASON_END.d, 23, 59, 59);
    if (now < start) return 0;
    if (now > end) return 30;
    var ms = now - start;
    var day = Math.floor(ms / 86400000) + 1;
    if (day < 1) day = 1;
    if (day > 30) day = 30;
    return day;
  }

  function styles() {
    if (document.getElementById('tdx-css')) return;
    var s = document.createElement('style');
    s.id = 'tdx-css';
    s.textContent = [
      '.tdx{--wine:#6b0f1a;--crimson:#c41e3a;--gold:#e8c547;--cream:#fff4e0;--pine:#0d3d2c;--ink:#0a0608;color:var(--cream);position:relative;z-index:2;font-family:Inter,system-ui,sans-serif}',
      '.tdx *{box-sizing:border-box}',
      '.tdx-rail{position:sticky;top:3.6rem;z-index:30;display:flex;gap:.35rem;padding:.45rem .65rem;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;background:rgba(10,6,8,.92);backdrop-filter:blur(14px);border-bottom:1px solid rgba(232,197,71,.2);justify-content:flex-start}',
      '.tdx-rail::-webkit-scrollbar{display:none}',
      '@media(min-width:900px){.tdx-rail{justify-content:center;flex-wrap:wrap}}',
      '.tdx-rail a{flex:0 0 auto;font-size:.58rem;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;color:rgba(255,244,224,.55);padding:.38rem .65rem;border-radius:999px;border:1px solid transparent;transition:color .15s,border-color .15s,background .15s;white-space:nowrap}',
      '.tdx-rail a:hover,.tdx-rail a.is-on{color:#fde68a;border-color:rgba(232,197,71,.4);background:rgba(196,30,58,.18)}',
      '.tdx-countdown{display:grid;grid-template-columns:repeat(4,1fr);gap:.45rem;margin-top:1rem}',
      '@media(min-width:520px){.tdx-countdown{max-width:22rem}}',
      '.tdx-cd{text-align:center;padding:.55rem .35rem;border-radius:.85rem;border:1px solid rgba(232,197,71,.28);background:rgba(0,0,0,.4)}',
      '.tdx-cd b{display:block;font-family:Georgia,serif;font-size:1.25rem;color:#fde68a;line-height:1.1}',
      '.tdx-cd span{font-size:.55rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,244,224,.5)}',
      '.tdx-impact{display:grid;grid-template-columns:1fr 1fr;gap:.55rem;margin-top:1rem}',
      '@media(min-width:640px){.tdx-impact{grid-template-columns:repeat(4,1fr)}}',
      '.tdx-impact .cell{padding:.75rem .7rem;border-radius:1rem;border:1px solid rgba(255,255,255,.1);background:rgba(0,0,0,.35)}',
      '.tdx-impact .cell b{display:block;font-family:Georgia,serif;font-size:1.35rem;color:#fde68a}',
      '.tdx-impact .cell span{font-size:.62rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,244,224,.5);line-height:1.3}',
      '.tdx-chips{display:flex;gap:.35rem;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;padding:.15rem 0 .55rem;margin:0 -.15rem .35rem}',
      '.tdx-chips::-webkit-scrollbar{display:none}',
      '.tdx-chip{flex:0 0 auto;min-width:2.35rem;height:2.35rem;border-radius:999px;border:1px solid rgba(255,255,255,.12);background:rgba(0,0,0,.4);color:rgba(255,244,224,.65);font-size:.72rem;font-weight:700;cursor:pointer;font-family:inherit;padding:0 .45rem}',
      '.tdx-chip.is-open{border-color:rgba(232,197,71,.45);color:#fde68a}',
      '.tdx-chip.is-today{background:linear-gradient(135deg,#c41e3a,#6b0f1a);border-color:#fca5a5;color:#fff;box-shadow:0 0 18px rgba(196,30,58,.45)}',
      '.tdx-chip.is-on{outline:2px solid rgba(232,197,71,.7);outline-offset:1px}',
      '.tdx-path-tools{display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;margin:0 0 .75rem}',
      '.tdx-path.is-compact .tdx-day:not(.is-focus){display:none}',
      '.tdx-share{display:inline-flex;align-items:center;gap:.35rem;margin-top:.65rem;font-size:.72rem;color:#fde68a;background:rgba(0,0,0,.3);border:1px solid rgba(232,197,71,.35);border-radius:999px;padding:.4rem .75rem;cursor:pointer;font-family:inherit}',
      '.tdx-fr-actions{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.55rem}',
      '.tdx-sec{padding:2.5rem .9rem;max-width:72rem;margin:0 auto;width:100%;scroll-margin-top:5.5rem}',
      '@media(min-width:640px){.tdx-sec{padding:3.25rem 1.25rem}}',
      '.tdx-kicker{font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(232,197,71,.85);margin:0 0 .55rem}',
      '.tdx-h2{font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.55rem,5.5vw,2.55rem);line-height:1.12;margin:0 0 .75rem;color:#fff;font-weight:700}',
      '.tdx-h2 em{font-style:normal;background:linear-gradient(90deg,#fde68a,#e8c547,#fca5a5);-webkit-background-clip:text;background-clip:text;color:transparent}',
      '.tdx-lede{font-size:clamp(.95rem,3.2vw,1.12rem);line-height:1.65;color:rgba(255,244,224,.88);max-width:40rem;margin:0 0 1.25rem}',
      '.tdx-lede strong{color:#fde68a;font-weight:600}',
      '.tdx-honest{font-size:.68rem;line-height:1.45;color:rgba(255,244,224,.48);margin:.75rem 0 0;max-width:40rem}',
      '.tdx-hero-band{position:relative;overflow:hidden;border-radius:1.35rem;border:1px solid rgba(232,197,71,.35);background:radial-gradient(ellipse 80% 80% at 20% 0%,rgba(196,30,58,.45),transparent 55%),radial-gradient(ellipse 70% 60% at 100% 100%,rgba(13,61,44,.4),transparent 50%),rgba(0,0,0,.55);padding:1.35rem 1.1rem 1.5rem;box-shadow:0 24px 60px -20px rgba(0,0,0,.75),0 0 40px -12px rgba(196,30,58,.35)}',
      '@media(min-width:640px){.tdx-hero-band{padding:1.75rem 1.75rem 1.9rem}}',
      '.tdx-day-meter{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1rem}',
      '.tdx-meter-pill{padding:.45rem .75rem;border-radius:999px;border:1px solid rgba(232,197,71,.3);background:rgba(0,0,0,.35);font-size:.72rem}',
      '.tdx-meter-pill b{color:#fde68a;font-family:Georgia,serif;font-size:1rem;margin-right:.35rem}',
      '.tdx-path{position:relative;margin-top:1.5rem}',
      '.tdx-path::before{content:"";position:absolute;left:1.1rem;top:0;bottom:0;width:2px;background:linear-gradient(180deg,rgba(232,197,71,.7),rgba(196,30,58,.35),rgba(13,61,44,.5));border-radius:2px}',
      '@media(min-width:900px){.tdx-path::before{left:50%;transform:translateX(-50%)}}',
      '.tdx-day{position:relative;padding:.15rem 0 .15rem 2.6rem;margin-bottom:.65rem}',
      '@media(min-width:900px){.tdx-day{width:50%;padding-left:0;padding-right:2.5rem}.tdx-day:nth-child(even){margin-left:50%;padding-right:0;padding-left:2.5rem}}',
      '.tdx-day-dot{position:absolute;left:.72rem;top:1.15rem;width:14px;height:14px;border-radius:50%;background:#3f3f46;border:2px solid rgba(232,197,71,.5);box-shadow:0 0 0 4px rgba(10,6,8,.9)}',
      '@media(min-width:900px){.tdx-day-dot{left:auto;right:-.45rem}.tdx-day:nth-child(even) .tdx-day-dot{left:-.45rem;right:auto}}',
      '.tdx-day.is-open .tdx-day-dot{background:#e8c547;box-shadow:0 0 16px rgba(232,197,71,.7),0 0 0 4px rgba(10,6,8,.9)}',
      '.tdx-day.is-today .tdx-day-dot{background:#c41e3a;border-color:#fca5a5;animation:tdx-pulse 1.4s ease infinite}',
      '@keyframes tdx-pulse{0%,100%{box-shadow:0 0 0 4px rgba(10,6,8,.9),0 0 0 0 rgba(196,30,58,.5)}70%{box-shadow:0 0 0 4px rgba(10,6,8,.9),0 0 0 10px rgba(196,30,58,0)}}',
      '.tdx-day-card{border-radius:1.1rem;border:1px solid rgba(255,255,255,.1);background:rgba(20,10,12,.75);padding:1rem 1.05rem;transition:border-color .2s,transform .2s,box-shadow .2s;cursor:pointer;text-align:left;width:100%;font:inherit;color:inherit}',
      '.tdx-day-card:hover{border-color:rgba(232,197,71,.45);transform:translateY(-2px);box-shadow:0 16px 40px -18px rgba(196,30,58,.45)}',
      '.tdx-day.is-today .tdx-day-card{border-color:rgba(196,30,58,.65);background:linear-gradient(145deg,rgba(107,15,26,.55),rgba(10,6,8,.85))}',
      '.tdx-day.is-locked .tdx-day-card{opacity:.55}',
      '.tdx-day-num{font-size:.58rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(232,197,71,.75)}',
      '.tdx-day-title{font-family:Georgia,serif;font-size:1.05rem;color:#fff;margin:.25rem 0 .35rem}',
      '.tdx-day-focus{font-size:.8rem;color:rgba(255,244,224,.7);line-height:1.4;margin:0}',
      '.tdx-day-vibe{font-size:.78rem;color:#fde68a;margin:.45rem 0 0;line-height:1.4;font-style:italic;font-family:Georgia,serif}',
      '.tdx-grid{display:grid;gap:.85rem}',
      '@media(min-width:720px){.tdx-grid-2{grid-template-columns:1fr 1fr}.tdx-grid-3{grid-template-columns:1fr 1fr 1fr}}',
      '.tdx-card{border-radius:1.15rem;border:1px solid rgba(232,197,71,.22);background:rgba(0,0,0,.4);padding:1.1rem 1.15rem;position:relative;overflow:hidden}',
      '.tdx-card h3{font-family:Georgia,serif;font-size:1.1rem;color:#fff;margin:0 0 .45rem}',
      '.tdx-card p{margin:0;font-size:.82rem;line-height:1.5;color:rgba(255,244,224,.72)}',
      '.tdx-freight{display:grid;gap:.75rem}',
      '.tdx-fr{border-radius:1.1rem;border:1px solid rgba(255,255,255,.1);background:linear-gradient(120deg,rgba(13,61,44,.25),rgba(10,6,8,.85));padding:1rem 1.05rem}',
      '.tdx-fr-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.5rem;margin-bottom:.45rem}',
      '.tdx-fr-id{font-family:ui-monospace,monospace;font-size:.78rem;color:#fde68a;letter-spacing:.06em}',
      '.tdx-fr-status{font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;padding:.28rem .55rem;border-radius:999px;border:1px solid rgba(52,211,153,.35);color:#6ee7b7;background:rgba(6,78,59,.35)}',
      '.tdx-fr-route{font-size:.9rem;color:#fff;font-weight:600;margin-bottom:.35rem}',
      '.tdx-bar{height:6px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden;margin:.55rem 0}',
      '.tdx-bar > i{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,#e8c547,#c41e3a);width:0;transition:width 1.2s ease}',
      '.tdx-sponsor{margin-top:.55rem;padding:.55rem .7rem;border-radius:.7rem;border:1px solid rgba(232,197,71,.35);background:rgba(196,30,58,.15);font-size:.72rem;line-height:1.4;color:#fde68a}',
      '.tdx-sponsor b{display:block;font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(253,230,138,.7);margin-bottom:.2rem;font-weight:600}',
      '.tdx-wall{display:grid;gap:.65rem}',
      '@media(min-width:640px){.tdx-wall{grid-template-columns:1fr 1fr}}',
      '.tdx-donor{border-radius:1rem;border:1px solid rgba(232,197,71,.25);background:rgba(20,10,12,.7);padding:.9rem 1rem}',
      '.tdx-donor.is-anon{border-style:dashed;opacity:.9}',
      '.tdx-donor .who{font-family:Georgia,serif;font-size:1rem;color:#fff;margin-bottom:.2rem}',
      '.tdx-donor .type{font-size:.58rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(232,197,71,.7);margin-bottom:.35rem}',
      '.tdx-donor .line{font-size:.8rem;color:rgba(255,244,224,.75);line-height:1.4}',
      '.tdx-ribbon{display:inline-block;margin-top:.45rem;font-size:.68rem;color:#fecaca;font-style:italic}',
      '.tdx-stage{display:grid;gap:.75rem}',
      '@media(min-width:800px){.tdx-stage{grid-template-columns:1.2fr .8fr}}',
      '.tdx-night{border-left:3px solid var(--gold);padding:.85rem 1rem;background:linear-gradient(90deg,rgba(196,30,58,.2),transparent);border-radius:0 1rem 1rem 0;margin-bottom:.65rem}',
      '.tdx-night .tag{font-size:.55rem;letter-spacing:.14em;text-transform:uppercase;color:#fca5a5}',
      '.tdx-night h4{font-family:Georgia,serif;font-size:1.05rem;margin:.2rem 0;color:#fff}',
      '.tdx-chat-live{border-radius:1rem;border:1px solid rgba(232,197,71,.3);background:rgba(0,0,0,.5);padding:.85rem;min-height:200px;max-height:280px;overflow:auto}',
      '.tdx-chat-live .line{font-size:.75rem;line-height:1.4;color:rgba(255,244,224,.78);margin-bottom:.45rem}',
      '.tdx-chat-live .line b{color:#fde68a}',
      '.tdx-chat-live .line .gift{color:#fecaca}',
      '.tdx-cta-row{display:flex;flex-direction:column;gap:.55rem;margin-top:1.1rem}',
      '@media(min-width:520px){.tdx-cta-row{flex-direction:row;flex-wrap:wrap}}',
      '.tdx-cta{display:inline-flex;align-items:center;justify-content:center;padding:.9rem 1.25rem;border-radius:999px;font-weight:700;font-size:.9rem;text-decoration:none;border:0;cursor:pointer;font-family:inherit;min-height:48px}',
      '.tdx-cta-gold{color:#1a080c;background:linear-gradient(135deg,#f5e6a8,#e8c547 40%,#c41e3a);box-shadow:0 12px 36px -10px rgba(196,30,58,.55)}',
      '.tdx-cta-ghost{color:#fde68a;background:rgba(0,0,0,.3);border:1px solid rgba(232,197,71,.4)}',
      '.tdx-form{display:grid;gap:.65rem;margin-top:.85rem}',
      '.tdx-form label{font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(232,197,71,.75)}',
      '.tdx-form input,.tdx-form select,.tdx-form textarea{width:100%;padding:.7rem .85rem;border-radius:.75rem;border:1px solid rgba(255,255,255,.12);background:rgba(0,0,0,.45);color:#fff4e0;font:inherit;font-size:.9rem}',
      '.tdx-form textarea{min-height:72px;resize:vertical}',
      '.tdx-check{display:flex;align-items:flex-start;gap:.5rem;font-size:.8rem;color:rgba(255,244,224,.75);line-height:1.4}',
      '.tdx-check input{margin-top:.2rem}',
      '.tdx-toast{position:fixed;bottom:5rem;left:50%;transform:translateX(-50%) translateY(20px);opacity:0;pointer-events:none;z-index:80;padding:.75rem 1.1rem;border-radius:999px;background:rgba(10,6,8,.95);border:1px solid rgba(232,197,71,.5);color:#fde68a;font-size:.8rem;max-width:90vw;text-align:center;transition:opacity .35s,transform .35s}',
      '.tdx-toast.is-on{opacity:1;transform:translateX(-50%) translateY(0)}',
      '.tdx-detail{margin-top:1rem;padding:1.1rem;border-radius:1.1rem;border:1px solid rgba(232,197,71,.35);background:rgba(107,15,26,.25);display:none}',
      '.tdx-detail.is-on{display:block}',
      '.tdx-detail h3{font-family:Georgia,serif;color:#fff;margin:0 0 .4rem}',
      '@media(prefers-reduced-motion:reduce){.tdx-day.is-today .tdx-day-dot,.tdx-bar > i{animation:none!important;transition:none!important}}'
    ].join('\n');
    document.head.appendChild(s);
  }

  function esc(t) {
    return String(t == null ? '' : t)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function isFocusDay(day, today) {
    var t = today > 0 ? today : 1;
    if (day === t) return true;
    if (Math.abs(day - t) <= 2) return true;
    if (day === 1 || day === 6 || day === 14 || day === 24 || day === 25 || day === 30) return true;
    return false;
  }

  function buildDayChips(today) {
    return DAY_THEMES.map(function (d) {
      var open = today === 0 || d.day <= today;
      var isToday = (today > 0 && d.day === today) || (today === 0 && d.day === 1);
      var cls = 'tdx-chip' + (open ? ' is-open' : '') + (isToday ? ' is-today' : '');
      return '<button type="button" class="' + cls + '" data-chip="' + d.day + '" title="Day ' + d.day + ': ' + esc(d.title) + '" aria-label="Day ' + d.day + '">' + d.day + '</button>';
    }).join('');
  }

  function buildDaysHtml(today) {
    return DAY_THEMES.map(function (d) {
      var open = d.day <= today;
      var isToday = d.day === today || (today === 0 && d.day === 1);
      var focus = isFocusDay(d.day, today);
      var cls = 'tdx-day' + (open || today === 0 ? ' is-open' : ' is-locked') + (isToday && today > 0 ? ' is-today' : '') + (focus ? ' is-focus' : '');
      if (today === 0 && d.day === 1) cls = 'tdx-day is-open is-today is-focus';
      return (
        '<div class="' + cls + '" id="tdx-day-' + d.day + '" data-day="' + d.day + '">' +
          '<span class="tdx-day-dot" aria-hidden="true"></span>' +
          '<button type="button" class="tdx-day-card" data-day-btn="' + d.day + '" aria-expanded="false">' +
            '<div class="tdx-day-num">Day ' + d.day + ' of 30' + (isToday && today > 0 ? ' · Today' : '') + (today === 0 && d.day === 1 ? ' · Season opens' : '') + '</div>' +
            '<div class="tdx-day-title">' + esc(d.title) + '</div>' +
            '<p class="tdx-day-focus">' + esc(d.focus) + '</p>' +
            '<p class="tdx-day-vibe">' + esc(d.vibe) + '</p>' +
          '</button>' +
        '</div>'
      );
    }).join('');
  }

  function countdownTarget() {
    var now = new Date();
    var y = now.getFullYear();
    var start = new Date(y, SEASON_START.m, SEASON_START.d, 0, 0, 0);
    var eve = new Date(y, 11, 24, 23, 59, 59);
    if (now < start) return { at: start, label: 'Until season open (Nov 25)' };
    if (now <= eve) return { at: eve, label: 'Until Christmas Eve close' };
    return { at: new Date(y + 1, SEASON_START.m, SEASON_START.d), label: 'Until next season open' };
  }

  function freightHtml() {
    return FREIGHTS.map(function (f) {
      var sponsor = f.sponsor
        ? '<div class="tdx-sponsor"><b>Sponsored from the hearts of</b>' + esc(f.sponsor) + '</div>'
        : '<div class="tdx-sponsor" style="border-style:dashed;opacity:.75"><b>Open for a heart</b>Name this freighter when you fund the route. Or stay anonymous. Both are love.</div>';
      return (
        '<article class="tdx-fr" data-freight="' + esc(f.id) + '" data-progress="' + f.progress + '">' +
          '<div class="tdx-fr-top">' +
            '<span class="tdx-fr-id">' + esc(f.id) + '</span>' +
            '<span class="tdx-fr-status" data-fr-status>' + esc(f.status) + '</span>' +
          '</div>' +
          '<div class="tdx-fr-route">' + esc(f.route) + '</div>' +
          '<p style="font-size:.78rem;color:rgba(255,244,224,.65);margin:0 0 .25rem">' + esc(f.note) + ' · <span data-fr-packs>' + f.packs + '</span> packs (design count)</p>' +
          '<div class="tdx-bar" aria-hidden="true"><i data-fr-bar style="width:' + f.progress + '%"></i></div>' +
          '<p style="font-size:.7rem;color:rgba(255,244,224,.5);margin:0">Progress preview · ETA: ' + esc(f.eta) + ' · Real GPS when partners publish it</p>' +
          sponsor +
          '<div class="tdx-fr-actions">' +
            '<button type="button" class="tdx-share" data-share-freight="' + esc(f.id) + '">Share this freighter</button>' +
            '<a class="tdx-share" href="#tdx-sponsor" data-pick-freight="' + esc(f.id) + '">Put your heart on it</a>' +
          '</div>' +
        '</article>'
      );
    }).join('');
  }

  function donorWallHtml() {
    return DONOR_WALL.map(function (d) {
      var who = d.public ? d.name : 'Anonymous heart';
      var ribbon = d.public
        ? '<span class="tdx-ribbon">This mercy sponsored from the hearts of ' + esc(d.name) + '</span>'
        : '<span class="tdx-ribbon">Chose quiet love. No public label.</span>';
      return (
        '<div class="tdx-donor' + (d.public ? '' : ' is-anon') + '">' +
          '<div class="type">' + esc(d.type) + '</div>' +
          '<div class="who">' + esc(who) + '</div>' +
          '<div class="line">' + esc(d.line) + '</div>' +
          ribbon +
        '</div>'
      );
    }).join('');
  }

  function stageHtml() {
    return STAGE_NIGHTS.map(function (n) {
      return (
        '<div class="tdx-night">' +
          '<div class="tag">' + esc(n.tag) + ' · ' + esc(n.when) + '</div>' +
          '<h4>' + esc(n.title) + '</h4>' +
          '<p style="margin:0;font-size:.82rem;color:rgba(255,244,224,.72)"><strong style="color:#fde68a">' + esc(n.who) + '</strong> — ' + esc(n.what) + '</p>' +
        '</div>'
      );
    }).join('');
  }

  function prizeHtml() {
    return PRIZES.map(function (p) {
      return (
        '<div class="tdx-card">' +
          '<p style="font-size:.58rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(232,197,71,.75);margin:0 0 .3rem">' + esc(p.day) + '</p>' +
          '<h3>' + esc(p.name) + '</h3>' +
          '<p>' + esc(p.how) + '</p>' +
        '</div>'
      );
    }).join('');
  }

  function html(today) {
    var meterLabel = today === 0
      ? 'Season opens Nov 25'
      : today >= 30
        ? 'Season complete · mercy continues'
        : 'Day ' + today + ' of 30';
    var meterSub = today === 0
      ? 'Preview the full path now'
      : 'Hard distribution window';

    return (
      '<div class="tdx" id="tdx-root">' +
        '<nav class="tdx-rail" aria-label="30 Days chapters">' +
          '<a href="#tdx-heart">Heart</a>' +
          '<a href="#tdx-days">30 Days</a>' +
          '<a href="#tdx-freight">Freight</a>' +
          '<a href="#tdx-stage">Live stage</a>' +
          '<a href="#tdx-givers">Givers</a>' +
          '<a href="#tdx-sponsor">Name a gift</a>' +
          '<a href="#christmas-ops">Build gift</a>' +
        '</nav>' +

        /* HEART */
        '<section class="tdx-sec" id="tdx-heart">' +
          '<p class="tdx-kicker">30 Days of Christmas · $hopeseed</p>' +
          '<h2 class="tdx-h2">Thirty days of going <em>hard for the ones who wake up alone.</em></h2>' +
          '<p class="tdx-lede">' +
            'Not a cute calendar. A season of distribution. ' +
            'Every day has a job. Every freight has a face behind a partner code. ' +
            'Every non-anonymous gift can carry a line the world can see: ' +
            '<strong>This donation sponsored from the hearts of ________.</strong>' +
          '</p>' +
          '<div class="tdx-hero-band">' +
            '<p style="margin:0 0 .5rem;font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(253,230,138,.8)">The promise</p>' +
            '<p style="margin:0;font-family:Georgia,serif;font-size:clamp(1.05rem,3.5vw,1.35rem);line-height:1.45;color:#fff">' +
              'We pack. We track. We sing. We show up live. ' +
              'When rails and partners are real, the trucks move for verified orphans, foster kids, youth shelters, and families who can prove the cupboard is empty.' +
            '</p>' +
            '<div class="tdx-day-meter">' +
              '<div class="tdx-meter-pill"><b id="tdx-meter-day">' + esc(meterLabel) + '</b><span id="tdx-meter-sub">' + esc(meterSub) + '</span></div>' +
              '<div class="tdx-meter-pill"><b>Nov 25 → Dec 24</b><span>30-day mercy window</span></div>' +
              '<div class="tdx-meter-pill"><b>Preview</b><span>Real freights when funded</span></div>' +
            '</div>' +
            '<div class="tdx-countdown" id="tdx-countdown" aria-label="Season countdown">' +
              '<div class="tdx-cd"><b id="tdx-cd-d">--</b><span>Days</span></div>' +
              '<div class="tdx-cd"><b id="tdx-cd-h">--</b><span>Hours</span></div>' +
              '<div class="tdx-cd"><b id="tdx-cd-m">--</b><span>Mins</span></div>' +
              '<div class="tdx-cd"><b id="tdx-cd-s">--</b><span>Secs</span></div>' +
            '</div>' +
            '<p class="tdx-honest" id="tdx-cd-label" style="margin-top:.55rem">Season clock</p>' +
            '<div class="tdx-impact" aria-label="Season impact preview">' +
              '<div class="cell"><b id="tdx-m-packs">0</b><span>Gift packs designed</span></div>' +
              '<div class="cell"><b id="tdx-m-dinners">0</b><span>Dinner seats designed</span></div>' +
              '<div class="cell"><b id="tdx-m-freight">6</b><span>Freights on the board</span></div>' +
              '<div class="cell"><b id="tdx-m-hearts">0</b><span>Named hearts ready</span></div>' +
            '</div>' +
            '<p class="tdx-honest">Designed for peak season. Live cams, GPS, and prizes activate with partners, legal rules, and charity rails. Counters are design energy until rails go live.</p>' +
            '<div class="tdx-cta-row">' +
              '<a class="tdx-cta tdx-cta-gold" href="#tdx-days">Walk the 30 days</a>' +
              '<a class="tdx-cta tdx-cta-ghost" href="#tdx-freight">Watch freights</a>' +
              '<a class="tdx-cta tdx-cta-ghost" href="#tdx-stage">Carols · AMA · Santa</a>' +
              '<button type="button" class="tdx-cta tdx-cta-ghost" id="tdx-share-season">Share the season</button>' +
            '</div>' +
          '</div>' +
        '</section>' +

        /* 30 DAYS PATH */
        '<section class="tdx-sec" id="tdx-days">' +
          '<p class="tdx-kicker">Scroll the season</p>' +
          '<h2 class="tdx-h2">A path, not a grid. <em>One day. One job. One more morning fixed.</em></h2>' +
          '<p class="tdx-lede">' +
            'Like the best holiday campaigns, progress should feel like travel. ' +
            'Jump any day on the chips. We keep the path compact around today so your thumb does not drown. Open full when you want the whole road.' +
          '</p>' +
          '<div class="tdx-chips" id="tdx-chips" role="list">' + buildDayChips(today) + '</div>' +
          '<div class="tdx-path-tools">' +
            '<button type="button" class="tdx-cta tdx-cta-ghost" id="tdx-jump-today" style="min-height:40px;padding:.55rem 1rem;font-size:.8rem">Jump to today</button>' +
            '<button type="button" class="tdx-cta tdx-cta-ghost" id="tdx-toggle-path" style="min-height:40px;padding:.55rem 1rem;font-size:.8rem">Show all 30 days</button>' +
          '</div>' +
          '<div class="tdx-detail" id="tdx-day-detail" role="region" aria-live="polite"></div>' +
          '<div class="tdx-path is-compact" id="tdx-path">' + buildDaysHtml(today) + '</div>' +
          '<p class="tdx-honest">Day states follow the calendar when the season is open. Off-season, Day 1 glows so you can rehearse the whole path.</p>' +
        '</section>' +

        /* FREIGHT */
        '<section class="tdx-sec" id="tdx-freight">' +
          '<p class="tdx-kicker">Live freight command</p>' +
          '<h2 class="tdx-h2">Every truck is a <em>story on wheels.</em></h2>' +
          '<p class="tdx-lede">' +
            'Not fake GPS theater. Honest preview trackers now. ' +
            'When funded: each freighter shows route, pack count, status, and if the giver said yes to a name, a gold ribbon: ' +
            '<strong>Sponsored from the hearts of…</strong>' +
          '</p>' +
          '<div class="tdx-freight" id="tdx-freight-list">' + freightHtml() + '</div>' +
          '<p class="tdx-honest">Progress bars are design previews. Real trackers replace them when hubs, drivers, and partners are live. We will not invent locations.</p>' +
          '<div class="tdx-cta-row">' +
            '<a class="tdx-cta tdx-cta-gold" href="#christmas-ops">Sponsor a route in ops</a>' +
            '<a class="tdx-cta tdx-cta-ghost" href="#tdx-sponsor">Put your name on a freighter</a>' +
          '</div>' +
        '</section>' +

        /* STAGE */
        '<section class="tdx-sec" id="tdx-stage">' +
          '<p class="tdx-kicker">Holiday cheer · live room</p>' +
          '<h2 class="tdx-h2">Buildup that feels like <em>Christmas in the chest.</em></h2>' +
          '<p class="tdx-lede">' +
            'Daily AMAs. Prize draws for the people who show up kind. ' +
            'Friends like <strong>Vessymink</strong> singing carols with others. ' +
            'Santa at real partner events on live video when invited and safe. ' +
            'The chat is the stadium. The freight board is the scoreboard.' +
          '</p>' +
          '<div class="tdx-stage">' +
            '<div>' +
              stageHtml() +
              '<p class="tdx-kicker" style="margin-top:1.25rem">Daily prize ladder (design)</p>' +
              '<div class="tdx-grid tdx-grid-2">' + prizeHtml() + '</div>' +
            '</div>' +
            '<div class="tdx-card">' +
              '<h3>Live cheer feed</h3>' +
              '<p style="margin-bottom:.65rem">Simulated holiday room until streams go real. Sponsor lines will interrupt with love, not spam.</p>' +
              '<div class="tdx-chat-live" id="tdx-cheer" aria-live="polite"></div>' +
              '<p class="tdx-honest">Preview chat. Real X Spaces / stream links publish with season dates.</p>' +
              '<div class="tdx-cta-row">' +
                '<a class="tdx-cta tdx-cta-gold" href="https://x.com/Shibhumanityhub" target="_blank" rel="noopener">Follow live times on X</a>' +
                '<a class="tdx-cta tdx-cta-ghost" href="../spin-the-wheel.html">Practice the Mercy Wheel</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</section>' +

        /* GIVERS WALL */
        '<section class="tdx-sec" id="tdx-givers">' +
          '<p class="tdx-kicker">Hearts of the givers</p>' +
          '<h2 class="tdx-h2">Huge shoutouts for the ones who <em>say their name.</em></h2>' +
          '<p class="tdx-lede">' +
            'Anonymous is sacred. Public is powerful. You choose. ' +
            'If you want the room to know, we label it with honor: ' +
            '<strong>This donation sponsored from the hearts of Aurora Dental Group.</strong> ' +
            'Companies. Families. Circles of friends. Holders of $hopeseed. All welcome.' +
          '</p>' +
          '<div class="tdx-wall" id="tdx-wall">' + donorWallHtml() + '</div>' +
          '<p class="tdx-honest">Wall shows design examples until real public donors opt in. Nothing posts without consent.</p>' +
        '</section>' +

        /* SPONSOR FORM */
        '<section class="tdx-sec" id="tdx-sponsor">' +
          '<p class="tdx-kicker">Stand with a freighter</p>' +
          '<h2 class="tdx-h2">Name the love. Or keep it quiet.</h2>' +
          '<p class="tdx-lede">Tell us how you want to show up when funding rails open. This form is intent only. No charge. No fake receipt.</p>' +
          '<div class="tdx-card">' +
            '<form class="tdx-form" id="tdx-form" novalidate>' +
              '<div><label for="tdx-name">Public label (company or people)</label>' +
              '<input id="tdx-name" name="label" maxlength="80" placeholder="e.g. Northlight Energy Co. or The Rivera Family" autocomplete="organization"></div>' +
              '<div><label for="tdx-freight-pick">Which freighter speaks to you?</label>' +
              '<select id="tdx-freight-pick" name="freight">' +
                FREIGHTS.map(function (f) {
                  return '<option value="' + esc(f.id) + '">' + esc(f.id) + ' — ' + esc(f.route) + '</option>';
                }).join('') +
              '</select></div>' +
              '<div><label for="tdx-note">What should the ribbon say?</label>' +
              '<textarea id="tdx-note" name="note" maxlength="160" placeholder="This donation sponsored from the hearts of…"></textarea></div>' +
              '<label class="tdx-check"><input type="checkbox" id="tdx-public" checked> Show my name on the wall and freighter when live (uncheck to stay anonymous)</label>' +
              '<label class="tdx-check"><input type="checkbox" id="tdx-truth" required> I understand this is intent for when charity rails and funding are live. Not a payment.</label>' +
              '<button type="submit" class="tdx-cta tdx-cta-gold" style="border:0;width:100%;max-width:20rem">Hold my place in the season</button>' +
            '</form>' +
            '<p class="tdx-honest">When rails are live: real checkout, real receipts, real opt-in wall. Until then your intent stays on this device as a reminder of who you chose to be.</p>' +
          '</div>' +
          '<div class="tdx-cta-row">' +
            '<a class="tdx-cta tdx-cta-ghost" href="#christmas-ops">Or build a gift pack now</a>' +
            '<a class="tdx-cta tdx-cta-ghost" href="#oca-broadcast">Back to warehouse floor</a>' +
          '</div>' +
        '</section>' +

        '<div class="tdx-toast" id="tdx-toast" role="status"></div>' +
      '</div>'
    );
  }

  function toast(msg) {
    var el = document.getElementById('tdx-toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('is-on');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () {
      el.classList.remove('is-on');
    }, 4200);
  }

  function wire(root, today) {
    /* Countdown */
    function tickCountdown() {
      var t = countdownTarget();
      var label = document.getElementById('tdx-cd-label');
      if (label) label.textContent = t.label + ' · clock is real · delivery still when funded';
      var diff = Math.max(0, t.at - new Date());
      var s = Math.floor(diff / 1000);
      var d = Math.floor(s / 86400); s -= d * 86400;
      var h = Math.floor(s / 3600); s -= h * 3600;
      var m = Math.floor(s / 60); s -= m * 60;
      var map = { 'tdx-cd-d': d, 'tdx-cd-h': h, 'tdx-cd-m': m, 'tdx-cd-s': s };
      Object.keys(map).forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.textContent = String(map[id]).padStart(2, '0');
      });
    }
    tickCountdown();
    setInterval(tickCountdown, 1000);

    /* Impact meters (design energy — gentle climb) */
    var meters = { packs: 314, dinners: 96, hearts: 18 };
    var mPacks = document.getElementById('tdx-m-packs');
    var mDin = document.getElementById('tdx-m-dinners');
    var mHearts = document.getElementById('tdx-m-hearts');
    var shown = { packs: 0, dinners: 0, hearts: 0 };
    function easeMeters() {
      shown.packs = Math.min(meters.packs, shown.packs + 7 + Math.floor(Math.random() * 5));
      shown.dinners = Math.min(meters.dinners, shown.dinners + 2 + Math.floor(Math.random() * 2));
      shown.hearts = Math.min(meters.hearts, shown.hearts + 1);
      if (mPacks) mPacks.textContent = shown.packs.toLocaleString();
      if (mDin) mDin.textContent = shown.dinners.toLocaleString();
      if (mHearts) mHearts.textContent = String(shown.hearts);
      if (shown.packs < meters.packs || shown.dinners < meters.dinners || shown.hearts < meters.hearts) {
        requestAnimationFrame(function () { setTimeout(easeMeters, 40); });
      }
    }
    setTimeout(easeMeters, 300);

    /* Day detail helper */
    var detail = document.getElementById('tdx-day-detail');
    function openDay(n, scrollCard) {
      var d = DAY_THEMES[n - 1];
      if (!d || !detail) return;
      detail.classList.add('is-on');
      detail.innerHTML =
        '<p class="tdx-kicker">Day ' + d.day + ' focus</p>' +
        '<h3>' + esc(d.title) + '</h3>' +
        '<p style="margin:0 0 .5rem;color:rgba(255,244,224,.85);line-height:1.55">' + esc(d.focus) + '</p>' +
        '<p style="margin:0;font-family:Georgia,serif;font-style:italic;color:#fde68a">' + esc(d.vibe) + '</p>' +
        '<p class="tdx-honest" style="margin-top:.75rem">On this day the room runs the theme hard: freight updates, AMA talk, donor shoutouts if any, and distribution that matches the job.</p>' +
        '<button type="button" class="tdx-share" data-share-day="' + d.day + '">Share Day ' + d.day + '</button>';
      root.querySelectorAll('.tdx-chip').forEach(function (c) {
        c.classList.toggle('is-on', parseInt(c.getAttribute('data-chip'), 10) === n);
      });
      if (scrollCard) {
        var card = document.getElementById('tdx-day-' + n);
        if (card) {
          card.classList.add('is-focus');
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      var shareBtn = detail.querySelector('[data-share-day]');
      if (shareBtn) {
        shareBtn.addEventListener('click', function () {
          shareText(
            'Day ' + d.day + ' of 30 Days of Christmas: ' + d.title + '. ' + d.vibe + ' Orphan Christmas · Shibahumanityhub',
            'https://shibahumanityhub.com/programs/orphan-christmas.html#tdx-day-' + d.day
          );
        });
      }
    }

    function shareText(text, url) {
      var full = text + (url ? '\n' + url : '');
      if (navigator.share) {
        navigator.share({ title: 'Orphan Christmas', text: text, url: url || location.href }).catch(function () {
          copyShare(full);
        });
      } else {
        copyShare(full);
      }
    }
    function copyShare(full) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(full).then(function () {
          toast('Copied. Paste it anywhere the room needs to feel this.');
        }).catch(function () {
          window.open('https://x.com/intent/tweet?text=' + encodeURIComponent(full), '_blank', 'noopener');
        });
      } else {
        window.open('https://x.com/intent/tweet?text=' + encodeURIComponent(full), '_blank', 'noopener');
      }
    }

    /* Day cards */
    root.querySelectorAll('[data-day-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openDay(parseInt(btn.getAttribute('data-day-btn'), 10) || 1, false);
      });
    });

    /* Day chips */
    root.querySelectorAll('[data-chip]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var n = parseInt(chip.getAttribute('data-chip'), 10) || 1;
        var path = document.getElementById('tdx-path');
        var node = document.getElementById('tdx-day-' + n);
        if (path && path.classList.contains('is-compact') && node && !node.classList.contains('is-focus')) {
          path.classList.remove('is-compact');
          var tg = document.getElementById('tdx-toggle-path');
          if (tg) tg.textContent = 'Show compact path';
        }
        openDay(n, true);
      });
    });

    var jumpToday = document.getElementById('tdx-jump-today');
    if (jumpToday) {
      jumpToday.addEventListener('click', function () {
        openDay(today > 0 ? today : 1, true);
      });
    }
    var togglePath = document.getElementById('tdx-toggle-path');
    if (togglePath) {
      togglePath.addEventListener('click', function () {
        var path = document.getElementById('tdx-path');
        if (!path) return;
        var compact = path.classList.toggle('is-compact');
        togglePath.textContent = compact ? 'Show all 30 days' : 'Show compact path';
      });
    }

    var shareSeason = document.getElementById('tdx-share-season');
    if (shareSeason) {
      shareSeason.addEventListener('click', function () {
        shareText(
          '30 Days of Christmas. Hard distribution for kids who wake up alone. Freights. Carols. Named hearts. Orphan Christmas · Shibahumanityhub',
          'https://shibahumanityhub.com/programs/orphan-christmas.html#tdx-heart'
        );
      });
    }

    /* Freight share + pick */
    root.querySelectorAll('[data-share-freight]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-share-freight');
        var f = FREIGHTS.filter(function (x) { return x.id === id; })[0];
        if (!f) return;
        var line = f.sponsor
          ? 'Freighter ' + f.id + ' · ' + f.route + '. Sponsored from the hearts of ' + f.sponsor + '.'
          : 'Freighter ' + f.id + ' · ' + f.route + '. Open for a heart.';
        shareText(line + ' Orphan Christmas.', 'https://shibahumanityhub.com/programs/orphan-christmas.html#tdx-freight');
      });
    });
    root.querySelectorAll('[data-pick-freight]').forEach(function (a) {
      a.addEventListener('click', function () {
        var id = a.getAttribute('data-pick-freight');
        var sel = document.getElementById('tdx-freight-pick');
        if (sel && id) sel.value = id;
      });
    });

    /* Living freights (gentle preview motion) */
    setInterval(function () {
      root.querySelectorAll('.tdx-fr').forEach(function (fr, i) {
        if (i % 2 === (Math.floor(Date.now() / 5000) % 2)) return;
        var bar = fr.querySelector('[data-fr-bar]');
        var base = parseInt(fr.getAttribute('data-progress'), 10) || 10;
        var wobble = base + Math.floor(Math.random() * 3) - 1;
        if (wobble < 5) wobble = 5;
        if (wobble > 92) wobble = 92;
        if (bar) bar.style.width = wobble + '%';
      });
    }, 5000);

    /* Cheer feed */
    var cheer = document.getElementById('tdx-cheer');
    var lines = [
      ['@host', 'Day board is lit. Freight FX-211 rolling in the preview lane.'],
      ['@vessymink', 'Warming up carols for Friday. Soft room. Open hearts.'],
      ['@northlight', 'From the hearts of Northlight Energy Co. — dinners for a whole floor.'],
      ['@elf', 'Sibling crate sealed. Gold paper. Names stay private.'],
      ['@anon', 'Anonymous again. Just move the truck.'],
      ['@santa_ops', 'Consent first. Cameras second. Kids always first.'],
      ['@hopeseed', 'You are 1. We are all 1. Pack another bag.'],
      ['@chat', 'Daily prize draw after AMA. Be kind or be gone.'],
      ['@driver', 'Cold route prep for Fort McMurray. Pray for the roads.'],
      ['@maple', 'This freighter sponsored from the hearts of Maple Family Trust.']
    ];
    var li = 0;
    function pushCheer() {
      if (!cheer) return;
      var L = lines[li % lines.length];
      li++;
      var div = document.createElement('div');
      div.className = 'line';
      var gift = /hearts of|sponsored/i.test(L[1]);
      div.innerHTML = '<b>' + esc(L[0]) + '</b> <span class="' + (gift ? 'gift' : '') + '">' + esc(L[1]) + '</span>';
      cheer.appendChild(div);
      while (cheer.children.length > 10) cheer.removeChild(cheer.firstChild);
      cheer.scrollTop = cheer.scrollHeight;
    }
    pushCheer();
    setInterval(pushCheer, 3600);

    /* Freight bar animate on view */
    if (typeof IntersectionObserver !== 'undefined') {
      var bars = root.querySelectorAll('.tdx-bar > i');
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            var w = en.target.style.width;
            en.target.style.width = '0';
            requestAnimationFrame(function () {
              en.target.style.width = w;
            });
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.3 });
      bars.forEach(function (b) { io.observe(b); });
    }

    /* Form + auto ribbon + restore intent */
    var form = document.getElementById('tdx-form');
    var nameIn = document.getElementById('tdx-name');
    var noteIn = document.getElementById('tdx-note');
    var pubIn = document.getElementById('tdx-public');
    var noteTouched = false;
    if (noteIn) {
      noteIn.addEventListener('input', function () { noteTouched = true; });
    }
    function syncRibbon() {
      if (!noteIn || noteTouched) return;
      var name = (nameIn && nameIn.value || '').trim();
      var isPublic = !pubIn || pubIn.checked;
      if (isPublic && name) {
        noteIn.value = 'This donation sponsored from the hearts of ' + name;
      } else if (!isPublic) {
        noteIn.value = 'Anonymous heart. Quiet love. Real packs.';
      }
    }
    if (nameIn) nameIn.addEventListener('input', syncRibbon);
    if (pubIn) pubIn.addEventListener('change', function () {
      noteTouched = false;
      syncRibbon();
    });
    try {
      var saved = JSON.parse(localStorage.getItem('shh_tdx_intent') || 'null');
      if (saved && form) {
        if (nameIn && saved.label && saved.label !== 'Anonymous') nameIn.value = saved.label;
        var fp = document.getElementById('tdx-freight-pick');
        if (fp && saved.freight) fp.value = saved.freight;
        if (noteIn && saved.note) {
          noteIn.value = saved.note;
          noteTouched = true;
        }
        if (pubIn && typeof saved.public === 'boolean') pubIn.checked = saved.public;
      }
    } catch (eRest) { /* ignore */ }

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var truth = document.getElementById('tdx-truth');
        if (truth && !truth.checked) {
          toast('Check the truth box first. We do not take pretend payments.');
          return;
        }
        var name = (document.getElementById('tdx-name') || {}).value || '';
        var freight = (document.getElementById('tdx-freight-pick') || {}).value || '';
        var note = (document.getElementById('tdx-note') || {}).value || '';
        var isPublic = document.getElementById('tdx-public') ? document.getElementById('tdx-public').checked : true;
        name = name.trim();
        note = note.trim();
        if (!note) {
          note = isPublic && name
            ? 'This donation sponsored from the hearts of ' + name
            : 'Anonymous heart on freighter ' + freight;
        }
        try {
          var payload = {
            label: name || 'Anonymous',
            freight: freight,
            note: note,
            public: isPublic,
            at: new Date().toISOString()
          };
          localStorage.setItem('shh_tdx_intent', JSON.stringify(payload));
        } catch (err) { /* ignore */ }

        if (isPublic && name) {
          toast('Held. When rails are live: “' + note.slice(0, 60) + (note.length > 60 ? '…' : '') + '”');
          var wall = document.getElementById('tdx-wall');
          if (wall) {
            var card = document.createElement('div');
            card.className = 'tdx-donor';
            card.innerHTML =
              '<div class="type">Your intent</div>' +
              '<div class="who">' + esc(name) + '</div>' +
              '<div class="line">' + esc(freight) + ' · waiting for live rails</div>' +
              '<span class="tdx-ribbon">' + esc(note) + '</span>';
            wall.insertBefore(card, wall.firstChild);
          }
          if (mHearts) {
            var hv = parseInt(mHearts.textContent, 10) || 0;
            mHearts.textContent = String(hv + 1);
          }
        } else {
          toast('Quiet love noted. Anonymous intent saved on this device.');
        }
      });
    }

    /* Open today detail lightly on load */
    setTimeout(function () {
      openDay(today > 0 ? today : 1, false);
    }, 500);

    /* Rail highlight */
    var railLinks = root.querySelectorAll('.tdx-rail a');
    if (typeof IntersectionObserver !== 'undefined' && railLinks.length) {
      var sections = ['tdx-heart', 'tdx-days', 'tdx-freight', 'tdx-stage', 'tdx-givers', 'tdx-sponsor']
        .map(function (id) { return document.getElementById(id); })
        .filter(Boolean);
      var rio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var id = en.target.id;
          railLinks.forEach(function (a) {
            a.classList.toggle('is-on', a.getAttribute('href') === '#' + id);
          });
        });
      }, { rootMargin: '-40% 0px -45% 0px', threshold: 0 });
      sections.forEach(function (sec) { rio.observe(sec); });
    }
  }

  function mount(host) {
    if (!host) return null;
    styles();
    var today = seasonDayIndex();
    host.innerHTML = html(today);
    wire(host, today);
    return host;
  }

  window.SHHThirtyDaysChristmas = {
    mount: mount,
    seasonDayIndex: seasonDayIndex,
    DAY_THEMES: DAY_THEMES
  };
})();
