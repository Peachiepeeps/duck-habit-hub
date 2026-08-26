const STORAGE_KEY = "duckHabitHubSave_v1";

const ROOMS = [
  { id: "cream", name: "Cream Room", file: "assets/rooms/cream.png", unlocked: true },
  { id: "green", name: "Green Room", file: "assets/rooms/green.png", unlocked: false },
  { id: "blue", name: "Blue Room", file: "assets/rooms/blue.png", unlocked: false },
  { id: "purple", name: "Purple Room", file: "assets/rooms/purple.png", unlocked: false },
  { id: "peach", name: "Peach Room", file: "assets/rooms/peach.png", unlocked: false },
  { id: "pink", name: "Pink Room", file: "assets/rooms/pink.png", unlocked: false },
  { id: "dark-purple", name: "Dark Purple Room", file: "assets/rooms/dark-purple.png", unlocked: false },
  { id: "cotton-candy", name: "Cotton Candy Room", file: "assets/rooms/cotton-candy.png", unlocked: false },
  { id: "chocolate-brown", name: "Chocolate Brown Room", file: "assets/rooms/chocolate-brown.png", unlocked: false }
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

  // Body and clothing
  "base": { label: "Base", file: "base.png", z: 25 },
  "sock-blue": { label: "White + Blue Socks", pair: ["sock-left-blue.png", "sock-right-blue.png"], z: 29 },
  "sock-rainbow": { label: "Rainbow Socks", pair: ["sock-left-rainbow.png", "sock-right-rainbow.png"], z: 29 },
  "leg-bandage": { label: "Right Leg Bandage", file: "right-leg-bandage.png", z: 30 },
  "bottom-fluffy": { label: "Fluffy Skirt", file: "fluffy-skirt.png", z: 31 },
  "bottom-pleated": { label: "Pleated Skirt", file: "pleated-skirt.png", z: 31 },
  "top-shirt": { label: "Short-Sleeved Shirt", file: "short-sleeved-shirt.png", z: 32 },
  "top-sweater": { label: "Off-Shoulder Sweater", file: "off-shoulder-sweater.png", z: 32 },
  "jacket": { label: "Cropped Jacket", file: "cropped-jacket.png", z: 34 },
  "shoes-loafer": { label: "Loafers", file: "loafer-shoes.png", z: 35 },
  "shoes-sneaker": { label: "Colorful Sneakers", file: "colorful-sneakers.png", z: 35 },

  // Face/head/front layers
  "expression-neutral": { label: "Neutral", file: "expression-neutral.png", z: 42 },
  "expression-happy": { label: "Happy", file: "expression-happy.png", z: 42 },
  "expression-sad": { label: "Sad", file: "expression-sad.png", z: 42 },
  "expression-shocked": { label: "Shocked", file: "expression-shocked.png", z: 42 },
  "expression-mad": { label: "Mad", file: "expression-mad.png", z: 42 },
  "cow-ears": { label: "Cow Ears", file: "cow-ears.png", z: 44 },
  "cat-ears": { label: "Cat Ears", file: "cat-ears.png", z: 44 },
  "horns": { label: "Horns", file: "horns.png", z: 45 },
  "bangs": { label: "Bangs", file: "bangs.png", z: 46 },
  "collar": { label: "Collar", file: "collar.png", z: 48 },
  "cheek-bandage": { label: "Cheek Bandage", file: "cheek-bandage.png", z: 49 },
  "left-bow": { label: "Left Bow", file: "left-bow.png", z: 52 },
  "right-bow": { label: "Right Bow", file: "right-bow.png", z: 52 },
  "hair-side-ribbon": { label: "Hair Side Ribbon", file: "hair-side-ribbon.png", z: 52 },
  "beret": { label: "Beret", file: "beret.png", z: 55 }
};

const CLOSET = [
  { id: "expression", label: "Face", type: "single", options: ["expression-neutral", "expression-happy", "expression-sad", "expression-shocked", "expression-mad"] },
  { id: "hair", label: "Hair", type: "single", allowNone: true, options: ["hair-short", "hair-low-pigtails", "hair-ponytail", "hair-long-pigtails", "hair-jellyfish"] },
  { id: "top", label: "Top", type: "single", allowNone: true, options: ["top-shirt", "top-sweater"] },
  { id: "bottom", label: "Skirt", type: "single", allowNone: true, options: ["bottom-fluffy", "bottom-pleated"] },
  { id: "socks", label: "Socks", type: "single", allowNone: true, options: ["sock-blue", "sock-rainbow"] },
  { id: "shoes", label: "Shoes", type: "single", allowNone: true, options: ["shoes-loafer", "shoes-sneaker"] },
  { id: "tail", label: "Tail", type: "single", allowNone: true, options: ["tail-cow", "tail-bunny"] },
  { id: "extras", label: "Extras", type: "multi", options: ["bangs", "jacket", "leg-bandage", "cow-ears", "cat-ears", "horns", "collar", "cheek-bandage", "left-bow", "right-bow", "hair-side-ribbon", "large-back-bow", "beret"] }
];

const DEFAULT_SAVE = {
  coins: 0,
  room: "cream",
  unlockedRooms: ["cream"],
  outfit: {
    expression: "expression-neutral",
    hair: "hair-short",
    top: "top-shirt",
    bottom: "bottom-pleated",
    socks: "sock-blue",
    shoes: "shoes-loafer",
    tail: null,
    extras: ["bangs"]
  }
};

function loadSave() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_SAVE);
    const saved = JSON.parse(raw);
    return {
      ...structuredClone(DEFAULT_SAVE),
      ...saved,
      outfit: { ...structuredClone(DEFAULT_SAVE.outfit), ...(saved.outfit || {}) }
    };
  } catch {
    return structuredClone(DEFAULT_SAVE);
  }
}

let save = loadSave();
let currentClosetTab = "expression";
let toastTimer;

const roomImage = document.querySelector("#roomImage");
const peepLayers = document.querySelector("#peepLayers");
const roomPickerButton = document.querySelector("#roomPickerButton");
const roomPickerLabel = document.querySelector("#roomPickerLabel");
const roomPicker = document.querySelector("#roomPicker");
const coinCount = document.querySelector("#coinCount");
const closetPanel = document.querySelector("#closetPanel");
const bookPanel = document.querySelector("#bookPanel");
const closetTabs = document.querySelector("#closetTabs");
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
  roomPickerLabel.textContent = room.name;
  coinCount.textContent = save.coins;
}

function getEquippedAssetIds() {
  const ids = ["base"];
  for (const group of CLOSET) {
    const selected = save.outfit[group.id];
    if (group.type === "multi") ids.push(...(Array.isArray(selected) ? selected : []));
    else if (selected) ids.push(selected);
  }
  return ids.filter(Boolean);
}

function renderPeep() {
  peepLayers.innerHTML = "";
  const equipped = getEquippedAssetIds()
    .map(id => ({ id, ...ASSETS[id] }))
    .filter(x => x.file || x.pair)
    .sort((a, b) => a.z - b.z);

  for (const asset of equipped) {
    const files = asset.pair || [asset.file];
    for (const file of files) {
      const img = document.createElement("img");
      img.className = "peep-layer";
      img.src = `assets/peep/${file}`;
      img.alt = "";
      img.style.setProperty("--z", asset.z);
      img.dataset.asset = asset.id;
      peepLayers.append(img);
    }
  }
}

function renderRoomPicker() {
  roomPicker.innerHTML = "";
  for (const room of ROOMS) {
    const unlocked = save.unlockedRooms.includes(room.id) || room.unlocked;
    const button = document.createElement("button");
    button.type = "button";
    button.className = unlocked ? "" : "locked";
    button.setAttribute("aria-current", String(save.room === room.id));
    button.innerHTML = `<span>${room.name}</span><span class="lock">${unlocked ? (save.room === room.id ? "✓" : "") : "🔒"}</span>`;
    button.addEventListener("click", () => {
      if (!unlocked) {
        showToast("Locked — this room will be purchasable in the Shop later!");
        return;
      }
      save.room = room.id;
      persist();
      renderRoom();
      renderRoomPicker();
      roomPicker.classList.add("hidden");
      roomPickerButton.setAttribute("aria-expanded", "false");
    });
    roomPicker.append(button);
  }
}

function renderClosetTabs() {
  closetTabs.innerHTML = "";
  for (const group of CLOSET) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = group.label;
    button.className = group.id === currentClosetTab ? "active" : "";
    button.addEventListener("click", () => {
      currentClosetTab = group.id;
      renderClosetTabs();
      renderClosetOptions();
    });
    closetTabs.append(button);
  }
}

function renderClosetOptions() {
  const group = CLOSET.find(g => g.id === currentClosetTab);
  closetOptions.innerHTML = "";

  if (group.allowNone) {
    const none = document.createElement("button");
    none.type = "button";
    none.textContent = "None";
    none.className = save.outfit[group.id] == null ? "equipped" : "";
    none.addEventListener("click", () => {
      save.outfit[group.id] = null;
      persist();
      renderPeep();
      renderClosetOptions();
    });
    closetOptions.append(none);
  }

  for (const id of group.options) {
    const asset = ASSETS[id];
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = asset.label;

    if (group.type === "multi") {
      const selected = Array.isArray(save.outfit[group.id]) ? save.outfit[group.id] : [];
      const isEquipped = selected.includes(id);
      if (isEquipped) button.classList.add("toggle-equipped");
      button.addEventListener("click", () => {
        const next = new Set(Array.isArray(save.outfit[group.id]) ? save.outfit[group.id] : []);
        next.has(id) ? next.delete(id) : next.add(id);
        save.outfit[group.id] = [...next];
        persist();
        renderPeep();
        renderClosetOptions();
      });
    } else {
      if (save.outfit[group.id] === id) button.classList.add("equipped");
      button.addEventListener("click", () => {
        save.outfit[group.id] = id;
        persist();
        renderPeep();
        renderClosetOptions();
      });
    }
    closetOptions.append(button);
  }
}

function closePanels() {
  closetPanel.classList.add("hidden");
  bookPanel.classList.add("hidden");
}

roomPickerButton.addEventListener("click", () => {
  const opening = roomPicker.classList.contains("hidden");
  roomPicker.classList.toggle("hidden", !opening);
  roomPickerButton.setAttribute("aria-expanded", String(opening));
});

document.querySelector("#mirrorHotspot").addEventListener("click", () => {
  bookPanel.classList.add("hidden");
  closetPanel.classList.remove("hidden");
  renderClosetTabs();
  renderClosetOptions();
});

document.querySelector("#bookHotspot").addEventListener("click", () => {
  closetPanel.classList.add("hidden");
  bookPanel.classList.remove("hidden");
});

document.querySelector("#closeCloset").addEventListener("click", closePanels);
document.querySelector("#closeBook").addEventListener("click", closePanels);

document.querySelectorAll("[data-book-page]").forEach(button => {
  button.addEventListener("click", () => {
    const label = button.querySelector("span")?.textContent || "That page";
    showToast(`${label} is coming in a later step.`);
  });
});

document.addEventListener("click", event => {
  if (!roomPicker.contains(event.target) && !roomPickerButton.contains(event.target)) {
    roomPicker.classList.add("hidden");
    roomPickerButton.setAttribute("aria-expanded", "false");
  }
});

renderRoom();
renderPeep();
renderRoomPicker();
