const HUB_SAVE_KEY = "duckHabitHubSave_v1";
const MAX_LEVEL = 100;
const AREA_CONFIG = Object.freeze({
  meadow: {
    id:"meadow",
    name:"Meadow",
    label:"MEADOW PATH",
    maxRank:20,
    backgrounds:[
      "assets/backgrounds/meadow/stage-1-tree.webp",
      "assets/backgrounds/meadow/stage-2-bushes.webp",
      "assets/backgrounds/meadow/stage-3-flowers.webp",
      "assets/backgrounds/meadow/stage-4-boss.webp"
    ],
    stageNames:["Meadow Path","Bush Trail","Flower Field","Boss Clearing"],
    resultTitle:"The Meadow is Clear!"
  },
  ocean: {
    id:"ocean",
    name:"Ocean",
    label:"OCEAN ROUTE",
    maxRank:50,
    backgrounds:[
      "assets/backgrounds/ocean/shore.webp",
      "assets/backgrounds/ocean/surface.webp",
      "assets/backgrounds/ocean/deep.webp",
      "assets/backgrounds/ocean/floor.webp"
    ],
    stageNames:["Shore","Ocean Surface","Ocean Deep","Ocean Floor"],
    resultTitle:"The Ocean Route is Clear!"
  }
});

function getAreaConfig(areaId){
  return AREA_CONFIG[areaId] || AREA_CONFIG.meadow;
}

const ICON_BACKGROUND_COLORS = Object.freeze([
  // Starter
  {id:"white",label:"White",value:"#fffaf3",rarity:"starter",source:"starter"},

  // Guaranteed level-up colors
  {id:"pink",label:"Pink",value:"#f2b4ca",rarity:"level",source:"level"},
  {id:"sky-blue",label:"Sky Blue",value:"#b7dbf3",rarity:"level",source:"level"},
  {id:"mint",label:"Mint",value:"#b9e2cb",rarity:"level",source:"level"},
  {id:"lavender",label:"Lavender",value:"#d7c4ef",rarity:"level",source:"level"},
  {id:"periwinkle",label:"Periwinkle",value:"#b9c2ef",rarity:"level",source:"level"},
  {id:"peach",label:"Peach",value:"#f5c1a8",rarity:"level",source:"level"},
  {id:"lilac",label:"Lilac",value:"#e3c7ee",rarity:"level",source:"level"},
  {id:"aqua",label:"Aqua",value:"#a9dfe3",rarity:"level",source:"level"},

  // Chest colors
  {id:"buttercream",label:"Buttercream",value:"#f8e9ae",rarity:"common",source:"chest",weight:10},
  {id:"blush",label:"Blush",value:"#f5ccd7",rarity:"common",source:"chest",weight:10},
  {id:"rose",label:"Rose Pink",value:"#eaa6bb",rarity:"common",source:"chest",weight:9},
  {id:"baby-blue",label:"Baby Blue",value:"#c7e1f5",rarity:"common",source:"chest",weight:9},
  {id:"seafoam",label:"Seafoam",value:"#c2e5d8",rarity:"common",source:"chest",weight:9},
  {id:"soft-coral",label:"Soft Coral",value:"#f2b1a4",rarity:"common",source:"chest",weight:8},
  {id:"sage",label:"Sage",value:"#c8d8b5",rarity:"common",source:"chest",weight:8},

  // Patterned chest backgrounds — pure CSS, no image files needed.
  {id:"pink-gingham",label:"Pink Gingham",rarity:"uncommon",source:"chest",weight:5,value:"linear-gradient(90deg,rgba(255,255,255,.45) 50%,transparent 50%),linear-gradient(rgba(255,255,255,.45) 50%,transparent 50%),#efb8ca",size:"24px 24px"},
  {id:"lavender-gingham",label:"Lavender Gingham",rarity:"uncommon",source:"chest",weight:5,value:"linear-gradient(90deg,rgba(255,255,255,.42) 50%,transparent 50%),linear-gradient(rgba(255,255,255,.42) 50%,transparent 50%),#cdb8eb",size:"24px 24px"},
  {id:"mint-gingham",label:"Mint Gingham",rarity:"uncommon",source:"chest",weight:5,value:"linear-gradient(90deg,rgba(255,255,255,.42) 50%,transparent 50%),linear-gradient(rgba(255,255,255,.42) 50%,transparent 50%),#afd9c2",size:"24px 24px"},
  {id:"periwinkle-gingham",label:"Periwinkle Gingham",rarity:"uncommon",source:"chest",weight:5,value:"linear-gradient(90deg,rgba(255,255,255,.4) 50%,transparent 50%),linear-gradient(rgba(255,255,255,.4) 50%,transparent 50%),#adb8ea",size:"24px 24px"},
  {id:"pink-polka",label:"Pink Polka Dots",rarity:"uncommon",source:"chest",weight:4,value:"radial-gradient(circle at 7px 7px,#fff7fb 0 3px,transparent 3.5px),#ecabc3",size:"22px 22px"},
  {id:"tiny-hearts",label:"Tiny Hearts",rarity:"rare",source:"chest",weight:2,value:"radial-gradient(circle at 25% 35%,#fff 0 3px,transparent 3.5px),radial-gradient(circle at 75% 65%,#fff 0 3px,transparent 3.5px),linear-gradient(135deg,#f4b7cb,#e6c1ef)",size:"28px 28px"},
  {id:"pink-glitter",label:"Pink Glitter",rarity:"rare",source:"chest",weight:1.8,value:"radial-gradient(circle at 15% 20%,#fff 0 1.5px,transparent 2px),radial-gradient(circle at 72% 28%,#ffe9a8 0 1.3px,transparent 1.8px),radial-gradient(circle at 38% 75%,#fff 0 1px,transparent 1.7px),linear-gradient(135deg,#eda9c4,#d995c1)",size:"22px 22px,28px 28px,18px 18px,auto"},
  {id:"lavender-glitter",label:"Lavender Glitter",rarity:"rare",source:"chest",weight:1.8,value:"radial-gradient(circle at 20% 22%,#fff 0 1.5px,transparent 2px),radial-gradient(circle at 68% 40%,#fff0b8 0 1.2px,transparent 1.8px),radial-gradient(circle at 42% 78%,#fff 0 1px,transparent 1.7px),linear-gradient(135deg,#c6b1ea,#aa95d9)",size:"22px 22px,30px 30px,18px 18px,auto"},
  {id:"starry-periwinkle",label:"Starry Periwinkle",rarity:"rare",source:"chest",weight:1.5,value:"radial-gradient(circle at 18% 22%,#fff9cf 0 2px,transparent 2.5px),radial-gradient(circle at 72% 34%,#fff 0 1.5px,transparent 2px),radial-gradient(circle at 48% 78%,#fff9cf 0 1.5px,transparent 2px),linear-gradient(160deg,#9da9df,#c1b1e5)",size:"30px 30px,26px 26px,34px 34px,auto"},
  {id:"gold-glitter",label:"Gold Glitter",rarity:"rare",source:"chest",weight:1.2,value:"radial-gradient(circle at 18% 20%,#fff8d7 0 1.5px,transparent 2px),radial-gradient(circle at 70% 28%,#fff 0 1px,transparent 1.7px),radial-gradient(circle at 45% 78%,#f7c75e 0 1.5px,transparent 2px),linear-gradient(135deg,#edd38a,#cda654)",size:"20px 20px,26px 26px,30px 30px,auto"},

  // Special pastel chest backgrounds — intentionally harder to find.
  {id:"strawberry-milk-sparkle",label:"Strawberry Milk Sparkle",rarity:"rare",source:"chest",weight:.70,value:"radial-gradient(circle at 16% 18%,#fff 0 1.5px,transparent 2px),radial-gradient(circle at 72% 34%,#ffe8a8 0 1.2px,transparent 1.8px),radial-gradient(circle at 40% 78%,#fff 0 1px,transparent 1.7px),linear-gradient(145deg,#f8c3d4,#f4dce4,#fff4ed)",size:"21px 21px,29px 29px,18px 18px,auto"},
  {id:"peach-soda-bubbles",label:"Peach Soda Bubbles",rarity:"rare",source:"chest",weight:.58,value:"radial-gradient(circle at 18% 24%,rgba(255,255,255,.92) 0 3px,transparent 3.7px),radial-gradient(circle at 70% 58%,rgba(255,255,255,.75) 0 2px,transparent 2.8px),radial-gradient(circle at 42% 82%,rgba(255,247,221,.85) 0 1.5px,transparent 2.2px),linear-gradient(145deg,#f7bda7,#f8d5bf,#fff0dc)",size:"34px 34px,27px 27px,23px 23px,auto"},
  {id:"mint-candy-stars",label:"Mint Candy Stars",rarity:"rare",source:"chest",weight:.48,value:"radial-gradient(circle at 20% 25%,#fff3b8 0 2px,transparent 2.6px),radial-gradient(circle at 72% 35%,#e7c9f4 0 2px,transparent 2.6px),radial-gradient(circle at 42% 78%,#f6b9cf 0 1.8px,transparent 2.4px),linear-gradient(135deg,#bce7cf,#d8f0dc)",size:"28px 28px,34px 34px,24px 24px,auto"},
  {id:"cotton-candy-clouds",label:"Cotton Candy Clouds",rarity:"rare",source:"chest",weight:.40,value:"radial-gradient(ellipse at 20% 35%,rgba(255,255,255,.62) 0 8px,transparent 9px),radial-gradient(ellipse at 74% 62%,rgba(255,255,255,.52) 0 9px,transparent 10px),linear-gradient(145deg,#bedef5,#f5c3d9 52%,#d9c7f1)",size:"48px 34px,52px 38px,auto"},
  {id:"sakura-mist",label:"Sakura Mist",rarity:"rare",source:"chest",weight:.32,value:"radial-gradient(ellipse at 18% 24%,#fff2f6 0 3px,transparent 3.8px),radial-gradient(ellipse at 72% 42%,#f6b6cb 0 2.5px,transparent 3.3px),radial-gradient(ellipse at 42% 78%,#fff6f0 0 2px,transparent 2.8px),linear-gradient(145deg,#f4c8d7,#e6d1ef,#f9e6ea)",size:"31px 25px,37px 29px,27px 23px,auto"},

  // Extra ultra-rare special drops.
  {id:"lavender-moonlight",label:"Lavender Moonlight",rarity:"ultra",source:"chest",weight:.10,value:"radial-gradient(circle at 22% 25%,#fff7c9 0 2px,transparent 2.6px),radial-gradient(circle at 72% 34%,#fff 0 1.4px,transparent 2px),radial-gradient(circle at 45% 78%,#fff7c9 0 1.2px,transparent 1.8px),linear-gradient(155deg,#aeb4e8,#c9b8ec,#e3ccef)",size:"34px 34px,27px 27px,39px 39px,auto"},
  {id:"angel-ribbon",label:"Angel Ribbon",rarity:"ultra",source:"chest",weight:.08,value:"repeating-linear-gradient(135deg,rgba(255,255,255,.48) 0 7px,transparent 7px 19px),linear-gradient(135deg,#cbe5f6,#fff3df 48%,#f4c7d9)",size:"34px 34px,auto"},
  {id:"dreamy-hearts",label:"Dreamy Hearts",rarity:"ultra",source:"chest",weight:.065,value:"radial-gradient(circle at 20% 28%,#fff 0 2.4px,transparent 3px),radial-gradient(circle at 72% 38%,#ffe4ef 0 2.4px,transparent 3px),radial-gradient(circle at 44% 78%,#fff5bf 0 1.8px,transparent 2.5px),linear-gradient(145deg,#efb7d0,#d4c1ef,#bfe0ef)",size:"29px 29px,35px 35px,24px 24px,auto"},
  {id:"pastel-confetti",label:"Pastel Confetti",rarity:"ultra",source:"chest",weight:.05,value:"radial-gradient(circle at 16% 22%,#f0a9c5 0 1.8px,transparent 2.4px),radial-gradient(circle at 70% 28%,#a9d9ed 0 1.8px,transparent 2.4px),radial-gradient(circle at 42% 76%,#bde0bf 0 1.8px,transparent 2.4px),radial-gradient(circle at 82% 82%,#d2b9ec 0 1.8px,transparent 2.4px),#fff7e8",size:"24px 24px,31px 31px,28px 28px,35px 35px,auto"},
  {id:"holographic-pastel",label:"Holographic Pastel",rarity:"ultra",source:"chest",weight:.035,value:"radial-gradient(circle at 18% 22%,rgba(255,255,255,.9) 0 1.5px,transparent 2px),radial-gradient(circle at 72% 68%,rgba(255,255,255,.8) 0 1.2px,transparent 1.8px),conic-gradient(from 35deg,#f4b7cf,#c3e2f5,#d8c5f0,#c7ead5,#fff0b8,#f4b7cf)",size:"26px 26px,33px 33px,auto"},
  {id:"sweetheart-rainbow",label:"Sweetheart Rainbow",rarity:"ultra",source:"chest",weight:.02,value:"radial-gradient(circle at 15% 20%,#fff 0 1.7px,transparent 2.2px),radial-gradient(circle at 72% 32%,#fff7ba 0 1.5px,transparent 2px),radial-gradient(circle at 44% 78%,#fff 0 1.3px,transparent 2px),linear-gradient(135deg,#f5a9c3,#f7c999,#d5e5aa,#b6dff0,#c9b8ef,#ecb8dd)",size:"22px 22px,29px 29px,34px 34px,auto"},

  // Ultra-rare chest prizes
  {id:"rainbow",label:"Rainbow",rarity:"ultra",source:"chest",weight:.45,value:"linear-gradient(135deg,#ed9baa,#f1c781,#b7daa0,#9dcfe2,#b7a6e4,#e2abd8)"},
  {id:"rainbow-gingham",label:"Rainbow Gingham",rarity:"ultra",source:"chest",weight:.28,value:"linear-gradient(90deg,rgba(255,255,255,.38) 50%,transparent 50%),linear-gradient(rgba(255,255,255,.38) 50%,transparent 50%),linear-gradient(135deg,#ef9cac,#f4d18d,#b6dda2,#9fd4e6,#b8a9e6,#e7add8)",size:"24px 24px,24px 24px,auto"},
  {id:"rainbow-glitter",label:"Rainbow Glitter",rarity:"ultra",source:"chest",weight:.16,value:"radial-gradient(circle at 14% 20%,#fff 0 1.7px,transparent 2.2px),radial-gradient(circle at 72% 30%,#fff9bd 0 1.5px,transparent 2px),radial-gradient(circle at 42% 76%,#fff 0 1.3px,transparent 2px),linear-gradient(135deg,#ee9dac,#f0c982,#b5dca0,#9fd2e4,#b6a6e2,#e3acd7)",size:"20px 20px,27px 27px,31px 31px,auto"}
]);

const LEVEL_ICON_BACKGROUND_REWARDS = Object.freeze({
  3:"pink",
  5:"sky-blue",
  10:"mint",
  15:"lavender",
  20:"periwinkle",
  30:"peach",
  40:"lilac",
  60:"aqua"
});

function iconBackgroundById(id){ return ICON_BACKGROUND_COLORS.find(color=>color.id===id) || ICON_BACKGROUND_COLORS[0]; }



const DUCK_LIBRARY = [{"id":"angry-duck","name":"Angry Duck","file":"angry-duck.webp"},{"id":"apple-duck","name":"Apple Duck","file":"apple-duck.webp"},{"id":"bathtime-duck","name":"Bathtime Duck","file":"bathtime-duck.webp"},{"id":"duck-on-skateboard","name":"Duck on a Skateboard","file":"duck-on-skateboard.webp"},{"id":"googly-eye-duck","name":"Googly Eye Duck","file":"googly-eye-duck.webp"},{"id":"long-hair-duck","name":"Long Hair Duck","file":"long-hair-duck.webp"},{"id":"magenta-duck","name":"Magenta Duck","file":"magenta-duck.webp"},{"id":"pile-of-tiny-ducks","name":"Pile of Tiny Ducks","file":"pile-of-tiny-ducks.webp"},{"id":"scarf-duck","name":"Scarf Duck","file":"scarf-duck.webp"},{"id":"vampire-duck","name":"Vampire Duck","file":"vampire-duck.webp"},{"id":"alien-duck","name":"Alien Duck","file":"Alien-duck.webp"},{"id":"angel-duck","name":"Angel Duck","file":"Angel-duck.webp"},{"id":"aqua-duck","name":"Aqua Duck","file":"Aqua-duck.webp"},{"id":"artist-duck","name":"Artist Duck","file":"Artist-duck.webp"},{"id":"black-duck","name":"Black Duck","file":"Black-duck.webp"},{"id":"blue-duck","name":"Blue Duck","file":"Blue-duck.webp"},{"id":"bow-duck","name":"Bow Duck","file":"Bow-duck.webp"},{"id":"bronze-duck","name":"Bronze Duck","file":"Bronze-duck.webp"},{"id":"bunny-duck","name":"Bunny Duck","file":"Bunny-duck.webp"},{"id":"burger-duck","name":"Burger Duck","file":"Burger-duck.webp"},{"id":"cat-duck","name":"Cat Duck","file":"Cat-duck.webp"},{"id":"cool-duck","name":"Cool Duck","file":"Cool-duck.webp"},{"id":"cosmic-duck","name":"Cosmic Duck","file":"Cosmic-duck.webp"},{"id":"cupcake-duck","name":"Cupcake Duck","file":"Cupcake-duck.webp"},{"id":"dark-red-duck","name":"Dark Red Duck","file":"Dark-red-duck.webp"},{"id":"demon-duck","name":"Demon Duck","file":"Demon-duck.webp"},{"id":"doctor-duck","name":"Doctor Duck","file":"Doctor-duck.webp"},{"id":"duck-with-a-knife","name":"Duck with a Knife","file":"Duck-with-a-knife.webp"},{"id":"duckvee","name":"Duckvee","file":"Duckvee.webp"},{"id":"fancy-duck","name":"Fancy Duck","file":"Fancy-duck.webp"},{"id":"flower-duck","name":"Flower Duck","file":"Flower-duck.webp"},{"id":"gamer-duck","name":"Gamer Duck","file":"Gamer-duck.webp"},{"id":"ghost-duck","name":"Ghost Duck","file":"Ghost-duck.webp"},{"id":"glitter-duck","name":"Glitter Duck","file":"Glitter-duck.webp"},{"id":"golden-duck","name":"Golden Duck","file":"Golden-duck.webp"},{"id":"goose","name":"Goose","file":"Goose.webp"},{"id":"green-duck","name":"Green Duck","file":"Green-duck.webp"},{"id":"grey-duck","name":"Grey Duck","file":"Grey-duck.webp"},{"id":"gummy-duck","name":"Gummy Duck","file":"Gummy-duck.webp"},{"id":"jester-duck","name":"Jester Duck","file":"Jester-duck.webp"},{"id":"kidcore-duck","name":"Kidcore Duck","file":"Kidcore-duck.webp"},{"id":"king-duck","name":"King Duck","file":"King-duck.webp"},{"id":"knitted-duck","name":"Knitted Duck","file":"Knitted-duck.webp"},{"id":"lemon-duck","name":"Lemon Duck","file":"Lemon-duck.webp"},{"id":"lime-duck","name":"Lime Duck","file":"Lime-duck.webp"},{"id":"magical-girl-duck","name":"Magical Girl Duck","file":"Magical-girl-duck.webp"},{"id":"mint-duck","name":"Mint Duck","file":"Mint-duck.webp"},{"id":"mushroom-duck","name":"Mushroom Duck","file":"Mushroom-duck.webp"},{"id":"miko-duck","name":"Miko Duck","file":"miko-duck.webp"},{"id":"io-duck","name":"Io Duck","file":"io-duck.webp"},{"id":"orange-duck","name":"Orange Duck","file":"Orange-duck.webp"},{"id":"party-hat-duck","name":"Party Hat Duck","file":"Party-hat-duck.webp"},{"id":"peach-duck","name":"Peach Duck","file":"Peach-duck.webp"},{"id":"peep-duck","name":"Peep Duck","file":"peep-duck.webp"},{"id":"periwinkle-duck","name":"Periwinkle Duck","file":"Periwinkle-duck.webp"},{"id":"pink-duck","name":"Pink Duck","file":"Pink-duck.webp"},{"id":"pizza-duck","name":"Pizza Duck","file":"Pizza-duck.webp"},{"id":"plush-duck","name":"Plush Duck","file":"Plush-duck.webp"},{"id":"pompompurin-duck","name":"Pompompurin Duck","file":"Pompompurin-duck.webp"},{"id":"purple-duck","name":"Purple Duck","file":"Purple-duck.webp"},{"id":"rainbow-duck","name":"Rainbow Duck","file":"Rainbow-duck.webp"},{"id":"red-duck","name":"Red Duck","file":"Red-duck.webp"},{"id":"silver-duck","name":"Silver Duck","file":"Silver-duck.webp"},{"id":"sky-blue-duck","name":"Sky Blue Duck","file":"Sky-blue-duck.webp"},{"id":"sleepy-time-duck","name":"Sleepy Time Duck","file":"Sleepy-time-duck.webp"},{"id":"standard-duck","name":"Standard Duck","file":"Standard-duck.webp"},{"id":"strawberry-duck","name":"Strawberry Duck","file":"Strawberry-duck.webp"},{"id":"tiny-duck-stack","name":"Tiny Duck Stack","file":"Tiny-duck-stack.webp"},{"id":"tiny-duck","name":"Tiny Duck","file":"Tiny-duck.webp"},{"id":"top-hat-duck","name":"Top Hat Duck","file":"Top-hat-duck.webp"},{"id":"violet-duck","name":"Violet Duck","file":"Violet-duck.webp"},{"id":"watermelon-duck","name":"Watermelon Duck","file":"Watermelon-duck.webp"},{"id":"white-duck","name":"White Duck","file":"White-duck.webp"}];

const PEEP_SKILLS = [
  {
    id: "heart-pop",
    name: "Heart Pop!",
    unlock: 1,
    type: "damage",
    multiplier: 1.0,
    sprite: "assets/characters/peep/base/attack.webp",
    description: "A dependable little heart attack!"
  },
  {
    id: "magical-wish",
    name: "Magical Wish!",
    unlock: 10,
    type: "heal",
    healPercent: 0.42,
    cooldown: 3,
    sprite: "assets/characters/peep/base/heal.webp",
    description: "Restore 42% of Peep's max HP."
  },
  {
    id: "duck-throw",
    name: "Duck Throw!",
    unlock: 25,
    type: "damage",
    multiplier: 1.65,
    cooldown: 2,
    sprite: "assets/characters/peep/base/duck-throw.webp",
    description: "Throw a random unlocked duck. Obviously."
  },
  {
    id: "heart-barrage",
    name: "Heart Barrage!",
    unlock: 40,
    type: "multi-hit",
    multiplier: 1.45,
    hits: 3,
    cooldown: 2,
    sprite: "assets/characters/peep/base/attack.webp",
    description: "Three rapid heart hits for 1.45× total damage."
  },
  {
    id: "peep-apocalypse",
    name: "Peep Apocalypse!",
    unlock: 50,
    type: "damage",
    multiplier: 3.0,
    oncePerBattle: true,
    sprite: "assets/characters/peep/base/final-move.webp",
    description: "Peep has had enough."
  }
];

const MIKO_SKILLS = [
  {
    id: "mock",
    name: "Mock",
    unlock: 1,
    type: "damage",
    multiplier: 1.0,
    sprite: "assets/characters/miko/base/mock.webp",
    description: "A cutting little comment that actually hurts."
  },
  {
    id: "smug",
    name: "Smug",
    unlock: 10,
    type: "buff",
    attackBoost: 0.30,
    duration: 3,
    sprite: "assets/characters/miko/base/smug.webp",
    description: "Raise Miko's Attack by 30% for 3 turns."
  },
  {
    id: "failed-spell",
    name: "Failed Spell",
    unlock: 25,
    type: "damage",
    multiplier: 1.85,
    cooldown: 2,
    sprite: "assets/characters/miko/base/failed-spell.webp",
    description: "A magical mishap explodes for heavy damage."
  },
  {
    id: "hexed-heckle",
    name: "Hexed Heckle",
    unlock: 40,
    type: "damage",
    multiplier: 1.55,
    cooldown: 2,
    sprite: "assets/characters/miko/base/failed-spell.webp",
    description: "A magically rude heckle for 1.55× damage."
  },
  {
    id: "gun",
    name: "He has a gun!",
    unlock: 50,
    type: "multi-hit",
    multiplier: 1.50,
    hits: 4,
    sprite: "assets/characters/miko/base/gun.webp",
    description: "Four quick shots for 1.50× total damage."
  }
];

const IO_SKILLS = [
  {
    id:"heart-ray", name:"Heart Ray", unlock:1, type:"damage", multiplier:1.0, boostedMultiplier:1.8,
    sprite:"assets/characters/io/base/heart-ray.webp",
    description:"A heart-shaped beam. Every 5th use is boosted!"
  },
  {
    id:"magic-juice", name:"Magic Juice Drink", unlock:10, type:"buff", attackBoost:0.40, duration:4,
    sprite:"assets/characters/io/base/magic-juice.webp",
    description:"Raise Io's Attack by 40% for 4 turns. Does not stack."
  },
  {
    id:"sparkle-shot", name:"Sparkle Shot", unlock:25, type:"multi-hit", multiplier:1.35, hits:3,
    sprite:"assets/characters/io/base/sparkle-shot.webp",
    description:"Three little star hits from one sparkling beam."
  },
  {
    id:"star-shower", name:"Star Shower", unlock:40, type:"multi-hit", multiplier:1.55, hits:4, cooldown:2,
    sprite:"assets/characters/io/base/sparkle-shot.webp",
    description:"Four falling stars for 1.55× total damage."
  },
  {
    id:"rainbow-check", name:"Rainbow Check", unlock:50, type:"full-heal", maxUses:2,
    sprite:"assets/characters/io/base/rainbow-check.webp",
    description:"Fully restore Io's HP. Can be used twice per battle."
  }
];

function activeSkills(){
  if(activeCharacterId === "miko") return MIKO_SKILLS;
  if(activeCharacterId === "io") return IO_SKILLS;
  return PEEP_SKILLS;
}

const ENEMIES = {
  "cat-slime": {
    name: "Cat Slime",
    hp: 20,
    attack: 3,
    exp: 18,
    coinMin: 5,
    coinMax: 9,
    idle: [
      "assets/enemies/cat-slime/base/idle-1-neutral.webp",
      "assets/enemies/cat-slime/base/idle-2-squish.webp",
      "assets/enemies/cat-slime/base/idle-3-bounce.webp",
      "assets/enemies/cat-slime/base/idle-2-squish.webp"
    ],
    hurt: "assets/enemies/cat-slime/base/idle-1-neutral.webp",
    speed: 310
  },
  "bee": {
    name: "Bee",
    hp: 17,
    attack: 4,
    exp: 20,
    coinMin: 5,
    coinMax: 10,
    idle: [
      "assets/enemies/bee/base/idle-1-high.webp",
      "assets/enemies/bee/base/idle-2-low.webp"
    ],
    hurt: "assets/enemies/bee/base/hurt.webp",
    speed: 360
  },
  "flower": {
    name: "Flower",
    hp: 23,
    attack: 4,
    exp: 22,
    coinMin: 6,
    coinMax: 11,
    idle: [
      "assets/enemies/flower/base/idle-1.webp",
      "assets/enemies/flower/base/idle-2.webp"
    ],
    hurt: "assets/enemies/flower/base/hurt.webp",
    speed: 390
  },
  "cool-seagull": {
    name: "Cool Seagull", hp: 26, attack: 5, exp: 28, coinMin: 8, coinMax: 13,
    idle: ["assets/enemies/cool-seagull/base/idle-1.webp","assets/enemies/cool-seagull/base/idle-2.webp"],
    hurt: "assets/enemies/cool-seagull/base/hurt.webp", speed: 370
  },
  "sea-turtle": {
    name: "Sea Turtle", hp: 34, attack: 5, exp: 31, coinMin: 9, coinMax: 14,
    idle: ["assets/enemies/sea-turtle/base/idle-1.webp","assets/enemies/sea-turtle/base/idle-2.webp"],
    hurt: "assets/enemies/sea-turtle/base/hurt.webp", speed: 430
  },
  "catfish": {
    name: "Cat-Fish", hp: 29, attack: 7, exp: 34, coinMin: 10, coinMax: 16,
    idle: ["assets/enemies/catfish/base/idle-1.webp","assets/enemies/catfish/base/idle-2.webp"],
    hurt: "assets/enemies/catfish/base/hurt.webp", speed: 360
  },
  "vampire-squid": {
    name: "Vampire Squid", hp: 66, attack: 8, exp: 70, coinMin: 24, coinMax: 36,
    idle: ["assets/bosses/vampire-squid/base/idle-1.webp","assets/bosses/vampire-squid/base/idle-2.webp"],
    hurt: "assets/bosses/vampire-squid/base/hurt.webp", speed: 410, boss: true
  },
  "mimic": {
    name: "Mimic",
    hp: 31,
    attack: 6,
    exp: 34,
    coinMin: 18,
    coinMax: 28,
    idle: [
      "assets/enemies/mimic/base/open-1.webp",
      "assets/enemies/mimic/base/open-2.webp"
    ],
    hurt: "assets/items/chests/treasure/closed.webp",
    speed: 700
  },
  "mushroom-cat": {
    name: "Big Mushroom Cat",
    hp: 48,
    attack: 5,
    exp: 48,
    coinMin: 16,
    coinMax: 24,
    idle: [
      "assets/bosses/mushroom-cat/base/idle-1.webp",
      "assets/bosses/mushroom-cat/base/idle-2.webp"
    ],
    hurt: "assets/bosses/mushroom-cat/base/hurt.webp",
    speed: 430,
    boss: true
  },
  "acorn-mouse": {
    name: "Acorn Mouse", hp: 19, attack: 4, exp: 21, coinMin: 5, coinMax: 10,
    idle:["assets/enemies/acorn-mouse/base/acorn-mouse-idle-1.png","assets/enemies/acorn-mouse/base/acorn-mouse-idle-2.png"],
    hurt:"assets/enemies/acorn-mouse/base/acorn-mouse-hurt.png", speed:335
  },
  "seaunicorn": {
    name: "Seaunicorn", hp: 30, attack: 6, exp: 33, coinMin: 9, coinMax: 15,
    idle:["assets/enemies/seaunicorn/base/seaunicorn-idle-1.png","assets/enemies/seaunicorn/base/seaunicorn-idle-2.png"],
    hurt:"assets/enemies/seaunicorn/base/seaunicorn-hurt.png", speed:385
  },
  "tree-squirrel": {
    name: "Tree Squirrel", hp: 56, attack: 6, exp: 58, coinMin: 19, coinMax: 29,
    idle:["assets/bosses/tree-squirrel/base/tree-squirrel-idle-1.png","assets/bosses/tree-squirrel/base/tree-squirrel-idle-2.png"],
    hurt:"assets/bosses/tree-squirrel/base/tree-squirrel-hurt.png", speed:430, boss:true
  },
  "jellybun": {
    name: "Jellybun", hp: 72, attack: 8, exp: 76, coinMin: 26, coinMax: 40,
    idle:["assets/bosses/jellybun/base/jellybun-idle-1.png","assets/bosses/jellybun/base/jellybun-idle-2.png"],
    hurt:"assets/bosses/jellybun/base/jellybun-hurt.png", speed:405, boss:true
  }
};






function weightedOceanVariant(rank, ids) {
  const r=Math.max(1,Number(rank)||1);
  let weights;
  if(r<=8) weights=[100,0,0,0,0];
  else if(r<=15) weights=[60,40,0,0,0];
  else if(r<=24) weights=[20,50,30,0,0];
  else if(r<=35) weights=[0,25,35,40,0];
  else if(r<=44) weights=[0,0,25,50,25];
  else weights=[0,0,0,40,60];
  const total=weights.reduce((a,b)=>a+b,0);
  let roll=Math.random()*total;
  for(let i=0;i<ids.length;i++){ roll-=weights[i]; if(roll<=0) return ids[i]; }
  return ids[0];
}

const SEAGULL_VARIANTS=Object.freeze({
  grey:{id:"grey",name:"Cool Seagull",hp:1,atk:1,exp:1,coin:1,idle:["assets/enemies/cool-seagull/base/idle-1.webp","assets/enemies/cool-seagull/base/idle-2.webp"],hurt:"assets/enemies/cool-seagull/base/hurt.webp"},
  pink:{id:"pink",name:"Pink Cool Seagull",hp:1.2,atk:1.1,exp:1.15,coin:1.15,idle:["assets/enemies/cool-seagull/base/Pink-idle-1.webp","assets/enemies/cool-seagull/base/Pink-idle-2.webp"],hurt:"assets/enemies/cool-seagull/base/Pink-hurt.webp"},
  blue:{id:"blue",name:"Blue Cool Seagull",hp:1.2,atk:1.1,exp:1.2,coin:1.2,healPercent:.18,maxHeals:2,healChance:.32,healMoveName:"Fish Snack!",idle:["assets/enemies/cool-seagull/base/Blue-idle-1.webp","assets/enemies/cool-seagull/base/Blue-idle-2.webp"],hurt:"assets/enemies/cool-seagull/base/Blue-hurt.webp"},
  yellow:{id:"yellow",name:"Yellow Cool Seagull",hp:1.4,atk:1.2,exp:1.35,coin:1.35,idle:["assets/enemies/cool-seagull/base/Yellow-idle-1.webp","assets/enemies/cool-seagull/base/Yellow-idle-2.webp"],hurt:"assets/enemies/cool-seagull/base/Yellow-hurt.webp"},
  black:{id:"black",name:"Black Cool Seagull",hp:1.7,atk:1.3,exp:1.5,coin:1.6,elite:true,idle:["assets/enemies/cool-seagull/base/Black-idle-1.webp","assets/enemies/cool-seagull/base/Black-idle-2.webp"],hurt:"assets/enemies/cool-seagull/base/Black-hurt.webp"}
});
const TURTLE_VARIANTS=Object.freeze({
  green:{id:"green",name:"Sea Turtle",hp:1,atk:1,exp:1,coin:1,idle:["assets/enemies/sea-turtle/base/idle-1.webp","assets/enemies/sea-turtle/base/idle-2.webp"],hurt:"assets/enemies/sea-turtle/base/hurt.webp"},
  blue:{id:"blue",name:"Blue Sea Turtle",hp:1.2,atk:1.1,exp:1.15,coin:1.15,idle:["assets/enemies/sea-turtle/base/Blue-idle-1.webp","assets/enemies/sea-turtle/base/Blue-idle-2.webp"],hurt:"assets/enemies/sea-turtle/base/Blue-hurt.webp"},
  pink:{id:"pink",name:"Pink Sea Turtle",hp:1.2,atk:1.1,exp:1.2,coin:1.2,specialType:"harden-shell",specialChance:.30,maxSpecialUses:2,idle:["assets/enemies/sea-turtle/base/Pink-idle-1.webp","assets/enemies/sea-turtle/base/Pink-idle-2.webp"],hurt:"assets/enemies/sea-turtle/base/Pink-hurt.webp"},
  purple:{id:"purple",name:"Purple Sea Turtle",hp:1.4,atk:1.2,exp:1.35,coin:1.35,idle:["assets/enemies/sea-turtle/base/Purple-idle-1.webp","assets/enemies/sea-turtle/base/Purple-idle-2.webp"],hurt:"assets/enemies/sea-turtle/base/Purple-hurt.webp"},
  gold:{id:"gold",name:"Gold Sea Turtle",hp:1.7,atk:1.3,exp:1.5,coin:1.6,elite:true,idle:["assets/enemies/sea-turtle/base/Gold-idle-1.webp","assets/enemies/sea-turtle/base/Gold-idle-2.webp"],hurt:"assets/enemies/sea-turtle/base/Gold-hurt.webp"}
});
const CATFISH_VARIANTS=Object.freeze({
  grey:{id:"grey",name:"Cat-Fish",hp:1,atk:1,exp:1,coin:1,idle:["assets/enemies/catfish/base/idle-1.webp","assets/enemies/catfish/base/idle-2.webp"],hurt:"assets/enemies/catfish/base/hurt.webp"},
  brown:{id:"brown",name:"Brown Cat-Fish",hp:1.2,atk:1.1,exp:1.15,coin:1.15,idle:["assets/enemies/catfish/base/Brown-idle-1.webp","assets/enemies/catfish/base/Brown-idle-2.webp"],hurt:"assets/enemies/catfish/base/Brown-hurt.webp"},
  orange:{id:"orange",name:"Orange Cat-Fish",hp:1.2,atk:1.1,exp:1.2,coin:1.2,specialType:"zoomies",specialChance:.30,maxSpecialUses:2,idle:["assets/enemies/catfish/base/Orange-idle-1.webp","assets/enemies/catfish/base/Orange-idle-2.webp"],hurt:"assets/enemies/catfish/base/Orange-hurt.webp"},
  navy:{id:"navy",name:"Navy Cat-Fish",hp:1.4,atk:1.2,exp:1.35,coin:1.35,idle:["assets/enemies/catfish/base/Navy-idle-1.webp","assets/enemies/catfish/base/Navy-idle-2.webp"],hurt:"assets/enemies/catfish/base/Navy-hurt.webp"},
  black:{id:"black",name:"Black Cat-Fish",hp:1.7,atk:1.3,exp:1.5,coin:1.6,elite:true,idle:["assets/enemies/catfish/base/Black-idle-1.webp","assets/enemies/catfish/base/Black-idle-2.webp"],hurt:"assets/enemies/catfish/base/Black-hurt.webp"}
});
const SQUID_VARIANTS=Object.freeze({
  green:{id:"green",name:"Vampire Squid",hp:1,atk:1,exp:1,coin:1,idle:["assets/bosses/vampire-squid/base/idle-1.webp","assets/bosses/vampire-squid/base/idle-2.webp"],hurt:"assets/bosses/vampire-squid/base/hurt.webp"},
  purple:{id:"purple",name:"Purple Vampire Squid",hp:1.2,atk:1.1,exp:1.15,coin:1.15,idle:["assets/bosses/vampire-squid/base/Purple-idle-1.webp","assets/bosses/vampire-squid/base/Purple-idle-2.webp"],hurt:"assets/bosses/vampire-squid/base/Purple-hurt.webp"},
  coral:{id:"coral",name:"Coral Vampire Squid",hp:1.3,atk:1.15,exp:1.25,coin:1.25,idle:["assets/bosses/vampire-squid/base/Coral-idle-1.webp","assets/bosses/vampire-squid/base/Coral-idle-2.webp"],hurt:"assets/bosses/vampire-squid/base/Coral-hurt.webp"},
  blue:{id:"blue",name:"Blue Vampire Squid",hp:1.4,atk:1.2,exp:1.4,coin:1.4,idle:["assets/bosses/vampire-squid/base/Blue-idle-1.webp","assets/bosses/vampire-squid/base/Blue-idle-2.webp"],hurt:"assets/bosses/vampire-squid/base/Blue-hurt.webp"},
  pink:{id:"pink",name:"Pink Vampire Squid",hp:1.7,atk:1.3,exp:1.75,coin:1.8,elite:true,idle:["assets/bosses/vampire-squid/base/Pink-idle-1.webp","assets/bosses/vampire-squid/base/Pink-idle-2.webp"],hurt:"assets/bosses/vampire-squid/base/Pink-hurt.webp"}
});

function applyOceanVariant(template, table, ids, rank, extra={}){
  const id=weightedOceanVariant(rank,ids);
  const v=table[id]||table[ids[0]];
  return {
    ...template,
    ...extra,
    name:v.name,idle:v.idle,hurt:v.hurt,
    hp:Math.max(1,Math.round(template.hp*v.hp)),
    attack:Math.max(1,Math.round(template.attack*v.atk)),
    exp:Math.max(1,Math.round(template.exp*v.exp)),
    coinMin:Math.max(1,Math.round(template.coinMin*v.coin)),
    coinMax:Math.max(1,Math.round(template.coinMax*v.coin)),
    oceanVariant:v.id,eliteVariant:Boolean(v.elite),
    healPercent:Number(v.healPercent)||0,maxHeals:Number(v.maxHeals)||0,healChance:Number(v.healChance)||0,healMoveName:v.healMoveName||"",
    specialType:v.specialType||"",specialChance:Number(v.specialChance)||0,maxSpecialUses:Number(v.maxSpecialUses)||0
  };
}
function applySeagullVariant(t,r){return applyOceanVariant(t,SEAGULL_VARIANTS,["grey","pink","blue","yellow","black"],r);}
function applyTurtleVariant(t,r){return applyOceanVariant(t,TURTLE_VARIANTS,["green","blue","pink","purple","gold"],r);}
function applyCatfishVariant(t,r){return applyOceanVariant(t,CATFISH_VARIANTS,["grey","brown","orange","navy","black"],r);}
function applySquidVariant(t,r){
  return applyOceanVariant(t,SQUID_VARIANTS,["green","purple","coral","blue","pink"],r,{
    lifeDrain:true,lifeDrainChance:.30,maxLifeDrains:2,lifeDrainDamage:.75,lifeDrainHeal:.65
  });
}

const MIMIC_PROFILES = Object.freeze({
  easy: {
    id: "easy",
    hpMultiplier: 0.75,
    attackMultiplier: 0.80,
    expMultiplier: 0.90,
    coinMultiplier: 1.00
  },
  normal: {
    id: "normal",
    hpMultiplier: 1.00,
    attackMultiplier: 1.00,
    expMultiplier: 1.00,
    coinMultiplier: 1.00
  },
  tough: {
    id: "tough",
    hpMultiplier: 1.25,
    attackMultiplier: 1.15,
    expMultiplier: 1.25,
    coinMultiplier: 1.30
  },
  brutal: {
    id: "brutal",
    hpMultiplier: 1.50,
    attackMultiplier: 1.30,
    expMultiplier: 1.50,
    coinMultiplier: 1.60
  },
  jackpot: {
    id: "jackpot",
    hpMultiplier: 1.85,
    attackMultiplier: 1.45,
    expMultiplier: 2.00,
    coinMultiplier: 2.20
  }
});

function chooseMimicProfile(rank) {
  const r = Math.max(1, Number(rank) || 1);

  // Mimics are intentionally unpredictable. Higher ranks only lean a little
  // harder toward dangerous versions; an easy one can still appear late.
  let pool;
  if (r <= 4) {
    pool = [["easy", 30], ["normal", 45], ["tough", 20], ["brutal", 4], ["jackpot", 1]];
  } else if (r <= 9) {
    pool = [["easy", 20], ["normal", 35], ["tough", 30], ["brutal", 12], ["jackpot", 3]];
  } else {
    pool = [["easy", 12], ["normal", 28], ["tough", 32], ["brutal", 22], ["jackpot", 6]];
  }

  const total = pool.reduce((sum, entry) => sum + entry[1], 0);
  let roll = Math.random() * total;

  for (const [id, weight] of pool) {
    roll -= weight;
    if (roll <= 0) return id;
  }
  return "normal";
}

function applyMimicProfile(template, rank) {
  const profile = MIMIC_PROFILES[chooseMimicProfile(rank)] || MIMIC_PROFILES.normal;

  return {
    ...template,
    hp: Math.max(1, Math.round(template.hp * profile.hpMultiplier)),
    attack: Math.max(1, Math.round(template.attack * profile.attackMultiplier)),
    exp: Math.max(1, Math.round(template.exp * profile.expMultiplier)),
    coinMin: Math.max(1, Math.round(template.coinMin * profile.coinMultiplier)),
    coinMax: Math.max(1, Math.round(template.coinMax * profile.coinMultiplier)),
    mimicProfile: profile.id
  };
}


const FLOWER_VARIANTS = Object.freeze({
  white: {
    id: "white",
    name: "White Flower",
    hpMultiplier: 1.00,
    attackMultiplier: 1.00,
    expMultiplier: 1.00,
    coinMultiplier: 1.00,
    idle: [
      "assets/enemies/flower/base/idle-1.webp",
      "assets/enemies/flower/base/idle-2.webp"
    ],
    hurt: "assets/enemies/flower/base/hurt.webp"
  },

  pink: {
    id: "pink",
    name: "Pink Flower",
    hpMultiplier: 1.20,
    attackMultiplier: 1.10,
    expMultiplier: 1.15,
    coinMultiplier: 1.15,
    idle: [
      "assets/enemies/flower/base/Pink-idle-1.webp",
      "assets/enemies/flower/base/Pink-idle-2.webp"
    ],
    hurt: "assets/enemies/flower/base/Pink-hurt.webp"
  },

  orange: {
    id: "orange",
    name: "Orange Flower",
    hpMultiplier: 1.20,
    attackMultiplier: 1.10,
    expMultiplier: 1.20,
    coinMultiplier: 1.20,
    healPercent: 0.18,
    maxHeals: 2,
    healChance: 0.32,
    healMoveName: "Sunny Day!",
    idle: [
      "assets/enemies/flower/base/Orange-idle-1.webp",
      "assets/enemies/flower/base/Orange-idle-2.webp"
    ],
    hurt: "assets/enemies/flower/base/Orange-hurt.webp"
  },

  blue: {
    id: "blue",
    name: "Blue Flower",
    hpMultiplier: 1.40,
    attackMultiplier: 1.20,
    expMultiplier: 1.35,
    coinMultiplier: 1.35,
    idle: [
      "assets/enemies/flower/base/Blue-idle-1.webp",
      "assets/enemies/flower/base/Blue-idle-2.webp"
    ],
    hurt: "assets/enemies/flower/base/Blue-hurt.webp"
  },

  rainbow: {
    id: "rainbow",
    name: "Rainbow Flower",
    hpMultiplier: 1.70,
    attackMultiplier: 1.30,
    expMultiplier: 1.50,
    coinMultiplier: 1.60,
    idle: [
      "assets/enemies/flower/base/Rainbow-idle-1.webp",
      "assets/enemies/flower/base/Rainbow-idle-2.webp"
    ],
    hurt: "assets/enemies/flower/base/Rainbow-hurt.webp"
  }
});

function weightedFlowerVariant(rank) {
  const r = Math.max(1, Number(rank) || 1);
  let pool;

  if (r <= 2) {
    pool = [["white", 100]];
  } else if (r <= 4) {
    pool = [["white", 60], ["pink", 40]];
  } else if (r <= 6) {
    pool = [["white", 20], ["pink", 50], ["orange", 30]];
  } else if (r <= 9) {
    pool = [["pink", 25], ["orange", 35], ["blue", 40]];
  } else if (r <= 13) {
    pool = [["orange", 25], ["blue", 50], ["rainbow", 25]];
  } else {
    pool = [["blue", 40], ["rainbow", 60]];
  }

  const total = pool.reduce((sum, entry) => sum + entry[1], 0);
  let roll = Math.random() * total;

  for (const [id, weight] of pool) {
    roll -= weight;
    if (roll <= 0) return id;
  }
  return pool[0][0];
}

function applyFlowerVariant(template, rank) {
  const variant = FLOWER_VARIANTS[weightedFlowerVariant(rank)] || FLOWER_VARIANTS.white;

  return {
    ...template,
    name: variant.name,
    idle: variant.idle,
    hurt: variant.hurt,
    hp: Math.max(1, Math.round(template.hp * variant.hpMultiplier)),
    attack: Math.max(1, Math.round(template.attack * variant.attackMultiplier)),
    exp: Math.max(1, Math.round(template.exp * variant.expMultiplier)),
    coinMin: Math.max(1, Math.round(template.coinMin * variant.coinMultiplier)),
    coinMax: Math.max(1, Math.round(template.coinMax * variant.coinMultiplier)),
    flowerVariant: variant.id,
    healPercent: Number(variant.healPercent) || 0,
    maxHeals: Math.max(0, Number(variant.maxHeals) || 0),
    healChance: Math.max(0, Math.min(1, Number(variant.healChance) || 0)),
    healMoveName: variant.healMoveName || ""
  };
}

const CAT_SLIME_VARIANTS = Object.freeze({
  pink: {
    id: "pink",
    name: "Pink Cat Slime",
    hpMultiplier: 1.00,
    attackMultiplier: 1.00,
    expMultiplier: 1.00,
    coinMultiplier: 1.00,
    idle: [
      "assets/enemies/cat-slime/base/idle-1-neutral.webp",
      "assets/enemies/cat-slime/base/idle-2-squish.webp",
      "assets/enemies/cat-slime/base/idle-3-bounce.webp",
      "assets/enemies/cat-slime/base/idle-2-squish.webp"
    ],
    hurt: "assets/enemies/cat-slime/base/idle-1-neutral.webp"
  },

  purple: {
    id: "purple",
    name: "Purple Cat Slime",
    hpMultiplier: 1.20,
    attackMultiplier: 1.10,
    expMultiplier: 1.15,
    coinMultiplier: 1.15,
    idle: [
      "assets/enemies/cat-slime/base/Purple-idle-1-neutral.webp",
      "assets/enemies/cat-slime/base/Purple-idle-2-squish.webp",
      "assets/enemies/cat-slime/base/Purple-idle-3-bounce.webp",
      "assets/enemies/cat-slime/base/Purple-idle-2-squish.webp"
    ],
    hurt: "assets/enemies/cat-slime/base/Purple-idle-1-neutral.webp"
  },

  green: {
    id: "green",
    name: "Green Cat Slime",
    hpMultiplier: 1.20,
    attackMultiplier: 1.10,
    expMultiplier: 1.20,
    coinMultiplier: 1.20,
    healPercent: 0.18,
    maxHeals: 2,
    healChance: 0.32,
    healMoveName: "Super Squish!",
    idle: [
      "assets/enemies/cat-slime/base/Green-idle-1-neutral.webp",
      "assets/enemies/cat-slime/base/Green-idle-2-squish.webp",
      "assets/enemies/cat-slime/base/Green-idle-3-bounce.webp",
      "assets/enemies/cat-slime/base/Green-idle-2-squish.webp"
    ],
    hurt: "assets/enemies/cat-slime/base/Green-idle-1-neutral.webp"
  },

  teal: {
    id: "teal",
    name: "Teal Cat Slime",
    hpMultiplier: 1.40,
    attackMultiplier: 1.20,
    expMultiplier: 1.35,
    coinMultiplier: 1.35,
    idle: [
      "assets/enemies/cat-slime/base/Teal-idle-1-neutral.webp",
      "assets/enemies/cat-slime/base/Teal-idle-2-squish.webp",
      "assets/enemies/cat-slime/base/Teal-idle-3-bounce.webp",
      "assets/enemies/cat-slime/base/Teal-idle-2-squish.webp"
    ],
    hurt: "assets/enemies/cat-slime/base/Teal-idle-1-neutral.webp"
  },

  strawberry: {
    id: "strawberry",
    name: "Strawberry Cat Slime",
    hpMultiplier: 1.70,
    attackMultiplier: 1.30,
    expMultiplier: 1.50,
    coinMultiplier: 1.60,
    idle: [
      "assets/enemies/cat-slime/base/Strawberry-idle-1-neutral.webp",
      "assets/enemies/cat-slime/base/Strawberry-idle-2-squish.webp",
      "assets/enemies/cat-slime/base/Strawberry-idle-3-bounce.webp",
      "assets/enemies/cat-slime/base/Strawberry-idle-2-squish.webp"
    ],
    hurt: "assets/enemies/cat-slime/base/Strawberry-idle-1-neutral.webp"
  }
});

function weightedCatSlimeVariant(rank) {
  const r = Math.max(1, Number(rank) || 1);
  let pool;

  if (r <= 2) {
    pool = [["pink", 100]];
  } else if (r <= 4) {
    pool = [["pink", 60], ["purple", 40]];
  } else if (r <= 6) {
    pool = [["pink", 20], ["purple", 50], ["green", 30]];
  } else if (r <= 9) {
    pool = [["purple", 25], ["green", 35], ["teal", 40]];
  } else if (r <= 13) {
    pool = [["green", 25], ["teal", 50], ["strawberry", 25]];
  } else {
    pool = [["teal", 40], ["strawberry", 60]];
  }

  const total = pool.reduce((sum, entry) => sum + entry[1], 0);
  let roll = Math.random() * total;

  for (const [id, weight] of pool) {
    roll -= weight;
    if (roll <= 0) return id;
  }
  return pool[0][0];
}

function applyCatSlimeVariant(template, rank) {
  const variant = CAT_SLIME_VARIANTS[weightedCatSlimeVariant(rank)] || CAT_SLIME_VARIANTS.pink;

  return {
    ...template,
    name: variant.name,
    idle: variant.idle,
    hurt: variant.hurt,
    hp: Math.max(1, Math.round(template.hp * variant.hpMultiplier)),
    attack: Math.max(1, Math.round(template.attack * variant.attackMultiplier)),
    exp: Math.max(1, Math.round(template.exp * variant.expMultiplier)),
    coinMin: Math.max(1, Math.round(template.coinMin * variant.coinMultiplier)),
    coinMax: Math.max(1, Math.round(template.coinMax * variant.coinMultiplier)),
    catSlimeVariant: variant.id,
    healPercent: Number(variant.healPercent) || 0,
    maxHeals: Math.max(0, Number(variant.maxHeals) || 0),
    healChance: Math.max(0, Math.min(1, Number(variant.healChance) || 0)),
    healMoveName: variant.healMoveName || ""
  };
}

const BEE_VARIANTS = Object.freeze({
  yellow: {
    id: "yellow",
    name: "Yellow Bee",
    hpMultiplier: 1.00,
    attackMultiplier: 1.00,
    expMultiplier: 1.00,
    coinMultiplier: 1.00,
    idle: [
      "assets/enemies/bee/base/idle-1-high.webp",
      "assets/enemies/bee/base/idle-2-low.webp"
    ],
    hurt: "assets/enemies/bee/base/hurt.webp"
  },

  purple: {
    id: "purple",
    name: "Purple Bee",
    hpMultiplier: 1.20,
    attackMultiplier: 1.10,
    expMultiplier: 1.15,
    coinMultiplier: 1.15,
    idle: [
      "assets/enemies/bee/base/Purple-idle-1-high.webp",
      "assets/enemies/bee/base/Purple-idle-2-low.webp"
    ],
    hurt: "assets/enemies/bee/base/Purple-hurt.webp"
  },

  blue: {
    id: "blue",
    name: "Blue Bee",
    hpMultiplier: 1.20,
    attackMultiplier: 1.10,
    expMultiplier: 1.20,
    coinMultiplier: 1.20,
    healPercent: 0.18,
    maxHeals: 2,
    healChance: 0.32,
    healMoveName: "Honey Snack!",
    idle: [
      "assets/enemies/bee/base/Blue-idle-1-high.webp",
      "assets/enemies/bee/base/Blue-idle-2-low.webp"
    ],
    hurt: "assets/enemies/bee/base/Blue-hurt.webp"
  },

  pink: {
    id: "pink",
    name: "Pink Bee",
    hpMultiplier: 1.40,
    attackMultiplier: 1.20,
    expMultiplier: 1.35,
    coinMultiplier: 1.35,
    idle: [
      "assets/enemies/bee/base/Pink-idle-1-high.webp",
      "assets/enemies/bee/base/Pink-idle-2-low.webp"
    ],
    hurt: "assets/enemies/bee/base/Pink-hurt.webp"
  },

  queen: {
    id: "queen",
    name: "Queen Bee",
    hpMultiplier: 1.70,
    attackMultiplier: 1.30,
    expMultiplier: 1.50,
    coinMultiplier: 1.60,
    idle: [
      "assets/enemies/bee/base/Queen-idle-1-high.webp",
      "assets/enemies/bee/base/Queen-idle-2-low.webp"
    ],
    hurt: "assets/enemies/bee/base/Queen-hurt.webp"
  }
});

function weightedBeeVariant(rank) {
  const r = Math.max(1, Number(rank) || 1);
  let pool;

  if (r <= 2) {
    pool = [["yellow", 100]];
  } else if (r <= 4) {
    pool = [["yellow", 60], ["purple", 40]];
  } else if (r <= 6) {
    pool = [["yellow", 20], ["purple", 50], ["blue", 30]];
  } else if (r <= 9) {
    pool = [["purple", 25], ["blue", 35], ["pink", 40]];
  } else if (r <= 13) {
    pool = [["blue", 25], ["pink", 50], ["queen", 25]];
  } else {
    pool = [["pink", 40], ["queen", 60]];
  }

  const total = pool.reduce((sum, entry) => sum + entry[1], 0);
  let roll = Math.random() * total;

  for (const [id, weight] of pool) {
    roll -= weight;
    if (roll <= 0) return id;
  }
  return pool[0][0];
}

function applyBeeVariant(template, rank) {
  const variant = BEE_VARIANTS[weightedBeeVariant(rank)] || BEE_VARIANTS.yellow;

  return {
    ...template,
    name: variant.name,
    idle: variant.idle,
    hurt: variant.hurt,
    hp: Math.max(1, Math.round(template.hp * variant.hpMultiplier)),
    attack: Math.max(1, Math.round(template.attack * variant.attackMultiplier)),
    exp: Math.max(1, Math.round(template.exp * variant.expMultiplier)),
    coinMin: Math.max(1, Math.round(template.coinMin * variant.coinMultiplier)),
    coinMax: Math.max(1, Math.round(template.coinMax * variant.coinMultiplier)),
    beeVariant: variant.id,
    healPercent: Number(variant.healPercent) || 0,
    maxHeals: Math.max(0, Number(variant.maxHeals) || 0),
    healChance: Math.max(0, Math.min(1, Number(variant.healChance) || 0)),
    healMoveName: variant.healMoveName || ""
  };
}

const MUSHROOM_CAT_VARIANTS = Object.freeze({
  red:{id:"red",name:"Red Mushroom Cat",hpMultiplier:1,attackMultiplier:1,expMultiplier:1,coinMultiplier:1,idle:["assets/bosses/mushroom-cat/base/idle-1.webp","assets/bosses/mushroom-cat/base/idle-2.webp"],hurt:"assets/bosses/mushroom-cat/base/hurt.webp"},
  purple:{id:"purple",name:"Purple Mushroom Cat",hpMultiplier:1.20,attackMultiplier:1.10,expMultiplier:1.15,coinMultiplier:1.15,idle:["assets/bosses/mushroom-cat/base/Purple-idle-1.webp","assets/bosses/mushroom-cat/base/Purple-idle-2.webp"],hurt:"assets/bosses/mushroom-cat/base/Purple-hurt.webp"},
  green:{id:"green",name:"Green Mushroom Cat",hpMultiplier:1.20,attackMultiplier:1.10,expMultiplier:1.20,coinMultiplier:1.20,healPercent:.18,maxHeals:2,healChance:.32,healMoveName:"Forest Snack!",idle:["assets/bosses/mushroom-cat/base/Green-idle-1.webp","assets/bosses/mushroom-cat/base/Green-idle-2.webp"],hurt:"assets/bosses/mushroom-cat/base/Green-hurt.webp"},
  grey:{id:"grey",name:"Grey Mushroom Cat",hpMultiplier:1.40,attackMultiplier:1.20,expMultiplier:1.35,coinMultiplier:1.35,idle:["assets/bosses/mushroom-cat/base/Grey-idle-1.webp","assets/bosses/mushroom-cat/base/Grey-idle-2.webp"],hurt:"assets/bosses/mushroom-cat/base/Grey-hurt.webp"},
  gold:{id:"gold",name:"Gold Mushroom Cat",hpMultiplier:1.70,attackMultiplier:1.30,expMultiplier:1.75,coinMultiplier:1.80,idle:["assets/bosses/mushroom-cat/base/Gold-idle-1.webp","assets/bosses/mushroom-cat/base/Gold-idle-2.webp"],hurt:"assets/bosses/mushroom-cat/base/Gold-hurt.webp"}
});
function weightedBossVariant(rank){
  const r=Math.max(1,Number(rank)||1); let pool;
  if(r<=2) pool=[["red",100]];
  else if(r<=4) pool=[["red",60],["purple",40]];
  else if(r<=6) pool=[["red",20],["purple",50],["green",30]];
  else if(r<=9) pool=[["purple",25],["green",35],["grey",40]];
  else if(r<=13) pool=[["green",25],["grey",50],["gold",25]];
  else pool=[["grey",40],["gold",60]];
  let roll=Math.random()*pool.reduce((s,x)=>s+x[1],0);
  for(const [id,w] of pool){roll-=w;if(roll<=0)return id;} return pool[0][0];
}
function applyMushroomVariant(template,rank){
  const v=MUSHROOM_CAT_VARIANTS[weightedBossVariant(rank)]||MUSHROOM_CAT_VARIANTS.red;
  return {...template,name:v.name,idle:v.idle,hurt:v.hurt,hp:Math.round(template.hp*v.hpMultiplier),attack:Math.round(template.attack*v.attackMultiplier),exp:Math.round(template.exp*v.expMultiplier),coinMin:Math.round(template.coinMin*v.coinMultiplier),coinMax:Math.round(template.coinMax*v.coinMultiplier),mushroomVariant:v.id,healPercent:Number(v.healPercent)||0,maxHeals:Number(v.maxHeals)||0,healChance:Number(v.healChance)||0,healMoveName:v.healMoveName||""};
}

function weightedMeadowFamilyVariant(rank, ids){
  const r=Math.max(1,Number(rank)||1); let weights;
  if(r<=2) weights=[100,0,0,0,0];
  else if(r<=4) weights=[60,40,0,0,0];
  else if(r<=6) weights=[20,50,30,0,0];
  else if(r<=9) weights=[0,25,35,40,0];
  else if(r<=13) weights=[0,0,25,50,25];
  else weights=[0,0,0,40,60];
  let roll=Math.random()*weights.reduce((a,b)=>a+b,0);
  for(let i=0;i<ids.length;i++){roll-=weights[i];if(roll<=0)return ids[i];}
  return ids[0];
}

function applyFamilyVariant(template, table, ids, rank, variantProperty, ocean=false){
  const id=ocean ? weightedOceanVariant(rank,ids) : weightedMeadowFamilyVariant(rank,ids);
  const v=table[id]||table[ids[0]];
  return {
    ...template,
    name:v.name,idle:v.idle,hurt:v.hurt,
    hp:Math.max(1,Math.round(template.hp*(v.hp||1))),
    attack:Math.max(1,Math.round(template.attack*(v.atk||1))),
    exp:Math.max(1,Math.round(template.exp*(v.exp||1))),
    coinMin:Math.max(1,Math.round(template.coinMin*(v.coin||1))),
    coinMax:Math.max(1,Math.round(template.coinMax*(v.coin||1))),
    [variantProperty]:v.id,
    eliteVariant:Boolean(v.elite)
  };
}

const ACORN_MOUSE_VARIANTS=Object.freeze({
  base:{id:"base",name:"Acorn Mouse",hp:1,atk:1,exp:1,coin:1,idle:["assets/enemies/acorn-mouse/base/acorn-mouse-idle-1.png","assets/enemies/acorn-mouse/base/acorn-mouse-idle-2.png"],hurt:"assets/enemies/acorn-mouse/base/acorn-mouse-hurt.png"},
  blue:{id:"blue",name:"Blue Acorn Mouse",hp:1.15,atk:1.08,exp:1.15,coin:1.15,idle:["assets/enemies/acorn-mouse/base/blue-idle-1.png","assets/enemies/acorn-mouse/base/blue-idle-2.png"],hurt:"assets/enemies/acorn-mouse/base/blue-hurt.png"},
  green:{id:"green",name:"Green Acorn Mouse",hp:1.25,atk:1.10,exp:1.22,coin:1.22,idle:["assets/enemies/acorn-mouse/base/green-idle-1.png","assets/enemies/acorn-mouse/base/green-idle-2.png"],hurt:"assets/enemies/acorn-mouse/base/green-hurt.png"},
  purple:{id:"purple",name:"Purple Acorn Mouse",hp:1.4,atk:1.2,exp:1.35,coin:1.35,idle:["assets/enemies/acorn-mouse/base/purple-idle-1.png","assets/enemies/acorn-mouse/base/purple-idle-2.png"],hurt:"assets/enemies/acorn-mouse/base/purple-hurt.png"},
  pink:{id:"pink",name:"Pink Acorn Mouse",hp:1.65,atk:1.28,exp:1.5,coin:1.58,elite:true,idle:["assets/enemies/acorn-mouse/base/pink-idle-1.png","assets/enemies/acorn-mouse/base/pink-idle-2.png"],hurt:"assets/enemies/acorn-mouse/base/pink-hurt.png"}
});
function applyAcornMouseVariant(t,r){return applyFamilyVariant(t,ACORN_MOUSE_VARIANTS,["base","blue","green","purple","pink"],r,"acornMouseVariant",false);}

const SEAUNICORN_VARIANTS=Object.freeze({
  base:{id:"base",name:"Seaunicorn",hp:1,atk:1,exp:1,coin:1,idle:["assets/enemies/seaunicorn/base/seaunicorn-idle-1.png","assets/enemies/seaunicorn/base/seaunicorn-idle-2.png"],hurt:"assets/enemies/seaunicorn/base/seaunicorn-hurt.png"},
  orange:{id:"orange",name:"Orange Seaunicorn",hp:1.18,atk:1.08,exp:1.15,coin:1.15,idle:["assets/enemies/seaunicorn/base/orange-idle-1.png","assets/enemies/seaunicorn/base/orange-idle-2.png"],hurt:"assets/enemies/seaunicorn/base/orange-hurt.png"},
  dark:{id:"dark",name:"Dark Seaunicorn",hp:1.25,atk:1.13,exp:1.24,coin:1.24,idle:["assets/enemies/seaunicorn/base/dark-idle-1.png","assets/enemies/seaunicorn/base/dark-idle-2.png"],hurt:"assets/enemies/seaunicorn/base/dark-hurt.png"},
  pink:{id:"pink",name:"Pink Seaunicorn",hp:1.4,atk:1.2,exp:1.38,coin:1.38,idle:["assets/enemies/seaunicorn/base/pink-idle-1.png","assets/enemies/seaunicorn/base/pink-idle-2.png"],hurt:"assets/enemies/seaunicorn/base/pink-hurt.png"},
  blue:{id:"blue",name:"Blue Seaunicorn",hp:1.68,atk:1.3,exp:1.55,coin:1.62,elite:true,idle:["assets/enemies/seaunicorn/base/blue-idle-1.png","assets/enemies/seaunicorn/base/blue-idle-2.png"],hurt:"assets/enemies/seaunicorn/base/blue-hurt.png"}
});
function applySeaunicornVariant(t,r){return applyFamilyVariant(t,SEAUNICORN_VARIANTS,["base","orange","dark","pink","blue"],r,"seaunicornVariant",true);}

const TREE_SQUIRREL_VARIANTS=Object.freeze({
  base:{id:"base",name:"Tree Squirrel",hp:1,atk:1,exp:1,coin:1,idle:["assets/bosses/tree-squirrel/base/tree-squirrel-idle-1.png","assets/bosses/tree-squirrel/base/tree-squirrel-idle-2.png"],hurt:"assets/bosses/tree-squirrel/base/tree-squirrel-hurt.png"},
  green:{id:"green",name:"Green Tree Squirrel",hp:1.15,atk:1.08,exp:1.15,coin:1.15,idle:["assets/bosses/tree-squirrel/base/green-idle-1.png","assets/bosses/tree-squirrel/base/green-idle-2.png"],hurt:"assets/bosses/tree-squirrel/base/green-hurt.png"},
  yellow:{id:"yellow",name:"Yellow Tree Squirrel",hp:1.25,atk:1.12,exp:1.24,coin:1.24,idle:["assets/bosses/tree-squirrel/base/yellow-idle-1.png","assets/bosses/tree-squirrel/base/yellow-idle-2.png"],hurt:"assets/bosses/tree-squirrel/base/yellow-hurt.png"},
  pink:{id:"pink",name:"Pink Tree Squirrel",hp:1.42,atk:1.2,exp:1.4,coin:1.4,idle:["assets/bosses/tree-squirrel/base/pink-idle-1.png","assets/bosses/tree-squirrel/base/pink-idle-2.png"],hurt:"assets/bosses/tree-squirrel/base/pink-hurt.png"},
  peach:{id:"peach",name:"Peach Tree Squirrel",hp:1.7,atk:1.3,exp:1.7,coin:1.75,elite:true,idle:["assets/bosses/tree-squirrel/base/peach-idle-1.png","assets/bosses/tree-squirrel/base/peach-idle-2.png"],hurt:"assets/bosses/tree-squirrel/base/peach-hurt.png"}
});
function applyTreeSquirrelVariant(t,r){return applyFamilyVariant(t,TREE_SQUIRREL_VARIANTS,["base","green","yellow","pink","peach"],r,"treeSquirrelVariant",false);}

const JELLYBUN_VARIANTS=Object.freeze({
  base:{id:"base",name:"Jellybun",hp:1,atk:1,exp:1,coin:1,idle:["assets/bosses/jellybun/base/jellybun-idle-1.png","assets/bosses/jellybun/base/jellybun-idle-2.png"],hurt:"assets/bosses/jellybun/base/jellybun-hurt.png"},
  pink:{id:"pink",name:"Pink Jellybun",hp:1.18,atk:1.08,exp:1.15,coin:1.15,idle:["assets/bosses/jellybun/base/pink-idle-1.png","assets/bosses/jellybun/base/pink-idle-2.png"],hurt:"assets/bosses/jellybun/base/pink-hurt.png"},
  green:{id:"green",name:"Green Jellybun",hp:1.28,atk:1.13,exp:1.25,coin:1.25,idle:["assets/bosses/jellybun/base/green-idle-1.png","assets/bosses/jellybun/base/green-idle-2.png"],hurt:"assets/bosses/jellybun/base/green-hurt.png"},
  grey:{id:"grey",name:"Grey Jellybun",hp:1.45,atk:1.2,exp:1.42,coin:1.42,idle:["assets/bosses/jellybun/base/grey-idle-1.png","assets/bosses/jellybun/base/grey-idle-2.png"],hurt:"assets/bosses/jellybun/base/grey-hurt.png"},
  gold:{id:"gold",name:"Gold Jellybun",hp:1.72,atk:1.3,exp:1.75,coin:1.8,elite:true,idle:["assets/bosses/jellybun/base/gold-idle-1.png","assets/bosses/jellybun/base/gold-idle-2.png"],hurt:"assets/bosses/jellybun/base/gold-hurt.png"}
});
function applyJellybunVariant(t,r){return applyFamilyVariant(t,JELLYBUN_VARIANTS,["base","pink","green","grey","gold"],r,"jellybunVariant",true);}

const SHINY_RATE = 0.01;
const MYSTERY_CHEST_RATE = 1 / 50;

// One rare recolor per enemy family. The special family variant replaces any
// normal recolor at 1/100 and is guaranteed to befriend with any Buddy Pon.
// Amethyst Mimic is intentionally different: it only reveals itself from the
// purple Mystery Chest so the chest keeps its surprise.
const SHINY_VARIANTS = Object.freeze({
  "cat-slime": {
    id:"rainbow", name:"Rainbow Slime Kitty",
    idle:[
      "assets/shinies/rainbow-slime-kitty-idle-1.png",
      "assets/shinies/rainbow-slime-kitty-idle-2.png",
      "assets/shinies/rainbow-slime-kitty-idle-3.png",
      "assets/shinies/rainbow-slime-kitty-idle-2.png"
    ],
    hurt:"assets/shinies/rainbow-slime-kitty-idle-1.png"
  },
  "bee": {
    id:"sky", name:"Sky Bee",
    idle:["assets/shinies/sky-bee-idle-1.png","assets/shinies/sky-bee-idle-2.png"],
    hurt:"assets/shinies/sky-bee-hurt.png"
  },
  "flower": {
    id:"midnight", name:"Midnight Bloom",
    idle:["assets/shinies/midnight-bloom-idle-1.png","assets/shinies/midnight-bloom-idle-2.png"],
    hurt:"assets/shinies/midnight-bloom-hurt.png"
  },
  "mushroom-cat": {
    id:"cocoa", name:"Cocoa Mushroom Cat",
    idle:["assets/shinies/cocoa-mushroom-cat-idle-1.png","assets/shinies/cocoa-mushroom-cat-idle-2.png"],
    hurt:"assets/shinies/cocoa-mushroom-cat-hurt.png"
  },
  "mimic": {
    id:"amethyst", name:"Amethyst Mimic",
    idle:["assets/shinies/amethyst-mimic-idle-1.png","assets/shinies/amethyst-mimic-idle-2.png"],
    hurt:"assets/shinies/amethyst-mimic-closed.png"
  },
  "cool-seagull": {
    id:"royal", name:"Royal Seagull",
    idle:["assets/shinies/royal-seagull-idle-1.png","assets/shinies/royal-seagull-idle-2.png"],
    hurt:"assets/shinies/royal-seagull-hurt.png"
  },
  "sea-turtle": {
    id:"ruby", name:"Ruby Shell Turtle",
    idle:["assets/shinies/ruby-shell-turtle-idle-1.png","assets/shinies/ruby-shell-turtle-idle-2.png"],
    hurt:"assets/shinies/ruby-shell-turtle-hurt.png"
  },
  "catfish": {
    id:"bubblegum", name:"Bubblegum Catfish",
    idle:["assets/shinies/bubblegum-catfish-idle-1.png","assets/shinies/bubblegum-catfish-idle-2.png"],
    hurt:"assets/shinies/bubblegum-catfish-hurt.png"
  },
  "vampire-squid": {
    id:"crimson", name:"Crimson Squid",
    idle:["assets/shinies/crimson-squid-idle-1.png","assets/shinies/crimson-squid-idle-2.png"],
    hurt:"assets/shinies/crimson-squid-hurt.png"
  },
  "acorn-mouse": {
    id:"albino", name:"Albino Acorn Mouse",
    idle:["assets/shinies/albino-acorn-mouse-idle-1.png","assets/shinies/albino-acorn-mouse-idle-2.png"],
    hurt:"assets/shinies/albino-acorn-mouse-hurt.png"
  },
  "seaunicorn": {
    id:"aurora", name:"Aurora Seaunicorn",
    idle:["assets/shinies/aurora-seaunicorn-idle-1.png","assets/shinies/aurora-seaunicorn-idle-2.png"],
    hurt:"assets/shinies/aurora-seaunicorn-hurt.png"
  },
  "tree-squirrel": {
    id:"sakura", name:"Sakura Tree Squirrel",
    idle:["assets/shinies/sakura-tree-squirrel-idle-1.png","assets/shinies/sakura-tree-squirrel-idle-2.png"],
    hurt:"assets/shinies/sakura-tree-squirrel-hurt.png"
  },
  "jellybun": {
    id:"rainbow", name:"Rainbow Jellybun",
    idle:["assets/shinies/rainbow-jellybun-idle-1.png","assets/shinies/rainbow-jellybun-idle-2.png"],
    hurt:"assets/shinies/rainbow-jellybun-hurt.png"
  }
});

const ENDLESS_NORMAL_ENEMIES = Object.freeze([
  "cat-slime","bee","flower","acorn-mouse","cool-seagull","sea-turtle","catfish","seaunicorn"
]);
const ENDLESS_BOSSES = Object.freeze(["mushroom-cat","tree-squirrel","vampire-squid","jellybun"]);
const ENDLESS_BACKGROUNDS = Object.freeze(
  Object.values(AREA_CONFIG).flatMap(area=>area.backgrounds)
);

const BUDDY_PONS = Object.freeze([
  {
    id:"buddy-pon", name:"Buddy Pon", image:"../assets/items/buddy-pons/buddy-pon.png",
    price:50, normalRate:.50, bossRate:0, className:""
  },
  {
    id:"super-buddy-pon", name:"Super Buddy Pon", image:"../assets/items/buddy-pons/super-buddy-pon.png",
    price:100, normalRate:.75, bossRate:.35, className:"super"
  },
  {
    id:"boss-buddy-pon", name:"Boss Buddy Pon", image:"../assets/items/buddy-pons/boss-buddy-pon.png",
    price:175, normalRate:1, bossRate:.70, className:"boss"
  }
]);

const BUDDY_SKILLS = Object.freeze({
  "bee":{name:"Honey Help",description:"Restore 15% of your OC's max HP.",type:"heal",healPercent:.15},
  "cat-slime":{name:"Goo Splash",description:"Light damage and lowers enemy Attack for 2 turns.",type:"damage-attack-down",multiplier:.65,attackDown:.20,duration:2},
  "flower":{name:"Petal Guard",description:"Reduce damage taken by 30% for 2 enemy turns.",type:"guard",damageReduction:.30,duration:2},
  "acorn-mouse":{name:"Acorn Toss",description:"Moderate damage with a 25% critical-hit chance.",type:"crit-damage",multiplier:.95,critChance:.25,critMultiplier:1.7},
  "cool-seagull":{name:"Wing Gust",description:"Light damage and makes enemy attacks 25% more likely to miss for 2 turns.",type:"damage-accuracy-down",multiplier:.65,missChance:.25,duration:2},
  "sea-turtle":{name:"Shell Shield",description:"Cut the next damaging enemy hit in half.",type:"next-hit-shield",damageReduction:.50},
  "catfish":{name:"Bubble Burst",description:"Moderate damage with a 30% chance to stun for 1 turn.",type:"damage-stun",multiplier:.95,stunChance:.30},
  "seaunicorn":{name:"Sea Sparkle",description:"Heal 10% HP and raise Attack by 15% for 2 turns.",type:"heal-attack-up",healPercent:.10,attackBoost:.15,duration:2},
  "mushroom-cat":{name:"Spore Puff",description:"Moderate damage and lowers enemy Defense for 2 turns.",type:"damage-defense-down",multiplier:.90,defenseDown:.20,duration:2,boss:true},
  "tree-squirrel":{name:"Forest Feast",description:"Heal 20% HP and reduce damage taken by 20% for 2 turns.",type:"heal-guard",healPercent:.20,damageReduction:.20,duration:2,boss:true},
  "vampire-squid":{name:"Life Drain",description:"Deal 1.2× damage and heal for 50% of damage dealt.",type:"life-drain",multiplier:1.20,drainPercent:.50,boss:true},
  "jellybun":{name:"Jelly Bounce",description:"Deal 1.4× damage with a 30% chance to weaken the enemy's next attack.",type:"damage-weaken",multiplier:1.40,weakenChance:.30,nextAttackMultiplier:.65,boss:true},
  "mimic":{name:"Jackpot Bite",description:"A gamble: strong damage, a heal, or bonus Pink Coins!",type:"jackpot",boss:false}
});

function buddySkillForEnemyId(enemyId){
  return BUDDY_SKILLS[String(enemyId||"")] || null;
}

function mainBuddyRecord(){
  ensureBuddySave();
  const slots=hubSave.buddies?.equippedByCharacter?.[activeCharacterId];
  const key=Array.isArray(slots) && typeof slots[0]==="string" ? slots[0] : null;
  return key ? hubSave.buddies?.collection?.[key] || null : null;
}


function catalogEntry(enemyId, variantId, variant, boss=false, shiny=false) {
  return {
    key:`${enemyId}:${shiny ? "shiny" : variantId}`,
    enemyId,
    variantId:shiny ? "shiny" : variantId,
    name:String(variant?.name || ENEMIES[enemyId]?.name || "Buddy"),
    image:String(variant?.idle?.[0] || ENEMIES[enemyId]?.idle?.[0] || ""),
    boss:Boolean(boss),
    shiny:Boolean(shiny)
  };
}

function buildBuddyCatalog() {
  const entries=[];
  const addTable=(enemyId,table,boss=false)=>{
    Object.values(table).forEach(v=>entries.push(catalogEntry(enemyId,v.id,v,boss,false)));
    const shiny=SHINY_VARIANTS[enemyId];
    if(shiny) entries.push(catalogEntry(enemyId,"shiny",shiny,boss,true));
  };
  addTable("cat-slime",CAT_SLIME_VARIANTS,false);
  addTable("bee",BEE_VARIANTS,false);
  addTable("flower",FLOWER_VARIANTS,false);
  addTable("acorn-mouse",ACORN_MOUSE_VARIANTS,false);
  addTable("mushroom-cat",MUSHROOM_CAT_VARIANTS,true);
  addTable("tree-squirrel",TREE_SQUIRREL_VARIANTS,true);
  entries.push(catalogEntry("mimic","base",ENEMIES.mimic,false,false));
  const mimicShiny=SHINY_VARIANTS.mimic;
  if(mimicShiny) entries.push(catalogEntry("mimic","shiny",mimicShiny,false,true));
  addTable("cool-seagull",SEAGULL_VARIANTS,false);
  addTable("sea-turtle",TURTLE_VARIANTS,false);
  addTable("catfish",CATFISH_VARIANTS,false);
  addTable("seaunicorn",SEAUNICORN_VARIANTS,false);
  addTable("vampire-squid",SQUID_VARIANTS,true);
  addTable("jellybun",JELLYBUN_VARIANTS,true);
  return entries;
}

const BUDDY_CATALOG = Object.freeze(buildBuddyCatalog());
const BUDDY_CATALOG_BY_KEY = new Map(BUDDY_CATALOG.map(entry=>[entry.key,entry]));

function normalizeBuddyCollection(raw) {
  const collection={};
  if(raw && typeof raw==="object" && !Array.isArray(raw)) {
    for(const [fallbackKey,value] of Object.entries(raw)) {
      if(!value || typeof value!=="object" || Array.isArray(value)) continue;
      const key=String(value.key || fallbackKey || "").trim();
      if(!key) continue;
      collection[key]={
        key,
        enemyId:String(value.enemyId || ""),
        variantId:String(value.variantId || "base"),
        name:String(value.name || "Buddy"),
        image:String(value.image || ""),
        shiny:Boolean(value.shiny),
        boss:Boolean(value.boss),
        quantity:Math.max(1,Math.floor(Number(value.quantity)||1)),
        capturedAt:Math.max(0,Number(value.capturedAt)||0)
      };
    }
  }
  return collection;
}

function ensureBuddySave() {
  if(!hubSave.buddies || typeof hubSave.buddies!=="object" || Array.isArray(hubSave.buddies)) hubSave.buddies={};
  hubSave.buddies.collection=normalizeBuddyCollection(hubSave.buddies.collection);
  if(!hubSave.buddies.equippedByCharacter || typeof hubSave.buddies.equippedByCharacter!=="object") hubSave.buddies.equippedByCharacter={};
  ["peep","miko","io"].forEach(id=>{
    const slots=Array.isArray(hubSave.buddies.equippedByCharacter[id])?hubSave.buddies.equippedByCharacter[id]:[];
    hubSave.buddies.equippedByCharacter[id]=Array.from({length:6},(_,i)=>typeof slots[i]==="string"?slots[i]:null);
  });
}

function buddyOwnedQuantity(key) {
  return Math.max(0,Number(hubSave.buddies?.collection?.[key]?.quantity)||0);
}

function enemyVariantId(enemy) {
  if(!enemy) return "base";
  if(enemy.shiny) return "shiny";
  return String(
    enemy.catSlimeVariant || enemy.beeVariant || enemy.flowerVariant || enemy.acornMouseVariant || enemy.mushroomVariant || enemy.treeSquirrelVariant || enemy.oceanVariant || enemy.seaunicornVariant || enemy.jellybunVariant || "base"
  );
}

function buddyKeyForEnemy(enemy) {
  return `${enemy?.id || "enemy"}:${enemy?.shiny ? "shiny" : enemyVariantId(enemy)}`;
}

function buddyRecordFromEnemy(enemy) {
  const key=buddyKeyForEnemy(enemy);
  return {
    key,
    enemyId:String(enemy?.id || ""),
    variantId:enemy?.shiny ? "shiny" : enemyVariantId(enemy),
    name:String(enemy?.name || "Buddy"),
    image:String(enemy?.idle?.[0] || enemy?.hurt || ""),
    shiny:Boolean(enemy?.shiny),
    boss:Boolean(enemy?.boss),
    quantity:1,
    capturedAt:Date.now()
  };
}

function captureBuddy(enemy) {
  ensureBuddySave();
  const incoming=buddyRecordFromEnemy(enemy);
  const existing=hubSave.buddies.collection[incoming.key];
  if(existing) {
    existing.quantity=Math.max(1,Number(existing.quantity)||1)+1;
    existing.name=incoming.name;
    existing.image=incoming.image;
    existing.shiny=incoming.shiny;
    existing.boss=incoming.boss;
  } else {
    hubSave.buddies.collection[incoming.key]=incoming;
  }
  persistAll();
  return hubSave.buddies.collection[incoming.key];
}

function maybeApplyShinyVariant(enemyId, template, forceShiny=false) {
  const shiny=SHINY_VARIANTS[enemyId];
  if(!shiny) return template;
  // The Mimic's shiny is only revealed by the purple Mystery Chest.
  if(!forceShiny && (enemyId==="mimic" || Math.random()>=SHINY_RATE)) return template;
  return {
    ...template,
    name:String(shiny.name || template.name),
    idle:Array.isArray(shiny.idle)&&shiny.idle.length?shiny.idle:template.idle,
    hurt:String(shiny.hurt || template.hurt),
    shiny:true,
    shinyId:String(shiny.id || "shiny")
  };
}

const REWARD_ITEMS = [
  { id:"yarn", name:"Yarn", image:"../assets/ingredients/Yarn.webp", weight:14 },
  { id:"thread", name:"Thread", image:"../assets/ingredients/Thread.webp", weight:14 },
  { id:"glitter", name:"Glitter", image:"../assets/ingredients/Sparkle.webp", weight:9 },
  { id:"flower", name:"Flower", image:"../assets/gifts/Flower.webp", weight:9 },
  { id:"bread-loaf", name:"Bread Loaf", image:"../assets/food/Bread-loaf.webp", weight:8 },
  { id:"apple", name:"Apple", image:"../assets/food/apple.webp", weight:8 },
  { id:"pink-paint", name:"Pink Paint", image:"../assets/paint/Pink-paint.webp", weight:7 },
  { id:"red-paint", name:"Red Paint", image:"../assets/paint/Red-paint.webp", weight:7 },
  { id:"mint-paint", name:"Mint Paint", image:"../assets/paint/Mint-paint.webp", weight:6 },
  { id:"aqua-paint", name:"Aqua Paint", image:"../assets/paint/Aqua-paint.webp", weight:5 },
  { id:"gold-paint", name:"Gold Paint", image:"../assets/paint/Gold-paint.webp", weight:3 },
  { id:"rainbow-paint", name:"Rainbow Paint", image:"../assets/paint/Rainbow-paint.webp", weight:1 },
  { id:"pink-heart-refill", name:"Pink Heart Refill", image:"../assets/bakery/drops/Pink-heart-refill.webp", weight:5 },
  { id:"gold-heart-refill", name:"Gold Heart Refill", image:"../assets/bakery/drops/Gold-heart-refill.webp", weight:1 },
  { id:"buddy-pon", name:"Buddy Pon", image:"../assets/items/buddy-pons/buddy-pon.png", weight:6 },
  { id:"super-buddy-pon", name:"Super Buddy Pon", image:"../assets/items/buddy-pons/super-buddy-pon.png", weight:2.4 },
  { id:"boss-buddy-pon", name:"Boss Buddy Pon", image:"../assets/items/buddy-pons/boss-buddy-pon.png", weight:.65 }
];

function currentAreaConfig(){ return getAreaConfig(currentRun?.area || selectedArea); }
function areaProgress(areaId=selectedArea){ const progress=activeHeroProgress(); return progress.areas[areaId] || progress.areas.meadow; }

const PEepIdle = [
  "assets/characters/peep/base/idle-1.webp",
  "assets/characters/peep/base/idle-2.webp"
];

const MikoIdle = [
  "assets/characters/miko/base/idle-1.webp",
  "assets/characters/miko/base/idle-2.webp"
];

const IoIdle = [
  "assets/characters/io/base/idle-1.webp",
  "assets/characters/io/base/idle-2.webp"
];

function heroIdleFrames(){
  if(activeCharacterId === "miko") return MikoIdle;
  if(activeCharacterId === "io") return IoIdle;
  return PEepIdle;
}
function heroHurtFrame(){
  if(activeCharacterId === "miko") return MikoIdle[0];
  if(activeCharacterId === "io") return IoIdle[0];
  return "assets/characters/peep/base/hurt.webp";
}

const ui = {
  home: document.querySelector("#homeScreen"),
  buddy: document.querySelector("#buddyScreen"),
  battle: document.querySelector("#battleScreen"),
  result: document.querySelector("#resultScreen"),
  coinCount: document.querySelector("#coinCount"),
  levelBadge: document.querySelector("#levelBadge"),
  xpText: document.querySelector("#xpText"),
  xpFill: document.querySelector("#xpFill"),
  happinessHearts: document.querySelector("#happinessHearts"),
  happinessLevel: document.querySelector("#happinessLevel"),
  areaButtons: Array.from(document.querySelectorAll("[data-area]")),
  areaRunLabel: document.querySelector("#areaRunLabel"),
  rankValue: document.querySelector("#rankValue"),
  rankDescription: document.querySelector("#rankDescription"),
  bestRunText: document.querySelector("#bestRunText"),
  endlessRecord: document.querySelector("#endlessRecord"),
  endlessCheckpoint: document.querySelector("#endlessCheckpoint"),
  continueEndless: document.querySelector("#continueEndless"),
  startNewEndless: document.querySelector("#startNewEndless"),
  menuSkills: document.querySelector("#menuSkills"),
  battlefield: document.querySelector("#battlefield"),
  battleBg: document.querySelector("#battleBg"),
  encounterLabel: document.querySelector("#encounterLabel"),
  rankBattleLabel: document.querySelector("#rankBattleLabel"),
  peepLevelCombat: document.querySelector("#peepLevelCombat"),
  peepHpFill: document.querySelector("#peepHpFill"),
  peepHpText: document.querySelector("#peepHpText"),
  peepSprite: document.querySelector("#peepSprite"),
  enemyCombatant: document.querySelector("#enemyCombatant"),
  enemyName: document.querySelector("#enemyName"),
  enemyRank: document.querySelector("#enemyRank"),
  enemyHpFill: document.querySelector("#enemyHpFill"),
  enemyHpText: document.querySelector("#enemyHpText"),
  enemySprite: document.querySelector("#enemySprite"),
  peepDamageText: document.querySelector("#peepDamageText"),
  enemyDamageText: document.querySelector("#enemyDamageText"),
  chestLayer: document.querySelector("#chestLayer"),
  chestCaption: document.querySelector("#chestCaption"),
  chestSprite: document.querySelector("#chestSprite"),
  openChest: document.querySelector("#openChest"),
  battleMessage: document.querySelector("#battleMessage"),
  commandGrid: document.querySelector("#commandGrid"),
  attackMenuButton: document.querySelector("#attackMenuButton"),
  itemMenuButton: document.querySelector("#itemMenuButton"),
  escapeButton: document.querySelector("#escapeButton"),
  commandWindow: document.querySelector("#commandWindow"),
  commandWindowTitle: document.querySelector("#commandWindowTitle"),
  closeCommandWindow: document.querySelector("#closeCommandWindow"),
  skillButtons: document.querySelector("#skillButtons"),
  itemButtons: document.querySelector("#itemButtons"),
  noBattleItems: document.querySelector("#noBattleItems"),
  buddyMenuButton: document.querySelector("#buddyMenuButton"),
  buddyCommandText: document.querySelector("#buddyCommandText"),
  buddyCombatant: document.querySelector("#buddyCombatant"),
  buddyBattleName: document.querySelector("#buddyBattleName"),
  buddyBattleSprite: document.querySelector("#buddyBattleSprite"),
  buddyBattleSparkle: document.querySelector("#buddyBattleSparkle"),
  continueButton: document.querySelector("#continueButton"),
  postFloorActions: document.querySelector("#postFloorActions"),
  leaveEndlessButton: document.querySelector("#leaveEndlessButton"),
  escapeConfirm: document.querySelector("#escapeConfirm"),
  escapeConfirmText: document.querySelector("#escapeConfirmText"),
  cancelEscapeConfirm: document.querySelector("#cancelEscapeConfirm"),
  confirmEscapeButton: document.querySelector("#confirmEscapeButton"),
  runNextRank: document.querySelector("#runNextRank"),
  resultKicker: document.querySelector("#resultKicker"),
  resultTitle: document.querySelector("#resultTitle"),
  resultProgressLabel: document.querySelector("#resultProgressLabel"),
  resultRank: document.querySelector("#resultRank"),
  resultCoins: document.querySelector("#resultCoins"),
  resultExp: document.querySelector("#resultExp"),
  resultItems: document.querySelector("#resultItems"),
  levelUpNotice: document.querySelector("#levelUpNotice"),
  heroSpriteWrap: document.querySelector("#heroSpriteWrap"),
  menuPeep: document.querySelector("#menuPeep"),
  menuHeroComposite: document.querySelector("#menuHeroComposite"),
  battleHeroComposite: document.querySelector("#battleHeroComposite"),
  resultPeep: document.querySelector("#resultPeep"),
  resultHeroComposite: document.querySelector("#resultHeroComposite"),
  heroNameHome: document.querySelector("#heroNameHome"),
  heroNameCombat: document.querySelector("#heroNameCombat"),
  exploreHeading: document.querySelector("#exploreHeading"),
  skillsKicker: document.querySelector("#skillsKicker"),
  iconBackgroundButton: document.querySelector("#iconBackgroundButton"),
  iconBackgroundCurrent: document.querySelector("#iconBackgroundCurrent"),
  iconBackgroundLabel: document.querySelector("#iconBackgroundLabel"),
  iconBackgroundPicker: document.querySelector("#iconBackgroundPicker"),
  switchQuestOc: document.querySelector("#switchQuestOc"),
  buddyHomeCount: document.querySelector("#buddyHomeCount"),
  openBuddyCollection: document.querySelector("#openBuddyCollection"),
  backFromBuddies: document.querySelector("#backFromBuddies"),
  buddyCollectionCount: document.querySelector("#buddyCollectionCount"),
  buddyCollectionGrid: document.querySelector("#buddyCollectionGrid"),
  buddyCollectionEmpty: document.querySelector("#buddyCollectionEmpty"),
  buddyFilters: Array.from(document.querySelectorAll("[data-buddy-filter]")),
  buddyDetail: document.querySelector("#buddyDetail"),
  closeBuddyDetail: document.querySelector("#closeBuddyDetail"),
  buddyDetailArt: document.querySelector("#buddyDetailArt"),
  buddyDetailTag: document.querySelector("#buddyDetailTag"),
  buddyDetailName: document.querySelector("#buddyDetailName"),
  buddyDetailStatus: document.querySelector("#buddyDetailStatus"),
  buddyDetailOwned: document.querySelector("#buddyDetailOwned"),
  buddyDetailType: document.querySelector("#buddyDetailType"),
  buddyDetailSkill: document.querySelector("#buddyDetailSkill"),
  befriendPanel: document.querySelector("#befriendPanel"),
  befriendTitle: document.querySelector("#befriendTitle"),
  befriendText: document.querySelector("#befriendText"),
  befriendPonChoices: document.querySelector("#befriendPonChoices"),
  skipBefriend: document.querySelector("#skipBefriend"),
  purchasePonButton: document.querySelector("#purchasePonButton"),
  ponPurchasePanel: document.querySelector("#ponPurchasePanel"),
  ponPurchaseCoins: document.querySelector("#ponPurchaseCoins"),
  ponPurchaseMessage: document.querySelector("#ponPurchaseMessage"),
  ponPurchaseChoices: document.querySelector("#ponPurchaseChoices")
};

let hubSave = loadHubSave();
ensureBuddySave();
let questSave = normalizeQuestSave(hubSave.duckQuest);

function activeCharacterIdFromQuest(){
  const unlocked=Array.isArray(hubSave.unlockedCharacters)?hubSave.unlockedCharacters:["peep"];
  // On the first v26 launch, inherit the Hub OC once. After that Duck Quest
  // remembers its own independently selected hero.
  const requested=String(questSave.activeCharacter || hubSave.selectedCharacter || "peep");
  if(requested==="miko" && unlocked.includes("miko")) return "miko";
  if(requested==="io" && unlocked.includes("io")) return "io";
  return "peep";
}

let activeCharacterId = activeCharacterIdFromQuest();
questSave.activeCharacter = activeCharacterId;

function heroDisplayName(){ return activeCharacterId==="miko" ? "Miko" : activeCharacterId==="io" ? "Io" : "Peep"; }

function defaultCharacterQuestProgress(){
  return {
    level:1,
    exp:0,
    iconBackground:"white",
    lastArea:"meadow",
    areas:{
      meadow:{unlockedRank:1,lastRank:1},
      ocean:{unlockedRank:1,lastRank:1}
    },
    endless:{record:0,checkpoint:1}
  };
}

function normalizeCharacterQuestProgress(raw, legacy={}){
  const d=defaultCharacterQuestProgress();
  const q=raw&&typeof raw==="object"?raw:{};
  const legacyAreas=legacy.areas&&typeof legacy.areas==="object"?legacy.areas:{};
  const meadowUnlocked=clampInt(q.areas?.meadow?.unlockedRank ?? legacyAreas.meadow?.unlockedRank ?? legacy.unlockedRank,1,20,1);
  const meadowLast=clampInt(q.areas?.meadow?.lastRank ?? legacyAreas.meadow?.lastRank ?? legacy.lastRank,1,meadowUnlocked,1);
  const oceanUnlocked=clampInt(q.areas?.ocean?.unlockedRank ?? legacyAreas.ocean?.unlockedRank,1,50,1);
  const oceanLast=clampInt(q.areas?.ocean?.lastRank ?? legacyAreas.ocean?.lastRank,1,oceanUnlocked,1);
  const incomingIcon=q.iconBackground ?? legacy.iconBackground;
  return {
    ...d,...q,
    level:clampInt(q.level,1,MAX_LEVEL,1),
    exp:Math.max(0,Number(q.exp)||0),
    iconBackground:ICON_BACKGROUND_COLORS.some(color=>color.id===incomingIcon)?incomingIcon:"white",
    lastArea:AREA_CONFIG[q.lastArea ?? legacy.lastArea] ? (q.lastArea ?? legacy.lastArea) : "meadow",
    areas:{
      meadow:{unlockedRank:meadowUnlocked,lastRank:Math.min(meadowLast,meadowUnlocked)},
      ocean:{unlockedRank:oceanUnlocked,lastRank:Math.min(oceanLast,oceanUnlocked)}
    },
    endless:{
      record:Math.max(0,Math.floor(Number(q.endless?.record)||0)),
      checkpoint:Math.max(1,Math.floor(Number(q.endless?.checkpoint)||1))
    }
  };
}

function defaultQuestSave() {
  return {
    peep:defaultCharacterQuestProgress(),
    activeCharacter:"peep",
    iconBackgroundsUnlocked:["white"],
    completedRuns:0,bossWins:0,totalBattlesWon:0,totalCoinsEarned:0,totalExpEarned:0
  };
}

function normalizeQuestSave(raw) {
  const d=defaultQuestSave();
  const q=raw&&typeof raw==="object"?raw:{};
  const normalized={
    ...d,...q,
    peep:normalizeCharacterQuestProgress(q.peep,{
      areas:q.areas,
      unlockedRank:q.unlockedRank,
      lastRank:q.lastRank,
      lastArea:q.lastArea,
      iconBackground:q.iconBackground
    }),
    activeCharacter:["peep","miko","io"].includes(q.activeCharacter)?q.activeCharacter:null,
    iconBackgroundsUnlocked:[...new Set(["white",...(Array.isArray(q.iconBackgroundsUnlocked)?q.iconBackgroundsUnlocked:[])])]
      .filter(id=>ICON_BACKGROUND_COLORS.some(color=>color.id===id)),
    bossWins:Math.max(0,Number(q.bossWins ?? q.completedRuns)||0)
  };
  if(q.miko&&typeof q.miko==="object") normalized.miko=normalizeCharacterQuestProgress(q.miko);
  if(q.io&&typeof q.io==="object") normalized.io=normalizeCharacterQuestProgress(q.io);
  return normalized;
}

function activeHeroProgress(){
  if(!questSave[activeCharacterId]||typeof questSave[activeCharacterId]!=="object"){
    questSave[activeCharacterId]=defaultCharacterQuestProgress();
  }else{
    questSave[activeCharacterId]=normalizeCharacterQuestProgress(questSave[activeCharacterId]);
  }
  return questSave[activeCharacterId];
}

let heroProgress = activeHeroProgress();
let selectedArea = AREA_CONFIG[heroProgress.lastArea] ? heroProgress.lastArea : "meadow";
let selectedRank = Math.min(areaProgress(selectedArea).unlockedRank, Math.max(1, areaProgress(selectedArea).lastRank || 1));
let currentRun = null;
let currentEnemy = null;
let idleTimer = null;
let peepIdleTimer = null;
let enemyIdleIndex = 0;
let peepIdleIndex = 0;
let actionLocked = false;
let pendingChest = null;
let pendingDefeatedEnemy = null;
let befriendAttempted = false;
let endlessExitReason = "";
let buddyCollectionFilter = "all";
const QUICK_HEAL_PERCENT = 0.25;
const QUICK_HEAL_MAX_USES = 4;
let quickHealUses = 0;
let skillState = {};
let buddyUsedThisHeroTurn = false;

function loadHubSave() {
  try {
    const raw = localStorage.getItem(HUB_SAVE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    if (!parsed.inventory || typeof parsed.inventory !== "object") parsed.inventory = {};
    if (!parsed.characterProgress || typeof parsed.characterProgress !== "object") parsed.characterProgress = {};
    if (!parsed.characterProgress.peep || typeof parsed.characterProgress.peep !== "object") {
      parsed.characterProgress.peep = { happinessTotal:0 };
    }
    if (!parsed.characterProgress.miko || typeof parsed.characterProgress.miko !== "object") {
      parsed.characterProgress.miko = { happinessTotal:0 };
    }
    if (!parsed.characterProgress.io || typeof parsed.characterProgress.io !== "object") {
      parsed.characterProgress.io = { happinessTotal:0 };
    }
    if (!Array.isArray(parsed.unlockedCharacters)) parsed.unlockedCharacters=["peep"];
    if (!parsed.unlockedCharacters.includes("peep")) parsed.unlockedCharacters.unshift("peep");
    parsed.selectedCharacter = parsed.unlockedCharacters.includes(parsed.selectedCharacter) ? parsed.selectedCharacter : "peep";
    parsed.coins = Math.max(0, Number(parsed.coins) || 0);
    return parsed;
  } catch {
    return { coins:0, inventory:{}, unlockedDucks:[], unlockedCharacters:["peep"], selectedCharacter:"peep", characterProgress:{peep:{happinessTotal:0},miko:{happinessTotal:0},io:{happinessTotal:0}} };
  }
}

function persistAll() {
  const peep=questSave.peep||defaultCharacterQuestProgress();
  questSave.areas=JSON.parse(JSON.stringify(peep.areas));
  questSave.lastArea=peep.lastArea;
  questSave.unlockedRank=peep.areas.meadow.unlockedRank;
  questSave.lastRank=peep.areas.meadow.lastRank;
  questSave.iconBackground=peep.iconBackground;
  hubSave.duckQuest = questSave;
  localStorage.setItem(HUB_SAVE_KEY, JSON.stringify(hubSave));
}

function clampInt(value,min,max,fallback) {
  const n = Math.round(Number(value));
  return Number.isFinite(n) ? Math.min(max,Math.max(min,n)) : fallback;
}

function randInt(min,max) { return Math.floor(Math.random()*(max-min+1))+min; }
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function hubInventoryQty(itemId) {
  return Math.max(0, Number(hubSave.inventory?.[itemId]) || 0);
}

function consumeHubItem(itemId, quantity = 1) {
  const amount = Math.max(1, Number(quantity) || 1);
  const current = hubInventoryQty(itemId);
  if (current < amount) return false;
  const next = current - amount;
  if (next > 0) hubSave.inventory[itemId] = next;
  else delete hubSave.inventory[itemId];
  persistAll();
  return true;
}
function shuffle(arr) {
  for(let i=arr.length-1;i>0;i--) {
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

function expNeeded(level) {
  if (level >= MAX_LEVEL) return 0;
  return 80 + (level - 1) * 25;
}

function peepStats(level = activeHeroProgress().level) {
  return {
    maxHp: Math.round(42 + (level - 1) * 4.2),
    attack: Math.round(8 + (level - 1) * 1.15),
    defense: Math.round(2 + (level - 1) * 0.48)
  };
}

function enemyScaled(template, rank, areaId="meadow") {
  const ocean=areaId==="ocean";
  const hpStep=ocean ? .070 : .18;
  const atkStep=ocean ? .045 : .12;
  const expStep=ocean ? .055 : .14;
  const rewardStep=ocean ? .040 : .10;
  const hpScale=1+(rank-1)*hpStep;
  const atkScale=1+(rank-1)*atkStep;
  const expScale=1+(rank-1)*expStep;
  const rewardScale=1+(rank-1)*rewardStep;
  return {
    ...template,
    maxHp:Math.round(template.hp*hpScale),hpNow:Math.round(template.hp*hpScale),
    attackNow:Math.max(1,Math.round(template.attack*atkScale)),
    expNow:Math.round(template.exp*expScale),
    coinMinNow:Math.round(template.coinMin*rewardScale),coinMaxNow:Math.round(template.coinMax*rewardScale)
  };
}

function totalHappinessRequiredForLevel(level) {
  const target = Math.max(1, Math.min(100, Number(level)||1));
  let total=0;
  for(let lv=1;lv<target;lv++) total += 10 + Math.floor((lv-1)/5);
  return total;
}

function happinessLevelFromTotal(total) {
  const safe=Math.max(0,Number(total)||0);
  let remaining=safe;
  let level=1;
  while(level<100) {
    const need=10+Math.floor((level-1)/5);
    if(remaining<need) break;
    remaining-=need;
    level++;
  }
  return level;
}

function normalizeIconBackgroundUnlocks(){
  const validIds=new Set(ICON_BACKGROUND_COLORS.map(bg=>bg.id));
  const unlocked=new Set(Array.isArray(questSave.iconBackgroundsUnlocked)?questSave.iconBackgroundsUnlocked:["white"]);
  unlocked.add("white");
  questSave.iconBackgroundsUnlocked=[...unlocked].filter(id=>validIds.has(id));
  const hero=activeHeroProgress(); if(!questSave.iconBackgroundsUnlocked.includes(hero.iconBackground)) hero.iconBackground="white";
}

function unlockIconBackground(id){
  const bg=ICON_BACKGROUND_COLORS.find(x=>x.id===id);
  if(!bg) return null;
  normalizeIconBackgroundUnlocks();
  if(questSave.iconBackgroundsUnlocked.includes(id)) return null;
  questSave.iconBackgroundsUnlocked.push(id);
  return bg;
}

function unlockLevelIconBackgrounds(levels){
  const unlocked=[];
  for(const level of levels){
    const id=LEVEL_ICON_BACKGROUND_REWARDS[level];
    if(!id) continue;
    const bg=unlockIconBackground(id);
    if(bg) unlocked.push(bg);
  }
  return unlocked;
}

function syncPastLevelIconBackgrounds(){
  normalizeIconBackgroundUnlocks();
  const unlocked=new Set(questSave.iconBackgroundsUnlocked);
  for(const [levelText,id] of Object.entries(LEVEL_ICON_BACKGROUND_REWARDS)){
    if(activeHeroProgress().level>=Number(levelText)) unlocked.add(id);
  }
  questSave.iconBackgroundsUnlocked=[...unlocked];
}

function pickChestIconBackground(chest){
  normalizeIconBackgroundUnlocks();
  const locked=ICON_BACKGROUND_COLORS.filter(bg=>bg.source==="chest" && !questSave.iconBackgroundsUnlocked.includes(bg.id));
  if(!locked.length) return null;

  const isMimic=chest?.enemy?.id==="mimic";
  const chance=isMimic ? .50 : chest?.kind==="rare" ? .55 : chest?.kind==="boss" ? .30 : .10;
  if(Math.random()>chance) return null;

  const rarityBoost=chest?.kind==="rare" || isMimic
    ? {common:1,uncommon:1.45,rare:2.5,ultra:4}
    : chest?.kind==="boss"
      ? {common:1,uncommon:1.25,rare:2,ultra:3}
      : {common:1,uncommon:.75,rare:.35,ultra:.12};

  const weighted=locked.map(bg=>({bg,weight:(Number(bg.weight)||1)*(rarityBoost[bg.rarity]||1)}));
  let roll=Math.random()*weighted.reduce((sum,x)=>sum+x.weight,0);
  for(const entry of weighted){
    roll-=entry.weight;
    if(roll<=0) return entry.bg;
  }
  return weighted[0]?.bg||null;
}

function applyIconBackgroundStyle(element,bg){
  if(!element || !bg) return;
  element.style.background=bg.value;
  element.style.backgroundSize=bg.size||"auto";
  element.style.backgroundPosition="0 0";
}

function closeIconBackgroundPicker(){
  ui.iconBackgroundPicker?.classList.add("hidden");
  ui.iconBackgroundButton?.setAttribute("aria-expanded","false");
}

function renderIconBackgroundPicker(){
  normalizeIconBackgroundUnlocks();
  if(!ui.iconBackgroundPicker || !ui.heroSpriteWrap) return;
  const hero=activeHeroProgress();
  const unlocked=new Set(questSave.iconBackgroundsUnlocked);
  const selected=iconBackgroundById(hero.iconBackground);

  applyIconBackgroundStyle(ui.heroSpriteWrap,selected);
  if(ui.iconBackgroundCurrent) applyIconBackgroundStyle(ui.iconBackgroundCurrent,selected);
  if(ui.iconBackgroundLabel) ui.iconBackgroundLabel.textContent=selected.label;

  ui.iconBackgroundPicker.innerHTML="";
  for(const background of ICON_BACKGROUND_COLORS){
    const isUnlocked=unlocked.has(background.id);
    const button=document.createElement("button");
    button.type="button";
    button.className=`icon-background-choice${isUnlocked?"":" locked"}`;
    button.setAttribute("aria-current",String(hero.iconBackground===background.id));
    button.setAttribute("aria-label",`${background.label}${isUnlocked?"":", locked"}`);
    button.title=background.label;

    const swatch=document.createElement("span");
    swatch.className="icon-background-dot";
    applyIconBackgroundStyle(swatch,background);
    button.appendChild(swatch);

    if(!isUnlocked){
      const lock=document.createElement("span");
      lock.className="icon-background-lock";
      lock.textContent="🔒";
      button.appendChild(lock);
    }

    button.addEventListener("click",()=>{
      if(!isUnlocked) return;
      setIconBackground(background.id);
      closeIconBackgroundPicker();
    });
    ui.iconBackgroundPicker.appendChild(button);
  }
}

function setIconBackground(colorId){
  if(!questSave.iconBackgroundsUnlocked.includes(colorId)) return;
  activeHeroProgress().iconBackground=colorId;
  persistAll();
  renderIconBackgroundPicker();
  renderHeroVisuals();
}


const MIKO_LAYER_MAP=Object.freeze({
  "hair-main":{file:"Miko-hair.webp",z:15},
  "hoodie-back":{file:"Miko-hoodie-back.webp",z:18},
  "base":{file:"Miko-base.webp",z:20},
  "socks":{file:"Miko-socks.webp",z:29},
  "socks-garter":{file:"white-garter-socks.webp",z:29},
  "bottom-capris":{file:"Miko-capri-pants.webp",z:31},
  "bottom-jeans":{file:"Miko-jeans.webp",z:31},
  "bottom-boxers":{file:"Miko-Boxers.webp",z:31},
  "bottom-shorts":{file:"shorts.webp",z:31},
  "top-button":{file:"Miko-button-shirt.webp",z:32},
  "shirt-blouse":{file:"blouse.webp",z:32},
  "belt":{file:"Miko-belt.webp",z:33},
  "top-hoodie":{file:"Miko-hoodie.webp",z:34},
  "top-sweater":{file:"Miko-sweater.webp",z:34},
  "outer-black-blazer":{file:"black-blazer.webp",z:34},
  "arm-base":{file:"Miko-base-arm.webp",z:35},
  "top-big-shirt":{file:"Miko-big-shirt.webp",z:36.5},
  "top-button-sleeve":{file:"Miko-button-sleeve.webp",z:36},
  "top-hoodie-sleeve":{file:"Miko-hoodie-sleeve.webp",z:37},
  "top-sweater-sleeve":{file:"Miko-sweater-sleeve.webp",z:37},
  "outer-black-blazer-arm":{file:"black-blazer-arm-piece.webp",z:37},
  "shoes-loafer":{file:"Miko-loafers.webp",z:39},
  "shoes-fancy-loafers":{file:"fancy-loafers.webp",z:39},
  "expression-neutral":{file:"Miko-neutral.webp",z:44},
  "headband":{file:"Miko-headband.webp",z:47},
  "bangs":{file:"Miko-bangs.webp",z:48},
  "bangs-pinned":{file:"Miko-bangs-pinned.webp",z:48},
  "hairpins-black":{file:"black-hairpins.webp",z:49}
});

function currentMikoOutfit(){
  const raw=hubSave.characterOutfits?.miko||{};
  return {
    bangsStyle:["bangs","bangs-pinned"].includes(raw.bangsStyle)?raw.bangsStyle:"bangs",
    shirt:[null,"top-button","shirt-blouse"].includes(raw.shirt)?raw.shirt:"top-button",
    outer:[null,"top-hoodie","top-sweater","top-big-shirt","outer-black-blazer"].includes(raw.outer)?raw.outer:"top-hoodie",
    bottom:["bottom-capris","bottom-jeans","bottom-boxers","bottom-shorts"].includes(raw.bottom)?raw.bottom:"bottom-capris",
    socks:["socks","socks-garter"].includes(raw.socks)?raw.socks:null,
    shoes:[null,"shoes-loafer","shoes-fancy-loafers"].includes(raw.shoes)?raw.shoes:"shoes-loafer",
    extras:Array.isArray(raw.extras)?raw.extras:[]
  };
}

function currentMikoLayerIds(){
  const outfit=currentMikoOutfit();
  const ids=["hair-main","base"];
  if(outfit.outer==="top-hoodie") ids.push("hoodie-back");
  if(outfit.socks) ids.push(outfit.socks);
  if(outfit.bottom) ids.push(outfit.bottom);
  if(outfit.shirt) ids.push(outfit.shirt);
  if(outfit.bottom==="bottom-jeans") ids.push("belt");
  if(outfit.outer) ids.push(outfit.outer);
  ids.push("arm-base");
  if(outfit.shirt==="top-button") ids.push("top-button-sleeve");
  if(outfit.outer==="top-hoodie") ids.push("top-hoodie-sleeve");
  else if(outfit.outer==="top-sweater") ids.push("top-sweater-sleeve");
  else if(outfit.outer==="outer-black-blazer") ids.push("outer-black-blazer-arm");
  if(outfit.shoes) ids.push(outfit.shoes);
  ids.push(...outfit.extras.filter(id=>MIKO_LAYER_MAP[id]));
  ids.push("expression-neutral",outfit.bangsStyle);
  return ids.filter(id=>MIKO_LAYER_MAP[id]).sort((a,b)=>MIKO_LAYER_MAP[a].z-MIKO_LAYER_MAP[b].z);
}

function renderHeroComposite(container,src=heroIdleFrames()[0]){
  if(!container) return;
  let img=container.querySelector("img");
  if(!img){
    container.innerHTML="";
    img=document.createElement("img");
    img.className="quest-composite-sprite pixel-sprite";
    container.appendChild(img);
  }
  img.alt=heroDisplayName();
  img.src=src;
}


function activeHeroVisual(){
  return activeCharacterId==="peep" ? ui.peepSprite : ui.battleHeroComposite;
}

function renderHeroVisuals(){
  const usesComposite=activeCharacterId!=="peep";
  const isMiko=activeCharacterId==="miko";
  const isIo=activeCharacterId==="io";
  ui.battlefield?.classList.toggle("miko-active",isMiko);
  ui.battlefield?.classList.toggle("io-active",isIo);
  const name=heroDisplayName();
  if(ui.heroNameHome) ui.heroNameHome.textContent=name;
  if(ui.heroNameCombat) ui.heroNameCombat.textContent=name;
  if(ui.exploreHeading) ui.exploreHeading.textContent=`Where should ${name} Explore?`;
  if(ui.skillsKicker) ui.skillsKicker.textContent=`${name.toUpperCase()}'S SKILLS`;

  ui.menuPeep?.classList.toggle("hidden",usesComposite);
  ui.menuHeroComposite?.classList.toggle("hidden",!usesComposite);
  ui.peepSprite?.classList.toggle("hidden",usesComposite);
  ui.battleHeroComposite?.classList.toggle("hidden",!usesComposite);
  ui.resultPeep?.classList.toggle("hidden",usesComposite);
  ui.resultHeroComposite?.classList.toggle("hidden",!usesComposite);

  if(usesComposite){
    const idle=heroIdleFrames()[0];
    renderHeroComposite(ui.menuHeroComposite,idle);
    renderHeroComposite(ui.battleHeroComposite,idle);
    renderHeroComposite(ui.resultHeroComposite,idle);
  }
}

function skillDisplayName(skill){ return skill.name; }

function skillDisplayDescription(skill){ return skill.description; }


function availableQuestCharacters(){
  const unlocked=Array.isArray(hubSave.unlockedCharacters)?hubSave.unlockedCharacters:["peep"];
  return ["peep","miko","io"].filter(id=>unlocked.includes(id));
}

function renderSwitchOcButton(){
  if(!ui.switchQuestOc) return;
  const available=availableQuestCharacters();
  if(available.length<2){
    ui.switchQuestOc.classList.add("hidden");
    return;
  }
  ui.switchQuestOc.classList.remove("hidden");
  const currentIndex=Math.max(0,available.indexOf(activeCharacterId));
  const nextId=available[(currentIndex+1)%available.length];
  const names={peep:"Peep",miko:"Miko",io:"Io"};
  ui.switchQuestOc.textContent=`Switch to ${names[nextId]||nextId}`;
}

function switchQuestCharacter(){
  if(currentRun) return;
  const available=availableQuestCharacters();
  if(available.length<2) return;
  const currentIndex=Math.max(0,available.indexOf(activeCharacterId));
  activeCharacterId=available[(currentIndex+1)%available.length];
  questSave.activeCharacter=activeCharacterId;
  const progress=activeHeroProgress();
  selectedArea=AREA_CONFIG[progress.lastArea]?progress.lastArea:"meadow";
  selectedRank=Math.min(areaProgress(selectedArea).unlockedRank,Math.max(1,areaProgress(selectedArea).lastRank||1));
  closeIconBackgroundPicker();
  persistAll();
  renderMeta();
}

function buddyDisplayCatalog() {
  ensureBuddySave();
  const byKey=new Map(BUDDY_CATALOG.map(entry=>[entry.key,{...entry}]));
  Object.values(hubSave.buddies.collection||{}).forEach(record=>{
    if(!record?.key) return;
    if(!byKey.has(record.key)) byKey.set(record.key,{...record});
  });
  return [...byKey.values()];
}

function buddyCollectionProgress() {
  const catalog=buddyDisplayCatalog();
  const caught=catalog.filter(entry=>buddyOwnedQuantity(entry.key)>0).length;
  return {caught,total:catalog.length};
}

function renderBuddyHomeCount() {
  const progress=buddyCollectionProgress();
  if(ui.buddyHomeCount) ui.buddyHomeCount.textContent=`${progress.caught} / ${progress.total} befriended`;
}

function closeBuddyDetail() {
  ui.buddyDetail?.classList.add("hidden");
  ui.buddyDetail?.setAttribute("aria-hidden","true");
}

function setBuddyScreenUrl(isOpen) {
  try {
    const url=new URL(window.location.href);
    if(isOpen) url.searchParams.set("screen","buddies");
    else url.searchParams.delete("screen");
    window.history.replaceState(null,"",url);
  } catch {}
}

function openBuddyDetail(entry) {
  if(!entry || !ui.buddyDetail) return;
  const owned=buddyOwnedQuantity(entry.key);
  const caught=owned>0;
  ui.buddyDetailArt.innerHTML="";
  ui.buddyDetailArt.classList.toggle("unknown",!caught);
  if(entry.image) {
    const img=document.createElement("img");
    img.src=entry.image;
    img.alt="";
    ui.buddyDetailArt.appendChild(img);
  } else {
    ui.buddyDetailArt.textContent=caught?(entry.shiny?"✨":entry.boss?"★":"♡"):"?";
  }
  ui.buddyDetailTag.textContent=entry.shiny?"SHINY BUDDY ✨":entry.boss?"BOSS BUDDY":"BUDDY";
  ui.buddyDetailName.textContent=caught?entry.name:"???";
  ui.buddyDetailStatus.textContent=caught
    ? `Befriended! You currently own ${owned} ${owned===1?"copy":"copies"}.`
    : "Not befriended yet. Find this Buddy in Duck Quest and use a Buddy Pon!";
  ui.buddyDetailOwned.textContent=`×${owned}`;
  ui.buddyDetailType.textContent=entry.shiny?(entry.boss?"Shiny Boss":"Shiny"):entry.boss?"Boss":"Normal";
  const buddySkill=buddySkillForEnemyId(entry.enemyId);
  if(ui.buddyDetailSkill) ui.buddyDetailSkill.innerHTML=buddySkill
    ? `<strong>Buddy Skill: ${buddySkill.name}</strong><br>${buddySkill.description}`
    : `<strong>Buddy Skill:</strong> No skill assigned yet.`;
  ui.buddyDetail.classList.remove("hidden");
  ui.buddyDetail.setAttribute("aria-hidden","false");
}

function renderBuddyCollection() {
  ensureBuddySave();
  const catalog=buddyDisplayCatalog();
  const progress=buddyCollectionProgress();
  if(ui.buddyCollectionCount) ui.buddyCollectionCount.textContent=`${progress.caught} / ${progress.total}`;
  renderBuddyHomeCount();
  ui.buddyFilters.forEach(button=>button.classList.toggle("selected",button.dataset.buddyFilter===buddyCollectionFilter));

  let entries=catalog.filter(entry=>{
    if(buddyCollectionFilter==="normal") return !entry.boss && !entry.shiny;
    if(buddyCollectionFilter==="boss") return Boolean(entry.boss);
    if(buddyCollectionFilter==="shiny") return Boolean(entry.shiny);
    return true;
  });

  ui.buddyCollectionGrid.innerHTML="";
  entries.forEach(entry=>{
    const owned=buddyOwnedQuantity(entry.key);
    const caught=owned>0;
    const button=document.createElement("button");
    button.type="button";
    button.className=`buddy-tile${caught?" caught":" unknown"}${entry.boss?" boss":""}${entry.shiny?" shiny":""}`;
    button.setAttribute("aria-label",caught?`${entry.name}, owned ${owned}`:"Undiscovered Buddy");

    const art=document.createElement("span");
    art.className="buddy-tile-art";
    if(entry.image) {
      const img=document.createElement("img");
      img.src=entry.image;
      img.alt="";
      art.appendChild(img);
    } else {
      art.textContent=caught?(entry.shiny?"✨":entry.boss?"★":"♡"):"?";
    }

    const name=document.createElement("strong");
    name.textContent=caught?`${entry.name}${entry.shiny?" ✨":""}`:"???";
    const state=document.createElement("small");
    state.textContent=caught?`Owned ×${owned}`:"Not Befriended";
    const badge=document.createElement("span");
    badge.className="buddy-tile-badge";
    badge.textContent=entry.shiny?"✨":entry.boss?"★":caught?"♡":"?";

    button.append(art,name,state,badge);
    button.addEventListener("click",()=>openBuddyDetail(entry));
    ui.buddyCollectionGrid.appendChild(button);
  });

  const empty=!entries.length;
  ui.buddyCollectionEmpty?.classList.toggle("hidden",!empty);
  if(empty && ui.buddyCollectionEmpty) {
    ui.buddyCollectionEmpty.textContent=buddyCollectionFilter==="shiny" && !Object.keys(SHINY_VARIANTS).length
      ? "Shiny slots will appear here as their special recolor art is added. ✨"
      : "No Buddies match this filter yet.";
  }
}

function renderMeta() {
  renderSwitchOcButton();
  renderIconBackgroundPicker();
  ui.coinCount.textContent=hubSave.coins.toLocaleString();
  const hero=activeHeroProgress(); renderHeroVisuals();
  ui.levelBadge.textContent=`Lv. ${hero.level}`;
  const need=expNeeded(hero.level);
  ui.xpText.textContent=hero.level>=MAX_LEVEL?"MAX LEVEL":`${Math.floor(hero.exp)} / ${need} EXP`;
  ui.xpFill.style.width=hero.level>=MAX_LEVEL?"100%":`${Math.min(100,(hero.exp/need)*100)}%`;
  const hLevel=happinessLevelFromTotal(hubSave.characterProgress?.[activeCharacterId]?.happinessTotal);
  ui.happinessLevel.textContent=`Lv. ${hLevel}`; ui.happinessHearts.innerHTML="";
  const filled=Math.max(1,Math.ceil(hLevel/20));
  for(let i=1;i<=5;i++){const heart=document.createElement("span");heart.textContent="♥";heart.className=i<=filled?"heart-full":"heart-empty";ui.happinessHearts.appendChild(heart);}

  const cfg=getAreaConfig(selectedArea);
  const progress=areaProgress(selectedArea);
  selectedRank=Math.min(Math.max(1,selectedRank),progress.unlockedRank);
  ui.rankValue.textContent=selectedRank;
  ui.areaRunLabel.textContent=`${cfg.name} Route`;
  ui.bestRunText.textContent=`Highest unlocked ${cfg.name} rank: ${progress.unlockedRank} / ${cfg.maxRank}`;
  ui.rankDescription.textContent=`Start Rank ${rankWord(selectedRank)}?`;
  document.querySelector("#rankDown").disabled=selectedRank<=1;
  document.querySelector("#rankUp").disabled=selectedRank>=progress.unlockedRank;
  ui.areaButtons.forEach(btn=>btn.classList.toggle("selected",btn.dataset.area===selectedArea));

  const endless=hero.endless || {record:0,checkpoint:1};
  if(ui.endlessRecord) ui.endlessRecord.textContent=`Floor ${Math.max(0,Number(endless.record)||0)}`;
  if(ui.endlessCheckpoint) ui.endlessCheckpoint.textContent=`Floor ${Math.max(1,Number(endless.checkpoint)||1)}`;
  if(ui.continueEndless){
    const checkpoint=Math.max(1,Number(endless.checkpoint)||1);
    ui.continueEndless.textContent=`Continue from Floor ${checkpoint}`;
    ui.continueEndless.disabled=checkpoint<=1 && Math.max(0,Number(endless.record)||0)===0;
  }

  renderBuddyHomeCount();
  renderMenuSkills();
}

function rankWord(rank) {
  const ones=["Zero","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
  const tens=["","","Twenty","Thirty","Forty","Fifty"];
  const n=Math.max(1,Math.min(50,Math.round(Number(rank)||1)));
  if(n<20) return ones[n];
  const ten=Math.floor(n/10),one=n%10;
  return one ? `${tens[ten]}-${ones[one]}` : tens[ten];
}

function rankDescription(rank,areaId=selectedArea) {
  if(areaId==="ocean"){
    if(rank<=1) return "Ocean Rank 1 · The shore is calm... for now.";
    if(rank<=10) return `Ocean Rank ${rank} · New colors are beginning to appear.`;
    if(rank<=24) return `Ocean Rank ${rank} · Special enemy moves are joining the tide.`;
    if(rank<=35) return `Ocean Rank ${rank} · Deep-water enemies are much tougher.`;
    if(rank<=44) return `Ocean Rank ${rank} · Elite colors are beginning to surface.`;
    return `Ocean Rank ${rank} · The deepest water is extremely dangerous.`;
  }
  if(rank<=1) return "Rank 1 · A gentle place to begin.";
  if(rank<=3) return `Rank ${rank} · Enemies are starting to toughen up.`;
  if(rank<=6) return `Rank ${rank} · A proper challenge. Better loot too!`;
  if(rank<=10) return `Rank ${rank} · The meadow is getting dangerous.`;
  return `Rank ${rank} · High-risk, high-reward territory.`;
}

function renderMenuSkills() {
  ui.menuSkills.innerHTML="";
  activeSkills().forEach(skill=>{
    const el=document.createElement("div");
    const unlocked=activeHeroProgress().level>=skill.unlock;
    el.className=`skill-summary${unlocked?"":" locked"}`;
    el.innerHTML=`<strong>${skillDisplayName(skill)}</strong><span>${unlocked?skillDisplayDescription(skill):`Unlocks at Lv. ${skill.unlock}`}</span>`;
    ui.menuSkills.appendChild(el);
  });
}

function makeStageEncounter(enemyPool){
  if(Math.random()<MYSTERY_CHEST_RATE) return {type:"mystery-chest"};
  const roll=Math.random();
  if(roll<.12) return {type:"rare-chest"};
  if(roll<.20) return {type:"mimic"};
  return {type:"enemy",enemyId:enemyPool[randInt(0,enemyPool.length-1)]};
}

function makeEncounterPlan(rank,areaId=selectedArea) {
  if(areaId==="ocean"){
    const stagePools=[
      ["cool-seagull","sea-turtle","seaunicorn"],
      ["cool-seagull","sea-turtle","seaunicorn"],
      ["catfish","sea-turtle","seaunicorn"]
    ];
    const encounters=stagePools.map(pool=>makeStageEncounter(pool));
    const oceanBosses=["vampire-squid","jellybun"];
    encounters.push({type:"boss",enemyId:oceanBosses[randInt(0,oceanBosses.length-1)]});
    return encounters;
  }

  const stagePools=[
    ["bee","cat-slime","acorn-mouse"],
    ["cat-slime","flower","acorn-mouse"],
    ["bee","flower","cat-slime","acorn-mouse"]
  ];
  const encounters=stagePools.map(pool=>makeStageEncounter(pool));
  const meadowBosses=["mushroom-cat","tree-squirrel"];
  encounters.push({type:"boss",enemyId:meadowBosses[randInt(0,meadowBosses.length-1)]});
  return encounters;
}

function endlessProgress(){
  const hero=activeHeroProgress();
  if(!hero.endless || typeof hero.endless!=="object") hero.endless={record:0,checkpoint:1};
  hero.endless.record=Math.max(0,Math.floor(Number(hero.endless.record)||0));
  hero.endless.checkpoint=Math.max(1,Math.floor(Number(hero.endless.checkpoint)||1));
  return hero.endless;
}

function endlessEffectiveRank(floor){
  return Math.max(1,Math.min(50,1+Math.floor((Math.max(1,floor)-1)/2)));
}

function endlessEnemyScaled(template,floor){
  const block=Math.floor((Math.max(1,Number(floor)||1)-1)/5);
  const hpScale=1+block*.05;
  const atkScale=1+block*.04;
  const rewardScale=1+block*.05;
  return {
    ...template,
    maxHp:Math.max(1,Math.round(template.hp*hpScale)),
    hpNow:Math.max(1,Math.round(template.hp*hpScale)),
    attackNow:Math.max(1,Math.round(template.attack*atkScale)),
    expNow:Math.max(1,Math.round(template.exp*rewardScale)),
    coinMinNow:Math.max(1,Math.round(template.coinMin*rewardScale)),
    coinMaxNow:Math.max(1,Math.round(template.coinMax*rewardScale))
  };
}

function makeEndlessEncounter(floor){
  const f=Math.max(1,Math.floor(Number(floor)||1));
  if(f%5===0){
    return {type:"boss",enemyId:ENDLESS_BOSSES[randInt(0,ENDLESS_BOSSES.length-1)]};
  }
  if(Math.random()<MYSTERY_CHEST_RATE) return {type:"mystery-chest"};
  const roll=Math.random();
  if(roll<.10) return {type:"rare-chest"};
  if(roll<.16) return {type:"mimic"};
  return {type:"enemy",enemyId:ENDLESS_NORMAL_ENEMIES[randInt(0,ENDLESS_NORMAL_ENEMIES.length-1)]};
}

function chooseEndlessBackground(previous=""){
  const choices=ENDLESS_BACKGROUNDS.filter(path=>path!==previous);
  return (choices.length?choices:ENDLESS_BACKGROUNDS)[randInt(0,(choices.length?choices:ENDLESS_BACKGROUNDS).length-1)];
}

function beginEndlessRun(startFloor=1){
  const stats=peepStats();
  const floor=Math.max(1,Math.floor(Number(startFloor)||1));
  const progress=endlessProgress();
  progress.checkpoint=floor;
  endlessExitReason="";
  currentRun={
    mode:"endless",floor,rank:endlessEffectiveRank(floor),area:"endless",index:0,plan:[],
    endlessEncounter:makeEndlessEncounter(floor),floorBackground:chooseEndlessBackground(),
    hp:stats.maxHp,maxHp:stats.maxHp,coinsEarned:0,expEarned:0,itemsEarned:[],iconBackgroundsEarned:[],levelBackgroundsEarned:[],levelsGained:[],bossWon:false
  };
  persistAll();
  showScreen("battle");
  startEncounter();
}


function openEscapeConfirm() {
  if (!currentRun || actionLocked) return;
  if(currentRun.mode==="endless"){
    const checkpoint=endlessProgress().checkpoint;
    ui.escapeConfirmText.textContent=`Leave Endless Run? Floor ${checkpoint} will stay saved as your checkpoint, and your record will not be erased.`;
    ui.confirmEscapeButton.textContent="Leave Endless";
  } else {
    ui.escapeConfirmText.textContent="Are you sure? Your current run will end.";
    ui.confirmEscapeButton.textContent="Escape Run";
  }
  ui.escapeConfirm.classList.remove("hidden");
  ui.escapeConfirm.setAttribute("aria-hidden", "false");
}

function closeEscapeConfirm() {
  ui.escapeConfirm.classList.add("hidden");
  ui.escapeConfirm.setAttribute("aria-hidden", "true");
}

function confirmEscapeRun() {
  closeEscapeConfirm();
  if(currentRun?.mode==="endless") endlessExitReason="paused";
  endRun(false);
}

function beginRun() {
  const stats=peepStats();
  const cfg=getAreaConfig(selectedArea);
  const progress=areaProgress(selectedArea);
  selectedRank=Math.min(Math.max(1,selectedRank),progress.unlockedRank);
  endlessExitReason="";
  currentRun={
    mode:"normal",area:selectedArea,rank:selectedRank,index:0,plan:makeEncounterPlan(selectedRank,selectedArea),
    hp:stats.maxHp,maxHp:stats.maxHp,coinsEarned:0,expEarned:0,itemsEarned:[],iconBackgroundsEarned:[],levelBackgroundsEarned:[],levelsGained:[],bossWon:false
  };
  progress.lastRank=selectedRank; activeHeroProgress().lastArea=selectedArea; persistAll();
  showScreen("battle"); startEncounter();
}

function showScreen(which) {
  ui.home.classList.toggle("hidden", which!=="home");
  ui.buddy?.classList.toggle("hidden", which!=="buddy");
  ui.battle.classList.toggle("hidden", which!=="battle");
  ui.result.classList.toggle("hidden", which!=="result");
  if(which==="buddy") renderBuddyCollection();
}

function startEncounter() {
  clearAnimations();
  actionLocked=false;
  pendingChest=null;
  pendingDefeatedEnemy=null;
  befriendAttempted=false;
  ui.befriendPanel?.classList.add("hidden");
  quickHealUses=0;
  skillState={
    cooldowns:{}, onceUsed:{}, attackBuffTurns:0, attackBuffMultiplier:1.30, activeBuffSkillId:null,
    heartRayCount:0, ioRainbowUses:0, buddyCooldown:0,
    buddyAttackBuffTurns:0, buddyAttackMultiplier:1.15,
    heroGuardTurns:0, heroGuardMultiplier:1,
    heroNextDamageMultiplier:1,
    enemyAttackDownTurns:0, enemyAttackMultiplier:1,
    enemyDefenseDownTurns:0, enemyDefenseMultiplier:1,
    enemyAccuracyDownTurns:0, enemyMissChance:0,
    enemyNextAttackMultiplier:1, enemyStunned:false
  };
  buddyUsedThisHeroTurn=false;
  ui.chestLayer.classList.add("hidden");
  ui.postFloorActions?.classList.add("hidden");
  ui.leaveEndlessButton?.classList.add("hidden");
  ui.commandGrid.classList.remove("hidden");
  closeCommandWindow();
  ui.enemyCombatant.classList.remove("hidden");
  ui.buddyCombatant?.classList.add("hidden");

  const isEndless=currentRun?.mode==="endless";
  const encounter=isEndless ? currentRun.endlessEncounter : currentRun.plan[currentRun.index];

  if(isEndless){
    currentRun.rank=endlessEffectiveRank(currentRun.floor);
    if(!currentRun.floorBackground) currentRun.floorBackground=chooseEndlessBackground();
    ui.battleBg.src=currentRun.floorBackground;
    const oceanish=String(currentRun.floorBackground).includes('/ocean/');
    ui.battlefield.classList.toggle("ocean-peep-raised",oceanish && !String(currentRun.floorBackground).includes('/floor.'));
    ui.encounterLabel.textContent=`FLOOR ${currentRun.floor}${currentRun.floor%5===0?" · BOSS":""}`;
    ui.rankBattleLabel.textContent=`Endless · Record ${endlessProgress().record}`;
  } else {
    const cfg=currentAreaConfig();
    ui.battleBg.src=cfg.backgrounds[currentRun.index];
    ui.battlefield.classList.toggle("ocean-peep-raised", currentRun.area==="ocean" && (currentRun.index===1 || currentRun.index===2));
    ui.encounterLabel.textContent=currentRun.area==="ocean"
      ? `${cfg.stageNames[currentRun.index].toUpperCase()} · ${currentRun.index+1} / 4`
      : `ENCOUNTER ${currentRun.index+1} / 4`;
    ui.rankBattleLabel.textContent=`${cfg.name} · Rank ${currentRun.rank}`;
  }

  ui.peepLevelCombat.textContent=`Lv. ${activeHeroProgress().level}`;
  renderPeepHp();
  startPeepIdle();

  if(encounter.type==="mystery-chest") {
    currentEnemy=null;
    ui.enemyCombatant.classList.add("hidden");
    ui.commandGrid.classList.add("hidden");
    closeCommandWindow();
    showChest({kind:"mystery", mystery:true, revealMimic:false});
    setMessage("A strange purple chest appeared... Jackpot or trouble?");
    return;
  }

  if(encounter.type==="rare-chest") {
    currentEnemy=null;
    ui.enemyCombatant.classList.add("hidden");
    ui.commandGrid.classList.add("hidden");
    closeCommandWindow();
    showChest({kind:"rare", revealMimic:false});
    setMessage("A rare treasure chest appeared instead of an enemy!");
    return;
  }

  if(encounter.type==="mimic") {
    currentEnemy=null;
    ui.enemyCombatant.classList.add("hidden");
    ui.commandGrid.classList.add("hidden");
    closeCommandWindow();
    showChest({kind:"mimic", revealMimic:true});
    setMessage("A treasure chest appeared!");
    return;
  }

  startEnemy(encounter.enemyId);
}

function renderEnemyName(enemy) {
  ui.enemyName.textContent="";
  ui.enemyName.append(document.createTextNode(String(enemy?.name || "Enemy")));
  if(enemy?.shiny) {
    const sparkle=document.createElement("span");
    sparkle.className="enemy-shiny-sparkle";
    sparkle.textContent=" ✨";
    sparkle.setAttribute("aria-label","Shiny");
    ui.enemyName.append(sparkle);
  }
  if(enemy && buddyOwnedQuantity(buddyKeyForEnemy(enemy))>0) {
    const heart=document.createElement("span");
    heart.className="enemy-captured-heart";
    heart.textContent=" ♥";
    heart.setAttribute("aria-label","Already befriended");
    heart.title="Already befriended";
    ui.enemyName.append(heart);
  }
}

function startEnemy(enemyId, options={}) {
  const baseTemplate=ENEMIES[enemyId];
  const variantRank=currentRun?.mode==="endless" ? endlessEffectiveRank(currentRun.floor) : currentRun.rank;
  const normalTemplate =
    enemyId==="mushroom-cat" ? applyMushroomVariant(baseTemplate,variantRank) :
    enemyId==="bee" ? applyBeeVariant(baseTemplate,variantRank) :
    enemyId==="cat-slime" ? applyCatSlimeVariant(baseTemplate,variantRank) :
    enemyId==="flower" ? applyFlowerVariant(baseTemplate,variantRank) :
    enemyId==="cool-seagull" ? applySeagullVariant(baseTemplate,variantRank) :
    enemyId==="sea-turtle" ? applyTurtleVariant(baseTemplate,variantRank) :
    enemyId==="catfish" ? applyCatfishVariant(baseTemplate,variantRank) :
    enemyId==="vampire-squid" ? applySquidVariant(baseTemplate,variantRank) :
    enemyId==="acorn-mouse" ? applyAcornMouseVariant(baseTemplate,variantRank) :
    enemyId==="seaunicorn" ? applySeaunicornVariant(baseTemplate,variantRank) :
    enemyId==="tree-squirrel" ? applyTreeSquirrelVariant(baseTemplate,variantRank) :
    enemyId==="jellybun" ? applyJellybunVariant(baseTemplate,variantRank) :
    enemyId==="mimic" ? applyMimicProfile(baseTemplate,variantRank) : baseTemplate;
  const template=maybeApplyShinyVariant(enemyId,normalTemplate,Boolean(options.forceShiny));

  currentEnemy=currentRun?.mode==="endless"
    ? endlessEnemyScaled(template,currentRun.floor)
    : enemyScaled(template,currentRun.rank,currentRun.area);
  currentEnemy.id=enemyId;
  currentEnemy.healsUsed=0; currentEnemy.specialUses=0; currentEnemy.shellHitsRemaining=0;
  currentEnemy.zoomiesBoost=false; currentEnemy.lifeDrainsUsed=0;
  ui.enemyCombatant.classList.remove("hidden");
  ui.enemySprite.classList.remove("boss-fighter","gold-boss-fighter","queen-bee-fighter","strawberry-slime-fighter","rainbow-flower-fighter","ocean-elite-fighter","ocean-boss-fighter");
  renderEnemyName(currentEnemy);
  ui.enemyRank.textContent=currentRun?.mode==="endless"
    ? `${currentEnemy.boss?"BOSS · ":""}Floor ${currentRun.floor}`
    : currentEnemy.boss?`BOSS · Rank ${currentRun.rank}`:`Rank ${currentRun.rank}`;
  ui.enemySprite.classList.toggle("boss-fighter",Boolean(currentEnemy.boss));
  ui.enemySprite.classList.toggle("gold-boss-fighter",currentEnemy.mushroomVariant==="gold");
  ui.enemySprite.classList.toggle("queen-bee-fighter",currentEnemy.beeVariant==="queen");
  ui.enemySprite.classList.toggle("strawberry-slime-fighter",currentEnemy.catSlimeVariant==="strawberry");
  ui.enemySprite.classList.toggle("rainbow-flower-fighter",currentEnemy.flowerVariant==="rainbow");
  ui.enemySprite.classList.toggle("ocean-elite-fighter",Boolean(currentEnemy.eliteVariant));
  ui.enemySprite.classList.toggle("ocean-boss-fighter",enemyId==="vampire-squid");
  renderEnemyHp(); startEnemyIdle(); renderBattleBuddy(); renderSkills(); renderBattleItems();
  ui.commandGrid.classList.remove("hidden"); closeCommandWindow(); renderBattleItems(); renderCommandButtons();
  if(currentEnemy.shiny) setMessage(`${currentEnemy.name} ✨ appeared! A super-rare Shiny Buddy!`);
  else if(enemyId==="vampire-squid") setMessage(`${currentEnemy.name} rises from the depths!`);
  else if(enemyId==="jellybun") setMessage(`${currentEnemy.name} bounces in to guard the Ocean Floor!`);
  else if(enemyId==="tree-squirrel") setMessage(`${currentEnemy.name} drops down to guard the clearing!`);
  else if(currentEnemy.boss) setMessage(`${currentEnemy.name} blocks the path!`);
  else setMessage(`${currentEnemy.name} appeared!`);
}

function renderBattleBuddy(){
  const buddy=mainBuddyRecord();
  if(!ui.buddyCombatant || !ui.buddyBattleSprite) return;
  if(!buddy || !buddySkillForEnemyId(buddy.enemyId) || !currentEnemy){
    ui.buddyCombatant.classList.add("hidden");
    return;
  }
  ui.buddyBattleName.textContent=buddy.name || "Buddy";
  ui.buddyBattleSprite.src=String(buddy.image||"");
  ui.buddyBattleSprite.alt=buddy.name || "Main Buddy";
  ui.buddyCombatant.classList.toggle("boss-buddy",Boolean(buddy.boss));
  ui.buddyBattleSparkle?.classList.toggle("hidden",!buddy.shiny);
  ui.buddyCombatant.classList.remove("hidden");
}

function buddyDamageBase(multiplier=1,critChance=.08,critMultiplier=1.5){
  const stats=peepStats();
  const heroBuff=(skillState.attackBuffTurns>0?skillState.attackBuffMultiplier:1) *
    (skillState.buddyAttackBuffTurns>0?skillState.buddyAttackMultiplier:1);
  const defenseDebuff=skillState.enemyDefenseDownTurns>0?skillState.enemyDefenseMultiplier:1;
  const crit=Math.random()<critChance;
  const variance=.92+Math.random()*.16;
  return {
    damage:Math.max(1,Math.round(stats.attack*heroBuff*multiplier*defenseDebuff*variance*(crit?critMultiplier:1))),
    crit
  };
}

function animateBuddyAction(){
  if(!ui.buddyCombatant) return;
  ui.buddyCombatant.classList.remove("buddy-action-pop");
  void ui.buddyCombatant.offsetWidth;
  ui.buddyCombatant.classList.add("buddy-action-pop");
  setTimeout(()=>ui.buddyCombatant?.classList.remove("buddy-action-pop"),520);
}

function tickPlayerBuddyEffects(){
  // Buddy is a bonus action. The cooldown begins AFTER the OC finishes the
  // turn in which the Buddy was used, so "3 turns" means three full OC turns.
  if(skillState.buddyCooldown>0 && !buddyUsedThisHeroTurn) skillState.buddyCooldown--;
  buddyUsedThisHeroTurn=false;
  if(skillState.buddyAttackBuffTurns>0) skillState.buddyAttackBuffTurns--;
  if(skillState.enemyDefenseDownTurns>0){
    skillState.enemyDefenseDownTurns--;
    if(skillState.enemyDefenseDownTurns<=0) skillState.enemyDefenseMultiplier=1;
  }
}

function tickEnemyBuddyEffects(){
  if(skillState.enemyAttackDownTurns>0){
    skillState.enemyAttackDownTurns--;
    if(skillState.enemyAttackDownTurns<=0) skillState.enemyAttackMultiplier=1;
  }
  if(skillState.enemyAccuracyDownTurns>0){
    skillState.enemyAccuracyDownTurns--;
    if(skillState.enemyAccuracyDownTurns<=0) skillState.enemyMissChance=0;
  }
  if(skillState.heroGuardTurns>0){
    skillState.heroGuardTurns--;
    if(skillState.heroGuardTurns<=0) skillState.heroGuardMultiplier=1;
  }
}

async function useBuddySkill(){
  const buddy=mainBuddyRecord();
  const skill=buddySkillForEnemyId(buddy?.enemyId);
  if(actionLocked || !currentEnemy || !buddy || !skill || Number(skillState.buddyCooldown||0)>0) return;
  closeCommandWindow();
  actionLocked=true;
  skillState.buddyCooldown=3;
  buddyUsedThisHeroTurn=true;
  renderCommandButtons();
  animateBuddyAction();
  setMessage(`${buddy.name}${buddy.shiny?" ✨":""} used ${skill.name}!`);
  await sleep(260);

  let dealt=0;
  const hit=async(mult=.8,critChance=.08,critMultiplier=1.5)=>{
    const roll=buddyDamageBase(mult,critChance,critMultiplier);
    dealt=await hurtEnemy(roll.damage);
    if(roll.crit) setMessage(`${buddy.name}'s ${skill.name} landed a CRITICAL hit!`);
    return dealt;
  };
  const healHero=(percent)=>{
    const before=currentRun.hp;
    currentRun.hp=Math.min(currentRun.maxHp,currentRun.hp+Math.max(1,Math.round(currentRun.maxHp*percent)));
    const healed=currentRun.hp-before;
    if(healed>0){showFloat(`+${healed}`,"heal","peep");renderPeepHp();}
    return healed;
  };

  switch(skill.type){
    case "heal": {
      const healed=healHero(skill.healPercent||.15);
      setMessage(`${skill.name}! ${buddy.name} restored ${healed} HP.`);
      break;
    }
    case "damage-attack-down":
      await hit(skill.multiplier||.65);
      skillState.enemyAttackDownTurns=skill.duration||2;
      skillState.enemyAttackMultiplier=1-(skill.attackDown||.20);
      setMessage(`${skill.name}! ${currentEnemy?.name||"The enemy"}'s Attack fell for ${skill.duration||2} turns.`);
      break;
    case "guard":
      skillState.heroGuardTurns=skill.duration||2;
      skillState.heroGuardMultiplier=1-(skill.damageReduction||.30);
      setMessage(`${skill.name}! Damage taken is reduced for ${skill.duration||2} turns.`);
      break;
    case "crit-damage":
      await hit(skill.multiplier||.95,skill.critChance||.25,skill.critMultiplier||1.7);
      break;
    case "damage-accuracy-down":
      await hit(skill.multiplier||.65);
      skillState.enemyAccuracyDownTurns=skill.duration||2;
      skillState.enemyMissChance=skill.missChance||.25;
      setMessage(`${skill.name}! ${currentEnemy?.name||"The enemy"} may miss for ${skill.duration||2} turns.`);
      break;
    case "next-hit-shield":
      skillState.heroNextDamageMultiplier=1-(skill.damageReduction||.50);
      setMessage(`${skill.name}! The next damaging enemy hit will be cut in half.`);
      break;
    case "damage-stun":
      await hit(skill.multiplier||.95);
      if(currentEnemy && Math.random()<(skill.stunChance||.30)){
        skillState.enemyStunned=true;
        setMessage(`${skill.name}! ${currentEnemy.name} was stunned!`);
      }
      break;
    case "heal-attack-up": {
      const healed=healHero(skill.healPercent||.10);
      skillState.buddyAttackBuffTurns=skill.duration||2;
      skillState.buddyAttackMultiplier=1+(skill.attackBoost||.15);
      setMessage(`${skill.name}! Restored ${healed} HP and raised Attack for ${skill.duration||2} turns.`);
      break;
    }
    case "damage-defense-down":
      await hit(skill.multiplier||.90);
      skillState.enemyDefenseDownTurns=skill.duration||2;
      skillState.enemyDefenseMultiplier=1+(skill.defenseDown||.20);
      setMessage(`${skill.name}! ${currentEnemy?.name||"The enemy"}'s Defense fell for ${skill.duration||2} turns.`);
      break;
    case "heal-guard": {
      const healed=healHero(skill.healPercent||.20);
      skillState.heroGuardTurns=skill.duration||2;
      skillState.heroGuardMultiplier=1-(skill.damageReduction||.20);
      setMessage(`${skill.name}! Restored ${healed} HP and raised Defense for ${skill.duration||2} turns.`);
      break;
    }
    case "life-drain": {
      const actual=await hit(skill.multiplier||1.2);
      const before=currentRun.hp;
      currentRun.hp=Math.min(currentRun.maxHp,currentRun.hp+Math.max(1,Math.round(actual*(skill.drainPercent||.5))));
      const healed=currentRun.hp-before;
      if(healed>0){showFloat(`+${healed}`,"heal","peep");renderPeepHp();}
      setMessage(`${skill.name}! ${buddy.name} drained ${actual} damage and restored ${healed} HP.`);
      break;
    }
    case "damage-weaken":
      await hit(skill.multiplier||1.4);
      if(currentEnemy && Math.random()<(skill.weakenChance||.30)){
        skillState.enemyNextAttackMultiplier=skill.nextAttackMultiplier||.65;
        setMessage(`${skill.name}! ${currentEnemy.name}'s next attack was weakened.`);
      }
      break;
    case "jackpot": {
      const roll=Math.random();
      if(roll<.45){
        await hit(1.6,.12,1.6);
        setMessage(`Jackpot Bite! ${buddy.name} hit the damage jackpot!`);
      }else if(roll<.75){
        const healed=healHero(.25);
        setMessage(`Jackpot Bite! Healing prize — restored ${healed} HP!`);
      }else{
        const coins=randInt(15,35);
        hubSave.coins=Math.max(0,Number(hubSave.coins)||0)+coins;
        if(!hubSave.stats||typeof hubSave.stats!=="object") hubSave.stats={};
        hubSave.stats.coinsEarnedTotal=Math.max(0,Number(hubSave.stats.coinsEarnedTotal)||0)+coins;
        currentRun.coinsEarned+=coins;
        questSave.totalCoinsEarned=(Number(questSave.totalCoinsEarned)||0)+coins;
        persistAll();renderMeta();
        setMessage(`Jackpot Bite! ${buddy.name} found +${coins} Pink Coins!`);
      }
      break;
    }
  }

  if(currentEnemy && currentEnemy.hpNow<=0){
    await enemyDefeated();
    return;
  }
  await sleep(320);
  actionLocked=false;
  setMessage(`${buddy.name}${buddy.shiny?" ✨":""} helped! Now choose ${heroDisplayName()}'s move.`);
  renderCommandButtons();
  renderSkills();
}

function setHeroFrame(src){
  if(activeCharacterId!=="peep") renderHeroComposite(ui.battleHeroComposite,src);
  else if(ui.peepSprite) ui.peepSprite.src=src;
}

function restoreHeroIdleFrame(){
  const frames=heroIdleFrames();
  const index=peepIdleIndex%frames.length;
  setHeroFrame(frames[index]);
}

function addHeroVisualClass(className){
  activeHeroVisual()?.classList.add(className);
}

function removeHeroVisualClass(...classNames){
  activeHeroVisual()?.classList.remove(...classNames);
}

function renderPeepHp() {
  const pct=Math.max(0,Math.min(100,(currentRun.hp/currentRun.maxHp)*100));
  ui.peepHpFill.style.width=`${pct}%`;
  ui.peepHpText.textContent=`${Math.max(0,Math.round(currentRun.hp))} / ${currentRun.maxHp} HP`;
}

function renderEnemyHp() {
  if(!currentEnemy) return;
  const pct=Math.max(0,Math.min(100,(currentEnemy.hpNow/currentEnemy.maxHp)*100));
  ui.enemyHpFill.style.width=`${pct}%`;
  ui.enemyHpText.textContent=`${Math.max(0,Math.round(currentEnemy.hpNow))} / ${currentEnemy.maxHp} HP`;
}

function startPeepIdle() {
  clearInterval(peepIdleTimer);
  peepIdleIndex=0;
  const frames=heroIdleFrames();
  setHeroFrame(frames[0]);
  peepIdleTimer=setInterval(()=>{
    if(actionLocked) return;
    peepIdleIndex=(peepIdleIndex+1)%frames.length;
    setHeroFrame(frames[peepIdleIndex]);
  },520);
}

function startEnemyIdle() {
  clearInterval(idleTimer);
  enemyIdleIndex=0;
  if(!currentEnemy) return;
  ui.enemySprite.src=currentEnemy.idle[0];
  ui.enemySprite.alt=currentEnemy.name;
  idleTimer=setInterval(()=>{
    if(actionLocked || !currentEnemy) return;
    enemyIdleIndex=(enemyIdleIndex+1)%currentEnemy.idle.length;
    ui.enemySprite.src=currentEnemy.idle[enemyIdleIndex];
  },currentEnemy.speed || 380);
}

function clearAnimations() {
  clearInterval(idleTimer); idleTimer=null;
  clearInterval(peepIdleTimer); peepIdleTimer=null;
}

function renderSkills() {
  ui.skillButtons.innerHTML="";

  activeSkills()
    .filter(skill => activeHeroProgress().level >= skill.unlock)
    .forEach(skill=>{
      const button=document.createElement("button");
      button.type="button";
      let unavailable=false;
      let detail=skillDisplayDescription(skill);

      const cooldown=Number(skillState.cooldowns?.[skill.id]||0);
      if(skill.cooldown && cooldown>0) {
        unavailable=true;
        detail=`Cooldown: ${cooldown} turn${cooldown===1?"":"s"}`;
      } else if(skill.oncePerBattle && skillState.onceUsed?.[skill.id]) {
        unavailable=true;
        detail="Already used this battle.";
      } else if(skill.type==="buff" && skillState.attackBuffTurns>0) {
        unavailable=true;
        const boost=Math.round((skill.attackBoost||0.30)*100);
        detail=`Attack +${boost}% active · ${skillState.attackBuffTurns} turn${skillState.attackBuffTurns===1?"":"s"}`;
      } else if(skill.id==="rainbow-check") {
        const used=Math.max(0,Number(skillState.ioRainbowUses)||0);
        const maxUses=Math.max(1,Number(skill.maxUses)||2);
        if(used>=maxUses){ unavailable=true; detail="No uses left this battle."; }
        else if(currentRun && currentRun.hp>=currentRun.maxHp){ unavailable=true; detail=`Full HP · ${maxUses-used}/${maxUses} uses left`; }
        else detail=`Full heal · ${maxUses-used}/${maxUses} uses left`;
      } else if(skill.id==="heart-ray") {
        const count=Math.max(0,Number(skillState.heartRayCount)||0);
        const until=5-(count%5);
        detail=until===1?"Next Heart Ray is boosted!":`Boost in ${until} uses`;
      }

      button.className=`pixel-button skill-button ${(skill.type==="heal"||skill.type==="full-heal")?"heal":skill.type==="buff"?"buff":skill.id==="duck-throw"?"duck":skill.oncePerBattle?"ultimate":""}`;
      button.disabled=unavailable || actionLocked;
      button.innerHTML=`<strong>${skillDisplayName(skill)}</strong><span${detail.startsWith("Cooldown")?' class="cooldown"':""}>${detail}</span>`;

      if(!unavailable) {
        button.addEventListener("click",()=>{
          closeCommandWindow();
          useSkill(skill);
        });
      }

      ui.skillButtons.appendChild(button);
    });

  const quick=document.createElement("button");
  quick.type="button";
  quick.className="pixel-button skill-button heal quick-heal-skill";
  const usesLeft=Math.max(0,QUICK_HEAL_MAX_USES-quickHealUses);
  const atFullHp=!currentRun || currentRun.hp>=currentRun.maxHp;
  quick.disabled=actionLocked || !currentEnemy || atFullHp || usesLeft<=0;
  quick.innerHTML=`<strong>Quick Heal</strong><span>Restore 25% HP · ${usesLeft}/${QUICK_HEAL_MAX_USES} uses</span>`;
  quick.addEventListener("click",()=>{closeCommandWindow();quickHealTurn();});
  ui.skillButtons.appendChild(quick);

  renderCommandButtons();
}

function renderCommandButtons() {
  const disabled = actionLocked || !currentEnemy;
  if (ui.attackMenuButton) ui.attackMenuButton.disabled = disabled;
  if (ui.itemMenuButton) ui.itemMenuButton.disabled = disabled;

  const buddy=mainBuddyRecord();
  const buddySkill=buddySkillForEnemyId(buddy?.enemyId);
  const buddyCooldown=Math.max(0,Number(skillState.buddyCooldown)||0);
  if(ui.buddyMenuButton){
    ui.buddyMenuButton.disabled=disabled || !buddy || !buddySkill || buddyCooldown>0 || buddyUsedThisHeroTurn;
    if(ui.buddyCommandText){
      ui.buddyCommandText.textContent=!buddy
        ? "No Main Buddy"
        : !buddySkill
          ? "No helper skill"
          : buddyUsedThisHeroTurn
            ? "Bonus move used · choose an OC move"
            : buddyCooldown>0
              ? `${buddySkill.name} · ${buddyCooldown} turn${buddyCooldown===1?"":"s"}`
              : `${buddy.name} · Bonus Move`;
    }
  }

  if (ui.escapeButton) ui.escapeButton.disabled = actionLocked || !currentRun;
}

function renderBuddySkillMenu(){
  if(!ui.skillButtons) return;
  ui.skillButtons.innerHTML="";
  const buddy=mainBuddyRecord();
  const skill=buddySkillForEnemyId(buddy?.enemyId);
  if(!buddy || !skill){
    const empty=document.createElement("p");
    empty.className="no-battle-items";
    empty.textContent="Choose a Main Buddy from Profiles to use a helper skill.";
    ui.skillButtons.appendChild(empty);
    return;
  }
  const cooldown=Math.max(0,Number(skillState.buddyCooldown)||0);
  const button=document.createElement("button");
  button.type="button";
  button.className=`pixel-button skill-button buddy-skill-button${buddy.shiny?" shiny":""}${buddy.boss?" boss":""}`;
  button.disabled=actionLocked || cooldown>0 || buddyUsedThisHeroTurn || !currentEnemy;
  button.innerHTML=`<span class="buddy-skill-row"><img src="${buddy.image}" alt=""><span><strong>${buddy.shiny?"✨ ":""}${buddy.name}</strong><em>${skill.name}</em></span></span><span>${cooldown>0?`Cooldown: ${cooldown} turn${cooldown===1?"":"s"}`:skill.description}</span>`;
  button.addEventListener("click",useBuddySkill);
  ui.skillButtons.appendChild(button);
}

function openCommandWindow(kind) {
  if (actionLocked || !currentEnemy) return;

  ui.commandWindow.dataset.kind = kind;
  ui.commandWindow.classList.remove("hidden");
  ui.skillButtons.classList.add("hidden");
  ui.itemButtons.classList.add("hidden");
  ui.noBattleItems.classList.add("hidden");

  if (kind === "attack") {
    ui.commandWindowTitle.textContent = "Attack";
    renderSkills();
    ui.skillButtons.classList.remove("hidden");
  } else if(kind === "buddy") {
    ui.commandWindowTitle.textContent = "Buddy";
    renderBuddySkillMenu();
    ui.skillButtons.classList.remove("hidden");
  } else {
    ui.commandWindowTitle.textContent = "Item";
    renderBattleItems();
    ui.itemButtons.classList.remove("hidden");
    const hasItems = ui.itemButtons.children.length > 0;
    ui.noBattleItems.classList.toggle("hidden", hasItems);
  }
}

function closeCommandWindow() {
  delete ui.commandWindow.dataset.kind;
  ui.commandWindow.classList.add("hidden");
  ui.skillButtons.classList.add("hidden");
  ui.itemButtons.classList.add("hidden");
  ui.noBattleItems.classList.add("hidden");
}

function renderBattleItems() {
  if (!ui.itemButtons || !ui.noBattleItems) return;

  const battleItems = [
    {
      id: "pink-heart-refill",
      name: "Pink Heart Refill",
      image: "../assets/bakery/drops/Pink-heart-refill.webp",
      detail: "Heal 50% HP"
    },
    {
      id: "gold-heart-refill",
      name: "Gold Heart Refill",
      image: "../assets/bakery/drops/Gold-heart-refill.webp",
      detail: "Restore full HP"
    }
  ];

  ui.itemButtons.innerHTML = "";
  let shown = 0;

  battleItems.forEach(item => {
    const qty = hubInventoryQty(item.id);
    if (qty <= 0) return;

    shown++;
    const button = document.createElement("button");
    button.type = "button";
    button.className = `pixel-button battle-item-button${item.id === "gold-heart-refill" ? " gold" : ""}`;

    const fullHp = !currentRun || currentRun.hp >= currentRun.maxHp;
    button.disabled = actionLocked || !currentEnemy || fullHp;

    button.innerHTML = `
      <img src="${item.image}" alt="">
      <span>
        <strong>${item.name}</strong>
        <small>${item.detail} · ×${qty}</small>
      </span>
    `;

    button.addEventListener("click", () => {
      closeCommandWindow();
      useBattleHeart(item.id);
    });

    ui.itemButtons.appendChild(button);
  });

  ui.noBattleItems.classList.toggle("hidden", shown > 0);
}
async function useBattleHeart(itemId) {
  if (actionLocked || !currentEnemy || !currentRun) return;
  if (currentRun.hp >= currentRun.maxHp) {
    setMessage(`${heroDisplayName()} is already at full health!`);
    renderBattleItems();
    return;
  }

  const isGold = itemId === "gold-heart-refill";
  const itemName = isGold ? "Gold Heart Refill" : "Pink Heart Refill";

  if (!consumeHubItem(itemId, 1)) {
    setMessage(`No ${itemName}s left!`);
    renderBattleItems();
    return;
  }

  actionLocked = true;
  renderSkills();
  renderBattleItems();
  renderCommandButtons();

  const before = currentRun.hp;
  if (isGold) {
    currentRun.hp = currentRun.maxHp;
  } else {
    currentRun.hp = Math.min(
      currentRun.maxHp,
      currentRun.hp + Math.max(1, Math.round(currentRun.maxHp * 0.50))
    );
  }

  const healed = Math.max(0, currentRun.hp - before);
  renderPeepHp();
  showFloat(`+${healed}`, "heal", "peep");
  setMessage(`${itemName}! ${heroDisplayName()} restored ${healed} HP.`);
  await sleep(600);

  // Healing items are intentionally a combat turn so stocking up helps
  // without removing the challenge.
  decrementCooldowns("battle-item");
  await enemyTurn();

  actionLocked = false;
  renderCommandButtons();
  renderSkills();
  renderBattleItems();
}

async function useSkill(skill) {
  if(actionLocked || !currentEnemy) return;
  actionLocked=true;
  renderSkills();
  renderCommandButtons();

  setHeroFrame(skill.sprite || heroIdleFrames()[0]);
  addHeroVisualClass("attack-pop");

  if(skill.type==="heal") {
    const amount=Math.max(1,Math.round(currentRun.maxHp*skill.healPercent));
    const healed=Math.min(amount,currentRun.maxHp-currentRun.hp);
    currentRun.hp+=healed;
    if(skill.cooldown) skillState.cooldowns[skill.id]=skill.cooldown;
    setMessage(`${skillDisplayName(skill)} ${heroDisplayName()} restored ${healed} HP.`);
    showFloat(`+${healed}`,"heal","peep");
    renderPeepHp();
    await sleep(700);
  } else if(skill.type==="full-heal") {
    const maxUses=Math.max(1,Number(skill.maxUses)||2);
    if((skillState.ioRainbowUses||0)>=maxUses){
      setMessage(`${skillDisplayName(skill)} has no uses left this battle!`);
      actionLocked=false; renderSkills(); renderCommandButtons(); return;
    }
    const before=currentRun.hp;
    currentRun.hp=currentRun.maxHp;
    skillState.ioRainbowUses=(skillState.ioRainbowUses||0)+1;
    const healed=Math.max(0,currentRun.hp-before);
    setMessage(`${skillDisplayName(skill)}! ${heroDisplayName()} restored ${healed} HP.`);
    showFloat(`+${healed}`,"heal","peep");
    renderPeepHp();
    await sleep(700);
  } else if(skill.type==="buff") {
    skillState.attackBuffTurns=skill.duration||3;
    skillState.attackBuffMultiplier=1+(skill.attackBoost||0.30);
    skillState.activeBuffSkillId=skill.id;
    const boost=Math.round((skill.attackBoost||0.30)*100);
    setMessage(`${skillDisplayName(skill)}! ${heroDisplayName()}'s Attack rose by ${boost}% for ${skillState.attackBuffTurns} turns.`);
    await sleep(700);
  } else if(skill.type==="multi-hit") {
    if(skill.cooldown) skillState.cooldowns[skill.id]=skill.cooldown;
    if(skill.oncePerBattle) skillState.onceUsed[skill.id]=true;
    const stats=peepStats();
    const boostedAttack=stats.attack*(skillState.attackBuffTurns>0?skillState.attackBuffMultiplier:1)*(skillState.buddyAttackBuffTurns>0?skillState.buddyAttackMultiplier:1)*(skillState.enemyDefenseDownTurns>0?skillState.enemyDefenseMultiplier:1);
    const hits=Math.max(2,Number(skill.hits)||4);
    const perHit=(skill.multiplier||1)/hits;
    const multiMessage = skill.id==="gun"
      ? "He has a gun! Miko fires four quick shots!"
      : skill.id==="sparkle-shot"
        ? "Sparkle Shot! Io fires three sparkling stars!"
        : `${skillDisplayName(skill)}! ${heroDisplayName()} attacks ${hits} times!`;
    setMessage(multiMessage);
    await sleep(240);
    for(let i=0;i<hits && currentEnemy && currentEnemy.hpNow>0;i++){
      const variance=0.96+Math.random()*0.08;
      const dmg=Math.max(1,Math.round(boostedAttack*perHit*variance));
      await hurtEnemy(dmg);
      if(i<hits-1 && currentEnemy?.hpNow>0) await sleep(90);
    }
  } else {
    let multiplier=skill.multiplier||1;
    let flavor=skillDisplayName(skill);

    if(skill.id==="heart-ray") {
      skillState.heartRayCount=(skillState.heartRayCount||0)+1;
      if(skillState.heartRayCount%5===0){
        multiplier=skill.boostedMultiplier||1.8;
        flavor="Heart Ray! The 5th heart bursts with extra power!";
      }
    }

    if(skill.id==="duck-throw") {
      const duck=pickThrowDuck();
      flavor=`Duck Throw! ${duck.name} goes flying!`;
      showThrownDuck(duck);
    }
    if(skill.cooldown) skillState.cooldowns[skill.id]=skill.cooldown;
    if(skill.oncePerBattle) skillState.onceUsed[skill.id]=true;

    const stats=peepStats();
    const boostedAttack=stats.attack*(skillState.attackBuffTurns>0?skillState.attackBuffMultiplier:1)*(skillState.buddyAttackBuffTurns>0?skillState.buddyAttackMultiplier:1)*(skillState.enemyDefenseDownTurns>0?skillState.enemyDefenseMultiplier:1);
    const crit=Math.random()<0.11;
    const variance=0.9+Math.random()*0.2;
    const dmg=Math.max(1,Math.round(boostedAttack*multiplier*variance*(crit?1.5:1)));
    setMessage(flavor + (crit?" CRITICAL!":""));
    await sleep(280);
    await hurtEnemy(dmg);
  }

  removeHeroVisualClass("attack-pop");
  restoreHeroIdleFrame();
  decrementCooldowns(skill.id);

  if(currentEnemy && currentEnemy.hpNow<=0) {
    await enemyDefeated();
    return;
  }

  await sleep(300);
  await enemyTurn();
  actionLocked=false;
  renderCommandButtons();
  renderSkills();
}

function decrementCooldowns(usedSkillId) {
  if(!skillState.cooldowns) skillState.cooldowns={};
  Object.keys(skillState.cooldowns).forEach(id=>{
    if(id!==usedSkillId && skillState.cooldowns[id]>0) skillState.cooldowns[id]--;
  });
  if(usedSkillId!==skillState.activeBuffSkillId && skillState.attackBuffTurns>0) {
    skillState.attackBuffTurns--;
    if(skillState.attackBuffTurns<=0) skillState.activeBuffSkillId=null;
  }
  tickPlayerBuddyEffects();
}

async function hurtEnemy(dmg) {
  if(!currentEnemy) return;
  let finalDmg=Math.max(1,Math.round(dmg));
  if(Number(currentEnemy.shellHitsRemaining||0)>0){
    finalDmg=Math.max(1,Math.ceil(finalDmg*.75));
    currentEnemy.shellHitsRemaining--;
    setMessage(`${currentEnemy.name}'s Harden Shell reduced the damage!`);
  }
  currentEnemy.hpNow=Math.max(0,currentEnemy.hpNow-finalDmg);
  ui.enemySprite.src=currentEnemy.hurt; ui.enemySprite.classList.add("hurt-pop");
  showFloat(`-${finalDmg}`,"damage","enemy"); renderEnemyHp(); await sleep(360);
  ui.enemySprite.classList.remove("hurt-pop");
  if(currentEnemy.hpNow>0) ui.enemySprite.src=currentEnemy.idle[enemyIdleIndex%currentEnemy.idle.length];
  return finalDmg;
}

async function performEnemyAttack(multiplier=1,label="",lifeDrainHeal=0){
  if(!currentEnemy) return 0;
  setMessage(label||`${currentEnemy.name} attacks!`);
  ui.enemySprite.classList.add("attack-pop"); await sleep(300);

  if(skillState.enemyAccuracyDownTurns>0 && Math.random()<Number(skillState.enemyMissChance||0)){
    ui.enemySprite.classList.remove("attack-pop");
    setMessage(`${currentEnemy.name}'s attack missed thanks to Wing Gust!`);
    await sleep(350);
    return 0;
  }

  const stats=peepStats(); const crit=Math.random()<.05;
  const attackDebuff=skillState.enemyAttackDownTurns>0?skillState.enemyAttackMultiplier:1;
  const weakened=Math.max(.1,Number(skillState.enemyNextAttackMultiplier)||1);
  skillState.enemyNextAttackMultiplier=1;
  let dmg=Math.max(1,Math.round((currentEnemy.attackNow*attackDebuff-(stats.defense*.55))*(.85+Math.random()*.25)*multiplier*weakened));
  if(crit) dmg=Math.round(dmg*1.5);
  if(skillState.heroGuardTurns>0) dmg=Math.max(1,Math.round(dmg*Math.max(.1,Number(skillState.heroGuardMultiplier)||1)));
  if(Number(skillState.heroNextDamageMultiplier||1)<1){
    dmg=Math.max(1,Math.round(dmg*skillState.heroNextDamageMultiplier));
    skillState.heroNextDamageMultiplier=1;
  }
  currentRun.hp=Math.max(0,currentRun.hp-dmg);
  setHeroFrame(heroHurtFrame());addHeroVisualClass("hurt-pop");
  showFloat(`-${dmg}`,"damage","peep");renderPeepHp();
  if(lifeDrainHeal>0 && currentEnemy.hpNow>0){
    const before=currentEnemy.hpNow;
    currentEnemy.hpNow=Math.min(currentEnemy.maxHp,currentEnemy.hpNow+Math.max(1,Math.round(dmg*lifeDrainHeal)));
    const healed=currentEnemy.hpNow-before;
    if(healed>0){showFloat(`+${healed}`,"heal","enemy");renderEnemyHp();}
  }
  await sleep(420);removeHeroVisualClass("hurt-pop");ui.enemySprite.classList.remove("attack-pop");
  restoreHeroIdleFrame();
  if(currentRun.hp<=0) endRun(false);
  else if(!label) setMessage(crit?`${currentEnemy.name} landed a critical hit!`:`${heroDisplayName()} is ready!`);
  return dmg;
}

async function enemyTurn() {
  if(!currentEnemy || currentEnemy.hpNow<=0) return;

  if(skillState.enemyStunned){
    skillState.enemyStunned=false;
    setMessage(`${currentEnemy.name} is stunned and couldn't move!`);
    await sleep(650);
    tickEnemyBuddyEffects();
    setMessage(`${heroDisplayName()} is ready!`);
    return;
  }

  const finishEnemyBuddyTurn=()=>tickEnemyBuddyEffects();

  // Generic healer variants: Blue Seagull, Green Slime, Orange Flower, etc.
  const canSelfHeal=currentEnemy.healPercent>0 && currentEnemy.hpNow<currentEnemy.maxHp &&
    Number(currentEnemy.healsUsed||0)<Number(currentEnemy.maxHeals||0) &&
    currentEnemy.hpNow<=currentEnemy.maxHp*.72 && Math.random()<Number(currentEnemy.healChance||0);
  if(canSelfHeal){
    const amount=Math.max(1,Math.round(currentEnemy.maxHp*currentEnemy.healPercent));
    const before=currentEnemy.hpNow; currentEnemy.hpNow=Math.min(currentEnemy.maxHp,currentEnemy.hpNow+amount); currentEnemy.healsUsed++;
    const gained=currentEnemy.hpNow-before; setMessage(`${currentEnemy.name} used ${currentEnemy.healMoveName||"Recovery!"}`);
    ui.enemySprite.classList.add("attack-pop");showFloat(`+${gained}`,"heal","enemy");renderEnemyHp();await sleep(650);
    ui.enemySprite.classList.remove("attack-pop");finishEnemyBuddyTurn();setMessage(`${heroDisplayName()} is ready!`);return;
  }

  // Pink Sea Turtle: protects itself from the next two player attacks.
  if(currentEnemy.specialType==="harden-shell" && !currentEnemy.shellHitsRemaining &&
     currentEnemy.specialUses<currentEnemy.maxSpecialUses && Math.random()<currentEnemy.specialChance){
    currentEnemy.specialUses++;currentEnemy.shellHitsRemaining=2;
    setMessage(`${currentEnemy.name} used Harden Shell! The next 2 hits deal 25% less damage.`);
    ui.enemySprite.classList.add("attack-pop");await sleep(650);ui.enemySprite.classList.remove("attack-pop");finishEnemyBuddyTurn();return;
  }

  // Orange Cat-Fish: spends a turn powering up its next attack.
  if(currentEnemy.specialType==="zoomies" && !currentEnemy.zoomiesBoost &&
     currentEnemy.specialUses<currentEnemy.maxSpecialUses && Math.random()<currentEnemy.specialChance){
    currentEnemy.specialUses++;currentEnemy.zoomiesBoost=true;
    setMessage(`${currentEnemy.name} used Zoomies! Its next attack is powered up by 25%.`);
    ui.enemySprite.classList.add("attack-pop");await sleep(650);ui.enemySprite.classList.remove("attack-pop");finishEnemyBuddyTurn();return;
  }

  // Every Vampire Squid can use Life Drain twice per battle.
  if(currentEnemy.lifeDrain && currentEnemy.hpNow<currentEnemy.maxHp &&
     currentEnemy.lifeDrainsUsed<currentEnemy.maxLifeDrains && Math.random()<currentEnemy.lifeDrainChance){
    currentEnemy.lifeDrainsUsed++;
    await performEnemyAttack(currentEnemy.lifeDrainDamage,`${currentEnemy.name} used Life Drain!`,currentEnemy.lifeDrainHeal);
    finishEnemyBuddyTurn();
    if(currentRun.hp>0) setMessage(`Life Drain stole some of ${heroDisplayName()}'s HP!`);
    return;
  }

  const boosted=Boolean(currentEnemy.zoomiesBoost);
  if(boosted) currentEnemy.zoomiesBoost=false;
  await performEnemyAttack(boosted?1.25:1,boosted?`${currentEnemy.name}'s Zoomies-powered attack!`:"");
  finishEnemyBuddyTurn();
  if(currentRun.hp>0) setMessage(`${heroDisplayName()} is ready!`);
}

async function quickHealTurn() {
  if(actionLocked || !currentEnemy || !currentRun) return;

  if(quickHealUses >= QUICK_HEAL_MAX_USES){
    setMessage("No Quick Heals left this battle!");
    renderCommandButtons();
    return;
  }

  if(currentRun.hp >= currentRun.maxHp){
    setMessage(`${heroDisplayName()} is already at full health!`);
    renderCommandButtons();
    return;
  }

  actionLocked=true;
  quickHealUses++;

  const amount=Math.max(1,Math.round(currentRun.maxHp*QUICK_HEAL_PERCENT));
  const before=currentRun.hp;
  currentRun.hp=Math.min(currentRun.maxHp,currentRun.hp+amount);
  const healed=currentRun.hp-before;

  setMessage(`Quick Heal! ${heroDisplayName()} restored ${healed} HP.`);
  showFloat(`+${healed}`,"heal","peep");
  renderPeepHp();
  renderCommandButtons();
  await sleep(500);

  decrementCooldowns("quick-heal");
  await enemyTurn();

  actionLocked=false;
  renderCommandButtons();
  renderSkills();
}

function buddyPonCatchRate(pon, enemy) {
  if(!pon || !enemy) return 0;
  if(enemy.shiny) return 1;
  if(enemy.boss) return Math.max(0,Math.min(1,Number(pon.bossRate)||0));
  return Math.max(0,Math.min(1,Number(pon.normalRate)||0));
}

function hasCompatibleBuddyPon(enemy) {
  return BUDDY_PONS.some(pon=>hubInventoryQty(pon.id)>0 && buddyPonCatchRate(pon,enemy)>0);
}

function renderPonPurchaseChoices() {
  if(!ui.ponPurchaseChoices) return;
  ui.ponPurchaseChoices.innerHTML="";
  if(ui.ponPurchaseCoins) ui.ponPurchaseCoins.textContent=`${Math.max(0,Number(hubSave.coins)||0).toLocaleString()} Pink Coins`;
  BUDDY_PONS.forEach(pon=>{
    const button=document.createElement("button");
    button.type="button";
    button.className=`pon-purchase-option${pon.className?` ${pon.className}`:""}`;
    const price=Math.max(0,Number(pon.price)||0);
    button.disabled=befriendAttempted || actionLocked || Number(hubSave.coins)<price;
    button.innerHTML=`<img src="${pon.image}" alt=""><span><strong>${pon.name}</strong><small>${price} Pink Coins</small></span>`;
    button.addEventListener("click",()=>purchaseBuddyPon(pon.id));
    ui.ponPurchaseChoices.appendChild(button);
  });
  if(ui.purchasePonButton) ui.purchasePonButton.disabled=befriendAttempted || actionLocked;
}

function togglePonPurchasePanel() {
  if(!ui.ponPurchasePanel || befriendAttempted || actionLocked) return;
  const willOpen=ui.ponPurchasePanel.classList.contains("hidden");
  ui.ponPurchasePanel.classList.toggle("hidden",!willOpen);
  if(willOpen) {
    if(ui.ponPurchaseMessage) ui.ponPurchaseMessage.textContent="Buy a Buddy Pon without leaving this encounter.";
    renderPonPurchaseChoices();
  }
}

function purchaseBuddyPon(ponId) {
  if(actionLocked || befriendAttempted || !pendingDefeatedEnemy) return;
  const pon=BUDDY_PONS.find(item=>item.id===ponId);
  if(!pon) return;
  const price=Math.max(0,Number(pon.price)||0);
  const coins=Math.max(0,Number(hubSave.coins)||0);
  if(coins<price) {
    if(ui.ponPurchaseMessage) ui.ponPurchaseMessage.textContent=`You need ${price-coins} more Pink Coins for a ${pon.name}.`;
    renderPonPurchaseChoices();
    return;
  }
  hubSave.coins=coins-price;
  if(!hubSave.inventory || typeof hubSave.inventory!=="object") hubSave.inventory={};
  hubSave.inventory[pon.id]=hubInventoryQty(pon.id)+1;
  persistAll();
  renderMeta();
  renderBefriendChoices();
  if(ui.ponPurchaseMessage) ui.ponPurchaseMessage.textContent=`Purchased 1 ${pon.name}! You can use it right now. ♡`;
  renderPonPurchaseChoices();
}

function renderBefriendChoices() {
  if(!ui.befriendPonChoices || !pendingDefeatedEnemy) return;
  ui.befriendPonChoices.innerHTML="";
  BUDDY_PONS.forEach(pon=>{
    const qty=hubInventoryQty(pon.id);
    const rate=buddyPonCatchRate(pon,pendingDefeatedEnemy);
    const button=document.createElement("button");
    button.type="button";
    button.className=`befriend-pon-button${pon.className?` ${pon.className}`:""}`;
    button.disabled=befriendAttempted || qty<=0 || rate<=0 || actionLocked;
    const rateLabel=rate>0?`${Math.round(rate*100)}% chance`:"Normal enemies only";
    button.innerHTML=`<img src="${pon.image}" alt=""><strong>${pon.name}</strong><small>×${qty} · ${rateLabel}</small>`;
    button.addEventListener("click",()=>attemptBefriend(pon.id));
    ui.befriendPonChoices.appendChild(button);
  });
  renderPonPurchaseChoices();
}

function showBefriendPanel(enemy) {
  pendingDefeatedEnemy=enemy;
  befriendAttempted=false;
  const owned=buddyOwnedQuantity(buddyKeyForEnemy(enemy));
  ui.befriendTitle.textContent=`Befriend ${enemy.name}${enemy.shiny?" ✨":""}?`;
  const hasPon=hasCompatibleBuddyPon(enemy);
  if(enemy.shiny) {
    ui.befriendText.textContent=`Shiny Buddy! Any Buddy Pon is a guaranteed catch. Owned so far: ×${owned}.${hasPon?"":" No Pon? Purchase one below before continuing!"}`;
  } else if(enemy.boss) {
    ui.befriendText.textContent=`Boss Buddies are tougher to befriend. Owned so far: ×${owned}.${hasPon?"":" You can purchase a compatible Pon below."}`;
  } else {
    ui.befriendText.textContent=`Choose one Buddy Pon for a chance to befriend it. Owned so far: ×${owned}.${hasPon?"":" You can purchase one below."}`;
  }
  ui.skipBefriend.textContent="Continue to Chest";
  if(ui.purchasePonButton) {
    ui.purchasePonButton.disabled=false;
    ui.purchasePonButton.textContent="Purchase Pon";
  }
  ui.ponPurchasePanel?.classList.add("hidden");
  if(ui.ponPurchaseMessage) ui.ponPurchaseMessage.textContent="Buy a Buddy Pon without leaving this encounter.";
  ui.befriendPanel.classList.remove("hidden");
  renderBefriendChoices();
}

function animateBuddyPon(pon) {
  const img=document.createElement("img");
  img.src=pon.image;
  img.alt="";
  img.className="capture-pon-fly";
  ui.battlefield.appendChild(img);
  setTimeout(()=>img.remove(),820);
}

async function attemptBefriend(ponId) {
  if(actionLocked || befriendAttempted || !pendingDefeatedEnemy) return;
  const pon=BUDDY_PONS.find(item=>item.id===ponId);
  if(!pon) return;
  const rate=buddyPonCatchRate(pon,pendingDefeatedEnemy);
  if(rate<=0 || hubInventoryQty(pon.id)<=0) return;
  if(!consumeHubItem(pon.id,1)) return;

  actionLocked=true;
  befriendAttempted=true;
  renderBefriendChoices();
  setMessage(`${heroDisplayName()} used a ${pon.name}!`);
  animateBuddyPon(pon);
  await sleep(760);

  const success=rate>=1 || Math.random()<rate;
  if(success) {
    const buddy=captureBuddy(pendingDefeatedEnemy);
    renderEnemyName(pendingDefeatedEnemy);
    ui.befriendTitle.textContent=`${pendingDefeatedEnemy.name}${pendingDefeatedEnemy.shiny?" ✨":""} became your Buddy!`;
    ui.befriendText.textContent=`Befriended! You now own ×${buddy.quantity}.`;
    setMessage(`${pendingDefeatedEnemy.name}${pendingDefeatedEnemy.shiny?" ✨":""} became your Buddy!`);
    renderBuddyHomeCount();
  } else {
    ui.befriendTitle.textContent=`Almost! ${pendingDefeatedEnemy.name} slipped away.`;
    ui.befriendText.textContent="That Buddy Pon was used up. You can try again next time you meet this Buddy!";
    setMessage(`${pendingDefeatedEnemy.name} slipped away this time!`);
  }
  ui.skipBefriend.textContent="Continue to Chest";
  ui.ponPurchasePanel?.classList.add("hidden");
  if(ui.purchasePonButton) ui.purchasePonButton.disabled=true;
  actionLocked=false;
  renderBefriendChoices();
}

async function finishBefriendStep() {
  if(actionLocked || !pendingChest) return;
  actionLocked=true;
  ui.befriendPanel?.classList.add("hidden");
  ui.ponPurchasePanel?.classList.add("hidden");
  ui.enemyCombatant.classList.add("hidden");
  await sleep(220);
  pendingDefeatedEnemy=null;
  befriendAttempted=false;
  actionLocked=false;
  showChest(pendingChest);
}

async function enemyDefeated() {
  clearInterval(idleTimer);
  const defeated={...currentEnemy};
  currentEnemy=null;
  ui.buddyCombatant?.classList.add("hidden");
  ui.commandGrid.classList.add("hidden");
  closeCommandWindow();
  setMessage(`${defeated.name}${defeated.shiny?" ✨":""} was defeated!`);

  await sleep(350);

  const isBoss=Boolean(defeated.boss);
  pendingChest={
    kind:isBoss?"boss":"normal",
    revealMimic:false,
    enemy:defeated
  };

  // Pause before the victory chest so the player gets one Buddy Pon attempt.
  actionLocked=false;
  showBefriendPanel(defeated);
}

function showChest(data) {
  pendingChest=data;
  ui.buddyCombatant?.classList.add("hidden");
  ui.chestSprite.src=data.mystery
    ? "assets/shinies/amethyst-mimic-closed.png"
    : "assets/items/chests/treasure/closed.webp";
  ui.chestSprite.classList.remove("opening","mystery-chest-sprite");
  ui.chestSprite.classList.toggle("mystery-chest-sprite",Boolean(data.mystery));
  ui.openChest.classList.remove("hidden");
  ui.openChest.disabled=false;
  ui.chestLayer.classList.remove("hidden");
  ui.chestCaption.textContent=data.mystery
    ? "A strange purple chest appeared..."
    :data.kind==="rare"
      ?"A rare treasure chest appeared!"
      :data.revealMimic
        ?"A treasure chest appeared!"
        :"Victory chest!";
}

function addRewardItem(items,item,qty=1){
  if(!item) return;
  const existing=items.find(x=>x.id===item.id);
  if(existing) existing.qty+=qty;
  else items.push({...item,qty});
}

function jackpotItem(){
  const pool=REWARD_ITEMS.filter(item=>!["buddy-pon","super-buddy-pon","boss-buddy-pon"].includes(item.id));
  const weighted=pool.map(item=>({item,weight:Math.max(1,16-Math.min(15,Number(item.weight)||1))}));
  const total=weighted.reduce((sum,x)=>sum+x.weight,0);
  let roll=Math.random()*total;
  for(const entry of weighted){ roll-=entry.weight; if(roll<=0) return entry.item; }
  return pool[0];
}

function markEndlessFloorComplete(){
  if(currentRun?.mode!=="endless") return;
  const progress=endlessProgress();
  const completed=Math.max(1,Math.floor(Number(currentRun.floor)||1));
  progress.record=Math.max(progress.record,completed);
  progress.checkpoint=completed+1;
  persistAll();
  renderMeta();
}

async function openPendingChest() {
  if(!pendingChest || ui.chestLayer.classList.contains("hidden")) return;
  if(ui.openChest.disabled) return;
  actionLocked=true;
  ui.openChest.disabled=true;
  ui.chestSprite.classList.add("opening");
  await sleep(260);

  if(pendingChest.mystery){
    ui.chestSprite.src="assets/shinies/amethyst-mimic-open.png";
    await sleep(180);
    const isAmethystMimic=Math.random()<.50;
    if(isAmethystMimic){
      ui.chestCaption.textContent="Oh no... it moved!";
      setMessage("The purple chest was an Amethyst Mimic ✨!");
      await sleep(420);
      ui.chestLayer.classList.add("hidden");
      actionLocked=false;
      startEnemy("mimic",{forceShiny:true});
      return;
    }
    pendingChest={kind:"hidden-treasure",hiddenTreasure:true,revealMimic:false};
    ui.chestCaption.textContent="Hidden Treasure! JACKPOT!";
    setMessage("Hidden Treasure! You found a huge jackpot!");
  } else if(pendingChest.revealMimic) {
    ui.chestSprite.src="assets/items/chests/treasure/open.webp";
    await sleep(140);
    ui.chestLayer.classList.add("hidden");
    actionLocked=false;
    startEnemy("mimic");
    return;
  } else {
    ui.chestSprite.src="assets/items/chests/treasure/open.webp";
  }

  const rewards=generateRewards(pendingChest);
  applyRewards(rewards);

  const textParts=[];
  if(rewards.coins) textParts.push(`+${rewards.coins} Pink Coins`);
  if(rewards.exp) textParts.push(`+${rewards.exp} EXP`);
  if(rewards.unlockedBackgrounds?.length) textParts.push(rewards.unlockedBackgrounds.map(bg=>`${bg.label} Icon`).join(", "));
  if(rewards.items.length) textParts.push(rewards.items.map(x=>`${x.name} ×${x.qty}`).join(", "));

  ui.chestCaption.textContent=pendingChest.hiddenTreasure
    ? `JACKPOT! · ${textParts.join(" · ")}`
    : textParts.join(" · ");
  ui.openChest.classList.add("hidden");
  if(!pendingChest.hiddenTreasure) setMessage("Treasure collected!");

  // Fully recover between encounters so every new fight begins at max HP.
  currentRun.hp=currentRun.maxHp;
  renderPeepHp();
  markEndlessFloorComplete();

  await sleep(350);
  ui.continueButton.textContent=currentRun?.mode==="endless"?"Next Floor":"Continue";
  ui.postFloorActions?.classList.remove("hidden");
  ui.leaveEndlessButton?.classList.toggle("hidden",currentRun?.mode!=="endless");
  actionLocked=false;
}

function generateRewards(chest) {
  const rank=currentRun.rank;
  let coins=0, exp=0, itemRolls=0, itemChance=0;
  const items=[];

  if(chest.kind==="hidden-treasure") {
    coins=randInt(300,500);
    exp=randInt(180,300);
    // The jackpot always includes a basic Buddy Pon, strongly favors a Super,
    // can include a Boss Pon, and rolls three extra rare-leaning items.
    addRewardItem(items,REWARD_ITEMS.find(x=>x.id==="buddy-pon"),1);
    if(Math.random()<.70) addRewardItem(items,REWARD_ITEMS.find(x=>x.id==="super-buddy-pon"),1);
    if(Math.random()<.30) addRewardItem(items,REWARD_ITEMS.find(x=>x.id==="boss-buddy-pon"),1);
    for(let i=0;i<3;i++) addRewardItem(items,jackpotItem(),1);
    return {coins,exp,items,iconBackground:pickChestIconBackground({kind:"rare"})};
  }

  if(chest.kind==="rare") {
    coins=randInt(28,45)+rank*2;
    exp=randInt(8,14)+rank;
    itemRolls=1;
    itemChance=1;
  } else if(chest.kind==="boss") {
    coins=randInt(chest.enemy.coinMinNow,chest.enemy.coinMaxNow)+12;
    exp=chest.enemy.expNow;
    itemRolls=2;
    itemChance=1;
  } else {
    coins=randInt(chest.enemy.coinMinNow,chest.enemy.coinMaxNow);
    exp=chest.enemy.expNow;
    itemRolls=1;
    itemChance=0.38;
  }

  if(chest.enemy?.id==="mimic") {
    coins+=randInt(20,32);
    itemRolls=1;
    itemChance=1;
  }

  for(let i=0;i<itemRolls;i++) {
    if(Math.random()<=itemChance) {
      let item=weightedItem();
      if(chest.kind==="boss" && items.some(x=>x.id===item.id)) {
        for(let retry=0; retry<5 && items.some(x=>x.id===item.id); retry++) item=weightedItem();
      }
      addRewardItem(items,item,1);
    }
  }

  const iconBackground=pickChestIconBackground(chest);
  return {coins,exp,items,iconBackground};
}

function weightedItem() {
  const total=REWARD_ITEMS.reduce((s,x)=>s+x.weight,0);
  let roll=Math.random()*total;
  for(const item of REWARD_ITEMS) {
    roll-=item.weight;
    if(roll<=0) return item;
  }
  return REWARD_ITEMS[0];
}

function applyRewards(rewards) {
  hubSave.coins=Math.max(0,Number(hubSave.coins)||0)+rewards.coins;
  if(!hubSave.stats || typeof hubSave.stats!=="object") hubSave.stats={};
  hubSave.stats.coinsEarnedTotal=Math.max(0,Number(hubSave.stats.coinsEarnedTotal)||0)+Math.max(0,Number(rewards.coins)||0);
  currentRun.coinsEarned+=rewards.coins;
  questSave.totalCoinsEarned=(Number(questSave.totalCoinsEarned)||0)+rewards.coins;

  const chestBackground=rewards.iconBackground ? unlockIconBackground(rewards.iconBackground.id) : null;

  const levelResult=grantExp(rewards.exp);
  const levelBackgrounds=unlockLevelIconBackgrounds(levelResult);
  rewards.unlockedBackgrounds=[...(chestBackground?[chestBackground]:[]),...levelBackgrounds];

  currentRun.expEarned+=rewards.exp;
  questSave.totalExpEarned=(Number(questSave.totalExpEarned)||0)+rewards.exp;
  if(levelResult.length) currentRun.levelsGained.push(...levelResult);
  if(chestBackground) currentRun.iconBackgroundsEarned.push(chestBackground);
  if(levelBackgrounds.length){
    currentRun.iconBackgroundsEarned.push(...levelBackgrounds);
    currentRun.levelBackgroundsEarned.push(...levelBackgrounds);
  }

  if(!hubSave.inventory || typeof hubSave.inventory!=="object") hubSave.inventory={};
  rewards.items.forEach(item=>{
    hubSave.inventory[item.id]=Math.max(0,Number(hubSave.inventory[item.id])||0)+item.qty;
    const existing=currentRun.itemsEarned.find(x=>x.id===item.id);
    if(existing) existing.qty+=item.qty;
    else currentRun.itemsEarned.push({...item});
  });

  questSave.totalBattlesWon=(Number(questSave.totalBattlesWon)||0)+(pendingChest?.enemy?1:0);
  persistAll();
  renderMeta();
  renderBattleItems();
}

function grantExp(amount) {
  const gained=[];
  const hero=activeHeroProgress();
  if(hero.level>=MAX_LEVEL) return gained;
  hero.exp+=Math.max(0,Number(amount)||0);
  while(hero.level<MAX_LEVEL) {
    const need=expNeeded(hero.level);
    if(hero.exp<need) break;
    hero.exp-=need;
    hero.level++;
    gained.push(hero.level);
    if(hero.level>=MAX_LEVEL) {
      hero.exp=0;
      break;
    }
  }
  return gained;
}

function nextEncounter() {
  ui.chestLayer.classList.add("hidden");
  ui.postFloorActions?.classList.add("hidden");
  if(currentRun?.mode==="endless"){
    const nextFloor=endlessProgress().checkpoint;
    currentRun.floor=Math.max(1,nextFloor);
    currentRun.rank=endlessEffectiveRank(currentRun.floor);
    currentRun.floorBackground=chooseEndlessBackground(currentRun.floorBackground);
    currentRun.endlessEncounter=makeEndlessEncounter(currentRun.floor);
    startEncounter();
    return;
  }

  currentRun.index++;
  if(currentRun.index>=4) {
    endRun(true);
    return;
  }
  startEncounter();
}

function leaveEndlessAfterFloor(){
  if(currentRun?.mode!=="endless") return;
  endlessExitReason="paused";
  endRun(false);
}

function endRun(won) {
  clearAnimations();
  if(currentRun?.mode==="endless"){
    if(!endlessExitReason) endlessExitReason="defeated";
    // The checkpoint is updated only when a floor is completed. If the hero
    // falls or leaves mid-floor, the same floor is waiting next time.
    persistAll();
    renderMeta();
    renderResult(false);
    showScreen("result");
    return;
  }

  if(won){
    currentRun.bossWon=true; questSave.completedRuns=(Number(questSave.completedRuns)||0)+1; questSave.bossWins=(Number(questSave.bossWins)||0)+1;
    if(!hubSave.characterProgress[activeCharacterId]) hubSave.characterProgress[activeCharacterId]={happinessTotal:0};
    hubSave.characterProgress[activeCharacterId].happinessTotal=Math.max(0,Number(hubSave.characterProgress[activeCharacterId].happinessTotal)||0)+2;
    const progress=areaProgress(currentRun.area); const maxRank=getAreaConfig(currentRun.area).maxRank;
    if(currentRun.rank===progress.unlockedRank && progress.unlockedRank<maxRank) progress.unlockedRank++;
  }
  persistAll(); renderMeta(); renderResult(won); showScreen("result");
}

function renderResult(won) {
  const isEndless=currentRun?.mode==="endless";

  if(isEndless){
    const progress=endlessProgress();
    const paused=endlessExitReason==="paused";
    ui.resultKicker.textContent=paused?"ENDLESS RUN PAUSED!":"ENDLESS RUN ENDED";
    ui.resultTitle.textContent=paused
      ? `Checkpoint saved at Floor ${progress.checkpoint}!`
      : `${heroDisplayName()} made it to Floor ${Math.max(1,currentRun.floor)}!`;
    if(ui.resultProgressLabel) ui.resultProgressLabel.textContent="Record";
    ui.resultRank.textContent=`Floor ${progress.record}`;
    ui.runNextRank.classList.add("hidden");
    ui.runNextRank.disabled=true;
    const runAgain=document.querySelector("#runAgain");
    if(runAgain) runAgain.textContent=`Continue Floor ${progress.checkpoint}`;
  } else {
    const areaId=currentRun?.area||selectedArea; const cfg=getAreaConfig(areaId); const progress=areaProgress(areaId);
    ui.resultKicker.textContent=won?"RUN COMPLETE!":"RUN ENDED";
    ui.resultTitle.textContent=won?cfg.resultTitle:`${heroDisplayName()} needs a little rest.`;
    const finishedRank=Math.max(1,Number(currentRun?.rank||selectedRank)||1);
    const nextRank=Math.min(cfg.maxRank,finishedRank+1);
    const canRunNext=Boolean(won)&&nextRank>finishedRank&&nextRank<=progress.unlockedRank;
    ui.runNextRank.classList.toggle("hidden",!won);
    ui.runNextRank.disabled=Boolean(won)&&!canRunNext;
    ui.runNextRank.textContent=canRunNext?`Run ${cfg.name} Rank ${nextRank}`:"Max Rank Reached";
    ui.runNextRank.dataset.rank=canRunNext?String(nextRank):"";
    ui.runNextRank.dataset.area=areaId;
    if(ui.resultProgressLabel) ui.resultProgressLabel.textContent="Rank";
    ui.resultRank.textContent=`${cfg.name} ${finishedRank}`;
    const runAgain=document.querySelector("#runAgain");
    if(runAgain) runAgain.textContent="Run Again";
  }

  ui.resultCoins.textContent=currentRun?.coinsEarned||0;
  ui.resultExp.textContent=currentRun?.expEarned||0;
  ui.resultItems.innerHTML="";
  (currentRun?.itemsEarned||[]).forEach(item=>{
    const el=document.createElement("div");
    el.className="result-item";
    el.innerHTML=`<img src="${item.image}" alt=""><span>${item.name} ×${item.qty}</span>`;
    ui.resultItems.appendChild(el);
  });
  (currentRun?.iconBackgroundsEarned||[]).forEach(bg=>{
    const el=document.createElement("div");el.className="result-item";
    const swatch=document.createElement("span");swatch.className="result-icon-bg-swatch";applyIconBackgroundStyle(swatch,bg);
    const label=document.createElement("span");label.textContent=`${bg.label} Icon Background`;
    el.append(swatch,label);ui.resultItems.appendChild(el);
  });
  if(!(currentRun?.itemsEarned||[]).length && !(currentRun?.iconBackgroundsEarned||[]).length){
    const el=document.createElement("div");el.className="result-item";el.textContent="No item drops this time — try another run!";ui.resultItems.appendChild(el);
  }
  const levels=[...new Set(currentRun?.levelsGained||[])];
  if(levels.length){
    ui.levelUpNotice.classList.remove("hidden");
    const unlocked=activeSkills().filter(s=>levels.includes(s.unlock)).map(skillDisplayName);
    const levelBgs=[...new Map((currentRun?.levelBackgroundsEarned||[]).map(bg=>[bg.id,bg])).values()];
    const extras=[];
    if(unlocked.length) extras.push(`New skill unlocked: ${unlocked.join(", ")}`);
    if(levelBgs.length) extras.push(`New Icon Background: ${levelBgs.map(bg=>bg.label).join(", ")}`);
    ui.levelUpNotice.textContent=`Level up! ${heroDisplayName()} reached Lv. ${activeHeroProgress().level}.${extras.length?` ${extras.join(" · ")}`:""}`;
  } else ui.levelUpNotice.classList.add("hidden");
}

function pickThrowDuck() {
  const unlocked=Array.isArray(hubSave.unlockedDucks)?hubSave.unlockedDucks:[];
  const normalize=v=>String(v||"").toLowerCase().replace(/\.[^.]+$/,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  const unlockedIds=new Set(unlocked.map(normalize));
  const pool=DUCK_LIBRARY.filter(d=>unlockedIds.has(normalize(d.id)));
  const candidates=pool.length?pool:DUCK_LIBRARY.filter(d=>normalize(d.id)==="standard-duck");
  return candidates[randInt(0,candidates.length-1)] || DUCK_LIBRARY[0];
}

function showThrownDuck(duck) {
  const img=document.createElement("img");
  img.src=`../assets/ducks/${duck.file}`;
  img.alt="";
  img.style.cssText="position:absolute;z-index:20;width:36px;height:36px;object-fit:contain;image-rendering:pixelated;left:30%;top:64%;transition:transform .45s linear,left .45s linear,top .45s linear;pointer-events:none;";
  document.querySelector("#battlefield").appendChild(img);
  requestAnimationFrame(()=>{
    img.style.left="69%";
    img.style.top="56%";
    img.style.transform="rotate(360deg)";
  });
  setTimeout(()=>img.remove(),650);
}

function showFloat(text,type="damage",target="enemy") {
  const el = target === "peep" ? ui.peepDamageText : ui.enemyDamageText;
  if (!el) return;

  el.textContent = text;
  el.classList.remove("hidden","damage-show","heal-pop");
  if (type === "heal") el.classList.add("heal-pop");

  // Restart the tiny pop animation even on repeated -1 hits.
  void el.offsetWidth;
  el.classList.add("damage-show");

  setTimeout(() => {
    el.classList.remove("damage-show","heal-pop");
    el.classList.add("hidden");
  }, 520);
}

function setMessage(text) { ui.battleMessage.textContent=text; }

function returnHome() {
  clearAnimations(); closeBuddyDetail(); currentRun=null;
  selectedArea=AREA_CONFIG[activeHeroProgress().lastArea]?activeHeroProgress().lastArea:"meadow";
  selectedRank=areaProgress(selectedArea).lastRank||1;
  showScreen("home"); renderMeta();
}

document.querySelector("#backGames").addEventListener("click",()=>window.location.href="../#games");
ui.openBuddyCollection?.addEventListener("click",()=>{ closeBuddyDetail(); setBuddyScreenUrl(true); showScreen("buddy"); });
ui.backFromBuddies?.addEventListener("click",()=>{ closeBuddyDetail(); setBuddyScreenUrl(false); showScreen("home"); renderMeta(); });
ui.buddyFilters.forEach(button=>button.addEventListener("click",()=>{
  buddyCollectionFilter=button.dataset.buddyFilter || "all";
  renderBuddyCollection();
}));
ui.closeBuddyDetail?.addEventListener("click",closeBuddyDetail);
ui.buddyDetail?.addEventListener("click",event=>{ if(event.target===ui.buddyDetail) closeBuddyDetail(); });
ui.runNextRank.addEventListener("click",()=>{
  const areaId=AREA_CONFIG[ui.runNextRank.dataset.area]?ui.runNextRank.dataset.area:selectedArea;
  const nextRank=Math.max(1,Number(ui.runNextRank.dataset.rank)||0);
  const progress=areaProgress(areaId),maxRank=getAreaConfig(areaId).maxRank;
  if(!nextRank||nextRank>progress.unlockedRank||nextRank>maxRank)return;
  selectedArea=areaId;selectedRank=nextRank;beginRun();
});
document.querySelector("#rankDown").addEventListener("click",()=>{selectedRank=Math.max(1,selectedRank-1);renderMeta();});
document.querySelector("#rankUp").addEventListener("click",()=>{selectedRank=Math.min(areaProgress(selectedArea).unlockedRank,selectedRank+1);renderMeta();});
ui.areaButtons.forEach(btn=>btn.addEventListener("click",()=>{
  const areaId=btn.dataset.area;if(!AREA_CONFIG[areaId])return;
  selectedArea=areaId;activeHeroProgress().lastArea=areaId;selectedRank=areaProgress(areaId).lastRank||1;persistAll();renderMeta();
}));
document.querySelector("#startRun").addEventListener("click",beginRun);
ui.continueEndless?.addEventListener("click",()=>beginEndlessRun(endlessProgress().checkpoint));
ui.startNewEndless?.addEventListener("click",()=>{
  const progress=endlessProgress();
  if(progress.checkpoint>1){
    const okay=window.confirm(`Start a new Endless Run from Floor 1?\n\nYour current Floor ${progress.checkpoint} checkpoint will reset, but your Floor ${progress.record} record will NOT be erased.`);
    if(!okay) return;
  }
  progress.checkpoint=1;
  persistAll();
  beginEndlessRun(1);
});
ui.buddyMenuButton?.addEventListener("click",()=>openCommandWindow("buddy"));
ui.attackMenuButton.addEventListener("click",()=>openCommandWindow("attack"));
ui.itemMenuButton.addEventListener("click",()=>openCommandWindow("item"));
ui.closeCommandWindow.addEventListener("click",closeCommandWindow);
ui.escapeButton.addEventListener("click",()=>{
  closeCommandWindow();
  openEscapeConfirm();
});
document.querySelector("#openChest").addEventListener("click",openPendingChest);
ui.skipBefriend?.addEventListener("click",finishBefriendStep);
ui.purchasePonButton?.addEventListener("click",togglePonPurchasePanel);
document.querySelector("#continueButton").addEventListener("click",nextEncounter);
ui.leaveEndlessButton?.addEventListener("click",leaveEndlessAfterFloor);
document.querySelector("#runAgain").addEventListener("click",()=>{
  if(currentRun?.mode==="endless"){ beginEndlessRun(endlessProgress().checkpoint); return; }
  selectedArea=currentRun?.area||selectedArea;selectedRank=currentRun?.rank||selectedRank;beginRun();
});
document.querySelector("#backToQuest").addEventListener("click",returnHome);
ui.cancelEscapeConfirm.addEventListener("click",closeEscapeConfirm);
ui.confirmEscapeButton.addEventListener("click",confirmEscapeRun);

ui.switchQuestOc?.addEventListener("click",switchQuestCharacter);
ui.iconBackgroundButton?.addEventListener("click",()=>{
  const opening=ui.iconBackgroundPicker.classList.contains("hidden");
  ui.iconBackgroundPicker.classList.toggle("hidden",!opening);
  ui.iconBackgroundButton.setAttribute("aria-expanded",String(opening));
});
syncPastLevelIconBackgrounds();
persistAll();
renderMeta();
renderMenuSkills();
const initialQuestScreen=new URLSearchParams(window.location.search).get("screen");
showScreen(initialQuestScreen==="buddies"?"buddy":"home");

// Menu idle bounce.
const menuPeep=document.querySelector("#menuPeep");
let menuFrame=0;
setInterval(()=>{
  if(ui.home.classList.contains("hidden")) return;
  if(activeCharacterId!=="peep"){
    const frames=heroIdleFrames();
    menuFrame=(menuFrame+1)%frames.length;
    renderHeroComposite(ui.menuHeroComposite,frames[menuFrame]);
    return;
  }
  menuFrame=(menuFrame+1)%PEepIdle.length;
  menuPeep.src=PEepIdle[menuFrame];
},560);
