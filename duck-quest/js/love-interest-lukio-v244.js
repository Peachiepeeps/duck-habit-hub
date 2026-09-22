(function(){
  "use strict";

  const SAVE_KEY="duckHabitHubSave_v1";
  const DATA={
    id:"lukio",
    cardId:"r-love-lukio",
    duckId:"lukio-duck",
    chance:.05,
    dialogue:[
      {speaker:"Miko",text:"Lukio! There you are!",pose:"idle"},
      {speaker:"Lukio",text:"Hey babe! What are you doing here?",pose:"idle"},
      {speaker:"Miko",text:"Just finding cute buddies and exploring. Have you seen the others?",pose:"idle"},
      {speaker:"Lukio",text:"Hmm, I’ve seen some here or there. I bet most are home. Wanna head back with me?",pose:"idle"},
      {speaker:"Miko",text:"Yeah! Let’s hold hands!",pose:"idle"},
      {speaker:"Lukio",text:"(Winks) Alright. Then here, I found these.",pose:"wink"},
      {speaker:"Miko",text:"(smug) A gift? For me? You’re too sweet!",pose:"idle"}
    ],
    miko:"assets/characters/miko/base/idle-1.webp",
    mikoSmug:"assets/characters/miko/base/smug.webp",
    idle1:"assets/love-interests/lukio/Lukio-idle-1.png",
    idle2:"assets/love-interests/lukio/Lukio-idle-2.png",
    wink:"assets/love-interests/lukio/Lukio-wink.png",
    heart:"assets/love-interests/lukio/Pixel-heart.png"
  };

  let open=false;
  let bypassNextRoll=false;

  function load(){
    try{return JSON.parse(localStorage.getItem(SAVE_KEY)||"{}");}
    catch(_){return {};}
  }

  function save(data){
    localStorage.setItem(SAVE_KEY,JSON.stringify(data));
  }

  function ensure(data){
    data.loveInterests=data.loveInterests&&typeof data.loveInterests==="object"?data.loveInterests:{};
    data.loveInterests.lukio=data.loveInterests.lukio&&typeof data.loveInterests.lukio==="object"?data.loveInterests.lukio:{};
    data.characterUnlockedItems=data.characterUnlockedItems&&typeof data.characterUnlockedItems==="object"?data.characterUnlockedItems:{};
    if(!Array.isArray(data.characterUnlockedItems.miko))data.characterUnlockedItems.miko=[];
    if(!Array.isArray(data.unlockedDucks))data.unlockedDucks=[];
    data.duckCollectionCounts=data.duckCollectionCounts&&typeof data.duckCollectionCounts==="object"?data.duckCollectionCounts:{};
    return data.loveInterests.lukio;
  }

  function activeCharacterId(){
    const data=load();
    return String(data?.duckQuest?.activeCharacter||data?.selectedCharacter||"").trim().toLowerCase();
  }

  function isMiko(){
    return activeCharacterId()==="miko";
  }

  function unlock(){
    const data=load(),state=ensure(data);
    Object.assign(state,{
      encountered:true,
      spritesUnlocked:true,
      duckUnlocked:true,
      outfitUnlocked:true,
      cardUnlocked:true,
      unlockedAt:Date.now()
    });

    const pieces=["lukio-hair-streak","lukio-hoodie","lukio-shorts","lukio-socks","lukio-booties"];
    for(const id of pieces){
      if(!data.characterUnlockedItems.miko.includes(id))data.characterUnlockedItems.miko.push(id);
    }

    if(!data.unlockedDucks.includes(DATA.duckId))data.unlockedDucks.push(DATA.duckId);
    data.duckCollectionCounts[DATA.duckId]=Math.max(1,Number(data.duckCollectionCounts[DATA.duckId]||0));

    if(window.DuckieTradingCards?.grantCard){
      window.DuckieTradingCards.grantCard(data,DATA.cardId,1);
    }else{
      data.tradingCards=data.tradingCards&&typeof data.tradingCards==="object"?data.tradingCards:{};
      data.tradingCards.owned=data.tradingCards.owned&&typeof data.tradingCards.owned==="object"?data.tradingCards.owned:{};
      data.tradingCards.unseen=Array.isArray(data.tradingCards.unseen)?data.tradingCards.unseen:[];
      const before=Math.max(0,Number(data.tradingCards.owned[DATA.cardId]||0));
      data.tradingCards.owned[DATA.cardId]=before+1;
      if(before===0&&!data.tradingCards.unseen.includes(DATA.cardId)){
        data.tradingCards.unseen.push(DATA.cardId);
      }
    }

    save(data);
    window.dispatchEvent(new CustomEvent("duckie-love-interest-unlocked",{detail:{id:DATA.id}}));
  }

  function layer(){
    let el=document.querySelector(".lukio-love-layer");
    if(el)return el;

    el=document.createElement("div");
    el.className="lukio-love-layer hidden";
    el.innerHTML=`<section class="lukio-love-card" role="dialog" aria-modal="true" aria-label="Lukio encounter">
      <p class="lukio-love-kicker">LOVE INTEREST ENCOUNTER</p>
      <h2>Lukio</h2>
      <div class="lukio-love-stage">
        <img class="lukio-miko" src="${DATA.miko}" alt="Miko">
        <span class="lukio-heart-wrap hidden"><img src="${DATA.heart}" alt=""></span>
        <img class="lukio-sprite" src="${DATA.idle1}" alt="Lukio">
      </div>
      <div class="lukio-love-dialogue">
        <strong class="lukio-speaker"></strong>
        <p class="lukio-line"></p>
      </div>
      <button type="button" class="lukio-next">Next</button>
    </section>`;
    document.body.append(el);
    return el;
  }

  function show(onFinished=null){
    if(open)return false;
    open=true;

    const el=layer();
    const speaker=el.querySelector(".lukio-speaker");
    const line=el.querySelector(".lukio-line");
    const next=el.querySelector(".lukio-next");
    const sprite=el.querySelector(".lukio-sprite");
    const miko=el.querySelector(".lukio-miko");
    const heart=el.querySelector(".lukio-heart-wrap");
    let i=0;

    const render=()=>{
      const d=DATA.dialogue[i];
      speaker.textContent=d.speaker;
      line.textContent=d.text;
      sprite.src=d.pose==="wink"?DATA.wink:(i%2?DATA.idle2:DATA.idle1);
      miko.src=i===DATA.dialogue.length-1?DATA.mikoSmug:DATA.miko;
      next.textContent=i===DATA.dialogue.length-1?"Finish":"Next";
    };

    next.onclick=()=>{
      if(i<DATA.dialogue.length-1){
        i++;
        render();
        return;
      }

      next.disabled=true;
      heart.classList.remove("hidden");
      unlock();

      setTimeout(()=>{
        el.classList.add("hidden");
        heart.classList.add("hidden");
        next.disabled=false;
        open=false;

        if(typeof onFinished==="function"){
          bypassNextRoll=true;
          onFinished();
        }
      },1600);
    };

    render();
    el.classList.remove("hidden");
    return true;
  }

  function maybeBeforeNextEncounter(continueFn){
    if(bypassNextRoll){
      bypassNextRoll=false;
      return false;
    }

    if(open||!isMiko())return false;

    const data=load(),state=ensure(data);
    if(state.encountered)return false;

    // ONE shared 5% love-interest roll per completed Duck Quest encounter.
    // As more of Miko's lovers are added, this remains 5% total; a
    // character is chosen only after this shared roll succeeds.
    if(Math.random()>=DATA.chance)return false;

    return show(continueFn);
  }

  window.DuckieLoveInterests=window.DuckieLoveInterests||{};
  window.DuckieLoveInterests.maybeBeforeNextEncounter=maybeBeforeNextEncounter;
  window.DuckieLoveInterests.activeCharacterId=activeCharacterId;
  window.DuckieLoveInterests.chance=DATA.chance;
  window.triggerLukioEncounter=()=>show();
})();
