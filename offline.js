"use strict";

/**
 * Created by pedro.f.marquez.soto on 6/22/2017.
 */

var CACHE_NAME = 'v1';
self.addEventListener("install", function (event) {
	console.log("Installed");

	event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
		return fetch("manifest.json").then(function (response) {
			return response.json();
		}).then(function (assets) {
			return cache.addAll(["/", assets["main.js"], assets["vendor.js"], '/json/professionalExperience.json']);
		});
	}).then(function () {
		return self.skipWaiting();
	}));
});

self.addEventListener('fetch', function (event) {
	console.log('Fetch');
	event.respondWith(caches.match(event.request).then(function (response) {
		return response || fetch(event.request);
	}).catch(function (e) {
		console.error("Error on the cache", e);
	}));
});

self.addEventListener("activate", function (event) {
	var cacheWhitelist = [CACHE_NAME];
	event.waitUntil(caches.keys().then(function (keyList) {
		return Promise.all(keyList.map(function (key) {
			if (!cacheWhitelist.includes(key)) {
				return caches.delete(key);
			}
		}));
	}).then(function () {
		return self.clients.claim();
	}));
});
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(CACHE_NAME, "CACHE_NAME", "C:/Users/pedro.f.marquez.soto/Dev/ReactJS/pfernandom.github.io/src/workers/offline.js");
}();

;