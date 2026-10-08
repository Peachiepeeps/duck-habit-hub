// Duckie Days v24.314 — card reward, Sock Gremlin return, and egg selection polish
(function(){
  "use strict";
  const VERSION="24.314";

  // Trading-card faces were being created in Duck Quest without the normal
  // trading-card styles loaded. Add those styles once, then keep the reward
  // card compact and centered in the right side of the battlefield.
  function ensureCardCss(){
    const links=[
      ["dqTradingCardsBaseV314","../trading-cards-base.css?v=24.296"],
      ["dqTradingCardsExtraV314","../trading-cards-extra.css?v=24.296"]
    ];
    links.forEach(([id,href])=>{
      if(document.getElementById(id))return;
      const link=document.createElement("link");link.id=id;link.rel="stylesheet";link.href=href;document.head.append(link);
    });
    if(!document.getElementById("dqCardRewardFixV314")){
      const style=document.createElement("style");style.id="dqCardRewardFixV314";
      style.textContent=`
        #battlefield #questCardRewardV311.quest-card-reward-v311{
          position:absolute!important;z-index:90!important;right:4%!important;top:9%!important;
          width:38%!important;height:76%!important;display:flex!important;align-items:center!important;
          justify-content:center!important;overflow:visible!important;pointer-events:none!important;
          background:transparent!important;border:0!important;
        }
        #battlefield #questCardRewardV311 .quest-card-reward-stack-v311{
          width:100%!important;height:100%!important;display:flex!important;align-items:center!important;
          justify-content:center!important;gap:5px!important;flex-wrap:wrap!important;overflow:visible!important;
        }
        #battlefield #questCardRewardV311 .quest-card-reward-item-v311{
          width:min(25vw,86px)!important;max-width:86px!important;height:auto!important;max-height:90%!important;
          display:block!important;overflow:visible!important;background:transparent!important;border:0!important;
        }
        #battlefield #questCardRewardV311 .quest-card-reward-item-v311>.tc-face{
          position:relative!important;width:100%!important;max-width:86px!important;height:auto!important;
          aspect-ratio:2.5/3.5!important;margin:0!important;transform:none!important;inset:auto!important;
        }
        @media(max-width:600px){
          #battlefield #questCardRewardV311.quest-card-reward-v311{right:3%!important;top:12%!important;width:40%!important;height:70%!important}
          #battlefield #questCardRewardV311 .quest-card-reward-item-v311{width:min(23vw,76px)!important;max-width:76px!important}
          #battlefield #questCardRewardV311 .quest-card-reward-item-v311>.tc-face{max-width:76px!important}
        }
      `;
      document.head.append(style);
    }
  }
  ensureCardCss();

  // After choosing an egg for a nest, return directly to the nest view instead
  // of opening the detail window. This prevents accidental rapid-tap switching.
  document.addEventListener("click",event=>{
    const button=event.target?.closest?.("#eggInventoryGrid button");
    if(!button||button.disabled)return;
    setTimeout(()=>{
      try{window.DuckieHatchApiV178?.closeEggInventory?.();}catch(error){}
      try{window.DuckieHatchApiV178?.closeHatchDetail?.();}catch(error){}
    },0);
  });

  // Cleaner post-minigame catch UI: after a throw, remove the three disabled
  // Buddy Pon buttons and leave only the result + Continue button.
  const catchApi=window.DuckieSpecialCatchV298;
  if(catchApi?.offer){
    catchApi.offer=function({container,enemy,onComplete}){
      if(!container||!enemy||typeof onComplete!=="function")return;
      let attempted=false,done=false,resultText="";
      const section=document.createElement("section");section.className="special-catch-v298 special-catch-v314";container.append(section);
      const safeQty=id=>{try{return Math.max(0,Math.floor(Number(hubInventoryQty(id))||0));}catch(error){return Math.max(0,Math.floor(Number(hubSave?.inventory?.[id])||0));}};
      const finish=()=>{if(done)return;done=true;section.remove();onComplete();};
      function render(){
        section.innerHTML="";
        const title=document.createElement("strong");
        title.textContent=attempted?(resultText.startsWith("Caught!")?"Caught! ♡":"Buddy Pon attempt complete!"):"Want to befriend it?";
        const copy=document.createElement("small");
        copy.textContent=resultText||(enemy.shiny?"Shiny encounter! Any Buddy Pon is a guaranteed catch.":"You may throw one Buddy Pon before continuing your Duck Quest run.");
        section.append(title,copy);
        if(!attempted){
          const choices=document.createElement("div");choices.className="special-catch-choices-v298";
          for(const pon of BUDDY_PONS){
            const qty=safeQty(pon.id),rate=buddyPonCatchRate(pon,enemy);
            const b=document.createElement("button");b.type="button";b.className=`pixel-button ${pon.className||""}`.trim();
            b.disabled=qty<=0||rate<=0;
            b.innerHTML=`<img src="${pon.image}" alt=""><span><b>${pon.name}</b><small>×${qty} · ${Math.round(rate*100)}% catch</small></span>`;
            b.addEventListener("click",async()=>{
              if(attempted||safeQty(pon.id)<=0)return;
              attempted=true;choices.querySelectorAll("button").forEach(x=>x.disabled=true);
              if(!consumeHubItem(pon.id,1)){attempted=false;render();return;}
              try{animateBuddyPon(pon);}catch(error){}
              setMessage(`${heroDisplayName()} threw a ${pon.name}!`);
              await sleep(760);
              const success=rate>=1||Math.random()<rate;
              if(success){
                const buddy=captureBuddy(enemy);renderBuddyHomeCount();
                resultText=`Caught! ${enemy.name}${enemy.shiny?" ✨":""} became your Buddy. Owned ×${buddy.quantity}.`;
              }else resultText=`Oh no! ${enemy.name}${enemy.shiny?" ✨":""} slipped out of the ${pon.name}.`;
              setMessage(resultText);persistAll();render();
            },{once:true});
            choices.append(b);
          }
          section.append(choices);
        }
        const next=document.createElement("button");next.type="button";next.className="pixel-button primary special-catch-continue-v298";
        next.textContent=currentRun?.mode==="endless"?"Next Floor":"Continue";
        next.addEventListener("click",finish,{once:true});section.append(next);
      }
      render();
    };
  }

  // Sock Gremlin return cleanup. Prevent stale scene/catch fragments from a
  // completed fashion encounter surviving into the next encounter.
  function scrubSockGremlinResidue(){
    document.querySelectorAll(".special-catch-v298").forEach(el=>el.remove());
    document.querySelector("#eventChoiceActions")?.classList.remove("sock-gremlin-judge-panel-v297");
    document.querySelector("#battlefield")?.classList.remove("sock-gremlin-scene-v297");
    document.querySelector("#battleUi")?.classList.remove("sock-gremlin-ui-v297");
    document.querySelector("#chestLayer")?.classList.remove("sock-gremlin-return-v297");
    document.querySelector("#chestSprite")?.classList.remove("sock-gremlin-art-v297");
  }
  ["#continueButton","#leaveEndlessButton","#backToQuest"].forEach(sel=>document.querySelector(sel)?.addEventListener("click",()=>setTimeout(scrubSockGremlinResidue,0),true));
  if(typeof startEncounter==="function"){
    const oldStartEncounterV314=startEncounter;
    startEncounter=function(){scrubSockGremlinResidue();return oldStartEncounterV314.apply(this,arguments);};
  }

  window.DUCKIE_QUEST_FIXES_V314={version:VERSION,ensureCardCss,scrubSockGremlinResidue};
})();
