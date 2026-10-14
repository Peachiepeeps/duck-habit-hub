/* v24.319 — Duckdoku hub launcher */
(()=>{
  const button=document.querySelector('#openDuckdokuGame');
  if(!button || button.dataset.duckdokuBound==='1') return;
  button.dataset.duckdokuBound='1';
  button.addEventListener('click',()=>{ window.location.href='duckdoku/?v=24.319'; });
})();
