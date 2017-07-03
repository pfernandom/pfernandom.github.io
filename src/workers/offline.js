/**
 * Created by pedro.f.marquez.soto on 6/22/2017.
 */

const CACHE_NAME = 'v2'
self.addEventListener("install", event => {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(cache =>
				fetch("/dist/manifest.json")
					.then(response => response.json())
					.then(assets =>
						cache.addAll([
							"/",
							assets["/dist/main.js"],
							assets["/dist/vendor.js"],
							'/json/professionalExperience.json',
							'/lib/css/bootstrap.min.css'
						])
					)
			).then(() => self.skipWaiting())
			.catch(err => console.log)
	);
});


self.addEventListener('fetch', function(event) {
	if(event.request.url[event.request.url.length - 1] === "/"){
		event.respondWith(
			fetch(event.request).catch(function() {
				return caches.match(event.request);
			})
		);
	}
	event.respondWith(
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request);
		})
			.catch(e => {console.error("Error on the cache",e)})
	);
});

self.addEventListener("activate", event => {
	const cacheWhitelist = [CACHE_NAME];
	event.waitUntil(
		caches.keys()
			.then(keyList =>
				Promise.all(keyList.map(key => {
					if (!cacheWhitelist.includes(key)) {
						return caches.delete(key);
					}
				}))
			)
			.then(() => self.clients.claim())
	);
});