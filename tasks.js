// Tasks — consolidated for Duckie Days 24.287.

// ===== Source: task-progression-v254.js =====
(function(){
  'use strict';

  const BUILD='24.254';
  const DB_ICON='assets/task-shop/Duck-bucks.png';
  const SHELF_UNLOCK_TASKS=50;
  const SHELF_SLOTS=24;
  const SURPRISE_CHANCE=.15;

  const COLLECTIBLES=[
    {id:'task-plush-1',name:'Special Plush 1',image:'assets/task-shop/Task-plush-1.png',price:20,kind:'collectible',description:'A Task Shop exclusive plush for your collectible shelf.'},
    {id:'task-plush-2',name:'Special Plush 2',image:'assets/task-shop/Task-plush-2.png',price:20,kind:'collectible',description:'A Task Shop exclusive plush for your collectible shelf.'},
    {id:'task-plush-3',name:'Special Plush 3',image:'assets/task-shop/Task-plush-3.png',price:20,kind:'collectible',description:'A Task Shop exclusive plush for your collectible shelf.'},
    {id:'task-plush-4',name:'Special Plush 4',image:'assets/task-shop/Task-plush-4.png',price:20,kind:'collectible',description:'A Task Shop exclusive plush for your collectible shelf.'},
    {id:'task-plush-5',name:'Special Plush 5',image:'assets/task-shop/Task-plush-5.png',price:20,kind:'collectible',description:'A Task Shop exclusive plush for your collectible shelf.'}
  ];

  const SHOP_ITEMS=[
    ...COLLECTIBLES,
    {id:'exp-candy-small',name:'EXP Candy Small',image:'assets/items/quest-boosts/Exp-candy-small.png',price:8,kind:'inventory',qty:1,description:'Adds 20% of the active OC’s current Duck Quest EXP bar.'},
    {id:'exp-candy-large',name:'EXP Candy Large',image:'assets/items/quest-boosts/Exp-candy-large.png',price:18,kind:'inventory',qty:1,description:'Adds 50% of the active OC’s current Duck Quest EXP bar.'},
    {id:'card-pack',name:'Trading Card Pack',image:'assets/trading-cards/card-pack-unopened.png',price:15,kind:'pack',qty:1,description:'Adds one unopened Trading Card Pack.'},
    {id:'rare-egg',name:'Rare Egg',image:'duck-quest/assets/eggs/Rare-egg.png',price:20,kind:'inventory',qty:1,description:'A harder-to-get egg with better Buddy possibilities.'},
    {id:'jump-token-bundle',name:'Jump Token Bundle',image:'duck-quest/assets/dash/Jump-Token.png',price:8,kind:'inventory',inventoryId:'jump-token',qty:3,description:'Three Jump Tokens for Duckie Dash.'}
  ];

  const FIXED_MILESTONES=[
    {count:1,key:'m1',label:'1',reward:'Random Card'},
    {count:5,key:'m5',label:'5',reward:'Card Pack'},
    {count:15,key:'m15',label:'15',reward:'Card Pack'},
    {count:25,key:'m25',label:'25',reward:'+5 Duck Bucks'},
    {count:40,key:'m40',label:'40',reward:'EXP Candy'},
    {count:60,key:'m60',label:'60',reward:'Pack + 5 Bucks'}
  ];

  function todayKey(){
    try{return localDateKey();}catch(error){
      const d=new Date();
      return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    }
  }

  function ensureProgress(){
    if(!save.taskProgression || typeof save.taskProgression!=='object' || Array.isArray(save.taskProgression)) save.taskProgression={};
    const p=save.taskProgression;
    p.duckBucks=Math.max(0,Math.floor(Number(p.duckBucks)||0));
    p.collectiblesOwned=Array.isArray(p.collectiblesOwned)?[...new Set(p.collectiblesOwned.map(String))]:[];
    p.shelfSlots=Array.isArray(p.shelfSlots)?p.shelfSlots.slice(0,SHELF_SLOTS):[];
    while(p.shelfSlots.length<SHELF_SLOTS) p.shelfSlots.push(null);
    p.shelfSlots=p.shelfSlots.map(id=>COLLECTIBLES.some(item=>item.id===id)&&p.collectiblesOwned.includes(id)?id:null);
    p.shelfUnlocked=Boolean(p.shelfUnlocked || Number(save.stats?.tasksCompleted||0)>=SHELF_UNLOCK_TASKS);
    p.shelfUnlockSeen=Boolean(p.shelfUnlockSeen);

    const day=todayKey();
    if(p.dayKey!==day){
      p.dayKey=day;
      p.completedToday=0;
      p.claimedMilestones={};
      p.perfectDayClaimed=false;
      p.buddyBoostActive=false;
      p.dailyStarted=false;
    }
    p.completedToday=Math.max(0,Math.floor(Number(p.completedToday)||0));
    if(!p.claimedMilestones || typeof p.claimedMilestones!=='object') p.claimedMilestones={};
    p.perfectDayClaimed=Boolean(p.perfectDayClaimed);
    p.buddyBoostActive=Boolean(p.buddyBoostActive || p.completedToday>=5);
    p.dailyStarted=Boolean(p.dailyStarted || p.completedToday>0);
    return p;
  }

  function saveNow(){
    try{persist();}
    catch(error){try{localStorage.setItem('duckHabitHubSave_v1',JSON.stringify(save));}catch(inner){}}
  }

  function addInventory(id,qty=1){
    if(!save.inventory || typeof save.inventory!=='object') save.inventory={};
    save.inventory[id]=Math.max(0,Math.floor(Number(save.inventory[id])||0))+Math.max(1,Math.floor(Number(qty)||1));
  }

  function addCoins(qty){
    const amount=Math.max(1,Math.floor(Number(qty)||1));
    save.coins=Math.max(0,Number(save.coins)||0)+amount;
    try{recordCoinsEarned(amount);}catch(error){}
  }

  function addDuckBucks(qty){
    const p=ensureProgress();
    p.duckBucks+=Math.max(1,Math.floor(Number(qty)||1));
  }

  function grantPack(qty=1){
    const tc=window.DuckieTradingCards;
    if(!tc) return false;
    tc.grantPack(save,qty);
    return true;
  }

  function grantRandomCard(){
    const tc=window.DuckieTradingCards;
    if(!tc) return null;
    const rarity=tc.rollRarity();
    const card=tc.rollCard(rarity);
    if(!card) return null;
    tc.grantCard(save,card.id,1);
    return card;
  }

  function grantFixedMilestone(m){
    const p=ensureProgress();
    if(m.count===1){
      const card=grantRandomCard();
      return card?`Random card: ${card.name}`:'Random trading card';
    }
    if(m.count===5 || m.count===15){grantPack(1);return '+1 Card Pack';}
    if(m.count===25){addDuckBucks(5);return '+5 Duck Bucks';}
    if(m.count===40){addInventory('exp-candy-small',1);return '+1 EXP Candy Small';}
    if(m.count===60){grantPack(1);addDuckBucks(5);return '+1 Card Pack · +5 Duck Bucks';}
    return m.reward;
  }

  function processTreasureRewards(){
    const p=ensureProgress();
    const earned=[];
    for(const m of FIXED_MILESTONES){
      if(p.completedToday>=m.count && !p.claimedMilestones[m.key]){
        const reward=grantFixedMilestone(m);
        p.claimedMilestones[m.key]=true;
        earned.push(`${m.count} tasks: ${reward}`);
      }
    }
    for(let threshold=80;threshold<=p.completedToday;threshold+=20){
      const key=`overflow-${threshold}`;
      if(p.claimedMilestones[key]) continue;
      addDuckBucks(5);
      p.claimedMilestones[key]=true;
      earned.push(`${threshold} tasks: +5 Duck Bucks`);
    }
    return earned;
  }

  function surpriseDrop(){
    if(Math.random()>=SURPRISE_CHANCE) return null;
    const roll=Math.random();
    if(roll<.45){const coins=10+Math.floor(Math.random()*21);addCoins(coins);return `Surprise Drop: +${coins} Pink Coins!`;}
    if(roll<.70){addDuckBucks(2);return 'Surprise Drop: +2 Duck Bucks!';}
    if(roll<.82){addInventory('jump-token',1);return 'Surprise Drop: +1 Jump Token!';}
    if(roll<.90){addInventory('exp-candy-small',1);return 'Surprise Drop: +1 EXP Candy Small!';}
    if(roll<.97){const card=grantRandomCard();return `Surprise Drop: ${card?card.name:'a Trading Card'}!`;}
    grantPack(1);return 'Surprise Drop: +1 Card Pack!';
  }

  function perfectDayReward(){
    const roll=Math.random();
    if(roll<.35){grantPack(1);return 'Perfect Day Chest: +1 Card Pack!';}
    if(roll<.55){addInventory('exp-candy-small',1);return 'Perfect Day Chest: +1 EXP Candy Small!';}
    if(roll<.70){addDuckBucks(5);return 'Perfect Day Chest: +5 Duck Bucks!';}
    if(roll<.85){addInventory('rare-egg',1);return 'Perfect Day Chest: +1 Rare Egg!';}
    if(roll<.95){addInventory('jump-token',3);return 'Perfect Day Chest: +3 Jump Tokens!';}
    grantPack(2);return 'Perfect Day Chest JACKPOT: +2 Card Packs!';
  }

  function readyTodayCount(){
    try{return save.tasks.filter(task=>taskBucket(task)==='today' && isTaskReady(task)).length;}
    catch(error){return 0;}
  }

  function nextTreasureTarget(count){
    for(const m of FIXED_MILESTONES) if(count<m.count) return m.count;
    if(count<80) return 80;
    return 80+(Math.floor((count-80)/20)+1)*20;
  }

  function previousTreasureTarget(count,next){
    const fixed=FIXED_MILESTONES.map(m=>m.count);
    let prev=0;
    for(const v of fixed) if(v<=count) prev=v;
    if(count>=80) prev=80+Math.floor((count-80)/20)*20;
    if(prev===next) prev=Math.max(0,next-20);
    return prev;
  }

  function makeBuckInline(amount){
    const span=document.createElement('span');
    span.className='task-duck-buck-inline-v254';
    const img=document.createElement('img');img.src=DB_ICON;img.alt='';
    const text=document.createElement('strong');text.textContent=String(amount);
    span.append(img,text);return span;
  }

  function renderTaskProgressCard(){
    const p=ensureProgress();
    const card=document.createElement('section');
    card.className='task-treasure-card-v254 task-treasure-card-v257';

    const head=document.createElement('div');head.className='task-treasure-head-v257';
    const label=document.createElement('span');label.textContent='TREASURE TASKS';
    const completed=document.createElement('strong');completed.textContent=`${p.completedToday} task${p.completedToday===1?'':'s'} completed today`;
    head.append(label,completed);

    const next=nextTreasureTarget(p.completedToday);
    const dailyTotal=60;
    const ratio=Math.max(0,Math.min(1,p.completedToday/Math.max(1,dailyTotal)));
    const bar=document.createElement('div');bar.className='task-treasure-bar-v254';
    const fill=document.createElement('span');fill.style.width=`${ratio*100}%`;bar.append(fill);
    const progress=document.createElement('div');progress.className='task-treasure-progress-v254';
    progress.innerHTML=`<span>Daily Task Treasure Goal <b>${dailyTotal}</b></span><span>${p.completedToday} / ${dailyTotal}</span>`;

    const milestones=document.createElement('div');milestones.className='task-treasure-milestones-v254';
    FIXED_MILESTONES.forEach(m=>{
      const chip=document.createElement('div');
      const claimed=Boolean(p.claimedMilestones[m.key]);
      chip.className=`task-treasure-chip-v254${claimed?' claimed':''}`;
      chip.innerHTML=`<b>${claimed?'✓':m.label}</b><span>${m.reward}</span>`;
      milestones.append(chip);
    });

    const statusRow=document.createElement('div');statusRow.className='task-treasure-status-row-v257';

    const bucks=document.createElement('div');bucks.className='task-treasure-status-v257';
    bucks.append(makeBuckInline(p.duckBucks));

    const perfect=document.createElement('div');perfect.className=`task-treasure-status-v257${p.perfectDayClaimed?' active':''}`;
    const perfectIcon=document.createElement('img');perfectIcon.className='status-icon-img-v258';perfectIcon.src='duck-quest/assets/items/chests/treasure/closed.png';perfectIcon.alt='';
    const perfectCopy=document.createElement('span');perfectCopy.className='status-copy-v257';
    perfectCopy.innerHTML=`<strong>Perfect Day</strong><small>${p.perfectDayClaimed?'Obtained':'5 tasks + clear list'}</small>`;
    perfect.append(perfectIcon,perfectCopy);

    const boost=document.createElement('div');boost.className=`task-treasure-status-v257${p.buddyBoostActive?' active':''}`;
    const boostIcon=document.createElement('img');boostIcon.className='status-icon-img-v258';boostIcon.src='duck-quest/assets/enemies/cat-slime/base/Strawberry-idle-1-neutral.png';boostIcon.alt='';
    const boostCopy=document.createElement('span');boostCopy.className='status-copy-v257';
    boostCopy.innerHTML=`<strong>Buddy Boost</strong><small>${p.buddyBoostActive?'Activated':'5 tasks'}</small>`;
    boost.append(boostIcon,boostCopy);

    statusRow.append(bucks,perfect,boost);
    card.append(head,bar,progress,milestones,statusRow);
    return card;
  }

  function queueMessages(messages){
    messages.filter(Boolean).forEach((message,index)=>{
      setTimeout(()=>{try{showToast(message);}catch(error){}},1900+(index*1900));
    });
  }

  // ---- Task completion hook ------------------------------------------------
  if(typeof completeTask==='function' && !window.DuckieTaskProgressV254Installed){
    const previousCompleteTask=completeTask;
    completeTask=function(id){
      const task=save.tasks.find(item=>item.id===id);
      if(!task || !isTaskReady(task)) return previousCompleteTask.apply(this,arguments);
      const statsBefore=Math.max(0,Number(save.stats?.tasksCompleted)||0);
      const dueBefore=readyTodayCount();
      ensureProgress();
      const result=previousCompleteTask.apply(this,arguments);
      const statsAfter=Math.max(0,Number(save.stats?.tasksCompleted)||0);
      if(statsAfter<=statsBefore) return result;

      const p=ensureProgress();
      p.dailyStarted=true;
      p.completedToday+=1;
      p.duckBucks+=1;
      const messages=[`+1 Duck Buck · Task Treasure ${p.completedToday}`];
      messages.push(...processTreasureRewards().map(text=>`Task Treasure! ${text}`));

      const drop=surpriseDrop();
      if(drop) messages.push(drop);

      if(p.completedToday>=5 && !p.buddyBoostActive){
        p.buddyBoostActive=true;
        messages.push('Buddy Boost activated! Buddy abilities are +20% today.');
      }else if(p.completedToday>=5){
        p.buddyBoostActive=true;
      }

      const dueAfter=readyTodayCount();
      if(dueBefore>0 && dueAfter===0 && p.completedToday>=5 && !p.perfectDayClaimed){
        p.perfectDayClaimed=true;
        messages.push(perfectDayReward());
      }

      const unlockedBefore=Boolean(p.shelfUnlocked);
      if(Number(save.stats?.tasksCompleted||0)>=SHELF_UNLOCK_TASKS) p.shelfUnlocked=true;
      if(!unlockedBefore && p.shelfUnlocked){
        p.shelfUnlockSeen=true;
        messages.push('Collectible Shelf unlocked! Check the new arrow on the right side of your room.');
      }

      saveNow();
      try{renderTasks();}catch(error){}
      renderDuckBuckBalances();
      renderTaskShelfToggle();
      queueMessages(messages);
      return result;
    };
  }

  // ---- Today panel ---------------------------------------------------------
  if(typeof renderTasks==='function'){
    const previousRenderTasks=renderTasks;
    renderTasks=function(){
      const result=previousRenderTasks.apply(this,arguments);
      ensureProgress();
      if(tasksContent){
        const panel=tasksContent.closest('#tasksPanel');
        panel?.querySelectorAll('.task-treasure-card-v254').forEach(node=>node.remove());
        if(currentTaskTab==='today') tasksContent.before(renderTaskProgressCard());
      }
      renderDuckBuckBalances();
      return result;
    };
  }

  // ---- Task Shop -----------------------------------------------------------
  const taskShopPanel=document.querySelector('#taskShopPanel');
  const taskShopGrid=document.querySelector('#taskShopGrid');
  const taskShopBuckCount=document.querySelector('#taskShopBuckCount');
  const taskHeaderBuckCount=document.querySelector('#taskHeaderBuckCount');

  function renderDuckBuckBalances(){
    const p=ensureProgress();
    if(taskShopBuckCount) taskShopBuckCount.textContent=p.duckBucks.toLocaleString();
    if(taskHeaderBuckCount) taskHeaderBuckCount.textContent=p.duckBucks.toLocaleString();
  }

  function ownedCollectible(id){return ensureProgress().collectiblesOwned.includes(id);}

  function buyTaskShopItem(item){
    const p=ensureProgress();
    if(item.kind==='collectible' && ownedCollectible(item.id)){showToast(`${item.name} is already yours!`);return;}
    if(p.duckBucks<item.price){showToast(`You need ${item.price-p.duckBucks} more Duck Bucks.`);return;}
    p.duckBucks-=item.price;
    if(item.kind==='collectible'){
      p.collectiblesOwned.push(item.id);
    }else if(item.kind==='inventory'){
      addInventory(item.inventoryId||item.id,item.qty||1);
    }else if(item.kind==='pack'){
      grantPack(item.qty||1);
    }
    saveNow();
    renderTaskShop();
    renderTaskShelf();
    renderDuckBuckBalances();
    try{renderInventory();}catch(error){}
    showToast(`${item.name} obtained! ♡`);
  }

  function renderTaskShop(){
    if(!taskShopGrid) return;
    const p=ensureProgress();
    taskShopGrid.innerHTML='';
    SHOP_ITEMS.forEach(item=>{
      const owned=item.kind==='collectible' && ownedCollectible(item.id);
      const card=document.createElement('article');card.className=`task-shop-item-v254${owned?' owned':''}`;
      const img=document.createElement('img');img.src=item.image;img.alt='';
      if(item.fallback) img.onerror=()=>{if(img.src.endsWith(item.image.split('/').pop())) img.src=item.fallback;};
      const copy=document.createElement('div');
      const name=document.createElement('strong');name.textContent=item.name;
      const desc=document.createElement('small');desc.textContent=item.description;
      copy.append(name,desc);
      const foot=document.createElement('div');foot.className='task-shop-item-foot-v254';
      const price=makeBuckInline(item.price);
      const buy=document.createElement('button');buy.type='button';buy.textContent=owned?'Owned':'Buy';buy.disabled=owned || p.duckBucks<item.price;
      buy.addEventListener('click',()=>buyTaskShopItem(item));
      foot.append(price,buy);
      card.append(img,copy,foot);taskShopGrid.append(card);
    });
    renderDuckBuckBalances();
  }

  function openTaskShop(){
    if(!taskShopPanel) return;
    ensureProgress();
    tasksPanel?.classList.add('hidden');
    taskShopPanel.classList.remove('hidden');
    renderTaskShop();
  }
  function closeTaskShop(){
    taskShopPanel?.classList.add('hidden');
    tasksPanel?.classList.remove('hidden');
    try{renderTasks();}catch(error){}
  }
  document.querySelector('#openTaskShopButton')?.addEventListener('click',openTaskShop);
  document.querySelector('#closeTaskShop')?.addEventListener('click',closeTaskShop);

  if(typeof closePanels==='function'){
    const previousClosePanels=closePanels;
    closePanels=function(){taskShopPanel?.classList.add('hidden');closeTaskCollectiblePicker();return previousClosePanels.apply(this,arguments);};
  }
  if(typeof isHomeRoomInteractive==='function'){
    const previousIsHomeRoomInteractive=isHomeRoomInteractive;
    isHomeRoomInteractive=function(){return taskShopPanel?.classList.contains('hidden')!==false && taskCollectiblePicker?.classList.contains('hidden')!==false && previousIsHomeRoomInteractive.apply(this,arguments);};
  }

  // ---- Collectible Shelf ---------------------------------------------------
  const taskShelfButton=document.querySelector('#taskShelfButton');
  const taskShelfArrow=document.querySelector('#taskShelfArrow');
  const taskShelfLock=document.querySelector('#taskShelfLock');
  const taskCollectibleWing=document.querySelector('#taskCollectibleWing');
  const taskCollectibleSlots=document.querySelector('#taskCollectibleSlots');
  const taskCollectiblePicker=document.querySelector('#taskCollectiblePicker');
  const taskCollectiblePickerGrid=document.querySelector('#taskCollectiblePickerGrid');
  const clearTaskCollectibleSlot=document.querySelector('#clearTaskCollectibleSlot');
  let selectedTaskCollectibleSlot=null;

  function shelfUnlocked(){return ensureProgress().shelfUnlocked || Number(save.stats?.tasksCompleted||0)>=SHELF_UNLOCK_TASKS;}

  function renderTaskShelfToggle(){
    if(!taskShelfButton) return;
    const p=ensureProgress();
    if(Number(save.stats?.tasksCompleted||0)>=SHELF_UNLOCK_TASKS) p.shelfUnlocked=true;
    const unlocked=Boolean(p.shelfUnlocked);
    const inShelf=currentRoomView==='task-shelf' && unlocked;
    const inDuckWing=currentRoomView==='wing';
    taskShelfButton.classList.toggle('hidden',inDuckWing);
    taskShelfButton.classList.toggle('locked',!unlocked);
    if(taskShelfArrow) taskShelfArrow.textContent=inShelf?'‹':'›';
    if(taskShelfLock){
      taskShelfLock.textContent=unlocked?'':`🔒 ${Math.min(SHELF_UNLOCK_TASKS,Number(save.stats?.tasksCompleted||0))}/${SHELF_UNLOCK_TASKS}`;
      taskShelfLock.classList.toggle('hidden',unlocked);
    }
    stage?.classList.toggle('task-shelf-view',inShelf);
    taskCollectibleWing?.classList.toggle('hidden',!inShelf);
    if(typeof roomWingButton!=='undefined' && roomWingButton) roomWingButton.classList.toggle('task-shelf-hidden-v254',inShelf);
    taskShelfButton.setAttribute('aria-label',unlocked?(inShelf?'Return to the main room':'Visit Task Collectible Shelf'):`Collect ${SHELF_UNLOCK_TASKS} lifetime tasks to unlock the Task Collectible Shelf`);
    if(inShelf) renderTaskShelf();
  }

  function renderTaskShelf(){
    if(!taskCollectibleSlots) return;
    const p=ensureProgress();
    taskCollectibleSlots.innerHTML='';
    p.shelfSlots.forEach((id,index)=>{
      const item=COLLECTIBLES.find(entry=>entry.id===id);
      const btn=document.createElement('button');btn.type='button';btn.className=`wing-duck-slot task-collectible-slot-v254${item?' occupied':''}`;
      if(item){const img=document.createElement('img');img.src=item.image;img.alt='';btn.append(img);btn.setAttribute('aria-label',`Shelf spot ${index+1}: ${item.name}`);}
      else{const plus=document.createElement('span');plus.textContent='+';btn.append(plus);btn.setAttribute('aria-label',`Shelf spot ${index+1}: empty`);}
      btn.addEventListener('click',()=>openTaskCollectiblePicker(index));
      taskCollectibleSlots.append(btn);
    });
  }

  function closeTaskCollectiblePicker(){
    selectedTaskCollectibleSlot=null;
    taskCollectiblePicker?.classList.add('hidden');
    taskCollectiblePicker?.setAttribute('aria-hidden','true');
  }

  function chooseTaskCollectible(id){
    if(!Number.isInteger(selectedTaskCollectibleSlot)) return;
    const p=ensureProgress();
    if(!p.collectiblesOwned.includes(id)) return;
    p.shelfSlots.forEach((current,index)=>{if(current===id)p.shelfSlots[index]=null;});
    if(p.dresserCollectibleByRoom && typeof p.dresserCollectibleByRoom==='object'){
      Object.keys(p.dresserCollectibleByRoom).forEach(room=>{
        if(p.dresserCollectibleByRoom[room]===id) delete p.dresserCollectibleByRoom[room];
      });
    }
    p.shelfSlots[selectedTaskCollectibleSlot]=id;
    saveNow();closeTaskCollectiblePicker();renderTaskShelf();
    try{window.DuckieTaskDresserV260?.renderDresserCollectible?.();}catch(error){}
  }

  function renderTaskCollectiblePicker(){
    if(!taskCollectiblePickerGrid) return;
    const p=ensureProgress();taskCollectiblePickerGrid.innerHTML='';
    const owned=COLLECTIBLES.filter(item=>p.collectiblesOwned.includes(item.id));
    if(!owned.length){
      const empty=document.createElement('p');empty.className='task-collectible-empty-v254';empty.textContent='Buy a collectible from the Task Shop first, then it can live here. ♡';taskCollectiblePickerGrid.append(empty);return;
    }
    owned.forEach(item=>{
      const btn=document.createElement('button');btn.type='button';btn.className='task-collectible-choice-v254';
      const img=document.createElement('img');img.src=item.image;img.alt='';
      const name=document.createElement('span');name.textContent=item.name;
      btn.append(img,name);btn.addEventListener('click',()=>chooseTaskCollectible(item.id));taskCollectiblePickerGrid.append(btn);
    });
  }

  function openTaskCollectiblePicker(index){
    if(!shelfUnlocked()){showToast(`Complete ${Math.max(0,SHELF_UNLOCK_TASKS-Number(save.stats?.tasksCompleted||0))} more lifetime tasks to unlock this shelf.`);return;}
    selectedTaskCollectibleSlot=index;renderTaskCollectiblePicker();
    const current=ensureProgress().shelfSlots[index];
    if(clearTaskCollectibleSlot){clearTaskCollectibleSlot.disabled=!current;clearTaskCollectibleSlot.textContent=current?'Remove Collectible From This Spot':'Leave This Spot Empty';}
    taskCollectiblePicker?.classList.remove('hidden');taskCollectiblePicker?.setAttribute('aria-hidden','false');
  }

  function clearSelectedTaskCollectibleSlot(){
    if(!Number.isInteger(selectedTaskCollectibleSlot)) return;
    ensureProgress().shelfSlots[selectedTaskCollectibleSlot]=null;saveNow();closeTaskCollectiblePicker();renderTaskShelf();
  }

  function switchTaskShelfView(){
    const p=ensureProgress();
    if(!p.shelfUnlocked){showToast(`Collectible Shelf unlocks at ${SHELF_UNLOCK_TASKS} lifetime tasks · ${Math.min(SHELF_UNLOCK_TASKS,Number(save.stats?.tasksCompleted||0))}/${SHELF_UNLOCK_TASKS}`);return;}
    if(currentRoomView!=='main' && currentRoomView!=='task-shelf') return;
    try{hideTinyDuckSecret();}catch(error){}
    try{closeWingDuckPicker();}catch(error){}
    closeTaskCollectiblePicker();
    currentRoomView=currentRoomView==='task-shelf'?'main':'task-shelf';
    try{closeRoomPicker();}catch(error){}
    try{renderRoom();}catch(error){}
    try{renderRoomPicker();}catch(error){}
    try{renderRoomWingToggle();}catch(error){renderTaskShelfToggle();}
    renderTaskShelf();
  }

  taskShelfButton?.addEventListener('click',switchTaskShelfView);
  document.querySelector('#closeTaskCollectiblePicker')?.addEventListener('click',closeTaskCollectiblePicker);
  document.querySelector('#taskCollectiblePickerBackdrop')?.addEventListener('click',closeTaskCollectiblePicker);
  clearTaskCollectibleSlot?.addEventListener('click',clearSelectedTaskCollectibleSlot);

  if(typeof renderRoomWingToggle==='function'){
    const previousRenderRoomWingToggle=renderRoomWingToggle;
    renderRoomWingToggle=function(){const result=previousRenderRoomWingToggle.apply(this,arguments);renderTaskShelfToggle();return result;};
  }

  // Initial state and retroactive shelf unlock.
  const initial=ensureProgress();
  if(Number(save.stats?.tasksCompleted||0)>=SHELF_UNLOCK_TASKS) initial.shelfUnlocked=true;
  saveNow();
  renderDuckBuckBalances();
  renderTaskShelfToggle();
  renderTaskShelf();
  renderTaskShop();
  if(initial.shelfUnlocked && !initial.shelfUnlockSeen){
    initial.shelfUnlockSeen=true;saveNow();
    setTimeout(()=>{try{showToast('Collectible Shelf unlocked! Use the new right-side arrow. ♡');}catch(error){}},900);
  }

  window.DuckieTaskProgressV254Installed=true;
  window.DuckieTaskProgressV254={ensureProgress,renderTaskShop,renderTaskShelf,SHOP_ITEMS,COLLECTIBLES};
})();
;

// ===== Source: task-progression-v257.js =====
(function(){
  'use strict';

  const BUILD='24.257';
  const SHELF_FILES={
    cream:'assets/room-expansion/shelves/shelf-cream.webp',
    brown:'assets/room-expansion/shelves/shelf-brown.webp',
    'dark-brown':'assets/room-expansion/shelves/shelf-dark-brown.webp'
  };

  function progressState(){
    try{
      if(typeof save==='undefined' || !save || typeof save!=='object') return null;
      if(!save.taskProgression || typeof save.taskProgression!=='object') save.taskProgression={};
      const p=save.taskProgression;
      if(!SHELF_FILES[p.collectibleShelfStyle]) p.collectibleShelfStyle='cream';
      return p;
    }catch(error){return null;}
  }

  function renderCollectibleShelfStyle(){
    const p=progressState();
    const image=document.querySelector('#taskCollectibleShelfImage');
    if(!p || !image) return;
    const styleId=SHELF_FILES[p.collectibleShelfStyle] ? p.collectibleShelfStyle : 'cream';
    image.src=SHELF_FILES[styleId];
    document.querySelectorAll('[data-task-shelf-style]').forEach(button=>{
      const active=button.dataset.taskShelfStyle===styleId;
      button.classList.toggle('active',active);
      button.setAttribute('aria-pressed',String(active));
    });
  }

  function setCollectibleShelfStyle(styleId){
    const p=progressState();
    if(!p || !SHELF_FILES[styleId]) return;
    p.collectibleShelfStyle=styleId;
    try{ if(typeof persist==='function') persist(); }catch(error){}
    renderCollectibleShelfStyle();
  }

  function bind(){
    document.querySelectorAll('[data-task-shelf-style]').forEach(button=>{
      if(button.dataset.taskShelfBound==='1') return;
      button.dataset.taskShelfBound='1';
      button.addEventListener('click',()=>setCollectibleShelfStyle(button.dataset.taskShelfStyle));
    });
    document.querySelector('#taskShelfButton')?.addEventListener('click',()=>setTimeout(renderCollectibleShelfStyle,0));
    renderCollectibleShelfStyle();
    window.DUCKIE_DAYS_TASK_LAYOUT_V257=BUILD;
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',bind,{once:true});
  else bind();
})();
;

// ===== Source: task-progression-v260.js =====
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
;

// ===== Source: task-progression-v261.js =====
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
;
