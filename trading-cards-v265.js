// Duckie Days v24.265 — shared Power Up Dust migration/core.
(function(){
  'use strict';
  const TC=window.DuckieTradingCards;
  if(!TC?.cardCraft?.ensure) return;

  const priorEnsure=TC.cardCraft.ensure;
  function ensurePowerUpDust(data){
    const state=priorEnsure(data);
    if(!state) return state;
    const legacy=Math.max(0,Math.floor(Number(state.cardDust)||0));
    if(!Number.isFinite(Number(state.powerUpDust))) state.powerUpDust=legacy;
    state.powerUpDust=Math.max(0,Math.floor(Number(state.powerUpDust)||0));
    // Keep a legacy mirror for old saved builds that may still read cardDust.
    state.cardDust=state.powerUpDust;
    return state;
  }

  TC.cardCraft.ensure=ensurePowerUpDust;
  const priorEnsureState=TC.ensureState;
  TC.ensureState=function(data){
    const state=priorEnsureState(data);
    if(!state) return state;
    return ensurePowerUpDust(data);
  };

  const priorRead=TC.readSave;
  TC.readSave=function(){
    const data=priorRead();
    ensurePowerUpDust(data);
    return data;
  };
  const priorWrite=TC.writeSave;
  TC.writeSave=function(data){
    ensurePowerUpDust(data);
    priorWrite(data);
  };

  TC.powerUpDustState=function(data){return ensurePowerUpDust(data||TC.readSave());};
  window.DUCKIE_POWER_UP_DUST_CORE='24.265';
})();
