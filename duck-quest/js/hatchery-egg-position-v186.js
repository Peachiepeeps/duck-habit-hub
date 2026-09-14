// Duckie Days v24.186 — hatchery egg position only.
// Leaves the proven v24.179 hatchery logic untouched.
(function(){
  'use strict';
  window.DUCKIE_HATCH_EGG_POSITION='24.186-raised';
  const id='duckieHatchEggPositionV186Style';
  document.getElementById(id)?.remove();
  const style=document.createElement('style');
  style.id=id;
  style.textContent=`
    #hatcheryScreenV179 .hatch-main-egg{
      top:38%!important;
    }
  `;
  document.head.appendChild(style);
})();
