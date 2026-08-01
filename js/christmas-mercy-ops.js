/**
 * Orphan Christmas + Santa's Workshop Live operations layer.
 * Donations by size/location · live elf warehouse · hub shipping · truck trackers to local drops.
 * Preview design until partners/rails are live — labeled honestly.
 */
(function () {
  'use strict';

  var HUBS = [
    { id: 'yeg', name: 'Edmonton North Pole Hub', city: 'Edmonton, AB', role: 'Main warehouse · live elf floor', elves: 42, status: 'packing' },
    { id: 'yyc', name: 'Calgary Mercy Annex', city: 'Calgary, AB', role: 'Regional sort · outbound', elves: 18, status: 'receiving' },
    { id: 'yvr', name: 'Pacific Gift Gate', city: 'Surrey, BC', role: 'West coast staging', elves: 14, status: 'loading' },
    { id: 'yyz', name: 'Toronto Hope Dock', city: 'Mississauga, ON', role: 'East hub · overnight runs', elves: 22, status: 'packing' },
    { id: 'sea', name: 'Seattle Sister Shed', city: 'Kent, WA', role: 'USA Pacific link', elves: 11, status: 'idle' },
    { id: 'den', name: 'Denver Mountain Mail', city: 'Aurora, CO', role: 'USA Rockies link', elves: 9, status: 'receiving' }
  ];

  var DONATION_SIZES = [
    {
      id: 'stocking',
      name: 'Stocking Pack',
      size: 'Small',
      kids: '1 child',
      fills: 'Toys · socks · candy · handwritten note',
      when: 'Fits one verified child'
    },
    {
      id: 'child-bag',
      name: 'Child Mercy Bag',
      size: 'Medium',
      kids: '1 child full set',
      fills: 'Warm clothes · gift · book · hygiene kit',
      when: 'Standard Christmas morning for one heart'
    },
    {
      id: 'sibling-crate',
      name: 'Sibling Crate',
      size: 'Large',
      kids: '2–4 siblings',
      fills: 'Shared joy + one personal gift each',
      when: 'Keeps brothers & sisters celebrated together'
    },
    {
      id: 'floor-pallet',
      name: 'Shelter Floor Pallet',
      size: 'Warehouse',
      kids: 'Whole wing / floor',
      fills: 'Pallet of sorted packs for one partner site',
      when: 'Youth shelter or foster agency drop'
    }
  ];

  var DROP_SITES = [
    { id: 'd1', name: 'Hope House Youth Shelter', city: 'Edmonton, AB', type: 'Youth shelter', kids: 28, need: 'Verified' },
    { id: 'd2', name: 'Prairie Foster Collective', city: 'St. Albert, AB', type: 'Foster network', kids: 41, need: 'Verified' },
    { id: 'd3', name: 'Northside Family Crisis Home', city: 'Edmonton, AB', type: 'Family hardship', kids: 19, need: 'Documented' },
    { id: 'd4', name: 'Riverbend Children\'s Home', city: 'Calgary, AB', type: 'Orphan / residential', kids: 34, need: 'Verified' },
    { id: 'd5', name: 'Maple Kinship Circle', city: 'Red Deer, AB', type: 'Kinship care', kids: 16, need: 'Verified' },
    { id: 'd6', name: 'Pacific Youth Haven', city: 'Surrey, BC', type: 'Youth shelter', kids: 22, need: 'Verified' },
    { id: 'd7', name: 'GTA Second Chance House', city: 'Brampton, ON', type: 'Foster / shelter', kids: 37, need: 'Verified' },
    { id: 'd8', name: 'Cascadia Care House', city: 'Tacoma, WA', type: 'Youth shelter', kids: 15, need: 'Partner pending' }
  ];

  // Simulated Christmas-season truck routes (preview until GPS live)
  var TRUCKS = [
    { id: 'T-104', from: 'yeg', toDrop: 'd1', label: 'Edmonton local run', progress: 0.72, eta: '46 min', cargo: '14 Child Bags · 3 Sibling Crates' },
    { id: 'T-207', from: 'yeg', toDrop: 'd2', label: 'St. Albert foster route', progress: 0.41, eta: '1h 12m', cargo: '22 Stocking Packs · 8 Child Bags' },
    { id: 'T-311', from: 'yeg', toHub: 'yyc', label: 'Hub transfer → Calgary', progress: 0.58, eta: '2h 05m', cargo: '2 Floor Pallets' },
    { id: 'T-418', from: 'yyc', toDrop: 'd4', label: 'Calgary residential drop', progress: 0.88, eta: '18 min', cargo: '11 Child Bags · 2 Sibling Crates' },
    { id: 'T-502', from: 'yvr', toDrop: 'd6', label: 'Pacific youth drop', progress: 0.33, eta: '1h 40m', cargo: '9 Child Bags' },
    { id: 'T-619', from: 'yyz', toDrop: 'd7', label: 'GTA Christmas run', progress: 0.61, eta: '55 min', cargo: '1 Floor Pallet · 6 Sibling Crates' },
    { id: 'T-088', from: 'yeg', toDrop: 'd3', label: 'Northside hardship route', progress: 0.15, eta: '2h 28m', cargo: '17 Stocking Packs' },
    { id: 'T-771', from: 'yyc', toHub: 'den', label: 'Hub transfer → Denver', progress: 0.22, eta: '14h', cargo: '3 Floor Pallets (season)' }
  ];

  var ELF_STATIONS = [
    { name: 'Receiving Bay', work: 'Donations sorted by size & destination', workers: 6 },
    { name: 'Wish Desk', work: 'Verified lists matched to packs', workers: 4 },
    { name: 'Wrap Line', work: 'Paper, ribbons, quiet prayer tags', workers: 12 },
    { name: 'Warm Layer', work: 'Coats · socks · winter kits', workers: 8 },
    { name: 'Quality Heart Check', work: 'No empty boxes · no wrong ages', workers: 5 },
    { name: 'Load Dock', work: 'Pallets sealed · trucks scanned out', workers: 7 }
  ];

  function hubById(id) {
    return HUBS.find(function (h) { return h.id === id; }) || { name: id, city: '' };
  }
  function dropById(id) {
    return DROP_SITES.find(function (d) { return d.id === id; }) || { name: id, city: '' };
  }

  function styles() {
    if (document.getElementById('xmas-ops-css')) return;
    var s = document.createElement('style');
    s.id = 'xmas-ops-css';
    s.textContent = [
      '.xops{--xr:#c41e3a;--xg:#0d5c3d;--xy:#e8c547;--xpine:#0a1f18;font-family:Inter,system-ui,sans-serif;color:#fafafa}',
      '.xops-wrap{max-w:5xl;margin:0 auto;padding:0 1.5rem 3rem}',
      '.xops-banner{border-radius:1.5rem;border:1px solid rgba(232,197,71,.35);background:linear-gradient(135deg,rgba(196,30,58,.2),rgba(13,92,61,.35) 50%,#0a0f1c);padding:1.5rem 1.75rem;margin-bottom:1.5rem;position:relative;overflow:hidden}',
      '.xops-banner::after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 90% 10%,rgba(232,197,71,.15),transparent 40%);pointer-events:none}',
      '.xops-kicker{font-size:.65rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(232,197,71,.85);margin:0 0 .5rem}',
      '.xops-title{font-size:clamp(1.5rem,3vw,2rem);font-weight:700;margin:0 0 .5rem;font-family:Georgia,serif}',
      '.xops-lede{color:#d4d4d8;font-size:.95rem;line-height:1.55;max-width:42rem;margin:0}',
      '.xops-honest{margin-top:.75rem;font-size:.72rem;color:#a1a1aa}',
      '.xops-grid{display:grid;gap:1rem}',
      '@media(min-width:768px){.xops-grid-2{grid-template-columns:1fr 1fr}.xops-grid-3{grid-template-columns:1fr 1fr 1fr}.xops-grid-4{grid-template-columns:1fr 1fr 1fr 1fr}}',
      '.xops-card{border-radius:1.15rem;border:1px solid rgba(255,255,255,.1);background:rgba(24,24,27,.75);padding:1.1rem 1.15rem}',
      '.xops-card h3{font-size:.95rem;margin:0 0 .65rem;color:#fde68a}',
      '.xops-card h4{font-size:.8rem;margin:0 0 .35rem;color:#fecaca}',
      '.xops-muted{font-size:.78rem;color:#a1a1aa;line-height:1.45}',
      '.xops-pill{display:inline-flex;align-items:center;gap:.35rem;font-size:.62rem;letter-spacing:.08em;text-transform:uppercase;padding:.25rem .55rem;border-radius:999px;border:1px solid rgba(232,197,71,.35);color:#fde68a;background:rgba(10,31,24,.6)}',
      '.xops-live{display:inline-flex;align-items:center;gap:.4rem;font-size:.65rem;letter-spacing:.14em;text-transform:uppercase;color:#6ee7b7}',
      '.xops-live i{width:7px;height:7px;border-radius:50%;background:#34d399;box-shadow:0 0 10px #34d399;animation:xops-blink 1.4s ease infinite}',
      '@keyframes xops-blink{0%,100%{opacity:1}50%{opacity:.35}}',
      '.xops-station{display:flex;justify-content:space-between;gap:.75rem;padding:.65rem .7rem;border-radius:.75rem;background:rgba(13,92,61,.25);border:1px solid rgba(52,211,153,.2);margin-bottom:.45rem}',
      '.xops-station strong{font-size:.82rem;color:#ecfdf5}',
      '.xops-workers{font-size:.7rem;color:#fde68a;white-space:nowrap}',
      '.xops-bar{height:6px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden;margin-top:.45rem}',
      '.xops-bar>i{display:block;height:100%;background:linear-gradient(90deg,#c41e3a,#e8c547,#34d399);border-radius:inherit;transition:width .8s ease}',
      '.xops-truck{padding:.85rem .9rem;border-radius:1rem;border:1px solid rgba(251,191,36,.22);background:linear-gradient(160deg,rgba(196,30,58,.12),rgba(10,15,28,.9));margin-bottom:.55rem}',
      '.xops-truck-head{display:flex;justify-content:space-between;gap:.5rem;align-items:flex-start;margin-bottom:.35rem}',
      '.xops-truck-id{font-family:ui-monospace,monospace;font-size:.72rem;color:#fcd34d}',
      '.xops-map{position:relative;min-height:220px;border-radius:1.15rem;border:1px solid rgba(255,255,255,.1);background:',
      '  radial-gradient(circle at 20% 30%,rgba(196,30,58,.2),transparent 35%),',
      '  radial-gradient(circle at 70% 55%,rgba(52,211,153,.18),transparent 40%),',
      '  linear-gradient(180deg,#0c1220,#0a1f18);overflow:hidden;margin-bottom:1rem}',
      '.xops-node{position:absolute;transform:translate(-50%,-50%);text-align:center}',
      '.xops-dot{width:12px;height:12px;border-radius:50%;margin:0 auto 4px;box-shadow:0 0 12px currentColor}',
      '.xops-node span{display:block;font-size:.58rem;color:#d4d4d8;max-width:72px;line-height:1.2}',
      '.xops-truck-dot{position:absolute;width:10px;height:10px;border-radius:50%;background:#fbbf24;box-shadow:0 0 14px #fbbf24;transform:translate(-50%,-50%);animation:xops-pulse 1.6s ease infinite}',
      '@keyframes xops-pulse{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-50%,-50%) scale(1.35)}}',
      '.xops-tabs{display:flex;flex-wrap:wrap;gap:.4rem;margin:1rem 0 1.1rem}',
      '.xops-tab{font-size:.72rem;padding:.45rem .8rem;border-radius:999px;border:1px solid rgba(255,255,255,.12);background:transparent;color:#a1a1aa;cursor:pointer;font-family:inherit}',
      '.xops-tab.is-on{background:rgba(232,197,71,.15);border-color:rgba(232,197,71,.45);color:#fde68a}',
      '.xops-panel{display:none}.xops-panel.is-on{display:block}',
      '.xops-select{width:100%;background:#09090b;border:1px solid rgba(255,255,255,.12);color:#fff;border-radius:.75rem;padding:.55rem .7rem;font-size:.85rem;margin-top:.35rem}',
      '.xops-cta{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;margin-top:1rem;padding:.75rem 1.25rem;border-radius:999px;border:0;cursor:pointer;font-weight:700;font-size:.9rem;color:#1a0a0c;background:linear-gradient(135deg,#f5e6a8,#e8c547 40%,#c41e3a);font-family:inherit}',
      '.xops-flow{display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;font-size:.75rem;color:#d4d4d8;margin:1rem 0}',
      '.xops-flow b{color:#fde68a;font-weight:600}',
      '.xops-arrow{color:#71717a}'
    ].join('\n');
    document.head.appendChild(s);
  }

  function donationCards() {
    return DONATION_SIZES.map(function (d) {
      return (
        '<div class="xops-card">' +
          '<div class="xops-pill">' + d.size + '</div>' +
          '<h4 style="margin-top:.55rem">' + d.name + '</h4>' +
          '<p class="xops-muted"><strong style="color:#ecfdf5">' + d.kids + '</strong> · ' + d.fills + '</p>' +
          '<p class="xops-muted" style="margin-top:.4rem">' + d.when + '</p>' +
        '</div>'
      );
    }).join('');
  }

  function hubCards() {
    return HUBS.map(function (h) {
      var st =
        h.status === 'packing' ? 'Packing live' :
        h.status === 'loading' ? 'Loading trucks' :
        h.status === 'receiving' ? 'Receiving inbound' : 'Standing by';
      return (
        '<div class="xops-card">' +
          '<div class="xops-live"><i></i> ' + st + '</div>' +
          '<h4 style="margin-top:.45rem">' + h.name + '</h4>' +
          '<p class="xops-muted">' + h.city + '</p>' +
          '<p class="xops-muted" style="margin-top:.35rem">' + h.role + '</p>' +
          '<p class="xops-muted" style="margin-top:.45rem;color:#fde68a">' + h.elves + ' elves on shift (preview roster)</p>' +
        '</div>'
      );
    }).join('');
  }

  function elfFloor() {
    return ELF_STATIONS.map(function (s) {
      return (
        '<div class="xops-station">' +
          '<div><strong>' + s.name + '</strong><div class="xops-muted">' + s.work + '</div></div>' +
          '<div class="xops-workers">🧝 ×' + s.workers + '</div>' +
        '</div>'
      );
    }).join('');
  }

  function truckList() {
    return TRUCKS.map(function (t) {
      var dest = t.toDrop
        ? dropById(t.toDrop).name + ' · ' + dropById(t.toDrop).city
        : hubById(t.toHub).name + ' · ' + hubById(t.toHub).city;
      var from = hubById(t.from);
      var pct = Math.round(t.progress * 100);
      return (
        '<div class="xops-truck" data-truck="' + t.id + '">' +
          '<div class="xops-truck-head">' +
            '<div>' +
              '<div class="xops-truck-id">🚚 ' + t.id + ' · ' + t.label + '</div>' +
              '<div class="xops-muted" style="margin-top:.25rem">' + from.city + ' → ' + dest + '</div>' +
              '<div class="xops-muted" style="margin-top:.2rem">' + t.cargo + '</div>' +
            '</div>' +
            '<div style="text-align:right">' +
              '<div class="xops-live"><i></i> Live</div>' +
              '<div class="xops-muted" style="margin-top:.25rem">ETA ' + t.eta + '</div>' +
              '<div style="font-size:.8rem;color:#fde68a;margin-top:.15rem">' + pct + '%</div>' +
            '</div>' +
          '</div>' +
          '<div class="xops-bar"><i style="width:' + pct + '%" data-bar></i></div>' +
        '</div>'
      );
    }).join('');
  }

  function dropList() {
    return DROP_SITES.map(function (d) {
      return (
        '<div class="xops-card">' +
          '<div class="xops-pill">' + d.type + '</div>' +
          '<h4 style="margin-top:.5rem">' + d.name + '</h4>' +
          '<p class="xops-muted">' + d.city + '</p>' +
          '<p class="xops-muted" style="margin-top:.35rem">~' + d.kids + ' kids on list · <span style="color:#6ee7b7">' + d.need + '</span></p>' +
        '</div>'
      );
    }).join('');
  }

  // Simple schematic map positions (percent)
  var MAP_POS = {
    yeg: { x: 28, y: 38 },
    yyc: { x: 32, y: 52 },
    yvr: { x: 14, y: 42 },
    yyz: { x: 72, y: 40 },
    sea: { x: 12, y: 55 },
    den: { x: 42, y: 68 },
    d1: { x: 30, y: 32 },
    d2: { x: 26, y: 28 },
    d3: { x: 34, y: 30 },
    d4: { x: 36, y: 58 },
    d6: { x: 16, y: 48 },
    d7: { x: 76, y: 36 }
  };

  function mapHtml() {
    var nodes = HUBS.map(function (h) {
      var p = MAP_POS[h.id] || { x: 50, y: 50 };
      return (
        '<div class="xops-node" style="left:' + p.x + '%;top:' + p.y + '%;color:#34d399">' +
          '<div class="xops-dot" style="background:#34d399"></div>' +
          '<span>' + h.city.split(',')[0] + '</span>' +
        '</div>'
      );
    }).join('');
    var trucks = TRUCKS.map(function (t) {
      var a = MAP_POS[t.from] || { x: 40, y: 40 };
      var bKey = t.toDrop || t.toHub;
      var b = MAP_POS[bKey] || { x: 60, y: 50 };
      var x = a.x + (b.x - a.x) * t.progress;
      var y = a.y + (b.y - a.y) * t.progress;
      return '<div class="xops-truck-dot" data-tid="' + t.id + '" style="left:' + x + '%;top:' + y + '%" title="' + t.id + '"></div>';
    }).join('');
    return (
      '<div class="xops-map" aria-label="Christmas logistics map preview">' +
        nodes + trucks +
        '<div style="position:absolute;left:12px;bottom:10px;font-size:.62rem;color:#a1a1aa">Hubs · trucks · preview trackers (not GPS yet)</div>' +
      '</div>'
    );
  }

  function buildHtml(program) {
    var isOrphan = program && program.id === 17;
    var title = isOrphan
      ? 'From warehouse floor to Christmas morning'
      : 'Santa\'s Workshop · the living warehouse';
    var lede = isOrphan
      ? 'Orphan Christmas is not only a night of gifts. It is a mercy supply chain: donations by size, sorted by location, packed by elves on a live warehouse floor, moved hub to hub, then tracked on trucks to verified local drops before Christmas.'
      : 'Year-round workshop that feeds Orphan Christmas season. Live elves, conveyors, hub transfers, and Christmas outbound trackers when the season lights up.';

    return (
      '<section id="christmas-ops" class="xops border-t border-white/10 pt-14 pb-4">' +
        '<div class="xops-wrap">' +
          '<div class="xops-banner">' +
            '<p class="xops-kicker">🎄 Christmas mercy logistics</p>' +
            '<h2 class="xops-title">' + title + '</h2>' +
            '<p class="xops-lede">' + lede + '</p>' +
            '<p class="xops-honest">Preview design · rosters, routes, and trackers go live when partners and ops rails are real. No fake GPS claims.</p>' +
          '</div>' +

          '<div class="xops-flow">' +
            '<b>Donate</b><span class="xops-arrow">→</span>' +
            '<b>Size + location</b><span class="xops-arrow">→</span>' +
            '<b>Elf warehouse</b><span class="xops-arrow">→</span>' +
            '<b>Hub to hub</b><span class="xops-arrow">→</span>' +
            '<b>Truck trackers</b><span class="xops-arrow">→</span>' +
            '<b>Local Christmas drops</b><span class="xops-arrow">→</span>' +
            '<b>Verified kids</b>' +
          '</div>' +

          '<div class="xops-tabs" role="tablist">' +
            '<button type="button" class="xops-tab is-on" data-tab="donate">Donations · size</button>' +
            '<button type="button" class="xops-tab" data-tab="elves">Live elf floor</button>' +
            '<button type="button" class="xops-tab" data-tab="hubs">Warehouses</button>' +
            '<button type="button" class="xops-tab" data-tab="trucks">Truck trackers</button>' +
            '<button type="button" class="xops-tab" data-tab="drops">Local drops</button>' +
          '</div>' +

          '<div class="xops-panel is-on" data-panel="donate">' +
            '<p class="xops-muted" style="margin-bottom:1rem">Pick a pack size. Choose a region. When funded, gifts ship through the warehouse network to verified partners — not random inboxes.</p>' +
            '<div class="xops-grid xops-grid-2" style="margin-bottom:1rem">' +
              '<div class="xops-card">' +
                '<h3>Where should this go?</h3>' +
                '<label class="xops-muted">Region / hub</label>' +
                '<select class="xops-select" id="xops-region">' +
                  HUBS.map(function (h) {
                    return '<option value="' + h.id + '">' + h.city + ' — ' + h.name + '</option>';
                  }).join('') +
                '</select>' +
                '<label class="xops-muted" style="display:block;margin-top:.75rem">Local drop focus</label>' +
                '<select class="xops-select" id="xops-drop">' +
                  DROP_SITES.map(function (d) {
                    return '<option value="' + d.id + '">' + d.city + ' — ' + d.name + '</option>';
                  }).join('') +
                '</select>' +
                '<p class="xops-muted" style="margin-top:.75rem" id="xops-donate-summary">Stocking Pack → Edmonton hub → local verified drop</p>' +
                '<button type="button" class="xops-cta" id="xops-sponsor-btn">Sponsor this route (when funded)</button>' +
              '</div>' +
              '<div class="xops-card">' +
                '<h3>Season clock</h3>' +
                '<p class="xops-muted">Christmas outbound window: <strong style="color:#fde68a">Nov 15 – Dec 23</strong> (design target)</p>' +
                '<p class="xops-muted" style="margin-top:.5rem">Peak packing nights stream live from the main hub. Holders watch elves build packs that match verified lists by age, size, and location.</p>' +
                '<p class="xops-muted" style="margin-top:.5rem">Linked programs: <a href="orphan-christmas.html" style="color:#6ee7b7">Orphan Christmas</a> · <a href="santa-s-workshop-live.html" style="color:#6ee7b7">Santa\'s Workshop Live</a></p>' +
              '</div>' +
            '</div>' +
            '<div class="xops-grid xops-grid-4">' + donationCards() + '</div>' +
          '</div>' +

          '<div class="xops-panel" data-panel="elves">' +
            '<div class="xops-grid xops-grid-2">' +
              '<div class="xops-card">' +
                '<div class="xops-live"><i></i> Warehouse floor · preview shift</div>' +
                '<h3 style="margin-top:.5rem">Live elf workshop</h3>' +
                '<p class="xops-muted" style="margin-bottom:.75rem">Workers on the floor: receiving, wish matching, wrap line, warm clothes, heart-check, load dock. When live, the stream sits here.</p>' +
                elfFloor() +
              '</div>' +
              '<div class="xops-card">' +
                '<h3>What elves are building right now</h3>' +
                '<p class="xops-muted">Shift board (illustrative until cameras &amp; ops go live)</p>' +
                '<ul class="xops-muted" style="margin:.75rem 0 0;padding-left:1.1rem;line-height:1.7">' +
                  '<li>Matching <strong style="color:#ecfdf5">Child Mercy Bags</strong> to Edmonton foster list ages 4–12</li>' +
                  '<li>Building <strong style="color:#ecfdf5">Sibling Crates</strong> so packs stay together</li>' +
                  '<li>Sealing <strong style="color:#ecfdf5">Floor Pallets</strong> for hub transfer to Calgary &amp; Toronto</li>' +
                  '<li>Tagging each box with partner code — never a public kid name</li>' +
                '</ul>' +
                '<p class="xops-muted" style="margin-top:1rem">Purpose: every quiet $hopeseed holding becomes hands packing hope on a real concrete floor.</p>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="xops-panel" data-panel="hubs">' +
            '<p class="xops-muted" style="margin-bottom:1rem">Main warehouse ships to sister warehouses. Sister warehouses fill regional trucks. Christmas season multiplies outbound runs.</p>' +
            '<div class="xops-grid xops-grid-3">' + hubCards() + '</div>' +
          '</div>' +

          '<div class="xops-panel" data-panel="trucks">' +
            mapHtml() +
            '<p class="xops-muted" style="margin-bottom:.75rem">Live trackers on trucks (preview). Each bar is a Christmas-season run: hub → hub or hub → local drop.</p>' +
            truckList() +
          '</div>' +

          '<div class="xops-panel" data-panel="drops">' +
            '<p class="xops-muted" style="margin-bottom:1rem">Local Christmas drops only serve <strong style="color:#ecfdf5">verified</strong> partners: orphans, foster, youth shelters, documented family hardship. No scammer wish lists.</p>' +
            '<div class="xops-grid xops-grid-2">' + dropList() + '</div>' +
          '</div>' +
        '</div>' +
      '</section>'
    );
  }

  function wire(root) {
    var tabs = root.querySelectorAll('.xops-tab');
    var panels = root.querySelectorAll('.xops-panel');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var id = tab.getAttribute('data-tab');
        tabs.forEach(function (t) { t.classList.toggle('is-on', t === tab); });
        panels.forEach(function (p) {
          p.classList.toggle('is-on', p.getAttribute('data-panel') === id);
        });
      });
    });

    var region = root.querySelector('#xops-region');
    var drop = root.querySelector('#xops-drop');
    var summary = root.querySelector('#xops-donate-summary');
    function refreshSummary() {
      if (!summary || !region || !drop) return;
      var h = hubById(region.value);
      var d = dropById(drop.value);
      summary.textContent = 'Child Mercy Bag → ' + h.city + ' hub → ' + d.name + ' (' + d.city + ')';
    }
    if (region) region.addEventListener('change', refreshSummary);
    if (drop) drop.addEventListener('change', refreshSummary);
    refreshSummary();

    var btn = root.querySelector('#xops-sponsor-btn');
    if (btn) {
      btn.addEventListener('click', function () {
        if (typeof window.sponsorProgram === 'function') {
          window.sponsorProgram('orphan-christmas-route');
        } else {
          alert('When funding rails are live, this sponsors a real warehouse → truck → local drop path for verified kids. Not live yet — truth first.');
        }
      });
    }

    // Animate truck progress slowly (preview motion)
    var tick = 0;
    setInterval(function () {
      tick++;
      TRUCKS.forEach(function (t, i) {
        // gentle oscillation so bars feel alive
        var wobble = Math.sin((tick + i * 3) / 12) * 0.008;
        var p = Math.min(0.98, Math.max(0.05, t.progress + wobble));
        var bar = root.querySelector('[data-truck="' + t.id + '"] [data-bar]');
        if (bar) bar.style.width = Math.round(p * 100) + '%';
        var a = MAP_POS[t.from];
        var b = MAP_POS[t.toDrop || t.toHub];
        var dot = root.querySelector('[data-tid="' + t.id + '"]');
        if (dot && a && b) {
          var x = a.x + (b.x - a.x) * p;
          var y = a.y + (b.y - a.y) * p;
          dot.style.left = x + '%';
          dot.style.top = y + '%';
        }
      });
    }, 900);
  }

  function mount(program) {
    if (!program || (program.id !== 17 && program.id !== 25)) return;
    styles();
    var root = document.getElementById('program-page-root');
    if (!root) return;

    // Avoid duplicate sections if boot runs twice
    var existing = document.getElementById('christmas-ops');
    if (existing) existing.remove();

    var host = document.getElementById('program-stats');
    var section = document.createElement('div');
    section.innerHTML = buildHtml(program);
    var node = section.firstChild;
    if (host && host.parentNode) {
      host.parentNode.insertBefore(node, host);
    } else {
      root.appendChild(node);
    }
    wire(node);
  }

  window.SHHChristmasMercyOps = { mount: mount };

  // Auto-run when program page finishes
  function tryMount() {
    if (!window.SHHProgramPage || !window.SHHProgramPage.resolveProgram) {
      // Fallback: body data attribute
      var id = document.body && document.body.getAttribute('data-program-id');
      if (id === '17' || id === '25') {
        var list = window.programs || [];
        var p = list.find(function (x) { return String(x.id) === String(id); });
        if (p) mount(p);
      }
      return;
    }
    var prog = window.SHHProgramPage.resolveProgram();
    if (prog) mount(prog);
  }

  window.addEventListener('load', function () {
    setTimeout(tryMount, 80);
  });
})();
