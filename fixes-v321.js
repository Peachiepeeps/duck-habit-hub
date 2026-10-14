// Duckie Days v24.321 — Miko Universal outer cleanup + shared-hand path repair
(function(){
  "use strict";
  const VERSION="24.321";

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

  function isFrontBoundary(asset){
    const id=String(asset?.id||"");
    return /^expression-/.test(id)
      || id==="bangs"
      || /hairpin|crown|halo|sunglasses|cheek|headband|big-bow|r-bow|glasses/i.test(id);
  }

  if(typeof getRenderOrderedAssets==="function"){
    const previousGetRenderOrderedAssetsV321=getRenderOrderedAssets;
    getRenderOrderedAssets=function(characterId=save.selectedCharacter){
      let list=previousGetRenderOrderedAssetsV321.apply(this,arguments).slice();
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

      // v24.318 inserted the correct hand artwork using a root-relative-looking
      // path, but renderCharacterInto() prepends the OC asset folder. That made
      // the browser request assets/miko/assets/... and show a broken-image icon.
      list=list.filter(asset=>asset?.id!==handId);

      // Miko's regular raised arm and every native raised-arm sleeve must be
      // completely hidden underneath an oversized Universal hoodie/cardigan.
      if(characterId==="miko"){
        list=list.filter(asset=>!MIKO_NATIVE_ARM_LAYERS.has(String(asset?.id||"")));
      }

      let lastOuter=-1;
      list.forEach((asset,index)=>{
        const id=String(asset?.id||"");
        if(id.startsWith(prefix)) lastOuter=index;
      });

      let insertAt=lastOuter>=0?lastOuter+1:list.findIndex(isFrontBoundary);
      if(insertAt<0) insertAt=list.length;
      list.splice(insertAt,0,{
        id:handId,
        // Asset.file is appended to assets/miko/ or assets/io/, so walk back
        // out to the shared Universal Clothing folder first.
        file:"../../assets/universal-clothing/shared/io-miko-hand.webp",
        z:36
      });

      return list;
    };
  }

  try{renderPeep?.();}catch(error){}
  window.DUCKIE_FIXES_V321=VERSION;
})();
