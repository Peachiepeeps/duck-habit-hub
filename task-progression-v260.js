(function(){
  'use strict';

  const BUILD='24.260';
  const api=window.DuckieTaskProgressV254;
  if(!api) return;

  const COLLECTIBLES=Array.isArray(api.COLLECTIBLES)?api.COLLECTIBLES:[];
  const byId=new Map(COLLECTIBLES.map(item=>[item.id,item]));
  const taskShopGrid=document.querySelector('#taskShopGrid');
  const furnitureLayer=document.querySelector('#furnitureDuckLayer');

  function progress(){
    const p=api.ensureProgress();
    if(!p.dresserCollectibleByRoom || typeof p.dresserCollectibleByRoom!=='object' || Array.isArray(p.dresserCollectibleByRoom)){
      p.dresserCollectibleByRoom={};
    }
    return p;
  }

  function roomKey(roomId){
    const id=roomId || (typeof save!=='undefined' ? save.room : 'room');
    try{
      return typeof mainRoomStorageId==='function' ? String(mainRoomStorageId(id)) : String(id || 'room');
    }catch(error){
      return String(id || 'room');
    }
  }

  function dresserAvailable(roomId){
    try{
      const id=roomId || save.room;
      if(typeof currentLeftFurnitureType==='function' && currentLeftFurnitureType(id)!=='dresser') return false;
      if(typeof getRoomFurniture==='function') return Boolean(getRoomFurniture(id)?.left);
      return false;
    }catch(error){return false;}
  }

  function saveProgress(){
    try{ if(typeof persist==='function') persist(); }
    catch(error){
      try{localStorage.setItem('duckHabitHubSave_v1',JSON.stringify(save));}catch(inner){}
    }
  }

  function currentDresserCollectible(){
    const p=progress();
    const id=p.dresserCollectibleByRoom[roomKey()];
    return id && byId.has(id) && p.collectiblesOwned.includes(id) ? id : null;
  }

  function clearRenderedPlush(){
    furnitureLayer?.querySelectorAll('.task-dresser-collectible-v260').forEach(node=>node.remove());
  }

  function renderDresserCollectible(){
    clearRenderedPlush();
    if(!furnitureLayer || typeof currentRoomView!=='undefined' && currentRoomView!=='main') return;
    if(!dresserAvailable()) return;

    const id=currentDresserCollectible();
    const item=id ? byId.get(id) : null;
    if(!item) return;

    const img=document.createElement('img');
    img.src=item.image;
    img.alt='';
    img.decoding='async';
    img.loading='eager';
    img.className='task-dresser-collectible-v260';
    img.dataset.taskCollectibleId=id;
    furnitureLayer.append(img);
  }

  function setDresserCollectible(id){
    const item=byId.get(id);
    const p=progress();
    if(!item || !p.collectiblesOwned.includes(id)) return;

    if(!dresserAvailable()){
      try{showToast('Place a dresser in this room first. ♡');}catch(error){}
      return;
    }

    const key=roomKey();
    const current=p.dresserCollectibleByRoom[key] || null;
    if(current===id){
      delete p.dresserCollectibleByRoom[key];
      saveProgress();
      renderDresserCollectible();
      decorateTaskShop();
      try{showToast(`${item.name} was taken off the dresser. ♡`);}catch(error){}
      return;
    }

    // A collectible is one display item: move it off the Task Treasure shelf
    // and any other room dresser before placing it here.
    if(Array.isArray(p.shelfSlots)){
      p.shelfSlots=p.shelfSlots.map(currentId=>currentId===id?null:currentId);
    }
    Object.keys(p.dresserCollectibleByRoom).forEach(room=>{
      if(p.dresserCollectibleByRoom[room]===id) delete p.dresserCollectibleByRoom[room];
    });
    p.dresserCollectibleByRoom[key]=id;

    saveProgress();
    try{api.renderTaskShelf();}catch(error){}
    renderDresserCollectible();
    decorateTaskShop();
    try{showToast(`${item.name} is now sitting on the dresser! ♡`);}catch(error){}
  }

  function collectibleForCard(card){
    const art=card?.querySelector(':scope > img');
    const src=art?.getAttribute('src') || '';
    if(!src) return null;
    return COLLECTIBLES.find(item=>src===item.image || src.endsWith('/'+item.image.split('/').pop())) || null;
  }

  function decorateTaskShop(){
    if(!taskShopGrid) return;
    const p=progress();
    const key=roomKey();
    const dresserReady=dresserAvailable();

    taskShopGrid.querySelectorAll('.task-shop-item-v254').forEach(card=>{
      const item=collectibleForCard(card);
      if(!item || !p.collectiblesOwned.includes(item.id)) return;
      const foot=card.querySelector('.task-shop-item-foot-v254');
      if(!foot) return;

      let button=foot.querySelector(`[data-task-dresser-control="${item.id}"]`);
      if(!button){
        button=document.createElement('button');
        button.type='button';
        button.className='task-dresser-button-v260';
        button.dataset.taskDresserControl=item.id;
        button.addEventListener('click',()=>setDresserCollectible(item.id));
        foot.append(button);
      }

      const active=p.dresserCollectibleByRoom[key]===item.id;
      button.classList.toggle('active',active);
      button.disabled=!dresserReady && !active;
      button.textContent=active?'On Dresser':dresserReady?'Dresser':'No Dresser';
      button.setAttribute('aria-pressed',String(active));
      button.title=active?'Remove this plush from the dresser':dresserReady?'Put this plush on the current room dresser':'Place a dresser in this room first';
    });
  }

  // Main-room rendering clears the furniture layer, so append the plush after
  // the normal duck placement pass every time the room redraws.
  if(typeof renderDuckPlacements==='function' && !window.DuckieTaskDresserV260RenderHook){
    const previousRenderDuckPlacements=renderDuckPlacements;
    renderDuckPlacements=function(){
      const result=previousRenderDuckPlacements.apply(this,arguments);
      renderDresserCollectible();
      return result;
    };
    window.DuckieTaskDresserV260RenderHook=true;
  }

  if(taskShopGrid){
    let queued=false;
    const observer=new MutationObserver(()=>{
      if(queued) return;
      queued=true;
      requestAnimationFrame(()=>{queued=false;decorateTaskShop();});
    });
    observer.observe(taskShopGrid,{childList:true,subtree:true});
  }

  decorateTaskShop();
  renderDresserCollectible();

  window.DuckieTaskDresserV260={
    BUILD,
    renderDresserCollectible,
    decorateTaskShop,
    setDresserCollectible
  };
})();
