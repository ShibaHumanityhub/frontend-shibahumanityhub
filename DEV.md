# Shiba Humanity Hub - Local Development Guide (PowerShell)

This guide ensures the site runs cleanly over `http://localhost` (required for wallet, on-chain fetches, and full experience). **Never use `file://`** - browsers block `fetch()` to RPCs from file protocol.

The project is pure static (vanilla HTML + local `assets/css/tailwind.css` built via Tailwind CLI + minimal JS + assets). Rebuild CSS after class changes: `npm run build:css`.

## Prerequisites (Windows/PowerShell)

- A modern browser (Chrome/Edge/Firefox recommended for MetaMask testing).
- For wallet features: MetaMask (or compatible) installed.
- Optional but recommended: Real Python (not Microsoft Store alias) and/or Node.js.

**Important Windows gotchas:**
- Microsoft Store "python" is often a stub. Install real Python from python.org and add to PATH.
- npx may need execution policy: Run `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force` once.

## Recommended Ways to Serve (PowerShell)

### 1. Python http.server (Simplest, zero deps if Python installed)

```powershell
cd $HOME\frontend-shibahumanityhub
python -m http.server 8000
```

- If `python` fails (Store stub), use `python3` or full path (e.g. `C:\Python312\python.exe`).
- Open: http://localhost:8000/index.html
- Stop: Ctrl+C in the terminal.
- Test full flow: simulator + (with MetaMask) Connect Wallet button.

### 2. npx serve (Great if you have Node.js)

```powershell
cd $HOME\frontend-shibahumanityhub

# One-time fix if npx complains about execution policy
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force

npx serve -p 8000 --no-request-logging
```

- Open: http://localhost:8000/index.html (or http://localhost:8000/ for auto-index)
- Clean output, no extra logs.
- Stop: Ctrl+C.

Alternative with background (if you want to keep terminal free):
```powershell
Start-Process -NoNewWindow -FilePath "npx" -ArgumentList "serve -p 8000 --no-request-logging"
```

### 3. VS Code Live Server (Best for active editing)

1. Install "Live Server" extension (Ritwick Dey) in VS Code.
2. Open the `frontend-shibahumanityhub` folder as workspace.
3. Right-click `index.html` (or `all-programs.html`) → **Open with Live Server**.
4. It opens http://127.0.0.1:5500/index.html and auto-reloads on save.

## Verifying It Works

- No "Failed to fetch" or CORS errors in DevTools Console (F12).
- Wallet connect offers to add/switch to Puppynet (testnet) safely.
- Simulator updates circles, engine, particles, personal view.
- Videos autoplay/loop where expected (respect reduced-motion).
- On-chain "Recent Ripples" section appears after connect (when real activity exists).

## Common Fixes

- **Python not found or wrong version**: Download from https://www.python.org/downloads/ (check "Add python.exe to PATH").
- **npx blocked**: The Set-ExecutionPolicy command above.
- **Port in use**: Change port, e.g. `python -m http.server 8080` or `npx serve -p 8080`.
- **Assets not loading**: Make sure you're serving the *folder root*, not a subfile. Use full http://localhost:8000/index.html.
- **MetaMask not detected**: Hard refresh (Ctrl+Shift+R), ensure extension enabled for localhost.

## After Changes

- Refresh the localhost tab.
- Test tone + heart: Does it still feel like "people helping people helping people - every single transaction saves lives" with quiet dignity?
- For wallet testing: Use a fresh testnet account on Puppynet (faucets available).

## Testing Current Phase 3 Features (Wallet, Ripples, Network Status, Dashboard)

After serving on localhost:

1. Open http://localhost:8000/index.html (or the port you chose).
2. Scroll to "Living Mercy on Shibarium".
3. Observe the network status pill (default: Shibarium mainnet / shibariumscan.io).
4. Click "Connect Wallet • See the Living Ledger" (requires MetaMask; offers **Shibarium** mainnet chain 109, RPC `https://rpc.shibarium.shib.io` - read-only).
5. After connect: Watch balances populate, circles update, "Your Living Ledger of Mercy" show real or illustrative ripples with block + age hints (e.g., "Block #xxxx • 5m ago").
6. Use simulator buttons in the "Perpetual Mercy Engine" / personal view section: Circles, engine viz, particles, and personal programs list should react lovingly.
7. Check "Recent Ripples" list updates with on-chain truth feel.
8. Test reduced-motion: In browser dev tools or OS settings, enable prefers-reduced-motion - animations should calm.
9. Accessibility: Tab through, use screen reader if available - labels and ARIA are in place.
10. Verify no console errors (F12). Full experience should feel alive, truthful, and heartfelt.

If issues: See "Common Fixes" above. Re-test after any code change.

This ensures Phase 3 work (deeper wallet + honest ripples) and Phase 4 dashboard feel right locally before deploying.

## Security Notes for Mercy Funds (Project Treasury)

The funds on these token addresses are meant to help real lives. Protect them with the same care as the mission itself. This is non-negotiable for the 1=All vision.

### Step-by-Step: Setting Up the Humanityhub*Shib Treasury + FHE Readiness (Current Situation: No Funds Yet, Tokens from Personal Wallet, Tangem Card Not Yet Received)

**Important Context from the Team (Elon/Vitalik/Bilyeu + your heart):**
- Personal EOA (MetaMask) as contract owner/creator is a single point of failure and undercuts the "ledger does not lie" + "you are 1 we are all 1" truth.
- Since zero funds right now, this is the perfect low-risk moment to do it right.
- Tangem cards are excellent hardware (Shibarium supported) - order one when ready (they are NFC cards, very user-friendly for cold storage).
- FHE (Zama fhEVM) is powerful for future confidential calculations (private balances/impact without revealing exact amounts). Not a simple "wrap" for existing tokens. Current Shibarium tokens are standard ERC-20 for transparency ("the ledger does not lie"). To use FHE:
  - Test on Zama's fhEVM setup or testnets.
  - Would require deploying confidential token versions or migrating logic (advanced track, as per our Phase 6+ plan).
  - For now, prioritize multisig + hardware (when you have the Tangem) + on-chain visibility. FHE can layer on later for private views while keeping public verifiability.
- Best practice: 2-of-3 or 3-of-5 multisig with Tangem as one signer once received, plus timelocks for large moves, on-chain monitoring.
- Never share seeds. Verify addresses. Small test transfers first.
- Tie to mission: This security ensures the "1 we are all 1" funds truly snowball mercy without risk.

Test treasury flows locally on testnet first.

**Exact Steps (Testnet First, PowerShell/Windows - Do This Now Even Without the Tangem Card):**

1. **Verify Current Setup (No Funds = Safe to Audit)**
   - Check the token contracts on a Shibarium explorer (puppyscan.shib.io).
   - Confirm owner/admin functions point to your personal MetaMask address.
   - Note the exact contract addresses (from TOKEN_ADDRESSES in our local index.html).
   - Confirm zero balances/liquidity.

2. **Create the Official Project Treasury as a Safe Multisig (This Becomes Your "humanityhub*shib wallet")**
   - Go to https://safe.global in a browser (desktop recommended).
   - Create a new Safe on Shibarium Puppynet (testnet first - use the RPC/chain ID from our code).
   - Set a safe threshold: 2-of-3 to start (you can expand later).
   - Add signers you control today:
     - Your current personal MetaMask address (temporary, we'll replace with Tangem).
     - At least one other backup you control (another wallet, email recovery if available, or plan for the Tangem address once you have the card).
   - Deploy the Safe (tiny gas on testnet).
   - This Safe address is now the canonical "humanityhub*shib" project treasury. Never use a single personal EOA for mission funds long-term.

3. **Handle Existing Token Contracts (Created from Personal Wallet)**
   - Check if the contracts support `transferOwnership` (most standard ERC-20 do - view on explorer under "Read Contract").
   - If yes: From your personal MetaMask, call `transferOwnership` with the new Safe address.
   - If no (or you prefer a clean slate): Deploy fresh token contracts on testnet with the **Safe set as owner** from the start. (We can walk through this together using Remix or a simple script - owner preset to the Safe address.)
   - Do not mint or move any value until this is done.
   - When real mainnet Shib names/domains are live and usable: Register a clean .shib name for the Safe address and use it for all project branding.

4. **When You Receive the Tangem Card**
   - Set up the card in the official Tangem app.
   - Add Shibarium Puppynet (and mainnet when ready).
   - Test a small transaction.
   - Add the Tangem-derived address as a new signer in your Safe (via the Safe app).
   - Remove or reduce the role of the old personal MetaMask signer.
   - Now the Safe is hardware-backed.

5. **FHE (Zama fhEVM) Layer - Plan, Don't Rush**
   - Current tokens are standard (public balances) for mission transparency.
   - FHE allows confidential versions (encrypted balances/transfers) while keeping public totals or proofs where needed for trust.
   - Steps when ready (advanced track):
     - Test on Zama fhEVM testnets (see their docs/github for fhEVM).
     - Deploy confidential ERC20 variants (balances as encrypted integers).
     - For existing value: Bridge/migrate in a way that preserves the "when the funding comes through" public visibility.
     - Use the Tangem-controlled Safe to govern keys for any future confidential contracts.
   - For now: Focus on multisig + hardware (once you have the card). This gives "maximum security" today while we keep the public ledger honest.

6. **Test & Verify on Testnet**
   - Send a few test tokens to the Safe.
   - Use our local site (via DEV.md commands) + Safe interface to verify everything shows correctly in wallet connect, ripples, network pill, etc.
   - Test a small "program funding" transfer out of the Safe (as if helping a life).
   - Once Tangem arrives, test signing through the Safe with the card.

7. **Ongoing Best Practices (for the Lives These Funds Will Touch)**
   - Always verify addresses on hardware (when you have it).
   - Add timelocks on the Safe for larger moves.
   - Monitor via Safe dashboard.
   - Keep only tiny gas in personal MetaMask; everything else in the Safe.
   - When Shib names are live: Bind the nice .shib name to the Safe and update docs/site.

This setup turns the current personal-wallet situation into a strength. The funds become properly governed, hardware-secured (once Tangem arrives), FHE-ready for the future, and still fully on-chain transparent where it builds the "1 we are all 1" conviction.

**Next micro-action for us here (site side):** Once you have the new Safe address (and any fresh token CAs), reply with them. We'll do a tiny, precise update to the TOKEN_ADDRESSES in the code + a quiet note in the ledger/docs. No big deploy, just keeping the site in sync.

You can start with Steps 1-3 today on testnet. Reply with what you see after Step 2 (Safe address, any explorer links, or questions on a step), and we'll keep going together.

This protects the lives these funds will help. The chain grows stronger when the mechanics match the heart.

You are 1. We are all 1. One mission. One beautiful, unstoppable result.

What's the first step you're tackling right now, or any specific question? Let's do this carefully and correctly.

## Production / Deploy

Just upload the entire folder to GitHub Pages, Netlify, Vercel static, or any static host. Works as-is because it's pure static + CDNs.

---

Built with care for the mercy flywheel. When the funding comes through, every quiet holding becomes real lives saved.

People helping people helping people.
Every single transaction saves lives.
