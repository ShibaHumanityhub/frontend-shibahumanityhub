// shared-animations.js
// Unified, premium, tone-preserving micro-interactions and animations.
// Everything must feel like breathing, gentle heartbeats, or quiet ripples of mercy.
// Never flashy. Always offer prefers-reduced-motion respect.

(function() {
 // Respect reduced motion globally
 const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const isCoarseMobile = (function () {
  try {
   return window.matchMedia('(max-width: 767px)').matches;
  } catch (e) { return false; }
 })();

 // Phase 4: global intensity for particle reactivity to holdings (set from updatePersonalView/simulate)
 window.mercyParticleIntensity = 1;

 /* Sitewide paint stability + precision graphics (balanced cinematic speed) */
 function initPaintStability() {
  if (document.getElementById('shh-paint-stability')) return;
  const style = document.createElement('style');
  style.id = 'shh-paint-stability';
  style.textContent = [
   /* Precision chrome: crisp type + GPU-friendly media */
   'html{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}',
   'img,video,picture,canvas{max-width:100%}',
   'video{transform:translateZ(0);backface-visibility:hidden}',
   '.program-card,.soul-card,.star-card,.k9-card,.shh-cinema,.shh-story-stage{',
   ' contain:layout style paint;content-visibility:auto;contain-intrinsic-size:auto 420px}',
   '.shh-cinema,.shh-story-stage,.logo-3d-wrapper{',
   ' transform:translateZ(0);isolation:isolate}',
   '.shh-cinema{box-shadow:0 0 0 1px rgba(255,255,255,0.05),0 28px 70px -28px rgba(0,0,0,0.92),0 0 48px -28px rgba(251,191,36,0.28)}',
   /* Soft card lift without continuous opacity thrash */
   '.program-card,.soul-card,.star-card,.k9-card{will-change:auto}',
   '@media (max-width: 767px) {',
   /* Hero Ken Burns / scale-loop washes */
   ' .bp-hero-wash, .pif-hero-wash, .sq-hero-wash, .hero-bg::before,',
   ' .home-flywheel-still, .ap-flywheel-wash, .ap-fw-still, .ap-hero-wash,',
   ' [class*="hero-wash"] {',
   '  animation: none !important;',
   '  will-change: auto !important;',
   ' }',
   ' .bp-hero-wash, .pif-hero-wash, .sq-hero-wash, .hero-bg::before, .home-flywheel-still, .ap-flywheel-wash, .ap-fw-still {',
   '  transform: scale(1.05) !important;',
   ' }',
   /* Sticky experience rails: blur over scrolling content = flicker */
   ' .bp-tabs, .pifx-tabs, .sqx-tabs, .nbx-rail, .gpx-rail, .hhx-rail, .k9x-rail,',
   ' .spx-rail, .sp-tabs, [class*="x-tabs"], [class*="x-rail"] {',
   '  backdrop-filter: none !important;',
   '  -webkit-backdrop-filter: none !important;',
   ' }',
   /* Heavy atmosphere loops */
   ' .bp-fx-dust, .bp-hero-beam, .bp-fx-ridge, .gp-ingot-ring,',
   ' .hh-ingot-ring, .hh-aurora, .sq-fx-dust, .sq-fx-light, .nb-fx-tide,',
   ' .nb-fx-mesh, .nb-fx-mesh-cross, .nb-fx-bump, .nb-fx-aurora, .nb-fx-sheen {',
   '  animation: none !important;',
   '  will-change: auto !important;',
   ' }',
   ' .bp-fx-ridge, .gp-ingot-ring { transform: none !important; }',
   ' .float-particle, .nb-float, .k9-float { display: none !important; }',
   ' #mercy-wheel, .mercy-atmosphere, .mercy-orbit { display: none !important; }',
   ' nav.bp-nav, nav.sq-nav, nav.pif-nav, nav.bg-black\\/95, nav[class*="bg-black"] {',
   '  backdrop-filter: none !important;',
   '  -webkit-backdrop-filter: none !important;',
   ' }',
   '}',
   /* Pause continuous FX while scrolling on all viewports */
   'body.is-scrolling .bp-hero-wash, body.is-scrolling .pif-hero-wash, body.is-scrolling .sq-hero-wash,',
   'body.is-scrolling .hero-bg::before, body.is-scrolling .home-flywheel-still, body.is-scrolling .ap-flywheel-wash, body.is-scrolling .ap-fw-still,',
   'body.is-scrolling .bp-fx-dust, body.is-scrolling .bp-hero-beam, body.is-scrolling .gp-ingot-ring,',
   'body.is-scrolling .hh-ingot-ring, body.is-scrolling .hh-aurora, body.is-scrolling .float-particle,',
   'body.is-scrolling .sq-fx-dust, body.is-scrolling .sq-fx-light, body.is-scrolling .nb-fx-tide,',
   'body.is-scrolling [class*="hero-wash"],',
   'body.is-scrolling #mercy-wheel, body.is-scrolling .mercy-orbit, body.is-scrolling .mercy-atmosphere {',
   ' animation-play-state: paused !important;',
   '}',
   'body.is-scrolling #mercy-wheel { filter: none !important; }',
   '@media (prefers-reduced-motion: reduce) {',
   ' #mercy-wheel, .mercy-atmosphere, .mercy-orbit, .float-particle { display: none !important; }',
   '}'
  ].join('\n');
  document.head.appendChild(style);

  /* Global is-scrolling freeze if page did not wire its own */
  if (!window.__shhScrollFreeze) {
   window.__shhScrollFreeze = true;
   var st = 0;
   window.addEventListener('scroll', function () {
    document.body.classList.add('is-scrolling');
    clearTimeout(st);
    st = setTimeout(function () {
     document.body.classList.remove('is-scrolling');
    }, 140);
   }, { passive: true });
  }
 }
 initPaintStability();

 function initReducedMotion() {
 if (prefersReduced) {
 document.documentElement.style.setProperty('--animation-duration', '0s');
 document.documentElement.style.setProperty('--transition-duration', '0.1s');
 // Disable complex particles and heavy anims
 const style = document.createElement('style');
 style.textContent = `
 .float-particle, .animate-pulse, .animate-bounce, [class*="float"], [class*="shine"] {
 animation: none !important;
 transition: none !important;
 }
 .program-card:hover, .group:hover {
 transform: none !important;
 }
 `;
 document.head.appendChild(style);

 // Phase 1: also pause any mercy videos when reduced motion is active
 if (window.pauseAllMercyVideos) window.pauseAllMercyVideos();
 }
 }

 // Billion-dollar quality floating hearts & paws throughout the entire card background.
 // High caliber style: elegant, first-principles, quietly profound.
 // Slow, random, rhythmic, high-end. Subtle depth, premium glows, organic drifts.
 // Fixed pool of particles for smooth continuous floating (no pop-in/out).
 // Hearts (❤️) and paws (🐾) only. Pure, focused.
 // On every program card on both pages.
 function createFloatingParticles(card) {
 if (prefersReduced) return;
 const container = card.querySelector('.floating-elements');
 if (!container) return;

 // Clear any previous for re-init (filters etc)
 container.innerHTML = '';

 const isNibbles = card.classList.contains('nibbles-card');
 // Strictly hearts and paws for the requested focus + quality
 const emojis = isNibbles 
 ? ['🐾', '❤️', '🐾', '❤️', '🐾', '❤️'] 
 : ['❤️', '🐾', '❤️', '🐾', '❤️', '🐾'];

 // Phase 1: dynamic count for perf/mobile (gentle on small screens or reduced) - LIGHTNING SPEED TUNED
 let count = 2;
 if (prefersReduced) count = 0;
 else if (window.innerWidth < 480) count = 1; // tasteful on mobile

 // Phase 4: intensity from holdings (density/brightness for more alive feel when holding grows)
 const intensity = window.mercyParticleIntensity || 1;
 count = Math.floor(count * intensity);

 // Phase 4 guardrail: cap particles for performance (lots of cards or small screen)
 const cardCount = document.querySelectorAll('.program-card').length;
 if (cardCount > 6 && window.innerWidth < 640) {
 count = Math.min(count, 1);
 }
 if (cardCount > 12) count = Math.min(count, 1);

 // rich but tasteful density across entire background
 const driftClasses = ['drift-slow1', 'drift-slow2', 'drift-slow3', 'drift-slow4', 'drift-slow5', 'drift-slow6'];

 for (let i = 0; i < count; i++) {
 const particle = document.createElement('div');
 particle.className = `float-particle ${driftClasses[i % driftClasses.length]}`;
 particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
 particle.setAttribute('aria-hidden', 'true');

 // Truly random throughout the *entire* card background
 const left = 4 + Math.random() * 92;
 const top = 3 + Math.random() * 94;
 particle.style.left = `${left.toFixed(1)}%`;
 particle.style.top = `${top.toFixed(1)}%`;

 // High-quality size variation for depth (larger = more "distant" or present)
 const size = 0.75 + Math.random() * 0.85;
 particle.style.fontSize = `${size.toFixed(2)}rem`;

 // Very subtle base opacity. Billionaire restraint. Feels like atmosphere, not decoration.
 // Phase 4: intensity boosts brightness for holdings that feel more "alive"
 const intensity = window.mercyParticleIntensity || 1;
 const baseOpacity = (0.065 + Math.random() * 0.09) * intensity;
 particle.style.opacity = baseOpacity.toFixed(3);

 // Premium, soft, high-end glow (billionaire level of craft. Not cheap neon.)
 const isHeart = particle.textContent === '❤️';
 if (isHeart) {
 particle.style.color = '#f472b6';
 particle.style.textShadow = '0 0 2px rgba(244, 114, 182, 0.35), 0 0 8px rgba(244, 114, 182, 0.22)';
 } else {
 particle.style.color = '#fcd34d';
 particle.style.textShadow = '0 0 2px rgba(252, 211, 77, 0.4), 0 0 9px rgba(252, 211, 77, 0.25)';
 }

 // Long, slow, varied rhythms for beautiful catchy floating (18-36s cycles)
 // Phase 4: higher intensity = slightly quicker cycles (more energy in the mercy)
 const baseDur = 18 + Math.random() * 18;
 const duration = baseDur / intensity;
 particle.style.animationDuration = `${duration.toFixed(1)}s`;
 particle.style.animationDelay = `-${(Math.random() * duration).toFixed(1)}s`;

 // Gentle initial organic rotation + micro-scale for expensive hand-crafted feel
 const rot = -12 + Math.random() * 24;
 const scale = 0.96 + Math.random() * 0.08;
 particle.style.transform = `rotate(${rot.toFixed(1)}deg) scale(${scale.toFixed(3)})`;

 container.appendChild(particle);
 }
 }

 function initFloatingParticles() {
 if (prefersReduced) return;

 const cards = document.querySelectorAll('.program-card, .soul-card, .star-card, .k9-card');
 if (!cards.length) return;

 // LIGHTNING: Lazy init particles only when cards enter viewport (fast first paint)
 const particleObserver = new IntersectionObserver((entries, obs) => {
 entries.forEach(entry => {
 if (entry.isIntersecting) {
 const card = entry.target;
 if (!card.hasAttribute('data-particles-init')) {
 createFloatingParticles(card);
 card.setAttribute('data-particles-init', 'true');
 }
 obs.unobserve(card);
 }
 });
 }, { threshold: 0.1, rootMargin: '80px 0px' });

 cards.forEach(card => {
 if (!card.hasAttribute('data-particles-init')) {
 particleObserver.observe(card);
 }
 });
 }

 // Inject drift keyframes globally so every page's cards get beautiful floating (even if their local CSS doesn't define them)
 if (!document.getElementById('mercy-drift-keyframes')) {
 const driftK = document.createElement('style');
 driftK.id = 'mercy-drift-keyframes';
 driftK.textContent = `
 @keyframes drift-slow1 { 0%{transform:translate(0,0) rotate(-8deg)} 50%{transform:translate(6px,-11px) rotate(6deg)} 100%{transform:translate(0,0) rotate(-8deg)} }
 @keyframes drift-slow2 { 0%{transform:translate(0,0) rotate(5deg)} 50%{transform:translate(-8px,9px) rotate(-7deg)} 100%{transform:translate(0,0) rotate(5deg)} }
 @keyframes drift-slow3 { 0%{transform:translate(0,0)} 50%{transform:translate(7px,5px) rotate(4deg)} 100%{transform:translate(0,0)} }
 @keyframes drift-slow4 { 0%{transform:translate(0,0) rotate(-3deg)} 50%{transform:translate(-5px,-13px) rotate(8deg)} 100%{transform:translate(0,0) rotate(-3deg)} }
 @keyframes drift-slow5 { 0%{transform:translate(0,0)} 50%{transform:translate(4px,8px) rotate(-5deg)} 100%{transform:translate(0,0)} }
 @keyframes drift-slow6 { 0%{transform:translate(0,0) rotate(7deg)} 50%{transform:translate(-9px,4px) rotate(-4deg)} 100%{transform:translate(0,0) rotate(7deg)} }
 .float-particle { position:absolute; transition:transform .2s ease; animation-timing-function:linear; animation-iteration-count:infinite; }
 .float-particle.drift-slow1 { animation-name:drift-slow1; }
 .float-particle.drift-slow2 { animation-name:drift-slow2; }
 .float-particle.drift-slow3 { animation-name:drift-slow3; }
 .float-particle.drift-slow4 { animation-name:drift-slow4; }
 .float-particle.drift-slow5 { animation-name:drift-slow5; }
 .float-particle.drift-slow6 { animation-name:drift-slow6; }
 `;
 document.head.appendChild(driftK);
 }

 // Hover response is handled in CSS for the premium "the field wakes" feeling.

 // Premium hover enhancements (echo golden chain / growing seed)
 function addPremiumHovers() {
 if (prefersReduced) return;

 // Program cards - chain/seed metaphor
 document.querySelectorAll('.program-card, .group').forEach(el => {
 el.addEventListener('mouseenter', () => {
 el.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease';
 if (el.classList.contains('nibbles-card') || el.closest('.nibbles-card')) {
 el.style.boxShadow = '0 0 0 1px rgba(251,191,36,0.4), 0 20px 40px -10px rgba(251,191,36,0.2)';
 } else if (el.classList.contains('hopeseed-card') || el.closest('.hopeseed-card')) {
 el.style.boxShadow = '0 0 0 1px rgba(52,211,153,0.4), 0 20px 40px -10px rgba(52,211,153,0.2)';
 }
 });
 el.addEventListener('mouseleave', () => {
 el.style.boxShadow = '';
 });
 });

 // Wallet / simulator buttons - soft mercy pulse
 document.querySelectorAll('.premium-sponsor-btn, button[onclick*="simulate"]').forEach(btn => {
 btn.addEventListener('mouseenter', () => {
 if (!prefersReduced) {
 btn.style.boxShadow = '0 0 0 1px rgba(255,255,white,0.2), 0 0 25px -5px rgba(16,185,129,0.3)';
 }
 });
 btn.addEventListener('mouseleave', () => {
 btn.style.boxShadow = '';
 });
 });

 // Phase 4: extend the "field wakes" hover to new dashboard elements (circles, share btn, engine nodes)
 // Consistent premium restraint across the whole experience
 document.querySelectorAll('.mercy-circle, .footprint-share-btn, #engine-nodes .engine-node, #personal-programs > div').forEach(el => {
 el.addEventListener('mouseenter', () => {
 if (!prefersReduced) {
 const isN = el.classList.contains('nibbles') || el.closest('.nibbles-card') || (el.dataset && el.dataset.category === '$NIBBLES');
 el.style.boxShadow = isN 
 ? '0 0 0 1px rgba(251,191,36,0.5), 0 12px 22px -6px rgba(251,191,36,0.25)'
 : '0 0 0 1px rgba(52,211,153,0.5), 0 12px 22px -6px rgba(52,211,153,0.25)';
 }
 });
 el.addEventListener('mouseleave', () => {
 el.style.boxShadow = '';
 });
 });
 }

 // IntersectionObserver gentle reveals (breathing, not dramatic)
 function initReveals() {
 if (prefersReduced) return;
 const observer = new IntersectionObserver((entries) => {
 entries.forEach(entry => {
 if (entry.isIntersecting) {
 entry.target.style.transition = 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.4,0,0.2,1)';
 entry.target.style.opacity = '1';
 entry.target.style.transform = 'translateY(0)';
 observer.unobserve(entry.target);
 }
 });
 }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

 document.querySelectorAll('#mercy-engine > div, .program-card, #onchain > div').forEach(el => {
 if (!el.hasAttribute('data-reveal-init')) {
 el.style.opacity = '0.6';
 el.style.transform = 'translateY(12px)';
 el.setAttribute('data-reveal-init', 'true');
 observer.observe(el);
 }
 });
 }

 // Smooth number growth (for future impact numbers or balances)
 function animateValue(el, start, end, duration) {
 if (prefersReduced || !el) return;
 let startTime = null;
 const step = (timestamp) => {
 if (!startTime) startTime = timestamp;
 const progress = Math.min((timestamp - startTime) / duration, 1);
 const value = Math.floor(progress * (end - start) + start);
 el.textContent = value.toLocaleString();
 if (progress < 1) {
 requestAnimationFrame(step);
 } else {
 el.textContent = end.toLocaleString();
 }
 };
 requestAnimationFrame(step);
 }

 // Engine viz chain-link "connect" micro animation
 function enhanceEngineViz() {
 const viz = document.getElementById('engine-viz');
 if (!viz || prefersReduced) return;

 // Subtle continuous ripple on the flow line
 const flow = viz.querySelector('.flex-1.relative');
 if (flow) {
 flow.style.background = 'linear-gradient(to right, rgba(251,191,36,0.15), rgba(52,211,153,0.15))';
 // Already has animate-pulse from HTML
 }

 // When nodes are highlighted via simulator/wallet, add gentle chain pulse
 const nodes = document.getElementById('engine-nodes');
 if (nodes) {
 nodes.addEventListener('mouseenter', () => {
 nodes.style.transition = 'box-shadow 0.6s ease';
 nodes.style.boxShadow = '0 0 15px -5px rgba(251,191,36,0.25)';
 });
 nodes.addEventListener('mouseleave', () => {
 nodes.style.boxShadow = '';
 });
 }
 }

 // Public init
 function initMediaPrecision() {
  /* Native decode/lazy hints for crisp, non-blocking graphics */
  try {
   document.querySelectorAll('img:not([decoding])').forEach(function (img) {
    img.setAttribute('decoding', 'async');
    if (!img.hasAttribute('loading') && !img.closest('nav, header, .shh-hero, .logo-3d-wrapper')) {
     img.setAttribute('loading', 'lazy');
    }
   });
   document.querySelectorAll('video').forEach(function (v) {
    if (!v.hasAttribute('playsinline')) v.setAttribute('playsinline', '');
   });
  } catch (eMedia) { /* ignore */ }
 }

 window.initPremiumAnimations = function() {
 initPaintStability();
 initReducedMotion();
 initMediaPrecision();
 initFloatingParticles();
 addPremiumHovers();
 initReveals();
 enhanceEngineViz();

 // Hook simulator updates for smooth micro on personal-programs
 const progs = document.getElementById('personal-programs');
 if (progs) {
 const origObserver = new MutationObserver(() => {
 if (prefersReduced) return;
 progs.style.transition = 'opacity 0.3s ease';
 progs.style.opacity = '0.6';
 setTimeout(() => { progs.style.opacity = '1'; }, 180);
 });
 origObserver.observe(progs, { childList: true });
 }

 // Gentle pulse on wallet connect success (if status changes)
 const status = document.getElementById('wallet-status');
 if (status) {
 const observer = new MutationObserver(() => {
 if (!prefersReduced && status.textContent.includes('Connected')) {
 status.style.transition = 'box-shadow 0.8s ease';
 status.style.boxShadow = '0 0 12px -3px rgba(16,185,129,0.4)';
 setTimeout(() => { status.style.boxShadow = ''; }, 1600);
 }
 });
 observer.observe(status, { childList: true, subtree: true, characterData: true });
 }

 console.log('%c[Phase 4] Premium micro-interactions & animations initialized - breathing, not shouting.', 'color:#fcd34d; font-family:monospace;');
 };

 // === Phase 1 helper: pause all mercy videos (called from reduced-motion and modal hide) ===
 // Updated to not kill the currently open program's preview video.
 // Also protects the nav logo video from being paused when not necessary.
 window.pauseAllMercyVideos = function() {
 const modal = document.getElementById('program-modal');
 const isModalOpen = modal && !modal.classList.contains('hidden');
 document.querySelectorAll('video').forEach(v => {
 if (isModalOpen && v.closest('#program-modal')) return;
 if (v.closest('.logo-3d-wrapper')) return;
 if (typeof window.shhReleaseVideoPlay === 'function') {
  window.shhReleaseVideoPlay(v);
  return;
 }
 try { v.pause(); } catch (e) {}
 });
 };

 // === Phase 1: Vanilla focus trap + ESC manager for modals (loving a11y, reusable) ===
 // Used by show/hideProgramModal in both pages. Simple, no libs, respects reduced motion.
 // Stores last focused element and returns focus on close. Traps Tab within modal.
 window.setupModalFocusManager = function(modalEl, closeBtnEl) {
 let lastFocused = null;
 let keyHandler = null;

 function getFocusable() {
 return modalEl.querySelectorAll(
 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
 );
 }

 function handleKeydown(e) {
 if (e.key === 'Escape') {
 e.preventDefault();
 // Let the caller (hideModal) handle actual close + focus return
 if (typeof window.hideModal === 'function') window.hideModal();
 else if (closeBtnEl) closeBtnEl.click();
 return;
 }
 if (e.key !== 'Tab') return;
 const focusables = getFocusable();
 if (!focusables.length) return;
 const first = focusables[0];
 const last = focusables[focusables.length - 1];
 if (e.shiftKey && document.activeElement === first) {
 e.preventDefault();
 last.focus();
 } else if (!e.shiftKey && document.activeElement === last) {
 e.preventDefault();
 first.focus();
 }
 }

 return {
 activate: function() {
 lastFocused = document.activeElement;
 // Attach ESC + trap
 keyHandler = handleKeydown;
 modalEl.addEventListener('keydown', keyHandler);
 // Initial focus: prefer close button for safety, else first focusable
 setTimeout(() => {
 if (closeBtnEl && closeBtnEl.offsetParent !== null) {
 closeBtnEl.focus();
 } else {
 const f = getFocusable();
 if (f.length) f[0].focus();
 }
 }, 10);
 },
 deactivate: function() {
 if (keyHandler) {
 modalEl.removeEventListener('keydown', keyHandler);
 keyHandler = null;
 }
 // Return focus lovingly
 if (lastFocused && lastFocused.offsetParent !== null) {
 setTimeout(() => lastFocused.focus(), 10);
 }
 lastFocused = null;
 }
 };
 };

 // Phase 4: update particle intensity based on holdings (density, brightness, speed)
 // Called from dashboard updates (updatePersonalView / simulate) so the floating hearts/paws feel more alive as the mercy grows with your holding.
 // Gentle scaling, respects reduced motion (early return).
 window.updateMercyParticleIntensity = function(nBal = 0, hBal = 0) {
 if (prefersReduced) return;
 const total = (nBal || 0) + (hBal || 0);
 // 0.5x (small holding) to ~2.2x (strong holding) for more energy in the particles
 const intensity = Math.min(2.2, Math.max(0.5, 0.5 + (total / 200000)));
 window.mercyParticleIntensity = intensity;

 // Re-init particles on program cards to apply updated density/opacity/speed
 // (light cost, only on user-driven updates like sim or connect; beautiful result)
 document.querySelectorAll('.program-card').forEach(card => {
 const cont = card.querySelector('.floating-elements');
 if (cont) cont.innerHTML = '';
 card.removeAttribute('data-particles-init');
 });
 if (window.initFloatingParticles) {
 window.initFloatingParticles();
 }
 };

 // Auto-init if DOM ready
 if (document.readyState === 'loading') {
 document.addEventListener('DOMContentLoaded', () => {
 if (window.initPremiumAnimations) window.initPremiumAnimations();
 });
 } else {
 if (window.initPremiumAnimations) window.initPremiumAnimations();
 }

 // === Giant faint Wheel of Mercy background - ULTIMATE SCROLL EXPERIENCE ===
 // Multi-frequency faint gold + hopeseed flywheel. 
 // Heartfelt, wholesome, premium restraint. Bilyeu depth + Elon precision + Vitalik elegance.
 // Turns with your scroll at different layered frequencies for a living, breathing feel.
 // Ultra-faint so content always leads; leaves a warm, good taste.
 window.initMercyWheel = function() {
 if (prefersReduced) return;
 /* Mobile: paint stability CSS already hides the wheel; skip build cost */
 if (isCoarseMobile) return;
 if (document.getElementById('mercy-wheel')) return;

 const wheel = document.createElement('div');
 wheel.id = 'mercy-wheel';
 wheel.setAttribute('aria-hidden', 'true');
 wheel.style.cssText = `
 position: fixed;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
 width: 118vmin;
 height: 118vmin;
 opacity: 0.034;
 pointer-events: none;
 z-index: -1;
 mix-blend-mode: screen;
 /* Static glow only — animated filter is a major paint cost */
 contain: strict;
 `;

 // Precision dual-tone presence without filter keyframes
 if (!document.getElementById('mercy-glow-style')) {
 const glowStyle = document.createElement('style');
 glowStyle.id = 'mercy-glow-style';
 glowStyle.textContent = `
 #mercy-wheel {
 opacity: 0.034;
 transition: opacity 1.2s ease;
 }
 @keyframes mercyWheelSoft {
 0%, 100% { opacity: 0.030; }
 50% { opacity: 0.040; }
 }
 @media (prefers-reduced-motion: no-preference) {
 #mercy-wheel { animation: mercyWheelSoft 8s ease-in-out infinite; }
 }
 .mercy-orbit {
 position: absolute;
 border-radius: 50%;
 pointer-events: none;
 mix-blend-mode: screen;
 will-change: transform;
 }
 .mercy-orbit.g { background: #fcd34d; box-shadow: 0 0 6px #fcd34d; }
 .mercy-orbit.h { background: #34d399; box-shadow: 0 0 5px #34d399; }
 `;
 document.head.appendChild(glowStyle);
 }

 // Multi-layered elegant SVG: distinct frequencies via groups (outer slow gold, mid hopeseed, spokes, symbols with hearts/paws)
 wheel.innerHTML = `
 <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
 <defs>
 <linearGradient id="goldHopeseed" x1="0%" y1="0%" x2="100%" y2="100%">
 <stop offset="0%" stop-color="#fcd34d" stop-opacity="0.7"/>
 <stop offset="100%" stop-color="#34d399" stop-opacity="0.55"/>
 </linearGradient>
 </defs>
 
 <!-- Outer slow majestic ring - gold dominant, very faint -->
 <g id="mw-outer">
 <circle cx="100" cy="100" r="94" stroke="#fcd34d" stroke-width="1.6" opacity="0.38"/>
 </g>
 
 <!-- Mid ring - hopeseed tone, different radius for depth -->
 <g id="mw-mid">
 <circle cx="100" cy="100" r="79" stroke="#34d399" stroke-width="1.1" opacity="0.34"/>
 </g>
 
 <!-- Spokes - 8 divisions, dual tone subtle, medium frequency -->
 <g id="mw-spokes" stroke="#fcd34d" stroke-width="0.9" opacity="0.32">
 <line x1="100" y1="7" x2="100" y2="193"/>
 <line x1="7" y1="100" x2="193" y2="100"/>
 <line x1="26" y1="26" x2="174" y2="174"/>
 <line x1="174" y1="26" x2="26" y2="174"/>
 <line x1="48" y1="9" x2="152" y2="191"/>
 <line x1="9" y1="48" x2="191" y2="152"/>
 <line x1="48" y1="191" x2="152" y2="9"/>
 <line x1="191" y1="48" x2="9" y2="152"/>
 <!-- Extra hopeseed spokes for richer faint texture -->
 <line x1="100" y1="7" x2="100" y2="193" stroke="#34d399" opacity="0.22"/>
 <line x1="7" y1="100" x2="193" y2="100" stroke="#34d399" opacity="0.22"/>
 </g>
 
 <!-- Inner subtle ring -->
 <g id="mw-inner">
 <circle cx="100" cy="100" r="42" stroke="#fcd34d" stroke-width="0.7" opacity="0.28"/>
 <circle cx="100" cy="100" r="29" stroke="#34d399" stroke-width="0.6" opacity="0.25"/>
 </g>
 
 <!-- Heartful symbols - ultra faint hearts, paws and stars at different positions. Wholesome soulful feel -->
 <g id="mw-symbols">
 <text x="100" y="32" font-size="13" fill="#fcd34d" text-anchor="middle" opacity="0.32">✦</text>
 <text x="100" y="172" font-size="13" fill="#34d399" text-anchor="middle" opacity="0.30">✦</text>
 <text x="100" y="100" font-size="15" fill="#fcd34d" text-anchor="middle" opacity="0.18">❤️</text>
 
 <text x="34" y="100" font-size="12" fill="#fcd34d" text-anchor="middle" opacity="0.26">🐾</text>
 <text x="166" y="100" font-size="12" fill="#34d399" text-anchor="middle" opacity="0.26">🐾</text>
 <text x="58" y="58" font-size="10" fill="#34d399" text-anchor="middle" opacity="0.22">🌱</text>
 <text x="142" y="142" font-size="10" fill="#fcd34d" text-anchor="middle" opacity="0.22">🌱</text>
 </g>
 </svg>
 `;

 document.body.appendChild(wheel);

 // Micro orbiting faint gold + hopeseed orbs (lightweight for speed - reduced to 3 for perf)
 const orbits = [];
 const orbitData = [
 {x: 18, y: 22, size: 2.2, cls: 'g', phase: 0},
 {x: 82, y: 19, size: 1.6, cls: 'h', phase: 1.7},
 {x: 79, y: 81, size: 1.5, cls: 'g', phase: 4.4}
 ];
 orbitData.forEach((o, idx) => {
 const orb = document.createElement('div');
 orb.className = `mercy-orbit ${o.cls}`;
 orb.style.cssText = `left:${o.x}%; top:${o.y}%; width:${o.size}px; height:${o.size}px; opacity:0.11;`;
 wheel.appendChild(orb);
 orbits.push({el: orb, baseX: o.x, baseY: o.y, size: o.size, phase: o.phase});
 });

 // Scroll state with MULTIPLE independent frequencies
 let lastScroll = window.scrollY;
 let rotOuter = 0, rotSpokes = 0, rotInner = 0, rotSymbols = 0;
 let ticking = false;

 const outerG = wheel.querySelector('#mw-outer');
 const spokesG = wheel.querySelector('#mw-spokes');
 const innerG = wheel.querySelector('#mw-inner');
 const symbolsG = wheel.querySelector('#mw-symbols');

 function applyRotations() {
 const cx = 100, cy = 100; // viewBox center
 if (outerG) outerG.setAttribute('transform', `rotate(${rotOuter} ${cx} ${cy})`);
 if (spokesG) spokesG.setAttribute('transform', `rotate(${rotSpokes} ${cx} ${cy})`);
 if (innerG) innerG.setAttribute('transform', `rotate(${rotInner} ${cx} ${cy})`);
 if (symbolsG) symbolsG.setAttribute('transform', `rotate(${rotSymbols} ${cx} ${cy})`);

 // Orbiters: rare updates only (scroll delta / idle). No Date.now breath.
 orbits.forEach((o, i) => {
 const freq = (i % 2 === 0) ? 0.009 : 0.014;
 const angle = (rotSymbols * freq * 1.6) + (o.phase * 9);
 const rad = angle * (Math.PI / 180);
 const r = 38 + (i % 2) * 4;
 const ox = 50 + Math.cos(rad) * (r / 1.9);
 const oy = 50 + Math.sin(rad) * (r / 1.9);
 o.el.style.left = `${ox.toFixed(2)}%`;
 o.el.style.top = `${oy.toFixed(2)}%`;
 });
 }

 function onScroll() {
 if (document.hidden) return;
 if (!ticking) {
 window.requestAnimationFrame(() => {
 const scrollY = window.scrollY;
 const delta = scrollY - lastScroll;

 if (Math.abs(delta) > 4) {
 rotOuter += delta * 0.0062;
 rotSpokes += delta * 0.0128;
 rotInner += delta * -0.0041;
 rotSymbols += delta * 0.017;
 applyRotations();
 }
 lastScroll = scrollY;
 ticking = false;
 });
 ticking = true;
 }
 }

 window.addEventListener('scroll', onScroll, { passive: true });

 // Idle spin: slower interval, skip when tab hidden or scrolling
 let idleTick = 0;
 const idleTimer = setInterval(() => {
 if (document.hidden) return;
 if (document.body.classList.contains('is-scrolling')) return;
 if (Math.abs(window.scrollY - lastScroll) < 4) {
 idleTick += 0.6;
 rotOuter += 0.002;
 rotSpokes += 0.004;
 rotInner += -0.001;
 rotSymbols += 0.003 + Math.sin(idleTick / 11) * 0.001;
 applyRotations();
 }
 }, 1800);

 // Also softly sync global scroll var for other elements (engine, subtle accents) to hook into
 const syncGlobalScroll = () => {
 const prog = Math.min(Math.max(window.scrollY / (document.body.scrollHeight * 0.6), 0), 1);
 document.documentElement.style.setProperty('--mercy-flywheel-progress', prog.toFixed(3));
 };
 window.addEventListener('scroll', () => { if (!ticking) syncGlobalScroll(); }, { passive: true });

 // Expose
 window.mercyWheel = wheel;
 window._mercyWheelRot = () => ({rotOuter, rotSpokes, rotInner, rotSymbols});
 };

 // Auto init mercy wheel on EVERY page for the ultimate consistent scroll experience.
 // Faint enough to never interfere with reading or cards. Wholesome atmosphere everywhere.
 function shouldInitWheel() {
 return true; // all pages now receive the faint multi-frequency gold + hopeseed flywheel
 }

 if (document.readyState === 'loading') {
 document.addEventListener('DOMContentLoaded', () => {
 if (shouldInitWheel() && window.initMercyWheel) window.initMercyWheel();
 });
 } else {
 if (shouldInitWheel() && window.initMercyWheel) window.initMercyWheel();
 }

 // === Sitewide video policy: PLAY THROUGH SCROLL (while visible) ===
 // Visible clips keep playing during scroll (no stop-start jank).
 // Offscreen clips pause. Concurrent budget: 1 mobile / 2 desktop (+ logo).
 // Reduced motion + hidden tab always pause.
 window.SHH_VIDEO_PLAY_THROUGH_SCROLL = true;
 window.SHH_VIDEO_MAX = isCoarseMobile ? 1 : 2;

 var __shhVideoPlaying = [];
 var __shhVideoIo = null;

 function shhIsLogoVideo(video) {
  return !!(video && (video.closest('.logo-3d-wrapper') || video.getAttribute('data-shh-logo') === '1'));
 }

 function shhShouldKeepVideoPlaying(video) {
  if (!video || video.tagName !== 'VIDEO') return false;
  if (video.getAttribute('data-allow-pause') === '1') return false;
  if (prefersReduced) return false;
  if (document.hidden) return false;
  return true;
 }

 function shhKickVideoRaw(video) {
  if (!video || !shhShouldKeepVideoPlaying(video)) return;
  try {
   video.muted = true;
   video.playsInline = true;
   video.setAttribute('playsinline', '');
   video.setAttribute('muted', '');
   if (video.getAttribute('data-allow-pause') !== '1') {
    video.setAttribute('data-keep-playing', '1');
   }
   if (video.paused) {
    var p = video.play();
    if (p && typeof p.catch === 'function') p.catch(function () { /* autoplay blocked */ });
   }
  } catch (eKick) { /* ignore */ }
 }

 function shhRequestVideoPlay(video) {
  if (!video || !shhShouldKeepVideoPlaying(video)) return;
  if (shhIsLogoVideo(video)) {
   try { video.preload = 'metadata'; } catch (e0) { /* ignore */ }
   shhKickVideoRaw(video);
   return;
  }
  var idx = __shhVideoPlaying.indexOf(video);
  if (idx === -1) {
   while (__shhVideoPlaying.length >= (window.SHH_VIDEO_MAX || 2)) {
    var old = __shhVideoPlaying.shift();
    if (old && old !== video) {
     try { old.pause(); } catch (e1) { /* ignore */ }
     old.setAttribute('data-shh-budget-paused', '1');
     try { old.preload = 'metadata'; } catch (e2) { /* ignore */ }
    }
   }
   __shhVideoPlaying.push(video);
  } else {
   /* Promote to most-recent */
   __shhVideoPlaying.splice(idx, 1);
   __shhVideoPlaying.push(video);
  }
  video.removeAttribute('data-shh-budget-paused');
  try { video.preload = 'auto'; } catch (e3) { /* ignore */ }
  shhKickVideoRaw(video);
 }

 function shhReleaseVideoPlay(video) {
  if (!video || shhIsLogoVideo(video)) return;
  var idx = __shhVideoPlaying.indexOf(video);
  if (idx !== -1) __shhVideoPlaying.splice(idx, 1);
  try { video.pause(); } catch (e4) { /* ignore */ }
  video.setAttribute('data-shh-budget-paused', '1');
  try { video.preload = 'metadata'; } catch (e5) { /* ignore */ }
 }

 function shhKickVideo(video) {
  shhRequestVideoPlay(video);
 }

 function shhObserveVideo(video) {
  if (!video || video.getAttribute('data-shh-vid-obs') === '1') return;
  video.setAttribute('data-shh-vid-obs', '1');
  if (shhIsLogoVideo(video)) {
   shhRequestVideoPlay(video);
   return;
  }
  /* Start light: metadata until near viewport */
  try {
   if (video.preload === 'auto' || video.getAttribute('preload') === 'auto') {
    video.preload = 'metadata';
    video.setAttribute('preload', 'metadata');
   }
  } catch (e6) { /* ignore */ }

  if (!window.IntersectionObserver) {
   shhRequestVideoPlay(video);
   return;
  }
  if (!__shhVideoIo) {
   __shhVideoIo = new IntersectionObserver(
    function (ents) {
     ents.forEach(function (ent) {
      var v = ent.target;
      if (ent.isIntersecting && ent.intersectionRatio >= 0.05) {
       shhRequestVideoPlay(v);
      } else if (!ent.isIntersecting) {
       shhReleaseVideoPlay(v);
      }
     });
    },
    { rootMargin: '140px 0px', threshold: [0, 0.05, 0.2] }
   );
  }
  __shhVideoIo.observe(video);
 }

 window.shhKickVideo = shhKickVideo;
 window.shhRequestVideoPlay = shhRequestVideoPlay;
 window.shhReleaseVideoPlay = shhReleaseVideoPlay;
 window.shhObserveVideo = shhObserveVideo;
 window.shhShouldKeepVideoPlaying = shhShouldKeepVideoPlaying;

 function initLazyVideos() {
  var videos = document.querySelectorAll('video');
  if (!videos.length) return;

  videos.forEach(function (v) {
   if (v.getAttribute('data-allow-pause') === '1') return;
   var wantsAuto =
    v.hasAttribute('autoplay') ||
    v.hasAttribute('loop') ||
    v.getAttribute('data-keep-playing') === '1' ||
    v.closest('.logo-3d-wrapper') ||
    v.id === 'nb-hero-video' ||
    v.id === 'gp-hero-video' ||
    v.id === 'hh-hero-video' ||
    v.id === 'k9-hero-video' ||
    v.id === 'pif-hero-video' ||
    (v.src && /assets\/videos\//.test(v.getAttribute('src') || v.currentSrc || ''));
   if (!wantsAuto) return;
   v.setAttribute('data-keep-playing', '1');
   shhObserveVideo(v);
  });

  if (!window.__shhVideoMo) {
   window.__shhVideoMo = new MutationObserver(function (muts) {
    muts.forEach(function (m) {
     m.addedNodes && m.addedNodes.forEach(function (node) {
      if (!node || node.nodeType !== 1) return;
      var list = [];
      if (node.tagName === 'VIDEO') list.push(node);
      if (node.querySelectorAll) {
       node.querySelectorAll('video').forEach(function (vv) { list.push(vv); });
      }
      list.forEach(function (v) {
       if (v.getAttribute('data-allow-pause') === '1') return;
       if (
        v.hasAttribute('autoplay') ||
        v.hasAttribute('loop') ||
        v.getAttribute('data-keep-playing') === '1' ||
        (v.getAttribute('src') || '').indexOf('assets/videos/') !== -1
       ) {
        v.setAttribute('data-keep-playing', '1');
        shhObserveVideo(v);
       }
      });
     });
    });
   });
   try {
    window.__shhVideoMo.observe(document.documentElement, { childList: true, subtree: true });
   } catch (eMo) { /* ignore */ }
  }

  if (!window.__shhVideoVis) {
   window.__shhVideoVis = true;
   document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
     document.querySelectorAll('video').forEach(function (v) {
      if (shhIsLogoVideo(v)) {
       try { v.pause(); } catch (e7) { /* ignore */ }
       return;
      }
      shhReleaseVideoPlay(v);
     });
     return;
    }
    /* Restore only currently intersecting keep-playing clips via IO kick */
    document.querySelectorAll('video[data-keep-playing="1"]').forEach(function (v) {
     try {
      var r = v.getBoundingClientRect();
      var vh = window.innerHeight || 0;
      if (r.bottom > -40 && r.top < vh + 40) shhRequestVideoPlay(v);
     } catch (e8) { /* ignore */ }
    });
   });
  }
 }

 if (document.readyState === 'loading') {
 document.addEventListener('DOMContentLoaded', initLazyVideos);
 } else {
 initLazyVideos();
 }

 // === Global wholesome scroll atmosphere + extra frequencies for ultimate heartfelt experience ===
 // Very faint gold/hopeseed soft drifts + breathing that respond to scroll. 
 // Makes the entire site feel like one living, loving flywheel. Never intrusive.
 function initGlobalScrollHeart() {
 if (prefersReduced) return;

 // Inject soft global styles for multi-frequency warmth
 if (!document.getElementById('mercy-global-heart-style')) {
 const gStyle = document.createElement('style');
 gStyle.id = 'mercy-global-heart-style';
 gStyle.textContent = `
 :root { --mercy-flywheel-progress: 0; }
 
 /* Static atmosphere — no per-scroll gradient rewrites (major paint savings) */
 .mercy-atmosphere {
 position: fixed;
 inset: 0;
 pointer-events: none;
 z-index: -2;
 background:
 radial-gradient(ellipse at 38% 22%, rgba(252,211,77,0.018) 0%, transparent 58%),
 radial-gradient(ellipse at 72% 68%, rgba(52,211,153,0.015) 0%, transparent 64%);
 opacity: 0.58;
 contain: strict;
 }
 /* Hero soft breath only — never on every program card (was continuous opacity paint) */
 @media (min-width: 768px) and (prefers-reduced-motion: no-preference) {
 .hero-bg, main > section:first-of-type {
 animation: mercySoftBreath 22s ease-in-out infinite;
 }
 }
 @keyframes mercySoftBreath {
 0%,100% { opacity: 1; }
 50% { opacity: 0.988; }
 }
 `;
 document.head.appendChild(gStyle);
 }

 // Create the atmosphere layer once (desktop only — mobile CSS hides it)
 if (!isCoarseMobile && !document.querySelector('.mercy-atmosphere')) {
 const atm = document.createElement('div');
 atm.className = 'mercy-atmosphere';
 document.body.appendChild(atm);
 window.mercyAtmosphere = atm;
 }

 // Light scroll warmth: opacity only via CSS var (no background string thrash)
 let atmTick = false;
 window.addEventListener('scroll', () => {
 if (isCoarseMobile || document.hidden) return;
 if (!atmTick) {
 requestAnimationFrame(() => {
 const atm = window.mercyAtmosphere;
 if (atm) {
 const p = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--mercy-flywheel-progress')) || 0;
 atm.style.opacity = (0.52 + p * 0.16).toFixed(2);
 }
 atmTick = false;
 });
 atmTick = true;
 }
 }, { passive: true });

 // One time gentle initialization breath on major sections
 setTimeout(() => {
 document.querySelectorAll('main, .hero-bg, section').forEach((el, i) => {
 if (i < 4) {
 el.style.transition = 'opacity 1.1s ease, filter 1.1s ease';
 }
 });
 }, 420);

 // Coordinate with index's local engine scroll var for unified flywheel frequency feel
 const engineEl = document.getElementById('mercy-engine');
 if (engineEl) {
 // Occasionally nudge the local progress from global wheel motion for richer scroll layers (very subtle extra frequency)
 setInterval(() => {
 if (!prefersReduced) {
 const currentProg = parseFloat(engineEl.style.getPropertyValue('--mercy-scroll-progress') || '0.1');
 const nudge = (Math.sin(Date.now() / 19000) * 0.012);
 engineEl.style.setProperty('--mercy-scroll-progress', Math.max(0, Math.min(1, currentProg + nudge)).toFixed(3));
 }
 }, 2300);
 }
 }

 // Run global heart + scroll atmosphere on all pages
 if (document.readyState === 'loading') {
 document.addEventListener('DOMContentLoaded', initGlobalScrollHeart);
 } else {
 initGlobalScrollHeart();
 }
})();
