# Duckie Days — v24.346 🦆

A cozy duck game and habit hub, featuring original characters, Duck Quest, Buddy collecting, the closet, card collecting, room decorating, and minigames.

## Project structure

| Location | Contents |
| --- | --- |
| `index.html`, `app.js`, `app.css` | Main game, UI, and styling |
| `hub.js`, `hub.css`, `hub-boosts.js` | Home, room, Shop, and inventory boosts |
| `duck-quest/` | Duck Quest, battles, hatchery, encounters, and their active add-on scripts |
| `assets/` | Shared character, item, furniture, and collectible art |
| `bao-cafe/`, `bakery/`, `crane-game/`, `memory-game/`, `sort-game/`, `duckdoku/` | Playable minigames |
| `trading-cards-*.js`, `trading-cards-*.css` | Trading Card collection and UI |
| `tasks.js`, `tasks.css`, `task-reminders.*`, `firebase-reminders.mjs` | Tasks and reminders |
| `firebase-backend/` | Push notification backend materials |
| `sw.js`, `manifest.webmanifest`, `version.json` | Offline/app metadata and versioning |
| `bao-cafe-planning/` | Design notes and references retained for future work |
| `.github/workflows/` | One maintenance cleanup workflow; GitHub Pages builds are managed by GitHub |

## Maintaining the game

- Keep the active version-numbered `fixes-*.js` / `fixes-*.css` files: these are **loaded by the current HTML** and may still change behavior or style.
- When installing a new game release, update the HTML references, cache manifest, and `version.json` together.
- Don't delete assets solely because their name is not visible in HTML; many are selected dynamically by JavaScript.
- Historical versions and completed installer workflows remain recoverable from Git history. The v24.346 cleanup intentionally removes only unreferenced old code and completed installers.
- Refer to `CLEANUP-AUDIT.md` for the full deletion list and verification results.

This cleanup does not alter player saves, character assets, game mechanics, or the deployed base URL.
