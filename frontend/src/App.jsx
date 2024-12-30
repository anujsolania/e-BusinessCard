import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Businesscard from './components/Businesscard'
import Cardinput from './components/Cardinput'
import Allcards from './components/Allcards'

function App() {
  const [name,setname] = useState("")
  const [about,setabout] = useState("")
  const [interests,setinterests] = useState([])
  const [url1,seturl1] = useState("")
  const [url2,seturl2] = useState("")

  const [Nthinterest,setNthinterest] = useState("")

return (
  
  <div>
    <Router>
      <Routes>
        <Route path='/' element={<Cardinput
         props={{name,setname, about,setabout, interests,setinterests,  url1,seturl1, url2,seturl2, Nthinterest,setNthinterest}}
        ></Cardinput>}></Route>
        <Route path="/mycard" element={<Businesscard
         props={{name,setname, about,setabout, interests,setinterests,  url1,seturl1, url2,seturl2, Nthinterest,setNthinterest}}
        ></Businesscard>}></Route>
        <Route path='/allcards' element={<Allcards
        props={{name,setname, about,setabout, interests,setinterests,  url1,seturl1, url2,seturl2, Nthinterest,setNthinterest}}
        ></Allcards>}></Route>
      </Routes>
    </Router>
  </div>
)
}

export default App
