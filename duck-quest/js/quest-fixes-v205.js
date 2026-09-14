// Duckie Days v24.205 — correct Lucky/Healthy Mimic asset label remap.
(function(){
  'use strict';

  window.DUCKIE_DAYS_V205_FIXES='24.205-mimic-label-remap';

  const MIMIC_ASSET_FIX={
    regular:{
      id:'regular',
      label:'Regular Chest',
      disguiseClosed:'assets/items/chests/treasure/closed.webp',
      disguiseOpen:'assets/items/chests/treasure/open.webp',
      revealFrame:'assets/enemies/mimic/base/open-2.webp',
      battleIdle:['assets/enemies/mimic/base/open-1.webp','assets/enemies/mimic/base/open-2.webp'],
      battleHurt:'assets/items/chests/treasure/closed.webp',
      mimicName:'Mimic'
    },
    lucky:{
      id:'lucky',
      label:'Lucky Chest',
      // User-confirmed asset reality:
      // closed.webp = closed chest (correct)
      // idle-1.webp = actual opened chest
      // idle-2.webp = correct Mimic reveal/open frame
      // open.webp = actual idle-1 frame
      disguiseClosed:'assets/enemies/mimic/lucky/closed.webp',
      disguiseOpen:'assets/enemies/mimic/lucky/idle-1.webp',
      revealFrame:'assets/enemies/mimic/lucky/idle-2.webp',
      battleIdle:['assets/enemies/mimic/lucky/open.webp','assets/enemies/mimic/lucky/idle-2.webp'],
      battleHurt:'assets/enemies/mimic/lucky/closed.webp',
      mimicName:'Lucky Mimic'
    },
    healthy:{
      id:'healthy',
      label:'Healthy Chest',
      // User-confirmed asset reality:
      // closed.webp = actual opened chest
      // idle-1.webp = actual closed chest
      // idle-2.webp = correct Mimic reveal/open frame
      // open.webp = actual idle-1 frame
      disguiseClosed:'assets/enemies/mimic/healthy/idle-1.webp',
      disguiseOpen:'assets/enemies/mimic/healthy/closed.webp',
      revealFrame:'assets/enemies/mimic/healthy/idle-2.webp',
      battleIdle:['assets/enemies/mimic/healthy/open.webp','assets/enemies/mimic/healthy/idle-2.webp'],
      battleHurt:'assets/enemies/mimic/healthy/idle-1.webp',
      mimicName:'Healthy Mimic'
    },
    amethyst:{
      id:'amethyst',
      label:'Amethyst Chest',
      disguiseClosed:'assets/shinies/amethyst-mimic-closed.webp',
      disguiseOpen:'assets/shinies/amethyst-mimic-open.webp',
      revealFrame:'assets/shinies/amethyst-mimic-idle-2.webp',
      battleIdle:['assets/shinies/amethyst-mimic-idle-1.webp','assets/shinies/amethyst-mimic-idle-2.webp'],
      battleHurt:'assets/shinies/amethyst-mimic-closed.webp',
      mimicName:'Amethyst Mimic'
    }
  };

  function mimicStyleId(source){
    const raw=String(source?.mimicChestStyle || source?.enemy?.mimicChestStyle || '').toLowerCase();
    if(raw && MIMIC_ASSET_FIX[raw]) return raw;
    if(source?.mystery) return 'amethyst';
    if(source?.kind==='healthy') return 'healthy';
    if(source?.kind==='rare') return 'lucky';
    return 'regular';
  }

  function mimicVisual(source){ return MIMIC_ASSET_FIX[mimicStyleId(source)] || MIMIC_ASSET_FIX.regular; }

  function rewardTextParts(rewards={}){
    const textParts=[];
    if(rewards.coins) textParts.push(`+${rewards.coins} Pink Coins`);
    if(rewards.exp) textParts.push(`+${rewards.exp} EXP`);
    if(rewards.happiness) textParts.push(`♡ +${rewards.happiness} Happiness`);
    else if(rewards.happinessMaxed) textParts.push('♡ Happiness MAX');
    if(rewards.unlockedBackgrounds?.length) textParts.push(rewards.unlockedBackgrounds.map(bg=>`${bg.label} Icon`).join(', '));
    if(rewards.iconBorderStyle) textParts.push(`${rewards.iconBorderStyle.label}`);
    if(rewards.iconBorderColor) textParts.push(`${rewards.iconBorderColor.label} Border Color`);
    if(rewards.items?.length) textParts.push(rewards.items.map(x=>`${x.name} ×${x.qty}`).join(', '));
    if(rewards.charmTreasureBonus) textParts.push('Treasure Charm bonus!');
    if(rewards.unlockedWallpapers?.length) textParts.push(rewards.unlockedWallpapers.map(x=>`${x.label} Wallpaper`).join(', '));
    if(rewards.unlockedClosetRewards?.length) textParts.push(rewards.unlockedClosetRewards.map(x=>x.name).join(', '));
    if(rewards.unlockedUiThemes?.length) textParts.push(rewards.unlockedUiThemes.map(x=>`${x.label} Theme`).join(', '));
    return textParts;
  }

  function patchBuddyEntry(key, idle, hurt){
    try{
      if(Array.isArray(window.BUDDY_CATALOG)){
        const item=window.BUDDY_CATALOG.find(entry=>entry?.key===key);
        if(item){ item.idle=[...idle]; item.image=idle[0]; if(hurt) item.hurt=hurt; }
      }
      if(window.BUDDY_CATALOG_BY_KEY?.get){
        const item=window.BUDDY_CATALOG_BY_KEY.get(key);
        if(item){ item.idle=[...idle]; item.image=idle[0]; if(hurt) item.hurt=hurt; }
      }
      const collection=window.hubSave?.buddies?.collection;
      if(collection && collection[key]){
        collection[key].idle=[...idle];
        collection[key].image=idle[0];
      }
    }catch(error){ /* noop */ }
  }

  function patchMimicCatalogs(){
    patchBuddyEntry('mimic:lucky', MIMIC_ASSET_FIX.lucky.battleIdle, MIMIC_ASSET_FIX.lucky.battleHurt);
    patchBuddyEntry('mimic:healthy', MIMIC_ASSET_FIX.healthy.battleIdle, MIMIC_ASSET_FIX.healthy.battleHurt);
  }

  function applyCurrentMimicAssetFix(style){
    if(!window.currentEnemy || window.currentEnemy.id!=='mimic') return;
    const visual=MIMIC_ASSET_FIX[style] || MIMIC_ASSET_FIX.regular;
    currentEnemy.name=visual.mimicName || currentEnemy.name;
    currentEnemy.idle=[...visual.battleIdle];
    currentEnemy.image=visual.battleIdle[0];
    currentEnemy.hurt=visual.battleHurt;
    currentEnemy.mimicChestStyle=visual.id;
  }

  patchMimicCatalogs();

  const baseShowChestV205=window.showChest;
  window.showChest=function(data){
    const result=baseShowChestV205(data);
    if(data?.eventType || !window.ui?.chestSprite) return result;
    const visual=mimicVisual(data);
    ui.chestSprite.classList.remove('opening');
    ui.chestSprite.src=visual.disguiseClosed;
    ui.chestSprite.alt=visual.label || 'Chest';
    return result;
  };

  const baseStartEnemyV205=window.startEnemy;
  window.startEnemy=function(enemyId, options={}){
    const result=baseStartEnemyV205(enemyId, options);
    try{
      const style=String(options?.mimicChestStyle || window.currentEnemy?.mimicChestStyle || 'regular').toLowerCase();
      if(enemyId==='mimic' && !options?.forceShiny){
        applyCurrentMimicAssetFix(style);
        if(typeof window.renderEnemyIdle==='function') renderEnemyIdle();
      }
    }catch(error){ /* noop */ }
    return result;
  };

  const baseOpenPendingChestV205=window.openPendingChest;
  window.openPendingChest=async function(){
    if(!window.pendingChest || window.ui?.chestLayer?.classList.contains('hidden')) return;

    // Preserve proven Continue/event behavior from the prior handler.
    if(pendingChest.opened || pendingChest.eventType) return baseOpenPendingChestV205();
    if(ui.openChest.disabled) return;

    actionLocked=true;
    ui.openChest.disabled=true;
    ui.chestSprite.classList.add('opening');
    await sleep(260);

    if(pendingChest.mystery){
      const visual=MIMIC_ASSET_FIX.amethyst;
      const isAmethystMimic=Math.random()<AMETHYST_MIMIC_RATE;
      if(isAmethystMimic){
        ui.chestSprite.src=visual.revealFrame;
        ui.chestCaption.textContent='Oh no... it moved!';
        setMessage('The purple chest was an Amethyst Mimic ✨!');
        await sleep(520);
        ui.chestLayer.classList.add('hidden');
        pendingChest=null;
        actionLocked=false;
        startEnemy('mimic',{forceShiny:true,mimicChestStyle:'amethyst'});
        return;
      }
      ui.chestSprite.src=visual.disguiseOpen;
      pendingChest={kind:'hidden-treasure',hiddenTreasure:true,revealMimic:false,mimicChestStyle:'amethyst'};
      ui.chestCaption.textContent='Hidden Treasure! JACKPOT!';
      setMessage('Hidden Treasure! You found a huge jackpot!');
    } else {
      const style=mimicStyleId(pendingChest);
      const visual=mimicVisual(pendingChest);
      if(pendingChest.revealMimic){
        ui.chestSprite.src=visual.revealFrame;
        ui.chestCaption.textContent='Oh no... it moved!';
        setMessage('The chest was a Mimic!');
        await sleep(520);
        ui.chestLayer.classList.add('hidden');
        pendingChest=null;
        actionLocked=false;
        startEnemy('mimic',{mimicChestStyle:style});
        return;
      }
      ui.chestSprite.src=visual.disguiseOpen;
    }

    const rewards=generateRewards(pendingChest);
    applyRewards(rewards);
    const textParts=rewardTextParts(rewards);
    setMessage(textParts.length ? `Rewards: ${textParts.join(' · ')}` : 'The chest was empty.');
    ui.openChest.textContent='Continue';
    ui.openChest.disabled=false;
    pendingChest.opened=true;
    actionLocked=false;
    persistAll();
    patchMimicCatalogs();
  };

  function rebindChestButtonV205(){
    const old=document.querySelector('#openChest');
    if(!old) return;
    const fresh=old.cloneNode(true);
    old.replaceWith(fresh);
    if(window.ui) ui.openChest=fresh;
    fresh.addEventListener('click',openPendingChest);
  }
  rebindChestButtonV205();

  patchMimicCatalogs();
})();
