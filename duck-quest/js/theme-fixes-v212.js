// Duckie Days v24.212 — home tool theme specificity + Stage range readability.
(function(){
  'use strict';
  window.DUCKIE_UI_THEME_FIXES='24.212-tool-buttons-stage-contrast';

  const style=document.createElement('style');
  style.id='duckieUiThemeFixesV212';
  style.textContent=`
    /*
      The Token Shop v24.200 layout intentionally uses very specific selectors
      and !important declarations. Match/exceed that specificity here so all
      three home tool buttons truly inherit the active Duck Quest theme.
    */
    #homeScreen #questHomeTools #openCharmScreen,
    #homeScreen #questHomeTools #openTokenShopV200,
    #homeScreen #questHomeTools #openHatchery,
    #homeScreen #questHomeTools #openCharmScreen.primary,
    #homeScreen #questHomeTools #openHatchery.primary,
    #homeScreen #questHomeTools .quest-home-tool-button{
      background:var(--quest-button)!important;
      color:var(--brown)!important;
      border-color:var(--border)!important;
      box-shadow:var(--shadow)!important;
      text-shadow:none!important;
    }

    /* Give the tool row a tiny theme-colored selected/accent response on press. */
    #homeScreen #questHomeTools .quest-home-tool-button:active{
      background:var(--quest-selected)!important;
    }

    /* Token Shop's modal was also still using fixed cream/pink surfaces. */
    #tokenShopModalV200 .token-shop-card-v200{
      background:var(--panel)!important;
      color:var(--brown)!important;
      border-color:var(--border)!important;
      box-shadow:0 18px 50px color-mix(in srgb,var(--border) 30%,transparent)!important;
    }
    #tokenShopModalV200 .token-shop-balance-v200,
    #tokenShopModalV200 .token-shop-item-v200{
      background:var(--quest-surface-2)!important;
      border-color:color-mix(in srgb,var(--border) 45%,white)!important;
      color:var(--brown)!important;
    }
    #tokenShopModalV200 .token-shop-balance-v200 span,
    #tokenShopModalV200 .token-shop-item-copy-v200 small{
      color:var(--quest-muted)!important;
    }
    #tokenShopModalV200 .token-shop-balance-v200 strong,
    #tokenShopModalV200 .token-shop-item-copy-v200 strong,
    #tokenShopModalV200 .token-shop-item-copy-v200 span,
    #tokenShopModalV200 .token-shop-message-v200{
      color:var(--brown)!important;
    }
    #tokenShopModalV200 .token-shop-close-v200{
      background:var(--quest-button)!important;
      color:var(--brown)!important;
      border-color:var(--border)!important;
    }

    /*
      "Levels 1–40" etc. used --deep-pink, which can become too close to the
      card color in several themes. --brown is the designated readable
      foreground: dark on light themes, light on Miho's dark theme.
    */
    #homeScreen .area-option small,
    #homeScreen .area-option .area-option-copy small{
      color:var(--brown)!important;
      opacity:1!important;
      font-weight:900!important;
      text-shadow:none!important;
    }
    #homeScreen .area-option.selected small,
    #homeScreen .area-option.selected .area-option-copy small{
      color:var(--brown)!important;
      opacity:1!important;
    }

    /* The larger stage detail popup gets the same guaranteed contrast. */
    #routePickerModal .route-modal-range{
      color:var(--brown)!important;
      background:var(--quest-surface-2)!important;
      border-color:color-mix(in srgb,var(--border) 55%,white)!important;
      opacity:1!important;
      font-weight:900!important;
    }
  `;
  document.head.appendChild(style);
})();
