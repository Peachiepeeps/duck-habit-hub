// Duckie Days v24.315 — grouped Universal Clothing closet picker
(function(){
  "use strict";
  const VERSION="24.315";
  const MODAL_ID="ucFamilyPickerV315";

  function api(){return window.DuckieUniversalClothingV311||null;}
  function familyList(){return Object.values(api()?.families||{});}
  function copiesFor(family){return api()?.copiesFor?.(family.id)||[];}
  function findCopy(id){return api()?.findCopy?.(id)||null;}
  function loadout(characterId=save.selectedCharacter){return api()?.loadout?.(characterId)||null;}
  function persistAndRefresh(){
    try{persist();}catch(error){}
    try{renderPeep();}catch(error){}
    try{renderClosetOptions();}catch(error){}
  }
  function colorInfo(colorId){
    try{return FURNITURE_COLOR_OPTIONS.find(c=>c.id===colorId)||FURNITURE_COLOR_OPTIONS[0];}
    catch(error){return {id:colorId||"white",label:colorId||"White",swatch:"#fffaf3"};}
  }
  function colorLabel(colorId){return colorInfo(colorId)?.label||"White";}
  function swatchValue(colorId){return colorInfo(colorId)?.swatch||"#fffaf3";}
  function appearanceKey(copy,family){
    if(!family?.regions?.length)return "fixed";
    return family.regions.map(region=>`${region}:${copy?.colors?.[region]||"white"}`).join("|");
  }
  function appearanceGroups(family){
    const map=new Map();
    copiesFor(family).forEach(copy=>{
      const key=appearanceKey(copy,family);
      if(!map.has(key))map.set(key,{key,copies:[],representative:copy});
      map.get(key).copies.push(copy);
    });
    return [...map.values()];
  }
  function summaryFor(copy,family){
    if(!family?.regions?.length)return "Original color";
    if(family.regions.length===1)return colorLabel(copy?.colors?.[family.regions[0]]||"white");
    return family.regions.map(region=>`${region[0].toUpperCase()+region.slice(1)}: ${colorLabel(copy?.colors?.[region]||"white")}`).join(" · ");
  }
  function groupAcceptsFamily(group,family,characterId){
    if(!group||!family)return false;
    if(family.kind==="dress")return group.id==="dress" || (characterId==="miko"&&group.id==="shirt");
    if(family.kind==="outer"){
      if(group.id==="outer")return true;
      return (characterId==="peep"||characterId==="io")&&group.id==="extras";
    }
    if(family.kind==="socks"){
      if(group.id==="socks")return true;
      return (characterId==="miho"||characterId==="annika")&&group.id==="legwear";
    }
    if(family.kind==="extra")return group.id==="extras";
    return false;
  }
  function selectedCopyForFamily(family,characterId=save.selectedCharacter){
    const l=loadout(characterId);if(!l)return null;
    if(family.kind==="dress"){
      const copy=l.dress?findCopy(l.dress):null;
      return copy?.familyId===family.id?copy:null;
    }
    if(family.kind==="outer"){
      const copy=l.outer?findCopy(l.outer):null;
      return copy?.familyId===family.id?copy:null;
    }
    if(family.kind==="extra"){
      for(const id of l.extras||[]){const copy=findCopy(id);if(copy?.familyId===family.id)return copy;}
      return null;
    }
    if(family.kind==="socks"){
      for(const id of Object.keys(l.socks||{})){const copy=findCopy(id);if(copy?.familyId===family.id)return copy;}
    }
    return null;
  }
  function selectedSockSide(family,characterId=save.selectedCharacter){
    const l=loadout(characterId);if(!l)return null;
    for(const [id,side] of Object.entries(l.socks||{})){
      const copy=findCopy(id);if(copy?.familyId===family.id)return side;
    }
    return null;
  }
  function clearSameFamilyExtra(l,family){
    l.extras=(l.extras||[]).filter(id=>findCopy(id)?.familyId!==family.id);
  }
  function clearSameFamilySocks(l,family){
    for(const id of Object.keys(l.socks||{}))if(findCopy(id)?.familyId===family.id)delete l.socks[id];
  }
  function prepareOuter(characterId){
    try{
      const outfit=getCharacterOutfit(characterId);
      if("outer" in outfit)outfit.outer=null;
      if(Array.isArray(outfit.extras)){
        if(characterId==="peep")outfit.extras=outfit.extras.filter(id=>!["jacket","cardigan-white"].includes(id));
        if(characterId==="io")outfit.extras=outfit.extras.filter(id=>id!=="mew-jacket");
      }
    }catch(error){}
  }
  function equipCopy(family,copy,side=null){
    if(!copy)return;
    const characterId=save.selectedCharacter,l=loadout(characterId);if(!l)return;
    if(family.kind==="dress")l.dress=copy.id;
    else if(family.kind==="outer"){l.outer=copy.id;prepareOuter(characterId);}
    else if(family.kind==="extra"){clearSameFamilyExtra(l,family);l.extras.push(copy.id);}
    else if(family.kind==="socks"){clearSameFamilySocks(l,family);l.socks[copy.id]=side||"LR";}
    closePicker();persistAndRefresh();
  }
  function unequipFamily(family){
    const l=loadout(save.selectedCharacter);if(!l)return;
    if(family.kind==="dress" && findCopy(l.dress)?.familyId===family.id)l.dress=null;
    if(family.kind==="outer" && findCopy(l.outer)?.familyId===family.id)l.outer=null;
    if(family.kind==="extra")clearSameFamilyExtra(l,family);
    if(family.kind==="socks")clearSameFamilySocks(l,family);
    closePicker();persistAndRefresh();
  }

  function swatchesFor(copy,family){
    const wrap=document.createElement("div");wrap.className="uc-picker-swatches-v315";
    if(!family.regions?.length){const text=document.createElement("span");text.className="uc-picker-fixed-v315";text.textContent="Original";wrap.append(text);return wrap;}
    family.regions.forEach(region=>{
      const color=copy?.colors?.[region]||"white";
      const chip=document.createElement("span");chip.className="uc-picker-swatch-chip-v315";
      const dot=document.createElement("i");dot.style.background=swatchValue(color);
      const label=document.createElement("span");label.textContent=family.regions.length===1?colorLabel(color):`${region[0].toUpperCase()+region.slice(1)}: ${colorLabel(color)}`;
      chip.append(dot,label);wrap.append(chip);
    });
    return wrap;
  }
  function closePicker(){document.getElementById(MODAL_ID)?.remove();}
  function openPicker(family){
    closePicker();
    const groups=appearanceGroups(family),selected=selectedCopyForFamily(family),selectedSide=selectedSockSide(family);
    const layer=document.createElement("div");layer.id=MODAL_ID;layer.className="uc-family-picker-v315";
    const backdrop=document.createElement("button");backdrop.type="button";backdrop.className="uc-family-picker-backdrop-v315";backdrop.setAttribute("aria-label","Close clothing picker");backdrop.addEventListener("click",closePicker);
    const card=document.createElement("section");card.className="uc-family-picker-card-v315";card.setAttribute("role","dialog");card.setAttribute("aria-modal","true");
    const close=document.createElement("button");close.type="button";close.className="uc-family-picker-close-v315";close.textContent="×";close.setAttribute("aria-label","Close");close.addEventListener("click",closePicker);
    const head=document.createElement("div");head.className="uc-family-picker-head-v315";
    const img=document.createElement("img");img.src=`assets/universal-clothing/${family.preview}`;img.alt="";
    const copy=document.createElement("div");const title=document.createElement("h2");title.textContent=family.name;
    const note=document.createElement("p");note.textContent=groups.length===1?"Choose how to wear this item.":`Choose from ${groups.length} color ${groups.length===1?"option":"options"}. Identical copies are grouped together.`;
    copy.append(title,note);head.append(img,copy);
    const list=document.createElement("div");list.className="uc-family-picker-options-v315";

    groups.forEach((group,index)=>{
      const representative=selected&&group.copies.some(c=>c.id===selected.id)?selected:group.representative;
      const row=document.createElement("article");row.className=`uc-family-picker-option-v315${selected&&group.copies.some(c=>c.id===selected.id)?" selected":""}`;
      const info=document.createElement("div");info.className="uc-family-picker-option-info-v315";
      const optionName=document.createElement("strong");optionName.textContent=family.regions?.length?`Color ${index+1}`:"Original";
      const count=document.createElement("small");count.textContent=group.copies.length>1?`You own ×${group.copies.length}`:"You own ×1";
      info.append(optionName,swatchesFor(representative,family),count);
      const actions=document.createElement("div");actions.className="uc-family-picker-actions-v315";
      if(family.kind==="socks"){
        [["L","Left"],["R","Right"],["LR","Both"]].forEach(([side,label])=>{
          const b=document.createElement("button");b.type="button";b.textContent=label;
          if(selected&&group.copies.some(c=>c.id===selected.id)&&selectedSide===side)b.classList.add("active");
          b.addEventListener("click",()=>equipCopy(family,representative,side));actions.append(b);
        });
      }else{
        const wear=document.createElement("button");wear.type="button";
        const active=selected&&group.copies.some(c=>c.id===selected.id);wear.textContent=active?"Wearing":"Wear";wear.classList.toggle("active",Boolean(active));wear.addEventListener("click",()=>equipCopy(family,representative));actions.append(wear);
      }
      row.append(info,actions);list.append(row);
    });

    if(!groups.length){
      const empty=document.createElement("div");empty.className="uc-family-picker-empty-v315";empty.textContent="You do not own this item yet. Buy it in the Shop or find it as a fashion reward.";list.append(empty);
    }
    const footer=document.createElement("div");footer.className="uc-family-picker-footer-v315";
    if(selected){const off=document.createElement("button");off.type="button";off.className="uc-family-picker-off-v315";off.textContent=family.kind==="socks"?"Take Off Socks":"Unequip";off.addEventListener("click",()=>unequipFamily(family));footer.append(off);}
    const craft=document.createElement("small");craft.textContent=family.regions?.length?"Want a new color? Use Duck Crafter → Clothing and spend Paint on one of your copies.":"This item has a fixed color.";footer.append(craft);
    card.append(close,head,list,footer);layer.append(backdrop,card);document.body.append(layer);
  }

  function makeFamilyCard(family){
    const copies=copiesFor(family),selected=selectedCopyForFamily(family),groups=appearanceGroups(family);
    const button=document.createElement("button");button.type="button";button.className=`uc-family-card-v315${selected?" equipped":""}${copies.length?"":" locked"}`;
    const art=document.createElement("span");art.className="uc-family-card-art-v315";const img=document.createElement("img");img.src=`assets/universal-clothing/${family.preview}`;img.alt="";art.append(img);
    const body=document.createElement("span");body.className="uc-family-card-copy-v315";const name=document.createElement("strong");name.textContent=family.name;
    const meta=document.createElement("small");
    if(!copies.length)meta.textContent="Not owned";
    else if(selected)meta.textContent=`Wearing · ${summaryFor(selected,family)}`;
    else meta.textContent=`Owned ×${copies.length}${groups.length>1?` · ${groups.length} colors`:""}`;
    const hint=document.createElement("span");hint.className="uc-family-card-hint-v315";hint.textContent=copies.length?"Choose color ›":"Locked";
    body.append(name,meta,hint);button.append(art,body);
    button.addEventListener("click",()=>{
      if(!copies.length){try{showToast(`${family.name} can be purchased in the Shop or found as a fashion reward!`);}catch(error){}return;}
      openPicker(family);
    });
    return button;
  }

  function replaceOldUniversalCards(){
    const container=document.querySelector("#closetOptions");if(!container)return;
    container.querySelectorAll(".uc-section-heading-v311,.uc-family-label-v311,.uc-copy-card-v311,.uc-grouped-section-v315").forEach(el=>el.remove());
    if(document.body.classList.contains("sock-fashion-mode-v297"))return;
    const characterId=save.selectedCharacter;
    let groups=[];try{groups=getCharacterCloset(characterId)||[];}catch(error){}
    const group=groups.find(g=>g.id===currentClosetTab)||groups[0];if(!group)return;
    const families=familyList().filter(f=>groupAcceptsFamily(group,f,characterId));if(!families.length)return;
    const section=document.createElement("section");section.className="uc-grouped-section-v315";
    const heading=document.createElement("div");heading.className="uc-grouped-heading-v315";heading.innerHTML="<strong>Universal Clothing</strong><small>One icon per item · tap to choose a color</small>";section.append(heading);
    const grid=document.createElement("div");grid.className="uc-family-grid-v315";families.forEach(family=>grid.append(makeFamilyCard(family)));section.append(grid);container.append(section);
  }

  if(typeof renderClosetOptions==="function"){
    const previous=renderClosetOptions;
    renderClosetOptions=function(){const result=previous.apply(this,arguments);try{replaceOldUniversalCards();}catch(error){console.warn("v24.315 grouped Universal Clothing render skipped:",error);}return result;};
  }
  document.addEventListener("keydown",event=>{if(event.key==="Escape")closePicker();});
  setTimeout(()=>{try{if(!document.querySelector("#closetPanel")?.classList.contains("hidden"))renderClosetOptions();}catch(error){}},0);
  window.DUCKIE_UNIVERSAL_CLOTHING_GROUPED_V315={version:VERSION,openPicker};
})();
