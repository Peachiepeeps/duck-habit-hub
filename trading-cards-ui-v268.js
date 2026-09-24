(function(){
  'use strict';
  const TC=window.DuckieTradingCards;
  if(!TC)return;

  const PACK_PRICE=150;
  const DAILY_LIMIT=3;

  function dataRef(){
    try{
      if(typeof save!=='undefined' && save && typeof save==='object') return save;
    }catch(error){}
    return TC.readSave();
  }
  function commit(data){
    TC.ensureState(data);
    try{
      if(typeof save!=='undefined' && data===save && typeof persist==='function'){
        persist();
        return;
      }
    }catch(error){}
    TC.writeSave(data);
  }
  function toast(message){
    try{
      if(typeof showToast==='function'){showToast(message);return;}
    }catch(error){}
    console.info(message);
  }
  function todayKey(){
    const d=new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
  function packDaily(state){
    if(!state.dailyPackShopV268 || typeof state.dailyPackShopV268!=='object'){
      state.dailyPackShopV268={dayKey:todayKey(),bought:0};
    }
    if(state.dailyPackShopV268.dayKey!==todayKey()){
      state.dailyPackShopV268.dayKey=todayKey();
      state.dailyPackShopV268.bought=0;
    }
    state.dailyPackShopV268.bought=Math.max(0,Math.min(DAILY_LIMIT,Math.floor(Number(state.dailyPackShopV268.bought)||0)));
    return state.dailyPackShopV268;
  }
  function updateVisibleCoins(value){
    document.querySelectorAll('#shopCoinCount,#coinCount').forEach(el=>{
      el.textContent=Math.max(0,Number(value)||0).toLocaleString();
    });
    try{ if(typeof renderRoom==='function')renderRoom(); }catch(error){}
  }
  function buyPack(){
    const data=dataRef();
    const state=TC.ensureState(data);
    const daily=packDaily(state);
    if(daily.bought>=DAILY_LIMIT){
      toast('You already bought all 3 Card Packs for today! ♡');
      enhanceShop();
      return;
    }
    const coins=Math.max(0,Number(data.coins)||0);
    if(coins<PACK_PRICE){
      toast(`You need ${PACK_PRICE} Pink Coins for a Card Pack!`);
      return;
    }
    data.coins=coins-PACK_PRICE;
    TC.grantPack(data,1);
    daily.bought+=1;
    commit(data);
    updateVisibleCoins(data.coins);
    toast(`Card Pack purchased! ${DAILY_LIMIT-daily.bought} left in today’s Shop. ♡`);
    enhanceShop();
  }
  function enhanceShop(){
    const grid=document.querySelector('.shop-grid > .tc-shop-grid');
    const cardsTab=document.querySelector('[data-shop-tab="cards"]');
    if(!grid || (cardsTab && !cardsTab.classList.contains('active'))) return;

    const data=dataRef();
    const state=TC.ensureState(data);
    const daily=packDaily(state);
    commit(data);

    let tile=grid.querySelector('.tc-pack-shop-v268');
    if(!tile){
      tile=document.createElement('article');
      tile.className='tc-shop-card tc-pack-shop-v268';
      grid.append(tile);
    }

    const remaining=Math.max(0,DAILY_LIMIT-daily.bought);
    tile.innerHTML='';
    const art=document.createElement('img');
    art.className='tc-pack-shop-art-v268';
    art.src=TC.packAsset('card-pack-unopened.png');
    art.alt='Card Pack';

    const copy=document.createElement('div');
    copy.className='tc-pack-shop-copy-v268';
    copy.innerHTML=`<strong>Card Pack</strong><small>3 cards per pack · ${PACK_PRICE} Pink Coins<br>${daily.bought} / ${DAILY_LIMIT} bought today</small>`;

    const buy=document.createElement('button');
    buy.type='button';
    buy.className='tc-shop-buy';
    buy.disabled=remaining<=0;
    buy.textContent=remaining>0?`Buy Pack (${remaining} left)`:'Sold Out Today';
    buy.addEventListener('click',buyPack);

    tile.append(art,copy,buy);
  }

  function scheduleEnhance(){requestAnimationFrame(()=>requestAnimationFrame(enhanceShop));}

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',scheduleEnhance,{once:true});
  }else{
    scheduleEnhance();
  }
  document.addEventListener('click',scheduleEnhance,true);
  window.addEventListener('focus',scheduleEnhance);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)scheduleEnhance();});

  window.DUCKIE_TRADING_CARD_UI_V268='24.268';
})();
