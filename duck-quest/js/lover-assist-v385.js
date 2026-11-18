// Duckie Days 24.405 — Lovers / Friends Battle (rare boss encounter; new CSS-only HUD/positioning)
// Isolated add-on loaded AFTER existing combat patches. Does not alter regular encounters.
(()=>{
  'use strict';
  if(window.DuckieLoversBattleV385)return;

  const CHANCE=0.18; // 18% of ordinary boss fights, including Endless bosses (every 5 floors).
  const loveIds={
    miko:['lukio','shinobu','cheryln','hibiki','devlin','yuzuru','westley','circe','quin','kiri','midori','luka','cybil','nico','nene','moriko','jenson'],
    annika:['shin','bubble','lain','tamao'],
    miho:['ranger','lovell','collin','beau','ein','ideno','hinaru'],
    shiyu:['yukine']
  };
  const specialNames={
    lukio:'Lukio',shinobu:'Shinobu',cheryln:'Cheryln',hibiki:'Hibiki',devlin:'Devlin',yuzuru:'Yuzuru',westley:'Westley',circe:'Circe',quin:'Quin',kiri:'Kiri',midori:'Midori',luka:'Luka',cybil:'Cybil',nico:'Nico',nene:'Nene',moriko:'Moriko',jenson:'Jenson',
    ranger:'Ranger',lovell:'Lovell',collin:'Collin',beau:'Beau',ein:'Ein',ideno:'Ideno',hinaru:'Hinaru',yukine:'Yukine',shin:'Shin',bubble:'Bubble',lain:'Lain',tamao:'Tamao'
  };
  const extraSprites={midori:'assets/love-interests/midori/Midori-opened.png',jenson:'assets/love-interests/jenson/Jenson-Sprite-idle-1.png'};
  const friends=[
    {id:'luv-birdie',name:'Luv & Birdie',art:'assets/events/luv-and-birdie/idle-1.png',move:'Double Chirp'},
    {id:'ghost-girl',name:'Ghost Girl',art:'assets/gimmicks/ghost-girl/idle-1.png',move:'Ghostly Glow'},
    {id:'artist-friend',name:'Artist Friend',art:'assets/gimmicks/artist-friend/idle-1.png',move:'Paint Splash'},
    {id:'pippa',name:'Pippa',art:'assets/gimmicks/pippa/idle-1.png',move:'Lucky Delivery'},
    {id:'quackers',name:'Quackers',art:'assets/gimmicks/quackers/Quackers-idle-1.png',move:'Big Quack'}
  ];
  const pascal=(name)=>name[0].toUpperCase()+name.slice(1);
  function pick(list){return list[Math.floor(Math.random()*list.length)];}
  function companionsFor(character){
    if(character==='peep'||character==='io')return friends;
    // Shiyu's husband cannot join her before the reunion encounter.
    if(character==='shiyu'&&!hubSave?.loveInterests?.yukine?.encountered)return [];
    let ids=loveIds[character]||[];
    if(!ids.length)return [];
    // Prioritize characters the player has met; fall back to the full cast so
    // new players can still discover the special fight in early areas.
    const known=ids.filter(id=>Boolean(hubSave?.loveInterests?.[id]?.encountered));
    if(known.length)ids=known;
    return ids.map(id=>{
      const name=specialNames[id]||pascal(id);
      const art=extraSprites[id]||`assets/love-interests/${id}/${name}-idle-1.png`;
      return {id,name,art,move:'Heart Strike',romance:true,duckId:id+'-duck',cardId:'r-love-'+id};
    });
  }

  // v24.405: player-approved visible height ratios relative to the active OC.
  // Compensate for transparent padding in each ORIGINAL idle image (no asset edits).
  const allyHeightRatio=Object.freeze({"artist-friend":0.84,"beau":1.08,"bubble":0.92,"cheryln":1,"circe":1,"collin":1.08,"cybil":1,"devlin":1.08,"ein":0.92,"ghost-girl":0.84,"hibiki":0.92,"hinaru":0.92,"ideno":1.08,"jenson":1.08,"kiri":1,"lain":1.08,"lovell":1,"luka":1.08,"lukio":1.08,"luv-birdie":0.84,"midori":1.08,"moriko":1,"nene":1,"nico":1.08,"pippa":0.84,"quackers":0.84,"quin":1.08,"ranger":1,"shin":1,"shinobu":1,"tamao":0.92,"westley":1.08,"yuzuru":0.92,"yukine":1.08});
  const allyArtFill=Object.freeze({"artist-friend":0.96875,"beau":0.92453,"bubble":0.92708,"cheryln":0.92708,"circe":0.96875,"collin":0.94175,"cybil":0.96875,"devlin":0.98039,"ein":0.9375,"ghost-girl":0.95312,"hibiki":0.89583,"hinaru":0.90625,"ideno":0.88235,"jenson":0.9375,"kiri":0.94792,"lain":0.97059,"lovell":0.91667,"luka":0.92708,"lukio":0.91,"luv-birdie":0.91667,"midori":0.93043,"moriko":0.90625,"nene":0.97917,"nico":0.9619,"pippa":0.89062,"quackers":0.96875,"quin":0.92308,"ranger":0.89583,"shin":0.96875,"shinobu":0.92708,"tamao":0.96875,"westley":0.9596,"yuzuru":0.85417,"yukine":0.98958});
  const heroArtFill=Object.freeze({peep:94/96,io:93/96,miho:94/96,miko:91/96,annika:93/96,shiyu:93/96});

  let assist=null;
  let rewardSceneActive=false;
  let yukineCounterUsed=false;
  let yukinePoseTimer=null;
  let yukineIdleTimer=null;
  let yukineIdleStep=0;
  function startYukineIdle(){
    if(yukineIdleTimer || assist?.id!=='yukine')return;
    yukineIdleStep=0;
    yukineIdleTimer=setInterval(()=>{
      if(!ongoing()||!ui.buddyBattleSprite||assist?.hp<=0)return;
      const src=ui.buddyBattleSprite.getAttribute('src')||'';
      if(!/Yukine-idle-[12]\.png$/.test(src))return;
      yukineIdleStep=1-yukineIdleStep;
      setYukinePose(yukineIdleStep?'idle-2':'idle-1');
    },680);
  }
  function yukineSprite(pose){return `assets/love-interests/yukine/Yukine-${pose}.png`;}
  function setYukinePose(pose){if(assist?.id==='yukine'&&ui.buddyBattleSprite)ui.buddyBattleSprite.src=yukineSprite(pose);}
  function resetYukinePose(){if(ongoing()&&assist?.id==='yukine'&&assist.hp>0)setYukinePose('idle-1');}
  let introTicket=0;
  function ongoing(){return Boolean(!rewardSceneActive&&assist&&currentRun&&currentEnemy?.specialAssistV385?.id===assist.id);}
  const hpWidget=document.createElement('div');
  hpWidget.id='loverAssistHpV385';hpWidget.setAttribute('aria-label','Companion HP');
  // Reuse the existing game's nameplate and HP-bar styles; no new artwork.
  // Keep the companion's HUD separate from its sprite so the sprite can sit
  // behind the OC without hiding the HP panel.
  hpWidget.innerHTML='<div class="nameplate lover-assist-nameplate-v403"><strong id="loverAssistNameV403">Companion</strong><span id="loverAssistTagV403">ALLY ♡</span></div><div class="hp-bar lover-assist-hp-track-v385"><span id="loverAssistFillV385"></span></div><small id="loverAssistTextV385"></small>';
  ui.battlefield?.appendChild(hpWidget);
  function positionAssistHud(){
    if(!ongoing() || hpWidget.hidden || !ui.battlefield)return;
    const heroStatus=ui.battlefield.querySelector('.peep-status-stack');
    if(!heroStatus)return;
    const arena=ui.battlefield.getBoundingClientRect();
    const hero=heroStatus.getBoundingClientRect();
    // Follow the real hero panel height so long names never overlap the ally.
    hpWidget.style.top=Math.max(0,Math.round(hero.bottom-arena.top+2))+'px';
  }
  // Measure the actual fighter currently shown, including layered outfits.
  // The old fixed 54-56% battlefield sizing made taller character canvases huge.
  function displayedHeroSprite(){
    const battlefield=ui.battlefield;
    if(!battlefield)return null;
    const composite=battlefield.querySelector('#battleHeroComposite');
    if(composite && !composite.classList.contains('hidden')){
      const imgs=Array.from(composite.querySelectorAll('img')).filter(img=>{
        const b=img.getBoundingClientRect();
        return b.height>2 && b.width>2 && getComputedStyle(img).display!=='none';
      });
      if(imgs.length){
        return imgs.reduce((best,img)=>img.getBoundingClientRect().height>best.getBoundingClientRect().height?img:best);
      }
      if(composite.getBoundingClientRect().height>2)return composite;
    }
    const base=battlefield.querySelector('#peepSprite');
    if(base && base.getBoundingClientRect().height>2)return base;
    return null;
  }
  function positionAssistSprite(){
    if(!ongoing()||!ui.buddyCombatant||!ui.battlefield)return;
    const sprite=ui.buddyBattleSprite;
    const arena=ui.battlefield.getBoundingClientRect();
    if(arena.height<=0||arena.width<=0)return;
    const hero=displayedHeroSprite();
    const heroRect=hero?.getBoundingClientRect();
    const heroHeight=heroRect?.height>4?heroRect.height:arena.height*.50;
    const target=allyHeightRatio[assist.id] ?? 1;
    const artFill=allyArtFill[assist.id] ?? .95;
    const heroFill=heroArtFill[activeCharacterId] ?? .97;
    // Percentages apply to the visible pixels, not differently padded canvases.
    const height=Math.max(12,Math.min(arena.height*.85,heroHeight*heroFill*target/artFill));
    const naturalW=sprite?.naturalWidth||64;
    const naturalH=sprite?.naturalHeight||96;
    const width=height*naturalW/naturalH;
    ui.buddyCombatant.style.setProperty('--lover-assist-height',height.toFixed(2)+'px');
    ui.buddyCombatant.style.setProperty('--lover-assist-width',width.toFixed(2)+'px');
    // Match the two fighters' footlines despite different sprite padding.
    const foot=heroRect?.height>4?
      heroRect.bottom-(heroRect.height*(1-heroFill)):
      arena.bottom-arena.height*.07;
    const bottomBlank=height*(1-artFill);
    const bottom=Math.max(0,arena.bottom-foot-bottomBlank);
    ui.buddyCombatant.style.setProperty('--lover-assist-bottom',bottom.toFixed(2)+'px');
  }
  function positionAllAssist(){positionAssistHud();positionAssistSprite();}
  window.addEventListener('resize',positionAllAssist,{passive:true});
  ui.buddyBattleSprite?.addEventListener('load',positionAllAssist,{passive:true});
  ui.battlefield?.querySelector('#peepSprite')?.addEventListener('load',positionAllAssist,{passive:true});
  function drawHp(){
    const bar=document.getElementById('loverAssistFillV385');
    const label=document.getElementById('loverAssistTextV385');
    if(!bar||!label||!assist)return;
    bar.style.width=Math.round(100*assist.hp/assist.maxHp)+'%';
    // Match the game's Android-safe outer-gradient HP bar, not just the hidden span.
    bar.parentElement?.style.setProperty('--hp-pct',Math.round(100*assist.hp/assist.maxHp)+'%');
    label.textContent=assist.hp>0?`${assist.hp} / ${assist.maxHp} HP`:'Knocked out!';
    ui.buddyCombatant?.classList.toggle('lover-assist-down-v385',assist.hp<=0);
  }
  function showAssist(){
    if(!ongoing()||!ui.buddyCombatant)return;
    clearInterval(buddyIdleTimer);buddyIdleTimer=null;
    ui.buddyCombatant.classList.remove('hidden');
    ui.buddyCombatant.classList.add('lover-assist-ally-v385');
    ui.battlefield?.classList.add('lover-assist-battle-v385');
    ui.buddyBattleName.textContent=assist.name+(assist.romance?' ♡':' ✦');
    const name=document.getElementById('loverAssistNameV403');
    const tag=document.getElementById('loverAssistTagV403');
    if(name)name.textContent=assist.name;
    if(tag)tag.textContent=assist.romance?'ALLY ♡':'FRIEND ✦';
    ui.buddyBattleSprite.alt=assist.name+' ally';
    if(ui.buddyBattleSprite.getAttribute('src')!==assist.art)ui.buddyBattleSprite.src=assist.art;
    ui.buddyBattleSparkle?.classList.add('hidden');
    if(assist?.id==='yukine')startYukineIdle();
    drawHp();
    positionAllAssist();
    requestAnimationFrame(positionAllAssist);
  }
  function reset(){
    rewardSceneActive=false;
    yukineCounterUsed=false;
    if(yukinePoseTimer){clearTimeout(yukinePoseTimer);yukinePoseTimer=null;}
    if(yukineIdleTimer){clearInterval(yukineIdleTimer);yukineIdleTimer=null;}
    introTicket++;
    assist=null;
    ui.battlefield?.classList.remove('lover-assist-battle-v385');
    ui.buddyCombatant?.classList.remove('lover-assist-ally-v385','lover-assist-down-v385');
    hpWidget.hidden=true;
    hpWidget.style.top='';
    for(const p of ['--lover-assist-height','--lover-assist-width','--lover-assist-bottom']){
      ui.buddyCombatant?.style.removeProperty(p);
    }
  }
  hpWidget.hidden=true;
  function isSpecialBoss(encounter){return encounter?.type==='boss'&&Boolean(ENEMIES[encounter.enemyId]);}

  const beforeStart=startEncounter;
  startEncounter=function(...args){
    reset();
    const encounter=currentRun?.mode==='endless'?currentRun.endlessEncounter:currentRun?.plan?.[currentRun.index];
    const choices=companionsFor(activeCharacterId);
    const chosen=isSpecialBoss(encounter)&&choices.length&&Math.random()<CHANCE?pick(choices):null;
    const result=beforeStart.apply(this,args);
    if(!chosen||!currentEnemy||!currentRun)return result;
    const partyHp=Math.max(1,Math.round(Number(currentRun.maxHp||40)*.62));
    assist={...chosen,maxHp:partyHp,hp:partyHp};
    currentEnemy.specialAssistV385={id:assist.id,name:assist.name,romance:!!assist.romance,duckId:assist.duckId||'',cardId:assist.cardId||''};
    currentEnemy.maxHp=Math.max(1,Math.round(currentEnemy.maxHp*2));
    currentEnemy.hpNow=currentEnemy.maxHp;
    currentEnemy.attackNow=Math.max(1,Math.round(currentEnemy.attackNow*1.5));
    currentEnemy.boss=true; // preserve boss chest + floor completion even for custom area templates
    currentEnemy.name='✨ '+currentEnemy.name;
    renderEnemyCombatant(currentEnemy);
    renderEnemyHp();
    if(ui.enemyRank)ui.enemyRank.textContent='BOSS · LOVER/FRIEND CHALLENGE';
    hpWidget.hidden=false;
    showAssist();
    actionLocked=true;renderCommandButtons();
    const ticket=introTicket;
    const exclamation=activeCharacterId==='miho'?'Shit…':activeCharacterId==='io'?'Crap!':'Oh no!';
    setMessage(`${heroDisplayName()}: “${exclamation}” A glowing boss has appeared!`);
    (async()=>{
      await sleep(800);
      if(ticket!==introTicket||!ongoing())return;
      setMessage(assist.romance?`${assist.name}: “Don't worry, I'm here!” ♡`:`${assist.name} has come to help!! ✦`);
      await sleep(1050);
      if(ticket!==introTicket||!ongoing())return;
      actionLocked=false;
      renderCommandButtons();
      setMessage(`${assist.name} attacks first! Choose ${heroDisplayName()}'s move.`);
    })();
    return result;
  };

  const oldBuddy=renderBattleBuddy;
  renderBattleBuddy=function(...args){const r=oldBuddy.apply(this,args);showAssist();return r;};
  const oldCommands=renderCommandButtons;
  renderCommandButtons=function(...args){
    const r=oldCommands.apply(this,args);
    if(ongoing()){
      if(ui.buddyMenuButton)ui.buddyMenuButton.disabled=true;
      if(ui.switchBuddyMenuButton)ui.switchBuddyMenuButton.disabled=true;
      if(ui.buddyCommandText)ui.buddyCommandText.textContent=`${assist.name} assists automatically`;
      if(ui.switchBuddyCommandText)ui.switchBuddyCommandText.textContent='Lil Guy replaced for this fight';
    }
    return r;
  };
  const oldBuddyMove=useBuddySkill;
  useBuddySkill=async function(...args){
    if(ongoing()){setMessage(`${assist.name} is fighting automatically!`);return;}
    return oldBuddyMove.apply(this,args);
  };

  // The companion acts BEFORE the OC's chosen attack, rather than as an extra
  // hit before the enemy's next turn (as the older Miko event did).
  async function assistMove(){
    if(!ongoing()||assist.hp<=0||!currentEnemy||currentEnemy.hpNow<=0)return false;
    const healSelf=assist.hp<=assist.maxHp*.45;
    const healHero=currentRun.hp<=currentRun.maxHp*.55;
    animateBuddyAction();
    if((healSelf||healHero)&&Math.random()<.35){
      const amount=Math.max(1,Math.round(currentRun.maxHp*.17));
      if(healSelf){assist.hp=Math.min(assist.maxHp,assist.hp+amount);drawHp();setMessage(`${assist.name} used Healing Glow! +${amount} ally HP!`);}
      else{const gained=Math.min(amount,currentRun.maxHp-currentRun.hp);currentRun.hp+=gained;renderPeepHp();showFloat('+'+gained,'heal','peep');setMessage(`${assist.name} used Healing Glow! +${gained} HP!`);}
    }else{
      const damage=Math.max(1,Math.round(peepStats().attack*(.70+Math.random()*.22)));
      currentEnemy.hpNow=Math.max(0,currentEnemy.hpNow-damage);
      renderEnemyHp();showFloat('-'+damage,'damage','enemy');
      setMessage(`${assist.name} used ${assist.move}! -${damage} HP!`);
    }
    await sleep(560);
    if(currentEnemy?.hpNow<=0){await enemyDefeated();return true;}
    return false;
  }
  const oldSkill=useSkill;
  useSkill=async function(skill){
    if(!ongoing()||actionLocked)return oldSkill.apply(this,arguments);
    actionLocked=true;
    renderCommandButtons();
    try{
      const won=await assistMove();
      if(won||!ongoing())return;
    }finally{
      actionLocked=false;
    }
    return oldSkill.apply(this,arguments);
  };
  const oldQuickHeal=quickHealTurn;
  quickHealTurn=async function(){
    if(!ongoing()||actionLocked)return oldQuickHeal.apply(this,arguments);
    actionLocked=true;
    renderCommandButtons();
    try{if(await assistMove())return;}finally{actionLocked=false;}
    return oldQuickHeal.apply(this,arguments);
  };

  // Yukine's protective husband counterattack is separate from his normal assist.
  // Only the actual boss damage to Shiyu triggers it; misses and ally-targeted
  // attacks do not. When Shiyu is KO'd, battle-end handling takes precedence.
  async function yukineCounterattack(){
    if(!ongoing()||assist?.id!=='yukine'||assist.hp<=0||yukineCounterUsed||!currentRun||currentRun.hp<=0||!currentEnemy||currentEnemy.hpNow<=0)return;
    yukineCounterUsed=true;
    setYukinePose('mad');
    ui.buddyCombatant?.classList.add('attack-pop');
    setMessage('Yukine: “Don’t hurt Shiyu!”');
    await sleep(240);
    if(!ongoing()||!currentEnemy||currentEnemy.hpNow<=0)return;
    const damage=Math.max(1,Math.round(peepStats().attack*(.70+Math.random()*.22)*1.5));
    currentEnemy.hpNow=Math.max(0,currentEnemy.hpNow-damage);
    renderEnemyHp();showFloat('-'+damage,'damage','enemy');
    setMessage(`Yukine used Don’t Hurt Shiyu! -${damage} HP!`);
    await sleep(400);
    ui.buddyCombatant?.classList.remove('attack-pop');
    resetYukinePose();
    if(currentEnemy?.hpNow<=0)await enemyDefeated();
  }

  // If this boss lands a normal attack, it can target the ally instead of the OC.
  const oldEnemyAttack=performEnemyAttack;
  performEnemyAttack=async function(multiplier=1,label='',lifeDrainHeal=0){
    if(ongoing()&&assist.hp>0&&Math.random()<.45){
      setMessage(`${currentEnemy.name} targets ${assist.name}!`);
      ui.enemySprite?.classList.add('attack-pop');
      await sleep(270);
      const damage=Math.max(1,Math.round(currentEnemy.attackNow*(.77+Math.random()*.20)*multiplier*.65));
      assist.hp=Math.max(0,assist.hp-damage);
      drawHp();
      if(assist.id==='yukine')setYukinePose('hurt');
      ui.buddyCombatant?.classList.add('hurt-pop');
      setMessage(`${assist.name} takes ${damage} damage!${assist.hp<=0?' The ally is down!':''}`);
      await sleep(430);
      ui.enemySprite?.classList.remove('attack-pop');
      ui.buddyCombatant?.classList.remove('hurt-pop');
      if(assist?.id==='yukine'&&assist.hp>0)resetYukinePose();
      if(lifeDrainHeal>0&&currentEnemy.hpNow>0){currentEnemy.hpNow=Math.min(currentEnemy.maxHp,currentEnemy.hpNow+Math.max(1,Math.round(damage*lifeDrainHeal)));renderEnemyHp();}
      return damage;
    }
    const watched=ongoing()&&assist?.id==='yukine'&&!yukineCounterUsed&&currentRun?.hp>0;
    const hpBefore=watched?currentRun.hp:0;
    const result=await oldEnemyAttack.apply(this,arguments);
    if(watched&&ongoing()&&currentRun?.hp>0&&currentRun.hp<hpBefore){
      await yukineCounterattack();
    }
    return result;
  };

  // v24.406: hide the companion HUD throughout victory and chest/reward actions,
  // not only while the chest element is visible. The next encounter resets it.
  const oldShowChest=showChest;
  showChest=function(...args){
    rewardSceneActive=true;
    hpWidget.hidden=true;
    if(assist?.id==='yukine'&&assist.hp>0)setYukinePose('happy');
    return oldShowChest.apply(this,args);
  };

  const oldReward=generateRewards;
  generateRewards=function(chest){
    const rewards=oldReward.apply(this,arguments);
    const special=chest?.enemy?.specialAssistV385;
    if(special&&rewards){
      rewards.coins=(Number(rewards.coins)||0)+Math.max(120,Math.round((currentRun?.rank||1)*3+100));
      rewards.loversBattleBonusV385={...special};
    }
    return rewards;
  };
  const oldApply=applyRewards;
  applyRewards=function(rewards){
    const result=oldApply.apply(this,arguments);
    const bonus=rewards?.loversBattleBonusV385;
    if(bonus){
      const won=[];
      if(bonus.romance&&bonus.cardId&&Math.random()<.28&&window.DuckieTradingCards?.byId?.[bonus.cardId]){
        window.DuckieTradingCards.grantCard(hubSave,bonus.cardId,1,{source:'lovers-battle'});
        won.push(`${bonus.name} trading card`);
      }
      if(bonus.romance&&bonus.duckId&&Math.random()<.22){
        if(!Array.isArray(hubSave.unlockedDucks))hubSave.unlockedDucks=[];
        if(!hubSave.unlockedDucks.includes(bonus.duckId))hubSave.unlockedDucks.push(bonus.duckId);
        if(!hubSave.duckCollectionCounts||typeof hubSave.duckCollectionCounts!=='object')hubSave.duckCollectionCounts={};
        hubSave.duckCollectionCounts[bonus.duckId]=Math.max(0,Number(hubSave.duckCollectionCounts[bonus.duckId])||0)+1;
        won.push(`${bonus.name} duck`);
      }
      persistAll();
      setMessage(`Special Battle Victory! Bonus coins${won.length?' · '+won.join(' + '):''}! ♡`);
    }
    return result;
  };
  const oldEnd=endRun;
  endRun=function(...args){reset();return oldEnd.apply(this,args);};
  window.DuckieLoversBattleV385={chance:CHANCE,friends:friends.map(({name})=>name)};
})();
