import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  const { user, logout } = useAuth();
  const { cartItems } = useContext(CartContext);

  const number = cartItems.length;

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [searchText, setSearchText] = useState(
    searchParams.get('search') || ''
  );

  useEffect(() => {
    setSearchText(searchParams.get('search') || '');
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    navigate(searchText ? `/?search=${searchText}` : '/');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-[#5d4037] border-b-2 border-[#3e2723] shadow-lg sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6 py-3">

        {/* Main Navbar */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-5">

          {/* Logo */}
          <div className="flex justify-center lg:justify-start shrink-0">
            <Link
              to="/"
              className="text-2xl sm:text-3xl font-extrabold tracking-wide whitespace-nowrap transition-transform hover:scale-105"
            >
              <span className="text-white">Techno</span>

              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
                Mart
              </span>

              <span className="ml-2">🚀</span>
            </Link>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative w-full lg:w-[260px] xl:w-[320px] flex items-center order-2"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-5 py-2.5 pl-11 pr-10 bg-[#FAF6F0] rounded-xl border border-[#ebd5b0] text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white transition-all shadow-inner font-medium text-sm"
            />

            {/* Search Icon */}
            <button
              type="submit"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm hover:text-[#5d4037] cursor-pointer"
            >
              🔍
            </button>

            {/* Clear Search */}
            {searchText && (
              <button
                type="button"
                onClick={() => {
                  setSearchText('');
                  navigate('/');
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 font-bold cursor-pointer"
              >
                ✕
              </button>
            )}
          </form>

          {/* Buttons Section */}
          <div className="flex flex-wrap justify-center lg:justify-end items-center gap-2 sm:gap-3 lg:ml-auto order-3">

            {/* Cart */}
            <Link
              to="/cart"
              className="bg-[#F5E0C3] hover:bg-[#EBD5B0] px-3 sm:px-4 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-md text-sm sm:text-base whitespace-nowrap"
            >
              <span className="text-[#5d4037]">
                My Cart 🛒
              </span>

              <span className="bg-[#5d4037] text-[#F5E0C3] text-xs px-2.5 py-1 rounded-full font-bold">
                {number}
              </span>
            </Link>

            {user ? (
              <>
                {/* Profile */}
                <Link
                  to="/profile"
                  className="bg-[#F5E0C3] hover:bg-[#EBD5B0] px-3 sm:px-4 py-2.5 rounded-lg font-semibold transition-all shadow-md text-[#5d4037] text-sm sm:text-base whitespace-nowrap"
                >
                  {user.name || 'Profile'}
                </Link>

                {/* Admin Panel */}
                {user.isAdmin && (
                  <div className="relative">
                    <button
                      onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                      className="bg-[#F5E0C3] hover:bg-[#EBD5B0] text-[#5d4037] px-3 sm:px-4 py-2.5 rounded-lg font-semibold transition-all shadow-md text-sm sm:text-base whitespace-nowrap cursor-pointer"
                    >
                      Admin Panel 👑
                    </button>

                    {adminMenuOpen && (
                      <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-[#EBD5B0] rounded-lg shadow-xl z-50 overflow-hidden">

                        <Link
                          to="/admin/userlist"
                          onClick={() => setAdminMenuOpen(false)}
                          className="block px-4 py-3 text-[#5d4037] hover:bg-[#F5E0C3] font-medium transition-colors"
                        >
                          Users
                        </Link>

                        <Link
                          to="/admin/productlist"
                          onClick={() => setAdminMenuOpen(false)}
                          className="block px-4 py-3 text-[#5d4037] hover:bg-[#F5E0C3] font-medium border-t border-gray-100 transition-colors"
                        >
                          Products
                        </Link>

                        <Link
                          to="/admin/orderlist"
                          onClick={() => setAdminMenuOpen(false)}
                          className="block px-4 py-3 text-[#5d4037] hover:bg-[#F5E0C3] font-medium border-t border-gray-100 transition-colors"
                        >
                          Orders
                        </Link>

                      </div>
                    )}
                  </div>
                )}

                {/* Logout - Always Last */}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2.5 rounded-lg font-bold text-white cursor-pointer whitespace-nowrap shadow-md transition-all text-sm sm:text-base"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login */}
                <Link
                  to="/login"
                  className="bg-[#F5E0C3] hover:bg-[#EBD5B0] px-4 py-2.5 rounded-lg font-bold transition-all shadow-md text-[#5d4037] text-sm sm:text-base whitespace-nowrap"
                >
                  Login
                </Link>

                {/* Signup */}
                <Link
                  to="/signup"
                  className="bg-[#F5E0C3] hover:bg-[#EBD5B0] px-4 py-2.5 rounded-lg font-bold transition-all shadow-md text-[#5d4037] text-sm sm:text-base whitespace-nowrap"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;