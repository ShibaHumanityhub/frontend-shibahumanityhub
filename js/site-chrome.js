/**
 * Shared chrome: nav + authenticity banner + footer
 * Mounts: [data-shh-nav], [data-shh-banner], [data-shh-footer]
 */
(function () {
 'use strict';

 function pathPrefix() {
  try {
   if (/\/programs\//i.test(location.pathname || '')) return '../';
  } catch (e) { /* ignore */ }
  return '';
 }

 function injectStyles() {
  if (document.getElementById('shh-site-chrome-css')) return;
  var s = document.createElement('style');
  s.id = 'shh-site-chrome-css';
  s.textContent = [
   '.shh-chrome-nav{position:fixed;inset:0 0 auto 0;z-index:50;background:rgba(5,7,15,.96);border-bottom:1px solid rgba(251,191,36,.28);backdrop-filter:blur(12px)}',
   '.shh-chrome-inner{max-width:80rem;margin:0 auto;padding:.75rem 1rem;display:flex;align-items:center;justify-content:space-between;gap:.75rem}',
   '.shh-chrome-links{display:none;align-items:center;gap:1.1rem;font-size:.875rem;font-weight:500}',
   '@media(min-width:1024px){.shh-chrome-links{display:flex}}',
   '.shh-chrome-links a,.shh-chrome-links button{color:#e4e4e7;background:none;border:0;cursor:pointer;font:inherit}',
   '.shh-chrome-links a:hover,.shh-chrome-links button:hover{color:#fcd34d}',
   '.shh-chrome-drop{position:relative}',
   '.shh-chrome-drop > div{display:none;position:absolute;left:0;top:100%;margin-top:.4rem;min-width:11rem;padding:.4rem 0;border-radius:1rem;border:1px solid rgba(255,255,255,.12);background:rgba(24,24,27,.97);z-index:60}',
   '.shh-chrome-drop:hover > div,.shh-chrome-drop:focus-within > div{display:block}',
   '.shh-chrome-drop > div a{display:block;padding:.45rem 1rem;font-size:.8rem;color:#e4e4e7;text-decoration:none}',
   '.shh-chrome-drop > div a:hover{background:rgba(255,255,255,.05);color:#fff}',
   '.shh-chrome-cta{display:inline-flex;align-items:center;min-height:40px;padding:.45rem .9rem;border-radius:999px;font-size:.75rem;font-weight:700;color:#0a0a0a;background:linear-gradient(135deg,#fcd34d,#f59e0b);text-decoration:none}',
   '.shh-chrome-burger{lg:hidden;background:none;border:0;color:#fff;font-size:1.25rem;padding:.35rem}',
   '@media(min-width:1024px){.shh-chrome-burger{display:none}}',
   '.shh-chrome-mobile{display:none;position:fixed;left:0;right:0;top:64px;z-index:49;background:#09090b;border-bottom:1px solid rgba(255,255,255,.1);padding:1rem 1.25rem 1.25rem;max-height:70vh;overflow:auto}',
   '.shh-chrome-mobile.is-open{display:block}',
   '@media(min-width:1024px){.shh-chrome-mobile{display:none!important}}',
   '.shh-chrome-mobile a{display:block;padding:.65rem 0;color:#e4e4e7;text-decoration:none;border-bottom:1px solid rgba(255,255,255,.06)}',
   '.shh-banner{margin-top:64px;border-bottom:1px solid rgba(251,191,36,.2);background:rgba(9,9,11,.92)}',
   '.shh-banner-inner{max-width:80rem;margin:0 auto;padding:.65rem 1rem;font-size:.78rem;line-height:1.45;color:#d4d4d8}',
   '.shh-banner strong{color:#fde68a}',
   '.shh-footer-nav a{color:rgba(252,211,77,.85);text-decoration:none}',
   '.shh-footer-nav a:hover{color:#fff}',
   '.shh-door{transition:border-color .2s,transform .2s}',
   '.shh-door:hover{transform:translateY(-2px)}',
   'body.shh-chrome-on{padding-top:0}'
  ].join('');
  document.head.appendChild(s);
 }

 function navHtml(p) {
  return (
   '<nav class="shh-chrome-nav" aria-label="Primary">' +
   '<div class="shh-chrome-inner">' +
   '<a href="/" class="flex items-center gap-2 min-w-0 text-sm font-bold text-amber-100">' +
   '<img src="' + p + 'assets/logos/shibahumanityhublogo3d-new.jpg" alt="" width="40" height="40" class="rounded-full border border-amber-400/40 object-cover" />' +
   '<span class="hidden sm:inline tracking-tight">SHIBAHUMANITYHUB</span></a>' +
   '<div class="shh-chrome-links">' +
   '<a href="/">Home</a>' +
   '<div class="shh-chrome-drop"><button type="button">Programs</button><div>' +
   '<a href="/programs">Seed focus (4)</a>' +
   '<a href="/healing-hearts">Healing Hearts</a>' +
   '<a href="/k9-lifeline">Global K9</a>' +
   '<a href="/pay-it-forward">Pay It Forward</a>' +
   '<a href="/programs/orphan-christmas.html">Orphan Christmas</a>' +
   '<a href="/all-programs">All programs</a>' +
   '</div></div>' +
   '<a href="/shelters">Meet the Souls</a>' +
   '<a href="/how-it-works">How it works</a>' +
   '<div class="shh-chrome-drop"><button type="button">Docs</button><div>' +
   '<a href="/whitepaper">Whitepaper</a>' +
   '<a href="/mercy-blueprint">Mercy Blueprint</a>' +
   '<a href="/faq">FAQ</a>' +
   '</div></div>' +
   '<div class="shh-chrome-drop"><button type="button">Community</button><div>' +
   '<a href="https://x.com/Shibhumanityhub" target="_blank" rel="noopener">X</a>' +
   '<a href="/spin-the-wheel">Spin the Wheel</a>' +
   '</div></div>' +
   '</div>' +
   '<div class="flex items-center gap-2">' +
   '<a class="shh-chrome-cta" href="/#tokens">Hold &amp; learn</a>' +
   '<button type="button" class="shh-chrome-burger" data-shh-burger aria-label="Open menu">☰</button>' +
   '</div></div>' +
   '<div class="shh-chrome-mobile" data-shh-mobile hidden>' +
   '<a href="/">Home</a>' +
   '<a href="/programs"><strong>Programs</strong> · Seed focus</a>' +
   '<a href="/healing-hearts" style="padding-left:1rem">Healing Hearts</a>' +
   '<a href="/k9-lifeline" style="padding-left:1rem">Global K9</a>' +
   '<a href="/pay-it-forward" style="padding-left:1rem">Pay It Forward</a>' +
   '<a href="/programs/orphan-christmas.html" style="padding-left:1rem">Orphan Christmas</a>' +
   '<a href="/all-programs" style="padding-left:1rem">All programs</a>' +
   '<a href="/shelters">Meet the Souls</a>' +
   '<a href="/how-it-works">How it works</a>' +
   '<a href="/whitepaper">Whitepaper</a>' +
   '<a href="/mercy-blueprint">Mercy Blueprint</a>' +
   '<a href="/faq">FAQ</a>' +
   '<a href="https://x.com/Shibhumanityhub" target="_blank" rel="noopener">X</a>' +
   '<a href="/spin-the-wheel">Spin the Wheel</a>' +
   '<a href="/#tokens">Hold &amp; learn</a>' +
   '</div></nav>'
  );
 }

 function bannerHtml() {
  return (
   '<div class="shh-banner" role="status">' +
   '<div class="shh-banner-inner">' +
   '<strong>Truth right now:</strong> Incorporated. Charity rails in progress. Receipts and full legal framing activate on approval. Contracts are live. Delivery claims wait for rails.' +
   '</div></div>'
  );
 }

 function footerHtml(p) {
  return (
   '<footer class="shh-site-footer border-t border-amber-500/25 bg-black">' +
   '<div class="max-w-5xl mx-auto px-5 py-12 text-center">' +
   '<p class="text-2xl md:text-3xl font-light text-amber-200 mb-6">Thank you for being here.</p>' +
   '<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm text-left max-w-4xl mx-auto mb-8">' +
   '<div><div class="text-[10px] tracking-[0.14em] uppercase text-zinc-500 mb-2">Programs</div>' +
   '<nav class="shh-footer-nav flex flex-col gap-2">' +
   '<a href="/programs">Seed focus</a>' +
   '<a href="/all-programs">All programs</a>' +
   '<a href="/pay-it-forward">Pay It Forward</a>' +
   '<a href="/shelters">Meet the Souls</a>' +
   '</nav></div>' +
   '<div><div class="text-[10px] tracking-[0.14em] uppercase text-zinc-500 mb-2">Docs</div>' +
   '<nav class="shh-footer-nav flex flex-col gap-2">' +
   '<a href="/whitepaper">Whitepaper</a>' +
   '<a href="/mercy-blueprint">Mercy Blueprint</a>' +
   '<a href="/faq">FAQ</a>' +
   '<a href="/whitepaper#treasury-path">How hold becomes help</a>' +
   '</nav></div>' +
   '<div><div class="text-[10px] tracking-[0.14em] uppercase text-zinc-500 mb-2">Community</div>' +
   '<nav class="shh-footer-nav flex flex-col gap-2">' +
   '<a href="https://x.com/Shibhumanityhub" target="_blank" rel="noopener">X</a>' +
   '<a href="/spin-the-wheel">Spin the Wheel</a>' +
   '</nav></div>' +
   '<div><div class="text-[10px] tracking-[0.14em] uppercase text-zinc-500 mb-2">Legal &amp; contact</div>' +
   '<nav class="shh-footer-nav flex flex-col gap-2">' +
   '<a href="/contact">Contact</a>' +
   '<a href="/privacy">Privacy</a>' +
   '<a href="/terms">Terms</a>' +
   '<a href="/how-it-works">Status</a>' +
   '</nav></div></div>' +
   '<p class="text-emerald-300/90 text-xs max-w-2xl mx-auto leading-relaxed">© Shiba Humanity Hub · Incorporated entity · Pre-launch · Registered charity application in progress</p>' +
   '<p class="text-zinc-500 text-[10px] mt-2 max-w-xl mx-auto">Not financial advice. Contracts live. Delivery claims wait for rails.</p>' +
   '</div></footer>'
  );
 }

 function mount(sel, html, skipIf) {
  var nodes = document.querySelectorAll(sel);
  Array.prototype.forEach.call(nodes, function (el) {
   if (el.getAttribute('data-shh-built') === '1') return;
   if (skipIf && skipIf(el)) return;
   el.setAttribute('data-shh-built', '1');
   el.innerHTML = html;
  });
 }

 function wireMobile() {
  var burger = document.querySelector('[data-shh-burger]');
  var panel = document.querySelector('[data-shh-mobile]');
  if (!burger || !panel) return;
  panel.hidden = false;
  burger.addEventListener('click', function () {
   panel.classList.toggle('is-open');
  });
 }

 function init() {
  injectStyles();
  var p = pathPrefix();
  mount('#shh-site-nav, [data-shh-nav]', navHtml(p));
  mount('#shh-authenticity-banner, [data-shh-banner]', bannerHtml());
  mount('#shh-site-footer, [data-shh-footer]', footerHtml(p), function (el) {
   return !!(el.querySelector && el.querySelector('.shh-site-footer, nav.shh-footer-nav'));
  });
  /* If page already has static footer.shh-site-footer, leave it */
  document.body.classList.add('shh-chrome-on');
  wireMobile();
 }

 if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
 else init();

 window.SHHSiteChrome = { init: init };
})();
