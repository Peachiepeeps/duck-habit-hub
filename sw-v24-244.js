// Compatibility bridge for Duckie Days builds that still have
// sw-v24-244.js registered. Loading this legacy URL upgrades those
// installs to the current v24.250 worker without deleting save data.
importScripts('./sw-v24-250.js?v=24-250');
