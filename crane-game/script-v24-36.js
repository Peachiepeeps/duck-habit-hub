const HUB_SAVE_KEY = "duckHabitHubSave_v1";
const CRANE_SAVE_KEY = "duckHabitHubCrane_v1";

const PRIZE_COIN_REWARD = 3;
const MACHINE_CLEAR_BONUS = 10;
const RESET_COST = 10;
const CATCH_CHANCE = 0.60;

const DUCK_CATALOG = {
  "angry-duck": {
    "name": "Angry Duck",
    "image": "../assets/ducks/angry-duck.png"
  },
  "apple-duck": {
    "name": "Apple Duck",
    "image": "../assets/ducks/apple-duck.png"
  },
  "bathtime-duck": {
    "name": "Bathtime Duck",
    "image": "../assets/ducks/bathtime-duck.png"
  },
  "duck-on-skateboard": {
    "name": "Duck on a Skateboard",
    "image": "../assets/ducks/duck-on-skateboard.png"
  },
  "googly-eye-duck": {
    "name": "Googly Eye Duck",
    "image": "../assets/ducks/googly-eye-duck.png"
  },
  "long-hair-duck": {
    "name": "Long Hair Duck",
    "image": "../assets/ducks/long-hair-duck.png"
  },
  "magenta-duck": {
    "name": "Magenta Duck",
    "image": "../assets/ducks/magenta-duck.png"
  },
  "pile-of-tiny-ducks": {
    "name": "Pile of Tiny Ducks",
    "image": "../assets/ducks/pile-of-tiny-ducks.png"
  },
  "scarf-duck": {
    "name": "Scarf Duck",
    "image": "../assets/ducks/scarf-duck.png"
  },
  "vampire-duck": {
    "name": "Vampire Duck",
    "image": "../assets/ducks/vampire-duck.png"
  },
  "alien-duck": {
    "name": "Alien Duck",
    "image": "../assets/ducks/Alien-duck.PNG"
  },
  "angel-duck": {
    "name": "Angel Duck",
    "image": "../assets/ducks/Angel-duck.PNG"
  },
  "aqua-duck": {
    "name": "Aqua Duck",
    "image": "../assets/ducks/Aqua-duck.PNG"
  },
  "artist-duck": {
    "name": "Artist Duck",
    "image": "../assets/ducks/Artist-duck.PNG"
  },
  "black-duck": {
    "name": "Black Duck",
    "image": "../assets/ducks/Black-duck.PNG"
  },
  "blue-duck": {
    "name": "Blue Duck",
    "image": "../assets/ducks/Blue-duck.PNG"
  },
  "bow-duck": {
    "name": "Bow Duck",
    "image": "../assets/ducks/Bow-duck.PNG"
  },
  "bronze-duck": {
    "name": "Bronze Duck",
    "image": "../assets/ducks/Bronze-duck.PNG"
  },
  "bunny-duck": {
    "name": "Bunny Duck",
    "image": "../assets/ducks/Bunny-duck.PNG"
  },
  "burger-duck": {
    "name": "Burger Duck",
    "image": "../assets/ducks/Burger-duck.PNG"
  },
  "cat-duck": {
    "name": "Cat Duck",
    "image": "../assets/ducks/Cat-duck.PNG"
  },
  "cool-duck": {
    "name": "Cool Duck",
    "image": "../assets/ducks/Cool-duck.PNG"
  },
  "cosmic-duck": {
    "name": "Cosmic Duck",
    "image": "../assets/ducks/Cosmic-duck.PNG"
  },
  "cupcake-duck": {
    "name": "Cupcake Duck",
    "image": "../assets/ducks/Cupcake-duck.PNG"
  },
  "dark-red-duck": {
    "name": "Dark Red Duck",
    "image": "../assets/ducks/Dark-red-duck.PNG"
  },
  "demon-duck": {
    "name": "Demon Duck",
    "image": "../assets/ducks/Demon-duck.PNG"
  },
  "doctor-duck": {
    "name": "Doctor Duck",
    "image": "../assets/ducks/Doctor-duck.PNG"
  },
  "duck-with-a-knife": {
    "name": "Duck with a Knife",
    "image": "../assets/ducks/Duck-with-a-knife.PNG"
  },
  "duckvee": {
    "name": "Duckvee",
    "image": "../assets/ducks/Duckvee.PNG"
  },
  "fancy-duck": {
    "name": "Fancy Duck",
    "image": "../assets/ducks/Fancy-duck.PNG"
  },
  "flower-duck": {
    "name": "Flower Duck",
    "image": "../assets/ducks/Flower-duck.PNG"
  },
  "gamer-duck": {
    "name": "Gamer Duck",
    "image": "../assets/ducks/Gamer-duck.PNG"
  },
  "ghost-duck": {
    "name": "Ghost Duck",
    "image": "../assets/ducks/Ghost-duck.PNG"
  },
  "glitter-duck": {
    "name": "Glitter Duck",
    "image": "../assets/ducks/Glitter-duck.PNG"
  },
  "golden-duck": {
    "name": "Golden Duck",
    "image": "../assets/ducks/Golden-duck.PNG"
  },
  "goose": {
    "name": "Goose",
    "image": "../assets/ducks/Goose.PNG"
  },
  "green-duck": {
    "name": "Green Duck",
    "image": "../assets/ducks/Green-duck.PNG"
  },
  "grey-duck": {
    "name": "Grey Duck",
    "image": "../assets/ducks/Grey-duck.PNG"
  },
  "gummy-duck": {
    "name": "Gummy Duck",
    "image": "../assets/ducks/Gummy-duck.PNG"
  },
  "jester-duck": {
    "name": "Jester Duck",
    "image": "../assets/ducks/Jester-duck.PNG"
  },
  "kidcore-duck": {
    "name": "Kidcore Duck",
    "image": "../assets/ducks/Kidcore-duck.PNG"
  },
  "king-duck": {
    "name": "King Duck",
    "image": "../assets/ducks/King-duck.PNG"
  },
  "knitted-duck": {
    "name": "Knitted Duck",
    "image": "../assets/ducks/Knitted-duck.PNG"
  },
  "lemon-duck": {
    "name": "Lemon Duck",
    "image": "../assets/ducks/Lemon-duck.PNG"
  },
  "lime-duck": {
    "name": "Lime Duck",
    "image": "../assets/ducks/Lime-duck.PNG"
  },
  "magical-girl-duck": {
    "name": "Magical Girl Duck",
    "image": "../assets/ducks/Magical-girl-duck.PNG"
  },
  "mint-duck": {
    "name": "Mint Duck",
    "image": "../assets/ducks/Mint-duck.PNG"
  },
  "mushroom-duck": {
    "name": "Mushroom Duck",
    "image": "../assets/ducks/Mushroom-duck.PNG"
  },
  "miko-duck": {
    "name": "Miko Duck",
    "image": "../assets/ducks/miko-duck.png"
  },
  "orange-duck": {
    "name": "Orange Duck",
    "image": "../assets/ducks/Orange-duck.PNG"
  },
  "party-hat-duck": {
    "name": "Party Hat Duck",
    "image": "../assets/ducks/Party-hat-duck.PNG"
  },
  "peach-duck": {
    "name": "Peach Duck",
    "image": "../assets/ducks/Peach-duck.PNG"
  },
  "peep-duck": {
    "name": "Peep Duck",
    "image": "../assets/ducks/peep-duck.png"
  },
  "periwinkle-duck": {
    "name": "Periwinkle Duck",
    "image": "../assets/ducks/Periwinkle-duck.PNG"
  },
  "pink-duck": {
    "name": "Pink Duck",
    "image": "../assets/ducks/Pink-duck.PNG"
  },
  "pizza-duck": {
    "name": "Pizza Duck",
    "image": "../assets/ducks/Pizza-duck.PNG"
  },
  "plush-duck": {
    "name": "Plush Duck",
    "image": "../assets/ducks/Plush-duck.PNG"
  },
  "pompompurin-duck": {
    "name": "Pompompurin Duck",
    "image": "../assets/ducks/Pompompurin-duck.PNG"
  },
  "purple-duck": {
    "name": "Purple Duck",
    "image": "../assets/ducks/Purple-duck.PNG"
  },
  "rainbow-duck": {
    "name": "Rainbow Duck",
    "image": "../assets/ducks/Rainbow-duck.PNG"
  },
  "red-duck": {
    "name": "Red Duck",
    "image": "../assets/ducks/Red-duck.PNG"
  },
  "silver-duck": {
    "name": "Silver Duck",
    "image": "../assets/ducks/Silver-duck.PNG"
  },
  "sky-blue-duck": {
    "name": "Sky Blue Duck",
    "image": "../assets/ducks/Sky-blue-duck.PNG"
  },
  "sleepy-time-duck": {
    "name": "Sleepy Time Duck",
    "image": "../assets/ducks/Sleepy-time-duck.PNG"
  },
  "standard-duck": {
    "name": "Standard Duck",
    "image": "../assets/ducks/Standard-duck.PNG"
  },
  "strawberry-duck": {
    "name": "Strawberry Duck",
    "image": "../assets/ducks/Strawberry-duck.PNG"
  },
  "tiny-duck-stack": {
    "name": "Tiny Duck Stack",
    "image": "../assets/ducks/Tiny-duck-stack.PNG"
  },
  "tiny-duck": {
    "name": "Tiny Duck",
    "image": "../assets/ducks/Tiny-duck.PNG"
  },
  "top-hat-duck": {
    "name": "Top Hat Duck",
    "image": "../assets/ducks/Top-hat-duck.PNG"
  },
  "violet-duck": {
    "name": "Violet Duck",
    "image": "../assets/ducks/Violet-duck.PNG"
  },
  "watermelon-duck": {
    "name": "Watermelon Duck",
    "image": "../assets/ducks/Watermelon-duck.PNG"
  },
  "white-duck": {
    "name": "White Duck",
    "image": "../assets/ducks/White-duck.PNG"
  }
};

const stage = document.getElementById("stage");
const prizeLayer = document.getElementById("prizeLayer");
const wire = document.getElementById("wire");
const claw = document.getElementById("claw");
const clawBox = document.getElementById("clawBox");
const joystick = document.getElementById("joystick");
const dropButton = document.getElementById("dropButton");
const resetButton = document.getElementById("resetButton");
const coinCount = document.getElementById("coinCount");
const message = document.getElementById("message");
const winToast = document.getElementById("winToast");
const winImage = document.getElementById("winImage");
const winName = document.getElementById("winName");
const winRewardText = document.getElementById("winRewardText");
const winText = document.getElementById("winText");
const keepPlayingBtn = document.getElementById("keepPlayingBtn");
const emptyState = document.getElementById("emptyState");

let prizes = [];
let clawX = .195;
let busy = false;
let heldPrize = null;
let joystickPointer = null;
let joystickCenterX = 0;
let joystickMaxPx = 42;
let joystickTilt = 0;
let movementFrame = null;
let lastMoveTime = performance.now();

const CLAW_MIN_X = .195;
const CLAW_MAX_X = .820;
const CLAW_HOME_Y = .118;
const CLAW_DROP_Y = .475;
const CHUTE_X = .195;
const CHUTE_DROP_Y = .690;

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

function clamp(n,min,max){
  return Math.max(min, Math.min(max,n));
}

function loadHubSave(){
  try{
    const raw = localStorage.getItem(HUB_SAVE_KEY);
    const data = raw ? JSON.parse(raw) : {};
    return data && typeof data === "object" ? data : {};
  }catch(e){
    return {};
  }
}

function saveHubSave(data){
  localStorage.setItem(HUB_SAVE_KEY, JSON.stringify(data));
}

function getCoins(){
  return Math.max(0, Math.floor(Number(loadHubSave().coins) || 0));
}

function setCoins(value){
  const data = loadHubSave();
  data.coins = Math.max(0, Math.floor(Number(value) || 0));
  saveHubSave(data);
  coinCount.textContent = data.coins;
}

function addCoins(amount){
  const data = loadHubSave();
  data.coins = Math.max(0, Math.floor(Number(data.coins) || 0) + Math.floor(Number(amount) || 0));
  data.stats = data.stats && typeof data.stats === "object" ? data.stats : {};
  data.stats.cranePrizes = Math.max(0, Number(data.stats.cranePrizes) || 0) + 1;
  saveHubSave(data);
  coinCount.textContent = data.coins;
}

function getUnlockedDuckIds(){
  const data = loadHubSave();
  const unlocked = Array.isArray(data.unlockedDucks) ? data.unlockedDucks : [];
  return [...new Set(unlocked)].filter(id => DUCK_CATALOG[id]);
}

function updateAvailability(){
  const ids = getUnlockedDuckIds();
  const hasDucks = ids.length > 0;
  emptyState.classList.toggle("hidden", hasDucks);
  dropButton.disabled = !hasDucks || busy;
  resetButton.disabled = !hasDucks || busy;
  return ids;
}

function shuffled(array){
  const copy = [...array];
  for(let i=copy.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [copy[i],copy[j]]=[copy[j],copy[i]];
  }
  return copy;
}

function chooseLayoutDuckIds(){
  const pool = getUnlockedDuckIds();
  if(!pool.length) return [];
  if(pool.length >= 5) return shuffled(pool).slice(0,5);

  const result = shuffled(pool);
  while(result.length < 5){
    result.push(pool[Math.floor(Math.random()*pool.length)]);
  }
  return result;
}

function newPrizeLayout(){
  const ids = chooseLayoutDuckIds();
  if(!ids.length){
    prizes = [];
    saveCraneState();
    renderPrizes();
    updateAvailability();
    return;
  }

  const lanes = [.405,.495,.585,.675,.765];
  const yRows = [.640,.655,.632,.660,.642];

  prizes = lanes.map((x,i)=>{
    const duckId = ids[i];
    const duck = DUCK_CATALOG[duckId];
    return {
      uid:`${Date.now()}-${i}-${Math.random()}`,
      duckId,
      name:duck.name,
      image:duck.image,
      x:clamp(x+(Math.random()-.5)*.022,.390,.790),
      y:clamp(yRows[i]+(Math.random()-.5)*.018,.605,.680),
      rotation:(Math.random()-.5)*12
    };
  });

  saveCraneState();
  renderPrizes();
  updateAvailability();
}

function saveCraneState(){
  localStorage.setItem(CRANE_SAVE_KEY, JSON.stringify({prizes,clawX}));
}

function loadCraneState(){
  try{
    const raw = localStorage.getItem(CRANE_SAVE_KEY);
    const saved = raw ? JSON.parse(raw) : null;
    if(!saved || !Array.isArray(saved.prizes)) return false;

    const unlocked = new Set(getUnlockedDuckIds());
    const valid = saved.prizes.filter(p =>
      p &&
      typeof p.duckId === "string" &&
      unlocked.has(p.duckId) &&
      DUCK_CATALOG[p.duckId]
    ).map(p => ({
      ...p,
      name:DUCK_CATALOG[p.duckId].name,
      image:DUCK_CATALOG[p.duckId].image,
      x:clamp(Number(p.x)||.50,.390,.790),
      y:clamp(Number(p.y)||.64,.605,.685)
    }));

    prizes = valid;
    clawX = typeof saved.clawX === "number"
      ? clamp(saved.clawX,CLAW_MIN_X,CLAW_MAX_X)
      : CHUTE_X;

    if(prizes.length) saveCraneState();
    return prizes.length > 0;
  }catch(e){
    return false;
  }
}

function renderPrizes(){
  prizeLayer.innerHTML = "";
  prizes.forEach(p=>{
    const img = document.createElement("img");
    img.className = "prize";
    img.dataset.uid = p.uid;
    img.src = p.image;
    img.alt = p.name;
    img.style.left = `${p.x*100}%`;
    img.style.top = `${p.y*100}%`;
    img.style.transform = `translate(-50%,-50%) rotate(${p.rotation||0}deg)`;
    prizeLayer.appendChild(img);
  });
}

function prizeElement(uid){
  return prizeLayer.querySelector(`[data-uid="${uid}"]`);
}

function setMessage(text){
  message.textContent = text;
}

function setClawImage(closed){
  claw.src = closed ? "Crane-closed.png" : "Crane-opened.png";
}

function stageHeight(){
  return stage.getBoundingClientRect().height;
}

function setClawPosition(x=clawX,y=CLAW_HOME_Y,animate=true){
  clawX = clamp(x,CLAW_MIN_X,CLAW_MAX_X);
  const h = stageHeight();
  const clawTop = y*h;

  // CSS wire deliberately overlaps beneath the claw cap.
  const wireOverlap = Math.max(15,h*.021);
  const wireHeight = Math.max(10,clawTop+wireOverlap);

  wire.style.transition = animate
    ? "left .06s linear,height .58s ease-in-out"
    : "none";
  clawBox.style.transition = animate
    ? "left .06s linear,top .58s ease-in-out"
    : "none";

  wire.style.left = `${clawX*100}%`;
  wire.style.height = `${wireHeight}px`;

  clawBox.style.left = `${clawX*100}%`;
  clawBox.style.top = `${clawTop}px`;

  if(heldPrize){
    const el = prizeElement(heldPrize.uid);
    if(el){
      el.classList.add("held");
      el.style.transition = animate
        ? "left .06s linear,top .58s ease-in-out,transform .32s ease"
        : "none";
      el.style.left = `${clawX*100}%`;
      el.style.top = `${Math.min(.78,y+.185)*100}%`;
      el.style.transform = "translate(-50%,-50%) scale(.92)";
    }
  }
}

function syncClawInstant(){
  setClawPosition(clawX,CLAW_HOME_Y,false);
  requestAnimationFrame(()=>{
    wire.style.transition = "";
    clawBox.style.transition = "";
  });
}

function closestPrize(){
  if(!prizes.length) return null;

  let best = null;
  let bestDx = Infinity;
  for(const p of prizes){
    const dx = Math.abs(p.x-clawX);
    if(dx < bestDx){
      best = p;
      bestDx = dx;
    }
  }

  return bestDx <= .052 ? best : null;
}

function startJoystickMovement(){
  if(movementFrame) return;
  lastMoveTime = performance.now();

  const tick = now => {
    const dt = Math.min(.04,(now-lastMoveTime)/1000);
    lastMoveTime = now;

    if(!busy && Math.abs(joystickTilt)>.08){
      const speed = .29;
      clawX = clamp(
        clawX + joystickTilt*speed*dt,
        CLAW_MIN_X,
        CLAW_MAX_X
      );
      setClawPosition(clawX,CLAW_HOME_Y,false);
      saveCraneState();
    }

    movementFrame = requestAnimationFrame(tick);
  };

  movementFrame = requestAnimationFrame(tick);
}

function stopJoystickMovement(){
  if(movementFrame){
    cancelAnimationFrame(movementFrame);
    movementFrame = null;
  }
}

joystick.addEventListener("pointerdown",e=>{
  if(busy || !getUnlockedDuckIds().length) return;

  joystickPointer = e.pointerId;
  joystick.setPointerCapture(e.pointerId);
  joystick.classList.add("dragging");

  const box = joystick.getBoundingClientRect();
  joystickCenterX = box.left + box.width/2;

  const stageBox = stage.getBoundingClientRect();
  joystickMaxPx = Math.max(28,stageBox.width*.032);

  startJoystickMovement();
  e.preventDefault();
});

joystick.addEventListener("pointermove",e=>{
  if(e.pointerId!==joystickPointer || busy) return;

  const dx = clamp(e.clientX-joystickCenterX,-joystickMaxPx,joystickMaxPx);
  joystickTilt = dx/joystickMaxPx;
  joystick.style.transform =
    `translate(calc(-50% + ${dx}px),-50%) rotate(${joystickTilt*8}deg)`;
  e.preventDefault();
});

function releaseJoystick(e){
  if(joystickPointer===null) return;
  if(e && e.pointerId!==joystickPointer) return;

  try{joystick.releasePointerCapture(joystickPointer)}catch(err){}

  joystickPointer = null;
  joystickTilt = 0;
  joystick.classList.remove("dragging");
  joystick.style.transition = "transform .18s ease";
  joystick.style.transform = "translate(-50%,-50%) rotate(0deg)";

  setTimeout(()=>{joystick.style.transition=""},190);
  stopJoystickMovement();
}

joystick.addEventListener("pointerup",releaseJoystick);
joystick.addEventListener("pointercancel",releaseJoystick);

async function showWinToast(prize,machineCleared=false){
  winImage.src = prize.image;
  winImage.alt = prize.name;
  winName.textContent = prize.name;

  const total = PRIZE_COIN_REWARD + (machineCleared ? MACHINE_CLEAR_BONUS : 0);
  winRewardText.textContent = machineCleared
    ? `+${PRIZE_COIN_REWARD} Pink Coins + ${MACHINE_CLEAR_BONUS} clear bonus!`
    : `+${PRIZE_COIN_REWARD} Pink Coins!`;

  winText.textContent = machineCleared
    ? `Machine cleared! Total reward: +${total} Pink Coins. ♡`
    : "Successful catch! Your duck stays safely unlocked in Duckipedia. ♡";

  winToast.classList.add("show");
  winToast.setAttribute("aria-hidden","false");

  await new Promise(resolve=>{
    const handler = ()=>{
      keepPlayingBtn.removeEventListener("click",handler);
      winToast.classList.remove("show");
      winToast.setAttribute("aria-hidden","true");
      resolve();
    };
    keepPlayingBtn.addEventListener("click",handler);
  });
}

async function returnClawToHome(){
  setClawPosition(clawX,CLAW_HOME_Y,true);
  await sleep(580);

  if(Math.abs(clawX-CHUTE_X)>.002){
    const startX = clawX;
    const duration = 620;
    const started = performance.now();

    await new Promise(resolve=>{
      const animate = now => {
        const t = clamp((now-started)/duration,0,1);
        const eased = t<.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2;
        const x = startX+(CHUTE_X-startX)*eased;
        setClawPosition(x,CLAW_HOME_Y,false);

        if(t<1) requestAnimationFrame(animate);
        else resolve();
      };
      requestAnimationFrame(animate);
    });
  }

  clawX = CHUTE_X;
  setClawPosition(clawX,CLAW_HOME_Y,false);
  setClawImage(false);
  saveCraneState();
}

async function dropClaw(){
  if(busy || !getUnlockedDuckIds().length) return;

  busy = true;
  dropButton.disabled = true;
  resetButton.disabled = true;
  releaseJoystick();

  const target = closestPrize();
  setClawImage(false);

  setClawPosition(clawX,CLAW_DROP_Y,true);
  await sleep(620);

  setClawImage(true);
  await sleep(320);

  if(!target){
    setMessage("Nothing there!");
    await sleep(250);
    await returnClawToHome();

    busy = false;
    updateAvailability();
    return;
  }

  heldPrize = target;
  const targetEl = prizeElement(target.uid);
  if(targetEl) targetEl.classList.add("held");

  setClawPosition(clawX,.250,true);
  await sleep(600);

  const won = Math.random() < CATCH_CHANCE;

  if(!won){
    heldPrize = null;

    if(targetEl){
      targetEl.classList.remove("held");
      targetEl.style.transition = "";
      targetEl.classList.add("slipping");

      target.x = clamp(target.x+(Math.random()-.5)*.022,.390,.790);
      target.y = clamp(target.y+(Math.random()-.5)*.012,.610,.685);
      target.rotation = (Math.random()-.5)*18;

      targetEl.style.left = `${target.x*100}%`;
      targetEl.style.top = `${target.y*100}%`;
      targetEl.style.transform =
        `translate(-50%,-50%) rotate(${target.rotation}deg)`;
    }

    await sleep(620);
    if(targetEl) targetEl.classList.remove("slipping");

    saveCraneState();
    await returnClawToHome();

    busy = false;
    updateAvailability();
    return;
  }

  setClawPosition(clawX,CLAW_HOME_Y,true);
  await sleep(580);

  const startX = clawX;
  const travelDuration = 760;
  const started = performance.now();

  await new Promise(resolve=>{
    const animate = now => {
      const t = clamp((now-started)/travelDuration,0,1);
      const eased = t<.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2;
      const x = startX+(CHUTE_X-startX)*eased;
      setClawPosition(x,CLAW_HOME_Y,false);

      if(t<1) requestAnimationFrame(animate);
      else resolve();
    };
    requestAnimationFrame(animate);
  });

  await sleep(160);

  setClawImage(false);
  heldPrize = null;

  if(targetEl){
    targetEl.classList.remove("held");
    targetEl.style.transition =
      "left .12s linear,top .12s linear,transform .12s linear";
    targetEl.style.left = `${CHUTE_X*100}%`;
    targetEl.style.top = "29%";
    targetEl.style.transform =
      "translate(-50%,-50%) scale(.90)";
    await sleep(150);

    targetEl.style.transition =
      "top .58s cubic-bezier(.35,.02,.72,1),transform .58s ease,opacity .18s ease .42s";
    targetEl.style.top = `${CHUTE_DROP_Y*100}%`;
    targetEl.style.transform =
      "translate(-50%,-50%) scale(.70) rotate(-8deg)";
    await sleep(500);
    targetEl.classList.add("won");
  }

  await sleep(170);

  prizes = prizes.filter(p=>p.uid!==target.uid);
  const machineCleared = prizes.length===0;

  addCoins(PRIZE_COIN_REWARD);
  if(machineCleared){
    // Clear bonus should not count as another crane prize statistic.
    const data = loadHubSave();
    data.coins = Math.max(0,Math.floor(Number(data.coins)||0)+MACHINE_CLEAR_BONUS);
    saveHubSave(data);
    coinCount.textContent = data.coins;
  }

  saveCraneState();
  await showWinToast(target,machineCleared);

  clawX = CHUTE_X;
  setClawPosition(clawX,CLAW_HOME_Y,false);

  if(machineCleared){
    newPrizeLayout();
  }else{
    renderPrizes();
    saveCraneState();
  }

  busy = false;
  updateAvailability();
}

function resetPrizes(){
  if(busy) return;

  const ids = getUnlockedDuckIds();
  if(!ids.length){
    updateAvailability();
    return;
  }

  const coins = getCoins();
  if(coins < RESET_COST){
    // Keep the clean machine look; briefly pulse the coin counter instead of a big alert.
    const box = document.getElementById("coinBox");
    box.animate(
      [
        {transform:"scale(1)"},
        {transform:"scale(1.08)"},
        {transform:"scale(1)"}
      ],
      {duration:360,easing:"ease-out"}
    );
    return;
  }

  setCoins(coins-RESET_COST);
  clawX = CHUTE_X;
  setClawPosition(clawX,CLAW_HOME_Y,false);
  newPrizeLayout();
}

dropButton.addEventListener("click",dropClaw);
resetButton.addEventListener("click",resetPrizes);

window.addEventListener("resize",syncClawInstant);
window.addEventListener("pageshow",()=>{
  coinCount.textContent = getCoins();
  updateAvailability();
});
window.addEventListener("storage",e=>{
  if(e.key===HUB_SAVE_KEY){
    coinCount.textContent = getCoins();
    updateAvailability();
  }
});

coinCount.textContent = getCoins();

if(!getUnlockedDuckIds().length){
  prizes = [];
  renderPrizes();
  updateAvailability();
}else if(!loadCraneState()){
  clawX = CHUTE_X;
  newPrizeLayout();
}else{
  renderPrizes();
  updateAvailability();
}

syncClawInstant();
