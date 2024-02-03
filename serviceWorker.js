self.addEventListener("install", (event) => {
  console.log("Service Worker Installed");
  self.skipWaiting();
  event.waitUntil(
    caches
      .open("firstApp-1")
      .then((cache) => {
        return cache.addAll(["html/index.html", "css/style.css",
        "html/about.html","css/about.css"]);
      })
      .catch((err) => console.log(err))
  );
});

self.addEventListener("activate", () => {
  console.log("inside activated phase");
});

self.addEventListener("fetch", (event) => {
  console.log(event.request.url);
  event.respondWith(
    caches
      .match(event.request)
      .then((file) => {
        if (file) {
          console.log("Found in cashe");
          return file;
        } else {
          console.log(event.request.url);
          return fetch(event.request.url);
        }
      })
      .catch((err) => console.log(err))
  );
});
