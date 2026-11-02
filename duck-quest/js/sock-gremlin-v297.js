// Duckie Days v24.297 — Sock Gremlin encounter + return-to-run judging
(function(){
  "use strict";
  const VERSION="24.298",KEY="sockGremlinChallengeV297",TC=window.DuckieTradingCards,NORMAL_VARIANTS=["base","blue","pink","black","gold"];
  let returnTimer=null;
  function pick(list){return list[Math.floor(Math.random()*list.length)];}
  function randInt(a,b){return Math.floor(a+Math.random()*(b-a+1));}
  function sprite(variant,frame=1,source="sock-gremlin"){return `assets/gimmicks/${source}/${variant}/idle-${frame}.png`;} 
  function challenge(){return hubSave?.[KEY];}
  function chooseVariant(source="sock-gremlin"){
    const variants=source==='bownny'?['base','blue','purple','yellow','mint']:NORMAL_VARIANTS;
    const shiny=Math.random()<currentShinyRate(),id=shiny?'shiny':pick(variants);
    const family=source==='bownny'?'Bownny':'Sock Gremlin';
    return {id,shiny,name:id==='base'?family:id==='shiny'?`Shiny ${family} ✨`:`${id[0].toUpperCase()+id.slice(1)} ${family}`};
  }
  function beginFashionChallenge(variant,source="sock-gremlin"){if(!currentRun)return;hubSave[KEY]={version:VERSION,status:"closet",createdAt:Date.now(),activeCharacterId,previousHubCharacter:hubSave.selectedCharacter||"peep",source,variant:variant.id,shiny:Boolean(variant.shiny),run:JSON.parse(JSON.stringify(currentRun))};persistAll();window.location.href="../?sock-gremlin=1";}
  function show(api){
    if(activeCharacterId!=="miko"){api.finish("Sock Gremlin peeks at the wardrobe, realizes Miko is not adventuring right now, and scampers away.");return;}
    const source=api.bownny?"bownny":"sock-gremlin";
    const variant=chooseVariant(source);api.animateScene([sprite(variant.id,1,source),sprite(variant.id,2,source)],390);ui.chestCaption.textContent=variant.name;setMessage(`${variant.name} leaps into the path and points dramatically toward Miko's closet!`);
    const m=api.menu(variant.shiny?"A SHINY Fashion Battle! ✨":"Fashion Battle!","${source==='bownny'?'Bownny':'Sock Gremlin'} demands that Miko prove his fashion sense. You'll get a surprise style prompt in the Closet!");api.button(m,"Accept Challenge!",()=>beginFashionChallenge(variant,source),"primary");api.button(m,"Not this time",()=>api.finish(`${variant.name} waves and hops away.`));
  }
  function stopReturnIdle(){if(returnTimer){clearInterval(returnTimer);returnTimer=null;}}
  function startReturnIdle(variant,source="sock-gremlin"){stopReturnIdle();let frame=1;[1,2].forEach(n=>warmQuestImage(sprite(variant,n)));setQuestSpriteFrame(ui.chestSprite,sprite(variant,1,source));returnTimer=setInterval(()=>{frame=frame===1?2:1;if(ui.chestSprite)setQuestSpriteFrame(ui.chestSprite,sprite(variant,frame,source));},390);}
  function addInventory(id,qty=1){if(!hubSave.inventory||typeof hubSave.inventory!=="object")hubSave.inventory={};hubSave.inventory[id]=Math.max(0,Number(hubSave.inventory[id])||0)+Math.max(1,Math.floor(Number(qty)||1));const existing=currentRun?.itemsEarned?.find(item=>item.id===id);if(existing)existing.qty+=qty;else if(currentRun?.itemsEarned)currentRun.itemsEarned.push({id,qty});}
  function grantReward(c){
    if(c.rewardGranted&&c.reward)return c.reward;const score=Math.max(1,Math.min(3,Math.floor(Number(c.score)||1)));let coins=score===1?randInt(30,50):score===2?randInt(70,100):randInt(130,170);if(c.shiny)coins=Math.round(coins*1.5);hubSave.coins=Math.max(0,Number(hubSave.coins)||0)+coins;if(currentRun)currentRun.coinsEarned=Math.max(0,Number(currentRun.coinsEarned)||0)+coins;
    const bonus=[];if(score===2&&Math.random()<.35){addInventory("exp-candy-small",1);bonus.push("EXP Candy Small ×1");}if(score===3){if(Math.random()<.20){addInventory("exp-candy-large",1);bonus.push("EXP Candy Large ×1");}else{addInventory("exp-candy-small",1);bonus.push("EXP Candy Small ×1");}}
    const clothingDrops=window.DuckieUniversalClothingDropsV311;
    const clothingBaseChance=score===1?.10:score===2?.22:.40;
    if(clothingDrops?.ids?.length && Math.random()<Math.min(.80,clothingBaseChance+(c.shiny?.15:0))){
      const clothingId=pick(clothingDrops.ids);
      addInventory(clothingId,1);
      bonus.push(`${clothingDrops.names?.[clothingId]||"Universal Clothing"} ×1`);
    }
    let cardResult=null;const baseChance=score===1?.04:score===2?.12:.30,cardChance=Math.min(.75,baseChance+(c.shiny?.20:0));const cardId=c.source==='bownny'?'r-bownny':'r-sock-gremlin';
    if(TC?.byId?.[cardId]&&Math.random()<cardChance){cardResult=TC.grantCard(hubSave,cardId,1);if(cardResult)bonus.push(`${cardResult.isNew?"NEW ":""}${c.source==='bownny'?'Bownny':'Sock Gremlin'} Trading Card`);}
    if(currentRun?.mode==="endless"&&!c.endlessMarked){markEndlessFloorComplete();c.endlessMarked=true;}c.reward={coins,bonus,cardNew:Boolean(cardResult?.isNew)};c.rewardGranted=true;c.run=JSON.parse(JSON.stringify(currentRun));hubSave[KEY]=c;persistAll();return c.reward;
  }
  function catchEnemy(c){
    const v=c.variant||'base',source=c.source==='bownny'?'bownny':'sock-gremlin';
    const family=source==='bownny'?'Bownny':'Sock Gremlin';
    return {id:source,name:v==='base'?family:v==='shiny'?`Shiny ${family} ✨`:`${v[0].toUpperCase()+v.slice(1)} ${family}`,
      idle:[sprite(v,1,source),sprite(v,2,source)],hurt:`assets/gimmicks/${source}/${v}/hurt.png`,shiny:Boolean(c.shiny),boss:false,gimmickVariant:v,maxHp:1,hpNow:1};
  }
  function clearJudgeUi(){stopReturnIdle();ui.chestLayer?.classList.add("hidden");ui.chestLayer?.classList.remove("sock-gremlin-return-v297");ui.chestSprite?.classList.remove("sock-gremlin-art-v297");ui.battlefield?.classList.remove("sock-gremlin-scene-v297");ui.battleUi?.classList.remove("sock-gremlin-ui-v297");if(ui.eventChoiceActions){ui.eventChoiceActions.innerHTML="";ui.eventChoiceActions.classList.add("hidden");ui.eventChoiceActions.classList.remove("sock-gremlin-judge-panel-v297");}}
  function showJudge(c){
    try{clearAnimations();}catch(error){}ui.enemyCombatant?.classList.add("hidden");ui.enemyCombatant2?.classList.add("hidden");ui.buddyCombatant?.classList.add("hidden");ui.commandGrid?.classList.add("hidden");ui.postFloorActions?.classList.add("hidden");ui.leaveEndlessButton?.classList.add("hidden");try{closeCommandWindow();setPostFloorLayout(false);}catch(error){}
    if(currentRun?.mode==="endless"){currentRun.rank=endlessEffectiveRank(currentRun.floor);ui.battleBg.src=currentRun.floorBackground||chooseEndlessBackground();}else if(currentRun){const cfg=currentAreaConfig();ui.battleBg.src=cfg.backgrounds[currentRun.index];}
    const encounter=currentRun?.mode==="endless"?currentRun.endlessEncounter:currentRun?.plan?.[currentRun?.index||0];updateEncounterHeader(encounter);if(ui.peepLevelCombat)ui.peepLevelCombat.textContent=`Lv. ${activeHeroProgress().level}`;try{renderPeepHp();startPeepIdle();}catch(error){}
    ui.battlefield?.classList.add("sock-gremlin-scene-v297");ui.battleUi?.classList.add("sock-gremlin-ui-v297");ui.chestLayer?.classList.remove("hidden");ui.chestLayer?.classList.add("sock-gremlin-return-v297");ui.chestSprite?.classList.add("sock-gremlin-art-v297");ui.openChest?.classList.add("hidden");startReturnIdle(c.variant||"base",c.source||"sock-gremlin");
    const score=Math.max(1,Math.min(3,Math.floor(Number(c.score)||1))),rating=score===3?"PERFECT!":score===2?"Stylish!":"Cute Try!",hearts=`${"♥".repeat(score)}${"♡".repeat(3-score)}`,reward=grantReward(c);setMessage(`${c.source==='bownny'?'Bownny':'Sock Gremlin'} judges Miko's outfit… ${rating} ${hearts}`);
    const holder=ui.eventChoiceActions;holder.innerHTML="";holder.classList.remove("hidden");holder.classList.add("sock-gremlin-judge-panel-v297");const box=document.createElement("div");box.className="sock-gremlin-judge-v297";const title=document.createElement("strong");title.textContent=`${rating} ${hearts}`;const checks=document.createElement("div");checks.className="sock-gremlin-checks-v297";(c.criteria||[]).forEach(item=>{const row=document.createElement("span");row.className=item.matched?"matched":"missed";row.textContent=`${item.matched?"✓":"○"} ${item.label}`;checks.append(row);});const rewardLine=document.createElement("p");rewardLine.textContent=`Reward: ${reward.coins} Pink Coins${reward.bonus?.length?` · ${reward.bonus.join(" · ")}`:""}`;const note=document.createElement("small");note.textContent=score===3?"Sock Gremlin is VERY impressed!":score===2?"Sock Gremlin gives an approving little nod.":"Sock Gremlin thinks Miko has potential!";box.append(title,checks,rewardLine,note);holder.append(box);const done=()=>{clearJudgeUi();delete hubSave[KEY];persistAll();actionLocked=false;nextEncounter();};window.DuckieSpecialCatchV298?.offer?.({container:box,enemy:catchEnemy(c),onComplete:done});actionLocked=true;
  }
  function restoreReturn(){const params=new URLSearchParams(window.location.search),c=challenge();if(params.get("sock-gremlin-return")!=="1"||!c||c.status!=="judging"||!c.run)return;currentRun=JSON.parse(JSON.stringify(c.run));activeCharacterId=c.activeCharacterId||"miko";questSave.activeCharacter=activeCharacterId;if(currentRun?.area&&AREA_CONFIG[currentRun.area])selectedArea=currentRun.area;if(currentRun?.rank)selectedRank=currentRun.rank;showScreen("battle");showJudge(c);}
  window.DuckieSockGremlinV297={version:VERSION,show};window.DUCKIE_SOCK_GREMLIN_V297=VERSION;setTimeout(restoreReturn,0);
})();
