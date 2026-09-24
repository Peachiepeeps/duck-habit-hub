(function(){
  "use strict";
  const TC=window.DuckieTradingCards;
  if(!TC?.cardCraft) return;

  const DUST_VALUES={common:5,uncommon:12,rare:25,fabled:60};
  const UPGRADE_COSTS={"common:uncommon":40,"uncommon:rare":100};
  const HOLO_DUST=75;
  const HOLO_EXTRAS=3;
  const VARIANT_DUST=20;

  function dataRef(){
    try{ if(typeof save!=="undefined" && save && typeof save==="object") return save; }catch(error){}
    return TC.readSave();
  }
  function commit(data){
    TC.cardCraft.ensure(data);
    try{
      if(typeof save!=="undefined" && data===save && typeof persist==="function"){ persist(); return; }
    }catch(error){}
    TC.writeSave(data);
  }
  function toast(message){
    try{ if(typeof showToast==="function"){ showToast(message); return; } }catch(error){}
    console.info(message);
  }
  function dustValue(card){ return DUST_VALUES[card?.rarity] || 5; }
  function extras(state,cardId){ return Math.max(0,Math.floor(Number(state?.owned?.[cardId])||0)-1); }
  function refreshCollection(){
    window.dispatchEvent(new Event("focus"));
  }

  function ensureDustLine(){
    const info=document.querySelector(".tc-pack-bar > div");
    if(!info) return null;
    let line=info.querySelector(".tc-dust-line-v262");
    if(!line){
      line=document.createElement("div");
      line.className="tc-dust-line-v262";
      line.innerHTML='Card Dust <strong id="tcDustCountV262">0</strong>';
      info.append(line);
    }
    const data=dataRef();
    const state=TC.cardCraft.ensure(data);
    const countNode=line.querySelector("#tcDustCountV262");
    const nextCount=Number(state.cardDust||0).toLocaleString();
    if(countNode && countNode.textContent!==nextCount) countNode.textContent=nextCount;
    return line;
  }

  function setDetailFace(body,card){
    const old=body.querySelector(":scope > .tc-face");
    if(!old) return;
    old.replaceWith(TC.createFace(card,{locked:false}));
  }

  function updateExistingDetailText(body,card,state){
    const effective=TC.effectiveRarity(card,dataRef());
    const firstMeta=body.querySelector("h2 + p");
    const strong=firstMeta?.querySelector("strong");
    if(strong) strong.textContent=TC.labels[effective] || effective;
    const paragraphs=[...body.querySelectorAll(":scope > p")];
    const ownedP=paragraphs.find(p=>/^Owned ×/i.test(p.textContent||""));
    if(ownedP){
      const qty=Math.max(0,Math.floor(Number(state.owned?.[card.id])||0));
      ownedP.textContent=`Owned ×${qty} · Extras ×${Math.max(0,qty-1)}`;
    }
  }

  function button(label,disabled,onClick,extraClass=""){
    const b=document.createElement("button");
    b.type="button";
    b.className=`tc-craft-button-v262 ${extraClass}`.trim();
    b.textContent=label;
    b.disabled=Boolean(disabled);
    if(onClick) b.addEventListener("click",onClick);
    return b;
  }

  function rerender(cardId,message){
    if(message) toast(message);
    ensureDustLine();
    refreshCollection();
    requestAnimationFrame(()=>renderCraftPanel(cardId));
  }

  function renderCraftPanel(cardId){
    const detail=document.querySelector(".tc-detail-layer:not(.hidden)");
    const body=detail?.querySelector("#tcDetailBody");
    const card=TC.byId[cardId];
    if(!body||!card) return;
    body.querySelector(".tc-craft-panel-v262")?.remove();

    const data=dataRef();
    const state=TC.cardCraft.ensure(data);
    const qty=Math.max(0,Math.floor(Number(state.owned?.[card.id])||0));
    if(qty<1) return;
    const craft=TC.cardCraft.craftFor(card.id,data);
    const effective=TC.effectiveRarity(card,data);
    setDetailFace(body,card);
    updateExistingDetailText(body,card,state);

    const panel=document.createElement("section");
    panel.className="tc-craft-panel-v262";
    panel.innerHTML=`<div class="tc-craft-heading-v262"><strong>Card Workshop</strong><span>Card Dust <b>${Number(state.cardDust||0).toLocaleString()}</b></span></div>`;

    const duplicate=document.createElement("div");
    duplicate.className="tc-craft-section-v262";
    const extraCount=extras(state,card.id);
    const per=dustValue(card);
    duplicate.innerHTML=`<div><strong>Extra Copies</strong><small>Keep your first copy forever. Extras can become Card Dust.</small><span class="tc-craft-status-v262">${extraCount} extra · ${per} Dust each</span></div>`;
    const dupActions=document.createElement("div");
    dupActions.className="tc-craft-actions-v262";
    dupActions.append(
      button(`Convert 1 → ${per} Dust`,extraCount<1,()=>{
        const d=dataRef(),s=TC.cardCraft.ensure(d);
        if(extras(s,card.id)<1) return;
        s.owned[card.id]-=1; s.cardDust+=per; commit(d);
        rerender(card.id,`+${per} Card Dust!`);
      }),
      button(`Convert All → ${extraCount*per} Dust`,extraCount<1,()=>{
        const d=dataRef(),s=TC.cardCraft.ensure(d),count=extras(s,card.id);
        if(count<1) return;
        s.owned[card.id]-=count; s.cardDust+=count*per; commit(d);
        rerender(card.id,`Converted ${count} extras into ${count*per} Card Dust!`);
      },"secondary")
    );
    duplicate.append(dupActions);
    panel.append(duplicate);

    const rarity=document.createElement("div");
    rarity.className="tc-craft-section-v262";
    if(card.rarity==="fabled"){
      rarity.innerHTML='<div><strong>Rarity</strong><small>Fabled is a special rarity and cannot be crafted or upgraded.</small></div>';
    }else{
      const target=effective==="common"?"uncommon":effective==="uncommon"?"rare":null;
      const cost=target?UPGRADE_COSTS[`${effective}:${target}`]:0;
      rarity.innerHTML=`<div><strong>Rarity Upgrade</strong><small>Upgraded rarity changes this copy's display frame; pack pull rarity stays unchanged.</small><span class="tc-craft-status-v262">Current: ${TC.labels[effective]}</span></div>`;
      if(target){
        rarity.append(button(`Upgrade to ${TC.labels[target]} · ${cost} Dust`,state.cardDust<cost,()=>{
          const d=dataRef(),s=TC.cardCraft.ensure(d);
          if(s.cardDust<cost) return;
          s.cardDust-=cost; s.crafting.rarity[card.id]=target; commit(d);
          rerender(card.id,`${card.name} is now ${TC.labels[target]}!`);
        }));
      }else{
        const max=document.createElement("span");max.className="tc-craft-max-v262";max.textContent="MAX RARITY";rarity.append(max);
      }
    }
    panel.append(rarity);

    const holo=document.createElement("div");
    holo.className="tc-craft-section-v262";
    if(craft.holo){
      holo.innerHTML='<div><strong>Holo Finish ✨</strong><small>This card has its permanent Holo finish.</small></div><span class="tc-craft-max-v262">HOLO</span>';
    }else{
      holo.innerHTML=`<div><strong>Holo Finish</strong><small>Uses ${HOLO_EXTRAS} extra copies plus ${HOLO_DUST} Card Dust. Your first copy is protected.</small></div>`;
      const canHolo=extras(state,card.id)>=HOLO_EXTRAS && state.cardDust>=HOLO_DUST;
      holo.append(button(`Apply Holo · ${HOLO_DUST} Dust + ${HOLO_EXTRAS} Extras`,!canHolo,()=>{
        const d=dataRef(),s=TC.cardCraft.ensure(d);
        if(extras(s,card.id)<HOLO_EXTRAS || s.cardDust<HOLO_DUST) return;
        s.owned[card.id]-=HOLO_EXTRAS; s.cardDust-=HOLO_DUST; s.crafting.holo[card.id]=true; commit(d);
        rerender(card.id,`${card.name} is now Holo! ✨`);
      }));
    }
    panel.append(holo);

    const variants=TC.variantOptions(card);
    if(variants.length>1){
      const variant=document.createElement("div");
      variant.className="tc-craft-section-v262 tc-variant-section-v262";
      variant.innerHTML='<div><strong>Color Variant</strong><small>Unlock normal color variants with Card Dust. Shiny variants stay encounter-only.</small></div>';
      const grid=document.createElement("div");
      grid.className="tc-variant-grid-v262";
      for(const option of variants){
        const unlocked=craft.unlocked.includes(option.id);
        const selected=craft.displayVariant===option.id || (option.id==="default"&&!variants.some(v=>v.id===craft.displayVariant));
        const label=option.id==="default"?option.label:(unlocked?option.label:`${option.label} · ${VARIANT_DUST}`);
        const b=button(label,!unlocked && state.cardDust<VARIANT_DUST,()=>{
          const d=dataRef(),s=TC.cardCraft.ensure(d),c=s.crafting;
          if(!Array.isArray(c.variantsUnlocked[card.id])) c.variantsUnlocked[card.id]=["default"];
          if(!c.variantsUnlocked[card.id].includes(option.id)){
            if(s.cardDust<VARIANT_DUST) return;
            s.cardDust-=VARIANT_DUST;
            c.variantsUnlocked[card.id].push(option.id);
          }
          c.displayVariant[card.id]=option.id;
          commit(d);
          rerender(card.id,`${option.label} ${card.name} is now displayed!`);
        },selected?"selected":"");
        if(!unlocked && option.id!=="default") b.title=`Unlock for ${VARIANT_DUST} Card Dust`;
        grid.append(b);
      }
      variant.append(grid);
      panel.append(variant);
    }

    body.append(panel);
  }

  // v24.263: only watch the detail layer itself. The v24.262 observer watched
  // the whole document including childList mutations, while its own callback
  // edited Card Dust text / rebuilt the craft panel. That could continuously
  // trigger itself and starve the app's startup/render loop on mobile.
  const detailLayer=document.querySelector(".tc-detail-layer");
  if(detailLayer){
    const detailObserver=new MutationObserver(()=>{
      ensureDustLine();
      if(detailLayer.classList.contains("hidden")) return;
      const face=detailLayer.querySelector("#tcDetailBody > .tc-face[data-card-id]");
      if(face) renderCraftPanel(face.dataset.cardId);
    });
    detailObserver.observe(detailLayer,{attributes:true,attributeFilter:["class"]});
  }

  document.addEventListener("click",event=>{
    const entry=event.target.closest?.(".tc-entry");
    if(!entry) return;
    setTimeout(()=>{
      const face=document.querySelector(".tc-detail-layer:not(.hidden) #tcDetailBody > .tc-face[data-card-id]");
      if(face) renderCraftPanel(face.dataset.cardId);
    },0);
  },true);

  ensureDustLine();
  window.addEventListener("focus",ensureDustLine);
  window.DUCKIE_TRADING_CARD_WORKSHOP_UI="24.263";
})();
