// Duckie Days v24.313 — Universal Clothing shop-category fixes
(function(){
  "use strict";
  const VERSION="24.313";
  const ACCESSORY_ITEMS=[
    ["uclothes-big-bow",125],
    ["uclothes-r-bow",125],
    ["uclothes-glasses",125]
  ];

  function relocateUniversalAccessories(){
    try{
      for(const [itemId,price] of ACCESSORY_ITEMS){
        if(ITEMS?.[itemId])ITEMS[itemId].category="accessories";
        if(Array.isArray(SHOP_STOCK?.clothing)){
          SHOP_STOCK.clothing=SHOP_STOCK.clothing.filter(entry=>entry?.itemId!==itemId);
        }
        if(Array.isArray(SHOP_STOCK?.accessories) && !SHOP_STOCK.accessories.some(entry=>entry?.itemId===itemId)){
          SHOP_STOCK.accessories.push({itemId,price});
        }
      }
      if(typeof renderShop==="function" && !document.querySelector("#shopModal")?.classList.contains("hidden")){
        renderShop();
      }
    }catch(error){
      console.warn("v24.313 Universal Clothing category fix skipped:",error);
    }
  }

  relocateUniversalAccessories();
  setTimeout(relocateUniversalAccessories,0);
  window.DUCKIE_HUB_FIXES_V313={version:VERSION,relocateUniversalAccessories};
})();
