// Duckie Days v24.179 — isolated external Hatching Area recovery.
// This file is loaded AFTER the main Duck Quest script so it still runs even if
// a late legacy hatchery patch inside the large game file throws or conflicts.
(function(){
  'use strict';
  const BUILD='24.179';
  const HATCH_BG='assets/eggs/Hatching-background-six-v343.png';
  const api=window.DuckieHatchApiV178 || null;

  // Remove every earlier hatchery surface. The v24.179 screen uses a brand-new
  // id and is never passed through the legacy showScreen('hatchery') chain.
  document.getElementById('hatcheryScreen')?.remove();
  document.getElementById('hatcheryScreenV178')?.remove();
  document.getElementById('hatcheryScreenV179')?.remove();
  document.getElementById('duckieHatchV179Style')?.remove();

  const style=document.createElement('style');
  style.id='duckieHatchV179Style';
  style.textContent=`
    body.hatchery-v179-active{overflow:hidden!important;}
    #hatcheryScreenV179{
      position:fixed!important;z-index:2147483000!important;
      top:var(--hatch-v179-top,72px)!important;left:0!important;right:0!important;bottom:0!important;
      width:100vw!important;height:auto!important;min-height:0!important;max-height:none!important;
      margin:0!important;padding:0!important;display:block!important;overflow:hidden!important;
      background-color:#9ee78f!important;background-image:url("${HATCH_BG}");
      background-position:center center!important;background-repeat:no-repeat!important;background-size:cover!important;
      image-rendering:pixelated!important;transform:none!important;
    }
    #hatcheryScreenV179.hidden{display:none!important;}
    #hatcheryScreenV179 .hatchery-v179-topbar{
      position:absolute!important;z-index:50!important;top:10px!important;left:10px!important;right:10px!important;
      display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;align-items:start!important;gap:8px!important;
      pointer-events:none!important;
    }
    #hatcheryScreenV179 .hatchery-v179-topbar>*{pointer-events:auto!important;}
    #hatcheryScreenV179 .hatchery-v179-title{
      justify-self:start!important;padding:6px 10px!important;border:2px solid rgba(255,255,255,.95)!important;
      border-radius:999px!important;background:rgba(255,250,246,.92)!important;color:#7c4f52!important;
      box-shadow:0 3px 0 rgba(102,67,61,.15)!important;font-size:.72rem!important;font-weight:900!important;
      letter-spacing:.05em!important;
    }
    #hatcheryScreenV179 .hatch-inventory-button{
      min-height:34px!important;padding:5px 9px!important;border:2px solid #8c625d!important;border-radius:10px!important;
      background:#fff6df!important;color:#6f4a45!important;box-shadow:0 3px 0 rgba(102,67,61,.18)!important;font-weight:900!important;
    }
    #hatcheryScreenV179 #hatchWorldReady{
      position:absolute!important;z-index:45!important;top:13%!important;left:50%!important;transform:translateX(-50%)!important;
    }
    #hatcheryScreenV179 .hatch-nest-slots-v179{
      position:absolute!important;inset:0!important;z-index:20!important;display:block!important;width:100%!important;height:100%!important;
      pointer-events:none!important;
    }
    #hatcheryScreenV179 .hatch-nest-slot{
      position:absolute!important;left:50%!important;width:min(50vw,190px)!important;height:18%!important;min-height:74px!important;
      transform:translate(-50%,-50%)!important;display:grid!important;place-items:center!important;
      border:0!important;border-radius:999px!important;background:transparent!important;box-shadow:none!important;
      padding:0!important;margin:0!important;pointer-events:auto!important;cursor:pointer!important;
    }
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(1){top:35%!important;}
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(2){top:64%!important;}
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(3){top:89%!important;}
    /* v24.343: two tidy columns of three; use the entire background instead of a tall stack. */
    #hatcheryScreenV179 .hatch-nest-slot{width:min(44%,160px)!important;height:25%!important;min-height:0!important;left:25%!important;top:34%!important;}
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(2){top:58%!important;left:25%!important;}
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(3){top:82%!important;left:25%!important;}
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(4){top:34%!important;left:75%!important;}
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(5){top:58%!important;left:75%!important;}
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(6){top:82%!important;left:75%!important;}
    #hatcheryScreenV179 .hatch-nest-slot .hatch-main-egg{width:clamp(35px,11vw,62px)!important;height:clamp(35px,11vw,62px)!important;top:44%!important;}
    #hatcheryScreenV179 .hatch-nest-slot .hatch-slot-status{font-size:clamp(.48rem,1.55vw,.61rem)!important;max-width:94%!important;overflow-wrap:anywhere!important;white-space:normal!important;text-align:center!important;top:78%!important;}
    #hatcheryScreenV179 .hatchery-v179-topbar{grid-template-columns:minmax(0,1fr) auto auto!important;}
    #hatchAllButtonV343{min-height:34px!important;padding:5px 9px!important;border:2px solid #8c625d!important;border-radius:10px!important;background:#ffecaf!important;color:#72534a!important;font-weight:900!important;white-space:nowrap!important;}
    #hatchAllButtonV343:disabled{opacity:.56;cursor:default;}
    #hatchAllResultsV343{position:absolute;z-index:2147483500;inset:0;display:grid;place-items:center;background:rgba(43,28,42,.48);padding:14px;}
    #hatchAllResultsV343[hidden]{display:none!important;}
    #hatchAllResultsV343 .bulk-card{width:min(400px,95%);max-height:80%;overflow:auto;background:#fffafa;border:3px solid #c489a4;border-radius:24px;padding:18px;text-align:center;color:#694750;box-shadow:0 9px 0 #744f6655;}
    #hatchAllResultsV343 .bulk-entries{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin:14px 0;}
    #hatchAllResultsV343 .bulk-entries div{font-weight:800;font-size:.72rem;}
    #hatchAllResultsV343 .bulk-entries img{display:block;width:60px;height:60px;max-width:100%;margin:auto;object-fit:contain;image-rendering:pixelated;}
    #hatchAllResultsV343 .bulk-close{font:900 1rem system-ui;border:2px solid #a86f8d;border-radius:16px;background:#f9bfd5;padding:9px 25px;color:#6f4a57;}
    @media(max-width:380px){#hatcheryScreenV179 .hatchery-v179-topbar{gap:3px!important;}#hatchAllButtonV343{font-size:.68rem!important;padding:5px!important;}#hatcheryScreenV179 .hatch-inventory-button{font-size:.68rem!important;padding:5px!important;}}

    #hatcheryScreenV179 .hatch-main-egg{
      position:absolute!important;left:50%!important;top:48%!important;transform:translate(-50%,-50%)!important;
      width:72px!important;height:72px!important;object-fit:contain!important;image-rendering:pixelated!important;
    }
    #hatcheryScreenV179 .hatch-empty-plus{
      width:38px!important;height:38px!important;display:grid!important;place-items:center!important;border-radius:50%!important;
      background:rgba(255,250,240,.90)!important;border:2px solid rgba(140,98,93,.82)!important;color:#9b6575!important;
      font-size:1.2rem!important;font-weight:900!important;
    }
    #hatcheryScreenV179 .hatch-slot-status{
      position:absolute!important;left:50%!important;top:82%!important;transform:translateX(-50%)!important;white-space:nowrap!important;
      padding:3px 7px!important;border-radius:999px!important;background:rgba(255,250,240,.92)!important;color:#76545d!important;
      font-size:.58rem!important;font-weight:900!important;
    }
    #hatcheryScreenV179 .hatch-modal{z-index:2147483100!important;}
    @media(min-width:521px){
      #hatcheryScreenV179{left:50%!important;right:auto!important;width:min(520px,100vw)!important;transform:translateX(-50%)!important;}
    }
  `;
  document.head.appendChild(style);

  const screen=document.createElement('section');
  screen.id='hatcheryScreenV179';
  screen.className='hidden';
  screen.dataset.build=BUILD;
  screen.setAttribute('aria-label','Hatching Area');
  screen.innerHTML=`
    <div class="hatchery-v179-topbar">
      <div class="hatchery-v179-title">Hatching Area</div>
      <button id="hatchAllButtonV343" type="button" disabled>Hatch All ♡</button>
      <button id="hatchInventoryButton" class="hatch-inventory-button" type="button">Inventory <span id="hatchInventoryCount" class="count">0</span></button>
    </div>
    <div id="hatchWorldReady" class="hatch-world-ready hidden">An egg is ready! ✨</div>
    <div id="hatchAllResultsV343" hidden role="dialog" aria-modal="true" aria-label="Hatched Lil Guys"><div class="bulk-card"><h2>All hatched! ♡</h2><div class="bulk-entries"></div><button class="bulk-close" type="button">Yay! ♡</button></div></div>
    <div id="hatchNestSlots" class="hatch-nest-slots hatch-nest-slots-v179" aria-label="Incubating eggs"></div>
    <div id="hatchDetailModal" class="hatch-modal hidden" aria-hidden="true">
      <button id="hatchDetailBackdrop" class="hatch-modal-backdrop" type="button" aria-label="Close egg window"></button>
      <section class="hatch-modal-card" role="dialog" aria-modal="true" aria-labelledby="hatchDetailTitle">
        <button id="closeHatchDetail" class="hatch-modal-close" type="button" aria-label="Close">×</button>
        <div class="hatch-modal-heading"><span id="hatchDetailKicker" class="mini-label">INCUBATOR</span><h2 id="hatchDetailTitle">Buddy Egg</h2><small id="hatchDetailSubtitle">Warm and cozy.</small></div>
        <div class="hatch-window">
          <div id="hatchGlow" class="hatch-window-glow" aria-hidden="true"></div>
          <img class="hatch-window-nest" src="assets/eggs/Hatch-nest.png?v=24-179" alt="">
          <img id="hatchDetailEgg" class="hatch-window-egg" src="assets/eggs/Common-egg.png?v=24-179" alt="Buddy egg">
          <div id="hatchResult" class="hatch-result hidden" aria-live="polite"></div>
        </div>
        <div id="hatchDetailStatus" class="hatch-detail-status">Incubating...</div>
        <div id="hatchDetailActions" class="hatch-detail-actions"></div>
      </section>
    </div>
    <div id="eggInventoryModal" class="hatch-modal hidden" aria-hidden="true">
      <button id="eggInventoryBackdrop" class="hatch-modal-backdrop" type="button" aria-label="Close egg inventory"></button>
      <section class="hatch-modal-card" role="dialog" aria-modal="true" aria-labelledby="eggInventoryTitle">
        <button id="closeEggInventory" class="hatch-modal-close" type="button" aria-label="Close">×</button>
        <div class="hatch-modal-heading"><span class="mini-label">EGG INVENTORY</span><h2 id="eggInventoryTitle">Choose an Egg</h2><small>You can keep as many eggs as you find.</small></div>
        <div id="eggInventoryGrid" class="egg-inventory-summary"></div>
        <p id="eggInventoryNote" class="egg-inventory-note">Up to six eggs can incubate at once.</p>
      </section>
    </div>`;
  document.body.appendChild(screen);

  function setTop(){
    const header=document.querySelector('.quest-header');
    const top=Math.max(0,Math.round(header?.getBoundingClientRect().bottom||72));
    screen.style.setProperty('--hatch-v179-top',`${top}px`);
  }
  function hideQuestScreens(){
    ['homeScreen','dashScreen','charmScreen','buddyScreen','battleScreen','resultScreen'].forEach(id=>document.getElementById(id)?.classList.add('hidden'));
    document.querySelectorAll('.quest-modal').forEach(el=>{el.classList.add('hidden');el.setAttribute('aria-hidden','true');});
  }
  function render(){
    try{api?.renderHatchery?.();}catch(error){console.warn('v24.179 hatchery render',error);}
  }
  function open(){
    hideQuestScreens();
    document.body.classList.remove('hatchery-active','hatchery-v178-active');
    document.body.classList.add('hatchery-v179-active');
    setTop();
    screen.classList.remove('hidden');
    window.scrollTo?.(0,0);
    render();
    requestAnimationFrame(()=>{setTop();render();});
  }
  function close(){
    screen.classList.add('hidden');
    document.body.classList.remove('hatchery-v179-active','hatchery-active','hatchery-v178-active');
    document.getElementById('homeScreen')?.classList.remove('hidden');
    window.scrollTo?.(0,0);
    try{renderMeta?.();}catch(error){}
  }

  // Clone the home button to physically remove every legacy hatchery click
  // listener. This guarantees the old showScreen('hatchery') chain never runs.
  const legacyButton=document.getElementById('openHatchery');
  if(legacyButton){
    const cleanButton=legacyButton.cloneNode(true);
    legacyButton.replaceWith(cleanButton);
    cleanButton.addEventListener('click',event=>{event.preventDefault();open();});
  }

  const hatchAllButton=document.getElementById('hatchAllButtonV343');
  const hatchAllResult=document.getElementById('hatchAllResultsV343');
  hatchAllResult?.querySelector('.bulk-close')?.addEventListener('click',()=>{hatchAllResult.hidden=true;render();});
  hatchAllButton?.addEventListener('click',()=>{
    if(!api?.hatchAllReadyV343)return;
    const hatched=api.hatchAllReadyV343();
    if(!hatched?.length){render();return;}
    const grid=hatchAllResult.querySelector('.bulk-entries');grid.replaceChildren();
    for(const item of hatched){
      const card=document.createElement('div'),img=document.createElement('img'),name=document.createElement('span');
      img.src=item.image;img.alt='';name.textContent=item.name+(item.shiny?' ✨':'');card.append(img,name);grid.append(card);
    }
    hatchAllResult.hidden=false;
    render();
  });
  const oldRender=api?.renderHatchery;
  if(api && typeof oldRender==='function'){
    api.renderHatchery=function(){
      const result=oldRender.apply(this,arguments);
      const n=api.readyEggCount?.()||0;
      hatchAllButton.disabled=n===0;
      hatchAllButton.textContent=n?`Hatch All (${n}) ♡`:'Hatch All ♡';
      return result;
    };
  }
  document.getElementById('hatchInventoryButton')?.addEventListener('click',()=>api?.openEggInventory?.(null,false));
  document.getElementById('closeHatchDetail')?.addEventListener('click',()=>api?.closeHatchDetail?.());
  document.getElementById('hatchDetailBackdrop')?.addEventListener('click',()=>api?.closeHatchDetail?.());
  document.getElementById('closeEggInventory')?.addEventListener('click',()=>api?.closeEggInventory?.());
  document.getElementById('eggInventoryBackdrop')?.addEventListener('click',()=>api?.closeEggInventory?.());

  // Capture the global back button while v24.179 is open. Other screens keep
  // their normal back behavior.
  document.getElementById('backGames')?.addEventListener('click',event=>{
    if(screen.classList.contains('hidden')) return;
    event.preventDefault();event.stopImmediatePropagation();close();
  },true);

  window.addEventListener('resize',()=>{if(!screen.classList.contains('hidden'))setTop();},{passive:true});
  window.addEventListener('orientationchange',()=>setTimeout(()=>{if(!screen.classList.contains('hidden'))setTop();},100),{passive:true});
  window.visualViewport?.addEventListener('resize',()=>{if(!screen.classList.contains('hidden'))setTop();},{passive:true});
  setInterval(()=>{if(!screen.classList.contains('hidden'))render();},1000);

  window.DUCKIE_HATCH_SURFACE='24.179-external';
})();
