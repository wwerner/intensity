/* eslint no-restricted-globals: 0 */
/* eslint no-underscore-dangle: 0 */

let workbox;

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener('message', (msg) => {
  if (msg.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
