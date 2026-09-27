// Duckie Days v24.289 — encounter cleanup + Wonder Charm support
(function(){
  "use strict";
  const VERSION="24.289";
  const FRESH_EVENT_BATTLE_IDS=new Set(["mimic","gift-mimic","rotten-egg","lucky-cat","angy-duck"]);

  function activeWonderDefV289(){
    try{
      return typeof activeCharmByFamily==="function" ? activeCharmByFamily("wonder") : null;
    }catch(error){
      return null;
    }
  }

  function activeWonderRateV289(){
    const def=activeWonderDefV289();
    return Math.max(.04,Math.min(.10,Number(def?.eventRate)||.04));
  }

  function resetFreshBattleStateV289(){
    actionLocked=false;
    pendingDefeatedEnemy=null;
    befriendAttempted=false;
    ui.befriendPanel?.classList.add("hidden");
    ui.ponPurchasePanel?.classList.add("hidden");
    quickHealUses=0;
    skillState={
      cooldowns:{}, onceUsed:{}, attackBuffTurns:0, attackBuffMultiplier:1.30, activeBuffSkillId:null,
      heartRayCount:0, ioRainbowUses:0, buddyCooldown:0,
      buddyAttackBuffTurns:0, buddyAttackMultiplier:1.15,
      heroGuardTurns:0, heroGuardMultiplier:1,
      heroNextDamageMultiplier:1,
      enemyAttackDownTurns:0, enemyAttackMultiplier:1,
      enemyDefenseDownTurns:0, enemyDefenseMultiplier:1,
      enemyAccuracyDownTurns:0, enemyMissChance:0,
      enemyBurnTurns:0, enemyBurnDamagePercent:0,
      heroMissTurns:0, heroMissChance:0,
      heroNextAttackMultiplier:1, heroAttackDownTurns:0, heroAttackDownMultiplier:1,
      heroStunTurns:0, heroSleepTurns:0, heroParalysisMoves:0, heroParalysisFailChance:0,
      enemyNextAttackMultiplier:1, enemyStunned:false, enemyStunTurns:0
    };
    specialHeroAttackScale=1;
    if(currentRun) currentRun.luckyFluffUsedThisEncounter=false;
    buddyUsedThisHeroTurn=false;
    activeBattleBuddySlot=firstAssignedBattleBuddySlot();
    buddySwitchUsedThisEncounter=false;
    try{renderBattleCharmStrip();}catch(error){}
    try{resetDoubleBattleUi();}catch(error){}
    try{hideEventChoices();}catch(error){}
    ui.enemyCombatant2?.classList.add("hidden");
    ui.postFloorActions?.classList.add("hidden");
    ui.leaveEndlessButton?.classList.add("hidden");
    try{setPostFloorLayout(false);}catch(error){}
    ui.commandGrid?.classList.remove("hidden");
    try{closeCommandWindow();}catch(error){}
    ui.enemyCombatant?.classList.remove("hidden");
    ui.buddyCombatant?.classList.add("hidden");
  }

  function clearGiftBoxVisualStateV289({hideLayer=false,clearPending=false}={}){
    try{document.querySelector("#giftRewardVisualV264")?.remove();}catch(error){}
    try{ui.chestLayer?.querySelector("#giftBoxMenuV262")?.remove();}catch(error){}
    ui.chestLayer?.classList.remove(
      "gift-box-active-v262",
      "merchant-active-v197",
      "luv-birdie-active-v262"
    );
    ui.chestSprite?.classList.remove(
      "gift-box-art-v262",
      "gift-reward-hidden-v264",
      "event-scene-art",
      "merchant-duck",
      "luv-birdie-art-v262",
      "opening"
    );
    if(ui.openChest){
      ui.openChest.classList.add("hidden");
      ui.openChest.disabled=false;
      ui.openChest.textContent="Open";
    }
    if(hideLayer) ui.chestLayer?.classList.add("hidden");
    if(clearPending) pendingChest=null;
  }

  // Any chest/event that suddenly becomes a battle is a NEW battle.
  // This fixes cooldowns/once-per-battle state carrying into Mimics and
  // the new Rotten Egg / Lucky Cat / Angy Duck battles.
  if(typeof startEnemy==="function"){
    const previousStartEnemyV289=startEnemy;
    startEnemy=function(enemyId,options={}){
      const fresh=FRESH_EVENT_BATTLE_IDS.has(String(enemyId||""));
      if(fresh){
        resetFreshBattleStateV289();
        // The reward payload for Gift Mimic already lives in `options`,
        // so the old Gift Box pending chest can be safely discarded.
        if(enemyId==="gift-mimic"){
          clearGiftBoxVisualStateV289({hideLayer:true,clearPending:true});
          const encounter=typeof currentEncounterData==="function"?currentEncounterData():null;
          if(encounter?.type==="gift-box"){
            encounter.type="enemy";
            encounter.enemyId="gift-mimic";
          }
        }else{
          pendingChest=null;
          ui.chestLayer?.classList.add("hidden");
        }
      }

      const result=previousStartEnemyV289.apply(this,arguments);

      if(enemyId==="gift-mimic"){
        const encounter=typeof currentEncounterData==="function"?currentEncounterData():null;
        try{updateEncounterHeader(encounter);}catch(error){}
      }
      return result;
    };
  }

  // Defensive cleanup before ANY normal reward chest is rendered.
  // This prevents the Gift Box's display:grid!important class from
  // taking over the post-capture/post-defeat reward layout.
  if(typeof showChest==="function"){
    const previousShowChestV289=showChest;
    showChest=function(data){
      if(data?.kind!=="gift-box") clearGiftBoxVisualStateV289({hideLayer:false,clearPending:false});
      return previousShowChestV289.apply(this,arguments);
    };
  }

  // Wonder Charm gently raises ordinary "something unusual happened" rolls.
  // Gimmick encounters themselves use the exact 5/6/8/10% target in v24.289.
  // This small additional roll only applies after an ordinary enemy result,
  // so Gift Boxes / Picnics / Fountain / Merchant remain special rather than constant.
  if(typeof buildEncounterFromPool==="function"){
    const previousBuildEncounterV289=buildEncounterFromPool;
    buildEncounterFromPool=function(enemyPool,mode="stage"){
      const result=previousBuildEncounterV289.apply(this,arguments);
      const wonder=activeWonderDefV289();
      if(!wonder || result?.type!=="enemy") return result;

      const bonus=Math.max(0,activeWonderRateV289()-.04);
      if(bonus<=0 || Math.random()>=bonus) return result;

      // Roughly one-third Gift Box, two-thirds existing special-event pool.
      if(Math.random()<1/3) return {type:"gift-box"};
      try{return {type:pickSituationType(mode)};}catch(error){return result;}
    };
  }

  window.DUCKIE_ENCOUNTER_FIXES_V289={
    version:VERSION,
    wonderRate:activeWonderRateV289,
    clearGiftBoxUi:clearGiftBoxVisualStateV289
  };
})();
