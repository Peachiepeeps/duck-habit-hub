(function(){
  'use strict';
  const TC=window.DuckieTradingCards;
  if(!TC?.cardCraft?.ensure || !TC?.variantOptions) return;

  const VARIANT_DUST=20;
  const GLITTER='assets/ingredients/Sparkle.webp';
  let previewLayer=null;

  function dataRef(){
    try{
      if(typeof save!=='undefined' && save && typeof save==='object') return save;
    }catch(error){}
    return TC.readSave();
  }

  function commit(data){
    TC.cardCraft.ensure(data);
    try{
      if(typeof save!=='undefined' && data===save && typeof persist==='function'){
        persist();
        return;
      }
    }catch(error){}
    TC.writeSave(data);
  }

  function ensurePreview(){
    if(previewLayer) return previewLayer;
    previewLayer=document.createElement('div');
    previewLayer.className='tc-variant-preview-layer-v270 hidden';
    previewLayer.innerHTML='<section class="tc-variant-preview-card-v270" role="dialog" aria-modal="true" aria-label="Color Variant Preview"><button class="tc-variant-preview-close-v270" type="button" aria-label="Close">×</button><div id="tcVariantPreviewBodyV270"></div></section>';
    document.body.append(previewLayer);
    previewLayer.querySelector('.tc-variant-preview-close-v270')?.addEventListener('click',closePreview);
    previewLayer.addEventListener('click',event=>{if(event.target===previewLayer)closePreview();});
    return previewLayer;
  }

  function closePreview(){
    previewLayer?.classList.add('hidden');
  }

  function previewFace(card,option){
    const face=TC.createFace(card,{locked:false});
    const art=face.querySelector('.tc-art');
    if(art && option?.art){
      art.src=TC.cardArt({...card,art:option.art});
    }
    face.classList.add('tc-variant-preview-face-v270');
    return face;
  }

  function currentWorkshopCard(){
    const face=document.querySelector('.tc-workshop-layer-v264:not(.hidden) .tc-workshop-preview-v264[data-card-id]');
    return face?.dataset?.cardId ? TC.byId[face.dataset.cardId] : null;
  }

  function rerenderWorkshopKeepingScroll(scrollTop){
    window.DuckieCardWorkshopV265?.render?.();
    requestAnimationFrame(()=>{
      const scroller=document.querySelector('.tc-workshop-layer-v264:not(.hidden) .tc-workshop-card-v264');
      if(scroller) scroller.scrollTop=scrollTop;
      window.dispatchEvent(new Event('focus'));
      window.dispatchEvent(new CustomEvent('duckie-card-workshop-updated'));
    });
  }

  function openPreview(card,option){
    if(!card || !option) return;
    const data=dataRef();
    const state=TC.cardCraft.ensure(data);
    const craft=TC.cardCraft.craftFor(card.id,data);
    const unlocked=craft.unlocked.includes(option.id);
    const selected=craft.displayVariant===option.id || (option.id==='default' && !TC.variantOptions(card).some(v=>v.id===craft.displayVariant));
    const balance=Math.max(0,Number(state.powerUpDust)||0);

    const overlay=ensurePreview();
    const body=overlay.querySelector('#tcVariantPreviewBodyV270');
    body.innerHTML='';

    const kicker=document.createElement('p');
    kicker.className='tc-variant-preview-kicker-v270';
    kicker.textContent='COLOR VARIANT PREVIEW';

    const title=document.createElement('h3');
    title.textContent=`${option.label} ${card.name}`;

    const face=previewFace(card,option);

    const cost=document.createElement('p');
    cost.className='tc-variant-preview-cost-v270';
    cost.innerHTML=`<img src="${GLITTER}" alt=""> <span>${unlocked?'Unlocked':`${VARIANT_DUST} Power Up Dust`} · You have ${balance.toLocaleString()}</span>`;

    const note=document.createElement('p');
    note.className='tc-variant-preview-note-v270';
    note.textContent=selected
      ? 'This is the variant currently being displayed.'
      : unlocked
        ? 'This variant is already unlocked. Nothing will be spent.'
        : 'Preview only — no Power Up Dust has been spent yet.';

    const action=document.createElement('button');
    action.type='button';
    action.className='tc-variant-preview-upgrade-v270';

    if(selected){
      action.textContent='Selected';
      action.disabled=true;
    }else if(unlocked){
      action.textContent='Use Variant';
    }else{
      action.textContent='Upgrade';
      action.disabled=balance<VARIANT_DUST;
    }

    action.addEventListener('click',()=>{
      if(action.disabled) return;
      const scroller=document.querySelector('.tc-workshop-layer-v264:not(.hidden) .tc-workshop-card-v264');
      const scrollTop=scroller?.scrollTop||0;
      const d=dataRef();
      const s=TC.cardCraft.ensure(d);
      const crafting=s.crafting;
      if(!Array.isArray(crafting.variantsUnlocked[card.id])) crafting.variantsUnlocked[card.id]=['default'];
      const alreadyUnlocked=crafting.variantsUnlocked[card.id].includes(option.id);

      if(!alreadyUnlocked){
        if(Math.max(0,Number(s.powerUpDust)||0)<VARIANT_DUST) return;
        s.powerUpDust-=VARIANT_DUST;
        s.cardDust=s.powerUpDust;
        crafting.variantsUnlocked[card.id].push(option.id);
      }

      crafting.displayVariant[card.id]=option.id;
      commit(d);
      closePreview();
      rerenderWorkshopKeepingScroll(scrollTop);
    });

    body.append(kicker,title,face,cost,note,action);
    overlay.classList.remove('hidden');
  }

  /* The old v24.265 buttons spend Dust immediately in their target listener.
     Capture the click first so the old listener never fires. */
  document.addEventListener('click',event=>{
    const button=event.target.closest('.tc-variant-grid-v262 .tc-craft-button-v262');
    if(!button) return;

    const grid=button.closest('.tc-variant-grid-v262');
    const buttons=[...grid.querySelectorAll('.tc-craft-button-v262')];
    const index=buttons.indexOf(button);
    const card=currentWorkshopCard();
    const option=card ? TC.variantOptions(card)[index] : null;
    if(!card || !option) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openPreview(card,option);
  },true);

  window.DuckieVariantPreviewV270={close:closePreview};
  window.DUCKIE_CARD_VARIANT_PREVIEW_V270='24.270';
})();
