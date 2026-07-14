window.CODEX_DATA = {
  settlements: [
    {
      id: "village-of-barovia",
      name: "Village of Barovia",
      subtitle: "Settlement beneath Castle Ravenloft",
      image: "assets/village-of-barovia.webp",
      overview: "The easternmost settlement in the valley lies beneath the looming shadow of Castle Ravenloft. When first encountered, the Village of Barovia is still bearing the fresh wounds of an undead siege. Barricades choke its narrow streets, frightened families shelter behind shuttered windows, and exhausted defenders cling to what little safety remains. Even before the dead began to gather, this was a place accustomed to grief; now every distant cry and footfall threatens another attack.",
      locations: [
        "church-of-barovia",
        "blood-of-the-vine",
        "burgomasters-mansion",
        "bildraths-mercantile",
        "mad-marys-townhouse"
      ],
      residents: [
        "ireena-kolyana",
        "ismark-kolyanovich",
        "father-donavich",
        "doru",
        "arik",
        "bildrath-cantemir",
        "parriwimple",
        "mad-mary"
      ]
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
    },
    {
      id: "bildraths-mercantile",
      settlementId: "village-of-barovia",
      name: "Bildrath’s Mercantile",
      subtitle: "General store",
      image: "",
      overview: "Bildrath’s Mercantile is the Village of Barovia’s general store, owned and operated by Bildrath Cantemir. Its shelves carry practical goods for travellers and villagers willing to meet the proprietor’s prices.",
      residents: ["bildrath-cantemir", "parriwimple"]
    },
    {
      id: "mad-marys-townhouse",
      settlementId: "village-of-barovia",
      name: "Mad Mary’s Townhouse",
      subtitle: "Private residence",
      image: "",
      overview: "A modest townhouse belonging to Mad Mary, a distraught woman whose anguished cries can often be heard throughout the Village of Barovia.",
      residents: ["mad-mary"]
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
      associates: ["ismark-kolyanovich"],
      influence: "You helped bury her father, the late Burgomaster Kolyan Indirovich."
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
      associates: ["ireena-kolyana"],
      influence: "You helped bury his father, the late Burgomaster Kolyan Indirovich."
    },
    {
      id: "father-donavich",
      name: "Father Donavich",
      subtitle: "Priest of the Church of Barovia",
      image: "",
      quote: "",
      overview: "To the world, Father Donavich is a grieving, yet zealous father. To those he trusts, Donavich is a broken man adrift in the world, lost and confused without guidance or purpose.\n\nIn a fight, Father Donavich would ordinarily fight to defend his people and his church. In his current state, however, he would immediately surrender, too wracked with guilt to even defend his own life.\n\nFather Donavich is Doru’s father and the priest of the Church of Barovia.",
      settlementId: "village-of-barovia",
      locationId: "church-of-barovia",
      associates: ["doru"],
      influence: ""
    },
    {
      id: "doru",
      name: "Doru",
      subtitle: "Son of Father Donavich",
      image: "",
      quote: "",
      overview: "To the world, Doru is a monstrous, bloodthirsty vampire spawn. To those he trusts, Doru is a broken, guilt-ridden young man who is desperate to avoid harming those he loves.\n\nIn a fight, Doru would always seek to flee rather than risk hurting another creature. If Father Donavich or Gertruda were threatened, however, he would fight with savage determination to protect them.\n\nDoru is the son of Father Donavich, a former friend of Escher, and the betrothed of Gertruda.",
      settlementId: "village-of-barovia",
      locationId: "church-of-barovia",
      associates: ["father-donavich"],
      influence: "You helped Doru overcome his blood lust. Your words later caused him to fear for Gertruda’s safety."
    },
    {
      id: "arik",
      name: "Arik",
      subtitle: "Proprietor of the Blood of the Vine Tavern",
      image: "",
      quote: "",
      overview: "Arik is the proprietor of the Blood of the Vine Tavern. Though quiet and reserved, he keeps the tavern running for the weary souls of the Village of Barovia and serves those who seek shelter within its walls.",
      settlementId: "village-of-barovia",
      locationId: "blood-of-the-vine",
      associates: [],
      influence: ""
    },
    {
      id: "bildrath-cantemir",
      name: "Bildrath Cantemir",
      subtitle: "Proprietor of Bildrath’s Mercantile",
      image: "",
      quote: "",
      overview: "Bildrath Cantemir owns and operates Bildrath’s Mercantile, the Village of Barovia’s general store. He is Parriwimple’s uncle.",
      settlementId: "village-of-barovia",
      locationId: "bildraths-mercantile",
      associates: ["parriwimple"],
      influence: ""
    },
    {
      id: "parriwimple",
      name: "Parriwimple",
      subtitle: "Assistant at Bildrath’s Mercantile",
      image: "",
      quote: "",
      overview: "To the world, Parriwimple is a cheerful, simple-minded young man. To those he trusts, Parriwimple is a thoughtful, insightful, yet grieving orphan, desperate to move past his parents’ deaths by proving useful to others.\n\nIn a fight, Parriwimple would hold up his hands and plead for peace. If ignored, however, he would swiftly use his great strength to restrain any combatants—with righteous fury if defending his uncle, Bildrath Cantemir.\n\nParriwimple is an orphan and the nephew of the general store owner, Bildrath Cantemir.",
      settlementId: "village-of-barovia",
      locationId: "bildraths-mercantile",
      associates: ["bildrath-cantemir"],
      influence: ""
    },
    {
      id: "mad-mary",
      name: "Mad Mary",
      subtitle: "Distraught resident of the Village of Barovia",
      image: "",
      quote: "",
      overview: "Mad Mary is a distraught woman whose anguished cries can often be heard from her townhouse in the Village of Barovia.",
      settlementId: "village-of-barovia",
      locationId: "mad-marys-townhouse",
      associates: [],
      influence: ""
    }
  ]
};
