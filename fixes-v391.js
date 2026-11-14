// v24.391 — all OC belts under native and universal outerwear.
(function(){
  'use strict';
  if(typeof getRenderOrderedAssets!=='function')return;
  const previous=getRenderOrderedAssets;
  getRenderOrderedAssets=function(characterId=save.selectedCharacter){
    const ordered=previous.apply(this,arguments).slice();
    const isBelt=a=>/^(belt|.*-belt)$/.test(String(a?.id||'')) && !/belt-buckle/.test(String(a?.id||''));
    const isOuter=a=>{
      const id=String(a?.id||'').toLowerCase();
      // Back-of-outfit sprites are deliberately behind the body, not belt targets.
      if(/(^back-|hoodie-back|coat-back|back-coat|-back$)/.test(id))return false;
      if(/^uc-/.test(id))return /-(?:main|outline|secondary|accent)-|-(?:outline|main|secondary|accent)$/.test(id) && !!window.DuckieUniversalClothingV311?.loadout(characterId)?.outer && id.includes(String(window.DuckieUniversalClothingV311.loadout(characterId).outer).replace(/[^a-z0-9-]/gi,''));
      return /^(outer|jacket|cardigan|hoodie|sweater|coat|vest|blazer|midori-suit|top-hoodie|top-sweater)|(-jacket|-hoodie|-cardigan|-coat|-sweater|-blazer)(?:-|$)/.test(id);
    };
    const belts=ordered.filter(isBelt);
    if(!belts.length)return ordered;
    const rest=ordered.filter(a=>!isBelt(a));
    const firstOuter=rest.findIndex(isOuter);
    if(firstOuter<0){
      const face=rest.findIndex(a=>/^(expression-|bangs$|look-ein-bangs$)/.test(String(a.id)));
      rest.splice(face>=0?face:rest.length,0,...belts);
    }else rest.splice(firstOuter,0,...belts);
    return rest;
  };
  try{renderPeep?.()}catch(_){ }
})();
