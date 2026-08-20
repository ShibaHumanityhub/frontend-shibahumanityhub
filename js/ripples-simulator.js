/**
 * Your Ripples simulator: premium rebuild.
 * Honest thresholds. Soulful impact. Play through scroll while visible.
 * Overrides homepage simulateHolding / updatePersonalView after inline boot.
 */
(function () {
 'use strict';

 function thresholds() {
  if (typeof MERCY_THRESHOLDS !== 'undefined') return MERCY_THRESHOLDS;
  return { MERCY: 25000, GUARDIAN: 100000, ETERNAL: 250000 };
 }

 function prefersReduced() {
  try {
   return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {
   return false;
  }
 }

 function fmt(n) {
  n = Number(n) || 0;
  if (n >= 1000000) return (n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1) + 'M';
  if (n >= 1000) return Math.round(n).toLocaleString();
  return String(Math.round(n));
 }

 function circleMeta(bal) {
  var th = thresholds();
  bal = Number(bal) || 0;
  if (bal >= th.ETERNAL) {
   return {
    key: 'eternal',
    name: 'Eternal Guardian',
    short: 'Eternal',
    next: null,
    need: 0,
    progress: 1,
    rank: 3
   };
  }
  if (bal >= th.GUARDIAN) {
   return {
    key: 'guardian',
    name: 'Guardian',
    short: 'Guardian',
    next: 'Eternal Guardian',
    need: th.ETERNAL - bal,
    progress: (bal - th.GUARDIAN) / (th.ETERNAL - th.GUARDIAN),
    rank: 2
   };
  }
  if (bal >= th.MERCY) {
   return {
    key: 'mercy',
    name: 'Mercy',
    short: 'Mercy',
    next: 'Guardian',
    need: th.GUARDIAN - bal,
    progress: (bal - th.MERCY) / (th.GUARDIAN - th.MERCY),
    rank: 1
   };
  }
  return {
   key: 'supporter',
   name: 'Supporter',
   short: 'Supporter',
   next: 'Mercy',
   need: th.MERCY - bal,
   progress: bal / th.MERCY,
   rank: 0
  };
 }

 var VIGNETTES = {
  NIBBLES: {
   supporter:
    'A holding waiting to cross the first circle. When funded, $NIBBLES turns quiet care into kennel heat, soft bedding, and names that do not get lost.',
   mercy:
    'Mercy Circle for dogs: the next senior meal, the next therapy visit prep, the next death-row pull that gets a real chance instead of a clock.',
   guardian:
    'Guardian Circle: you help keep lanes open. Barn pods stay warm. K9 kits restock. Healing Hearts pairs keep walking hospital halls.',
   eternal:
    'Eternal Guardian on the dog flywheel: you underwrite the spine. Passports. Registries. Lifelong lanes. The mercy does not thin when attention drifts.'
  },
  HOPESEED: {
   supporter:
    'A seed not yet in soil. When funded, $hopeseed becomes Friday backpacks, birthday light, and rooms that feel like someone remembered a child.',
   mercy:
    'Mercy Circle for children: one weekend without hunger, one birthday that is not skipped, one quiet proof that the hallway saw them.',
   guardian:
    'Guardian Circle: you help fund desks of care. Foster wallets grow. Dream rooms take shape. Schools get a run of backpacks, not a one-off.',
   eternal:
    'Eternal Guardian on the child flywheel: you sustain the long arc. Wallets that grow with a child. Christmases that return. A fight fund that does not blink.'
  },
  BOTH: {
   supporter: 'Two flywheels. One mercy. Cast a holding and watch dogs and children light at once.',
   mercy: 'Both Mercy Circles lit. Dogs and children share the same quiet proof: someone planned for them.',
   guardian: 'Both Guardian Circles. The dual flywheel turns with weight. Care on four legs and two.',
   eternal: 'Both Eternal lanes. This is the full design: people helping people, helping the ones who cannot hold a wallet yet.'
  }
 };

 function vignetteFor(token, bal) {
  var meta = circleMeta(bal);
  var pack = VIGNETTES[token] || VIGNETTES.BOTH;
  return pack[meta.key] || pack.supporter;
 }

 function programsFor(token, bal) {
  if (typeof programs === 'undefined' || !programs.length) return [];
  var th = thresholds();
  var list =
   token === 'NIBBLES'
    ? programs.filter(function (p) {
       return p.category === '$NIBBLES';
      })
    : token === 'HOPESEED'
      ? programs.filter(function (p) {
         return p.category === '$hopeseed';
        })
      : programs.slice();
  var limit = 3;
  if (bal >= th.ETERNAL) limit = token === 'BOTH' ? 10 : 8;
  else if (bal >= th.GUARDIAN) limit = token === 'BOTH' ? 8 : 6;
  else if (bal >= th.MERCY) limit = token === 'BOTH' ? 6 : 4;
  else limit = 2;
  return list.slice(0, limit);
 }

 function pulsePond(token) {
  var pond = document.getElementById('yr-pond');
  if (!pond || prefersReduced()) return;
  pond.classList.remove('is-pulse-n', 'is-pulse-h', 'is-pulse-both');
  void pond.offsetWidth;
  var cls =
   token === 'NIBBLES' ? 'is-pulse-n' : token === 'HOPESEED' ? 'is-pulse-h' : 'is-pulse-both';
  pond.classList.add(cls);
  setTimeout(function () {
   pond.classList.remove(cls);
  }, 1600);
 }

 function setActiveChip(amount, token) {
  document.querySelectorAll('.yr-chip').forEach(function (btn) {
   var a = Number(btn.getAttribute('data-amount'));
   var t = btn.getAttribute('data-token');
   var on = a === amount && t === token;
   btn.classList.toggle('is-on', on);
   btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
  document.querySelectorAll('.yr-token-tab').forEach(function (tab) {
   var on = tab.getAttribute('data-token') === token;
   tab.classList.toggle('is-on', on);
   tab.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
 }

 function syncSlider(amount) {
  var slider = document.getElementById('yr-slider');
  var read = document.getElementById('yr-amount-read');
  if (slider) slider.value = String(Math.min(500000, Math.max(0, amount)));
  if (read) read.textContent = fmt(amount);
 }

 function updateNextBar(nBal, hBal) {
  var el = document.getElementById('yr-next');
  if (!el) return;
  var focus = nBal >= hBal ? { bal: nBal, token: '$NIBBLES', color: 'amber' } : { bal: hBal, token: '$hopeseed', color: 'emerald' };
  if (nBal > 0 && hBal > 0 && Math.abs(nBal - hBal) < 1) {
   focus = { bal: Math.min(nBal, hBal), token: 'both flywheels', color: 'dual' };
  }
  if (!(nBal > 0 || hBal > 0)) {
   el.innerHTML =
    '<div class="yr-next-label">Start anywhere</div>' +
    '<div class="yr-next-track"><i style="width:0%"></i></div>' +
    '<div class="yr-next-hint">25,000 opens Mercy Circle on either token. Design only until funding and rails are live.</div>';
   return;
  }
  var meta = circleMeta(focus.bal);
  var pct = Math.max(4, Math.min(100, Math.round(meta.progress * 100)));
  if (!meta.next) {
   el.innerHTML =
    '<div class="yr-next-label">Eternal Guardian reached · ' +
    focus.token +
    '</div>' +
    '<div class="yr-next-track"><i style="width:100%"></i></div>' +
    '<div class="yr-next-hint">The deepest designed lane. Recognition and sustained underwriting when funding is real.</div>';
   return;
  }
  el.innerHTML =
   '<div class="yr-next-label">' +
   fmt(meta.need) +
   ' more to <strong>' +
   meta.next +
   '</strong> · ' +
   focus.token +
   '</div>' +
   '<div class="yr-next-track"><i style="width:' +
   pct +
   '%"></i></div>' +
   '<div class="yr-next-hint">Same thresholds written into the 30 programs. Preview of circle progress, not a live payout.</div>';
 }

 function updateStats(nBal, hBal, touched) {
  var lives = document.getElementById('yr-stat-lives');
  var progs = document.getElementById('yr-stat-progs');
  var circle = document.getElementById('yr-stat-circle');
  var th = thresholds();
  var total = nBal + hBal;
  var base = Math.floor(total / th.MERCY);
  var projected = Math.max(total > 0 ? 1 : 0, base * 3);
  if (lives) {
   if (window.animateValue && !prefersReduced()) {
    var cur = parseInt(lives.textContent.replace(/\D/g, ''), 10) || 0;
    window.animateValue(lives, cur, projected, 700);
   } else {
    lives.textContent = String(projected);
   }
  }
  if (progs) progs.textContent = String(touched.length);
  if (circle) {
   var nM = circleMeta(nBal);
   var hM = circleMeta(hBal);
   if (nM.rank >= hM.rank && nBal > 0) circle.textContent = nM.short + ' · dogs';
   else if (hBal > 0) circle.textContent = hM.short + ' · kids';
   else circle.textContent = '-';
  }
 }

 function renderProgramCards(list) {
  var box = document.getElementById('personal-programs');
  if (!box) return;
  box.innerHTML = '';
  if (!list.length) {
   box.innerHTML =
    '<div class="yr-empty">Cast a ripple or connect a wallet. Programs you would quietly touch will gather here.</div>';
   return;
  }
  list.forEach(function (p, i) {
   var card = document.createElement('button');
   card.type = 'button';
   card.className = 'yr-prog ' + (p.category === '$NIBBLES' ? 'is-n' : 'is-h');
   card.style.animationDelay = prefersReduced() ? '0s' : i * 0.04 + 's';
   var tip = (p.shortDesc || '').slice(0, 90);
   if ((p.shortDesc || '').length > 90) tip += '…';
   card.innerHTML =
    '<span class="yr-prog-ico" aria-hidden="true">' +
    (p.category === '$NIBBLES' ? '🐾' : '🌱') +
    '</span>' +
    '<span class="yr-prog-body">' +
    '<span class="yr-prog-title">' +
    escapeHtml(p.title) +
    '</span>' +
    '<span class="yr-prog-desc">' +
    escapeHtml(tip) +
    '</span>' +
    '</span>' +
    '<span class="yr-prog-go" aria-hidden="true">→</span>';
   card.addEventListener('click', function () {
    if (typeof showProgramModal === 'function') showProgramModal(p.id);
   });
   box.appendChild(card);
  });
 }

 function escapeHtml(s) {
  return String(s || '')
   .replace(/&/g, '&amp;')
   .replace(/</g, '&lt;')
   .replace(/"/g, '&quot;');
 }

 function updateGaugeReadouts(nBal, hBal) {
  var nAmt = document.getElementById('yr-n-amount');
  var hAmt = document.getElementById('yr-h-amount');
  if (nAmt) nAmt.textContent = fmt(nBal);
  if (hAmt) hAmt.textContent = fmt(hBal);
 }

 function buildImpactHtml(nBal, hBal) {
  var parts = [];
  if (nBal > 0) {
   var nC = circleMeta(nBal);
   parts.push(
    'With <strong>' +
     fmt(nBal) +
     ' $NIBBLES</strong> you sit in the <strong>' +
     nC.name +
     ' Circle</strong> for dogs and healers.'
   );
  }
  if (hBal > 0) {
   var hC = circleMeta(hBal);
   parts.push(
    'With <strong>' +
     fmt(hBal) +
     ' $hopeseed</strong> you sit in the <strong>' +
     hC.name +
     ' Circle</strong> for children and quiet hope.'
   );
  }
  if (!parts.length) {
   return 'Every holding is a quiet stone on water. Simulate a circle or connect your wallet to see which of the 30 programs your ripples would touch when funding and rails are live.';
  }
  parts.push(
   ' <span class="yr-truth">Design preview only. Real mercy moves when treasury, partners, and delivery rails are live.</span>'
  );
  return parts.join(' ');
 }

 function enhancedUpdatePersonalView(nBal, hBal, isSim) {
  nBal = Number(nBal) || 0;
  hBal = Number(hBal) || 0;
  var status = document.getElementById('personal-status');
  var impact = document.getElementById('personal-impact');
  var vignette = document.getElementById('yr-vignette');
  var projectionEl = document.getElementById('flywheel-projection');

  if (status) {
   if (isSim && (nBal > 0 || hBal > 0)) {
    status.textContent =
     'Simulated holdings. Same Mercy · Guardian · Eternal thresholds written into every program.';
    status.classList.remove('hidden');
   } else if (!isSim && (nBal > 0 || hBal > 0)) {
    status.textContent = 'Using your wallet holdings from above. Read-only. Truth first.';
    status.classList.remove('hidden');
   } else {
    status.classList.add('hidden');
   }
  }

  var touched = [];
  if (nBal > 0) touched = touched.concat(programsFor('NIBBLES', nBal));
  if (hBal > 0) {
   programsFor('HOPESEED', hBal).forEach(function (p) {
    if (!touched.some(function (t) {
     return t.id === p.id;
    }))
     touched.push(p);
   });
  }

  if (impact) impact.innerHTML = buildImpactHtml(nBal, hBal);

  if (vignette) {
   var vToken = nBal > 0 && hBal > 0 ? 'BOTH' : nBal > 0 ? 'NIBBLES' : hBal > 0 ? 'HOPESEED' : 'BOTH';
   var vBal = Math.max(nBal, hBal);
   vignette.textContent = vignetteFor(vToken, vBal);
   vignette.classList.toggle('is-lit', nBal > 0 || hBal > 0);
  }

  renderProgramCards(touched);
  updateGaugeReadouts(nBal, hBal);
  updateNextBar(nBal, hBal);
  updateStats(nBal, hBal, touched);

  if (typeof updateMercyCircles === 'function') updateMercyCircles(nBal, hBal);
  if (typeof updateCompoundingVisual === 'function') updateCompoundingVisual(nBal + hBal);
  if (typeof updateRippleLayer === 'function') updateRippleLayer(nBal + hBal);
  if (window.updateMercyParticleIntensity) window.updateMercyParticleIntensity(nBal, hBal);

  document.querySelectorAll('#engine-nodes .engine-node').forEach(function (node) {
   var isAffected = touched.some(function (a) {
    return (
     a.title === node.textContent.trim() ||
     node.textContent.indexOf(a.title.substring(0, 10)) !== -1
    );
   });
   node.style.borderColor = isAffected
    ? node.dataset.category === '$NIBBLES'
      ? 'rgba(251,191,36,0.75)'
      : 'rgba(52,211,153,0.75)'
    : '';
   node.style.boxShadow = isAffected ? '0 0 14px -2px rgba(251,191,36,0.35)' : '';
  });

  if (projectionEl) {
   var total = nBal + hBal;
   var th = thresholds();
   if (total > 0) {
    var base = Math.floor(total / th.MERCY);
    var projected = Math.max(1, base * 3);
    projectionEl.innerHTML =
     'Quiet compounding (estimate): through stories and new holders your holding helps invite, this design could touch about <strong><span id="projected-lives">0</span></strong> additional lives over 12 months when funding and rails are live. Conservative. Not a promise.';
    var projNum = document.getElementById('projected-lives');
    if (projNum && typeof animateValue === 'function' && !prefersReduced()) {
     animateValue(projNum, 0, projected, 750);
    } else if (projNum) {
     projNum.textContent = String(projected);
    }
   } else {
    projectionEl.innerHTML = '';
   }
  }

  var shell = document.getElementById('personal-engine');
  if (shell) shell.classList.toggle('yr-has-hold', nBal > 0 || hBal > 0);
 }

 function syncSimGlobals(n, h) {
  window.simN = n;
  window.simH = h;
  try {
   simN = n;
   simH = h;
  } catch (eA) { /* ignore */ }
 }

 function enhancedSimulateHolding(amount, tokenType) {
  amount = Number(amount) || 0;
  tokenType = tokenType || 'NIBBLES';
  var nextN = Number(window.simN) || 0;
  var nextH = Number(window.simH) || 0;
  if (tokenType === 'NIBBLES') nextN = amount;
  else if (tokenType === 'HOPESEED') nextH = amount;
  else if (tokenType === 'BOTH') {
   nextN = amount;
   nextH = amount;
  }
  syncSimGlobals(nextN, nextH);
  var holdN = nextN;
  var holdH = nextH;

  enhancedUpdatePersonalView(holdN, holdH, true);

  var src = document.getElementById('viz-source');
  if (src) {
   if (tokenType === 'BOTH') {
    src.textContent = 'Simulating ' + fmt(amount) + ' on both flywheels';
   } else {
    src.textContent = 'Simulating ' + fmt(amount) + ' ' + tokenType;
   }
  }

  if (typeof highlightEngineStream === 'function') {
   highlightEngineStream(tokenType === 'HOPESEED' ? 'HOPESEED' : 'NIBBLES');
   if (tokenType === 'BOTH') {
    setTimeout(function () {
     highlightEngineStream('HOPESEED');
    }, 400);
   }
  }

  if (typeof updateRippleLayer === 'function') updateRippleLayer(holdN + holdH);
  if (window.updateMercyParticleIntensity) window.updateMercyParticleIntensity(holdN, holdH);

  try {
   localStorage.setItem('lastSimN', String(holdN));
   localStorage.setItem('lastSimH', String(holdH));
  } catch (e) { /* ignore */ }

  if (typeof renderSimulatedRipplePreviews === 'function') {
   renderSimulatedRipplePreviews(holdN + holdH);
  }

  pulsePond(tokenType);
  setActiveChip(amount, tokenType === 'BOTH' ? 'BOTH' : tokenType);
  syncSlider(amount);

  var stage = document.querySelector('.yr-stage');
  if (stage && !prefersReduced()) {
   stage.classList.remove('yr-cast-flash');
   void stage.offsetWidth;
   stage.classList.add('yr-cast-flash');
  }
 }

 function enhancedReset() {
  syncSimGlobals(0, 0);
  enhancedUpdatePersonalView(0, 0, false);
  var src = document.getElementById('viz-source');
  if (src) src.textContent = 'A quiet act of mercy';
  if (typeof updateRippleLayer === 'function') updateRippleLayer(0);
  var simWrapper = document.getElementById('sim-ripple-previews');
  var simContainer = document.getElementById('sim-ripples-list');
  if (simWrapper) simWrapper.classList.add('hidden');
  if (simContainer) simContainer.innerHTML = '';
  setActiveChip(-1, '');
  syncSlider(25000);
  document.querySelectorAll('.yr-token-tab').forEach(function (tab) {
   var on = tab.getAttribute('data-token') === 'NIBBLES';
   tab.classList.toggle('is-on', on);
  });
  try {
   localStorage.removeItem('lastSimN');
   localStorage.removeItem('lastSimH');
  } catch (e2) { /* ignore */ }
 }

 function enhancedCircleExplain(type) {
  var msg =
   type === 'NIBBLES'
    ? 'With $NIBBLES in Mercy Circle and beyond, you quietly support senior dogs, therapy networks, disaster K9s, service dogs, barns, and lifelong lanes. Tap a program card to read the full story.'
    : 'With $hopeseed you plant real seeds for orphan Christmases, Guardian Angel wallets, dream rooms, no-hungry weekends, and the Miracle Fight Fund. Your ripples are designed to build safety and joy for children.';
  var box = document.getElementById('yr-explain');
  if (box) {
   box.hidden = false;
   box.textContent = msg + ' Same thresholds in every program. When funding comes through, mercy flows.';
   clearTimeout(box._t);
   box._t = setTimeout(function () {
    box.hidden = true;
   }, 8000);
  } else if (window.SHHGlossary && window.SHHGlossary.showExplain) {
   /* fall through gentle */
   alert(msg);
  } else {
   alert(msg);
  }
  if (typeof highlightEngineStream === 'function') highlightEngineStream(type);
 }

 function enhancedFootprint() {
  var nBal =
   window.simN ||
   (document.getElementById('nibbles-balance') &&
    parseFloat(document.getElementById('nibbles-balance').textContent)) ||
   0;
  var hBal =
   window.simH ||
   (document.getElementById('hopeseed-balance') &&
    parseFloat(document.getElementById('hopeseed-balance').textContent)) ||
   0;
  var th = thresholds();
  var total = nBal + hBal;
  var base = Math.floor(total / th.MERCY);
  var projected = Math.max(1, base * 3);
  var nCircle = circleMeta(nBal).name;
  var hCircle = circleMeta(hBal).name;
  var refPart = '';
  var refName = window.currentReferralName || '';
  if (refName) {
   refPart =
    '\n\nReferred by: ' +
    refName +
    '\nJoin via my referral: https://shibahumanityhub.com/?ref=' +
    encodeURIComponent(refName);
  }
  var text =
   'With my holding of ' +
   fmt(nBal) +
   ' $NIBBLES (' +
   nCircle +
   ' Circle) and ' +
   fmt(hBal) +
   ' $hopeseed (' +
   hCircle +
   ' Circle), I am quietly turning the mercy flywheel.\n\nDemo projection only: this could touch about ' +
   projected +
   ' additional lives in the next 12 months through the stories and new holders it helps create when funding and impact rails are live.\n\nPeople helping people. Helping people.' +
   refPart +
   '\n\n#PeopleHelpingPeople #MercyFlywheel #YourRipples';

  function ok() {
   var btns = document.querySelectorAll('.footprint-share-btn');
   if (btns.length) {
    var orig = btns[0].innerHTML;
    btns[0].innerHTML = '✓ Copied. Carry it gently.';
    setTimeout(function () {
     if (btns[0]) btns[0].innerHTML = orig;
    }, 2400);
   }
   if (refName && typeof incrementReferralCount === 'function') incrementReferralCount();
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
   navigator.clipboard.writeText(text).then(ok).catch(function () {
    prompt('Copy this Mercy Footprint and share it:', text);
    ok();
   });
  } else {
   prompt('Copy this Mercy Footprint and share it:', text);
   ok();
  }
 }

 function installOverrides() {
  window.simulateHolding = enhancedSimulateHolding;
  window.resetSimulator = enhancedReset;
  window.updatePersonalView = enhancedUpdatePersonalView;
  window.showCircleExplanation = enhancedCircleExplain;
  window.copyMercyFootprint = enhancedFootprint;
 }

 function wireControls() {
  var token = 'NIBBLES';
  var amount = 25000;
  if (document.documentElement.getAttribute('data-yr-wired') === '1') return;
  document.documentElement.setAttribute('data-yr-wired', '1');

  document.querySelectorAll('.yr-token-tab').forEach(function (tab) {
   tab.addEventListener('click', function () {
    token = tab.getAttribute('data-token') || 'NIBBLES';
    document.querySelectorAll('.yr-token-tab').forEach(function (t) {
     t.classList.toggle('is-on', t === tab);
    });
    var slider = document.getElementById('yr-slider');
    if (slider) amount = Number(slider.value) || amount;
    syncSlider(amount);
   });
  });

  document.querySelectorAll('.yr-chip').forEach(function (chip) {
   chip.addEventListener('click', function () {
    amount = Number(chip.getAttribute('data-amount')) || 0;
    token = chip.getAttribute('data-token') || token;
    enhancedSimulateHolding(amount, token);
   });
  });

  var slider = document.getElementById('yr-slider');
  if (slider) {
   slider.addEventListener('input', function () {
    amount = Number(slider.value) || 0;
    syncSlider(amount);
   });
  }

  var cast = document.getElementById('yr-cast');
  if (cast) {
   cast.addEventListener('click', function () {
    var sliderEl = document.getElementById('yr-slider');
    amount = sliderEl ? Number(sliderEl.value) || 0 : amount;
    var onTab = document.querySelector('.yr-token-tab.is-on');
    if (onTab) token = onTab.getAttribute('data-token') || token;
    if (amount <= 0) amount = thresholds().MERCY;
    enhancedSimulateHolding(amount, token);
   });
  }

  var resetBtn = document.getElementById('yr-reset');
  if (resetBtn) resetBtn.addEventListener('click', enhancedReset);
 }

 function init() {
  installOverrides();
  wireControls();
  syncSlider(25000);

  /* If URL already set script-scoped sim, reflect it; else restore localStorage */
  try {
   var params = new URLSearchParams(window.location.search);
   var urlN = parseFloat(params.get('n'));
   var urlH = parseFloat(params.get('h'));
   if (!isNaN(urlN) || !isNaN(urlH)) {
    syncSimGlobals(isNaN(urlN) ? 0 : urlN, isNaN(urlH) ? 0 : urlH);
    enhancedUpdatePersonalView(window.simN, window.simH, true);
   } else {
    var ln = parseFloat(localStorage.getItem('lastSimN') || '');
    var lh = parseFloat(localStorage.getItem('lastSimH') || '');
    if ((!isNaN(ln) && ln > 0) || (!isNaN(lh) && lh > 0)) {
     syncSimGlobals(isNaN(ln) ? 0 : ln, isNaN(lh) ? 0 : lh);
     enhancedUpdatePersonalView(window.simN, window.simH, true);
    } else {
     updateNextBar(0, 0);
     renderProgramCards([]);
    }
   }
  } catch (e3) {
   updateNextBar(0, 0);
   renderProgramCards([]);
  }

  console.log(
   '%c[Your Ripples] Simulator amplified · circles · cast · soul.',
   'color:#34d399;font-family:monospace;'
  );
 }

 /* Install ASAP so dashboard boot uses enhanced updatePersonalView */
 installOverrides();

 if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
   setTimeout(init, 0);
  });
 } else {
  setTimeout(init, 0);
 }
})();
