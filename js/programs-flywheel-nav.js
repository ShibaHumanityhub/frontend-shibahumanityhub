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
    if (stylesInjected) return;
    stylesInjected = true;
    var css = document.createElement('style');
    css.id = 'prog-flywheel-nav-css';
    css.textContent = [
      '#programs-menu.prog-fw-ready {',
      '  min-width: min(520px, calc(100vw - 20px)) !important;',
      '  max-width: min(540px, calc(100vw - 16px)) !important;',
      '  max-height: min(78vh, 640px);',
      '  overflow-x: hidden;',
      '  overflow-y: auto;',
      '  overscroll-behavior: contain;',
      '  padding-bottom: 8px;',
      '}',
      '.prog-fw-head {',
      '  display: flex; align-items: center; justify-content: space-between; gap: 8px;',
      '  padding: 6px 16px 8px; border-bottom: 1px solid rgba(255,255,255,0.08);',
      '  font-size: 10px; letter-spacing: 2px; color: rgba(110,231,183,0.75); font-weight: 600;',
      '}',
      '.prog-fw-head .count { font-size: 9px; letter-spacing: 0; color: #71717a; font-weight: 500; }',
      '.prog-fw-pair {',
      '  display: grid; grid-template-columns: 1fr 1fr; gap: 10px;',
      '  padding: 12px 12px 6px;',
      '}',
      '@media (max-width: 420px) {',
      '  .prog-fw-pair { grid-template-columns: 1fr; }',
      '}',
      '.prog-fw-col {',
      '  border-radius: 1.15rem; padding: 10px 8px 12px;',
      '  border: 1px solid transparent;',
      '  background: linear-gradient(165deg, rgba(255,255,255,0.03), rgba(0,0,0,0.25));',
      '  transition: border-color 0.2s ease, box-shadow 0.2s ease;',
      '  user-select: none;',
      '}',
      '.prog-fw-col.is-hover {',
      '  box-shadow: 0 0 28px -10px var(--fw-glow);',
      '  border-color: var(--fw-border);',
      '}',
      '.prog-fw-col.nibbles {',
      '  --fw-accent: #fcd34d;',
      '  --fw-border: rgba(251,191,36,0.45);',
      '  --fw-glow: rgba(251,191,36,0.55);',
      '  --fw-active-bg: rgba(251,191,36,0.16);',
      '  border-color: rgba(251,191,36,0.22);',
      '}',
      '.prog-fw-col.hopeseed {',
      '  --fw-accent: #6ee7b7;',
      '  --fw-border: rgba(52,211,153,0.45);',
      '  --fw-glow: rgba(52,211,153,0.55);',
      '  --fw-active-bg: rgba(52,211,153,0.16);',
      '  border-color: rgba(52,211,153,0.22);',
      '}',
      '.prog-fw-top {',
      '  display: flex; flex-direction: column; align-items: center; gap: 4px; margin-bottom: 8px;',
      '}',
      '.prog-fw-dial {',
      '  width: 56px; height: 56px; border-radius: 50%; position: relative;',
      '  display: grid; place-items: center;',
      '}',
      '.prog-fw-dial-ring {',
      '  position: absolute; inset: 0; border-radius: 50%;',
      '  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);',
      '  will-change: transform;',
      '}',
      '.prog-fw-col.nibbles .prog-fw-dial-ring {',
      '  background: radial-gradient(circle at 50% 50%, rgba(251,191,36,0.2) 0 26%, transparent 27%),',
      '    conic-gradient(from 0deg, #fbbf24, #78350f, #fde68a, #b45309, #fbbf24);',
      '  box-shadow: 0 0 0 2px rgba(251,191,36,0.3), 0 0 18px -4px rgba(251,191,36,0.65);',
      '}',
      '.prog-fw-col.hopeseed .prog-fw-dial-ring {',
      '  background: radial-gradient(circle at 50% 50%, rgba(52,211,153,0.2) 0 26%, transparent 27%),',
      '    conic-gradient(from 0deg, #34d399, #064e3b, #a7f3d0, #059669, #34d399);',
      '  box-shadow: 0 0 0 2px rgba(52,211,153,0.3), 0 0 18px -4px rgba(52,211,153,0.65);',
      '}',
      '.prog-fw-dial-core {',
      '  position: relative; z-index: 1; width: 34px; height: 34px; border-radius: 50%;',
      '  background: #0a0f1c; border: 1px solid rgba(255,255,255,0.08);',
      '  display: grid; place-items: center; font-size: 1rem; line-height: 1;',
      '}',
      '.prog-fw-name {',
      '  font-size: 0.78rem; font-weight: 700; color: var(--fw-accent); letter-spacing: 0.02em;',
      '}',
      '.prog-fw-meta {',
      '  font-size: 0.62rem; color: #a1a1aa; line-height: 1.3; text-align: center;',
      '}',
      '.prog-fw-hint {',
      '  font-size: 0.58rem; letter-spacing: 0.12em; text-transform: uppercase;',
      '  color: rgba(161,161,170,0.7); margin-top: 2px;',
      '}',
      '.prog-fw-viewport {',
      '  position: relative; height: ' + (ITEM_H * VISIBLE) + 'px;',
      '  overflow: hidden; border-radius: 0.85rem;',
      '  background: rgba(0,0,0,0.35);',
      '  border: 1px solid rgba(255,255,255,0.06);',
      '  cursor: grab; touch-action: none;',
      '  mask-image: linear-gradient(to bottom, transparent 0%, #000 18%, #000 82%, transparent 100%);',
      '  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 18%, #000 82%, transparent 100%);',
      '}',
      '.prog-fw-col.is-hover .prog-fw-viewport { cursor: grab; }',
      '.prog-fw-col.is-dragging .prog-fw-viewport { cursor: grabbing; }',
      '.prog-fw-viewport::before {',
      '  content: ""; position: absolute; left: 6px; right: 6px;',
      '  top: 50%; transform: translateY(-50%); height: ' + ITEM_H + 'px;',
      '  border-radius: 0.65rem; pointer-events: none; z-index: 2;',
      '  background: var(--fw-active-bg);',
      '  border: 1px solid rgba(255,255,255,0.12);',
      '  box-shadow: 0 0 16px -6px var(--fw-glow);',
      '}',
      '.prog-fw-track {',
      '  position: absolute; left: 0; right: 0; top: 0;',
      '  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);',
      '  will-change: transform;',
      '  padding-top: ' + (ITEM_H * Math.floor(VISIBLE / 2)) + 'px;',
      '  padding-bottom: ' + (ITEM_H * Math.floor(VISIBLE / 2)) + 'px;',
      '}',
      '.prog-fw-col.is-dragging .prog-fw-track { transition: none; }',
      '.prog-fw-item {',
      '  height: ' + ITEM_H + 'px; display: flex; align-items: center; justify-content: center;',
      '  padding: 0 10px; text-align: center; font-size: 0.72rem; line-height: 1.2;',
      '  color: #a1a1aa; background: transparent; border: 0; width: 100%;',
      '  cursor: pointer; font-family: inherit; transition: color 0.2s, transform 0.2s, opacity 0.2s;',
      '  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;',
      '}',
      '.prog-fw-item.is-active {',
      '  color: var(--fw-accent); font-weight: 600; font-size: 0.78rem;',
      '  transform: scale(1.04); opacity: 1; z-index: 3; position: relative;',
      '}',
      '.prog-fw-item:not(.is-active) { opacity: 0.72; }',
      '.prog-fw-item:hover { color: #fafafa; }',
      '.prog-fw-counter {',
      '  text-align: center; margin-top: 8px; font-size: 0.65rem; color: #71717a;',
      '}',
      '.prog-fw-counter strong { color: var(--fw-accent); font-weight: 600; }',
      '.prog-fw-mission {',
      '  text-align: center; font-size: 10px; letter-spacing: 2px; text-transform: uppercase;',
      '  color: rgba(228,228,231,0.5); padding: 4px 14px 8px;',
      '}',
      '.prog-fw-mission strong { color: #e4e4e7; font-weight: 600; }',
      '.prog-fw-foot {',
      '  border-top: 1px solid rgba(255,255,255,0.08); padding: 6px 0 2px;',
      '}',
      '.prog-fw-foot a {',
      '  display: flex; align-items: center; gap: 0.65rem;',
      '  padding: 0.55rem 1.15rem; font-size: 0.85rem; color: inherit; text-decoration: none;',
      '  transition: background 0.15s ease, color 0.15s ease;',
      '}',
      '.prog-fw-foot a:hover { background: rgba(0,249,255,0.08); color: #00f9ff; }',
      '#mobile-menu .prog-fw-pair { padding: 8px 4px; }',
      '#mobile-menu .prog-fw-viewport { height: ' + (ITEM_H * 4) + 'px; }',
      '@media (prefers-reduced-motion: reduce) {',
      '  .prog-fw-track, .prog-fw-dial-ring { transition: none !important; }',
      '}'
    ].join('\n');
    document.head.appendChild(css);
  }

  function openProgram(id) {
    var menu = document.getElementById('programs-menu');
    if (menu) menu.classList.add('hidden');
    var chevron = document.getElementById('programs-chevron');
    if (chevron) chevron.style.transform = 'rotate(0deg)';

    if (typeof showProgramModal === 'function') {
      showProgramModal(id);
      return;
    }
    // Cross-page: land on all-programs with program deep-link
    window.location.href = 'all-programs.html#program-' + id;
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
    var startY = 0;
    var startIndex = 0;

    col.innerHTML =
      '<div class="prog-fw-top">' +
        '<div class="prog-fw-dial" aria-hidden="true">' +
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
      '<div class="prog-fw-counter" data-counter></div>';

    var track = col.querySelector('[data-track]');
    var ring = col.querySelector('[data-ring]');
    var counter = col.querySelector('[data-counter]');
    var viewport = col.querySelector('[data-viewport]');

    list.forEach(function (p, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'prog-fw-item';
      btn.setAttribute('role', 'option');
      btn.setAttribute('data-id', String(p.id));
      btn.setAttribute('data-index', String(i));
      btn.title = p.title;
      btn.textContent = shortTitle(p.title);
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (i !== index) {
          setIndex(i);
          return;
        }
        openProgram(p.id);
      });
      track.appendChild(btn);
    });

    function setIndex(i, instant) {
      if (!list.length) return;
      index = ((i % list.length) + list.length) % list.length;
      var y = -index * ITEM_H;
      if (instant) track.style.transition = 'none';
      track.style.transform = 'translate3d(0, ' + y + 'px, 0)';
      if (instant) {
        void track.offsetHeight;
        track.style.transition = '';
      }
      // dial spins with selection
      var step = 360 / Math.max(list.length, 1);
      ring.style.transform = 'rotate(' + (index * step) + 'deg)';
      var items = track.querySelectorAll('.prog-fw-item');
      for (var k = 0; k < items.length; k++) {
        items[k].classList.toggle('is-active', k === index);
        items[k].setAttribute('aria-selected', k === index ? 'true' : 'false');
      }
      var active = list[index];
      counter.innerHTML = '<strong>' + (index + 1) + '</strong> / ' + list.length +
        (active ? ' · ' + shortTitle(active.title) : '');
    }

    function onWheel(e) {
      e.preventDefault();
      e.stopPropagation();
      var dir = e.deltaY > 0 ? 1 : e.deltaY < 0 ? -1 : 0;
      if (!dir && e.deltaX) dir = e.deltaX > 0 ? 1 : -1;
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
      dragging = false;
      col.classList.remove('is-dragging');
      setIndex(index);
    }

    viewport.addEventListener('pointerdown', function (e) {
      dragging = true;
      startY = e.clientY;
      startIndex = index;
      dragY = 0;
      col.classList.add('is-dragging');
      viewport.setPointerCapture(e.pointerId);
    });
    viewport.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      dragY = e.clientY - startY;
      var offset = Math.round(-dragY / ITEM_H);
      var next = startIndex + offset;
      // live preview without wrap clamping during drag
      var clamped = Math.max(0, Math.min(list.length - 1, next));
      index = clamped;
      track.style.transform = 'translate3d(0, ' + (-index * ITEM_H + (dragY % ITEM_H) * 0.35) + 'px, 0)';
      var step = 360 / Math.max(list.length, 1);
      ring.style.transform = 'rotate(' + (index * step + dragY * 0.4) + 'deg)';
    });
    viewport.addEventListener('pointerup', function (e) {
      if (!dragging) return;
      var offset = Math.round(-(e.clientY - startY) / ITEM_H);
      index = startIndex + offset;
      endDrag();
    });
    viewport.addEventListener('pointercancel', endDrag);

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
    mission.innerHTML = '<strong>2 flywheels</strong>, one mission · scroll each wheel for every program';
    mount.appendChild(mission);
  }

  function fillMenu(menu) {
    if (!menu) return;
    injectStyles();
    menu.classList.add('prog-fw-ready');

    // Rebuild body once: head + mount + foot
    if (menu.getAttribute('data-fw-init') === '1') {
      var existing = menu.querySelector('[data-prog-fw-mount]');
      if (existing) buildMount(existing);
      return;
    }
    menu.setAttribute('data-fw-init', '1');

    var footLinks = [
      { href: 'all-programs.html', icon: '◉', text: 'All 29 Programs' },
      { href: 'all-programs.html#nibbles', icon: '🐾', text: 'All $NIBBLES' },
      { href: 'all-programs.html#hopeseed', icon: '🌱', text: 'All $hopeseed' }
    ];
    // Keep page-local featured if on index
    var isIndex = /index\.html$/i.test(location.pathname) || location.pathname === '/' || location.pathname.endsWith('/');
    if (isIndex) {
      footLinks.splice(1, 0, { href: '#programs', icon: '✦', text: 'Featured on this page' });
    }

    menu.innerHTML =
      '<div class="prog-fw-head"><span>2 FLYWHEELS · 1 MISSION</span><span class="count">29 programs</span></div>' +
      '<div data-prog-fw-mount></div>' +
      '<div class="prog-fw-foot" data-prog-fw-foot></div>';

    var foot = menu.querySelector('[data-prog-fw-foot]');
    footLinks.forEach(function (l) {
      var a = document.createElement('a');
      a.href = l.href;
      a.innerHTML = '<span>' + l.icon + '</span><span>' + l.text + '</span>';
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
  }

  function init() {
    var menu = document.getElementById('programs-menu');
    if (menu) fillMenu(menu);

    // Mobile hamburger: same dual wheels (separate mount; do not steal menu rebuild)
    var mobileMount = document.getElementById('mobile-prog-fw-mount');
    if (mobileMount && mobileMount.getAttribute('data-built') !== '1') {
      injectStyles();
      buildMount(mobileMount);
    }
  }

  // Expose for re-init after toggle if programs load late
  window.SHHProgFlywheelNav = {
    init: init,
    openProgram: openProgram
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
