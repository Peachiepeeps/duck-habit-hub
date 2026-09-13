Duckie Days v24.141 — Layering + Speed Fixes

Included fixes:
- Peep: Beret now renders behind her instead of in front.
- Miko: Big Shirt now renders under his arm layers.
- Miko: Belt moved into Extras as a special item.
  - It now stays above shirts and bottoms.
  - It stays under outer Layers like Hoodie, Sweater, Big Shirt, and Black Blazer.
  - Belt is included in Miko's starter wardrobe so existing saves keep access to it.
- Io: Closet tap responsiveness improved, and active-character hair art is pre-warmed to help Twin Buns / hair swaps feel snappier.
- Annika: Shirts can now be worn underneath the Leotard dress.
- Annika: Head duck now layers directly under her bangs and sits slightly lower.

Speed polish:
- Current on-screen character layers now load eagerly.
- Current character outfit, expressions, and hair choices are pre-warmed after render.
- Current head duck / floor duck art is warmed sooner for smoother swaps.
- Closet tap targets use touch-action: manipulation for more responsive taps.

Files changed:
- index.html
- script-v24-141.js
- style-v24-141.css
- sw.js
- version.json
