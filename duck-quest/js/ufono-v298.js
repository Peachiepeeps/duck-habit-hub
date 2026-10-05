// Duckie Days v24.298 — UFONO minigame challenge + return/reward/catch
(function(){
  "use strict";
  const VERSION="24.298",KEY="ufonoChallengeV298",TC=window.DuckieTradingCards;
  const NORMAL=["base","blue","pink","gray","gold"];
  const NAMES={base:"UFONO",blue:"Blue UFONO",pink:"Pink UFONO",gray:"Gray UFONO",gold:"Gold UFONO",shiny:"Shiny UFONO ✨"};
  const GAMES=[
    {id:"memory",name:"Memory Match",url:"../memory-game/?ufono=1&v=24-298"},
    {id:"sort",name:"Duck Sort",url:"../sort-game/?ufono=1&v=24-298"},
    {id:"crane",name:"Duck Crane",url:"../crane-game/play-v24-40.html?ufono=1&v=24-298"}
  ];
  let timer=null;
  const pick=a=>a[Math.floor(Math.random()*a.length)];
  function sprite(v,f=1){return `assets/gimmicks/ufono/${v}/idle-${f}.png`;}
  function chooseVariant(){const shiny=Math.random()<currentShinyRate(),id=shiny?"shiny":pick(NORMAL);return{id,shiny,name:NAMES[id]};}
  function challenge(){return hubSave?.[KEY];}
  function begin(variant){
    if(!currentRun)return;const game=pick(GAMES);
    hubSave[KEY]={version:VERSION,status:"minigame",createdAt:Date.now(),activeCharacterId,variant:variant.id,shiny:Boolean(variant.shiny),game:game.id,gameName:game.name,run:JSON.parse(JSON.stringify(currentRun))};
    persistAll();window.location.href=game.url;
  }
  function show(api){
    const variant=chooseVariant();api.animateScene([sprite(variant.id,1),sprite(variant.id,2)],410);ui.chestCaption.textContent=variant.name;
    setMessage(`${variant.name} zips into the path and shines a tractor beam at you!`);
    const m=api.menu(variant.shiny?"A SHINY UFONO appeared! ✨":"UFONO Challenge!","UFONO wants to test you in a random Hub minigame. Clear one round and it will beam you safely back to this Duck Quest run!");
    api.button(m,"Accept Challenge!",()=>begin(variant),"primary");api.button(m,"No thanks",()=>api.finish("UFONO wiggles its antenna and zooms away."));
  }
  function addInventory(id,qty=1){if(!hubSave.inventory||typeof hubSave.inventory!=="object")hubSave.inventory={};hubSave.inventory[id]=Math.max(0,Number(hubSave.inventory[id])||0)+qty;if(currentRun?.itemsEarned){const e=currentRun.itemsEarned.find(x=>x.id===id);if(e)e.qty+=qty;else currentRun.itemsEarned.push({id,qty});}}
  function addDuck(id){if(!Array.isArray(hubSave.unlockedDucks))hubSave.unlockedDucks=[];const had=hubSave.unlockedDucks.includes(id);if(!had)hubSave.unlockedDucks.push(id);if(!hubSave.duckCollectionCounts||typeof hubSave.duckCollectionCounts!=="object")hubSave.duckCollectionCounts={};const before=Math.max(had?1:0,Math.floor(Number(hubSave.duckCollectionCounts[id])||0));hubSave.duckCollectionCounts[id]=before+1;}
  function addCoins(n){n=Math.max(1,Math.floor(n));hubSave.coins=Math.max(0,Number(hubSave.coins)||0)+n;if(currentRun)currentRun.coinsEarned=Math.max(0,Number(currentRun.coinsEarned)||0)+n;return n;}
  function grantReward(c){
    if(c.rewardGranted&&c.reward)return c.reward;
    const r=Math.random(),sh=Boolean(c.shiny);let label="",kind="";
    const cuts=sh?[.34,.52,.68,.80,.91]:[.50,.70,.80,.88,.94];
    if(r<cuts[0]){const n=addCoins(sh?70+Math.floor(Math.random()*61):40+Math.floor(Math.random()*51));label=`${n} Pink Coins`;kind="coins";}
    else if(r<cuts[1]){addInventory("exp-candy-small",1);label="EXP Candy Small ×1";kind="small";}
    else if(r<cuts[2]){addInventory("exp-candy-large",1);label="EXP Candy Large ×1";kind="large";}
    else if(r<cuts[3]){addDuck("alien-duck");label="Alien Duck ×1";kind="alien";}
    else if(r<cuts[4]){addDuck("cosmic-duck");label="Cosmic Duck ×1";kind="cosmic";}
    else{const got=TC?.grantCard?.(hubSave,"r-ufono",1);label=`${got?.isNew?"NEW ":""}UFONO Trading Card`;kind="card";}
    c.reward={label,kind};c.rewardGranted=true;c.run=JSON.parse(JSON.stringify(currentRun));hubSave[KEY]=c;persistAll();return c.reward;
  }
  function stopIdle(){if(timer){clearInterval(timer);timer=null;}}
  function startIdle(v){stopIdle();let f=1;ui.chestSprite.src=sprite(v,1);timer=setInterval(()=>{f=f===1?2:1;if(ui.chestSprite)ui.chestSprite.src=sprite(v,f);},410);}
  function clear(){stopIdle();ui.chestLayer?.classList.add("hidden");ui.chestLayer?.classList.remove("ufono-return-v298");ui.chestSprite?.classList.remove("ufono-art-v298");ui.battlefield?.classList.remove("ufono-scene-v298");if(ui.eventChoiceActions){ui.eventChoiceActions.innerHTML="";ui.eventChoiceActions.classList.add("hidden");}}
  function catchEnemy(c){const v=c.variant||"base";return{id:"ufono",name:NAMES[v]||"UFONO",idle:[sprite(v,1),sprite(v,2)],hurt:`assets/gimmicks/ufono/${v}/hurt.png`,shiny:Boolean(c.shiny),boss:false,gimmickVariant:v,maxHp:1,hpNow:1};}
  function showReturn(c){
    try{clearAnimations();}catch(error){}ui.enemyCombatant?.classList.add("hidden");ui.enemyCombatant2?.classList.add("hidden");ui.buddyCombatant?.classList.add("hidden");ui.commandGrid?.classList.add("hidden");ui.postFloorActions?.classList.add("hidden");ui.leaveEndlessButton?.classList.add("hidden");try{closeCommandWindow();setPostFloorLayout(false);}catch(error){}
    if(currentRun?.mode==="endless"){currentRun.rank=endlessEffectiveRank(currentRun.floor);ui.battleBg.src=currentRun.floorBackground||chooseEndlessBackground();}else if(currentRun){const cfg=currentAreaConfig();ui.battleBg.src=cfg.backgrounds[currentRun.index];}
    const encounter=currentRun?.mode==="endless"?currentRun.endlessEncounter:currentRun?.plan?.[currentRun?.index||0];updateEncounterHeader(encounter);try{renderPeepHp();startPeepIdle();}catch(error){}
    ui.battlefield?.classList.add("ufono-scene-v298");ui.chestLayer?.classList.remove("hidden");ui.chestLayer?.classList.add("ufono-return-v298");ui.chestSprite?.classList.add("ufono-art-v298");ui.openChest?.classList.add("hidden");startIdle(c.variant||"base");
    const reward=grantReward(c);setMessage(`UFONO beams you back safely! ${c.gameName||"Minigame"} cleared!`);
    const holder=ui.eventChoiceActions;holder.innerHTML="";holder.classList.remove("hidden");const box=document.createElement("div");box.className="ufono-result-v298";
    const title=document.createElement("strong");title.textContent=`Challenge Clear! ${c.shiny?"✨":""}`;const game=document.createElement("small");game.textContent=`${c.gameName||"Minigame"} complete · Your Duck Quest run is safe.`;const rewardLine=document.createElement("p");rewardLine.textContent=`UFONO reward: ${reward.label}`;box.append(title,game,rewardLine);holder.append(box);
    const done=()=>{clear();delete hubSave[KEY];persistAll();actionLocked=false;nextEncounter();};
    window.DuckieSpecialCatchV298?.offer?.({container:box,enemy:catchEnemy(c),onComplete:done});actionLocked=true;
  }
  function restore(){const params=new URLSearchParams(location.search),c=challenge();if(params.get("ufono-return")!=="1"||!c||c.status!=="return"||!c.run)return;currentRun=JSON.parse(JSON.stringify(c.run));activeCharacterId=c.activeCharacterId||activeCharacterId;questSave.activeCharacter=activeCharacterId;if(currentRun?.area&&AREA_CONFIG[currentRun.area])selectedArea=currentRun.area;if(currentRun?.rank)selectedRank=currentRun.rank;showScreen("battle");showReturn(c);}
  window.DuckieUFONOV298={version:VERSION,show};window.DUCKIE_UFONO_V298=VERSION;setTimeout(restore,0);
})();
