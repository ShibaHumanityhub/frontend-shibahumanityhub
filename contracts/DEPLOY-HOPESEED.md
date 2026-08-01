# Deploy $hopeseed on Shibarium (step by step)

You already have **$NIBBLES** live on Shibarium. 
The address on the website for hopeseed (`0xF7a5…0833`) is **empty** - we will deploy a **new** contract and then update the site to the real CA.

This guide matches Nibbles-style settings and your whitepaper:

| Setting | Value |
|--------|--------|
| Network | **Shibarium mainnet** (chain ID **109**) |
| Name | `hopeseed` |
| Symbol | `HOPESEED` |
| Decimals | **18** |
| Supply | **1,000,000,000** |
| Tax | **2%** total (1% burn `0x…dEaD`, 1% treasury) |
| Constructor | treasury address |

Nibbles reference (working):

- Token: `0x20a90E0A5346abF59d8244F6c193d0Bb13F7E5CF`
- Owner / treasury on-chain today: `0xee59fcc165bcb2ebc35903b897ff7f0789f06f24`

Use that same treasury for hopeseed unless you intentionally want a different impact wallet.

---

## Before you start (checklist)

1. **MetaMask** (or Tangem + app that can use Remix)
2. Network: **Shibarium** 
 - RPC: `https://rpc.shibarium.shib.io` 
 - Chain ID: `109` 
 - Symbol: `BONE` 
 - Explorer: `https://shibariumscan.io`
3. Enough **BONE** for gas (usually a small amount is enough)
4. Know your **treasury address** (recommended: same as Nibbles treasury above)
5. Prefer the **same wallet that owns Nibbles** if that is your project wallet 
 (`0xee59…6f24` if that is still your owner)

**Safety**

- Double-check network says **Shibarium**, not Ethereum.
- You will get a **new contract address** (not `0xF7a5…`). That is correct.
- Do not send funds to the old empty hopeseed address expecting a token.
- After deploy, save the CA in a password manager **before** closing Remix.

---

## Step 1 - Open Remix

1. Go to: [https://remix.ethereum.org](https://remix.ethereum.org)
2. Create a new file: `HopeSeed.sol`
3. Paste the full contents of `contracts/HopeSeed.sol` from this repo 
 (or open that file and copy all of it)

---

## Step 2 - Compile

1. Left sidebar → **Solidity Compiler**
2. Compiler version: **0.8.20** or any **0.8.20-0.8.26**
3. Enable **optimization** if you use it (optional; 200 runs is fine)
4. Click **Compile HopeSeed.sol**
5. Confirm green checkmark, no errors

---

## Step 3 - Connect wallet on Shibarium

1. Left sidebar → **Deploy & Run Transactions**
2. Environment: **Injected Provider - MetaMask**
3. MetaMask popup → connect
4. In MetaMask, select network **Shibarium** (109)
5. Remix should show your account and a small BONE balance

If Remix says wrong network, switch MetaMask to Shibarium and refresh Remix.

---

## Step 4 - Deploy

1. Contract dropdown: **HopeSeed**
2. Constructor field **`_treasury`**:
 - Paste treasury address (recommended: `0xee59fcc165bcb2ebc35903b897ff7f0789f06f24` if that is still your project treasury)
 - Or paste your Safe / project wallet if different
3. Click **Deploy**
4. MetaMask → confirm the transaction
5. Wait for success (Remix “Deployed Contracts” panel)

---

## Step 5 - Copy the new contract address

1. Under **Deployed Contracts**, expand HopeSeed
2. Copy the contract address (clipboard icon)
3. Paste it somewhere safe

Example shape (yours will differ):

`0x........................................`

---

## Step 6 - Verify on explorer (must pass)

Open:

`https://www.shibariumscan.io/address/YOUR_NEW_ADDRESS`

You should see:

- [ ] **Contract** (not a plain empty wallet)
- [ ] Token name **hopeseed** / symbol **HOPESEED** (may take a minute to index)
- [ ] Total supply **1000000000000000000000000000** (raw) = 1B with 18 decimals
- [ ] At least one **contract creation** transaction

Optional checks in Remix “Deployed Contracts”:

- `name` → hopeseed 
- `symbol` → HOPESEED 
- `decimals` → 18 
- `totalSupply` → 1e27 
- `TAX_PERCENT` → 200 
- `treasury` → your treasury 
- `balanceOf(yourWallet)` → full supply (you are the initial holder)

---

## Step 7 - Import into MetaMask

1. MetaMask → Import tokens → Custom token 
2. Paste **new** hopeseed CA 
3. Symbol HOPESEED, decimals 18 
4. Confirm balance shows (should be 1B if you hold all)

---

## Step 8 - Tell Grok / update the website

Reply with:

```text
hopeseed deployed: 0xYOUR_NEW_ADDRESS
treasury used: 0x...
```

Then we will:

1. Replace `PUBLISHED_TOKEN_CAS.HOPESEED` in `index.html`
2. Update all explorer links sitewide
3. Push live to shibahumanityhub.com

---

## Step 9 - Verify source on Shibariumscan (recommended, same day)

1. Open your contract on shibariumscan 
2. **Contract** → **Verify & Publish** 
3. Compiler **0.8.20**, license MIT, paste source of `HopeSeed.sol` 
4. Constructor ABI-encoded args: the treasury address you used 
5. Submit 

Verified source = public trust.

---

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Deployed on Ethereum by accident | Redeploy on Shibarium 109 |
| Wrong treasury (`0x0`) | Constructor will revert - use real address |
| Expecting old `0xF7a5…` to become the token | It won’t - use the **new** CA |
| Lost CA after deploy | Find it under MetaMask Activity → tx → “Contract creation” on explorer |
| No BONE for gas | Bridge/buy small BONE on Shibarium first |

---

## Aftercare (security)

1. Full supply starts in **deployer wallet** - treat that wallet like a vault 
2. Later: move ownership / large bags toward **multisig (Safe)** when ready 
3. Only advertise the CA after Step 6 checks pass 
4. Do not seed liquidity or post the CA until you are ready for public market behavior 

---

## What Grok cannot do for you

- Click MetaMask / sign the deploy (only you control keys) 
- Recover a private key 
- Deploy without your wallet 

I **can** update the site the moment you paste the new CA.

---

When deploy succeeds, send the new address and we finish the site in one push.
