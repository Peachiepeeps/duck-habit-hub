const HUB_SAVE_KEY = "duckHabitHubSave_v1";
const MAX_LEVEL = 100;
const AREA_CONFIG = Object.freeze({
  meadow: {
    id:"meadow",
    name:"Meadow",
    label:"MEADOW PATH",
    maxRank:20,
    backgrounds:[
      "assets/backgrounds/meadow/stage-1-tree.png",
      "assets/backgrounds/meadow/stage-2-bushes.png",
      "assets/backgrounds/meadow/stage-3-flowers.png",
      "assets/backgrounds/meadow/stage-4-boss.png"
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
      "assets/backgrounds/ocean/shore.png",
      "assets/backgrounds/ocean/surface.png",
      "assets/backgrounds/ocean/deep.png",
      "assets/backgrounds/ocean/floor.png"
    ],
    stageNames:["Shore","Ocean Surface","Ocean Deep","Ocean Floor"],
    resultTitle:"The Ocean Route is Clear!"
  }
});

function getAreaConfig(areaId){
  return AREA_CONFIG[areaId] || AREA_CONFIG.meadow;
}


const DUCK_LIBRARY = [{"id": "standard-duck", "file": "Standard-duck.PNG", "name": "Standard Duck"}, {"id": "pink-duck", "file": "Pink-duck.PNG", "name": "Pink Duck"}, {"id": "rainbow-duck", "file": "Rainbow-duck.PNG", "name": "Rainbow Duck"}];

const SKILLS = [
  {
    id: "heart-pop",
    name: "Heart Pop!",
    unlock: 1,
    type: "damage",
    multiplier: 1.0,
    description: "A dependable little heart blast."
  },
  {
    id: "magical-wish",
    name: "Magical Wish!",
    unlock: 10,
    type: "heal",
    healPercent: 0.32,
    cooldown: 3,
    description: "Restore 32% of Peep's max HP."
  },
  {
    id: "duck-throw",
    name: "Duck Throw!",
    unlock: 25,
    type: "damage",
    multiplier: 1.65,
    cooldown: 2,
    description: "Throw a random unlocked duck. Obviously."
  },
  {
    id: "peep-apocalypse",
    name: "Peep Apocalypse!",
    unlock: 50,
    type: "damage",
    multiplier: 3.0,
    oncePerBattle: true,
    description: "Peep has had enough."
  }
];

const ENEMIES = {
  "cat-slime": {
    name: "Cat Slime",
    hp: 20,
    attack: 3,
    exp: 18,
    coinMin: 5,
    coinMax: 9,
    idle: [
      "assets/enemies/cat-slime/base/idle-1-neutral.png",
      "assets/enemies/cat-slime/base/idle-2-squish.png",
      "assets/enemies/cat-slime/base/idle-3-bounce.png",
      "assets/enemies/cat-slime/base/idle-2-squish.png"
    ],
    hurt: "assets/enemies/cat-slime/base/idle-1-neutral.png",
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
      "assets/enemies/bee/base/idle-1-high.png",
      "assets/enemies/bee/base/idle-2-low.png"
    ],
    hurt: "assets/enemies/bee/base/hurt.png",
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
      "assets/enemies/flower/base/idle-1.png",
      "assets/enemies/flower/base/idle-2.png"
    ],
    hurt: "assets/enemies/flower/base/hurt.png",
    speed: 390
  },
  "cool-seagull": {
    name: "Cool Seagull", hp: 26, attack: 5, exp: 28, coinMin: 8, coinMax: 13,
    idle: ["assets/enemies/cool-seagull/base/idle-1.png","assets/enemies/cool-seagull/base/idle-2.png"],
    hurt: "assets/enemies/cool-seagull/base/hurt.png", speed: 370
  },
  "sea-turtle": {
    name: "Sea Turtle", hp: 34, attack: 5, exp: 31, coinMin: 9, coinMax: 14,
    idle: ["assets/enemies/sea-turtle/base/idle-1.png","assets/enemies/sea-turtle/base/idle-2.png"],
    hurt: "assets/enemies/sea-turtle/base/hurt.png", speed: 430
  },
  "catfish": {
    name: "Cat-Fish", hp: 29, attack: 7, exp: 34, coinMin: 10, coinMax: 16,
    idle: ["assets/enemies/catfish/base/idle-1.png","assets/enemies/catfish/base/idle-2.png"],
    hurt: "assets/enemies/catfish/base/hurt.png", speed: 360
  },
  "vampire-squid": {
    name: "Vampire Squid", hp: 66, attack: 8, exp: 70, coinMin: 24, coinMax: 36,
    idle: ["assets/bosses/vampire-squid/base/idle-1.png","assets/bosses/vampire-squid/base/idle-2.png"],
    hurt: "assets/bosses/vampire-squid/base/hurt.png", speed: 410, boss: true
  },
  "mimic": {
    name: "Mimic",
    hp: 31,
    attack: 6,
    exp: 34,
    coinMin: 18,
    coinMax: 28,
    idle: [
      "assets/enemies/mimic/base/open-1.png",
      "assets/enemies/mimic/base/open-2.png"
    ],
    hurt: "assets/items/chests/treasure/closed.png",
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
      "assets/bosses/mushroom-cat/base/idle-1.png",
      "assets/bosses/mushroom-cat/base/idle-2.png"
    ],
    hurt: "assets/bosses/mushroom-cat/base/hurt.png",
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
  grey:{id:"grey",name:"Cool Seagull",hp:1,atk:1,exp:1,coin:1,idle:["assets/enemies/cool-seagull/base/idle-1.png","assets/enemies/cool-seagull/base/idle-2.png"],hurt:"assets/enemies/cool-seagull/base/hurt.png"},
  pink:{id:"pink",name:"Pink Cool Seagull",hp:1.2,atk:1.1,exp:1.15,coin:1.15,idle:["assets/enemies/cool-seagull/base/Pink-idle-1.png","assets/enemies/cool-seagull/base/Pink-idle-2.png"],hurt:"assets/enemies/cool-seagull/base/Pink-hurt.png"},
  blue:{id:"blue",name:"Blue Cool Seagull",hp:1.2,atk:1.1,exp:1.2,coin:1.2,healPercent:.10,maxHeals:2,healChance:.32,healMoveName:"Fish Snack!",idle:["assets/enemies/cool-seagull/base/Blue-idle-1.png","assets/enemies/cool-seagull/base/Blue-idle-2.png"],hurt:"assets/enemies/cool-seagull/base/Blue-hurt.png"},
  yellow:{id:"yellow",name:"Yellow Cool Seagull",hp:1.4,atk:1.2,exp:1.35,coin:1.35,idle:["assets/enemies/cool-seagull/base/Yellow-idle-1.png","assets/enemies/cool-seagull/base/Yellow-idle-2.png"],hurt:"assets/enemies/cool-seagull/base/Yellow-hurt.png"},
  black:{id:"black",name:"Black Cool Seagull",hp:1.7,atk:1.3,exp:1.5,coin:1.6,elite:true,idle:["assets/enemies/cool-seagull/base/Black-idle-1.png","assets/enemies/cool-seagull/base/Black-idle-2.png"],hurt:"assets/enemies/cool-seagull/base/Black-hurt.png"}
});
const TURTLE_VARIANTS=Object.freeze({
  green:{id:"green",name:"Sea Turtle",hp:1,atk:1,exp:1,coin:1,idle:["assets/enemies/sea-turtle/base/idle-1.png","assets/enemies/sea-turtle/base/idle-2.png"],hurt:"assets/enemies/sea-turtle/base/hurt.png"},
  blue:{id:"blue",name:"Blue Sea Turtle",hp:1.2,atk:1.1,exp:1.15,coin:1.15,idle:["assets/enemies/sea-turtle/base/Blue-idle-1.png","assets/enemies/sea-turtle/base/Blue-idle-2.png"],hurt:"assets/enemies/sea-turtle/base/Blue-hurt.png"},
  pink:{id:"pink",name:"Pink Sea Turtle",hp:1.2,atk:1.1,exp:1.2,coin:1.2,specialType:"harden-shell",specialChance:.30,maxSpecialUses:2,idle:["assets/enemies/sea-turtle/base/Pink-idle-1.png","assets/enemies/sea-turtle/base/Pink-idle-2.png"],hurt:"assets/enemies/sea-turtle/base/Pink-hurt.png"},
  purple:{id:"purple",name:"Purple Sea Turtle",hp:1.4,atk:1.2,exp:1.35,coin:1.35,idle:["assets/enemies/sea-turtle/base/Purple-idle-1.png","assets/enemies/sea-turtle/base/Purple-idle-2.png"],hurt:"assets/enemies/sea-turtle/base/Purple-hurt.png"},
  gold:{id:"gold",name:"Gold Sea Turtle",hp:1.7,atk:1.3,exp:1.5,coin:1.6,elite:true,idle:["assets/enemies/sea-turtle/base/Gold-idle-1.png","assets/enemies/sea-turtle/base/Gold-idle-2.png"],hurt:"assets/enemies/sea-turtle/base/Gold-hurt.png"}
});
const CATFISH_VARIANTS=Object.freeze({
  grey:{id:"grey",name:"Cat-Fish",hp:1,atk:1,exp:1,coin:1,idle:["assets/enemies/catfish/base/idle-1.png","assets/enemies/catfish/base/idle-2.png"],hurt:"assets/enemies/catfish/base/hurt.png"},
  brown:{id:"brown",name:"Brown Cat-Fish",hp:1.2,atk:1.1,exp:1.15,coin:1.15,idle:["assets/enemies/catfish/base/Brown-idle-1.png","assets/enemies/catfish/base/Brown-idle-2.png"],hurt:"assets/enemies/catfish/base/Brown-hurt.png"},
  orange:{id:"orange",name:"Orange Cat-Fish",hp:1.2,atk:1.1,exp:1.2,coin:1.2,specialType:"zoomies",specialChance:.30,maxSpecialUses:2,idle:["assets/enemies/catfish/base/Orange-idle-1.png","assets/enemies/catfish/base/Orange-idle-2.png"],hurt:"assets/enemies/catfish/base/Orange-hurt.png"},
  navy:{id:"navy",name:"Navy Cat-Fish",hp:1.4,atk:1.2,exp:1.35,coin:1.35,idle:["assets/enemies/catfish/base/Navy-idle-1.png","assets/enemies/catfish/base/Navy-idle-2.png"],hurt:"assets/enemies/catfish/base/Navy-hurt.png"},
  black:{id:"black",name:"Black Cat-Fish",hp:1.7,atk:1.3,exp:1.5,coin:1.6,elite:true,idle:["assets/enemies/catfish/base/Black-idle-1.png","assets/enemies/catfish/base/Black-idle-2.png"],hurt:"assets/enemies/catfish/base/Black-hurt.png"}
});
const SQUID_VARIANTS=Object.freeze({
  green:{id:"green",name:"Vampire Squid",hp:1,atk:1,exp:1,coin:1,idle:["assets/bosses/vampire-squid/base/idle-1.png","assets/bosses/vampire-squid/base/idle-2.png"],hurt:"assets/bosses/vampire-squid/base/hurt.png"},
  purple:{id:"purple",name:"Purple Vampire Squid",hp:1.2,atk:1.1,exp:1.15,coin:1.15,idle:["assets/bosses/vampire-squid/base/Purple-idle-1.png","assets/bosses/vampire-squid/base/Purple-idle-2.png"],hurt:"assets/bosses/vampire-squid/base/Purple-hurt.png"},
  coral:{id:"coral",name:"Coral Vampire Squid",hp:1.3,atk:1.15,exp:1.25,coin:1.25,idle:["assets/bosses/vampire-squid/base/Coral-idle-1.png","assets/bosses/vampire-squid/base/Coral-idle-2.png"],hurt:"assets/bosses/vampire-squid/base/Coral-hurt.png"},
  blue:{id:"blue",name:"Blue Vampire Squid",hp:1.4,atk:1.2,exp:1.4,coin:1.4,idle:["assets/bosses/vampire-squid/base/Blue-idle-1.png","assets/bosses/vampire-squid/base/Blue-idle-2.png"],hurt:"assets/bosses/vampire-squid/base/Blue-hurt.png"},
  pink:{id:"pink",name:"Pink Vampire Squid",hp:1.7,atk:1.3,exp:1.75,coin:1.8,elite:true,idle:["assets/bosses/vampire-squid/base/Pink-idle-1.png","assets/bosses/vampire-squid/base/Pink-idle-2.png"],hurt:"assets/bosses/vampire-squid/base/Pink-hurt.png"}
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
    lifeDrain:true,lifeDrainChance:.30,maxLifeDrains:2,lifeDrainDamage:.75,lifeDrainHeal:.50
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
      "assets/enemies/flower/base/idle-1.png",
      "assets/enemies/flower/base/idle-2.png"
    ],
    hurt: "assets/enemies/flower/base/hurt.png"
  },

  pink: {
    id: "pink",
    name: "Pink Flower",
    hpMultiplier: 1.20,
    attackMultiplier: 1.10,
    expMultiplier: 1.15,
    coinMultiplier: 1.15,
    idle: [
      "assets/enemies/flower/base/Pink-idle-1.png",
      "assets/enemies/flower/base/Pink-idle-2.png"
    ],
    hurt: "assets/enemies/flower/base/Pink-hurt.png"
  },

  orange: {
    id: "orange",
    name: "Orange Flower",
    hpMultiplier: 1.20,
    attackMultiplier: 1.10,
    expMultiplier: 1.20,
    coinMultiplier: 1.20,
    healPercent: 0.10,
    maxHeals: 2,
    healChance: 0.32,
    healMoveName: "Sunny Day!",
    idle: [
      "assets/enemies/flower/base/Orange-idle-1.png",
      "assets/enemies/flower/base/Orange-idle-2.png"
    ],
    hurt: "assets/enemies/flower/base/Orange-hurt.png"
  },

  blue: {
    id: "blue",
    name: "Blue Flower",
    hpMultiplier: 1.40,
    attackMultiplier: 1.20,
    expMultiplier: 1.35,
    coinMultiplier: 1.35,
    idle: [
      "assets/enemies/flower/base/Blue-idle-1.png",
      "assets/enemies/flower/base/Blue-idle-2.png"
    ],
    hurt: "assets/enemies/flower/base/Blue-hurt.png"
  },

  rainbow: {
    id: "rainbow",
    name: "Rainbow Flower",
    hpMultiplier: 1.70,
    attackMultiplier: 1.30,
    expMultiplier: 1.50,
    coinMultiplier: 1.60,
    idle: [
      "assets/enemies/flower/base/Rainbow-idle-1.png",
      "assets/enemies/flower/base/Rainbow-idle-2.png"
    ],
    hurt: "assets/enemies/flower/base/Rainbow-hurt.png"
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
      "assets/enemies/cat-slime/base/idle-1-neutral.png",
      "assets/enemies/cat-slime/base/idle-2-squish.png",
      "assets/enemies/cat-slime/base/idle-3-bounce.png",
      "assets/enemies/cat-slime/base/idle-2-squish.png"
    ],
    hurt: "assets/enemies/cat-slime/base/idle-1-neutral.png"
  },

  purple: {
    id: "purple",
    name: "Purple Cat Slime",
    hpMultiplier: 1.20,
    attackMultiplier: 1.10,
    expMultiplier: 1.15,
    coinMultiplier: 1.15,
    idle: [
      "assets/enemies/cat-slime/base/Purple-idle-1-neutral.png",
      "assets/enemies/cat-slime/base/Purple-idle-2-squish.png",
      "assets/enemies/cat-slime/base/Purple-idle-3-bounce.png",
      "assets/enemies/cat-slime/base/Purple-idle-2-squish.png"
    ],
    hurt: "assets/enemies/cat-slime/base/Purple-idle-1-neutral.png"
  },

  green: {
    id: "green",
    name: "Green Cat Slime",
    hpMultiplier: 1.20,
    attackMultiplier: 1.10,
    expMultiplier: 1.20,
    coinMultiplier: 1.20,
    healPercent: 0.10,
    maxHeals: 2,
    healChance: 0.32,
    healMoveName: "Super Squish!",
    idle: [
      "assets/enemies/cat-slime/base/Green-idle-1-neutral.png",
      "assets/enemies/cat-slime/base/Green-idle-2-squish.png",
      "assets/enemies/cat-slime/base/Green-idle-3-bounce.png",
      "assets/enemies/cat-slime/base/Green-idle-2-squish.png"
    ],
    hurt: "assets/enemies/cat-slime/base/Green-idle-1-neutral.png"
  },

  teal: {
    id: "teal",
    name: "Teal Cat Slime",
    hpMultiplier: 1.40,
    attackMultiplier: 1.20,
    expMultiplier: 1.35,
    coinMultiplier: 1.35,
    idle: [
      "assets/enemies/cat-slime/base/Teal-idle-1-neutral.png",
      "assets/enemies/cat-slime/base/Teal-idle-2-squish.png",
      "assets/enemies/cat-slime/base/Teal-idle-3-bounce.png",
      "assets/enemies/cat-slime/base/Teal-idle-2-squish.png"
    ],
    hurt: "assets/enemies/cat-slime/base/Teal-idle-1-neutral.png"
  },

  strawberry: {
    id: "strawberry",
    name: "Strawberry Cat Slime",
    hpMultiplier: 1.70,
    attackMultiplier: 1.30,
    expMultiplier: 1.50,
    coinMultiplier: 1.60,
    idle: [
      "assets/enemies/cat-slime/base/Strawberry-idle-1-neutral.png",
      "assets/enemies/cat-slime/base/Strawberry-idle-2-squish.png",
      "assets/enemies/cat-slime/base/Strawberry-idle-3-bounce.png",
      "assets/enemies/cat-slime/base/Strawberry-idle-2-squish.png"
    ],
    hurt: "assets/enemies/cat-slime/base/Strawberry-idle-1-neutral.png"
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
      "assets/enemies/bee/base/idle-1-high.png",
      "assets/enemies/bee/base/idle-2-low.png"
    ],
    hurt: "assets/enemies/bee/base/hurt.png"
  },

  purple: {
    id: "purple",
    name: "Purple Bee",
    hpMultiplier: 1.20,
    attackMultiplier: 1.10,
    expMultiplier: 1.15,
    coinMultiplier: 1.15,
    idle: [
      "assets/enemies/bee/base/Purple-idle-1-high.png",
      "assets/enemies/bee/base/Purple-idle-2-low.png"
    ],
    hurt: "assets/enemies/bee/base/Purple-hurt.png"
  },

  blue: {
    id: "blue",
    name: "Blue Bee",
    hpMultiplier: 1.20,
    attackMultiplier: 1.10,
    expMultiplier: 1.20,
    coinMultiplier: 1.20,
    healPercent: 0.10,
    maxHeals: 2,
    healChance: 0.32,
    healMoveName: "Honey Snack!",
    idle: [
      "assets/enemies/bee/base/Blue-idle-1-high.png",
      "assets/enemies/bee/base/Blue-idle-2-low.png"
    ],
    hurt: "assets/enemies/bee/base/Blue-hurt.png"
  },

  pink: {
    id: "pink",
    name: "Pink Bee",
    hpMultiplier: 1.40,
    attackMultiplier: 1.20,
    expMultiplier: 1.35,
    coinMultiplier: 1.35,
    idle: [
      "assets/enemies/bee/base/Pink-idle-1-high.png",
      "assets/enemies/bee/base/Pink-idle-2-low.png"
    ],
    hurt: "assets/enemies/bee/base/Pink-hurt.png"
  },

  queen: {
    id: "queen",
    name: "Queen Bee",
    hpMultiplier: 1.70,
    attackMultiplier: 1.30,
    expMultiplier: 1.50,
    coinMultiplier: 1.60,
    idle: [
      "assets/enemies/bee/base/Queen-idle-1-high.png",
      "assets/enemies/bee/base/Queen-idle-2-low.png"
    ],
    hurt: "assets/enemies/bee/base/Queen-hurt.png"
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
  red:{id:"red",name:"Red Mushroom Cat",hpMultiplier:1,attackMultiplier:1,expMultiplier:1,coinMultiplier:1,idle:["assets/bosses/mushroom-cat/base/idle-1.png","assets/bosses/mushroom-cat/base/idle-2.png"],hurt:"assets/bosses/mushroom-cat/base/hurt.png"},
  purple:{id:"purple",name:"Purple Mushroom Cat",hpMultiplier:1.20,attackMultiplier:1.10,expMultiplier:1.15,coinMultiplier:1.15,idle:["assets/bosses/mushroom-cat/base/Purple-idle-1.png","assets/bosses/mushroom-cat/base/Purple-idle-2.png"],hurt:"assets/bosses/mushroom-cat/base/Purple-hurt.png"},
  green:{id:"green",name:"Green Mushroom Cat",hpMultiplier:1.20,attackMultiplier:1.10,expMultiplier:1.20,coinMultiplier:1.20,healPercent:.10,maxHeals:2,healChance:.32,healMoveName:"Forest Snack!",idle:["assets/bosses/mushroom-cat/base/Green-idle-1.png","assets/bosses/mushroom-cat/base/Green-idle-2.png"],hurt:"assets/bosses/mushroom-cat/base/Green-hurt.png"},
  grey:{id:"grey",name:"Grey Mushroom Cat",hpMultiplier:1.40,attackMultiplier:1.20,expMultiplier:1.35,coinMultiplier:1.35,idle:["assets/bosses/mushroom-cat/base/Grey-idle-1.png","assets/bosses/mushroom-cat/base/Grey-idle-2.png"],hurt:"assets/bosses/mushroom-cat/base/Grey-hurt.png"},
  gold:{id:"gold",name:"Gold Mushroom Cat",hpMultiplier:1.70,attackMultiplier:1.30,expMultiplier:1.75,coinMultiplier:1.80,idle:["assets/bosses/mushroom-cat/base/Gold-idle-1.png","assets/bosses/mushroom-cat/base/Gold-idle-2.png"],hurt:"assets/bosses/mushroom-cat/base/Gold-hurt.png"}
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
  { id:"yarn", name:"Yarn", image:"../assets/ingredients/Yarn.PNG", weight:14 },
  { id:"thread", name:"Thread", image:"../assets/ingredients/Thread.PNG", weight:14 },
  { id:"glitter", name:"Glitter", image:"../assets/ingredients/Sparkle.PNG", weight:9 },
  { id:"flower", name:"Flower", image:"../assets/gifts/Flower.PNG", weight:9 },
  { id:"bread-loaf", name:"Bread Loaf", image:"../assets/food/Bread-loaf.PNG", weight:8 },
  { id:"apple", name:"Apple", image:"../assets/food/apple.png", weight:8 },
  { id:"pink-paint", name:"Pink Paint", image:"../assets/paint/Pink-paint.PNG", weight:7 },
  { id:"red-paint", name:"Red Paint", image:"../assets/paint/Red-paint.PNG", weight:7 },
  { id:"mint-paint", name:"Mint Paint", image:"../assets/paint/Mint-paint.PNG", weight:6 },
  { id:"aqua-paint", name:"Aqua Paint", image:"../assets/paint/Aqua-paint.PNG", weight:5 },
  { id:"gold-paint", name:"Gold Paint", image:"../assets/paint/Gold-paint.PNG", weight:3 },
  { id:"rainbow-paint", name:"Rainbow Paint", image:"../assets/paint/Rainbow-paint.PNG", weight:1 },
  { id:"pink-heart-refill", name:"Pink Heart Refill", image:"../assets/bakery/drops/Pink-heart-refill.PNG", weight:5 },
  { id:"gold-heart-refill", name:"Gold Heart Refill", image:"../assets/bakery/drops/Gold-heart-refill.PNG", weight:1 }
];

function currentAreaConfig(){ return getAreaConfig(currentRun?.area || selectedArea); }
function areaProgress(areaId=selectedArea){ return questSave.areas[areaId] || questSave.areas.meadow; }

const PEepIdle = [
  "assets/characters/peep/base/idle-1.png",
  "assets/characters/peep/base/idle-2.png"
];

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
  guardButton: document.querySelector("#guardButton"),
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
  levelUpNotice: document.querySelector("#levelUpNotice")
};

let hubSave = loadHubSave();
let questSave = normalizeQuestSave(hubSave.duckQuest);
let selectedArea = AREA_CONFIG[questSave.lastArea] ? questSave.lastArea : "meadow";
let selectedRank = Math.min(areaProgress(selectedArea).unlockedRank, Math.max(1, areaProgress(selectedArea).lastRank || 1));
let currentRun = null;
let currentEnemy = null;
let idleTimer = null;
let peepIdleTimer = null;
let enemyIdleIndex = 0;
let peepIdleIndex = 0;
let actionLocked = false;
let pendingChest = null;
let guardActive = false;
let skillState = {};

function defaultQuestSave() {
  return {
    peep:{level:1,exp:0},
    lastArea:"meadow",
    areas:{
      meadow:{unlockedRank:1,lastRank:1},
      ocean:{unlockedRank:1,lastRank:1}
    },
    // Legacy Meadow mirrors retained for older Hub code.
    unlockedRank:1,lastRank:1,
    completedRuns:0,bossWins:0,totalBattlesWon:0,totalCoinsEarned:0,totalExpEarned:0
  };
}

function normalizeQuestSave(raw) {
  const d=defaultQuestSave();
  const q=raw&&typeof raw==="object"?raw:{};
  const oldMeadowUnlocked=clampInt(q.areas?.meadow?.unlockedRank ?? q.unlockedRank,1,20,1);
  const oldMeadowLast=clampInt(q.areas?.meadow?.lastRank ?? q.lastRank,1,20,1);
  const oceanUnlocked=clampInt(q.areas?.ocean?.unlockedRank,1,50,1);
  const oceanLast=clampInt(q.areas?.ocean?.lastRank,1,50,1);
  return {
    ...d,...q,
    peep:{level:clampInt(q.peep?.level,1,MAX_LEVEL,1),exp:Math.max(0,Number(q.peep?.exp)||0)},
    lastArea:AREA_CONFIG[q.lastArea]?q.lastArea:"meadow",
    areas:{
      meadow:{unlockedRank:oldMeadowUnlocked,lastRank:Math.min(oldMeadowLast,oldMeadowUnlocked)},
      ocean:{unlockedRank:oceanUnlocked,lastRank:Math.min(oceanLast,oceanUnlocked)}
    },
    unlockedRank:oldMeadowUnlocked,lastRank:oldMeadowLast,
    bossWins:Math.max(0,Number(q.bossWins ?? q.completedRuns)||0)
  };
}

function loadHubSave() {
  try {
    const raw = localStorage.getItem(HUB_SAVE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    if (!parsed.inventory || typeof parsed.inventory !== "object") parsed.inventory = {};
    if (!parsed.characterProgress || typeof parsed.characterProgress !== "object") parsed.characterProgress = {};
    if (!parsed.characterProgress.peep || typeof parsed.characterProgress.peep !== "object") {
      parsed.characterProgress.peep = { happinessTotal:0 };
    }
    parsed.coins = Math.max(0, Number(parsed.coins) || 0);
    return parsed;
  } catch {
    return { coins:0, inventory:{}, unlockedDucks:[], characterProgress:{peep:{happinessTotal:0}} };
  }
}

function persistAll() {
  questSave.unlockedRank=questSave.areas.meadow.unlockedRank;
  questSave.lastRank=questSave.areas.meadow.lastRank;
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

function peepStats(level = questSave.peep.level) {
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

function renderMeta() {
  ui.coinCount.textContent=hubSave.coins.toLocaleString();
  ui.levelBadge.textContent=`Lv. ${questSave.peep.level}`;
  const need=expNeeded(questSave.peep.level);
  ui.xpText.textContent=questSave.peep.level>=MAX_LEVEL?"MAX LEVEL":`${Math.floor(questSave.peep.exp)} / ${need} EXP`;
  ui.xpFill.style.width=questSave.peep.level>=MAX_LEVEL?"100%":`${Math.min(100,(questSave.peep.exp/need)*100)}%`;
  const hLevel=happinessLevelFromTotal(hubSave.characterProgress?.peep?.happinessTotal);
  ui.happinessLevel.textContent=`Lv. ${hLevel}`; ui.happinessHearts.innerHTML="";
  const filled=Math.max(1,Math.ceil(hLevel/20));
  for(let i=1;i<=5;i++){const heart=document.createElement("span");heart.textContent="♥";heart.className=i<=filled?"heart-full":"heart-empty";ui.happinessHearts.appendChild(heart);}

  const cfg=getAreaConfig(selectedArea);
  const progress=areaProgress(selectedArea);
  selectedRank=Math.min(Math.max(1,selectedRank),progress.unlockedRank);
  ui.rankValue.textContent=selectedRank;
  ui.areaRunLabel.textContent=cfg.label;
  ui.bestRunText.textContent=`Highest unlocked ${cfg.name} rank: ${progress.unlockedRank} / ${cfg.maxRank}`;
  ui.rankDescription.textContent=rankDescription(selectedRank,selectedArea);
  document.querySelector("#rankDown").disabled=selectedRank<=1;
  document.querySelector("#rankUp").disabled=selectedRank>=progress.unlockedRank;
  ui.areaButtons.forEach(btn=>btn.classList.toggle("selected",btn.dataset.area===selectedArea));
  renderMenuSkills();
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
  SKILLS.forEach(skill=>{
    const el=document.createElement("div");
    const unlocked=questSave.peep.level>=skill.unlock;
    el.className=`skill-summary${unlocked?"":" locked"}`;
    el.innerHTML=`<strong>${skill.name}</strong><span>${unlocked?skill.description:`Unlocks at Lv. ${skill.unlock}`}</span>`;
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
    hp:stats.maxHp,maxHp:stats.maxHp,coinsEarned:0,expEarned:0,itemsEarned:[],levelsGained:[],bossWon:false
  };
  progress.lastRank=selectedRank; questSave.lastArea=selectedArea; persistAll();
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
  guardActive=false;
  skillState={ magicalWishCooldown:0, duckThrowCooldown:0, apocalypseUsed:false };
  ui.chestLayer.classList.add("hidden");
  ui.continueButton.classList.add("hidden");
  ui.commandGrid.classList.remove("hidden");
  closeCommandWindow();
  ui.enemyCombatant.classList.remove("hidden");

  const encounter=currentRun.plan[currentRun.index];
  const cfg=currentAreaConfig();
  ui.battleBg.src=cfg.backgrounds[currentRun.index];
  ui.encounterLabel.textContent=currentRun.area==="ocean"
    ? `${cfg.stageNames[currentRun.index].toUpperCase()} · ${currentRun.index+1} / 4`
    : `ENCOUNTER ${currentRun.index+1} / 4`;
  ui.rankBattleLabel.textContent=`${cfg.name} · Rank ${currentRun.rank}`;
  ui.peepLevelCombat.textContent=`Lv. ${questSave.peep.level}`;
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
  ui.peepSprite.src=PEepIdle[0];
  peepIdleTimer=setInterval(()=>{
    if(actionLocked) return;
    peepIdleIndex=(peepIdleIndex+1)%PEepIdle.length;
    ui.peepSprite.src=PEepIdle[peepIdleIndex];
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

  SKILLS
    .filter(skill => questSave.peep.level >= skill.unlock)
    .forEach(skill=>{
      const button=document.createElement("button");
      button.type="button";
      let unavailable=false;
      let detail=skill.description;

      if(skill.id==="magical-wish" && skillState.magicalWishCooldown>0) {
        unavailable=true;
        detail=`Cooldown: ${skillState.magicalWishCooldown} turn${skillState.magicalWishCooldown===1?"":"s"}`;
      } else if(skill.id==="duck-throw" && skillState.duckThrowCooldown>0) {
        unavailable=true;
        detail=`Cooldown: ${skillState.duckThrowCooldown} turn${skillState.duckThrowCooldown===1?"":"s"}`;
      } else if(skill.id==="peep-apocalypse" && skillState.apocalypseUsed) {
        unavailable=true;
        detail="Already used this battle.";
      }

      button.className=`pixel-button skill-button ${skill.type==="heal"?"heal":skill.id==="duck-throw"?"duck":skill.id==="peep-apocalypse"?"ultimate":""}`;
      button.disabled=unavailable || actionLocked;
      button.innerHTML=`<strong>${skill.name}</strong><span${detail.startsWith("Cooldown")?' class="cooldown"':""}>${detail}</span>`;

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
  if (ui.guardButton) ui.guardButton.disabled = disabled;
  if (ui.escapeButton) ui.escapeButton.disabled = actionLocked || !currentRun;
}

function openCommandWindow(kind) {
  if (actionLocked || !currentEnemy) return;

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
      image: "../assets/bakery/drops/Pink-heart-refill.PNG",
      detail: "Heal 50% HP"
    },
    {
      id: "gold-heart-refill",
      name: "Gold Heart Refill",
      image: "../assets/bakery/drops/Gold-heart-refill.PNG",
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
    setMessage("Peep is already at full health!");
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
  setMessage(`${itemName}! Peep restored ${healed} HP.`);
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

  if(skill.type==="heal") {
    ui.peepSprite.src="assets/characters/peep/base/attack.png";
    const amount=Math.max(1,Math.round(currentRun.maxHp*skill.healPercent));
    const healed=Math.min(amount,currentRun.maxHp-currentRun.hp);
    currentRun.hp+=healed;
    skillState.magicalWishCooldown=skill.cooldown;
    setMessage(`Magical Wish! Peep restored ${healed} HP.`);
    showFloat(`+${healed}`,"heal","peep");
    renderPeepHp();
    await sleep(650);
  } else {
    ui.peepSprite.src="assets/characters/peep/base/attack.png";
    ui.peepSprite.classList.add("attack-pop");

    let multiplier=skill.multiplier||1;
    let flavor=skill.name;

    if(skill.id==="duck-throw") {
      const duck=pickThrowDuck();
      flavor=`Duck Throw! ${duck.name} goes flying!`;
      skillState.duckThrowCooldown=skill.cooldown;
      showThrownDuck(duck);
    }
    if(skill.id==="peep-apocalypse") skillState.apocalypseUsed=true;

    const stats=peepStats();
    const crit=Math.random()<0.11;
    const variance=0.9+Math.random()*0.2;
    const dmg=Math.max(1,Math.round(stats.attack*multiplier*variance*(crit?1.5:1)));
    setMessage(flavor + (crit?" CRITICAL!":""));
    await sleep(260);
    await hurtEnemy(dmg);
  }

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
  if(usedSkillId!=="magical-wish" && skillState.magicalWishCooldown>0) skillState.magicalWishCooldown--;
  if(usedSkillId!=="duck-throw" && skillState.duckThrowCooldown>0) skillState.duckThrowCooldown--;
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
  if(guardActive){dmg=Math.max(1,Math.ceil(dmg*.5));guardActive=false;}
  currentRun.hp=Math.max(0,currentRun.hp-dmg);
  ui.peepSprite.src="assets/characters/peep/base/hurt.png";ui.peepSprite.classList.add("hurt-pop");
  showFloat(`-${dmg}`,"damage","peep");renderPeepHp();
  if(lifeDrainHeal>0 && currentEnemy.hpNow>0){
    const before=currentEnemy.hpNow;
    currentEnemy.hpNow=Math.min(currentEnemy.maxHp,currentEnemy.hpNow+Math.max(1,Math.round(dmg*lifeDrainHeal)));
    const healed=currentEnemy.hpNow-before;
    if(healed>0){showFloat(`+${healed}`,"heal","enemy");renderEnemyHp();}
  }
  await sleep(420);ui.peepSprite.classList.remove("hurt-pop");ui.enemySprite.classList.remove("attack-pop");
  ui.peepSprite.src=PEepIdle[peepIdleIndex%PEepIdle.length];
  if(currentRun.hp<=0) endRun(false);
  else if(!label) setMessage(crit?`${currentEnemy.name} landed a critical hit!`:"Peep is ready!");
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
    ui.enemySprite.classList.remove("attack-pop");setMessage("Peep is ready!");return;
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
    if(currentRun.hp>0) setMessage("Life Drain stole some of Peep's HP!");
    return;
  }

  const boosted=Boolean(currentEnemy.zoomiesBoost);
  if(boosted) currentEnemy.zoomiesBoost=false;
  await performEnemyAttack(boosted?1.25:1,boosted?`${currentEnemy.name}'s Zoomies-powered attack!`:"");
  if(currentRun.hp>0) setMessage("Peep is ready!");
}

async function guardTurn() {
  if(actionLocked || !currentEnemy) return;
  actionLocked=true;
  guardActive=true;
  setMessage("Peep guards! Incoming damage is reduced by 50%.");
  await sleep(350);
  decrementCooldowns("guard");
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
  ui.chestSprite.src="assets/items/chests/treasure/closed.png";
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
    ui.chestSprite.src="assets/items/chests/treasure/open.png";
    await sleep(140);
    ui.chestLayer.classList.add("hidden");
    actionLocked=false;
    startEnemy("mimic");
    return;
  }

  ui.chestSprite.src="assets/items/chests/treasure/open.png";
  const rewards=generateRewards(pendingChest);
  applyRewards(rewards);

  const textParts=[];
  if(rewards.coins) textParts.push(`+${rewards.coins} Pink Coins`);
  if(rewards.exp) textParts.push(`+${rewards.exp} EXP`);
  if(rewards.items.length) textParts.push(rewards.items.map(x=>`${x.name} ×${x.qty}`).join(", "));

  ui.chestCaption.textContent=textParts.join(" · ");
  ui.openChest.classList.add("hidden");
  setMessage("Treasure collected!");

  // A little recovery between encounters; challenge carries over, but you're not left helpless.
  const recovery=Math.max(1,Math.round(currentRun.maxHp*0.20));
  currentRun.hp=Math.min(currentRun.maxHp,currentRun.hp+recovery);
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

  return {coins,exp,items};
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
  currentRun.coinsEarned+=rewards.coins;
  questSave.totalCoinsEarned=(Number(questSave.totalCoinsEarned)||0)+rewards.coins;

  const levelResult=grantExp(rewards.exp);
  currentRun.expEarned+=rewards.exp;
  questSave.totalExpEarned=(Number(questSave.totalExpEarned)||0)+rewards.exp;
  if(levelResult.length) currentRun.levelsGained.push(...levelResult);

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
  if(questSave.peep.level>=MAX_LEVEL) return gained;
  questSave.peep.exp+=Math.max(0,Number(amount)||0);
  while(questSave.peep.level<MAX_LEVEL) {
    const need=expNeeded(questSave.peep.level);
    if(questSave.peep.exp<need) break;
    questSave.peep.exp-=need;
    questSave.peep.level++;
    gained.push(questSave.peep.level);
    if(questSave.peep.level>=MAX_LEVEL) {
      questSave.peep.exp=0;
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
    if(!hubSave.characterProgress.peep) hubSave.characterProgress.peep={happinessTotal:0};
    hubSave.characterProgress.peep.happinessTotal=Math.max(0,Number(hubSave.characterProgress.peep.happinessTotal)||0)+2;
    const progress=areaProgress(currentRun.area); const maxRank=getAreaConfig(currentRun.area).maxRank;
    if(currentRun.rank===progress.unlockedRank && progress.unlockedRank<maxRank) progress.unlockedRank++;
  }
  persistAll(); renderMeta(); renderResult(won); showScreen("result");
}

function renderResult(won) {
  const areaId=currentRun?.area||selectedArea; const cfg=getAreaConfig(areaId); const progress=areaProgress(areaId);
  ui.resultKicker.textContent=won?"RUN COMPLETE!":"RUN ENDED";
  ui.resultTitle.textContent=won?cfg.resultTitle:"Peep needs a little rest.";
  const finishedRank=Math.max(1,Number(currentRun?.rank||selectedRank)||1);
  const nextRank=Math.min(cfg.maxRank,finishedRank+1);
  const canRunNext=Boolean(won)&&nextRank>finishedRank&&nextRank<=progress.unlockedRank;
  ui.runNextRank.classList.toggle("hidden",!won);ui.runNextRank.disabled=Boolean(won)&&!canRunNext;
  ui.runNextRank.textContent=canRunNext?`Run ${cfg.name} Rank ${nextRank}`:"Max Rank Reached";
  ui.runNextRank.dataset.rank=canRunNext?String(nextRank):"";ui.runNextRank.dataset.area=areaId;
  ui.resultRank.textContent=`${cfg.name} ${finishedRank}`;ui.resultCoins.textContent=currentRun?.coinsEarned||0;ui.resultExp.textContent=currentRun?.expEarned||0;ui.resultItems.innerHTML="";
  (currentRun?.itemsEarned||[]).forEach(item=>{const el=document.createElement("div");el.className="result-item";el.innerHTML=`<img src="${item.image}" alt=""><span>${item.name} ×${item.qty}</span>`;ui.resultItems.appendChild(el);});
  if(!(currentRun?.itemsEarned||[]).length){const el=document.createElement("div");el.className="result-item";el.textContent="No item drops this time — try another run!";ui.resultItems.appendChild(el);}
  const levels=[...new Set(currentRun?.levelsGained||[])];
  if(levels.length){ui.levelUpNotice.classList.remove("hidden");const unlocked=SKILLS.filter(s=>levels.includes(s.unlock)).map(s=>s.name);ui.levelUpNotice.textContent=`Level up! Peep reached Lv. ${questSave.peep.level}.${unlocked.length?` New skill unlocked: ${unlocked.join(", ")}`:""}`;}
  else ui.levelUpNotice.classList.add("hidden");
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
  img.style.cssText="position:absolute;z-index:20;width:64px;height:64px;object-fit:contain;image-rendering:pixelated;left:30%;top:52%;transition:transform .45s linear,left .45s linear,top .45s linear;pointer-events:none;";
  document.querySelector("#battlefield").appendChild(img);
  requestAnimationFrame(()=>{
    img.style.left="69%";
    img.style.top="34%";
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
  selectedArea=AREA_CONFIG[questSave.lastArea]?questSave.lastArea:"meadow";
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
  selectedArea=areaId;questSave.lastArea=areaId;selectedRank=areaProgress(areaId).lastRank||1;persistAll();renderMeta();
}));
document.querySelector("#startRun").addEventListener("click",beginRun);
document.querySelector("#guardButton").addEventListener("click",guardTurn);
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

renderMeta();
renderMenuSkills();
showScreen("home");

// Menu idle bounce.
const menuPeep=document.querySelector("#menuPeep");
let menuFrame=0;
setInterval(()=>{
  if(ui.home.classList.contains("hidden")) return;
  menuFrame=(menuFrame+1)%PEepIdle.length;
  menuPeep.src=PEepIdle[menuFrame];
},560);
