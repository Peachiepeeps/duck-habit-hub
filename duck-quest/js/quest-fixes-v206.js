// Duckie Days v24.206 — restore chest button after v24.205 lexical/global bridge issue.
(function(){
  'use strict';

  window.DUCKIE_DAYS_V206_FIXES='24.206-chest-button-bridge';

  // v24.205 correctly remapped the Mimic files, but its safety checks read
  // several game globals through window.*. Those values are top-level let/const
  // bindings, so they are not automatically properties on window. Expose live
  // read-through bridges so the v24.205 handlers can see the real game state.
  function bridge(name,getter,setter){
    try{
      const existing=Object.getOwnPropertyDescriptor(window,name);
      if(existing && !existing.configurable) return;
      Object.defineProperty(window,name,{
        configurable:true,
        enumerable:false,
        get:getter,
        ...(setter ? {set:setter} : {})
      });
    }catch(error){ /* no-op */ }
  }

  bridge('ui',()=>ui);
  bridge('pendingChest',()=>pendingChest,value=>{ pendingChest=value; });
  bridge('currentEnemy',()=>currentEnemy,value=>{ currentEnemy=value; });
  bridge('hubSave',()=>hubSave,value=>{ hubSave=value; });
  bridge('BUDDY_CATALOG',()=>BUDDY_CATALOG);
  bridge('BUDDY_CATALOG_BY_KEY',()=>BUDDY_CATALOG_BY_KEY);

  // Rebind once more so the visible Open/Continue button definitely points at
  // the current (v24.205-corrected) chest handler after the live bridges exist.
  function rebindChestButtonV206(){
    const old=document.querySelector('#openChest');
    if(!old) return;
    const fresh=old.cloneNode(true);
    old.replaceWith(fresh);
    ui.openChest=fresh;
    fresh.addEventListener('click',openPendingChest);

    if(pendingChest){
      fresh.classList.toggle('hidden',Boolean(pendingChest.eventType && !pendingChest.opened));
      fresh.disabled=false;
      fresh.textContent=pendingChest.opened ? 'Continue' : 'Open';
    }
  }

  rebindChestButtonV206();
})();
