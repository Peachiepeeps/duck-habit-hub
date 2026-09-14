// Duckie Days v24.180 — simple, compact Duckie Dash home card only.
// Loaded after the main Quest and hatchery scripts so it does not touch the working hatchery.
(function(){
  'use strict';
  window.DUCKIE_DASH_HOME_SURFACE='24.180-simple';

  const style=document.createElement('style');
  style.id='duckieDashHomeV180Style';
  style.textContent=`
    #homeScreen.dq-home-polished #duckieDashHomeCard .dq-expand-head small.dash-home-start-v180,
    #homeScreen #duckieDashHomeCard .dq-expand-head small.dash-home-start-v180{
      display:block!important;
      margin:3px 0 0!important;
      font-size:.67rem!important;
      line-height:1.2!important;
      color:#725d68!important;
      font-weight:700!important;
    }
    #homeScreen #duckieDashHomeCard .dash-home-inline-actions{
      grid-template-columns:1fr!important;
      gap:6px!important;
      margin-top:7px!important;
    }
    #homeScreen #duckieDashHomeCard .dash-home-inline-actions #openDuckieDash{
      width:100%!important;
    }
    @media(max-width:600px){
      #homeScreen #duckieDashHomeCard .dq-expand-head small.dash-home-start-v180{
        font-size:.56rem!important;
      }
    }
  `;
  document.head.appendChild(style);

  let observer=null;
  let queued=false;

  function simplifyDashHome(){
    const card=document.getElementById('duckieDashHomeCard');
    if(!card) return false;

    // These three stats are intentionally removed from the main page.
    card.querySelectorAll('.dq-mini-grid').forEach(el=>el.remove());
    card.querySelectorAll('.dash-home-cost').forEach(el=>el.remove());

    const copy=card.querySelector('.dq-expand-head > div');
    if(copy){
      // Remove only the older summary lines; leave our v24.180 line alone once stable.
      copy.querySelectorAll(':scope > small:not(.dash-home-start-v180)').forEach(el=>el.remove());
      let start=copy.querySelector(':scope > small.dash-home-start-v180');
      if(!start){
        const title=copy.querySelector('h2');
        start=document.createElement('small');
        start.className='dash-home-start-v180';
        start.textContent='3 Tokens to Start';
        if(title) title.insertAdjacentElement('afterend',start);
        else copy.prepend(start);
      }else if(start.textContent!=='3 Tokens to Start'){
        start.textContent='3 Tokens to Start';
      }

      // Keep the existing Play button directly beneath the new simple line.
      const play=card.querySelector('#openDuckieDash');
      if(play){
        let row=copy.querySelector('.dash-home-inline-actions');
        if(!row){
          row=document.createElement('div');
          row.className='dash-home-inline-actions';
          copy.appendChild(row);
        }
        if(play.parentElement!==row) row.appendChild(play);
      }
    }

    // Remove empty legacy wrappers left behind by the older card layout.
    card.querySelectorAll('.dq-expand-actions').forEach(el=>{
      if(!el.children.length) el.remove();
    });
    return true;
  }

  function schedule(){
    if(queued) return;
    queued=true;
    requestAnimationFrame(()=>{
      queued=false;
      simplifyDashHome();
    });
  }

  if(simplifyDashHome()){
    const card=document.getElementById('duckieDashHomeCard');
    observer=new MutationObserver(schedule);
    observer.observe(card,{childList:true,subtree:true,characterData:true});
  }else{
    // Defensive fallback in case the card is inserted a moment later.
    const root=document.getElementById('homeScreen') || document.body;
    observer=new MutationObserver(()=>{
      if(simplifyDashHome()){
        observer.disconnect();
        const card=document.getElementById('duckieDashHomeCard');
        observer=new MutationObserver(schedule);
        observer.observe(card,{childList:true,subtree:true,characterData:true});
      }
    });
    observer.observe(root,{childList:true,subtree:true});
  }

  window.addEventListener('pageshow',schedule,{passive:true});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden) schedule();});
})();
