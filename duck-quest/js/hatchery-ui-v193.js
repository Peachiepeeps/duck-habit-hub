// Duckie Days v24.193 — simple centered hatch detail heading.
(function(){
  'use strict';
  window.DUCKIE_HATCH_MODAL_UI='24.193-centered-simple';
  const id='duckieHatchModalUiV193Style';
  document.getElementById(id)?.remove();
  const style=document.createElement('style');
  style.id=id;
  style.textContent=`
    /* The close button previously made the heading feel left-heavy. Keep
       equal breathing room on both sides, then give the titles a tiny nudge. */
    #hatcheryScreenV179 #hatchDetailModal .hatch-modal-heading{
      padding-left:34px!important;
      padding-right:34px!important;
      text-align:center!important;
      transform:translateX(3px)!important;
    }
    #hatcheryScreenV179 #hatchDetailModal #hatchDetailKicker,
    #hatcheryScreenV179 #hatchDetailModal #hatchDetailTitle{
      text-align:center!important;
    }
    /* Keep the egg detail popup simple: just Nest # + Egg Type. */
    #hatcheryScreenV179 #hatchDetailSubtitle{
      display:none!important;
    }
  `;
  document.head.appendChild(style);
})();
