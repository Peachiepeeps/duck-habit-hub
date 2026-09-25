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
    // Preserve each entry object: detail buttons retain references to it.
    // Replacing every entry on each read made level-up and edits target stale copies.
    box.entries=box.entries.filter(entry=>entry&&typeof entry==='object'&&entry.id&&entry.key);
    box.entries.forEach(entry=>{
      entry.level=Math.max(1,Math.min(100,Math.floor(Number(entry.level)||1)));
      entry.favorite=Boolean(entry.favorite);
      entry.locked=Boolean(entry.locked);
      entry.nickname=String(entry.nickname||'').slice(0,20);
      entry.gender=['female','male','nonbinary'].includes(entry.gender)?entry.gender:'';
    });
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
          if(personal){
            const nickname=String(personal.nickname||'').slice(0,20);
            const gender=['female','male','nonbinary'].includes(personal.gender)?personal.gender:'';
            if(instance.nickname!==nickname){instance.nickname=nickname;changed=true;}
            if(instance.gender!==gender){instance.gender=gender;changed=true;}
          }
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

  // The battle core requests a scaled copy when a Buddy acts. BUDDY_SKILLS is
  // frozen, so mutating its entries would throw before the action begins.

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
    boxLayer.innerHTML=`<div class="buddy-box-card-v265"><div class="buddy-box-head-v265"><div><span class="mini-label">BUDDY BOX</span><h2>Your Buddies</h2></div><div class="buddy-box-dust-v265">✦ <strong id="buddyBoxDustV265">0</strong></div><button id="closeBuddyBoxV265" class="pixel-button small" type="button">Close</button></div><div class="buddy-box-tools-v265"><div class="buddy-box-filters-v265"><button class="selected" data-box-filter="all" type="button">All</button><button data-box-filter="favorites" type="button">Favorites</button><button data-box-filter="shiny" type="button">Shiny ✨</button></div><label>Sort <select id="buddyBoxSortV265"><option value="newest">Newest</option><option value="level">Highest Level</option><option value="name">Name</option></select></label></div><div id="buddyBoxGridV265" class="buddy-box-grid-v265"></div><p id="buddyBoxEmptyV265" class="buddy-box-empty-v265 hidden">No Buddies match this view yet.</p><section id="buddyBoxDetailV265" class="buddy-box-detail-v265 hidden" role="dialog" aria-modal="true" aria-label="Buddy details"></section></div>`;
    document.body.append(boxLayer);
    boxLayer.querySelector('#closeBuddyBoxV265')?.addEventListener('click',closeBuddyBox);
    boxLayer.querySelectorAll('[data-box-filter]').forEach(button=>button.addEventListener('click',()=>{boxFilter=button.dataset.boxFilter||'all';renderBuddyBox();}));
    boxLayer.querySelector('#buddyBoxSortV265')?.addEventListener('change',event=>{boxSort=event.target.value;renderBuddyBox();});
    boxLayer.addEventListener('keydown',event=>{
      if(event.key!=='Escape')return;
      const dialog=boxLayer.querySelector('#buddyBoxLevelDialogV276');
      if(dialog&&!dialog.classList.contains('hidden')){dialog.classList.add('hidden');dialog.setAttribute('aria-hidden','true');}
      else if(selectedEntryId)closeBuddyBoxDetail();
      else closeBuddyBox();
      event.stopPropagation();
    });
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
      button.setAttribute('aria-label',`View ${entry.nickname||entry.name}, level ${entry.level}`);
      const art=document.createElement('span');art.className='buddy-box-art-v265';art.append(buddyTileImage(entry));if(entry.shiny){const s=document.createElement('i');s.textContent='✦';art.append(s);}
      const name=document.createElement('strong');name.textContent=entry.nickname||entry.name;
      const level=document.createElement('span');level.textContent=`Lv. ${entry.level}`;
      const location=entryEquippedLocation(entry.id);const status=document.createElement('small');status.textContent=location?`${characterName(location.characterId)} · Slot ${location.slotIndex+1}`:(entry.favorite?'♥ Favorite':'In Box');
      button.append(art,name,level,status);button.addEventListener('click',()=>renderBuddyBoxDetail(entry.id));grid.append(button);
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

  function updateEntryPersonalization(entry,detail){
    const nickname=String(detail.querySelector('#buddyBoxNicknameV274')?.value||'').trim().slice(0,20);
    const gender=String(detail.querySelector('#buddyBoxGenderV274')?.value||'');
    if(!['','female','male','nonbinary'].includes(gender))return;
    const location=entryEquippedLocation(entry.id);
    entry.nickname=nickname;entry.gender=gender;
    if(location){
      hubSave.buddies.personalizationByCharacter[location.characterId][location.slotIndex]=
        nickname||gender?{nickname,gender}:null;
    }
    try{persistAll();renderBuddyCollection?.();renderMeta?.();}catch(error){}
    renderBuddyBox();
  }

  function unassignEntry(entry){
    const location=entryEquippedLocation(entry.id);
    if(!location)return;
    const {characterId,slotIndex}=location;
    hubSave.buddies.equippedByCharacter[characterId][slotIndex]=null;
    hubSave.buddies.personalizationByCharacter[characterId][slotIndex]=null;
    ensureBox({persist:false}).equippedInstanceByCharacter[characterId][slotIndex]=null;
    try{persistAll();renderBuddyCollection?.();renderMeta?.();}catch(error){}
    renderBuddyBox();
  }

  function buddyMoveStats(skill,level){
    if(!skill)return [];
    const scaled=scaledBuddySkill(skill,level),items=[];
    const pct=value=>`${Math.round(value*100)}%`;
    const add=(label,value)=>items.push({label,value});
    if(Number.isFinite(scaled.multiplier))add('Damage',`×${scaled.multiplier.toFixed(2)}`);
    if(Number.isFinite(scaled.healPercent))add('Healing',pct(scaled.healPercent));
    if(Number.isFinite(scaled.attackDown))add('Enemy Attack ↓',pct(scaled.attackDown));
    if(Number.isFinite(scaled.damageReduction))add('Damage Reduced',pct(scaled.damageReduction));
    if(Number.isFinite(scaled.missChance))add('Enemy Miss Chance',pct(scaled.missChance));
    if(Number.isFinite(scaled.stunChance))add('Stun Chance',pct(scaled.stunChance));
    if(Number.isFinite(scaled.attackBoost))add('OC Attack ↑',pct(scaled.attackBoost));
    if(Number.isFinite(scaled.defenseDown))add('Enemy Defense ↓',pct(scaled.defenseDown));
    if(Number.isFinite(scaled.drainPercent))add('Damage Healed',pct(scaled.drainPercent));
    if(Number.isFinite(scaled.weakenChance))add('Weaken Chance',pct(scaled.weakenChance));
    if(Number.isFinite(scaled.critChance))add('Critical Chance',pct(scaled.critChance));
    if(Number.isFinite(scaled.duration))add('Effect Length',`${scaled.duration} turns`);
    add('Cooldown','3 turns');
    return items;
  }

  function renderBuddyBoxDetail(entryId){
    const entry=boxEntry(entryId);if(!entry)return;selectedEntryId=entry.id;
    const layer=ensureBoxLayer(),detail=layer.querySelector('#buddyBoxDetailV265');detail.classList.remove('hidden');
    const level=entry.level,balance=dustBalance(),one=level<100?nextLevelCost(level):0;
    const tenSteps=Math.min(10,100-level),ten=tenSteps?totalLevelCost(level,tenSteps):0;
    const max=maxAffordableLevels(level,balance);
    const location=entryEquippedLocation(entry.id);
    const characters=[...new Set([...visibleCharacters(),...(location?[location.characterId]:[])])];
    const defaultCharacter=location?.characterId||(characters.includes(activeCharacterId)?activeCharacterId:characters[0]||'peep');
    const selectedSlot=location?.slotIndex??0;
    const skill=buddySkillForEnemyId?.(entry.enemyId);
    const stats=buddyMoveStats(skill,level);
    const linked=location?`${characterName(location.characterId)} · ${location.slotIndex===0?'Main':`Slot ${location.slotIndex+1}`}`:'In Box';
    const captured=Number.isFinite(Number(entry.capturedAt))?new Date(Number(entry.capturedAt)).toLocaleDateString():'Unknown';
    const dailyBoost=Boolean(window.DuckieTaskBuddyBoostV254?.boostActive?.());
    const levelOptions=[
      {steps:'1',count:level<100?1:0,cost:one,label:'+1 level'},
      {steps:'10',count:tenSteps,cost:ten,label:`+${tenSteps||10} levels`},
      {steps:'max',count:max.count,cost:max.cost,label:`Max affordable · ${max.count} levels`}
    ];
    detail.innerHTML=`
      <button class="buddy-box-detail-close-v265" type="button" aria-label="Close buddy details">×</button>
      <div class="buddy-box-detail-layout-v276">
        <header class="buddy-box-detail-header-v276">
          <span class="buddy-box-detail-art-v265 buddy-box-icon-window-v276" aria-label="${escapeHtml(entry.nickname||entry.name)} icon"></span>
          <div class="buddy-box-detail-identity-v276">
            <span class="mini-label">${entry.shiny?'✦ SHINY · ':''}${entry.boss?'BOSS BUDDY':'BUDDY'}</span>
            <h3>${escapeHtml(entry.nickname||entry.name)}</h3>
            <p>${escapeHtml(entry.name)} · ${escapeHtml(entry.variantId||'base')} · Caught ${escapeHtml(captured)}</p>
            <div class="buddy-box-level-row-v276"><strong>Lv. ${level} / 100</strong><span>${balance.toLocaleString()} ✦ Dust</span></div>
          </div>
          <button id="buddyBoxLevelUpV276" class="buddy-box-level-button-v276" type="button" ${level>=100?'disabled':''}>Level up</button>
        </header>
        <div class="buddy-box-main-v276">
          <section class="buddy-box-move-v276" aria-label="Buddy move and stats">
            <span class="mini-label">BATTLE MOVE</span>
            <strong>${escapeHtml(skill?.name||'No move yet')}</strong>
            <p>${escapeHtml(skill?.description||'This Buddy does not have a battle move yet.')}</p>
            <div class="buddy-box-stats-v276">${stats.map(item=>`<span>${escapeHtml(item.label)} <strong>${escapeHtml(item.value)}</strong></span>`).join('')}</div>
            <div class="buddy-box-extra-v276"><span>Power <strong>×${buddyPowerFactor(level).toFixed(2)}</strong></span><span>Daily boost <strong>${dailyBoost?'Active ✦':'Off'}</strong></span></div>
          </section>
          <div class="buddy-box-controls-v276">
            <section class="buddy-box-edit-v276" aria-label="Buddy name and gender">
              <strong>Name & Gender</strong>
              <div class="buddy-box-edit-fields-v276">
                <label>Nickname<input id="buddyBoxNicknameV274" maxlength="20" value="${escapeHtml(entry.nickname||'')}" placeholder="${escapeHtml(entry.name)}"></label>
                <label>Gender<select id="buddyBoxGenderV274">
                  <option value="" ${!entry.gender?'selected':''}>Not set</option>
                  <option value="female" ${entry.gender==='female'?'selected':''}>Female ♀</option>
                  <option value="male" ${entry.gender==='male'?'selected':''}>Male ♂</option>
                  <option value="nonbinary" ${entry.gender==='nonbinary'?'selected':''}>Nonbinary ✦</option>
                </select></label>
              </div>
              <button id="buddyBoxSaveIdentityV274" type="button">Save name & gender</button>
            </section>
            <section class="buddy-box-link-v276" aria-label="Link buddy to OC">
              <strong>Linked OC: ${escapeHtml(linked)}</strong>
              <div class="buddy-box-link-fields-v276">
                <label>OC<select id="buddyBoxOcV265">${characters.map(id=>`<option value="${id}" ${id===defaultCharacter?'selected':''}>${escapeHtml(characterName(id))}</option>`).join('')}</select></label>
                <label>Slot<select id="buddyBoxSlotV265">${Array.from({length:6},(_,i)=>`<option value="${i}" ${i===selectedSlot?'selected':''}>${i===0?'★ Main':`Slot ${i+1}`}</option>`).join('')}</select></label>
              </div>
              <div class="buddy-box-link-actions-v276"><button id="buddyBoxEquipV265" type="button">${location?'Move':'Link'} Buddy</button><button id="buddyBoxUnassignV274" type="button" ${location?'':'disabled'}>Unlink</button></div>
            </section>
          </div>
        </div>
        <footer class="buddy-box-bottom-actions-v265 buddy-box-footer-v276">
          <button id="buddyBoxFavoriteV265" type="button">${entry.favorite?'♥ Favorite':'♡ Favorite'}</button>
          <button id="buddyBoxLockV265" type="button">${entry.locked?'🔒 Locked':'🔓 Lock'}</button>
          <button id="buddyBoxReleaseV265" class="danger" type="button" ${familyCount(entry.key)<=1?'disabled':''}>Release +${releaseValue(entry)} ✦</button>
        </footer>
      </div>
      <div id="buddyBoxLevelDialogV276" class="buddy-box-level-dialog-v276 hidden" role="dialog" aria-modal="true" aria-label="Level up ${escapeHtml(entry.nickname||entry.name)}" aria-hidden="true">
        <div class="buddy-box-level-card-v276">
          <strong>Level up ${escapeHtml(entry.nickname||entry.name)}</strong>
          <p>Choose how much to power up. Dust is spent when you confirm.</p>
          <div class="buddy-box-level-options-v276">${levelOptions.map(option=>`<button type="button" data-power="${option.steps}" ${!option.count||balance<option.cost?'disabled':''}>${option.label}<small>${option.count?`${option.cost} ✦`: '—'}</small></button>`).join('')}</div>
          <p class="buddy-box-level-summary-v276" aria-live="polite"></p>
          <div class="buddy-box-level-confirm-v276"><button id="buddyBoxCancelLevelV276" type="button">Cancel</button><button id="buddyBoxConfirmLevelV276" type="button">Confirm</button></div>
        </div>
      </div>`;
    detail.querySelector('.buddy-box-detail-art-v265').append(buddyTileImage(entry));
    detail.querySelector('.buddy-box-detail-close-v265').addEventListener('click',closeBuddyBoxDetail);
    const dialog=detail.querySelector('#buddyBoxLevelDialogV276');
    const summary=detail.querySelector('.buddy-box-level-summary-v276');
    const confirm=detail.querySelector('#buddyBoxConfirmLevelV276');
    let choice=null;
    const choose=option=>{
      choice=option;
      dialog.querySelectorAll('[data-power]').forEach(button=>button.classList.toggle('selected',button.dataset.power===option?.steps));
      confirm.disabled=!option;
      summary.textContent=option?`Lv. ${level} → Lv. ${level+option.count} · ${option.cost} ✦ Dust · ${balance-option.cost} left`
        :(level>=100?'This Buddy is fully leveled.':`You need ${Math.max(0,one-balance)} more ✦ Dust for the next level.`);
    };
    const hideDialog=()=>{dialog.classList.add('hidden');dialog.setAttribute('aria-hidden','true');};
    dialog.addEventListener('click',event=>{if(event.target===dialog)hideDialog();});
    detail.querySelector('#buddyBoxLevelUpV276').addEventListener('click',()=>{
      dialog.classList.remove('hidden');dialog.setAttribute('aria-hidden','false');
      choose(levelOptions.find(option=>option.count&&balance>=option.cost)||null);
      (dialog.querySelector('[data-power]:not(:disabled)')||detail.querySelector('#buddyBoxCancelLevelV276'))?.focus?.();
    });
    dialog.querySelectorAll('[data-power]').forEach(button=>button.addEventListener('click',()=>choose(levelOptions.find(option=>option.steps===button.dataset.power))));
    detail.querySelector('#buddyBoxCancelLevelV276').addEventListener('click',hideDialog);
    confirm.addEventListener('click',()=>{if(choice){const steps=choice.steps==='max'?'max':choice.count;hideDialog();powerEntry(entry,steps);}});
    detail.querySelector('#buddyBoxSaveIdentityV274').addEventListener('click',()=>updateEntryPersonalization(entry,detail));
    detail.querySelector('#buddyBoxEquipV265').addEventListener('click',()=>equipEntry(entry,detail.querySelector('#buddyBoxOcV265').value,Number(detail.querySelector('#buddyBoxSlotV265').value)||0));
    detail.querySelector('#buddyBoxUnassignV274').addEventListener('click',()=>unassignEntry(entry));
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
  window.DUCKIE_BUDDY_BOX_V265={open:openBuddyBox,ensure:ensureBox,powerFactor:buddyPowerFactor,scaleSkill:scaledBuddySkill};
  window.DUCKIE_QUEST_V265='24.265';
})();
