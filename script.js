const STORAGE_KEY = "duckHabitHubSave_v1";
const SAVE_VERSION = 11;

const CHARACTERS = {
  peep: {
    id: "peep",
    name: "Peep",
    type: "layered",
    assetFolder: "assets/peep/",
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
    "subtitle": "Base and mixed paints used to color Standard Ducks.",
    "empty": "No paint yet. You may find some while shopping!"
  },
  "food": {
    "label": "Food",
    "subtitle": "Treats can be gifted, sold, or used in certain duck recipes.",
    "empty": "No food yet. Bakery rewards will eventually appear here too!"
  },
  "furniture": {
    "label": "Furniture",
    "subtitle": "Room items you own. Placement will connect when furniture is added.",
    "empty": "No furniture yet. The Shop will eventually stock room decorations!"
  },
  "gift": {
    "label": "Gifts",
    "subtitle": "Special presents for OCs and dates.",
    "empty": "No special gifts yet."
  }
};

const ITEMS = {
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
  "red-paint",
  "dark-red-paint",
  "orange-paint",
  "peach-paint",
  "gold-paint",
  "silver-paint",
  "bronze-paint",
  "green-paint",
  "mint-paint",
  "aqua-paint",
  "sky-blue-paint",
  "blue-paint",
  "periwinkle-paint",
  "purple-paint",
  "violet-paint",
  "pink-paint",
  "white-paint",
  "grey-paint",
  "black-paint",
  "rainbow-paint",
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
  "bow"
];


const SHOP_CATEGORIES = {
  supplies: {
    label: "Duck Supplies",
    subtitle: "Useful supplies for crafting your duck collection. Food ingredients are earned elsewhere for now."
  },
  paint: {
    label: "Basic Paint",
    subtitle: "Only base paints are sold here. Mixed colors must be crafted!"
  }
};

// Standard Duck is 25 coins.
// All shop-available base paints are 20 coins.
// Recipe paints are intentionally excluded so mixing colors stays meaningful.
const SHOP_STOCK = {
  supplies: [
    { itemId: "standard-duck", price: 25 },
    { itemId: "sunglasses", price: 15 },
    { itemId: "yarn", price: 15 },
    { itemId: "thread", price: 15 },
    { itemId: "party-hat", price: 15 },
    { itemId: "knife", price: 20 },
    { itemId: "game-controller", price: 20 },
    { itemId: "pill", price: 15 },
    { itemId: "ufo", price: 25 },
    { itemId: "pocket-monster-ball", price: 25 },
    { itemId: "jester-bell", price: 20 },
    { itemId: "crown", price: 25 },
    { itemId: "magical-girl-pendant", price: 25 },
    { itemId: "bunny-ears", price: 20 },
    { itemId: "flower", price: 12 },
    { itemId: "sleep-mask", price: 15 },
    { itemId: "paintbrush", price: 15 },
    { itemId: "ghost", price: 20 },
    { itemId: "demon-wing", price: 25 },
    { itemId: "angel-wing", price: 25 },
    { itemId: "glitter", price: 20 },
    { itemId: "cat-ears", price: 20 },
    { itemId: "moon", price: 20 },
    { itemId: "mustache", price: 15 },
    { itemId: "top-hat", price: 20 },
    { itemId: "bow", price: 15 }
  ],
  paint: [
    { itemId: "red-paint", price: 20 },
    { itemId: "orange-paint", price: 20 },
    { itemId: "gold-paint", price: 20 },
    { itemId: "silver-paint", price: 20 },
    { itemId: "bronze-paint", price: 20 },
    { itemId: "green-paint", price: 20 },
    { itemId: "blue-paint", price: 20 },
    { itemId: "purple-paint", price: 20 },
    { itemId: "white-paint", price: 20 },
    { itemId: "black-paint", price: 20 }
  ]
};

const SHOP_MAX_QUANTITY = 10;

const PAINT_RECIPES = {
  "dark-red-paint": {
    "red-paint": 1,
    "black-paint": 1
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

const DUCKS = {
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
    "acquisition": "rare-drop"
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
  "sock-right-rainbow.png": [601,1523,745,1795]
};

const CLOSET = [
  {
    id: "hair",
    label: "Hair",
    type: "hair",
    options: ["hair-short", "hair-low-pigtails", "hair-ponytail", "hair-long-pigtails", "hair-jellyfish"]
  },
  { id: "top", label: "Tops", type: "single", options: ["top-shirt", "top-sweater"] },
  { id: "bottom", label: "Skirts", type: "single", options: ["bottom-fluffy", "bottom-pleated"] },
  { id: "socks", label: "Socks", type: "socks" },
  { id: "shoes", label: "Shoes", type: "single", allowNone: true, options: ["shoes-loafer", "shoes-sneaker"] },
  { id: "ears", label: "Ears", type: "single", allowNone: true, options: ["cow-ears", "cat-ears"] },
  { id: "tail", label: "Tails", type: "single", allowNone: true, options: ["tail-cow", "tail-bunny"] },
  {
    id: "extras",
    label: "Extras",
    type: "multi",
    options: ["jacket", "collar", "leg-bandage", "horns", "cheek-bandage", "left-bow", "right-bow", "hair-side-ribbon", "large-back-bow", "beret"]
  }
];

const DEFAULT_OUTFIT = {
  hair: "hair-short",
  top: "top-sweater",
  bottom: "bottom-pleated",
  leftSock: "sock-left-rainbow",
  rightSock: "sock-right-rainbow",
  shoes: "shoes-loafer",
  ears: "cat-ears",
  tail: "tail-bunny",
  extras: ["left-bow", "right-bow", "cheek-bandage"]
};

const DEFAULT_SAVE = {
  version: SAVE_VERSION,
  coins: 0,
  room: "cream",
  selectedCharacter: "peep",
  unlockedCharacters: ["peep"],
  unlockedRooms: ["cream"],
  unlockedItems: ["hair-short", "hair-low-pigtails"],
  peepPokes: 0,
  outfit: structuredClone(DEFAULT_OUTFIT),
  tasks: [],
  savedTaskTemplates: [],
  completedTaskHistory: [],
  unlockedDucks: [],
  inventory: {},
  dailies: {
    shopping: {
      dayKey: "",
      usedToday: 0,
      activeUntil: null,
      activeCharacter: null,
      pendingReward: null
    }
  },
  stats: {
    tasksCompleted: 0,
    taskCoinsEarned: 0,
    xp: 0,
    happiness: 0
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
      outfit: { ...structuredClone(DEFAULT_OUTFIT), ...(saved.outfit || {}) },
      tasks: Array.isArray(saved.tasks) ? saved.tasks : [],
      savedTaskTemplates: Array.isArray(saved.savedTaskTemplates) ? saved.savedTaskTemplates : [],
      completedTaskHistory: Array.isArray(saved.completedTaskHistory) ? saved.completedTaskHistory : [],
      unlockedDucks: Array.isArray(saved.unlockedDucks) ? saved.unlockedDucks : [],
      inventory: migrateLegacyInventory(saved),
      dailies: {
        shopping: {
          ...structuredClone(DEFAULT_SAVE.dailies.shopping),
          ...(saved.dailies?.shopping || {})
        }
      },
      stats: {
        ...structuredClone(DEFAULT_SAVE.stats),
        ...(saved.stats || {})
      }
    };

    // Saves from the original pre-V2 prototype used a different closet shape.
    // Only those very old saves adopt Peep's approved default outfit.
    if (!saved.version || saved.version < 2) {
      merged.outfit = structuredClone(DEFAULT_OUTFIT);
    }

    delete merged.craftingInventory;
    return merged;
  } catch {
    return structuredClone(DEFAULT_SAVE);
  }
}
let save = loadSave();

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
let currentClosetTab = "hair";
let currentExpression = "expression-neutral";
let reactionTimer = null;
let pokeTimes = [];
let pokeLocked = false;
let openSockStyleId = null;
let currentTaskTab = "today";
let currentInventoryTab = "crafting";
let selectedInventoryItemId = null;
let currentShopTab = "supplies";
let selectedShopItemId = null;
let selectedShopQuantity = 1;
let currentDuckipediaFilter = "all";
let selectedDuckId = null;
let dailyTimerInterval = null;
let toastTimer;

const stage = document.querySelector("#stage");
const roomImage = document.querySelector("#roomImage");
const peepWrap = document.querySelector("#peepWrap");
const peepLayers = document.querySelector("#peepLayers");
const roomPickerButton = document.querySelector("#roomPickerButton");
const roomPickerSwatch = document.querySelector("#roomPickerSwatch");
const roomPicker = document.querySelector("#roomPicker");
const coinCount = document.querySelector("#coinCount");
const closetPanel = document.querySelector("#closetPanel");
const bookPanel = document.querySelector("#bookPanel");
const tasksPanel = document.querySelector("#tasksPanel");
const taskFormPanel = document.querySelector("#taskFormPanel");
const statusPanel = document.querySelector("#statusPanel");
const statusPeepPreview = document.querySelector("#statusPeepPreview");
const statusCharacterName = document.querySelector("#statusCharacterName");
const statusLevelBadge = document.querySelector("#statusLevelBadge");
const statusHappinessLabel = document.querySelector("#statusHappinessLabel");
const statusXpText = document.querySelector("#statusXpText");
const statusXpFill = document.querySelector("#statusXpFill");
const statusCoins = document.querySelector("#statusCoins");
const statusTasksCompleted = document.querySelector("#statusTasksCompleted");
const statusDucks = document.querySelector("#statusDucks");
const statusHappiness = document.querySelector("#statusHappiness");
const statusTaskCoins = document.querySelector("#statusTaskCoins");
const statusTotalXp = document.querySelector("#statusTotalXp");
const dailiesPanel = document.querySelector("#dailiesPanel");
const shoppingUsesBadge = document.querySelector("#shoppingUsesBadge");
const shoppingState = document.querySelector("#shoppingState");
const shoppingActionButton = document.querySelector("#shoppingActionButton");
const dailyInventoryCount = document.querySelector("#dailyInventoryCount");
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
const shopCategoryTitle = document.querySelector("#shopCategoryTitle");
const shopCategorySubtitle = document.querySelector("#shopCategorySubtitle");
const shopStockCount = document.querySelector("#shopStockCount");
const shopGrid = document.querySelector("#shopGrid");
const shopItemSheet = document.querySelector("#shopItemSheet");
const shopSheetIcon = document.querySelector("#shopSheetIcon");
const shopSheetCategory = document.querySelector("#shopSheetCategory");
const shopSheetName = document.querySelector("#shopSheetName");
const shopSheetUnitPrice = document.querySelector("#shopSheetUnitPrice");
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


const tasksContent = document.querySelector("#tasksContent");
const todayTab = document.querySelector("#todayTab");
const savedTab = document.querySelector("#savedTab");
const completedTab = document.querySelector("#completedTab");
const taskForm = document.querySelector("#taskForm");
const taskName = document.querySelector("#taskName");
const taskRepeat = document.querySelector("#taskRepeat");
const weekdayOptions = document.querySelector("#weekdayOptions");
const intervalOptions = document.querySelector("#intervalOptions");
const intervalDays = document.querySelector("#intervalDays");
const customReward = document.querySelector("#customReward");
const customRewardRadio = document.querySelector("#customRewardRadio");
const saveAsTemplate = document.querySelector("#saveAsTemplate");
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

function renderRoom() {
  const room = ROOMS.find(r => r.id === save.room) || ROOMS[0];
  roomImage.src = room.file;
  roomImage.alt = room.name;
  roomPickerSwatch.style.setProperty("--swatch", room.swatch);
  roomPickerButton.setAttribute("aria-label", `Change room color. Current room: ${room.name}`);
  coinCount.textContent = save.coins;
}

function getEquippedAssetIds() {
  const ids = ["base"];

  // Hair always has bangs for now; the bangs tile appears in Hair as required.
  ids.push(save.outfit.hair, "bangs");

  ids.push(save.outfit.top, save.outfit.bottom);
  if (save.outfit.leftSock) ids.push(save.outfit.leftSock);
  if (save.outfit.rightSock) ids.push(save.outfit.rightSock);
  if (save.outfit.shoes) ids.push(save.outfit.shoes);
  if (save.outfit.ears) ids.push(save.outfit.ears);
  if (save.outfit.tail) ids.push(save.outfit.tail);
  ids.push(...(Array.isArray(save.outfit.extras) ? save.outfit.extras : []));

  ids.push(currentExpression);
  return ids.filter(Boolean);
}

function getCurrentCharacter() {
  return CHARACTERS[save.selectedCharacter] || CHARACTERS.peep;
}

function getCurrentCharacterAssetIds() {
  const character = getCurrentCharacter();

  // Peep is our first layered character. Future OCs can add their own
  // outfit/equipped-item function here without changing the Status page.
  if (character.id === "peep") return getEquippedAssetIds();

  return [];
}

function renderCurrentCharacterInto(container) {
  container.innerHTML = "";

  const character = getCurrentCharacter();
  const equipped = getCurrentCharacterAssetIds()
    .map(id => ({ id, ...ASSETS[id] }))
    .filter(asset => asset.file)
    .sort((a, b) => a.z - b.z);

  for (const asset of equipped) {
    const img = document.createElement("img");
    img.src = `${character.assetFolder}${asset.file}`;
    img.alt = "";
    img.style.setProperty("--z", asset.z);
    img.dataset.asset = asset.id;
    if (asset.id.startsWith("expression-")) img.dataset.expressionLayer = "true";
    container.append(img);
  }
}

function renderPeep() {
  renderCurrentCharacterInto(peepLayers);
  peepLayers.querySelectorAll("img").forEach(img => img.classList.add("peep-layer"));
}

const peepImageCache = new Map();

function preloadPeepAssets() {
  for (const asset of Object.values(ASSETS)) {
    if (!asset?.file) continue;
    const src = `assets/peep/${asset.file}`;
    const img = new Image();
    img.decoding = "async";
    img.src = src;
    peepImageCache.set(src, img);
    if (typeof img.decode === "function") img.decode().catch(() => {});
  }
}

function updateExpressionLayer(assetId) {
  const asset = ASSETS[assetId];
  if (!asset?.file) return;

  let layer = peepLayers.querySelector('[data-expression-layer="true"]');
  if (!layer) {
    renderPeep();
    layer = peepLayers.querySelector('[data-expression-layer="true"]');
  }
  if (!layer) return;

  const character = getCurrentCharacter();
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
    button.setAttribute("aria-current", String(save.room === room.id));
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
        showToast("Locked — this room will be purchasable in the Shop later!");
        return;
      }
      save.room = room.id;
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
  closetCategoryMenu.innerHTML = "";
  for (const group of CLOSET) {
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
  const group = CLOSET.find(g => g.id === currentClosetTab) || CLOSET[0];
  closetCategoryLabel.textContent = group.label;
  renderClosetCategoryMenu();
  renderClosetOptions();
}

function makeThumb(assetId, { boxW = 92, boxH = 82, targetW = 60, targetH = 54 } = {}) {
  const asset = ASSETS[assetId];
  const thumb = document.createElement("span");
  thumb.className = "closet-thumb";
  thumb.style.width = `${boxW}px`;
  thumb.style.height = `${boxH}px`;

  if (!asset?.file) return thumb;
  const img = document.createElement("img");
  img.src = `assets/peep/${asset.file}`;
  img.alt = "";

  const bbox = THUMB_BOUNDS[asset.file];
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

function makeCombinedThumb(assetIds, { boxW = 104, boxH = 88, targetW = 76, targetH = 66 } = {}) {
  const thumb = document.createElement("span");
  thumb.className = "closet-thumb sock-pair-thumb";
  thumb.style.width = `${boxW}px`;
  thumb.style.height = `${boxH}px`;

  const entries = assetIds
    .map(id => ASSETS[id])
    .filter(Boolean)
    .map(asset => ({ asset, bbox: THUMB_BOUNDS[asset.file] }))
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

  for (const { asset } of entries) {
    const img = document.createElement("img");
    img.src = `assets/peep/${asset.file}`;
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
  save.outfit[group.id] = id;
  persist();
  renderPeep();
  renderClosetOptions();
}

function renderHairOptions(group) {
  closetOptions.append(makeOptionCard({
    assetId: "bangs",
    label: "Bangs",
    selected: true,
    required: true
  }));

  for (const id of group.options) {
    const asset = ASSETS[id];
    const unlocked = save.unlockedItems.includes(id);
    closetOptions.append(makeOptionCard({
      assetId: id,
      label: asset.label,
      selected: save.outfit.hair === id,
      locked: !unlocked,
      onClick: () => {
        if (!unlocked) {
          showToast(`${asset.label} is locked — it can be bought in the Shop later!`);
          return;
        }
        save.outfit.hair = id;
        persist();
        renderPeep();
        renderClosetOptions();
      }
    }));
  }
}

const SOCK_STYLES = [
  { id: "rainbow", label: "Rainbow", left: "sock-left-rainbow", right: "sock-right-rainbow" },
  { id: "blue", label: "White + Blue", left: "sock-left-blue", right: "sock-right-blue" }
];

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
  if (placement === "clear") {
    if (save.outfit.leftSock === style.left) save.outfit.leftSock = null;
    if (save.outfit.rightSock === style.right) save.outfit.rightSock = null;
  } else if (placement === "left") {
    save.outfit.leftSock = style.left;
    if (save.outfit.rightSock === style.right) save.outfit.rightSock = null;
  } else if (placement === "right") {
    save.outfit.rightSock = style.right;
    if (save.outfit.leftSock === style.left) save.outfit.leftSock = null;
  } else if (placement === "both") {
    save.outfit.leftSock = style.left;
    save.outfit.rightSock = style.right;
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

  const bothSelected = save.outfit.leftSock === style.left && save.outfit.rightSock === style.right;
  const leftSelected = save.outfit.leftSock === style.left && !bothSelected;
  const rightSelected = save.outfit.rightSock === style.right && !bothSelected;

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

  const styleIsUsed = save.outfit.leftSock === style.left || save.outfit.rightSock === style.right;
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

  const isUsed = save.outfit.leftSock === style.left || save.outfit.rightSock === style.right;
  if (isUsed) card.classList.add("equipped");
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

  const placement = document.createElement("span");
  placement.className = "sock-style-current";
  const leftMatch = save.outfit.leftSock === style.left;
  const rightMatch = save.outfit.rightSock === style.right;
  placement.textContent = leftMatch && rightMatch ? "Both" : leftMatch ? "Left" : rightMatch ? "Right" : "Tap to place";
  card.append(placement);

  card.addEventListener("click", () => {
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
  SOCK_STYLES.forEach(renderSockStyle);
}

function renderClosetOptions() {
  const group = CLOSET.find(g => g.id === currentClosetTab) || CLOSET[0];
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
      selected: save.outfit[group.id] == null,
      onClick: () => chooseSingle(group, null)
    }));
  }

  for (const id of group.options) {
    const asset = ASSETS[id];
    if (!asset) continue;

    if (group.type === "multi") {
      const selected = Array.isArray(save.outfit.extras) ? save.outfit.extras : [];
      closetOptions.append(makeOptionCard({
        assetId: id,
        label: asset.label,
        selected: selected.includes(id),
        onClick: () => {
          const next = new Set(Array.isArray(save.outfit.extras) ? save.outfit.extras : []);
          next.has(id) ? next.delete(id) : next.add(id);
          save.outfit.extras = [...next];
          persist();
          renderPeep();
          renderClosetOptions();
        }
      }));
    } else {
      closetOptions.append(makeOptionCard({
        assetId: id,
        label: asset.label,
        selected: save.outfit[group.id] === id,
        onClick: () => chooseSingle(group, id)
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
    img.addEventListener("error", () => {
      container.innerHTML = "";
      container.textContent = item.icon || "✦";
    }, { once: true });
    container.append(img);
    return;
  }

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
  return Object.keys(save.inventory || {})
    .filter(itemId => ITEMS[itemId]?.category === category && inventoryQuantity(itemId) > 0)
    .sort((a, b) => ITEMS[a].name.localeCompare(ITEMS[b].name));
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
    qty.textContent = `×${inventoryQuantity(itemId)}`;

    button.append(icon, name, qty);
    button.addEventListener("click", () => openInventoryItem(itemId));
    inventoryGrid.append(button);
  });
}

function renderInventoryItemSheet() {
  const itemId = selectedInventoryItemId;
  const item = ITEMS[itemId];
  const quantity = inventoryQuantity(itemId);
  if (!item || !quantity) {
    closeInventoryItem();
    return;
  }

  const category = INVENTORY_CATEGORIES[item.category];
  renderItemArtwork(inventorySheetIcon, item);
  inventorySheetCategory.textContent = category?.label || "Item";
  inventorySheetName.textContent = item.name;
  inventorySheetQuantity.textContent = `You have ×${quantity}`;
  inventorySheetActions.innerHTML = "";
  inventoryGiftPreference.classList.add("hidden");
  inventoryGiftPreference.innerHTML = "";

  if (item.giftable && item.category === "food") {
    const character = getCurrentCharacter();
    const preferenceId = getGiftPreference(itemId, character);
    const reaction = GIFT_REACTIONS[preferenceId] || GIFT_REACTIONS.okay;
    inventoryGiftPreference.classList.remove("hidden");
    inventoryGiftPreference.textContent = `${character.name}: ${reaction.label} · +${reaction.happiness} Happiness`;

    const giftButton = document.createElement("button");
    giftButton.type = "button";
    giftButton.className = "inventory-action primary";
    giftButton.textContent = `Gift to ${character.name}`;
    giftButton.addEventListener("click", () => giftInventoryItem(itemId));
    inventorySheetActions.append(giftButton);
  }

  if (item.category === "furniture") {
    const placeButton = document.createElement("button");
    placeButton.type = "button";
    placeButton.className = "inventory-action primary";
    placeButton.textContent = "Place in Room";
    placeButton.addEventListener("click", () => showToast("Furniture placement will be connected when we add furniture! ♡"));
    inventorySheetActions.append(placeButton);
  }

  if (item.sellValue > 0) {
    const sellButton = document.createElement("button");
    sellButton.type = "button";
    sellButton.className = "inventory-action sell";
    sellButton.innerHTML = `<span>Sell 1</span><span class="inventory-sell-price">🩷 ${item.sellValue}</span>`;
    sellButton.addEventListener("click", () => sellInventoryItem(itemId));
    inventorySheetActions.append(sellButton);
  }
}

function openInventoryItem(itemId) {
  if (!ITEMS[itemId] || inventoryQuantity(itemId) <= 0) return;
  selectedInventoryItemId = itemId;
  inventoryItemSheet.classList.remove("hidden");
  inventoryItemSheet.setAttribute("aria-hidden", "false");
  renderInventoryItemSheet();
}

function closeInventoryItem() {
  selectedInventoryItemId = null;
  inventoryItemSheet.classList.add("hidden");
  inventoryItemSheet.setAttribute("aria-hidden", "true");
}

function sellInventoryItem(itemId) {
  const item = ITEMS[itemId];
  if (!item || item.sellValue <= 0 || !removeInventoryItem(itemId, 1)) return;
  save.coins += item.sellValue;
  persist();
  renderRoom();
  renderInventory();

  if (inventoryQuantity(itemId) > 0) renderInventoryItemSheet();
  else closeInventoryItem();

  showToast(`Sold ${item.name} for ${item.sellValue} Pink Coins. ♡`);
}

function giftInventoryItem(itemId) {
  const item = ITEMS[itemId];
  if (!item || !item.giftable || !removeInventoryItem(itemId, 1)) return;

  const character = getCurrentCharacter();
  const preferenceId = getGiftPreference(itemId, character);
  const reaction = GIFT_REACTIONS[preferenceId] || GIFT_REACTIONS.okay;
  save.stats.happiness += reaction.happiness;
  persist();

  closeInventoryItem();
  closeInventoryAll();
  setExpression(reaction.expression, reaction.duration);
  showGiftBurst(reaction.burst);

  const happinessText = reaction.happiness > 0 ? ` +${reaction.happiness} Happiness!` : " No Happiness lost.";
  showToast(`${character.name} ${preferenceId === "favorite" ? "loved" : preferenceId === "like" ? "liked" : preferenceId === "okay" ? "enjoyed" : "wasn’t too excited about"} ${item.name}.${happinessText}`);
}

function openInventory() {
  closeCloset();
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
  }
  if (!statusPanel.classList.contains("hidden")) {
    renderStatus();
  }

  if (options.notify !== false) {
    showToast(`New Duckipedia entry: ${DUCKS[id].name}! 🦆`);
  }

  return true;
}

function duckDiscoveryHint(duck) {
  if (duck.recipe) return "Craft this duck in the Duck Crafter to discover it.";

  switch (duck.acquisition) {
    case "rare-drop":
      return "A very rare surprise. Keep an eye out while playing!";
    case "hidden-sighting":
      return "A tiny secret visitor may rarely appear around the game.";
    case "four-tiny-sightings":
      return "Spot Tiny Ducks four times to complete this special trophy.";
    case "drop-or-shop":
      return "Find or buy a Standard Duck to discover this entry.";
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
    ? "This one-time trophy is permanently unlocked in your collection. You’ll be able to display it in the room later!"
    : duckDiscoveryHint(duck);

  duckDetailSheet.classList.remove("hidden");
  duckDetailSheet.setAttribute("aria-hidden", "false");
}

function closeDuckDetail() {
  selectedDuckId = null;
  duckDetailSheet.classList.add("hidden");
  duckDetailSheet.setAttribute("aria-hidden", "true");
}

function openDuckipedia() {
  closeCloset();
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

function shopStockForTab(tab = currentShopTab) {
  return Array.isArray(SHOP_STOCK[tab]) ? SHOP_STOCK[tab] : [];
}

function getShopListing(itemId) {
  for (const listings of Object.values(SHOP_STOCK)) {
    const listing = listings.find(entry => entry.itemId === itemId);
    if (listing) return listing;
  }
  return null;
}

function renderShop() {
  const category = SHOP_CATEGORIES[currentShopTab] || SHOP_CATEGORIES.supplies;
  const stock = shopStockForTab();

  shopCoinCount.textContent = Number(save.coins || 0).toLocaleString();
  shopCategoryTitle.textContent = category.label;
  shopCategorySubtitle.textContent = category.subtitle;
  shopStockCount.textContent = `${stock.length} item${stock.length === 1 ? "" : "s"}`;

  document.querySelectorAll("[data-shop-tab]").forEach(button => {
    const active = button.dataset.shopTab === currentShopTab;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });

  shopGrid.innerHTML = "";

  stock.forEach(listing => {
    const item = ITEMS[listing.itemId];
    if (!item) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "shop-item-card";
    button.dataset.itemId = listing.itemId;

    const art = document.createElement("span");
    art.className = "shop-item-art";
    renderItemArtwork(art, item);

    const copy = document.createElement("span");
    copy.className = "shop-item-copy";

    const name = document.createElement("strong");
    name.textContent = item.name;

    const price = document.createElement("span");
    price.className = "shop-item-price";
    price.innerHTML = `<img src="assets/ui/pink-coin.png" alt=""> ${listing.price}`;

    const owned = document.createElement("span");
    owned.className = "shop-item-owned";
    owned.textContent = `Owned ×${inventoryQuantity(listing.itemId)}`;

    copy.append(name, price, owned);
    button.append(art, copy);
    button.addEventListener("click", () => openShopItem(listing.itemId));
    shopGrid.append(button);
  });
}

function openShopItem(itemId) {
  const listing = getShopListing(itemId);
  if (!listing || !ITEMS[itemId]) return;

  selectedShopItemId = itemId;
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
  const itemId = selectedShopItemId;
  const item = ITEMS[itemId];
  const listing = getShopListing(itemId);

  if (!item || !listing) {
    closeShopItem();
    return;
  }

  selectedShopQuantity = Math.max(1, Math.min(SHOP_MAX_QUANTITY, Number(selectedShopQuantity) || 1));

  const total = listing.price * selectedShopQuantity;
  const balance = Number(save.coins || 0);
  const shortfall = Math.max(0, total - balance);
  const category = SHOP_CATEGORIES[currentShopTab] || SHOP_CATEGORIES.supplies;

  renderItemArtwork(shopSheetIcon, item);
  shopSheetCategory.textContent = category.label;
  shopSheetName.textContent = item.name;
  shopSheetUnitPrice.textContent = `${listing.price} Pink Coins`;
  shopSheetOwned.textContent = `×${inventoryQuantity(itemId)}`;
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
  selectedShopQuantity = Math.max(
    1,
    Math.min(SHOP_MAX_QUANTITY, selectedShopQuantity + amount)
  );
  renderShopItemSheet();
}

function buyShopItem() {
  const itemId = selectedShopItemId;
  const item = ITEMS[itemId];
  const listing = getShopListing(itemId);
  if (!item || !listing) return;

  const quantity = Math.max(1, Math.min(SHOP_MAX_QUANTITY, Number(selectedShopQuantity) || 1));
  const total = listing.price * quantity;

  if (save.coins < total) {
    showToast("Not quite enough Pink Coins yet! ♡");
    renderShopItemSheet();
    return;
  }

  save.coins -= total;
  addInventoryItem(itemId, quantity);
  persist();

  renderRoom();
  renderShop();
  renderShopItemSheet();

  showToast(`Bought ${item.name} ×${quantity} for ${total} Pink Coins!`);
}

function openShop() {
  closeCloset();
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

function shoppingTripFinished(daily) {
  return Boolean(daily.activeUntil) && Date.now() >= Number(daily.activeUntil);
}

function clearDailyTimer() {
  if (dailyTimerInterval) {
    clearInterval(dailyTimerInterval);
    dailyTimerInterval = null;
  }
}

function renderDailies() {
  clearDailyTimer();

  const daily = getShoppingDaily();
  const currentCharacter = getCurrentCharacter();
  const remainingUses = Math.max(0, SHOPPING_DAILY_LIMIT - Number(daily.usedToday || 0));
  shoppingUsesBadge.textContent = `${daily.usedToday || 0} / ${SHOPPING_DAILY_LIMIT}`;
  dailyInventoryCount.textContent = `${totalInventoryItems()} item${totalInventoryItems() === 1 ? "" : "s"}`;

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
    if (shoppingTripFinished(daily)) {
      daily.pendingReward = chooseShoppingReward();
      daily.activeUntil = null;
      persist();
      renderDailies();
      return;
    }

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

    dailyTimerInterval = setInterval(() => {
      const nowDaily = getShoppingDaily();

      if (!nowDaily.activeUntil || Date.now() >= Number(nowDaily.activeUntil)) {
        clearDailyTimer();
        if (nowDaily.activeUntil) {
          nowDaily.pendingReward = chooseShoppingReward();
          nowDaily.activeUntil = null;
          persist();
        }
        renderDailies();
        return;
      }

      const countdown = document.querySelector("#shoppingCountdown");
      if (countdown) {
        countdown.textContent = `Back in ${formatCountdown(Number(nowDaily.activeUntil) - Date.now())}`;
      }
    }, 1000);

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
  clearDailyTimer();
  dailiesPanel.classList.add("hidden");
  bookPanel.classList.remove("hidden");
}

function closeDailiesAll() {
  clearDailyTimer();
  dailiesPanel.classList.add("hidden");
  bookPanel.classList.add("hidden");
}


// -------------------- STATUS / LEVELS --------------------
// XP requirements gently rise by 25 each level:
// L1 -> L2 = 100 XP, L2 -> L3 = 125 XP, etc.
function xpNeededForLevel(level) {
  return 100 + Math.max(0, Number(level) - 1) * 25;
}

function getLevelProgress(totalXp = save.stats.xp) {
  let level = 1;
  let remaining = Math.max(0, Number(totalXp) || 0);
  let needed = xpNeededForLevel(level);

  // Keep consuming completed level thresholds until we reach the current level.
  while (remaining >= needed) {
    remaining -= needed;
    level += 1;
    needed = xpNeededForLevel(level);
  }

  return {
    level,
    currentXp: remaining,
    neededXp: needed,
    percent: needed > 0 ? Math.min(100, (remaining / needed) * 100) : 0
  };
}

function renderStatusCharacter() {
  const character = getCurrentCharacter();
  statusCharacterName.textContent = character.name;
  statusPeepPreview.setAttribute("aria-label", `${character.name} current look`);
  renderCurrentCharacterInto(statusPeepPreview);
}

function renderStatus() {
  const stats = save.stats || DEFAULT_SAVE.stats;
  const progress = getLevelProgress(stats.xp);

  statusLevelBadge.textContent = `Level ${progress.level}`;
  statusHappinessLabel.textContent = `Happiness ${stats.happiness} ♡`;
  statusXpText.textContent = `${progress.currentXp} / ${progress.neededXp}`;
  statusXpFill.style.width = `${progress.percent}%`;

  statusCoins.textContent = save.coins.toLocaleString();
  statusTasksCompleted.textContent = stats.tasksCompleted.toLocaleString();
  statusDucks.textContent = `${save.unlockedDucks.length} / ${DUCK_TOTAL}`;
  statusHappiness.textContent = stats.happiness.toLocaleString();
  statusTaskCoins.textContent = stats.taskCoinsEarned.toLocaleString();
  statusTotalXp.textContent = stats.xp.toLocaleString();

  renderStatusCharacter();
}

function openStatus() {
  closeCloset();
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

function nextDueAfterCompletion(task, completionKey = localDateKey()) {
  switch (task.repeat?.type) {
    case "daily": return addDaysKey(completionKey, 1);
    case "weekly": return addDaysKey(completionKey, 7);
    case "monthly": return addMonthsKey(completionKey, 1);
    case "weekdays": return nextSelectedWeekday(completionKey, task.repeat.weekdays);
    case "interval": return addDaysKey(completionKey, Math.max(2, Number(task.repeat.intervalDays) || 2));
    default: return null;
  }
}

function formatFriendlyDate(key) {
  if (!key) return "";
  const date = parseDateKey(key);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function repeatLabel(task) {
  const repeat = task.repeat || { type: "once" };
  if (repeat.type === "once") return "One-time";
  if (repeat.type === "daily") return "Daily";
  if (repeat.type === "weekly") return "Weekly";
  if (repeat.type === "monthly") return "Monthly";
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
    completions: Number(task.completions) || 0
  };
}

save.tasks = save.tasks.map(normalizeTask);

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

function deleteActiveTask(id) {
  const task = save.tasks.find(item => item.id === id);
  if (!task) return;
  if (!confirm(`Remove "${task.name}" from your active tasks?`)) return;
  save.tasks = save.tasks.filter(item => item.id !== id);
  persist();
  renderTasks();
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

  const levelBefore = getLevelProgress(save.stats.xp).level;
  const reward = Math.max(1, Number(task.reward) || 5);
  save.coins += reward;
  save.stats.tasksCompleted += 1;
  save.stats.taskCoinsEarned += reward;
  save.stats.xp += 10;
  save.stats.happiness += 1;
  task.completions = (task.completions || 0) + 1;
  recordTaskCompletion(task, reward);

  if (task.repeat?.type === "once") {
    save.tasks = save.tasks.filter(item => item.id !== id);
  } else {
    task.nextDue = nextDueAfterCompletion(task, localDateKey());
  }

  const levelAfter = getLevelProgress(save.stats.xp).level;

  persist();
  renderRoom();
  renderTasks();
  setExpression("expression-happy", 2200);

  if (levelAfter > levelBefore) {
    showToast(`Level up! Level ${levelAfter} ✨ +${reward} Pink Coins`);
  } else {
    showToast(`Task complete! +${reward} Pink Coins ♡`);
  }
}

function renderTaskCard(task) {
  const card = document.createElement("article");
  card.className = `task-card${isTaskReady(task) ? " ready" : " upcoming"}`;

  const main = document.createElement("div");
  main.className = "task-card-main";

  const text = document.createElement("div");
  text.className = "task-card-text";
  const title = document.createElement("strong");
  title.textContent = task.name;
  const meta = document.createElement("div");
  meta.className = "task-card-meta";

  const repeat = document.createElement("span");
  repeat.textContent = repeatLabel(task);
  const due = document.createElement("span");
  due.textContent = taskDueText(task);
  meta.append(repeat, due);
  text.append(title, meta);

  const reward = createCoinInline(task.reward);
  main.append(text, reward);

  const actions = document.createElement("div");
  actions.className = "task-card-actions";

  const complete = document.createElement("button");
  complete.type = "button";
  complete.className = "complete-task-button";
  complete.textContent = isTaskReady(task) ? "✓ Complete" : taskDueText(task);
  complete.disabled = !isTaskReady(task);
  complete.addEventListener("click", () => completeTask(task.id));

  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "task-delete-button";
  remove.textContent = "Remove";
  remove.addEventListener("click", () => deleteActiveTask(task.id));

  actions.append(complete, remove);
  card.append(main, actions);
  return card;
}

function addTaskFromTemplate(template) {
  save.tasks.push(normalizeTask({
    ...template,
    id: makeId(),
    nextDue: localDateKey(),
    createdAt: Date.now(),
    completions: 0
  }));
  persist();
  currentTaskTab = "today";
  renderTasks();
  showToast(`Added "${template.name}" to your tasks.`);
}

function deleteTemplate(id) {
  const template = save.savedTaskTemplates.find(item => item.id === id);
  if (!template) return;
  if (!confirm(`Delete "${template.name}" from Saved Tasks?`)) return;
  save.savedTaskTemplates = save.savedTaskTemplates.filter(item => item.id !== id);
  persist();
  renderTasks();
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

function renderTodayTasks() {
  const list = document.createElement("div");
  list.className = "task-list";

  if (!save.tasks.length) {
    list.append(createEmptyTasksMessage(
      "No tasks yet!",
      "Tap + Add Task and make your first reward-only task."
    ));
    tasksContent.append(list);
    return;
  }

  const sorted = [...save.tasks].sort((a, b) => {
    const readyDifference = Number(isTaskReady(b)) - Number(isTaskReady(a));
    if (readyDifference) return readyDifference;
    return String(a.nextDue || "").localeCompare(String(b.nextDue || ""));
  });

  const ready = sorted.filter(isTaskReady);
  const upcoming = sorted.filter(task => !isTaskReady(task));

  if (ready.length) {
    const heading = document.createElement("h2");
    heading.className = "task-list-heading";
    heading.textContent = "Ready";
    list.append(heading);
    ready.forEach(task => list.append(renderTaskCard(task)));
  }

  if (upcoming.length) {
    const heading = document.createElement("h2");
    heading.className = "task-list-heading upcoming-heading";
    heading.textContent = "Upcoming";
    list.append(heading);
    upcoming.forEach(task => list.append(renderTaskCard(task)));
  }

  tasksContent.append(list);
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
  todayTab.classList.toggle("active", currentTaskTab === "today");
  todayTab.setAttribute("aria-selected", String(currentTaskTab === "today"));
  savedTab.classList.toggle("active", currentTaskTab === "saved");
  savedTab.setAttribute("aria-selected", String(currentTaskTab === "saved"));
  completedTab.classList.toggle("active", currentTaskTab === "completed");
  completedTab.setAttribute("aria-selected", String(currentTaskTab === "completed"));

  tasksContent.innerHTML = "";
  if (currentTaskTab === "saved") renderSavedTasks();
  else if (currentTaskTab === "completed") renderCompletedTasks();
  else renderTodayTasks();
}

function openTasks() {
  closeCloset();
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
  taskFormPanel.classList.add("hidden");
  tasksPanel.classList.add("hidden");
  bookPanel.classList.remove("hidden");
}

function closeTasksAll() {
  taskFormPanel.classList.add("hidden");
  tasksPanel.classList.add("hidden");
  bookPanel.classList.add("hidden");
}

function resetTaskForm() {
  taskForm.reset();
  document.querySelector('input[name="taskReward"][value="5"]').checked = true;
  customReward.classList.add("hidden");
  customReward.value = "";
  weekdayOptions.classList.add("hidden");
  intervalOptions.classList.add("hidden");
  intervalDays.value = "10";
}

function openTaskForm() {
  resetTaskForm();
  taskFormPanel.classList.remove("hidden");
  requestAnimationFrame(() => taskName.focus());
}

function closeTaskForm() {
  taskFormPanel.classList.add("hidden");
}

function updateRepeatExtras() {
  weekdayOptions.classList.toggle("hidden", taskRepeat.value !== "weekdays");
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
  if (taskRepeat.value === "interval") {
    const days = Math.max(2, Math.min(365, Number(intervalDays.value) || 0));
    if (!days) return null;
    return { type: "interval", intervalDays: days };
  }
  return { type: taskRepeat.value };
}

function submitTaskForm(event) {
  event.preventDefault();

  const name = taskName.value.trim();
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
      : "Choose how many days to repeat.");
    return;
  }

  const task = normalizeTask({
    id: makeId(),
    name,
    reward,
    repeat,
    nextDue: localDateKey(),
    createdAt: Date.now(),
    completions: 0
  });

  save.tasks.push(task);

  if (saveAsTemplate.checked) {
    save.savedTaskTemplates.push({
      id: makeId("template"),
      name: task.name,
      reward: task.reward,
      repeat: structuredClone(task.repeat)
    });
  }

  persist();
  closeTaskForm();
  currentTaskTab = "today";
  renderTasks();
  showToast(`Added "${task.name}"!`);
}


function openCloset() {
  closeDuckDetail();
  duckipediaPanel.classList.add("hidden");
  closeInventoryItem();
  inventoryPanel.classList.add("hidden");
  clearDailyTimer();
  dailiesPanel.classList.add("hidden");
  statusPanel.classList.add("hidden");
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

function closePanels() {
  closeCloset();
  closeInventoryItem();
  closeShopItem();
  closeDuckDetail();
  inventoryPanel.classList.add("hidden");
  shopPanel.classList.add("hidden");
  duckipediaPanel.classList.add("hidden");
  clearDailyTimer();
  dailiesPanel.classList.add("hidden");
  bookPanel.classList.add("hidden");
  statusPanel.classList.add("hidden");
  tasksPanel.classList.add("hidden");
  taskFormPanel.classList.add("hidden");
}

roomPickerButton.addEventListener("click", () => {
  const opening = roomPicker.classList.contains("hidden");
  roomPicker.classList.toggle("hidden", !opening);
  roomPickerButton.setAttribute("aria-expanded", String(opening));
});

document.querySelector("#mirrorHotspot").addEventListener("click", openCloset);
document.querySelector("#bookHotspot").addEventListener("click", () => {
  closeCloset();
  closeShopItem();
  closeDuckDetail();
  shopPanel.classList.add("hidden");
  duckipediaPanel.classList.add("hidden");
  clearDailyTimer();
  dailiesPanel.classList.add("hidden");
  statusPanel.classList.add("hidden");
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
    if (page === "duckipedia") {
      openDuckipedia();
      return;
    }
    if (page === "characters") {
      showToast("More OCs can live here later! ♡");
      return;
    }
    const label = button.querySelector("span")?.textContent || "That page";
    showToast(`${label} is coming in a later step.`);
  });
});


document.querySelector("#duckipediaBack").addEventListener("click", closeDuckipediaToBook);
document.querySelector("#closeDuckipedia").addEventListener("click", closeDuckipediaAll);
document.querySelector("#closeDuckDetail").addEventListener("click", closeDuckDetail);
document.querySelector("#duckDetailBackdrop").addEventListener("click", closeDuckDetail);
document.querySelectorAll("[data-duck-filter]").forEach(button => {
  button.addEventListener("click", () => {
    currentDuckipediaFilter = button.dataset.duckFilter;
    closeDuckDetail();
    renderDuckipedia();
  });
});

document.querySelector("#inventoryBack").addEventListener("click", closeInventoryToBook);
document.querySelector("#closeInventory").addEventListener("click", closeInventoryAll);
document.querySelector("#closeInventoryItem").addEventListener("click", closeInventoryItem);
document.querySelector("#inventorySheetBackdrop").addEventListener("click", closeInventoryItem);
document.querySelectorAll("[data-inventory-tab]").forEach(button => {
  button.addEventListener("click", () => {
    currentInventoryTab = button.dataset.inventoryTab;
    closeInventoryItem();
    renderInventory();
  });
});


document.querySelector("#shopBack").addEventListener("click", closeShopToBook);
document.querySelector("#closeShop").addEventListener("click", closeShopAll);
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

document.querySelector("#dailiesBack").addEventListener("click", closeDailiesToBook);
document.querySelector("#closeDailies").addEventListener("click", closeDailiesAll);
shoppingActionButton.addEventListener("click", handleShoppingAction);
document.querySelector("#dailyInventoryHint").addEventListener("click", openInventory);

document.querySelector("#statusBack").addEventListener("click", closeStatusToBook);
document.querySelector("#closeStatus").addEventListener("click", closeStatusAll);
document.querySelector("#tasksBack").addEventListener("click", closeTasksToBook);
document.querySelector("#closeTasks").addEventListener("click", closeTasksAll);
document.querySelector("#addTaskButton").addEventListener("click", openTaskForm);
document.querySelector("#closeTaskForm").addEventListener("click", closeTaskForm);
document.querySelector("#cancelTaskForm").addEventListener("click", closeTaskForm);

todayTab.addEventListener("click", () => {
  currentTaskTab = "today";
  renderTasks();
});
savedTab.addEventListener("click", () => {
  currentTaskTab = "saved";
  renderTasks();
});
completedTab.addEventListener("click", () => {
  currentTaskTab = "completed";
  renderTasks();
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

document.addEventListener("click", event => {
  if (!roomPicker.contains(event.target) && !roomPickerButton.contains(event.target)) closeRoomPicker();
  if (!closetCategoryMenu.contains(event.target) && !closetCategoryButton.contains(event.target)) {
    closetCategoryMenu.classList.add("hidden");
    closetCategoryButton.setAttribute("aria-expanded", "false");
  }
});

preloadPeepAssets();
save.tasks = save.tasks.map(normalizeTask);
persist();
renderRoom();
renderPeep();
renderRoomPicker();
renderClosetCategoryMenu();
