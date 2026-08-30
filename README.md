# Duck Habit Hub V24.17.3 — Force-Fresh Peep Fix

This update intentionally uses brand-new physical filenames for JavaScript, CSS, and the service worker so an installed PWA cannot keep reusing the older V24.17 files.

Fixes included:
- Peep render stack explicitly orders Body Base -> White Lace Stockings -> White Dress -> White Cardigan -> White Mary Janes.
- Peep's paired-sock Closet renderer includes the previous thumbnail bug fix plus a failsafe so Rainbow and White + Blue sock cards cannot disappear if a thumbnail fails.

Upload all files from the update ZIP to the GitHub repository root. The old script.js/style.css/sw.js files may remain; index.html now points at the new V24.17.3 filenames.
