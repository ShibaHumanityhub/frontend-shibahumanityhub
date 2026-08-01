/**
 * scroll-experience.js - Protocol × Mercy scroll (stable)
 * Progress bar, chapter rail, reveals. No position hacks on nav/menus.
 * Failsafe: never leave .shh-reveal stuck invisible.
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
 const ty = y * speed * 0.35;
 const tx = Math.sin(y * 0.001 + speed * 6) * 12;
 orb.style.transform = 'translate3d(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px,0)';
 });
 ticking = false;
 }
 window.addEventListener(
 'scroll',
 function () {
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
 if (!hero || !wrap) return;

 let ticking = false;
 function frame() {
 const y = window.scrollY;
 const h = hero.offsetHeight || window.innerHeight;
 if (y < h * 1.15) {
 const t = Math.min(1, y / (h * 0.9));
 // Subtle only - never fade hero to unreadable on first paint issues
 wrap.style.transform = 'translate3d(0,' + (t * 18).toFixed(1) + 'px,0)';
 if (cue) cue.style.opacity = String(Math.max(0, 1 - t * 1.8));
 } else {
 wrap.style.transform = '';
 }
 ticking = false;
 }
 window.addEventListener(
 'scroll',
 function () {
 if (!ticking) {
 requestAnimationFrame(frame);
 ticking = true;
 }
 },
 { passive: true }
 );
 frame();
 }

 function showAllReveals() {
 document.querySelectorAll('.shh-reveal').forEach(function (el) {
 el.classList.add('is-in');
 el.querySelectorAll('.shh-chapter-rule').forEach(function (r) {
 r.classList.add('is-in');
 });
 });
 }

 function initReveals() {
 const nodes = document.querySelectorAll('.shh-reveal');
 if (!nodes.length) return;

 if (prefersReduced || !('IntersectionObserver' in window)) {
 showAllReveals();
 return;
 }

 const io = new IntersectionObserver(
 function (entries) {
 entries.forEach(function (entry) {
 if (entry.isIntersecting) {
 entry.target.classList.add('is-in');
 entry.target.querySelectorAll('.shh-chapter-rule').forEach(function (r) {
 r.classList.add('is-in');
 });
 io.unobserve(entry.target);
 }
 });
 },
 { root: null, rootMargin: '0px 0px -6% 0px', threshold: 0.08 }
 );

 nodes.forEach(function (el) {
 io.observe(el);
 });

 // Immediate pass for above-the-fold
 requestAnimationFrame(function () {
 nodes.forEach(function (el) {
 const r = el.getBoundingClientRect();
 if (r.top < window.innerHeight * 0.95 && r.bottom > 0) {
 el.classList.add('is-in');
 el.querySelectorAll('.shh-chapter-rule').forEach(function (rule) {
 rule.classList.add('is-in');
 });
 io.unobserve(el);
 }
 });
 });

 // Hard failsafe: if anything still hidden after 1.2s, show all
 setTimeout(function () {
 var stuck = false;
 document.querySelectorAll('.shh-reveal:not(.is-in)').forEach(function () {
 stuck = true;
 });
 if (stuck) {
 showAllReveals();
 document.documentElement.classList.add('shh-force-show');
 }
 }, 1200);
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
 links.forEach(function (a) {
 a.classList.toggle('is-active', a.getAttribute('data-chapter') === id);
 });
 }

 if (!prefersReduced && 'IntersectionObserver' in window) {
 const io = new IntersectionObserver(
 function (entries) {
 let best = null;
 let bestRatio = 0;
 entries.forEach(function (e) {
 if (e.isIntersecting && e.intersectionRatio >= bestRatio) {
 bestRatio = e.intersectionRatio;
 best = e.target.getAttribute('data-chapter-section');
 }
 });
 if (best) setActive(best);
 },
 { root: null, rootMargin: '-22% 0px -48% 0px', threshold: [0.08, 0.2, 0.4, 0.6] }
 );
 sections.forEach(function (s) {
 io.observe(s);
 });
 }

 links.forEach(function (a) {
 a.addEventListener('click', function (e) {
 const href = a.getAttribute('href');
 if (!href || href.charAt(0) !== '#') return;
 const target = document.querySelector(href);
 if (!target) return;
 e.preventDefault();
 const top = target.getBoundingClientRect().top + window.scrollY - 72;
 window.scrollTo({ top: top, behavior: prefersReduced ? 'auto' : 'smooth' });
 setActive(a.getAttribute('data-chapter'));
 });
 });
 }

 function autoTagPanels() {
 const candidates = document.querySelectorAll(
 '#tokens .token-card, #programs .program-card, #onchain .bg-zinc-800'
 );
 candidates.forEach(function (el, i) {
 if (!el.classList.contains('shh-reveal')) {
 el.classList.add('shh-reveal');
 if (i % 3 === 1) el.classList.add('shh-reveal-delay-1');
 if (i % 3 === 2) el.classList.add('shh-reveal-delay-2');
 }
 });
 }

 function insertFlowBands() {
 if (!isDesktop()) return;
 const anchors = ['#tokens', '#onchain', '#mercy-engine', '#programs', '#vision'];
 anchors.forEach(function (sel) {
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
 btns.forEach(function (btn) {
 btn.addEventListener('mousemove', function (e) {
 const r = btn.getBoundingClientRect();
 const x = e.clientX - r.left - r.width / 2;
 const y = e.clientY - r.top - r.height / 2;
 btn.style.transform =
 'translate(' + (x * 0.06).toFixed(1) + 'px,' + (y * 0.08).toFixed(1) + 'px) scale(1.02)';
 });
 btn.addEventListener('mouseleave', function () {
 btn.style.transform = '';
 });
 });
 }

 function openDetailsOnDesktop() {
 if (!isDesktop()) return;
 document.querySelectorAll('details.shh-more, details#personal-engine').forEach(function (d) {
 d.open = true;
 });
 }

 function boot() {
 try {
 openDetailsOnDesktop();
 initScrollProgress();
 insertFlowBands();
 autoTagPanels();
 initReveals();
 initChapterRail();
 initAmbientParallax();
 initHeroParallax();
 initMagneticCTAs();
 } catch (err) {
 console.warn('[scroll-experience]', err);
 showAllReveals();
 document.documentElement.classList.add('shh-force-show');
 }
 }

 if (document.readyState === 'loading') {
 document.addEventListener('DOMContentLoaded', boot);
 } else {
 boot();
 }
})();
