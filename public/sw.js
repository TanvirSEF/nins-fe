// Self-destructing service worker.
// This file exists solely to unregister any previously cached service workers
// so that stale Turbopack chunks are never served again.
self.addEventListener("install", () => {
  self.skipWaiting()
})
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
      .then(() => self.registration.unregister()),
  )
})
