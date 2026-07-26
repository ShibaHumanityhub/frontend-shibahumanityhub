/**
 * scroll-experience.js
 * Protocol Theory–inspired laptop scroll: progress bar, chapter rail, reveal-on-scroll.
 * Mercy palette. Respects prefers-reduced-motion. Desktop-first; mobile still reveals gently.
 */
(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initScrollProgress() {
    const bar = document.getElementById('shh-scroll-progress');
    if (!bar) return;

    let ticking = false;
    function update() {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      bar.style.width = (p * 100).toFixed(2) + '%';
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

  function initReveals() {
    const nodes = document.querySelectorAll('.shh-reveal');
    if (!nodes.length) return;

    if (prefersReduced || !('IntersectionObserver' in window)) {
      nodes.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );

    nodes.forEach((el) => io.observe(el));

    // Hero may already be in view on load
    requestAnimationFrame(() => {
      nodes.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92 && r.bottom > 0) {
          el.classList.add('is-in');
          io.unobserve(el);
        }
      });
    });
  }

  function initChapterRail() {
    const rail = document.getElementById('shh-chapter-rail');
    if (!rail) return;
    const links = Array.from(rail.querySelectorAll('a[data-chapter]'));
    const sections = Array.from(document.querySelectorAll('[data-chapter-section]'));
    if (!links.length || !sections.length) return;

    if (prefersReduced || !('IntersectionObserver' in window)) {
      return;
    }

    const byId = {};
    links.forEach((a) => {
      byId[a.getAttribute('data-chapter')] = a;
    });

    let current = links[0] ? links[0].getAttribute('data-chapter') : null;

    function setActive(id) {
      if (!id || id === current) return;
      current = id;
      links.forEach((a) => {
        a.classList.toggle('is-active', a.getAttribute('data-chapter') === id);
      });
    }

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the most visible intersecting section
        let best = null;
        let bestRatio = 0;
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio >= bestRatio) {
            bestRatio = e.intersectionRatio;
            best = e.target.getAttribute('data-chapter-section');
          }
        });
        if (best) setActive(best);
      },
      { root: null, rootMargin: '-25% 0px -45% 0px', threshold: [0.1, 0.25, 0.5, 0.75] }
    );

    sections.forEach((s) => io.observe(s));

    // Smooth scroll for rail clicks (native smooth already on html)
    links.forEach((a) => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
        setActive(a.getAttribute('data-chapter'));
      });
    });
  }

  /** Auto-tag major blocks on index for reveal if missing class */
  function autoTagPanels() {
    const candidates = document.querySelectorAll(
      '#tokens .token-card, #programs .program-card, #onchain .bg-zinc-800, #mercy-engine .rounded-3xl'
    );
    candidates.forEach((el, i) => {
      if (!el.classList.contains('shh-reveal')) {
        el.classList.add('shh-reveal');
        if (i % 3 === 1) el.classList.add('shh-reveal-delay-1');
        if (i % 3 === 2) el.classList.add('shh-reveal-delay-2');
      }
    });
  }

  function boot() {
    initScrollProgress();
    autoTagPanels();
    initReveals();
    initChapterRail();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
