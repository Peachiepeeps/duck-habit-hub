// Duckie Days v24.209 — event completion recovery + compact event art + seated Dash rider.
(function(){
  'use strict';

  window.DUCKIE_DAYS_V209_FIXES='24.209-event-recovery-dash-seat';

  // ---------- Visual polish ----------
  const style=document.createElement('style');
  style.id='duckieDaysV209Style';
  style.textContent=`
    /* Keep Picnic/Fountain/Gentleman Duck comfortably inside the battlefield. */
    #chestLayer .event-scene-art{
      width:min(122px,30vw)!important;
      height:min(122px,30vw)!important;
      max-width:122px!important;
      max-height:122px!important;
      object-fit:contain!important;
      image-rendering:pixelated!important;
    }
    #chestLayer .event-scene-art.merchant-duck,
    #chestLayer .merchant-duck{
      width:min(100px,25vw)!important;
      height:min(100px,25vw)!important;
      max-width:100px!important;
      max-height:100px!important;
    }
    #chestLayer:has(.event-scene-art){
      gap:5px!important;
      padding:8px!important;
    }
    #chestLayer:has(.event-scene-art) #chestCaption{
      max-width:min(92%,430px)!important;
      line-height:1.2!important;
      padding:6px 9px!important;
    }

    /* v24.208 rider: OC sits BEHIND the duck and lower in the seat. */
    #dashRunner.dash-runner-v208 .dash-cart-v208{
      z-index:6!important;
    }
    #dashRunner.dash-runner-v208 .dash-driver-v208{
      width:64%!important;
      height:96%!important;
      left:6%!important;
      top:-6%!important;
      z-index:4!important;
      object-fit:contain!important;
      object-position:center top!important;
      clip-path:none!important;
      filter:drop-shadow(0 1px 0 rgba(0,0,0,.12));
    }

    /* Event completion must always reveal the post-floor controls. */
    #battleScreen .battle-ui.reward-mode #postFloorActions:not(.hidden){
      display:grid!important;
      visibility:visible!important;
      opacity:1!important;
    }
  `;
  document.head.appendChild(style);

  // Short captions leave more room for the actual scene art on phones.
  const previousShowChestV209=showChest;
  showChest=function(data){
    const result=previousShowChestV209(data);
    if(!data?.eventType || !ui?.chestSprite) return result;

    if(data.eventType==='lucky-picnic'){
      ui.chestCaption.textContent='Lucky Picnic';
      ui.chestSprite.src='assets/events/Picnic.png';
      ui.chestSprite.classList.add('event-scene-art');
    }else if(data.eventType==='wishing-fountain'){
      ui.chestCaption.textContent='Wishing Fountain';
      ui.chestSprite.src='assets/events/Fountain.png';
      ui.chestSprite.classList.add('event-scene-art');
    }else if(data.eventType==='mysterious-merchant'){
      ui.chestCaption.textContent='Mysterious Merchant';
      ui.chestSprite.classList.add('event-scene-art','merchant-duck');
    }
    return result;
  };

  function rewardPartsV209(rewards={}){
    const parts=[];
    if(rewards.coins) parts.push(`+${rewards.coins} Pink Coins`);
    if(rewards.exp) parts.push(`+${rewards.exp} EXP`);
    if(rewards.happiness) parts.push(`♡ +${rewards.happiness} Happiness`);
    else if(rewards.happinessMaxed) parts.push('♡ Happiness MAX');
    if(rewards.unlockedBackgrounds?.length) parts.push(rewards.unlockedBackgrounds.map(bg=>`${bg.label} Icon`).join(', '));
    if(rewards.iconBorderStyle) parts.push(`${rewards.iconBorderStyle.label}`);
    if(rewards.iconBorderColor) parts.push(`${rewards.iconBorderColor.label} Border Color`);
    if(rewards.items?.length) parts.push(rewards.items.map(x=>`${x.name} ×${x.qty}`).join(', '));
    if(rewards.charmTreasureBonus) parts.push('Treasure Charm bonus!');
    if(rewards.unlockedWallpapers?.length) parts.push(rewards.unlockedWallpapers.map(x=>`${x.label} Wallpaper`).join(', '));
    if(rewards.unlockedClosetRewards?.length) parts.push(rewards.unlockedClosetRewards.map(x=>x.name).join(', '));
    if(rewards.unlockedUiThemes?.length) parts.push(rewards.unlockedUiThemes.map(x=>`${x.label} Theme`).join(', '));
    if(Number(rewards.freeDashRuns)>0) parts.push(`Free Duckie Dash Run ×${Math.floor(Number(rewards.freeDashRuns))}`);
    return parts;
  }

  async function resolveChoiceEventV209(){
    if(!pendingChest || !['lucky-picnic','wishing-fountain'].includes(pendingChest.eventType)) return false;
    if(!pendingChest.eventChoice || actionLocked) return true;

    actionLocked=true;
    hideEventChoices();
    ui.battleUi?.classList.remove('event-mode');
    ui.openChest?.classList.add('hidden');

    const picnic=pendingChest.eventType==='lucky-picnic';
    ui.chestSprite.src=picnic?'assets/events/Picnic.png':'assets/events/Fountain.png';
    ui.chestSprite.classList.add('event-scene-art');
    ui.chestSprite.classList.remove('opening');
    ui.chestCaption.textContent=picnic?'Lucky Picnic':'Wishing Fountain';

    const choiceName=eventChoiceLabel(pendingChest.eventType,pendingChest.eventChoice);
    setMessage(picnic
      ? `${choiceName}! The picnic turned into a lovely little break.`
      : `${choiceName}! The Wishing Fountain sparkles...`);
    await sleep(120);

    const rewards=generateRewards(pendingChest);
    applyRewards(rewards);
    const parts=rewardPartsV209(rewards);
    setMessage(parts.length ? `Rewards: ${parts.join(' · ')}` : `${choiceName} complete!`);

    if(currentRun){
      currentRun.hp=currentRun.maxHp;
      renderPeepHp();
      markEndlessFloorComplete();
    }

    pendingChest.opened=true;
    pendingChest.eventResolvedV209=true;
    persistAll();
    try{renderMeta?.();}catch(error){}

    // This order matters: clear event-mode first, then turn on reward-mode.
    ui.battleUi?.classList.remove('event-mode');
    ui.continueButton.textContent=currentRun?.mode==='endless'?'Next Floor':'Continue';
    ui.postFloorActions?.classList.remove('hidden');
    ui.leaveEndlessButton?.classList.toggle('hidden',currentRun?.mode!=='endless');
    setPostFloorLayout(true);
    actionLocked=false;

    requestAnimationFrame(()=>{
      ui.battleUi?.classList.remove('event-mode');
      ui.postFloorActions?.classList.remove('hidden');
      setPostFloorLayout(true);
    });
    return true;
  }

  // v207 remains responsible for every normal/Mimic chest. We intercept only the
  // two choice events that were getting stuck after their reward was granted.
  const previousOpenPendingChestV209=openPendingChest;
  openPendingChest=async function(){
    if(pendingChest?.eventType==='lucky-picnic' || pendingChest?.eventType==='wishing-fountain'){
      return resolveChoiceEventV209();
    }
    return previousOpenPendingChestV209();
  };

  // The choice buttons resolve `openPendingChest` at click time, but re-opened event
  // screens can sometimes contain older buttons. Refresh just those two choice sets.
  const previousShowEventChoicesV209=showEventChoices;
  showEventChoices=function(type){
    const result=previousShowEventChoicesV209(type);
    if(type==='lucky-picnic' || type==='wishing-fountain'){
      ui.battleUi?.classList.add('event-mode');
      ui.postFloorActions?.classList.add('hidden');
      setPostFloorLayout(false);
    }
    return result;
  };
})();
