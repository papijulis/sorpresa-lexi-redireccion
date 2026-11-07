/* La página se mudó a /para-mi-lexi/. Este service worker reemplaza al viejo de
   /sorpresa-lexi/: borra sus copias guardadas, se desinstala y recarga las pestañas
   abiertas para que pasen por la redirección. */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (event) {
  event.waitUntil((async function () {
    var claves = await caches.keys();
    await Promise.all(claves.map(function (k) { return caches.delete(k); }));
    await self.registration.unregister();
    var ventanas = await self.clients.matchAll({ type: 'window' });
    ventanas.forEach(function (c) { c.navigate(c.url); });
  })());
});
