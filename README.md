# Shiba Humanity Hub - Frontend

This is the living, loving front door to the Mercy Flywheel.

**People helping people helping people.**  
**Every single transaction saves lives.**

## The Voice (Non-Negotiable)
Every word, label, comment, and tooltip must feel like it could have been written by the founder with tears in their eyes. 

Key phrases that must stay alive:
- "quietly"
- "when the funding comes through"
- "people helping people helping people"
- "your quiet holding"
- "the mercy flywheel turns"
- "we are building this together" / "the people will help build"

If something feels hype-y, sales-y, or detached, rewrite it until it feels like mercy.

## Architecture (Kept Simple on Purpose)
- Pure static HTML + Tailwind CDN + two small JS files.
- **Single source of truth**: `js/programs-data.js` (the 29 programs with their fullHTML, thresholds, images, videos) and the `MERCY_THRESHOLDS` constant in index.html.
- All pages and components derive from this. No duplication of program details or circle logic.
- Animations and micro-interactions live in `js/shared-animations.js` so they stay consistent and easy to extend.
- No build step. No framework. Deploy anywhere (GitHub Pages, etc.). This keeps the heart accessible and the code auditable by anyone who cares.

## Phases We Have Walked (All Complete)
We have executed the full roadmap with care:

1. **Phase 1** - Mobile-first, accessibility (dialogs, focus traps, reduced motion), performance (videos, particles, defer), SEO (sitemap, robots), premium but humble polish.
2. **Phase 2** - Deeper on-chain truth (real transfer history as "ripples", mainnet-ready config, living ledger).
3. **Phase 3** - Beautiful interactive Mercy Impact Dashboard (visual circles that fill and glow, enhanced SVG ripple engine, richer personal view, compounding visual, shareable "Mercy Footprint", deep 29 integration, URL state).
4. **Phase 4** - Premium smooth micro-interactions (particles that wake with your holdings, engine pulses and breathing nodes, scroll-synced gentleness, refined consistent hovers, animateValue polish, performance guardrails).
5. **Phase 5** - Powerful showcase of the 29 (live search + circle filters with personal badges, stunning interactive Mercy Constellation SVG that reacts to your ripples, loving "Journey Through the Flywheel" scroller, community notes everywhere).
6. **Phase 6** - Holistic integration (everything now feels like one breath), measurement notes & tone checklist, future hooks for real mainnet and on-chain events, documentation, celebration of what already exists.

## Future Hooks (Ready When the Funding Flows)
- Wallet & history code: easy to add real on-chain program impact events (e.g. "this transfer quietly helped [specific story]").
- Dashboard projections: currently a conservative client-side estimate. When real delivery data or on-chain proofs exist, surface them with the exact same loving language.
- Mainnet: `SHIBARIUM_NETWORKS` and `TOKEN_ADDRESSES` objects are already prepared. Just drop the live addresses and the rest follows.
- When real data arrives, the site will tell the truth without changing its soul.

## How to Touch the Code (With Love)
1. Read the Mercy Blueprint or a couple of full program stories first.
2. Make your change.
3. Test the heart: open on phone, connect/simulate wallet, scroll the engine slowly, open three different modals. Ask: "Does this still feel like people helping people helping people with tears in the eyes?"
4. If not, stop and fix the feeling before the pixels.
5. Update the relevant Phase comment if you touched foundational areas.
6. Keep the single source of truth sacred.

## Measurement We Care About
- Lighthouse (mobile + desktop) 95+ for performance and accessibility - or clear, honest improvement.
- Real-device feel (especially video load and particle life on modest phones).
- Tone fidelity above all.

## What This Site Already Is (A Short Love Note)
This is not a landing page.  
This is not marketing.  

This is a quiet, beautiful mirror.  
A place where someone who has never heard of this before can connect (or just play with the simulator), see their exact place in the 29 living stories, watch the engine breathe with their numbers, and feel, perhaps for the first time, that their quiet holding is already part of something that feeds dogs and children who once had none.

It is built with the same tears, the same first-principles care, and the same "people helping people helping people" heart that created the Mercy Blueprint and every program.

Thank you for being here.  
Whether you hold, simulate, share your footprint, or simply sit with the stories, you are already turning the wheel.

Every holding. Every ripple. Every life.

People helping people helping people.  
Every single transaction saves lives.

And the flywheel is already turning.

## Local Development (Important!)

**The site must run over `http://localhost` (not `file://`).** File protocol blocks `fetch()` to RPCs, breaking wallet connect, on-chain ripples, dashboard sync, and more.

**See the dedicated [DEV.md](./DEV.md)** for exact PowerShell commands, Windows troubleshooting (Python from python.org not Store, npx execution policy, port conflicts), VS Code Live Server setup, and verification steps.

The README focuses on the heart and vision. DEV.md ensures you can work comfortably on localhost so the mercy engine, wallet previews, and stories feel alive and truthful during development.

On GitHub Pages or any static host it works out of the box (https://).

---

Built with pure love and $NIBBLES (and the people who believe in better).

© Shibahumanityhub • Since November 2025