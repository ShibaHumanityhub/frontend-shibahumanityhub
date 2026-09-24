# Shiba Humanity Hub — P0 Implementation Spec
**For:** whoever edits the Netlify/static repo  
**Domain:** https://shibahumanityhub.com  
**Tokens (exact spelling):** `$NIBBLES` · `$hopeseed`  
**Owner:** Site & UX · Copy polish: Story Voice · Claim lock: Rails & Trust  
**Date:** 2026-09-22 (America/Edmonton)  
**Based on:** live HTML audit + desktop/mobile hero screenshots  
**Claim lock:** Rails & Trust **APPROVE overall** with required CHANGEs folded in below (rev 2)

**Rev 3:** Exact locked paste is **Appendix A** (mirrored at `shh-claim-lock-copy.md`). Use exact chip labels/tooltips, exact footer string, and exact Blueprint privacy paragraph + form microcopy. Story Voice may polish surrounding stub prose only — do not soften those three locked strings.

→ Jump: [Appendix A — Locked claim paste](#appendix-a--locked-claim-paste-rails--trust--do-not-paraphrase)

---

## 0. Goals (mass-adoption clarity)

1. First screen: **one promise + four equal doors** — no token addresses, wallet, or tax math above the fold.  
2. **One shared global nav + real footer** on every page.  
3. **Programs entry = seed-first** (4), then all ~30.  
4. **Sponsor With Love** must not dump to the raw all-programs grid or imply live sponsorship.  
5. **Clean URLs** + stubs: `/privacy` `/terms` `/contact` `/faq`.  
6. Keep the **authenticity / pre-rails banner** (truth strip). Never invent live impact metrics. Label **Live / Prototype / Planned / In progress**.

**Approved as-is by Rails & Trust:** Sponsor kill · seed hub · authenticity banner placement intent.

---

## 1. Routes & files

### New routes (clean URLs — Netlify `_redirects` or pretty paths)

| Route | Purpose | Status badge on page |
|-------|---------|----------------------|
| `/` | Home (slimmed) | — |
| `/programs` | Seed-focus hub (NEW primary Programs entry) | Delivery **Planned** · rails **In progress** · contracts **Live** (banner) |
| `/programs/all` or keep `/all-programs` | Full constellation | Redirect `/all-programs` → `/programs/all` preferred |
| `/shelters` | Beautiful Souls (Meet the Souls) | **Prototype** clocks · partner feeds **In progress** |
| `/how-it-works` | Flywheel + status (or home `#how-it-works`) | Status · pre-rails · rails **In progress** |
| `/whitepaper` | Docs | Live (resolving page) |
| `/mercy-blueprint` | Docs lead magnet | Live (resolving page + **Live** email capture) |
| `/privacy` | Stub — must cover **live** Blueprint email capture now | NEW |
| `/terms` | Stub | NEW |
| `/contact` | Stub | NEW |
| `/faq` | Stub | NEW |
| `/pay-it-forward` | Seed program | Keep |

**Netlify `_redirects` (add):**
```
/privacy    /privacy.html   200
/terms      /terms.html     200
/contact    /contact.html   200
/faq        /faq.html       200
/programs   /programs.html  200
/how-it-works  /how-it-works.html  200
# optional clean aliases
/meet-the-souls  /shelters  302
```

Also strip `.html` from internal links sitewide where redirects exist.

### Shared partials (implement once)

- `partials/nav.html` (or JS include) — used on **every** page  
- `partials/footer.html` — used on **every** page (must include trust line — §3)  
- `partials/authenticity-banner.html` — status strip under nav (or top of main)

---

## 2. Shared global nav

**Proposed IA (Grok Bot / founder):**  
`Home · Programs · Meet the Souls · How it works · Docs · Community`

### Desktop

| Label | Target | Notes |
|-------|--------|-------|
| Logo / Home | `/` | Keep animated logo treatment |
| Programs | `/programs` | Dropdown optional: 4 seeds + “All programs” |
| Meet the Souls | `/shelters` | Was “Beautiful Souls” — same destination |
| How it works | `/how-it-works` **or** `/#how-it-works` | Prefer dedicated thin page if home is slimmed |
| Docs | dropdown: Whitepaper `/whitepaper`, Mercy Blueprint `/mercy-blueprint`, FAQ `/faq` | |
| Community | dropdown or direct: X `https://x.com/Shibhumanityhub` | Add Discord later when live |
| **Right CTA** | `Hold & learn` → `/#tokens` (after doors / on tokens section) | **Not** “All Programs”, **not** “Sponsor” |

### Delete from current nav

- “Tokens” as top-level (tokens live below doors / in How it works)  
- “The Flywheel” → `/` self-link  
- “Pay It Forward” as peer top-level (keep under Programs seed list + featured)  
- Yellow **All Programs** nav CTA (move to Programs page / seed hub)  
- Mobile laundry list: Barn Table BBQ, Corporate Barn Pods, K9 Lifeline, Golden Years, Star Souls as flat peers — nest under Programs

### Mobile

Same six items + CTA. Programs accordion: Seed focus (4) then All programs. Legal only in footer.

---

## 3. Real footer (every page)

Replace link-less thank-you-only footer with link grid **above** existing thank-you + disclaimer.

| Column | Links |
|--------|-------|
| Programs | Seed focus `/programs` · All programs `/all-programs` · Pay It Forward · Meet the Souls |
| Docs | Whitepaper · Mercy Blueprint · FAQ · How hold becomes help (`/whitepaper#treasury-path`) |
| Community | X |
| Legal & contact | Contact · Privacy · Terms · Status (`/#status` or how-it-works status block) |

### Required trust line (Rails & Trust — every page footer)

**Use exact string from Appendix A2 — do not paraphrase:**

```
Incorporated · Charity rails in progress · Contracts live on Shibarium · Delivery waits for rails
```

Place below the link grid and above or beside the emotional closer (or beside legal links). Keep existing “not financial advice” disclaimer. Do not invent registration timelines beyond this line. Optional micro-link row once stubs exist: Privacy · Terms · Contact · FAQ · NFA.

---

## 4. Authenticity banner (keep — approved)

Persist the honest status strip (currently mid-flywheel; move **under nav / above hero** or keep immediately after hero doors):

> Incorporated. Charity rails in progress. Receipts and full legal framing activate on approval. Contracts are live. Delivery claims wait for rails.

Chip rails/receipts/partners as **`In progress`** (not Planned-only, not Live).

**Rules:** Rails & Trust owns claim language. Site & UX owns placement/visibility. Never promote delivery numbers as live.

---

## 5. Homepage hero — one promise + four equal doors

### Keep

- Eyebrow: Two flywheels · one heart · Shibarium · Since 2025  
- Title treatment (SHIBA HUMANITY HUB)  
- “People helping people. Helping dogs. Helping people.”  
- Promise paragraph with `$NIBBLES` / `$hopeseed` / rails / prove ⓘ (Story Voice may tighten length for mobile)  
- Gear/cosmic aesthetic; improve text contrast over busy BG (scrim behind text)

### Hero tense (Rails & Trust CHANGE + Story Voice polishing)

Present-tense “breath / lives breathe now” lines must shift to **designed / when rails** framing.  
Example direction (Story Voice finalizes wording):

- Prefer: “You hold ⓘ. The flywheel is designed to turn ⓘ. When rails are live, real lives get room to breathe.”  
- Avoid implying delivery or breathing-room outcomes are live today.

### Delete from hero (move below doors)

| Remove from hero | Move to |
|------------------|---------|
| CTA “Meet the tokens” | Tokens section below |
| CTA “All 30 programs” | Programs hub / nav |
| Row: Your Ripples simulator · Adoption Chain · Global K9 · How hold becomes help | Engine / seed / docs |
| Any contract addresses, wallet connect, tax %, circles math | Tokens / On-chain / How it works **below** doors |

### Add — four equal doors (same visual weight)

| # | Label | Target | Micro-line | Status chips |
|---|-------|--------|------------|--------------|
| 1 | Help dogs | `/#tokens` → `$NIBBLES` card **or** `/programs` filtered dogs | `$NIBBLES` · dogs & healers | Contracts **Live** · delivery **Planned** · rails **In progress** |
| 2 | Help kids & families | `/#tokens` → `$hopeseed` card **or** `/programs` kids | `$hopeseed` · kids & families | Contracts **Live** · delivery **Planned** · rails **In progress** |
| 3 | Meet Beautiful Souls | `/shelters` | Faces · clocks until partner feeds | **Prototype** · partner feeds **In progress** |
| 4 | How it works + status | `/how-it-works` or `/#how-it-works` | Status · pre-rails | Chip: **`Status · pre-rails`** · rails **`In progress`** — **do not** label the door “Live” without naming what is live (e.g. “contracts Live · delivery waits”) |

**Layout:** 2×2 mobile, 4-across `sm+`. Equal height cards/buttons.

**Do not** put wallet connect or contract copy inside the doors.

---

## 6. Homepage section map — cut the ~14-block overload

### Current major blocks (live)

1. `hero`  
2. `flywheel` (+ oath + status + seed/partner/proof cards + 5-step loop)  
3. `blueprint` (email lead magnet)  
4. `tokens` (cards + addresses)  
5. `hold-heart` (hold vs steady care + tax path)  
6. `onchain` (wallet, circles, living ledger, demo ripples)  
7. `mercy-engine` (rotators + personal ripples simulator — large)  
8. `programs` (mixed featured, not seed-first)  
9. `shelters` (teaser)  
10. `vision`  
11. `close` (Whitepaper / Sponsor / Join)  
12. `footer`  
(+ chapter rail, ambient, modals)

### Target homepage order (slim)

| Order | Section | Action |
|-------|---------|--------|
| 0 | Shared nav + authenticity banner | NEW placement |
| 1 | Hero + **four doors only** | REWRITE CTAs + tense |
| 2 | How it works + status (short) | KEEP flywheel truth + 5 steps; **cut** long oath block to Docs/Blueprint or collapse |
| 3 | Tokens (addresses, read-only connect) | KEEP; first place for contracts/wallet |
| 4 | Seed focus (4 cards) → link All 30 | REPLACE mixed programs grid |
| 5 | Beautiful Souls teaser | KEEP short; link `/shelters` |
| 6 | Close: Docs · Stand with a program · Community | FIX Sponsor |
| 7 | Footer with links + **trust line** | REPLACE |

### Demote / remove from homepage (keep reachable elsewhere)

| Block | Disposition |
|-------|-------------|
| Full personal Ripples simulator (`mercy-engine` bulk) | Move to `/how-it-works` or `/spin-the-wheel` / deep link; leave one-line “Try Your Ripples →” |
| Duplicate hold/tax explainer if same as how-it-works | Merge into How it works |
| Living ledger demo spam above fold | Keep in onchain **below** tokens, collapsed by default on mobile |
| Blueprint form | Keep one compact band OR move to Docs — email capture is **Live** (must be disclosed on `/privacy`) |
| Chapter rail (Origin/Flywheel/…) | Optional; hide on mobile if nav is clear |
| “Sponsor a Program” / `sponsorProgram()` → `all-programs.html#all-programs-grid` | **Delete behavior** — see §8 (**approved**) |

---

## 7. Seed-focus Programs entry (**approved**)

### New page: `/programs` (primary from nav)

1. H1: Programs  
2. Short lede: “We start narrow and real. Full constellation as capacity grows.”  
3. **Seed focus** (4 equal cards):

| Seed | Link (existing) |
|------|-----------------|
| Healing Hearts | `/healing-hearts` or program page |
| Global K9 | `/k9-lifeline` / Global Disaster K9 program URL |
| Pay It Forward | `/pay-it-forward` |
| Orphan Christmas | `/programs/orphan-christmas` |

4. Badge each: `Seed focus` · token flywheel (`$NIBBLES` or `$hopeseed`) · delivery **Planned** · rails **In progress**  
5. Below: CTA **See all ~30 programs** → `/all-programs`  
6. Do **not** open nav Programs directly to the raw grid.

### Homepage programs section

Mirror the same 4 seeds + “See all” — not Rainbow Bridge / Sibling Keepers / etc. as the first face.

---

## 8. Fix “Sponsor With Love” (**approved**)

### Current (broken for trust)

- Close card: “Sponsor a Program” / button **Sponsor With Love**  
- JS `sponsorProgram()` sets `shh-sponsor-intent` and goes to `all-programs.html#all-programs-grid`  
- Hero “All 30 programs” uses `.premium-sponsor-btn` (looks like sponsor)

### Required

| Element | Change to |
|---------|-----------|
| Card title | **Stand with a program** (or Story Voice equivalent — not “Sponsor” until rails allow) |
| Subcopy | “Learn the story. Holding is how support is designed when rails are live.” |
| Button | **Explore seed programs** → `/programs` |
| Badge | Remove `MOST IMPACTFUL` or → `LEARN THE PATH` |
| `sponsorProgram()` | Delete or retarget to `/programs` only; **never** raw grid dump |
| CSS | Stop using `.premium-sponsor-btn` on non-sponsor CTAs (hero All 30) |

No checkout, no “save a soul for 25k” language on close cards unless Rails & Trust explicitly clears it and UX labels **Planned**.

---

## 9. Stub pages (`/privacy` `/terms` `/contact` `/faq`)

Minimal shared chrome: nav + banner + footer (with trust line).

### `/privacy` (Rails & Trust — required)

- Title Privacy  
- H2: Mercy Blueprint email capture (or under Information we collect)  
- **Paste exact stub paragraph from Appendix A3** (present-tense; do not defer disclosure until charity approval)  
- Keep counsel placeholders as listed in §L3  
- Contact / deletion path via `/contact`  
- Fuller policy may land on charity approval — but live capture must be disclosed **now**  
- On homepage Blueprint form: paste **exact** form microcopy from Appendix A3  

### `/terms`

- Title Terms of use  
- Not financial advice; pre-rails; tokens info only; no delivery guarantee  
- Link whitepaper  

### `/contact`

- X link, email placeholder (founder to supply), optional Formspree  
- No fake phone/address  

### `/faq` (6–8 Qs — Story Voice drafts; Rails & Trust locks answers)

Suggested topics: What is live today? What are `$NIBBLES` / `$hopeseed`? Can I sponsor a dog/child right now? What are rails? How do I help before rails? Where are contracts? What is Beautiful Souls? Where is the whitepaper? What email do you collect?

---

## 10. Live / Prototype / Planned / In progress (sitewide hygiene)

**Implement chips with exact labels + tooltips from Appendix A1.** Mapping summary (full “Never under Live” list is in §L1):

| Label | Use for |
|-------|---------|
| **Live** | Shibarium contracts + explorer links · resolving public pages · Blueprint email capture **as capture only** · authenticity strip as accurate status text |
| **In progress** | Charity rails, receipts, partner agreements, “when rails are live” funding path |
| **Prototype** | Beautiful Souls clocks · Ripples / Mercy Wheel demos · Living Ledger preview · Healing Hearts pipeline demos · any Save/Sponsor UI that does not complete a real placement |
| **Planned** | Pod sponsorship with attestations · soulbound passports · trip raffles · full constellation delivery · operated Global Disaster K9 units |

Every CTA that implies money→life must be **Planned**-labeled (and rails **In progress**) or removed until cleared.

**Do not** mark a whole door or page “Live” without saying *what* is live.

---

## 11. Implementation checklist (repo)

- [ ] Extract `nav` + `footer` + authenticity banner; include on all HTML pages  
- [ ] Footer includes required trust line (§3)  
- [ ] Status chips use four-way set with **exact Appendix A1 labels + tooltips**
- [ ] Blueprint form microcopy exact from Appendix A3 sitewide  
- [ ] Rewrite `#hero` CTA block → four doors; Door 4 = `Status · pre-rails` + In progress on rails  
- [ ] Hero breath/present-tense lines → designed / when-rails (Story Voice)  
- [ ] Move first contract/wallet/tax UI to below doors (`#tokens` / `#onchain`)  
- [ ] Add `/programs` seed hub; point Programs nav there  
- [ ] Slim homepage section order per §6  
- [ ] Replace Sponsor close card + kill `sponsorProgram()` grid dump  
- [ ] Add stub HTML + `_redirects`; **privacy covers live email capture**  
- [ ] Global link hygiene: prefer clean URLs; fix `all-programs.html` hard refs  
- [ ] Mobile pass: four doors readable over gear BG; hamburger = new IA only  
- [ ] a11y: door buttons as links with clear names; focus states; don’t rely on color alone for token names  

---

## 12. Handoffs

| Who | Needs |
|-----|-------|
| **Story Voice** | Door micro-lines; Sponsor→Stand with rename; stub/FAQ voice; **hero designed/when-rails tense** (pack may already be with founder) |
| **Rails & Trust** | Locked paste applied (rev 3 / Appendix A). Re-check only if copy drifts from exact strings |
| **Repo editor** | This file as build sheet; screenshots in `/workspace/shh-site-ux/` (`hero-desktop-before.png`, `hero-mobile-before.png`) |

---

## 13. Success criteria

A new visitor on phone sees: promise → four doors → can reach dogs, kids, faces, or status in one tap; never land on a raw 30-grid from a “Sponsor” button; footer always has Privacy/Terms/Contact **and** the trust line; Programs always opens seed-first; token addresses appear only after the doors; status chips never call rails/receipts/partners “Live.”

---

## Appendix A — Locked claim paste (Rails & Trust · do not paraphrase)

**File:** `/workspace/shh-claim-lock-copy.md`

### A1. Status chips (exact)

| Chip | Exact label | Tooltip / helper (exact) |
|------|-------------|--------------------------|
| Live | `Live` | Real and usable today: on-chain contract, public page, or verified process you can complete now. |
| In progress | `In progress` | Work started; not finished. Charity rails, receipts, partner agreements, legal framing. |
| Prototype | `Prototype` | Demo / vision UI for learning. Simulated data; not a live placement, sponsor feed, or delivery. |
| Planned | `Planned` | Intended after rails, funding, and partners. Do not present as available. |

**Never under `Live`:** Ground delivery · charity-complete / approved rails · sponsorship that moves money to a beneficiary today · “helping now” / “saves lives” as present-tense operations · partner names or euthanasia clocks as verified live cases · demo metrics / “Est. lives”.

Door 4 chip: `In progress` or micro `Status · pre-rails` — do not label the door bare `Live` without naming what is live.

### A2. Mandatory footer trust line (every page) — exact string

```
Incorporated · Charity rails in progress · Contracts live on Shibarium · Delivery waits for rails
```

### A3. Privacy — Blueprint email (live now) — locked paragraph

On the homepage, “Get The Mercy Blueprint” asks for your email and submits it through a third-party form service so we can send or unlock the Blueprint materials. That capture is live. Submitting your email means you are asking us to share vision and program materials with you. It does **not** enroll you in a live sponsorship, donation receipt, or beneficiary program. You can use the direct Blueprint page without email where that link is offered.

`[PLACEHOLDER: Formspree (or successor) processor name, retention, and subprocessors — confirm with counsel]`  
`[PLACEHOLDER: whether Blueprint emails are also used for infrequent mission updates; if yes, say so and offer unsubscribe]`  
`[PLACEHOLDER: full legal entity name, jurisdiction, registered address, privacy contact email]`

**One-line under the Blueprint form field (sitewide):**  
Email for Blueprint materials only. Not a live donation or sponsorship. [Privacy]

*Story Voice may polish surrounding stub prose; do not soften chips, footer string, or the not-sponsorship sentence without Rails & Trust.*
