/**
 * Dual program flywheels for the Programs dropdown.
 * Two wheels ($NIBBLES amber, $hopeseed emerald), every program on its wheel.
 * Hover a wheel + scroll / drag to rotate. Click a slot to open that program.
 */
(function () {
 'use strict';

 var ITEM_H = 40;
 var VISIBLE = 5;
 var stylesInjected = false;

 function getPrograms() {
 try {
 if (typeof programs !== 'undefined' && Array.isArray(programs)) return programs;
 } catch (e) { /* not in scope */ }
 if (window.programs && Array.isArray(window.programs)) return window.programs;
 return [];
 }

 function injectStyles() {
 var old = document.getElementById('prog-flywheel-nav-css');
 if (old) old.remove();
 stylesInjected = true;
 var css = document.createElement('style');
 css.id = 'prog-flywheel-nav-css';
 css.textContent = [
 '#programs-menu.prog-fw-ready {',
 ' min-width: min(540px, calc(100vw - 20px)) !important;',
 ' max-width: min(560px, calc(100vw - 16px)) !important;',
 ' max-height: min(78vh, 680px);',
 ' overflow-x: hidden;',
 ' overflow-y: auto;',
 ' overscroll-behavior: contain;',
 ' padding-bottom: 8px;',
 '}',
 '#cmd-panel-fw-mount .prog-fw-pair {',
 ' padding: 4px 0 8px;',
 '}',
 '#cmd-panel-fw-mount .prog-fw-viewport {',
 ' height: ' + (ITEM_H * 6) + 'px;',
 '}',
 '@media (min-width: 900px) {',
 ' #cmd-panel-fw-mount .prog-fw-viewport { height: ' + (ITEM_H * 7) + 'px; }',
 '}',
 '.prog-fw-head {',
 ' display: flex; align-items: center; justify-content: space-between; gap: 8px;',
 ' padding: 6px 16px 8px; border-bottom: 1px solid rgba(255,255,255,0.08);',
 ' font-size: 10px; letter-spacing: 2px; color: rgba(110,231,183,0.75); font-weight: 600;',
 '}',
 '.prog-fw-head .count { font-size: 9px; letter-spacing: 0; color: #71717a; font-weight: 500; }',
 '.prog-fw-pair {',
 ' display: grid; grid-template-columns: 1fr 1fr; gap: 12px;',
 ' padding: 12px 12px 6px;',
 '}',
 '@media (max-width: 420px) {',
 ' .prog-fw-pair { grid-template-columns: 1fr; }',
 '}',
 '.prog-fw-col {',
 ' position: relative;',
 ' border-radius: 1.2rem; padding: 12px 8px 12px;',
 ' border: 1px solid transparent;',
 ' background: linear-gradient(165deg, rgba(255,255,255,0.04), rgba(0,0,0,0.35));',
 ' transition: border-color 0.25s ease, box-shadow 0.35s ease, transform 0.25s ease;',
 ' user-select: none;',
 ' overflow: hidden;',
 '}',
 '.prog-fw-col::before {',
 ' content: ""; position: absolute; inset: -40%;',
 ' background: radial-gradient(circle at 50% 20%, var(--fw-glow-soft), transparent 55%);',
 ' opacity: 0.35; pointer-events: none; transition: opacity 0.3s ease;',
 '}',
 '.prog-fw-col.is-hover {',
 ' box-shadow: 0 0 36px -8px var(--fw-glow), 0 0 0 1px var(--fw-border) inset;',
 ' border-color: var(--fw-border);',
 ' transform: translateY(-1px);',
 '}',
 '.prog-fw-col.is-hover::before { opacity: 0.7; }',
 '.prog-fw-col.is-spinning {',
 ' box-shadow: 0 0 48px -6px var(--fw-glow), 0 0 80px -20px var(--fw-glow), 0 0 0 1px var(--fw-border) inset;',
 '}',
 '.prog-fw-col.is-spinning::after {',
 ' content: ""; position: absolute; inset: 0; pointer-events: none; border-radius: inherit;',
 ' background: linear-gradient(105deg, transparent 30%, var(--fw-beam) 48%, transparent 62%);',
 ' background-size: 220% 100%;',
 ' animation: prog-fw-beam 0.55s ease-out;',
 ' opacity: 0.55; mix-blend-mode: screen;',
 '}',
 '@keyframes prog-fw-beam {',
 ' from { background-position: 120% 0; opacity: 0.15; }',
 ' 40% { opacity: 0.7; }',
 ' to { background-position: -40% 0; opacity: 0; }',
 '}',
 '.prog-fw-col.nibbles {',
 ' --fw-accent: #fcd34d;',
 ' --fw-border: rgba(251,191,36,0.5);',
 ' --fw-glow: rgba(251,191,36,0.65);',
 ' --fw-glow-soft: rgba(251,191,36,0.22);',
 ' --fw-active-bg: rgba(251,191,36,0.18);',
 ' --fw-beam: rgba(253,230,138,0.55);',
 ' border-color: rgba(251,191,36,0.25);',
 '}',
 '.prog-fw-col.hopeseed {',
 ' --fw-accent: #6ee7b7;',
 ' --fw-border: rgba(52,211,153,0.5);',
 ' --fw-glow: rgba(52,211,153,0.65);',
 ' --fw-glow-soft: rgba(52,211,153,0.2);',
 ' --fw-active-bg: rgba(52,211,153,0.18);',
 ' --fw-beam: rgba(167,243,208,0.5);',
 ' border-color: rgba(52,211,153,0.25);',
 '}',
 '.prog-fw-top {',
 ' position: relative; z-index: 1;',
 ' display: flex; flex-direction: column; align-items: center; gap: 4px; margin-bottom: 10px;',
 '}',
 '.prog-fw-dial {',
 ' width: 64px; height: 64px; border-radius: 50%; position: relative;',
 ' display: grid; place-items: center;',
 ' filter: drop-shadow(0 0 12px var(--fw-glow-soft));',
 ' transition: filter 0.25s ease, transform 0.25s ease;',
 '}',
 '.prog-fw-col.is-spinning .prog-fw-dial {',
 ' filter: drop-shadow(0 0 22px var(--fw-glow));',
 ' transform: scale(1.06);',
 '}',
 '.prog-fw-dial-orbit {',
 ' position: absolute; inset: -6px; border-radius: 50%;',
 ' border: 1px dashed rgba(255,255,255,0.12);',
 ' animation: prog-fw-orbit 12s linear infinite;',
 ' pointer-events: none;',
 '}',
 '.prog-fw-col.is-spinning .prog-fw-dial-orbit {',
 ' animation-duration: 1.6s;',
 ' border-color: var(--fw-border);',
 '}',
 '@keyframes prog-fw-orbit { to { transform: rotate(360deg); } }',
 '.prog-fw-dial-ring {',
 ' position: absolute; inset: 0; border-radius: 50%;',
 ' transition: transform 0.38s cubic-bezier(0.16, 1, 0.3, 1);',
 ' will-change: transform;',
 '}',
 '.prog-fw-col.is-spinning .prog-fw-dial-ring {',
 ' transition-duration: 0.22s;',
 '}',
 '.prog-fw-col.nibbles .prog-fw-dial-ring {',
 ' background: radial-gradient(circle at 50% 50%, rgba(251,191,36,0.22) 0 26%, transparent 27%),',
 ' conic-gradient(from 0deg, #fbbf24, #78350f, #fde68a, #b45309, #fbbf24);',
 ' box-shadow: 0 0 0 2px rgba(251,191,36,0.35), 0 0 22px -2px rgba(251,191,36,0.75);',
 '}',
 '.prog-fw-col.hopeseed .prog-fw-dial-ring {',
 ' background: radial-gradient(circle at 50% 50%, rgba(52,211,153,0.22) 0 26%, transparent 27%),',
 ' conic-gradient(from 0deg, #34d399, #064e3b, #a7f3d0, #059669, #34d399);',
 ' box-shadow: 0 0 0 2px rgba(52,211,153,0.35), 0 0 22px -2px rgba(52,211,153,0.75);',
 '}',
 '.prog-fw-dial-core {',
 ' position: relative; z-index: 1; width: 36px; height: 36px; border-radius: 50%;',
 ' background: radial-gradient(circle at 40% 35%, #1a2338, #0a0f1c 70%);',
 ' border: 1px solid rgba(255,255,255,0.1);',
 ' display: grid; place-items: center; font-size: 1.05rem; line-height: 1;',
 ' box-shadow: 0 0 12px rgba(0,0,0,0.5) inset;',
 ' transition: transform 0.25s ease;',
 '}',
 '.prog-fw-col.is-spinning .prog-fw-dial-core {',
 ' transform: scale(1.08);',
 ' animation: prog-fw-core-thump 0.35s ease;',
 '}',
 '@keyframes prog-fw-core-thump {',
 ' 0% { transform: scale(0.92); }',
 ' 60% { transform: scale(1.12); }',
 ' 100% { transform: scale(1.08); }',
 '}',
 '.prog-fw-name {',
 ' font-size: 0.8rem; font-weight: 700; color: var(--fw-accent); letter-spacing: 0.02em;',
 ' text-shadow: 0 0 18px var(--fw-glow-soft);',
 '}',
 '.prog-fw-meta {',
 ' font-size: 0.62rem; color: #a1a1aa; line-height: 1.3; text-align: center;',
 '}',
 '.prog-fw-hint {',
 ' font-size: 0.58rem; letter-spacing: 0.12em; text-transform: uppercase;',
 ' color: rgba(161,161,170,0.7); margin-top: 2px;',
 '}',
 '.prog-fw-viewport {',
 ' position: relative; z-index: 1; height: ' + (ITEM_H * VISIBLE) + 'px;',
 ' overflow: hidden; border-radius: 0.95rem;',
 ' background:',
 ' radial-gradient(ellipse 90% 50% at 50% 50%, var(--fw-glow-soft), transparent 70%),',
 ' linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.28) 50%, rgba(0,0,0,0.55));',
 ' border: 1px solid rgba(255,255,255,0.08);',
 ' cursor: grab; touch-action: none;',
 ' perspective: 900px;',
 ' transform-style: preserve-3d;',
 ' mask-image: linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%);',
 ' -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%);',
 ' box-shadow: 0 0 0 1px rgba(0,0,0,0.4) inset, 0 12px 28px -16px rgba(0,0,0,0.7);',
 ' transition: box-shadow 0.25s ease, border-color 0.25s ease;',
 '}',
 '.prog-fw-col.is-spinning .prog-fw-viewport {',
 ' border-color: var(--fw-border);',
 ' box-shadow: 0 0 28px -8px var(--fw-glow), 0 0 0 1px var(--fw-border) inset;',
 '}',
 '.prog-fw-col.is-hover .prog-fw-viewport { cursor: grab; }',
 '.prog-fw-col.is-dragging .prog-fw-viewport { cursor: grabbing; }',
 /* center selection rail */
 '.prog-fw-viewport::before {',
 ' content: ""; position: absolute; left: 5px; right: 5px;',
 ' top: 50%; transform: translateY(-50%); height: ' + ITEM_H + 'px;',
 ' border-radius: 0.7rem; pointer-events: none; z-index: 2;',
 ' background: linear-gradient(90deg, transparent, var(--fw-active-bg), transparent);',
 ' border: 1px solid rgba(255,255,255,0.14);',
 ' box-shadow: 0 0 22px -4px var(--fw-glow), 0 0 0 1px var(--fw-glow-soft) inset;',
 ' transition: box-shadow 0.2s ease, border-color 0.2s ease;',
 '}',
 '.prog-fw-col.is-spinning .prog-fw-viewport::before {',
 ' border-color: var(--fw-accent);',
 ' box-shadow: 0 0 32px -2px var(--fw-glow), 0 0 0 1px var(--fw-border) inset;',
 ' animation: prog-fw-select-pulse 0.4s ease;',
 '}',
 '@keyframes prog-fw-select-pulse {',
 ' 0% { transform: translateY(-50%) scaleX(0.94); opacity: 0.7; }',
 ' 55% { transform: translateY(-50%) scaleX(1.03); opacity: 1; }',
 ' 100% { transform: translateY(-50%) scaleX(1); opacity: 1; }',
 '}',
 /* horizontal energy lines */
 '.prog-fw-viewport::after {',
 ' content: ""; position: absolute; left: 10%; right: 10%; top: 50%; height: 1px;',
 ' transform: translateY(-50%); pointer-events: none; z-index: 4;',
 ' background: linear-gradient(90deg, transparent, var(--fw-accent), transparent);',
 ' opacity: 0.22;',
 '}',
 '.prog-fw-col.is-spinning .prog-fw-viewport::after { opacity: 0.55; }',
 '.prog-fw-track {',
 ' position: absolute; left: 0; right: 0; top: 0;',
 ' transition: transform 0.36s cubic-bezier(0.16, 1, 0.3, 1);',
 ' will-change: transform;',
 ' transform-style: preserve-3d;',
 ' padding-top: ' + (ITEM_H * Math.floor(VISIBLE / 2)) + 'px;',
 ' padding-bottom: ' + (ITEM_H * Math.floor(VISIBLE / 2)) + 'px;',
 '}',
 '.prog-fw-col.is-dragging .prog-fw-track { transition: none; }',
 '.prog-fw-col.is-spinning .prog-fw-track {',
 ' transition-duration: 0.24s;',
 '}',
 '.prog-fw-item {',
 ' height: ' + ITEM_H + 'px; display: flex; align-items: center; justify-content: center;',
 ' padding: 0 12px; text-align: center; font-size: 0.72rem; line-height: 1.2;',
 ' color: #a1a1aa; background: transparent; border: 0; width: 100%;',
 ' cursor: pointer; font-family: inherit;',
 ' position: relative; z-index: 5;',
 ' pointer-events: auto;',
 ' transition: color 0.22s ease, opacity 0.22s ease, text-shadow 0.22s ease, filter 0.22s ease;',
 ' white-space: nowrap; overflow: hidden; text-overflow: ellipsis;',
 ' transform-origin: center center;',
 ' backface-visibility: hidden;',
 ' will-change: transform, opacity, filter;',
 '}',
 '.prog-fw-item.is-active {',
 ' color: var(--fw-accent) !important;',
 ' font-weight: 700; font-size: 0.82rem;',
 ' opacity: 1 !important;',
 ' z-index: 6;',
 ' text-shadow: 0 0 16px var(--fw-glow), 0 0 2px rgba(0,0,0,0.8);',
 ' filter: none !important;',
 '}',
 '.prog-fw-col.is-spinning .prog-fw-item.is-active {',
 ' animation: prog-fw-title-pop 0.38s cubic-bezier(0.16, 1, 0.3, 1);',
 '}',
 '@keyframes prog-fw-title-pop {',
 ' 0% { letter-spacing: -0.02em; filter: blur(1px); }',
 ' 100% { letter-spacing: 0; filter: none; }',
 '}',
 '.prog-fw-item:hover { color: #fafafa; }',
 '.prog-fw-counter {',
 ' position: relative; z-index: 1;',
 ' text-align: center; margin-top: 10px; font-size: 0.68rem; color: #a1a1aa;',
 ' min-height: 1.2em;',
 ' transition: color 0.2s ease, text-shadow 0.2s ease;',
 '}',
 '.prog-fw-col.is-spinning .prog-fw-counter {',
 ' color: var(--fw-accent);',
 ' text-shadow: 0 0 12px var(--fw-glow-soft);',
 '}',
 '.prog-fw-counter strong { color: var(--fw-accent); font-weight: 700; }',
 '.prog-fw-progress {',
 ' position: relative; z-index: 1;',
 ' height: 3px; margin: 8px 10px 0; border-radius: 999px;',
 ' background: rgba(255,255,255,0.06); overflow: hidden;',
 '}',
 '.prog-fw-progress > i {',
 ' display: block; height: 100%; width: 0%; border-radius: inherit;',
 ' background: linear-gradient(90deg, transparent, var(--fw-accent), transparent);',
 ' box-shadow: 0 0 10px var(--fw-glow);',
 ' transition: width 0.32s cubic-bezier(0.16, 1, 0.3, 1);',
 '}',
 '.prog-fw-mission {',
 ' text-align: center; font-size: 10px; letter-spacing: 1.4px; text-transform: uppercase;',
 ' color: rgba(228,228,231,0.55); padding: 8px 14px 10px; line-height: 1.45;',
 '}',
 '.prog-fw-mission strong { color: #fde68a; font-weight: 600; }',
 /* Sitewide: never clamp dual wheels to a skinny list */
 '#programs-menu:not(.prog-fw-ready) { min-width: min(280px, calc(100vw - 24px)); }',
 'nav #programs-dropdown { position: relative; }',
 'nav #programs-menu.prog-fw-ready {',
 ' right: 0; left: auto;',
 '}',
 '@media (min-width: 1100px) {',
 ' nav #programs-menu.prog-fw-ready { left: 50%; right: auto; transform: translateX(-40%); }',
 '}',
 '.prog-fw-foot {',
 ' border-top: 1px solid rgba(255,255,255,0.08); padding: 6px 0 2px;',
 '}',
 '.prog-fw-foot a {',
 ' display: flex; align-items: center; gap: 0.65rem;',
 ' padding: 0.55rem 1.15rem; font-size: 0.85rem; color: inherit; text-decoration: none;',
 ' transition: background 0.15s ease, color 0.15s ease;',
 '}',
 '.prog-fw-foot a:hover { background: rgba(0,249,255,0.08); color: #00f9ff; }',
 '#mobile-menu .prog-fw-pair { padding: 8px 4px; }',
 '#mobile-menu .prog-fw-viewport { height: ' + (ITEM_H * 4) + 'px; }',
 '@media (prefers-reduced-motion: reduce) {',
 ' .prog-fw-track, .prog-fw-dial-ring, .prog-fw-item, .prog-fw-progress > i { transition: none !important; }',
 ' .prog-fw-dial-orbit, .prog-fw-col.is-spinning::after,',
 ' .prog-fw-col.is-spinning .prog-fw-viewport::before,',
 ' .prog-fw-col.is-spinning .prog-fw-item.is-active,',
 ' .prog-fw-col.is-spinning .prog-fw-dial-core { animation: none !important; }',
 '}'
 ].join('\n');
 document.head.appendChild(css);
 }

 /* Flagship experiences beat classic program cards when they exist */
 var EXPERIENCE_URLS = {
  0: 'barn-pods.html',
  2: 'pay-it-forward.html',
  3: 'new-beginnings.html',
  4: 'healing-hearts.html',
  5: 'k9-lifeline.html',
  8: 'golden-paws.html',
  9: 'unified-rescue-registry.html',
  14: 'silver-paws.html',
  15: 'golden-years.html',
  17: 'programs/orphan-christmas.html'
 };

 function inProgramsDir() {
  try {
   return /\/programs\//i.test(location.pathname || '');
  } catch (e) {
   return false;
  }
 }

 function resolveSiteUrl(url) {
  if (!url) return url;
  if (/^https?:\/\//i.test(url) || url.charAt(0) === '#' || url.charAt(0) === '/') return url;
  if (inProgramsDir()) {
   if (url.indexOf('programs/') === 0) return url.replace(/^programs\//, '');
   if (url.indexOf('../') === 0) return url;
   return '../' + url;
  }
  return url;
 }

 function openProgram(id) {
 var menu = document.getElementById('programs-menu');
 if (menu) menu.classList.add('hidden');
 var chevron = document.getElementById('programs-chevron');
 if (chevron) chevron.style.transform = 'rotate(0deg)';
 var btn = document.getElementById('programs-dropdown-btn');
 if (btn) btn.setAttribute('aria-expanded', 'false');
 // Close mobile drawer if open
 var mobile = document.getElementById('mobile-menu');
 if (mobile && !mobile.classList.contains('hidden')) {
 mobile.classList.add('hidden');
 var icon = document.getElementById('mobile-menu-icon');
 if (icon) {
 icon.classList.remove('fa-xmark');
 icon.classList.add('fa-bars');
 }
 }

 var numId = typeof id === 'string' ? parseInt(id, 10) : id;
 var url = EXPERIENCE_URLS[numId] || EXPERIENCE_URLS[String(numId)] || null;
 if (!url) {
  if (typeof window.SHH_programPageUrl === 'function') {
   url = window.SHH_programPageUrl(numId);
  } else if (window.SHH_PROGRAM_PAGES) {
   url = window.SHH_PROGRAM_PAGES[numId] || window.SHH_PROGRAM_PAGES[String(numId)];
  }
 }
 if (url) {
  window.location.href = resolveSiteUrl(url);
  return;
 }
 // Fallback: modal or all-programs deep-link
 if (typeof window.showProgramModal === 'function') {
 window.showProgramModal(numId);
 return;
 }
 window.location.href = resolveSiteUrl('all-programs.html#program-' + numId);
 }

 function shortTitle(title) {
 if (!title) return '';
 if (title.length <= 28) return title;
 return title.slice(0, 26).replace(/\s+\S*$/, '') + '…';
 }

 function createWheel(list, opts) {
 var col = document.createElement('div');
 col.className = 'prog-fw-col ' + opts.theme;
 col.setAttribute('role', 'listbox');
 col.setAttribute('aria-label', opts.label + ' programs');
 col.tabIndex = 0;

 var index = 0;
 var dragY = 0;
 var dragging = false;
 var dragArmed = false;
 var didDrag = false;
 var startY = 0;
 var startIndex = 0;
 var activePointerId = null;
 var spinTimer = null;
 var reduceMotion = false;
 var DRAG_THRESHOLD = 6;
 try {
 reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 } catch (e) { reduceMotion = false; }

 col.innerHTML =
 '<div class="prog-fw-top">' +
 '<div class="prog-fw-dial" aria-hidden="true">' +
 '<div class="prog-fw-dial-orbit"></div>' +
 '<div class="prog-fw-dial-ring" data-ring></div>' +
 '<div class="prog-fw-dial-core">' + opts.emoji + '</div>' +
 '</div>' +
 '<div class="prog-fw-name">' + opts.label + '</div>' +
 '<div class="prog-fw-meta">' + list.length + ' programs · scroll to spin</div>' +
 '<div class="prog-fw-hint">hover + wheel</div>' +
 '</div>' +
 '<div class="prog-fw-viewport" data-viewport>' +
 '<div class="prog-fw-track" data-track></div>' +
 '</div>' +
 '<div class="prog-fw-progress" aria-hidden="true"><i data-progress></i></div>' +
 '<div class="prog-fw-counter" data-counter></div>';

 var track = col.querySelector('[data-track]');
 var ring = col.querySelector('[data-ring]');
 var counter = col.querySelector('[data-counter]');
 var viewport = col.querySelector('[data-viewport]');
 var progress = col.querySelector('[data-progress]');

 list.forEach(function (p, i) {
 var btn = document.createElement('button');
 btn.type = 'button';
 btn.className = 'prog-fw-item';
 btn.setAttribute('role', 'option');
 btn.setAttribute('data-id', String(p.id));
 btn.setAttribute('data-index', String(i));
 btn.title = p.title + ' · open program';
 btn.textContent = shortTitle(p.title);
 btn.addEventListener('click', function (e) {
 e.preventDefault();
 e.stopPropagation();
 // After a drag, suppress accidental click
 if (didDrag) {
 didDrag = false;
 return;
 }
 // Click always opens (snap first if needed)
 if (i !== index) setIndex(i, true);
 openProgram(p.id);
 });
 track.appendChild(btn);
 });

 function applyCylinder(activeIdx) {
 var items = track.querySelectorAll('.prog-fw-item');
 for (var k = 0; k < items.length; k++) {
 var dist = k - activeIdx;
 var abs = Math.abs(dist);
 items[k].classList.toggle('is-active', k === activeIdx);
 items[k].setAttribute('aria-selected', k === activeIdx ? 'true' : 'false');
 if (reduceMotion) {
 items[k].style.transform = '';
 items[k].style.opacity = k === activeIdx ? '1' : '0.65';
 items[k].style.filter = '';
 continue;
 }
 // 3D cylinder: neighbors fall back in space
 var rotX = dist * -14;
 var ty = dist * 1.5;
 var scale = Math.max(0.72, 1 - abs * 0.1);
 var opacity = Math.max(0.18, 1 - abs * 0.28);
 var blur = abs >= 2 ? Math.min(2.2, (abs - 1) * 0.85) : 0;
 items[k].style.transform =
 'perspective(700px) rotateX(' + rotX + 'deg) translateY(' + ty + 'px) scale(' + scale + ')';
 items[k].style.opacity = String(opacity);
 items[k].style.filter = blur ? 'blur(' + blur + 'px)' : 'none';
 }
 }

 function flashSpin() {
 if (reduceMotion) return;
 col.classList.remove('is-spinning');
 // reflow so beam animation can re-trigger
 void col.offsetWidth;
 col.classList.add('is-spinning');
 if (spinTimer) clearTimeout(spinTimer);
 spinTimer = setTimeout(function () {
 col.classList.remove('is-spinning');
 }, 420);
 }

 function setIndex(i, instant) {
 if (!list.length) return;
 var prev = index;
 index = ((i % list.length) + list.length) % list.length;
 var y = -index * ITEM_H;
 if (instant) track.style.transition = 'none';
 track.style.transform = 'translate3d(0, ' + y + 'px, 0)';
 if (instant) {
 void track.offsetHeight;
 track.style.transition = '';
 }
 // dial spins with selection (extra flourish when moving)
 var step = 360 / Math.max(list.length, 1);
 var spinExtra = (!instant && index !== prev) ? (index > prev || (prev === list.length - 1 && index === 0) ? 18 : -18) : 0;
 ring.style.transform = 'rotate(' + (index * step + spinExtra) + 'deg)';
 if (!instant && spinExtra) {
 requestAnimationFrame(function () {
 ring.style.transform = 'rotate(' + (index * step) + 'deg)';
 });
 }
 applyCylinder(index);
 if (!instant && index !== prev) flashSpin();
 var active = list[index];
 counter.innerHTML = '<strong>' + (index + 1) + '</strong> / ' + list.length +
 (active ? ' · ' + shortTitle(active.title) : '');
 if (progress) {
 var pct = list.length <= 1 ? 100 : (index / (list.length - 1)) * 100;
 progress.style.width = pct.toFixed(1) + '%';
 }
 }

 function onWheel(e) {
 e.preventDefault();
 e.stopPropagation();
 var dir = e.deltaY > 0 ? 1 : e.deltaY < 0 ? -1 : 0;
 if (!dir && e.deltaX) dir = e.deltaX > 0 ? 1 : -1;
 // faster flicks jump 2 slots for epic spin
 if (dir && Math.abs(e.deltaY) > 80) dir = dir * 2;
 if (dir) setIndex(index + dir);
 }

 col.addEventListener('wheel', onWheel, { passive: false });
 viewport.addEventListener('wheel', onWheel, { passive: false });

 col.addEventListener('mouseenter', function () { col.classList.add('is-hover'); });
 col.addEventListener('mouseleave', function () {
 col.classList.remove('is-hover');
 if (dragging) endDrag();
 });

 col.addEventListener('keydown', function (e) {
 if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
 e.preventDefault();
 setIndex(index + 1);
 } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
 e.preventDefault();
 setIndex(index - 1);
 } else if (e.key === 'Enter' || e.key === ' ') {
 e.preventDefault();
 if (list[index]) openProgram(list[index].id);
 }
 });

 function endDrag() {
 if (activePointerId != null) {
 try { viewport.releasePointerCapture(activePointerId); } catch (err) { /* already released */ }
 activePointerId = null;
 }
 dragging = false;
 dragArmed = false;
 col.classList.remove('is-dragging');
 setIndex(index);
 }

 // Drag only after a small move so button clicks still fire and open programs
 viewport.addEventListener('pointerdown', function (e) {
 // Ignore non-primary mouse / leave buttons free for click
 if (e.pointerType === 'mouse' && e.button !== 0) return;
 dragArmed = true;
 didDrag = false;
 dragging = false;
 startY = e.clientY;
 startIndex = index;
 dragY = 0;
 activePointerId = e.pointerId;
 });
 viewport.addEventListener('pointermove', function (e) {
 if (!dragArmed && !dragging) return;
 dragY = e.clientY - startY;
 if (!dragging) {
 if (Math.abs(dragY) < DRAG_THRESHOLD) return;
 // Commit to drag: capture only after threshold so clicks work
 dragging = true;
 didDrag = true;
 col.classList.add('is-dragging');
 try { viewport.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
 }
 var offset = Math.round(-dragY / ITEM_H);
 var next = startIndex + offset;
 var clamped = Math.max(0, Math.min(list.length - 1, next));
 if (clamped !== index) {
 index = clamped;
 applyCylinder(index);
 col.classList.add('is-spinning');
 }
 track.style.transform = 'translate3d(0, ' + (-index * ITEM_H + (dragY % ITEM_H) * 0.35) + 'px, 0)';
 var step = 360 / Math.max(list.length, 1);
 ring.style.transform = 'rotate(' + (index * step + dragY * 0.55) + 'deg)';
 var active = list[index];
 counter.innerHTML = '<strong>' + (index + 1) + '</strong> / ' + list.length +
 (active ? ' · ' + shortTitle(active.title) : '');
 if (progress) {
 var pct = list.length <= 1 ? 100 : (index / (list.length - 1)) * 100;
 progress.style.width = pct.toFixed(1) + '%';
 }
 });
 viewport.addEventListener('pointerup', function (e) {
 if (!dragArmed && !dragging) return;
 if (dragging) {
 var offset = Math.round(-(e.clientY - startY) / ITEM_H);
 index = Math.max(0, Math.min(list.length - 1, startIndex + offset));
 endDrag();
 // Keep didDrag true briefly so the trailing click is ignored
 setTimeout(function () { didDrag = false; }, 40);
 return;
 }
 // Click (no drag): let the button's click handler open the program.
 // Also handle clicks on empty viewport chrome (center rail gap).
 dragArmed = false;
 var el = document.elementFromPoint(e.clientX, e.clientY);
 var onItem = el && el.closest && el.closest('.prog-fw-item');
 if (!onItem && list[index]) {
 // Clicked the rail chrome, not a row - open the highlighted center program
 openProgram(list[index].id);
 }
 });
 viewport.addEventListener('pointercancel', function () {
 dragArmed = false;
 if (dragging) endDrag();
 });

 setIndex(0, true);
 return col;
 }

 function buildMount(mount) {
 if (!mount || mount.getAttribute('data-built') === '1') return;
 var list = getPrograms();
 if (!list.length) return;

 injectStyles();
 mount.setAttribute('data-built', '1');
 mount.innerHTML = '';

 var nibbles = list.filter(function (p) { return p.category === '$NIBBLES'; });
 var hopeseed = list.filter(function (p) { return p.category === '$hopeseed'; });

 var pair = document.createElement('div');
 pair.className = 'prog-fw-pair';
 pair.appendChild(createWheel(nibbles, { theme: 'nibbles', label: '$NIBBLES', emoji: '🐾' }));
 pair.appendChild(createWheel(hopeseed, { theme: 'hopeseed', label: '$hopeseed', emoji: '🌱' }));
 mount.appendChild(pair);

 var mission = document.createElement('p');
 mission.className = 'prog-fw-mission';
 mission.innerHTML = '<strong>2 flywheels</strong>, one everlasting snowball · scroll to find your program · when you are lifted, lift the next';
 mount.appendChild(mission);
 }

 function fillMenu(menu) {
 if (!menu) return;
 injectStyles();
 menu.classList.add('prog-fw-ready');

 var allList = getPrograms();
 // Wait for programs-data if not ready yet
 if (!allList.length) {
 if (!menu.getAttribute('data-fw-wait')) {
 menu.setAttribute('data-fw-wait', '1');
 var tries = 0;
 var wait = setInterval(function () {
 tries += 1;
 if (getPrograms().length || tries > 40) {
 clearInterval(wait);
 menu.removeAttribute('data-fw-wait');
 menu.removeAttribute('data-fw-init');
 var m = menu.querySelector('[data-prog-fw-mount]');
 if (m) m.removeAttribute('data-built');
 fillMenu(menu);
 }
 }, 50);
 }
 return;
 }

 // Already built with live wheels: refresh mount only if empty
 if (menu.getAttribute('data-fw-init') === '1') {
 var existing = menu.querySelector('[data-prog-fw-mount]');
 if (existing && existing.querySelector('.prog-fw-pair')) return;
 if (existing) {
 existing.removeAttribute('data-built');
 existing.innerHTML = '';
 buildMount(existing);
 }
 return;
 }
 menu.setAttribute('data-fw-init', '1');

 var totalN = allList.length || 30;
 var isAllPrograms = /all-programs\.html$/i.test(location.pathname);
 var isIndex = /index\.html$/i.test(location.pathname) || location.pathname === '/' || location.pathname.endsWith('/');
 var footLinks = [
 { href: isAllPrograms ? '#all-programs-grid' : resolveSiteUrl('all-programs.html'), icon: '◉', text: 'All ' + totalN + ' Programs' },
 { href: resolveSiteUrl('spin-the-wheel.html'), icon: '🎡', text: 'Spin the Mercy Wheel · Live' },
 { href: resolveSiteUrl('pay-it-forward.html'), icon: '🔗❤️', text: 'Pay It Forward · the snowball' },
 { href: isAllPrograms ? '#nibbles' : resolveSiteUrl('all-programs.html#nibbles'), icon: '🐾', text: 'All $NIBBLES · 16' },
 { href: isAllPrograms ? '#hopeseed' : resolveSiteUrl('all-programs.html#hopeseed'), icon: '🌱', text: 'All $hopeseed · 14' }
 ];
 if (isIndex) {
 footLinks.splice(1, 0, { href: '#programs', icon: '✦', text: 'Featured on this page' });
 }
 if (isAllPrograms) {
 footLinks.splice(1, 0, { href: resolveSiteUrl('index.html'), icon: '↻', text: 'Mercy Flywheel home' });
 }

 menu.innerHTML =
 '<div class="prog-fw-head"><span>2 FLYWHEELS · 1 MISSION</span><span class="count">' + totalN + ' programs · spin to serve</span></div>' +
 '<div data-prog-fw-mount></div>' +
 '<div class="prog-fw-foot" data-prog-fw-foot></div>';

 var foot = menu.querySelector('[data-prog-fw-foot]');
 footLinks.forEach(function (l) {
 var a = document.createElement('a');
 a.href = l.href;
 a.innerHTML = '<span>' + l.icon + '</span><span>' + l.text + '</span>';
 // On all-programs page, hash filter links should also run filterPrograms
 if (isAllPrograms && (l.href === '#nibbles' || l.href === '#hopeseed' || l.href === '#all-programs-grid')) {
 a.addEventListener('click', function () {
 var menuEl = document.getElementById('programs-menu');
 if (menuEl) menuEl.classList.add('hidden');
 var ch = document.getElementById('programs-chevron');
 if (ch) ch.style.transform = 'rotate(0deg)';
 var b = document.getElementById('programs-dropdown-btn');
 if (b) b.setAttribute('aria-expanded', 'false');
 setTimeout(function () {
 if (typeof window.filterPrograms === 'function') {
 if (l.href === '#nibbles') window.filterPrograms('$NIBBLES');
 else if (l.href === '#hopeseed') window.filterPrograms('$hopeseed');
 else window.filterPrograms('all');
 }
 }, 0);
 });
 }
 foot.appendChild(a);
 });
 var gloss = document.createElement('a');
 gloss.href = '#';
 gloss.innerHTML = '<span>?</span><span>Plain Terms Glossary ⓘ</span>';
 gloss.addEventListener('click', function (e) {
 e.preventDefault();
 if (window.SHHGlossary && window.SHHGlossary.showExplain) {
 window.SHHGlossary.showExplain('mercy flywheel');
 }
 });
 foot.appendChild(gloss);

 buildMount(menu.querySelector('[data-prog-fw-mount]'));
 watchMenuOpen(menu);
 }

 /* Soft welcome spin when the Programs dropdown opens */
 function watchMenuOpen(menu) {
  if (!menu || menu.getAttribute('data-fw-watch') === '1') return;
  menu.setAttribute('data-fw-watch', '1');
  var lastHidden = menu.classList.contains('hidden');
  var mo = new MutationObserver(function () {
   var hidden = menu.classList.contains('hidden');
   if (lastHidden && !hidden) {
    softInviteSpin(menu);
   }
   lastHidden = hidden;
  });
  mo.observe(menu, { attributes: true, attributeFilter: ['class'] });
 }

 function softInviteSpin(root) {
  try {
   if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  } catch (e) { /* ignore */ }
  var cols = (root || document).querySelectorAll('.prog-fw-col');
  cols.forEach(function (col, i) {
   setTimeout(function () {
    col.classList.add('is-spinning', 'is-hover');
    var ring = col.querySelector('[data-ring]');
    if (ring) {
     var cur = ring.style.transform || 'rotate(0deg)';
     ring.style.transform = 'rotate(48deg)';
     requestAnimationFrame(function () {
      setTimeout(function () {
       ring.style.transform = cur || 'rotate(0deg)';
       col.classList.remove('is-spinning');
      }, 280);
     });
    } else {
     setTimeout(function () { col.classList.remove('is-spinning'); }, 420);
    }
   }, i * 90);
  });
 }

 function init() {
 var menu = document.getElementById('programs-menu');
 if (menu) fillMenu(menu);

 // Mobile hamburger: same dual wheels
 var mobileMount = document.getElementById('mobile-prog-fw-mount');
 if (mobileMount) {
 injectStyles();
 if (!mobileMount.querySelector('.prog-fw-pair')) {
 mobileMount.removeAttribute('data-built');
 buildMount(mobileMount);
 }
 }
 }

 // Expose for re-init after toggle if programs load late
 window.SHHProgFlywheelNav = {
 init: init,
 openProgram: openProgram,
 /** Build dual wheels into any mount element (command panel, mobile drawer, etc.) */
 buildInto: function (mount) {
 if (!mount) return false;
 injectStyles();
 mount.removeAttribute('data-built');
 mount.innerHTML = '';
 buildMount(mount);
 return !!mount.querySelector('.prog-fw-pair');
 }
 };

 if (document.readyState === 'loading') {
 document.addEventListener('DOMContentLoaded', init);
 } else {
 init();
 }
 // programs-data is defer; rebuild once it lands
 window.addEventListener('load', function () {
 var menu = document.getElementById('programs-menu');
 if (menu) {
 menu.removeAttribute('data-fw-init');
 var m = menu.querySelector('[data-prog-fw-mount]');
 if (m) m.removeAttribute('data-built');
 fillMenu(menu);
 }
 var mobileMount = document.getElementById('mobile-prog-fw-mount');
 if (mobileMount) {
 mobileMount.removeAttribute('data-built');
 mobileMount.innerHTML = '';
 buildMount(mobileMount);
 }
 });
})();
