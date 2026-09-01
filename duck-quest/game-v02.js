const HUB_SAVE_KEY = "duckHabitHubSave_v1";
const MAX_LEVEL = 100;
const MAX_RUN_RANK = 20;

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
      "cat-slime-idle-1-neutral.png",
      "cat-slime-idle-2-squish.png",
      "cat-slime-idle-3-bounce.png",
      "cat-slime-idle-2-squish.png"
    ],
    hurt: "cat-slime-idle-1-neutral.png",
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
      "bee-idle-1-high.png",
      "bee-idle-2-low.png"
    ],
    hurt: "bee-hurt.png",
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
      "flower-idle-1.png",
      "flower-idle-2.png"
    ],
    hurt: "flower-hurt.png",
    speed: 390
  },
  "mimic": {
    name: "Mimic",
    hp: 31,
    attack: 6,
    exp: 34,
    coinMin: 18,
    coinMax: 28,
    idle: [
      "mimic-open-1.png",
      "mimic-open-2.png"
    ],
    hurt: "chest-closed.png",
    speed: 300
  },
  "mushroom-cat": {
    name: "Big Mushroom Cat",
    hp: 48,
    attack: 5,
    exp: 48,
    coinMin: 16,
    coinMax: 24,
    idle: [
      "mushroom-cat-idle-1.png",
      "mushroom-cat-idle-2.png"
    ],
    hurt: "mushroom-cat-hurt.png",
    speed: 430,
    boss: true
  }
};

const REWARD_ITEMS = [
  { id:"yarn", name:"Yarn", image:"../assets/ingredients/Yarn.PNG", weight:12 },
  { id:"thread", name:"Thread", image:"../assets/ingredients/Thread.PNG", weight:12 },
  { id:"glitter", name:"Glitter", image:"../assets/ingredients/Sparkle.PNG", weight:10 },
  { id:"flower", name:"Flower", image:"../assets/gifts/Flower.PNG", weight:10 },
  { id:"bread-loaf", name:"Bread Loaf", image:"../assets/food/Bread-loaf.PNG", weight:9 },
  { id:"apple", name:"Apple", image:"../assets/food/apple.png", weight:9 },
  { id:"pink-paint", name:"Pink Paint", image:"../assets/paint/Pink-paint.PNG", weight:8 },
  { id:"red-paint", name:"Red Paint", image:"../assets/paint/Red-paint.PNG", weight:8 },
  { id:"mint-paint", name:"Mint Paint", image:"../assets/paint/Mint-paint.PNG", weight:7 },
  { id:"aqua-paint", name:"Aqua Paint", image:"../assets/paint/Aqua-paint.PNG", weight:6 },
  { id:"gold-paint", name:"Gold Paint", image:"../assets/paint/Gold-paint.PNG", weight:3 },
  { id:"rainbow-paint", name:"Rainbow Paint", image:"../assets/paint/Rainbow-paint.PNG", weight:1 }
];

const BG = [
  "meadow-stage-1-tree.png",
  "meadow-stage-2-bushes.png",
  "meadow-stage-3-flowers.png",
  "meadow-stage-4-boss.png"
];

const PEepIdle = [
  "peep-idle-1.png",
  "peep-idle-2.png"
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
  floatingText: document.querySelector("#floatingText"),
  chestLayer: document.querySelector("#chestLayer"),
  chestCaption: document.querySelector("#chestCaption"),
  chestSprite: document.querySelector("#chestSprite"),
  openChest: document.querySelector("#openChest"),
  battleMessage: document.querySelector("#battleMessage"),
  skillButtons: document.querySelector("#skillButtons"),
  guardButton: document.querySelector("#guardButton"),
  continueButton: document.querySelector("#continueButton"),
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
let selectedRank = Math.min(questSave.unlockedRank, Math.max(1, questSave.lastRank || 1));
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
    peep: { level:1, exp:0 },
    unlockedRank:1,
    lastRank:1,
    completedRuns:0,
    totalBattlesWon:0,
    totalCoinsEarned:0,
    totalExpEarned:0
  };
}

function normalizeQuestSave(raw) {
  const d = defaultQuestSave();
  const q = raw && typeof raw === "object" ? raw : {};
  return {
    ...d,
    ...q,
    peep: {
      level: clampInt(q.peep?.level, 1, MAX_LEVEL, 1),
      exp: Math.max(0, Number(q.peep?.exp) || 0)
    },
    unlockedRank: clampInt(q.unlockedRank, 1, MAX_RUN_RANK, 1),
    lastRank: clampInt(q.lastRank, 1, MAX_RUN_RANK, 1)
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
  hubSave.duckQuest = questSave;
  localStorage.setItem(HUB_SAVE_KEY, JSON.stringify(hubSave));
}

function clampInt(value,min,max,fallback) {
  const n = Math.round(Number(value));
  return Number.isFinite(n) ? Math.min(max,Math.max(min,n)) : fallback;
}

function randInt(min,max) { return Math.floor(Math.random()*(max-min+1))+min; }
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
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

function enemyScaled(template, rank) {
  const hpScale = 1 + (rank - 1) * 0.18;
  const atkScale = 1 + (rank - 1) * 0.12;
  const expScale = 1 + (rank - 1) * 0.14;
  const rewardScale = 1 + (rank - 1) * 0.10;
  return {
    ...template,
    maxHp: Math.round(template.hp * hpScale),
    hpNow: Math.round(template.hp * hpScale),
    attackNow: Math.max(1, Math.round(template.attack * atkScale)),
    expNow: Math.round(template.exp * expScale),
    coinMinNow: Math.round(template.coinMin * rewardScale),
    coinMaxNow: Math.round(template.coinMax * rewardScale)
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
  ui.coinCount.textContent = hubSave.coins.toLocaleString();
  ui.levelBadge.textContent = `Lv. ${questSave.peep.level}`;

  const need = expNeeded(questSave.peep.level);
  ui.xpText.textContent = questSave.peep.level >= MAX_LEVEL
    ? "MAX LEVEL"
    : `${Math.floor(questSave.peep.exp)} / ${need} EXP`;
  ui.xpFill.style.width = questSave.peep.level >= MAX_LEVEL ? "100%" : `${Math.min(100,(questSave.peep.exp/need)*100)}%`;

  const hLevel = happinessLevelFromTotal(hubSave.characterProgress?.peep?.happinessTotal);
  ui.happinessLevel.textContent = `Lv. ${hLevel}`;
  ui.happinessHearts.innerHTML = "";
  const filled = Math.max(1, Math.ceil(hLevel / 20));
  for(let i=1;i<=5;i++) {
    const heart=document.createElement("span");
    heart.textContent="♥";
    heart.className=i<=filled?"heart-full":"heart-empty";
    ui.happinessHearts.appendChild(heart);
  }

  selectedRank = Math.min(selectedRank, questSave.unlockedRank);
  ui.rankValue.textContent = selectedRank;
  ui.bestRunText.textContent = `Highest unlocked rank: ${questSave.unlockedRank}`;
  ui.rankDescription.textContent = rankDescription(selectedRank);
  document.querySelector("#rankDown").disabled = selectedRank <= 1;
  document.querySelector("#rankUp").disabled = selectedRank >= questSave.unlockedRank;
  renderMenuSkills();
}

function rankDescription(rank) {
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

function makeEncounterPlan(rank) {
  const regular = shuffle(["cat-slime","bee","flower"]);
  const encounters=[];
  for(let i=0;i<3;i++) {
    const roll=Math.random();
    if(roll<0.12) encounters.push({type:"rare-chest"});
    else if(roll<0.20) encounters.push({type:"mimic"});
    else encounters.push({type:"enemy", enemyId:regular.shift() || ["cat-slime","bee","flower"][randInt(0,2)]});
  }
  encounters.push({type:"boss",enemyId:"mushroom-cat"});
  return encounters;
}

function beginRun() {
  const stats=peepStats();
  currentRun={
    rank:selectedRank,
    index:0,
    plan:makeEncounterPlan(selectedRank),
    hp:stats.maxHp,
    maxHp:stats.maxHp,
    coinsEarned:0,
    expEarned:0,
    itemsEarned:[],
    levelsGained:[],
    bossWon:false
  };
  questSave.lastRank=selectedRank;
  persistAll();
  showScreen("battle");
  startEncounter();
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
  ui.guardButton.classList.remove("hidden");
  ui.skillButtons.classList.remove("hidden");
  ui.enemyCombatant.classList.remove("hidden");

  const encounter=currentRun.plan[currentRun.index];
  ui.battleBg.src=BG[currentRun.index];
  ui.encounterLabel.textContent=`ENCOUNTER ${currentRun.index+1} / 4`;
  ui.rankBattleLabel.textContent=`Rank ${currentRun.rank}`;
  ui.peepLevelCombat.textContent=`Lv. ${questSave.peep.level}`;
  renderPeepHp();
  startPeepIdle();

  if(encounter.type==="rare-chest") {
    currentEnemy=null;
    ui.enemyCombatant.classList.add("hidden");
    ui.skillButtons.classList.add("hidden");
    ui.guardButton.classList.add("hidden");
    showChest({kind:"rare", revealMimic:false});
    setMessage("A rare treasure chest appeared instead of an enemy!");
    return;
  }

  if(encounter.type==="mimic") {
    currentEnemy=null;
    ui.enemyCombatant.classList.add("hidden");
    ui.skillButtons.classList.add("hidden");
    ui.guardButton.classList.add("hidden");
    showChest({kind:"mimic", revealMimic:true});
    setMessage("A suspicious treasure chest is sitting in the path...");
    return;
  }

  startEnemy(encounter.enemyId);
}

function startEnemy(enemyId) {
  const template=ENEMIES[enemyId];
  currentEnemy=enemyScaled(template,currentRun.rank);
  currentEnemy.id=enemyId;
  ui.enemyCombatant.classList.remove("hidden");
  ui.enemyName.textContent=currentEnemy.name;
  ui.enemyRank.textContent=currentEnemy.boss?`BOSS · Rank ${currentRun.rank}`:`Rank ${currentRun.rank}`;
  renderEnemyHp();
  startEnemyIdle();
  renderSkills();
  ui.skillButtons.classList.remove("hidden");
  ui.guardButton.classList.remove("hidden");
  setMessage(currentEnemy.boss ? "The Big Mushroom Cat blocks the end of the path!" : `${currentEnemy.name} appeared!`);
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
  SKILLS.forEach(skill=>{
    const button=document.createElement("button");
    button.type="button";
    const unlocked=questSave.peep.level>=skill.unlock;
    let unavailable=false;
    let detail=skill.description;

    if(!unlocked) { unavailable=true; detail=`Unlocks at Lv. ${skill.unlock}`; }
    else if(skill.id==="magical-wish" && skillState.magicalWishCooldown>0) {
      unavailable=true; detail=`Cooldown: ${skillState.magicalWishCooldown} turn${skillState.magicalWishCooldown===1?"":"s"}`;
    } else if(skill.id==="duck-throw" && skillState.duckThrowCooldown>0) {
      unavailable=true; detail=`Cooldown: ${skillState.duckThrowCooldown} turn${skillState.duckThrowCooldown===1?"":"s"}`;
    } else if(skill.id==="peep-apocalypse" && skillState.apocalypseUsed) {
      unavailable=true; detail="Already used this battle.";
    }

    button.className=`pixel-button skill-button ${skill.type==="heal"?"heal":skill.id==="duck-throw"?"duck":skill.id==="peep-apocalypse"?"ultimate":""}${unlocked?"":" locked"}`;
    button.disabled=unavailable || actionLocked;
    button.innerHTML=`<strong>${skill.name}</strong><span${detail.startsWith("Cooldown")?' class="cooldown"':""}>${detail}</span>`;
    if(unlocked && !unavailable) button.addEventListener("click",()=>useSkill(skill));
    ui.skillButtons.appendChild(button);
  });
}

async function useSkill(skill) {
  if(actionLocked || !currentEnemy) return;
  actionLocked=true;
  renderSkills();
  ui.guardButton.disabled=true;

  if(skill.type==="heal") {
    ui.peepSprite.src="peep-attack.png";
    const amount=Math.max(1,Math.round(currentRun.maxHp*skill.healPercent));
    const healed=Math.min(amount,currentRun.maxHp-currentRun.hp);
    currentRun.hp+=healed;
    skillState.magicalWishCooldown=skill.cooldown;
    setMessage(`Magical Wish! Peep restored ${healed} HP.`);
    showFloat(`+${healed} HP`,"heal");
    renderPeepHp();
    await sleep(650);
  } else {
    ui.peepSprite.src="peep-attack.png";
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
  ui.guardButton.disabled=false;
  renderSkills();
}

function decrementCooldowns(usedSkillId) {
  if(usedSkillId!=="magical-wish" && skillState.magicalWishCooldown>0) skillState.magicalWishCooldown--;
  if(usedSkillId!=="duck-throw" && skillState.duckThrowCooldown>0) skillState.duckThrowCooldown--;
}

async function hurtEnemy(dmg) {
  if(!currentEnemy) return;
  currentEnemy.hpNow=Math.max(0,currentEnemy.hpNow-dmg);
  ui.enemySprite.src=currentEnemy.hurt;
  ui.enemySprite.classList.add("hurt-pop");
  showFloat(`-${dmg}`);
  renderEnemyHp();
  await sleep(360);
  ui.enemySprite.classList.remove("hurt-pop");
  if(currentEnemy.hpNow>0) ui.enemySprite.src=currentEnemy.idle[enemyIdleIndex%currentEnemy.idle.length];
}

async function enemyTurn() {
  if(!currentEnemy || currentEnemy.hpNow<=0) return;
  setMessage(`${currentEnemy.name} attacks!`);
  ui.enemySprite.classList.add("attack-pop");
  await sleep(300);

  const stats=peepStats();
  const crit=Math.random()<0.05;
  let dmg=Math.max(1,Math.round((currentEnemy.attackNow-(stats.defense*0.55))*(0.85+Math.random()*0.25)));
  if(crit) dmg=Math.round(dmg*1.5);
  if(guardActive) {
    dmg=Math.max(1,Math.ceil(dmg*0.5));
    guardActive=false;
  }

  currentRun.hp=Math.max(0,currentRun.hp-dmg);
  ui.peepSprite.src="peep-hurt.png";
  ui.peepSprite.classList.add("hurt-pop");
  showFloat(`-${dmg}`);
  renderPeepHp();
  await sleep(420);
  ui.peepSprite.classList.remove("hurt-pop");
  ui.enemySprite.classList.remove("attack-pop");
  ui.peepSprite.src=PEepIdle[peepIdleIndex%PEepIdle.length];

  if(currentRun.hp<=0) {
    endRun(false);
  } else {
    setMessage(crit?`${currentEnemy.name} landed a critical hit!`:"Peep is ready!");
  }
}

async function guardTurn() {
  if(actionLocked || !currentEnemy) return;
  actionLocked=true;
  guardActive=true;
  setMessage("Peep braces herself. Incoming damage will be halved!");
  await sleep(350);
  decrementCooldowns("guard");
  await enemyTurn();
  actionLocked=false;
  ui.guardButton.disabled=false;
  renderSkills();
}

async function enemyDefeated() {
  clearInterval(idleTimer);
  const defeated={...currentEnemy};
  currentEnemy=null;
  ui.skillButtons.classList.add("hidden");
  ui.guardButton.classList.add("hidden");
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
  ui.chestSprite.src="chest-closed.png";
  ui.chestSprite.classList.remove("opening");
  ui.openChest.classList.remove("hidden");
  ui.openChest.disabled=false;
  ui.chestLayer.classList.remove("hidden");
  ui.chestCaption.textContent=data.kind==="rare"
    ?"A rare treasure chest appeared!"
    :data.revealMimic
      ?"A suspicious treasure chest appeared..."
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
    ui.chestLayer.classList.add("hidden");
    actionLocked=false;
    setMessage("OH NO — IT'S A MIMIC!");
    startEnemy("mimic");
    return;
  }

  ui.chestSprite.src="chest-open.png";
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
    itemRolls=2;
    itemChance=1;
  } else if(chest.kind==="boss") {
    coins=randInt(chest.enemy.coinMinNow,chest.enemy.coinMaxNow)+12;
    exp=chest.enemy.expNow;
    itemRolls=1+(Math.random()<0.35?1:0);
    itemChance=1;
  } else {
    coins=randInt(chest.enemy.coinMinNow,chest.enemy.coinMaxNow);
    exp=chest.enemy.expNow;
    itemRolls=1;
    itemChance=0.38;
  }

  if(chest.enemy?.id==="mimic") {
    coins+=randInt(20,32);
    itemRolls=2;
    itemChance=1;
  }

  const items=[];
  for(let i=0;i<itemRolls;i++) {
    if(Math.random()<=itemChance) {
      const item=weightedItem();
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

  if(won) {
    currentRun.bossWon=true;
    questSave.completedRuns=(Number(questSave.completedRuns)||0)+1;

    // Run completion gives a tiny bit of OC happiness too.
    if(!hubSave.characterProgress.peep) hubSave.characterProgress.peep={happinessTotal:0};
    hubSave.characterProgress.peep.happinessTotal=Math.max(0,Number(hubSave.characterProgress.peep.happinessTotal)||0)+2;

    if(currentRun.rank===questSave.unlockedRank && questSave.unlockedRank<MAX_RUN_RANK) {
      questSave.unlockedRank++;
    }
  }

  persistAll();
  renderMeta();
  renderResult(won);
  showScreen("result");
}

function renderResult(won) {
  ui.resultKicker.textContent=won?"RUN COMPLETE!":"RUN ENDED";
  ui.resultTitle.textContent=won?"The Meadow is Clear!":"Peep needs a little rest.";
  ui.resultRank.textContent=currentRun?.rank||selectedRank;
  ui.resultCoins.textContent=currentRun?.coinsEarned||0;
  ui.resultExp.textContent=currentRun?.expEarned||0;
  ui.resultItems.innerHTML="";

  (currentRun?.itemsEarned||[]).forEach(item=>{
    const el=document.createElement("div");
    el.className="result-item";
    el.innerHTML=`<img src="${item.image}" alt=""><span>${item.name} ×${item.qty}</span>`;
    ui.resultItems.appendChild(el);
  });

  if(!(currentRun?.itemsEarned||[]).length) {
    const el=document.createElement("div");
    el.className="result-item";
    el.textContent="No item drops this time — try another run!";
    ui.resultItems.appendChild(el);
  }

  const levels=[...new Set(currentRun?.levelsGained||[])];
  if(levels.length) {
    ui.levelUpNotice.classList.remove("hidden");
    const unlocked=SKILLS.filter(s=>levels.includes(s.unlock)).map(s=>s.name);
    ui.levelUpNotice.textContent=`Level up! Peep reached Lv. ${questSave.peep.level}.${unlocked.length?` New skill unlocked: ${unlocked.join(", ")}`: ""}`;
  } else {
    ui.levelUpNotice.classList.add("hidden");
  }
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

function showFloat(text,type="damage") {
  ui.floatingText.textContent=text;
  ui.floatingText.style.color=type==="heal"?"#d9ffd4":"#fff";
  ui.floatingText.classList.remove("hidden");
  setTimeout(()=>ui.floatingText.classList.add("hidden"),500);
}

function setMessage(text) { ui.battleMessage.textContent=text; }

function returnHome() {
  clearAnimations();
  currentRun=null;
  showScreen("home");
  renderMeta();
}

document.querySelector("#backGames").addEventListener("click",()=>window.location.href="../#games");
document.querySelector("#resultBackGames").addEventListener("click",()=>window.location.href="../#games");
document.querySelector("#rankDown").addEventListener("click",()=>{selectedRank=Math.max(1,selectedRank-1);renderMeta();});
document.querySelector("#rankUp").addEventListener("click",()=>{selectedRank=Math.min(questSave.unlockedRank,selectedRank+1);renderMeta();});
document.querySelector("#startRun").addEventListener("click",beginRun);
document.querySelector("#abandonRun").addEventListener("click",()=>endRun(false));
document.querySelector("#guardButton").addEventListener("click",guardTurn);
document.querySelector("#openChest").addEventListener("click",openPendingChest);
document.querySelector("#continueButton").addEventListener("click",nextEncounter);
document.querySelector("#runAgain").addEventListener("click",()=>{selectedRank=currentRun?.rank||selectedRank;beginRun();});
document.querySelector("#backToQuest").addEventListener("click",returnHome);

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
