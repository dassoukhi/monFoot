if(!self.define){let e,s={};const n=(n,t)=>(n=new URL(n+".js",t).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(t,i)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let c={};const o=e=>n(e,a),r={module:{uri:a},exports:c,require:o};s[a]=Promise.all(t.map((e=>r[e]||o(e)))).then((e=>(i(...e),c)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"bfaf14e9a79ca18d62ee894224162fc9"},{url:"/_next/static/chunks/13b76428-24f8ced979318ab8.js",revision:"dck9jk2v3BnZvlwhjFotL"},{url:"/_next/static/chunks/412-51ea5ffc6bb63966.js",revision:"dck9jk2v3BnZvlwhjFotL"},{url:"/_next/static/chunks/478-b9a8b08fb7474ef6.js",revision:"dck9jk2v3BnZvlwhjFotL"},{url:"/_next/static/chunks/596-f59025e4616ec10a.js",revision:"dck9jk2v3BnZvlwhjFotL"},{url:"/_next/static/chunks/749-61c0d94b6f8091c5.js",revision:"dck9jk2v3BnZvlwhjFotL"},{url:"/_next/static/chunks/986-c67c342d834307bc.js",revision:"dck9jk2v3BnZvlwhjFotL"},{url:"/_next/static/chunks/app/connexion/page-4c50b8fb32a0d2ee.js",revision:"dck9jk2v3BnZvlwhjFotL"},{url:"/_next/static/chunks/app/equipes/loading-23134f25cfa2d865.js",revision:"dck9jk2v3BnZvlwhjFotL"},{url:"/_next/static/chunks/app/equipes/page-3ea814bffd4e74bc.js",revision:"dck9jk2v3BnZvlwhjFotL"},{url:"/_next/static/chunks/app/favoris/loading-846ee3b178149e0f.js",revision:"dck9jk2v3BnZvlwhjFotL"},{url:"/_next/static/chunks/app/favoris/page-6e3935eafaee9529.js",revision:"dck9jk2v3BnZvlwhjFotL"},{url:"/_next/static/chunks/app/home/%5Bid%5D/page-cdd1047ffac14ce4.js",revision:"dck9jk2v3BnZvlwhjFotL"},{url:"/_next/static/chunks/app/home/loading-8a1618107247a1c5.js",revision:"dck9jk2v3BnZvlwhjFotL"},{url:"/_next/static/chunks/app/home/page-97b055d2309882ec.js",revision:"dck9jk2v3BnZvlwhjFotL"},{url:"/_next/static/chunks/app/layout-87d20dd485b81091.js",revision:"dck9jk2v3BnZvlwhjFotL"},{url:"/_next/static/chunks/app/notifications/loading-8a1db9d61fd3f455.js",revision:"dck9jk2v3BnZvlwhjFotL"},{url:"/_next/static/chunks/app/notifications/page-e6485e3d1498d569.js",revision:"dck9jk2v3BnZvlwhjFotL"},{url:"/_next/static/chunks/app/page-3577d9e212f144bd.js",revision:"dck9jk2v3BnZvlwhjFotL"},{url:"/_next/static/chunks/fd9d1056-cc817167bdd2c013.js",revision:"dck9jk2v3BnZvlwhjFotL"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"dck9jk2v3BnZvlwhjFotL"},{url:"/_next/static/chunks/main-9a8dabb10ea85eb1.js",revision:"dck9jk2v3BnZvlwhjFotL"},{url:"/_next/static/chunks/main-app-f51236752e1f010d.js",revision:"dck9jk2v3BnZvlwhjFotL"},{url:"/_next/static/chunks/pages/_app-52924524f99094ab.js",revision:"dck9jk2v3BnZvlwhjFotL"},{url:"/_next/static/chunks/pages/_error-c92d5c4bb2b49926.js",revision:"dck9jk2v3BnZvlwhjFotL"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-b0cea92b7ba2c663.js",revision:"dck9jk2v3BnZvlwhjFotL"},{url:"/_next/static/css/498048332a170f24.css",revision:"498048332a170f24"},{url:"/_next/static/dck9jk2v3BnZvlwhjFotL/_buildManifest.js",revision:"66a650a40453999ca40002ee32e3481e"},{url:"/_next/static/dck9jk2v3BnZvlwhjFotL/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/MonFoot.4a38b54a.png",revision:"2007b1fc8e5c44e98c5c967726364124"},{url:"/icon-192x192.png",revision:"1617506dcf6ec07981bea296372c3b00"},{url:"/icon-256x256.png",revision:"7043bf7f45df632961d996396da62cb1"},{url:"/icon-384x384.png",revision:"0d625a5346c8d96886a93a9f9678432e"},{url:"/icon-512x512.png",revision:"c55057e45211e498970693b84fbade91"},{url:"/manifest.json",revision:"859281523f50483305f78037f8b5513b"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
