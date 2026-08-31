(() => {
  "use strict";

  const HUB_KEY = "duckHabitHubSave_v1";
  const ROUND_SECONDS = 60;

  const DUCKS = [
    // Color
    { name: "Red Duck", file: "../assets/ducks/Red-duck.PNG", type: "color" },
    { name: "Blue Duck", file: "../assets/ducks/Blue-duck.PNG", type: "color" },
    { name: "Green Duck", file: "../assets/ducks/Green-duck.PNG", type: "color" },
    { name: "Pink Duck", file: "../assets/ducks/Pink-duck.PNG", type: "color" },
    { name: "Purple Duck", file: "../assets/ducks/Purple-duck.PNG", type: "color" },
    { name: "Rainbow Duck", file: "../assets/ducks/Rainbow-duck.PNG", type: "color" },

    // Food
    { name: "Apple Duck", file: "../assets/ducks/apple-duck.png", type: "food" },
    { name: "Lemon Duck", file: "../assets/ducks/Lemon-duck.PNG", type: "food" },
    { name: "Burger Duck", file: "../assets/ducks/Burger-duck.PNG", type: "food" },
    { name: "Pizza Duck", file: "../assets/ducks/Pizza-duck.PNG", type: "food" },
    { name: "Cupcake Duck", file: "../assets/ducks/Cupcake-duck.PNG", type: "food" },
    { name: "Watermelon Duck", file: "../assets/ducks/Watermelon-duck.PNG", type: "food" },

    // Special
    { name: "Angel Duck", file: "../assets/ducks/Angel-duck.PNG", type: "special" },
    { name: "Demon Duck", file: "../assets/ducks/Demon-duck.PNG", type: "special" },
    { name: "Alien Duck", file: "../assets/ducks/Alien-duck.PNG", type: "special" },
    { name: "King Duck", file: "../assets/ducks/King-duck.PNG", type: "special" },
    { name: "Magical Girl Duck", file: "../assets/ducks/Magical-girl-duck.PNG", type: "special" },
    { name: "Ghost Duck", file: "../assets/ducks/Ghost-duck.PNG", type: "special" }
  ];

  const board = document.querySelector("#gameBoard");
  const duckLayer = document.querySelector("#duckLayer");
  const scoreValue = document.querySelector("#scoreValue");
  const comboValue = document.querySelector("#comboValue");
  const timeValue = document.querySelector("#timeValue");
  const coinCount = document.querySelector("#coinCount");
  const feedback = document.querySelector("#feedback");
  const startOverlay = document.querySelector("#startOverlay");
  const resultOverlay = document.querySelector("#resultOverlay");
  const startButton = document.querySelector("#startButton");
  const playAgainButton = document.querySelector("#playAgainButton");
  const backButton = document.querySelector("#backButton");
  const resultBackButton = document.querySelector("#resultBackButton");
  const resultScore = document.querySelector("#resultScore");
  const resultCorrect = document.querySelector("#resultCorrect");
  const resultCombo = document.querySelector("#resultCombo");
  const resultCoins = document.querySelector("#resultCoins");
  const resultTitle = document.querySelector("#resultTitle");
  const bestMessage = document.querySelector("#bestMessage");

  document.querySelectorAll("[data-hide-on-error]").forEach(img => {
    img.addEventListener("error", () => { img.hidden = true; });
  });

  let score = 0;
  let combo = 0;
  let bestCombo = 0;
  let correct = 0;
  let attempts = 0;
  let timeLeft = ROUND_SECONDS;
  let timerId = null;
  let roundActive = false;
  let currentDuck = null;
  let currentData = null;
  let lastDuckName = "";
  let endAwarded = false;

  function loadHub() {
    try {
      return JSON.parse(localStorage.getItem(HUB_KEY) || "null") || { coins: 0, stats: {} };
    } catch {
      return { coins: 0, stats: {} };
    }
  }

  function saveHub(hub) {
    localStorage.setItem(HUB_KEY, JSON.stringify(hub));
  }

  function refreshCoins() {
    const hub = loadHub();
    coinCount.textContent = Math.max(0, Number(hub.coins) || 0).toLocaleString();
  }

  function goBack() {
    window.location.href = "../#games";
  }

  function randDuck() {
    let pool = DUCKS.filter(d => d.name !== lastDuckName);
    if (!pool.length) pool = DUCKS;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    lastDuckName = pick.name;
    return pick;
  }

  function updateHud() {
    scoreValue.textContent = score.toLocaleString();
    comboValue.textContent = `×${combo}`;
    timeValue.textContent = String(Math.max(0, Math.ceil(timeLeft)));
  }

  function showFeedback(text) {
    feedback.textContent = text;
    feedback.classList.remove("show");
    void feedback.offsetWidth;
    feedback.classList.add("show");
  }

  function spawnDuck() {
    if (!roundActive) return;
    if (currentDuck) currentDuck.remove();
    currentData = randDuck();

    const img = new Image();
    img.src = currentData.file;
    img.alt = currentData.name;
    img.className = "sort-duck";
    img.draggable = false;
    duckLayer.append(img);
    currentDuck = img;

    requestAnimationFrame(() => {
      if (!roundActive || currentDuck !== img) return;
      resetDuckPosition(img);
      enablePointerControl(img, currentData);
    });
  }

  function resetDuckPosition(duck) {
    const rect = board.getBoundingClientRect();
    const w = duck.offsetWidth || rect.width * .24;
    const h = duck.offsetHeight || w;
    const x = rect.width * .5 - w / 2;
    const y = rect.height * .31 - h / 2;
    setDuckPosition(duck, x, y);
    duck.style.transform = "rotate(0deg) scale(1)";
    duck.style.opacity = "1";
  }

  function setDuckPosition(duck, x, y) {
    duck.dataset.x = String(x);
    duck.dataset.y = String(y);
    duck.style.left = `${x}px`;
    duck.style.top = `${y}px`;
  }

  function basketFromX(x, boardWidth) {
    if (x < boardWidth / 3) return "color";
    if (x < boardWidth * 2 / 3) return "food";
    return "special";
  }

  function basketCenter(type, rect, duck) {
    const ratios = { color: 1 / 6, food: .5, special: 5 / 6 };
    const w = duck.offsetWidth;
    const h = duck.offsetHeight;
    return {
      x: rect.width * ratios[type] - w / 2,
      y: rect.height * .84 - h / 2
    };
  }

  function animateFling(duck, data, release, velocity) {
    duck.style.pointerEvents = "none";
    const rect = board.getBoundingClientRect();
    const startX = Number(duck.dataset.x) || 0;
    const startY = Number(duck.dataset.y) || 0;
    const w = duck.offsetWidth;
    const h = duck.offsetHeight;
    const centerX = startX + w / 2;
    const centerY = startY + h / 2;

    const speed = Math.hypot(velocity.vx, velocity.vy);
    const draggedLowEnough = centerY > rect.height * .61;
    const downwardIntent = velocity.vy > .12 || draggedLowEnough;

    if (!downwardIntent || speed < .08) {
      returnDuck(duck);
      return;
    }

    const projection = Math.max(190, Math.min(520, speed * 260));
    const projectedX = Math.max(w / 2, Math.min(rect.width - w / 2, centerX + velocity.vx * projection));
    const targetType = basketFromX(projectedX, rect.width);
    const target = basketCenter(targetType, rect, duck);
    const duration = Math.max(230, Math.min(430, 380 - speed * 70));
    const curveX = Math.max(-rect.width * .18, Math.min(rect.width * .18, velocity.vx * 90));
    const start = performance.now();

    function frame(now) {
      if (!roundActive || currentDuck !== duck) return;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const arc = Math.sin(Math.PI * t);
      const x = startX + (target.x - startX) * eased + curveX * arc;
      const y = startY + (target.y - startY) * eased - rect.height * .055 * arc;
      setDuckPosition(duck, x, y);
      duck.style.transform = `rotate(${velocity.vx * 34 * t}deg) scale(${1 - .15 * t})`;
      if (t < 1) requestAnimationFrame(frame);
      else resolveBasket(duck, data, targetType);
    }
    requestAnimationFrame(frame);
  }

  function resolveBasket(duck, data, targetType) {
    attempts += 1;
    if (targetType === data.type) {
      correct += 1;
      combo += 1;
      bestCombo = Math.max(bestCombo, combo);
      const comboBonus = Math.min(100, Math.max(0, combo - 1) * 10);
      score += 100 + comboBonus;
      comboValue.parentElement.classList.remove("hot");
      void comboValue.parentElement.offsetWidth;
      comboValue.parentElement.classList.add("hot");
      showFeedback(combo >= 5 ? `Perfect! ×${combo} ♡` : "Nice! ♡");
      updateHud();
      duck.classList.add("correct");
      duck.animate([
        { transform: duck.style.transform || "scale(.85)", opacity: 1 },
        { transform: "translateY(24px) scale(.58)", opacity: .15 }
      ], { duration: 210, easing: "ease-in", fill: "forwards" });
      setTimeout(() => {
        if (currentDuck === duck) currentDuck = null;
        duck.remove();
        spawnDuck();
      }, 220);
    } else {
      combo = 0;
      updateHud();
      showFeedback("Oops! Wrong basket");
      const target = basketCenter(targetType, board.getBoundingClientRect(), duck);
      duck.animate([
        { transform: duck.style.transform || "scale(.85)" },
        { transform: "translateY(-18px) rotate(-8deg) scale(.92)" },
        { transform: "translateY(-5px) rotate(7deg) scale(1)" }
      ], { duration: 300, easing: "ease-out" });
      setTimeout(() => returnDuck(duck), 180);
    }
  }

  function returnDuck(duck) {
    if (!roundActive || currentDuck !== duck) return;
    duck.style.transition = "left .24s ease, top .24s ease, transform .24s ease";
    resetDuckPosition(duck);
    setTimeout(() => {
      if (currentDuck === duck) {
        duck.style.transition = "";
        duck.style.pointerEvents = "auto";
      }
    }, 250);
  }

  function enablePointerControl(duck, data) {
    let dragging = false;
    let pointerId = null;
    let grabX = 0;
    let grabY = 0;
    let samples = [];

    duck.addEventListener("pointerdown", e => {
      if (!roundActive || dragging) return;
      e.preventDefault();
      dragging = true;
      pointerId = e.pointerId;
      duck.setPointerCapture(pointerId);
      duck.classList.add("dragging");
      const rect = board.getBoundingClientRect();
      grabX = e.clientX - rect.left - (Number(duck.dataset.x) || 0);
      grabY = e.clientY - rect.top - (Number(duck.dataset.y) || 0);
      samples = [{ x: e.clientX, y: e.clientY, t: performance.now() }];
    });

    duck.addEventListener("pointermove", e => {
      if (!dragging || e.pointerId !== pointerId) return;
      e.preventDefault();
      const rect = board.getBoundingClientRect();
      const x = Math.max(-duck.offsetWidth * .2, Math.min(rect.width - duck.offsetWidth * .8, e.clientX - rect.left - grabX));
      const y = Math.max(rect.height * .12, Math.min(rect.height * .78, e.clientY - rect.top - grabY));
      setDuckPosition(duck, x, y);
      const now = performance.now();
      samples.push({ x: e.clientX, y: e.clientY, t: now });
      samples = samples.filter(s => now - s.t <= 110).slice(-6);
    });

    function release(e) {
      if (!dragging || e.pointerId !== pointerId) return;
      dragging = false;
      duck.classList.remove("dragging");
      try { duck.releasePointerCapture(pointerId); } catch {}
      const last = samples.at(-1) || { x: e.clientX, y: e.clientY, t: performance.now() };
      const first = samples[0] || last;
      const dt = Math.max(16, last.t - first.t);
      const velocity = { vx: (last.x - first.x) / dt, vy: (last.y - first.y) / dt };
      animateFling(duck, data, last, velocity);
    }

    duck.addEventListener("pointerup", release);
    duck.addEventListener("pointercancel", release);
  }

  function startRound() {
    clearInterval(timerId);
    duckLayer.innerHTML = "";
    currentDuck = null;
    score = 0;
    combo = 0;
    bestCombo = 0;
    correct = 0;
    attempts = 0;
    timeLeft = ROUND_SECONDS;
    endAwarded = false;
    roundActive = true;
    startOverlay.classList.add("hidden");
    resultOverlay.classList.add("hidden");
    updateHud();
    spawnDuck();
    const startedAt = performance.now();
    timerId = setInterval(() => {
      const elapsed = (performance.now() - startedAt) / 1000;
      timeLeft = Math.max(0, ROUND_SECONDS - elapsed);
      updateHud();
      if (timeLeft <= 0) endRound();
    }, 100);
  }

  function endRound() {
    if (!roundActive) return;
    roundActive = false;
    clearInterval(timerId);
    timerId = null;
    timeLeft = 0;
    updateHud();
    if (currentDuck) currentDuck.style.pointerEvents = "none";

    let coinsEarned = Math.max(1, correct);
    if (attempts >= 5 && correct / attempts >= .9) coinsEarned += 5;
    coinsEarned = Math.min(50, coinsEarned);

    const hub = loadHub();
    hub.stats = hub.stats && typeof hub.stats === "object" ? hub.stats : {};
    const oldBest = Math.max(0, Number(hub.stats.duckSortBestScore) || 0);
    const oldCombo = Math.max(0, Number(hub.stats.duckSortBestCombo) || 0);
    const isNewBest = score > oldBest;

    if (!endAwarded) {
      hub.coins = Math.max(0, Number(hub.coins) || 0) + coinsEarned;
      hub.stats.duckSortBestScore = Math.max(oldBest, score);
      hub.stats.duckSortBestCombo = Math.max(oldCombo, bestCombo);
      hub.stats.duckSortGamesPlayed = Math.max(0, Number(hub.stats.duckSortGamesPlayed) || 0) + 1;
      hub.stats.duckSortCorrect = Math.max(0, Number(hub.stats.duckSortCorrect) || 0) + correct;
      saveHub(hub);
      endAwarded = true;
    }

    resultScore.textContent = score.toLocaleString();
    resultCorrect.textContent = String(correct);
    resultCombo.textContent = `×${bestCombo}`;
    resultCoins.textContent = `+${coinsEarned} Pink Coins`;
    resultTitle.textContent = correct >= 18 ? "Duck sorting superstar! ♡" : correct >= 10 ? "Nice sorting! ♡" : "Cute first round! ♡";
    bestMessage.textContent = isNewBest && score > 0 ? `New best score: ${score.toLocaleString()}!` : `Best score: ${Math.max(oldBest, score).toLocaleString()}`;
    refreshCoins();
    resultOverlay.classList.remove("hidden");
  }

  startButton.addEventListener("click", startRound);
  playAgainButton.addEventListener("click", startRound);
  backButton.addEventListener("click", goBack);
  resultBackButton.addEventListener("click", goBack);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && roundActive) endRound();
  });

  refreshCoins();
  updateHud();
})();
