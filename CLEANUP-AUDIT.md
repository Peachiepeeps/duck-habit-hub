# Duckie Days v24.346 — repository cleanup audit

Source: uploaded `duck-habit-hub-main 32.zip`; version.json: `24.346`.

## Scope
- Reviewed 3,473 file entries, with 77 retained JavaScript files.
- Removed 12 completed historical installer workflows, 26 superseded, unreferenced Quest JavaScript/CSS versions, and 1 outdated upload ZIP.
- Preserved the running HTML entry pages, referenced JS/CSS, all artwork/assets, saves/backend, service worker, and planning/reference assets.
- This is a **conservative dead-file cleanup**, not a wholesale JavaScript/CSS consolidation.

## Validation methodology
- Compared candidate filenames against all other runtime HTML, JS, CSS, and the service worker. Only versioned source files with **zero references** qualified for deletion.
- Checked **425** service-worker app-shell references: **0 missing**.
- Checked **269** static local HTML resource references: **0 missing**.
- Did **not** delete image duplicates: visually similar/identical assets may be distinct character keys or be dynamically loaded.
- Installer workflow checks source-file SHA-256 hashes before deleting anything; unexpected edits cause the job to stop.
- The original uploaded ZIP and a separate retired-files ZIP provide additional recovery copies; Git history also retains removed files.

## Files removed

### Completed workflows
- `.github/workflows/install-duckie-days-v24-336-lil-guys-cards-snuggle.yml`
- `.github/workflows/install-duckie-days-v24-337-bao-soda-flavor-cleanup.yml`
- `.github/workflows/install-duckie-days-v24-338-flavor-station-head-duck-fix 2.yml`
- `.github/workflows/install-duckie-days-v24-338-flavor-station-head-duck-fix.yml`
- `.github/workflows/install-duckie-days-v24-339-cafe-fizz-lil-guys.yml`
- `.github/workflows/install-duckie-days-v24-340-endless-duckdoku.yml`
- `.github/workflows/install-duckie-days-v24-341-quest-polish.yml`
- `.github/workflows/install-duckie-days-v24-342-bao-candy-oc.yml`
- `.github/workflows/install-duckie-days-v24-343-shop-cards-six-nests.yml`
- `.github/workflows/install-duckie-days-v24-344-city-streets-expansion.yml`
- `.github/workflows/install-duckie-days-v24-345-city-quest-polish.yml`
- `.github/workflows/install-duckie-days-v24-346-inventory-candy-fix.yml`

### Unreferenced prior Quest versions
- `duck-quest/css/love-interest-lukio-v243.css`
- `duck-quest/css/love-interest-lukio-v244.css`
- `duck-quest/css/love-interests-v246.css`
- `duck-quest/css/love-interests-v247.css`
- `duck-quest/css/love-interests-v248.css`
- `duck-quest/css/quest-v266.css`
- `duck-quest/css/quest-v267.css`
- `duck-quest/css/quest-v268.css`
- `duck-quest/css/special-encounters-v262.css`
- `duck-quest/js/boost-labels-v214.js`
- `duck-quest/js/dash-screen-v183.js`
- `duck-quest/js/game-v95.js`
- `duck-quest/js/love-interest-lukio-v243.js`
- `duck-quest/js/love-interest-lukio-v244.js`
- `duck-quest/js/love-interests-v246.js`
- `duck-quest/js/love-interests-v247.js`
- `duck-quest/js/love-interests-v248.js`
- `duck-quest/js/love-interests-v252.js`
- `duck-quest/js/quest-fixes-v205.js`
- `duck-quest/js/quest-fixes-v206.js`
- `duck-quest/js/quest-v266.js`
- `duck-quest/js/quest-v267.js`
- `duck-quest/js/quest-v268.js`
- `duck-quest/js/special-encounters-v262.js`
- `duck-quest/js/special-encounters-v264.js`
- `duck-quest/js/special-encounters-v265.js`

### Outdated release upload
- `Duckie-Days-v24.338-Corrected-Installer-YAML.zip`

## What stayed (intentionally)
- All numbered `fixes` scripts/styles referenced by current HTML, including Quest and Hub patches. Removing these solely based on age would cause regressions.
- All art, even duplicate binaries (sprite paths are treated as independent).
- Bao Café planning notes, reference images, and Firebase backend configuration.

## Optional future phase (requires gameplay testing)
Consolidate overlapping live patch scripts/styles into tested modules, adjust all HTML and cache references, and verify functionality across Hub, Quest, minigames, inventory, hatchery, costumes, trading cards, and offline mode. This cleanup deliberately leaves that riskier work for another pass.
