// Duckie Days v24.224 — revised 2x full-height endless Dash strips without observer recursion.
(function(){
  'use strict';

  window.DUCKIE_DASH_BACKGROUND_FIX='24.224-2x-fullscreen-endless-no-freeze';

  const style=document.createElement('style');
  style.id='duckieDashBackgroundV224Style';
  style.textContent=`
    /* These are the revised 2x 4096 × 334 repeatable strips retained in v24.224.
       Fill the complete run surface while preserving their horizontal loop. */
    #dashBgScrollV217{
      position:absolute!important;
      inset:0!important;
      display:flex!important;
      align-items:flex-end!important;
      width:max-content!important;
      height:100%!important;
      overflow:visible!important;
      will-change:transform!important;
      pointer-events:none!important;
    }
    #dashScreen #dashBgScrollV217 .dash-bg,
    #dashScreen.dash-run-stage-v193 #dashBgScrollV217 .dash-bg{
      position:relative!important;
      inset:auto!important;
      display:block!important;
      flex:0 0 auto!important;
      width:auto!important;
      min-width:0!important;
      max-width:none!important;
      height:100%!important;
      min-height:0!important;
      max-height:none!important;
      object-fit:fill!important;
      object-position:left bottom!important;
      image-rendering:pixelated!important;
    }
  `;
  document.head.appendChild(style);

  const SKY_BY_FILE={
    'DD-Meadow.png':'rgb(129,154,239)',
    'DD-Ocean.png':'rgb(6,72,233)',
    'DD-Candyland.png':'rgb(229,194,228)',
    'DD-CloudGarden.png':'rgb(211,186,255)'
  };

  function syncSky(){
    const track=document.querySelector('#dashTrack');
    const image=document.querySelector('#dashBg');
    if(!track || !image) return;
    const file=String(image.getAttribute('src')||'').split('/').pop();
    track.style.setProperty('background',SKY_BY_FILE[file]||'#cde8f4','important');
  }

  function removeBossLanguage(){
    const heading=document.querySelector('#dashScreen .dq-feature-top small');
    if(heading && /boss.?stage/i.test(heading.textContent||'')){
      heading.textContent='Tap the course to jump. Keep going until the timer reaches zero!';
    }
    const overlay=document.querySelector('#dashOverlay');
    if(!overlay) return;
    overlay.querySelectorAll('strong,small').forEach(node=>{
      const before=node.textContent||'';
      const after=before
        .replace(/Finish Line!/gi,'Time’s Up!')
        .replace(/You reached the boss-stage finish!/gi,'The timer reached zero — run complete!');
      if(after!==before) node.textContent=after;
    });
  }

  function sync(){
    syncSky();
    removeBossLanguage();
  }

  const background=document.querySelector('#dashBg');
  if(background){
    new MutationObserver(syncSky).observe(background,{attributes:true,attributeFilter:['src']});
  }
  // v24.219 watched the overlay and then rewrote every observed text node,
  // including unchanged ones. That caused an endless MutationObserver loop
  // as soon as Duckie Dash opened. The game source now owns this copy, so a
  // single guarded cleanup at load is sufficient and cannot recurse.
  document.querySelector('#dashStageButtons')?.addEventListener('click',()=>setTimeout(syncSky,0));
  window.addEventListener('resize',syncSky,{passive:true});
  sync();
})();
