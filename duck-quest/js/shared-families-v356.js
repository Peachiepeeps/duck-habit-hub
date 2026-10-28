// Ducky Days v24.356: three shared-family enemies; one collection family per species.
(()=>{
  'use strict';
  if(window.DuckieSharedFamiliesV356)return;
  const specs={
    'pancake-ray':{name:'Pancake Ray',boss:true,colors:['base','blueberry','raspberry','apple','chocolate'],hp:150,attack:15,exp:145,coinMin:40,coinMax:70},
    'strawbunny':{name:'Strawbunny',boss:false,colors:['base','blue','yellow','green','brown'],hp:28,attack:5,exp:29,coinMin:7,coinMax:15},
    'pudding-snatcher':{name:'Pudding Snatcher',boss:false,colors:['base','pink','indigo','green','pumpkin'],hp:52,attack:9,exp:58,coinMin:14,coinMax:25}
  };
  const ids=Object.keys(specs), entries=[];
  const path=(id,color,frame)=>`assets/${specs[id].boss?'bosses':'enemies'}/${id}/base/${color==='base'?'':color+'-'}${frame}.webp`;
  for(const id of ids){
    const def=specs[id];
    ENEMIES[id]={name:def.name,hp:def.hp,attack:def.attack,exp:def.exp,coinMin:def.coinMin,coinMax:def.coinMax,
      idle:[path(id,'base','idle-1'),path(id,'base','idle-2')],hurt:path(id,'base','hurt'),speed:420,boss:def.boss};
    for(const color of [...def.colors,'shiny']){
      const shiny=color==='shiny';const name=shiny?`Shiny ${def.name}`:color==='base'?def.name:`${color[0].toUpperCase()+color.slice(1)} ${def.name}`;
      entries.push({key:`${id}:${color}`,enemyId:id,variantId:color,name,image:path(id,color,'idle-1'),
        idle:[path(id,color,'idle-1'),path(id,color,'idle-2')],boss:def.boss,shiny});
    }
  }
  // The boss and two regulars have different natural levels by region. Reuse
  // the game's existing enemy calculation and boost only relative to the area.
  const oldStart=startEnemy;
  startEnemy=function(id,options={}){
    const def=specs[id];if(!def)return oldStart.apply(this,arguments);
    const original=ENEMIES[id];
    const forced=String(options.v313Variant||options.sharedVariant||'');
    const shiny=Boolean(options.forceShiny)||forced==='shiny'||(!forced&&Math.random()<currentShinyRate());
    const rank=Math.max(1,Number(currentRun?.rank)||1);
    const color=shiny?'shiny':def.colors.includes(forced)?forced:typeof weightedProgressVariant==='function'
      ?weightedProgressVariant(rank,def.colors,currentRun?.area==='ocean'?80:currentRun?.area==='candy'?120:currentRun?.area==='city'?200:40)
      :def.colors[Math.floor(Math.random()*def.colors.length)];
    const index=Math.max(0,def.colors.indexOf(color));const boost=shiny?1.5:1+index*.12;
    ENEMIES[id]={...original,name:shiny?`Shiny ${def.name}`:color==='base'?def.name:`${color[0].toUpperCase()+color.slice(1)} ${def.name}`,
      idle:[path(id,color,'idle-1'),path(id,color,'idle-2'),...(id==='pancake-ray'&&color==='raspberry'?[path(id,color,'idle-3')]:[])],
      hurt:path(id,color,'hurt'),hp:Math.round(def.hp*boost),attack:Math.round(def.attack*(1+index*.05)),
      exp:Math.round(def.exp*boost),coinMin:Math.round(def.coinMin*boost),coinMax:Math.round(def.coinMax*boost),
      v313Variant:color,shiny,shinyId:shiny?'shiny':undefined};
    try{return oldStart.call(this,id,{...options,forceShiny:shiny});}finally{ENEMIES[id]=original;}
  };
  const oldPlan=makeEncounterPlan;
  makeEncounterPlan=function(rank,areaId=selectedArea){
    const plan=oldPlan.apply(this,arguments);if(!Array.isArray(plan)||!['meadow','ocean','candy','city'].includes(areaId))return plan;
    const standard=areaId==='candy'?['strawbunny','pudding-snatcher']:areaId==='meadow'?['strawbunny']:areaId==='city'?['pudding-snatcher']:[];
    // Keep regular chest/event encounter types; add shared creatures to combat pools.
    for(let i=0;i<Math.min(3,plan.length);i++){
      if(!standard.length||Math.random()>=.38)continue;
      const chosen=standard[Math.floor(Math.random()*standard.length)],enc=plan[i];
      if(enc?.type==='enemy')enc.enemyId=chosen;
      else if(enc?.type==='double-enemy'&&Array.isArray(enc.enemyIds)&&enc.enemyIds.length)enc.enemyIds[Math.floor(Math.random()*enc.enemyIds.length)]=chosen;
    }
    if((areaId==='candy'||areaId==='ocean')&&plan[3]?.type==='boss'&&Math.random()<1/3)plan[3].enemyId='pancake-ray';
    return plan;
  };
  const known=new Set(BUDDY_CATALOG.map(e=>e.key));
  for(const entry of entries){
    BUDDY_CATALOG_BY_KEY.set(entry.key,entry);
    if(!known.has(entry.key)){known.add(entry.key);BUDDY_CATALOG.push(entry);}
  }
  const oldCatalog=buddyDisplayCatalog;
  buddyDisplayCatalog=function(){
    const map=new Map(oldCatalog.apply(this,arguments).map(e=>[e.key,e]));
    for(const e of entries)if(!map.has(e.key))map.set(e.key,e);
    return [...map.values()];
  };
  for(const [area,list] of Object.entries({candy:['strawbunny','pudding-snatcher','pancake-ray'],meadow:['strawbunny'],city:['pudding-snatcher'],ocean:['pancake-ray']})){
    const families=BUDDY_AREA_FAMILIES[area];if(!Array.isArray(families))continue;
    for(const id of list)if(!families.includes(id))families.push(id);
  }
  const oldRender=renderBuddyCollection;
  renderBuddyCollection=function(){
    const ret=oldRender.apply(this,arguments);
    if(buddyCollectionFilter!=='shiny'||!ui.buddyCollectionGrid)return ret;
    for(const id of ids){
      const entry=entries.find(e=>e.enemyId===id&&e.shiny);if(!entry||ui.buddyCollectionGrid.querySelector(`[data-shared-shiny="${id}"]`))continue;
      const qty=buddyOwnedQuantity(entry.key),tile=document.createElement('button');tile.type='button';tile.className=`buddy-tile buddy-family-tile ${qty?'caught':'unknown'} shiny`;
      tile.dataset.sharedShiny=id;
      tile.innerHTML=`<span class="buddy-tile-art"><img src="${entry.image}" loading="lazy" alt=""></span><strong>${qty?specs[id].name+' ✨':'???'}</strong><small>${qty?'Shiny befriended':'Shiny undiscovered'}</small>`;
      tile.addEventListener('click',()=>openBuddyDetail(entry));ui.buddyCollectionGrid.append(tile);
    }
    return ret;
  };
  window.DuckieSharedFamiliesV356={ids,specs};
})();
