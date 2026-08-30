Duck Habit Hub V24.16 — Cleaner Tasks

Changes:
- Tasks now use four tabs only: Today, Tomorrow, Future, Completed.
- Saved Tasks were moved into the Add Task flow instead of taking up a separate tab.
- Add Task now starts with a Task Type dropdown: New Task or Saved Task.
- Choosing Saved Task reveals a dropdown of reusable saved task templates and pre-fills the saved reward/repeat setup.
- Saved templates can be removed from the Saved Task picker.
- New tasks can be pinned to Today from the Add Task form.
- Task cards were simplified to match the new compact layout.
- A small pin indicator appears only on pinned tasks next to the reward; tapping it unpins the task.
- The old large Pin and Remove buttons were removed.
- A compact circular X removes a task.
- Removing a task now opens a custom Yes / No confirmation window.
- Today tasks keep the Complete and → Tomorrow buttons.
- Pinned tasks stay in the Today list and sort first without a separate Pinned section.
- Existing saved tasks and existing task data are preserved.
- V24.15 Tiny Duck sighting fixes remain included.


V24.16.1
- Restored the Pin/Pinned action button beside Complete/Tomorrow on task cards.
- When a task is pinned, a small pin icon also appears beside its coin reward as a status indicator.
- The small title pin is no longer the control; use the action-row Pin/Pinned button to toggle pinning.


V24.16.2 — Task Pin placement fix
- Removed the Pin to Today checkbox from the Add Task form.
- Every existing task card now has a Pin/Pinned button in its bottom action row.
- Pinned tasks also show a small pin icon beside the coin reward as a status indicator only.
- New tasks start unpinned and can be pinned directly from their card.
- PWA cache/version bumped so installed apps fetch the fix.


## V24.17 — Peep + Miko Shop Outfits
- Added Peep shop pieces: White Dress, White Lace Stockings, White Cardigan, White Mary Janes, and White Bow.
- Added Miko shop pieces: Blouse, Shorts, White Garter Socks, Fancy Loafers, Black Blazer, and Black Hairpins.
- All new wardrobe purchases cost 150 Pink Coins each.
- Miko items stay hidden until Miko is invited.
- Peep's White Dress replaces her normal top + skirt while equipped; White Lace Stockings replace regular socks.
- Miko's Black Blazer automatically uses its separate raised-arm layer; socks stay below shoes.
- Dedicated White Cardigan and Black Blazer shop/closet preview art is used.

### Miko asset filename correction
The earlier flat Miko asset ZIP accidentally swapped the artwork stored under `fancy-loafers.png` and `shorts.png`. V24.17 uses the corrected semantic filenames. Replace those two files in `assets/miko/` with the V24.17 correction ZIP.


## V24.17.2 — Peep layering + Socks fix
- Forces Peep's white outfit to render back-to-front as: body base → lace stockings → white dress → white cardigan, with Mary Janes above the stockings.
- Fixes the paired-sock Closet thumbnail renderer so Peep's Rainbow and White + Blue sock choices appear again.
- Bumps the PWA/browser script cache version so the corrected layering code is actually fetched.
