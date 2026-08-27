const STORAGE_KEY = "duckHabitHubSave_v1";
const SAVE_VERSION = 17;

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
    "subtitle": "Decorate each room with a left-side piece, pet bed, and rug.",
    "empty": "No furniture yet. Visit the Shop to pick out something cozy!"
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
  },
  "petbed-gray": {
    "name": "Gray Pet Bed",
    "category": "furniture",
    "image": "assets/furniture/pet-beds/petbed-gray.png",
    "icon": "♡",
    "sellValue": 12,
    "furnitureSlot": "petBed",
    "furnitureType": "petBed",
    "duckPerch": "petBed",
    "thumbBounds": [837, 1669, 1060, 1787]
  },
  "petbed-pink": {
    "name": "Pink Pet Bed",
    "category": "furniture",
    "image": "assets/furniture/pet-beds/petbed-pink.png",
    "icon": "♡",
    "sellValue": 12,
    "furnitureSlot": "petBed",
    "furnitureType": "petBed",
    "duckPerch": "petBed",
    "thumbBounds": [837, 1669, 1060, 1787]
  },
  "petbed-cream": {
    "name": "Cream Pet Bed",
    "category": "furniture",
    "image": "assets/furniture/pet-beds/petbed-cream.png",
    "icon": "♡",
    "sellValue": 12,
    "furnitureSlot": "petBed",
    "furnitureType": "petBed",
    "duckPerch": "petBed",
    "thumbBounds": [837, 1669, 1060, 1787]
  },
  "petbed-red": {
    "name": "Red Pet Bed",
    "category": "furniture",
    "image": "assets/furniture/pet-beds/petbed-red.png",
    "icon": "♡",
    "sellValue": 12,
    "furnitureSlot": "petBed",
    "furnitureType": "petBed",
    "duckPerch": "petBed",
    "thumbBounds": [837, 1669, 1060, 1787]
  },
  "petbed-blue": {
    "name": "Blue Pet Bed",
    "category": "furniture",
    "image": "assets/furniture/pet-beds/petbed-blue.png",
    "icon": "♡",
    "sellValue": 12,
    "furnitureSlot": "petBed",
    "furnitureType": "petBed",
    "duckPerch": "petBed",
    "thumbBounds": [837, 1669, 1060, 1787]
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
  },
  rooms: {
    label: "Room Styles",
    subtitle: "Unlock a new room color permanently for 50 Pink Coins."
  },
  furniture: {
    label: "Furniture",
    subtitle: "Furniture is a reusable room style: buy it once, then decorate any room with it."
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
  ],
  rooms: [
    { roomId: "green", price: 50 },
    { roomId: "blue", price: 50 },
    { roomId: "purple", price: 50 },
    { roomId: "peach", price: 50 },
    { roomId: "pink", price: 50 },
    { roomId: "dark-purple", price: 50 },
    { roomId: "cotton-candy", price: 50 },
    { roomId: "chocolate-brown", price: 50 }
  ],
  furniture: [
    { itemId: "petbed-gray", price: 30 },
    { itemId: "petbed-pink", price: 30 },
    { itemId: "petbed-cream", price: 30 },
    { itemId: "petbed-red", price: 30 },
    { itemId: "petbed-blue", price: 30 },
    { itemId: "shelf-white", price: 35 },
    { itemId: "shelf-dark-brown", price: 35 },
    { itemId: "shelf-brown", price: 35 },
    { itemId: "dresser-brown", price: 35 },
    { itemId: "dresser-dark-brown", price: 35 },
    { itemId: "rug-cloud-dark", price: 25 },
    { itemId: "rug-cloud-white", price: 25 },
    { itemId: "rug-heart-white", price: 25 },
    { itemId: "rug-heart-dark", price: 25 },
    { itemId: "rug-heart-pink", price: 25 },
    { itemId: "rug-heart-blue", price: 25 }
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
  tinyDuckSightings: 0,
  outfit: structuredClone(DEFAULT_OUTFIT),
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
let currentShopTab = "supplies";
let selectedShopItemId = null;
let selectedShopQuantity = 1;
let currentDuckipediaFilter = "all";
let selectedDuckId = null;
let currentCrafterTab = "ducks";
let selectedCraftTarget = null;
let dailyTimerInterval = null;
let toastTimer;

const stage = document.querySelector("#stage");
const roomImage = document.querySelector("#roomImage");
const peepWrap = document.querySelector("#peepWrap");
const peepLayers = document.querySelector("#peepLayers");
const headDuckDisplay = document.querySelector("#headDuckDisplay");
const floorDuckDisplay = document.querySelector("#floorDuckDisplay");
const rugFurnitureDisplay = document.querySelector("#rugFurnitureDisplay");
const leftFurnitureDisplay = document.querySelector("#leftFurnitureDisplay");
const petBedFurnitureDisplay = document.querySelector("#petBedFurnitureDisplay");
const furnitureDuckLayer = document.querySelector("#furnitureDuckLayer");
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
  renderRoomFurniture();
  renderDuckPlacements();
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
  renderDuckPlacements();
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
        showToast("Locked — unlock this room from the Shop for 50 Pink Coins!");
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
    const placementNote = document.createElement("div");
    placementNote.className = "inventory-furniture-placement";
    placementNote.textContent = furniturePlacementText(itemId);
    inventorySheetActions.append(placementNote);

    const roomFurniture = getRoomFurniture(save.room);
    const isPlaced = roomFurniture[item.furnitureSlot] === itemId;

    const placeButton = document.createElement("button");
    placeButton.type = "button";
    placeButton.className = `inventory-action primary${isPlaced ? " placed" : ""}`;
    placeButton.textContent = isPlaced ? "Remove from Room" : "Place in Room";
    placeButton.addEventListener("click", () => placeFurnitureItemInCurrentRoom(itemId));
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

  if (item.category === "furniture" && inventoryQuantity(itemId) <= 0) {
    clearFurnitureItemFromRooms(itemId);
  }

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
  rug: null
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
  const savedRoom = save.roomFurniture[roomId];
  return {
    ...EMPTY_ROOM_FURNITURE,
    ...(savedRoom && typeof savedRoom === "object" ? savedRoom : {})
  };
}

function ensureRoomFurniture(roomId = save.room) {
  normalizeRoomFurniture();
  if (!save.roomFurniture[roomId] || typeof save.roomFurniture[roomId] !== "object") {
    save.roomFurniture[roomId] = { ...EMPTY_ROOM_FURNITURE };
  }
  return save.roomFurniture[roomId];
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

function renderRoomFurniture() {
  const roomFurniture = getRoomFurniture(save.room);
  renderFurnitureOverlay(rugFurnitureDisplay, roomFurniture.rug);
  renderFurnitureOverlay(leftFurnitureDisplay, roomFurniture.left);
  renderFurnitureOverlay(petBedFurnitureDisplay, roomFurniture.petBed);
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
  return validDisplayDuckId(save.duckDisplays.floorByRoom[roomId]);
}

function duckDisplayName(duckId) {
  return duckId && DUCKS[duckId] ? DUCKS[duckId].name : "None";
}

function ensureFurnitureDuckDisplays(roomId = save.room) {
  normalizeDuckDisplays();
  if (!save.duckDisplays.furnitureByRoom[roomId] ||
      typeof save.duckDisplays.furnitureByRoom[roomId] !== "object") {
    save.duckDisplays.furnitureByRoom[roomId] = {
      shelf: {},
      dresser: null,
      petBed: null
    };
  }

  const roomDisplays = save.duckDisplays.furnitureByRoom[roomId];
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
    SHELF_DUCK_PERCHES.forEach((placement, index) => {
      const duckId = displays.shelf[String(index + 1)];
      appendFurnitureDuck(duckId, placement, "shelf-perched-duck");
    });
  }

  if (leftType === "dresser" && roomFurniture.left) {
    appendFurnitureDuck(displays.dresser, DRESSER_DUCK_PERCH, "dresser-perched-duck");
  }

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
  const current = currentFloorDuckId(room.id);

  if (current === duckId) {
    delete save.duckDisplays.floorByRoom[room.id];
    persist();
    renderDuckPlacements();
    renderDuckDetailPlacementControls();
    showToast(`${DUCKS[duckId].name} was removed from the ${room.name} floor. ♡`);
    return;
  }

  save.duckDisplays.floorByRoom[room.id] = duckId;
  persist();
  renderDuckPlacements();
  renderDuckDetailPlacementControls();
  showToast(`${DUCKS[duckId].name} is now hanging out in the ${room.name} room! 🦆`);
}


function assignSelectedDuckToShelf(slotNumber) {
  const duckId = validDisplayDuckId(selectedDuckId);
  const slot = String(Number(slotNumber));
  if (!duckId || !["1", "2", "3", "4", "5", "6"].includes(slot)) return;
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
    detail.textContent = current
      ? `${duckDisplayName(current)}${current === selectedDuckId ? " ✓" : ""}`
      : "Empty";

    button.append(label, detail);
    button.classList.toggle("active", current === selectedDuckId);
    button.addEventListener("click", () => assignSelectedDuckToShelf(slot));
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
  const hasDresser = leftType === "dresser" && Boolean(roomFurniture.left);
  const hasPetBed = Boolean(roomFurniture.petBed);

  assignDuckToShelf.classList.toggle("hidden", !hasShelf);
  assignDuckToDresser.classList.toggle("hidden", !hasDresser);
  assignDuckToPetBed.classList.toggle("hidden", !hasPetBed);

  if (hasShelf) {
    const occupied = Object.values(furnitureDisplays.shelf)
      .map(validDisplayDuckId)
      .filter(Boolean).length;
    assignDuckToShelfNote.textContent = `Choose Shelf 1–6 · 1 is top, 6 is bottom · ${occupied}/6 filled.`;
    renderShelfDuckPicker(duckId);
  } else {
    duckShelfPicker.classList.add("hidden");
  }

  if (hasDresser) {
    assignDuckToDresser.querySelector("strong").textContent =
      thisDuckOnDresser ? "Remove from Dresser" : "Assign to Dresser";
    assignDuckToDresserNote.textContent = thisDuckOnDresser
      ? `Take ${DUCKS[duckId].name} off the dresser.`
      : furnitureDisplays.dresser
        ? `Replace ${duckDisplayName(furnitureDisplays.dresser)} on top of the dresser.`
        : `Sit ${DUCKS[duckId].name} on top of the dresser.`;
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

  currentDresserDuckText.textContent = hasDresser
    ? `Dresser: ${duckDisplayName(furnitureDisplays.dresser)}`
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
  return isHomeRoomInteractive() &&
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

  persist();
  hideTinyDuckSecret();

  if (stackWasNew) {
    showToast("Tiny Duck sighting #4! Tiny Duck Stack unlocked! 🦆🦆🦆🦆");
  } else if (tinyWasNew) {
    showToast("You found Tiny Duck! Added to Duckipedia! 🦆✨");
  } else {
    const capped = Math.min(sightings, TINY_DUCK_STACK_SIGHTINGS);
    showToast(`Tiny Duck spotted again! ${capped}/${TINY_DUCK_STACK_SIGHTINGS} sightings ♡`);
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
  window.location.href = "bakery/";
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

function createCrafterCard(target, name, imagePath, status, ownedText = "") {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `crafter-item-card ${status.className}`;

  const art = document.createElement("span");
  art.className = "crafter-item-art";
  const img = document.createElement("img");
  img.src = imagePath;
  img.alt = "";
  img.loading = "lazy";
  img.decoding = "async";
  art.append(img);

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

function renderRecipeGuideTab() {
  const wrapper = document.createElement("div");
  wrapper.className = "recipe-guide";

  const intro = document.createElement("section");
  intro.className = "crafter-intro recipes";
  intro.innerHTML = `
    <div>
      <strong>Recipe Book</strong>
      <p>Use this page whenever you want to check how a duck or mixed paint is made.</p>
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
  const img = document.createElement("img");
  img.src = target.file;
  img.alt = "";
  craftSheetArt.append(img);

  craftSheetEyebrow.textContent = target.type === "duck" ? "DUCK RECIPE" : "PAINT RECIPE";
  craftSheetName.textContent = target.name;

  const ready = recipeHasMaterials(target.recipe);

  if (target.type === "duck" && target.alreadyCrafted) {
    craftSheetNote.textContent = "You already crafted this one-time trophy. It is safely stored in Duckipedia!";
  } else if (target.type === "duck") {
    craftSheetNote.textContent = "Crafting consumes the ingredients below and permanently unlocks this duck in Duckipedia.";
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

  if (ready) {
    craftReadyBadge.textContent = "Ready!";
    craftReadyBadge.className = "craft-ready-badge ready";
    craftActionButton.textContent = target.type === "duck" ? "Craft Duck 🦆" : "Mix Paint 🎨";
    craftActionButton.disabled = false;
    craftActionButton.classList.add("ready");
  } else {
    craftReadyBadge.textContent = "Missing items";
    craftReadyBadge.className = "craft-ready-badge missing";
    craftActionButton.textContent = target.type === "duck" ? "Not Ready Yet" : "Need More Paint";
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
  persist();
  renderRoom();
  renderCrafter();
  renderCraftSheet();
  showToast(`${target.name} mixed! 🎨`);
}

function openCrafter(tab = currentCrafterTab) {
  currentCrafterTab = ["ducks", "paint", "recipes"].includes(tab) ? tab : "ducks";

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



function shopStockForTab(tab = currentShopTab) {
  return Array.isArray(SHOP_STOCK[tab]) ? SHOP_STOCK[tab] : [];
}

function getShopListing(listingId) {
  for (const listings of Object.values(SHOP_STOCK)) {
    const listing = listings.find(entry =>
      entry.itemId === listingId || entry.roomId === listingId
    );
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
    const isRoom = Boolean(listing.roomId);
    const room = isRoom ? getShopRoom(listing.roomId) : null;
    const item = isRoom ? null : ITEMS[listing.itemId];

    if (isRoom && !room) return;
    if (!isRoom && !item) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = `shop-item-card${isRoom ? " shop-room-card" : ""}`;
    button.dataset.itemId = isRoom ? listing.roomId : listing.itemId;

    const art = document.createElement("span");
    art.className = `shop-item-art${isRoom ? " shop-room-art" : ""}`;

    if (isRoom) renderShopRoomArtwork(art, room);
    else renderItemArtwork(art, item);

    const copy = document.createElement("span");
    copy.className = "shop-item-copy";

    const name = document.createElement("strong");
    name.textContent = isRoom ? room.name : item.name;

    const price = document.createElement("span");
    price.className = "shop-item-price";
    price.innerHTML = `<img src="assets/ui/pink-coin.png" alt=""> ${listing.price}`;

    const owned = document.createElement("span");
    owned.className = "shop-item-owned";

    if (isRoom) {
      const unlocked = isRoomUnlocked(room.id);
      owned.textContent = unlocked ? "Unlocked ✓" : "Locked";
      button.classList.toggle("purchased", unlocked);
    } else if (item.category === "furniture") {
      const ownedFurniture = isFurnitureOwned(listing.itemId);
      owned.textContent = ownedFurniture ? "Owned ✓" : "Not owned";
      button.classList.toggle("purchased", ownedFurniture);
    } else {
      owned.textContent = `Owned ×${inventoryQuantity(listing.itemId)}`;
    }

    copy.append(name, price, owned);
    button.append(art, copy);
    button.addEventListener("click", () =>
      openShopItem(isRoom ? listing.roomId : listing.itemId)
    );
    shopGrid.append(button);
  });
}

function openShopItem(listingId) {
  const listing = getShopListing(listingId);
  if (!listing) return;

  if (listing.roomId) {
    if (!getShopRoom(listing.roomId)) return;
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

  if (!listing) {
    closeShopItem();
    return;
  }

  const isRoom = Boolean(listing.roomId);
  const room = isRoom ? getShopRoom(listing.roomId) : null;
  const item = isRoom ? null : ITEMS[listing.itemId];

  if (isRoom && !room) {
    closeShopItem();
    return;
  }
  if (!isRoom && !item) {
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
  selectedShopQuantity = Math.max(
    1,
    Math.min(SHOP_MAX_QUANTITY, selectedShopQuantity + amount)
  );
  renderShopItemSheet();
}

function buyShopItem() {
  const listingId = selectedShopItemId;
  const listing = getShopListing(listingId);
  if (!listing) return;

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

    renderRoom();
    renderRoomPicker();
    renderShop();
    closeShopItem();

    showToast(`${room.name} unlocked! You can select it from the room picker. ♡`);
    return;
  }

  const item = ITEMS[listing.itemId];
  if (!item) return;

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

    renderRoom();
    renderShop();
    renderShopItemSheet();
    showToast(`${item.name} added to your Furniture Inventory! ♡`);
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

  // Put the duck into the same portrait coordinate space as Peep.
  // z-index 12 keeps it tucked behind Peep's normal visible layers,
  // matching the Home-room head duck.
  statusPeepPreview.insertBefore(layer, statusPeepPreview.firstChild);
}

function renderStatusCharacter() {
  const character = getCurrentCharacter();
  statusCharacterName.textContent = character.name;
  statusPeepPreview.setAttribute("aria-label", `${character.name} current look`);
  renderCurrentCharacterInto(statusPeepPreview);
  renderStatusHeadDuck();
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
  closeCraftSheet();
  inventoryPanel.classList.add("hidden");
  shopPanel.classList.add("hidden");
  duckipediaPanel.classList.add("hidden");
  crafterPanel.classList.add("hidden");
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
    tasksPanel,
    taskFormPanel,
    bookPanel
  ];

  return blockingPanels.every(panel => panel.classList.contains("hidden"))
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
    if (page === "characters") {
      showToast("More OCs can live here later! ♡");
      return;
    }
    const label = button.querySelector("span")?.textContent || "That page";
    showToast(`${label} is coming in a later step.`);
  });
});




document.querySelector("#gamesBack").addEventListener("click", closeGamesToBook);
document.querySelector("#closeGames").addEventListener("click", closeGamesAll);
openBakeryGameButton.addEventListener("click", launchBakery);

document.querySelector("#crafterBack").addEventListener("click", closeCrafterToBook);
document.querySelector("#closeCrafter").addEventListener("click", closeCrafterAll);
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

document.querySelector("#duckipediaBack").addEventListener("click", closeDuckipediaToBook);
document.querySelector("#closeDuckipedia").addEventListener("click", closeDuckipediaAll);
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


if (window.location.hash === "#games") {
  openGames();
  history.replaceState(null, "", window.location.pathname + window.location.search);
}
