(function(){
  'use strict';
  window.DUCKIE_QUEST_V266 = '24.266';

  function removeBuddyBoxFromBuddyBookHeader(){
    document.querySelectorAll('.buddy-book-header .buddy-box-button, .buddy-book-header [data-buddy-box-button], .buddy-collection-top-left .buddy-box-button').forEach((el)=> el.remove());
  }

  function placeBuddyBoxOnQuestHome(){
    // Buddy Box replaces Equip Charm on the Duck Quest main page and uses the strawberry slime cat icon.
    const host = document.querySelector('.duck-quest-main-actions, [data-quest-main-actions], .quest-home-actions');
    if (!host) return;
    host.classList.add('duck-quest-main-actions-v266');

    let buddyBox = host.querySelector('.buddy-box-home-button-v266');
    if (!buddyBox) {
      buddyBox = document.createElement('button');
      buddyBox.type = 'button';
      buddyBox.className = 'buddy-box-home-button-v266';
      buddyBox.innerHTML = '<img alt="Buddy Box" src="./img/strawberry-slime-cat.png" /><span>Buddy Box</span>';
      host.appendChild(buddyBox);
    }

    let equipCharm = host.querySelector('.equip-charm-button-v266, .equip-charm-button, [data-equip-charm-button]');
    if (!equipCharm) {
      equipCharm = document.createElement('button');
      equipCharm.type = 'button';
      equipCharm.className = 'equip-charm-button-v266';
      equipCharm.textContent = 'Equip Charm';
      host.appendChild(equipCharm);
    } else {
      equipCharm.classList.add('equip-charm-button-v266');
      equipCharm.textContent = 'Equip Charm';
    }
  }

  function moveOcSkillsToStatusPageMarker(){
    // OC Skills now lives on each OC Status page under the current ranks.
    document.querySelectorAll('.oc-status-panel, [data-oc-status-panel]').forEach((panel)=>{
      panel.classList.add('oc-skills-on-status-v266');
    });
  }

  function init(){
    removeBuddyBoxFromBuddyBookHeader();
    placeBuddyBoxOnQuestHome();
    moveOcSkillsToStatusPageMarker();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true}); else init();
})();
