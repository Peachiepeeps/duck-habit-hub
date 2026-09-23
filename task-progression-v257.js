(function(){
  'use strict';

  const BUILD='24.257';
  const SHELF_FILES={
    cream:'assets/room-expansion/shelves/shelf-cream.webp',
    brown:'assets/room-expansion/shelves/shelf-brown.webp',
    'dark-brown':'assets/room-expansion/shelves/shelf-dark-brown.webp'
  };

  function progressState(){
    try{
      if(typeof save==='undefined' || !save || typeof save!=='object') return null;
      if(!save.taskProgression || typeof save.taskProgression!=='object') save.taskProgression={};
      const p=save.taskProgression;
      if(!SHELF_FILES[p.collectibleShelfStyle]) p.collectibleShelfStyle='cream';
      return p;
    }catch(error){return null;}
  }

  function renderCollectibleShelfStyle(){
    const p=progressState();
    const image=document.querySelector('#taskCollectibleShelfImage');
    if(!p || !image) return;
    const styleId=SHELF_FILES[p.collectibleShelfStyle] ? p.collectibleShelfStyle : 'cream';
    image.src=SHELF_FILES[styleId];
    document.querySelectorAll('[data-task-shelf-style]').forEach(button=>{
      const active=button.dataset.taskShelfStyle===styleId;
      button.classList.toggle('active',active);
      button.setAttribute('aria-pressed',String(active));
    });
  }

  function setCollectibleShelfStyle(styleId){
    const p=progressState();
    if(!p || !SHELF_FILES[styleId]) return;
    p.collectibleShelfStyle=styleId;
    try{ if(typeof persist==='function') persist(); }catch(error){}
    renderCollectibleShelfStyle();
  }

  function bind(){
    document.querySelectorAll('[data-task-shelf-style]').forEach(button=>{
      if(button.dataset.taskShelfBound==='1') return;
      button.dataset.taskShelfBound='1';
      button.addEventListener('click',()=>setCollectibleShelfStyle(button.dataset.taskShelfStyle));
    });
    document.querySelector('#taskShelfButton')?.addEventListener('click',()=>setTimeout(renderCollectibleShelfStyle,0));
    renderCollectibleShelfStyle();
    window.DUCKIE_DAYS_TASK_LAYOUT_V257=BUILD;
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',bind,{once:true});
  else bind();
})();
