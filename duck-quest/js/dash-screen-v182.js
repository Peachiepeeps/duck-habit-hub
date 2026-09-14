// Duckie Days v24.182 — Duckie Dash compact screen freeze hotfix.
// v24.181 used a subtree MutationObserver while also rewriting the same subtree.
// On some mobile/PWA browsers that could create a self-triggering mutation loop.
(function(){
  'use strict';
  window.DUCKIE_DASH_SCREEN_SURFACE='24.182-compact-freeze-fix';

  const style=document.createElement('style');
  style.textContent=`
    #dashScreen .dq-feature-shell{gap:12px;padding:16px;border-radius:24px;}
    #dashScreen .dq-feature-top{display:grid;gap:6px;align-items:start;}
    #dashScreen .dq-feature-top > div{display:grid;gap:4px;}
    #dashScreen #dashBack,
    #dashScreen #dashTitleActions,
    #dashScreen .dq-mini-grid{display:none !important;}
    #dashScreen .dash-v182-start-note{display:block!important;margin:0;color:#7e6571;font-size:.82rem;line-height:1.35;}
    #dashScreen .dash-stage-section,
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
    #dashScreen .dash-selector-card.static::after{content:'';}
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
    titleCol.querySelectorAll('small:not(.dash-v182-start-note)').forEach(el=>el.remove());
    let note=titleCol.querySelector('.dash-v182-start-note');
    if(!note){
      note=document.createElement('small');
      note.className='dash-v182-start-note';
      titleCol.appendChild(note);
    }
    if(note.textContent!=='3 Tokens to Start') note.textContent='3 Tokens to Start';
  }

  function rewordHud(hud){
    const items=[...hud.querySelectorAll(':scope > span')];
    if(items.length<4 || hud.dataset.v182Ready==='1') return;
    const values=items.map(span=>span.querySelector('strong')?.textContent.trim() || '0');
    items[0].innerHTML=`♥ <strong id="dashHearts">${values[0]||'3'}</strong>`;
    items[1].innerHTML=`Time <strong id="dashTime">${values[1]||'30.0'}</strong>`;
    items[2].innerHTML=`Best Coins <strong id="dashCoins">${values[2]||'0'}</strong>`;
    items[3].innerHTML=`Tiny Ducks <strong id="dashTiny">${values[3]||'0'}</strong>`;
    hud.dataset.v182Ready='1';
  }

  function ensureCompactSections(screen){
    const shell=screen.querySelector('.dq-feature-shell');
    if(!shell) return;

    screen.querySelector('.dq-mini-grid')?.remove();
    screen.querySelector('#dashSelectedSummary')?.remove();
    screen.querySelector('#dashTitleActions')?.remove();

    const playbox=screen.querySelector('.dash-playbox');
    const garageWrap=screen.querySelector('.dash-garage-wrap');
    const hud=screen.querySelector('.dash-hud');
    const stageSection=[...shell.children].find(node=>node.querySelector?.('#dashStageButtons'));
    if(stageSection) stageSection.classList.add('dash-stage-section');

    if(hud){
      rewordHud(hud);
      if(hud.parentElement!==shell) shell.insertBefore(hud, playbox || garageWrap || null);
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
        <div id="dashOcSelector" class="dash-selector-card static">
          <span>Selected OC</span>
          <strong id="dashSelectedOcName">Peep</strong>
        </div>`;
    }

    // Stable exact order: title -> course -> HUD -> selected rows -> optional garage -> play area.
    if(stageSection && hud && stageSection.nextElementSibling!==hud) shell.insertBefore(stageSection,hud);
    if(hud && selectors.parentElement!==shell) shell.insertBefore(selectors,playbox || garageWrap || null);
    if(hud && selectors && hud.nextElementSibling!==selectors) shell.insertBefore(selectors,hud.nextSibling);
    if(garageWrap && selectors && selectors.nextElementSibling!==garageWrap) shell.insertBefore(garageWrap,selectors.nextSibling);
    if(playbox && garageWrap && garageWrap.nextElementSibling!==playbox) shell.insertBefore(playbox,garageWrap.nextSibling);

    if(garageWrap){
      const label=garageWrap.querySelector('.mini-label');
      if(label && label.textContent!=='CART GARAGE') label.textContent='CART GARAGE';
    }
  }

  function ensureOverlay(screen){
    const card=screen.querySelector('#dashOverlay .dash-overlay-card');
    if(!card || !card.querySelector('#dashStart')) return;
    const small=card.querySelector('small');
    const copy='Use 3 Jump Tokens to run. A rare Free Run is used first if you have one.';
    if(small && small.textContent!==copy) small.textContent=copy;
    if(!card.querySelector('.dash-overlay-cost')){
      const cost=document.createElement('div');
      cost.className='dash-overlay-cost';
      cost.innerHTML='Cost: 3 Tokens <img src="assets/dash/Jump-Token.png" alt="">';
      card.querySelector('#dashStart')?.insertAdjacentElement('afterend',cost);
    }
  }

  function wireCartToggle(screen){
    const cartButton=screen.querySelector('#dashCartSelector');
    const garageWrap=screen.querySelector('.dash-garage-wrap');
    if(!cartButton || !garageWrap || cartButton.dataset.v182Bound==='1') return;
    cartButton.dataset.v182Bound='1';
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

  function updateCompactLabels(screen){
    const oc=screen.querySelector('#dashSelectedOcName');
    if(oc && typeof window.heroDisplayName==='function'){
      const name=window.heroDisplayName();
      if(name && oc.textContent!==name) oc.textContent=name;
    }
  }

  function applyCompactDash(){
    const screen=document.querySelector('#dashScreen');
    if(!screen) return;
    ensureStartNote(screen);
    ensureCompactSections(screen);
    ensureOverlay(screen);
    wireCartToggle(screen);
    updateCompactLabels(screen);
  }

  // Deliberately NO MutationObserver here. Re-apply only at safe lifecycle points.
  const originalShowScreen=window.showScreen;
  if(typeof originalShowScreen==='function' && !originalShowScreen.__dashV182Wrapped){
    const wrapped=function(which){
      const result=originalShowScreen.apply(this,arguments);
      if(which==='dash') requestAnimationFrame(applyCompactDash);
      return result;
    };
    wrapped.__dashV182Wrapped=true;
    window.showScreen=wrapped;
  }

  const originalRenderMeta=window.renderMeta;
  if(typeof originalRenderMeta==='function' && !originalRenderMeta.__dashV182Wrapped){
    const wrapped=function(){
      const result=originalRenderMeta.apply(this,arguments);
      if(!document.querySelector('#dashScreen')?.classList.contains('hidden')) requestAnimationFrame(applyCompactDash);
      return result;
    };
    wrapped.__dashV182Wrapped=true;
    window.renderMeta=wrapped;
  }

  window.addEventListener('load',applyCompactDash,{once:true});
  requestAnimationFrame(applyCompactDash);
})();
