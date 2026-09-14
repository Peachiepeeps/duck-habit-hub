// Duckie Days v24.215 — safe Token Shop EXP Candy labels (no recursive observer).
(function(){
  'use strict';
  window.DUCKIE_QUEST_BOOST_LABELS='24.215-safe-use-on-oc-label';

  function heroNameV215(){
    try{return typeof heroDisplayName==='function'?heroDisplayName():({peep:'Peep',miko:'Miko',io:'Io',miho:'Miho',annika:'Annika'})[activeCharacterId]||'OC';}
    catch(error){return 'OC';}
  }
  function refreshCandyLabelsV215(){
    const desired=`Use on ${heroNameV215()}`;
    document.querySelectorAll('[data-v213-use="exp-candy-small"],[data-v213-use="exp-candy-large"]').forEach(button=>{
      // Important: only mutate the text when it actually changed. v24.214 observed
      // its own textContent mutation repeatedly, which could lock the Duck Quest UI.
      if(button.textContent!==desired) button.textContent=desired;
    });
  }

  const refreshSoon=()=>setTimeout(refreshCandyLabelsV215,0);
  document.querySelector('#openTokenShopV200')?.addEventListener('click',refreshSoon);
  document.querySelector('#tokenShopModalV200')?.addEventListener('click',refreshSoon);
  document.querySelector('#switchQuestOc')?.addEventListener('click',refreshSoon);
  document.querySelector('#questOcPicker')?.addEventListener('click',refreshSoon);
  refreshCandyLabelsV215();
})();
