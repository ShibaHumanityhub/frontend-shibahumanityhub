/**
 * Orphan Christmas arena - skull-grab page experience.
 * Live warehouse broadcast UI, elegant holiday palette, multi-cam floor.
 * Preview until real streams are live. Truth labeled.
 */
(function () {
  'use strict';

  var CAMS = [
    {
      id: 'wrap',
      label: 'CAM 01 · WRAP LINE',
      sub: 'Elves folding paper · gold light',
      src: '../assets/videos/orphanchristmas-animated.mp4',
      poster: '../assets/images/orphanxmasphoto.jpg'
    },
    {
      id: 'load',
      label: 'CAM 02 · LOAD DOCK',
      sub: 'Pallets sealing · trucks waiting',
      src: '../assets/videos/santasworkshoplive-animated.mp4',
      poster: '../assets/images/santasworkshoplivephoto.jpg'
    },
    {
      id: 'floor',
      label: 'CAM 03 · MAIN FLOOR',
      sub: 'Full warehouse · Christmas shift',
      src: '../assets/videos/orphanchristmas-animated.mp4',
      poster: '../assets/images/orphanxmasphoto.jpg'
    },
    {
      id: 'desk',
      label: 'CAM 04 · WISH DESK',
      sub: 'Verified lists · quiet hands',
      src: '../assets/videos/santasworkshoplive-animated.mp4',
      poster: '../assets/images/santasworkshoplivephoto.jpg'
    }
  ];

  var CRAWL = [
    'LIVE FROM THE MERCY WAREHOUSE',
    'EVERY BOX HAS A NAME BEHIND A PARTNER CODE',
    'NO SCAMMERS · VERIFIED NEED ONLY',
    'TURKEY DINNERS · GROCERY VOUCHERS · GIFT PACKS',
    'JESUS IS THE REASON · THESE KIDS ARE THE WHY',
    'WHEN FUNDED THIS FEED GOES REAL'
  ];

  function styles() {
    if (document.getElementById('oc-arena-css')) return;
    var s = document.createElement('style');
    s.id = 'oc-arena-css';
    s.textContent = [
      'body.oc-arena-on{background:#0a0608!important}',
      'body.oc-arena-on > nav{border-bottom-color:rgba(232,197,71,.35)!important;background:rgba(10,6,8,.92)!important}',
      'body.oc-arena-on > footer{border-top-color:rgba(232,197,71,.2);background:#0a0608}',
      '.oca{--wine:#6b0f1a;--crimson:#c41e3a;--gold:#e8c547;--cream:#fff4e0;--pine:#0d3d2c;--ink:#0a0608;font-family:Inter,system-ui,sans-serif;color:var(--cream);position:relative}',
      '.oca *{box-sizing:border-box}',
      '.oca-snow{position:fixed;inset:0;pointer-events:none;z-index:1;overflow:hidden}',
      '.oca-snow i{position:absolute;top:-10px;width:4px;height:4px;background:#fff;border-radius:50%;opacity:.35;animation:oca-fall linear infinite}',
      '@keyframes oca-fall{to{transform:translateY(110vh)}}',
      '.oca-hero{position:relative;min-height:100vh;padding:7rem 1.25rem 3rem;display:flex;flex-direction:column;justify-content:center;overflow:hidden;z-index:2}',
      '.oca-hero-bg{position:absolute;inset:0;background:',
      'radial-gradient(ellipse 80% 60% at 50% -10%,rgba(196,30,58,.45),transparent 55%),',
      'radial-gradient(ellipse 50% 40% at 90% 80%,rgba(13,61,44,.5),transparent 50%),',
      'radial-gradient(ellipse 40% 30% at 10% 60%,rgba(232,197,71,.12),transparent 45%),',
      'linear-gradient(180deg,#1a080c 0%,#0a0608 55%,#0a0f0c 100%)}',
      '.oca-hero-bg::after{content:"";position:absolute;inset:0;background:url(../assets/images/orphanxmasphoto.jpg) center/cover;opacity:.14;mix-blend-mode:luminosity;filter:saturate(1.2)}',
      '.oca-hero-inner{position:relative;z-index:2;max-width:72rem;margin:0 auto;width:100%}',
      '.oca-live-pill{display:inline-flex;align-items:center;gap:.5rem;padding:.4rem .85rem;border-radius:999px;border:1px solid rgba(239,68,68,.5);background:rgba(127,29,29,.45);font-size:.65rem;letter-spacing:.2em;text-transform:uppercase;color:#fecaca;margin-bottom:1.25rem;box-shadow:0 0 24px rgba(239,68,68,.25)}',
      '.oca-live-pill .dot{width:8px;height:8px;border-radius:50%;background:#ef4444;box-shadow:0 0 12px #ef4444;animation:oca-blink 1.1s ease infinite}',
      '@keyframes oca-blink{0%,100%{opacity:1}50%{opacity:.25}}',
      '.oca-kicker{font-size:.7rem;letter-spacing:.28em;text-transform:uppercase;color:rgba(232,197,71,.75);margin:0 0 .75rem}',
      '.oca-h1{font-family:Georgia,"Times New Roman",serif;font-size:clamp(2.4rem,7vw,4.75rem);line-height:1.02;font-weight:700;margin:0 0 1rem;color:#fff;text-shadow:0 0 40px rgba(196,30,58,.45),0 2px 0 rgba(0,0,0,.4)}',
      '.oca-h1 em{font-style:normal;background:linear-gradient(90deg,#fde68a,#e8c547,#fca5a5);-webkit-background-clip:text;background-clip:text;color:transparent}',
      '.oca-lede{font-size:clamp(1.05rem,2.2vw,1.35rem);line-height:1.55;color:rgba(255,244,224,.88);max-width:38rem;margin:0 0 1.75rem;font-weight:400}',
      '.oca-lede strong{color:#fde68a;font-weight:600}',
      '.oca-cta-row{display:flex;flex-wrap:wrap;gap:.75rem;margin-bottom:2rem}',
      '.oca-cta{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;padding:1rem 1.6rem;border-radius:999px;font-weight:700;font-size:.95rem;text-decoration:none;border:0;cursor:pointer;font-family:inherit;transition:transform .15s,box-shadow .15s}',
      '.oca-cta:hover{transform:translateY(-1px)}',
      '.oca-cta-primary{color:#1a080c;background:linear-gradient(135deg,#f5e6a8 0%,#e8c547 35%,#c41e3a 100%);box-shadow:0 12px 40px -8px rgba(196,30,58,.55)}',
      '.oca-cta-ghost{color:#fde68a;background:transparent;border:1px solid rgba(232,197,71,.4)}',
      '.oca-stats{display:flex;flex-wrap:wrap;gap:.75rem}',
      '.oca-stat{padding:.65rem 1rem;border-radius:1rem;border:1px solid rgba(232,197,71,.2);background:rgba(0,0,0,.35);backdrop-filter:blur(8px);min-width:7rem}',
      '.oca-stat b{display:block;font-size:1.15rem;color:#fde68a;font-family:Georgia,serif}',
      '.oca-stat span{font-size:.65rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,244,224,.55)}',
      /* Broadcast wall */
      '.oca-broadcast{position:relative;z-index:2;padding:0 1.25rem 3rem;max-width:72rem;margin:0 auto}',
      '.oca-bcast-head{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:1rem;margin-bottom:1rem}',
      '.oca-bcast-title{font-family:Georgia,serif;font-size:clamp(1.5rem,3vw,2rem);margin:0;color:#fff}',
      '.oca-viewers{font-size:.75rem;color:#fca5a5;letter-spacing:.06em}',
      '.oca-stage{display:grid;grid-template-columns:1fr;gap:1rem}',
      '@media(min-width:900px){.oca-stage{grid-template-columns:1.65fr .9fr}}',
      '.oca-main-feed{position:relative;border-radius:1.25rem;overflow:hidden;border:1px solid rgba(232,197,71,.35);background:#000;box-shadow:0 0 0 1px rgba(196,30,58,.15),0 30px 80px -20px rgba(0,0,0,.8),0 0 60px -20px rgba(196,30,58,.35);aspect-ratio:16/9}',
      '.oca-main-feed video{width:100%;height:100%;object-fit:cover;display:block}',
      '.oca-overlay{position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(0,0,0,.45) 0%,transparent 30%,transparent 70%,rgba(0,0,0,.65) 100%)}',
      '.oca-scan{position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,transparent 0 2px,rgba(255,255,255,.03) 2px 3px);mix-blend-mode:overlay;opacity:.5}',
      '.oca-feed-top{position:absolute;top:0;left:0;right:0;padding:.85rem 1rem;display:flex;justify-content:space-between;align-items:flex-start;z-index:3;pointer-events:none}',
      '.oca-feed-bot{position:absolute;bottom:0;left:0;right:0;padding:.85rem 1rem;z-index:3;pointer-events:none}',
      '.oca-cam-tag{font-size:.65rem;letter-spacing:.16em;text-transform:uppercase;color:#fde68a;text-shadow:0 1px 4px #000}',
      '.oca-cam-sub{font-size:.75rem;color:rgba(255,244,224,.75);margin-top:.2rem}',
      '.oca-rec{display:inline-flex;align-items:center;gap:.35rem;font-size:.6rem;letter-spacing:.14em;color:#fecaca;background:rgba(127,29,29,.7);padding:.3rem .55rem;border-radius:4px}',
      '.oca-rec i{width:6px;height:6px;border-radius:50%;background:#ef4444;animation:oca-blink 1s ease infinite}',
      '.oca-ticker{margin-top:.65rem;overflow:hidden;border-radius:.65rem;border:1px solid rgba(232,197,71,.2);background:rgba(10,6,8,.85);white-space:nowrap}',
      '.oca-ticker-track{display:inline-block;padding:.55rem 0;animation:oca-tick 28s linear infinite;font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(253,230,138,.85)}',
      '.oca-ticker-track span{margin:0 2rem}',
      '@keyframes oca-tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}',
      '.oca-side{display:flex;flex-direction:column;gap:.65rem}',
      '.oca-thumb{position:relative;border-radius:.9rem;overflow:hidden;border:1px solid rgba(255,255,255,.1);cursor:pointer;aspect-ratio:16/10;background:#111;transition:border-color .2s,box-shadow .2s;padding:0;font:inherit;color:inherit;text-align:left}',
      '.oca-thumb:hover,.oca-thumb.is-live{border-color:rgba(232,197,71,.55);box-shadow:0 0 24px -8px rgba(232,197,71,.4)}',
      '.oca-thumb video,.oca-thumb img{width:100%;height:100%;object-fit:cover;display:block;opacity:.85}',
      '.oca-thumb-label{position:absolute;left:0;right:0;bottom:0;padding:.45rem .55rem;background:linear-gradient(transparent,rgba(0,0,0,.85));font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:#fde68a}',
      '.oca-chat{border-radius:.9rem;border:1px solid rgba(232,197,71,.2);background:rgba(20,10,12,.9);padding:.75rem;flex:1;min-height:140px;max-height:200px;overflow:auto}',
      '.oca-chat-line{font-size:.72rem;color:rgba(255,244,224,.7);margin-bottom:.4rem;line-height:1.35}',
      '.oca-chat-line b{color:#fde68a;font-weight:600}',
      '.oca-honest{font-size:.68rem;color:rgba(255,244,224,.45);margin-top:.75rem;text-align:center}',
      /* Story band */
      '.oca-story{position:relative;z-index:2;padding:3rem 1.25rem 2rem;max-width:48rem;margin:0 auto}',
      '.oca-story h2{font-family:Georgia,serif;font-size:clamp(1.75rem,4vw,2.4rem);color:#fff;margin:0 0 1rem}',
      '.oca-story p{font-size:1.05rem;line-height:1.7;color:rgba(255,244,224,.82);margin:0 0 1rem}',
      '.oca-story p strong{color:#fde68a}',
      '.oca-verse{border-left:3px solid var(--gold);padding:.9rem 1.1rem;margin:1.5rem 0;background:linear-gradient(90deg,rgba(196,30,58,.15),transparent);font-family:Georgia,serif;font-style:italic;color:#fde68a;font-size:1.1rem}',
      '.oca-verse cite{display:block;margin-top:.4rem;font-family:Inter,sans-serif;font-style:normal;font-size:.65rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(232,197,71,.6)}',
      '.oca-who{display:grid;grid-template-columns:1fr 1fr;gap:.65rem;margin:1.5rem 0}',
      '@media(max-width:560px){.oca-who{grid-template-columns:1fr}}',
      '.oca-who div{padding:.85rem;border-radius:.9rem;border:1px solid rgba(196,30,58,.3);background:rgba(107,15,26,.25)}',
      '.oca-who b{display:block;color:#fecaca;font-size:.85rem;margin-bottom:.25rem}',
      '.oca-who span{font-size:.78rem;color:rgba(255,244,224,.6);line-height:1.4}',
      '.oca-ops-anchor{scroll-margin-top:5rem}'
    ].join('\n');
    document.head.appendChild(s);
  }

  function snow(n) {
    var box = document.createElement('div');
    box.className = 'oca-snow';
    box.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < n; i++) {
      var f = document.createElement('i');
      f.style.left = Math.random() * 100 + '%';
      f.style.animationDuration = 6 + Math.random() * 10 + 's';
      f.style.animationDelay = Math.random() * 8 + 's';
      f.style.opacity = String(0.15 + Math.random() * 0.4);
      f.style.width = f.style.height = 2 + Math.random() * 4 + 'px';
      box.appendChild(f);
    }
    return box;
  }

  function crawlHtml() {
    var twice = CRAWL.concat(CRAWL).map(function (t) {
      return '<span>' + t + '</span>';
    }).join('');
    return '<div class="oca-ticker" aria-hidden="true"><div class="oca-ticker-track">' + twice + '</div></div>';
  }

  function build() {
    styles();
    document.body.classList.add('oc-arena-on');

    var root = document.getElementById('program-page-root');
    if (!root) return;

    var viewers = 1200 + Math.floor(Math.random() * 800);

    root.innerHTML =
      '<div class="oca" id="oca-root">' +
        // hero
        '<section class="oca-hero">' +
          '<div class="oca-hero-bg" aria-hidden="true"></div>' +
          '<div class="oca-hero-inner">' +
            '<div class="oca-live-pill"><span class="dot"></span> Live warehouse broadcast · Preview feed</div>' +
            '<p class="oca-kicker">$hopeseed · Orphan Christmas</p>' +
            '<h1 class="oca-h1">Some kids wake up on Christmas<br>with <em>nothing but quiet.</em><br>We refuse to look away.</h1>' +
            '<p class="oca-lede">' +
              'Orphans. Foster kids. Youth shelters. Families who can prove the money ran out. ' +
              '<strong>Not a scam wish list.</strong> A warehouse floor. Live elves. Trucks. Turkey dinners. ' +
              'Gifts that land with a name behind a partner code. ' +
              '<strong>Jesus is the reason. These kids are the why.</strong>' +
            '</p>' +
            '<div class="oca-cta-row">' +
              '<a class="oca-cta oca-cta-primary" href="#oca-broadcast">Watch the floor live</a>' +
              '<a class="oca-cta oca-cta-ghost" href="#christmas-ops">Build a gift · dinner · wrap</a>' +
              '<button type="button" class="oca-cta oca-cta-ghost" id="oca-sponsor">Stand with them</button>' +
            '</div>' +
            '<div class="oca-stats">' +
              '<div class="oca-stat"><b>LIVE</b><span>Floor cams</span></div>' +
              '<div class="oca-stat"><b id="oca-viewers">' + viewers.toLocaleString() + '</b><span>Watching (sim)</span></div>' +
              '<div class="oca-stat"><b>Verified</b><span>Need only</span></div>' +
              '<div class="oca-stat"><b>When funded</b><span>Real trucks</span></div>' +
            '</div>' +
          '</div>' +
        '</section>' +

        // broadcast
        '<section class="oca-broadcast oca-ops-anchor" id="oca-broadcast">' +
          '<div class="oca-bcast-head">' +
            '<div>' +
              '<p class="oca-kicker" style="margin-bottom:.35rem">Multi-cam mercy</p>' +
              '<h2 class="oca-bcast-title">Inside the Christmas warehouse</h2>' +
            '</div>' +
            '<div class="oca-viewers">● <span id="oca-viewers-2">' + viewers.toLocaleString() + '</span> in the room · elegant holiday shift</div>' +
          '</div>' +
          '<div class="oca-stage">' +
            '<div>' +
              '<div class="oca-main-feed" id="oca-main">' +
                '<video id="oca-main-video" src="' + CAMS[0].src + '" poster="' + CAMS[0].poster + '" autoplay muted loop playsinline></video>' +
                '<div class="oca-overlay"></div>' +
                '<div class="oca-scan"></div>' +
                '<div class="oca-feed-top">' +
                  '<div>' +
                    '<div class="oca-cam-tag" id="oca-cam-label">' + CAMS[0].label + '</div>' +
                    '<div class="oca-cam-sub" id="oca-cam-sub">' + CAMS[0].sub + '</div>' +
                  '</div>' +
                  '<div class="oca-rec"><i></i> REC · BROADCAST</div>' +
                '</div>' +
                '<div class="oca-feed-bot">' +
                  '<div class="oca-cam-sub">Edmonton North Pole Hub · Christmas ops · $hopeseed</div>' +
                '</div>' +
              '</div>' +
              crawlHtml() +
              '<p class="oca-honest">Preview feeds until real cameras go live. Same truth rule: no fake GPS, no fake kids on stream.</p>' +
            '</div>' +
            '<div class="oca-side">' +
              CAMS.map(function (c, i) {
                return (
                  '<button type="button" class="oca-thumb' + (i === 0 ? ' is-live' : '') + '" data-cam="' + i + '">' +
                    '<video src="' + c.src + '" poster="' + c.poster + '" muted loop playsinline autoplay></video>' +
                    '<span class="oca-thumb-label">' + c.label + '</span>' +
                  '</button>'
                );
              }).join('') +
              '<div class="oca-chat" id="oca-chat" aria-live="polite"></div>' +
            '</div>' +
          '</div>' +
        '</section>' +

        // story
        '<section class="oca-story">' +
          '<h2>This is not content. This is a child\'s morning.</h2>' +
          '<p>Somewhere a kid already knows Christmas will feel empty. Foster home. Shelter bed. House where the lights went out so rent could stay on. You felt that in your chest. Good. Stay with it.</p>' +
          '<p>We built Orphan Christmas so that ache becomes action. Pack size. Location. Wrap they choose. Turkey dinner for a low-income table. Warehouse elves. Trucks. Local drops. <strong>Verified partners only.</strong></p>' +
          '<div class="oca-verse">' +
            '"Whatever you did for one of the least of these brothers and sisters of mine, you did for me."' +
            '<cite>Matthew 25:40</cite>' +
          '</div>' +
          '<div class="oca-who">' +
            '<div><b>Orphans &amp; foster youth</b><span>Through licensed agencies. Real case files.</span></div>' +
            '<div><b>Youth shelters</b><span>Teens who still deserve a holy night.</span></div>' +
            '<div><b>Proven hardship</b><span>Documented. Caseworker sign-off. No DMs.</span></div>' +
            '<div><b>Privacy first</b><span>No child used as a prop for clout.</span></div>' +
          '</div>' +
          '<p>Scroll into the ops floor below. Build a gift. Pick paper. Sponsor a dinner. Watch the cams. When funding is real, this stops being a preview.</p>' +
          '<div class="oca-cta-row" style="margin-top:1.5rem">' +
            '<a class="oca-cta oca-cta-primary" href="#christmas-ops">Enter the ops floor</a>' +
          '</div>' +
        '</section>' +

        '<div id="oca-ops-slot" class="oca-ops-anchor"></div>' +
        '<div id="program-stats" style="display:none"></div>' +
      '</div>';

    // snow after paint
    document.body.appendChild(snow(36));

    wire(root, viewers);

    // Mount logistics into slot: temporarily put #program-stats after slot so christmas ops inserts before it
    var slot = document.getElementById('oca-ops-slot');
    if (window.SHHChristmasMercyOps && window.SHHChristmasMercyOps.mount) {
      // Create a host that ops will insert before #program-stats
      try {
        window.SHHChristmasMercyOps.mount({ id: 17, title: 'Orphan Christmas', category: '$hopeseed' });
        // Move christmas-ops under arena if it landed elsewhere
        var ops = document.getElementById('christmas-ops');
        if (ops && slot) {
          slot.appendChild(ops);
          ops.classList.add('oca-ops-anchor');
        }
      } catch (e) { /* ignore */ }
    }
  }

  function wire(root, viewers) {
    var mainVid = document.getElementById('oca-main-video');
    var camLabel = document.getElementById('oca-cam-label');
    var camSub = document.getElementById('oca-cam-sub');
    var thumbs = root.querySelectorAll('.oca-thumb');

    function switchCam(i) {
      var c = CAMS[i];
      if (!c || !mainVid) return;
      if (mainVid.getAttribute('src') !== c.src) {
        mainVid.setAttribute('src', c.src);
        mainVid.setAttribute('poster', c.poster);
        mainVid.play().catch(function () {});
      }
      if (camLabel) camLabel.textContent = c.label;
      if (camSub) camSub.textContent = c.sub;
      thumbs.forEach(function (t, idx) {
        t.classList.toggle('is-live', idx === i);
      });
    }

    thumbs.forEach(function (t) {
      t.addEventListener('click', function () {
        switchCam(parseInt(t.getAttribute('data-cam'), 10) || 0);
      });
    });

    var sponsor = document.getElementById('oca-sponsor');
    if (sponsor) {
      sponsor.addEventListener('click', function () {
        if (typeof window.sponsorProgram === 'function') {
          window.sponsorProgram('orphan-christmas');
        } else {
          var ops = document.getElementById('christmas-ops');
          if (ops) ops.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Chat crawl
    var chat = document.getElementById('oca-chat');
    var lines = [
      ['@mercy', 'Wrap line is stacked. That gold paper hits different.'],
      ['@anon', 'Dinner voucher for a family of 6. Do it.'],
      ['@host', 'Cam 01 live. Hands only. No kid faces without consent.'],
      ['@hopeseed', 'Verified list just hit the wish desk.'],
      ['@yeg', 'Truck T-104 rolling local. Edmonton drops.'],
      ['@heart', 'This is what Christmas is supposed to feel like.'],
      ['@truth', 'Preview feed. Real cams when funded. Still watching.'],
      ['@shib', '2 flywheels. 1 mission. Pack another crate.']
    ];
    var li = 0;
    function pushChat() {
      if (!chat) return;
      var L = lines[li % lines.length];
      li++;
      var div = document.createElement('div');
      div.className = 'oca-chat-line';
      div.innerHTML = '<b>' + L[0] + '</b> ' + L[1];
      chat.appendChild(div);
      while (chat.children.length > 8) chat.removeChild(chat.firstChild);
      chat.scrollTop = chat.scrollHeight;
    }
    pushChat();
    setInterval(pushChat, 3200);

    // Viewer tick
    setInterval(function () {
      viewers += Math.floor(Math.random() * 7) - 2;
      if (viewers < 900) viewers = 900 + Math.floor(Math.random() * 50);
      var a = document.getElementById('oca-viewers');
      var b = document.getElementById('oca-viewers-2');
      if (a) a.textContent = viewers.toLocaleString();
      if (b) b.textContent = viewers.toLocaleString();
    }, 2800);

    // Auto rotate cams every 14s
    var camIdx = 0;
    setInterval(function () {
      camIdx = (camIdx + 1) % CAMS.length;
      switchCam(camIdx);
    }, 14000);
  }

  window.SHHOrphanChristmasArena = {
    render: build,
    isOrphanChristmas: function (p) {
      return p && (p.id === 17 || /orphan.?christmas/i.test(p.title || ''));
    }
  };
})();
