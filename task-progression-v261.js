(()=>{
  'use strict';

  const api = window.DuckieTaskProgressV254;
  if(!api || typeof api.ensureProgress !== 'function') return;
  if(window.DuckieTaskProgressV261Installed) return;
  window.DuckieTaskProgressV261Installed = true;

  const PERK = {
    id:'double-head-ducks',
    name:'Snuggle Ducks',
    image:'assets/ducks/Standard-duck.webp',
    fallback:'assets/ducks/Standard-duck.PNG',
    price:60,
    description:'Permanent unlock · Every OC can wear two ducks on their head, facing each other like a cute snuggle.'
  };

  function ensurePerkProgress(){
    const p = api.ensureProgress();
    if(typeof p.doubleHeadDuckUnlocked !== 'boolean') p.doubleHeadDuckUnlocked = false;
    return p;
  }

  function perkUnlocked(){
    return Boolean(ensurePerkProgress().doubleHeadDuckUnlocked);
  }

  function ensureSecondHeadState(){
    if(!save.duckDisplays || typeof save.duckDisplays !== 'object') save.duckDisplays = {};
    if(!save.duckDisplays.secondHeadByCharacter || typeof save.duckDisplays.secondHeadByCharacter !== 'object' || Array.isArray(save.duckDisplays.secondHeadByCharacter)){
      save.duckDisplays.secondHeadByCharacter = {};
    }
    return save.duckDisplays.secondHeadByCharacter;
  }

  function currentSecondHeadDuckId(characterId = save.selectedCharacter){
    const map = ensureSecondHeadState();
    const id = map[characterId];
    return typeof validDisplayDuckId === 'function' ? validDisplayDuckId(id) : (id || null);
  }

  function headDuckPair(characterId = save.selectedCharacter){
    let primary = typeof currentHeadDuckId === 'function' ? currentHeadDuckId(characterId) : null;
    let secondary = currentSecondHeadDuckId(characterId);
    if(!primary && secondary){
      primary = secondary;
      secondary = null;
    }
    return [primary || null, secondary || null];
  }

  function splitHeadDuckPlacement(base, slot){
    const anchor = base || {left:50, top:38.7, width:18};
    const width = Math.max(10, Number(anchor.width || 18) * 0.82);
    const offset = Math.max(4.6, width * 0.52);
    return {
      left: Number(anchor.left || 50) + (slot === 0 ? -offset : offset),
      top: Number(anchor.top || 38.7) + 0.35,
      width
    };
  }

  function setHeadDuckImage(img, duck, placement){
    if(!img) return;
    img.decoding = 'async';
    img.fetchPriority = 'high';
    img.src = duck.file;
    img.alt = '';
    img.style.left = `${placement.left}%`;
    img.style.top = `${placement.top}%`;
    img.style.width = `${placement.width}%`;
    img.classList.remove('hidden');
  }

  function hideHeadDuckImage(img){
    if(!img) return;
    img.removeAttribute('src');
    img.alt = '';
    img.classList.add('hidden');
  }

  function placeMainHeadDuckLayer(layer, characterId){
    if(!layer) return;
    if(typeof placeHeadDuckBehindFrontHair === 'function' && peepLayers && placeHeadDuckBehindFrontHair(peepLayers, layer, characterId)) return;
    layer.style.zIndex = '12';
    if(peepWrap && peepHotspot) peepWrap.insertBefore(layer, peepHotspot);
  }

  function ensureSecondaryMainHeadDuck(){
    let img = document.querySelector('#secondHeadDuckDisplay');
    if(img) return img;
    img = document.createElement('img');
    img.id = 'secondHeadDuckDisplay';
    img.className = 'head-duck-display double-head-duck-secondary hidden';
    img.alt = '';
    img.setAttribute('aria-hidden','true');
    return img;
  }

  function applyDoubleHeadDucksToMain(){
    if(typeof getCurrentCharacter !== 'function' || typeof headDuckDisplay === 'undefined' || !headDuckDisplay) return;
    const character = getCurrentCharacter();
    const [firstId, secondId] = headDuckPair(character.id);
    const base = character.duckHeadPlacement || {left:50, top:38.7, width:18};
    const secondaryImg = ensureSecondaryMainHeadDuck();

    if(!firstId){
      hideHeadDuckImage(headDuckDisplay);
      hideHeadDuckImage(secondaryImg);
      return;
    }

    const firstDuck = DUCKS[firstId];
    if(!firstDuck) return;

    if(secondId && DUCKS[secondId]){
      const secondDuck = DUCKS[secondId];
      setHeadDuckImage(headDuckDisplay, firstDuck, splitHeadDuckPlacement(base,0));
      headDuckDisplay.classList.remove('double-head-duck-secondary');
      setHeadDuckImage(secondaryImg, secondDuck, splitHeadDuckPlacement(base,1));
      secondaryImg.classList.add('double-head-duck-secondary');
      placeMainHeadDuckLayer(headDuckDisplay, character.id);
      placeMainHeadDuckLayer(secondaryImg, character.id);
    }else{
      setHeadDuckImage(headDuckDisplay, firstDuck, base);
      headDuckDisplay.classList.remove('double-head-duck-secondary');
      hideHeadDuckImage(secondaryImg);
      placeMainHeadDuckLayer(headDuckDisplay, character.id);
    }
  }

  function buildPortraitHeadDuckLayer(characterId, kind){
    const character = CHARACTERS?.[characterId];
    if(!character) return null;
    const [firstId, secondId] = headDuckPair(character.id);
    if(!firstId || !DUCKS[firstId]) return null;

    const isStatus = kind === 'status';
    const layer = document.createElement('div');
    layer.className = isStatus ? 'status-head-duck-layer' : 'profile-head-duck-layer';
    layer.setAttribute('aria-hidden','true');
    const base = character.duckHeadPlacement || {left:50, top:36.8, width:18};

    const addImg = (duckId, placement, flipped)=>{
      if(!duckId || !DUCKS[duckId]) return;
      const img = document.createElement('img');
      img.decoding = 'async';
      img.loading = 'eager';
      img.fetchPriority = 'high';
      img.className = `${isStatus ? 'status-head-duck' : 'profile-head-duck'}${flipped ? ' double-head-duck-secondary' : ''}`;
      img.src = DUCKS[duckId].file;
      img.alt = '';
      img.style.left = `${placement.left}%`;
      img.style.top = `${placement.top}%`;
      img.style.width = `${placement.width}%`;
      layer.append(img);
    };

    if(secondId && DUCKS[secondId]){
      addImg(firstId, splitHeadDuckPlacement(base,0), false);
      addImg(secondId, splitHeadDuckPlacement(base,1), true);
    }else{
      addImg(firstId, base, false);
    }
    return layer;
  }

  if(typeof renderDuckPlacements === 'function'){
    const previousRenderDuckPlacements = renderDuckPlacements;
    renderDuckPlacements = function(){
      const result = previousRenderDuckPlacements.apply(this, arguments);
      try{ applyDoubleHeadDucksToMain(); }catch(error){}
      return result;
    };
  }

  if(typeof renderProfileHeadDuck === 'function'){
    renderProfileHeadDuck = function(container, characterId){
      const layer = buildPortraitHeadDuckLayer(characterId, 'profile');
      if(!layer) return;
      insertPortraitHeadDuckLayer(container, layer, characterId);
    };
  }

  if(typeof renderStatusHeadDuck === 'function'){
    renderStatusHeadDuck = function(){
      const character = getCurrentCharacter();
      const layer = buildPortraitHeadDuckLayer(character.id, 'status');
      if(!layer) return;
      insertPortraitHeadDuckLayer(statusPeepPreview, layer, character.id);
    };
  }

  function syncDuckBuckLabels(){
    const p = ensurePerkProgress();
    const count = Number(p.duckBucks || 0).toLocaleString();
    const a = document.querySelector('#taskShopBuckCount');
    const b = document.querySelector('#taskHeaderBuckCount');
    if(a) a.textContent = count;
    if(b) b.textContent = count;
  }

  function buyDoubleHeadDuckPerk(){
    const p = ensurePerkProgress();
    if(p.doubleHeadDuckUnlocked){
      try{ showToast('Snuggle Ducks is already unlocked! ♡'); }catch(error){}
      return;
    }
    if(Number(p.duckBucks || 0) < PERK.price){
      try{ showToast(`You need ${PERK.price - Number(p.duckBucks || 0)} more Duck Bucks.`); }catch(error){}
      return;
    }
    p.duckBucks = Number(p.duckBucks || 0) - PERK.price;
    p.doubleHeadDuckUnlocked = true;
    if(typeof persist === 'function') persist();
    syncDuckBuckLabels();
    renderTaskShopPerkCard();
    try{ renderDuckDetailPlacementControls(); }catch(error){}
    try{ renderDuckPlacements(); }catch(error){}
    try{ renderProfiles(); }catch(error){}
    try{ renderStatusCharacter(); }catch(error){}
    try{ showToast('Snuggle Ducks unlocked! Every OC can now wear two head ducks. ♡'); }catch(error){}
  }

  function renderTaskShopPerkCard(){
    const grid = document.querySelector('#taskShopGrid');
    if(!grid) return;

    const p = ensurePerkProgress();
    const owned = Boolean(p.doubleHeadDuckUnlocked);

    let card = grid.querySelector('.task-shop-item-v261-perk');
    if(!card){
      card = document.createElement('article');
      card.className = 'task-shop-item-v254 task-shop-item-v261-perk';

      const img = document.createElement('img');
      img.src = PERK.image;
      img.alt = '';
      img.onerror = ()=>{ if(PERK.fallback) img.src = PERK.fallback; };

      const copy = document.createElement('div');
      const name = document.createElement('strong');
      name.textContent = PERK.name;
      const desc = document.createElement('small');
      desc.className = 'task-shop-item-v261-desc';
      desc.textContent = PERK.description;
      copy.append(name, desc);

      const foot = document.createElement('div');
      foot.className = 'task-shop-item-foot-v254';

      const price = document.createElement('span');
      price.className = 'task-buck-inline-v254';
      price.innerHTML = `<img src="assets/task-shop/duck-bucks.png" alt="" /> <b>${PERK.price}</b>`;

      const buy = document.createElement('button');
      buy.type = 'button';
      buy.className = 'task-shop-item-v261-buy';
      buy.addEventListener('click', buyDoubleHeadDuckPerk);

      foot.append(price, buy);
      card.append(img, copy, foot);
      grid.append(card);
    }

    card.classList.toggle('owned', owned);
    const buy = card.querySelector('.task-shop-item-v261-buy');
    if(buy){
      buy.textContent = owned ? 'Owned' : 'Buy';
      buy.disabled = owned || Number(p.duckBucks || 0) < PERK.price;
    }
    syncDuckBuckLabels();
  }

  const taskShopObserver = document.querySelector('#taskShopGrid');
  if(taskShopObserver){
    const observer = new MutationObserver(()=>{
      try{ renderTaskShopPerkCard(); }catch(error){}
    });
    observer.observe(taskShopObserver, {childList:true});
    setTimeout(()=>{try{renderTaskShopPerkCard();}catch(error){}}, 0);
  }

  function assignSelectedDuckToCurrentOcSecond(){
    if(!perkUnlocked()) return;
    const duckId = typeof validDisplayDuckId === 'function' ? validDisplayDuckId(selectedDuckId) : null;
    if(!duckId) return;

    normalizeDuckDisplays?.();
    const character = getCurrentCharacter();
    const map = ensureSecondHeadState();
    const current = currentSecondHeadDuckId(character.id);

    if(current === duckId){
      delete map[character.id];
      if(typeof persist === 'function') persist();
      try{ renderDuckPlacements(); }catch(error){}
      try{ renderDuckDetailPlacementControls(); }catch(error){}
      try{ renderProfiles(); }catch(error){}
      try{ renderStatusCharacter(); }catch(error){}
      try{ showToast(`${DUCKS[duckId].name} hopped off ${character.name}'s head.`); }catch(error){}
      return;
    }

    map[character.id] = duckId;
    if(typeof persist === 'function') persist();
    try{ renderDuckPlacements(); }catch(error){}
    try{ renderDuckDetailPlacementControls(); }catch(error){}
    try{ renderProfiles(); }catch(error){}
    try{ renderStatusCharacter(); }catch(error){}
    try{ showToast(`${DUCKS[duckId].name} is now ${character.name}'s second duck! ♡`); }catch(error){}
  }

  function ensureSecondaryAssignButton(){
    const primary = document.querySelector('#assignDuckToOc');
    if(!primary || !primary.parentElement) return null;
    let btn = document.querySelector('#assignDuckToOcSecond');
    if(btn) return btn;

    btn = document.createElement('button');
    btn.id = 'assignDuckToOcSecond';
    btn.className = 'duck-placement-button';
    btn.type = 'button';
    btn.innerHTML = `
      <span class="duck-placement-button-icon"><img class="tiny-standard-duck-icon" src="assets/ducks/Standard-duck.webp" alt="" aria-hidden="true" /></span>
      <span class="duck-placement-button-copy">
        <strong>Assign as 2nd Duck</strong>
        <small id="assignDuckToOcSecondNote">Place this duck beside the first duck.</small>
      </span>`;
    btn.addEventListener('click', assignSelectedDuckToCurrentOcSecond);
    primary.insertAdjacentElement('afterend', btn);
    return btn;
  }

  function renderSecondDuckPlacementUi(){
    const btn = ensureSecondaryAssignButton();
    if(!btn || typeof getCurrentCharacter !== 'function') return;
    const note = btn.querySelector('#assignDuckToOcSecondNote');
    const currentText = document.querySelector('#currentHeadDuckText');
    const character = getCurrentCharacter();
    const [firstId, secondId] = headDuckPair(character.id);

    btn.classList.toggle('hidden', !perkUnlocked());
    if(!perkUnlocked()){
      if(currentText){
        currentText.textContent = `${character.name}'s head: ${duckDisplayName(firstId)}`;
      }
      return;
    }

    const duckId = typeof validDisplayDuckId === 'function' ? validDisplayDuckId(selectedDuckId) : null;
    const thisDuckSecond = Boolean(duckId && secondId === duckId);
    const strong = btn.querySelector('strong');
    if(strong) strong.textContent = thisDuckSecond ? 'Remove 2nd Duck' : 'Assign as 2nd Duck';
    btn.classList.toggle('active', thisDuckSecond);

    if(note){
      if(thisDuckSecond && duckId){
        note.textContent = `Take ${DUCKS[duckId].name} off ${character.name}'s head.`;
      }else if(duckId && secondId){
        note.textContent = `Replace ${duckDisplayName(secondId)} with ${DUCKS[duckId].name} as the second duck.`;
      }else if(duckId){
        note.textContent = `Place ${DUCKS[duckId].name} beside the first duck on ${character.name}'s head.`;
      }else{
        note.textContent = 'Place this duck beside the first duck.';
      }
    }

    if(currentText){
      currentText.textContent = secondId
        ? `${character.name}'s ducks: ${duckDisplayName(firstId)} + ${duckDisplayName(secondId)}`
        : `${character.name}'s ducks: ${duckDisplayName(firstId)}`;
    }
  }

  if(typeof renderDuckDetailPlacementControls === 'function'){
    const previousRenderDuckDetailPlacementControls = renderDuckDetailPlacementControls;
    renderDuckDetailPlacementControls = function(){
      const result = previousRenderDuckDetailPlacementControls.apply(this, arguments);
      try{ renderSecondDuckPlacementUi(); }catch(error){}
      return result;
    };
  }

  ensurePerkProgress();
  syncDuckBuckLabels();
  try{ renderTaskShopPerkCard(); }catch(error){}
})();
