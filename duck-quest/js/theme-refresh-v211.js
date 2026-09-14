// Duckie Days v24.211 — unified Duck Quest themes + expanded palette collection.
(function(){
  'use strict';
  window.DUCKIE_UI_THEME_REFRESH='24.211-unified-home-and-new-themes';

  const style=document.createElement('style');
  style.id='duckieUiThemeRefreshV211';
  style.textContent=`
    /* ---------- Core theme polish ---------- */
    :root{--quest-title-shadow:rgba(255,255,255,.72);}

    /* Miko: teal + ink + ivory + gold. */
    body[data-quest-theme="miko-moonlight"]{
      --cream:#f8f3e3;--pink:#87c2bb;--deep-pink:#287f79;--brown:#20292a;--brown-2:#536261;
      --panel:rgba(249,246,232,.97);--border:#314745;--shadow:0 6px 0 rgba(35,52,51,.22);
      --quest-bg-a:#acd1cc;--quest-bg-b:#d7e8e3;--quest-surface:#f8f4e7;--quest-surface-2:#fffdf4;
      --quest-soft:#d5e8e2;--quest-button:#fffaf0;--quest-selected:#b9d9d3;--quest-accent:#3f958e;
      --quest-accent-2:#d6bd72;--quest-muted:#647674;--quest-title-shadow:rgba(255,255,255,.78);
    }

    /* Miho: keep the dark mood, but use clearer charcoal/wine surfaces and readable cream text. */
    body[data-quest-theme="miho-tea-room"]{
      --cream:#30252b;--pink:#8f485b;--deep-pink:#f0a0b3;--brown:#f7eef0;--brown-2:#d9c3ca;
      --panel:rgba(48,37,44,.97);--border:#a85e72;--shadow:0 6px 0 rgba(16,11,14,.34);
      --quest-bg-a:#20191e;--quest-bg-b:#2b2027;--quest-surface:#392c34;--quest-surface-2:#44323c;
      --quest-soft:#4c3741;--quest-button:#51313c;--quest-selected:#673b49;--quest-accent:#99495d;
      --quest-accent-2:#6e3d4b;--quest-muted:#d7c0c7;--quest-title-shadow:#171015;
    }

    /* New collectible themes. */
    body[data-quest-theme="matcha-cream"]{
      --cream:#fbf7e8;--pink:#abc39a;--deep-pink:#63845e;--brown:#465044;--brown-2:#707a69;
      --panel:rgba(251,248,232,.97);--border:#6e7c62;--shadow:0 6px 0 rgba(62,72,55,.20);
      --quest-bg-a:#cbdcba;--quest-bg-b:#e5ead0;--quest-surface:#faf7e5;--quest-surface-2:#fffbee;
      --quest-soft:#dce7c9;--quest-button:#fff9e9;--quest-selected:#c7dbb5;--quest-accent:#88aa78;
      --quest-accent-2:#c9dbae;--quest-muted:#707966;
    }
    body[data-quest-theme="seafoam-pearl"]{
      --cream:#f8fffc;--pink:#9fd9d2;--deep-pink:#4eaaa2;--brown:#385653;--brown-2:#65807c;
      --panel:rgba(247,255,252,.97);--border:#5b827d;--shadow:0 6px 0 rgba(54,78,74,.20);
      --quest-bg-a:#bfe2dd;--quest-bg-b:#dcf0eb;--quest-surface:#f5fffb;--quest-surface-2:#ffffff;
      --quest-soft:#d2ebe6;--quest-button:#fbfffd;--quest-selected:#b8ddd7;--quest-accent:#61b5ad;
      --quest-accent-2:#eadbb1;--quest-muted:#65817c;
    }
    body[data-quest-theme="strawberry-milk"]{
      --cream:#fff8f4;--pink:#f0a8b6;--deep-pink:#cc6279;--brown:#67494d;--brown-2:#906d71;
      --panel:rgba(255,249,246,.97);--border:#9a626d;--shadow:0 6px 0 rgba(90,55,62,.20);
      --quest-bg-a:#f4c5ce;--quest-bg-b:#f9dce1;--quest-surface:#fff6f4;--quest-surface-2:#fffdf9;
      --quest-soft:#f3d4d8;--quest-button:#fff9f4;--quest-selected:#f0c3ca;--quest-accent:#df788d;
      --quest-accent-2:#f3c2ca;--quest-muted:#8c6a70;
    }
    body[data-quest-theme="lavender-starlight"]{
      --cream:#fbf9ff;--pink:#c9b9e8;--deep-pink:#8170b7;--brown:#504862;--brown-2:#776f88;
      --panel:rgba(251,249,255,.97);--border:#746990;--shadow:0 6px 0 rgba(66,58,84,.21);
      --quest-bg-a:#d7caed;--quest-bg-b:#ebe2f5;--quest-surface:#f8f4ff;--quest-surface-2:#fffaff;
      --quest-soft:#e5dcf2;--quest-button:#fcf9ff;--quest-selected:#d9cdec;--quest-accent:#a38bd3;
      --quest-accent-2:#ead7a9;--quest-muted:#777087;
    }

    /* ---------- Header/title ---------- */
    .quest-title h1{
      color:var(--brown)!important;
      text-shadow:2px 2px 0 var(--quest-title-shadow)!important;
    }
    .quest-title span,.mini-label{color:var(--deep-pink)!important;}
    .coin-pill{background:var(--panel)!important;border-color:var(--border)!important;color:var(--brown)!important;box-shadow:var(--shadow)!important;}

    /* ---------- Hero controls added in later updates ---------- */
    #homeScreen .icon-background-control{color:var(--quest-muted)!important;}
    #homeScreen .icon-background-button,
    #homeScreen .quest-border-style-choice,
    #homeScreen .quest-border-combo-picker{
      background:var(--quest-surface)!important;
      color:var(--brown)!important;
      border-color:color-mix(in srgb,var(--border) 70%,white)!important;
    }
    #homeScreen .quest-border-combo-picker{box-shadow:var(--shadow)!important;}
    #homeScreen .quest-border-combo-label{color:var(--deep-pink)!important;}

    /* Charm / Token Shop / Hatching Area were previously forced to classic cream. */
    #homeScreen .quest-home-tools .quest-home-tool-button,
    #homeScreen .quest-home-tools #openHatchery.primary,
    #homeScreen .quest-home-tools #openCharmScreen.primary{
      background:var(--quest-button)!important;
      color:var(--brown)!important;
      border-color:var(--border)!important;
      box-shadow:var(--shadow)!important;
      text-shadow:none!important;
    }

    /* ---------- Endless Run ---------- */
    #homeScreen.dq-home-polished .endless-home-card,
    #homeScreen .endless-home-card{
      background:linear-gradient(145deg,var(--quest-surface),var(--quest-soft))!important;
      border-color:var(--border)!important;
      color:var(--brown)!important;
      box-shadow:var(--shadow)!important;
    }
    #homeScreen .endless-home-heading small,
    #homeScreen .endless-note{color:var(--quest-muted)!important;}
    #homeScreen .endless-symbol{
      background:var(--quest-surface-2)!important;
      border-color:var(--border)!important;
      color:var(--deep-pink)!important;
    }
    #homeScreen .endless-record-grid>div{
      background:var(--quest-surface-2)!important;
      border-color:color-mix(in srgb,var(--border) 48%,white)!important;
      color:var(--brown)!important;
    }
    #homeScreen .endless-record-grid span{color:var(--quest-muted)!important;}
    #homeScreen .endless-record-grid strong{color:var(--brown)!important;}

    /* ---------- Duckie Dash cards / later feature surfaces ---------- */
    .dq-expand-card,
    .dq-feature-shell{
      background:var(--panel)!important;
      border-color:var(--border)!important;
      color:var(--brown)!important;
      box-shadow:var(--shadow)!important;
    }
    .dq-expand-head small,.dq-feature-top small,.dash-tap-note,.dash-cart-card small{color:var(--quest-muted)!important;}
    .dq-token-pill,.dq-mini-grid>div,.dash-hud>span,.dash-overlay-card,.dash-cart-card,.egg-card,.incubator-card,.hatch-log{
      background:var(--quest-surface-2)!important;
      color:var(--brown)!important;
      border-color:color-mix(in srgb,var(--border) 45%,white)!important;
    }
    .dq-mini-grid span{color:var(--quest-muted)!important;}
    .dq-mini-grid strong{color:var(--brown)!important;}
    .dash-home-cost{color:var(--quest-muted)!important;}
    .dash-stage-button.selected,.dash-cart-card.selected{
      background:var(--quest-selected)!important;
      box-shadow:inset 0 0 0 3px color-mix(in srgb,var(--quest-accent) 42%,transparent)!important;
    }
    #homeScreen.dq-home-polished #duckieDashHomeCard::before{color:var(--quest-accent)!important;}

    /* ---------- Battle/event surfaces that still had classic hard-coded cream ---------- */
    .chest-layer p{background:var(--quest-surface-2)!important;color:var(--brown)!important;border-color:var(--border)!important;}
    .battle-message{color:var(--brown)!important;}
    .nameplate,.combatant small{color:var(--brown)!important;}

    /* Dark-theme details: stop pale/white panels from fighting the dark palette. */
    body[data-quest-theme="miho-tea-room"] .pixel-button.primary{color:#fff7f9!important;}
    body[data-quest-theme="miho-tea-room"] .hero-sprite-wrap{
      background:linear-gradient(145deg,#49343e,#352830)!important;
    }
    body[data-quest-theme="miho-tea-room"] .pixel-meter,
    body[data-quest-theme="miho-tea-room"] .hp-bar{background:#241b21!important;}
    body[data-quest-theme="miho-tea-room"] .heart-empty{opacity:.32;}
    body[data-quest-theme="miho-tea-room"] .heart-full{color:#e77893!important;}

    /* Miko gets a small gold highlight without turning the whole theme beige. */
    body[data-quest-theme="miko-moonlight"] .level-badge,
    body[data-quest-theme="miko-moonlight"] .buddy-count-pill{background:#dbc477!important;}
    body[data-quest-theme="miko-moonlight"] .hero-sprite-wrap{
      background:linear-gradient(145deg,#d9ebe6,#f4efd9)!important;
    }
  `;
  document.head.appendChild(style);
})();
