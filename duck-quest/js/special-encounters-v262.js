(function(){
  "use strict";
  const TC=window.DuckieTradingCards;
  const V="24.262";
  const LUV_IDS=[
    ["lukio","Lukio"],["shinobu","Shinobu"],["cheryln","Cheryln"],["hibiki","Hibiki"],["devlin","Devlin"],
    ["yuzuru","Yuzuru"],["westley","Westley"],["circe","Circe"],["quin","Quin"]
  ];
  const PLUSH_BASE="assets/enemies/plushbun/base/";
  const GIFT_BASE="assets/events/gift-box/";
  const LUV_FRAMES=["assets/events/luv-and-birdie/idle-1.png","assets/events/luv-and-birdie/idle-2.png"];

  if(typeof ENEMIES!=="undefined"){
    ENEMIES.plushbun={name:"Plushbun",hp:24,attack:4,exp:26,coinMin:7,coinMax:12,idle:[PLUSH_BASE+"idle-1.png",PLUSH_BASE+"idle-2.png"],hurt:PLUSH_BASE+"hurt.png",speed:390};
    ENEMIES["gift-mimic"]={name:"Gift Box Mimic",hp:32,attack:6,exp:38,coinMin:18,coinMax:28,idle:[GIFT_BASE+"mimic-idle-1.png",GIFT_BASE+"mimic-idle-2.png"],hurt:GIFT_BASE+"regular-closed.png",speed:620};
  }

  function ensureCraftState(data){
    if(!data||typeof data!=="object") return null;
    if(TC?.cardCraft?.ensure) return TC.cardCraft.ensure(data);
    const state=TC?.ensureState?.(data); if(!state) return null;
    state.cardDust=Math.max(0,Math.floor(Number(state.cardDust)||0));
    return state;
  }
  function persist(){ try{persistAll();}catch(e){ try{TC?.writeSave?.(hubSave);}catch(_){} } }
  function activeEncounter(){return currentRun?.mode==="endless"?currentRun?.endlessEncounter:currentRun?.plan?.[currentRun?.index||0];}
  function finishSpecial(message){
    stopLuvAnimation();
    ui.chestLayer?.classList.remove("merchant-active-v197","luv-birdie-active-v262","gift-box-active-v262");
    ui.chestLayer?.querySelector("#luvBirdieMenuV262")?.remove();
    ui.chestLayer?.querySelector("#giftBoxMenuV262")?.remove();
    ui.openChest?.classList.add("hidden");
    ui.chestLayer?.classList.add("hidden");
    setMessage(message);
    if(currentRun?.mode==="endless") markEndlessFloorComplete();
    ui.continueButton.textContent=currentRun?.mode==="endless"?"Next Floor":"Continue";
    ui.postFloorActions?.classList.remove("hidden");
    ui.leaveEndlessButton?.classList.toggle("hidden",currentRun?.mode!=="endless");
    setPostFloorLayout(true); actionLocked=false; persist();
  }
  function prepSpecial(encounter){
    try{clearAnimations();}catch(e){}
    actionLocked=false; pendingChest=null; pendingDefeatedEnemy=null; befriendAttempted=false;
    ui.befriendPanel?.classList.add("hidden"); ui.ponPurchasePanel?.classList.add("hidden");
    try{resetDoubleBattleUi();}catch(e){} try{hideEventChoices();}catch(e){}
    ui.enemyCombatant?.classList.add("hidden"); ui.enemyCombatant2?.classList.add("hidden"); ui.buddyCombatant?.classList.add("hidden");
    ui.commandGrid?.classList.add("hidden"); try{closeCommandWindow();}catch(e){}
    ui.chestLayer?.classList.add("hidden"); ui.postFloorActions?.classList.add("hidden"); ui.leaveEndlessButton?.classList.add("hidden");
    try{setPostFloorLayout(false);}catch(e){}
    if(currentRun?.mode==="endless"){
      currentRun.rank=endlessEffectiveRank(currentRun.floor);
      if(!currentRun.floorBackground) currentRun.floorBackground=chooseEndlessBackground();
      ui.battleBg.src=currentRun.floorBackground;
    }else if(currentRun){ const cfg=currentAreaConfig(); ui.battleBg.src=cfg.backgrounds[currentRun.index]; }
    updateEncounterHeader(encounter);
    if(ui.peepLevelCombat) ui.peepLevelCombat.textContent=`Lv. ${activeHeroProgress().level}`;
    try{renderPeepHp(); startPeepIdle();}catch(e){}
  }

  // ----- Luv & Birdie: Miko special event, Merchant-sized and animated -----
  let luvTimer=null;
  function stopLuvAnimation(){ if(luvTimer){clearInterval(luvTimer);luvTimer=null;} }
  function startLuvAnimation(){
    stopLuvAnimation(); let i=0; if(!ui.chestSprite)return;
    ui.chestSprite.src=LUV_FRAMES[0];
    luvTimer=setInterval(()=>{i=(i+1)%2;if(ui.chestSprite)ui.chestSprite.src=LUV_FRAMES[i];},430);
  }
  function showLuvBirdie(){
    pendingChest={kind:"event",eventType:"luv-birdie"};
    ui.chestLayer.classList.remove("hidden");
    ui.chestLayer.classList.add("merchant-active-v197","luv-birdie-active-v262");
    ui.chestSprite.classList.add("event-scene-art","merchant-duck","luv-birdie-art-v262");
    ui.chestSprite.alt="Luv and Birdie"; startLuvAnimation();
    ui.openChest.classList.add("hidden");
    ui.chestCaption.textContent="Luv & Birdie";
    setMessage("Luv and Birdie snuggle together, both chirping sweet chirps to each other. It makes Miko think of someone… but who..?");
    let menu=ui.chestLayer.querySelector("#luvBirdieMenuV262");
    if(!menu){menu=document.createElement("div");menu.id="luvBirdieMenuV262";menu.className="merchant-shop-v197 luv-birdie-menu-v262";ui.chestLayer.appendChild(menu);}
    menu.innerHTML='<div class="luv-birdie-copy-v262"><strong>Who is Miko thinking of?</strong><small>Choose someone to give them a 3× encounter weight for the next 3 eligible character-event rolls.</small></div>';
    const grid=document.createElement("div");grid.className="luv-birdie-grid-v262";
    LUV_IDS.forEach(([id,name])=>{const b=document.createElement("button");b.type="button";b.className="pixel-button luv-birdie-choice-v262";b.textContent=name;b.addEventListener("click",()=>{
      hubSave.luvBirdieFocusV262={characterId:id,name,rollsRemaining:3,weight:3}; persist();
      finishSpecial(`Luv and Birdie chirp happily! ${name} will be much more likely to appear for Miko's next few character encounters.`);
    });grid.appendChild(b);});
    menu.appendChild(grid);
    const leave=document.createElement("button");leave.type="button";leave.className="pixel-button merchant-leave-v197";leave.textContent="Maybe another time";leave.addEventListener("click",()=>finishSpecial("Luv and Birdie cuddle close as Miko continues onward."));menu.appendChild(leave);
  }

  // Add Luv & Birdie at the same special-event weight as Merchant (Miko only).
  if(typeof pickSituationType==="function"){
    pickSituationType=function(mode="stage"){
      const entries=mode==="endless"
        ?[{value:"lucky-picnic",weight:5},{value:"wishing-fountain",weight:4},{value:"mysterious-merchant",weight:3}]
        :[{value:"lucky-picnic",weight:6},{value:"wishing-fountain",weight:4},{value:"mysterious-merchant",weight:3}];
      if(activeCharacterId==="miko") entries.push({value:"luv-birdie",weight:3});
      if(activeCharacterId==="miko"||activeCharacterId==="miho") entries.push({value:"sibling-spat",weight:1});
      return weightedPick(entries);
    };
  }
  if(typeof situationTitle==="function"){
    const oldSituationTitleV262=situationTitle;
    situationTitle=function(type){if(type==="luv-birdie")return"Luv & Birdie";if(type==="gift-box")return"Gift Box";return oldSituationTitleV262(type);};
  }
  if(typeof updateEncounterHeader==="function"){
    const oldHeaderV262=updateEncounterHeader;
    updateEncounterHeader=function(encounter=currentEncounterData()){oldHeaderV262(encounter);if(encounter?.type==="luv-birdie")ui.encounterLabel.textContent+=" · LUV & BIRDIE";else if(encounter?.type==="gift-box")ui.encounterLabel.textContent+=" · GIFT BOX";};
  }

  // ----- Gift Box special encounter + Plushbun universal wandering enemy -----
  if(typeof buildEncounterFromPool==="function"){
    const oldBuildV262=buildEncounterFromPool;
    buildEncounterFromPool=function(enemyPool,mode="stage"){
      // Match the ordinary Mimic encounter bucket: about 5% per generated encounter.
      if(Math.random()<0.05) return {type:"gift-box"};
      const result=oldBuildV262(enemyPool,mode);
      if(result?.type==="enemy" && Math.random()<0.06) result.enemyId="plushbun";
      return result;
    };
  }

  function rollGiftStyle(){
    // Shiny always uses the exact existing game shiny rate + active Shimmer charm.
    if(Math.random()<currentShinyRate()) return "shiny";
    return Math.random()<0.20?"lucky":"regular";
  }
  function rollGiftReward(style){
    const r=Math.random();
    if(style==="shiny") return r<.20?{cards:3,packs:0}:r<.80?{cards:0,packs:2}:{cards:0,packs:3};
    if(style==="lucky") return r<.25?{cards:2,packs:0}:r<.85?{cards:0,packs:1}:{cards:0,packs:2};
    return r<.80?{cards:1,packs:0}:{cards:0,packs:1};
  }
  function giftArt(style,state="closed"){
    if(style==="shiny") return GIFT_BASE+`shiny-${state}.png`;
    if(style==="lucky") return GIFT_BASE+`lucky-${state}.png`;
    return GIFT_BASE+`regular-${state}.png`;
  }
  let giftTimer=null;
  function stopGiftAnimation(){if(giftTimer){clearInterval(giftTimer);giftTimer=null;}}
  function showGiftBox(){
    stopGiftAnimation();
    const style=rollGiftStyle(), reward=rollGiftReward(style), mimic=Math.random()<0.25;
    pendingChest={kind:"gift-box",giftStyle:style,giftReward:reward,revealGiftMimic:mimic,opened:false};
    ui.chestLayer.classList.remove("hidden");ui.chestLayer.classList.add("gift-box-active-v262");
    ui.chestSprite.classList.remove("merchant-duck");ui.chestSprite.classList.add("gift-box-art-v262");
    ui.chestSprite.alt=style==="shiny"?"Shiny Gift Box":style==="lucky"?"Lucky Gift Box":"Gift Box";
    ui.chestSprite.src=giftArt(style,"closed");
    if(style==="lucky"){
      let frame=0; giftTimer=setInterval(()=>{if(!pendingChest||pendingChest.kind!=="gift-box"){stopGiftAnimation();return;} frame=(frame+1)%2;ui.chestSprite.src=GIFT_BASE+`lucky-idle-${frame+1}.png`;},430);
    }
    ui.chestCaption.textContent=style==="shiny"?"A sparkling Gift Box appeared!":style==="lucky"?"A Lucky Gift Box appeared!":"A Gift Box appeared!";
    ui.openChest.classList.remove("hidden");ui.openChest.disabled=false;ui.openChest.textContent="Open";
    setMessage("A mysterious present is waiting for you. Maybe it has cards inside…?");
  }

  function randomCard(){
    if(!TC) return null;
    const rarity=TC.rollRarity?.()||"common";return TC.rollCard?.(rarity)||null;
  }
  function grantCardPackReward(reward){
    const notes=[]; const cardResults=[]; const state=ensureCraftState(hubSave);
    if(!state||!TC) return {notes,cardResults};
    const cards=Math.max(0,Math.floor(Number(reward?.cards)||0));const packs=Math.max(0,Math.floor(Number(reward?.packs)||0));
    for(let i=0;i<cards;i++){const card=randomCard();if(card){const result=TC.grantCard(hubSave,card.id,1);if(result){cardResults.push(result);notes.push(`${card.name} Card${result.isNew?" ✨":""}`);}}}
    if(packs){TC.grantPack(hubSave,packs);notes.push(`${packs} Card Pack${packs===1?"":"s"}`);}
    persist(); return {notes,cardResults};
  }

  async function openGiftBox(){
    if(!pendingChest||pendingChest.kind!=="gift-box"||ui.openChest.disabled)return;
    actionLocked=true;ui.openChest.disabled=true;stopGiftAnimation();ui.chestSprite.classList.add("opening");await sleep(260);
    const info={...pendingChest,giftReward:{...pendingChest.giftReward}};
    ui.chestSprite.src=giftArt(info.giftStyle,"open");await sleep(180);
    if(info.revealGiftMimic){
      ui.chestCaption.textContent="Oh no… it moved!";setMessage("The Gift Box was a Mimic!");await sleep(360);ui.chestLayer.classList.add("hidden");actionLocked=false;
      startEnemy("gift-mimic",{giftStyle:info.giftStyle,giftReward:info.giftReward});return;
    }
    const granted=grantCardPackReward(info.giftReward);
    ui.chestCaption.textContent=granted.notes.length?granted.notes.join(" · "):"A cute little card surprise!";
    finishSpecial(`Gift opened! ${granted.notes.join(" · ")}`.trim());
  }

  // Start special events after all older encounter wrappers have run.
  if(typeof startEncounter==="function"){
    const oldStartEncounterV262=startEncounter;
    startEncounter=function(){
      const encounter=activeEncounter();
      if(encounter?.type==="luv-birdie"){prepSpecial(encounter);showLuvBirdie();return;}
      if(encounter?.type==="gift-box"){prepSpecial(encounter);showGiftBox();return;}
      stopLuvAnimation();stopGiftAnimation();return oldStartEncounterV262();
    };
  }

  // Plushbun and Gift Mimic use normal battle systems, but their art/variant logic is custom.
  if(typeof startEnemy==="function"){
    const oldStartEnemyV262=startEnemy;
    startEnemy=function(enemyId,options={}){
      oldStartEnemyV262(enemyId,options);
      if(!currentEnemy)return;
      if(enemyId==="plushbun"){
        const shiny=Math.random()<currentShinyRate();
        let variant="default";
        if(!shiny){const r=Math.random();variant=r<.40?"default":r<.55?"pink":r<.70?"mint":r<.85?"purple":"red";}
        const prefix=shiny?"shiny":variant;
        currentEnemy.shiny=shiny;currentEnemy.shinyId=shiny?"shiny":"";currentEnemy.plushbunVariant=variant;
        currentEnemy.name=shiny?"Shiny Plushbun":variant==="default"?"Plushbun":`${variant[0].toUpperCase()+variant.slice(1)} Plushbun`;
        const filePrefix=prefix==="default"?"":prefix+"-";
        currentEnemy.idle=[PLUSH_BASE+filePrefix+"idle-1.png",PLUSH_BASE+filePrefix+"idle-2.png"];
        currentEnemy.hurt=PLUSH_BASE+filePrefix+"hurt.png";
        renderEnemyCombatant(currentEnemy,currentEnemy._doubleSlot||0);startEnemyIdle();renderEnemyName(currentEnemy);
        if(shiny)requestAnimationFrame(()=>playShinyArrivalSparkle(enemyUiFor(currentEnemy).combatant));
        setMessage(shiny?"Shiny Plushbun ✨ hopped in! A super-rare Shiny Buddy!":`${currentEnemy.name} wandered in from another stage!`);
      }else if(enemyId==="gift-mimic"){
        const shiny=options.giftStyle==="shiny";
        currentEnemy.shiny=shiny;currentEnemy.giftStyle=options.giftStyle||"regular";currentEnemy.giftReward=options.giftReward||{cards:1,packs:0};
        currentEnemy.name=shiny?"Shiny Gift Box Mimic":"Gift Box Mimic";
        currentEnemy.idle=shiny?[GIFT_BASE+"mimic-shiny-idle-1.png",GIFT_BASE+"mimic-shiny-idle-2.png"]:[GIFT_BASE+"mimic-idle-1.png",GIFT_BASE+"mimic-idle-2.png"];
        currentEnemy.hurt=giftArt(options.giftStyle||"regular","closed");
        renderEnemyCombatant(currentEnemy,currentEnemy._doubleSlot||0);startEnemyIdle();renderEnemyName(currentEnemy);
        if(shiny)requestAnimationFrame(()=>playShinyArrivalSparkle(enemyUiFor(currentEnemy).combatant));
        setMessage(`${currentEnemy.name} sprang out of the present!`);
      }
    };
  }

  // Stuffed Surprise: 25% after defeat OR capture; gift mimic keeps its pre-rolled card reward.
  function rollStuffedSurprise(){const r=Math.random();return r<.50?{type:"coins",amount:randInt(18,32)+Math.max(1,Math.round((Number(currentRun?.rank)||1)*.8))}:r<.75?{type:"dust",amount:12}:r<.95?{type:"card",amount:1}:{type:"pack",amount:1};}
  if(typeof enemyDefeated==="function"){
    const oldEnemyDefeatedV262=enemyDefeated;
    enemyDefeated=async function(options={}){
      const defeated=currentEnemy;const result=await oldEnemyDefeatedV262(options);
      if(result && pendingChest && defeated?.id==="plushbun" && Math.random()<0.25) pendingChest.plushbunSurprise=rollStuffedSurprise();
      if(result && pendingChest && defeated?.id==="gift-mimic") pendingChest.giftReward=defeated.giftReward||{cards:1,packs:0};
      return result;
    };
  }

  if(typeof generateRewards==="function"){
    const oldGenerateRewardsV262=generateRewards;
    generateRewards=function(chest){const r=oldGenerateRewardsV262(chest);if(chest?.plushbunSurprise?.type==="coins")r.coins=Math.max(0,Number(r.coins)||0)+chest.plushbunSurprise.amount;r.v262StuffedSurprise=chest?.plushbunSurprise||null;r.v262GiftReward=chest?.giftReward||null;return r;};
  }
  if(typeof applyRewards==="function"){
    const oldApplyRewardsV262=applyRewards;
    applyRewards=function(rewards){oldApplyRewardsV262(rewards);if(!Array.isArray(rewards.items))rewards.items=[];if(!Array.isArray(rewards.tradingCardResults))rewards.tradingCardResults=[];
      const s=rewards.v262StuffedSurprise;
      if(s?.type==="dust"){const state=ensureCraftState(hubSave);if(state){state.cardDust+=s.amount;rewards.items.push({id:"card-dust-v262",name:"Card Dust",qty:s.amount});}}
      else if(s?.type==="card"){const c=randomCard();const g=c&&TC?.grantCard?.(hubSave,c.id,1);if(g)rewards.tradingCardResults.push(g);}
      else if(s?.type==="pack"){TC?.grantPack?.(hubSave,s.amount);rewards.items.push({id:"card-pack-v262",name:"Card Pack",qty:s.amount});}
      if(rewards.v262GiftReward){const g=grantCardPackReward(rewards.v262GiftReward);rewards.tradingCardResults.push(...g.cardResults);const packs=Math.max(0,Number(rewards.v262GiftReward.packs)||0);if(packs)rewards.items.push({id:"card-pack-v262",name:"Card Pack",qty:packs});}
      if(s){rewards.items.push({id:"stuffed-surprise-v262",name:"Stuffed Surprise!",qty:1});}
      persist();
    };
  }

  // Intercept Gift Box button, then rebind so no older closure wins.
  if(typeof openPendingChest==="function"){
    const oldOpenChestV262=openPendingChest;
    openPendingChest=async function(){if(pendingChest?.kind==="gift-box")return openGiftBox();return oldOpenChestV262();};
    setTimeout(()=>{const btn=document.getElementById("openChest");if(!btn)return;const fresh=btn.cloneNode(true);btn.replaceWith(fresh);ui.openChest=fresh;fresh.addEventListener("click",openPendingChest);},0);
  }

  window.DUCKIE_SPECIAL_ENCOUNTERS_V262=V;
})();
