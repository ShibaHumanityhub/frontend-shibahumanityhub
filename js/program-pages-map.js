/** Auto-generated. Run: node scripts/generate-program-pages.js */
window.SHH_PROGRAM_PAGES = {
 "0": "programs/corporate-barn-pod-sponsorship.html",
 "1": "programs/rescue-passport-soulbound-nfts.html",
 "2": "programs/pay-it-forward-mercy-chain.html",
 "3": "programs/new-beginnings-home-start-packs.html",
 "4": "programs/healing-hearts-therapy-dog-network.html",
 "5": "programs/global-disaster-k9-response-units.html",
 "6": "programs/second-chance-k9-prison-program.html",
 "7": "programs/rainbow-bridge-hospice-and-sequoia-legacy-program.html",
 "8": "programs/golden-paws-retirement-program.html",
 "9": "programs/unified-rescue-registry.html",
 "10": "programs/shiba-barn-sanctuary-network.html",
 "11": "programs/forever-home-families-program.html",
 "12": "programs/shelter-to-barn-lifelong-program.html",
 "14": "programs/silver-paws-therapy-visits-program.html",
 "15": "programs/golden-years-companion-program.html",
 "16": "programs/service-dog-freedom-program.html",
 "17": "programs/orphan-christmas.html",
 "18": "programs/no-hungry-weekend-backpacks-global-edition.html",
 "19": "programs/guardian-angel-wallet-program.html",
 "20": "programs/bullyproof-schools-initiative.html",
 "21": "programs/college-bound-vault.html",
 "22": "programs/miracle-fight-fund.html",
 "23": "programs/birthday-guarantee-program.html",
 "24": "programs/pay-to-play-it-forward-gear-library.html",
 "25": "programs/santa-s-workshop-live.html",
 "26": "programs/wish-nft-program.html",
 "27": "programs/champions-table-program.html",
 "28": "programs/dream-room-makeovers-program.html",
 "29": "programs/special-needs-support-bridge-program.html",
 "30": "programs/sibling-keepers-program.html"
};
window.SHH_programPageUrl = function (id) {
 var map = window.SHH_PROGRAM_PAGES || {};
 var key = id;
 if (map[key] == null && map[String(id)] != null) key = String(id);
 return map[key] || ("programs/program-" + id + ".html");
};
