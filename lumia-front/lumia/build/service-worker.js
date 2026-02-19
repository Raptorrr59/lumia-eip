const CACHE_NAME = "mon-webapp-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/offline.html",
  "/manifest.json",
  "/logo192.png",
  "/logo512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Ne pas interférer avec des URLs non-HTTP ou d'autres origines comme les extensions
  if (!url.protocol.startsWith("http")) return;

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch((err) => {
        console.error("Fetch failed:", event.request.url, err);
        return fetch(event.request).catch(() => caches.match("/offline.html"));
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
});
