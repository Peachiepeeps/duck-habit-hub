// Duckie Days 24.385 — Lovers / Friends Battle (rare boss encounter)
// Isolated add-on loaded AFTER existing combat patches. Does not alter regular encounters.
(()=>{
  'use strict';
  if(window.DuckieLoversBattleV385)return;

  const CHANCE=0.18; // 18% of ordinary boss fights, including Endless bosses (every 5 floors).
  const loveIds={
    miko:['lukio','shinobu','cheryln','hibiki','devlin','yuzuru','westley','circe','quin','kiri','midori','luka','cybil','nico','nene','moriko','jenson'],
    annika:['shin','bubble','lain','tamao'],
    miho:['ranger','lovell','collin','beau','ein','ideno','hinaru']
  };
  const specialNames={
    lukio:'Lukio',shinobu:'Shinobu',cheryln:'Cheryln',hibiki:'Hibiki',devlin:'Devlin',yuzuru:'Yuzuru',westley:'Westley',circe:'Circe',quin:'Quin',kiri:'Kiri',midori:'Midori',luka:'Luka',cybil:'Cybil',nico:'Nico',nene:'Nene',moriko:'Moriko',jenson:'Jenson',
    ranger:'Ranger',lovell:'Lovell',collin:'Collin',beau:'Beau',ein:'Ein',ideno:'Ideno',hinaru:'Hinaru',shin:'Shin',bubble:'Bubble',lain:'Lain',tamao:'Tamao'
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

  let assist=null;
  let introTicket=0;
  function ongoing(){return Boolean(assist&&currentRun&&currentEnemy?.specialAssistV385?.id===assist.id);}
  const hpWidget=document.createElement('div');
  hpWidget.id='loverAssistHpV385';hpWidget.setAttribute('aria-label','Companion HP');
  hpWidget.innerHTML='<div class="lover-assist-hp-track-v385"><span id="loverAssistFillV385"></span></div><small id="loverAssistTextV385"></small>';
  ui.buddyCombatant?.appendChild(hpWidget);
  function drawHp(){
    const bar=document.getElementById('loverAssistFillV385');
    const label=document.getElementById('loverAssistTextV385');
    if(!bar||!label||!assist)return;
    bar.style.width=Math.round(100*assist.hp/assist.maxHp)+'%';
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
    ui.buddyBattleSprite.alt=assist.name+' ally';
    if(ui.buddyBattleSprite.getAttribute('src')!==assist.art)ui.buddyBattleSprite.src=assist.art;
    ui.buddyBattleSparkle?.classList.add('hidden');
    drawHp();
  }
  function reset(){
    introTicket++;
    assist=null;
    ui.battlefield?.classList.remove('lover-assist-battle-v385');
    ui.buddyCombatant?.classList.remove('lover-assist-ally-v385','lover-assist-down-v385');
    hpWidget.hidden=true;
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
      ui.buddyCombatant?.classList.add('hurt-pop');
      setMessage(`${assist.name} takes ${damage} damage!${assist.hp<=0?' The ally is down!':''}`);
      await sleep(430);
      ui.enemySprite?.classList.remove('attack-pop');
      ui.buddyCombatant?.classList.remove('hurt-pop');
      if(lifeDrainHeal>0&&currentEnemy.hpNow>0){currentEnemy.hpNow=Math.min(currentEnemy.maxHp,currentEnemy.hpNow+Math.max(1,Math.round(damage*lifeDrainHeal)));renderEnemyHp();}
      return damage;
    }
    return oldEnemyAttack.apply(this,arguments);
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
