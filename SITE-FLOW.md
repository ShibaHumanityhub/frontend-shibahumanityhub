# ShibaHumanityHub · Site Flow (living map)

**Purpose:** One place to see how the website fits together. Update this when you add a page, change a path, or ship a new experience.

**Last updated:** 2026-08-08  
**Deploy:** `git push origin main` → Netlify → shibahumanityhub.com  
**Stack:** Static HTML + local Tailwind + vanilla JS (no React)

---

## 1. The mission in one breath

Two flywheels. One heart.

| Token | Domain | Count |
|--------|--------|-------|
| **$NIBBLES** | Dogs + animal mercy | 16 programs |
| **$hopeseed** | Kids, families, human dignity | 14 programs |

**Hold** tokens to stand with the mission.  
**When rails are live:** tax → impact wallet → convert to steady money for care → deliver → prove.  
**Care / guardian / adopter support** → USD stable rails (USDT or USDC by venue).  
**Belonging / circles / stories** → hold $NIBBLES or $hopeseed.  
**Optional small token bonuses** only with proof and patience, never as the only way someone eats.

Full write-up: `whitepaper.html#treasury-path`

---

## 2. How money is meant to move (when rails are live)

```text
HOLDER holds $NIBBLES / $hopeseed
        │
        ▼
TRANSFER (buy / sell / transfer) · 2% tax (design)
        │
        ├─ 1% → LP / ecosystem give-back (as designed)
        └─ 1% → Impact Wallet
                    │
                    ├─ Convert most → USD stables (care delivery)
                    ├─ Keep some → native reserve / LP health
                    └─ Publish receipts when real
                              │
                              ▼
                    PROGRAMS pay food, vet, guardians, partners
                    + optional vested native thank-yous
                              │
                              ▼
                    PROOF · stories · partner letters · books
```

**Circles of Mercy** (25k · 100k · 250k holds) = belonging, priority, naming, story rights.  
Not a yield product. Not a wage for beneficiaries.

---

## 3. Two kinds of pages (do not confuse them)

| Kind | What it is | Examples |
|------|------------|----------|
| **Experience pages** | Full product UI (studio, bond board, pack builder, roster) | `healing-hearts.html`, `k9-lifeline.html`, `new-beginnings.html`, `pay-it-forward.html`, `golden-paws.html` |
| **Program cards** | Standard program story + circles + sponsor CTA from `programs-data.js` | `programs/*.html` via `program-page.js` |

**Rule:** Featured programs should open the **experience** when one exists. Card pages still exist for the constellation and should **link into** the experience.

---

## 4. Main visitor paths (what people do)

### Path A · First time (cold)

```text
index.html (hero)
  → #tokens (meet $NIBBLES + $hopeseed)
  → #hold-heart (hold vs pay)
  → #programs (featured)
  → all-programs.html (dual flywheel command nav)
  → one program experience OR programs/*.html
```

### Path B · Holder / believer

```text
index.html
  → whitepaper.html (+ #treasury-path)
  → mercy-blueprint.html (optional lead magnet)
  → all-programs.html (spin both wheels)
  → hold + circles language
```

### Path C · Dog mercy deep dive

```text
index / all-programs
  → healing-hearts.html          (network model · Star Souls nest)
  → k9-lifeline.html             (searchlight bond · SAR)
  → new-beginnings.html          (pack studio)
  → golden-paws.html             (senior forever homes)
  → silver-paws.html             (senior human visits · not dog placement)
  → pay-it-forward.html          (adoption chain product)
  → shelters.html                (Beautiful Souls)
```

### Path D · Human / hopeseed deep dive

```text
all-programs.html#hopeseed
  → programs/orphan-christmas.html
  → programs/guardian-angel-wallet-program.html
  → programs/birthday-guarantee-program.html
  → …other hopeseed cards
```

### Path E · Fun / virality

```text
spin-the-wheel.html
shiba-barn-table.html
shelters.html
```

---

## 5. Homepage flow (`index.html`) · top to bottom

| Order | ID / section | Job |
|------:|--------------|-----|
| 1 | `#hero` | Emotion + who we are + CTAs |
| 2 | `#flywheel` | First principles · 5-step loop |
| 3 | `#blueprint` | Email → Mercy Blueprint |
| 4 | `#tokens` | Dual medallions · contracts |
| 5 | `#hold-heart` | Hold heart · pay life |
| 6 | `#onchain` | Wallet / balances / ripples (read-only) |
| 7 | `#mercy-engine` | Simulator · circles · deeper doors |
| 8 | `#programs` | Featured cards both flywheels |
| 9 | `#vision` | Soft close of story |
| 10 | `#close` | Join / final CTA |

**Chapter rail (desktop):** Origin → Flywheel → Tokens → Hold → Programs → Join

---

## 6. All Programs hub (`all-programs.html`)

| Piece | Job |
|--------|-----|
| **Command nav** | Always-on dual rotators ($NIBBLES + $hopeseed titles) · `js/all-programs-command-nav.js` |
| **Command panel** | Full dual scroll/drag wheels · jump filters |
| **Grid** | All 30 cards · filter by token |
| **`#nibbles` / `#hopeseed`** | Section anchors for each flywheel |

**Data source:** `js/programs-data.js`  
**Page map:** `js/program-pages-map.js`  
**Wheels engine:** `js/programs-flywheel-nav.js`

---

## 7. Experience pages (full product UIs)

Update this table when you ship or rename an experience.

| Experience URL | Program family | Notes |
|----------------|----------------|-------|
| `pay-it-forward.html` | Pay It Forward · Mercy Chain (id 2) | Product = Adoption Chain. Card = funding model. |
| `new-beginnings.html` | New Beginnings packs (id 3) | Pack studio · S/M/L · partners · receipt mock |
| `healing-hearts.html` | Healing Hearts (id 4) | Network model · Star Souls under HH |
| `k9-lifeline.html` | Global Disaster K9 (id 5) | Searchlight bond · not live ops |
| `golden-paws.html` | Golden Paws (id 8) | Senior forever homes · dogs |
| `silver-paws.html` | Silver Paws (id 14) | Senior **human** visits |
| `golden-years.html` | Golden Years (id 15) | Companion matching (humans) |
| `star-souls.html` | Nested in HH | Redirect / deep link into `#hhx-stars` |
| `shelters.html` | Beautiful Souls | Roster / shelter faces |
| `shiba-barn-table.html` | Barn table | Social / BBQ experience |
| `spin-the-wheel.html` | Virality | Preview spin until rails live |
| `unified-rescue-registry.html` | Registry (id 9) | Soulbound passports design |
| `whitepaper.html` | Docs | Tokenomics + treasury path |
| `mercy-blueprint.html` | Docs / lead | Vision PDF-style page |

---

## 8. Program IDs (constellation)

From `js/program-pages-map.js` / `js/programs-data.js`.  
Thin page = `programs/<slug>.html`.

### $NIBBLES (dogs) · 16

| ID | Title | Thin page | Experience if any |
|----|--------|-----------|-------------------|
| 0 | Corporate Barn Pod Sponsorship | `programs/corporate-barn-pod-sponsorship.html` | — |
| 1 | Rescue Passport Soulbound NFTs | `programs/rescue-passport-soulbound-nfts.html` | — |
| 2 | Pay It Forward Mercy Chain | `programs/pay-it-forward-mercy-chain.html` | **`pay-it-forward.html`** |
| 3 | New Beginnings Home Start Packs | `programs/new-beginnings-home-start-packs.html` | **`new-beginnings.html`** |
| 4 | Healing Hearts Therapy Dog Network | `programs/healing-hearts-therapy-dog-network.html` | **`healing-hearts.html`** |
| 5 | Global Disaster K9 Response Units | `programs/global-disaster-k9-response-units.html` | **`k9-lifeline.html`** |
| 6 | Second Chance K9 Prison Program | `programs/second-chance-k9-prison-program.html` | — |
| 7 | Rainbow Bridge Hospice & Sequoia Legacy | `programs/rainbow-bridge-hospice-and-sequoia-legacy-program.html` | — |
| 8 | Golden Paws Retirement Program | `programs/golden-paws-retirement-program.html` | **`golden-paws.html`** |
| 9 | Unified Rescue Registry | `programs/unified-rescue-registry.html` | **`unified-rescue-registry.html`** (root twin) |
| 10 | Shiba Barn Sanctuary Network | `programs/shiba-barn-sanctuary-network.html` | — |
| 11 | Forever Home Families Program | `programs/forever-home-families-program.html` | — |
| 12 | Shelter-to-Barn Lifelong Program | `programs/shelter-to-barn-lifelong-program.html` | — |
| 14 | Silver Paws Therapy Visits | `programs/silver-paws-therapy-visits-program.html` | **`silver-paws.html`** |
| 15 | Golden Years Companion Program | `programs/golden-years-companion-program.html` | **`golden-years.html`** |
| 16 | Service Dog Freedom Program | `programs/service-dog-freedom-program.html` | — |

### $hopeseed (humans) · 14

| ID | Title | Thin page |
|----|--------|-----------|
| 17 | Orphan Christmas | `programs/orphan-christmas.html` (rich seasonal build) |
| 18 | No Hungry Weekend Backpacks Global Edition | `programs/no-hungry-weekend-backpacks-global-edition.html` |
| 19 | Guardian Angel Wallet Program | `programs/guardian-angel-wallet-program.html` |
| 20 | Bullyproof Schools Initiative | `programs/bullyproof-schools-initiative.html` |
| 21 | College Bound Vault | `programs/college-bound-vault.html` |
| 22 | Miracle Fight Fund | `programs/miracle-fight-fund.html` |
| 23 | Birthday Guarantee Program | `programs/birthday-guarantee-program.html` |
| 24 | Pay-to-Play-It-Forward Gear Library | `programs/pay-to-play-it-forward-gear-library.html` |
| 25 | Santa’s Workshop Live | `programs/santa-s-workshop-live.html` |
| 26 | Wish NFT Program | `programs/wish-nft-program.html` |
| 27 | Champions Table Program | `programs/champions-table-program.html` |
| 28 | Dream Room Makeovers Program | `programs/dream-room-makeovers-program.html` |
| 29 | Special Needs Support Bridge | `programs/special-needs-support-bridge-program.html` |
| 30 | Sibling Keepers Program | `programs/sibling-keepers-program.html` |

> Note: ID **13** is unused in the map (gap is normal; do not invent a program to fill it without a decision).

---

## 9. Important dual doors (same mission, two URLs)

| Product idea | Funding / card door | Experience / product door |
|--------------|---------------------|---------------------------|
| Pay It Forward | `programs/pay-it-forward-mercy-chain.html` | `pay-it-forward.html` |
| New Beginnings | `programs/new-beginnings-home-start-packs.html` | `new-beginnings.html` |
| Healing Hearts | `programs/healing-hearts-therapy-dog-network.html` | `healing-hearts.html` |
| Global K9 | `programs/global-disaster-k9-response-units.html` | `k9-lifeline.html` |
| Golden Paws | `programs/golden-paws-retirement-program.html` | `golden-paws.html` |

**Always keep both doors linked both ways.**

---

## 10. Key JS modules

| File | Job |
|------|-----|
| `js/programs-data.js` | All 30 titles, shortDesc, fullHTML, categories |
| `js/program-pages-map.js` | ID → thin page URL |
| `js/program-page.js` | Renders thin program pages |
| `js/programs-flywheel-nav.js` | Dual scroll wheels (dropdown + command panel) |
| `js/all-programs-command-nav.js` | All-programs always-on dual rotators + Command panel |
| `js/healing-hearts-experience.js` | HH full experience |
| `js/k9-lifeline-experience.js` | K9 bond experience |
| `js/new-beginnings-experience.js` | Pack studio |
| `js/golden-paws-experience.js` | Golden Paws experience |
| `js/glossary.js` | Plain terms ⓘ |
| `js/shared-animations.js` | Shared motion |

---

## 11. Contracts (truth lock)

| Token | Contract |
|--------|----------|
| $NIBBLES | `0x20a90E0A5346abF59d8244F6c193d0Bb13F7E5CF` |
| $hopeseed | `0xF7a5c5634d62e428fD1dbd7292e6925eE8C90833` |

Chain: **Shibarium**. Explorer: shibariumscan.io

---

## 12. Voice rules (public copy)

- Heart first. Human. Not corporate AI.
- No em dashes or en dashes in public copy.
- Proof over promises. Design / when funded / when rails live.
- Never claim live deployments, live checkout, or live payouts without proof.
- Elon / Bilyeu / Vitalik bar: first principles, real incentives, mechanism honesty.

---

## 13. How to update this file (you, going forward)

When you change something, tick and edit:

- [ ] New **experience page** → add row in §7  
- [ ] New **program** → add row in §8 + regenerate map if using script  
- [ ] Changed **dual door** links → update §9  
- [ ] Changed **homepage section order** → update §5  
- [ ] Changed **money / payout policy** → update §2 + whitepaper  
- [ ] Shipped to main → bump **Last updated** at top  

**Ship command:**  
`git add -A ; git commit -m "…" ; git push origin main`

---

## 14. Seed focus (priority when funding lands)

1. Healing Hearts  
2. Global Disaster K9  
3. Pay It Forward  
4. Orphan Christmas  

Everything else: constellation as capacity grows.

---

*This file is the map. The site is the product. Keep them in sync so you never have to rebuild the whole picture from memory.*
