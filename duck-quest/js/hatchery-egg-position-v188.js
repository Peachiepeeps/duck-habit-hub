// Duckie Days v24.188 — hatchery egg position refine only.
// Leaves the proven v24.179 hatchery logic untouched.
(function(){
  'use strict';
  window.DUCKIE_HATCH_EGG_POSITION='24.188-top-middle-raised';
  const id='duckieHatchEggPositionV188Style';
  document.getElementById(id)?.remove();
  const style=document.createElement('style');
  style.id=id;
  style.textContent=`
    /* Top slot: nudge up a bit more */
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(1) .hatch-main-egg{
      top:35.3%!important;
    }
    /* Middle slot: nudge up a bit more than the others */
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(2) .hatch-main-egg{
      top:33.8%!important;
    }
    /* Bottom slot: keep the current perfect position */
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(3) .hatch-main-egg{
      top:36.5%!important;
    }
  `;
  document.head.appendChild(style);
})();
