// Duckie Days v24.318 — stale card cleanup + OC Attack Mastery
(function(){
  "use strict";
  const VERSION="24.318";
  const MASTERY_KEY="attackMasteryV318";
  const MAX_ATTACK_RANK=25;
  const BONUS_PER_RANK=.04;
  const ELIGIBLE_TYPES=new Set(["damage","damage-burn","multi-hit"]);

  // ---------------------------------------------------------
  // Trading-card reward cleanup
  // ---------------------------------------------------------
  function clearQuestCardRewardV318(){
    document.querySelector("#questCardRewardV311")?.remove();
  }

  if(typeof startEncounter==="function"){
    const previousStartEncounterV318=startEncounter;
    startEncounter=function(){
      clearQuestCardRewardV318();
      return previousStartEncounterV318.apply(this,arguments);
    };
  }

  if(typeof showChest==="function"){
    const previousShowChestV318=showChest;
    showChest=function(){
      clearQuestCardRewardV318();
      return previousShowChestV318.apply(this,arguments);
    };
  }

  if(typeof showEventChoices==="function"){
    const previousShowEventChoicesV318=showEventChoices;
    showEventChoices=function(){
      clearQuestCardRewardV318();
      return previousShowEventChoicesV318.apply(this,arguments);
    };
  }

  ["#continueButton","#leaveEndlessButton","#backToQuest","#runNextRank","#runAgain"].forEach(selector=>{
    document.querySelector(selector)?.addEventListener("click",clearQuestCardRewardV318,true);
  });

  // ---------------------------------------------------------
  // Attack Mastery
  // ---------------------------------------------------------
  if(typeof activeSkills!=="function" || typeof activeHeroProgress!=="function"){
    window.DUCKIE_QUEST_FIXES_V318={version:VERSION,clearQuestCardRewardV318};
    return;
  }

  const rawActiveSkillsV318=activeSkills;
  const rawSkillDisplayDescriptionV318=typeof skillDisplayDescription==="function"?skillDisplayDescription:null;

  function masteryState(hero=activeHeroProgress()){
    if(!hero[MASTERY_KEY] || typeof hero[MASTERY_KEY]!=="object" || Array.isArray(hero[MASTERY_KEY])) hero[MASTERY_KEY]={};
    return hero[MASTERY_KEY];
  }

  function attackRank(skillId,hero=activeHeroProgress()){
    return Math.max(0,Math.min(MAX_ATTACK_RANK,Math.floor(Number(masteryState(hero)[skillId])||0)));
  }

  function attackPointsEarned(hero=activeHeroProgress()){
    return Math.max(0,Math.floor(Math.max(1,Number(hero.level)||1)/10));
  }

  function attackPointsSpent(hero=activeHeroProgress()){
    return Object.values(masteryState(hero)).reduce((sum,value)=>sum+Math.max(0,Math.min(MAX_ATTACK_RANK,Math.floor(Number(value)||0))),0);
  }

  function attackPointsAvailable(hero=activeHeroProgress()){
    return Math.max(0,attackPointsEarned(hero)-attackPointsSpent(hero));
  }

  function isMasteryAttack(skill){
    return Boolean(skill && ELIGIBLE_TYPES.has(skill.type) && Number(skill.multiplier)>0);
  }

  function masteredSkill(skill){
    if(!isMasteryAttack(skill)) return skill;
    const rank=attackRank(skill.id);
    if(rank<=0) return {...skill,masteryRank:0,masteryBonus:0};
    const factor=1+rank*BONUS_PER_RANK;
    const next={...skill,masteryRank:rank,masteryBonus:rank*BONUS_PER_RANK};
    if(Number(skill.multiplier)>0) next.multiplier=Number(skill.multiplier)*factor;
    if(Number(skill.boostedMultiplier)>0) next.boostedMultiplier=Number(skill.boostedMultiplier)*factor;
    return next;
  }

  activeSkills=function(){
    return rawActiveSkillsV318.apply(this,arguments).map(masteredSkill);
  };

  if(rawSkillDisplayDescriptionV318){
    skillDisplayDescription=function(skill){
      const base=rawSkillDisplayDescriptionV318.apply(this,arguments);
      if(!isMasteryAttack(skill)) return base;
      const rank=Number(skill.masteryRank??attackRank(skill.id))||0;
      if(rank<=0) return `${base} · Attack Rank 0/${MAX_ATTACK_RANK}`;
      return `${base} · Attack Rank ${rank}/${MAX_ATTACK_RANK} (+${Math.round(rank*BONUS_PER_RANK*100)}% damage)`;
    };
  }

  function ensureMasteryPanel(){
    const modal=document.querySelector("#skillBookModal .skill-book-modal-card");
    if(!modal) return null;
    let section=document.querySelector("#attackMasteryV318");
    if(section) return section;
    section=document.createElement("section");
    section.id="attackMasteryV318";
    section.className="attack-mastery-v318";
    section.innerHTML=`
      <div class="attack-mastery-heading-v318">
        <div><span class="mini-label">ATTACK MASTERY</span><strong>Level Up Attacks</strong></div>
        <strong class="attack-point-pill-v318" id="attackPointCountV318">0 Points</strong>
      </div>
      <p class="attack-mastery-note-v318">Earn 1 Attack Point every 10 OC levels. Spend them on learned damaging moves. Each rank adds 4% damage.</p>
      <div id="attackMasteryListV318" class="attack-mastery-list-v318"></div>`;
    modal.append(section);
    return section;
  }

  function renderAttackMasteryV318(){
    const section=ensureMasteryPanel();
    if(!section) return;
    const hero=activeHeroProgress();
    const points=attackPointsAvailable(hero);
    const pointLabel=section.querySelector("#attackPointCountV318");
    if(pointLabel) pointLabel.textContent=`${points} Point${points===1?"":"s"}`;
    const list=section.querySelector("#attackMasteryListV318");
    if(!list) return;
    list.innerHTML="";

    rawActiveSkillsV318().filter(isMasteryAttack).forEach(skill=>{
      const rank=attackRank(skill.id,hero);
      const unlocked=Math.max(1,Number(hero.level)||1)>=Math.max(1,Number(skill.unlock)||1);
      const card=document.createElement("article");
      card.className=`attack-mastery-card-v318${unlocked?"":" locked"}`;

      const copy=document.createElement("div");
      copy.className="attack-mastery-copy-v318";
      const title=document.createElement("strong");
      title.textContent=skill.name;
      const detail=document.createElement("small");
      detail.textContent=unlocked
        ? `Rank ${rank}/${MAX_ATTACK_RANK} · +${Math.round(rank*BONUS_PER_RANK*100)}% damage`
        : `Unlocks at Lv. ${skill.unlock}`;
      copy.append(title,detail);

      const button=document.createElement("button");
      button.type="button";
      button.className="pixel-button small attack-upgrade-button-v318";
      button.disabled=!unlocked || rank>=MAX_ATTACK_RANK || points<=0;
      button.textContent=!unlocked?"Locked":rank>=MAX_ATTACK_RANK?"MAX":"Upgrade +1";
      if(!button.disabled){
        button.addEventListener("click",()=>{
          const freshHero=activeHeroProgress();
          if(attackPointsAvailable(freshHero)<=0) return;
          const freshRank=attackRank(skill.id,freshHero);
          if(freshRank>=MAX_ATTACK_RANK) return;
          masteryState(freshHero)[skill.id]=freshRank+1;
          try{persistAll();}catch(error){}
          try{renderMenuSkills();}catch(error){renderAttackMasteryV318();}
        });
      }

      card.append(copy,button);
      list.append(card);
    });
  }

  if(typeof renderMenuSkills==="function"){
    const previousRenderMenuSkillsV318=renderMenuSkills;
    renderMenuSkills=function(){
      const result=previousRenderMenuSkillsV318.apply(this,arguments);
      renderAttackMasteryV318();
      return result;
    };
  }

  try{renderMenuSkills?.();}catch(error){}

  window.DuckieAttackMasteryV318={
    version:VERSION,
    maxRank:MAX_ATTACK_RANK,
    bonusPerRank:BONUS_PER_RANK,
    pointsAvailable:attackPointsAvailable,
    rank:attackRank,
    render:renderAttackMasteryV318
  };
  window.DUCKIE_QUEST_FIXES_V318={version:VERSION,clearQuestCardRewardV318};
})();
