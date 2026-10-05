// Duckie Days v24.297 — Sock Gremlin Trading Card
(function(){
  "use strict";
  const TC=window.DuckieTradingCards;
  if(!TC) return;
  const card={
    id:"r-sock-gremlin", enemyId:"sock-gremlin", variantId:"base", name:"Sock Gremlin",
    art:"gimmicks/sock-gremlin/base/idle-1.png", rarity:"rare", number:"R-047",
    category:"Gimmick Encounter", hint:"Win a Sock Gremlin Fashion Battle in Duck Quest."
  };
  if(!TC.byId[card.id]){TC.cards.push(card);TC.byId[card.id]=card;}
  window.DUCKIE_SOCK_GREMLIN_CARD_V297="24.297";
})();
