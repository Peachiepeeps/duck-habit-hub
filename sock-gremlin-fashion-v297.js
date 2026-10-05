// Duckie Days v24.297 — Sock Gremlin Fashion Challenge (Hub / Closet)
(function(){
  "use strict";
  const VERSION="24.297";
  const KEY="sockGremlinChallengeV297";
  const TAG_LABELS={cozy:"Cozy",casual:"Casual",fancy:"Fancy",cool:"Cool",cute:"Cute",romantic:"Romantic",sporty:"Sporty",dark:"Dark",classic:"Classic",accessory:"Accessorized",formal:"Formal",bright:"Bright",silly:"Silly"};
  const TAGS={
    "top-button":["casual","classic"],"shirt-blouse":["fancy","romantic","classic"],"top-big-shirt":["cozy","casual","cute"],"top-hoodie":["cozy","casual","sporty"],"top-sweater":["cozy","cute","classic"],"outer-black-blazer":["fancy","formal","dark","cool"],
    "bottom-capris":["casual","classic"],"bottom-jeans":["casual","cool"],"bottom-boxers":["cozy","silly","cute"],"bottom-shorts":["casual","sporty"],"socks":["cozy","cute"],"socks-garter":["fancy","romantic"],"shoes-loafer":["classic","casual"],"shoes-fancy-loafers":["fancy","classic"],"belt":["accessory","classic"],"headband":["accessory","cute"],"hairpins-black":["accessory","dark","cool"],
    "lukio-hair-streak":["accessory","cool"],"lukio-hoodie":["cozy","cool","casual"],"lukio-shorts":["casual","sporty"],"lukio-socks":["cozy","cute"],"lukio-booties":["cozy","cool"],
    "shino-beret":["accessory","cute","classic"],"shino-sweater":["cozy","cute","classic"],"shino-jeans":["casual","cool"],"shino-boots":["cool","casual"],
    "cheryln-hairpin":["accessory","cute","bright"],"cheryln-sweater":["cozy","cute","bright"],"cheryln-shorts":["casual","cute"],"cheryln-tights":["cute","romantic"],"cheryln-boots":["cute","casual"],
    "hibiki-ribbon":["accessory","romantic","fancy"],"hibiki-coat":["fancy","romantic","cool"],"hibiki-shorts":["fancy","cool"],"hibiki-stockings":["romantic","fancy"],"hibiki-boots":["fancy","cool"],
    "devlin-vest":["fancy","formal","dark"],"devlin-tie":["accessory","formal","fancy"],"devlin-pants":["formal","dark","classic"],"devlin-belt":["accessory","formal"],"devlin-loafers":["formal","classic"],
    "yuzuru-shirt":["casual","sporty","cool"],"yuzuru-shorts":["sporty","casual"],"yuzuru-socks":["sporty","casual"],"yuzuru-shoes":["sporty","cool"],"yuzuru-bracelet":["accessory","sporty"],
    "westley-top":["cool","dark","casual"],"westley-jacket":["cool","dark","fancy"],"westley-pants":["cool","dark"],"westley-boots":["cool","dark"],"westley-face-makeup":["accessory","cool","dark"],
    "circe-tank-top":["romantic","dark","cool"],"circe-sweater":["romantic","fancy","dark"],"circe-shorts":["romantic","cool"],"circe-stockings":["romantic","fancy"],"circe-shoes":["fancy","dark"],"circe-choker":["accessory","romantic","dark"],
    "quin-shirt":["cool","casual","cute"],"quin-jacket":["cool","casual"],"quin-shorts":["casual","sporty"],"quin-boots":["cool","casual"],"quin-hairpins":["accessory","cute","cool"],
    "daisy-crown":["accessory","cute","romantic"],"ocean-sunglasses":["accessory","cool","casual"],"halo":["accessory","cute","fancy"],"candy-hairclip":["accessory","cute","bright"]
  };
  function shuffle(list){const out=[...list];for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;}
  function challenge(){return save?.[KEY];}
  function ownedMikoSet(){return new Set(Array.isArray(save?.characterUnlockedItems?.miko)?save.characterUnlockedItems.miko:[]);}
  function generateCriteria(){
    const owned=ownedMikoSet(),groupIds=["shirt","outer","bottom","socks","shoes","extras"],inspiration=[];
    for(const groupId of groupIds){const group=MIKO_CLOSET.find(g=>g.id===groupId);if(!group)continue;const options=(group.options||[]).filter(id=>owned.has(id)&&Array.isArray(TAGS[id])&&TAGS[id].length);if(options.length)inspiration.push(options[Math.floor(Math.random()*options.length)]);}
    const combined=new Set();inspiration.forEach(id=>(TAGS[id]||[]).forEach(tag=>combined.add(tag)));
    if(combined.size<3)["casual","cozy","accessory","classic","cute"].forEach(tag=>combined.add(tag));
    return shuffle([...combined]).slice(0,3).map(id=>({id,label:TAG_LABELS[id]||id}));
  }
  function currentOutfitIds(){const outfit=save?.characterOutfits?.miko||{};return [outfit.shirt,outfit.outer,outfit.bottom,outfit.socks,outfit.shoes,outfit.bangsStyle,...(Array.isArray(outfit.extras)?outfit.extras:[])].filter(Boolean);}
  function evaluate(criteria){const wornTags=new Set();currentOutfitIds().forEach(id=>(TAGS[id]||[]).forEach(tag=>wornTags.add(tag)));return(criteria||[]).map(item=>({...item,matched:wornTags.has(item.id)}));}
  function restoreHubCharacter(c){const previous=c?.previousHubCharacter;if(previous&&CHARACTERS[previous]&&save.unlockedCharacters?.includes(previous)){save.selectedCharacter=previous;try{syncSelectedCharacterRoom();}catch(error){}}}
  function addChallengeUi(c){
    document.body.classList.add("sock-fashion-mode-v297");const panel=document.querySelector("#closetPanel");if(!panel)return;document.querySelector("#closeCloset")?.classList.add("sock-fashion-close-hidden-v297");panel.querySelector("#sockFashionBannerV297")?.remove();
    const banner=document.createElement("section");banner.id="sockFashionBannerV297";banner.className="sock-fashion-banner-v297";banner.setAttribute("aria-label","Sock Gremlin fashion challenge");
    const eyebrow=document.createElement("span");eyebrow.className="sock-fashion-eyebrow-v297";eyebrow.textContent="SOCK GREMLIN FASHION BATTLE";
    const title=document.createElement("strong");title.textContent="Dress Miko to match all 3 prompts!";
    const chips=document.createElement("div");chips.className="sock-fashion-chips-v297";(c.criteria||[]).forEach(item=>{const chip=document.createElement("span");chip.textContent=item.label;chips.append(chip);});
    const note=document.createElement("small");note.textContent="1–3 hearts are awarded based on how many prompts your finished outfit matches. More hearts = better rewards!";
    const done=document.createElement("button");done.type="button";done.className="sock-fashion-done-v297";done.textContent="Done! Judge My Outfit ♡";
    done.addEventListener("click",()=>{const state=challenge();if(!state||state.status!=="closet")return;const results=evaluate(state.criteria),matches=results.filter(item=>item.matched).length;state.criteria=results;state.score=Math.max(1,Math.min(3,matches));state.status="judging";state.completedAt=Date.now();state.outfitSnapshot=JSON.parse(JSON.stringify(save.characterOutfits?.miko||{}));restoreHubCharacter(state);persist();done.disabled=true;done.textContent="Back to Sock Gremlin…";window.location.href="duck-quest/?sock-gremlin-return=1";});
    banner.append(eyebrow,title,chips,note,done);panel.insertBefore(banner,panel.querySelector("#closetOptions"));
  }
  function beginIfNeeded(){
    const params=new URLSearchParams(window.location.search),c=challenge();if(params.get("sock-gremlin")!=="1"||!c||c.status!=="closet")return;
    if(!Array.isArray(c.criteria)||c.criteria.length!==3){c.criteria=generateCriteria();save[KEY]=c;}if(!c.previousHubCharacter)c.previousHubCharacter=save.selectedCharacter||"peep";
    if(save.selectedCharacter!=="miko"){save.selectedCharacter="miko";try{syncSelectedCharacterRoom();}catch(error){}}persist();try{renderPeep();renderRoom();renderClosetCategoryMenu();}catch(error){}openCloset();addChallengeUi(c);
  }
  window.DUCKIE_SOCK_GREMLIN_FASHION_V297=VERSION;setTimeout(beginIfNeeded,0);
})();
