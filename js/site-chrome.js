/**
 * Shared site chrome: footer egress + trust links.
 * Mount empty: <div id="shh-site-footer" data-shh-footer></div>
 * Skips nodes that already contain a static .shh-site-footer.
 */
(function () {
 'use strict';

 function pathPrefix() {
  try {
   var path = location.pathname || '';
   if (/\/programs\//i.test(path)) return '../';
  } catch (e) { /* ignore */ }
  return '';
 }

 function footerHtml(prefix) {
  var p = prefix || '';
  return (
   '<footer class="shh-site-footer border-t border-amber-500/25 bg-black">' +
   '<div class="max-w-5xl mx-auto px-5 py-12 text-center">' +
   '<p class="text-2xl md:text-3xl font-light text-amber-200 mb-6">Thank you for being here.</p>' +
   '<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm text-left max-w-4xl mx-auto mb-8">' +
   '<div><div class="text-[10px] tracking-[0.14em] uppercase text-zinc-500 mb-2">Programs</div>' +
   '<nav class="shh-footer-nav flex flex-col gap-2">' +
   '<a href="' + p + 'all-programs.html#seed-focus">All programs</a>' +
   '<a href="' + p + 'shelters.html">Meet the Souls</a>' +
   '<a href="/#how-it-works">How it works</a>' +
   '</nav></div>' +
   '<div><div class="text-[10px] tracking-[0.14em] uppercase text-zinc-500 mb-2">Docs</div>' +
   '<nav class="shh-footer-nav flex flex-col gap-2">' +
   '<a href="' + p + 'whitepaper.html">Whitepaper</a>' +
   '<a href="' + p + 'mercy-blueprint.html">Blueprint</a>' +
   '<a href="' + p + 'faq.html">FAQ</a>' +
   '</nav></div>' +
   '<div><div class="text-[10px] tracking-[0.14em] uppercase text-zinc-500 mb-2">Community</div>' +
   '<nav class="shh-footer-nav flex flex-col gap-2">' +
   '<a href="https://x.com/Shibhumanityhub" target="_blank" rel="noopener">X</a>' +
   '<a href="' + p + 'spin-the-wheel.html">Spin the Wheel</a>' +
   '<a href="' + p + 'pay-it-forward.html">Pay It Forward</a>' +
   '</nav></div>' +
   '<div><div class="text-[10px] tracking-[0.14em] uppercase text-zinc-500 mb-2">Legal &amp; contact</div>' +
   '<nav class="shh-footer-nav flex flex-col gap-2">' +
   '<a href="' + p + 'contact.html">Contact</a>' +
   '<a href="' + p + 'privacy.html">Privacy</a>' +
   '<a href="' + p + 'terms.html">Terms</a>' +
   '</nav></div>' +
   '</div>' +
   '<p class="text-emerald-300/90 text-xs max-w-2xl mx-auto leading-relaxed">© Shiba Humanity Hub · Incorporated entity · Pre-launch · Registered charity application in progress</p>' +
   '<p class="text-zinc-500 text-[10px] mt-2 max-w-xl mx-auto leading-relaxed">Not financial advice. Contracts live. Delivery claims wait for rails.</p>' +
   '</div>' +
   '</footer>'
  );
 }

 function injectStyles() {
  if (document.getElementById('shh-site-chrome-css')) return;
  var s = document.createElement('style');
  s.id = 'shh-site-chrome-css';
  s.textContent = [
   '.shh-footer-nav a{color:rgba(252,211,77,0.85);text-decoration:none;border-bottom:1px solid transparent}',
   '.shh-footer-nav a:hover{color:#fff;border-bottom-color:rgba(52,211,153,0.5)}',
   '.shh-door{transition:border-color .2s,transform .2s,background .2s}',
   '.shh-door:hover{transform:translateY(-2px)}'
  ].join('');
  document.head.appendChild(s);
 }

 function mountFooter() {
  var nodes = document.querySelectorAll('#shh-site-footer, [data-shh-footer]');
  if (!nodes.length) return;
  var html = footerHtml(pathPrefix());
  Array.prototype.forEach.call(nodes, function (el) {
   if (el.getAttribute('data-shh-footer-built') === '1') return;
   if (el.querySelector && el.querySelector('.shh-site-footer')) return;
   if (el.classList && el.classList.contains('shh-site-footer') && el.querySelector('nav')) return;
   el.setAttribute('data-shh-footer-built', '1');
   el.innerHTML = html;
  });
 }

 function init() {
  injectStyles();
  mountFooter();
 }

 if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
 } else {
  init();
 }

 window.SHHSiteChrome = { init: init, mountFooter: mountFooter };
})();
