const CACHE_NAME = 'recetas-navidad-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/app.js',
  '/styles.css',
  '/manifest.json',
  '/recetas.js', 
  
  // 🌟 Rutas de los iconos incluidos para la PWA 🌟
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// 1. Instalar el Service Worker y guardar archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Cache abierta y pre-cache completada.');
        // Intenta añadir todos los archivos; si alguno falla, registra el error pero continúa
        return cache.addAll(urlsToCache).catch(err => {
            console.error('Fallo al añadir a caché:', err);
        });
      })
  );
});

// 2. Estrategia Cache-First: responder con la caché si es posible
// Esto asegura una carga rápida y el soporte offline.
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

// 3. Activar: Limpiar cachés antiguas
// Esto sucede cuando cambias CACHE_NAME (ej. a 'recetas-navidad-cache-v2')
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Si el nombre de la caché no está en la lista blanca (es antiguo), lo elimina.
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Service Worker: Eliminando caché antigua', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
