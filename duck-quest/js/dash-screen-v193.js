// Duckie Days v24.193 — Duckie Dash dedicated run-stage presentation.
// The setup screen stays compact. Starting a run expands the actual course
// into a battle-like play stage instead of running inside the small preview.
(function(){
  'use strict';
  window.DUCKIE_DASH_RUN_SURFACE='24.193-dedicated-stage';

  const style=document.createElement('style');
  style.id='duckieDashRunStageV193Style';
  style.textContent=`
    #dashScreen.dash-run-stage-v193{
      position:fixed!important;
      z-index:2147482000!important;
      top:var(--dash-v193-top,64px)!important;
      left:0!important;
      right:0!important;
      bottom:0!important;
      width:100vw!important;
      height:auto!important;
      min-height:0!important;
      margin:0!important;
      padding:0!important;
      display:block!important;
      overflow:hidden!important;
      background:#fff8f4!important;
    }
    #dashScreen.dash-run-stage-v193 .dq-feature-shell{
      position:absolute!important;
      inset:0!important;
      width:100%!important;
      height:100%!important;
      margin:0!important;
      padding:0!important;
      display:block!important;
      border:0!important;
      border-radius:0!important;
      box-shadow:none!important;
      background:#fff8f4!important;
      overflow:hidden!important;
    }
    #dashScreen.dash-run-stage-v193 .dq-feature-shell > *:not(.dash-playbox){
      display:none!important;
    }
    #dashScreen.dash-run-stage-v193 .dash-playbox{
      position:absolute!important;
      inset:0!important;
      width:100%!important;
      height:100%!important;
      margin:0!important;
      padding:8px 0 0!important;
      display:grid!important;
      grid-template-rows:auto minmax(0,1fr)!important;
      gap:8px!important;
      align-items:stretch!important;
      justify-items:stretch!important;
      background:#fff8f4!important;
    }
    #dashScreen.dash-run-stage-v193 .dash-hud{
      display:grid!important;
      width:min(96%,760px)!important;
      max-width:none!important;
      margin:0 auto!important;
      padding:0 6px!important;
      grid-template-columns:repeat(4,minmax(0,1fr))!important;
      gap:6px!important;
      z-index:30!important;
    }
    #dashScreen.dash-run-stage-v193 .dash-hud>span{
      display:block!important;
      padding:7px 4px!important;
      border:2px solid rgba(140,98,93,.16)!important;
      border-radius:11px!important;
      background:#fffdfb!important;
      color:#684b58!important;
      text-align:center!important;
      font-size:.74rem!important;
      font-weight:800!important;
    }
    #dashScreen.dash-run-stage-v193 .dash-track{
      width:100%!important;
      max-width:none!important;
      height:100%!important;
      min-height:0!important;
      aspect-ratio:auto!important;
      margin:0!important;
      border-left:0!important;
      border-right:0!important;
      border-bottom:0!important;
      border-radius:18px 18px 0 0!important;
      box-sizing:border-box!important;
    }
    #dashScreen.dash-run-stage-v193 .dash-bg{
      width:100%!important;
      height:100%!important;
      object-fit:cover!important;
    }
    #dashScreen.dash-run-stage-v193 .dash-overlay{
      padding:18px!important;
      display:grid!important;
      place-items:center!important;
      align-content:center!important;
      background:rgba(255,249,253,.58)!important;
    }
    #dashScreen.dash-run-stage-v193 .dash-overlay.hidden{display:none!important;}
    #dashScreen.dash-run-stage-v193 .dash-overlay-card{
      width:min(86vw,330px)!important;
      max-width:330px!important;
      padding:15px!important;
      gap:10px!important;
      background:rgba(255,250,246,.97)!important;
    }
    #dashScreen.dash-run-stage-v193 .dash-result-actions-v193{
      display:grid!important;
      grid-template-columns:1fr 1fr!important;
      gap:8px!important;
    }
    #dashScreen.dash-run-stage-v193 .dash-tap-note{display:none!important;}

    @media(max-width:560px){
      #dashScreen.dash-run-stage-v193 .dash-hud{
        width:100%!important;
        padding:0 7px!important;
        gap:4px!important;
      }
      #dashScreen.dash-run-stage-v193 .dash-hud>span{
        padding:6px 2px!important;
        font-size:.64rem!important;
      }
    }
  `;
  document.head.appendChild(style);

  function setRunTop(){
    const screen=document.querySelector('#dashScreen');
    if(!screen) return;
    const header=document.querySelector('.quest-header');
    const top=Math.max(0,Math.round(header?.getBoundingClientRect().bottom||64));
    screen.style.setProperty('--dash-v193-top',`${top}px`);
  }

  setRunTop();
  window.addEventListener('resize',setRunTop,{passive:true});
  window.addEventListener('orientationchange',()=>setTimeout(setRunTop,100),{passive:true});
  window.visualViewport?.addEventListener('resize',setRunTop,{passive:true});
})();
