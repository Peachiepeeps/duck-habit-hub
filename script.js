const STORAGE_KEY = "duckHabitHubSave_v1";
const SAVE_VERSION = 2;

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
  "beret": { label: "Beret", file: "beret.png", z: 55 }
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
  unlockedRooms: ["cream"],
  unlockedItems: ["hair-short", "hair-low-pigtails"],
  peepPokes: 0,
  outfit: structuredClone(DEFAULT_OUTFIT)
};

function loadSave() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_SAVE);
    const saved = JSON.parse(raw);

    // This prototype previously had a different closet/save shape. On the first
    // load of V2, preserve room/currency progress but intentionally adopt Peep's
    // newly approved default outfit and closet rules.
    if (saved.version !== SAVE_VERSION) {
      const migrated = structuredClone(DEFAULT_SAVE);
      if (Number.isFinite(saved.coins)) migrated.coins = saved.coins;
      if (typeof saved.room === "string") migrated.room = saved.room;
      if (Array.isArray(saved.unlockedRooms)) migrated.unlockedRooms = saved.unlockedRooms;
      return migrated;
    }

    return {
      ...structuredClone(DEFAULT_SAVE),
      ...saved,
      unlockedRooms: Array.isArray(saved.unlockedRooms) ? saved.unlockedRooms : ["cream"],
      unlockedItems: Array.isArray(saved.unlockedItems) ? saved.unlockedItems : ["hair-short", "hair-low-pigtails"],
      outfit: { ...structuredClone(DEFAULT_OUTFIT), ...(saved.outfit || {}) }
    };
  } catch {
    return structuredClone(DEFAULT_SAVE);
  }
}

let save = loadSave();
let currentClosetTab = "hair";
let currentExpression = "expression-neutral";
let reactionTimer = null;
let pokeTimes = [];
let pokeLocked = false;
let openSockStyleId = null;
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

function renderPeep() {
  peepLayers.innerHTML = "";
  const equipped = getEquippedAssetIds()
    .map(id => ({ id, ...ASSETS[id] }))
    .filter(x => x.file)
    .sort((a, b) => a.z - b.z);

  for (const asset of equipped) {
    const img = document.createElement("img");
    img.className = "peep-layer";
    img.src = `assets/peep/${asset.file}`;
    img.alt = "";
    img.style.setProperty("--z", asset.z);
    img.dataset.asset = asset.id;
    if (asset.id.startsWith("expression-")) img.dataset.expressionLayer = "true";
    peepLayers.append(img);
  }
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

  const src = `assets/peep/${asset.file}`;
  layer.dataset.asset = assetId;
  layer.src = src;
  layer.style.setProperty("--z", asset.z);
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

function openCloset() {
  bookPanel.classList.add("hidden");
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
  bookPanel.classList.add("hidden");
}

roomPickerButton.addEventListener("click", () => {
  const opening = roomPicker.classList.contains("hidden");
  roomPicker.classList.toggle("hidden", !opening);
  roomPickerButton.setAttribute("aria-expanded", String(opening));
});

document.querySelector("#mirrorHotspot").addEventListener("click", openCloset);
document.querySelector("#bookHotspot").addEventListener("click", () => {
  closeCloset();
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
    const label = button.querySelector("span")?.textContent || "That page";
    showToast(`${label} is coming in a later step.`);
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
persist();
renderRoom();
renderPeep();
renderRoomPicker();
renderClosetCategoryMenu();
