(function(){
  "use strict";
  const TC=window.DuckieTradingCards;if(!TC)return;
  const originalGenerate=generateRewards;
  generateRewards=function(chest){
    const rewards=originalGenerate(chest);rewards.tradingCardDrops=[];rewards.tradingCardVariantsV351=[];
    const foes=Array.isArray(chest?.enemies)&&chest.enemies.length?chest.enemies:(chest?.enemy?[chest.enemy]:[]);
    const cardState=TC.ensureState(hubSave),owned=cardState.owned;
    foes.forEach(enemy=>{
      const id=TC.cardIdForEnemy(enemy);if(!id||!TC.byId[id])return;
      const firstShinyQuestDrop=Boolean(enemy.shiny&&!cardState.stats.shinyQuestDrops[id]);
      const chance=enemy.shiny ? (firstShinyQuestDrop?1:.20) : ((Boolean(enemy.boss)||TC.byId[id].rarity==="uncommon") ? .18 : .06);
      if(Math.random()<chance){
        rewards.tradingCardDrops.push(id);
        const form=enemy.shiny?'default':(typeof enemyVariantId==='function'?enemyVariantId(enemy):'base');
        rewards.tradingCardVariantsV351.push(String(form||'base'));
      }
    });
    return rewards;
  };
  const originalApply=applyRewards;
  applyRewards=function(rewards){
    const cardState=TC.ensureState(hubSave);
    rewards.tradingCardResults=(rewards.tradingCardDrops||[]).map((id,index)=>{
      const variantId=rewards.tradingCardVariantsV351?.[index]||'default';
      const result=TC.grantCard(hubSave,id,1,{variantId,source:'quest-battle'});
      if(id.startsWith("r-"))cardState.stats.shinyQuestDrops[id]=true;
      return result;
    }).filter(Boolean);
    originalApply(rewards);
  };
  window.DUCKIE_TRADING_CARD_DROPS_BUILD="24.351-variant-match";
})();
