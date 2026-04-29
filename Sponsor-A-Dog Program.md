Sponsor-A-Dog Program
"Directly sponsor one special dog and help its guardian become a full-time storyteller of love."

Objective:
This program lets you personally sponsor one special dog and support the dedicated guardian who cares for it every single day. It turns your sponsorship into stable income for the guardian while creating beautiful, ongoing content that lets the whole world fall in love with that dog right alongside you.

This one is very close to my heart. I want every sponsor to feel a real, lasting connection — not just send money and walk away. The Sponsor-A-Dog Program turns sponsorship into a joyful, ongoing relationship that rewards the guardian for sharing the dog’s life with all of us.


Core Mechanics:

① Sponsor Payments & Guardian Salary
• Every Sponsor-A-Dog payment automatically sends 20-25% directly to the guardian in $NIBBLES — their real salary for the daily care and content creation.

② Guardian Staking with Multipliers
• Guardians can stake their earned $NIBBLES for powerful multipliers that reward them for staying committed:  Bronze: 30-day lock → 1.3x (just 1 video per week)  
Silver: 90-day lock → 2x (3 videos per week)  
Gold: 180-day lock → 3x (5 videos or 3 streams per week)  
Diamond: 365-day lock → 5x (daily 2-min update or weekend long stream)

③ Proof-of-Care System
• Guardians simply upload a short video update — the hash is stored on-chain as proof.
• Miss a week and your staking tier automatically drops.
• Early withdrawal = 50% slash (half burned, half goes straight to the charity treasury).


Smart Flow Contract

solidity

struct GuardianStake {
    address guardian;
    uint256 dogId;           // links to Rescue Passport Soulbound NFT
    uint256 stakedAmount;
    uint256 lockUntil;
    uint8 tier; // Bronze to Diamond
    uint256 lastProofTimestamp;
}

function submitProof(uint256 stakeId, string calldata videoHash) external {
    // verify proof, update timestamp, calculate boosted rewards
}

function claimRewards(uint256 stakeId) external {
    // calculate multiplier based on tier and lock time
}

Result:
Guardians become full-time, passionate creators who truly love their dogs. Tokens get locked for years, creating real skin in the game. Sponsors get an endless stream of heartwarming daily content from the dog they personally support. This turns one beautiful sponsorship into a sustainable, joyful loop — powered by $NIBBLES and the simple idea of people helping people helping people.

