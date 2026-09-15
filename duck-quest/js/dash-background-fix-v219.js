// Duckie Days v24.219 — correctly scaled, endlessly repeating Dash strips.
(function(){
  'use strict';

  window.DUCKIE_DASH_BACKGROUND_FIX='24.219-small-endless-strip';

  const style=document.createElement('style');
  style.id='duckieDashBackgroundV219Style';
  style.textContent=`
    /* The supplied 2048 × 167 artwork is a long repeatable strip. Keep it near
       its intended pixel scale instead of stretching its short height to fill
       the full-screen run surface. */
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
      height:clamp(145px,20dvh,175px)!important;
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
      node.textContent=node.textContent
        .replace(/Finish Line!/gi,'Time’s Up!')
        .replace(/You reached the boss-stage finish!/gi,'The timer reached zero — run complete!');
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
  const overlay=document.querySelector('#dashOverlay');
  if(overlay){
    new MutationObserver(removeBossLanguage).observe(overlay,{childList:true,subtree:true});
  }
  document.querySelector('#dashStageButtons')?.addEventListener('click',()=>setTimeout(syncSky,0));
  window.addEventListener('resize',syncSky,{passive:true});
  sync();
})();
