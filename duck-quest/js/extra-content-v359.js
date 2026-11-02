// Ducky Days v24.359 — three area kitties and collectible Flame Spirit.
(()=>{
 'use strict';if(window.DuckieExtraContentV359)return;
 const specs={
   trashcat:{name:'Trashcat',area:'city',colors:['base','blue','red','brown','orange'],hp:59,attack:10,exp:63,coinMin:15,coinMax:27},
   jellybeanie:{name:'Jellybeanie',area:'candy',colors:['base','orange','lemon','lime','grape'],hp:41,attack:7,exp:43,coinMin:11,coinMax:21},
   whispurr:{name:'Whispurr',area:'cloud',colors:['base','pink','yellow','purple','green'],hp:47,attack:8,exp:52,coinMin:12,coinMax:23},
   'flame-spirit':{name:'Flame Spirit',area:'spooky',colors:['base','blue','grey','purple','green'],hp:78,attack:13,exp:86,coinMin:22,coinMax:39}
 };
 const ids=Object.keys(specs),entries=[];
 const file=(id,color,frame)=>`assets/enemies/${id}/base/${color==='base'?'':color+'-'}${frame}.webp`;
 for(const [id,def] of Object.entries(specs)){
   ENEMIES[id]={name:def.name,hp:def.hp,attack:def.attack,exp:def.exp,coinMin:def.coinMin,coinMax:def.coinMax,
     idle:[file(id,'base','idle-1'),file(id,'base','idle-2')],hurt:file(id,'base','hurt'),speed:420,boss:false};
   for(const color of [...def.colors,'shiny']){
     const shiny=color==='shiny';entries.push({key:`${id}:${color}`,enemyId:id,variantId:color,
      name:shiny?`Shiny ${def.name}`:color==='base'?def.name:`${color[0].toUpperCase()+color.slice(1)} ${def.name}`,
      image:file(id,color,'idle-1'),idle:[file(id,color,'idle-1'),file(id,color,'idle-2')],boss:false,shiny});
   }
 }
 const prevStart=startEnemy;
 startEnemy=function(id,options={}){
   const def=specs[id];if(!def)return prevStart.apply(this,arguments);
   const previous=ENEMIES[id],rank=Math.max(1,Number(currentRun?.rank)||1),forced=String(options.v313Variant||options.extraVariant||'');
   const shiny=Boolean(options.forceShiny)||forced==='shiny'||(!forced&&Math.random()<currentShinyRate());
   const color=shiny?'shiny':def.colors.includes(forced)?forced:
     typeof weightedProgressVariant==='function'?weightedProgressVariant(rank,def.colors,def.area==='spooky'?240:def.area==='city'?200:def.area==='cloud'?160:120):def.colors[Math.floor(Math.random()*def.colors.length)];
   const index=Math.max(0,def.colors.indexOf(color)),boost=shiny?1.5:1+index*.12;
   ENEMIES[id]={...previous,name:shiny?`Shiny ${def.name}`:color==='base'?def.name:`${color[0].toUpperCase()+color.slice(1)} ${def.name}`,
     idle:[file(id,color,'idle-1'),file(id,color,'idle-2')],hurt:file(id,color,'hurt'),
     hp:Math.round(def.hp*boost),attack:Math.round(def.attack*(1+.05*index)),exp:Math.round(def.exp*boost),
     coinMin:Math.round(def.coinMin*boost),coinMax:Math.round(def.coinMax*boost),
     v313Variant:color,shiny,shinyId:shiny?'shiny':undefined};
   try{return prevStart.call(this,id,{...options,forceShiny:shiny});}finally{ENEMIES[id]=previous;}
 };
 const prevPlan=makeEncounterPlan;
 makeEncounterPlan=function(rank,areaId=selectedArea){
   const plan=prevPlan.apply(this,arguments),id=ids.find(key=>specs[key].area===areaId);
   if(!Array.isArray(plan)||!id)return plan;
   for(let index=0;index<Math.min(3,plan.length);index++){
     if(Math.random()>.40)continue;
     const encounter=plan[index];if(encounter?.type==='enemy')encounter.enemyId=id;
     else if(encounter?.type==='double-enemy'&&Array.isArray(encounter.enemyIds)&&encounter.enemyIds.length)
       encounter.enemyIds[Math.floor(Math.random()*encounter.enemyIds.length)]=id;
   }
   return plan;
 };
 const known=new Set(BUDDY_CATALOG.map(e=>e.key));
 for(const entry of entries){BUDDY_CATALOG_BY_KEY.set(entry.key,entry);if(!known.has(entry.key)){known.add(entry.key);BUDDY_CATALOG.push(entry);}}
 const previousCatalog=buddyDisplayCatalog;
 buddyDisplayCatalog=function(){const map=new Map(previousCatalog.apply(this,arguments).map(e=>[e.key,e]));for(const e of entries)if(!map.has(e.key))map.set(e.key,e);return [...map.values()];};
 for(const [id,def] of Object.entries(specs)){const list=BUDDY_AREA_FAMILIES[def.area];if(Array.isArray(list)&&!list.includes(id))list.push(id);}
 const priorRender=renderBuddyCollection;
 renderBuddyCollection=function(){
   const result=priorRender.apply(this,arguments);
   if(buddyCollectionFilter!=='shiny'||!ui.buddyCollectionGrid)return result;
   for(const id of ids){
     const entry=entries.find(x=>x.enemyId===id&&x.shiny),token=`data-v359-shiny-${id}`;
     if(!entry||ui.buddyCollectionGrid.querySelector(`[${token}]`))continue;
     const qty=buddyOwnedQuantity(entry.key),tile=document.createElement('button');
     tile.type='button';tile.className=`buddy-tile buddy-family-tile ${qty?'caught':'unknown'} shiny`;tile.setAttribute(token,'');
     const art=document.createElement('span');art.className='buddy-tile-art';
     const img=document.createElement('img');img.src=entry.image;img.loading='lazy';img.alt='';art.append(img);
     const label=document.createElement('strong');label.textContent=qty?specs[id].name+' ✨':'???';
     const sub=document.createElement('small');sub.textContent=qty?'Shiny befriended':'Shiny undiscovered';
     tile.append(art,label,sub);tile.addEventListener('click',()=>openBuddyDetail(entry));ui.buddyCollectionGrid.append(tile);
   }
   return result;
 };
 window.DuckieExtraContentV359={ids,specs};
})();
