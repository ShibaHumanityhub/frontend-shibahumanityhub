# Token v2 · Option B+ (founder-chosen)

**Date:** 2026-09-24  
**Choice:** Keep a **2% transfer fee**, route it to a **2-of-3 Safe**, and make the burn **real**.  
**Why not A:** Option A (no fee + large permanent charity allocation) is the cleanest Dogelon/Methuselah story, but it drops the Shibarium fee flywheel and the ecosystem burn path you want.

## Confirmed founder facts
- Incorporated: **yes**
- CRA charity application: **filed May 2026**, awaiting decision by **December** (latest)
- Deployer `0xee59…6f24`: **personal wallet created only for this project**, no other use, **sole recovery phrase**

## What is wrong with v1 (keep this honest on-site)
- 2% fee is **already always on** (not “when rails are live”)
- 1% “burn” sends the **project’s own token** to `0x…dEaD` · `totalSupply` does **not** fall
- 1% treasury = **same personal EOA** as the deployer forever (no setter)
- Holding forever + “never sell” oath **starves** the fee that funds the mission

## Option B+ economics (recommended shape)

### Fee (2%) on every transfer
| Slice | Destination | Purpose |
|-------|-------------|---------|
| **1%** | **Impact Safe** (2-of-3) | Charity / program treasury once rails + CRA approval allow receipts |
| **1%** | **Burn path** | See below |

**Signers (example):** founder · independent (accountant / board / partner charity) · second independent or counsel-held. Publish signer roles. Prefer a **timelock** for large moves.

### Burn path (pick one, be exact in copy)

**B+ Now (simple, matches “supply goes down”):**  
Use Solidity `_burn` (or equivalent) so **1% destroys tokens and `totalSupply` decreases**. No SHIB buy needed. Clear, verifiable, Vitalik-simple.

**B+ Later (true SHIB ecosystem burn):**  
Accumulate the 1% in a **Burn Collector** contract. After a **liquidity pool exists**, a public function (or keepers) periodically **swaps project token → SHIB → burn**. Do **not** put a DEX swap inside every `_transfer` (gas, reentrancy, failure modes). Until LP exists, either (a) self-burn as above, or (b) accumulate and disclose “SHIB buy-burn starts after LP.”

You can ship **self-burn now** and upgrade narrative to SHIB buy-burn **after** LP + testing, without lying.

### How holding still serves the mission (without a “never sell” oath)

Be honest: **movement funds the fee; holding is belonging.**

| Holding gives | Movement gives |
|---------------|----------------|
| Circles of Mercy (25k / 100k / 250k) · recognition · story rights when funded | 2% fee → Safe + burn |
| Standing with the mission (NFA · not a donation receipt) | Liquidity and partner payouts when rails live |
| Long-term alignment if programs succeed | Continuous oxygen for Impact Wallet |

**Do not** ask everyone to never sell. That kills charity inflow. Instead:
- Hold because you believe in the mission and Circles.
- When you move, you knowingly fund burn + Impact Safe.
- Founder distributions / LP seeding also pay 2% (disclose this).

### Allocation table (publish before anyone else holds)
Example skeleton (tune numbers; must sum to 100%):
- Impact Safe (program treasury): __%
- Liquidity (to be locked/disclosed): __%
- Operations / runway (timelocked Safe): __%
- Community / future QF rounds: __%
- Founder / team (timelocked, public): __%

**Rule:** Impact Safe ≠ personal EOA. Personal wallet may hold a disclosed founder allocation, never the charity slice.

### Redeploy checklist (cheap while sole holder)
1. Deploy v2 NIBBLES + hopeseed with Safe as `treasury`, real `_burn`, no admin fee toggles (keep immutable spirit).
2. Publish Sourcify-verified source **identical** to GitHub.
3. Migrate narrative: site + whitepaper say exactly what code does.
4. Publish “if founder disappears” one-pager (Safe signers, CRA entity, who can move Impact funds).
5. Free automated scan now; paid audit **before** any LP.
6. Retire v1 CAs on-site with a **Retired** label (list the three orphan contracts too).

## Site copy (already partly shipped)
- Fee described as **already live**
- SHIB-burn claim corrected / pending true SHIB path
- Hold-forever oath removed
- Est. lives counter retired
- CRA line restored as **application filed, awaiting decision**

## Open product decisions
- Self-burn now vs wait for SHIB buy-burn after LP → recommend **self-burn in v2 deploy**, SHIB path as Phase 2.
- Safe signer identities (need two people beyond you).
- Whether Circles ever gate funding (prefer **not** · use people-weighted signals later per Vitalik QF).
