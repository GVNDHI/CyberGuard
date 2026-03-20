import { useState } from "react"
import "./App.css"
import Globe from "./Globe"
import MapView from "./MapView"
import CyberMap from "./CyberMap"

function App(){

const [country,setCountry] = useState("Canada")
const [chatOpen,setChatOpen] = useState(false)
const [messages,setMessages] = useState([])
const [input,setInput] = useState("")
const [theme,setTheme] = useState("dark")
const [loading,setLoading] = useState(false)
const [page,setPage] = useState("ops")

const toggleTheme = () => {
  setTheme(theme === "dark" ? "light" : "dark")
}

const sendMessage = async () => {

if(!input) return

setMessages(prev => [...prev,{type:"user",text:input}])
setLoading(true)

const msg = input
setInput("")

try{
const res = await fetch("http://127.0.0.1:8000/chatbot/",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({message:msg,country})
})

const data = await res.json()

setMessages(prev => [...prev,{type:"bot",text:data.response}])

}catch{
setMessages(prev => [...prev,{type:"bot",text:"Server error"}])
}

setLoading(false)
}

return(

<div className={`app ${theme}`}>

<div className="scan-line"></div>

{/* NAVBAR */}
<div className="hud">
<div className="container hud-inner">

<div className="left">
<h2>VAULT</h2>
<span>● Tactical Intel</span>
<span className="nav-link" onClick={()=>setPage("articles")}>
● Articles
</span>
</div>

<div className="right">
<select onChange={(e)=>setCountry(e.target.value)}>
<option>Canada</option>
<option>Slovenia</option>
</select>

<button onClick={toggleTheme} className="theme-btn">
{theme==="dark"?"☀️":"🌙"}
</button>
</div>

</div>
</div>

{/* HERO */}
<div className="hero">
<div className="container hero-inner">

<div className="hero-left">
<h1>Securing the Digital Frontier</h1>

<p>Cyber intelligence platform for {country}</p>

<div className="emergency">
<h3>Emergency</h3>
<p>
{country==="Canada"
? "1-888-495-8501"
: "+386 1 479 88 22"}
</p>
</div>

</div>

<div className="hero-right">
<Globe />
</div>

</div>
</div>

{/* ARTICLES */}

{page==="articles" && (

<div className="container articles">

<h2>📰 Cyber Security Articles ({country})</h2>

{country==="Canada" && (
<>
<div className="article-card">
<h3>AI Phishing Scams Rising in Canada</h3>
<p>Cybercriminals are using AI-generated emails to trick users.</p>
<a href="https://www.cbc.ca" target="_blank">Read more</a>
</div>

<div className="article-card">
<h3>Ransomware Attacks Increasing</h3>
<p>Businesses across Canada are being targeted heavily.</p>
<a href="https://globalnews.ca" target="_blank">Read more</a>
</div>
</>
)}

{country==="Slovenia" && (
<>
<div className="article-card">
<h3>Phishing Attacks Target Citizens</h3>
<p>SI-CERT warns about increasing phishing campaigns.</p>
<a href="https://www.cert.si" target="_blank">Read more</a>
</div>

<div className="article-card">
<h3>Banking Malware Rising</h3>
<p>Users advised to secure banking credentials.</p>
<a href="https://www.policija.si" target="_blank">Read more</a>
</div>
</>
)}

</div>

)}
{/* STATS */}
<div className="container stats">
<div className="stat"><h2>124</h2><p>Threats</p></div>
<div className="stat"><h2>87</h2><p>Nodes</p></div>
<div className="stat"><h2>42</h2><p>Portals</p></div>
<div className="stat"><h2>312</h2><p>Incidents</p></div>
</div>

{/* LIVE FEED */}
<div className="container feed">
<h3>⚡ Live Threat Feed</h3>

<div className="feed-box">
<div className="feed-scroll">
<p>🔴 Phishing attack - Canada</p>
<p>⚠ Malware spike - Europe</p>
<p>🔴 Banking fraud - Slovenia</p>
<p>⚠ Data breach alert</p>
</div>
</div>
</div>


{/* MAP */}
<div className="container">
<MapView />
</div>

<div className="container">
    <CyberMap country={country} />
</div>

{/* ARTICLES PAGE */}

{page==="articles" && (

<div className="articles-page">

<div className="container">

<h1>📰 Cyber Intelligence Articles</h1>

<p className="sub">
Latest cyber security developments in {country}
</p>

<div className="articles">

{country==="Canada" && (
<>
<div className="article-card">
<h3>AI Phishing Scams Rising</h3>
<p>AI-driven phishing attacks are increasing across Canada.</p>
<a href="#">Read more</a>
</div>

<div className="article-card">
<h3>Ransomware Targeting Businesses</h3>
<p>Organizations face growing ransomware threats.</p>
<a href="#">Read more</a>
</div>
</>
)}

{country==="Slovenia" && (
<>
<div className="article-card">
<h3>Phishing Attacks Target Citizens</h3>
<p>SI-CERT reports increasing phishing campaigns.</p>
<a href="#">Read more</a>
</div>

<div className="article-card">
<h3>Banking Malware Rising</h3>
<p>Users warned to secure financial credentials.</p>
<a href="#">Read more</a>
</div>
</>
)}

</div>

</div>

</div>
)}

{/* CHAT */}
<div className="chat-btn" onClick={()=>setChatOpen(true)}>💬</div>

{chatOpen && (
<div className="chat-panel">

<div className="chat-header">
<span>Cyber AI</span>
<button onClick={()=>setChatOpen(false)}>X</button>
</div>

<div className="chat-body">

{messages.map((m,i)=>(
<div key={i} className={`msg ${m.type}`}>
{m.text}
</div>
))}

{loading && <div className="typing">Typing...</div>}

</div>

<div className="chat-input">
<input value={input} onChange={(e)=>setInput(e.target.value)} />
<button onClick={sendMessage}>Send</button>
</div>

</div>
)}

</div>
)
}

export default App