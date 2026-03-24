import React from 'react'    
import Home from './pages/Home'
import { Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
const App = () => {
 
  return (
    <>
      <Navbar />
    <Routes>
      
      <Route path="/" element={<Home />} />
       <Route path="/Cart" element={<Cart />} />

      </Routes>

      </>
  )
}

export default App

