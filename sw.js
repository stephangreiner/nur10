const CACHE_VERSION = 'v2';
const CACHE_NAME = `Knieb-${CACHE_VERSION}`;
const CACHE_ASSETS = [
    '/',                    // Root URL
    '/index.html',          // Main HTML
    '/manifest.json',       // Manifest
    '/script.js',           // Main JavaScript
    '/style.css',           // CSS (if applicable)
    '/media/favicon.ico',   // Favicon
    '/media/flach.png',     // Image for Squats
    '/media/hoch.png',      // Image for Pull-Ups
    '/media/quer.png',      // Image for Back Extensions
    '/media/LiegeS.png'     // Image for Push-Ups
];

// Install Event: Caches specified assets
self.addEventListener('install', async (event) => {
    console.log(`Service Worker: Installing, caching assets`);
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            await cache.addAll(CACHE_ASSETS);
            await self.skipWaiting();
            console.log('Service Worker: Cached all assets');
        })().catch(error => console.error('Install failed:', error))
    );
});

// Activate Event: Deletes old caches
self.addEventListener('activate', async (event) => {
    console.log('Service Worker: Activated');
    event.waitUntil(
        (async () => {
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames.map(name => {
                    if (name !== CACHE_NAME) {
                        console.log(`Service Worker: Clearing old cache: ${name}`);
                        return caches.delete(name);
                    }
                })
            );
            await self.clients.claim(); // Immediately activate the new cache
        })().catch(error => console.error('Activate failed:', error))
    );
});

// ─── Periodic Background Sync: Morning Badge ─────────────────────────────────
// Reads badge status from IndexedDB (written by the main thread) and sets or
// clears the app-icon badge so it is visible before the user opens the app.

function openBadgeDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open('nur10BadgeDB', 1);
        req.onupgradeneeded = () => req.result.createObjectStore('status');
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

function readBadgeStatus() {
    return openBadgeDB().then(db => new Promise(resolve => {
        const req = db.transaction('status', 'readonly').objectStore('status').get('badge_status');
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
    }));
}

self.addEventListener('periodicsync', (event) => {
    if (event.tag !== 'daily-badge') return;
    event.waitUntil(
        readBadgeStatus().then(status => {
            const today = new Date().toDateString();
            const doneToday = status && status.date === today && status.done;
            if (doneToday) {
                return navigator.clearAppBadge().catch(() => {});
            }
            return navigator.setAppBadge(1).catch(() => {});
        })
    );
});
// ─────────────────────────────────────────────────────────────────────────────

// Fetch Event: Serves from cache first, then network if unavailable
self.addEventListener('fetch', async (event) => {
    console.log(`Service Worker: Fetching ${event.request.url}`);
    event.respondWith(
        (async () => {
            try {
                const response = await fetch(event.request);
                const cache = await caches.open(CACHE_NAME);
                cache.put(event.request, response.clone());
                return response;
            } catch (error) {
                const cachedResponse = await caches.match(event.request);
                return cachedResponse || new Response("Offline", { status: 503 });
            }
        })()
    );
});
