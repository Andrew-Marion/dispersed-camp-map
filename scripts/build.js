// Builds index.html: inlines Leaflet, the basemap (src/base.json) and the area list (src/areas.js) into src/template.html
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
let t = read('src/template.html');
const css = read('node_modules/leaflet/dist/leaflet.css').replace(/url\([^)]*\)/g, 'none');
const js = read('node_modules/leaflet/dist/leaflet.js').replace(/<\/script/gi, '<\\/script');
const base = read('src/base.json');
const areas = JSON.stringify(require('../src/areas.js'));
t = t.replace('/*LEAFLET_CSS*/', () => css).replace('/*LEAFLET_JS*/', () => js)
     .replace('/*BASE*/', () => base).replace('/*AREAS*/', () => areas);
const m = t.match(/^<title>.*?<\/title>\s*<meta[^>]*>\s*(<style>[\s\S]*?<\/style>)([\s\S]*)$/);
const head = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>Dispersed Camp Map</title><style>:root{color-scheme:light}body{margin:0}[hidden]{display:none!important}</style>';
fs.writeFileSync(path.join(root, 'index.html'), head + m[1] + '</head><body>' + m[2] + '</body></html>');
console.log('Wrote index.html');
