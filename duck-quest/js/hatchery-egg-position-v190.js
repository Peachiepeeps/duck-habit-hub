// Duckie Days v24.190 — hatchery egg placement refine 2.
// Leaves the proven v24.179 hatchery logic untouched.
(function(){
  'use strict';
  window.DUCKIE_HATCH_EGG_POSITION='24.190-middle-higher-popup-lower';
  const id='duckieHatchEggPositionV190Style';
  document.getElementById(id)?.remove();
  const style=document.createElement('style');
  style.id=id;
  style.textContent=`
    /* Top slot: keep the current working position */
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(1) .hatch-main-egg{
      top:34.2%!important;
    }
    /* Middle slot: nudge up a tiny bit more */
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(2) .hatch-main-egg{
      top:30.9%!important;
    }
    /* Bottom slot: keep the current perfect position */
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(3) .hatch-main-egg{
      top:36.5%!important;
    }
    /* Egg detail window: lower the egg a noticeable amount more. */
    #hatcheryScreenV179 .hatch-window-egg{
      top:34px!important;
    }
  `;
  document.head.appendChild(style);
})();
