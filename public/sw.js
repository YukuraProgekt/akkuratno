const CACHE     = 'akkuratno-v1';
const CACHE_NET = 'akkuratno-net-v1';

const SHELL = [
  '/',
  '/index.html',
  '/config.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL.map(u => new Request(u, {cache:'reload'}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE && k !== CACHE_NET).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.hostname !== location.hostname) return;
  if (url.pathname.startsWith('/admin')) return;
  if (url.pathname.startsWith('/gallery/')) {
    e.respondWith(networkFirst(e.request)); return;
  }
  e.respondWith(cacheFirst(e.request));
});

async function cacheFirst(req) {
  const cached = await caches.match(req);
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res.ok) (await caches.open(CACHE)).put(req, res.clone());
    return res;
  } catch { return new Response('Offline', { status: 503 }); }
}

async function networkFirst(req) {
  try {
    const res = await fetch(req);
    if (res.ok) (await caches.open(CACHE_NET)).put(req, res.clone());
    return res;
  } catch {
    return (await caches.match(req)) || new Response('Offline', { status: 503 });
  }
}
