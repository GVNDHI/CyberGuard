import { useEffect } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet.heat"

export default function CyberMap({ country }){

useEffect(()=>{

// REMOVE OLD MAP
if(window.mapInstance){
  window.mapInstance.remove()
}

// 🔥 BETTER DATA (strong variation)
const canadaData = [
[43.7, -79.4, 1.0],   // Toronto (VERY HIGH)
[45.4, -75.7, 0.7],   // Ottawa
[49.2, -123.1, 0.8],  // Vancouver
[51.0, -114.0, 0.4],  // Calgary
[53.5, -113.5, 0.3],  // Edmonton
]

const sloveniaData = [
[46.05, 14.5, 0.9],   // Ljubljana
[46.55, 15.65, 0.6],  // Maribor
[45.8, 13.9, 0.4],    // Coast
]

const data = country==="Canada" ? canadaData : sloveniaData

const center = country==="Canada"
? [56, -106]
: [46.15, 14.9]

// CREATE MAP
const map = L.map("map", {
zoomControl: false
}).setView(center, country==="Canada"?4:7)

window.mapInstance = map

// DARK TILE (IMPORTANT for visibility)
L.tileLayer(
"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
).addTo(map)

// 🔥 HEATMAP (TUNED)
L.heatLayer(data, {
radius: 60,        // bigger = better blending
blur: 40,
maxZoom: 10,

gradient: {
0.1: "#00ff9c",
0.3: "#00ff00",
0.5: "#ffff00",
0.7: "#ff8800",
1.0: "#ff0000"
}

}).addTo(map)

}, [country])

return(
<div style={{marginTop:"40px"}}>

<h3>🔥 Cyber Crime Heat Map ({country})</h3>

<div
id="map"
style={{
height:"350px",
borderRadius:"12px",
overflow:"hidden"
}}
></div>

</div>
)
}