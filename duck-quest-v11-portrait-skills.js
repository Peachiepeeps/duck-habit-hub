/* Duckie Days v11 — tap the home OC portrait to open the existing Skills screen. */
(()=>{
  'use strict';
  function setup(){
    const portrait=document.getElementById('heroSpriteWrap');
    const skills=document.getElementById('openSkillBook');
    if(!portrait||!skills||portrait.dataset.v11SkillShortcut)return;
    portrait.dataset.v11SkillShortcut='1';
    portrait.setAttribute('role','button');
    portrait.setAttribute('tabindex','0');
    portrait.setAttribute('aria-label','Open OC Skills');
    portrait.setAttribute('title','Tap your OC to view their Skills');
    portrait.style.cursor='pointer';
    const open=()=>{if(!document.querySelector('#homeScreen:not(.hidden)'))return;skills.click();};
    portrait.addEventListener('click',open);
    portrait.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();open();}});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();
