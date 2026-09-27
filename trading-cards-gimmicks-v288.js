// Duckie Days v24.288 — Gimmick Encounter trading cards
(function(){
  "use strict";
  const TC=window.DuckieTradingCards;
  if(!TC) return;
  const cards=[
    {id:"u-gimmick-rotten-egg-base",enemyId:"rotten-egg",variantId:"base",name:"Rotten Egg",art:"gimmicks/rotten-egg/base/idle-1.png",rarity:"uncommon",number:"U-014",category:"Gimmick Encounter",hint:"Find a strange egg during Duck Quest and discover what is inside."},
    {id:"u-gimmick-rotten-egg-rare",enemyId:"rotten-egg",variantId:"rare",name:"Rare Rotten Egg",art:"gimmicks/rotten-egg/rare/idle-1.png",rarity:"uncommon",number:"U-015",category:"Gimmick Encounter",hint:"A rarer Rotten Egg can appear from the strange egg event."},
    {id:"u-gimmick-lucky-cat-base",enemyId:"lucky-cat",variantId:"base",name:"Lucky Cat",art:"gimmicks/lucky-cat/base/idle-1.png",rarity:"uncommon",number:"U-016",category:"Gimmick Encounter",hint:"Meet Lucky Cat in any Duck Quest stage."},
    {id:"u-gimmick-lucky-cat-blue",enemyId:"lucky-cat",variantId:"blue",name:"Blue Lucky Cat",art:"gimmicks/lucky-cat/blue/idle-1.png",rarity:"uncommon",number:"U-017",category:"Gimmick Encounter",hint:"Meet this Lucky Cat color in any Duck Quest stage."},
    {id:"u-gimmick-lucky-cat-green",enemyId:"lucky-cat",variantId:"green",name:"Green Lucky Cat",art:"gimmicks/lucky-cat/green/idle-1.png",rarity:"uncommon",number:"U-018",category:"Gimmick Encounter",hint:"Meet this Lucky Cat color in any Duck Quest stage."},
    {id:"u-gimmick-lucky-cat-pink",enemyId:"lucky-cat",variantId:"pink",name:"Pink Lucky Cat",art:"gimmicks/lucky-cat/pink/idle-1.png",rarity:"uncommon",number:"U-019",category:"Gimmick Encounter",hint:"Meet this Lucky Cat color in any Duck Quest stage."},
    {id:"u-gimmick-lucky-cat-purple",enemyId:"lucky-cat",variantId:"purple",name:"Purple Lucky Cat",art:"gimmicks/lucky-cat/purple/idle-1.png",rarity:"uncommon",number:"U-020",category:"Gimmick Encounter",hint:"Meet this Lucky Cat color in any Duck Quest stage."},
    {id:"u-gimmick-angy-duck-base",enemyId:"angy-duck",variantId:"base",name:"Angy Duck",art:"gimmicks/angy-duck/base/idle-1.png",rarity:"uncommon",number:"U-021",category:"Gimmick Encounter",hint:"Calm down an Angy Duck in any Duck Quest stage."},
    {id:"u-gimmick-angy-duck-blue",enemyId:"angy-duck",variantId:"blue",name:"Blue Angy Duck",art:"gimmicks/angy-duck/blue/idle-1.png",rarity:"uncommon",number:"U-022",category:"Gimmick Encounter",hint:"Calm down this Angy Duck color in Duck Quest."},
    {id:"u-gimmick-angy-duck-green",enemyId:"angy-duck",variantId:"green",name:"Green Angy Duck",art:"gimmicks/angy-duck/green/idle-1.png",rarity:"uncommon",number:"U-023",category:"Gimmick Encounter",hint:"Calm down this Angy Duck color in Duck Quest."},
    {id:"u-gimmick-angy-duck-pink",enemyId:"angy-duck",variantId:"pink",name:"Pink Angy Duck",art:"gimmicks/angy-duck/pink/idle-1.png",rarity:"uncommon",number:"U-024",category:"Gimmick Encounter",hint:"Calm down this Angy Duck color in Duck Quest."},
    {id:"u-gimmick-angy-duck-purple",enemyId:"angy-duck",variantId:"purple",name:"Purple Angy Duck",art:"gimmicks/angy-duck/purple/idle-1.png",rarity:"uncommon",number:"U-025",category:"Gimmick Encounter",hint:"Calm down this Angy Duck color in Duck Quest."},
    {id:"r-gimmick-ghost-girl",name:"Ghost Girl",art:"gimmicks/ghost-girl/idle-1.png",rarity:"rare",number:"R-041",category:"Gimmick Encounter",hint:"Share food with the hungry Ghost Girl in Duck Quest."},
    {id:"r-gimmick-pippa",name:"Pippa",art:"gimmicks/pippa/idle-1.png",rarity:"rare",number:"R-042",category:"Gimmick Encounter",hint:"Receive a Love Letter from Pippa in Duck Quest."},
    {id:"r-gimmick-artist-friend",name:"Artist Friend",art:"gimmicks/artist-friend/idle-1.png",rarity:"rare",number:"R-043",category:"Gimmick Encounter",hint:"Help Artist Friend find inspiration in Duck Quest."},
    {id:"r-gimmick-rotten-egg-shiny",enemyId:"rotten-egg",variantId:"shiny",name:"Shiny Rotten Egg",art:"gimmicks/rotten-egg/shiny/idle-1.png",rarity:"rare",number:"R-044",category:"Gimmick Encounter Shiny",hint:"Very rarely, a strange egg reveals a Shiny Rotten Egg."},
    {id:"r-gimmick-lucky-cat-shiny",enemyId:"lucky-cat",variantId:"shiny",name:"Shiny Lucky Cat",art:"gimmicks/lucky-cat/shiny/idle-1.png",rarity:"rare",number:"R-045",category:"Gimmick Encounter Shiny",hint:"Very rarely meet a Shiny Lucky Cat in Duck Quest."},
    {id:"r-gimmick-angy-duck-shiny",enemyId:"angy-duck",variantId:"shiny",name:"Shiny Angy Duck",art:"gimmicks/angy-duck/shiny/idle-1.png",rarity:"rare",number:"R-046",category:"Gimmick Encounter Shiny",hint:"Very rarely meet a Shiny Angy Duck in Duck Quest."}
  ];
  for(const card of cards){
    if(TC.byId[card.id]) continue;
    TC.cards.push(card);TC.byId[card.id]=card;
  }
  window.DUCKIE_GIMMICK_CARDS_V288="24.288";
})();
