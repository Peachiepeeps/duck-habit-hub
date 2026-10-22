// Duckie Days v24.347 — Stoplight Owl light alignment + Chonk battle facing fix.
(function(){
  'use strict';
  if(window.DUCKIE_DAYS_OWL_CHONK_FIX_V347) return;
  window.DUCKIE_DAYS_OWL_CHONK_FIX_V347='24.347-stoplight-owl-chonk-fix';

  const style=document.createElement('style');
  style.id='duckieStoplightOwlChonkFixV347Style';
  style.textContent=`
    .city-owl-lights-v345{display:none !important;}
    .city-owl-lights-v347{
      position:absolute;
      pointer-events:none;
      z-index:9;
      overflow:visible;
      background:url("assets/bosses/stoplight-owl/base/dim-lights.png") center / contain no-repeat;
      image-rendering:pixelated;
      transform-origin:center bottom;
    }
    .city-owl-lights-v347 i{
      position:absolute;
      aspect-ratio:1;
      border-radius:50%;
      opacity:0;
    }
    .city-owl-lights-v347 .red{
      left:27%; top:56.4%; width:10%;
      background:#ff4d4d;
      box-shadow:0 0 7px 3px rgba(255,120,120,.95), inset 0 0 0 1px #ffd3d3;
    }
    .city-owl-lights-v347 .yellow{
      left:27%; top:70%; width:10%;
      background:#ffe05a;
      box-shadow:0 0 7px 3px rgba(255,236,128,.95), inset 0 0 0 1px #fff5c5;
    }
    .city-owl-lights-v347 .green{
      left:32%; top:82.7%; width:10%;
      background:#56f45f;
      box-shadow:0 0 7px 3px rgba(144,255,156,.95), inset 0 0 0 1px #d4ffda;
    }
    .city-owl-lights-v347[data-signal="red"] .red,
    .city-owl-lights-v347[data-signal="yellow"] .yellow,
    .city-owl-lights-v347[data-signal="green"] .green{opacity:1;}


    .enemy-fighter.chonk-facing-left-v347{
      scale:-1 1;
      transform-origin:center bottom;
    }
  `;
  document.head.appendChild(style);

  function enemyRefs(){
    const refs=[];
    try{
      if(typeof ui!=='undefined' && ui.enemyCombatant && ui.enemySprite){
        refs.push({combatant:ui.enemyCombatant,sprite:ui.enemySprite});
      }
      if(typeof ui!=='undefined' && ui.enemyCombatant2 && ui.enemySprite2){
        refs.push({combatant:ui.enemyCombatant2,sprite:ui.enemySprite2});
      }
    }catch(error){}
    return refs;
  }

  function ensureOwlOverlay(refs){
    if(!refs?.combatant || !refs?.sprite) return null;
    const legacy=refs.combatant.querySelector('.city-owl-lights-v345');
    if(legacy) legacy.style.display='none';

    let overlay=refs.combatant.querySelector('.city-owl-lights-v347');
    const isOwl = /stoplight-owl/i.test(String(refs.sprite.src||''))
      && !refs.combatant.classList.contains('hidden');
    if(!isOwl){
      overlay?.remove();
      return null;
    }

    if(!overlay){
      overlay=document.createElement('div');
      overlay.className='city-owl-lights-v347';
      overlay.dataset.signal='green';
      overlay.innerHTML='<i class="red"></i><i class="yellow"></i><i class="green"></i>';
      refs.combatant.appendChild(overlay);
    }

    const spriteBox=refs.sprite.getBoundingClientRect();
    const hostBox=refs.combatant.getBoundingClientRect();
    if(spriteBox.width>0 && spriteBox.height>0){
      overlay.style.left=(spriteBox.left-hostBox.left)+'px';
      overlay.style.top=(spriteBox.top-hostBox.top+1)+'px';
      overlay.style.width=spriteBox.width+'px';
      overlay.style.height=spriteBox.height+'px';
    }

    overlay.dataset.signal = legacy?.dataset?.signal || 'green';
    // The bounding-rect sync already includes sprite movement; do not animate the lights twice.

    return overlay;
  }

  function syncVisualFixes(){
    for(const refs of enemyRefs()){
      const sprite=refs.sprite;
      if(!sprite) continue;
      const isChonk=/\/chonk\//i.test(String(sprite.src||'')) && !refs.combatant?.classList.contains('hidden');
      sprite.classList.toggle('chonk-facing-left-v347', isChonk);
      ensureOwlOverlay(refs);
    }
  }

  if(typeof renderEnemyCombatant==='function'){
    const oldRenderEnemyCombatant=renderEnemyCombatant;
    renderEnemyCombatant=function(){
      const result=oldRenderEnemyCombatant.apply(this,arguments);
      requestAnimationFrame(syncVisualFixes);
      return result;
    };
  }

  if(typeof beginBattle==='function'){
    const oldBeginBattle=beginBattle;
    beginBattle=function(){
      const result=oldBeginBattle.apply(this,arguments);
      requestAnimationFrame(()=>requestAnimationFrame(syncVisualFixes));
      return result;
    };
  }

  window.addEventListener('resize',()=>requestAnimationFrame(syncVisualFixes));
  setInterval(syncVisualFixes,60);
  requestAnimationFrame(syncVisualFixes);
})();

