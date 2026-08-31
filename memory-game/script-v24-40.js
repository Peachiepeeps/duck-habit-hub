const STORAGE_KEY = 'duckHabitHubSave_v1';
const DUCK_LIBRARY = [{"id": "alien-duck", "name": "Alien Duck", "file": "Alien-duck.PNG"}, {"id": "angel-duck", "name": "Angel Duck", "file": "Angel-duck.PNG"}, {"id": "aqua-duck", "name": "Aqua Duck", "file": "Aqua-duck.PNG"}, {"id": "artist-duck", "name": "Artist Duck", "file": "Artist-duck.PNG"}, {"id": "black-duck", "name": "Black Duck", "file": "Black-duck.PNG"}, {"id": "blue-duck", "name": "Blue Duck", "file": "Blue-duck.PNG"}, {"id": "bow-duck", "name": "Bow Duck", "file": "Bow-duck.PNG"}, {"id": "bronze-duck", "name": "Bronze Duck", "file": "Bronze-duck.PNG"}, {"id": "bunny-duck", "name": "Bunny Duck", "file": "Bunny-duck.PNG"}, {"id": "burger-duck", "name": "Burger Duck", "file": "Burger-duck.PNG"}, {"id": "cat-duck", "name": "Cat Duck", "file": "Cat-duck.PNG"}, {"id": "cool-duck", "name": "Cool Duck", "file": "Cool-duck.PNG"}, {"id": "cosmic-duck", "name": "Cosmic Duck", "file": "Cosmic-duck.PNG"}, {"id": "cupcake-duck", "name": "Cupcake Duck", "file": "Cupcake-duck.PNG"}, {"id": "dark-red-duck", "name": "Dark Red Duck", "file": "Dark-red-duck.PNG"}, {"id": "demon-duck", "name": "Demon Duck", "file": "Demon-duck.PNG"}, {"id": "doctor-duck", "name": "Doctor Duck", "file": "Doctor-duck.PNG"}, {"id": "duck-with-a-knife", "name": "Duck With A Knife", "file": "Duck-with-a-knife.PNG"}, {"id": "duckvee", "name": "Duckvee", "file": "Duckvee.PNG"}, {"id": "fancy-duck", "name": "Fancy Duck", "file": "Fancy-duck.PNG"}, {"id": "flower-duck", "name": "Flower Duck", "file": "Flower-duck.PNG"}, {"id": "gamer-duck", "name": "Gamer Duck", "file": "Gamer-duck.PNG"}, {"id": "ghost-duck", "name": "Ghost Duck", "file": "Ghost-duck.PNG"}, {"id": "glitter-duck", "name": "Glitter Duck", "file": "Glitter-duck.PNG"}, {"id": "golden-duck", "name": "Golden Duck", "file": "Golden-duck.PNG"}, {"id": "goose", "name": "Goose", "file": "Goose.PNG"}, {"id": "green-duck", "name": "Green Duck", "file": "Green-duck.PNG"}, {"id": "grey-duck", "name": "Grey Duck", "file": "Grey-duck.PNG"}, {"id": "gummy-duck", "name": "Gummy Duck", "file": "Gummy-duck.PNG"}, {"id": "hold", "name": "Hold", "file": "Hold"}, {"id": "jester-duck", "name": "Jester Duck", "file": "Jester-duck.PNG"}, {"id": "kidcore-duck", "name": "Kidcore Duck", "file": "Kidcore-duck.PNG"}, {"id": "king-duck", "name": "King Duck", "file": "King-duck.PNG"}, {"id": "knitted-duck", "name": "Knitted Duck", "file": "Knitted-duck.PNG"}, {"id": "lemon-duck", "name": "Lemon Duck", "file": "Lemon-duck.PNG"}, {"id": "lime-duck", "name": "Lime Duck", "file": "Lime-duck.PNG"}, {"id": "magical-girl-duck", "name": "Magical Girl Duck", "file": "Magical-girl-duck.PNG"}, {"id": "mint-duck", "name": "Mint Duck", "file": "Mint-duck.PNG"}, {"id": "mushroom-duck", "name": "Mushroom Duck", "file": "Mushroom-duck.PNG"}, {"id": "orange-duck", "name": "Orange Duck", "file": "Orange-duck.PNG"}, {"id": "party-hat-duck", "name": "Party Hat Duck", "file": "Party-hat-duck.PNG"}, {"id": "peach-duck", "name": "Peach Duck", "file": "Peach-duck.PNG"}, {"id": "periwinkle-duck", "name": "Periwinkle Duck", "file": "Periwinkle-duck.PNG"}, {"id": "pink-duck", "name": "Pink Duck", "file": "Pink-duck.PNG"}, {"id": "pizza-duck", "name": "Pizza Duck", "file": "Pizza-duck.PNG"}, {"id": "plush-duck", "name": "Plush Duck", "file": "Plush-duck.PNG"}, {"id": "pompompurin-duck", "name": "Pompompurin Duck", "file": "Pompompurin-duck.PNG"}, {"id": "purple-duck", "name": "Purple Duck", "file": "Purple-duck.PNG"}, {"id": "rainbow-duck", "name": "Rainbow Duck", "file": "Rainbow-duck.PNG"}, {"id": "red-duck", "name": "Red Duck", "file": "Red-duck.PNG"}, {"id": "silver-duck", "name": "Silver Duck", "file": "Silver-duck.PNG"}, {"id": "sky-blue-duck", "name": "Sky Blue Duck", "file": "Sky-blue-duck.PNG"}, {"id": "sleepy-time-duck", "name": "Sleepy Time Duck", "file": "Sleepy-time-duck.PNG"}, {"id": "standard-duck", "name": "Standard Duck", "file": "Standard-duck.PNG"}, {"id": "strawberry-duck", "name": "Strawberry Duck", "file": "Strawberry-duck.PNG"}, {"id": "tiny-duck-stack", "name": "Tiny Duck Stack", "file": "Tiny-duck-stack.PNG"}, {"id": "tiny-duck", "name": "Tiny Duck", "file": "Tiny-duck.PNG"}, {"id": "top-hat-duck", "name": "Top Hat Duck", "file": "Top-hat-duck.PNG"}, {"id": "violet-duck", "name": "Violet Duck", "file": "Violet-duck.PNG"}, {"id": "watermelon-duck", "name": "Watermelon Duck", "file": "Watermelon-duck.PNG"}, {"id": "white-duck", "name": "White Duck", "file": "White-duck.PNG"}, {"id": "angry-duck", "name": "Angry Duck", "file": "angry-duck.png"}, {"id": "apple-duck", "name": "Apple Duck", "file": "apple-duck.png"}, {"id": "bathtime-duck", "name": "Bathtime Duck", "file": "bathtime-duck.png"}, {"id": "duck-on-skateboard", "name": "Duck On Skateboard", "file": "duck-on-skateboard.png"}, {"id": "googly-eye-duck", "name": "Googly Eye Duck", "file": "googly-eye-duck.png"}, {"id": "long-hair-duck", "name": "Long Hair Duck", "file": "long-hair-duck.png"}, {"id": "magenta-duck", "name": "Magenta Duck", "file": "magenta-duck.png"}, {"id": "miko-duck", "name": "Miko Duck", "file": "miko-duck.png"}, {"id": "peep-duck", "name": "Peep Duck", "file": "peep-duck.png"}, {"id": "pile-of-tiny-ducks", "name": "Pile Of Tiny Ducks", "file": "pile-of-tiny-ducks.png"}, {"id": "scarf-duck", "name": "Scarf Duck", "file": "scarf-duck.png"}, {"id": "vampire-duck", "name": "Vampire Duck", "file": "vampire-duck.png"}];

let save = loadSave();
let activePairs = 6;
let deck = [];
let flippedIndexes = [];
let matchedPairs = 0;
let moves = 0;
let secondsElapsed = 0;
let timerId = null;
let lockBoard = false;
let roundActive = false;

const coinCount = document.querySelector('#coinCount');
const movesValue = document.querySelector('#movesValue');
const matchesValue = document.querySelector('#matchesValue');
const timeValue = document.querySelector('#timeValue');
const board = document.querySelector('#board');
const boardMessage = document.querySelector('#boardMessage');
const startOverlay = document.querySelector('#startOverlay');
const endOverlay = document.querySelector('#endOverlay');
const rewardValue = document.querySelector('#rewardValue');
const resultMoves = document.querySelector('#resultMoves');
const resultTime = document.querySelector('#resultTime');
const resultBoard = document.querySelector('#resultBoard');
const endFlavor = document.querySelector('#endFlavor');
const restartButton = document.querySelector('#restartButton');
const playAgainButton = document.querySelector('#playAgainButton');
const changeSizeButton = document.querySelector('#changeSizeButton');
const gamesButton = document.querySelector('#gamesButton');
const backButton = document.querySelector('#backButton');

document.querySelectorAll('.mode-button').forEach(button => {
  button.addEventListener('click', () => {
    activePairs = Number(button.dataset.pairs || 6);
    syncModeButtons();
    startRound();
  });
});

document.querySelectorAll('.start-choice').forEach(button => {
  button.addEventListener('click', () => {
    activePairs = Number(button.dataset.pairs || 6);
    startOverlay.classList.add('hidden');
    syncModeButtons();
    startRound();
  });
});

restartButton.addEventListener('click', startRound);
playAgainButton.addEventListener('click', () => { endOverlay.classList.add('hidden'); startRound(); });
changeSizeButton.addEventListener('click', () => { endOverlay.classList.add('hidden'); startOverlay.classList.remove('hidden'); });
gamesButton.addEventListener('click', () => {
  if (history.length > 1) history.back();
  else window.location.href = '../#games';
});
backButton.addEventListener('click', () => { if (history.length > 1) history.back(); else window.location.href = '../'; });

renderCoins();
syncModeButtons();
updateStats();
setBoardMessage('Pick a board size to begin! Unlocking more ducks gives you more variety here. ♡');

function loadSave() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { coins: 0, unlockedDucks: [], stats: {} };
    const parsed = JSON.parse(raw);
    if (!parsed.stats || typeof parsed.stats !== 'object') parsed.stats = {};
    if (!Array.isArray(parsed.unlockedDucks)) parsed.unlockedDucks = [];
    parsed.coins = Number(parsed.coins || 0);
    return parsed;
  } catch {
    return { coins: 0, unlockedDucks: [], stats: {} };
  }
}
function persistSave() { localStorage.setItem(STORAGE_KEY, JSON.stringify(save)); }
function renderCoins() { coinCount.textContent = Number(save.coins || 0).toLocaleString(); }
function normalizeDuckId(value) {
  return String(value || '').trim().toLowerCase().replace(/\.[^.]+$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
function getUnlockedDuckPool() {
  const libraryMap = new Map(DUCK_LIBRARY.map(duck => [normalizeDuckId(duck.id), duck]));
  const resolved = [];
  (Array.isArray(save.unlockedDucks) ? save.unlockedDucks : []).forEach(id => {
    const duck = libraryMap.get(normalizeDuckId(id));
    if (duck) resolved.push(duck);
  });
  const unique = [];
  const seen = new Set();
  resolved.forEach(duck => {
    const key = normalizeDuckId(duck.id);
    if (!seen.has(key)) { seen.add(key); unique.push(duck); }
  });
  if (!unique.length) {
    ['standard-duck','pink-duck','rainbow-duck','watermelon-duck','cupcake-duck','ghost-duck','bunny-duck','strawberry-duck','flower-duck','lemon-duck','mint-duck','cosmic-duck'].forEach(id => {
      const duck = libraryMap.get(id);
      if (duck && !seen.has(id)) { seen.add(id); unique.push(duck); }
    });
  }
  if (unique.length < 10) {
    DUCK_LIBRARY.forEach(duck => {
      const key = normalizeDuckId(duck.id);
      if (!seen.has(key)) { seen.add(key); unique.push(duck); }
    });
  }
  return unique;
}
function pickRoundDucks(pairCount) {
  const pool = shuffle([...getUnlockedDuckPool()]).slice(0, pairCount);
  while (pool.length < pairCount) pool.push(DUCK_LIBRARY[pool.length % DUCK_LIBRARY.length]);
  return pool.map(duck => ({ id: normalizeDuckId(duck.id), name: duck.name, src: `../assets/ducks/${duck.file}` }));
}
function createDeck(pairCount) {
  const roundDucks = pickRoundDucks(pairCount);
  const entries = [];
  roundDucks.forEach(duck => {
    entries.push({ ...duck, pairKey: `${duck.id}-a`, matchKey: duck.id });
    entries.push({ ...duck, pairKey: `${duck.id}-b`, matchKey: duck.id });
  });
  return shuffle(entries);
}
function shuffle(items) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}
function startRound() {
  clearTimer();
  roundActive = true;
  lockBoard = false;
  moves = 0;
  matchedPairs = 0;
  secondsElapsed = 0;
  flippedIndexes = [];
  endOverlay.classList.add('hidden');
  deck = createDeck(activePairs);
  board.className = `memory-board board-${activePairs}`;
  renderBoard();
  updateStats();
  startTimer();
  const unlockedCount = Array.isArray(save.unlockedDucks) ? save.unlockedDucks.length : 0;
  setBoardMessage(unlockedCount ? `Using ${Math.min(activePairs, unlockedCount)} of your unlocked ducks this round.` : 'No unlocked ducks were found yet, so a cute starter set is filling in for now.');
}
function renderBoard() {
  board.innerHTML = '';
  deck.forEach((card, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'card';
    button.setAttribute('aria-label', `Hidden card ${index + 1}`);
    const inner = document.createElement('span'); inner.className = 'card-inner';
    const back = document.createElement('span'); back.className = 'card-face card-back';
    const front = document.createElement('span'); front.className = 'card-face card-front';
    const image = document.createElement('img'); image.src = card.src; image.alt = card.name; front.appendChild(image);
    inner.append(back, front); button.appendChild(inner);
    button.addEventListener('click', () => handleCardPress(index));
    board.appendChild(button);
  });
}
function handleCardPress(index) {
  if (lockBoard || !roundActive) return;
  if (flippedIndexes.includes(index)) return;
  const button = board.children[index];
  if (!button || button.classList.contains('is-matched')) return;
  button.classList.add('is-flipped');
  flippedIndexes.push(index);
  if (flippedIndexes.length < 2) return;
  moves += 1; updateStats(); lockBoard = true;
  const [firstIndex, secondIndex] = flippedIndexes;
  const firstCard = deck[firstIndex]; const secondCard = deck[secondIndex];
  if (firstCard.matchKey === secondCard.matchKey) {
    window.setTimeout(() => markMatched(firstIndex, secondIndex), 260);
  } else {
    window.setTimeout(resetFlipped, 780);
  }
}
function markMatched(firstIndex, secondIndex) {
  [firstIndex, secondIndex].forEach(index => {
    const button = board.children[index];
    if (button) { button.classList.remove('is-flipped'); button.classList.add('is-matched'); }
  });
  matchedPairs += 1;
  flippedIndexes = [];
  lockBoard = false;
  updateStats();
  if (matchedPairs >= activePairs) finishRound();
}
function resetFlipped() {
  flippedIndexes.forEach(index => { const button = board.children[index]; if (button) button.classList.remove('is-flipped'); });
  flippedIndexes = []; lockBoard = false;
}
function updateStats() { movesValue.textContent = String(moves); matchesValue.textContent = `${matchedPairs} / ${activePairs}`; timeValue.textContent = `${secondsElapsed}s`; }
function startTimer() { timerId = window.setInterval(() => { secondsElapsed += 1; updateStats(); }, 1000); }
function clearTimer() { if (timerId) { window.clearInterval(timerId); timerId = null; } }
function computeReward() {
  const base = activePairs === 6 ? 12 : activePairs === 8 ? 18 : 25;
  const moveTarget = activePairs * 2.5;
  const timeTarget = activePairs === 6 ? 35 : activePairs === 8 ? 55 : 80;
  const moveBonus = moves <= moveTarget ? (activePairs === 10 ? 8 : 6) : moves <= moveTarget + 4 ? 3 : 0;
  const timeBonus = secondsElapsed <= timeTarget ? (activePairs === 10 ? 7 : 5) : secondsElapsed <= timeTarget + 20 ? 2 : 0;
  return base + moveBonus + timeBonus;
}
function finishRound() {
  roundActive = false; clearTimer();
  const reward = computeReward();
  save.coins = Number(save.coins || 0) + reward;
  if (!save.stats || typeof save.stats !== 'object') save.stats = {};
  save.stats.memoryWins = Number(save.stats.memoryWins || 0) + 1;
  persistSave(); renderCoins();
  rewardValue.textContent = `${reward} Pink Coins`;
  resultMoves.textContent = String(moves);
  resultTime.textContent = `${secondsElapsed}s`;
  resultBoard.textContent = `${activePairs} pairs`;
  if (moves <= activePairs * 2.3 && secondsElapsed <= (activePairs === 10 ? 75 : activePairs === 8 ? 50 : 32)) {
    endFlavor.textContent = 'That was super clean. Your ducks are impressed.';
  } else if (moves <= activePairs * 3) {
    endFlavor.textContent = 'Cute and steady! You cleared the table nicely.';
  } else {
    endFlavor.textContent = 'You still got them all, and the ducks think that counts.';
  }
  endOverlay.classList.remove('hidden');
  setBoardMessage(`Round cleared! You earned ${reward} Pink Coins.`);
}
function setBoardMessage(text) { boardMessage.textContent = text; }
function syncModeButtons() { document.querySelectorAll('.mode-button').forEach(button => button.classList.toggle('active', Number(button.dataset.pairs || 0) === activePairs)); }
