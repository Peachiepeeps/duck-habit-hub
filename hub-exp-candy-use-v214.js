// Duckie Days v24.214 — use EXP Candy directly from the Main Hub inventory.
(function(){
  'use strict';
  window.DUCKIE_HUB_EXP_CANDY_USE='24.214-use-on-active-oc';

  const CANDIES={
    'exp-candy-small':{name:'EXP Candy Small',percent:.20},
    'exp-candy-large':{name:'EXP Candy Large',percent:.50}
  };

  const style=document.createElement('style');
  style.id='duckieHubExpCandyUseV214Style';
  style.textContent=`
    .exp-candy-use-v214{width:100%!important;justify-content:center!important;}
    .exp-candy-use-note-v214{
      margin:0!important;padding:7px 9px!important;border-radius:10px!important;
      background:rgba(255,255,255,.42)!important;font-size:.68rem!important;
      font-weight:800!important;text-align:center!important;line-height:1.35!important;
    }
  `;
  document.head.appendChild(style);

  function targetCharacterId(){
    const requested=String(save?.duckQuest?.activeCharacter || save?.selectedCharacter || 'peep');
    return (typeof CHARACTERS==='object' && CHARACTERS?.[requested]) ? requested : 'peep';
  }
  function targetCharacterName(){
    const id=targetCharacterId();
    return CHARACTERS?.[id]?.name || ({peep:'Peep',miko:'Miko',io:'Io',miho:'Miho',annika:'Annika'})[id] || 'OC';
  }
  function qty(id){return Math.max(0,Math.floor(Number(save?.inventory?.[id])||0));}
  function spend(id){
    if(qty(id)<1) return false;
    const left=qty(id)-1;
    if(left) save.inventory[id]=left; else delete save.inventory[id];
    return true;
  }

  function useCandy(itemId){
    const candy=CANDIES[itemId];
    if(!candy || qty(itemId)<1) return;
    const characterId=targetCharacterId();
    const who=targetCharacterName();
    const hero=normalizeDuckQuestCharacterProgress(characterId);
    if(!hero || hero.level>=100){showToast(`${who} is already at MAX Level!`);return;}

    const need=Math.max(1,Number(duckQuestExpNeeded(hero.level))||1);
    const amount=Math.max(1,Math.ceil(need*candy.percent));
    if(!spend(itemId)) return;

    const beforeLevel=hero.level;
    hero.exp=Math.max(0,Number(hero.exp)||0)+amount;
    while(hero.level<100){
      const levelNeed=Math.max(1,Number(duckQuestExpNeeded(hero.level))||1);
      if(hero.exp<levelNeed) break;
      hero.exp-=levelNeed;
      hero.level++;
      if(hero.level>=100){hero.level=100;hero.exp=0;break;}
    }

    // Keep the same shared save object Duck Quest reads on launch.
    save.duckQuest[characterId]=hero;
    try{persist();}catch(error){
      try{localStorage.setItem('duckHabitHubSave_v1',JSON.stringify(save));}catch(inner){}
    }
    try{renderStatus();}catch(error){}
    try{renderInventory();}catch(error){}

    const levelText=hero.level>beforeLevel?` and reached Lv. ${hero.level}!`:'!';
    showToast(`${who} gained +${amount} EXP${levelText}`);

    // Re-render the item sheet so quantity/button state updates immediately.
    try{renderInventoryItemSheet();}catch(error){}
  }

  function addUseButtonV214(){
    const itemId=typeof selectedInventoryItemId==='string'?selectedInventoryItemId:'';
    const candy=CANDIES[itemId];
    if(!candy || !inventorySheetActions || qty(itemId)<1) return;
    if(inventorySheetActions.querySelector('[data-exp-candy-use-v214]')) return;

    const who=targetCharacterName();
    const characterId=targetCharacterId();
    const hero=normalizeDuckQuestCharacterProgress(characterId);

    const note=document.createElement('p');
    note.className='exp-candy-use-note-v214';
    note.textContent=`Adds ${Math.round(candy.percent*100)}% of ${who}'s current Duck Quest EXP bar.`;

    const button=document.createElement('button');
    button.type='button';
    button.className='inventory-action primary exp-candy-use-v214';
    button.dataset.expCandyUseV214=itemId;
    button.textContent=hero?.level>=100?`${who} is MAX Level`:`Use on ${who}`;
    button.disabled=Boolean(hero?.level>=100);
    button.addEventListener('click',()=>useCandy(itemId));

    inventorySheetActions.prepend(note,button);
  }

  if(typeof renderInventoryItemSheet==='function'){
    const previousRenderInventoryItemSheet=renderInventoryItemSheet;
    renderInventoryItemSheet=function(){
      const result=previousRenderInventoryItemSheet.apply(this,arguments);
      addUseButtonV214();
      return result;
    };
  }

  // Handles the uncommon case where the Inventory sheet was already open when this file loaded.
  addUseButtonV214();
})();
