// Duckie Days v24.299 — Bao Cafe rare NPC cards
(function(){
  'use strict';const TC=window.DuckieTradingCards;if(!TC)return;
  const cards=[
    {id:'r-bao-cheese',enemyId:'bao-cheese',variantId:'base',name:'Cheese',art:'gimmicks/bao-cafe/cheese/idle-1.png',rarity:'rare',number:'R-050',category:'Special NPC',hint:'Meet Cheese at Bao Cafe during a rare Duck Quest encounter.'},
    {id:'r-bao-parfait',enemyId:'bao-parfait',variantId:'base',name:'Parfait',art:'gimmicks/bao-cafe/parfait/idle-1.png',rarity:'rare',number:'R-051',category:'Special NPC',hint:'Meet Parfait at Bao Cafe during a rare Duck Quest encounter.'},
    {id:'r-bao-frappe',enemyId:'bao-frappe',variantId:'base',name:'Frappe',art:'gimmicks/bao-cafe/frappe/idle-1.png',rarity:'rare',number:'R-052',category:'Special NPC',hint:'Meet Frappe at Bao Cafe during a rare Duck Quest encounter.'}
  ];
  cards.forEach(card=>{if(!TC.byId[card.id]){TC.cards.push(card);TC.byId[card.id]=card;}});
  window.DUCKIE_BAO_CAFE_CARDS_V299='24.299';
})();
