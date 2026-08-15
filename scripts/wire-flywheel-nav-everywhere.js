/**
 * Wire dual-token flywheel Programs dropdown on every page that has #programs-menu.
 * Also slim long static lists into a dual-wheel mount (desktop + mobile).
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const SCRIPT_BLOCK = [
  '<script src="js/programs-data.js" defer></script>',
  '<script src="js/program-pages-map.js" defer></script>',
  '<script src="js/programs-flywheel-nav.js" defer></script>'
].join('\n');

const EMPTY_MENU_INNER =
  ' <!-- Built by js/programs-flywheel-nav.js: dual $NIBBLES + $hopeseed wheels -->\n' +
  ' <div class="prog-fw-head"><span>2 FLYWHEELS · 1 MISSION</span><span class="count">loading…</span></div>\n' +
  ' <div data-prog-fw-mount></div>\n';

const MOBILE_FW =
  ' <div class="px-2 pb-2" id="mobile-prog-fw-mount" data-prog-fw-mount></div>\n' +
  ' <p class="px-5 pb-2 text-[10px] tracking-wide text-zinc-500">2 flywheels · scroll each wheel · every program</p>\n';

function listHtmlFiles(dir, out) {
  out = out || [];
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git' || name === 'assets') continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) listHtmlFiles(p, out);
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

function ensureScripts(html) {
  if (/programs-flywheel-nav\.js/.test(html)) return html;
  // Prefer insert before shared-animations or glossary or </head>
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
  return html + '\n' + SCRIPT_BLOCK + '\n';
}

function slimProgramsMenu(html) {
  // Replace entire #programs-menu inner content with dual-wheel shell
  return html.replace(
    /(<div[^>]*\bid=["']programs-menu["'][^>]*>)([\s\S]*?)(<\/div>\s*<\/div>\s*(?:<!--|\n\s*<(?:a|button|div|style|\/nav)))/i,
    function (full, open, _inner, close) {
      // close captures trailing structure after programs-menu's parent closes — careful.
      // Safer approach: only replace between programs-menu open and its matching close is hard with regex.
      return full;
    }
  );
}

/** Replace content between id="programs-menu" open tag and the next sibling-ending structure using depth counter */
function replaceProgramsMenuBody(html) {
  const re = /<div([^>]*\bid=["']programs-menu["'][^>]*)>/i;
  const m = re.exec(html);
  if (!m) return html;
  const startOpen = m.index;
  const afterOpen = m.index + m[0].length;
  // Find matching closing </div> for programs-menu
  let i = afterOpen;
  let depth = 1;
  while (i < html.length && depth > 0) {
    const nextOpen = html.indexOf('<div', i);
    const nextClose = html.indexOf('</div>', i);
    if (nextClose < 0) break;
    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth += 1;
      i = nextOpen + 4;
    } else {
      depth -= 1;
      if (depth === 0) {
        const endClose = nextClose + 6;
        const openTag = m[0];
        // Ensure classes allow width for dual wheels
        let newOpen = openTag;
        if (!/prog-fw|min-w|z-\[/.test(newOpen)) {
          // leave classes as-is; JS adds prog-fw-ready
        }
        if (!/overflow-hidden/.test(newOpen) && /class=/.test(newOpen)) {
          newOpen = newOpen.replace(/class="([^"]*)"/, 'class="$1 overflow-hidden"');
        }
        return (
          html.slice(0, startOpen) +
          newOpen +
          '\n' +
          EMPTY_MENU_INNER +
          html.slice(nextClose, endClose) +
          html.slice(endClose)
        );
      }
      i = nextClose + 6;
    }
  }
  return html;
}

function injectMobileMount(html) {
  if (/id=["']mobile-prog-fw-mount["']/.test(html)) return html;
  // After mobile-menu open, inject dual wheels near top of first content wrapper
  if (!/id=["']mobile-menu["']/.test(html)) return html;
  return html.replace(
    /(<div id=["']mobile-menu["'][^>]*>\s*<div[^>]*>)/i,
    '$1\n' + MOBILE_FW
  );
}

function stripLongCircleListInMobile(html) {
  // Remove common long "CIRCLE OF MERCY" static program lists in mobile when we have flywheel mount
  if (!/mobile-prog-fw-mount/.test(html)) return html;
  return html.replace(
    /<div class="px-5 pb-2 pt-1 text-\[10px\] tracking-\[2px\] text-emerald-300\/70[\s\S]*?THE CIRCLE OF MERCY[\s\S]*?(?=<a href="index\.html"|<a href="shelters\.html"|<a href="pay-it-forward|<div class="my-1 border-t|<\/div>\s*<\/div>\s*(?:<!--|<footer|<\/body))/i,
    function () {
      return '<!-- long list replaced by dual flywheels above -->\n';
    }
  );
}

const files = listHtmlFiles(root);
let changed = 0;
const report = [];

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  if (!/id=["']programs-menu["']/.test(html)) continue;
  const rel = path.relative(root, file);
  // Skip nested program shells without site nav flywheel (they use simpler nav)
  if (/^programs[\\/]/.test(rel) && !/programs-menu/.test(html)) continue;

  let next = html;
  next = ensureScripts(next);
  next = replaceProgramsMenuBody(next);
  next = injectMobileMount(next);

  if (next !== html) {
    fs.writeFileSync(file, next);
    changed += 1;
    report.push(rel);
  }
}

console.log('Patched', changed, 'files:');
report.forEach((r) => console.log(' -', r));
