// Hub boost helpers — consolidated for Duckie Days 24.287.

// ===== Source: hub-shop-boosts-v213.js =====
// Duckie Days v24.213 — shared Quest boost items in the main Hub Shop.
(function(){
  'use strict';
  window.DUCKIE_HUB_BOOST_SHOP='24.213-exp-candy-warm-blanket';

  const BOOST_ITEMS={
    'exp-candy-small':{
      name:'EXP Candy Small', category:'battle',
      image:'assets/items/quest-boosts/Exp-candy-small.png', icon:'✦', sellValue:0,
      description:'Use in Duck Quest to gain 20% of the active OC’s current EXP bar.'
    },
    'exp-candy-large':{
      name:'EXP Candy Large', category:'battle',
      image:'assets/items/quest-boosts/Exp-candy-large.png', icon:'✦', sellValue:0,
      description:'Use in Duck Quest to gain 50% of the active OC’s current EXP bar.'
    },
    'warm-blanket':{
      name:'Warm Blanket', category:'battle',
      image:'assets/items/quest-boosts/Warm-blanket.png', icon:'▰', sellValue:0,
      description:'Use on an incubating egg to cut its remaining hatch time in half.'
    }
  };
  const HUB_PRICES={
    'exp-candy-small':600,
    'exp-candy-large':1400,
    'warm-blanket':900
  };

  if(typeof ITEMS!=='object' || !ITEMS) return;
  for(const [id,item] of Object.entries(BOOST_ITEMS)){
    ITEMS[id]={...(ITEMS[id]||{}),...item};
  }

  if(typeof SHOP_STOCK==='object' && Array.isArray(SHOP_STOCK.battle)){
    for(const [itemId,price] of Object.entries(HUB_PRICES)){
      if(!SHOP_STOCK.battle.some(entry=>entry?.itemId===itemId)){
        SHOP_STOCK.battle.push({itemId,price});
      }
    }
  }

  // Loaded after the Hub core, so a currently open Shop can refresh immediately.
  try{
    if(typeof renderShop==='function' && typeof currentShopTab!=='undefined' && currentShopTab==='battle') renderShop();
  }catch(error){ /* the Shop will render normally the next time it opens */ }
})();
;

// ===== Source: hub-exp-candy-use-v215.js =====
// Duckie Days v24.215 — safe EXP Candy inventory use + one-time Large Candy recovery.
(function(){
  'use strict';
  window.DUCKIE_HUB_EXP_CANDY_USE='24.215-safe-use-and-large-candy-recovery';

  const CANDIES={
    'exp-candy-small':{
      name:'EXP Candy Small',percent:.20,
      item:{name:'EXP Candy Small',category:'battle',image:'assets/items/quest-boosts/Exp-candy-small.png',icon:'✦',sellValue:0,
        description:'Use on the active Duck Quest OC to gain 20% of the current EXP bar.'}
    },
    'exp-candy-large':{
      name:'EXP Candy Large',percent:.50,
      item:{name:'EXP Candy Large',category:'battle',image:'assets/items/quest-boosts/Exp-candy-large.png',icon:'✦',sellValue:0,
        description:'Use on the active Duck Quest OC to gain 50% of the current EXP bar.'}
    }
  };

  // Keep the inventory definitions available even if the shop extension rendered later than expected.
  if(typeof ITEMS==='object' && ITEMS){
    for(const [id,def] of Object.entries(CANDIES)) ITEMS[id]={...(ITEMS[id]||{}),...def.item};
    if(!ITEMS['warm-blanket']){
      ITEMS['warm-blanket']={name:'Warm Blanket',category:'battle',image:'assets/items/quest-boosts/Warm-blanket.png',icon:'▰',sellValue:0,
        description:'Use on an incubating egg to cut its remaining hatch time in half.'};
    }
  }

  const style=document.createElement('style');
  style.id='duckieHubExpCandyUseV215Style';
  style.textContent=`
    .exp-candy-use-v215{width:100%!important;justify-content:center!important;}
    .exp-candy-use-note-v215{
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
  function saveNow(){
    try{persist();}
    catch(error){try{localStorage.setItem('duckHabitHubSave_v1',JSON.stringify(save));}catch(inner){}}
  }

  // v24.214 was installed after the player had purchased seven Large candies.
  // If that stack vanished completely, restore it once without duplicating a surviving stack.
  function recoverLargeCandiesOnce(){
    if(!save || typeof save!=='object') return false;
    if(!save.inventory || typeof save.inventory!=='object') save.inventory={};
    if(save.expCandyLargeRecoveryV24215) return false;
    let restored=false;
    if(qty('exp-candy-large')===0){
      save.inventory['exp-candy-large']=7;
      restored=true;
    }
    save.expCandyLargeRecoveryV24215=true;
    saveNow();
    if(restored){
      setTimeout(()=>{try{showToast('Recovered EXP Candy Large ×7 ♡');}catch(error){}},250);
    }
    return restored;
  }

  function useCandy(itemId){
    const candy=CANDIES[itemId];
    if(!candy || qty(itemId)<1) return;
    const characterId=targetCharacterId();
    const who=targetCharacterName();
    const hero=normalizeDuckQuestCharacterProgress(characterId);
    if(!hero || hero.level>=100){try{showToast(`${who} is already at MAX Level!`);}catch(error){}return;}

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

    // normalizeDuckQuestCharacterProgress returns the object stored at save.duckQuest[characterId].
    // Persist the shared save so Duck Quest sees the EXP immediately on next open.
    saveNow();
    try{renderStatus();}catch(error){}
    try{renderInventory();}catch(error){}
    const levelText=hero.level>beforeLevel?` and reached Lv. ${hero.level}!`:'!';
    try{showToast(`${who} gained +${amount} EXP${levelText}`);}catch(error){}
    try{renderInventoryItemSheet();}catch(error){}
  }

  function addUseButtonV215(){
    const itemId=typeof selectedInventoryItemId==='string'?selectedInventoryItemId:'';
    const candy=CANDIES[itemId];
    if(!candy || !inventorySheetActions || qty(itemId)<1) return;
    if(inventorySheetActions.querySelector('[data-exp-candy-use-v215]')) return;

    const who=targetCharacterName();
    const characterId=targetCharacterId();
    const hero=normalizeDuckQuestCharacterProgress(characterId);

    const note=document.createElement('p');
    note.className='exp-candy-use-note-v215';
    note.textContent=`Adds ${Math.round(candy.percent*100)}% of ${who}'s current Duck Quest EXP bar.`;

    const button=document.createElement('button');
    button.type='button';
    button.className='inventory-action primary exp-candy-use-v215';
    button.dataset.expCandyUseV215=itemId;
    button.textContent=hero?.level>=100?`${who} is MAX Level`:`Use on ${who}`;
    button.disabled=Boolean(hero?.level>=100);
    button.addEventListener('click',()=>useCandy(itemId));
    inventorySheetActions.prepend(note,button);
  }

  if(typeof renderInventoryItemSheet==='function'){
    const previousRenderInventoryItemSheet=renderInventoryItemSheet;
    renderInventoryItemSheet=function(){
      const result=previousRenderInventoryItemSheet.apply(this,arguments);
      addUseButtonV215();
      return result;
    };
  }

  const restored=recoverLargeCandiesOnce();
  try{renderInventory();}catch(error){}
  if(restored){try{renderStatus();}catch(error){}}
  addUseButtonV215();
})();
;
