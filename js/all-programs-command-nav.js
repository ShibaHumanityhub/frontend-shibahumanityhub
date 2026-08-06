/**
 * All-Programs Command Nav
 * Always-visible dual flywheel indexes in the navbar:
 *  - Live auto-rotating program titles for $NIBBLES + $hopeseed
 *  - Prev / next, open program, filter page
 *  - Full dual-wheel command panel (not a tiny dropdown)
 */
(function () {
  'use strict';

  var ROTATE_MS = 3200;
  var state = {
    nIdx: 0,
    hIdx: 0,
    nTimer: null,
    hTimer: null,
    panelOpen: false,
    paused: false
  };

  function list() {
    if (window.programs && Array.isArray(window.programs)) return window.programs;
    try {
      if (typeof programs !== 'undefined' && Array.isArray(programs)) return programs;
    } catch (e) { /* ignore */ }
    return [];
  }

  function byCat(cat) {
    return list().filter(function (p) { return p.category === cat; });
  }

  function short(t, n) {
    t = String(t || '');
    n = n || 34;
    if (t.length <= n) return t;
    return t.slice(0, n - 1).replace(/\s+\S*$/, '') + '…';
  }

  function openProgram(id) {
    if (window.SHHProgFlywheelNav && typeof window.SHHProgFlywheelNav.openProgram === 'function') {
      window.SHHProgFlywheelNav.openProgram(id);
      return;
    }
    if (typeof window.SHH_programPageUrl === 'function') {
      var url = window.SHH_programPageUrl(id);
      if (url) { window.location.href = url; return; }
    }
    if (typeof window.showProgramModal === 'function') window.showProgramModal(id);
  }

  function injectCss() {
    if (document.getElementById('ap-cmd-nav-css')) return;
    var s = document.createElement('style');
    s.id = 'ap-cmd-nav-css';
    s.textContent = [
      '/* ===== All-Programs Command Nav ===== */',
      'nav.shh-cmd-nav{',
      ' position:fixed;top:0;left:0;right:0;z-index:60;',
      ' background:linear-gradient(180deg,rgba(6,10,20,.98),rgba(8,12,22,.96));',
      ' border-bottom:1px solid rgba(251,191,36,.22);',
      ' box-shadow:0 10px 40px -18px rgba(0,0,0,.85),0 0 0 1px rgba(255,255,255,.04) inset;',
      ' backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);',
      '}',
      'nav.shh-cmd-nav .cmd-inner{',
      ' max-width:min(92rem,100%);margin:0 auto;',
      ' padding:.55rem max(.65rem,env(safe-area-inset-left));',
      ' display:grid;grid-template-columns:auto 1fr auto;gap:.55rem;align-items:center;',
      '}',
      '@media(min-width:900px){nav.shh-cmd-nav .cmd-inner{padding:.65rem 1.1rem;gap:.85rem}}',
      '.cmd-brand{display:flex;align-items:center;gap:.5rem;text-decoration:none;color:inherit;min-width:0}',
      '.cmd-brand img,.cmd-brand video{width:42px;height:42px;border-radius:50%;object-fit:cover;border:1px solid rgba(251,191,36,.5);box-shadow:0 0 18px -6px rgba(251,191,36,.55)}',
      '@media(min-width:640px){.cmd-brand img,.cmd-brand video{width:48px;height:48px}}',
      '.cmd-brand span{display:none;font-weight:700;font-size:.92rem;letter-spacing:-.02em;',
      ' background:linear-gradient(90deg,#fde68a,#fff,#6ee7b7);-webkit-background-clip:text;background-clip:text;color:transparent}',
      '@media(min-width:720px){.cmd-brand span{display:block}}',
      /* Dual rotators center stage */
      '.cmd-wheels{',
      ' display:grid;grid-template-columns:1fr 1fr;gap:.4rem;min-width:0;',
      '}',
      '@media(min-width:900px){.cmd-wheels{gap:.65rem}}',
      '.cmd-wheel{',
      ' position:relative;display:flex;align-items:center;gap:.35rem;',
      ' min-height:48px;padding:.28rem .35rem .28rem .45rem;border-radius:999px;',
      ' border:1px solid transparent;background:rgba(0,0,0,.35);',
      ' transition:border-color .2s,box-shadow .2s,background .2s;overflow:hidden;',
      '}',
      '.cmd-wheel.n{border-color:rgba(251,191,36,.35);box-shadow:0 0 0 1px rgba(251,191,36,.06) inset}',
      '.cmd-wheel.h{border-color:rgba(52,211,153,.35);box-shadow:0 0 0 1px rgba(52,211,153,.06) inset}',
      '.cmd-wheel:hover{background:rgba(0,0,0,.5)}',
      '.cmd-wheel.n:hover{border-color:rgba(251,191,36,.65);box-shadow:0 0 28px -10px rgba(251,191,36,.55)}',
      '.cmd-wheel.h:hover{border-color:rgba(52,211,153,.65);box-shadow:0 0 28px -10px rgba(52,211,153,.55)}',
      '.cmd-wheel .dial{',
      ' flex:0 0 auto;width:28px;height:28px;border-radius:50%;position:relative;',
      ' display:grid;place-items:center;',
      '}',
      '@media(min-width:640px){.cmd-wheel .dial{width:32px;height:32px}}',
      '.cmd-wheel .dial::after{',
      ' content:"";position:absolute;inset:0;border-radius:50%;',
      ' animation:cmd-spin 7s linear infinite;',
      '}',
      '.cmd-wheel.n .dial::after{',
      ' background:conic-gradient(from 0deg,#fbbf24,#78350f,#fde68a,#b45309,#fbbf24);',
      ' box-shadow:0 0 0 1px rgba(251,191,36,.45),0 0 14px -2px rgba(251,191,36,.7)',
      '}',
      '.cmd-wheel.h .dial::after{',
      ' background:conic-gradient(from 0deg,#34d399,#064e3b,#a7f3d0,#059669,#34d399);',
      ' box-shadow:0 0 0 1px rgba(52,211,153,.45),0 0 14px -2px rgba(52,211,153,.7);',
      ' animation-direction:reverse',
      '}',
      '.cmd-wheel .dial::before{',
      ' content:"";position:absolute;inset:6px;border-radius:50%;background:#0a0f1c;z-index:1;border:1px solid rgba(255,255,255,.08)',
      '}',
      '.cmd-wheel .dial i{position:relative;z-index:2;font-style:normal;font-size:.72rem;line-height:1}',
      '@keyframes cmd-spin{to{transform:rotate(360deg)}}',
      '.cmd-wheel .meta{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:1px;text-align:left}',
      '.cmd-wheel .tok{',
      ' font-size:.48rem;letter-spacing:.12em;text-transform:uppercase;font-weight:700;line-height:1.1',
      '}',
      '@media(min-width:640px){.cmd-wheel .tok{font-size:.52rem}}',
      '.cmd-wheel.n .tok{color:#fcd34d}',
      '.cmd-wheel.h .tok{color:#6ee7b7}',
      '.cmd-wheel .title{',
      ' font-family:"Space Grotesk",system-ui,sans-serif;font-weight:700;',
      ' font-size:clamp(.62rem,1.5vw,.78rem);line-height:1.15;letter-spacing:-.02em;',
      ' color:#f4f4f5;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;',
      ' transition:opacity .25s,transform .25s',
      '}',
      '.cmd-wheel .title.is-flip{opacity:0;transform:translateY(4px)}',
      '.cmd-wheel .idx{',
      ' font-size:.5rem;color:rgba(161,161,170,.9);font-variant-numeric:tabular-nums',
      '}',
      '.cmd-wheel .ctrls{display:flex;align-items:center;gap:1px;flex:0 0 auto}',
      '.cmd-wheel .ctrls button{',
      ' width:26px;height:26px;border:0;border-radius:999px;cursor:pointer;',
      ' background:rgba(255,255,255,.06);color:rgba(244,244,245,.75);',
      ' font-size:.7rem;line-height:1;display:grid;place-items:center;padding:0;',
      ' transition:background .15s,color .15s',
      '}',
      '.cmd-wheel .ctrls button:hover{background:rgba(255,255,255,.14);color:#fff}',
      '.cmd-wheel .open-btn{',
      ' border:0;border-radius:999px;cursor:pointer;font-weight:700;font-size:.55rem;',
      ' letter-spacing:.06em;text-transform:uppercase;padding:.35rem .55rem;',
      ' min-height:26px;font-family:inherit',
      '}',
      '.cmd-wheel.n .open-btn{background:linear-gradient(135deg,#fde68a,#f59e0b);color:#1a1200}',
      '.cmd-wheel.h .open-btn{background:linear-gradient(135deg,#a7f3d0,#059669);color:#042f2e}',
      '@media(max-width:520px){',
      ' .cmd-wheel .open-btn{display:none}',
      ' .cmd-wheel .idx{display:none}',
      '}',
      /* Right cluster */
      '.cmd-actions{display:flex;align-items:center;gap:.35rem;flex:0 0 auto}',
      '.cmd-panel-btn{',
      ' display:inline-flex;align-items:center;gap:.35rem;min-height:40px;',
      ' padding:.45rem .75rem;border-radius:999px;border:1px solid rgba(251,191,36,.4);',
      ' background:linear-gradient(145deg,rgba(251,191,36,.16),rgba(52,211,153,.08));',
      ' color:#fef3c7;font:inherit;font-size:.68rem;font-weight:700;letter-spacing:.04em;',
      ' text-transform:uppercase;cursor:pointer;transition:box-shadow .2s,transform .15s',
      '}',
      '.cmd-panel-btn:hover,.cmd-panel-btn.is-on{',
      ' box-shadow:0 0 28px -8px rgba(251,191,36,.55);transform:translateY(-1px)',
      '}',
      '.cmd-panel-btn .dot{',
      ' width:6px;height:6px;border-radius:50%;background:#6ee7b7;',
      ' box-shadow:0 0 8px #6ee7b7;animation:cmd-pulse 1.4s ease infinite',
      '}',
      '@keyframes cmd-pulse{0%,100%{opacity:1}50%{opacity:.3}}',
      '.cmd-link{',
      ' display:none;color:rgba(244,244,245,.8);text-decoration:none;font-size:.78rem;font-weight:600',
      '}',
      '.cmd-link:hover{color:#fcd34d}',
      '@media(min-width:1100px){.cmd-link{display:inline}}',
      '.cmd-ham{',
      ' display:grid;place-items:center;width:40px;height:40px;border:0;border-radius:.75rem;',
      ' background:rgba(255,255,255,.06);color:#fff;cursor:pointer;font-size:1.05rem',
      '}',
      '@media(min-width:900px){.cmd-ham{display:none}}',
      /* Full command panel under nav */
      '.cmd-panel{',
      ' display:none;border-top:1px solid rgba(255,255,255,.08);',
      ' background:linear-gradient(180deg,rgba(8,12,22,.99),rgba(6,10,18,.98));',
      ' max-height:min(78vh,720px);overflow:auto;overscroll-behavior:contain',
      '}',
      '.cmd-panel.is-open{display:block;animation:cmd-panel-in .2s ease}',
      '@keyframes cmd-panel-in{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}',
      '.cmd-panel-inner{max-width:min(92rem,100%);margin:0 auto;padding:.75rem max(.75rem,env(safe-area-inset-left)) 1rem}',
      '.cmd-panel-head{',
      ' display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.5rem;',
      ' margin-bottom:.65rem',
      '}',
      '.cmd-panel-head h2{',
      ' margin:0;font-family:"Space Grotesk",sans-serif;font-size:clamp(1rem,2.4vw,1.25rem);',
      ' letter-spacing:-.03em;',
      ' background:linear-gradient(90deg,#fff,#fde68a 40%,#6ee7b7);-webkit-background-clip:text;background-clip:text;color:transparent',
      '}',
      '.cmd-panel-head p{margin:0;font-size:.75rem;color:rgba(186,230,253,.65);max-width:36rem;line-height:1.4}',
      '.cmd-panel-close{',
      ' min-height:36px;padding:.35rem .7rem;border-radius:999px;border:1px solid rgba(255,255,255,.15);',
      ' background:rgba(0,0,0,.35);color:#e4e4e7;font:inherit;font-size:.72rem;font-weight:700;cursor:pointer',
      '}',
      '.cmd-panel .prog-fw-pair{padding:.25rem 0 .5rem!important}',
      '.cmd-quick{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.5rem}',
      '.cmd-quick a,.cmd-quick button{',
      ' min-height:36px;padding:.35rem .7rem;border-radius:999px;border:1px solid rgba(255,255,255,.12);',
      ' background:rgba(0,0,0,.3);color:#e4e4e7;font:inherit;font-size:.7rem;font-weight:700;',
      ' text-decoration:none;cursor:pointer',
      '}',
      '.cmd-quick a:hover,.cmd-quick button:hover{border-color:rgba(251,191,36,.45);color:#fef3c7}',
      '.cmd-backdrop{',
      ' display:none;position:fixed;inset:0;top:0;z-index:55;background:rgba(0,0,0,.45)',
      '}',
      '.cmd-backdrop.is-on{display:block}',
      'body.cmd-panel-open{overflow:hidden}',
      /* Offset page content for taller command nav */
      'body.has-cmd-nav{padding-top:58px}',
      '@media(min-width:640px){body.has-cmd-nav{padding-top:64px}}',
      /* Hide legacy nav + mobile drawer when command nav owns the chrome */
      'body.has-cmd-nav > nav.shh-nav:not(.shh-cmd-nav){display:none!important}',
      'body.has-cmd-nav #mobile-menu{display:none!important}',
      'body.has-cmd-nav header.hero-bg{padding-top:2.5rem!important;min-height:auto}',
      '@media(min-width:768px){body.has-cmd-nav header.hero-bg{padding-top:3.25rem!important}}',
      '@media(prefers-reduced-motion:reduce){',
      ' .cmd-wheel .dial::after,.cmd-panel-btn .dot{animation:none!important}',
      ' .cmd-panel{animation:none!important}',
      '}'
    ].join('\n');
    document.head.appendChild(s);
  }

  function buildNav() {
    if (document.getElementById('shh-cmd-nav')) return;

    injectCss();
    document.body.classList.add('has-cmd-nav');

    var backdrop = document.createElement('div');
    backdrop.className = 'cmd-backdrop';
    backdrop.id = 'cmd-backdrop';
    backdrop.addEventListener('click', closePanel);
    document.body.appendChild(backdrop);

    var nav = document.createElement('nav');
    nav.className = 'shh-cmd-nav';
    nav.id = 'shh-cmd-nav';
    nav.setAttribute('aria-label', 'Dual flywheel command navigation');
    nav.innerHTML =
      '<div class="cmd-inner">' +
        '<a class="cmd-brand" href="index.html">' +
          '<video src="assets/videos/shibahumanityhub-logo-animated.mp4" autoplay loop muted playsinline preload="metadata" poster="assets/logos/shibahumanityhublogo3d-new.jpg" width="48" height="48" aria-hidden="true"></video>' +
          '<span>SHIBAHUMANITYHUB</span>' +
        '</a>' +
        '<div class="cmd-wheels" role="group" aria-label="Live program indexes">' +
          wheelHtml('n', '$NIBBLES', '🐾') +
          wheelHtml('h', '$hopeseed', '🌱') +
        '</div>' +
        '<div class="cmd-actions">' +
          '<a class="cmd-link" href="pay-it-forward.html">Pay It Forward</a>' +
          '<a class="cmd-link" href="shelters.html">Souls</a>' +
          '<button type="button" class="cmd-panel-btn" id="cmd-panel-btn" aria-expanded="false" aria-controls="cmd-panel">' +
            '<span class="dot" aria-hidden="true"></span> Command' +
          '</button>' +
          '<button type="button" class="cmd-ham" id="cmd-ham" aria-label="Open menu"><i class="fa-solid fa-bars"></i></button>' +
        '</div>' +
      '</div>' +
      '<div class="cmd-panel" id="cmd-panel" role="dialog" aria-label="Dual flywheel program command">' +
        '<div class="cmd-panel-inner">' +
          '<div class="cmd-panel-head">' +
            '<div>' +
              '<h2>2 flywheels · every program · one mission</h2>' +
              '<p>Scroll or drag each wheel. Click a title to open that program. Use filters to jump the page grid.</p>' +
            '</div>' +
            '<button type="button" class="cmd-panel-close" id="cmd-panel-close">Close ✕</button>' +
          '</div>' +
          '<div id="cmd-panel-fw-mount" data-prog-fw-mount></div>' +
          '<div class="cmd-quick">' +
            '<button type="button" data-filter="$NIBBLES">🐾 Jump $NIBBLES grid</button>' +
            '<button type="button" data-filter="$hopeseed">🌱 Jump $hopeseed grid</button>' +
            '<button type="button" data-filter="all">◉ Show all 30</button>' +
            '<a href="index.html">Mercy Flywheel home</a>' +
            '<a href="spin-the-wheel.html">Spin the wheel</a>' +
            '<a href="k9-lifeline.html">Global K9</a>' +
            '<a href="pay-it-forward.html">Adoption Chain</a>' +
          '</div>' +
        '</div>' +
      '</div>';

    document.body.insertBefore(nav, document.body.firstChild);

    // Wire rotators
    wireWheel('n', '$NIBBLES');
    wireWheel('h', '$hopeseed');

    document.getElementById('cmd-panel-btn').addEventListener('click', function () {
      if (state.panelOpen) closePanel();
      else openPanel();
    });
    document.getElementById('cmd-panel-close').addEventListener('click', closePanel);
    document.getElementById('cmd-ham').addEventListener('click', function () {
      // Prefer command panel on mobile (full dual wheels)
      if (state.panelOpen) closePanel();
      else openPanel();
    });

    nav.querySelectorAll('.cmd-quick [data-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cat = btn.getAttribute('data-filter');
        closePanel();
        if (typeof window.filterPrograms === 'function') window.filterPrograms(cat);
        var target = cat === '$NIBBLES' ? 'nibbles' : cat === '$hopeseed' ? 'hopeseed' : 'all-programs-grid';
        var el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && state.panelOpen) closePanel();
    });

    // Pause auto-rotate while hovering a wheel
    nav.querySelectorAll('.cmd-wheel').forEach(function (w) {
      w.addEventListener('mouseenter', function () { state.paused = true; });
      w.addEventListener('mouseleave', function () { state.paused = false; });
    });

    startAutoRotate();
    renderTitles(true);
  }

  function wheelHtml(key, label, emoji) {
    return (
      '<div class="cmd-wheel ' + key + '" data-wheel="' + key + '">' +
        '<div class="dial" aria-hidden="true"><i>' + emoji + '</i></div>' +
        '<button type="button" class="meta" data-open="' + key + '" title="Open current program" style="border:0;background:transparent;cursor:pointer;padding:0;min-width:0;flex:1 1 auto">' +
          '<span class="tok">' + label + '</span>' +
          '<span class="title" data-title="' + key + '">Loading…</span>' +
          '<span class="idx" data-idx="' + key + '"></span>' +
        '</button>' +
        '<div class="ctrls">' +
          '<button type="button" data-prev="' + key + '" aria-label="Previous ' + label + ' program">‹</button>' +
          '<button type="button" data-next="' + key + '" aria-label="Next ' + label + ' program">›</button>' +
          '<button type="button" class="open-btn" data-go="' + key + '">Open</button>' +
        '</div>' +
      '</div>'
    );
  }

  function wireWheel(key, cat) {
    var nav = document.getElementById('shh-cmd-nav');
    if (!nav) return;
    nav.querySelector('[data-prev="' + key + '"]').addEventListener('click', function (e) {
      e.stopPropagation();
      step(key, -1);
    });
    nav.querySelector('[data-next="' + key + '"]').addEventListener('click', function (e) {
      e.stopPropagation();
      step(key, 1);
    });
    nav.querySelector('[data-go="' + key + '"]').addEventListener('click', function (e) {
      e.stopPropagation();
      openCurrent(key);
    });
    nav.querySelector('[data-open="' + key + '"]').addEventListener('click', function () {
      openCurrent(key);
    });
    // Double-click token label area: filter grid
    nav.querySelector('[data-wheel="' + key + '"] .tok').addEventListener('click', function (e) {
      e.stopPropagation();
      if (typeof window.filterPrograms === 'function') window.filterPrograms(cat);
      var id = cat === '$NIBBLES' ? 'nibbles' : 'hopeseed';
      var el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function programsFor(key) {
    return byCat(key === 'n' ? '$NIBBLES' : '$hopeseed');
  }

  function idxKey(key) {
    return key === 'n' ? 'nIdx' : 'hIdx';
  }

  function step(key, dir) {
    var arr = programsFor(key);
    if (!arr.length) return;
    var k = idxKey(key);
    state[k] = (state[k] + dir + arr.length) % arr.length;
    renderTitle(key, false);
  }

  function openCurrent(key) {
    var arr = programsFor(key);
    if (!arr.length) return;
    var p = arr[state[idxKey(key)]];
    if (p) openProgram(p.id);
  }

  function renderTitle(key, instant) {
    var arr = programsFor(key);
    var titleEl = document.querySelector('[data-title="' + key + '"]');
    var idxEl = document.querySelector('[data-idx="' + key + '"]');
    if (!titleEl) return;
    if (!arr.length) {
      titleEl.textContent = 'Programs loading…';
      if (idxEl) idxEl.textContent = '';
      return;
    }
    var i = state[idxKey(key)] % arr.length;
    var p = arr[i];
    function apply() {
      titleEl.textContent = short(p.title, window.innerWidth < 640 ? 22 : 36);
      titleEl.classList.remove('is-flip');
      if (idxEl) idxEl.textContent = (i + 1) + ' / ' + arr.length;
      titleEl.title = p.title + ' · click to open';
    }
    if (instant) {
      apply();
      return;
    }
    titleEl.classList.add('is-flip');
    setTimeout(apply, 160);
  }

  function renderTitles(instant) {
    renderTitle('n', instant);
    renderTitle('h', instant);
  }

  function startAutoRotate() {
    clearInterval(state.nTimer);
    clearInterval(state.hTimer);
    state.nTimer = setInterval(function () {
      if (state.paused || state.panelOpen || document.hidden) return;
      step('n', 1);
    }, ROTATE_MS);
    state.hTimer = setInterval(function () {
      if (state.paused || state.panelOpen || document.hidden) return;
      step('h', 1);
    }, ROTATE_MS + 400);
  }

  function openPanel() {
    state.panelOpen = true;
    var panel = document.getElementById('cmd-panel');
    var btn = document.getElementById('cmd-panel-btn');
    var bd = document.getElementById('cmd-backdrop');
    if (panel) panel.classList.add('is-open');
    if (btn) {
      btn.classList.add('is-on');
      btn.setAttribute('aria-expanded', 'true');
    }
    if (bd) bd.classList.add('is-on');
    document.body.classList.add('cmd-panel-open');

    // Mount dual wheels from shared flywheel engine
    var mount = document.getElementById('cmd-panel-fw-mount');
    if (mount) {
      if (window.SHHProgFlywheelNav && typeof window.SHHProgFlywheelNav.buildInto === 'function') {
        window.SHHProgFlywheelNav.buildInto(mount);
      } else if (window.SHHProgFlywheelNav && typeof window.SHHProgFlywheelNav.init === 'function') {
        mount.setAttribute('id', 'mobile-prog-fw-mount');
        mount.removeAttribute('data-built');
        mount.innerHTML = '';
        window.SHHProgFlywheelNav.init();
        mount.setAttribute('id', 'cmd-panel-fw-mount');
      }
    }
  }

  function closePanel() {
    state.panelOpen = false;
    var panel = document.getElementById('cmd-panel');
    var btn = document.getElementById('cmd-panel-btn');
    var bd = document.getElementById('cmd-backdrop');
    if (panel) panel.classList.remove('is-open');
    if (btn) {
      btn.classList.remove('is-on');
      btn.setAttribute('aria-expanded', 'false');
    }
    if (bd) bd.classList.remove('is-on');
    document.body.classList.remove('cmd-panel-open');
  }

  function boot() {
    // Only on all-programs page
    if (!/all-programs\.html$/i.test(location.pathname) &&
        !(document.body && document.body.getAttribute('data-page') === 'all-programs')) {
      // Also allow if file is all-programs
      var path = location.pathname || '';
      if (path.indexOf('all-programs') === -1) return;
    }
    buildNav();
    // Hide legacy mobile menu / old nav so we don't double up
    var legacy = document.querySelector('nav.shh-nav:not(.shh-cmd-nav)');
    if (legacy) legacy.style.display = 'none';
    var mobile = document.getElementById('mobile-menu');
    if (mobile) mobile.style.display = 'none';

    // Retry titles when programs arrive
    var tries = 0;
    var t = setInterval(function () {
      tries += 1;
      if (list().length || tries > 50) {
        clearInterval(t);
        renderTitles(true);
      }
    }, 80);
  }

  window.SHHAllProgramsCommandNav = {
    open: openPanel,
    close: closePanel,
    refresh: function () { renderTitles(true); }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  window.addEventListener('load', function () {
    renderTitles(true);
  });
})();
