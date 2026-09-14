// Duckie Days v24.189 — hatchery egg placement and detail window fine tune.
// Leaves the proven v24.179 hatchery logic untouched.
(function(){
  'use strict';
  window.DUCKIE_HATCH_EGG_POSITION='24.189-top-middle-plus-detail-lowered';
  const id='duckieHatchEggPositionV189Style';
  document.getElementById(id)?.remove();
  const style=document.createElement('style');
  style.id=id;
  style.textContent=`
    /* Top slot: nudge up a bit more */
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(1) .hatch-main-egg{
      top:34.2%!important;
    }
    /* Middle slot: nudge up a bit more than the others */
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(2) .hatch-main-egg{
      top:31.8%!important;
    }
    /* Bottom slot: keep the current perfect position */
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(3) .hatch-main-egg{
      top:36.5%!important;
    }
    /* Egg detail window: lower the egg so the bottom outline rests on the
       darker nest center more naturally. */
    #hatcheryScreenV179 .hatch-window-egg{
      top:16px!important;
    }
  `;
  document.head.appendChild(style);
})();
