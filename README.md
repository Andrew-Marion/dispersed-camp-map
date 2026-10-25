# Dispersed Camp Map

A single-file web map for finding dispersed camping, trails, water, and land ownership across the United States and Canada. No build step is needed to use it: open `index.html` in a browser.

## Use it

- **Laptop or Android:** open `index.html` in Chrome or Firefox.
- **iPhone:** turn on GitHub Pages for this repo (Settings, Pages, deploy from the main branch), open the link in Safari, then Share, Add to Home Screen. Location works because the page is served over https.

## What it does

- Color-coded public land (BLM, Forest Service, parks, state, tribal, military) from the BLM Surface Management Agency map. Tap anywhere to see who manages the spot.
- Canada: Ontario Crown land, BC Crown land ownership and recreation sites, parks and protected areas.
- Trails: marked hiking routes (Waymarked Trails), Forest Service trails, and named hiking routes from OpenStreetMap. Tap a trail to see what it is and draw its route.
- Free and basic campsites, water points, and cell towers from OpenStreetMap, saved on the device for offline use.
- Wildfire perimeters, Forest Service roads open to vehicles.
- Offline regions (USGS topo plus land layers), GPS track recording with GPX export, and pins with photos, ratings, last visited, and signal notes.
- 120 built-in regional anchors for dispersed camping areas. These mark general areas, not exact campsites.

## Limits

- Dispersed camping rules are general, not permission. Check the local ranger district or field office for fire bans, closures, and posted limits.
- Land and trail layers need a connection unless you saved a region first.
- OpenStreetMap and OpenTopoMap tiles are cached only as you view them, never in bulk.
- Canadian coverage is Ontario and BC only. Cell coverage is not available, only mapped towers.
- AllTrails data is not used.

## Develop

```
npm install
npm run build   # writes index.html from src/template.html, src/areas.js, src/base.json
```

`scripts/prepare-basemap.js` regenerates `src/base.json` from Natural Earth GeoJSON files placed in `data/`.

## Data sources

BLM Surface Management Agency, US Forest Service (trails, motor vehicle use maps), National Interagency Fire Center, USGS The National Map, Ontario Land Information Ontario, BC government data (DataBC), Environment and Climate Change Canada (CPCAD), OpenStreetMap contributors, Waymarked Trails, OpenTopoMap, Esri imagery, Natural Earth, Leaflet.
