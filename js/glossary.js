// Shared Glossary System - centralized for consistency and easier maintenance
// Expanded with more precise, heartfelt, high-caliber language (Bilyeu depth + Vitalik elegance + Elon precision)
// All pages should load this for the info icons (ⓘ)

window.SHHGlossary = {
  glossary: {
    "mercy flywheel": {
      title: "Mercy Flywheel",
      simple: "A self-reinforcing system. When you hold or use the tokens, a small part automatically helps real dogs and real families, and that help creates more good over time.",
      impact: "Your quiet participation keeps real mercy turning without extra effort from you."
    },
    "soulbound": {
      title: "Soulbound",
      simple: "Permanent digital records on the blockchain that stay attached to a specific dog or story forever. They cannot be sold or transferred away.",
      impact: "No dog is ever forgotten. Their full life travels with them."
    },
    "circles of mercy": {
      title: "Circles of Mercy",
      simple: "Different levels of ongoing help unlocked by how much of the tokens someone holds. Mercy (starter), Guardian (bigger support), Eternal (long-term legacy).",
      impact: "Holding more quietly unlocks larger or longer-lasting help for the programs."
    },
    "mercy circle": {
      title: "Mercy Circle",
      simple: "The starting level. Holding 25,000 $NIBBLES or $hopeseed quietly begins funding regular therapy visits for seniors.",
      impact: "This is where the gentle, consistent companionship starts for the elders who need it most."
    },
    "guardian circle": {
      title: "Guardian Circle",
      simple: "Deeper commitment at 100,000+. Your holding powers more visits and you receive updates from the hearts touched.",
      impact: "You become a more active guardian of the joy being created."
    },
    "eternal guardian": {
      title: "Eternal Guardian Circle",
      simple: "The highest level at 250,000+. Your name lives with the stories and the wags forever, plus private visit updates.",
      impact: "You help create a permanent legacy of love for these souls."
    },
    "visit activities": {
      title: "Visit Activities",
      simple: "Bingo nights, shared lunches, raffles, story circles, sing-alongs, gentle petting, memory walks, and afternoon tea with the dogs. All the simple senior-appropriate fun that makes every visit unforgettable.",
      impact: "These aren't just cute extras. They are the exact moments that bring light back into lonely rooms."
    },
    "nibbles": {
      title: "$NIBBLES",
      simple: "The token centered on shelter dogs. It powers real programs that also reach the people who need them most: seniors, veterans, inmates, children and families. Through therapy dogs, sanctuaries, and lasting companionship.",
      impact: "Holding it quietly supports dogs and the humans they heal."
    },
    "hopeseed": {
      title: "$hopeseed",
      simple: "The other token. It mainly powers programs that help children, families, and people rebuilding their lives.",
      impact: "Holding it quietly routes support to human programs."
    },
    "silver paws": {
      title: "Silver Paws Therapy Visits",
      simple: "Gentle therapy dogs bringing warmth, stories, bingo, and real companionship to seniors in homes and communities across North America.",
      impact: "One wag at a time, loneliness fades and hearts remember they still matter."
    },
    "soulbound nft": {
      title: "Soulbound NFT / Rescue Passport",
      simple: "A permanent, non-transferable digital record on the blockchain that travels with the dog. It holds their full story, every visit, every memory.",
      impact: "This soul is never lost again. The legacy is real and forever."
    },
    "golden years companion": {
      title: "Golden Years Companion Program",
      simple: "Matching screened seniors 60+ (especially widows and widowers) with calm shelter dogs five years and older. Every cost for the dog's life is covered so the bond can simply be love.",
      impact: "Two souls who need each other finally get to be each other's quiet home, for the rest of their days."
    },
    "golden pair": {
      title: "Golden Pair",
      simple: "A matched senior and steady adult dog living together with full lifetime support from the program. Their story becomes part of the living Golden Pairs gallery.",
      impact: "Every pair proves that no one has to be alone and no good dog has to keep waiting."
    },
    "welcome home grant": {
      title: "Welcome Home Grant",
      simple: "A one-time $800 grant given when a Golden Pair is matched. Covers bed, crate, leash, collar, and the very first vet visit so the beginning feels safe and joyful.",
      impact: "The senior and dog start with everything they need for dignity and comfort from day one."
    },
    "lifetime support": {
      title: "Lifetime Support",
      simple: "$180 to $250 every month for premium food, grooming, toys, and daily needs, plus a rolling emergency vet buffer of $75 to $150 that carries forward. Nothing is ever left uncovered.",
      impact: "The only thing the senior has to give is love. Every bill is handled quietly by the mercy of $NIBBLES holders."
    },
    "wellness check-ins": {
      title: "Wellness Check-ins",
      simple: "Two to four gentle, unannounced visits (video or in person) per year by trusted volunteers or staff. The senior shows the dog is well. Payments pause only if something needs fixing; the dog stays.",
      impact: "Safety and accountability without ever breaking the sacred bond. The dog never has to leave."
    },
    "senior guardian staking": {
      title: "Senior Guardian Staking",
      simple: "Seniors in the program receive 15 to 20 percent of community top-ups in $NIBBLES and can stake them. They simply share occasional honest photos and short videos of their days together.",
      impact: "Elders become real participants and long-term holders. They earn alongside the community while their hearts heal."
    }
  },

  showExplain: function(termKey) {
    const data = this.glossary[termKey.toLowerCase()];
    if (!data) return;

    const modal = document.getElementById('explain-modal');
    if (!modal) {
      // Fallback for pages without the full modal yet
      alert(data.title + "\n\n" + data.simple + (data.impact ? "\n\n" + data.impact : ""));
      return;
    }

    document.getElementById('explain-title').textContent = data.title;
    document.getElementById('explain-text').textContent = data.simple;
    const impactEl = document.getElementById('explain-impact');
    if (impactEl) impactEl.textContent = data.impact || '';

    modal.classList.add('show');
  },

  closeExplain: function() {
    const modal = document.getElementById('explain-modal');
    if (modal) modal.classList.remove('show');
  },

  initInfoIcons: function() {
    document.querySelectorAll('.info-icon').forEach(function(icon) {
      // Remove leftover title attributes for clean click experience
      if (icon.hasAttribute('title')) icon.removeAttribute('title');

      icon.onclick = null; // clear previous
      icon.addEventListener('click', function(e) {
        e.stopImmediatePropagation();
        const term = icon.getAttribute('data-term') || icon.dataset.term;
        if (term && window.SHHGlossary) {
          window.SHHGlossary.showExplain(term);
        }
      });
    });

    // Keyboard support
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        const m = document.getElementById('explain-modal');
        if (m && m.classList.contains('show') && window.SHHGlossary) {
          window.SHHGlossary.closeExplain();
        }
      }
    });
  }
};

// Auto-init when DOM is ready (for pages that load this script)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    if (window.SHHGlossary && window.SHHGlossary.initInfoIcons) {
      window.SHHGlossary.initInfoIcons();
    }
  });
} else {
  if (window.SHHGlossary && window.SHHGlossary.initInfoIcons) {
    window.SHHGlossary.initInfoIcons();
  }
}
