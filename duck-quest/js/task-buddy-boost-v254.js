(function(){
  'use strict';
  const SAVE_KEY='duckHabitHubSave_v1';
  const BOOST=1.20;

  function todayKey(){
    const d=new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }

  function boostActive(){
    try{
      const raw=localStorage.getItem(SAVE_KEY);
      const data=raw?JSON.parse(raw):{};
      const p=data?.taskProgression;
      return Boolean(p && p.dayKey===todayKey() && Number(p.completedToday||0)>=5 && p.buddyBoostActive!==false);
    }catch(error){return false;}
  }

  if(typeof buddyDamageBase==='function'){
    const previousBuddyDamageBase=buddyDamageBase;
    buddyDamageBase=function(){
      const result=previousBuddyDamageBase.apply(this,arguments);
      if(boostActive() && result && Number.isFinite(Number(result.damage))){
        result.damage=Math.max(1,Math.round(Number(result.damage)*BOOST));
      }
      return result;
    };
  }

  if(typeof buddySkillForEnemyId==='function'){
    const previousBuddySkillForEnemyId=buddySkillForEnemyId;
    buddySkillForEnemyId=function(enemyId){
      const skill=previousBuddySkillForEnemyId.call(this,enemyId);
      if(!skill || !boostActive()) return skill;
      const boosted={...skill};
      for(const key of ['healPercent','attackBoost','damageReduction','drainPercent']){
        if(Number.isFinite(Number(skill[key]))) boosted[key]=Math.min(.95,Number(skill[key])*BOOST);
      }
      boosted.description=`${skill.description||''}${skill.description?' ':''}Task Buddy Boost: +20% ability power today.`;
      return boosted;
    };
  }

  if(typeof renderBattleBuddy==='function'){
    const previousRenderBattleBuddy=renderBattleBuddy;
    renderBattleBuddy=function(){
      const result=previousRenderBattleBuddy.apply(this,arguments);
      try{ui?.buddyCombatant?.classList.toggle('task-buddy-boost-v254',boostActive());}catch(error){}
      return result;
    };
  }

  const style=document.createElement('style');
  style.textContent=`
    #buddyCombatant.task-buddy-boost-v254::after{
      content:'TASK BOOST ✦';position:absolute;left:50%;bottom:-12px;transform:translateX(-50%);
      padding:2px 5px;border:2px solid rgba(75,120,82,.24);border-radius:999px;background:#eef8e9;
      color:#4f7655;font-size:.42rem;font-weight:950;white-space:nowrap;z-index:7;
    }
  `;
  document.head.append(style);

  window.DuckieTaskBuddyBoostV254={boostActive,multiplier:BOOST};
})();
