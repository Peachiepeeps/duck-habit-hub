// Duckie Days v24.317 — three new Fabled cards
(function(){
  "use strict";
  const TC=window.DuckieTradingCards;
  if(!TC) return;

  const cards=[
    {
      id:"f-pudding-pig",
      name:"Pudding Pig",
      art:"trading-cards/fabled/F-pudding-pig.png",
      rarity:"fabled",
      number:"F-021",
      category:"Fabled",
      hint:"Find this Fabled card in a Card Pack or as a very rare Daily Shop offer."
    },
    {
      id:"f-shrimpie",
      name:"Shrimpie",
      art:"trading-cards/fabled/F-shrimpie.png",
      rarity:"fabled",
      number:"F-022",
      category:"Fabled",
      hint:"Find this Fabled card in a Card Pack or as a very rare Daily Shop offer."
    },
    {
      id:"f-plushbun",
      name:"Plushbun",
      art:"trading-cards/fabled/F-plushbun.png",
      rarity:"fabled",
      number:"F-023",
      category:"Fabled",
      hint:"Find this Fabled card in a Card Pack or as a very rare Daily Shop offer."
    }
  ];

  for(const card of cards){
    if(TC.byId[card.id]) continue;
    TC.cards.push(card);
    TC.byId[card.id]=card;
  }

  window.DUCKIE_TRADING_CARDS_V317="24.317";
})();
