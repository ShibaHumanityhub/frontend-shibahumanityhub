# Shiba Humanity Hub: token review v1
### $NIBBLES and $hopeseed, measured against the standards Vitalik Buterin writes about

Prepared Thursday Sep 24, 2026, around 3:15 PM MDT. On-chain snapshot at Shibarium block 19,147,637.
Method: read-only. I fetched the live site, the whitepaper, the FAQ, the terms page and the public GitHub repos. I read chain state directly from the official Shibarium RPC (`https://rpc.shibarium.shib.io`, chain id 109 confirmed), pulled verified source from Sourcify, and checked DEX indexers. I sent no transactions, made no site changes and messaged no one.

> The short version: the contracts are small, honest and have no admin powers, which is a real strength. But 100% of both supplies sits in one personal wallet. That same wallet is hard-coded forever as the "Impact Wallet". A 2% tax is already live even though the site says it switches on "when rails are live". The whitepaper says the burn is a "SHIB burn", but the code burns the project's own token. The site's hopeseed address constant has a typo, so hopeseed balance lookups break. Nobody holds either token yet, which is good news: every structural fix is still cheap.

---

## 1. Per-token fact sheets

### Where the addresses came from
- The homepage token section (`https://shibahumanityhub.com/`) shows:
  - **$NIBBLES:** `0x20a90E0A5346abF59d8244F6c193d0Bb13F7E5CF`
  - **$hopeseed:** `0xF7a5c5634d62e428fD1dbd7292e6925eE8C90833`
- **Mismatch found.** The homepage JavaScript constant `PUBLISHED_TOKEN_CAS.HOPESEED` is set to `0xF7a5c5634d62e428fD1dbd7292e6895eE8C90833` (note `…6895e…` where it should be `…6925e…`). That address has no code, fails the EIP-55 checksum, and returns `0x` to `balanceOf`. The site parses the reply with `BigInt(json.result)`, and `BigInt("0x")` throws, so the wallet "balance / circle / ripples" feature for hopeseed can never work. The same typo is in the GitHub `index.html` (line ~3413).
- The whitepaper and how-it-works pages list no contract addresses.

### Side-by-side facts

| Item | $NIBBLES | $hopeseed | Source |
|---|---|---|---|
| Address | `0x20a90E0A5346abF59d8244F6c193d0Bb13F7E5CF` | `0xF7a5c5634d62e428fD1dbd7292e6925eE8C90833` | site HTML |
| name / symbol / decimals | "Mr Nibbles" / NIBBLES / 18 | "Hopeseed" / HOPESEED / 18 | RPC `eth_call` |
| Total supply | 1,000,000,000 (1e27 raw) | 1,000,000,000 (1e27 raw) | RPC |
| Deploy tx | `0xc51b6115…e474` | `0xc5a1c1d1…c682` | RPC + Sourcify |
| Deploy block / time | 17,719,478: Jun 16, 2026, 5:46 PM MDT | 17,719,600: Jun 16, 2026, 6:00 PM MDT | RPC |
| Deployer | `0xeE59fcC165bcb2eBc35903B897ff7f0789f06F24` (plain wallet/EOA, no code) | same | RPC |
| Verified source | **Yes**, Sourcify **exact match** (creation + runtime), verified Jun 16 5:46 PM MDT | **Yes**, Sourcify exact match, verified Jun 16 6:00 PM MDT | sourcify.dev API |
| Compiler | solc 0.8.34, optimizer **off**, pragma `^0.8.20` (floating) | same | Sourcify |
| Contract type | Custom hand-written ERC-20 with a fee-on-transfer (not OpenZeppelin) | identical code (only the name and symbol differ) | source diff |
| Proxy / upgradeable | No (EIP-1967 slot empty, no delegatecall) | No | RPC + source |
| `owner()` | `0xee59…6f24` (not renounced, but **the variable has no powers**: there are no `onlyOwner` functions) | same | source |
| `treasury()` | `0xee59…6f24` (the **same wallet**; no setter, so it is **fixed forever**) | same | RPC + source |
| Mint / pause / blacklist / max-tx / trading toggle / fee setter | **None exist** | None | source |
| Tax | **2% on every transfer** (buys, sells and wallet-to-wallet, with no exemptions): 1% to treasury wallet, 1% sent to `0x…dEaD` | same | source L17, L47-64 |
| Holders | **1**. The only Transfer event ever is the mint to the deployer. | **1** | RPC `eth_getLogs`, full range from deploy to now |
| Top-10 concentration | 100% in the deployer/treasury wallet `0xee59…6f24` | 100%, same wallet | RPC `balanceOf` |
| Transfers after mint | 0 | 0 | logs |
| Liquidity pool | **None.** No pool can exist, because no tokens have ever left the deployer. DexScreener returns `pairs: null`. | None | DexScreener API, logs |
| LP locked/burned | N/A (no LP) | N/A | |
| 24h volume / price | None / none | None / none | DexScreener |
| Audit | None found (nothing on the site or GitHub, and no auditor listing) | None found | site, GitHub |
| Explorer holder page | **Could not verify.** shibariumscan.io and www.shibariumscan.io returned HTTP 502 on every page and API route during the review. | same | curl |
| GeckoTerminal | **Could not verify** (HTTP 429 rate limit) | same | curl |

**Deployer wallet `0xee59…6f24`:** nonce 5, about 10.10 BONE. All 5 of its transactions were contract creations. Three are **orphan earlier deployments** with the same code size and 1B supply, all held by the same wallet:
- nonce 0 `0xdd924b2df421e72255446f87c1ff6a383556b9ee`: "Mercy Token" (MERCY), Sourcify-verified
- nonce 1 `0xd6d6268a1c7765e7b0cec3a2c107d14135f58e09`: "Mr Nibbles" (NIBBLES), not verified
- nonce 2 `0x49291601ff8c87393825d988fcd986b7ce558ad2`: "Mr Nibbles" (NIBBLES), not verified
- nonce 3 is the live NIBBLES and nonce 4 is the live HOPESEED

Anyone searching "NIBBLES Shibarium" can land on a wrong contract.

### The verified source (both tokens, `contracts/NibblesToken.sol` / `HopeseedToken.sol`)
The contract is 65 lines. The parts that matter:
- **L13 `address public owner;` / L23 `owner = msg.sender;`:** the owner is stored, but no function reads it. Nobody can change anything, so this is effectively immutable. Automated scanners will still show "owner not renounced", and there is no function to renounce it.
- **L14 / L24 `treasury = _treasury;`:** set once in the constructor. There is no `require(_treasury != address(0))` and no `setTreasury`. The 1% flows to `0xee59…6f24` for as long as the chain exists. If that key is lost or stolen, the Impact Wallet is lost too, with no fix except redeploying.
- **L17 `TAX_PERCENT = 200` (basis points, so 2%)** is a constant. It cannot be turned off or on, and it has been live since block 1.
- **L47-64 `_transfer`:** tax applies to **every** transfer, including the founder's own moves (seeding liquidity, paying partners, distributing tokens, moving to a Safe). Each of those also loses 2%. The 1% "burn" is a transfer to `0x…dEaD`, so `totalSupply` never goes down. Circulating supply has to be computed as supply − dEaD balance.
- **L41-42 `transferFrom`:** no infinite-allowance shortcut, which is harmless. It also has the standard `approve` race.
- **No zero-address check on `to`.** Tokens sent to `address(0)` are simply lost.
- **Fee-on-transfer on a DEX:** standard V2 routers need the `…SupportingFeeOnTransferTokens` swap functions. Some aggregators, bridges and lending protocols reject or mis-price fee tokens. Every buy and sell (pair → user, user → pair) pays 2%, and adding liquidity pays it too. This needs a test on a fork before any pool is seeded.
- **Code on GitHub does not match the chain.** `frontend-shibahumanityhub/contracts/HopeSeed.sol` is a *different* contract: name "hopeseed", `setTreasury`, `transferOwnership`, tax exemptions for owner and treasury, a zero-address check. It is **not** what was deployed. `contracts-shibarium/README.md` advertises "4/4 tax + burn mechanics, staking & guardian rewards, soulbound Rescue Passport & Wish NFTs, testnet deploys start this week" (last push Apr 20, 2026 MDT). None of that exists on-chain. `DEPLOY-HOPESEED.md` says to compile with 0.8.20-0.8.26, but the live contract was compiled with 0.8.34.

### What the whitepaper claims (exact quotes, `https://shibahumanityhub.com/whitepaper`)
- "TOTAL SUPPLY — $NIBBLES: 1,000,000,000 (1 billion) · $hopeseed: 1,000,000,000 (1 billion)" → **matches the chain.**
- "TRANSACTION TAX (BUY / SELL / TRANSFER) — Total tax: 2% per transaction" → **matches.**
- "1% → Automatic SHIB burn (permanent ecosystem give-back)" → **does not match.** The code sends 1% of *NIBBLES/HOPESEED* to `0x…dEaD`. No SHIB is bought or burned.
- "1% → HumanityHub Impact Wallet (designed to fund the 30 planned programs when funding and delivery are live)" → the "Impact Wallet" is the founder's deployer EOA. It is not disclosed on the site, not a multisig, and cannot be changed.
- "Design goal: no opaque team allocation, no hidden unlocks, and public custody addresses as treasury rails mature." → Today 100% of supply sits in one wallet, and no allocation plan is published.
- "Hold $NIBBLES or $hopeseed. When tax and charity rails are live, transactions are designed to fund real mercy with receipts." and homepage "Buys, sells, transfers carry a small tax meant to feed the mission when rails are live." → **Misleading about timing.** The tax is already on and cannot be switched.
- "Holding keeps the engine deep… Your bag is your seat at the table", "You hold so the engine stays strong", "Circles… not a promise of yield."
- "Design only until charity rails, partners, and public receipts are real. We will not pretend conversion and payouts are live before they are." (This one is good.)
- "Zama fhEVM… not live on Shibarium… FHE is on the path forward, not a present claim." (Honest.)
- Homepage oath: "I will buy and hold. I will never sell. My future is tied to the long success of this light." / "Not financial advice. A personal oath."
- Footer: "© Shiba Humanity Hub · Pre-launch · Registered charity application in progress." `llms.txt`: "Registered charity application in progress… tax receipts activate upon registered charity approval." **Could not verify.** CRA does not publish pending applications. The terms page is live with visible `[PLACEHOLDER: full legal entity name]`, `[PLACEHOLDER: jurisdiction…]` and `[PLACEHOLDER: public contact email]`.
- The "Est. lives / 12 mo" counter (`js/ripples-simulator.js` `updateStats`, and inline in `index.html`) is `projected = floor(tokens / 25,000) × 3`, and it shows at least 1 for any balance. The ×3 has no data behind it. The inline code comment calls it a "Bilyeu/Vitalik-level compounding projection (face-grabbing, rigorous…)" and "Conservative, first-principles estimate". It is labelled "Prototype", which helps, but the number is made up.

---

## 2. Findings: red / yellow / green

### 🔴 Red: fix before anyone else holds a token
1. **Total custody concentration.** 100% of both supplies, the tax treasury and the (inert) owner role all sit in one personal hot wallet, `0xee59…6f24`. By Vitalik's "Trust Models" standard this is a *1-of-1* trust model: one key, one person, and everything depends on it.
2. **The Impact Wallet is hard-coded to that same EOA with no way to change it.** Charity money would flow forever to a personal key and never to a Safe multisig or a registered charity. From outside, nobody can tell charity funds apart from the founder's own funds.
3. **The tax is live now, but the copy says it starts "when rails are live".** The same kind of mismatch exists for the "SHIB burn", which is really a self-token burn. Wording and code disagree, which breaks the "publicly verifiable" part of credible neutrality.
4. **The site's hopeseed constant is a typo** (`…6895e…`, bad checksum, empty address). Every hopeseed balance/ripple lookup fails, and that constant could be copy-pasted by users. Four sibling contracts exist too (MERCY plus two old NIBBLES), which adds impersonation and confusion risk.
5. **Investment-signal language plus a founder-controlled supply.** The "I will buy and hold. I will never sell. My future is tied to the long success…" oath, "Holding keeps the engine deep", "the engine stays strong" and "Honest stories pull new holders… the wheel turns faster" all describe people buying from a promoter who holds 100% of supply, where value depends on the promoter's efforts. That lines up with the four prongs of CSA Staff Notice 46-307 (money, common enterprise, expectation of profit, efforts of others). Add the "Est. lives" ×3 multiplier, a number presented as rigorous when it isn't.

### 🟡 Yellow
- **Hold-vs-move contradiction.** The tax only earns when tokens *move*, but the oath asks people to never sell. If everyone keeps the oath, the "flywheel" funds nothing. And "convert" means the treasury will sell tokens, so the project itself becomes the seller it asks holders not to be.
- **A fee-on-transfer token has DEX and aggregator compatibility risk.** The founder's own liquidity seeding and distributions will pay 2% too.
- **The burn goes to `0x…dEaD`** instead of lowering `totalSupply`, so any "supply" stat has to subtract the dEaD balance.
- **GitHub contract code and README describe features that are not deployed.**
- **The terms page is live with placeholders.** The legal entity name and jurisdiction are not public.
- **"Registered charity application in progress" is unverifiable**, and the site has no CRA BN / application reference.
- **No audit, no tests published, no threat model.** Floating pragma, optimizer off. Low risk for 65 lines, but undocumented.
- **Circles (25k / 100k / 250k) give holders "priority" and "story rights" based on size.** That is wealth-weighted status, which Vitalik warns about in "Moving beyond coin voting governance". If it is ever tied to donations it becomes an "advantage" under CRA split-receipting rules.
- **shibahumanityhub.shib shown as the "Intended treasury identity"** without saying what address it resolves to (could not verify; no public SNS resolver checked).

### 🟢 Green (real strengths, keep them)
- **Source is verified with an exact match on Sourcify** for both tokens. Anyone can read what runs.
- **No admin powers at all:** no mint, pause, blacklist, fee change, max-tx, trading switch or proxy. The code is dead simple (65 lines). That fits Vitalik's "keep it simple" and "don't change it too often" rules better than most memecoins.
- **Fixed, equal 1B supply with no hidden mint.**
- **Unusually honest status system on the site:** Live / In progress / Prototype / Planned chips. "Holding tokens is not a charitable donation." "No counsel-approved, receipt-ready public donation checkout is claimed as live today." The whitepaper separates "what you hold" from "what a life spends" (stablecoins for care).
- **The frontend repo is public under the MIT license.**
- **Nobody else holds tokens yet and there is no liquidity.** Nobody can be hurt by a redesign, so redeploying costs only gas.

---

## 3. What "Vitalik-grade" means here (sources I fetched)

| Principle (source) | What it says | What it means for SHH |
|---|---|---|
| **Credible neutrality** (Vitalik, Jan 3, 2020, https://nakamoto.ghost.io/credible-neutrality/; the nakamoto.com URL now returns 404) | Four rules: "Don't write specific people or specific outcomes into the mechanism; open source and publicly verifiable execution; keep it simple; don't change it too often." A mechanism is credibly neutral "if just by looking at the mechanism's design, it is easy to see that [it] does not discriminate for or against any specific people." | Right now the mechanism has one specific person written into it: the tax goes to the founder's EOA. Put a public, multi-signer, charity-bound treasury in the code. Make the site copy match the code exactly. Keep the code as simple as it is today. |
| **Trust Models** (https://vitalik.eth.limo/general/2020/08/20/trust.html) | Aim for "1 of N" or "few of N" trust, where "the system works as long as at least one of them does what you expect them to… you do want the N to be as large as possible." | Move from a 1-of-1 key to a Safe with M-of-N, including at least one independent signer (board member, accountant, partner charity), plus a timelock for large moves. |
| **Moving beyond coin voting governance** (https://vitalik.eth.limo/general/2021/08/16/voting3.html) | Coin voting creates plutocracy and "voters are collectively accountable… each voter is not individually accountable." | Don't let Circles (bag size) decide which programs get money. Use one-person signals (quadratic, proof-of-personhood) or an independent grants committee with published criteria. |
| **Quadratic Payments / QF** (https://vitalik.eth.limo/general/2019/12/07/quadratic.html) | QF needs "a model of identity where individuals cannot easily get as many identities as they want", or it collapses into vote-buying. | Run Gitcoin-style QF rounds for shelters and kids' programs, using a sybil-resistant ID (Gitcoin Passport / Human Passport). Many small donors then count more than one whale. |
| **Retro public goods funding** (https://vitalik.eth.limo/general/2021/11/16/retro1.html) | Optimism's retro round paid "$1 million to 58 projects to reward the good work that these projects have already done". | Pay partners *after* they deliver, with receipts. Publish the results. That fits the project's own "no ghost mercy" line. |
| **What else could memecoins be?** (Mar 29, 2024, https://vitalik.eth.limo/general/2024/03/29/memecoins.html) | Praises charity coins where "a large portion of the token supply (or some ongoing fee mechanism) is dedicated to some kind of charity". His best example: he gave half of the Dogelon supply to the Methuselah Foundation, "retroactively converting $ELON into a charity coin". He has "zero enthusiasm for… scams, rugpulls or anything that feels exciting in month N but leaves everyone upset in month N+1" and wants coins "that support public goods instead of just enriching insiders and creators". | The strongest single move: **irrevocably send a large share of each supply straight to the partner charities or a charity-controlled Safe**, instead of keeping it in the founder wallet. Consider "games rather than coins", e.g. Pay-It-Forward quests that are fun without price hope. |
| **Making Ethereum alignment legible** (Sep 28, 2024, https://vitalik.eth.limo/general/2024/09/28/alignment.html) | Values alignment means being "open source, minimize centralization, support public goods". Security is judged by "how much will break, and how much harm could you do?" (L2beat stages). | Publish a one-page "if the founder vanished tomorrow, what happens?" answer (a walk-away test). Open-source everything. |
| **d/acc: one year later** (Jan 5, 2025, https://vitalik.eth.limo/general/2025/01/05/dacc2.html) | Section "d/acc and public goods funding", covering QF, retro PGF, deep funding. Skepticism exists because PGF "lacks rigor". | Rigor means real receipts, attestations and independent verification, and not showing projected "lives" numbers. |
| **Canadian law** (CSA SN 46-307, https://www.osc.ca/en/securities-law/instruments-rules-policies/4/46-307/csa-staff-notice-46-307-cryptocurrency-offerings; CRA gifts-in-kind FMV, https://www.canada.ca/en/revenue-agency/services/charities-giving/charities/operating-a-registered-charity/issuing-receipts/determining-fair-market-value-gifts-kind-non-cash-gifts.html; CRA Charities Directorate crypto deck, Apr 2024) | A token is likely a security if value "is tied to the future profits or success of a business". CRA treats crypto gifts as gifts-in-kind: FMV at transfer, a consistent valuation method, and "When the FMV… cannot be determined, an official donation receipt cannot be issued." Benefits a donor receives ("advantages") reduce the receiptable amount. | A token with no market has no FMV, so it can't be receipted. Circles/priority perks count as an advantage. Only a *registered* charity can issue receipts, and a transfer tax going to a for-profit's wallet is not a donation. Talk to a lawyer before launch. |

I did not find a Vitalik post titled "Hyperscale", so I left it out rather than guess. The trust-models post above covers the underlying idea.

---

## 4. Improvement roadmap

### NOW (this week; nothing on-chain has to move yet)
1. **Fix the hopeseed typo** in `PUBLISHED_TOKEN_CAS.HOPESEED` (`…6895e…` → `…6925e…`). Add a checksum assertion at page load so a bad address fails loudly.
2. **Freeze distribution.** Don't send tokens to anyone or seed any pool until the decisions below are made. Nobody holds a token, so this costs nothing.
3. **Make the copy match the code today:**
   - "2% tax is hard-coded and already active on every transfer."
   - "1% is sent to the dead address 0x…dEaD (a burn of NIBBLES/HOPESEED, not SHIB)."
   - "1% currently goes to the founder's deployer wallet 0xee59…6f24."
4. **Remove the oath and the investment-signal lines** (see section 5). Remove or rebuild the "Est. lives / 12 mo" ×3 counter, and delete the "Vitalik-level… rigorous" code comment.
5. **Publish a "Canonical contracts" box** listing the two live addresses, plus the three orphan contracts (MERCY `0xdd92…`, NIBBLES `0xd6d6…`, NIBBLES `0x4929…`) marked **deprecated, do not buy**.
6. **Terms page:** take down the placeholders or mark the page clearly as a draft that is not in force. Publish the legal entity name and province. Remove or qualify "Registered charity application in progress" until you can show a submission reference (see founder questions).
7. **Fix GitHub:** replace the undeployed `contracts/HopeSeed.sol` with the exact verified source for both tokens. Rewrite the `contracts-shibarium` README so it lists only what exists. Link the Sourcify pages.

### NEXT 30 DAYS: decide the v2 token design and redeploy while it's free
8. **Pick one of two honest designs, then redeploy once and never change it:**
   - **A. No tax (Vitalik's preferred "simple" path).** Plain fixed-supply ERC-20 with no owner. Funding comes from **supply dedicated to charity at genesis** (like Dogelon to Methuselah), for example 50% straight into a charity-controlled Safe with a published vesting/spend policy, plus voluntary stablecoin donations.
   - **B. Keep a small transparent split.** Treasury = a **Safe multisig** (at least 2-of-3, one signer independent of the founder), fixed in code. Tax exemptions only for that Safe and the LP-seeding step, documented. No SHIB-burn claim unless the contract really buys and burns SHIB.
   - Either way: a zero-address check in the constructor, no owner variable (or a real `renounceOwnership`), a pinned pragma, and an exact-match verification the same day.
9. **Get a public review:** at minimum a free community review (post the code, invite review, answer in public) plus an automated scan (Slither) published in the repo. Get a paid independent audit before any liquidity or marketing.
10. **Publish a genesis allocation table** for every token: charity Safe / liquidity / community / team (with vesting), each line with its address. Put 0% or a small, vested team share in writing.
11. **Treasury transparency page:** the Safe address, signers (names or roles), threshold, a spending policy, and a live on-chain balance read-out. State that treasury token sales ("convert") will be pre-announced and done in small, scheduled lots.
12. **Write a threat model / walk-away test** (1 page): key loss, key theft, founder death or disappearance, a partner fraud, a site takeover, an RPC outage. For each, say what happens and who can act.

### 90 DAYS: public-goods rails
13. **Charity rail:** go through a registered charity (your own once approved, or a partner such as an existing CRA-registered animal or child charity), not through the token. Crypto donations get CRA-compliant receipts: FMV in CAD at transfer, a consistent valuation source, and records of units, addresses and dates. **No receipts for tokens that have no market price.** No holder perks tied to receipted donations.
14. **Attest deliveries on-chain:** use EAS (Ethereum Attestation Service) or an equivalent. Partners attest "invoice paid / animal placed / backpack delivered", with a hash of the redacted receipt, and the site's "Living Ledger" reads only real attestations.
15. **Allocate with QF or retro funding, not bag size:** a quarterly round where verified humans (Passport) signal which seed programs to fund with matching from the treasury. Or pay partners retroactively for delivered, receipted work.
16. **Honest metrics only:** dollars in, dollars out, receipts published, animals and kids served, verified by partners. No projections.
17. **Publish quarterly reports:** treasury in and out, reconciled to on-chain transactions, plus an annual external review by an accountant.

---

## 5. Wording changes: warm, human, no price signals

| Current | Suggested replacement |
|---|---|
| "I will buy and hold. I will never sell. My future is tied to the long success of this light." / "Not financial advice. A personal oath." | **"I'll show up for the dogs and the kids. I'll tell the truth about what's real and what isn't. I'll give what I can, when I can."** (Or take the oath out entirely. Nobody should promise never to sell anything.) |
| "Hold $NIBBLES and $hopeseed and you are not buying a slogan." | "You don't need to buy anything to help. If you hold $NIBBLES or $hopeseed, do it because you like being part of this community, not because you expect it to be worth more." |
| "Holding keeps the engine deep." / "You hold so the engine stays strong. They receive so a soul can stay safe." | "Care is paid in steady dollars from our charity treasury, never from what a token is worth on a given day." |
| "Buys, sells, transfers carry a small tax meant to feed the mission when rails are live." | "Right now every transfer of these tokens has a fixed 2% fee written into the contract: 1% is burned (sent to 0x…dEaD) and 1% goes to [treasury address]. Here is exactly who controls that wallet: [link]." |
| "1% → Automatic SHIB burn (permanent ecosystem give-back)" | "1% → burned. These $NIBBLES/$hopeseed tokens are sent to the dead address 0x…dEaD, where nobody can ever move them. (This is not a SHIB burn.)" |
| "Honest stories pull new holders. Capacity grows. The wheel turns faster." | "Honest stories help more people find the programs. Every dollar that reaches a life gets a receipt." |
| "Designed so every transaction can save lives." | "Built so that when our charity rails are live, every dollar that goes to care can be traced." |
| "Est. lives / 12 mo" (×3 multiplier) | Remove it. Or replace it with **"Receipts published: 0 · Dollars delivered: $0 · (Nothing yet. This goes up only when a partner confirms real help.)"** |
| "Circles of mercy (25k · 100k · 250k)… priority" | "Community circles are just for belonging and updates. They never decide who gets help, and they come with no financial perks." |
| Footer "Registered charity application in progress" | Until you can show proof: "We are working toward charitable registration in Canada. We are not a registered charity today and cannot issue tax receipts." Once filed: add the CRA file or submission reference. |
| "Intended treasury identity: shibahumanityhub.shib" | "Treasury: [Safe address] · 2-of-3 signers · [link to balance and history]. Our .shib name points here once it can be set up." |

---

## 6. Questions only you can answer
1. Is `0xee59…6f24` your personal wallet? Is it a hardware wallet (Tangem/Ledger) or a browser hot wallet? Does anyone else hold the seed phrase?
2. Would you redeploy clean v2 contracts while nobody holds tokens yet (cheap now, painful later)? If yes, tax (design B) or no tax plus charity supply (design A)?
3. What share of each supply are you willing to *irrevocably* give to charity or a charity-controlled Safe, and what share (if any) is for you or the team, on what vesting?
4. Who could be independent co-signers on a Safe (accountant, board member, partner shelter director)?
5. What exactly is incorporated: legal name, Alberta or federal, for-profit corporation or non-profit society? Has a CRA charity application (T2050) actually been submitted? If so, when, and can you share the reference? If not, what's the timeline?
6. Which specific shelters and children's organizations are in talks, and would any of them accept crypto (or stablecoin) directly and issue receipts?
7. What did the 10 BONE in the deployer wallet come from, and are there other wallets tied to the project that should be disclosed?
8. Why were MERCY and two earlier NIBBLES contracts deployed? Are you OK publicly labelling them deprecated?
9. Do you plan to seed a DEX pool? When, how big, and will the LP tokens be burned or locked, and where?
10. Who writes and ships site code (you, an AI assistant, a contractor)? The GitHub deploy guide and the site constant look AI-generated, and the typo slipped through. Can we add a review step?
11. Are you willing to take down the "never sell" oath and the lives counter this week?

---
### Source list (all fetched during this review)
- Site: https://shibahumanityhub.com/ , /whitepaper , /how-it-works , /faq , /terms , /js/ripples-simulator.js , /sitemap.xml
- RPC: https://rpc.shibarium.shib.io (eth_call, eth_getCode, eth_getLogs, eth_getStorageAt, block binary search)
- Sourcify: https://sourcify.dev/server/v2/contract/109/0x20a90E0A5346abF59d8244F6c193d0Bb13F7E5CF and …/0xF7a5c5634d62e428fD1dbd7292e6925eE8C90833
- DexScreener: https://api.dexscreener.com/latest/dex/tokens/<both> → `pairs: null`
- Could not reach: shibariumscan.io (502 on all routes), GeckoTerminal (429), shibarium.routescan.io (403)
- GitHub: github.com/ShibaHumanityhub (frontend-shibahumanityhub, contracts-shibarium, whitepaper-and-vision, index.html)
- Vitalik: the credible neutrality essay (nakamoto.ghost.io), trust models, coin voting, quadratic payments, retro1, memecoins, alignment and d/acc2 posts linked in section 3
- CRA: gifts-in-kind FMV page; CRA Charities Directorate "Crypto-assets, crowdfunding, and fundraising" (Apr 22, 2024) via canadiancharitylaw.ca
- CSA Staff Notice 46-307 (OSC)
