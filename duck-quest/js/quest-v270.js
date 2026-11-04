(function(){
  'use strict';
  const SAVE_KEY='duckHabitHubSave_v1';
  const GLITTER='../assets/ingredients/Sparkle.webp';
  let lastBuddyId=null;

  const CHARACTER_NAMES={peep:'Peep',miko:'Miko',io:'Io',miho:'Miho',annika:'Annika'};

  function mimicArt(entry){
    if(!entry) return null;
    const enemyId=String(entry.enemyId||'').toLowerCase();
    const key=String(entry.key||'').toLowerCase();
    const variant=String(entry.variantId||'').toLowerCase();
    const name=String(entry.name||'').toLowerCase();
    const isMimic=enemyId==='mimic' || key.startsWith('mimic:') || name.includes('mimic');
    if(!isMimic) return null;

    // v24.284: exact saved key always wins over stale legacy metadata.
    if(key==='mimic:base'){
      return {
        image:'assets/enemies/mimic/base/open-1.webp',
        idle:['assets/enemies/mimic/base/open-1.webp','assets/enemies/mimic/base/open-2.webp']
      };
    }
    if(key==='mimic:lucky'){
      return {
        image:'assets/enemies/mimic/lucky/open.webp',
        idle:['assets/enemies/mimic/lucky/idle-1.webp','assets/enemies/mimic/lucky/idle-2.webp']
      };
    }
    if(key==='mimic:healthy'){
      return {
        image:'assets/enemies/mimic/healthy/open.webp',
        idle:['assets/enemies/mimic/healthy/idle-1.webp','assets/enemies/mimic/healthy/idle-2.webp']
      };
    }
    if(key==='mimic:shiny' || key==='mimic:amethyst'){
      return {
        image:'assets/shinies/amethyst-mimic-idle-1.webp',
        idle:['assets/shinies/amethyst-mimic-idle-1.webp','assets/shinies/amethyst-mimic-idle-2.webp']
      };
    }

    // Legacy fallback for pre-key saves only.
    if(variant==='lucky' || name.includes('lucky mimic')){
      return {
        image:'assets/enemies/mimic/lucky/open.webp',
        idle:['assets/enemies/mimic/lucky/idle-1.webp','assets/enemies/mimic/lucky/idle-2.webp']
      };
    }
    if(variant==='healthy' || name.includes('healthy mimic')){
      return {
        image:'assets/enemies/mimic/healthy/open.webp',
        idle:['assets/enemies/mimic/healthy/idle-1.webp','assets/enemies/mimic/healthy/idle-2.webp']
      };
    }
    if(variant==='amethyst' || variant==='shiny' || name.includes('amethyst mimic')){
      return {
        image:'assets/shinies/amethyst-mimic-idle-1.webp',
        idle:['assets/shinies/amethyst-mimic-idle-1.webp','assets/shinies/amethyst-mimic-idle-2.webp']
      };
    }
    return {
      image:'assets/enemies/mimic/base/open-1.webp',
      idle:['assets/enemies/mimic/base/open-1.webp','assets/enemies/mimic/base/open-2.webp']
    };
  }

  function repairEntry(entry){
    const art=mimicArt(entry);
    if(!art) return false;
    let changed=false;
    if(entry.image!==art.image){entry.image=art.image;changed=true;}
    const current=Array.isArray(entry.idle)?entry.idle:[];
    if(current[0]!==art.idle[0] || current[1]!==art.idle[1]){
      entry.idle=art.idle.slice();
      changed=true;
    }
    return changed;
  }

  function repairMimicBuddySprites(){
    let changed=false;
    try{
      if(typeof hubSave!=='undefined' && hubSave && typeof hubSave==='object'){
        Object.values(hubSave.buddies?.collection||{}).forEach(record=>{changed=repairEntry(record)||changed;});
        (hubSave.buddyBoxV265?.entries||[]).forEach(entry=>{changed=repairEntry(entry)||changed;});
        if(changed){
          try{
            if(typeof persistAll==='function') persistAll();
            else localStorage.setItem(SAVE_KEY,JSON.stringify(hubSave));
          }catch(error){}
        }
        return changed;
      }
    }catch(error){}

    try{
      const raw=localStorage.getItem(SAVE_KEY);
      if(!raw) return false;
      const data=JSON.parse(raw);
      Object.values(data.buddies?.collection||{}).forEach(record=>{changed=repairEntry(record)||changed;});
      (data.buddyBoxV265?.entries||[]).forEach(entry=>{changed=repairEntry(entry)||changed;});
      if(changed)localStorage.setItem(SAVE_KEY,JSON.stringify(data));
    }catch(error){}
    return changed;
  }

  function readSave(){
    try{
      if(typeof hubSave!=='undefined' && hubSave && typeof hubSave==='object') return hubSave;
    }catch(error){}
    try{return JSON.parse(localStorage.getItem(SAVE_KEY)||'{}');}catch(error){return {};}
  }

  function buddyById(id){
    const data=readSave();
    return (data.buddyBoxV265?.entries||[]).find(entry=>entry?.id===id)||null;
  }

  function assignmentFor(id){
    const data=readSave();
    const map=data.buddyBoxV265?.equippedInstanceByCharacter||{};
    for(const [characterId,slots] of Object.entries(map)){
      const index=Array.isArray(slots)?slots.indexOf(id):-1;
      if(index>=0){
        return {
          characterId,
          characterName:CHARACTER_NAMES[characterId]||characterId,
          slotIndex:index,
          label:index===0?'Main Buddy':`Slot ${index+1}`
        };
      }
    }
    return null;
  }

  function dustBalance(){
    const state=readSave().tradingCards||{};
    const value=Number.isFinite(Number(state.powerUpDust))?state.powerUpDust:state.cardDust;
    return Math.max(0,Math.floor(Number(value)||0));
  }

  function boostInfo(){
    try{
      const api=window.DuckieTaskBuddyBoostV254;
      const active=Boolean(api?.boostActive?.());
      const multiplier=Number(api?.multiplier)||1.20;
      return {active,percent:Math.round((multiplier-1)*100)};
    }catch(error){
      return {active:false,percent:20};
    }
  }

  function enhanceBuddyDetail(){
    const detail=document.querySelector('#buddyBoxDetailV265:not(.hidden)');
    if(!detail || !lastBuddyId) return;
    if(detail.querySelector('.buddy-box-info-v274')) return;

    const entry=buddyById(lastBuddyId);
    if(!entry) return;

    detail.querySelector('.buddy-detail-status-v270')?.remove();
    detail.querySelector('.buddy-power-panel-v270')?.remove();

    const assignment=assignmentFor(lastBuddyId);
    const boost=boostInfo();

    const status=document.createElement('div');
    status.className='buddy-detail-status-v270';

    const assigned=document.createElement('span');
    assigned.innerHTML=assignment
      ? `Assigned to<strong>${assignment.characterName} · ${assignment.label}</strong>`
      : 'Assignment<strong>Not Assigned</strong>';

    const boostBadge=document.createElement('span');
    boostBadge.classList.toggle('boost-active-v270',boost.active);
    boostBadge.innerHTML=boost.active
      ? `Buddy Boost<strong>ACTIVE · +${boost.percent}% ability power</strong>`
      : 'Buddy Boost<strong>Not active today</strong>';

    status.append(assigned,boostBadge);

    const top=detail.querySelector('.buddy-box-detail-top-v265');
    top?.insertAdjacentElement('afterend',status);

    const actions=detail.querySelector('.buddy-power-actions-v265');
    if(actions){
      const panel=document.createElement('div');
      panel.className='buddy-power-panel-v270';
      panel.innerHTML=`<strong>Power Up · Lv. ${Math.max(1,Number(entry.level)||1)} / 100</strong><small>Choose +1, +10, or Max Affordable below. Power Up Dust is only spent when you press one of those buttons.</small><span class="buddy-dust-balance-v270"><img src="${GLITTER}" alt=""> ${dustBalance().toLocaleString()} Power Up Dust</span>`;
      actions.before(panel);
    }
  }

  function wrapBuddyBoxOpen(){
    const api=window.DUCKIE_BUDDY_BOX_V265;
    if(!api?.open || api.__v270Wrapped) return;
    const previous=api.open;
    api.open=function(){
      repairMimicBuddySprites();
      const result=previous.apply(this,arguments);
      setTimeout(()=>{
        document.querySelectorAll('.buddy-box-tile-v265[data-instance-id] img').forEach(img=>{
          const tile=img.closest('.buddy-box-tile-v265');
          const entry=buddyById(tile?.dataset?.instanceId);
          const art=mimicArt(entry);
          if(art && img.getAttribute('src')!==art.image)img.src=art.image;
        });
      },0);
      return result;
    };
    api.__v270Wrapped=true;
  }

  function init(){
    repairMimicBuddySprites();
    wrapBuddyBoxOpen();

    document.addEventListener('click',event=>{
      const tile=event.target.closest('.buddy-box-tile-v265[data-instance-id]');
      if(tile){
        lastBuddyId=tile.dataset.instanceId||null;
        setTimeout(enhanceBuddyDetail,0);
        return;
      }
      if(event.target.closest('#buddyBoxDetailV265 [data-power], #buddyBoxDetailV265 #buddyBoxEquipV265, #buddyBoxDetailV265 #buddyBoxFavoriteV265, #buddyBoxDetailV265 #buddyBoxLockV265')){
        setTimeout(enhanceBuddyDetail,0);
      }
    });
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();

  window.DUCKIE_QUEST_V270='24.270';
})();
