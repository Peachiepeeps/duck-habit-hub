// Duckie Days v24.298 — Porcupin cozy bonus drops
(function(){
  "use strict";
  const VERSION="24.298",TC=window.DuckieTradingCards;
  const TASK_PLUSHES=["task-plush-1","task-plush-2","task-plush-3","task-plush-4","task-plush-5"];
  function addCoins(amount){const n=Math.max(1,Math.floor(Number(amount)||1));hubSave.coins=Math.max(0,Number(hubSave.coins)||0)+n;if(currentRun)currentRun.coinsEarned=Math.max(0,Number(currentRun.coinsEarned)||0)+n;return n;}
  function addInventory(id,qty=1){if(!hubSave.inventory||typeof hubSave.inventory!=="object")hubSave.inventory={};hubSave.inventory[id]=Math.max(0,Number(hubSave.inventory[id])||0)+qty;if(currentRun?.itemsEarned){const e=currentRun.itemsEarned.find(x=>x.id===id);if(e)e.qty+=qty;else currentRun.itemsEarned.push({id,qty});}}
  function addDuck(id){if(!Array.isArray(hubSave.unlockedDucks))hubSave.unlockedDucks=[];const had=hubSave.unlockedDucks.includes(id);if(!had)hubSave.unlockedDucks.push(id);if(!hubSave.duckCollectionCounts||typeof hubSave.duckCollectionCounts!=="object")hubSave.duckCollectionCounts={};const before=Math.max(had?1:0,Math.floor(Number(hubSave.duckCollectionCounts[id])||0));hubSave.duckCollectionCounts[id]=before+1;}
  function addTaskPlush(id){if(!hubSave.taskProgression||typeof hubSave.taskProgression!=="object")hubSave.taskProgression={};const p=hubSave.taskProgression;if(!Array.isArray(p.collectiblesOwned))p.collectiblesOwned=[];if(p.collectiblesOwned.includes(id)){const coins=addCoins(35);return `a duplicate Task Shop plush, converted into ${coins} Pink Coins`;}p.collectiblesOwned.push(id);return `a Task Shop plush (${id.replace("task-plush-", "#")})`;}
  function rollDrop(){
    const r=Math.random();
    if(r<.84){const n=addCoins(12+Math.floor(Math.random()*24));return `${n} bonus Pink Coins`;}
    if(r<.89){addInventory("warm-blanket",1);return "a Warm Blanket";}
    if(r<.92){addDuck("plush-duck");return "a Plush Duck";}
    if(r<.94){addDuck("knitted-duck");return "a Knitted Duck";}
    if(r<.98){const got=TC?.grantCard?.(hubSave,"r-porcupin",1);return `${got?.isNew?"a NEW ":"a "}Porcupin Trading Card`;}
    return addTaskPlush(TASK_PLUSHES[Math.floor(Math.random()*TASK_PLUSHES.length)]);
  }
  if(typeof enemyDefeated==="function"){
    const old=enemyDefeated;
    enemyDefeated=async function(options={}){
      const defeated=currentEnemy;
      const result=await old.apply(this,arguments);
      if(defeated?.id==="porcupin"&&!defeated._cozyDropV298){
        defeated._cozyDropV298=true;
        const reward=rollDrop();persistAll();
        setMessage(`Porcupin left behind ${reward}! ♡`);
        if(ui.chestCaption&&!ui.chestLayer?.classList.contains("hidden"))ui.chestCaption.textContent="Porcupin's Cozy Drop!";
      }
      return result;
    };
  }
  window.DUCKIE_PORCUPIN_V298=VERSION;
})();
