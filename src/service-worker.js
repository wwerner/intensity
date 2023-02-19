/* eslint no-restricted-globals: 0 */
/* eslint no-underscore-dangle: 0 */
/* eslint no-undef: 0 */

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener('message', (msg) => {
  if (msg.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      const preloadResp = await event.preloadResponse;

      if (preloadResp) {
        return preloadResp;
      }

      const networkResp = await fetch(event.request);
      return networkResp;
    })());
  }
});
