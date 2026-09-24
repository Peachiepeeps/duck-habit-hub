(function(){
  'use strict';
  const GLITTER='assets/ingredients/Sparkle.webp';
  const TC=window.DuckieTradingCards;

  function powerDust(){
    try{return Math.max(0,Number(TC?.cardCraft?.ensure?.(save)?.powerUpDust)||0);}catch(e){return 0;}
  }
  function removeDustInventoryCard(){
    document.querySelectorAll('.power-dust-card-v265,[data-item-id="power-up-dust"],[data-item-id="card-dust"]').forEach(el=>el.remove());
  }
  function refreshCurrency(){
    const pill=document.querySelector('#statusPowerDustV267');
    if(pill) pill.querySelector('strong').textContent=powerDust().toLocaleString();
  }
  function ensureStatusCurrency(){
    const header=document.querySelector('#statusPanel .status-header');
    if(!header||document.querySelector('#statusPowerDustV267'))return;
    const pill=document.createElement('div');pill.id='statusPowerDustV267';pill.className='power-up-dust-pill-v267';pill.setAttribute('aria-label','Power Up Dust');
    pill.innerHTML=`<img src="${GLITTER}" alt=""><strong>${powerDust().toLocaleString()}</strong>`;
    const close=header.querySelector('#closeStatus');
    if(close) header.insertBefore(pill,close); else header.append(pill);
  }
  function ensureStatusSkills(){
    const rank=document.querySelector('#statusPanel .status-rank-card');
    if(!rank||rank.querySelector('#statusOcSkillsV267'))return;
    const btn=document.createElement('button');btn.id='statusOcSkillsV267';btn.className='status-skills-button-v267';btn.type='button';btn.textContent='OC Skills';
    btn.addEventListener('click',()=>{window.location.href='duck-quest/index.html?openSkills=1';});
    rank.append(btn);
  }
  function addGlitterToCardCurrency(){
    document.querySelectorAll('.tc-dust-line-v262,.tc-workshop-dust-v264').forEach(el=>{
      if(el.querySelector('.power-up-dust-inline-icon-v267'))return;
      const img=document.createElement('img');img.className='power-up-dust-inline-icon-v267';img.src=GLITTER;img.alt='';el.prepend(img);
    });
  }
  try{
    if(typeof renderInventory==='function'){
      const prior=renderInventory;
      renderInventory=function(){const result=prior.apply(this,arguments);requestAnimationFrame(removeDustInventoryCard);return result;};
    }
    if(typeof renderStatus==='function'){
      const priorStatus=renderStatus;
      renderStatus=function(){const result=priorStatus.apply(this,arguments);ensureStatusCurrency();ensureStatusSkills();refreshCurrency();return result;};
    }
  }catch(e){}
  function init(){removeDustInventoryCard();ensureStatusCurrency();ensureStatusSkills();refreshCurrency();addGlitterToCardCurrency();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
  document.addEventListener('click',()=>requestAnimationFrame(()=>{removeDustInventoryCard();addGlitterToCardCurrency();refreshCurrency();}),true);
  window.DUCKIE_HUB_V267='24.267';
})();
