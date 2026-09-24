(function(){
  'use strict';
  window.DUCKIE_TRADING_CARD_UI_V266 = '24.266';
  // Keeps Power Up Dust phrasing consistent in card UI and ensures the card shop uses the full width.
  function patchDustLabels(){
    document.querySelectorAll('*').forEach((el)=>{
      if (el.childNodes && el.childNodes.length === 1 && el.textContent && el.textContent.trim() === 'Card Dust') {
        el.textContent = 'Power Up Dust';
      }
    });
  }
  function init(){ patchDustLabels(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true}); else init();
})();
