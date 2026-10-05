// Duckie Days v24.298 — post-minigame Buddy Pon catch helper
(function(){
  "use strict";
  const VERSION="24.298";

  function safeQty(id){
    try{return Math.max(0,Math.floor(Number(hubInventoryQty(id))||0));}
    catch(error){return Math.max(0,Math.floor(Number(hubSave?.inventory?.[id])||0));}
  }

  function offer({container,enemy,onComplete}){
    if(!container||!enemy||typeof onComplete!=="function") return;
    let attempted=false,done=false,resultText="";
    const section=document.createElement("section");
    section.className="special-catch-v298";
    container.append(section);

    function finish(){if(done)return;done=true;onComplete();}
    function render(){
      section.innerHTML="";
      const title=document.createElement("strong");
      title.textContent=attempted?"Buddy Pon attempt complete!":"Want to befriend it?";
      const copy=document.createElement("small");
      copy.textContent=resultText || (enemy.shiny
        ? "Shiny encounter! Any Buddy Pon is a guaranteed catch."
        : "You may throw one Buddy Pon before continuing your Duck Quest run.");
      section.append(title,copy);

      const choices=document.createElement("div");choices.className="special-catch-choices-v298";
      for(const pon of BUDDY_PONS){
        const qty=safeQty(pon.id),rate=buddyPonCatchRate(pon,enemy);
        const b=document.createElement("button");b.type="button";b.className=`pixel-button ${pon.className||""}`.trim();
        b.disabled=attempted||qty<=0||rate<=0;
        b.innerHTML=`<img src="${pon.image}" alt=""><span><b>${pon.name}</b><small>×${qty} · ${Math.round(rate*100)}% catch</small></span>`;
        b.addEventListener("click",async()=>{
          if(attempted||safeQty(pon.id)<=0)return;
          attempted=true;
          section.querySelectorAll("button").forEach(x=>x.disabled=true);
          if(!consumeHubItem(pon.id,1)){attempted=false;render();return;}
          try{animateBuddyPon(pon);}catch(error){}
          setMessage(`${heroDisplayName()} threw a ${pon.name}!`);
          await sleep(760);
          const success=rate>=1||Math.random()<rate;
          if(success){
            const buddy=captureBuddy(enemy);renderBuddyHomeCount();
            resultText=`Caught! ${enemy.name}${enemy.shiny?" ✨":""} became your Buddy. Owned ×${buddy.quantity}.`;
            setMessage(resultText);
          }else{
            resultText=`Oh no! ${enemy.name}${enemy.shiny?" ✨":""} slipped out of the ${pon.name}.`;
            setMessage(resultText);
          }
          persistAll();render();
        },{once:true});
        choices.append(b);
      }
      section.append(choices);
      const next=document.createElement("button");next.type="button";next.className="pixel-button primary special-catch-continue-v298";
      next.textContent=currentRun?.mode==="endless"?"Next Floor":"Continue";
      next.addEventListener("click",finish,{once:true});section.append(next);
    }
    render();
  }
  window.DuckieSpecialCatchV298={version:VERSION,offer};
})();
