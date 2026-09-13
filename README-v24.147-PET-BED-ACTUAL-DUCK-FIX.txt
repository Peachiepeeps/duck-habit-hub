Duckie Days v24.147 — Actual Pet-Bed Duck Fix

What was wrong:
- The yellow duck visible beside the pet bed in the screenshots was the ROOM-FLOOR duck.
- Earlier updates were changing the separate PET-BED duck placement, so the visible duck did not move.

What is fixed:
- When a pet bed is placed and there is no different duck explicitly assigned to the bed,
  the room-floor duck now automatically renders in the pet bed.
- It uses the pet-bed coordinate system, so the website and installed app should align even
  when the browser has a URL bar and the installed app does not.
- If a different duck is explicitly assigned to the pet bed, that duck stays in the bed and
  the room-floor duck remains separate.
- PWA build bumped to 24.147.
- Workflow is order-proof: YML first or ZIP first both work.
