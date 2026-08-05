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

 /**
 * Live Night schedule (design times until links publish).
 * month is 0-index. year resolves to current season year.
 * link: null until real X Space / stream URL exists.
 */
 var LIVE_NIGHTS = [
 { id: 'open-ama', m: 10, d: 25, time: '7:00 PM MT', end: '8:30 PM', title: 'Season Open AMA', who: 'Host + community', tag: 'AMA', what: 'We open the books. Quiet list. Verified only. First freight board lights.', vibe: 'The room takes a breath. Then we begin.', prize: 'Warmth Token draw', link: null },
 { id: 'carol-1', m: 10, d: 28, time: '7:30 PM MT', end: '9:00 PM', title: 'Carols with Vessymink', who: 'Vessymink + friends', tag: 'MUSIC', what: 'Live Christmas carols. Soft room. Hard mission underneath every note.', vibe: 'Music that makes the warehouse feel like a cathedral.', prize: 'Setlist heart card (design)', link: null },
 { id: 'freight-ama', m: 11, d: 2, time: '7:00 PM MT', end: '8:15 PM', title: 'Freight Friday AMA', who: 'Host · drivers · elves', tag: 'AMA', what: 'Every truck on the board. Routes. Packs. Named hearts. Daily prize.', vibe: 'Watch the board like a scoreboard for mercy.', prize: 'Daily Warmth Token', link: null },
 { id: 'santa-mid', m: 11, d: 7, time: '6:00 PM MT', end: '7:30 PM', title: 'Santa at Partner Events', who: 'Santa + consent team', tag: 'SANTA', what: 'Live video only where partners invite us. Kids first. Cameras second. No exploitation.', vibe: 'Wonder without stealing dignity.', prize: null, link: null },
 { id: 'carol-2', m: 11, d: 12, time: '7:30 PM MT', end: '9:00 PM', title: 'Carol Night II · Vessymink', who: 'Vessymink + guest voices', tag: 'MUSIC', what: 'Second carol night. Teens. Shelters. The songs get softer. The room gets louder with love.', vibe: 'If you only show up once, make it a night with music.', prize: 'Community cheer prize (rules when live)', link: null },
 { id: 'teen-ama', m: 11, d: 16, time: '7:00 PM MT', end: '8:30 PM', title: 'Teen Holy Night AMA', who: 'Host + youth-shelter partners', tag: 'AMA', what: 'Sixteen still deserves Christmas. Gear. Dignity. No pity theater.', vibe: 'Respect over spectacle.', prize: 'Daily Warmth Token', link: null },
 { id: 'santa-late', m: 11, d: 20, time: '5:30 PM MT', end: '7:00 PM', title: 'Santa Live · Final Mile Week', who: 'Santa + floor team', tag: 'SANTA', what: 'Partner floors only. Soft close energy. Consent on every frame.', vibe: 'Last soft miracles before the holy nights.', prize: null, link: null },
 { id: 'eve-eve', m: 11, d: 23, time: '6:00 PM MT', end: '11:00 PM', title: 'Eve Eve · The Room Goes Loud', who: 'Everyone · carols · freights', tag: 'CLIMAX', what: 'Final freights. Continuous cheer. Vessymink segment. Named shoutouts. No spam. Pure hope.', vibe: 'The night the season becomes a roar of love.', prize: 'Finale cheer (legal rules first)', link: null, climax: true },
 { id: 'holy-night', m: 11, d: 24, time: '4:00 PM MT', end: 'Midnight', title: 'Holy Night · Final Drops', who: 'Elves · drivers · the whole circle', tag: 'CLIMAX', what: 'Last mile. Quiet trucks. Full stockings. Carols at dusk. We protect Christmas morning.', vibe: 'Jesus is the reason. These kids are the why.', prize: null, link: null, climax: true }
 ];

 var PRIZES = [
 { day: 'Daily AMA', name: 'Warmth Token', how: 'Be in the live room · kind chat only · random draw (rules when live)' },
 { day: 'Weekly', name: 'Mercy Merch Drop', how: 'Holders + donors enter when season rules publish' },
 { day: 'Carol nights', name: 'Signed setlist card', how: 'Show up for Vessymink night · community prize (design)' },
 { day: 'Eve Eve / Holy Night', name: 'Finale cheer', how: 'Only if charity rails + legal rules are live. Mercy always first.' }
 ];

 function seasonYear(now) {
 now = now || new Date();
 /* If we are past Dec 24, next season is next year; if before Nov 25, still this year's upcoming season */
 if (now.getMonth() === 11 && now.getDate() > 24) return now.getFullYear() + 1;
 return now.getFullYear();
 }

 function seasonDayIndex(now) {
 now = now || new Date();
 var y = seasonYear(now);
 /* During Jan - Oct, show day 0 (pre-season) against upcoming Nov */
 if (now.getMonth() < SEASON_START.m || (now.getMonth() === SEASON_START.m && now.getDate() < SEASON_START.d)) {
 if (now.getFullYear() === y || now < new Date(y, SEASON_START.m, SEASON_START.d)) return 0;
 }
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

 function isClimaxEve(now) {
 now = now || new Date();
 try {
 var q = typeof location !== 'undefined' ? location.search || '' : '';
 if (/[?&](climax|eve|holynight)=1/i.test(q)) return true;
 if (typeof localStorage !== 'undefined' && localStorage.getItem('shh_force_climax') === '1') return true;
 } catch (e) { /* ignore */ }
 var m = now.getMonth();
 var d = now.getDate();
 return m === 11 && (d === 23 || d === 24);
 }

 function nightDate(n, year) {
 year = year || seasonYear();
 return new Date(year, n.m, n.d, 12, 0, 0);
 }

 function nightState(n, now) {
 now = now || new Date();
 var y = seasonYear(now);
 var start = new Date(y, n.m, n.d, 0, 0, 0);
 var end = new Date(y, n.m, n.d, 23, 59, 59);
 if (now < start) return 'upcoming';
 if (now > end) return 'past';
 return 'tonight';
 }

 function nextLiveNight(now) {
 now = now || new Date();
 var y = seasonYear(now);
 var upcoming = LIVE_NIGHTS.filter(function (n) {
 return nightState(n, now) !== 'past';
 });
 if (!upcoming.length) return LIVE_NIGHTS[LIVE_NIGHTS.length - 1];
 var tonight = upcoming.filter(function (n) { return nightState(n, now) === 'tonight'; })[0];
 return tonight || upcoming[0];
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
 '.tdx-stage{display:grid;gap:1rem}',
 '@media(min-width:900px){.tdx-stage{grid-template-columns:1.25fr .85fr;align-items:start}}',
 '.tdx-night{border-left:3px solid var(--gold);padding:.85rem 1rem;background:linear-gradient(90deg,rgba(196,30,58,.2),transparent);border-radius:0 1rem 1rem 0;margin-bottom:.65rem}',
 '.tdx-night .tag{font-size:.55rem;letter-spacing:.14em;text-transform:uppercase;color:#fca5a5}',
 '.tdx-night h4{font-family:Georgia,serif;font-size:1.05rem;margin:.2rem 0;color:#fff}',
 '.tdx-featured{position:relative;overflow:hidden;border-radius:1.4rem;border:1px solid rgba(232,197,71,.45);padding:1.35rem 1.2rem 1.4rem;background:radial-gradient(ellipse 90% 80% at 10% 0%,rgba(196,30,58,.55),transparent 55%),radial-gradient(ellipse 70% 60% at 100% 100%,rgba(13,61,44,.45),transparent 50%),rgba(8,4,6,.92);box-shadow:0 28px 70px -24px rgba(0,0,0,.85),0 0 50px -16px rgba(196,30,58,.4);margin-bottom:1rem}',
 '.tdx-featured::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,transparent 40%,rgba(232,197,71,.06));pointer-events:none}',
 '.tdx-featured > *{position:relative;z-index:1}',
 '.tdx-featured .live-pill{display:inline-flex;align-items:center;gap:.4rem;font-size:.58rem;letter-spacing:.16em;text-transform:uppercase;color:#fecaca;border:1px solid rgba(239,68,68,.5);background:rgba(127,29,29,.45);padding:.35rem .7rem;border-radius:999px;margin-bottom:.75rem}',
 '.tdx-featured .live-pill i{width:7px;height:7px;border-radius:50%;background:#ef4444;box-shadow:0 0 10px #ef4444;animation:tdx-pulse 1.2s ease infinite}',
 '.tdx-featured h3{font-family:Georgia,serif;font-size:clamp(1.35rem,4vw,1.85rem);color:#fff;margin:0 0 .35rem;line-height:1.15}',
 '.tdx-featured .when{font-size:.85rem;color:#fde68a;margin:0 0 .65rem}',
 '.tdx-featured .what{font-size:.95rem;line-height:1.55;color:rgba(255,244,224,.88);margin:0 0 .5rem}',
 '.tdx-featured .vibe{font-family:Georgia,serif;font-style:italic;font-size:.95rem;color:#fca5a5;margin:0 0 .85rem}',
 '.tdx-sched{display:grid;gap:.55rem}',
 '.tdx-night-card{display:grid;grid-template-columns:auto 1fr;gap:.75rem;align-items:start;padding:1rem;border-radius:1.1rem;border:1px solid rgba(255,255,255,.1);background:rgba(0,0,0,.38);text-align:left;width:100%;font:inherit;color:inherit;cursor:pointer;transition:border-color .2s,transform .2s,box-shadow .2s}',
 '.tdx-night-card:hover{border-color:rgba(232,197,71,.4);transform:translateY(-1px)}',
 '.tdx-night-card.is-tonight{border-color:rgba(196,30,58,.7);background:linear-gradient(135deg,rgba(107,15,26,.5),rgba(10,6,8,.85));box-shadow:0 0 36px -12px rgba(196,30,58,.55)}',
 '.tdx-night-card.is-past{opacity:.55}',
 '.tdx-night-card.is-on{outline:2px solid rgba(232,197,71,.55);outline-offset:1px}',
 '.tdx-night-date{min-width:3.4rem;text-align:center;padding:.45rem .35rem;border-radius:.75rem;border:1px solid rgba(232,197,71,.3);background:rgba(0,0,0,.35)}',
 '.tdx-night-date b{display:block;font-family:Georgia,serif;font-size:1.2rem;color:#fde68a;line-height:1}',
 '.tdx-night-date span{font-size:.55rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,244,224,.5)}',
 '.tdx-night-body .tag{font-size:.55rem;letter-spacing:.14em;text-transform:uppercase;color:#fca5a5}',
 '.tdx-night-body h4{font-family:Georgia,serif;font-size:1.05rem;margin:.15rem 0 .25rem;color:#fff}',
 '.tdx-night-body p{margin:0;font-size:.8rem;line-height:1.45;color:rgba(255,244,224,.72)}',
 '.tdx-night-body .meta{margin-top:.35rem;font-size:.72rem;color:rgba(253,230,138,.8)}',
 '.tdx-chat-live{border-radius:1rem;border:1px solid rgba(232,197,71,.3);background:rgba(0,0,0,.5);padding:.85rem;min-height:220px;max-height:320px;overflow:auto}',
 '.tdx-chat-live .line{font-size:.75rem;line-height:1.4;color:rgba(255,244,224,.78);margin-bottom:.45rem}',
 '.tdx-chat-live .line b{color:#fde68a}',
 '.tdx-chat-live .line .gift{color:#fecaca}',
 '.tdx-chat-live.is-climax{min-height:280px;max-height:380px;border-color:rgba(196,30,58,.55);box-shadow:inset 0 0 40px rgba(196,30,58,.12)}',
 '.tdx-climax-banner{position:relative;overflow:hidden;border-radius:1.5rem;border:1px solid rgba(253,230,138,.55);margin:0 auto 0;padding:1.5rem 1.2rem 1.6rem;background:radial-gradient(ellipse 100% 90% at 50% -20%,rgba(253,230,138,.35),transparent 50%),radial-gradient(ellipse 80% 70% at 0% 100%,rgba(196,30,58,.55),transparent 55%),radial-gradient(ellipse 70% 60% at 100% 80%,rgba(13,61,44,.4),transparent 50%),#0a0608;box-shadow:0 0 80px -20px rgba(232,197,71,.45),0 30px 80px -30px rgba(196,30,58,.5)}',
 '.tdx-climax-banner .k{font-size:.62rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(253,230,138,.9);margin:0 0 .5rem}',
 '.tdx-climax-banner h2{font-family:Georgia,serif;font-size:clamp(1.6rem,5.5vw,2.4rem);line-height:1.1;margin:0 0 .65rem;color:#fff;text-shadow:0 0 40px rgba(196,30,58,.5)}',
 '.tdx-climax-banner p{margin:0;font-size:clamp(.95rem,3vw,1.1rem);line-height:1.55;color:rgba(255,244,224,.9);max-width:38rem}',
 '.tdx-climax-banner .stars{position:absolute;inset:0;pointer-events:none;opacity:.35;background-image:radial-gradient(1px 1px at 10% 20%,#fff,transparent),radial-gradient(1px 1px at 30% 70%,#fde68a,transparent),radial-gradient(1.5px 1.5px at 70% 30%,#fff,transparent),radial-gradient(1px 1px at 90% 60%,#fca5a5,transparent)}',
 /* CLIMAX EVE MODE */
 '.tdx.is-climax{--crimson:#e11d48;--gold:#fde68a}',
 '.tdx.is-climax .tdx-rail{border-bottom-color:rgba(253,230,138,.45);background:rgba(12,4,8,.96)}',
 '.tdx.is-climax .tdx-rail a.is-on{background:rgba(196,30,58,.35);border-color:rgba(253,230,138,.55);color:#fff}',
 '.tdx.is-climax .tdx-hero-band,.tdx.is-climax .tdx-featured{border-color:rgba(253,230,138,.5);box-shadow:0 0 60px -16px rgba(232,197,71,.5),0 24px 60px -20px rgba(196,30,58,.55)}',
 '.tdx.is-climax .tdx-fr{border-color:rgba(253,230,138,.25);background:linear-gradient(120deg,rgba(196,30,58,.2),rgba(10,6,8,.9))}',
 '.tdx.is-climax .tdx-fr-status{border-color:rgba(253,230,138,.45);color:#fde68a;background:rgba(127,29,29,.4)}',
 '.tdx.is-climax .tdx-bar > i{background:linear-gradient(90deg,#fde68a,#e11d48,#fde68a);background-size:200% 100%;animation:tdx-bar-glow 2.8s linear infinite}',
 '@keyframes tdx-bar-glow{0%{background-position:0% 50%}100%{background-position:200% 50%}}',
 '.tdx.is-climax .tdx-h2 em{background:linear-gradient(90deg,#fff,#fde68a,#fca5a5);-webkit-background-clip:text;background-clip:text}',
 'body.oc-climax-eve{background:#080306!important}',
 'body.oc-climax-eve .oca-hero-bg{background:radial-gradient(ellipse 100% 60% at 50% -10%,rgba(253,230,138,.28),transparent 50%),radial-gradient(ellipse 90% 55% at 50% -5%,rgba(196,30,58,.65),transparent 55%),radial-gradient(ellipse 60% 40% at 100% 90%,rgba(13,61,44,.45),transparent 50%),linear-gradient(180deg,#2a0a12 0%,#0a0608 55%,#050308 100%)!important}',
 'body.oc-climax-eve .oca-live-pill{border-color:rgba(253,230,138,.55);background:rgba(127,29,29,.7);color:#fde68a;box-shadow:0 0 32px rgba(232,197,71,.35)}',
 'body.oc-climax-eve .oca-h1{text-shadow:0 0 60px rgba(253,230,138,.35),0 0 50px rgba(196,30,58,.55),0 2px 0 rgba(0,0,0,.5)}',
 'body.oc-climax-eve .oca-main-feed{border-color:rgba(253,230,138,.5);box-shadow:0 0 0 1px rgba(196,30,58,.35),0 20px 50px -16px rgba(0,0,0,.85),0 0 60px -12px rgba(232,197,71,.4)}',
 'body.oc-climax-eve .oca-ticker{border-color:rgba(253,230,138,.4)}',
 'body.oc-climax-eve .oca-chat{border-color:rgba(196,30,58,.45);max-height:220px;min-height:160px}',
 '@media(min-width:900px){body.oc-climax-eve .oca-chat{max-height:260px;min-height:180px}}',
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

 var MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

 function formatNightWhen(n) {
 return MONTH_SHORT[n.m] + ' ' + n.d + ' · ' + n.time + (n.end ? ' - ' + n.end : '');
 }

 function featuredNightHtml(n, state) {
 if (!n) return '';
 var stateLabel = state === 'tonight' ? 'Tonight' : state === 'past' ? 'Season memory' : 'Next live night';
 var pill = state === 'tonight'
 ? '<div class="live-pill"><i></i> Live tonight · join the room</div>'
 : '<div class="live-pill" style="border-color:rgba(232,197,71,.4);color:#fde68a;background:rgba(0,0,0,.35)"><i style="background:#e8c547;box-shadow:0 0 10px #e8c547;animation:none"></i> ' + stateLabel + '</div>';
 var cta = n.link
 ? '<a class="tdx-cta tdx-cta-gold" href="' + esc(n.link) + '" target="_blank" rel="noopener">Join live now</a>'
 : '<a class="tdx-cta tdx-cta-gold" href="https://x.com/Shibhumanityhub" target="_blank" rel="noopener">Get live times on X</a>';
 return (
 '<div class="tdx-featured" id="tdx-featured-night">' +
 pill +
 '<p class="tdx-kicker" style="margin:0 0 .35rem">' + esc(n.tag) + ' · ' + esc(n.who) + '</p>' +
 '<h3>' + esc(n.title) + '</h3>' +
 '<p class="when">' + esc(formatNightWhen(n)) + '</p>' +
 '<p class="what">' + esc(n.what) + '</p>' +
 '<p class="vibe">“' + esc(n.vibe) + '”</p>' +
 (n.prize ? '<p style="margin:0 0 .85rem;font-size:.78rem;color:rgba(253,230,138,.85)"><strong>Tonight\'s room prize:</strong> ' + esc(n.prize) + '</p>' : '') +
 '<div class="tdx-cta-row" style="margin-top:0">' +
 cta +
 '<a class="tdx-cta tdx-cta-ghost" href="#tdx-schedule">Full schedule</a>' +
 '<button type="button" class="tdx-cta tdx-cta-ghost" id="tdx-share-night">Share this night</button>' +
 '</div>' +
 '<p class="tdx-honest">Stream links publish when the night is real. Until then: date, time, and the promise stay honest.</p>' +
 '</div>'
 );
 }

 function scheduleHtml(now) {
 now = now || new Date();
 return LIVE_NIGHTS.map(function (n) {
 var st = nightState(n, now);
 var cls = 'tdx-night-card' + (st === 'tonight' ? ' is-tonight' : '') + (st === 'past' ? ' is-past' : '');
 return (
 '<button type="button" class="' + cls + '" data-night="' + esc(n.id) + '" aria-pressed="false">' +
 '<div class="tdx-night-date"><b>' + n.d + '</b><span>' + MONTH_SHORT[n.m] + '</span></div>' +
 '<div class="tdx-night-body">' +
 '<div class="tag">' + esc(n.tag) + (st === 'tonight' ? ' · TONIGHT' : st === 'upcoming' ? ' · UPCOMING' : ' · DONE') + '</div>' +
 '<h4>' + esc(n.title) + '</h4>' +
 '<p>' + esc(n.what) + '</p>' +
 '<div class="meta">' + esc(n.time) + (n.end ? ' - ' + esc(n.end) : '') + ' · ' + esc(n.who) + '</div>' +
 '</div>' +
 '</button>'
 );
 }).join('');
 }

 function climaxBannerHtml(climax) {
 if (!climax) return '';
 return (
 '<section class="tdx-sec" id="tdx-climax" style="padding-bottom:0">' +
 '<div class="tdx-climax-banner">' +
 '<div class="stars" aria-hidden="true"></div>' +
 '<p class="k">Holy nights · Dec 23-24</p>' +
 '<h2>The room goes quiet.<br>Then it goes <em style="font-style:normal;color:#fde68a">holy.</em></h2>' +
 '<p>Eve Eve and Christmas Eve. Final freights. Final carols. Named hearts on the wall. No spam. No clout harvest. Just the last miles between a warehouse floor and a child who thought morning would stay empty.</p>' +
 '<div class="tdx-cta-row">' +
 '<a class="tdx-cta tdx-cta-gold" href="#tdx-stage">Enter the live stage</a>' +
 '<a class="tdx-cta tdx-cta-ghost" href="#tdx-freight">Final-mile freights</a>' +
 '<a class="tdx-cta tdx-cta-ghost" href="#oca-broadcast">Warehouse floor</a>' +
 '</div>' +
 '<p class="tdx-honest" style="position:relative;z-index:1;color:rgba(255,244,224,.55)">Climax mode is on. Preview anytime with <code style="color:#fde68a">?climax=1</code> on this URL.</p>' +
 '</div>' +
 '</section>'
 );
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

 function html(today, climax) {
 var meterLabel = today === 0
 ? 'Season opens Nov 25'
 : today >= 30
 ? 'Season complete · mercy continues'
 : 'Day ' + today + ' of 30';
 var meterSub = today === 0
 ? 'Preview the full path now'
 : climax
 ? 'Holy nights · final mile'
 : 'Hard distribution window';
 var next = nextLiveNight();
 var nextState = next ? nightState(next) : 'upcoming';

 return (
 '<div class="tdx' + (climax ? ' is-climax' : '') + '" id="tdx-root">' +
 '<nav class="tdx-rail" aria-label="30 Days chapters">' +
 '<a href="#tdx-heart">Heart</a>' +
 (climax ? '<a href="#tdx-climax">Holy Night</a>' : '') +
 '<a href="#tdx-days">30 Days</a>' +
 '<a href="#tdx-freight">Freight</a>' +
 '<a href="#tdx-stage">Live nights</a>' +
 '<a href="#tdx-givers">Givers</a>' +
 '<a href="#tdx-sponsor">Name a gift</a>' +
 '<a href="#christmas-ops">Build gift</a>' +
 '</nav>' +
 climaxBannerHtml(climax) +

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

 /* STAGE · LIVE NIGHTS */
 '<section class="tdx-sec" id="tdx-stage">' +
 '<p class="tdx-kicker">' + (climax ? 'Holy Night stage · peak cheer' : 'Live night schedule · holiday cheer') + '</p>' +
 '<h2 class="tdx-h2">' + (climax
 ? 'The stadium is open. <em>Stay until the last truck sleeps.</em>'
 : 'Nights worth showing up for. <em>Music. Mercy. A room that feels like home.</em>') + '</h2>' +
 '<p class="tdx-lede">' +
 'AMAs with freight truth. <strong>Vessymink</strong> and friends on carols. ' +
 'Santa only where partners invite us and kids stay protected. ' +
 'Daily prizes for kindness. The chat is the stadium. The freights are the scoreboard.' +
 '</p>' +
 featuredNightHtml(next, nextState) +
 '<div class="tdx-stage">' +
 '<div>' +
 '<p class="tdx-kicker" id="tdx-schedule">Full live schedule</p>' +
 '<div class="tdx-sched" id="tdx-sched">' + scheduleHtml() + '</div>' +
 '<div class="tdx-detail is-on" id="tdx-night-detail" style="margin-top:1rem"></div>' +
 '<p class="tdx-kicker" style="margin-top:1.35rem">Prize ladder (design · rules when live)</p>' +
 '<div class="tdx-grid tdx-grid-2">' + prizeHtml() + '</div>' +
 '</div>' +
 '<div class="tdx-card">' +
 '<h3>' + (climax ? 'Holy Night cheer feed' : 'Live cheer feed') + '</h3>' +
 '<p style="margin-bottom:.65rem">' + (climax
 ? 'Eve energy. Thicker room. Sponsor lines land like candles, not ads.'
 : 'Simulated holiday room until streams go real. Sponsor lines interrupt with love, not spam.') + '</p>' +
 '<div class="tdx-chat-live' + (climax ? ' is-climax' : '') + '" id="tdx-cheer" aria-live="polite"></div>' +
 '<p class="tdx-honest">Preview chat. Real X Spaces / stream links attach to each night when published.</p>' +
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
 return '<option value="' + esc(f.id) + '">' + esc(f.id) + ' - ' + esc(f.route) + '</option>';
 }).join('') +
 '</select></div>' +
 '<div><label for="tdx-note">What should the ribbon say?</label>' +
 '<textarea id="tdx-note" name="note" maxlength="160" placeholder="This donation sponsored from the hearts of…"></textarea></div>' +
 '<label class="tdx-check"><input type="checkbox" id="tdx-public" checked> Show my name on the wall and freighter when live (uncheck to stay anonymous)</label>' +
 '<label class="tdx-check"><input type="checkbox" id="tdx-truth" required> I understand this is intent for when charity rails and funding are live. Not a payment.</label>' +
 '<button type="submit" class="tdx-cta tdx-cta-gold" style="border:0;width:100%;max-width:20rem">Hold my place in the season</button>' +
 '</form>' +
 '<p class="tdx-honest">when funding and delivery are live: real checkout, real receipts, real opt-in wall. Until then your intent stays on this device as a reminder of who you chose to be.</p>' +
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

 function wire(root, today, climax) {
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

 /* Night schedule interactivity */
 var nightDetail = document.getElementById('tdx-night-detail');
 function showNight(id) {
 var n = LIVE_NIGHTS.filter(function (x) { return x.id === id; })[0];
 if (!n || !nightDetail) return;
 var st = nightState(n);
 nightDetail.innerHTML =
 '<p class="tdx-kicker">' + esc(n.tag) + ' · ' + (st === 'tonight' ? 'Tonight' : st === 'past' ? 'Past night' : 'Upcoming') + '</p>' +
 '<h3 style="font-family:Georgia,serif;color:#fff;margin:0 0 .35rem">' + esc(n.title) + '</h3>' +
 '<p style="margin:0 0 .4rem;color:#fde68a;font-size:.9rem">' + esc(formatNightWhen(n)) + ' · ' + esc(n.who) + '</p>' +
 '<p style="margin:0 0 .5rem;color:rgba(255,244,224,.88);line-height:1.55">' + esc(n.what) + '</p>' +
 '<p style="margin:0;font-family:Georgia,serif;font-style:italic;color:#fca5a5">' + esc(n.vibe) + '</p>' +
 (n.prize ? '<p style="margin:.65rem 0 0;font-size:.8rem;color:rgba(253,230,138,.85)"><strong>Room prize:</strong> ' + esc(n.prize) + '</p>' : '') +
 '<div class="tdx-cta-row">' +
 (n.link
 ? '<a class="tdx-cta tdx-cta-gold" href="' + esc(n.link) + '" target="_blank" rel="noopener">Join live</a>'
 : '<a class="tdx-cta tdx-cta-gold" href="https://x.com/Shibhumanityhub" target="_blank" rel="noopener">Watch for the link on X</a>') +
 '<button type="button" class="tdx-cta tdx-cta-ghost" data-share-this-night="' + esc(n.id) + '">Share night</button>' +
 '</div>';
 root.querySelectorAll('.tdx-night-card').forEach(function (c) {
 c.classList.toggle('is-on', c.getAttribute('data-night') === id);
 });
 var sb = nightDetail.querySelector('[data-share-this-night]');
 if (sb) {
 sb.addEventListener('click', function () {
 shareText(
 n.title + ' · ' + formatNightWhen(n) + ' · ' + n.vibe + ' Orphan Christmas · Shibahumanityhub',
 'https://shibahumanityhub.com/programs/orphan-christmas.html#tdx-stage'
 );
 });
 }
 }
 root.querySelectorAll('[data-night]').forEach(function (btn) {
 btn.addEventListener('click', function () {
 showNight(btn.getAttribute('data-night'));
 });
 });
 var nx = nextLiveNight();
 if (nx) showNight(nx.id);

 var shareNight = document.getElementById('tdx-share-night');
 if (shareNight && nx) {
 shareNight.addEventListener('click', function () {
 shareText(
 nx.title + ' · ' + formatNightWhen(nx) + ' · ' + nx.vibe + ' Orphan Christmas',
 'https://shibahumanityhub.com/programs/orphan-christmas.html#tdx-stage'
 );
 });
 }

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

 /* Impact meters (design energy - gentle climb) */
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

 /* Cheer feed - thicker + faster on climax */
 var cheer = document.getElementById('tdx-cheer');
 var lines = climax ? [
 ['@host', 'HOLY NIGHT MODE. Final freights on the board. Stay kind. Stay loud with love.'],
 ['@vessymink', 'Carol soft open. Soft room. Every note for a kid who thought morning was empty.'],
 ['@northlight', 'Sponsored from the hearts of Northlight Energy Co. - whole floor dinners.'],
 ['@elf', 'FX-419 sealed. Last eastbound. Gold paper. Names private.'],
 ['@driver', 'Final mile. Roads are quiet. Hearts are not.'],
 ['@santa_ops', 'Consent first. Cameras second. Kids always first. Always.'],
 ['@maple', 'Sponsored from the hearts of Maple Family Trust. Go with God.'],
 ['@chat', 'No spam. Only cheer. Prize rules only when legal and live.'],
 ['@hopeseed', 'You are 1. We are all 1. One more pack. One more table.'],
 ['@truth', 'Preview room until streams are real. The feeling is already real.'],
 ['@anon', 'Anonymous. Just get it there before morning.'],
 ['@host', 'Eve Eve energy. Named hearts on the wall. Freight board is the scoreboard.']
 ] : [
 ['@host', 'Day board is lit. Freight FX-211 rolling in the preview lane.'],
 ['@vessymink', 'Warming up carols. Soft room. Open hearts.'],
 ['@northlight', 'From the hearts of Northlight Energy Co. - dinners for a whole floor.'],
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
 var maxLines = climax ? 14 : 10;
 while (cheer.children.length > maxLines) cheer.removeChild(cheer.firstChild);
 cheer.scrollTop = cheer.scrollHeight;
 }
 pushCheer();
 setInterval(pushCheer, climax ? 2200 : 3600);

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
 toast('Held. when funding and delivery are live: “' + note.slice(0, 60) + (note.length > 60 ? '…' : '') + '”');
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

 /* Climax freights: push status language */
 if (climax) {
 root.querySelectorAll('.tdx-fr-status').forEach(function (el, i) {
 var finals = ['Final mile', 'Loading holy night', 'En route · last push', 'Dock priority', 'Cold route final', 'Hub clear-out'];
 el.textContent = finals[i % finals.length];
 });
 }

 /* Rail highlight */
 var railLinks = root.querySelectorAll('.tdx-rail a');
 if (typeof IntersectionObserver !== 'undefined' && railLinks.length) {
 var sections = ['tdx-climax', 'tdx-heart', 'tdx-days', 'tdx-freight', 'tdx-stage', 'tdx-givers', 'tdx-sponsor']
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
 var climax = isClimaxEve();
 if (climax) {
 document.body.classList.add('oc-climax-eve');
 } else {
 document.body.classList.remove('oc-climax-eve');
 }
 host.innerHTML = html(today, climax);
 wire(host, today, climax);
 return host;
 }

 window.SHHThirtyDaysChristmas = {
 mount: mount,
 seasonDayIndex: seasonDayIndex,
 isClimaxEve: isClimaxEve,
 LIVE_NIGHTS: LIVE_NIGHTS,
 DAY_THEMES: DAY_THEMES
 };
})();

