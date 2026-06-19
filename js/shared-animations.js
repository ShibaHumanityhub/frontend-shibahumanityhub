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

    // Phase 1: dynamic count for perf/mobile (gentle on small screens or reduced) - REDUCED FOR SPEED
    let count = 3;
    if (prefersReduced) count = 0;
    else if (window.innerWidth < 480) count = 1; // tasteful on mobile

    // Phase 4: intensity from holdings (density/brightness for more alive feel when holding grows)
    const intensity = window.mercyParticleIntensity || 1;
    count = Math.floor(count * intensity);

    // Phase 4 guardrail: cap particles for performance (lots of cards or small screen)
    const cardCount = document.querySelectorAll('.program-card').length;
    if (cardCount > 8 && window.innerWidth < 640) {
      count = Math.min(count, 1);
    }

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
    document.querySelectorAll('.program-card').forEach(card => {
      if (!card.hasAttribute('data-particles-init')) {
        createFloatingParticles(card);
        card.setAttribute('data-particles-init', 'true');
      }
    });
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

  // === Giant faint Wheel of Mercy background ===
  // Bilyeu heartfelt + Elon precision + Vitalik elegant.
  // Faint rotating wheel that turns with scroll (up or down).
  // Trillionaire quality: subtle, purposeful, alive with the flywheel.
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
      transform: translate(-50%, -50%) rotate(0deg);
      width: 115vmin;
      height: 115vmin;
      opacity: 0.04;
      pointer-events: none;
      z-index: -1;
      transition: transform 80ms linear;
      mix-blend-mode: screen;
    `;

    // Simple elegant SVG wheel: outer ring + spokes + subtle symbols
    wheel.innerHTML = `
      <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Outer mercy ring -->
        <circle cx="100" cy="100" r="92" stroke="#fcd34d" stroke-width="1.5" opacity="0.6"/>
        <circle cx="100" cy="100" r="78" stroke="#10b981" stroke-width="1" opacity="0.5"/>
        
        <!-- Spokes - 8 elegant divisions -->
        <g stroke="#fcd34d" stroke-width="1" opacity="0.45">
          <line x1="100" y1="8" x2="100" y2="192"/>
          <line x1="8" y1="100" x2="192" y2="100"/>
          <line x1="29" y1="29" x2="171" y2="171"/>
          <line x1="171" y1="29" x2="29" y2="171"/>
          <line x1="50" y1="10" x2="150" y2="190"/>
          <line x1="10" y1="50" x2="190" y2="150"/>
          <line x1="50" y1="190" x2="150" y2="10"/>
          <line x1="190" y1="50" x2="10" y2="150"/>
        </g>
        
        <!-- Inner mercy symbols (hearts + paws faintly) -->
        <text x="100" y="38" font-size="14" fill="#fcd34d" text-anchor="middle" opacity="0.5">✦</text>
        <text x="100" y="170" font-size="14" fill="#10b981" text-anchor="middle" opacity="0.5">✦</text>
        <text x="38" y="105" font-size="11" fill="#fcd34d" text-anchor="middle" opacity="0.4">🐾</text>
        <text x="162" y="105" font-size="11" fill="#10b981" text-anchor="middle" opacity="0.4">🐾</text>
      </svg>
    `;

    document.body.appendChild(wheel);

    let lastScroll = window.scrollY;
    let currentRotation = 0;
    let ticking = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const delta = scrollY - lastScroll;
          // Very low cost: only rotate on significant scroll, minimal amount
          if (Math.abs(delta) > 5) {
            currentRotation += delta * 0.01;
            wheel.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;
          }
          lastScroll = scrollY;
          ticking = false;
        });
        ticking = true;
      }
    }

    // Passive for perf
    window.addEventListener('scroll', onScroll, { passive: true });

    // Minimal idle for aliveness - very infrequent
    setInterval(() => {
      if (Math.abs(window.scrollY - lastScroll) < 5) {
        currentRotation += 0.005;
        wheel.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;
      }
    }, 800);

    // Expose for potential control
    window.mercyWheel = wheel;
  };

  // Auto init mercy wheel on pages that want the background experience
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Only on key immersive pages
      const immersive = ['index.html', '', 'all-programs.html', 'star-souls.html', 'k9-lifeline.html'];
      if (immersive.some(p => location.pathname.includes(p) || location.pathname === '/')) {
        window.initMercyWheel();
      }
    });
  } else {
    const immersive = ['index.html', '', 'all-programs.html', 'star-souls.html', 'k9-lifeline.html'];
    if (immersive.some(p => location.pathname.includes(p) || location.pathname === '/')) {
      window.initMercyWheel();
    }
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
})();
