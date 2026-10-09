// Duckie Days v24.317 — Io school -> magical girl stage transformation
(function(){
  "use strict";
  const VERSION="24.317";

  if(typeof heroIdleFrames!=="function" || typeof startEncounter!=="function" || typeof endRun!=="function") return;

  const SCHOOL=[
    "assets/characters/io/school/idle-1.png",
    "assets/characters/io/school/idle-2.png"
  ];
  const TRANSFORM=[
    "assets/characters/io/school/transform-1.png",
    "assets/characters/io/school/transform-2.png",
    "assets/characters/io/school/transform-3.png"
  ];
  const MAGICAL=[
    "assets/characters/io/base/idle-1.webp",
    "assets/characters/io/base/idle-2.webp"
  ];

  const previousHeroIdleFramesV317=heroIdleFrames;
  const previousHeroHurtFrameV317=typeof heroHurtFrame==="function"?heroHurtFrame:null;
  const previousQuestCharacterIconPreviewSrcV317=typeof questCharacterIconPreviewSrc==="function"?questCharacterIconPreviewSrc:null;
  const previousStartEncounterV317=startEncounter;
  const previousEndRunV317=endRun;

  let transformToken=0;
  let transformBackRunning=false;

  function isIo(){ return typeof activeCharacterId!=="undefined" && activeCharacterId==="io"; }
  function isNormalIoRun(){ return isIo() && currentRun?.mode==="normal"; }
  function isIoMagical(){
    if(!isIo()) return false;
    if(currentRun?.mode==="endless") return true;
    return Boolean(currentRun?.ioTransformedV317);
  }
  function wait(ms){ return new Promise(resolve=>setTimeout(resolve,ms)); }

  function setIoFrame(src){
    if(!src || !isIo()) return;
    try{ renderHeroComposite?.(ui?.battleHeroComposite,src); }
    catch(error){ try{ setHeroFrame?.(src); }catch(innerError){} }
  }

  function setIoSchoolOutsideBattle(){
    if(!isIo()) return;
    try{ renderHeroComposite?.(ui?.menuHeroComposite,SCHOOL[0]); }catch(error){}
    try{ renderHeroComposite?.(ui?.resultHeroComposite,SCHOOL[0]); }catch(error){}
  }

  function stopIoIdle(){
    try{
      clearInterval(peepIdleTimer);
      peepIdleTimer=null;
    }catch(error){}
  }

  heroIdleFrames=function(){
    if(!isIo()) return previousHeroIdleFramesV317.apply(this,arguments);
    return isIoMagical()?MAGICAL:SCHOOL;
  };

  if(previousHeroHurtFrameV317){
    heroHurtFrame=function(){
      if(!isIo()) return previousHeroHurtFrameV317.apply(this,arguments);
      return isIoMagical()?MAGICAL[0]:SCHOOL[0];
    };
  }

  if(previousQuestCharacterIconPreviewSrcV317){
    questCharacterIconPreviewSrc=function(characterId){
      if(characterId==="io") return SCHOOL[0];
      return previousQuestCharacterIconPreviewSrcV317.apply(this,arguments);
    };
  }

  async function playTransformInV317(){
    if(!isNormalIoRun() || currentRun.ioTransformedV317) return;
    const token=++transformToken;
    const commandWasHidden=Boolean(ui?.commandGrid?.classList.contains("hidden"));
    const priorMessage=String(ui?.battleMessage?.textContent||"");

    stopIoIdle();
    actionLocked=true;
    ui?.battlefield?.classList.add("io-transforming-v317");
    ui?.commandGrid?.classList.add("hidden");
    try{ closeCommandWindow?.(); }catch(error){}
    try{ setMessage?.("Io transforms! ✨"); }catch(error){}

    setIoFrame(SCHOOL[0]);
    await wait(110);
    for(const [index,frame] of TRANSFORM.entries()){
      if(token!==transformToken || !currentRun) return;
      setIoFrame(frame);
      await wait(index===2?190:145);
    }
    if(token!==transformToken || !currentRun) return;

    currentRun.ioTransformedV317=true;
    setIoFrame(MAGICAL[0]);
    await wait(90);
    if(token!==transformToken || !currentRun) return;

    actionLocked=false;
    ui?.battlefield?.classList.remove("io-transforming-v317");
    try{ startPeepIdle?.(); }catch(error){}
    if(!commandWasHidden) ui?.commandGrid?.classList.remove("hidden");
    try{ renderCommandButtons?.(); }catch(error){}
    try{ renderSkills?.(); }catch(error){}

    if(priorMessage){
      setTimeout(()=>{
        if(currentRun && currentRun.ioTransformedV317 && !actionLocked){
          try{ setMessage?.(priorMessage); }catch(error){}
        }
      },260);
    }
  }

  async function playTransformOutV317(done){
    if(!isNormalIoRun() || !currentRun.ioTransformedV317){ done(); return; }
    if(transformBackRunning) return;
    transformBackRunning=true;
    const token=++transformToken;

    stopIoIdle();
    actionLocked=true;
    ui?.battlefield?.classList.add("io-transforming-v317");
    ui?.commandGrid?.classList.add("hidden");
    try{ closeCommandWindow?.(); }catch(error){}
    try{ setMessage?.("Io transforms back! ✨"); }catch(error){}

    setIoFrame(MAGICAL[0]);
    await wait(100);
    for(const [index,frame] of [...TRANSFORM].reverse().entries()){
      if(token!==transformToken || !currentRun){ transformBackRunning=false; return; }
      setIoFrame(frame);
      await wait(index===0?175:140);
    }
    if(token!==transformToken || !currentRun){ transformBackRunning=false; return; }

    currentRun.ioTransformedV317=false;
    setIoFrame(SCHOOL[0]);
    setIoSchoolOutsideBattle();
    await wait(110);
    actionLocked=false;
    ui?.battlefield?.classList.remove("io-transforming-v317");
    transformBackRunning=false;
    done();
  }

  startEncounter=function(){
    const shouldTransform=isIo()
      && currentRun?.mode==="normal"
      && Number(currentRun?.index)===0
      && !currentRun?.ioTransformationPlayedV317;

    if(shouldTransform){
      currentRun.ioTransformationPlayedV317=true;
      currentRun.ioTransformedV317=false;
    }

    const result=previousStartEncounterV317.apply(this,arguments);
    if(shouldTransform){
      // The async function performs its lock/hide work synchronously before
      // its first await, so there is no tappable frame before transformation.
      playTransformInV317();
    }
    return result;
  };

  endRun=function(won){
    const args=arguments;
    if(isNormalIoRun()){
      if(Boolean(won) && currentRun?.ioTransformedV317){
        playTransformOutV317(()=>previousEndRunV317.apply(this,args));
        return;
      }
      // Losing/escaping should never leave Io magically transformed on menus/results.
      currentRun.ioTransformedV317=false;
      setIoSchoolOutsideBattle();
    }
    return previousEndRunV317.apply(this,args);
  };

  // Io waits in her school uniform on the Quest menu, then transforms once at
  // the first encounter of every normal 4-encounter stage. Endless keeps the
  // existing magical-girl battle look and does not replay the sequence.
  try{
    if(isIo() && !currentRun){
      renderHeroVisuals?.();
      renderSwitchOcButton?.();
      setIoSchoolOutsideBattle();
    }
  }catch(error){}

  window.DUCKIE_IO_TRANSFORMATION_V317={
    version:VERSION,
    school:[...SCHOOL],
    transform:[...TRANSFORM],
    magical:[...MAGICAL]
  };
})();
