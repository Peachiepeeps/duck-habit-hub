// Duckie Days v24.311 — Universal Clothing reward helper for fashion encounters
(function(){
  "use strict";
  const ITEMS=[
    ["uclothes-short-socks","Short Socks"],
    ["uclothes-knee-socks","Knee High Socks"],
    ["uclothes-thigh-socks","Thigh High Socks"],
    ["uclothes-big-bow","Big Bow"],
    ["uclothes-r-bow","R Bow"],
    ["uclothes-glasses","Glasses"],
    ["uclothes-big-hoodie","Big Hoodie"],
    ["uclothes-big-cardigan","Big Cardigan"],
    ["uclothes-bow-dress","Bow Dress"],
    ["uclothes-bunny-outfit","Bunny Outfit"],
    ["uclothes-maid-outfit","Maid Outfit"]
  ];
  function pick(){return ITEMS[Math.floor(Math.random()*ITEMS.length)];}
  window.DuckieUniversalClothingDropsV311={
    version:"24.311",
    ids:ITEMS.map(x=>x[0]),
    names:Object.fromEntries(ITEMS),
    pick
  };
})();
