import React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartItems } = useContext(CartContext);
  const number = cartItems.length;
  const navigate = useNavigate(); 

  const [searchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get('search') || '');

  // Agar URL se query remove ho toh search bar bhi saaf ho jaye
  useEffect(() => {
    setSearchText(searchParams.get('search') || '');
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    navigate(searchText ? `/?search=${searchText}` : '/');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-[#5d4037] border-b-2 border-[#3e2723] shadow-lg sticky top-0 z-50 py-2 relative">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center gap-4">
        
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold tracking-wide transition-transform hover:scale-105 whitespace-nowrap">
          <span className="text-white">Techno</span>
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">Mart</span> 
          <span className="ml-2">🚀</span>
        </Link>

        {/* Search Input Form */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80 mx-2 flex items-center">
          <input
            type="text"
            placeholder="Search products..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full px-5 py-2.5 pl-12 pr-10 bg-[#FAF6F0] rounded-xl border border-[#ebd5b0] text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-[#ebd5b0] transition-all shadow-inner font-medium text-sm"
          />
          <button 
            type="submit" 
            className="absolute left-4 top-3 text-gray-400 text-sm hover:text-[#5d4037] transition-colors cursor-pointer"
          >
            🔍
          </button>
          
          {searchText && (
            <button 
              type="button"
              onClick={() => {
                setSearchText('');
                navigate('/');
              }}
              className="absolute right-4 top-3 text-gray-400 hover:text-gray-600 font-bold transition-colors text-sm cursor-pointer"
            >
              ✕
            </button>
          )}
        </form>

        {/* Buttons Group (Fixed Position) */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="bg-[#F5E0C3] hover:bg-[#EBD5B0] px-5 py-2.5 rounded-lg font-semibold flex items-center gap-3 transition-all shadow-md">
            <span className="text-[#5d4037] whitespace-nowrap">My Cart 🛒</span>
            <span className="bg-[#5d4037] text-[#F5E0C3] text-xs px-2.5 py-1 rounded-full font-bold">
              {number}
            </span>
          </Link>

          {user ? (
            <>
              <Link to="/profile" className="bg-[#F5E0C3] hover:bg-[#EBD5B0] px-5 py-2.5 rounded-lg font-semibold flex items-center gap-3 transition-all shadow-md">
                <span className="text-[#5d4037] whitespace-nowrap">{user.name || 'Profile'}</span>
              </Link>

              {user.isAdmin && (
                <div className="relative">
                  <button 
                    onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                    className="bg-[#F5E0C3] hover:bg-[#EBD5B0] text-[#5d4037] px-5 py-2.5 rounded-lg font-semibold flex items-center gap-3 transition-all shadow-md whitespace-nowrap"
                  >
                    <span>Admin Panel 👑</span>
                  </button>

                  {adminMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-[#EBD5B0] rounded-lg shadow-lg z-50 flex flex-col overflow-hidden">
                      <Link to="/admin/userlist" onClick={() => setAdminMenuOpen(false)} className="px-4 py-3 text-[#5d4037] hover:bg-[#F5E0C3] font-medium transition-colors text-left">Users</Link>
                      <Link to="/admin/productlist" onClick={() => setAdminMenuOpen(false)} className="px-4 py-3 text-[#5d4037] hover:bg-[#F5E0C3] font-medium transition-colors border-t border-gray-100 text-left">Products</Link>
                      <Link to="/admin/orderlist" onClick={() => setAdminMenuOpen(false)} className="px-4 py-3 text-[#5d4037] hover:bg-[#F5E0C3] font-medium transition-colors border-t border-gray-100 text-left">Orders</Link>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="bg-[#F5E0C3] hover:bg-[#EBD5B0] px-5 py-2.5 rounded-lg font-bold flex items-center gap-3 transition-all shadow-md text-[#5d4037] whitespace-nowrap">
                <span>Login</span>
              </Link>
              <Link to="/signup" className="bg-[#F5E0C3] hover:bg-[#EBD5B0] px-5 py-2.5 rounded-lg font-bold flex items-center gap-3 transition-all shadow-md text-[#5d4037] whitespace-nowrap">
                <span>Signup</span>
              </Link>
            </>
          )}
        </div>

      </div>

      {/* Logout Absolute Corner Button */}
      {user && (
        <button 
          onClick={handleLogout} 
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 px-5 py-2.5 rounded-lg font-bold text-white cursor-pointer whitespace-nowrap shadow-md hidden md:block"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;