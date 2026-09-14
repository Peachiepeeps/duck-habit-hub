// Duckie Days v24.207 — consolidated chest recovery with direct game-state access.
(function(){
  'use strict';

  window.DUCKIE_DAYS_V207_FIXES='24.207-direct-chest-handler';

  const CHESTS={
    regular:{
      id:'regular',label:'Regular Chest',
      closed:'assets/items/chests/treasure/closed.webp',
      open:'assets/items/chests/treasure/open.webp',
      mimicReveal:'assets/enemies/mimic/base/open-1.webp',
      mimicIdle:['assets/enemies/mimic/base/open-1.webp','assets/enemies/mimic/base/open-2.webp'],
      mimicHurt:'assets/items/chests/treasure/closed.webp',
      mimicName:'Mimic'
    },
    lucky:{
      id:'lucky',label:'Lucky Chest',
      // Corrected real meanings of the files:
      // closed.webp = closed chest
      // idle-1.webp = normal opened chest
      // open.webp = Mimic idle-1
      // idle-2.webp = Mimic idle-2
      closed:'assets/enemies/mimic/lucky/closed.webp',
      open:'assets/enemies/mimic/lucky/idle-1.webp',
      mimicReveal:'assets/enemies/mimic/lucky/open.webp',
      mimicIdle:['assets/enemies/mimic/lucky/open.webp','assets/enemies/mimic/lucky/idle-2.webp'],
      mimicHurt:'assets/enemies/mimic/lucky/closed.webp',
      mimicName:'Lucky Mimic'
    },
    healthy:{
      id:'healthy',label:'Healthy Chest',
      // Corrected real meanings of the files:
      // idle-1.webp = closed chest
      // closed.webp = normal opened chest
      // open.webp = Mimic idle-1
      // idle-2.webp = Mimic idle-2
      closed:'assets/enemies/mimic/healthy/idle-1.webp',
      open:'assets/enemies/mimic/healthy/closed.webp',
      mimicReveal:'assets/enemies/mimic/healthy/open.webp',
      mimicIdle:['assets/enemies/mimic/healthy/open.webp','assets/enemies/mimic/healthy/idle-2.webp'],
      mimicHurt:'assets/enemies/mimic/healthy/idle-1.webp',
      mimicName:'Healthy Mimic'
    },
    amethyst:{
      id:'amethyst',label:'Amethyst Chest',
      closed:'assets/shinies/amethyst-mimic-closed.webp',
      open:'assets/shinies/amethyst-mimic-open.webp',
      mimicReveal:'assets/shinies/amethyst-mimic-idle-1.webp',
      mimicIdle:['assets/shinies/amethyst-mimic-idle-1.webp','assets/shinies/amethyst-mimic-idle-2.webp'],
      mimicHurt:'assets/shinies/amethyst-mimic-closed.webp',
      mimicName:'Amethyst Mimic'
    }
  };

  function styleId(chest){
    const raw=String(chest?.mimicChestStyle || chest?.enemy?.mimicChestStyle || '').toLowerCase();
    if(raw && CHESTS[raw]) return raw;
    if(chest?.mystery) return 'amethyst';
    if(chest?.kind==='healthy') return 'healthy';
    if(chest?.kind==='rare') return 'lucky';
    return 'regular';
  }
  function visual(chest){ return CHESTS[styleId(chest)] || CHESTS.regular; }

  function patchBuddyEntry(key, v){
    try{
      const catalog=BUDDY_CATALOG_BY_KEY?.get?.(key);
      if(catalog){ catalog.idle=[...v.mimicIdle]; catalog.image=v.mimicIdle[0]; catalog.hurt=v.mimicHurt; }
      const saved=hubSave?.buddies?.collection?.[key];
      if(saved){ saved.idle=[...v.mimicIdle]; saved.image=v.mimicIdle[0]; saved.hurt=v.mimicHurt; }
    }catch(error){ /* no-op */ }
  }
  function patchMimicBuddyAssets(){
    patchBuddyEntry('mimic:lucky',CHESTS.lucky);
    patchBuddyEntry('mimic:healthy',CHESTS.healthy);
  }
  patchMimicBuddyAssets();

  const previousShowChest=showChest;
  showChest=function(data){
    previousShowChest(data);
    if(data?.eventType || !ui?.chestSprite) return;
    const v=visual(data);
    ui.chestSprite.classList.remove('opening');
    ui.chestSprite.src=v.closed;
    ui.chestSprite.alt=v.label;
  };

  const previousStartEnemy=startEnemy;
  startEnemy=function(enemyId,options={}){
    const result=previousStartEnemy(enemyId,options);
    if(enemyId==='mimic' && currentEnemy && !options.forceShiny){
      const v=CHESTS[String(options.mimicChestStyle || currentEnemy.mimicChestStyle || 'regular')] || CHESTS.regular;
      currentEnemy.name=v.mimicName;
      currentEnemy.idle=[...v.mimicIdle];
      currentEnemy.hurt=v.mimicHurt;
      currentEnemy.mimicChestStyle=v.id;
      renderEnemyCombatant(currentEnemy,currentEnemy._doubleSlot||0);
      startEnemyIdle();
      renderEnemyName(currentEnemy);
    }
    return result;
  };

  function rewardParts(rewards){
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
    return parts;
  }

  // Keep the already-working event handler for Picnic/Fountain/Merchant paths.
  const previousOpenPendingChest=openPendingChest;

  async function openPendingChestV207(){
    if(!pendingChest || ui.chestLayer.classList.contains('hidden')) return;

    if(pendingChest.opened){
      pendingChest=null;
      ui.openChest.disabled=true;
      ui.openChest.textContent='Open';
      actionLocked=false;
      nextEncounter();
      return;
    }

    if(pendingChest.eventType){
      return previousOpenPendingChest();
    }

    if(ui.openChest.disabled) return;
    actionLocked=true;
    ui.openChest.disabled=true;
    ui.chestSprite.classList.add('opening');
    await sleep(260);

    // Mystery chest decides whether it is really an Amethyst Mimic only when opened.
    if(pendingChest.mystery){
      const v=CHESTS.amethyst;
      const isMimic=Math.random()<AMETHYST_MIMIC_RATE;
      if(isMimic){
        ui.chestSprite.src=v.mimicReveal;
        ui.chestCaption.textContent='Oh no... it moved!';
        setMessage('The purple chest was an Amethyst Mimic ✨!');
        await sleep(520);
        ui.chestLayer.classList.add('hidden');
        pendingChest=null;
        actionLocked=false;
        startEnemy('mimic',{forceShiny:true,mimicChestStyle:'amethyst'});
        return;
      }
      ui.chestSprite.src=v.open;
      pendingChest={kind:'hidden-treasure',hiddenTreasure:true,revealMimic:false,mimicChestStyle:'amethyst'};
      ui.chestCaption.textContent='Hidden Treasure! JACKPOT!';
      setMessage('Hidden Treasure! You found a huge jackpot!');
    } else {
      const id=styleId(pendingChest);
      const v=visual(pendingChest);
      if(pendingChest.revealMimic){
        ui.chestSprite.src=v.mimicReveal;
        ui.chestCaption.textContent='Oh no... it moved!';
        setMessage('The chest was a Mimic!');
        await sleep(520);
        ui.chestLayer.classList.add('hidden');
        pendingChest=null;
        actionLocked=false;
        startEnemy('mimic',{mimicChestStyle:id});
        return;
      }
      // Definitely a normal chest: closed -> press Open -> ordinary opened chest.
      ui.chestSprite.src=v.open;
    }

    const rewards=generateRewards(pendingChest);
    applyRewards(rewards);
    const parts=rewardParts(rewards);
    setMessage(parts.length ? `Rewards: ${parts.join(' · ')}` : 'The chest was empty.');
    ui.openChest.textContent='Continue';
    ui.openChest.disabled=false;
    pendingChest.opened=true;
    actionLocked=false;
    patchMimicBuddyAssets();
    persistAll();
  }

  // Replace the global handler directly — no window.* bridge and no stacked wrappers.
  openPendingChest=openPendingChestV207;

  function bindButton(){
    const old=document.querySelector('#openChest');
    if(!old) return;
    const fresh=old.cloneNode(true);
    old.replaceWith(fresh);
    ui.openChest=fresh;
    fresh.disabled=false;
    fresh.addEventListener('click',openPendingChestV207);
    if(pendingChest){
      fresh.classList.toggle('hidden',Boolean(pendingChest.eventType && !pendingChest.opened));
      fresh.textContent=pendingChest.opened?'Continue':'Open';
    }
  }

  bindButton();
  // game-v96 contains one older zero-delay button rebind. Queue ours after it,
  // so this handler is guaranteed to own the final visible button.
  setTimeout(bindButton,0);
})();
