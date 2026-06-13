// shared-animations.js
// Unified, premium, tone-preserving micro-interactions and animations.
// Everything must feel like breathing, gentle heartbeats, or quiet ripples of mercy.
// Never flashy. Always offer prefers-reduced-motion respect.

(function() {
  // Respect reduced motion globally
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    }
  }

  // Enhanced floating particles (unified from all-programs, now shared)
  function createFloatingParticles(card) {
    if (prefersReduced) return;
    const container = card.querySelector('.floating-elements');
    if (!container) return;

    const isNibbles = card.classList.contains('nibbles-card');
    const emojis = isNibbles ? ['🐾', '❤️', '🐾', '💛'] : ['❤️', '🌱', '💚', '❤️'];

    const interval = setInterval(() => {
      if (!card.isConnected || prefersReduced) {
        clearInterval(interval);
        return;
      }
      const particle = document.createElement('div');
      particle.className = 'float-particle';
      particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      particle.style.left = Math.random() * 85 + 7 + '%';
      particle.style.animationDuration = (2.8 + Math.random() * 2.2) + 's';
      particle.style.opacity = 0.7 + Math.random() * 0.3;
      container.appendChild(particle);
      setTimeout(() => {
        if (particle.parentNode) particle.parentNode.removeChild(particle);
      }, 8000);
    }, 650);
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
          btn.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.2), 0 0 25px -5px rgba(16,185,129,0.3)';
        }
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.boxShadow = '';
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

    console.log('%c[Phase 4] Premium micro-interactions & animations initialized — breathing, not shouting.', 'color:#fcd34d; font-family:monospace;');
  };

  // Auto-init if DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (window.initPremiumAnimations) window.initPremiumAnimations();
    });
  } else {
    if (window.initPremiumAnimations) window.initPremiumAnimations();
  }
})();
