// Duckie Days v24.314 — Universal Clothing closet + Duck Crafter integration
(function(){
  "use strict";
  const VERSION="24.314";

  function uc(){return window.DuckieUniversalClothingV311||null;}
  function inventoryQty(id){
    try{return typeof inventoryQuantity==="function"?Math.max(0,Number(inventoryQuantity(id))||0):Math.max(0,Number(save?.inventory?.[id])||0);}
    catch(error){return Math.max(0,Number(save?.inventory?.[id])||0);}
  }
  function colorLabel(id){
    try{return (FURNITURE_COLOR_OPTIONS||[]).find(x=>x.id===id)?.label||id||"White";}
    catch(error){return id||"White";}
  }
  function copySummary(copy,family){
    if(!family?.regions?.length)return "Fixed color";
    if(family.regions.length===1)return colorLabel(copy?.colors?.main||"white");
    return family.regions.map(region=>`${region[0].toUpperCase()+region.slice(1)}: ${colorLabel(copy?.colors?.[region]||"white")}`).join(" · ");
  }
  function ensureCrafterTab(){
    const panel=document.querySelector("#crafterPanel");
    if(!panel)return null;
    const tabs=panel.querySelector(".crafter-tabs")||panel.querySelector('[role="tablist"]');
    if(!tabs)return null;
    let b=tabs.querySelector('[data-crafter-tab="clothing"]');
    if(!b){
      b=document.createElement("button");
      b.type="button";
      b.className="crafter-tab";
      b.dataset.crafterTab="clothing";
      b.setAttribute("role","tab");
      b.setAttribute("aria-selected","false");
      b.textContent="Clothing";
      b.addEventListener("click",()=>{
        try{currentCrafterTab="clothing";}catch(error){}
        try{closeCraftSheet?.();}catch(error){}
        renderClothingCrafter();
      });
      tabs.append(b);
    }
    return b;
  }
  function renderClothingCrafter(){
    const api=uc(), content=document.querySelector("#crafterContent");
    if(!api||!content)return;
    ensureCrafterTab();
    document.querySelectorAll("[data-crafter-tab]").forEach(button=>{
      const active=button.dataset.crafterTab==="clothing";
      button.classList.toggle("active",active);
      button.setAttribute("aria-selected",String(active));
    });
    content.innerHTML="";
    api.ensureState?.();
    const wrap=document.createElement("div");wrap.className="uc-crafter-v314";
    const intro=document.createElement("section");intro.className="uc-crafter-intro-v314";
    intro.innerHTML="<strong>Customize Clothing</strong><p>Buy a clothing item first, then use your Paint here to recolor that exact copy. Multi-part outfits can paint Main, Secondary, and Accent separately.</p>";
    wrap.append(intro);

    let total=0;
    Object.values(api.families||{}).forEach(family=>{
      const copies=api.copiesFor?.(family.id)||[];
      if(!copies.length)return;
      total+=copies.length;
      const section=document.createElement("section");section.className="uc-crafter-family-v314";
      const head=document.createElement("div");head.className="uc-crafter-family-head-v314";
      head.innerHTML=`<strong>${family.name}</strong><span>Owned ×${copies.length}</span>`;
      const grid=document.createElement("div");grid.className="uc-crafter-grid-v314";
      copies.forEach((copy,index)=>{
        const card=document.createElement("article");card.className="uc-crafter-card-v314";
        const img=document.createElement("img");img.src=`assets/universal-clothing/${family.preview}`;img.alt="";
        const name=document.createElement("strong");name.textContent=`${family.name} #${index+1}`;
        const summary=document.createElement("small");summary.textContent=copySummary(copy,family);
        const b=document.createElement("button");b.type="button";
        if(family.regions?.length){
          b.textContent=family.regions.length>1?"Choose Region + Paint":"Paint This Copy";
          b.addEventListener("click",()=>api.openPaint?.(copy.id));
        }else{
          b.textContent="No Paint Regions";b.disabled=true;
        }
        card.append(img,name,summary,b);grid.append(card);
      });
      section.append(head,grid);wrap.append(section);
    });
    if(!total){
      const empty=document.createElement("div");empty.className="uc-crafter-empty-v314";
      empty.textContent="No Universal Clothing owned yet. Buy an item such as Thigh High Socks or the Maid Outfit in the Shop, then come back here to customize it.";
      wrap.append(empty);
    }
    content.append(wrap);
  }

  const oldRenderCrafter=typeof renderCrafter==="function"?renderCrafter:null;
  if(oldRenderCrafter){
    renderCrafter=function(){
      ensureCrafterTab();
      let clothing=false;try{clothing=currentCrafterTab==="clothing";}catch(error){}
      if(clothing){renderClothingCrafter();return;}
      return oldRenderCrafter.apply(this,arguments);
    };
  }
  const oldOpenCrafter=typeof openCrafter==="function"?openCrafter:null;
  if(oldOpenCrafter){
    openCrafter=function(tab){
      if(tab==="clothing"){
        oldOpenCrafter.call(this,"ducks");
        try{currentCrafterTab="clothing";}catch(error){}
        renderClothingCrafter();
        return;
      }
      return oldOpenCrafter.apply(this,arguments);
    };
  }

  // Re-run after initial DOM setup so the new tab is always present.
  setTimeout(ensureCrafterTab,0);
  setTimeout(ensureCrafterTab,400);

  window.DUCKIE_HUB_FIXES_V314={version:VERSION,renderClothingCrafter};
})();
