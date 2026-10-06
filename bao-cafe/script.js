(function(){
  'use strict';
  const STORAGE_KEY='duckHabitHubSave_v1';
  const QUEST_KEY='baoCafeChallengeV309';
  const params=new URLSearchParams(location.search);
  const questMode=params.get('duckquest')==='1';
  const fixedBear=['cheese','parfait','frappe'].includes(params.get('bear'))?params.get('bear'):null;
  const pickScreen=document.querySelector('#pickScreen'),gameScreen=document.querySelector('#gameScreen'),resultScreen=document.querySelector('#resultScreen');
  const startShift=document.querySelector('#startShift'),backHomePick=document.querySelector('#backHomePick'),playAgain=document.querySelector('#playAgain'),resultBack=document.querySelector('#resultBack');
  const timerText=document.querySelector('#timerText'),scoreText=document.querySelector('#scoreText'),ampLabel=document.querySelector('#ampLabel'),ampText=document.querySelector('#ampText');
  const orderContents=document.querySelector('#orderContents'),customerSprite=document.querySelector('#customerSprite'),customerName=document.querySelector('#customerName'),bearSprite=document.querySelector('#bearSprite');
  const slotsEl=document.querySelector('#slots'),ingredientGrid=document.querySelector('#ingredientGrid'),mixButton=document.querySelector('#mixButton'),clearButton=document.querySelector('#clearButton'),feedback=document.querySelector('#feedback');
  const resultBear=document.querySelector('#resultBear'),resultEyebrow=document.querySelector('#resultEyebrow'),resultTitle=document.querySelector('#resultTitle'),resultScore=document.querySelector('#resultScore'),resultOrders=document.querySelector('#resultOrders'),resultBest=document.querySelector('#resultBest'),resultReward=document.querySelector('#resultReward');
  const BEARS={
    cheese:{name:'Cheese',idle:['assets/Cheese-idle-1.png','assets/Cheese-idle-2.png'],happy:'assets/Cheese-Satisfied.png'},
    parfait:{name:'Parfait',idle:['assets/Parfait-idle-1.png','assets/Parfait-idle-2.png'],happy:'assets/Parfait-gasp.png'},
    frappe:{name:'Frappe',idle:['assets/Frappe-idle-1.png','assets/Frappe-idle-2.png'],happy:'assets/Frappe-amused.png'}
  };
  const INGREDIENTS={
    water:{name:'Water',art:'../assets/food/Water.webp'},sugar:{name:'Sugar',art:'assets/Sugar.webp'},lemon:{name:'Lemon',art:'../assets/food/Lemon.webp'},
    lime:{name:'Lime',art:'../assets/food/Lime.webp'},strawberry:{name:'Strawberry',art:'../assets/food/Strawberry.webp'},matcha:{name:'Matcha',art:'assets/Matcha.webp'},
    milk:{name:'Milk',art:'../assets/food/Milk.webp'},'milk-tea':{name:'Milk Tea',art:'../assets/food/Milk-tea.webp'},cupcake:{name:'Cupcake',art:'../assets/food/Cupcake.webp'}
  };
  const RECIPES={
    lemonade:{name:'Lemonade',art:'assets/Lemonade.webp',needs:['lemon','water','sugar']},
    limeade:{name:'Limeade',art:'assets/Limeade.webp',needs:['lime','water','sugar']},
    'strawberry-lemonade':{name:'Strawberry Lemonade',art:'assets/Strawberry-lemonade.webp',needs:['strawberry','lemon','water','sugar']},
    'matcha-milk-tea':{name:'Matcha Milk Tea',art:'assets/Matchaboba.webp',needs:['matcha','milk-tea','milk']},
    'strawberry-milk-tea':{name:'Strawberry Milk Tea',art:'assets/StrawberryBoba.webp',needs:['strawberry','milk-tea','milk']},
    'fancy-milk-tea':{name:'Fancy Milk Tea',art:'../assets/food/Fancy-milk-tea.webp',needs:['milk-tea','cupcake','milk']}
  };
  const FALLBACK_CUSTOMER_ART='../duck-quest/assets/characters/miko/base/idle-1.webp';
  const CUSTOMERS=[
    {name:'Peep',art:'../duck-quest/assets/characters/peep/base/idle-1.webp'},
    {name:'Miko',art:'../duck-quest/assets/characters/miko/base/idle-1.webp'},
    {name:'Io',art:'../duck-quest/assets/characters/io/base/idle-1.webp'},
    {name:'Miho',art:'../duck-quest/assets/characters/miho/base/idle-1.webp'},
    {name:'Annika',art:'../duck-quest/assets/characters/annika/base/idle-1.webp'}
  ];
  let selectedBear=fixedBear,score=0,timeLeft=60,ordersDone=0,perfectStreak=0,bestStreak=0,parfaitProgress=0,slots=[],order=[],orderIndex=0,timer=null,bearAnim=null,active=true;
  const pick=a=>a[Math.floor(Math.random()*a.length)];
  const shuffled=a=>a.slice().sort(()=>Math.random()-.5);
  function readSave(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')||{};}catch{return{};}}
  function writeSave(s){localStorage.setItem(STORAGE_KEY,JSON.stringify(s));}
  function addCoins(n){const s=readSave();s.coins=Math.max(0,Number(s.coins)||0)+n;writeSave(s);return n;}
  function selectedRecipe(){const ids=Object.keys(RECIPES);return ids[Math.floor(Math.random()*ids.length)];}
  function orderTarget(){return selectedBear==='frappe'?4:5;}
  function normalize(a){return a.slice().sort().join('|');}
  function setFeedback(text,kind=''){feedback.textContent=text;feedback.className=`feedback ${kind}`.trim();}
  function recipeHint(id){return RECIPES[id].needs.map(x=>INGREDIENTS[x].name).join(' + ');}
  function currentOrderText(prefix='Make'){const id=order[orderIndex];return id?`${prefix}: ${RECIPES[id].name} (${recipeHint(id)})`:'';}
  function renderSlots(){slotsEl.innerHTML='';for(let i=0;i<4;i++){const id=slots[i];const b=document.createElement('button');b.type='button';b.className=`ingredient-slot ${id?'':'empty'}`;if(id){const img=document.createElement('img');img.src=INGREDIENTS[id].art;img.alt=INGREDIENTS[id].name;b.append(img);b.title=`Remove ${INGREDIENTS[id].name}`;}b.addEventListener('click',()=>{if(id){slots.splice(i,1);renderSlots();}});slotsEl.append(b);}}
  function renderIngredients(){ingredientGrid.innerHTML='';Object.entries(INGREDIENTS).forEach(([id,item])=>{const b=document.createElement('button');b.type='button';b.className='ingredient-button';b.innerHTML=`<img src="${item.art}" alt=""><span>${item.name}</span>`;b.addEventListener('click',()=>{if(!active)return;if(slots.length>=4){setFeedback('All four prep spots are full!','bad');return;}slots.push(id);renderSlots();});ingredientGrid.append(b);});}
  function updateAmp(){if(selectedBear==='cheese'){ampLabel.textContent='COMBO';const m=perfectStreak>=8?2:perfectStreak>=5?1.5:perfectStreak>=3?1.25:1;ampText.textContent=`x${m}`;}else if(selectedBear==='parfait'){ampLabel.textContent='TIME BOOST';ampText.textContent=`${parfaitProgress}/3 Perfect`;}else{ampLabel.textContent='FRAPPE';ampText.textContent=order.length>1?'Double Order!':'Hard Mode';}}
  function multiplier(){return selectedBear==='cheese'?(perfectStreak>=8?2:perfectStreak>=5?1.5:perfectStreak>=3?1.25:1):1;}
  function renderOrder(){orderContents.innerHTML='';order.forEach((id,i)=>{if(i){const plus=document.createElement('span');plus.className='order-plus';plus.textContent='+';orderContents.append(plus);}const wrap=document.createElement('div');wrap.className=`order-item ${i<orderIndex?'served':''}`;const img=document.createElement('img');img.src=RECIPES[id].art;img.alt=RECIPES[id].name;wrap.append(img);orderContents.append(wrap);});updateAmp();}
  function nextCustomer(){const c=pick(CUSTOMERS);customerSprite.onerror=()=>{customerSprite.onerror=null;customerSprite.src=FALLBACK_CUSTOMER_ART;};customerSprite.src=c.art;customerSprite.alt=c.name;customerName.textContent=c.name;const first=selectedRecipe();order=[first];if(selectedBear==='frappe'&&Math.random()<.32){let second=selectedRecipe();if(second===first)second=pick(Object.keys(RECIPES).filter(x=>x!==first));order.push(second);}orderIndex=0;slots=[];renderSlots();renderOrder();setFeedback(order.length>1?`Frappe talked them into TWO drinks! ${currentOrderText('First')}`:currentOrderText());}
  function correctMix(){const wanted=order[orderIndex],recipe=RECIPES[wanted];return normalize(slots)===normalize(recipe.needs);}
  function animateHappy(){bearSprite.src=BEARS[selectedBear].happy;bearSprite.classList.remove('pop');void bearSprite.offsetWidth;bearSprite.classList.add('pop');setTimeout(()=>{if(active)bearSprite.src=BEARS[selectedBear].idle[0];},420);}
  function handleSuccess(){perfectStreak++;bestStreak=Math.max(bestStreak,perfectStreak);let gained=100;if(selectedBear==='cheese')gained=Math.round(gained*multiplier());if(selectedBear==='frappe'&&order.length>1)gained+=25;score+=gained;scoreText.textContent=score.toLocaleString();if(selectedBear==='parfait'){parfaitProgress++;if(parfaitProgress>=3){parfaitProgress=0;timeLeft+=5;timerText.textContent=timeLeft;setFeedback(`Perfect! +${gained} points · +5 seconds!`,'good');}else setFeedback(`Perfect! +${gained} points`,'good');}else setFeedback(`Perfect! +${gained} points`,'good');animateHappy();orderIndex++;slots=[];renderSlots();if(orderIndex<order.length){renderOrder();setTimeout(()=>setFeedback(currentOrderText('Now make'), 'good'),380);return;}ordersDone++;if(questMode&&ordersDone>=orderTarget()){finish(true);return;}setTimeout(nextCustomer,480);}
  function handleFail(){perfectStreak=0;if(selectedBear==='parfait')parfaitProgress=0;slots=[];renderSlots();updateAmp();setFeedback('Oops! That recipe is not quite right.','bad');document.querySelector('.build-zone').classList.remove('shake');void document.querySelector('.build-zone').offsetWidth;document.querySelector('.build-zone').classList.add('shake');}
  function mix(){if(!active)return;if(!slots.length){setFeedback('Add some ingredients first!','bad');return;}correctMix()?handleSuccess():handleFail();}
  function startBearAnimation(){clearInterval(bearAnim);let i=0;bearSprite.src=BEARS[selectedBear].idle[0];bearAnim=setInterval(()=>{i=1-i;if(active)bearSprite.src=BEARS[selectedBear].idle[i];},520);}
  function begin(){score=0;timeLeft=60;ordersDone=0;perfectStreak=0;bestStreak=0;parfaitProgress=0;active=true;scoreText.textContent='0';timerText.textContent='60';pickScreen.classList.add('hidden');resultScreen.classList.add('hidden');gameScreen.classList.remove('hidden');startBearAnimation();nextCustomer();clearInterval(timer);timer=setInterval(()=>{if(!active)return;timeLeft--;timerText.textContent=timeLeft;if(timeLeft<=0)finish(!questMode);},1000);}
  function rewardHub(){const coins=Math.min(75,Math.max(5,Math.floor(score/100)*3));addCoins(coins);return `${coins} Pink Coins added to your Hub!`}
  function finish(cleared=true){if(!active)return;active=false;clearInterval(timer);clearInterval(bearAnim);gameScreen.classList.add('hidden');resultScreen.classList.remove('hidden');resultBear.src=BEARS[selectedBear].happy;resultBear.alt=BEARS[selectedBear].name;resultScore.textContent=score.toLocaleString();resultOrders.textContent=ordersDone;resultBest.textContent=bestStreak;resultEyebrow.textContent=questMode?(cleared?'CHALLENGE CLEAR!':'SHIFT ENDED'):'SHIFT COMPLETE!';resultTitle.textContent=cleared?`${BEARS[selectedBear].name} is impressed!`:'Time ran out!';if(questMode){const s=readSave(),c=s[QUEST_KEY]||{};c.status='return';c.cleared=Boolean(cleared);c.score=score;c.orders=ordersDone;c.bestStreak=bestStreak;c.bear=selectedBear;c.finishedAt=Date.now();s[QUEST_KEY]=c;writeSave(s);resultReward.textContent=cleared?'Your Duck Quest run is safe. Return for your reward!':'You can retry, or return safely with no encounter reward.';playAgain.textContent='Retry Challenge';resultBack.textContent='Return to Duck Quest';}else{resultReward.textContent=rewardHub();playAgain.textContent='Play Again';resultBack.textContent='Back to Hub';}}
  function goBack(){if(questMode){location.href='../duck-quest/?bao-cafe-return=1&v=24-309';}else location.href='../';}
  document.querySelectorAll('.bear-pick').forEach(b=>b.addEventListener('click',()=>{selectedBear=b.dataset.bear;document.querySelectorAll('.bear-pick').forEach(x=>x.classList.toggle('selected',x===b));startShift.disabled=false;}));
  startShift.addEventListener('click',()=>{if(selectedBear)begin();});backHomePick.addEventListener('click',()=>location.href='../');playAgain.addEventListener('click',()=>{if(questMode){begin();}else{selectedBear=null;resultScreen.classList.add('hidden');pickScreen.classList.remove('hidden');document.querySelectorAll('.bear-pick').forEach(x=>x.classList.remove('selected'));startShift.disabled=true;}});resultBack.addEventListener('click',goBack);mixButton.addEventListener('click',mix);clearButton.addEventListener('click',()=>{slots=[];renderSlots();setFeedback('Prep spots cleared.');});
  renderIngredients();renderSlots();
  if(questMode){selectedBear=fixedBear||'cheese';pickScreen.classList.add('hidden');begin();}
})();
