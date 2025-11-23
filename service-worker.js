const CACHE_NAME = 'recetas-navidad-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/app.js',
  '/styles.css',
  '/manifest.json',
  '/recetas.js', // Asegúrate de tener este archivo con tus 160 recetas
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Instalar el Service Worker y guardar archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierta y pre-cache completada.');
        return cache.addAll(urlsToCache).catch(err => {
            console.error('Fallo al añadir a caché:', err);
        });
      })
  );
});

// Estrategia Cache-First: responder con la caché si es posible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el archivo de la caché si existe
        if (response) {
          return response;
        }
        // Si no está en caché, va a la red
        return fetch(event.request);
      })
  );
});

// Activar: Limpiar cachés antiguas si el número de versión (v1, v2, etc.) cambia
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
