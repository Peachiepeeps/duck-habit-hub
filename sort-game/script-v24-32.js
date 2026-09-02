(() => {
  "use strict";
  const HUB_KEY = "duckHabitHubSave_v1";
  const DEFAULT_ROUND_SECONDS = 60;
  const DUCKS = [
    // COLOR — all of the clear color variants.
    {name:"Red Duck",file:"../assets/ducks/Red-duck.PNG",type:"color"},
    {name:"Dark Red Duck",file:"../assets/ducks/Dark-red-duck.PNG",type:"color"},
    {name:"Orange Duck",file:"../assets/ducks/Orange-duck.PNG",type:"color"},
    {name:"Peach Duck",file:"../assets/ducks/Peach-duck.PNG",type:"color"},
    {name:"Golden Duck",file:"../assets/ducks/Golden-duck.PNG",type:"color"},
    {name:"Green Duck",file:"../assets/ducks/Green-duck.PNG",type:"color"},
    {name:"Mint Duck",file:"../assets/ducks/Mint-duck.PNG",type:"color"},
    {name:"Aqua Duck",file:"../assets/ducks/Aqua-duck.PNG",type:"color"},
    {name:"Sky Blue Duck",file:"../assets/ducks/Sky-blue-duck.PNG",type:"color"},
    {name:"Blue Duck",file:"../assets/ducks/Blue-duck.PNG",type:"color"},
    {name:"Periwinkle Duck",file:"../assets/ducks/Periwinkle-duck.PNG",type:"color"},
    {name:"Purple Duck",file:"../assets/ducks/Purple-duck.PNG",type:"color"},
    {name:"Violet Duck",file:"../assets/ducks/Violet-duck.PNG",type:"color"},
    {name:"Pink Duck",file:"../assets/ducks/Pink-duck.PNG",type:"color"},
    {name:"Magenta Duck",file:"../assets/ducks/magenta-duck.png",type:"color"},
    {name:"Black Duck",file:"../assets/ducks/Black-duck.PNG",type:"color"},
    {name:"White Duck",file:"../assets/ducks/White-duck.PNG",type:"color"},
    {name:"Grey Duck",file:"../assets/ducks/Grey-duck.PNG",type:"color"},
    {name:"Silver Duck",file:"../assets/ducks/Silver-duck.PNG",type:"color"},
    {name:"Bronze Duck",file:"../assets/ducks/Bronze-duck.PNG",type:"color"},
    {name:"Rainbow Duck",file:"../assets/ducks/Rainbow-duck.PNG",type:"color"},

    // FOOD — food/fruit/candy themed ducks.
    {name:"Apple Duck",file:"../assets/ducks/apple-duck.png",type:"food"},
    {name:"Lemon Duck",file:"../assets/ducks/Lemon-duck.PNG",type:"food"},
    {name:"Lime Duck",file:"../assets/ducks/Lime-duck.PNG",type:"food"},
    {name:"Strawberry Duck",file:"../assets/ducks/Strawberry-duck.PNG",type:"food"},
    {name:"Watermelon Duck",file:"../assets/ducks/Watermelon-duck.PNG",type:"food"},
    {name:"Burger Duck",file:"../assets/ducks/Burger-duck.PNG",type:"food"},
    {name:"Pizza Duck",file:"../assets/ducks/Pizza-duck.PNG",type:"food"},
    {name:"Cupcake Duck",file:"../assets/ducks/Cupcake-duck.PNG",type:"food"},
    {name:"Gummy Duck",file:"../assets/ducks/Gummy-duck.PNG",type:"food"},
    {name:"Mushroom Duck",file:"../assets/ducks/Mushroom-duck.PNG",type:"food"},

    // SPECIAL — costumes, characters, creatures, hobbies, etc.
    {name:"Angel Duck",file:"../assets/ducks/Angel-duck.PNG",type:"special"},
    {name:"Demon Duck",file:"../assets/ducks/Demon-duck.PNG",type:"special"},
    {name:"Alien Duck",file:"../assets/ducks/Alien-duck.PNG",type:"special"},
    {name:"King Duck",file:"../assets/ducks/King-duck.PNG",type:"special"},
    {name:"Magical Girl Duck",file:"../assets/ducks/Magical-girl-duck.PNG",type:"special"},
    {name:"Ghost Duck",file:"../assets/ducks/Ghost-duck.PNG",type:"special"},
    {name:"Artist Duck",file:"../assets/ducks/Artist-duck.PNG",type:"special"},
    {name:"Bow Duck",file:"../assets/ducks/Bow-duck.PNG",type:"special"},
    {name:"Bunny Duck",file:"../assets/ducks/Bunny-duck.PNG",type:"special"},
    {name:"Cat Duck",file:"../assets/ducks/Cat-duck.PNG",type:"special"},
    {name:"Cool Duck",file:"../assets/ducks/Cool-duck.PNG",type:"special"},
    {name:"Cosmic Duck",file:"../assets/ducks/Cosmic-duck.PNG",type:"special"},
    {name:"Doctor Duck",file:"../assets/ducks/Doctor-duck.PNG",type:"special"},
    {name:"Duck With a Knife",file:"../assets/ducks/Duck-with-a-knife.PNG",type:"special"},
    {name:"Duckvee",file:"../assets/ducks/Duckvee.PNG",type:"special"},
    {name:"Fancy Duck",file:"../assets/ducks/Fancy-duck.PNG",type:"special"},
    {name:"Flower Duck",file:"../assets/ducks/Flower-duck.PNG",type:"special"},
    {name:"Gamer Duck",file:"../assets/ducks/Gamer-duck.PNG",type:"special"},
    {name:"Glitter Duck",file:"../assets/ducks/Glitter-duck.PNG",type:"special"},
    {name:"Goose",file:"../assets/ducks/Goose.PNG",type:"special"},
    {name:"Jester Duck",file:"../assets/ducks/Jester-duck.PNG",type:"special"},
    {name:"Kidcore Duck",file:"../assets/ducks/Kidcore-duck.PNG",type:"special"},
    {name:"Knitted Duck",file:"../assets/ducks/Knitted-duck.PNG",type:"special"},
    {name:"Party Hat Duck",file:"../assets/ducks/Party-hat-duck.PNG",type:"special"},
    {name:"Plush Duck",file:"../assets/ducks/Plush-duck.PNG",type:"special"},
    {name:"Pompompurin Duck",file:"../assets/ducks/Pompompurin-duck.PNG",type:"special"},
    {name:"Sleepy-time Duck",file:"../assets/ducks/Sleepy-time-duck.PNG",type:"special"},
    {name:"Tiny Duck Stack",file:"../assets/ducks/Tiny-duck-stack.PNG",type:"special"},
    {name:"Top Hat Duck",file:"../assets/ducks/Top-hat-duck.PNG",type:"special"},
    {name:"Angry Duck",file:"../assets/ducks/angry-duck.png",type:"special"},
    {name:"Bathtime Duck",file:"../assets/ducks/bathtime-duck.png",type:"special"},
    {name:"Duck on a Skateboard",file:"../assets/ducks/duck-on-skateboard.png",type:"special"},
    {name:"Googly Eye Duck",file:"../assets/ducks/googly-eye-duck.png",type:"special"},
    {name:"Long Hair Duck",file:"../assets/ducks/long-hair-duck.png",type:"special"},
    {name:"Scarf Duck",file:"../assets/ducks/scarf-duck.png",type:"special"},
    {name:"Vampire Duck",file:"../assets/ducks/vampire-duck.png",type:"special"},
    {name:"Peep Duck",file:"../assets/ducks/peep-duck.png",type:"special"},
    {name:"Miko Duck",file:"../assets/ducks/miko-duck.png",type:"special"},
    {name:"Pile of Tiny Ducks",file:"../assets/ducks/pile-of-tiny-ducks.png",type:"special"}
  ];
  const $=s=>document.querySelector(s);
  const board=$("#gameBoard"), duckLayer=$("#duckLayer"), scoreValue=$("#scoreValue"), comboValue=$("#comboValue"), timeValue=$("#timeValue"), coinCount=$("#coinCount"), feedback=$("#feedback"), startOverlay=$("#startOverlay"), resultOverlay=$("#resultOverlay"), startButton=$("#startButton"), playAgainButton=$("#playAgainButton"), backButton=$("#backButton"), resultBackButton=$("#resultBackButton"), resultScore=$("#resultScore"), resultCorrect=$("#resultCorrect"), resultCombo=$("#resultCombo"), resultCoins=$("#resultCoins"), resultTitle=$("#resultTitle"), bestMessage=$("#bestMessage");
  const durationChoices=[...document.querySelectorAll(".duration-choice")];
  let selectedRoundSeconds=DEFAULT_ROUND_SECONDS;
  let score=0,combo=0,bestCombo=0,correct=0,attempts=0,timeLeft=selectedRoundSeconds,timerId=null,roundActive=false,currentDuck=null,currentData=null,lastDuckName="",endAwarded=false;
  function loadHub(){try{return JSON.parse(localStorage.getItem(HUB_KEY)||"null")||{coins:0,stats:{}}}catch{return{coins:0,stats:{}}}}
  function saveHub(h){localStorage.setItem(HUB_KEY,JSON.stringify(h))}
  function refreshCoins(){coinCount.textContent=Math.max(0,Number(loadHub().coins)||0).toLocaleString()}
  function goBack(){window.location.href="../#games"}
  function randDuck(){
    const types=["color","food","special"];
    const chosenType=types[Math.floor(Math.random()*types.length)];
    let pool=DUCKS.filter(d=>d.type===chosenType && d.name!==lastDuckName);
    if(!pool.length)pool=DUCKS.filter(d=>d.type===chosenType);
    const d=pool[Math.floor(Math.random()*pool.length)];
    lastDuckName=d.name;
    return d
  }
  function updateHud(){scoreValue.textContent=score.toLocaleString();comboValue.textContent=`×${combo}`;timeValue.textContent=String(Math.max(0,Math.ceil(timeLeft)))}
  function showFeedback(t){feedback.textContent=t;feedback.classList.remove("show");void feedback.offsetWidth;feedback.classList.add("show")}
  function setPos(d,x,y){d.dataset.x=String(x);d.dataset.y=String(y);d.style.left=`${x}px`;d.style.top=`${y}px`}
  function resetPos(d){const r=board.getBoundingClientRect(),w=d.offsetWidth||r.width*.24,h=d.offsetHeight||w;setPos(d,r.width*.5-w/2,r.height*.31-h/2);d.style.transform="rotate(0deg) scale(1)";d.style.opacity="1"}
  function spawnDuck(){if(!roundActive)return;if(currentDuck)currentDuck.remove();currentData=randDuck();const img=new Image();img.src=currentData.file;img.alt=currentData.name;img.className="sort-duck";img.draggable=false;duckLayer.append(img);currentDuck=img;requestAnimationFrame(()=>{if(roundActive&&currentDuck===img){resetPos(img);enablePointer(img,currentData)}})}
  function basketFromThrow(projectedX,releaseX,w,v){
    const horizontal=Math.abs(v.vx), downward=Math.max(.01,Math.abs(v.vy));
    const mostlyStraightDown=horizontal<Math.max(.24,downward*.48);
    // Keep a small center assist for straight-down Food throws, but leave
    // noticeably more room for deliberate left/right flicks.
    if(mostlyStraightDown&&releaseX>w*.365&&releaseX<w*.635)return "food";
    if(projectedX<w*.335)return "color";
    if(projectedX>w*.665)return "special";
    return "food";
  }
  function basketCenter(type,r,d){const ratios={color:1/6,food:.5,special:5/6};return{x:r.width*ratios[type]-d.offsetWidth/2,y:r.height*.875-d.offsetHeight/2}}
  function fling(d,data,v){d.style.pointerEvents="none";const r=board.getBoundingClientRect(),sx=Number(d.dataset.x)||0,sy=Number(d.dataset.y)||0,w=d.offsetWidth,h=d.offsetHeight,cx=sx+w/2,cy=sy+h/2,speed=Math.hypot(v.vx,v.vy),low=cy>r.height*.61,down=v.vy>.12||low;if(!down||speed<.08){returnDuck(d);return}const projection=Math.max(190,Math.min(520,speed*260)),px=Math.max(w/2,Math.min(r.width-w/2,cx+v.vx*projection)),type=basketFromThrow(px,cx,r.width,v),target=basketCenter(type,r,d),duration=Math.max(230,Math.min(430,380-speed*70)),curve=Math.max(-r.width*.18,Math.min(r.width*.18,v.vx*90)),start=performance.now();function frame(now){if(!roundActive||currentDuck!==d)return;const t=Math.min(1,(now-start)/duration),e=1-Math.pow(1-t,3),arc=Math.sin(Math.PI*t);setPos(d,sx+(target.x-sx)*e+curve*arc,sy+(target.y-sy)*e-r.height*.055*arc);d.style.transform=`rotate(${v.vx*34*t}deg) scale(${1-.15*t})`;if(t<1)requestAnimationFrame(frame);else resolve(d,data,type)}requestAnimationFrame(frame)}
  function resolve(d,data,type){attempts++;if(type===data.type){correct++;combo++;bestCombo=Math.max(bestCombo,combo);score+=100+Math.min(100,Math.max(0,combo-1)*10);comboValue.parentElement.classList.remove("hot");void comboValue.parentElement.offsetWidth;comboValue.parentElement.classList.add("hot");showFeedback(combo>=5?`Perfect! ×${combo} ♡`:"Nice! ♡");updateHud();d.classList.add("correct");d.animate([{transform:d.style.transform||"scale(.85)",opacity:1},{transform:"translateY(26px) scale(.54)",opacity:.08}],{duration:220,easing:"ease-in",fill:"forwards"});setTimeout(()=>{if(currentDuck===d)currentDuck=null;d.remove();spawnDuck()},225)}else{combo=0;updateHud();showFeedback("Oops! Wrong basket");d.animate([{transform:d.style.transform||"scale(.85)"},{transform:"translateY(-18px) rotate(-8deg) scale(.92)"},{transform:"translateY(-5px) rotate(7deg) scale(1)"}],{duration:300,easing:"ease-out"});setTimeout(()=>returnDuck(d),180)}}
  function returnDuck(d){if(!roundActive||currentDuck!==d)return;d.style.transition="left .24s ease, top .24s ease, transform .24s ease";resetPos(d);setTimeout(()=>{if(currentDuck===d){d.style.transition="";d.style.pointerEvents="auto"}},250)}
  function enablePointer(d,data){let dragging=false,pid=null,gx=0,gy=0,samples=[];d.addEventListener("pointerdown",e=>{if(!roundActive||dragging)return;e.preventDefault();dragging=true;pid=e.pointerId;d.setPointerCapture(pid);d.classList.add("dragging");const r=board.getBoundingClientRect();gx=e.clientX-r.left-(Number(d.dataset.x)||0);gy=e.clientY-r.top-(Number(d.dataset.y)||0);samples=[{x:e.clientX,y:e.clientY,t:performance.now()}]});d.addEventListener("pointermove",e=>{if(!dragging||e.pointerId!==pid)return;e.preventDefault();const r=board.getBoundingClientRect(),x=Math.max(-d.offsetWidth*.2,Math.min(r.width-d.offsetWidth*.8,e.clientX-r.left-gx)),y=Math.max(r.height*.12,Math.min(r.height*.78,e.clientY-r.top-gy));setPos(d,x,y);const now=performance.now();samples.push({x:e.clientX,y:e.clientY,t:now});samples=samples.filter(s=>now-s.t<=110).slice(-6)});function release(e){if(!dragging||e.pointerId!==pid)return;dragging=false;d.classList.remove("dragging");try{d.releasePointerCapture(pid)}catch{}const last=samples.at(-1)||{x:e.clientX,y:e.clientY,t:performance.now()},first=samples[0]||last,dt=Math.max(16,last.t-first.t);fling(d,data,{vx:(last.x-first.x)/dt,vy:(last.y-first.y)/dt})}d.addEventListener("pointerup",release);d.addEventListener("pointercancel",release)}
  function startRound(){clearInterval(timerId);duckLayer.innerHTML="";currentDuck=null;score=combo=bestCombo=correct=attempts=0;timeLeft=selectedRoundSeconds;endAwarded=false;roundActive=true;startOverlay.classList.add("hidden");resultOverlay.classList.add("hidden");updateHud();spawnDuck();const started=performance.now();timerId=setInterval(()=>{timeLeft=Math.max(0,selectedRoundSeconds-(performance.now()-started)/1000);updateHud();if(timeLeft<=0)endRound()},100)}
  function endRound(){if(!roundActive)return;roundActive=false;clearInterval(timerId);timerId=null;timeLeft=0;updateHud();if(currentDuck)currentDuck.style.pointerEvents="none";let earned=Math.max(1,correct);if(attempts>=5&&correct/attempts>=.9)earned+=5;earned=Math.min(50,earned);const hub=loadHub();hub.stats=hub.stats&&typeof hub.stats==="object"?hub.stats:{};const durationBestKey=`duckSortBestScore${selectedRoundSeconds}`,oldBest=Math.max(0,Number(hub.stats[durationBestKey])||0),oldCombo=Math.max(0,Number(hub.stats.duckSortBestCombo)||0),isNew=score>oldBest;if(!endAwarded){hub.coins=Math.max(0,Number(hub.coins)||0)+earned;hub.stats.coinsEarnedTotal=Math.max(0,Number(hub.stats.coinsEarnedTotal)||0)+earned;hub.stats[durationBestKey]=Math.max(oldBest,score);hub.stats.duckSortBestScore=Math.max(Math.max(0,Number(hub.stats.duckSortBestScore)||0),score);hub.stats.duckSortBestCombo=Math.max(oldCombo,bestCombo);hub.stats.duckSortGamesPlayed=Math.max(0,Number(hub.stats.duckSortGamesPlayed)||0)+1;hub.stats.duckSortCorrect=Math.max(0,Number(hub.stats.duckSortCorrect)||0)+correct;saveHub(hub);endAwarded=true}resultScore.textContent=score.toLocaleString();resultCorrect.textContent=String(correct);resultCombo.textContent=`×${bestCombo}`;resultCoins.textContent=`+${earned} Pink Coins`;resultTitle.textContent=correct>=18?"Duck sorting superstar! ♡":correct>=10?"Nice sorting! ♡":"Cute first round! ♡";const modeLabel=selectedRoundSeconds===120?"2-minute":`${selectedRoundSeconds}-second`;bestMessage.textContent=isNew&&score>0?`New ${modeLabel} best: ${score.toLocaleString()}!`:`${modeLabel[0].toUpperCase()+modeLabel.slice(1)} best: ${Math.max(oldBest,score).toLocaleString()}`;refreshCoins();resultOverlay.classList.remove("hidden")}
  function setDuration(seconds){
    selectedRoundSeconds=seconds;
    timeLeft=seconds;
    durationChoices.forEach(btn=>btn.classList.toggle("selected",Number(btn.dataset.seconds)===seconds));
    const label=seconds===120?"2-Minute":`${seconds}-Second`;
    startButton.textContent=`Start ${label} Round`;
    updateHud();
  }
  durationChoices.forEach(btn=>btn.addEventListener("click",()=>setDuration(Number(btn.dataset.seconds)||DEFAULT_ROUND_SECONDS)));
  startButton.addEventListener("click",startRound);playAgainButton.addEventListener("click",startRound);backButton.addEventListener("click",goBack);resultBackButton.addEventListener("click",goBack);document.addEventListener("visibilitychange",()=>{if(document.hidden&&roundActive)endRound()});refreshCoins();setDuration(DEFAULT_ROUND_SECONDS);
})();
