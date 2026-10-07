// Duckie Days v24.311 — Universal Clothing system
(function(){
  "use strict";

  const VERSION="24.311";
  const STATE_KEY="universalClothingV311";
  const ASSET_ROOT="assets/universal-clothing/";

  const FAMILIES=Object.freeze({
    "big-hoodie":{
      id:"big-hoodie",itemId:"uclothes-big-hoodie",name:"Big Hoodie",kind:"outer",price:200,
      preview:"previews/big-hoodie.webp",regions:["main"],folder:"big-hoodie",
      description:"Oversized hoodie. Miko and Io automatically use the matching hand layer."
    },
    "big-cardigan":{
      id:"big-cardigan",itemId:"uclothes-big-cardigan",name:"Big Cardigan",kind:"outer",price:200,
      preview:"previews/big-cardigan.webp",regions:["main"],folder:"big-cardigan",
      description:"Oversized cardigan. Miko and Io automatically use the matching hand layer."
    },
    "bow-dress":{
      id:"bow-dress",itemId:"uclothes-bow-dress",name:"Bow Dress",kind:"dress",price:200,
      preview:"previews/bow-dress-large.webp",regions:["main"],folder:"bow-dress-large",
      description:"Universal bow dress. Miko and Io use the small version; Peep, Miho, and Annika use the large version."
    },
    "bunny-outfit":{
      id:"bunny-outfit",itemId:"uclothes-bunny-outfit",name:"Bunny Outfit",kind:"dress",price:225,
      preview:"previews/bunny-outfit.webp",regions:["main","secondary","accent"],folder:"bunny-outfit",
      description:"Dress-style bunny outfit with three separately paintable color regions."
    },
    "maid-outfit":{
      id:"maid-outfit",itemId:"uclothes-maid-outfit",name:"Maid Outfit",kind:"dress",price:225,
      preview:"previews/maid-outfit.webp",regions:["main","secondary","accent"],folder:"maid-outfit",
      description:"Dress-style maid outfit with three separately paintable color regions."
    },
    "big-bow":{
      id:"big-bow",itemId:"uclothes-big-bow",name:"Big Bow",kind:"extra",price:125,
      preview:"previews/big-bow.webp",regions:["main"],folder:"big-bow",
      description:"Large universal hair bow."
    },
    "r-bow":{
      id:"r-bow",itemId:"uclothes-r-bow",name:"R Bow",kind:"extra",price:125,
      preview:"previews/r-bow.webp",regions:["main"],folder:"r-bow",
      description:"Universal side bow."
    },
    "glasses":{
      id:"glasses",itemId:"uclothes-glasses",name:"Glasses",kind:"extra",price:125,
      preview:"previews/glasses.webp",regions:[],folder:"glasses",
      description:"Universal glasses."
    },
    "short-socks":{
      id:"short-socks",itemId:"uclothes-short-socks",name:"Short Socks",kind:"socks",price:150,
      preview:"previews/short-socks.webp",regions:["main"],folder:"short-socks",
      description:"Layerable universal socks. Each owned pair can be worn Left, Right, or Both."
    },
    "knee-socks":{
      id:"knee-socks",itemId:"uclothes-knee-socks",name:"Knee High Socks",kind:"socks",price:150,
      preview:"previews/knee-socks.webp",regions:["main"],folder:"knee-socks",
      description:"Layerable universal knee-high socks. Each pair can be Left, Right, or Both."
    },
    "thigh-socks":{
      id:"thigh-socks",itemId:"uclothes-thigh-socks",name:"Thigh High Socks",kind:"socks",price:150,
      preview:"previews/thigh-socks.webp",regions:["main"],folder:"thigh-socks",
      description:"Layerable universal thigh-high socks. Each pair can be Left, Right, or Both."
    }
  });

  const FAMILY_BY_ITEM=Object.fromEntries(Object.values(FAMILIES).map(f=>[f.itemId,f]));

  function clone(value){
    try{return structuredClone(value);}
    catch(error){return JSON.parse(JSON.stringify(value));}
  }

  function state(){
    if(!save[STATE_KEY] || typeof save[STATE_KEY]!=="object"){
      save[STATE_KEY]={version:VERSION,nextId:1,copies:{},loadouts:{}};
    }
    const s=save[STATE_KEY];
    s.version=VERSION;
    s.nextId=Math.max(1,Number(s.nextId)||1);
    if(!s.copies || typeof s.copies!=="object") s.copies={};
    if(!s.loadouts || typeof s.loadouts!=="object") s.loadouts={};
    return s;
  }

  function defaultColors(family){
    return Object.fromEntries((family.regions||[]).map(region=>[region,"white"]));
  }

  function makeCopy(familyId){
    const family=FAMILIES[familyId];
    if(!family)return null;
    const s=state();
    const copy={
      id:`uc-${familyId}-${s.nextId++}`,
      familyId,
      colors:defaultColors(family),
      createdAt:Date.now()
    };
    return copy;
  }

  function copiesFor(familyId){
    const s=state();
    if(!Array.isArray(s.copies[familyId]))s.copies[familyId]=[];
    return s.copies[familyId];
  }

  function allCopies(){
    return Object.values(FAMILIES).flatMap(f=>copiesFor(f.id));
  }

  function findCopy(copyId){
    return allCopies().find(copy=>copy.id===copyId)||null;
  }

  function emptyLoadout(){
    return {dress:null,outer:null,extras:[],socks:{}};
  }

  function loadout(characterId=save.selectedCharacter){
    const s=state();
    if(!s.loadouts[characterId] || typeof s.loadouts[characterId]!=="object"){
      s.loadouts[characterId]=emptyLoadout();
    }
    const l=s.loadouts[characterId];
    if(!Array.isArray(l.extras))l.extras=[];
    if(!l.socks || typeof l.socks!=="object" || Array.isArray(l.socks))l.socks={};
    if(!("dress" in l))l.dress=null;
    if(!("outer" in l))l.outer=null;
    return l;
  }

  function syncFamilyCopies(familyId){
    const family=FAMILIES[familyId];
    if(!family)return false;
    if(!save.inventory || typeof save.inventory!=="object")save.inventory={};
    const copies=copiesFor(familyId);
    const qty=Math.max(0,Number(save.inventory[family.itemId])||0);
    let changed=false;
    while(copies.length<qty){
      const copy=makeCopy(familyId);
      if(copy){copies.push(copy);changed=true;}else break;
    }
    // Never silently destroy a painted copy. If an old save has copies but its
    // inventory count drifted, restore the quantity to match the real copies.
    if(copies.length>qty){
      save.inventory[family.itemId]=copies.length;
      changed=true;
    }
    return changed;
  }

  function cleanLoadouts(){
    const valid=new Set(allCopies().map(c=>c.id));
    let changed=false;
    for(const characterId of Object.keys(CHARACTERS)){
      const l=loadout(characterId);
      if(l.dress && !valid.has(l.dress)){l.dress=null;changed=true;}
      if(l.outer && !valid.has(l.outer)){l.outer=null;changed=true;}
      const extras=l.extras.filter(id=>valid.has(id));
      if(extras.length!==l.extras.length){l.extras=extras;changed=true;}
      for(const id of Object.keys(l.socks)){
        if(!valid.has(id) || !["L","R","LR"].includes(l.socks[id])){
          delete l.socks[id];changed=true;
        }
      }
    }
    return changed;
  }

  function ensureState(){
    let changed=false;
    for(const family of Object.values(FAMILIES))changed=syncFamilyCopies(family.id)||changed;
    changed=cleanLoadouts()||changed;
    if(changed)try{persist();}catch(error){}
  }

  function familyCopies(familyId){ensureState();return copiesFor(familyId);}

  function copyNumber(copy){
    const list=copiesFor(copy.familyId);
    return Math.max(1,list.findIndex(x=>x.id===copy.id)+1);
  }

  function colorInfo(colorId){
    return FURNITURE_COLOR_OPTIONS.find(c=>c.id===colorId)||FURNITURE_COLOR_OPTIONS[0];
  }

  function copyColorSummary(copy){
    const family=FAMILIES[copy.familyId];
    if(!family?.regions?.length)return "Fixed color";
    if(family.regions.length===1)return colorInfo(copy.colors?.main||"white").label;
    return family.regions.map(region=>{
      const label=region[0].toUpperCase()+region.slice(1);
      return `${label}: ${colorInfo(copy.colors?.[region]||"white").label}`;
    }).join(" · ");
  }

  // ---------- Shop ----------
  function installShopItems(){
    for(const family of Object.values(FAMILIES)){
      ITEMS[family.itemId]={
        name:family.name,
        category:"clothing",
        image:`${ASSET_ROOT}${family.preview}`,
        icon:"♡",
        sellValue:Math.max(15,Math.round(family.price*.20)),
        universalClothingFamily:family.id,
        universalClothing:true
      };
      if(!SHOP_STOCK.clothing.some(entry=>entry.itemId===family.itemId)){
        SHOP_STOCK.clothing.push({itemId:family.itemId,price:family.price});
      }
    }
  }

  installShopItems();

  if(typeof isRepeatBuyShopListing==="function"){
    const previousIsRepeatBuyShopListingV311=isRepeatBuyShopListing;
    isRepeatBuyShopListing=function(listing){
      if(listing?.itemId && FAMILY_BY_ITEM[listing.itemId])return true;
      return previousIsRepeatBuyShopListingV311.apply(this,arguments);
    };
  }

  if(typeof addInventoryItem==="function"){
    const previousAddInventoryItemV311=addInventoryItem;
    addInventoryItem=function(itemId,quantity=1){
      const result=previousAddInventoryItemV311.apply(this,arguments);
      const family=FAMILY_BY_ITEM[itemId];
      if(result && family)syncFamilyCopies(family.id);
      return result;
    };
  }

  // ---------- Paint modal ----------
  let paintCopyId=null;
  let paintRegion="main";

  function closePaintModal(){
    document.querySelector("#universalClothingPaintV311")?.remove();
    paintCopyId=null;
  }

  function paintSwatchStyle(color){
    if(color.id==="rainbow")return color.swatch;
    return color.swatch||"#fff";
  }

  function renderPaintModal(){
    const copy=findCopy(paintCopyId);
    if(!copy){closePaintModal();return;}
    const family=FAMILIES[copy.familyId];
    if(!family?.regions?.length){closePaintModal();return;}
    if(!family.regions.includes(paintRegion))paintRegion=family.regions[0];

    let layer=document.querySelector("#universalClothingPaintV311");
    if(!layer){
      layer=document.createElement("div");
      layer.id="universalClothingPaintV311";
      layer.className="uc-paint-layer-v311";
      layer.innerHTML='<button class="uc-paint-backdrop-v311" type="button" aria-label="Close paint menu"></button><section class="uc-paint-card-v311" role="dialog" aria-modal="true"><button class="uc-paint-close-v311" type="button" aria-label="Close">×</button><h2></h2><p class="uc-paint-copy-v311"></p><div class="uc-paint-regions-v311"></div><div class="uc-paint-colors-v311"></div><small class="uc-paint-note-v311">Painting consumes 1 matching Paint. Returning a region to White is free.</small></section>';
      document.body.append(layer);
      layer.querySelector(".uc-paint-backdrop-v311").addEventListener("click",closePaintModal);
      layer.querySelector(".uc-paint-close-v311").addEventListener("click",closePaintModal);
    }

    layer.querySelector("h2").textContent=`Paint ${family.name}`;
    layer.querySelector(".uc-paint-copy-v311").textContent=`Copy #${copyNumber(copy)} · ${copyColorSummary(copy)}`;

    const regionBox=layer.querySelector(".uc-paint-regions-v311");
    regionBox.innerHTML="";
    family.regions.forEach(region=>{
      const b=document.createElement("button");
      b.type="button";
      b.textContent=region[0].toUpperCase()+region.slice(1);
      b.className=`uc-region-button-v311${paintRegion===region?" active":""}`;
      b.addEventListener("click",()=>{paintRegion=region;renderPaintModal();});
      regionBox.append(b);
    });
    regionBox.classList.toggle("hidden",family.regions.length===1);

    const colorBox=layer.querySelector(".uc-paint-colors-v311");
    colorBox.innerHTML="";
    for(const color of FURNITURE_COLOR_OPTIONS){
      const current=(copy.colors?.[paintRegion]||"white")===color.id;
      const paintId=color.paintItemId;
      const count=paintId?inventoryQuantity(paintId):Infinity;
      const b=document.createElement("button");
      b.type="button";
      b.className=`uc-color-button-v311${current?" active":""}`;
      b.disabled=!current && color.id!=="white" && count<1;
      const sw=document.createElement("span");
      sw.className="uc-color-swatch-v311";
      sw.style.background=paintSwatchStyle(color);
      const label=document.createElement("span");
      label.innerHTML=`<strong>${color.label}</strong><small>${color.id==="white"?"Free reset":current?"Current":`${Math.max(0,count)} paint owned`}</small>`;
      b.append(sw,label);
      b.addEventListener("click",()=>{
        if(current)return;
        if(color.id!=="white"){
          if(!paintId || inventoryQuantity(paintId)<1){
            showToast(`You need ${color.label} Paint first!`);
            return;
          }
          if(!removeInventoryItem(paintId,1)){
            showToast(`You need ${color.label} Paint first!`);
            return;
          }
        }
        copy.colors[paintRegion]=color.id;
        persist();
        renderPeep();
        renderClosetOptions();
        renderPaintModal();
        showToast(`${family.name} ${paintRegion} painted ${color.label}!`);
      });
      colorBox.append(b);
    }
  }

  function openPaintModal(copyId){
    const copy=findCopy(copyId);
    const family=copy&&FAMILIES[copy.familyId];
    if(!family?.regions?.length)return;
    paintCopyId=copyId;
    paintRegion=family.regions[0];
    renderPaintModal();
  }

  // ---------- Closet ----------
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

  function clearUniversalKind(characterId,kind){
    const l=loadout(characterId);
    if(kind==="dress")l.dress=null;
    if(kind==="outer")l.outer=null;
  }

  function prepareUniversalOuter(characterId){
    const outfit=getCharacterOutfit(characterId);
    if("outer" in outfit)outfit.outer=null;
    if(Array.isArray(outfit.extras)){
      if(characterId==="peep")outfit.extras=outfit.extras.filter(id=>!["jacket","cardigan-white"].includes(id));
      if(characterId==="io")outfit.extras=outfit.extras.filter(id=>id!=="mew-jacket");
    }
  }

  function toggleCopy(copy){
    const family=FAMILIES[copy.familyId];
    const characterId=save.selectedCharacter;
    const l=loadout(characterId);

    if(family.kind==="dress"){
      l.dress=l.dress===copy.id?null:copy.id;
    }else if(family.kind==="outer"){
      const next=l.outer===copy.id?null:copy.id;
      l.outer=next;
      if(next)prepareUniversalOuter(characterId);
    }else if(family.kind==="extra"){
      const set=new Set(l.extras);
      set.has(copy.id)?set.delete(copy.id):set.add(copy.id);
      l.extras=[...set];
    }
    persist();
    renderPeep();
    renderClosetOptions();
  }

  function setSockSide(copy,side){
    const l=loadout(save.selectedCharacter);
    if(side==="OFF")delete l.socks[copy.id];
    else l.socks[copy.id]=side;
    persist();
    renderPeep();
    renderClosetOptions();
  }

  function isEquipped(copy){
    const family=FAMILIES[copy.familyId],l=loadout(save.selectedCharacter);
    if(family.kind==="dress")return l.dress===copy.id;
    if(family.kind==="outer")return l.outer===copy.id;
    if(family.kind==="extra")return l.extras.includes(copy.id);
    if(family.kind==="socks")return Boolean(l.socks[copy.id]);
    return false;
  }

  function makeCopyCard(copy){
    const family=FAMILIES[copy.familyId];
    const card=document.createElement("article");
    card.className=`uc-copy-card-v311${isEquipped(copy)?" equipped":""}`;

    const preview=document.createElement("div");
    preview.className="uc-copy-preview-v311";
    const img=document.createElement("img");
    img.src=`${ASSET_ROOT}${family.preview}`;
    img.alt="";
    preview.append(img);

    const info=document.createElement("div");
    info.className="uc-copy-info-v311";
    const title=document.createElement("strong");
    title.textContent=`${family.name} #${copyNumber(copy)}`;
    const summary=document.createElement("small");
    summary.textContent=copyColorSummary(copy);
    info.append(title,summary);

    const actions=document.createElement("div");
    actions.className="uc-copy-actions-v311";

    if(family.kind==="socks"){
      const current=loadout(save.selectedCharacter).socks[copy.id]||"OFF";
      ["OFF","L","R","LR"].forEach(side=>{
        const b=document.createElement("button");
        b.type="button";
        b.textContent=side==="OFF"?"Off":side;
        b.className=`uc-side-button-v311${current===side?" active":""}`;
        b.addEventListener("click",()=>setSockSide(copy,side));
        actions.append(b);
      });
    }else{
      const equip=document.createElement("button");
      equip.type="button";
      equip.className="uc-equip-button-v311";
      equip.textContent=isEquipped(copy)?"Unequip":"Equip";
      equip.addEventListener("click",()=>toggleCopy(copy));
      actions.append(equip);
    }

    if(family.regions.length){
      const paint=document.createElement("button");
      paint.type="button";
      paint.className="uc-paint-button-v311";
      paint.textContent="Paint";
      paint.addEventListener("click",()=>openPaintModal(copy.id));
      actions.append(paint);
    }

    card.append(preview,info,actions);
    return card;
  }

  function makeLockedFamilyCard(family){
    const card=document.createElement("article");
    card.className="uc-copy-card-v311 locked";
    const preview=document.createElement("div");
    preview.className="uc-copy-preview-v311";
    const img=document.createElement("img");
    img.src=`${ASSET_ROOT}${family.preview}`;
    img.alt="";
    preview.append(img);
    const info=document.createElement("div");
    info.className="uc-copy-info-v311";
    const title=document.createElement("strong");title.textContent=family.name;
    const summary=document.createElement("small");summary.textContent="Not owned · Buy in Shop or find as a fashion reward";
    info.append(title,summary);
    const action=document.createElement("button");
    action.type="button";action.className="uc-equip-button-v311";action.textContent="Locked";
    action.addEventListener("click",()=>showToast(`${family.name} can be purchased in the Shop or found as a fashion encounter reward!`));
    card.append(preview,info,action);
    return card;
  }

  function appendUniversalOptions(group){
    if(document.body.classList.contains("sock-fashion-mode-v297"))return;
    const characterId=save.selectedCharacter;
    const families=Object.values(FAMILIES).filter(f=>groupAcceptsFamily(group,f,characterId));
    if(!families.length)return;

    const heading=document.createElement("div");
    heading.className="uc-section-heading-v311";
    heading.innerHTML="<strong>Universal Clothing</strong><small>Buy duplicates · Paint each copy separately</small>";
    closetOptions.append(heading);

    for(const family of families){
      const sub=document.createElement("p");
      sub.className="uc-family-label-v311";
      sub.textContent=family.name;
      closetOptions.append(sub);
      const copies=familyCopies(family.id);
      if(!copies.length){
        closetOptions.append(makeLockedFamilyCard(family));
        continue;
      }
      copies.forEach(copy=>closetOptions.append(makeCopyCard(copy)));
    }
  }

  if(typeof renderClosetOptions==="function"){
    const previousRenderClosetOptionsV311=renderClosetOptions;
    renderClosetOptions=function(){
      const result=previousRenderClosetOptionsV311.apply(this,arguments);
      try{
        const groups=getCharacterCloset(save.selectedCharacter);
        const group=groups.find(g=>g.id===currentClosetTab)||groups[0];
        appendUniversalOptions(group);
      }catch(error){
        console.warn("Universal Clothing closet render skipped:",error);
      }
      return result;
    };
  }

  // Picking a regular main garment or regular outerwear exits the equivalent
  // Universal Clothing slot. Socks deliberately do NOT clear one another.
  if(typeof chooseSingle==="function"){
    const previousChooseSingleV311=chooseSingle;
    chooseSingle=function(group,id){
      if(id){
        if(["dress","top","bottom","shirt"].includes(group?.id))clearUniversalKind(save.selectedCharacter,"dress");
        if(group?.id==="outer")clearUniversalKind(save.selectedCharacter,"outer");
      }
      return previousChooseSingleV311.apply(this,arguments);
    };
  }

  // ---------- Character rendering ----------
  function assetPath(path){return `../../${ASSET_ROOT}${path}`;}

  function coloredLayer(folder,region,color,unique){
    return {id:`uc-${unique}-${region}-${color}`,file:assetPath(`${folder}/${region}-${color}.webp`),z:30};
  }
  function outlineLayer(folder,name,unique){
    return {id:`uc-${unique}-${name}`,file:assetPath(`${folder}/${name}.webp`),z:31};
  }

  function layersForCopy(copy,characterId,side=null){
    const family=FAMILIES[copy.familyId];
    if(!family)return[];
    const unique=copy.id.replace(/[^a-z0-9-]/gi,"");
    const colors=copy.colors||defaultColors(family);

    if(family.id==="glasses"){
      return [{id:`uc-${unique}-glasses`,file:assetPath("glasses/glasses.webp"),z:55}];
    }

    if(family.kind==="socks"){
      const result=[];
      const useLeft=side==="L"||side==="LR";
      const useRight=side==="R"||side==="LR";
      const color=colors.main||"white";
      if(useLeft){
        result.push(coloredLayer(family.folder,"left",color,unique));
        result.push(outlineLayer(family.folder,"left-outline",unique));
      }
      if(useRight){
        result.push(coloredLayer(family.folder,"right",color,unique));
        result.push(outlineLayer(family.folder,"right-outline",unique));
      }
      return result;
    }

    let folder=family.folder;
    if(family.id==="bow-dress")folder=(characterId==="miko"||characterId==="io")?"bow-dress-small":"bow-dress-large";

    const result=[];
    for(const region of family.regions){
      result.push(coloredLayer(folder,region,colors[region]||"white",unique));
    }
    result.push(outlineLayer(folder,"outline",unique));
    return result;
  }

  function isExpressionOrFront(asset){
    return /^expression-/.test(asset.id)||asset.id==="bangs"||/hairpin|crown|halo|sunglasses|cheek|bow$/i.test(asset.id);
  }

  function insertBeforeFirst(list,layers,predicate){
    if(!layers.length)return list;
    let index=list.findIndex(predicate);
    if(index<0)index=list.length;
    list.splice(index,0,...layers);
    return list;
  }

  function removeBaseMainGarments(list,characterId){
    const outfit=getCharacterOutfit(characterId);
    const remove=new Set();
    if(characterId==="peep"){
      [outfit.top,outfit.bottom,outfit.dress].filter(Boolean).forEach(id=>remove.add(id));
    }else if(characterId==="miko"){
      [outfit.shirt,outfit.bottom].filter(Boolean).forEach(id=>remove.add(id));
      if(outfit.shirt==="top-button")remove.add("top-button-sleeve");
    }else if(characterId==="io"){
      [outfit.top,outfit.bottom,outfit.dress].filter(Boolean).forEach(id=>remove.add(id));
    }else if(characterId==="miho"){
      [outfit.top,outfit.bottom,outfit.dress].filter(Boolean).forEach(id=>remove.add(id));
    }else if(characterId==="annika"){
      [outfit.bottom,outfit.dress,...(Array.isArray(outfit.shirts)?outfit.shirts:[])].filter(Boolean).forEach(id=>remove.add(id));
    }
    return list.filter(asset=>!remove.has(asset.id));
  }

  function isShoeAsset(id){
    return /shoe|boot|loafer|sneaker/i.test(String(id||""));
  }

  if(typeof getRenderOrderedAssets==="function"){
    const previousGetRenderOrderedAssetsV311=getRenderOrderedAssets;
    getRenderOrderedAssets=function(characterId=save.selectedCharacter){
      ensureState();
      let list=previousGetRenderOrderedAssetsV311.apply(this,arguments).slice();
      const l=loadout(characterId);

      const dressCopy=l.dress?findCopy(l.dress):null;
      const outerCopy=l.outer?findCopy(l.outer):null;
      if(dressCopy)list=removeBaseMainGarments(list,characterId);

      // Miko's original raised left arm is replaced by the supplied hand when
      // wearing either Universal oversized layer.
      if(outerCopy && characterId==="miko"){
        list=list.filter(asset=>asset.id!=="arm-base");
      }

      const socks=[];
      for(const family of Object.values(FAMILIES).filter(f=>f.kind==="socks")){
        for(const copy of familyCopies(family.id)){
          const side=l.socks[copy.id];
          if(side)socks.push(...layersForCopy(copy,characterId,side));
        }
      }
      insertBeforeFirst(list,socks,asset=>isShoeAsset(asset.id)||/bottom|dress|top-|shirt|outer|jacket|sweater|cardigan/i.test(asset.id));

      if(dressCopy){
        const dressLayers=layersForCopy(dressCopy,characterId);
        insertBeforeFirst(list,dressLayers,asset=>isShoeAsset(asset.id)||/outer|jacket|sweater|cardigan|hoodie/i.test(asset.id)||isExpressionOrFront(asset));
      }

      if(outerCopy){
        const outerLayers=[];
        if(characterId==="miko"||characterId==="io"){
          outerLayers.push({id:`uc-${outerCopy.id}-hand`,file:assetPath("shared/io-miko-hand.webp"),z:34});
        }
        outerLayers.push(...layersForCopy(outerCopy,characterId));
        insertBeforeFirst(list,outerLayers,asset=>isExpressionOrFront(asset));
      }

      const extraLayers=[];
      for(const copyId of l.extras){
        const copy=findCopy(copyId);
        if(copy)extraLayers.push(...layersForCopy(copy,characterId));
      }
      insertBeforeFirst(list,extraLayers,asset=>asset.id==="bangs");

      return list;
    };
  }

  ensureState();

  window.DuckieUniversalClothingV311={
    version:VERSION,
    families:FAMILIES,
    itemIds:Object.values(FAMILIES).map(f=>f.itemId),
    state,
    copiesFor:familyCopies,
    findCopy,
    loadout,
    openPaint:openPaintModal,
    ensureState
  };
})();
