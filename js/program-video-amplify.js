/**
 * Program motion amplify — top-quality autoplay for every program video.
 * Used on dedicated program pages, modals, and experience injects.
 * Respects prefers-reduced-motion. Never invents streams.
 */
(function () {
 'use strict';

 var CSS_ID = 'shh-program-video-amplify-css';
 var boosted = typeof WeakSet !== 'undefined' ? new WeakSet() : null;

 function prefersReduced() {
  try {
   return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {
   return false;
  }
 }

 function injectCss() {
  if (document.getElementById(CSS_ID)) return;
  var s = document.createElement('style');
  s.id = CSS_ID;
  s.textContent = [
   /* Premium cinema stage on dedicated program pages */
   '.shh-cinema{position:relative;margin:1.75rem 0 2rem;border-radius:1.35rem;overflow:hidden;',
   'border:1px solid rgba(251,191,36,0.35);background:#05070f;',
   'box-shadow:0 0 0 1px rgba(255,255,255,0.04),0 28px 70px -28px rgba(0,0,0,0.9),0 0 60px -30px rgba(251,191,36,0.35)}',
   '.shh-cinema-frame{position:relative;aspect-ratio:16/9;max-height:min(62vh,520px);background:#000}',
   '.shh-cinema-frame video{width:100%;height:100%;object-fit:cover;display:block;',
   'transform:translateZ(0);-webkit-transform:translateZ(0)}',
   '.shh-cinema-glow{position:absolute;inset:-1px;pointer-events:none;z-index:0;',
   'background:radial-gradient(ellipse 70% 50% at 50% 100%,rgba(251,191,36,0.12),transparent 60%)}',
   '.shh-cinema-badge{position:absolute;top:.75rem;left:.75rem;z-index:3;',
   'display:inline-flex;align-items:center;gap:.35rem;padding:.35rem .65rem;border-radius:999px;',
   'font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;',
   'color:#fde68a;background:rgba(0,0,0,.62);border:1px solid rgba(251,191,36,.4);backdrop-filter:blur(8px)}',
   '.shh-cinema-badge i{width:6px;height:6px;border-radius:50%;background:#34d399;',
   'box-shadow:0 0 10px #34d399;animation:shh-vid-pulse 1.4s ease infinite}',
   '@keyframes shh-vid-pulse{0%,100%{opacity:1}50%{opacity:.35}}',
   '.shh-cinema-caption{padding:.65rem 1rem;text-align:center;font-size:.68rem;letter-spacing:.08em;',
   'text-transform:uppercase;color:rgba(253,230,138,.55);border-top:1px solid rgba(255,255,255,.06);',
   'background:rgba(0,0,0,.45)}',
   /* Story videos: lift out of tiny 340px phone mock */
   '.program-story .shh-story-stage{max-width:min(560px,100%)!important;margin-left:auto;margin-right:auto;',
   'border-radius:1.25rem;overflow:hidden;border:1px solid rgba(251,191,36,.32);',
   'background:rgba(0,0,0,.45);box-shadow:0 20px 50px -24px rgba(0,0,0,.85)}',
   '.program-story .shh-story-stage video{width:100%!important;max-width:none!important;',
   'border-radius:0!important;display:block;aspect-ratio:1/1;object-fit:cover;',
   'transform:translateZ(0)}',
   '.program-story video.shh-amplified{max-width:100%;width:100%;border-radius:1rem}',
   /* Modal content */
   '#modal-content .shh-story-stage{max-width:min(420px,100%);margin:1rem auto}',
   '#modal-content video.shh-amplified{width:100%;border-radius:1rem}',
   '@media(prefers-reduced-motion:reduce){.shh-cinema-badge i{animation:none!important}}'
  ].join('');
  document.head.appendChild(s);
 }

 function safeMediaUrl(u) {
  if (!u) return u;
  /* Filenames may include & (e.g. rainbowbridgehospice&sequoialegacy) */
  return String(u).replace(/&/g, '%26');
 }

 function fixSrc(video) {
  if (!video) return;
  var src = video.getAttribute('src') || '';
  if (!src) return;
  var next = src;
  try {
   if (/\/programs\//i.test(location.pathname) || /programs$/i.test(location.pathname.replace(/\/$/, ''))) {
    if (next.indexOf('assets/') === 0) next = '../' + next;
   }
  } catch (e) { /* ignore */ }
  next = safeMediaUrl(next);
  if (next !== src) video.setAttribute('src', next);
  var poster = video.getAttribute('poster') || '';
  if (poster) {
   var p2 = poster;
   try {
    if (/\/programs\//i.test(location.pathname) && p2.indexOf('assets/') === 0) p2 = '../' + p2;
   } catch (e2) { /* ignore */ }
   p2 = safeMediaUrl(p2);
   if (p2 !== poster) video.setAttribute('poster', p2);
  }
 }

 function hardAttrs(video) {
  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.playsInline = true;
  video.setAttribute('muted', '');
  video.setAttribute('loop', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.setAttribute('autoplay', '');
  /* Keep-playing = play while visible through scroll; budget may pause offscreen */
  video.setAttribute('data-keep-playing', '1');
  video.removeAttribute('controls');
  /* Metadata until near viewport — budget promotes to auto when playing */
  video.preload = 'metadata';
  video.setAttribute('preload', 'metadata');
  try {
   video.disablePictureInPicture = true;
  } catch (e2) { /* ignore */ }
  try {
   if ('disableRemotePlayback' in video) video.disableRemotePlayback = true;
  } catch (e2b) { /* ignore */ }
  video.classList.add('shh-amplified');
 }

 function kickPlay(video) {
  if (!video || prefersReduced()) return;
  if (typeof window.shhRequestVideoPlay === 'function') {
   window.shhRequestVideoPlay(video);
   return;
  }
  try {
   video.muted = true;
   var p = video.play();
   if (p && typeof p.catch === 'function') {
    p.catch(function () {
     setTimeout(function () {
      try {
       video.muted = true;
       video.play().catch(function () {});
      } catch (e3) { /* ignore */ }
     }, 180);
    });
   }
  } catch (e4) { /* ignore */ }
 }

 function wrapStoryVideo(video) {
  if (!video || !video.parentNode) return;
  if (video.closest('.shh-cinema') || video.closest('.shh-story-stage')) return;
  /* Skip logo nav videos */
  if (video.closest('nav') || (video.getAttribute('width') === '64' && video.offsetWidth < 100)) return;

  var parent = video.parentNode;
  /* If parent is the glass phone mock, lift the whole mock into stage */
  var stage = document.createElement('div');
  stage.className = 'shh-story-stage';
  stage.setAttribute('data-shh-video-stage', '1');

  /* Prefer wrapping the nearest max-w preview container */
  var shell = video.closest('.max-w-\\[340px\\], .max-w-\\[420px\\], [class*="max-w-"]');
  if (shell && shell !== parent && shell.contains(video) && shell.parentNode) {
   shell.parentNode.insertBefore(stage, shell);
   stage.appendChild(shell);
  } else {
   parent.insertBefore(stage, video);
   stage.appendChild(video);
  }
 }

 function observe(video) {
  /* Play through scroll while visible. Offscreen pause via shared budget. */
  try {
   video.setAttribute('data-keep-playing', '1');
  } catch (e0) { /* ignore */ }
  if (typeof window.shhObserveVideo === 'function') {
   window.shhObserveVideo(video);
   return;
  }
  kickPlay(video);
  if (!window.IntersectionObserver) return;
  var io = new IntersectionObserver(
   function (ents) {
    ents.forEach(function (ent) {
     if (ent.isIntersecting) {
      if (typeof window.shhRequestVideoPlay === 'function') window.shhRequestVideoPlay(video);
      else kickPlay(video);
     } else if (typeof window.shhReleaseVideoPlay === 'function') {
      window.shhReleaseVideoPlay(video);
     } else {
      try { video.pause(); } catch (eP) { /* ignore */ }
     }
    });
   },
   { rootMargin: '140px 0px', threshold: [0, 0.05, 0.2] }
  );
  io.observe(video);
 }

 function amplifyVideo(video, opts) {
  opts = opts || {};
  if (!video || video.tagName !== 'VIDEO') return;
  if (boosted && boosted.has(video) && !opts.force) return;
  if (boosted) boosted.add(video);

  fixSrc(video);
  hardAttrs(video);
  if (opts.wrapStory !== false && !opts.cinema) {
   wrapStoryVideo(video);
  }
  if (video.readyState >= 2) {
   kickPlay(video);
  } else {
   video.addEventListener('loadeddata', function onLd() {
    video.removeEventListener('loadeddata', onLd);
    kickPlay(video);
   });
   try {
    video.load();
   } catch (e) { /* ignore */ }
   setTimeout(function () {
    kickPlay(video);
   }, 60);
   setTimeout(function () {
    kickPlay(video);
   }, 400);
  }
  observe(video);
 }

 /**
  * Amplify all program videos under root (or document).
  */
 function amplifyAll(root, opts) {
  injectCss();
  root = root || document;
  var list = root.querySelectorAll ? root.querySelectorAll('video') : [];
  Array.prototype.forEach.call(list, function (v) {
   /* Skip tiny logo loops in nav if under 80px wide after layout — still amplify program previews */
   var aria = (v.getAttribute('aria-hidden') || '') === 'true';
   var isLogo = aria && v.closest('nav');
   if (isLogo) {
    hardAttrs(v);
    kickPlay(v);
    return;
   }
   amplifyVideo(v, opts);
  });
  return list.length;
 }

 /**
  * Build a large cinema hero from a video src + poster.
  */
 function buildCinema(src, poster, title) {
  injectCss();
  if (!src) return '';
  var safeTitle = String(title || 'Program motion preview')
   .replace(/&/g, '&amp;')
   .replace(/</g, '&lt;')
   .replace(/"/g, '&quot;');
  src = safeMediaUrl(src);
  poster = poster ? safeMediaUrl(poster) : '';
  return (
   '<div class="shh-cinema" data-shh-cinema="1">' +
   '<div class="shh-cinema-glow" aria-hidden="true"></div>' +
   '<div class="shh-cinema-frame">' +
   '<span class="shh-cinema-badge"><i></i> Motion preview</span>' +
   '<video class="shh-cinema-video" src="' +
   src +
   '" ' +
   (poster ? 'poster="' + poster + '" ' : '') +
   'muted loop playsinline webkit-playsinline autoplay preload="metadata" ' +
   'aria-label="' +
   safeTitle +
   ' motion preview"></video>' +
   '</div>' +
   '<div class="shh-cinema-caption">Animated program vision · not a live feed · when funded this becomes proof</div>' +
   '</div>'
  );
 }

 function extractFirstVideo(html) {
  if (!html) return null;
  /* Programs-data videos are often multiline: <video \n src="..." \n poster=...> */
  var block = html.match(/<video\b[\s\S]{0,900}?>/i);
  if (!block) return null;
  var tag = block[0];
  var srcM = tag.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
  if (!srcM) {
   /* src may sit right after opening across lines already in tag match */
   var srcLoose = html.match(/<video\b[\s\S]{0,500}?src\s*=\s*["']([^"']+\.mp4)["']/i);
   if (!srcLoose) return null;
   return { src: srcLoose[1], poster: '' };
  }
  var posterM = tag.match(/\bposter\s*=\s*["']([^"']+)["']/i);
  return { src: srcM[1], poster: posterM ? posterM[1] : '' };
 }

 function pauseAll(root) {
  root = root || document;
  var list = root.querySelectorAll ? root.querySelectorAll('video') : [];
  Array.prototype.forEach.call(list, function (v) {
   if (v.closest && v.closest('.logo-3d-wrapper')) return;
   if (typeof window.shhReleaseVideoPlay === 'function') {
    window.shhReleaseVideoPlay(v);
    return;
   }
   try {
    v.pause();
   } catch (e) { /* ignore */ }
  });
 }

 /* Bridge legacy helper names (respect keep-playing) */
 window.pauseAllMercyVideos = function () {
  pauseAll(document);
 };

 window.SHHProgramVideo = {
  amplifyAll: amplifyAll,
  amplifyVideo: amplifyVideo,
  buildCinema: buildCinema,
  extractFirstVideo: extractFirstVideo,
  kickPlay: kickPlay,
  pauseAll: pauseAll,
  injectCss: injectCss
 };
})();
