# Duck Habit Hub — v1 starter

This is the first playable foundation for the GitHub Pages game.

## What works now
- Mobile-first 1080×1920 stage that scales without stretching.
- Cream starter room.
- The other 8 room themes are present but locked for the future Shop.
- Pink coin counter (starts at 0).
- Peep is layered from the supplied 1080×1920 transparent PNGs.
- Click the mirror to open the Closet.
- Closet changes Peep's expression, hair, clothes, socks, shoes, tails, and accessories.
- Outfit choices save automatically in browser localStorage.
- Click the book to open the planned Book menu.
- Book menu contains placeholders for Tasks, Inventory, Shop, Duck Crafter, Duckipedia, Character Change, Games, and Status.

## Current starter outfit
Neutral expression + short hair + bangs + short-sleeved shirt + pleated skirt + white/blue socks + loafers.

This is only a temporary starting outfit. We can change what is free/unlocked when the Shop is built.

## GitHub Pages setup
1. Create a new GitHub repository.
2. Upload **the contents of this folder** to the root of the repository. `index.html` must be at the root.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose `main` and `/ (root)`, then Save.
6. GitHub will provide the Pages link after deployment.

## Important
The game uses `localStorage`, so progress currently saves only in that browser/device. Cloud accounts can be added much later if desired.


## V23.1 — Harder Economy + Invitations + Mystery Silhouette
- Shop tab visible label changed from Profiles to Invitations.
- Miko Invitation price: 1,500 Pink Coins.
- Standard Duck: 75.
- Single-use/common crafting supplies: 50–75.
- Base Paint: 60.
- Wardrobe unlocks: 150.
- Rugs: 160.
- Pet beds: 200.
- Shelves/dressers: 225.
- Room colors: 350.
- Locked Miko profile preview now renders as a fully black silhouette instead of dimmed layers.


Update v24-0:
- Reworked OC Happiness into a true Level 1-100 progression curve.
- Early levels need 10 points each, then the requirement rises by +1 every 5 levels.
- Total points needed to reach Level 100: 1,921.
- Existing legacy happiness saves are migrated automatically.


Update v24.1 — OC Shop Gating:
- Paid wardrobe items for non-starter OCs are completely hidden from the Shop until that OC is unlocked.
- Buying an Invitation makes that OC's Shop wardrobe items available immediately.
- This is generic and automatically applies to future OCs through each wardrobe item's characterId.
- If a Shop category only contains items belonging to still-locked OCs, its empty message explains that more styles appear after inviting them.
- Save schema is unchanged; SAVE_VERSION remains 24.


Update v24-2:
- Fixed OC Shop gating at the list, item-sheet, and purchase levels.
- Invitations remain visible before an OC is unlocked; that OC's wardrobe stays hidden.
- Added a one-time repair for wardrobe items accidentally purchased while their OC was locked. The item is removed and its current Shop price is refunded.


Update v24-3:
- Miko's free Button Shirt and Button Sleeve are now automatically layered beneath his Hoodie in his default outfit.
- Choosing the Button Shirt by itself still works normally.
- Choosing the paid Sweater uses the sweater + sweater sleeve instead of the button-down layers.


Update v24.4:
- Miko's Headband now sits behind his base, bangs, and back hair stack.
- Miko's Button Shirt is a free, always-on base shirt in the Closet.
- Hoodie and Sweater are now independent optional Layers that can be worn over the Button Shirt.
- Miko's Belt now renders above shirt/pants and below Hoodie/Sweater.
- Existing Miko outfits migrate automatically from the older single Top slot.


Update v24.5:
- Miko's free Button Shirt is now optional in the Closet instead of always equipped.
- Shirt choices are None / Button Shirt.
- Hoodie and Sweater remain independent outer layers, so they can be worn with or without the Button Shirt.
- Button Sleeve only renders when Button Shirt is equipped.
- Belt layering remains above shirt/pants and below Hoodie/Sweater.


## V24.10 - Miko startup repair + Level 100 ducks + icon refresh
- Rebased on the last known-good PWA startup code.
- Miko/Peep Level 100 duck checks now run after initial character rendering so they cannot interrupt startup.
- Miko Headband now renders above his main/back hair and base, but below bangs.
- Peep Duck (`peep-duck.png`) and Miko Duck (`miko-duck.png`) are Level 100 Happiness rewards.
- PWA cache and script query bumped for reliable update pickup.
- App icons refreshed with the user's darker star background and larger crop.
