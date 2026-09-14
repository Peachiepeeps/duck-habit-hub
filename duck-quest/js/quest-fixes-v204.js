// Duckie Days v24.204 — chest surprise logic + merchant actions + visible Dash driver.
(function(){
  'use strict';

  window.DUCKIE_DAYS_V204_FIXES='24.204-chest-merchant-driver';

  const CHEST_VISUALS={
    regular:{
      closed:'assets/items/chests/treasure/closed.webp',
      open:'assets/items/chests/treasure/open.webp',
      mimic:'assets/enemies/mimic/base/open-2.webp'
    },
    lucky:{
      closed:'assets/enemies/mimic/lucky/closed.webp',
      open:'assets/enemies/mimic/lucky/open.webp',
      mimic:'assets/enemies/mimic/lucky/idle-2.webp'
    },
    healthy:{
      closed:'assets/enemies/mimic/healthy/closed.webp',
      open:'assets/enemies/mimic/healthy/open.webp',
      mimic:'assets/enemies/mimic/healthy/idle-2.webp'
    },
    amethyst:{
      closed:'assets/shinies/amethyst-mimic-closed.webp',
      open:'assets/shinies/amethyst-mimic-open.webp',
      mimic:'assets/shinies/amethyst-mimic-idle-2.webp'
    }
  };

  function chestStyleId(chest){
    const raw=String(chest?.mimicChestStyle || chest?.enemy?.mimicChestStyle || '').toLowerCase();
    if(raw && CHEST_VISUALS[raw]) return raw;
    if(chest?.mystery) return 'amethyst';
    if(chest?.kind==='healthy') return 'healthy';
    if(chest?.kind==='rare') return 'lucky';
    return 'regular';
  }

  function chestVisual(chest){
    return CHEST_VISUALS[chestStyleId(chest)] || CHEST_VISUALS.regular;
  }

  // Keep normal chests visually normal: closed -> Open -> normal open.
  // Only actual Mimics ever use the mimic reveal frame before battle.
  const baseShowChestV204=showChest;
  showChest=function(data){
    baseShowChestV204(data);
    if(data?.eventType || !ui?.chestSprite) return;
    const visual=chestVisual(data);
    ui.chestSprite.classList.remove('opening');
    ui.chestSprite.src=visual.closed;
  };

  const baseOpenPendingChestV204=openPendingChest;
  openPendingChest=async function(){
    if(!pendingChest || ui?.chestLayer?.classList.contains('hidden')) return;

    // Preserve Continue/reward/event logic from the proven handler.
    if(pendingChest.opened || pendingChest.eventType) return baseOpenPendingChestV204();

    // Purple Mystery Chest decides its surprise only after Open is pressed.
    if(pendingChest.mystery){
      if(ui.openChest.disabled) return;
      actionLocked=true;
      ui.openChest.disabled=true;
      ui.chestSprite.classList.add('opening');
      await sleep(260);

      const visual=CHEST_VISUALS.amethyst;
      const isMimic=Math.random()<AMETHYST_MIMIC_RATE;
      if(isMimic){
        ui.chestSprite.src=visual.mimic;
        ui.chestCaption.textContent='Oh no... it moved!';
        setMessage('The purple chest was an Amethyst Mimic ✨!');
        await sleep(520);
        ui.chestLayer.classList.add('hidden');
        pendingChest=null;
        actionLocked=false;
        startEnemy('mimic',{forceShiny:true,mimicChestStyle:'amethyst'});
        return;
      }

      // Not a Mimic: show only the ordinary open chest, then award treasure.
      ui.chestSprite.src=visual.open;
      pendingChest={kind:'hidden-treasure',hiddenTreasure:true,revealMimic:false,mimicChestStyle:'amethyst'};
      ui.chestCaption.textContent='Hidden Treasure! JACKPOT!';
      setMessage('Hidden Treasure! You found a huge jackpot!');
      ui.openChest.disabled=false;
      actionLocked=false;
      return baseOpenPendingChestV204();
    }

    // Lucky/Healthy/regular chest was predetermined as a Mimic at spawn.
    // The player still sees only the CLOSED chest until pressing Open.
    if(pendingChest.revealMimic){
      if(ui.openChest.disabled) return;
      const style=chestStyleId(pendingChest);
      const visual=chestVisual(pendingChest);
      actionLocked=true;
      ui.openChest.disabled=true;
      ui.chestSprite.classList.add('opening');
      await sleep(260);
      ui.chestSprite.src=visual.mimic;
      ui.chestCaption.textContent='Oh no... it moved!';
      setMessage('The chest was a Mimic!');
      await sleep(520);
      ui.chestLayer.classList.add('hidden');
      pendingChest=null;
      actionLocked=false;
      startEnemy('mimic',{mimicChestStyle:style});
      return;
    }

    // Definitely NOT a Mimic. The existing handler now performs:
    // closed -> Open press -> ordinary open chest -> rewards.
    return baseOpenPendingChestV204();
  };

  function rebindChestButtonV204(){
    const old=document.querySelector('#openChest');
    if(!old) return;
    const fresh=old.cloneNode(true);
    old.replaceWith(fresh);
    if(ui) ui.openChest=fresh;
    fresh.addEventListener('click',openPendingChest);
  }
  rebindChestButtonV204();

  // ---------- Mysterious Merchant ----------
  // Put the wares in the same proven action area used by Fountain/Picnic choices.
  function leaveMerchantV204(message='Gentleman Duck tips his hat and packs up his tiny shop.'){
    ui?.chestLayer?.classList.remove('merchant-active-v197');
    ui?.chestLayer?.querySelector('#merchantShopV197')?.remove();
    ui?.chestLayer?.classList.add('hidden');
    if(ui?.eventChoiceActions){
      ui.eventChoiceActions.innerHTML='';
      ui.eventChoiceActions.classList.add('hidden');
    }
    ui?.battleUi?.classList.remove('event-mode');
    pendingChest=null;
    actionLocked=false;
    setMessage(message);
    nextEncounter();
  }

  function buyMerchantWareV204(ware){
    if(!ware || ware.sold) return;
    if(Number(hubSave?.coins||0)<Number(ware.price||0)){
      setMessage('Not enough Pink Coins for that item.');
      return;
    }
    hubSave.coins=Math.max(0,Number(hubSave.coins||0)-Number(ware.price||0));
    if(ware.kind==='charm'){
      const state=charmState();
      if(!state.owned || typeof state.owned!=='object') state.owned={};
      state.owned[ware.id]=true;
    }else{
      addInventory(ware.id,1);
    }
    ware.sold=true;
    persistAll();
    renderMeta();
    refreshFeatureBadges();
    setMessage(`Bought ${ware.name}!`);
    renderMerchantActionsV204();
  }

  function renderMerchantActionsV204(){
    if(pendingChest?.eventType!=='mysterious-merchant' || !Array.isArray(pendingChest.wares) || !ui?.eventChoiceActions) return;

    // Remove the old invisible/covered merchant shop if it exists.
    ui.chestLayer?.classList.remove('merchant-active-v197');
    ui.chestLayer?.querySelector('#merchantShopV197')?.remove();

    const holder=ui.eventChoiceActions;
    holder.innerHTML='';
    holder.classList.remove('hidden');
    holder.classList.add('merchant-actions-v204');
    ui.battleUi?.classList.add('event-mode');

    for(const ware of pendingChest.wares){
      const button=document.createElement('button');
      button.type='button';
      button.className='pixel-button event-choice-button merchant-choice-v204';
      button.disabled=Boolean(ware.sold);
      button.innerHTML=`<strong>${ware.sold?'Sold — ':''}${ware.name}</strong><small>${ware.detail || ''}${ware.sold?'':` · ${ware.price} Pink Coins`}</small>`;
      button.addEventListener('click',()=>buyMerchantWareV204(ware));
      holder.appendChild(button);
    }

    const leave=document.createElement('button');
    leave.type='button';
    leave.className='pixel-button event-choice-button merchant-choice-v204';
    leave.innerHTML='<strong>No Thanks</strong><small>Leave the tiny roadside shop.</small>';
    leave.addEventListener('click',()=>leaveMerchantV204());
    holder.appendChild(leave);
  }

  const baseStartEncounterV204=startEncounter;
  startEncounter=function(){
    const result=baseStartEncounterV204();
    if(pendingChest?.eventType==='mysterious-merchant'){
      requestAnimationFrame(renderMerchantActionsV204);
    }
    return result;
  };

  // Repair an already-open merchant scene too.
  if(pendingChest?.eventType==='mysterious-merchant') requestAnimationFrame(renderMerchantActionsV204);
})();
