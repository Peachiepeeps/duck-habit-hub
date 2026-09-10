Duck Habit Hub v24.136 — Boss Chest Freeze Fix

Fixes:
- Boss victory chests no longer freeze when a new Icon Border style drops.
- Boss victory chests no longer freeze when a new Border Color drops.
- Normal Duck Quest runs now initialize the iconBorderStylesEarned and iconBorderColorsEarned reward lists.
- Reward collection arrays are normalized defensively before applying chest rewards.

The bug was most noticeable after bosses because boss chests have a higher chance to roll the new border rewards.
