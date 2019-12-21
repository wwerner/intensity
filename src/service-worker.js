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
