/**
 * Orphan Christmas + Santa's Workshop Live operations layer.
 * Donations by size/location · live elf warehouse · hub shipping · truck trackers to local drops.
 * Preview design until partners/rails are live - labeled honestly.
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
 kids: '2-4 siblings',
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

 /** Christmas dinner sponsorship - low-income families, verified need */
 var DINNER_SPONSORS = [
 {
 id: 'turkey-full',
 name: 'Full Turkey Dinner',
 type: 'Everything included',
 feeds: 'Family of 4-6',
 includes: 'Turkey · stuffing · gravy · potatoes · veg · rolls · pie or dessert',
 how: 'Partner agency picks up or delivers · or store voucher for the full cart',
 icon: '🦃'
 },
 {
 id: 'turkey-ham',
 name: 'Turkey or Ham Choice',
 type: 'Main + sides',
 feeds: 'Family of 4-8',
 includes: 'Turkey or ham · sides kit · gravy · rolls · dessert mix',
 how: 'Local grocery voucher covering a set meal list',
 icon: '🍖'
 },
 {
 id: 'grocery-voucher-150',
 name: 'Grocery Dinner Voucher',
 type: 'Store voucher',
 feeds: 'Family of 3-5',
 includes: 'Prepaid card / voucher at a local grocery for Christmas meal staples',
 how: 'Redeem at Superstore, Safeway, No Frills, Walmart, or partner store (region)',
 icon: '🛒'
 },
 {
 id: 'grocery-voucher-250',
 name: 'Full Table Voucher',
 type: 'Larger store voucher',
 feeds: 'Larger family or 2 small households',
 includes: 'Higher voucher for turkey + all trimmings + breakfast next morning',
 how: 'Verified families only · receipt trail when rails live',
 icon: '💳'
 },
 {
 id: 'hamper-box',
 name: 'Dinner Hamper Box',
 type: 'Pre-packed box',
 feeds: 'Family of 4',
 includes: 'Non-perishables + voucher slip for fresh turkey / produce',
 how: 'Warehouse packs dry goods · store voucher for the bird & fresh sides',
 icon: '📦'
 },
 {
 id: 'shelter-floor-dinners',
 name: 'Shelter Floor Feast',
 type: 'Group meal',
 feeds: 'Whole wing / floor',
 includes: 'Catered or bulk grocery for youth shelter / foster group Christmas dinner',
 how: 'Agency kitchen or local grocery catering voucher',
 icon: '🏠'
 }
 ];

 var GROCERY_PARTNERS = [
 { name: 'Local Superstore / Real Canadian Superstore', region: 'Canada' },
 { name: 'Safeway / Sobeys', region: 'Canada' },
 { name: 'No Frills / FreshCo', region: 'Canada' },
 { name: 'Walmart Grocery', region: 'Canada · USA' },
 { name: 'Save-On-Foods', region: 'West Canada' },
 { name: 'Regional independent grocer', region: 'Partner towns' }
 ];

 var DROP_SITES = [
    { id: 'd1', name: 'Hope House Youth Shelter', city: 'Edmonton, AB', type: 'Youth shelter', kids: 28, need: 'Verified' },
    { id: 'd2', name: 'Prairie Foster Collective', city: 'St. Albert, AB', type: 'Foster network', kids: 41, need: 'Verified' },
    { id: 'd3', name: 'Northside Family Crisis Home', city: 'Edmonton, AB', type: 'Family hardship', kids: 19, need: 'Documented' },
    { id: 'd4', name: 'Riverbend Children\'s Home', city: 'Calgary, AB', type: 'Orphan / residential', kids: 34, need: 'Verified' },
    { id: 'd5', name: 'Maple Kinship Circle', city: 'Red Deer, AB', type: 'Kinship care', kids: 16, need: 'Verified' },
    { id: 'd6', name: 'Pacific Youth Haven', city: 'Surrey, BC', type: 'Youth shelter', kids: 22, need: 'Verified' },
    { id: 'd7', name: 'GTA Second Chance House', city: 'Brampton, ON', type: 'Foster / shelter', kids: 37, need: 'Verified' },
    { id: 'd8', name: 'Cascadia Care House', city: 'Tacoma, WA', type: 'Youth shelter', kids: 15, need: 'Partner pending' },
    { id: 'd9', name: 'Fort McMurray Youth Haven', city: 'Fort McMurray, AB', type: 'Youth shelter', kids: 18, need: 'Verified' },
    { id: 'd10', name: 'Lethbridge Kinship Net', city: 'Lethbridge, AB', type: 'Kinship care', kids: 14, need: 'Verified' },
    { id: 'd11', name: 'Grande Prairie Care Home', city: 'Grande Prairie, AB', type: 'Residential', kids: 21, need: 'Documented' },
    { id: 'd12', name: 'Medicine Hat Family Bridge', city: 'Medicine Hat, AB', type: 'Family hardship', kids: 12, need: 'Verified' },
    { id: 'd13', name: 'Saskatoon Hope Lodge', city: 'Saskatoon, SK', type: 'Youth shelter', kids: 24, need: 'Verified' },
    { id: 'd14', name: 'Regina Foster Circle', city: 'Regina, SK', type: 'Foster network', kids: 29, need: 'Verified' },
    { id: 'd15', name: 'Winnipeg Children\'s Rest', city: 'Winnipeg, MB', type: 'Residential', kids: 33, need: 'Verified' },
    { id: 'd16', name: 'Vancouver East Youth', city: 'Vancouver, BC', type: 'Youth shelter', kids: 40, need: 'Verified' },
    { id: 'd17', name: 'Victoria Island Care', city: 'Victoria, BC', type: 'Youth shelter', kids: 16, need: 'Verified' },
    { id: 'd18', name: 'Kelowna Valley Foster', city: 'Kelowna, BC', type: 'Foster network', kids: 19, need: 'Documented' },
    { id: 'd19', name: 'Prince George North Home', city: 'Prince George, BC', type: 'Residential', kids: 15, need: 'Verified' },
    { id: 'd20', name: 'Ottawa Capital Youth', city: 'Ottawa, ON', type: 'Youth shelter', kids: 31, need: 'Verified' },
    { id: 'd21', name: 'Hamilton Steel City Care', city: 'Hamilton, ON', type: 'Foster / shelter', kids: 27, need: 'Verified' },
    { id: 'd22', name: 'London Thames Kids', city: 'London, ON', type: 'Family hardship', kids: 20, need: 'Documented' },
    { id: 'd23', name: 'Windsor Border Youth', city: 'Windsor, ON', type: 'Youth shelter', kids: 17, need: 'Verified' },
    { id: 'd24', name: 'Montreal Second Chance', city: 'Montreal, QC', type: 'Youth shelter', kids: 36, need: 'Verified' },
    { id: 'd25', name: 'Quebec City Family House', city: 'Quebec City, QC', type: 'Family hardship', kids: 22, need: 'Verified' },
    { id: 'd26', name: 'Halifax Harbour Youth', city: 'Halifax, NS', type: 'Youth shelter', kids: 19, need: 'Verified' },
    { id: 'd27', name: 'St. John\'s Atlantic Care', city: 'St. John\'s, NL', type: 'Residential', kids: 14, need: 'Documented' },
    { id: 'd28', name: 'Whitehorse North Youth', city: 'Whitehorse, YT', type: 'Youth shelter', kids: 11, need: 'Verified' },
    { id: 'd29', name: 'Yellowknife Arctic Care', city: 'Yellowknife, NT', type: 'Residential', kids: 9, need: 'Partner pending' },
    { id: 'd30', name: 'Seattle Rain City Youth', city: 'Seattle, WA', type: 'Youth shelter', kids: 38, need: 'Verified' },
    { id: 'd31', name: 'Portland Rose Foster', city: 'Portland, OR', type: 'Foster network', kids: 26, need: 'Verified' },
    { id: 'd32', name: 'Los Angeles Valley Care', city: 'Los Angeles, CA', type: 'Youth shelter', kids: 55, need: 'Verified' },
    { id: 'd33', name: 'San Francisco Bay Youth', city: 'San Francisco, CA', type: 'Youth shelter', kids: 29, need: 'Documented' },
    { id: 'd34', name: 'Phoenix Desert Kids', city: 'Phoenix, AZ', type: 'Family hardship', kids: 34, need: 'Verified' },
    { id: 'd35', name: 'Denver Mile High Care', city: 'Denver, CO', type: 'Residential', kids: 25, need: 'Verified' },
    { id: 'd36', name: 'Chicago Lakeshore Youth', city: 'Chicago, IL', type: 'Youth shelter', kids: 48, need: 'Verified' },
    { id: 'd37', name: 'Detroit Motor City Care', city: 'Detroit, MI', type: 'Foster / shelter', kids: 32, need: 'Verified' },
    { id: 'd38', name: 'New York Five Borough Youth', city: 'New York, NY', type: 'Youth shelter', kids: 62, need: 'Verified' },
    { id: 'd39', name: 'Boston Harbor Kids', city: 'Boston, MA', type: 'Residential', kids: 23, need: 'Documented' },
    { id: 'd40', name: 'Miami Bay Care', city: 'Miami, FL', type: 'Youth shelter', kids: 35, need: 'Verified' },
    { id: 'd41', name: 'Houston Gulf Youth', city: 'Houston, TX', type: 'Youth shelter', kids: 44, need: 'Verified' },
    { id: 'd42', name: 'Dallas Plains Foster', city: 'Dallas, TX', type: 'Foster network', kids: 30, need: 'Verified' },
    { id: 'd43', name: 'Atlanta Peach Care', city: 'Atlanta, GA', type: 'Family hardship', kids: 28, need: 'Documented' },
    { id: 'd44', name: 'Minneapolis North Star', city: 'Minneapolis, MN', type: 'Youth shelter', kids: 21, need: 'Verified' },
    { id: 'd45', name: 'Anchorage Frontier Youth', city: 'Anchorage, AK', type: 'Youth shelter', kids: 13, need: 'Partner pending' },
    { id: 'd46', name: 'Brooklyn Safe Harbor', city: 'Brooklyn, NY', type: 'Youth shelter', kids: 41, need: 'Verified' },
    { id: 'd47', name: 'Queens Kinship Net', city: 'Queens, NY', type: 'Kinship care', kids: 27, need: 'Verified' },
    { id: 'd48', name: 'Oakland East Bay Care', city: 'Oakland, CA', type: 'Youth shelter', kids: 33, need: 'Documented' },
    { id: 'd49', name: 'Tucson Desert Family', city: 'Tucson, AZ', type: 'Family hardship', kids: 18, need: 'Verified' },
    { id: 'd50', name: 'Spokane Inland Youth', city: 'Spokane, WA', type: 'Youth shelter', kids: 16, need: 'Verified' }
  ];

  /** Big scrollable directory: country, province, state, city, town, shelter */
  var LOCATION_DIR = (function () {
    var rows = [];
    function add(type, name, region, country, extra) {
      rows.push({
        id: 'loc-' + rows.length,
        type: type,
        name: name,
        region: region || '',
        country: country || '',
        label: [name, region, country].filter(Boolean).join(', '),
        extra: extra || '',
        search: [type, name, region, country, extra || ''].join(' ').toLowerCase()
      });
    }
    ['Canada', 'United States', 'Mexico', 'United Kingdom', 'Ireland', 'Australia', 'New Zealand', 'Philippines', 'India', 'Nigeria', 'Kenya', 'South Africa', 'Brazil', 'Germany', 'France', 'Ukraine', 'Japan', 'South Korea'].forEach(function (c) {
      add('country', c, '', c);
    });
    [
      ['Alberta', 'AB'], ['British Columbia', 'BC'], ['Manitoba', 'MB'], ['New Brunswick', 'NB'],
      ['Newfoundland and Labrador', 'NL'], ['Northwest Territories', 'NT'], ['Nova Scotia', 'NS'],
      ['Nunavut', 'NU'], ['Ontario', 'ON'], ['Prince Edward Island', 'PE'], ['Quebec', 'QC'],
      ['Saskatchewan', 'SK'], ['Yukon', 'YT']
    ].forEach(function (p) { add('province', p[0], p[1], 'Canada'); });
    var usNames = {
      AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California', CO: 'Colorado', CT: 'Connecticut',
      DE: 'Delaware', FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
      KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan',
      MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire',
      NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma',
      OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota', TN: 'Tennessee',
      TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin',
      WY: 'Wyoming', DC: 'District of Columbia'
    };
    Object.keys(usNames).forEach(function (code) { add('state', usNames[code], code, 'United States'); });
    var cities = [
      ['Edmonton','AB','Canada','city'],['Calgary','AB','Canada','city'],['Red Deer','AB','Canada','city'],
      ['Lethbridge','AB','Canada','city'],['Medicine Hat','AB','Canada','city'],['Grande Prairie','AB','Canada','city'],
      ['Fort McMurray','AB','Canada','city'],['St. Albert','AB','Canada','city'],['Sherwood Park','AB','Canada','town'],
      ['Spruce Grove','AB','Canada','town'],['Leduc','AB','Canada','town'],['Airdrie','AB','Canada','city'],
      ['Okotoks','AB','Canada','town'],['Canmore','AB','Canada','town'],['Banff','AB','Canada','town'],
      ['Jasper','AB','Canada','town'],['Cold Lake','AB','Canada','city'],['Brooks','AB','Canada','town'],
      ['Camrose','AB','Canada','city'],['Wetaskiwin','AB','Canada','city'],['Hinton','AB','Canada','town'],
      ['Whitecourt','AB','Canada','town'],['Peace River','AB','Canada','town'],['High Level','AB','Canada','town'],
      ['Beaumont','AB','Canada','town'],['Fort Saskatchewan','AB','Canada','city'],['Devon','AB','Canada','town'],
      ['Morinville','AB','Canada','town'],['Stony Plain','AB','Canada','town'],['Cochrane','AB','Canada','town'],
      ['Vancouver','BC','Canada','city'],['Surrey','BC','Canada','city'],['Burnaby','BC','Canada','city'],
      ['Richmond','BC','Canada','city'],['Victoria','BC','Canada','city'],['Kelowna','BC','Canada','city'],
      ['Kamloops','BC','Canada','city'],['Prince George','BC','Canada','city'],['Nanaimo','BC','Canada','city'],
      ['Abbotsford','BC','Canada','city'],['Chilliwack','BC','Canada','city'],['Vernon','BC','Canada','city'],
      ['Toronto','ON','Canada','city'],['Ottawa','ON','Canada','city'],['Mississauga','ON','Canada','city'],
      ['Brampton','ON','Canada','city'],['Hamilton','ON','Canada','city'],['London','ON','Canada','city'],
      ['Windsor','ON','Canada','city'],['Kitchener','ON','Canada','city'],['Markham','ON','Canada','city'],
      ['Vaughan','ON','Canada','city'],['Thunder Bay','ON','Canada','city'],['Sudbury','ON','Canada','city'],
      ['Kingston','ON','Canada','city'],['Barrie','ON','Canada','city'],['Guelph','ON','Canada','city'],
      ['Montreal','QC','Canada','city'],['Quebec City','QC','Canada','city'],['Laval','QC','Canada','city'],
      ['Gatineau','QC','Canada','city'],['Sherbrooke','QC','Canada','city'],['Trois-Rivieres','QC','Canada','city'],
      ['Winnipeg','MB','Canada','city'],['Brandon','MB','Canada','city'],['Saskatoon','SK','Canada','city'],
      ['Regina','SK','Canada','city'],['Prince Albert','SK','Canada','city'],['Moose Jaw','SK','Canada','city'],
      ['Halifax','NS','Canada','city'],['Dartmouth','NS','Canada','city'],['Sydney','NS','Canada','city'],
      ['Moncton','NB','Canada','city'],['Saint John','NB','Canada','city'],['Fredericton','NB','Canada','city'],
      ['Charlottetown','PE','Canada','city'],["St. John's",'NL','Canada','city'],['Corner Brook','NL','Canada','city'],
      ['Whitehorse','YT','Canada','city'],['Yellowknife','NT','Canada','city'],['Iqaluit','NU','Canada','city'],
      ['Seattle','WA','United States','city'],['Spokane','WA','United States','city'],['Tacoma','WA','United States','city'],
      ['Portland','OR','United States','city'],['Eugene','OR','United States','city'],['Boise','ID','United States','city'],
      ['Los Angeles','CA','United States','city'],['San Francisco','CA','United States','city'],['San Diego','CA','United States','city'],
      ['Sacramento','CA','United States','city'],['San Jose','CA','United States','city'],['Fresno','CA','United States','city'],
      ['Oakland','CA','United States','city'],['Phoenix','AZ','United States','city'],['Tucson','AZ','United States','city'],
      ['Las Vegas','NV','United States','city'],['Denver','CO','United States','city'],['Colorado Springs','CO','United States','city'],
      ['Salt Lake City','UT','United States','city'],['Albuquerque','NM','United States','city'],['El Paso','TX','United States','city'],
      ['Houston','TX','United States','city'],['Dallas','TX','United States','city'],['Austin','TX','United States','city'],
      ['San Antonio','TX','United States','city'],['Chicago','IL','United States','city'],['Detroit','MI','United States','city'],
      ['Minneapolis','MN','United States','city'],['Milwaukee','WI','United States','city'],['Indianapolis','IN','United States','city'],
      ['Columbus','OH','United States','city'],['Cleveland','OH','United States','city'],['Pittsburgh','PA','United States','city'],
      ['Philadelphia','PA','United States','city'],['New York','NY','United States','city'],['Buffalo','NY','United States','city'],
      ['Brooklyn','NY','United States','city'],['Queens','NY','United States','city'],['Boston','MA','United States','city'],
      ['Hartford','CT','United States','city'],['Providence','RI','United States','city'],['Baltimore','MD','United States','city'],
      ['Washington','DC','United States','city'],['Richmond','VA','United States','city'],['Charlotte','NC','United States','city'],
      ['Raleigh','NC','United States','city'],['Atlanta','GA','United States','city'],['Miami','FL','United States','city'],
      ['Orlando','FL','United States','city'],['Tampa','FL','United States','city'],['Jacksonville','FL','United States','city'],
      ['New Orleans','LA','United States','city'],['Nashville','TN','United States','city'],['Memphis','TN','United States','city'],
      ['Kansas City','MO','United States','city'],['St. Louis','MO','United States','city'],['Oklahoma City','OK','United States','city'],
      ['Omaha','NE','United States','city'],['Des Moines','IA','United States','city'],['Anchorage','AK','United States','city'],
      ['Honolulu','HI','United States','city'],['Billings','MT','United States','city'],['Fargo','ND','United States','city']
    ];
    cities.forEach(function (c) { add(c[3], c[0], c[1], c[2]); });
    DROP_SITES.forEach(function (d) {
      var isCa = /, (AB|BC|ON|QC|SK|MB|NS|NB|NL|PE|YT|NT|NU)\b/.test(d.city);
      add('shelter', d.name, d.city, isCa ? 'Canada' : 'United States', d.type + ' · ' + d.need);
    });
    return rows;
  })();

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
 { name: 'Wrap Line', work: 'Many paper styles · ribbons · prayer tags', workers: 12 },
 { name: 'Warm Layer', work: 'Coats · socks · winter kits', workers: 8 },
 { name: 'Quality Heart Check', work: 'No empty boxes · no wrong ages', workers: 5 },
 { name: 'Load Dock', work: 'Pallets sealed · trucks scanned out', workers: 7 }
 ];

 /**
 * Wrapping paper catalog - filter by cat:
 * classic | elegant | kids | holy | shiba | hopeseed | nibbles | funny | loving
 */
 var WRAP_PAPERS = [
 // - Classic - { id: 'holly-classic', cat: 'classic', name: 'Holly Classic', vibe: 'Red & green holly', mood: 'Classic', bg: 'repeating-linear-gradient(45deg,#8b1a2b 0 8px,#0d5c3d 8px 16px),radial-gradient(circle at 20% 30%,#e8c547 0 3px,transparent 4px)' },
 { id: 'candy-cane', cat: 'classic', name: 'Candy Cane Stripe', vibe: 'Red & white diagonals', mood: 'Classic', bg: 'repeating-linear-gradient(-45deg,#c41e3a 0 12px,#fff8ee 12px 24px)' },
 { id: 'pine-forest', cat: 'classic', name: 'Pine Forest', vibe: 'Trees on cream', mood: 'Classic', bg: 'repeating-linear-gradient(0deg,transparent 0 18px,rgba(13,92,61,.35) 18px 19px),repeating-linear-gradient(90deg,transparent 0 22px,rgba(13,92,61,.25) 22px 23px),#f5f0e6' },
 { id: 'plaid-cabin', cat: 'classic', name: 'Cabin Plaid', vibe: 'Buffalo plaid', mood: 'Classic', bg: 'repeating-linear-gradient(0deg,#5c0a12 0 10px,#0d3d28 10px 20px),repeating-linear-gradient(90deg,rgba(232,197,71,.4) 0 2px,transparent 2px 20px)' },
 { id: 'reindeer-red', cat: 'classic', name: 'Reindeer Parade', vibe: 'Crimson gold dots', mood: 'Classic', bg: 'radial-gradient(circle at 30% 40%,#e8c547 0 4px,transparent 5px),radial-gradient(circle at 70% 70%,#fde68a 0 3px,transparent 4px),#9b1b2e' },
 { id: 'poinsetta-bloom', cat: 'classic', name: 'Poinsettia Bloom', vibe: 'Red on green leaf', mood: 'Classic', bg: 'radial-gradient(circle at 30% 40%,#c41e3a 0 12px,transparent 13px),radial-gradient(circle at 70% 60%,#9b1b2e 0 10px,transparent 11px),#14532d' },
 { id: 'snowflake-blue', cat: 'classic', name: 'Snowflake Blue', vibe: 'Icy flakes', mood: 'Classic', bg: 'radial-gradient(circle at 25% 25%,#93c5fd 0 2px,transparent 3px),radial-gradient(circle at 75% 60%,#bfdbfe 0 3px,transparent 4px),#eff6ff' },
 { id: 'maple-canada', cat: 'classic', name: 'Maple North', vibe: 'Canada home', mood: 'Classic', bg: 'radial-gradient(circle at 50% 45%,#c41e3a 0 14px,transparent 15px),#fff8ee' },
 // - Elegant / classy - { id: 'velvet-burgundy', cat: 'elegant', name: 'Velvet Burgundy', vibe: 'Wine & gold edge', mood: 'Elegant', bg: 'linear-gradient(145deg,#4a0e18,#6b1525 40%,#2a0810),repeating-linear-gradient(90deg,transparent 0 28px,rgba(232,197,71,.35) 28px 29px)' },
 { id: 'matte-black-gold', cat: 'elegant', name: 'Matte Black Gold', vibe: 'Foil line luxury', mood: 'Elegant', bg: 'repeating-linear-gradient(90deg,transparent 0 16px,rgba(232,197,71,.5) 16px 17px),#0a0a0a' },
 { id: 'silver-bells', cat: 'elegant', name: 'Silver Bells', vibe: 'Silver on charcoal', mood: 'Elegant', bg: 'radial-gradient(circle at 40% 30%,#e5e7eb 0 3px,transparent 4px),#1f2937' },
 { id: 'champagne-silk', cat: 'elegant', name: 'Champagne Silk', vibe: 'Soft gold champagne', mood: 'Classy', bg: 'linear-gradient(135deg,#f5e6c8,#e8d5a3 40%,#d4af37 70%,#f5e6c8)' },
 { id: 'pearl-marble', cat: 'elegant', name: 'Pearl Marble', vibe: 'White marble veins', mood: 'Classy', bg: 'linear-gradient(120deg,#fafafa 0%,#e5e5e5 25%,#fff 50%,#d4d4d4 75%,#fafafa)' },
 { id: 'emerald-foil', cat: 'elegant', name: 'Emerald Foil', vibe: 'Deep emerald gold trim', mood: 'Elegant', bg: 'linear-gradient(160deg,#064e3b,#0d5c3d 50%,#022c22),repeating-linear-gradient(45deg,transparent 0 20px,rgba(232,197,71,.3) 20px 21px)' },
 { id: 'navy-tuxedo', cat: 'elegant', name: 'Navy Tuxedo', vibe: 'Midnight blue satin', mood: 'Classy', bg: 'linear-gradient(160deg,#0c1220,#1e3a5f 45%,#0a1628)' },
 { id: 'rose-gold-dust', cat: 'elegant', name: 'Rose Gold Dust', vibe: 'Blush metal flecks', mood: 'Elegant', bg: 'radial-gradient(circle at 20% 30%,#f9a8d4 0 2px,transparent 3px),radial-gradient(circle at 70% 60%,#fda4af 0 2px,transparent 3px),linear-gradient(145deg,#4c0519,#881337)' },
 { id: 'ivory-lace', cat: 'elegant', name: 'Ivory Lace', vibe: 'Cream lace grid', mood: 'Classy', bg: 'repeating-linear-gradient(0deg,transparent 0 8px,rgba(180,150,100,.2) 8px 9px),repeating-linear-gradient(90deg,transparent 0 8px,rgba(180,150,100,.2) 8px 9px),#faf6eb' },
 // - Kids - { id: 'kids-crayon', cat: 'kids', name: 'Kids Crayon Joy', vibe: 'Bright scribble stripes', mood: 'Kids', bg: 'repeating-linear-gradient(15deg,#f87171 0 8px,#fbbf24 8px 16px,#34d399 16px 24px,#60a5fa 24px 32px,#c084fc 32px 40px)' },
 { id: 'rainbow-hope', cat: 'kids', name: 'Rainbow Hope', vibe: 'Soft rainbow wash', mood: 'Kids', bg: 'linear-gradient(90deg,#fecaca,#fde68a,#bbf7d0,#bfdbfe,#e9d5ff,#fecaca)' },
 { id: 'dino-dots', cat: 'kids', name: 'Dino Dots', vibe: 'Lime & purple dots', mood: 'Kids', bg: 'radial-gradient(circle at 25% 30%,#a3e635 0 8px,transparent 9px),radial-gradient(circle at 70% 60%,#c084fc 0 10px,transparent 11px),#1e1b4b' },
 { id: 'space-rockets', cat: 'kids', name: 'Space Rockets', vibe: 'Stars on deep space', mood: 'Kids', bg: 'radial-gradient(circle at 20% 20%,#fff 0 2px,transparent 3px),radial-gradient(circle at 60% 40%,#fde68a 0 1.5px,transparent 2px),radial-gradient(circle at 80% 70%,#93c5fd 0 2px,transparent 3px),#0f172a' },
 { id: 'unicorn-cloud', cat: 'kids', name: 'Unicorn Cloud', vibe: 'Pastel pink purple', mood: 'Kids', bg: 'linear-gradient(135deg,#fce7f3,#e9d5ff 40%,#dbeafe 70%,#fce7f3)' },
 { id: 'soccer-pitch', cat: 'kids', name: 'Soccer Pitch', vibe: 'Green field lines', mood: 'Kids', bg: 'repeating-linear-gradient(0deg,transparent 0 20px,rgba(255,255,255,.25) 20px 21px),#15803d' },
 { id: 'building-blocks', cat: 'kids', name: 'Building Blocks', vibe: 'Primary color blocks', mood: 'Kids', bg: 'repeating-linear-gradient(0deg,#ef4444 0 20px,#3b82f6 20px 40px,#fbbf24 40px 60px,#22c55e 60px 80px)' },
 { id: 'polka-party', cat: 'kids', name: 'Polka Party', vibe: 'Big happy polka dots', mood: 'Kids', bg: 'radial-gradient(circle at 20% 30%,#f472b6 0 10px,transparent 11px),radial-gradient(circle at 60% 50%,#38bdf8 0 12px,transparent 13px),radial-gradient(circle at 80% 20%,#facc15 0 9px,transparent 10px),#fef3c7' },
 { id: 'ice-mint', cat: 'kids', name: 'Ice Mint', vibe: 'Mint chevron', mood: 'Kids', bg: 'repeating-linear-gradient(135deg,#ecfdf5 0 12px,#a7f3d0 12px 24px,#6ee7b7 24px 28px,#ecfdf5 28px 40px)' },
 // - Holy / Jesus - { id: 'nativity-gold', cat: 'holy', name: 'Nativity Gold', vibe: 'Star of Bethlehem glow', mood: 'Holy', bg: 'radial-gradient(ellipse at 50% 40%,rgba(232,197,71,.55),transparent 55%),linear-gradient(160deg,#fff8ee,#e8d5a3 60%,#c4a35a)' },
 { id: 'scripture-cream', cat: 'holy', name: 'Peace on Earth', vibe: 'Cream gold lines', mood: 'Holy', bg: 'repeating-linear-gradient(0deg,transparent 0 22px,rgba(232,197,71,.25) 22px 23px),#faf6eb' },
 { id: 'angel-white', cat: 'holy', name: 'Angel White', vibe: 'Pearl heavenly', mood: 'Holy', bg: 'linear-gradient(145deg,#ffffff,#f1f5f9 40%,#e2e8f0 70%,#f8fafc)' },
 { id: 'cross-light', cat: 'holy', name: 'Cross of Light', vibe: 'Soft cross on deep blue', mood: 'Jesus', bg: 'linear-gradient(90deg,transparent 46%,rgba(253,230,138,.7) 46% 54%,transparent 54%),linear-gradient(0deg,transparent 46%,rgba(253,230,138,.7) 46% 54%,transparent 54%),#0c1a3a' },
 { id: 'manger-straw', cat: 'holy', name: 'Manger Straw', vibe: 'Warm straw gold', mood: 'Jesus', bg: 'repeating-linear-gradient(85deg,#c4a35a 0 3px,#e8d5a3 3px 6px,#a67c52 6px 8px)' },
 { id: 'shepherd-night', cat: 'holy', name: 'Shepherd Night', vibe: 'Stars over quiet field', mood: 'Holy', bg: 'radial-gradient(circle at 30% 20%,#fde68a 0 2px,transparent 3px),radial-gradient(circle at 70% 35%,#fff 0 1.5px,transparent 2px),linear-gradient(180deg,#0c1220 0 55%,#14532d 55%)' },
 { id: 'lamb-gentle', cat: 'holy', name: 'Gentle Lamb', vibe: 'Soft wool white', mood: 'Holy', bg: 'radial-gradient(circle at 40% 40%,#f8fafc 0 20%,transparent 50%),#e2e8f0' },
 { id: 'kingdom-purple', cat: 'holy', name: 'Kingdom Purple', vibe: 'Royal purple gold', mood: 'Jesus', bg: 'linear-gradient(145deg,#3b0764,#5b21b6 50%,#1e1b4b),repeating-linear-gradient(90deg,transparent 0 24px,rgba(232,197,71,.4) 24px 25px)' },
 { id: 'amen-green', cat: 'holy', name: 'Amen Evergreen', vibe: 'Church pine gold', mood: 'Holy', bg: 'linear-gradient(160deg,#052e16,#14532d),radial-gradient(circle at 50% 30%,rgba(232,197,71,.4),transparent 40%)' },
 // - Shiba / hopeseed / NIBBLES / treat / bone / leash - { id: 'shiba-orange', cat: 'shiba', name: 'Shiba Sunrise', vibe: 'Warm shiba orange cream', mood: 'Shiba', bg: 'linear-gradient(135deg,#fb923c,#fdba74 40%,#fff7ed 70%,#ea580c)' },
 { id: 'shiba-paw', cat: 'shiba', name: 'Paw Print Trail', vibe: 'Paw dots on cream', mood: 'Shiba', bg: 'radial-gradient(circle at 20% 30%,#78350f 0 6px,transparent 7px),radial-gradient(circle at 22% 22%,#78350f 0 3px,transparent 4px),radial-gradient(circle at 28% 22%,#78350f 0 3px,transparent 4px),radial-gradient(circle at 60% 70%,#78350f 0 6px,transparent 7px),#fef3c7' },
 { id: 'shiba-fluffy', cat: 'shiba', name: 'Fluffy Cloud Shiba', vibe: 'Cream fluff bands', mood: 'Shiba', bg: 'repeating-linear-gradient(0deg,#fff7ed 0 12px,#fed7aa 12px 14px,#ffedd5 14px 26px)' },
 { id: 'hopeseed-emerald', cat: 'hopeseed', name: '$hopeseed Emerald', vibe: 'Hope green seed glow', mood: 'hopeseed', bg: 'radial-gradient(circle at 50% 50%,#6ee7b7 0 20%,transparent 50%),linear-gradient(160deg,#022c22,#065f46 50%,#10b981)' },
 { id: 'hopeseed-sprout', cat: 'hopeseed', name: 'Sprout Rows', vibe: 'Tiny seed rows', mood: 'hopeseed', bg: 'repeating-linear-gradient(0deg,transparent 0 14px,rgba(16,185,129,.35) 14px 15px),repeating-linear-gradient(90deg,transparent 0 10px,rgba(52,211,153,.25) 10px 11px),#ecfdf5' },
 { id: 'hopeseed-heart', cat: 'hopeseed', name: 'Seed of Hope', vibe: 'Teal heart field', mood: 'hopeseed', bg: 'radial-gradient(circle at 40% 45%,#34d399 0 12px,transparent 13px),radial-gradient(circle at 55% 45%,#34d399 0 12px,transparent 13px),#042f2e' },
 { id: 'nibbles-amber', cat: 'nibbles', name: '$NIBBLES Amber', vibe: 'Mercy gold amber', mood: 'NIBBLES', bg: 'linear-gradient(135deg,#78350f,#f59e0b 40%,#fde68a 70%,#b45309)' },
 { id: 'nibbles-coin', cat: 'nibbles', name: 'Mercy Coin', vibe: 'Coin circles on dark', mood: 'NIBBLES', bg: 'radial-gradient(circle at 30% 40%,#fbbf24 0 14px,transparent 15px),radial-gradient(circle at 70% 65%,#f59e0b 0 12px,transparent 13px),#1c1917' },
 { id: 'treat-biscuit', cat: 'nibbles', name: 'Treat Biscuit', vibe: 'Dog treat tan dots', mood: 'Treat', bg: 'radial-gradient(circle at 25% 35%,#d6a35c 0 10px,transparent 11px),radial-gradient(circle at 65% 55%,#c4894a 0 9px,transparent 10px),#f5e6c8' },
 { id: 'bone-white', cat: 'nibbles', name: 'Bone Yard', vibe: 'Bone shapes on blue', mood: 'Bone', bg: 'radial-gradient(ellipse at 30% 40%,#f8fafc 0 8px 18px,transparent 19px),radial-gradient(ellipse at 70% 60%,#e2e8f0 0 7px 16px,transparent 17px),#1e3a5f' },
 { id: 'leash-stripe', cat: 'shiba', name: 'Leash Stripe', vibe: 'Red leash webbing', mood: 'Leash', bg: 'repeating-linear-gradient(90deg,#991b1b 0 8px,#fef2f2 8px 12px,#7f1d1d 12px 20px)' },
 { id: 'collar-tags', cat: 'shiba', name: 'Collar Tags', vibe: 'Metal tag glints', mood: 'Shiba', bg: 'radial-gradient(circle at 40% 50%,#d4d4d8 0 8px,transparent 9px),radial-gradient(circle at 55% 50%,#a1a1aa 0 6px,transparent 7px),#27272a' },
 { id: 'dual-flywheel', cat: 'hopeseed', name: '2 Flywheels 1 Mission', vibe: 'Amber + emerald split', mood: 'SHH', bg: 'linear-gradient(90deg,#f59e0b 0 50%,#10b981 50%)' },
 { id: 'shibarium-chain', cat: 'nibbles', name: 'Shibarium Chain', vibe: 'Link pattern night', mood: 'Chain', bg: 'repeating-linear-gradient(45deg,transparent 0 12px,rgba(251,191,36,.3) 12px 14px),repeating-linear-gradient(-45deg,transparent 0 12px,rgba(52,211,153,.25) 12px 14px),#0a0f1c' },
 // - Funny - { id: 'ugly-sweater', cat: 'funny', name: 'Ugly Sweater', vibe: 'Chaotic holiday knit', mood: 'Funny', bg: 'repeating-linear-gradient(0deg,#166534 0 6px,#dc2626 6px 12px,#fbbf24 12px 14px,#166534 14px 20px),repeating-linear-gradient(90deg,transparent 0 10px,rgba(0,0,0,.15) 10px 11px)' },
 { id: 'grumpy-cat', cat: 'funny', name: 'Grumpy Holiday', vibe: 'Grey scowl vibes', mood: 'Funny', bg: 'linear-gradient(160deg,#52525b,#a1a1aa 40%,#3f3f46)' },
 { id: 'banana-for-scale', cat: 'funny', name: 'Banana for Scale', vibe: 'Yellow banana party', mood: 'Funny', bg: 'repeating-linear-gradient(25deg,#fde047 0 16px,#facc15 16px 20px,#eab308 20px 36px)' },
 { id: 'socks-again', cat: 'funny', name: 'Socks… Again?!', vibe: 'Argyle sock pattern', mood: 'Funny', bg: 'repeating-linear-gradient(60deg,#1e3a5f 0 12px,#c41e3a 12px 24px,#f8fafc 24px 28px)' },
 { id: 'coal-spark', cat: 'funny', name: 'Nice List… Maybe', vibe: 'Ember coal joke', mood: 'Funny', bg: 'radial-gradient(circle at 20% 50%,#f59e0b 0 2px,transparent 3px),radial-gradient(circle at 60% 20%,#ef4444 0 1.5px,transparent 2px),#18181b' },
 { id: 'dad-joke-stripe', cat: 'funny', name: 'Dad Joke Stripe', vibe: 'Loud neon stripes', mood: 'Funny', bg: 'repeating-linear-gradient(90deg,#22d3ee 0 10px,#f472b6 10px 20px,#a3e635 20px 30px)' },
 { id: 'pickle-rickmas', cat: 'funny', name: 'Pickle Rickmas', vibe: 'Green pickle chaos', mood: 'Funny', bg: 'repeating-linear-gradient(40deg,#166534 0 8px,#4d7c0f 8px 12px,#a3e635 12px 16px)' },
 { id: 'error-404-gift', cat: 'funny', name: '404 Gift Not Found', vibe: 'Terminal green on black', mood: 'Funny', bg: 'repeating-linear-gradient(0deg,transparent 0 14px,rgba(34,197,94,.4) 14px 15px),#052e16' },
 // - Loving - { id: 'hearts-everywhere', cat: 'loving', name: 'Hearts Everywhere', vibe: 'Soft pink hearts', mood: 'Loving', bg: 'radial-gradient(circle at 25% 35%,#f472b6 0 8px,transparent 9px),radial-gradient(circle at 65% 55%,#fb7185 0 7px,transparent 8px),#fff1f2' },
 { id: 'you-are-loved', cat: 'loving', name: 'You Are Loved', vibe: 'Warm rose gold wash', mood: 'Loving', bg: 'linear-gradient(135deg,#fecdd3,#fda4af 40%,#fb7185 70%,#fff1f2)' },
 { id: 'hug-in-a-box', cat: 'loving', name: 'Hug in a Box', vibe: 'Soft coral stripes', mood: 'Loving', bg: 'repeating-linear-gradient(90deg,#fb7185 0 10px,#fecdd3 10px 20px)' },
 { id: 'family-forever', cat: 'loving', name: 'Family Forever', vibe: 'Linked ring gold', mood: 'Loving', bg: 'radial-gradient(circle at 40% 50%,transparent 0 10px,#e8c547 10px 12px,transparent 13px),radial-gradient(circle at 55% 50%,transparent 0 10px,#e8c547 10px 12px,transparent 13px),#1c1917' },
 { id: 'quiet-kindness', cat: 'loving', name: 'Quiet Kindness', vibe: 'Soft lavender peace', mood: 'Loving', bg: 'linear-gradient(160deg,#f5f3ff,#ddd6fe 50%,#c4b5fd)' },
 { id: 'handwritten-love', cat: 'loving', name: 'Handwritten Love', vibe: 'Notebook lines cream', mood: 'Loving', bg: 'repeating-linear-gradient(0deg,transparent 0 22px,rgba(196,30,58,.2) 22px 23px),#fffbeb' },
 { id: 'forever-home', cat: 'loving', name: 'Forever Home', vibe: 'House-warm amber', mood: 'Loving', bg: 'linear-gradient(180deg,#fef3c7 0 60%,#b45309 60%)' },
 { id: 'kraft-twine', cat: 'loving', name: 'Kraft & Twine', vibe: 'Handmade care', mood: 'Loving', bg: 'repeating-linear-gradient(90deg,transparent 0 40px,rgba(120,80,40,.15) 40px 41px),linear-gradient(135deg,#c4a574,#a67c52 50%,#8b6914)' },
 { id: 'linen-sage', cat: 'loving', name: 'Linen Sage', vibe: 'Gentle fabric', mood: 'Loving', bg: 'repeating-linear-gradient(0deg,rgba(255,255,255,.08) 0 1px,transparent 1px 4px),#9caf88' },
 { id: 'gold-starfield', cat: 'loving', name: 'Wish Upon Stars', vibe: 'Gold stars night', mood: 'Loving', bg: 'radial-gradient(circle at 15% 20%,#e8c547 0 2px,transparent 3px),radial-gradient(circle at 70% 40%,#fde68a 0 1.5px,transparent 2px),#0c1220' }
 ];

 var RIBBONS = [
 { id: 'none', name: 'No ribbon', color: 'transparent', preview: 'none' },
 { id: 'gold', name: 'Gold satin', color: '#e8c547', preview: 'gold' },
 { id: 'crimson', name: 'Crimson velvet', color: '#c41e3a', preview: 'red' },
 { id: 'emerald', name: 'Emerald hope', color: '#10b981', preview: 'green' },
 { id: 'amber-nibbles', name: 'Amber $NIBBLES', color: '#f59e0b', preview: 'amber' },
 { id: 'silver', name: 'Silver bells', color: '#d1d5db', preview: 'silver' },
 { id: 'rose', name: 'Rose loving', color: '#f472b6', preview: 'rose' },
 { id: 'navy', name: 'Navy classic', color: '#1e3a5f', preview: 'navy' },
 { id: 'twine', name: 'Natural twine', color: '#a67c52', preview: 'twine' },
 { id: 'rainbow', name: 'Rainbow joy', color: 'linear-gradient(90deg,#f87171,#fbbf24,#34d399,#60a5fa,#c084fc)', preview: 'rainbow' },
 { id: 'plaid-bow', name: 'Plaid bow', color: '#7f1d1d', preview: 'plaid' },
 { id: 'bone-tag', name: 'Bone charm ribbon', color: '#fef3c7', preview: 'bone' }
 ];

 var STOCKINGS = [
 { id: 'none', name: 'No stocking', emoji: '-' },
 { id: 'classic-red', name: 'Classic red', emoji: '🧦', color: '#c41e3a' },
 { id: 'forest-green', name: 'Forest green', emoji: '🧦', color: '#14532d' },
 { id: 'gold-trim', name: 'Gold trim cream', emoji: '🧦', color: '#faf6eb' },
 { id: 'shiba-paw', name: 'Shiba paw stocking', emoji: '🐾', color: '#fb923c' },
 { id: 'hopeseed-green', name: '$hopeseed green', emoji: '🌱', color: '#10b981' },
 { id: 'nibbles-amber', name: '$NIBBLES amber', emoji: '🦴', color: '#f59e0b' },
 { id: 'striped-candy', name: 'Candy stripe', emoji: '🍬', color: '#fff' },
 { id: 'holy-white', name: 'Holy white gold', emoji: '✝', color: '#f8fafc' },
 { id: 'funny-ugly', name: 'Ugly sweater sock', emoji: '🎄', color: '#166534' },
 { id: 'loving-heart', name: 'Heart cuff', emoji: '❤️', color: '#fb7185' },
 { id: 'plaid-cabin', name: 'Cabin plaid', emoji: '🏠', color: '#5c0a12' }
 ];

 var WRAP_CATS = [
 { id: 'all', label: 'All styles' },
 { id: 'classic', label: 'Classic' },
 { id: 'elegant', label: 'Classy · elegant' },
 { id: 'kids', label: 'Kids' },
 { id: 'holy', label: 'Jesus · holy' },
 { id: 'shiba', label: 'Shiba · leash' },
 { id: 'hopeseed', label: '$hopeseed' },
 { id: 'nibbles', label: '$NIBBLES · bone · treat' },
 { id: 'funny', label: 'Funny' },
 { id: 'loving', label: 'Loving' }
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
 ' radial-gradient(circle at 20% 30%,rgba(196,30,58,.2),transparent 35%),',
 ' radial-gradient(circle at 70% 55%,rgba(52,211,153,.18),transparent 40%),',
 ' linear-gradient(180deg,#0c1220,#0a1f18);overflow:hidden;margin-bottom:1rem}',
 '.xops-node{position:absolute;transform:translate(-50%,-50%);text-align:center}',
 '.xops-dot{width:12px;height:12px;border-radius:50%;margin:0 auto 4px;box-shadow:0 0 12px currentColor}',
 '.xops-node span{display:block;font-size:.58rem;color:#d4d4d8;max-width:72px;line-height:1.2}',
 '.xops-truck-dot{position:absolute;width:10px;height:10px;border-radius:50%;background:#fbbf24;box-shadow:0 0 14px #fbbf24;transform:translate(-50%,-50%);animation:xops-pulse 1.6s ease infinite}',
 '@keyframes xops-pulse{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-50%,-50%) scale(1.35)}}',
 '.xops-tabs{display:flex;flex-wrap:wrap;gap:.4rem;margin:1rem 0 1.1rem}',
 '.xops-tab{font-size:.72rem;padding:.45rem .8rem;border-radius:999px;border:1px solid rgba(255,255,255,.12);background:transparent;color:#a1a1aa;cursor:pointer;font-family:inherit}',
 '.xops-tab.is-on{background:rgba(232,197,71,.15);border-color:rgba(232,197,71,.45);color:#fde68a}',
 '.xops-panel{display:none}.xops-panel.is-on{display:block}',
 '.xops-select{width:100%;background:#09090b;border:1px solid rgba(255,255,255,.12);color:#fff;border-radius:.75rem;padding:.55rem .7rem;font-size:.85rem;margin-top:.35rem},.xops-loc-scroll{max-height:min(52vh,420px);overflow-y:auto;overscroll-behavior:contain;border:1px solid rgba(255,255,255,.12);border-radius:.85rem;background:rgba(0,0,0,.4);margin-top:.4rem},.xops-loc-row{display:flex;align-items:flex-start;gap:.55rem;width:100%;text-align:left;padding:.55rem .7rem;border:0;border-bottom:1px solid rgba(255,255,255,.06);background:transparent;color:#e4e4e7;cursor:pointer;font-family:inherit;font-size:.78rem;line-height:1.35},.xops-loc-row:hover,.xops-loc-row.is-on{background:rgba(232,197,71,.1);color:#fde68a},.xops-loc-type{flex-shrink:0;font-size:.58rem;letter-spacing:.08em;text-transform:uppercase;padding:.15rem .4rem;border-radius:999px;border:1px solid rgba(255,255,255,.15);color:#a1a1aa;min-width:3.6rem;text-align:center},.xops-loc-type.city,.xops-loc-type.town{border-color:rgba(52,211,153,.35);color:#6ee7b7},.xops-loc-type.province,.xops-loc-type.state{border-color:rgba(96,165,250,.4);color:#93c5fd},.xops-loc-type.country{border-color:rgba(251,191,36,.4);color:#fcd34d},.xops-loc-type.shelter{border-color:rgba(248,113,113,.4);color:#fca5a5},.xops-loc-meta{font-size:.68rem;color:#71717a;margin-top:.1rem},.xops-loc-count{font-size:.65rem;color:#a1a1aa;margin-top:.35rem}',
 '.xops-cta{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;margin-top:1rem;padding:.75rem 1.25rem;border-radius:999px;border:0;cursor:pointer;font-weight:700;font-size:.9rem;color:#1a0a0c;background:linear-gradient(135deg,#f5e6a8,#e8c547 40%,#c41e3a);font-family:inherit}',
 '.xops-flow{display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;font-size:.75rem;color:#d4d4d8;margin:1rem 0}',
 '.xops-flow b{color:#fde68a;font-weight:600}',
 '.xops-arrow{color:#71717a}',
 /* Wrapping paper gallery */
 '.xops-wrap-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:.65rem}',
 '@media(min-width:560px){.xops-wrap-grid{grid-template-columns:repeat(3,1fr)}}',
 '@media(min-width:900px){.xops-wrap-grid{grid-template-columns:repeat(4,1fr)}}',
 '.xops-paper{position:relative;border-radius:1rem;border:2px solid rgba(255,255,255,.1);overflow:hidden;cursor:pointer;background:#18181b;text-align:left;padding:0;font-family:inherit;color:inherit;transition:border-color .2s,transform .2s,box-shadow .2s}',
 '.xops-paper:hover{transform:translateY(-2px);border-color:rgba(232,197,71,.45)}',
 '.xops-paper.is-picked{border-color:#e8c547;box-shadow:0 0 0 1px rgba(232,197,71,.5),0 12px 28px -12px rgba(232,197,71,.45)}',
 '.xops-paper-swatch{height:88px;width:100%;position:relative}',
 '.xops-paper-swatch::after{content:"";position:absolute;left:12%;right:12%;top:42%;height:10px;background:linear-gradient(90deg,transparent,#e8c547,transparent);opacity:.55;box-shadow:0 0 8px rgba(232,197,71,.4)}',
 '.xops-paper-swatch::before{content:"";position:absolute;left:48%;top:18%;bottom:18%;width:10px;transform:translateX(-50%);background:linear-gradient(180deg,transparent,#e8c547,transparent);opacity:.55}',
 '.xops-paper-meta{padding:.55rem .65rem .7rem}',
 '.xops-paper-meta strong{display:block;font-size:.78rem;color:#fafafa;margin-bottom:.15rem}',
 '.xops-paper-meta span{font-size:.65rem;color:#a1a1aa;line-height:1.3;display:block}',
 '.xops-paper-check{position:absolute;top:8px;right:8px;width:22px;height:22px;border-radius:50%;background:#e8c547;color:#1a0a0c;font-size:12px;font-weight:700;display:none;align-items:center;justify-content:center;z-index:2}',
 '.xops-paper.is-picked .xops-paper-check{display:flex}',
 '.xops-preview-box{border-radius:1.1rem;border:1px solid rgba(255,255,255,.12);padding:1rem;background:rgba(0,0,0,.35)}',
 '.xops-preview-gift{width:100%;max-width:200px;margin:0 auto;aspect-ratio:1;border-radius:.75rem;position:relative;box-shadow:0 16px 40px -12px rgba(0,0,0,.6)}',
 '.xops-preview-gift .ribbon-h{position:absolute;left:0;right:0;top:46%;height:14px;transform:translateY(-50%);opacity:.95}',
 '.xops-preview-gift .ribbon-v{position:absolute;top:0;bottom:0;left:50%;width:14px;transform:translateX(-50%);opacity:.95}',
 '.xops-preview-gift .bow{position:absolute;left:50%;top:42%;transform:translate(-50%,-50%);width:36px;height:36px;border-radius:50%;box-shadow:0 0 0 3px rgba(0,0,0,.15);display:none}',
 '.xops-preview-gift.has-ribbon .bow{display:block}',
 '.xops-preview-gift.no-ribbon .ribbon-h,.xops-preview-gift.no-ribbon .ribbon-v{display:none}',
 '.xops-stock-preview{text-align:center;font-size:2.5rem;margin-top:.75rem;min-height:2.5rem;line-height:1}',
 '.xops-filter-row{display:flex;flex-wrap:wrap;gap:.35rem;margin:0 0 1rem}',
 '.xops-filter{font-size:.65rem;padding:.35rem .65rem;border-radius:999px;border:1px solid rgba(255,255,255,.12);background:transparent;color:#a1a1aa;cursor:pointer;font-family:inherit}',
 '.xops-filter.is-on{background:rgba(232,197,71,.18);border-color:rgba(232,197,71,.5);color:#fde68a}',
 '.xops-opt-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:.4rem}',
 '@media(min-width:480px){.xops-opt-grid{grid-template-columns:repeat(3,1fr)}}',
 '.xops-opt{font-size:.68rem;padding:.45rem .5rem;border-radius:.65rem;border:1px solid rgba(255,255,255,.1);background:rgba(0,0,0,.25);color:#d4d4d8;cursor:pointer;font-family:inherit;text-align:left}',
 '.xops-opt.is-on{border-color:rgba(232,197,71,.55);color:#fde68a;background:rgba(232,197,71,.1)}',
 '.xops-opt .sw{display:inline-block;width:12px;height:12px;border-radius:3px;margin-right:.35rem;vertical-align:middle;border:1px solid rgba(255,255,255,.2)}',
 '.xops-dinner-card{transition:border-color .2s,box-shadow .2s}',
 '.xops-dinner-card.is-picked{border-color:rgba(232,197,71,.55)!important;box-shadow:0 0 0 1px rgba(232,197,71,.35),0 12px 28px -14px rgba(196,30,58,.4)}',
 '.xops-pack-card{cursor:pointer;transition:border-color .2s}',
 '.xops-pack-card.is-picked{border-color:rgba(52,211,153,.5)}',
 '.xops-section-label{font-size:.7rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(232,197,71,.85);margin:1.25rem 0 .65rem}'
 ].join('\n');
 document.head.appendChild(s);
 }

 function donationCards() {
 return DONATION_SIZES.map(function (d) {
 return (
 '<div class="xops-card xops-pack-card" data-pack="' + d.id + '" role="button" tabindex="0">' +
 '<div class="xops-pill">' + d.size + '</div>' +
 '<h4 style="margin-top:.55rem">' + d.name + '</h4>' +
 '<p class="xops-muted"><strong style="color:#ecfdf5">' + d.kids + '</strong> · ' + d.fills + '</p>' +
 '<p class="xops-muted" style="margin-top:.4rem">' + d.when + '</p>' +
 '</div>'
 );
 }).join('');
 }

 function dinnerCards() {
 return DINNER_SPONSORS.map(function (d, i) {
 return (
 '<button type="button" class="xops-card xops-dinner-card' + (i === 0 ? ' is-picked' : '') + '" data-dinner="' + d.id + '" style="text-align:left;cursor:pointer;width:100%;font-family:inherit;color:inherit">' +
 '<div style="display:flex;align-items:flex-start;gap:.5rem">' +
 '<span style="font-size:1.5rem" aria-hidden="true">' + d.icon + '</span>' +
 '<div style="flex:1">' +
 '<div class="xops-pill">' + d.type + '</div>' +
 '<h4 style="margin-top:.45rem">' + d.name + '</h4>' +
 '<p class="xops-muted"><strong style="color:#fde68a">' + d.feeds + '</strong></p>' +
 '<p class="xops-muted" style="margin-top:.35rem">' + d.includes + '</p>' +
 '<p class="xops-muted" style="margin-top:.35rem;color:#6ee7b7">' + d.how + '</p>' +
 '</div>' +
 '</div>' +
 '</button>'
 );
 }).join('');
 }

 function dinnerById(id) {
 return DINNER_SPONSORS.find(function (d) { return d.id === id; }) || DINNER_SPONSORS[0];
 }

 function groceryPartnersHtml() {
 return GROCERY_PARTNERS.map(function (g) {
 return (
 '<div class="xops-muted" style="padding:.4rem 0;border-bottom:1px solid rgba(255,255,255,.06)">' +
 '<strong style="color:#ecfdf5">' + g.name + '</strong>' +
 '<span style="color:#71717a"> · ' + g.region + '</span>' +
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

 function wrapPaperCards(filterCat) {
 var list = !filterCat || filterCat === 'all'
 ? WRAP_PAPERS
 : WRAP_PAPERS.filter(function (p) { return p.cat === filterCat; });
 if (!list.length) {
 return '<p class="xops-muted">No styles in this filter yet.</p>';
 }
 return list.map(function (p, i) {
 return (
 '<button type="button" class="xops-paper' + (i === 0 && filterCat === 'all' ? ' is-picked' : '') + '" data-wrap="' + p.id + '" data-cat="' + p.cat + '" title="' + p.name + '">' +
 '<span class="xops-paper-check" aria-hidden="true">✓</span>' +
 '<div class="xops-paper-swatch" style="background:' + p.bg + '"></div>' +
 '<div class="xops-paper-meta">' +
 '<strong>' + p.name + '</strong>' +
 '<span>' + p.vibe + '</span>' +
 '<span style="color:#fde68a;margin-top:.2rem">' + p.mood + ' · ' + p.cat + '</span>' +
 '</div>' +
 '</button>'
 );
 }).join('');
 }

 function wrapById(id) {
 return WRAP_PAPERS.find(function (p) { return p.id === id; }) || WRAP_PAPERS[0];
 }
 function ribbonById(id) {
 return RIBBONS.find(function (r) { return r.id === id; }) || RIBBONS[0];
 }
 function stockingById(id) {
 return STOCKINGS.find(function (s) { return s.id === id; }) || STOCKINGS[0];
 }

 function filterChipsHtml() {
 return WRAP_CATS.map(function (c, i) {
 return '<button type="button" class="xops-filter' + (i === 0 ? ' is-on' : '') + '" data-cat="' + c.id + '">' + c.label + '</button>';
 }).join('');
 }

 function ribbonOptsHtml() {
 return RIBBONS.map(function (r, i) {
 var sw = r.id === 'none'
 ? '<span class="sw" style="background:transparent;border-style:dashed"></span>'
 : '<span class="sw" style="background:' + r.color + '"></span>';
 return '<button type="button" class="xops-opt' + (i === 1 ? ' is-on' : '') + '" data-ribbon="' + r.id + '">' + sw + r.name + '</button>';
 }).join('');
 }

 function stockingOptsHtml() {
 return STOCKINGS.map(function (s, i) {
 return '<button type="button" class="xops-opt' + (i === 0 ? ' is-on' : '') + '" data-stock="' + s.id + '">' + s.emoji + ' ' + s.name + '</button>';
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
 '<p class="xops-honest">Preview only. Real rosters and truck trackers when partners are real. We will not fake GPS.</p>' +
 '</div>' +

 '<div class="xops-flow">' +
 '<b>Donate</b><span class="xops-arrow">→</span>' +
 '<b>Gifts + dinners</b><span class="xops-arrow">→</span>' +
 '<b>Wrap style</b><span class="xops-arrow">→</span>' +
 '<b>Elf warehouse</b><span class="xops-arrow">→</span>' +
 '<b>Hub / grocery voucher</b><span class="xops-arrow">→</span>' +
 '<b>Truck trackers</b><span class="xops-arrow">→</span>' +
 '<b>Local drops</b><span class="xops-arrow">→</span>' +
 '<b>Verified families</b>' +
 '</div>' +

 '<div class="xops-tabs" role="tablist">' +
 '<button type="button" class="xops-tab is-on" data-tab="donate">Gifts · size</button>' +
 '<button type="button" class="xops-tab" data-tab="dinners">Turkey dinners</button>' +
 '<button type="button" class="xops-tab" data-tab="wrap">Wrapping paper</button>' +
 '<button type="button" class="xops-tab" data-tab="elves">Live elf floor</button>' +
 '<button type="button" class="xops-tab" data-tab="hubs">Warehouses</button>' +
 '<button type="button" class="xops-tab" data-tab="trucks">Truck trackers</button>' +
 '<button type="button" class="xops-tab" data-tab="drops">Local drops</button>' +
 '</div>' +

 '<div class="xops-panel is-on" data-panel="donate">' +
 '<p class="xops-muted" style="margin-bottom:1rem">Pick a gift pack size. Choose a region. When funded, gifts ship through the warehouse network to verified partners - not random DMs. Add a turkey dinner on the dinners tab if you want.</p>' +
 '<div class="xops-grid xops-grid-2" style="margin-bottom:1rem">' +
 '<div class="xops-card">' +
 '<h3>Where should this go?</h3>' +
 '<label class="xops-muted">Region / hub</label>' +
 '<select class="xops-select" id="xops-region">' +
 HUBS.map(function (h) {
 return '<option value="' + h.id + '">' + h.city + ' - ' + h.name + '</option>';
 }).join('') +
 '</select>' +
 '<label class="xops-muted" style="display:block;margin-top:.75rem">Local drop focus</label>' +
                'City · town · province · state · country · shelter</label>' +
                '<input type="search" class="xops-select" id="xops-loc-search" placeholder="Type Edmonton, Alberta, California, youth shelter..." autocomplete="off">' +
                '<div class="xops-filter-row" id="xops-loc-filters" style="margin-top:.45rem">' +
                  '<button type="button" class="xops-filter is-on" data-loctype="all">All</button>' +
                  '<button type="button" class="xops-filter" data-loctype="city">Cities</button>' +
                  '<button type="button" class="xops-filter" data-loctype="town">Towns</button>' +
                  '<button type="button" class="xops-filter" data-loctype="province">Provinces</button>' +
                  '<button type="button" class="xops-filter" data-loctype="state">States</button>' +
                  '<button type="button" class="xops-filter" data-loctype="country">Countries</button>' +
                  '<button type="button" class="xops-filter" data-loctype="shelter">Shelters</button>' +
                '</div>' +
                '<div class="xops-loc-scroll" id="xops-loc-list" role="listbox" aria-label="Locations directory"></div>' +
                '<p class="xops-loc-count" id="xops-loc-count"></p>' +
                '<input type="hidden" id="xops-drop" value="d1">' +
 '<p class="xops-muted" style="margin-top:.75rem" id="xops-donate-summary">Child Mercy Bag → Edmonton hub → local verified drop</p>' +
 '<button type="button" class="xops-cta" id="xops-sponsor-btn">Sponsor this route (when funded)</button>' +
 '</div>' +
 '<div class="xops-card">' +
 '<h3>Season clock</h3>' +
 '<p class="xops-muted">Christmas outbound window: <strong style="color:#fde68a">Nov 15 - Dec 23</strong> (design target)</p>' +
 '<p class="xops-muted" style="margin-top:.5rem">Peak packing nights stream live from the main hub. Holders watch elves build packs that match verified lists by age, size, and location.</p>' +
 '<p class="xops-muted" style="margin-top:.5rem">Dinner vouchers redeem at local grocery the same week - so the turkey is fresh, not stuck in a warehouse.</p>' +
 '<p class="xops-muted" style="margin-top:.5rem">Linked programs: <a href="orphan-christmas.html" style="color:#6ee7b7">Orphan Christmas</a> · <a href="santa-s-workshop-live.html" style="color:#6ee7b7">Santa\'s Workshop Live</a></p>' +
 '</div>' +
 '</div>' +
 '<p class="xops-section-label">Gift pack sizes</p>' +
 '<div class="xops-grid xops-grid-4" id="xops-pack-grid">' + donationCards() + '</div>' +
 '</div>' +

 '<div class="xops-panel" data-panel="dinners">' +
 '<p class="xops-muted" style="margin-bottom:1rem">Sponsor a <strong style="color:#ecfdf5">Christmas dinner for low-income families</strong> with proven need. Full turkey dinner with everything included, or a local grocery voucher so they shop with dignity. Verified through partners - same no-scammer rules as gifts.</p>' +
 '<div class="xops-grid xops-grid-2" style="margin-bottom:1.1rem">' +
 '<div class="xops-card">' +
 '<h3>How dinner sponsorship works</h3>' +
 '<ul class="xops-muted" style="margin:.5rem 0 0;padding-left:1.1rem;line-height:1.7">' +
 '<li><strong style="color:#fde68a">Full turkey dinner</strong> - bird + stuffing + gravy + potatoes + veg + rolls + dessert</li>' +
 '<li><strong style="color:#fde68a">Grocery voucher</strong> - prepaid amount at a local store for the Christmas cart</li>' +
 '<li><strong style="color:#fde68a">Hamper + voucher</strong> - dry goods from the warehouse + store slip for fresh turkey</li>' +
 '<li><strong style="color:#fde68a">Shelter feast</strong> - one voucher or bulk order for a whole youth shelter floor</li>' +
 '</ul>' +
 '<p class="xops-muted" style="margin-top:.75rem">Dignity matters. A voucher at a real store beats a mystery bag of cans when we can do it that way.</p>' +
 '<p class="xops-muted" style="margin-top:.5rem" id="xops-dinner-summary">Selected: Full Turkey Dinner · Family of 4-6</p>' +
 '<button type="button" class="xops-cta" id="xops-dinner-btn">Sponsor this dinner (when funded)</button>' +
 '</div>' +
 '<div class="xops-card">' +
 '<h3>Local grocery partners (design list)</h3>' +
 '<p class="xops-muted" style="margin-bottom:.5rem">When live, vouchers map to real stores near the family. Illustrative partners:</p>' +
 groceryPartnersHtml() +
 '<p class="xops-muted" style="margin-top:.75rem">Honest note: store partnerships and voucher rails activate with funding and charity status. Until then this is the design of mercy - we are not pretending grocery cards are printing yet.</p>' +
 '</div>' +
 '</div>' +
 '<p class="xops-section-label">Choose a dinner package</p>' +
 '<div class="xops-grid xops-grid-2" id="xops-dinner-grid">' + dinnerCards() + '</div>' +
 '</div>' +

 '<div class="xops-panel" data-panel="wrap">' +
 '<div class="xops-grid xops-grid-2" style="margin-bottom:1.1rem">' +
 '<div class="xops-card">' +
 '<h3>Build the look</h3>' +
 '<p class="xops-muted">Pick paper · ribbon · stocking. Elves wrap to your selection when funded. Classy, kids, holy, Shiba, $hopeseed, $NIBBLES, funny, loving - filter and choose.</p>' +
 '<p class="xops-muted" style="margin-top:.5rem"><strong style="color:#fde68a" id="xops-wrap-count">' + WRAP_PAPERS.length + ' papers</strong> · ' + RIBBONS.length + ' ribbons · ' + STOCKINGS.length + ' stockings</p>' +
 '<p class="xops-muted" style="margin-top:.75rem" id="xops-wrap-picked">Paper: <strong style="color:#ecfdf5">Holly Classic</strong></p>' +
 '<p class="xops-muted" id="xops-extras-picked">Ribbon: <strong style="color:#ecfdf5">Gold satin</strong> · Stocking: <strong style="color:#ecfdf5">None</strong></p>' +
 '<h4 style="margin:1rem 0 .4rem;color:#fde68a;font-size:.8rem">Ribbon</h4>' +
 '<div class="xops-opt-grid" id="xops-ribbon-grid">' + ribbonOptsHtml() + '</div>' +
 '<h4 style="margin:1rem 0 .4rem;color:#fde68a;font-size:.8rem">Stocking</h4>' +
 '<div class="xops-opt-grid" id="xops-stock-grid">' + stockingOptsHtml() + '</div>' +
 '</div>' +
 '<div class="xops-preview-box">' +
 '<p class="xops-muted" style="text-align:center;margin-bottom:.75rem">Gift preview</p>' +
 '<div class="xops-preview-gift has-ribbon" id="xops-gift-preview" style="background:' + WRAP_PAPERS[0].bg + '">' +
 '<div class="ribbon-h" id="xops-rib-h" style="background:#e8c547"></div>' +
 '<div class="ribbon-v" id="xops-rib-v" style="background:#e8c547"></div>' +
 '<div class="bow" id="xops-bow" style="background:radial-gradient(circle at 40% 35%,#fde68a,#b45309)" aria-hidden="true"></div>' +
 '</div>' +
 '<div class="xops-stock-preview" id="xops-stock-preview" title="Stocking"></div>' +
 '<p class="xops-muted" style="text-align:center;margin-top:.5rem" id="xops-gift-label">Holly Classic + Gold satin</p>' +
 '</div>' +
 '</div>' +
 '<div class="xops-filter-row" id="xops-filter-row">' + filterChipsHtml() + '</div>' +
 '<div class="xops-wrap-grid" id="xops-wrap-grid">' + wrapPaperCards('all') + '</div>' +
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
 '<li>Matching <strong style="color:#ecfdf5">Child Mercy Bags</strong> to Edmonton foster list ages 4-12</li>' +
 '<li>Building <strong style="color:#ecfdf5">Sibling Crates</strong> so packs stay together</li>' +
 '<li>Sealing <strong style="color:#ecfdf5">Floor Pallets</strong> for hub transfer to Calgary &amp; Toronto</li>' +
 '<li>Tagging each box with partner code - never a public kid name</li>' +
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
 '<div class="xops-loc-scroll xops-drop-scroll" style="max-height:min(60vh,520px);padding:.5rem"><div class="xops-grid xops-grid-2">' + dropList() + '</div></div>' +
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
 var selectedWrap = WRAP_PAPERS[0].id;
 var selectedRibbon = 'gold';
 var selectedStock = 'none';
 var wrapFilter = 'all';
 var selectedPack = 'child-bag';
 var selectedDinner = DINNER_SPONSORS[0].id;
 var includeDinner = false;

 function packById(id) {
 return DONATION_SIZES.find(function (p) { return p.id === id; }) || DONATION_SIZES[1];
 }

 function refreshSummary() {
 if (!summary || !region || !drop) return;
 var h = hubById(region.value);
 var d = dropById(drop.value);
 var pack = packById(selectedPack);
 var w = wrapById(selectedWrap);
 var r = ribbonById(selectedRibbon);
 var s = stockingById(selectedStock);
 var dinner = dinnerById(selectedDinner);
 var line =
 pack.name + ' · ' + w.name +
 ' · ribbon: ' + r.name +
 (s.id !== 'none' ? ' · stocking: ' + s.name : '') +
 ' → ' + h.city + ' hub → ' + d.name + ' (' + d.city + ')';
 if (includeDinner) {
 line += ' · + dinner: ' + dinner.name + ' (' + dinner.feeds + ')';
 }
 var locLab = dropHidden && dropHidden.getAttribute('data-loc-label');
      if (selectedLocId && LOCATION_DIR) {
        var sl = LOCATION_DIR.find(function (r) { return r.id === selectedLocId; });
        if (sl) line += ' · place: ' + sl.label;
      } else if (locLab) {
        line += ' · place: ' + locLab;
      }
      summary.textContent = line;

 var dinnerSum = root.querySelector('#xops-dinner-summary');
 if (dinnerSum) {
 dinnerSum.innerHTML =
 'Selected: <strong style="color:#ecfdf5">' + dinner.name + '</strong> · ' + dinner.feeds +
 ' · ' + dinner.type +
 (includeDinner ? ' · <span style="color:#6ee7b7">added to sponsorship</span>' : ' · <span style="color:#a1a1aa">tap “Include dinner” to attach</span>');
 }
 }

 function updatePreview() {
 var w = wrapById(selectedWrap);
 var r = ribbonById(selectedRibbon);
 var s = stockingById(selectedStock);
 var giftPreview = root.querySelector('#xops-gift-preview');
 var giftLabel = root.querySelector('#xops-gift-label');
 var wrapPicked = root.querySelector('#xops-wrap-picked');
 var extras = root.querySelector('#xops-extras-picked');
 var ribH = root.querySelector('#xops-rib-h');
 var ribV = root.querySelector('#xops-rib-v');
 var bow = root.querySelector('#xops-bow');
 var stockPrev = root.querySelector('#xops-stock-preview');

 if (giftPreview) {
 giftPreview.style.background = w.bg;
 giftPreview.classList.toggle('no-ribbon', r.id === 'none');
 giftPreview.classList.toggle('has-ribbon', r.id !== 'none');
 }
 if (ribH && ribV) {
 ribH.style.background = r.color;
 ribV.style.background = r.color;
 }
 if (bow) {
 if (r.id === 'none') {
 bow.style.display = 'none';
 } else {
 bow.style.display = 'block';
 bow.style.background =
 r.id === 'rainbow'
 ? 'conic-gradient(#f87171,#fbbf24,#34d399,#60a5fa,#c084fc,#f87171)'
 : 'radial-gradient(circle at 40% 35%,#fff,' + (r.color.indexOf('gradient') === 0 ? '#e8c547' : r.color) + ')';
 }
 }
 if (stockPrev) stockPrev.textContent = s.id === 'none' ? '' : s.emoji;
 if (wrapPicked) {
 wrapPicked.innerHTML = 'Paper: <strong style="color:#ecfdf5">' + w.name + '</strong> - ' + w.vibe;
 }
 if (extras) {
 extras.innerHTML =
 'Ribbon: <strong style="color:#ecfdf5">' + r.name + '</strong> · Stocking: <strong style="color:#ecfdf5">' + s.name + '</strong>';
 }
 if (giftLabel) {
 giftLabel.textContent = w.name + (r.id !== 'none' ? ' + ' + r.name : '') + (s.id !== 'none' ? ' + ' + s.emoji : '');
 }
 refreshSummary();
 }

 
    // Large location directory (city/town/province/state/country/shelter)
    var locSearch = root.querySelector('#xops-loc-search');
    var locList = root.querySelector('#xops-loc-list');
    var locCount = root.querySelector('#xops-loc-count');
    var locFilters = root.querySelector('#xops-loc-filters');
    var locType = 'all';
    var selectedLocId = '';
    var dropHidden = root.querySelector('#xops-drop');

    function renderLocList() {
      if (!locList || !LOCATION_DIR) return;
      var q = (locSearch && locSearch.value ? locSearch.value : '').trim().toLowerCase();
      var rows = LOCATION_DIR.filter(function (r) {
        if (locType !== 'all' && r.type !== locType) return false;
        if (!q) return true;
        return r.search.indexOf(q) !== -1;
      });
      // cap render for speed but keep scrollable set large
      var max = 400;
      var show = rows.slice(0, max);
      locList.innerHTML = show.map(function (r) {
        return '<button type="button" class="xops-loc-row' + (r.id === selectedLocId ? ' is-on' : '') + '" data-loc="' + r.id + '" role="option">' +
          '<span class="xops-loc-type ' + r.type + '">' + r.type + '</span>' +
          '<span><strong style="color:#fafafa;font-weight:600">' + r.name + '</strong>' +
          '<div class="xops-loc-meta">' + [r.region, r.country, r.extra].filter(Boolean).join(' · ') + '</div></span></button>';
      }).join('');
      if (locCount) {
        locCount.textContent = rows.length + ' places' + (rows.length > max ? ' (showing first ' + max + ' - refine search)' : '') +
          ' · scroll the list · filter by type';
      }
    }

    if (locList) {
      renderLocList();
      locList.addEventListener('click', function (e) {
        var row = e.target.closest('[data-loc]');
        if (!row) return;
        selectedLocId = row.getAttribute('data-loc');
        var loc = LOCATION_DIR.find(function (r) { return r.id === selectedLocId; });
        // Map shelter rows to drop site when possible
        if (loc && loc.type === 'shelter') {
          var match = DROP_SITES.find(function (d) { return d.name === loc.name; });
          if (match && dropHidden) dropHidden.value = match.id;
        } else if (dropHidden) {
          // keep drop, attach location label via data
          dropHidden.setAttribute('data-loc-label', loc ? loc.label : '');
        }
        renderLocList();
        refreshSummary();
      });
    }
    if (locSearch) {
      locSearch.addEventListener('input', function () { renderLocList(); });
    }
    if (locFilters) {
      locFilters.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-loctype]');
        if (!btn) return;
        locType = btn.getAttribute('data-loctype') || 'all';
        locFilters.querySelectorAll('.xops-filter').forEach(function (b) {
          b.classList.toggle('is-on', b === btn);
        });
        renderLocList();
      });
    }

    if (region) region.addEventListener('change', refreshSummary);
 if (drop) drop.addEventListener('change', refreshSummary);

 // Category filters
 var filterRow = root.querySelector('#xops-filter-row');
 var wrapGrid = root.querySelector('#xops-wrap-grid');
 if (filterRow && wrapGrid) {
 filterRow.addEventListener('click', function (e) {
 var chip = e.target.closest('.xops-filter');
 if (!chip) return;
 wrapFilter = chip.getAttribute('data-cat') || 'all';
 filterRow.querySelectorAll('.xops-filter').forEach(function (c) {
 c.classList.toggle('is-on', c === chip);
 });
 wrapGrid.innerHTML = wrapPaperCards(wrapFilter);
 // re-mark selected paper if visible
 var still = wrapGrid.querySelector('[data-wrap="' + selectedWrap + '"]');
 if (still) still.classList.add('is-picked');
 else {
 var first = wrapGrid.querySelector('.xops-paper');
 if (first) {
 selectedWrap = first.getAttribute('data-wrap');
 first.classList.add('is-picked');
 updatePreview();
 }
 }
 });
 }

 // Wrapping paper picker
 if (wrapGrid) {
 wrapGrid.addEventListener('click', function (e) {
 var btn = e.target.closest('.xops-paper');
 if (!btn) return;
 selectedWrap = btn.getAttribute('data-wrap') || WRAP_PAPERS[0].id;
 wrapGrid.querySelectorAll('.xops-paper').forEach(function (b) {
 b.classList.toggle('is-picked', b === btn);
 });
 updatePreview();
 });
 }

 // Ribbons
 var ribGrid = root.querySelector('#xops-ribbon-grid');
 if (ribGrid) {
 ribGrid.addEventListener('click', function (e) {
 var btn = e.target.closest('.xops-opt');
 if (!btn) return;
 selectedRibbon = btn.getAttribute('data-ribbon') || 'none';
 ribGrid.querySelectorAll('.xops-opt').forEach(function (b) {
 b.classList.toggle('is-on', b === btn);
 });
 updatePreview();
 });
 }

 // Stockings
 var stockGrid = root.querySelector('#xops-stock-grid');
 if (stockGrid) {
 stockGrid.addEventListener('click', function (e) {
 var btn = e.target.closest('.xops-opt');
 if (!btn) return;
 selectedStock = btn.getAttribute('data-stock') || 'none';
 stockGrid.querySelectorAll('.xops-opt').forEach(function (b) {
 b.classList.toggle('is-on', b === btn);
 });
 updatePreview();
 });
 }

 updatePreview();

 // Gift pack pick
 var packGrid = root.querySelector('#xops-pack-grid');
 if (packGrid) {
 var initialPack = packGrid.querySelector('[data-pack="child-bag"]') || packGrid.querySelector('[data-pack]');
 if (initialPack) initialPack.classList.add('is-picked');
 packGrid.addEventListener('click', function (e) {
 var card = e.target.closest('[data-pack]');
 if (!card) return;
 selectedPack = card.getAttribute('data-pack') || 'child-bag';
 packGrid.querySelectorAll('[data-pack]').forEach(function (c) {
 c.classList.toggle('is-picked', c === card);
 });
 refreshSummary();
 });
 }

 // Dinner package pick
 var dinnerGrid = root.querySelector('#xops-dinner-grid');
 if (dinnerGrid) {
 dinnerGrid.addEventListener('click', function (e) {
 var card = e.target.closest('[data-dinner]');
 if (!card) return;
 selectedDinner = card.getAttribute('data-dinner') || DINNER_SPONSORS[0].id;
 includeDinner = true;
 dinnerGrid.querySelectorAll('[data-dinner]').forEach(function (c) {
 c.classList.toggle('is-picked', c === card);
 });
 refreshSummary();
 });
 }

 var btn = root.querySelector('#xops-sponsor-btn');
 if (btn) {
 btn.addEventListener('click', function () {
 var msg =
 'When funding rails are live, this sponsors a real warehouse → truck → local drop path for verified kids' +
 (includeDinner ? ', plus a Christmas dinner package for a low-income family' : '') +
 '. Not live yet - truth first.';
 if (typeof window.sponsorProgram === 'function') {
 window.sponsorProgram(includeDinner ? 'orphan-christmas-gift-and-dinner' : 'orphan-christmas-route');
 } else {
 alert(msg);
 }
 });
 }

 var dinnerBtn = root.querySelector('#xops-dinner-btn');
 if (dinnerBtn) {
 dinnerBtn.addEventListener('click', function () {
 includeDinner = true;
 var dinner = dinnerById(selectedDinner);
 refreshSummary();
 var msg =
 'When funded: sponsor "' + dinner.name + '" for a verified low-income family. ' +
 dinner.includes + '. Redeemed via local grocery voucher or partner delivery. Not printing vouchers yet - truth first.';
 if (typeof window.sponsorProgram === 'function') {
 window.sponsorProgram('orphan-christmas-dinner-' + dinner.id);
 } else {
 alert(msg);
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
