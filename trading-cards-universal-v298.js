// Duckie Days v24.298 — Porcupin + UFONO Trading Cards
(function(){
  "use strict";const TC=window.DuckieTradingCards;if(!TC)return;
  const cards=[
    {id:"r-porcupin",enemyId:"porcupin",variantId:"base",name:"Porcupin",art:"enemies/porcupin/base/idle-1.png",rarity:"rare",number:"R-048",category:"Universal Enemy",hint:"Find Porcupin in any Duck Quest stage."},
    {id:"r-ufono",enemyId:"ufono",variantId:"base",name:"UFONO",art:"gimmicks/ufono/base/idle-1.png",rarity:"rare",number:"R-049",category:"Gimmick Encounter",hint:"Clear a UFONO minigame challenge in Duck Quest."}
  ];
  cards.forEach(card=>{if(!TC.byId[card.id]){TC.cards.push(card);TC.byId[card.id]=card;}});window.DUCKIE_UNIVERSAL_CARDS_V298="24.298";
})();
