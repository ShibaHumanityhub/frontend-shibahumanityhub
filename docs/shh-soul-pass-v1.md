# Shiba Humanity Hub · Soul Pass v1
**Date:** 2026-09-24, 2:35 PM (Edmonton time) · **Site crawled:** https://shibahumanityhub.com (live, curl) · **Tokens:** `$NIBBLES` · `$hopeseed`
**Scope:** drafting only. Nothing on the live site was touched. No other agents were messaged.

**Locked, and left alone in this file:** chips `Live` | `In progress` | `Prototype` | `Planned` · footer trust line `Incorporated · Charity rails in progress · Contracts live on Shibarium · Delivery waits for rails` · form microcopy `Email for Blueprint materials only. Not a live donation or sponsorship.` · hero H1 **Mercy with a front door** and the locked hero line/subhead in `shh-hero-locked-A.md`.

**How I wrote the new copy:** every dog, kid or volunteer in the new lines is written as *the kind of moment this exists for* ("somewhere tonight…", "a dog like…"). None of them is a real case, and nothing says care has been delivered. Present tense only for things that are live today: the contracts, the site, the Blueprint email capture, read-only wallet connect.

---

## 1. Where things stand (crawl of 2026-09-24)

### What changed since the earlier audit
| Earlier finding | Now |
|---|---|
| Legal/contact pages 404 | **Fixed.** `/about` `/privacy` `/terms` `/contact` `/faq` `/how-it-works` all return 200. But privacy shows 17 visible `[PLACEHOLDER]`s, terms 11, and contact 2, including **`[PLACEHOLDER: public email]`** as the only way to reach you. |
| Crypto/mechanics above the welcome path | **Mostly fixed.** Locked Pack A hero is live (H1 "Mercy with a front door") with the v1 four-door grid and chips. No addresses in the hero. But "Truth right now" appears **twice** in the first screen, plus the top banner, and "How it works: Hold → move → convert" starts right after the doors. |
| Homepage mega-scroll ~14 sections | **Still there.** About 14 sections after the doors (flywheel, oath, tokens, Hold the heart, Living Ledger, Ripples in the Wild, Mercy Engine, Ripples simulator with "Est. lives / 12 mo", programs, Beautiful Souls teaser, Where we go, Next steps). |
| "Sponsor With Love" CTA to raw grid | **Fixed on the homepage.** Now "Stand with a program" → "Explore seed programs" (`/programs`, seed-first hub is live). **Still live on `/all-programs`:** "Sponsor a Program" button + `sponsorProgram()`, and the lines "Every sponsorship buys time and love." and "This is how we save lives, together." `.premium-sponsor-btn` class still used on the homepage and `/shelters`. |
| Inconsistent nav | **Half fixed.** Homepage has the new IA (Home · Programs · Meet the Souls · How it works · Docs · Community). `/shelters`, `/whitepaper`, `/mercy-blueprint`, `/pay-it-forward` still use the old "2 FLYWHEELS · 1 MISSION" nav, each with a different item set. |
| Emotional dead-end footer | **Partly fixed.** Footer now has links, the exact trust line, and "Thank you for being here." That one line is the whole sign-off. Below it: "© … Pre-launch · Registered charity application in progress". *Flag for Rails & Trust: "Registered charity application in progress" is a more specific claim than the locked trust line. Confirm it's true or cut it.* |
| (new) Internal notes showing publicly | `/faq` shows "Honest words. Status chips and footer trust line stay locked." and "Use the exact locked labels and tooltips from Rails & Trust — no paraphrase:". `/privacy` shows "Plain words. Locked claims stay locked. Counsel fills the placeholders." These are team instructions sitting on public pages. There's also a long dev tone checklist in an HTML comment on the homepage (only visible in view-source, low risk). |
| (new) Beautiful Souls page | **Not updated** to the framing pack. It still has "The Programs That Will Save Them", "Dogs pulled from death row within 72 hours… This is the direct answer for Max, Rocky, Luna", "25k+ $NIBBLES unlocks a pull", "When you hold or sponsor, this is what moves", and "Connect your wallet… to turn real holdings into these programs". These are the riskiest claims left on the site. |
| (new) Pay It Forward | Chip reads **"Live Chain engine"**, but the page itself says "Motion vision · not a live sponsor feed". Also "You fund one dog and the guardian who already loves them" is written as something happening now. |
| (new) Whitepaper / Blueprint letter | Mostly hedged, but headlines and closers still say "How Every Transaction Quietly Saves Lives", "Every single transaction quietly changes a life", "Sponsor a specific program" (as if you could today), "something the world has never seen before". Signed "The ShibaHumanityhub Team". No human name anywhere on the site. |

### Status table
| Item | Status | Notes |
|---|---|---|
| Pack A hero (eyebrow, H1, subhead, CTAs) | **Live** | Matches lock. The keep-line on the site has "You hold." added to the front, which drifts from the locked text (flag) |
| Four doors + chips (v1 `#doors`) | **Live** | Door 3 micro differs from the framing pack ("Where the system becomes faces. Real dogs, real time…") |
| Tokens/addresses moved below doors | **Live** | |
| Shared global nav | **Partly live** | Homepage, /programs, /how-it-works only. Old nav on shelters, whitepaper, blueprint, PIF |
| Footer trust line (exact) | **Live on homepage** | Missing from the subpage footers I checked (PIF has "© Shibahumanityhub. Truth first. Design only…") |
| Footer sign-off (heartfelt) | **Thin** | "Thank you for being here." Rewrite below |
| `/programs` seed-first hub | **Live** | |
| `/all-programs` Sponsor CTA cleanup | **Missing** | Sponsor button, sponsorProgram(), "save lives" lines still live |
| Beautiful Souls framing pack | **Drafted only** | `shh-beautiful-souls-framing.md` not applied |
| `/privacy` | **Live (placeholders)** | 17 placeholders visible. Locked paragraph and microcopy present |
| `/terms` | **Live (placeholders)** | 11 placeholders visible |
| `/contact` | **Live (placeholders)** | No real email. Form exists with "Express interest (sponsorship not live)" |
| `/faq` | **Live** | Internal-note lines leaking (see above) |
| `/about` | **Live, bare** | 4 status lines, no founder, no story. Draft below |
| `/how-it-works` | **Live** | Thin but honest |
| Story Voice privacy/FAQ polish | **Mostly live** | |
| Mercy Blueprint letter voice pass | **Missing** | Rewrite below |
| Whitepaper voice pass | **Missing** | Rewrite of key lines below |
| PIF chip fix ("Live Chain engine") | **Missing** | Should be `Prototype` |
| Ripples "Est. lives / 12 mo" | **Live, risky** | Needs a `Prototype` chip right next to the number, or remove the number |
| Founder identity / human face | **Missing** | Nowhere on the site |
| Charity rails, receipts, partners | **In progress** | Correctly labelled |
| Homepage slim (§6 order) | **Missing** | Still a mega-scroll |

---

## 2. Top 5 weaknesses (ranked)

1. **The Beautiful Souls page still makes rescue claims.** "Dogs pulled from death row within 72 hours", "25k+ $NIBBLES unlocks a pull", "When you hold or sponsor, this is what moves", "turn real holdings into these programs", "The Programs That Will Save Them". It also lays guilt on the reader ("Act like someone is watching through the bars with you", "Every soul is looking back at you"). This page carries the most emotion *and* the most risk. The fix is already drafted and hasn't been pasted.
2. **Nobody is behind the voice.** No founder name, no "I", an About page that's a four-line status list, and letters signed "The ShibaHumanityhub Team… with tears of hope in my eyes". A mercy project with no person behind it reads as a crypto project wearing a charity costume. That's the opposite of what you are.
3. **The grand lines sound like AI.** "The most powerful, transparent, and loving force for good the world has ever seen", "a complete ecosystem of love", "two beautiful tokens that work together in perfect harmony", "This is not just a crypto project. This is a movement of the heart", "something the world has never seen before". There are also constant *not-X-it's-Y* flips ("Not charity theater. A system in build", "Not another charity pitch", "you are not buying a slogan", "No ghost mercy", "No middleman theater", "No hype") and slogan fragments ("Two lives. One light.", "You are 1. We are all 1.", "Become the 1."). When the site says "no hype" eight times, it sounds like hype.
4. **Honesty is stated so often it reads like a legal disclaimer.** The truth strip shows up 3 times before the first scroll and then again in almost every section. Internal notes leaked onto public pages ("Locked claims stay locked. Counsel fills the placeholders."). Visible `[PLACEHOLDER]` text on contact/privacy/terms. The truth is right. Repeating it this way makes it feel cold. Say it once, warmly, near the top, keep the chips, and let the footer carry it after that.
5. **The mechanics bury the heart, and some leftover lines still claim too much.** After the doors, newcomers hit "Hold → move → convert → deliver → prove", circles (25k · 100k · 250k), an "I will never sell" oath, a Living Ledger, a Ripples simulator with "Est. lives / 12 mo", then "Share Your Mercy Footprint". Leftover overclaims: "Every sponsorship buys time and love", "This is how we save lives, together" (/all-programs), PIF's "Live" chip, "Sponsor a specific program" (whitepaper). *Flag: the "I will buy and hold. I will never sell" oath can read as a price signal. Recommend Rails & Trust review it or move it to About in the founder's own words.*

**Concerns about the drafts (for the team):**
- The Beautiful Souls framing draft has its own tics: "look with honesty, not urgency theater", the H1 "Faces behind the bars — honestly shown" (sounds defensive), "Not a live euthanasia API. Not a sponsor checkout…" (a stack of negatives, and "API" is jargon to a newcomer). My replacements are in §3.5.
- Locked hero (**not rewritten, just flagged**): "Designed so real lives can get room to breathe" is a bit abstract next to the concrete subhead. The live site has also added "You hold." in front of it, which isn't in the lock. Recommend restoring the exact locked text.

---

## 3. Rewritten copy

### 3.1 Hero supporting lines (outside the locked slots)
H1, subhead, eyebrow and CTAs stay exactly as locked.

| Where | Before (live) | After |
|---|---|---|
| Second "Truth right now" under subhead | "Truth right now: Incorporated. Charity rails in progress. Contracts live. Delivery claims wait for rails." | **Remove this repeat.** The top banner and the chips already say it. (Claim text unchanged. It just appears once instead of twice.) |
| Keep-line | "You hold. Designed so real lives can get room to breathe when rails and partners are live." | Restore the exact locked keep-line (drop "You hold."). |
| Note under doors | "Tokens and on-chain details live further down for holders who want them. New here? Start with a door above." | "New here? Pick whichever door pulls at you. The token details are further down, whenever you want them." |

### 3.2 The four doors
Doors 1–2 micro-lines are in the Pack A lock table. **These need founder sign-off before they replace the locked ones.** Chips stay exactly as they are.

| Door | Before (live) | After |
|---|---|---|
| 1 label | Help dogs · $NIBBLES | **For the dogs · $NIBBLES** |
| 1 line | "Shelter dogs, therapy partners, disaster K9. Holding designed to become care when rails and partners are live." | "The gray-muzzled dog in the back kennel. The therapy pup still learning to sit still. Holding is designed to become their care once rails and partners are live." |
| 2 label | Help kids · $hopeseed | **For kids & families · $hopeseed** |
| 2 line | "Kids and families still rebuilding. Holding designed to become help when rails and partners are live." | "The kid whose backpack is empty by Friday. The family starting over in a new town. Holding is designed to become help for them once rails and partners are live." |
| 3 label | Meet Beautiful Souls | **Meet Beautiful Souls** (keep) |
| 3 line | "Where the system becomes faces. Real dogs, real time, when partner feeds are live." | "Come look at their faces. These cards are a prototype for now. Live shelter feeds come when partners sign on." |
| 4 label | How it works · status | **Where things stand** |
| 4 line | "Hold → move → convert → deliver → prove. Incorporated. Rails in progress. Receipts when approval lands." | "An honest look at what's finished, what isn't yet, and how holding is meant to turn into help." |

### 3.3 Welcome / why we exist (new, goes right under the doors, before any mechanics)
> **Why we're here**
>
> Somewhere tonight there's an old dog curled up at the back of a kennel. People walk past him because he's gray around the eyes. Somewhere there's a girl packing an empty backpack on a Friday, because school lunch is the meal she can count on and the weekend is long.
>
> I started Shiba Humanity Hub because I couldn't stop thinking about both of them. [Founder: one sentence about the moment this began.]
>
> We've built two tokens on Shibarium. $NIBBLES is for the dogs, and $hopeseed is for kids and families. We're designing them so that holding can one day pay for real care: kibble, vet bills, a warm bed, a birthday that actually happens. That part isn't switched on yet. The charity rails, the receipts and the partner agreements are still being built, and I'd rather tell you that straight than let you believe something that isn't true.
>
> If you want to walk alongside us while we build it, I'm really glad you found us.
>
> [Founder first name]

### 3.4 Homepage section lines (before → after)
| Before (live) | After |
|---|---|
| **The Mercy Flywheel.** "Not charity theater. A system in build. You hold. When rails are live, capacity is meant to fund food, care, and chances, with receipts. Stories pull the next person in." | **How it's meant to work.** "You hold $NIBBLES or $hopeseed. Once the charity rails are live, a small share of every trade is designed to pay for real things like food and vet bills, with receipts you can check. We're still building that last part." |
| "Hold $NIBBLES and $hopeseed and you are not buying a slogan. You are standing with kids who need a chance, seniors who deserve warmth, veterans who gave everything, and dogs who waited too long. No middleman skimming what belongs to mercy." | "Holding $NIBBLES or $hopeseed is a way of saying you want this built. The kids, the lonely seniors, the veterans and the dogs who've waited too long are who we're building it for." |
| "I will buy and hold. I will never sell. My future is tied to the long success of this light. Not financial advice. A personal oath." | **Flag, not rewritten:** send to Rails & Trust. If kept, move it to About in the founder's own words, e.g. "I'm holding for the long haul because I want to see this built. That's my own choice. It isn't advice." |
| **Two tokens. One heart.** "$NIBBLES walks with the dogs. $hopeseed walks with the kids and families. Same flywheel. Two doors into mercy." | **Two tokens.** "$NIBBLES is for the dogs. $hopeseed is for kids and families. They're built the same way, so pick the one that tugs at you, or hold both." |
| "Contracts live on Shibarium mainnet. Open on shibariumscan.io. Connect read-only for balances. No hype. Just the chain as it is." | "Both contracts are live on Shibarium mainnet. You can look them up yourself on shibariumscan.io. Connecting your wallet here is read-only and asks for no signatures." |
| **Ripples in the Wild.** "You are 1. We are all 1. One mission. Quiet acts that compound mercy for children, seniors, veterans, inmates, and the dogs who stand with them." | **Ripples.** "When people in the community start sending tokens to each other on-chain, those transfers will show up here. It's quiet so far. We'd rather show you a quiet page than a busy fake one." |
| **The Mercy Engine.** "Not another charity pitch. A flywheel on-chain. When funding and delivery are live, activity is meant to fund mercy. Straight. With receipts." | **Thirty programs, four to start.** "Sixteen are for dogs and fourteen are for people. None of them are running yet. They're the plans we mean to fund, starting with four, once the rails are live." |
| Ripples simulator: "This engine runs on truth. When funding comes through, ripples become lives." | "This is a simulator. It shows what a holding is designed to do someday. It isn't a record of anything that has happened." (Put a `Prototype` chip right next to "Est. lives / 12 mo", or remove that number.) |
| **Mercy that can last.** "On-chain. Voluntary. Built so success multiplies capacity for kids, dogs, veterans, and families. When funding and delivery are live: transparent funding. No middlemen theater." | **Built to outlast us.** "If the design works, each year the project grows it can carry a few more dogs and a few more families. When there's money moving, you'll see where it went." |
| Next steps / Stand with a program: "Learn the story. Holding is how support is designed when rails are live." | "Read about the four programs we're starting with. Holding is how support is designed to work once the rails are live." |

### 3.5 Beautiful Souls (`/shelters`)
| Slot | Before (live) | After |
|---|---|---|
| H1 | "The last four walls they may ever see. Innocent. Loving. Waiting." | **Some of them have been waiting a long time.** |
| Intro | "You are looking at the kennel they hope is not the end of their story. Every face here is why the flywheel exists… Act like someone is watching through the bars with you." | "Every face on this page stands for a dog like the ones in shelters right now. Maybe it's the senior who came in after his person died, or the shy one who won't come to the front of the run. We built these cards as a prototype, to show you why this project exists. The cards and clocks are illustrations, not a live shelter feed. Holding a token today won't get any dog out. When partner shelters sign on and the rails are live, this is where their real stories will go." |
| Under intro (new) | – | "If a dog near you needs help today, call your local rescue. They can move faster than we can right now." |
| Caption (framing pack, keep) | – | `Illustrative timeline · prototype · not a live shelter API.` |
| First principle | "The question is not whether these dogs can be saved. The question is whether we will let the engine we already built do what it was designed for." | "We've built the contracts. The part that would actually get a dog out, the rails and the shelter partners, is still being built. Until it is, the most useful thing you can do is look, remember a name, and tell someone about it." |
| List header | "Every minute matters. Every soul is looking back at you. … Become the 1." | "Take your time. Filter by city or by the kind of dog you'd walk into a shelter for. These cards are a prototype." |
| Programs H2 | "NOT ABSTRACT. PRECISE. The Programs That Will Save Them" | **What we're designing for them** |
| Programs intro | "These are the exact living mechanisms built to reach the dogs you just met. When you hold or sponsor, this is what moves." | "These are the programs we're designing for dogs like the ones above. None of them are running yet. Once the rails and partners are live, this is where support is meant to go, with receipts." |
| Shelter-To-Barn card | "Dogs pulled from death row within 72 hours into safe, livestreamed Shiba Barns. No soul left behind. This is the direct answer for Max, Rocky, Luna and every dog on these clocks." / "25k+ $NIBBLES unlocks a pull" | "Designed to get dogs out of high-risk shelters within 72 hours and into warm barns you could watch on a livestream. It's our biggest hope for dogs like these. It's `Planned`, which means it isn't happening yet." (Remove "unlocks a pull".) |
| Rescue Passport card | "Every dog that enters our world gets a permanent, non-transferable soul on the blockchain…" | "Designed so each dog we someday help would carry a permanent record of their story and vet history, one that can't be sold or lost. `Planned`." |
| Closing H2 + body | "You already saw their eyes / You are already here. You can already move. One soul. One ripple… Choose a soul. Become the 1. Connect your wallet on the main flywheel to turn real holdings into these programs." | **You've looked at their faces. Most people never do.** "Keep one name with you. Come back and see how we're doing. And if you can, visit a shelter near you this weekend. The dogs there need people today, and they don't need a token to meet you." |

### 3.6 Mercy Blueprint (signup lead-in + letter)
| Slot | Before (live) | After |
|---|---|---|
| Homepage form lead | "Get The Mercy Blueprint · Vision, all 30 programs, how the flywheel is meant to fund real lives. Free." | **Get the Mercy Blueprint.** "It's the long version: every program we've designed, why each one matters to us, and how the money is meant to move once the rails are built. Leave your email and we'll send it. Or just read it right here." *(Locked microcopy stays directly under the field, unchanged.)* |
| Page headline | "How Every Transaction Quietly Saves Lives" | **How we hope to turn everyday trades into care** |
| Letter, belief line | "We believe crypto can be so much more than speculation and hype. It can be the most powerful, transparent, and loving force for good the world has ever seen." | "I think crypto can do better than it has. I'd like to show that slowly, with receipts, instead of loudly." |
| Solution line | "We didn't just create another charity. We created a mercy engine that runs on-chain." | "Here's what we've built so far, and what we're still building." |
| Programs line | "This is where it gets beautiful. Every single program was born from real pain and real love." | "Each program started as a question: what would it take to fix this one thing?" |
| Closer | "They are a complete ecosystem of love that turns pain into hope, dignity, and joy." | Cut. |
| Sign-off | "With deep love, unbreakable belief in humanity, and tears of hope in my eyes, The ShibaHumanityhub Team" | "Thank you for reading all of this. It means more than you'd guess. [Founder first name]" |

### 3.7 Whitepaper / all-programs / Pay It Forward leftovers
| Before (live) | After |
|---|---|
| Whitepaper: "Every single transaction quietly changes a life." | "Once the rails are live, every trade is designed to send a little toward care." |
| Whitepaper: "We created two beautiful tokens that work together in perfect harmony." | "We made two tokens that share one design." |
| Whitepaper: "Sponsor a specific program and follow the story as proof lands." | "Tell us which program matters most to you on the contact page. Sponsorship isn't open yet, but it helps us know where to start." |
| Whitepaper closer: "This is not just a crypto project. This is a movement of the heart. … Together we are building something the world has never seen before." | "That's the whole plan as it stands today. Some of it will change once we're working with real shelters and real families. When it does, we'll update this page and tell you why." |
| /all-programs: "Every sponsorship buys time and love." | "From our outreach prototype. Sponsorship isn't open yet." |
| /all-programs: "More holders. Stronger flywheel. More mercy tomorrow than today. This is how we save lives, together." | "The more people who hold, the more the design can fund later. Nothing is funded yet, and we'll say so until it is." |
| /all-programs button "Sponsor a Program" | "Explore seed programs" → `/programs` |
| PIF chip: "Live · Chain engine" | Chip `Prototype` · "Chain engine" |
| PIF: "Not charity theater. A standing home with a next link already designed in. You fund one dog and the guardian who already loves them." | "Designed so one person can someday fund one dog and the person who already loves him, month after month, and then help the next pair do the same." |
| PIF: "When you keep one bond standing, you do not just save a dog. You prove that love can have infrastructure." | "Keep one dog with the person who loves him, and the next person can see it's possible. That's what this chain is designed to do." |

### 3.8 Public-page housekeeping lines
| Before (live) | After |
|---|---|
| /faq subtitle: "Honest words. Status chips and footer trust line stay locked." | "Straight answers to the things people ask us most." |
| /faq: "Use the exact locked labels and tooltips from Rails & Trust — no paraphrase:" | "Here's what each label on the site means:" (chip labels + tooltips below it unchanged) |
| /privacy subtitle: "Plain words. Locked claims stay locked. Counsel fills the placeholders." | "What we collect, why we collect it, and how to ask us to delete it." |
| /programs: "No fake 'sponsor a life' checkout here." | "There's no checkout on this page. When sponsorship opens, it'll be clearly marked." |

### 3.9 Footer sign-off (sits above the locked trust line)
**Before:** "Thank you for being here."

**After:**
> Thanks for staying this long. If a gray-muzzled dog or a kid with an empty lunchbox crosses your mind later tonight, that's the reason this place exists. Come back and check on us. We'll keep telling you exactly where things stand.
>
> [Founder first name], founder

`Incorporated · Charity rails in progress · Contracts live on Shibarium · Delivery waits for rails` *(locked, unchanged)*

### 3.10 About page draft (`/about`, founder voice)
> # About
>
> My name is [Founder full name]. I live in [city/region]. [One or two true sentences: your work, your family, your dog, whatever you'd tell someone over coffee.]
>
> [The story: the moment this started. Maybe a dog you knew, a kid you couldn't help, a night you couldn't sleep. Only what really happened.]
>
> Shiba Humanity Hub is what came out of that. It's an incorporated project on Shibarium with two tokens: $NIBBLES for dogs and the people they heal, and $hopeseed for kids and families trying to get back on their feet. The idea is simple to say and hard to build. We want holding a token to one day pay for real care, and we want every dollar that reaches a shelter or a family to come with a receipt you can read.
>
> **What's real today.** The contracts are live on Shibarium, and you can look them up yourself. This website is live. You can sign up for the Mercy Blueprint by email. Some pages, like Beautiful Souls and the Ripples simulator, are prototypes. They're marked that way.
>
> **What we're still building.** The charity rails, receipts, partner agreements and full legal paperwork. Until those are done, no dog is being pulled from a shelter and no family is getting help through us. That's hard to write. I'd still rather write it than blur it.
>
> **What I promise.** When something goes live, we'll label it `Live` and show you how it works. When something slips, we'll say so. [Founder: anything you personally commit to, e.g. how often you'll post updates.]
>
> If you want to reach me, I'm at [public email] or on X at @Shibhumanityhub.
>
> Thank you for giving this a look.
> [Founder first name]

---

## 4. Next build steps (in order)
1. **Beautiful Souls:** paste the framing pack plus §3.5, remove "unlocks a pull" and "turn real holdings into these programs", and put a `Prototype` chip on every card. This is the biggest claim risk left.
2. **Remove internal-note leaks** on /faq and /privacy (§3.8). Put a real email on /contact, and fill or hide the visible `[PLACEHOLDER]`s in privacy/terms (counsel).
3. **/all-programs + PIF:** kill "Sponsor a Program" and `sponsorProgram()`, replace the two "save lives" lines, and switch the PIF "Live" chip to `Prototype`. Retire `.premium-sponsor-btn` on non-sponsor CTAs.
4. **Give the site a person:** founder fills the About placeholders. Add the "Why we're here" block under the doors and the footer sign-off, both signed with a first name.
5. **Shared nav + footer on every page.** Old nav is still on shelters, whitepaper, blueprint and PIF. Put the exact trust line on every subpage footer.
6. **Slim the homepage:** doors → Why we're here → four seed programs → Beautiful Souls teaser → Blueprint signup → footer. Move the flywheel, circles, ledger, Ripples and oath to `/how-it-works` or `#tokens`. Show the truth strip once at the top, then chips and footer.
7. **Voice pass on the whitepaper and Blueprint letter** (§3.6–3.7). Rails & Trust to review the "never sell" oath and "Registered charity application in progress".
8. Restore the exact locked hero keep-line (drop the added "You hold.").
