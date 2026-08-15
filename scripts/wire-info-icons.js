/**
 * Place plain-language ⓘ icons on flagship pages + experience builders.
 * Glossary terms must exist in js/glossary.js.
 */
const fs = require('fs');
const path = require('path');

function i(term) {
  const t = String(term).replace(/"/g, '&quot;');
  return (
    '<span class="info-icon" data-term="' +
    t +
    '" role="button" tabindex="0" aria-label="Plain language: ' +
    t +
    '">ⓘ</span>'
  );
}

function onceReplace(src, find, repl) {
  if (!src.includes(find)) return { src, ok: false };
  if (src.includes(repl)) return { src, ok: true }; // already
  return { src: src.replace(find, repl), ok: true };
}

function patchFile(rel, pairs) {
  const file = path.join(__dirname, '..', rel);
  if (!fs.existsSync(file)) {
    console.log('skip missing', rel);
    return;
  }
  let src = fs.readFileSync(file, 'utf8');
  let n = 0;
  pairs.forEach(function (pair) {
    const find = pair[0];
    const repl = pair[1];
    if (src.includes(repl)) return;
    if (!src.includes(find)) {
      console.log('  miss:', rel, JSON.stringify(find).slice(0, 80));
      return;
    }
    src = src.replace(find, repl);
    n++;
  });
  fs.writeFileSync(file, src);
  console.log(rel, '+', n);
}

// ─── barn-pods-experience.js ───
patchFile('js/barn-pods-experience.js', [
  [
    'Build the biggest warm place that never turns into a warehouse.</h2>',
    'Build the biggest warm place that never turns into a warehouse.' + i('barn campus') + '</h2>'
  ],
  [
    '03 · Live density engine</p>',
    '03 · Live density engine' + i('density engine') + '</p>'
  ],
  [
    '04 · Sponsorship model</p>',
    '04 · Sponsorship model' + i('pod cell') + '</p>'
  ],
  [
    'Treasury builds the mountain.',
    'Treasury' + i('treasury') + ' builds the mountain.'
  ],
  [
    'Everlasting snowball</h3>',
    'Everlasting snowball' + i('snowball') + '</h3>'
  ],
  [
    'Design studio only. No live campus',
    'Design studio only' + i('design only') + '. No live campus'
  ],
  [
    'Stable care rails</h3>',
    'Stable care rails' + i('stable care') + '</h3>'
  ],
  [
    '$NIBBLES</h3><p>Belonging',
    '$NIBBLES' + i('nibbles') + '</h3><p>Belonging'
  ]
]);

// ─── k9-lifeline-experience.js ───
patchFile('js/k9-lifeline-experience.js', [
  [
    "label: 'Bond'",
    "label: 'Bond'"
  ]
]);

// ─── thirty-days ───
patchFile('js/thirty-days-christmas.js', [
  [
    'Path of Light</h3>',
    'Path of Light' + i('path of light') + '</h3>'
  ],
  [
    '30 Days of Christmas · Path of Light · $hopeseed</p>',
    '30 Days of Christmas' + i('30 days of christmas') + ' · Path of Light · $hopeseed' + i('hopeseed') + '</p>'
  ],
  [
    'Every freighter can carry a line',
    'Every freighter' + i('freight') + ' can carry a line'
  ],
  [
    'Verified need only',
    'Verified need' + i('verified') + ' only'
  ]
]);

// HTML flagships
patchFile('barn-pods.html', [
  [
    'First of its kind · productized campus mercy</div>',
    'First of its kind · productized campus mercy' + i('barn campus') + '</div>'
  ],
  [
    'Companies buy warm cells like real products.',
    'Companies buy warm cells' + i('pod cell') + ' like real products.'
  ],
  [
    'Density tells the truth as you type.',
    'Density' + i('density engine') + ' tells the truth as you type.'
  ]
]);

patchFile('k9-lifeline.html', [
  [
    'Searchlight bond · Global Disaster K9 · $NIBBLES</div>',
    'Searchlight bond · Global Disaster K9' + i('disaster k9') + ' · $NIBBLES' + i('nibbles') + '</div>'
  ],
  [
    'Best friends who become a single searchlight when the world breaks.</p>',
    'Best friends who become a single searchlight when the world breaks.' + i('bonded pair') + '</p>'
  ],
  [
    'Design studio. Preview teams only.',
    'Design studio' + i('design only') + '. Preview teams only.'
  ]
]);

patchFile('new-beginnings.html', [
  [
    'Permanent-home infrastructure · $NIBBLES</div>',
    'Permanent-home infrastructure · $NIBBLES' + i('nibbles') + i('new beginnings') + '</div>'
  ],
  [
    'Dogs do not fail adoptions. <em>Unready homes do.</em></p>',
    'Dogs do not fail adoptions. <em>Unready homes do.</em>' + i('adoption return') + '</p>'
  ],
  [
    'Design studio. No live checkout.',
    'Design studio' + i('design only') + '. No live checkout.'
  ]
]);

patchFile('pay-it-forward.html', [
  [
    'Pay It Forward',
    'Pay It Forward'
  ]
]);

patchFile('golden-paws.html', [
  [
    'For the ones who still hope · $NIBBLES</div>',
    'For the ones who still hope · $NIBBLES' + i('nibbles') + i('golden paws') + '</div>'
  ]
]);

patchFile('silver-paws.html', [
  [
    '$NIBBLES · two hearts · one quiet forge</div>',
    '$NIBBLES' + i('nibbles') + ' · two hearts · one quiet forge' + i('silver paws') + '</div>'
  ]
]);

patchFile('healing-hearts.html', [
  [
    '$NIBBLES network preview',
    '$NIBBLES' + i('nibbles') + ' network preview' + i('healing hearts')
  ]
]);

patchFile('index.html', [
  [
    'You hold. The flywheel turns<span class="info-icon" data-term="mercy flywheel"',
    'You hold' + i('hold') + '. The flywheel turns<span class="info-icon" data-term="mercy flywheel"'
  ],
  [
    'Full program delivery when funding and charity rails are live.<span class="info-icon" data-term="nibbles"',
    'Full program delivery when funding and charity rails' + i('rails') + ' are live' + i('when funded') + '.<span class="info-icon" data-term="nibbles"'
  ]
]);

// pay-it-forward more carefully
(function () {
  const file = path.join(__dirname, '..', 'pay-it-forward.html');
  let src = fs.readFileSync(file, 'utf8');
  const pairs = [
    [
      'Adoption Chain',
      'Adoption Chain' + i('pay it forward')
    ],
    [
      'when funded',
      'when funded' + i('when funded')
    ]
  ];
  let n = 0;
  // only first occurrence of Adoption Chain in hero-ish area
  if (!src.includes('data-term="pay it forward"')) {
    src = src.replace('Adoption Chain', 'Adoption Chain' + i('pay it forward'));
    n++;
  }
  if (!src.includes('data-term="snowball"') && src.toLowerCase().includes('snowball')) {
    src = src.replace(/[Ss]nowball/, function (m) {
      return m + i('snowball');
    });
    n++;
  }
  if (!src.includes('data-term="design only"') && /design only|Design only|Design studio/i.test(src)) {
    src = src.replace(/(Design studio|design only|Design only)/, function (m) {
      return m + i('design only');
    });
    n++;
  }
  fs.writeFileSync(file, src);
  console.log('pay-it-forward.html +', n);
})();

// golden-years already has icons - add all walks welcome near footer or hero if missing
patchFile('golden-years.html', [
  [
    'TWO HEARTS, ONE QUIET HOME</span>',
    'TWO HEARTS, ONE QUIET HOME' + i('golden years companion') + '</span>'
  ]
]);

// all-programs welcome
patchFile('all-programs.html', [
  [
    'No matter who you are, when you step in',
    'No matter who you are' + i('all are welcome') + ', when you step in'
  ],
  [
    'holding funds programs. Until then',
    'holding' + i('hold') + ' funds programs. Until then' + i('when funded')
  ]
]);

// orphan christmas arena ticker already plain - add to live pill / story
patchFile('js/orphan-christmas-arena.js', [
  [
    'The gift of love</b> · helping other souls</div>',
    'The gift of love</b> · helping other souls' + i('orphan christmas') + '</div>'
  ],
  [
    'Verified only.',
    'Verified' + i('verified') + ' only.'
  ],
  [
    'Design first. Real trucks when funded.',
    'Design first' + i('design only') + '. Real trucks when funded' + i('when funded') + '.'
  ]
]);

// new-beginnings experience if any
const nbx = path.join(__dirname, '..', 'js', 'new-beginnings-experience.js');
if (fs.existsSync(nbx)) {
  let src = fs.readFileSync(nbx, 'utf8');
  if (!src.includes('data-term="new beginnings"') && src.includes('New Beginnings')) {
    src = src.replace(
      'New Beginnings',
      'New Beginnings' + i('new beginnings')
    );
    // only first
    fs.writeFileSync(nbx, src);
    console.log('new-beginnings-experience.js +1');
  }
}

// pay-it-forward experience
const pif = path.join(__dirname, '..', 'js', 'pay-it-forward-experience.js');
if (fs.existsSync(pif)) {
  let src = fs.readFileSync(pif, 'utf8');
  let n = 0;
  if (!src.includes('data-term="pay it forward"')) {
    if (src.includes('Pay It Forward')) {
      src = src.replace('Pay It Forward', 'Pay It Forward' + i('pay it forward'));
      n++;
    }
  }
  if (!src.includes('data-term="snowball"') && /snowball/i.test(src)) {
    src = src.replace(/snowball/i, function (m) {
      return m + i('snowball');
    });
    n++;
  }
  fs.writeFileSync(pif, src);
  console.log('pay-it-forward-experience.js +', n);
}

// golden-paws experience
const gpx = path.join(__dirname, '..', 'js', 'golden-paws-experience.js');
if (fs.existsSync(gpx)) {
  let src = fs.readFileSync(gpx, 'utf8');
  let n = 0;
  if (!src.includes('data-term="golden paws"') && src.includes('Golden Paws')) {
    src = src.replace('Golden Paws', 'Golden Paws' + i('golden paws'));
    n++;
  }
  if (!src.includes('data-term="certified forever home"') && /forever home/i.test(src)) {
    src = src.replace(/forever home/i, function (m) {
      return m + i('certified forever home');
    });
    n++;
  }
  if (!src.includes('data-term="when funded"') && /when funded/i.test(src)) {
    src = src.replace(/when funded/i, function (m) {
      return m + i('when funded');
    });
    n++;
  }
  fs.writeFileSync(gpx, src);
  console.log('golden-paws-experience.js +', n);
}

// k9 bond copy in experience
const k9x = path.join(__dirname, '..', 'js', 'k9-lifeline-experience.js');
if (fs.existsSync(k9x)) {
  let src = fs.readFileSync(k9x, 'utf8');
  let n = 0;
  if (!src.includes('data-term="bonded pair"')) {
    if (src.includes('Two lives. One light')) {
      src = src.replace('Two lives. One light', 'Two lives. One light' + i('bonded pair'));
      n++;
    } else if (src.includes('bonded')) {
      src = src.replace(/bonded pair/i, function (m) {
        return m + i('bonded pair');
      });
      n++;
    }
  }
  if (!src.includes('data-term="design only"') && /Design only|design only|Preview/i.test(src)) {
    src = src.replace(/(Design only|design only)/, function (m) {
      return m + i('design only');
    });
    n++;
  }
  if (!src.includes('data-term="disaster k9"') && /Global Disaster K9|Disaster K9/i.test(src)) {
    src = src.replace(/(Global Disaster K9|Disaster K9)/, function (m) {
      return m + i('disaster k9');
    });
    n++;
  }
  fs.writeFileSync(k9x, src);
  console.log('k9-lifeline-experience.js +', n);
}

// Ensure star-souls loads glossary
const star = path.join(__dirname, '..', 'star-souls.html');
if (fs.existsSync(star)) {
  let src = fs.readFileSync(star, 'utf8');
  if (!src.includes('glossary.js')) {
    if (src.includes('</head>')) {
      src = src.replace(
        '</head>',
        '<script src="js/glossary.js" defer></script>\n</head>'
      );
      fs.writeFileSync(star, src);
      console.log('star-souls.html glossary wired');
    }
  }
}

// program pages: ensure glossary after programs-data if missing icons help
const progDir = path.join(__dirname, '..', 'programs');
if (fs.existsSync(progDir)) {
  let count = 0;
  fs.readdirSync(progDir).forEach(function (name) {
    if (!name.endsWith('.html')) return;
    const file = path.join(progDir, name);
    let src = fs.readFileSync(file, 'utf8');
    if (src.includes('glossary.js')) return;
    if (src.includes('programs-data.js')) {
      src = src.replace(
        '<script src="../js/programs-data.js" defer></script>',
        '<script src="../js/programs-data.js" defer></script>\n <script src="../js/glossary.js" defer></script>'
      );
      fs.writeFileSync(file, src);
      count++;
    }
  });
  console.log('program pages glossary added', count);
}

console.log('done');
