// Duckie Days v24.299 — Bao Cafe rare NPC cards
(function(){
  'use strict';const TC=window.DuckieTradingCards;if(!TC)return;
  const cards=[
    {id:'r-bao-cheese',enemyId:'bao-cheese',variantId:'base',name:'Cheese',art:'gimmicks/bao-cafe/cheese/idle-1.png',rarity:'rare',number:'R-050',category:'Special NPC',hint:'Meet Cheese at Bao Cafe during a rare Duck Quest encounter.'},
    {id:'r-bao-parfait',enemyId:'bao-parfait',variantId:'base',name:'Parfait',art:'gimmicks/bao-cafe/parfait/idle-1.png',rarity:'rare',number:'R-051',category:'Special NPC',hint:'Meet Parfait at Bao Cafe during a rare Duck Quest encounter.'},
    {id:'r-bao-frappe',enemyId:'bao-frappe',variantId:'base',name:'Frappe',art:'gimmicks/bao-cafe/frappe/idle-1.png',rarity:'rare',number:'R-052',category:'Special NPC',hint:'Meet Frappe at Bao Cafe during a rare Duck Quest encounter.'},
    // New bear cards use R-200+ to avoid numbers already used by love interests.
    {id:'r-bao-hime',enemyId:'bao-hime',variantId:'base',name:'Hime',art:'gimmicks/bao-cafe/hime/idle-1.png',rarity:'rare',number:'R-200',category:'Special NPC',hint:'Earn Hime’s card from her Bao Café reward pool.'},
    {id:'r-bao-melrose',enemyId:'bao-melrose',variantId:'base',name:'Mel Rose',art:'gimmicks/bao-cafe/melrose/idle-1.png',rarity:'rare',number:'R-201',category:'Special NPC',hint:'Earn Mel Rose’s card from her Bao Café reward pool.'},
    {id:'r-bao-pickle',enemyId:'bao-pickle',variantId:'base',name:'Pickle',art:'gimmicks/bao-cafe/pickle/idle-1.png',rarity:'rare',number:'R-202',category:'Special NPC',hint:'Earn Pickle’s card from her Bao Café reward pool.'},
    // v24.395: Sprite-based artwork is temporary until owner supplies bespoke card art.
    // Keep these IDs stable so replacing art later preserves every collected card.
    {id:'r-bao-cerise',enemyId:'bao-cerise',variantId:'base',name:'Cerise',art:'gimmicks/bao-cafe/cerise/idle-1.png',rarity:'rare',number:'R-203',category:'Special NPC',hint:'Earn Cerise’s trading card from her Bao Café reward pool.'},
    {id:'r-bao-hunni',enemyId:'bao-hunni',variantId:'base',name:'Hunni',art:'gimmicks/bao-cafe/hunni/idle-1.png',rarity:'rare',number:'R-204',category:'Special NPC',hint:'Earn Hunni’s trading card from her Bao Café reward pool.'},
    {id:'r-bao-woolie',enemyId:'bao-woolie',variantId:'base',name:'Woolie',art:'gimmicks/bao-cafe/woolie/idle-1.png',rarity:'rare',number:'R-205',category:'Special NPC',hint:'Earn Woolie’s trading card from their Bao Café reward pool.'}
  ];
  cards.forEach(card=>{if(!TC.byId[card.id]){TC.cards.push(card);TC.byId[card.id]=card;}});
  window.DUCKIE_BAO_CAFE_CARDS_V299='24.395';
})();
