(function(){
  "use strict";
  const TC=window.DuckieTradingCards;if(!TC)return;
  let rewardCard=null,matched=false,awarded=false;
  const originalCreate=createDeck;
  createDeck=function(pairCount){
    const result=originalCreate(pairCount);rewardCard=null;matched=false;awarded=false;
    if(Math.random()<.03&&result.length>=2){rewardCard=TC.rollCard(TC.rollRarity({common:.80,uncommon:.18,rare:.02}));result[0]={id:rewardCard.id,name:rewardCard.name,src:"",pairKey:`${rewardCard.id}-a`,matchKey:`trading-${rewardCard.id}`,tradingCard:true,cardId:rewardCard.id};result[1]={...result[0],pairKey:`${rewardCard.id}-b`};shuffle(result);}
    return result;
  };
  const originalRender=renderBoard;
  renderBoard=function(){originalRender();deck.forEach((card,index)=>{if(!card.tradingCard)return;const front=board.children[index]?.querySelector(".card-front");if(!front)return;front.innerHTML="";const face=TC.createFace(card.cardId);face.classList.add("memory-card-special");front.append(face);});};
  const originalMatched=markMatched;
  markMatched=function(firstIndex,secondIndex){if(deck[firstIndex]?.tradingCard)matched=true;originalMatched(firstIndex,secondIndex);};
  const originalFinish=finishRound;
  finishRound=function(){if(rewardCard&&matched&&!awarded){TC.grantCard(save,rewardCard.id,1);awarded=true;}originalFinish();if(awarded){rewardValue.textContent+=` + ${rewardCard.name} Card`;endFlavor.textContent=`You matched the special ${rewardCard.name} pair, so the card is yours! ♡`;setBoardMessage(`Round cleared! You won Pink Coins and the ${rewardCard.name} Trading Card!`);}};
  window.DUCKIE_MEMORY_CARD_BUILD="24.235";
})();
