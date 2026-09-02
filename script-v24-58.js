const STORAGE_KEY = "duckHabitHubSave_v1";
const SAVE_VERSION = 29;

const CHARACTERS = {
  peep: {
    id: "peep",
    name: "Peep",
    type: "layered",
    assetFolder: "assets/peep/",
    duckHeadPlacement: {
      left: 53,
      top: 36.8,
      width: 18
    },
    profile: {
      height: "Coming soon",
      favoriteItem: "Strawberry",
      likes: "Coming soon",
      dislikes: "Coming soon",
      description: "More profile information will be added in a future update. ♡"
    },
    giftPreferences: {
      "strawberry": "favorite",
      "cupcake": "favorite",
      "gummy-bear": "favorite",
      "milk-tea": "favorite",
      "wedding-cake": "favorite",
      "pudding": "like",
      "lollipop": "like",
      "watermelon": "like",
      "cookie": "like",
      "cake-slice": "like",
      "cake": "like",
      "fancy-milk-tea": "like",
      "pizza": "okay",
      "burger": "okay",
      "milk": "okay",
      "lemon": "okay",
      "lime": "okay",
      "water": "not-her-thing"
    }
  },
  miko: {
    id: "miko",
    name: "Miko",
    type: "layered",
    assetFolder: "assets/miko/",
    duckHeadPlacement: {
      left: 53,
      top: 36.4,
      width: 17.2
    },
    invitationImage: "assets/oc-invitations/Miko-invitation.PNG",
    profile: {
      height: "Coming soon",
      favoriteItem: "Milk Tea",
      likes: "Quiet afternoons, sweet treats, tidy outfits",
      dislikes: "Being rushed, bitter drinks",
      description: "A soft, slightly shy boy who looks especially cute with a duck perched nearby. ♡"
    },
    giftPreferences: {
      "milk-tea": "favorite",
      "cookie": "favorite",
      "cupcake": "favorite",
      "cake-slice": "like",
      "cake": "like",
      "wedding-cake": "like",
      "burger": "okay",
      "pizza": "okay",
      "water": "okay",
      "lemon": "not-his-thing",
      "lime": "not-his-thing"
    }
  }
};

const PROFILE_ICON_BACKGROUNDS = Object.freeze([
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

  // Ultra-rare chest prizes
  {id:"rainbow",label:"Rainbow",rarity:"ultra",source:"chest",weight:.45,value:"linear-gradient(135deg,#ed9baa,#f1c781,#b7daa0,#9dcfe2,#b7a6e4,#e2abd8)"},
  {id:"rainbow-gingham",label:"Rainbow Gingham",rarity:"ultra",source:"chest",weight:.28,value:"linear-gradient(90deg,rgba(255,255,255,.38) 50%,transparent 50%),linear-gradient(rgba(255,255,255,.38) 50%,transparent 50%),linear-gradient(135deg,#ef9cac,#f4d18d,#b6dda2,#9fd4e6,#b8a9e6,#e7add8)",size:"24px 24px,24px 24px,auto"},
  {id:"rainbow-glitter",label:"Rainbow Glitter",rarity:"ultra",source:"chest",weight:.16,value:"radial-gradient(circle at 14% 20%,#fff 0 1.7px,transparent 2.2px),radial-gradient(circle at 72% 30%,#fff9bd 0 1.5px,transparent 2px),radial-gradient(circle at 42% 76%,#fff 0 1.3px,transparent 2px),linear-gradient(135deg,#ee9dac,#f0c982,#b5dca0,#9fd2e4,#b6a6e2,#e3acd7)",size:"20px 20px,27px 27px,31px 31px,auto"}
]);

function profileIconBackgroundById(id) {
  return PROFILE_ICON_BACKGROUNDS.find(background => background.id === id) || PROFILE_ICON_BACKGROUNDS[0];
}

const CHARACTER_UNLOCKS = {
  miko: {
    name: "Miko Invitation",
    image: "assets/oc-invitations/Miko-invitation.PNG",
    priceText: "Invite Miko to the hub and unlock his free wardrobe."
  }
};

const INVENTORY_CATEGORIES = {
  "crafting": {
    "label": "Crafting Supplies",
    "subtitle": "Items used in Duck Crafter recipes.",
    "empty": "No crafting supplies yet. Shopping trips are a good place to find some!"
  },
  "paint": {
    "label": "Paint",
    "subtitle": "Base and mixed paints used for ducks and paintable furniture.",
    "empty": "No paint yet. You may find some while shopping!"
  },
  "food": {
    "label": "Food",
    "subtitle": "Treats can be gifted, sold, or used in certain duck recipes.",
    "empty": "No food yet. Bakery rewards will eventually appear here too!"
  },
  "battle": {
    "label": "Battle Items",
    "subtitle": "Consumables you can bring into Duck Quest battles.",
    "empty": "No battle items yet. Find them in Duck Quest or buy refills in the Shop!"
  },
  "furniture": {
    "label": "Furniture",
    "subtitle": "Choose your furniture color, then place it in the room.",
    "empty": "No furniture yet. Visit the Shop to pick out something cozy!"
  },
  "gift": {
    "label": "Gifts",
    "subtitle": "Special presents for OCs and dates.",
    "empty": "No special gifts yet."
  }
};


const FURNITURE_COLOR_OPTIONS = Object.freeze([
  { id: "white", label: "White", paintItemId: null, swatch: "#fffaf3" },
  { id: "red", label: "Red", paintItemId: "red-paint", swatch: "#d95a62" },
  { id: "dark-red", label: "Dark Red", paintItemId: "dark-red-paint", swatch: "#8f3d46" },
  { id: "magenta", label: "Magenta", paintItemId: "magenta-paint", swatch: "#d62d79" },
  { id: "orange", label: "Orange", paintItemId: "orange-paint", swatch: "#e99655" },
  { id: "peach", label: "Peach", paintItemId: "peach-paint", swatch: "#f2b394" },
  { id: "gold", label: "Gold", paintItemId: "gold-paint", swatch: "#c8a24a" },
  { id: "silver", label: "Silver", paintItemId: "silver-paint", swatch: "#b9bec8" },
  { id: "bronze", label: "Bronze", paintItemId: "bronze-paint", swatch: "#a77650" },
  { id: "green", label: "Green", paintItemId: "green-paint", swatch: "#75a56e" },
  { id: "mint", label: "Mint", paintItemId: "mint-paint", swatch: "#a7d8bd" },
  { id: "aqua", label: "Aqua", paintItemId: "aqua-paint", swatch: "#84c9cf" },
  { id: "sky-blue", label: "Sky Blue", paintItemId: "sky-blue-paint", swatch: "#9bc9e9" },
  { id: "blue", label: "Blue", paintItemId: "blue-paint", swatch: "#648fc7" },
  { id: "periwinkle", label: "Periwinkle", paintItemId: "periwinkle-paint", swatch: "#9fa8dc" },
  { id: "purple", label: "Purple", paintItemId: "purple-paint", swatch: "#9874b7" },
  { id: "violet", label: "Violet", paintItemId: "violet-paint", swatch: "#c08ecf" },
  { id: "pink", label: "Pink", paintItemId: "pink-paint", swatch: "#e9a0bb" },
  { id: "grey", label: "Grey", paintItemId: "grey-paint", swatch: "#9b9ca2" },
  { id: "black", label: "Black", paintItemId: "black-paint", swatch: "#333137" },
  { id: "rainbow", label: "Rainbow", paintItemId: "rainbow-paint", swatch: "linear-gradient(135deg,#e87083,#e9b469,#9dc985,#80b8db,#a98bd1)" }
]);

const PAINTABLE_FURNITURE_FAMILIES = Object.freeze({
  "pet-bed": {
    id: "pet-bed",
    name: "Pet Bed",
    itemPrefix: "petbed-",
    baseItemId: "petbed-white",
    price: 200,
    maxOwned: 21,
    furnitureSlot: "petBed",
    furnitureType: "petBed",
    duckPerch: "petBed",
    assetFolder: "assets/furniture/pet-beds/",
    assetPrefix: "Bed-",
    assetExtension: ".PNG",
    thumbBounds: [837, 1669, 1060, 1787]
  },
  "lights": {
    id: "lights",
    name: "Lights",
    itemPrefix: "lights-",
    baseItemId: "lights-white",
    price: 200,
    maxOwned: 21,
    furnitureSlot: "lights",
    furnitureType: "lights",
    duckPerch: null,
    assetFolder: "assets/furniture/lights/",
    assetPrefix: "Lights-",
    assetExtension: ".png",
    // Full-canvas wall overlay; this crop keeps the string lights large in cards.
    thumbBounds: [0, 80, 1080, 390]
  }
});

function makePaintableFurnitureItems() {
  const entries = [];
  for (const family of Object.values(PAINTABLE_FURNITURE_FAMILIES)) {
    for (const color of FURNITURE_COLOR_OPTIONS) {
      const itemId = `${family.itemPrefix}${color.id}`;
      entries.push([itemId, {
        name: color.id === "white" ? family.name : `${color.label} ${family.name}`,
        category: "furniture",
        image: `${family.assetFolder}${family.assetPrefix}${color.id}${family.assetExtension || ".PNG"}`,
        icon: "♡",
        sellValue: 12,
        furnitureSlot: family.furnitureSlot,
        furnitureType: family.furnitureType,
        duckPerch: family.duckPerch,
        thumbBounds: family.thumbBounds,
        customizableFurniture: true,
        furnitureFamily: family.id,
        furnitureColor: color.id,
        paintItemId: color.paintItemId
      }]);
    }
  }
  return Object.fromEntries(entries);
}

const ITEMS = {
  "pink-heart-refill": {
    "name": "Pink Heart Refill",
    "category": "battle",
    "image": "assets/bakery/drops/Pink-heart-refill.PNG",
    "icon": "♥",
    "sellValue": 25
  },
  "gold-heart-refill": {
    "name": "Gold Heart Refill",
    "category": "battle",
    "image": "assets/bakery/drops/Gold-heart-refill.PNG",
    "icon": "♥",
    "sellValue": 80
  },
  "standard-duck": {
    "name": "Standard Duck",
    "category": "crafting",
    "image": "assets/ducks/Standard-duck.PNG",
    "icon": "🦆",
    "sellValue": 15
  },
  "sunglasses": {
    "name": "Sunglasses",
    "category": "crafting",
    "image": "assets/gifts/Sunglasses.PNG",
    "icon": "😎",
    "sellValue": 6
  },
  "yarn": {
    "name": "Yarn",
    "category": "crafting",
    "image": "assets/ingredients/Yarn.PNG",
    "icon": "🧶",
    "sellValue": 7
  },
  "thread": {
    "name": "Thread",
    "category": "crafting",
    "image": "assets/ingredients/Thread.PNG",
    "icon": "🧵",
    "sellValue": 7
  },
  "party-hat": {
    "name": "Party Hat",
    "category": "crafting",
    "image": "assets/gifts/Party-hat.PNG",
    "icon": "🥳",
    "sellValue": 6
  },
  "knife": {
    "name": "Knife",
    "category": "crafting",
    "image": "assets/gifts/Knife.PNG",
    "icon": "🔪",
    "sellValue": 8
  },
  "game-controller": {
    "name": "Game Controller",
    "category": "crafting",
    "image": "assets/gifts/Gaming-controller.PNG",
    "icon": "🎮",
    "sellValue": 10
  },
  "pill": {
    "name": "Pill",
    "category": "crafting",
    "image": "assets/gifts/Pill.PNG",
    "icon": "💊",
    "sellValue": 7
  },
  "ufo": {
    "name": "UFO",
    "category": "crafting",
    "image": "assets/gifts/UFO.PNG",
    "icon": "🛸",
    "sellValue": 12
  },
  "pocket-monster-ball": {
    "name": "Pocket Monster Ball",
    "category": "crafting",
    "image": "assets/gifts/Pocket-monster-ball.PNG",
    "icon": "🔴",
    "sellValue": 10
  },
  "jester-bell": {
    "name": "Jester Bell",
    "category": "crafting",
    "image": "assets/gifts/Jester-bell.PNG",
    "icon": "🔔",
    "sellValue": 8
  },
  "crown": {
    "name": "Crown",
    "category": "crafting",
    "image": "assets/gifts/Crown.PNG",
    "icon": "👑",
    "sellValue": 12
  },
  "magical-girl-pendant": {
    "name": "Magical Girl Pendant",
    "category": "crafting",
    "image": "assets/gifts/Magical-girl-pendant.PNG",
    "icon": "💖",
    "sellValue": 12
  },
  "bunny-ears": {
    "name": "Bunny Ears",
    "category": "crafting",
    "image": "assets/gifts/Bunny-ears.PNG",
    "icon": "🐰",
    "sellValue": 8
  },
  "flower": {
    "name": "Flower",
    "category": "crafting",
    "image": "assets/gifts/Flower.PNG",
    "icon": "🌸",
    "sellValue": 5
  },
  "sleep-mask": {
    "name": "Sleep Mask",
    "category": "crafting",
    "image": "assets/gifts/Sleep-mask.PNG",
    "icon": "😴",
    "sellValue": 7
  },
  "paintbrush": {
    "name": "Paintbrush",
    "category": "crafting",
    "image": "assets/gifts/Paint-brush.PNG",
    "icon": "🖌️",
    "sellValue": 7
  },
  "ghost": {
    "name": "Ghost",
    "category": "crafting",
    "image": "assets/ingredients/Ghost.PNG",
    "icon": "👻",
    "sellValue": 8
  },
  "demon-wing": {
    "name": "Demon Wing",
    "category": "crafting",
    "image": "assets/ingredients/Demon-wing.PNG",
    "icon": "🖤",
    "sellValue": 11
  },
  "angel-wing": {
    "name": "Angel Wing",
    "category": "crafting",
    "image": "assets/ingredients/Angel-wing.PNG",
    "icon": "🤍",
    "sellValue": 11
  },
  "glitter": {
    "name": "Glitter",
    "category": "crafting",
    "image": "assets/ingredients/Sparkle.PNG",
    "icon": "✨",
    "sellValue": 8
  },
  "cat-ears": {
    "name": "Cat Ears",
    "category": "crafting",
    "image": "assets/gifts/Cat-ears.PNG",
    "icon": "🐱",
    "sellValue": 8
  },
  "moon": {
    "name": "Moon",
    "category": "crafting",
    "image": "assets/ingredients/Moon.PNG",
    "icon": "🌙",
    "sellValue": 9
  },
  "mustache": {
    "name": "Mustache",
    "category": "crafting",
    "image": "assets/gifts/Mustache.PNG",
    "icon": "🥸",
    "sellValue": 6
  },
  "top-hat": {
    "name": "Top Hat",
    "category": "crafting",
    "image": "assets/gifts/Top-hat.PNG",
    "icon": "🎩",
    "sellValue": 9
  },
  "bow": {
    "name": "Bow",
    "category": "crafting",
    "image": "assets/gifts/Bow.PNG",
    "icon": "🎀",
    "sellValue": 7
  },
  "googly-eyes": {
    "name": "Googly Eyes",
    "category": "crafting",
    "image": "assets/ingredients/googly-eyes.png",
    "icon": "👀",
    "sellValue": 6
  },
  "scarf": {
    "name": "Scarf",
    "category": "crafting",
    "image": "assets/ingredients/scarf.png",
    "icon": "🧣",
    "sellValue": 7
  },
  "skateboard": {
    "name": "Skateboard",
    "category": "crafting",
    "image": "assets/ingredients/skateboard.png",
    "icon": "🛹",
    "sellValue": 10
  },
  "wig": {
    "name": "Wig",
    "category": "crafting",
    "image": "assets/ingredients/wig.png",
    "icon": "💇",
    "sellValue": 8
  },
  "eyebrows": {
    "name": "Eyebrows",
    "category": "crafting",
    "image": "assets/ingredients/eyebrows.png",
    "icon": "😠",
    "sellValue": 6
  },
  "vampire-teeth": {
    "name": "Vampire Teeth",
    "category": "crafting",
    "image": "assets/ingredients/vampire-teeth.png",
    "icon": "🧛",
    "sellValue": 8
  },
  "bathtub": {
    "name": "Bathtub",
    "category": "crafting",
    "image": "assets/ingredients/bathtub.png",
    "icon": "🛁",
    "sellValue": 10
  },
  "flour": {
    "name": "Flour",
    "category": "crafting",
    "image": "assets/food/Flour.PNG",
    "icon": "🌾",
    "sellValue": 4
  },
  "red-paint": {
    "name": "Red Paint",
    "category": "paint",
    "image": "assets/paint/Red-paint.PNG",
    "icon": "🎨",
    "sellValue": 6
  },
  "dark-red-paint": {
    "name": "Dark Red Paint",
    "category": "paint",
    "image": "assets/paint/Dark-red-paint.PNG",
    "icon": "🎨",
    "sellValue": 8
  },
  "magenta-paint": {
    "name": "Magenta Paint",
    "category": "paint",
    "image": "assets/paint/magenta-paint.png",
    "icon": "🎨",
    "sellValue": 9
  },
  "orange-paint": {
    "name": "Orange Paint",
    "category": "paint",
    "image": "assets/paint/Orange-paint.PNG",
    "icon": "🎨",
    "sellValue": 6
  },
  "peach-paint": {
    "name": "Peach Paint",
    "category": "paint",
    "image": "assets/paint/Peach-paint.PNG",
    "icon": "🎨",
    "sellValue": 8
  },
  "gold-paint": {
    "name": "Gold Paint",
    "category": "paint",
    "image": "assets/paint/Gold-paint.PNG",
    "icon": "🎨",
    "sellValue": 12
  },
  "silver-paint": {
    "name": "Silver Paint",
    "category": "paint",
    "image": "assets/paint/Silver-paint.PNG",
    "icon": "🎨",
    "sellValue": 11
  },
  "bronze-paint": {
    "name": "Bronze Paint",
    "category": "paint",
    "image": "assets/paint/Bronze-paint.PNG",
    "icon": "🎨",
    "sellValue": 10
  },
  "green-paint": {
    "name": "Green Paint",
    "category": "paint",
    "image": "assets/paint/Green-paint.PNG",
    "icon": "🎨",
    "sellValue": 6
  },
  "mint-paint": {
    "name": "Mint Paint",
    "category": "paint",
    "image": "assets/paint/Mint-paint.PNG",
    "icon": "🎨",
    "sellValue": 8
  },
  "aqua-paint": {
    "name": "Aqua Paint",
    "category": "paint",
    "image": "assets/paint/Aqua-paint.PNG",
    "icon": "🎨",
    "sellValue": 9
  },
  "sky-blue-paint": {
    "name": "Sky Blue Paint",
    "category": "paint",
    "image": "assets/paint/Sky-blue-paint.PNG",
    "icon": "🎨",
    "sellValue": 8
  },
  "blue-paint": {
    "name": "Blue Paint",
    "category": "paint",
    "image": "assets/paint/Blue-paint.PNG",
    "icon": "🎨",
    "sellValue": 6
  },
  "periwinkle-paint": {
    "name": "Periwinkle Paint",
    "category": "paint",
    "image": "assets/paint/Periwinkle-paint.PNG",
    "icon": "🎨",
    "sellValue": 10
  },
  "purple-paint": {
    "name": "Purple Paint",
    "category": "paint",
    "image": "assets/paint/Purple-paint.PNG",
    "icon": "🎨",
    "sellValue": 6
  },
  "violet-paint": {
    "name": "Violet Paint",
    "category": "paint",
    "image": "assets/paint/Violet-paint.PNG",
    "icon": "🎨",
    "sellValue": 8
  },
  "pink-paint": {
    "name": "Pink Paint",
    "category": "paint",
    "image": "assets/paint/Pink-paint.PNG",
    "icon": "🎨",
    "sellValue": 8
  },
  "white-paint": {
    "name": "White Paint",
    "category": "paint",
    "image": "assets/paint/White-paint.PNG",
    "icon": "🎨",
    "sellValue": 6
  },
  "grey-paint": {
    "name": "Grey Paint",
    "category": "paint",
    "image": "assets/paint/Grey-paint.PNG",
    "icon": "🎨",
    "sellValue": 8
  },
  "black-paint": {
    "name": "Black Paint",
    "category": "paint",
    "image": "assets/paint/Black-paint.PNG",
    "icon": "🎨",
    "sellValue": 6
  },
  "rainbow-paint": {
    "name": "Rainbow Paint",
    "category": "paint",
    "image": "assets/paint/Rainbow-paint.PNG",
    "icon": "🎨",
    "sellValue": 16
  },
  "bread-loaf": {
    "name": "Bread Loaf",
    "category": "food",
    "image": "assets/food/Bread-loaf.PNG",
    "icon": "🍽️",
    "sellValue": 4,
    "giftable": true
  },
  "apple": {
    "name": "Apple",
    "category": "food",
    "image": "assets/food/apple.png",
    "icon": "🍎",
    "sellValue": 5,
    "giftable": true
  },
  "burger": {
    "name": "Burger",
    "category": "food",
    "image": "assets/food/Burger.PNG",
    "icon": "🍽️",
    "sellValue": 8,
    "giftable": true
  },
  "cake-slice": {
    "name": "Cake Slice",
    "category": "food",
    "image": "assets/food/Cake-slice.PNG",
    "icon": "🍽️",
    "sellValue": 8,
    "giftable": true
  },
  "cake": {
    "name": "Cake",
    "category": "food",
    "image": "assets/food/Cake.PNG",
    "icon": "🍽️",
    "sellValue": 12,
    "giftable": true
  },
  "champagne": {
    "name": "Champagne",
    "category": "food",
    "image": "assets/food/Champagne.PNG",
    "icon": "🍽️",
    "sellValue": 12,
    "giftable": true
  },
  "chocolate-brioche": {
    "name": "Chocolate Brioche",
    "category": "food",
    "image": "assets/food/Chocolate-brioche.PNG",
    "icon": "🍽️",
    "sellValue": 7,
    "giftable": true
  },
  "concha": {
    "name": "Concha",
    "category": "food",
    "image": "assets/food/Concha.PNG",
    "icon": "🍽️",
    "sellValue": 6,
    "giftable": true
  },
  "cookie": {
    "name": "Cookie",
    "category": "food",
    "image": "assets/food/Cookie.PNG",
    "icon": "🍽️",
    "sellValue": 5,
    "giftable": true
  },
  "croissant": {
    "name": "Croissant",
    "category": "food",
    "image": "assets/food/Croissant.PNG",
    "icon": "🍽️",
    "sellValue": 6,
    "giftable": true
  },
  "cupcake": {
    "name": "Cupcake",
    "category": "food",
    "image": "assets/food/Cupcake.PNG",
    "icon": "🍽️",
    "sellValue": 9,
    "giftable": true
  },
  "fancy-milk-tea": {
    "name": "Fancy Milk Tea",
    "category": "food",
    "image": "assets/food/Fancy-milk-tea.PNG",
    "icon": "🍽️",
    "sellValue": 10,
    "giftable": true
  },
  "fruit-cup": {
    "name": "Fruit Cup",
    "category": "food",
    "image": "assets/food/Fruit-cup.PNG",
    "icon": "🍽️",
    "sellValue": 6,
    "giftable": true
  },
  "fruit-tart": {
    "name": "Fruit Tart",
    "category": "food",
    "image": "assets/food/Fruit-tart.PNG",
    "icon": "🍽️",
    "sellValue": 9,
    "giftable": true
  },
  "gummy-bear": {
    "name": "Gummy Bear",
    "category": "food",
    "image": "assets/food/Gummy-bear.PNG",
    "icon": "🍽️",
    "sellValue": 6,
    "giftable": true
  },
  "lemon": {
    "name": "Lemon",
    "category": "food",
    "image": "assets/food/Lemon.PNG",
    "icon": "🍽️",
    "sellValue": 5,
    "giftable": true
  },
  "lime": {
    "name": "Lime",
    "category": "food",
    "image": "assets/food/Lime.PNG",
    "icon": "🍽️",
    "sellValue": 5,
    "giftable": true
  },
  "lollipop": {
    "name": "Lollipop",
    "category": "food",
    "image": "assets/food/Lollipop.PNG",
    "icon": "🍽️",
    "sellValue": 6,
    "giftable": true
  },
  "milk-tea": {
    "name": "Milk Tea",
    "category": "food",
    "image": "assets/food/Milk-tea.PNG",
    "icon": "🍽️",
    "sellValue": 7,
    "giftable": true
  },
  "milk": {
    "name": "Milk",
    "category": "food",
    "image": "assets/food/Milk.PNG",
    "icon": "🍽️",
    "sellValue": 3,
    "giftable": true
  },
  "mushroom": {
    "name": "Mushroom",
    "category": "food",
    "image": "assets/food/Mushroom.PNG",
    "icon": "🍽️",
    "sellValue": 6,
    "giftable": true
  },
  "parfait": {
    "name": "Parfait",
    "category": "food",
    "image": "assets/food/Parfait.PNG",
    "icon": "🍽️",
    "sellValue": 9,
    "giftable": true
  },
  "pizza": {
    "name": "Pizza",
    "category": "food",
    "image": "assets/food/Pizza.PNG",
    "icon": "🍽️",
    "sellValue": 8,
    "giftable": true
  },
  "pudding": {
    "name": "Pudding",
    "category": "food",
    "image": "assets/food/Pudding.PNG",
    "icon": "🍽️",
    "sellValue": 7,
    "giftable": true
  },
  "strawberry-shortcake": {
    "name": "Strawberry Shortcake",
    "category": "food",
    "image": "assets/food/Strawberry-shortcake.PNG",
    "icon": "🍽️",
    "sellValue": 10,
    "giftable": true
  },
  "strawberry": {
    "name": "Strawberry",
    "category": "food",
    "image": "assets/food/Strawberry.PNG",
    "icon": "🍽️",
    "sellValue": 8,
    "giftable": true
  },
  "water": {
    "name": "Water",
    "category": "food",
    "image": "assets/food/Water.PNG",
    "icon": "🍽️",
    "sellValue": 1,
    "giftable": true
  },
  "watermelon": {
    "name": "Watermelon",
    "category": "food",
    "image": "assets/food/Watermelon.PNG",
    "icon": "🍽️",
    "sellValue": 7,
    "giftable": true
  },
  "wedding-cake": {
    "name": "Wedding Cake",
    "category": "food",
    "image": "assets/food/Wedding-cake.PNG",
    "icon": "🍽️",
    "sellValue": 25,
    "giftable": true
  },
  "bouquet": {
    "name": "Bouquet",
    "category": "gift",
    "image": "assets/gifts/Bouquet.PNG",
    "icon": "🎁",
    "sellValue": 10,
    "giftable": true
  },
  "heart-locket": {
    "name": "Heart Locket",
    "category": "gift",
    "image": "assets/gifts/Heart-locket.PNG",
    "icon": "🎁",
    "sellValue": 14,
    "giftable": true
  },
  "love-letter": {
    "name": "Love Letter",
    "category": "gift",
    "image": "assets/gifts/Love-letter.PNG",
    "icon": "🎁",
    "sellValue": 8,
    "giftable": true
  },
  "rings": {
    "name": "Rings",
    "category": "gift",
    "image": "assets/gifts/Rings.PNG",
    "icon": "🎁",
    "sellValue": 20,
    "giftable": true
  },
  "teddy-bear": {
    "name": "Teddy Bear",
    "category": "gift",
    "image": "assets/gifts/Teddy-bear.PNG",
    "icon": "🎁",
    "sellValue": 12,
    "giftable": true
  },
  ...makePaintableFurnitureItems(),

  // Legacy Pet Bed IDs are kept only long enough to migrate older saves.
  "petbed-gray": {
    "name": "Legacy Gray Pet Bed",
    "category": "legacy-furniture",
    "image": "assets/furniture/pet-beds/petbed-gray.png",
    "icon": "♡",
    "sellValue": 0,
    "legacyFurnitureTarget": "petbed-grey"
  },
  "petbed-cream": {
    "name": "Legacy Cream Pet Bed",
    "category": "legacy-furniture",
    "image": "assets/furniture/pet-beds/petbed-cream.png",
    "icon": "♡",
    "sellValue": 0,
    "legacyFurnitureTarget": "petbed-white"
  },
  "shelf-white": {
    "name": "White Six-Shelf",
    "category": "furniture",
    "image": "assets/furniture/shelves/shelf-white.png",
    "icon": "▤",
    "sellValue": 14,
    "furnitureSlot": "left",
    "furnitureType": "shelf",
    "duckPerch": "shelf",
    "thumbBounds": [0, 320, 254, 1807]
  },
  "shelf-dark-brown": {
    "name": "Dark Brown Six-Shelf",
    "category": "furniture",
    "image": "assets/furniture/shelves/shelf-dark-brown.png",
    "icon": "▤",
    "sellValue": 14,
    "furnitureSlot": "left",
    "furnitureType": "shelf",
    "duckPerch": "shelf",
    "thumbBounds": [0, 320, 254, 1807]
  },
  "shelf-brown": {
    "name": "Brown Six-Shelf",
    "category": "furniture",
    "image": "assets/furniture/shelves/shelf-brown.png",
    "icon": "▤",
    "sellValue": 14,
    "furnitureSlot": "left",
    "furnitureType": "shelf",
    "duckPerch": "shelf",
    "thumbBounds": [0, 320, 254, 1807]
  },
  "dresser-brown": {
    "name": "Brown Dresser",
    "category": "furniture",
    "image": "assets/furniture/dressers/dresser-brown.png",
    "icon": "▰",
    "sellValue": 14,
    "furnitureSlot": "left",
    "furnitureType": "dresser",
    "duckPerch": "dresser",
    "thumbBounds": [0, 1278, 248, 1832]
  },
  "dresser-dark-brown": {
    "name": "Dark Brown Dresser",
    "category": "furniture",
    "image": "assets/furniture/dressers/dresser-dark-brown.png",
    "icon": "▰",
    "sellValue": 14,
    "furnitureSlot": "left",
    "furnitureType": "dresser",
    "duckPerch": "dresser",
    "thumbBounds": [0, 1278, 248, 1832]
  },
  "rug-cloud-dark": {
    "name": "Dark Cloud Rug",
    "category": "furniture",
    "image": "assets/furniture/rugs/rug-cloud-dark.png",
    "icon": "☁",
    "sellValue": 10,
    "furnitureSlot": "rug",
    "furnitureType": "rug",
    "thumbBounds": [282, 1730, 829, 1906]
  },
  "rug-cloud-white": {
    "name": "White Cloud Rug",
    "category": "furniture",
    "image": "assets/furniture/rugs/rug-cloud-white.png",
    "icon": "☁",
    "sellValue": 10,
    "furnitureSlot": "rug",
    "furnitureType": "rug",
    "thumbBounds": [282, 1730, 829, 1906]
  },
  "rug-heart-white": {
    "name": "White Heart Rug",
    "category": "furniture",
    "image": "assets/furniture/rugs/rug-heart-white.png",
    "icon": "♡",
    "sellValue": 10,
    "furnitureSlot": "rug",
    "furnitureType": "rug",
    "thumbBounds": [323, 1731, 862, 1920]
  },
  "rug-heart-dark": {
    "name": "Dark Heart Rug",
    "category": "furniture",
    "image": "assets/furniture/rugs/rug-heart-dark.png",
    "icon": "♡",
    "sellValue": 10,
    "furnitureSlot": "rug",
    "furnitureType": "rug",
    "thumbBounds": [323, 1731, 862, 1920]
  },
  "rug-heart-pink": {
    "name": "Pink Heart Rug",
    "category": "furniture",
    "image": "assets/furniture/rugs/rug-heart-pink.png",
    "icon": "♡",
    "sellValue": 10,
    "furnitureSlot": "rug",
    "furnitureType": "rug",
    "thumbBounds": [323, 1731, 862, 1920]
  },
  "rug-heart-blue": {
    "name": "Blue Heart Rug",
    "category": "furniture",
    "image": "assets/furniture/rugs/rug-heart-blue.png",
    "icon": "♡",
    "sellValue": 10,
    "furnitureSlot": "rug",
    "furnitureType": "rug",
    "thumbBounds": [323, 1731, 862, 1920]
  }
};

const ITEM_NAME_TO_ID = Object.fromEntries(
  Object.entries(ITEMS).map(([id, item]) => [item.name.toLowerCase(), id])
);

const ITEM_ALIASES = {
  "jester hat": "jester-bell",
  "jester-hat": "jester-bell",
  "jester bell": "jester-bell",
  "jester-bell": "jester-bell",
  "bunny hat": "bunny-ears",
  "bunny-hat": "bunny-ears",
  "bunny ears": "bunny-ears",
  "bunny-ears": "bunny-ears",
  "eye mask": "sleep-mask",
  "eye-mask": "sleep-mask",
  "sleep mask": "sleep-mask",
  "paint brush": "paintbrush",
  "paintbrush": "paintbrush",
  "sparkle": "glitter",
  "glitter": "glitter"
};

const SHOPPING_LOOT_POOL = [
  "standard-duck",
  "sunglasses",
  "gummy-bear",
  "yarn",
  "thread",
  "party-hat",
  "knife",
  "game-controller",
  "pill",
  "ufo",
  "pocket-monster-ball",
  "jester-bell",
  "crown",
  "magical-girl-pendant",
  "bunny-ears",
  "mushroom",
  "flower",
  "sleep-mask",
  "paintbrush",
  "ghost",
  "pudding",
  "cupcake",
  "pizza",
  "burger",
  "lemon",
  "lime",
  "watermelon",
  "strawberry",
  "demon-wing",
  "angel-wing",
  "glitter",
  "cat-ears",
  "moon",
  "lollipop",
  "mustache",
  "top-hat",
  "bow",
  "googly-eyes",
  "scarf",
  "skateboard",
  "wig",
  "eyebrows",
  "vampire-teeth",
  "bathtub",
  "apple"
];


const SHOP_CATEGORIES = {
  supplies: {
    label: "Duck Supplies",
    subtitle: "Useful supplies for crafting your duck collection."
  },
  food: {
    label: "Food",
    subtitle: "Stock up on treats and meals to gift your OCs. Rarer foods cost a little more."
  },
  battle: {
    label: "Battle Items",
    subtitle: "Stock up for Duck Quest. Pink heals half HP; rare Gold restores Peep to full health."
  },
  profiles: {
    label: "Invitations",
    subtitle: "Invite new OCs to the hub and unlock their wardrobe pages."
  },
  rooms: {
    label: "Room Styles",
    subtitle: "Unlock a new room color permanently for 350 Pink Coins."
  },
  furniture: {
    label: "Furniture",
    subtitle: "Paintable furniture starts in White. Buy extra bases, then recolor them in Furniture Crafting!"
  },
  hair: {
    label: "Hair",
    subtitle: "Permanent hairstyle unlocks."
  },
  clothing: {
    label: "Clothing",
    subtitle: "Permanent clothing unlocks."
  },
  shoes: {
    label: "Shoes",
    subtitle: "Permanent shoe unlocks."
  },
  accessories: {
    label: "Accessories",
    subtitle: "Permanent accessory unlocks."
  }
};

// Harder economy: Standard Duck is 75 coins and always stays first.
// All shop-available base paints are 60 coins.
// Recipe paints are intentionally excluded so mixing colors stays meaningful.
const SHOP_STOCK = {
  supplies: [
    { itemId: "standard-duck", price: 75 },
    { itemId: "sunglasses", price: 50 },
    { itemId: "yarn", price: 50 },
    { itemId: "thread", price: 50 },
    { itemId: "party-hat", price: 50 },
    { itemId: "knife", price: 60 },
    { itemId: "game-controller", price: 60 },
    { itemId: "pill", price: 50 },
    { itemId: "ufo", price: 75 },
    { itemId: "pocket-monster-ball", price: 75 },
    { itemId: "jester-bell", price: 60 },
    { itemId: "crown", price: 75 },
    { itemId: "magical-girl-pendant", price: 75 },
    { itemId: "bunny-ears", price: 60 },
    { itemId: "flower", price: 50 },
    { itemId: "sleep-mask", price: 50 },
    { itemId: "paintbrush", price: 50 },
    { itemId: "ghost", price: 60 },
    { itemId: "demon-wing", price: 75 },
    { itemId: "angel-wing", price: 75 },
    { itemId: "glitter", price: 60 },
    { itemId: "cat-ears", price: 60 },
    { itemId: "moon", price: 60 },
    { itemId: "mustache", price: 50 },
    { itemId: "top-hat", price: 60 },
    { itemId: "bow", price: 50 },
    { itemId: "googly-eyes", price: 50 },
    { itemId: "scarf", price: 60 },
    { itemId: "skateboard", price: 75 },
    { itemId: "wig", price: 60 },
    { itemId: "eyebrows", price: 50 },
    { itemId: "vampire-teeth", price: 60 },
    { itemId: "bathtub", price: 75 }
  ],
  food: [
    { itemId: "water", price: 50 },
    { itemId: "milk", price: 50 },
    { itemId: "apple", price: 50 },
    { itemId: "lemon", price: 50 },
    { itemId: "lime", price: 50 },
    { itemId: "strawberry", price: 50 },
    { itemId: "cookie", price: 50 },
    { itemId: "gummy-bear", price: 50 },
    { itemId: "lollipop", price: 50 },

    { itemId: "bread-loaf", price: 60 },
    { itemId: "fruit-cup", price: 60 },
    { itemId: "milk-tea", price: 60 },
    { itemId: "pudding", price: 60 },
    { itemId: "watermelon", price: 60 },
    { itemId: "mushroom", price: 60 },

    { itemId: "burger", price: 75 },
    { itemId: "pizza", price: 75 },
    { itemId: "cake-slice", price: 75 },
    { itemId: "croissant", price: 75 },
    { itemId: "cupcake", price: 75 },
    { itemId: "fruit-tart", price: 75 },

    { itemId: "fancy-milk-tea", price: 90 },
    { itemId: "concha", price: 90 },

    { itemId: "cake", price: 100 },
    { itemId: "strawberry-shortcake", price: 100 },

    { itemId: "champagne", price: 125 },
    { itemId: "chocolate-brioche", price: 125 },
    { itemId: "parfait", price: 125 },

    { itemId: "wedding-cake", price: 150 }
  ],
  battle: [
    { itemId: "pink-heart-refill", price: 75 },
    { itemId: "gold-heart-refill", price: 250 }
  ],
  profiles: [
    { characterId: "miko", price: 1500 }
  ],
  rooms: [
    { roomId: "green", price: 350 },
    { roomId: "blue", price: 350 },
    { roomId: "purple", price: 350 },
    { roomId: "peach", price: 350 },
    { roomId: "pink", price: 350 },
    { roomId: "dark-purple", price: 350 },
    { roomId: "cotton-candy", price: 350 },
    { roomId: "chocolate-brown", price: 350 }
  ],
  furniture: [
    { itemId: "petbed-white", price: 200, customizableFurniture: true, maxQuantity: 21 },
    { itemId: "lights-white", price: 200, customizableFurniture: true, maxQuantity: 21 },
    { itemId: "shelf-white", price: 225 },
    { itemId: "shelf-dark-brown", price: 225 },
    { itemId: "shelf-brown", price: 225 },
    { itemId: "dresser-brown", price: 225 },
    { itemId: "dresser-dark-brown", price: 225 },
    { itemId: "rug-cloud-dark", price: 160 },
    { itemId: "rug-cloud-white", price: 160 },
    { itemId: "rug-heart-white", price: 160 },
    { itemId: "rug-heart-dark", price: 160 },
    { itemId: "rug-heart-pink", price: 160 },
    { itemId: "rug-heart-blue", price: 160 }
  ],
  hair: [
    { wardrobeId: "hair-low-pigtails", price: 150 },
    { wardrobeId: "hair-ponytail", price: 150 },
    { wardrobeId: "hair-long-pigtails", price: 150 },
    { wardrobeId: "hair-jellyfish", price: 150 },
    { wardrobeId: "miko-bangs-pinned", price: 150 }
  ],
  clothing: [
    { wardrobeId: "top-shirt", price: 150 },
    { wardrobeId: "bottom-fluffy", price: 150 },
    { wardrobeId: "socks-blue", price: 150 },
    { wardrobeId: "jacket", price: 150 },
    { wardrobeId: "miko-top-sweater", price: 150 },
    { wardrobeId: "miko-bottom-jeans", price: 150 },
    { wardrobeId: "miko-top-big-shirt", price: 150 },
    { wardrobeId: "miko-bottom-boxers", price: 150 },
    { wardrobeId: "miko-socks", price: 150 },
    { wardrobeId: "peep-dress-white", price: 150 },
    { wardrobeId: "peep-legwear-white-lace", price: 150 },
    { wardrobeId: "peep-cardigan-white", price: 150 },
    { wardrobeId: "miko-shirt-blouse", price: 150 },
    { wardrobeId: "miko-bottom-shorts", price: 150 },
    { wardrobeId: "miko-socks-garter", price: 150 },
    { wardrobeId: "miko-outer-black-blazer", price: 150 }
  ],
  shoes: [
    { wardrobeId: "shoes-sneaker", price: 150 },
    { wardrobeId: "peep-shoes-white-mary-jane", price: 150 },
    { wardrobeId: "miko-shoes-fancy-loafers", price: 150 }
  ],
  accessories: [
    { wardrobeId: "cow-ears", price: 150 },
    { wardrobeId: "tail-cow", price: 150 },
    { wardrobeId: "collar", price: 150 },
    { wardrobeId: "leg-bandage", price: 150 },
    { wardrobeId: "horns", price: 150 },
    { wardrobeId: "hair-side-ribbon", price: 150 },
    { wardrobeId: "large-back-bow", price: 150 },
    { wardrobeId: "beret", price: 150 },
    { wardrobeId: "peep-bow-white", price: 150 },
    { wardrobeId: "miko-headband", price: 150 },
    { wardrobeId: "miko-hairpins-black", price: 150 }
  ]
};

const SHOP_MAX_QUANTITY = 10;

const PAINT_RECIPES = {
  "dark-red-paint": {
    "red-paint": 1,
    "black-paint": 1
  },
  "magenta-paint": {
    "pink-paint": 1,
    "red-paint": 1
  },
  "peach-paint": {
    "orange-paint": 1,
    "white-paint": 1
  },
  "mint-paint": {
    "green-paint": 1,
    "white-paint": 1
  },
  "aqua-paint": {
    "green-paint": 1,
    "blue-paint": 1
  },
  "sky-blue-paint": {
    "blue-paint": 1,
    "white-paint": 1
  },
  "periwinkle-paint": {
    "blue-paint": 1,
    "purple-paint": 1,
    "white-paint": 1
  },
  "violet-paint": {
    "purple-paint": 1,
    "white-paint": 1
  },
  "pink-paint": {
    "red-paint": 1,
    "white-paint": 1
  },
  "grey-paint": {
    "white-paint": 1,
    "black-paint": 1
  },
  "rainbow-paint": {
    "red-paint": 1,
    "orange-paint": 1,
    "green-paint": 1,
    "blue-paint": 1,
    "purple-paint": 1
  }
};

const FURNITURE_RECIPES = Object.freeze(Object.fromEntries(
  Object.values(PAINTABLE_FURNITURE_FAMILIES).flatMap(family =>
    FURNITURE_COLOR_OPTIONS
      .filter(color => color.id !== "white" && color.paintItemId)
      .map(color => [
        `${family.itemPrefix}${color.id}`,
        {
          familyId: family.id,
          colorId: color.id,
          recipe: {
            [family.baseItemId]: 1,
            [color.paintItemId]: 1
          }
        }
      ])
  )
));

const DUCKS = {
  "angry-duck": {
    "name": "Angry Duck",
    "file": "assets/ducks/angry-duck.png",
    "recipe": {
      "standard-duck": 1,
      "eyebrows": 1
    }
  },
  "apple-duck": {
    "name": "Apple Duck",
    "file": "assets/ducks/apple-duck.png",
    "recipe": {
      "standard-duck": 1,
      "apple": 1
    }
  },
  "bathtime-duck": {
    "name": "Bathtime Duck",
    "file": "assets/ducks/bathtime-duck.png",
    "recipe": {
      "standard-duck": 1,
      "bathtub": 1
    }
  },
  "duck-on-skateboard": {
    "name": "Duck on a Skateboard",
    "file": "assets/ducks/duck-on-skateboard.png",
    "recipe": {
      "standard-duck": 1,
      "skateboard": 1
    }
  },
  "googly-eye-duck": {
    "name": "Googly Eye Duck",
    "file": "assets/ducks/googly-eye-duck.png",
    "recipe": {
      "standard-duck": 1,
      "googly-eyes": 1
    }
  },
  "long-hair-duck": {
    "name": "Long Hair Duck",
    "file": "assets/ducks/long-hair-duck.png",
    "recipe": {
      "standard-duck": 1,
      "wig": 1
    }
  },
  "magenta-duck": {
    "name": "Magenta Duck",
    "file": "assets/ducks/magenta-duck.png",
    "recipe": {
      "standard-duck": 1,
      "magenta-paint": 1
    }
  },
  "pile-of-tiny-ducks": {
    "name": "Pile of Tiny Ducks",
    "file": "assets/ducks/pile-of-tiny-ducks.png",
    "acquisition": "hundred-tiny-sightings"
  },
  "scarf-duck": {
    "name": "Scarf Duck",
    "file": "assets/ducks/scarf-duck.png",
    "recipe": {
      "standard-duck": 1,
      "scarf": 1
    }
  },
  "vampire-duck": {
    "name": "Vampire Duck",
    "file": "assets/ducks/vampire-duck.png",
    "recipe": {
      "standard-duck": 1,
      "vampire-teeth": 1
    }
  },
  "alien-duck": {
    "name": "Alien Duck",
    "file": "assets/ducks/Alien-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "ufo": 1
    }
  },
  "angel-duck": {
    "name": "Angel Duck",
    "file": "assets/ducks/Angel-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "angel-wing": 1
    }
  },
  "aqua-duck": {
    "name": "Aqua Duck",
    "file": "assets/ducks/Aqua-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "aqua-paint": 1
    }
  },
  "artist-duck": {
    "name": "Artist Duck",
    "file": "assets/ducks/Artist-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "paintbrush": 1
    }
  },
  "black-duck": {
    "name": "Black Duck",
    "file": "assets/ducks/Black-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "black-paint": 1
    }
  },
  "blue-duck": {
    "name": "Blue Duck",
    "file": "assets/ducks/Blue-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "blue-paint": 1
    }
  },
  "bow-duck": {
    "name": "Bow Duck",
    "file": "assets/ducks/Bow-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "bow": 1
    }
  },
  "bronze-duck": {
    "name": "Bronze Duck",
    "file": "assets/ducks/Bronze-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "bronze-paint": 1
    }
  },
  "bunny-duck": {
    "name": "Bunny Duck",
    "file": "assets/ducks/Bunny-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "bunny-ears": 1
    }
  },
  "burger-duck": {
    "name": "Burger Duck",
    "file": "assets/ducks/Burger-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "burger": 1
    }
  },
  "cat-duck": {
    "name": "Cat Duck",
    "file": "assets/ducks/Cat-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "cat-ears": 1
    }
  },
  "cool-duck": {
    "name": "Cool Duck",
    "file": "assets/ducks/Cool-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "sunglasses": 1
    }
  },
  "cosmic-duck": {
    "name": "Cosmic Duck",
    "file": "assets/ducks/Cosmic-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "moon": 1
    }
  },
  "cupcake-duck": {
    "name": "Cupcake Duck",
    "file": "assets/ducks/Cupcake-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "cupcake": 1
    }
  },
  "dark-red-duck": {
    "name": "Dark Red Duck",
    "file": "assets/ducks/Dark-red-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "dark-red-paint": 1
    }
  },
  "demon-duck": {
    "name": "Demon Duck",
    "file": "assets/ducks/Demon-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "demon-wing": 1
    }
  },
  "doctor-duck": {
    "name": "Doctor Duck",
    "file": "assets/ducks/Doctor-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "pill": 1
    }
  },
  "duck-with-a-knife": {
    "name": "Duck with a Knife",
    "file": "assets/ducks/Duck-with-a-knife.PNG",
    "recipe": {
      "standard-duck": 1,
      "knife": 1
    }
  },
  "duckvee": {
    "name": "Duckvee",
    "file": "assets/ducks/Duckvee.PNG",
    "recipe": {
      "standard-duck": 1,
      "pocket-monster-ball": 1
    }
  },
  "fancy-duck": {
    "name": "Fancy Duck",
    "file": "assets/ducks/Fancy-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "mustache": 1
    }
  },
  "flower-duck": {
    "name": "Flower Duck",
    "file": "assets/ducks/Flower-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "flower": 1
    }
  },
  "gamer-duck": {
    "name": "Gamer Duck",
    "file": "assets/ducks/Gamer-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "game-controller": 1
    }
  },
  "ghost-duck": {
    "name": "Ghost Duck",
    "file": "assets/ducks/Ghost-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "ghost": 1
    }
  },
  "glitter-duck": {
    "name": "Glitter Duck",
    "file": "assets/ducks/Glitter-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "glitter": 1
    }
  },
  "golden-duck": {
    "name": "Golden Duck",
    "file": "assets/ducks/Golden-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "gold-paint": 1
    }
  },
  "goose": {
    "name": "Goose",
    "file": "assets/ducks/Goose.PNG",
    "acquisition": "honk-of-approval"
  },
  "green-duck": {
    "name": "Green Duck",
    "file": "assets/ducks/Green-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "green-paint": 1
    }
  },
  "grey-duck": {
    "name": "Grey Duck",
    "file": "assets/ducks/Grey-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "grey-paint": 1
    }
  },
  "gummy-duck": {
    "name": "Gummy Duck",
    "file": "assets/ducks/Gummy-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "gummy-bear": 1
    }
  },
  "jester-duck": {
    "name": "Jester Duck",
    "file": "assets/ducks/Jester-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "jester-bell": 1
    }
  },
  "kidcore-duck": {
    "name": "Kidcore Duck",
    "file": "assets/ducks/Kidcore-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "lollipop": 1
    }
  },
  "king-duck": {
    "name": "King Duck",
    "file": "assets/ducks/King-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "crown": 1
    }
  },
  "knitted-duck": {
    "name": "Knitted Duck",
    "file": "assets/ducks/Knitted-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "yarn": 1
    }
  },
  "lemon-duck": {
    "name": "Lemon Duck",
    "file": "assets/ducks/Lemon-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "lemon": 1
    }
  },
  "lime-duck": {
    "name": "Lime Duck",
    "file": "assets/ducks/Lime-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "lime": 1
    }
  },
  "magical-girl-duck": {
    "name": "Magical Girl Duck",
    "file": "assets/ducks/Magical-girl-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "magical-girl-pendant": 1
    }
  },
  "mint-duck": {
    "name": "Mint Duck",
    "file": "assets/ducks/Mint-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "mint-paint": 1
    }
  },
  "mushroom-duck": {
    "name": "Mushroom Duck",
    "file": "assets/ducks/Mushroom-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "mushroom": 1
    }
  },
  "miko-duck": {
    "name": "Miko Duck",
    "file": "miko-duck.png",
    "acquisition": "character-happiness-100",
    "characterId": "miko"
  },
  "orange-duck": {
    "name": "Orange Duck",
    "file": "assets/ducks/Orange-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "orange-paint": 1
    }
  },
  "party-hat-duck": {
    "name": "Party Hat Duck",
    "file": "assets/ducks/Party-hat-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "party-hat": 1
    }
  },
  "peach-duck": {
    "name": "Peach Duck",
    "file": "assets/ducks/Peach-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "peach-paint": 1
    }
  },
  "peep-duck": {
    "name": "Peep Duck",
    "file": "peep-duck.png",
    "acquisition": "character-happiness-100",
    "characterId": "peep"
  },
  "periwinkle-duck": {
    "name": "Periwinkle Duck",
    "file": "assets/ducks/Periwinkle-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "periwinkle-paint": 1
    }
  },
  "pink-duck": {
    "name": "Pink Duck",
    "file": "assets/ducks/Pink-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "pink-paint": 1
    }
  },
  "pizza-duck": {
    "name": "Pizza Duck",
    "file": "assets/ducks/Pizza-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "pizza": 1
    }
  },
  "plush-duck": {
    "name": "Plush Duck",
    "file": "assets/ducks/Plush-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "thread": 1
    }
  },
  "pompompurin-duck": {
    "name": "Pompompurin Duck",
    "file": "assets/ducks/Pompompurin-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "pudding": 1
    }
  },
  "purple-duck": {
    "name": "Purple Duck",
    "file": "assets/ducks/Purple-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "purple-paint": 1
    }
  },
  "rainbow-duck": {
    "name": "Rainbow Duck",
    "file": "assets/ducks/Rainbow-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "rainbow-paint": 1
    }
  },
  "red-duck": {
    "name": "Red Duck",
    "file": "assets/ducks/Red-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "red-paint": 1
    }
  },
  "silver-duck": {
    "name": "Silver Duck",
    "file": "assets/ducks/Silver-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "silver-paint": 1
    }
  },
  "sky-blue-duck": {
    "name": "Sky Blue Duck",
    "file": "assets/ducks/Sky-blue-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "sky-blue-paint": 1
    }
  },
  "sleepy-time-duck": {
    "name": "Sleepy Time Duck",
    "file": "assets/ducks/Sleepy-time-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "sleep-mask": 1
    }
  },
  "standard-duck": {
    "name": "Standard Duck",
    "file": "assets/ducks/Standard-duck.PNG",
    "acquisition": "drop-or-shop"
  },
  "strawberry-duck": {
    "name": "Strawberry Duck",
    "file": "assets/ducks/Strawberry-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "strawberry": 1
    }
  },
  "tiny-duck-stack": {
    "name": "Tiny Duck Stack",
    "file": "assets/ducks/Tiny-duck-stack.PNG",
    "acquisition": "four-tiny-sightings"
  },
  "tiny-duck": {
    "name": "Tiny Duck",
    "file": "assets/ducks/Tiny-duck.PNG",
    "acquisition": "hidden-sighting"
  },
  "top-hat-duck": {
    "name": "Top Hat Duck",
    "file": "assets/ducks/Top-hat-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "top-hat": 1
    }
  },
  "violet-duck": {
    "name": "Violet Duck",
    "file": "assets/ducks/Violet-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "violet-paint": 1
    }
  },
  "watermelon-duck": {
    "name": "Watermelon Duck",
    "file": "assets/ducks/Watermelon-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "watermelon": 1
    }
  },
  "white-duck": {
    "name": "White Duck",
    "file": "assets/ducks/White-duck.PNG",
    "recipe": {
      "standard-duck": 1,
      "white-paint": 1
    }
  }
};

const DUCK_TOTAL = Object.keys(DUCKS).length;
const DUCK_NAME_TO_ID = Object.fromEntries(
  Object.entries(DUCKS).map(([id, duck]) => [duck.name.toLowerCase(), id])
);

const BAKERY_ASSETS = {
  "background": "assets/bakery/backgrounds/Bakery-background.PNG",
  "drops": {
    "gold-coin": {
      "name": "Gold Coin",
      "file": "assets/bakery/drops/Gold-coin.PNG",
      "effect": {
        "type": "coins",
        "amount": 5
      }
    },
    "rose-gold-coin": {
      "name": "Rose Gold Coin",
      "file": "assets/bakery/drops/Rose-gold-coin.PNG",
      "effect": {
        "type": "coins",
        "amount": 10
      }
    },
    "pink-heart-refill": {
      "name": "Pink Heart Refill",
      "file": "assets/bakery/drops/Pink-heart-refill.PNG",
      "effect": {
        "type": "energy-percent",
        "amount": 20
      }
    },
    "gold-heart-refill": {
      "name": "Gold Heart Refill",
      "file": "assets/bakery/drops/Gold-heart-refill.PNG",
      "effect": {
        "type": "energy-percent",
        "amount": 50
      }
    }
  }
};


const GIFT_REACTIONS = {
  favorite: { label: "Favorite 💖", happiness: 5, expression: "expression-happy", duration: 2800, burst: "💖" },
  like: { label: "Likes it 😊", happiness: 3, expression: "expression-happy", duration: 2200, burst: "♡" },
  okay: { label: "Okay 🙂", happiness: 1, expression: "expression-happy", duration: 1500, burst: "♡" },
  "not-her-thing": { label: "Not her thing 😐", happiness: 0, expression: "expression-shocked", duration: 1400, burst: "…" }
};

function normalizeItemId(value) {
  if (!value) return null;
  if (ITEMS[value]) return value;
  const normalized = String(value).trim().toLowerCase();
  return ITEM_NAME_TO_ID[normalized] || ITEM_ALIASES[normalized] || null;
}

function migrateLegacyInventory(saved) {
  const inventory = {};
  const source = saved?.inventory && typeof saved.inventory === "object"
    ? saved.inventory
    : saved?.craftingInventory && typeof saved.craftingInventory === "object"
      ? saved.craftingInventory
      : {};

  for (const [key, quantity] of Object.entries(source)) {
    const id = normalizeItemId(key);
    const qty = Math.max(0, Number(quantity) || 0);
    if (!id || !qty) continue;
    inventory[id] = (inventory[id] || 0) + qty;
  }
  return inventory;
}

const SHOPPING_DURATION_MS = 60 * 60 * 1000;
const SHOPPING_DAILY_LIMIT = 3;
const PAINT_MIXING_DURATION_MS = 60 * 60 * 1000;
const PAINT_MIXING_DAILY_LIMIT = 2;
const FRIENDSHIP_DATE_DURATION_MS = 60 * 60 * 1000;
const FRIENDSHIP_DATE_DAILY_LIMIT = 1;
const FRIENDSHIP_DATE_HAPPINESS = 3;

const FRIENDSHIP_DATE_ICONS = Object.freeze({
  peep: "assets/ducks/peep-duck.png",
  miko: "assets/ducks/miko-duck.png"
});

const PAINT_MIXING_LOOT_POOL = [
  { id: "red-paint", weight: 5 }, { id: "orange-paint", weight: 5 },
  { id: "gold-paint", weight: 5 }, { id: "silver-paint", weight: 5 },
  { id: "bronze-paint", weight: 5 }, { id: "green-paint", weight: 5 },
  { id: "blue-paint", weight: 5 }, { id: "purple-paint", weight: 5 },
  { id: "white-paint", weight: 5 }, { id: "black-paint", weight: 5 },
  { id: "dark-red-paint", weight: 3 }, { id: "magenta-paint", weight: 3 },
  { id: "peach-paint", weight: 3 }, { id: "mint-paint", weight: 3 },
  { id: "aqua-paint", weight: 3 }, { id: "sky-blue-paint", weight: 3 },
  { id: "periwinkle-paint", weight: 3 }, { id: "violet-paint", weight: 3 },
  { id: "pink-paint", weight: 3 }, { id: "grey-paint", weight: 3 },
  { id: "rainbow-paint", weight: 1 }
];


const ROOMS = [
  { id: "cream", name: "Cream Room", file: "assets/rooms/cream.png", swatch: "#f4e2c8", unlocked: true },
  { id: "green", name: "Green Room", file: "assets/rooms/green.png", swatch: "#c8d4bd", unlocked: false },
  { id: "blue", name: "Blue Room", file: "assets/rooms/blue.png", swatch: "#c9dce8", unlocked: false },
  { id: "purple", name: "Purple Room", file: "assets/rooms/purple.png", swatch: "#d8cce7", unlocked: false },
  { id: "peach", name: "Peach Room", file: "assets/rooms/peach.png", swatch: "#f2cdbb", unlocked: false },
  { id: "pink", name: "Pink Room", file: "assets/rooms/pink.png", swatch: "#f6c9d4", unlocked: false },
  { id: "dark-purple", name: "Dark Purple Room", file: "assets/rooms/dark-purple.png", swatch: "#b79aad", unlocked: false },
  { id: "cotton-candy", name: "Cotton Candy Room", file: "assets/rooms/cotton-candy.png", swatch: "#cfe7f7", unlocked: false },
  { id: "chocolate-brown", name: "Chocolate Brown Room", file: "assets/rooms/chocolate-brown.png", swatch: "#b88e78", unlocked: false }
];

const ASSETS = {
  // Back layers
  "tail-cow": { label: "Cow Tail", file: "cow-tail.png", z: 10 },
  "tail-bunny": { label: "Bunny Tail", file: "bunny-tail.png", z: 10 },
  "large-back-bow": { label: "Large Back Hair Bow", file: "large-back-hair-bow.png", z: 12 },
  "hair-short": { label: "Short Hair", file: "hair-short.png", z: 15 },
  "hair-low-pigtails": { label: "Low Pigtails", file: "hair-low-pigtails.png", z: 15 },
  "hair-ponytail": { label: "Ponytail", file: "hair-ponytail.png", z: 15 },
  "hair-long-pigtails": { label: "Long Pigtails", file: "hair-long-pigtails.png", z: 15 },
  "hair-jellyfish": { label: "Jellyfish Hair", file: "hair-jellyfish.png", z: 15 },

  // Body / clothing
  "base": { label: "Base", file: "base.png", z: 25 },
  "sock-left-blue": { label: "Blue Sock · Left", file: "sock-left-blue.png", z: 29 },
  "sock-right-blue": { label: "Blue Sock · Right", file: "sock-right-blue.png", z: 29 },
  "sock-left-rainbow": { label: "Rainbow Sock · Left", file: "sock-left-rainbow.png", z: 29 },
  "sock-right-rainbow": { label: "Rainbow Sock · Right", file: "sock-right-rainbow.png", z: 29 },
  "leg-bandage": { label: "Right Leg Bandage", file: "right-leg-bandage.png", z: 30 },
  "bottom-fluffy": { label: "Fluffy Skirt", file: "fluffy-skirt.png", z: 31 },
  "bottom-pleated": { label: "Pleated Skirt", file: "pleated-skirt.png", z: 31 },
  "top-shirt": { label: "Short-Sleeved Shirt", file: "short-sleeved-shirt.png", z: 32 },
  "top-sweater": { label: "Off-Shoulder Sweater", file: "off-shoulder-sweater.png", z: 32 },
  "jacket": { label: "Cropped Jacket", file: "cropped-jacket.png", z: 34 },
  "shoes-loafer": { label: "Loafers", file: "loafer-shoes.png", z: 35 },
  "shoes-sneaker": { label: "Colorful Sneakers", file: "colorful-sneakers.png", z: 35 },

  // Peep shop outfit layers
  "legwear-white-lace": { label: "White Lace Stockings", file: "white-lace-stockings.png", z: 29.5 },
  "dress-white": { label: "White Dress", file: "white-dress.png", z: 32.5 },
  "cardigan-white": { label: "White Cardigan", file: "white-cardigan-sides.png", previewFile: "white-cardigan-shop.png", z: 34.2 },
  "shoes-white-mary-jane": { label: "White Mary Janes", file: "white-mary-janes.png", z: 35 },
  "bow-white": { label: "White Bow", file: "white-bow.png", z: 13 },

  // Expressions are automatic reactions, not closet choices.
  "expression-neutral": { label: "Neutral", file: "expression-neutral.png", z: 42 },
  "expression-happy": { label: "Happy", file: "expression-happy.png", z: 42 },
  "expression-sad": { label: "Sad", file: "expression-sad.png", z: 42 },
  "expression-shocked": { label: "Shocked", file: "expression-shocked.png", z: 42 },
  "expression-mad": { label: "Mad", file: "expression-mad.png", z: 42 },

  // Front/head layers
  "cow-ears": { label: "Cow Ears", file: "cow-ears.png", z: 44 },
  "cat-ears": { label: "Cat Ears", file: "cat-ears.png", z: 44 },
  "horns": { label: "Horns", file: "horns.png", z: 45 },
  "bangs": { label: "Bangs", file: "bangs.png", z: 46 },
  "collar": { label: "Collar", file: "collar.png", z: 40 },
  "cheek-bandage": { label: "Cheek Bandage", file: "cheek-bandage.png", z: 49 },
  "left-bow": { label: "Left Bow", file: "left-bow.png", z: 52 },
  "right-bow": { label: "Right Bow", file: "right-bow.png", z: 52 },
  "hair-side-ribbon": { label: "Hair Side Ribbon", file: "hair-side-ribbon.png", z: 52 },
  "beret": { label: "Beret", file: "beret.png", z: 5 }
};

// Alpha bounds from the 1080×1920 source canvases. They let us make useful cropped
// closet previews WITHOUT asking the user to upload a second set of thumbnail files.
const THUMB_BOUNDS = {
  "bangs.png": [315,758,874,1246],
  "beret.png": [291,723,932,1059],
  "bunny-tail.png": [560,1279,821,1496],
  "cat-ears.png": [340,715,851,942],
  "cheek-bandage.png": [697,1160,753,1195],
  "collar.png": [557,1216,642,1264],
  "colorful-sneakers.png": [444,1730,746,1818],
  "cow-ears.png": [200,1023,980,1181],
  "cow-tail.png": [730,1357,1072,1604],
  "cropped-jacket.png": [354,1234,845,1525],
  "fluffy-skirt.png": [408,1343,794,1508],
  "hair-jellyfish.png": [195,771,1000,1559],
  "hair-long-pigtails.png": [204,865,991,1426],
  "hair-low-pigtails.png": [244,780,952,1271],
  "hair-ponytail.png": [477,659,906,1156],
  "hair-short.png": [258,784,927,1237],
  "hair-side-ribbon.png": [805,890,901,1003],
  "horns.png": [399,784,787,872],
  "large-back-hair-bow.png": [267,635,924,948],
  "left-bow.png": [278,868,433,997],
  "loafer-shoes.png": [445,1742,745,1808],
  "off-shoulder-sweater.png": [374,1221,839,1531],
  "pleated-skirt.png": [423,1358,782,1498],
  "right-bow.png": [753,868,908,997],
  "right-leg-bandage.png": [615,1591,732,1670],
  "short-sleeved-shirt.png": [462,1220,732,1356],
  "sock-left-blue.png": [447,1529,579,1794],
  "sock-left-rainbow.png": [445,1523,589,1795],
  "sock-right-blue.png": [611,1529,743,1794],
  "sock-right-rainbow.png": [601,1523,745,1795],
  "white-cardigan-shop.png": [308,1212,891,1467],
  "white-cardigan-sides.png": [308,1212,891,1467],
  "white-dress.png": [358,1222,834,1530],
  "white-lace-stockings.png": [446,1399,749,1797],
  "white-mary-janes.png": [443,1749,749,1803],
  "white-bow.png": [201,695,1010,1068]
};

const MIKO_THUMB_BOUNDS = {
  "Miko-angry.PNG": [332,953,740,1164],
  "Miko-bangs.PNG": [250,766,826,1216],
  "Miko-base-arm.PNG": [389,1171,492,1355],
  "Miko-base.PNG": [319,798,761,1794],
  "Miko-belt.PNG": [420,1422,654,1465],
  "Miko-button-shirt-closet.PNG": [390,1202,743,1495],
  "Miko-button-shirt.PNG": [408,1215,743,1495],
  "Miko-button-sleeve.PNG": [390,1202,483,1356],
  "Miko-capri-pants.PNG": [406,1426,665,1687],
  "Miko-hair.PNG": [178,743,898,1218],
  "Miko-happy.PNG": [352,961,715,1179],
  "Miko-headband.PNG": [284,727,798,977],
  "Miko-hoodie-back.PNG": [496,1445,565,1528],
  "Miko-hoodie-closet.PNG": [378,1202,764,1544],
  "Miko-hoodie-sleeve.PNG": [378,1202,487,1355],
  "Miko-hoodie.PNG": [379,1254,764,1544],
  "Miko-jeans.PNG": [402,1417,667,1762],
  "Miko-loafers.PNG": [382,1745,690,1807],
  "Miko-neutral.PNG": [356,933,716,1146],
  "Miko-sad.PNG": [332,939,740,1146],
  "Miko-shocked.PNG": [356,929,716,1165],
  "Miko-smug.PNG": [332,945,740,1146],
  "Miko-sweater-closet.PNG": [378,1195,762,1488],
  "Miko-sweater-sleeve.PNG": [378,1195,495,1371],
  "Miko-sweater.PNG": [415,1230,762,1488],
  "Miko-bangs-pinned.PNG": [245,750,835,1225],
  "Miko-Boxers.PNG": [360,1330,720,1585],
  "Miko-big-shirt.PNG": [335,1145,805,1605],
  "Miko-socks.PNG": [425,1680,660,1828],
  "black-blazer-shop.png": [390,1204,741,1472],
  "black-blazer.png": [416,1222,741,1472],
  "black-blazer-arm-piece.png": [390,1204,491,1361],
  "black-hairpins.png": [684,970,747,1038],
  "blouse.png": [431,1219,655,1423],
  "shorts.png": [402,1402,668,1503],
  "white-garter-socks.png": [384,1614,686,1795],
  "fancy-loafers.png": [380,1745,688,1816]
};

const MIKO_ASSETS = {
  "base": { label: "Body Base", file: "Miko-base.PNG", z: 20 },
  "hair-main": { label: "Hair", file: "Miko-hair.PNG", z: 15 },
  "bangs": { label: "Bangs", file: "Miko-bangs.PNG", z: 48 },
  "bangs-pinned": { label: "Pinned Bangs", file: "Miko-bangs-pinned.PNG", z: 48 },
  "arm-base": { label: "Arm Base", file: "Miko-base-arm.PNG", z: 35 },
  "top-button": { label: "Button Shirt", file: "Miko-button-shirt.PNG", previewFile: "Miko-button-shirt-closet.PNG", z: 32 },
  "top-button-sleeve": { label: "Button Sleeve", file: "Miko-button-sleeve.PNG", z: 36 },
  "top-hoodie": { label: "Hoodie", file: "Miko-hoodie.PNG", previewFile: "Miko-hoodie-closet.PNG", z: 34 },
  "top-hoodie-sleeve": { label: "Hoodie Sleeve", file: "Miko-hoodie-sleeve.PNG", z: 37 },
  "hoodie-back": { label: "Hoodie Back", file: "Miko-hoodie-back.PNG", z: 18 },
  "top-sweater": { label: "Sweater", file: "Miko-sweater.PNG", previewFile: "Miko-sweater-closet.PNG", z: 34 },
  "top-sweater-sleeve": { label: "Sweater Sleeve", file: "Miko-sweater-sleeve.PNG", z: 37 },
  "top-big-shirt": { label: "Big Shirt", file: "Miko-big-shirt.PNG", z: 36.5 },
  "shirt-blouse": { label: "Blouse", file: "blouse.png", z: 32 },
  "outer-black-blazer": { label: "Black Blazer", file: "black-blazer.png", previewFile: "black-blazer-shop.png", z: 34 },
  "outer-black-blazer-arm": { label: "Black Blazer Arm", file: "black-blazer-arm-piece.png", z: 37 },
  "bottom-capris": { label: "Capris", file: "Miko-capri-pants.PNG", z: 31 },
  "bottom-jeans": { label: "Jeans", file: "Miko-jeans.PNG", z: 31 },
  "bottom-boxers": { label: "Boxers", file: "Miko-Boxers.PNG", z: 31 },
  "bottom-shorts": { label: "Shorts", file: "shorts.png", z: 31 },
  "belt": { label: "Belt", file: "Miko-belt.PNG", z: 33 },
  "socks": { label: "Socks", file: "Miko-socks.PNG", z: 29 },
  "socks-garter": { label: "White Garter Socks", file: "white-garter-socks.png", z: 29 },
  "shoes-loafer": { label: "Loafers", file: "Miko-loafers.PNG", z: 39 },
  "shoes-fancy-loafers": { label: "Fancy Loafers", file: "fancy-loafers.png", z: 39 },
  "headband": { label: "Headband", file: "Miko-headband.PNG", z: 47 },
  "hairpins-black": { label: "Black Hairpins", file: "black-hairpins.png", z: 49 },
  "expression-neutral": { label: "Neutral", file: "Miko-neutral.PNG", z: 44 },
  "expression-happy": { label: "Happy", file: "Miko-happy.PNG", z: 44 },
  "expression-sad": { label: "Sad", file: "Miko-sad.PNG", z: 44 },
  "expression-shocked": { label: "Shocked", file: "Miko-shocked.PNG", z: 44 },
  "expression-mad": { label: "Angry", file: "Miko-angry.PNG", z: 44 },
  "expression-smug": { label: "Smug", file: "Miko-smug.PNG", z: 44 }
};

const MIKO_CLOSET = [
  {
    id: "hair",
    label: "Hair",
    type: "hair",
    options: ["hair-main"]
  },
  { id: "bangsStyle", label: "Bangs", type: "single", options: ["bangs", "bangs-pinned"] },
  { id: "shirt", label: "Shirt", type: "single", allowNone: true, options: ["top-button", "shirt-blouse"] },
  { id: "outer", label: "Layers", type: "single", allowNone: true, options: ["top-hoodie", "top-sweater", "top-big-shirt", "outer-black-blazer"] },
  { id: "bottom", label: "Bottoms", type: "single", options: ["bottom-capris", "bottom-jeans", "bottom-boxers", "bottom-shorts"] },
  { id: "socks", label: "Socks", type: "single", allowNone: true, options: ["socks", "socks-garter"] },
  { id: "shoes", label: "Shoes", type: "single", allowNone: true, options: ["shoes-loafer", "shoes-fancy-loafers"] },
  {
    id: "extras",
    label: "Extras",
    type: "multi",
    options: ["headband", "hairpins-black"]
  }
];

const CLOSET = [
  {
    id: "hair",
    label: "Hair",
    type: "hair",
    options: ["hair-short", "hair-low-pigtails", "hair-ponytail", "hair-long-pigtails", "hair-jellyfish"]
  },
  { id: "top", label: "Tops", type: "single", options: ["top-shirt", "top-sweater"] },
  { id: "bottom", label: "Skirts", type: "single", options: ["bottom-fluffy", "bottom-pleated"] },
  { id: "dress", label: "Dresses", type: "single", allowNone: true, options: ["dress-white"] },
  { id: "legwear", label: "Legwear", type: "single", allowNone: true, options: ["legwear-white-lace"] },
  { id: "socks", label: "Socks", type: "socks" },
  { id: "shoes", label: "Shoes", type: "single", allowNone: true, options: ["shoes-loafer", "shoes-sneaker", "shoes-white-mary-jane"] },
  { id: "ears", label: "Ears", type: "single", allowNone: true, options: ["cow-ears", "cat-ears"] },
  { id: "tail", label: "Tails", type: "single", allowNone: true, options: ["tail-cow", "tail-bunny"] },
  {
    id: "extras",
    label: "Extras",
    type: "multi",
    options: ["jacket", "cardigan-white", "collar", "leg-bandage", "horns", "cheek-bandage", "left-bow", "right-bow", "bow-white", "hair-side-ribbon", "large-back-bow", "beret"]
  }
];

const DEFAULT_OUTFIT = {
  hair: "hair-short",
  top: "top-sweater",
  bottom: "bottom-pleated",
  dress: null,
  legwear: null,
  leftSock: "sock-left-rainbow",
  rightSock: "sock-right-rainbow",
  shoes: "shoes-loafer",
  ears: "cat-ears",
  tail: null,
  extras: ["left-bow", "right-bow", "collar"]
};

const DEFAULT_MIKO_OUTFIT = {
  hair: "hair-main",
  bangsStyle: "bangs",
  shirt: "top-button",
  outer: "top-hoodie",
  bottom: "bottom-capris",
  socks: null,
  shoes: "shoes-loafer",
  extras: []
};

function normalizeMikoOutfit(rawOutfit = {}) {
  const incoming = rawOutfit && typeof rawOutfit === "object" ? rawOutfit : {};
  const hadOuterField = Object.prototype.hasOwnProperty.call(incoming, "outer");
  const hadShirtField = Object.prototype.hasOwnProperty.call(incoming, "shirt");
  let outer = hadOuterField ? incoming.outer : undefined;
  let shirt = hadShirtField ? incoming.shirt : undefined;

  // Migrate the older mutually-exclusive `top` field into the newer
  // independent Shirt + outer-layer system. Existing players keep the
  // Button Shirt equipped unless they explicitly remove it in the Closet.
  if (!hadOuterField) {
    if (incoming.top === "top-sweater") outer = "top-sweater";
    else if (incoming.top === "top-button") outer = null;
    else outer = "top-hoodie";
  }

  if (!hadShirtField) shirt = "top-button";
  if (![null, "top-button", "shirt-blouse"].includes(shirt)) shirt = "top-button";
  if (![null, "top-hoodie", "top-sweater", "top-big-shirt", "outer-black-blazer"].includes(outer)) outer = "top-hoodie";

  const bangsStyle = ["bangs", "bangs-pinned"].includes(incoming.bangsStyle)
    ? incoming.bangsStyle
    : "bangs";
  const bottom = ["bottom-capris", "bottom-jeans", "bottom-boxers", "bottom-shorts"].includes(incoming.bottom)
    ? incoming.bottom
    : "bottom-capris";
  const socks = ["socks", "socks-garter"].includes(incoming.socks) ? incoming.socks : null;
  const shoes = [null, "shoes-loafer", "shoes-fancy-loafers"].includes(incoming.shoes)
    ? incoming.shoes
    : "shoes-loafer";

  const normalized = {
    ...structuredClone(DEFAULT_MIKO_OUTFIT),
    ...incoming,
    bangsStyle,
    shirt,
    outer,
    bottom,
    socks,
    shoes
  };
  delete normalized.top;
  return normalized;
}

const MAX_CHARACTER_LEVEL = 100;
const LEGACY_MAX_CHARACTER_HAPPINESS = 100;
const MAIN_ROOM_STORAGE_ID = "__main-room__";

function getHappinessRequirementForLevel(level) {
  const safeLevel = Math.max(1, Math.min(MAX_CHARACTER_LEVEL - 1, Number(level) || 1));
  return 10 + Math.floor((safeLevel - 1) / 5);
}

function getTotalHappinessRequiredForLevel(level) {
  const cappedLevel = Math.max(1, Math.min(MAX_CHARACTER_LEVEL, Number(level) || 1));
  let total = 0;
  for (let currentLevel = 1; currentLevel < cappedLevel; currentLevel += 1) {
    total += getHappinessRequirementForLevel(currentLevel);
  }
  return total;
}

const MAX_CHARACTER_HAPPINESS_TOTAL = getTotalHappinessRequiredForLevel(MAX_CHARACTER_LEVEL);

function clampCharacterHappinessTotal(value) {
  return Math.max(0, Math.min(MAX_CHARACTER_HAPPINESS_TOTAL, Math.round(Number(value) || 0)));
}

function migrateLegacyHappinessValue(value) {
  const legacy = Math.max(0, Math.min(LEGACY_MAX_CHARACTER_HAPPINESS, Number(value) || 0));
  return clampCharacterHappinessTotal(Math.round((legacy / LEGACY_MAX_CHARACTER_HAPPINESS) * MAX_CHARACTER_HAPPINESS_TOTAL));
}

function normalizeLoadedCharacterProgress(progress, legacyFallback = 0) {
  if (progress && typeof progress === "object" && Number.isFinite(Number(progress.happinessTotal))) {
    return { happinessTotal: clampCharacterHappinessTotal(progress.happinessTotal) };
  }

  const legacyValue = progress && typeof progress === "object"
    ? (progress.happiness ?? legacyFallback ?? 0)
    : (legacyFallback ?? 0);

  return { happinessTotal: migrateLegacyHappinessValue(legacyValue) };
}

function getCharacterHappinessInfo(characterId = save.selectedCharacter) {
  const progress = getCharacterProgress(characterId);
  const total = clampCharacterHappinessTotal(progress.happinessTotal);
  let remaining = total;
  let level = 1;

  while (level < MAX_CHARACTER_LEVEL) {
    const pointsForNextLevel = getHappinessRequirementForLevel(level);
    if (remaining < pointsForNextLevel) {
      return {
        total,
        level,
        nextLevel: level + 1,
        currentLevelPoints: remaining,
        pointsForNextLevel,
        pointsToNextLevel: pointsForNextLevel - remaining,
        progressPercent: pointsForNextLevel > 0 ? (remaining / pointsForNextLevel) * 100 : 100,
        atMax: false
      };
    }
    remaining -= pointsForNextLevel;
    level += 1;
  }

  return {
    total,
    level: MAX_CHARACTER_LEVEL,
    nextLevel: MAX_CHARACTER_LEVEL,
    currentLevelPoints: 0,
    pointsForNextLevel: 0,
    pointsToNextLevel: 0,
    progressPercent: 100,
    atMax: true
  };
}

const DEFAULT_SAVE = {
  version: SAVE_VERSION,
  coins: 0,
  room: "cream",
  selectedCharacter: "peep",
  unlockedCharacters: ["peep"],
  unlockedRooms: ["cream"],
  unlockedItems: ["hair-short", "cat-ears", "left-bow", "right-bow", "top-sweater", "bottom-pleated", "sock-left-rainbow", "sock-right-rainbow", "shoes-loafer", "collar", "cheek-bandage", "tail-bunny"],
  characterUnlockedItems: {
    peep: ["hair-short", "cat-ears", "left-bow", "right-bow", "top-sweater", "bottom-pleated", "sock-left-rainbow", "sock-right-rainbow", "shoes-loafer", "collar", "cheek-bandage", "tail-bunny"],
    miko: ["hair-main", "top-hoodie", "top-button", "bottom-capris", "shoes-loafer"]
  },
  wardrobeResetV1261: true,
  wardrobeResetV1262: false,
  mikoNewOutfitShopMigrationV2413: false,
  paintablePetBedMigrationV2418: false,
  progressRecoveryV1431: true,
  ocShopGateRepairV242: false,
  peepPokes: 0,
  tinyDuckSightings: 0,
  outfit: structuredClone(DEFAULT_OUTFIT),
  characterOutfits: {
    peep: structuredClone(DEFAULT_OUTFIT),
    miko: structuredClone(DEFAULT_MIKO_OUTFIT)
  },
  characterProgress: {
    peep: { happinessTotal: 0 },
    miko: { happinessTotal: 0 }
  },
  tasks: [],
  savedTaskTemplates: [],
  completedTaskHistory: [],
  unlockedDucks: [],
  duckDisplays: {
    headByCharacter: {},
    floorByRoom: {},
    furnitureByRoom: {}
  },
  roomFurniture: {},
  roomExpansion: {
    unlocked: false,
    accentRoom: null,
    shelfStyle: "cream",
    duckSlots: Array(24).fill(null)
  },
  achievements: {
    completed: [],
    rewarded: [],
    completedAt: {}
  },
  inventory: {},
  dailies: {
    shopping: {
      dayKey: "",
      usedToday: 0,
      activeUntil: null,
      activeCharacter: null,
      pendingReward: null
    },
    paintMixing: {
      dayKey: "",
      usedToday: 0,
      activeUntil: null,
      pendingReward: null,
      lastReward: null
    },
    friendshipDate: {
      dayKey: "",
      usedToday: 0,
      activeUntil: null,
      activeCharacterId: null,
      pendingHappiness: false,
      lastCharacterId: null,
      lastGain: 0
    }
  },
  stats: {
    tasksCompleted: 0,
    taskCoinsEarned: 0,
    coinsEarnedTotal: 0,
    xp: 0,
    happiness: 0,
    bakeryWins: 0,
    cranePrizes: 0,
    memoryWins: 0,
    memoryWins6: 0,
    memoryWins8: 0,
    memoryWins10: 0,
    furnitureCraftedIds: []
  }
};

function loadSave() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_SAVE);
    const saved = JSON.parse(raw);

    const merged = {
      ...structuredClone(DEFAULT_SAVE),
      ...saved,
      version: SAVE_VERSION,
      selectedCharacter: CHARACTERS[saved.selectedCharacter] ? saved.selectedCharacter : "peep",
      unlockedCharacters: Array.isArray(saved.unlockedCharacters) ? saved.unlockedCharacters : ["peep"],
      unlockedRooms: Array.isArray(saved.unlockedRooms) ? saved.unlockedRooms : ["cream"],
      unlockedItems: Array.isArray(saved.unlockedItems) ? saved.unlockedItems : ["hair-short", "hair-low-pigtails"],
      characterUnlockedItems: {
        peep: Array.isArray(saved.characterUnlockedItems?.peep)
          ? [...new Set(saved.characterUnlockedItems.peep)]
          : Array.isArray(saved.unlockedItems)
            ? [...new Set(saved.unlockedItems)]
            : [...structuredClone(DEFAULT_SAVE.characterUnlockedItems.peep)],
        miko: Array.isArray(saved.characterUnlockedItems?.miko)
          ? [...new Set(saved.characterUnlockedItems.miko)]
          : [...structuredClone(DEFAULT_SAVE.characterUnlockedItems.miko)]
      },
      outfit: { ...structuredClone(DEFAULT_OUTFIT), ...(saved.outfit || {}) },
      characterOutfits: {
        peep: {
          ...structuredClone(DEFAULT_OUTFIT),
          ...(saved.characterOutfits?.peep || saved.outfit || {})
        },
        miko: normalizeMikoOutfit(saved.characterOutfits?.miko || {})
      },
      characterProgress: {
        peep: normalizeLoadedCharacterProgress(
          saved.characterProgress?.peep,
          Number(saved.stats?.happiness) || 0
        ),
        miko: normalizeLoadedCharacterProgress(saved.characterProgress?.miko, 0)
      },
      tasks: Array.isArray(saved.tasks) ? saved.tasks : [],
      savedTaskTemplates: Array.isArray(saved.savedTaskTemplates) ? saved.savedTaskTemplates : [],
      completedTaskHistory: Array.isArray(saved.completedTaskHistory) ? saved.completedTaskHistory : [],
      unlockedDucks: Array.isArray(saved.unlockedDucks) ? saved.unlockedDucks : [],
      tinyDuckSightings: Math.max(0, Number(saved.tinyDuckSightings) || 0),
      duckDisplays: {
        headByCharacter: {
          ...structuredClone(DEFAULT_SAVE.duckDisplays.headByCharacter),
          ...(saved.duckDisplays?.headByCharacter || {})
        },
        floorByRoom: {
          ...structuredClone(DEFAULT_SAVE.duckDisplays.floorByRoom),
          ...(saved.duckDisplays?.floorByRoom || {})
        },
        furnitureByRoom: {
          ...structuredClone(DEFAULT_SAVE.duckDisplays.furnitureByRoom),
          ...(saved.duckDisplays?.furnitureByRoom || {})
        }
      },
      roomFurniture: {
        ...structuredClone(DEFAULT_SAVE.roomFurniture),
        ...(saved.roomFurniture || {})
      },
      roomExpansion: {
        ...structuredClone(DEFAULT_SAVE.roomExpansion),
        ...(saved.roomExpansion || {}),
        duckSlots: Array.from({ length: 24 }, (_, index) => {
          const value = saved.roomExpansion?.duckSlots?.[index];
          return typeof value === "string" ? value : null;
        })
      },
      achievements: {
        completed: Array.isArray(saved.achievements?.completed)
          ? [...new Set(saved.achievements.completed)]
          : [],
        rewarded: Array.isArray(saved.achievements?.rewarded)
          ? [...new Set(saved.achievements.rewarded)]
          : [],
        completedAt: { ...(saved.achievements?.completedAt || {}) }
      },
      inventory: migrateLegacyInventory(saved),
      dailies: {
        shopping: {
          ...structuredClone(DEFAULT_SAVE.dailies.shopping),
          ...(saved.dailies?.shopping || {})
        },
        paintMixing: {
          ...structuredClone(DEFAULT_SAVE.dailies.paintMixing),
          ...(saved.dailies?.paintMixing || {})
        },
        friendshipDate: {
          ...structuredClone(DEFAULT_SAVE.dailies.friendshipDate),
          ...(saved.dailies?.friendshipDate || {})
        }
      },
      stats: {
        ...structuredClone(DEFAULT_SAVE.stats),
        ...(saved.stats || {})
      }
    };

    // v24.55: start a lifetime coin counter. Older saves did not track every
    // earning source, so seed a conservative historical floor from the data we do have.
    if (!Number.isFinite(Number(saved.stats?.coinsEarnedTotal))) {
      const knownTasks = Math.max(0, Number(merged.stats.taskCoinsEarned) || 0);
      const knownQuest = Math.max(0, Number(saved.duckQuest?.totalCoinsEarned) || 0);
      const knownCrane = Math.max(0, Number(merged.stats.cranePrizes) || 0) * 3;
      const knownBakery = Math.max(0, Number(merged.stats.bakeryWins) || 0) * 50;
      const knownMemory = Math.max(0, Number(merged.stats.memoryWins) || 0) * 12;
      merged.stats.coinsEarnedTotal = Math.max(
        Math.max(0, Number(merged.coins) || 0),
        knownTasks + knownQuest + knownCrane + knownBakery + knownMemory
      );
    } else {
      merged.stats.coinsEarnedTotal = Math.max(0, Number(saved.stats.coinsEarnedTotal) || 0);
    }

    if (Array.isArray(saved.stats?.furnitureCraftedIds)) {
      merged.stats.furnitureCraftedIds = [...new Set(
        saved.stats.furnitureCraftedIds.filter(itemId =>
          ITEMS[itemId]?.customizableFurniture && ITEMS[itemId]?.furnitureColor !== "white"
        )
      )];
    } else {
      // Older saves did not track this statistic. Seed it from currently-owned
      // crafted color variants so existing progress is not completely lost.
      merged.stats.furnitureCraftedIds = Object.entries(merged.inventory || {})
        .filter(([itemId, quantity]) =>
          Number(quantity) > 0
          && ITEMS[itemId]?.customizableFurniture
          && ITEMS[itemId]?.furnitureColor !== "white"
        )
        .map(([itemId]) => itemId);
    }

    // Saves from the original pre-V2 prototype used a different closet shape.
    // Only those very old saves adopt Peep's approved default outfit.
    if (!saved.version || saved.version < 2) {
      merged.outfit = structuredClone(DEFAULT_OUTFIT);
      merged.characterOutfits.peep = structuredClone(DEFAULT_OUTFIT);
    }

    delete merged.craftingInventory;
    return merged;
  } catch {
    return structuredClone(DEFAULT_SAVE);
  }
}
let save = loadSave();


function getCharacterAssetMap(characterId = save.selectedCharacter) {
  return characterId === "miko" ? MIKO_ASSETS : ASSETS;
}

function getCharacterCloset(characterId = save.selectedCharacter) {
  return characterId === "miko" ? MIKO_CLOSET : CLOSET;
}

function getCharacterThumbBounds(characterId = save.selectedCharacter) {
  return characterId === "miko" ? MIKO_THUMB_BOUNDS : THUMB_BOUNDS;
}

function getCharacterStarterWardrobe(characterId = save.selectedCharacter) {
  if (characterId === "miko") {
    return [
      "hair-main", "bangs",
      "top-hoodie", "top-button",
      "bottom-capris", "shoes-loafer"
    ];
  }

  return [
    "hair-short",
    "cat-ears",
    "left-bow",
    "right-bow",
    "top-sweater",
    "bottom-pleated",
    "sock-left-rainbow",
    "sock-right-rainbow",
    "shoes-loafer",
    "collar",
    "cheek-bandage",
    "tail-bunny"
  ];
}

function getCharacterDefaultOutfit(characterId = save.selectedCharacter) {
  return characterId === "miko" ? DEFAULT_MIKO_OUTFIT : DEFAULT_OUTFIT;
}

function normalizeCharacterState() {
  if (!save.characterOutfits || typeof save.characterOutfits !== "object") save.characterOutfits = {};
  if (!save.characterUnlockedItems || typeof save.characterUnlockedItems !== "object") save.characterUnlockedItems = {};
  if (!save.characterProgress || typeof save.characterProgress !== "object") save.characterProgress = {};

  save.characterOutfits.peep = {
    ...structuredClone(DEFAULT_OUTFIT),
    ...(save.characterOutfits.peep || save.outfit || {})
  };
  save.characterOutfits.miko = normalizeMikoOutfit(save.characterOutfits.miko || {});

  const peepUnlocks = new Set([
    ...(Array.isArray(save.characterUnlockedItems.peep) ? save.characterUnlockedItems.peep : []),
    ...(Array.isArray(save.unlockedItems) ? save.unlockedItems : []),
    ...getCharacterStarterWardrobe("peep")
  ]);
  const mikoUnlocks = new Set([
    ...(Array.isArray(save.characterUnlockedItems.miko) ? save.characterUnlockedItems.miko : []),
    ...getCharacterStarterWardrobe("miko")
  ]);
  save.characterUnlockedItems.peep = [...peepUnlocks];
  save.characterUnlockedItems.miko = [...mikoUnlocks];

  save.characterProgress.peep = normalizeLoadedCharacterProgress(
    save.characterProgress.peep,
    save.stats?.happiness ?? 0
  );
  save.characterProgress.miko = normalizeLoadedCharacterProgress(save.characterProgress.miko, 0);

  if (!save.stats || typeof save.stats !== "object") save.stats = structuredClone(DEFAULT_SAVE.stats);
  save.stats.happiness = save.characterProgress.peep.happinessTotal;

  if (!Array.isArray(save.unlockedCharacters)) save.unlockedCharacters = ["peep"];
  if (!save.unlockedCharacters.includes("peep")) save.unlockedCharacters.unshift("peep");

  if (!CHARACTERS[save.selectedCharacter] || !save.unlockedCharacters.includes(save.selectedCharacter)) {
    save.selectedCharacter = "peep";
  }

  // Keep legacy fields in sync so older helper code and save backups remain safe.
  save.outfit = structuredClone(save.characterOutfits.peep);
  save.unlockedItems = [...save.characterUnlockedItems.peep];
}

function getCharacterOutfit(characterId = save.selectedCharacter) {
  normalizeCharacterState();
  if (!save.characterOutfits[characterId]) {
    save.characterOutfits[characterId] = structuredClone(getCharacterDefaultOutfit(characterId));
  }
  return save.characterOutfits[characterId];
}

function getCurrentOutfit() {
  return getCharacterOutfit(save.selectedCharacter);
}

function getCharacterUnlockedItems(characterId = save.selectedCharacter) {
  normalizeCharacterState();
  if (!Array.isArray(save.characterUnlockedItems[characterId])) {
    save.characterUnlockedItems[characterId] = [...getCharacterStarterWardrobe(characterId)];
  }
  return save.characterUnlockedItems[characterId];
}

function getCharacterProgress(characterId = save.selectedCharacter) {
  normalizeCharacterState();
  if (!save.characterProgress[characterId]) {
    save.characterProgress[characterId] = { happinessTotal: 0 };
  }

  if (!Number.isFinite(Number(save.characterProgress[characterId].happinessTotal))) {
    save.characterProgress[characterId] = normalizeLoadedCharacterProgress(save.characterProgress[characterId], 0);
  }

  save.characterProgress[characterId].happinessTotal = clampCharacterHappinessTotal(save.characterProgress[characterId].happinessTotal);
  return save.characterProgress[characterId];
}

function getCharacterHappinessDuckReward(characterId) {
  return Object.entries(DUCKS).find(([, duck]) =>
    duck.acquisition === "character-happiness-100" && duck.characterId === characterId
  ) || null;
}

function evaluateCharacterHappinessDuckReward(characterId = save.selectedCharacter, options = {}) {
  const rewardEntry = getCharacterHappinessDuckReward(characterId);
  if (!rewardEntry) return false;

  const [duckId, duck] = rewardEntry;
  const happiness = getCharacterHappinessInfo(characterId);
  if (!happiness.atMax || happiness.level < MAX_CHARACTER_LEVEL) return false;
  if (isDuckUnlocked(duckId)) return false;

  const unlocked = unlockDuck(duckId, {
    notify: false,
    persistNow: options.persistNow !== false
  });

  if (unlocked && options.notify !== false) {
    const characterName = CHARACTERS[characterId]?.name || characterId;
    setTimeout(() => showToast(`${characterName} reached Happiness Level 100! ${duck.name} unlocked! 🦆✨`), 650);
  }
  return unlocked;
}

function addCharacterHappiness(amount, characterId = save.selectedCharacter) {
  const progress = getCharacterProgress(characterId);
  const before = progress.happinessTotal;
  progress.happinessTotal = clampCharacterHappinessTotal(before + Number(amount || 0));
  if (characterId === "peep") save.stats.happiness = progress.happinessTotal;

  const gained = progress.happinessTotal - before;
  if (gained > 0) {
    // This runs during normal gameplay, after the UI has fully initialized.
    evaluateCharacterHappinessDuckReward(characterId, { persistNow: false, notify: true });
  }
  return gained;
}

function mainRoomStorageId(roomId = save.room) {
  return MAIN_ROOM_STORAGE_ID;
}

function migrateLegacyMainRoomDecor() {
  normalizeRoomFurniture();
  const sharedKey = mainRoomStorageId();
  const currentRoomId = save.room;

  if (!save.roomFurniture[sharedKey]) {
    const source = save.roomFurniture[currentRoomId]
      || Object.entries(save.roomFurniture)
        .find(([key, value]) => key !== sharedKey && value && typeof value === "object")?.[1];
    if (source) save.roomFurniture[sharedKey] = { ...EMPTY_ROOM_FURNITURE, ...source };
  }

  normalizeDuckDisplays();

  if (!(sharedKey in save.duckDisplays.floorByRoom)) {
    const floorSource = save.duckDisplays.floorByRoom[currentRoomId]
      ?? Object.entries(save.duckDisplays.floorByRoom)
        .find(([key, value]) => key !== sharedKey && value)?.[1];
    if (floorSource) save.duckDisplays.floorByRoom[sharedKey] = floorSource;
  }

  if (!save.duckDisplays.furnitureByRoom[sharedKey]) {
    const furnitureSource = save.duckDisplays.furnitureByRoom[currentRoomId]
      || Object.entries(save.duckDisplays.furnitureByRoom)
        .find(([key, value]) => key !== sharedKey && value && typeof value === "object")?.[1];
    if (furnitureSource) save.duckDisplays.furnitureByRoom[sharedKey] = structuredClone(furnitureSource);
  }
}

function normalizeDuckId(value) {
  if (!value) return null;
  const raw = String(value).trim();
  if (DUCKS[raw]) return raw;
  const lower = raw.toLowerCase();
  if (DUCKS[lower]) return lower;
  return DUCK_NAME_TO_ID[lower] || null;
}

function sanitizeUnlockedDucks() {
  const normalized = [];
  for (const value of Array.isArray(save.unlockedDucks) ? save.unlockedDucks : []) {
    const id = normalizeDuckId(value);
    if (id && !normalized.includes(id)) normalized.push(id);
  }

  // Standard Duck is a special entry: finding or buying one counts as discovery.
  if ((Number(save.inventory?.["standard-duck"]) || 0) > 0 && !normalized.includes("standard-duck")) {
    normalized.push("standard-duck");
  }

  save.unlockedDucks = normalized;
}

sanitizeUnlockedDucks();
normalizeDuckDisplays();
normalizeRoomFurniture();
let currentClosetTab = "hair";
let currentExpression = "expression-neutral";
let reactionTimer = null;
let pokeTimes = [];
let pokeLocked = false;
let openSockStyleId = null;
let currentTaskTab = "today";
let currentInventoryTab = "crafting";
let selectedInventoryItemId = null;
let selectedFurnitureColorId = null;
let selectedGiftQuantity = 1;
let currentShopTab = "supplies";
let selectedShopItemId = null;
let selectedShopQuantity = 1;
let currentDuckipediaFilter = "all";
let selectedDuckId = null;
let selectedProfileCharacterId = null;
let currentAchievementTab = "all";
let selectedAchievementId = null;
let achievementUnlockQueue = [];
let achievementUnlockTimer = null;
let achievementEvaluationInProgress = false;
let currentRoomView = "main";
let selectedWingDuckSlot = null;
let currentCrafterTab = "ducks";
let selectedCraftTarget = null;
let dailyTimerInterval = null;
let toastTimer;

const stage = document.querySelector("#stage");
const roomImage = document.querySelector("#roomImage");
const roomMirrorImage = document.querySelector("#roomMirrorImage");
const roomBookImage = document.querySelector("#roomBookImage");
const bookHotspot = document.querySelector("#bookHotspot");
const roomWingButton = document.querySelector("#roomWingButton");
const roomWingArrow = document.querySelector("#roomWingArrow");
const duckDisplayWing = document.querySelector("#duckDisplayWing");
const wingShelfImage = document.querySelector("#wingShelfImage");
const wingDuckSlots = document.querySelector("#wingDuckSlots");
const wingDuckPicker = document.querySelector("#wingDuckPicker");
const wingDuckPickerGrid = document.querySelector("#wingDuckPickerGrid");
const clearWingDuckSlot = document.querySelector("#clearWingDuckSlot");
const peepWrap = document.querySelector("#peepWrap");
const peepLayers = document.querySelector("#peepLayers");
const headDuckDisplay = document.querySelector("#headDuckDisplay");
const floorDuckDisplay = document.querySelector("#floorDuckDisplay");
const rugFurnitureDisplay = document.querySelector("#rugFurnitureDisplay");
const leftFurnitureDisplay = document.querySelector("#leftFurnitureDisplay");
const petBedFurnitureDisplay = document.querySelector("#petBedFurnitureDisplay");
const lightsFurnitureDisplay = document.querySelector("#lightsFurnitureDisplay");
const furnitureDuckLayer = document.querySelector("#furnitureDuckLayer");
const roomPickerButton = document.querySelector("#roomPickerButton");
const roomPickerSwatch = document.querySelector("#roomPickerSwatch");
const roomPickerText = document.querySelector("#roomPickerText");
const roomPicker = document.querySelector("#roomPicker");
const coinCount = document.querySelector("#coinCount");
const closetPanel = document.querySelector("#closetPanel");
const bookPanel = document.querySelector("#bookPanel");
const saveDataPanel = document.querySelector("#saveDataPanel");
const downloadSaveBackupButton = document.querySelector("#downloadSaveBackup");
const importSaveBackupButton = document.querySelector("#importSaveBackup");
const saveBackupFileInput = document.querySelector("#saveBackupFileInput");
const resetSaveDataButton = document.querySelector("#resetSaveData");
const profilesPanel = document.querySelector("#profilesPanel");
const achievementsPanel = document.querySelector("#achievementsPanel");
const achievementsGrid = document.querySelector("#achievementsGrid");
const achievementCompletedCount = document.querySelector("#achievementCompletedCount");
const achievementSummaryFill = document.querySelector("#achievementSummaryFill");
const achievementDetailSheet = document.querySelector("#achievementDetailSheet");
const achievementDetailTrophy = document.querySelector("#achievementDetailTrophy");
const achievementDetailLock = document.querySelector("#achievementDetailLock");
const achievementDetailTier = document.querySelector("#achievementDetailTier");
const achievementDetailTitle = document.querySelector("#achievementDetailTitle");
const achievementDetailDescription = document.querySelector("#achievementDetailDescription");
const achievementDetailProgressText = document.querySelector("#achievementDetailProgressText");
const achievementDetailProgressFill = document.querySelector("#achievementDetailProgressFill");
const achievementDetailSecondary = document.querySelector("#achievementDetailSecondary");
const achievementDetailReward = document.querySelector("#achievementDetailReward");
const achievementDetailState = document.querySelector("#achievementDetailState");
const achievementUnlockToast = document.querySelector("#achievementUnlockToast");
const achievementUnlockTrophy = document.querySelector("#achievementUnlockTrophy");
const achievementUnlockTitle = document.querySelector("#achievementUnlockTitle");
const achievementUnlockReward = document.querySelector("#achievementUnlockReward");
const profilesGrid = document.querySelector("#profilesGrid");
const profilesCount = document.querySelector("#profilesCount");
const profileDetailSheet = document.querySelector("#profileDetailSheet");
const profileDetailAvatar = document.querySelector("#profileDetailAvatar");
const profileDetailName = document.querySelector("#profileDetailName");
const profileInfoHeight = document.querySelector("#profileInfoHeight");
const profileInfoFavorite = document.querySelector("#profileInfoFavorite");
const profileInfoLikes = document.querySelector("#profileInfoLikes");
const profileInfoDislikes = document.querySelector("#profileInfoDislikes");
const profileInfoDescription = document.querySelector("#profileInfoDescription");
const profileIconPickerButton = document.querySelector("#profileIconPickerButton");
const profileIconPickerSwatch = document.querySelector("#profileIconPickerSwatch");
const profileIconPickerText = document.querySelector("#profileIconPickerText");
const profileIconPicker = document.querySelector("#profileIconPicker");
const switchProfileCharacter = document.querySelector("#switchProfileCharacter");
const tasksPanel = document.querySelector("#tasksPanel");
const taskFormPanel = document.querySelector("#taskFormPanel");
const statusPanel = document.querySelector("#statusPanel");
const statusPeepPreview = document.querySelector("#statusPeepPreview");
const statusCharacterName = document.querySelector("#statusCharacterName");
const statusLevelBadge = document.querySelector("#statusLevelBadge");
const statusProgressLabel = document.querySelector("#statusProgressLabel");
const statusXpText = document.querySelector("#statusXpText");
const statusXpFill = document.querySelector("#statusXpFill");
const statusQuestLevelLabel = document.querySelector("#statusQuestLevelLabel");
const statusQuestXpText = document.querySelector("#statusQuestXpText");
const statusQuestXpFill = document.querySelector("#statusQuestXpFill");
const statusCoins = document.querySelector("#statusCoins");
const statusTasksCompleted = document.querySelector("#statusTasksCompleted");
const statusDucks = document.querySelector("#statusDucks");
const statusCoinsEarnedTotal = document.querySelector("#statusCoinsEarnedTotal");
const statusMeadowRank = document.querySelector("#statusMeadowRank");
const statusOceanRank = document.querySelector("#statusOceanRank");
const dailiesPanel = document.querySelector("#dailiesPanel");
const shoppingUsesBadge = document.querySelector("#shoppingUsesBadge");
const shoppingState = document.querySelector("#shoppingState");
const shoppingActionButton = document.querySelector("#shoppingActionButton");
const paintMixUsesBadge = document.querySelector("#paintMixUsesBadge");
const paintMixState = document.querySelector("#paintMixState");
const paintMixActionButton = document.querySelector("#paintMixActionButton");
const friendshipUsesBadge = document.querySelector("#friendshipUsesBadge");
const friendshipState = document.querySelector("#friendshipState");
const friendshipActionButton = document.querySelector("#friendshipActionButton");
const friendshipChooser = document.querySelector("#friendshipChooser");
const friendshipCharacterList = document.querySelector("#friendshipCharacterList");
const friendshipChooserBackdrop = document.querySelector("#friendshipChooserBackdrop");
const closeFriendshipChooserButton = document.querySelector("#closeFriendshipChooser");
const inventoryPanel = document.querySelector("#inventoryPanel");
const inventoryGrid = document.querySelector("#inventoryGrid");
const inventoryCategoryTitle = document.querySelector("#inventoryCategoryTitle");
const inventoryCategorySubtitle = document.querySelector("#inventoryCategorySubtitle");
const inventoryCategoryCount = document.querySelector("#inventoryCategoryCount");
const inventoryItemSheet = document.querySelector("#inventoryItemSheet");
const inventorySheetIcon = document.querySelector("#inventorySheetIcon");
const inventorySheetCategory = document.querySelector("#inventorySheetCategory");
const inventorySheetName = document.querySelector("#inventorySheetName");
const inventorySheetQuantity = document.querySelector("#inventorySheetQuantity");
const inventoryGiftPreference = document.querySelector("#inventoryGiftPreference");
const inventorySheetActions = document.querySelector("#inventorySheetActions");

const shopPanel = document.querySelector("#shopPanel");
const shopCoinCount = document.querySelector("#shopCoinCount");
const shopGrid = document.querySelector("#shopGrid");
const shopItemSheet = document.querySelector("#shopItemSheet");
const shopSheetIcon = document.querySelector("#shopSheetIcon");
const shopSheetCategory = document.querySelector("#shopSheetCategory");
const shopSheetName = document.querySelector("#shopSheetName");
const shopSheetUnitPrice = document.querySelector("#shopSheetUnitPrice");
const shopPriceLabel = document.querySelector("#shopPriceLabel");
const shopQuantityBlock = document.querySelector("#shopQuantityBlock");
const shopSheetOwned = document.querySelector("#shopSheetOwned");
const shopQtyMinus = document.querySelector("#shopQtyMinus");
const shopQtyValue = document.querySelector("#shopQtyValue");
const shopQtyPlus = document.querySelector("#shopQtyPlus");
const shopSheetTotal = document.querySelector("#shopSheetTotal");
const shopAffordMessage = document.querySelector("#shopAffordMessage");
const shopBuyButton = document.querySelector("#shopBuyButton");

const duckipediaPanel = document.querySelector("#duckipediaPanel");
const duckipediaProgressText = document.querySelector("#duckipediaProgressText");
const duckipediaPercent = document.querySelector("#duckipediaPercent");
const duckipediaProgressFill = document.querySelector("#duckipediaProgressFill");
const duckipediaGrid = document.querySelector("#duckipediaGrid");
const duckipediaBottomCount = document.querySelector("#duckipediaBottomCount");
const duckDetailSheet = document.querySelector("#duckDetailSheet");
const duckDetailArt = document.querySelector("#duckDetailArt");
const duckDetailState = document.querySelector("#duckDetailState");
const duckDetailName = document.querySelector("#duckDetailName");
const duckDetailHint = document.querySelector("#duckDetailHint");
const duckDetailActions = document.querySelector("#duckDetailActions");
const assignDuckToOc = document.querySelector("#assignDuckToOc");
const assignDuckToFloor = document.querySelector("#assignDuckToFloor");
const assignDuckToShelf = document.querySelector("#assignDuckToShelf");
const assignDuckToDresser = document.querySelector("#assignDuckToDresser");
const assignDuckToPetBed = document.querySelector("#assignDuckToPetBed");
const duckShelfPicker = document.querySelector("#duckShelfPicker");
const assignDuckToOcNote = document.querySelector("#assignDuckToOcNote");
const assignDuckToFloorNote = document.querySelector("#assignDuckToFloorNote");
const assignDuckToShelfNote = document.querySelector("#assignDuckToShelfNote");
const assignDuckToDresserNote = document.querySelector("#assignDuckToDresserNote");
const assignDuckToPetBedNote = document.querySelector("#assignDuckToPetBedNote");
const currentHeadDuckText = document.querySelector("#currentHeadDuckText");
const currentFloorDuckText = document.querySelector("#currentFloorDuckText");
const currentShelfDuckText = document.querySelector("#currentShelfDuckText");
const currentDresserDuckText = document.querySelector("#currentDresserDuckText");
const currentPetBedDuckText = document.querySelector("#currentPetBedDuckText");


const gamesPanel = document.querySelector("#gamesPanel");
const openBakeryGameButton = document.querySelector("#openBakeryGame");
const openDuckSortGameButton = document.querySelector("#openDuckSortGame");
const openCraneGameButton = document.querySelector("#openCraneGame");
const openMemoryGameButton = document.querySelector("#openMemoryGame");
const openDuckQuestGameButton = document.querySelector("#openDuckQuestGame");

const crafterPanel = document.querySelector("#crafterPanel");
const crafterContent = document.querySelector("#crafterContent");
const craftSheet = document.querySelector("#craftSheet");
const craftSheetArt = document.querySelector("#craftSheetArt");
const craftSheetEyebrow = document.querySelector("#craftSheetEyebrow");
const craftSheetName = document.querySelector("#craftSheetName");
const craftSheetNote = document.querySelector("#craftSheetNote");
const craftReadyBadge = document.querySelector("#craftReadyBadge");
const craftRequirements = document.querySelector("#craftRequirements");
const craftActionButton = document.querySelector("#craftActionButton");



const tasksContent = document.querySelector("#tasksContent");
const todayTab = document.querySelector("#todayTab");
const tomorrowTab = document.querySelector("#tomorrowTab");
const futureTab = document.querySelector("#futureTab");
const completedTab = document.querySelector("#completedTab");
const taskForm = document.querySelector("#taskForm");
const taskSource = document.querySelector("#taskSource");
const savedTaskPicker = document.querySelector("#savedTaskPicker");
const savedTaskSelect = document.querySelector("#savedTaskSelect");
const deleteSavedTaskButton = document.querySelector("#deleteSavedTaskButton");
const savedTaskEmptyNote = document.querySelector("#savedTaskEmptyNote");
const newTaskNameField = document.querySelector("#newTaskNameField");
const taskName = document.querySelector("#taskName");
const taskRepeat = document.querySelector("#taskRepeat");
let specificDateOptions = document.querySelector("#specificDateOptions");
let taskSpecificDate = document.querySelector("#taskSpecificDate");
const weekdayOptions = document.querySelector("#weekdayOptions");
const monthlyDayOptions = document.querySelector("#monthlyDayOptions");
const monthlyDay = document.querySelector("#monthlyDay");
const intervalOptions = document.querySelector("#intervalOptions");
const intervalDays = document.querySelector("#intervalDays");
const customReward = document.querySelector("#customReward");
const customRewardRadio = document.querySelector("#customRewardRadio");
const saveAsTemplate = document.querySelector("#saveAsTemplate");
const saveTemplateToggle = document.querySelector("#saveTemplateToggle");
const taskConfirmPanel = document.querySelector("#taskConfirmPanel");
const taskConfirmText = document.querySelector("#taskConfirmText");
const taskConfirmNo = document.querySelector("#taskConfirmNo");
const taskConfirmYes = document.querySelector("#taskConfirmYes");
let pendingTaskRemoval = null;
const closetCategoryButton = document.querySelector("#closetCategoryButton");
const closetCategoryLabel = document.querySelector("#closetCategoryLabel");
const closetCategoryMenu = document.querySelector("#closetCategoryMenu");
const closetOptions = document.querySelector("#closetOptions");
const toast = document.querySelector("#toast");

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(save));
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.remove("hidden");
  toastTimer = setTimeout(() => toast.classList.add("hidden"), 1800);
}

function isPaintableFurnitureItem(itemOrId) {
  const item = typeof itemOrId === "string" ? ITEMS[itemOrId] : itemOrId;
  return Boolean(item?.category === "furniture" && item.customizableFurniture && item.furnitureFamily);
}

function getPaintableFurnitureFamily(familyId) {
  return PAINTABLE_FURNITURE_FAMILIES[familyId] || null;
}

function furnitureColorOption(colorId) {
  return FURNITURE_COLOR_OPTIONS.find(color => color.id === colorId) || FURNITURE_COLOR_OPTIONS[0];
}

function furnitureFamilyItemId(familyId, colorId = "white") {
  const family = getPaintableFurnitureFamily(familyId);
  return family?.itemPrefix ? `${family.itemPrefix}${colorId}` : null;
}

function furnitureFamilyItemIds(familyId) {
  return FURNITURE_COLOR_OPTIONS
    .map(color => furnitureFamilyItemId(familyId, color.id))
    .filter(itemId => itemId && ITEMS[itemId]?.furnitureFamily === familyId);
}

function furnitureFamilyTotalOwned(familyId) {
  return furnitureFamilyItemIds(familyId).reduce((sum, itemId) => sum + inventoryQuantity(itemId), 0);
}

function furnitureFamilyOwnedColors(familyId) {
  return FURNITURE_COLOR_OPTIONS.filter(color => {
    const itemId = furnitureFamilyItemId(familyId, color.id);
    return itemId && inventoryQuantity(itemId) > 0;
  });
}

function furnitureFamilyRemainingCapacity(familyId) {
  const family = getPaintableFurnitureFamily(familyId);
  if (!family) return 0;
  return Math.max(0, Number(family.maxOwned || FURNITURE_COLOR_OPTIONS.length) - furnitureFamilyTotalOwned(familyId));
}

function furnitureVariantAlreadyOwned(itemId) {
  return isPaintableFurnitureItem(itemId) && inventoryQuantity(itemId) > 0;
}

function migrateLegacyPetBedsOnce() {
  if (save.paintablePetBedMigrationV2418) return false;
  if (!save.inventory || typeof save.inventory !== "object") save.inventory = {};

  let changed = false;
  const legacyMap = {
    "petbed-gray": "petbed-grey",
    "petbed-cream": "petbed-white"
  };

  for (const [legacyId, targetId] of Object.entries(legacyMap)) {
    const quantity = Math.max(0, Number(save.inventory[legacyId]) || 0);
    if (quantity > 0) {
      save.inventory[targetId] = inventoryQuantity(targetId) + quantity;
      delete save.inventory[legacyId];
      changed = true;
    }
  }

  if (save.roomFurniture && typeof save.roomFurniture === "object") {
    for (const roomFurniture of Object.values(save.roomFurniture)) {
      if (!roomFurniture || typeof roomFurniture !== "object") continue;
      if (legacyMap[roomFurniture.petBed]) {
        const targetId = legacyMap[roomFurniture.petBed];
        roomFurniture.petBed = targetId;
        if (inventoryQuantity(targetId) <= 0) save.inventory[targetId] = 1;
        changed = true;
      }
    }
  }

  save.paintablePetBedMigrationV2418 = true;
  return changed;
}

const HONK_OF_APPROVAL_REQUIREMENTS = Object.freeze({
  tasks: 50,
  bakeryWins: 10,
  ducks: 20,
  rooms: 3,
  furniture: 5
});

function ownedFurnitureCount() {
  const countedFamilies = new Set();
  let count = 0;

  for (const [itemId, item] of Object.entries(ITEMS)) {
    if (item?.category !== "furniture" || !isFurnitureOwned(itemId)) continue;
    if (isPaintableFurnitureItem(item)) {
      if (countedFamilies.has(item.furnitureFamily)) continue;
      countedFamilies.add(item.furnitureFamily);
    }
    count += 1;
  }

  return count;
}

function honkOfApprovalProgress() {
  const ducksWithoutGoose = save.unlockedDucks.filter(id => id !== "goose").length;
  const unlockedRoomCount = ROOMS.filter(room => isRoomUnlocked(room.id)).length;

  return {
    tasks: Math.max(0, Number(save.stats?.tasksCompleted) || 0),
    bakeryWins: Math.max(0, Number(save.stats?.bakeryWins) || 0),
    ducks: ducksWithoutGoose,
    rooms: unlockedRoomCount,
    furniture: ownedFurnitureCount()
  };
}

function honkOfApprovalComplete() {
  const progress = honkOfApprovalProgress();
  const req = HONK_OF_APPROVAL_REQUIREMENTS;

  return progress.tasks >= req.tasks
    && progress.bakeryWins >= req.bakeryWins
    && progress.ducks >= req.ducks
    && progress.rooms >= req.rooms
    && progress.furniture >= req.furniture;
}

function honkOfApprovalProgressText() {
  const p = honkOfApprovalProgress();
  const r = HONK_OF_APPROVAL_REQUIREMENTS;

  return `Honk of Approval — Tasks ${Math.min(p.tasks, r.tasks)}/${r.tasks} · Bakery ${Math.min(p.bakeryWins, r.bakeryWins)}/${r.bakeryWins} · Ducks ${Math.min(p.ducks, r.ducks)}/${r.ducks} · Rooms ${Math.min(p.rooms, r.rooms)}/${r.rooms} · Furniture ${Math.min(p.furniture, r.furniture)}/${r.furniture}.`;
}

function evaluateHonkOfApproval(options = {}) {
  if (isDuckUnlocked("goose")) return false;
  if (!honkOfApprovalComplete()) return false;

  const unlocked = unlockDuck("goose", {
    notify: false,
    persistNow: false,
    skipMilestoneCheck: true
  });

  if (!unlocked) return false;

  persist();

  if (options.notify !== false) {
    showToast("🪿 Honk of Approval! Goose unlocked!");
  }

  return true;
}


// -------------------- ROOM TO GROW --------------------

function normalizeRoomExpansion() {
  if (!save.roomExpansion || typeof save.roomExpansion !== "object") {
    save.roomExpansion = structuredClone(DEFAULT_SAVE.roomExpansion);
  }

  save.roomExpansion.unlocked = Boolean(save.roomExpansion.unlocked);

  const validShelfStyles = new Set(["cream", "brown", "dark-brown"]);
  if (!validShelfStyles.has(save.roomExpansion.shelfStyle)) {
    save.roomExpansion.shelfStyle = "cream";
  }

  const accent = save.roomExpansion.accentRoom;
  if (!ROOMS.some(room => room.id === accent && isRoomUnlocked(room.id))) {
    save.roomExpansion.accentRoom = save.room;
  }

  const incoming = Array.isArray(save.roomExpansion.duckSlots)
    ? save.roomExpansion.duckSlots
    : [];

  save.roomExpansion.duckSlots = Array.from({ length: 24 }, (_, index) => {
    const id = normalizeDuckId(incoming[index]);
    return id && isDuckUnlocked(id) ? id : null;
  });
}

function allCurrentRoomsUnlocked() {
  return ROOMS.every(room => isRoomUnlocked(room.id));
}

function evaluateRoomToGrow(options = {}) {
  normalizeRoomExpansion();

  if (save.roomExpansion.unlocked) {
    renderRoomWingToggle();
    return false;
  }

  if (!allCurrentRoomsUnlocked()) {
    renderRoomWingToggle();
    return false;
  }

  save.roomExpansion.unlocked = true;
  save.roomExpansion.accentRoom = save.room;
  persist();
  renderRoomWingToggle();

  if (options.notify !== false) {
    showToast("🏠 Room to Grow! A new part of Peep's room unlocked!");
  }

  return true;
}

function currentDisplayedRoomId() {
  if (currentRoomView === "wing" && save.roomExpansion?.unlocked) {
    return save.roomExpansion.accentRoom || save.room;
  }
  return save.room;
}

function renderRoomWingToggle() {
  const unlocked = Boolean(save.roomExpansion?.unlocked);
  roomWingButton.classList.toggle("hidden", !unlocked);

  if (!unlocked && currentRoomView === "wing") currentRoomView = "main";

  const inWing = currentRoomView === "wing" && unlocked;
  stage.classList.toggle("room-wing-view", inWing);
  duckDisplayWing.classList.toggle("hidden", !inWing);
  roomWingArrow.textContent = inWing ? "›" : "‹";
  roomWingButton.setAttribute(
    "aria-label",
    inWing ? "Return to Peep's main room" : "Visit Shelf of Ducks area"
  );
  roomPickerText.textContent = "Wallpaper";

  if (inWing) renderWingShelfStyle();
}

const WING_SHELF_FILES = Object.freeze({
  cream: "assets/room-expansion/shelves/shelf-cream.png",
  brown: "assets/room-expansion/shelves/shelf-brown.png",
  "dark-brown": "assets/room-expansion/shelves/shelf-dark-brown.png"
});

function renderWingShelfStyle() {
  normalizeRoomExpansion();

  const styleId = save.roomExpansion.shelfStyle || "cream";
  wingShelfImage.src = WING_SHELF_FILES[styleId] || WING_SHELF_FILES.cream;

  document.querySelectorAll("[data-wing-shelf-style]").forEach(button => {
    const active = button.dataset.wingShelfStyle === styleId;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function setWingShelfStyle(styleId) {
  if (!WING_SHELF_FILES[styleId]) return;

  save.roomExpansion.shelfStyle = styleId;
  persist();
  renderWingShelfStyle();
}

function closeWingDuckPicker() {
  selectedWingDuckSlot = null;
  wingDuckPicker.classList.add("hidden");
  wingDuckPicker.setAttribute("aria-hidden", "true");
}

function chooseWingDuck(duckId) {
  if (!Number.isInteger(selectedWingDuckSlot)) return;
  if (!isDuckUnlocked(duckId)) return;

  const slots = save.roomExpansion.duckSlots;

  // A duck can occupy one spot on this display shelf at a time.
  slots.forEach((id, index) => {
    if (id === duckId) slots[index] = null;
  });

  slots[selectedWingDuckSlot] = duckId;
  persist();
  closeWingDuckPicker();
  renderWingDuckShelf();
}

function clearSelectedWingDuckSlot() {
  if (!Number.isInteger(selectedWingDuckSlot)) return;
  save.roomExpansion.duckSlots[selectedWingDuckSlot] = null;
  persist();
  closeWingDuckPicker();
  renderWingDuckShelf();
}

function renderWingDuckPicker() {
  wingDuckPickerGrid.innerHTML = "";

  const unlocked = sortedDuckEntries()
    .filter(([id]) => isDuckUnlocked(id))
    .sort(([idA, duckA], [idB, duckB]) => {
      const aPlaced = save.roomExpansion.duckSlots.includes(idA);
      const bPlaced = save.roomExpansion.duckSlots.includes(idB);
      if (aPlaced !== bPlaced) return aPlaced ? 1 : -1;
      return duckA.name.localeCompare(duckB.name);
    });

  if (!unlocked.length) {
    const empty = document.createElement("p");
    empty.className = "wing-duck-empty";
    empty.textContent = "Discover a duck first, then come back to decorate this shelf! ♡";
    wingDuckPickerGrid.append(empty);
    return;
  }

  unlocked.forEach(([id, duck]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "wing-duck-choice";

    const placedSlot = save.roomExpansion.duckSlots.findIndex(slotDuckId => slotDuckId === id);
    const alreadyPlaced = placedSlot !== -1;
    button.setAttribute("aria-label", alreadyPlaced
      ? `Place ${duck.name}. Already on shelf slot ${placedSlot + 1}`
      : `Place ${duck.name}`);

    const img = document.createElement("img");
    img.src = duck.file;
    img.alt = "";
    img.loading = "lazy";

    const name = document.createElement("span");
    name.textContent = duck.name;

    button.append(img, name);

    if (alreadyPlaced) {
      const badge = document.createElement("small");
      badge.textContent = `✓ On shelf ${placedSlot + 1}`;
      button.append(badge);
    }

    button.addEventListener("click", () => chooseWingDuck(id));
    wingDuckPickerGrid.append(button);
  });
}

function openWingDuckPicker(slotIndex) {
  if (!save.roomExpansion?.unlocked) return;

  selectedWingDuckSlot = slotIndex;
  renderWingDuckPicker();

  const current = save.roomExpansion.duckSlots[slotIndex];
  clearWingDuckSlot.textContent = current
    ? "Remove Duck From This Spot"
    : "Leave This Spot Empty";
  clearWingDuckSlot.disabled = !current;

  wingDuckPicker.classList.remove("hidden");
  wingDuckPicker.setAttribute("aria-hidden", "false");
}

function renderWingDuckShelf() {
  wingDuckSlots.innerHTML = "";

  save.roomExpansion.duckSlots.forEach((duckId, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `wing-duck-slot${duckId ? " occupied" : ""}`;
    button.setAttribute(
      "aria-label",
      duckId && DUCKS[duckId]
        ? `Shelf spot ${index + 1}: ${DUCKS[duckId].name}`
        : `Shelf spot ${index + 1}: empty`
    );

    if (duckId && DUCKS[duckId]) {
      const img = document.createElement("img");
      img.src = DUCKS[duckId].file;
      img.alt = "";
      button.append(img);
    } else {
      const plus = document.createElement("span");
      plus.textContent = "+";
      button.append(plus);
    }

    button.addEventListener("click", () => openWingDuckPicker(index));
    wingDuckSlots.append(button);
  });
}

function switchRoomView() {
  if (!save.roomExpansion?.unlocked) return;
  if (!isHomeRoomInteractive() && currentRoomView === "main") return;

  hideTinyDuckSecret();
  closeWingDuckPicker();
  currentRoomView = currentRoomView === "main" ? "wing" : "main";
  closeRoomPicker();
  renderRoom();
  renderRoomPicker();
  renderRoomWingToggle();
  renderWingDuckShelf();
}

const ACHIEVEMENT_TROPHIES = Object.freeze({
  bronze: "assets/achievements/trophies/trophy-bronze.png",
  silver: "assets/achievements/trophies/trophy-silver.png",
  gold: "assets/achievements/trophies/trophy-gold.png",
  "rose-gold": "assets/achievements/trophies/trophy-rose-gold.png"
});

const ACHIEVEMENT_TIER_LABELS = Object.freeze({
  bronze: "Bronze",
  silver: "Silver",
  gold: "Gold",
  "rose-gold": "Rose-Gold"
});

const ACHIEVEMENTS = Object.freeze([
  { id:"tasks-5", title:"First Things First", category:"tasks", tier:"bronze", description:"Complete 5 Tasks.", metric:"tasks", target:5, reward:{type:"coins",amount:20,label:"20 Pink Coins"} },
  { id:"tasks-25", title:"On a Roll!", category:"tasks", tier:"silver", description:"Complete 25 Tasks.", metric:"tasks", target:25, reward:{type:"coins",amount:40,label:"40 Pink Coins"} },
  { id:"tasks-100", title:"Taskmaster", category:"tasks", tier:"gold", description:"Complete 100 Tasks.", metric:"tasks", target:100, reward:{type:"coins",amount:100,label:"100 Pink Coins"} },
  { id:"tasks-500", title:"Seriously Productive", category:"tasks", tier:"rose-gold", description:"Complete 500 Tasks. That is a LOT of checkmarks.", metric:"tasks", target:500, reward:{type:"coins",amount:250,label:"250 Pink Coins"} },

  { id:"ducks-10", title:"Duck, Duck...", category:"ducks", tier:"bronze", description:"Discover 10 Ducks.", metric:"ducks", target:10, reward:{type:"coins",amount:20,label:"20 Pink Coins"} },
  { id:"ducks-25", title:"Quite the Flock", category:"ducks", tier:"silver", description:"Discover 25 Ducks.", metric:"ducks", target:25, reward:{type:"coins",amount:40,label:"40 Pink Coins"} },
  { id:"ducks-50", title:"Duck Enthusiast", category:"ducks", tier:"gold", description:"Discover 50 Ducks.", metric:"ducks", target:50, reward:{type:"coins",amount:100,label:"100 Pink Coins"} },

  { id:"tiny-1", title:"Tiny Discovery", category:"special", tier:"bronze", description:"Find Tiny Duck for the first time.", metric:"tiny", target:1, reward:{type:"duck",duckId:"tiny-duck",label:"Tiny Duck"} },
  { id:"tiny-4", title:"Tiny Tower", category:"special", tier:"silver", description:"Find Tiny Duck 4 times.", metric:"tiny", target:4, reward:{type:"duck",duckId:"tiny-duck-stack",label:"Tiny Duck Stack"} },
  { id:"tiny-100", title:"Tiny Obsession", category:"special", tier:"gold", description:"Find Tiny Duck 100 times.", metric:"tiny", target:100, reward:{type:"duck",duckId:"pile-of-tiny-ducks",label:"Pile of Tiny Ducks"} },
  { id:"tiny-500", title:"Tiny Apocalypse", category:"special", tier:"rose-gold", description:"Find Tiny Duck 500 times. There may be no going back.", metric:"tiny", target:500, reward:{type:"coins",amount:500,label:"500 Pink Coins"} },

  { id:"bakery-25", title:"Freshly Baked", category:"bakery", tier:"bronze", description:"Win 25 Bakery rounds.", metric:"bakery", target:25, reward:{type:"coins",amount:25,label:"25 Pink Coins"} },
  { id:"bakery-75", title:"Regular Customer", category:"bakery", tier:"silver", description:"Win 75 Bakery rounds.", metric:"bakery", target:75, reward:{type:"coins",amount:50,label:"50 Pink Coins"} },
  { id:"bakery-150", title:"Master Baker", category:"bakery", tier:"gold", description:"Win 150 Bakery rounds.", metric:"bakery", target:150, reward:{type:"coins",amount:100,label:"100 Pink Coins"} },
  { id:"bakery-500", title:"Bakery Legend", category:"bakery", tier:"rose-gold", description:"Win 500 Bakery rounds.", metric:"bakery", target:500, reward:{type:"coins",amount:250,label:"250 Pink Coins"} },

  { id:"furniture-3", title:"Making It Homey", category:"collection", tier:"bronze", description:"Own 3 different Furniture pieces.", metric:"furniture", target:3, reward:{type:"coins",amount:20,label:"20 Pink Coins"} },
  { id:"furniture-5", title:"Interior Ducksigner", category:"collection", tier:"silver", description:"Own 5 different Furniture pieces.", metric:"furniture", target:5, reward:{type:"coins",amount:35,label:"35 Pink Coins"} },
  { id:"rooms-3", title:"A Splash of Color", category:"collection", tier:"bronze", description:"Unlock 3 Room colors.", metric:"rooms", target:3, reward:{type:"coins",amount:20,label:"20 Pink Coins"} },
  { id:"room-to-grow", title:"Room to Grow", category:"collection", tier:"gold", description:"Unlock every currently available Room color.", metric:"all-rooms", target:1, reward:{type:"room-expansion",label:"Shelf of Ducks + Wallpaper"} },
  { id:"honk-of-approval", title:"Honk of Approval", category:"special", tier:"gold", description:"Complete 50 Tasks, win 10 Bakery rounds, discover 20 Ducks, unlock 3 Rooms, and own 5 Furniture pieces.", metric:"honk", target:1, reward:{type:"duck",duckId:"goose",label:"Goose"} },
  { id:"little-bit-of-everything", title:"A Little Bit of Everything", category:"special", tier:"rose-gold", description:"Earn 5 Gold trophies spanning at least 4 different achievement categories.", metric:"gold-diversity", target:5, reward:{type:"coins",amount:300,label:"300 Pink Coins"} },

  { id:"quest-battles-25", title:"First Encounters", category:"games", tier:"bronze", description:"Defeat 25 enemies in Duck Quest.", metric:"quest-battles", target:25, reward:{type:"coins",amount:25,label:"25 Pink Coins"} },
  { id:"quest-battles-75", title:"Battle Collector", category:"games", tier:"silver", description:"Defeat 75 enemies in Duck Quest.", metric:"quest-battles", target:75, reward:{type:"coins",amount:50,label:"50 Pink Coins"} },
  { id:"quest-battles-151", title:"Gotta Catch 'Em All", category:"games", tier:"gold", description:"Defeat 151 enemies in Duck Quest.", metric:"quest-battles", target:151, reward:{type:"coins",amount:100,label:"100 Pink Coins"} },

  { id:"quest-level-25", title:"Leveling Up!", category:"games", tier:"bronze", description:"Reach Level 25 with any OC in Duck Quest.", metric:"quest-max-level", target:25, reward:{type:"coins",amount:25,label:"25 Pink Coins"} },
  { id:"quest-level-50", title:"Halfway There!", category:"games", tier:"silver", description:"Reach Level 50 with any OC in Duck Quest.", metric:"quest-max-level", target:50, reward:{type:"coins",amount:50,label:"50 Pink Coins"} },
  { id:"quest-level-100", title:"Level 100!", category:"games", tier:"gold", description:"Reach Level 100 with any OC in Duck Quest.", metric:"quest-max-level", target:100, reward:{type:"coins",amount:125,label:"125 Pink Coins"} },

  { id:"all-oc-level-25", title:"Growing Together", category:"games", tier:"bronze", description:"Reach Level 25 with every OC in Duck Quest.", metric:"all-oc-rpg-level", target:25, reward:{type:"coins",amount:35,label:"35 Pink Coins"} },
  { id:"all-oc-level-50", title:"Best Friends", category:"games", tier:"silver", description:"Reach Level 50 with every OC in Duck Quest.", metric:"all-oc-rpg-level", target:50, reward:{type:"coins",amount:75,label:"75 Pink Coins"} },
  { id:"all-oc-level-100", title:"Power of Friendship!", category:"games", tier:"gold", description:"Reach Level 100 with every OC in Duck Quest.", metric:"all-oc-rpg-level", target:100, reward:{type:"coins",amount:150,label:"150 Pink Coins"} },

  { id:"boss-10", title:"Boss Beginner", category:"games", tier:"bronze", description:"Defeat 10 Duck Quest bosses.", metric:"quest-bosses", target:10, reward:{type:"coins",amount:25,label:"25 Pink Coins"} },
  { id:"boss-50", title:"Boss Hunter", category:"games", tier:"silver", description:"Defeat 50 Duck Quest bosses.", metric:"quest-bosses", target:50, reward:{type:"coins",amount:50,label:"50 Pink Coins"} },
  { id:"boss-100", title:"Big Boss", category:"games", tier:"gold", description:"Defeat 100 Duck Quest bosses.", metric:"quest-bosses", target:100, reward:{type:"coins",amount:100,label:"100 Pink Coins"} },

  { id:"furniture-crafted-10", title:"Handmade Home", category:"collection", tier:"bronze", description:"Craft 10 different Furniture variants.", metric:"furniture-crafted-different", target:10, reward:{type:"coins",amount:25,label:"25 Pink Coins"} },
  { id:"furniture-crafted-25", title:"DIY Enthusiast", category:"collection", tier:"silver", description:"Craft 25 different Furniture variants.", metric:"furniture-crafted-different", target:25, reward:{type:"coins",amount:50,label:"50 Pink Coins"} },
  { id:"furniture-crafted-50", title:"DIY Master", category:"collection", tier:"gold", description:"Craft 50 different Furniture variants.", metric:"furniture-crafted-different", target:50, reward:{type:"coins",amount:100,label:"100 Pink Coins"} },

  { id:"crane-25", title:"Lucky Grab", category:"games", tier:"bronze", description:"Win 25 prizes in Duck Crane.", metric:"crane-prizes", target:25, reward:{type:"coins",amount:25,label:"25 Pink Coins"} },
  { id:"crane-50", title:"Claw Pro", category:"games", tier:"silver", description:"Win 50 prizes in Duck Crane.", metric:"crane-prizes", target:50, reward:{type:"coins",amount:50,label:"50 Pink Coins"} },
  { id:"crane-100", title:"Crane Game Master", category:"games", tier:"gold", description:"Win 100 prizes in Duck Crane.", metric:"crane-prizes", target:100, reward:{type:"coins",amount:100,label:"100 Pink Coins"} },

  { id:"memory-10-25", title:"Good Memory", category:"games", tier:"bronze", description:"Win 25 Memory Match games on the 10-pair board.", metric:"memory-wins-10", target:25, reward:{type:"coins",amount:25,label:"25 Pink Coins"} },
  { id:"memory-10-50", title:"Great Memory", category:"games", tier:"silver", description:"Win 50 Memory Match games on the 10-pair board.", metric:"memory-wins-10", target:50, reward:{type:"coins",amount:50,label:"50 Pink Coins"} },
  { id:"memory-10-100", title:"Long Term Memory", category:"games", tier:"gold", description:"Win 100 Memory Match games on the 10-pair board.", metric:"memory-wins-10", target:100, reward:{type:"coins",amount:100,label:"100 Pink Coins"} },

  { id:"memory-6-25", title:"Quick Recall", category:"games", tier:"bronze", description:"Win 25 Memory Match games on the 6-pair board.", metric:"memory-wins-6", target:25, reward:{type:"coins",amount:25,label:"25 Pink Coins"} },
  { id:"memory-6-50", title:"Fast Recall", category:"games", tier:"silver", description:"Win 50 Memory Match games on the 6-pair board.", metric:"memory-wins-6", target:50, reward:{type:"coins",amount:50,label:"50 Pink Coins"} },
  { id:"memory-6-100", title:"Short Term Memory", category:"games", tier:"gold", description:"Win 100 Memory Match games on the 6-pair board.", metric:"memory-wins-6", target:100, reward:{type:"coins",amount:100,label:"100 Pink Coins"} },

  { id:"memory-8-25", title:"Memory Lane", category:"games", tier:"bronze", description:"Win 25 Memory Match games on the 8-pair board.", metric:"memory-wins-8", target:25, reward:{type:"coins",amount:25,label:"25 Pink Coins"} },
  { id:"memory-8-50", title:"Duck Recall", category:"games", tier:"silver", description:"Win 50 Memory Match games on the 8-pair board.", metric:"memory-wins-8", target:50, reward:{type:"coins",amount:50,label:"50 Pink Coins"} },
  { id:"memory-8-100", title:"Memories of Ducks Past", category:"games", tier:"gold", description:"Win 100 Memory Match games on the 8-pair board.", metric:"memory-wins-8", target:100, reward:{type:"coins",amount:100,label:"100 Pink Coins"} },

  { id:"achievements-25pct", title:"Achievement Starter", category:"special", tier:"bronze", description:"Complete at least 25% of all achievements currently possible.", metric:"achievement-completion-rate", target:0.25, reward:{type:"coins",amount:50,label:"50 Pink Coins"} },
  { id:"achievements-60pct", title:"Trophy Collector", category:"special", tier:"silver", description:"Complete at least 60% of all achievements currently possible.", metric:"achievement-completion-rate", target:0.60, reward:{type:"coins",amount:100,label:"100 Pink Coins"} },
  { id:"achievements-all", title:"Over Achiever", category:"special", tier:"gold", description:"Complete every achievement currently possible.", metric:"achievement-completion-rate", target:1, reward:{type:"coins",amount:250,label:"250 Pink Coins"} }
]);

const ACHIEVEMENT_BY_ID = Object.freeze(Object.fromEntries(ACHIEVEMENTS.map(a => [a.id, a])));

function normalizeAchievementState() {
  if (!save.achievements || typeof save.achievements !== "object") save.achievements = structuredClone(DEFAULT_SAVE.achievements);
  save.achievements.completed = Array.isArray(save.achievements.completed) ? [...new Set(save.achievements.completed.filter(id => ACHIEVEMENT_BY_ID[id]))] : [];
  save.achievements.rewarded = Array.isArray(save.achievements.rewarded) ? [...new Set(save.achievements.rewarded.filter(id => ACHIEVEMENT_BY_ID[id]))] : [];
  if (!save.achievements.completedAt || typeof save.achievements.completedAt !== "object") save.achievements.completedAt = {};
}
function isAchievementCompleted(id){ normalizeAchievementState(); return save.achievements.completed.includes(id); }
function isAchievementRewarded(id){ normalizeAchievementState(); return save.achievements.rewarded.includes(id); }

function achievementMetricValue(metric){
  switch(metric){
    case "tasks": return Math.max(0, Number(save.stats?.tasksCompleted)||0);
    case "bakery": return Math.max(0, Number(save.stats?.bakeryWins)||0);
    case "ducks": return save.unlockedDucks.length;
    case "tiny": return Math.max(0, Number(save.tinyDuckSightings)||0);
    case "rooms": return ROOMS.filter(room => isRoomUnlocked(room.id)).length;
    case "furniture": return ownedFurnitureCount();
    case "quest-battles": return Math.max(0, Number(save.duckQuest?.totalBattlesWon) || 0);
    case "quest-max-level": {
      const levels = Object.values(save.duckQuest || {})
        .filter(value => value && typeof value === "object" && Number.isFinite(Number(value.level)))
        .map(value => Math.max(0, Number(value.level) || 0));
      return levels.length ? Math.max(...levels) : 0;
    }
    case "quest-bosses": return Math.max(0, Number(save.duckQuest?.bossWins ?? save.duckQuest?.completedRuns) || 0);
    case "furniture-crafted-different": return Array.isArray(save.stats?.furnitureCraftedIds) ? new Set(save.stats.furnitureCraftedIds).size : 0;
    case "crane-prizes": return Math.max(0, Number(save.stats?.cranePrizes) || 0);
    case "memory-wins-6": return Math.max(0, Number(save.stats?.memoryWins6) || 0);
    case "memory-wins-8": return Math.max(0, Number(save.stats?.memoryWins8) || 0);
    case "memory-wins-10": return Math.max(0, Number(save.stats?.memoryWins10) || 0);
    default: return 0;
  }
}

function completedGoldAchievementInfo(){
  const list = ACHIEVEMENTS.filter(a => a.tier === "gold" && isAchievementCompleted(a.id));
  return { count:list.length, categories:new Set(list.map(a=>a.category)).size };
}

function maxCurrentlyCraftableFurnitureVariants(){
  return Object.values(ITEMS).filter(item =>
    item?.customizableFurniture && item.furnitureColor !== "white"
  ).length;
}

function normalizeDuckQuestCharacterProgress(characterId = save.selectedCharacter) {
  const id = CHARACTERS[characterId] ? characterId : "peep";
  if (!save.duckQuest || typeof save.duckQuest !== "object") save.duckQuest = {};
  const quest = save.duckQuest;

  const existing = quest[id] && typeof quest[id] === "object" ? quest[id] : {};
  const legacyAreas = id === "peep" && quest.areas && typeof quest.areas === "object" ? quest.areas : {};
  const legacyMeadowUnlocked = id === "peep"
    ? Math.max(1, Math.min(20, Number(legacyAreas.meadow?.unlockedRank ?? quest.unlockedRank) || 1))
    : 1;
  const legacyMeadowLast = id === "peep"
    ? Math.max(1, Math.min(legacyMeadowUnlocked, Number(legacyAreas.meadow?.lastRank ?? quest.lastRank) || 1))
    : 1;
  const legacyOceanUnlocked = id === "peep"
    ? Math.max(1, Math.min(50, Number(legacyAreas.ocean?.unlockedRank) || 1))
    : 1;
  const legacyOceanLast = id === "peep"
    ? Math.max(1, Math.min(legacyOceanUnlocked, Number(legacyAreas.ocean?.lastRank) || 1))
    : 1;

  const meadowUnlocked = Math.max(1, Math.min(20, Number(existing.areas?.meadow?.unlockedRank) || legacyMeadowUnlocked));
  const oceanUnlocked = Math.max(1, Math.min(50, Number(existing.areas?.ocean?.unlockedRank) || legacyOceanUnlocked));

  const inheritedIcon = id === "peep" ? quest.iconBackground : null;
  const iconId = PROFILE_ICON_BACKGROUNDS.some(background => background.id === existing.iconBackground)
    ? existing.iconBackground
    : PROFILE_ICON_BACKGROUNDS.some(background => background.id === inheritedIcon)
      ? inheritedIcon
      : "white";

  quest[id] = {
    ...existing,
    level: Math.max(1, Math.min(100, Number(existing.level) || 1)),
    exp: Math.max(0, Number(existing.exp) || 0),
    iconBackground: iconId,
    lastArea: ["meadow", "ocean"].includes(existing.lastArea)
      ? existing.lastArea
      : id === "peep" && ["meadow", "ocean"].includes(quest.lastArea)
        ? quest.lastArea
        : "meadow",
    areas: {
      meadow: {
        unlockedRank: meadowUnlocked,
        lastRank: Math.max(1, Math.min(meadowUnlocked, Number(existing.areas?.meadow?.lastRank) || legacyMeadowLast))
      },
      ocean: {
        unlockedRank: oceanUnlocked,
        lastRank: Math.max(1, Math.min(oceanUnlocked, Number(existing.areas?.ocean?.lastRank) || legacyOceanLast))
      }
    }
  };

  if (!Array.isArray(quest.iconBackgroundsUnlocked)) quest.iconBackgroundsUnlocked = ["white"];
  quest.iconBackgroundsUnlocked = [...new Set(["white", ...quest.iconBackgroundsUnlocked])]
    .filter(bgId => PROFILE_ICON_BACKGROUNDS.some(background => background.id === bgId));

  // Keep the older Peep mirrors intact for old backups/older code.
  if (id === "peep") {
    quest.areas = structuredClone(quest.peep.areas);
    quest.lastArea = quest.peep.lastArea;
    quest.unlockedRank = quest.peep.areas.meadow.unlockedRank;
    quest.lastRank = quest.peep.areas.meadow.lastRank;
    quest.iconBackground = quest.peep.iconBackground;
  }

  return quest[id];
}

function rpgLevelForCharacter(characterId){
  if (!save.unlockedCharacters?.includes(characterId) && characterId !== "peep") return 0;
  return normalizeDuckQuestCharacterProgress(characterId).level;
}

function allRpgCharactersHaveLevelData(){
  const ids = Object.keys(CHARACTERS).filter(characterId =>
    characterId === "peep" || save.unlockedCharacters?.includes(characterId)
  );
  return ids.every(characterId => Number.isFinite(Number(normalizeDuckQuestCharacterProgress(characterId).level)));
}

function isAchievementCurrentlyPossible(a){
  if(!a || a.metric === "achievement-completion-rate") return false;

  if(a.metric === "furniture-crafted-different"){
    return Number(a.target) <= maxCurrentlyCraftableFurnitureVariants();
  }

  if(a.metric === "all-oc-rpg-level"){
    return allRpgCharactersHaveLevelData();
  }

  return true;
}

function possibleAchievementInfo(){
  const possible = ACHIEVEMENTS.filter(isAchievementCurrentlyPossible);
  const completed = possible.filter(a => isAchievementCompleted(a.id));
  return { possible, completed };
}

function achievementProgressInfo(a){
  if(!a) return {current:0,target:1,percent:0,complete:false,text:"0 / 1",secondary:""};
  if(a.metric === "all-rooms"){
    const owned = ROOMS.filter(room=>isRoomUnlocked(room.id)).length;
    const complete = Boolean(save.roomExpansion?.unlocked || allCurrentRoomsUnlocked());
    return {current:complete?1:0,target:1,percent:complete?100:Math.min(99,(owned/ROOMS.length)*100),complete,text:`${owned} / ${ROOMS.length} Rooms`,secondary:"Unlock every available room color."};
  }
  if(a.metric === "honk"){
    const p=honkOfApprovalProgress(), r=HONK_OF_APPROVAL_REQUIREMENTS;
    const checks=[p.tasks>=r.tasks,p.bakeryWins>=r.bakeryWins,p.ducks>=r.ducks,p.rooms>=r.rooms,p.furniture>=r.furniture];
    const current=checks.filter(Boolean).length;
    return {current,target:5,percent:(current/5)*100,complete:honkOfApprovalComplete()||isDuckUnlocked("goose"),text:`${current} / 5 goals`,secondary:`Tasks ${Math.min(p.tasks,r.tasks)}/${r.tasks} · Bakery ${Math.min(p.bakeryWins,r.bakeryWins)}/${r.bakeryWins} · Ducks ${Math.min(p.ducks,r.ducks)}/${r.ducks} · Rooms ${Math.min(p.rooms,r.rooms)}/${r.rooms} · Furniture ${Math.min(p.furniture,r.furniture)}/${r.furniture}`};
  }
  if(a.metric === "gold-diversity"){
    const info=completedGoldAchievementInfo();
    return {current:info.count,target:5,percent:Math.min(Math.min(1,info.count/5),Math.min(1,info.categories/4))*100,complete:info.count>=5&&info.categories>=4,text:`${Math.min(info.count,5)} / 5 Gold trophies`,secondary:`${Math.min(info.categories,4)} / 4 different categories`};
  }
  if(a.metric === "all-oc-rpg-level"){
    const target = Math.max(1, Number(a.target) || 1);
    const ids = Object.keys(CHARACTERS);
    const levels = ids.map(id => ({ id, name:CHARACTERS[id].name, level:rpgLevelForCharacter(id) }));
    const reached = levels.filter(entry => entry.level >= target).length;
    const complete = levels.length > 0 && reached === levels.length;
    const minLevel = levels.length ? Math.min(...levels.map(entry => entry.level)) : 0;
    return {
      current:reached,
      target:levels.length,
      percent:levels.length ? (reached/levels.length)*100 : 0,
      complete,
      text:`${reached} / ${levels.length} OCs at Lv. ${target}`,
      secondary:levels.map(entry => `${entry.name} Lv. ${entry.level}`).join(" · ")
    };
  }

  if(a.metric === "achievement-completion-rate"){
    const info = possibleAchievementInfo();
    const possibleCount = info.possible.length;
    const completedCount = info.completed.length;
    const fraction = Math.max(0, Math.min(1, Number(a.target) || 0));
    const needed = fraction >= 1
      ? possibleCount
      : Math.max(1, Math.ceil(possibleCount * fraction));
    const complete = possibleCount > 0 && completedCount >= needed;
    return {
      current:completedCount,
      target:needed,
      percent:needed > 0 ? Math.min(100,(completedCount/needed)*100) : 0,
      complete,
      text:`${Math.min(completedCount,needed)} / ${needed}`,
      secondary:`${completedCount} / ${possibleCount} achievements currently possible`
    };
  }

  const current=achievementMetricValue(a.metric), target=Math.max(1,Number(a.target)||1);
  return {current,target,percent:Math.min(100,(current/target)*100),complete:current>=target,text:`${Math.min(current,target).toLocaleString()} / ${target.toLocaleString()}`,secondary:""};
}

function recordCoinsEarned(amount) {
  const earned = Math.max(0, Number(amount) || 0);
  if (!earned) return;
  if (!save.stats || typeof save.stats !== "object") save.stats = structuredClone(DEFAULT_SAVE.stats);
  save.stats.coinsEarnedTotal = Math.max(0, Number(save.stats.coinsEarnedTotal) || 0) + earned;
}

function applyAchievementReward(a){
  if(!a || isAchievementRewarded(a.id)) return false;
  const reward=a.reward||{type:"none",label:"Trophy"};
  if(reward.type === "coins") {
    const earned = Math.max(0,Number(reward.amount)||0);
    save.coins += earned;
    recordCoinsEarned(earned);
  }
  else if(reward.type === "duck" && reward.duckId) unlockDuck(reward.duckId,{notify:false,persistNow:false,skipMilestoneCheck:true,skipAchievementCheck:true});
  else if(reward.type === "room-expansion") evaluateRoomToGrow({notify:false});
  save.achievements.rewarded.push(a.id);
  return true;
}

function showNextAchievementUnlock(){
  clearTimeout(achievementUnlockTimer);
  const a=achievementUnlockQueue.shift();
  if(!a){ achievementUnlockToast.classList.add("hidden"); return; }
  achievementUnlockTrophy.src=ACHIEVEMENT_TROPHIES[a.tier];
  achievementUnlockTrophy.alt="";
  achievementUnlockTitle.textContent=a.title;
  achievementUnlockReward.textContent=`Reward: ${a.reward?.label||"Trophy"}`;
  achievementUnlockToast.classList.remove("hidden");
  requestAnimationFrame(()=>achievementUnlockToast.classList.add("show"));
  achievementUnlockTimer=setTimeout(()=>{
    achievementUnlockToast.classList.remove("show");
    setTimeout(()=>{ achievementUnlockToast.classList.add("hidden"); showNextAchievementUnlock(); },260);
  },2600);
}
function queueAchievementUnlocks(list){
  const fresh=list.filter(Boolean); if(!fresh.length)return;
  achievementUnlockQueue.push(...fresh);
  if(achievementUnlockToast.classList.contains("hidden")) showNextAchievementUnlock();
}

function evaluateAchievements(options={}){
  if(achievementEvaluationInProgress) return [];
  achievementEvaluationInProgress=true;
  normalizeAchievementState();
  const unlockedNow=[];
  try{
    let changed=true;
    while(changed){
      changed=false;
      for(const a of ACHIEVEMENTS){
        if(isAchievementCompleted(a.id)) continue;
        if(!achievementProgressInfo(a).complete) continue;
        save.achievements.completed.push(a.id);
        save.achievements.completedAt[a.id]=new Date().toISOString();
        applyAchievementReward(a);
        unlockedNow.push(a);
        changed=true;
      }
    }
    if(unlockedNow.length){
      persist();
      coinCount.textContent=save.coins.toLocaleString();
      if(!achievementsPanel.classList.contains("hidden")) renderAchievements();
    }
  } finally { achievementEvaluationInProgress=false; }
  if(options.notify !== false && unlockedNow.length) queueAchievementUnlocks(unlockedNow);
  return unlockedNow;
}

function achievementEntriesForTab(){ return currentAchievementTab === "all" ? ACHIEVEMENTS : ACHIEVEMENTS.filter(a=>a.category===currentAchievementTab); }
function closeAchievementDetail(){ selectedAchievementId=null; achievementDetailSheet.classList.add("hidden"); achievementDetailSheet.setAttribute("aria-hidden","true"); }
function openAchievementDetail(id){
  const a=ACHIEVEMENT_BY_ID[id]; if(!a)return;
  selectedAchievementId=id;
  const completed=isAchievementCompleted(id), p=achievementProgressInfo(a);
  achievementDetailTrophy.src=ACHIEVEMENT_TROPHIES[a.tier]; achievementDetailTrophy.alt=""; achievementDetailTrophy.classList.toggle("locked",!completed);
  achievementDetailLock.classList.toggle("hidden",completed);
  achievementDetailTier.textContent=ACHIEVEMENT_TIER_LABELS[a.tier]; achievementDetailTier.dataset.tier=a.tier;
  achievementDetailTitle.textContent=a.title; achievementDetailDescription.textContent=a.description;
  achievementDetailProgressText.textContent=p.text; achievementDetailProgressFill.style.width=`${p.percent}%`;
  achievementDetailSecondary.textContent=p.secondary; achievementDetailSecondary.classList.toggle("hidden",!p.secondary);
  achievementDetailReward.textContent=a.reward?.label||"Trophy";
  achievementDetailState.textContent=completed?"✓ Completed! Trophy earned.":"Keep going! ♡"; achievementDetailState.classList.toggle("completed",completed);
  achievementDetailSheet.classList.remove("hidden"); achievementDetailSheet.setAttribute("aria-hidden","false");
}
function renderAchievements(){
  normalizeAchievementState();
  const done=ACHIEVEMENTS.filter(a=>isAchievementCompleted(a.id)).length;
  achievementCompletedCount.textContent=`${done} / ${ACHIEVEMENTS.length}`; achievementSummaryFill.style.width=`${(done/ACHIEVEMENTS.length)*100}%`;
  document.querySelectorAll("[data-achievement-tab]").forEach(b=>{const active=b.dataset.achievementTab===currentAchievementTab;b.classList.toggle("active",active);b.setAttribute("aria-selected",String(active));});
  achievementsGrid.innerHTML="";
  for(const a of achievementEntriesForTab()){
    const completed=isAchievementCompleted(a.id), p=achievementProgressInfo(a);
    const button=document.createElement("button"); button.type="button"; button.className=`achievement-card${completed?" completed":" locked"}`;
    const wrap=document.createElement("div"); wrap.className="achievement-card-trophy-wrap";
    const trophy=document.createElement("img"); trophy.className="achievement-card-trophy"; trophy.src=ACHIEVEMENT_TROPHIES[a.tier]; trophy.alt=""; trophy.loading="lazy"; if(!completed)trophy.classList.add("locked");
    const lock=document.createElement("span"); lock.className=`achievement-card-lock${completed?" hidden":""}`; lock.textContent="🔒"; lock.setAttribute("aria-hidden","true"); wrap.append(trophy,lock);
    const copy=document.createElement("div"); copy.className="achievement-card-copy";
    const tier=document.createElement("span"); tier.className="achievement-card-tier"; tier.dataset.tier=a.tier; tier.textContent=ACHIEVEMENT_TIER_LABELS[a.tier];
    const title=document.createElement("strong"); title.textContent=a.title;
    const pt=document.createElement("small"); pt.textContent=completed?"Completed ✓":p.text;
    const bar=document.createElement("div"); bar.className="achievement-card-progress"; const fill=document.createElement("span"); fill.style.width=`${p.percent}%`; bar.append(fill);
    copy.append(tier,title,pt,bar); button.append(wrap,copy); button.addEventListener("click",()=>openAchievementDetail(a.id)); achievementsGrid.append(button);
  }
}
function openAchievements(){
  evaluateAchievements({notify:false});
  closeCloset(); closeCraftSheet(); crafterPanel.classList.add("hidden"); closeDuckDetail(); duckipediaPanel.classList.add("hidden"); closeInventoryItem(); inventoryPanel.classList.add("hidden"); closeShopItem(); shopPanel.classList.add("hidden"); clearDailyTimer(); dailiesPanel.classList.add("hidden"); statusPanel.classList.add("hidden"); profilesPanel.classList.add("hidden"); tasksPanel.classList.add("hidden"); taskFormPanel.classList.add("hidden"); bookPanel.classList.add("hidden");
  currentAchievementTab="all"; closeAchievementDetail(); achievementsPanel.classList.remove("hidden"); renderAchievements();
}
function closeAchievementsToBook(){ closeAchievementDetail(); achievementsPanel.classList.add("hidden"); bookPanel.classList.remove("hidden"); }
function closeAchievementsAll(){ closeAchievementDetail(); achievementsPanel.classList.add("hidden"); bookPanel.classList.add("hidden"); }

function renderRoom() {
  normalizeRoomExpansion();

  const roomId = currentDisplayedRoomId();
  const room = ROOMS.find(r => r.id === roomId) || ROOMS[0];

  roomImage.src = room.file;
  roomImage.alt = currentRoomView === "wing"
    ? `${room.name} wallpaper`
    : `${room.name} wallpaper`;

  roomPickerSwatch.style.setProperty("--swatch", room.swatch);
  roomPickerButton.setAttribute(
    "aria-label",
    currentRoomView === "wing"
      ? `Change wallpaper. Current wallpaper: ${room.name}`
      : `Change wallpaper. Current wallpaper: ${room.name}`
  );

  coinCount.textContent = save.coins;
  renderRoomFurniture();
  renderDuckPlacements();
  renderRoomWingToggle();

  if (currentRoomView === "wing") renderWingDuckShelf();
}

function getEquippedAssetIds() {
  const outfit = getCharacterOutfit("peep");
  const ids = ["base"];

  ids.push(outfit.hair, "bangs");

  // A one-piece dress replaces the regular top + skirt while equipped.
  // The saved top/skirt remain remembered and return when the dress is removed.
  if (outfit.dress) ids.push(outfit.dress);
  else ids.push(outfit.top, outfit.bottom);

  // Full-leg stockings replace Peep's separate left/right socks while equipped.
  if (outfit.legwear) ids.push(outfit.legwear);
  else {
    if (outfit.leftSock) ids.push(outfit.leftSock);
    if (outfit.rightSock) ids.push(outfit.rightSock);
  }
  if (outfit.shoes) ids.push(outfit.shoes);
  if (outfit.ears) ids.push(outfit.ears);
  if (outfit.tail) ids.push(outfit.tail);
  ids.push(...(Array.isArray(outfit.extras) ? outfit.extras : []));

  ids.push(currentExpression);
  return ids.filter(Boolean);
}

function getMikoEquippedAssetIds() {
  const outfit = getCharacterOutfit("miko");
  const ids = ["hair-main", "base"];

  // Shirt and outer layer are independent. This allows Button Shirt only,
  // Hoodie/Sweater only, or either outer layer over the Button Shirt.
  if (outfit.outer === "top-hoodie") ids.push("hoodie-back");
  if (outfit.bottom) ids.push(outfit.bottom);
  if (outfit.shirt === "top-button") ids.push("top-button");
  else if (outfit.shirt === "shirt-blouse") ids.push("shirt-blouse");

  // Jeans use the belt automatically. Its z-order keeps it above pants and
  // the optional Button Shirt, but below Hoodie/Sweater outer layers.
  if (outfit.bottom === "bottom-jeans") ids.push("belt");

  if (outfit.outer) ids.push(outfit.outer);

  // The raised arm stays independent. Each equipped clothing layer adds
  // only the sleeve that belongs to it, preserving the correct stack.
  ids.push("arm-base");
  if (outfit.shirt === "top-button") ids.push("top-button-sleeve");
  if (outfit.outer === "top-hoodie") ids.push("top-hoodie-sleeve");
  else if (outfit.outer === "top-sweater") ids.push("top-sweater-sleeve");
  else if (outfit.outer === "outer-black-blazer") ids.push("outer-black-blazer-arm");

  // Socks sit below any equipped shoes. Big Shirt is an outer layer and its
  // z-order keeps it over Boxers while still respecting the rest of Miko's stack.
  if (outfit.socks) ids.push(outfit.socks);
  if (outfit.shoes) ids.push(outfit.shoes);
  ids.push(...(Array.isArray(outfit.extras) ? outfit.extras : []));
  ids.push(currentExpression, outfit.bangsStyle || "bangs");

  return ids.filter(Boolean);
}

function getCurrentCharacter() {
  return CHARACTERS[save.selectedCharacter] || CHARACTERS.peep;
}

function getCharacterAssetIds(characterId = save.selectedCharacter) {
  const character = CHARACTERS[characterId] || CHARACTERS.peep;
  if (character.id === "miko") return getMikoEquippedAssetIds();
  return getEquippedAssetIds();
}

function getCurrentCharacterAssetIds() {
  return getCharacterAssetIds(save.selectedCharacter);
}

function getRenderOrderedAssets(characterId = save.selectedCharacter) {
  const character = CHARACTERS[characterId] || CHARACTERS.peep;
  const assetMap = getCharacterAssetMap(character.id);
  const equipped = getCharacterAssetIds(character.id)
    .map(id => ({ id, ...(assetMap[id] || {}) }))
    .filter(asset => asset.file);

  if (character.id === "peep") {
    const peepOrder = [
      "tail-cow", "tail-bunny",
      "large-back-bow", "bow-white",
      "hair-short", "hair-low-pigtails", "hair-ponytail", "hair-long-pigtails", "hair-jellyfish",
      "base",
      "sock-left-blue", "sock-right-blue", "sock-left-rainbow", "sock-right-rainbow", "legwear-white-lace",
      "leg-bandage",
      "bottom-fluffy", "bottom-pleated", "dress-white",
      "top-shirt", "top-sweater",
      "jacket", "cardigan-white",
      "shoes-loafer", "shoes-sneaker", "shoes-white-mary-jane",
      "collar",
      "expression-neutral", "expression-happy", "expression-sad", "expression-shocked", "expression-mad",
      "cow-ears", "cat-ears", "horns",
      "bangs",
      "cheek-bandage",
      "left-bow", "right-bow", "hair-side-ribbon",
      "beret"
    ];
    const orderMap = new Map(peepOrder.map((id, index) => [id, index]));

    return equipped.sort((a, b) => {
      const aOrder = orderMap.has(a.id) ? orderMap.get(a.id) : 1000 + (Number(a.z) || 0);
      const bOrder = orderMap.has(b.id) ? orderMap.get(b.id) : 1000 + (Number(b.z) || 0);
      if (aOrder !== bOrder) return aOrder - bOrder;
      return (Number(a.z) || 0) - (Number(b.z) || 0);
    });
  }

  return equipped.sort((a, b) => (Number(a.z) || 0) - (Number(b.z) || 0));
}

function renderCharacterInto(container, characterId = save.selectedCharacter) {
  container.innerHTML = "";

  const character = CHARACTERS[characterId] || CHARACTERS.peep;
  const equipped = getRenderOrderedAssets(character.id);

  for (const [index, asset] of equipped.entries()) {
    const img = document.createElement("img");
    img.src = `${character.assetFolder}${asset.file}`;
    img.alt = "";
    img.style.setProperty("--z", asset.z);
    img.style.zIndex = String(index + 1);
    img.dataset.asset = asset.id;
    if (asset.id.startsWith("expression-")) img.dataset.expressionLayer = "true";
    container.append(img);
  }
}

function renderCurrentCharacterInto(container) {
  renderCharacterInto(container, save.selectedCharacter);
}

function renderPeep() {
  renderCurrentCharacterInto(peepLayers);
  peepLayers.querySelectorAll("img").forEach(img => img.classList.add("peep-layer"));
  renderDuckPlacements();
  scheduleNonCriticalWarmup(() => warmCharacterAssets(save.selectedCharacter), 50);
}

const peepImageCache = new Map();

function warmImage(src) {
  if (!src || peepImageCache.has(src)) return;
  const img = new Image();
  img.decoding = "async";
  img.src = src;
  peepImageCache.set(src, img);
  if (typeof img.decode === "function") img.decode().catch(() => {});
}

function scheduleNonCriticalWarmup(callback, delay = 0) {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(() => window.setTimeout(callback, delay), { timeout: 1200 });
  } else {
    window.setTimeout(callback, 250 + delay);
  }
}

function warmCharacterAssets(characterId) {
  const character = CHARACTERS[characterId];
  if (!character) return;
  const assetMap = getCharacterAssetMap(characterId);
  const state = save.characterStates?.[characterId];
  const filenames = new Set();

  if (state?.equipped) {
    for (const assetId of Object.values(state.equipped)) {
      const asset = assetMap[assetId];
      if (asset?.file) filenames.add(`${character.assetFolder}${asset.file}`);
    }
  }

  // Keep expressions feeling snappy without warming every single clothing item.
  for (const [assetId, asset] of Object.entries(assetMap)) {
    if (assetId.startsWith("expression-") && asset?.file) {
      filenames.add(`${character.assetFolder}${asset.file}`);
    }
  }

  filenames.forEach(warmImage);
}

function warmStartupAssets() {
  [
    "./assets/ui/book-room.png",
    "./assets/ui/book-icon.png",
    "./assets/ui/mirror.png",
    "./assets/ui/pink-coin.png"
  ].forEach(warmImage);

  const roomStyle = ROOM_OPTIONS.find(option => option.id === save.roomStyle);
  if (roomStyle?.file) warmImage(`./assets/rooms/${roomStyle.file}`);

  warmCharacterAssets(save.selectedCharacter);
}

function updateExpressionLayer(assetId) {
  const character = getCurrentCharacter();
  const asset = getCharacterAssetMap(character.id)[assetId];
  if (!asset?.file) return;

  let layer = peepLayers.querySelector('[data-expression-layer="true"]');
  if (!layer) {
    renderPeep();
    layer = peepLayers.querySelector('[data-expression-layer="true"]');
  }
  if (!layer) return;

  const src = `${character.assetFolder}${asset.file}`;
  layer.dataset.asset = assetId;
  layer.src = src;
  layer.style.setProperty("--z", asset.z);

  const statusLayer = statusPeepPreview?.querySelector('[data-expression-layer="true"]');
  if (statusLayer) {
    statusLayer.dataset.asset = assetId;
    statusLayer.src = src;
    statusLayer.style.setProperty("--z", asset.z);
  }
}

function setExpression(assetId, duration = 0, onDone = null) {
  clearTimeout(reactionTimer);
  currentExpression = assetId;
  updateExpressionLayer(assetId);

  if (duration > 0) {
    reactionTimer = setTimeout(() => {
      currentExpression = "expression-neutral";
      updateExpressionLayer("expression-neutral");
      if (onDone) onDone();
    }, duration);
  }
}

function pokePeep() {
  if (pokeLocked) return;

  const now = Date.now();
  pokeTimes = pokeTimes.filter(time => now - time <= 3000);
  pokeTimes.push(now);
  save.peepPokes = (save.peepPokes || 0) + 1;
  persist();

  // Same quick-poke rhythm as the prior hub: normal poke = happy for 1.5 s;
  // 5 quick accepted pokes = mad for 3 s and extra pokes are ignored until done.
  if (pokeTimes.length >= 5) {
    pokeTimes = [];
    pokeLocked = true;
    setExpression("expression-mad", 3000, () => { pokeLocked = false; });
    return;
  }

  setExpression("expression-happy", 1500);
}

function renderRoomPicker() {
  roomPicker.innerHTML = "";
  for (const room of ROOMS) {
    const unlocked = save.unlockedRooms.includes(room.id) || room.unlocked;
    const button = document.createElement("button");
    button.type = "button";
    button.className = `room-choice${unlocked ? "" : " locked"}`;
    button.setAttribute("aria-current", String(currentDisplayedRoomId() === room.id));
    button.setAttribute("aria-label", `${room.name}${unlocked ? "" : ", locked"}`);
    button.title = room.name;

    const swatch = document.createElement("span");
    swatch.className = "room-swatch";
    swatch.style.setProperty("--swatch", room.swatch);
    button.append(swatch);

    if (!unlocked) {
      const lock = document.createElement("span");
      lock.className = "lock-badge";
      lock.textContent = "🔒";
      lock.setAttribute("aria-hidden", "true");
      button.append(lock);
    }

    button.addEventListener("click", () => {
      if (!unlocked) {
        showToast("Locked — unlock this room from the Shop for 350 Pink Coins!");
        return;
      }
      if (currentRoomView === "wing" && save.roomExpansion?.unlocked) {
        save.roomExpansion.accentRoom = room.id;
      } else {
        save.room = room.id;
      }
      persist();
      renderRoom();
      renderRoomPicker();
      closeRoomPicker();
    });
    roomPicker.append(button);
  }
}

function closeRoomPicker() {
  roomPicker.classList.add("hidden");
  roomPickerButton.setAttribute("aria-expanded", "false");
}

function renderClosetCategoryMenu() {
  const closetGroups = getCharacterCloset(save.selectedCharacter);
  if (!closetGroups.some(group => group.id === currentClosetTab)) currentClosetTab = closetGroups[0]?.id || "hair";

  closetCategoryMenu.innerHTML = "";
  for (const group of closetGroups) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = group.label;
    if (group.id === currentClosetTab) button.classList.add("active");
    button.addEventListener("click", () => {
      currentClosetTab = group.id;
      openSockStyleId = null;
      removeSockPopover();
      closetCategoryMenu.classList.add("hidden");
      closetCategoryButton.setAttribute("aria-expanded", "false");
      renderCloset();
    });
    closetCategoryMenu.append(button);
  }
}

function renderCloset() {
  const closetGroups = getCharacterCloset(save.selectedCharacter);
  if (!closetGroups.some(g => g.id === currentClosetTab)) currentClosetTab = closetGroups[0]?.id || "hair";
  const group = closetGroups.find(g => g.id === currentClosetTab) || closetGroups[0];
  closetCategoryLabel.textContent = group.label;
  renderClosetCategoryMenu();
  renderClosetOptions();
}

function makeThumb(assetId, { boxW = 92, boxH = 82, targetW = 60, targetH = 54, characterId = save.selectedCharacter } = {}) {
  const asset = getCharacterAssetMap(characterId)[assetId];
  const thumb = document.createElement("span");
  thumb.className = "closet-thumb";
  thumb.style.width = `${boxW}px`;
  thumb.style.height = `${boxH}px`;

  if (!asset?.file) return thumb;
  const img = document.createElement("img");
  const thumbFile = asset.previewFile || asset.file;
  img.src = `${CHARACTERS[characterId].assetFolder}${thumbFile}`;
  img.alt = "";

  const bbox = getCharacterThumbBounds(characterId)[thumbFile] || getCharacterThumbBounds(characterId)[asset.file];
  if (bbox) {
    const [x0, y0, x1, y1] = bbox;
    const bw = Math.max(1, x1 - x0);
    const bh = Math.max(1, y1 - y0);
    const scale = Math.min(targetW / bw, targetH / bh);
    const cx = (x0 + x1) / 2;
    const cy = (y0 + y1) / 2;
    img.style.width = `${1080 * scale}px`;
    img.style.height = `${1920 * scale}px`;
    img.style.left = `${boxW / 2 - cx * scale}px`;
    img.style.top = `${boxH / 2 - cy * scale}px`;
  } else {
    img.style.inset = "8px";
    img.style.width = "calc(100% - 16px)";
    img.style.height = "calc(100% - 16px)";
    img.style.objectFit = "contain";
  }

  thumb.append(img);
  return thumb;
}

function makeCombinedThumb(assetIds, { boxW = 104, boxH = 88, targetW = 76, targetH = 66, characterId = save.selectedCharacter } = {}) {
  const thumb = document.createElement("span");
  thumb.className = "closet-thumb sock-pair-thumb";
  thumb.style.width = `${boxW}px`;
  thumb.style.height = `${boxH}px`;

  const assetMap = getCharacterAssetMap(characterId);
  const boundsMap = getCharacterThumbBounds(characterId);

  const entries = assetIds
    .map(id => ({ id, asset: assetMap[id] }))
    .filter(entry => Boolean(entry.asset))
    .map(entry => {
      const thumbFile = entry.asset.previewFile || entry.asset.file;
      return {
        ...entry,
        thumbFile,
        bbox: boundsMap[thumbFile] || boundsMap[entry.asset.file]
      };
    })
    .filter(entry => entry.bbox);

  if (!entries.length) return thumb;

  const x0 = Math.min(...entries.map(e => e.bbox[0]));
  const y0 = Math.min(...entries.map(e => e.bbox[1]));
  const x1 = Math.max(...entries.map(e => e.bbox[2]));
  const y1 = Math.max(...entries.map(e => e.bbox[3]));
  const bw = Math.max(1, x1 - x0);
  const bh = Math.max(1, y1 - y0);
  const scale = Math.min(targetW / bw, targetH / bh);
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;

  for (const { asset, thumbFile } of entries) {
    const img = document.createElement("img");
    img.src = `${CHARACTERS[characterId].assetFolder}${thumbFile}`;
    img.alt = "";
    img.style.width = `${1080 * scale}px`;
    img.style.height = `${1920 * scale}px`;
    img.style.left = `${boxW / 2 - cx * scale}px`;
    img.style.top = `${boxH / 2 - cy * scale}px`;
    thumb.append(img);
  }

  return thumb;
}

function addSectionLabel(text) {
  const label = document.createElement("p");
  label.className = "closet-section-label";
  label.textContent = text;
  closetOptions.append(label);
}

function makeOptionCard({ assetId = null, label, selected = false, locked = false, required = false, none = false, onClick = null }) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "closet-option-card";
  if (selected) button.classList.add("equipped");
  if (locked) button.classList.add("locked");
  if (required) button.classList.add("required");

  if (none) {
    const icon = document.createElement("span");
    icon.className = "closet-none-icon";
    icon.textContent = "×";
    button.append(icon);
  } else if (assetId) {
    button.append(makeThumb(assetId));
  }

  const name = document.createElement("span");
  name.className = "closet-option-name";
  name.textContent = label;
  button.append(name);

  if (required) {
    const note = document.createElement("span");
    note.className = "closet-option-note";
    note.textContent = "Always on for now";
    button.append(note);
  }

  if (locked) {
    const lock = document.createElement("span");
    lock.className = "closet-lock";
    lock.textContent = "🔒";
    lock.setAttribute("aria-hidden", "true");
    button.append(lock);
  }

  if (!required && onClick) button.addEventListener("click", onClick);
  return button;
}

function chooseSingle(group, id) {
  const outfit = getCurrentOutfit();
  outfit[group.id] = id;

  if (save.selectedCharacter === "peep") {
    // Dresses replace Peep's regular top + skirt visually. Picking a regular
    // top or skirt switches back out of the one-piece dress automatically.
    if ((group.id === "top" || group.id === "bottom") && id) outfit.dress = null;

    // Full-leg stockings and the older separate sock system are mutually
    // exclusive so two different leg layers never accidentally overlap.
    if (group.id === "legwear" && id) {
      outfit.leftSock = null;
      outfit.rightSock = null;
    }
  }

  persist();
  renderPeep();
  renderClosetOptions();
}

function renderHairOptions(group) {
  if (save.selectedCharacter === "miko") {
    closetOptions.append(makeOptionCard({
      assetId: "hair-main",
      label: "Hair",
      selected: true,
      required: true
    }));
    return;
  }

  closetOptions.append(makeOptionCard({
    assetId: "bangs",
    label: "Bangs",
    selected: true,
    required: true
  }));

  const outfit = getCurrentOutfit();

  for (const id of group.options) {
    const asset = getCharacterAssetMap(save.selectedCharacter)[id];
    const unlocked = isClosetAssetUnlocked(id);
    closetOptions.append(makeOptionCard({
      assetId: id,
      label: asset.label,
      selected: outfit.hair === id,
      locked: !unlocked,
      onClick: () => {
        if (!unlocked) {
          showToast(`${asset.label} is locked — unlock it from Shop → Hair for 150 Pink Coins!`);
          return;
        }

        // Use the exact same single-selection path as working clothing options.
        // This keeps characterOutfits + the legacy outfit mirror synchronized.
        chooseSingle(group, id);
      }
    }));
  }
}

const SOCK_STYLES = [
  { id: "rainbow", label: "Rainbow", left: "sock-left-rainbow", right: "sock-right-rainbow" },
  { id: "blue", label: "White + Blue", left: "sock-left-blue", right: "sock-right-blue" }
];

const WARDROBE_SHOP_META = {
  "socks-blue": {
    characterId: "peep",
    label: "White + Blue Socks",
    assetIds: ["sock-left-blue", "sock-right-blue"],
    unlockIds: ["sock-left-blue", "sock-right-blue"]
  },
  "miko-top-sweater": {
    characterId: "miko",
    label: "Miko · Sweater",
    assetIds: ["top-sweater"],
    unlockIds: ["top-sweater"]
  },
  "miko-bottom-jeans": {
    characterId: "miko",
    label: "Miko · Jeans",
    assetIds: ["bottom-jeans"],
    unlockIds: ["bottom-jeans"]
  },
  "miko-headband": {
    characterId: "miko",
    label: "Miko · Headband",
    assetIds: ["headband"],
    unlockIds: ["headband"]
  },
  "miko-bangs-pinned": {
    characterId: "miko",
    label: "Miko · Pinned Bangs",
    assetIds: ["bangs-pinned"],
    unlockIds: ["bangs-pinned"],
    shopPreviewScale: 1.25
  },
  "miko-top-big-shirt": {
    characterId: "miko",
    label: "Miko · Big Shirt",
    assetIds: ["top-big-shirt"],
    unlockIds: ["top-big-shirt"],
    shopPreviewScale: 1.35
  },
  "miko-bottom-boxers": {
    characterId: "miko",
    label: "Miko · Boxers",
    assetIds: ["bottom-boxers"],
    unlockIds: ["bottom-boxers"],
    shopPreviewScale: 1.4
  },
  "miko-socks": {
    characterId: "miko",
    label: "Miko · Socks",
    assetIds: ["socks"],
    unlockIds: ["socks"],
    shopPreviewScale: 1.1
  },
  "peep-dress-white": {
    characterId: "peep",
    label: "Peep · White Dress",
    assetIds: ["dress-white"],
    unlockIds: ["dress-white"]
  },
  "peep-legwear-white-lace": {
    characterId: "peep",
    label: "Peep · White Lace Stockings",
    assetIds: ["legwear-white-lace"],
    unlockIds: ["legwear-white-lace"]
  },
  "peep-cardigan-white": {
    characterId: "peep",
    label: "Peep · White Cardigan",
    assetIds: ["cardigan-white"],
    unlockIds: ["cardigan-white"]
  },
  "peep-shoes-white-mary-jane": {
    characterId: "peep",
    label: "Peep · White Mary Janes",
    assetIds: ["shoes-white-mary-jane"],
    unlockIds: ["shoes-white-mary-jane"]
  },
  "peep-bow-white": {
    characterId: "peep",
    label: "Peep · White Bow",
    assetIds: ["bow-white"],
    unlockIds: ["bow-white"]
  },
  "miko-shirt-blouse": {
    characterId: "miko",
    label: "Miko · Blouse",
    assetIds: ["shirt-blouse"],
    unlockIds: ["shirt-blouse"]
  },
  "miko-bottom-shorts": {
    characterId: "miko",
    label: "Miko · Shorts",
    assetIds: ["bottom-shorts"],
    unlockIds: ["bottom-shorts"]
  },
  "miko-socks-garter": {
    characterId: "miko",
    label: "Miko · White Garter Socks",
    assetIds: ["socks-garter"],
    unlockIds: ["socks-garter"]
  },
  "miko-outer-black-blazer": {
    characterId: "miko",
    label: "Miko · Black Blazer",
    assetIds: ["outer-black-blazer"],
    unlockIds: ["outer-black-blazer", "outer-black-blazer-arm"]
  },
  "miko-shoes-fancy-loafers": {
    characterId: "miko",
    label: "Miko · Fancy Loafers",
    assetIds: ["shoes-fancy-loafers"],
    unlockIds: ["shoes-fancy-loafers"]
  },
  "miko-hairpins-black": {
    characterId: "miko",
    label: "Miko · Black Hairpins",
    assetIds: ["hairpins-black"],
    unlockIds: ["hairpins-black"]
  }
};

function getWardrobeShopMeta(wardrobeId) {
  const explicit = WARDROBE_SHOP_META[wardrobeId];
  if (explicit) return explicit;

  const asset = ASSETS[wardrobeId];
  if (!asset) return null;

  return {
    characterId: "peep",
    label: asset.label,
    assetIds: [wardrobeId],
    unlockIds: [wardrobeId]
  };
}

function isClosetAssetUnlocked(assetId, characterId = save.selectedCharacter) {
  return getCharacterUnlockedItems(characterId).includes(assetId);
}

function isWardrobeShopUnlocked(wardrobeId) {
  const meta = getWardrobeShopMeta(wardrobeId);
  return Boolean(meta) && meta.unlockIds.every(id => isClosetAssetUnlocked(id, meta.characterId || "peep"));
}

function unlockWardrobeShopItem(wardrobeId) {
  const meta = getWardrobeShopMeta(wardrobeId);
  if (!meta) return false;

  const targetCharacterId = meta.characterId || "peep";
  const next = new Set(getCharacterUnlockedItems(targetCharacterId));
  meta.unlockIds.forEach(id => next.add(id));
  save.characterUnlockedItems[targetCharacterId] = [...next];
  if (targetCharacterId === "peep") save.unlockedItems = [...save.characterUnlockedItems.peep];
  return true;
}

const PEEP_STARTER_WARDROBE = Object.freeze([
  "hair-short",
  "cat-ears",
  "left-bow",
  "right-bow",
  "top-sweater",
  "bottom-pleated",
  "sock-left-rainbow",
  "sock-right-rainbow",
  "shoes-loafer",
  "collar",
  "cheek-bandage",
  "tail-bunny"
]);

function migrateMikoNewOutfitToShopOnce() {
  if (save.mikoNewOutfitShopMigrationV2413) return false;

  // V24.12 briefly treated these new Miko pieces as free starter items.
  // Remove that accidental ownership so they correctly become Shop unlocks.
  const paidIds = new Set(["bangs-pinned", "top-big-shirt", "bottom-boxers", "socks"]);
  const currentUnlocks = Array.isArray(save.characterUnlockedItems?.miko)
    ? save.characterUnlockedItems.miko
    : [];
  save.characterUnlockedItems.miko = currentUnlocks.filter(id => !paidIds.has(id));

  const outfit = normalizeMikoOutfit(save.characterOutfits?.miko || {});
  if (outfit.bangsStyle === "bangs-pinned") outfit.bangsStyle = "bangs";
  if (outfit.outer === "top-big-shirt") outfit.outer = "top-hoodie";
  if (outfit.bottom === "bottom-boxers") outfit.bottom = "bottom-capris";
  if (outfit.socks === "socks") outfit.socks = null;
  save.characterOutfits.miko = outfit;

  save.mikoNewOutfitShopMigrationV2413 = true;
  return true;
}

function ensureStarterWardrobeUnlocked() {
  normalizeCharacterState();
  const peep = new Set(getCharacterUnlockedItems("peep"));
  PEEP_STARTER_WARDROBE.forEach(id => peep.add(id));
  save.characterUnlockedItems.peep = [...peep];

  const miko = new Set(getCharacterUnlockedItems("miko"));
  getCharacterStarterWardrobe("miko").forEach(id => miko.add(id));
  save.characterUnlockedItems.miko = [...miko];
  save.unlockedItems = [...save.characterUnlockedItems.peep];
}

function resetAccidentalWardrobeUnlocksOnce() {
  if (save.wardrobeResetV1262) return false;

  // HARD RESET: older builds accidentally unlocked whatever Peep happened
  // to be wearing. This version intentionally resets wardrobe ownership to
  // ONLY the true starter/free set.
  save.characterUnlockedItems.peep = [...PEEP_STARTER_WARDROBE];
  save.unlockedItems = [...save.characterUnlockedItems.peep];

  // Reset Peep's equipped look to the exact free/default outfit as well,
  // so the Closet and visible character cannot disagree.
  save.characterOutfits.peep = structuredClone(DEFAULT_OUTFIT);
  save.outfit = structuredClone(DEFAULT_OUTFIT);

  save.wardrobeResetV1261 = true;
  save.wardrobeResetV1262 = true;
  return true;
}

function makeSockPlacementButton(text, selected, onClick, ariaLabel) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `sock-placement-button${selected ? " selected" : ""}`;
  button.textContent = text;
  button.setAttribute("aria-label", ariaLabel);
  button.addEventListener("click", onClick);
  return button;
}

function removeSockPopover() {
  closetPanel.querySelector(".sock-popover")?.remove();
}

function applySockPlacement(style, placement) {
  if (placement !== "clear" && save.selectedCharacter === "peep") {
    getCurrentOutfit().legwear = null;
  }

  if (placement === "clear") {
    const outfit = getCurrentOutfit();
    if (outfit.leftSock === style.left) outfit.leftSock = null;
    if (outfit.rightSock === style.right) outfit.rightSock = null;
  } else if (placement === "left") {
    const outfit = getCurrentOutfit();
    outfit.leftSock = style.left;
    if (outfit.rightSock === style.right) outfit.rightSock = null;
  } else if (placement === "right") {
    const outfit = getCurrentOutfit();
    outfit.rightSock = style.right;
    if (outfit.leftSock === style.left) outfit.leftSock = null;
  } else if (placement === "both") {
    const outfit = getCurrentOutfit();
    outfit.leftSock = style.left;
    outfit.rightSock = style.right;
  }

  persist();
  renderPeep();
  renderClosetOptions();
}

function showSockPopover(style, card) {
  removeSockPopover();

  const popover = document.createElement("div");
  popover.className = "sock-popover";
  popover.setAttribute("role", "dialog");
  popover.setAttribute("aria-label", `${style.label} sock placement`);

  const topRow = document.createElement("div");
  topRow.className = "sock-popover-top";

  const title = document.createElement("span");
  title.textContent = "Placement";
  topRow.append(title);

  const close = document.createElement("button");
  close.type = "button";
  close.className = "sock-popover-close";
  close.textContent = "×";
  close.setAttribute("aria-label", "Close sock placement");
  close.addEventListener("click", event => {
    event.stopPropagation();
    openSockStyleId = null;
    removeSockPopover();
    renderClosetOptions();
  });
  topRow.append(close);
  popover.append(topRow);

  const buttons = document.createElement("div");
  buttons.className = "sock-popover-buttons";

  const outfit = getCurrentOutfit();
  const bothSelected = outfit.leftSock === style.left && outfit.rightSock === style.right;
  const leftSelected = outfit.leftSock === style.left && !bothSelected;
  const rightSelected = outfit.rightSock === style.right && !bothSelected;

  buttons.append(makeSockPlacementButton("L", leftSelected, event => {
    event.stopPropagation();
    applySockPlacement(style, "left");
  }, `${style.label} sock on left leg`));

  buttons.append(makeSockPlacementButton("R", rightSelected, event => {
    event.stopPropagation();
    applySockPlacement(style, "right");
  }, `${style.label} sock on right leg`));

  buttons.append(makeSockPlacementButton("LR", bothSelected, event => {
    event.stopPropagation();
    applySockPlacement(style, "both");
  }, `${style.label} socks on both legs`));

  popover.append(buttons);

  const styleIsUsed = outfit.leftSock === style.left || outfit.rightSock === style.right;
  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "sock-popover-remove";
  remove.textContent = "Remove";
  remove.disabled = !styleIsUsed;
  remove.addEventListener("click", event => {
    event.stopPropagation();
    applySockPlacement(style, "clear");
  });
  popover.append(remove);

  closetPanel.append(popover);

  const panelRect = closetPanel.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const popHeight = popover.offsetHeight || 128;
  const desiredTop = cardRect.top - panelRect.top + (cardRect.height / 2) - (popHeight / 2);
  const top = Math.max(58, Math.min(closetPanel.clientHeight - popHeight - 14, desiredTop));
  popover.style.top = `${top}px`;
}

function renderSockStyle(style) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "sock-style-card";

  const unlocked = isClosetAssetUnlocked(style.left) && isClosetAssetUnlocked(style.right);
  const outfit = getCurrentOutfit();
  const isUsed = outfit.leftSock === style.left || outfit.rightSock === style.right;
  if (isUsed) card.classList.add("equipped");
  if (!unlocked) card.classList.add("locked");
  if (openSockStyleId === style.id) card.classList.add("open");
  card.setAttribute("aria-expanded", String(openSockStyleId === style.id));
  card.setAttribute("aria-label", `${style.label} socks. Choose placement.`);

  card.append(makeCombinedThumb([style.left, style.right], {
    boxW: 94,
    boxH: 82,
    targetW: 58,
    targetH: 62
  }));

  const name = document.createElement("span");
  name.className = "sock-style-name";
  name.textContent = style.label;
  card.append(name);

  if (!unlocked) {
    const lock = document.createElement("span");
    lock.className = "closet-lock";
    lock.textContent = "🔒";
    lock.setAttribute("aria-hidden", "true");
    card.append(lock);
  }

  const placement = document.createElement("span");
  placement.className = "sock-style-current";
  const leftMatch = outfit.leftSock === style.left;
  const rightMatch = outfit.rightSock === style.right;
  placement.textContent = leftMatch && rightMatch ? "Both" : leftMatch ? "Left" : rightMatch ? "Right" : "Tap to place";
  card.append(placement);

  card.addEventListener("click", () => {
    if (!unlocked) {
      showToast(`${style.label} socks are locked — unlock them from Shop → Clothing. ♡`);
      return;
    }
    openSockStyleId = openSockStyleId === style.id ? null : style.id;
    renderClosetOptions();
  });

  closetOptions.append(card);

  if (openSockStyleId === style.id) {
    requestAnimationFrame(() => showSockPopover(style, card));
  }
}

function renderSockOptions() {
  const helper = document.createElement("p");
  helper.className = "sock-helper";
  helper.textContent = "Tap a sock style, then choose left, right, or both.";
  closetOptions.append(helper);

  for (const style of SOCK_STYLES) {
    try {
      renderSockStyle(style);
    } catch (error) {
      console.error("Could not render sock style", style?.id, error);

      // Failsafe: keep the sock option visible even if its fancy preview ever fails.
      const card = document.createElement("button");
      card.type = "button";
      card.className = "sock-style-card";
      const unlocked = isClosetAssetUnlocked(style.left) && isClosetAssetUnlocked(style.right);
      if (!unlocked) card.classList.add("locked");

      const name = document.createElement("span");
      name.className = "sock-style-name";
      name.textContent = style.label;
      card.append(name);

      const placement = document.createElement("span");
      placement.className = "sock-style-current";
      placement.textContent = unlocked ? "Tap to place" : "Locked";
      card.append(placement);

      card.addEventListener("click", () => {
        if (!unlocked) {
          showToast(`${style.label} socks are locked — unlock them from Shop → Clothing. ♡`);
          return;
        }
        openSockStyleId = style.id;
        renderClosetOptions();
      });
      closetOptions.append(card);
    }
  }
}

function renderClosetOptions() {
  const closetGroups = getCharacterCloset(save.selectedCharacter);
  if (!closetGroups.some(g => g.id === currentClosetTab)) currentClosetTab = closetGroups[0]?.id || "hair";
  const group = closetGroups.find(g => g.id === currentClosetTab) || closetGroups[0];
  removeSockPopover();
  closetOptions.innerHTML = "";

  if (group.type === "hair") {
    renderHairOptions(group);
    return;
  }

  if (group.type === "socks") {
    renderSockOptions();
    return;
  }

  if (group.allowNone) {
    closetOptions.append(makeOptionCard({
      label: "None",
      none: true,
      selected: getCurrentOutfit()[group.id] == null,
      onClick: () => chooseSingle(group, null)
    }));
  }

  for (const id of group.options) {
    const asset = getCharacterAssetMap(save.selectedCharacter)[id];
    if (!asset) continue;

    const unlocked = isClosetAssetUnlocked(id);

    if (group.type === "multi") {
      const outfit = getCurrentOutfit();
      const selected = Array.isArray(outfit.extras) ? outfit.extras : [];
      closetOptions.append(makeOptionCard({
        assetId: id,
        label: asset.label,
        selected: selected.includes(id),
        locked: !unlocked,
        onClick: () => {
          if (!unlocked) {
            showToast(`${asset.label} is locked — unlock it from the Shop. ♡`);
            return;
          }
          const outfit = getCurrentOutfit();
          const next = new Set(Array.isArray(outfit.extras) ? outfit.extras : []);
          next.has(id) ? next.delete(id) : next.add(id);
          outfit.extras = [...next];
          persist();
          renderPeep();
          renderClosetOptions();
        }
      }));
    } else {
      closetOptions.append(makeOptionCard({
        assetId: id,
        label: asset.label,
        selected: getCurrentOutfit()[group.id] === id,
        locked: !unlocked,
        onClick: () => {
          if (!unlocked) {
            showToast(`${asset.label} is locked — unlock it from the Shop. ♡`);
            return;
          }
          chooseSingle(group, id);
        }
      }));
    }
  }
}



// -------------------- INVENTORY --------------------


function renderItemArtwork(container, item) {
  container.innerHTML = "";

  if (item?.image) {
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = "";
    img.loading = "lazy";
    img.decoding = "async";

    if (Array.isArray(item.thumbBounds) && item.thumbBounds.length === 4) {
      container.classList.add("cropped-art-container");
      img.classList.add("cropped-item-art");

      const fitCrop = () => {
        const [x0, y0, x1, y1] = item.thumbBounds.map(Number);
        const bw = Math.max(1, x1 - x0);
        const bh = Math.max(1, y1 - y0);
        const cw = Math.max(36, container.clientWidth || 90);
        const ch = Math.max(36, container.clientHeight || 90);
        const pad = Math.max(5, Math.min(cw, ch) * 0.08);
        const scale = Math.min((cw - pad * 2) / bw, (ch - pad * 2) / bh);
        const cx = (x0 + x1) / 2;
        const cy = (y0 + y1) / 2;

        img.style.width = `${1080 * scale}px`;
        img.style.height = `${1920 * scale}px`;
        img.style.left = `${cw / 2 - cx * scale}px`;
        img.style.top = `${ch / 2 - cy * scale}px`;
      };

      img.addEventListener("load", () => requestAnimationFrame(fitCrop), { once: true });
      requestAnimationFrame(fitCrop);
    } else {
      container.classList.remove("cropped-art-container");
    }

    img.addEventListener("error", () => {
      container.innerHTML = "";
      container.classList.remove("cropped-art-container");
      container.textContent = item.icon || "✦";
    }, { once: true });
    container.append(img);
    return;
  }

  container.classList.remove("cropped-art-container");
  container.textContent = item?.icon || "✦";
}



function getGiftPreference(itemId, character = getCurrentCharacter()) {
  if (!ITEMS[itemId] || !ITEMS[itemId].giftable) return null;
  return character.giftPreferences?.[itemId] || "okay";
}

function showGiftBurst(symbol = "♡") {
  const burst = document.createElement("div");
  burst.className = "gift-burst";
  burst.textContent = symbol;
  peepWrap.append(burst);
  setTimeout(() => burst.remove(), 1200);
}

function inventoryItemsForCategory(category) {
  const itemIds = Object.keys(save.inventory || {})
    .filter(itemId => ITEMS[itemId]?.category === category && inventoryQuantity(itemId) > 0);

  if (category !== "furniture") {
    return itemIds.sort((a, b) => ITEMS[a].name.localeCompare(ITEMS[b].name));
  }

  const grouped = [];
  const seenFamilies = new Set();

  for (const itemId of itemIds) {
    const item = ITEMS[itemId];
    if (isPaintableFurnitureItem(item)) {
      const familyId = item.furnitureFamily;
      if (seenFamilies.has(familyId)) continue;
      seenFamilies.add(familyId);
      const baseItemId = getPaintableFurnitureFamily(familyId)?.baseItemId;
      if (baseItemId && furnitureFamilyTotalOwned(familyId) > 0) grouped.push(baseItemId);
      continue;
    }
    grouped.push(itemId);
  }

  return grouped.sort((a, b) => ITEMS[a].name.localeCompare(ITEMS[b].name));
}

function renderInventory() {
  const category = INVENTORY_CATEGORIES[currentInventoryTab] || INVENTORY_CATEGORIES.crafting;
  const itemIds = inventoryItemsForCategory(currentInventoryTab);
  const quantity = totalInventoryItems(currentInventoryTab);

  document.querySelectorAll("[data-inventory-tab]").forEach(button => {
    const active = button.dataset.inventoryTab === currentInventoryTab;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });

  inventoryCategoryTitle.textContent = category.label;
  inventoryCategorySubtitle.textContent = category.subtitle;
  inventoryCategoryCount.textContent = `${quantity} item${quantity === 1 ? "" : "s"}`;
  inventoryGrid.innerHTML = "";

  if (!itemIds.length) {
    const empty = document.createElement("div");
    empty.className = "inventory-empty";
    const icon = document.createElement("div");
    icon.className = "inventory-empty-icon";
    icon.textContent = currentInventoryTab === "paint" ? "🎨" : currentInventoryTab === "food" ? "🍓" : currentInventoryTab === "furniture" ? "🪑" : "✦";
    const strong = document.createElement("strong");
    strong.textContent = `No ${category.label.toLowerCase()} yet`;
    const p = document.createElement("p");
    p.textContent = category.empty;
    empty.append(icon, strong, p);
    inventoryGrid.append(empty);
    return;
  }

  itemIds.forEach(itemId => {
    const item = ITEMS[itemId];
    const button = document.createElement("button");
    button.type = "button";
    button.className = "inventory-item-card";
    button.dataset.itemId = itemId;

    const icon = document.createElement("span");
    icon.className = "inventory-item-icon";
    renderItemArtwork(icon, item);

    const name = document.createElement("strong");
    name.textContent = item.name;

    const qty = document.createElement("span");
    qty.className = "inventory-item-quantity";
    qty.textContent = isPaintableFurnitureItem(item)
      ? `×${furnitureFamilyTotalOwned(item.furnitureFamily)}`
      : `×${inventoryQuantity(itemId)}`;

    button.append(icon, name, qty);
    button.addEventListener("click", () => openInventoryItem(itemId));
    inventoryGrid.append(button);
  });
}

function getSelectedPaintableFurnitureItemId(familyId) {
  const ownedColors = furnitureFamilyOwnedColors(familyId);
  if (!ownedColors.length) return null;

  if (selectedFurnitureColorId) {
    const selectedId = furnitureFamilyItemId(familyId, selectedFurnitureColorId);
    if (selectedId && inventoryQuantity(selectedId) > 0) return selectedId;
  }

  const placedId = getRoomFurniture(save.room).petBed;
  if (placedId && ITEMS[placedId]?.furnitureFamily === familyId && inventoryQuantity(placedId) > 0) {
    selectedFurnitureColorId = ITEMS[placedId].furnitureColor;
    return placedId;
  }

  const whiteId = furnitureFamilyItemId(familyId, "white");
  if (whiteId && inventoryQuantity(whiteId) > 0) {
    selectedFurnitureColorId = "white";
    return whiteId;
  }

  selectedFurnitureColorId = ownedColors[0].id;
  return furnitureFamilyItemId(familyId, ownedColors[0].id);
}

function renderPaintableFurnitureColorPicker(familyId) {
  const wrap = document.createElement("div");
  wrap.className = "inventory-furniture-color-picker";

  const heading = document.createElement("div");
  heading.className = "inventory-furniture-color-heading";
  const strong = document.createElement("strong");
  strong.textContent = "Choose a Color";
  const note = document.createElement("span");
  note.textContent = "Craft more colors in Furniture Crafting.";
  heading.append(strong, note);
  wrap.append(heading);

  const grid = document.createElement("div");
  grid.className = "inventory-furniture-color-grid";

  for (const color of furnitureFamilyOwnedColors(familyId)) {
    const itemId = furnitureFamilyItemId(familyId, color.id);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `inventory-furniture-color${selectedFurnitureColorId === color.id ? " selected" : ""}`;
    button.setAttribute("aria-label", `${color.label} ${getPaintableFurnitureFamily(familyId)?.name || "Furniture"}`);
    button.title = color.label;

    const swatch = document.createElement("span");
    swatch.className = "inventory-furniture-color-swatch";
    swatch.style.background = color.swatch;

    const count = document.createElement("small");
    count.textContent = inventoryQuantity(itemId) > 1 ? `${color.label} ×${inventoryQuantity(itemId)}` : color.label;

    button.append(swatch, count);
    button.addEventListener("click", () => {
      selectedFurnitureColorId = color.id;
      renderInventoryItemSheet();
    });
    grid.append(button);
  }

  wrap.append(grid);
  return wrap;
}

function renderInventoryItemSheet() {
  const itemId = selectedInventoryItemId;
  const item = ITEMS[itemId];
  const paintableFurniture = isPaintableFurnitureItem(item);
  const quantity = paintableFurniture ? furnitureFamilyTotalOwned(item.furnitureFamily) : inventoryQuantity(itemId);
  if (!item || !quantity) {
    closeInventoryItem();
    return;
  }

  const selectedFurnitureItemId = paintableFurniture ? getSelectedPaintableFurnitureItemId(item.furnitureFamily) : null;
  const selectedFurnitureItem = selectedFurnitureItemId ? ITEMS[selectedFurnitureItemId] : null;
  const category = INVENTORY_CATEGORIES[item.category];
  renderItemArtwork(inventorySheetIcon, selectedFurnitureItem || item);
  inventorySheetCategory.textContent = category?.label || "Item";
  inventorySheetName.textContent = paintableFurniture ? getPaintableFurnitureFamily(item.furnitureFamily)?.name || item.name : item.name;
  inventorySheetQuantity.textContent = paintableFurniture
    ? `You have ×${quantity} total · ${furnitureFamilyOwnedColors(item.furnitureFamily).length} color${furnitureFamilyOwnedColors(item.furnitureFamily).length === 1 ? "" : "s"}`
    : `You have ×${quantity}`;
  inventorySheetActions.innerHTML = "";
  inventoryGiftPreference.classList.add("hidden");
  inventoryGiftPreference.innerHTML = "";

  if (item.giftable && item.category === "food") {
    const character = getCurrentCharacter();
    const preferenceId = getGiftPreference(itemId, character);
    const reaction = GIFT_REACTIONS[preferenceId] || GIFT_REACTIONS.okay;
    const maxGiftQuantity = Math.max(1, Math.min(10, quantity));
    selectedGiftQuantity = Math.max(1, Math.min(selectedGiftQuantity, maxGiftQuantity));

    inventoryGiftPreference.classList.remove("hidden");
    inventoryGiftPreference.textContent = `${character.name}: ${reaction.label} · +${reaction.happiness} Happiness each`;

    const quantityBlock = document.createElement("div");
    quantityBlock.className = "shop-quantity-block";

    const quantityLabel = document.createElement("span");
    quantityLabel.className = "shop-quantity-label";
    quantityLabel.textContent = "How many to gift?";

    const quantityStepper = document.createElement("div");
    quantityStepper.className = "shop-quantity-stepper";

    const minusButton = document.createElement("button");
    minusButton.type = "button";
    minusButton.textContent = "−";
    minusButton.setAttribute("aria-label", "Gift one fewer");

    const quantityValue = document.createElement("strong");

    const plusButton = document.createElement("button");
    plusButton.type = "button";
    plusButton.textContent = "+";
    plusButton.setAttribute("aria-label", "Gift one more");

    const quantityNote = document.createElement("small");
    quantityNote.textContent = `Up to 10 at a time · You have ×${quantity}`;

    const giftButton = document.createElement("button");
    giftButton.type = "button";
    giftButton.className = "inventory-action primary";

    const refreshGiftQuantity = () => {
      selectedGiftQuantity = Math.max(1, Math.min(selectedGiftQuantity, maxGiftQuantity));
      quantityValue.textContent = `×${selectedGiftQuantity}`;
      minusButton.disabled = selectedGiftQuantity <= 1;
      plusButton.disabled = selectedGiftQuantity >= maxGiftQuantity;
      giftButton.textContent = `Gift ×${selectedGiftQuantity} to ${character.name}`;
    };

    minusButton.addEventListener("click", () => {
      selectedGiftQuantity -= 1;
      refreshGiftQuantity();
    });
    plusButton.addEventListener("click", () => {
      selectedGiftQuantity += 1;
      refreshGiftQuantity();
    });
    giftButton.addEventListener("click", () => giftInventoryItem(itemId, selectedGiftQuantity));

    quantityStepper.append(minusButton, quantityValue, plusButton);
    quantityBlock.append(quantityLabel, quantityStepper, quantityNote);
    inventorySheetActions.append(quantityBlock, giftButton);
    refreshGiftQuantity();
  }

  if (item.category === "furniture") {
    const placementItemId = paintableFurniture ? selectedFurnitureItemId : itemId;
    const placementItem = ITEMS[placementItemId];

    if (paintableFurniture) {
      inventorySheetActions.append(renderPaintableFurnitureColorPicker(item.furnitureFamily));
    }

    const placementNote = document.createElement("div");
    placementNote.className = "inventory-furniture-placement";
    placementNote.textContent = furniturePlacementText(placementItemId);
    inventorySheetActions.append(placementNote);

    const roomFurniture = getRoomFurniture(save.room);
    const isPlaced = roomFurniture[placementItem.furnitureSlot] === placementItemId;

    const placeButton = document.createElement("button");
    placeButton.type = "button";
    placeButton.className = `inventory-action primary${isPlaced ? " placed" : ""}`;
    placeButton.textContent = isPlaced ? "Remove from Room" : "Place in Room";
    placeButton.addEventListener("click", () => placeFurnitureItemInCurrentRoom(placementItemId));
    inventorySheetActions.append(placeButton);
  }

  const sellTargetId = paintableFurniture ? selectedFurnitureItemId : itemId;
  const sellTarget = ITEMS[sellTargetId];
  if (sellTarget?.sellValue > 0) {
    const sellButton = document.createElement("button");
    sellButton.type = "button";
    sellButton.className = "inventory-action sell";
    sellButton.innerHTML = `<span>Sell 1${paintableFurniture ? ` · ${furnitureColorOption(sellTarget.furnitureColor).label}` : ""}</span><span class="inventory-sell-price">🩷 ${sellTarget.sellValue}</span>`;
    sellButton.addEventListener("click", () => sellInventoryItem(sellTargetId));
    inventorySheetActions.append(sellButton);
  }
}

function openInventoryItem(itemId) {
  const item = ITEMS[itemId];
  if (!item) return;
  if (isPaintableFurnitureItem(item)) {
    if (furnitureFamilyTotalOwned(item.furnitureFamily) <= 0) return;
    selectedFurnitureColorId = null;
  } else if (inventoryQuantity(itemId) <= 0) return;
  selectedInventoryItemId = itemId;
  selectedGiftQuantity = 1;
  inventoryItemSheet.classList.remove("hidden");
  inventoryItemSheet.setAttribute("aria-hidden", "false");
  renderInventoryItemSheet();
}

function closeInventoryItem() {
  selectedInventoryItemId = null;
  selectedFurnitureColorId = null;
  selectedGiftQuantity = 1;
  inventoryItemSheet.classList.add("hidden");
  inventoryItemSheet.setAttribute("aria-hidden", "true");
}

function sellInventoryItem(itemId) {
  const item = ITEMS[itemId];
  if (!item || item.sellValue <= 0 || !removeInventoryItem(itemId, 1)) return;

  if (item.category === "furniture" && inventoryQuantity(itemId) <= 0) {
    clearFurnitureItemFromRooms(itemId);
  }

  save.coins += item.sellValue;
  recordCoinsEarned(item.sellValue);
  persist();
  renderRoom();
  renderInventory();

  if (isPaintableFurnitureItem(item)) {
    selectedFurnitureColorId = null;
    if (furnitureFamilyTotalOwned(item.furnitureFamily) > 0) renderInventoryItemSheet();
    else closeInventoryItem();
  } else if (inventoryQuantity(itemId) > 0) renderInventoryItemSheet();
  else closeInventoryItem();

  showToast(`Sold ${item.name} for ${item.sellValue} Pink Coins. ♡`);
}

function giftInventoryItem(itemId, quantity = 1) {
  const item = ITEMS[itemId];
  if (!item || !item.giftable) return;

  const available = inventoryQuantity(itemId);
  const amount = Math.max(1, Math.min(10, available, Math.floor(Number(quantity) || 1)));
  if (!available || !removeInventoryItem(itemId, amount)) return;

  const character = getCurrentCharacter();
  const preferenceId = getGiftPreference(itemId, character);
  const reaction = GIFT_REACTIONS[preferenceId] || GIFT_REACTIONS.okay;
  const totalHappiness = reaction.happiness * amount;
  addCharacterHappiness(totalHappiness);
  persist();

  closeInventoryItem();
  closeInventoryAll();
  setExpression(reaction.expression, reaction.duration);
  showGiftBurst(reaction.burst);

  const gained = Math.max(0, totalHappiness);
  const happinessText = gained > 0 ? ` +${gained} Happiness!` : " No Happiness lost.";
  const itemText = amount > 1 ? `${item.name} ×${amount}` : item.name;
  showToast(`${character.name} ${preferenceId === "favorite" ? "loved" : preferenceId === "like" ? "liked" : preferenceId === "okay" ? "enjoyed" : "wasn’t too excited about"} ${itemText}.${happinessText}`);
}

function openInventory() {
  closeCloset();
  closeCraftSheet();
  crafterPanel.classList.add("hidden");
  closeDuckDetail();
  duckipediaPanel.classList.add("hidden");
  closeInventoryItem();
  inventoryPanel.classList.add("hidden");
  closeShopItem();
  shopPanel.classList.add("hidden");
  clearDailyTimer();
  dailiesPanel.classList.add("hidden");
  statusPanel.classList.add("hidden");
  tasksPanel.classList.add("hidden");
  taskFormPanel.classList.add("hidden");
  bookPanel.classList.add("hidden");
  inventoryPanel.classList.remove("hidden");
  closeInventoryItem();
  renderInventory();
}

function closeInventoryToBook() {
  closeInventoryItem();
  inventoryPanel.classList.add("hidden");
  bookPanel.classList.remove("hidden");
}

function closeInventoryAll() {
  closeInventoryItem();
  inventoryPanel.classList.add("hidden");
  bookPanel.classList.add("hidden");
}















// -------------------- ROOM FURNITURE --------------------

const EMPTY_ROOM_FURNITURE = Object.freeze({
  left: null,
  petBed: null,
  rug: null,
  lights: null
});

const SHELF_DUCK_PERCHES = Object.freeze([
  { left: 11.7, top: 27.2, width: 11.5 },
  { left: 11.7, top: 39.4, width: 11.5 },
  { left: 11.7, top: 51.5, width: 11.5 },
  { left: 11.7, top: 63.6, width: 11.5 },
  { left: 11.7, top: 75.7, width: 11.5 },
  { left: 11.7, top: 87.8, width: 11.5 }
]);

const DRESSER_DUCK_PERCH = Object.freeze({
  left: 11.7,
  top: 63.3,
  width: 13.5
});

const PETBED_DUCK_PERCH = Object.freeze({
  left: 88.2,
  top: 87.0,
  width: 12.5
});

function normalizeRoomFurniture() {
  if (!save.roomFurniture || typeof save.roomFurniture !== "object") {
    save.roomFurniture = {};
  }
}

function getRoomFurniture(roomId = save.room) {
  normalizeRoomFurniture();
  const storageId = mainRoomStorageId(roomId);
  const savedRoom = save.roomFurniture[storageId];
  return {
    ...EMPTY_ROOM_FURNITURE,
    ...(savedRoom && typeof savedRoom === "object" ? savedRoom : {})
  };
}

function ensureRoomFurniture(roomId = save.room) {
  normalizeRoomFurniture();
  const storageId = mainRoomStorageId(roomId);
  if (!save.roomFurniture[storageId] || typeof save.roomFurniture[storageId] !== "object") {
    save.roomFurniture[storageId] = { ...EMPTY_ROOM_FURNITURE };
  }
  return save.roomFurniture[storageId];
}

function getPlacedFurnitureItem(slot, roomId = save.room) {
  const itemId = getRoomFurniture(roomId)[slot];
  return itemId && ITEMS[itemId]?.category === "furniture" ? ITEMS[itemId] : null;
}

function currentLeftFurnitureType(roomId = save.room) {
  return getPlacedFurnitureItem("left", roomId)?.furnitureType || null;
}

function furnitureSlotLabel(slot) {
  return slot === "left" ? "Left Furniture"
    : slot === "petBed" ? "Pet Bed"
    : slot === "rug" ? "Rug"
    : slot === "lights" ? "Wall Lights"
    : "Furniture";
}

function renderFurnitureOverlay(img, itemId) {
  const item = itemId ? ITEMS[itemId] : null;
  if (!item?.image || item.category !== "furniture") {
    img.removeAttribute("src");
    img.classList.add("hidden");
    return;
  }
  img.src = item.image;
  img.alt = item.name;
  img.classList.remove("hidden");
}


function reserveBookFurniturePerches(roomId = save.room) {
  const leftType = currentLeftFurnitureType(roomId);
  const displays = ensureFurnitureDuckDisplays(roomId);
  let changed = false;

  if (leftType === "shelf" && displays.shelf?.["6"]) {
    delete displays.shelf["6"];
    changed = true;
  }

  if (leftType === "dresser" && displays.dresser) {
    displays.dresser = null;
    changed = true;
  }

  return changed;
}

function renderRoomBookPlacement() {
  const leftType = currentLeftFurnitureType(save.room);

  roomBookImage.classList.toggle("on-shelf", leftType === "shelf");
  roomBookImage.classList.toggle("on-dresser", leftType === "dresser");
  bookHotspot.classList.toggle("on-shelf", leftType === "shelf");
  bookHotspot.classList.toggle("on-dresser", leftType === "dresser");

  if (reserveBookFurniturePerches(save.room)) persist();
}

function renderRoomFurniture() {
  const roomFurniture = getRoomFurniture(save.room);
  renderFurnitureOverlay(rugFurnitureDisplay, roomFurniture.rug);
  renderFurnitureOverlay(leftFurnitureDisplay, roomFurniture.left);
  renderFurnitureOverlay(petBedFurnitureDisplay, roomFurniture.petBed);
  renderFurnitureOverlay(lightsFurnitureDisplay, roomFurniture.lights);

  const leftType = currentLeftFurnitureType(save.room);
  leftFurnitureDisplay.classList.toggle("dresser-furniture", leftType === "dresser");

  renderRoomBookPlacement();
}

function placeFurnitureItemInCurrentRoom(itemId) {
  const item = ITEMS[itemId];
  if (!item || item.category !== "furniture" || inventoryQuantity(itemId) <= 0) return;

  const slot = item.furnitureSlot;
  if (!slot) return;

  const room = ROOMS.find(entry => entry.id === save.room) || ROOMS[0];
  const roomFurniture = ensureRoomFurniture(room.id);
  const currentId = roomFurniture[slot] || null;

  if (currentId === itemId) {
    roomFurniture[slot] = null;
    persist();
    renderRoom();
    renderInventoryItemSheet();
    showToast(`${item.name} was removed from the ${room.name} room. ♡`);
    return;
  }

  const replacedName = currentId && ITEMS[currentId] ? ITEMS[currentId].name : null;
  roomFurniture[slot] = itemId;
  persist();
  renderRoom();
  renderInventoryItemSheet();

  showToast(replacedName
    ? `${item.name} replaced ${replacedName} in the ${room.name} room! ♡`
    : `${item.name} was placed in the ${room.name} room! ♡`);
}

function clearFurnitureItemFromRooms(itemId) {
  normalizeRoomFurniture();
  for (const roomFurniture of Object.values(save.roomFurniture)) {
    if (!roomFurniture || typeof roomFurniture !== "object") continue;
    for (const slot of Object.keys(EMPTY_ROOM_FURNITURE)) {
      if (roomFurniture[slot] === itemId) roomFurniture[slot] = null;
    }
  }
}

function furniturePlacementText(itemId) {
  const item = ITEMS[itemId];
  if (!item?.furnitureSlot) return "";
  const room = ROOMS.find(entry => entry.id === save.room) || ROOMS[0];
  const currentId = getRoomFurniture(room.id)[item.furnitureSlot] || null;

  if (currentId === itemId) {
    return `Currently placed in ${room.name} · ${furnitureSlotLabel(item.furnitureSlot)}.`;
  }
  if (currentId && ITEMS[currentId]) {
    return `${furnitureSlotLabel(item.furnitureSlot)} currently has ${ITEMS[currentId].name}.`;
  }
  return `${furnitureSlotLabel(item.furnitureSlot)} is empty in ${room.name}.`;
}

function isFurnitureOwned(itemId) {
  return inventoryQuantity(itemId) > 0;
}


// -------------------- DUCK DISPLAY / COMPANIONS --------------------

function normalizeDuckDisplays() {
  if (!save.duckDisplays || typeof save.duckDisplays !== "object") {
    save.duckDisplays = {
      headByCharacter: {},
      floorByRoom: {}
    };
  }

  if (!save.duckDisplays.headByCharacter || typeof save.duckDisplays.headByCharacter !== "object") {
    save.duckDisplays.headByCharacter = {};
  }

  if (!save.duckDisplays.floorByRoom || typeof save.duckDisplays.floorByRoom !== "object") {
    save.duckDisplays.floorByRoom = {};
  }

  if (!save.duckDisplays.furnitureByRoom || typeof save.duckDisplays.furnitureByRoom !== "object") {
    save.duckDisplays.furnitureByRoom = {};
  }
}

function validDisplayDuckId(value) {
  const id = normalizeDuckId(value);
  return id && DUCKS[id] && isDuckUnlocked(id) ? id : null;
}

function currentHeadDuckId(characterId = save.selectedCharacter) {
  normalizeDuckDisplays();
  return validDisplayDuckId(save.duckDisplays.headByCharacter[characterId]);
}

function currentFloorDuckId(roomId = save.room) {
  normalizeDuckDisplays();
  return validDisplayDuckId(save.duckDisplays.floorByRoom[mainRoomStorageId(roomId)]);
}

function duckDisplayName(duckId) {
  return duckId && DUCKS[duckId] ? DUCKS[duckId].name : "None";
}

function ensureFurnitureDuckDisplays(roomId = save.room) {
  normalizeDuckDisplays();
  const storageId = mainRoomStorageId(roomId);
  if (!save.duckDisplays.furnitureByRoom[storageId] ||
      typeof save.duckDisplays.furnitureByRoom[storageId] !== "object") {
    save.duckDisplays.furnitureByRoom[storageId] = {
      shelf: {},
      dresser: null,
      petBed: null
    };
  }

  const roomDisplays = save.duckDisplays.furnitureByRoom[storageId];
  if (!roomDisplays.shelf || typeof roomDisplays.shelf !== "object") roomDisplays.shelf = {};
  if (!("dresser" in roomDisplays)) roomDisplays.dresser = null;
  if (!("petBed" in roomDisplays)) roomDisplays.petBed = null;
  return roomDisplays;
}

function getFurnitureDuckDisplays(roomId = save.room) {
  const displays = ensureFurnitureDuckDisplays(roomId);
  return {
    shelf: { ...(displays.shelf || {}) },
    dresser: validDisplayDuckId(displays.dresser),
    petBed: validDisplayDuckId(displays.petBed)
  };
}

function appendFurnitureDuck(duckId, placement, extraClass = "") {
  const id = validDisplayDuckId(duckId);
  if (!id) return;

  const duck = DUCKS[id];
  const img = document.createElement("img");
  img.src = duck.file;
  img.alt = "";
  img.className = `furniture-perched-duck${extraClass ? ` ${extraClass}` : ""}`;
  img.style.left = `${placement.left}%`;
  img.style.top = `${placement.top}%`;
  img.style.width = `${placement.width}%`;
  furnitureDuckLayer.append(img);
}

function renderFurnitureDuckPlacements() {
  furnitureDuckLayer.innerHTML = "";

  const leftType = currentLeftFurnitureType(save.room);
  const roomFurniture = getRoomFurniture(save.room);
  const displays = getFurnitureDuckDisplays(save.room);

  if (leftType === "shelf" && roomFurniture.left) {
    SHELF_DUCK_PERCHES.slice(0, 5).forEach((placement, index) => {
      const duckId = displays.shelf[String(index + 1)];
      appendFurnitureDuck(duckId, placement, "shelf-perched-duck");
    });
  }

  // Dresser top is reserved for the Book.
  if (roomFurniture.petBed) {
    appendFurnitureDuck(displays.petBed, PETBED_DUCK_PERCH, "petbed-perched-duck");
  }
}

function renderDuckPlacements() {
  normalizeDuckDisplays();

  const character = getCurrentCharacter();
  const headId = currentHeadDuckId(character.id);
  const floorId = currentFloorDuckId(save.room);

  if (headId) {
    const duck = DUCKS[headId];
    const placement = character.duckHeadPlacement || {
      left: 50,
      top: 38.7,
      width: 18
    };

    headDuckDisplay.src = duck.file;
    headDuckDisplay.alt = `${duck.name} sitting on ${character.name}'s head`;
    headDuckDisplay.style.left = `${placement.left}%`;
    headDuckDisplay.style.top = `${placement.top}%`;
    headDuckDisplay.style.width = `${placement.width}%`;
    headDuckDisplay.classList.remove("hidden");
  } else {
    headDuckDisplay.removeAttribute("src");
    headDuckDisplay.alt = "";
    headDuckDisplay.classList.add("hidden");
  }

  if (floorId) {
    const duck = DUCKS[floorId];
    floorDuckDisplay.src = duck.file;
    floorDuckDisplay.alt = `${duck.name} displayed on the room floor`;
    floorDuckDisplay.classList.remove("hidden");
  } else {
    floorDuckDisplay.removeAttribute("src");
    floorDuckDisplay.alt = "";
    floorDuckDisplay.classList.add("hidden");
  }

  renderFurnitureDuckPlacements();
}

function assignSelectedDuckToCurrentOc() {
  const duckId = validDisplayDuckId(selectedDuckId);
  if (!duckId) return;

  normalizeDuckDisplays();
  const character = getCurrentCharacter();
  const current = currentHeadDuckId(character.id);

  if (current === duckId) {
    delete save.duckDisplays.headByCharacter[character.id];
    persist();
    renderDuckPlacements();
    renderDuckDetailPlacementControls();
    showToast(`${DUCKS[duckId].name} hopped off ${character.name}'s head. ♡`);
    return;
  }

  save.duckDisplays.headByCharacter[character.id] = duckId;
  persist();
  renderDuckPlacements();
  renderDuckDetailPlacementControls();
  showToast(`${DUCKS[duckId].name} is now ${character.name}'s duck! 🦆♡`);
}

function assignSelectedDuckToCurrentRoomFloor() {
  const duckId = validDisplayDuckId(selectedDuckId);
  if (!duckId) return;

  normalizeDuckDisplays();
  const room = ROOMS.find(entry => entry.id === save.room) || ROOMS[0];
  const storageId = mainRoomStorageId(room.id);
  const current = currentFloorDuckId(storageId);

  if (current === duckId) {
    delete save.duckDisplays.floorByRoom[storageId];
    persist();
    renderDuckPlacements();
    renderDuckDetailPlacementControls();
    showToast(`${DUCKS[duckId].name} was removed from the ${room.name} floor. ♡`);
    return;
  }

  save.duckDisplays.floorByRoom[storageId] = duckId;
  persist();
  renderDuckPlacements();
  renderDuckDetailPlacementControls();
  showToast(`${DUCKS[duckId].name} is now hanging out in the ${room.name} room! 🦆`);
}


function assignSelectedDuckToShelf(slotNumber) {
  const duckId = validDisplayDuckId(selectedDuckId);
  const slot = String(Number(slotNumber));
  if (!duckId || !["1", "2", "3", "4", "5"].includes(slot)) return;
  if (currentLeftFurnitureType(save.room) !== "shelf") return;

  const roomDisplays = ensureFurnitureDuckDisplays(save.room);
  const current = validDisplayDuckId(roomDisplays.shelf[slot]);

  if (current === duckId) {
    delete roomDisplays.shelf[slot];
    persist();
    renderDuckPlacements();
    renderDuckDetailPlacementControls();
    showToast(`${DUCKS[duckId].name} hopped off Shelf ${slot}. ♡`);
    return;
  }

  roomDisplays.shelf[slot] = duckId;
  persist();
  renderDuckPlacements();
  renderDuckDetailPlacementControls();
  showToast(`${DUCKS[duckId].name} is now sitting on Shelf ${slot}! 🦆`);
}

function assignSelectedDuckToFurniturePerch(type) {
  const duckId = validDisplayDuckId(selectedDuckId);
  if (!duckId || !["dresser", "petBed"].includes(type)) return;

  const roomFurniture = getRoomFurniture(save.room);
  const leftType = currentLeftFurnitureType(save.room);

  if (type === "dresser" && (leftType !== "dresser" || !roomFurniture.left)) return;
  if (type === "petBed" && !roomFurniture.petBed) return;

  const roomDisplays = ensureFurnitureDuckDisplays(save.room);
  const current = validDisplayDuckId(roomDisplays[type]);
  const label = type === "dresser" ? "dresser" : "pet bed";

  if (current === duckId) {
    roomDisplays[type] = null;
    persist();
    renderDuckPlacements();
    renderDuckDetailPlacementControls();
    showToast(`${DUCKS[duckId].name} hopped off the ${label}. ♡`);
    return;
  }

  roomDisplays[type] = duckId;
  persist();
  renderDuckPlacements();
  renderDuckDetailPlacementControls();
  showToast(`${DUCKS[duckId].name} is now on the ${label}! 🦆♡`);
}

function renderShelfDuckPicker(selectedDuckId) {
  duckShelfPicker.innerHTML = "";
  const displays = getFurnitureDuckDisplays(save.room);

  for (let slot = 1; slot <= 6; slot += 1) {
    const current = validDisplayDuckId(displays.shelf[String(slot)]);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "duck-shelf-choice";

    const label = document.createElement("strong");
    label.textContent = slot === 1 ? "Shelf 1 · Top"
      : slot === 6 ? "Shelf 6 · Bottom"
      : `Shelf ${slot}`;

    const detail = document.createElement("span");

    if (slot === 6) {
      detail.textContent = "📖 Book";
      button.disabled = true;
      button.classList.add("reserved");
    } else {
      detail.textContent = current
        ? `${duckDisplayName(current)}${current === selectedDuckId ? " ✓" : ""}`
        : "Empty";
      button.classList.toggle("active", current === selectedDuckId);
      button.addEventListener("click", () => assignSelectedDuckToShelf(slot));
    }

    button.append(label, detail);
    duckShelfPicker.append(button);
  }
}

function renderDuckDetailPlacementControls() {
  const duckId = validDisplayDuckId(selectedDuckId);

  if (!duckId) {
    duckDetailActions.classList.add("hidden");
    duckShelfPicker.classList.add("hidden");
    return;
  }

  duckDetailActions.classList.remove("hidden");

  const character = getCurrentCharacter();
  const room = ROOMS.find(entry => entry.id === save.room) || ROOMS[0];
  const roomFurniture = getRoomFurniture(room.id);
  const leftType = currentLeftFurnitureType(room.id);
  const furnitureDisplays = getFurnitureDuckDisplays(room.id);

  const headId = currentHeadDuckId(character.id);
  const floorId = currentFloorDuckId(room.id);
  const thisDuckOnHead = headId === duckId;
  const thisDuckOnFloor = floorId === duckId;
  const thisDuckOnDresser = furnitureDisplays.dresser === duckId;
  const thisDuckInPetBed = furnitureDisplays.petBed === duckId;

  assignDuckToOc.querySelector("strong").textContent =
    thisDuckOnHead ? `Remove from ${character.name}` : `Assign to ${character.name}`;

  assignDuckToOcNote.textContent = thisDuckOnHead
    ? `Take ${DUCKS[duckId].name} off ${character.name}'s head.`
    : headId
      ? `Replace ${duckDisplayName(headId)} on ${character.name}'s head.`
      : `Place ${DUCKS[duckId].name} on ${character.name}'s head.`;

  assignDuckToFloor.querySelector("strong").textContent =
    thisDuckOnFloor ? "Remove from Room Floor" : "Apply to Room Floor";

  assignDuckToFloorNote.textContent = thisDuckOnFloor
    ? `Remove ${DUCKS[duckId].name} from the ${room.name} room floor.`
    : floorId
      ? `Replace ${duckDisplayName(floorId)} on the ${room.name} room floor.`
      : `Place ${DUCKS[duckId].name} beside ${character.name} in the ${room.name} room.`;

  const hasShelf = leftType === "shelf" && Boolean(roomFurniture.left);
  const dresserPlaced = leftType === "dresser" && Boolean(roomFurniture.left);
  const hasPetBed = Boolean(roomFurniture.petBed);

  assignDuckToShelf.classList.toggle("hidden", !hasShelf);
  assignDuckToDresser.classList.add("hidden");
  assignDuckToPetBed.classList.toggle("hidden", !hasPetBed);

  if (hasShelf) {
    const occupied = Object.entries(furnitureDisplays.shelf)
      .filter(([slot, value]) => slot !== "6" && validDisplayDuckId(value))
      .length;
    assignDuckToShelfNote.textContent = `Choose Shelf 1–5 · Shelf 6 (bottom) holds the Book · ${occupied}/5 filled.`;
    renderShelfDuckPicker(duckId);
  } else {
    duckShelfPicker.classList.add("hidden");
  }

  if (hasPetBed) {
    assignDuckToPetBed.querySelector("strong").textContent =
      thisDuckInPetBed ? "Remove from Pet Bed" : "Assign to Pet Bed";
    assignDuckToPetBedNote.textContent = thisDuckInPetBed
      ? `Take ${DUCKS[duckId].name} out of the pet bed.`
      : furnitureDisplays.petBed
        ? `Replace ${duckDisplayName(furnitureDisplays.petBed)} in the pet bed.`
        : `Let ${DUCKS[duckId].name} cozy up in the pet bed.`;
  }

  assignDuckToOc.classList.toggle("active", thisDuckOnHead);
  assignDuckToFloor.classList.toggle("active", thisDuckOnFloor);
  assignDuckToDresser.classList.toggle("active", thisDuckOnDresser);
  assignDuckToPetBed.classList.toggle("active", thisDuckInPetBed);

  currentHeadDuckText.textContent =
    `${character.name}'s head: ${duckDisplayName(headId)}`;
  currentFloorDuckText.textContent =
    `${room.name} floor: ${duckDisplayName(floorId)}`;

  if (hasShelf) {
    const filled = Object.entries(furnitureDisplays.shelf)
      .filter(([, value]) => validDisplayDuckId(value))
      .map(([slot, value]) => `${slot}: ${duckDisplayName(value)}`);
    currentShelfDuckText.textContent = filled.length
      ? `Shelf ducks · ${filled.join(" · ")}`
      : "Shelf ducks: Empty";
  } else {
    currentShelfDuckText.textContent = "Shelf: No shelf placed";
  }

  currentDresserDuckText.textContent = dresserPlaced
    ? "Dresser: 📖 Book occupies the top"
    : "Dresser: No dresser placed";

  currentPetBedDuckText.textContent = hasPetBed
    ? `Pet bed: ${duckDisplayName(furnitureDisplays.petBed)}`
    : "Pet bed: No pet bed placed";
}


// -------------------- TINY DUCK SECRET SIGHTINGS --------------------

const TINY_DUCK_SPAWN_MIN_MS = 35000;
const TINY_DUCK_SPAWN_MAX_MS = 90000;
const TINY_DUCK_SPAWN_CHANCE = 0.22;
const TINY_DUCK_VISIBLE_MS = 9000;
const TINY_DUCK_STACK_SIGHTINGS = 4;
const TINY_DUCK_PILE_SIGHTINGS = 100;

let tinyDuckSpawnTimer = null;
let tinyDuckHideTimer = null;
let tinyDuckEl = null;

function scheduleTinyDuckCheck() {
  clearTimeout(tinyDuckSpawnTimer);

  const delay =
    TINY_DUCK_SPAWN_MIN_MS +
    Math.random() * (TINY_DUCK_SPAWN_MAX_MS - TINY_DUCK_SPAWN_MIN_MS);

  tinyDuckSpawnTimer = setTimeout(() => {
    tryTinyDuckSpawn();
    scheduleTinyDuckCheck();
  }, delay);
}

function tinyDuckCanAppearAtHome() {
  return currentRoomView === "main" &&
    isHomeRoomInteractive() &&
    !document.hidden &&
    !tinyDuckEl;
}

function randomTinyDuckPosition() {
  // Keep the duck in the middle-ish portion of the room so it stays tappable
  // and avoids the Book / Mirror hot spots near the extreme edges.
  return {
    left: 18 + Math.random() * 64,
    top: 18 + Math.random() * 58
  };
}

function tryTinyDuckSpawn(force = false) {
  if (!tinyDuckCanAppearAtHome()) return;
  if (!force && Math.random() > TINY_DUCK_SPAWN_CHANCE) return;

  const pos = randomTinyDuckPosition();
  const button = document.createElement("button");
  button.type = "button";
  button.className = "tiny-duck-secret";
  button.setAttribute("aria-label", "A tiny hidden duck!");
  button.style.left = `${pos.left}%`;
  button.style.top = `${pos.top}%`;

  const img = document.createElement("img");
  img.src = "assets/ducks/Tiny-duck.PNG";
  img.alt = "Tiny Duck";
  button.append(img);

  button.addEventListener("click", event => {
    event.stopPropagation();
    collectTinyDuckSighting();
  });

  stage.append(button);
  tinyDuckEl = button;

  requestAnimationFrame(() => {
    button.classList.add("show");
  });

  clearTimeout(tinyDuckHideTimer);
  tinyDuckHideTimer = setTimeout(() => {
    hideTinyDuckSecret();
  }, TINY_DUCK_VISIBLE_MS);
}

function hideTinyDuckSecret() {
  clearTimeout(tinyDuckHideTimer);

  if (!tinyDuckEl) return;
  const el = tinyDuckEl;
  tinyDuckEl = null;

  el.classList.remove("show");
  setTimeout(() => el.remove(), 260);
}

function collectTinyDuckSighting() {
  if (!tinyDuckEl) return;

  save.tinyDuckSightings = Math.max(0, Number(save.tinyDuckSightings) || 0) + 1;
  const sightings = save.tinyDuckSightings;

  const tinyWasNew = unlockDuck("tiny-duck", {
    notify: false,
    persistNow: false
  });

  let stackWasNew = false;
  if (sightings >= TINY_DUCK_STACK_SIGHTINGS) {
    stackWasNew = unlockDuck("tiny-duck-stack", {
      notify: false,
      persistNow: false
    });
  }

  let pileWasNew = false;
  if (sightings >= TINY_DUCK_PILE_SIGHTINGS) {
    pileWasNew = unlockDuck("pile-of-tiny-ducks", {
      notify: false,
      persistNow: false
    });
  }

  persist();
  evaluateAchievements();
  hideTinyDuckSecret();

  if (pileWasNew) {
    showToast(`Tiny Duck sighting #${sightings}! Pile of Tiny Ducks unlocked! 🦆✨`);
  } else if (stackWasNew) {
    showToast("Tiny Duck sighting #4! Tiny Duck Stack unlocked! 🦆🦆🦆🦆");
  } else if (tinyWasNew) {
    showToast("You found Tiny Duck! Added to Duckipedia! 🦆✨");
  } else if (sightings > TINY_DUCK_STACK_SIGHTINGS) {
    showToast(`Tiny Duck spotted again! ${sightings} Sightings! ♡`);
  } else {
    showToast(`Tiny Duck spotted again! ${sightings}/${TINY_DUCK_STACK_SIGHTINGS} sightings ♡`);
  }

  if (!duckipediaPanel.classList.contains("hidden")) {
    renderDuckipedia();
  }
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) hideTinyDuckSecret();
});

scheduleTinyDuckCheck();


// -------------------- GAMES --------------------

function openGames() {
  closeCloset();
  closeInventoryItem();
  closeShopItem();
  closeDuckDetail();
  closeCraftSheet();

  inventoryPanel.classList.add("hidden");
  shopPanel.classList.add("hidden");
  duckipediaPanel.classList.add("hidden");
  crafterPanel.classList.add("hidden");
  gamesPanel.classList.add("hidden");
  clearDailyTimer();
  dailiesPanel.classList.add("hidden");
  statusPanel.classList.add("hidden");
  tasksPanel.classList.add("hidden");
  taskFormPanel.classList.add("hidden");
  bookPanel.classList.add("hidden");

  gamesPanel.classList.remove("hidden");
}

function closeGamesToBook() {
  gamesPanel.classList.add("hidden");
  bookPanel.classList.remove("hidden");
}

function closeGamesAll() {
  gamesPanel.classList.add("hidden");
  bookPanel.classList.add("hidden");
}

function launchBakery() {
  // Bakery is its own page so the large merge-game code cannot interfere
  // with the room / Book UI, but it shares this same local save.
  window.location.href = "bakery/?v=24-55";
}

function launchDuckSort() {
  window.location.href = "sort-game/?v=24-32";
}

function launchCraneGame() {
  window.location.href = "crane-game/?v=24-40";
}

function launchMemoryGame() {
  window.location.href = "memory-game/?v=24-44";
}

function launchDuckQuestGame() {
  window.location.href = "duck-quest/?v=18";
}


// -------------------- DUCK CRAFTER --------------------

function craftableDuckEntries() {
  return sortedDuckEntries()
    .filter(([, duck]) => Boolean(duck.recipe))
    .sort(([aId, aDuck], [bId, bDuck]) => {
      // Keep ducks the player can craft RIGHT NOW at the very top.
      // Missing recipes come next, and already-collected trophies go last.
      const rank = (duckId, duck) => {
        if (isDuckUnlocked(duckId)) return 2;
        if (recipeHasMaterials(duck.recipe)) return 0;
        return 1;
      };

      const rankDiff = rank(aId, aDuck) - rank(bId, bDuck);
      if (rankDiff !== 0) return rankDiff;

      return aDuck.name.localeCompare(bDuck.name);
    });
}

function paintRecipeEntries() {
  return Object.entries(PAINT_RECIPES)
    .filter(([itemId]) => ITEMS[itemId])
    .sort(([,], [bId]) => ITEMS[bId].name.localeCompare(ITEMS[bId].name));
}

function furnitureRecipeEntries(familyId = null) {
  return Object.entries(FURNITURE_RECIPES)
    .filter(([, entry]) => !familyId || entry?.familyId === familyId)
    .filter(([itemId, entry]) => ITEMS[itemId] && entry?.recipe)
    .sort(([aId, aEntry], [bId, bEntry]) => {
      const rank = (itemId, entry) => {
        if (inventoryQuantity(itemId) > 0) return 2;
        if (recipeHasMaterials(entry.recipe)) return 0;
        return 1;
      };
      const rankDiff = rank(aId, aEntry) - rank(bId, bEntry);
      if (rankDiff !== 0) return rankDiff;
      return ITEMS[aId].name.localeCompare(ITEMS[bId].name);
    });
}

function recipeHasMaterials(recipe) {
  if (!recipe) return false;
  return Object.entries(recipe).every(([itemId, needed]) => {
    return inventoryQuantity(itemId) >= Number(needed || 0);
  });
}

function recipeMissingCount(recipe) {
  if (!recipe) return 0;
  return Object.entries(recipe).reduce((sum, [itemId, needed]) => {
    return sum + Math.max(0, Number(needed || 0) - inventoryQuantity(itemId));
  }, 0);
}

function consumeRecipe(recipe) {
  if (!recipeHasMaterials(recipe)) return false;

  for (const [itemId, needed] of Object.entries(recipe)) {
    if (!removeInventoryItem(itemId, needed)) return false;
  }
  return true;
}

function renderCrafterOutputArt(container, target) {
  container.innerHTML = "";

  if (target.type === "duck") {
    const duck = DUCKS[target.id];
    if (!duck) return;
    const img = document.createElement("img");
    img.src = duck.file;
    img.alt = "";
    img.loading = "lazy";
    img.decoding = "async";
    container.append(img);
    return;
  }

  const item = ITEMS[target.id];
  if (item) renderItemArtwork(container, item);
}

function crafterCardStatusForDuck(duckId, duck) {
  if (isDuckUnlocked(duckId)) {
    return { label: "Collected ✓", className: "collected" };
  }
  if (recipeHasMaterials(duck.recipe)) {
    return { label: "Ready!", className: "ready" };
  }
  const missing = recipeMissingCount(duck.recipe);
  return { label: `Need ${missing}`, className: "missing" };
}

function crafterCardStatusForPaint(itemId, recipe) {
  if (recipeHasMaterials(recipe)) {
    return { label: "Ready!", className: "ready" };
  }
  const missing = recipeMissingCount(recipe);
  return { label: `Need ${missing}`, className: "missing" };
}

function crafterCardStatusForFurniture(itemId, recipe) {
  if (inventoryQuantity(itemId) > 0) {
    return { label: "Owned ✓", className: "collected" };
  }
  if (recipeHasMaterials(recipe)) {
    return { label: "Ready!", className: "ready" };
  }
  const missing = recipeMissingCount(recipe);
  return { label: `Need ${missing}`, className: "missing" };
}

function createCrafterCard(target, name, imagePath, status, ownedText = "") {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `crafter-item-card ${status.className}`;

  const art = document.createElement("span");
  art.className = "crafter-item-art";
  if (target.type === "furniture" && ITEMS[target.id]) {
    renderItemArtwork(art, ITEMS[target.id]);
  } else {
    const img = document.createElement("img");
    img.src = imagePath;
    img.alt = "";
    img.loading = "lazy";
    img.decoding = "async";
    art.append(img);
  }

  const nameEl = document.createElement("strong");
  nameEl.textContent = name;

  const footer = document.createElement("span");
  footer.className = "crafter-item-footer";

  const state = document.createElement("span");
  state.className = `crafter-item-state ${status.className}`;
  state.textContent = status.label;
  footer.append(state);

  if (ownedText) {
    const owned = document.createElement("span");
    owned.className = "crafter-item-owned";
    owned.textContent = ownedText;
    footer.append(owned);
  }

  button.append(art, nameEl, footer);
  button.addEventListener("click", () => openCraftSheet(target));
  return button;
}

function renderDuckCraftTab() {
  const wrapper = document.createElement("div");

  const intro = document.createElement("section");
  intro.className = "crafter-intro";
  intro.innerHTML = `
    <div>
      <strong>Craft a Duck</strong>
      <p>Each crafted duck is a one-time trophy. Once made, it is permanently saved to Duckipedia.</p>
    </div>
    <span>${save.unlockedDucks.length} / ${DUCK_TOTAL}</span>
  `;
  wrapper.append(intro);

  const grid = document.createElement("div");
  grid.className = "crafter-grid";

  craftableDuckEntries().forEach(([duckId, duck]) => {
    const status = crafterCardStatusForDuck(duckId, duck);
    grid.append(
      createCrafterCard(
        { type: "duck", id: duckId },
        duck.name,
        duck.file,
        status
      )
    );
  });

  wrapper.append(grid);
  crafterContent.append(wrapper);
}

function renderPaintCraftTab() {
  const wrapper = document.createElement("div");

  const intro = document.createElement("section");
  intro.className = "crafter-intro paint";
  intro.innerHTML = `
    <div>
      <strong>Mix Paint</strong>
      <p>Basic colors come from the Shop. Mix them here to make recipe-only colors.</p>
    </div>
    <span>${paintRecipeEntries().length} mixes</span>
  `;
  wrapper.append(intro);

  const grid = document.createElement("div");
  grid.className = "crafter-grid";

  paintRecipeEntries().forEach(([itemId, recipe]) => {
    const item = ITEMS[itemId];
    const status = crafterCardStatusForPaint(itemId, recipe);
    grid.append(
      createCrafterCard(
        { type: "paint", id: itemId },
        item.name,
        item.image,
        status,
        `Owned ×${inventoryQuantity(itemId)}`
      )
    );
  });

  wrapper.append(grid);
  crafterContent.append(wrapper);
}

function renderFurnitureCraftTab() {
  const wrapper = document.createElement("div");

  const intro = document.createElement("section");
  intro.className = "crafter-intro furniture";
  const totalWhiteBases = Object.values(PAINTABLE_FURNITURE_FAMILIES)
    .reduce((sum, family) => sum + inventoryQuantity(family.baseItemId), 0);
  intro.innerHTML = `
    <div>
      <strong>Paint Furniture</strong>
      <p>Use a White furniture base + one Paint to create that color. Each color can be owned once per furniture type.</p>
    </div>
    <span>${totalWhiteBases} white base${totalWhiteBases === 1 ? "" : "s"}</span>
  `;
  wrapper.append(intro);

  for (const family of Object.values(PAINTABLE_FURNITURE_FAMILIES)) {
    const entries = furnitureRecipeEntries(family.id);
    const heading = document.createElement("div");
    heading.className = "recipe-section-heading furniture-family-heading";
    const whiteCount = inventoryQuantity(family.baseItemId);
    heading.innerHTML = `<strong>${family.name}</strong><span>${whiteCount} white base${whiteCount === 1 ? "" : "s"}</span>`;
    wrapper.append(heading);

    const grid = document.createElement("div");
    grid.className = "crafter-grid";

    entries.forEach(([itemId, entry]) => {
      const item = ITEMS[itemId];
      const status = crafterCardStatusForFurniture(itemId, entry.recipe);
      grid.append(
        createCrafterCard(
          { type: "furniture", id: itemId },
          item.name,
          item.image,
          status,
          inventoryQuantity(itemId) > 0 ? "Color owned" : `${family.name} + Paint`
        )
      );
    });

    wrapper.append(grid);
  }

  crafterContent.append(wrapper);
}

function ingredientRecipeSummary(recipe) {
  const wrap = document.createElement("div");
  wrap.className = "recipe-mini-ingredients";

  Object.entries(recipe).forEach(([itemId, needed]) => {
    const item = ITEMS[itemId];
    if (!item) return;

    const chip = document.createElement("span");
    chip.className = "recipe-mini-chip";

    const art = document.createElement("span");
    art.className = "recipe-mini-art";
    renderItemArtwork(art, item);

    const label = document.createElement("span");
    label.textContent = `${item.name} ×${needed}`;

    chip.append(art, label);
    wrap.append(chip);
  });

  return wrap;
}

function createDuckRecipeGuideCard(duckId, duck) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "recipe-guide-card";

  const top = document.createElement("span");
  top.className = "recipe-guide-top";

  const art = document.createElement("span");
  art.className = "recipe-guide-art";
  const img = document.createElement("img");
  img.src = duck.file;
  img.alt = "";
  img.loading = "lazy";
  art.append(img);

  const copy = document.createElement("span");
  copy.className = "recipe-guide-copy";

  const name = document.createElement("strong");
  name.textContent = duck.name;

  const kind = document.createElement("span");
  kind.textContent = duck.recipe ? "Duck recipe" : "Special discovery";

  copy.append(name, kind);
  top.append(art, copy);
  card.append(top);

  if (duck.recipe) {
    card.append(ingredientRecipeSummary(duck.recipe));
    card.addEventListener("click", () => openCraftSheet({ type: "duck", id: duckId }));
  } else {
    const note = document.createElement("span");
    note.className = "recipe-special-note";
    note.textContent = duckDiscoveryHint(duck);
    card.append(note);
    card.addEventListener("click", () => {
      showToast(duckDiscoveryHint(duck));
    });
  }

  return card;
}

function createPaintRecipeGuideCard(itemId, recipe) {
  const item = ITEMS[itemId];

  const card = document.createElement("button");
  card.type = "button";
  card.className = "recipe-guide-card";

  const top = document.createElement("span");
  top.className = "recipe-guide-top";

  const art = document.createElement("span");
  art.className = "recipe-guide-art";
  renderItemArtwork(art, item);

  const copy = document.createElement("span");
  copy.className = "recipe-guide-copy";

  const name = document.createElement("strong");
  name.textContent = item.name;

  const kind = document.createElement("span");
  kind.textContent = "Paint recipe";

  copy.append(name, kind);
  top.append(art, copy);
  card.append(top, ingredientRecipeSummary(recipe));
  card.addEventListener("click", () => openCraftSheet({ type: "paint", id: itemId }));

  return card;
}

function createFurnitureRecipeGuideCard(itemId, entry) {
  const item = ITEMS[itemId];
  const card = document.createElement("button");
  card.type = "button";
  card.className = "recipe-guide-card";

  const top = document.createElement("span");
  top.className = "recipe-guide-top";
  const art = document.createElement("span");
  art.className = "recipe-guide-art";
  renderItemArtwork(art, item);
  const copy = document.createElement("span");
  copy.className = "recipe-guide-copy";
  const name = document.createElement("strong");
  name.textContent = item.name;
  const kind = document.createElement("span");
  kind.textContent = "Furniture paint recipe";
  copy.append(name, kind);
  top.append(art, copy);
  card.append(top, ingredientRecipeSummary(entry.recipe));
  card.addEventListener("click", () => openCraftSheet({ type: "furniture", id: itemId }));
  return card;
}

function renderRecipeGuideTab() {
  const wrapper = document.createElement("div");
  wrapper.className = "recipe-guide";

  const intro = document.createElement("section");
  intro.className = "crafter-intro recipes";
  intro.innerHTML = `
    <div>
      <strong>Recipe Book</strong>
      <p>Use this page whenever you want to check a duck, mixed paint, or furniture color recipe.</p>
    </div>
    <span>📖</span>
  `;
  wrapper.append(intro);

  const duckHeading = document.createElement("div");
  duckHeading.className = "recipe-section-heading";
  duckHeading.innerHTML = `<strong>Duck Recipes</strong><span>${DUCK_TOTAL} entries</span>`;
  wrapper.append(duckHeading);

  const duckList = document.createElement("div");
  duckList.className = "recipe-guide-list";
  sortedDuckEntries().forEach(([duckId, duck]) => {
    duckList.append(createDuckRecipeGuideCard(duckId, duck));
  });
  wrapper.append(duckList);

  const paintHeading = document.createElement("div");
  paintHeading.className = "recipe-section-heading";
  paintHeading.innerHTML = `<strong>Paint Recipes</strong><span>${paintRecipeEntries().length} mixes</span>`;
  wrapper.append(paintHeading);

  const paintList = document.createElement("div");
  paintList.className = "recipe-guide-list";
  paintRecipeEntries().forEach(([itemId, recipe]) => {
    paintList.append(createPaintRecipeGuideCard(itemId, recipe));
  });
  wrapper.append(paintList);

  const furnitureHeading = document.createElement("div");
  furnitureHeading.className = "recipe-section-heading";
  furnitureHeading.innerHTML = `<strong>Furniture Recipes</strong><span>${furnitureRecipeEntries().length} colors</span>`;
  wrapper.append(furnitureHeading);

  const furnitureList = document.createElement("div");
  furnitureList.className = "recipe-guide-list";
  furnitureRecipeEntries().forEach(([itemId, entry]) => {
    furnitureList.append(createFurnitureRecipeGuideCard(itemId, entry));
  });
  wrapper.append(furnitureList);

  crafterContent.append(wrapper);
}

function renderCrafter() {
  sanitizeUnlockedDucks();

  document.querySelectorAll("[data-crafter-tab]").forEach(button => {
    const active = button.dataset.crafterTab === currentCrafterTab;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });

  crafterContent.innerHTML = "";

  if (currentCrafterTab === "paint") {
    renderPaintCraftTab();
  } else if (currentCrafterTab === "furniture") {
    renderFurnitureCraftTab();
  } else if (currentCrafterTab === "recipes") {
    renderRecipeGuideTab();
  } else {
    renderDuckCraftTab();
  }
}

function getCraftTargetData(target = selectedCraftTarget) {
  if (!target) return null;

  if (target.type === "duck") {
    const duck = DUCKS[target.id];
    if (!duck?.recipe) return null;
    return {
      type: "duck",
      id: target.id,
      name: duck.name,
      file: duck.file,
      recipe: duck.recipe,
      alreadyCrafted: isDuckUnlocked(target.id)
    };
  }

  if (target.type === "paint") {
    const item = ITEMS[target.id];
    const recipe = PAINT_RECIPES[target.id];
    if (!item || !recipe) return null;
    return {
      type: "paint",
      id: target.id,
      name: item.name,
      file: item.image,
      recipe,
      alreadyCrafted: false
    };
  }

  if (target.type === "furniture") {
    const item = ITEMS[target.id];
    const entry = FURNITURE_RECIPES[target.id];
    if (!item || !entry?.recipe) return null;
    return {
      type: "furniture",
      id: target.id,
      name: item.name,
      file: item.image,
      recipe: entry.recipe,
      alreadyCrafted: inventoryQuantity(target.id) > 0,
      familyId: entry.familyId,
      colorId: entry.colorId
    };
  }

  return null;
}

function renderCraftRequirementRow(itemId, needed) {
  const item = ITEMS[itemId];
  if (!item) return null;

  const owned = inventoryQuantity(itemId);
  const enough = owned >= needed;

  const row = document.createElement("div");
  row.className = `craft-requirement-row ${enough ? "enough" : "short"}`;

  const art = document.createElement("span");
  art.className = "craft-requirement-art";
  renderItemArtwork(art, item);

  const copy = document.createElement("span");
  copy.className = "craft-requirement-copy";

  const name = document.createElement("strong");
  name.textContent = item.name;

  const count = document.createElement("span");
  count.textContent = `You have ${owned} / Need ${needed}`;

  copy.append(name, count);

  const marker = document.createElement("span");
  marker.className = "craft-requirement-marker";
  marker.textContent = enough ? "✓" : "!";
  marker.setAttribute("aria-label", enough ? "Enough" : "Not enough");

  row.append(art, copy, marker);
  return row;
}

function openCraftSheet(target) {
  selectedCraftTarget = target;
  renderCraftSheet();
  craftSheet.classList.remove("hidden");
  craftSheet.setAttribute("aria-hidden", "false");
}

function closeCraftSheet() {
  selectedCraftTarget = null;
  craftSheet.classList.add("hidden");
  craftSheet.setAttribute("aria-hidden", "true");
}

function renderCraftSheet() {
  const target = getCraftTargetData();
  if (!target) {
    closeCraftSheet();
    return;
  }

  craftSheetArt.innerHTML = "";
  if (target.type === "furniture" && ITEMS[target.id]) {
    renderItemArtwork(craftSheetArt, ITEMS[target.id]);
  } else {
    const img = document.createElement("img");
    img.src = target.file;
    img.alt = "";
    craftSheetArt.append(img);
  }

  craftSheetEyebrow.textContent = target.type === "duck"
    ? "DUCK RECIPE"
    : target.type === "furniture"
      ? "FURNITURE RECIPE"
      : "PAINT RECIPE";
  craftSheetName.textContent = target.name;

  const ready = recipeHasMaterials(target.recipe);

  if (target.type === "duck" && target.alreadyCrafted) {
    craftSheetNote.textContent = "You already crafted this one-time trophy. It is safely stored in Duckipedia!";
  } else if (target.type === "duck") {
    craftSheetNote.textContent = "Crafting consumes the ingredients below and permanently unlocks this duck in Duckipedia.";
  } else if (target.type === "furniture" && target.alreadyCrafted) {
    craftSheetNote.textContent = "You already own this color. Each paintable furniture color can be created once.";
  } else if (target.type === "furniture") {
    craftSheetNote.textContent = "Painting consumes one White base of this furniture plus the selected Paint, then adds the new color to your Furniture Inventory.";
  } else {
    craftSheetNote.textContent = `You currently own ${inventoryQuantity(target.id)}. Mixed paint can be crafted as many times as you have ingredients.`;
  }

  craftRequirements.innerHTML = "";
  Object.entries(target.recipe).forEach(([itemId, needed]) => {
    const row = renderCraftRequirementRow(itemId, needed);
    if (row) craftRequirements.append(row);
  });

  if (target.type === "duck" && target.alreadyCrafted) {
    craftReadyBadge.textContent = "Already collected";
    craftReadyBadge.className = "craft-ready-badge collected";
    craftActionButton.textContent = "Already in Duckipedia ✓";
    craftActionButton.disabled = true;
    craftActionButton.classList.remove("ready");
    return;
  }

  if (target.type === "furniture" && target.alreadyCrafted) {
    craftReadyBadge.textContent = "Color owned";
    craftReadyBadge.className = "craft-ready-badge collected";
    craftActionButton.textContent = "Already Owned ✓";
    craftActionButton.disabled = true;
    craftActionButton.classList.remove("ready");
    return;
  }

  if (ready) {
    craftReadyBadge.textContent = "Ready!";
    craftReadyBadge.className = "craft-ready-badge ready";
    craftActionButton.textContent = target.type === "duck"
      ? "Craft Duck 🦆"
      : target.type === "furniture"
        ? "Paint Furniture 🎨"
        : "Mix Paint 🎨";
    craftActionButton.disabled = false;
    craftActionButton.classList.add("ready");
  } else {
    craftReadyBadge.textContent = "Missing items";
    craftReadyBadge.className = "craft-ready-badge missing";
    craftActionButton.textContent = target.type === "duck"
      ? "Not Ready Yet"
      : target.type === "furniture"
        ? "Missing Furniture or Paint"
        : "Need More Paint";
    craftActionButton.disabled = true;
    craftActionButton.classList.remove("ready");
  }
}

function craftSelectedTarget() {
  const target = getCraftTargetData();
  if (!target) return;

  if (target.type === "duck" && target.alreadyCrafted) {
    showToast("That duck is already in your Duckipedia! ♡");
    renderCraftSheet();
    return;
  }

  if (target.type === "furniture" && target.alreadyCrafted) {
    showToast("You already own that furniture color! ♡");
    renderCraftSheet();
    return;
  }

  if (!recipeHasMaterials(target.recipe)) {
    showToast("You’re missing part of this recipe!");
    renderCraftSheet();
    return;
  }

  if (!consumeRecipe(target.recipe)) {
    showToast("Something changed in your Inventory — check the recipe again.");
    renderCraftSheet();
    return;
  }

  if (target.type === "duck") {
    const unlocked = unlockDuck(target.id, { notify: false, persistNow: false });

    if (!unlocked) {
      // Should never happen after the checks above. Restore materials rather
      // than ever allowing a duplicate craft to consume them.
      Object.entries(target.recipe).forEach(([itemId, quantity]) => {
        addInventoryItem(itemId, quantity);
      });
      persist();
      showToast("That duck was already unlocked, so your items were returned.");
      renderCraftSheet();
      return;
    }

    persist();
    renderRoom();
    renderCrafter();
    renderCraftSheet();
    showToast(`${target.name} crafted! Added to Duckipedia! 🦆✨`);
    return;
  }

  addInventoryItem(target.id, 1);

  if (target.type === "furniture") {
    if (!save.stats || typeof save.stats !== "object") save.stats = {};
    if (!Array.isArray(save.stats.furnitureCraftedIds)) save.stats.furnitureCraftedIds = [];
    if (!save.stats.furnitureCraftedIds.includes(target.id)) {
      save.stats.furnitureCraftedIds.push(target.id);
    }

    const family = getPaintableFurnitureFamily(target.familyId);
    const baseItemId = family?.baseItemId;
    if (baseItemId && inventoryQuantity(baseItemId) <= 0 && save.roomFurniture && typeof save.roomFurniture === "object") {
      for (const roomFurniture of Object.values(save.roomFurniture)) {
        if (roomFurniture?.[family.furnitureSlot] === baseItemId) {
          roomFurniture[family.furnitureSlot] = target.id;
        }
      }
    }
  }

  persist();
  renderRoom();
  renderInventory();
  renderCrafter();
  renderCraftSheet();

  if (target.type === "furniture") {
    evaluateHonkOfApproval({ notify: false });
    evaluateAchievements();
    showToast(`${target.name} painted! Added to your Furniture Inventory. 🎨`);
  } else {
    showToast(`${target.name} mixed! 🎨`);
  }
}

function openCrafter(tab = currentCrafterTab) {
  currentCrafterTab = ["ducks", "paint", "furniture", "recipes"].includes(tab) ? tab : "ducks";

  closeCloset();
  closeInventoryItem();
  closeShopItem();
  closeDuckDetail();
  closeCraftSheet();

  inventoryPanel.classList.add("hidden");
  shopPanel.classList.add("hidden");
  duckipediaPanel.classList.add("hidden");
  crafterPanel.classList.add("hidden");
  gamesPanel.classList.add("hidden");
  clearDailyTimer();
  dailiesPanel.classList.add("hidden");
  statusPanel.classList.add("hidden");
  tasksPanel.classList.add("hidden");
  taskFormPanel.classList.add("hidden");
  bookPanel.classList.add("hidden");

  crafterPanel.classList.remove("hidden");
  renderCrafter();
}

function closeCrafterToBook() {
  closeCraftSheet();
  crafterPanel.classList.add("hidden");
  bookPanel.classList.remove("hidden");
}

function closeCrafterAll() {
  closeCraftSheet();
  crafterPanel.classList.add("hidden");
  bookPanel.classList.add("hidden");
}


// -------------------- DUCKIPEDIA --------------------

function isDuckUnlocked(duckId) {
  const id = normalizeDuckId(duckId);
  return Boolean(id && save.unlockedDucks.includes(id));
}

// This is the single unlock function Duck Crafter will call next.
// It refuses duplicate unlocks because each duck is a one-time trophy.
function unlockDuck(duckId, options = {}) {
  const id = normalizeDuckId(duckId);
  if (!id || !DUCKS[id]) return false;
  if (isDuckUnlocked(id)) return false;

  save.unlockedDucks.push(id);

  if (options.persistNow !== false) persist();

  if (!duckipediaPanel.classList.contains("hidden")) {
    renderDuckipedia();
    if (selectedDuckId === id) renderDuckDetailPlacementControls();
  }
  if (!statusPanel.classList.contains("hidden")) {
    renderStatus();
  }

  if (options.notify !== false) {
    showToast(`New Duckipedia entry: ${DUCKS[id].name}! 🦆`);
  }

  if (id !== "goose" && !options.skipMilestoneCheck) {
    evaluateHonkOfApproval();
  }

  if (!options.skipAchievementCheck) evaluateAchievements();

  return true;
}

function duckDiscoveryHint(duck) {
  if (duck.recipe) return "Craft this duck in the Duck Crafter to discover it.";

  switch (duck.acquisition) {
    case "honk-of-approval":
      return honkOfApprovalProgressText();
    case "rare-drop":
      return "A very rare surprise. Keep an eye out while playing!";
    case "hidden-sighting":
      return "A tiny secret visitor may rarely appear around the game.";
    case "four-tiny-sightings":
      return "Spot Tiny Ducks four times to complete this special trophy.";
    case "hundred-tiny-sightings":
      return "Spot Tiny Duck 100 times to unlock this very crowded special reward.";
    case "drop-or-shop":
      return "Find or buy a Standard Duck to discover this entry.";
    case "character-happiness-100": {
      const characterName = CHARACTERS[duck.characterId]?.name || "this character";
      return `Reach Happiness Level 100 with ${characterName} to unlock their special duck.`;
    }
    default:
      return "Keep exploring to discover this duck.";
  }
}

function sortedDuckEntries() {
  return Object.entries(DUCKS).sort(([, a], [, b]) => a.name.localeCompare(b.name));
}

function duckEntriesForFilter() {
  return sortedDuckEntries().filter(([id]) => {
    const unlocked = isDuckUnlocked(id);
    if (currentDuckipediaFilter === "unlocked") return unlocked;
    if (currentDuckipediaFilter === "missing") return !unlocked;
    return true;
  });
}

function renderDuckCard(duckId, duck) {
  const unlocked = isDuckUnlocked(duckId);

  const button = document.createElement("button");
  button.type = "button";
  button.className = `duckipedia-card${unlocked ? " unlocked" : " locked"}`;
  button.setAttribute(
    "aria-label",
    unlocked ? `${duck.name}, discovered` : `${duck.name}, not discovered`
  );

  const art = document.createElement("span");
  art.className = "duckipedia-card-art";

  const img = document.createElement("img");
  img.src = duck.file;
  img.alt = "";
  img.loading = "lazy";
  img.decoding = "async";
  art.append(img);

  if (!unlocked) {
    const lock = document.createElement("span");
    lock.className = "duckipedia-lock";
    lock.textContent = "🔒";
    lock.setAttribute("aria-hidden", "true");
    art.append(lock);
  } else {
    const check = document.createElement("span");
    check.className = "duckipedia-check";
    check.textContent = "✓";
    check.setAttribute("aria-hidden", "true");
    art.append(check);
  }

  const name = document.createElement("strong");
  name.textContent = duck.name;

  const state = document.createElement("span");
  state.className = "duckipedia-card-state";
  state.textContent = unlocked ? "Discovered" : "Missing";

  button.append(art, name, state);
  button.addEventListener("click", () => openDuckDetail(duckId));
  return button;
}

function renderDuckipedia() {
  sanitizeUnlockedDucks();

  const unlockedCount = save.unlockedDucks.length;
  const percent = DUCK_TOTAL > 0
    ? Math.round((unlockedCount / DUCK_TOTAL) * 100)
    : 0;

  duckipediaProgressText.textContent = `${unlockedCount} / ${DUCK_TOTAL}`;
  duckipediaBottomCount.textContent = `${unlockedCount} / ${DUCK_TOTAL}`;
  duckipediaPercent.textContent = `${percent}%`;
  duckipediaProgressFill.style.width = `${percent}%`;

  document.querySelectorAll("[data-duck-filter]").forEach(button => {
    const active = button.dataset.duckFilter === currentDuckipediaFilter;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });

  duckipediaGrid.innerHTML = "";
  const entries = duckEntriesForFilter();

  if (!entries.length) {
    const empty = document.createElement("div");
    empty.className = "duckipedia-empty";
    empty.innerHTML = currentDuckipediaFilter === "unlocked"
      ? "<strong>No ducks discovered yet!</strong><span>Your first trophy will appear here once it is unlocked. ♡</span>"
      : "<strong>Nothing missing!</strong><span>You completed the whole Duckipedia! 🦆✨</span>";
    duckipediaGrid.append(empty);
    return;
  }

  entries.forEach(([id, duck]) => {
    duckipediaGrid.append(renderDuckCard(id, duck));
  });
}

function renderDuckDetailArt(duckId, duck, unlocked) {
  duckDetailArt.innerHTML = "";

  const img = document.createElement("img");
  img.src = duck.file;
  img.alt = "";
  if (!unlocked) img.className = "locked";
  duckDetailArt.append(img);

  if (!unlocked) {
    const lock = document.createElement("span");
    lock.className = "duck-detail-lock";
    lock.textContent = "🔒";
    duckDetailArt.append(lock);
  }
}

function openDuckDetail(duckId) {
  const id = normalizeDuckId(duckId);
  const duck = DUCKS[id];
  if (!duck) return;

  selectedDuckId = id;
  const unlocked = isDuckUnlocked(id);

  renderDuckDetailArt(id, duck, unlocked);
  duckDetailState.textContent = unlocked ? "✓ Discovered" : "🔒 Not discovered";
  duckDetailState.classList.toggle("unlocked", unlocked);
  duckDetailName.textContent = duck.name;
  duckDetailHint.textContent = unlocked
    ? "This one-time trophy is permanently unlocked. Choose where this little friend should hang out!"
    : duckDiscoveryHint(duck);

  if (unlocked) renderDuckDetailPlacementControls();
  else duckDetailActions.classList.add("hidden");

  duckDetailSheet.classList.remove("hidden");
  duckDetailSheet.setAttribute("aria-hidden", "false");
}

function closeDuckDetail() {
  selectedDuckId = null;
  duckShelfPicker.classList.add("hidden");
  duckDetailActions.classList.add("hidden");
  duckDetailSheet.classList.add("hidden");
  duckDetailSheet.setAttribute("aria-hidden", "true");
}

function openDuckipedia() {
  closeCloset();
  closeCraftSheet();
  crafterPanel.classList.add("hidden");
  closeInventoryItem();
  closeShopItem();
  closeDuckDetail();
  inventoryPanel.classList.add("hidden");
  shopPanel.classList.add("hidden");
  clearDailyTimer();
  dailiesPanel.classList.add("hidden");
  statusPanel.classList.add("hidden");
  tasksPanel.classList.add("hidden");
  taskFormPanel.classList.add("hidden");
  bookPanel.classList.add("hidden");
  duckipediaPanel.classList.remove("hidden");
  renderDuckipedia();
}

function closeDuckipediaToBook() {
  closeDuckDetail();
  duckipediaPanel.classList.add("hidden");
  bookPanel.classList.remove("hidden");
}

function closeDuckipediaAll() {
  closeDuckDetail();
  duckipediaPanel.classList.add("hidden");
  bookPanel.classList.add("hidden");
}


// -------------------- SHOP --------------------


function getShopRoom(roomId) {
  return ROOMS.find(room => room.id === roomId) || null;
}

function isRoomUnlocked(roomId) {
  const room = getShopRoom(roomId);
  return Boolean(room && (room.unlocked || save.unlockedRooms.includes(roomId)));
}

function renderShopRoomArtwork(container, room) {
  container.innerHTML = "";
  const img = document.createElement("img");
  img.src = room.file;
  img.alt = "";
  img.loading = "lazy";
  img.decoding = "async";
  container.append(img);
}

function renderCharacterUnlockArtwork(container, characterId) {
  container.innerHTML = "";
  const info = CHARACTER_UNLOCKS[characterId];
  if (!info?.image) return;

  const img = document.createElement("img");
  img.src = info.image;
  img.alt = "";
  img.loading = "lazy";
  img.decoding = "async";
  container.append(img);
}

function renderWardrobeShopArtwork(container, wardrobeId, large = false) {
  container.innerHTML = "";
  const meta = getWardrobeShopMeta(wardrobeId);
  if (!meta) return;

  const boxW = large ? 150 : 120;
  const boxH = large ? 126 : 88;
  const previewScale = Number(meta.shopPreviewScale) > 0 ? Number(meta.shopPreviewScale) : 1;
  const targetW = (large ? 112 : 82) * previewScale;
  const targetH = (large ? 102 : 68) * previewScale;

  const thumb = meta.assetIds.length > 1
    ? makeCombinedThumb(meta.assetIds, { boxW, boxH, targetW, targetH, characterId: meta.characterId || "peep" })
    : makeThumb(meta.assetIds[0], { boxW, boxH, targetW, targetH, characterId: meta.characterId || "peep" });

  thumb.classList.add("wardrobe-shop-thumb");
  container.append(thumb);
}

function shopListingKey(listing) {
  if (listing?.roomId) return listing.roomId;
  if (listing?.characterId) return `character:${listing.characterId}`;
  if (listing?.wardrobeId) return `wardrobe:${listing.wardrobeId}`;
  return listing?.itemId || null;
}

function duckRecipesUsingItem(itemId) {
  if (!itemId) return [];

  return Object.entries(DUCKS)
    .filter(([, duck]) =>
      duck?.recipe &&
      Object.prototype.hasOwnProperty.call(duck.recipe, itemId)
    )
    .map(([duckId]) => duckId);
}

function isRepeatBuyShopListing(listing) {
  if (!listing?.itemId) return false;

  const item = ITEMS[listing.itemId];
  if (!item) return false;

  // Standard Duck is the shared base for many duck recipes.
  if (listing.itemId === "standard-duck") return true;

  // Paintable furniture stays in the Shop until the family reaches its 21-piece cap.
  if (isPaintableFurnitureItem(item)) return true;

  // Base paints stay repeat-buy because they are used directly for ducks
  // and/or mixed into several other paint colors.
  if (item.category === "paint") return true;

  // Battle consumables are meant to be stocked and used repeatedly.
  if (item.category === "battle") return true;

  // Food is a repeatable gift consumable, so it should never disappear
  // from the Shop just because the player already owns one.
  if (item.category === "food") return true;

  // Future-proofing: if a non-paint supply is ever reused by multiple duck
  // recipes later, it automatically remains a repeat-buy Shop item.
  return duckRecipesUsingItem(listing.itemId).length > 1;
}

function singleRecipeSupplyNoLongerNeeded(itemId) {
  const recipes = duckRecipesUsingItem(itemId);
  if (recipes.length !== 1) return false;

  // Hide it while the player already owns one.
  if (inventoryQuantity(itemId) > 0) return true;

  // After its one duck has been crafted/discovered, the ingredient stays
  // out of the Shop even though crafting consumed it.
  return isDuckUnlocked(recipes[0]);
}

function shopListingIsOwned(listing) {
  if (listing?.roomId) return isRoomUnlocked(listing.roomId);
  if (listing?.characterId) return save.unlockedCharacters.includes(listing.characterId);
  if (listing?.wardrobeId) return isWardrobeShopUnlocked(listing.wardrobeId);
  if (!listing?.itemId || !ITEMS[listing.itemId]) return false;

  const item = ITEMS[listing.itemId];
  if (item.category === "furniture") return isFurnitureOwned(listing.itemId);

  if (!isRepeatBuyShopListing(listing) &&
      singleRecipeSupplyNoLongerNeeded(listing.itemId)) {
    return true;
  }

  return inventoryQuantity(listing.itemId) > 0;
}

function shouldHideShopListing(listing) {
  if (isRepeatBuyShopListing(listing)) return false;

  // Permanent unlocks disappear once owned. Single-recipe duck supplies
  // also disappear once the player owns one or has completed their recipe.
  return shopListingIsOwned(listing);
}

function shopListingCharacterId(listing) {
  if (listing?.characterId) return listing.characterId;
  if (listing?.wardrobeId) return getWardrobeShopMeta(listing.wardrobeId)?.characterId || "peep";
  return null;
}

function isShopListingAvailableForUnlockedCharacters(listing) {
  // Invitation listings are the mechanism used to unlock an OC, so the
  // invitation itself must remain visible while that OC is still locked.
  if (listing?.characterId) return true;

  const characterId = shopListingCharacterId(listing);

  // Peep is the starter OC, so her Shop items are always eligible to appear.
  // Every future OC follows the same rule automatically: their wardrobe stays
  // completely hidden until their Invitation has been purchased.
  if (!characterId || characterId === "peep") return true;
  return Array.isArray(save.unlockedCharacters) && save.unlockedCharacters.includes(characterId);
}

function assertShopListingCharacterUnlocked(listing, { notify = false } = {}) {
  // Invitations are always allowed. Everything else tied to a non-starter OC
  // is blocked until that OC is actually unlocked.
  if (!listing || listing.characterId) return true;
  if (isShopListingAvailableForUnlockedCharacters(listing)) return true;

  if (notify) {
    const characterId = shopListingCharacterId(listing);
    const characterName = CHARACTERS[characterId]?.name || "that OC";
    showToast(`Invite ${characterName} first to unlock their Shop items! ♡`);
  }
  return false;
}

function getWardrobeShopListingPrice(wardrobeId) {
  for (const listings of Object.values(SHOP_STOCK)) {
    const listing = listings.find(entry => entry.wardrobeId === wardrobeId);
    if (listing) return Math.max(0, Number(listing.price) || 0);
  }
  return 0;
}

function repairLockedOcPurchasesOnce() {
  if (save.ocShopGateRepairV242) return { refunded: 0, removed: [] };

  let refunded = 0;
  const removed = [];
  const unlockedCharacters = new Set(Array.isArray(save.unlockedCharacters) ? save.unlockedCharacters : ["peep"]);

  for (const [wardrobeId, meta] of Object.entries(WARDROBE_SHOP_META)) {
    const characterId = meta?.characterId || "peep";
    if (characterId === "peep" || unlockedCharacters.has(characterId)) continue;

    const owned = Array.isArray(save.characterUnlockedItems?.[characterId])
      ? save.characterUnlockedItems[characterId]
      : [];
    const ownedSet = new Set(owned);
    const unlockIds = Array.isArray(meta.unlockIds) ? meta.unlockIds : [];
    const slippedThrough = unlockIds.length > 0 && unlockIds.every(id => ownedSet.has(id));
    if (!slippedThrough) continue;

    unlockIds.forEach(id => ownedSet.delete(id));
    save.characterUnlockedItems[characterId] = [...ownedSet];
    refunded += getWardrobeShopListingPrice(wardrobeId);
    removed.push(wardrobeId);
  }

  if (refunded > 0) save.coins = Math.max(0, Number(save.coins) || 0) + refunded;
  save.ocShopGateRepairV242 = true;
  return { refunded, removed };
}

function hasCharacterLockedListingsForTab(tab = currentShopTab) {
  const stock = Array.isArray(SHOP_STOCK[tab]) ? SHOP_STOCK[tab] : [];
  return stock.some(listing =>
    !shouldHideShopListing(listing) &&
    !isShopListingAvailableForUnlockedCharacters(listing)
  );
}

function shopStockForTab(tab = currentShopTab) {
  const stock = Array.isArray(SHOP_STOCK[tab]) ? SHOP_STOCK[tab] : [];

  return stock
    .filter(listing => isShopListingAvailableForUnlockedCharacters(listing))
    .filter(listing => !shouldHideShopListing(listing))
    .map((listing, index) => ({
      listing,
      index,
      pinnedFirst: listing.itemId === "standard-duck"
    }))
    .sort((a, b) => {
      if (a.pinnedFirst !== b.pinnedFirst) return a.pinnedFirst ? -1 : 1;
      return a.index - b.index;
    })
    .map(entry => entry.listing);
}

function getShopListing(listingId) {
  for (const listings of Object.values(SHOP_STOCK)) {
    const listing = listings.find(entry => shopListingKey(entry) === listingId);
    if (listing) return listing;
  }
  return null;
}

function renderShop() {
  const category = SHOP_CATEGORIES[currentShopTab] || SHOP_CATEGORIES.supplies;
  const stock = shopStockForTab();

  shopCoinCount.textContent = Number(save.coins || 0).toLocaleString();

  document.querySelectorAll("[data-shop-tab]").forEach(button => {
    const active = button.dataset.shopTab === currentShopTab;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });

  shopGrid.innerHTML = "";

  if (!stock.length) {
    const empty = document.createElement("div");
    empty.className = "shop-empty-state";
    empty.setAttribute("role", "status");

    const sparkle = document.createElement("span");
    sparkle.className = "shop-empty-sparkle";
    sparkle.textContent = "✦";

    const message = document.createElement("strong");
    message.textContent = hasCharacterLockedListingsForTab(currentShopTab)
      ? "More styles will appear here after you invite their OC! ♡"
      : "You've unlocked all of this category for now! Congrats!";

    empty.append(sparkle, message);
    shopGrid.append(empty);
    return;
  }

  stock.forEach(listing => {
    const isRoom = Boolean(listing.roomId);
    const isCharacter = Boolean(listing.characterId);
    const isWardrobe = Boolean(listing.wardrobeId);
    const room = isRoom ? getShopRoom(listing.roomId) : null;
    const wardrobe = isWardrobe ? getWardrobeShopMeta(listing.wardrobeId) : null;
    const characterUnlock = isCharacter ? CHARACTER_UNLOCKS[listing.characterId] : null;
    const item = (!isRoom && !isWardrobe && !isCharacter) ? ITEMS[listing.itemId] : null;

    if (isRoom && !room) return;
    if (isCharacter && !characterUnlock) return;
    if (isWardrobe && !wardrobe) return;
    if (!isRoom && !isWardrobe && !isCharacter && !item) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = `shop-item-card${isRoom ? " shop-room-card" : ""}${isWardrobe ? " shop-wardrobe-card" : ""}`;
    button.dataset.itemId = shopListingKey(listing);

    const art = document.createElement("span");
    art.className = `shop-item-art${isRoom ? " shop-room-art" : ""}`;

    if (isRoom) renderShopRoomArtwork(art, room);
    else if (isCharacter) renderCharacterUnlockArtwork(art, listing.characterId);
    else if (isWardrobe) renderWardrobeShopArtwork(art, listing.wardrobeId);
    else renderItemArtwork(art, item);

    const copy = document.createElement("span");
    copy.className = "shop-item-copy";

    const name = document.createElement("strong");
    name.textContent = isRoom ? room.name : isCharacter ? characterUnlock.name : isWardrobe ? wardrobe.label : item.name;

    const price = document.createElement("span");
    price.className = "shop-item-price";
    price.innerHTML = `<img src="assets/ui/pink-coin.png" alt=""> ${listing.price}`;

    const owned = document.createElement("span");
    owned.className = "shop-item-owned";

    if (isRoom) {
      const unlocked = isRoomUnlocked(room.id);
      owned.textContent = unlocked ? "Unlocked ✓" : "Locked";
      button.classList.toggle("purchased", unlocked);
    } else if (isCharacter) {
      const unlocked = save.unlockedCharacters.includes(listing.characterId);
      owned.textContent = unlocked ? "Unlocked ✓" : "Locked";
      button.classList.toggle("purchased", unlocked);
    } else if (isWardrobe) {
      const unlocked = isWardrobeShopUnlocked(listing.wardrobeId);
      owned.textContent = unlocked ? "Unlocked ✓" : "Locked";
      button.classList.toggle("purchased", unlocked);
    } else if (item.category === "furniture") {
      if (isPaintableFurnitureItem(item)) {
        const totalOwned = furnitureFamilyTotalOwned(item.furnitureFamily);
        const maxOwned = getPaintableFurnitureFamily(item.furnitureFamily)?.maxOwned || FURNITURE_COLOR_OPTIONS.length;
        owned.textContent = `Owned ×${totalOwned} / ${maxOwned}`;
        button.classList.toggle("purchased", totalOwned >= maxOwned);
      } else {
        const ownedFurniture = isFurnitureOwned(listing.itemId);
        owned.textContent = ownedFurniture ? "Owned ✓" : "Not owned";
        button.classList.toggle("purchased", ownedFurniture);
      }
    } else {
      owned.textContent = `Owned ×${inventoryQuantity(listing.itemId)}`;
    }

    copy.append(name, price, owned);
    button.append(art, copy);
    button.addEventListener("click", () =>
      openShopItem(shopListingKey(listing))
    );
    shopGrid.append(button);
  });
}

function openShopItem(listingId) {
  const listing = getShopListing(listingId);
  if (!listing) return;
  if (!assertShopListingCharacterUnlocked(listing, { notify: true })) return;

  if (listing.roomId) {
    if (!getShopRoom(listing.roomId)) return;
  } else if (listing.characterId) {
    if (!CHARACTER_UNLOCKS[listing.characterId]) return;
  } else if (listing.wardrobeId) {
    if (!getWardrobeShopMeta(listing.wardrobeId)) return;
  } else if (!ITEMS[listing.itemId]) {
    return;
  }

  selectedShopItemId = listingId;
  selectedShopQuantity = 1;
  shopItemSheet.classList.remove("hidden");
  shopItemSheet.setAttribute("aria-hidden", "false");
  renderShopItemSheet();
}

function closeShopItem() {
  selectedShopItemId = null;
  selectedShopQuantity = 1;
  shopItemSheet.classList.add("hidden");
  shopItemSheet.setAttribute("aria-hidden", "true");
}

function renderShopItemSheet() {
  const listingId = selectedShopItemId;
  const listing = getShopListing(listingId);

  if (!listing || !assertShopListingCharacterUnlocked(listing)) {
    closeShopItem();
    return;
  }

  const isRoom = Boolean(listing.roomId);
  const isCharacter = Boolean(listing.characterId);
  const isWardrobe = Boolean(listing.wardrobeId);
  const room = isRoom ? getShopRoom(listing.roomId) : null;
  const characterUnlock = isCharacter ? CHARACTER_UNLOCKS[listing.characterId] : null;
  const wardrobe = isWardrobe ? getWardrobeShopMeta(listing.wardrobeId) : null;
  const item = (!isRoom && !isWardrobe && !isCharacter) ? ITEMS[listing.itemId] : null;

  if (isRoom && !room) {
    closeShopItem();
    return;
  }
  if (isCharacter && !characterUnlock) {
    closeShopItem();
    return;
  }
  if (isWardrobe && !wardrobe) {
    closeShopItem();
    return;
  }
  if (!isRoom && !isWardrobe && !isCharacter && !item) {
    closeShopItem();
    return;
  }

  const category = SHOP_CATEGORIES[currentShopTab] || SHOP_CATEGORIES.supplies;

  if (isRoom) {
    const unlocked = isRoomUnlocked(room.id);
    const total = listing.price;
    const balance = Number(save.coins || 0);
    const shortfall = Math.max(0, total - balance);

    renderShopRoomArtwork(shopSheetIcon, room);
    shopSheetCategory.textContent = category.label;
    shopSheetName.textContent = room.name;
    shopPriceLabel.textContent = "Unlock price";
    shopSheetUnitPrice.textContent = `${listing.price} Pink Coins`;
    shopSheetOwned.textContent = unlocked ? "Unlocked ✓" : "Locked";
    shopQuantityBlock.classList.add("hidden");
    shopSheetTotal.textContent = `${total} Pink Coins`;

    if (unlocked) {
      shopAffordMessage.textContent = "This room style is already permanently unlocked. ♡";
      shopBuyButton.disabled = true;
      shopBuyButton.textContent = "Already Unlocked ✓";
    } else if (shortfall > 0) {
      shopAffordMessage.textContent = `You need ${shortfall} more Pink Coin${shortfall === 1 ? "" : "s"} to unlock this room.`;
      shopBuyButton.disabled = true;
      shopBuyButton.textContent = "Not Enough Pink Coins";
    } else {
      shopAffordMessage.textContent = "Once purchased, this room stays unlocked permanently.";
      shopBuyButton.disabled = false;
      shopBuyButton.innerHTML = `<span>Unlock Room</span><span class="shop-buy-total"><img src="assets/ui/pink-coin.png" alt=""> ${total}</span>`;
    }
    return;
  }

  if (isCharacter) {
    const unlocked = save.unlockedCharacters.includes(listing.characterId);
    const total = listing.price;
    const balance = Number(save.coins || 0);
    const shortfall = Math.max(0, total - balance);

    renderCharacterUnlockArtwork(shopSheetIcon, listing.characterId);
    shopSheetCategory.textContent = category.label;
    shopSheetName.textContent = characterUnlock.name;
    shopPriceLabel.textContent = "Unlock price";
    shopSheetUnitPrice.textContent = `${listing.price} Pink Coins`;
    shopSheetOwned.textContent = unlocked ? "Unlocked ✓" : "Locked";
    shopQuantityBlock.classList.add("hidden");
    shopSheetTotal.textContent = `${total} Pink Coins`;

    if (unlocked) {
      shopAffordMessage.textContent = `${CHARACTERS[listing.characterId].name} is already available in Profiles. ♡`;
      shopBuyButton.disabled = true;
      shopBuyButton.textContent = "Already Unlocked ✓";
    } else if (shortfall > 0) {
      shopAffordMessage.textContent = `You need ${shortfall} more Pink Coin${shortfall === 1 ? "" : "s"} to invite this OC.`;
      shopBuyButton.disabled = true;
      shopBuyButton.textContent = "Not Enough Pink Coins";
    } else {
      shopAffordMessage.textContent = characterUnlock.priceText;
      shopBuyButton.disabled = false;
      shopBuyButton.innerHTML = `<span>Invite ${CHARACTERS[listing.characterId].name}</span><span class="shop-buy-total"><img src="assets/ui/pink-coin.png" alt=""> ${total}</span>`;
    }
    return;
  }

  if (isWardrobe) {
    const unlocked = isWardrobeShopUnlocked(listing.wardrobeId);
    const total = listing.price;
    const balance = Number(save.coins || 0);
    const shortfall = Math.max(0, total - balance);

    renderWardrobeShopArtwork(shopSheetIcon, listing.wardrobeId, true);
    shopSheetCategory.textContent = category.label;
    shopSheetName.textContent = wardrobe.label;
    shopPriceLabel.textContent = "Unlock price";
    shopSheetUnitPrice.textContent = `${listing.price} Pink Coins`;
    shopSheetOwned.textContent = unlocked ? "Unlocked ✓" : "Locked";
    shopQuantityBlock.classList.add("hidden");
    shopSheetTotal.textContent = `${total} Pink Coins`;

    if (unlocked) {
      shopAffordMessage.textContent = "This style is already permanently unlocked. ♡";
      shopBuyButton.disabled = true;
      shopBuyButton.textContent = "Already Unlocked ✓";
    } else if (shortfall > 0) {
      shopAffordMessage.textContent = `You need ${shortfall} more Pink Coin${shortfall === 1 ? "" : "s"} to unlock this style.`;
      shopBuyButton.disabled = true;
      shopBuyButton.textContent = "Not Enough Pink Coins";
    } else {
      shopAffordMessage.textContent = "Once unlocked, this style stays in the Closet permanently.";
      shopBuyButton.disabled = false;
      shopBuyButton.innerHTML = `<span>Unlock Style</span><span class="shop-buy-total"><img src="assets/ui/pink-coin.png" alt=""> ${total}</span>`;
    }
    return;
  }

  if (item.category === "furniture" && isPaintableFurnitureItem(item)) {
    const family = getPaintableFurnitureFamily(item.furnitureFamily);
    const owned = furnitureFamilyTotalOwned(item.furnitureFamily);
    const remaining = furnitureFamilyRemainingCapacity(item.furnitureFamily);
    const maxQuantity = Math.max(1, Math.min(Number(family?.maxOwned) || FURNITURE_COLOR_OPTIONS.length, remaining || 1));
    selectedShopQuantity = remaining > 0
      ? Math.max(1, Math.min(maxQuantity, Number(selectedShopQuantity) || 1))
      : 1;

    const total = listing.price * selectedShopQuantity;
    const balance = Number(save.coins || 0);
    const shortfall = Math.max(0, total - balance);

    renderItemArtwork(shopSheetIcon, item);
    shopSheetCategory.textContent = category.label;
    shopSheetName.textContent = family?.name || item.name;
    shopPriceLabel.textContent = "Price each";
    shopSheetUnitPrice.textContent = `${listing.price} Pink Coins`;
    shopSheetOwned.textContent = `×${owned} / ${family?.maxOwned || 21}`;
    shopQuantityBlock.classList.toggle("hidden", remaining <= 0);
    shopQtyValue.textContent = String(selectedShopQuantity);
    shopSheetTotal.textContent = remaining > 0 ? `${total} Pink Coins` : "Maximum owned";
    shopQtyMinus.disabled = selectedShopQuantity <= 1 || remaining <= 0;
    shopQtyPlus.disabled = selectedShopQuantity >= maxQuantity || remaining <= 0;

    if (remaining <= 0) {
      shopAffordMessage.textContent = `You already own the maximum ${family?.maxOwned || 21} ${family?.name || "Furniture"} pieces — one for every color. ♡`;
      shopBuyButton.disabled = true;
      shopBuyButton.textContent = "Maximum 21 Owned ✓";
    } else if (shortfall > 0) {
      shopAffordMessage.textContent = `You need ${shortfall} more Pink Coin${shortfall === 1 ? "" : "s"} for this purchase.`;
      shopBuyButton.disabled = true;
      shopBuyButton.textContent = "Not Enough Pink Coins";
    } else {
      shopAffordMessage.textContent = `New ${family?.name || "Furniture"} start White. Use Furniture Crafting + Paint to recolor them.`;
      shopBuyButton.disabled = false;
      shopBuyButton.innerHTML = `<span>Buy ×${selectedShopQuantity}</span><span class="shop-buy-total"><img src="assets/ui/pink-coin.png" alt=""> ${total}</span>`;
    }
    return;
  }

  if (item.category === "furniture") {
    const owned = isFurnitureOwned(listing.itemId);
    const total = listing.price;
    const balance = Number(save.coins || 0);
    const shortfall = Math.max(0, total - balance);

    renderItemArtwork(shopSheetIcon, item);
    shopSheetCategory.textContent = category.label;
    shopSheetName.textContent = item.name;
    shopPriceLabel.textContent = "Furniture price";
    shopSheetUnitPrice.textContent = `${listing.price} Pink Coins`;
    shopSheetOwned.textContent = owned ? "Owned ✓" : "Not owned";
    shopQuantityBlock.classList.add("hidden");
    shopSheetTotal.textContent = `${total} Pink Coins`;

    if (owned) {
      shopAffordMessage.textContent = "You already own this reusable furniture style. ♡";
      shopBuyButton.disabled = true;
      shopBuyButton.textContent = "Already Owned ✓";
    } else if (shortfall > 0) {
      shopAffordMessage.textContent = `You need ${shortfall} more Pink Coin${shortfall === 1 ? "" : "s"} for this furniture.`;
      shopBuyButton.disabled = true;
      shopBuyButton.textContent = "Not Enough Pink Coins";
    } else {
      shopAffordMessage.textContent = "Buy once, then use this furniture in any unlocked room.";
      shopBuyButton.disabled = false;
      shopBuyButton.innerHTML = `<span>Buy Furniture</span><span class="shop-buy-total"><img src="assets/ui/pink-coin.png" alt=""> ${total}</span>`;
    }
    return;
  }

  if (!isRepeatBuyShopListing(listing)) {
    const total = listing.price;
    const balance = Number(save.coins || 0);
    const shortfall = Math.max(0, total - balance);

    selectedShopQuantity = 1;
    renderItemArtwork(shopSheetIcon, item);
    shopSheetCategory.textContent = category.label;
    shopSheetName.textContent = item.name;
    shopPriceLabel.textContent = "Price";
    shopSheetUnitPrice.textContent = `${listing.price} Pink Coins`;
    shopSheetOwned.textContent = `×${inventoryQuantity(listing.itemId)}`;
    shopQuantityBlock.classList.add("hidden");
    shopSheetTotal.textContent = `${total} Pink Coins`;

    if (shortfall > 0) {
      shopAffordMessage.textContent = `You need ${shortfall} more Pink Coin${shortfall === 1 ? "" : "s"} for this item.`;
      shopBuyButton.disabled = true;
      shopBuyButton.textContent = "Not Enough Pink Coins";
    } else {
      shopAffordMessage.textContent = "This supply is only needed for one duck recipe, so you only need to buy one.";
      shopBuyButton.disabled = false;
      shopBuyButton.innerHTML = `<span>Buy Item</span><span class="shop-buy-total"><img src="assets/ui/pink-coin.png" alt=""> ${total}</span>`;
    }
    return;
  }

  selectedShopQuantity = Math.max(1, Math.min(SHOP_MAX_QUANTITY, Number(selectedShopQuantity) || 1));

  const total = listing.price * selectedShopQuantity;
  const balance = Number(save.coins || 0);
  const shortfall = Math.max(0, total - balance);

  renderItemArtwork(shopSheetIcon, item);
  shopSheetCategory.textContent = category.label;
  shopSheetName.textContent = item.name;
  shopPriceLabel.textContent = "Price each";
  shopSheetUnitPrice.textContent = `${listing.price} Pink Coins`;
  shopSheetOwned.textContent = `×${inventoryQuantity(listing.itemId)}`;
  shopQuantityBlock.classList.remove("hidden");
  shopQtyValue.textContent = String(selectedShopQuantity);
  shopSheetTotal.textContent = `${total} Pink Coins`;

  shopQtyMinus.disabled = selectedShopQuantity <= 1;
  shopQtyPlus.disabled = selectedShopQuantity >= SHOP_MAX_QUANTITY;

  if (shortfall > 0) {
    shopAffordMessage.textContent = `You need ${shortfall} more Pink Coin${shortfall === 1 ? "" : "s"} for this purchase.`;
    shopBuyButton.disabled = true;
  } else {
    shopAffordMessage.textContent = selectedShopQuantity === SHOP_MAX_QUANTITY
      ? "Maximum purchase quantity selected. ♡"
      : "";
    shopBuyButton.disabled = false;
  }

  shopBuyButton.innerHTML = `<span>Buy ×${selectedShopQuantity}</span><span class="shop-buy-total"><img src="assets/ui/pink-coin.png" alt=""> ${total}</span>`;
}

function changeShopQuantity(amount) {
  const listing = getShopListing(selectedShopItemId);
  const item = listing?.itemId ? ITEMS[listing.itemId] : null;
  const maxQuantity = isPaintableFurnitureItem(item)
    ? Math.max(1, furnitureFamilyRemainingCapacity(item.furnitureFamily))
    : SHOP_MAX_QUANTITY;

  selectedShopQuantity = Math.max(
    1,
    Math.min(maxQuantity, selectedShopQuantity + amount)
  );
  renderShopItemSheet();
}

function buyShopItem() {
  const listingId = selectedShopItemId;
  const listing = getShopListing(listingId);
  if (!listing) return;
  if (!assertShopListingCharacterUnlocked(listing, { notify: true })) {
    closeShopItem();
    renderShop();
    return;
  }

  if (listing.roomId) {
    const room = getShopRoom(listing.roomId);
    if (!room) return;

    if (isRoomUnlocked(room.id)) {
      showToast(`${room.name} is already unlocked! ♡`);
      renderShopItemSheet();
      return;
    }

    if (save.coins < listing.price) {
      showToast("Not quite enough Pink Coins yet! ♡");
      renderShopItemSheet();
      return;
    }

    save.coins -= listing.price;
    if (!save.unlockedRooms.includes(room.id)) {
      save.unlockedRooms.push(room.id);
    }
    persist();

    const roomToGrowWasNew = evaluateRoomToGrow({ notify: false });
    evaluateHonkOfApproval({ notify: false });
    evaluateAchievements();

    renderRoom();
    renderRoomPicker();
    renderShop();
    closeShopItem();

    if (roomToGrowWasNew) {
      showToast("🏠 Room to Grow! Shelf of Ducks + Wallpaper unlocked!");
    } else {
      showToast(`${room.name} unlocked! You can select it from the room picker. ♡`);
    }
    return;
  }

  if (listing.characterId) {
    const character = CHARACTERS[listing.characterId];
    const info = CHARACTER_UNLOCKS[listing.characterId];
    if (!character || !info) return;

    if (save.unlockedCharacters.includes(listing.characterId)) {
      showToast(`${character.name} is already unlocked! ♡`);
      renderShopItemSheet();
      return;
    }

    if (save.coins < listing.price) {
      showToast("Not quite enough Pink Coins yet! ♡");
      renderShopItemSheet();
      return;
    }

    save.coins -= listing.price;
    save.unlockedCharacters.push(listing.characterId);
    save.unlockedCharacters = [...new Set(save.unlockedCharacters)];
    persist();

    renderShop();
    renderProfiles();
    closeShopItem();
    showToast(`${character.name} joined your hub! ♡`);
    return;
  }

  if (listing.wardrobeId) {
    const wardrobe = getWardrobeShopMeta(listing.wardrobeId);
    if (!wardrobe) return;

    if (isWardrobeShopUnlocked(listing.wardrobeId)) {
      showToast(`${wardrobe.label} is already unlocked! ♡`);
      renderShopItemSheet();
      return;
    }

    if (save.coins < listing.price) {
      showToast("Not quite enough Pink Coins yet! ♡");
      renderShopItemSheet();
      return;
    }

    save.coins -= listing.price;
    unlockWardrobeShopItem(listing.wardrobeId);
    persist();

    renderRoom();
    renderShop();
    closeShopItem();
    renderCloset();

    showToast(`${wardrobe.label} unlocked for the Closet! ♡`);
    return;
  }

  const item = ITEMS[listing.itemId];
  if (!item) return;

  if (item.category === "furniture" && isPaintableFurnitureItem(item)) {
    const family = getPaintableFurnitureFamily(item.furnitureFamily);
    const remaining = furnitureFamilyRemainingCapacity(item.furnitureFamily);
    if (remaining <= 0) {
      showToast(`You already own the maximum ${family?.maxOwned || 21} ${family?.name || "Furniture"} pieces! ♡`);
      renderShopItemSheet();
      return;
    }

    const amount = Math.max(1, Math.min(remaining, Math.floor(Number(selectedShopQuantity) || 1)));
    const total = listing.price * amount;
    if (save.coins < total) {
      showToast("Not quite enough Pink Coins yet! ♡");
      renderShopItemSheet();
      return;
    }

    save.coins -= total;
    addInventoryItem(family?.baseItemId || listing.itemId, amount);
    persist();

    evaluateHonkOfApproval({ notify: false });
    evaluateAchievements();

    renderRoom();
    renderShop();
    renderInventory();
    closeShopItem();
    showToast(`${family?.name || item.name} ×${amount} added in White! Paint them in Furniture Crafting. ♡`);
    return;
  }

  if (item.category === "furniture") {
    if (isFurnitureOwned(listing.itemId)) {
      showToast(`${item.name} is already in your Furniture Inventory! ♡`);
      renderShopItemSheet();
      return;
    }

    if (save.coins < listing.price) {
      showToast("Not quite enough Pink Coins yet! ♡");
      renderShopItemSheet();
      return;
    }

    save.coins -= listing.price;
    addInventoryItem(listing.itemId, 1);
    persist();

    evaluateHonkOfApproval({ notify: false });
    evaluateAchievements();

    renderRoom();
    renderShop();
    closeShopItem();
    showToast(`${item.name} added to your Furniture Inventory! ♡`);
    return;
  }

  if (!isRepeatBuyShopListing(listing)) {
    if (shopListingIsOwned(listing)) {
      renderShop();
      closeShopItem();
      showToast(`${item.name} is already taken care of for its recipe! ♡`);
      return;
    }

    if (save.coins < listing.price) {
      showToast("Not quite enough Pink Coins yet! ♡");
      renderShopItemSheet();
      return;
    }

    save.coins -= listing.price;
    addInventoryItem(listing.itemId, 1);
    persist();

    renderRoom();
    renderShop();
    closeShopItem();

    showToast(`Bought ${item.name}! ♡`);
    return;
  }

  const quantity = Math.max(1, Math.min(SHOP_MAX_QUANTITY, Number(selectedShopQuantity) || 1));
  const total = listing.price * quantity;

  if (save.coins < total) {
    showToast("Not quite enough Pink Coins yet! ♡");
    renderShopItemSheet();
    return;
  }

  save.coins -= total;
  addInventoryItem(listing.itemId, quantity);
  persist();

  renderRoom();
  renderShop();
  renderShopItemSheet();

  showToast(`Bought ${item.name} ×${quantity} for ${total} Pink Coins!`);
}

function openShop() {
  closeCloset();
  closeCraftSheet();
  crafterPanel.classList.add("hidden");
  closeDuckDetail();
  duckipediaPanel.classList.add("hidden");
  closeInventoryItem();
  closeShopItem();
  inventoryPanel.classList.add("hidden");
  clearDailyTimer();
  dailiesPanel.classList.add("hidden");
  statusPanel.classList.add("hidden");
  tasksPanel.classList.add("hidden");
  taskFormPanel.classList.add("hidden");
  bookPanel.classList.add("hidden");
  shopPanel.classList.remove("hidden");
  renderShop();
}

function closeShopToBook() {
  closeShopItem();
  shopPanel.classList.add("hidden");
  bookPanel.classList.remove("hidden");
}

function closeShopAll() {
  closeShopItem();
  shopPanel.classList.add("hidden");
  bookPanel.classList.add("hidden");
}


// -------------------- DAILIES --------------------

function getSimpleDaily(key) {
  if (!save.dailies) save.dailies = structuredClone(DEFAULT_SAVE.dailies);
  if (!save.dailies[key]) save.dailies[key] = structuredClone(DEFAULT_SAVE.dailies[key]);

  const daily = save.dailies[key];
  const today = localDateKey();

  // Like Shopping Trip, crossing midnight refreshes starts but never destroys
  // an activity that was already in progress or waiting to be claimed.
  if (daily.dayKey !== today) {
    daily.dayKey = today;
    daily.usedToday = 0;
    persist();
  }

  return daily;
}

function choosePaintMixingReward() {
  const total = PAINT_MIXING_LOOT_POOL.reduce((sum, entry) => sum + entry.weight, 0);
  let roll = Math.random() * total;
  for (const entry of PAINT_MIXING_LOOT_POOL) {
    roll -= entry.weight;
    if (roll <= 0) return entry.id;
  }
  return PAINT_MIXING_LOOT_POOL[0].id;
}

function renderSimpleDailyState(container, iconOrItem, title, detail) {
  container.innerHTML = "";

  let art;
  if (iconOrItem && ITEMS[iconOrItem]) {
    art = document.createElement("div");
    art.className = "shopping-state-art";
    renderItemArtwork(art, ITEMS[iconOrItem]);
  } else {
    art = document.createElement("div");
    art.className = "shopping-state-icon";
    art.textContent = iconOrItem || "♡";
  }

  const copy = document.createElement("div");
  const strong = document.createElement("strong");
  strong.textContent = title;
  const p = document.createElement("p");
  p.textContent = detail;
  copy.append(strong, p);
  container.append(art, copy);
}

function characterDateIcon(characterId) {
  return FRIENDSHIP_DATE_ICONS[characterId] || FRIENDSHIP_DATE_ICONS.peep;
}

function renderPaintMixingDaily() {
  const daily = getSimpleDaily("paintMixing");
  const used = Number(daily.usedToday || 0);
  const remaining = Math.max(0, PAINT_MIXING_DAILY_LIMIT - used);
  paintMixUsesBadge.textContent = `${used} / ${PAINT_MIXING_DAILY_LIMIT}`;

  if (daily.pendingReward && !daily.activeUntil) {
    const reward = ITEMS[daily.pendingReward];
    renderSimpleDailyState(
      paintMixState,
      daily.pendingReward,
      "Your Paint is ready!",
      reward ? `Claim your ${reward.name}.` : "A surprise Paint is ready to claim."
    );
    paintMixActionButton.disabled = false;
    paintMixActionButton.textContent = "Claim Paint";
    paintMixActionButton.dataset.action = "claim";
    return;
  }

  if (daily.activeUntil) {
    renderSimpleDailyState(
      paintMixState,
      "🎨",
      "Mixing in progress…",
      `Ready in ${formatCountdown(Number(daily.activeUntil) - Date.now())}`
    );
    const countdown = paintMixState.querySelector("p");
    if (countdown) countdown.id = "paintMixCountdown";

    paintMixActionButton.disabled = true;
    paintMixActionButton.textContent = "Mixing…";
    paintMixActionButton.dataset.action = "waiting";
    return;
  }

  if (remaining > 0) {
    renderSimpleDailyState(
      paintMixState,
      "🎨",
      `${remaining} mix${remaining === 1 ? "" : "es"} left today`,
      "Each one takes an hour and gives exactly one Paint."
    );
    paintMixActionButton.disabled = false;
    paintMixActionButton.textContent = "Start 1 Hour Mix";
    paintMixActionButton.dataset.action = "start";
  } else {
    renderSimpleDailyState(
      paintMixState,
      "♡",
      "All mixed for today",
      "Two fresh mixes will be ready tomorrow."
    );
    paintMixActionButton.disabled = true;
    paintMixActionButton.textContent = "Come back tomorrow ♡";
    paintMixActionButton.dataset.action = "done";
  }
}

function startPaintMixing() {
  const daily = getSimpleDaily("paintMixing");
  if (daily.activeUntil || daily.pendingReward) return;
  if (Number(daily.usedToday || 0) >= PAINT_MIXING_DAILY_LIMIT) return;

  daily.usedToday = Number(daily.usedToday || 0) + 1;
  daily.activeUntil = Date.now() + PAINT_MIXING_DURATION_MS;
  daily.pendingReward = choosePaintMixingReward();
  daily.lastReward = null;

  persist();
  renderDailies();
  showToast("Paint Mixing started! Your Paint will be ready in 1 hour. 🎨");
}

function claimPaintMixingReward() {
  const daily = getSimpleDaily("paintMixing");
  if (!daily.pendingReward || daily.activeUntil) return;

  const rewardId = normalizeItemId(daily.pendingReward);
  const reward = ITEMS[rewardId];

  if (!rewardId || !reward) {
    daily.pendingReward = null;
    persist();
    renderDailies();
    showToast("That Paint reward could not be recognized.");
    return;
  }

  addInventoryItem(rewardId, 1);
  daily.lastReward = rewardId;
  daily.pendingReward = null;

  persist();
  renderDailies();
  showToast(`${reward.name} added to Inventory! 🎨`);
}

function handlePaintMixingAction() {
  const action = paintMixActionButton.dataset.action;
  if (action === "start") startPaintMixing();
  else if (action === "claim") claimPaintMixingReward();
}

function renderFriendshipDateDaily() {
  const daily = getSimpleDaily("friendshipDate");
  const used = Number(daily.usedToday || 0);
  friendshipUsesBadge.textContent = `${used} / ${FRIENDSHIP_DATE_DAILY_LIMIT}`;

  if (daily.pendingHappiness && daily.activeCharacterId && !daily.activeUntil) {
    const character = CHARACTERS[daily.activeCharacterId];
    renderSimpleDailyState(
      friendshipState,
      "♡",
      `${character?.name || "Your OC"} is back!`,
      `Finish the date to earn +${FRIENDSHIP_DATE_HAPPINESS} Happiness.`
    );
    friendshipActionButton.disabled = false;
    friendshipActionButton.textContent = "Finish Date";
    friendshipActionButton.dataset.action = "claim";
    return;
  }

  if (daily.activeUntil && daily.activeCharacterId) {
    const character = CHARACTERS[daily.activeCharacterId];
    renderSimpleDailyState(
      friendshipState,
      "♡",
      `${character?.name || "Your OC"} is on a Friendship Date…`,
      `Back in ${formatCountdown(Number(daily.activeUntil) - Date.now())}`
    );
    const countdown = friendshipState.querySelector("p");
    if (countdown) countdown.id = "friendshipCountdown";

    friendshipActionButton.disabled = true;
    friendshipActionButton.textContent = "Date in progress";
    friendshipActionButton.dataset.action = "waiting";
    return;
  }

  if (used < FRIENDSHIP_DATE_DAILY_LIMIT) {
    renderSimpleDailyState(
      friendshipState,
      "♡",
      "Choose who gets the Happiness",
      "It does not have to be the OC currently standing in the room."
    );
    friendshipActionButton.disabled = false;
    friendshipActionButton.textContent = "Choose OC";
    friendshipActionButton.dataset.action = "choose";
  } else if (daily.lastCharacterId) {
    const character = CHARACTERS[daily.lastCharacterId];
    renderSimpleDailyState(
      friendshipState,
      "♡",
      `${character?.name || "Your OC"} had a lovely date!`,
      `+${Number(daily.lastGain || FRIENDSHIP_DATE_HAPPINESS)} Happiness today.`
    );
    friendshipActionButton.disabled = true;
    friendshipActionButton.textContent = "Date complete ♡";
    friendshipActionButton.dataset.action = "done";
  } else {
    renderSimpleDailyState(friendshipState, "♡", "Date complete", "A new Friendship Date will be available tomorrow.");
    friendshipActionButton.disabled = true;
    friendshipActionButton.textContent = "Come back tomorrow ♡";
    friendshipActionButton.dataset.action = "done";
  }
}

function openFriendshipChooser() {
  const daily = getSimpleDaily("friendshipDate");
  if (daily.activeUntil || daily.pendingHappiness) return;
  if (Number(daily.usedToday || 0) >= FRIENDSHIP_DATE_DAILY_LIMIT) return;

  friendshipCharacterList.innerHTML = "";

  const unlockedIds = (Array.isArray(save.unlockedCharacters) ? save.unlockedCharacters : ["peep"])
    .filter(id => CHARACTERS[id]);

  unlockedIds.forEach(characterId => {
    const character = CHARACTERS[characterId];
    const happiness = getCharacterHappinessInfo(characterId);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "daily-character-choice";

    const img = document.createElement("img");
    img.className = "daily-character-choice-icon";
    img.src = characterDateIcon(characterId);
    img.alt = "";

    const copy = document.createElement("span");
    copy.className = "daily-character-choice-copy";
    const strong = document.createElement("strong");
    strong.textContent = character.name;
    const small = document.createElement("small");
    small.textContent = `Happiness Lv. ${happiness.level} · +${FRIENDSHIP_DATE_HAPPINESS}`;
    copy.append(strong, small);

    button.append(img, copy);
    button.addEventListener("click", () => startFriendshipDate(characterId));
    friendshipCharacterList.appendChild(button);
  });

  friendshipChooser.classList.remove("hidden");
  friendshipChooser.setAttribute("aria-hidden", "false");
}

function closeFriendshipChooser() {
  friendshipChooser.classList.add("hidden");
  friendshipChooser.setAttribute("aria-hidden", "true");
}

function startFriendshipDate(characterId) {
  const daily = getSimpleDaily("friendshipDate");
  if (daily.activeUntil || daily.pendingHappiness) return;
  if (Number(daily.usedToday || 0) >= FRIENDSHIP_DATE_DAILY_LIMIT) return;
  if (!save.unlockedCharacters?.includes(characterId) || !CHARACTERS[characterId]) return;

  daily.usedToday = Number(daily.usedToday || 0) + 1;
  daily.activeUntil = Date.now() + FRIENDSHIP_DATE_DURATION_MS;
  daily.activeCharacterId = characterId;
  daily.pendingHappiness = false;
  daily.lastCharacterId = null;
  daily.lastGain = 0;

  persist();
  closeFriendshipChooser();
  renderDailies();
  showToast(`${CHARACTERS[characterId].name} went on a Friendship Date! Back in 1 hour. ♡`);
}

function claimFriendshipDate() {
  const daily = getSimpleDaily("friendshipDate");
  if (!daily.pendingHappiness || !daily.activeCharacterId || daily.activeUntil) return;

  const characterId = daily.activeCharacterId;
  const gained = addCharacterHappiness(FRIENDSHIP_DATE_HAPPINESS, characterId);

  daily.pendingHappiness = false;
  daily.activeCharacterId = null;
  daily.lastCharacterId = characterId;
  daily.lastGain = gained;

  persist();
  renderDailies();
  renderRoom();

  if (characterId === save.selectedCharacter) setExpression("expression-happy", 2200);
  showToast(`${CHARACTERS[characterId].name} gained +${gained} Happiness! ♡`);
}

function handleFriendshipAction() {
  const action = friendshipActionButton.dataset.action;
  if (action === "choose") openFriendshipChooser();
  else if (action === "claim") claimFriendshipDate();
}

function getShoppingDaily() {
  if (!save.dailies) save.dailies = structuredClone(DEFAULT_SAVE.dailies);
  if (!save.dailies.shopping) save.dailies.shopping = structuredClone(DEFAULT_SAVE.dailies.shopping);

  const daily = save.dailies.shopping;
  const today = localDateKey();

  // A new calendar day restores the three starts. An already-running trip
  // is preserved so closing the page or crossing midnight never loses it.
  if (daily.dayKey !== today) {
    daily.dayKey = today;
    daily.usedToday = 0;
    persist();
  }

  return daily;
}

function inventoryQuantity(itemId) {
  return Math.max(0, Number(save.inventory?.[itemId]) || 0);
}

function totalInventoryItems(category = null) {
  return Object.entries(save.inventory || {}).reduce((sum, [itemId, quantity]) => {
    const item = ITEMS[itemId];
    if (!item || (category && item.category !== category)) return sum;
    return sum + Math.max(0, Number(quantity) || 0);
  }, 0);
}

function addInventoryItem(itemId, quantity = 1) {
  const id = normalizeItemId(itemId);
  if (!id || !ITEMS[id]) return false;
  if (!save.inventory) save.inventory = {};
  save.inventory[id] = inventoryQuantity(id) + Math.max(1, Number(quantity) || 1);

  // Standard Duck is both a consumable crafting base and a Duckipedia trophy.
  // The first one found or purchased permanently discovers its entry.
  if (id === "standard-duck") {
    unlockDuck("standard-duck", { notify: false, persistNow: false });
  }

  return true;
}

function removeInventoryItem(itemId, quantity = 1) {
  const id = normalizeItemId(itemId);
  if (!id) return false;
  const current = inventoryQuantity(id);
  const amount = Math.max(1, Number(quantity) || 1);
  if (current < amount) return false;
  const next = current - amount;
  if (next > 0) save.inventory[id] = next;
  else delete save.inventory[id];
  return true;
}

function chooseShoppingReward() {
  return SHOPPING_LOOT_POOL[Math.floor(Math.random() * SHOPPING_LOOT_POOL.length)];
}

function formatCountdown(ms) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) return `${hours}h ${String(minutes).padStart(2, "0")}m`;
  return `${minutes}m ${String(seconds).padStart(2, "0")}s`;
}

function dailyActivityFinished(daily) {
  return Boolean(daily?.activeUntil) && Date.now() >= Number(daily.activeUntil);
}

function clearDailyTimer() {
  if (dailyTimerInterval) {
    clearInterval(dailyTimerInterval);
    dailyTimerInterval = null;
  }
}

function settleFinishedDailyActivities() {
  let changed = false;

  const shopping = getShoppingDaily();
  if (dailyActivityFinished(shopping)) {
    shopping.pendingReward = shopping.pendingReward || chooseShoppingReward();
    shopping.activeUntil = null;
    changed = true;
  }

  const paint = getSimpleDaily("paintMixing");
  if (dailyActivityFinished(paint)) {
    paint.activeUntil = null;
    changed = true;
  }

  const friendship = getSimpleDaily("friendshipDate");
  if (dailyActivityFinished(friendship)) {
    friendship.activeUntil = null;
    friendship.pendingHappiness = Boolean(friendship.activeCharacterId);
    changed = true;
  }

  if (changed) persist();
  return changed;
}

function renderShoppingDaily() {
  const daily = getShoppingDaily();
  const currentCharacter = getCurrentCharacter();
  const remainingUses = Math.max(0, SHOPPING_DAILY_LIMIT - Number(daily.usedToday || 0));
  shoppingUsesBadge.textContent = `${daily.usedToday || 0} / ${SHOPPING_DAILY_LIMIT}`;
  shoppingState.innerHTML = "";

  if (daily.pendingReward) {
    const rewardId = normalizeItemId(daily.pendingReward);
    const reward = ITEMS[rewardId];

    const art = document.createElement("div");
    art.className = "shopping-state-art";
    if (reward) renderItemArtwork(art, reward);
    else art.textContent = "🎁";

    const copy = document.createElement("div");
    const strong = document.createElement("strong");
    strong.textContent = `${daily.activeCharacter || currentCharacter.name} is back!`;
    const p = document.createElement("p");
    p.textContent = reward
      ? `They found ${reward.name}! Claim it to add it to Inventory.`
      : "There’s a crafting item waiting in the shopping bag.";
    copy.append(strong, p);

    shoppingState.append(art, copy);
    shoppingActionButton.disabled = false;
    shoppingActionButton.textContent = "Claim Item";
    shoppingActionButton.dataset.action = "claim";
    return;
  }

  if (daily.activeUntil) {
    const icon = document.createElement("div");
    icon.className = "shopping-state-icon";
    icon.textContent = "🛍";

    const copy = document.createElement("div");
    const strong = document.createElement("strong");
    strong.textContent = `${daily.activeCharacter || currentCharacter.name} is shopping…`;
    const p = document.createElement("p");
    p.id = "shoppingCountdown";
    p.textContent = `Back in ${formatCountdown(Number(daily.activeUntil) - Date.now())}`;
    copy.append(strong, p);

    shoppingState.append(icon, copy);
    shoppingActionButton.disabled = true;
    shoppingActionButton.textContent = "Trip in progress";
    shoppingActionButton.dataset.action = "waiting";
    return;
  }

  const icon = document.createElement("div");
  icon.className = "shopping-state-icon";
  icon.textContent = remainingUses > 0 ? "✨" : "♡";

  const copy = document.createElement("div");
  const strong = document.createElement("strong");
  const p = document.createElement("p");

  if (remainingUses > 0) {
    strong.textContent = `${remainingUses} trip${remainingUses === 1 ? "" : "s"} left today`;
    p.textContent = `${currentCharacter.name} can go look for a random crafting ingredient.`;
    shoppingActionButton.disabled = false;
    shoppingActionButton.textContent = "Start 1 Hour Trip";
    shoppingActionButton.dataset.action = "start";
  } else {
    strong.textContent = "All shopping trips used today";
    p.textContent = "The three daily trips will refresh automatically tomorrow.";
    shoppingActionButton.disabled = true;
    shoppingActionButton.textContent = "Come back tomorrow ♡";
    shoppingActionButton.dataset.action = "done";
  }

  copy.append(strong, p);
  shoppingState.append(icon, copy);
}

function renderDailies() {
  clearDailyTimer();

  if (settleFinishedDailyActivities()) {
    // State is now settled; continue with one clean render below.
  }

  renderShoppingDaily();
  renderPaintMixingDaily();
  renderFriendshipDateDaily();

  const hasActive = [
    getShoppingDaily().activeUntil,
    getSimpleDaily("paintMixing").activeUntil,
    getSimpleDaily("friendshipDate").activeUntil
  ].some(Boolean);

  if (!hasActive) return;

  dailyTimerInterval = setInterval(() => {
    if (settleFinishedDailyActivities()) {
      clearDailyTimer();
      renderDailies();
      return;
    }

    const shopping = getShoppingDaily();
    const paint = getSimpleDaily("paintMixing");
    const friendship = getSimpleDaily("friendshipDate");

    const shoppingCountdown = document.querySelector("#shoppingCountdown");
    if (shoppingCountdown && shopping.activeUntil) {
      shoppingCountdown.textContent = `Back in ${formatCountdown(Number(shopping.activeUntil) - Date.now())}`;
    }

    const paintCountdown = document.querySelector("#paintMixCountdown");
    if (paintCountdown && paint.activeUntil) {
      paintCountdown.textContent = `Ready in ${formatCountdown(Number(paint.activeUntil) - Date.now())}`;
    }

    const friendshipCountdown = document.querySelector("#friendshipCountdown");
    if (friendshipCountdown && friendship.activeUntil) {
      friendshipCountdown.textContent = `Back in ${formatCountdown(Number(friendship.activeUntil) - Date.now())}`;
    }
  }, 1000);
}

function startShoppingTrip() {
  const daily = getShoppingDaily();
  if (daily.activeUntil || daily.pendingReward) return;
  if (Number(daily.usedToday || 0) >= SHOPPING_DAILY_LIMIT) return;

  const character = getCurrentCharacter();
  daily.usedToday = Number(daily.usedToday || 0) + 1;
  daily.activeUntil = Date.now() + SHOPPING_DURATION_MS;
  daily.activeCharacter = character.name;
  daily.pendingReward = null;

  persist();
  renderDailies();
  showToast(`${character.name} went shopping! Back in 1 hour. 🛍`);
}

function claimShoppingReward() {
  const daily = getShoppingDaily();
  if (!daily.pendingReward) return;

  const rewardId = normalizeItemId(daily.pendingReward);
  const reward = ITEMS[rewardId];
  if (!rewardId || !reward) {
    daily.pendingReward = null;
    daily.activeCharacter = null;
    persist();
    renderDailies();
    showToast("That shopping reward could not be recognized.");
    return;
  }

  addInventoryItem(rewardId, 1);
  daily.pendingReward = null;
  daily.activeCharacter = null;

  persist();
  renderDailies();
  showToast(`Found: ${reward.name}! Added to Inventory. ✨`);
}

function handleShoppingAction() {
  const action = shoppingActionButton.dataset.action;
  if (action === "claim") claimShoppingReward();
  else if (action === "start") startShoppingTrip();
}

function openDailies() {
  closeCloset();
  closeCraftSheet();
  crafterPanel.classList.add("hidden");
  closeDuckDetail();
  duckipediaPanel.classList.add("hidden");
  inventoryPanel.classList.add("hidden");
  statusPanel.classList.add("hidden");
  tasksPanel.classList.add("hidden");
  taskFormPanel.classList.add("hidden");
  bookPanel.classList.add("hidden");
  dailiesPanel.classList.remove("hidden");
  renderDailies();
}

function closeDailiesToBook() {
  closeFriendshipChooser();
  clearDailyTimer();
  dailiesPanel.classList.add("hidden");
  bookPanel.classList.remove("hidden");
}

function closeDailiesAll() {
  closeFriendshipChooser();
  clearDailyTimer();
  dailiesPanel.classList.add("hidden");
  bookPanel.classList.add("hidden");
}



// -------------------- PROFILES --------------------

function unlockedProfileIconBackgroundIds() {
  if (!save.duckQuest || typeof save.duckQuest !== "object") save.duckQuest = {};
  const unlocked = Array.isArray(save.duckQuest.iconBackgroundsUnlocked)
    ? save.duckQuest.iconBackgroundsUnlocked
    : ["white"];
  save.duckQuest.iconBackgroundsUnlocked = [...new Set(["white", ...unlocked])]
    .filter(id => PROFILE_ICON_BACKGROUNDS.some(background => background.id === id));
  return save.duckQuest.iconBackgroundsUnlocked;
}

function profileIconBackgroundForCharacter(characterId) {
  const progress = normalizeDuckQuestCharacterProgress(characterId);
  const unlocked = unlockedProfileIconBackgroundIds();
  if (!unlocked.includes(progress.iconBackground)) progress.iconBackground = "white";
  return profileIconBackgroundById(progress.iconBackground);
}

function applyProfileIconBackground(element, characterId) {
  if (!element) return;
  const background = profileIconBackgroundForCharacter(characterId);
  element.style.background = background.value;
  element.style.backgroundSize = background.size || "auto";
  element.style.backgroundPosition = "0 0";
}

function closeProfileIconPicker() {
  profileIconPicker?.classList.add("hidden");
  profileIconPickerButton?.setAttribute("aria-expanded", "false");
}

function renderProfileIconPicker(characterId = selectedProfileCharacterId) {
  if (!characterId || !profileIconPicker || !profileIconPickerButton) return;
  const progress = normalizeDuckQuestCharacterProgress(characterId);
  const unlocked = new Set(unlockedProfileIconBackgroundIds());
  const current = profileIconBackgroundById(progress.iconBackground);

  if (profileIconPickerSwatch) {
    profileIconPickerSwatch.style.background = current.value;
    profileIconPickerSwatch.style.backgroundSize = current.size || "auto";
  }
  if (profileIconPickerText) profileIconPickerText.textContent = current.label;

  profileIconPicker.innerHTML = "";
  for (const background of PROFILE_ICON_BACKGROUNDS) {
    const isUnlocked = unlocked.has(background.id);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `profile-icon-choice${isUnlocked ? "" : " locked"}`;
    button.setAttribute("aria-current", String(progress.iconBackground === background.id));
    button.setAttribute("aria-label", `${background.label}${isUnlocked ? "" : ", locked"}`);
    button.title = background.label;

    const swatch = document.createElement("span");
    swatch.className = "profile-icon-dot";
    swatch.style.background = background.value;
    swatch.style.backgroundSize = background.size || "auto";
    button.append(swatch);

    if (!isUnlocked) {
      const lock = document.createElement("span");
      lock.className = "profile-icon-lock";
      lock.textContent = "🔒";
      button.append(lock);
    }

    button.addEventListener("click", () => {
      if (!isUnlocked) {
        showToast("That Icon Background is still locked. Find it in Duck Quest! ♡");
        return;
      }
      progress.iconBackground = background.id;
      if (characterId === "peep") save.duckQuest.iconBackground = background.id;
      persist();
      applyProfileIconBackground(profileDetailAvatar, characterId);
      renderProfileIconPicker(characterId);
      renderProfiles();
      closeProfileIconPicker();
    });

    profileIconPicker.append(button);
  }
}

function renderProfileHeadDuck(container, characterId) {
  const character = CHARACTERS[characterId];
  if (!character) return;

  const duckId = currentHeadDuckId(character.id);
  const duck = duckId ? DUCKS[duckId] : null;
  if (!duck) return;

  const placement = character.duckHeadPlacement || {
    left: 50,
    top: 36.8,
    width: 18
  };

  const layer = document.createElement("div");
  layer.className = "profile-head-duck-layer";
  layer.setAttribute("aria-hidden", "true");

  const img = document.createElement("img");
  img.className = "profile-head-duck";
  img.src = duck.file;
  img.alt = "";
  img.style.left = `${placement.left}%`;
  img.style.top = `${placement.top}%`;
  img.style.width = `${placement.width}%`;

  layer.append(img);
  container.insertBefore(layer, container.firstChild);
}

function switchToProfileCharacter(characterId) {
  if (!CHARACTERS[characterId]) return;
  if (!save.unlockedCharacters.includes(characterId)) return;
  if (save.selectedCharacter === characterId) {
    showToast(`${CHARACTERS[characterId].name} is already out!`);
    return;
  }

  save.selectedCharacter = characterId;
  currentExpression = "expression-neutral";
  persist();

  renderPeep();
  renderRoom();
  renderProfiles();
  renderClosetCategoryMenu();
  closeProfileDetail();
  showToast(`${CHARACTERS[characterId].name} is now your active OC! ♡`);
}

function openProfileDetail(characterId) {
  const character = CHARACTERS[characterId];
  if (!character || !save.unlockedCharacters.includes(characterId)) return;

  selectedProfileCharacterId = characterId;
  const profile = character.profile || {};

  profileDetailName.textContent = character.name;
  profileInfoHeight.textContent = profile.height || "Coming soon";
  if (profileInfoFavorite) profileInfoFavorite.textContent = profile.favoriteItem || "Coming soon";
  profileInfoLikes.textContent = profile.likes || "Coming soon";
  profileInfoDislikes.textContent = profile.dislikes || "Coming soon";
  profileInfoDescription.textContent =
    profile.description || "More profile information will be added in a future update. ♡";

  profileDetailAvatar.dataset.characterId = character.id;
  renderCharacterInto(profileDetailAvatar, character.id);
  renderProfileHeadDuck(profileDetailAvatar, character.id);
  applyProfileIconBackground(profileDetailAvatar, character.id);
  renderProfileIconPicker(character.id);
  closeProfileIconPicker();

  switchProfileCharacter.textContent = `Switch to ${character.name}`;
  switchProfileCharacter.disabled = false;

  profileDetailSheet.classList.remove("hidden");
  profileDetailSheet.setAttribute("aria-hidden", "false");
}

function closeProfileDetail() {
  closeProfileIconPicker();
  selectedProfileCharacterId = null;
  profileDetailAvatar.innerHTML = "";
  delete profileDetailAvatar.dataset.characterId;
  profileDetailSheet.classList.add("hidden");
  profileDetailSheet.setAttribute("aria-hidden", "true");
}

function renderProfiles() {
  profilesGrid.innerHTML = "";

  const characters = Object.values(CHARACTERS);
  const unlockedCount = characters.filter(character =>
    save.unlockedCharacters.includes(character.id)
  ).length;

  profilesCount.textContent = `${unlockedCount} / ${characters.length}`;

  characters.forEach(character => {
    const unlocked = save.unlockedCharacters.includes(character.id);
    const current = save.selectedCharacter === character.id;

    const button = document.createElement("button");
    button.type = "button";
    button.dataset.characterId = character.id;
    button.className = `profile-card${unlocked ? "" : " locked"}${current ? " current" : ""}`;
    button.disabled = !unlocked;
    button.setAttribute("aria-label", unlocked
      ? `${character.name}${current ? ", current OC" : ""}`
      : `${character.name}, locked`);

    const avatar = document.createElement("div");
    avatar.className = "profile-avatar";
    avatar.dataset.characterId = character.id;
    applyProfileIconBackground(avatar, character.id);

    if (character.type === "layered") {
      renderCharacterInto(avatar, character.id);
      if (unlocked) renderProfileHeadDuck(avatar, character.id);
    }

    if (!avatar.children.length) {
      const silhouette = document.createElement("div");
      silhouette.className = "profile-generic-silhouette";
      silhouette.textContent = "●";
      avatar.append(silhouette);
    }

    if (!unlocked) {
      avatar.classList.add("locked");
      const lock = document.createElement("span");
      lock.className = "profile-lock";
      lock.textContent = "🔒";
      avatar.append(lock);
    }

    const copy = document.createElement("span");
    copy.className = "profile-copy";

    const name = document.createElement("strong");
    name.textContent = character.name;

    const state = document.createElement("small");
    state.textContent = !unlocked ? "Locked"
      : current ? "Current OC ✓"
      : "Tap to choose";

    copy.append(name, state);
    button.append(avatar, copy);

    if (unlocked) {
      button.addEventListener("click", () => openProfileDetail(character.id));
    }

    profilesGrid.append(button);
  });
}

function openProfiles() {
  closeCloset();
  closeCraftSheet();
  crafterPanel.classList.add("hidden");
  closeDuckDetail();
  duckipediaPanel.classList.add("hidden");
  closeInventoryItem();
  inventoryPanel.classList.add("hidden");
  closeShopItem();
  shopPanel.classList.add("hidden");
  clearDailyTimer();
  dailiesPanel.classList.add("hidden");
  statusPanel.classList.add("hidden");
  tasksPanel.classList.add("hidden");
  taskFormPanel.classList.add("hidden");
  bookPanel.classList.add("hidden");
  profilesPanel.classList.remove("hidden");
  renderProfiles();
}

function closeProfilesToBook() {
  closeProfileDetail();
  profilesPanel.classList.add("hidden");
  bookPanel.classList.remove("hidden");
}

function closeProfilesAll() {
  closeProfileDetail();
  profilesPanel.classList.add("hidden");
  bookPanel.classList.add("hidden");
}

// -------------------- STATUS / HAPPINESS --------------------
function getTotalUnlockedCharacterHappiness() {
  return (save.unlockedCharacters || [])
    .map(characterId => getCharacterProgress(characterId).happinessTotal)
    .reduce((sum, value) => sum + value, 0);
}

function renderStatusHeadDuck() {
  const character = getCurrentCharacter();
  const duckId = currentHeadDuckId(character.id);
  if (!duckId) return;

  const duck = DUCKS[duckId];
  if (!duck) return;

  const placement = character.duckHeadPlacement || {
    left: 50,
    top: 36.8,
    width: 18
  };

  const layer = document.createElement("div");
  layer.className = "status-head-duck-layer";
  layer.setAttribute("aria-hidden", "true");

  const img = document.createElement("img");
  img.className = "status-head-duck";
  img.src = duck.file;
  img.alt = "";
  img.style.left = `${placement.left}%`;
  img.style.top = `${placement.top}%`;
  img.style.width = `${placement.width}%`;

  layer.append(img);
  statusPeepPreview.insertBefore(layer, statusPeepPreview.firstChild);
}

function renderStatusCharacter() {
  const character = getCurrentCharacter();
  statusCharacterName.textContent = character.name;
  statusPeepPreview.setAttribute("aria-label", `${character.name} current look`);
  renderCurrentCharacterInto(statusPeepPreview);
  renderStatusHeadDuck();
}

function duckQuestExpNeeded(level) {
  const safeLevel = Math.max(1, Math.min(100, Number(level) || 1));
  return safeLevel >= 100 ? 0 : 80 + (safeLevel - 1) * 25;
}

function renderStatus() {
  const stats = save.stats || DEFAULT_SAVE.stats;
  const happiness = getCharacterHappinessInfo(save.selectedCharacter);
  const questProgress = normalizeDuckQuestCharacterProgress(save.selectedCharacter);
  const questLevel = Math.max(1, Math.min(100, Number(questProgress.level) || 1));
  const questExp = Math.max(0, Number(questProgress.exp) || 0);
  const questNeed = duckQuestExpNeeded(questLevel);
  const meadowRank = Math.max(1, Math.min(20, Number(questProgress.areas?.meadow?.unlockedRank) || 1));
  const oceanRank = Math.max(1, Math.min(50, Number(questProgress.areas?.ocean?.unlockedRank) || 1));

  if (statusProgressLabel) {
    statusProgressLabel.textContent = happiness.atMax ? "Happiness Maxed" : `To Level ${happiness.nextLevel}`;
  }

  statusLevelBadge.textContent = `Happiness Lv. ${happiness.level}`;
  statusXpText.textContent = happiness.atMax
    ? "MAX"
    : `${happiness.currentLevelPoints} / ${happiness.pointsForNextLevel}`;
  statusXpFill.style.width = `${happiness.progressPercent}%`;

  if (statusQuestLevelLabel) statusQuestLevelLabel.textContent = `Duck Quest Lv. ${questLevel}`;
  if (statusQuestXpText) statusQuestXpText.textContent = questLevel >= 100 ? "MAX" : `${Math.floor(questExp)} / ${questNeed} EXP`;
  if (statusQuestXpFill) statusQuestXpFill.style.width = questLevel >= 100 ? "100%" : `${Math.min(100, questNeed ? (questExp / questNeed) * 100 : 0)}%`;

  statusCoins.textContent = Math.max(0, Number(save.coins) || 0).toLocaleString();
  statusTasksCompleted.textContent = Math.max(0, Number(stats.tasksCompleted) || 0).toLocaleString();
  statusDucks.textContent = `${save.unlockedDucks.length} / ${DUCK_TOTAL}`;
  if (statusCoinsEarnedTotal) statusCoinsEarnedTotal.textContent = Math.max(0, Number(stats.coinsEarnedTotal) || 0).toLocaleString();
  if (statusMeadowRank) statusMeadowRank.textContent = meadowRank;
  if (statusOceanRank) statusOceanRank.textContent = oceanRank;

  renderStatusCharacter();
}

function openStatus() {
  closeCloset();
  closeCraftSheet();
  crafterPanel.classList.add("hidden");
  closeDuckDetail();
  duckipediaPanel.classList.add("hidden");
  closeInventoryItem();
  inventoryPanel.classList.add("hidden");
  clearDailyTimer();
  dailiesPanel.classList.add("hidden");
  tasksPanel.classList.add("hidden");
  taskFormPanel.classList.add("hidden");
  bookPanel.classList.add("hidden");
  statusPanel.classList.remove("hidden");
  renderStatus();
}

function closeStatusToBook() {
  statusPanel.classList.add("hidden");
  bookPanel.classList.remove("hidden");
}

function closeStatusAll() {
  statusPanel.classList.add("hidden");
  bookPanel.classList.add("hidden");
}


// -------------------- TASKS --------------------
// Tasks are intentionally reward-only: missed tasks never remove coins,
// happiness, XP, or progress. A recurring task simply stays ready until done.

function makeId(prefix = "task") {
  if (globalThis.crypto?.randomUUID) return `${prefix}-${crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function localDateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseDateKey(key) {
  const [y, m, d] = String(key).split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1, 12, 0, 0, 0);
}

function addDaysKey(key, days) {
  const date = parseDateKey(key);
  date.setDate(date.getDate() + Number(days || 0));
  return localDateKey(date);
}

function addMonthsKey(key, months = 1) {
  const date = parseDateKey(key);
  const originalDay = date.getDate();
  date.setDate(1);
  date.setMonth(date.getMonth() + months);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  date.setDate(Math.min(originalDay, lastDay));
  return localDateKey(date);
}

function nextSelectedWeekday(afterKey, weekdays) {
  const chosen = (weekdays || []).map(Number);
  if (!chosen.length) return addDaysKey(afterKey, 7);
  const start = parseDateKey(afterKey);
  for (let offset = 1; offset <= 14; offset++) {
    const candidate = new Date(start);
    candidate.setDate(start.getDate() + offset);
    if (chosen.includes(candidate.getDay())) return localDateKey(candidate);
  }
  return addDaysKey(afterKey, 7);
}

function monthlyDateKey(year, monthIndex, requestedDay) {
  const lastDay = new Date(year, monthIndex + 1, 0).getDate();
  const day = Math.max(1, Math.min(lastDay, Number(requestedDay) || 1));
  return localDateKey(new Date(year, monthIndex, day, 12, 0, 0, 0));
}

function monthEndKey(year, monthIndex) {
  const lastDay = new Date(year, monthIndex + 1, 0).getDate();
  return localDateKey(new Date(year, monthIndex, lastDay, 12, 0, 0, 0));
}

function nextSpecificMonthlyDay(afterKey, requestedDay) {
  const after = parseDateKey(afterKey);
  for (let monthOffset = 0; monthOffset <= 24; monthOffset += 1) {
    const targetMonth = new Date(after.getFullYear(), after.getMonth() + monthOffset, 1, 12, 0, 0, 0);
    const key = monthlyDateKey(targetMonth.getFullYear(), targetMonth.getMonth(), requestedDay);
    if (key > afterKey) return key;
  }
  return addMonthsKey(afterKey, 1);
}

function nextMonthEnd(afterKey) {
  const after = parseDateKey(afterKey);
  for (let monthOffset = 0; monthOffset <= 24; monthOffset += 1) {
    const targetMonth = new Date(after.getFullYear(), after.getMonth() + monthOffset, 1, 12, 0, 0, 0);
    const key = monthEndKey(targetMonth.getFullYear(), targetMonth.getMonth());
    if (key > afterKey) return key;
  }
  return addMonthsKey(afterKey, 1);
}

function initialDueForRepeat(repeat, todayKey = localDateKey()) {
  const definition = repeat || { type: "once" };
  const today = parseDateKey(todayKey);

  if (definition.type === "weekdays") {
    const selected = (definition.weekdays || []).map(Number);
    if (selected.includes(today.getDay())) return todayKey;
    return nextSelectedWeekday(todayKey, selected);
  }

  if (definition.type === "monthly-day") {
    const thisMonth = monthlyDateKey(today.getFullYear(), today.getMonth(), definition.monthDay);
    if (thisMonth >= todayKey) return thisMonth;
    return nextSpecificMonthlyDay(todayKey, definition.monthDay);
  }

  if (definition.type === "month-end") {
    const thisMonthEnd = monthEndKey(today.getFullYear(), today.getMonth());
    if (thisMonthEnd >= todayKey) return thisMonthEnd;
    return nextMonthEnd(todayKey);
  }

  return todayKey;
}

function nextDueAfterCompletion(task, completionKey = localDateKey()) {
  switch (task.repeat?.type) {
    case "daily": return addDaysKey(completionKey, 1);
    case "weekly": return addDaysKey(completionKey, 7);
    case "monthly": return addMonthsKey(completionKey, 1);
    case "monthly-day": return nextSpecificMonthlyDay(completionKey, task.repeat.monthDay);
    case "month-end": return nextMonthEnd(completionKey);
    case "weekdays": return nextSelectedWeekday(completionKey, task.repeat.weekdays);
    case "interval": return addDaysKey(completionKey, Math.max(2, Number(task.repeat.intervalDays) || 2));
    default: return null;
  }
}

function formatFriendlyDate(key) {
  if (!key) return "";
  const date = parseDateKey(key);
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
}

function repeatLabel(task) {
  const repeat = task.repeat || { type: "once" };
  if (repeat.type === "once") return "One-time";
  if (repeat.type === "daily") return "Daily";
  if (repeat.type === "weekly") return "Weekly";
  if (repeat.type === "monthly") return "Monthly";
  if (repeat.type === "monthly-day") return `Monthly · day ${repeat.monthDay}`;
  if (repeat.type === "month-end") return "Last day of each month";
  if (repeat.type === "interval") return `Every ${repeat.intervalDays} days`;
  if (repeat.type === "weekdays") {
    const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (repeat.weekdays || []).map(day => names[Number(day)]).join(", ") || "Specific weekdays";
  }
  return "Repeating";
}

function normalizeTask(task) {
  return {
    id: task.id || makeId(),
    name: String(task.name || "Untitled Task"),
    reward: Math.max(1, Number(task.reward) || 5),
    repeat: task.repeat || { type: "once" },
    nextDue: task.nextDue || localDateKey(),
    createdAt: task.createdAt || Date.now(),
    completions: Number(task.completions) || 0,
    pinned: Boolean(task.pinned)
  };
}

save.tasks = save.tasks.map(normalizeTask);

function refreshTasksForToday() {
  const today = localDateKey();
  let changed = false;
  const kept = [];

  for (const task of save.tasks) {
    if (!task.nextDue) {
      task.nextDue = initialDueForRepeat(task.repeat, today);
      changed = true;
    }

    if (task.nextDue >= today) {
      kept.push(task);
      continue;
    }

    if (task.pinned) {
      task.nextDue = today;
      changed = true;
      kept.push(task);
      continue;
    }

    if (task.repeat?.type === "once") {
      changed = true;
      continue;
    }

    let guard = 0;
    while (task.nextDue < today && guard < 400) {
      const next = nextDueAfterCompletion(task, task.nextDue);
      if (!next || next <= task.nextDue) break;
      task.nextDue = next;
      changed = true;
      guard += 1;
    }

    if (task.nextDue < today) {
      task.nextDue = today;
      changed = true;
    }

    kept.push(task);
  }

  if (kept.length !== save.tasks.length) changed = true;
  save.tasks = kept;

  if (changed) persist();
  return changed;
}

refreshTasksForToday();

function isTaskReady(task) {
  return !task.nextDue || task.nextDue <= localDateKey();
}

function taskDueText(task) {
  if (isTaskReady(task)) {
    if (task.nextDue && task.nextDue < localDateKey()) return "Ready whenever you are";
    return "Ready today";
  }
  return `Next ${formatFriendlyDate(task.nextDue)}`;
}

function taskBucket(task) {
  // Pinned tasks are intentionally kept on Today, regardless of their due date.
  if (task.pinned) return "today";

  const today = localDateKey();
  const tomorrow = addDaysKey(today, 1);
  const due = task.nextDue || today;

  if (due <= today) return "today";
  if (due === tomorrow) return "tomorrow";
  return "future";
}

function sendTaskToTomorrow(id) {
  const task = save.tasks.find(item => item.id === id);
  if (!task) return;

  task.nextDue = addDaysKey(localDateKey(), 1);
  // Since pinned tasks belong on Today, moving one to Tomorrow also unpins it.
  task.pinned = false;
  persist();
  currentTaskTab = "tomorrow";
  renderTasks();
  showToast(`Moved "${task.name}" to Tomorrow. ♡`);
}

function sendTaskToToday(id) {
  const task = save.tasks.find(item => item.id === id);
  if (!task) return;
  task.nextDue = localDateKey();
  task.pinned = false;
  persist();
  currentTaskTab = "today";
  renderTasks();
  showToast(`Moved "${task.name}" back to Today. ♡`);
}

function createCoinInline(amount) {
  const wrap = document.createElement("span");
  wrap.className = "task-coin-reward";
  const img = document.createElement("img");
  img.src = "assets/ui/pink-coin.png";
  img.alt = "";
  const value = document.createElement("b");
  value.textContent = amount;
  wrap.append(img, value);
  return wrap;
}

function createEmptyTasksMessage(title, detail) {
  const empty = document.createElement("div");
  empty.className = "task-empty";
  const heart = document.createElement("div");
  heart.className = "task-empty-icon";
  heart.textContent = "♡";
  const h = document.createElement("strong");
  h.textContent = title;
  const p = document.createElement("p");
  p.textContent = detail;
  empty.append(heart, h, p);
  return empty;
}

function openTaskRemovalConfirm({ type, id, name }) {
  pendingTaskRemoval = { type, id };
  if (taskConfirmText) {
    taskConfirmText.textContent = type === "template"
      ? `Would you like to remove “${name}” from your saved tasks?`
      : `Would you like to remove “${name}”?`;
  }
  taskConfirmPanel?.classList.remove("hidden");
}

function closeTaskRemovalConfirm() {
  pendingTaskRemoval = null;
  taskConfirmPanel?.classList.add("hidden");
}

function confirmTaskRemoval() {
  if (!pendingTaskRemoval) return closeTaskRemovalConfirm();
  const { type, id } = pendingTaskRemoval;

  if (type === "template") {
    save.savedTaskTemplates = save.savedTaskTemplates.filter(item => item.id !== id);
    persist();
    closeTaskRemovalConfirm();
    refreshSavedTaskPicker();
    showToast("Saved task removed. ♡");
    return;
  }

  save.tasks = save.tasks.filter(item => item.id !== id);
  persist();
  closeTaskRemovalConfirm();
  renderTasks();
}

function deleteActiveTask(id) {
  const task = save.tasks.find(item => item.id === id);
  if (!task) return;
  openTaskRemovalConfirm({ type: "task", id: task.id, name: task.name });
}

function recordTaskCompletion(task, reward) {
  if (!Array.isArray(save.completedTaskHistory)) save.completedTaskHistory = [];

  save.completedTaskHistory.unshift({
    id: makeId("completed"),
    taskId: task.id,
    name: task.name,
    reward,
    repeat: structuredClone(task.repeat || { type: "once" }),
    completedAt: new Date().toISOString()
  });
}

function formatCompletedTimestamp(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "Completed";

  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

function completeTask(id) {
  const task = save.tasks.find(item => item.id === id);
  if (!task || !isTaskReady(task)) return;

  const reward = Math.max(1, Number(task.reward) || 5);
  save.coins += reward;
  recordCoinsEarned(reward);
  save.stats.tasksCompleted += 1;
  save.stats.taskCoinsEarned += reward;
  const happinessGained = addCharacterHappiness(1);
  task.completions = (task.completions || 0) + 1;
  recordTaskCompletion(task, reward);

  if (task.repeat?.type === "once") {
    save.tasks = save.tasks.filter(item => item.id !== id);
  } else {
    task.nextDue = nextDueAfterCompletion(task, localDateKey());
  }

  persist();
  evaluateHonkOfApproval();
  evaluateAchievements();
  renderRoom();
  renderTasks();
  setExpression("expression-happy", 2200);

  showToast(`Task complete! +${reward} Pink Coins${happinessGained > 0 ? ` · +${happinessGained} Happiness` : ""} ♡`);
}

function toggleTaskPinned(id) {
  const task = save.tasks.find(item => item.id === id);
  if (!task) return;

  task.pinned = !task.pinned;
  if (task.pinned && task.nextDue < localDateKey()) task.nextDue = localDateKey();

  persist();
  renderTasks();
  showToast(task.pinned
    ? `"${task.name}" is pinned and won't clear. 📌`
    : `"${task.name}" will clear after its due day if unfinished.`);
}

function renderTaskCard(task, { showTomorrowButton = false, showTodayButton = false } = {}) {
  const card = document.createElement("article");
  card.className = `task-card${isTaskReady(task) ? " ready" : " upcoming"}`;

  const top = document.createElement("div");
  top.className = "task-card-top";

  const titleWrap = document.createElement("div");
  titleWrap.className = "task-card-title-row";
  const title = document.createElement("strong");
  title.className = "task-card-title";
  title.textContent = task.name;
  titleWrap.append(title, createCoinInline(task.reward));

  if (task.pinned) {
    const pin = document.createElement("span");
    pin.className = "task-pin-indicator";
    pin.textContent = "📌";
    pin.title = "Pinned to Today";
    pin.setAttribute("aria-label", "Pinned to Today");
    titleWrap.append(pin);
  }

  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "task-x-button";
  remove.textContent = "×";
  remove.setAttribute("aria-label", `Remove ${task.name}`);
  remove.addEventListener("click", () => deleteActiveTask(task.id));
  top.append(titleWrap, remove);

  const meta = document.createElement("div");
  meta.className = "task-card-meta";
  const repeat = document.createElement("span");
  repeat.textContent = repeatLabel(task);
  const due = document.createElement("span");
  due.textContent = taskDueText(task);
  meta.append(repeat, due);

  const actions = document.createElement("div");
  actions.className = "task-card-actions";

  const complete = document.createElement("button");
  complete.type = "button";
  complete.className = "complete-task-button";
  complete.textContent = isTaskReady(task) ? "✓ Complete" : taskDueText(task);
  complete.disabled = !isTaskReady(task);
  complete.addEventListener("click", () => completeTask(task.id));
  actions.append(complete);

  if (showTomorrowButton) {
    const tomorrow = document.createElement("button");
    tomorrow.type = "button";
    tomorrow.className = "task-tomorrow-button";
    tomorrow.textContent = "→ Tomorrow";
    tomorrow.addEventListener("click", () => sendTaskToTomorrow(task.id));
    actions.append(tomorrow);
  }

  if (showTodayButton) {
    const today = document.createElement("button");
    today.type = "button";
    today.className = "task-tomorrow-button task-today-button";
    today.textContent = "Send back to Today.";
    today.addEventListener("click", () => sendTaskToToday(task.id));
    actions.append(today);
  }

  const pinButton = document.createElement("button");
  pinButton.type = "button";
  pinButton.className = `task-pin-button${task.pinned ? " active" : ""}`;
  pinButton.textContent = task.pinned ? "📌 Pinned" : "📌 Pin";
  pinButton.setAttribute("aria-pressed", task.pinned ? "true" : "false");
  pinButton.addEventListener("click", () => toggleTaskPinned(task.id));
  actions.append(pinButton);

  card.append(top, meta, actions);
  return card;
}

function addTaskFromTemplate(template) {
  save.tasks.push(normalizeTask({
    ...template,
    id: makeId(),
    nextDue: initialDueForRepeat(template.repeat),
    createdAt: Date.now(),
    completions: 0
  }));
  persist();
  currentTaskTab = taskBucket(save.tasks[save.tasks.length - 1]);
  renderTasks();
  showToast(`Added "${template.name}" to your tasks.`);
}

function deleteTemplate(id) {
  const template = save.savedTaskTemplates.find(item => item.id === id);
  if (!template) return;
  openTaskRemovalConfirm({ type: "template", id: template.id, name: template.name });
}

function renderSavedTemplate(template) {
  const card = document.createElement("article");
  card.className = "saved-task-card";

  const info = document.createElement("div");
  info.className = "saved-task-info";
  const title = document.createElement("strong");
  title.textContent = template.name;
  const meta = document.createElement("span");
  meta.textContent = repeatLabel(template);
  info.append(title, meta);

  const reward = createCoinInline(template.reward);

  const actions = document.createElement("div");
  actions.className = "saved-task-actions";

  const add = document.createElement("button");
  add.type = "button";
  add.className = "template-add-button";
  add.textContent = "＋ Use";
  add.addEventListener("click", () => addTaskFromTemplate(template));

  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "task-delete-button";
  remove.textContent = "Delete";
  remove.addEventListener("click", () => deleteTemplate(template.id));

  actions.append(add, remove);
  card.append(info, reward, actions);
  return card;
}

function renderTaskBucket(bucket) {
  refreshTasksForToday();
  const list = document.createElement("div");
  list.className = "task-list";

  const tasks = save.tasks
    .filter(task => taskBucket(task) === bucket)
    .sort((a, b) => {
      // Pinned cards stay at the top of Today. Then sort by due date / creation order.
      const pinDifference = Number(Boolean(b.pinned)) - Number(Boolean(a.pinned));
      if (pinDifference) return pinDifference;
      const dueDifference = String(a.nextDue || "").localeCompare(String(b.nextDue || ""));
      if (dueDifference) return dueDifference;
      return Number(a.createdAt || 0) - Number(b.createdAt || 0);
    });

  if (!tasks.length) {
    const messages = {
      today: ["Nothing for today!", "Enjoy the breathing room, or tap + Add Task. ♡"],
      tomorrow: ["Nothing for tomorrow", "Tasks dated for tomorrow will wait here for you."],
      future: ["No future tasks", "Tasks scheduled after tomorrow will live here instead of cluttering Today."]
    };
    const [title, detail] = messages[bucket] || messages.today;
    list.append(createEmptyTasksMessage(title, detail));
    tasksContent.append(list);
    return;
  }

  const heading = document.createElement("h2");
  heading.className = "task-list-heading task-date-heading";
  heading.textContent = bucket === "today" ? "Today" : bucket === "tomorrow" ? "Tomorrow" : "Future";
  list.append(heading);

  if (bucket === "today") tasks.forEach(task => list.append(renderTaskCard(task, { showTomorrowButton: true })));
  else if (bucket === "tomorrow") tasks.forEach(task => list.append(renderTaskCard(task, { showTodayButton: true })));
  else tasks.forEach(task => list.append(renderTaskCard(task)));

  tasksContent.append(list);
}

function renderTodayTasks() {
  renderTaskBucket("today");
}

function renderTomorrowTasks() {
  renderTaskBucket("tomorrow");
}

function renderFutureTasks() {
  renderTaskBucket("future");
}

function renderSavedTasks() {
  const list = document.createElement("div");
  list.className = "task-list";

  if (!save.savedTaskTemplates.length) {
    list.append(createEmptyTasksMessage(
      "Nothing saved yet",
      "When you create a task, turn on “Save this task for later” to keep a reusable copy here."
    ));
    tasksContent.append(list);
    return;
  }

  save.savedTaskTemplates.forEach(template => list.append(renderSavedTemplate(template)));
  tasksContent.append(list);
}

function renderCompletedTask(entry) {
  const card = document.createElement("article");
  card.className = "completed-task-card";

  const check = document.createElement("div");
  check.className = "completed-task-check";
  check.textContent = "✓";

  const info = document.createElement("div");
  info.className = "completed-task-info";

  const title = document.createElement("strong");
  title.textContent = entry.name || "Completed Task";

  const timestamp = document.createElement("time");
  timestamp.dateTime = entry.completedAt || "";
  timestamp.textContent = formatCompletedTimestamp(entry.completedAt);

  const repeat = document.createElement("span");
  repeat.className = "completed-task-repeat";
  repeat.textContent = repeatLabel({ repeat: entry.repeat || { type: "once" } });

  info.append(title, timestamp, repeat);

  const reward = createCoinInline(Math.max(1, Number(entry.reward) || 5));

  card.append(check, info, reward);
  return card;
}

function renderCompletedTasks() {
  const list = document.createElement("div");
  list.className = "task-list completed-task-list";

  const history = Array.isArray(save.completedTaskHistory)
    ? [...save.completedTaskHistory].sort((a, b) =>
        new Date(b.completedAt || 0).getTime() - new Date(a.completedAt || 0).getTime()
      )
    : [];

  if (!history.length) {
    list.append(createEmptyTasksMessage(
      "No completed history yet",
      "Tasks you complete from now on will appear here with their date and time."
    ));
  } else {
    history.forEach(entry => list.append(renderCompletedTask(entry)));
  }

  const olderCount = Math.max(
    0,
    Number(save.stats.tasksCompleted || 0) - history.length
  );

  if (olderCount > 0) {
    const note = document.createElement("p");
    note.className = "completed-history-note";
    note.textContent = `${olderCount} earlier completion${olderCount === 1 ? "" : "s"} happened before timestamp history was added, so those details aren’t available here.`;
    list.append(note);
  }

  tasksContent.append(list);
}

function renderTasks() {
  const tabs = [
    [todayTab, "today"],
    [tomorrowTab, "tomorrow"],
    [futureTab, "future"],
    [completedTab, "completed"]
  ];

  tabs.forEach(([tab, id]) => {
    if (!tab) return;
    tab.classList.toggle("active", currentTaskTab === id);
    tab.setAttribute("aria-selected", String(currentTaskTab === id));
  });

  tasksContent.innerHTML = "";
  if (currentTaskTab === "tomorrow") renderTomorrowTasks();
  else if (currentTaskTab === "future") renderFutureTasks();
  else if (currentTaskTab === "completed") renderCompletedTasks();
  else renderTodayTasks();
}

function openTasks() {
  closeCloset();
  closeCraftSheet();
  crafterPanel.classList.add("hidden");
  closeDuckDetail();
  duckipediaPanel.classList.add("hidden");
  closeInventoryItem();
  inventoryPanel.classList.add("hidden");
  clearDailyTimer();
  dailiesPanel.classList.add("hidden");
  statusPanel.classList.add("hidden");
  bookPanel.classList.add("hidden");
  taskFormPanel.classList.add("hidden");
  tasksPanel.classList.remove("hidden");
  currentTaskTab = "today";
  renderTasks();
}

function closeTasksToBook() {
  closeTaskRemovalConfirm();
  taskFormPanel.classList.add("hidden");
  tasksPanel.classList.add("hidden");
  bookPanel.classList.remove("hidden");
}

function closeTasksAll() {
  closeTaskRemovalConfirm();
  taskFormPanel.classList.add("hidden");
  tasksPanel.classList.add("hidden");
  bookPanel.classList.add("hidden");
}

function ensureSpecificDateControls() {
  if (specificDateOptions && taskSpecificDate) return true;
  if (!taskRepeat || !taskForm) return false;

  const repeatField = taskRepeat.closest(".form-field");
  if (!repeatField) return false;

  const label = document.createElement("label");
  label.id = "specificDateOptions";
  label.className = "form-field repeat-extra";
  label.innerHTML = `
    <span>Specific date</span>
    <input id="taskSpecificDate" type="date" />
    <small>Choose exactly when this one-time task should become ready.</small>
  `;

  repeatField.insertAdjacentElement("afterend", label);

  specificDateOptions = label;
  taskSpecificDate = label.querySelector("#taskSpecificDate");
  return Boolean(taskSpecificDate);
}

function setTaskRewardInForm(amount) {
  const value = Math.max(1, Number(amount) || 5);
  const preset = [5, 10, 20, 30].includes(value) ? String(value) : "custom";
  const radio = document.querySelector(`input[name="taskReward"][value="${preset}"]`);
  if (radio) radio.checked = true;
  const isCustom = preset === "custom";
  customReward.classList.toggle("hidden", !isCustom);
  customReward.value = isCustom ? String(value) : "";
}

function applyRepeatToTaskForm(repeat = { type: "once" }) {
  const type = repeat?.type || "once";
  const option = [...taskRepeat.options].some(item => item.value === type) ? type : "once";
  taskRepeat.value = option;

  if (option === "weekdays") {
    const selected = new Set((repeat.weekdays || []).map(Number));
    weekdayOptions.querySelectorAll('input[type="checkbox"]').forEach(input => {
      input.checked = selected.has(Number(input.value));
    });
  }
  if (option === "monthly-day") monthlyDay.value = String(Math.max(1, Math.min(31, Number(repeat.monthDay) || 1)));
  if (option === "interval") intervalDays.value = String(Math.max(2, Math.min(365, Number(repeat.intervalDays) || 10)));
  updateRepeatExtras();
}

function refreshSavedTaskPicker(selectedId = "") {
  if (!savedTaskSelect) return;
  savedTaskSelect.innerHTML = "";
  const templates = Array.isArray(save.savedTaskTemplates) ? save.savedTaskTemplates : [];
  const hasTemplates = templates.length > 0;

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = hasTemplates ? "Choose a saved task…" : "No saved tasks yet";
  savedTaskSelect.append(placeholder);

  templates.forEach(template => {
    const option = document.createElement("option");
    option.value = template.id;
    option.textContent = template.name;
    savedTaskSelect.append(option);
  });

  savedTaskSelect.disabled = !hasTemplates;
  if (selectedId && templates.some(template => template.id === selectedId)) savedTaskSelect.value = selectedId;
  else savedTaskSelect.value = "";
  savedTaskEmptyNote?.classList.toggle("hidden", hasTemplates);
  deleteSavedTaskButton?.classList.toggle("hidden", !savedTaskSelect.value);
}

function selectedSavedTaskTemplate() {
  return save.savedTaskTemplates.find(template => template.id === savedTaskSelect?.value) || null;
}

function applySavedTaskTemplate(template) {
  if (!template) return;
  taskName.value = template.name || "";
  setTaskRewardInForm(template.reward);
  applyRepeatToTaskForm(structuredClone(template.repeat || { type: "once" }));
  if (taskRepeat.value === "once" && taskSpecificDate) taskSpecificDate.value = localDateKey();
}

function updateTaskSourceMode() {
  const usingSaved = taskSource?.value === "saved";
  savedTaskPicker?.classList.toggle("hidden", !usingSaved);
  newTaskNameField?.classList.toggle("hidden", usingSaved);
  saveTemplateToggle?.classList.toggle("hidden", usingSaved);
  taskName.required = !usingSaved;
  taskName.disabled = usingSaved;

  if (usingSaved) {
    refreshSavedTaskPicker(savedTaskSelect?.value || "");
    const template = selectedSavedTaskTemplate();
    if (template) applySavedTaskTemplate(template);
    else taskName.value = "";
  }
}

function resetTaskForm() {
  taskForm.reset();
  ensureSpecificDateControls();
  if (taskSource) taskSource.value = "new";
  setTaskRewardInForm(5);
  if (specificDateOptions && taskSpecificDate) {
    specificDateOptions.classList.remove("hidden");
    taskSpecificDate.min = localDateKey();
    taskSpecificDate.value = localDateKey();
  }
  weekdayOptions.classList.add("hidden");
  monthlyDayOptions.classList.add("hidden");
  monthlyDay.value = "1";
  intervalOptions.classList.add("hidden");
  intervalDays.value = "10";
  refreshSavedTaskPicker();
  updateTaskSourceMode();
}

function openTaskForm() {
  resetTaskForm();
  updateRepeatExtras();
  taskFormPanel.classList.remove("hidden");
  requestAnimationFrame(() => taskName.focus());
}

function closeTaskForm() {
  taskFormPanel.classList.add("hidden");
}

function updateRepeatExtras() {
  ensureSpecificDateControls();
  specificDateOptions?.classList.toggle("hidden", taskRepeat.value !== "once");
  weekdayOptions.classList.toggle("hidden", taskRepeat.value !== "weekdays");
  monthlyDayOptions.classList.toggle("hidden", taskRepeat.value !== "monthly-day");
  intervalOptions.classList.toggle("hidden", taskRepeat.value !== "interval");
}

function getTaskReward() {
  const checked = document.querySelector('input[name="taskReward"]:checked');
  if (!checked) return 5;
  if (checked.value !== "custom") return Number(checked.value);
  return Math.max(1, Math.min(999, Number(customReward.value) || 0));
}

function getRepeatDefinition() {
  if (taskRepeat.value === "weekdays") {
    const weekdays = [...weekdayOptions.querySelectorAll('input[type="checkbox"]:checked')]
      .map(input => Number(input.value));
    if (!weekdays.length) return null;
    return { type: "weekdays", weekdays };
  }
  if (taskRepeat.value === "monthly-day") {
    const day = Math.max(1, Math.min(31, Number(monthlyDay.value) || 0));
    if (!day) return null;
    return { type: "monthly-day", monthDay: day };
  }
  if (taskRepeat.value === "interval") {
    const days = Math.max(2, Math.min(365, Number(intervalDays.value) || 0));
    if (!days) return null;
    return { type: "interval", intervalDays: days };
  }
  return { type: taskRepeat.value };
}

function submitTaskForm(event) {
  event.preventDefault();

  const usingSaved = taskSource?.value === "saved";
  const template = usingSaved ? selectedSavedTaskTemplate() : null;
  if (usingSaved && !template) {
    showToast("Choose a saved task first. ♡");
    savedTaskSelect?.focus();
    return;
  }

  const name = (usingSaved ? template?.name : taskName.value).trim();
  if (!name) {
    taskName.focus();
    return;
  }

  const reward = getTaskReward();
  if (!reward) {
    showToast("Choose a Pink Coin reward.");
    customReward.focus();
    return;
  }

  const repeat = getRepeatDefinition();
  if (!repeat) {
    showToast(taskRepeat.value === "weekdays"
      ? "Choose at least one weekday."
      : taskRepeat.value === "monthly-day"
        ? "Choose a day from 1 to 31."
        : "Choose how many days to repeat.");
    return;
  }

  let nextDue = initialDueForRepeat(repeat);

  if (repeat.type === "once") {
    ensureSpecificDateControls();
    const chosenDate = taskSpecificDate?.value || localDateKey();

    if (chosenDate < localDateKey()) {
      showToast("Choose today or a future date.");
      taskSpecificDate?.focus();
      return;
    }

    nextDue = chosenDate;
  }

  const task = normalizeTask({
    id: makeId(),
    name,
    reward,
    repeat,
    nextDue,
    createdAt: Date.now(),
    completions: 0,
    pinned: false
  });

  save.tasks.push(task);

  if (!usingSaved && saveAsTemplate.checked) {
    save.savedTaskTemplates.push({
      id: makeId("template"),
      name: task.name,
      reward: task.reward,
      repeat: structuredClone(task.repeat)
    });
  }

  persist();
  closeTaskForm();
  currentTaskTab = taskBucket(task);
  renderTasks();
  showToast(`Added "${task.name}"!`);
}


function openCloset() {
  closeCraftSheet();
  crafterPanel.classList.add("hidden");
  closeDuckDetail();
  duckipediaPanel.classList.add("hidden");
  closeInventoryItem();
  inventoryPanel.classList.add("hidden");
  clearDailyTimer();
  dailiesPanel.classList.add("hidden");
  statusPanel.classList.add("hidden");
  achievementsPanel.classList.add("hidden");
  bookPanel.classList.add("hidden");
  tasksPanel.classList.add("hidden");
  taskFormPanel.classList.add("hidden");
  closetPanel.classList.remove("hidden");
  stage.classList.add("closet-open");
  closeRoomPicker();
  renderCloset();
}

function closeCloset() {
  openSockStyleId = null;
  removeSockPopover();
  closetPanel.classList.add("hidden");
  closetCategoryMenu.classList.add("hidden");
  closetCategoryButton.setAttribute("aria-expanded", "false");
  stage.classList.remove("closet-open");
}

const BAKERY_STORAGE_KEY = "duckHabitHubBakery_v1";
const SAVE_BACKUP_GAME_ID = "Duck Habit Hub";
const SAVE_BACKUP_VERSION = 1;

function safeParseLocalStorageJson(key) {
  const raw = localStorage.getItem(key);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.warn(`Could not parse saved JSON for ${key}.`, error);
    return null;
  }
}

function backupTimestampForFilename(date = new Date()) {
  return date.toISOString()
    .replace(/\.\d{3}Z$/, "")
    .replace(/:/g, "-")
    .replace("T", "_");
}

function buildSaveBackupPayload() {
  // Make sure the in-memory Hub save is written before we capture it.
  persist();

  return {
    game: SAVE_BACKUP_GAME_ID,
    backupVersion: SAVE_BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    hubSaveVersion: SAVE_VERSION,
    hubSave: safeParseLocalStorageJson(STORAGE_KEY) || structuredClone(save),
    bakerySave: safeParseLocalStorageJson(BAKERY_STORAGE_KEY)
  };
}

function triggerJsonDownload(payload, filename) {
  const blob = new Blob(
    [JSON.stringify(payload, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = "none";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();

  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function downloadSaveBackup(label = "save", options = {}) {
  const payload = buildSaveBackupPayload();
  const stamp = backupTimestampForFilename();

  triggerJsonDownload(
    payload,
    `duck-habit-hub-${label}-${stamp}.json`
  );

  if (options.notify !== false) {
    showToast("💾 Backup downloaded! Keep it somewhere safe. ♡");
  }

  return payload;
}

function validateImportedBackup(payload) {
  if (!payload || typeof payload !== "object") {
    return "That file does not contain a valid backup.";
  }

  if (payload.game !== SAVE_BACKUP_GAME_ID) {
    return "That does not look like a Duck Habit Hub backup.";
  }

  if (payload.backupVersion !== SAVE_BACKUP_VERSION) {
    return "That backup format is not supported by this version yet.";
  }

  if (!payload.hubSave || typeof payload.hubSave !== "object" || Array.isArray(payload.hubSave)) {
    return "The Hub save inside that backup is missing or damaged.";
  }

  if (
    payload.bakerySave !== null &&
    payload.bakerySave !== undefined &&
    (typeof payload.bakerySave !== "object" || Array.isArray(payload.bakerySave))
  ) {
    return "The Bakery save inside that backup is damaged.";
  }

  return null;
}

function restoreSaveBackup(payload) {
  const validationError = validateImportedBackup(payload);
  if (validationError) {
    showToast(`⚠️ ${validationError}`);
    return false;
  }

  // Safety net: download the current progress before replacing it.
  downloadSaveBackup("before-import", { notify: false });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload.hubSave));

  if (payload.bakerySave == null) {
    localStorage.removeItem(BAKERY_STORAGE_KEY);
  } else {
    localStorage.setItem(BAKERY_STORAGE_KEY, JSON.stringify(payload.bakerySave));
  }

  showToast("💕 Backup restored! Reloading your game…");
  window.setTimeout(() => window.location.reload(), 850);
  return true;
}

async function handleSaveBackupFile(file) {
  if (!file) return;

  try {
    const text = await file.text();
    const payload = JSON.parse(text);
    const validationError = validateImportedBackup(payload);

    if (validationError) {
      showToast(`⚠️ ${validationError}`);
      return;
    }

    let exportedLabel = "an earlier backup";
    if (payload.exportedAt) {
      const date = new Date(payload.exportedAt);
      if (!Number.isNaN(date.getTime())) {
        exportedLabel = date.toLocaleString();
      }
    }

    const confirmed = window.confirm(
      `Restore Duck Habit Hub progress from ${exportedLabel}?\n\n` +
      "Your CURRENT save will be downloaded as an emergency backup first, then replaced."
    );

    if (!confirmed) return;
    restoreSaveBackup(payload);
  } catch (error) {
    console.error("Could not import save backup.", error);
    showToast("⚠️ I couldn't read that backup file.");
  }
}

function resetAllSaveData() {
  const firstConfirm = window.confirm(
    "Reset ALL Duck Habit Hub progress, including Bakery?\n\n" +
    "This erases your current browser save."
  );
  if (!firstConfirm) return;

  const finalConfirm = window.confirm(
    "Last chance! An emergency backup will download first.\n\n" +
    "After that, reset everything and start over?"
  );
  if (!finalConfirm) return;

  downloadSaveBackup("before-reset", { notify: false });

  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(BAKERY_STORAGE_KEY);

  showToast("Save reset. Starting a fresh game…");
  window.setTimeout(() => window.location.reload(), 850);
}

function openSaveData() {
  closeCloset();
  closeInventoryItem();
  closeShopItem();
  closeDuckDetail();
  closeCraftSheet();

  inventoryPanel.classList.add("hidden");
  shopPanel.classList.add("hidden");
  duckipediaPanel.classList.add("hidden");
  crafterPanel.classList.add("hidden");

  clearDailyTimer();
  dailiesPanel.classList.add("hidden");
  statusPanel.classList.add("hidden");
  profilesPanel.classList.add("hidden");
  achievementsPanel.classList.add("hidden");
  saveDataPanel.classList.add("hidden");
  tasksPanel.classList.add("hidden");
  taskFormPanel.classList.add("hidden");
  bookPanel.classList.add("hidden");

  saveDataPanel.classList.remove("hidden");
}

function closeSaveDataToBook() {
  saveDataPanel.classList.add("hidden");
  bookPanel.classList.remove("hidden");
}

function closeSaveDataAll() {
  saveDataPanel.classList.add("hidden");
  bookPanel.classList.add("hidden");
}


function closePanels() {
  closeCloset();
  closeInventoryItem();
  closeShopItem();
  closeDuckDetail();
  closeCraftSheet();
  inventoryPanel.classList.add("hidden");
  shopPanel.classList.add("hidden");
  duckipediaPanel.classList.add("hidden");
  crafterPanel.classList.add("hidden");
  clearDailyTimer();
  dailiesPanel.classList.add("hidden");
  bookPanel.classList.add("hidden");
  saveDataPanel.classList.add("hidden");
  statusPanel.classList.add("hidden");
  profilesPanel.classList.add("hidden");
  achievementsPanel.classList.add("hidden");
  tasksPanel.classList.add("hidden");
  taskFormPanel.classList.add("hidden");
}

roomPickerButton.addEventListener("click", () => {
  const opening = roomPicker.classList.contains("hidden");
  roomPicker.classList.toggle("hidden", !opening);
  roomPickerButton.setAttribute("aria-expanded", String(opening));
});

roomWingButton.addEventListener("click", switchRoomView);
document.querySelectorAll("[data-wing-shelf-style]").forEach(button => {
  button.addEventListener("click", () => setWingShelfStyle(button.dataset.wingShelfStyle));
});
document.querySelector("#closeWingDuckPicker").addEventListener("click", closeWingDuckPicker);
document.querySelector("#wingDuckPickerBackdrop").addEventListener("click", closeWingDuckPicker);
clearWingDuckSlot.addEventListener("click", clearSelectedWingDuckSlot);

function isHomeRoomInteractive() {
  // The mirror belongs to the room itself. If ANY screen/popup from the
  // Book is open, tapping through that screen must never launch the Closet.
  const blockingPanels = [
    inventoryPanel,
    crafterPanel,
    duckipediaPanel,
    gamesPanel,
    shopPanel,
    dailiesPanel,
    statusPanel,
    profilesPanel,
    achievementsPanel,
    saveDataPanel,
    tasksPanel,
    taskFormPanel,
    bookPanel
  ];

  return currentRoomView === "main"
    && blockingPanels.every(panel => panel.classList.contains("hidden"))
    && closetPanel.classList.contains("hidden");
}

document.querySelector("#mirrorHotspot").addEventListener("click", () => {
  if (!isHomeRoomInteractive()) return;
  hideTinyDuckSecret();
  openCloset();
});
document.querySelector("#bookHotspot").addEventListener("click", () => {
  hideTinyDuckSecret();
  closeCloset();
  closeShopItem();
  closeDuckDetail();
  closeCraftSheet();
  shopPanel.classList.add("hidden");
  duckipediaPanel.classList.add("hidden");
  crafterPanel.classList.add("hidden");
  clearDailyTimer();
  dailiesPanel.classList.add("hidden");
  statusPanel.classList.add("hidden");
  profilesPanel.classList.add("hidden");
  achievementsPanel.classList.add("hidden");
  tasksPanel.classList.add("hidden");
  taskFormPanel.classList.add("hidden");
  bookPanel.classList.remove("hidden");
});
document.querySelector("#peepHotspot").addEventListener("click", pokePeep);
document.querySelector("#closeCloset").addEventListener("click", closeCloset);
document.querySelector("#closeBook").addEventListener("click", closePanels);

closetCategoryButton.addEventListener("click", () => {
  const opening = closetCategoryMenu.classList.contains("hidden");
  closetCategoryMenu.classList.toggle("hidden", !opening);
  closetCategoryButton.setAttribute("aria-expanded", String(opening));
});

document.querySelectorAll("[data-book-page]").forEach(button => {
  button.addEventListener("click", () => {
    const page = button.dataset.bookPage;
    if (page === "tasks") {
      openTasks();
      return;
    }
    if (page === "status") {
      openStatus();
      return;
    }
    if (page === "dailies") {
      openDailies();
      return;
    }
    if (page === "inventory") {
      openInventory();
      return;
    }
    if (page === "shop") {
      openShop();
      return;
    }
    if (page === "crafter") {
      openCrafter("ducks");
      return;
    }
    if (page === "games") {
      openGames();
      return;
    }
    if (page === "duckipedia") {
      openDuckipedia();
      return;
    }
    if (page === "profiles") {
      openProfiles();
      return;
    }
    if (page === "achievements") {
      openAchievements();
      return;
    }
    if (page === "save-data") {
      openSaveData();
      return;
    }
    const label = button.querySelector("span")?.textContent || "That page";
    showToast(`${label} is coming in a later step.`);
  });
});




document.querySelector("#closeSaveData").addEventListener("click", closeSaveDataToBook);

downloadSaveBackupButton.addEventListener("click", () => {
  downloadSaveBackup("save");
});

importSaveBackupButton.addEventListener("click", () => {
  saveBackupFileInput.value = "";
  saveBackupFileInput.click();
});

saveBackupFileInput.addEventListener("change", async event => {
  const file = event.target.files?.[0];
  await handleSaveBackupFile(file);
  event.target.value = "";
});

resetSaveDataButton.addEventListener("click", resetAllSaveData);

document.querySelector("#closeAchievements").addEventListener("click", closeAchievementsToBook);
document.querySelector("#closeAchievementDetail").addEventListener("click", closeAchievementDetail);
document.querySelector("#achievementDetailBackdrop").addEventListener("click", closeAchievementDetail);
document.querySelectorAll("[data-achievement-tab]").forEach(button => {
  button.addEventListener("click", () => {
    currentAchievementTab = button.dataset.achievementTab || "all";
    closeAchievementDetail();
    renderAchievements();
  });
});

document.querySelector("#closeProfiles").addEventListener("click", closeProfilesToBook);
document.querySelector("#closeProfileDetail").addEventListener("click", closeProfileDetail);
document.querySelector("#profileDetailBackdrop").addEventListener("click", closeProfileDetail);
profileIconPickerButton?.addEventListener("click", () => {
  if (!selectedProfileCharacterId) return;
  const opening = profileIconPicker.classList.contains("hidden");
  profileIconPicker.classList.toggle("hidden", !opening);
  profileIconPickerButton.setAttribute("aria-expanded", String(opening));
});
switchProfileCharacter.addEventListener("click", () => {
  if (selectedProfileCharacterId) switchToProfileCharacter(selectedProfileCharacterId);
});

document.querySelector("#closeGames").addEventListener("click", closeGamesToBook);
openBakeryGameButton.addEventListener("click", launchBakery);
if (openDuckSortGameButton) openDuckSortGameButton.addEventListener("click", launchDuckSort);
if (openCraneGameButton) openCraneGameButton.addEventListener("click", launchCraneGame);
if (openMemoryGameButton) openMemoryGameButton.addEventListener("click", launchMemoryGame);
if (openDuckQuestGameButton) openDuckQuestGameButton.addEventListener("click", launchDuckQuestGame);

document.querySelector("#closeCrafter").addEventListener("click", closeCrafterToBook);
document.querySelector("#closeCraftSheet").addEventListener("click", closeCraftSheet);
document.querySelector("#craftSheetBackdrop").addEventListener("click", closeCraftSheet);
document.querySelectorAll("[data-crafter-tab]").forEach(button => {
  button.addEventListener("click", () => {
    currentCrafterTab = button.dataset.crafterTab;
    closeCraftSheet();
    renderCrafter();
  });
});
craftActionButton.addEventListener("click", craftSelectedTarget);

document.querySelector("#closeDuckipedia").addEventListener("click", closeDuckipediaToBook);
document.querySelector("#closeDuckDetail").addEventListener("click", closeDuckDetail);
assignDuckToOc.addEventListener("click", assignSelectedDuckToCurrentOc);
assignDuckToFloor.addEventListener("click", assignSelectedDuckToCurrentRoomFloor);
assignDuckToShelf.addEventListener("click", () => {
  if (assignDuckToShelf.classList.contains("hidden")) return;
  duckShelfPicker.classList.toggle("hidden");
  if (!duckShelfPicker.classList.contains("hidden")) renderShelfDuckPicker(selectedDuckId);
});
assignDuckToDresser.addEventListener("click", () => assignSelectedDuckToFurniturePerch("dresser"));
assignDuckToPetBed.addEventListener("click", () => assignSelectedDuckToFurniturePerch("petBed"));
document.querySelector("#duckDetailBackdrop").addEventListener("click", closeDuckDetail);
document.querySelectorAll("[data-duck-filter]").forEach(button => {
  button.addEventListener("click", () => {
    currentDuckipediaFilter = button.dataset.duckFilter;
    closeDuckDetail();
    renderDuckipedia();
  });
});

document.querySelector("#closeInventory").addEventListener("click", closeInventoryToBook);
document.querySelector("#closeInventoryItem").addEventListener("click", closeInventoryItem);
document.querySelector("#inventorySheetBackdrop").addEventListener("click", closeInventoryItem);
document.querySelectorAll("[data-inventory-tab]").forEach(button => {
  button.addEventListener("click", () => {
    currentInventoryTab = button.dataset.inventoryTab;
    closeInventoryItem();
    renderInventory();
  });
});


document.querySelector("#closeShop").addEventListener("click", event => {
  event.preventDefault();
  event.stopPropagation();
  closeShopToBook();
});
document.querySelector("#closeShop").addEventListener("pointerdown", event => {
  event.stopPropagation();
});
document.querySelector("#closeShopItem").addEventListener("click", closeShopItem);
document.querySelector("#shopSheetBackdrop").addEventListener("click", closeShopItem);
document.querySelectorAll("[data-shop-tab]").forEach(button => {
  button.addEventListener("click", () => {
    currentShopTab = button.dataset.shopTab;
    closeShopItem();
    renderShop();
  });
});
shopQtyMinus.addEventListener("click", () => changeShopQuantity(-1));
shopQtyPlus.addEventListener("click", () => changeShopQuantity(1));
shopBuyButton.addEventListener("click", buyShopItem);

document.querySelector("#closeDailies").addEventListener("click", closeDailiesToBook);
shoppingActionButton.addEventListener("click", handleShoppingAction);
paintMixActionButton.addEventListener("click", handlePaintMixingAction);
friendshipActionButton.addEventListener("click", handleFriendshipAction);
friendshipChooserBackdrop.addEventListener("click", closeFriendshipChooser);
closeFriendshipChooserButton.addEventListener("click", closeFriendshipChooser);

document.querySelector("#closeStatus").addEventListener("click", closeStatusToBook);
document.querySelector("#closeTasks").addEventListener("click", closeTasksToBook);
document.querySelector("#addTaskButton")?.addEventListener("click", event => {
  event.preventDefault();
  openTaskForm();
});
document.querySelector("#closeTaskForm").addEventListener("click", closeTaskForm);
document.querySelector("#cancelTaskForm").addEventListener("click", closeTaskForm);

todayTab.addEventListener("click", () => {
  currentTaskTab = "today";
  renderTasks();
});
tomorrowTab.addEventListener("click", () => {
  currentTaskTab = "tomorrow";
  renderTasks();
});
futureTab.addEventListener("click", () => {
  currentTaskTab = "future";
  renderTasks();
});
completedTab.addEventListener("click", () => {
  currentTaskTab = "completed";
  renderTasks();
});

taskSource?.addEventListener("change", () => {
  updateTaskSourceMode();
  if (taskSource.value === "new") requestAnimationFrame(() => taskName.focus());
});

savedTaskSelect?.addEventListener("change", () => {
  const template = selectedSavedTaskTemplate();
  deleteSavedTaskButton?.classList.toggle("hidden", !template);
  if (template) applySavedTaskTemplate(template);
});

deleteSavedTaskButton?.addEventListener("click", () => {
  const template = selectedSavedTaskTemplate();
  if (template) deleteTemplate(template.id);
});

taskConfirmNo?.addEventListener("click", closeTaskRemovalConfirm);
taskConfirmYes?.addEventListener("click", confirmTaskRemoval);
taskConfirmPanel?.addEventListener("click", event => {
  if (event.target === taskConfirmPanel) closeTaskRemovalConfirm();
});

taskRepeat.addEventListener("change", updateRepeatExtras);
taskForm.addEventListener("submit", submitTaskForm);

document.querySelectorAll('input[name="taskReward"]').forEach(input => {
  input.addEventListener("change", () => {
    const isCustom = document.querySelector('input[name="taskReward"]:checked')?.value === "custom";
    customReward.classList.toggle("hidden", !isCustom);
    if (isCustom) customReward.focus();
  });
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "visible") return;
  if (refreshTasksForToday() && !tasksPanel.classList.contains("hidden")) renderTasks();
});

document.addEventListener("click", event => {
  if (!roomPicker.contains(event.target) && !roomPickerButton.contains(event.target)) closeRoomPicker();
  if (!closetCategoryMenu.contains(event.target) && !closetCategoryButton.contains(event.target)) {
    closetCategoryMenu.classList.add("hidden");
    closetCategoryButton.setAttribute("aria-expanded", "false");
  }
});

save.tasks = save.tasks.map(normalizeTask);
normalizeCharacterState();
resetAccidentalWardrobeUnlocksOnce();
migrateMikoNewOutfitToShopOnce();
ensureStarterWardrobeUnlocked();
const ocShopGateRepair = repairLockedOcPurchasesOnce();
normalizeRoomExpansion();
migrateLegacyPetBedsOnce();
migrateLegacyMainRoomDecor();
persist();

const roomToGrowUnlockedOnLoad = evaluateRoomToGrow({ notify: false });
const honkUnlockedOnLoad = evaluateHonkOfApproval({ notify: false });
const achievementsUnlockedOnLoad = evaluateAchievements({ notify: false });

renderRoom();
renderPeep();

// V24.14: legacy saves may already have 100 Tiny Duck sightings from before
// Pile of Tiny Ducks existed. Grant it quietly without taking away any old reward.
if (Math.max(0, Number(save.tinyDuckSightings) || 0) >= TINY_DUCK_PILE_SIGHTINGS) {
  if (unlockDuck("pile-of-tiny-ducks", { notify: false, persistNow: false, skipMilestoneCheck: true, skipAchievementCheck: true })) {
    persist();
  }
}

renderRoomPicker();
renderClosetCategoryMenu();
renderRoomWingToggle();
scheduleNonCriticalWarmup(warmStartupAssets, 150);

// Level-100 character duck rewards are checked only AFTER the initial room and
// character have rendered. This keeps an unlock/migration from ever blocking
// Miko or Peep from appearing during app startup.
setTimeout(() => {
  try {
    const unlockedOnLoad = ["peep", "miko"]
      .filter(characterId => isCharacterUnlocked(characterId))
      .filter(characterId => evaluateCharacterHappinessDuckReward(characterId, { notify: false, persistNow: false }));

    if (unlockedOnLoad.length) {
      persist();
      const characterId = unlockedOnLoad[0];
      const rewardEntry = getCharacterHappinessDuckReward(characterId);
      const characterName = CHARACTERS[characterId]?.name || characterId;
      const duckName = rewardEntry?.[1]?.name || "Special Duck";
      showToast(`${characterName} reached Happiness Level 100! ${duckName} unlocked! 🦆✨`);
    }
  } catch (error) {
    console.error("Level 100 duck reward check failed safely:", error);
  }
}, 300);

if (ocShopGateRepair.refunded > 0) {
  setTimeout(() => {
    showToast(`Fixed locked-OC Shop items and refunded ${ocShopGateRepair.refunded} Pink Coins. ♡`);
  }, 250);
} else if (achievementsUnlockedOnLoad.length) {
  setTimeout(() => {
    const count = achievementsUnlockedOnLoad.length;
    showToast(`${count} retroactive achievement${count === 1 ? "" : "s"} unlocked! Check your Trophy Case. 🏆`);
  }, 250);
} else if (honkUnlockedOnLoad) {
  setTimeout(() => showToast("🪿 Honk of Approval! Goose unlocked!"), 250);
} else if (roomToGrowUnlockedOnLoad) {
  setTimeout(() => showToast("🏠 Room to Grow! Shelf of Ducks + Wallpaper unlocked!"), 250);
}


if (window.location.hash === "#games") {
  openGames();
  history.replaceState(null, "", window.location.pathname + window.location.search);
}
