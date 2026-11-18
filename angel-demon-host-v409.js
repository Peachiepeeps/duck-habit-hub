// Duckie Days v24.409 — synchronize Task Buddy milestone saves with the live Home Hub.
(function(){
 'use strict';
 function syncAngelReward(){
  try{
   const latest=JSON.parse(localStorage.getItem('duckHabitHubSave_v1')||'{}');
   if(!latest.unlockedDucks?.includes('angel-character-duck'))return;
   // In the parent Home Hub, `save` lives in app.js and otherwise stays in memory.
   if(typeof save!=='undefined' && save && !save.unlockedDucks.includes('angel-character-duck')){
     save.unlockedDucks.push('angel-character-duck');
     save.duckCollectionCounts=save.duckCollectionCounts||{};
     save.duckCollectionCounts['angel-character-duck']=Math.max(1,Number(latest.duckCollectionCounts?.['angel-character-duck'])||1);
     // No save write here: the iframe has already updated localStorage.
     if(typeof renderDuckipedia==='function')try{renderDuckipedia()}catch(e){}
     if(typeof showToast==='function')showToast('Angel reached 100 Happiness! Angel Duck unlocked! 🦆💜');
   }
  }catch(e){console.warn('Angel Duck reward sync',e)}
 }
 window.addEventListener('message',(event)=>{
  if(event.origin!==location.origin || !event.data || event.data.type!=='duckie-buddy:angel-duck-earned')return;
  syncAngelReward();
 });
 window.addEventListener('storage',event=>{if(event.key==='duckHabitHubSave_v1')syncAngelReward()});
})();
