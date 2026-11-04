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
  function hide(){if(overlay)overlay.hidden=true;const tasks=document.getElementById('tasksPanel');if(tasks)tasks.inert=false;document.body.classList.remove('duckie-buddy-beta-open');if(updater){clearInterval(updater);updater=null;}const opener=document.getElementById(BTN);opener?.focus();}
  function show(){
    if(!overlay)return;
    overlay.hidden=false;const tasks=document.getElementById('tasksPanel');if(tasks)tasks.inert=true;document.body.classList.add('duckie-buddy-beta-open');
    lastCount=-1;
    if(!frame.src)frame.src='./task-buddy-beta.html?v=4';
    sendCount(true);
    if(updater)clearInterval(updater);
    updater=setInterval(()=>sendCount(false),1200);
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
    frame.addEventListener('load',()=>sendCount(true));
    overlay.append(backdrop,frame);document.body.appendChild(overlay);
    window.addEventListener('message',(event)=>{
      if(event.origin!==location.origin||event.source!==frame.contentWindow)return;
      if(event.data?.type==='duckie-buddy:close')hide();
      if(event.data?.type==='duckie-buddy:ready')sendCount(true);
    });
    document.addEventListener('keydown',(event)=>{if(event.key==='Escape'&&!overlay.hidden){event.stopPropagation();hide();}},true);
    window.addEventListener('pageshow',()=>sendCount(true));
    document.addEventListener('visibilitychange',()=>{if(!document.hidden)sendCount(true)});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
