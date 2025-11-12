import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Hero } from './components/Hero'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RegistrationForm } from './components/RegistrationForm'
import { Package } from './components/Package'
import Navbar from './components/Navbar'
import TravelBot from './components/TravelBot'
import HotelsPage from './components/HotelPage'
import { MyBookings } from './components/MyBookings'
function App() {
  const [count, setCount] = useState(0)

  return (
   <>
 <Router>
      <div id='page1'>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Hero />} />
           <Route path="/package" element={<Package/>}/>
            <Route path="/travelbot/:city" element={<TravelBot/>} />
          <Route path="/register" element={<RegistrationForm/>}/>
           <Route path="/hotels/:city" element={<HotelsPage/>} />
            <Route path="/mybookings" element={<MyBookings/>} /> {/* add route */}
          {/* <Route path="/ok" element={<Ok/>}/>  */}
        </Routes>
        
      </div>
    </Router>
    </>
  )
}

export default App
