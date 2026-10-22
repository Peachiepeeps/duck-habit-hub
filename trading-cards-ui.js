// Trading Cards UI — consolidated for Duckie Days 24.287.

// ===== Source: trading-cards-ui-v250.js =====
(function(){
  "use strict";
  const TC=window.DuckieTradingCards;if(!TC)return;
  let state=TC.ensureState(save);
  let showMissing=false,rarityFilter="all",packRipping=false,packSequence=0,packPointer=null;
  let packSessionTotal=1,packSessionOpened=0,packSessionCurrentOpened=false,packSessionSpecials=0,packSessionGods=0,packSessionResults=[];
  // Each pack in a 10-pack session independently has a 7% Special chance
  // and a 0.5% God chance. One-pack openings retain their original odds.
  const PACK_BONUS={special:.07,god:.005};
  function rollSessionPack(){
    if(packSessionTotal!==10)return {kind:'normal',cards:TC.rollPack()};
    const roll=Math.random();
    if(roll<PACK_BONUS.god){
      const cards=[TC.rollCard('fabled'),TC.rollCard(Math.random()<.17?'fabled':'rare'),TC.rollCard(Math.random()<.17?'fabled':'rare')];
      return {kind:'god',cards:cards.sort(()=>Math.random()-.5)};
    }
    if(roll<PACK_BONUS.god+PACK_BONUS.special){
      const weights={common:.18,uncommon:.50,rare:.28,fabled:.04};
      return {kind:'special',cards:Array.from({length:3},()=>TC.rollCard(TC.rollRarity(weights)))};
    }
    return {kind:'normal',cards:TC.rollPack()};
  }
  let detailCardId=null;
  const progress=document.querySelector(".duckipedia-progress-card"),duckGrid=document.querySelector("#duckipediaGrid"),bottom=document.querySelector(".duckipedia-bottom-counter"),tabs=document.querySelector(".duckipedia-tabs");
  if(!tabs||!duckGrid)return;

  const cardTab=document.createElement("button");cardTab.className="duckipedia-tab";cardTab.type="button";cardTab.dataset.duckFilter="cards";cardTab.setAttribute("role","tab");cardTab.setAttribute("aria-selected","false");cardTab.textContent="Trading Cards";tabs.append(cardTab);
  const allTab=tabs.querySelector('[data-duck-filter="all"]');if(allTab)allTab.textContent="All Ducks";

  const panel=document.createElement("section");panel.className="tc-panel hidden";panel.innerHTML=`
    <div class="tc-pack-bar"><img src="${TC.packAsset("card-pack-unopened.png")}" alt="Card Pack"><div><strong>Unopened Card Packs</strong><div><span id="tcPackCount">0</span> ready to open</div></div><button class="tc-open-pack" id="tcOpenPack" type="button">Open 1</button><button class="tc-open-pack" id="tcOpenTenPacks" type="button">Open 10</button></div>
    <p class="tc-pack-chances">Open 10 together: every pack has a chance to be a ✨ Special Pack or ultra-rare 🌟 God Pack (all Rare/Fabled, guaranteed Fabled)!</p>
    <div class="tc-toolbar"><strong id="tcCollectionCount">0 / ${TC.cards.length} Cards</strong><label>Rarity <select id="tcRarity"><option value="all">All</option><option value="common">Common</option><option value="uncommon">Uncommon</option><option value="rare">Rare</option><option value="fabled">Fabled</option></select></label><label class="tc-toggle"><input id="tcMissing" type="checkbox"> Show Missing</label></div>
    <div id="tcGrid" class="tc-grid"></div>`;
  tabs.insertAdjacentElement("afterend",panel);
  const dustBar=document.createElement('div');dustBar.className='tc-lilguys-dustbar';
  const dustButton=document.createElement('button');dustButton.type='button';
  const dustNote=document.createElement('small');dustNote.textContent='Protects 1 card + 3 extras for Holo, for EVERY variant and shiny.';
  dustBar.append(dustButton,dustNote);panel.querySelector('.tc-toolbar').after(dustBar);
  const HOLO_SAFE_COPIES=4;
  function safeExtraCounts(st,cardId){
    const group=st?.variantOwned?.[cardId];
    if(group && typeof group==='object') return Object.values(group).reduce((sum,n)=>sum+Math.max(0,Math.floor(Number(n)||0)-HOLO_SAFE_COPIES),0);
    // For older saves without variant counters, treat copies as Original.
    return Math.max(0,Math.floor(Number(st?.owned?.[cardId])||0)-HOLO_SAFE_COPIES);
  }
  function dustSummary(){
    const values={common:5,uncommon:12,rare:25,fabled:60};let copies=0,dust=0;
    for(const card of TC.cards){const amount=safeExtraCounts(state,card.id);copies+=amount;dust+=amount*(values[card.rarity]||5);}
    return {copies,dust};
  }
  function refreshDustButton(){const result=dustSummary();dustButton.disabled=result.copies===0;dustButton.textContent=`Convert Duplicates After 3 Extras · ${result.copies} cards → ${result.dust} Dust`;}
  dustButton.addEventListener('click',()=>{
    syncCardState();const check=dustSummary();if(!check.copies)return;
    if(!window.confirm(`Convert ${check.copies} extra cards into ${check.dust} Power Up Dust?\n\nFor each collected variant, KEEP 1 card plus 3 extra copies for Holo (4 total). This cannot be undone.`))return;
    const d=TC.readSave(),cards=TC.cardCraft.ensure(d);let count=0,dust=0;
    for(const card of TC.cards){
      const grouped=cards.variantOwned?.[card.id];
      let removed=0;
      if(grouped && typeof grouped==='object'){
        for(const key of Object.keys(grouped)){
          const old=Math.max(0,Math.floor(Number(grouped[key])||0));
          const take=Math.max(0,old-HOLO_SAFE_COPIES);
          if(take){grouped[key]=old-take;removed+=take;}
        }
      }else{
        const old=Math.max(0,Math.floor(Number(cards.owned?.[card.id])||0));
        removed=Math.max(0,old-HOLO_SAFE_COPIES);
      }
      if(removed){cards.owned[card.id]=Math.max(0,(Number(cards.owned[card.id])||0)-removed);count+=removed;dust+=removed*({common:5,uncommon:12,rare:25,fabled:60}[card.rarity]||5);}
    }
    cards.powerUpDust=Math.max(0,Number(cards.powerUpDust)||0)+dust;
    TC.writeSave(d);save.tradingCards=d.tradingCards;persist();renderCards();
    window.dispatchEvent(new CustomEvent('duckie-card-workshop-updated',{detail:{cardId:null}}));
    if(typeof showToast==='function')showToast(`Converted ${count} extra cards into ${dust} Dust, protecting Holo copies! ♡`);
  });

  const detail=document.createElement("div");detail.className="tc-detail-layer hidden";detail.innerHTML='<section class="tc-detail-card"><button class="tc-detail-close" type="button" aria-label="Close">×</button><div id="tcDetailBody"></div></section>';document.body.append(detail);
  const packLayer=document.createElement("div");packLayer.className="tc-pack-layer hidden";packLayer.innerHTML=`<section class="tc-pack-stage"><p class="tc-pack-kicker">TRADING CARDS</p><h2 class="tc-pack-title">Open a Pack!</h2><div class="tc-pack-rip" role="button" tabindex="0" aria-label="Swipe or click to rip open this Card Pack"><img class="tc-pack-body" src="${TC.packAsset("card-pack-unopened.png")}" alt="Card Pack"><img class="tc-pack-top" src="${TC.packAsset("card-pack-torn-top.png")}" alt=""><span class="tc-swipe-hint" aria-hidden="true">↔</span></div><p class="tc-pack-instruction">Swipe across or click the pack to rip it!</p><div class="tc-reveal-grid" aria-live="polite"></div><button class="tc-pack-close tc-pack-close-bottom hidden" type="button" aria-label="Close Card Pack">Close</button></section>`;document.body.append(packLayer);


  function syncCardState(){
    const latest=TC.readSave();
    const latestState=TC.ensureState(latest);
    if(latestState){
      save.tradingCards=latest.tradingCards;
      state=TC.ensureState(save);
    }else{
      state=TC.ensureState(save);
    }
    return state;
  }
  function isFavorite(id){return state.favorites.includes(id);}
  function toggleFavorite(id){const i=state.favorites.indexOf(id);if(i>=0)state.favorites.splice(i,1);else state.favorites.push(id);persist();renderCards();}
  function sortedCards(){return [...TC.cards].filter(card=>rarityFilter==="all"||card.rarity===rarityFilter).filter(card=>showMissing||Number(state.owned[card.id]||0)>0).sort((a,b)=>TC.order[a.rarity]-TC.order[b.rarity]||Number(isFavorite(b.id))-Number(isFavorite(a.id))||a.number.localeCompare(b.number));}
  function renderCards(){
    syncCardState();const ownedCount=TC.cards.filter(card=>Number(state.owned[card.id]||0)>0).length;
    panel.querySelector("#tcCollectionCount").textContent=`${ownedCount} / ${TC.cards.length} Cards`;refreshDustButton();
    panel.querySelector("#tcPackCount").textContent=state.unopenedPacks;panel.querySelector("#tcOpenPack").disabled=state.unopenedPacks<1;panel.querySelector("#tcOpenTenPacks").disabled=state.unopenedPacks<10;
    const grid=panel.querySelector("#tcGrid");grid.innerHTML="";const list=sortedCards();
    if(!list.length){const empty=document.createElement("div");empty.className="tc-empty";empty.innerHTML=showMissing?"<strong>No cards in this rarity yet.</strong>":"<strong>No cards collected here yet!</strong><br>Try your Starter Pack, Duck Quest, or the Daily Shop. ♡";grid.append(empty);return;}
    list.forEach(card=>{const qty=Math.max(0,Number(state.owned[card.id])||0),locked=qty<1;const entry=document.createElement("article");entry.className="tc-entry";const fav=document.createElement("button");fav.type="button";fav.className=`tc-favorite${isFavorite(card.id)?" active":""}`;fav.textContent="♥";fav.disabled=locked;fav.setAttribute("aria-label",`Favorite ${card.name}`);fav.addEventListener("click",e=>{e.stopPropagation();toggleFavorite(card.id)});const face=TC.createFace(card,{locked});const name=document.createElement("span");name.className="tc-entry-label";name.textContent=locked?`${TC.labels[card.rarity]} · ${card.number}`:card.name;const owned=document.createElement("span");owned.className="tc-owned";owned.textContent=locked?"Missing":`Owned ×${qty}`;entry.append(fav,face,name,owned);entry.addEventListener("click",()=>openDetail(card,locked));grid.append(entry);});
  }
  function openDetail(card,locked){
    syncCardState();
    detailCardId=card.id;
    const body=detail.querySelector("#tcDetailBody");body.innerHTML="";body.append(TC.createFace(card,{locked}));
    const title=document.createElement("h2");title.textContent=locked?"???":card.name;
    const meta=document.createElement("p");const displayRarity=TC.effectiveRarity?.(card,save)||card.rarity;meta.innerHTML=`<strong>${TC.labels[displayRarity]||displayRarity}</strong> · ${card.number}<br>${card.category}`;
    const owned=document.createElement("p");owned.textContent=locked?"Not collected yet":`Owned ×${state.owned[card.id]}`;
    const hint=document.createElement("p");hint.textContent=card.hint;body.append(title,meta,owned,hint);
    const options=TC.variantOptionsWithShiny?.(card)||[];
    if(options.length>1){
      const variants=document.createElement('section');variants.className='tc-lilguys-variants';
      const heading=document.createElement('strong');heading.textContent='Lil Guy Variants';
      const chips=document.createElement('div');chips.className='tc-lilguys-variant-grid';
      const countMap=TC.variantCounts?.(save,card.id)||{};
      const unlocked=TC.cardCraft.craftFor(card.id,save).unlocked;
      for(const item of options){
        const separate=item.linkedCardId;
        const quantity=separate?Math.max(0,Number(state.owned[separate])||0):Math.max(0,Number(countMap[item.id])||0);
        const cosmetic=!separate&&unlocked.includes(item.id);
        const chip=document.createElement('button');chip.type='button';chip.className='tc-lilguys-variant-chip';
        chip.disabled=quantity<1&&!cosmetic;
        const img=document.createElement('img');img.src=TC.cardArt({...card,art:item.art});img.alt='';img.loading='lazy';
        const label=document.createElement('span');label.textContent=item.label;
        const qty=document.createElement('small');qty.textContent=quantity?`×${quantity}`:(cosmetic?'Dust unlocked':'Not found');
        chip.append(img,label,qty);
        chip.addEventListener('click',()=>{if(separate){openDetail(TC.byId[separate],quantity<1);return;}
          const d=TC.readSave(),cs=TC.cardCraft.ensure(d);cs.crafting.displayVariant[card.id]=item.id;
          TC.writeSave(d);save.tradingCards=d.tradingCards;persist();openDetail(card,false);
        });
        chips.append(chip);
      }
      variants.append(heading,chips);body.append(variants);
    }
    if(!locked){
      const actions=document.createElement("div");actions.className="tc-detail-actions-v264";
      const fav=document.createElement("button");fav.className="tc-detail-fav";fav.type="button";fav.textContent=isFavorite(card.id)?"♥ Favorited":"♡ Add to Favorites";fav.addEventListener("click",()=>{toggleFavorite(card.id);openDetail(card,false)});
      const workshop=document.createElement("button");workshop.className="tc-detail-workshop-v264";workshop.type="button";workshop.textContent="Card Workshop";workshop.addEventListener("click",()=>window.DuckieCardWorkshopV264?.open?.(card.id));
      actions.append(fav,workshop);body.append(actions);
    }
    detail.classList.remove("hidden");
  }
  function navigateCardDetail(direction){
    const list=sortedCards();
    if(list.length<2||!detailCardId)return;
    const index=list.findIndex(card=>card.id===detailCardId);
    if(index<0)return;
    const next=list[(index+direction+list.length)%list.length];
    const locked=Math.max(0,Number(state.owned[next.id])||0)<1;
    openDetail(next,locked);
  }
  const detailCard=detail.querySelector(".tc-detail-card");
  let detailTouchStart=null;
  detailCard?.addEventListener("touchstart",event=>{const touch=event.touches?.[0];if(!touch)return;detailTouchStart={x:touch.clientX,y:touch.clientY};},{passive:true});
  detailCard?.addEventListener("touchend",event=>{if(!detailTouchStart)return;const touch=event.changedTouches?.[0];if(!touch){detailTouchStart=null;return;}const dx=touch.clientX-detailTouchStart.x,dy=touch.clientY-detailTouchStart.y;detailTouchStart=null;if(Math.abs(dx)>=52&&Math.abs(dx)>Math.abs(dy)*1.15)navigateCardDetail(dx<0?1:-1);},{passive:true});
  window.addEventListener("duckie-card-workshop-updated",event=>{if(detail.classList.contains("hidden")||!detailCardId)return;if(event.detail?.cardId&&event.detail.cardId!==detailCardId)return;const card=TC.byId[detailCardId];if(card)openDetail(card,Math.max(0,Number(state.owned[card.id])||0)<1);});
  function showCardView(){currentDuckipediaFilter="cards";document.querySelectorAll("[data-duck-filter]").forEach(b=>{const active=b===cardTab;b.classList.toggle("active",active);b.setAttribute("aria-selected",String(active));});progress?.classList.add("hidden");duckGrid.classList.add("hidden");bottom?.classList.add("hidden");panel.classList.remove("hidden");renderCards();}
  function hideCardView(){panel.classList.add("hidden");progress?.classList.remove("hidden");duckGrid.classList.remove("hidden");bottom?.classList.remove("hidden");}
  cardTab.addEventListener("click",showCardView);tabs.querySelectorAll("[data-duck-filter]:not([data-duck-filter=cards])").forEach(button=>button.addEventListener("click",hideCardView));
  panel.querySelector("#tcMissing").addEventListener("change",e=>{showMissing=e.target.checked;renderCards()});panel.querySelector("#tcRarity").addEventListener("change",e=>{rarityFilter=e.target.value;renderCards()});panel.querySelector("#tcOpenPack").addEventListener("click",()=>openPack(1));panel.querySelector("#tcOpenTenPacks").addEventListener("click",()=>openPack(10));
  detail.querySelector(".tc-detail-close").addEventListener("click",()=>detail.classList.add("hidden"));detail.addEventListener("click",e=>{if(e.target===detail)detail.classList.add("hidden")});

  function openPack(amount=1){
    syncCardState();
    if(state.unopenedPacks<amount)return;
    packSessionTotal=amount;packSessionOpened=0;packSessionSpecials=0;packSessionGods=0;packSessionResults=[];
    resetPackStage();
  }
  function resetPackStage(){
    packSequence+=1;packRipping=false;packPointer=null;packSessionCurrentOpened=false;
    const rip=packLayer.querySelector('.tc-pack-rip'),body=rip.querySelector('.tc-pack-body');
    const grid=packLayer.querySelector('.tc-reveal-grid'),note=packLayer.querySelector('.tc-pack-instruction');
    const title=packLayer.querySelector('.tc-pack-title'),close=packLayer.querySelector('.tc-pack-close-bottom');
    packLayer.classList.remove('tc-pack-special','tc-pack-god');
    rip.className='tc-pack-rip ready';rip.style.removeProperty('transform');
    body.src=TC.packAsset('card-pack-unopened.png');grid.innerHTML='';
    title.textContent=packSessionTotal===10?`Pack ${packSessionOpened+1} of 10`:'Open a Pack!';
    note.textContent='Swipe across or click the pack to rip it!';
    close.classList.add('hidden');packLayer.classList.remove('hidden');
    requestAnimationFrame(()=>rip.focus({preventScroll:true}));
  }
  function buildPackCards(results,sequence,kind){
    if(sequence!==packSequence)return;
    const rip=packLayer.querySelector('.tc-pack-rip'),grid=packLayer.querySelector('.tc-reveal-grid');
    const note=packLayer.querySelector('.tc-pack-instruction'),title=packLayer.querySelector('.tc-pack-title');
    const close=packLayer.querySelector('.tc-pack-close-bottom');
    rip.classList.add('cards-ready');
    title.textContent=kind==='god'?'🌟 GOD PACK! 🌟':kind==='special'?'✨ SPECIAL PACK! ✨':'Your Cards!';
    note.textContent='Tap each card to reveal!';
    close.textContent=packSessionTotal===10&&packSessionOpened<10?`Next Pack (${packSessionOpened+1}/10)`:'Finish ♡';
    close.classList.remove('hidden');
    results.forEach((card,index)=>{
      const button=document.createElement('button');button.type='button';button.className='tc-reveal appearing';
      button.style.setProperty('--card-delay',`${index*130}ms`);button.setAttribute('aria-label',`Reveal card ${index+1}`);
      const inner=document.createElement('span');inner.className='tc-reveal-inner';
      const back=document.createElement('img');back.className='tc-reveal-back';back.src=TC.packAsset('card-back.png');back.alt='Face-down card';
      const front=TC.createFace(card);front.classList.add('tc-reveal-front');
      inner.append(back,front);button.append(inner);
      button.addEventListener('click',()=>{
        if(button.classList.contains('revealed'))return;
        button.classList.add('revealed');button.setAttribute('aria-label',`${card.name}, ${TC.labels[card.rarity]}`);
        if([...grid.children].every(el=>el.classList.contains('revealed')))note.textContent='All three cards are yours! ♡';
      });grid.append(button);
    });
  }
  function ripPack(){
    if(packRipping||packSessionCurrentOpened||state.unopenedPacks<packSessionTotal||packLayer.classList.contains('hidden'))return;
    packRipping=true;packSessionCurrentOpened=true;
    const sequence=packSequence;
    // One swipe spends the entire selected batch. Every draw and all thirty
    // cards are saved immediately, even if the reveal screen is closed early.
    packSessionResults=Array.from({length:packSessionTotal},()=>rollSessionPack());
    const draw=packSessionResults[0];
    state.unopenedPacks-=packSessionTotal;
    state.stats.packsOpened+=packSessionTotal;
    packSessionOpened=1;
    packSessionSpecials=packSessionResults.filter(p=>p.kind==='special').length;
    packSessionGods=packSessionResults.filter(p=>p.kind==='god').length;
    for(const pack of packSessionResults){pack.cards=pack.cards.map(card=>{const variantId=TC.pickRandomVariant?.(card)||'default';TC.grantCard(save,card.id,1,{variantId,source:'pack'});return {...card,packVariantId:variantId};});}
    persist();syncCardState();renderCards();
    const rip=packLayer.querySelector('.tc-pack-rip'),body=rip.querySelector('.tc-pack-body');
    const note=packLayer.querySelector('.tc-pack-instruction');
    rip.style.removeProperty('transform');rip.className='tc-pack-rip ripping';
    if(draw.kind!=='normal')packLayer.classList.add(draw.kind==='god'?'tc-pack-god':'tc-pack-special');
    note.textContent=draw.kind==='god'?'🌟 An incredible glow!':draw.kind==='special'?'✨ Something sparkles inside!':'Rrrip!';
    setTimeout(()=>{
      if(sequence!==packSequence)return;
      body.src=TC.packAsset('card-pack-ripped.png');rip.className='tc-pack-rip opened';
      setTimeout(()=>buildPackCards(draw.cards,sequence,draw.kind),720);
    },430);
  }
  function closePack(){
    if(packSessionTotal===10&&packSessionCurrentOpened&&packSessionOpened<10){
      // Preview another already-awarded pack, with no additional inventory spend.
      packSequence++;
      const next=packSessionResults[packSessionOpened];
      packSessionOpened++;
      const rip=packLayer.querySelector('.tc-pack-rip');
      const body=rip.querySelector('.tc-pack-body');
      const grid=packLayer.querySelector('.tc-reveal-grid');
      grid.innerHTML='';
      packLayer.classList.remove('tc-pack-special','tc-pack-god');
      if(next.kind!=='normal')packLayer.classList.add(next.kind==='god'?'tc-pack-god':'tc-pack-special');
      body.src=TC.packAsset('card-pack-ripped.png');
      rip.className='tc-pack-rip opened';
      buildPackCards(next.cards,packSequence,next.kind);
      return;
    }
    const summary=packSessionTotal===10?`Opened ${packSessionOpened} card packs!${packSessionSpecials?` ✨ Special ×${packSessionSpecials}`:''}${packSessionGods?` 🌟 God ×${packSessionGods}`:''}`:'';
    packSequence+=1;packRipping=false;packPointer=null;packLayer.classList.add('hidden');
    const rip=packLayer.querySelector('.tc-pack-rip'),close=packLayer.querySelector('.tc-pack-close-bottom');
    rip.className='tc-pack-rip';rip.style.removeProperty('transform');close.classList.add('hidden');
    syncCardState();renderCards();
    if(summary&&typeof showToast==='function')showToast(summary);
  }
  packLayer.querySelector(".tc-pack-close-bottom").addEventListener("click",closePack);
  const ripTarget=packLayer.querySelector(".tc-pack-rip");
  ripTarget.addEventListener("click",ripPack);
  ripTarget.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();ripPack();}});
  ripTarget.addEventListener("pointerdown",event=>{if(packRipping)return;packPointer={id:event.pointerId,x:event.clientX,y:event.clientY};ripTarget.classList.add("swiping");try{ripTarget.setPointerCapture(event.pointerId)}catch(error){}});
  ripTarget.addEventListener("pointermove",event=>{if(!packPointer||packPointer.id!==event.pointerId||packRipping)return;const dx=Math.max(-90,Math.min(90,event.clientX-packPointer.x));ripTarget.style.transform=`translateX(${dx*.16}px) rotate(${dx*.035}deg)`;});
  ripTarget.addEventListener("pointerup",event=>{if(!packPointer||packPointer.id!==event.pointerId)return;packPointer=null;ripTarget.classList.remove("swiping");ripTarget.style.removeProperty("transform");ripPack();});
  ripTarget.addEventListener("pointercancel",()=>{packPointer=null;ripTarget.classList.remove("swiping");ripTarget.style.removeProperty("transform");});

  document.addEventListener("visibilitychange",()=>{if(!document.hidden&&!panel.classList.contains("hidden"))renderCards();});
  window.addEventListener("focus",()=>{if(!panel.classList.contains("hidden"))renderCards();});
  window.addEventListener("storage",event=>{if(event.key===TC.SAVE_KEY&&!panel.classList.contains("hidden"))renderCards();});

  function dayKey(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;}
  // Read the persisted shop offers every time. The shop and album can hold
  // separate in-memory snapshots; a stale snapshot must never reroll offers.
  function dailyOffers(){
    const day=dayKey();
    const disk=TC.readSave();
    const diskShop=TC.ensureState(disk).dailyShop;
    const valid=d=>d&&d.dayKey===day&&Array.isArray(d.offers)&&d.offers.length===3&&d.offers.every(o=>o&&TC.byId[o.id]);
    const current=TC.ensureState(save).dailyShop;
    let chosen;
    if(valid(diskShop)) chosen=diskShop;
    else if(valid(current)) chosen=current;
    else {
      const first=TC.rollCard('common');
      const second=TC.rollCard(Math.random()<.72?'common':'uncommon');
      const third=TC.rollCard(TC.rollRarity({common:.575,uncommon:.37,rare:.05,fabled:.005}));
      chosen={dayKey:day,offers:[first,second,third].map(card=>({id:card.id,sold:false}))};
    }
    const ours=TC.ensureState(save);
    ours.dailyShop={dayKey:day,offers:chosen.offers.map(o=>({id:o.id,sold:!!o.sold}))};
    state=ours;
    if(!valid(diskShop) || JSON.stringify(diskShop.offers)!==JSON.stringify(ours.dailyShop.offers)){
      persist();
    }
    return ours.dailyShop.offers;
  }
  function renderCardShop(){
    shopCoinCount.textContent=Number(save.coins||0).toLocaleString();document.querySelectorAll("[data-shop-tab]").forEach(b=>{const active=b.dataset.shopTab==="cards";b.classList.toggle("active",active);b.setAttribute("aria-selected",String(active));});shopGrid.innerHTML="";const wrap=document.createElement("div");wrap.className="tc-shop-grid";
    const prices={common:40,uncommon:100,rare:300,fabled:750};dailyOffers().forEach((offer,index)=>{const card=TC.byId[offer.id],price=prices[card.rarity];const item=document.createElement("article");item.className=`tc-shop-card${offer.sold?" sold":""}`;item.append(TC.createFace(card));const name=document.createElement("strong");name.textContent=card.name;const priceLine=document.createElement("span");priceLine.className="tc-shop-price";priceLine.innerHTML=`<img src="assets/ui/pink-coin.webp" alt=""> ${price}`;const buy=document.createElement("button");buy.type="button";buy.className="tc-shop-buy";buy.disabled=offer.sold;buy.textContent=offer.sold?"Sold Today":"Buy Card";buy.addEventListener("click",()=>{if(Number(save.coins||0)<price){showToast(`You need ${price} Pink Coins for this card!`);return;}save.coins-=price;TC.grantCard(save,card.id,1);state.dailyShop.offers[index].sold=true;persist();renderRoom();renderCardShop();showToast(`${card.name} was added to your Trading Cards! ♡`);});item.append(name,priceLine,buy);wrap.append(item);});shopGrid.append(wrap);
  }
  const shopTabs=document.querySelector(".shop-tabs");if(shopTabs){const button=document.createElement("button");button.className="shop-tab";button.type="button";button.dataset.shopTab="cards";button.setAttribute("role","tab");button.textContent="Cards";shopTabs.append(button);button.addEventListener("click",()=>{currentShopTab="cards";renderCardShop()});const oldRenderShop=renderShop;renderShop=function(){if(currentShopTab==="cards")renderCardShop();else oldRenderShop();};}

  const oldMakeGachaPull=makeGachaPull;makeGachaPull=function(options={}){const result=oldMakeGachaPull(options);if(Math.random()<.005){TC.grantPack(save,1);result.cardPackBonus=true;}return result;};
  const oldShowSingle=showSingleGachaResult;showSingleGachaResult=function(result){oldShowSingle(result);document.querySelector("#gachaResultCard .gacha-pack-bonus")?.remove();if(result.cardPackBonus){const bonus=document.createElement("div");bonus.className="gacha-pack-bonus";bonus.textContent="✨ Bonus Card Pack found!";gachaResultClose.before(bonus);}};
  const oldShowTen=showTenPullSummary;showTenPullSummary=function(results){oldShowTen(results);document.querySelector("#gachaSummaryModal .gacha-pack-bonus")?.remove();const count=results.filter(result=>result.cardPackBonus).length;if(count){const bonus=document.createElement("div");bonus.className="gacha-pack-bonus";bonus.textContent=`✨ Bonus Card Pack${count>1?`s ×${count}`:""} found!`;gachaSummaryGrid.after(bonus);}};

  if(!state.starterPackGranted){state.starterPackGranted=true;state.unopenedPacks+=1;persist();setTimeout(()=>showToast("A free Starter Card Pack is waiting in Duckipedia! ♡"),700);}
  window.DUCKIE_TRADING_CARD_UI_BUILD="24.264";
})();
;

// ===== Source: trading-cards-ui-v265.js =====
(function(){
  "use strict";
  const TC=window.DuckieTradingCards;
  if(!TC?.cardCraft) return;

  const DUST_VALUES={common:5,uncommon:12,rare:25,fabled:60};
  const UPGRADE_COSTS={"common:uncommon":40,"uncommon:rare":100};
  const HOLO_DUST=75;
  const HOLO_EXTRAS=3;
  const VARIANT_DUST=20;
  let activeCardId=null;
  let layer=null;

  function dataRef(){
    try{ if(typeof save!=="undefined"&&save&&typeof save==="object") return save; }catch(error){}
    return TC.readSave();
  }
  function commit(data){
    TC.cardCraft.ensure(data);
    try{ if(typeof save!=="undefined"&&data===save&&typeof persist==="function"){persist();return;} }catch(error){}
    TC.writeSave(data);
  }
  function toast(message){
    try{ if(typeof showToast==="function"){showToast(message);return;} }catch(error){}
    console.info(message);
  }
  function dustValue(card){return DUST_VALUES[card?.rarity]||5;}
  function extras(state,cardId){return TC.variantExtras?.(state,cardId)??Math.max(0,Math.floor(Number(state?.owned?.[cardId])||0)-1);}
  function notifyUpdated(cardId){
    ensureDustLine();
    window.dispatchEvent(new CustomEvent("duckie-card-workshop-updated",{detail:{cardId}}));
    window.dispatchEvent(new Event("focus"));
  }
  function ensureDustLine(){
    const info=document.querySelector(".tc-pack-bar > div");
    if(!info)return null;
    let line=info.querySelector(".tc-dust-line-v262");
    if(!line){line=document.createElement("div");line.className="tc-dust-line-v262";line.innerHTML='Power Up Dust <strong id="tcDustCountV262">0</strong>';info.append(line);}
    const state=TC.cardCraft.ensure(dataRef());
    const count=line.querySelector("#tcDustCountV262");
    const next=Number(state.powerUpDust||0).toLocaleString();
    if(count&&count.textContent!==next)count.textContent=next;
    return line;
  }
  function button(label,disabled,onClick,extraClass=""){
    const b=document.createElement("button");b.type="button";b.className=`tc-craft-button-v262 ${extraClass}`.trim();b.textContent=label;b.disabled=Boolean(disabled);if(onClick)b.addEventListener("click",onClick);return b;
  }
  function ensureLayer(){
    if(layer)return layer;
    layer=document.createElement("div");
    layer.className="tc-workshop-layer-v264 hidden";
    layer.innerHTML='<section class="tc-workshop-card-v264" role="dialog" aria-modal="true" aria-label="Card Workshop"><button class="tc-workshop-close-v264" type="button" aria-label="Close Card Workshop">×</button><div id="tcWorkshopBodyV264"></div></section>';
    document.body.append(layer);
    layer.querySelector(".tc-workshop-close-v264")?.addEventListener("click",close);
    layer.addEventListener("click",event=>{if(event.target===layer)close();});
    return layer;
  }
  function close(){if(layer)layer.classList.add("hidden");activeCardId=null;}
  function rerender(cardId,message){if(message)toast(message);notifyUpdated(cardId);render(cardId);}
  function render(cardId){
    const card=TC.byId[cardId];if(!card)return;
    const overlay=ensureLayer(),body=overlay.querySelector("#tcWorkshopBodyV264");
    const data=dataRef(),state=TC.cardCraft.ensure(data),qty=Math.max(0,Math.floor(Number(state.owned?.[card.id])||0));
    if(qty<1){close();return;}
    const craft=TC.cardCraft.craftFor(card.id,data),effective=TC.effectiveRarity(card,data);
    body.innerHTML="";
    const head=document.createElement("div");head.className="tc-workshop-head-v264";
    const preview=TC.createFace(card,{locked:false});preview.classList.add("tc-workshop-preview-v264");
    const copy=document.createElement("div");copy.innerHTML=`<p class="tc-workshop-kicker-v264">CARD WORKSHOP</p><h2>${card.name}</h2><p>${TC.labels[effective]||effective} · Owned ×${qty}</p><p class="tc-workshop-dust-v264">Power Up Dust <strong>${Number(state.powerUpDust||0).toLocaleString()}</strong></p>`;
    head.append(preview,copy);body.append(head);

    const panel=document.createElement("section");panel.className="tc-craft-panel-v262 tc-workshop-sections-v264";

    const duplicate=document.createElement("div");duplicate.className="tc-craft-section-v262";
    const extraCount=extras(state,card.id),per=dustValue(card);
    duplicate.innerHTML=`<div><strong>Extra Copies</strong><small>Your first copy is always protected. Turn extras into Power Up Dust.</small><span class="tc-craft-status-v262">${extraCount} extra · ${per} Dust each</span></div>`;
    const dupActions=document.createElement("div");dupActions.className="tc-craft-actions-v262";
    dupActions.append(
      button(`Convert 1 → ${per} Dust`,extraCount<1,()=>{const d=dataRef(),s=TC.cardCraft.ensure(d);if(extras(s,card.id)<1)return;TC.convertVariantDuplicates(s,card.id,1);s.powerUpDust+=per;commit(d);rerender(card.id,`+${per} Power Up Dust!`);}),
      button(`Convert All → ${extraCount*per} Dust`,extraCount<1,()=>{const d=dataRef(),s=TC.cardCraft.ensure(d),count=extras(s,card.id);if(count<1)return;TC.convertVariantDuplicates(s,card.id,count);s.powerUpDust+=count*per;commit(d);rerender(card.id,`Converted ${count} extras into ${count*per} Power Up Dust!`);},"secondary")
    );duplicate.append(dupActions);panel.append(duplicate);

    const rarity=document.createElement("div");rarity.className="tc-craft-section-v262";
    if(card.rarity==="fabled"){
      rarity.innerHTML='<div><strong>Rarity</strong><small>Fabled is a special rarity and cannot be crafted or upgraded.</small></div><span class="tc-craft-max-v262">FABLED</span>';
    }else{
      const target=effective==="common"?"uncommon":effective==="uncommon"?"rare":null;
      const cost=target?UPGRADE_COSTS[`${effective}:${target}`]:0;
      rarity.innerHTML=`<div><strong>Rarity Upgrade</strong><small>Upgrade this card's display rarity. Pack pull rarity does not change.</small><span class="tc-craft-status-v262">Current: ${TC.labels[effective]}</span></div>`;
      if(target)rarity.append(button(`Upgrade to ${TC.labels[target]} · ${cost} Dust`,state.powerUpDust<cost,()=>{const d=dataRef(),s=TC.cardCraft.ensure(d);if(s.powerUpDust<cost)return;s.powerUpDust-=cost;s.crafting.rarity[card.id]=target;commit(d);rerender(card.id,`${card.name} is now ${TC.labels[target]}!`);}));
      else{const max=document.createElement("span");max.className="tc-craft-max-v262";max.textContent="MAX RARITY";rarity.append(max);}
    }panel.append(rarity);

    const holo=document.createElement("div");holo.className="tc-craft-section-v262";
    if(craft.holo){holo.innerHTML='<div><strong>Holo Finish ✨</strong><small>This card has its permanent Holo finish.</small></div><span class="tc-craft-max-v262">HOLO</span>';}
    else{
      holo.innerHTML=`<div><strong>Holo Finish</strong><small>Uses ${HOLO_EXTRAS} extra copies plus ${HOLO_DUST} Power Up Dust. Your first copy stays protected.</small></div>`;
      const can=extras(state,card.id)>=HOLO_EXTRAS&&state.powerUpDust>=HOLO_DUST;
      holo.append(button(`Apply Holo · ${HOLO_DUST} Dust + ${HOLO_EXTRAS} Extras`,!can,()=>{const d=dataRef(),s=TC.cardCraft.ensure(d);if(extras(s,card.id)<HOLO_EXTRAS||s.powerUpDust<HOLO_DUST)return;TC.convertVariantDuplicates(s,card.id,HOLO_EXTRAS);s.powerUpDust-=HOLO_DUST;s.crafting.holo[card.id]=true;commit(d);rerender(card.id,`${card.name} is now Holo! ✨`);}));
    }panel.append(holo);

    const variants=TC.variantOptions(card);
    if(variants.length>1){
      const variant=document.createElement("div");variant.className="tc-craft-section-v262 tc-variant-section-v262";variant.innerHTML='<div><strong>Color Variant</strong><small>Catch variants in Duck Quest or find them in packs. You can still unlock display colors with Dust.</small></div>';
      const grid=document.createElement("div");grid.className="tc-variant-grid-v262";
      for(const option of variants){
        const unlocked=craft.unlocked.includes(option.id),selected=craft.displayVariant===option.id||(option.id==="default"&&!variants.some(v=>v.id===craft.displayVariant));
        const label=option.id==="default"?option.label:(unlocked?option.label:`${option.label} · ${VARIANT_DUST}`);
        const b=button(label,!unlocked&&state.powerUpDust<VARIANT_DUST,()=>{const d=dataRef(),s=TC.cardCraft.ensure(d),c=s.crafting;if(!Array.isArray(c.variantsUnlocked[card.id]))c.variantsUnlocked[card.id]=["default"];if(!c.variantsUnlocked[card.id].includes(option.id)){if(s.powerUpDust<VARIANT_DUST)return;s.powerUpDust-=VARIANT_DUST;c.variantsUnlocked[card.id].push(option.id);}c.displayVariant[card.id]=option.id;commit(d);rerender(card.id,`${option.label} ${card.name} is now displayed!`);},selected?"selected":"");
        grid.append(b);
      }
      variant.append(grid);panel.append(variant);
    }
    body.append(panel);
  }
  function open(cardId){const card=TC.byId[cardId];if(!card)return;const state=TC.cardCraft.ensure(dataRef());if(Math.max(0,Number(state.owned?.[cardId])||0)<1)return;activeCardId=cardId;ensureLayer().classList.remove("hidden");render(cardId);}

  ensureDustLine();
  window.addEventListener("focus",ensureDustLine);
  window.DuckieCardWorkshopV265={open,close,render:()=>activeCardId&&render(activeCardId)};
  window.DuckieCardWorkshopV264=window.DuckieCardWorkshopV265;
  window.DUCKIE_TRADING_CARD_WORKSHOP_UI="24.265";
})();
;

// ===== Source: trading-cards-ui-v267.js =====
(function(){
  'use strict';
  const GLITTER='assets/ingredients/Sparkle.webp';
  function decorate(){
    document.querySelectorAll('.tc-dust-line-v262,.tc-workshop-dust-v264').forEach(el=>{
      if(el.querySelector('.power-up-dust-inline-icon-v267'))return;
      const img=document.createElement('img');img.className='power-up-dust-inline-icon-v267';img.src=GLITTER;img.alt='';el.prepend(img);
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',decorate,{once:true});else decorate();
  document.addEventListener('click',()=>requestAnimationFrame(decorate),true);
  window.DUCKIE_TRADING_CARD_UI_V267='24.267';
})();
;

// ===== Source: trading-cards-ui-v268.js =====
(function(){
  'use strict';
  const TC=window.DuckieTradingCards;
  if(!TC)return;

  const PACK_PRICE=500;

  function dataRef(){
    try{
      if(typeof save!=='undefined' && save && typeof save==='object') return save;
    }catch(error){}
    return TC.readSave();
  }
  function commit(data){
    TC.ensureState(data);
    try{
      if(typeof save!=='undefined' && data===save && typeof persist==='function'){
        persist();
        return;
      }
    }catch(error){}
    TC.writeSave(data);
  }
  function toast(message){
    try{
      if(typeof showToast==='function'){showToast(message);return;}
    }catch(error){}
    console.info(message);
  }
  function updateVisibleCoins(value){
    document.querySelectorAll('#shopCoinCount,#coinCount').forEach(el=>{
      el.textContent=Math.max(0,Number(value)||0).toLocaleString();
    });
    try{ if(typeof renderRoom==='function')renderRoom(); }catch(error){}
  }
  function buyPack(){
    const data=dataRef();
    const coins=Math.max(0,Number(data.coins)||0);
    if(coins<PACK_PRICE){toast(`You need ${PACK_PRICE} Pink Coins for a Card Pack!`);return;}
    data.coins=coins-PACK_PRICE;
    TC.grantPack(data,1);
    commit(data);
    updateVisibleCoins(data.coins);
    toast('Card Pack added to Duckipedia! ♡');
    enhanceShop();
  }
  function enhanceShop(){
    const grid=document.querySelector('.shop-grid > .tc-shop-grid');
    const cardsTab=document.querySelector('[data-shop-tab="cards"]');
    if(!grid || (cardsTab && !cardsTab.classList.contains('active'))) return;

    const data=dataRef();
    const state=TC.ensureState(data);

    let tile=grid.querySelector('.tc-pack-shop-v268');
    if(!tile){
      tile=document.createElement('article');
      tile.className='tc-shop-card tc-pack-shop-v268';
      grid.append(tile);
    }

    tile.innerHTML='';
    const art=document.createElement('img');
    art.className='tc-pack-shop-art-v268';
    art.src=TC.packAsset('card-pack-unopened.png');
    art.alt='Card Pack';

    const copy=document.createElement('div');
    copy.className='tc-pack-shop-copy-v268';
    copy.innerHTML=`<strong>Card Pack</strong><small>3 cards per pack · ${PACK_PRICE} Pink Coins<br>Unlimited purchases ♡</small>`;

    const buy=document.createElement('button');
    buy.type='button';
    buy.className='tc-shop-buy';
    buy.disabled=Number(data.coins||0)<PACK_PRICE;
    buy.textContent='Buy Pack';
    buy.addEventListener('click',buyPack);

    tile.append(art,copy,buy);
  }

  function scheduleEnhance(){requestAnimationFrame(()=>requestAnimationFrame(enhanceShop));}

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',scheduleEnhance,{once:true});
  }else{
    scheduleEnhance();
  }
  document.addEventListener('click',scheduleEnhance,true);
  window.addEventListener('focus',scheduleEnhance);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)scheduleEnhance();});

  window.DUCKIE_TRADING_CARD_UI_V268='24.268';
})();
;

// ===== Source: trading-cards-ui-v270.js =====
(function(){
  'use strict';
  const TC=window.DuckieTradingCards;
  if(!TC?.cardCraft?.ensure || !TC?.variantOptions) return;

  const VARIANT_DUST=20;
  const GLITTER='assets/ingredients/Sparkle.webp';
  let previewLayer=null;

  function dataRef(){
    try{
      if(typeof save!=='undefined' && save && typeof save==='object') return save;
    }catch(error){}
    return TC.readSave();
  }

  function commit(data){
    TC.cardCraft.ensure(data);
    try{
      if(typeof save!=='undefined' && data===save && typeof persist==='function'){
        persist();
        return;
      }
    }catch(error){}
    TC.writeSave(data);
  }

  function ensurePreview(){
    if(previewLayer) return previewLayer;
    previewLayer=document.createElement('div');
    previewLayer.className='tc-variant-preview-layer-v270 hidden';
    previewLayer.innerHTML='<section class="tc-variant-preview-card-v270" role="dialog" aria-modal="true" aria-label="Color Variant Preview"><button class="tc-variant-preview-close-v270" type="button" aria-label="Close">×</button><div id="tcVariantPreviewBodyV270"></div></section>';
    document.body.append(previewLayer);
    previewLayer.querySelector('.tc-variant-preview-close-v270')?.addEventListener('click',closePreview);
    previewLayer.addEventListener('click',event=>{if(event.target===previewLayer)closePreview();});
    return previewLayer;
  }

  function closePreview(){
    previewLayer?.classList.add('hidden');
  }

  function previewFace(card,option){
    const face=TC.createFace(card,{locked:false});
    const art=face.querySelector('.tc-art');
    if(art && option?.art){
      art.src=TC.cardArt({...card,art:option.art});
    }
    face.classList.add('tc-variant-preview-face-v270');
    return face;
  }

  function currentWorkshopCard(){
    const face=document.querySelector('.tc-workshop-layer-v264:not(.hidden) .tc-workshop-preview-v264[data-card-id]');
    return face?.dataset?.cardId ? TC.byId[face.dataset.cardId] : null;
  }

  function rerenderWorkshopKeepingScroll(scrollTop){
    window.DuckieCardWorkshopV265?.render?.();
    requestAnimationFrame(()=>{
      const scroller=document.querySelector('.tc-workshop-layer-v264:not(.hidden) .tc-workshop-card-v264');
      if(scroller) scroller.scrollTop=scrollTop;
      window.dispatchEvent(new Event('focus'));
      window.dispatchEvent(new CustomEvent('duckie-card-workshop-updated'));
    });
  }

  function openPreview(card,option){
    if(!card || !option) return;
    const data=dataRef();
    const state=TC.cardCraft.ensure(data);
    const craft=TC.cardCraft.craftFor(card.id,data);
    const unlocked=craft.unlocked.includes(option.id);
    const selected=craft.displayVariant===option.id || (option.id==='default' && !TC.variantOptions(card).some(v=>v.id===craft.displayVariant));
    const balance=Math.max(0,Number(state.powerUpDust)||0);

    const overlay=ensurePreview();
    const body=overlay.querySelector('#tcVariantPreviewBodyV270');
    body.innerHTML='';

    const kicker=document.createElement('p');
    kicker.className='tc-variant-preview-kicker-v270';
    kicker.textContent='COLOR VARIANT PREVIEW';

    const title=document.createElement('h3');
    title.textContent=`${option.label} ${card.name}`;

    const face=previewFace(card,option);

    const cost=document.createElement('p');
    cost.className='tc-variant-preview-cost-v270';
    cost.innerHTML=`<img src="${GLITTER}" alt=""> <span>${unlocked?'Unlocked':`${VARIANT_DUST} Power Up Dust`} · You have ${balance.toLocaleString()}</span>`;

    const note=document.createElement('p');
    note.className='tc-variant-preview-note-v270';
    note.textContent=selected
      ? 'This is the variant currently being displayed.'
      : unlocked
        ? 'This variant is already unlocked. Nothing will be spent.'
        : 'Preview only — no Power Up Dust has been spent yet.';

    const action=document.createElement('button');
    action.type='button';
    action.className='tc-variant-preview-upgrade-v270';

    if(selected){
      action.textContent='Selected';
      action.disabled=true;
    }else if(unlocked){
      action.textContent='Use Variant';
    }else{
      action.textContent='Upgrade';
      action.disabled=balance<VARIANT_DUST;
    }

    action.addEventListener('click',()=>{
      if(action.disabled) return;
      const scroller=document.querySelector('.tc-workshop-layer-v264:not(.hidden) .tc-workshop-card-v264');
      const scrollTop=scroller?.scrollTop||0;
      const d=dataRef();
      const s=TC.cardCraft.ensure(d);
      const crafting=s.crafting;
      if(!Array.isArray(crafting.variantsUnlocked[card.id])) crafting.variantsUnlocked[card.id]=['default'];
      const alreadyUnlocked=crafting.variantsUnlocked[card.id].includes(option.id);

      if(!alreadyUnlocked){
        if(Math.max(0,Number(s.powerUpDust)||0)<VARIANT_DUST) return;
        s.powerUpDust-=VARIANT_DUST;
        s.cardDust=s.powerUpDust;
        crafting.variantsUnlocked[card.id].push(option.id);
      }

      crafting.displayVariant[card.id]=option.id;
      commit(d);
      closePreview();
      rerenderWorkshopKeepingScroll(scrollTop);
    });

    body.append(kicker,title,face,cost,note,action);
    overlay.classList.remove('hidden');
  }

  /* The old v24.265 buttons spend Dust immediately in their target listener.
     Capture the click first so the old listener never fires. */
  document.addEventListener('click',event=>{
    const button=event.target.closest('.tc-variant-grid-v262 .tc-craft-button-v262');
    if(!button) return;

    const grid=button.closest('.tc-variant-grid-v262');
    const buttons=[...grid.querySelectorAll('.tc-craft-button-v262')];
    const index=buttons.indexOf(button);
    const card=currentWorkshopCard();
    const option=card ? TC.variantOptions(card)[index] : null;
    if(!card || !option) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openPreview(card,option);
  },true);

  window.DuckieVariantPreviewV270={close:closePreview};
  window.DUCKIE_CARD_VARIANT_PREVIEW_V270='24.270';
})();
;
