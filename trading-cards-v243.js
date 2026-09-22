(function(){
  "use strict";
  const SAVE_KEY="duckHabitHubSave_v1";
  const order={common:1,uncommon:2,rare:3,fabled:4};
  const labels={common:"Common",uncommon:"Uncommon",rare:"Rare",fabled:"Fabled"};
  const templates={common:"card-common.png",uncommon:"card-uncommon.png",rare:"card-rare.png",fabled:"card-rare.png"};
  const stage={
    "cat-slime":"Meadow","bee":"Meadow","flower":"Meadow","mushroom-cat":"Meadow Boss","mimic":"Mystery Chest",
    "cool-seagull":"Ocean","sea-turtle":"Ocean","catfish":"Ocean","vampire-squid":"Ocean Boss",
    "acorn-mouse":"Forest","seaunicorn":"Forest","tree-squirrel":"Forest Boss","jellybun":"Forest Boss",
    "catterpillar":"Cloud Garden","sea-star":"Cloud Garden","star-mouse":"Cloud Garden","puff-fairy":"Cloud Garden","tulipa":"Cloud Garden","snoud":"Cloud Garden","cloud-bunny":"Cloud Garden","lunar-moth":"Cloud Garden","aries":"Cloud Garden Boss","cherub-duck":"Cloud Garden Boss",
    "apple-baby":"Candyland","gummy-worm":"Candyland","pudding-pig":"Candyland","gingerlolly":"Candyland","candycane-deer":"Candyland","gummy-shark":"Candyland Boss","cream-fox":"Candyland Boss"
  };
  const normal=[
    ["cat-slime","Cat Slime","enemies/cat-slime/base/idle-1-neutral.webp"],["bee","Bee","enemies/bee/base/idle-1-high.webp"],["flower","Flower","enemies/flower/base/idle-1.webp"],
    ["cool-seagull","Cool Seagull","enemies/cool-seagull/base/idle-1.webp"],["sea-turtle","Sea Turtle","enemies/sea-turtle/base/idle-1.webp"],["catfish","Cat-Fish","enemies/catfish/base/idle-1.webp"],
    ["acorn-mouse","Acorn Mouse","enemies/acorn-mouse/base/acorn-mouse-idle-1.webp"],["seaunicorn","Seaunicorn","enemies/seaunicorn/base/seaunicorn-idle-1.webp"],
    ["catterpillar","Catterpillar","enemies/catterpillar/base/idle-1.png"],["sea-star","Sea Star","enemies/sea-star/base/idle-1.png"],["star-mouse","Star Mouse","enemies/star-mouse/base/idle-1.png"],["puff-fairy","Puff Fairy","enemies/puff-fairy/base/idle-1.png"],["tulipa","Tulipa","enemies/tulipa/base/idle-1.png"],["snoud","Snoud","enemies/snoud/base/idle-1.png"],["cloud-bunny","Cloud Bunny","enemies/cloud-bunny/base/idle-1.png"],["lunar-moth","Lunar Moth","enemies/lunar-moth/base/idle-1.png"],
    ["apple-baby","Apple Baby","enemies/apple-baby/base/idle-1.webp"],["gummy-worm","Gummy Worm","enemies/gummy-worm/base/idle-1.webp"],["pudding-pig","Pudding Pig","enemies/pudding-pig/base/idle-1.webp"],["gingerlolly","Gingerlolly","enemies/gingerlolly/base/idle-1.webp"],["candycane-deer","Candycane Deer","enemies/candycane-deer/base/idle-1.webp"],
    ["mimic","Mimic","enemies/mimic/base/open-1.webp"]
  ];
  const bosses=[
    ["mushroom-cat","Big Mushroom Cat","bosses/mushroom-cat/base/idle-1.webp"],["vampire-squid","Vampire Squid","bosses/vampire-squid/base/idle-1.webp"],["tree-squirrel","Tree Squirrel","bosses/tree-squirrel/base/tree-squirrel-idle-1.webp"],["jellybun","Jellybun","bosses/jellybun/base/jellybun-idle-1.webp"],
    ["aries","Aries","bosses/aries/base/idle-1.png"],["cherub-duck","Cherub Duck","bosses/cherub-duck/base/idle-1.png"],["gummy-shark","Gummy Shark","bosses/gummy-shark/base/idle-1.webp"],["cream-fox","Cream Fox","bosses/cream-fox/base/idle-1.webp"]
  ];
  const ocs=[
    ["peep","Peep","characters/peep/base/idle-1.webp"],["miko","Miko","characters/miko/base/idle-1.webp"],["io","Io","characters/io/base/idle-1.webp"],["miho","Miho","characters/miho/base/idle-1.webp"],["annika","Annika","characters/annika/base/idle-1.webp"]
  ];
  const shiny=[
    ["cat-slime","Rainbow Slime Kitty","shinies/rainbow-slime-kitty-idle-1.webp"],["bee","Sky Bee","shinies/sky-bee-idle-1.webp"],["flower","Midnight Bloom","shinies/midnight-bloom-idle-1.webp"],["mushroom-cat","Cocoa Mushroom Cat","shinies/cocoa-mushroom-cat-idle-1.webp"],["mimic","Amethyst Mimic","shinies/amethyst-mimic-idle-1.webp"],
    ["cool-seagull","Royal Seagull","shinies/royal-seagull-idle-1.webp"],["sea-turtle","Shiny Sea Turtle","enemies/sea-turtle/base/Sea-turtle-shiny-idle-1.png"],["catfish","Bubblegum Catfish","shinies/bubblegum-catfish-idle-1.webp"],["vampire-squid","Crimson Squid","shinies/crimson-squid-idle-1.webp"],
    ["acorn-mouse","Albino Acorn Mouse","shinies/albino-acorn-mouse-idle-1.webp"],["seaunicorn","Aurora Seaunicorn","shinies/aurora-seaunicorn-idle-1.webp"],["tree-squirrel","Sakura Tree Squirrel","shinies/sakura-tree-squirrel-idle-1.webp"],["jellybun","Rainbow Jellybun","shinies/rainbow-jellybun-idle-1.webp"],
    ["catterpillar","Shiny Catterpillar","enemies/catterpillar/base/shiny-idle-1.png"],["sea-star","Shiny Sea Star","enemies/sea-star/base/shiny-idle-1.png"],["star-mouse","Shiny Star Mouse","enemies/star-mouse/base/shiny-idle-1.png"],["puff-fairy","Shiny Puff Fairy","enemies/puff-fairy/base/shiny-idle-1.png"],["tulipa","Shiny Tulipa","enemies/tulipa/base/shiny-idle-1.png"],["snoud","Shiny Snoud","enemies/snoud/base/shiny-idle-1.png"],["cloud-bunny","Shiny Cloud Bunny","enemies/cloud-bunny/base/shiny-idle-1.png"],["lunar-moth","Shiny Lunar Moth","enemies/lunar-moth/base/shiny-idle-1.png"],["aries","Shiny Aries","bosses/aries/base/shiny-idle-1.png"],["cherub-duck","Shiny Cherub Duck","bosses/cherub-duck/base/shiny-idle-1.png"],
    ["apple-baby","Shiny Apple Baby","enemies/apple-baby/base/shiny-idle-1.webp"],["gummy-worm","Shiny Gummy Worm","enemies/gummy-worm/base/shiny-idle-1.webp"],["pudding-pig","Shiny Pudding Pig","enemies/pudding-pig/base/shiny-idle-1.webp"],["gingerlolly","Shiny Gingerlolly","enemies/gingerlolly/base/shiny-idle-1.webp"],["candycane-deer","Shiny Candycane Deer","enemies/candycane-deer/base/shiny-idle-1.webp"],["gummy-shark","Shiny Gummy Shark","bosses/gummy-shark/base/shiny-idle-1.webp"],["cream-fox","Shiny Cream Fox","bosses/cream-fox/base/shiny-idle-1.webp"]
  ];
  const fabled=[
    ["slime-kitty","Slime Kitty","trading-cards/fabled/F-slime-kitty.png","Fabled"],
    ["acorn-mouse","Acorn Mouse","trading-cards/fabled/F-acorn-mouse.png","Fabled"],
    ["bee","Bee","trading-cards/fabled/F-bee.png","Fabled"],
    ["flower","Flower","trading-cards/fabled/F-flower.png","Fabled"],
    ["mimic","Mimic","trading-cards/fabled/F-mimic.png","Fabled"]
  ];
  const cards=[];
  normal.forEach((x,i)=>cards.push({id:`c-${x[0]}`,enemyId:x[0],name:x[1],art:x[2],rarity:"common",number:`C-${String(i+1).padStart(3,"0")}`,category:stage[x[0]]||"Duck Quest",hint:`Defeat ${x[1]} in Duck Quest, find it in a pack, or check the Daily Shop.`}));
  bosses.forEach((x,i)=>cards.push({id:`u-${x[0]}`,enemyId:x[0],name:x[1],art:x[2],rarity:"uncommon",number:`U-${String(i+1).padStart(3,"0")}`,category:stage[x[0]]||"Duck Quest Boss",hint:`Defeat ${x[1]} in Duck Quest, find it in a pack, or check the Daily Shop.`}));
  ocs.forEach((x,i)=>cards.push({id:`u-oc-${x[0]}`,characterId:x[0],name:x[1],art:x[2],rarity:"uncommon",number:`U-${String(bosses.length+i+1).padStart(3,"0")}`,category:"Playable OC",hint:"Find this character card in a Card Pack or the Daily Shop."}));
  shiny.forEach((x,i)=>cards.push({id:`r-${x[0]}`,enemyId:x[0],name:x[1],art:x[2],rarity:"rare",number:`R-${String(i+1).padStart(3,"0")}`,category:`${stage[x[0]]||"Duck Quest"} Shiny`,hint:`Encounter the shiny ${x[1]} in Duck Quest, or get very lucky with a pack or Daily Shop offer.`}));
  fabled.forEach((x,i)=>cards.push({id:`f-${x[0]}`,name:x[1],art:x[2],rarity:"fabled",number:`F-${String(i+1).padStart(3,"0")}`,category:x[3],hint:"Find this Fabled card in a Card Pack or as a very rare Daily Shop offer."}));
  cards.push({id:"r-love-lukio",characterId:"lukio",name:"Lukio",art:"love-interests/lukio/Lukio-idle-1.png",rarity:"rare",number:"R-031",category:"Miko Love Interest",hint:"Meet Lukio while exploring Duck Quest as Miko."});
  const byId=Object.fromEntries(cards.map(card=>[card.id,card]));
  function basePrefix(){return /\/(duck-quest|memory-game|crane-game)\//.test(location.pathname)?"../":"";}
  function asset(path){return `${basePrefix()}${path}`;}
  function cardArt(card){return asset(`duck-quest/assets/${card.art}`);}
  function template(card){return asset(`assets/trading-cards/${templates[card.rarity]||templates.rare}`);}
  function packAsset(name){return asset(`assets/trading-cards/${name}`);}
  function ensureState(data){
    if(!data || typeof data!=="object") return null;
    if(!data.tradingCards || typeof data.tradingCards!=="object" || Array.isArray(data.tradingCards)) data.tradingCards={};
    const state=data.tradingCards;
    if(!state.owned || typeof state.owned!=="object" || Array.isArray(state.owned)) state.owned={};
    if(!Array.isArray(state.favorites)) state.favorites=[];
    if(!Array.isArray(state.unseen)) state.unseen=[];
    state.unopenedPacks=Math.max(0,Math.floor(Number(state.unopenedPacks)||0));
    state.starterPackGranted=Boolean(state.starterPackGranted);
    if(!state.dailyShop || typeof state.dailyShop!=="object") state.dailyShop={dayKey:"",offers:[]};
    if(!Array.isArray(state.dailyShop.offers)) state.dailyShop.offers=[];
    if(!state.stats || typeof state.stats!=="object") state.stats={packsOpened:0};
    state.stats.packsOpened=Math.max(0,Math.floor(Number(state.stats.packsOpened)||0));
    if(!state.stats.shinyQuestDrops || typeof state.stats.shinyQuestDrops!=="object") state.stats.shinyQuestDrops={};
    return state;
  }
  function readSave(){try{const raw=localStorage.getItem(SAVE_KEY);const data=raw?JSON.parse(raw):{};ensureState(data);return data;}catch(e){const data={};ensureState(data);return data;}}
  function writeSave(data){ensureState(data);localStorage.setItem(SAVE_KEY,JSON.stringify(data));}
  function grantCard(data,id,qty=1){const state=ensureState(data),card=byId[id];if(!state||!card)return null;const before=Math.max(0,Math.floor(Number(state.owned[id])||0));const after=before+Math.max(1,Math.floor(Number(qty)||1));state.owned[id]=after;if(before===0&&!state.unseen.includes(id))state.unseen.push(id);return {card,before,after,isNew:before===0};}
  function grantPack(data,qty=1){const state=ensureState(data);if(!state)return 0;state.unopenedPacks+=Math.max(1,Math.floor(Number(qty)||1));return state.unopenedPacks;}
  function pick(list){return list[Math.floor(Math.random()*list.length)];}
  function byRarity(rarity){return cards.filter(card=>card.rarity===rarity);}
  function rollRarity(weights={common:.795,uncommon:.18,rare:.02,fabled:.005}){let roll=Math.random(),last="common";for(const [rarity,chance] of Object.entries(weights)){last=rarity;roll-=chance;if(roll<=0)return rarity;}return last;}
  function rollCard(rarity){return pick(byRarity(rarity)||byRarity("common"));}
  function rollPack(){return [rollCard("common"),rollCard("common"),rollCard(rollRarity({common:.695,uncommon:.25,rare:.05,fabled:.005}))];}
  function cardIdForEnemy(enemy){if(!enemy)return null;const id=String(enemy.id||enemy.enemyId||"");if(!id)return null;if(enemy.shiny||enemy.forceShiny||enemy.isShiny)return `r-${id}`;if(enemy.boss||bosses.some(x=>x[0]===id))return `u-${id}`;return byId[`c-${id}`]?`c-${id}`:null;}
  function createFace(cardOrId,opts={}){
    const card=typeof cardOrId==="string"?byId[cardOrId]:cardOrId;if(!card)return document.createElement("div");
    const locked=Boolean(opts.locked),face=document.createElement("div");face.className=`tc-face tc-${card.rarity}${locked?" tc-locked":""}`;face.dataset.cardId=card.id;
    const frame=document.createElement("img");frame.className="tc-frame";frame.src=template(card);frame.alt="";
    const art=document.createElement("img");art.className="tc-art";art.src=cardArt(card);art.alt=locked?"Hidden card":card.name;
    const top=document.createElement("strong");top.className="tc-name tc-name-top";top.textContent=locked?"???":card.name;
    const bottom=document.createElement("strong");bottom.className="tc-name tc-name-bottom";bottom.textContent=locked?"???":card.name;
    const num=document.createElement("span");num.className="tc-number";num.textContent=card.number;
    face.append(art,frame,top,bottom,num);if(card.rarity==="rare"||card.rarity==="fabled"){const shine=document.createElement("i");shine.className="tc-shine";face.append(shine);}return face;
  }
  window.DuckieTradingCards={SAVE_KEY,cards,byId,labels,order,asset,cardArt,template,packAsset,ensureState,readSave,writeSave,grantCard,grantPack,byRarity,rollRarity,rollCard,rollPack,cardIdForEnemy,createFace};
})();
