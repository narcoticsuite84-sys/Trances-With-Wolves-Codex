window.CODEX_DATA = {
  settlements: [
    {
      id: "village-of-barovia",
      name: "Village of Barovia",
      subtitle: "Settlement beneath Castle Ravenloft",
      image: "assets/village-of-barovia.webp",
      overview: "The easternmost settlement in the valley lies beneath the looming shadow of Castle Ravenloft. When first encountered, the Village of Barovia is still bearing the fresh wounds of an undead siege. Barricades choke its narrow streets, frightened families shelter behind shuttered windows, and exhausted defenders cling to what little safety remains. Even before the dead began to gather, this was a place accustomed to grief; now every distant cry and footfall threatens another attack.",
      locations: ["church-of-barovia", "blood-of-the-vine", "burgomasters-mansion"],
      residents: ["ireena-kolyana", "ismark-kolyanovich", "father-donavich", "doru", "arik"]
    }
  ],
  locations: [
    {
      id: "church-of-barovia",
      settlementId: "village-of-barovia",
      name: "Church of Barovia",
      subtitle: "A failing sanctuary",
      image: "assets/church-of-barovia.webp",
      overview: "A weathered church stands beyond the village houses, its age and neglect plain to see. Father Donavich keeps watch over the sanctuary, offering what comfort he can to a community beset by death. For those seeking prayer, counsel, or burial rites, it remains one of the village’s few sacred places.",
      residents: ["father-donavich", "doru"]
    },
    {
      id: "blood-of-the-vine",
      settlementId: "village-of-barovia",
      name: "Blood of the Vine Tavern",
      subtitle: "Tavern and gathering place",
      image: "",
      overview: "A dim, smoke-stained tavern near the centre of the village. Its warmth is meagre, but during the siege it offers company, news, and a brief refuge behind a closed door. Arik tends the bar in near silence while patrons keep one ear turned toward the street.",
      residents: ["arik"]
    },
    {
      id: "burgomasters-mansion",
      settlementId: "village-of-barovia",
      name: "Burgomaster’s Mansion",
      subtitle: "Residence of the burgomaster’s family",
      image: "",
      overview: "The burgomaster’s home bears the marks of repeated attack. Its doors and walls have been battered, and its rooms serve as both refuge and command post during the siege. Within, Ismark and Ireena carry the burdens left by their father’s death.",
      residents: ["ireena-kolyana", "ismark-kolyanovich"]
    }
  ],
  people: [
    {
      id: "ireena-kolyana",
      name: "Ireena Kolyana",
      subtitle: "Noblewoman of the Village of Barovia",
      image: "assets/ireena-kolyana.webp",
      quote: "Though the Mists hem her world, Ireena has never let them define her.",
      overview: "To the people of the Village of Barovia, Ireena Kolyana is known as a compassionate, curious, yet quietly stubborn young noblewoman. Those fortunate enough to earn her trust discover someone more vulnerable beneath that composed exterior: an anxious, determined woman who dreams of a life beyond Barovia’s oppressive skies, where fear no longer governs each passing day.\n\nThe recent death of her father and the hardships endured by the village have demanded a strength few could summon. Rather than allowing grief to harden her, Ireena continues to meet others with kindness, believing understanding should always be sought before violence. When reason fails, however, she does not shrink from danger. Though she draws her rapier reluctantly in her own defence, she does so without hesitation to protect another.\n\nDespite the uncertainty surrounding her future, Ireena remains steadfast beside her brother, Ismark, sharing in the burden of safeguarding their home and the people who still look to them for hope.",
      settlementId: "village-of-barovia",
      locationId: "burgomasters-mansion",
      associates: ["ismark-kolyanovich"]
    },
    {
      id: "ismark-kolyanovich",
      name: "Ismark Kolyanovich",
      subtitle: "Burgomaster of the Village of Barovia",
      image: "",
      quote: "",
      overview: "Ismark is the son and successor of the late Burgomaster Kolyan Indirovich. Worn down by sleepless nights and the responsibility of defending the village, he remains direct, hospitable, and determined to protect those still in his care—most of all his sister, Ireena.",
      settlementId: "village-of-barovia",
      locationId: "burgomasters-mansion",
      associates: ["ireena-kolyana"]
    },
    {
      id: "father-donavich",
      name: "Father Donavich",
      subtitle: "Priest of the Village of Barovia",
      image: "",
      quote: "",
      overview: "Father Donavich tends the village church and offers what aid he can to a community beset by death. He appears exhausted, his faith strained by private sorrow as well as the suffering beyond his doors. Even so, he continues to serve those who seek prayer, counsel, or a final resting place.",
      settlementId: "village-of-barovia",
      locationId: "church-of-barovia",
      associates: ["doru"]
    },
    {
      id: "doru",
      name: "Doru",
      subtitle: "Son of Father Donavich",
      image: "",
      quote: "",
      overview: "Doru is Father Donavich’s son, a young man whose return to the village has brought neither peace nor celebration. Whatever he endured has left him pale, troubled, and at war with himself. His father’s fear for him is plain.",
      settlementId: "village-of-barovia",
      locationId: "church-of-barovia",
      associates: ["father-donavich"]
    },
    {
      id: "arik",
      name: "Arik",
      subtitle: "Barkeep of the Blood of the Vine",
      image: "",
      quote: "",
      overview: "Arik keeps the Blood of the Vine Tavern with little conversation and less ceremony. He pours drinks, collects coin, and watches the room with the detached patience of a man long accustomed to Barovia’s misery.",
      settlementId: "village-of-barovia",
      locationId: "blood-of-the-vine",
      associates: []
    }
  ]
};
