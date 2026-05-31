const cacheName = 'veridia-cache-v2';
const assetsToCache = [
  '/',
  '/index.html',
  'https://cdn.jsdelivr.net/npm/phaser@3/dist/phaser.min.js'
];
self.addEventListener('install', e=>{
    e.waitUntil(caches.open(cacheName).then(cache=>cache.addAll(assetsTo
