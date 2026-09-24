(function(){
  'use strict';
  window.DUCKIE_HUB_V266 = '24.266';

  function removeDustInventoryCard(){
    // Power Up Dust is a currency now, not an inventory card.
    document.querySelectorAll('[data-item-id="power-up-dust"], [data-item-id="card-dust"], .inventory-power-up-dust, .inventory-card-dust').forEach((el)=> el.remove());
  }

  function ensurePowerUpDustCurrency(){
    // Uses Glitter asset / currency style.
    const hosts = document.querySelectorAll('[data-power-up-dust-host], .card-workshop-currency, .buddy-box-currency');
    hosts.forEach((host) => {
      if (host.querySelector('.power-up-dust-currency-v266')) return;
      const pill = document.createElement('div');
      pill.className = 'power-up-dust-currency-v266';
      pill.innerHTML = '<img class="glitter-icon" alt="Power Up Dust" src="./assets/glitter.png" /><span>Power Up Dust</span>';
      host.prepend(pill);
    });
  }

  function tidyCardShopGridV266(){
    document.querySelectorAll('.tc-shop-grid, .shop-cards-grid, .daily-cards-grid').forEach((grid)=>{
      grid.classList.add('tc-shop-grid-v266');
      Array.from(grid.children).forEach((card)=>{
        card.classList.add('tc-shop-card-v266');
      });
    });
  }

  function moveOcSkillsToStatusPageV266(){
    // Marker for moving OC Skills under current rank / level on the OC status page.
    document.querySelectorAll('.oc-status-panel, [data-oc-status-panel]').forEach((panel)=>{
      if (panel.querySelector('.oc-status-skills-button-v266')) return;
      const rankArea = panel.querySelector('.oc-rank-area, [data-rank-area], .status-rank-block') || panel;
      const btn = document.createElement('button');
      btn.className = 'oc-status-skills-button-v266';
      btn.type = 'button';
      btn.textContent = 'OC Skills';
      rankArea.appendChild(btn);
    });
  }

  function initV266(){
    removeDustInventoryCard();
    ensurePowerUpDustCurrency();
    tidyCardShopGridV266();
    moveOcSkillsToStatusPageV266();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initV266, {once:true});
  } else {
    initV266();
  }
})();
