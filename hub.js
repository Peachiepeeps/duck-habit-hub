// Hub helpers — consolidated for Duckie Days 24.287.

// ===== Source: hub-v265.js =====
// Duckie Days v24.265 — hub polish, task editing, inventory grouping, shop cleanup.
(function(){
  'use strict';
  const TC=window.DuckieTradingCards;

  function powerState(){
    try{return TC?.cardCraft?.ensure?.(save)||null;}catch(error){return null;}
  }
  function migratePowerDust(){
    const state=powerState();
    if(!state) return;
    const legacy=Math.max(0,Math.floor(Number(state.cardDust)||0));
    if(!Number.isFinite(Number(state.powerUpDust))) state.powerUpDust=legacy;
    state.powerUpDust=Math.max(0,Math.floor(Number(state.powerUpDust)||0));
    state.cardDust=state.powerUpDust;
    try{persist();}catch(error){}
  }

  // Owned wallpapers should disappear from Shop just like other permanent unlocks.
  try{
    if(typeof shopListingIsOwned==='function'){
      const previousShopListingIsOwned=shopListingIsOwned;
      shopListingIsOwned=function(listing){
        if(listing?.wallpaperId) return Boolean(isWallpaperUnlocked(listing.wallpaperId));
        return previousShopListingIsOwned.apply(this,arguments);
      };
    }
  }catch(error){console.warn('v24.265 wallpaper Shop filter skipped',error);}

  // ---- Inventory polish ---------------------------------------------------
  function makeInventorySection(title,subtitle,className=''){
    const section=document.createElement('section');
    section.className=`inventory-group-v265 ${className}`.trim();
    const heading=document.createElement('div');
    heading.className='inventory-group-heading-v265';
    const strong=document.createElement('strong');strong.textContent=title;
    const small=document.createElement('small');small.textContent=subtitle;
    heading.append(strong,small);
    const grid=document.createElement('div');grid.className='inventory-group-grid-v265';
    section.append(heading,grid);
    return {section,grid};
  }

  function organizeBattleInventory(){
    if(typeof currentInventoryTab==='undefined'||currentInventoryTab!=='battle'||!inventoryGrid) return;
    const cards=[...inventoryGrid.querySelectorAll('.inventory-item-card')];
    if(!cards.length) return;
    const byId=new Map(cards.map(card=>[card.dataset.itemId,card]));
    const pons=['buddy-pon','super-buddy-pon','boss-buddy-pon'];
    const hearts=['pink-heart-refill','gold-heart-refill'];
    inventoryGrid.innerHTML='';

    const ponGroup=makeInventorySection('Buddy Pons','Befriend enemies with stronger Pons for tougher Buddies.','buddy-pon-group-v265');
    pons.forEach(id=>{const card=byId.get(id);if(card)ponGroup.grid.append(card);});
    if(ponGroup.grid.children.length) inventoryGrid.append(ponGroup.section);

    const heartGroup=makeInventorySection('Heart Refills','Restore HP during Duck Quest battles.','heart-refill-group-v265');
    hearts.forEach(id=>{const card=byId.get(id);if(card)heartGroup.grid.append(card);});
    if(heartGroup.grid.children.length) inventoryGrid.append(heartGroup.section);

    const used=new Set([...pons,...hearts]);
    const other=cards.filter(card=>!used.has(card.dataset.itemId));
    if(other.length){
      const misc=makeInventorySection('Other Battle Items','Other consumables you can bring into battle.');
      other.forEach(card=>misc.grid.append(card));
      inventoryGrid.append(misc.section);
    }
  }

  function addPowerDustInventoryCard(){
    if(typeof currentInventoryTab==='undefined'||currentInventoryTab!=='crafting'||!inventoryGrid) return;
    const state=powerState();
    if(!state) return;
    inventoryGrid.querySelector('.inventory-empty')?.remove();
    inventoryGrid.querySelector('.power-dust-card-v265')?.remove();
    const card=document.createElement('div');
    card.className='inventory-item-card power-dust-card-v265';
    const icon=document.createElement('span');icon.className='inventory-item-icon power-dust-icon-v265';icon.textContent='✦';
    const name=document.createElement('strong');name.textContent='Power Up Dust';
    const qty=document.createElement('span');qty.className='inventory-item-quantity';qty.textContent=`×${Number(state.powerUpDust||0).toLocaleString()}`;
    const note=document.createElement('small');note.className='power-dust-note-v265';note.textContent='Cards + Buddy leveling';
    card.append(icon,name,qty,note);
    inventoryGrid.prepend(card);
  }

  try{
    if(typeof renderInventory==='function'){
      const previousRenderInventory=renderInventory;
      renderInventory=function(){
        const result=previousRenderInventory.apply(this,arguments);
        try{organizeBattleInventory();addPowerDustInventoryCard();}catch(error){console.warn('v24.265 Inventory polish skipped',error);}
        return result;
      };
    }
  }catch(error){}

  // ---- Task editing -------------------------------------------------------
  let editingTaskId=null;
  const formPanel=document.querySelector('#taskFormPanel');
  const form=document.querySelector('#taskForm');
  const submitButton=form?.querySelector('button[type="submit"]');
  const sourceField=document.querySelector('#taskSource')?.closest('.form-field');
  const eyebrow=formPanel?.querySelector('.panel-header .eyebrow');
  const heading=formPanel?.querySelector('.panel-header h1');

  function setTaskFormMode(editing){
    formPanel?.classList.toggle('task-edit-mode-v265',Boolean(editing));
    if(eyebrow)eyebrow.textContent=editing?'EDIT TASK':'NEW TASK';
    if(heading)heading.textContent=editing?'Edit Task':'Add Task';
    if(submitButton)submitButton.textContent=editing?'Save Changes':'Add Task';
    sourceField?.classList.toggle('hidden',Boolean(editing));
    saveTemplateToggle?.classList.toggle('hidden',Boolean(editing));
  }

  function clearTaskEditMode(){editingTaskId=null;setTaskFormMode(false);}

  function openTaskEditor(taskId){
    const task=save.tasks.find(item=>item.id===taskId);
    if(!task)return;
    editingTaskId=task.id;
    resetTaskForm();
    if(taskSource)taskSource.value='new';
    updateTaskSourceMode();
    taskName.value=task.name||'';
    setTaskRewardInForm(task.reward);
    applyRepeatToTaskForm(structuredClone(task.repeat||{type:'once'}));
    if(task.repeat?.type==='once'&&taskSpecificDate){
      taskSpecificDate.min=localDateKey();
      taskSpecificDate.value=task.nextDue&&task.nextDue>=localDateKey()?task.nextDue:localDateKey();
    }
    if(saveAsTemplate)saveAsTemplate.checked=false;
    setTaskFormMode(true);
    formPanel.classList.remove('hidden');
    requestAnimationFrame(()=>taskName.focus());
  }

  try{
    if(typeof renderTaskCard==='function'){
      const previousRenderTaskCard=renderTaskCard;
      renderTaskCard=function(task,options){
        const card=previousRenderTaskCard.apply(this,arguments);
        if(card)card.dataset.taskId=task.id;
        return card;
      };
    }
    if(typeof renderTasks==='function'){
      const previousRenderTasksV265=renderTasks;
      renderTasks=function(){
        const result=previousRenderTasksV265.apply(this,arguments);
        document.querySelectorAll('.task-card').forEach(card=>{
          if(card.dataset.taskId)return;
          const title=card.querySelector('.task-card-title')?.textContent;
          const task=save.tasks.find(item=>item.name===title);
          if(task)card.dataset.taskId=task.id;
        });
        return result;
      };
    }
  }catch(error){console.warn('v24.265 task tagging skipped',error);}

  document.querySelector('#tasksContent')?.addEventListener('click',event=>{
    const card=event.target.closest?.('.task-card');
    if(!card||event.target.closest('button,input,select,a,label'))return;
    if(card.dataset.taskId)openTaskEditor(card.dataset.taskId);
  });

  form?.addEventListener('submit',event=>{
    if(!editingTaskId)return;
    event.preventDefault();event.stopImmediatePropagation();
    const task=save.tasks.find(item=>item.id===editingTaskId);
    if(!task){clearTaskEditMode();return;}
    const name=String(taskName.value||'').trim();
    if(!name){taskName.focus();return;}
    const reward=getTaskReward();
    if(!reward){showToast('Choose a Pink Coin reward.');customReward.focus();return;}
    const repeat=getRepeatDefinition();
    if(!repeat){
      showToast(taskRepeat.value==='weekdays'?'Choose at least one weekday.':taskRepeat.value==='monthly-day'?'Choose a day from 1 to 31.':'Choose how many days to repeat.');
      return;
    }
    let nextDue=initialDueForRepeat(repeat);
    if(repeat.type==='once'){
      ensureSpecificDateControls();
      const chosen=taskSpecificDate?.value||localDateKey();
      if(chosen<localDateKey()){showToast('Choose today or a future date.');taskSpecificDate?.focus();return;}
      nextDue=chosen;
    }
    if(repeat.type==='anytime')nextDue=null;
    task.name=name;task.reward=reward;task.repeat=repeat;task.nextDue=nextDue;
    persist();
    const editedName=task.name;
    clearTaskEditMode();
    closeTaskForm();
    currentTaskTab=taskBucket(task);
    renderTasks();
    showToast(`Updated "${editedName}"!`);
  },true);

  document.querySelector('#addTaskButton')?.addEventListener('click',()=>{clearTaskEditMode();setTimeout(()=>setTaskFormMode(false),0);},true);
  document.querySelector('#closeTaskForm')?.addEventListener('click',clearTaskEditMode);
  document.querySelector('#cancelTaskForm')?.addEventListener('click',clearTaskEditMode);

  migratePowerDust();
  try{renderTasks();}catch(error){}
  window.DUCKIE_HUB_V265='24.265';
})();
;

// ===== Source: hub-v267.js =====
(function(){
  'use strict';
  const GLITTER='assets/ingredients/Sparkle.webp';
  const TC=window.DuckieTradingCards;

  function powerDust(){
    try{return Math.max(0,Number(TC?.cardCraft?.ensure?.(save)?.powerUpDust)||0);}catch(e){return 0;}
  }
  function removeDustInventoryCard(){
    document.querySelectorAll('.power-dust-card-v265,[data-item-id="power-up-dust"],[data-item-id="card-dust"]').forEach(el=>el.remove());
  }
  function refreshCurrency(){
    const pill=document.querySelector('#statusPowerDustV267');
    if(pill) pill.querySelector('strong').textContent=powerDust().toLocaleString();
  }
  function ensureStatusCurrency(){
    const header=document.querySelector('#statusPanel .status-header');
    if(!header||document.querySelector('#statusPowerDustV267'))return;
    const pill=document.createElement('div');pill.id='statusPowerDustV267';pill.className='power-up-dust-pill-v267';pill.setAttribute('aria-label','Power Up Dust');
    pill.innerHTML=`<img src="${GLITTER}" alt=""><strong>${powerDust().toLocaleString()}</strong>`;
    const close=header.querySelector('#closeStatus');
    if(close) header.insertBefore(pill,close); else header.append(pill);
  }
  function ensureStatusSkills(){
    const rank=document.querySelector('#statusPanel .status-rank-card');
    if(!rank||rank.querySelector('#statusOcSkillsV267'))return;
    const btn=document.createElement('button');btn.id='statusOcSkillsV267';btn.className='status-skills-button-v267';btn.type='button';btn.textContent='OC Skills';
    btn.addEventListener('click',()=>{window.location.href='duck-quest/index.html?openSkills=1';});
    rank.append(btn);
  }
  function addGlitterToCardCurrency(){
    document.querySelectorAll('.tc-dust-line-v262,.tc-workshop-dust-v264').forEach(el=>{
      if(el.querySelector('.power-up-dust-inline-icon-v267'))return;
      const img=document.createElement('img');img.className='power-up-dust-inline-icon-v267';img.src=GLITTER;img.alt='';el.prepend(img);
    });
  }
  try{
    if(typeof renderInventory==='function'){
      const prior=renderInventory;
      renderInventory=function(){const result=prior.apply(this,arguments);requestAnimationFrame(removeDustInventoryCard);return result;};
    }
    if(typeof renderStatus==='function'){
      const priorStatus=renderStatus;
      renderStatus=function(){const result=priorStatus.apply(this,arguments);ensureStatusCurrency();ensureStatusSkills();refreshCurrency();return result;};
    }
  }catch(e){}
  function init(){removeDustInventoryCard();ensureStatusCurrency();ensureStatusSkills();refreshCurrency();addGlitterToCardCurrency();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
  document.addEventListener('click',()=>requestAnimationFrame(()=>{removeDustInventoryCard();addGlitterToCardCurrency();refreshCurrency();}),true);
  window.DUCKIE_HUB_V267='24.267';
})();
;
