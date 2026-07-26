/**
 * scroll-experience.js — Protocol × Mercy high-grade laptop flow
 * Progress bloom, ambient orbs, chapter rail, cinematic reveals.
 * Respects prefers-reduced-motion.
 */
(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktop = () => window.innerWidth >= 768;

  function initScrollProgress() {
    const bar = document.getElementById('shh-scroll-progress');
    if (!bar) return;

    let ticking = false;
    function update() {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      bar.style.width = (p * 100).toFixed(2) + '%';
      document.documentElement.style.setProperty('--shh-scroll', p.toFixed(4));
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

  function initAmbientParallax() {
    if (prefersReduced || !isDesktop()) return;
    const ambient = document.getElementById('shh-ambient');
    if (!ambient) return;
    const orbs = ambient.querySelectorAll('[data-parallax]');
    if (!orbs.length) return;

    let ticking = false;
    function frame() {
      const y = window.scrollY;
      orbs.forEach((orb) => {
        const speed = parseFloat(orb.getAttribute('data-parallax') || '0.1');
        const ty = y * speed;
        const tx = Math.sin(y * 0.0012 + speed * 8) * 18;
        orb.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0)`;
      });
      ticking = false;
    }
    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          requestAnimationFrame(frame);
          ticking = true;
        }
      },
      { passive: true }
    );
    frame();
  }

  function initHeroParallax() {
    if (prefersReduced || !isDesktop()) return;
    const hero = document.querySelector('.shh-hero');
    const wrap = document.querySelector('.shh-hero .hero-title-wrapper');
    const cue = document.querySelector('.shh-scroll-cue');
    if (!hero) return;

    let ticking = false;
    function frame() {
      const y = window.scrollY;
      const h = hero.offsetHeight || window.innerHeight;
      if (y < h * 1.2) {
        const t = Math.min(1, y / (h * 0.85));
        if (wrap) {
          wrap.style.transform = `translate3d(0, ${(t * 28).toFixed(1)}px, 0) scale(${(1 - t * 0.03).toFixed(4)})`;
          wrap.style.opacity = String(Math.max(0.15, 1 - t * 0.55));
        }
        if (cue) cue.style.opacity = String(Math.max(0, 1 - t * 1.6));
      }
      ticking = false;
    }
    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          requestAnimationFrame(frame);
          ticking = true;
        }
      },
      { passive: true }
    );
    frame();
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
            // Grow chapter rules inside
            entry.target.querySelectorAll('.shh-chapter-rule').forEach((r) => r.classList.add('is-in'));
            io.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    nodes.forEach((el) => io.observe(el));

    requestAnimationFrame(() => {
      nodes.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.9 && r.bottom > 0) {
          el.classList.add('is-in');
          el.querySelectorAll('.shh-chapter-rule').forEach((rule) => rule.classList.add('is-in'));
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

    let current = links[0] ? links[0].getAttribute('data-chapter') : null;

    function setActive(id) {
      if (!id || id === current) return;
      current = id;
      links.forEach((a) => {
        a.classList.toggle('is-active', a.getAttribute('data-chapter') === id);
      });
    }

    if (!prefersReduced && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
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
        { root: null, rootMargin: '-22% 0px -48% 0px', threshold: [0.08, 0.2, 0.4, 0.6, 0.8] }
      );
      sections.forEach((s) => io.observe(s));
    }

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

  function autoTagPanels() {
    const candidates = document.querySelectorAll(
      '#tokens .token-card, #programs .program-card, #onchain .bg-zinc-800, #mercy-engine .rounded-3xl, #flywheel .rounded-3xl, #blueprint .rounded-3xl, #vision .rounded-3xl'
    );
    candidates.forEach((el, i) => {
      if (!el.classList.contains('shh-reveal')) {
        el.classList.add('shh-reveal');
        if (i % 4 === 1) el.classList.add('shh-reveal-delay-1');
        if (i % 4 === 2) el.classList.add('shh-reveal-delay-2');
        if (i % 4 === 3) el.classList.add('shh-reveal-delay-3');
      }
    });

    // Light alternate directions on desktop for flow variety
    if (isDesktop()) {
      document.querySelectorAll('#tokens .token-card').forEach((el, i) => {
        if (i % 2 === 1) el.classList.add('shh-reveal-left');
      });
    }
  }

  function insertFlowBands() {
    if (!isDesktop()) return;
    const anchors = ['#tokens', '#onchain', '#mercy-engine', '#programs', '#vision'];
    anchors.forEach((sel) => {
      const section = document.querySelector(sel);
      if (!section || !section.previousElementSibling) return;
      if (section.previousElementSibling.classList.contains('shh-flow-band')) return;
      const band = document.createElement('div');
      band.className = 'shh-flow-band';
      band.setAttribute('aria-hidden', 'true');
      section.parentNode.insertBefore(band, section);
    });
  }

  function initMagneticCTAs() {
    if (prefersReduced || !isDesktop() || window.matchMedia('(pointer: coarse)').matches) return;
    const btns = document.querySelectorAll('.super-cta-btn, .premium-sponsor-btn');
    btns.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${(x * 0.08).toFixed(1)}px, ${(y * 0.1).toFixed(1)}px) scale(1.03)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  function boot() {
    initScrollProgress();
    insertFlowBands();
    autoTagPanels();
    initReveals();
    initChapterRail();
    initAmbientParallax();
    initHeroParallax();
    initMagneticCTAs();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
