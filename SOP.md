# ShibaHumanityHub · SOP (Standard Operating Procedure)

**Purpose:** How we work on this site every day so you do not reinvent the process.  
**Map of the site:** `SITE-FLOW.md` (what exists)  
**This file:** how to change it, check it, and ship it  

**Last updated:** 2026-08-08  
**Repo root:** `frontend-shibahumanityhub`  
**Live:** push `main` → Netlify → https://shibahumanityhub.com  

---

## 0. Golden rules (never skip)

1. **Proof over promises.** Design / when funded / when rails live. Never claim live checkout, live SAR deployments, live payouts, or live partner contracts without real proof.
2. **Heart first, human voice.** Not corporate AI. Not hype. No em dashes or en dashes in public copy.
3. **Static only.** HTML + CSS (local Tailwind) + vanilla JS. No React/Next unless you explicitly decide later.
4. **Dual doors stay linked.** Experience page ↔ program card both ways when both exist.
5. **Money rule.** Hold tokens for belonging. Steady USD rails for care when funded. See `whitepaper.html#treasury-path`.
6. **Ship only when ready.** `git push origin main` is production. Confirm before force or destructive git ops.

---

## 1. Before you touch anything

```text
cd frontend-shibahumanityhub
git status
git pull origin main
```

- Read `SITE-FLOW.md` for where the change lives.
- If the task is big (new experience, tokenomics, multi-page), write a 3-line plan first: **what · where · done when**.

---

## 2. Daily work loop

```text
1. Pull main
2. Make the smallest change that ships the intent
3. Check truth language + no em/en dashes
4. Check links (dual doors, nav, homepage cards)
5. Local eye-ball (or open the HTML in browser)
6. Commit with a clear message
7. Push main (Netlify)
8. Update SITE-FLOW.md checklist if structure changed
9. Update this SOP only if process changed
```

---

## 3. SOP by task type

### A. Edit copy on an existing page

| Step | Action |
|------|--------|
| 1 | Open the HTML or the JS that injects copy (e.g. `*-experience.js`) |
| 2 | Write like a human. Short. Specific. Proof labels where needed |
| 3 | Search file for em/en dashes (`—` `–`) and remove |
| 4 | Keep authenticity banners if the feature is still design-only |
| 5 | Commit + push |

**Public truth phrases (use freely):**  
design only · when funded · when rails are live · preview · not a live feed · receipts when real

---

### B. Edit a program card (constellation)

| Step | Action |
|------|--------|
| 1 | Edit entry in `js/programs-data.js` (title, shortDesc, fullHTML, category) |
| 2 | If title/slug/id mapping changes, update `js/program-pages-map.js` (or run generate script if you use it) |
| 3 | Thin page lives under `programs/<slug>.html` (uses `program-page.js`) |
| 4 | If an **experience** exists, put a clear link in fullHTML to that experience |
| 5 | If experience exists, put a link back to the thin program card |
| 6 | Update `SITE-FLOW.md` §8 / §9 if IDs or doors change |

**Categories must be exact:** `"$NIBBLES"` or `"$hopeseed"` (used by dual wheels + filters).

---

### C. Ship or upgrade a full experience page

Examples: `healing-hearts.html`, `k9-lifeline.html`, `new-beginnings.html`, `pay-it-forward.html`, `golden-paws.html`

| Step | Action |
|------|--------|
| 1 | Page shell: `*.html` (hero, meta, authenticity note, nav hooks) |
| 2 | Behavior: `js/*-experience.js` |
| 3 | Link from homepage featured cards (prefer experience over modal) |
| 4 | Link from matching program card in `programs-data.js` |
| 5 | Link from thin `programs/*.html` banner/footer |
| 6 | Link from related experiences (“more” panels) |
| 7 | Add/update row in `SITE-FLOW.md` §7 |
| 8 | Truth: design roster / design studio / no live ops until true |

**Pattern to copy:** New Beginnings or K9 Lifeline (panels + sticky path + mobile tabs).

---

### D. Add a brand-new program (constellation only)

| Step | Action |
|------|--------|
| 1 | Decide token: NIBBLES or hopeseed |
| 2 | Add object to `js/programs-data.js` with unique `id` |
| 3 | Add map entry in `js/program-pages-map.js` |
| 4 | Create thin page `programs/<slug>.html` (copy an existing thin page, set `data-program-id` + slug) |
| 5 | Optional: `node scripts/generate-program-pages.js` / `update-sitemap-programs.js` if those are your generators |
| 6 | Confirm dual wheels pick it up (`category` correct) |
| 7 | Update `SITE-FLOW.md` §8 counts (16+14=30 unless totals change) |

Do **not** invent an ID that collides. Prefer next free hopeseed/NIBBLES slot; document gaps (e.g. 13 unused).

---

### E. Homepage change (`index.html`)

| Step | Action |
|------|--------|
| 1 | Keep chapter order unless you also update the chapter rail |
| 2 | Featured program cards: prefer `window.location.href='experience.html'` over modal when experience exists |
| 3 | Keep `#hold-heart` and treasury truth consistent with whitepaper |
| 4 | Update `SITE-FLOW.md` §5 if section order or IDs change |

**Homepage spine (current):**  
hero → flywheel → blueprint → tokens → hold-heart → onchain → mercy-engine → programs → vision → close

---

### F. All-programs / dual flywheel nav

| Piece | File |
|--------|------|
| Always-on dual rotators + Command panel | `js/all-programs-command-nav.js` |
| Wheel engine (scroll/drag lists) | `js/programs-flywheel-nav.js` |
| Page shell | `all-programs.html` |

After nav JS changes: hard refresh, open Command, confirm both wheels render, open a program from each token.

---

### G. Tokenomics / payout / hold story

| Step | Action |
|------|--------|
| 1 | Canonical story: `whitepaper.html#treasury-path` |
| 2 | Short echo: `mercy-blueprint.html`, homepage `#hold-heart` |
| 3 | Product copy (PIF etc.): stable-first for care, hold for belonging |
| 4 | Never invent live treasury balances or live convert rates |

---

### H. Dash scrub / humanize (if copy got AI or dash-y)

```text
# Prefer project scripts if still valid:
node scripts/scrub-dashes-humanize.js
```

Then spot-check pages you care about. Do not blind-rewrite without reading.

---

## 4. Pre-ship checklist (every push)

Copy/paste mentally:

- [ ] No em dash `—` or en dash `–` in public copy you touched  
- [ ] No “live” claims for unfunded/unproven features  
- [ ] Dual doors still linked (if you touched those programs)  
- [ ] Homepage card still opens the right experience  
- [ ] `node --check` on any JS you edited  
- [ ] `git status` only shows files you meant to ship  
- [ ] Commit message says **what** and **why** in plain English  
- [ ] Pushed `main`  
- [ ] `SITE-FLOW.md` updated if structure changed  

---

## 5. Git ship commands

```powershell
cd C:\Users\ShibH\frontend-shibahumanityhub
git status
git add <files you changed>
git commit -m "Short clear description of the change"
git push origin main
git log -1 --oneline
```

**Do not** force-push main unless you explicitly know you need it.  
**Do not** commit secrets, private keys, or env files.

---

## 6. Truth labels cheat sheet

| Feature state | Say |
|---------------|-----|
| UI exists, no funding | design only / design studio / preview |
| Partners not signed | shortlist / candidate / not a contract |
| No live ops | not a live feed / no live deployments |
| Money path planned | when rails are live / when funded |
| Real proof exists | publish receipt / partner attestation / on-chain hash |

---

## 7. Voice cheat sheet

**Do**
- Short sentences. Concrete nouns (dog, bed, guardian, vet bill).
- First principles when explaining systems.
- Soft on people, hard on honesty.

**Do not**
- “Unlock unparalleled synergistic impact…”
- Fake urgency or fake metrics
- Em/en dashes
- Promise yield, salary-in-token, or guaranteed returns

**One-liners we already own**
- People helping people. Helping people.
- You hold so the engine stays strong. They receive so a soul can stay safe.
- Hold the heart. Pay the life.
- Proof over promises.

---

## 8. Quality bar (Elon / Bilyeu / Vitalik)

| Lens | Ask before shipping |
|------|---------------------|
| **Elon** | Is this first principles? Does the unit of impact make sense? |
| **Bilyeu** | Are incentives clean? Who wins for what behavior? |
| **Vitalik** | Is the mechanism honest? Coordination token ≠ payment rail? |

If it fails any one, rewrite before push.

---

## 9. Common fixes

| Symptom | Fix |
|---------|-----|
| Dual wheels empty | Confirm `programs-data.js` loads; `window.programs` set; hard refresh |
| Program click goes nowhere | Check `program-pages-map.js` ID → path |
| Experience not found from card | Add link in `fullHTML` + homepage card |
| Modal instead of full page | Change featured card to `href` / `location` to experience |
| Copy still says pay guardians in $NIBBLES only | Point to stable-first policy; fix page |
| Dashes crept back | Scrub file; search for `—` `–` |

---

## 10. Files you almost always touch

| Goal | Files |
|------|--------|
| Program story | `js/programs-data.js` |
| Program URL | `js/program-pages-map.js`, `programs/*.html` |
| Homepage | `index.html` |
| All programs UI | `all-programs.html`, `js/all-programs-command-nav.js`, `js/programs-flywheel-nav.js` |
| PIF | `pay-it-forward.html` + programs-data id 2 |
| NB packs | `new-beginnings.html`, `js/new-beginnings-experience.js` |
| K9 | `k9-lifeline.html`, `js/k9-lifeline-experience.js` |
| HH | `healing-hearts.html`, `js/healing-hearts-experience.js` |
| Token story | `whitepaper.html`, `mercy-blueprint.html`, `index.html#hold-heart` |
| Map of site | `SITE-FLOW.md` |
| How we work | `SOP.md` (this file) |

---

## 11. Session end ritual

```text
1. git status clean or intentional leftovers noted
2. main pushed if you meant to ship
3. SITE-FLOW.md date + checklist if structure changed
4. One sentence to yourself: what shipped / what is still design-only
```

---

## 12. When working with Grok / any agent

Tell the agent:
- Read `SITE-FLOW.md` + `SOP.md` first  
- Proof over promises  
- No em/en dashes in public copy  
- Push main only when you want production  
- Prefer experience pages over modals for featured programs  
- Keep dual doors linked  

---

## 13. Imagine visual pipeline (stills + motion)

**Goal:** Premium stills with Grok Imagine; motion when video tools are available; always ship a still path so the site never depends on video gen.

### Folders

| Path | Use |
|------|-----|
| `assets/imagine/stills/` | Source stills + named masters |
| `assets/images/imagine-*-hero.jpg` | Public web heroes / posters / OG |
| `assets/imagine/videos/` | Future Imagine video loops (when ZDR/upload allows) |
| `assets/videos/*-animated.mp4` | Existing program loops (keep as primary if present) |

### Current flagship stills (2026-08-08)

| Public file | Theme | Wired into |
|-------------|--------|------------|
| `imagine-k9-searchlight-hero.jpg` | Handler + K9 searchlight bond | K9 page, programs-data id 5 |
| `imagine-nb-pack-hero.jpg` | Welcome pack on floor | New Beginnings, programs-data id 3 |
| `imagine-pif-chain-hero.jpg` | Heart chain dog ↔ hand | Pay It Forward, programs-data id 2 |
| `imagine-hh-therapy-hero.jpg` | Therapy dog resting | programs-data Healing Hearts |
| `imagine-dual-flywheel-hero.jpg` | Amber + emerald dual gears | Homepage hero wash + `#hold-heart` |

### How to make a new still

1. Prompt Imagine: subject → mood → lighting → palette → **no text, no logos**  
2. Save to `assets/imagine/stills/<name>-still.jpg`  
3. Copy to `assets/images/imagine-<name>-hero.jpg`  
4. Wire poster / og:image / card image / Ken Burns fallback  
5. Prefer CSS Ken Burns (`animation` scale) under video so scroll-pause still looks alive  

### How to make video (when tool works)

1. Start from the **still** as frame 1  
2. `image_to_video` 6s, simple motion (dust, breath, slow push-in)  
3. Save to `assets/imagine/videos/` then copy/rename into `assets/videos/` if replacing a loop  
4. Keep still as `poster` always  
5. If video API fails (ZDR needs `upload_url`, rate limits): **ship stills + Ken Burns** and note in commit  

### Prompt palette cheat sheet

| Brand zone | Palette |
|------------|---------|
| $NIBBLES / dogs | amber gold, warm wood, soft night navy |
| $hopeseed / humans | emerald, soft teal, daylight hope |
| K9 | navy void, searchlight gold, cyan rim |
| PIF | rose, pink gold, charcoal |
| Dual flywheel | amber gear + emerald seed on deep space |

### Quality bar

- No garble text in frame (no titles baked into image)  
- No real-person likeness without reference  
- Reduced-motion: pause Ken Burns  
- Scroll freeze: pause video + Ken Burns where site already freezes media  

---

*Follow the SOP. Update the flow map. Ship truth. The rest is just work.*
