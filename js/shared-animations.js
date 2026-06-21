// shared-animations.js
// Unified, premium, tone-preserving micro-interactions and animations.
// Everything must feel like breathing, gentle heartbeats, or quiet ripples of mercy.
// Never flashy. Always offer prefers-reduced-motion respect.

(function() {
  // Respect reduced motion globally
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Phase 4: global intensity for particle reactivity to holdings (set from updatePersonalView/simulate)
  window.mercyParticleIntensity = 1;

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
  // Elon / Vitalik / Bilyeu style: elegant, first-principles, quietly profound.
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

      // Premium, soft, high-end glow (Elon/Vitalik level of craft. Not cheap neon.)
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
  window.initPremiumAnimations = function() {
    initReducedMotion();
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
      if (isModalOpen && v.closest('#program-modal')) {
        return; // leave the open modal's program preview alone (we start it explicitly in show)
      }
      if (v.closest('.logo-3d-wrapper')) {
        return; // keep the always-visible nav logo video running (it's decorative)
      }
      try { v.pause(); v.removeAttribute('autoplay'); } catch (e) {}
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
      opacity: 0.032;
      pointer-events: none;
      z-index: -1;
      mix-blend-mode: screen;
      filter: drop-shadow(0 0 22px rgba(252,211,77,0.08)) drop-shadow(0 0 38px rgba(52,211,153,0.07));
      transition: transform 60ms linear;
    `;

    // Inject refined faint dual-tone (gold + hopeseed) breathing glow - softer, more frequencies
    if (!document.getElementById('mercy-glow-style')) {
      const glowStyle = document.createElement('style');
      glowStyle.id = 'mercy-glow-style';
      glowStyle.textContent = `
        @keyframes mercyMidnightGlow {
          0%, 100% {
            filter: drop-shadow(0 0 22px rgba(252,211,77,0.08)) drop-shadow(0 0 38px rgba(52,211,153,0.065));
            opacity: 0.032;
          }
          42% {
            filter: drop-shadow(0 0 30px rgba(252,211,77,0.12)) drop-shadow(0 0 46px rgba(52,211,153,0.09));
            opacity: 0.041;
          }
          78% {
            filter: drop-shadow(0 0 18px rgba(52,211,153,0.10)) drop-shadow(0 0 35px rgba(252,211,77,0.07));
            opacity: 0.036;
          }
        }
        #mercy-wheel { animation: mercyMidnightGlow 1.85s ease-in-out infinite; }
        
        /* Extra frequency micro orbs - faint gold / hopeseed orbiting atmosphere */
        .mercy-orbit {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          mix-blend-mode: screen;
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

      // Orbiters at different frequencies + very slow independent drift
      orbits.forEach((o, i) => {
        const freq = (i % 2 === 0) ? 0.009 : 0.014;
        const angle = (rotSymbols * freq * 1.6) + (o.phase * 9);
        const rad = angle * (Math.PI / 180);
        const r = 38 + (i % 2) * 4; // radius from center
        const ox = 50 + Math.cos(rad) * (r / 1.9);
        const oy = 50 + Math.sin(rad) * (r / 1.9);
        o.el.style.left = `${ox}%`;
        o.el.style.top = `${oy}%`;
        // gentle size breath at different rate
        const breath = 0.78 + Math.sin((Date.now() / 1800) + o.phase) * 0.22;
        o.el.style.transform = `scale(${breath.toFixed(3)})`;
        o.el.style.opacity = (0.09 + Math.sin((Date.now() / 2600) + i) * 0.025).toFixed(3);
      });
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const delta = scrollY - lastScroll;

          if (Math.abs(delta) > 3) {
            // Different frequencies for the ultimate layered flywheel turning feel
            rotOuter += delta * 0.0062;     // slow, majestic outer
            rotSpokes += delta * 0.0128;    // medium spokes (core energy)
            rotInner += delta * -0.0041;    // counter rotation for depth + parallax
            rotSymbols += delta * 0.017;    // fastest inner symbols + hearts

            applyRotations();
          }
          lastScroll = scrollY;
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Multiple idle frequencies for continuous aliveness when still (wholesome breathing)
    let idleTick = 0;
    const idleTimer = setInterval(() => {
      if (Math.abs(window.scrollY - lastScroll) < 4) {
        idleTick += 0.6;
        // Varied idle speeds (throttled for perf)
        rotOuter += 0.002;
        rotSpokes += 0.004;
        rotInner += -0.001;
        rotSymbols += 0.003 + Math.sin(idleTick / 11) * 0.001;

        applyRotations();
      }
    }, 1100);

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

  // Lazy load videos for fast smooth experience - play only when visible (no lag on load)
  function initLazyVideos() {
    const videos = document.querySelectorAll('video[autoplay]');
    if (!videos.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          if (!prefersReduced) {
            video.play().catch(() => {});
          }
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.1 });

    videos.forEach(v => {
      v.muted = true;
      v.playsInline = true;
      observer.observe(v);
    });
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
        
        /* Ultra faint global atmosphere layer - gold + hopeseed soft presence while scrolling */
        .mercy-atmosphere {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: -2;
          background: 
            radial-gradient(ellipse at 38% 22%, rgba(252,211,77,0.018) 0%, transparent 58%),
            radial-gradient(ellipse at 72% 68%, rgba(52,211,153,0.015) 0%, transparent 64%);
          opacity: 0.6;
          transition: opacity 1200ms ease;
        }

        /* Heartful slow breathing on primary containers (wholesome, not animated flash) */
        .hero-bg, main > section:first-of-type, .program-card, .soul-card, .star-card, .k9-card {
          animation: mercySoftBreath 19s ease-in-out infinite;
        }
        @keyframes mercySoftBreath {
          0%,100% { opacity: 1; }
          50% { opacity: 0.985; }
        }

        /* Scroll-tied micro warmth on key text (very restrained, premium taste) */
        h1, h2.hero-title, .hero-title-wrapper {
          transition: filter 600ms ease;
        }
      `;
      document.head.appendChild(gStyle);
    }

    // Create the atmosphere layer once
    if (!document.querySelector('.mercy-atmosphere')) {
      const atm = document.createElement('div');
      atm.className = 'mercy-atmosphere';
      document.body.appendChild(atm);
      window.mercyAtmosphere = atm;
    }

    // Scroll-linked subtle frequency shift on atmosphere (different rate from wheel)
    let atmTick = false;
    window.addEventListener('scroll', () => {
      if (!atmTick) {
        requestAnimationFrame(() => {
          const atm = window.mercyAtmosphere;
          if (atm) {
            const p = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--mercy-flywheel-progress')) || 0;
            // Gentle position shift for parallax depth (other frequency)
            const shiftX = 48 + (p * 4);
            const shiftY = 38 + Math.sin(p * 6) * 3.5;
            atm.style.background = `
              radial-gradient(ellipse at ${shiftX}% ${shiftY}%, rgba(252,211,77,0.019) 0%, transparent 60%),
              radial-gradient(ellipse at ${72 - p*5}% ${64 + p*2}%, rgba(52,211,153,0.017) 0%, transparent 66%)
            `;
            // Very soft brightness modulation at scroll
            atm.style.opacity = (0.55 + p * 0.18).toFixed(2);
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
