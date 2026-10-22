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
    /* All six nests use the same aligned egg position in v24.343. */
    /* Egg detail window: bring the egg back up slightly from v24.191. */
#hatcheryScreenV179 .hatch-window-egg{
  top:0!important;
  translate:0 37px!important;
    }
  `;
  document.head.appendChild(style);
})();
