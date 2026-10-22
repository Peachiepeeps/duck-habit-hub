// Ducky Days v24.352 — Rare Sweetheart Battles: one automatic love-interest ally.
(()=>{
  'use strict';
  if(window.DuckieSweetheartBattlesV352)return;
  const TC=window.DuckieTradingCards;
  const chance=.012; // 1.2% per eligible non-boss encounter, after Miko has met a love interest.
  const bosses={meadow:'scarrie',ocean:'bottle-fairy',candy:'cream-fox',cloud:'cherub-duck',city:'stoplight-owl'};
  let currentSweetheart=null;
  const CSS=`
    #battlefield.sweetheart-battle-v352 #buddyCombatant{
      display:flex!important;left:33%!important;bottom:8%!important;z-index:5!important;
      transform:translateX(-50%)!important;pointer-events:none;
    }
    #battlefield.sweetheart-battle-v352 #buddyBattleSprite{
      height:min(30vh,125px)!important;width:auto!important;max-width:115px!important;
      object-fit:contain!important;image-rendering:pixelated!important;
    }
    #battlefield.sweetheart-battle-v352 #buddyBattleName{
      background:#fff1f7!important;color:#815070!important;border-radius:10px;
    }
    #battlefield.sweetheart-battle-v352 #battleHeroComposite,
    #battlefield.sweetheart-battle-v352 #peepSprite{position:relative;z-index:6!important;}
  `;
  const style=document.createElement('style');style.textContent=CSS;document.head.appendChild(style);
  function eligible(){
    if(activeCharacterId!=='miko'||!currentRun||currentRun.mode==='endless')return [];
    let data;
    try{data=JSON.parse(localStorage.getItem(HUB_SAVE_KEY)||'{}');}catch(_){return [];}
    return Object.entries(data.loveInterests||{}).filter(([id,state])=>state?.encountered&&TC?.byId?.['r-love-'+id]).map(([id])=>id);
  }
  function leave(){
    currentSweetheart=null;
    ui.battlefield?.classList.remove('sweetheart-battle-v352');
    ui.buddyCombatant?.classList.remove('sweetheart-ally-v352');
  }
  function renderPartner(){
    const active=currentSweetheart&&currentEnemy?.sweetheartV352?.id===currentSweetheart.id;
    if(!active||!ui.buddyCombatant||!ui.buddyBattleSprite)return;
    clearInterval(buddyIdleTimer);buddyIdleTimer=null;
    ui.buddyCombatant.classList.remove('hidden');
    ui.buddyCombatant.classList.add('sweetheart-ally-v352');
    ui.battlefield?.classList.add('sweetheart-battle-v352');
    ui.buddyBattleName.textContent=currentSweetheart.name+' ♡';
    ui.buddyBattleSprite.alt=currentSweetheart.name;
    ui.buddyBattleSprite.src=currentSweetheart.art;
    ui.buddyBattleSparkle?.classList.add('hidden');
  }
  const beforeStart=startEncounter;
  startEncounter=function(...args){
    document.querySelector('#eggFriendRevealV352')?.remove();
    leave();
    const encounter=currentRun?.mode==='endless'?currentRun?.endlessEncounter:currentRun?.plan?.[currentRun.index];
    if(currentRun?.mode!=='endless' && encounter && currentRun.index<3 &&
       (encounter.type==='enemy'||encounter.type==='double-enemy') && Math.random()<chance){
      const lovers=eligible();
      const boss=bosses[currentRun.area];
      if(lovers.length && ENEMIES[boss]){
        const id=lovers[Math.floor(Math.random()*lovers.length)];
        const card=TC.byId['r-love-'+id];
        currentSweetheart={id,name:card?.name||id,art:TC.cardArt(card)};
        currentRun.plan[currentRun.index]={type:'enemy',enemyId:boss,sweetheartV352:{id}};
      }
    }
    const result=beforeStart.apply(this,args);
    if(currentSweetheart&&currentEnemy){
      currentEnemy.sweetheartV352={id:currentSweetheart.id};
      const challengeLevel=Math.max(1,currentRun.rank)+Math.max(6,Math.round(currentRun.rank*.28));
      const scaled=enemyScaled(currentEnemy,challengeLevel,currentRun.area);
      currentEnemy.maxHp=Math.max(1,Math.round(scaled.maxHp*1.25));
      currentEnemy.hpNow=currentEnemy.maxHp;
      currentEnemy.attackNow=Math.max(1,Math.round(scaled.attackNow*1.12));
      currentEnemy.name='Sweetheart Challenge · '+currentEnemy.name;
      renderEnemyCombatant(currentEnemy);
      if(ui.enemyRank)ui.enemyRank.textContent=`BOSS · Level ${challengeLevel} ♡`;
      renderEnemyHp();
      renderPartner();
      setMessage(`${currentSweetheart.name} joins Miko! A much stronger boss approaches! ♡`);
      renderCommandButtons();
    }
    return result;
  };
  const beforeRenderBuddy=renderBattleBuddy;
  renderBattleBuddy=function(...args){const result=beforeRenderBuddy.apply(this,args);renderPartner();return result;};
  const beforeRenderCommands=renderCommandButtons;
  renderCommandButtons=function(...args){
    const result=beforeRenderCommands.apply(this,args);
    if(currentEnemy?.sweetheartV352){
      if(ui.buddyMenuButton)ui.buddyMenuButton.disabled=true;
      if(ui.switchBuddyMenuButton)ui.switchBuddyMenuButton.disabled=true;
      if(ui.buddyCommandText)ui.buddyCommandText.textContent='Sweetheart assists automatically ♡';
      if(ui.switchBuddyCommandText)ui.switchBuddyCommandText.textContent='Sweetheart Battle';
    }
    return result;
  };
  const beforeEnemyTurnSequence=enemyTurnSequence;
  enemyTurnSequence=async function(...args){
    if(currentSweetheart && currentEnemy?.sweetheartV352 && currentEnemy.hpNow>0 && currentRun?.hp>0){
      if(currentRun.hp<currentRun.maxHp*.55 && Math.random()<.30){
        const healed=Math.min(currentRun.maxHp-currentRun.hp,Math.max(1,Math.round(currentRun.maxHp*.14)));
        currentRun.hp+=healed;
        renderPeepHp();showFloat('+'+healed,'heal','peep');
        setMessage(`${currentSweetheart.name} used Tender Care! +${healed} HP ♡`);
      } else {
        const damage=Math.max(1,Math.round(peepStats().attack*(.78+Math.random()*.35)));
        currentEnemy.hpNow=Math.max(0,currentEnemy.hpNow-damage);
        renderEnemyHp();showFloat('-'+damage,'damage','enemy');
        setMessage(`${currentSweetheart.name} used Heart Burst! ${damage} damage! ♡`);
      }
      await sleep(470);
      if(currentEnemy?.hpNow<=0){await enemyDefeated();return;}
    }
    return beforeEnemyTurnSequence.apply(this,args);
  };
  const beforeGenerate=generateRewards;
  generateRewards=function(chest){
    const reward=beforeGenerate(chest);
    const id=chest?.enemy?.sweetheartV352?.id;
    if(id){
      reward.coins=(Number(reward.coins)||0)+Math.max(250,Math.round((Number(currentRun?.rank)||1)*4+200));
      if(!Array.isArray(reward.items))reward.items=[];
      const candy=reward.items.find(x=>x.id==='exp-candy-large');
      if(candy)candy.qty+=2;
      else reward.items.push({id:'exp-candy-large',name:'EXP Candy Large',image:'../assets/items/quest-boosts/Exp-candy-large.png',qty:2});
      reward.sweetheartCardV352='r-love-'+id;
    }
    return reward;
  };
  const beforeApply=applyRewards;
  applyRewards=function(rewards){
    const result=beforeApply.apply(this,arguments);
    if(rewards?.sweetheartCardV352 && TC?.byId?.[rewards.sweetheartCardV352]){
      const awarded=TC.grantCard(hubSave,rewards.sweetheartCardV352,1,{source:'sweetheart-battle'});
      persistAll();
      if(awarded) setMessage(`Sweetheart Victory! ${awarded.card.name} Trading Card, +2 Large EXP Candies and bonus coins! ♡`);
    }
    return result;
  };
  window.DuckieSweetheartBattlesV352={chance};
})();
