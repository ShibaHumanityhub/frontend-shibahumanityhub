/**
 * Shared plain-language glossary · circled ⓘ info icons
 * For every age, gender, background, and walk of life.
 * Self-injects styles + modal so every page that loads this works.
 */
(function () {
 'use strict';

 var GLOSSARY = {
  'mercy flywheel': {
   title: 'Mercy Flywheel',
   simple:
    'A loop that keeps helping. When people hold or use the tokens, a small part is meant to fund real help for dogs and people. That help creates more stories, more trust, and more people joining. Like a wheel that turns itself once it is spinning.',
   impact: 'You do not need to be rich or technical. Quiet participation can keep real mercy moving.'
  },
  flywheel: {
   title: 'Flywheel',
   simple:
    'A simple picture for a system that builds power as it turns. Here it means: hold → fund programs → save or heal lives → more people care → the mission grows.',
   impact: 'One action feeds the next. That is the assignment in plain words.'
  },
  soulbound: {
   title: 'Soulbound',
   simple:
    'A digital record that stays with one dog or one story forever. It cannot be sold or given away like a trading card. Think of a permanent medical-and-life passport for that soul.',
   impact: 'No dog is erased when they move homes. Their story travels with them.'
  },
  'circles of mercy': {
   title: 'Circles of Mercy',
   simple:
    'Levels of ongoing help based on how much of a token someone holds. Starter (Mercy), bigger (Guardian), long-term (Eternal). Not a ranking of human worth. A design for different sizes of support.',
   impact: 'Holding more is designed to unlock larger or longer help for the programs.'
  },
  'mercy circle': {
   title: 'Mercy Circle',
   simple:
    'The starting support level. Holding a set amount of $NIBBLES or $hopeseed is designed to begin regular help (for example senior visits) when funding rails are live.',
   impact: 'This is where steady, gentle help is meant to begin.'
  },
  'guardian circle': {
   title: 'Guardian Circle',
   simple:
    'A deeper support level. Holding more is designed to power more visits or bigger program support, with updates when the system is live.',
   impact: 'You become a more active guardian of the good being built.'
  },
  'eternal guardian': {
   title: 'Eternal Guardian Circle',
   simple:
    'The highest design level. Built for long-term legacy support and lasting recognition when rails are live. Still design until funded.',
   impact: 'For people who want their yes to outlast a single season.'
  },
  'visit activities': {
   title: 'Visit Activities',
   simple:
    'Simple shared joys during a therapy visit: bingo, lunch, stories, tea, gentle walks, petting. Activities seniors and dogs can both enjoy. No one needs special skills to receive this kind of company.',
   impact: 'These moments bring light back into quiet rooms.'
  },
  nibbles: {
   title: '$NIBBLES',
   simple:
    'One of two tokens on this project. $NIBBLES is centered on dogs: shelter rescue, therapy, disaster K9, forever homes, senior care. Holding it is designed to support those programs when funding rails are live. You do not need crypto knowledge to understand the mission: dogs and the people they heal.',
   impact: 'Think of it as the dog-side fuel of the flywheel.'
  },
  hopeseed: {
   title: '$hopeseed',
   simple:
    'The other token. $hopeseed is centered on people: children, families, birthdays, food, education bridges, rebuilding lives. Holding it is designed to support those programs when funding rails are live.',
   impact: 'Think of it as the human-side seed of the flywheel.'
  },
  token: {
   title: 'Token',
   simple:
    'A digital unit on a blockchain (like a special coin in software). Here, two tokens ($NIBBLES and $hopeseed) are designed so holding and trading can fund real-world help. You can care about the mission without buying anything yet. Much of this site is design until funding is real.',
   impact: 'Tokens are a tool. The assignment is still people helping people and dogs.'
  },
  hold: {
   title: 'Hold / Holding',
   simple:
    'Keeping tokens in a wallet instead of selling them right away. The design idea: holding can fund programs through the flywheel when tax and impact rails are live.',
   impact: 'Holding is meant to be quiet participation, not a shouting contest.'
  },
  'when funded': {
   title: 'When Funded / Design Only',
   simple:
    'Honest language. Right now many pages show the plan and tools. Real dogs, real deliveries, and real payments start when money, partners, and legal rails are actually live. We refuse fake claims.',
   impact: 'If something is not real yet, we say so. That protects trust for every visitor.'
  },
  'design only': {
   title: 'Design Only',
   simple:
    'A demo or plan on the website, not a live shipment or live payment. You can explore, save intents, and learn the model. Checkout and delivery come later when rails are real.',
   impact: 'You can still belong to the vision without being sold a fantasy.'
  },
  rails: {
   title: 'Rails / Funding Rails',
   simple:
    'The real pipes that move money and goods safely: bank or crypto checkout, partners, shipping, receipts, and legal charity paths. Without rails, help stays a design. With rails, help can leave the building.',
   impact: 'Pretty pages are not enough. Rails make mercy practical.'
  },
  intent: {
   title: 'Intent',
   simple:
    'A saved “I want to help this way” note on your device or form. Not a charge. Not a fake receipt. When funding is live, intent can become a real gift with proof.',
   impact: 'You can stand with a program before the checkout button exists.'
  },
  treasury: {
   title: 'Treasury',
   simple:
    'Shared mission money set aside for big, permanent things: land, buildings, emergency care reserves. Different from a monthly sponsor paying for one group of dogs.',
   impact: 'Treasury builds the ground. Sponsors fund the warm rooms on it.'
  },
  'barn campus': {
   title: 'Shiba Barn Campus',
   simple:
    'A planned sanctuary campus: land, a house for caretakers, a big heated barn that grows bay by bay, and small groups of dogs (cells of 5 to 10) so no one is packed like a warehouse.',
   impact: 'Scale without crushing souls. Massive shell. Small homes.'
  },
  'pod cell': {
   title: 'Pod / Cell',
   simple:
    'One named group of 5 to 10 dogs in the same warm room kit. A company can sponsor one cell without guessing. The hard max is 10. Never “just one more” forever.',
   impact: 'A clear product of care, not a vague “help the barn.”'
  },
  'density engine': {
   title: 'Density Engine',
   simple:
    'A calculator that answers: how many dogs can this land honestly hold? It uses acres, number of cells, and dogs per cell. If land is too small, it opens fewer dogs. Love that ignores land math becomes a warehouse of fear.',
   impact: 'Honesty over ego. Capacity tells the truth as you type.'
  },
  'comfort band': {
   title: 'Comfort Band',
   simple:
    'A design rule about space per dog (about 0.2 acres per living dog as a comfort target). Harder floors exist, but hard is not a goal. Comfort is.',
   impact: 'Dogs need room to be dogs, not numbers on a chart.'
  },
  'new beginnings': {
   title: 'New Beginnings Home Start Packs',
   simple:
    'Kits for the first weeks after adoption: bed, leash, toys, food, and more. When live, packs come from partners with receipts so homes are ready and dogs stay instead of returning to the shelter.',
   impact: 'Dogs do not fail adoptions. Unready homes do. We fund readiness.'
  },
  'home start pack': {
   title: 'Home Start Pack',
   simple:
    'A built kit for a dog’s first weeks home. Different sizes, clear items. You see what the gift buys.',
   impact: 'No mystery black box. Clear help for real kitchens and living rooms.'
  },
  'healing hearts': {
   title: 'Healing Hearts',
   simple:
    'A therapy-dog network plan: train shelter dogs with handlers, then place them in hospitals, schools, hospice, and community spaces. Senior home visits go through Silver Paws, which this network is designed to feed.',
   impact: 'Dogs get purpose. People get a calm heart beside them.'
  },
  'star souls': {
   title: 'Star Souls',
   simple:
    'Not a separate program. The name for the dogs on the Healing Hearts roster: their stories and design “gig” lanes. Seniors still use Silver Paws for visits.',
   impact: 'One network. Clear names. No fake third program.'
  },
  'silver paws': {
   title: 'Silver Paws',
   simple:
    'Gentle therapy visits for seniors (in homes, residences, and quiet settings). Packages can include bingo, lunch, stories, and a photographer for soul-friend portraits when live.',
   impact: 'Loneliness fades. Photos remain. Elders remember they still matter.'
  },
  'visit photographer': {
   title: 'Visit Photographer',
   simple:
    'A quiet photographer on Silver Paws visits (design). Consent first. Soft pictures so seniors can hold the friendship in their hands after the dog leaves.',
   impact: 'Memory becomes something you can frame.'
  },
  'soulbound nft': {
   title: 'Soulbound NFT / Rescue Passport',
   simple:
    'A permanent digital passport for a rescued dog’s life story. “NFT” just means a unique digital item. Soulbound means it cannot be sold off the dog’s identity.',
   impact: 'This soul is not lost in paperwork again.'
  },
  'golden paws': {
   title: 'Golden Paws',
   simple:
    'A path for senior shelter dogs and retiring service dogs into carefully screened forever homes. When funded, the program is designed to help cover ongoing care so love is not a debt.',
   impact: 'Heroes and grey faces finally get the sofa they earned.'
  },
  'certified forever home': {
   title: 'Certified Forever Home',
   simple:
    'A home that passed hard screening: identity, environment, lifestyle fit, vet plan, written forever promise, and check-ins. Love with responsibility.',
   impact: 'The dog is never an impulse buy and never abandoned mid-story.'
  },
  'golden years companion': {
   title: 'Golden Years Companion',
   simple:
    'Matching seniors (about 60+) with calm adult shelter dogs, with lifetime support for the dog designed so the elder can focus on love. Different from Golden Paws (which places retiring dogs into forever homes).',
   impact: 'Two lonely souls become each other’s quiet home.'
  },
  'golden pair': {
   title: 'Golden Pair',
   simple:
    'One matched senior and one steady dog living together with full support for the dog when the program is live.',
   impact: 'Proof that no one has to face the quiet alone.'
  },
  'welcome home grant': {
   title: 'Welcome Home Grant',
   simple:
    'A one-time starter gift (design amount on the program page) for bed, crate, leash, first vet visit, and basics so day one feels safe.',
   impact: 'Dignity from the first night.'
  },
  'lifetime support': {
   title: 'Lifetime Support',
   simple:
    'Monthly help for food and needs, plus an emergency vet buffer design, so the senior is not crushed by dog bills for the rest of the dog’s life.',
   impact: 'The elder gives love. The program carries the costs when live.'
  },
  'wellness check-ins': {
   title: 'Wellness Check-ins',
   simple:
    'A few gentle check-ins each year (video or in person) to make sure the dog is well. Private. Kind. If something is wrong, help fixes it. The dog stays.',
   impact: 'Safety without breaking the bond.'
  },
  'senior guardian staking': {
   title: 'Senior Guardian Staking',
   simple:
    'A design where seniors in the program can receive and hold a small share of tokens and keep them supporting the mission, while sharing honest life-with-dog moments. Optional. Never required for love.',
   impact: 'Elders can be participants, not only receivers.'
  },
  'pay it forward': {
   title: 'Pay It Forward Adoption Chain',
   simple:
    'When someone is helped into a forever bond, they are invited to help the next person or dog when they can. Help multiplies. One rescued life becomes many over time. Like a kindness snowball.',
   impact: 'You were lifted. You lift the next. That is the chain.'
  },
  snowball: {
   title: 'Snowball / Everlasting Snowball',
   simple:
    'One act of help that grows. A seat opens, a life is saved, that person or sponsor helps again, capacity grows. Not a get-rich scheme. A mercy machine that compounds kindness.',
   impact: 'Small yeses become permanent capacity.'
  },
  'orphan christmas': {
   title: 'Orphan Christmas',
   simple:
    'A seasonal plan to get real gifts, dinners, and care to verified kids in hard places: orphans, foster youth, youth shelters, families with proof of need. Privacy first. No using children as props.',
   impact: 'Christmas as the gift of love, not noise.'
  },
  '30 days of christmas': {
   title: '30 Days of Christmas',
   simple:
    'A thirty-day path (design) of jobs, freights, carols, and named hearts leading to Christmas. Not a cute calendar only. A season of hard distribution with a soft heart.',
   impact: 'One day. One job. One more morning fixed.'
  },
  'disaster k9': {
   title: 'Global Disaster K9',
   simple:
    'Handler and search dog as a bonded pair: they live and train together so they can deploy when buildings fall or disasters hit. The product is readiness, not a mascot photo.',
   impact: 'Two lives become one light so strangers get another chance.'
  },
  'bonded pair': {
   title: 'Bonded Pair',
   simple:
    'One human handler and one dog who share life, training, rest, and risk as a single unit. Not “a dog that works sometimes.” A full partnership.',
   impact: 'Trust is the technology that still crawls into the dark.'
  },
  verified: {
   title: 'Verified Need',
   simple:
    'Help goes through partners and paperwork that prove the need is real. No random DMs. No scam wish lists. Privacy for kids and seniors still comes first.',
   impact: 'Mercy with guardrails so help lands where it should.'
  },
  'public receipts': {
   title: 'Public Receipts',
   simple:
    'When live, proof that money and goods moved: what was bought, where it went, without exposing private people who should stay private.',
   impact: 'Trust is earned with paper trails, not slogans.'
  },
  'proof over promises': {
   title: 'Proof Over Promises',
   simple:
    'A house rule. We show design honestly. We do not claim trucks, dogs, or miracles that are not real yet. When something is live, we show evidence.',
   impact: 'Every visitor, of any age or background, deserves the truth.'
  },
  'stable care': {
   title: 'Stable Care / Care in Dollars',
   simple:
    'When live, day-to-day care (food, vet, heat, wages) is meant to be paid in steady money people understand (like dollars or stable digital dollars), not only in coins that jump in price.',
   impact: 'Dogs eat even when markets are loud.'
  },
  'impact tax': {
   title: 'Impact Tax (design)',
   simple:
    'A small automatic cut on token activity designed to fund the Impact Wallet and programs. Exact rates and live status belong on the contracts and honest pages when live.',
   impact: 'Trading and holding can feed mercy without a separate donation button every time.'
  },
  'impact wallet': {
   title: 'Impact Wallet',
   simple:
    'The wallet or account designed to receive program funding from the flywheel. Public and inspectable when live.',
   impact: 'Money has a home. Mercy has an address.'
  },
  shibarium: {
   title: 'Shibarium',
   simple:
    'A blockchain network connected to the Shiba Inu ecosystem. This project is designed to live there. You do not need to be a developer to care about the dogs and people.',
   impact: 'The tech is the pipe. The assignment is still love with receipts.'
  },
  'open gate': {
   title: 'Open Gate',
   simple:
    'A checklist before dogs move into a barn campus: permits, insurance, staff, land math green, systems tested. If the gate is not open, dogs do not move in.',
   impact: 'Excitement never outruns safety.'
  },
  isolation: {
   title: 'Isolation Bay',
   simple:
    'A separate quiet space for a dog who is new, sick, or stressed before they join a group. Protects health and dignity.',
   impact: 'Careful first. Pack never first.'
  },
  'death row': {
   title: 'Death-Row Pull',
   simple:
    'Rescuing a dog who is at high risk of being euthanized in a shelter because of time, space, or policy. Time-sensitive. Requires isolation and real capacity, not impulse.',
   impact: 'A clock stops. A life continues.'
  },
  freight: {
   title: 'Freight',
   simple:
    'A truck or shipment of gifts, packs, or supplies moving from a warehouse to a real delivery point. On Orphan Christmas pages, freighters are design previews until partners are live.',
   impact: 'Love needs logistics.'
  },
  'adoption return': {
   title: 'Failed / Returned Adoption',
   simple:
    'When a dog comes back to the shelter after going home. Often because the home lacked gear, training path, money buffer, or support. Not because the dog was “bad.”',
   impact: 'New Beginnings attacks the systems failure, not the dog.'
  },
  sponsor: {
   title: 'Sponsor',
   simple:
    'A person, family, or company that funds a clear unit of care: a cell of dogs, a pack, a dinner, a freight, a visit package. Rights to name and stories can exist. Rights to overcrowd never do.',
   impact: 'Your yes has a shape. Dogs feel it as heat, food, and time.'
  },
  'name plate': {
   title: 'Name Plate',
   simple:
    'A label on a sponsored cell or gift that can say who funded it, if they want to be public. Anonymous is also sacred.',
   impact: 'Honor without turning a dog into a billboard.'
  },
  'path of light': {
   title: 'Path of Light',
   simple:
    'The 30 Days of Christmas journey: three acts (prepare, deliver, protect), doors for each day, and a living progress light. A map for the season, not a gimmick.',
   impact: 'Anyone can walk the path. No special vocabulary required beyond love and honesty.'
  },
  'all are welcome': {
   title: 'All Walks of Life',
   simple:
    'This mission is for every gender, age, color, culture, language, and background. You do not need wealth, crypto skill, or perfect English to understand the assignment: help dogs and people with proof, dignity, and no theater.',
   impact: 'If you can feel a lonely elder or a waiting dog, you already understand enough to begin.'
  },
  sequoia: {
   title: 'Sequoia Living Legacy',
   simple:
    'The living sky layer across Shibahumanityhub. Every animal can sit on a forest registry. Funded life events can plant Giant Sequoia trees with real planting partners. Hospice care stays separate from empty symbolism: comfort first, then memory that grows.',
   impact: 'Warm floors now. Living trees later. Names that do not vanish.'
  },
  'rainbow bridge': {
   title: 'Rainbow Bridge Hospice',
   simple:
    'Soft end-of-life care for senior dogs: warmth, pain relief, love, bucket-list joy when funded. No dog is meant to cross cold or forgotten. Often paired with a sequoia planted in their name.',
   impact: 'Dignity in the last chapter. A tree that keeps breathing after.'
  },
  'bridge tree': {
   title: 'Rainbow Bridge Tree',
   simple:
    'A Giant Sequoia planted (when funded and partners confirm) in the name of a dog who has passed. Not a sticker. A living memorial in the ground.',
   impact: 'Grief becomes something the earth can hold.'
  },
  'living registry': {
   title: 'Sequoia Living Registry',
   simple:
    'A list and story seat for animals in SHH programs. Free as identity design. Trees still need funded seeds and real plant proofs. Everyone can belong. Not everyone gets a free tree on day one without funding.',
   impact: 'No soul erased when a kennel page dies.'
  },
  'shiba sequoia forest': {
   title: 'Shiba Sequoia Forest (@LADS_STFT)',
   simple:
    'Community planting friends who already plant sequoias and grow a reforestation mission with art and music. Design path: SHH funds plant seeds to them and other friends when rails are live, with public proofs.',
   impact: 'Help them help us help the world.'
  }
 };

 var keyBound = false;
 var observerBound = false;

 function injectStyles() {
  if (document.getElementById('shh-glossary-css')) return;
  var s = document.createElement('style');
  s.id = 'shh-glossary-css';
  s.textContent = [
   '.info-icon{display:inline-flex;align-items:center;justify-content:center;width:1.05rem;height:1.05rem;min-width:1.05rem;min-height:1.05rem;',
   'margin-left:.28rem;margin-right:.08rem;font-size:.62rem;line-height:1;font-weight:700;font-style:normal;',
   'border:1px solid rgba(251,191,36,.45);border-radius:9999px;color:#fcd34d;background:rgba(0,0,0,.35);',
   'cursor:pointer;vertical-align:middle;transition:border-color .15s,background .15s,transform .15s,box-shadow .15s;',
   'user-select:none;-webkit-tap-highlight-color:transparent;touch-action:manipulation}',
   '.info-icon:hover,.info-icon:focus-visible{border-color:#fde68a;background:rgba(251,191,36,.16);transform:scale(1.08);',
   'box-shadow:0 0 14px rgba(251,191,36,.35);outline:none}',
   '.info-icon:focus-visible{outline:2px solid rgba(253,230,138,.7);outline-offset:2px}',
   '.explain-modal{position:fixed;inset:0;background:rgba(0,0,0,.86);display:none;align-items:center;justify-content:center;',
   'z-index:400;padding:1.1rem;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}',
   '.explain-modal.show{display:flex}',
   '.explain-card{position:relative;background:linear-gradient(165deg,#121826,#0a0f1c 55%,#080b14);border:1px solid rgba(251,191,36,.35);',
   'border-radius:1.25rem;max-width:min(32rem,100%);width:100%;padding:1.35rem 1.35rem 1.25rem;',
   'box-shadow:0 30px 80px -24px rgba(0,0,0,.85),0 0 40px -16px rgba(251,191,36,.2);color:#e8eef7}',
   '.explain-card h4{margin:0 0 .65rem;font-size:1.2rem;line-height:1.25;color:#fde68a;font-family:Space Grotesk,Inter,system-ui,sans-serif;padding-right:1.5rem}',
   '.explain-card p{margin:0;font-size:.98rem;line-height:1.6;color:rgba(232,238,247,.92)}',
   '.explain-card .impact{margin-top:.85rem;padding:.75rem .85rem;border-radius:.85rem;border:1px solid rgba(110,231,183,.25);',
   'background:rgba(16,185,129,.08);font-size:.9rem;line-height:1.5;color:#a7f3d0}',
   '.explain-card .impact:empty{display:none}',
   '.explain-close{position:absolute;top:.65rem;right:.75rem;width:2.25rem;height:2.25rem;border:0;border-radius:999px;',
   'background:rgba(255,255,255,.06);color:#fde68a;font-size:1.35rem;line-height:1;cursor:pointer;display:grid;place-items:center}',
   '.explain-close:hover{background:rgba(251,191,36,.15)}',
   '.explain-hint{margin-top:.75rem;font-size:.68rem;letter-spacing:.06em;text-transform:uppercase;color:rgba(255,248,231,.4)}',
   '@media(max-width:480px){.explain-card{padding:1.15rem 1rem 1.1rem}.explain-card h4{font-size:1.08rem}.explain-card p{font-size:.94rem}}'
  ].join('');
  document.head.appendChild(s);
 }

 function ensureModal() {
  if (document.getElementById('explain-modal')) return;
  var modal = document.createElement('div');
  modal.id = 'explain-modal';
  modal.className = 'explain-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'explain-title');
  modal.innerHTML =
   '<div class="explain-card">' +
   '<button type="button" class="explain-close" aria-label="Close plain language explanation">&times;</button>' +
   '<h4 id="explain-title"></h4>' +
   '<p id="explain-text"></p>' +
   '<div class="impact" id="explain-impact"></div>' +
   '<p class="explain-hint">Plain language for every walk of life</p>' +
   '</div>';
  document.body.appendChild(modal);
  modal.addEventListener('click', function (e) {
   if (e.target === modal) closeExplain();
  });
  var closeBtn = modal.querySelector('.explain-close');
  if (closeBtn) closeBtn.addEventListener('click', closeExplain);
 }

 function showExplain(termKey) {
  if (!termKey) return;
  var key = String(termKey).toLowerCase().trim();
  var data = GLOSSARY[key];
  if (!data) {
   /* try without $ */
   data = GLOSSARY[key.replace(/^\$/, '')];
  }
  if (!data) return;

  injectStyles();
  ensureModal();

  var title = document.getElementById('explain-title');
  var text = document.getElementById('explain-text');
  var impact = document.getElementById('explain-impact');
  var modal = document.getElementById('explain-modal');
  if (!modal || !title || !text) return;

  title.textContent = data.title;
  text.textContent = data.simple;
  if (impact) impact.textContent = data.impact || '';
  modal.classList.add('show');
  try {
   var closer = modal.querySelector('.explain-close');
   if (closer) closer.focus();
  } catch (e) { /* ignore */ }
 }

 function closeExplain() {
  var modal = document.getElementById('explain-modal');
  if (modal) modal.classList.remove('show');
 }

 function bindIcon(icon) {
  if (!icon || icon.getAttribute('data-shh-bound') === '1') return;
  icon.setAttribute('data-shh-bound', '1');
  if (!icon.getAttribute('role')) icon.setAttribute('role', 'button');
  if (!icon.hasAttribute('tabindex')) icon.setAttribute('tabindex', '0');
  var term = icon.getAttribute('data-term') || '';
  if (!icon.getAttribute('aria-label')) {
   icon.setAttribute('aria-label', 'Plain language: ' + (term || 'more info'));
  }
  if (icon.hasAttribute('title')) icon.removeAttribute('title');

  icon.addEventListener('click', function (e) {
   e.preventDefault();
   e.stopPropagation();
   var t = icon.getAttribute('data-term') || icon.dataset.term;
   if (t) showExplain(t);
  });
  icon.addEventListener('keydown', function (e) {
   if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    var t2 = icon.getAttribute('data-term') || icon.dataset.term;
    if (t2) showExplain(t2);
   }
  });
 }

 function initInfoIcons(root) {
  injectStyles();
  ensureModal();
  var scope = root && root.querySelectorAll ? root : document;
  scope.querySelectorAll('.info-icon').forEach(bindIcon);

  if (!keyBound) {
   keyBound = true;
   document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeExplain();
   });
  }

  if (!observerBound && typeof MutationObserver !== 'undefined') {
   observerBound = true;
   var mo = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
     var nodes = mutations[i].addedNodes;
     for (var j = 0; j < nodes.length; j++) {
      var n = nodes[j];
      if (n.nodeType !== 1) continue;
      if (n.classList && n.classList.contains('info-icon')) bindIcon(n);
      if (n.querySelectorAll) n.querySelectorAll('.info-icon').forEach(bindIcon);
     }
    }
   });
   mo.observe(document.documentElement, { childList: true, subtree: true });
  }
 }

 /** HTML helper for builders: SHHGlossary.i('density engine') */
 function iconHtml(term) {
  var t = String(term || '').replace(/"/g, '&quot;');
  return (
   '<span class="info-icon" data-term="' +
   t +
   '" role="button" tabindex="0" aria-label="Plain language: ' +
   t +
   '">ⓘ</span>'
  );
 }

 window.SHHGlossary = {
  glossary: GLOSSARY,
  showExplain: showExplain,
  closeExplain: closeExplain,
  initInfoIcons: initInfoIcons,
  i: iconHtml,
  icon: iconHtml
 };

 // Back-compat for pages that call global closeExplain / showExplain
 window.closeExplain = closeExplain;
 window.showExplain = showExplain;

 function boot() {
  initInfoIcons();
 }

 if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
 } else {
  boot();
 }
 window.addEventListener('load', function () {
  initInfoIcons();
 });
})();
