// Duckie Days v24.187 — hatchery egg position fine-tune only.
// Leaves the proven v24.179 hatchery logic untouched.
(function(){
  'use strict';
  window.DUCKIE_HATCH_EGG_POSITION='24.187-fine-tuned';
  const id='duckieHatchEggPositionV187Style';
  document.getElementById(id)?.remove();
  const style=document.createElement('style');
  style.id=id;
  style.textContent=`
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(1) .hatch-main-egg,
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(3) .hatch-main-egg{
      top:36.5%!important;
    }
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(2) .hatch-main-egg{
      top:35.2%!important;
    }
  `;
  document.head.appendChild(style);
})();
