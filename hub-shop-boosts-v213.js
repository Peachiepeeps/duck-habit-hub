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
