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
  function isHolo(state,id,variant="default"){
    return Boolean(state?.crafting?.holoVariants?.[id]?.[variant]);
  }
  function colorCounts(state,id){
    const tracked=state?.variantOwned?.[id];
    return tracked&&typeof tracked==='object'&&Object.keys(tracked).length
      ?tracked:{default:count(state?.owned?.[id])};
  }
  function reserve(state,id,key){return isHolo(state,id,key)?1:4;}
  TC.isColorHolo=isHolo;
  TC.variantColorCount=function(state,id,key="default"){
    return count(colorCounts(state,id)[key]);
  };
  // Unupgraded colors retain four cards (one card + 3 for Holo);
  // finished colors only need their last copy protected.
  TC.variantExtras=function(state,id){
    return Object.entries(colorCounts(state,id)).reduce((sum,[key,n])=>
      sum+Math.max(0,count(n)-reserve(state,id,key)),0);
  };
  TC.convertVariantDuplicates=function(state,id,requested=Infinity){
    const counts=colorCounts(state,id);
    let left=Number.isFinite(requested)?count(requested):Infinity,removed=0;
    for(const [key,value] of Object.entries(counts)){
      const take=Math.min(left,Math.max(0,count(value)-reserve(state,id,key)));
      if(!take)continue;
      counts[key]=count(value)-take;removed+=take;left-=take;
      if(left<=0)break;
    }
    if(removed)state.owned[id]=Math.max(0,count(state.owned[id])-removed);
    return removed;
  };
  TC.upgradeColorHolo=function(state,id,variant="default",required=3){
    if(!state?.crafting || isHolo(state,id,variant))return false;
    const counts=colorCounts(state,id);
    const total=count(counts[variant]);
    if(total<required+1)return false;
    // Only the selected color pays for its own finish.
    counts[variant]=total-required;
    state.owned[id]=Math.max(0,count(state.owned[id])-required);
    if(!state.crafting.holoVariants||typeof state.crafting.holoVariants!=="object")state.crafting.holoVariants={};
    if(!state.crafting.holoVariants[id])state.crafting.holoVariants[id]={};
    state.crafting.holoVariants[id][variant]=true;
    return true;
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
    if(!opts.locked){
      const shown=String(variantId||TC.cardCraft?.craftFor?.(card.id,TC.readSave())?.displayVariant||'default');
      const state=TC.cardCraft?.ensure?.(TC.readSave());
      const holo=TC.isColorHolo(state,card.id,shown);
      face.classList.toggle('tc-holo-v262',holo);
      face.querySelectorAll('.tc-holo-overlay-v262').forEach(el=>el.remove());
      if(holo){const overlay=document.createElement('i');overlay.className='tc-holo-overlay-v262';overlay.setAttribute('aria-hidden','true');face.append(overlay);}
    }
    return face;
  };
  window.DuckieLilGuysCardsV336={ensure,normalizeVariant};
})();
