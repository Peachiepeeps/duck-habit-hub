// Duckie Days v24.181 — compact Duckie Dash screen cleanup.
(function(){
  window.DUCKIE_DASH_SCREEN_SURFACE='24.181-compact';

  const style=document.createElement('style');
  style.textContent=`
    #dashScreen .dq-feature-shell{gap:12px;padding:16px;border-radius:24px;}
    #dashScreen .dq-feature-top{display:grid;gap:6px;align-items:start;}
    #dashScreen .dq-feature-top > div{display:grid;gap:4px;}
    #dashScreen #dashBack,
    #dashScreen #dashTitleActions,
    #dashScreen .dq-mini-grid{display:none !important;}
    #dashScreen .dash-v181-start-note{display:block!important;margin:0;color:#7e6571;font-size:.82rem;line-height:1.35;}
    #dashScreen .dash-stage-section,
    #dashScreen .dash-compact-panel,
    #dashScreen .dash-selector-stack,
    #dashScreen .dash-playbox{display:grid;gap:8px;}
    #dashScreen .dash-stage-section .mini-label,
    #dashScreen .dash-garage-wrap .mini-label{margin-bottom:2px;}
    #dashScreen .dash-stage-buttons{gap:10px;}
    #dashScreen .dash-stage-button{min-height:56px;border-radius:16px;background:#fffdfb;}
    #dashScreen .dash-stage-button.selected{background:#fff0f7;}
    #dashScreen .dash-hud{width:100%;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:0;}
    #dashScreen .dash-hud > span{display:flex;justify-content:center;align-items:center;min-height:44px;padding:8px 10px;border:2px solid rgba(140,98,93,.12);border-radius:14px;background:#fffdfb;font-size:.8rem;font-weight:700;color:#6e505a;text-align:center;}
    #dashScreen .dash-hud strong{margin-left:5px;font-size:1.08rem;color:#5b4049;}
    #dashScreen .dash-selector-card{position:relative;width:100%;padding:12px 42px 12px 14px;border:2px solid rgba(140,98,93,.14);border-radius:14px;background:#fffdfb;color:#634852;text-align:left;display:grid;gap:3px;box-shadow:0 1px 0 rgba(255,255,255,.7) inset;}
    #dashScreen .dash-selector-card span{font-size:.68rem;letter-spacing:.08em;text-transform:uppercase;color:#8d6f7b;}
    #dashScreen .dash-selector-card strong{font-size:1rem;line-height:1.2;}
    #dashScreen .dash-selector-card::after{content:'▾';position:absolute;right:13px;top:50%;transform:translateY(-50%);font-size:1rem;color:#8c625d;opacity:.85;}
    #dashScreen .dash-selector-card.is-open::after{content:'▴';}
    #dashScreen .dash-selector-card.static{cursor:default;}
    #dashScreen .dash-garage-wrap{display:none;gap:8px;}
    #dashScreen .dash-garage-wrap.dash-garage-open{display:grid;}
    #dashScreen .dash-garage{gap:8px;}
    #dashScreen .dash-cart-card{border-radius:15px;background:#fffdfb;}
    #dashScreen .dash-playbox{gap:8px;}
    #dashScreen .dash-playbox > .dash-hud{display:none !important;}
    #dashScreen .dash-track{width:100%;max-width:none;}
    #dashScreen .dash-overlay{padding:12px;}
    #dashScreen .dash-overlay-card{width:min(100%,290px);max-width:290px;gap:9px;padding:14px 14px 12px;}
    #dashScreen .dash-overlay-card strong{font-size:1.28rem;}
    #dashScreen .dash-overlay-card small{line-height:1.45;}
    #dashScreen .dash-overlay-cost{display:inline-flex;align-items:center;justify-content:center;gap:6px;font-size:.8rem;font-weight:900;color:#71545f;}
    #dashScreen .dash-overlay-cost img{width:18px;height:18px;object-fit:contain;image-rendering:pixelated;}
    #dashScreen .dash-tap-note{display:none!important;}
    @media(max-width:560px){
      #dashScreen .dash-overlay-card{width:min(100%,300px);}
      #dashScreen .dash-garage{grid-template-columns:repeat(2,minmax(0,1fr));}
    }
  `;
  document.head.appendChild(style);

  function ensureStartNote(screen){
    const titleCol=screen.querySelector('.dq-feature-top > div');
    if(!titleCol) return;
    titleCol.querySelectorAll('small').forEach(el=>el.remove());
    let note=titleCol.querySelector('.dash-v181-start-note');
    if(!note){
      note=document.createElement('small');
      note.className='dash-v181-start-note';
      titleCol.appendChild(note);
    }
    note.textContent='3 Tokens to Start';
  }

  function rewordHud(hud){
    const items=[...hud.querySelectorAll(':scope > span')];
    if(items.length<4) return;
    const values=items.map(span=>{
      const strong=span.querySelector('strong');
      return strong ? strong.textContent.trim() : '0';
    });
    items[0].innerHTML=`♥ <strong id="dashHearts">${values[0]||'3'}</strong>`;
    items[1].innerHTML=`Time <strong id="dashTime">${values[1]||'30.0'}</strong>`;
    items[2].innerHTML=`Best Coins <strong id="dashCoins">${values[2]||'0'}</strong>`;
    items[3].innerHTML=`Tiny Ducks <strong id="dashTiny">${values[3]||'0'}</strong>`;
  }

  function ensureCompactSections(screen){
    const shell=screen.querySelector('.dq-feature-shell');
    if(!shell) return;

    const allDirect=[...shell.children];
    const mini=screen.querySelector('.dq-mini-grid');
    if(mini) mini.remove();
    const playbox=screen.querySelector('.dash-playbox');
    const garageWrap=screen.querySelector('.dash-garage-wrap');
    const hud=screen.querySelector('.dash-hud');
    let stageSection=allDirect.find(node=>node.querySelector?.('#dashStageButtons'));
    if(stageSection) stageSection.classList.add('dash-stage-section');

    if(hud && stageSection && hud.parentElement!==shell){
      rewordHud(hud);
      shell.insertBefore(hud, playbox || garageWrap || null);
    }

    if(hud && stageSection && hud.previousElementSibling!==stageSection){
      shell.insertBefore(stageSection, hud);
    }

    let selectors=screen.querySelector('#dashCompactSelectors');
    if(!selectors){
      selectors=document.createElement('div');
      selectors.id='dashCompactSelectors';
      selectors.className='dash-selector-stack';
      selectors.innerHTML=`
        <button id="dashCartSelector" class="dash-selector-card" type="button" aria-expanded="false">
          <span>Selected Cart</span>
          <strong id="dashCartLabel">Default Cart</strong>
        </button>
        <div id="dashOcSelector" class="dash-selector-card static" aria-hidden="false">
          <span>Selected OC</span>
          <strong id="dashSelectedOcName">Peep</strong>
        </div>`;
      shell.insertBefore(selectors, playbox || garageWrap || null);
    }

    if(hud && selectors && hud.nextElementSibling!==selectors){
      shell.insertBefore(selectors, hud.nextSibling);
    }

    screen.querySelector('#dashSelectedSummary')?.remove();

    if(garageWrap){
      const label=garageWrap.querySelector('.mini-label');
      if(label) label.textContent='CART GARAGE';
      if(selectors && garageWrap.previousElementSibling!==selectors && !garageWrap.classList.contains('dash-garage-open')){
        shell.insertBefore(garageWrap, playbox || null);
      }
    }

    if(playbox && garageWrap && playbox.previousElementSibling!==selectors && !garageWrap.classList.contains('dash-garage-open')){
      shell.appendChild(playbox);
    }
  }

  function ensureOverlay(screen){
    const overlay=screen.querySelector('#dashOverlay');
    const card=overlay?.querySelector('.dash-overlay-card');
    if(!card) return;
    const small=card.querySelector('small');
    if(card.querySelector('#dashStart')){
      if(small) small.textContent='Use 3 Jump Tokens to run. A rare Free Run is used first if you have one.';
      if(!card.querySelector('.dash-overlay-cost')){
        const cost=document.createElement('div');
        cost.className='dash-overlay-cost';
        cost.innerHTML='Cost: 3 Tokens <img src="assets/dash/Jump-Token.png" alt="">';
        const button=card.querySelector('#dashStart');
        if(button) button.insertAdjacentElement('afterend',cost);
        else card.appendChild(cost);
      }
    }
  }

  function wireCartToggle(screen){
    const cartButton=screen.querySelector('#dashCartSelector');
    const garageWrap=screen.querySelector('.dash-garage-wrap');
    if(!cartButton || !garageWrap || cartButton.dataset.v181Bound==='1') return;
    cartButton.dataset.v181Bound='1';
    const sync=()=>{
      const open=garageWrap.classList.contains('dash-garage-open');
      cartButton.classList.toggle('is-open',open);
      cartButton.setAttribute('aria-expanded',open?'true':'false');
    };
    cartButton.addEventListener('click',()=>{
      garageWrap.classList.toggle('dash-garage-open');
      sync();
    });
    sync();
  }

  function applyCompactDash(){
    const screen=document.querySelector('#dashScreen');
    if(!screen) return;
    ensureStartNote(screen);
    ensureCompactSections(screen);
    ensureOverlay(screen);
    wireCartToggle(screen);
  }

  const originalShowScreen=window.showScreen;
  if(typeof originalShowScreen==='function' && !originalShowScreen.__dashV181Wrapped){
    const wrapped=function(which){
      const result=originalShowScreen.apply(this,arguments);
      if(which==='dash') setTimeout(applyCompactDash,0);
      return result;
    };
    wrapped.__dashV181Wrapped=true;
    window.showScreen=wrapped;
  }

  const originalRenderMeta=window.renderMeta;
  if(typeof originalRenderMeta==='function' && !originalRenderMeta.__dashV181Wrapped){
    const wrapped=function(){
      const result=originalRenderMeta.apply(this,arguments);
      setTimeout(applyCompactDash,0);
      return result;
    };
    wrapped.__dashV181Wrapped=true;
    window.renderMeta=wrapped;
  }

  const observer=new MutationObserver(()=>applyCompactDash());
  window.addEventListener('load',()=>{
    applyCompactDash();
    const screen=document.querySelector('#dashScreen');
    if(screen) observer.observe(screen,{childList:true,subtree:true});
  });
  setTimeout(applyCompactDash,0);
  setTimeout(applyCompactDash,250);
})();
