/* Duckie Days v24.336: guarantee variant card for each successful Lil Guy catch. */
(()=>{
 'use strict';const TC=window.DuckieTradingCards;
 if(!TC || typeof captureBuddy!=='function')return;
 const original=captureBuddy;
 captureBuddy=function(enemy){
   const caught=original.apply(this,arguments);
   if(!caught || !enemy || typeof hubSave==='undefined')return caught;
   const cardId=TC.cardIdForEnemy(enemy);
   if(!cardId || !TC.byId[cardId])return caught;
   const variant=enemy.shiny?'default':String(caught.variantId||'default');
   const got=TC.grantCard(hubSave,cardId,1,{variantId:variant,source:'catch'});
   if(got){
     try{persistAll();}catch(_){}
     if(typeof setMessage==='function' && got.variantIsNew){
       try{setMessage(`New ${caught.name} Lil Guy card variant added! ♡`);}catch(_){}
     }
   }
   return caught;
 };
})();
