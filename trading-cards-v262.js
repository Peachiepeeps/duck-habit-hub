(function(){
  "use strict";
  const TC=window.DuckieTradingCards;
  if(!TC) return;

  const NEW_CARDS=[
  {
    "id": "f-hibiki-jackie",
    "name": "Hibiki x Jackie",
    "art": "trading-cards/fabled/F-hibiki-jackie.png",
    "rarity": "fabled",
    "number": "F-011",
    "category": "Fabled",
    "hint": "Find this Fabled card in a Card Pack or as a very rare Daily Shop offer."
  },
  {
    "id": "f-loofah",
    "name": "Loofah",
    "art": "trading-cards/fabled/F-loofah.png",
    "rarity": "fabled",
    "number": "F-012",
    "category": "Fabled",
    "hint": "Find this Fabled card in a Card Pack or as a very rare Daily Shop offer."
  },
  {
    "id": "f-cool-seagull",
    "name": "Cool Seagull",
    "art": "trading-cards/fabled/F-cool-seagull.png",
    "rarity": "fabled",
    "number": "F-013",
    "category": "Fabled",
    "hint": "Find this Fabled card in a Card Pack or as a very rare Daily Shop offer."
  },
  {
    "id": "f-seaunicorn-seaturtle",
    "name": "Seaunicorn x Sea Turtle",
    "art": "trading-cards/fabled/F-seaunicorn-seaturtle.png",
    "rarity": "fabled",
    "number": "F-014",
    "category": "Fabled",
    "hint": "Find this Fabled card in a Card Pack or as a very rare Daily Shop offer."
  },
  {
    "id": "f-miko-espurr",
    "name": "Miko + Espurr",
    "art": "trading-cards/fabled/F-miko-espurr.png",
    "rarity": "fabled",
    "number": "F-015",
    "category": "Fabled",
    "hint": "Find this Fabled card in a Card Pack or as a very rare Daily Shop offer."
  },
  {
    "id": "f-frappe",
    "name": "Frappe",
    "art": "trading-cards/fabled/F-frappe.png",
    "rarity": "fabled",
    "number": "F-016",
    "category": "Fabled",
    "hint": "Find this Fabled card in a Card Pack or as a very rare Daily Shop offer."
  },
  {
    "id": "f-gummy-shark",
    "name": "Gummy Shark",
    "art": "trading-cards/fabled/F-gummy-shark.png",
    "rarity": "fabled",
    "number": "F-017",
    "category": "Fabled",
    "hint": "Find this Fabled card in a Card Pack or as a very rare Daily Shop offer."
  },
  {
    "id": "f-venni",
    "name": "Venni",
    "art": "trading-cards/fabled/F-venni.png",
    "rarity": "fabled",
    "number": "F-018",
    "category": "Fabled",
    "hint": "Find this Fabled card in a Card Pack or as a very rare Daily Shop offer."
  },
  {
    "id": "f-catfish",
    "name": "Catfish",
    "art": "trading-cards/fabled/F-catfish.png",
    "rarity": "fabled",
    "number": "F-019",
    "category": "Fabled",
    "hint": "Find this Fabled card in a Card Pack or as a very rare Daily Shop offer."
  },
  {
    "id": "f-silly",
    "name": "Silly",
    "art": "trading-cards/fabled/F-silly.png",
    "rarity": "fabled",
    "number": "F-020",
    "category": "Fabled",
    "hint": "Find this Fabled card in a Card Pack or as a very rare Daily Shop offer."
  },
  {
    "id": "c-plushbun",
    "enemyId": "plushbun",
    "name": "Plushbun",
    "art": "enemies/plushbun/base/idle-1.png",
    "rarity": "common",
    "number": "C-023",
    "category": "Wandering Encounter",
    "hint": "Meet Plushbun in any Duck Quest stage, find it in a pack, or check the Daily Shop."
  },
  {
    "id": "r-plushbun",
    "enemyId": "plushbun",
    "name": "Shiny Plushbun",
    "art": "enemies/plushbun/base/shiny-idle-1.png",
    "rarity": "rare",
    "number": "R-040",
    "category": "Wandering Encounter Shiny",
    "hint": "Encounter a Shiny Plushbun in Duck Quest, or get very lucky with a pack or Daily Shop offer."
  }
];
  for(const card of NEW_CARDS){
    if(TC.byId[card.id]) continue;
    TC.cards.push(card);
    TC.byId[card.id]=card;
  }

  const VARIANT_OPTIONS={
  "cat-slime": [
    {
      "id": "green",
      "label": "Green",
      "art": "enemies/cat-slime/base/Green-idle-1-neutral.webp"
    },
    {
      "id": "purple",
      "label": "Purple",
      "art": "enemies/cat-slime/base/Purple-idle-1-neutral.webp"
    },
    {
      "id": "strawberry",
      "label": "Strawberry",
      "art": "enemies/cat-slime/base/Strawberry-idle-1-neutral.webp"
    },
    {
      "id": "teal",
      "label": "Teal",
      "art": "enemies/cat-slime/base/Teal-idle-1-neutral.webp"
    }
  ],
  "bee": [
    {
      "id": "blue",
      "label": "Blue",
      "art": "enemies/bee/base/Blue-idle-1-high.webp"
    },
    {
      "id": "pink",
      "label": "Pink",
      "art": "enemies/bee/base/Pink-idle-1-high.webp"
    },
    {
      "id": "purple",
      "label": "Purple",
      "art": "enemies/bee/base/Purple-idle-1-high.webp"
    },
    {
      "id": "queen",
      "label": "Queen",
      "art": "enemies/bee/base/Queen-idle-1-high.webp"
    }
  ],
  "flower": [
    {
      "id": "blue",
      "label": "Blue",
      "art": "enemies/flower/base/Blue-idle-1.webp"
    },
    {
      "id": "orange",
      "label": "Orange",
      "art": "enemies/flower/base/Orange-idle-1.webp"
    },
    {
      "id": "pink",
      "label": "Pink",
      "art": "enemies/flower/base/Pink-idle-1.webp"
    },
    {
      "id": "rainbow",
      "label": "Rainbow",
      "art": "enemies/flower/base/Rainbow-idle-1.webp"
    }
  ],
  "cool-seagull": [
    {
      "id": "black",
      "label": "Black",
      "art": "enemies/cool-seagull/base/Black-idle-1.webp"
    },
    {
      "id": "blue",
      "label": "Blue",
      "art": "enemies/cool-seagull/base/Blue-idle-1.webp"
    },
    {
      "id": "pink",
      "label": "Pink",
      "art": "enemies/cool-seagull/base/Pink-idle-1.webp"
    },
    {
      "id": "yellow",
      "label": "Yellow",
      "art": "enemies/cool-seagull/base/Yellow-idle-1.webp"
    }
  ],
  "sea-turtle": [
    {
      "id": "blue",
      "label": "Blue",
      "art": "enemies/sea-turtle/base/Blue-idle-1.webp"
    },
    {
      "id": "gold",
      "label": "Gold",
      "art": "enemies/sea-turtle/base/Gold-idle-1.webp"
    },
    {
      "id": "pink",
      "label": "Pink",
      "art": "enemies/sea-turtle/base/Pink-idle-1.webp"
    },
    {
      "id": "purple",
      "label": "Purple",
      "art": "enemies/sea-turtle/base/Purple-idle-1.webp"
    }
  ],
  "catfish": [
    {
      "id": "black",
      "label": "Black",
      "art": "enemies/catfish/base/Black-idle-1.webp"
    },
    {
      "id": "brown",
      "label": "Brown",
      "art": "enemies/catfish/base/Brown-idle-1.webp"
    },
    {
      "id": "navy",
      "label": "Navy",
      "art": "enemies/catfish/base/Navy-idle-1.webp"
    },
    {
      "id": "orange",
      "label": "Orange",
      "art": "enemies/catfish/base/Orange-idle-1.webp"
    }
  ],
  "acorn-mouse": [
    {
      "id": "blue",
      "label": "Blue",
      "art": "enemies/acorn-mouse/base/blue-idle-1.webp"
    },
    {
      "id": "green",
      "label": "Green",
      "art": "enemies/acorn-mouse/base/green-idle-1.webp"
    },
    {
      "id": "pink",
      "label": "Pink",
      "art": "enemies/acorn-mouse/base/pink-idle-1.webp"
    },
    {
      "id": "purple",
      "label": "Purple",
      "art": "enemies/acorn-mouse/base/purple-idle-1.webp"
    }
  ],
  "seaunicorn": [
    {
      "id": "blue",
      "label": "Blue",
      "art": "enemies/seaunicorn/base/blue-idle-1.webp"
    },
    {
      "id": "dark",
      "label": "Dark",
      "art": "enemies/seaunicorn/base/dark-idle-1.webp"
    },
    {
      "id": "orange",
      "label": "Orange",
      "art": "enemies/seaunicorn/base/orange-idle-1.webp"
    },
    {
      "id": "pink",
      "label": "Pink",
      "art": "enemies/seaunicorn/base/pink-idle-1.webp"
    }
  ],
  "catterpillar": [
    {
      "id": "blue",
      "label": "Blue",
      "art": "enemies/catterpillar/base/blue-idle-1.png"
    },
    {
      "id": "orange",
      "label": "Orange",
      "art": "enemies/catterpillar/base/orange-idle-1.png"
    },
    {
      "id": "pink",
      "label": "Pink",
      "art": "enemies/catterpillar/base/pink-idle-1.png"
    },
    {
      "id": "purple",
      "label": "Purple",
      "art": "enemies/catterpillar/base/purple-idle-1.png"
    }
  ],
  "sea-star": [
    {
      "id": "blue",
      "label": "Blue",
      "art": "enemies/sea-star/base/blue-idle-1.png"
    },
    {
      "id": "green",
      "label": "Green",
      "art": "enemies/sea-star/base/green-idle-1.png"
    },
    {
      "id": "pink",
      "label": "Pink",
      "art": "enemies/sea-star/base/pink-idle-1.png"
    },
    {
      "id": "purple",
      "label": "Purple",
      "art": "enemies/sea-star/base/purple-idle-1.png"
    }
  ],
  "star-mouse": [
    {
      "id": "blue",
      "label": "Blue",
      "art": "enemies/star-mouse/base/blue-idle-1.png"
    },
    {
      "id": "mint",
      "label": "Mint",
      "art": "enemies/star-mouse/base/mint-idle-1.png"
    },
    {
      "id": "pink",
      "label": "Pink",
      "art": "enemies/star-mouse/base/pink-idle-1.png"
    },
    {
      "id": "purple",
      "label": "Purple",
      "art": "enemies/star-mouse/base/purple-idle-1.png"
    }
  ],
  "puff-fairy": [
    {
      "id": "dark",
      "label": "Dark",
      "art": "enemies/puff-fairy/base/dark-idle-1.png"
    },
    {
      "id": "gold",
      "label": "Gold",
      "art": "enemies/puff-fairy/base/gold-idle-1.png"
    },
    {
      "id": "pink",
      "label": "Pink",
      "art": "enemies/puff-fairy/base/pink-idle-1.png"
    },
    {
      "id": "purple",
      "label": "Purple",
      "art": "enemies/puff-fairy/base/purple-idle-1.png"
    }
  ],
  "tulipa": [
    {
      "id": "dark",
      "label": "Dark",
      "art": "enemies/tulipa/base/dark-idle-1.png"
    },
    {
      "id": "orange",
      "label": "Orange",
      "art": "enemies/tulipa/base/orange-idle-1.png"
    },
    {
      "id": "purple",
      "label": "Purple",
      "art": "enemies/tulipa/base/purple-idle-1.png"
    },
    {
      "id": "yellow",
      "label": "Yellow",
      "art": "enemies/tulipa/base/yellow-idle-1.png"
    }
  ],
  "snoud": [
    {
      "id": "gold",
      "label": "Gold",
      "art": "enemies/snoud/base/gold-idle-1.png"
    },
    {
      "id": "green",
      "label": "Green",
      "art": "enemies/snoud/base/green-idle-1.png"
    },
    {
      "id": "grey",
      "label": "Grey",
      "art": "enemies/snoud/base/grey-idle-1.png"
    },
    {
      "id": "purple",
      "label": "Purple",
      "art": "enemies/snoud/base/purple-idle-1.png"
    }
  ],
  "cloud-bunny": [
    {
      "id": "black",
      "label": "Black",
      "art": "enemies/cloud-bunny/base/black-idle-1.png"
    },
    {
      "id": "blue",
      "label": "Blue",
      "art": "enemies/cloud-bunny/base/blue-idle-1.png"
    },
    {
      "id": "grey",
      "label": "Grey",
      "art": "enemies/cloud-bunny/base/grey-idle-1.png"
    },
    {
      "id": "pink",
      "label": "Pink",
      "art": "enemies/cloud-bunny/base/pink-idle-1.png"
    }
  ],
  "lunar-moth": [
    {
      "id": "blue",
      "label": "Blue",
      "art": "enemies/lunar-moth/base/blue-idle-1.png"
    },
    {
      "id": "golden",
      "label": "Golden",
      "art": "enemies/lunar-moth/base/golden-idle-1.png"
    },
    {
      "id": "mint",
      "label": "Mint",
      "art": "enemies/lunar-moth/base/mint-idle-1.png"
    },
    {
      "id": "pink",
      "label": "Pink",
      "art": "enemies/lunar-moth/base/pink-idle-1.png"
    }
  ],
  "apple-baby": [
    {
      "id": "brown",
      "label": "Brown",
      "art": "enemies/apple-baby/base/brown-idle-1.webp"
    },
    {
      "id": "gold",
      "label": "Gold",
      "art": "enemies/apple-baby/base/gold-idle-1.webp"
    },
    {
      "id": "green",
      "label": "Green",
      "art": "enemies/apple-baby/base/green-idle-1.webp"
    },
    {
      "id": "pink",
      "label": "Pink",
      "art": "enemies/apple-baby/base/pink-idle-1.webp"
    }
  ],
  "gummy-worm": [
    {
      "id": "orange",
      "label": "Orange",
      "art": "enemies/gummy-worm/base/orange-idle-1.webp"
    },
    {
      "id": "purple",
      "label": "Purple",
      "art": "enemies/gummy-worm/base/purple-idle-1.webp"
    },
    {
      "id": "red",
      "label": "Red",
      "art": "enemies/gummy-worm/base/red-idle-1.webp"
    },
    {
      "id": "white",
      "label": "White",
      "art": "enemies/gummy-worm/base/white-idle-1.webp"
    }
  ],
  "pudding-pig": [
    {
      "id": "blueberry",
      "label": "Blueberry",
      "art": "enemies/pudding-pig/base/blueberry-idle-1.webp"
    },
    {
      "id": "choco",
      "label": "Choco",
      "art": "enemies/pudding-pig/base/choco-idle-1.webp"
    },
    {
      "id": "mint",
      "label": "Mint",
      "art": "enemies/pudding-pig/base/mint-idle-1.webp"
    },
    {
      "id": "pink",
      "label": "Pink",
      "art": "enemies/pudding-pig/base/pink-idle-1.webp"
    }
  ],
  "gingerlolly": [
    {
      "id": "blue",
      "label": "Blue",
      "art": "enemies/gingerlolly/base/blue-idle-1.webp"
    },
    {
      "id": "green",
      "label": "Green",
      "art": "enemies/gingerlolly/base/green-idle-1.webp"
    },
    {
      "id": "purple",
      "label": "Purple",
      "art": "enemies/gingerlolly/base/purple-idle-1.webp"
    },
    {
      "id": "yellow",
      "label": "Yellow",
      "art": "enemies/gingerlolly/base/yellow-idle-1.webp"
    }
  ],
  "candycane-deer": [
    {
      "id": "bubblegum",
      "label": "Bubblegum",
      "art": "enemies/candycane-deer/base/bubblegum-idle-1.webp"
    },
    {
      "id": "mintchoco",
      "label": "Mintchoco",
      "art": "enemies/candycane-deer/base/mintchoco-idle-1.webp"
    },
    {
      "id": "xmas",
      "label": "Xmas",
      "art": "enemies/candycane-deer/base/xmas-idle-1.webp"
    },
    {
      "id": "yellow",
      "label": "Yellow",
      "art": "enemies/candycane-deer/base/yellow-idle-1.webp"
    }
  ],
  "mushroom-cat": [
    {
      "id": "gold",
      "label": "Gold",
      "art": "bosses/mushroom-cat/base/Gold-idle-1.webp"
    },
    {
      "id": "green",
      "label": "Green",
      "art": "bosses/mushroom-cat/base/Green-idle-1.webp"
    },
    {
      "id": "grey",
      "label": "Grey",
      "art": "bosses/mushroom-cat/base/Grey-idle-1.webp"
    },
    {
      "id": "purple",
      "label": "Purple",
      "art": "bosses/mushroom-cat/base/Purple-idle-1.webp"
    }
  ],
  "vampire-squid": [
    {
      "id": "blue",
      "label": "Blue",
      "art": "bosses/vampire-squid/base/Blue-idle-1.webp"
    },
    {
      "id": "coral",
      "label": "Coral",
      "art": "bosses/vampire-squid/base/Coral-idle-1.webp"
    },
    {
      "id": "pink",
      "label": "Pink",
      "art": "bosses/vampire-squid/base/Pink-idle-1.webp"
    },
    {
      "id": "purple",
      "label": "Purple",
      "art": "bosses/vampire-squid/base/Purple-idle-1.webp"
    }
  ],
  "tree-squirrel": [
    {
      "id": "green",
      "label": "Green",
      "art": "bosses/tree-squirrel/base/green-idle-1.webp"
    },
    {
      "id": "peach",
      "label": "Peach",
      "art": "bosses/tree-squirrel/base/peach-idle-1.webp"
    },
    {
      "id": "pink",
      "label": "Pink",
      "art": "bosses/tree-squirrel/base/pink-idle-1.webp"
    },
    {
      "id": "yellow",
      "label": "Yellow",
      "art": "bosses/tree-squirrel/base/yellow-idle-1.webp"
    }
  ],
  "jellybun": [
    {
      "id": "gold",
      "label": "Gold",
      "art": "bosses/jellybun/base/gold-idle-1.webp"
    },
    {
      "id": "green",
      "label": "Green",
      "art": "bosses/jellybun/base/green-idle-1.webp"
    },
    {
      "id": "grey",
      "label": "Grey",
      "art": "bosses/jellybun/base/grey-idle-1.webp"
    },
    {
      "id": "pink",
      "label": "Pink",
      "art": "bosses/jellybun/base/pink-idle-1.webp"
    }
  ],
  "aries": [
    {
      "id": "blue",
      "label": "Blue",
      "art": "bosses/aries/base/blue-idle-1.png"
    },
    {
      "id": "galaxy",
      "label": "Galaxy",
      "art": "bosses/aries/base/galaxy-idle-1.png"
    },
    {
      "id": "gold",
      "label": "Gold",
      "art": "bosses/aries/base/gold-idle-1.png"
    },
    {
      "id": "pink",
      "label": "Pink",
      "art": "bosses/aries/base/pink-idle-1.png"
    },
    {
      "id": "purple",
      "label": "Purple",
      "art": "bosses/aries/base/purple-idle-1.png"
    }
  ],
  "cherub-duck": [
    {
      "id": "aqua",
      "label": "Aqua",
      "art": "bosses/cherub-duck/base/aqua-idle-1.png"
    },
    {
      "id": "mint",
      "label": "Mint",
      "art": "bosses/cherub-duck/base/mint-idle-1.png"
    },
    {
      "id": "pink",
      "label": "Pink",
      "art": "bosses/cherub-duck/base/pink-idle-1.png"
    },
    {
      "id": "purple",
      "label": "Purple",
      "art": "bosses/cherub-duck/base/purple-idle-1.png"
    }
  ],
  "gummy-shark": [
    {
      "id": "lemon",
      "label": "Lemon",
      "art": "bosses/gummy-shark/base/lemon-idle-1.webp"
    },
    {
      "id": "lime",
      "label": "Lime",
      "art": "bosses/gummy-shark/base/lime-idle-1.webp"
    },
    {
      "id": "orange",
      "label": "Orange",
      "art": "bosses/gummy-shark/base/orange-idle-1.webp"
    },
    {
      "id": "strawberry",
      "label": "Strawberry",
      "art": "bosses/gummy-shark/base/strawberry-idle-1.webp"
    }
  ],
  "cream-fox": [
    {
      "id": "choco",
      "label": "Choco",
      "art": "bosses/cream-fox/base/choco-idle-1.webp"
    },
    {
      "id": "chocomint",
      "label": "Chocomint",
      "art": "bosses/cream-fox/base/chocomint-idle-1.webp"
    },
    {
      "id": "lemon",
      "label": "Lemon",
      "art": "bosses/cream-fox/base/lemon-idle-1.webp"
    },
    {
      "id": "strawberry",
      "label": "Strawberry",
      "art": "bosses/cream-fox/base/strawberry-idle-1.webp"
    }
  ],
  "plushbun": [
    {
      "id": "pink",
      "label": "Pink",
      "art": "enemies/plushbun/base/pink-idle-1.png"
    },
    {
      "id": "mint",
      "label": "Mint",
      "art": "enemies/plushbun/base/mint-idle-1.png"
    },
    {
      "id": "purple",
      "label": "Purple",
      "art": "enemies/plushbun/base/purple-idle-1.png"
    },
    {
      "id": "red",
      "label": "Red",
      "art": "enemies/plushbun/base/red-idle-1.png"
    }
  ],
  "mimic": [
    {
      "id": "lucky",
      "label": "Lucky",
      "art": "enemies/mimic/lucky/idle-1.webp"
    },
    {
      "id": "healthy",
      "label": "Healthy",
      "art": "enemies/mimic/healthy/idle-1.webp"
    }
  ]
};

  const baseEnsure=TC.ensureState;
  function ensureCraftState(data){
    const state=baseEnsure(data);
    if(!state) return null;
    state.cardDust=Math.max(0,Math.floor(Number(state.cardDust)||0));
    if(!state.crafting || typeof state.crafting!=="object" || Array.isArray(state.crafting)) state.crafting={};
    const c=state.crafting;
    if(!c.rarity || typeof c.rarity!=="object" || Array.isArray(c.rarity)) c.rarity={};
    if(!c.holo || typeof c.holo!=="object" || Array.isArray(c.holo)) c.holo={};
    if(!c.variantsUnlocked || typeof c.variantsUnlocked!=="object" || Array.isArray(c.variantsUnlocked)) c.variantsUnlocked={};
    if(!c.displayVariant || typeof c.displayVariant!=="object" || Array.isArray(c.displayVariant)) c.displayVariant={};
    return state;
  }
  TC.ensureState=ensureCraftState;

  const baseRead=TC.readSave;
  TC.readSave=function(){
    const data=baseRead();
    ensureCraftState(data);
    return data;
  };
  const baseWrite=TC.writeSave;
  TC.writeSave=function(data){
    ensureCraftState(data);
    baseWrite(data);
  };

  function craftFor(cardId,data){
    const state=ensureCraftState(data || TC.readSave());
    const c=state.crafting;
    if(!Array.isArray(c.variantsUnlocked[cardId])) c.variantsUnlocked[cardId]=["default"];
    if(!c.variantsUnlocked[cardId].includes("default")) c.variantsUnlocked[cardId].unshift("default");
    return {
      state,
      rarity:c.rarity[cardId] || null,
      holo:Boolean(c.holo[cardId]),
      unlocked:c.variantsUnlocked[cardId],
      displayVariant:c.displayVariant[cardId] || "default"
    };
  }

  function effectiveRarity(card,data){
    if(!card || card.rarity==="fabled") return card?.rarity || "common";
    const current=craftFor(card.id,data).rarity;
    if(card.rarity==="rare") return "rare";
    if(card.rarity==="uncommon") return current==="rare" ? "rare" : "uncommon";
    if(card.rarity==="common") return current==="rare" ? "rare" : current==="uncommon" ? "uncommon" : "common";
    return card.rarity;
  }

  function variantOptions(card){
    if(!card?.enemyId || card.rarity==="fabled" || String(card.id).startsWith("r-")) return [];
    const extras=VARIANT_OPTIONS[card.enemyId] || [];
    return [{id:"default",label:"Default",art:card.art},...extras];
  }

  TC.cardCraft={ensure:ensureCraftState,craftFor,effectiveRarity,variantOptions,variantMap:VARIANT_OPTIONS};
  TC.variantOptions=variantOptions;
  TC.effectiveRarity=effectiveRarity;

  const baseCreateFace=TC.createFace;
  TC.createFace=function(cardOrId,opts={}){
    const card=typeof cardOrId==="string" ? TC.byId[cardOrId] : cardOrId;
    if(!card) return baseCreateFace(cardOrId,opts);
    const data=TC.readSave();
    const craft=craftFor(card.id,data);
    let displayArt=card.art;
    const options=variantOptions(card);
    const selected=options.find(v=>v.id===craft.displayVariant && craft.unlocked.includes(v.id));
    if(selected) displayArt=selected.art;
    const displayRarity=effectiveRarity(card,data);
    const displayCard=card.rarity==="fabled" ? card : {...card,rarity:displayRarity,art:displayArt};
    const face=baseCreateFace(displayCard,opts);
    face.dataset.cardId=card.id;
    face.dataset.baseRarity=card.rarity;
    face.dataset.displayRarity=displayRarity;
    if(craft.holo && !opts.locked){
      face.classList.add("tc-holo-v262");
      const holo=document.createElement("i");
      holo.className="tc-holo-overlay-v262";
      holo.setAttribute("aria-hidden","true");
      face.append(holo);
    }
    return face;
  };

  window.DUCKIE_TRADING_CARD_CRAFT_CORE="24.262";
})();
