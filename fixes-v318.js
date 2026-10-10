// Duckie Days v24.318 — Universal oversized outer hand repair
(function(){
  "use strict";
  const VERSION="24.318";

  if(typeof getRenderOrderedAssets!=="function") return;
  const previousGetRenderOrderedAssetsV318=getRenderOrderedAssets;

  function safeCopyToken(copy){
    return String(copy?.id||"").replace(/[^a-z0-9-]/gi,"");
  }

  function isFrontBoundary(asset){
    const id=String(asset?.id||"");
    return /^expression-/.test(id)
      || id==="bangs"
      || /hairpin|crown|halo|sunglasses|cheek|headband|big-bow|r-bow|glasses/i.test(id);
  }

  getRenderOrderedAssets=function(characterId=save.selectedCharacter){
    let list=previousGetRenderOrderedAssetsV318.apply(this,arguments).slice();
    if(characterId!=="miko" && characterId!=="io") return list;

    const api=window.DuckieUniversalClothingV311;
    if(!api?.loadout||!api?.findCopy||!api?.families) return list;

    const loadout=api.loadout(characterId);
    const outerCopy=loadout?.outer?api.findCopy(loadout.outer):null;
    const family=outerCopy?api.families[outerCopy.familyId]:null;
    if(!outerCopy || !["big-hoodie","big-cardigan"].includes(family?.id)) return list;

    const token=safeCopyToken(outerCopy);
    const prefix=`uc-${token}-`;
    const handId=`${prefix}hand`;

    // Remove any older placement of the shared hand. Miko's native raised arm
    // is hidden while an oversized Universal outer is equipped.
    list=list.filter(asset=>asset?.id!==handId && !(characterId==="miko" && asset?.id==="arm-base"));

    // Place the supplied shared hand ABOVE the hoodie/cardigan artwork so it
    // remains visible, but BELOW face/hair/front-accessory layers.
    let lastOuter=-1;
    list.forEach((asset,index)=>{
      const id=String(asset?.id||"");
      if(id.startsWith(prefix)) lastOuter=index;
    });

    let insertAt=lastOuter>=0?lastOuter+1:list.findIndex(isFrontBoundary);
    if(insertAt<0) insertAt=list.length;
    list.splice(insertAt,0,{
      id:handId,
      file:"assets/universal-clothing/shared/io-miko-hand.webp",
      z:36
    });

    return list;
  };

  try{renderPeep?.();}catch(error){}
  window.DUCKIE_UNIVERSAL_OUTER_HAND_V318=VERSION;
})();
