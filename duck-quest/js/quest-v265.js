// Duckie Days v24.265 — Buddy Box, individual Buddy levels, Power Up Dust, Dash layout.
(function(){
  'use strict';
  const TC=window.DuckieTradingCards;
  const CHARACTER_IDS=['peep','miko','io','miho','annika'];
  const RELEASE_DUST={normal:10,boss:25,shiny:50};

  function dustState(){
    const state=TC?.cardCraft?.ensure?.(hubSave);
    if(!state)return null;
    if(!Number.isFinite(Number(state.powerUpDust)))state.powerUpDust=Math.max(0,Math.floor(Number(state.cardDust)||0));
    state.powerUpDust=Math.max(0,Math.floor(Number(state.powerUpDust)||0));
    state.cardDust=state.powerUpDust;
    return state;
  }
  function dustBalance(){return Math.max(0,Number(dustState()?.powerUpDust)||0);}
  function addDust(amount){const state=dustState();if(!state)return 0;state.powerUpDust=Math.max(0,Number(state.powerUpDust)||0)+Math.max(0,Math.floor(Number(amount)||0));state.cardDust=state.powerUpDust;return state.powerUpDust;}
  function spendDust(amount){const state=dustState();const n=Math.max(0,Math.floor(Number(amount)||0));if(!state||state.powerUpDust<n)return false;state.powerUpDust-=n;state.cardDust=state.powerUpDust;return true;}

  function uid(){return `buddy-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;}
  function instanceFromRecord(record){
    return {
      id:uid(),key:String(record?.key||''),enemyId:String(record?.enemyId||''),variantId:String(record?.variantId||'base'),
      name:String(record?.name||'Buddy'),image:String(record?.image||''),idle:Array.isArray(record?.idle)?record.idle.slice():[],
      shiny:Boolean(record?.shiny),boss:Boolean(record?.boss),level:1,favorite:false,locked:false,capturedAt:Number(record?.capturedAt)||Date.now(),nickname:'',gender:''
    };
  }

  function ensureBox(options={}){
    ensureBuddySave();
    let changed=false;
    if(!hubSave.buddyBoxV265||typeof hubSave.buddyBoxV265!=='object'||Array.isArray(hubSave.buddyBoxV265)){
      hubSave.buddyBoxV265={version:1,entries:[],equippedInstanceByCharacter:{}};changed=true;
    }
    const box=hubSave.buddyBoxV265;
    if(!Array.isArray(box.entries)){box.entries=[];changed=true;}
    box.entries=box.entries.filter(entry=>entry&&typeof entry==='object'&&entry.id&&entry.key).map(entry=>({
      ...entry,level:Math.max(1,Math.min(100,Math.floor(Number(entry.level)||1))),favorite:Boolean(entry.favorite),locked:Boolean(entry.locked),nickname:String(entry.nickname||'').slice(0,20),gender:['female','male','nonbinary'].includes(entry.gender)?entry.gender:''
    }));
    if(!box.equippedInstanceByCharacter||typeof box.equippedInstanceByCharacter!=='object') {box.equippedInstanceByCharacter={};changed=true;}
    CHARACTER_IDS.forEach(id=>{
      if(!Array.isArray(box.equippedInstanceByCharacter[id])){box.equippedInstanceByCharacter[id]=Array(6).fill(null);changed=true;}
      box.equippedInstanceByCharacter[id]=Array.from({length:6},(_,i)=>typeof box.equippedInstanceByCharacter[id][i]==='string'?box.equippedInstanceByCharacter[id][i]:null);
    });

    if(options.reconcile!==false){
      // Legacy save migration: turn each aggregate Buddy copy into an individual Box entry.
      for(const record of Object.values(hubSave.buddies.collection||{})){
        if(!record?.key)continue;
        const wanted=Math.max(1,Math.floor(Number(record.quantity)||1));
        const current=box.entries.filter(entry=>entry.key===record.key).length;
        for(let i=current;i<wanted;i++){box.entries.push(instanceFromRecord(record));changed=true;}
      }
      changed=syncBoxAssignments(box)||changed;
    }
    if(changed&&options.persist!==false){try{persistAll();}catch(error){}}
    return box;
  }

  function syncBoxAssignments(box=hubSave.buddyBoxV265){
    if(!box)return false;
    let changed=false;
    const used=new Set();
    CHARACTER_IDS.forEach(characterId=>{
      const slots=hubSave.buddies?.equippedByCharacter?.[characterId]||Array(6).fill(null);
      const personals=hubSave.buddies?.personalizationByCharacter?.[characterId]||Array(6).fill(null);
      const mapped=box.equippedInstanceByCharacter[characterId]||Array(6).fill(null);
      for(let i=0;i<6;i++){
        const key=typeof slots[i]==='string'?slots[i]:null;
        if(!key){if(mapped[i]){mapped[i]=null;changed=true;}continue;}
        let instance=box.entries.find(entry=>entry.id===mapped[i]&&entry.key===key&&!used.has(entry.id));
        if(!instance)instance=box.entries.find(entry=>entry.key===key&&!used.has(entry.id));
        if(!instance){
          const record=hubSave.buddies.collection?.[key];
          if(record){instance=instanceFromRecord(record);box.entries.push(instance);changed=true;}
        }
        if(instance){
          if(mapped[i]!==instance.id){mapped[i]=instance.id;changed=true;}
          used.add(instance.id);
          const personal=personals[i];
          if(personal?.nickname&&instance.nickname!==personal.nickname){instance.nickname=String(personal.nickname).slice(0,20);changed=true;}
          if(personal?.gender&&instance.gender!==personal.gender){instance.gender=personal.gender;changed=true;}
        }
      }
      box.equippedInstanceByCharacter[characterId]=mapped;
    });
    return changed;
  }

  function boxEntry(id){return ensureBox({persist:false}).entries.find(entry=>entry.id===id)||null;}
  function entryForSlot(characterId,slotIndex){
    const box=ensureBox({persist:false});syncBoxAssignments(box);
    const id=box.equippedInstanceByCharacter?.[characterId]?.[slotIndex];
    return id?box.entries.find(entry=>entry.id===id)||null:null;
  }
  function entryEquippedLocation(entryId){
    const box=ensureBox({persist:false});
    for(const characterId of CHARACTER_IDS){
      const index=(box.equippedInstanceByCharacter[characterId]||[]).indexOf(entryId);
      if(index>=0)return {characterId,slotIndex:index};
    }
    return null;
  }
  function familyCount(key){return ensureBox({persist:false}).entries.filter(entry=>entry.key===key).length;}

  // Capture remains compatible with Buddy Book quantities while adding an individual Box Buddy.
  try{
    if(typeof captureBuddy==='function'){
      const priorCaptureBuddy=captureBuddy;
      captureBuddy=function(enemy){
        ensureBox();
        const record=priorCaptureBuddy.apply(this,arguments);
        const box=ensureBox({reconcile:false,persist:false});
        if(record){box.entries.push(instanceFromRecord(record));}
        try{persistAll();}catch(error){}
        return record;
      };
    }
  }catch(error){console.warn('Buddy capture v24.265 wrapper skipped',error);}

  // Bind the legacy equipped species slots to individual Box copies and expose their levels in battle.
  try{
    if(typeof buddyRecordForSlot==='function'){
      const priorBuddyRecordForSlot=buddyRecordForSlot;
      buddyRecordForSlot=function(slotIndex=0){
        const record=priorBuddyRecordForSlot.apply(this,arguments);
        if(!record)return record;
        const box=ensureBox({persist:false});
        if(syncBoxAssignments(box)){try{persistAll();}catch(error){}}
        const instance=entryForSlot(activeCharacterId,Math.max(0,Math.min(5,Math.floor(Number(slotIndex)||0))));
        if(!instance)return record;
        return {...record,buddyInstanceId:instance.id,level:instance.level,nickname:instance.nickname||record.nickname,gender:instance.gender||record.gender};
      };
    }
  }catch(error){}

  function levelT(level){return Math.max(0,Math.min(1,(Math.max(1,Math.min(100,Number(level)||1))-1)/99));}
  function buddyPowerFactor(level){return .35+2.65*Math.pow(levelT(level),1.7);}
  function nextLevelCost(level){const l=Math.max(1,Math.min(99,Math.floor(Number(level)||1)));return Math.max(2,Math.round(2+.018*Math.pow(l,1.8)));}
  function totalLevelCost(level,steps){let cost=0,l=Math.max(1,Math.floor(Number(level)||1));for(let i=0;i<steps&&l<100;i++,l++)cost+=nextLevelCost(l);return cost;}
  function maxAffordableLevels(level,balance){let l=Math.max(1,Math.floor(Number(level)||1)),spent=0,count=0;while(l<100){const c=nextLevelCost(l);if(spent+c>balance)break;spent+=c;l++;count++;}return {count,cost:spent};}

  function scaledBuddySkill(skill,level){
    if(!skill)return skill;
    const f=buddyPowerFactor(level),t=levelT(level),out={...skill};
    const scale=(name,cap=Infinity)=>{if(Number.isFinite(Number(skill[name])))out[name]=Math.min(cap,Number(skill[name])*f);};
    scale('multiplier',5);scale('healPercent',.80);scale('attackDown',.75);scale('damageReduction',.80);scale('missChance',.75);
    scale('stunChance',.85);scale('attackBoost',1.5);scale('defenseDown',1.2);scale('drainPercent',1);scale('weakenChance',.85);
    if(Number.isFinite(Number(skill.critChance)))out.critChance=Math.min(.90,Number(skill.critChance)*(.55+1.45*t));
    if(Number.isFinite(Number(skill.critMultiplier)))out.critMultiplier=1+(Number(skill.critMultiplier)-1)*f;
    if(Number.isFinite(Number(skill.nextAttackMultiplier))){const reduction=1-Number(skill.nextAttackMultiplier);out.nextAttackMultiplier=Math.max(.15,1-reduction*f);}
    if(Number.isFinite(Number(skill.duration)))out.duration=Math.max(1,Math.round(Number(skill.duration)*(.75+.5*t)));
    if(skill.type==='jackpot'){
      out.multiplier=1.6*f;out.critChance=Math.min(.9,.12*(.55+1.45*t));out.critMultiplier=1+.6*f;out.healPercent=Math.min(.8,.25*f);out.coinMultiplier=f;
    }
    return out;
  }

  // Temporarily scale the active Buddy's skill for this action. This keeps all existing skill logic intact.
  try{
    if(typeof useBuddySkill==='function'){
      const priorUseBuddySkill=useBuddySkill;
      useBuddySkill=async function(){
        const buddy=activeBattleBuddyRecord?.();
        const enemyId=String(buddy?.enemyId||'');
        const original=BUDDY_SKILLS?.[enemyId];
        if(!original||!buddy)return priorUseBuddySkill.apply(this,arguments);
        BUDDY_SKILLS[enemyId]=scaledBuddySkill(original,buddy.level||1);
        try{return await priorUseBuddySkill.apply(this,arguments);}finally{BUDDY_SKILLS[enemyId]=original;}
      };
    }
  }catch(error){console.warn('Buddy level scaling v24.265 skipped',error);}

  try{
    if(typeof renderBattleBuddy==='function'){
      const priorRenderBattleBuddy=renderBattleBuddy;
      renderBattleBuddy=function(){const result=priorRenderBattleBuddy.apply(this,arguments);const buddy=activeBattleBuddyRecord?.();if(buddy&&ui?.buddyBattleName)ui.buddyBattleName.textContent=`${buddy.name||'Buddy'}${buddy.genderSymbol?` ${buddy.genderSymbol}`:''} · Lv. ${buddy.level||1}`;return result;};
    }
    if(typeof renderBattleBuddySwitchMenu==='function'){
      const priorSwitchMenu=renderBattleBuddySwitchMenu;
      renderBattleBuddySwitchMenu=function(){const result=priorSwitchMenu.apply(this,arguments);document.querySelectorAll('#buddySwitchGrid .buddy-switch-card[data-slot]').forEach(card=>{const buddy=buddyRecordForSlot(Number(card.dataset.slot));const strong=card.querySelector('.buddy-switch-copy strong');if(buddy&&strong&&!strong.querySelector('.buddy-level-inline-v265')){const level=document.createElement('span');level.className='buddy-level-inline-v265';level.textContent=` Lv. ${buddy.level||1}`;strong.append(level);}});return result;};
    }
  }catch(error){}

  // ---- Buddy Box UI -------------------------------------------------------
  let boxLayer=null,selectedEntryId=null,boxFilter='all',boxSort='newest';
  function characterName(id){try{return CHARACTERS?.[id]?.name||id;}catch(error){return id;}}
  function visibleCharacters(){try{const list=availableQuestCharacters?.();if(Array.isArray(list)&&list.length)return list;}catch(error){}return CHARACTER_IDS.filter(id=>hubSave.unlockedCharacters?.includes(id)||id==='peep');}
  function releaseValue(entry){return entry.shiny?RELEASE_DUST.shiny:entry.boss?RELEASE_DUST.boss:RELEASE_DUST.normal;}

  function ensureBoxLayer(){
    if(boxLayer)return boxLayer;
    boxLayer=document.createElement('section');boxLayer.id='buddyBoxLayerV265';boxLayer.className='buddy-box-layer-v265 hidden';boxLayer.setAttribute('aria-hidden','true');
    boxLayer.innerHTML=`<div class="buddy-box-card-v265"><div class="buddy-box-head-v265"><div><span class="mini-label">BUDDY BOX</span><h2>Your Buddies</h2></div><div class="buddy-box-dust-v265">✦ <strong id="buddyBoxDustV265">0</strong></div><button id="closeBuddyBoxV265" class="pixel-button small" type="button">Close</button></div><div class="buddy-box-tools-v265"><div class="buddy-box-filters-v265"><button class="selected" data-box-filter="all" type="button">All</button><button data-box-filter="favorites" type="button">Favorites</button><button data-box-filter="shiny" type="button">Shiny ✨</button></div><label>Sort <select id="buddyBoxSortV265"><option value="newest">Newest</option><option value="level">Highest Level</option><option value="name">Name</option></select></label></div><div id="buddyBoxGridV265" class="buddy-box-grid-v265"></div><p id="buddyBoxEmptyV265" class="buddy-box-empty-v265 hidden">No Buddies match this view yet.</p><section id="buddyBoxDetailV265" class="buddy-box-detail-v265 hidden"></section></div>`;
    document.body.append(boxLayer);
    boxLayer.querySelector('#closeBuddyBoxV265')?.addEventListener('click',closeBuddyBox);
    boxLayer.querySelectorAll('[data-box-filter]').forEach(button=>button.addEventListener('click',()=>{boxFilter=button.dataset.boxFilter||'all';renderBuddyBox();}));
    boxLayer.querySelector('#buddyBoxSortV265')?.addEventListener('change',event=>{boxSort=event.target.value;renderBuddyBox();});
    return boxLayer;
  }

  function buddyTileImage(entry){const img=document.createElement('img');img.src=entry.image||entry.idle?.[0]||'';img.alt='';img.loading='lazy';img.decoding='async';return img;}
  function renderBuddyBox(){
    const layer=ensureBoxLayer(),box=ensureBox();syncBoxAssignments(box);
    layer.querySelector('#buddyBoxDustV265').textContent=dustBalance().toLocaleString();
    layer.querySelectorAll('[data-box-filter]').forEach(button=>button.classList.toggle('selected',button.dataset.boxFilter===boxFilter));
    const sort=layer.querySelector('#buddyBoxSortV265');if(sort)sort.value=boxSort;
    let entries=[...box.entries];
    if(boxFilter==='favorites')entries=entries.filter(e=>e.favorite);else if(boxFilter==='shiny')entries=entries.filter(e=>e.shiny);
    entries.sort((a,b)=>boxSort==='level'?(b.level-a.level)||String(a.name).localeCompare(String(b.name)):boxSort==='name'?String(a.name).localeCompare(String(b.name)):(Number(b.capturedAt)||0)-(Number(a.capturedAt)||0));
    const grid=layer.querySelector('#buddyBoxGridV265');grid.innerHTML='';
    entries.forEach(entry=>{
      const button=document.createElement('button');button.type='button';button.className=`buddy-box-tile-v265${entry.shiny?' shiny':''}${entry.favorite?' favorite':''}`;button.dataset.instanceId=entry.id;
      const art=document.createElement('span');art.className='buddy-box-art-v265';art.append(buddyTileImage(entry));if(entry.shiny){const s=document.createElement('i');s.textContent='✦';art.append(s);}
      const name=document.createElement('strong');name.textContent=entry.nickname||entry.name;
      const level=document.createElement('span');level.textContent=`Lv. ${entry.level}`;
      const location=entryEquippedLocation(entry.id);const status=document.createElement('small');status.textContent=location?`${characterName(location.characterId)} · Slot ${location.slotIndex+1}`:(entry.favorite?'♥ Favorite':'In Box');
      button.append(art,name,level,status);button.addEventListener('click',()=>openBuddyBoxDetail(entry.id));grid.append(button);
    });
    layer.querySelector('#buddyBoxEmptyV265').classList.toggle('hidden',entries.length>0);
    if(selectedEntryId&&!boxEntry(selectedEntryId))closeBuddyBoxDetail();
    else if(selectedEntryId)renderBuddyBoxDetail(selectedEntryId);
  }

  function openBuddyBox(){ensureBoxLayer().classList.remove('hidden');boxLayer.setAttribute('aria-hidden','false');selectedEntryId=null;renderBuddyBox();}
  function closeBuddyBox(){closeBuddyBoxDetail();boxLayer?.classList.add('hidden');boxLayer?.setAttribute('aria-hidden','true');}
  function closeBuddyBoxDetail(){selectedEntryId=null;boxLayer?.querySelector('#buddyBoxDetailV265')?.classList.add('hidden');}

  function powerEntry(entry,steps){
    if(!entry||entry.level>=100)return;
    const amount=steps==='max'?maxAffordableLevels(entry.level,dustBalance()).count:Math.max(1,Math.floor(Number(steps)||1));
    const actual=Math.min(amount,100-entry.level);if(actual<=0)return;
    const cost=totalLevelCost(entry.level,actual);if(!spendDust(cost)){setMessage?.('Not enough Power Up Dust.');return;}
    entry.level+=actual;try{persistAll();}catch(error){}renderBuddyBox();
  }

  function equipEntry(entry,characterId,slotIndex){
    if(!entry)return;
    ensureBuddySave();const box=ensureBox({persist:false});
    const old=entryEquippedLocation(entry.id);
    if(old){hubSave.buddies.equippedByCharacter[old.characterId][old.slotIndex]=null;hubSave.buddies.personalizationByCharacter[old.characterId][old.slotIndex]=null;box.equippedInstanceByCharacter[old.characterId][old.slotIndex]=null;}
    const targetSlots=hubSave.buddies.equippedByCharacter[characterId];
    const previousId=box.equippedInstanceByCharacter[characterId][slotIndex];
    if(previousId)box.equippedInstanceByCharacter[characterId][slotIndex]=null;
    targetSlots[slotIndex]=entry.key;
    hubSave.buddies.personalizationByCharacter[characterId][slotIndex]=(entry.nickname||entry.gender)?{nickname:entry.nickname||'',gender:entry.gender||''}:null;
    box.equippedInstanceByCharacter[characterId][slotIndex]=entry.id;
    try{persistAll();renderBuddyCollection?.();renderMeta?.();}catch(error){}renderBuddyBox();
  }

  function releaseEntry(entry){
    if(!entry)return;
    if(entry.locked){window.alert('This Buddy is locked. Unlock it before releasing.');return;}
    if(entryEquippedLocation(entry.id)){window.alert('Unequip this Buddy before releasing it.');return;}
    if(familyCount(entry.key)<=1){window.alert('Keep at least one copy of each Buddy family. Only extra Buddies can be released.');return;}
    const amount=releaseValue(entry);
    const important=entry.shiny||entry.boss;
    const prompt=`Release ${entry.nickname||entry.name} for ${amount} Power Up Dust?${important?' This is a rare/special Buddy.':''}`;
    if(!window.confirm(prompt))return;
    const box=ensureBox({persist:false});box.entries=box.entries.filter(item=>item.id!==entry.id);
    const record=hubSave.buddies.collection?.[entry.key];if(record)record.quantity=Math.max(1,Math.floor(Number(record.quantity)||1)-1);
    addDust(amount);selectedEntryId=null;try{persistAll();renderBuddyCollection?.();}catch(error){}renderBuddyBox();
  }

  function renderBuddyBoxDetail(entryId){
    const entry=boxEntry(entryId);if(!entry)return;selectedEntryId=entry.id;
    const layer=ensureBoxLayer(),detail=layer.querySelector('#buddyBoxDetailV265');detail.classList.remove('hidden');
    const factor=buddyPowerFactor(entry.level),one=entry.level<100?nextLevelCost(entry.level):0,tenSteps=Math.min(10,100-entry.level),ten=tenSteps?totalLevelCost(entry.level,tenSteps):0,max=maxAffordableLevels(entry.level,dustBalance());
    const characters=visibleCharacters();const defaultCharacter=characters.includes(activeCharacterId)?activeCharacterId:characters[0]||'peep';
    detail.innerHTML=`<button class="buddy-box-detail-close-v265" type="button" aria-label="Close">×</button><div class="buddy-box-detail-top-v265"><span class="buddy-box-detail-art-v265"></span><div><span class="mini-label">${entry.shiny?'SHINY BUDDY':entry.boss?'BOSS BUDDY':'BUDDY'}</span><h3>${escapeHtml(entry.nickname||entry.name)}</h3><p>${escapeHtml(entry.name)} · Lv. ${entry.level}</p><p>Move Power ×${factor.toFixed(2)}</p></div></div><div class="buddy-level-bar-v265"><span style="width:${entry.level}%"></span></div><div class="buddy-power-actions-v265"><button data-power="1" type="button" ${entry.level>=100||dustBalance()<one?'disabled':''}>+1 <small>${one} ✦</small></button><button data-power="10" type="button" ${tenSteps<1||dustBalance()<ten?'disabled':''}>+${tenSteps||10} <small>${ten} ✦</small></button><button data-power="max" type="button" ${max.count<1?'disabled':''}>Max Affordable <small>${max.count?`${max.count} Lv · ${max.cost} ✦`:'—'}</small></button></div><div class="buddy-box-equip-v265"><label>OC<select id="buddyBoxOcV265">${characters.map(id=>`<option value="${id}" ${id===defaultCharacter?'selected':''}>${characterName(id)}</option>`).join('')}</select></label><label>Slot<select id="buddyBoxSlotV265">${Array.from({length:6},(_,i)=>`<option value="${i}">${i===0?'★ Main Buddy':`Slot ${i+1}`}</option>`).join('')}</select></label><button id="buddyBoxEquipV265" type="button">Equip</button></div><div class="buddy-box-bottom-actions-v265"><button id="buddyBoxFavoriteV265" type="button">${entry.favorite?'♥ Favorited':'♡ Favorite'}</button><button id="buddyBoxLockV265" type="button">${entry.locked?'🔒 Locked':'🔓 Lock'}</button><button id="buddyBoxReleaseV265" class="danger" type="button" ${familyCount(entry.key)<=1?'disabled':''}>Release +${releaseValue(entry)} ✦</button></div><p class="buddy-box-dust-note-v265">Power Up Dust: <strong>${dustBalance().toLocaleString()}</strong> · Your last copy of a Buddy family is protected.</p>`;
    detail.querySelector('.buddy-box-detail-art-v265').append(buddyTileImage(entry));
    detail.querySelector('.buddy-box-detail-close-v265').addEventListener('click',closeBuddyBoxDetail);
    detail.querySelectorAll('[data-power]').forEach(button=>button.addEventListener('click',()=>powerEntry(entry,button.dataset.power==='max'?'max':Number(button.dataset.power))));
    detail.querySelector('#buddyBoxEquipV265').addEventListener('click',()=>equipEntry(entry,detail.querySelector('#buddyBoxOcV265').value,Number(detail.querySelector('#buddyBoxSlotV265').value)||0));
    detail.querySelector('#buddyBoxFavoriteV265').addEventListener('click',()=>{entry.favorite=!entry.favorite;persistAll();renderBuddyBox();});
    detail.querySelector('#buddyBoxLockV265').addEventListener('click',()=>{entry.locked=!entry.locked;persistAll();renderBuddyBox();});
    detail.querySelector('#buddyBoxReleaseV265').addEventListener('click',()=>releaseEntry(entry));
  }

  function installBuddyBoxButton(){
    const heading=document.querySelector('#buddyScreen .buddy-book-heading');if(!heading||heading.querySelector('#openBuddyBoxV265'))return;
    const button=document.createElement('button');button.id='openBuddyBoxV265';button.className='pixel-button small buddy-box-open-v265';button.type='button';button.textContent='Buddy Box';button.addEventListener('click',openBuddyBox);
    const count=heading.querySelector('#buddyCollectionCount');if(count)count.before(button);else heading.append(button);
  }

  // v24.269: Dash UI patch removed; game-v96 + quest-v269 own Dash navigation.

  ensureBox();dustState();
  window.DUCKIE_BUDDY_BOX_V265={open:openBuddyBox,ensure:ensureBox,powerFactor:buddyPowerFactor};
  window.DUCKIE_QUEST_V265='24.265';
})();
