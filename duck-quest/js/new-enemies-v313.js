// Duckie Days v24.313 — Eight new stage enemy families
(function(){
  "use strict";

  const VERSION="24.313";
  const NEW_IDS=["chonk","feathertail","puffer","shrimpie","licorunt","pretzette","asterfox","star-glider"];
  const ROOT="assets/enemies/";

  const DEFINITIONS=Object.freeze({
    chonk:{
      area:"meadow",maxRank:40,name:"Chonk",base:{hp:26,attack:4,exp:25,coinMin:7,coinMax:12,speed:420},
      order:["base","blue","green","pink","gold"],special:"gold",
      variants:{
        base:["Chonk","base"],blue:["Blue Chonk","blue"],green:["Green Chonk","green"],pink:["Pink Chonk","pink"],gold:["Gold Chonk","gold"]
      },
      shiny:["Shiny Chonk","shiny"]
    },
    feathertail:{
      area:"meadow",maxRank:40,name:"Feathertail",base:{hp:21,attack:5,exp:25,coinMin:7,coinMax:12,speed:330},
      order:["base","blue","green","pink","goth"],special:"goth",
      variants:{
        base:["Feathertail","base"],blue:["Blue Feathertail","blue"],green:["Green Feathertail","green"],pink:["Pink Feathertail","pink"],goth:["Goth Feathertail","goth"]
      },
      shiny:["Shiny Feathertail","shiny"]
    },
    puffer:{
      area:"ocean",maxRank:80,name:"Puffer",base:{hp:35,attack:6,exp:36,coinMin:10,coinMax:16,speed:390},
      order:["base","blue","green","pink","dark"],special:"dark",
      variants:{
        base:["Puffer","base"],blue:["Blue Puffer","blue"],green:["Green Puffer","green"],pink:["Pink Puffer","pink"],dark:["Dark Puffer","dark"]
      },
      shiny:["Shiny Puffer","shiny"]
    },
    shrimpie:{
      area:"ocean",maxRank:80,name:"Shrimpie",base:{hp:29,attack:7,exp:37,coinMin:10,coinMax:17,speed:320},
      order:["base","yellow","teal","purple","tempura"],special:"tempura",
      variants:{
        base:["Shrimpie","base"],yellow:["Yellow Shrimpie","yellow"],teal:["Teal Shrimpie","teal"],purple:["Purple Shrimpie","purple"],tempura:["Tempura Shrimpie","tempura"]
      },
      shiny:["Shiny Shrimpie","shiny"]
    },
    licorunt:{
      area:"candy",maxRank:120,name:"Licorunt",base:{hp:44,attack:8,exp:48,coinMin:14,coinMax:22,speed:340},
      order:["base","green","red","teal","pink"],special:"pink",
      variants:{
        base:["Licorunt","base"],green:["Green Licorunt","green"],red:["Red Licorunt","red"],teal:["Teal Licorunt","teal"],pink:["Pink Licorunt","pink"]
      },
      shiny:["Shiny Licorunt","shiny"]
    },
    pretzette:{
      area:"candy",maxRank:120,name:"Pretzette",base:{hp:49,attack:8,exp:52,coinMin:15,coinMax:24,speed:380},
      order:["base","pink","mint","burnt","cookies"],special:"cookies",
      variants:{
        base:["Pretzette","base"],pink:["Pink Pretzette","pink"],mint:["Mint Pretzette","mint"],burnt:["Burnt Pretzette","burnt"],cookies:["Cookies n’ Cream Pretzette","cookies"]
      },
      shiny:["Shiny Pretzette","shiny"]
    },
    asterfox:{
      area:"cloud",maxRank:160,name:"AsterFox",base:{hp:42,attack:8,exp:45,coinMin:13,coinMax:21,speed:340},
      order:["base","blue","green","purple","gray"],special:"gray",
      variants:{
        base:["AsterFox","base"],blue:["Blue AsterFox","blue"],green:["Green AsterFox","green"],purple:["Purple AsterFox","purple"],gray:["Gray AsterFox","gray"]
      },
      shiny:["Shiny AsterFox","shiny"]
    },
    "star-glider":{
      area:"cloud",maxRank:160,name:"Star Glider",base:{hp:46,attack:9,exp:49,coinMin:14,coinMax:23,speed:300},
      order:["base","green","pink","gold","dark"],special:"dark",
      variants:{
        base:["Star Glider","base"],green:["Green Star Glider","green"],pink:["Pink Star Glider","pink"],gold:["Gold Star Glider","gold"],dark:["Dark Star Glider","dark"]
      },
      shiny:["Shiny Star Glider","shiny"]
    }
  });

  function art(id,variant,file){
    return `${ROOT}${id}/base/${variant==="base"?"":variant+"-"}${file}.png`;
  }

  function variantTableFor(id){
    const def=DEFINITIONS[id];
    const out={};
    def.order.forEach((variantId,index)=>{
      const [name,folderId]=def.variants[variantId];
      const mult=[1,1.12,1.24,1.40,1.62][index]||1;
      out[variantId]={
        id:variantId,name,
        hp:mult,atk:index===4?1.28:index===3?1.19:index===2?1.11:index===1?1.06:1,
        exp:index===4?1.58:index===3?1.38:index===2?1.23:index===1?1.12:1,
        coin:index===4?1.62:index===3?1.38:index===2?1.23:index===1?1.12:1,
        elite:index===4,
        idle:[art(id,folderId,"idle-1"),art(id,folderId,"idle-2")],
        hurt:art(id,folderId,"hurt")
      };
    });
    return Object.freeze(out);
  }

  const TABLES=Object.freeze(Object.fromEntries(NEW_IDS.map(id=>[id,variantTableFor(id)])));

  const SHINIES=Object.freeze(Object.fromEntries(NEW_IDS.map(id=>{
    const def=DEFINITIONS[id], [name,folderId]=def.shiny;
    return [id,Object.freeze({
      id:"shiny",name,
      idle:[art(id,folderId,"idle-1"),art(id,folderId,"idle-2")],
      hurt:art(id,folderId,"hurt")
    })];
  })));

  const NORMAL_MOVES=Object.freeze({
    chonk:[
      {name:"Chonk Charge!",multiplier:1.00},
      {name:"Big Bump!",multiplier:1.15,effect:"armor-break",chance:.25}
    ],
    feathertail:[
      {name:"Feather Flick!",multiplier:.92},
      {name:"Tail Sweep!",multiplier:1.10,effect:"weaken-next",chance:.30,nextAttackMultiplier:.80}
    ],
    puffer:[
      {name:"Bubble Pop!",multiplier:1.00},
      {name:"Puff Up!",type:"guard",guardMultiplier:.75,guardHits:1}
    ],
    shrimpie:[
      {name:"Tiny Pinch!",multiplier:.92},
      {name:"Shrimp Sprint!",multiplier:1.05,critChance:.25,critMultiplier:1.60}
    ],
    licorunt:[
      {name:"Licorice Whip!",multiplier:1.00},
      {name:"Sticky Twist!",multiplier:.90,effect:"weaken-next",chance:.30,nextAttackMultiplier:.80}
    ],
    pretzette:[
      {name:"Pretzel Bonk!",multiplier:1.00},
      {name:"Salty Spin!",multiplier:1.02,critChance:.22,critMultiplier:1.60}
    ],
    asterfox:[
      {name:"Star Pounce!",multiplier:1.00},
      {name:"Aster Spark!",multiplier:1.02,critChance:.22,critMultiplier:1.60}
    ],
    "star-glider":[
      {name:"Star Swoop!",multiplier:.96},
      {name:"Cosmic Glide!",multiplier:.95,effect:"weaken-next",chance:.30,nextAttackMultiplier:.80}
    ]
  });

  const SPECIAL_POWERS=Object.freeze({
    "chonk:gold":{name:"Golden Weight!",type:"guard",chance:.30,maxUses:2,guardMultiplier:.72,guardHits:2},
    "feathertail:goth":{name:"Dark Plumage!",type:"guard",chance:.30,maxUses:2,guardMultiplier:.72,guardHits:2},
    "puffer:dark":{name:"Pressure Burst!",type:"attack-hero-next-down",chance:.30,maxUses:2,multiplier:1.10,heroAttackMultiplier:.80},
    "shrimpie:tempura":{name:"Crispy Crunch!",type:"attack-stun",chance:.28,maxUses:2,multiplier:1.48,stunChance:0},
    "licorunt:pink":{name:"Sugar Snare!",type:"attack-stun-weaken",chance:.30,maxUses:2,multiplier:.95,stunChance:.25,heroAttackMultiplier:.80},
    "pretzette:cookies":{name:"Creamy Crunch!",type:"heal-next-attack-up",chance:.30,maxUses:2,healPercent:.14,attackMultiplier:1.20},
    "asterfox:gray":{name:"Moonlit Veil!",type:"guard",chance:.30,maxUses:2,guardMultiplier:.72,guardHits:2},
    "star-glider:dark":{name:"Midnight Dive!",type:"attack-stun",chance:.28,maxUses:2,multiplier:1.35,stunChance:.25}
  });

  const BASE_BUDDY_SKILLS=Object.freeze({
    chonk:{name:"Big Bump!",description:"Moderate damage and lowers enemy Defense for 2 turns.",type:"damage-defense-down",multiplier:.92,defenseDown:.20,duration:2},
    feathertail:{name:"Tail Sweep!",description:"Solid damage with a 30% chance to weaken the enemy's next attack.",type:"damage-weaken",multiplier:1.05,weakenChance:.30,nextAttackMultiplier:.70},
    puffer:{name:"Puff Up!",description:"Reduce damage taken by 30% for 2 enemy turns.",type:"guard",damageReduction:.30,duration:2},
    shrimpie:{name:"Shrimp Sprint!",description:"Moderate damage with a 25% critical-hit chance.",type:"crit-damage",multiplier:.95,critChance:.25,critMultiplier:1.70},
    licorunt:{name:"Sticky Twist!",description:"Solid damage with a 30% chance to weaken the enemy's next attack.",type:"damage-weaken",multiplier:1.00,weakenChance:.30,nextAttackMultiplier:.70},
    pretzette:{name:"Salty Spin!",description:"Moderate damage with a 25% critical-hit chance.",type:"crit-damage",multiplier:.95,critChance:.25,critMultiplier:1.70},
    asterfox:{name:"Aster Spark!",description:"Moderate damage with a 25% critical-hit chance.",type:"crit-damage",multiplier:.95,critChance:.25,critMultiplier:1.70},
    "star-glider":{name:"Cosmic Glide!",description:"Solid damage with a 30% chance to weaken the enemy's next attack.",type:"damage-weaken",multiplier:1.00,weakenChance:.30,nextAttackMultiplier:.70}
  });

  const SPECIAL_BUDDY_SKILLS=Object.freeze({
    "chonk:gold":{name:"Golden Weight!",description:"Reduce damage taken by 25% for 2 enemy turns.",type:"guard",damageReduction:.25,duration:2},
    "feathertail:goth":{name:"Dark Plumage!",description:"Cut the next damaging enemy hit by 45%.",type:"next-hit-shield",damageReduction:.45},
    "puffer:dark":{name:"Pressure Burst!",description:"Light damage and lowers enemy Attack for 2 turns.",type:"damage-attack-down",multiplier:.72,attackDown:.20,duration:2},
    "shrimpie:tempura":{name:"Crispy Crunch!",description:"A crunchy hit with a 30% critical-hit chance.",type:"crit-damage",multiplier:1.02,critChance:.30,critMultiplier:1.65},
    "licorunt:pink":{name:"Sugar Snare!",description:"Strong damage with a 35% chance to weaken the enemy's next attack.",type:"damage-weaken",multiplier:1.05,weakenChance:.35,nextAttackMultiplier:.65},
    "pretzette:cookies":{name:"Creamy Crunch!",description:"Heal 10% HP and raise Attack by 15% for 2 turns.",type:"heal-attack-up",healPercent:.10,attackBoost:.15,duration:2},
    "asterfox:gray":{name:"Moonlit Veil!",description:"Cut the next damaging enemy hit by 45%.",type:"next-hit-shield",damageReduction:.45},
    "star-glider:dark":{name:"Midnight Dive!",description:"Moderate damage with a 30% chance to stun for 1 turn.",type:"damage-stun",multiplier:.98,stunChance:.30}
  });

  // Add base templates before the old startEnemy implementation sees them.
  for(const id of NEW_IDS){
    const def=DEFINITIONS[id], v=TABLES[id].base;
    ENEMIES[id]={
      name:def.name,
      hp:def.base.hp,attack:def.base.attack,exp:def.base.exp,
      coinMin:def.base.coinMin,coinMax:def.base.coinMax,
      idle:v.idle.slice(),hurt:v.hurt,speed:def.base.speed
    };
  }

  function chooseVariantId(id,rank){
    const def=DEFINITIONS[id];
    try{return weightedProgressVariant(rank,def.order,def.maxRank);}
    catch(error){return def.order[0];}
  }

  function variantTemplate(id,variantId){
    const def=DEFINITIONS[id], base=def.base, table=TABLES[id];
    const v=table[variantId]||table.base;
    return {
      ...ENEMIES[id],
      name:v.name,idle:v.idle.slice(),hurt:v.hurt,
      hp:Math.max(1,Math.round(base.hp*(v.hp||1))),
      attack:Math.max(1,Math.round(base.attack*(v.atk||1))),
      exp:Math.max(1,Math.round(base.exp*(v.exp||1))),
      coinMin:Math.max(1,Math.round(base.coinMin*(v.coin||1))),
      coinMax:Math.max(1,Math.round(base.coinMax*(v.coin||1))),
      v313Variant:v.id,
      eliteVariant:Boolean(v.elite)
    };
  }

  function shinyTemplate(id){
    const def=DEFINITIONS[id], s=SHINIES[id];
    return {
      ...ENEMIES[id],
      name:s.name,idle:s.idle.slice(),hurt:s.hurt,
      shiny:true,shinyId:"shiny",v313Variant:"shiny"
    };
  }

  // Let all existing capture / key code understand the new variant families.
  const previousEnemyVariantIdV313=enemyVariantId;
  enemyVariantId=function(enemy){
    if(enemy?.shiny)return "shiny";
    if(enemy?.v313Variant)return String(enemy.v313Variant);
    return previousEnemyVariantIdV313(enemy);
  };

  // Add special-powered recolors without modifying the frozen core table.
  const previousConfigureEnemySpecialVariantV313=configureEnemySpecialVariant;
  configureEnemySpecialVariant=function(enemy){
    const result=previousConfigureEnemySpecialVariantV313(enemy);
    if(!enemy || enemy.shiny)return result;
    const power=SPECIAL_POWERS[`${enemy.id}:${enemyVariantId(enemy)}`];
    if(!power)return result;
    enemy.variantSpecial={...power};
    enemy.variantSpecialUses=0;
    enemy.variantGuardHitsRemaining=0;
    enemy.variantGuardMultiplier=1;
    enemy.variantGuardName="";
    enemy.variantDodgeReady=false;
    enemy.variantDodgeCooldown=0;
    enemy.variantNextAttackMultiplier=1;
    enemy.variantAttackBoostTurns=0;
    enemy.variantAttackBoostMultiplier=1;
    return enemy;
  };

  // Sugar Snare combines a weakened next OC attack with a small stun chance.
  const previousTryEnemySpecialVariantMoveV313=tryEnemySpecialVariantMove;
  tryEnemySpecialVariantMove=async function(){
    const power=currentEnemy?.variantSpecial;
    if(power?.type!=="attack-stun-weaken"){
      return previousTryEnemySpecialVariantMoveV313();
    }
    if(Number(currentEnemy.variantSpecialUses||0)>=Number(power.maxUses||2))return false;
    if(Math.random()>=Math.max(0,Math.min(1,Number(power.chance)||.30)))return false;
    currentEnemy.variantSpecialUses=Math.max(0,Number(currentEnemy.variantSpecialUses)||0)+1;
    const dealt=await performEnemyAttack(Number(power.multiplier)||.95,`${currentEnemy.name} used ${power.name}`);
    if(currentRun?.hp>0 && dealt>0){
      skillState.heroNextAttackMultiplier=Math.min(Number(skillState.heroNextAttackMultiplier||1),Number(power.heroAttackMultiplier)||.80);
      const stunned=Math.random()<Number(power.stunChance||.25);
      if(stunned)skillState.heroStunTurns=Math.max(Number(skillState.heroStunTurns||0),1);
      setMessage(stunned
        ? `${power.name} weakened ${heroDisplayName()}'s next attack and tangled them up!`
        : `${power.name} weakened ${heroDisplayName()}'s next attack!`);
      await sleep(380);
    }
    return true;
  };

  // Normal enemy move names + second move at OC Lv. 25.
  const v313BattleState={heroArmorBreakHits:0,heroArmorBreakMultiplier:1};
  const previousStartEncounterV313=startEncounter;
  startEncounter=function(){
    v313BattleState.heroArmorBreakHits=0;
    v313BattleState.heroArmorBreakMultiplier=1;
    return previousStartEncounterV313.apply(this,arguments);
  };

  const previousPerformEnemyAttackV313=performEnemyAttack;
  performEnemyAttack=async function(multiplier=1,label="",lifeDrainHeal=0){
    let effectiveMultiplier=Number(multiplier)||1;
    if(v313BattleState.heroArmorBreakHits>0){
      effectiveMultiplier*=Math.max(1,Number(v313BattleState.heroArmorBreakMultiplier)||1);
      v313BattleState.heroArmorBreakHits=Math.max(0,v313BattleState.heroArmorBreakHits-1);
      if(v313BattleState.heroArmorBreakHits<=0)v313BattleState.heroArmorBreakMultiplier=1;
    }

    const moves=currentEnemy ? NORMAL_MOVES[currentEnemy.id] : null;
    if(!label && moves){
      const secondUnlocked=Number(activeHeroProgress()?.level||1)>=25;
      let move=moves[0];
      if(secondUnlocked && Math.random()<.42)move=moves[1];

      if(move.type==="guard"){
        if(Number(currentEnemy.variantGuardHitsRemaining||0)>0){
          move=moves[0];
        }else{
          currentEnemy.variantGuardHitsRemaining=Math.max(1,Number(move.guardHits)||1);
          currentEnemy.variantGuardMultiplier=Math.max(.1,Math.min(1,Number(move.guardMultiplier)||.75));
          currentEnemy.variantGuardName=move.name;
          setMessage(`${currentEnemy.name} used ${move.name} The next hit deals less damage.`);
          const refs=activeEnemyUi();
          refs.sprite?.classList.add("attack-pop");
          await sleep(360);
          refs.sprite?.classList.remove("attack-pop");
          return 0;
        }
      }

      const crit=move.critChance && Math.random()<Number(move.critChance);
      const moveMultiplier=(Number(move.multiplier)||1)*(crit?(Number(move.critMultiplier)||1.5):1);
      const dealt=await previousPerformEnemyAttackV313(
        effectiveMultiplier*moveMultiplier,
        `${currentEnemy.name} used ${move.name}`,
        lifeDrainHeal
      );

      if(currentRun?.hp>0 && dealt>0){
        if(crit){
          setMessage(`${currentEnemy.name}'s ${move.name} landed a CRITICAL hit!`);
          await sleep(260);
        }
        if(move.effect==="weaken-next" && Math.random()<Number(move.chance||.30)){
          skillState.heroNextAttackMultiplier=Math.min(
            Number(skillState.heroNextAttackMultiplier||1),
            Number(move.nextAttackMultiplier)||.80
          );
          setMessage(`${move.name} weakened ${heroDisplayName()}'s next attack!`);
          await sleep(300);
        }else if(move.effect==="armor-break" && Math.random()<Number(move.chance||.25)){
          v313BattleState.heroArmorBreakHits=1;
          v313BattleState.heroArmorBreakMultiplier=1.15;
          setMessage(`${move.name} lowered ${heroDisplayName()}'s Defense for the next hit!`);
          await sleep(300);
        }
      }
      return dealt;
    }

    return previousPerformEnemyAttackV313(effectiveMultiplier,label,lifeDrainHeal);
  };

  // Spawn new families through the existing battle scaler/UI while supplying
  // our chosen recolor (or Shiny) as the temporary base template.
  const previousStartEnemyV313=startEnemy;
  startEnemy=function(enemyId,options={}){
    if(!DEFINITIONS[enemyId]){
      return previousStartEnemyV313.apply(this,arguments);
    }

    const original=ENEMIES[enemyId];
    const rank=currentRun?.mode==="endless"
      ? endlessEffectiveRank(currentRun.floor)
      : Math.max(1,Number(currentRun?.rank)||1);

    const forced=String(options.v313Variant||"");
    const makeShiny=Boolean(options.forceShiny) || (!forced && Math.random()<currentShinyRate());
    const chosen=makeShiny
      ? shinyTemplate(enemyId)
      : variantTemplate(enemyId,(forced && TABLES[enemyId][forced])?forced:chooseVariantId(enemyId,rank));

    ENEMIES[enemyId]=chosen;
    try{
      return previousStartEnemyV313.call(this,enemyId,options);
    }finally{
      ENEMIES[enemyId]=original;
    }
  };

  // Put the two new families into each stage's 3 regular encounter pools.
  makeEncounterPlan=function(rank,areaId=selectedArea){
    if(areaId==="candy"){
      const stagePools=[
        ["apple-baby","gummy-worm","licorunt"],
        ["pudding-pig","gingerlolly","pretzette"],
        ["candycane-deer","gingerlolly","licorunt","pretzette"]
      ];
      const encounters=stagePools.map(pool=>makeStageEncounter(pool));
      const bosses=["gummy-shark","cream-fox"];
      encounters.push({type:"boss",enemyId:bosses[randInt(0,bosses.length-1)]});
      return encounters;
    }
    if(areaId==="cloud"){
      const stagePools=[
        ["star-mouse","puff-fairy","asterfox"],
        ["tulipa","snoud","star-glider"],
        ["cloud-bunny","lunar-moth","asterfox","star-glider"]
      ];
      const encounters=stagePools.map(pool=>makeStageEncounter(pool));
      const bosses=["aries","cherub-duck"];
      encounters.push({type:"boss",enemyId:bosses[randInt(0,bosses.length-1)]});
      return encounters;
    }
    if(areaId==="ocean"){
      const stagePools=[
        ["cool-seagull","sea-turtle","seaunicorn","sea-star","puffer"],
        ["cool-seagull","sea-turtle","seaunicorn","sea-star","shrimpie"],
        ["catfish","sea-turtle","seaunicorn","sea-star","puffer","shrimpie"]
      ];
      const encounters=stagePools.map(pool=>makeStageEncounter(pool));
      const bosses=["vampire-squid","jellybun"];
      encounters.push({type:"boss",enemyId:bosses[randInt(0,bosses.length-1)]});
      return encounters;
    }

    const stagePools=[
      ["bee","cat-slime","acorn-mouse","catterpillar","chonk"],
      ["cat-slime","flower","acorn-mouse","catterpillar","feathertail"],
      ["bee","flower","cat-slime","acorn-mouse","catterpillar","chonk","feathertail"]
    ];
    const encounters=stagePools.map(pool=>makeStageEncounter(pool));
    const bosses=["mushroom-cat","tree-squirrel"];
    encounters.push({type:"boss",enemyId:bosses[randInt(0,bosses.length-1)]});
    return encounters;
  };

  // Existing Endless code hardcodes its old normal pool inside this function.
  const previousBuildEncounterFromPoolV313=buildEncounterFromPool;
  const endlessPool=[
    "cat-slime","bee","flower","acorn-mouse","catterpillar","chonk","feathertail",
    "cool-seagull","sea-turtle","catfish","seaunicorn","sea-star","puffer","shrimpie",
    "apple-baby","gummy-worm","pudding-pig","gingerlolly","candycane-deer","licorunt","pretzette",
    "star-mouse","puff-fairy","tulipa","snoud","cloud-bunny","lunar-moth","asterfox","star-glider","porcupin"
  ];
  buildEncounterFromPool=function(enemyPool,mode="stage"){
    if(mode!=="endless")return previousBuildEncounterFromPoolV313.apply(this,arguments);
    if(Math.random()<MYSTERY_CHEST_RATE)return {type:"mystery-chest"};
    const roll=Math.random();
    if(roll<.09)return {type:"rare-chest"};
    if(roll<.15)return {type:"mimic"};
    if(roll<.25)return {type:"double-enemy",enemyIds:pickEncounterEnemies(endlessPool,2),waveIndex:0,defeatedEnemies:[]};
    if(roll<.33)return {type:pickSituationType("endless")};
    return {type:"enemy",enemyId:pickEncounterEnemy(endlessPool)};
  };

  // Buddy catalog entries are supplied separately so missing forms are visible
  // in the Buddy Book even before the player catches them.
  const NEW_BUDDY_CATALOG=[];
  for(const id of NEW_IDS){
    for(const v of Object.values(TABLES[id])){
      NEW_BUDDY_CATALOG.push({
        key:`${id}:${v.id}`,enemyId:id,variantId:v.id,name:v.name,
        image:v.idle[0],idle:v.idle.slice(),boss:false,shiny:false
      });
    }
    const s=SHINIES[id];
    NEW_BUDDY_CATALOG.push({
      key:`${id}:shiny`,enemyId:id,variantId:"shiny",name:s.name,
      image:s.idle[0],idle:s.idle.slice(),boss:false,shiny:true
    });
  }

  const previousBuddyDisplayCatalogV313=buddyDisplayCatalog;
  buddyDisplayCatalog=function(){
    const entries=previousBuddyDisplayCatalogV313();
    const byKey=new Map(entries.map(entry=>[entry.key,entry]));
    NEW_BUDDY_CATALOG.forEach(entry=>{if(!byKey.has(entry.key))byKey.set(entry.key,{...entry});});
    Object.values(hubSave.buddies?.collection||{}).forEach(record=>{
      if(record?.key)byKey.set(record.key,{...(byKey.get(record.key)||{}),...record});
    });
    return [...byKey.values()];
  };

  // Object.freeze is shallow: safely add families to the existing area arrays.
  function insertBeforeBoss(array,bossId,ids){
    if(!Array.isArray(array))return;
    const fresh=ids.filter(id=>!array.includes(id));
    if(!fresh.length)return;
    const at=array.indexOf(bossId);
    array.splice(at>=0?at:array.length,0,...fresh);
  }
  insertBeforeBoss(BUDDY_AREA_FAMILIES.meadow,"mushroom-cat",["chonk","feathertail"]);
  insertBeforeBoss(BUDDY_AREA_FAMILIES.ocean,"vampire-squid",["puffer","shrimpie"]);
  insertBeforeBoss(BUDDY_AREA_FAMILIES.candy,"gummy-shark",["licorunt","pretzette"]);
  insertBeforeBoss(BUDDY_AREA_FAMILIES.cloud,"aries",["asterfox","star-glider"]);

  // The core Shiny tab gets its family IDs from frozen SHINY_VARIANTS, so append
  // the eight new shiny-family tiles after the normal renderer finishes.
  const previousRenderBuddyCollectionV313=renderBuddyCollection;
  renderBuddyCollection=function(){
    const result=previousRenderBuddyCollectionV313.apply(this,arguments);
    if(buddyCollectionFilter!=="shiny" || !ui.buddyCollectionGrid)return result;

    for(const enemyId of NEW_IDS){
      if(ui.buddyCollectionGrid.querySelector(`[data-v313-shiny-family="${enemyId}"]`))continue;
      const family=buddyFamilyEntries(enemyId);
      const relevant=family.filter(entry=>entry.shiny);
      if(!relevant.length)continue;
      const representative=buddyFamilyRepresentative(enemyId,true);
      if(!representative)continue;
      const caughtEntries=relevant.filter(entry=>buddyOwnedQuantity(entry.key)>0);
      const caughtAny=caughtEntries.length>0;
      const familyName=String(ENEMIES[enemyId]?.name || DEFINITIONS[enemyId]?.name || representative.name || "Buddy");

      const button=document.createElement("button");
      button.type="button";
      button.dataset.v313ShinyFamily=enemyId;
      button.className=`buddy-tile buddy-family-tile${caughtAny?" caught":" unknown"} shiny`;
      button.setAttribute("aria-label",caughtAny?`${familyName}, Shiny befriended`:`Undiscovered Shiny ${familyName}`);

      const artBox=document.createElement("span");
      artBox.className="buddy-tile-art";
      if(representative.image){
        const img=document.createElement("img");
        img.src=representative.image;img.alt="";img.loading="lazy";img.decoding="async";
        artBox.appendChild(img);
      }else artBox.textContent=caughtAny?"✨":"?";

      const name=document.createElement("strong");
      name.textContent=caughtAny?`${familyName} ✨`:"???";
      const state=document.createElement("small");
      state.textContent=caughtAny?"Shiny befriended":"Shiny undiscovered";
      const badge=document.createElement("span");
      badge.className="buddy-tile-badge";badge.textContent="✨";

      button.append(artBox,name,state,badge);
      button.addEventListener("click",()=>openBuddyDetail(representative));
      ui.buddyCollectionGrid.appendChild(button);
    }
    return result;
  };

  function skillForRecord(record){
    if(!record)return null;
    return SPECIAL_BUDDY_SKILLS[`${record.enemyId}:${record.variantId}`]
      || BASE_BUDDY_SKILLS[record.enemyId]
      || null;
  }

  const previousBuddySkillForEnemyIdV313=buddySkillForEnemyId;
  buddySkillForEnemyId=function(enemyId){
    const id=String(enemyId||"");
    if(BASE_BUDDY_SKILLS[id]){
      let active=null;
      try{active=activeBattleBuddyRecord();}catch(error){}
      if(active?.enemyId===id)return skillForRecord(active)||BASE_BUDDY_SKILLS[id];
      return BASE_BUDDY_SKILLS[id];
    }
    return previousBuddySkillForEnemyIdV313.apply(this,arguments);
  };

  // Show a special recolor's actual helper skill in its Buddy detail window.
  const previousOpenBuddyDetailV313=openBuddyDetail;
  openBuddyDetail=function(entry){
    const result=previousOpenBuddyDetailV313.apply(this,arguments);
    if(entry && BASE_BUDDY_SKILLS[entry.enemyId] && ui.buddyDetailSkill){
      const skill=skillForRecord(entry);
      if(skill)ui.buddyDetailSkill.innerHTML=`<strong>Buddy Skill: ${skill.name}</strong><br>${skill.description}`;
    }
    return result;
  };

  // Gold Chonk's family gimmick: a small bonus coin drop whether defeated or caught.
  const previousGenerateRewardsV313=generateRewards;
  generateRewards=function(chest){
    const rewards=previousGenerateRewardsV313.apply(this,arguments);
    const foes=Array.isArray(chest?.enemies)&&chest.enemies.length?chest.enemies:(chest?.enemy?[chest.enemy]:[]);
    const goldCount=foes.filter(enemy=>enemy?.id==="chonk" && !enemy.shiny && enemyVariantId(enemy)==="gold").length;
    if(goldCount>0){
      const bonus=Array.from({length:goldCount},()=>randInt(8,15)).reduce((a,b)=>a+b,0);
      rewards.coins=Math.max(0,Number(rewards.coins)||0)+bonus;
      rewards.goldChonkBonus=bonus;
    }
    return rewards;
  };

  window.DUCKIE_NEW_ENEMIES_V313={
    version:VERSION,ids:NEW_IDS.slice(),definitions:DEFINITIONS,tables:TABLES,shinies:SHINIES,
    specialPowers:SPECIAL_POWERS,normalMoves:NORMAL_MOVES
  };
})();
