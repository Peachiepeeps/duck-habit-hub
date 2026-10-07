// Duckie Days v24.311 — Sock Gremlin fashion outfit isolation + Universal Clothing isolation
(function(){
  "use strict";
  const VERSION="24.311";
  const KEY="sockGremlinChallengeV297";
  const ACTIVE_FLAG="__SOCK_FASHION_ACTIVE_V311";
  const ORIGINAL_KEY="originalOutfitV311";
  const ORIGINAL_UNIVERSAL_KEY="originalUniversalLoadoutV311";

  function clone(value){
    try{return structuredClone(value);}
    catch(error){return JSON.parse(JSON.stringify(value));}
  }
  function challenge(){try{return save?.[KEY]||null;}catch(error){return null;}}
  function isChallengeUrl(){try{return new URLSearchParams(location.search).get("sock-gremlin")==="1";}catch(error){return false;}}
  function persistSafe(){try{persist();}catch(error){}}
  function rerenderSafe(){try{renderPeep();}catch(error){}try{renderRoom();}catch(error){}try{renderClosetCategoryMenu();}catch(error){}try{renderCloset();}catch(error){}}

  // Preserve explicit null slots during the temporary bare Miko challenge outfit.
  try{
    if(typeof normalizeMikoOutfit==="function"){
      const previousNormalizeMikoOutfitV311=normalizeMikoOutfit;
      normalizeMikoOutfit=function(rawOutfit={}){
        const incoming=(rawOutfit&&typeof rawOutfit==="object")?rawOutfit:{};
        const normalized=previousNormalizeMikoOutfitV311(incoming);
        if(window[ACTIVE_FLAG]){
          for(const key of ["shirt","outer","bottom","socks","shoes"]){
            if(Object.prototype.hasOwnProperty.call(incoming,key)&&incoming[key]===null)normalized[key]=null;
          }
          if(Array.isArray(incoming.extras))normalized.extras=[...incoming.extras];
          if(incoming.bangsStyle==="bangs"||incoming.bangsStyle==="bangs-pinned")normalized.bangsStyle=incoming.bangsStyle;
        }
        return normalized;
      };
    }
  }catch(error){console.warn("v24.311 fashion normalizer wrapper skipped:",error);}

  function bareMikoOutfit(){
    return {bangsStyle:"bangs",shirt:null,outer:null,bottom:null,socks:null,shoes:null,extras:[]};
  }

  function restore(state,{clear=true}={}){
    if(!state)return false;
    let changed=false;
    if(state[ORIGINAL_KEY]){
      if(!save.characterOutfits||typeof save.characterOutfits!=="object")save.characterOutfits={};
      save.characterOutfits.miko=clone(state[ORIGINAL_KEY]);
      if(clear)delete state[ORIGINAL_KEY];
      changed=true;
    }
    if(state[ORIGINAL_UNIVERSAL_KEY] && save.universalClothingV311?.loadouts){
      save.universalClothingV311.loadouts.miko=clone(state[ORIGINAL_UNIVERSAL_KEY]);
      if(clear)delete state[ORIGINAL_UNIVERSAL_KEY];
      changed=true;
    }
    window[ACTIVE_FLAG]=false;
    if(changed)persistSafe();
    return changed;
  }

  function bindDone(state){
    const done=document.querySelector("#sockFashionBannerV297 .sock-fashion-done-v297");
    if(!done||done.dataset.v311RestoreBound==="1")return;
    done.dataset.v311RestoreBound="1";
    done.addEventListener("click",()=>{
      const latest=challenge()||state;
      restore(latest,{clear:true});
    });
  }

  function begin(){
    const state=challenge();
    if(!state||state.status!=="closet"||!isChallengeUrl())return;
    window[ACTIVE_FLAG]=true;
    if(!state[ORIGINAL_KEY])state[ORIGINAL_KEY]=clone(save?.characterOutfits?.miko||{});
    if(save.universalClothingV311?.loadouts?.miko && !state[ORIGINAL_UNIVERSAL_KEY]){
      state[ORIGINAL_UNIVERSAL_KEY]=clone(save.universalClothingV311.loadouts.miko);
      save.universalClothingV311.loadouts.miko={dress:null,outer:null,extras:[],socks:{}};
    }
    if(!save.characterOutfits||typeof save.characterOutfits!=="object")save.characterOutfits={};
    save.characterOutfits.miko=bareMikoOutfit();
    try{currentExpression="expression-neutral";}catch(error){}
    const note=document.querySelector("#closetPanel .save-note");
    if(note)note.textContent="Fashion challenge outfit is temporary — your normal outfit will be restored.";
    persistSafe();rerenderSafe();bindDone(state);
  }

  function recover(){
    const state=challenge();
    if(!state)return;
    if(isChallengeUrl()&&state.status==="closet")return;
    restore(state,{clear:true});
  }

  recover();
  setTimeout(begin,0);
  window.DUCKIE_SOCK_FASHION_FIX_V311={version:VERSION,restore:()=>restore(challenge(),{clear:true})};
})();
