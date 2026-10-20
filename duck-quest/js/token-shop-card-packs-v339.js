/* v24.339 — Five trading-card packs per local calendar day in the Jump Token Shop. */
(()=>{
 'use strict';
 const COST=3,LIMIT=5;
 const el=document.querySelector('#tokenShopModalV200 .token-shop-items-v200');
 if(!el || document.querySelector('#tokenShopPackRowV339'))return;
 const row=document.createElement('div');row.id='tokenShopPackRowV339';row.className='token-shop-item-v200';
 row.innerHTML=`<img src="../assets/trading-cards/card-pack-unopened.png" alt="Trading Card Pack"><div class="token-shop-item-copy-v200"><strong>Trading Card Pack</strong><span>3 Jump Tokens</span><small id="tokenShopPackDailyV339">5 / 5 left today</small></div><button id="buyTokenShopPackV339" class="pixel-button primary token-shop-buy-v200" type="button">Buy</button>`;
 el.appendChild(row);
 const button=row.querySelector('#buyTokenShopPackV339'), label=row.querySelector('#tokenShopPackDailyV339');
 const pad=x=>String(x).padStart(2,'0');
 function dayKey(){const d=new Date();return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;}
 function state(){
   if(!questSave.tokenShopCardPacksV339 || typeof questSave.tokenShopCardPacksV339!=='object')questSave.tokenShopCardPacksV339={};
   const st=questSave.tokenShopCardPacksV339;
   if(st.day!==dayKey()){st.day=dayKey();st.bought=0;}
   st.bought=Math.max(0,Math.min(LIMIT,Math.floor(Number(st.bought)||0)));
   return st;
 }
 function count(){return Math.max(0,Math.floor(Number(hubSave?.inventory?.['jump-token'])||0));}
 function refresh(){
   const left=Math.max(0,LIMIT-state().bought);
   label.textContent=`${left} / ${LIMIT} packs left today`;
   button.disabled=left<=0||count()<COST;
   button.textContent=left===0?'Sold Out':count()<COST?'Need 3':'Buy';
   const balance=document.querySelector('#tokenShopTokensV200');if(balance)balance.textContent=String(count());
 }
 function notify(message){const target=document.querySelector('#tokenShopMessageV200');if(target)target.textContent=message;}
 button.addEventListener('click',event=>{
   event.stopPropagation();
   const st=state();
   if(st.bought>=LIMIT){notify('All 5 card packs bought for today! ♡');refresh();return;}
   if(count()<COST){notify('You need 3 Jump Tokens for a card pack.');refresh();return;}
   const cards=window.DuckieTradingCards;
   if(!cards?.grantPack){notify('Trading Cards are not ready yet. Please reopen the shop.');return;}
   // Award on the same hubSave object persisted by Duck Quest.
   const previousTokens=count();
   hubSave.inventory['jump-token']=previousTokens-COST;
   if(hubSave.inventory['jump-token']===0)delete hubSave.inventory['jump-token'];
   cards.grantPack(hubSave,1);
   st.bought++;
   persistAll();
   notify(`Trading Card Pack added! ♡ ${LIMIT-st.bought} left today.`);
   refresh();
 });
 document.querySelector('#openTokenShopV200')?.addEventListener('click',()=>requestAnimationFrame(refresh));
 document.querySelector('#tokenShopModalV200')?.addEventListener('click',event=>{
   if(event.target!==button)setTimeout(refresh,0);
 });
 refresh();
})();
