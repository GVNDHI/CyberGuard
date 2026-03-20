import { useState } from "react"

export default function MapView(){

const [selected,setSelected] = useState(null)

return(

<div className="map">

<h3>🌍 Reporting Map</h3>

{/* COUNTRY SELECT */}

<div className="map-grid">

<div className="map-card" onClick={()=>setSelected("Canada")}>
<h4>Canada</h4>
<p>Click to view cyber data</p>
</div>

<div className="map-card" onClick={()=>setSelected("Slovenia")}>
<h4>Slovenia</h4>
<p>Click to view cyber data</p>
</div>

</div>


{/* DETAILS PANEL */}

{selected==="Canada" && (
<div className="map-detail">

<h2>🇨🇦 Canada Cyber Intelligence</h2>

<p>🔴 Phishing attacks rising in banking sector</p>
<p>⚠ $569M fraud losses reported</p>
<p>🔐 Increase in identity theft cases</p>

<p><strong>Report:</strong> Canadian Anti-Fraud Centre</p>
<p><strong>Phone:</strong> 1-888-495-8501</p>

</div>
)}

{selected==="Slovenia" && (
<div className="map-detail">

<h2>🇸🇮 Slovenia Cyber Intelligence</h2>

<p>🔴 Phishing emails targeting citizens</p>
<p>⚠ Banking malware increase</p>
<p>🔐 SI-CERT alerts rising</p>

<p><strong>Report:</strong> SI-CERT</p>
<p><strong>Website:</strong> www.cert.si</p>

</div>
)}

</div>
)
}