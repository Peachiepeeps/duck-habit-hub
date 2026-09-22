(function(){
  "use strict";
  const TC=window.DuckieTradingCards;if(!TC)return;
  let state=TC.ensureState(save);
  let showMissing=false,rarityFilter="all",packRipping=false,packSequence=0,packPointer=null;
  const progress=document.querySelector(".duckipedia-progress-card"),duckGrid=document.querySelector("#duckipediaGrid"),bottom=document.querySelector(".duckipedia-bottom-counter"),tabs=document.querySelector(".duckipedia-tabs");
  if(!tabs||!duckGrid)return;

  const cardTab=document.createElement("button");cardTab.className="duckipedia-tab";cardTab.type="button";cardTab.dataset.duckFilter="cards";cardTab.setAttribute("role","tab");cardTab.setAttribute("aria-selected","false");cardTab.textContent="Trading Cards";tabs.append(cardTab);
  const allTab=tabs.querySelector('[data-duck-filter="all"]');if(allTab)allTab.textContent="All Ducks";

  const panel=document.createElement("section");panel.className="tc-panel hidden";panel.innerHTML=`
    <div class="tc-pack-bar"><img src="${TC.packAsset("card-pack-unopened.png")}" alt="Card Pack"><div><strong>Unopened Card Packs</strong><div><span id="tcPackCount">0</span> ready to open</div></div><button class="tc-open-pack" id="tcOpenPack" type="button">Open Pack</button></div>
    <div class="tc-toolbar"><strong id="tcCollectionCount">0 / ${TC.cards.length} Cards</strong><label>Rarity <select id="tcRarity"><option value="all">All</option><option value="common">Common</option><option value="uncommon">Uncommon</option><option value="rare">Rare</option><option value="fabled">Fabled</option></select></label><label class="tc-toggle"><input id="tcMissing" type="checkbox"> Show Missing</label></div>
    <div id="tcGrid" class="tc-grid"></div>`;
  tabs.insertAdjacentElement("afterend",panel);

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
  function sortedCards(){return [...TC.cards].filter(card=>rarityFilter==="all"||card.rarity===rarityFilter).filter(card=>showMissing||Number(state.owned[card.id]||0)>0).sort((a,b)=>Number(isFavorite(b.id))-Number(isFavorite(a.id))||TC.order[b.rarity]-TC.order[a.rarity]||a.number.localeCompare(b.number));}
  function renderCards(){
    syncCardState();const ownedCount=TC.cards.filter(card=>Number(state.owned[card.id]||0)>0).length;
    panel.querySelector("#tcCollectionCount").textContent=`${ownedCount} / ${TC.cards.length} Cards`;
    panel.querySelector("#tcPackCount").textContent=state.unopenedPacks;panel.querySelector("#tcOpenPack").disabled=state.unopenedPacks<1;
    const grid=panel.querySelector("#tcGrid");grid.innerHTML="";const list=sortedCards();
    if(!list.length){const empty=document.createElement("div");empty.className="tc-empty";empty.innerHTML=showMissing?"<strong>No cards in this rarity yet.</strong>":"<strong>No cards collected here yet!</strong><br>Try your Starter Pack, Duck Quest, or the Daily Shop. ♡";grid.append(empty);return;}
    list.forEach(card=>{const qty=Math.max(0,Number(state.owned[card.id])||0),locked=qty<1;const entry=document.createElement("article");entry.className="tc-entry";const fav=document.createElement("button");fav.type="button";fav.className=`tc-favorite${isFavorite(card.id)?" active":""}`;fav.textContent="♥";fav.disabled=locked;fav.setAttribute("aria-label",`Favorite ${card.name}`);fav.addEventListener("click",e=>{e.stopPropagation();toggleFavorite(card.id)});const face=TC.createFace(card,{locked});const name=document.createElement("span");name.className="tc-entry-label";name.textContent=locked?`${TC.labels[card.rarity]} · ${card.number}`:card.name;const owned=document.createElement("span");owned.className="tc-owned";owned.textContent=locked?"Missing":`Owned ×${qty}`;entry.append(fav,face,name,owned);entry.addEventListener("click",()=>openDetail(card,locked));grid.append(entry);});
  }
  function openDetail(card,locked){const body=detail.querySelector("#tcDetailBody");body.innerHTML="";body.append(TC.createFace(card,{locked}));const title=document.createElement("h2");title.textContent=locked?"???":card.name;const meta=document.createElement("p");meta.innerHTML=`<strong>${TC.labels[card.rarity]}</strong> · ${card.number}<br>${card.category}`;const owned=document.createElement("p");owned.textContent=locked?"Not collected yet":`Owned ×${state.owned[card.id]}`;const hint=document.createElement("p");hint.textContent=card.hint;body.append(title,meta,owned,hint);if(!locked){const fav=document.createElement("button");fav.className="tc-detail-fav";fav.textContent=isFavorite(card.id)?"♥ Favorited":"♡ Add to Favorites";fav.addEventListener("click",()=>{toggleFavorite(card.id);openDetail(card,false)});body.append(fav);}detail.classList.remove("hidden");}
  function showCardView(){currentDuckipediaFilter="cards";document.querySelectorAll("[data-duck-filter]").forEach(b=>{const active=b===cardTab;b.classList.toggle("active",active);b.setAttribute("aria-selected",String(active));});progress?.classList.add("hidden");duckGrid.classList.add("hidden");bottom?.classList.add("hidden");panel.classList.remove("hidden");renderCards();}
  function hideCardView(){panel.classList.add("hidden");progress?.classList.remove("hidden");duckGrid.classList.remove("hidden");bottom?.classList.remove("hidden");}
  cardTab.addEventListener("click",showCardView);tabs.querySelectorAll("[data-duck-filter]:not([data-duck-filter=cards])").forEach(button=>button.addEventListener("click",hideCardView));
  panel.querySelector("#tcMissing").addEventListener("change",e=>{showMissing=e.target.checked;renderCards()});panel.querySelector("#tcRarity").addEventListener("change",e=>{rarityFilter=e.target.value;renderCards()});panel.querySelector("#tcOpenPack").addEventListener("click",openPack);
  detail.querySelector(".tc-detail-close").addEventListener("click",()=>detail.classList.add("hidden"));detail.addEventListener("click",e=>{if(e.target===detail)detail.classList.add("hidden")});

  function openPack(){
    if(state.unopenedPacks<1)return;
    packSequence+=1;packRipping=false;packPointer=null;
    const rip=packLayer.querySelector(".tc-pack-rip"),body=rip.querySelector(".tc-pack-body"),grid=packLayer.querySelector(".tc-reveal-grid"),note=packLayer.querySelector(".tc-pack-instruction"),title=packLayer.querySelector(".tc-pack-title"),close=packLayer.querySelector(".tc-pack-close-bottom");
    rip.className="tc-pack-rip ready";rip.style.removeProperty("transform");body.src=TC.packAsset("card-pack-unopened.png");grid.innerHTML="";title.textContent="Open a Pack!";note.textContent="Swipe across or click the pack to rip it!";close.classList.add("hidden");packLayer.classList.remove("hidden");
    requestAnimationFrame(()=>rip.focus({preventScroll:true}));
  }
  function buildPackCards(results,sequence){
    if(sequence!==packSequence)return;
    const rip=packLayer.querySelector(".tc-pack-rip"),grid=packLayer.querySelector(".tc-reveal-grid"),note=packLayer.querySelector(".tc-pack-instruction"),title=packLayer.querySelector(".tc-pack-title"),close=packLayer.querySelector(".tc-pack-close-bottom");
    rip.classList.add("cards-ready");title.textContent="Your Cards!";note.textContent="Tap each card to reveal!";close.classList.remove("hidden");
    results.forEach((card,index)=>{const button=document.createElement("button");button.type="button";button.className="tc-reveal appearing";button.style.setProperty("--card-delay",`${index*130}ms`);button.setAttribute("aria-label",`Reveal card ${index+1}`);const inner=document.createElement("span");inner.className="tc-reveal-inner";const back=document.createElement("img");back.className="tc-reveal-back";back.src=TC.packAsset("card-back.png");back.alt="Face-down card";const front=TC.createFace(card);front.classList.add("tc-reveal-front");inner.append(back,front);button.append(inner);button.addEventListener("click",()=>{if(button.classList.contains("revealed"))return;button.classList.add("revealed");button.setAttribute("aria-label",`${card.name}, ${TC.labels[card.rarity]}`);if([...grid.children].every(el=>el.classList.contains("revealed")))note.textContent="All three cards are yours! ♡";});grid.append(button);});
  }
  function ripPack(){
    if(packRipping||state.unopenedPacks<1||packLayer.classList.contains("hidden"))return;
    packRipping=true;const sequence=packSequence;state.unopenedPacks-=1;state.stats.packsOpened+=1;const results=TC.rollPack();results.forEach(card=>TC.grantCard(save,card.id,1));persist();syncCardState();renderCards();
    const rip=packLayer.querySelector(".tc-pack-rip"),body=rip.querySelector(".tc-pack-body"),note=packLayer.querySelector(".tc-pack-instruction");rip.style.removeProperty("transform");rip.className="tc-pack-rip ripping";note.textContent="Rrrip!";
    setTimeout(()=>{if(sequence!==packSequence)return;body.src=TC.packAsset("card-pack-ripped.png");rip.className="tc-pack-rip opened";note.textContent="Pack opened!";setTimeout(()=>buildPackCards(results,sequence),720);},430);
  }
  function closePack(){packSequence+=1;packRipping=false;packPointer=null;packLayer.classList.add("hidden");const rip=packLayer.querySelector(".tc-pack-rip"),close=packLayer.querySelector(".tc-pack-close-bottom");rip.className="tc-pack-rip";rip.style.removeProperty("transform");close.classList.add("hidden");syncCardState();renderCards();}
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
  function dailyOffers(){const daily=state.dailyShop;if(daily.dayKey!==dayKey()||daily.offers.length!==3){const first=TC.rollCard("common"),second=TC.rollCard(Math.random()<.72?"common":"uncommon"),third=TC.rollCard(TC.rollRarity({common:.575,uncommon:.37,rare:.05,fabled:.005}));daily.dayKey=dayKey();daily.offers=[first,second,third].map(card=>({id:card.id,sold:false}));persist();}return daily.offers;}
  function renderCardShop(){
    shopCoinCount.textContent=Number(save.coins||0).toLocaleString();document.querySelectorAll("[data-shop-tab]").forEach(b=>{const active=b.dataset.shopTab==="cards";b.classList.toggle("active",active);b.setAttribute("aria-selected",String(active));});shopGrid.innerHTML="";const wrap=document.createElement("div");wrap.className="tc-shop-grid";
    const prices={common:40,uncommon:100,rare:300,fabled:750};dailyOffers().forEach((offer,index)=>{const card=TC.byId[offer.id],price=prices[card.rarity];const item=document.createElement("article");item.className=`tc-shop-card${offer.sold?" sold":""}`;item.append(TC.createFace(card));const name=document.createElement("strong");name.textContent=card.name;const priceLine=document.createElement("span");priceLine.className="tc-shop-price";priceLine.innerHTML=`<img src="assets/ui/pink-coin.webp" alt=""> ${price}`;const buy=document.createElement("button");buy.type="button";buy.className="tc-shop-buy";buy.disabled=offer.sold;buy.textContent=offer.sold?"Sold Today":"Buy Card";buy.addEventListener("click",()=>{if(Number(save.coins||0)<price){showToast(`You need ${price} Pink Coins for this card!`);return;}save.coins-=price;TC.grantCard(save,card.id,1);state.dailyShop.offers[index].sold=true;persist();renderRoom();renderCardShop();showToast(`${card.name} was added to your Trading Cards! ♡`);});item.append(name,priceLine,buy);wrap.append(item);});shopGrid.append(wrap);
  }
  const shopTabs=document.querySelector(".shop-tabs");if(shopTabs){const button=document.createElement("button");button.className="shop-tab";button.type="button";button.dataset.shopTab="cards";button.setAttribute("role","tab");button.textContent="Cards";shopTabs.append(button);button.addEventListener("click",()=>{currentShopTab="cards";renderCardShop()});const oldRenderShop=renderShop;renderShop=function(){if(currentShopTab==="cards")renderCardShop();else oldRenderShop();};}

  const oldMakeGachaPull=makeGachaPull;makeGachaPull=function(options={}){const result=oldMakeGachaPull(options);if(Math.random()<.005){TC.grantPack(save,1);result.cardPackBonus=true;}return result;};
  const oldShowSingle=showSingleGachaResult;showSingleGachaResult=function(result){oldShowSingle(result);document.querySelector("#gachaResultCard .gacha-pack-bonus")?.remove();if(result.cardPackBonus){const bonus=document.createElement("div");bonus.className="gacha-pack-bonus";bonus.textContent="✨ Bonus Card Pack found!";gachaResultClose.before(bonus);}};
  const oldShowTen=showTenPullSummary;showTenPullSummary=function(results){oldShowTen(results);document.querySelector("#gachaSummaryModal .gacha-pack-bonus")?.remove();const count=results.filter(result=>result.cardPackBonus).length;if(count){const bonus=document.createElement("div");bonus.className="gacha-pack-bonus";bonus.textContent=`✨ Bonus Card Pack${count>1?`s ×${count}`:""} found!`;gachaSummaryGrid.after(bonus);}};

  if(!state.starterPackGranted){state.starterPackGranted=true;state.unopenedPacks+=1;persist();setTimeout(()=>showToast("A free Starter Card Pack is waiting in Duckipedia! ♡"),700);}
  window.DUCKIE_TRADING_CARD_UI_BUILD="24.243";
})();
