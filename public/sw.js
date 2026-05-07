// Service worker intentionally left minimal — no caching needed for a portfolio site.
// Next.js handles static asset caching via Cache-Control headers automatically.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());
