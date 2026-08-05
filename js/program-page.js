/**
 * Dedicated program page renderer.
 * Reads program id from body[data-program-id] or ?id= / #program-N
 * Renders hero, story (fullHTML), and stats placeholders for future live data.
 */
(function () {
 'use strict';

 function getPrograms() {
 if (typeof window.programs !== 'undefined' && Array.isArray(window.programs)) return window.programs;
 try {
 if (typeof programs !== 'undefined' && Array.isArray(programs)) return programs;
 } catch (e) { /* ignore */ }
 return [];
 }

 function slugify(title) {
 return String(title || '')
 .toLowerCase()
 .replace(/&/g, ' and ')
 .replace(/[^a-z0-9]+/g, '-')
 .replace(/^-+|-+$/g, '')
 .slice(0, 80);
 }

 function resolveProgram() {
 var list = getPrograms();
 if (!list.length) return null;

 var body = document.body;
 var idAttr = body && body.getAttribute('data-program-id');
 if (idAttr != null && idAttr !== '') {
 var byId = list.find(function (p) { return String(p.id) === String(idAttr) || p.id === Number(idAttr); });
 if (byId) return byId;
 }

 var slugAttr = body && body.getAttribute('data-program-slug');
 if (slugAttr) {
 var bySlug = list.find(function (p) { return (p.slug || slugify(p.title)) === slugAttr; });
 if (bySlug) return bySlug;
 }

 var params = new URLSearchParams(location.search);
 if (params.get('id')) {
 var qid = params.get('id');
 var byQ = list.find(function (p) { return String(p.id) === String(qid) || p.id === Number(qid); });
 if (byQ) return byQ;
 }

 var hash = (location.hash || '').replace(/^#/, '');
 var m = hash.match(/^program-(\d+)$/);
 if (m) {
 var byH = list.find(function (p) { return String(p.id) === m[1] || p.id === Number(m[1]); });
 if (byH) return byH;
 }

 // Fallback: last path segment without .html
 var parts = location.pathname.split('/').filter(Boolean);
 var file = parts[parts.length - 1] || '';
 var fileSlug = file.replace(/\.html$/i, '');
 if (fileSlug && fileSlug !== 'program' && fileSlug !== 'index') {
 var byPath = list.find(function (p) { return (p.slug || slugify(p.title)) === fileSlug; });
 if (byPath) return byPath;
 }

 return null;
 }

 function accentFor(category) {
 if (category === '$NIBBLES') {
 return {
 chip: 'bg-amber-600',
 border: 'border-amber-400/30',
 text: 'text-amber-200',
 glow: 'from-amber-900/40',
 bar: 'bg-amber-400'
 };
 }
 return {
 chip: 'bg-emerald-600',
 border: 'border-emerald-400/30',
 text: 'text-emerald-200',
 glow: 'from-emerald-900/40',
 bar: 'bg-emerald-400'
 };
 }

 function fixAssetPaths(html) {
 // Program pages live under /programs/ so relative assets need ../
 if (!/\/programs\//i.test(location.pathname) && !location.pathname.endsWith('/programs')) {
 return html;
 }
 return html
 .replace(/(src|href|poster)=(["'])assets\//g, '$1=$2../assets/')
 .replace(/(src|href)=(["'])js\//g, '$1=$2../js/')
 .replace(/(src|href)=(["'])(?!https?:|\/\/|#|\.\.\/|mailto:|tel:)([a-z0-9][^"']*\.html)/gi, '$1=$2../$3');
 }

 function renderStats(program, theme) {
 var isNibbles = program.category === '$NIBBLES';
 return (
 '<section id="program-stats" class="py-16 border-t border-white/10">' +
 '<div class="max-w-5xl mx-auto px-6">' +
 '<div class="text-center mb-10">' +
 '<p class="text-xs tracking-[0.25em] uppercase text-zinc-500 mb-2">The scoreboard</p>' +
 '<h2 class="text-3xl md:text-4xl font-bold">Program Statistics</h2>' +
 '<p class="text-zinc-400 mt-3 max-w-2xl mx-auto text-sm md:text-base">Blank until partners and reporting are real. We do not invent numbers.</p>' +
 '</div>' +
 '<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">' +
 statCard('Lives touched', 'TBD', 'When funded', theme) +
 statCard(isNibbles ? 'Dogs helped' : 'Children helped', 'TBD', 'Verified only', theme) +
 statCard('On-chain flows', 'TBD', 'Shibarium ledger', theme) +
 statCard('Active partners', 'TBD', 'Agencies & homes', theme) +
 '</div>' +
 '<div class="rounded-3xl border ' + theme.border + ' bg-zinc-900/50 p-6 md:p-8">' +
 '<h3 class="text-lg font-semibold ' + theme.text + ' mb-3">What belongs here later</h3>' +
 '<ul class="space-y-2 text-sm text-zinc-400">' +
 '<li>• Live partner counters and delivery notes (with consent & privacy)</li>' +
 '<li>• Transparent funding progress tied to Circles of Mercy</li>' +
 '<li>• Story updates, photos, and soulbound proofs when available</li>' +
 '<li>• Regional filters (e.g. Edmonton first, then Canada & USA)</li>' +
 '</ul>' +
 '<p class="text-xs text-zinc-500 mt-5">Until then: the vision, the design, and honest “when funded” language stay on the page. Truth first.</p>' +
 '</div>' +
 '</div>' +
 '</section>'
 );
 }

 function statCard(label, value, note, theme) {
 return (
 '<div class="rounded-2xl border border-white/10 bg-zinc-900/70 p-5 text-center">' +
 '<div class="text-3xl font-bold ' + theme.text + ' mb-1">' + value + '</div>' +
 '<div class="text-sm text-zinc-200 font-medium">' + label + '</div>' +
 '<div class="text-[11px] text-zinc-500 mt-1">' + note + '</div>' +
 '</div>'
 );
 }

 function renderRelated(program) {
 var list = getPrograms().filter(function (p) {
 return p.category === program.category && p.id !== program.id;
 }).slice(0, 4);
 if (!list.length) return '';
 var cards = list.map(function (p) {
 var slug = p.slug || slugify(p.title);
 var img = p.image || '';
 if (img && !img.startsWith('http') && !img.startsWith('../')) img = '../' + img.replace(/^\//, '');
 return (
 '<a href="' + slug + '.html" class="block rounded-2xl border border-white/10 bg-zinc-900/60 hover:border-white/25 p-4 transition-colors">' +
 (img ? '<img src="' + img + '" alt="" class="w-full h-28 object-cover rounded-xl mb-3" loading="lazy">' : '') +
 '<div class="text-sm font-semibold text-white leading-snug">' + escapeHtml(p.title) + '</div>' +
 '<div class="text-xs text-zinc-500 mt-1 line-clamp-2">' + escapeHtml(p.shortDesc || '') + '</div>' +
 '</a>'
 );
 }).join('');
 return (
 '<section class="py-14 border-t border-white/10">' +
 '<div class="max-w-5xl mx-auto px-6">' +
 '<h2 class="text-2xl font-bold mb-6">More in this flywheel</h2>' +
 '<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">' + cards + '</div>' +
 '<p class="mt-8 text-center"><a href="../all-programs.html" class="text-sm text-amber-200 underline">See all 30 programs →</a></p>' +
 '</div>' +
 '</section>'
 );
 }

 function escapeHtml(s) {
 return String(s)
 .replace(/&/g, '&amp;')
 .replace(/</g, '&lt;')
 .replace(/>/g, '&gt;')
 .replace(/"/g, '&quot;');
 }

 function render(program) {
 var root = document.getElementById('program-page-root');
 if (!root || !program) return;

 // Orphan Christmas full arena (live warehouse broadcast)
 if (
 window.SHHOrphanChristmasArena &&
 typeof window.SHHOrphanChristmasArena.isOrphanChristmas === 'function' &&
 window.SHHOrphanChristmasArena.isOrphanChristmas(program) &&
 typeof window.SHHOrphanChristmasArena.render === 'function'
 ) {
 document.title = 'Orphan Christmas · Live Warehouse · Shibahumanityhub';
 var metaDesc = document.querySelector('meta[name="description"]');
 if (metaDesc) {
 metaDesc.setAttribute(
 'content',
 'Orphan Christmas. Live warehouse broadcast. Verified kids. Gift packs, wrap, turkey dinners. Jesus is the reason. These kids are the why.'
 );
 }
 window.SHHOrphanChristmasArena.render();
 root.setAttribute('data-rendered-slug', program.slug || slugify(program.title));
 return;
 }

 var theme = accentFor(program.category);
 var slug = program.slug || slugify(program.title);
 var img = program.image || '';
 if (img && !/^https?:|^\//.test(img) && !img.startsWith('../')) {
 img = '../' + img.replace(/^\//, '');
 }

 document.title = program.title + ' · Program · Shibahumanityhub';
 var metaDesc = document.querySelector('meta[name="description"]');
 if (metaDesc) metaDesc.setAttribute('content', (program.shortDesc || program.title) + ' Dedicated program page on Shibahumanityhub.');

 var story = fixAssetPaths(program.fullHTML || '');

 root.innerHTML =
 '<header class="relative pt-28 pb-16 overflow-hidden">' +
 '<div class="absolute inset-0 bg-gradient-to-b ' + theme.glow + ' via-transparent to-transparent pointer-events-none"></div>' +
 '<div class="max-w-5xl mx-auto px-6 relative z-10">' +
 '<nav class="text-xs text-zinc-500 mb-6 flex flex-wrap gap-2 items-center">' +
 '<a href="../index.html" class="hover:text-white">Home</a><span>/</span>' +
 '<a href="../all-programs.html" class="hover:text-white">Programs</a><span>/</span>' +
 '<span class="' + theme.text + '">' + escapeHtml(program.title) + '</span>' +
 '</nav>' +
 '<div class="flex flex-wrap gap-2 mb-4">' +
 '<span class="text-xs px-3 py-1 rounded-full ' + theme.chip + ' text-white">' + escapeHtml(program.category) + '</span>' +
 '<span class="text-xs px-3 py-1 rounded-full border border-white/15 text-zinc-300">Program #' + program.id + '</span>' +
 '<span class="text-xs px-3 py-1 rounded-full border border-white/15 text-zinc-400">Dedicated page</span>' +
 '</div>' +
 '<h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-4">' + escapeHtml(program.title) + '</h1>' +
 '<p class="text-lg md:text-xl text-zinc-300 max-w-3xl leading-relaxed">' + escapeHtml(program.shortDesc || '') + '</p>' +
 (img
 ? '<div class="mt-10 rounded-3xl overflow-hidden border ' + theme.border + ' bg-zinc-900/40">' +
 '<img src="' + img + '" alt="' + escapeHtml(program.title) + '" class="w-full max-h-[420px] object-cover" loading="eager">' +
 '</div>'
 : '') +
 '</div>' +
 '</header>' +
 '<main class="pb-8">' +
 '<section class="max-w-4xl mx-auto px-6 pb-12">' +
 '<div id="program-story" class="program-story prose prose-invert max-w-none">' + story + '</div>' +
 '</section>' +
 renderStats(program, theme) +
 renderRelated(program) +
 '</main>';

 root.setAttribute('data-rendered-slug', slug);

 // Christmas logistics layer (Orphan Christmas + Santa's Workshop)
 if (window.SHHChristmasMercyOps && typeof window.SHHChristmasMercyOps.mount === 'function') {
 try { window.SHHChristmasMercyOps.mount(program); } catch (e) { /* non-fatal */ }
 }
 }

 function boot() {
 var program = resolveProgram();
 var root = document.getElementById('program-page-root');
 if (!root) return;
 if (!program) {
 root.innerHTML =
 '<div class="max-w-xl mx-auto px-6 pt-32 pb-20 text-center">' +
 '<h1 class="text-3xl font-bold mb-4">Program not found</h1>' +
 '<p class="text-zinc-400 mb-6">This dedicated page could not load its program data.</p>' +
 '<a href="../all-programs.html" class="underline text-amber-200">Back to all 30 programs</a>' +
 '</div>';
 return;
 }
 render(program);
 }

 window.SHHProgramPage = {
 boot: boot,
 slugify: slugify,
 resolveProgram: resolveProgram,
 programUrl: function (p) {
 var slug = (p && (p.slug || slugify(p.title))) || '';
 return 'programs/' + slug + '.html';
 }
 };

 if (document.readyState === 'loading') {
 document.addEventListener('DOMContentLoaded', boot);
 } else {
 boot();
 }
 window.addEventListener('load', function () {
 // Rebuild if programs-data loaded after first paint
 if (!document.getElementById('program-page-root') ||
 !document.getElementById('program-page-root').getAttribute('data-rendered-slug')) {
 boot();
 } else if (getPrograms().length) {
 boot();
 }
 });
})();
