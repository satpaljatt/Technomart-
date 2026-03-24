import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  
  const {cartItems} = useContext(CartContext);
  const number = cartItems.length
  
  return (
   
    
    <nav className="bg-[#5d4037] border-b-2 border-[#3e2723] shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        
        
        <Link to="/" className="text-3xl font-extrabold tracking-wide transition-transform hover:scale-105">
          <span className="text-white">Techno</span>
          
          <span className="bg-linear-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">Mart</span> 
          <span className="ml-2">🚀</span>
        </Link>

        
        <Link to="/cart" className="bg-[#F5E0C3] hover:bg-[#EBD5B0] px-5 py-2.5 rounded-lg font-semibold flex items-center gap-3 transition-all shadow-md">
         
          <span className="text-[#5d4037]">My Cart 🛒</span>
         
          <span className="bg-[#5d4037] text-[#F5E0C3] text-xs px-2.5 py-1 rounded-full font-bold">
           
            <p>{number}</p>
          </span>
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;