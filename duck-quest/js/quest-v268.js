(function(){
  'use strict';

  function directStart(){
    try{
      if(typeof startDash==='function'){
        startDash();
        return;
      }
    }catch(error){}
    console.warn('Duckie Dash start function was not available.');
  }

  function normalizeDashMenu(){
    const screen=document.querySelector('#dashScreen');
    if(!screen || screen.classList.contains('hidden')) return;

    let config=screen.querySelector('#dashConfigV265');

    /* If v24.265 has not moved the Run Length controls yet, create the config
       by borrowing the existing selector/note from the old Ready overlay. */
    if(!config){
      const overlayCard=screen.querySelector('#dashOverlay .dash-overlay-card');
      const duration=overlayCard?.querySelector('.dash-duration-label-v235');
      const note=overlayCard?.querySelector('small');
      config=document.createElement('section');
      config.id='dashConfigV265';
      config.className='dash-config-v265';
      if(duration)config.append(duration);
      if(note)config.append(note);
      const playbox=screen.querySelector('.dash-playbox');
      const shell=screen.querySelector('.dq-feature-shell');
      if(shell) shell.insertBefore(config,playbox||null);
    }

    if(!config) return;
    config.classList.remove('hidden');

    /* Remove every old Ready-screen Start button so it cannot retain stale
       listeners after the v24.265 layout move. */
    screen.querySelectorAll('#dashStart').forEach(button=>button.remove());

    let start=config.querySelector('#dashStartMenuV268');
    if(!start){
      start=document.createElement('button');
      start.id='dashStartMenuV268';
      start.type='button';
      start.className='pixel-button primary dash-start-menu-v268';
      start.textContent='Start Duckie Dash';
      start.addEventListener('click',event=>{
        event.preventDefault();
        event.stopPropagation();
        directStart();
      });
      config.append(start);
    }

    /* The Ready overlay is no longer part of the menu. It remains available
       for end-of-run result messages once the run-stage class is active. */
    const overlay=screen.querySelector('#dashOverlay');
    if(overlay && !screen.classList.contains('dash-run-stage-v193')){
      overlay.classList.add('hidden');
      overlay.classList.remove('dash-ready-external-v265');
    }
  }

  try{
    if(typeof renderDashReadyOverlay==='function'){
      const previousReady=renderDashReadyOverlay;
      renderDashReadyOverlay=function(){
        const result=previousReady.apply(this,arguments);
        requestAnimationFrame(normalizeDashMenu);
        return result;
      };
    }
  }catch(error){}

  try{
    if(typeof showScreen==='function'){
      const previousShow=showScreen;
      showScreen=function(which){
        const result=previousShow.apply(this,arguments);
        if(which==='dash')requestAnimationFrame(normalizeDashMenu);
        return result;
      };
    }
  }catch(error){}

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',()=>setTimeout(normalizeDashMenu,80),{once:true});
  }else{
    setTimeout(normalizeDashMenu,80);
  }

  window.DUCKIE_QUEST_V268='24.268';
})();
