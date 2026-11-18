/* Duckie Days 24.409 — Angel/Demon sibling reunion, NEVER a romance or battle. */
(function(){
 'use strict';
 const FIRST=[
  ['Demon','Angel…?','idle'],
  ['Angel','Demon! Hihi!','idle'],
  ['Demon','What are you doing here?','happy'],
  ['Angel','Mostly trying to catch cute critters!','idle'],
  ['Demon','I… I don’t want to question you. Anyways, you heading home?','idle'],
  ['Angel','Yup! How about you?','idle'],
  ['Demon','Yes, I am. Let’s go home together.','happy'],
  ['Angel','Mmmkay! Nee, what are you holding?','happy'],
  ['Demon','Oh, this…? I found it, but you can have it.','happy'],
  ['Angel','Really? Thanks!','happy'],
  ['Demon','You’re welcome. I don’t really have a need for it anyways.','happy'],
  ['Angel','Hehe, well I appreciate it.','happy'],
  ['Demon','Yeah, let’s go, don’t wander off..','angry'],
  ['Angel','Okayyyy!','happy']
 ];
 const REPEAT=[
  ['Demon','Hey, Angel.','happy'],
  ['Angel','Demon! Hihi!','happy'],
  ['Demon','Good to see you again.','happy'],
  ['Angel','You too!','happy'],
  ['Demon','I saved this for you.','happy'],
  ['Angel','Aww, thank you!','happy'],
  ['Demon','Anytime, sis.','idle']
 ];
 const ANGEL='assets/characters/angel/base/';
 const DEMON='assets/encounters/demon/';
 const VARIANTS={angel:{idle:[ANGEL+'Angel-sprite-idle-1.png',ANGEL+'Angel-sprite-idle-2.png'],happy:ANGEL+'Angel-sprite-magic-heart.png',angry:ANGEL+'Angel-sprite-angry.png'},demon:{idle:[DEMON+'Demon-sprite-idle-1.png',DEMON+'Demon-sprite-idle-2.png'],happy:DEMON+'Demon-sprite-happy.png',angry:DEMON+'Demon-sprite-angry.png'}};
 const REUNION_WARDROBE=['demon-eye-bandage','demon-pendant','outer-demon-jacket','top-demon-shirt','bottom-demon-shorts','legwear-demon-socks','shoes-demon-booties'];
 const AREAS=new Set(['meadow','ocean','candy','cloud','city','spooky']);
 let scene=null;
 const style=document.createElement('style');style.textContent=`
  #siblingScene.angel-demon-scene{display:flex;justify-content:space-between;align-items:flex-end;padding:7% 6% 5%;gap:8px;z-index:25;pointer-events:none}
  #siblingScene.angel-demon-scene img{width:auto!important;height:auto!important;max-width:none!important;max-height:none!important;object-fit:contain!important;object-position:center bottom;image-rendering:pixelated;filter:drop-shadow(0 4px 2px #4b3a6455);visibility:hidden}
  #siblingScene.angel-demon-scene.hidden{display:none!important}
  #battlefield.angel-demon-scene-active > .peep-combatant,
  #battlefield.angel-demon-scene-active > #enemyCombatant,
  #battlefield.angel-demon-scene-active > #enemyCombatant2,
  #battlefield.angel-demon-scene-active > #buddyCombatant,
  #battlefield.angel-demon-scene-active > #chestLayer{display:none!important}
  #siblingScene.angel-demon-scene #siblingLeft{transform:none}
  #siblingScene.angel-demon-scene #siblingRight{transform:scaleX(-1)}
  .angel-demon-next{width:100%;min-height:44px}
  `;document.head.appendChild(style);
 function sizeSceneSprite(img){
  const battlefield=document.querySelector('#battlefield');
  if(!img||!battlefield||!img.naturalWidth||!img.naturalHeight)return;
  const referenceHeight=96;
  const referenceDisplayHeight=Math.max(120,battlefield.clientHeight*0.76);
  const sourcePixelScale=referenceDisplayHeight/referenceHeight;
  img.style.width=`${Math.round(img.naturalWidth*sourcePixelScale)}px`;
  img.style.height=`${Math.round(img.naturalHeight*sourcePixelScale)}px`;
 }
 function setSceneSpriteSource(img,src){
  if(!img||!src)return;
  if(img.getAttribute('src')===src){
   if(img.complete&&img.naturalWidth)sizeSceneSprite(img);
   img.style.visibility='visible';
   return;
  }
  img.style.visibility='hidden';
  img.onload=()=>{sizeSceneSprite(img);img.style.visibility='visible';};
  img.onerror=()=>{img.removeAttribute('src');img.style.visibility='hidden';console.warn('Angel/Demon scene sprite unavailable:',src);};
  if(typeof setQuestSpriteFrame==='function')setQuestSpriteFrame(img,src);
  else img.src=src;
  if(img.complete&&img.naturalWidth){sizeSceneSprite(img);img.style.visibility='visible';}
 }
 function sceneSprite(person){
  const v=VARIANTS[person]||{};
  const mood=String(scene?.expressions?.[person]||'idle').toLowerCase();
  const exact=v[mood];
  if(Array.isArray(exact))return exact[scene.step%exact.length]||exact[0]||'';
  if(typeof exact==='string'&&exact)return exact;
  const idle=v.idle;
  if(Array.isArray(idle))return idle[scene.step%idle.length]||idle[0]||'';
  return typeof idle==='string'?idle:'';
 }
 function showSprites(){
  if(!scene)return;
  const a=document.querySelector('#siblingLeft'),d=document.querySelector('#siblingRight');
  if(a){setSceneSpriteSource(a,sceneSprite('angel'));a.alt='Angel';}
  if(d){setSceneSpriteSource(d,sceneSprite('demon'));d.alt='Demon';}
 }
 function startScene(){
  const first=!hubSave.angelDemonReunion?.firstMet;
  scene={first,lines:first?FIRST:REPEAT,lineIndex:0,step:0,expressions:{angel:'idle',demon:'idle'},finished:false,timer:null,resize:null};
  clearAnimations();
  currentEnemy=null;
  actionLocked=false;
  hideEventChoices();
  ui.commandGrid?.classList.add('hidden');
  ui.enemyCombatant?.classList.add('hidden');
  ui.enemyCombatant2?.classList.add('hidden');
  ui.buddyCombatant?.classList.add('hidden');
  ui.chestLayer?.classList.add('hidden');
  ui.postFloorActions?.classList.add('hidden');
  ui.leaveEndlessButton?.classList.add('hidden');
  closeCommandWindow();
  setPostFloorLayout(false);
  const hero=document.querySelector('#battlefield > .peep-combatant');hero?.classList.add('angel-demon-hero-hidden','hidden');
  ui.battlefield?.classList.add('angel-demon-scene-active');
  const cfg=currentAreaConfig();
  setQuestSpriteFrame(ui.battleBg,cfg.backgrounds[currentRun.index]);
  updateEncounterHeader({type:'angel-demon-reunion'});
  if(ui.encounterLabel)ui.encounterLabel.textContent='ANGEL & DEMON · SIBLING REUNION ♡';
  const target=document.querySelector('#siblingScene');
  target?.classList.remove('hidden','sibling-spat-v224');target?.classList.add('angel-demon-scene');
  target?.setAttribute('aria-hidden','false');
  document.querySelector('#siblingLeft')?.classList.remove('sibling-left-v224');
  document.querySelector('#siblingRight')?.classList.remove('sibling-right-v224');
  scene.timer=setInterval(()=>{if(!scene)return;scene.step=(scene.step+1)%2;showSprites();},620);
  scene.resize=()=>{const left=document.querySelector('#siblingLeft'),right=document.querySelector('#siblingRight');sizeSceneSprite(left);sizeSceneSprite(right);};
  window.addEventListener('resize',scene.resize,{passive:true});
  renderLine();
 }
 function renderLine(){
  if(!scene)return;
  const [speaker,words,expression]=scene.lines[scene.lineIndex];
  scene.expressions[speaker.toLowerCase()]=expression;
  showSprites();
  setMessage(speaker+': '+words);
  const holder=ui.eventChoiceActions;
  if(!holder)return;
  holder.innerHTML='';
  const b=document.createElement('button');b.type='button';
  b.className='pixel-button primary angel-demon-next';
  b.textContent=scene.lineIndex===scene.lines.length-1?'Receive Gift ♡':'Next ♡';
  b.addEventListener('click',()=>{
   if(!scene||scene.finished)return;
   if(scene.lineIndex+1<scene.lines.length){scene.lineIndex++;renderLine();}
   else finish();
  });
  holder.appendChild(b);holder.classList.remove('hidden');ui.battleUi?.classList.add('event-mode');
 }
 function cleanupReunion(){
  if(scene?.timer)clearInterval(scene.timer);
  if(scene?.resize)window.removeEventListener('resize',scene.resize);
  scene=null;
  const layer=document.querySelector('#siblingScene');
  if(layer?.classList.contains('angel-demon-scene')){
   layer.classList.add('hidden');
   layer.classList.remove('angel-demon-scene');
   layer.setAttribute('aria-hidden','true');
   ['#siblingLeft','#siblingRight'].forEach(selector=>{
    const sprite=document.querySelector(selector);
    if(!sprite)return;
    sprite.onload=null;sprite.onerror=null;
    sprite.removeAttribute('src');
    sprite.style.visibility='';sprite.style.removeProperty('width');sprite.style.removeProperty('height');
   });
  }
  ui.battlefield?.classList.remove('angel-demon-scene-active');
  document.querySelector('#battlefield > .peep-combatant')?.classList.remove('angel-demon-hero-hidden','hidden');
 }
 function grantDuckCopy(id){
   if(!Array.isArray(hubSave.unlockedDucks))hubSave.unlockedDucks=[];
   const old=hubSave.unlockedDucks.includes(id);
   if(!old)hubSave.unlockedDucks.push(id);
   if(!hubSave.duckCollectionCounts||typeof hubSave.duckCollectionCounts!=='object')hubSave.duckCollectionCounts={};
   const count=Math.max(old?1:0,Math.floor(Number(hubSave.duckCollectionCounts[id])||0));
   hubSave.duckCollectionCounts[id]=count+1;
 }
 function reward(){
   const first=!hubSave.angelDemonReunion?.firstMet;
   grantDuckCopy('demon-character-duck');
   if(first){
    const owned=Array.isArray(hubSave.characterUnlockedItems?.angel)?hubSave.characterUnlockedItems.angel:[];
    hubSave.characterUnlockedItems=hubSave.characterUnlockedItems||{};
    hubSave.characterUnlockedItems.angel=[...new Set([...owned,...REUNION_WARDROBE])];
   } else {
    const id='r-demon-sibling';
    const cards=window.DuckieTradingCards;
    if(cards?.grantCard)cards.grantCard(hubSave,id,1);
    else{
      hubSave.tradingCards=hubSave.tradingCards||{};
      hubSave.tradingCards.owned=hubSave.tradingCards.owned||{};
      hubSave.tradingCards.owned[id]=Math.max(0,Number(hubSave.tradingCards.owned[id])||0)+1;
      hubSave.tradingCards.unseen=Array.isArray(hubSave.tradingCards.unseen)?hubSave.tradingCards.unseen:[];
      if(!hubSave.tradingCards.unseen.includes(id))hubSave.tradingCards.unseen.push(id);
    }
   }
   hubSave.angelDemonReunion={firstMet:true,totalEncounters:Math.max(0,Number(hubSave.angelDemonReunion?.totalEncounters)||0)+1};
   persistAll();
   return first?'Demon Duck + 7 Demon-themed outfit pieces for Angel! Demon can now join the Task Buddy Room ♡':'Demon Duck + Demon Trading Card ♡';
 }
 function finish(){
   if(!scene||scene.finished)return;
   scene.finished=true;
   clearInterval(scene.timer);
   if(scene.resize)window.removeEventListener('resize',scene.resize);
   const text=reward();
   const holder=ui.eventChoiceActions;
   if(holder){holder.innerHTML='';const button=document.createElement('button');button.type='button';button.className='pixel-button primary angel-demon-next';button.textContent='Continue Exploring ♡';button.addEventListener('click',()=>{
    if(!scene)return;
    cleanupReunion();
    hideEventChoices();
    nextEncounter();
   },{once:true});holder.appendChild(button);}
   setMessage('Sibling Reunion Reward! '+text);
 }
 // 18% of eligible STAGE ENCOUNTER roll slots, on ALL SIX areas, only with Angel in the active party.
 const previousBuild=buildEncounterFromPool;
 buildEncounterFromPool=function(pool,mode='stage'){
  if(mode==='stage' && activeCharacterId==='angel' && AREAS.has(selectedArea) && Math.random()<.18){
   return {type:'angel-demon-reunion'};
  }
  return previousBuild(pool,mode);
 };
 const previousStart=startEncounter;
 startEncounter=function(){
  const e=currentRun?.mode==='endless'?currentRun?.endlessEncounter:currentRun?.plan?.[currentRun?.index];
  if(e?.type==='angel-demon-reunion' && activeCharacterId==='angel'){startScene();return;}
  cleanupReunion();
  return previousStart();
 };
 const previousEndRun=endRun;
 endRun=function(...args){cleanupReunion();return previousEndRun.apply(this,args);};
 const previousReturnHome=returnHome;
 returnHome=function(...args){cleanupReunion();return previousReturnHome.apply(this,args);};
 const tc=window.DuckieTradingCards;
 if(tc && !tc.byId['r-demon-sibling']){
   const card={id:'r-demon-sibling',enemyId:'demon-sibling',variantId:'base',name:'Demon',art:'encounters/demon/Demon-sprite-idle-1.png',rarity:'rare',number:'R-206',category:'Special NPC',hint:'Meet Demon again with Angel in your active Duck Quest party.'};
   tc.cards.push(card);tc.byId[card.id]=card;
 }
 window.DUCKIE_ANGEL_DEMON_V409={version:'24.417',firstDialogue:FIRST.map(x=>x[0]+': '+x[1]),repeatDialogue:REPEAT.map(x=>x[0]+': '+x[1]),isStrictlyPlatonic:true};
})();
