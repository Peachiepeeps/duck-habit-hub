(function(){
  "use strict";
  const TC=window.DuckieTradingCards;
  if(!TC?.cardCraft) return;

  const DUST_VALUES={common:5,uncommon:12,rare:25,fabled:60};
  const UPGRADE_COSTS={"common:uncommon":40,"uncommon:rare":100};
  const HOLO_DUST=75;
  const HOLO_EXTRAS=3;
  const VARIANT_DUST=20;
  let activeCardId=null;
  let layer=null;

  function dataRef(){
    try{ if(typeof save!=="undefined"&&save&&typeof save==="object") return save; }catch(error){}
    return TC.readSave();
  }
  function commit(data){
    TC.cardCraft.ensure(data);
    try{ if(typeof save!=="undefined"&&data===save&&typeof persist==="function"){persist();return;} }catch(error){}
    TC.writeSave(data);
  }
  function toast(message){
    try{ if(typeof showToast==="function"){showToast(message);return;} }catch(error){}
    console.info(message);
  }
  function dustValue(card){return DUST_VALUES[card?.rarity]||5;}
  function extras(state,cardId){return Math.max(0,Math.floor(Number(state?.owned?.[cardId])||0)-1);}
  function notifyUpdated(cardId){
    ensureDustLine();
    window.dispatchEvent(new CustomEvent("duckie-card-workshop-updated",{detail:{cardId}}));
    window.dispatchEvent(new Event("focus"));
  }
  function ensureDustLine(){
    const info=document.querySelector(".tc-pack-bar > div");
    if(!info)return null;
    let line=info.querySelector(".tc-dust-line-v262");
    if(!line){line=document.createElement("div");line.className="tc-dust-line-v262";line.innerHTML='Power Up Dust <strong id="tcDustCountV262">0</strong>';info.append(line);}
    const state=TC.cardCraft.ensure(dataRef());
    const count=line.querySelector("#tcDustCountV262");
    const next=Number(state.powerUpDust||0).toLocaleString();
    if(count&&count.textContent!==next)count.textContent=next;
    return line;
  }
  function button(label,disabled,onClick,extraClass=""){
    const b=document.createElement("button");b.type="button";b.className=`tc-craft-button-v262 ${extraClass}`.trim();b.textContent=label;b.disabled=Boolean(disabled);if(onClick)b.addEventListener("click",onClick);return b;
  }
  function ensureLayer(){
    if(layer)return layer;
    layer=document.createElement("div");
    layer.className="tc-workshop-layer-v264 hidden";
    layer.innerHTML='<section class="tc-workshop-card-v264" role="dialog" aria-modal="true" aria-label="Card Workshop"><button class="tc-workshop-close-v264" type="button" aria-label="Close Card Workshop">×</button><div id="tcWorkshopBodyV264"></div></section>';
    document.body.append(layer);
    layer.querySelector(".tc-workshop-close-v264")?.addEventListener("click",close);
    layer.addEventListener("click",event=>{if(event.target===layer)close();});
    return layer;
  }
  function close(){if(layer)layer.classList.add("hidden");activeCardId=null;}
  function rerender(cardId,message){if(message)toast(message);notifyUpdated(cardId);render(cardId);}
  function render(cardId){
    const card=TC.byId[cardId];if(!card)return;
    const overlay=ensureLayer(),body=overlay.querySelector("#tcWorkshopBodyV264");
    const data=dataRef(),state=TC.cardCraft.ensure(data),qty=Math.max(0,Math.floor(Number(state.owned?.[card.id])||0));
    if(qty<1){close();return;}
    const craft=TC.cardCraft.craftFor(card.id,data),effective=TC.effectiveRarity(card,data);
    body.innerHTML="";
    const head=document.createElement("div");head.className="tc-workshop-head-v264";
    const preview=TC.createFace(card,{locked:false});preview.classList.add("tc-workshop-preview-v264");
    const copy=document.createElement("div");copy.innerHTML=`<p class="tc-workshop-kicker-v264">CARD WORKSHOP</p><h2>${card.name}</h2><p>${TC.labels[effective]||effective} · Owned ×${qty}</p><p class="tc-workshop-dust-v264">Power Up Dust <strong>${Number(state.powerUpDust||0).toLocaleString()}</strong></p>`;
    head.append(preview,copy);body.append(head);

    const panel=document.createElement("section");panel.className="tc-craft-panel-v262 tc-workshop-sections-v264";

    const duplicate=document.createElement("div");duplicate.className="tc-craft-section-v262";
    const extraCount=extras(state,card.id),per=dustValue(card);
    duplicate.innerHTML=`<div><strong>Extra Copies</strong><small>Your first copy is always protected. Turn extras into Power Up Dust.</small><span class="tc-craft-status-v262">${extraCount} extra · ${per} Dust each</span></div>`;
    const dupActions=document.createElement("div");dupActions.className="tc-craft-actions-v262";
    dupActions.append(
      button(`Convert 1 → ${per} Dust`,extraCount<1,()=>{const d=dataRef(),s=TC.cardCraft.ensure(d);if(extras(s,card.id)<1)return;s.owned[card.id]-=1;s.powerUpDust+=per;commit(d);rerender(card.id,`+${per} Power Up Dust!`);}),
      button(`Convert All → ${extraCount*per} Dust`,extraCount<1,()=>{const d=dataRef(),s=TC.cardCraft.ensure(d),count=extras(s,card.id);if(count<1)return;s.owned[card.id]-=count;s.powerUpDust+=count*per;commit(d);rerender(card.id,`Converted ${count} extras into ${count*per} Power Up Dust!`);},"secondary")
    );duplicate.append(dupActions);panel.append(duplicate);

    const rarity=document.createElement("div");rarity.className="tc-craft-section-v262";
    if(card.rarity==="fabled"){
      rarity.innerHTML='<div><strong>Rarity</strong><small>Fabled is a special rarity and cannot be crafted or upgraded.</small></div><span class="tc-craft-max-v262">FABLED</span>';
    }else{
      const target=effective==="common"?"uncommon":effective==="uncommon"?"rare":null;
      const cost=target?UPGRADE_COSTS[`${effective}:${target}`]:0;
      rarity.innerHTML=`<div><strong>Rarity Upgrade</strong><small>Upgrade this card's display rarity. Pack pull rarity does not change.</small><span class="tc-craft-status-v262">Current: ${TC.labels[effective]}</span></div>`;
      if(target)rarity.append(button(`Upgrade to ${TC.labels[target]} · ${cost} Dust`,state.powerUpDust<cost,()=>{const d=dataRef(),s=TC.cardCraft.ensure(d);if(s.powerUpDust<cost)return;s.powerUpDust-=cost;s.crafting.rarity[card.id]=target;commit(d);rerender(card.id,`${card.name} is now ${TC.labels[target]}!`);}));
      else{const max=document.createElement("span");max.className="tc-craft-max-v262";max.textContent="MAX RARITY";rarity.append(max);}
    }panel.append(rarity);

    const holo=document.createElement("div");holo.className="tc-craft-section-v262";
    if(craft.holo){holo.innerHTML='<div><strong>Holo Finish ✨</strong><small>This card has its permanent Holo finish.</small></div><span class="tc-craft-max-v262">HOLO</span>';}
    else{
      holo.innerHTML=`<div><strong>Holo Finish</strong><small>Uses ${HOLO_EXTRAS} extra copies plus ${HOLO_DUST} Power Up Dust. Your first copy stays protected.</small></div>`;
      const can=extras(state,card.id)>=HOLO_EXTRAS&&state.powerUpDust>=HOLO_DUST;
      holo.append(button(`Apply Holo · ${HOLO_DUST} Dust + ${HOLO_EXTRAS} Extras`,!can,()=>{const d=dataRef(),s=TC.cardCraft.ensure(d);if(extras(s,card.id)<HOLO_EXTRAS||s.powerUpDust<HOLO_DUST)return;s.owned[card.id]-=HOLO_EXTRAS;s.powerUpDust-=HOLO_DUST;s.crafting.holo[card.id]=true;commit(d);rerender(card.id,`${card.name} is now Holo! ✨`);}));
    }panel.append(holo);

    const variants=TC.variantOptions(card);
    if(variants.length>1){
      const variant=document.createElement("div");variant.className="tc-craft-section-v262 tc-variant-section-v262";variant.innerHTML='<div><strong>Color Variant</strong><small>Unlock normal color variants with Power Up Dust. Shinies stay encounter-only.</small></div>';
      const grid=document.createElement("div");grid.className="tc-variant-grid-v262";
      for(const option of variants){
        const unlocked=craft.unlocked.includes(option.id),selected=craft.displayVariant===option.id||(option.id==="default"&&!variants.some(v=>v.id===craft.displayVariant));
        const label=option.id==="default"?option.label:(unlocked?option.label:`${option.label} · ${VARIANT_DUST}`);
        const b=button(label,!unlocked&&state.powerUpDust<VARIANT_DUST,()=>{const d=dataRef(),s=TC.cardCraft.ensure(d),c=s.crafting;if(!Array.isArray(c.variantsUnlocked[card.id]))c.variantsUnlocked[card.id]=["default"];if(!c.variantsUnlocked[card.id].includes(option.id)){if(s.powerUpDust<VARIANT_DUST)return;s.powerUpDust-=VARIANT_DUST;c.variantsUnlocked[card.id].push(option.id);}c.displayVariant[card.id]=option.id;commit(d);rerender(card.id,`${option.label} ${card.name} is now displayed!`);},selected?"selected":"");
        grid.append(b);
      }
      variant.append(grid);panel.append(variant);
    }
    body.append(panel);
  }
  function open(cardId){const card=TC.byId[cardId];if(!card)return;const state=TC.cardCraft.ensure(dataRef());if(Math.max(0,Number(state.owned?.[cardId])||0)<1)return;activeCardId=cardId;ensureLayer().classList.remove("hidden");render(cardId);}

  ensureDustLine();
  window.addEventListener("focus",ensureDustLine);
  window.DuckieCardWorkshopV265={open,close,render:()=>activeCardId&&render(activeCardId)};
  window.DuckieCardWorkshopV264=window.DuckieCardWorkshopV265;
  window.DUCKIE_TRADING_CARD_WORKSHOP_UI="24.265";
})();
