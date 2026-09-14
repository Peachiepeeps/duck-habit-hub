// Duckie Days v24.192 — hatchery popup softening pass.
// Leaves the proven v24.179 hatchery logic untouched.
(function(){
  'use strict';
  window.DUCKIE_HATCH_EGG_POSITION='24.192-popup-up-slightly';
  const id='duckieHatchEggPositionV192Style';
  document.getElementById(id)?.remove();
  const style=document.createElement('style');
  style.id=id;
  style.textContent=`
    /* Top slot: keep the current working position */
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(1) .hatch-main-egg{
      top:32.4%!important;
    }
    /* Middle slot: keep the current working position */
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(2) .hatch-main-egg{
      top:28.6%!important;
    }
    /* Bottom slot: keep the current perfect position */
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(3) .hatch-main-egg{
      top:36.5%!important;
    }
    /* Egg detail window: bring the egg back up slightly from v24.191. */
    #hatcheryScreenV179 .hatch-window-egg{
      top:44px!important;
    }
  `;
  document.head.appendChild(style);
})();
