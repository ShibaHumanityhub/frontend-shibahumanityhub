# Hero four doors — drop-in patch (P0)

**Date:** 2026-09-22 · **Owner:** Site & UX  
**Live baseline:** homepage already has four door cards (`#doors`). This patch closes the remaining P0 gaps.

## What to change

1. Replace the hero CTA row + `#doors` grid with `doors-snippet.html`.
2. Add `doors-chips.css` (or paste into the site stylesheet).
3. Keep the truth strip and promise above the doors.
4. Do **not** put wallet / contract addresses inside doors.

## Gaps this closes vs live

| Gap | Live today | After patch |
|-----|------------|-------------|
| Competing CTAs | “See how we help” + Blueprint above doors | Doors are the only equal primary actions; Blueprint is a quiet text link under the grid |
| Status chips | None on doors | Exact Live / In progress / Prototype / Planned chips + locked tooltips (Appendix A) |
| Door targets | `/all-programs#seed-*` (full constellation entry) | `/programs#seed-dogs` · `/programs#seed-kids` · `/shelters` · `#how-it-works` |
| Layout | 1×4 mobile, 2×2 `sm+` | **2×2 mobile**, **4-across `lg+`**, equal height |
| Door 4 | Soft micro-line only | Micro: `Status · pre-rails` + rails **In progress** (never bare Live) |
| Micro-lines 1–3 | Seed program lists | Spec micro-lines (`$NIBBLES` / `$hopeseed` / faces+clocks). Seed names stay on `/programs` |

## Interim if `/programs` is not live yet

Until `programs.html` + `_redirects` ship, temporarily keep:

- Door 1 → `/all-programs#seed-dogs`
- Door 2 → `/all-programs#seed-kids`

…but ship `/programs` in the same P0 wave so nav and doors agree.

## Locked strings (do not paraphrase)

Chip labels + tooltips: Appendix A1 in `P0-IMPLEMENTATION-SPEC.md` / `shh-claim-lock-copy.md`.

## Acceptance

- [ ] Phone: promise → four equal doors, readable over gear BG
- [ ] Each door has ≥1 status chip with native `title` tooltip matching Appendix A
- [ ] Door 4 never shows bare `Live`
- [ ] No contract address / wallet / tax % in hero
- [ ] Help dogs / kids do not open the raw 30-grid without a seed hub first
