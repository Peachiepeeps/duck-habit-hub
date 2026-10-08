// Duckie Days v24.313 — Duck Quest reward-card sizing polish
(function(){
  "use strict";
  const VERSION="24.313";
  if(!document.querySelector("#questCardRewardStyleV313")){
    const style=document.createElement("style");
    style.id="questCardRewardStyleV313";
    style.textContent=`
      #questCardRewardV311.quest-card-reward-v311{
        right:7%!important;
        top:25%!important;
        width:27%!important;
        height:42%!important;
        display:flex!important;
        align-items:center!important;
        justify-content:center!important;
        overflow:visible!important;
      }
      #questCardRewardV311 .quest-card-reward-stack-v311{
        width:100%!important;
        height:100%!important;
        max-width:100%!important;
        max-height:100%!important;
        display:flex!important;
        align-items:center!important;
        justify-content:center!important;
        flex-wrap:wrap!important;
        gap:4px!important;
      }
      #questCardRewardV311 .quest-card-reward-item-v311{
        flex:0 1 auto!important;
        width:min(15vw,64px)!important;
        max-width:64px!important;
        min-width:0!important;
        max-height:94%!important;
        filter:drop-shadow(0 3px 3px rgba(70,45,60,.18))!important;
      }
      #questCardRewardV311 .quest-card-reward-item-v311>.tc-face{
        width:100%!important;
        max-width:64px!important;
        height:auto!important;
        margin:0!important;
      }
      @media(max-width:600px){
        #questCardRewardV311.quest-card-reward-v311{
          right:6%!important;
          top:26%!important;
          width:29%!important;
          height:40%!important;
        }
        #questCardRewardV311 .quest-card-reward-item-v311{
          width:min(14vw,54px)!important;
          max-width:54px!important;
        }
        #questCardRewardV311 .quest-card-reward-item-v311>.tc-face{max-width:54px!important}
      }
    `;
    document.head.append(style);
  }
  window.DUCKIE_QUEST_FIXES_V313={version:VERSION};
})();
