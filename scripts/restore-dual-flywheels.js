/**
 * Restore dual $NIBBLES + $hopeseed flywheel Programs nav on flagship pages
 * that only had a plain "Programs" link.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const SCRIPT_BLOCK = [
  '<script src="js/programs-data.js" defer></script>',
  '<script src="js/program-pages-map.js" defer></script>',
  '<script src="js/programs-flywheel-nav.js" defer></script>'
].join('\n');

const DROPDOWN = [
  ' <div class="relative" id="programs-dropdown">',
  ' <a href="all-programs.html" onclick="toggleProgramsDropdown(event)" class="hover:text-amber-300 transition-colors flex items-center gap-1">',
  ' Programs <i class="fa-solid fa-chevron-down text-[10px]" id="programs-chevron"></i>',
  ' </a>',
  ' <div id="programs-menu" class="absolute hidden mt-2 right-0 bg-zinc-900/95 backdrop-blur-xl border border-white/15 rounded-3xl py-3 min-w-[280px] z-[60] shadow-2xl overflow-hidden">',
  ' <!-- Built by js/programs-flywheel-nav.js: dual $NIBBLES + $hopeseed wheels -->',
  ' <div class="prog-fw-head"><span>2 FLYWHEELS · 1 MISSION</span><span class="count">loading…</span></div>',
  ' <div data-prog-fw-mount></div>',
  ' </div>',
  ' </div>'
].join('\n');

const MOBILE = [
  ' <div class="px-1 pb-2" id="mobile-prog-fw-mount" data-prog-fw-mount></div>',
  ' <p class="px-4 pb-3 text-[10px] tracking-wide text-zinc-500">2 flywheels · scroll each wheel · find every program</p>',
  ' <div class="my-1 border-t border-white/10"></div>'
].join('\n');

const TOGGLE_OK = `
<script>
function toggleProgramsDropdown(e) {
 if (e) e.preventDefault();
 var menu = document.getElementById('programs-menu');
 var chev = document.getElementById('programs-chevron');
 if (!menu) return;
 menu.classList.toggle('hidden');
 if (chev) chev.style.transform = menu.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
 if (window.SHHProgFlywheelNav && window.SHHProgFlywheelNav.init) {
  try { window.SHHProgFlywheelNav.init(); } catch (err) {}
 }
}
document.addEventListener('click', function (ev) {
 var dd = document.getElementById('programs-dropdown');
 var menu = document.getElementById('programs-menu');
 if (dd && menu && !dd.contains(ev.target)) {
  menu.classList.add('hidden');
  var chev = document.getElementById('programs-chevron');
  if (chev) chev.style.transform = 'rotate(0deg)';
 }
});
</script>
`;

const targets = [
  'k9-lifeline.html',
  'barn-pods.html',
  'sequoia-legacy.html',
  'new-beginnings.html',
  'pay-it-forward.html',
  'mercy-blueprint.html'
];

function ensureScripts(html) {
  if (/programs-flywheel-nav\.js/.test(html)) return html;
  if (/<script src="js\/shared-animations\.js"/i.test(html)) {
    return html.replace(
      /(<script src="js\/shared-animations\.js"[^>]*><\/script>)/i,
      SCRIPT_BLOCK + '\n$1'
    );
  }
  if (/<script src="js\/glossary\.js"/i.test(html)) {
    return html.replace(
      /(<script src="js\/glossary\.js"[^>]*><\/script>)/i,
      SCRIPT_BLOCK + '\n$1'
    );
  }
  if (/<\/head>/i.test(html)) {
    return html.replace(/<\/head>/i, SCRIPT_BLOCK + '\n</head>');
  }
  return html;
}

const report = [];

for (const file of targets) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    report.push(file + ': missing file');
    continue;
  }
  let html = fs.readFileSync(full, 'utf8');
  const before = html;
  html = ensureScripts(html);

  if (!/id=["']programs-menu["']/.test(html)) {
    const next = html.replace(
      /<a href="all-programs\.html"[^>]*>\s*Programs\s*<\/a>/i,
      DROPDOWN
    );
    if (next === html) {
      report.push(file + ': no Programs link match');
    }
    html = next;
  }

  if (!/id=["']mobile-prog-fw-mount["']/.test(html) && /id=["']mobile-menu["']/.test(html)) {
    html = html.replace(
      /(<div id=["']mobile-menu["'][^>]*>\s*<div[^>]*>)/i,
      '$1\n' + MOBILE
    );
  }

  if (!/function toggleProgramsDropdown/.test(html)) {
    if (/function toggleMobileMenu/.test(html)) {
      html = html.replace(/(function toggleMobileMenu)/, TOGGLE_OK + '\n$1');
    } else if (/<\/body>/i.test(html)) {
      html = html.replace(/<\/body>/i, TOGGLE_OK + '\n</body>');
    }
  }

  if (html !== before) {
    fs.writeFileSync(full, html);
    report.push(file + ': patched');
  } else {
    report.push(file + ': no change');
  }
}

console.log(report.join('\n'));
