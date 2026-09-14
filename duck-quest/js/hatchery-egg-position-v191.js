// Duckie Days v24.191 — hatchery egg placement refine 3.
// Leaves the proven v24.179 hatchery logic untouched.
(function(){
  'use strict';
  window.DUCKIE_HATCH_EGG_POSITION='24.191-top-middle-equal-up-popup-lower';
  const id='duckieHatchEggPositionV191Style';
  document.getElementById(id)?.remove();
  const style=document.createElement('style');
  style.id=id;
  style.textContent=`
    /* Top slot: nudge up a bit more */
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(1) .hatch-main-egg{
      top:33.2%!important;
    }
    /* Middle slot: nudge up by the same amount */
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(2) .hatch-main-egg{
      top:29.9%!important;
    }
    /* Bottom slot: keep the current perfect position */
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(3) .hatch-main-egg{
      top:36.5%!important;
    }
    /* Egg detail window: lower the egg a decent amount more. */
    #hatcheryScreenV179 .hatch-window-egg{
      top:58px!important;
    }
  `;
  document.head.appendChild(style);
})();
