const CACHE_NAME = 'se-learning-hub-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/interview-prep.html',
    '/ratings.html',
    '/styles/main.css',
    '/scripts/main.js',
    '/scripts/interview.js',
    '/scripts/ratings.js',
    '/manifest.json',
    '/images/icon-192.png',
    '/images/icon-512.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});