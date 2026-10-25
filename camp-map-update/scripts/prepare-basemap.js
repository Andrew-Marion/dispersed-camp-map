const fs=require('fs');
const g=JSON.parse(fs.readFileSync('data/ne_10m_admin_1_states_provinces.geojson','utf8'));
const keep=g.features.filter(f=>['United States of America','Canada'].includes(f.properties.admin));
const q=v=>Math.round(v*100)/100;
function simp(ring,tol){ // distance-based thinning
  const out=[ring[0]];let last=ring[0];
  for(let i=1;i<ring.length-1;i++){const p=ring[i];if(Math.hypot(p[0]-last[0],p[1]-last[1])>=tol){out.push(p);last=p}}
  out.push(ring[ring.length-1]);return out.length>=4?out:null}
function proc(geom,tol){
  const polys=geom.type==='Polygon'?[geom.coordinates]:geom.coordinates;
  const res=[];
  for(const poly of polys){
    const rings=poly.map(r=>simp(r.map(p=>[q(p[0]),q(p[1])]),tol)).filter(Boolean);
    if(rings.length&&rings[0]) res.push(rings);
  }
  return res;
}
const feats=keep.map(f=>({n:f.properties.name,c:f.properties.admin==='Canada'?'CA':'US',p:proc(f.geometry,0.03)}));
// lakes: big ones only
const lk=JSON.parse(fs.readFileSync('data/ne_10m_lakes.geojson','utf8'));
const lakes=lk.features.filter(f=>{const b=f.bbox||null;return f.geometry&&f.properties.scalerank<=3}).map(f=>({n:f.properties.name,p:proc(f.geometry,0.05)})).filter(l=>l.p.length);
// cities
const pp=JSON.parse(fs.readFileSync('data/ne_10m_populated_places_simple.geojson','utf8'));
const cities=pp.features.filter(f=>['United States of America','Canada'].includes(f.properties.adm0name)&&f.properties.pop_max>150000).map(f=>[f.properties.name,q(f.geometry.coordinates[0]),q(f.geometry.coordinates[1]),f.properties.pop_max]);
fs.writeFileSync('base.json',JSON.stringify({states:feats,lakes,cities}));
console.log(feats.length,lakes.length,cities.length,fs.statSync('base.json').size);
