/* Duckie Days v24.336 — Lil Guy collectible card variants.
   Original saves, rarities, packs and crafting unlocks are preserved. */
(()=>{
  'use strict';
  const TC=window.DuckieTradingCards;
  if(!TC?.cardCraft?.ensure || window.DuckieLilGuysCardsV336)return;
  const count=v=>Math.max(0,Math.floor(Number(v)||0));
  const oldEnsure=TC.ensureState;
  function ensure(data){
    const state=oldEnsure(data);
    if(!state)return null;
    if(!state.variantOwned || typeof state.variantOwned!=='object' || Array.isArray(state.variantOwned))state.variantOwned={};
    for(const [id,total] of Object.entries(state.owned)){
      let variants=state.variantOwned[id];
      if(!variants||typeof variants!=='object'||Array.isArray(variants))variants=state.variantOwned[id]={default:count(total)};
      for(const key of Object.keys(variants))variants[key]=count(variants[key]);
      const tracked=Object.values(variants).reduce((sum,value)=>sum+count(value),0);
      if(tracked<count(total))variants.default=count(variants.default)+count(total)-tracked;
      else if(tracked>count(total))state.owned[id]=tracked;
    }
    return state;
  }
  TC.ensureState=ensure;
  const oldRead=TC.readSave;
  TC.readSave=function(){const data=oldRead();ensure(data);return data;};
  const oldWrite=TC.writeSave;
  TC.writeSave=function(data){ensure(data);return oldWrite(data);};
  const oldGrant=TC.grantCard;
  function optionsFor(card){return TC.variantOptions?.(card)||[];}
  function normalizeVariant(card,value){
    if(!card || !card.enemyId || card.rarity==='fabled')return 'default';
    if(card.id.startsWith('r-'))return 'default';
    const key=String(value||'default').toLowerCase();
    if(key==='base'||key==='normal')return 'default';
    return optionsFor(card).some(v=>v.id===key)?key:'default';
  }
  TC.pickRandomVariant=function(card){
    const options=optionsFor(card);
    return options.length>1?options[Math.floor(Math.random()*options.length)].id:'default';
  };
  TC.grantCard=function(data,id,qty=1,options={}){
    const state=ensure(data),card=TC.byId[id];
    if(!state||!card)return null;
    const before=count(state.owned[id]);
    const result=oldGrant(data,id,qty);
    if(!result)return null;
    const delta=count(state.owned[id])-before;
    const variantId=normalizeVariant(card,options?.variantId||options?.variant);
    const variants=state.variantOwned[id]||(state.variantOwned[id]={default:before});
    // The old grant routine updates the total; we update only the newly granted variant.
    variants[variantId]=count(variants[variantId])+delta;
    const crafting=TC.cardCraft.ensure(data).crafting;
    if(!Array.isArray(crafting.variantsUnlocked[id]))crafting.variantsUnlocked[id]=['default'];
    if(!crafting.variantsUnlocked[id].includes(variantId))crafting.variantsUnlocked[id].push(variantId);
    return {...result,variantId,variantIsNew:count(variants[variantId])===delta};
  };
  TC.variantOptionsWithShiny=function(card){
    const all=optionsFor(card);
    if(!card?.enemyId || card.id.startsWith('r-'))return all;
    const shiny=TC.byId[`r-${card.enemyId}`];
    return shiny?[...all,{id:'shiny',label:shiny.name,art:shiny.art,linkedCardId:shiny.id}]:all;
  };
  TC.variantCounts=function(data,id){return {...(ensure(data)?.variantOwned?.[id]||{})};};
  TC.variantExtras=function(state,id){
    const counts=state?.variantOwned?.[id]||{};
    return Object.values(counts).reduce((sum,n)=>sum+Math.max(0,count(n)-1),0);
  };
  TC.convertVariantDuplicates=function(state,id,requested=Infinity){
    const counts=state?.variantOwned?.[id]||{};
    let left=Number.isFinite(requested)?count(requested):Infinity,removed=0;
    for(const key of Object.keys(counts)){
      const take=Math.min(left,Math.max(0,count(counts[key])-1));
      counts[key]-=take;removed+=take;left-=take;
      if(left<=0)break;
    }
    if(removed)state.owned[id]=Math.max(0,count(state.owned[id])-removed);
    return removed;
  };
  const oldFace=TC.createFace;
  TC.createFace=function(cardOrId,opts={}){
    const card=typeof cardOrId==='string'?TC.byId[cardOrId]:cardOrId;
    const face=oldFace(cardOrId,opts);
    if(!card || opts.locked || card.rarity==='fabled')return face;
    const variantId=opts.variantId||card.packVariantId;
    if(variantId){
      const option=optionsFor(card).find(v=>v.id===variantId);
      const img=face.querySelector('.tc-art');
      if(option&&img)img.src=TC.cardArt({...card,art:option.art});
    }
    return face;
  };
  window.DuckieLilGuysCardsV336={ensure,normalizeVariant};
})();
