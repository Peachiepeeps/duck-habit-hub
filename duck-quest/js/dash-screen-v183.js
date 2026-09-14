// Duckie Days v24.183 — compact Duckie Dash layout refinements.
// Freeze-safe: no MutationObserver; updates occur only at lifecycle/click/timer points.
(function(){
  'use strict';
  window.DUCKIE_DASH_SCREEN_SURFACE='24.183-stage-ready-oc-dropdown';

  const BEST_COINS_KEY='duckieDashBestCoins_v1';
  const OC_NAMES={peep:'Peep',miko:'Miko',io:'Io',miho:'Miho',annika:'Annika'};
  let dashRunOc=null;
  let dashScreenOpen=false;

  const style=document.createElement('style');
  style.textContent=`
    #dashScreen .dq-feature-shell{gap:12px;padding:16px;border-radius:24px;}
    #dashScreen .dq-feature-top{display:grid;gap:5px;align-items:start;}
    #dashScreen .dq-feature-top > div{display:grid;gap:3px;}
    #dashScreen #dashBack,
    #dashScreen #dashTitleActions,
    #dashScreen .dq-mini-grid,
    #dashScreen .dash-hud{display:none!important;}
    #dashScreen .dash-v183-start-note{display:block!important;margin:0;color:#7e6571;font-size:.82rem;line-height:1.3;}

    #dashScreen .dash-stage-section,
    #dashScreen .dash-selector-stack,
    #dashScreen .dash-playbox{display:grid;gap:8px;}
    #dashScreen .dash-stage-section .mini-label,
    #dashScreen .dash-garage-wrap .mini-label{margin-bottom:2px;}
    #dashScreen .dash-stage-buttons{gap:10px;}
    #dashScreen .dash-stage-button{min-height:56px;border-radius:16px;background:#fffdfb;}
    #dashScreen .dash-stage-button.selected{background:#fff0f7;}

    #dashScreen .dash-v183-summary{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;}
    #dashScreen .dash-v183-stat{min-height:58px;padding:8px 10px;border:2px solid rgba(140,98,93,.13);border-radius:14px;background:#fffdfb;display:grid;place-items:center;text-align:center;align-content:center;gap:2px;}
    #dashScreen .dash-v183-stat span{font-size:.67rem;letter-spacing:.08em;text-transform:uppercase;color:#8c6e79;}
    #dashScreen .dash-v183-stat strong{font-size:.98rem;color:#60464f;}

    #dashScreen .dash-selector-card{position:relative;width:100%;padding:11px 42px 11px 14px;border:2px solid rgba(140,98,93,.14);border-radius:14px;background:#fffdfb;color:#634852;text-align:left;display:grid;gap:3px;box-shadow:0 1px 0 rgba(255,255,255,.7) inset;}
    #dashScreen .dash-selector-card span{font-size:.68rem;letter-spacing:.08em;text-transform:uppercase;color:#8d6f7b;}
    #dashScreen .dash-selector-card strong{font-size:1rem;line-height:1.2;}
    #dashScreen .dash-selector-card::after{content:'▾';position:absolute;right:13px;top:50%;transform:translateY(-50%);font-size:1rem;color:#8c625d;opacity:.85;}
    #dashScreen .dash-selector-card.is-open::after{content:'▴';}

    #dashScreen .dash-garage-wrap{display:none;gap:8px;}
    #dashScreen .dash-garage-wrap.dash-garage-open{display:grid;}
    #dashScreen .dash-garage{gap:8px;}
    #dashScreen .dash-cart-card{border-radius:15px;background:#fffdfb;}

    #dashScreen .dash-oc-picker{display:none;border:2px solid rgba(140,98,93,.14);border-radius:14px;background:#fffaf7;padding:7px;gap:6px;margin-top:-3px;}
    #dashScreen .dash-oc-picker.open{display:grid;}
    #dashScreen .dash-oc-choice{width:100%;min-height:40px;border:0;border-radius:10px;background:transparent;color:#60464f;text-align:left;padding:8px 10px;font:inherit;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:8px;}
    #dashScreen .dash-oc-choice:hover,#dashScreen .dash-oc-choice:focus-visible,#dashScreen .dash-oc-choice.selected{background:#fff0f6;outline:none;}
    #dashScreen .dash-oc-choice small{color:#a07483;font-size:.65rem;}

    #dashScreen .dash-playbox{gap:8px;}
    #dashScreen .dash-track{width:100%;max-width:none;min-height:0;}
    #dashScreen .dash-bg{filter:none!important;opacity:1!important;}
    #dashScreen .dash-overlay{background:transparent!important;padding:12px 14px 38px!important;place-items:center!important;}
    #dashScreen .dash-overlay-card{width:min(78%,310px);max-width:310px;gap:8px;padding:12px 14px 11px;background:rgba(255,250,246,.95);box-shadow:0 6px 0 rgba(116,78,76,.16);}
    #dashScreen .dash-overlay-card strong{font-size:1.22rem;}
    #dashScreen .dash-overlay-card small{font-size:.73rem;line-height:1.38;}
    #dashScreen .dash-overlay-card .pixel-button{min-height:42px;}
    #dashScreen .dash-overlay-cost{position:absolute;left:50%;bottom:8px;transform:translateX(-50%);display:inline-flex;align-items:center;justify-content:center;gap:6px;white-space:nowrap;padding:5px 10px;border-radius:999px;background:rgba(255,250,246,.92);border:1px solid rgba(140,98,93,.12);font-size:.74rem;font-weight:900;color:#71545f;box-shadow:0 2px 0 rgba(116,78,76,.08);}
    #dashScreen .dash-overlay-cost img{width:18px;height:18px;object-fit:contain;image-rendering:pixelated;}
    #dashScreen .dash-tap-note{display:none!important;}

    @media(max-width:560px){
      #dashScreen .dash-garage{grid-template-columns:repeat(2,minmax(0,1fr));}
      #dashScreen .dash-overlay-card{width:min(82%,300px);}
    }
  `;
  document.head.appendChild(style);

  function currentQuestOc(){
    try{
      if(typeof activeCharacterId!=='undefined' && OC_NAMES[activeCharacterId]) return activeCharacterId;
    }catch(error){}
    try{
      const save=JSON.parse(localStorage.getItem('duckHabitHubSave_v1')||'{}');
      const id=String(save?.duckQuest?.activeCharacter||save?.selectedCharacter||'peep');
      return OC_NAMES[id]?id:'peep';
    }catch(error){ return 'peep'; }
  }

  function availableOcs(){
    try{
      if(typeof availableQuestCharacters==='function'){
        const list=availableQuestCharacters();
        if(Array.isArray(list)&&list.length) return list.filter(id=>OC_NAMES[id]);
      }
    }catch(error){}
    try{
      const save=JSON.parse(localStorage.getItem('duckHabitHubSave_v1')||'{}');
      const unlocked=Array.isArray(save?.unlockedCharacters)?save.unlockedCharacters:['peep'];
      return ['peep','miko','io','miho','annika'].filter(id=>unlocked.includes(id));
    }catch(error){ return ['peep']; }
  }

  function getBestCoins(){
    const raw=Math.max(0,Math.floor(Number(localStorage.getItem(BEST_COINS_KEY))||0));
    return raw;
  }

  function setBestCoins(value){
    const n=Math.max(0,Math.floor(Number(value)||0));
    const old=getBestCoins();
    if(n>old) localStorage.setItem(BEST_COINS_KEY,String(n));
    return Math.max(old,n);
  }

  function updateBestCoinsDisplay(){
    const screen=document.querySelector('#dashScreen');
    if(!screen) return;
    const live=Math.max(0,Math.floor(Number(screen.querySelector('#dashCoins')?.textContent)||0));
    const best=setBestCoins(live);
    const out=screen.querySelector('#dashBestCoinsV183');
    if(out) out.textContent=`${best} Coins`;
  }

  function ensureStartNote(screen){
    const titleCol=screen.querySelector('.dq-feature-top > div');
    if(!titleCol) return;
    titleCol.querySelectorAll('small:not(.dash-v183-start-note)').forEach(el=>el.remove());
    let note=titleCol.querySelector('.dash-v183-start-note');
    if(!note){
      note=document.createElement('small');
      note.className='dash-v183-start-note';
      titleCol.appendChild(note);
    }
    if(note.textContent!=='3 Tokens to Start') note.textContent='3 Tokens to Start';
  }

  function ensureSummary(screen,shell,stageSection){
    let summary=screen.querySelector('#dashSummaryV183');
    if(!summary){
      summary=document.createElement('div');
      summary.id='dashSummaryV183';
      summary.className='dash-v183-summary';
      summary.innerHTML=`
        <div class="dash-v183-stat"><span>High Score</span><strong id="dashBestCoinsV183">0 Coins</strong></div>
        <div class="dash-v183-stat"><span>Time</span><strong>30 Seconds</strong></div>`;
    }
    if(stageSection && stageSection.nextElementSibling!==summary) shell.insertBefore(summary,stageSection.nextSibling);
    updateBestCoinsDisplay();
    return summary;
  }

  function renderOcPicker(screen){
    if(!dashRunOc) dashRunOc=currentQuestOc();
    const label=screen.querySelector('#dashRunOcNameV183');
    if(label) label.textContent=OC_NAMES[dashRunOc]||'Peep';
    window.DUCKIE_DASH_RUN_OC=dashRunOc;

    const picker=screen.querySelector('#dashOcPickerV183');
    if(!picker) return;
    picker.innerHTML='';
    availableOcs().forEach(id=>{
      const b=document.createElement('button');
      b.type='button';
      b.className=`dash-oc-choice${id===dashRunOc?' selected':''}`;
      b.innerHTML=`<strong>${OC_NAMES[id]||id}</strong>${id===currentQuestOc()?'<small>Main OC</small>':''}`;
      b.addEventListener('click',()=>{
        dashRunOc=id;
        window.DUCKIE_DASH_RUN_OC=id;
        picker.classList.remove('open');
        screen.querySelector('#dashOcSelector')?.classList.remove('is-open');
        screen.querySelector('#dashOcSelector')?.setAttribute('aria-expanded','false');
        renderOcPicker(screen);
      });
      picker.appendChild(b);
    });
  }

  function ensureSelectors(screen,shell,summary,playbox,garageWrap){
    screen.querySelector('#dashSelectedSummary')?.remove();
    let selectors=screen.querySelector('#dashCompactSelectors');
    if(!selectors){
      selectors=document.createElement('div');
      selectors.id='dashCompactSelectors';
      selectors.className='dash-selector-stack';
      selectors.innerHTML=`
        <button id="dashCartSelector" class="dash-selector-card" type="button" aria-expanded="false">
          <span>Selected Cart</span><strong id="dashCartLabel">Default Cart</strong>
        </button>
        <button id="dashOcSelector" class="dash-selector-card" type="button" aria-expanded="false">
          <span>Selected OC</span><strong id="dashRunOcNameV183">Peep</strong>
        </button>
        <div id="dashOcPickerV183" class="dash-oc-picker" role="menu" aria-label="Choose OC for this Duckie Dash run"></div>`;
    }else{
      let oldOc=selectors.querySelector('#dashOcSelector');
      if(oldOc && oldOc.tagName!=='BUTTON'){
        const replacement=document.createElement('button');
        replacement.id='dashOcSelector';
        replacement.className='dash-selector-card';
        replacement.type='button';
        replacement.setAttribute('aria-expanded','false');
        replacement.innerHTML='<span>Selected OC</span><strong id="dashRunOcNameV183">Peep</strong>';
        oldOc.replaceWith(replacement);
      }
      if(!selectors.querySelector('#dashOcPickerV183')){
        const picker=document.createElement('div');
        picker.id='dashOcPickerV183';
        picker.className='dash-oc-picker';
        picker.setAttribute('role','menu');
        picker.setAttribute('aria-label','Choose OC for this Duckie Dash run');
        selectors.appendChild(picker);
      }
    }

    const anchor=summary?.nextSibling || playbox || garageWrap || null;
    if(selectors.parentElement!==shell) shell.insertBefore(selectors,anchor);
    else if(summary && summary.nextElementSibling!==selectors) shell.insertBefore(selectors,summary.nextSibling);
    renderOcPicker(screen);
    return selectors;
  }

  function ensureOverlay(screen){
    const overlay=screen.querySelector('#dashOverlay');
    const card=overlay?.querySelector('.dash-overlay-card');
    if(!overlay || !card || !card.querySelector('#dashStart')) return;
    const small=card.querySelector('small');
    const copy='Use 3 Jump Tokens to run. A rare Free Run is used first if you have one.';
    if(small && small.textContent!==copy) small.textContent=copy;
    let cost=overlay.querySelector('.dash-overlay-cost');
    if(!cost){
      cost=document.createElement('div');
      cost.className='dash-overlay-cost';
      cost.innerHTML='Cost: 3 Tokens <img src="assets/dash/Jump-Token.png" alt="">';
      overlay.appendChild(cost);
    }else if(cost.parentElement!==overlay){
      overlay.appendChild(cost);
    }
  }

  function wireSelectors(screen){
    const cartButton=screen.querySelector('#dashCartSelector');
    const garageWrap=screen.querySelector('.dash-garage-wrap');
    if(cartButton && garageWrap && cartButton.dataset.v183Bound!=='1'){
      cartButton.dataset.v183Bound='1';
      const sync=()=>{
        const open=garageWrap.classList.contains('dash-garage-open');
        cartButton.classList.toggle('is-open',open);
        cartButton.setAttribute('aria-expanded',open?'true':'false');
      };
      cartButton.addEventListener('click',()=>{
        garageWrap.classList.toggle('dash-garage-open');
        screen.querySelector('#dashOcPickerV183')?.classList.remove('open');
        screen.querySelector('#dashOcSelector')?.classList.remove('is-open');
        screen.querySelector('#dashOcSelector')?.setAttribute('aria-expanded','false');
        sync();
      });
      sync();
    }

    const ocButton=screen.querySelector('#dashOcSelector');
    const picker=screen.querySelector('#dashOcPickerV183');
    if(ocButton && picker && ocButton.dataset.v183Bound!=='1'){
      ocButton.dataset.v183Bound='1';
      ocButton.addEventListener('click',()=>{
        const open=!picker.classList.contains('open');
        picker.classList.toggle('open',open);
        ocButton.classList.toggle('is-open',open);
        ocButton.setAttribute('aria-expanded',open?'true':'false');
        garageWrap?.classList.remove('dash-garage-open');
        cartButton?.classList.remove('is-open');
        cartButton?.setAttribute('aria-expanded','false');
      });
    }
  }

  function applyDashLayout(){
    const screen=document.querySelector('#dashScreen');
    const shell=screen?.querySelector('.dq-feature-shell');
    if(!screen || !shell) return;

    ensureStartNote(screen);
    screen.querySelector('.dq-mini-grid')?.remove();
    screen.querySelector('#dashTitleActions')?.remove();
    screen.querySelector('#dashSelectedSummary')?.remove();

    const stageSection=[...shell.children].find(node=>node.querySelector?.('#dashStageButtons'));
    if(stageSection) stageSection.classList.add('dash-stage-section');
    const playbox=screen.querySelector('.dash-playbox');
    const garageWrap=screen.querySelector('.dash-garage-wrap');

    const summary=ensureSummary(screen,shell,stageSection);
    const selectors=ensureSelectors(screen,shell,summary,playbox,garageWrap);

    // Stable compact order: title -> course -> summary -> selectors -> optional cart garage -> stage window.
    if(stageSection && summary && stageSection.nextElementSibling!==summary) shell.insertBefore(summary,stageSection.nextSibling);
    if(summary && selectors && summary.nextElementSibling!==selectors) shell.insertBefore(selectors,summary.nextSibling);
    if(garageWrap && selectors && selectors.nextElementSibling!==garageWrap) shell.insertBefore(garageWrap,selectors.nextSibling);
    if(playbox && garageWrap && garageWrap.nextElementSibling!==playbox) shell.insertBefore(playbox,garageWrap.nextSibling);

    if(garageWrap){
      const label=garageWrap.querySelector('.mini-label');
      if(label) label.textContent='CART GARAGE';
    }

    ensureOverlay(screen);
    wireSelectors(screen);
    renderOcPicker(screen);
    updateBestCoinsDisplay();
  }

  const originalShowScreen=window.showScreen;
  if(typeof originalShowScreen==='function' && !originalShowScreen.__dashV183Wrapped){
    const wrapped=function(which){
      const result=originalShowScreen.apply(this,arguments);
      if(which==='dash'){
        if(!dashScreenOpen){ dashRunOc=currentQuestOc(); dashScreenOpen=true; }
        requestAnimationFrame(applyDashLayout);
      }else{
        dashScreenOpen=false;
        dashRunOc=null;
        window.DUCKIE_DASH_RUN_OC=null;
      }
      return result;
    };
    wrapped.__dashV183Wrapped=true;
    window.showScreen=wrapped;
  }

  window.addEventListener('load',()=>{
    applyDashLayout();
    const screen=document.querySelector('#dashScreen');
    if(screen && !screen.classList.contains('hidden')){
      dashRunOc=currentQuestOc();
      dashScreenOpen=true;
      renderOcPicker(screen);
    }
  },{once:true});

  // Lightweight display refresh only; no DOM observer/rebuild loop.
  setInterval(()=>{
    const screen=document.querySelector('#dashScreen');
    if(screen && !screen.classList.contains('hidden')) updateBestCoinsDisplay();
  },400);

  requestAnimationFrame(applyDashLayout);
})();
