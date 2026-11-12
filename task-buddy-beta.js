/* Task Buddy Room beta integration for Duckie Days 24.359.
   Separate beta iframe: keeps prototype inventory/currencies out of real game saves. */
(function(){
  'use strict';
  const ID='duckieTaskBuddyBetaOverlay';
  const BTN='duckieTaskBuddyBetaOpen';
  let frame=null, overlay=null, updater=null, lastCount=-1;
  function localDayKey(){const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');}
  function currentSave(){
    try{if(typeof save!=='undefined' && save && typeof save==='object')return save;}catch(e){}
    try{return JSON.parse(localStorage.getItem('duckHabitHubSave_v1')||'{}');}catch(e){return {}}
  }
  function completedToday(){
    const progress=currentSave()?.taskProgression||{};
    if(progress.dayKey!==localDayKey())return 0;
    return Math.max(0,Math.floor(Number(progress.completedToday)||0));
  }
  function sendCount(force){
    if(!frame?.contentWindow || !overlay || overlay.hidden)return;
    const count=completedToday();
    if(force||lastCount!==count){lastCount=count;frame.contentWindow.postMessage({type:'duckie-buddy:task-count',count},location.origin);}
  }

const PAINT_IDS = ['red-paint','dark-red-paint','magenta-paint','orange-paint','peach-paint',
  'gold-paint','silver-paint','bronze-paint','green-paint','mint-paint','aqua-paint',
  'sky-blue-paint','blue-paint','periwinkle-paint','purple-paint','violet-paint',
  'pink-paint','grey-paint','black-paint'];
const paintSet=new Set(PAINT_IDS);
function snapshot(){
  const saved=currentSave();
  return {
    bucks:Math.max(0,Math.floor(Number(saved.taskProgression?.duckBucks)||0)),
    paint:Object.fromEntries(PAINT_IDS.map(id=>[id,Math.max(0,Math.floor(Number(saved.inventory?.[id])||0))]))
  };
}
function sendSnapshot(){
  if(!frame?.contentWindow||!overlay||overlay.hidden)return;
  frame.contentWindow.postMessage({type:'duckie-buddy:state',...snapshot()},location.origin);
}
function spendFromMainGame(request){
  const currency=request.currency, amount=request.amount;
  if(!Number.isSafeInteger(amount)||amount<1||amount>100)return {ok:false,error:'Invalid purchase amount.'};
  const saved=currentSave();
  if(!saved || typeof saved!=='object')return {ok:false,error:'Game save unavailable.'};
  // Never mutate a detached localStorage copy. Only use the live game's save object.
  if(typeof save==='undefined'||saved!==save||typeof persist!=='function')return {ok:false,error:'Game save is not ready; reopen the Buddy Room.'};
  let undo=null;
  if(currency==='bucks'){
    if(amount!==2&&amount!==5&&amount!==10)return {ok:false,error:'Unexpected Duck Bucks price.'};
    const balance=Math.max(0,Math.floor(Number(saved.taskProgression?.duckBucks)||0));
    if(balance<amount)return {ok:false,error:'Not enough Duck Bucks.'};
    if(!saved.taskProgression || typeof saved.taskProgression!=='object')return {ok:false,error:'Task Shop is not ready.'};
    undo=()=>{saved.taskProgression.duckBucks=balance};
    saved.taskProgression.duckBucks=balance-amount;
  } else if(currency==='paint'){
    const id=request.paintId;
    if(amount!==1||!paintSet.has(id))return {ok:false,error:'Invalid Paint selection.'};
    const balance=Math.max(0,Math.floor(Number(saved.inventory?.[id])||0));
    if(balance<1)return {ok:false,error:'Not enough '+id.replace(/-/g,' ')+'.'};
    undo=()=>{saved.inventory[id]=balance};
    saved.inventory[id]=balance-1;
  } else return {ok:false,error:'Unknown currency.'};
  try{persist();}
  catch(error){try{undo?.()}catch(e){}return {ok:false,error:'Could not save your purchase. Please refresh and check the balance.'};}
  try{if(typeof renderInventory==='function')renderInventory();}catch(e){}
  try{if(typeof renderTaskShop==='function')renderTaskShop();}catch(e){}
  return {ok:true};
}
function hide(){if(overlay)overlay.hidden=true;const tasks=document.getElementById('tasksPanel');if(tasks)tasks.inert=false;document.body.classList.remove('duckie-buddy-beta-open');if(updater){clearInterval(updater);updater=null;}const opener=document.getElementById(BTN);opener?.focus();}
  function show(){
    if(!overlay)return;
    overlay.hidden=false;const tasks=document.getElementById('tasksPanel');if(tasks)tasks.inert=true;document.body.classList.add('duckie-buddy-beta-open');
    lastCount=-1;
    if(!frame.src)frame.src='./task-buddy-beta.html?v=24.372';
    sendCount(true);sendSnapshot();
    if(updater)clearInterval(updater);
    updater=setInterval(()=>{sendCount(false);sendSnapshot()},1200);
  }
  function install(){
    const tasks=document.getElementById('tasksPanel');
    const actions=tasks?.querySelector('.tasks-header-actions-v257');
    if(!tasks||!actions||document.getElementById(BTN))return;
    const btn=document.createElement('button');btn.id=BTN;btn.type='button';
    btn.className='duckie-task-buddy-beta-button';btn.textContent='Task Buddy Room';
    btn.addEventListener('click',show);
    const addTask=actions.querySelector('#addTaskButton');
    if(addTask)addTask.insertAdjacentElement('afterend',btn);else actions.appendChild(btn);
    overlay=document.createElement('div');overlay.id=ID;overlay.hidden=true;
    overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Task Buddy Room');
    const backdrop=document.createElement('button');backdrop.type='button';backdrop.className='duckie-task-buddy-beta-backdrop';backdrop.setAttribute('aria-label','Close Task Buddy Room');backdrop.addEventListener('click',hide);
    frame=document.createElement('iframe');frame.title='Task Buddy Room';frame.className='duckie-task-buddy-beta-frame';frame.setAttribute('loading','eager');
    frame.addEventListener('load',()=>{sendCount(true);sendSnapshot()});
    overlay.append(backdrop,frame);document.body.appendChild(overlay);
    window.addEventListener('message',(event)=>{
      if(event.origin!==location.origin||event.source!==frame.contentWindow)return;
      if(event.data?.type==='duckie-buddy:close')hide();
      if(event.data?.type==='duckie-buddy:ready'){sendCount(true);sendSnapshot()}
      if(event.data?.type==='duckie-buddy:snapshot')sendSnapshot();
      if(event.data?.type==='duckie-buddy:spend'){
        const requestId=event.data.requestId;
        const result=spendFromMainGame(event.data);
        frame.contentWindow.postMessage({type:'duckie-buddy:spent',requestId,...result,...snapshot()},location.origin);
      }
    });
    document.addEventListener('keydown',(event)=>{if(event.key==='Escape'&&!overlay.hidden){event.stopPropagation();hide();}},true);
    window.addEventListener('pageshow',()=>sendCount(true));
    document.addEventListener('visibilitychange',()=>{if(!document.hidden)sendCount(true)});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
