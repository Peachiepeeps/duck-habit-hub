/* Duckie Days v17 — Special Tasks: custom rewards without separate task tabs. */
(function(){
  'use strict';
  const catalog=[
    {id:'duck-bucks',name:'Duck Bucks',kind:'bucks',image:'assets/task-shop/Duck-bucks.png'},
    {id:'card-pack',name:'Trading Card Packs',kind:'pack',image:'assets/trading-cards/card-pack-unopened.png'},
    {id:'exp-candy-small',name:'EXP Candy Small',kind:'inventory',image:'assets/items/quest-boosts/Exp-candy-small.png'},
    {id:'exp-candy-large',name:'EXP Candy Large',kind:'inventory',image:'assets/items/quest-boosts/Exp-candy-large.png'},
    {id:'rare-egg',name:'Rare Egg',kind:'inventory',image:'duck-quest/assets/eggs/Rare-egg.png'},
    {id:'jump-token-bundle',name:'Jump Token Bundle (3 tokens)',kind:'inventory',itemId:'jump-token',factor:3,image:'duck-quest/assets/dash/Jump-Token.png'},
    ...Array.from({length:5},(_,i)=>({id:'task-plush-'+(i+1),name:'Special Plush '+(i+1),kind:'collectible',image:'assets/task-shop/Task-plush-'+(i+1)+'.png'}))
  ];
  const byId=Object.fromEntries(catalog.map(item=>[item.id,item]));
  const safeQty=q=>Math.max(0,Math.min(9999,Math.floor(Number(q)||0)));
  function sanitize(rows){
    if(!Array.isArray(rows))return [];
    const merged=new Map();
    for(const row of rows){
      const id=String(row?.id||'');if(!byId[id])continue;
      const qty=safeQty(row.qty);if(qty<1)continue;
      merged.set(id,Math.min(9999,(merged.get(id)||0)+qty));
    }
    return [...merged].map(([id,qty])=>({id,qty}));
  }
  function summary(rows){return sanitize(rows).map(r=>`${r.qty} ${byId[r.id].name}`).join(' · ');}
  const form=document.getElementById('taskForm');
  const repeat=document.getElementById('taskRepeat');
  let area=null,check=null,rows=null,enabled=false;
  function readRows(){
    if(!enabled || !rows)return [];
    return sanitize([...rows.querySelectorAll('.special-reward-v17')].map(node=>({id:node.querySelector('select')?.value,qty:node.querySelector('input')?.value})));
  }
  function addRow(itemId='card-pack',amount=1){
    const row=document.createElement('div');row.className='special-reward-v17';
    const select=document.createElement('select');select.setAttribute('aria-label','Choose special task reward');
    for(const item of catalog){const option=document.createElement('option');option.value=item.id;option.textContent=item.name;select.appendChild(option);}
    select.value=byId[itemId]?itemId:'card-pack';
    const qty=document.createElement('input');qty.type='number';qty.min='1';qty.max='9999';qty.step='1';qty.value=String(amount);qty.setAttribute('aria-label','Quantity');
    const remove=document.createElement('button');remove.type='button';remove.textContent='×';remove.title='Remove reward';remove.setAttribute('aria-label','Remove reward');remove.addEventListener('click',()=>row.remove());
    row.append(select,qty,remove);rows.append(row);
  }
  function mount(){
    if(!form||!repeat||document.getElementById('specialTaskOptionsV17'))return;
    const container=document.createElement('div');container.id='specialTaskOptionsV17';container.className='special-task-options-v17';
    const label=document.createElement('label');label.className='special-task-toggle-v17';
    check=document.createElement('input');check.type='checkbox';check.id='specialTaskToggleV17';
    const labelText=document.createElement('span');labelText.innerHTML='<strong>✨ Special Task</strong><small>Give yourself extra rewards for tackling something big!</small>';
    label.append(check,labelText);
    area=document.createElement('div');area.className='special-task-builder-v17 hidden';
    const hint=document.createElement('p');hint.textContent='Choose any Task Shop item, Duck Bucks, and multiple rewards. These are awarded when you complete the task.';
    rows=document.createElement('div');rows.id='specialTaskRewardsV17';
    const add=document.createElement('button');add.type='button';add.className='special-add-reward-v17';add.textContent='＋ Add another reward';add.addEventListener('click',()=>addRow());
    area.append(hint,rows,add);container.append(label,area);
    repeat.closest('.form-field')?.before(container);
    check.addEventListener('change',()=>{enabled=check.checked;area.classList.toggle('hidden',!enabled);if(enabled&&!rows.children.length)addRow();});
  }
  function reset(){enabled=false;if(check)check.checked=false;if(area)area.classList.add('hidden');if(rows)rows.replaceChildren();}
  function award(task){
    if(!task?.special)return '';
    const gifts=sanitize(task.specialRewards);if(!gifts.length)return '';
    const messages=[];
    if(!save.taskProgression||typeof save.taskProgression!=='object')save.taskProgression={};
    if(!save.inventory||typeof save.inventory!=='object')save.inventory={};
    const cards=window.DuckieTradingCards;
    for(const gift of gifts){
      const item=byId[gift.id];let amount=gift.qty;
      if(item.kind==='bucks'){
        save.taskProgression.duckBucks=Math.max(0,Math.floor(Number(save.taskProgression.duckBucks)||0))+amount;
      }else if(item.kind==='pack'){
        if(!cards?.grantPack){console.warn('Special Tasks: Trading Card system unavailable');continue;}
        cards.grantPack(save,amount);
      }else if(item.kind==='inventory'){
        const id=item.itemId||item.id;amount*=item.factor||1;
        save.inventory[id]=Math.max(0,Math.floor(Number(save.inventory[id])||0))+amount;
      }else if(item.kind==='collectible'){
        if(!Array.isArray(save.taskProgression.collectiblesOwned))save.taskProgression.collectiblesOwned=[];
        if(!save.taskProgression.collectiblesOwned.includes(item.id))save.taskProgression.collectiblesOwned.push(item.id);
        amount=1; // Collectible shelf items are unique.
      }
      messages.push(`${amount} ${item.name}`);
    }
    return messages.join(' · ');
  }
  mount();
  // Existing normal tasks don't become special automatically.
  document.getElementById('addTaskButton')?.addEventListener('click',()=>setTimeout(reset,0));
  function load(task){
    mount();reset();
    enabled=Boolean(task?.special);
    if(check)check.checked=enabled;
    if(area)area.classList.toggle('hidden',!enabled);
    if(enabled){
      const gifts=sanitize(task?.specialRewards);
      for(const gift of gifts)addRow(gift.id,gift.qty);
      if(!gifts.length)addRow();
    }
  }
  window.DuckieSpecialTasksV17={catalog,sanitize,summary,award,reset,load,isSpecial:()=>Boolean(enabled&&check?.checked),formRewards:readRows};
})();
