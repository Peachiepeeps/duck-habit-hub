// Duckie Days v24.218 — reliable Mysterious Merchant choices.
(function(){
  'use strict';

  window.DUCKIE_DAYS_MERCHANT_FIX='24.218-visible-purchase-options';

  const STYLE_ID='duckieMerchantV218Style';
  const HOLDER_CLASS='merchant-actions-v218';

  function installStyle(){
    if(document.getElementById(STYLE_ID)) return;
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      #eventChoiceActions.${HOLDER_CLASS}{
        display:grid!important;
        grid-template-columns:1fr!important;
        gap:7px!important;
        min-height:0!important;
        overflow:visible!important;
        position:relative!important;
        z-index:30!important;
      }
      #eventChoiceActions.${HOLDER_CLASS}.hidden{display:grid!important}
      #eventChoiceActions.${HOLDER_CLASS} .merchant-choice-v218{
        width:100%!important;
        min-height:58px!important;
        display:grid!important;
        grid-template-columns:42px minmax(0,1fr) auto!important;
        align-items:center!important;
        gap:8px!important;
        padding:7px 10px!important;
        text-align:left!important;
      }
      #eventChoiceActions.${HOLDER_CLASS} .merchant-choice-v218 img{
        width:40px!important;
        height:40px!important;
        object-fit:contain!important;
        image-rendering:pixelated!important;
      }
      #eventChoiceActions.${HOLDER_CLASS} .merchant-choice-v218 strong{
        display:block!important;
        font-size:.70rem!important;
        line-height:1.2!important;
      }
      #eventChoiceActions.${HOLDER_CLASS} .merchant-choice-v218 small{
        display:block!important;
        margin-top:3px!important;
        color:#755f6a!important;
        font-size:.49rem!important;
        line-height:1.25!important;
      }
      #eventChoiceActions.${HOLDER_CLASS} .merchant-price-v218{
        white-space:nowrap!important;
        font-size:.60rem!important;
        font-weight:900!important;
      }
      #eventChoiceActions.${HOLDER_CLASS} .merchant-leave-v218{
        grid-template-columns:1fr!important;
        min-height:46px!important;
        text-align:center!important;
      }
      #chestLayer.merchant-scene-v218{
        display:grid!important;
        place-items:center!important;
        align-content:center!important;
        gap:5px!important;
        padding:8px!important;
        overflow:hidden!important;
      }
      #chestLayer.merchant-scene-v218 #chestSprite{
        width:min(112px,29vw)!important;
        height:min(112px,29vw)!important;
        max-width:112px!important;
        max-height:112px!important;
        object-fit:contain!important;
      }
      #chestLayer.merchant-scene-v218 #chestCaption{
        max-width:92%!important;
        padding:6px 9px!important;
        line-height:1.15!important;
      }
      #battleScreen .battle-ui.merchant-mode-v218{
        grid-template-rows:auto auto!important;
        align-content:start!important;
      }
      #battleScreen .battle-ui.merchant-mode-v218 #commandStage,
      #battleScreen .battle-ui.merchant-mode-v218 #postFloorActions{
        display:none!important;
      }
      @media(max-height:700px) and (max-width:600px){
        #eventChoiceActions.${HOLDER_CLASS}{gap:5px!important}
        #eventChoiceActions.${HOLDER_CLASS} .merchant-choice-v218{min-height:52px!important;padding:5px 8px!important}
        #eventChoiceActions.${HOLDER_CLASS} .merchant-choice-v218 img{width:36px!important;height:36px!important}
      }
    `;
    document.head.appendChild(style);
  }

  function currentMerchant(){
    try{
      return pendingChest?.eventType==='mysterious-merchant' ? pendingChest : null;
    }catch(error){
      return null;
    }
  }

  function randomItem(list){
    return list[Math.floor(Math.random()*list.length)];
  }

  function fallbackStock(){
    const options=[
      {kind:'item',id:'buddy-pon',name:'Buddy Pon',image:'../assets/items/buddy-pons/buddy-pon.webp',price:50,detail:'A basic Buddy Pon.'},
      {kind:'item',id:'super-buddy-pon',name:'Super Buddy Pon',image:'../assets/items/buddy-pons/super-buddy-pon.webp',price:100,detail:'A stronger Buddy Pon.'},
      {kind:'item',id:'boss-buddy-pon',name:'Boss Buddy Pon',image:'../assets/items/buddy-pons/boss-buddy-pon.webp',price:175,detail:'Made for tougher Buddies.'},
      {kind:'item',id:'jump-token',name:'Jump Token',image:'assets/dash/Jump-Token.png',price:80,detail:'One token toward Duckie Dash.'},
      {kind:'item',id:'common-egg',name:'Common Egg',image:'assets/eggs/Common-egg.png',price:160,detail:'Hatches a non-boss Buddy.'},
      {kind:'item',id:'rare-egg',name:'Rare Egg',image:'assets/eggs/Rare-egg.png',price:425,detail:'Bosses favored + better Shiny chance.'}
    ];

    try{
      const craft=REWARD_ITEMS.filter(item=>
        !String(item.id).includes('buddy-pon') &&
        !String(item.id).includes('heart-refill')
      );
      if(craft.length){
        const item=randomItem(craft);
        options.push({
          kind:'item',id:item.id,name:item.name,image:item.image,
          price:70+Math.floor(Math.random()*51),
          detail:'A random crafting supply.'
        });
      }
    }catch(error){ /* The six core items still provide a complete shop. */ }

    try{
      const owned=charmState().owned || {};
      const charms=Object.values(CHARM_DEFS).filter(charm=>!charm.special && !owned[charm.id]);
      if(charms.length){
        const charm=randomItem(charms);
        options.push({
          kind:'charm',id:charm.id,name:charm.name,
          image:'assets/charms/Charm-outline.png',
          price:Math.max(100,Math.round(Number(charm.price||200)*.85)),
          detail:charm.effect
        });
      }
    }catch(error){ /* Charms are optional stock. */ }

    const pool=options.slice();
    const selected=[];
    while(pool.length && selected.length<2){
      selected.push(pool.splice(Math.floor(Math.random()*pool.length),1)[0]);
    }
    return selected;
  }

  function ensureStock(chest){
    if(!Array.isArray(chest.wares) || chest.wares.length===0) chest.wares=fallbackStock();
    chest.wares=chest.wares.slice(0,2);
    return chest.wares;
  }

  function setInventoryQuantity(id,amount){
    if(!hubSave.inventory || typeof hubSave.inventory!=='object') hubSave.inventory={};
    const old=Math.max(0,Math.floor(Number(hubSave.inventory[id])||0));
    hubSave.inventory[id]=old+Math.max(1,Math.floor(Number(amount)||1));
  }

  function refreshVisibleCounts(){
    try{ renderMeta(); }catch(error){ /* non-fatal */ }
    const inventory=hubSave?.inventory || {};
    const map=[
      ['#dashTokenHome',inventory['jump-token']],
      ['#dashTokenCount',inventory['jump-token']],
      ['#commonEggQty',inventory['common-egg']],
      ['#rareEggQty',inventory['rare-egg']]
    ];
    for(const [selector,value] of map){
      const node=document.querySelector(selector);
      if(node) node.textContent=String(Math.max(0,Math.floor(Number(value)||0)));
    }
  }

  function buy(ware){
    const chest=currentMerchant();
    if(!chest || !ware || ware.sold) return;
    const price=Math.max(0,Math.floor(Number(ware.price)||0));
    if(Number(hubSave?.coins||0)<price){
      try{ setMessage('Not enough Pink Coins for that item.'); }catch(error){ /* non-fatal */ }
      return;
    }

    hubSave.coins=Math.max(0,Number(hubSave.coins||0)-price);
    if(ware.kind==='charm'){
      const state=charmState();
      if(!state.owned || typeof state.owned!=='object') state.owned={};
      state.owned[ware.id]=true;
    }else{
      setInventoryQuantity(ware.id,1);
    }
    ware.sold=true;
    try{ persistAll(); }catch(error){ /* non-fatal */ }
    refreshVisibleCounts();
    try{ setMessage(`Bought ${ware.name}!`); }catch(error){ /* non-fatal */ }
    mountMerchant(true);
  }

  function leaveMerchant(){
    const holder=ui?.eventChoiceActions;
    if(holder){
      holder.innerHTML='';
      holder.classList.add('hidden');
      holder.classList.remove(HOLDER_CLASS);
    }
    ui?.chestLayer?.classList.add('hidden');
    ui?.chestLayer?.classList.remove('merchant-active-v197','merchant-scene-v218');
    ui?.chestLayer?.querySelector('#merchantShopV197')?.remove();
    ui?.battleUi?.classList.remove('event-mode','merchant-mode-v218');
    ui?.openChest?.classList.add('hidden');

    try{ pendingChest=null; }catch(error){ /* non-fatal */ }
    try{
      if(currentRun){
        refillActiveHeroHpV210();
        markEndlessFloorComplete();
      }
      if(ui?.continueButton) ui.continueButton.textContent=currentRun?.mode==='endless'?'Next Floor':'Continue';
      ui?.postFloorActions?.classList.remove('hidden');
      ui?.leaveEndlessButton?.classList.toggle('hidden',currentRun?.mode!=='endless');
      setPostFloorLayout(true);
      actionLocked=false;
      persistAll();
      refreshVisibleCounts();
      setMessage('Gentleman Duck tips his hat and packs up his tiny shop.');
      requestAnimationFrame(()=>{
        ui?.battleUi?.classList.remove('event-mode','merchant-mode-v218');
        ui?.postFloorActions?.classList.remove('hidden');
        setPostFloorLayout(true);
      });
    }catch(error){
      try{ actionLocked=false; }catch(ignore){}
    }
  }

  function makeWareButton(ware,index){
    const button=document.createElement('button');
    button.type='button';
    button.className='pixel-button merchant-choice-v218';
    button.dataset.merchantBuyV218=String(index);
    button.disabled=Boolean(ware.sold);

    const image=document.createElement('img');
    image.src=String(ware.image||'../assets/ui/pink-coin.webp');
    image.alt='';

    const copy=document.createElement('span');
    const name=document.createElement('strong');
    name.textContent=ware.sold?`Sold — ${ware.name}`:String(ware.name||'Mystery Item');
    const detail=document.createElement('small');
    detail.textContent=String(ware.detail||'A curious little find.');
    copy.append(name,detail);

    const price=document.createElement('span');
    price.className='merchant-price-v218';
    price.textContent=ware.sold?'Sold':`${Math.max(0,Math.floor(Number(ware.price)||0))} Coins`;

    button.append(image,copy,price);
    button.addEventListener('click',()=>buy(ware));
    return button;
  }

  function mountMerchant(force=false){
    const chest=currentMerchant();
    const holder=ui?.eventChoiceActions;
    if(!chest || !holder) return false;

    installStyle();
    const wares=ensureStock(chest);
    const correctButtons=holder.querySelectorAll('[data-merchant-buy-v218]').length===wares.length;
    const hasLeave=Boolean(holder.querySelector('[data-merchant-leave-v218]'));
    if(!force && correctButtons && hasLeave){
      holder.classList.remove('hidden');
      holder.classList.add(HOLDER_CLASS);
      ui?.battleUi?.classList.add('event-mode','merchant-mode-v218');
      return true;
    }

    // Remove both older Merchant renderers so only the reliable choice list remains.
    ui?.chestLayer?.classList.remove('merchant-active-v197');
    ui?.chestLayer?.querySelector('#merchantShopV197')?.remove();
    holder.innerHTML='';
    holder.classList.remove('hidden','merchant-actions-v204');
    holder.classList.add(HOLDER_CLASS);

    wares.forEach((ware,index)=>holder.appendChild(makeWareButton(ware,index)));

    const leave=document.createElement('button');
    leave.type='button';
    leave.className='pixel-button merchant-choice-v218 merchant-leave-v218';
    leave.dataset.merchantLeaveV218='true';
    leave.innerHTML='<strong>No Thanks</strong><small>Leave the tiny roadside shop.</small>';
    leave.addEventListener('click',leaveMerchant);
    holder.appendChild(leave);

    ui?.battleUi?.classList.add('event-mode','merchant-mode-v218');
    ui?.postFloorActions?.classList.add('hidden');
    try{ setPostFloorLayout(false); }catch(error){ /* non-fatal */ }

    if(ui?.chestLayer){
      ui.chestLayer.classList.remove('hidden');
      ui.chestLayer.classList.add('merchant-scene-v218');
    }
    if(ui?.chestSprite){
      ui.chestSprite.src='../assets/ducks/Top-hat-duck.webp';
      ui.chestSprite.alt='Gentleman Duck';
      ui.chestSprite.classList.add('event-scene-art','merchant-duck');
    }
    if(ui?.chestCaption) ui.chestCaption.textContent='Mysterious Merchant';
    ui?.openChest?.classList.add('hidden');
    try{ setMessage('Gentleman Duck offers two completely random items today.'); }catch(error){ /* non-fatal */ }
    return true;
  }

  function scheduleMount(){
    requestAnimationFrame(()=>requestAnimationFrame(()=>mountMerchant()));
    setTimeout(()=>mountMerchant(),80);
    setTimeout(()=>mountMerchant(),260);
  }

  // Load after every older Quest patch and win the final render order.
  try{
    const previousStartEncounterV218=startEncounter;
    startEncounter=function(){
      const result=previousStartEncounterV218();
      if(currentMerchant()) scheduleMount();
      return result;
    };
  }catch(error){ /* The safety timer below still repairs an open Merchant. */ }

  try{
    const previousShowChestV218=showChest;
    showChest=function(data){
      const result=previousShowChestV218(data);
      if(data?.eventType==='mysterious-merchant') scheduleMount();
      return result;
    };
  }catch(error){ /* The safety timer below still repairs an open Merchant. */ }

  // A tiny active-scene watchdog repairs buttons if an older handler clears them.
  setInterval(()=>{
    if(currentMerchant()) mountMerchant();
  },300);

  if(currentMerchant()) scheduleMount();
})();
