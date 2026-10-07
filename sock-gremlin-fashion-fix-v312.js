// Duckie Days v24.312 — Sock Gremlin fashion recovery + stronger temporary outfit handling
(function(){
  "use strict";

  const VERSION="24.312";
  const KEY="sockGremlinChallengeV297";
  const ACTIVE_FLAG="__SOCK_FASHION_ACTIVE_V312";
  const ORIGINAL_KEY="originalOutfitV312";
  const ORIGINAL_UNIVERSAL_KEY="originalUniversalLoadoutV312";
  const RECOVERY_MARKER="mikoSockFashionLegacyRecoveryV24312";

  function clone(value){
    try{return structuredClone(value);}
    catch(error){return JSON.parse(JSON.stringify(value));}
  }

  function challenge(){
    try{return save?.[KEY]||null;}
    catch(error){return null;}
  }

  function isChallengeUrl(){
    try{return new URLSearchParams(location.search).get("sock-gremlin")==="1";}
    catch(error){return false;}
  }

  function persistSafe(){
    try{persist();}catch(error){}
  }

  function rerenderSafe(){
    try{renderPeep();}catch(error){}
    try{renderRoom();}catch(error){}
    try{renderClosetCategoryMenu();}catch(error){}
    try{renderCloset();}catch(error){}
  }

  function emptyUniversalLoadout(){
    return {dress:null,outer:null,extras:[],socks:{}};
  }

  // Miko normally normalizes null clothing slots back toward defaults.
  // During the challenge only, preserve the intentionally bare temporary look.
  try{
    if(typeof normalizeMikoOutfit==="function"){
      const previousNormalizeMikoOutfitV312=normalizeMikoOutfit;
      normalizeMikoOutfit=function(rawOutfit={}){
        const incoming=(rawOutfit&&typeof rawOutfit==="object")?rawOutfit:{};
        const normalized=previousNormalizeMikoOutfitV312(incoming);

        if(window[ACTIVE_FLAG]){
          for(const key of ["shirt","outer","bottom","socks","shoes"]){
            if(Object.prototype.hasOwnProperty.call(incoming,key)&&incoming[key]===null){
              normalized[key]=null;
            }
          }
          if(Array.isArray(incoming.extras))normalized.extras=[...incoming.extras];
          if(incoming.bangsStyle==="bangs"||incoming.bangsStyle==="bangs-pinned"){
            normalized.bangsStyle=incoming.bangsStyle;
          }
        }

        return normalized;
      };
    }
  }catch(error){
    console.warn("v24.312 fashion normalizer wrapper skipped:",error);
  }

  function bareMikoOutfit(){
    return {
      hair:"hair-main",
      bangsStyle:"bangs",
      shirt:null,
      outer:null,
      bottom:null,
      socks:null,
      shoes:null,
      extras:[]
    };
  }

  function restoreStoredOriginal(state,{clear=true,rerender=false}={}){
    if(!state)return false;
    let changed=false;

    const oldOutfit=state[ORIGINAL_KEY]||state.originalOutfitV311;
    if(oldOutfit){
      if(!save.characterOutfits||typeof save.characterOutfits!=="object")save.characterOutfits={};
      save.characterOutfits.miko=clone(oldOutfit);
      changed=true;
    }

    const oldUniversal=state[ORIGINAL_UNIVERSAL_KEY]||state.originalUniversalLoadoutV311;
    if(oldUniversal && save.universalClothingV311?.loadouts){
      save.universalClothingV311.loadouts.miko=clone(oldUniversal);
      changed=true;
    }

    if(clear){
      delete state[ORIGINAL_KEY];
      delete state.originalOutfitV311;
      delete state[ORIGINAL_UNIVERSAL_KEY];
      delete state.originalUniversalLoadoutV311;
    }

    window[ACTIVE_FLAG]=false;

    if(changed){
      persistSafe();
      if(rerender)rerenderSafe();
    }
    return changed;
  }

  function startChallengeIsolation(){
    const state=challenge();
    if(!state||state.status!=="closet"||!isChallengeUrl())return;

    window[ACTIVE_FLAG]=true;

    // Save the player's real appearance before touching the challenge outfit.
    if(!state[ORIGINAL_KEY]){
      state[ORIGINAL_KEY]=clone(save?.characterOutfits?.miko||DEFAULT_MIKO_OUTFIT);
    }

    if(save.universalClothingV311?.loadouts){
      if(!state[ORIGINAL_UNIVERSAL_KEY]){
        state[ORIGINAL_UNIVERSAL_KEY]=clone(
          save.universalClothingV311.loadouts.miko||emptyUniversalLoadout()
        );
      }
      save.universalClothingV311.loadouts.miko=emptyUniversalLoadout();
    }

    if(!save.characterOutfits||typeof save.characterOutfits!=="object")save.characterOutfits={};
    save.characterOutfits.miko=bareMikoOutfit();

    try{currentExpression="expression-neutral";}catch(error){}

    const note=document.querySelector("#closetPanel .save-note");
    if(note){
      note.textContent="Fashion challenge outfit is temporary — your regular Miko outfit will return after judging.";
    }

    persistSafe();
    rerenderSafe();
    bindJudgeButton(state);
  }

  function bindJudgeButton(state){
    const done=document.querySelector("#sockFashionBannerV297 .sock-fashion-done-v297");
    if(!done||done.dataset.v312RestoreBound==="1")return;
    done.dataset.v312RestoreBound="1";

    // The old minigame listener runs first so it can score/snapshot the temporary
    // challenge look. Then restore Miko before the page navigates back to Quest.
    done.addEventListener("click",()=>{
      const latest=challenge()||state;
      restoreStoredOriginal(latest,{clear:true,rerender:false});
    });
  }

  function recoverInterruptedChallenge(){
    const state=challenge();
    if(!state)return;
    if(isChallengeUrl()&&state.status==="closet")return;

    // If v24.311/312 captured a real pre-challenge outfit but navigation was
    // interrupted before restoration, recover it automatically.
    restoreStoredOriginal(state,{clear:true,rerender:false});
  }

  function resetLegacyStuckMiko(){
    const state=challenge();

    // First prefer a recoverable pre-challenge snapshot if one still exists.
    if(state && restoreStoredOriginal(state,{clear:true,rerender:false})){
      delete save[KEY];
      save[RECOVERY_MARKER]=true;
      persistSafe();
      rerenderSafe();
      showToast("Miko's pre-fashion-battle outfit was restored! ♡");
      removeRecoveryCard();
      return;
    }

    // Older completed challenges did not save a before-copy at all. There is no
    // browser history for that old outfit, so return Miko to a clean starter
    // baseline without touching any purchased/unlocked wardrobe items.
    if(!save.characterOutfits||typeof save.characterOutfits!=="object")save.characterOutfits={};
    save.characterOutfits.miko=clone(DEFAULT_MIKO_OUTFIT);

    if(save.universalClothingV311?.loadouts){
      save.universalClothingV311.loadouts.miko=emptyUniversalLoadout();
    }

    delete save[KEY];
    save[RECOVERY_MARKER]=true;
    window[ACTIVE_FLAG]=false;

    try{currentExpression="expression-neutral";}catch(error){}

    persistSafe();
    rerenderSafe();
    showToast("Stuck fashion-battle layers cleared! Miko is back to his normal starter outfit. ♡");
    removeRecoveryCard();
  }

  function removeRecoveryCard(){
    document.querySelector("#mikoFashionRecoveryV312")?.remove();
  }

  function addRecoveryCard(){
    removeRecoveryCard();

    if(save?.selectedCharacter!=="miko")return;
    if(document.body.classList.contains("sock-fashion-mode-v297"))return;
    if(save?.[RECOVERY_MARKER])return;

    const options=document.querySelector("#closetOptions");
    if(!options)return;

    const card=document.createElement("section");
    card.id="mikoFashionRecoveryV312";
    card.className="miko-fashion-recovery-v312";

    const copy=document.createElement("div");
    copy.innerHTML="<strong>Fashion Battle outfit stuck?</strong><small>This clears an outfit saved by an older Sock Gremlin challenge. Your unlocked clothes and purchases stay safe.</small>";

    const button=document.createElement("button");
    button.type="button";
    button.textContent="Clear Stuck Outfit";
    button.addEventListener("click",resetLegacyStuckMiko);

    card.append(copy,button);
    options.prepend(card);
  }

  // Add the recovery card every time the closet contents are redrawn.
  if(typeof renderClosetOptions==="function"){
    const previousRenderClosetOptionsV312=renderClosetOptions;
    renderClosetOptions=function(){
      const result=previousRenderClosetOptionsV312.apply(this,arguments);
      try{addRecoveryCard();}catch(error){}
      return result;
    };
  }

  recoverInterruptedChallenge();

  // The original fashion challenge also queues setup with setTimeout(0).
  // Since this script is loaded afterward, this runs after its challenge UI.
  setTimeout(startChallengeIsolation,0);
  setTimeout(addRecoveryCard,30);

  window.DUCKIE_SOCK_FASHION_FIX_V312={
    version:VERSION,
    recover:resetLegacyStuckMiko,
    restore:()=>restoreStoredOriginal(challenge(),{clear:true,rerender:true})
  };
})();
