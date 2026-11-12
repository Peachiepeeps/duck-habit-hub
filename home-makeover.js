/* Duckie Days v24.372 — Home Hub Room Makeover, safely separate from OC positioning. */
(() => {
 'use strict';
 const MAKEOVER_PRICE=100;
 const UPGRADES={
   'room-makeover':{name:'Room Makeover',icon:'🎨',description:'Unlock room recoloring for every OC',price:1000},
   'gingham':{name:'Gingham Pattern',icon:'🧺',description:'Two-color gingham for every OC',price:1000},
   'ombre':{name:'Ombré Pattern',icon:'🌈',description:'Smooth blended colors for every OC',price:1000},
   'checkers':{name:'Checkered Pattern',icon:'🏁',description:'Two-color checkerboard for every OC',price:1000},
   'stripes':{name:'Vertical Stripes',icon:'║',description:'Simple vertical two-color stripes for every OC',price:1000}
 };
 const PALETTE=["#FFFDF8","#F9F5EA","#EEE5D5","#DCD2C2","#CBB9A4","#AA9180","#79665A","#594A48","#28262D","#FFF0F4","#F9DDE8","#F1B9C9","#E98BA9","#C76586","#9F4168","#E4AED4","#F5D8ED","#FFF1E2","#FFE0C7","#F5BB99","#EF956F","#CF785E","#FFD7AA","#FFE5AD","#EDCE7D","#FFF2BD","#FFE480","#E4CF67","#C2B45F","#E4F0BD","#C8E0AA","#A0CC92","#E2F7E9","#B6E7CB","#94DBB4","#75C5A0","#4EA985","#B5E9E6","#89DBD7","#62B9BE","#E4F5FB","#B6D8F7","#8DBDE9","#679FDD","#486FBC","#D4D9F8","#AAB9ED","#889BDB","#EFE6FF","#E7D5FA","#CBB5F0","#B6A6CF","#987FBD","#7C619C","#6F5D7D","#E4D7CB","#D2BCA8","#A88A71","#86654D","#5F4038","#F9C4B3","#BD8D8C","#FFDFE1","#FFBFC3","#F5959C","#EC646E","#D6404E","#BF2638","#9C2433","#7C192B","#5D1421","#3E1018","#B13E4E","#E94E64","#505058","#414149","#36363C","#24252B","#17181D"];
 const REGIONS=[['Wallpaper','wallpaper'],['Ceiling Trim','ceiling'],['Baseboard','baseboard'],['Floor','floor']];
 const PATTERNS=[['solid','Solid'],['gingham','Gingham'],['ombre','Ombré'],['checkers','Checkered'],['stripes','Striped']];
 const creamDefaults={
   wallpaper:{primary:'#F4E2C8',secondary:'#FFF9F0',pattern:'solid'},
   ceiling:{primary:'#FFF9F0',secondary:'#F4E2C8',pattern:'solid'},
   baseboard:{primary:'#FFF4E6',secondary:'#F4E2C8',pattern:'solid'},
   floor:{primary:'#C99C72',secondary:'#FFF4E6',pattern:'solid'}
 };
 const safeColors=new Set(PALETTE.map(x=>x.toLowerCase()));
 function state(){
   if(!save.homeRoomMakeover || typeof save.homeRoomMakeover!=='object')save.homeRoomMakeover={unlocked:false,patterns:[],byCharacter:{}};
   const s=save.homeRoomMakeover;
   if(!Array.isArray(s.patterns))s.patterns=[];
   if(!s.byCharacter || typeof s.byCharacter!=='object')s.byCharacter={};
   return s;
 }
 function unlocked(id){const s=state();return id==='room-makeover'?!!s.unlocked:s.patterns.includes(id)}
 function activeDesign(id=save.selectedCharacter){return state().byCharacter[id] || null}
 function patternCss(entry){
   const a=/^#[0-9a-f]{6}$/i.test(String(entry?.primary))?entry.primary:'#F4E2C8';
   const b=/^#[0-9a-f]{6}$/i.test(String(entry?.secondary))?entry.secondary:'#FFF9F0';
   const pattern=entry?.pattern;
   switch(pattern){
    case 'gingham':return `repeating-linear-gradient(0deg,transparent 0 12px,${a}88 12px 21px),repeating-linear-gradient(90deg,transparent 0 12px,${a}88 12px 21px),${b}`;
    case 'checkers':return `conic-gradient(${a} 25%,${b} 0 50%,${a} 0 75%,${b} 0) 0 0 / 30px 30px`;
    case 'ombre':return `linear-gradient(145deg,${a},${b})`;
    case 'stripes':return `repeating-linear-gradient(90deg,${a} 0 12px,${b} 12px 24px)`;
    default:return a;
   }
 }
 function overlay(area,entry){const node=document.createElement('div');node.className='home-makeover-layer';node.style.setProperty('--makeover-mask',`url("assets/rooms/makeover/${area}.png")`);node.style.background=patternCss(entry);return node}
 function paint(container,design){
  container.replaceChildren();
  if(!design)return;
  for(const [label,area] of REGIONS){const entry=design[area];if(entry)container.append(overlay(area,entry));}
 }
 function paintLive(){
   const layers=document.getElementById('homeMakeoverLayers');if(!layers)return;
   const design=state().unlocked?activeDesign():null;
   paint(layers,design);
   if(state().unlocked){
     // The previous automatic patterned wallpaper overlay is disabled only in makeover mode.
     roomWallpaperOverlay.classList.add('hidden');
     // Actual room artwork returns to its original warm cream/brown base once unlocked.
     roomImage.src='assets/rooms/cream.webp';
     roomPickerText.textContent='Customize Room';
     roomPickerButton.setAttribute('aria-label','Customize this OC room colors');
   }
 }
 const originalRenderRoom=renderRoom;
 renderRoom=function(...args){const result=originalRenderRoom.apply(this,args);paintLive();return result};
 const originalPickerDisplay=updateRoomPickerButtonDisplay;
 updateRoomPickerButtonDisplay=function(...args){
   const result=originalPickerDisplay.apply(this,args);
   if(state().unlocked){roomPickerText.textContent='Customize Room';roomPickerButton.setAttribute('aria-label','Customize this OC room colors');}
   return result;
 };
 const originalRenderShop=renderShop;
 renderShop=function(...args){const result=originalRenderShop.apply(this,args);appendShopUpgrades();return result};
 function appendShopUpgrades(){
  if(currentShopTab!=='rooms')return;
  for(const [id,info] of Object.entries(UPGRADES).reverse()){
   if(unlocked(id))continue;
   const button=document.createElement('button');button.type='button';button.className='shop-item-card shop-room-card home-makeover-shop-card';
   const art=document.createElement('span');art.className='shop-item-art shop-room-art';art.textContent=info.icon;
   const copy=document.createElement('span');copy.className='shop-item-copy';
   const name=document.createElement('strong');name.textContent=info.name;
   const price=document.createElement('span');price.className='shop-item-price';
   const image=document.createElement('img');image.src='assets/ui/pink-coin.webp';image.alt='';price.append(image,` ${info.price.toLocaleString()}`);
   const note=document.createElement('span');note.className='shop-item-owned';note.textContent=info.description;
   copy.append(name,price,note);button.append(art,copy);
   button.onclick=()=>openUpgrade(id);
   shopGrid.prepend(button);
  }
 }
 function openUpgrade(id){
   const info=UPGRADES[id];if(!info||unlocked(id))return;
   const modal=baseDialog(info.name);
   const main=document.createElement('div');main.style.cssText='display:grid;place-items:center;gap:16px;flex:1;text-align:center;';
   const art=document.createElement('div');art.style.fontSize='65px';art.textContent=info.icon;
   const desc=document.createElement('p');desc.textContent=info.description+'. This unlock is shared across all OCs.';
   const price=document.createElement('strong');price.textContent='1,000 Pink Coins';
   const remaining=document.createElement('p');remaining.className='home-makeover-note';remaining.textContent=`Balance: ${Number(save.coins||0).toLocaleString()} Pink Coins`;
   main.append(art,desc,price,remaining);modal.dialog.append(main);
   const footer=document.createElement('div');footer.className='home-makeover-bottom';
   const cancel=makeButton('Back',()=>modal.close());
   const buy=makeButton('Unlock · 1,000',()=>{
     if(unlocked(id))return;
     if(Number(save.coins||0)<1000){remaining.textContent='Not enough Pink Coins!';return;}
     save.coins-=1000;
     const s=state();
     if(id==='room-makeover'){
       s.unlocked=true;
       for(const characterId of Object.keys(CHARACTERS)){
         setCharacterRoomId('cream',characterId);
         setCharacterWallpaperId(null,characterId);
       }
       if(currentRoomView==='wing' && save.roomExpansion?.unlocked)currentRoomExpansionState().accentRoom='cream';
     } else if(!s.patterns.includes(id)){s.patterns.push(id)}
     persist();modal.close();renderRoom();renderShop();renderRoomPicker();
     showToast(`${info.name} unlocked for every OC! ♡`);
   });buy.classList.add('primary');buy.disabled=Number(save.coins||0)<1000;
   footer.append(cancel,buy);modal.dialog.append(footer);
 }
 function makeButton(label,action){const b=document.createElement('button');b.type='button';b.textContent=label;b.onclick=action;return b}
 function baseDialog(title){
   const backdrop=document.createElement('div');backdrop.className='home-makeover-backdrop';
   const dialog=document.createElement('section');dialog.className='home-makeover-dialog';dialog.setAttribute('role','dialog');dialog.setAttribute('aria-modal','true');dialog.setAttribute('aria-label',title);
   const header=document.createElement('div');header.className='home-makeover-top';
   const heading=document.createElement('h2');heading.className='home-makeover-title';heading.textContent=title;
   const balance=document.createElement('span');balance.className='home-makeover-balance';balance.textContent=`${Number(save.coins||0).toLocaleString()} Coins`;
   const close=makeButton('×',()=>backdrop.remove());close.className='home-makeover-close';close.setAttribute('aria-label','Close');
   header.append(heading,balance,close);dialog.append(header);backdrop.append(dialog);
   backdrop.addEventListener('click',e=>{if(e.target===backdrop)backdrop.remove()});
   document.body.append(backdrop);close.focus();
   return {dialog,close:()=>backdrop.remove(),balance};
 }
 function openCustomRoom(){
  if(!state().unlocked){showToast('Unlock Room Makeover for 1,000 Pink Coins in Shop → Rooms!');return;}
  const oc=save.selectedCharacter;
  const saved={...structuredClone(creamDefaults),...structuredClone(activeDesign(oc)||{})};
  const draft=structuredClone(saved);
  let selected='wallpaper';let colorTarget='primary';
  const modal=baseDialog('Room Makeover ♡');
  const screen=document.createElement('div');screen.className='home-makeover-top-preview';
  const preview=document.createElement('div');preview.className='home-makeover-preview';
  const image=document.createElement('img');image.src='assets/rooms/cream.webp';image.alt='Room color preview';preview.append(image);
  const previewLayers=document.createElement('div');previewLayers.style.cssText='position:absolute;inset:0';preview.append(previewLayers);
  const fields=document.createElement('div');fields.className='home-makeover-fields';
  const regionLabel=document.createElement('label');regionLabel.textContent='Choose room area';
  const regionSelect=document.createElement('select');for(const [label,key] of REGIONS)regionSelect.add(new Option(label,key));regionLabel.append(regionSelect);
  const patternLabel=document.createElement('label');patternLabel.textContent='Pattern';
  const patternSelect=document.createElement('select');for(const [key,label] of PATTERNS){const option=new Option(label,key);if(key!=='solid'&&!unlocked(key)){option.disabled=true;option.textContent=`🔒 ${label}`};patternSelect.add(option)}
  patternLabel.append(patternSelect);fields.append(regionLabel,patternLabel);screen.append(preview,fields);modal.dialog.append(screen);
  const colorTabs=document.createElement('div');colorTabs.className='home-makeover-color-row';
  const first=makeButton('Primary color',()=>switchColor('primary'));first.className='home-makeover-color-tab';
  const second=makeButton('Secondary color',()=>switchColor('secondary'));second.className='home-makeover-color-tab';
  colorTabs.append(first,second);modal.dialog.append(colorTabs);
  const swatches=document.createElement('div');swatches.className='home-makeover-colors';modal.dialog.append(swatches);
  const msg=document.createElement('p');msg.className='home-makeover-note';msg.textContent='Preview is free. Apply a new room design for 100 Pink Coins.';modal.dialog.append(msg);
  const actions=document.createElement('div');actions.className='home-makeover-bottom';
  const back=makeButton('Cancel',()=>modal.close());
  const apply=makeButton('Apply · 100 Coins',()=>{
    if(JSON.stringify(draft)===JSON.stringify(saved)){modal.close();showToast('Your room is already using these colors!');return}
    if(Number(save.coins||0)<MAKEOVER_PRICE){msg.textContent='Not enough Pink Coins to apply!';return}
    save.coins-=MAKEOVER_PRICE;
    state().byCharacter[oc]=structuredClone(draft);
    persist();modal.close();renderRoom();showToast('Room makeover complete! ♡ -100 Pink Coins');
  });apply.classList.add('primary');actions.append(back,apply);modal.dialog.append(actions);
  function ensure(){return draft[selected]||(draft[selected]={...creamDefaults[selected]})}
  function redraw(){
    previewLayers.replaceChildren();
    for(const [label,key] of REGIONS){const entry=draft[key];if(entry)previewLayers.append(overlay(key,entry))}
    patternSelect.value=ensure().pattern;
    first.classList.toggle('active',colorTarget==='primary');second.classList.toggle('active',colorTarget==='secondary');
    swatches.replaceChildren();
    for(const hex of PALETTE){const chip=makeButton('',()=>{ensure()[colorTarget]=hex;redraw()});chip.className='home-makeover-chip';chip.style.background=hex;
      chip.title=hex;chip.setAttribute('aria-label',`Choose ${hex}`);chip.classList.toggle('selected',String(ensure()[colorTarget]).toLowerCase()===hex.toLowerCase());swatches.append(chip)}
    apply.disabled=Number(save.coins||0)<MAKEOVER_PRICE;
  }
  function switchColor(next){colorTarget=next;redraw()}
  regionSelect.onchange=()=>{selected=regionSelect.value;redraw()};
  patternSelect.onchange=()=>{if(patternSelect.value!=='solid'&&!unlocked(patternSelect.value))return;ensure().pattern=patternSelect.value;redraw()};
  redraw();
 }
 // Capture only after unlocking: the original room/wallpaper picker stays available until purchase.
 roomPickerButton.addEventListener('click',event=>{
   if(!state().unlocked)return;
   event.stopImmediatePropagation();event.preventDefault();closeRoomPicker();openCustomRoom();
 },true);
 // Old picker overlay must not come back from routine screen updates.
 const originalRenderPicker=renderRoomPicker;
 renderRoomPicker=function(...args){const result=originalRenderPicker.apply(this,args);if(state().unlocked)closeRoomPicker();return result};
 paintLive();updateRoomPickerButtonDisplay();
})();
