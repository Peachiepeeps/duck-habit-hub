// Duckie Days v24.390 — Keep Universal Clothing above OC bodies and bottoms.
// The old insertion used the first *shoe*, which is behind the dress on Miho,
// Io and Annika; it could accidentally paint dresses under the body/clothes.
(function(){
  'use strict';
  if (typeof getRenderOrderedAssets !== 'function') return;
  const previous = getRenderOrderedAssets;

  const copyPrefix = copy => copy && `uc-${String(copy.id).replace(/[^a-z0-9-]/gi,'')}-`;
  const belongs = (asset,prefix) => !!prefix && String(asset?.id||'').startsWith(prefix);
  const isFace = asset => /^(expression-|bangs$)/.test(String(asset?.id||''));
  const isNativeOuter = asset => {
    const id=String(asset?.id||'').toLowerCase();
    if(id.startsWith('uc-'))return false;
    return /(^outer|jacket|cardigan|hoodie|sweater|coat|vest|blazer|midori-suit)/.test(id);
  };
  const isFootwear = asset => /shoe|boot|loafer|sneaker/i.test(String(asset?.id||''));
  const isMainGarment = asset => {
    const id=String(asset?.id||'').toLowerCase();
    return id==='base'||/^(bottom|top|shirt|dress|legwear|sock|look-.*(pants|shorts|skirt|shirt|top|dress))/.test(id);
  };

  getRenderOrderedAssets=function(characterId=save.selectedCharacter){
    const list=previous.apply(this,arguments).slice();
    const api=window.DuckieUniversalClothingV311;
    if(!api?.loadout||!api?.findCopy) return list;
    const loadout=api.loadout(characterId);
    const dressPrefix=copyPrefix(loadout?.dress&&api.findCopy(loadout.dress));
    const outerPrefix=copyPrefix(loadout?.outer&&api.findCopy(loadout.outer));
    if(!dressPrefix&&!outerPrefix) return list;

    const dresses=[],layers=[],native=[];
    for(const asset of list){
      if(belongs(asset,dressPrefix))dresses.push(asset);
      // Miko/Io's shared hand intentionally sits behind their body (v24.322).
      else if(belongs(asset,outerPrefix)&&!(/-hand$/.test(String(asset.id))&&(characterId==='miko'||characterId==='io')))layers.push(asset);
      else native.push(asset);
    }

    // Find the last piece of the OC body and its lower garments. A dress
    // always goes AFTER this line, regardless of which shoe/sock is first.
    const faceIndex=native.findIndex(isFace);
    const limit=faceIndex<0?native.length:faceIndex;
    const firstNativeOuter=native.findIndex((a,i)=>i<limit&&isNativeOuter(a));
    const clothesLimit=firstNativeOuter<0?limit:firstNativeOuter;
    let afterBody=0;
    for(let i=0;i<clothesLimit;i++)if(isMainGarment(native[i]))afterBody=i+1;

    if(dresses.length){
      // Native jackets, hoodies and cardigans remain layered *over* the dress.
      let at=firstNativeOuter>=afterBody?firstNativeOuter:limit;
      // Shoes that appear after the shirt/dress are allowed to cover the dress.
      for(let i=afterBody;i<at;i++)if(isFootwear(native[i])){at=i;break;}
      native.splice(Math.max(afterBody,at),0,...dresses);
    }

    if(layers.length){
      const face=native.findIndex(isFace);
      const end=face<0?native.length:face;
      const lastDress=native.reduce((n,a,i)=>belongs(a,dressPrefix)?i:n,-1);
      let lastNativeOuter=-1;
      native.forEach((a,i)=>{if(i<end&&isNativeOuter(a))lastNativeOuter=i;});
      let at=Math.max(afterBody,lastDress+1,lastNativeOuter+1);
      // Place outer above the dress and native layers, but below footwear
      // if footwear comes after all the body and garment artwork.
      const base=native.findIndex(a=>a.id==='base');
      for(let i=Math.max(at,afterBody,base+1);i<end;i++){
        if(isFootwear(native[i])){at=i;break;}
      }
      if(at<Math.max(0,base+1))at=base+1;
      // Without a later shoe, keep these garments below expression/bangs.
      if(at>end)at=end;
      if(at===0&&base<0)at=end;
      native.splice(at,0,...layers);
    }
    return native;
  };
  try{renderPeep?.();}catch(error){console.warn('Universal outfit repaint skipped',error);}
  window.DUCKIE_CLOTHING_ORDER_V390='24.390';
})();
