// Duckie Days v24.288 — Gimmick rewards in the Hub
(function(){
  "use strict";
  if(typeof ITEMS==="undefined") return;
  const LETTER_IMAGE="assets/gifts/Love-letter.webp";
  const NAMES={peep:"Peep",miko:"Miko",io:"Io",miho:"Miho",annika:"Annika"};

  ITEMS["shiny-egg"]={name:"Shiny Egg",category:"special",image:"duck-quest/assets/gimmicks/shiny-egg.png",icon:"✨",sellValue:0};
  for(const [id,name] of Object.entries(NAMES)){
    ITEMS[`love-letter-${id}`]={name:`${name}'s Love Letter`,category:"gift",image:LETTER_IMAGE,icon:"💌",sellValue:0,giftable:true,loveLetterCharacterId:id};
  }

  const priorRenderInventoryItemSheet=renderInventoryItemSheet;
  renderInventoryItemSheet=function(){
    priorRenderInventoryItemSheet.apply(this,arguments);
    const itemId=selectedInventoryItemId,item=ITEMS[itemId];
    if(!item?.loveLetterCharacterId || inventoryQuantity(itemId)<=0) return;
    const target=item.loveLetterCharacterId;
    const targetName=NAMES[target]||target;
    const character=getCurrentCharacter();
    inventoryGiftPreference.classList.remove("hidden");
    if(save.selectedCharacter!==target){
      inventoryGiftPreference.textContent=`This Love Letter is for ${targetName}. Switch to ${targetName} to give it to them. ♡`;
      return;
    }
    inventoryGiftPreference.textContent=`${targetName}: A special letter from Pippa · +50 Happiness`;
    const button=document.createElement("button");
    button.type="button";button.className="inventory-action primary";button.textContent=`Give Love Letter to ${targetName}`;
    button.addEventListener("click",()=>giftInventoryItem(itemId,1));
    inventorySheetActions.prepend(button);
  };

  const priorGiftInventoryItem=giftInventoryItem;
  giftInventoryItem=function(itemId,quantity=1){
    const item=ITEMS[itemId];
    if(!item?.loveLetterCharacterId) return priorGiftInventoryItem.apply(this,arguments);
    if(save.selectedCharacter!==item.loveLetterCharacterId){showToast(`This Love Letter is for ${NAMES[item.loveLetterCharacterId]||"another OC"}. ♡`);return;}
    if(inventoryQuantity(itemId)<=0 || !removeInventoryItem(itemId,1)) return;
    const gained=addCharacterHappiness(50,item.loveLetterCharacterId);
    if(!save.gimmicksV288||typeof save.gimmicksV288!=="object")save.gimmicksV288={};
    if(!save.gimmicksV288.loveLettersRead||typeof save.gimmicksV288.loveLettersRead!=="object")save.gimmicksV288.loveLettersRead={};
    const first=!save.gimmicksV288.loveLettersRead[item.loveLetterCharacterId];
    save.gimmicksV288.loveLettersRead[item.loveLetterCharacterId]=true;
    persist();closeInventoryItem();closeInventoryAll();setExpression("expression-happy",2800);showGiftBurst("💌");
    showToast(first?`${NAMES[item.loveLetterCharacterId]} reads the Love Letter and lights up! +${gained} Happiness 💌`:`${NAMES[item.loveLetterCharacterId]} happily reads another Love Letter! +${gained} Happiness 💌`);
  };
  window.DUCKIE_GIMMICK_HUB_V288="24.288";
})();
