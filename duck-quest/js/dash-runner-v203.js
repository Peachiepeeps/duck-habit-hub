// Duckie Days v24.203 — visible OC driver + Dash tracker + safe coin patterns.
(function(){
  const style=document.createElement('style');
  style.id='duckieDashRunnerV203Style';
  style.textContent=`
    #dashRunner.dash-runner-composite{
      position:absolute;
      width:20%;
      max-width:92px;
      aspect-ratio:1 / 1;
      left:12%;
      bottom:10%;
      z-index:5;
      overflow:visible!important;
      pointer-events:none;
      image-rendering:pixelated;
      transition:filter .12s;
      will-change:transform;
    }
    #dashRunner.dash-runner-composite .dash-runner-driver-layer,
    #dashRunner.dash-runner-composite .dash-runner-cart-layer{
      position:absolute;
      object-fit:contain;
      image-rendering:pixelated;
      pointer-events:none;
      user-select:none;
      -webkit-user-drag:none;
    }
    /* Character rides visibly in front of the duck body, like the supplied mock-up. */
    #dashRunner.dash-runner-composite .dash-runner-driver-layer{
      width:64%;
      height:90%;
      left:2%;
      top:-18%;
      z-index:3;
      object-position:center center;
      filter:drop-shadow(0 1px 0 rgba(0,0,0,.10));
    }
    #dashRunner.dash-runner-composite .dash-runner-cart-layer{
      inset:0;
      width:100%;
      height:100%;
      z-index:2;
      filter:drop-shadow(0 1px 0 rgba(0,0,0,.08));
    }
    #dashRunner.dash-runner-composite.hit{
      filter:brightness(1.12) saturate(1.08);
    }
    #dashTrack .dash-run-tracker-v203{
      position:absolute;
      z-index:9;
      top:9px;
      left:50%;
      transform:translateX(-50%);
      display:flex;
      align-items:center;
      justify-content:center;
      gap:7px;
      width:max-content;
      max-width:90%;
      pointer-events:none;
    }
    #dashTrack .dash-run-tracker-v203.hidden{display:none!important;}
    #dashTrack .dash-run-tracker-v203 span{
      min-width:92px;
      padding:6px 9px;
      border:2px solid rgba(112,82,81,.55);
      border-radius:999px;
      background:rgba(255,250,246,.93);
      box-shadow:0 2px 0 rgba(91,66,68,.12);
      color:#6d555d;
      font-size:.68rem;
      font-weight:800;
      text-align:center;
      white-space:nowrap;
    }
    #dashTrack .dash-run-tracker-v203 strong{color:#9f4d68;}
    @media(max-width:430px){
      #dashTrack .dash-run-tracker-v203{top:7px;gap:5px;}
      #dashTrack .dash-run-tracker-v203 span{min-width:80px;padding:5px 7px;font-size:.62rem;}
    }
  `;
  document.head.appendChild(style);

  function ensureDashRunnerComposite(){
    const track=document.querySelector('#dashTrack');
    if(!track) return null;
    let runner=document.querySelector('#dashRunner');
    if(runner && runner.classList?.contains('dash-runner-composite')) return runner;

    const fresh=document.createElement('div');
    fresh.id='dashRunner';
    fresh.className='dash-runner dash-runner-composite';
    fresh.setAttribute('aria-label','Dash runner');

    const driver=document.createElement('img');
    driver.id='dashRunnerDriver';
    driver.className='dash-runner-driver-layer';
    driver.alt='';

    const cart=document.createElement('img');
    cart.id='dashRunnerCart';
    cart.className='dash-runner-cart-layer';
    cart.alt='';

    fresh.append(driver,cart);
    if(runner){
      if(runner.style?.transform) fresh.style.transform=runner.style.transform;
      runner.replaceWith(fresh);
    }else{
      track.appendChild(fresh);
    }
    return fresh;
  }

  function dashDriverIdleSrc(){
    try{
      const frames=heroIdleFrames?.();
      return Array.isArray(frames)&&frames[0] ? frames[0] : 'assets/characters/peep/base/idle-1.webp';
    }catch(error){
      return 'assets/characters/peep/base/idle-1.webp';
    }
  }

  function dashDriverHurtSrc(){
    try{return heroHurtFrame?.() || dashDriverIdleSrc();}
    catch(error){return dashDriverIdleSrc();}
  }

  function syncDashRunner(opts={}){
    const runner=ensureDashRunnerComposite();
    if(!runner) return null;
    const cartLayer=runner.querySelector('#dashRunnerCart');
    const driverLayer=runner.querySelector('#dashRunnerDriver');
    const cart=selectedCart?.();
    if(opts.hurt) runner.dataset.hurtUntil=String(Date.now()+420);
    const hurt=Number(runner.dataset.hurtUntil||0)>Date.now();
    if(cartLayer && cart?.image) cartLayer.src=cart.image;
    if(driverLayer){
      driverLayer.src=hurt ? dashDriverHurtSrc() : dashDriverIdleSrc();
      driverLayer.onerror=()=>{
        driverLayer.onerror=null;
        driverLayer.src='assets/characters/peep/base/idle-1.webp';
      };
    }
    runner.dataset.cartId=cart?.id||'default';
    runner.dataset.characterId=String(activeCharacterId||'peep');
    return runner;
  }

  function ensureDashTracker(){
    const track=document.querySelector('#dashTrack');
    if(!track) return null;
    let tracker=track.querySelector('#dashRunTrackerV203');
    if(!tracker){
      tracker=document.createElement('div');
      tracker.id='dashRunTrackerV203';
      tracker.className='dash-run-tracker-v203 hidden';
      tracker.innerHTML='<span>Time <strong id="dashTrackTimeV203">30.0</strong>s</span><span>Coins <strong id="dashTrackCoinsV203">0</strong></span>';
      track.appendChild(tracker);
    }
    return tracker;
  }

  function updateDashTracker(){
    const tracker=ensureDashTracker();
    if(!tracker) return;
    tracker.classList.toggle('hidden',!dash.running);
    const time=tracker.querySelector('#dashTrackTimeV203');
    const coins=tracker.querySelector('#dashTrackCoinsV203');
    if(time) time.textContent=Math.max(0,30-dash.elapsed).toFixed(1);
    if(coins) coins.textContent=String(Math.max(0,dash.coins));
  }

  function createDashThing(kind,x,raise){
    const track=dashTrack?.();
    if(!track) return null;
    const cfg=DASH_STAGE?.[questSave?.dash?.selectedStage]||DASH_STAGE.meadow;
    const el=document.createElement('img');
    el.className=`dash-thing ${kind==='obstacle'?'dash-obstacle':kind==='tiny'?'dash-tiny-duck':'dash-coin'}`;
    el.src=kind==='obstacle'?cfg.obstacle:kind==='tiny'?'../assets/ducks/Tiny-duck.webp':'../assets/ui/pink-coin.webp';
    el.alt='';
    track.appendChild(el);
    const obj={kind,x,raise,el,hit:false};
    (kind==='obstacle'?dash.obstacles:dash.pickups).push(obj);
    return obj;
  }

  function pickupTooClose(x,min=52){return dash.pickups.some(o=>Math.abs(o.x-x)<min);}
  function obstacleTooClose(x,min=100){return dash.obstacles.some(o=>Math.abs(o.x-x)<min);}

  const baseDashHud=dashHud;
  dashHud=function(){
    baseDashHud();
    updateDashTracker();
  };

  const baseRefreshFeatureBadges=refreshFeatureBadges;
  refreshFeatureBadges=function(){
    baseRefreshFeatureBadges();
    syncDashRunner();
    updateDashTracker();
  };

  resetDashPreview=function(){
    ensureExpansionSave();
    const cfg=DASH_STAGE[questSave.dash.selectedStage];
    const bg=document.querySelector('#dashBg');
    if(bg) bg.src=cfg.backgrounds[0];
    const runner=syncDashRunner();
    if(runner) runner.style.transform='translateY(0px)';
    dashHud();
  };

  spawnDashThing=function(kind){
    const track=dashTrack?.();
    if(!track) return;
    const spawnX=track.clientWidth+40;
    const groundRaise=4;

    if(kind==='obstacle'){
      let x=spawnX;
      if(obstacleTooClose(x,96)) x+=84;
      if(pickupTooClose(x,52)) x+=48;
      createDashThing('obstacle',x,groundRaise);
      return;
    }

    if(kind==='tiny'){
      let x=spawnX;
      if(obstacleTooClose(x,88)) x+=96;
      if(pickupTooClose(x,46)) x+=38;
      createDashThing('tiny',x,groundRaise);
      return;
    }

    if(kind==='coin'){
      const support=dash.obstacles
        .filter(o=>o.x>track.clientWidth-95&&o.x<track.clientWidth+165)
        .sort((a,b)=>Math.abs(a.x-spawnX)-Math.abs(b.x-spawnX))[0]||null;

      if(support&&Math.random()<0.78){
        const pattern=Math.random()<0.55
          ? [{dx:-10,raise:104},{dx:20,raise:132},{dx:50,raise:104}]
          : [{dx:8,raise:112},{dx:38,raise:142}];
        pattern.forEach(step=>{
          const x=support.x+step.dx;
          if(!pickupTooClose(x,28)) createDashThing('coin',x,step.raise);
        });
        return;
      }

      let x=spawnX+Math.floor(Math.random()*58),tries=0;
      while((obstacleTooClose(x,106)||pickupTooClose(x,58))&&tries<10){x+=42;tries++;}
      const heights=[26,48,72,96,120];
      let raise=heights[Math.floor(Math.random()*heights.length)];
      if(Math.random()<0.35) raise=Math.max(raise,92);
      createDashThing('coin',x,raise);
      if(Math.random()<0.22){
        const bonusX=x+32;
        if(!obstacleTooClose(bonusX,94)&&!pickupTooClose(bonusX,34)) createDashThing('coin',bonusX,Math.min(146,raise+22));
      }
    }
  };

  dashJump=function(){
    if(!dash.running) return;
    if(dash.jumpCount<=0){dash.jumpCount=1;dash.jumpV=585;return;}
    if(dash.jumpCount===1){dash.jumpCount=2;dash.jumpV=Math.min(690,Math.max(390,dash.jumpV)+210);}
  };

  dashFrame=function(ts){
    if(!dash.running) return;
    if(!dash.last) dash.last=ts;
    const dt=Math.min(.04,(ts-dash.last)/1000);
    dash.last=ts;
    dash.elapsed+=dt;
    dash.invuln=Math.max(0,dash.invuln-dt);
    dash.obstacleClock+=dt;
    dash.coinClock+=dt;
    changeDashSegment();
    if(dash.elapsed>=30){finishDash(true);updateDashTracker();return;}
    if(dash.obstacleClock>1.75){dash.obstacleClock=0;spawnDashThing('obstacle');}
    if(dash.coinClock>.9){dash.coinClock=0;spawnDashThing('coin');}

    dash.jumpV-=1360*dt;
    dash.jumpY=Math.max(0,dash.jumpY+dash.jumpV*dt);
    if(dash.jumpY<=0&&dash.jumpV<0){dash.jumpY=0;dash.jumpV=0;dash.jumpCount=0;}

    const runner=syncDashRunner();
    if(runner) runner.style.transform=`translateY(${-dash.jumpY}px)`;
    const track=dashTrack?.();
    if(!track){finishDash(false);updateDashTracker();return;}

    const W=track.clientWidth,H=track.clientHeight;
    const playerX=W*.12,playerW=Math.min(W*.20,92),playerH=playerW*.75;
    const ground=H*.10,playerY=H-ground-playerH-dash.jumpY,speed=W*.43;

    dash.obstacles=dash.obstacles.filter(o=>{
      o.x-=speed*dt;
      o.el.style.left=`${o.x}px`;
      o.el.style.bottom=`${ground+o.raise}px`;
      const ow=Math.min(W*.155,74),oh=ow;
      const hitW=ow*.40,hitH=oh*.23,hitX=o.x+ow*.30,hitY=H-ground-hitH-o.raise-2;
      if(!o.hit&&dash.invuln<=0&&overlap(playerX,playerY,playerW*.70,playerH*.72,hitX,hitY,hitW,hitH)){
        o.hit=true;dash.hearts--;dash.invuln=1.05;
        runner?.classList.add('hit');
        syncDashRunner({hurt:true});
        setTimeout(()=>runner?.classList.remove('hit'),420);
        dashHud();
        if(dash.hearts<=0){finishDash(false);updateDashTracker();return false;}
      }
      if(o.x<-80){o.el.remove();return false;}
      return true;
    });

    dash.pickups=dash.pickups.filter(o=>{
      o.x-=speed*dt;
      o.el.style.left=`${o.x}px`;
      o.el.style.bottom=`${ground+o.raise}px`;
      const iw=o.kind==='tiny'?Math.min(W*.108,48):Math.min(W*.098,42),ih=iw;
      const pickW=iw*.74,pickH=ih*.74,pickX=o.x+iw*.13,pickY=H-ground-pickH-o.raise;
      if(overlap(playerX,playerY,playerW*.72,playerH*.75,pickX,pickY,pickW,pickH)){
        if(o.kind==='tiny'){dash.tiny++;recordTinyDuck();}else dash.coins++;
        o.el.remove();dashHud();return false;
      }
      if(o.x<-60){o.el.remove();return false;}
      return true;
    });

    dashHud();
    dash.raf=requestAnimationFrame(dashFrame);
  };

  const baseFinishDash=finishDash;
  finishDash=function(success){
    const result=baseFinishDash(success);
    updateDashTracker();
    return result;
  };

  const baseShowScreen=showScreen;
  showScreen=function(which){
    baseShowScreen(which);
    if(which==='dash'){
      ensureDashRunnerComposite();
      ensureDashTracker();
      syncDashRunner();
      updateDashTracker();
    }
  };

  ensureDashRunnerComposite();
  ensureDashTracker();
  syncDashRunner();
  updateDashTracker();
})();
