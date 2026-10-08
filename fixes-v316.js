// Duckie Days v24.316 — Universal Clothing layer-order repair for Miko
(function(){
  "use strict";
  const VERSION="24.316";

  if(typeof getRenderOrderedAssets!=="function") return;

  const previousGetRenderOrderedAssetsV316=getRenderOrderedAssets;

  function safeCopyToken(copy){
    return String(copy?.id||"").replace(/[^a-z0-9-]/gi,"");
  }

  function belongsToCopy(asset,copy){
    if(!asset||!copy)return false;
    const token=safeCopyToken(copy);
    return Boolean(token && String(asset.id||"").startsWith(`uc-${token}-`));
  }

  function isFrontBoundary(asset){
    const id=String(asset?.id||"");
    return /shoe|boot|loafer|sneaker/i.test(id)
      || /^expression-/.test(id)
      || id==="bangs"
      || /hairpin|crown|halo|sunglasses|cheek|headband/i.test(id);
  }

  getRenderOrderedAssets=function(characterId=save.selectedCharacter){
    let list=previousGetRenderOrderedAssetsV316.apply(this,arguments).slice();
    if(characterId!=="miko") return list;

    const api=window.DuckieUniversalClothingV311;
    if(!api?.loadout||!api?.findCopy) return list;

    const loadout=api.loadout(characterId);
    const dressCopy=loadout?.dress?api.findCopy(loadout.dress):null;
    const outerCopy=loadout?.outer?api.findCopy(loadout.outer):null;
    if(!dressCopy&&!outerCopy) return list;

    const dressLayers=dressCopy?list.filter(asset=>belongsToCopy(asset,dressCopy)):[];
    let outerLayers=outerCopy?list.filter(asset=>belongsToCopy(asset,outerCopy)):[];

    // v24.311 added a generic shared hand for universal oversized layers and
    // removed Miko's native raised arm. Miko already has a correctly aligned
    // arm asset, so keep the real arm and discard only that synthetic hand.
    if(outerCopy){
      const handId=`uc-${safeCopyToken(outerCopy)}-hand`;
      outerLayers=outerLayers.filter(asset=>asset.id!==handId);
    }

    list=list.filter(asset=>
      asset.id!=="arm-base"
      && !belongsToCopy(asset,dressCopy)
      && !belongsToCopy(asset,outerCopy)
    );

    let armLayer=null;
    try{
      const armAsset=getCharacterAssetMap?.("miko")?.["arm-base"];
      if(armAsset?.file) armLayer={id:"arm-base",...armAsset};
    }catch(error){}

    // Put universal garments after Miko's base/lower layers, but before shoes,
    // face, bangs, and other front pieces. The real left arm is inserted after
    // both universal dress and outer layers so it always stays visibly on top.
    let insertAt=list.findIndex(isFrontBoundary);
    if(insertAt<0) insertAt=list.length;

    const garmentStack=[...dressLayers,...outerLayers];
    if(armLayer) garmentStack.push(armLayer);
    list.splice(insertAt,0,...garmentStack);

    return list;
  };

  try{renderPeep?.();}catch(error){}
  window.DUCKIE_UNIVERSAL_CLOTHING_LAYER_FIX_V316=VERSION;
})();
