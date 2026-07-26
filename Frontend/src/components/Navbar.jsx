import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {

  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  const { user, logout } = useAuth();
  
  const { cartItems } = useContext(CartContext);
  const number = cartItems.length;

  const navigate = useNavigate(); 

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  console.log("Navbar me user ka data:", user);
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

        {user ? (
          <>
           {user ? (
  <Link to="/profile" className="bg-[#F5E0C3] hover:bg-[#EBD5B0] px-5 py-2.5 rounded-lg font-semibold flex items-center gap-3 transition-all shadow-md">
    <span className="text-[#5d4037]">{user.name || 'Profile'}</span>
  </Link>
) : (
 
  <Link to="/login" className="text-gray-600 hover:text-gray-900 font-semibold">Login</Link>
)}

 {user && user.isAdmin && (
  <div className="relative">
    {/* Dropdown kholne wala Main Button */}
    <button 
      onClick={() => setAdminMenuOpen(!adminMenuOpen)}
      className="bg-[#F5E0C3] hover:bg-[#EBD5B0] text-[#5d4037] px-5 py-2.5 rounded-lg font-semibold flex items-center gap-3 transition-all shadow-md"
    >
      <span>Admin Panel 👑</span>
    </button>

    {adminMenuOpen && (
      <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-[#EBD5B0] rounded-lg shadow-lg z-50 flex flex-col overflow-hidden">
        <Link 
          to="/admin/userlist" 
          onClick={() => setAdminMenuOpen(false)} 
          className="px-4 py-3 text-[#5d4037] hover:bg-[#F5E0C3] font-medium transition-colors text-left"
        >
          Users
        </Link>
        <Link 
          to="/admin/productlist" 
          onClick={() => setAdminMenuOpen(false)} 
          className="px-4 py-3 text-[#5d4037] hover:bg-[#F5E0C3] font-medium transition-colors border-t border-gray-100 text-left"
        >
          Products
        </Link>
        <Link 
          to="/admin/orderlist" 
          onClick={() => setAdminMenuOpen(false)} 
          className="px-4 py-3 text-[#5d4037] hover:bg-[#F5E0C3] font-medium transition-colors border-t border-gray-100 text-left"
        >
          Orders
        </Link>
      </div>
    )}
  </div>
)}
            
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-5 py-2.5 rounded-lg font-bold text-white cursor-pointer">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-[#F5E0C3] hover:bg-[#EBD5B0] px-5 py-2.5 rounded-lg font-bold flex items-center gap-3 transition-all shadow-md text-[#5d4037]">
              <span>login</span>
            </Link>

            <Link to="/signup" className="bg-[#F5E0C3] hover:bg-[#EBD5B0] px-5 py-2.5 rounded-lg font-bold flex items-center gap-3 transition-all shadow-md text-[#5d4037]">
              <span>signup</span>
            </Link>
          </>
        )}
        
      </div> 
    </nav>
  );
};

export default Navbar;