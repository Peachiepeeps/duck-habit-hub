// Duckie Days v24.322 — Universal shared hand behind OC body base
(function(){
  "use strict";
  const VERSION="24.322";

  const MIKO_NATIVE_ARM_LAYERS=new Set([
    "arm-base",
    "top-button-sleeve",
    "top-hoodie-sleeve",
    "top-sweater-sleeve",
    "outer-black-blazer-arm",
    "lukio-sleeve",
    "shino-sleeve",
    "hibiki-coat-sleeve",
    "westley-sleeve",
    "circe-sleeve",
    "quin-sleeve"
  ]);

  function safeCopyToken(copy){
    return String(copy?.id||"").replace(/[^a-z0-9-]/gi,"");
  }

  if(typeof getRenderOrderedAssets==="function"){
    const previousGetRenderOrderedAssetsV322=getRenderOrderedAssets;

    getRenderOrderedAssets=function(characterId=save.selectedCharacter){
      let list=previousGetRenderOrderedAssetsV322.apply(this,arguments).slice();
      if(characterId!=="miko" && characterId!=="io") return list;

      const api=window.DuckieUniversalClothingV311;
      if(!api?.loadout||!api?.findCopy||!api?.families) return list;

      const loadout=api.loadout(characterId);
      const outerCopy=loadout?.outer?api.findCopy(loadout.outer):null;
      const family=outerCopy?api.families[outerCopy.familyId]:null;
      if(!outerCopy || !["big-hoodie","big-cardigan"].includes(family?.id)) return list;

      const token=safeCopyToken(outerCopy);
      const handId=`uc-${token}-hand`;

      // v24.321 already hides these, but keep the rule here too so future
      // render-order changes can never leak Miko's native raised arm/sleeves.
      if(characterId==="miko"){
        list=list.filter(asset=>!MIKO_NATIVE_ARM_LAYERS.has(String(asset?.id||"")));
      }

      // Remove the old shared-hand placement and reinsert it immediately BEFORE
      // the character's body base. The renderer draws later items on top, so
      // this makes the Miko/Io shared hand sit behind the base as intended.
      list=list.filter(asset=>String(asset?.id||"")!==handId);
      const hand={
        id:handId,
        file:"../../assets/universal-clothing/shared/io-miko-hand.webp",
        z:19
      };

      let baseIndex=list.findIndex(asset=>String(asset?.id||"")==="base");
      if(baseIndex<0) baseIndex=0;
      list.splice(baseIndex,0,hand);
      return list;
    };
  }

  try{renderPeep?.();}catch(error){}
  window.DUCKIE_FIXES_V322=VERSION;
})();
