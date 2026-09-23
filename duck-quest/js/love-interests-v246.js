(function(){
  "use strict";

  const SAVE_KEY = "duckHabitHubSave_v1";
  const SHARED_CHANCE = 0.05;
  const HEART_SRC = "assets/love-interests/lukio/Pixel-heart.png";
  const MIKO_IDLE = "assets/characters/miko/base/idle-1.webp";
  const MIKO_SMUG = "assets/characters/miko/base/smug.webp";

  const CHARACTERS = {
    miko: {
      name: "Miko",
      sprites: { idle: MIKO_IDLE, smug: MIKO_SMUG }
    },
    lukio: {
      name: "Lukio",
      duckId: "lukio-duck",
      cardId: "r-love-lukio",
      sprites: {
        idle1: "assets/love-interests/lukio/Lukio-idle-1.png",
        idle2: "assets/love-interests/lukio/Lukio-idle-2.png",
        wink: "assets/love-interests/lukio/Lukio-wink.png"
      },
      outfitIds: ["lukio-hair-streak", "lukio-hoodie", "lukio-shorts", "lukio-socks", "lukio-booties"]
    },
    shinobu: {
      name: "Shinobu",
      duckId: "shinobu-duck",
      cardId: "r-love-shinobu",
      sprites: {
        idle1: "assets/love-interests/shinobu/Shinobu-idle-1.png",
        idle2: "assets/love-interests/shinobu/Shinobu-idle-2.png",
        happy: "assets/love-interests/shinobu/Shinobu-happy.png"
      },
      outfitIds: ["shino-beret", "shino-sweater", "shino-jeans", "shino-boots", "shino-sleeve"]
    },
    cheryln: {
      name: "Cheryln",
      duckId: "cheryln-duck",
      cardId: "r-love-cheryln",
      sprites: {
        idle1: "assets/love-interests/cheryln/Cheryln-idle-1.png",
        idle2: "assets/love-interests/cheryln/Cheryln-idle-2.png",
        happy: "assets/love-interests/cheryln/Cheryln-happy.png"
      },
      outfitIds: ["cheryln-hairpin", "cheryln-sweater", "cheryln-shorts", "cheryln-tights", "cheryln-boots"]
    }
  };

  const SCENES = {
    lukio: {
      id: "lukio",
      title: "Lukio",
      kicker: "LOVE INTEREST ENCOUNTER",
      leftId: "miko",
      rightId: "lukio",
      dialogue: [
        { speaker: "Miko", text: "Lukio! There you are!", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Lukio", text: "Hey babe! What are you doing here?", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Miko", text: "Just finding cute buddies and exploring. Have you seen the others?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Lukio", text: "Hmm, I’ve seen some here or there. I bet most are home. Wanna head back with me?", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Miko", text: "Yeah! Let’s hold hands!", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Lukio", text: "(Winks) Alright. Then here, I found these.", leftPose: "idle", rightPose: "wink" },
        { speaker: "Miko", text: "(smug) A gift? For me? You’re too sweet!", leftPose: "smug", rightPose: "idle1" }
      ],
      reward() {
        const data = load();
        unlockCharacter(data, "lukio", { grantCard: true, grantDuck: true, grantOutfit: true });
        save(data);
        window.dispatchEvent(new CustomEvent("duckie-love-interest-unlocked", { detail: { id: "lukio" } }));
      }
    },
    shinobu: {
      id: "shinobu",
      title: "Shinobu",
      kicker: "LOVE INTEREST ENCOUNTER",
      leftId: "miko",
      rightId: "shinobu",
      dialogue: [
        { speaker: "Miko", text: "Shinobu! What are you doing here?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Shinobu", text: "Oh, Hello, Miko. I’m just coming back from work. Are you heading home as well?", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Miko", text: "Yeah! Wanna walk together?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Shinobu", text: "Yes. I’d like that.", leftPose: "idle", rightPose: "happy" },
        { speaker: "Miko", text: "Hey, have you seen Midori?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Shinobu", text: "Oh. Yeah, Lukio threw him into a dumpster for tampering with his hair dye. He’s been gone ever since.", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Miko", text: "Ehhhhh?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Shinobu", text: "Oh, right. I found this. You can have it, I suppose.", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Miko", text: "Oh! Thanks, Shino!", leftPose: "smug", rightPose: "happy" }
      ],
      reward() {
        const data = load();
        unlockCharacter(data, "shinobu", { grantCard: false, grantDuck: true, grantOutfit: true });
        save(data);
        window.dispatchEvent(new CustomEvent("duckie-love-interest-unlocked", { detail: { id: "shinobu" } }));
      }
    },
    cheryln: {
      id: "cheryln",
      title: "Cheryln",
      kicker: "LOVE INTEREST ENCOUNTER",
      leftId: "miko",
      rightId: "cheryln",
      dialogue: [
        { speaker: "Miko", text: "Oh, hey Chery! Looking for Shinobu?", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Cheryln", text: "Yup! They wandered away from me again.", leftPose: "idle", rightPose: "idle2" },
        { speaker: "Miko", text: "I can help you find them! I wouldn’t mind some Shino and Chery time!", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Cheryln", text: "That’d be sweet! Thank you! Think maybe Midori kidnapped them?", leftPose: "idle", rightPose: "happy" },
        { speaker: "Miko", text: "Hmm, I don’t think so, but it’s possible.", leftPose: "idle", rightPose: "idle1" },
        { speaker: "Cheryln", text: "*happy* It’s cool, Shino can handle themselves if need be. Nee, I found this! You can have it!", leftPose: "idle", rightPose: "happy" },
        { speaker: "Miko", text: "Ohhh, thank you, Chery!!!", leftPose: "smug", rightPose: "happy" }
      ],
      reward() {
        const data = load();
        unlockCharacter(data, "cheryln", { grantCard: false, grantDuck: true, grantOutfit: true });
        save(data);
        window.dispatchEvent(new CustomEvent("duckie-love-interest-unlocked", { detail: { id: "cheryln" } }));
      }
    },
    "shinobu-cheryln": {
      id: "shinobu-cheryln",
      title: "Shinobu + Cheryln",
      kicker: "LOVERS REUNITE",
      leftId: "cheryln",
      rightId: "shinobu",
      dialogue: [
        { speaker: "Cheryln", text: "*Happy* There you are!", leftPose: "happy", rightPose: "idle1" },
        { speaker: "Shinobu", text: "Oh, sorry, were you looking for me?", leftPose: "idle1", rightPose: "idle2" },
        { speaker: "Cheryln", text: "Yeah, but it’s cool! Miko helped me!", leftPose: "happy", rightPose: "idle1" },
        { speaker: "Shinobu", text: "Ahhh, I saw Miko too. But it’s okay, I was just working.", leftPose: "idle2", rightPose: "idle2" },
        { speaker: "Cheryln", text: "Oh, I forgot you covered a shift! Oops!", leftPose: "happy", rightPose: "idle1" },
        { speaker: "Shinobu", text: "It’s okay… I appreciate you coming to find me. *Happy*", leftPose: "idle1", rightPose: "happy" },
        { speaker: "Cheryln", text: "*Happy* Anytime, my love! Now, let’s go back to the others!", leftPose: "happy", rightPose: "happy" }
      ],
      reward() {
        const data = load();
        const root = ensureAll(data);
        unlockCardsOnly(data, ["shinobu", "cheryln"]);
        root.pairScenes.shinobuCheryln = root.pairScenes.shinobuCheryln || {};
        root.pairScenes.shinobuCheryln.seen = true;
        root.pairScenes.shinobuCheryln.cardsGranted = true;
        save(data);
        window.dispatchEvent(new CustomEvent("duckie-love-interest-unlocked", { detail: { id: "shinobu-cheryln" } }));
      }
    }
  };

  let open = false;
  let bypassNextRoll = false;

  function load(){
    try { return JSON.parse(localStorage.getItem(SAVE_KEY) || "{}"); }
    catch (_) { return {}; }
  }

  function save(data){
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  }

  function ensureAll(data){
    data.loveInterests = data.loveInterests && typeof data.loveInterests === "object" ? data.loveInterests : {};
    data.characterUnlockedItems = data.characterUnlockedItems && typeof data.characterUnlockedItems === "object" ? data.characterUnlockedItems : {};
    if (!Array.isArray(data.characterUnlockedItems.miko)) data.characterUnlockedItems.miko = [];
    if (!Array.isArray(data.unlockedDucks)) data.unlockedDucks = [];
    data.duckCollectionCounts = data.duckCollectionCounts && typeof data.duckCollectionCounts === "object" ? data.duckCollectionCounts : {};
    data.tradingCards = data.tradingCards && typeof data.tradingCards === "object" ? data.tradingCards : {};
    data.tradingCards.owned = data.tradingCards.owned && typeof data.tradingCards.owned === "object" ? data.tradingCards.owned : {};
    data.tradingCards.unseen = Array.isArray(data.tradingCards.unseen) ? data.tradingCards.unseen : [];
    data.loveInterestPairs = data.loveInterestPairs && typeof data.loveInterestPairs === "object" ? data.loveInterestPairs : {};
    data.loveInterestPairs.shinobuCheryln = data.loveInterestPairs.shinobuCheryln && typeof data.loveInterestPairs.shinobuCheryln === "object" ? data.loveInterestPairs.shinobuCheryln : {};

    for (const key of ["lukio", "shinobu", "cheryln"]) {
      data.loveInterests[key] = data.loveInterests[key] && typeof data.loveInterests[key] === "object" ? data.loveInterests[key] : {};
    }
    return {
      loveInterests: data.loveInterests,
      pairScenes: data.loveInterestPairs
    };
  }

  function activeCharacterId(){
    const data = load();
    return String(data?.duckQuest?.activeCharacter || data?.selectedCharacter || "").trim().toLowerCase();
  }

  function isMiko(){
    return activeCharacterId() === "miko";
  }

  function grantCard(data, cardId, amount){
    if (window.DuckieTradingCards?.grantCard) {
      window.DuckieTradingCards.grantCard(data, cardId, amount || 1);
      return;
    }
    data.tradingCards = data.tradingCards && typeof data.tradingCards === "object" ? data.tradingCards : {};
    data.tradingCards.owned = data.tradingCards.owned && typeof data.tradingCards.owned === "object" ? data.tradingCards.owned : {};
    data.tradingCards.unseen = Array.isArray(data.tradingCards.unseen) ? data.tradingCards.unseen : [];
    const before = Math.max(0, Number(data.tradingCards.owned[cardId] || 0));
    data.tradingCards.owned[cardId] = before + (amount || 1);
    if (before === 0 && !data.tradingCards.unseen.includes(cardId)) {
      data.tradingCards.unseen.push(cardId);
    }
  }

  function unlockCharacter(data, key, options){
    const cfg = CHARACTERS[key];
    const state = ensureAll(data).loveInterests[key];
    state.encountered = true;
    state.spritesUnlocked = true;
    if (options.grantDuck) {
      state.duckUnlocked = true;
      if (!data.unlockedDucks.includes(cfg.duckId)) data.unlockedDucks.push(cfg.duckId);
      data.duckCollectionCounts[cfg.duckId] = Math.max(1, Number(data.duckCollectionCounts[cfg.duckId] || 0));
    }
    if (options.grantOutfit) {
      state.outfitUnlocked = true;
      for (const piece of cfg.outfitIds) {
        if (!data.characterUnlockedItems.miko.includes(piece)) data.characterUnlockedItems.miko.push(piece);
      }
    }
    if (options.grantCard) {
      state.cardUnlocked = true;
      grantCard(data, cfg.cardId, 1);
    }
    state.unlockedAt = Date.now();
  }

  function unlockCardsOnly(data, keys){
    const root = ensureAll(data);
    for (const key of keys) {
      const cfg = CHARACTERS[key];
      const state = root.loveInterests[key];
      state.cardUnlocked = true;
      grantCard(data, cfg.cardId, 1);
    }
  }

  function spriteFor(charId, pose){
    const cfg = CHARACTERS[charId];
    if (!cfg) return "";
    if (charId === "miko") return cfg.sprites[pose || "idle"] || cfg.sprites.idle;
    return cfg.sprites[pose || "idle1"] || cfg.sprites.idle1 || cfg.sprites.idle;
  }

  function sceneLayer(){
    let el = document.querySelector(".love-interest-layer");
    if (el) return el;
    el = document.createElement("div");
    el.className = "love-interest-layer hidden";
    el.innerHTML = `
      <section class="love-interest-card" role="dialog" aria-modal="true" aria-label="Love interest encounter">
        <p class="love-interest-kicker"></p>
        <h2 class="love-interest-title"></h2>
        <div class="love-interest-stage">
          <img class="love-interest-left" src="" alt="">
          <span class="love-interest-heart hidden"><img src="${HEART_SRC}" alt=""></span>
          <img class="love-interest-right" src="" alt="">
        </div>
        <div class="love-interest-dialogue">
          <strong class="love-interest-speaker"></strong>
          <p class="love-interest-line"></p>
        </div>
        <button type="button" class="love-interest-next">Next</button>
      </section>`;
    document.body.append(el);
    return el;
  }

  function showScene(sceneId, onFinished){
    const scene = SCENES[sceneId];
    if (!scene || open) return false;
    open = true;

    const el = sceneLayer();
    const kicker = el.querySelector(".love-interest-kicker");
    const title = el.querySelector(".love-interest-title");
    const left = el.querySelector(".love-interest-left");
    const right = el.querySelector(".love-interest-right");
    const heart = el.querySelector(".love-interest-heart");
    const speaker = el.querySelector(".love-interest-speaker");
    const line = el.querySelector(".love-interest-line");
    const next = el.querySelector(".love-interest-next");

    kicker.textContent = scene.kicker || "LOVE INTEREST ENCOUNTER";
    title.textContent = scene.title || "Love Interest";

    let index = 0;
    const render = () => {
      const step = scene.dialogue[index];
      speaker.textContent = step.speaker;
      line.textContent = step.text;
      left.src = spriteFor(scene.leftId, step.leftPose);
      right.src = spriteFor(scene.rightId, step.rightPose);
      left.alt = CHARACTERS[scene.leftId]?.name || scene.leftId;
      right.alt = CHARACTERS[scene.rightId]?.name || scene.rightId;
      next.textContent = index === scene.dialogue.length - 1 ? "Finish" : "Next";
    };

    next.onclick = () => {
      if (index < scene.dialogue.length - 1) {
        index += 1;
        render();
        return;
      }
      next.disabled = true;
      heart.classList.remove("hidden");
      scene.reward();
      setTimeout(() => {
        heart.classList.add("hidden");
        el.classList.add("hidden");
        next.disabled = false;
        open = false;
        if (typeof onFinished === "function") {
          bypassNextRoll = true;
          onFinished();
        }
      }, 1600);
    };

    render();
    el.classList.remove("hidden");
    return true;
  }

  function eligibleScenes(){
    const data = load();
    const root = ensureAll(data);
    const ids = [];

    if (!root.loveInterests.lukio.encountered) ids.push("lukio");
    if (!root.loveInterests.shinobu.encountered) ids.push("shinobu");
    if (!root.loveInterests.cheryln.encountered) ids.push("cheryln");

    if (root.loveInterests.shinobu.encountered && root.loveInterests.cheryln.encountered && !root.pairScenes.shinobuCheryln.cardsGranted) {
      ids.push("shinobu-cheryln");
    }
    return ids;
  }

  function chooseScene(ids){
    if (ids.includes("shinobu-cheryln")) return "shinobu-cheryln";
    return ids[Math.floor(Math.random() * ids.length)];
  }

  function maybeBeforeNextEncounter(continueFn){
    if (bypassNextRoll) {
      bypassNextRoll = false;
      return false;
    }
    if (open || !isMiko()) return false;

    const ids = eligibleScenes();
    if (!ids.length) return false;
    if (Math.random() >= SHARED_CHANCE) return false;

    return showScene(chooseScene(ids), continueFn);
  }

  window.DuckieLoveInterests = window.DuckieLoveInterests || {};
  window.DuckieLoveInterests.activeCharacterId = activeCharacterId;
  window.DuckieLoveInterests.chance = SHARED_CHANCE;
  window.DuckieLoveInterests.maybeBeforeNextEncounter = maybeBeforeNextEncounter;
  window.DuckieLoveInterests.trigger = showScene;
  window.triggerLukioEncounter = function(){ return showScene("lukio"); };
  window.triggerShinobuEncounter = function(){ return showScene("shinobu"); };
  window.triggerCherylnEncounter = function(){ return showScene("cheryln"); };
  window.triggerShinobuCherylnCutscene = function(){ return showScene("shinobu-cheryln"); };
})();
