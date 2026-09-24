(function(){
  'use strict';
  const GLITTER='../assets/ingredients/Sparkle.webp';
  function api(){return window.DUCKIE_DASH_API_V269||null;}
  function decorateBuddyDust(){
    const dust=document.querySelector('.buddy-box-dust-v265');
    if(!dust||dust.querySelector('.buddy-box-dust-icon-v269'))return;
    for(const node of [...dust.childNodes]){
      if(node.nodeType===Node.TEXT_NODE&&node.textContent.includes('✦')){node.textContent=node.textContent.replace('✦','');break;}
    }
    const img=document.createElement('img');img.className='buddy-box-dust-icon-v269';img.src=GLITTER;img.alt='';dust.prepend(img);
  }
  function bindBuddyBox(){
    const button=document.querySelector('#openBuddyBoxHomeV269');
    if(!button||button.dataset.v269Bound==='1')return;
    button.dataset.v269Bound='1';
    button.addEventListener('click',()=>{window.DUCKIE_BUDDY_BOX_V265?.open?.();requestAnimationFrame(decorateBuddyDust);});
  }
  function openSkillsFromStatus(){
    const params=new URLSearchParams(location.search);if(params.get('openSkills')!=='1')return;
    const button=document.querySelector('#openSkillBook');if(!button)return;
    setTimeout(()=>{button.click();try{history.replaceState(null,'',location.pathname);}catch(error){}},80);
  }
  function removeOldDashUi(screen){
    screen.querySelectorAll('#dashConfigV265').forEach(node=>node.remove());
    const overlay=screen.querySelector('#dashOverlay');
    if(overlay&&!screen.classList.contains('dash-run-stage-v193')){overlay.classList.add('hidden');overlay.innerHTML='';}
  }
  function getStatus(){return api()?.getStatus?.()||{tokens:0,freeRuns:0,duration:30,coins:0};}
  function updateDashMenu(){
    const config=document.querySelector('#dashConfigV269');if(!config)return;
    const s=getStatus(),select=config.querySelector('#dashRunDurationV235'),start=config.querySelector('#dashStartMenuV269'),help=config.querySelector('#dashHelpV269');
    const coin=config.querySelector('[data-dash-v269="coins"]'),tokens=config.querySelector('[data-dash-v269="tokens"]');
    const tokenCount=Math.max(0,Number(s.tokens)||0),freeRuns=Math.max(0,Number(s.freeRuns)||0);
    if(coin)coin.textContent=Math.max(0,Number(s.coins)||0).toLocaleString();if(tokens)tokens.textContent=tokenCount.toLocaleString();
    const o30=select?.querySelector('option[value="30"]'),o60=select?.querySelector('option[value="60"]');
    if(o30)o30.disabled=freeRuns<1&&tokenCount<3;if(o60)o60.disabled=freeRuns<1&&tokenCount<5;
    let duration=Number(select?.value||s.duration||30)===60?60:30;
    if(freeRuns<1&&duration===60&&tokenCount<5&&tokenCount>=3){duration=30;if(select)select.value='30';api()?.setDuration?.(30);}
    const cost=duration===60?5:3,playable=freeRuns>0||tokenCount>=cost;
    if(start){start.disabled=!playable||!api()?.start;start.textContent=playable?'Start Duckie Dash':`Need ${cost} Jump Tokens`;}
    if(help){
      if(freeRuns>0)help.textContent=`A Free Run is ready. Your ${duration}-second run will use it first.`;
      else if(playable)help.textContent=`${duration} seconds costs ${cost} Jump Tokens.`;
      else help.textContent=`You have ${tokenCount} Jump Token${tokenCount===1?'':'s'}. Choose a shorter run or collect more Tokens.`;
    }
  }
  function buildDashMenu(){
    const screen=document.querySelector('#dashScreen');
    if(!screen||screen.classList.contains('hidden')||screen.classList.contains('dash-run-stage-v193'))return;
    removeOldDashUi(screen);
    const shell=screen.querySelector('.dq-feature-shell'),playbox=screen.querySelector('.dash-playbox');if(!shell)return;
    let config=screen.querySelector('#dashConfigV269');
    if(!config){
      const s=getStatus(),duration=Number(s.duration)===60?60:30;
      config=document.createElement('section');config.id='dashConfigV269';config.className='dash-config-v269';
      config.innerHTML=`<label>Run Length<select id="dashRunDurationV235"><option value="30" ${duration===30?'selected':''}>30 Seconds · 3 Tokens</option><option value="60" ${duration===60?'selected':''}>60 Seconds · 5 Tokens</option></select></label><div class="dash-balances-v269"><span>Pink Coins <strong data-dash-v269="coins">0</strong></span><span>Jump Tokens <strong data-dash-v269="tokens">0</strong></span></div><p id="dashHelpV269" class="dash-help-v269"></p><button id="dashStartMenuV269" class="pixel-button primary" type="button">Start Duckie Dash</button>`;
      shell.insertBefore(config,playbox||null);
      config.querySelector('#dashRunDurationV235')?.addEventListener('change',event=>{api()?.setDuration?.(Number(event.target.value)===60?60:30);updateDashMenu();});
      config.querySelector('#dashStartMenuV269')?.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();api()?.start?.();});
    }
    updateDashMenu();
  }
  function afterDashMenuNavigation(){setTimeout(buildDashMenu,0);setTimeout(buildDashMenu,80);}
  function init(){
    bindBuddyBox();openSkillsFromStatus();
    const openDash=document.querySelector('#openDuckieDash');
    if(openDash&&openDash.dataset.v269Bound!=='1'){openDash.dataset.v269Bound='1';openDash.addEventListener('click',afterDashMenuNavigation);}
    document.addEventListener('click',event=>{if(event.target.closest('#dashRunMenuV193'))afterDashMenuNavigation();});
    if(!document.querySelector('#dashScreen')?.classList.contains('hidden'))afterDashMenuNavigation();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
  window.DUCKIE_QUEST_V269='24.269';
})();
