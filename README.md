Duckie Days v24.128

A cozy duck game/habit hub with OCs, collecting, decorating, Duck Quest, and minigames.

v24.128 adds unlockable Duck Quest UI Themes, selectable Buddy family portraits, and RPG terminology polish. Duck Quest now uses Stage + Level wording, “Equip Charm,” and keeps full-Stage completion prizes hidden until they are actually earned.

<!-- CURRENT-FILE-MAP:START -->
## Current file map

The root code was consolidated in v24.287 so future updates are easier to follow.

- `app.js` / `app.css` — main app and base styling
- `hub.js` / `hub.css` — Home/room features; **Book shelf positioning is in `hub.css`**
- `hub-boosts.js` — Hub Shop / EXP Candy helpers
- `tasks.js` / `tasks.css` — Tasks, Duck Bucks, and Collectible Shelf
- `task-reminders.js` / `task-reminders.css` / `firebase-reminders.mjs` — task reminders
- `trading-cards-base.js` / `.css` — shared Trading Card core
- `trading-cards-extra.js` / `.css` — newer Trading Card data/features
- `trading-cards-ui.js` — Trading Card book/workshop UI
- `duck-quest/` — Duck Quest game files
- `sw.js` — service worker/cache list

Old numbered files were removed from the live tree after being consolidated; Git history still preserves them.
<!-- CURRENT-FILE-MAP:END -->
