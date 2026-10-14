(()=>{
  'use strict';
  const HUB_KEY='duckHabitHubSave_v1';
  const GAME_KEY='duckdokuSave_v1';
  const DUCK_ART='../assets/ducks/Standard-duck.webp';
  const HEART_ART='../assets/bakery/drops/Pink-heart-refill.webp';
  const EXTRA_LIFE_COSTS=[50,100,200];
  const STARTING_LIVES=3;
  const MAX_EXTRA_LIVES=3;
  const DOUBLE_TAP_MS=285;
  const PUZZLES=[
  {
    "stage": 1,
    "size": 6,
    "regions": [
      1,
      1,
      2,
      2,
      2,
      0,
      1,
      1,
      1,
      2,
      2,
      2,
      1,
      1,
      1,
      2,
      2,
      2,
      1,
      3,
      1,
      1,
      2,
      2,
      3,
      3,
      4,
      4,
      4,
      4,
      5,
      5,
      4,
      4,
      4,
      4
    ],
    "solution": [
      5,
      2,
      4,
      1,
      3,
      0
    ],
    "difficulty": "Cozy",
    "rating": 37
  },
  {
    "stage": 2,
    "size": 6,
    "regions": [
      3,
      3,
      1,
      1,
      2,
      0,
      3,
      3,
      1,
      2,
      2,
      2,
      3,
      3,
      2,
      2,
      2,
      2,
      3,
      3,
      3,
      2,
      2,
      2,
      5,
      3,
      4,
      4,
      2,
      2,
      5,
      4,
      4,
      4,
      4,
      4
    ],
    "solution": [
      5,
      2,
      4,
      1,
      3,
      0
    ],
    "difficulty": "Steady",
    "rating": 60
  },
  {
    "stage": 3,
    "size": 6,
    "regions": [
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      0,
      0,
      1,
      1,
      1,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      3,
      3,
      4,
      4,
      4,
      4,
      5,
      3,
      4,
      4,
      4,
      5,
      5,
      5
    ],
    "solution": [
      2,
      0,
      3,
      5,
      1,
      4
    ],
    "difficulty": "Cozy",
    "rating": 48
  },
  {
    "stage": 4,
    "size": 6,
    "regions": [
      1,
      1,
      1,
      1,
      0,
      0,
      1,
      1,
      1,
      1,
      2,
      0,
      1,
      1,
      2,
      2,
      2,
      2,
      4,
      1,
      4,
      2,
      3,
      3,
      4,
      4,
      4,
      3,
      3,
      3,
      5,
      4,
      4,
      3,
      3,
      3
    ],
    "solution": [
      4,
      1,
      3,
      5,
      2,
      0
    ],
    "difficulty": "Tricky",
    "rating": 82
  },
  {
    "stage": 5,
    "size": 6,
    "regions": [
      0,
      0,
      0,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      1,
      0,
      2,
      2,
      1,
      1,
      1,
      2,
      2,
      3,
      3,
      1,
      4,
      2,
      2,
      2,
      3,
      4,
      4,
      2,
      2,
      5,
      5,
      5,
      4
    ],
    "solution": [
      0,
      4,
      1,
      3,
      5,
      2
    ],
    "difficulty": "Cozy",
    "rating": 54
  },
  {
    "stage": 6,
    "size": 6,
    "regions": [
      3,
      0,
      0,
      0,
      0,
      2,
      3,
      3,
      1,
      0,
      0,
      2,
      3,
      3,
      3,
      3,
      4,
      2,
      5,
      3,
      3,
      3,
      4,
      2,
      5,
      3,
      4,
      4,
      4,
      2,
      5,
      4,
      4,
      4,
      4,
      2
    ],
    "solution": [
      4,
      2,
      5,
      1,
      3,
      0
    ],
    "difficulty": "Tricky",
    "rating": 97
  },
  {
    "stage": 7,
    "size": 6,
    "regions": [
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      2,
      0,
      0,
      0,
      1,
      1,
      2,
      2,
      0,
      0,
      1,
      2,
      2,
      2,
      3,
      3,
      4,
      4,
      2,
      3,
      3,
      5,
      4,
      4,
      2,
      3,
      3,
      5
    ],
    "solution": [
      3,
      0,
      2,
      4,
      1,
      5
    ],
    "difficulty": "Steady",
    "rating": 67
  },
  {
    "stage": 8,
    "size": 6,
    "regions": [
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      3,
      2,
      2,
      2,
      1,
      1,
      3,
      3,
      2,
      2,
      5,
      1,
      3,
      3,
      3,
      4,
      5,
      5,
      3,
      3,
      5,
      5,
      5,
      5
    ],
    "solution": [
      1,
      4,
      2,
      0,
      3,
      5
    ],
    "difficulty": "Sneaky",
    "rating": 136
  },
  {
    "stage": 9,
    "size": 6,
    "regions": [
      0,
      2,
      2,
      2,
      1,
      1,
      2,
      2,
      1,
      1,
      1,
      3,
      2,
      2,
      2,
      4,
      3,
      3,
      2,
      4,
      4,
      4,
      3,
      5,
      2,
      4,
      4,
      4,
      3,
      5,
      2,
      2,
      4,
      4,
      5,
      5
    ],
    "solution": [
      0,
      3,
      1,
      4,
      2,
      5
    ],
    "difficulty": "Steady",
    "rating": 72
  },
  {
    "stage": 10,
    "size": 6,
    "regions": [
      0,
      0,
      0,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      1,
      2,
      2,
      2,
      1,
      1,
      1,
      2,
      3,
      3,
      5,
      5,
      1,
      2,
      2,
      5,
      5,
      4,
      4,
      5,
      5,
      5,
      5,
      4,
      4
    ],
    "solution": [
      1,
      4,
      0,
      2,
      5,
      3
    ],
    "difficulty": "Tricky",
    "rating": 76
  },
  {
    "stage": 11,
    "size": 6,
    "regions": [
      0,
      2,
      1,
      1,
      1,
      1,
      2,
      2,
      2,
      1,
      1,
      1,
      2,
      2,
      4,
      1,
      1,
      1,
      2,
      2,
      4,
      4,
      1,
      3,
      2,
      4,
      4,
      5,
      5,
      5,
      4,
      4,
      4,
      4,
      5,
      5
    ],
    "solution": [
      0,
      3,
      1,
      5,
      2,
      4
    ],
    "difficulty": "Cozy",
    "rating": 52
  },
  {
    "stage": 12,
    "size": 6,
    "regions": [
      0,
      0,
      0,
      0,
      0,
      2,
      1,
      2,
      2,
      2,
      2,
      2,
      4,
      4,
      4,
      3,
      3,
      2,
      4,
      4,
      4,
      3,
      3,
      3,
      4,
      4,
      4,
      3,
      3,
      5,
      4,
      4,
      4,
      4,
      5,
      5
    ],
    "solution": [
      2,
      0,
      5,
      3,
      1,
      4
    ],
    "difficulty": "Sneaky",
    "rating": 138
  },
  {
    "stage": 13,
    "size": 6,
    "regions": [
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      2,
      2,
      0,
      3,
      4,
      4,
      2,
      2,
      3,
      3,
      4,
      4,
      4,
      4,
      3,
      5,
      4,
      4,
      4,
      4,
      3,
      5
    ],
    "solution": [
      3,
      0,
      2,
      4,
      1,
      5
    ],
    "difficulty": "Steady",
    "rating": 72
  },
  {
    "stage": 14,
    "size": 6,
    "regions": [
      0,
      0,
      0,
      1,
      1,
      2,
      0,
      1,
      1,
      1,
      1,
      2,
      0,
      3,
      1,
      2,
      2,
      2,
      0,
      3,
      3,
      2,
      2,
      4,
      3,
      3,
      3,
      4,
      4,
      4,
      3,
      3,
      4,
      4,
      5,
      5
    ],
    "solution": [
      0,
      2,
      4,
      1,
      3,
      5
    ],
    "difficulty": "Tricky",
    "rating": 85
  },
  {
    "stage": 15,
    "size": 6,
    "regions": [
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1,
      1,
      1,
      4,
      2,
      0,
      1,
      1,
      1,
      4,
      4,
      4,
      3,
      3,
      3,
      4,
      4,
      3,
      3,
      3,
      3,
      4,
      4,
      3,
      3,
      3,
      5
    ],
    "solution": [
      2,
      4,
      1,
      3,
      0,
      5
    ],
    "difficulty": "Steady",
    "rating": 62
  },
  {
    "stage": 16,
    "size": 6,
    "regions": [
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      1,
      0,
      0,
      0,
      4,
      1,
      2,
      2,
      3,
      3,
      4,
      1,
      4,
      2,
      2,
      3,
      4,
      4,
      4,
      2,
      5,
      5,
      4,
      4,
      4,
      2,
      5,
      5
    ],
    "solution": [
      3,
      0,
      2,
      5,
      1,
      4
    ],
    "difficulty": "Sneaky",
    "rating": 140
  },
  {
    "stage": 17,
    "size": 6,
    "regions": [
      0,
      2,
      2,
      1,
      1,
      1,
      2,
      2,
      2,
      1,
      1,
      1,
      2,
      2,
      2,
      2,
      3,
      3,
      2,
      2,
      4,
      3,
      3,
      3,
      4,
      4,
      4,
      4,
      4,
      4,
      5,
      5,
      4,
      4,
      4,
      4
    ],
    "solution": [
      0,
      4,
      2,
      5,
      3,
      1
    ],
    "difficulty": "Steady",
    "rating": 74
  },
  {
    "stage": 18,
    "size": 6,
    "regions": [
      1,
      1,
      1,
      2,
      2,
      0,
      1,
      1,
      1,
      2,
      2,
      0,
      1,
      1,
      2,
      2,
      2,
      5,
      4,
      4,
      3,
      5,
      2,
      5,
      4,
      4,
      5,
      5,
      2,
      5,
      4,
      4,
      4,
      5,
      5,
      5
    ],
    "solution": [
      5,
      1,
      4,
      2,
      0,
      3
    ],
    "difficulty": "Tricky",
    "rating": 89
  },
  {
    "stage": 19,
    "size": 6,
    "regions": [
      0,
      0,
      1,
      1,
      1,
      1,
      0,
      2,
      1,
      1,
      1,
      1,
      0,
      2,
      1,
      1,
      1,
      3,
      4,
      4,
      4,
      1,
      3,
      3,
      4,
      4,
      4,
      1,
      5,
      3,
      4,
      4,
      5,
      5,
      5,
      3
    ],
    "solution": [
      0,
      3,
      1,
      5,
      2,
      4
    ],
    "difficulty": "Steady",
    "rating": 65
  },
  {
    "stage": 20,
    "size": 6,
    "regions": [
      0,
      0,
      0,
      1,
      1,
      1,
      0,
      0,
      2,
      1,
      1,
      1,
      2,
      2,
      2,
      5,
      5,
      1,
      3,
      3,
      4,
      5,
      5,
      5,
      4,
      4,
      4,
      4,
      5,
      5,
      4,
      4,
      4,
      5,
      5,
      5
    ],
    "solution": [
      1,
      4,
      2,
      0,
      3,
      5
    ],
    "difficulty": "Sneaky",
    "rating": 162
  },
  {
    "stage": 21,
    "size": 6,
    "regions": [
      0,
      0,
      0,
      1,
      1,
      1,
      0,
      2,
      0,
      2,
      1,
      1,
      0,
      2,
      2,
      2,
      1,
      1,
      3,
      3,
      2,
      2,
      4,
      1,
      3,
      3,
      2,
      4,
      4,
      4,
      5,
      3,
      3,
      4,
      4,
      4
    ],
    "solution": [
      2,
      5,
      3,
      1,
      4,
      0
    ],
    "difficulty": "Tricky",
    "rating": 79
  },
  {
    "stage": 22,
    "size": 6,
    "regions": [
      2,
      1,
      1,
      0,
      0,
      0,
      2,
      1,
      1,
      1,
      1,
      0,
      2,
      2,
      2,
      3,
      1,
      0,
      4,
      2,
      4,
      3,
      3,
      0,
      4,
      4,
      4,
      3,
      3,
      3,
      4,
      4,
      4,
      4,
      4,
      5
    ],
    "solution": [
      4,
      2,
      0,
      3,
      1,
      5
    ],
    "difficulty": "Tricky",
    "rating": 93
  },
  {
    "stage": 23,
    "size": 6,
    "regions": [
      0,
      0,
      0,
      1,
      1,
      1,
      0,
      0,
      1,
      1,
      1,
      1,
      3,
      1,
      1,
      1,
      2,
      2,
      3,
      3,
      1,
      2,
      2,
      2,
      3,
      3,
      2,
      2,
      5,
      4,
      3,
      3,
      3,
      5,
      5,
      5
    ],
    "solution": [
      0,
      2,
      4,
      1,
      5,
      3
    ],
    "difficulty": "Steady",
    "rating": 72
  },
  {
    "stage": 24,
    "size": 6,
    "regions": [
      2,
      3,
      0,
      0,
      0,
      0,
      2,
      3,
      3,
      1,
      0,
      0,
      2,
      5,
      3,
      3,
      3,
      4,
      2,
      5,
      3,
      4,
      4,
      4,
      2,
      5,
      5,
      5,
      4,
      4,
      2,
      5,
      4,
      4,
      4,
      4
    ],
    "solution": [
      5,
      3,
      0,
      2,
      4,
      1
    ],
    "difficulty": "Sneaky",
    "rating": 140
  }
];

  const $=s=>document.querySelector(s);
  const board=$('#board'), statusText=$('#statusText'), levelText=$('#levelText'), scoreText=$('#scoreText');
  const livesDisplay=$('#livesDisplay'), coinText=$('#coinText'), buyLifeButton=$('#buyLifeButton');
  const hintButton=$('#hintButton'), revealButton=$('#revealButton'), scanButton=$('#scanButton');
  const hintCount=$('#hintCount'), revealCount=$('#revealCount'), scanCount=$('#scanCount');
  const modalBackdrop=$('#modalBackdrop'), levelModal=$('#levelModal'), settingsModal=$('#settingsModal'), lifeModal=$('#lifeModal');
  const resultModal=$('#resultModal'), gameOverModal=$('#gameOverModal'), levelGrid=$('#levelGrid');
  const confirmLifeButton=$('#confirmLifeButton'), lifeCopy=$('#lifeCopy'), gameOverBuy=$('#gameOverBuy');
  const scanFx=$('#scanFx');

  let stage=1,puzzle=null,marks=[],lives=STARTING_LIVES,extraLivesBought=0,score=0;
  let helperUses={hint:1,reveal:1,scan:1};
  let complete=false;
  let pointerDown=false,dragging=false,lastDragIndex=-1,startX=0,startY=0;
  let tapTimer=null,lastTapIndex=-1,lastTapAt=0;

  function readJSON(key,fallback){try{return JSON.parse(localStorage.getItem(key)||'')||fallback;}catch{return fallback;}}
  function writeJSON(key,value){localStorage.setItem(key,JSON.stringify(value));}
  function readHub(){return readJSON(HUB_KEY,{coins:0});}
  function writeHub(hub){writeJSON(HUB_KEY,hub);}
  function readProgress(){
    const p=readJSON(GAME_KEY,{});
    return {unlocked:Math.max(1,Math.min(PUZZLES.length,Number(p.unlocked)||1)),completed:p.completed&&typeof p.completed==='object'?p.completed:{},best:p.best&&typeof p.best==='object'?p.best:{}};
  }
  function writeProgress(p){writeJSON(GAME_KEY,p);}
  function setStatus(text,kind=''){statusText.textContent=text;statusText.dataset.kind=kind;}
  function setScore(value){score=Math.max(0,Math.round(value));scoreText.textContent=score.toLocaleString();}
  function cellIndex(r,c){return r*puzzle.size+c;}
  function isSolution(index){const r=Math.floor(index/puzzle.size),c=index%puzzle.size;return puzzle.solution[r]===c;}
  function placedDuckIndices(){const out=[];marks.forEach((m,i)=>{if(m==='duck')out.push(i);});return out;}
  function isBlockedByPlaced(index){
    const n=puzzle.size,r=Math.floor(index/n),c=index%n;
    for(const idx of placedDuckIndices()){
      const rr=Math.floor(idx/n),cc=idx%n;
      if(rr===r||cc===c||Math.abs(rr-r)<=1&&Math.abs(cc-c)<=1)return true;
      if(puzzle.regions[idx]===puzzle.regions[index])return true;
    }
    return false;
  }
  function renderCoins(){const hub=readHub();coinText.textContent=Math.max(0,Number(hub.coins)||0).toLocaleString();}
  function renderLives(){
    livesDisplay.innerHTML='';
    const totalSlots=STARTING_LIVES+MAX_EXTRA_LIVES;
    for(let i=0;i<totalSlots;i++){
      const img=document.createElement('img');img.src=HEART_ART;img.alt=i<lives?'Life':'Lost life';img.className='life-icon'+(i>=lives?' lost':'');livesDisplay.append(img);
    }
    buyLifeButton.disabled=complete||extraLivesBought>=MAX_EXTRA_LIVES;
    const next=EXTRA_LIFE_COSTS[extraLivesBought];
    buyLifeButton.textContent=extraLivesBought>=MAX_EXTRA_LIVES?'Life maxed':`+ Life ${next}♥`;
  }
  function renderHelpers(){
    hintCount.textContent=helperUses.hint;revealCount.textContent=helperUses.reveal;scanCount.textContent=helperUses.scan;
    hintButton.disabled=complete||helperUses.hint<=0;revealButton.disabled=complete||helperUses.reveal<=0;scanButton.disabled=complete||helperUses.scan<=0;
  }
  function regionBoundaryClass(index){
    const n=puzzle.size,r=Math.floor(index/n),c=index%n,reg=puzzle.regions[index],a=[];
    if(r===0||puzzle.regions[index-n]!==reg)a.push('region-top');
    if(r===n-1||puzzle.regions[index+n]!==reg)a.push('region-bottom');
    if(c===0||puzzle.regions[index-1]!==reg)a.push('region-left');
    if(c===n-1||puzzle.regions[index+1]!==reg)a.push('region-right');
    return a.join(' ');
  }
  function renderCell(index){
    const el=board.children[index];if(!el)return;
    el.classList.remove('mark-x','red-x','duck-cell','scan-new');
    el.replaceChildren();
    const mark=marks[index];
    if(mark==='x')el.classList.add('mark-x');
    if(mark==='red')el.classList.add('red-x');
    if(mark==='duck'){
      el.classList.add('duck-cell');const img=document.createElement('img');img.src=DUCK_ART;img.alt='Duck';el.append(img);
    }
    el.setAttribute('aria-label',`Row ${Math.floor(index/puzzle.size)+1}, column ${index%puzzle.size+1}${mark==='x'?', marked X':mark==='red'?', wrong guess':mark==='duck'?', Duck':''}`);
  }
  function renderBoard(){
    board.innerHTML='';board.style.setProperty('--n',puzzle.size);
    puzzle.regions.forEach((reg,index)=>{
      const b=document.createElement('button');b.type='button';b.className=`cell region-${reg%6} ${regionBoundaryClass(index)}`;b.dataset.index=index;b.setAttribute('role','gridcell');board.append(b);
    });
    marks.forEach((_,i)=>renderCell(i));
  }
  function resetPuzzle(nextStage=stage){
    closeModals();stage=Math.max(1,Math.min(PUZZLES.length,nextStage));puzzle=PUZZLES[stage-1];
    marks=Array(puzzle.size*puzzle.size).fill('');lives=STARTING_LIVES;extraLivesBought=0;helperUses={hint:1,reveal:1,scan:1};complete=false;
    setScore(0);levelText.textContent=stage;renderBoard();renderLives();renderHelpers();renderCoins();renderLevelGrid();
    setStatus('Tap to X · Double tap to place a Duck · Swipe to mark Xs');
  }
  function toggleX(index){
    if(complete||marks[index]==='red'||marks[index]==='duck')return;
    marks[index]=marks[index]==='x'?'':'x';renderCell(index);
  }
  function addSwipeX(index){
    if(complete||index<0||marks[index])return;
    marks[index]='x';renderCell(index);
  }
  function attemptDuck(index,source='player'){
    if(complete||marks[index]==='duck'||marks[index]==='red')return;
    if(isSolution(index)){
      marks[index]='duck';renderCell(index);
      if(source==='player'){setScore(score+100);setStatus('Correct! 🦆','good');}
      else setStatus(source==='reveal'?'A Duck was revealed! 🦆':'Duck found!','good');
      checkComplete();
    }else if(source==='player'){
      marks[index]='red';renderCell(index);lives=Math.max(0,lives-1);setScore(score-25);renderLives();
      board.classList.remove('shake');void board.offsetWidth;board.classList.add('shake');setStatus('Oops — red X! One life lost.','bad');
      if(lives<=0)setTimeout(()=>openGameOver(),250);
    }
  }
  function checkComplete(){
    if(puzzle.solution.every((c,r)=>marks[cellIndex(r,c)]==='duck'))finishPuzzle();
  }
  function finishPuzzle(){
    complete=true;renderHelpers();renderLives();setScore(score+300);
    const progress=readProgress();progress.completed[String(stage)]=true;progress.best[String(stage)]=Math.max(Number(progress.best[String(stage)])||0,score);
    if(stage<PUZZLES.length)progress.unlocked=Math.max(progress.unlocked,stage+1);writeProgress(progress);renderLevelGrid();
    $('#resultScore').textContent=score.toLocaleString();$('#resultDifficulty').textContent=puzzle.difficulty;
    $('#resultCopy').textContent=stage<PUZZLES.length?'Another puzzle is ready! Difficulty can jump up or down from level to level.':'You cleared the first Duckdoku 6×6 set!';
    $('#nextLevelButton').textContent=stage<PUZZLES.length?'Next Level':'Level Select';
    setTimeout(()=>openModal(resultModal),350);
  }

  function possibleCellsForRegion(reg){
    const cells=[];
    for(let i=0;i<marks.length;i++){
      if(puzzle.regions[i]!==reg||marks[i]==='red'||marks[i]==='duck'||isBlockedByPlaced(i))continue;
      cells.push(i);
    }
    return cells;
  }
  function useHint(){
    if(helperUses.hint<=0||complete)return;helperUses.hint--;renderHelpers();
    board.querySelectorAll('.hint-cell').forEach(x=>x.classList.remove('hint-cell'));
    const solvedRegions=new Set(placedDuckIndices().map(i=>puzzle.regions[i]));
    let choices=[];
    for(let r=0;r<puzzle.size;r++)if(!solvedRegions.has(r)){const cells=possibleCellsForRegion(r);if(cells.length)choices.push({r,cells});}
    choices.sort((a,b)=>a.cells.length-b.cells.length);
    const chosen=choices[0];
    if(!chosen){setStatus('No useful hint left — try Reveal!');return;}
    chosen.cells.forEach(i=>board.children[i]?.classList.add('hint-cell'));
    setTimeout(()=>chosen.cells.forEach(i=>board.children[i]?.classList.remove('hint-cell')),2600);
    setStatus(chosen.cells.length===1?'This color has only one open possibility! ✨':'Look closely at the highlighted color region. ✨');
  }
  function useReveal(){
    if(helperUses.reveal<=0||complete)return;
    const unresolved=puzzle.solution.map((c,r)=>cellIndex(r,c)).filter(i=>marks[i]!=='duck');
    if(!unresolved.length)return;helperUses.reveal--;renderHelpers();
    const idx=unresolved[Math.floor(Math.random()*unresolved.length)];marks[idx]='';attemptDuck(idx,'reveal');
  }
  function useScan(){
    if(helperUses.scan<=0||complete)return;
    const safe=[];for(let i=0;i<marks.length;i++)if(!marks[i]&&!isSolution(i))safe.push(i);
    if(!safe.length){setStatus('UFONO cannot find any more safe Xs!');return;}
    helperUses.scan--;renderHelpers();
    scanFx.classList.remove('active');void scanFx.offsetWidth;scanFx.classList.add('active');
    const amount=Math.min(safe.length,3+Math.floor(Math.random()*3));
    for(let k=safe.length-1;k>0;k--){const j=Math.floor(Math.random()*(k+1));[safe[k],safe[j]]=[safe[j],safe[k]];}
    safe.slice(0,amount).forEach((idx,n)=>setTimeout(()=>{if(!marks[idx]){marks[idx]='x';renderCell(idx);board.children[idx]?.classList.add('scan-new');}},430+n*90));
    setStatus(`UFONO Scan found ${amount} impossible spaces! 👽`);
    setTimeout(()=>scanFx.classList.remove('active'),1200);
  }

  function nextLifeCost(){return EXTRA_LIFE_COSTS[extraLivesBought]??null;}
  function updateLifeModal(){
    const hub=readHub(),cost=nextLifeCost();
    if(cost==null){lifeCopy.textContent='You already bought all 3 extra lives for this puzzle.';confirmLifeButton.disabled=true;confirmLifeButton.textContent='Extra-life limit reached';return;}
    const coins=Math.max(0,Number(hub.coins)||0);lifeCopy.textContent=`Extra life ${extraLivesBought+1} of 3 costs ${cost} Pink Coins. You have ${coins.toLocaleString()}.`;
    confirmLifeButton.disabled=coins<cost;confirmLifeButton.textContent=coins<cost?`Need ${cost} Pink Coins`:`Buy +1 Life · ${cost} coins`;
  }
  function buyLife(){
    const cost=nextLifeCost();if(cost==null)return false;const hub=readHub();const coins=Math.max(0,Number(hub.coins)||0);if(coins<cost)return false;
    hub.coins=coins-cost;writeHub(hub);extraLivesBought++;lives++;renderCoins();renderLives();updateLifeModal();setStatus('Extra life added! 💗','good');return true;
  }

  function openModal(el){closeModals();modalBackdrop.classList.remove('hidden');modalBackdrop.setAttribute('aria-hidden','false');el.classList.remove('hidden');}
  function closeModals(){document.querySelectorAll('.modal').forEach(m=>m.classList.add('hidden'));modalBackdrop.classList.add('hidden');modalBackdrop.setAttribute('aria-hidden','true');}
  function openGameOver(){
    updateGameOver();openModal(gameOverModal);
  }
  function updateGameOver(){
    const cost=nextLifeCost(),hub=readHub(),coins=Math.max(0,Number(hub.coins)||0);
    if(cost==null){$('#gameOverCopy').textContent='You used all 3 extra-life purchases for this puzzle.';gameOverBuy.disabled=true;gameOverBuy.textContent='Extra-life limit reached';}
    else{$('#gameOverCopy').textContent=`Buy another life for ${cost} Pink Coins, or restart the puzzle.`;gameOverBuy.disabled=coins<cost;gameOverBuy.textContent=coins<cost?`Need ${cost} Pink Coins`:`Buy +1 Life · ${cost} coins`;}
  }
  function renderLevelGrid(){
    const p=readProgress();levelGrid.innerHTML='';
    PUZZLES.forEach((item,i)=>{const n=i+1,b=document.createElement('button');b.type='button';b.className='level-choice';b.textContent=n;b.disabled=n>p.unlocked;b.classList.toggle('current',n===stage);b.classList.toggle('done',!!p.completed[String(n)]);b.addEventListener('click',()=>resetPuzzle(n));levelGrid.append(b);});
  }

  function boardIndexFromPoint(x,y){const el=document.elementFromPoint(x,y)?.closest?.('.cell');return el&&board.contains(el)?Number(el.dataset.index):-1;}
  board.addEventListener('pointerdown',e=>{
    if(complete)return;const cell=e.target.closest('.cell');if(!cell)return;
    pointerDown=true;dragging=false;lastDragIndex=Number(cell.dataset.index);startX=e.clientX;startY=e.clientY;board.setPointerCapture?.(e.pointerId);
  });
  board.addEventListener('pointermove',e=>{
    if(!pointerDown||complete)return;
    if(!dragging&&Math.hypot(e.clientX-startX,e.clientY-startY)>8){dragging=true;clearTimeout(tapTimer);addSwipeX(lastDragIndex);}
    if(!dragging)return;const idx=boardIndexFromPoint(e.clientX,e.clientY);if(idx>=0&&idx!==lastDragIndex){lastDragIndex=idx;addSwipeX(idx);}
  });
  board.addEventListener('pointerup',e=>{
    if(!pointerDown)return;pointerDown=false;if(dragging){dragging=false;lastTapIndex=-1;setStatus('Xs marked!');return;}
    const cell=e.target.closest('.cell');if(!cell)return;const idx=Number(cell.dataset.index),now=Date.now();
    if(idx===lastTapIndex&&now-lastTapAt<=DOUBLE_TAP_MS){clearTimeout(tapTimer);tapTimer=null;lastTapIndex=-1;lastTapAt=0;attemptDuck(idx,'player');}
    else{lastTapIndex=idx;lastTapAt=now;clearTimeout(tapTimer);tapTimer=setTimeout(()=>{toggleX(idx);lastTapIndex=-1;tapTimer=null;},DOUBLE_TAP_MS);}
  });
  board.addEventListener('pointercancel',()=>{pointerDown=false;dragging=false;});
  board.addEventListener('contextmenu',e=>e.preventDefault());

  $('#backButton').addEventListener('click',()=>location.href='../');
  $('#levelButton').addEventListener('click',()=>{renderLevelGrid();openModal(levelModal);});
  $('#settingsButton').addEventListener('click',()=>openModal(settingsModal));
  $('#restartButton').addEventListener('click',()=>resetPuzzle(stage));
  document.querySelectorAll('[data-close-modal]').forEach(b=>b.addEventListener('click',closeModals));
  modalBackdrop.addEventListener('click',closeModals);
  hintButton.addEventListener('click',useHint);revealButton.addEventListener('click',useReveal);scanButton.addEventListener('click',useScan);
  buyLifeButton.addEventListener('click',()=>{updateLifeModal();openModal(lifeModal);});
  confirmLifeButton.addEventListener('click',()=>{if(buyLife())closeModals();});
  gameOverBuy.addEventListener('click',()=>{if(buyLife())closeModals();else updateGameOver();});
  $('#retryButton').addEventListener('click',()=>resetPuzzle(stage));
  $('#gameOverHome').addEventListener('click',()=>location.href='../');
  $('#replayButton').addEventListener('click',()=>resetPuzzle(stage));
  $('#nextLevelButton').addEventListener('click',()=>{if(stage<PUZZLES.length)resetPuzzle(stage+1);else{renderLevelGrid();openModal(levelModal);}});

  const progress=readProgress();stage=Math.max(1,Math.min(progress.unlocked,Number(new URLSearchParams(location.search).get('level'))||progress.unlocked));resetPuzzle(stage);
})();
