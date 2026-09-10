// Duck Quest game-v63 — profile icon borders on Duck Quest icons
const HUB_SAVE_KEY = "duckHabitHubSave_v1";
const MAX_LEVEL = 100;
const AREA_CONFIG = Object.freeze({
  meadow: {
    id:"meadow",
    name:"Meadow",
    label:"MEADOW PATH",
    maxRank:40,
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
    maxRank:80,
    backgrounds:[
      "assets/backgrounds/ocean/shore.webp",
      "assets/backgrounds/ocean/surface.webp",
      "assets/backgrounds/ocean/deep.webp",
      "assets/backgrounds/ocean/floor.webp"
    ],
    stageNames:["Shore","Ocean Surface","Ocean Deep","Ocean Floor"],
    resultTitle:"The Ocean Route is Clear!"
  },
  candy: {
    id:"candy",
    name:"Candyland",
    label:"CANDYLAND",
    maxRank:120,
    backgrounds:[
      "assets/backgrounds/candyland/lollipop-lane.webp",
      "assets/backgrounds/candyland/gumdrop-path.webp",
      "assets/backgrounds/candyland/candycane-bridge.webp",
      "assets/backgrounds/candyland/chocolate-lake.webp"
    ],
    stageNames:["Lollipop Lane","Gumdrop Path","Candycane Bridge","Chocolate Lake"],
    resultTitle:"Candyland is Clear!"
  },
  cloud: {
    id:"cloud",
    name:"Cloud Garden",
    label:"CLOUD GARDEN",
    maxRank:160,
    backgrounds:[
      "assets/backgrounds/cloud/stage-1-stairs.png",
      "assets/backgrounds/cloud/stage-2-pillar.png",
      "assets/backgrounds/cloud/stage-3-top.png",
      "assets/backgrounds/cloud/stage-4-star-boss.png"
    ],
    stageNames:["Cloud Stairs","Pillar Garden","Cloud Top","Star Sanctuary"],
    resultTitle:"The Cloud Garden is Clear!"
  }
});

function getAreaConfig(areaId){
  return AREA_CONFIG[areaId] || AREA_CONFIG.meadow;
}


// v24.133 — treasure happiness + Endless Run UI themes + quest icon border sync.
// Internal save keys still use the legacy area/rank names so existing player progress remains compatible.
const QUEST_CHARACTER_IDS = Object.freeze(["peep","miko","io","miho","annika"]);
const QUEST_CHARACTER_NAMES = Object.freeze({peep:"Peep",miko:"Miko",io:"Io",miho:"Miho",annika:"Annika"});
const QUEST_UI_THEMES = Object.freeze([
  {
    id:"classic-cream", name:"Classic Cream",
    description:"The original cozy cream-and-pink Duck Quest look.",
    swatches:["#fff7e5","#f4a7c1","#8c625d"], themeColor:"#f6c6d6", requirement:null
  },
  {
    id:"peep-picnic", name:"Peep Picnic",
    description:"Blush pink, mint, and strawberry cream.",
    swatches:["#fff9f4","#e991b2","#9ed8cb"], themeColor:"#f4c6d6",
    requirement:{stage:"meadow",level:10,character:"peep"}
  },
  {
    id:"miko-moonlight", name:"Miko Moonlight",
    description:"Buttercream, charcoal, and a little warm gold.",
    swatches:["#fff8df","#43423e","#d7b96f"], themeColor:"#ded5bd",
    requirement:{stage:"meadow",level:10,character:"miko"}
  },
  {
    id:"io-sweetheart", name:"Io Sweetheart",
    description:"Rose pink, berry accents, and soft candy cream.",
    swatches:["#fff7fb","#e9619b","#f4b5c9"], themeColor:"#f4bfd1",
    requirement:{stage:"meadow",level:10,character:"io"}
  },
  {
    id:"miho-tea-room", name:"Miho Silent Space",
    description:"Dark charcoal, muted crimson, and a cold white glow.",
    swatches:["#2b2027","#7b3c49","#f4ecef"], themeColor:"#5a2b34",
    requirement:{stage:"meadow",level:10,character:"miho"}
  },
  {
    id:"annika-crimson", name:"Annika Crimson",
    description:"Cherry red with softer cream highlights for easier reading.",
    swatches:["#fff7f4","#b14b60","#f4d6dc"], themeColor:"#b14b60",
    requirement:{stage:"meadow",level:10,character:"annika"}
  },
  {
    id:"meadow-bloom", name:"Meadow Bloom",
    description:"Fresh clover, petal pink, and sunny cream.",
    swatches:["#f8f5d9","#89bd7e","#e6a9be"], themeColor:"#d8e7c3",
    requirement:{stage:"meadow",level:20}
  },
  {
    id:"ocean-breeze", name:"Ocean Breeze",
    description:"Sea-glass blue, foam, and a soft coral accent.",
    swatches:["#f3fbff","#83bfd9","#e8a9af"], themeColor:"#c9e5ef",
    requirement:{stage:"ocean",level:40}
  },
  {
    id:"candy-pop", name:"Candy Pop",
    description:"Bubblegum pink, lavender, and sherbet yellow.",
    swatches:["#fff7fc","#ed8fbc","#c9a9ec"], themeColor:"#f4c8e1",
    requirement:{stage:"candy",level:60}
  },
  {
    id:"cloud-dream", name:"Cloud Dream",
    description:"Sky blue, lilac, and starlight gold.",
    swatches:["#f7fbff","#a9c9ee","#c6b4e8"], themeColor:"#d9e8f5",
    requirement:{stage:"cloud",level:80}
  },
  {
    id:"rose-arcade", name:"Rose Arcade",
    description:"Retro rosy pink, cream, and berry accents.",
    swatches:["#fff6fa","#d95f91","#7d5266"], themeColor:"#eaa2bd",
    requirement:{endlessRuns:20}
  },
  {
    id:"mint-circuit", name:"Mint Circuit",
    description:"Cool mint, aqua, and clean graphite details.",
    swatches:["#f5fffb","#4faaa0","#344e4a"], themeColor:"#a8ded2",
    requirement:{endlessRuns:40}
  },
  {
    id:"midnight-pixel", name:"Midnight Pixel",
    description:"Deep navy, soft indigo, and moonlit white.",
    swatches:["#1c203d","#7d83d6","#f2f2ff"], themeColor:"#262b52",
    requirement:{endlessRuns:60}
  },
  {
    id:"peach-sunset", name:"Peach Sunset",
    description:"Warm peach, dusty coral, and soft mauve cream.",
    swatches:["#fff8f3","#df826f","#efb6ad"], themeColor:"#eead98",
    requirement:{endlessRuns:80}
  },
  {
    id:"rose-gold-royale", name:"Rose-Gold Royale",
    description:"Ivory, rose gold, and elegant wine accents.",
    swatches:["#fff8f2","#b96e77","#e2b7aa"], themeColor:"#b56b78",
    requirement:{endlessRuns:100}
  }
]);
const QUEST_UI_THEME_IDS = new Set(QUEST_UI_THEMES.map(theme=>theme.id));

function questUiThemeById(id){ return QUEST_UI_THEMES.find(theme=>theme.id===id) || QUEST_UI_THEMES[0]; }
function questCharacterName(id){ return QUEST_CHARACTER_NAMES[id] || "OC"; }
function questThemeRequirementText(theme){
  const req=theme?.requirement;
  if(!req) return "Always available";
  if(req.endlessRuns){
    const current=Math.max(0,Math.floor(Number(questSave?.endlessRunsCompleted)||0));
    return `Finish ${req.endlessRuns} Endless Runs (${Math.min(current,req.endlessRuns)}/${req.endlessRuns})`;
  }
  const stage=getAreaConfig(req.stage).name;
  return req.character
    ? `Clear ${stage} Level ${req.level} with ${questCharacterName(req.character)}`
    : `Clear ${stage} Level ${req.level}`;
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


  // v39 — extra CSS-only chest backgrounds.
  {id:"lemon-cream-dots",label:"Lemon Cream Dots",rarity:"uncommon",source:"chest",weight:4.2,value:"radial-gradient(circle at 7px 7px,#fffaf0 0 3px,transparent 3.6px),#f4dda0",size:"22px 22px"},
  {id:"peach-checker",label:"Peach Checker",rarity:"uncommon",source:"chest",weight:4,value:"conic-gradient(#f8d2c5 25%,#efb6a7 0 50%,#f8d2c5 0 75%,#efb6a7 0)",size:"22px 22px"},
  {id:"mint-heart-confetti",label:"Mint Heart Confetti",rarity:"rare",source:"chest",weight:1.6,value:"radial-gradient(circle at 18% 25%,#fff 0 2.5px,transparent 3.1px),radial-gradient(circle at 72% 38%,#f6b8cf 0 2.3px,transparent 3px),radial-gradient(circle at 45% 78%,#d1b8ec 0 1.9px,transparent 2.6px),linear-gradient(145deg,#bce5ce,#dff2e5)",size:"29px 29px,35px 35px,25px 25px,auto"},
  {id:"blueberry-stardust",label:"Blueberry Stardust",rarity:"rare",source:"chest",weight:1.25,value:"radial-gradient(circle at 17% 21%,#fff5bd 0 1.8px,transparent 2.4px),radial-gradient(circle at 71% 33%,#fff 0 1.4px,transparent 2px),radial-gradient(circle at 43% 77%,#d9c8ff 0 1.7px,transparent 2.3px),linear-gradient(155deg,#6f78ba,#8d91ce,#b1a7dc)",size:"27px 27px,34px 34px,23px 23px,auto"},
  {id:"lilac-bubbles",label:"Lilac Bubbles",rarity:"rare",source:"chest",weight:1.1,value:"radial-gradient(circle at 18% 24%,rgba(255,255,255,.88) 0 3px,rgba(255,255,255,.25) 3.2px 4.5px,transparent 4.8px),radial-gradient(circle at 70% 62%,rgba(255,255,255,.7) 0 2px,rgba(255,255,255,.18) 2.2px 3.5px,transparent 3.8px),linear-gradient(145deg,#d5bce9,#ead9f2)",size:"36px 36px,29px 29px,auto"},
  {id:"rose-gold-sparkle",label:"Rose Gold Sparkle",rarity:"rare",source:"chest",weight:.9,value:"radial-gradient(circle at 15% 20%,#fff7e8 0 1.6px,transparent 2.1px),radial-gradient(circle at 71% 31%,#f8dcae 0 1.4px,transparent 2px),radial-gradient(circle at 43% 78%,#fff 0 1.2px,transparent 1.8px),linear-gradient(135deg,#d89a9c,#e5b7ac,#c99a80)",size:"21px 21px,28px 28px,32px 32px,auto"},
  {id:"cherry-blossom-glow",label:"Cherry Blossom Glow",rarity:"rare",source:"chest",weight:.7,value:"radial-gradient(circle at 20% 27%,rgba(255,255,255,.9) 0 2.5px,transparent 3.2px),radial-gradient(circle at 74% 43%,#f2a8c2 0 2.7px,transparent 3.5px),radial-gradient(circle at 43% 79%,#fff2f6 0 2px,transparent 2.8px),linear-gradient(145deg,#f1b7c9,#f8d9df,#f4c6d8)",size:"32px 32px,38px 38px,27px 27px,auto"},
  {id:"midnight-hearts",label:"Midnight Hearts",rarity:"ultra",source:"chest",weight:.12,value:"radial-gradient(circle at 18% 26%,#f8bfdc 0 2.5px,transparent 3.1px),radial-gradient(circle at 72% 39%,#d5c2ff 0 2.4px,transparent 3px),radial-gradient(circle at 44% 79%,#fff3b9 0 1.7px,transparent 2.4px),linear-gradient(150deg,#34355f,#545083,#735a91)",size:"29px 29px,36px 36px,24px 24px,auto"},

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

const ICON_BORDER_STYLES = Object.freeze([
  {id:"none",label:"No Border",source:"starter",rarity:"starter",file:""},
  {id:"stitched",label:"Stitched Border",source:"chest",rarity:"common",weight:10,file:"../assets/ui/profile-borders/Stitched-border.png"},
  {id:"sparkle",label:"Sparkle Border",source:"chest",rarity:"uncommon",weight:6,file:"../assets/ui/profile-borders/Sparkle-border.png"},
  {id:"sakura",label:"Sakura Border",source:"chest",rarity:"rare",weight:3.2,file:"../assets/ui/profile-borders/Sakura-border.png"}
]);

const ICON_BORDER_COLORS = Object.freeze([
  {id:"white",label:"White",value:"#fffaf3",source:"starter",rarity:"starter"},
  {id:"cream",label:"Cream",value:"#f7ead2",source:"chest",rarity:"common",weight:10},
  {id:"blush",label:"Blush",value:"#f4c8d5",source:"chest",rarity:"common",weight:10},
  {id:"baby-blue",label:"Baby Blue",value:"#c8e1f6",source:"chest",rarity:"common",weight:9},
  {id:"mint",label:"Mint",value:"#bde3cf",source:"chest",rarity:"common",weight:9},
  {id:"peach",label:"Peach",value:"#f3c3ae",source:"chest",rarity:"common",weight:8.5},
  {id:"lavender",label:"Lavender",value:"#d6c5ef",source:"chest",rarity:"common",weight:8.5},
  {id:"rose",label:"Rose",value:"#e5a5bb",source:"chest",rarity:"uncommon",weight:6},
  {id:"sage",label:"Sage",value:"#c8d7b7",source:"chest",rarity:"uncommon",weight:5.5},
  {id:"periwinkle",label:"Periwinkle",value:"#b8c1ef",source:"chest",rarity:"uncommon",weight:5.5},
  {id:"berry",label:"Berry",value:"#bf7797",source:"chest",rarity:"uncommon",weight:4.2},
  {id:"gold",label:"Gold",value:"#d7ba65",source:"chest",rarity:"rare",weight:2.4},
  {id:"crimson",label:"Crimson",value:"#bb5c74",source:"chest",rarity:"rare",weight:1.9},
  {id:"black",label:"Black",value:"#43343b",source:"chest",rarity:"rare",weight:1.4},
  {id:"rose-gold",label:"Rose Gold",value:"#c98d89",source:"chest",rarity:"rare",weight:1.15}
]);

function iconBorderStyleById(id){ return ICON_BORDER_STYLES.find(style=>style.id===id) || ICON_BORDER_STYLES[0]; }
function iconBorderColorById(id){ return ICON_BORDER_COLORS.find(color=>color.id===id) || ICON_BORDER_COLORS[0]; }

function hubProfileBorderSelectionForCharacter(characterId){
  const selections = hubSave?.profileIconBorders && typeof hubSave.profileIconBorders === "object"
    ? hubSave.profileIconBorders
    : {};
  const current = selections?.[characterId] && typeof selections[characterId] === "object"
    ? selections[characterId]
    : {};
  const styleId = ICON_BORDER_STYLES.some(style=>style.id===(current.style||current.styleId))
    ? (current.style||current.styleId)
    : "none";
  const colorId = ICON_BORDER_COLORS.some(color=>color.id===(current.color||current.colorId))
    ? (current.color||current.colorId)
    : "white";
  return { styleId, colorId };
}

function applyQuestIconBorder(element, characterId){
  if(!element) return;
  const selection = hubProfileBorderSelectionForCharacter(characterId);
  const style = iconBorderStyleById(selection.styleId);
  const color = iconBorderColorById(selection.colorId);
  let layer = element.querySelector(":scope > .quest-icon-border-layer");
  if(style.id === "none"){
    if(layer) layer.remove();
    return;
  }
  if(!layer){
    layer = document.createElement("div");
    layer.className = "quest-icon-border-layer";
    layer.setAttribute("aria-hidden","true");
    element.appendChild(layer);
  }
  layer.style.setProperty("--quest-icon-border-color", color.value);
  layer.style.setProperty("--quest-icon-border-mask", `url("${style.file}")`);
}

function questCharacterIconPreviewSrc(characterId){
  if(characterId === "miko") return MikoIdle?.[0] || "../assets/characters/miko/Miko-base.webp";
  if(characterId === "io") return IoIdle?.[0] || "../assets/characters/io/Io-base.webp";
  if(characterId === "miho") return MihoIdle?.[0] || "../assets/characters/miho/base/hurt.webp";
  if(characterId === "annika") return AnnikaIdle?.[0] || "../assets/characters/annika/base/hurt.webp";
  return "assets/characters/peep/base/idle-1.webp";
}

const QUEST_WALLPAPERS = Object.freeze([
  {id:"starry-night-wallpaper",label:"Starry Night",rarity:"rare",weight:1.8,value:"radial-gradient(circle at 18% 22%,#fff6bf 0 2px,transparent 2.6px),radial-gradient(circle at 72% 34%,#fff 0 1.5px,transparent 2px),radial-gradient(circle at 48% 78%,#fff6bf 0 1.5px,transparent 2px),linear-gradient(160deg,#8d97d7,#b9b1ea)",size:"30px 30px,26px 26px,34px 34px,auto"},
  {id:"petal-dream-wallpaper",label:"Petal Dream",rarity:"rare",weight:1.05,value:"radial-gradient(circle at 24% 30%,rgba(255,245,252,.92) 0 3px,transparent 3.7px),radial-gradient(circle at 70% 68%,rgba(255,229,239,.9) 0 3px,transparent 3.7px),linear-gradient(145deg,#f0bfd2,#edd7f6)",size:"32px 32px,28px 28px,auto"},
  {id:"magical-sparkle-wallpaper",label:"Magical Sparkle",rarity:"rare",weight:1.2,value:"radial-gradient(circle at 15% 20%,#fff 0 1.5px,transparent 2px),radial-gradient(circle at 72% 28%,#ffe9a8 0 1.3px,transparent 1.8px),radial-gradient(circle at 38% 75%,#fff 0 1px,transparent 1.7px),linear-gradient(135deg,#eda9c4,#d995c1,#c5b0ea)",size:"22px 22px,28px 28px,18px 18px,auto"},
  {id:"rainbow-dream-wallpaper",label:"Rainbow Dream",rarity:"ultra",weight:.7,value:"linear-gradient(90deg,rgba(255,255,255,.36) 50%,transparent 50%),linear-gradient(rgba(255,255,255,.36) 50%,transparent 50%),linear-gradient(135deg,#f1adc4,#f6d299,#cfe4af,#b7ddf1,#cab6ef,#ecbddf)",size:"26px 26px,26px 26px,auto"},
  {id:"moonlit-hearts-wallpaper",label:"Moonlit Hearts",rarity:"ultra",weight:.45,value:"radial-gradient(circle at 18% 26%,#f8bfdc 0 2.5px,transparent 3.1px),radial-gradient(circle at 72% 39%,#d5c2ff 0 2.4px,transparent 3px),radial-gradient(circle at 44% 79%,#fff3b9 0 1.7px,transparent 2.4px),linear-gradient(150deg,#53538c,#715d9a,#a693d4)",size:"29px 29px,36px 36px,24px 24px,auto"},
  {id:"royal-celestial-wallpaper",label:"Royal Celestial",rarity:"ultra",weight:.38,value:"radial-gradient(circle at 16% 24%,#fff4bc 0 2px,transparent 2.7px),radial-gradient(circle at 76% 28%,#fff 0 1.6px,transparent 2.2px),radial-gradient(circle at 46% 76%,#ffd7ea 0 1.9px,transparent 2.6px),linear-gradient(150deg,#6a5e9f,#8a76bb,#c8b7e9)",size:"26px 26px,34px 34px,30px 30px,auto"}
]);

function questWallpaperById(id){ return QUEST_WALLPAPERS.find(wallpaper=>wallpaper.id===id) || null; }


const DUCK_LIBRARY = [{"id":"angry-duck","name":"Angry Duck","file":"angry-duck.webp"},{"id":"apple-duck","name":"Apple Duck","file":"apple-duck.webp"},{"id":"bathtime-duck","name":"Bathtime Duck","file":"bathtime-duck.webp"},{"id":"duck-on-skateboard","name":"Duck on a Skateboard","file":"duck-on-skateboard.webp"},{"id":"googly-eye-duck","name":"Googly Eye Duck","file":"googly-eye-duck.webp"},{"id":"long-hair-duck","name":"Long Hair Duck","file":"long-hair-duck.webp"},{"id":"magenta-duck","name":"Magenta Duck","file":"magenta-duck.webp"},{"id":"pile-of-tiny-ducks","name":"Pile of Tiny Ducks","file":"pile-of-tiny-ducks.webp"},{"id":"scarf-duck","name":"Scarf Duck","file":"scarf-duck.webp"},{"id":"vampire-duck","name":"Vampire Duck","file":"vampire-duck.webp"},{"id":"alien-duck","name":"Alien Duck","file":"Alien-duck.webp"},{"id":"angel-duck","name":"Angel Duck","file":"Angel-duck.webp"},{"id":"aqua-duck","name":"Aqua Duck","file":"Aqua-duck.webp"},{"id":"artist-duck","name":"Artist Duck","file":"Artist-duck.webp"},{"id":"black-duck","name":"Black Duck","file":"Black-duck.webp"},{"id":"blue-duck","name":"Blue Duck","file":"Blue-duck.webp"},{"id":"bow-duck","name":"Bow Duck","file":"Bow-duck.webp"},{"id":"bronze-duck","name":"Bronze Duck","file":"Bronze-duck.webp"},{"id":"bunny-duck","name":"Bunny Duck","file":"Bunny-duck.webp"},{"id":"burger-duck","name":"Burger Duck","file":"Burger-duck.webp"},{"id":"cat-duck","name":"Cat Duck","file":"Cat-duck.webp"},{"id":"cool-duck","name":"Cool Duck","file":"Cool-duck.webp"},{"id":"cosmic-duck","name":"Cosmic Duck","file":"Cosmic-duck.webp"},{"id":"cupcake-duck","name":"Cupcake Duck","file":"Cupcake-duck.webp"},{"id":"dark-red-duck","name":"Dark Red Duck","file":"Dark-red-duck.webp"},{"id":"demon-duck","name":"Demon Duck","file":"Demon-duck.webp"},{"id":"doctor-duck","name":"Doctor Duck","file":"Doctor-duck.webp"},{"id":"duck-with-a-knife","name":"Duck with a Knife","file":"Duck-with-a-knife.webp"},{"id":"duckvee","name":"Duckvee","file":"Duckvee.webp"},{"id":"fancy-duck","name":"Fancy Duck","file":"Fancy-duck.webp"},{"id":"flower-duck","name":"Flower Duck","file":"Flower-duck.webp"},{"id":"gamer-duck","name":"Gamer Duck","file":"Gamer-duck.webp"},{"id":"ghost-duck","name":"Ghost Duck","file":"Ghost-duck.webp"},{"id":"glitter-duck","name":"Glitter Duck","file":"Glitter-duck.webp"},{"id":"golden-duck","name":"Golden Duck","file":"Golden-duck.webp"},{"id":"goose","name":"Goose","file":"Goose.webp"},{"id":"green-duck","name":"Green Duck","file":"Green-duck.webp"},{"id":"grey-duck","name":"Grey Duck","file":"Grey-duck.webp"},{"id":"gummy-duck","name":"Gummy Duck","file":"Gummy-duck.webp"},{"id":"jester-duck","name":"Jester Duck","file":"Jester-duck.webp"},{"id":"kidcore-duck","name":"Kidcore Duck","file":"Kidcore-duck.webp"},{"id":"king-duck","name":"King Duck","file":"King-duck.webp"},{"id":"knitted-duck","name":"Knitted Duck","file":"Knitted-duck.webp"},{"id":"lemon-duck","name":"Lemon Duck","file":"Lemon-duck.webp"},{"id":"lime-duck","name":"Lime Duck","file":"Lime-duck.webp"},{"id":"magical-girl-duck","name":"Magical Girl Duck","file":"Magical-girl-duck.webp"},{"id":"mint-duck","name":"Mint Duck","file":"Mint-duck.webp"},{"id":"mushroom-duck","name":"Mushroom Duck","file":"Mushroom-duck.webp"},{"id":"miko-duck","name":"Miko Duck","file":"miko-duck.webp"},{"id":"io-duck","name":"Io Duck","file":"io-duck.webp"},{"id":"miho-duck","name":"Miho Duck","file":"miho-duck.webp"},{"id":"annika-duck","name":"Annika Duck","file":"annika-duck.png"},{"id":"orange-duck","name":"Orange Duck","file":"Orange-duck.webp"},{"id":"party-hat-duck","name":"Party Hat Duck","file":"Party-hat-duck.webp"},{"id":"peach-duck","name":"Peach Duck","file":"Peach-duck.webp"},{"id":"peep-duck","name":"Peep Duck","file":"peep-duck.webp"},{"id":"periwinkle-duck","name":"Periwinkle Duck","file":"Periwinkle-duck.webp"},{"id":"pink-duck","name":"Pink Duck","file":"Pink-duck.webp"},{"id":"pizza-duck","name":"Pizza Duck","file":"Pizza-duck.webp"},{"id":"plush-duck","name":"Plush Duck","file":"Plush-duck.webp"},{"id":"pompompurin-duck","name":"Pompompurin Duck","file":"Pompompurin-duck.webp"},{"id":"purple-duck","name":"Purple Duck","file":"Purple-duck.webp"},{"id":"rainbow-duck","name":"Rainbow Duck","file":"Rainbow-duck.webp"},{"id":"red-duck","name":"Red Duck","file":"Red-duck.webp"},{"id":"silver-duck","name":"Silver Duck","file":"Silver-duck.webp"},{"id":"sky-blue-duck","name":"Sky Blue Duck","file":"Sky-blue-duck.webp"},{"id":"sleepy-time-duck","name":"Sleepy Time Duck","file":"Sleepy-time-duck.webp"},{"id":"standard-duck","name":"Standard Duck","file":"Standard-duck.webp"},{"id":"strawberry-duck","name":"Strawberry Duck","file":"Strawberry-duck.webp"},{"id":"tiny-duck-stack","name":"Tiny Duck Stack","file":"Tiny-duck-stack.webp"},{"id":"tiny-duck","name":"Tiny Duck","file":"Tiny-duck.webp"},{"id":"top-hat-duck","name":"Top Hat Duck","file":"Top-hat-duck.webp"},{"id":"violet-duck","name":"Violet Duck","file":"Violet-duck.webp"},{"id":"watermelon-duck","name":"Watermelon Duck","file":"Watermelon-duck.webp"},{"id":"white-duck","name":"White Duck","file":"White-duck.webp"}];

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
  },
  {
    id: "activate-zoomies",
    name: "Activate Zoomies!",
    unlock: 50,
    type: "buff",
    attackBoost: 0.50,
    duration: 3,
    sprite: "assets/characters/peep/base/final-move.webp",
    description: "Peep gets the zoomies! Raise Attack by 50% for 3 turns."
  },
  {
    id: "just-a-smack",
    name: "Just a smack!",
    unlock: 1,
    type: "safe-chip",
    sprite: "assets/characters/peep/base/attack.webp",
    description: "Deals normal basic-attack damage, but can never knock an enemy below 1 HP. Perfect for catching!"
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
  },
  {
    id: "thoughts-of-lovers",
    name: "Thoughts of Lovers!",
    unlock: 50,
    type: "full-heal-buff",
    attackBoost: 0.50,
    duration: 4,
    oncePerBattle: true,
    sprite: "assets/characters/miko/base/smug.webp",
    description: "Fully heal Miko and raise Attack by 50% for 4 turns. Once per battle."
  },
  {
    id: "just-a-smack",
    name: "Just a smack!",
    unlock: 1,
    type: "safe-chip",
    sprite: "assets/characters/miko/base/mock.webp",
    description: "Deals normal basic-attack damage, but can never knock an enemy below 1 HP. Perfect for catching!"
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
  },
  {
    id:"magic-hangover", name:"Magic Hangover!", unlock:50, type:"self-damage-buff",
    selfDamage:10, attackBoost:0.50, duration:4,
    sprite:"assets/characters/io/base/magic-juice.webp",
    description:"Lose up to 10 HP, but raise Io's Attack by 50% for 4 turns. Cannot knock Io out."
  },
  {
    id:"just-a-smack", name:"Just a smack!", unlock:1, type:"safe-chip",
    sprite:"assets/characters/io/base/heart-ray.webp",
    description:"Deals normal basic-attack damage, but can never knock an enemy below 1 HP. Perfect for catching!"
  }
];

const MIHO_SKILLS = [
  {
    id:"threaten", name:"Threaten", unlock:1, type:"damage", multiplier:1.0,
    sprite:"assets/characters/miho/base/threaten.webp",
    description:"Miho smacks! Deals normal damage."
  },
  {
    id:"magic", name:"Magic", unlock:10, type:"damage-burn", multiplier:1.0, burnChance:1, burnDamagePercent:0.08, burnTurns:99,
    sprite:"assets/characters/miho/base/spell.webp",
    description:"A strong magic spell! Deals normal damage, and burns the enemy, causing it to lose HP slowly at the end of its turn."
  },
  {
    id:"fluster", name:"Fluster", unlock:25, type:"buff", attackBoost:0.60, duration:4, missChance:0.20,
    sprite:"assets/characters/miho/base/fluster.webp",
    description:"The enemy flusters Miho. Her Attack goes up a lot, but while flustered she has a 20% chance to miss."
  },
  {
    id:"stab", name:"Stab", unlock:40, type:"multi-hit", multiplier:3.0, hits:3,
    sprite:"assets/characters/miho/base/stab.webp",
    description:"Miho stabs 3 times, causing normal damage 3 times in a row."
  },
  {
    id:"just-a-smack", name:"Just a smack!", unlock:1, type:"safe-chip",
    sprite:"assets/characters/miho/base/threaten.webp",
    description:"Deals normal basic-attack damage, but can never knock an enemy below 1 HP. Perfect for catching!"
  }
];

const ANNIKA_SKILLS = [
  {
    id:"scold", name:"Scold", unlock:1, type:"damage", multiplier:1.0,
    sprite:"assets/characters/annika/base/scold.webp",
    description:"A sharp scolding that deals normal damage."
  },
  {
    id:"stop", name:"Stop!", unlock:10, type:"stun", duration:2, cooldown:4,
    sprite:"assets/characters/annika/base/stop.webp",
    description:"Freeze the enemy so it cannot act for 2 turns."
  },
  {
    id:"flustered", name:"Flustered", unlock:25, type:"buff", attackBoost:0.65, duration:4, missChance:0.10,
    sprite:"assets/characters/annika/base/flustered.webp",
    description:"Annika gets flustered! Attack spikes by 65% for 4 turns, with a small 10% chance to miss."
  },
  {
    id:"high-kick", name:"High Kick!", unlock:50, type:"damage", multiplier:1.75, cooldown:2,
    sprite:"assets/characters/annika/base/high-kick.webp",
    description:"A powerful kick that deals much more damage than Scold."
  },
  {
    id:"just-a-smack", name:"Just a smack!", unlock:1, type:"safe-chip",
    sprite:"assets/characters/annika/base/stop.webp",
    description:"Deals normal basic-attack damage, but can never knock an enemy below 1 HP. Perfect for catching!"
  }
];

function activeSkills(){
  if(activeCharacterId === "miko") return MIKO_SKILLS;
  if(activeCharacterId === "io") return IO_SKILLS;
  if(activeCharacterId === "miho") return MIHO_SKILLS;
  if(activeCharacterId === "annika") return ANNIKA_SKILLS;
  return PEEP_SKILLS;
}

function skillTypeGroup(skill){
  if(!skill) return 9;
  if(["damage","damage-burn","multi-hit","safe-chip"].includes(skill.type)) return 0;
  if(["buff","full-heal-buff","self-damage-buff","stun"].includes(skill.type)) return 1;
  if(["heal","full-heal"].includes(skill.type)) return 2;
  return 1;
}

function sortedActiveSkills(){
  return activeSkills()
    .map((skill,index)=>({skill,index}))
    .sort((a,b)=>skillTypeGroup(a.skill)-skillTypeGroup(b.skill) || a.index-b.index)
    .map(entry=>entry.skill);
}

function isStatusSkill(skill){
  return Boolean(skill && ["buff","full-heal-buff","self-damage-buff","stun"].includes(skill.type));
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
    idle:["assets/enemies/acorn-mouse/base/acorn-mouse-idle-1.webp","assets/enemies/acorn-mouse/base/acorn-mouse-idle-2.webp"],
    hurt:"assets/enemies/acorn-mouse/base/acorn-mouse-hurt.webp", speed:335
  },
  "seaunicorn": {
    name: "Seaunicorn", hp: 30, attack: 6, exp: 33, coinMin: 9, coinMax: 15,
    idle:["assets/enemies/seaunicorn/base/seaunicorn-idle-1.webp","assets/enemies/seaunicorn/base/seaunicorn-idle-2.webp"],
    hurt:"assets/enemies/seaunicorn/base/seaunicorn-hurt.webp", speed:385
  },
  "tree-squirrel": {
    name: "Tree Squirrel", hp: 56, attack: 6, exp: 58, coinMin: 19, coinMax: 29,
    idle:["assets/bosses/tree-squirrel/base/tree-squirrel-idle-1.webp","assets/bosses/tree-squirrel/base/tree-squirrel-idle-2.webp"],
    hurt:"assets/bosses/tree-squirrel/base/tree-squirrel-hurt.webp", speed:430, boss:true
  },
  "jellybun": {
    name: "Jellybun", hp: 72, attack: 8, exp: 76, coinMin: 26, coinMax: 40,
    idle:["assets/bosses/jellybun/base/jellybun-idle-1.webp","assets/bosses/jellybun/base/jellybun-idle-2.webp"],
    hurt:"assets/bosses/jellybun/base/jellybun-hurt.webp", speed:405, boss:true
  },
  "catterpillar": {
    name:"Catterpillar", hp:21, attack:4, exp:22, coinMin:6, coinMax:11,
    idle:["assets/enemies/catterpillar/base/idle-1.png","assets/enemies/catterpillar/base/idle-2.png"],
    hurt:"assets/enemies/catterpillar/base/hurt.png", speed:360
  },
  "sea-star": {
    name:"Sea Star", hp:31, attack:6, exp:34, coinMin:10, coinMax:16,
    idle:["assets/enemies/sea-star/base/idle-1.png","assets/enemies/sea-star/base/idle-2.png"],
    hurt:"assets/enemies/sea-star/base/hurt.png", speed:390
  },
  "star-mouse": {
    name:"Star Mouse", hp:34, attack:6, exp:36, coinMin:10, coinMax:17,
    idle:["assets/enemies/star-mouse/base/idle-1.png","assets/enemies/star-mouse/base/idle-2.png"],
    hurt:"assets/enemies/star-mouse/base/hurt.png", speed:340
  },
  "puff-fairy": {
    name:"Puff Fairy", hp:36, attack:7, exp:38, coinMin:11, coinMax:18,
    idle:["assets/enemies/puff-fairy/base/idle-1.png","assets/enemies/puff-fairy/base/idle-2.png"],
    hurt:"assets/enemies/puff-fairy/base/hurt.png", speed:360
  },
  "tulipa": {
    name:"Tulipa", hp:40, attack:7, exp:42, coinMin:12, coinMax:19,
    idle:["assets/enemies/tulipa/base/idle-1.png","assets/enemies/tulipa/base/idle-2.png"],
    hurt:"assets/enemies/tulipa/base/hurt.png", speed:380
  },
  "snoud": {
    name:"Snoud", hp:43, attack:8, exp:45, coinMin:13, coinMax:20,
    idle:["assets/enemies/snoud/base/idle-1.png","assets/enemies/snoud/base/idle-2.png"],
    hurt:"assets/enemies/snoud/base/hurt.png", speed:410
  },
  "cloud-bunny": {
    name:"Cloud Bunny", hp:48, attack:9, exp:50, coinMin:15, coinMax:23,
    idle:["assets/enemies/cloud-bunny/base/idle-1.png","assets/enemies/cloud-bunny/base/idle-2.png"],
    hurt:"assets/enemies/cloud-bunny/base/hurt.png", speed:355
  },
  "lunar-moth": {
    name:"Lunar Moth", hp:46, attack:9, exp:52, coinMin:15, coinMax:24,
    idle:["assets/enemies/lunar-moth/base/idle-1.png","assets/enemies/lunar-moth/base/idle-2.png"],
    hurt:"assets/enemies/lunar-moth/base/hurt.png", speed:330
  },
  "aries": {
    name:"Aries", hp:98, attack:11, exp:105, coinMin:36, coinMax:54,
    idle:["assets/bosses/aries/base/idle-1.png","assets/bosses/aries/base/idle-2.png"],
    hurt:"assets/bosses/aries/base/hurt.png", speed:410, boss:true
  },
  "cherub-duck": {
    name:"Cherub Duck", hp:104, attack:10, exp:110, coinMin:38, coinMax:56,
    idle:["assets/bosses/cherub-duck/base/idle-1.png","assets/bosses/cherub-duck/base/idle-2.png"],
    hurt:"assets/bosses/cherub-duck/base/hurt.png", speed:395, boss:true
  },
  "apple-baby": {
    name:"Apple Baby", hp:39, attack:7, exp:42, coinMin:12, coinMax:19,
    idle:["assets/enemies/apple-baby/base/idle-1.webp","assets/enemies/apple-baby/base/idle-2.webp"],
    hurt:"assets/enemies/apple-baby/base/hurt.webp", speed:350
  },
  "gummy-worm": {
    name:"Gummy Worm", hp:42, attack:8, exp:45, coinMin:13, coinMax:20,
    idle:["assets/enemies/gummy-worm/base/idle-1.webp","assets/enemies/gummy-worm/base/idle-2.webp"],
    hurt:"assets/enemies/gummy-worm/base/hurt.webp", speed:330
  },
  "pudding-pig": {
    name:"Pudding Pig", hp:47, attack:8, exp:49, coinMin:14, coinMax:22,
    idle:["assets/enemies/pudding-pig/base/idle-1.webp","assets/enemies/pudding-pig/base/idle-2.webp"],
    hurt:"assets/enemies/pudding-pig/base/hurt.webp", speed:390
  },
  "gingerlolly": {
    name:"Gingerlolly", hp:45, attack:9, exp:50, coinMin:15, coinMax:23,
    idle:["assets/enemies/gingerlolly/base/idle-1.webp","assets/enemies/gingerlolly/base/idle-2.webp"],
    hurt:"assets/enemies/gingerlolly/base/hurt.webp", speed:365
  },
  "candycane-deer": {
    name:"Candycane Deer", hp:53, attack:10, exp:56, coinMin:17, coinMax:26,
    idle:["assets/enemies/candycane-deer/base/idle-1.webp","assets/enemies/candycane-deer/base/idle-2.webp"],
    hurt:"assets/enemies/candycane-deer/base/hurt.webp", speed:385
  },
  "gummy-shark": {
    name:"Gummy Shark", hp:91, attack:11, exp:98, coinMin:33, coinMax:50,
    idle:["assets/bosses/gummy-shark/base/idle-1.webp","assets/bosses/gummy-shark/base/idle-2.webp"],
    hurt:"assets/bosses/gummy-shark/base/hurt.webp", speed:390, boss:true
  },
  "cream-fox": {
    name:"Cream Fox", hp:95, attack:10, exp:102, coinMin:35, coinMax:52,
    idle:["assets/bosses/cream-fox/base/idle-1.webp","assets/bosses/cream-fox/base/idle-2.webp"],
    hurt:"assets/bosses/cream-fox/base/hurt.webp", speed:405, boss:true
  }
};






function weightedOceanVariant(rank, ids) {
  const r=Math.max(1,Number(rank)||1);
  let weights;
  if(r<=12) weights=[100,0,0,0,0];
  else if(r<=24) weights=[60,40,0,0,0];
  else if(r<=38) weights=[20,50,30,0,0];
  else if(r<=56) weights=[0,25,35,40,0];
  else if(r<=70) weights=[0,0,25,50,25];
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

  if (r <=4) {
    pool = [["white", 100]];
  } else if (r <=8) {
    pool = [["white", 60], ["pink", 40]];
  } else if (r <=12) {
    pool = [["white", 20], ["pink", 50], ["orange", 30]];
  } else if (r <=18) {
    pool = [["pink", 25], ["orange", 35], ["blue", 40]];
  } else if (r <=26) {
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

  if (r <=4) {
    pool = [["pink", 100]];
  } else if (r <=8) {
    pool = [["pink", 60], ["purple", 40]];
  } else if (r <=12) {
    pool = [["pink", 20], ["purple", 50], ["green", 30]];
  } else if (r <=18) {
    pool = [["purple", 25], ["green", 35], ["teal", 40]];
  } else if (r <=26) {
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

  if (r <=4) {
    pool = [["yellow", 100]];
  } else if (r <=8) {
    pool = [["yellow", 60], ["purple", 40]];
  } else if (r <=12) {
    pool = [["yellow", 20], ["purple", 50], ["blue", 30]];
  } else if (r <=18) {
    pool = [["purple", 25], ["blue", 35], ["pink", 40]];
  } else if (r <=26) {
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
  if(r<=4) pool=[["red",100]];
  else if(r<=8) pool=[["red",60],["purple",40]];
  else if(r<=12) pool=[["red",20],["purple",50],["green",30]];
  else if(r<=18) pool=[["purple",25],["green",35],["grey",40]];
  else if(r<=26) pool=[["green",25],["grey",50],["gold",25]];
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
  if(r<=4) weights=[100,0,0,0,0];
  else if(r<=8) weights=[60,40,0,0,0];
  else if(r<=12) weights=[20,50,30,0,0];
  else if(r<=18) weights=[0,25,35,40,0];
  else if(r<=26) weights=[0,0,25,50,25];
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
  base:{id:"base",name:"Acorn Mouse",hp:1,atk:1,exp:1,coin:1,idle:["assets/enemies/acorn-mouse/base/acorn-mouse-idle-1.webp","assets/enemies/acorn-mouse/base/acorn-mouse-idle-2.webp"],hurt:"assets/enemies/acorn-mouse/base/acorn-mouse-hurt.webp"},
  blue:{id:"blue",name:"Blue Acorn Mouse",hp:1.15,atk:1.08,exp:1.15,coin:1.15,idle:["assets/enemies/acorn-mouse/base/blue-idle-1.webp","assets/enemies/acorn-mouse/base/blue-idle-2.webp"],hurt:"assets/enemies/acorn-mouse/base/blue-hurt.webp"},
  green:{id:"green",name:"Green Acorn Mouse",hp:1.25,atk:1.10,exp:1.22,coin:1.22,idle:["assets/enemies/acorn-mouse/base/green-idle-1.webp","assets/enemies/acorn-mouse/base/green-idle-2.webp"],hurt:"assets/enemies/acorn-mouse/base/green-hurt.webp"},
  purple:{id:"purple",name:"Purple Acorn Mouse",hp:1.4,atk:1.2,exp:1.35,coin:1.35,idle:["assets/enemies/acorn-mouse/base/purple-idle-1.webp","assets/enemies/acorn-mouse/base/purple-idle-2.webp"],hurt:"assets/enemies/acorn-mouse/base/purple-hurt.webp"},
  pink:{id:"pink",name:"Pink Acorn Mouse",hp:1.65,atk:1.28,exp:1.5,coin:1.58,elite:true,idle:["assets/enemies/acorn-mouse/base/pink-idle-1.webp","assets/enemies/acorn-mouse/base/pink-idle-2.webp"],hurt:"assets/enemies/acorn-mouse/base/pink-hurt.webp"}
});
function applyAcornMouseVariant(t,r){return applyFamilyVariant(t,ACORN_MOUSE_VARIANTS,["base","blue","green","purple","pink"],r,"acornMouseVariant",false);}

const SEAUNICORN_VARIANTS=Object.freeze({
  base:{id:"base",name:"Seaunicorn",hp:1,atk:1,exp:1,coin:1,idle:["assets/enemies/seaunicorn/base/seaunicorn-idle-1.webp","assets/enemies/seaunicorn/base/seaunicorn-idle-2.webp"],hurt:"assets/enemies/seaunicorn/base/seaunicorn-hurt.webp"},
  orange:{id:"orange",name:"Orange Seaunicorn",hp:1.18,atk:1.08,exp:1.15,coin:1.15,idle:["assets/enemies/seaunicorn/base/orange-idle-1.webp","assets/enemies/seaunicorn/base/orange-idle-2.webp"],hurt:"assets/enemies/seaunicorn/base/orange-hurt.webp"},
  dark:{id:"dark",name:"Dark Seaunicorn",hp:1.25,atk:1.13,exp:1.24,coin:1.24,idle:["assets/enemies/seaunicorn/base/dark-idle-1.webp","assets/enemies/seaunicorn/base/dark-idle-2.webp"],hurt:"assets/enemies/seaunicorn/base/dark-hurt.webp"},
  pink:{id:"pink",name:"Pink Seaunicorn",hp:1.4,atk:1.2,exp:1.38,coin:1.38,idle:["assets/enemies/seaunicorn/base/pink-idle-1.webp","assets/enemies/seaunicorn/base/pink-idle-2.webp"],hurt:"assets/enemies/seaunicorn/base/pink-hurt.webp"},
  blue:{id:"blue",name:"Blue Seaunicorn",hp:1.68,atk:1.3,exp:1.55,coin:1.62,elite:true,idle:["assets/enemies/seaunicorn/base/blue-idle-1.webp","assets/enemies/seaunicorn/base/blue-idle-2.webp"],hurt:"assets/enemies/seaunicorn/base/blue-hurt.webp"}
});
function applySeaunicornVariant(t,r){return applyFamilyVariant(t,SEAUNICORN_VARIANTS,["base","orange","dark","pink","blue"],r,"seaunicornVariant",true);}

const TREE_SQUIRREL_VARIANTS=Object.freeze({
  base:{id:"base",name:"Tree Squirrel",hp:1,atk:1,exp:1,coin:1,idle:["assets/bosses/tree-squirrel/base/tree-squirrel-idle-1.webp","assets/bosses/tree-squirrel/base/tree-squirrel-idle-2.webp"],hurt:"assets/bosses/tree-squirrel/base/tree-squirrel-hurt.webp"},
  green:{id:"green",name:"Green Tree Squirrel",hp:1.15,atk:1.08,exp:1.15,coin:1.15,idle:["assets/bosses/tree-squirrel/base/green-idle-1.webp","assets/bosses/tree-squirrel/base/green-idle-2.webp"],hurt:"assets/bosses/tree-squirrel/base/green-hurt.webp"},
  yellow:{id:"yellow",name:"Yellow Tree Squirrel",hp:1.25,atk:1.12,exp:1.24,coin:1.24,idle:["assets/bosses/tree-squirrel/base/yellow-idle-1.webp","assets/bosses/tree-squirrel/base/yellow-idle-2.webp"],hurt:"assets/bosses/tree-squirrel/base/yellow-hurt.webp"},
  pink:{id:"pink",name:"Pink Tree Squirrel",hp:1.42,atk:1.2,exp:1.4,coin:1.4,idle:["assets/bosses/tree-squirrel/base/pink-idle-1.webp","assets/bosses/tree-squirrel/base/pink-idle-2.webp"],hurt:"assets/bosses/tree-squirrel/base/pink-hurt.webp"},
  peach:{id:"peach",name:"Peach Tree Squirrel",hp:1.7,atk:1.3,exp:1.7,coin:1.75,elite:true,idle:["assets/bosses/tree-squirrel/base/peach-idle-1.webp","assets/bosses/tree-squirrel/base/peach-idle-2.webp"],hurt:"assets/bosses/tree-squirrel/base/peach-hurt.webp"}
});
function applyTreeSquirrelVariant(t,r){return applyFamilyVariant(t,TREE_SQUIRREL_VARIANTS,["base","green","yellow","pink","peach"],r,"treeSquirrelVariant",false);}

const JELLYBUN_VARIANTS=Object.freeze({
  base:{id:"base",name:"Jellybun",hp:1,atk:1,exp:1,coin:1,idle:["assets/bosses/jellybun/base/jellybun-idle-1.webp","assets/bosses/jellybun/base/jellybun-idle-2.webp"],hurt:"assets/bosses/jellybun/base/jellybun-hurt.webp"},
  pink:{id:"pink",name:"Pink Jellybun",hp:1.18,atk:1.08,exp:1.15,coin:1.15,idle:["assets/bosses/jellybun/base/pink-idle-1.webp","assets/bosses/jellybun/base/pink-idle-2.webp"],hurt:"assets/bosses/jellybun/base/pink-hurt.webp"},
  green:{id:"green",name:"Green Jellybun",hp:1.28,atk:1.13,exp:1.25,coin:1.25,idle:["assets/bosses/jellybun/base/green-idle-1.webp","assets/bosses/jellybun/base/green-idle-2.webp"],hurt:"assets/bosses/jellybun/base/green-hurt.webp"},
  grey:{id:"grey",name:"Grey Jellybun",hp:1.45,atk:1.2,exp:1.42,coin:1.42,idle:["assets/bosses/jellybun/base/grey-idle-1.webp","assets/bosses/jellybun/base/grey-idle-2.webp"],hurt:"assets/bosses/jellybun/base/grey-hurt.webp"},
  gold:{id:"gold",name:"Gold Jellybun",hp:1.72,atk:1.3,exp:1.75,coin:1.8,elite:true,idle:["assets/bosses/jellybun/base/gold-idle-1.webp","assets/bosses/jellybun/base/gold-idle-2.webp"],hurt:"assets/bosses/jellybun/base/gold-hurt.webp"}
});
function applyJellybunVariant(t,r){return applyFamilyVariant(t,JELLYBUN_VARIANTS,["base","pink","green","grey","gold"],r,"jellybunVariant",true);}

function weightedProgressVariant(rank, ids, maxRank){
  const r=Math.max(1,Number(rank)||1);
  if(r<=1 || ids.length<=1) return ids[0];
  const progress=Math.max(0,Math.min(1,(r-1)/Math.max(1,(Number(maxRank)||1)-1)));
  const target=progress*(ids.length-1);
  const weights=ids.map((_,index)=>{
    const distance=Math.abs(index-target);
    if(distance>=2) return 0;
    return Math.max(2,Math.round(100*(1-distance/2)));
  });
  let roll=Math.random()*weights.reduce((sum,value)=>sum+value,0);
  for(let i=0;i<ids.length;i++){ roll-=weights[i]; if(roll<=0) return ids[i]; }
  return ids[Math.min(ids.length-1,Math.round(target))];
}

function applyProgressVariant(template, table, ids, rank, variantProperty, maxRank){
  const id=weightedProgressVariant(rank,ids,maxRank);
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

const CATTERPILLAR_VARIANTS=Object.freeze({
  base:{id:"base",name:"Catterpillar",hp:1,atk:1,exp:1,coin:1,idle:["assets/enemies/catterpillar/base/idle-1.png","assets/enemies/catterpillar/base/idle-2.png"],hurt:"assets/enemies/catterpillar/base/hurt.png"},
  blue:{id:"blue",name:"Blue Catterpillar",hp:1.14,atk:1.07,exp:1.14,coin:1.14,idle:["assets/enemies/catterpillar/base/blue-idle-1.png","assets/enemies/catterpillar/base/blue-idle-2.png"],hurt:"assets/enemies/catterpillar/base/blue-hurt.png"},
  orange:{id:"orange",name:"Orange Catterpillar",hp:1.24,atk:1.11,exp:1.22,coin:1.22,idle:["assets/enemies/catterpillar/base/orange-idle-1.png","assets/enemies/catterpillar/base/orange-idle-2.png"],hurt:"assets/enemies/catterpillar/base/orange-hurt.png"},
  pink:{id:"pink",name:"Pink Catterpillar",hp:1.40,atk:1.19,exp:1.36,coin:1.36,idle:["assets/enemies/catterpillar/base/pink-idle-1.png","assets/enemies/catterpillar/base/pink-idle-2.png"],hurt:"assets/enemies/catterpillar/base/pink-hurt.png"},
  purple:{id:"purple",name:"Purple Catterpillar",hp:1.65,atk:1.28,exp:1.55,coin:1.58,elite:true,idle:["assets/enemies/catterpillar/base/purple-idle-1.png","assets/enemies/catterpillar/base/purple-idle-2.png"],hurt:"assets/enemies/catterpillar/base/purple-hurt.png"}
});
function applyCatterpillarVariant(t,r){return applyProgressVariant(t,CATTERPILLAR_VARIANTS,["base","blue","orange","pink","purple"],r,"catterpillarVariant",40);}

const SEA_STAR_VARIANTS=Object.freeze({
  base:{id:"base",name:"Sea Star",hp:1,atk:1,exp:1,coin:1,idle:["assets/enemies/sea-star/base/idle-1.png","assets/enemies/sea-star/base/idle-2.png"],hurt:"assets/enemies/sea-star/base/hurt.png"},
  blue:{id:"blue",name:"Blue Sea Star",hp:1.14,atk:1.07,exp:1.14,coin:1.14,idle:["assets/enemies/sea-star/base/blue-idle-1.png","assets/enemies/sea-star/base/blue-idle-2.png"],hurt:"assets/enemies/sea-star/base/blue-hurt.png"},
  green:{id:"green",name:"Green Sea Star",hp:1.24,atk:1.11,exp:1.22,coin:1.22,idle:["assets/enemies/sea-star/base/green-idle-1.png","assets/enemies/sea-star/base/green-idle-2.png"],hurt:"assets/enemies/sea-star/base/green-hurt.png"},
  pink:{id:"pink",name:"Pink Sea Star",hp:1.40,atk:1.19,exp:1.36,coin:1.36,idle:["assets/enemies/sea-star/base/pink-idle-1.png","assets/enemies/sea-star/base/pink-idle-2.png"],hurt:"assets/enemies/sea-star/base/pink-hurt.png"},
  purple:{id:"purple",name:"Purple Sea Star",hp:1.65,atk:1.28,exp:1.55,coin:1.58,elite:true,idle:["assets/enemies/sea-star/base/purple-idle-1.png","assets/enemies/sea-star/base/purple-idle-2.png"],hurt:"assets/enemies/sea-star/base/purple-hurt.png"}
});
function applySeaStarVariant(t,r){return applyProgressVariant(t,SEA_STAR_VARIANTS,["base","blue","green","pink","purple"],r,"seaStarVariant",80);}

const STAR_MOUSE_VARIANTS=Object.freeze({
  base:{id:"base",name:"Star Mouse",hp:1,atk:1,exp:1,coin:1,idle:["assets/enemies/star-mouse/base/idle-1.png","assets/enemies/star-mouse/base/idle-2.png"],hurt:"assets/enemies/star-mouse/base/hurt.png"},
  blue:{id:"blue",name:"Blue Star Mouse",hp:1.12,atk:1.06,exp:1.12,coin:1.12,idle:["assets/enemies/star-mouse/base/blue-idle-1.png","assets/enemies/star-mouse/base/blue-idle-2.png"],hurt:"assets/enemies/star-mouse/base/blue-hurt.png"},
  mint:{id:"mint",name:"Mint Star Mouse",hp:1.24,atk:1.11,exp:1.23,coin:1.23,idle:["assets/enemies/star-mouse/base/mint-idle-1.png","assets/enemies/star-mouse/base/mint-idle-2.png"],hurt:"assets/enemies/star-mouse/base/mint-hurt.png"},
  pink:{id:"pink",name:"Pink Star Mouse",hp:1.40,atk:1.19,exp:1.38,coin:1.38,idle:["assets/enemies/star-mouse/base/pink-idle-1.png","assets/enemies/star-mouse/base/pink-idle-2.png"],hurt:"assets/enemies/star-mouse/base/pink-hurt.png"},
  purple:{id:"purple",name:"Purple Star Mouse",hp:1.66,atk:1.28,exp:1.58,coin:1.60,elite:true,idle:["assets/enemies/star-mouse/base/purple-idle-1.png","assets/enemies/star-mouse/base/purple-idle-2.png"],hurt:"assets/enemies/star-mouse/base/purple-hurt.png"}
});
function applyStarMouseVariant(t,r){return applyProgressVariant(t,STAR_MOUSE_VARIANTS,["base","blue","mint","pink","purple"],r,"starMouseVariant",160);}

const PUFF_FAIRY_VARIANTS=Object.freeze({
  base:{id:"base",name:"Puff Fairy",hp:1,atk:1,exp:1,coin:1,idle:["assets/enemies/puff-fairy/base/idle-1.png","assets/enemies/puff-fairy/base/idle-2.png"],hurt:"assets/enemies/puff-fairy/base/hurt.png"},
  pink:{id:"pink",name:"Pink Puff Fairy",hp:1.12,atk:1.06,exp:1.12,coin:1.12,idle:["assets/enemies/puff-fairy/base/pink-idle-1.png","assets/enemies/puff-fairy/base/pink-idle-2.png"],hurt:"assets/enemies/puff-fairy/base/pink-hurt.png"},
  purple:{id:"purple",name:"Purple Puff Fairy",hp:1.24,atk:1.11,exp:1.23,coin:1.23,idle:["assets/enemies/puff-fairy/base/purple-idle-1.png","assets/enemies/puff-fairy/base/purple-idle-2.png"],hurt:"assets/enemies/puff-fairy/base/purple-hurt.png"},
  gold:{id:"gold",name:"Gold Puff Fairy",hp:1.40,atk:1.19,exp:1.38,coin:1.42,idle:["assets/enemies/puff-fairy/base/gold-idle-1.png","assets/enemies/puff-fairy/base/gold-idle-2.png"],hurt:"assets/enemies/puff-fairy/base/gold-hurt.png"},
  dark:{id:"dark",name:"Dark Puff Fairy",hp:1.66,atk:1.28,exp:1.58,coin:1.62,elite:true,idle:["assets/enemies/puff-fairy/base/dark-idle-1.png","assets/enemies/puff-fairy/base/dark-idle-2.png"],hurt:"assets/enemies/puff-fairy/base/dark-hurt.png"}
});
function applyPuffFairyVariant(t,r){return applyProgressVariant(t,PUFF_FAIRY_VARIANTS,["base","pink","purple","gold","dark"],r,"puffFairyVariant",160);}

const TULIPA_VARIANTS=Object.freeze({
  base:{id:"base",name:"Tulipa",hp:1,atk:1,exp:1,coin:1,idle:["assets/enemies/tulipa/base/idle-1.png","assets/enemies/tulipa/base/idle-2.png"],hurt:"assets/enemies/tulipa/base/hurt.png"},
  yellow:{id:"yellow",name:"Yellow Tulipa",hp:1.12,atk:1.06,exp:1.12,coin:1.12,idle:["assets/enemies/tulipa/base/yellow-idle-1.png","assets/enemies/tulipa/base/yellow-idle-2.png"],hurt:"assets/enemies/tulipa/base/yellow-hurt.png"},
  orange:{id:"orange",name:"Orange Tulipa",hp:1.24,atk:1.11,exp:1.23,coin:1.23,idle:["assets/enemies/tulipa/base/orange-idle-1.png","assets/enemies/tulipa/base/orange-idle-2.png"],hurt:"assets/enemies/tulipa/base/orange-hurt.png"},
  purple:{id:"purple",name:"Purple Tulipa",hp:1.40,atk:1.19,exp:1.38,coin:1.38,idle:["assets/enemies/tulipa/base/purple-idle-1.png","assets/enemies/tulipa/base/purple-idle-2.png"],hurt:"assets/enemies/tulipa/base/purple-hurt.png"},
  dark:{id:"dark",name:"Dark Tulipa",hp:1.66,atk:1.28,exp:1.58,coin:1.60,elite:true,idle:["assets/enemies/tulipa/base/dark-idle-1.png","assets/enemies/tulipa/base/dark-idle-2.png"],hurt:"assets/enemies/tulipa/base/dark-hurt.png"}
});
function applyTulipaVariant(t,r){return applyProgressVariant(t,TULIPA_VARIANTS,["base","yellow","orange","purple","dark"],r,"tulipaVariant",160);}

const SNOUD_VARIANTS=Object.freeze({
  base:{id:"base",name:"Snoud",hp:1,atk:1,exp:1,coin:1,idle:["assets/enemies/snoud/base/idle-1.png","assets/enemies/snoud/base/idle-2.png"],hurt:"assets/enemies/snoud/base/hurt.png"},
  green:{id:"green",name:"Green Snoud",hp:1.12,atk:1.06,exp:1.12,coin:1.12,idle:["assets/enemies/snoud/base/green-idle-1.png","assets/enemies/snoud/base/green-idle-2.png"],hurt:"assets/enemies/snoud/base/green-hurt.png"},
  grey:{id:"grey",name:"Grey Snoud",hp:1.24,atk:1.11,exp:1.23,coin:1.23,idle:["assets/enemies/snoud/base/grey-idle-1.png","assets/enemies/snoud/base/grey-idle-2.png"],hurt:"assets/enemies/snoud/base/grey-hurt.png"},
  purple:{id:"purple",name:"Purple Snoud",hp:1.40,atk:1.19,exp:1.38,coin:1.38,idle:["assets/enemies/snoud/base/purple-idle-1.png","assets/enemies/snoud/base/purple-idle-2.png"],hurt:"assets/enemies/snoud/base/purple-hurt.png"},
  gold:{id:"gold",name:"Gold Snoud",hp:1.66,atk:1.28,exp:1.58,coin:1.65,elite:true,idle:["assets/enemies/snoud/base/gold-idle-1.png","assets/enemies/snoud/base/gold-idle-2.png"],hurt:"assets/enemies/snoud/base/gold-hurt.png"}
});
function applySnoudVariant(t,r){return applyProgressVariant(t,SNOUD_VARIANTS,["base","green","grey","purple","gold"],r,"snoudVariant",160);}

const CLOUD_BUNNY_VARIANTS=Object.freeze({
  base:{id:"base",name:"Cloud Bunny",hp:1,atk:1,exp:1,coin:1,idle:["assets/enemies/cloud-bunny/base/idle-1.png","assets/enemies/cloud-bunny/base/idle-2.png"],hurt:"assets/enemies/cloud-bunny/base/hurt.png"},
  grey:{id:"grey",name:"Grey Cloud Bunny",hp:1.12,atk:1.06,exp:1.12,coin:1.12,idle:["assets/enemies/cloud-bunny/base/grey-idle-1.png","assets/enemies/cloud-bunny/base/grey-idle-2.png"],hurt:"assets/enemies/cloud-bunny/base/grey-hurt.png"},
  blue:{id:"blue",name:"Blue Cloud Bunny",hp:1.24,atk:1.11,exp:1.23,coin:1.23,idle:["assets/enemies/cloud-bunny/base/blue-idle-1.png","assets/enemies/cloud-bunny/base/blue-idle-2.png"],hurt:"assets/enemies/cloud-bunny/base/blue-hurt.png"},
  pink:{id:"pink",name:"Pink Cloud Bunny",hp:1.40,atk:1.19,exp:1.38,coin:1.38,idle:["assets/enemies/cloud-bunny/base/pink-idle-1.png","assets/enemies/cloud-bunny/base/pink-idle-2.png"],hurt:"assets/enemies/cloud-bunny/base/pink-hurt.png"},
  black:{id:"black",name:"Black Cloud Bunny",hp:1.66,atk:1.28,exp:1.58,coin:1.60,elite:true,idle:["assets/enemies/cloud-bunny/base/black-idle-1.png","assets/enemies/cloud-bunny/base/black-idle-2.png"],hurt:"assets/enemies/cloud-bunny/base/black-hurt.png"}
});
function applyCloudBunnyVariant(t,r){return applyProgressVariant(t,CLOUD_BUNNY_VARIANTS,["base","grey","blue","pink","black"],r,"cloudBunnyVariant",160);}

const LUNAR_MOTH_VARIANTS=Object.freeze({
  base:{id:"base",name:"Lunar Moth",hp:1,atk:1,exp:1,coin:1,idle:["assets/enemies/lunar-moth/base/idle-1.png","assets/enemies/lunar-moth/base/idle-2.png"],hurt:"assets/enemies/lunar-moth/base/hurt.png"},
  blue:{id:"blue",name:"Blue Lunar Moth",hp:1.12,atk:1.06,exp:1.12,coin:1.12,idle:["assets/enemies/lunar-moth/base/blue-idle-1.png","assets/enemies/lunar-moth/base/blue-idle-2.png"],hurt:"assets/enemies/lunar-moth/base/blue-hurt.png"},
  mint:{id:"mint",name:"Mint Lunar Moth",hp:1.24,atk:1.11,exp:1.23,coin:1.23,idle:["assets/enemies/lunar-moth/base/mint-idle-1.png","assets/enemies/lunar-moth/base/mint-idle-2.png"],hurt:"assets/enemies/lunar-moth/base/mint-hurt.png"},
  pink:{id:"pink",name:"Pink Lunar Moth",hp:1.40,atk:1.19,exp:1.38,coin:1.38,idle:["assets/enemies/lunar-moth/base/pink-idle-1.png","assets/enemies/lunar-moth/base/pink-idle-2.png"],hurt:"assets/enemies/lunar-moth/base/pink-hurt.png"},
  golden:{id:"golden",name:"Golden Lunar Moth",hp:1.66,atk:1.28,exp:1.58,coin:1.65,elite:true,idle:["assets/enemies/lunar-moth/base/golden-idle-1.png","assets/enemies/lunar-moth/base/golden-idle-2.png"],hurt:"assets/enemies/lunar-moth/base/golden-hurt.png"}
});
function applyLunarMothVariant(t,r){return applyProgressVariant(t,LUNAR_MOTH_VARIANTS,["base","blue","mint","pink","golden"],r,"lunarMothVariant",160);}

const ARIES_VARIANTS=Object.freeze({
  base:{id:"base",name:"Aries",hp:1,atk:1,exp:1,coin:1,idle:["assets/bosses/aries/base/idle-1.png","assets/bosses/aries/base/idle-2.png"],hurt:"assets/bosses/aries/base/hurt.png"},
  blue:{id:"blue",name:"Blue Aries",hp:1.11,atk:1.06,exp:1.12,coin:1.12,idle:["assets/bosses/aries/base/blue-idle-1.png","assets/bosses/aries/base/blue-idle-2.png"],hurt:"assets/bosses/aries/base/blue-hurt.png"},
  pink:{id:"pink",name:"Pink Aries",hp:1.22,atk:1.10,exp:1.22,coin:1.22,idle:["assets/bosses/aries/base/pink-idle-1.png","assets/bosses/aries/base/pink-idle-2.png"],hurt:"assets/bosses/aries/base/pink-hurt.png"},
  purple:{id:"purple",name:"Purple Aries",hp:1.36,atk:1.16,exp:1.34,coin:1.34,idle:["assets/bosses/aries/base/purple-idle-1.png","assets/bosses/aries/base/purple-idle-2.png"],hurt:"assets/bosses/aries/base/purple-hurt.png"},
  gold:{id:"gold",name:"Gold Aries",hp:1.52,atk:1.23,exp:1.49,coin:1.52,idle:["assets/bosses/aries/base/gold-idle-1.png","assets/bosses/aries/base/gold-idle-2.png"],hurt:"assets/bosses/aries/base/gold-hurt.png"},
  galaxy:{id:"galaxy",name:"Galaxy Aries",hp:1.74,atk:1.31,exp:1.70,coin:1.78,elite:true,idle:["assets/bosses/aries/base/galaxy-idle-1.png","assets/bosses/aries/base/galaxy-idle-2.png"],hurt:"assets/bosses/aries/base/galaxy-hurt.png"}
});
function applyAriesVariant(t,r){return applyProgressVariant(t,ARIES_VARIANTS,["base","blue","pink","purple","gold","galaxy"],r,"ariesVariant",160);}

const CHERUB_DUCK_VARIANTS=Object.freeze({
  base:{id:"base",name:"Cherub Duck",hp:1,atk:1,exp:1,coin:1,idle:["assets/bosses/cherub-duck/base/idle-1.png","assets/bosses/cherub-duck/base/idle-2.png"],hurt:"assets/bosses/cherub-duck/base/hurt.png"},
  aqua:{id:"aqua",name:"Aqua Cherub Duck",hp:1.12,atk:1.06,exp:1.12,coin:1.12,idle:["assets/bosses/cherub-duck/base/aqua-idle-1.png","assets/bosses/cherub-duck/base/aqua-idle-2.png"],hurt:"assets/bosses/cherub-duck/base/aqua-hurt.png"},
  mint:{id:"mint",name:"Mint Cherub Duck",hp:1.24,atk:1.11,exp:1.23,coin:1.23,idle:["assets/bosses/cherub-duck/base/mint-idle-1.png","assets/bosses/cherub-duck/base/mint-idle-2.png"],hurt:"assets/bosses/cherub-duck/base/mint-hurt.png"},
  pink:{id:"pink",name:"Pink Cherub Duck",hp:1.42,atk:1.19,exp:1.39,coin:1.39,idle:["assets/bosses/cherub-duck/base/pink-idle-1.png","assets/bosses/cherub-duck/base/pink-idle-2.png"],hurt:"assets/bosses/cherub-duck/base/pink-hurt.png"},
  purple:{id:"purple",name:"Purple Cherub Duck",hp:1.70,atk:1.29,exp:1.64,coin:1.68,elite:true,idle:["assets/bosses/cherub-duck/base/purple-idle-1.png","assets/bosses/cherub-duck/base/purple-idle-2.png"],hurt:"assets/bosses/cherub-duck/base/purple-hurt.png"}
});
function applyCherubDuckVariant(t,r){return applyProgressVariant(t,CHERUB_DUCK_VARIANTS,["base","aqua","mint","pink","purple"],r,"cherubDuckVariant",160);}

const APPLE_BABY_VARIANTS=Object.freeze({
  base:{id:"base",name:"Apple Baby",hp:1,atk:1,exp:1,coin:1,idle:["assets/enemies/apple-baby/base/idle-1.webp","assets/enemies/apple-baby/base/idle-2.webp"],hurt:"assets/enemies/apple-baby/base/hurt.webp"},
  pink:{id:"pink",name:"Pink Apple Baby",hp:1.12,atk:1.06,exp:1.12,coin:1.12,idle:["assets/enemies/apple-baby/base/pink-idle-1.webp","assets/enemies/apple-baby/base/pink-idle-2.webp"],hurt:"assets/enemies/apple-baby/base/pink-hurt.webp"},
  green:{id:"green",name:"Green Apple Baby",hp:1.24,atk:1.11,exp:1.23,coin:1.23,idle:["assets/enemies/apple-baby/base/green-idle-1.webp","assets/enemies/apple-baby/base/green-idle-2.webp"],hurt:"assets/enemies/apple-baby/base/green-hurt.webp"},
  gold:{id:"gold",name:"Gold Apple Baby",hp:1.40,atk:1.19,exp:1.38,coin:1.40,idle:["assets/enemies/apple-baby/base/gold-idle-1.webp","assets/enemies/apple-baby/base/gold-idle-2.webp"],hurt:"assets/enemies/apple-baby/base/gold-hurt.webp"},
  brown:{id:"brown",name:"Caramel Apple Baby",hp:1.66,atk:1.28,exp:1.58,coin:1.62,elite:true,idle:["assets/enemies/apple-baby/base/brown-idle-1.webp","assets/enemies/apple-baby/base/brown-idle-2.webp"],hurt:"assets/enemies/apple-baby/base/brown-hurt.webp"}
});
function applyAppleBabyVariant(t,r){return applyProgressVariant(t,APPLE_BABY_VARIANTS,["base","pink","green","gold","brown"],r,"appleBabyVariant",120);}

const GUMMY_WORM_VARIANTS=Object.freeze({
  base:{id:"base",name:"Gummy Worm",hp:1,atk:1,exp:1,coin:1,idle:["assets/enemies/gummy-worm/base/idle-1.webp","assets/enemies/gummy-worm/base/idle-2.webp"],hurt:"assets/enemies/gummy-worm/base/hurt.webp"},
  orange:{id:"orange",name:"Orange Gummy Worm",hp:1.12,atk:1.06,exp:1.12,coin:1.12,idle:["assets/enemies/gummy-worm/base/orange-idle-1.webp","assets/enemies/gummy-worm/base/orange-idle-2.webp"],hurt:"assets/enemies/gummy-worm/base/orange-hurt.webp"},
  red:{id:"red",name:"Red Gummy Worm",hp:1.24,atk:1.11,exp:1.23,coin:1.23,idle:["assets/enemies/gummy-worm/base/red-idle-1.webp","assets/enemies/gummy-worm/base/red-idle-2.webp"],hurt:"assets/enemies/gummy-worm/base/red-hurt.webp"},
  purple:{id:"purple",name:"Purple Gummy Worm",hp:1.40,atk:1.19,exp:1.38,coin:1.40,idle:["assets/enemies/gummy-worm/base/purple-idle-1.webp","assets/enemies/gummy-worm/base/purple-idle-2.webp"],hurt:"assets/enemies/gummy-worm/base/purple-hurt.webp"},
  white:{id:"white",name:"White Gummy Worm",hp:1.66,atk:1.28,exp:1.58,coin:1.62,elite:true,idle:["assets/enemies/gummy-worm/base/white-idle-1.webp","assets/enemies/gummy-worm/base/white-idle-2.webp"],hurt:"assets/enemies/gummy-worm/base/white-hurt.webp"}
});
function applyGummyWormVariant(t,r){return applyProgressVariant(t,GUMMY_WORM_VARIANTS,["base","orange","red","purple","white"],r,"gummyWormVariant",120);}

const PUDDING_PIG_VARIANTS=Object.freeze({
  base:{id:"base",name:"Pudding Pig",hp:1,atk:1,exp:1,coin:1,idle:["assets/enemies/pudding-pig/base/idle-1.webp","assets/enemies/pudding-pig/base/idle-2.webp"],hurt:"assets/enemies/pudding-pig/base/hurt.webp"},
  pink:{id:"pink",name:"Pink Pudding Pig",hp:1.12,atk:1.06,exp:1.12,coin:1.12,idle:["assets/enemies/pudding-pig/base/pink-idle-1.webp","assets/enemies/pudding-pig/base/pink-idle-2.webp"],hurt:"assets/enemies/pudding-pig/base/pink-hurt.webp"},
  choco:{id:"choco",name:"Chocolate Pudding Pig",hp:1.24,atk:1.11,exp:1.23,coin:1.23,idle:["assets/enemies/pudding-pig/base/choco-idle-1.webp","assets/enemies/pudding-pig/base/choco-idle-2.webp"],hurt:"assets/enemies/pudding-pig/base/choco-hurt.webp"},
  mint:{id:"mint",name:"Mint Pudding Pig",hp:1.40,atk:1.19,exp:1.38,coin:1.40,idle:["assets/enemies/pudding-pig/base/mint-idle-1.webp","assets/enemies/pudding-pig/base/mint-idle-2.webp"],hurt:"assets/enemies/pudding-pig/base/mint-hurt.webp"},
  blueberry:{id:"blueberry",name:"Blueberry Pudding Pig",hp:1.66,atk:1.28,exp:1.58,coin:1.62,elite:true,idle:["assets/enemies/pudding-pig/base/blueberry-idle-1.webp","assets/enemies/pudding-pig/base/blueberry-idle-2.webp"],hurt:"assets/enemies/pudding-pig/base/blueberry-hurt.webp"}
});
function applyPuddingPigVariant(t,r){return applyProgressVariant(t,PUDDING_PIG_VARIANTS,["base","pink","choco","mint","blueberry"],r,"puddingPigVariant",120);}

const GINGERLOLLY_VARIANTS=Object.freeze({
  base:{id:"base",name:"Gingerlolly",hp:1,atk:1,exp:1,coin:1,idle:["assets/enemies/gingerlolly/base/idle-1.webp","assets/enemies/gingerlolly/base/idle-2.webp"],hurt:"assets/enemies/gingerlolly/base/hurt.webp"},
  green:{id:"green",name:"Green Gingerlolly",hp:1.12,atk:1.06,exp:1.12,coin:1.12,idle:["assets/enemies/gingerlolly/base/green-idle-1.webp","assets/enemies/gingerlolly/base/green-idle-2.webp"],hurt:"assets/enemies/gingerlolly/base/green-hurt.webp"},
  yellow:{id:"yellow",name:"Yellow Gingerlolly",hp:1.24,atk:1.11,exp:1.23,coin:1.23,idle:["assets/enemies/gingerlolly/base/yellow-idle-1.webp","assets/enemies/gingerlolly/base/yellow-idle-2.webp"],hurt:"assets/enemies/gingerlolly/base/yellow-hurt.webp"},
  purple:{id:"purple",name:"Purple Gingerlolly",hp:1.40,atk:1.19,exp:1.38,coin:1.40,idle:["assets/enemies/gingerlolly/base/purple-idle-1.webp","assets/enemies/gingerlolly/base/purple-idle-2.webp"],hurt:"assets/enemies/gingerlolly/base/purple-hurt.webp"},
  blue:{id:"blue",name:"Blue Gingerlolly",hp:1.66,atk:1.28,exp:1.58,coin:1.62,elite:true,idle:["assets/enemies/gingerlolly/base/blue-idle-1.webp","assets/enemies/gingerlolly/base/blue-idle-2.webp"],hurt:"assets/enemies/gingerlolly/base/blue-hurt.webp"}
});
function applyGingerlollyVariant(t,r){return applyProgressVariant(t,GINGERLOLLY_VARIANTS,["base","green","yellow","purple","blue"],r,"gingerlollyVariant",120);}

const CANDYCANE_DEER_VARIANTS=Object.freeze({
  base:{id:"base",name:"Candycane Deer",hp:1,atk:1,exp:1,coin:1,idle:["assets/enemies/candycane-deer/base/idle-1.webp","assets/enemies/candycane-deer/base/idle-2.webp"],hurt:"assets/enemies/candycane-deer/base/hurt.webp"},
  mintchoco:{id:"mintchoco",name:"Mint Choco Candycane Deer",hp:1.12,atk:1.06,exp:1.12,coin:1.12,idle:["assets/enemies/candycane-deer/base/mintchoco-idle-1.webp","assets/enemies/candycane-deer/base/mintchoco-idle-2.webp"],hurt:"assets/enemies/candycane-deer/base/mintchoco-hurt.webp"},
  bubblegum:{id:"bubblegum",name:"Bubblegum Candycane Deer",hp:1.24,atk:1.11,exp:1.23,coin:1.23,idle:["assets/enemies/candycane-deer/base/bubblegum-idle-1.webp","assets/enemies/candycane-deer/base/bubblegum-idle-2.webp"],hurt:"assets/enemies/candycane-deer/base/bubblegum-hurt.webp"},
  xmas:{id:"xmas",name:"Christmas Candycane Deer",hp:1.40,atk:1.19,exp:1.38,coin:1.40,idle:["assets/enemies/candycane-deer/base/xmas-idle-1.webp","assets/enemies/candycane-deer/base/xmas-idle-2.webp"],hurt:"assets/enemies/candycane-deer/base/xmas-hurt.webp"},
  yellow:{id:"yellow",name:"Yellow Candycane Deer",hp:1.66,atk:1.28,exp:1.58,coin:1.62,elite:true,idle:["assets/enemies/candycane-deer/base/yellow-idle-1.webp","assets/enemies/candycane-deer/base/yellow-idle-2.webp"],hurt:"assets/enemies/candycane-deer/base/yellow-hurt.webp"}
});
function applyCandycaneDeerVariant(t,r){return applyProgressVariant(t,CANDYCANE_DEER_VARIANTS,["base","mintchoco","bubblegum","xmas","yellow"],r,"candycaneDeerVariant",120);}

const GUMMY_SHARK_VARIANTS=Object.freeze({
  base:{id:"base",name:"Gummy Shark",hp:1,atk:1,exp:1,coin:1,idle:["assets/bosses/gummy-shark/base/idle-1.webp","assets/bosses/gummy-shark/base/idle-2.webp"],hurt:"assets/bosses/gummy-shark/base/hurt.webp"},
  lemon:{id:"lemon",name:"Lemon Gummy Shark",hp:1.11,atk:1.06,exp:1.12,coin:1.12,idle:["assets/bosses/gummy-shark/base/lemon-idle-1.webp","assets/bosses/gummy-shark/base/lemon-idle-2.webp"],hurt:"assets/bosses/gummy-shark/base/lemon-hurt.webp"},
  orange:{id:"orange",name:"Orange Gummy Shark",hp:1.22,atk:1.10,exp:1.22,coin:1.22,idle:["assets/bosses/gummy-shark/base/orange-idle-1.webp","assets/bosses/gummy-shark/base/orange-idle-2.webp"],hurt:"assets/bosses/gummy-shark/base/orange-hurt.webp"},
  lime:{id:"lime",name:"Lime Gummy Shark",hp:1.36,atk:1.16,exp:1.34,coin:1.34,idle:["assets/bosses/gummy-shark/base/lime-idle-1.webp","assets/bosses/gummy-shark/base/lime-idle-2.webp"],hurt:"assets/bosses/gummy-shark/base/lime-hurt.webp"},
  strawberry:{id:"strawberry",name:"Strawberry Gummy Shark",hp:1.62,atk:1.28,exp:1.62,coin:1.68,elite:true,idle:["assets/bosses/gummy-shark/base/strawberry-idle-1.webp","assets/bosses/gummy-shark/base/strawberry-idle-2.webp"],hurt:"assets/bosses/gummy-shark/base/strawberry-hurt.webp"}
});
function applyGummySharkVariant(t,r){return applyProgressVariant(t,GUMMY_SHARK_VARIANTS,["base","lemon","orange","lime","strawberry"],r,"gummySharkVariant",120);}

const CREAM_FOX_VARIANTS=Object.freeze({
  base:{id:"base",name:"Cream Fox",hp:1,atk:1,exp:1,coin:1,idle:["assets/bosses/cream-fox/base/idle-1.webp","assets/bosses/cream-fox/base/idle-2.webp"],hurt:"assets/bosses/cream-fox/base/hurt.webp"},
  choco:{id:"choco",name:"Chocolate Cream Fox",hp:1.11,atk:1.06,exp:1.12,coin:1.12,idle:["assets/bosses/cream-fox/base/choco-idle-1.webp","assets/bosses/cream-fox/base/choco-idle-2.webp"],hurt:"assets/bosses/cream-fox/base/choco-hurt.webp"},
  strawberry:{id:"strawberry",name:"Strawberry Cream Fox",hp:1.22,atk:1.10,exp:1.22,coin:1.22,idle:["assets/bosses/cream-fox/base/strawberry-idle-1.webp","assets/bosses/cream-fox/base/strawberry-idle-2.webp"],hurt:"assets/bosses/cream-fox/base/strawberry-hurt.webp"},
  lemon:{id:"lemon",name:"Lemon Cream Fox",hp:1.36,atk:1.16,exp:1.34,coin:1.34,idle:["assets/bosses/cream-fox/base/lemon-idle-1.webp","assets/bosses/cream-fox/base/lemon-idle-2.webp"],hurt:"assets/bosses/cream-fox/base/lemon-hurt.webp"},
  chocomint:{id:"chocomint",name:"Choco Mint Cream Fox",hp:1.62,atk:1.28,exp:1.62,coin:1.68,elite:true,idle:["assets/bosses/cream-fox/base/chocomint-idle-1.webp","assets/bosses/cream-fox/base/chocomint-idle-2.webp"],hurt:"assets/bosses/cream-fox/base/chocomint-hurt.webp"}
});
function applyCreamFoxVariant(t,r){return applyProgressVariant(t,CREAM_FOX_VARIANTS,["base","choco","strawberry","lemon","chocomint"],r,"creamFoxVariant",120);}

const BASE_SHINY_RATE = 1 / 500; // audited v56: exactly one normal shiny roll per encountered enemy
const MYSTERY_CHEST_RATE = 1 / 50;

const CHARM_SLOT_LIMIT = 3;
const CURRENT_DUCKIPEDIA_TOTAL = 74;
const CHARM_FAMILY_ORDER = Object.freeze(["shimmer","fortune","best-friend","training","vitality","treasure"]);
const CHARM_FAMILIES = Object.freeze({
  shimmer:{name:"Shimmer Charm",description:"Raises Shiny odds above the normal 1 / 500 rate.",family:"shimmer"},
  fortune:{name:"Fortune Charm",description:"Earn more Pink Coins and improve ordinary item quality.",family:"fortune"},
  "best-friend":{name:"Best Friend Charm",description:"Adds percentage points to compatible Buddy Pon catch chances.",family:"best-friend"},
  training:{name:"Training Charm",description:"Earn more EXP from Duck Quest rewards.",family:"training"},
  vitality:{name:"Vitality Charm",description:"Raises this OC's maximum HP for the entire run.",family:"vitality"},
  treasure:{name:"Treasure Charm",description:"Sometimes adds an extra rare-leaning item to a treasure chest.",family:"treasure"}
});
const CHARM_DEFS = Object.freeze({
  "shimmer-bronze":{id:"shimmer-bronze",family:"shimmer",tier:"bronze",name:"Bronze Shimmer Charm",price:350,shinyRate:1/400,effect:"Shiny chance: 1 / 400"},
  "shimmer-silver":{id:"shimmer-silver",family:"shimmer",tier:"silver",name:"Silver Shimmer Charm",price:1100,shinyRate:1/300,effect:"Shiny chance: 1 / 300"},
  "shimmer-gold":{id:"shimmer-gold",family:"shimmer",tier:"gold",name:"Gold Shimmer Charm",price:3500,shinyRate:1/200,effect:"Shiny chance: 1 / 200"},
  "shimmer-rose-gold":{id:"shimmer-rose-gold",family:"shimmer",tier:"rose-gold",name:"Rose-Gold Shimmer Charm",price:null,shinyRate:1/100,effect:"Shiny chance: 1 / 100",special:true},
  "fortune-bronze":{id:"fortune-bronze",family:"fortune",tier:"bronze",name:"Bronze Fortune Charm",price:250,coinBonus:.10,itemLuck:.10,effect:"+10% coins · Small rare-item luck boost"},
  "fortune-silver":{id:"fortune-silver",family:"fortune",tier:"silver",name:"Silver Fortune Charm",price:750,coinBonus:.20,itemLuck:.20,effect:"+20% coins · Medium rare-item luck boost"},
  "fortune-gold":{id:"fortune-gold",family:"fortune",tier:"gold",name:"Gold Fortune Charm",price:2500,coinBonus:.35,itemLuck:.35,effect:"+35% coins · Strong rare-item luck boost"},
  "best-friend-bronze":{id:"best-friend-bronze",family:"best-friend",tier:"bronze",name:"Bronze Best Friend Charm",price:175,catchBonus:.05,effect:"+5 percentage points to compatible catches"},
  "best-friend-silver":{id:"best-friend-silver",family:"best-friend",tier:"silver",name:"Silver Best Friend Charm",price:600,catchBonus:.10,effect:"+10 percentage points to compatible catches"},
  "best-friend-gold":{id:"best-friend-gold",family:"best-friend",tier:"gold",name:"Gold Best Friend Charm",price:2000,catchBonus:.20,effect:"+20 percentage points to compatible catches"},
  "training-bronze":{id:"training-bronze",family:"training",tier:"bronze",name:"Bronze Training Charm",price:200,expBonus:.15,effect:"+15% EXP"},
  "training-silver":{id:"training-silver",family:"training",tier:"silver",name:"Silver Training Charm",price:600,expBonus:.30,effect:"+30% EXP"},
  "training-gold":{id:"training-gold",family:"training",tier:"gold",name:"Gold Training Charm",price:1800,expBonus:.50,effect:"+50% EXP"},
  "vitality-bronze":{id:"vitality-bronze",family:"vitality",tier:"bronze",name:"Bronze Vitality Charm",price:225,hpBonus:.10,effect:"+10% Max HP"},
  "vitality-silver":{id:"vitality-silver",family:"vitality",tier:"silver",name:"Silver Vitality Charm",price:700,hpBonus:.20,effect:"+20% Max HP"},
  "vitality-gold":{id:"vitality-gold",family:"vitality",tier:"gold",name:"Gold Vitality Charm",price:2200,hpBonus:.35,effect:"+35% Max HP"},
  "treasure-bronze":{id:"treasure-bronze",family:"treasure",tier:"bronze",name:"Bronze Treasure Charm",price:275,treasureChance:.15,effect:"15% chance for a bonus rare-leaning chest item"},
  "treasure-silver":{id:"treasure-silver",family:"treasure",tier:"silver",name:"Silver Treasure Charm",price:850,treasureChance:.30,effect:"30% chance for a bonus rare-leaning chest item"},
  "treasure-gold":{id:"treasure-gold",family:"treasure",tier:"gold",name:"Gold Treasure Charm",price:2750,treasureChance:.50,effect:"50% chance for a bonus rare-leaning chest item"}
});

function defaultCharmSave(){
  return {owned:{},equippedByCharacter:{peep:[],miko:[],io:[],miho:[],annika:[]}};
}
function normalizeCharmSave(raw){
  const source=raw&&typeof raw==="object"?raw:{};
  const owned={};
  for(const id of Object.keys(CHARM_DEFS)) if(source.owned?.[id]) owned[id]=true;
  const equippedByCharacter={};
  for(const characterId of ["peep","miko","io","miho","annika"]){
    const incoming=Array.isArray(source.equippedByCharacter?.[characterId])?source.equippedByCharacter[characterId]:[];
    const seenFamilies=new Set();
    equippedByCharacter[characterId]=[];
    for(const id of incoming){
      const def=CHARM_DEFS[id];
      if(!def||!owned[id]||seenFamilies.has(def.family)) continue;
      seenFamilies.add(def.family);
      equippedByCharacter[characterId].push(id);
      if(equippedByCharacter[characterId].length>=CHARM_SLOT_LIMIT) break;
    }
  }
  return {owned,equippedByCharacter};
}

// One rare recolor per enemy family. The special family variant replaces any
// normal recolor at a charm-adjusted rate (base 1/500) and is guaranteed to befriend with any Buddy Pon.
// Amethyst Mimic is intentionally different: it only reveals itself from the
// purple Mystery Chest so the chest keeps its surprise.
const SHINY_VARIANTS = Object.freeze({
  "cat-slime": {
    id:"rainbow", name:"Rainbow Slime Kitty",
    idle:[
      "assets/shinies/rainbow-slime-kitty-idle-1.webp",
      "assets/shinies/rainbow-slime-kitty-idle-2.webp",
      "assets/shinies/rainbow-slime-kitty-idle-3.webp",
      "assets/shinies/rainbow-slime-kitty-idle-2.webp"
    ],
    hurt:"assets/shinies/rainbow-slime-kitty-idle-1.webp"
  },
  "bee": {
    id:"sky", name:"Sky Bee",
    idle:["assets/shinies/sky-bee-idle-1.webp","assets/shinies/sky-bee-idle-2.webp"],
    hurt:"assets/shinies/sky-bee-hurt.webp"
  },
  "flower": {
    id:"midnight", name:"Midnight Bloom",
    idle:["assets/shinies/midnight-bloom-idle-1.webp","assets/shinies/midnight-bloom-idle-2.webp"],
    hurt:"assets/shinies/midnight-bloom-hurt.webp"
  },
  "mushroom-cat": {
    id:"cocoa", name:"Cocoa Mushroom Cat",
    idle:["assets/shinies/cocoa-mushroom-cat-idle-1.webp","assets/shinies/cocoa-mushroom-cat-idle-2.webp"],
    hurt:"assets/shinies/cocoa-mushroom-cat-hurt.webp"
  },
  "mimic": {
    id:"amethyst", name:"Amethyst Mimic",
    idle:["assets/shinies/amethyst-mimic-idle-1.webp","assets/shinies/amethyst-mimic-idle-2.webp"],
    hurt:"assets/shinies/amethyst-mimic-closed.webp"
  },
  "cool-seagull": {
    id:"royal", name:"Royal Seagull",
    idle:["assets/shinies/royal-seagull-idle-1.webp","assets/shinies/royal-seagull-idle-2.webp"],
    hurt:"assets/shinies/royal-seagull-hurt.webp"
  },
  "sea-turtle": {
    id:"ruby", name:"Ruby Shell Turtle",
    idle:["assets/shinies/ruby-shell-turtle-idle-1.webp","assets/shinies/ruby-shell-turtle-idle-2.webp"],
    hurt:"assets/shinies/ruby-shell-turtle-hurt.webp"
  },
  "catfish": {
    id:"bubblegum", name:"Bubblegum Catfish",
    idle:["assets/shinies/bubblegum-catfish-idle-1.webp","assets/shinies/bubblegum-catfish-idle-2.webp"],
    hurt:"assets/shinies/bubblegum-catfish-hurt.webp"
  },
  "vampire-squid": {
    id:"crimson", name:"Crimson Squid",
    idle:["assets/shinies/crimson-squid-idle-1.webp","assets/shinies/crimson-squid-idle-2.webp"],
    hurt:"assets/shinies/crimson-squid-hurt.webp"
  },
  "acorn-mouse": {
    id:"albino", name:"Albino Acorn Mouse",
    idle:["assets/shinies/albino-acorn-mouse-idle-1.webp","assets/shinies/albino-acorn-mouse-idle-2.webp"],
    hurt:"assets/shinies/albino-acorn-mouse-hurt.webp"
  },
  "seaunicorn": {
    id:"aurora", name:"Aurora Seaunicorn",
    idle:["assets/shinies/aurora-seaunicorn-idle-1.webp","assets/shinies/aurora-seaunicorn-idle-2.webp"],
    hurt:"assets/shinies/aurora-seaunicorn-hurt.webp"
  },
  "tree-squirrel": {
    id:"sakura", name:"Sakura Tree Squirrel",
    idle:["assets/shinies/sakura-tree-squirrel-idle-1.webp","assets/shinies/sakura-tree-squirrel-idle-2.webp"],
    hurt:"assets/shinies/sakura-tree-squirrel-hurt.webp"
  },
  "jellybun": {
    id:"rainbow", name:"Rainbow Jellybun",
    idle:["assets/shinies/rainbow-jellybun-idle-1.webp","assets/shinies/rainbow-jellybun-idle-2.webp"],
    hurt:"assets/shinies/rainbow-jellybun-hurt.webp"
  },
  "catterpillar": {id:"shiny",name:"Shiny Catterpillar",idle:["assets/enemies/catterpillar/base/shiny-idle-1.png","assets/enemies/catterpillar/base/shiny-idle-2.png"],hurt:"assets/enemies/catterpillar/base/shiny-hurt.png"},
  "sea-star": {id:"shiny",name:"Shiny Sea Star",idle:["assets/enemies/sea-star/base/shiny-idle-1.png","assets/enemies/sea-star/base/shiny-idle-2.png"],hurt:"assets/enemies/sea-star/base/shiny-hurt.png"},
  "star-mouse": {id:"shiny",name:"Shiny Star Mouse",idle:["assets/enemies/star-mouse/base/shiny-idle-1.png","assets/enemies/star-mouse/base/shiny-idle-2.png"],hurt:"assets/enemies/star-mouse/base/shiny-hurt.png"},
  "puff-fairy": {id:"shiny",name:"Shiny Puff Fairy",idle:["assets/enemies/puff-fairy/base/shiny-idle-1.png","assets/enemies/puff-fairy/base/shiny-idle-2.png"],hurt:"assets/enemies/puff-fairy/base/shiny-hurt.png"},
  "tulipa": {id:"shiny",name:"Shiny Tulipa",idle:["assets/enemies/tulipa/base/shiny-idle-1.png","assets/enemies/tulipa/base/shiny-idle-2.png"],hurt:"assets/enemies/tulipa/base/shiny-hurt.png"},
  "snoud": {id:"shiny",name:"Shiny Snoud",idle:["assets/enemies/snoud/base/shiny-idle-1.png","assets/enemies/snoud/base/shiny-idle-2.png"],hurt:"assets/enemies/snoud/base/shiny-hurt.png"},
  "cloud-bunny": {id:"shiny",name:"Shiny Cloud Bunny",idle:["assets/enemies/cloud-bunny/base/shiny-idle-1.png","assets/enemies/cloud-bunny/base/shiny-idle-2.png"],hurt:"assets/enemies/cloud-bunny/base/shiny-hurt.png"},
  "lunar-moth": {id:"shiny",name:"Shiny Lunar Moth",idle:["assets/enemies/lunar-moth/base/shiny-idle-1.png","assets/enemies/lunar-moth/base/shiny-idle-2.png"],hurt:"assets/enemies/lunar-moth/base/shiny-hurt.png"},
  "aries": {id:"shiny",name:"Shiny Aries",idle:["assets/bosses/aries/base/shiny-idle-1.png","assets/bosses/aries/base/shiny-idle-2.png"],hurt:"assets/bosses/aries/base/shiny-hurt.png"},
  "cherub-duck": {id:"shiny",name:"Shiny Cherub Duck",idle:["assets/bosses/cherub-duck/base/shiny-idle-1.png","assets/bosses/cherub-duck/base/shiny-idle-2.png"],hurt:"assets/bosses/cherub-duck/base/shiny-hurt.png"},
  "apple-baby": {id:"shiny",name:"Shiny Apple Baby",idle:["assets/enemies/apple-baby/base/shiny-idle-1.webp","assets/enemies/apple-baby/base/shiny-idle-2.webp"],hurt:"assets/enemies/apple-baby/base/shiny-hurt.webp"},
  "gummy-worm": {id:"shiny",name:"Shiny Gummy Worm",idle:["assets/enemies/gummy-worm/base/shiny-idle-1.webp","assets/enemies/gummy-worm/base/shiny-idle-2.webp"],hurt:"assets/enemies/gummy-worm/base/shiny-hurt.webp"},
  "pudding-pig": {id:"shiny",name:"Shiny Pudding Pig",idle:["assets/enemies/pudding-pig/base/shiny-idle-1.webp","assets/enemies/pudding-pig/base/shiny-idle-2.webp"],hurt:"assets/enemies/pudding-pig/base/shiny-hurt.webp"},
  "gingerlolly": {id:"shiny",name:"Shiny Gingerlolly",idle:["assets/enemies/gingerlolly/base/shiny-idle-1.webp","assets/enemies/gingerlolly/base/shiny-idle-2.webp"],hurt:"assets/enemies/gingerlolly/base/shiny-hurt.webp"},
  "candycane-deer": {id:"shiny",name:"Shiny Candycane Deer",idle:["assets/enemies/candycane-deer/base/shiny-idle-1.webp","assets/enemies/candycane-deer/base/shiny-idle-2.webp"],hurt:"assets/enemies/candycane-deer/base/shiny-hurt.webp"},
  "gummy-shark": {id:"shiny",name:"Shiny Gummy Shark",idle:["assets/bosses/gummy-shark/base/shiny-idle-1.webp","assets/bosses/gummy-shark/base/shiny-idle-2.webp"],hurt:"assets/bosses/gummy-shark/base/shiny-hurt.webp"},
  "cream-fox": {id:"shiny",name:"Shiny Cream Fox",idle:["assets/bosses/cream-fox/base/shiny-idle-1.webp","assets/bosses/cream-fox/base/shiny-idle-2.webp"],hurt:"assets/bosses/cream-fox/base/shiny-hurt.webp"}
});

const ENDLESS_NORMAL_ENEMIES = Object.freeze([
  "cat-slime","bee","flower","acorn-mouse","catterpillar",
  "cool-seagull","sea-turtle","catfish","seaunicorn","sea-star",
  "apple-baby","gummy-worm","pudding-pig","gingerlolly","candycane-deer",
  "star-mouse","puff-fairy","tulipa","snoud","cloud-bunny","lunar-moth"
]);
const ENDLESS_BOSSES = Object.freeze(["mushroom-cat","tree-squirrel","vampire-squid","jellybun","gummy-shark","cream-fox","aries","cherub-duck"]);
const ENDLESS_BACKGROUNDS = Object.freeze(
  Object.values(AREA_CONFIG).flatMap(area=>area.backgrounds)
);

const BUDDY_PONS = Object.freeze([
  {
    id:"buddy-pon", name:"Buddy Pon", image:"../assets/items/buddy-pons/buddy-pon.webp",
    price:50, normalRate:.50, bossRate:0, className:""
  },
  {
    id:"super-buddy-pon", name:"Super Buddy Pon", image:"../assets/items/buddy-pons/super-buddy-pon.webp",
    price:100, normalRate:.75, bossRate:.35, className:"super"
  },
  {
    id:"boss-buddy-pon", name:"Boss Buddy Pon", image:"../assets/items/buddy-pons/boss-buddy-pon.webp",
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
  "catterpillar":{name:"Leaf Nibble",description:"Moderate damage with a 25% critical-hit chance.",type:"crit-damage",multiplier:.90,critChance:.25,critMultiplier:1.7},
  "sea-star":{name:"Star Splash",description:"Light damage and makes enemy attacks 25% more likely to miss for 2 turns.",type:"damage-accuracy-down",multiplier:.68,missChance:.25,duration:2},
  "star-mouse":{name:"Star Toss",description:"Moderate damage with a 30% chance to stun for 1 turn.",type:"damage-stun",multiplier:.92,stunChance:.30},
  "puff-fairy":{name:"Fairy Fluff",description:"Restore 15% of your OC's max HP.",type:"heal",healPercent:.15},
  "tulipa":{name:"Petal Veil",description:"Reduce damage taken by 30% for 2 enemy turns.",type:"guard",damageReduction:.30,duration:2},
  "snoud":{name:"Cloud Cover",description:"Cut the next damaging enemy hit in half.",type:"next-hit-shield",damageReduction:.50},
  "cloud-bunny":{name:"Bunny Burst",description:"Moderate damage and lowers enemy Defense for 2 turns.",type:"damage-defense-down",multiplier:.92,defenseDown:.20,duration:2},
  "lunar-moth":{name:"Moon Dust",description:"Heal 10% HP and raise Attack by 15% for 2 turns.",type:"heal-attack-up",healPercent:.10,attackBoost:.15,duration:2},
  "aries":{name:"Ram Rush",description:"Deal 1.4× damage with a 30% chance to weaken the enemy's next attack.",type:"damage-weaken",multiplier:1.40,weakenChance:.30,nextAttackMultiplier:.65,boss:true},
  "cherub-duck":{name:"Cherub Blessing",description:"Heal 20% HP and reduce damage taken by 20% for 2 turns.",type:"heal-guard",healPercent:.20,damageReduction:.20,duration:2,boss:true},
  "apple-baby":{name:"Apple Snack",description:"Restore 15% of your OC's max HP.",type:"heal",healPercent:.15},
  "gummy-worm":{name:"Taffy Trip",description:"Light damage and lowers enemy Attack for 2 turns.",type:"damage-attack-down",multiplier:.68,attackDown:.20,duration:2},
  "pudding-pig":{name:"Pudding Guard",description:"Reduce damage taken by 30% for 2 enemy turns.",type:"guard",damageReduction:.30,duration:2},
  "gingerlolly":{name:"Lolly Bonk",description:"Moderate damage with a 30% chance to stun for 1 turn.",type:"damage-stun",multiplier:.95,stunChance:.30},
  "candycane-deer":{name:"Peppermint Dash",description:"Heal 10% HP and raise Attack by 15% for 2 turns.",type:"heal-attack-up",healPercent:.10,attackBoost:.15,duration:2},
  "gummy-shark":{name:"Gummy Chomp",description:"Deal 1.4× damage with a 30% chance to weaken the enemy's next attack.",type:"damage-weaken",multiplier:1.40,weakenChance:.30,nextAttackMultiplier:.65,boss:true},
  "cream-fox":{name:"Creamy Comfort",description:"Heal 20% HP and reduce damage taken by 20% for 2 turns.",type:"heal-guard",healPercent:.20,damageReduction:.20,duration:2,boss:true},
  "mimic":{name:"Jackpot Bite",description:"A gamble: strong damage, a heal, or bonus Pink Coins!",type:"jackpot",boss:false}
});

function buddySkillForEnemyId(enemyId){
  return BUDDY_SKILLS[String(enemyId||"")] || null;
}

function buddyGenderSymbol(gender){
  if(gender==="female") return "♀";
  if(gender==="male") return "♂";
  if(gender==="nonbinary") return "✦";
  return "";
}

function buddySlotPersonalization(characterId,slotIndex){
  ensureBuddySave();
  return hubSave.buddies?.personalizationByCharacter?.[characterId]?.[slotIndex] || null;
}

function mainBuddyRecord(){
  ensureBuddySave();
  const slots=hubSave.buddies?.equippedByCharacter?.[activeCharacterId];
  const key=Array.isArray(slots) && typeof slots[0]==="string" ? slots[0] : null;
  const base=key ? hubSave.buddies?.collection?.[key] || null : null;
  if(!base) return null;
  const personal=buddySlotPersonalization(activeCharacterId,0);
  const nickname=String(personal?.nickname||"").trim();
  const catalog=BUDDY_CATALOG_BY_KEY.get(key);
  const idleFrames=Array.isArray(base.idle) && base.idle.length
    ? base.idle
    : (Array.isArray(catalog?.idle) && catalog.idle.length ? catalog.idle : [base.image].filter(Boolean));
  return {
    ...catalog,
    ...base,
    idle:idleFrames,
    speciesName:base.name,
    name:nickname || base.name,
    nickname,
    gender:String(personal?.gender||""),
    genderSymbol:buddyGenderSymbol(personal?.gender)
  };
}


function catalogEntry(enemyId, variantId, variant, boss=false, shiny=false) {
  const idleFrames=Array.isArray(variant?.idle) && variant.idle.length
    ? variant.idle.map(String)
    : (Array.isArray(ENEMIES[enemyId]?.idle) ? ENEMIES[enemyId].idle.map(String) : []);
  return {
    key:`${enemyId}:${shiny ? "shiny" : variantId}`,
    enemyId,
    variantId:shiny ? "shiny" : variantId,
    name:String(variant?.name || ENEMIES[enemyId]?.name || "Buddy"),
    image:String(idleFrames[0] || ""),
    idle:idleFrames,
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
  addTable("apple-baby",APPLE_BABY_VARIANTS,false);
  addTable("gummy-worm",GUMMY_WORM_VARIANTS,false);
  addTable("pudding-pig",PUDDING_PIG_VARIANTS,false);
  addTable("gingerlolly",GINGERLOLLY_VARIANTS,false);
  addTable("candycane-deer",CANDYCANE_DEER_VARIANTS,false);
  addTable("gummy-shark",GUMMY_SHARK_VARIANTS,true);
  addTable("cream-fox",CREAM_FOX_VARIANTS,true);
  addTable("catterpillar",CATTERPILLAR_VARIANTS,false);
  addTable("sea-star",SEA_STAR_VARIANTS,false);
  addTable("star-mouse",STAR_MOUSE_VARIANTS,false);
  addTable("puff-fairy",PUFF_FAIRY_VARIANTS,false);
  addTable("tulipa",TULIPA_VARIANTS,false);
  addTable("snoud",SNOUD_VARIANTS,false);
  addTable("cloud-bunny",CLOUD_BUNNY_VARIANTS,false);
  addTable("lunar-moth",LUNAR_MOTH_VARIANTS,false);
  addTable("aries",ARIES_VARIANTS,true);
  addTable("cherub-duck",CHERUB_DUCK_VARIANTS,true);
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
        idle:Array.isArray(value.idle) ? value.idle.map(String).filter(Boolean) : [],
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
  if(!hubSave.buddies.personalizationByCharacter || typeof hubSave.buddies.personalizationByCharacter!=="object") hubSave.buddies.personalizationByCharacter={};
  ["peep","miko","io","miho","annika"].forEach(id=>{
    const slots=Array.isArray(hubSave.buddies.equippedByCharacter[id])?hubSave.buddies.equippedByCharacter[id]:[];
    hubSave.buddies.equippedByCharacter[id]=Array.from({length:6},(_,i)=>typeof slots[i]==="string"?slots[i]:null);
    const personal=Array.isArray(hubSave.buddies.personalizationByCharacter[id])?hubSave.buddies.personalizationByCharacter[id]:[];
    hubSave.buddies.personalizationByCharacter[id]=Array.from({length:6},(_,i)=>{
      if(!hubSave.buddies.equippedByCharacter[id][i]) return null;
      const value=personal[i];
      if(!value || typeof value!=="object" || Array.isArray(value)) return null;
      const nickname=String(value.nickname||"").trim().slice(0,20);
      const gender=["female","male","nonbinary"].includes(value.gender)?value.gender:"";
      return nickname||gender?{nickname,gender}:null;
    });
  });
}

function buddyOwnedQuantity(key) {
  return Math.max(0,Number(hubSave.buddies?.collection?.[key]?.quantity)||0);
}

function enemyVariantId(enemy) {
  if(!enemy) return "base";
  if(enemy.shiny) return "shiny";
  return String(
    enemy.catSlimeVariant || enemy.beeVariant || enemy.flowerVariant || enemy.acornMouseVariant || enemy.mushroomVariant || enemy.treeSquirrelVariant || enemy.oceanVariant || enemy.seaunicornVariant || enemy.jellybunVariant ||
    enemy.catterpillarVariant || enemy.seaStarVariant || enemy.appleBabyVariant || enemy.gummyWormVariant || enemy.puddingPigVariant || enemy.gingerlollyVariant || enemy.candycaneDeerVariant || enemy.gummySharkVariant || enemy.creamFoxVariant || enemy.starMouseVariant || enemy.puffFairyVariant || enemy.tulipaVariant || enemy.snoudVariant || enemy.cloudBunnyVariant || enemy.lunarMothVariant || enemy.ariesVariant || enemy.cherubDuckVariant || "base"
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
    idle:Array.isArray(enemy?.idle) ? enemy.idle.map(String).filter(Boolean) : [String(enemy?.idle?.[0] || enemy?.hurt || "")].filter(Boolean),
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
    existing.idle=incoming.idle;
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
  if(!forceShiny && (enemyId==="mimic" || Math.random()>=currentShinyRate())) return template;
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
  { id:"buddy-pon", name:"Buddy Pon", image:"../assets/items/buddy-pons/buddy-pon.webp", weight:6 },
  { id:"super-buddy-pon", name:"Super Buddy Pon", image:"../assets/items/buddy-pons/super-buddy-pon.webp", weight:2.4 },
  { id:"boss-buddy-pon", name:"Boss Buddy Pon", image:"../assets/items/buddy-pons/boss-buddy-pon.webp", weight:.65 }
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

const MihoIdle = [
  "assets/characters/miho/base/idle-1.webp",
  "assets/characters/miho/base/idle-2.webp"
];

const AnnikaIdle = [
  "assets/characters/annika/base/idle-1.webp",
  "assets/characters/annika/base/idle-2.webp"
];

function heroIdleFrames(){
  if(activeCharacterId === "miko") return MikoIdle;
  if(activeCharacterId === "io") return IoIdle;
  if(activeCharacterId === "miho") return MihoIdle;
  if(activeCharacterId === "annika") return AnnikaIdle;
  return PEepIdle;
}
function heroHurtFrame(){
  if(activeCharacterId === "miko") return MikoIdle[0];
  if(activeCharacterId === "io") return IoIdle[0];
  if(activeCharacterId === "miho") return "assets/characters/miho/base/hurt.webp";
  if(activeCharacterId === "annika") return "assets/characters/annika/base/hurt.webp";
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
  routePickerModal: document.querySelector("#routePickerModal"),
  closeRoutePicker: document.querySelector("#closeRoutePicker"),
  routeModalImage: document.querySelector("#routeModalImage"),
  routeModalTitle: document.querySelector("#routeModalTitle"),
  routeModalRange: document.querySelector("#routeModalRange"),
  routeModalCurrentRank: document.querySelector("#routeModalCurrentRank"),
  startCurrentRoute: document.querySelector("#startCurrentRoute"),
  startBeginningRoute: document.querySelector("#startBeginningRoute"),
  skillBookModal: document.querySelector("#skillBookModal"),
  openSkillBook: document.querySelector("#openSkillBook"),
  closeSkillBook: document.querySelector("#closeSkillBook"),
  skillBookTitle: document.querySelector("#skillBookTitle"),
  uiThemeModal: document.querySelector("#uiThemeModal"),
  openUiThemes: document.querySelector("#openUiThemes"),
  closeUiThemes: document.querySelector("#closeUiThemes"),
  uiThemeGrid: document.querySelector("#uiThemeGrid"),
  uiThemeCurrent: document.querySelector("#uiThemeCurrent"),
  questThemeColor: document.querySelector("#questThemeColor"),
  affectionUnlockToast: document.querySelector("#affectionUnlockToast"),
  affectionUnlockTitle: document.querySelector("#affectionUnlockTitle"),
  affectionUnlockText: document.querySelector("#affectionUnlockText"),
  endlessRecord: document.querySelector("#endlessRecord"),
  endlessCheckpoint: document.querySelector("#endlessCheckpoint"),
  endlessRuns: document.querySelector("#endlessRuns"),
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
  questOcPicker: document.querySelector("#questOcPicker"),
  buddyHomeCount: document.querySelector("#buddyHomeCount"),
  openBuddyCollection: document.querySelector("#openBuddyCollection"),
  charm: document.querySelector("#charmScreen"),
  openCharmScreen: document.querySelector("#openCharmScreen"),
  backFromCharms: document.querySelector("#backFromCharms"),
  charmHomeSummary: document.querySelector("#charmHomeSummary"),
  charmHomeSlots: document.querySelector("#charmHomeSlots"),
  charmCoinCount: document.querySelector("#charmCoinCount"),
  charmEquippedTitle: document.querySelector("#charmEquippedTitle"),
  charmEquippedSlots: document.querySelector("#charmEquippedSlots"),
  charmCatalog: document.querySelector("#charmCatalog"),
  charmMessage: document.querySelector("#charmMessage"),
  battleCharmStrip: document.querySelector("#battleCharmStrip"),
  backFromBuddies: document.querySelector("#backFromBuddies"),
  buddyCollectionCount: document.querySelector("#buddyCollectionCount"),
  buddyCollectionGrid: document.querySelector("#buddyCollectionGrid"),
  buddyCollectionEmpty: document.querySelector("#buddyCollectionEmpty"),
  buddyFilters: Array.from(document.querySelectorAll("[data-buddy-filter]")),
  buddyDetail: document.querySelector("#buddyDetail"),
  closeBuddyDetail: document.querySelector("#closeBuddyDetail"),
  buddyDetailArt: document.querySelector("#buddyDetailArt"),
  buddyDetailVariants: document.querySelector("#buddyDetailVariants"),
  buddyDetailTag: document.querySelector("#buddyDetailTag"),
  buddyDetailName: document.querySelector("#buddyDetailName"),
  buddyDetailStatus: document.querySelector("#buddyDetailStatus"),
  buddyDetailOwned: document.querySelector("#buddyDetailOwned"),
  buddyDetailType: document.querySelector("#buddyDetailType"),
  buddyDetailSkill: document.querySelector("#buddyDetailSkill"),
  buddyFamilyIconActions: document.querySelector("#buddyFamilyIconActions"),
  setBuddyFamilyIcon: document.querySelector("#setBuddyFamilyIcon"),
  buddyFamilyIconStatus: document.querySelector("#buddyFamilyIconStatus"),
  buddyAssignOpen: document.querySelector("#buddyAssignOpen"),
  buddyAssignPanel: document.querySelector("#buddyAssignPanel"),
  buddyAssignAvailability: document.querySelector("#buddyAssignAvailability"),
  buddyAssignCharacters: document.querySelector("#buddyAssignCharacters"),
  buddyAssignSlots: document.querySelector("#buddyAssignSlots"),
  buddyAssignMessage: document.querySelector("#buddyAssignMessage"),
  buddyPersonalizePanel: document.querySelector("#buddyPersonalizePanel"),
  buddyPersonalizeSpecies: document.querySelector("#buddyPersonalizeSpecies"),
  buddyNicknameInput: document.querySelector("#buddyNicknameInput"),
  buddyGenderButtons: [...document.querySelectorAll("[data-buddy-gender]")],
  saveBuddyPersonalization: document.querySelector("#saveBuddyPersonalization"),
  buddyPersonalizeMessage: document.querySelector("#buddyPersonalizeMessage"),
  befriendPanel: document.querySelector("#befriendPanel"),
  befriendTitle: document.querySelector("#befriendTitle"),
  befriendText: document.querySelector("#befriendText"),
  befriendPonChoices: document.querySelector("#befriendPonChoices"),
  skipBefriend: document.querySelector("#skipBefriend"),
  itemPonShopActions: document.querySelector("#itemPonShopActions"),
  purchasePonButton: document.querySelector("#purchasePonButton"),
  itemBackButton: document.querySelector("#itemBackButton"),
  closePonPurchaseButton: document.querySelector("#closePonPurchaseButton"),
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
  if(requested==="miho" && unlocked.includes("miho")) return "miho";
  if(requested==="annika" && unlocked.includes("annika")) return "annika";
  return "peep";
}

let activeCharacterId = activeCharacterIdFromQuest();
questSave.activeCharacter = activeCharacterId;

function heroDisplayName(){ return ({peep:"Peep",miko:"Miko",io:"Io",miho:"Miho",annika:"Annika"})[activeCharacterId] || "Peep"; }

function charmState(){
  questSave.charms=normalizeCharmSave(questSave.charms);
  return questSave.charms;
}
function equippedCharmIds(characterId=activeCharacterId){
  const state=charmState();
  if(!Array.isArray(state.equippedByCharacter[characterId])) state.equippedByCharacter[characterId]=[];
  return state.equippedByCharacter[characterId];
}
function equippedCharmDefs(characterId=activeCharacterId){ return equippedCharmIds(characterId).map(id=>CHARM_DEFS[id]).filter(Boolean); }
function activeCharmByFamily(family,characterId=activeCharacterId){ return equippedCharmDefs(characterId).find(def=>def.family===family)||null; }
function currentShinyRate(){ return activeCharmByFamily("shimmer")?.shinyRate || BASE_SHINY_RATE; }
function charmArtMarkup(def,size=""){
  if(!def) return '<span class="charm-art-empty">♡</span>';
  const sizeClass=size?` ${size}`:"";
  return `<span class="charm-art family-${def.family} tier-${def.tier}${sizeClass}" aria-hidden="true"><span class="charm-layer charm-metal"></span><span class="charm-layer charm-sparkle"></span><span class="charm-layer charm-heart"></span><span class="charm-layer charm-duck"></span><span class="charm-layer charm-beak"></span><img class="charm-outline" src="assets/charms/Charm-outline.png" alt=""></span>`;
}
function charmTierLabel(tier){ return tier==="rose-gold"?"Rose Gold":tier.charAt(0).toUpperCase()+tier.slice(1); }
function charmOwned(id){ return Boolean(charmState().owned[id]); }
function setCharmMessage(message){ if(ui.charmMessage) ui.charmMessage.textContent=message; }
function purchaseCharm(id){
  const def=CHARM_DEFS[id];
  if(!def||def.special||charmOwned(id)) return;
  const price=Math.max(0,Number(def.price)||0);
  const coins=Math.max(0,Number(hubSave.coins)||0);
  if(coins<price){ setCharmMessage(`You need ${(price-coins).toLocaleString()} more Pink Coins for ${def.name}.`); return; }
  hubSave.coins=coins-price;
  charmState().owned[id]=true;
  persistAll();
  setCharmMessage(`${def.name} unlocked permanently!`);
  renderCharmScreen(); renderCharmHome(); renderMeta();
}
function toggleCharmEquip(id){
  const def=CHARM_DEFS[id];
  if(!def||!charmOwned(id)) return;
  const equipped=equippedCharmIds();
  const exactIndex=equipped.indexOf(id);
  if(exactIndex>=0){
    equipped.splice(exactIndex,1); persistAll();
    setCharmMessage(`${def.name} unequipped from ${heroDisplayName()}.`);
    renderCharmScreen(); renderCharmHome(); renderBattleCharmStrip(); renderMeta(); return;
  }
  const familyIndex=equipped.findIndex(otherId=>CHARM_DEFS[otherId]?.family===def.family);
  if(familyIndex>=0){
    equipped.splice(familyIndex,1,id); persistAll();
    setCharmMessage(`${def.name} replaced the other ${CHARM_FAMILIES[def.family]?.name || "charm"} tier.`);
    renderCharmScreen(); renderCharmHome(); renderBattleCharmStrip(); renderMeta(); return;
  }
  if(equipped.length>=CHARM_SLOT_LIMIT){ setCharmMessage(`${heroDisplayName()} already has 3 charms equipped. Unequip one first.`); return; }
  equipped.push(id); persistAll();
  setCharmMessage(`${def.name} equipped to ${heroDisplayName()}!`);
  renderCharmScreen(); renderCharmHome(); renderBattleCharmStrip(); renderMeta();
}
function renderCharmHome(){
  if(!ui.charmHomeSlots||!ui.charmHomeSummary) return;
  const defs=equippedCharmDefs();
  ui.charmHomeSummary.textContent=`${defs.length} / ${CHARM_SLOT_LIMIT} equipped for ${heroDisplayName()}`;
  ui.charmHomeSlots.innerHTML="";
  for(let i=0;i<CHARM_SLOT_LIMIT;i++){
    const def=defs[i];
    const slot=document.createElement("div");
    slot.className=`charm-home-slot${def?" filled":""}`;
    slot.innerHTML=def?`${charmArtMarkup(def,"small")}<span class="charm-mini-label">${charmTierLabel(def.tier)} ${CHARM_FAMILIES[def.family]?.name.replace(" Charm","")||"Charm"}</span>`:"<span>♡</span>";
    ui.charmHomeSlots.appendChild(slot);
  }
}
function renderBattleCharmStrip(){
  if(!ui.battleCharmStrip) return;
  const defs=equippedCharmDefs();
  ui.battleCharmStrip.classList.toggle("hidden",defs.length===0);
  ui.battleCharmStrip.innerHTML=defs.map(def=>`<span class="battle-charm-pill" title="${def.name}: ${def.effect}">${charmArtMarkup(def,"tiny")}<span>${CHARM_FAMILIES[def.family]?.name.replace(" Charm","")||"Charm"}</span></span>`).join("");
}
function renderCharmScreen(){
  if(!ui.charmCatalog) return;
  const state=charmState();
  const equipped=equippedCharmIds();
  if(ui.charmCoinCount) ui.charmCoinCount.textContent=`${Math.max(0,Number(hubSave.coins)||0).toLocaleString()} Coins`;
  if(ui.charmEquippedTitle) ui.charmEquippedTitle.textContent=`${heroDisplayName()}'s Charms`;
  if(ui.charmEquippedSlots){
    ui.charmEquippedSlots.innerHTML="";
    for(let i=0;i<CHARM_SLOT_LIMIT;i++){
      const def=CHARM_DEFS[equipped[i]];
      const button=document.createElement("button");
      button.type="button"; button.className=`charm-equip-slot${def?" filled":""}`;
      if(def){ button.innerHTML=`${charmArtMarkup(def,"small")}<small>${def.name}<br>Tap to unequip</small>`; button.addEventListener("click",()=>toggleCharmEquip(def.id)); }
      else{ button.innerHTML="<span>♡</span><small>Empty slot</small>"; button.disabled=true; }
      ui.charmEquippedSlots.appendChild(button);
    }
  }
  ui.charmCatalog.innerHTML="";
  for(const familyId of CHARM_FAMILY_ORDER){
    const family=CHARM_FAMILIES[familyId];
    const card=document.createElement("section"); card.className=`charm-family-card family-${familyId}`;
    const sample=Object.values(CHARM_DEFS).find(def=>def.family===familyId&&def.tier==="gold")||Object.values(CHARM_DEFS).find(def=>def.family===familyId);
    card.innerHTML=`<div class="charm-family-heading">${charmArtMarkup(sample,"small")}<div><h3>${family.name}</h3><p>${family.description}</p></div></div><div class="charm-tier-list"></div>`;
    const list=card.querySelector(".charm-tier-list");
    for(const def of Object.values(CHARM_DEFS).filter(def=>def.family===familyId)){
      const owned=Boolean(state.owned[def.id]); const isEquipped=equipped.includes(def.id);
      const row=document.createElement("div");
      row.className=`charm-tier-row${owned?" owned":""}${isEquipped?" equipped":""}${def.special?" special":""}${def.special&&!owned?" locked":""}`;
      let actionLabel,disabled=false;
      if(def.special&&!owned){actionLabel="Locked";disabled=true;} else if(isEquipped) actionLabel="Unequip"; else if(owned) actionLabel="Equip"; else actionLabel=`Buy ${def.price.toLocaleString()}`;
      const note=def.special&&!owned?`Complete the Duckipedia (${Math.min(CURRENT_DUCKIPEDIA_TOTAL,hubSave.unlockedDucks?.length||0)} / ${CURRENT_DUCKIPEDIA_TOTAL}) to unlock permanently.`:def.effect;
      row.innerHTML=`${charmArtMarkup(def,"small")}<div class="charm-tier-copy"><strong>${def.name}</strong><small>${note}${!def.special&&!owned?` · ${def.price.toLocaleString()} Pink Coins`:""}</small></div><button class="pixel-button small charm-tier-action" type="button" ${disabled?"disabled":""}>${actionLabel}</button>`;
      const button=row.querySelector("button"); if(!disabled) button.addEventListener("click",()=>owned?toggleCharmEquip(def.id):purchaseCharm(def.id));
      list.appendChild(row);
    }
    ui.charmCatalog.appendChild(card);
  }
}

function defaultCharacterQuestProgress(){
  return {
    level:1,
    exp:0,
    iconBackground:"white",
    lastArea:"meadow",
    areas:{
      meadow:{unlockedRank:1,lastRank:1},
      ocean:{unlockedRank:1,lastRank:1},
      candy:{unlockedRank:1,lastRank:1},
      cloud:{unlockedRank:1,lastRank:1}
    },
    clearedAreas:{meadow:false,ocean:false,candy:false,cloud:false},
    affectionMilestonesSeen:{five:false,ten:false},
    endless:{record:0,checkpoint:1}
  };
}

function normalizeCharacterQuestProgress(raw, legacy={}){
  const d=defaultCharacterQuestProgress();
  const q=raw&&typeof raw==="object"?raw:{};
  const legacyAreas=legacy.areas&&typeof legacy.areas==="object"?legacy.areas:{};
  const rawMeadowLast=Number(q.areas?.meadow?.lastRank ?? legacyAreas.meadow?.lastRank ?? legacy.lastRank)||1;
  const rawOceanLast=Number(q.areas?.ocean?.lastRank ?? legacyAreas.ocean?.lastRank)||1;
  const rawCloudLast=Number(q.areas?.cloud?.lastRank ?? legacyAreas.cloud?.lastRank)||1;
  const rawMeadowUnlocked=Number(q.areas?.meadow?.unlockedRank ?? legacyAreas.meadow?.unlockedRank ?? legacy.unlockedRank)||1;
  const rawOceanUnlocked=Number(q.areas?.ocean?.unlockedRank ?? legacyAreas.ocean?.unlockedRank)||1;
  const rawCloudUnlocked=Number(q.areas?.cloud?.unlockedRank ?? legacyAreas.cloud?.unlockedRank)||1;
  const meadowUnlocked=clampInt(rawMeadowUnlocked,1,40,1);
  const meadowLast=clampInt(rawMeadowLast,1,meadowUnlocked,1);
  const oceanUnlocked=clampInt(rawOceanUnlocked,1,80,1);
  const oceanLast=clampInt(rawOceanLast,1,oceanUnlocked,1);
  const candyUnlocked=clampInt(q.areas?.candy?.unlockedRank ?? legacyAreas.candy?.unlockedRank,1,120,1);
  const candyLast=clampInt(q.areas?.candy?.lastRank ?? legacyAreas.candy?.lastRank,1,candyUnlocked,1);
  const cloudUnlocked=clampInt(rawCloudUnlocked,1,160,1);
  const cloudLast=clampInt(rawCloudLast,1,cloudUnlocked,1);
  const incomingIcon=q.iconBackground ?? legacy.iconBackground;
  return {
    ...d,...q,
    level:clampInt(q.level,1,MAX_LEVEL,1),
    exp:Math.max(0,Number(q.exp)||0),
    iconBackground:ICON_BACKGROUND_COLORS.some(color=>color.id===incomingIcon)?incomingIcon:"white",
    lastArea:AREA_CONFIG[q.lastArea ?? legacy.lastArea] ? (q.lastArea ?? legacy.lastArea) : "meadow",
    areas:{
      meadow:{unlockedRank:meadowUnlocked,lastRank:Math.min(meadowLast,meadowUnlocked)},
      ocean:{unlockedRank:oceanUnlocked,lastRank:Math.min(oceanLast,oceanUnlocked)},
      candy:{unlockedRank:candyUnlocked,lastRank:Math.min(candyLast,candyUnlocked)},
      cloud:{unlockedRank:cloudUnlocked,lastRank:Math.min(cloudLast,cloudUnlocked)}
    },
    clearedAreas:{
      meadow:Boolean(q.clearedAreas?.meadow || rawMeadowLast>=40 || rawMeadowUnlocked>=40),
      ocean:Boolean(q.clearedAreas?.ocean || rawOceanLast>=100 || rawOceanUnlocked>=100),
      candy:Boolean(q.clearedAreas?.candy),
      cloud:Boolean(q.clearedAreas?.cloud || rawCloudLast>=150 || rawCloudUnlocked>=150)
    },
    affectionMilestonesSeen:{
      five:Boolean(q.affectionMilestonesSeen?.five),
      ten:Boolean(q.affectionMilestonesSeen?.ten)
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
    iconBorderStylesUnlocked:["none"],
    iconBorderColorsUnlocked:["white"],
    uiThemesUnlocked:["classic-cream"],
    uiTheme:"classic-cream",
    endlessRunsCompleted:0,
    buddyFamilyIcons:{},
    charms:defaultCharmSave(),
    areaRewardMigrationV24124:false,
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
    activeCharacter:["peep","miko","io","miho","annika"].includes(q.activeCharacter)?q.activeCharacter:null,
    iconBackgroundsUnlocked:[...new Set(["white",...(Array.isArray(q.iconBackgroundsUnlocked)?q.iconBackgroundsUnlocked:[])])]
      .filter(id=>ICON_BACKGROUND_COLORS.some(color=>color.id===id)),
    iconBorderStylesUnlocked:[...new Set(["none",...(Array.isArray(q.iconBorderStylesUnlocked)?q.iconBorderStylesUnlocked:[])])]
      .filter(id=>ICON_BORDER_STYLES.some(style=>style.id===id)),
    iconBorderColorsUnlocked:[...new Set(["white",...(Array.isArray(q.iconBorderColorsUnlocked)?q.iconBorderColorsUnlocked:[])])]
      .filter(id=>ICON_BORDER_COLORS.some(color=>color.id===id)),
    uiThemesUnlocked:[...new Set(["classic-cream",...(Array.isArray(q.uiThemesUnlocked)?q.uiThemesUnlocked:[])])].filter(id=>QUEST_UI_THEME_IDS.has(id)),
    uiTheme:QUEST_UI_THEME_IDS.has(q.uiTheme)?q.uiTheme:"classic-cream",
    endlessRunsCompleted:Math.max(0,Math.floor(Number(q.endlessRunsCompleted)||0)),
    buddyFamilyIcons:(q.buddyFamilyIcons&&typeof q.buddyFamilyIcons==="object")?{...q.buddyFamilyIcons}:{},
    charms:normalizeCharmSave(q.charms),
    bossWins:Math.max(0,Number(q.bossWins ?? q.completedRuns)||0)
  };
  if(q.miko&&typeof q.miko==="object") normalized.miko=normalizeCharacterQuestProgress(q.miko);
  if(q.io&&typeof q.io==="object") normalized.io=normalizeCharacterQuestProgress(q.io);
  if(q.miho&&typeof q.miho==="object") normalized.miho=normalizeCharacterQuestProgress(q.miho);
  if(q.annika&&typeof q.annika==="object") normalized.annika=normalizeCharacterQuestProgress(q.annika);
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


function stageLevelAlreadyCleared(characterId,stageId,level){
  const raw=questSave[characterId];
  if(!raw || typeof raw!=="object") return false;
  const hero=normalizeCharacterQuestProgress(raw);
  questSave[characterId]=hero;
  const cfg=getAreaConfig(stageId);
  const stage=hero.areas?.[stageId];
  if(!stage) return false;
  const target=Math.max(1,Number(level)||1);
  if(target>=cfg.maxRank) return Boolean(hero.clearedAreas?.[stageId]);
  return Math.max(1,Number(stage.unlockedRank)||1)>target || Boolean(hero.clearedAreas?.[stageId]);
}

function questThemeRequirementMet(theme){
  const req=theme?.requirement;
  if(!req) return true;
  if(req.endlessRuns) return Math.max(0,Math.floor(Number(questSave.endlessRunsCompleted)||0))>=req.endlessRuns;
  if(req.character) return stageLevelAlreadyCleared(req.character,req.stage,req.level);
  return QUEST_CHARACTER_IDS.some(characterId=>stageLevelAlreadyCleared(characterId,req.stage,req.level));
}

function normalizeQuestUiThemeState(){
  if(!Array.isArray(questSave.uiThemesUnlocked)) questSave.uiThemesUnlocked=["classic-cream"];
  questSave.uiThemesUnlocked=[...new Set(["classic-cream",...questSave.uiThemesUnlocked])].filter(id=>QUEST_UI_THEME_IDS.has(id));
  for(const theme of QUEST_UI_THEMES){
    if(questThemeRequirementMet(theme) && !questSave.uiThemesUnlocked.includes(theme.id)) questSave.uiThemesUnlocked.push(theme.id);
  }
  if(!questSave.uiThemesUnlocked.includes(questSave.uiTheme)) questSave.uiTheme="classic-cream";
}

function isQuestUiThemeUnlocked(themeId){
  normalizeQuestUiThemeState();
  return questSave.uiThemesUnlocked.includes(themeId);
}

function unlockQuestUiTheme(themeId){
  const theme=questUiThemeById(themeId);
  if(!Array.isArray(questSave.uiThemesUnlocked)) questSave.uiThemesUnlocked=["classic-cream"];
  questSave.uiThemesUnlocked=[...new Set(["classic-cream",...questSave.uiThemesUnlocked])].filter(id=>QUEST_UI_THEME_IDS.has(id));
  if(questSave.uiThemesUnlocked.includes(theme.id)) return null;
  questSave.uiThemesUnlocked.push(theme.id);
  return theme;
}

function applyQuestUiTheme(){
  normalizeQuestUiThemeState();
  const theme=questUiThemeById(questSave.uiTheme);
  document.body.dataset.questTheme=theme.id;
  if(ui.questThemeColor) ui.questThemeColor.setAttribute("content",theme.themeColor || "#f6c6d6");
  if(ui.uiThemeCurrent) ui.uiThemeCurrent.textContent=theme.name;
}

function syncQuestThemeIntoHubSave(){
  hubSave.duckQuest = questSave;
  try{ localStorage.setItem(HUB_SAVE_KEY, JSON.stringify(hubSave)); }catch(error){}
}

function makeQuestThemeSwatch(theme,className="ui-theme-swatch"){
  const swatch=document.createElement("span");
  swatch.className=className;
  for(const color of theme.swatches||[]){
    const dot=document.createElement("i");
    dot.style.background=color;
    swatch.appendChild(dot);
  }
  return swatch;
}

function renderUiThemePicker(){
  if(!ui.uiThemeGrid) return;
  normalizeQuestUiThemeState();
  ui.uiThemeGrid.innerHTML="";
  const current=questUiThemeById(questSave.uiTheme);
  if(ui.uiThemeCurrent) ui.uiThemeCurrent.textContent=current.name;
  for(const theme of QUEST_UI_THEMES){
    const unlocked=isQuestUiThemeUnlocked(theme.id);
    const selected=theme.id===questSave.uiTheme;
    const button=document.createElement("button");
    button.type="button";
    button.className=`ui-theme-card${unlocked?" unlocked":" locked"}${selected?" selected":""}`;
    button.disabled=!unlocked;
    button.setAttribute("aria-pressed",String(selected));
    button.appendChild(makeQuestThemeSwatch(theme));
    const copy=document.createElement("span");
    copy.className="ui-theme-card-copy";
    const title=document.createElement("strong"); title.textContent=theme.name;
    const desc=document.createElement("small"); desc.textContent=theme.description;
    const status=document.createElement("em"); status.textContent=unlocked?(selected?"✓ Equipped":"Tap to equip"):`🔒 ${questThemeRequirementText(theme)}`;
    copy.append(title,desc,status); button.appendChild(copy);
    if(unlocked) button.addEventListener("click",()=>{
      questSave.uiTheme=theme.id;
      applyQuestUiTheme();
      syncQuestThemeIntoHubSave();
      persistAll();
      renderUiThemePicker();
    });
    ui.uiThemeGrid.appendChild(button);
  }
}

function openUiThemePicker(){
  if(currentRun) return;
  renderUiThemePicker();
  ui.uiThemeModal?.classList.remove("hidden");
  ui.uiThemeModal?.setAttribute("aria-hidden","false");
}
function closeUiThemePicker(){
  ui.uiThemeModal?.classList.add("hidden");
  ui.uiThemeModal?.setAttribute("aria-hidden","true");
}

function awardQuestThemesForClearedLevel(stageId,level,characterId){
  const earned=[];
  const clearedLevel=Math.max(1,Number(level)||1);
  for(const theme of QUEST_UI_THEMES){
    const req=theme.requirement;
    if(!req || req.stage!==stageId || clearedLevel<req.level) continue;
    if(req.character && req.character!==characterId) continue;
    const unlocked=unlockQuestUiTheme(theme.id);
    if(unlocked) earned.push(unlocked);
  }
  return earned;
}

function awardQuestThemesForEndlessRuns(){
  const earned=[];
  const completed=Math.max(0,Math.floor(Number(questSave.endlessRunsCompleted)||0));
  for(const theme of QUEST_UI_THEMES){
    const req=theme.requirement;
    if(!req?.endlessRuns || completed<req.endlessRuns) continue;
    const unlocked=unlockQuestUiTheme(theme.id);
    if(unlocked) earned.push(unlocked);
  }
  return earned;
}

let heroProgress = activeHeroProgress();
let selectedArea = AREA_CONFIG[heroProgress.lastArea] ? heroProgress.lastArea : "meadow";
let selectedRank = Math.min(areaProgress(selectedArea).unlockedRank, Math.max(1, areaProgress(selectedArea).lastRank || 1));
let currentRun = null;
let currentEnemy = null;
let idleTimer = null;
let peepIdleTimer = null;
let buddyIdleTimer = null;
let enemyIdleIndex = 0;
let peepIdleIndex = 0;
let buddyIdleIndex = 0;
let actionLocked = false;
let pendingChest = null;
let pendingDefeatedEnemy = null;
let befriendAttempted = false;
let endlessExitReason = "";
let buddyCollectionFilter = "meadow";
let buddyDetailEntryKey = "";
let buddyAssignCharacterId = "";
let buddyPersonalizeCharacterId = "";
let buddyPersonalizeSlotIndex = -1;
let buddyPersonalizeGender = "";
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
    if (!parsed.characterProgress.miho || typeof parsed.characterProgress.miho !== "object") {
      parsed.characterProgress.miho = { happinessTotal:0 };
    }
    if (!parsed.characterProgress.annika || typeof parsed.characterProgress.annika !== "object") {
      parsed.characterProgress.annika = { happinessTotal:0 };
    }
    if (!Array.isArray(parsed.unlockedCharacters)) parsed.unlockedCharacters=["peep"];
    if (!parsed.unlockedCharacters.includes("peep")) parsed.unlockedCharacters.unshift("peep");
    parsed.selectedCharacter = parsed.unlockedCharacters.includes(parsed.selectedCharacter) ? parsed.selectedCharacter : "peep";
    parsed.coins = Math.max(0, Number(parsed.coins) || 0);
    return parsed;
  } catch {
    return { coins:0, inventory:{}, unlockedDucks:[], unlockedCharacters:["peep"], selectedCharacter:"peep", characterProgress:{peep:{happinessTotal:0},miko:{happinessTotal:0},io:{happinessTotal:0},miho:{happinessTotal:0},annika:{happinessTotal:0}} };
  }
}

// Character IDs are declared near the top with the UI-theme definitions.
const AREA_CLEAR_CLOSET_REWARDS = Object.freeze({
  meadow:{id:"daisy-crown",name:"Daisy Crown",image:"../assets/ui/daisy-crown-reward.png"},
  ocean:{id:"ocean-sunglasses",name:"Sunglasses",image:"../assets/ui/sunglasses-reward.png"},
  candy:{id:"candy-hairclip",name:"Candy Hairclip",image:"../assets/ui/candy-hairclip-reward.webp"},
  cloud:{id:"halo",name:"Halo",image:"../assets/ui/halo-reward.png"}
});

function characterClosetUnlocks(characterId){
  if(!hubSave.characterUnlockedItems || typeof hubSave.characterUnlockedItems!=="object") hubSave.characterUnlockedItems={};
  const id=QUEST_CHARACTER_IDS.includes(characterId)?characterId:"peep";
  if(!Array.isArray(hubSave.characterUnlockedItems[id])) hubSave.characterUnlockedItems[id]=[];
  return hubSave.characterUnlockedItems[id];
}

function hasCharacterClosetReward(characterId,itemId){
  return Boolean(itemId && characterClosetUnlocks(characterId).includes(itemId));
}

function unlockCharacterClosetReward(characterId,itemId){
  if(!itemId) return false;
  const id=QUEST_CHARACTER_IDS.includes(characterId)?characterId:"peep";
  const list=characterClosetUnlocks(id);
  if(list.includes(itemId)) return false;
  list.push(itemId);
  hubSave.characterUnlockedItems[id]=[...new Set(list)];
  if(id==="peep") hubSave.unlockedItems=[...new Set([...(Array.isArray(hubSave.unlockedItems)?hubSave.unlockedItems:[]),itemId])];
  return true;
}

// Older builds granted Meadow/Ocean/Cloud completion accessories to every OC.
// v24.124 converts that old shared state into per-OC clears. The best evidence
// available in legacy saves is whether that OC last ran the old area's final
// rank. This preserves the likely completer while removing accidental copies.
function migrateAreaRewardsV24124(){
  if(questSave.areaRewardMigrationV24124) return;
  const legacyAreas=["meadow","ocean","cloud"];
  for(const characterId of QUEST_CHARACTER_IDS){
    if(!questSave[characterId] || typeof questSave[characterId]!=="object") questSave[characterId]=defaultCharacterQuestProgress();
    const hero=normalizeCharacterQuestProgress(questSave[characterId]);
    questSave[characterId]=hero;
    for(const areaId of legacyAreas){
      const reward=AREA_CLEAR_CLOSET_REWARDS[areaId];
      const list=characterClosetUnlocks(characterId);
      const earned=Boolean(hero.clearedAreas?.[areaId]) && list.includes(reward.id);
      hero.clearedAreas[areaId]=earned;
      if(!earned){
        hubSave.characterUnlockedItems[characterId]=list.filter(id=>id!==reward.id);
        const outfit=hubSave.characterOutfits?.[characterId];
        if(outfit && Array.isArray(outfit.extras)) outfit.extras=outfit.extras.filter(id=>id!==reward.id);
      }
    }
  }
  const peepUnlocks=new Set(characterClosetUnlocks("peep"));
  const areaRewardIds=new Set(Object.values(AREA_CLEAR_CLOSET_REWARDS).map(reward=>reward.id));
  hubSave.unlockedItems=(Array.isArray(hubSave.unlockedItems)?hubSave.unlockedItems:[])
    .filter(id=>!areaRewardIds.has(id) || peepUnlocks.has(id));
  questSave.areaRewardMigrationV24124=true;
  hubSave.duckQuest=questSave;
  try{ localStorage.setItem(HUB_SAVE_KEY,JSON.stringify(hubSave)); }catch(error){}
}

migrateAreaRewardsV24124();

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


// v24.88 performance pass: keep only the small set of images needed for the
// current encounter decoded/warm. This avoids animation stalls without
// preloading the entire game at startup.
const questImageWarmCache = new Map();
function warmQuestImage(src){
  if(!src || questImageWarmCache.has(src)) return;
  const img=new Image();
  img.decoding="async";
  img.src=src;
  questImageWarmCache.set(src,img);
  if(typeof img.decode==="function") img.decode().catch(()=>{});
}

function warmCurrentBattleAssets(enemy=null){
  const sources=new Set();
  heroIdleFrames().forEach(src=>sources.add(src));
  sources.add(heroHurtFrame());
  try{ sortedActiveSkills().forEach(skill=>{ if(skill?.sprite) sources.add(skill.sprite); }); }catch(error){}
  if(enemy){
    (enemy.idle||[]).forEach(src=>sources.add(src));
    if(enemy.hurt) sources.add(enemy.hurt);
  }
  const buddy=mainBuddyRecord();
  if(buddy?.image) sources.add(buddy.image);
  const bg=currentRun?.mode==="endless"
    ? currentRun?.floorBackground
    : currentRun ? currentAreaConfig()?.backgrounds?.[currentRun.index] : null;
  if(bg) sources.add(bg);
  REWARD_ITEMS.forEach(item=>{
    if(String(item.id||"").includes("buddy-pon") && item.image) sources.add(item.image);
  });
  [
    "assets/items/chests/treasure/closed.webp",
    "assets/items/chests/treasure/open.webp",
    "assets/shinies/amethyst-mimic-open.webp"
  ].forEach(src=>sources.add(src));
  sources.forEach(warmQuestImage);
}

function warmQuestMenuAssets(){
  const run=()=>{
    heroIdleFrames().forEach(warmQuestImage);
    const selected=getAreaConfig(selectedArea);
    if(selected?.backgrounds?.[0]) warmQuestImage(selected.backgrounds[0]);
    REWARD_ITEMS.forEach(item=>{ if(String(item.id||"").includes("buddy-pon")) warmQuestImage(item.image); });
  };
  if(typeof requestIdleCallback==="function") requestIdleCallback(run,{timeout:1200});
  else setTimeout(run,350);
}

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
  const vitality=activeCharmByFamily("vitality");
  const hpBonus=Math.max(0,Number(vitality?.hpBonus)||0);
  return {
    maxHp: Math.round((42 + (level - 1) * 4.2) * (1 + hpBonus)),
    attack: Math.round(8 + (level - 1) * 1.15),
    defense: Math.round(2 + (level - 1) * 0.48)
  };
}

function enemyScaled(template, rank, areaId="meadow") {
  const tuning=areaId==="cloud"
    ? {hp:.028,atk:.017,exp:.021,reward:.016}
    : areaId==="candy"
      ? {hp:.031,atk:.0195,exp:.024,reward:.018}
      : areaId==="ocean"
        ? {hp:.035,atk:.0225,exp:.0275,reward:.020}
        : {hp:.090,atk:.060,exp:.070,reward:.050};
  const hpStep=tuning.hp;
  const atkStep=tuning.atk;
  const expStep=tuning.exp;
  const rewardStep=tuning.reward;
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

function grantQuestHappiness(amount,characterId=activeCharacterId){
  const gain=Math.max(0,Math.floor(Number(amount)||0));
  if(!gain) return 0;
  if(!hubSave.characterProgress || typeof hubSave.characterProgress!=="object") hubSave.characterProgress={};
  if(!hubSave.characterProgress[characterId] || typeof hubSave.characterProgress[characterId]!=="object") hubSave.characterProgress[characterId]={happinessTotal:0};
  const maxTotal=totalHappinessRequiredForLevel(100);
  const before=Math.max(0,Math.min(maxTotal,Number(hubSave.characterProgress[characterId].happinessTotal)||0));
  const after=Math.min(maxTotal,before+gain);
  hubSave.characterProgress[characterId].happinessTotal=after;
  return Math.max(0,after-before);
}

function chestHappinessReward(chest){
  if(chest?.kind==="hidden-treasure") return 5;
  if(chest?.kind==="boss") return 3;
  if(chest?.kind==="rare") return 2;
  return 1;
}

function affectionRewardBonus(characterId=activeCharacterId){
  const hLevel=happinessLevelFromTotal(hubSave.characterProgress?.[characterId]?.happinessTotal);
  if(hLevel>=100) return .25;
  if(hLevel>=50) return .10;
  return 0;
}

function affectionRewardMultiplier(characterId=activeCharacterId){
  return 1+affectionRewardBonus(characterId);
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
  // v37: A discovered icon background can never be rolled again.
  // Exclude both persistent unlocks and anything already awarded in this run.
  const alreadyDiscovered=new Set([
    ...questSave.iconBackgroundsUnlocked,
    ...((currentRun?.iconBackgroundsEarned||[]).map(bg=>bg?.id).filter(Boolean))
  ]);
  const locked=ICON_BACKGROUND_COLORS.filter(bg=>bg.source==="chest" && !alreadyDiscovered.has(bg.id));
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

function normalizeIconBorderStyleUnlocks(){
  const validIds=new Set(ICON_BORDER_STYLES.map(style=>style.id));
  const unlocked=new Set(Array.isArray(questSave.iconBorderStylesUnlocked)?questSave.iconBorderStylesUnlocked:["none"]);
  unlocked.add("none");
  questSave.iconBorderStylesUnlocked=[...unlocked].filter(id=>validIds.has(id));
}

function normalizeIconBorderColorUnlocks(){
  const validIds=new Set(ICON_BORDER_COLORS.map(color=>color.id));
  const unlocked=new Set(Array.isArray(questSave.iconBorderColorsUnlocked)?questSave.iconBorderColorsUnlocked:["white"]);
  unlocked.add("white");
  questSave.iconBorderColorsUnlocked=[...unlocked].filter(id=>validIds.has(id));
}

function unlockIconBorderStyle(id){
  const style=ICON_BORDER_STYLES.find(x=>x.id===id);
  if(!style) return null;
  normalizeIconBorderStyleUnlocks();
  if(questSave.iconBorderStylesUnlocked.includes(id)) return null;
  questSave.iconBorderStylesUnlocked.push(id);
  return style;
}

function unlockIconBorderColor(id){
  const color=ICON_BORDER_COLORS.find(x=>x.id===id);
  if(!color) return null;
  normalizeIconBorderColorUnlocks();
  if(questSave.iconBorderColorsUnlocked.includes(id)) return null;
  questSave.iconBorderColorsUnlocked.push(id);
  return color;
}

function pickChestIconBorderStyle(chest){
  normalizeIconBorderStyleUnlocks();
  const alreadyDiscovered=new Set([
    ...questSave.iconBorderStylesUnlocked,
    ...((currentRun?.iconBorderStylesEarned||[]).map(style=>style?.id).filter(Boolean))
  ]);
  const locked=ICON_BORDER_STYLES.filter(style=>style.source==="chest" && !alreadyDiscovered.has(style.id));
  if(!locked.length) return null;

  const isMimic=chest?.enemy?.id==="mimic";
  const chance=chest?.kind==="hidden-treasure" ? .65 : isMimic ? .28 : chest?.kind==="rare" ? .24 : chest?.kind==="boss" ? .18 : .05;
  if(Math.random()>chance) return null;

  const rarityBoost=chest?.kind==="hidden-treasure"
    ? {common:1,uncommon:1.55,rare:2.5}
    : (chest?.kind==="rare" || isMimic)
      ? {common:1,uncommon:1.35,rare:2.15}
      : chest?.kind==="boss"
        ? {common:1,uncommon:1.2,rare:1.8}
        : {common:1,uncommon:.8,rare:.45};

  const weighted=locked.map(style=>({style,weight:(Number(style.weight)||1)*(rarityBoost[style.rarity]||1)}));
  let roll=Math.random()*weighted.reduce((sum,entry)=>sum+entry.weight,0);
  for(const entry of weighted){
    roll-=entry.weight;
    if(roll<=0) return entry.style;
  }
  return weighted[0]?.style||null;
}

function pickChestIconBorderColor(chest){
  normalizeIconBorderColorUnlocks();
  const alreadyDiscovered=new Set([
    ...questSave.iconBorderColorsUnlocked,
    ...((currentRun?.iconBorderColorsEarned||[]).map(color=>color?.id).filter(Boolean))
  ]);
  const locked=ICON_BORDER_COLORS.filter(color=>color.source==="chest" && !alreadyDiscovered.has(color.id));
  if(!locked.length) return null;

  const isMimic=chest?.enemy?.id==="mimic";
  const chance=chest?.kind==="hidden-treasure" ? .88 : isMimic ? .34 : chest?.kind==="rare" ? .32 : chest?.kind==="boss" ? .24 : .07;
  if(Math.random()>chance) return null;

  const rarityBoost=chest?.kind==="hidden-treasure"
    ? {common:1,uncommon:1.45,rare:2.35}
    : (chest?.kind==="rare" || isMimic)
      ? {common:1,uncommon:1.28,rare:1.95}
      : chest?.kind==="boss"
        ? {common:1,uncommon:1.15,rare:1.65}
        : {common:1,uncommon:.82,rare:.48};

  const weighted=locked.map(color=>({color,weight:(Number(color.weight)||1)*(rarityBoost[color.rarity]||1)}));
  let roll=Math.random()*weighted.reduce((sum,entry)=>sum+entry.weight,0);
  for(const entry of weighted){
    roll-=entry.weight;
    if(roll<=0) return entry.color;
  }
  return weighted[0]?.color||null;
}

function applyIconBorderPreviewStyle(element,style,color){
  if(!element) return;
  const safeStyle=style || iconBorderStyleById("none");
  const safeColor=color || iconBorderColorById("white");
  element.classList.toggle("none",safeStyle.id==="none");
  element.style.setProperty("--icon-border-preview-color",safeColor.value||"#fffaf3");
  element.style.setProperty("--icon-border-preview-mask",safeStyle.id==="none"?"none":`url("${safeStyle.file}")`);
}

function normalizeWallpaperUnlocks(){
  if(!Array.isArray(hubSave.unlockedWallpapers)) hubSave.unlockedWallpapers=[];
  hubSave.unlockedWallpapers=[...new Set(hubSave.unlockedWallpapers.filter(Boolean))];
}

function unlockWallpaper(id){
  const wallpaper=questWallpaperById(id);
  if(!wallpaper) return null;
  normalizeWallpaperUnlocks();
  if(hubSave.unlockedWallpapers.includes(id)) return null;
  hubSave.unlockedWallpapers.push(id);
  return wallpaper;
}

function pickChestWallpaper(chest){
  normalizeWallpaperUnlocks();
  const alreadyDiscovered=new Set([
    ...hubSave.unlockedWallpapers,
    ...((currentRun?.wallpapersEarned||[]).map(wallpaper=>wallpaper?.id).filter(Boolean))
  ]);
  const locked=QUEST_WALLPAPERS.filter(wallpaper=>!alreadyDiscovered.has(wallpaper.id));
  if(!locked.length) return null;

  const isMimic=chest?.enemy?.id==="mimic";
  const chance=chest?.kind==="hidden-treasure" ? .95 : isMimic ? .42 : chest?.kind==="rare" ? .35 : chest?.kind==="boss" ? .22 : .04;
  if(Math.random()>chance) return null;

  const rarityBoost=chest?.kind==="hidden-treasure"
    ? {rare:1.3,ultra:3.2}
    : (chest?.kind==="rare" || isMimic)
      ? {rare:1.5,ultra:2.8}
      : chest?.kind==="boss"
        ? {rare:1.1,ultra:2.0}
        : {rare:1,ultra:.6};

  const weighted=locked.map(wallpaper=>({wallpaper,weight:(Number(wallpaper.weight)||1)*(rarityBoost[wallpaper.rarity]||1)}));
  let roll=Math.random()*weighted.reduce((sum,entry)=>sum+entry.weight,0);
  for(const entry of weighted){
    roll-=entry.weight;
    if(roll<=0) return entry.wallpaper;
  }
  return weighted[0]?.wallpaper || null;
}

function applyWallpaperStyle(element,wallpaper){
  if(!element || !wallpaper) return;
  element.style.background=wallpaper.value;
  element.style.backgroundSize=wallpaper.size||"auto";
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
  applyQuestIconBorder(ui.heroSpriteWrap, activeCharacterId);
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
  const isMiho=activeCharacterId==="miho";
  const isAnnika=activeCharacterId==="annika";
  ui.battlefield?.classList.toggle("miko-active",isMiko);
  ui.battlefield?.classList.toggle("io-active",isIo);
  ui.battlefield?.classList.toggle("miho-active",isMiho);
  ui.battlefield?.classList.toggle("annika-active",isAnnika);
  const name=heroDisplayName();
  if(ui.heroNameHome) ui.heroNameHome.textContent=name;
  if(ui.heroNameCombat) ui.heroNameCombat.textContent=name;
  if(ui.exploreHeading) ui.exploreHeading.textContent=`Where should ${name} Explore?`;
  if(ui.skillsKicker) ui.skillsKicker.textContent=`${name.toUpperCase()}'S SKILLS`;
  if(ui.skillBookTitle) ui.skillBookTitle.textContent=`${name}'s Skills`;

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
  applyQuestIconBorder(ui.heroSpriteWrap, activeCharacterId);
}

function skillDisplayName(skill){ return skill.name; }

function skillDisplayDescription(skill){ return skill.description; }


function availableQuestCharacters(){
  const unlocked=Array.isArray(hubSave.unlockedCharacters)?hubSave.unlockedCharacters:["peep"];
  return ["peep","miko","io","miho","annika"].filter(id=>unlocked.includes(id));
}

function closeQuestOcPicker(){
  if(!ui.questOcPicker) return;
  ui.questOcPicker.classList.add("hidden");
  ui.switchQuestOc?.setAttribute("aria-expanded","false");
}

function renderQuestOcPicker(){
  if(!ui.questOcPicker) return;
  const names={peep:"Peep",miko:"Miko",io:"Io",miho:"Miho",annika:"Annika"};
  ui.questOcPicker.innerHTML="";
  availableQuestCharacters().forEach(id=>{
    const button=document.createElement("button");
    button.type="button";
    button.className=`quest-oc-choice${id===activeCharacterId?" current":""}`;
    button.setAttribute("role","menuitem");
    if(id===activeCharacterId) button.setAttribute("aria-current","true");

    const preview=document.createElement("span");
    preview.className="quest-oc-choice-preview";
    const progress = questSave?.[id] && typeof questSave[id] === "object" ? questSave[id] : defaultCharacterQuestProgress();
    const background = iconBackgroundById(progress.iconBackground || "white");
    applyIconBackgroundStyle(preview, background);

    const sprite=document.createElement("img");
    sprite.className=`quest-oc-choice-sprite pixel-sprite${id==='peep'?' peep':''}`;
    sprite.alt="";
    sprite.src=questCharacterIconPreviewSrc(id);
    preview.append(sprite);
    applyQuestIconBorder(preview, id);

    const labelWrap=document.createElement("span");
    labelWrap.className="quest-oc-choice-copy";
    const label=document.createElement("strong");
    label.textContent=names[id]||id;
    labelWrap.append(label);
    if(id===activeCharacterId){
      const current=document.createElement("small");
      current.textContent="Current";
      labelWrap.append(current);
    }

    button.append(preview,labelWrap);
    button.addEventListener("click",()=>switchQuestCharacter(id));
    ui.questOcPicker.append(button);
  });
}

function renderSwitchOcButton(){
  if(!ui.switchQuestOc) return;
  const available=availableQuestCharacters();
  if(available.length<2){
    ui.switchQuestOc.classList.add("hidden");
    closeQuestOcPicker();
    return;
  }
  ui.switchQuestOc.classList.remove("hidden");
  ui.switchQuestOc.textContent="Switch OC";
  renderQuestOcPicker();
}

function switchQuestCharacter(characterId){
  if(currentRun) return;
  const available=availableQuestCharacters();
  if(available.length<2) return;
  const requested=available.includes(characterId)?characterId:activeCharacterId;
  if(requested===activeCharacterId){
    closeQuestOcPicker();
    return;
  }
  activeCharacterId=requested;
  questSave.activeCharacter=activeCharacterId;
  const progress=activeHeroProgress();
  selectedArea=AREA_CONFIG[progress.lastArea]?progress.lastArea:"meadow";
  selectedRank=Math.min(areaProgress(selectedArea).unlockedRank,Math.max(1,areaProgress(selectedArea).lastRank||1));
  closeIconBackgroundPicker();
  closeQuestOcPicker();
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
  buddyDetailEntryKey="";
  buddyAssignCharacterId="";
  buddyPersonalizeCharacterId="";
  buddyPersonalizeSlotIndex=-1;
  buddyPersonalizeGender="";
  ui.buddyPersonalizePanel?.classList.add("hidden");
  ui.buddyAssignPanel?.classList.add("hidden");
  if(ui.buddyAssignMessage) ui.buddyAssignMessage.textContent="";
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

const BUDDY_ASSIGN_CHARACTER_NAMES = Object.freeze({peep:"Peep",miko:"Miko",io:"Io",miho:"Miho",annika:"Annika"});

function buddyRecordByKey(key){
  if(!key) return null;
  return hubSave.buddies?.collection?.[key] || buddyDisplayCatalog().find(entry=>entry.key===key) || null;
}

function buddyEquippedCount(key,excludeCharacterId="",excludeSlotIndex=-1){
  if(!key) return 0;
  ensureBuddySave();
  let count=0;
  for(const characterId of ["peep","miko","io","miho","annika"]){
    const slots=hubSave.buddies.equippedByCharacter[characterId] || [];
    slots.forEach((slotKey,index)=>{
      if(characterId===excludeCharacterId && index===excludeSlotIndex) return;
      if(slotKey===key) count+=1;
    });
  }
  return count;
}

function buddyAssignCharacters(){
  const unlocked=Array.isArray(hubSave.unlockedCharacters)?hubSave.unlockedCharacters:["peep"];
  return ["peep","miko","io","miho","annika"].map(id=>({id,name:BUDDY_ASSIGN_CHARACTER_NAMES[id],unlocked:unlocked.includes(id)}));
}

function hideBuddyPersonalization(){
  buddyPersonalizeCharacterId="";
  buddyPersonalizeSlotIndex=-1;
  buddyPersonalizeGender="";
  ui.buddyPersonalizePanel?.classList.add("hidden");
  if(ui.buddyPersonalizeMessage) ui.buddyPersonalizeMessage.textContent="";
}

function openBuddyPersonalization(entry,characterId,slotIndex){
  ensureBuddySave();
  const slots=hubSave.buddies.equippedByCharacter[characterId] || [];
  if(!entry || slots[slotIndex]!==entry.key){ hideBuddyPersonalization(); return; }
  buddyPersonalizeCharacterId=characterId;
  buddyPersonalizeSlotIndex=slotIndex;
  const personal=buddySlotPersonalization(characterId,slotIndex);
  buddyPersonalizeGender=String(personal?.gender||"");
  if(ui.buddyPersonalizeSpecies) ui.buddyPersonalizeSpecies.textContent=`${BUDDY_ASSIGN_CHARACTER_NAMES[characterId]}'s ${slotIndex===0?"★ Main Buddy":`Buddy ${slotIndex+1}`} · ${entry.name}`;
  if(ui.buddyNicknameInput) ui.buddyNicknameInput.value=String(personal?.nickname||"");
  ui.buddyGenderButtons?.forEach(button=>button.classList.toggle("selected",button.dataset.buddyGender===buddyPersonalizeGender));
  if(ui.buddyPersonalizeMessage) ui.buddyPersonalizeMessage.textContent="";
  ui.buddyPersonalizePanel?.classList.remove("hidden");
}

function saveBuddyPersonalization(){
  if(!buddyPersonalizeCharacterId || buddyPersonalizeSlotIndex<0) return;
  ensureBuddySave();
  const slots=hubSave.buddies.equippedByCharacter[buddyPersonalizeCharacterId] || [];
  const key=slots[buddyPersonalizeSlotIndex];
  if(!key) return;
  const nickname=String(ui.buddyNicknameInput?.value||"").trim().slice(0,20);
  const gender=["female","male","nonbinary"].includes(buddyPersonalizeGender)?buddyPersonalizeGender:"";
  hubSave.buddies.personalizationByCharacter[buddyPersonalizeCharacterId][buddyPersonalizeSlotIndex]=nickname||gender?{nickname,gender}:null;
  persistAll();
  const species=buddyRecordByKey(key);
  const shownName=nickname || species?.name || "Buddy";
  const entry=buddyRecordByKey(buddyDetailEntryKey);
  if(entry) renderBuddyAssignPanel(entry);
  // Re-open after rerender so the editor remains visible.
  if(entry) openBuddyPersonalization(entry,buddyPersonalizeCharacterId,buddyPersonalizeSlotIndex);
  if(ui.buddyPersonalizeMessage) ui.buddyPersonalizeMessage.textContent=`Saved! ${shownName}${gender?` ${buddyGenderSymbol(gender)}`:""} is ready to adventure. ♡`;
}

function renderBuddyAssignPanel(entry){
  if(!entry || !ui.buddyAssignPanel || !ui.buddyAssignCharacters || !ui.buddyAssignSlots) return;
  ensureBuddySave();
  const owned=buddyOwnedQuantity(entry.key);
  if(owned<=0){
    ui.buddyAssignPanel.classList.add("hidden");
    return;
  }

  const characters=buddyAssignCharacters();
  const unlocked=characters.filter(character=>character.unlocked);
  if(!buddyAssignCharacterId || !unlocked.some(character=>character.id===buddyAssignCharacterId)){
    buddyAssignCharacterId=unlocked.some(character=>character.id===activeCharacterId)
      ? activeCharacterId
      : (unlocked[0]?.id || "peep");
  }

  const totalAssigned=buddyEquippedCount(entry.key);
  const freeCopies=Math.max(0,owned-totalAssigned);
  if(ui.buddyAssignAvailability){
    ui.buddyAssignAvailability.textContent=`Owned ×${owned} · Assigned ×${totalAssigned} · Free ×${freeCopies}`;
  }

  ui.buddyAssignCharacters.innerHTML="";
  characters.forEach(character=>{
    const button=document.createElement("button");
    button.type="button";
    button.className=`buddy-assign-character${buddyAssignCharacterId===character.id?" selected":""}${character.unlocked?"":" locked"}`;
    button.disabled=!character.unlocked;
    button.textContent=character.unlocked?character.name:`${character.name} 🔒`;
    button.addEventListener("click",()=>{
      buddyAssignCharacterId=character.id;
      hideBuddyPersonalization();
      if(ui.buddyAssignMessage) ui.buddyAssignMessage.textContent="";
      renderBuddyAssignPanel(entry);
    });
    ui.buddyAssignCharacters.appendChild(button);
  });

  const slots=hubSave.buddies.equippedByCharacter[buddyAssignCharacterId] || Array(6).fill(null);
  const sameBuddySlots=slots.map((key,index)=>key===entry.key?index:-1).filter(index=>index>=0);
  const canMoveWithinOc=freeCopies<=0 && sameBuddySlots.length>0;
  ui.buddyAssignSlots.innerHTML="";

  slots.forEach((currentKey,index)=>{
    const currentBuddy=buddyRecordByKey(currentKey);
    const personal=buddySlotPersonalization(buddyAssignCharacterId,index);
    const personalName=String(personal?.nickname||"").trim();
    const personalGender=buddyGenderSymbol(personal?.gender);
    const alreadyHere=currentKey===entry.key;
    const canAssign=alreadyHere || freeCopies>0 || canMoveWithinOc;
    const button=document.createElement("button");
    button.type="button";
    button.className=`buddy-assign-slot${index===0?" main":""}${currentBuddy?" occupied":""}${alreadyHere?" assigned":""}`;
    button.disabled=!canAssign;
    button.setAttribute("aria-label",`${index===0?"Main Buddy":`Buddy slot ${index+1}`}: ${currentBuddy?.name || "Empty"}`);

    const badge=document.createElement("span");
    badge.className="buddy-assign-slot-badge";
    badge.textContent=index===0?"★ Main":String(index+1);

    const art=document.createElement("span");
    art.className="buddy-assign-slot-art";
    if(currentBuddy?.image){
      const img=document.createElement("img");
      img.src=currentBuddy.image;
      img.alt="";
      art.appendChild(img);
    }else{
      art.textContent=currentBuddy?(currentBuddy.shiny?"✨":currentBuddy.boss?"★":"♡"):"+";
    }

    const label=document.createElement("strong");
    const baseLabel=alreadyHere?`${personalName || entry.name} ✓`:(personalName || currentBuddy?.name || "Empty");
    label.textContent=`${baseLabel}${personalGender?` ${personalGender}`:""}`;
    button.append(badge,art,label);
    button.addEventListener("click",()=>assignBuddyFromBook(entry,buddyAssignCharacterId,index));
    ui.buddyAssignSlots.appendChild(button);
  });
}

function assignBuddyFromBook(entry,characterId,slotIndex){
  if(!entry || buddyOwnedQuantity(entry.key)<=0) return;
  ensureBuddySave();
  const unlocked=buddyAssignCharacters().find(character=>character.id===characterId)?.unlocked;
  if(!unlocked) return;

  const slots=hubSave.buddies.equippedByCharacter[characterId];
  const index=Math.max(0,Math.min(5,Number(slotIndex)||0));
  if(slots[index]===entry.key){
    if(ui.buddyAssignMessage) ui.buddyAssignMessage.textContent=`Personalize this ${entry.name} below. ♡`;
    openBuddyPersonalization(entry,characterId,index);
    return;
  }

  const owned=buddyOwnedQuantity(entry.key);
  const assignedElsewhere=buddyEquippedCount(entry.key,characterId,index);
  let personalizationForNewSlot=null;
  if(assignedElsewhere>=owned){
    const moveFrom=slots.findIndex((key,sourceIndex)=>sourceIndex!==index && key===entry.key);
    if(moveFrom>=0){
      personalizationForNewSlot=hubSave.buddies.personalizationByCharacter[characterId]?.[moveFrom] || null;
      slots[moveFrom]=null;
      hubSave.buddies.personalizationByCharacter[characterId][moveFrom]=null;
    }else{
      if(ui.buddyAssignMessage) ui.buddyAssignMessage.textContent=`All ${entry.name} copies are already assigned to other OCs.`;
      renderBuddyAssignPanel(entry);
      return;
    }
  }

  // A freshly assigned copy starts unnamed unless this exact copy was moved
  // from another slot on the same OC, in which case its personalization moves too.
  hubSave.buddies.personalizationByCharacter[characterId][index]=personalizationForNewSlot;
  slots[index]=entry.key;
  hubSave.buddies.equippedByCharacter[characterId]=slots;
  persistAll();
  if(ui.buddyAssignMessage){
    ui.buddyAssignMessage.textContent=`Assigned ${entry.name} to ${BUDDY_ASSIGN_CHARACTER_NAMES[characterId]}'s ${index===0?"★ Main Buddy":"Buddy "+(index+1)} slot! ♡`;
  }
  renderBuddyAssignPanel(entry);
  openBuddyPersonalization(entry,characterId,index);
}

const BUDDY_AREA_FAMILIES = Object.freeze({
  meadow:["cat-slime","bee","flower","acorn-mouse","catterpillar","mushroom-cat","tree-squirrel","mimic"],
  ocean:["cool-seagull","sea-turtle","catfish","seaunicorn","sea-star","vampire-squid","jellybun"],
  candy:["apple-baby","gummy-worm","pudding-pig","gingerlolly","candycane-deer","gummy-shark","cream-fox"],
  cloud:["star-mouse","puff-fairy","tulipa","snoud","cloud-bunny","lunar-moth","aries","cherub-duck"]
});

const BUDDY_AREA_BY_ENEMY = Object.freeze(Object.fromEntries(
  Object.entries(BUDDY_AREA_FAMILIES).flatMap(([area,ids])=>ids.map(id=>[id,area]))
));

function buddyFamilyEntries(enemyId){
  const entries=buddyDisplayCatalog().filter(entry=>entry.enemyId===enemyId);
  return entries.sort((a,b)=>{
    if(a.shiny!==b.shiny) return a.shiny?1:-1;
    if(a.variantId==="base" && b.variantId!=="base") return -1;
    if(b.variantId==="base" && a.variantId!=="base") return 1;
    return a.name.localeCompare(b.name);
  });
}

function buddyFamilyIconKey(enemyId,preferShiny=false){ return `${enemyId}::${preferShiny?"shiny":"normal"}`; }
function selectedBuddyFamilyIconKey(enemyId,preferShiny=false){
  if(!questSave.buddyFamilyIcons || typeof questSave.buddyFamilyIcons!=="object") questSave.buddyFamilyIcons={};
  return String(questSave.buddyFamilyIcons[buddyFamilyIconKey(enemyId,preferShiny)] || "");
}
function setSelectedBuddyFamilyIcon(entry){
  if(!entry || buddyOwnedQuantity(entry.key)<=0) return false;
  if(!questSave.buddyFamilyIcons || typeof questSave.buddyFamilyIcons!=="object") questSave.buddyFamilyIcons={};
  questSave.buddyFamilyIcons[buddyFamilyIconKey(entry.enemyId,Boolean(entry.shiny))]=entry.key;
  persistAll();
  return true;
}
function buddyFamilyRepresentative(enemyId,preferShiny=false){
  const entries=buddyFamilyEntries(enemyId);
  const relevant=entries.filter(entry=>Boolean(entry.shiny)===Boolean(preferShiny));
  const chosenKey=selectedBuddyFamilyIconKey(enemyId,preferShiny);
  const chosen=relevant.find(entry=>entry.key===chosenKey && buddyOwnedQuantity(entry.key)>0);
  if(chosen) return chosen;
  if(preferShiny) return relevant.find(entry=>buddyOwnedQuantity(entry.key)>0) || relevant[0] || entries[0] || null;
  return relevant.find(entry=>entry.variantId==="base" && buddyOwnedQuantity(entry.key)>0)
    || relevant.find(entry=>buddyOwnedQuantity(entry.key)>0)
    || relevant.find(entry=>entry.variantId==="base")
    || relevant[0] || entries[0] || null;
}

function openBuddyDetail(entry) {
  if(!entry || !ui.buddyDetail) return;
  const owned=buddyOwnedQuantity(entry.key);
  const caught=owned>0;
  buddyDetailEntryKey=entry.key;
  buddyAssignCharacterId=availableQuestCharacters().includes(activeCharacterId)?activeCharacterId:(availableQuestCharacters()[0]||"peep");
  ui.buddyAssignPanel?.classList.add("hidden");
  if(ui.buddyAssignMessage) ui.buddyAssignMessage.textContent="";
  if(ui.buddyAssignOpen){
    ui.buddyAssignOpen.classList.toggle("hidden",!caught);
    ui.buddyAssignOpen.textContent="Assign to OC";
  }
  ui.buddyDetailArt.innerHTML="";
  ui.buddyDetailArt.classList.toggle("unknown",!caught);
  if(entry.image) {
    const img=document.createElement("img");
    img.src=entry.image;
    img.alt="";
    img.decoding="async";
    ui.buddyDetailArt.appendChild(img);
  } else {
    ui.buddyDetailArt.textContent=caught?(entry.shiny?"✨":entry.boss?"★":"♡"):"?";
  }
  ui.buddyDetailTag.textContent=entry.shiny?"SHINY BUDDY ✨":entry.boss?"BOSS BUDDY":"BUDDY";
  ui.buddyDetailName.textContent=caught?entry.name:"???";
  ui.buddyDetailStatus.textContent=caught
    ? `Befriended! You currently own ${owned} ${owned===1?"copy":"copies"}.`
    : "Not befriended yet. Find this form in Duck Quest and use a Buddy Pon!";
  ui.buddyDetailOwned.textContent=`×${owned}`;
  ui.buddyDetailType.textContent=entry.shiny?(entry.boss?"Shiny Boss":"Shiny"):entry.boss?"Boss":"Normal";
  const buddySkill=buddySkillForEnemyId(entry.enemyId);
  if(ui.buddyDetailSkill) ui.buddyDetailSkill.innerHTML=buddySkill
    ? `<strong>Buddy Skill: ${buddySkill.name}</strong><br>${buddySkill.description}`
    : `<strong>Buddy Skill:</strong> No skill assigned yet.`;

  if(ui.buddyFamilyIconActions){
    ui.buddyFamilyIconActions.classList.toggle("hidden",!caught);
    if(caught){
      const isMain=selectedBuddyFamilyIconKey(entry.enemyId,Boolean(entry.shiny))===entry.key;
      if(ui.setBuddyFamilyIcon){
        ui.setBuddyFamilyIcon.disabled=isMain;
        ui.setBuddyFamilyIcon.textContent=isMain?(entry.shiny?"✓ Shiny Book Icon":"✓ Book Icon"):(entry.shiny?"Use as Shiny Icon":"Use as Book Icon");
      }
      if(ui.buddyFamilyIconStatus) ui.buddyFamilyIconStatus.textContent=isMain
        ? "This form currently represents the family in your Buddy Book."
        : "Use this befriended form as the family portrait in your Buddy Book.";
    }
  }

  if(ui.buddyDetailVariants){
    ui.buddyDetailVariants.innerHTML="";
    buddyFamilyEntries(entry.enemyId).forEach(variant=>{
      const variantOwned=buddyOwnedQuantity(variant.key)>0;
      const button=document.createElement("button");
      button.type="button";
      const isBookIcon=selectedBuddyFamilyIconKey(variant.enemyId,Boolean(variant.shiny))===variant.key;
      button.className=`buddy-variant-button${variant.key===entry.key?" selected":""}${variantOwned?" caught":" unknown"}${variant.shiny?" shiny":""}${isBookIcon?" book-icon":""}`;
      button.setAttribute("aria-label",variantOwned?variant.name:"Undiscovered form");
      button.title=variantOwned?variant.name:"???";
      if(variant.image){
        const img=document.createElement("img");
        img.src=variant.image;
        img.alt="";
        img.loading="lazy";
        img.decoding="async";
        button.appendChild(img);
      }else button.textContent=variantOwned?"♡":"?";
      button.addEventListener("click",()=>openBuddyDetail(variant));
      ui.buddyDetailVariants.appendChild(button);
    });
  }

  ui.buddyDetail.classList.remove("hidden");
  ui.buddyDetail.setAttribute("aria-hidden","false");
}

function renderBuddyCollection() {
  ensureBuddySave();
  const progress=buddyCollectionProgress();
  if(ui.buddyCollectionCount) ui.buddyCollectionCount.textContent=`${progress.caught} / ${progress.total}`;
  renderBuddyHomeCount();
  ui.buddyFilters.forEach(button=>button.classList.toggle("selected",button.dataset.buddyFilter===buddyCollectionFilter));

  const shinyTab=buddyCollectionFilter==="shiny";
  const familyIds=shinyTab
    ? [...new Set(Object.keys(SHINY_VARIANTS).filter(id=>buddyFamilyEntries(id).some(entry=>entry.shiny)))]
    : (BUDDY_AREA_FAMILIES[buddyCollectionFilter] || BUDDY_AREA_FAMILIES.meadow);

  ui.buddyCollectionGrid.innerHTML="";
  familyIds.forEach(enemyId=>{
    const family=buddyFamilyEntries(enemyId);
    const relevant=shinyTab?family.filter(entry=>entry.shiny):family.filter(entry=>!entry.shiny);
    if(!relevant.length) return;
    const representative=buddyFamilyRepresentative(enemyId,shinyTab);
    if(!representative) return;
    const caughtEntries=relevant.filter(entry=>buddyOwnedQuantity(entry.key)>0);
    const caughtAny=caughtEntries.length>0;
    const familyName=String(ENEMIES[enemyId]?.name || representative.name || "Buddy");
    const button=document.createElement("button");
    button.type="button";
    button.className=`buddy-tile buddy-family-tile${caughtAny?" caught":" unknown"}${representative.boss?" boss":""}${shinyTab?" shiny":""}`;
    button.setAttribute("aria-label",caughtAny?`${familyName}, ${caughtEntries.length} forms befriended`:`Undiscovered ${familyName}`);

    const art=document.createElement("span");
    art.className="buddy-tile-art";
    if(representative.image){
      const img=document.createElement("img");
      img.src=representative.image;
      img.alt="";
      img.loading="lazy";
      img.decoding="async";
      art.appendChild(img);
    }else art.textContent=caughtAny?(shinyTab?"✨":representative.boss?"★":"♡"):"?";

    const name=document.createElement("strong");
    name.textContent=caughtAny?`${familyName}${shinyTab?" ✨":""}`:"???";
    const state=document.createElement("small");
    state.textContent=shinyTab
      ? (caughtAny?"Shiny befriended":"Shiny undiscovered")
      : `${caughtEntries.length} / ${relevant.length} forms`;
    const badge=document.createElement("span");
    badge.className="buddy-tile-badge";
    badge.textContent=shinyTab?"✨":representative.boss?"★":caughtAny?"♡":"?";

    button.append(art,name,state,badge);
    button.addEventListener("click",()=>openBuddyDetail(representative));
    ui.buddyCollectionGrid.appendChild(button);
  });

  const empty=!ui.buddyCollectionGrid.children.length;
  ui.buddyCollectionEmpty?.classList.toggle("hidden",!empty);
  if(empty && ui.buddyCollectionEmpty) ui.buddyCollectionEmpty.textContent="No Buddy families are available in this tab yet.";
}

function closeRoutePicker(){
  ui.routePickerModal?.classList.add("hidden");
  ui.routePickerModal?.setAttribute("aria-hidden","true");
}

function openRoutePicker(areaId){
  if(!AREA_CONFIG[areaId] || currentRun) return;
  selectedArea=areaId;
  activeHeroProgress().lastArea=areaId;
  const cfg=getAreaConfig(areaId);
  const progress=areaProgress(areaId);
  selectedRank=Math.max(1,Math.min(cfg.maxRank,progress.unlockedRank||1));
  if(ui.routeModalImage){ ui.routeModalImage.src=cfg.backgrounds[0]; ui.routeModalImage.alt=`${cfg.name} preview`; }
  if(ui.routeModalTitle) ui.routeModalTitle.textContent=cfg.name;
  if(ui.routeModalRange) ui.routeModalRange.textContent=`Levels 1–${cfg.maxRank}`;
  if(ui.routeModalCurrentRank) ui.routeModalCurrentRank.textContent=String(progress.unlockedRank||1);
  persistAll();
  renderMeta();
  ui.routePickerModal?.classList.remove("hidden");
  ui.routePickerModal?.setAttribute("aria-hidden","false");
}

function openSkillBook(){
  if(currentRun) return;
  renderMenuSkills();
  ui.skillBookModal?.classList.remove("hidden");
  ui.skillBookModal?.setAttribute("aria-hidden","false");
}

function closeSkillBook(){
  ui.skillBookModal?.classList.add("hidden");
  ui.skillBookModal?.setAttribute("aria-hidden","true");
}

let affectionToastTimer=null;
function showAffectionUnlockToast(title,text){
  if(!ui.affectionUnlockToast) return;
  clearTimeout(affectionToastTimer);
  if(ui.affectionUnlockTitle) ui.affectionUnlockTitle.textContent=title;
  if(ui.affectionUnlockText) ui.affectionUnlockText.textContent=text;
  ui.affectionUnlockToast.classList.remove("hidden");
  affectionToastTimer=setTimeout(()=>ui.affectionUnlockToast?.classList.add("hidden"),3200);
}

function maybeShowAffectionMilestone(hLevel){
  const hero=activeHeroProgress();
  if(!hero.affectionMilestonesSeen || typeof hero.affectionMilestonesSeen!=="object") hero.affectionMilestonesSeen={five:false,ten:false};
  if(hLevel>=100 && !hero.affectionMilestonesSeen.ten){
    hero.affectionMilestonesSeen.five=true;
    hero.affectionMilestonesSeen.ten=true;
    persistAll();
    showAffectionUnlockToast("10 Hearts!","+25% Pink Coins & EXP from battles!");
    return;
  }
  if(hLevel>=50 && !hero.affectionMilestonesSeen.five){
    hero.affectionMilestonesSeen.five=true;
    persistAll();
    showAffectionUnlockToast("5 Hearts!","+10% Pink Coins & EXP from battles!");
  }
}

function renderMeta() {
  applyQuestUiTheme();
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
  const filled=Math.max(0,Math.min(10,Math.floor(hLevel/10)));
  for(let i=1;i<=10;i++){const heart=document.createElement("span");heart.textContent="♥";heart.className=i<=filled?"heart-full":"heart-empty";ui.happinessHearts.appendChild(heart);}
  maybeShowAffectionMilestone(hLevel);

  const cfg=getAreaConfig(selectedArea);
  const progress=areaProgress(selectedArea);
  selectedRank=Math.min(Math.max(1,selectedRank),progress.unlockedRank);
  ui.areaButtons.forEach(btn=>btn.classList.toggle("selected",btn.dataset.area===selectedArea));

  const endless=hero.endless || {record:0,checkpoint:1};
  if(ui.endlessRecord) ui.endlessRecord.textContent=`Floor ${Math.max(0,Number(endless.record)||0)}`;
  if(ui.endlessCheckpoint) ui.endlessCheckpoint.textContent=`Floor ${Math.max(1,Number(endless.checkpoint)||1)}`;
  if(ui.endlessRuns) ui.endlessRuns.textContent=String(Math.max(0,Math.floor(Number(questSave.endlessRunsCompleted)||0)));
  if(ui.continueEndless){
    const checkpoint=Math.max(1,Number(endless.checkpoint)||1);
    ui.continueEndless.textContent=`Continue from Floor ${checkpoint}`;
    ui.continueEndless.disabled=checkpoint<=1 && Math.max(0,Number(endless.record)||0)===0;
  }

  renderBuddyHomeCount();
  renderCharmHome();
  renderMenuSkills();
}

function rankWord(rank) {
  const ones=["Zero","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
  const tens=["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
  const n=Math.max(1,Math.min(160,Math.round(Number(rank)||1)));
  if(n<20) return ones[n];
  if(n<100){ const ten=Math.floor(n/10),one=n%10; return one ? `${tens[ten]}-${ones[one]}` : tens[ten]; }
  if(n===100) return "One Hundred";
  return `One Hundred ${rankWord(n-100)}`;
}

function rankDescription(rank,areaId=selectedArea) {
  if(areaId==="cloud"){
    if(rank<=1) return "Cloud Garden Level 1 · The stairs are soft and sparkly.";
    if(rank<=35) return `Cloud Garden Level ${rank} · New celestial colors are drifting in.`;
    if(rank<=75) return `Cloud Garden Level ${rank} · The garden is growing stronger.`;
    if(rank<=120) return `Cloud Garden Level ${rank} · Elite sky creatures are appearing.`;
    if(rank<160) return `Cloud Garden Level ${rank} · The Star Sanctuary is close.`;
    return `Cloud Garden Level 160 · The Star Sanctuary is waiting. Give it everything you have!`;
  }
  if(areaId==="candy"){
    if(rank<=1) return "Candyland Level 1 · Lollipop Lane is sweet and deceptively calm.";
    if(rank<=30) return `Candyland Level ${rank} · New candy colors are appearing.`;
    if(rank<=65) return `Candyland Level ${rank} · The gumdrop creatures are getting tougher.`;
    if(rank<=95) return `Candyland Level ${rank} · Candycane Bridge is getting dangerous.`;
    if(rank<120) return `Candyland Level ${rank} · The Chocolate Lake is getting close.`;
    return `Candyland Level 120 · The Chocolate Lake finale is here. Something special may be waiting!`;
  }
  if(areaId==="ocean"){
    if(rank<=1) return "Ocean Level 1 · The shore is calm... for now.";
    if(rank<=18) return `Ocean Level ${rank} · New colors are beginning to appear.`;
    if(rank<=38) return `Ocean Level ${rank} · Special enemy moves are joining the tide.`;
    if(rank<=58) return `Ocean Level ${rank} · Deep-water enemies are much tougher.`;
    if(rank<80) return `Ocean Level ${rank} · Elite colors are beginning to surface.`;
    return `Ocean Level 80 · The deepest route is here. A surprise waits beyond the clear!`;
  }
  if(rank<=1) return "Level 1 · A gentle place to begin.";
  if(rank<=6) return `Level ${rank} · Enemies are starting to toughen up.`;
  if(rank<=12) return `Level ${rank} · A proper challenge. Better loot too!`;
  if(rank<=20) return `Level ${rank} · The meadow is getting dangerous.`;
  return rank>=40 ? `Level 40 · The final clearing is here. Something special may be waiting!` : `Level ${rank} · High-risk, high-reward territory.`;
}

function renderMenuSkills() {
  if(!ui.menuSkills) return;
  ui.menuSkills.innerHTML="";
  sortedActiveSkills().forEach(skill=>{
    const el=document.createElement("div");
    const unlocked=activeHeroProgress().level>=skill.unlock;
    el.className=`skill-summary${unlocked?"":" locked"}`;
    const status=unlocked?"Unlocked":`Unlocks at Lv. ${skill.unlock}`;
    el.innerHTML=`<div class="skill-summary-title"><strong>${skillDisplayName(skill)}</strong><small>${status}</small></div><span>${skillDisplayDescription(skill)}</span>`;
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
  if(areaId==="candy"){
    const stagePools=[
      ["apple-baby","gummy-worm"],
      ["pudding-pig","gingerlolly"],
      ["candycane-deer","gingerlolly"]
    ];
    const encounters=stagePools.map(pool=>makeStageEncounter(pool));
    const candyBosses=["gummy-shark","cream-fox"];
    encounters.push({type:"boss",enemyId:candyBosses[randInt(0,candyBosses.length-1)]});
    return encounters;
  }
  if(areaId==="cloud"){
    const stagePools=[
      ["star-mouse","puff-fairy"],
      ["tulipa","snoud"],
      ["cloud-bunny","lunar-moth"]
    ];
    const encounters=stagePools.map(pool=>makeStageEncounter(pool));
    const cloudBosses=["aries","cherub-duck"];
    encounters.push({type:"boss",enemyId:cloudBosses[randInt(0,cloudBosses.length-1)]});
    return encounters;
  }
  if(areaId==="ocean"){
    const stagePools=[
      ["cool-seagull","sea-turtle","seaunicorn","sea-star"],
      ["cool-seagull","sea-turtle","seaunicorn","sea-star"],
      ["catfish","sea-turtle","seaunicorn","sea-star"]
    ];
    const encounters=stagePools.map(pool=>makeStageEncounter(pool));
    const oceanBosses=["vampire-squid","jellybun"];
    encounters.push({type:"boss",enemyId:oceanBosses[randInt(0,oceanBosses.length-1)]});
    return encounters;
  }

  const stagePools=[
    ["bee","cat-slime","acorn-mouse","catterpillar"],
    ["cat-slime","flower","acorn-mouse","catterpillar"],
    ["bee","flower","cat-slime","acorn-mouse","catterpillar"]
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
  return Math.max(1,Math.min(160,1+Math.floor((Math.max(1,floor)-1)/2)));
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
    hp:stats.maxHp,maxHp:stats.maxHp,coinsEarned:0,expEarned:0,happinessEarned:0,itemsEarned:[],iconBackgroundsEarned:[],iconBorderStylesEarned:[],iconBorderColorsEarned:[],wallpapersEarned:[],closetRewardsEarned:[],uiThemesEarned:[],levelBackgroundsEarned:[],levelsGained:[],bossWon:false,
    endlessFloorsCompleted:0,endlessRunCounted:false
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
    hp:stats.maxHp,maxHp:stats.maxHp,coinsEarned:0,expEarned:0,happinessEarned:0,itemsEarned:[],iconBackgroundsEarned:[],wallpapersEarned:[],closetRewardsEarned:[],uiThemesEarned:[],levelBackgroundsEarned:[],levelsGained:[],bossWon:false
  };
  progress.lastRank=selectedRank; activeHeroProgress().lastArea=selectedArea; persistAll();
  showScreen("battle"); startEncounter();
}

function showScreen(which) {
  if(which!=="home"){ closeRoutePicker(); closeSkillBook(); }
  ui.home.classList.toggle("hidden", which!=="home");
  ui.charm?.classList.toggle("hidden", which!=="charm");
  ui.buddy?.classList.toggle("hidden", which!=="buddy");
  ui.battle.classList.toggle("hidden", which!=="battle");
  ui.result.classList.toggle("hidden", which!=="result");
  if(which==="buddy") renderBuddyCollection();
  if(which==="charm") renderCharmScreen();
}

function startEncounter() {
  clearAnimations();
  actionLocked=false;
  pendingChest=null;
  pendingDefeatedEnemy=null;
  befriendAttempted=false;
  ui.befriendPanel?.classList.add("hidden");
  ui.ponPurchasePanel?.classList.add("hidden");
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
    enemyBurnTurns:0, enemyBurnDamagePercent:0,
    heroMissTurns:0, heroMissChance:0,
    enemyNextAttackMultiplier:1, enemyStunned:false, enemyStunTurns:0
  };
  buddyUsedThisHeroTurn=false;
  renderBattleCharmStrip();
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
    ui.encounterLabel.textContent=`${cfg.stageNames[currentRun.index].toUpperCase()} · ${currentRun.index+1} / 4`;
    ui.rankBattleLabel.textContent=`${cfg.name} · Level ${currentRun.rank}`;
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

function playShinyArrivalSparkle(target){
  if(!target) return;
  target.querySelectorAll(".shiny-arrival-burst").forEach(node=>node.remove());
  const burst=document.createElement("span");
  burst.className="shiny-arrival-burst";
  burst.setAttribute("aria-hidden","true");
  const stars=[
    ["✦","8%","14%","0s"],["✨","28%","5%",".08s"],["★","52%","1%",".16s"],
    ["✧","76%","8%",".04s"],["✨","94%","24%",".20s"],["✦","98%","52%",".10s"],
    ["★","88%","78%",".28s"],["✧","66%","92%",".14s"],["✨","43%","96%",".32s"],
    ["✦","20%","88%",".22s"],["★","3%","72%",".12s"],["✨","0%","44%",".26s"],
    ["✧","24%","48%",".34s"],["✦","72%","46%",".38s"]
  ];
  stars.forEach(([glyph,left,top,delay],index)=>{
    const star=document.createElement("span");
    star.className="shiny-arrival-star";
    star.textContent=glyph;
    star.style.left=left; star.style.top=top; star.style.animationDelay=delay;
    star.style.setProperty("--sparkle-rotate",`${index%2?22:-22}deg`);
    burst.appendChild(star);
  });
  target.appendChild(burst);
  setTimeout(()=>burst.remove(),1900);
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
    enemyId==="catterpillar" ? applyCatterpillarVariant(baseTemplate,variantRank) :
    enemyId==="sea-star" ? applySeaStarVariant(baseTemplate,variantRank) :
    enemyId==="apple-baby" ? applyAppleBabyVariant(baseTemplate,variantRank) :
    enemyId==="gummy-worm" ? applyGummyWormVariant(baseTemplate,variantRank) :
    enemyId==="pudding-pig" ? applyPuddingPigVariant(baseTemplate,variantRank) :
    enemyId==="gingerlolly" ? applyGingerlollyVariant(baseTemplate,variantRank) :
    enemyId==="candycane-deer" ? applyCandycaneDeerVariant(baseTemplate,variantRank) :
    enemyId==="gummy-shark" ? applyGummySharkVariant(baseTemplate,variantRank) :
    enemyId==="cream-fox" ? applyCreamFoxVariant(baseTemplate,variantRank) :
    enemyId==="star-mouse" ? applyStarMouseVariant(baseTemplate,variantRank) :
    enemyId==="puff-fairy" ? applyPuffFairyVariant(baseTemplate,variantRank) :
    enemyId==="tulipa" ? applyTulipaVariant(baseTemplate,variantRank) :
    enemyId==="snoud" ? applySnoudVariant(baseTemplate,variantRank) :
    enemyId==="cloud-bunny" ? applyCloudBunnyVariant(baseTemplate,variantRank) :
    enemyId==="lunar-moth" ? applyLunarMothVariant(baseTemplate,variantRank) :
    enemyId==="aries" ? applyAriesVariant(baseTemplate,variantRank) :
    enemyId==="cherub-duck" ? applyCherubDuckVariant(baseTemplate,variantRank) :
    enemyId==="mimic" ? applyMimicProfile(baseTemplate,variantRank) : baseTemplate;
  const template=maybeApplyShinyVariant(enemyId,normalTemplate,Boolean(options.forceShiny));

  currentEnemy=currentRun?.mode==="endless"
    ? endlessEnemyScaled(template,currentRun.floor)
    : enemyScaled(template,currentRun.rank,currentRun.area);
  currentEnemy.id=enemyId;
  currentEnemy.healsUsed=0; currentEnemy.specialUses=0; currentEnemy.shellHitsRemaining=0;
  currentEnemy.zoomiesBoost=false; currentEnemy.lifeDrainsUsed=0;
  warmCurrentBattleAssets(currentEnemy);
  ui.enemyCombatant.classList.remove("hidden");
  ui.enemySprite.classList.remove("boss-fighter","gold-boss-fighter","queen-bee-fighter","strawberry-slime-fighter","rainbow-flower-fighter","ocean-elite-fighter","ocean-boss-fighter","cream-fox-fighter");
  renderEnemyName(currentEnemy);
  ui.enemyRank.textContent=currentRun?.mode==="endless"
    ? `${currentEnemy.boss?"BOSS · ":""}Floor ${currentRun.floor}`
    : currentEnemy.boss?`BOSS · Level ${currentRun.rank}`:`Level ${currentRun.rank}`;
  ui.enemySprite.classList.toggle("boss-fighter",Boolean(currentEnemy.boss));
  ui.enemySprite.classList.toggle("gold-boss-fighter",currentEnemy.mushroomVariant==="gold");
  ui.enemySprite.classList.toggle("queen-bee-fighter",currentEnemy.beeVariant==="queen");
  ui.enemySprite.classList.toggle("strawberry-slime-fighter",currentEnemy.catSlimeVariant==="strawberry");
  ui.enemySprite.classList.toggle("rainbow-flower-fighter",currentEnemy.flowerVariant==="rainbow");
  ui.enemySprite.classList.toggle("ocean-elite-fighter",Boolean(currentEnemy.eliteVariant));
  ui.enemySprite.classList.toggle("ocean-boss-fighter",enemyId==="vampire-squid");
  ui.enemySprite.classList.toggle("cream-fox-fighter",enemyId==="cream-fox");
  renderEnemyHp(); startEnemyIdle(); renderBattleBuddy(); renderSkills(); renderBattleItems();
  if(currentEnemy.shiny) requestAnimationFrame(()=>playShinyArrivalSparkle(ui.enemyCombatant));
  const openingBuddy=mainBuddyRecord();
  if(openingBuddy?.shiny) requestAnimationFrame(()=>playShinyArrivalSparkle(ui.buddyCombatant));
  ui.commandGrid.classList.remove("hidden"); closeCommandWindow(); renderBattleItems(); renderCommandButtons();
  if(currentEnemy.shiny) setMessage(`${currentEnemy.name} ✨ appeared! A super-rare Shiny Buddy!`);
  else if(enemyId==="vampire-squid") setMessage(`${currentEnemy.name} rises from the depths!`);
  else if(enemyId==="jellybun") setMessage(`${currentEnemy.name} bounces in to guard the Ocean Floor!`);
  else if(enemyId==="tree-squirrel") setMessage(`${currentEnemy.name} drops down to guard the clearing!`);
  else if(enemyId==="gummy-shark") setMessage(`${currentEnemy.name} splashes out of the Chocolate Lake!`);
  else if(enemyId==="cream-fox") setMessage(`${currentEnemy.name} bounds in to guard the Chocolate Lake!`);
  else if(enemyId==="aries") setMessage(`${currentEnemy.name} charges into the Star Sanctuary!`);
  else if(enemyId==="cherub-duck") setMessage(`${currentEnemy.name} flutters down to guard the Halo!`);
  else if(currentEnemy.boss) setMessage(`${currentEnemy.name} blocks the path!`);
  else setMessage(`${currentEnemy.name} appeared!`);
}

function startBuddyIdle(buddy){
  clearInterval(buddyIdleTimer);
  buddyIdleTimer=null;
  buddyIdleIndex=0;
  const frames=Array.isArray(buddy?.idle) && buddy.idle.length ? buddy.idle : [buddy?.image].filter(Boolean);
  if(!frames.length || !ui.buddyBattleSprite) return;
  ui.buddyBattleSprite.src=frames[0];
  if(frames.length < 2) return;
  buddyIdleTimer=setInterval(()=>{
    if(actionLocked || !ui.buddyCombatant || ui.buddyCombatant.classList.contains("hidden")) return;
    buddyIdleIndex=(buddyIdleIndex+1)%frames.length;
    ui.buddyBattleSprite.src=frames[buddyIdleIndex];
  },380);
}

function renderBattleBuddy(){
  const buddy=mainBuddyRecord();
  if(!ui.buddyCombatant || !ui.buddyBattleSprite) return;
  if(!buddy || !buddySkillForEnemyId(buddy.enemyId) || !currentEnemy){
    clearInterval(buddyIdleTimer);
    buddyIdleTimer=null;
    ui.buddyCombatant.classList.add("hidden");
    return;
  }
  const buddyLabel=`${buddy.name || "Buddy"}${buddy.genderSymbol?` ${buddy.genderSymbol}`:""}`;
  ui.buddyBattleName.textContent=buddyLabel;
  ui.buddyBattleSprite.alt=buddyLabel;
  ui.buddyCombatant.classList.toggle("boss-buddy",Boolean(buddy.boss));
  ui.buddyBattleSparkle?.classList.toggle("hidden",!buddy.shiny);
  ui.buddyCombatant.classList.remove("hidden");
  startBuddyIdle(buddy);
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
        const coins=Math.max(1,Math.round(randInt(15,35)*affectionRewardMultiplier()));
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

function hpFillColor(pct, enemy=false) {
  const value=Math.max(0,Math.min(100,Number(pct)||0));
  if(enemy){
    if(value<=25) return "#b94456";
    if(value<=50) return "#dc7a68";
    return "#d76570";
  }
  if(value<=25) return "#d85b63";
  if(value<=50) return "#d6aa52";
  return "#6fb875";
}

function paintHpBar(fillEl,pct,enemy=false) {
  if(!fillEl) return;
  const value=Math.max(0,Math.min(100,Number(pct)||0));
  const bar=fillEl.parentElement;
  const color=hpFillColor(value,enemy);

  // Hub v24.79: paint the fill on the OUTER bar itself. Some mobile
  // browsers were reporting the correct HP/width while failing to paint
  // the inner span, leaving a visually empty bar.
  if(bar){
    bar.style.setProperty("--hp-pct",`${value}%`);
    bar.style.setProperty("--hp-color",color);
    bar.setAttribute("aria-valuenow",String(Math.round(value)));
  }

  // Keep the legacy child updated for compatibility/accessibility, but the
  // visible fill no longer depends on this element.
  fillEl.style.width=`${value}%`;
  fillEl.style.backgroundColor=color;
  fillEl.setAttribute("aria-valuenow",String(Math.round(value)));
}

function renderPeepHp() {
  const pct=Math.max(0,Math.min(100,(currentRun.hp/currentRun.maxHp)*100));
  paintHpBar(ui.peepHpFill,pct,false);
  ui.peepHpText.textContent=`${Math.max(0,Math.round(currentRun.hp))} / ${currentRun.maxHp} HP`;
}

function renderEnemyHp() {
  if(!currentEnemy) return;
  const pct=Math.max(0,Math.min(100,(currentEnemy.hpNow/currentEnemy.maxHp)*100));
  paintHpBar(ui.enemyHpFill,pct,true);
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
  clearInterval(buddyIdleTimer); buddyIdleTimer=null;
}

function renderSkills() {
  ui.skillButtons.innerHTML="";

  sortedActiveSkills()
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
      } else if(["buff","full-heal-buff","self-damage-buff"].includes(skill.type) && skill.type!=="full-heal-buff" && skillState.attackBuffTurns>0) {
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

      button.className=`pixel-button skill-button ${(skill.type==="heal"||skill.type==="full-heal")?"heal":isStatusSkill(skill)?"buff":skill.id==="duck-throw"?"duck":skill.oncePerBattle?"ultimate":""}`;
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

function escapeHtml(value){
  return String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[char]));
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
  const buddyNameLabel=`${buddy.shiny?"✨ ":""}${escapeHtml(buddy.name)}${buddy.genderSymbol?` ${buddy.genderSymbol}`:""}`;
  button.innerHTML=`<span class="buddy-skill-row"><img src="${buddy.image}" alt=""><span><strong>${buddyNameLabel}</strong><em>${skill.name}</em></span></span><span>${cooldown>0?`Cooldown: ${cooldown} turn${cooldown===1?"":"s"}`:skill.description}</span>`;
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
  ui.itemPonShopActions?.classList.add("hidden");
  ui.ponPurchasePanel?.classList.add("hidden");

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
    ui.itemPonShopActions?.classList.remove("hidden");
    ui.noBattleItems.classList.add("hidden");
  }
}

function closeCommandWindow() {
  delete ui.commandWindow.dataset.kind;
  ui.commandWindow.classList.add("hidden");
  ui.skillButtons.classList.add("hidden");
  ui.itemButtons.classList.add("hidden");
  ui.noBattleItems.classList.add("hidden");
  ui.itemPonShopActions?.classList.add("hidden");
  ui.ponPurchasePanel?.classList.add("hidden");
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

  // Healing items stay in Item and only appear when the player owns one.
  battleItems.forEach(item => {
    const qty = hubInventoryQty(item.id);
    if (qty <= 0) return;

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

  // v37: Buddy Pons are now battle items. They are always shown so the
  // player can see their current quantity and exact catch chance.
  BUDDY_PONS.forEach(pon => {
    const qty=hubInventoryQty(pon.id);
    const rate=buddyPonCatchRate(pon,currentEnemy);
    const button=document.createElement("button");
    button.type="button";
    button.className=`pixel-button battle-item-button buddy-pon-item${pon.className?` ${pon.className}`:""}`;
    button.dataset.ponId=pon.id;
    button.disabled=actionLocked || !currentEnemy || qty<=0 || rate<=0;
    const lowHpBonus=buddyLowHpCatchBonus(currentEnemy)>0;
    const rateLabel=rate>0 ? `${Math.round(rate*100)}% catch${lowHpBonus?" · Low HP bonus!":""}` : "Can't catch this boss";
    button.innerHTML=`
      <img src="${pon.image}" alt="">
      <span>
        <strong>${pon.name}</strong>
        <small>×${qty} · ${rateLabel}</small>
      </span>
    `;
    button.addEventListener("click",()=>attemptBattleCapture(pon.id));
    ui.itemButtons.appendChild(button);
  });

  ui.noBattleItems.classList.add("hidden");
  renderPonPurchaseChoices();
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

function heroCanMissFromFluster(skill) {
  if(!skill || !skillState) return false;
  if(["heal","full-heal","buff","full-heal-buff","self-damage-buff"].includes(skill.type)) return false;
  return Number(skillState.heroMissTurns||0) > 0 && Math.random() < Number(skillState.heroMissChance||0);
}

async function applyEnemyBurnTick() {
  if(!currentEnemy || currentEnemy.hpNow<=0 || Number(skillState.enemyBurnTurns||0)<=0) return false;
  const percent=Math.max(0.01, Number(skillState.enemyBurnDamagePercent||0.08));
  const dmg=Math.max(1, Math.round(currentEnemy.maxHp*percent));
  const before=currentEnemy.hpNow;
  currentEnemy.hpNow=Math.max(0, currentEnemy.hpNow-dmg);
  const dealt=Math.max(0, before-currentEnemy.hpNow);
  if(dealt>0) {
    setMessage(`${currentEnemy.name} is hurt by burn!`);
    if(ui.enemySprite) ui.enemySprite.classList.add("hurt-pop");
    showFloat(`-${dealt}`,"damage","enemy");
    renderEnemyHp();
    await sleep(420);
    if(ui.enemySprite) ui.enemySprite.classList.remove("hurt-pop");
  }
  if(Number.isFinite(skillState.enemyBurnTurns)) skillState.enemyBurnTurns=Math.max(0, Number(skillState.enemyBurnTurns)-1);
  if(currentEnemy.hpNow<=0) {
    await enemyDefeated();
    return true;
  }
  return false;
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
  } else if(skill.type==="full-heal-buff") {
    if(skill.oncePerBattle && skillState.onceUsed?.[skill.id]){
      setMessage(`${skillDisplayName(skill)} has already been used this battle!`);
      actionLocked=false; renderSkills(); renderCommandButtons(); return;
    }
    const before=currentRun.hp;
    currentRun.hp=currentRun.maxHp;
    const healed=Math.max(0,currentRun.hp-before);
    skillState.attackBuffTurns=skill.duration||4;
    skillState.attackBuffMultiplier=1+(skill.attackBoost||0.50);
    skillState.activeBuffSkillId=skill.id;
    if(skill.oncePerBattle) skillState.onceUsed[skill.id]=true;
    const boost=Math.round((skill.attackBoost||0.50)*100);
    setMessage(`${skillDisplayName(skill)}! ${heroDisplayName()} restored ${healed} HP and Attack rose by ${boost}% for ${skillState.attackBuffTurns} turns.`);
    if(healed>0) showFloat(`+${healed}`,"heal","peep");
    renderPeepHp();
    await sleep(760);
  } else if(skill.type==="self-damage-buff") {
    const requested=Math.max(0,Number(skill.selfDamage)||10);
    const before=currentRun.hp;
    currentRun.hp=Math.max(1,currentRun.hp-requested);
    const lost=Math.max(0,before-currentRun.hp);
    skillState.attackBuffTurns=skill.duration||4;
    skillState.attackBuffMultiplier=1+(skill.attackBoost||0.50);
    skillState.activeBuffSkillId=skill.id;
    const boost=Math.round((skill.attackBoost||0.50)*100);
    setMessage(`${skillDisplayName(skill)}! ${heroDisplayName()} loses ${lost} HP, but Attack rises by ${boost}% for ${skillState.attackBuffTurns} turns.`);
    if(lost>0) showFloat(`-${lost}`,"damage","peep");
    renderPeepHp();
    await sleep(760);
  } else if(skill.type==="buff") {
    skillState.attackBuffTurns=skill.duration||3;
    skillState.attackBuffMultiplier=1+(skill.attackBoost||0.30);
    skillState.activeBuffSkillId=skill.id;
    if(skill.missChance){
      skillState.heroMissTurns=skillState.attackBuffTurns;
      skillState.heroMissChance=skill.missChance;
    } else {
      skillState.heroMissTurns=0;
      skillState.heroMissChance=0;
    }
    const boost=Math.round((skill.attackBoost||0.30)*100);
    if(skill.missChance){
      const missPct=Math.round(skill.missChance*100);
      setMessage(`${skillDisplayName(skill)}! ${heroDisplayName()}'s Attack rose by ${boost}% for ${skillState.attackBuffTurns} turns, but there is a ${missPct}% chance to miss while flustered.`);
    } else {
      setMessage(`${skillDisplayName(skill)}! ${heroDisplayName()}'s Attack rose by ${boost}% for ${skillState.attackBuffTurns} turns.`);
    }
    await sleep(700);
  } else if(skill.type==="stun") {
    if(skill.cooldown) skillState.cooldowns[skill.id]=skill.cooldown;
    skillState.enemyStunTurns=Math.max(Number(skillState.enemyStunTurns||0), Math.max(1,Number(skill.duration)||2));
    const turns=skillState.enemyStunTurns;
    setMessage(`${skillDisplayName(skill)}! ${currentEnemy.name} froze for ${turns} turn${turns===1?"":"s"}!`);
    await sleep(700);
  } else if(skill.type==="safe-chip") {
    if(heroCanMissFromFluster(skill)) {
      setMessage(`${heroDisplayName()} got too flustered and missed!`);
      await sleep(540);
    } else {
    const beforeHp=Math.max(0,Number(currentEnemy.hpNow)||0);
    const canDamage=beforeHp>1;
    if(canDamage){
      const stats=peepStats();
      const boostedAttack=stats.attack
        *(skillState.attackBuffTurns>0?skillState.attackBuffMultiplier:1)
        *(skillState.buddyAttackBuffTurns>0?skillState.buddyAttackMultiplier:1)
        *(skillState.enemyDefenseDownTurns>0?skillState.enemyDefenseMultiplier:1);
      const crit=Math.random()<0.11;
      const variance=0.9+Math.random()*0.2;
      const dmg=Math.max(1,Math.round(boostedAttack*variance*(crit?1.5:1)));
      setMessage(`${skillDisplayName(skill)} ${heroDisplayName()} gives ${currentEnemy.name} a careful smack!${crit?" CRITICAL!":""}`);
      await sleep(280);
      await hurtEnemyNonLethal(dmg);
    } else {
      setMessage(`${currentEnemy.name} is already at 1 HP — the smack won't knock it out!`);
      await sleep(540);
    }
    }
  } else if(skill.type==="multi-hit") {
    if(heroCanMissFromFluster(skill)) {
      if(skill.cooldown) skillState.cooldowns[skill.id]=skill.cooldown;
      if(skill.oncePerBattle) skillState.onceUsed[skill.id]=true;
      setMessage(`${heroDisplayName()} got too flustered and missed!`);
      await sleep(540);
    } else {
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
    }
  } else if(skill.type==="damage-burn") {
    if(heroCanMissFromFluster(skill)) {
      setMessage(`${heroDisplayName()} got too flustered and missed!`);
      await sleep(540);
    } else {
      let multiplier=skill.multiplier||1;
      let flavor=skillDisplayName(skill);
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
      if(currentEnemy && currentEnemy.hpNow>0 && Math.random() < Number(skill.burnChance||1)) {
        skillState.enemyBurnTurns=Math.max(Number(skillState.enemyBurnTurns||0), Number(skill.burnTurns||99));
        skillState.enemyBurnDamagePercent=Number(skill.burnDamagePercent||0.08);
        setMessage(`${currentEnemy.name} was burned!`);
        await sleep(420);
      }
    }
  } else {
    if(heroCanMissFromFluster(skill)) {
      setMessage(`${heroDisplayName()} got too flustered and missed!`);
      await sleep(540);
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
  if(usedSkillId!==skillState.activeBuffSkillId && skillState.heroMissTurns>0) {
    skillState.heroMissTurns--;
    if(skillState.heroMissTurns<=0) skillState.heroMissChance=0;
  }
  tickPlayerBuddyEffects();
}

async function hurtEnemyNonLethal(dmg=1) {
  if(!currentEnemy) return;
  const before=Math.max(0,Number(currentEnemy.hpNow)||0);
  if(before<=1){
    currentEnemy.hpNow=1;
    renderEnemyHp();
    return;
  }
  const finalDmg=Math.max(1,Math.round(Number(dmg)||1));
  currentEnemy.hpNow=Math.max(1,before-finalDmg);
  const dealt=Math.max(0,before-currentEnemy.hpNow);
  if(ui.enemySprite){
    ui.enemySprite.src=currentEnemy.hurt;
    ui.enemySprite.classList.add("hurt-pop");
  }
  if(dealt>0) showFloat(`-${dealt}`,"damage","enemy");
  renderEnemyHp();
  await sleep(360);
  if(ui.enemySprite) ui.enemySprite.classList.remove("hurt-pop");
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

  if(Number(skillState.enemyStunTurns||0)>0){
    skillState.enemyStunTurns=Math.max(0,Number(skillState.enemyStunTurns||0)-1);
    const remaining=skillState.enemyStunTurns;
    setMessage(`${currentEnemy.name} is frozen and couldn't move!${remaining>0?` ${remaining} frozen turn${remaining===1?"":"s"} left.`:""}`);
    await sleep(650);
    tickEnemyBuddyEffects();
    setMessage(`${heroDisplayName()} is ready!`);
    return;
  }

  if(skillState.enemyStunned){
    skillState.enemyStunned=false;
    setMessage(`${currentEnemy.name} is stunned and couldn't move!`);
    await sleep(650);
    tickEnemyBuddyEffects();
    setMessage(`${heroDisplayName()} is ready!`);
    return;
  }

  const finishEnemyBuddyTurn=async()=>{
    const burnedOut = await applyEnemyBurnTick();
    if(burnedOut) return true;
    tickEnemyBuddyEffects();
    return false;
  };

  // Generic healer variants: Blue Seagull, Green Slime, Orange Flower, etc.
  const canSelfHeal=currentEnemy.healPercent>0 && currentEnemy.hpNow<currentEnemy.maxHp &&
    Number(currentEnemy.healsUsed||0)<Number(currentEnemy.maxHeals||0) &&
    currentEnemy.hpNow<=currentEnemy.maxHp*.72 && Math.random()<Number(currentEnemy.healChance||0);
  if(canSelfHeal){
    const amount=Math.max(1,Math.round(currentEnemy.maxHp*currentEnemy.healPercent));
    const before=currentEnemy.hpNow; currentEnemy.hpNow=Math.min(currentEnemy.maxHp,currentEnemy.hpNow+amount); currentEnemy.healsUsed++;
    const gained=currentEnemy.hpNow-before; setMessage(`${currentEnemy.name} used ${currentEnemy.healMoveName||"Recovery!"}`);
    ui.enemySprite.classList.add("attack-pop");showFloat(`+${gained}`,"heal","enemy");renderEnemyHp();await sleep(650);
    ui.enemySprite.classList.remove("attack-pop");if(await finishEnemyBuddyTurn()) return; setMessage(`${heroDisplayName()} is ready!`);return;
  }

  // Pink Sea Turtle: protects itself from the next two player attacks.
  if(currentEnemy.specialType==="harden-shell" && !currentEnemy.shellHitsRemaining &&
     currentEnemy.specialUses<currentEnemy.maxSpecialUses && Math.random()<currentEnemy.specialChance){
    currentEnemy.specialUses++;currentEnemy.shellHitsRemaining=2;
    setMessage(`${currentEnemy.name} used Harden Shell! The next 2 hits deal 25% less damage.`);
    ui.enemySprite.classList.add("attack-pop");await sleep(650);ui.enemySprite.classList.remove("attack-pop");if(await finishEnemyBuddyTurn()) return; return;
  }

  // Orange Cat-Fish: spends a turn powering up its next attack.
  if(currentEnemy.specialType==="zoomies" && !currentEnemy.zoomiesBoost &&
     currentEnemy.specialUses<currentEnemy.maxSpecialUses && Math.random()<currentEnemy.specialChance){
    currentEnemy.specialUses++;currentEnemy.zoomiesBoost=true;
    setMessage(`${currentEnemy.name} used Zoomies! Its next attack is powered up by 25%.`);
    ui.enemySprite.classList.add("attack-pop");await sleep(650);ui.enemySprite.classList.remove("attack-pop");if(await finishEnemyBuddyTurn()) return; return;
  }

  // Every Vampire Squid can use Life Drain twice per battle.
  if(currentEnemy.lifeDrain && currentEnemy.hpNow<currentEnemy.maxHp &&
     currentEnemy.lifeDrainsUsed<currentEnemy.maxLifeDrains && Math.random()<currentEnemy.lifeDrainChance){
    currentEnemy.lifeDrainsUsed++;
    await performEnemyAttack(currentEnemy.lifeDrainDamage,`${currentEnemy.name} used Life Drain!`,currentEnemy.lifeDrainHeal);
    if(await finishEnemyBuddyTurn()) return;
    if(currentRun.hp>0) setMessage(`Life Drain stole some of ${heroDisplayName()}'s HP!`);
    return;
  }

  const boosted=Boolean(currentEnemy.zoomiesBoost);
  if(boosted) currentEnemy.zoomiesBoost=false;
  await performEnemyAttack(boosted?1.25:1,boosted?`${currentEnemy.name}'s Zoomies-powered attack!`:"");
  if(await finishEnemyBuddyTurn()) return;
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

function buddyLowHpCatchBonus(enemy){
  if(!enemy || enemy.shiny) return 0;
  const maxHp=Math.max(1,Number(enemy.maxHp)||1);
  const hpNow=Math.max(0,Number(enemy.hpNow));
  return hpNow/maxHp<=0.50 ? 0.10 : 0;
}

function buddyPonCatchRate(pon, enemy) {
  if(!pon || !enemy) return 0;
  if(enemy.shiny) return 1;
  const base=enemy.boss
    ? Math.max(0,Math.min(1,Number(pon.bossRate)||0))
    : Math.max(0,Math.min(1,Number(pon.normalRate)||0));
  if(base<=0) return 0;
  const friendBonus=Math.max(0,Number(activeCharmByFamily("best-friend")?.catchBonus)||0);
  return Math.max(0,Math.min(1,base+buddyLowHpCatchBonus(enemy)+friendBonus));
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
    button.dataset.ponId=pon.id;
    const price=Math.max(0,Number(pon.price)||0);
    const catchRate=currentEnemy ? buddyPonCatchRate(pon,currentEnemy) : 0;
    const canAfford=Number(hubSave.coins)>=price;
    button.disabled=actionLocked || !currentEnemy || !canAfford || catchRate<=0;
    const lowHpBonus=buddyLowHpCatchBonus(currentEnemy)>0;
    const chanceLabel=catchRate>0 ? `${Math.round(catchRate*100)}% vs ${currentEnemy.name}${currentEnemy.shiny?" ✨":""}${lowHpBonus?" · Low HP bonus":""}` : "0% vs this boss";
    button.innerHTML=`<img src="${pon.image}" alt=""><span><strong>${pon.name}</strong><small>${price} Pink Coins · ${chanceLabel}</small></span>`;
    button.addEventListener("click",()=>purchaseBuddyPon(pon.id));
    ui.ponPurchaseChoices.appendChild(button);
  });
  if(ui.purchasePonButton) ui.purchasePonButton.disabled=actionLocked || !currentEnemy;
}

function togglePonPurchasePanel() {
  if(!ui.ponPurchasePanel || actionLocked || !currentEnemy) return;
  const willOpen=ui.ponPurchasePanel.classList.contains("hidden");
  ui.ponPurchasePanel.classList.toggle("hidden",!willOpen);
  if(willOpen) {
    if(ui.ponPurchaseMessage) ui.ponPurchaseMessage.textContent="Buy Pons here and use them immediately in this battle.";
    renderPonPurchaseChoices();
  }
}

function purchaseBuddyPon(ponId) {
  if(actionLocked || !currentEnemy) return;
  const pon=BUDDY_PONS.find(item=>item.id===ponId);
  if(!pon) return;
  const catchRate=buddyPonCatchRate(pon,currentEnemy);
  if(catchRate<=0) return;
  const price=Math.max(0,Number(pon.price)||0);
  const coins=Math.max(0,Number(hubSave.coins)||0);
  if(coins<price) {
    if(ui.ponPurchaseMessage) ui.ponPurchaseMessage.textContent=`You need ${price-coins} more Pink Coins for a ${pon.name}.`;
    renderPonPurchaseChoices();
    return;
  }
  hubSave.coins=coins-price;
  if(!hubSave.inventory || typeof hubSave.inventory!=="object" || Array.isArray(hubSave.inventory)) hubSave.inventory={};
  const nextQty=hubInventoryQty(pon.id)+1;
  hubSave.inventory[pon.id]=nextQty;
  persistAll();
  renderMeta();
  renderBattleItems();
  renderPonPurchaseChoices();
  if(ui.ponPurchaseMessage) ui.ponPurchaseMessage.textContent=`Purchased 1 ${pon.name}! You now have ×${nextQty}.`;
}

async function attemptBattleCapture(ponId) {
  if(actionLocked || !currentEnemy || !currentRun) return;
  const pon=BUDDY_PONS.find(item=>item.id===ponId);
  if(!pon) return;
  const target=currentEnemy;
  const rate=buddyPonCatchRate(pon,target);
  if(rate<=0 || hubInventoryQty(pon.id)<=0) return;
  if(!consumeHubItem(pon.id,1)) return;

  closeCommandWindow();
  actionLocked=true;
  renderCommandButtons();
  renderBattleItems();
  setMessage(`${heroDisplayName()} threw a ${pon.name}!`);
  animateBuddyPon(pon);
  await sleep(760);

  const success=rate>=1 || Math.random()<rate;
  if(success) {
    const buddy=captureBuddy(target);
    renderEnemyName(target);
    renderBuddyHomeCount();
    setMessage(`${target.name}${target.shiny?" ✨":""} became your Buddy! You now own ×${buddy.quantity}.`);
    await sleep(520);
    await enemyDefeated({captured:true});
    return;
  }

  setMessage(`${target.name}${target.shiny?" ✨":""} slipped out of the ${pon.name}!`);
  await sleep(520);
  // A failed throw is the OC's Item action, just like a healing item.
  decrementCooldowns("buddy-pon");
  await enemyTurn();
  actionLocked=false;
  renderCommandButtons();
  renderSkills();
  renderBattleItems();
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
    button.dataset.ponId=pon.id;
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

async function enemyDefeated(options={}) {
  clearInterval(idleTimer);
  if(!currentEnemy) return;
  const defeated={...currentEnemy};
  currentEnemy=null;
  ui.commandGrid.classList.add("hidden");
  closeCommandWindow();
  ui.enemyCombatant.classList.add("hidden");
  setMessage(options.captured
    ? `${defeated.name}${defeated.shiny?" ✨":""} was befriended — battle won!`
    : `${defeated.name}${defeated.shiny?" ✨":""} was defeated!`);

  await sleep(options.captured?280:350);

  const isBoss=Boolean(defeated.boss);
  pendingChest={
    kind:isBoss?"boss":"normal",
    revealMimic:false,
    enemy:defeated
  };

  // v37: Catching happens from Item during combat. Once a foe is defeated
  // or successfully befriended, go directly to the victory chest.
  actionLocked=false;
  showChest(pendingChest);
}

function showChest(data) {
  pendingChest=data;
  ui.buddyCombatant?.classList.add("hidden");
  ui.chestSprite.src=data.mystery
    ? "assets/shinies/amethyst-mimic-closed.webp"
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
  currentRun.endlessFloorsCompleted=Math.max(0,Math.floor(Number(currentRun.endlessFloorsCompleted)||0))+1;
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
    ui.chestSprite.src="assets/shinies/amethyst-mimic-open.webp";
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
  if(rewards.happiness) textParts.push(`♡ +${rewards.happiness} Happiness`);
  else if(rewards.happinessMaxed) textParts.push("♡ Happiness MAX");
  if(rewards.unlockedBackgrounds?.length) textParts.push(rewards.unlockedBackgrounds.map(bg=>`${bg.label} Icon`).join(", "));
  if(rewards.iconBorderStyle) textParts.push(`${rewards.iconBorderStyle.label}`);
  if(rewards.iconBorderColor) textParts.push(`${rewards.iconBorderColor.label} Border Color`);
  if(rewards.items.length) textParts.push(rewards.items.map(x=>`${x.name} ×${x.qty}`).join(", "));
  if(rewards.charmTreasureBonus) textParts.push("Treasure Charm bonus!");

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

function weightedItemWithCharm(){
  const fortune=activeCharmByFamily("fortune");
  const luck=Math.max(0,Math.min(1,Number(fortune?.itemLuck)||0));
  return luck>0&&Math.random()<luck?jackpotItem():weightedItem();
}
function finalizeCharmRewards(reward,chest){
  const fortune=activeCharmByFamily("fortune");
  const training=activeCharmByFamily("training");
  const treasure=activeCharmByFamily("treasure");
  reward.coins=Math.max(0,Math.round((Number(reward.coins)||0)*(1+Math.max(0,Number(fortune?.coinBonus)||0))));
  reward.exp=Math.max(0,Math.round((Number(reward.exp)||0)*(1+Math.max(0,Number(training?.expBonus)||0))));
  const treasureChance=Math.max(0,Math.min(1,Number(treasure?.treasureChance)||0));
  if(treasureChance>0&&Math.random()<treasureChance){ addRewardItem(reward.items,jackpotItem(),1); reward.charmTreasureBonus=true; }
  return reward;
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
    return finalizeCharmRewards({
      coins,exp,happiness:chestHappinessReward(chest),items,
      iconBackground:pickChestIconBackground({kind:"rare"}),
      iconBorderStyle:pickChestIconBorderStyle({kind:"hidden-treasure"}),
      iconBorderColor:pickChestIconBorderColor({kind:"hidden-treasure"}),
      wallpaper:pickChestWallpaper({kind:"hidden-treasure"})
    },chest);
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
      let item=weightedItemWithCharm();
      if(chest.kind==="boss" && items.some(x=>x.id===item.id)) {
        for(let retry=0; retry<5 && items.some(x=>x.id===item.id); retry++) item=weightedItemWithCharm();
      }
      addRewardItem(items,item,1);
    }
  }

  const iconBackground=pickChestIconBackground(chest);
  const iconBorderStyle=pickChestIconBorderStyle(chest);
  const iconBorderColor=pickChestIconBorderColor(chest);
  const wallpaper=pickChestWallpaper(chest);
  return finalizeCharmRewards({coins,exp,happiness:chestHappinessReward(chest),items,iconBackground,iconBorderStyle,iconBorderColor,wallpaper},chest);
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
  const affectionMultiplier=affectionRewardMultiplier();
  rewards.coins=Math.max(0,Math.round((Number(rewards.coins)||0)*affectionMultiplier));
  rewards.exp=Math.max(0,Math.round((Number(rewards.exp)||0)*affectionMultiplier));
  hubSave.coins=Math.max(0,Number(hubSave.coins)||0)+rewards.coins;
  if(!hubSave.stats || typeof hubSave.stats!=="object") hubSave.stats={};
  hubSave.stats.coinsEarnedTotal=Math.max(0,Number(hubSave.stats.coinsEarnedTotal)||0)+Math.max(0,Number(rewards.coins)||0);
  currentRun.coinsEarned+=rewards.coins;
  questSave.totalCoinsEarned=(Number(questSave.totalCoinsEarned)||0)+rewards.coins;

  const chestBackground=rewards.iconBackground ? unlockIconBackground(rewards.iconBackground.id) : null;
  const unlockedBorderStyle=rewards.iconBorderStyle ? unlockIconBorderStyle(rewards.iconBorderStyle.id) : null;
  const unlockedBorderColor=rewards.iconBorderColor ? unlockIconBorderColor(rewards.iconBorderColor.id) : null;
  const unlockedWallpaper=rewards.wallpaper ? unlockWallpaper(rewards.wallpaper.id) : null;

  const levelResult=grantExp(rewards.exp);
  const levelBackgrounds=unlockLevelIconBackgrounds(levelResult);
  rewards.unlockedBackgrounds=[...(chestBackground?[chestBackground]:[]),...levelBackgrounds];

  currentRun.expEarned+=rewards.exp;
  questSave.totalExpEarned=(Number(questSave.totalExpEarned)||0)+rewards.exp;
  const requestedHappiness=Math.max(0,Math.floor(Number(rewards.happiness)||0));
  rewards.happiness=grantQuestHappiness(requestedHappiness);
  rewards.happinessMaxed=requestedHappiness>0 && rewards.happiness===0;
  currentRun.happinessEarned=Math.max(0,Math.floor(Number(currentRun.happinessEarned)||0))+rewards.happiness;
  if(levelResult.length) currentRun.levelsGained.push(...levelResult);
  if(chestBackground) currentRun.iconBackgroundsEarned.push(chestBackground);
  if(unlockedBorderStyle) currentRun.iconBorderStylesEarned.push(unlockedBorderStyle);
  if(unlockedBorderColor) currentRun.iconBorderColorsEarned.push(unlockedBorderColor);
  if(unlockedWallpaper) currentRun.wallpapersEarned.push(unlockedWallpaper);
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
  const newRewardMessages=[];
  if(chestBackground) newRewardMessages.push(`${chestBackground.label} Icon Background`);
  if(unlockedBorderStyle) newRewardMessages.push(`${unlockedBorderStyle.label}`);
  if(unlockedBorderColor) newRewardMessages.push(`${unlockedBorderColor.label} Border Color`);
  if(unlockedWallpaper) newRewardMessages.push(`${unlockedWallpaper.label} Wallpaper`);
  if(newRewardMessages.length) setMessage(`Treasure collected! New reward: ${newRewardMessages.join(" · ")}`);

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
    // Count one Endless Run when the player finishes or pauses a session after
    // completing at least one floor. Simply opening and immediately leaving
    // does not advance the theme milestone counter.
    if(!currentRun.endlessRunCounted && Math.max(0,Number(currentRun.endlessFloorsCompleted)||0)>0){
      currentRun.endlessRunCounted=true;
      questSave.endlessRunsCompleted=Math.max(0,Math.floor(Number(questSave.endlessRunsCompleted)||0))+1;
      const newThemes=awardQuestThemesForEndlessRuns();
      if(newThemes.length) currentRun.uiThemesEarned.push(...newThemes);
    }
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
    grantQuestHappiness(2);
    const progress=areaProgress(currentRun.area); const maxRank=getAreaConfig(currentRun.area).maxRank;
    if(currentRun.rank===progress.unlockedRank && progress.unlockedRank<maxRank) progress.unlockedRank++;
    const newThemes=awardQuestThemesForClearedLevel(currentRun.area,currentRun.rank,activeCharacterId);
    if(newThemes.length){
      if(!Array.isArray(currentRun.uiThemesEarned)) currentRun.uiThemesEarned=[];
      currentRun.uiThemesEarned.push(...newThemes);
    }
    const areaReward=AREA_CLEAR_CLOSET_REWARDS[currentRun.area];
    if(areaReward && currentRun.rank>=maxRank){
      const hero=activeHeroProgress();
      if(!hero.clearedAreas || typeof hero.clearedAreas!=="object") hero.clearedAreas={meadow:false,ocean:false,candy:false,cloud:false};
      hero.clearedAreas[currentRun.area]=true;
      if(!hasCharacterClosetReward(activeCharacterId,areaReward.id) && unlockCharacterClosetReward(activeCharacterId,areaReward.id)){
        if(!Array.isArray(currentRun.closetRewardsEarned)) currentRun.closetRewardsEarned=[];
        currentRun.closetRewardsEarned.push({name:`${areaReward.name} · Unlocked for ${heroDisplayName()}!`,image:areaReward.image});
      }
    }
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
    ui.runNextRank.textContent=canRunNext?`Run ${cfg.name} Level ${nextRank}`:"Max Level Reached";
    ui.runNextRank.dataset.rank=canRunNext?String(nextRank):"";
    ui.runNextRank.dataset.area=areaId;
    if(ui.resultProgressLabel) ui.resultProgressLabel.textContent="Level";
    ui.resultRank.textContent=`${cfg.name} Level ${finishedRank}`;
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
  (currentRun?.iconBorderStylesEarned||[]).forEach(style=>{
    const el=document.createElement("div");el.className="result-item border-reward";
    const preview=document.createElement("span");preview.className="result-icon-border-preview";applyIconBorderPreviewStyle(preview,style,iconBorderColorById("white"));
    const label=document.createElement("span");label.textContent=`NEW BORDER STYLE! ${style.label}`;
    el.append(preview,label);ui.resultItems.appendChild(el);
  });
  (currentRun?.iconBorderColorsEarned||[]).forEach(color=>{
    const el=document.createElement("div");el.className="result-item border-reward";
    const preview=document.createElement("span");preview.className="result-icon-border-preview";applyIconBorderPreviewStyle(preview,iconBorderStyleById("stitched"),color);
    const label=document.createElement("span");label.textContent=`NEW BORDER COLOR! ${color.label}`;
    el.append(preview,label);ui.resultItems.appendChild(el);
  });
  (currentRun?.wallpapersEarned||[]).forEach(wallpaper=>{
    const el=document.createElement("div");el.className="result-item wallpaper-reward";
    const swatch=document.createElement("span");swatch.className="result-wallpaper-swatch";applyWallpaperStyle(swatch,wallpaper);
    const label=document.createElement("span");label.textContent=`NEW WALLPAPER! ${wallpaper.label}`;
    el.append(swatch,label);ui.resultItems.appendChild(el);
  });
  (currentRun?.closetRewardsEarned||[]).forEach(reward=>{
    const el=document.createElement("div");el.className="result-item closet-reward";
    el.innerHTML=`<img src="${reward.image}" alt=""><span>${reward.name}</span>`;
    ui.resultItems.appendChild(el);
  });
  (currentRun?.uiThemesEarned||[]).forEach(theme=>{
    const el=document.createElement("div");el.className="result-item theme-reward";
    el.appendChild(makeQuestThemeSwatch(theme,"result-theme-swatch"));
    const label=document.createElement("span");label.textContent=`NEW UI THEME! ${theme.name}`;
    el.appendChild(label); ui.resultItems.appendChild(el);
  });
  if(!(currentRun?.itemsEarned||[]).length && !(currentRun?.iconBackgroundsEarned||[]).length && !(currentRun?.iconBorderStylesEarned||[]).length && !(currentRun?.iconBorderColorsEarned||[]).length && !(currentRun?.wallpapersEarned||[]).length && !(currentRun?.closetRewardsEarned||[]).length && !(currentRun?.uiThemesEarned||[]).length){
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
ui.openUiThemes?.addEventListener("click",openUiThemePicker);
ui.closeUiThemes?.addEventListener("click",closeUiThemePicker);
ui.uiThemeModal?.addEventListener("click",event=>{ if(event.target===ui.uiThemeModal) closeUiThemePicker(); });
ui.backFromBuddies?.addEventListener("click",()=>{ closeBuddyDetail(); setBuddyScreenUrl(false); showScreen("home"); renderMeta(); });
ui.openCharmScreen?.addEventListener("click",()=>{ setCharmMessage("Choose up to three different charm families."); showScreen("charm"); });
ui.backFromCharms?.addEventListener("click",()=>{ showScreen("home"); renderMeta(); });
ui.buddyFilters.forEach(button=>button.addEventListener("click",()=>{
  buddyCollectionFilter=button.dataset.buddyFilter || "meadow";
  renderBuddyCollection();
}));
ui.closeBuddyDetail?.addEventListener("click",closeBuddyDetail);
ui.buddyGenderButtons?.forEach(button=>button.addEventListener("click",()=>{
  const selected=button.dataset.buddyGender || "";
  buddyPersonalizeGender=buddyPersonalizeGender===selected?"":selected;
  ui.buddyGenderButtons.forEach(item=>item.classList.toggle("selected",item.dataset.buddyGender===buddyPersonalizeGender));
}));
ui.saveBuddyPersonalization?.addEventListener("click",saveBuddyPersonalization);
ui.setBuddyFamilyIcon?.addEventListener("click",()=>{
  const entry=buddyDisplayCatalog().find(candidate=>candidate.key===buddyDetailEntryKey);
  if(!entry || buddyOwnedQuantity(entry.key)<=0) return;
  if(setSelectedBuddyFamilyIcon(entry)){
    renderBuddyCollection();
    openBuddyDetail(entry);
  }
});

ui.buddyAssignOpen?.addEventListener("click",()=>{
  const entry=buddyDisplayCatalog().find(candidate=>candidate.key===buddyDetailEntryKey);
  if(!entry || buddyOwnedQuantity(entry.key)<=0) return;
  const opening=ui.buddyAssignPanel?.classList.contains("hidden");
  if(opening){
    ui.buddyAssignPanel.classList.remove("hidden");
    ui.buddyAssignOpen.textContent="Hide Assignment";
    renderBuddyAssignPanel(entry);
  }else{
    ui.buddyAssignPanel.classList.add("hidden");
    ui.buddyAssignOpen.textContent="Assign to OC";
  }
});
ui.buddyDetail?.addEventListener("click",event=>{ if(event.target===ui.buddyDetail) closeBuddyDetail(); });
ui.runNextRank.addEventListener("click",()=>{
  const areaId=AREA_CONFIG[ui.runNextRank.dataset.area]?ui.runNextRank.dataset.area:selectedArea;
  const nextRank=Math.max(1,Number(ui.runNextRank.dataset.rank)||0);
  const progress=areaProgress(areaId),maxRank=getAreaConfig(areaId).maxRank;
  if(!nextRank||nextRank>progress.unlockedRank||nextRank>maxRank)return;
  selectedArea=areaId;selectedRank=nextRank;beginRun();
});
ui.areaButtons.forEach(btn=>btn.addEventListener("click",()=>{
  const areaId=btn.dataset.area;if(!AREA_CONFIG[areaId])return;
  openRoutePicker(areaId);
}));
ui.closeRoutePicker?.addEventListener("click",closeRoutePicker);
ui.routePickerModal?.addEventListener("click",event=>{ if(event.target===ui.routePickerModal) closeRoutePicker(); });
ui.startCurrentRoute?.addEventListener("click",()=>{
  const progress=areaProgress(selectedArea);
  selectedRank=Math.max(1,Math.min(getAreaConfig(selectedArea).maxRank,progress.unlockedRank||1));
  closeRoutePicker();
  beginRun();
});
ui.startBeginningRoute?.addEventListener("click",()=>{
  selectedRank=1;
  closeRoutePicker();
  beginRun();
});
ui.openSkillBook?.addEventListener("click",openSkillBook);
ui.closeSkillBook?.addEventListener("click",closeSkillBook);
ui.skillBookModal?.addEventListener("click",event=>{ if(event.target===ui.skillBookModal) closeSkillBook(); });
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
ui.itemBackButton?.addEventListener("click",closeCommandWindow);
ui.purchasePonButton?.addEventListener("click",togglePonPurchasePanel);
ui.closePonPurchaseButton?.addEventListener("click",()=>ui.ponPurchasePanel?.classList.add("hidden"));
document.querySelector("#continueButton").addEventListener("click",nextEncounter);
ui.leaveEndlessButton?.addEventListener("click",leaveEndlessAfterFloor);
document.querySelector("#runAgain").addEventListener("click",()=>{
  if(currentRun?.mode==="endless"){ beginEndlessRun(endlessProgress().checkpoint); return; }
  selectedArea=currentRun?.area||selectedArea;selectedRank=currentRun?.rank||selectedRank;beginRun();
});
document.querySelector("#backToQuest").addEventListener("click",returnHome);
ui.cancelEscapeConfirm.addEventListener("click",closeEscapeConfirm);
ui.confirmEscapeButton.addEventListener("click",confirmEscapeRun);

ui.switchQuestOc?.addEventListener("click",()=>{
  if(currentRun) return;
  renderQuestOcPicker();
  const opening=ui.questOcPicker?.classList.contains("hidden");
  ui.questOcPicker?.classList.toggle("hidden",!opening);
  ui.switchQuestOc?.setAttribute("aria-expanded",String(Boolean(opening)));
});
ui.iconBackgroundButton?.addEventListener("click",()=>{
  const opening=ui.iconBackgroundPicker.classList.contains("hidden");
  ui.iconBackgroundPicker.classList.toggle("hidden",!opening);
  ui.iconBackgroundButton.setAttribute("aria-expanded",String(opening));
});
document.addEventListener("keydown",event=>{
  if(event.key!=="Escape") return;
  if(ui.routePickerModal && !ui.routePickerModal.classList.contains("hidden")){ closeRoutePicker(); return; }
  if(ui.uiThemeModal && !ui.uiThemeModal.classList.contains("hidden")){ closeUiThemePicker(); return; }
  if(ui.skillBookModal && !ui.skillBookModal.classList.contains("hidden")){ closeSkillBook(); }
});
syncPastLevelIconBackgrounds();
normalizeQuestUiThemeState();
applyQuestUiTheme();
persistAll();
renderMeta();
renderMenuSkills();
const initialQuestScreen=new URLSearchParams(window.location.search).get("screen");
showScreen(initialQuestScreen==="buddies"?"buddy":initialQuestScreen==="charms"?"charm":"home");
warmQuestMenuAssets();

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
