// Duckie Days v24.326 — Remaining Miko love-interest wardrobe compatibility
(function(){
  "use strict";
  const VERSION="24.326";
  const NEW_MIKO_NATIVE_ARM_LAYERS=new Set([
    "kiri-sleeve","midori-sleeve","cybil-sleeve","nico-sleeve",
    "nene-shirt-sleeve","nene-sweater-sleeve","moriko-sleeve"
  ]);
  function safeCopyToken(copy){return String(copy?.id||"").replace(/[^a-z0-9-]/gi,"");}
  if(typeof getRenderOrderedAssets==="function"){
    const previousGetRenderOrderedAssetsV326=getRenderOrderedAssets;
    getRenderOrderedAssets=function(characterId=save.selectedCharacter){
      let list=previousGetRenderOrderedAssetsV326.apply(this,arguments).slice();
      if(characterId!=="miko") return list;
      const api=window.DuckieUniversalClothingV311;
      if(!api?.loadout||!api?.findCopy||!api?.families) return list;
      const loadout=api.loadout(characterId);
      const outerCopy=loadout?.outer?api.findCopy(loadout.outer):null;
      const family=outerCopy?api.families[outerCopy.familyId]:null;
      if(!outerCopy || !["big-hoodie","big-cardigan"].includes(family?.id)) return list;
      list=list.filter(asset=>!NEW_MIKO_NATIVE_ARM_LAYERS.has(String(asset?.id||"")));
      const token=safeCopyToken(outerCopy),handId=`uc-${token}-hand`;
      // v24.322 already positions this hand correctly; leave it untouched here.
      return list;
    };
  }
  try{renderPeep?.();}catch(error){}
  window.DUCKIE_FIXES_V326=VERSION;
})();
