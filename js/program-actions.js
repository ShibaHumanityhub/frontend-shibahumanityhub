/**
 * Shared program CTAs: intent capture + honest thank-you.
 * Safe on every page (index, all-programs, dedicated program shells, experiences).
 * Does not invent rails. Saves intent for when funding is live.
 */
(function () {
 'use strict';

 var INTENT_KEY = 'shh_program_intents';

 function readIntents() {
  try {
   var raw = localStorage.getItem(INTENT_KEY);
   var list = raw ? JSON.parse(raw) : [];
   return Array.isArray(list) ? list : [];
  } catch (e) {
   return [];
  }
 }

 function writeIntents(list) {
  try {
   localStorage.setItem(INTENT_KEY, JSON.stringify(list.slice(-40)));
  } catch (e2) { /* private mode */ }
 }

 function toast(msg) {
  var el = document.createElement('div');
  el.setAttribute('role', 'status');
  el.style.cssText =
   'position:fixed;left:50%;bottom:1.5rem;transform:translateX(-50%);z-index:300;' +
   'max-width:min(28rem,calc(100vw - 2rem));padding:1rem 1.25rem;border-radius:1rem;' +
   'background:rgba(6,10,16,.96);border:1px solid rgba(251,191,36,.45);color:#fef3c7;' +
   'font:600 0.9rem/1.45 Inter,system-ui,sans-serif;box-shadow:0 18px 50px rgba(0,0,0,.55);' +
   'text-align:center';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(function () {
   el.style.opacity = '0';
   el.style.transition = 'opacity .35s ease';
   setTimeout(function () {
    if (el.parentNode) el.parentNode.removeChild(el);
   }, 380);
  }, 4200);
 }

 /**
  * @param {string} [programKey] slug or label from onclick
  */
 function sponsorProgram(programKey) {
  var key = String(programKey || 'general').trim() || 'general';
  var entry = {
   program: key,
   at: new Date().toISOString(),
   path: (typeof location !== 'undefined' && location.pathname) || '',
   title: (typeof document !== 'undefined' && document.title) || ''
  };
  var list = readIntents();
  list.push(entry);
  writeIntents(list);

  toast(
   'Thank you. Your intent for “' +
    key.replace(/-/g, ' ') +
    '” is saved on this device. When charity rails and funding are live, support becomes verifiable delivery with receipts. Truth first.'
  );

  try {
   if (typeof window.shhOnProgramIntent === 'function') {
    window.shhOnProgramIntent(entry);
   }
  } catch (e3) { /* ignore */ }

  return entry;
 }

 // Only install if page has not already defined a sponsor handler
 if (typeof window.sponsorProgram !== 'function') {
  window.sponsorProgram = sponsorProgram;
 }

 window.SHHProgramActions = {
  sponsorProgram: sponsorProgram,
  readIntents: readIntents,
  INTENT_KEY: INTENT_KEY
 };
})();
