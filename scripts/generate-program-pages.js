/**
 * Generate dedicated HTML page for every program in js/programs-data.js
 * Parses id/title/category/shortDesc with regex (no full eval of huge fullHTML).
 * Usage: node scripts/generate-program-pages.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'js', 'programs-data.js');
const outDir = path.join(root, 'programs');

function slugify(title) {
  return String(title || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function loadProgramMeta() {
  const src = fs.readFileSync(dataPath, 'utf8');
  // Split on object id fields that start program entries
  const re =
    /id:\s*(\d+)\s*,\s*title:\s*"((?:\\.|[^"\\])*)"\s*,\s*category:\s*"((?:\\.|[^"\\])*)"[\s\S]*?shortDesc:\s*"((?:\\.|[^"\\])*)"/g;
  const list = [];
  let m;
  while ((m = re.exec(src)) !== null) {
    list.push({
      id: Number(m[1]),
      title: m[2].replace(/\\"/g, '"'),
      category: m[3],
      shortDesc: m[4].replace(/\\"/g, '"').replace(/\\n/g, ' ')
    });
  }
  return list;
}

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

function pageHtml(program) {
  const slug = program.slug;
  const cat = program.category || '';
  const isNibbles = cat === '$NIBBLES';
  const accent = isNibbles ? 'amber' : 'emerald';
  const desc = escapeAttr(program.shortDesc || program.title);
  const title = escapeAttr(program.title);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style id="critical-shell">
    html { background-color: #0a0f1c; color-scheme: dark; }
  </style>
  <link rel="stylesheet" href="../assets/css/tailwind.css">
  <meta name="robots" content="index, follow">
  <title>${title} · Program · Shibahumanityhub</title>
  <meta name="description" content="${desc}">
  <meta property="og:title" content="${title} · Shibahumanityhub">
  <meta property="og:description" content="${desc}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://shibahumanityhub.com/programs/${slug}.html">
  <meta property="og:image" content="https://shibahumanityhub.com/assets/logos/shibahumanityhublogo3d-new.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">
  <link rel="canonical" href="https://shibahumanityhub.com/programs/${slug}.html">
  <link rel="icon" href="../assets/logos/favicon.png" type="image/png" sizes="512x512">
  <link rel="apple-touch-icon" href="../assets/logos/favicon.png" sizes="180x180">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="../js/programs-data.js" defer></script>
  <script src="../js/program-pages-map.js" defer></script>
  <script src="../js/christmas-mercy-ops.js" defer></script>
  <script src="../js/program-page.js" defer></script>
  <script src="../js/shared-animations.js" defer></script>
  <script src="../js/glossary.js" defer></script>
  <style>
    body { margin: 0; background: #0a0f1c; color: #fff; font-family: Inter, system-ui, sans-serif; }
    .program-story img, .program-story video { max-width: 100%; border-radius: 1rem; }
    .program-story button { cursor: pointer; }
  </style>
</head>
<body class="bg-zinc-950 text-white min-h-screen" data-program-id="${program.id}" data-program-slug="${slug}">
  <nav class="bg-black/95 backdrop-blur-lg fixed w-full z-50 border-b border-${accent}-500/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center gap-4">
      <a href="../index.html" class="flex items-center gap-3 group">
        <img src="../assets/logos/shibahumanityhublogo3d-new.jpg" alt="Shibahumanityhub" class="w-12 h-12 rounded-full object-cover border border-cyan-400/40" width="48" height="48">
        <span class="hidden sm:block text-sm font-bold tracking-tight bg-gradient-to-r from-amber-200 via-white to-emerald-200 bg-clip-text text-transparent">SHIBAHUMANITYHUB</span>
      </a>
      <div class="flex items-center gap-4 text-sm">
        <a href="../all-programs.html" class="hover:text-${accent}-300 transition-colors">All Programs</a>
        <a href="../index.html#tokens" class="hidden sm:inline hover:text-${accent}-300 transition-colors">Tokens</a>
        <a href="../shelters.html" class="hidden md:inline hover:text-red-300 transition-colors">Beautiful Souls</a>
      </div>
    </div>
  </nav>

  <div id="program-page-root">
    <div class="max-w-xl mx-auto px-6 pt-32 pb-20 text-center text-zinc-400 text-sm">Loading ${title}…</div>
  </div>

  <footer class="py-12 border-t border-white/10 text-center text-xs text-zinc-500">
    <p class="text-amber-100/90 text-sm mb-2">People helping people helping people.</p>
    <p>© Shibahumanityhub · Dedicated program page · Truth first · When funded</p>
    <p class="mt-3"><a href="../all-programs.html" class="underline text-zinc-400 hover:text-white">← All 30 programs</a></p>
  </footer>
</body>
</html>
`;
}

function main() {
  const programs = loadProgramMeta();
  if (!programs.length) {
    console.error('No programs parsed from programs-data.js');
    process.exit(1);
  }
  fs.mkdirSync(outDir, { recursive: true });

  for (const f of fs.readdirSync(outDir)) {
    if (f.endsWith('.html') || f === 'index.json') fs.unlinkSync(path.join(outDir, f));
  }

  const slugs = new Map();
  const written = [];

  for (const p of programs) {
    let slug = slugify(p.title);
    if (slugs.has(slug)) slug = slug + '-' + p.id;
    slugs.set(slug, p.id);
    p.slug = slug;
    fs.writeFileSync(path.join(outDir, slug + '.html'), pageHtml(p), 'utf8');
    written.push({ id: p.id, slug, title: p.title, category: p.category });
  }

  fs.writeFileSync(
    path.join(outDir, 'index.json'),
    JSON.stringify(
      written.map((w) => ({
        id: w.id,
        slug: w.slug,
        title: w.title,
        category: w.category,
        url: 'programs/' + w.slug + '.html'
      })),
      null,
      2
    ),
    'utf8'
  );

  const mapObj = {};
  written.forEach((w) => {
    mapObj[w.id] = 'programs/' + w.slug + '.html';
  });

  const mapJs =
    '/** Auto-generated. Run: node scripts/generate-program-pages.js */\n' +
    'window.SHH_PROGRAM_PAGES = ' +
    JSON.stringify(mapObj, null, 2) +
    ';\n' +
    'window.SHH_programPageUrl = function (id) {\n' +
    '  var map = window.SHH_PROGRAM_PAGES || {};\n' +
    '  var key = id;\n' +
    '  if (map[key] == null && map[String(id)] != null) key = String(id);\n' +
    '  return map[key] || ("programs/program-" + id + ".html");\n' +
    '};\n';

  fs.writeFileSync(path.join(root, 'js', 'program-pages-map.js'), mapJs, 'utf8');

  console.log('Generated', written.length, 'program pages');
  written.forEach((w) => console.log(' ', w.id, w.slug));
}

main();
