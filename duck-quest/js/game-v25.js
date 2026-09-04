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



const DUCK_LIBRARY = [{"id": "standard-duck", "file": "Standard-duck.webp", "name": "Standard Duck"}, {"id": "pink-duck", "file": "Pink-duck.webp", "name": "Pink Duck"}, {"id": "rainbow-duck", "file": "Rainbow-duck.webp", "name": "Rainbow Duck"}];

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

function activeSkills(){ return activeCharacterId === "miko" ? MIKO_SKILLS : PEEP_SKILLS; }

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
  { id:"gold-heart-refill", name:"Gold Heart Refill", image:"../assets/bakery/drops/Gold-heart-refill.webp", weight:1 }
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

function heroIdleFrames(){ return activeCharacterId === "miko" ? MikoIdle : PEepIdle; }
function heroHurtFrame(){ return activeCharacterId === "miko" ? MikoIdle[0] : "assets/characters/peep/base/hurt.webp"; }

const ui = {
  home: document.querySelector("#homeScreen"),
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
  quickHealButton: document.querySelector("#quickHealButton"),
  quickHealUsesText: document.querySelector("#quickHealUsesText"),
  continueButton: document.querySelector("#continueButton"),
  escapeConfirm: document.querySelector("#escapeConfirm"),
  escapeConfirmText: document.querySelector("#escapeConfirmText"),
  cancelEscapeConfirm: document.querySelector("#cancelEscapeConfirm"),
  confirmEscapeButton: document.querySelector("#confirmEscapeButton"),
  runNextRank: document.querySelector("#runNextRank"),
  resultKicker: document.querySelector("#resultKicker"),
  resultTitle: document.querySelector("#resultTitle"),
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
  switchQuestOc: document.querySelector("#switchQuestOc")
};

let hubSave = loadHubSave();
let questSave = normalizeQuestSave(hubSave.duckQuest);

function activeCharacterIdFromHub(){
  const requested=String(hubSave.selectedCharacter||"peep");
  const unlocked=Array.isArray(hubSave.unlockedCharacters)?hubSave.unlockedCharacters:["peep"];
  return requested==="miko" && unlocked.includes("miko") ? "miko" : "peep";
}

let activeCharacterId = activeCharacterIdFromHub();

function heroDisplayName(){ return activeCharacterId==="miko" ? "Miko" : "Peep"; }

function defaultCharacterQuestProgress(){
  return {
    level:1,
    exp:0,
    iconBackground:"white",
    lastArea:"meadow",
    areas:{
      meadow:{unlockedRank:1,lastRank:1},
      ocean:{unlockedRank:1,lastRank:1}
    }
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
    }
  };
}

function defaultQuestSave() {
  return {
    peep:defaultCharacterQuestProgress(),
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
    iconBackgroundsUnlocked:[...new Set(["white",...(Array.isArray(q.iconBackgroundsUnlocked)?q.iconBackgroundsUnlocked:[])])]
      .filter(id=>ICON_BACKGROUND_COLORS.some(color=>color.id===id)),
    bossWins:Math.max(0,Number(q.bossWins ?? q.completedRuns)||0)
  };
  if(q.miko&&typeof q.miko==="object") normalized.miko=normalizeCharacterQuestProgress(q.miko);
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
const QUICK_HEAL_PERCENT = 0.25;
const QUICK_HEAL_MAX_USES = 4;
let quickHealUses = 0;
let skillState = {};

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
    if (!Array.isArray(parsed.unlockedCharacters)) parsed.unlockedCharacters=["peep"];
    if (!parsed.unlockedCharacters.includes("peep")) parsed.unlockedCharacters.unshift("peep");
    parsed.selectedCharacter = parsed.unlockedCharacters.includes(parsed.selectedCharacter) ? parsed.selectedCharacter : "peep";
    parsed.coins = Math.max(0, Number(parsed.coins) || 0);
    return parsed;
  } catch {
    return { coins:0, inventory:{}, unlockedDucks:[], unlockedCharacters:["peep"], selectedCharacter:"peep", characterProgress:{peep:{happinessTotal:0},miko:{happinessTotal:0}} };
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

function renderMikoComposite(container,src=MikoIdle[0]){
  if(!container) return;
  let img=container.querySelector("img");
  if(!img){
    container.innerHTML="";
    img=document.createElement("img");
    img.className="miko-quest-sprite pixel-sprite";
    img.alt="Miko";
    container.appendChild(img);
  }
  img.src=src;
}

function activeHeroVisual(){
  return activeCharacterId==="miko" ? ui.battleHeroComposite : ui.peepSprite;
}

function renderHeroVisuals(){
  const isMiko=activeCharacterId==="miko";
  ui.battlefield?.classList.toggle("miko-active",isMiko);
  const name=heroDisplayName();
  if(ui.heroNameHome) ui.heroNameHome.textContent=name;
  if(ui.heroNameCombat) ui.heroNameCombat.textContent=name;
  if(ui.exploreHeading) ui.exploreHeading.textContent=`Where should ${name} Explore?`;
  if(ui.skillsKicker) ui.skillsKicker.textContent=`${name.toUpperCase()}'S SKILLS`;

  ui.menuPeep?.classList.toggle("hidden",isMiko);
  ui.menuHeroComposite?.classList.toggle("hidden",!isMiko);
  ui.peepSprite?.classList.toggle("hidden",isMiko);
  ui.battleHeroComposite?.classList.toggle("hidden",!isMiko);
  ui.resultPeep?.classList.toggle("hidden",isMiko);
  ui.resultHeroComposite?.classList.toggle("hidden",!isMiko);

  if(isMiko){
    renderMikoComposite(ui.menuHeroComposite,MikoIdle[0]);
    renderMikoComposite(ui.battleHeroComposite,MikoIdle[0]);
    renderMikoComposite(ui.resultHeroComposite,MikoIdle[0]);
  }
}

function skillDisplayName(skill){ return skill.name; }

function skillDisplayDescription(skill){ return skill.description; }


function availableQuestCharacters(){
  const unlocked=Array.isArray(hubSave.unlockedCharacters)?hubSave.unlockedCharacters:["peep"];
  return ["peep","miko"].filter(id=>unlocked.includes(id));
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
  ui.switchQuestOc.textContent=`Switch to ${nextId==="miko"?"Miko":"Peep"}`;
}

function switchQuestCharacter(){
  if(currentRun) return;
  const available=availableQuestCharacters();
  if(available.length<2) return;
  const currentIndex=Math.max(0,available.indexOf(activeCharacterId));
  activeCharacterId=available[(currentIndex+1)%available.length];
  hubSave.selectedCharacter=activeCharacterId;
  const progress=activeHeroProgress();
  selectedArea=AREA_CONFIG[progress.lastArea]?progress.lastArea:"meadow";
  selectedRank=Math.min(areaProgress(selectedArea).unlockedRank,Math.max(1,areaProgress(selectedArea).lastRank||1));
  closeIconBackgroundPicker();
  persistAll();
  renderMeta();
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

function makeEncounterPlan(rank,areaId=selectedArea) {
  const encounters=[];
  if(areaId==="ocean"){
    const staged=["cool-seagull","sea-turtle","catfish"];
    staged.forEach(enemyId=>{
      const roll=Math.random();
      if(roll<.12) encounters.push({type:"rare-chest"});
      else if(roll<.20) encounters.push({type:"mimic"});
      else encounters.push({type:"enemy",enemyId});
    });
    encounters.push({type:"boss",enemyId:"vampire-squid"});
    return encounters;
  }
  const regular=shuffle(["cat-slime","bee","flower"]);
  for(let i=0;i<3;i++){
    const roll=Math.random();
    if(roll<.12) encounters.push({type:"rare-chest"});
    else if(roll<.20) encounters.push({type:"mimic"});
    else encounters.push({type:"enemy",enemyId:regular.shift()||["cat-slime","bee","flower"][randInt(0,2)]});
  }
  encounters.push({type:"boss",enemyId:"mushroom-cat"});
  return encounters;
}


function openEscapeConfirm() {
  if (!currentRun || actionLocked) return;
  ui.escapeConfirm.classList.remove("hidden");
  ui.escapeConfirm.setAttribute("aria-hidden", "false");
}

function closeEscapeConfirm() {
  ui.escapeConfirm.classList.add("hidden");
  ui.escapeConfirm.setAttribute("aria-hidden", "true");
}

function confirmEscapeRun() {
  closeEscapeConfirm();
  endRun(false);
}

function beginRun() {
  const stats=peepStats();
  const cfg=getAreaConfig(selectedArea);
  const progress=areaProgress(selectedArea);
  selectedRank=Math.min(Math.max(1,selectedRank),progress.unlockedRank);
  currentRun={
    area:selectedArea,rank:selectedRank,index:0,plan:makeEncounterPlan(selectedRank,selectedArea),
    hp:stats.maxHp,maxHp:stats.maxHp,coinsEarned:0,expEarned:0,itemsEarned:[],iconBackgroundsEarned:[],levelBackgroundsEarned:[],levelsGained:[],bossWon:false
  };
  progress.lastRank=selectedRank; activeHeroProgress().lastArea=selectedArea; persistAll();
  showScreen("battle"); startEncounter();
}

function showScreen(which) {
  ui.home.classList.toggle("hidden", which!=="home");
  ui.battle.classList.toggle("hidden", which!=="battle");
  ui.result.classList.toggle("hidden", which!=="result");
}

function startEncounter() {
  clearAnimations();
  actionLocked=false;
  pendingChest=null;
  quickHealUses=0;
  skillState={ cooldowns:{}, onceUsed:{}, attackBuffTurns:0, attackBuffMultiplier:1.30 };
  ui.chestLayer.classList.add("hidden");
  ui.continueButton.classList.add("hidden");
  ui.commandGrid.classList.remove("hidden");
  closeCommandWindow();
  ui.enemyCombatant.classList.remove("hidden");

  const encounter=currentRun.plan[currentRun.index];
  const cfg=currentAreaConfig();
  ui.battleBg.src=cfg.backgrounds[currentRun.index];
  ui.battlefield.classList.toggle("ocean-peep-raised", currentRun.area==="ocean" && (currentRun.index===1 || currentRun.index===2));
  ui.encounterLabel.textContent=currentRun.area==="ocean"
    ? `${cfg.stageNames[currentRun.index].toUpperCase()} · ${currentRun.index+1} / 4`
    : `ENCOUNTER ${currentRun.index+1} / 4`;
  ui.rankBattleLabel.textContent=`${cfg.name} · Rank ${currentRun.rank}`;
  ui.peepLevelCombat.textContent=`Lv. ${activeHeroProgress().level}`;
  renderPeepHp();
  startPeepIdle();

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

function startEnemy(enemyId) {
  const baseTemplate=ENEMIES[enemyId];
  const template =
    enemyId==="mushroom-cat" ? applyMushroomVariant(baseTemplate,currentRun.rank) :
    enemyId==="bee" ? applyBeeVariant(baseTemplate,currentRun.rank) :
    enemyId==="cat-slime" ? applyCatSlimeVariant(baseTemplate,currentRun.rank) :
    enemyId==="flower" ? applyFlowerVariant(baseTemplate,currentRun.rank) :
    enemyId==="cool-seagull" ? applySeagullVariant(baseTemplate,currentRun.rank) :
    enemyId==="sea-turtle" ? applyTurtleVariant(baseTemplate,currentRun.rank) :
    enemyId==="catfish" ? applyCatfishVariant(baseTemplate,currentRun.rank) :
    enemyId==="vampire-squid" ? applySquidVariant(baseTemplate,currentRun.rank) :
    enemyId==="mimic" ? applyMimicProfile(baseTemplate,currentRun.rank) : baseTemplate;

  currentEnemy=enemyScaled(template,currentRun.rank,currentRun.area);
  currentEnemy.id=enemyId;
  currentEnemy.healsUsed=0; currentEnemy.specialUses=0; currentEnemy.shellHitsRemaining=0;
  currentEnemy.zoomiesBoost=false; currentEnemy.lifeDrainsUsed=0;
  ui.enemyCombatant.classList.remove("hidden");
  ui.enemySprite.classList.remove("boss-fighter","gold-boss-fighter","queen-bee-fighter","strawberry-slime-fighter","rainbow-flower-fighter","ocean-elite-fighter","ocean-boss-fighter");
  ui.enemyName.textContent=currentEnemy.name;
  ui.enemyRank.textContent=currentEnemy.boss?`BOSS · Rank ${currentRun.rank}`:`Rank ${currentRun.rank}`;
  ui.enemySprite.classList.toggle("boss-fighter",Boolean(currentEnemy.boss));
  ui.enemySprite.classList.toggle("gold-boss-fighter",currentEnemy.mushroomVariant==="gold");
  ui.enemySprite.classList.toggle("queen-bee-fighter",currentEnemy.beeVariant==="queen");
  ui.enemySprite.classList.toggle("strawberry-slime-fighter",currentEnemy.catSlimeVariant==="strawberry");
  ui.enemySprite.classList.toggle("rainbow-flower-fighter",currentEnemy.flowerVariant==="rainbow");
  ui.enemySprite.classList.toggle("ocean-elite-fighter",Boolean(currentEnemy.eliteVariant));
  ui.enemySprite.classList.toggle("ocean-boss-fighter",enemyId==="vampire-squid");
  renderEnemyHp(); startEnemyIdle(); renderSkills(); renderBattleItems();
  ui.commandGrid.classList.remove("hidden"); closeCommandWindow(); renderBattleItems(); renderCommandButtons();
  if(enemyId==="vampire-squid") setMessage(`${currentEnemy.name} rises from the Ocean Floor!`);
  else if(currentEnemy.boss) setMessage("The Big Mushroom Cat blocks the end of the path!");
  else setMessage(`${currentEnemy.name} appeared!`);
}

function setHeroFrame(src){
  if(activeCharacterId==="miko") renderMikoComposite(ui.battleHeroComposite,src);
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
      } else if(skill.id==="smug" && skillState.attackBuffTurns>0) {
        unavailable=true;
        detail=`Attack +30% active · ${skillState.attackBuffTurns} turn${skillState.attackBuffTurns===1?"":"s"}`;
      }

      button.className=`pixel-button skill-button ${skill.type==="heal"?"heal":skill.type==="buff"?"buff":skill.id==="duck-throw"?"duck":skill.oncePerBattle?"ultimate":""}`;
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

  renderCommandButtons();
}

function renderCommandButtons() {
  const disabled = actionLocked || !currentEnemy;
  if (ui.attackMenuButton) ui.attackMenuButton.disabled = disabled;
  if (ui.itemMenuButton) ui.itemMenuButton.disabled = disabled;

  if (ui.quickHealButton) {
    const usesLeft = Math.max(0, QUICK_HEAL_MAX_USES - quickHealUses);
    const atFullHp = !currentRun || currentRun.hp >= currentRun.maxHp;
    ui.quickHealButton.disabled = disabled || atFullHp || usesLeft <= 0;
    if (ui.quickHealUsesText) {
      ui.quickHealUsesText.textContent = `25% HP · ${usesLeft}/${QUICK_HEAL_MAX_USES}`;
    }
  }

  if (ui.escapeButton) ui.escapeButton.disabled = actionLocked || !currentRun;
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
  } else if(skill.type==="buff") {
    skillState.attackBuffTurns=skill.duration||3;
    skillState.attackBuffMultiplier=1+(skill.attackBoost||0.30);
    setMessage(`Smug! Miko's Attack rose by 30% for ${skillState.attackBuffTurns} turns.`);
    await sleep(700);
  } else if(skill.type==="multi-hit") {
    const stats=peepStats();
    const boostedAttack=stats.attack*(skillState.attackBuffTurns>0?skillState.attackBuffMultiplier:1);
    const hits=Math.max(2,Number(skill.hits)||4);
    const perHit=(skill.multiplier||1)/hits;
    setMessage("He has a gun! Miko fires four quick shots!");
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

    if(skill.id==="duck-throw") {
      const duck=pickThrowDuck();
      flavor=`Duck Throw! ${duck.name} goes flying!`;
      showThrownDuck(duck);
    }
    if(skill.cooldown) skillState.cooldowns[skill.id]=skill.cooldown;
    if(skill.oncePerBattle) skillState.onceUsed[skill.id]=true;

    const stats=peepStats();
    const boostedAttack=stats.attack*(skillState.attackBuffTurns>0?skillState.attackBuffMultiplier:1);
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
  if(usedSkillId!=="smug" && skillState.attackBuffTurns>0) skillState.attackBuffTurns--;
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
}

async function performEnemyAttack(multiplier=1,label="",lifeDrainHeal=0){
  if(!currentEnemy) return 0;
  setMessage(label||`${currentEnemy.name} attacks!`);
  ui.enemySprite.classList.add("attack-pop"); await sleep(300);
  const stats=peepStats(); const crit=Math.random()<.05;
  let dmg=Math.max(1,Math.round((currentEnemy.attackNow-(stats.defense*.55))*(.85+Math.random()*.25)*multiplier));
  if(crit) dmg=Math.round(dmg*1.5);
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

  // Generic healer variants: Blue Seagull, Green Slime, Orange Flower, etc.
  const canSelfHeal=currentEnemy.healPercent>0 && currentEnemy.hpNow<currentEnemy.maxHp &&
    Number(currentEnemy.healsUsed||0)<Number(currentEnemy.maxHeals||0) &&
    currentEnemy.hpNow<=currentEnemy.maxHp*.72 && Math.random()<Number(currentEnemy.healChance||0);
  if(canSelfHeal){
    const amount=Math.max(1,Math.round(currentEnemy.maxHp*currentEnemy.healPercent));
    const before=currentEnemy.hpNow; currentEnemy.hpNow=Math.min(currentEnemy.maxHp,currentEnemy.hpNow+amount); currentEnemy.healsUsed++;
    const gained=currentEnemy.hpNow-before; setMessage(`${currentEnemy.name} used ${currentEnemy.healMoveName||"Recovery!"}`);
    ui.enemySprite.classList.add("attack-pop");showFloat(`+${gained}`,"heal","enemy");renderEnemyHp();await sleep(650);
    ui.enemySprite.classList.remove("attack-pop");setMessage(`${heroDisplayName()} is ready!`);return;
  }

  // Pink Sea Turtle: protects itself from the next two player attacks.
  if(currentEnemy.specialType==="harden-shell" && !currentEnemy.shellHitsRemaining &&
     currentEnemy.specialUses<currentEnemy.maxSpecialUses && Math.random()<currentEnemy.specialChance){
    currentEnemy.specialUses++;currentEnemy.shellHitsRemaining=2;
    setMessage(`${currentEnemy.name} used Harden Shell! The next 2 hits deal 25% less damage.`);
    ui.enemySprite.classList.add("attack-pop");await sleep(650);ui.enemySprite.classList.remove("attack-pop");return;
  }

  // Orange Cat-Fish: spends a turn powering up its next attack.
  if(currentEnemy.specialType==="zoomies" && !currentEnemy.zoomiesBoost &&
     currentEnemy.specialUses<currentEnemy.maxSpecialUses && Math.random()<currentEnemy.specialChance){
    currentEnemy.specialUses++;currentEnemy.zoomiesBoost=true;
    setMessage(`${currentEnemy.name} used Zoomies! Its next attack is powered up by 25%.`);
    ui.enemySprite.classList.add("attack-pop");await sleep(650);ui.enemySprite.classList.remove("attack-pop");return;
  }

  // Every Vampire Squid can use Life Drain twice per battle.
  if(currentEnemy.lifeDrain && currentEnemy.hpNow<currentEnemy.maxHp &&
     currentEnemy.lifeDrainsUsed<currentEnemy.maxLifeDrains && Math.random()<currentEnemy.lifeDrainChance){
    currentEnemy.lifeDrainsUsed++;
    await performEnemyAttack(currentEnemy.lifeDrainDamage,`${currentEnemy.name} used Life Drain!`,currentEnemy.lifeDrainHeal);
    if(currentRun.hp>0) setMessage(`Life Drain stole some of ${heroDisplayName()}'s HP!`);
    return;
  }

  const boosted=Boolean(currentEnemy.zoomiesBoost);
  if(boosted) currentEnemy.zoomiesBoost=false;
  await performEnemyAttack(boosted?1.25:1,boosted?`${currentEnemy.name}'s Zoomies-powered attack!`:"");
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

async function enemyDefeated() {
  clearInterval(idleTimer);
  const defeated={...currentEnemy};
  currentEnemy=null;
  ui.commandGrid.classList.add("hidden");
  closeCommandWindow();
  setMessage(`${defeated.name} was defeated!`);

  await sleep(350);
  ui.enemyCombatant.classList.add("hidden");
  await sleep(280);

  const isBoss=Boolean(defeated.boss);
  pendingChest={
    kind:isBoss?"boss":"normal",
    revealMimic:false,
    enemy:defeated
  };

  // The finishing attack leaves actionLocked=true while its animation resolves.
  // Release that lock before showing the chest so Open Chest can actually be tapped.
  actionLocked=false;
  showChest(pendingChest);
}

function showChest(data) {
  pendingChest=data;
  ui.chestSprite.src="assets/items/chests/treasure/closed.webp";
  ui.chestSprite.classList.remove("opening");
  ui.openChest.classList.remove("hidden");
  ui.openChest.disabled=false;
  ui.chestLayer.classList.remove("hidden");
  ui.chestCaption.textContent=data.kind==="rare"
    ?"A rare treasure chest appeared!"
    :data.revealMimic
      ?"A treasure chest appeared!"
      :"Victory chest!";
}

async function openPendingChest() {
  if(!pendingChest || ui.chestLayer.classList.contains("hidden")) return;
  if(ui.openChest.disabled) return;
  actionLocked=true;
  ui.openChest.disabled=true;
  ui.chestSprite.classList.add("opening");
  await sleep(260);

  if(pendingChest.revealMimic) {
    ui.chestSprite.src="assets/items/chests/treasure/open.webp";
    await sleep(140);
    ui.chestLayer.classList.add("hidden");
    actionLocked=false;
    startEnemy("mimic");
    return;
  }

  ui.chestSprite.src="assets/items/chests/treasure/open.webp";
  const rewards=generateRewards(pendingChest);
  applyRewards(rewards);

  const textParts=[];
  if(rewards.coins) textParts.push(`+${rewards.coins} Pink Coins`);
  if(rewards.exp) textParts.push(`+${rewards.exp} EXP`);
  if(rewards.unlockedBackgrounds?.length) textParts.push(rewards.unlockedBackgrounds.map(bg=>`${bg.label} Icon`).join(", "));
  if(rewards.items.length) textParts.push(rewards.items.map(x=>`${x.name} ×${x.qty}`).join(", "));

  ui.chestCaption.textContent=textParts.join(" · ");
  ui.openChest.classList.add("hidden");
  setMessage("Treasure collected!");

  // Fully recover between encounters so every new fight begins at max HP.
  currentRun.hp=currentRun.maxHp;
  renderPeepHp();

  await sleep(350);
  ui.continueButton.classList.remove("hidden");
  actionLocked=false;
}

function generateRewards(chest) {
  const rank=currentRun.rank;
  let coins=0, exp=0, itemRolls=0, itemChance=0;

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

  const items=[];
  for(let i=0;i<itemRolls;i++) {
    if(Math.random()<=itemChance) {
      let item=weightedItem();

      // Bosses are meant to award two item drops, not one stack of ×2.
      if(chest.kind==="boss" && items.some(x=>x.id===item.id)) {
        for(let retry=0; retry<5 && items.some(x=>x.id===item.id); retry++) {
          item=weightedItem();
        }
      }

      const existing=items.find(x=>x.id===item.id);
      if(existing) existing.qty++;
      else items.push({...item,qty:1});
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
  ui.continueButton.classList.add("hidden");
  currentRun.index++;
  if(currentRun.index>=4) {
    endRun(true);
    return;
  }
  startEncounter();
}

function endRun(won) {
  clearAnimations();
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
  const areaId=currentRun?.area||selectedArea; const cfg=getAreaConfig(areaId); const progress=areaProgress(areaId);
  ui.resultKicker.textContent=won?"RUN COMPLETE!":"RUN ENDED";
  ui.resultTitle.textContent=won?cfg.resultTitle:`${heroDisplayName()} needs a little rest.`;
  const finishedRank=Math.max(1,Number(currentRun?.rank||selectedRank)||1);
  const nextRank=Math.min(cfg.maxRank,finishedRank+1);
  const canRunNext=Boolean(won)&&nextRank>finishedRank&&nextRank<=progress.unlockedRank;
  ui.runNextRank.classList.toggle("hidden",!won);ui.runNextRank.disabled=Boolean(won)&&!canRunNext;
  ui.runNextRank.textContent=canRunNext?`Run ${cfg.name} Rank ${nextRank}`:"Max Rank Reached";
  ui.runNextRank.dataset.rank=canRunNext?String(nextRank):"";ui.runNextRank.dataset.area=areaId;
  ui.resultRank.textContent=`${cfg.name} ${finishedRank}`;ui.resultCoins.textContent=currentRun?.coinsEarned||0;ui.resultExp.textContent=currentRun?.expEarned||0;ui.resultItems.innerHTML="";
  (currentRun?.itemsEarned||[]).forEach(item=>{const el=document.createElement("div");el.className="result-item";el.innerHTML=`<img src="${item.image}" alt=""><span>${item.name} ×${item.qty}</span>`;ui.resultItems.appendChild(el);});
  (currentRun?.iconBackgroundsEarned||[]).forEach(bg=>{
    const el=document.createElement("div");el.className="result-item";
    const swatch=document.createElement("span");swatch.className="result-icon-bg-swatch";applyIconBackgroundStyle(swatch,bg);
    const label=document.createElement("span");label.textContent=`${bg.label} Icon Background`;
    el.append(swatch,label);ui.resultItems.appendChild(el);
  });
  if(!(currentRun?.itemsEarned||[]).length && !(currentRun?.iconBackgroundsEarned||[]).length){const el=document.createElement("div");el.className="result-item";el.textContent="No item drops this time — try another run!";ui.resultItems.appendChild(el);}
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
  const pool=DUCK_LIBRARY.filter(d=>unlocked.some(id=>normalize(id)===normalize(d.id)));
  const candidates=pool.length?pool:DUCK_LIBRARY;
  return candidates[randInt(0,candidates.length-1)];
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
  clearAnimations(); currentRun=null;
  selectedArea=AREA_CONFIG[activeHeroProgress().lastArea]?activeHeroProgress().lastArea:"meadow";
  selectedRank=areaProgress(selectedArea).lastRank||1;
  showScreen("home"); renderMeta();
}

document.querySelector("#backGames").addEventListener("click",()=>window.location.href="../#games");
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
ui.quickHealButton?.addEventListener("click",quickHealTurn);
ui.attackMenuButton.addEventListener("click",()=>openCommandWindow("attack"));
ui.itemMenuButton.addEventListener("click",()=>openCommandWindow("item"));
ui.closeCommandWindow.addEventListener("click",closeCommandWindow);
ui.escapeButton.addEventListener("click",()=>{
  closeCommandWindow();
  openEscapeConfirm();
});
document.querySelector("#openChest").addEventListener("click",openPendingChest);
document.querySelector("#continueButton").addEventListener("click",nextEncounter);
document.querySelector("#runAgain").addEventListener("click",()=>{selectedArea=currentRun?.area||selectedArea;selectedRank=currentRun?.rank||selectedRank;beginRun();});
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
showScreen("home");

// Menu idle bounce.
const menuPeep=document.querySelector("#menuPeep");
let menuFrame=0;
setInterval(()=>{
  if(ui.home.classList.contains("hidden")) return;
  if(activeCharacterId==="miko"){
    menuFrame=(menuFrame+1)%MikoIdle.length;
    renderMikoComposite(ui.menuHeroComposite,MikoIdle[menuFrame]);
    return;
  }
  menuFrame=(menuFrame+1)%PEepIdle.length;
  menuPeep.src=PEepIdle[menuFrame];
},560);
