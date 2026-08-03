/**
 * Silver Paws · full location + facility directory (design / outreach map)
 * Every Canadian province & territory · every US state + DC
 * Cities + demo senior homes/villas per place for search UX
 * Labels: design directory until real partner agreements are live
 */
(function (global) {
  'use strict';

  var TYPES = [
    'Retirement Home',
    'Senior Living Community',
    'Assisted Living',
    'Memory Care',
    'Independent Living',
    'Senior Villa Community',
    'Long-Term Care',
    'Retirement Residences'
  ];

  var SPECS = [
    'Pet-friendly · bingo nights · garden walks',
    'Memory care · soft music · therapy dog ready',
    'Independent living · afternoon tea · gentle visits',
    'Assisted living · story circles · calm dogs',
    'Raffles · sing-alongs · outdoor patios',
    'Lunch clubs · crafts · paw print moments',
    'Quiet halls · wheelchair-friendly · lap time',
    'Family open days · community room · dog visits'
  ];

  var HOME_WORDS = [
    'Villa', 'Manor', 'Residences', 'Gardens', 'Court', 'Lodge',
    'Heights', 'Commons', 'Place', 'Terrace', 'Grove', 'Haven',
    'Estates', 'Landing', 'Pointe', 'Meadows'
  ];

  var HOME_PREFIX = [
    'Silver', 'Maple', 'Golden', 'Harbor', 'Sunset', 'Evergreen', 'Prairie',
    'Cedar', 'Lakeside', 'Riverbend', 'Heritage', 'Harmony', 'Grace',
    'Summit', 'Coastal', 'Northern', 'Pioneer', 'Liberty', 'Horizon',
    'Willow', 'Oakwood', 'Sunrise', 'Moonlight', 'Crystal', 'Emerald'
  ];

  /* Canada: all provinces + territories with representative cities */
  var CANADA = {
    'Alberta': ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge', 'St. Albert', 'Medicine Hat', 'Grande Prairie', 'Airdrie', 'Fort McMurray', 'Spruce Grove'],
    'British Columbia': ['Vancouver', 'Victoria', 'Kelowna', 'Surrey', 'Burnaby', 'Richmond', 'Abbotsford', 'Coquitlam', 'Kamloops', 'Nanaimo', 'Prince George', 'Chilliwack'],
    'Manitoba': ['Winnipeg', 'Brandon', 'Steinbach', 'Thompson', 'Portage la Prairie', 'Winkler', 'Selkirk'],
    'New Brunswick': ['Moncton', 'Saint John', 'Fredericton', 'Dieppe', 'Miramichi', 'Bathurst', 'Edmundston'],
    'Newfoundland and Labrador': ['St. John\'s', 'Mount Pearl', 'Corner Brook', 'Conception Bay South', 'Paradise', 'Grand Falls-Windsor'],
    'Northwest Territories': ['Yellowknife', 'Hay River', 'Inuvik', 'Fort Smith'],
    'Nova Scotia': ['Halifax', 'Dartmouth', 'Sydney', 'Truro', 'New Glasgow', 'Glace Bay', 'Kentville'],
    'Nunavut': ['Iqaluit', 'Rankin Inlet', 'Arviat', 'Baker Lake'],
    'Ontario': ['Toronto', 'Ottawa', 'Mississauga', 'Brampton', 'Hamilton', 'London', 'Markham', 'Vaughan', 'Kitchener', 'Windsor', 'Richmond Hill', 'Oakville', 'Burlington', 'Oshawa', 'Barrie', 'Kingston', 'Guelph', 'Thunder Bay', 'Sudbury', 'Niagara Falls', 'St. Catharines', 'Cambridge', 'Waterloo'],
    'Prince Edward Island': ['Charlottetown', 'Summerside', 'Stratford', 'Cornwall'],
    'Quebec': ['Montreal', 'Quebec City', 'Laval', 'Gatineau', 'Longueuil', 'Sherbrooke', 'Saguenay', 'Levis', 'Trois-Rivieres', 'Terrebonne', 'Saint-Jean-sur-Richelieu'],
    'Saskatchewan': ['Saskatoon', 'Regina', 'Prince Albert', 'Moose Jaw', 'Swift Current', 'Yorkton', 'North Battleford'],
    'Yukon': ['Whitehorse', 'Dawson City', 'Watson Lake']
  };

  /* USA: all states + DC with major cities */
  var USA = {
    'Alabama': ['Birmingham', 'Montgomery', 'Huntsville', 'Mobile', 'Tuscaloosa'],
    'Alaska': ['Anchorage', 'Fairbanks', 'Juneau', 'Wasilla'],
    'Arizona': ['Phoenix', 'Tucson', 'Mesa', 'Chandler', 'Scottsdale', 'Glendale', 'Tempe'],
    'Arkansas': ['Little Rock', 'Fort Smith', 'Fayetteville', 'Springdale'],
    'California': ['Los Angeles', 'San Diego', 'San Jose', 'San Francisco', 'Fresno', 'Sacramento', 'Long Beach', 'Oakland', 'Bakersfield', 'Anaheim', 'Santa Ana', 'Riverside', 'Stockton', 'Irvine'],
    'Colorado': ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins', 'Lakewood', 'Boulder'],
    'Connecticut': ['Bridgeport', 'New Haven', 'Hartford', 'Stamford', 'Waterbury'],
    'Delaware': ['Wilmington', 'Dover', 'Newark'],
    'District of Columbia': ['Washington'],
    'Florida': ['Jacksonville', 'Miami', 'Tampa', 'Orlando', 'St. Petersburg', 'Hialeah', 'Tallahassee', 'Fort Lauderdale', 'Cape Coral', 'Pembroke Pines'],
    'Georgia': ['Atlanta', 'Augusta', 'Columbus', 'Macon', 'Savannah', 'Athens'],
    'Hawaii': ['Honolulu', 'Hilo', 'Kailua', 'Kapolei'],
    'Idaho': ['Boise', 'Meridian', 'Nampa', 'Idaho Falls'],
    'Illinois': ['Chicago', 'Aurora', 'Naperville', 'Joliet', 'Rockford', 'Springfield', 'Peoria'],
    'Indiana': ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Carmel'],
    'Iowa': ['Des Moines', 'Cedar Rapids', 'Davenport', 'Sioux City'],
    'Kansas': ['Wichita', 'Overland Park', 'Kansas City', 'Olathe', 'Topeka'],
    'Kentucky': ['Louisville', 'Lexington', 'Bowling Green', 'Owensboro'],
    'Louisiana': ['New Orleans', 'Baton Rouge', 'Shreveport', 'Lafayette'],
    'Maine': ['Portland', 'Lewiston', 'Bangor', 'South Portland'],
    'Maryland': ['Baltimore', 'Frederick', 'Rockville', 'Gaithersburg', 'Bowie'],
    'Massachusetts': ['Boston', 'Worcester', 'Springfield', 'Cambridge', 'Lowell'],
    'Michigan': ['Detroit', 'Grand Rapids', 'Warren', 'Sterling Heights', 'Ann Arbor', 'Lansing'],
    'Minnesota': ['Minneapolis', 'Saint Paul', 'Rochester', 'Duluth', 'Bloomington'],
    'Mississippi': ['Jackson', 'Gulfport', 'Southaven', 'Hattiesburg'],
    'Missouri': ['Kansas City', 'St. Louis', 'Springfield', 'Columbia', 'Independence'],
    'Montana': ['Billings', 'Missoula', 'Great Falls', 'Bozeman'],
    'Nebraska': ['Omaha', 'Lincoln', 'Bellevue', 'Grand Island'],
    'Nevada': ['Las Vegas', 'Henderson', 'Reno', 'North Las Vegas', 'Sparks'],
    'New Hampshire': ['Manchester', 'Nashua', 'Concord', 'Dover'],
    'New Jersey': ['Newark', 'Jersey City', 'Paterson', 'Elizabeth', 'Trenton'],
    'New Mexico': ['Albuquerque', 'Las Cruces', 'Rio Rancho', 'Santa Fe'],
    'New York': ['New York City', 'Buffalo', 'Rochester', 'Yonkers', 'Syracuse', 'Albany', 'New Rochelle'],
    'North Carolina': ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem', 'Fayetteville', 'Cary'],
    'North Dakota': ['Fargo', 'Bismarck', 'Grand Forks', 'Minot'],
    'Ohio': ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron', 'Dayton'],
    'Oklahoma': ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow'],
    'Oregon': ['Portland', 'Salem', 'Eugene', 'Gresham', 'Hillsboro'],
    'Pennsylvania': ['Philadelphia', 'Pittsburgh', 'Allentown', 'Reading', 'Scranton', 'Harrisburg'],
    'Rhode Island': ['Providence', 'Warwick', 'Cranston', 'Pawtucket'],
    'South Carolina': ['Charleston', 'Columbia', 'North Charleston', 'Mount Pleasant', 'Greenville'],
    'South Dakota': ['Sioux Falls', 'Rapid City', 'Aberdeen'],
    'Tennessee': ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga', 'Clarksville'],
    'Texas': ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth', 'El Paso', 'Arlington', 'Corpus Christi', 'Plano', 'Laredo'],
    'Utah': ['Salt Lake City', 'West Valley City', 'Provo', 'West Jordan', 'Orem'],
    'Vermont': ['Burlington', 'South Burlington', 'Rutland', 'Essex'],
    'Virginia': ['Virginia Beach', 'Norfolk', 'Chesapeake', 'Richmond', 'Newport News', 'Alexandria'],
    'Washington': ['Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue', 'Kent'],
    'West Virginia': ['Charleston', 'Huntington', 'Morgantown', 'Parkersburg'],
    'Wisconsin': ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha', 'Racine'],
    'Wyoming': ['Cheyenne', 'Casper', 'Laramie', 'Gillette']
  };

  function buildLocations() {
    var out = [];
    Object.keys(CANADA).forEach(function (prov) {
      CANADA[prov].forEach(function (city) {
        out.push({ country: 'Canada', province: prov, city: city, regionType: 'province' });
      });
    });
    Object.keys(USA).forEach(function (state) {
      USA[state].forEach(function (city) {
        out.push({ country: 'USA', province: state, city: city, regionType: 'state' });
      });
    });
    return out;
  }

  function hashStr(s) {
    var h = 0;
    for (var i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
    return Math.abs(h);
  }

  function buildFacilities(locations) {
    var list = [];
    var id = 1;
    locations.forEach(function (loc) {
      var h = hashStr(loc.country + loc.province + loc.city);
      /* 2 homes per city keeps directory full without crushing the browser */
      for (var n = 0; n < 2; n++) {
        var p = HOME_PREFIX[(h + n * 7) % HOME_PREFIX.length];
        var w = HOME_WORDS[(h + n * 13) % HOME_WORDS.length];
        var type = TYPES[(h + n * 3) % TYPES.length];
        var cap = 45 + ((h + n * 11) % 160);
        list.push({
          id: id++,
          name: p + ' ' + w,
          location: loc.city + ', ' + loc.province,
          city: loc.city,
          province: loc.province,
          country: loc.country,
          type: type,
          capacity: cap + ' seniors',
          specialties: SPECS[(h + n * 5) % SPECS.length],
          design: true
        });
      }
    });
    return list;
  }

  var locationsData = buildLocations();
  var seniorFacilities = buildFacilities(locationsData);

  /* Region-only rows so search finds "Alberta" or "Texas" even without a city typed */
  var regionIndex = [];
  Object.keys(CANADA).forEach(function (p) {
    regionIndex.push({ country: 'Canada', province: p, city: p, regionType: 'province', isRegion: true });
  });
  Object.keys(USA).forEach(function (s) {
    regionIndex.push({ country: 'USA', province: s, city: s, regionType: 'state', isRegion: true });
  });

  global.SHH_SILVER_LOCATIONS = {
    locationsData: locationsData,
    seniorFacilities: seniorFacilities,
    regionIndex: regionIndex,
    CANADA: CANADA,
    USA: USA,
    stats: {
      cities: locationsData.length,
      facilities: seniorFacilities.length,
      provinces: Object.keys(CANADA).length,
      states: Object.keys(USA).length
    }
  };

  /* Back-compat globals used by silver-paws.html */
  global.locationsData = locationsData;
  global.seniorFacilities = seniorFacilities;
  global.facilitiesData = seniorFacilities;
})(typeof window !== 'undefined' ? window : globalThis);
