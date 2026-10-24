// Ducky Days v24.354 — Spooky Forest! Existing save/variant contracts preserved.
(()=>{
  'use strict';
  if(window.DuckieSpookyForestV354)return;
  const TC=window.DuckieTradingCards;
  const specs={
    'pumpkitty':{name:'Pumpkitty',colors:['base','gold','pink','brown','green'],boss:false,hp:78,atk:11,exp:83},
    'webby':{name:'Webby',colors:['base','orange','green','pink','brown'],boss:false,hp:74,atk:12,exp:85},
    'voodoo-dollie':{name:'Voodoo Dollie',colors:['base','yellow','green','blue','pink'],boss:false,hp:81,atk:12,exp:89},
    'vampire-bat':{name:'Vampire Bat',colors:['base','green','purple','orange'],boss:false,hp:77,atk:12,exp:86},
    'dizzy-mushie':{name:'Dizzy Mushie',colors:['base','purple','green','dark','teal'],boss:false,hp:81,atk:11,exp:85},
    'nurse-boo-boo':{name:'Nurse Boo Boo',colors:['base','blue','green','yellow','grey'],boss:false,hp:84,atk:10,exp:87},
    'miss-wick':{name:'Miss Wick',colors:['base','blue','purple','green','grey'],boss:true,hp:185,atk:17,exp:165},
    'spider-maid':{name:'Spider Maid',colors:['base','orange','green','yellow','pink'],boss:true,hp:177,atk:18,exp:162},
    'pumpkin-knight':{name:'Pumpkin Knight',colors:['base','gold','green','brown'],boss:true,hp:195,atk:17,exp:169}
  };
  const ids=Object.keys(specs);
  const bosses=ids.filter(id=>specs[id].boss);
  const regulars=ids.filter(id=>!specs[id].boss);
  const path=(id,variant,frame)=>`assets/${specs[id].boss?'bosses':'enemies'}/${id}/base/${variant==='base'?'':variant+'-'}${frame}.webp`;
  const catalog=[];
  for(const [id,def] of Object.entries(specs)){
    ENEMIES[id]={name:def.name,hp:def.hp,attack:def.atk,exp:def.exp,coinMin:def.boss?54:22,coinMax:def.boss?80:38,
      idle:[path(id,'base','idle-1'),path(id,'base','idle-2')],hurt:path(id,'base','hurt'),speed:420,boss:def.boss};
    for(const variant of [...def.colors,'shiny']){
      const shiny=variant==='shiny';
      const name=shiny?`Shiny ${def.name}`:variant==='base'?def.name:`${variant[0].toUpperCase()+variant.slice(1)} ${def.name}`;
      catalog.push({key:`${id}:${variant}`,enemyId:id,variantId:variant,name,
        image:path(id,variant,'idle-1'),idle:[path(id,variant,'idle-1'),path(id,variant,'idle-2')],boss:def.boss,shiny});
    }
  }
  const previousStartEnemy=startEnemy;
  startEnemy=function(id,options={}){
    const def=specs[id];if(!def)return previousStartEnemy.apply(this,arguments);
    const prev=ENEMIES[id];
    const level=Math.max(1,Number(currentRun?.rank)||1);
    const forced=String(options.v313Variant||options.spookyVariant||'');
    const isShiny=Boolean(options.forceShiny)||(forced==='shiny')||(!forced&&Math.random()<currentShinyRate());
    const optionsAvailable=def.colors;
    const chosen=isShiny?'shiny':optionsAvailable.includes(forced)?forced:(typeof weightedProgressVariant==='function'?weightedProgressVariant(level,optionsAvailable,240):optionsAvailable[Math.min(optionsAvailable.length-1,Math.floor(level/55))]);
    const variantIndex=optionsAvailable.indexOf(chosen);
    const boost=isShiny?1.45:1+Math.max(0,variantIndex)*.12;
    ENEMIES[id]={...prev,name:isShiny?`Shiny ${def.name}`:chosen==='base'?def.name:`${chosen[0].toUpperCase()+chosen.slice(1)} ${def.name}`,
      idle:[path(id,chosen,'idle-1'),path(id,chosen,'idle-2')],hurt:path(id,chosen,'hurt'),
      hp:Math.round(def.hp*boost),attack:Math.round(def.atk*(1+Math.max(0,variantIndex)*.045)),
      exp:Math.round(def.exp*boost),coinMin:Math.round(prev.coinMin*boost),coinMax:Math.round(prev.coinMax*boost),
      v313Variant:chosen,shiny:isShiny,shinyId:isShiny?'shiny':undefined};
    try{return previousStartEnemy.call(this,id,{...options,forceShiny:isShiny});}finally{ENEMIES[id]=prev;}
  };
  // A single world has three randomized enemy scenes and one randomized boss finale.
  const previousEncounterPlan=makeEncounterPlan;
  makeEncounterPlan=function(rank,areaId=selectedArea){
    if(areaId!=='spooky')return previousEncounterPlan.apply(this,arguments);
    const pools=[
      ['pumpkitty','vampire-bat','webby'],
      ['webby','voodoo-dollie','dizzy-mushie'],
      ['nurse-boo-boo','voodoo-dollie','dizzy-mushie','vampire-bat']
    ];
    const plan=pools.map(pool=>makeStageEncounter(pool));
    plan.push({type:'boss',enemyId:bosses[Math.floor(Math.random()*bosses.length)]});
    return plan;
  };
  // Keep the existing Lil Guy mechanics; register every recolor and shiny as catchable.
  const keys=new Set(BUDDY_CATALOG.map(e=>e.key));
  for(const entry of catalog){
    BUDDY_CATALOG_BY_KEY.set(entry.key,entry);
    if(!keys.has(entry.key)){keys.add(entry.key);BUDDY_CATALOG.push(entry);}
  }
  const previousCatalog=buddyDisplayCatalog;
  buddyDisplayCatalog=function(){
    const previous=previousCatalog.apply(this,arguments);
    const byKey=new Map(previous.map(entry=>[entry.key,entry]));
    for(const entry of catalog)if(!byKey.has(entry.key))byKey.set(entry.key,entry);
    return [...byKey.values()];
  };
  if(Array.isArray(BUDDY_AREA_FAMILIES.spooky)){
    for(const id of ids)if(!BUDDY_AREA_FAMILIES.spooky.includes(id))BUDDY_AREA_FAMILIES.spooky.push(id);
  }
  // Existing Shiny UI builds from an older frozen registry; add the new families.
  const oldRenderBuddyCollection=renderBuddyCollection;
  renderBuddyCollection=function(){
    const result=oldRenderBuddyCollection.apply(this,arguments);
    if(buddyCollectionFilter!=='shiny'||!ui.buddyCollectionGrid)return result;
    for(const id of ids){
      if(ui.buddyCollectionGrid.querySelector(`[data-spooky-shiny-family="${id}"]`))continue;
      const entry=catalog.find(e=>e.enemyId===id&&e.shiny);
      if(!entry)continue;
      const count=buddyOwnedQuantity(entry.key);const tile=document.createElement('button');tile.type='button';
      tile.className=`buddy-tile buddy-family-tile ${count?'caught':'unknown'} shiny`;
      tile.dataset.spookyShinyFamily=id;
      tile.innerHTML=`<span class="buddy-tile-art"><img src="${entry.image}" alt="" loading="lazy"></span><strong>${count?specs[id].name+' ✨':'???'}</strong><small>${count?'Shiny befriended':'Shiny undiscovered'}</small>`;
      tile.addEventListener('click',()=>openBuddyDetail(entry));ui.buddyCollectionGrid.append(tile);
    }
    return result;
  };
  window.DuckieSpookyForestV354={ids,regulars,bosses};
})();
