(function(){
  'use strict';
  const STRAWBERRY='assets/enemies/cat-slime/base/Strawberry-idle-1-neutral.webp';
  const GLITTER='../assets/ingredients/Sparkle.webp';

  function removeOldBuddyBoxButton(){document.querySelector('#openBuddyBoxV265')?.remove();}
  function reorganizeHome(){
    removeOldBuddyBoxButton();
    const heroActions=document.querySelector('.hero-quick-actions');
    const tools=document.querySelector('#questHomeTools');
    const skill=document.querySelector('#openSkillBook');
    const charm=document.querySelector('#openCharmScreen');
    const buddyBook=document.querySelector('#openBuddyCollection');
    const hatch=document.querySelector('#openHatchery');
    if(skill)skill.classList.add('moved-to-status-v267');
    if(heroActions&&charm){
      charm.querySelector('img')?.remove();
      const span=charm.querySelector('span');if(span)span.textContent='Equip Charm';else charm.textContent='Equip Charm';
      charm.classList.add('hero-info-button');charm.classList.remove('quest-home-tool-button');
      if(buddyBook)heroActions.insertBefore(charm,buddyBook);else heroActions.prepend(charm);
    }
    if(tools&&!document.querySelector('#openBuddyBoxHomeV267')){
      const btn=document.createElement('button');btn.id='openBuddyBoxHomeV267';btn.type='button';btn.className='pixel-button quest-home-tool-button';
      btn.innerHTML=`<img src="${STRAWBERRY}" alt=""><span>Buddy Box</span>`;
      btn.addEventListener('click',()=>window.DUCKIE_BUDDY_BOX_V265?.open?.());
      if(hatch)tools.insertBefore(btn,hatch);else tools.prepend(btn);
    }
    const dust=document.querySelector('.buddy-box-dust-v265');
    if(dust&&!dust.querySelector('img')){const img=document.createElement('img');img.src=GLITTER;img.alt='';dust.prepend(img);}
  }
  function openSkillsFromStatus(){
    const params=new URLSearchParams(location.search);
    if(params.get('openSkills')!=='1')return;
    setTimeout(()=>{document.querySelector('#openSkillBook')?.click();try{history.replaceState(null,'',location.pathname);}catch(e){}},180);
  }
  function init(){reorganizeHome();openSkillsFromStatus();setTimeout(reorganizeHome,250);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
  window.DUCKIE_QUEST_V267='24.267';
})();
