// Duckie Days v24.213 — Quest Boost items + expanded Token Shop.
(function(){
  'use strict';
  window.DUCKIE_QUEST_BOOST_ITEMS='24.213-exp-candy-warm-blanket';

  const BOOSTS=[
    {
      id:'exp-candy-small', name:'EXP Candy Small', cost:5,
      image:'../assets/items/quest-boosts/Exp-candy-small.png',
      detail:'Adds 20% of the active OC’s current EXP bar.', expPercent:.20
    },
    {
      id:'exp-candy-large', name:'EXP Candy Large', cost:10,
      image:'../assets/items/quest-boosts/Exp-candy-large.png',
      detail:'Adds 50% of the active OC’s current EXP bar.', expPercent:.50
    },
    {
      id:'warm-blanket', name:'Warm Blanket', cost:7,
      image:'../assets/items/quest-boosts/Warm-blanket.png',
      detail:'Halves the remaining hatch time. Use it from an incubating egg.'
    }
  ];

  const style=document.createElement('style');
  style.id='duckieBoostItemsV213Style';
  style.textContent=`
    .token-shop-boost-heading-v213{
      margin:4px 0 -2px!important;text-align:center!important;font-size:.66rem!important;
      letter-spacing:.10em!important;font-weight:900!important;color:var(--deep-pink,#a85f7b)!important;
    }
    .token-shop-item-v213{grid-template-columns:58px minmax(0,1fr)!important;}
    .token-shop-item-v213 .token-shop-item-actions-v213{
      grid-column:1 / -1!important;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:7px!important;
    }
    .token-shop-item-v213 .token-shop-item-actions-v213.single{grid-template-columns:1fr!important;}
    .token-shop-owned-v213{display:block!important;margin-top:2px!important;font-size:.58rem!important;color:var(--quest-muted,#8b727c)!important;font-weight:900!important;}
    .token-shop-boost-message-v213{
      min-height:20px!important;margin:2px 0 0!important;padding:5px 7px!important;text-align:center!important;
      border-radius:9px!important;background:var(--quest-surface-2,#fffaf3)!important;color:var(--brown,#684b58)!important;
      font-size:.66rem!important;font-weight:900!important;
    }
    .warm-blanket-use-v213{display:flex!important;align-items:center!important;justify-content:center!important;gap:6px!important;}
    .warm-blanket-use-v213 img{width:25px!important;height:25px!important;object-fit:contain!important;}
    .dash-time-heart-v213{width:10.8%!important;max-width:46px!important;filter:drop-shadow(0 2px 0 rgba(82,55,63,.18));}
    .dash-time-pop-v213{
      position:absolute!important;left:17%!important;bottom:29%!important;z-index:20!important;pointer-events:none!important;
      padding:4px 8px!important;border:2px solid var(--border,#8c625d)!important;border-radius:999px!important;
      background:var(--quest-surface-2,#fffaf3)!important;color:var(--brown,#6f4a45)!important;font-size:.72rem!important;font-weight:900!important;
      animation:dashTimePopV213 .9s ease-out forwards!important;
    }
    @keyframes dashTimePopV213{0%{opacity:0;transform:translateY(8px) scale(.9)}20%{opacity:1;transform:translateY(0) scale(1.06)}100%{opacity:0;transform:translateY(-18px) scale(1)}}
    @media(max-width:390px){.token-shop-item-v213{grid-template-columns:50px minmax(0,1fr)!important;}}
  `;
  document.head.appendChild(style);

  function qty(id){
    return Math.max(0,Math.floor(Number(hubSave?.inventory?.[id])||0));
  }
  function add(id,n=1){
    if(!hubSave.inventory || typeof hubSave.inventory!=='object') hubSave.inventory={};
    hubSave.inventory[id]=qty(id)+Math.max(1,Math.floor(Number(n)||1));
  }
  function spend(id,n=1){
    n=Math.max(1,Math.floor(Number(n)||1));
    const have=qty(id);
    if(have<n) return false;
    const left=have-n;
    if(left) hubSave.inventory[id]=left; else delete hubSave.inventory[id];
    return true;
  }
  function persist(){
    try{persistAll();}catch(error){
      try{localStorage.setItem('duckHabitHubSave_v1',JSON.stringify(hubSave));}catch(inner){}
    }
    try{renderMeta();}catch(error){}
    try{window.DuckieHatchApiV178?.refreshFeatureBadges?.();}catch(error){}
  }

  let message=null;
  function say(text){if(message)message.textContent=text||'';}

  function useCandy(boost){
    if(!boost?.expPercent) return;
    const hero=activeHeroProgress();
    if(!hero || hero.level>=MAX_LEVEL){say(`${QUEST_CHARACTER_NAMES?.[activeCharacterId]||'This OC'} is already at MAX Level!`);return;}
    if(qty(boost.id)<1){say(`You don't have an ${boost.name}.`);return;}
    const need=Math.max(1,Number(expNeeded(hero.level))||1);
    const amount=Math.max(1,Math.ceil(need*boost.expPercent));
    if(!spend(boost.id,1)) return;
    const before=hero.level;
    const levels=grantExp(amount);
    try{if(typeof unlockLevelIconBackgrounds==='function') unlockLevelIconBackgrounds(levels);}catch(error){}
    questSave.totalExpEarned=Math.max(0,Number(questSave.totalExpEarned)||0)+amount;
    persist();
    const who=QUEST_CHARACTER_NAMES?.[activeCharacterId]||'Your OC';
    say(levels.length?`${who} gained +${amount} EXP and reached Lv. ${hero.level}!`:`${who} gained +${amount} EXP!`);
    renderBoostShop();
  }

  function buyBoost(boost){
    if(qty('jump-token')<boost.cost){say(`You need ${boost.cost} Jump Tokens.`);return;}
    if(!spend('jump-token',boost.cost)){say('Not enough Jump Tokens.');return;}
    add(boost.id,1);
    persist();
    say(`${boost.name} purchased! ♡`);
    renderBoostShop();
  }

  function ensureBoostRows(){
    const items=document.querySelector('#tokenShopModalV200 .token-shop-items-v200');
    if(!items || document.querySelector('#tokenShopBoostRowsV213')) return;
    const heading=document.createElement('div');
    heading.className='token-shop-boost-heading-v213';
    heading.textContent='QUEST BOOSTS';
    const holder=document.createElement('div');
    holder.id='tokenShopBoostRowsV213';
    holder.className='token-shop-items-v200';
    items.insertAdjacentElement('afterend',heading);
    heading.insertAdjacentElement('afterend',holder);
    message=document.createElement('p');
    message.id='tokenShopBoostMessageV213';
    message.className='token-shop-boost-message-v213';
    holder.insertAdjacentElement('afterend',message);
  }

  function renderBoostShop(){
    ensureBoostRows();
    const holder=document.querySelector('#tokenShopBoostRowsV213');
    if(!holder) return;
    holder.innerHTML='';
    for(const boost of BOOSTS){
      const row=document.createElement('div');
      row.className='token-shop-item-v200 token-shop-item-v213';
      const canUse=Boolean(boost.expPercent);
      row.innerHTML=`
        <img src="${boost.image}" alt="${boost.name}">
        <div class="token-shop-item-copy-v200">
          <strong>${boost.name}</strong>
          <span>${boost.cost} Jump Tokens</span>
          <small>${boost.detail}</small>
          <em class="token-shop-owned-v213">Owned ×${qty(boost.id)}</em>
        </div>
        <div class="token-shop-item-actions-v213${canUse?'':' single'}">
          <button class="pixel-button primary token-shop-buy-v200" type="button" data-v213-buy="${boost.id}">Buy</button>
          ${canUse?`<button class="pixel-button token-shop-buy-v200" type="button" data-v213-use="${boost.id}" ${qty(boost.id)<1?'disabled':''}>Use</button>`:''}
        </div>`;
      holder.appendChild(row);
    }
    holder.querySelectorAll('[data-v213-buy]').forEach(button=>button.addEventListener('click',()=>{
      const boost=BOOSTS.find(x=>x.id===button.dataset.v213Buy);if(boost)buyBoost(boost);
    }));
    holder.querySelectorAll('[data-v213-use]').forEach(button=>button.addEventListener('click',()=>{
      const boost=BOOSTS.find(x=>x.id===button.dataset.v213Use);if(boost)useCandy(boost);
    }));
    const balance=document.querySelector('#tokenShopTokensV200');if(balance)balance.textContent=String(qty('jump-token'));
  }

  const open=document.querySelector('#openTokenShopV200');
  open?.addEventListener('click',()=>setTimeout(()=>{say('');renderBoostShop();},0));
  document.querySelector('#tokenShopModalV200')?.addEventListener('click',event=>{
    if(event.target.closest('[data-v213-buy],[data-v213-use]')) return;
    setTimeout(renderBoostShop,0);
  });
  ensureBoostRows();
  renderBoostShop();
})();
