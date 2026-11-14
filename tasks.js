// Tasks — consolidated for Duckie Days 24.287.

// ===== Source: task-progression-v254.js =====
(function(){
  'use strict';

  const BUILD='24.254';
  const DB_ICON='assets/task-shop/Duck-bucks.png';
  const SHELF_UNLOCK_TASKS=50;
  const SHELF_SLOTS=24;
  const SURPRISE_CHANCE=.15;
  const COPY_SEPARATOR='::';
  const baseCollectibleId=copyId=>String(copyId||'').split(COPY_SEPARATOR)[0];
  const collectibleCopyKey=(id,number)=>number>1 ? `${id}${COPY_SEPARATOR}${number}` : id;


  const COLLECTIBLES=[
    {id:'task-plush-1',name:'Special Plush 1',image:'assets/task-shop/Task-plush-1.png',price:20,kind:'collectible',description:'A Task Shop exclusive plush for your collectible shelf.'},
    {id:'task-plush-2',name:'Special Plush 2',image:'assets/task-shop/Task-plush-2.png',price:20,kind:'collectible',description:'A Task Shop exclusive plush for your collectible shelf.'},
    {id:'task-plush-3',name:'Special Plush 3',image:'assets/task-shop/Task-plush-3.png',price:20,kind:'collectible',description:'A Task Shop exclusive plush for your collectible shelf.'},
    {id:'task-plush-4',name:'Special Plush 4',image:'assets/task-shop/Task-plush-4.png',price:20,kind:'collectible',description:'A Task Shop exclusive plush for your collectible shelf.'},
    {id:'task-plush-5',name:'Special Plush 5',image:'assets/task-shop/Task-plush-5.png',price:20,kind:'collectible',description:'A Task Shop exclusive plush for your collectible shelf.'},
    {id:'plush-lop-bunny',repeatable:true,name:'Lop Bunny Plush',image:'assets/task-shop/layered/plush-lop-bunny-preview.png',price:20,kind:'collectible',description:'A cuddly, recolorable lop-eared bunny.'},
    {id:'plush-perky-bunny',repeatable:true,name:'Perky Bunny Plush',image:'assets/task-shop/layered/plush-perky-bunny-preview.png',price:20,kind:'collectible',description:'A sweet bunny with perky ears and customizable colors.'},
    {id:'plush-kitty',repeatable:true,name:'Kitty Plush',image:'assets/task-shop/layered/plush-kitty-preview.png',price:20,kind:'collectible',description:'A stitched kitty plush with customizable colors.'},
    {id:'flower-daisy',repeatable:true,name:'Daisy Vase',image:'assets/task-shop/layered/flower-daisy-preview.png',price:20,kind:'collectible',description:'Daisies and a recolorable vase for your shelf.'},
    {id:'flower-rose',repeatable:true,name:'Rose Vase',image:'assets/task-shop/layered/flower-rose-preview.png',price:20,kind:'collectible',description:'A rose and a recolorable vase for your shelf.'},
    {id:'flower-tulip',repeatable:true,name:'Tulip Vase',image:'assets/task-shop/layered/flower-tulip-preview.png',price:20,kind:'collectible',description:'A tulip and a recolorable vase for your shelf.'}
  ];

  const SHOP_ITEMS=[
    ...COLLECTIBLES,
    {id:'exp-candy-small',name:'EXP Candy Small',image:'assets/items/quest-boosts/Exp-candy-small.png',price:8,kind:'inventory',qty:1,description:'Adds 20% of the active OC’s current Duck Quest EXP bar.'},
    {id:'exp-candy-large',name:'EXP Candy Large',image:'assets/items/quest-boosts/Exp-candy-large.png',price:18,kind:'inventory',qty:1,description:'Adds 50% of the active OC’s current Duck Quest EXP bar.'},
    {id:'card-pack',name:'Trading Card Pack',image:'assets/trading-cards/card-pack-unopened.png',price:15,kind:'pack',qty:1,description:'Adds one unopened Trading Card Pack.'},
    {id:'rare-egg',name:'Rare Egg',image:'duck-quest/assets/eggs/Rare-egg.png',price:20,kind:'inventory',qty:1,description:'A harder-to-get egg with better Buddy possibilities.'},
    {id:'shiny-egg',name:'Shiny Egg ✨',image:'duck-quest/assets/gimmicks/shiny-egg.png',price:150,kind:'inventory',qty:1,description:'An ultra-rare goal! Incubate for 24 hours to hatch a guaranteed random Shiny Lil Guy.'},
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
    if(!p.collectibleStyles || typeof p.collectibleStyles!=='object' || Array.isArray(p.collectibleStyles))p.collectibleStyles={};
    if(!p.collectibleCopyStyles || typeof p.collectibleCopyStyles!=='object' || Array.isArray(p.collectibleCopyStyles))p.collectibleCopyStyles={};
    if(!p.collectibleCounts || typeof p.collectibleCounts!=='object' || Array.isArray(p.collectibleCounts))p.collectibleCounts={};
    // Migrate the original single-copy saves without losing their colors or shelf locations.
    for(const item of COLLECTIBLES){
      const oldOwned=p.collectiblesOwned.includes(item.id);
      const count=Math.max(oldOwned?1:0,Math.floor(Number(p.collectibleCounts[item.id])||0));
      if(count>0){p.collectibleCounts[item.id]=item.repeatable?count:1;if(!oldOwned)p.collectiblesOwned.push(item.id);}
    }
    const copyIsOwned=copyId=>{
      const id=baseCollectibleId(copyId), item=COLLECTIBLES.find(entry=>entry.id===id);
      if(!item)return false;
      const number=copyId===id?1:Number(String(copyId).slice(id.length+COPY_SEPARATOR.length));
      return Number.isInteger(number)&&number>0&&number<=(Number(p.collectibleCounts[id])||0)&&
        (number===1||Boolean(item.repeatable))&&copyId===collectibleCopyKey(id,number);
    };
    p.shelfSlots=Array.isArray(p.shelfSlots)?p.shelfSlots.slice(0,SHELF_SLOTS):[];
    while(p.shelfSlots.length<SHELF_SLOTS) p.shelfSlots.push(null);
    p.shelfSlots=p.shelfSlots.map(copyId=>copyIsOwned(copyId)?copyId:null);
    if(p.dresserCollectibleByRoom && typeof p.dresserCollectibleByRoom==='object'){
      for(const [room,copyId] of Object.entries(p.dresserCollectibleByRoom)){
        if(!copyIsOwned(copyId))delete p.dresserCollectibleByRoom[room];
      }
    }
    // Inventoried quantities are a mirror of Task Shop purchases for the Furniture tab.
    if(!save.inventory || typeof save.inventory!=='object')save.inventory={};
    for(const item of COLLECTIBLES)if(item.repeatable){
      const count=Number(p.collectibleCounts[item.id])||0;
      if(count)save.inventory[item.id]=count;
      else delete save.inventory[item.id];
    }
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

  function ownedCollectible(id){return (Number(ensureProgress().collectibleCounts[baseCollectibleId(id)])||0)>0;}
  function numberOwned(p,id){return Number(p.collectibleCounts[id])||0;}
  function stylesForCopy(p,copyId){
    const id=baseCollectibleId(copyId);
    return p.collectibleCopyStyles[copyId]|| (copyId===id?p.collectibleStyles[id]:null) || {};
  }
  function availableCopies(p,id){return Array.from({length:numberOwned(p,id)},(_,n)=>collectibleCopyKey(id,n+1));}

  function applyCollectibleArt(img,item,copyId=item?.id){
    if(!img || !item)return;
    const p=ensureProgress();
    window.DuckieCollectibleArtV393?.apply(img,item.id,{[item.id]:stylesForCopy(p,copyId)});
  }
  const ART_PALETTE=['#fff9f0','#f6d5e5','#e9a6bc','#ecc4a2','#f4e2a2','#c8e9c3','#a1d7d0','#b2d8ef','#c5c1ed','#d5b1dc','#9997ac','#665464','#34323c'];
  const artApi=window.DuckieCollectibleArtV393;
  function customizeCollectible(item){
    if(!artApi?.ART[item.id] || !ownedCollectible(item.id))return;
    const def=artApi.ART[item.id], p=ensureProgress();
    let chosen={...def.defaults,...(p.collectibleStyles[item.id]||{})};
    const overlay=document.createElement('div');overlay.className='task-customizer-overlay-v393';
    const card=document.createElement('section');card.className='task-customizer-card-v393';card.setAttribute('role','dialog');card.setAttribute('aria-modal','true');card.setAttribute('aria-label','Customize '+item.name);
    const title=document.createElement('h3');title.textContent='Customize '+item.name+' ♡';
    const preview=document.createElement('img');preview.className='task-customizer-preview-v393';preview.src=item.image;preview.alt=item.name;
    const close=()=>overlay.remove();
    const paint=()=>artApi.render(item.id,chosen).then(src=>{if(overlay.isConnected)preview.src=src}).catch(console.warn);
    card.append(title,preview);
    const groups=def.type==='plush'?[['main','Main fabric'],['secondary','Accent fabric'],['face','Eye color']]:[['vase','Vase color'],['petal','Flower color'],...(item.id==='flower-daisy'?[['center','Daisy center']]:[])];
    groups.forEach(([field,label])=>{
      const row=document.createElement('div');row.className='task-customizer-row-v393';
      const heading=document.createElement('strong');heading.textContent=label;
      const choices=document.createElement('div');choices.className='task-customizer-swatches-v393';
      const palette=field==='face'?['#252530','#684d45','#7b609b','#af5981','#497f87','#c0a08c',...ART_PALETTE]:ART_PALETTE;
      palette.forEach(color=>{
        const button=document.createElement('button');button.type='button';button.className='task-customizer-swatch-v393';
        button.style.setProperty('--swatch',color);button.setAttribute('aria-label',label+': '+color);button.title=color;
        const select=()=>{chosen[field]=color;choices.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));paint()};
        button.setAttribute('aria-pressed',String(chosen[field]===color));button.addEventListener('click',select);choices.append(button);
      });
      row.append(heading,choices);card.append(row);
    });
    const actions=document.createElement('div');actions.className='task-customizer-actions-v393';
    const cancel=document.createElement('button');cancel.type='button';cancel.textContent='Cancel';cancel.addEventListener('click',close);
    const saveBtn=document.createElement('button');saveBtn.type='button';saveBtn.className='save-v393';saveBtn.textContent='Save Colors ♡';
    saveBtn.addEventListener('click',()=>{
      p.collectibleStyles[item.id]={...chosen};saveNow();close();renderTaskShop();renderTaskShelf();
      try{window.DuckieTaskDresserV260?.renderDresserCollectible?.()}catch(error){}
      showToast(item.name+' customized! ♡');
    });
    actions.append(cancel,saveBtn);card.append(actions);overlay.append(card);
    overlay.addEventListener('click',e=>{if(e.target===overlay)close()});
    taskShopPanel.append(overlay);paint();
  }


  function buyTaskShopItem(item){
    const p=ensureProgress();
    if(item.kind==='collectible' && !item.repeatable && ownedCollectible(item.id)){showToast(`${item.name} is already yours!`);return;}
    if(p.duckBucks<item.price){showToast(`You need ${item.price-p.duckBucks} more Duck Bucks.`);return;}
    p.duckBucks-=item.price;
    if(item.kind==='collectible'){
      p.collectibleCounts[item.id]=numberOwned(p,item.id)+1;
      if(!p.collectiblesOwned.includes(item.id))p.collectiblesOwned.push(item.id);
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
      const card=document.createElement('article');card.className=`task-shop-item-v254${owned?' owned':''}`;card.dataset.collectibleId=item.id;
      const img=document.createElement('img');img.src=item.image;img.alt='';
      applyCollectibleArt(img,item);
      if(item.fallback) img.onerror=()=>{if(img.src.endsWith(item.image.split('/').pop())) img.src=item.fallback;};
      const copy=document.createElement('div');
      const name=document.createElement('strong');name.textContent=item.name;
      const desc=document.createElement('small');desc.textContent=item.description;
      copy.append(name,desc);
      const foot=document.createElement('div');foot.className='task-shop-item-foot-v254';
      const price=makeBuckInline(item.price);
      const count=item.kind==='collectible'?numberOwned(p,item.id):0;
      if(item.repeatable && count>0){
        const stock=document.createElement('small');stock.className='task-shop-owned-count-v394';stock.textContent=`Owned ×${count} · Customize in Inventory → Furniture`;copy.append(stock);
      }
      const buy=document.createElement('button');buy.type='button';buy.textContent=owned&&!item.repeatable?'Owned':count>0&&item.repeatable?'Buy Another':'Buy';buy.disabled=(owned&&!item.repeatable) || p.duckBucks<item.price;
      buy.addEventListener('click',()=>buyTaskShopItem(item));
      foot.append(price,buy);
      if(item.kind==='collectible' && artApi?.ART[item.id] && owned && !item.repeatable){
        const customize=document.createElement('button');customize.type='button';customize.className='task-customize-btn-v393';customize.textContent='Customize';
        customize.addEventListener('click',()=>customizeCollectible(item));foot.append(customize);
      }
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
      const item=COLLECTIBLES.find(entry=>entry.id===baseCollectibleId(id));
      const btn=document.createElement('button');btn.type='button';btn.className=`wing-duck-slot task-collectible-slot-v254${item?' occupied':''}`;
      if(item){const img=document.createElement('img');img.src=item.image;img.alt='';btn.append(img);applyCollectibleArt(img,item,id);btn.setAttribute('aria-label',`Shelf spot ${index+1}: ${item.name} (copy ${id===item.id?1:id.split(COPY_SEPARATOR).pop()})`);}
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
    const baseId=baseCollectibleId(id);
    if(!p.collectiblesOwned.includes(baseId)||!availableCopies(p,baseId).includes(id))return;
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
    const owned=COLLECTIBLES.flatMap(item=>availableCopies(p,item.id).map((copyId,index)=>({item,copyId,number:index+1})));
    if(!owned.length){
      const empty=document.createElement('p');empty.className='task-collectible-empty-v254';empty.textContent='Buy a collectible from the Task Shop first, then it can live here. ♡';taskCollectiblePickerGrid.append(empty);return;
    }
    owned.forEach(({item,copyId,number})=>{
      const btn=document.createElement('button');btn.type='button';btn.className='task-collectible-choice-v254';
      const img=document.createElement('img');img.src=item.image;img.alt='';
      applyCollectibleArt(img,item,copyId);
      const name=document.createElement('span');name.textContent=item.repeatable?`${item.name} #${number}`:item.name;
      const position=p.shelfSlots.findIndex(placed=>placed===copyId);
      const dresserRoom=Object.entries(p.dresserCollectibleByRoom||{}).find(([,placed])=>placed===copyId)?.[0];
      const caption=document.createElement('small');caption.className='task-collectible-location-v394';caption.textContent=position>=0?`On shelf ${position+1}`:dresserRoom?'On dresser':'Available';
      btn.append(img,name,caption);btn.addEventListener('click',()=>chooseTaskCollectible(copyId));taskCollectiblePickerGrid.append(btn);
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
  window.DuckieTaskProgressV254={ensureProgress,renderTaskShop,renderTaskShelf,SHOP_ITEMS,COLLECTIBLES,
    baseCollectibleId,collectibleCopyKey,availableCopies,stylesForCopy,numberOwned,saveNow};
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
    const base=api.baseCollectibleId(id);
    return id && byId.has(base) && api.availableCopies(p,base).includes(id) ? id : null;
  }

  function clearRenderedPlush(){
    furnitureLayer?.querySelectorAll('.task-dresser-collectible-v260').forEach(node=>node.remove());
  }

  function renderDresserCollectible(){
    clearRenderedPlush();
    if(!furnitureLayer || typeof currentRoomView!=='undefined' && currentRoomView!=='main') return;
    if(!dresserAvailable()) return;

    const id=currentDresserCollectible();
    const item=id ? byId.get(api.baseCollectibleId(id)) : null;
    if(!item) return;

    const img=document.createElement('img');
    img.src=item.image;
    img.alt='';
    img.decoding='async';
    img.loading='eager';
    img.className='task-dresser-collectible-v260';
    img.dataset.taskCollectibleId=id;
    img.dataset.taskCollectibleKind=item.id.startsWith('plush-')?'plush':item.id.startsWith('flower-')?'flower':'other';
    furnitureLayer.append(img);
    window.DuckieCollectibleArtV393?.apply(img,item.id,{[item.id]:api.stylesForCopy(progress(),id)});
  }

  function setDresserCollectible(id){
    const item=byId.get(api.baseCollectibleId(id));
    const p=progress();
    if(!item || !api.availableCopies(p,item.id).includes(id)) return;

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

    // Each purchased copy is unique; move only the chosen copy, not every bunny.
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
    if(card?.dataset.collectibleId && byId.has(card.dataset.collectibleId))return byId.get(card.dataset.collectibleId);
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
      if(!item || !p.collectiblesOwned.includes(item.id) || item.repeatable) return;
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
    const leftOffset = Math.max(4.6, width * 0.52);
    const rightOffset = Math.max(3.0, width * 0.38);
    return {
      left: Number(anchor.left || 50) + (slot === 0 ? -leftOffset : rightOffset),
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
      headDuckDisplay.classList.add('double-head-duck-primary');
      setHeadDuckImage(secondaryImg, secondDuck, splitHeadDuckPlacement(base,1));
      secondaryImg.classList.add('double-head-duck-secondary');
      placeMainHeadDuckLayer(headDuckDisplay, character.id);
      placeMainHeadDuckLayer(secondaryImg, character.id);
    }else{
      setHeadDuckImage(headDuckDisplay, firstDuck, base);
      headDuckDisplay.classList.remove('double-head-duck-secondary','double-head-duck-primary');
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
      img.className = `${isStatus ? 'status-head-duck' : 'profile-head-duck'}${flipped === 'primary' ? ' double-head-duck-primary' : flipped === 'secondary' ? ' double-head-duck-secondary' : ''}`;
      img.src = DUCKS[duckId].file;
      img.alt = '';
      img.style.left = `${placement.left}%`;
      img.style.top = `${placement.top}%`;
      img.style.width = `${placement.width}%`;
      layer.append(img);
    };

    if(secondId && DUCKS[secondId]){
      addImg(firstId, splitHeadDuckPlacement(base,0), 'primary');
      addImg(secondId, splitHeadDuckPlacement(base,1), 'secondary');
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
      price.innerHTML = `<img src="assets/task-shop/Duck-bucks.png" alt="" /> <b>${PERK.price}</b>`;

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

 
// ===== v24.394 — inventory furniture customization for individual collectible copies =====
(()=>{
  'use strict';
  const api=window.DuckieTaskProgressV254;
  const art=window.DuckieCollectibleArtV393;
  if(!api||!art||typeof ITEMS!=='object')return;
  const repeatables=api.COLLECTIBLES.filter(item=>item.repeatable);
  const byId=new Map(repeatables.map(item=>[item.id,item]));
  const colorChoices=[
    ['Snow','#ffffff'],['Cream','#fff9ee'],['Ivory','#f4e9d2'],['Oat','#decfba'],['Sand','#cbb69b'],
    ['Butter','#fff3ae'],['Sunflower','#ffe277'],['Honey','#f6bd5e'],['Gold','#dba34b'],['Mustard','#bd9845'],
    ['Peach','#ffdbbc'],['Apricot','#f9b78b'],['Tangerine','#f4985f'],['Coral','#f78775'],['Pumpkin','#d87448'],
    ['Blush','#ffe2e8'],['Strawberry Milk','#f6b9d1'],['Bubblegum','#ed8fbe'],['Rose','#db659d'],['Raspberry','#b94779'],
    ['Cherry','#e65c72'],['Crimson','#b73d57'],['Brick','#a55b53'],['Burgundy','#783f5a'],['Maroon','#673b49'],
    ['Lilac','#edd6fb'],['Lavender','#d4b7f2'],['Orchid','#b493e1'],['Amethyst','#8864ba'],['Plum','#624d87'],
    ['Powder Blue','#e2ecff'],['Sky Blue','#b5d9ff'],['Periwinkle','#a3b9ed'],['Cornflower','#769bdb'],['Navy','#465e98'],
    ['Ice Blue','#d9f7fb'],['Aqua','#9de5eb'],['Turquoise','#6bc9d1'],['Teal','#4b9ba3'],['Deep Sea','#326b7e'],
    ['Mint','#daf7dc'],['Pistachio','#bceab9'],['Sage','#a7c6a1'],['Grass','#85be78'],['Forest','#578a66'],
    ['Lime','#e6f4a2'],['Olive','#a8ad6b'],['Moss','#797d52'],['Clover','#60a97f'],['Pine','#3b7868'],
    ['Cloud Grey','#e5e3ea'],['Silver','#c8c2cc'],['Dove','#aaa6b3'],['Slate','#817a90'],['Charcoal','#494554'],
    ['Chocolate','#704b41'],['Caramel','#b88164'],['Coffee','#976a52'],['Mocha','#806b65'],['Black','#28252e']
  ];
  const eyeChoices=[
    ['Ink','#252530'],['Black','#38313a'],['Dark Brown','#5b403d'],['Chestnut','#875d48'],
    ['Hazel','#a38755'],['Amber','#bc8b4d'],['Golden','#dfbe71'],['Blush','#a55885'],
    ['Pink','#ed8fbe'],['Ruby','#be5364'],['Lavender','#b198d1'],['Purple','#8465b9'],
    ['Ocean','#597caf'],['Blue','#7cabe1'],['Teal','#487e8d'],['Mint','#7dc7ab'],
    ['Green','#65966d'],['Olive','#a2a66b'],['Grey','#84808a'],['White','#f6f3ed'],
    ['Coral','#e58b85'],['Peach','#e3a78e'],['Silver','#bbc2d4'],['Plum','#604877']
  ];
  // Reuse the game's own Inventory grid and item sheet, instead of creating a second store.
  repeatables.forEach(item=>{
    ITEMS[item.id]={name:item.name,category:'furniture',image:item.image,icon:'🧸',sellValue:0,
      description:'A Task Shop collectible. Choose and customize each purchased copy.'};
  });
  api.ensureProgress();
  const chosenCopies=new Map();
  const chosenColorFields=new Map();
  const selectedColorPages=new Map();
  let draft=null;
  let chosenId=null;
  let paintToken=0;
  const oldRenderInventory=renderInventory;
  renderInventory=function(){
    api.ensureProgress();
    const result=oldRenderInventory.apply(this,arguments);
    if(currentInventoryTab==='furniture'){
      document.querySelectorAll('#inventoryGrid [data-item-id]').forEach(card=>{
        const id=card.dataset.itemId, item=byId.get(id);
        if(!item)return;
        const img=card.querySelector('.inventory-item-icon img');
        if(img){
          const p=api.ensureProgress();
          art.apply(img,id,{[id]:api.stylesForCopy(p,id)});
        }
      });
    }
    return result;
  };
  const oldRenderSheet=renderInventoryItemSheet;
  renderInventoryItemSheet=function(){
    const id=selectedInventoryItemId, item=byId.get(id);
    if(!item)return oldRenderSheet.apply(this,arguments);
    const p=api.ensureProgress();
    const copies=api.availableCopies(p,id);
    if(!copies.length){closeInventoryItem();return;}
    const current=chosenCopies.get(id);
    const copyId=copies.includes(current)?current:copies[0];
    chosenCopies.set(id,copyId);
    if(copyId!==chosenId || !draft){
      chosenId=copyId;
      draft={...art.ART[id].defaults,...api.stylesForCopy(p,copyId)};
    }
    const copyNo=copies.indexOf(copyId)+1;
    const actions=inventorySheetActions;
    actions.innerHTML='';
    inventorySheetIcon.innerHTML=''; // The large live preview is enough—no second circular icon.
    inventorySheetCategory.textContent='Furniture · Task Shop';
    inventorySheetName.textContent=item.name;
    inventorySheetQuantity.textContent=`Owned ×${copies.length} · Editing copy ${copyNo}`;
    inventoryGiftPreference.classList.add('hidden');inventoryGiftPreference.innerHTML='';

    const preview=document.createElement('img');
    preview.className='inventory-collectible-large-preview-v394';
    preview.alt='Color preview for '+item.name;
    preview.src=item.image;
    const updatePreview=()=>{
      const token=++paintToken;
      art.render(id,draft).then(uri=>{
        if(token===paintToken && preview.isConnected)preview.src=uri;
      }).catch(console.warn);
    };
    actions.append(preview);

    // A single copy dropdown replaces the potentially long, scrollable row of buttons.
    if(copies.length>1){
      const copyRow=document.createElement('div');copyRow.className='inventory-copy-row-v400';
      const copyLabel=document.createElement('label');copyLabel.textContent='Customize copy';
      const copySelect=document.createElement('select');copySelect.className='inventory-compact-select-v400';
      copyLabel.append(copySelect);
      copies.forEach((uid,index)=>{
        const onShelf=p.shelfSlots.findIndex(x=>x===uid);
        const onDresser=Object.values(p.dresserCollectibleByRoom||{}).includes(uid);
        const where=onShelf>=0?`Shelf ${onShelf+1}`:onDresser?'Dresser':'Available';
        const option=document.createElement('option');option.value=uid;
        option.textContent=`#${index+1} · ${where}`;
        copySelect.append(option);
      });
      copySelect.value=copyId;
      copySelect.addEventListener('change',()=>{
        chosenCopies.set(id,copySelect.value);chosenId=null;renderInventoryItemSheet();
      });
      copyRow.append(copyLabel);
      actions.append(copyRow);
    }

    const selectedShelf=p.shelfSlots.findIndex(uid=>uid===copyId);
    const dresserRoom=Object.entries(p.dresserCollectibleByRoom||{}).find(([,uid])=>uid===copyId)?.[0];
    const location=document.createElement('p');location.className='inventory-collectible-location-v394';
    location.textContent=selectedShelf>=0?`On collectible shelf spot ${selectedShelf+1}`:dresserRoom?'On the dresser':'Ready to display';
    actions.append(location);

    const groups=art.ART[id].type==='plush'
      ?[['main','Main fabric'],['secondary','Accent fabric'],['face','Eye color']]
      :[['vase','Vase color'],['petal','Flower color'],...(id==='flower-daisy'?[['center','Daisy center']]:[])];

    // Show ONE layer's colors at a time. No vertical wall of 60-color swatches.
    const layerRow=document.createElement('div');layerRow.className='inventory-color-layer-tabs-v400';
    layerRow.setAttribute('role','tablist');layerRow.setAttribute('aria-label','Choose a part to color');
    const colorArea=document.createElement('section');colorArea.className='inventory-color-page-v400';
    actions.append(layerRow,colorArea);
    let activeField=chosenColorFields.get(id);
    if(!groups.some(([field])=>field===activeField))activeField=groups[0][0];

    const makePalettes=(field)=>{
      if(field==='face'){
        const eyes=[
          {name:'Eyes 1 · Natural & pinks',colors:eyeChoices.slice(0,12)},
          {name:'Eyes 2 · Blues & extras',colors:eyeChoices.slice(12,24)}
        ];
        if(!eyeChoices.some(([,hex])=>hex.toLowerCase()===String(draft[field]||'').toLowerCase())){
          eyes.push({name:'Original eye color',colors:[['Original',draft[field]]]});
        }
        return eyes;
      }
      const names=['Creams & yellows','Peaches & pinks','Reds & purples','Blues & aquas','Greens & herbs','Greys & browns'];
      const result=names.map((name,index)=>({name,colors:colorChoices.slice(index*10,index*10+10)}));
      if(!colorChoices.some(([,hex])=>hex.toLowerCase()===String(draft[field]||'').toLowerCase())){
        result.push({name:'Original color',colors:[['Original',draft[field]]]});
      }
      return result;
    };
    const drawColorPage=()=>{
      chosenColorFields.set(id,activeField);
      layerRow.querySelectorAll('button').forEach(button=>{
        const active=button.dataset.colorField===activeField;
        button.setAttribute('aria-selected',String(active));
        button.classList.toggle('active',active);
      });
      colorArea.innerHTML='';
      const palettes=makePalettes(activeField);
      const currentHex=String(draft[activeField]||'').toLowerCase();
      const paletteKey=id+':'+activeField;
      let paletteIndex=selectedColorPages.get(paletteKey);
      if(!Number.isInteger(paletteIndex)||paletteIndex<0||paletteIndex>=palettes.length){
        paletteIndex=palettes.findIndex(page=>page.colors.some(([,color])=>String(color).toLowerCase()===currentHex));
        if(paletteIndex<0)paletteIndex=0;
      }
      const selector=document.createElement('select');
      selector.className='inventory-compact-select-v400 inventory-palette-select-v400';
      selector.setAttribute('aria-label','Choose a color family');
      palettes.forEach((page,index)=>{
        const option=document.createElement('option');option.value=String(index);
        option.textContent=page.name;selector.append(option);
      });
      selector.value=String(paletteIndex);
      const selectedLabel=document.createElement('span');
      selectedLabel.className='inventory-current-color-v400';
      selectedLabel.setAttribute('aria-live','polite');
      const swatches=document.createElement('div');swatches.className='inventory-collectible-swatches-v394 inventory-compact-swatches-v400';
      const fillSwatches=()=>{
        const index=Number(selector.value);
        selectedColorPages.set(paletteKey,index);
        const page=palettes[index];
        swatches.replaceChildren();
        for(const [name,color] of page.colors){
          const button=document.createElement('button');button.type='button';
          button.className='inventory-collectible-swatch-v394';
          button.style.background=color;button.title=name;
          button.setAttribute('aria-label',`${groups.find(([key])=>key===activeField)[1]}: ${name}`);
          button.setAttribute('aria-pressed',String(draft[activeField]===color));
          button.addEventListener('click',()=>{
            draft[activeField]=color;
            swatches.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
            selectedLabel.textContent=name;
            updatePreview();
          });
          swatches.append(button);
        }
        const selected=page.colors.find(([,color])=>color.toLowerCase()===String(draft[activeField]).toLowerCase());
        selectedLabel.textContent=selected?selected[0]:'Custom color';
      };
      selector.addEventListener('change',fillSwatches);
      const selectRow=document.createElement('div');selectRow.className='inventory-color-page-heading-v400';
      selectRow.append(selector,selectedLabel);
      colorArea.append(selectRow,swatches);
      fillSwatches();
    };
    groups.forEach(([field,label])=>{
      const button=document.createElement('button');button.type='button';
      button.className='inventory-color-layer-v400';button.dataset.colorField=field;
      button.setAttribute('role','tab');button.textContent=label;
      button.addEventListener('click',()=>{activeField=field;drawColorPage()});
      layerRow.append(button);
    });
    drawColorPage();

    const controls=document.createElement('div');controls.className='inventory-collectible-bottom-actions-v400';
    const saveBtn=document.createElement('button');saveBtn.type='button';saveBtn.className='inventory-action primary';
    saveBtn.textContent='Save Colors ♡';
    saveBtn.title=`Save colors for ${item.name} copy #${copyNo}`;
    saveBtn.addEventListener('click',()=>{
      p.collectibleCopyStyles[copyId]={...draft};
      if(copyId===id)p.collectibleStyles[id]={...draft};
      api.saveNow();api.renderTaskShelf();
      try{window.DuckieTaskDresserV260?.renderDresserCollectible?.()}catch(e){console.warn(e)}
      renderInventory();
      try{showToast(`${item.name} #${copyNo} recolored! ♡`)}catch(e){}
      renderInventoryItemSheet();
    });
    controls.append(saveBtn);
    const dresserReady=(()=>{try{return currentLeftFurnitureType(save.room)==='dresser'&&Boolean(getRoomFurniture(save.room)?.left)}catch(e){return false}})();
    const here=(()=>{try{const key=typeof mainRoomStorageId==='function'?String(mainRoomStorageId(save.room)):String(save.room);return p.dresserCollectibleByRoom?.[key]===copyId}catch(e){return false}})();
    const place=document.createElement('button');place.type='button';place.className='inventory-action';
    place.textContent=here?'Remove from dresser':dresserReady?'Place on dresser':'Needs dresser';
    place.title=here?'Remove this copy from dresser':dresserReady?'Place this copy on dresser':'Place a dresser in this room first';
    place.disabled=!dresserReady&&!here;
    place.addEventListener('click',()=>{
      window.DuckieTaskDresserV260?.setDresserCollectible?.(copyId);
      renderInventoryItemSheet();
    });
    controls.append(place);
    actions.append(controls);
    updatePreview();
  };
})();
