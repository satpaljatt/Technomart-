import React from 'react'    
import Home from './pages/Home'
import { Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'

const App = () => {
 
  return (
    <>
      <Navbar />
    <Routes>
      
        <Route path="/login" element={<LoginScreen />} />

        <Route path="/signup" element={<RegisterScreen />} />

        <Route path="/" element={<Home />} />
        
       <Route path="/Cart" element={<Cart />} />

      </Routes>

      </>
  )
}

export default App

