(function(){
  'use strict';
  const GLITTER='assets/ingredients/Sparkle.webp';
  function decorate(){
    document.querySelectorAll('.tc-dust-line-v262,.tc-workshop-dust-v264').forEach(el=>{
      if(el.querySelector('.power-up-dust-inline-icon-v267'))return;
      const img=document.createElement('img');img.className='power-up-dust-inline-icon-v267';img.src=GLITTER;img.alt='';el.prepend(img);
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',decorate,{once:true});else decorate();
  document.addEventListener('click',()=>requestAnimationFrame(decorate),true);
  window.DUCKIE_TRADING_CARD_UI_V267='24.267';
})();
