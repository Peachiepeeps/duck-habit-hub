// Duckie Days v24.311 — card reward + Gift Box Mimic presentation fixes
(function(){
  "use strict";
  const VERSION="24.311";
  const GIFT_BASE="assets/events/gift-box/";
  const TC=window.DuckieTradingCards;

  function clearCardReward(){
    document.querySelector("#questCardRewardV311")?.remove();
  }
  function ensureStyle(){
    if(document.querySelector("#questCardRewardStyleV311"))return;
    const style=document.createElement("style");
    style.id="questCardRewardStyleV311";
    style.textContent=`
      .quest-card-reward-v311{position:absolute;z-index:85;right:4.5%;top:15%;width:43%;height:72%;display:flex;align-items:center;justify-content:center;gap:8px;pointer-events:none}
      .quest-card-reward-stack-v311{display:flex;align-items:center;justify-content:center;gap:7px;max-width:100%;max-height:100%}
      .quest-card-reward-item-v311{width:min(30vw,118px);max-width:118px;animation:questCardRewardPopV311 .28s ease both;filter:drop-shadow(0 5px 4px rgba(70,45,60,.18))}
      .quest-card-reward-item-v311>.tc-face{width:100%;margin:0}
      @keyframes questCardRewardPopV311{from{opacity:0;transform:translateY(8px) scale(.88)}to{opacity:1;transform:translateY(0) scale(1)}}
      @media(max-width:600px){.quest-card-reward-v311{right:3%;top:14%;width:46%;height:74%;gap:5px}.quest-card-reward-stack-v311{gap:4px}.quest-card-reward-item-v311{width:min(25vw,92px)}}
    `;
    document.head.append(style);
  }
  function showCardReward(results){
    if(!TC?.createFace||!Array.isArray(results)||!results.length)return;
    const battlefield=document.querySelector("#battlefield");
    if(!battlefield)return;
    clearCardReward();ensureStyle();
    const wrap=document.createElement("div");wrap.id="questCardRewardV311";wrap.className="quest-card-reward-v311";
    const stack=document.createElement("div");stack.className="quest-card-reward-stack-v311";
    results.slice(0,3).forEach(result=>{
      if(!result?.card)return;
      const holder=document.createElement("div");holder.className="quest-card-reward-item-v311";
      holder.append(TC.createFace(result.card,{locked:false}));stack.append(holder);
    });
    if(!stack.childElementCount)return;
    wrap.append(stack);battlefield.append(wrap);
  }

  if(typeof applyRewards==="function"){
    const oldApplyRewardsV311=applyRewards;
    applyRewards=function(rewards){
      const result=oldApplyRewardsV311.apply(this,arguments);
      try{
        if(!rewards?.v262GiftReward&&Array.isArray(rewards?.tradingCardResults)&&rewards.tradingCardResults.length){
          requestAnimationFrame(()=>showCardReward(rewards.tradingCardResults));
        }
      }catch(error){console.warn("v24.311 card reward display skipped:",error);}
      return result;
    };
  }

  if(typeof startEnemy==="function"){
    const oldStartEnemyV311=startEnemy;
    startEnemy=function(enemyId,options={}){
      clearCardReward();
      const result=oldStartEnemyV311.apply(this,arguments);
      try{
        if(String(enemyId)!=="gift-mimic"||!currentEnemy)return result;
        const style=String(options?.giftStyle||currentEnemy.giftStyle||"regular");
        currentEnemy.giftStyle=style;
        if(style==="lucky"){
          currentEnemy.name="Lucky Gift Box Mimic";
          currentEnemy.shiny=false;
          currentEnemy.idle=[GIFT_BASE+"lucky-idle-1.png",GIFT_BASE+"lucky-idle-2.png"];
          currentEnemy.hurt=GIFT_BASE+"lucky-closed.png";
        }else if(style==="shiny"){
          currentEnemy.name="Shiny Gift Box Mimic";
          currentEnemy.shiny=true;
          currentEnemy.idle=[GIFT_BASE+"mimic-shiny-idle-1.png",GIFT_BASE+"mimic-shiny-idle-2.png"];
          currentEnemy.hurt=GIFT_BASE+"shiny-closed.png";
        }else{
          currentEnemy.name="Gift Box Mimic";
          currentEnemy.shiny=false;
          currentEnemy.idle=[GIFT_BASE+"mimic-idle-1.png",GIFT_BASE+"mimic-idle-2.png"];
          currentEnemy.hurt=GIFT_BASE+"regular-closed.png";
        }
        try{renderEnemyCombatant(currentEnemy,currentEnemy._doubleSlot||0);}catch(error){}
        try{startEnemyIdle();}catch(error){}
        try{renderEnemyName(currentEnemy);}catch(error){}
      }catch(error){console.warn("v24.311 Gift Box Mimic style repair skipped:",error);}
      return result;
    };
  }

  if(typeof showChest==="function"){
    const oldShowChestV311=showChest;
    showChest=function(){
      clearCardReward();
      return oldShowChestV311.apply(this,arguments);
    };
  }
  document.querySelector("#continueButton")?.addEventListener("click",clearCardReward);
  document.querySelector("#leaveEndlessButton")?.addEventListener("click",clearCardReward);
  document.querySelector("#backToQuest")?.addEventListener("click",clearCardReward);

  window.DUCKIE_QUEST_FIXES_V311={version:VERSION,clearCardReward};
})();
