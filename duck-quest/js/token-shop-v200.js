// Duckie Days v24.200 — Duck Quest Token Shop + home tool layout.
// Keeps the existing Quest/Hatchery/Dash systems intact and adds a small isolated shop UI.
(function(){
  'use strict';
  window.DUCKIE_TOKEN_SHOP='24.200-common-egg-and-daily-jump-token';

  const EGG_TOKEN_COST=3;
  const JUMP_TOKEN_COIN_COST=10;
  const DAILY_JUMP_TOKEN_LIMIT=4;

  const style=document.createElement('style');
  style.id='duckieTokenShopV200Style';
  style.textContent=`
    #homeScreen .hero-info > #questHomeTools{
      width:min(100%,210px)!important;
      max-width:210px!important;
      display:grid!important;
      grid-template-columns:repeat(2,minmax(0,1fr))!important;
      gap:7px!important;
      align-items:stretch!important;
      justify-items:stretch!important;
    }
    #homeScreen #questHomeTools .quest-home-tool-button{
      width:100%!important;
      min-width:0!important;
      max-width:none!important;
      height:46px!important;
      min-height:46px!important;
      max-height:46px!important;
      margin:0!important;
      padding:5px 7px!important;
      border-radius:14px!important;
      font-size:.62rem!important;
      display:flex!important;
      align-items:center!important;
      justify-content:center!important;
      gap:5px!important;
      background:#fff6df!important;
      color:var(--brown,#6f4a45)!important;
      text-shadow:none!important;
    }
    #homeScreen #questHomeTools #openCharmScreen{grid-column:1!important;grid-row:1!important;}
    #homeScreen #questHomeTools #openTokenShopV200{grid-column:2!important;grid-row:1!important;}
    #homeScreen #questHomeTools #openHatchery{
      grid-column:1 / -1!important;
      grid-row:2!important;
      height:54px!important;
      min-height:54px!important;
      max-height:54px!important;
      font-size:.67rem!important;
    }
    #homeScreen #questHomeTools .home-token-shop-icon{
      width:23px!important;
      height:23px!important;
      min-width:23px!important;
      max-width:23px!important;
      object-fit:contain!important;
      image-rendering:pixelated!important;
      flex:0 0 23px!important;
    }
    #homeScreen #questHomeTools #openHatchery .home-hatch-icon{
      width:27px!important;height:27px!important;min-width:27px!important;max-width:27px!important;flex:0 0 27px!important;
    }

    .token-shop-modal-v200{
      position:fixed!important;inset:0!important;z-index:2147483300!important;
      display:grid!important;place-items:center!important;padding:14px!important;
      background:rgba(54,42,51,.42)!important;backdrop-filter:blur(3px)!important;
    }
    .token-shop-modal-v200.hidden{display:none!important;}
    .token-shop-backdrop-v200{position:absolute!important;inset:0!important;border:0!important;background:transparent!important;}
    .token-shop-card-v200{
      position:relative!important;z-index:1!important;width:min(94vw,390px)!important;max-height:min(88dvh,720px)!important;
      overflow:auto!important;border:3px solid var(--border,#cf667d)!important;border-radius:22px!important;
      background:#fff8f4!important;box-shadow:0 18px 50px rgba(60,43,52,.28)!important;
      padding:16px!important;display:grid!important;gap:12px!important;color:#684b58!important;
    }
    .token-shop-close-v200{
      position:absolute!important;top:8px!important;right:8px!important;width:32px!important;height:32px!important;
      border:2px solid #dd748b!important;border-radius:50%!important;background:#fff!important;color:#bd4d66!important;
      font-weight:900!important;font-size:1rem!important;z-index:3!important;
    }
    .token-shop-heading-v200{text-align:center!important;padding:0 34px!important;}
    .token-shop-heading-v200 .mini-label{display:block!important;margin-bottom:2px!important;}
    .token-shop-heading-v200 h2{margin:0!important;font-size:1.25rem!important;}
    .token-shop-balances-v200{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:6px!important;}
    .token-shop-balance-v200{background:#fff!important;border:2px solid rgba(207,102,125,.16)!important;border-radius:13px!important;padding:8px 4px!important;text-align:center!important;}
    .token-shop-balance-v200 span{display:block!important;font-size:.58rem!important;text-transform:uppercase!important;letter-spacing:.05em!important;color:#8c707b!important;}
    .token-shop-balance-v200 strong{display:block!important;margin-top:2px!important;font-size:.86rem!important;color:#8e4b5d!important;}
    .token-shop-items-v200{display:grid!important;gap:9px!important;}
    .token-shop-item-v200{display:grid!important;grid-template-columns:58px minmax(0,1fr) auto!important;gap:9px!important;align-items:center!important;background:#fff!important;border:2px solid rgba(207,102,125,.18)!important;border-radius:16px!important;padding:9px!important;}
    .token-shop-item-v200>img{width:54px!important;height:54px!important;object-fit:contain!important;image-rendering:pixelated!important;}
    .token-shop-item-copy-v200{display:grid!important;gap:2px!important;min-width:0!important;}
    .token-shop-item-copy-v200 strong{font-size:.88rem!important;color:#8e4b5d!important;}
    .token-shop-item-copy-v200 span{font-size:.7rem!important;color:#715864!important;font-weight:800!important;}
    .token-shop-item-copy-v200 small{font-size:.62rem!important;color:#8b727c!important;line-height:1.3!important;}
    .token-shop-buy-v200{min-width:64px!important;padding:7px 8px!important;font-size:.65rem!important;}
    .token-shop-message-v200{min-height:18px!important;margin:0!important;text-align:center!important;font-size:.7rem!important;font-weight:800!important;color:#9a5064!important;}
    @media(max-width:390px){
      #homeScreen .hero-info > #questHomeTools{width:min(100%,190px)!important;max-width:190px!important;}
      #homeScreen #questHomeTools .quest-home-tool-button{font-size:.57rem!important;}
      .token-shop-item-v200{grid-template-columns:50px minmax(0,1fr)!important;}
      .token-shop-item-v200>img{width:46px!important;height:46px!important;}
      .token-shop-buy-v200{grid-column:1 / -1!important;width:100%!important;}
    }
  `;
  document.head.appendChild(style);

  function qty(id){
    const inv=hubSave?.inventory;
    return Math.max(0,Math.floor(Number(inv?.[id])||0));
  }
  function addItem(id,n=1){
    if(!hubSave.inventory || typeof hubSave.inventory!=='object') hubSave.inventory={};
    hubSave.inventory[id]=qty(id)+Math.max(1,Math.floor(Number(n)||1));
  }
  function spendItem(id,n=1){
    n=Math.max(1,Math.floor(Number(n)||1));
    const have=qty(id);
    if(have<n) return false;
    const left=have-n;
    if(left) hubSave.inventory[id]=left; else delete hubSave.inventory[id];
    return true;
  }
  function localDayKey(){
    const d=new Date(),pad=n=>String(n).padStart(2,'0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  }
  function shopSave(){
    if(!questSave.tokenShopV200 || typeof questSave.tokenShopV200!=='object') questSave.tokenShopV200={};
    const s=questSave.tokenShopV200,key=localDayKey();
    if(s.day!==key){s.day=key;s.coinTokenPurchases=0;}
    s.coinTokenPurchases=Math.max(0,Math.min(DAILY_JUMP_TOKEN_LIMIT,Math.floor(Number(s.coinTokenPurchases)||0)));
    return s;
  }
  function save(){
    hubSave.coins=Math.max(0,Number(hubSave.coins)||0);
    persistAll();
    try{renderMeta();}catch(error){}
    const token=qty('jump-token');
    ['#dashTokenHome','#dashTokenCount'].forEach(sel=>{const el=document.querySelector(sel);if(el)el.textContent=String(token);});
    const egg=document.querySelector('#commonEggQty');if(egg)egg.textContent=String(qty('common-egg'));
  }

  const tools=document.querySelector('#questHomeTools');
  const hatch=document.querySelector('#openHatchery');
  if(tools && hatch && !document.querySelector('#openTokenShopV200')){
    const button=document.createElement('button');
    button.id='openTokenShopV200';
    button.className='pixel-button quest-home-tool-button';
    button.type='button';
    button.innerHTML='<img class="home-token-shop-icon" src="assets/dash/Jump-Token.png" alt=""><span>Token Shop</span>';
    tools.insertBefore(button,hatch);
  }

  if(!document.querySelector('#tokenShopModalV200')){
    const modal=document.createElement('div');
    modal.id='tokenShopModalV200';
    modal.className='token-shop-modal-v200 hidden';
    modal.setAttribute('aria-hidden','true');
    modal.innerHTML=`
      <button class="token-shop-backdrop-v200" type="button" aria-label="Close Token Shop"></button>
      <section class="token-shop-card-v200" role="dialog" aria-modal="true" aria-labelledby="tokenShopTitleV200">
        <button id="closeTokenShopV200" class="token-shop-close-v200" type="button" aria-label="Close">×</button>
        <div class="token-shop-heading-v200"><span class="mini-label">TOKEN SHOP</span><h2 id="tokenShopTitleV200">Trade & Shop</h2></div>
        <div class="token-shop-balances-v200">
          <div class="token-shop-balance-v200"><span>Pink Coins</span><strong id="tokenShopCoinsV200">0</strong></div>
          <div class="token-shop-balance-v200"><span>Jump Tokens</span><strong id="tokenShopTokensV200">0</strong></div>
          <div class="token-shop-balance-v200"><span>Common Eggs</span><strong id="tokenShopEggsV200">0</strong></div>
        </div>
        <div class="token-shop-items-v200">
          <div class="token-shop-item-v200">
            <img src="assets/eggs/Common-egg.png" alt="Common Egg">
            <div class="token-shop-item-copy-v200"><strong>Common Egg</strong><span>3 Jump Tokens</span><small>Incubate it in the Hatching Area.</small></div>
            <button id="buyCommonEggV200" class="pixel-button primary token-shop-buy-v200" type="button">Buy</button>
          </div>
          <div class="token-shop-item-v200">
            <img src="assets/dash/Jump-Token.png" alt="Jump Token">
            <div class="token-shop-item-copy-v200"><strong>Jump Token</strong><span>10 Pink Coins</span><small id="tokenShopDailyV200">4 / 4 purchases left today</small></div>
            <button id="buyJumpTokenV200" class="pixel-button primary token-shop-buy-v200" type="button">Buy</button>
          </div>
        </div>
        <p id="tokenShopMessageV200" class="token-shop-message-v200" aria-live="polite"></p>
      </section>`;
    document.body.appendChild(modal);
  }

  const modal=document.querySelector('#tokenShopModalV200');
  const message=document.querySelector('#tokenShopMessageV200');
  function setMessage(text){if(message)message.textContent=text||'';}
  function renderShop(){
    const s=shopSave(),left=Math.max(0,DAILY_JUMP_TOKEN_LIMIT-s.coinTokenPurchases),coins=Math.max(0,Math.floor(Number(hubSave.coins)||0));
    document.querySelector('#tokenShopCoinsV200').textContent=coins.toLocaleString();
    document.querySelector('#tokenShopTokensV200').textContent=String(qty('jump-token'));
    document.querySelector('#tokenShopEggsV200').textContent=String(qty('common-egg'));
    document.querySelector('#tokenShopDailyV200').textContent=`${left} / ${DAILY_JUMP_TOKEN_LIMIT} purchases left today`;
    const eggBuy=document.querySelector('#buyCommonEggV200');
    if(eggBuy){eggBuy.disabled=qty('jump-token')<EGG_TOKEN_COST;eggBuy.textContent=eggBuy.disabled?'Need 3':'Buy';}
    const tokenBuy=document.querySelector('#buyJumpTokenV200');
    if(tokenBuy){tokenBuy.disabled=left<=0||coins<JUMP_TOKEN_COIN_COST;tokenBuy.textContent=left<=0?'Sold Out':coins<JUMP_TOKEN_COIN_COST?'Need 10':'Buy';}
    save();
  }
  function openShop(){setMessage('');renderShop();modal?.classList.remove('hidden');modal?.setAttribute('aria-hidden','false');}
  function closeShop(){modal?.classList.add('hidden');modal?.setAttribute('aria-hidden','true');setMessage('');}

  document.querySelector('#openTokenShopV200')?.addEventListener('click',openShop);
  document.querySelector('#closeTokenShopV200')?.addEventListener('click',closeShop);
  modal?.querySelector('.token-shop-backdrop-v200')?.addEventListener('click',closeShop);
  document.querySelector('#buyCommonEggV200')?.addEventListener('click',()=>{
    if(!spendItem('jump-token',EGG_TOKEN_COST)){setMessage('You need 3 Jump Tokens.');renderShop();return;}
    addItem('common-egg',1);save();setMessage('Common Egg purchased! ♡');renderShop();
  });
  document.querySelector('#buyJumpTokenV200')?.addEventListener('click',()=>{
    const s=shopSave();
    if(s.coinTokenPurchases>=DAILY_JUMP_TOKEN_LIMIT){setMessage('You bought all 4 coin Tokens for today.');renderShop();return;}
    const coins=Math.max(0,Math.floor(Number(hubSave.coins)||0));
    if(coins<JUMP_TOKEN_COIN_COST){setMessage('You need 10 Pink Coins.');renderShop();return;}
    hubSave.coins=coins-JUMP_TOKEN_COIN_COST;
    s.coinTokenPurchases++;
    addItem('jump-token',1);save();setMessage('Jump Token purchased!');renderShop();
  });
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!modal?.classList.contains('hidden'))closeShop();});
})();
