// Duckie Days v24.341 — Quest home button sizing + extra stale card cleanup
(function(){
  "use strict";
  const style=document.createElement('style');
  style.id='duckie-quest-home-fixes-v341';
  style.textContent=`
    #homeScreen .hero-info .hero-quick-actions{
      width:min(100%,296px)!important;
      max-width:296px!important;
      display:grid!important;
      grid-template-columns:repeat(2,minmax(0,1fr))!important;
      gap:9px!important;
      align-items:stretch!important;
    }
    #homeScreen .hero-info .hero-quick-actions .hero-info-button{
      min-width:0!important;
      min-height:54px!important;
      height:auto!important;
      padding:8px 10px!important;
      font-size:.74rem!important;
      line-height:1.12!important;
      white-space:normal!important;
      flex-wrap:wrap!important;
      overflow-wrap:anywhere!important;
      text-align:center!important;
      display:flex!important;
      align-items:center!important;
      justify-content:center!important;
    }
    #homeScreen .hero-info > #questHomeTools{
      width:min(100%,296px)!important;
      max-width:296px!important;
      display:grid!important;
      grid-template-columns:repeat(2,minmax(0,1fr))!important;
      gap:9px!important;
      align-items:stretch!important;
      justify-items:stretch!important;
    }
    #homeScreen #questHomeTools .quest-home-tool-button{
      width:100%!important;
      min-width:0!important;
      max-width:none!important;
      min-height:56px!important;
      height:auto!important;
      max-height:none!important;
      margin:0!important;
      padding:8px 10px!important;
      border-radius:14px!important;
      font-size:.72rem!important;
      line-height:1.12!important;
      display:flex!important;
      align-items:center!important;
      justify-content:center!important;
      gap:7px!important;
      white-space:normal!important;
      flex-wrap:wrap!important;
      overflow-wrap:anywhere!important;
      text-align:center!important;
    }
    #homeScreen #questHomeTools #openCharmScreen,
    #homeScreen #questHomeTools #openTokenShopV200,
    #homeScreen #questHomeTools #openHatchery,
    #homeScreen #questHomeTools #openBuddyBoxHomeV269{
      grid-column:auto!important;
      grid-row:auto!important;
      min-height:56px!important;
      height:auto!important;
      max-height:none!important;
      font-size:.72rem!important;
    }
    #homeScreen #questHomeTools .home-token-shop-icon,
    #homeScreen #questHomeTools .home-hatch-icon,
    #homeScreen #questHomeTools .home-charm-icon,
    #homeScreen #questHomeTools #openBuddyBoxHomeV269 img{
      flex:0 0 auto!important;
      max-width:25px!important;
      max-height:25px!important;
    }
    #homeScreen #questHomeTools #openHatchery .home-hatch-label{
      white-space:normal!important;
      overflow-wrap:normal!important;
    }
    #homeScreen #questHomeTools #hatchReadyBadge:not(:empty){
      font-size:.6rem!important;
      white-space:normal!important;
      overflow-wrap:normal!important;
    }
    @media(max-width:390px){
      #homeScreen .hero-info .hero-quick-actions,
      #homeScreen .hero-info > #questHomeTools{
        width:min(100%,282px)!important;
        max-width:282px!important;
      }
      #homeScreen .hero-info .hero-quick-actions .hero-info-button,
      #homeScreen #questHomeTools .quest-home-tool-button{
        font-size:.68rem!important;
        padding:7px 8px!important;
      }
    }
  `;
  document.head.appendChild(style);

  function clearQuestCardReward(){
    document.querySelector('#questCardRewardV311')?.remove();
  }

  function orderQuestTools(){
    const tools=document.querySelector('#questHomeTools');
    if(!tools) return;
    const orderedIds=['openCharmScreen','openTokenShopV200','openHatchery','openBuddyBoxHomeV269'];
    orderedIds.forEach(id=>{
      const el=document.getElementById(id);
      if(el && el.parentElement!==tools) tools.appendChild(el);
    });
    const ordered=orderedIds.map(id=>document.getElementById(id)).filter(Boolean);
    const current=Array.from(tools.children).filter(el=>ordered.includes(el));
    if(ordered.length && ordered.some((el,index)=>current[index]!==el)) {
      ordered.forEach(el=>tools.appendChild(el));
    }
  }

  function apply(){
    clearQuestCardReward();
    orderQuestTools();
  }

  if(window.DuckieLoveInterests?.trigger){
    const oldTrigger=window.DuckieLoveInterests.trigger;
    window.DuckieLoveInterests.trigger=function(){
      clearQuestCardReward();
      return oldTrigger.apply(this,arguments);
    };
  }

  if(typeof showScreen==='function'){
    const oldShowScreen=showScreen;
    showScreen=function(which){
      const result=oldShowScreen.apply(this,arguments);
      if(which==='home') apply();
      return result;
    };
  }


  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>{apply();setTimeout(apply,120);setTimeout(apply,480);},{once:true});
  else {apply();setTimeout(apply,120);setTimeout(apply,480);}  
})();
