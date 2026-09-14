// Duckie Days v24.214 — make Token Shop EXP Candy actions name their target OC.
(function(){
  'use strict';
  window.DUCKIE_QUEST_BOOST_LABELS='24.214-use-on-oc-label';

  function heroNameV214(){
    try{return typeof heroDisplayName==='function'?heroDisplayName():({peep:'Peep',miko:'Miko',io:'Io',miho:'Miho',annika:'Annika'})[activeCharacterId]||'OC';}
    catch(error){return 'OC';}
  }
  function refreshCandyLabelsV214(){
    const who=heroNameV214();
    document.querySelectorAll('[data-v213-use="exp-candy-small"],[data-v213-use="exp-candy-large"]').forEach(button=>{
      button.textContent=`Use on ${who}`;
    });
  }

  const holder=document.querySelector('#tokenShopBoostRowsV213');
  if(holder){
    const observer=new MutationObserver(refreshCandyLabelsV214);
    observer.observe(holder,{childList:true,subtree:true});
  }
  document.querySelector('#openTokenShopV200')?.addEventListener('click',()=>setTimeout(refreshCandyLabelsV214,0));
  document.querySelector('#tokenShopModalV200')?.addEventListener('click',()=>setTimeout(refreshCandyLabelsV214,0));
  refreshCandyLabelsV214();
})();
