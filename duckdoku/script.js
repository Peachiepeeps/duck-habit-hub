(()=>{
  'use strict';
  const HUB_KEY='duckHabitHubSave_v1';
  const GAME_KEY='duckdokuSave_v1';
  const DUCK_ART='../assets/ducks/Standard-duck.webp';
  const HEART_ART='../assets/bakery/drops/Pink-heart-refill.webp';
  const EXTRA_LIFE_COSTS=[50,100,200];
  const STARTING_LIVES=3;
  const MAX_EXTRA_LIVES=3;
  const DOUBLE_TAP_MS=360;
  // v24.321: every puzzle secretly includes at least one one-cell color region,
  // giving the player one guaranteed easy starting Duck without advertising the rule.
  const PUZZLES=[
  {
    "stage": 1,
    "size": 6,
    "regions": [
      1,
      1,
      0,
      0,
      0,
      0,
      1,
      1,
      2,
      0,
      0,
      3,
      1,
      1,
      2,
      2,
      0,
      3,
      1,
      5,
      2,
      2,
      0,
      3,
      5,
      5,
      4,
      2,
      3,
      3,
      5,
      5,
      5,
      2,
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
    "difficulty": "Cozy",
    "rating": 45
  },
  {
    "stage": 2,
    "size": 6,
    "regions": [
      3,
      3,
      0,
      1,
      1,
      1,
      3,
      3,
      3,
      2,
      2,
      1,
      3,
      3,
      2,
      2,
      2,
      2,
      3,
      5,
      4,
      4,
      4,
      2,
      3,
      5,
      5,
      4,
      4,
      4,
      5,
      5,
      5,
      4,
      4,
      4
    ],
    "solution": [
      2,
      5,
      3,
      0,
      4,
      1
    ],
    "difficulty": "Steady",
    "rating": 62
  },
  {
    "stage": 3,
    "size": 6,
    "regions": [
      1,
      1,
      0,
      0,
      0,
      0,
      1,
      1,
      0,
      0,
      0,
      2,
      1,
      1,
      2,
      2,
      2,
      2,
      4,
      4,
      2,
      2,
      3,
      5,
      4,
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
      3,
      0,
      2,
      4,
      1,
      5
    ],
    "difficulty": "Cozy",
    "rating": 41
  },
  {
    "stage": 4,
    "size": 6,
    "regions": [
      0,
      0,
      0,
      0,
      1,
      1,
      0,
      0,
      0,
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
      2,
      2,
      2,
      2,
      1,
      3,
      3,
      5,
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
    "difficulty": "Tricky",
    "rating": 90
  },
  {
    "stage": 5,
    "size": 6,
    "regions": [
      0,
      0,
      0,
      0,
      0,
      0,
      4,
      0,
      0,
      3,
      1,
      1,
      4,
      2,
      0,
      3,
      3,
      1,
      4,
      4,
      4,
      3,
      3,
      1,
      5,
      4,
      4,
      3,
      3,
      1,
      5,
      5,
      5,
      3,
      3,
      1
    ],
    "solution": [
      3,
      5,
      1,
      4,
      2,
      0
    ],
    "difficulty": "Steady",
    "rating": 71
  },
  {
    "stage": 6,
    "size": 6,
    "regions": [
      0,
      0,
      0,
      0,
      2,
      2,
      0,
      3,
      1,
      3,
      2,
      2,
      3,
      3,
      3,
      3,
      2,
      2,
      3,
      3,
      5,
      2,
      2,
      4,
      3,
      5,
      5,
      4,
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
      0,
      2,
      4,
      1,
      5,
      3
    ],
    "difficulty": "Cozy",
    "rating": 44
  },
  {
    "stage": 7,
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
      0,
      2,
      0,
      2,
      1,
      1,
      2,
      2,
      2,
      2,
      1,
      1,
      2,
      3,
      3,
      3,
      1,
      1,
      5,
      4,
      3,
      3,
      5,
      5,
      5,
      5,
      3,
      3
    ],
    "solution": [
      4,
      0,
      2,
      5,
      3,
      1
    ],
    "difficulty": "Sneaky",
    "rating": 119
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
      1,
      0,
      0,
      1,
      1,
      1,
      1,
      0,
      0,
      2,
      1,
      1,
      4,
      3,
      2,
      2,
      1,
      4,
      4,
      5,
      2,
      2,
      4,
      4,
      4,
      5,
      5,
      2,
      4,
      4,
      4
    ],
    "solution": [
      3,
      5,
      2,
      0,
      4,
      1
    ],
    "difficulty": "Steady",
    "rating": 62
  },
  {
    "stage": 9,
    "size": 6,
    "regions": [
      0,
      1,
      1,
      1,
      1,
      2,
      3,
      1,
      1,
      1,
      1,
      2,
      3,
      3,
      1,
      2,
      2,
      2,
      3,
      3,
      3,
      4,
      2,
      2,
      5,
      3,
      3,
      4,
      4,
      4,
      5,
      5,
      3,
      4,
      4,
      4
    ],
    "solution": [
      0,
      3,
      5,
      2,
      4,
      1
    ],
    "difficulty": "Cozy",
    "rating": 47
  },
  {
    "stage": 10,
    "size": 6,
    "regions": [
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
      1,
      1,
      2,
      2,
      2,
      2,
      1,
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
      3,
      3,
      4,
      5,
      4,
      4,
      3,
      3
    ],
    "solution": [
      0,
      4,
      2,
      5,
      3,
      1
    ],
    "difficulty": "Tricky",
    "rating": 84
  },
  {
    "stage": 11,
    "size": 6,
    "regions": [
      0,
      0,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      4,
      2,
      0,
      3,
      3,
      1,
      4,
      3,
      3,
      3,
      4,
      4,
      4,
      5,
      5,
      5,
      5,
      4,
      4,
      5,
      5,
      5,
      5,
      5,
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
    "difficulty": "Steady",
    "rating": 71
  },
  {
    "stage": 12,
    "size": 6,
    "regions": [
      1,
      1,
      0,
      0,
      0,
      0,
      1,
      1,
      0,
      0,
      2,
      2,
      1,
      1,
      0,
      2,
      2,
      2,
      1,
      4,
      0,
      2,
      3,
      3,
      4,
      4,
      4,
      4,
      3,
      3,
      4,
      4,
      4,
      4,
      5,
      3
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
    "rating": 50
  },
  {
    "stage": 13,
    "size": 6,
    "regions": [
      0,
      0,
      0,
      1,
      1,
      1,
      2,
      2,
      0,
      0,
      1,
      1,
      2,
      2,
      3,
      3,
      3,
      1,
      2,
      2,
      2,
      2,
      3,
      1,
      4,
      2,
      4,
      3,
      3,
      1,
      4,
      4,
      4,
      5,
      3,
      3
    ],
    "solution": [
      2,
      5,
      1,
      4,
      0,
      3
    ],
    "difficulty": "Tricky",
    "rating": 99
  },
  {
    "stage": 14,
    "size": 6,
    "regions": [
      2,
      2,
      0,
      0,
      0,
      0,
      2,
      2,
      2,
      1,
      0,
      4,
      2,
      5,
      3,
      3,
      4,
      4,
      5,
      5,
      3,
      3,
      4,
      4,
      5,
      5,
      3,
      3,
      4,
      4,
      5,
      5,
      5,
      3,
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
    "difficulty": "Steady",
    "rating": 62
  },
  {
    "stage": 15,
    "size": 6,
    "regions": [
      0,
      0,
      1,
      1,
      1,
      1,
      0,
      3,
      3,
      1,
      1,
      1,
      0,
      2,
      3,
      3,
      1,
      1,
      3,
      3,
      3,
      3,
      4,
      4,
      5,
      5,
      5,
      4,
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
      0,
      4,
      1,
      3,
      5,
      2
    ],
    "difficulty": "Cozy",
    "rating": 53
  },
  {
    "stage": 16,
    "size": 6,
    "regions": [
      2,
      3,
      3,
      0,
      1,
      1,
      2,
      3,
      3,
      1,
      1,
      1,
      2,
      3,
      3,
      1,
      4,
      4,
      3,
      3,
      3,
      4,
      4,
      4,
      5,
      5,
      3,
      4,
      4,
      4,
      5,
      5,
      5,
      4,
      4,
      4
    ],
    "solution": [
      3,
      5,
      0,
      2,
      4,
      1
    ],
    "difficulty": "Steady",
    "rating": 62
  },
  {
    "stage": 17,
    "size": 6,
    "regions": [
      2,
      2,
      1,
      1,
      0,
      0,
      2,
      2,
      1,
      1,
      1,
      0,
      2,
      2,
      1,
      1,
      3,
      0,
      2,
      5,
      5,
      3,
      3,
      3,
      5,
      5,
      5,
      3,
      3,
      4,
      5,
      5,
      5,
      3,
      3,
      3
    ],
    "solution": [
      4,
      2,
      0,
      3,
      5,
      1
    ],
    "difficulty": "Tricky",
    "rating": 89
  },
  {
    "stage": 18,
    "size": 6,
    "regions": [
      0,
      0,
      0,
      3,
      3,
      3,
      0,
      0,
      2,
      1,
      3,
      3,
      0,
      2,
      2,
      2,
      3,
      5,
      4,
      4,
      4,
      4,
      3,
      5,
      4,
      4,
      4,
      3,
      3,
      5,
      4,
      5,
      5,
      5,
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
    "difficulty": "Cozy",
    "rating": 38
  },
  {
    "stage": 19,
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
      1,
      5,
      1,
      0,
      0,
      2,
      3,
      5,
      5,
      4,
      4,
      2,
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
      4
    ],
    "solution": [
      4,
      2,
      5,
      0,
      3,
      1
    ],
    "difficulty": "Steady",
    "rating": 71
  },
  {
    "stage": 20,
    "size": 6,
    "regions": [
      1,
      1,
      0,
      2,
      2,
      2,
      1,
      1,
      1,
      1,
      2,
      2,
      3,
      3,
      1,
      5,
      5,
      2,
      3,
      3,
      3,
      3,
      5,
      2,
      4,
      4,
      4,
      3,
      5,
      5,
      4,
      4,
      4,
      3,
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
    "difficulty": "Tricky",
    "rating": 86
  },
  {
    "stage": 21,
    "size": 6,
    "regions": [
      1,
      1,
      1,
      0,
      0,
      0,
      4,
      1,
      1,
      0,
      0,
      0,
      4,
      1,
      1,
      2,
      2,
      2,
      4,
      4,
      5,
      3,
      2,
      2,
      4,
      4,
      5,
      5,
      5,
      5,
      4,
      4,
      5,
      5,
      5,
      5
    ],
    "solution": [
      4,
      1,
      5,
      3,
      0,
      2
    ],
    "difficulty": "Cozy",
    "rating": 41
  },
  {
    "stage": 22,
    "size": 6,
    "regions": [
      1,
      1,
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
      2,
      4,
      1,
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
      5,
      3,
      5,
      4,
      5,
      5,
      5,
      5,
      5
    ],
    "solution": [
      5,
      3,
      1,
      4,
      0,
      2
    ],
    "difficulty": "Sneaky",
    "rating": 114
  },
  {
    "stage": 23,
    "size": 6,
    "regions": [
      5,
      3,
      0,
      0,
      0,
      0,
      5,
      3,
      1,
      0,
      0,
      0,
      5,
      3,
      3,
      2,
      2,
      0,
      5,
      3,
      3,
      2,
      2,
      2,
      5,
      5,
      4,
      4,
      2,
      2,
      5,
      5,
      4,
      2,
      2,
      2
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
    "rating": 71
  },
  {
    "stage": 24,
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
      0,
      2,
      0,
      0,
      1,
      1,
      0,
      2,
      2,
      2,
      3,
      1,
      3,
      2,
      2,
      2,
      3,
      3,
      3,
      3,
      3,
      4,
      3,
      5,
      3,
      4,
      4,
      4
    ],
    "solution": [
      3,
      0,
      4,
      2,
      5,
      1
    ],
    "difficulty": "Tricky",
    "rating": 94
  }
];


  // v24.340: reproducible, validated, on-demand levels. Keep the original
  // handcrafted levels unchanged; generate a new 6x6 puzzle for every later
  // level, without an arbitrary level-pack limit or a growing memory cache.
  const HANDMADE_COUNT=PUZZLES.length;
  const LEVELS_PER_PAGE=30;
  const MAX_SAFE_LEVEL=Number.MAX_SAFE_INTEGER-1;
  const QUEEN_LAYOUTS=(()=>{
    const layouts=[],columns=[];
    function visit(r,used){
      if(r===6){layouts.push(columns.slice());return;}
      for(let c=0;c<6;c++){
        if((used&(1<<c)) || (r>0&&Math.abs(columns[r-1]-c)<=1))continue;
        columns.push(c);visit(r+1,used|(1<<c));columns.pop();
      }
    }
    visit(0,0);
    return layouts;
  })();
  let cachedLevel=0,cachedPuzzle=null;
  function levelNumber(value){
    const n=Number(value);
    return Number.isSafeInteger(n) ? Math.max(1,Math.min(MAX_SAFE_LEVEL,n)) : 1;
  }
  function seededRandom(level){
    // Hash the level before initializing a Mulberry32 generator; do not use
    // Math.random so retries, saved levels, and page reloads stay identical.
    let seed=(Math.imul(level>>>0,0x9e3779b1)^Math.imul(Math.floor(level/0x100000000)>>>0,0x85ebca6b)^0x6d2b79f5)>>>0;
    return ()=>{
      seed=(seed+0x6d2b79f5)>>>0;
      let t=seed;
      t=Math.imul(t^(t>>>15),t|1);
      t^=t+Math.imul(t^(t>>>7),t|61);
      return ((t^(t>>>14))>>>0)/4294967296;
    };
  }
  function isUniqueLayout(regions,solution){
    let solutions=0;
    for(const candidate of QUEEN_LAYOUTS){
      let bits=0,valid=true;
      for(let row=0;row<6;row++){
        const id=regions[row*6+candidate[row]],bit=1<<id;
        if(id<0 || bits&bit){valid=false;break;}
        bits|=bit;
      }
      if(valid && ++solutions>1)return false;
      if(valid && !candidate.every((c,r)=>c===solution[r]))return false;
    }
    return solutions===1;
  }
  function growDuckRegions(rng,solution){
    const regions=Array(36).fill(-1),counts=Array(6).fill(1);
    for(let row=0;row<6;row++)regions[row*6+solution[row]]=row;
    const singleton=Math.floor(rng()*6);
    let remaining=30;
    while(remaining>0){
      const frontier=[];
      for(let i=0;i<36;i++){
        if(regions[i]!==-1)continue;
        const r=Math.floor(i/6),c=i%6;
        const neighbors=[r>0?i-6:-1,r<5?i+6:-1,c>0?i-1:-1,c<5?i+1:-1];
        for(const neighbor of neighbors){
          if(neighbor<0)continue;
          const id=regions[neighbor];
          if(id>=0&&id!==singleton)frontier.push({cell:i,id});
        }
      }
      if(!frontier.length)return null;
      // Grow smaller neighboring regions first: natural, connected patches
      // instead of one color swallowing the entire board.
      const min=Math.min(...frontier.map(p=>counts[p.id]));
      const options=frontier.filter(p=>counts[p.id]<=min+(rng()<.25?2:1));
      const pick=options[Math.floor(rng()*options.length)];
      regions[pick.cell]=pick.id;counts[pick.id]++;remaining--;
    }
    return regions;
  }
  function puzzleForLevel(level){
    level=levelNumber(level);
    if(level<=HANDMADE_COUNT)return PUZZLES[level-1];
    if(level===cachedLevel)return cachedPuzzle;
    const rng=seededRandom(level);
    let chosen=null,regions=null;
    for(let attempt=0;attempt<220;attempt++){
      chosen=QUEEN_LAYOUTS[Math.floor(rng()*QUEEN_LAYOUTS.length)];
      regions=growDuckRegions(rng,chosen);
      if(regions && isUniqueLayout(regions,chosen))break;
      regions=null;
    }
    if(!regions){
      // Unlikely fallback: use a proven handcrafted pattern, transformed as
      // a whole so both its region boundaries and solution stay consistent.
      const source=PUZZLES[Math.floor(rng()*HANDMADE_COUNT)];
      const mirrorX=rng()<.5,mirrorY=rng()<.5;
      regions=Array(36).fill(0);chosen=Array(6).fill(0);
      for(let r=0;r<6;r++)for(let c=0;c<6;c++){
        const rr=mirrorY?5-r:r,cc=mirrorX?5-c:c;
        regions[r*6+c]=source.regions[rr*6+cc];
      }
      for(let r=0;r<6;r++)chosen[r]=mirrorX?5-source.solution[mirrorY?5-r:r]:source.solution[mirrorY?5-r:r];
    }
    cachedLevel=level;
    const rating=42+Math.floor(rng()*54);
    cachedPuzzle={stage:level,size:6,regions,solution:chosen.slice(),rating,difficulty:rating<56?'Cozy':rating<72?'Steady':'Tricky'};
    return cachedPuzzle;
  }

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
  let lostLifeThisPuzzle=false;
  let pointerDown=false,dragging=false,lastDragIndex=-1,pressIndex=-1,startX=0,startY=0;
  let lastTapIndex=-1,lastTapAt=0,lastTapPreviousMark='';

  function readJSON(key,fallback){try{return JSON.parse(localStorage.getItem(key)||'')||fallback;}catch{return fallback;}}
  function writeJSON(key,value){localStorage.setItem(key,JSON.stringify(value));}
  function readHub(){return readJSON(HUB_KEY,{coins:0});}
  function writeHub(hub){writeJSON(HUB_KEY,hub);}
  function readProgress(){
    const p=readJSON(GAME_KEY,{});
    const completed=p.completed&&typeof p.completed==='object'?p.completed:{};
    let unlocked=levelNumber(p.unlocked||1);
    // In older versions finishing the last handcrafted level could not
    // unlock its successor. Recover the player's completed last level.
    if(completed[String(HANDMADE_COUNT)]&&unlocked<=HANDMADE_COUNT)unlocked=HANDMADE_COUNT+1;
    const rewarded=p.rewarded&&typeof p.rewarded==='object'&&!Array.isArray(p.rewarded)?p.rewarded:{};
    const flawlessStreak=Math.max(0,Math.floor(Number(p.flawlessStreak)||0));
    return {unlocked,completed,best:p.best&&typeof p.best==='object'?p.best:{},rewarded,flawlessStreak};
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
  let levelPageStart=1;
  function resetPuzzle(nextStage=stage){
    closeModals();stage=levelNumber(nextStage);puzzle=puzzleForLevel(stage);
    levelPageStart=Math.floor((stage-1)/LEVELS_PER_PAGE)*LEVELS_PER_PAGE+1;
    marks=Array(puzzle.size*puzzle.size).fill('');lives=STARTING_LIVES;extraLivesBought=0;helperUses={hint:1,reveal:1,scan:1};complete=false;lostLifeThisPuzzle=false;
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
      lostLifeThisPuzzle=true;
      const streakProgress=readProgress();
      if(streakProgress.flawlessStreak){streakProgress.flawlessStreak=0;writeProgress(streakProgress);}
      marks[index]='red';renderCell(index);lives=Math.max(0,lives-1);setScore(score-25);renderLives();
      board.classList.remove('shake');void board.offsetWidth;board.classList.add('shake');setStatus('Oops — red X! One life lost.','bad');
      if(lives<=0)setTimeout(()=>openGameOver(),250);
    }
  }
  function checkComplete(){
    if(puzzle.solution.every((c,r)=>marks[cellIndex(r,c)]==='duck'))finishPuzzle();
  }
  function finishPuzzle(){
    if(complete)return;
    complete=true;renderHelpers();renderLives();setScore(score+300);
    const progress=readProgress(),key=String(stage);
    progress.completed[key]=true;
    progress.best[key]=Math.max(Number(progress.best[key])||0,score);
    progress.unlocked=Math.max(progress.unlocked,Math.min(MAX_SAFE_LEVEL,stage+1));
    let earned=0,base=0,milestone=0,flawless=false;
    if(!progress.rewarded[key]){
      // Each puzzle earns coins only once, including levels completed before this update.
      // Replaying a previously rewarded level never grants more coins or streak progress.
      const byDifficulty={Cozy:60,Steady:90,Tricky:120,Sneaky:160};
      base=byDifficulty[puzzle.difficulty]||90;
      flawless=!lostLifeThisPuzzle&&lives===STARTING_LIVES&&extraLivesBought===0;
      if(flawless){
        progress.flawlessStreak++;
        const streak=progress.flawlessStreak;
        milestone=streak===3?200:streak===5?350:(streak>=10&&streak%5===0?500:0);
      }else progress.flawlessStreak=0;
      earned=base+(flawless?150:0)+milestone;
      const hub=readHub();
      hub.coins=Math.max(0,Number(hub.coins)||0)+earned;
      writeHub(hub);
      progress.rewarded[key]=true;
      renderCoins();
    }
    writeProgress(progress);renderLevelGrid();
    $('#resultScore').textContent=score.toLocaleString();
    $('#resultDifficulty').textContent=puzzle.difficulty;
    const levelLabel=`Level ${stage.toLocaleString()} complete!`;
    let rewardText=earned?` +${earned.toLocaleString()} Pink Coins (${base} base${flawless?' + 150 flawless':''}${milestone?' + '+milestone+' streak bonus':''})!`:' This level already awarded its coins.';
    if(earned&&flawless)rewardText+=` ♡ Flawless streak: ${progress.flawlessStreak}!`;
    $('#resultCopy').textContent=levelLabel+rewardText;
    $('#nextLevelButton').textContent='Next Level ♡';
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
    for(let n=levelPageStart;n<levelPageStart+LEVELS_PER_PAGE;n++){
      const b=document.createElement('button');b.type='button';b.className='level-choice';
      b.textContent=n.toLocaleString();b.disabled=n>p.unlocked;
      b.classList.toggle('current',n===stage);b.classList.toggle('done',!!p.completed[String(n)]);
      b.addEventListener('click',()=>resetPuzzle(n));levelGrid.append(b);
    }
    $('#levelRange').textContent=`Levels ${levelPageStart.toLocaleString()}–${(levelPageStart+LEVELS_PER_PAGE-1).toLocaleString()} · ${p.unlocked.toLocaleString()} unlocked`;
    $('#levelPrevious').disabled=levelPageStart===1;
    $('#levelNext').disabled=levelPageStart+LEVELS_PER_PAGE>p.unlocked;
    $('#levelLatest').disabled=levelPageStart===Math.floor((p.unlocked-1)/LEVELS_PER_PAGE)*LEVELS_PER_PAGE+1;
  }

  function boardIndexFromPoint(x,y){const el=document.elementFromPoint(x,y)?.closest?.('.cell');return el&&board.contains(el)?Number(el.dataset.index):-1;}
  function resetTapMemory(){lastTapIndex=-1;lastTapAt=0;lastTapPreviousMark='';}
  function handleBoardTap(idx){
    const now=Date.now();
    if(idx===lastTapIndex&&now-lastTapAt<=DOUBLE_TAP_MS){
      if(marks[idx]!=='red'&&marks[idx]!=='duck'){marks[idx]=lastTapPreviousMark;renderCell(idx);}
      resetTapMemory();
      attemptDuck(idx,'player');
      return;
    }
    lastTapIndex=idx;lastTapAt=now;lastTapPreviousMark=marks[idx];
    toggleX(idx);
  }
  board.addEventListener('pointerdown',e=>{
    if(complete)return;const cell=e.target.closest('.cell');if(!cell)return;
    pressIndex=Number(cell.dataset.index);pointerDown=true;dragging=false;lastDragIndex=pressIndex;startX=e.clientX;startY=e.clientY;
    try{board.setPointerCapture?.(e.pointerId);}catch{}
  });
  board.addEventListener('pointermove',e=>{
    if(!pointerDown||complete)return;
    if(!dragging&&Math.hypot(e.clientX-startX,e.clientY-startY)>12){dragging=true;resetTapMemory();addSwipeX(lastDragIndex);}
    if(!dragging)return;const idx=boardIndexFromPoint(e.clientX,e.clientY);if(idx>=0&&idx!==lastDragIndex){lastDragIndex=idx;addSwipeX(idx);}
  });
  board.addEventListener('pointerup',e=>{
    if(!pointerDown)return;
    pointerDown=false;
    try{if(board.hasPointerCapture?.(e.pointerId))board.releasePointerCapture(e.pointerId);}catch{}
    if(dragging){dragging=false;pressIndex=-1;lastDragIndex=-1;resetTapMemory();setStatus('Xs marked!');return;}
    const pointIndex=boardIndexFromPoint(e.clientX,e.clientY);
    const idx=pointIndex>=0?pointIndex:pressIndex;
    pressIndex=-1;lastDragIndex=-1;
    if(idx<0)return;
    handleBoardTap(idx);
  });
  board.addEventListener('pointercancel',e=>{
    pointerDown=false;dragging=false;pressIndex=-1;lastDragIndex=-1;resetTapMemory();
    try{if(board.hasPointerCapture?.(e.pointerId))board.releasePointerCapture(e.pointerId);}catch{}
  });
  board.addEventListener('contextmenu',e=>e.preventDefault());

  $('#backButton').addEventListener('click',()=>location.href='../');
  $('#levelButton').addEventListener('click',()=>{levelPageStart=Math.floor((stage-1)/LEVELS_PER_PAGE)*LEVELS_PER_PAGE+1;renderLevelGrid();openModal(levelModal);});
  $('#levelPrevious').addEventListener('click',()=>{levelPageStart=Math.max(1,levelPageStart-LEVELS_PER_PAGE);renderLevelGrid();});
  $('#levelNext').addEventListener('click',()=>{if(levelPageStart+LEVELS_PER_PAGE<=readProgress().unlocked){levelPageStart+=LEVELS_PER_PAGE;renderLevelGrid();}});
  $('#levelLatest').addEventListener('click',()=>{levelPageStart=Math.floor((readProgress().unlocked-1)/LEVELS_PER_PAGE)*LEVELS_PER_PAGE+1;renderLevelGrid();});
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
  $('#nextLevelButton').addEventListener('click',()=>resetPuzzle(Math.min(MAX_SAFE_LEVEL,stage+1)));

  const progress=readProgress(),requested=levelNumber(new URLSearchParams(location.search).get('level')||progress.unlocked);
  resetPuzzle(Math.min(progress.unlocked,requested));
})();
